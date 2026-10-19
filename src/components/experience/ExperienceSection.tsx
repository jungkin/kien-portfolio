"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/global/SectionHeading";
import { experience } from "@/data/experience";

export default function ExperienceSection() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          index="03"
          title="Experience"
          kicker="Internships, research and team engineering."
        />

        <ol className="border-t border-ink">
          {experience.map((e) => (
            <motion.li
              key={e.org}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid gap-4 border-b border-rule py-8 md:grid-cols-[160px_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8"
            >
              <div className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3 md:pt-1.5">
                {e.dates}
              </div>
              <div>
                <h3 className="font-display text-2xl tracking-tight text-ink">{e.org}</h3>
                <p className="mt-1 text-ink-2">{e.role}</p>
                {e.location && <p className="label mt-2">{e.location}</p>}
              </div>
              <ul className="space-y-2 text-ink-2">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ink" />
                    <span>{b}</span>
                  </li>
                ))}
                {e.images && (
                  <li className="flex gap-3 pt-2">
                    {e.images.map((img) => (
                      <figure key={img.src} className="w-24 sm:w-28">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="aspect-[4/5] w-full border border-rule bg-paper-2 object-cover"
                        />
                        {img.caption && <figcaption className="label mt-1.5 normal-case">{img.caption}</figcaption>}
                      </figure>
                    ))}
                  </li>
                )}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
