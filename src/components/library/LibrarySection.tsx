"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/global/SectionHeading";
import { galleryItems, categories, type Category, type GalleryItem } from "@/data/gallery";
import GalleryCard from "./GalleryCard";
import GalleryViewer from "./GalleryViewer";

export default function LibrarySection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () =>
      (activeCategory === "All"
        ? [...galleryItems]
        : galleryItems.filter((item) => item.category === activeCategory)
      ).sort((a, b) => b.year.localeCompare(a.year)),
    [activeCategory]
  );

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (galleryItems.length === 0) return null;

  return (
    <section id="gallery" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          index="A1"
          title="Gallery"
          kicker="Photos and video from the bench, the shop and the field."
        />

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? galleryItems.length
                : galleryItems.filter((i) => i.category === cat).length;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={active}
                className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-rule text-ink-2 hover:border-ink hover:text-ink"
                }`}
              >
                {cat} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center font-mono text-sm text-ink-3">
            No items in this category yet.
          </p>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <GalleryViewer item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
