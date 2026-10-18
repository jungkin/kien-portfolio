"use client";

import { useEffect, useMemo, useRef, useState, type ComponentRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";

/* ───────── Planetary gearset, drawn as ink line art ─────────
   Module m = 0.25 → pitch radius r = m·Z/2
   Sun Z=12 (r=1.5), Planets Z=12 (r=1.5), Ring Z=36 (r=4.5)
   Zr = Zs + 2·Zp ✓ ; carrier orbit radius = rs + rp = 3.0 = rr − rp ✓

   Kinematics (ring fixed):
     ωc = ωs · Zs / (Zs + Zr) = ωs / 4
     planet (world) ωp = ωc − (ωs − ωc)·Zs/Zp = −2·ωc
   All three are driven from ONE angle φ (the carrier angle):
     sun = 4φ, carrier = φ, planet world = θp0 − 2φ, ring = 0.
   Phase: at φ=0 the sun has a tooth at 0°, each planet (at α = 0/120/240°)
   has a SPACE facing the sun and a space facing the ring, and the ring has
   a tooth at 0° (36 teeth → 120° is exactly 12 pitches), so everything meshes. */

const M = 0.25;
const ZS = 12;
const ZP = 12;
const ZR = 36;
const rPitch = (z: number) => (M * z) / 2;
const ORBIT = rPitch(ZS) + rPitch(ZP);
const DEPTH = 0.5;

const INK = "#15161a";
const INK_3 = "#8a8b8f";
const PAPER = "#f3f1eb";
const SIGNAL = "#ff4f1f";
const SIGNAL_FILL = "#fbd3c3";

/** Gear outline with trapezoidal teeth. Tooth is centred on angle 0. */
function gearShape(
  z: number,
  internal: boolean,
  holeR: number,
  outerR?: number
): THREE.Shape {
  const r = rPitch(z);
  const add = M;
  const ded = 1.25 * M;
  const tip = internal ? r - add : r + add;
  const root = internal ? r + ded : r - ded;
  const period = (Math.PI * 2) / z;
  // [fraction of period, radius]
  const prof: [number, number][] = [
    [-0.5, root],
    [-0.32, root],
    [-0.19, tip],
    [0.19, tip],
    [0.32, root],
  ];
  const pts: THREE.Vector2[] = [];
  for (let k = 0; k < z; k++) {
    for (const [f, rad] of prof) {
      const a = (k + f) * period;
      pts.push(new THREE.Vector2(Math.cos(a) * rad, Math.sin(a) * rad));
    }
  }
  const s = new THREE.Shape();
  if (internal) {
    s.absarc(0, 0, outerR ?? r + 1, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.setFromPoints(pts);
    hole.closePath();
    s.holes.push(hole);
  } else {
    s.setFromPoints(pts);
    s.closePath();
    if (holeR > 0) {
      const h = new THREE.Path();
      h.absarc(0, 0, holeR, 0, Math.PI * 2, true);
      s.holes.push(h);
    }
  }
  return s;
}

function carrierShape(): THREE.Shape {
  const hub = 1.0;
  const w = 0.4;
  const L = ORBIT;
  const gap = Math.asin(w / hub);
  const s = new THREE.Shape();
  const rot = (u: number, v: number, a: number) =>
    new THREE.Vector2(u * Math.cos(a) - v * Math.sin(a), u * Math.sin(a) + v * Math.cos(a));
  const u0 = Math.sqrt(hub * hub - w * w);
  for (let k = 0; k < 3; k++) {
    const a = (k * Math.PI * 2) / 3;
    const p0 = rot(u0, -w, a);
    const p1 = rot(L, -w, a);
    const c = rot(L, 0, a);
    const p3 = rot(u0, w, a);
    if (k === 0) s.moveTo(p0.x, p0.y);
    else s.lineTo(p0.x, p0.y);
    s.lineTo(p1.x, p1.y);
    s.absarc(c.x, c.y, w, a - Math.PI / 2, a + Math.PI / 2, false);
    s.lineTo(p3.x, p3.y);
    const next = ((k + 1) * Math.PI * 2) / 3;
    s.absarc(0, 0, hub, a + gap, next - gap, false);
  }
  s.closePath();
  const bore = new THREE.Path();
  bore.absarc(0, 0, 0.4, 0, Math.PI * 2, true);
  s.holes.push(bore);
  for (let k = 0; k < 3; k++) {
    const a = (k * Math.PI * 2) / 3;
    const pin = new THREE.Path();
    pin.absarc(Math.cos(a) * L, Math.sin(a) * L, 0.2, 0, Math.PI * 2, true);
    s.holes.push(pin);
  }
  return s;
}

function GearMesh({
  shape,
  depth,
  edge,
  fill,
}: {
  shape: THREE.Shape;
  depth: number;
  edge: string;
  fill: string;
}) {
  const { geo, edges } = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: false,
      curveSegments: 48,
    });
    g.translate(0, 0, -depth / 2);
    return { geo: g, edges: new THREE.EdgesGeometry(g, 25) };
  }, [shape, depth]);

  return (
    <group>
      <mesh geometry={geo}>
        <meshBasicMaterial
          color={fill}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={edge} />
      </lineSegments>
    </group>
  );
}

const HOME = new THREE.Vector3(7, 10, 28);
const ALPHAS = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
const BASE_OMEGA_C = 0.16; // carrier rad/s (sun = 4×)

function Scene({ reduced }: { reduced: boolean }) {
  const sunRef = useRef<THREE.Group>(null);
  const carrierRef = useRef<THREE.Group>(null);
  const planetRefs = useRef<(THREE.Group | null)[]>([]);
  const phi = useRef(reduced ? 0.35 : 0);
  const boost = useRef(0);
  const dragging = useRef(false);
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const camera = useThree((s) => s.camera);

  const shapes = useMemo(
    () => ({
      sun: gearShape(ZS, false, 0.32),
      planet: gearShape(ZP, false, 0.2),
      ring: gearShape(ZR, true, 0, rPitch(ZR) + 0.95),
      carrier: carrierShape(),
    }),
    []
  );

  const apply = () => {
    const p = phi.current;
    if (sunRef.current) sunRef.current.rotation.z = 4 * p;
    if (carrierRef.current) carrierRef.current.rotation.z = p;
    ALPHAS.forEach((a, i) => {
      const g = planetRefs.current[i];
      if (g) g.rotation.z = a + Math.PI / ZP - 3 * p;
    });
  };

  useEffect(() => {
    apply();
    if (reduced) return;
    let last = window.scrollY;
    const onScroll = () => {
      const d = Math.abs(window.scrollY - last);
      last = window.scrollY;
      boost.current = Math.min(boost.current + d * 0.02, 5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  useFrame((_, dt) => {
    if (reduced) return;
    const d = Math.min(dt, 0.05);
    boost.current *= Math.exp(-d * 1.4);
    phi.current += BASE_OMEGA_C * (1 + boost.current) * d;
    apply();
    if (!dragging.current) {
      camera.position.lerp(HOME, 1 - Math.exp(-d * 1.2));
      controls.current?.update();
    }
  });

  return (
    <>
      <group ref={sunRef}>
        <GearMesh shape={shapes.sun} depth={DEPTH} edge={SIGNAL} fill={SIGNAL_FILL} />
      </group>

      <group ref={carrierRef}>
        <group position={[0, 0, -0.55]}>
          <GearMesh shape={shapes.carrier} depth={0.22} edge={INK_3} fill={PAPER} />
        </group>
        {ALPHAS.map((a, i) => (
          <group
            key={i}
            position={[Math.cos(a) * ORBIT, Math.sin(a) * ORBIT, 0]}
          >
            <group ref={(el) => { planetRefs.current[i] = el; }}>
              <GearMesh shape={shapes.planet} depth={DEPTH} edge={INK} fill={PAPER} />
            </group>
          </group>
        ))}
      </group>

      <GearMesh shape={shapes.ring} depth={DEPTH} edge={INK} fill={PAPER} />

      {/* centre shaft */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.3, 0.3, 2.4, 32]} />
        <meshBasicMaterial color={PAPER} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
      </mesh>
      <lineSegments rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.3, 0.3, 2.4, 32), 25]} />
        <lineBasicMaterial color={INK} />
      </lineSegments>

      <OrbitControls
        ref={controls}
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        minPolarAngle={Math.PI * 0.12}
        maxPolarAngle={Math.PI * 0.62}
        onStart={() => {
          dragging.current = true;
        }}
        onEnd={() => {
          dragging.current = false;
        }}
      />
    </>
  );
}

export default function GearScene() {
  const reduced = !!useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 cursor-grab active:cursor-grabbing" aria-hidden="true">
      <Canvas
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: HOME.toArray(), fov: 26, near: 1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ touchAction: "pan-y" }}
      >
        <Scene reduced={reduced} />
      </Canvas>
    </div>
  );
}
