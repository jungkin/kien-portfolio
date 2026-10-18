"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/global/SectionHeading";
import { bio, currently, awards, portrait } from "@/data/about";

export default function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading index="04" title="About" kicker="The person behind the drawings." />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <div className="mb-8 flex items-start gap-5">
              <div className="reg-marks flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden border border-ink bg-paper-2 sm:h-28 sm:w-28">
                {portrait ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={portrait} alt="Portrait of Kien Nguyen" width={112} height={112} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-3xl tracking-tight text-ink" aria-hidden="true">
                    KN
                  </span>
                )}
              </div>
              <p className="border-l border-rule pl-4 font-mono text-xs uppercase leading-relaxed tracking-[0.06em] text-ink-2">
                {currently}
              </p>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-ink-2">
              {bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="label mb-3">Awards &amp; Leadership</h3>
            <ul className="border-t border-ink">
              {awards.map((a) => (
                <li
                  key={`${a.title}-${a.detail}`}
                  className="grid grid-cols-[64px_1fr] gap-4 border-b border-rule py-4"
                >
                  <span className="font-mono text-xs text-ink-3 pt-1">{a.year}</span>
                  <span>
                    <span className="font-display text-xl tracking-tight text-ink">{a.title}</span>
                    {a.detail && <span className="block text-ink-2">{a.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
