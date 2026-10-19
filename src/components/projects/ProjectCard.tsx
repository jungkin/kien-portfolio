"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
  onOpen: (slug: string) => void;
}

export default function ProjectCard({ project, index, featured = false, onOpen }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const headline = project.metrics[0];
  const dwg = String(index + 1).padStart(2, "0");
  const contain = project.thumbnailFit === "contain";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [canHover, setCanHover] = useState(false);

  // Hover-to-play only on devices that can hover, and never with reduced motion.
  useEffect(() => {
    const t = window.setTimeout(() => {
      setCanHover(
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => setPlaying(true))
      .catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    setPlaying(false);
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <motion.article
      onMouseEnter={project.video && canHover ? start : undefined}
      onMouseLeave={project.video && canHover ? stop : undefined}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group relative flex flex-col border border-rule bg-paper transition-colors duration-300 hover:border-ink ${
        featured ? "lg:col-span-2 lg:grid lg:grid-cols-2" : ""
      }`}
    >
      {/* Drawing area */}
      <div
        className={`relative overflow-hidden bg-paper-2 ${
          featured ? "aspect-[4/3] lg:aspect-auto lg:min-h-[420px]" : "aspect-[4/3]"
        } border-b border-rule ${featured ? "lg:border-b-0 lg:border-r" : ""}`}
      >
        <span className="label absolute left-3 top-3 z-10">DWG {dwg}</span>
        {project.status === "in-progress" && (
          <span className="absolute right-3 top-3 z-10 border border-signal px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-signal-ink">
            In progress
          </span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          width={800}
          height={600}
          loading="lazy"
          style={contain ? undefined : { objectPosition: project.thumbnailPosition }}
          className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
            contain
              ? "object-contain p-4 group-hover:-translate-y-0.5 sm:p-6"
              : "object-cover"
          }`}
        />
        {project.video && canHover && (
          <video
            ref={videoRef}
            src={project.video.src}
            poster={project.video.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            style={{ objectPosition: project.thumbnailPosition }}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {project.video && (
          <span className="label absolute bottom-3 left-3 z-10 hidden bg-paper/85 px-1.5 py-0.5 sm:block">
            ▶ Video inside
          </span>
        )}
      </div>

      {/* Text */}
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? "lg:p-10" : ""}`}>
        <ul className="mb-4 flex flex-wrap gap-1.5" aria-label="Tags">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-rule px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2"
            >
              {tag}
            </li>
          ))}
        </ul>

        <h3 className={`font-display tracking-tight text-ink ${featured ? "text-3xl lg:text-4xl" : "text-2xl"}`}>
          <button
            type="button"
            onClick={() => onOpen(project.slug)}
            className="text-left after:absolute after:inset-0 after:content-['']"
            aria-haspopup="dialog"
          >
            {project.title}
          </button>
        </h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.08em] text-ink-3">
          {project.org} · {project.period}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-2 sm:text-base">{project.summary}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <div className={`font-display leading-none tracking-tight text-ink ${featured ? "text-6xl" : "text-5xl"}`}>
              {headline.value}
            </div>
            <div className="label mt-2">{headline.label}</div>
          </div>
          <span
            aria-hidden="true"
            className="translate-x-[-6px] font-mono text-2xl text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
          >
            →
          </span>
        </div>
      </div>
    </motion.article>
  );
}
