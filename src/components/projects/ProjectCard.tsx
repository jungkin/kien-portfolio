"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { itemVariants } from "@/components/global/ScrollReveal";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative h-[300px] md:h-[400px] rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]"
      onClick={onClick}
    >
      {/* Background image */}
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground">
              {project.title}
            </h3>
            <p className="text-foreground/50 text-sm mt-1">{project.subtitle}</p>
          </div>
          <span className="text-foreground/40 text-sm font-mono">{project.year}</span>
        </div>

        <p className="text-cyan text-sm font-mono mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Project &rarr;
        </p>
      </div>
    </motion.div>
  );
}
