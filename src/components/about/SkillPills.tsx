"use client";

import { motion } from "framer-motion";
import { skills, type SkillCategory } from "@/data/about";
import { itemVariants } from "@/components/global/ScrollReveal";

const categoryColors: Record<SkillCategory, { border: string; bg: string; text: string }> = {
  mechanical: {
    border: "border-[var(--cat-mechanical)]",
    bg: "hover:bg-[var(--cat-mechanical)]",
    text: "hover:text-background",
  },
  software: {
    border: "border-[var(--cat-software)]",
    bg: "hover:bg-[var(--cat-software)]",
    text: "hover:text-background",
  },
  design: {
    border: "border-[var(--cat-design)]",
    bg: "hover:bg-[var(--cat-design)]",
    text: "hover:text-background",
  },
  tools: {
    border: "border-[var(--cat-tools)]",
    bg: "hover:bg-[var(--cat-tools)]",
    text: "hover:text-background",
  },
};

export default function SkillPills() {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        const colors = categoryColors[skill.category];
        return (
          <motion.span
            key={skill.name}
            variants={itemVariants}
            className={`px-3 py-1 rounded-full text-xs font-mono border bg-transparent text-foreground transition-all duration-300 cursor-default ${colors.border} ${colors.bg} ${colors.text}`}
          >
            {skill.name}
          </motion.span>
        );
      })}
    </div>
  );
}
