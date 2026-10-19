"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { CADModel } from "@/data/models";
import type { ModelStats, RenderStyle } from "./types";

const INK = "#15161a";
const PAPER = "#f3f1eb";
const SIGNAL = "#ff4f1f";
const SIGNAL_FILL = "#fbd3c3";
const SHADE = "#cfcabf";

/** world radius every model is normalised to */
const TARGET_R = 1.5;
/** parts smaller than this fraction of the assembly diameter get no ink edges */
const EDGE_MIN_FRAC = 0.012;
const EDGE_ANGLE = 30;
const EXPLODE_K = 1.1;

interface Part {
  name: string;
  geo: THREE.BufferGeometry;
  size: number;
  hot: boolean;
  offset: THREE.Vector3; // displacement at explode = 1
}

function matches(name: string, needles: string[]) {
  const n = name.toLowerCase();
  return needles.some((s) => n.includes(s.toLowerCase()));
}

/** Quantised (normalized int16/int8) attributes would clamp when transformed in place; expand to float32 first. */
function floatGeometry(src: THREE.BufferGeometry) {
  const g = new THREE.BufferGeometry();
  for (const key of ["position", "normal"] as const) {
    const a = src.getAttribute(key);
    if (!a) continue;
    const arr = new Float32Array(a.count * 3);
    for (let i = 0; i < a.count; i++) {
      arr[i * 3] = a.getX(i);
      arr[i * 3 + 1] = a.getY(i);
      arr[i * 3 + 2] = a.getZ(i);
    }
    g.setAttribute(key, new THREE.BufferAttribute(arr, 3));
  }
  if (src.index) g.setIndex(src.index.clone());
  return g;
}

function applyOffsets(groups: (THREE.Group | null)[], parts: Part[], v: number) {
  for (let i = 0; i < parts.length; i++) {
    const g = groups[i];
    if (g) g.position.copy(parts[i].offset).multiplyScalar(v);
  }
}

function homeCamera(
  camera: THREE.PerspectiveCamera,
  controls: { target: THREE.Vector3; update: () => unknown } | null,
  dist: number
) {
  camera.position.copy(new THREE.Vector3(1, 0.62, 1.15).normalize().multiplyScalar(dist));
  camera.near = dist / 50;
  camera.far = dist * 8;
  camera.updateProjectionMatrix();
  if (controls) {
    controls.target.set(0, 0, 0);
    controls.update();
  }
}

/* ── shared pieces ─────────────────────────────────────────── */

function useInkMaterials() {
  const mats = useMemo(
    () => ({
      fill: new THREE.MeshBasicMaterial({ color: PAPER, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, toneMapped: false }),
      fillHot: new THREE.MeshBasicMaterial({ color: SIGNAL_FILL, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, toneMapped: false }),
      line: new THREE.LineBasicMaterial({ color: INK, toneMapped: false }),
      lineHot: new THREE.LineBasicMaterial({ color: SIGNAL, toneMapped: false }),
      shade: new THREE.MeshStandardMaterial({ color: SHADE, roughness: 0.62, metalness: 0.05 }),
      shadeHot: new THREE.MeshStandardMaterial({ color: SIGNAL, roughness: 0.5, metalness: 0.05 }),
    }),
    []
  );
  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);
  return mats;
}

function Lights({ ink }: { ink: boolean }) {
  if (ink) return null;
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#fff8ee", "#9a958a", 0.7]} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <directionalLight position={[-5, 2, -4]} intensity={0.7} />
    </>
  );
}

/** Fit the camera on mount / reset; later resizes keep the user's view. */
function useCameraFit(
  controlsRef: React.RefObject<React.ComponentRef<typeof OrbitControls> | null>,
  resetKey: number
) {
  const { camera, size } = useThree();
  const dist = useMemo(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / Math.max(size.height, 1);
    const fovV = THREE.MathUtils.degToRad(cam.fov);
    const fovH = 2 * Math.atan(Math.tan(fovV / 2) * aspect);
    return (TARGET_R * 0.98) / Math.sin(Math.min(fovV, fovH) / 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, resetKey]);

  useEffect(() => {
    homeCamera(camera as THREE.PerspectiveCamera, controlsRef.current, dist);
  }, [camera, dist, resetKey, controlsRef]);

  return dist;
}

/** Keep the page scrollable on touch: OrbitControls forces touch-action:none. */
function keepScrollable(gl: THREE.WebGLRenderer) {
  const el = gl.domElement;
  if (el.style.touchAction !== "pan-y") el.style.touchAction = "pan-y";
}

/* ── standard (baked, exploding) model ─────────────────────── */

function ModelScene({
  model,
  renderStyle,
  explode,
  resetKey,
  onStats,
}: {
  model: CADModel;
  renderStyle: RenderStyle;
  explode: number;
  resetKey: number;
  onStats: (id: string, s: ModelStats) => void;
}) {
  const reduced = !!useReducedMotion();
  // useGLTF: meshopt decoder is wired in by default (useMeshopt = true), draco off
  const gltf = useGLTF(model.src, false, true);
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const groups = useRef<(THREE.Group | null)[]>([]);
  const cur = useRef(0);
  const target = useRef(explode);
  const [edgeSets, setEdgeSets] = useState<(THREE.EdgesGeometry | null)[]>([]);
  const [stoppedAt, setStoppedAt] = useState<number | null>(null);
  const auto = !reduced && stoppedAt !== resetKey;

  useEffect(() => {
    target.current = explode;
  }, [explode]);

  /* Bake world transforms, centre + normalise, build explode offsets. */
  const { parts, stats } = useMemo(() => {
    gltf.scene.updateMatrixWorld(true);
    const raw: { name: string; geo: THREE.BufferGeometry }[] = [];
    gltf.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh || !m.geometry) return;
      const g = floatGeometry(m.geometry);
      g.applyMatrix4(m.matrixWorld);
      raw.push({ name: m.name || "part", geo: g });
    });

    const box = new THREE.Box3();
    raw.forEach((r) => {
      r.geo.computeBoundingBox();
      box.union(r.geo.boundingBox!);
    });
    const dims = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    const radius = box.getBoundingSphere(new THREE.Sphere()).radius || 1;
    const s = TARGET_R / radius;
    const ex = model.explode;
    const axisVec =
      ex.kind === "axial"
        ? new THREE.Vector3(ex.axis === "x" ? 1 : 0, ex.axis === "y" ? 1 : 0, ex.axis === "z" ? 1 : 0)
        : null;
    const k = EXPLODE_K * (model.explodeScale ?? 1);

    let tris = 0;
    const names = new Set<string>();
    const list: Part[] = raw.map((r) => {
      r.geo.translate(-centre.x, -centre.y, -centre.z);
      r.geo.scale(s, s, s);
      r.geo.computeBoundingBox();
      const b = r.geo.boundingBox!;
      const c = b.getCenter(new THREE.Vector3());
      const sz = b.getSize(new THREE.Vector3());
      tris += (r.geo.index ? r.geo.index.count : r.geo.attributes.position.count) / 3;
      names.add(r.name.replace(/_\d+$/, ""));
      const offset = axisVec
        ? axisVec.clone().multiplyScalar(c.dot(axisVec) * k)
        : c.clone().multiplyScalar(k);
      return {
        name: r.name,
        geo: r.geo,
        size: Math.max(sz.x, sz.y, sz.z),
        hot: matches(r.name, model.highlight),
        offset,
      };
    });

    return {
      parts: list,
      stats: {
        bbox: [dims.x, dims.y, dims.z] as [number, number, number],
        parts: names.size,
        bodies: list.length,
        tris: Math.round(tris),
      } satisfies ModelStats,
    };
  }, [gltf, model]);

  useEffect(() => {
    onStats(model.id, stats);
  }, [model.id, stats, onStats]);

  /* Ink edges, built in time-sliced chunks (largest parts first, tiny parts skipped). */
  useEffect(() => {
    const arr: (THREE.EdgesGeometry | null)[] = new Array(parts.length).fill(null);
    const cutoff = EDGE_MIN_FRAC * TARGET_R * 2;
    const order = parts
      .map((p, i) => i)
      .filter((i) => parts[i].size >= cutoff)
      .sort((a, b) => parts[b].size - parts[a].size);
    let k = 0;
    let cancelled = false;
    let timer = 0;
    const t0 = performance.now();
    const run = () => {
      if (cancelled) return;
      const start = performance.now();
      while (k < order.length && performance.now() - start < 10) {
        const i = order[k++];
        arr[i] = new THREE.EdgesGeometry(parts[i].geo, EDGE_ANGLE);
      }
      setEdgeSets(arr.slice());
      if (k < order.length) timer = window.setTimeout(run, 0);
      else if (process.env.NODE_ENV !== "production")
        console.debug(`[cad] ${model.id}: ${order.length}/${parts.length} edge sets in ${Math.round(performance.now() - t0)}ms`);
    };
    timer = window.setTimeout(run, 30);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      arr.forEach((e) => e?.dispose());
    };
  }, [parts, model.id]);

  /* Dispose baked geometry on switch/unmount. */
  useEffect(() => () => parts.forEach((p) => p.geo.dispose()), [parts]);

  const mats = useInkMaterials();
  const dist = useCameraFit(controlsRef, resetKey);

  useEffect(() => {
    applyOffsets(groups.current, parts, cur.current);
  }, [parts]);

  useFrame((state, dt) => {
    keepScrollable(state.gl);
    const d = Math.min(dt, 0.05);
    const diff = target.current - cur.current;
    if (Math.abs(diff) > 1e-4) {
      cur.current += diff * (1 - Math.exp(-d * 8));
      applyOffsets(groups.current, parts, cur.current);
    }
  });

  const ink = renderStyle === "ink";

  return (
    <>
      <Lights ink={ink} />
      <group>
        {parts.map((p, i) => (
          <group
            key={i}
            ref={(el) => {
              groups.current[i] = el;
            }}
          >
            <mesh
              geometry={p.geo}
              material={ink ? (p.hot ? mats.fillHot : mats.fill) : p.hot ? mats.shadeHot : mats.shade}
            />
            {ink && edgeSets[i] && (
              <lineSegments geometry={edgeSets[i]!} material={p.hot ? mats.lineHot : mats.line} />
            )}
          </group>
        ))}
      </group>
      <ViewControls controlsRef={controlsRef} dist={dist} auto={auto} onStart={() => setStoppedAt(resetKey)} />
    </>
  );
}

/* ── articulated (URDF-style) model: live node hierarchy, joints animate ── */

interface Joint {
  node: THREE.Object3D;
  type: "revolute" | "prismatic";
  axis: THREE.Vector3;
  lower: number;
  upper: number;
  restQ: THREE.Quaternion;
  restP: THREE.Vector3;
  speed: number;
  phase: number;
}

interface ArtMesh {
  mesh: THREE.Mesh;
  orig: THREE.Material | THREE.Material[];
  edges: THREE.LineSegments;
  hot: boolean;
}

const _q = new THREE.Quaternion();
const _v = new THREE.Vector3();

/** Pose the joints at time t: slow sinusoids kept well inside the URDF limits. */
function poseJoints(joints: Joint[], t: number) {
  for (const j of joints) {
    const s = Math.sin(t * j.speed + j.phase);
    if (j.type === "revolute") {
      const mid = (j.lower + j.upper) / 2;
      const v = mid + (j.upper - j.lower) * 0.32 * s;
      j.node.quaternion.copy(j.restQ).multiply(_q.setFromAxisAngle(j.axis, v));
    } else {
      // gripper finger: 0 → full travel (metres → mm)
      const travel = Math.abs(j.upper) >= Math.abs(j.lower) ? j.upper : j.lower;
      const v = travel * (0.5 + 0.5 * s) * 1000;
      j.node.position.copy(j.restP).add(_v.copy(j.axis).applyQuaternion(j.restQ).multiplyScalar(v));
    }
  }
}

function attachEdges(arts: ArtMesh[], on: boolean) {
  for (const a of arts) {
    if (on) a.mesh.add(a.edges);
    else a.mesh.remove(a.edges);
  }
}

/** Swap ink / shaded materials and edge visibility on the live meshes. */
function styleArticulated(arts: ArtMesh[], ink: boolean, mats: ReturnType<typeof useInkMaterials>) {
  for (const a of arts) {
    a.mesh.material = ink ? (a.hot ? mats.fillHot : mats.fill) : a.hot ? mats.shadeHot : a.orig;
    a.edges.visible = ink;
  }
}

function ArticulatedScene({
  model,
  renderStyle,
  resetKey,
  onStats,
}: {
  model: CADModel;
  renderStyle: RenderStyle;
  resetKey: number;
  onStats: (id: string, s: ModelStats) => void;
}) {
  const reduced = !!useReducedMotion();
  const gltf = useGLTF(model.src, false, true);
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const time = useRef(0);
  const [stoppedAt, setStoppedAt] = useState<number | null>(null);
  const auto = !reduced && stoppedAt !== resetKey;
  const mats = useInkMaterials();

  const built = useMemo(() => {
    const root = gltf.scene.clone(true);
    const joints: Joint[] = [];
    let ji = 0;
    root.traverse((o) => {
      const u = o.userData as {
        joint?: string;
        type?: "revolute" | "prismatic";
        axis?: [number, number, number];
        lower?: number;
        upper?: number;
      };
      if (!u?.joint || !u.axis) return;
      const lo = Math.min(u.lower ?? 0, u.upper ?? 0);
      const hi = Math.max(u.lower ?? 0, u.upper ?? 0);
      const prismatic = u.type === "prismatic";
      joints.push({
        node: o,
        type: prismatic ? "prismatic" : "revolute",
        axis: new THREE.Vector3(...u.axis),
        lower: lo,
        upper: hi,
        restQ: o.quaternion.clone(),
        restP: o.position.clone(),
        // both gripper fingers share one phase so they open and close together
        speed: prismatic ? 0.9 : 0.34 + 0.06 * ji,
        phase: prismatic ? 0 : ji * 1.4,
      });
      ji++;
    });

    const arts: ArtMesh[] = [];
    const linkNames = new Set<string>();
    let tris = 0;
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh || !m.geometry) return;
      let name = "part";
      for (let p: THREE.Object3D | null = m; p; p = p.parent) {
        if (p.name) {
          name = p.name;
          break;
        }
      }
      linkNames.add(name);
      tris += (m.geometry.index ? m.geometry.index.count : m.geometry.attributes.position.count) / 3;
      const edgeGeo = new THREE.EdgesGeometry(floatGeometry(m.geometry), EDGE_ANGLE);
      const hot = matches(name, model.highlight);
      const edges = new THREE.LineSegments(edgeGeo, hot ? mats.lineHot : mats.line);
      arts.push({ mesh: m, orig: m.material, edges, hot });
    });

    // Bounding box over a sweep of poses so the whole motion stays in frame.
    const box = new THREE.Box3();
    const restBox = new THREE.Box3();
    for (let i = 0; i <= 16; i++) {
      poseJoints(joints, i * 2.2);
      root.updateMatrixWorld(true);
      box.union(new THREE.Box3().setFromObject(root));
    }
    poseJoints(joints, 0);
    root.updateMatrixWorld(true);
    restBox.setFromObject(root);

    const centre = box.getCenter(new THREE.Vector3());
    const radius = box.getBoundingSphere(new THREE.Sphere()).radius || 1;
    const dims = restBox.getSize(new THREE.Vector3());
    return {
      root,
      joints,
      arts,
      centre,
      scale: TARGET_R / radius,
      stats: {
        bbox: [dims.x, dims.y, dims.z] as [number, number, number],
        parts: linkNames.size,
        bodies: arts.length,
        tris: Math.round(tris),
      } satisfies ModelStats,
    };
  }, [gltf, model, mats]);

  useEffect(() => {
    onStats(model.id, built.stats);
  }, [model.id, built.stats, onStats]);

  /* Attach the ink edges to their meshes (they follow the joints). Re-attaches safely under StrictMode. */
  useLayoutEffect(() => {
    attachEdges(built.arts, true);
    return () => attachEdges(built.arts, false);
  }, [built]);

  const ink = renderStyle === "ink";
  useLayoutEffect(() => {
    styleArticulated(built.arts, ink, mats);
  }, [built, ink, mats]);

  const dist = useCameraFit(controlsRef, resetKey);

  useFrame((state, dt) => {
    keepScrollable(state.gl);
    if (reduced) return;
    time.current += Math.min(dt, 0.05);
    poseJoints(built.joints, time.current);
  });

  const s = built.scale;
  const c = built.centre;

  return (
    <>
      <Lights ink={ink} />
      <group scale={s}>
        {/* GLB is z-up (URDF convention); the scene is y-up */}
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group position={[-c.x, -c.y, -c.z]}>
            <primitive object={built.root} />
          </group>
        </group>
      </group>
      <ViewControls controlsRef={controlsRef} dist={dist} auto={auto} onStart={() => setStoppedAt(resetKey)} />
    </>
  );
}

function ViewControls({
  controlsRef,
  dist,
  auto,
  onStart,
}: {
  controlsRef: React.RefObject<React.ComponentRef<typeof OrbitControls> | null>;
  dist: number;
  auto: boolean;
  onStart: () => void;
}) {
  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.7}
      zoomSpeed={0.7}
      minDistance={dist * 0.45}
      maxDistance={dist * 2}
      autoRotate={auto}
      autoRotateSpeed={0.9}
      onStart={onStart}
    />
  );
}

export default function ModelViewer({
  model,
  renderStyle,
  explode,
  resetKey,
  onStats,
}: {
  model: CADModel;
  renderStyle: RenderStyle;
  explode: number;
  resetKey: number;
  onStats: (id: string, s: ModelStats) => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Plain wheel scrolls the page; only ctrl/⌘ + wheel (also trackpad pinch) zooms the model. */
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const guard = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) e.stopPropagation();
    };
    el.addEventListener("wheel", guard, { capture: true });
    return () => el.removeEventListener("wheel", guard, { capture: true });
  }, []);

  return (
    <div
      ref={wrap}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      role="img"
      aria-label={`${model.alt}. Drag to orbit, Ctrl or Command plus scroll to zoom.`}
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ fov: 30, near: 0.1, far: 100, position: [6, 4, 7] }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ touchAction: "pan-y" }}
      >
        <Suspense fallback={null}>
          {model.articulated ? (
            <ArticulatedScene
              key={model.id}
              model={model}
              renderStyle={renderStyle}
              resetKey={resetKey}
              onStats={onStats}
            />
          ) : (
            <ModelScene
              key={model.id}
              model={model}
              renderStyle={renderStyle}
              explode={explode}
              resetKey={resetKey}
              onStats={onStats}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
