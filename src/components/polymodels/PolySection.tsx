"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { polyModels, artstationProfile } from "@/data/polymodels";
import SectionHeading from "@/components/global/SectionHeading";
import ScrollReveal, { itemVariants } from "@/components/global/ScrollReveal";

export default function PolySection() {
  return (
    <section id="polymodels" className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading number="05" title="3D Art & Visual Work" />

        <ScrollReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {polyModels.map((model) => (
            <motion.a
              key={model.id}
              variants={itemVariants}
              href={model.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[3/4] rounded-xl border border-border overflow-hidden hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
            >
              <Image
                src={model.thumbnail}
                alt={model.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white">
                  {model.title}
                </h3>
                <span className="text-cyan text-xs font-mono mt-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  View on ArtStation &rarr;
                </span>
              </div>
            </motion.a>
          ))}
        </ScrollReveal>

        {/* ArtStation CTA */}
        <div className="flex justify-center mt-10">
          <a
            href={artstationProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-white/20 text-foreground/80 hover:border-cyan hover:text-cyan font-mono text-sm transition-all duration-300"
          >
            View full portfolio on ArtStation &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
