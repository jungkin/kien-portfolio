"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useProgress } from "@react-three/drei";
import SectionHeading from "@/components/global/SectionHeading";
import { MODELS, findModel, type CADModel } from "@/data/models";
import type { ModelStats, RenderStyle } from "./types";

const ModelViewer = dynamic(() => import("./ModelViewer"), { ssr: false });

const fmt = (n: number) => Math.round(n).toString();
const fmtInt = (n: number) => n.toLocaleString("en-US");

function Loading({ code, ready }: { code: string; ready: boolean }) {
  const { progress } = useProgress();
  if (ready) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      role="status"
    >
      <span className="label text-ink-2">
        Loading {code} … {Math.round(progress)}%
      </span>
    </div>
  );
}

export default function CADLabSection() {
  const [activeId, setActiveId] = useState(MODELS[0].id);
  const [style, setStyle] = useState<RenderStyle>("ink");
  const [explode, setExplode] = useState(MODELS[0].defaultExplode);
  const [resetKey, setResetKey] = useState(0);
  const [stats, setStats] = useState<Record<string, ModelStats>>({});
  const [mounted, setMounted] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  const model = MODELS.find((m) => m.id === activeId) ?? MODELS[0];
  const s = stats[model.id];
  const explodable = model.explode.kind !== "none";

  const select = useCallback((m: CADModel) => {
    setActiveId(m.id);
    setExplode(m.defaultExplode);
  }, []);

  /* Deep links: #cad/m-03 (from a case study, or on load) selects that model. */
  useEffect(() => {
    const fromHash = (scroll: boolean) => {
      const h = window.location.hash;
      if (!h.startsWith("#cad/")) return;
      const m = findModel(decodeURIComponent(h.slice(5)));
      if (!m) return;
      select(m);
      setMounted(true);
      if (scroll) document.getElementById("cad")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const t = window.setTimeout(() => fromHash(true), 300);
    const onHash = () => fromHash(true);
    const onSelect = (e: Event) => {
      const m = findModel(String((e as CustomEvent).detail ?? ""));
      if (m) {
        select(m);
        setMounted(true);
      }
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("cad:select", onSelect);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("cad:select", onSelect);
    };
  }, [select]);

  // Lazy-mount the Canvas only when the viewer nears the viewport.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onStats = useCallback((id: string, st: ModelStats) => {
    setStats((prev) => (prev[id] === st ? prev : { ...prev, [id]: st }));
  }, []);

  const seg = (active: boolean) =>
    `border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
      active
        ? "border-ink bg-ink text-paper"
        : "border-rule-strong text-ink-2 hover:border-ink hover:text-ink"
    }`;

  return (
    <section id="cad" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          index="02"
          title="CAD Lab"
          kicker="Real assemblies from my SolidWorks files. Drag to orbit, explode to see inside; Ctrl/⌘ + scroll to zoom."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Viewer */}
          <div className="lg:col-span-8">
            <div
              ref={stage}
              className="reg-marks paper-grid relative aspect-[4/5] w-full overflow-hidden border border-rule bg-paper-2 sm:aspect-[16/10]"
            >
              {mounted && (
                <ModelViewer
                  model={model}
                  renderStyle={style}
                  explode={explode}
                  resetKey={resetKey}
                  onStats={onStats}
                />
              )}
              <Loading code={model.code} ready={!!s} />
              <span className="label pointer-events-none absolute left-3 top-2.5">
                {model.code} · {model.title}
              </span>
              <span className="label pointer-events-none absolute bottom-2.5 left-3 hidden sm:block">
                Drag to orbit · Ctrl/⌘ + scroll or pinch to zoom
              </span>
              <span className="label pointer-events-none absolute bottom-2.5 right-3 text-signal-ink">
                {style === "ink" ? "Ink" : "Shaded"}
                {explodable ? ` · Explode ${Math.round(explode * 100)}%` : " · Animated"}
              </span>
            </div>

            {/* Controls */}
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex" role="group" aria-label="Render style">
                <button
                  type="button"
                  aria-pressed={style === "ink"}
                  onClick={() => setStyle("ink")}
                  className={seg(style === "ink")}
                >
                  Ink
                </button>
                <button
                  type="button"
                  aria-pressed={style === "shaded"}
                  onClick={() => setStyle("shaded")}
                  className={`-ml-px ${seg(style === "shaded")}`}
                >
                  Shaded
                </button>
              </div>

              <label className={`flex flex-1 items-center gap-3 sm:max-w-sm ${explodable ? "" : "opacity-40"}`}>
                <span className="label shrink-0 text-ink-2">Explode</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={explode}
                  disabled={!explodable}
                  onChange={(e) => setExplode(parseFloat(e.target.value))}
                  aria-label="Explode assembly"
                  className="h-1 w-full cursor-pointer accent-signal disabled:cursor-not-allowed"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setResetKey((k) => k + 1);
                  setExplode(model.defaultExplode);
                }}
                className={seg(false)}
              >
                Reset view
              </button>
            </div>
          </div>

          {/* List + spec */}
          <div className="lg:col-span-4">
            <ul className="border-t border-rule" aria-label="CAD models">
              {MODELS.map((m) => {
                const active = m.id === model.id;
                return (
                  <li key={m.id} className="border-b border-rule">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => select(m)}
                      className={`flex w-full items-baseline gap-3 px-2 py-3 text-left transition-colors ${
                        active ? "bg-paper-2" : "hover:bg-paper-2/60"
                      }`}
                    >
                      <span className={`font-mono text-[11px] tracking-[0.08em] ${active ? "text-signal-ink" : "text-ink-3"}`}>
                        {m.code}
                      </span>
                      <span className="flex-1 text-sm font-medium text-ink">{m.title}</span>
                      <span className="label hidden sm:inline">· {m.tag}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6" aria-live="polite">
              <p className="label">{model.code} · Spec</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                {model.title}
              </h3>
              <p className="mt-1 text-sm text-ink-2">{model.context}</p>
              <dl className="mt-4 grid grid-cols-2 border-t border-rule">
                {[
                  ["Envelope", s ? `${fmt(s.bbox[0])} × ${fmt(s.bbox[1])} × ${fmt(s.bbox[2])} mm` : "…"],
                  ["Parts", s ? `${s.parts} (${s.bodies} bodies)` : "…"],
                  ["Triangles", s ? fmtInt(s.tris) : "…"],
                  [
                    explodable ? "Explode axis" : "Motion",
                    model.explode.kind === "axial"
                      ? model.explode.axis.toUpperCase()
                      : model.explode.kind === "radial"
                        ? "Radial"
                        : "Joints animate",
                  ],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-rule py-2 pr-2">
                    <dt className="label">{k}</dt>
                    <dd className="mt-0.5 font-mono text-[13px] text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">{model.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
