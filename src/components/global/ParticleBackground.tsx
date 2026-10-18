"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  isCyan: boolean;
  baseSpeed: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const PARTICLE_COUNT = 200;
    const REPULSION_RADIUS = 120;
    const REPULSION_STRENGTH = 2;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const baseSpeed = 0.05 + Math.random() * 0.15;
      const dir = Math.random() * Math.PI * 2;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(dir) * baseSpeed,
        vy: Math.sin(dir) * baseSpeed,
        size: 1 + Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.4,
        isCyan: Math.random() < 0.1,
        baseSpeed,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      for (const p of particles) {
        // Mouse repulsion — push particles away, they drift to edges
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_RADIUS && dist > 0) {
          const force =
            ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) *
            REPULSION_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Slow random drift — gentle wandering
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;

        // Clamp max speed so they don't fly off forever
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 1.5;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Very gentle damping — slow return but not snappy
        p.vx *= 0.995;
        p.vy *= 0.995;

        // If nearly stopped, give a tiny random nudge
        if (speed < 0.02) {
          const dir = Math.random() * Math.PI * 2;
          p.vx = Math.cos(dir) * p.baseSpeed;
          p.vy = Math.sin(dir) * p.baseSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Soft bounce off edges (not wrap — lets them accumulate near edges)
        const margin = 5;
        if (p.x < margin) { p.x = margin; p.vx = Math.abs(p.vx) * 0.3; }
        if (p.x > canvas.width - margin) { p.x = canvas.width - margin; p.vx = -Math.abs(p.vx) * 0.3; }
        if (p.y < margin) { p.y = margin; p.vy = Math.abs(p.vy) * 0.3; }
        if (p.y > canvas.height - margin) { p.y = canvas.height - margin; p.vy = -Math.abs(p.vy) * 0.3; }

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.isCyan) {
          ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        }
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
