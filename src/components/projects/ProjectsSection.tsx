"use client";

import { useCallback, useEffect, useState } from "react";
import SectionHeading from "@/components/global/SectionHeading";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectExpanded from "./ProjectExpanded";

const PREFIX = "#work/";

function slugFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  if (!hash.startsWith(PREFIX)) return null;
  const slug = decodeURIComponent(hash.slice(PREFIX.length));
  return projects.some((p) => p.slug === slug) ? slug : null;
}

export default function ProjectsSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // Open the case study matching the URL hash, on load and on back/forward.
  useEffect(() => {
    const sync = () => setOpenSlug(slugFromHash());
    const t = window.setTimeout(sync, 0);
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const open = useCallback((slug: string) => {
    setOpenSlug(slug);
    window.history.pushState(null, "", `${PREFIX}${slug}`);
  }, []);

  const close = useCallback(() => {
    setOpenSlug(null);
    if (window.location.hash.startsWith(PREFIX)) {
      window.history.replaceState(null, "", "#work");
    }
  }, []);

  const selected = projects.find((p) => p.slug === openSlug) ?? null;
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          index="01"
          title="Selected Work"
          kicker="Actuators, mechanisms and legged robots — built, broken, measured, improved."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProjectCard project={featured} index={0} featured onOpen={open} />
          {rest.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + 1} onOpen={open} />
          ))}
        </div>
      </div>

      {selected && <ProjectExpanded key={selected.slug} project={selected} onClose={close} />}
    </section>
  );
}
