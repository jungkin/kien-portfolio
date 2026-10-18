"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/projects";
import { flipCards } from "@/data/about";
import SectionHeading from "@/components/global/SectionHeading";
import ScrollReveal, { itemVariants } from "@/components/global/ScrollReveal";
import FlipCard from "./FlipCard";
import SkillPills from "./SkillPills";

export default function AboutSection() {
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const handleFlip = (id: string) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="about" className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading number="02" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Flip cards */}
          <ScrollReveal className="grid grid-cols-2 gap-4" staggerChildren={0.08}>
            {flipCards.map((card) => (
              <motion.div key={card.id} variants={itemVariants}>
                <FlipCard
                  card={card}
                  isFlipped={flippedId === card.id}
                  onClick={() => handleFlip(card.id)}
                />
              </motion.div>
            ))}
          </ScrollReveal>

          {/* Right - Bio + Skills */}
          <ScrollReveal className="flex flex-col gap-8" delay={0.2}>
            <motion.div variants={itemVariants}>
              {personalInfo.bio.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-lg leading-relaxed ${
                    i === personalInfo.bio.split("\n\n").length - 1
                      ? "text-foreground/90 font-medium mt-4"
                      : "text-foreground/70"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground mb-4">
                Skills & Tools
              </h3>
              <SkillPills />
            </motion.div>

            {/* Legend */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 text-xs text-foreground/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--cat-mechanical)]" />
                Mechanical
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--cat-software)]" />
                Software
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--cat-design)]" />
                Design
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--cat-tools)]" />
                Tools
              </span>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
