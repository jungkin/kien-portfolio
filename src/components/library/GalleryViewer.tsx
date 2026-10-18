"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

interface GalleryViewerProps {
  item: GalleryItem;
  onClose: () => void;
}

export default function GalleryViewer({ item, onClose }: GalleryViewerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-ink bg-paper"
      >
        <div className="flex items-center justify-between border-b border-rule px-4 py-3">
          <span className="label">
            {item.category} · {item.year}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="border border-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Close <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-5 md:p-8">
          <div className="md:col-span-3">
            {item.type === "video" && item.media ? (
              <video
                src={item.media}
                className="w-full border border-rule"
                controls
                muted
                autoPlay
                loop
                playsInline
              />
            ) : (
              <div className="border border-rule bg-paper-2">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1600}
                  height={1200}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 md:col-span-2">
            <h2 className="font-display text-2xl tracking-tight text-ink">{item.title}</h2>
            <p className="leading-relaxed text-ink-2">{item.description}</p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink hover:bg-ink hover:text-paper"
              >
                View external ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
