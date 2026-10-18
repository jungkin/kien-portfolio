"use client";

import { useState, useEffect } from "react";

interface CADBoxProps {
  isHighlighted?: boolean;
  large?: boolean;
}

export default function CADBox({ isHighlighted = false, large = false }: CADBoxProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const size = large ? 200 : 130;
  // Static rotation — no spinning, just a nice angle
  const rotX = -25;
  const rotY = mounted ? 35 : 35;

  return (
    <div
      className="flex items-center justify-center"
      style={{ perspective: 800 }}
    >
      <div
        className="relative transition-transform duration-700"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        }}
      >
        {[
          { transform: `translateZ(${size / 2}px)` },
          { transform: `rotateY(180deg) translateZ(${size / 2}px)` },
          { transform: `rotateY(90deg) translateZ(${size / 2}px)` },
          { transform: `rotateY(-90deg) translateZ(${size / 2}px)` },
          { transform: `rotateX(90deg) translateZ(${size / 2}px)` },
          { transform: `rotateX(-90deg) translateZ(${size / 2}px)` },
        ].map((face, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-all duration-500"
            style={{
              transform: face.transform,
              backfaceVisibility: "hidden",
              background: isHighlighted
                ? "linear-gradient(135deg, rgba(0,240,255,0.15) 0%, rgba(0,240,255,0.05) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              border: isHighlighted
                ? "1px solid rgba(0,240,255,0.4)"
                : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              boxShadow: isHighlighted
                ? "inset 0 0 40px rgba(0,240,255,0.1), 0 0 30px rgba(0,240,255,0.08)"
                : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
