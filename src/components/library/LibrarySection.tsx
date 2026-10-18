"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/global/SectionHeading";
import { galleryItems, categories, type Category, type GalleryItem } from "@/data/gallery";
import GalleryCard from "./GalleryCard";
import GalleryViewer from "./GalleryViewer";

export default function LibrarySection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filtered = (
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)
  ).sort((a, b) => b.year.localeCompare(a.year));

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedItem]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section id="library" className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading number="06" title="Library" />
        <p className="text-foreground/50 mb-8 -mt-6">
          A visual archive of all my projects and creations. Click any item to
          explore.
        </p>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? galleryItems.length
                : galleryItems.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-cyan/10 border-cyan/40 text-cyan shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                    : "border-white/10 text-foreground/40 hover:border-white/20 hover:text-foreground/60"
                }`}
              >
                {cat}{" "}
                <span className="text-[10px] opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-foreground/30 font-mono py-20">
            No items in this category yet.
          </p>
        )}
      </div>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {selectedItem && (
          <GalleryViewer
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
