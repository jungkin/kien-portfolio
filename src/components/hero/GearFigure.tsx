"use client";

import dynamic from "next/dynamic";

function Placeholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-3/4 w-3/4 text-ink-3">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="13" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 2" />
      </svg>
    </div>
  );
}

const GearScene = dynamic(() => import("./GearScene"), {
  ssr: false,
  loading: () => <Placeholder />,
});

const note =
  "absolute font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2 whitespace-nowrap";

export default function GearFigure() {
  return (
    <figure className="m-0">
      <div className="reg-marks relative h-[320px] w-full border border-rule sm:h-[380px] lg:h-[520px]">
        <GearScene />

        {/* leader lines (decorative) */}
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g stroke="var(--ink-3)" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none">
            <polyline points="17,12 30,12 47,46" vectorEffect="non-scaling-stroke" />
            <polyline points="83,12 70,12 60,32" vectorEffect="non-scaling-stroke" />
            <polyline points="17,88 28,88 15,64" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        <span className={`${note} left-3 top-2.5`}>Sun Z=12</span>
        <span className={`${note} right-3 top-2.5`}>Planet ×3 Z=12</span>
        <span className={`${note} bottom-2.5 left-3`}>Ring Z=36</span>
        <span className={`${note} bottom-2.5 right-3 text-signal-ink`}>
          i = 1 + Zr/Zs = 4.0 : 1
        </span>
      </div>
      <figcaption className="mt-2 flex items-center justify-between gap-4">
        <span className="label">Fig. 1 — Planetary reduction stage</span>
        <span className="label hidden sm:inline">Drag to rotate</span>
      </figcaption>
    </figure>
  );
}
