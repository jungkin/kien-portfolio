"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { GalleryImage, Project, ProjectVideo, SubmersionChart } from "@/data/projects";

interface ProjectExpandedProps {
  project: Project;
  onClose: () => void;
}

function BarChart({ chart }: { chart: SubmersionChart }) {
  const W = 560;
  const H = 320;
  const left = 52;
  const right = 16;
  const top = 56;
  const bottom = 40;
  const plotW = W - left - right;
  const plotH = H - top - bottom;
  const max = 40;
  const ticks = [0, 10, 20, 30, 40];
  const groupW = plotW / chart.categories.length;
  const barW = 30;
  const gap = 6;
  const y = (v: number) => top + plotH - (v / max) * plotH;
  const desc = chart.series
    .map((s) => `${s.name}: ${s.values.map((v, i) => `${chart.categories[i]} ${v} ${chart.unit}`).join(", ")}`)
    .join(". ");

  return (
    <figure className="border border-rule bg-paper-2 p-4 sm:p-6">
      <figcaption className="label mb-3">{chart.title} — lower is better</figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Grouped bar chart of ${chart.title}. ${desc}`}
        className="h-auto w-full"
        fontFamily="var(--font-plex-mono), monospace"
      >
        {/* legend */}
        {chart.series.map((s, i) => (
          <g key={s.name} transform={`translate(${left + i * 150}, 14)`}>
            <rect width="12" height="12" fill={s.accent ? "var(--signal)" : "var(--ink-3)"} />
            <text x="18" y="10" fontSize="11" fill="var(--ink-2)">
              {s.name}
            </text>
          </g>
        ))}
        {/* gridlines + y axis */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={left} x2={W - right} y1={y(t)} y2={y(t)} stroke="var(--rule)" strokeWidth="1" />
            <text x={left - 8} y={y(t) + 4} fontSize="10" textAnchor="end" fill="var(--ink-3)">
              {t}
            </text>
          </g>
        ))}
        <text x={left - 8} y={top - 12} fontSize="10" textAnchor="end" fill="var(--ink-3)">
          {chart.unit}
        </text>
        <line x1={left} x2={W - right} y1={y(0)} y2={y(0)} stroke="var(--ink)" strokeWidth="1.25" />
        {/* bars */}
        {chart.categories.map((cat, ci) => {
          const gx = left + ci * groupW + groupW / 2;
          const total = chart.series.length * barW + (chart.series.length - 1) * gap;
          return (
            <g key={cat}>
              {chart.series.map((s, si) => {
                const v = s.values[ci];
                const x = gx - total / 2 + si * (barW + gap);
                return (
                  <g key={s.name}>
                    <rect
                      x={x}
                      y={y(v)}
                      width={barW}
                      height={y(0) - y(v)}
                      fill={s.accent ? "var(--signal)" : "var(--ink-3)"}
                    />
                    <text
                      x={x + barW / 2}
                      y={y(v) - 5}
                      fontSize="11"
                      textAnchor="middle"
                      fill="var(--ink)"
                    >
                      {v}
                    </text>
                  </g>
                );
              })}
              <text x={gx} y={H - 16} fontSize="11" textAnchor="middle" fill="var(--ink-2)">
                {cat}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

function Clip({ video, hero = false }: { video: ProjectVideo; hero?: boolean }) {
  return (
    <figure>
      <video
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        controls
        preload={hero ? "metadata" : "none"}
        className={`block w-full bg-ink ${hero ? "max-h-[60vh] object-contain" : "aspect-video object-contain"}`}
      >
        Your browser does not support embedded video.
      </video>
      {video.caption && (
        <figcaption
          className={`text-sm leading-snug text-ink-2 ${hero ? "border-t border-rule px-4 py-2 sm:px-8" : "mt-2"}`}
        >
          {video.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: GalleryImage[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  useEffect(() => {
    closeRef.current?.focus();
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      else if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
      else if (e.key === "Tab") e.preventDefault(); // keep focus inside the lightbox buttons
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, items.length, onIndex]);

  const nav =
    "border border-paper/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-paper transition-colors hover:bg-paper hover:text-ink";

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex flex-col bg-ink/95 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-paper/70">
          {index + 1} / {items.length}
        </span>
        <div className="flex gap-2">
          {items.length > 1 && (
            <>
              <button type="button" className={nav} onClick={() => onIndex((index - 1 + items.length) % items.length)}>
                ← Prev
              </button>
              <button type="button" className={nav} onClick={() => onIndex((index + 1) % items.length)}>
                Next →
              </button>
            </>
          )}
          <button ref={closeRef} type="button" className={nav} onClick={onClose}>
            Close ✕
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center" onClick={onClose}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          onClick={(e) => e.stopPropagation()}
          className={`max-h-full max-w-full object-contain ${item.fit === "contain" ? "bg-paper p-4" : ""}`}
        />
      </div>
      {item.caption && <p className="mt-3 text-center text-sm text-paper/85">{item.caption}</p>}
    </div>,
    document.body
  );
}

export default function ProjectExpanded({ project, onClose }: ProjectExpandedProps) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const lightboxOpen = useRef(false);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  useEffect(() => {
    lightboxOpen.current = lightbox !== null;
  }, [lightbox]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        // Escape closes the lightbox first, then the dialog
        if (lightboxOpen.current) setLightbox(null);
        else onCloseRef.current();
        return;
      }
      if (lightboxOpen.current) return;
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, []);

  const titleId = `project-title-${project.slug}`;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-start sm:p-6 lg:p-10"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-full w-full max-w-[1000px] flex-col overflow-hidden border border-ink bg-paper sm:max-h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-5rem)]"
        initial={reduce ? false : { y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-3 sm:px-6">
          <span className="label truncate">
            {project.org} · {project.period}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 border border-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Close <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain">
          <div className="border-b border-rule bg-paper-2">
            {project.video ? (
              <Clip video={project.video} hero />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnail}
                alt={project.thumbnailAlt}
                width={800}
                height={600}
                className={
                  project.thumbnailFit === "contain"
                    ? "mx-auto h-auto max-h-[50vh] w-full object-contain p-4 sm:p-8"
                    : "mx-auto h-auto max-h-[60vh] w-full object-cover"
                }
              />
            )}
          </div>

          <div className="px-4 py-8 sm:px-8 sm:py-10">
            <ul className="mb-4 flex flex-wrap items-center gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-rule px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2"
                >
                  {tag}
                </li>
              ))}
              {project.status === "in-progress" && (
                <li className="border border-signal px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.06em] text-signal-ink">
                  In progress
                </li>
              )}
            </ul>
            <h3 id={titleId} className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
              {project.title}
            </h3>

            {/* Metrics */}
            <dl className="mt-8 grid grid-cols-1 border border-rule sm:grid-flow-col sm:auto-cols-fr">
              {project.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex flex-col p-4 sm:p-5 ${i > 0 ? "border-t border-rule sm:border-l sm:border-t-0" : ""}`}
                >
                  <dt className="label order-2 mt-2">{m.label}</dt>
                  <dd className="font-display text-4xl leading-none tracking-tight text-ink order-1">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1fr]">
              <div>
                <h4 className="label mb-3">Problem</h4>
                <p className="leading-relaxed text-ink-2">{project.problem}</p>
              </div>
              <div>
                <h4 className="label mb-3">Approach</h4>
                <p className="leading-relaxed text-ink-2">{project.approach}</p>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="label mb-3">Results</h4>
              <ul className="border-t border-rule">
                {project.results.map((r) => (
                  <li key={r} className="border-b border-rule py-3 text-ink">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {project.chart && (
              <div className="mt-10">
                <BarChart chart={project.chart} />
              </div>
            )}

            {project.specs && project.specs.length > 0 && (
              <div className="mt-10">
                <h4 className="label mb-3">Key specs</h4>
                <dl className="border-t border-rule">
                  {project.specs.map((s) => (
                    <div
                      key={s.label}
                      className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[180px_1fr] sm:gap-6"
                    >
                      <dt className="label pt-0.5">{s.label}</dt>
                      <dd className="text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {project.moreVideos && project.moreVideos.length > 0 && (
              <div className="mt-10">
                <h4 className="label mb-3">More video</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.moreVideos.map((v) => (
                    <Clip key={v.src} video={v} />
                  ))}
                </div>
              </div>
            )}

            {project.gallery.length > 0 && (
              <div className="mt-10">
                <h4 className="label mb-3">Gallery</h4>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.gallery.map((g, i) => (
                    <li key={g.src}>
                      <figure>
                        <button
                          type="button"
                          onClick={() => setLightbox(i)}
                          aria-label={`Enlarge image: ${g.caption ?? g.alt}`}
                          className="group/img relative block aspect-[4/3] w-full overflow-hidden border border-rule bg-paper-2 transition-colors hover:border-ink"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={g.src}
                            alt={g.alt}
                            loading="lazy"
                            className={`h-full w-full transition-transform duration-500 group-hover/img:scale-[1.03] ${
                              g.fit === "contain" ? "object-contain p-3" : "object-cover"
                            }`}
                          />
                          {g.tag && (
                            <span className="label absolute left-2 top-2 bg-paper/85 px-1.5 py-0.5">{g.tag}</span>
                          )}
                        </button>
                        {g.caption && (
                          <figcaption className="mt-2 text-sm leading-snug text-ink-2">{g.caption}</figcaption>
                        )}
                      </figure>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1fr]">
              <div>
                <h4 className="label mb-3">Role</h4>
                <p className="text-ink">{project.role}</p>
              </div>
              <div>
                <h4 className="label mb-3">Tools</h4>
                <ul className="flex flex-wrap gap-1.5">
                  {project.tools.map((t) => (
                    <li
                      key={t}
                      className="border border-rule px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {project.cadModel && (
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => {
                    // #cad/m-03: ProjectsSection closes this dialog on hashchange, CADLabSection selects the model
                    window.location.hash = `cad/${project.cadModel!.toLowerCase()}`;
                  }}
                  className="border border-signal bg-signal px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  View in CAD Lab → {project.cadModel}
                </button>
              </div>
            )}

            {project.links && project.links.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink hover:bg-ink hover:text-paper"
                    >
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>
      {lightbox !== null && (
        <Lightbox
          items={project.gallery}
          index={lightbox}
          onIndex={setLightbox}
          onClose={() => {
            setLightbox(null);
          }}
        />
      )}
    </motion.div>
  );
}
