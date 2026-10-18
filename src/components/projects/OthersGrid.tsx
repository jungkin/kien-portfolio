"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface OthersGridProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export default function OthersGrid({ projects, onSelect }: OthersGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
    >
      {projects.map((project, i) => (
        <motion.div
          key={project.slug}
          className="flex gap-4 p-4 rounded-xl border border-border bg-card/50 hover:border-cyan/30 cursor-pointer transition-all duration-300"
          onClick={() => onSelect(project)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          {/* Thumbnail */}
          <div className="w-20 h-20 rounded-lg border border-border flex-shrink-0 overflow-hidden relative">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center min-w-0">
            <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold text-foreground text-sm truncate">
              {project.title}
            </h4>
            <p className="text-foreground/60 text-xs mt-0.5 line-clamp-2">
              {project.subtitle}
            </p>
            <span className="text-foreground/40 text-xs font-mono mt-1">
              {project.year}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
