"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

interface GalleryViewerProps {
  item: GalleryItem;
  onClose: () => void;
}

export default function GalleryViewer({ item, onClose }: GalleryViewerProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 md:p-8">
          {/* Left - Media (takes up 3 columns) */}
          <div className="md:col-span-3">
            {item.type === "video" && item.media ? (
              <video
                src={item.media}
                className="w-full rounded-xl border border-border"
                controls
                muted
                autoPlay
                loop
                playsInline
              />
            ) : (
              <div className="relative w-full rounded-xl border border-border overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1600}
                  height={1200}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </div>
            )}
          </div>

          {/* Right - Details (takes up 2 columns) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-foreground">
                {item.title}
              </h2>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-cyan font-mono text-sm">{item.year}</span>
              <span className="px-2 py-0.5 rounded-full bg-surface text-foreground/60 text-xs border border-border">
                {item.category}
              </span>
              {item.type === "video" && (
                <span className="px-2 py-0.5 rounded-full bg-surface text-foreground/60 text-xs border border-border">
                  Video
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-foreground/60 leading-relaxed">
              {item.description}
            </p>

            {/* External link */}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan text-cyan text-sm hover:bg-cyan hover:text-background transition-all duration-300 w-fit"
              >
                {item.link.includes("artstation")
                  ? "View on ArtStation"
                  : item.link.includes("youtube")
                  ? "Watch on YouTube"
                  : "View External"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
