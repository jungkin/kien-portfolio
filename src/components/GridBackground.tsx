"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GridParticles() {
  const meshRef = useRef<THREE.Points>(null!);
  const count = 800;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      spd[i] = 0.002 + Math.random() * 0.005;
    }
    return [pos, spd];
  }, []);

  useFrame(() => {
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i];
      if (arr[i * 3 + 1] > 6) {
        arr[i * 3 + 1] = -6;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00f0ff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function GridLines() {
  const gridRef = useRef<THREE.Group>(null!);

  const lines = useMemo(() => {
    const lineData: { start: [number, number, number]; end: [number, number, number] }[] = [];
    const spacing = 1;
    const gridSize = 12;

    for (let i = -gridSize; i <= gridSize; i++) {
      lineData.push({
        start: [i * spacing, -6, 0],
        end: [i * spacing, 6, 0],
      });
      lineData.push({
        start: [-gridSize * spacing, i * spacing * 0.5, 0],
        end: [gridSize * spacing, i * spacing * 0.5, 0],
      });
    }
    return lineData;
  }, []);

  return (
    <group ref={gridRef} rotation={[0.3, 0, 0]} position={[0, 0, -3]}>
      {lines.map((line, i) => {
        const points = [
          new THREE.Vector3(...line.start),
          new THREE.Vector3(...line.end),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <lineSegments key={i} geometry={geometry}>
            <lineBasicMaterial color="#00f0ff" transparent opacity={0.04} />
          </lineSegments>
        );
      })}
    </group>
  );
}

export default function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <GridParticles />
        <GridLines />
      </Canvas>
    </div>
  );
}
