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
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer group"
      onClick={onClick}
      style={{ aspectRatio: "3/4" }}
    >
      <div className="relative w-full h-full rounded-xl border border-white/10 overflow-hidden group-hover:border-cyan/30 transition-colors duration-300">
        {item.type === "video" && item.media ? (
          <video
            ref={videoRef}
            src={item.media}
            poster={item.image}
            className="w-full h-full object-cover"
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
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        )}

        {/* Video indicator */}
        {item.type === "video" && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}

        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
          <h4 className="text-foreground text-xs font-medium leading-tight truncate">
            {item.title}
          </h4>
          <span className="text-foreground/40 text-[10px] font-mono">
            {item.category} &middot; {item.year}
          </span>
        </div>

        {/* External link indicator */}
        {item.link && (
          <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-cyan/20 flex items-center justify-center border border-cyan/30">
            <svg className="w-2.5 h-2.5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}
