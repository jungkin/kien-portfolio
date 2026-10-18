"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/projects";
import dynamic from "next/dynamic";

const GridBackground = dynamic(() => import("./GridBackground"), {
  ssr: false,
});

const roles = ["Robotics Engineer", "3D Artist", "Maker", "Builder"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-cyan text-sm font-mono tracking-widest uppercase mb-4"
        >
          Portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-3 flex-wrap"
        >
          {roles.map((role, i) => (
            <span key={role} className="flex items-center gap-3">
              <span className="text-lg md:text-xl text-foreground/60">{role}</span>
              {i < roles.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-cyan" />
              )}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 text-lg text-foreground/50 max-w-xl mx-auto"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-cyan/10 border border-cyan/30 text-cyan rounded-lg text-sm font-medium hover:bg-cyan/20 transition-colors"
          >
            View Projects
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="px-6 py-3 border border-border text-foreground/60 rounded-lg text-sm font-medium hover:border-foreground/30 hover:text-foreground transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border border-foreground/20 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-foreground/30 rounded-full mt-1.5"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
