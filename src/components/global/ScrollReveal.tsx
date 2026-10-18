"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom: { delay: number; stagger: number }) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      delayChildren: custom.delay,
      staggerChildren: custom.stagger,
    },
  }),
};

/** Variants for children of <ScrollReveal> (fade + 8px rise). */
export const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.08,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={{ delay, stagger: staggerChildren }}
    >
      {children}
    </motion.div>
  );
}
