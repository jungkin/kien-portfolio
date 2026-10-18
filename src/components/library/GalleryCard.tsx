"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay videos when visible (like a GIF)
  useEffect(() => {
    if (item.type !== "video" || !item.media) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [item.type, item.media]);

  return (
    <motion.div
      ref={containerRef}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        onClick={onClick}
        className="group block w-full border border-rule bg-paper text-left transition-colors hover:border-ink"
        aria-label={`Open ${item.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden border-b border-rule bg-paper-2">
          {item.type === "video" && item.media ? (
            <video
              ref={videoRef}
              src={item.media}
              poster={item.image}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
          {item.type === "video" && (
            <span className="absolute right-2 top-2 border border-ink bg-paper px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink">
              Video
            </span>
          )}
        </div>
        <div className="p-3">
          <h4 className="truncate font-display text-base tracking-tight text-ink">{item.title}</h4>
          <span className="label">
            {item.category} · {item.year}
          </span>
        </div>
      </button>
    </motion.div>
  );
}
