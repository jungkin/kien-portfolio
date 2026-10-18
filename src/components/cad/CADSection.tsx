"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cadModels, grabcadProfile } from "@/data/cad";
import type { CADModel } from "@/data/cad";
import SectionHeading from "@/components/global/SectionHeading";
import ScrollReveal, { itemVariants } from "@/components/global/ScrollReveal";
import SketchfabEmbed from "./SketchfabEmbed";

export default function CADSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedModel = cadModels.find((m) => m.id === selectedId) ?? null;
  const selectedIndex = selectedModel ? cadModels.indexOf(selectedModel) : -1;

  return (
    <section id="cad" className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading number="04" title="CAD Designs" />

        <AnimatePresence mode="wait">
          {!selectedModel ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScrollReveal
                className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto"
                staggerChildren={0.15}
              >
                {cadModels.map((model) => (
                  <motion.div
                    key={model.id}
                    variants={itemVariants}
                    className="group flex flex-col items-center gap-4 cursor-pointer"
                    onClick={() => setSelectedId(model.id)}
                  >
                    <div className="w-full aspect-[4/3] rounded-2xl border border-white/10 hover:border-cyan/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,240,255,0.08)] overflow-hidden relative">
                      <SketchfabEmbed
                        modelId={model.sketchfabId}
                        title={model.title}
                        className="w-full h-full"
                      />
                    </div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-foreground/90 group-hover:text-cyan transition-colors duration-300">
                      {model.title}
                    </h3>
                  </motion.div>
                ))}
              </ScrollReveal>

              <div className="flex justify-center mt-10">
                <a
                  href={grabcadProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg border border-white/20 text-foreground/80 hover:border-cyan hover:text-cyan text-sm font-mono transition-all duration-300"
                >
                  More models on GrabCAD &rarr;
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CADModelExpanded
                model={selectedModel}
                index={selectedIndex}
                onClose={() => setSelectedId(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function CADModelExpanded({
  model,
  index,
  onClose,
}: {
  model: CADModel;
  index: number;
  onClose: () => void;
}) {
  const modelOnLeft = index === 0;

  return (
    <div className="relative">
      <motion.button
        onClick={onClose}
        className="mb-6 flex items-center gap-2 text-white hover:text-cyan text-base font-mono transition-colors"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to models
      </motion.button>

      <div
        className={`grid grid-cols-1 md:grid-cols-5 gap-8 items-start ${
          modelOnLeft ? "" : "md:[direction:rtl]"
        }`}
      >
        {/* Model viewer side - takes 3 cols */}
        <motion.div
          className={`md:col-span-3 ${modelOnLeft ? "" : "md:[direction:ltr]"}`}
          initial={{ opacity: 0, x: modelOnLeft ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-full aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden">
            <SketchfabEmbed
              modelId={model.sketchfabId}
              title={model.title}
              className="w-full h-full"
            />
          </div>
        </motion.div>

        {/* Text side - takes 2 cols */}
        <motion.div
          className={`md:col-span-2 flex flex-col gap-5 ${
            modelOnLeft ? "" : "md:[direction:ltr]"
          }`}
          initial={{ opacity: 0, x: modelOnLeft ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <div>
            <span className="text-cyan font-mono text-sm">{model.year}</span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-foreground mt-1">
              {model.title}
            </h2>
            <p className="text-foreground/70 mt-1">{model.subtitle}</p>
          </div>

          <p className="text-foreground/70 leading-relaxed">
            {model.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {model.tools.map((tool) => (
              <span
                key={tool}
                className="px-2 py-0.5 rounded bg-cyan/10 text-cyan text-xs font-mono border border-cyan/20"
              >
                {tool}
              </span>
            ))}
          </div>

          <ul className="space-y-1.5">
            {model.highlights.map((h, i) => (
              <li
                key={i}
                className="text-foreground/70 text-sm flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0 mt-1.5" />
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
