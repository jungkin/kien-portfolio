"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  number: string;
  title: string;
}

export default function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-foreground">
        <span className="text-cyan mr-3 font-mono text-xl">{number}</span>
        {title}
      </h2>
      <motion.div
        className="h-[2px] bg-cyan mt-3"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{ maxWidth: 120 }}
      />
    </motion.div>
  );
}
