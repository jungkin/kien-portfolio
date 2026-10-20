"use client";

import { motion, useReducedMotion } from "framer-motion";
import GearFigure from "./GearFigure";
import TitleBlock from "./TitleBlock";
import { RESUME_URL } from "@/data/resume";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };
  const slide = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "105%" },
          animate: { y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[92svh] flex-col pb-10 pt-8 md:pt-12"
    >
      <div className="mx-auto grid w-full max-w-[1200px] flex-1 grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[55fr_45fr] lg:gap-12">
        <div>
          <motion.p className="label" {...rise(0)}>
            Portfolio · Rev 2026.10
          </motion.p>

          <h1 className="mt-5 font-display text-[clamp(3.5rem,9.5vw,8rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-ink">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...slide(0.05)}>
                Kien
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...slide(0.15)}>
                Nguyen<span className="text-signal">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p className="label mt-5 !text-ink-2" {...rise(0.3)}>
            Le Trung Kien Nguyen — he/him
          </motion.p>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl"
            {...rise(0.4)}
          >
            Mechanical engineering student at USF designing actuators,
            mechanisms and legged robots — from first-principles torque math to
            the assembled prototype.
          </motion.p>

          <motion.div
            className="mt-6 inline-flex items-center gap-2.5 border border-rule-strong px-3.5 py-1.5"
            {...rise(0.5)}
          >
            <span className="signal-dot shrink-0" aria-hidden="true" />
            <span className="font-mono text-[12px] tracking-[0.04em] text-ink">
              Seeking Summer 2027 robotics internships
            </span>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3"
            {...rise(0.6)}
          >
            <a
              href="#work"
              className="border border-ink bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-signal-ink hover:border-signal-ink"
            >
              View work →
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              View résumé ↗
            </a>
            <a
              href="mailto:nguyenletrungkien2006@gmail.com"
              className="px-1 py-3 text-sm font-medium text-ink underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-signal"
            >
              Email me
            </a>
          </motion.div>
        </div>

        <motion.div {...rise(0.25)} className="min-w-0">
          <GearFigure />
        </motion.div>
      </div>

      <motion.div
        className="mx-auto mt-10 w-full max-w-[1200px] px-4 sm:px-6"
        {...rise(0.7)}
      >
        <TitleBlock />
      </motion.div>
    </section>
  );
}
