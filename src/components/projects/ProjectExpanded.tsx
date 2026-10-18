"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface ProjectExpandedProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectExpanded({
  project,
  onClose,
}: ProjectExpandedProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const allImages = [project.thumbnail, ...project.images];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card/95 backdrop-blur-xl"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full border border-border bg-background/80 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
          {/* Left - Main image + gallery */}
          <div className="md:col-span-1">
            <div
              className="aspect-[4/3] rounded-xl border border-border overflow-hidden relative cursor-pointer hover:border-cyan/30 transition-colors"
              onClick={() => setExpandedImage(project.thumbnail)}
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                sizes="400px"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>

            {/* Additional images */}
            {project.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                {project.images.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg border border-border overflow-hidden relative cursor-pointer hover:border-cyan/30 transition-colors"
                    onClick={() => setExpandedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                      <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Center + Right - Details */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-foreground">
                {project.title}
              </h2>
              <p className="text-foreground/60 mt-1">{project.subtitle}</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-cyan font-mono text-sm">{project.year}</span>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-surface text-foreground/60 text-xs border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-foreground/60 leading-relaxed">
              {project.description}
            </p>

            <div>
              <span className="text-foreground/40 text-xs font-mono uppercase tracking-wider">
                Role
              </span>
              <p className="text-foreground text-sm mt-1">{project.role}</p>
            </div>

            <div>
              <span className="text-foreground/40 text-xs font-mono uppercase tracking-wider">
                Tools
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 rounded bg-cyan/10 text-cyan text-xs font-mono border border-cyan/20"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {project.highlights.length > 0 && (
              <div>
                <span className="text-foreground/40 text-xs font-mono uppercase tracking-wider">
                  Highlights
                </span>
                <ul className="mt-2 space-y-1.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="text-foreground/60 text-sm flex items-start gap-2">
                      <span className="text-cyan mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.links && project.links.length > 0 && (
              <div className="flex gap-3 mt-2">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      link.url.includes("youtube")
                        ? "bg-red-600 border border-red-500 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                        : "border border-cyan text-cyan hover:bg-cyan hover:text-background"
                    }`}
                  >
                    {link.url.includes("youtube") && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                        <path fill="white" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    )}
                    {link.label} &rarr;
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Image lightbox */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/90"
              onClick={() => setExpandedImage(null)}
            />
            <motion.div
              className="relative z-10 max-w-4xl w-full"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            >
              <Image
                src={expandedImage}
                alt={project.title}
                width={1600}
                height={1200}
                className="w-full h-auto object-contain max-h-[90vh] rounded-xl"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
              {/* Navigation dots */}
              <div className="flex justify-center gap-2 mt-4">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedImage(img);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      expandedImage === img ? "bg-cyan" : "bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
