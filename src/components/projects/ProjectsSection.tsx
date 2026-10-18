"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import SectionHeading from "@/components/global/SectionHeading";
import ScrollReveal from "@/components/global/ScrollReveal";
import ProjectCard from "./ProjectCard";
import ProjectExpanded from "./ProjectExpanded";
import OthersGrid from "./OthersGrid";

// Featured projects (first 3)
const featured = projects.slice(0, 3);
const others = projects.slice(3);

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showOthers, setShowOthers] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading number="03" title="Projects" />

        {/* Featured projects */}
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </ScrollReveal>

        {/* Others button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowOthers(!showOthers)}
            className="px-8 py-3 rounded-lg border border-border text-foreground/60 hover:border-cyan hover:text-cyan font-mono text-sm transition-all duration-300"
          >
            {showOthers ? "Hide" : "Other Projects"}
          </button>
        </div>

        {/* Others grid */}
        <AnimatePresence>
          {showOthers && (
            <OthersGrid
              projects={others}
              onSelect={(p) => setSelectedProject(p)}
            />
          )}
        </AnimatePresence>

        {/* Expanded project modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectExpanded
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
