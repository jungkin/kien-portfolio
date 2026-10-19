"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SectionHeading({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker?: string;
}) {
  const reduce = useReducedMotion();
  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  return (
    <header className="mb-10 md:mb-14">
      <motion.div
        aria-hidden="true"
        className="h-px w-full origin-left bg-ink"
        {...(reduce
          ? {}
          : {
              initial: { scaleX: 0 },
              whileInView: { scaleX: 1 },
              viewport: { once: true },
              transition: { duration: 0.9, ease: "easeOut" as const },
            })}
      />
      <motion.div {...rise}>
        <div className="mt-3 flex items-center justify-between">
          <span className="label">{index} —</span>
          <span className="label" aria-hidden="true">
            {/^\d+$/.test(index) ? `SHEET ${index} / 06` : `APPENDIX ${index}`}
          </span>
        </div>
        <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tight text-ink">
          {title}
        </h2>
        {kicker && (
          <p className="mt-4 max-w-2xl text-base text-ink-2 md:text-lg">
            {kicker}
          </p>
        )}
      </motion.div>
    </header>
  );
}
