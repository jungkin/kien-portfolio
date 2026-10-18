"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/projects";
import SocialIcons from "./SocialIcons";
import ImageCarousel3D from "./ImageCarousel3D";

export default function Hero() {
  const nameChars = personalInfo.name.split("");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center z-10"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        {/* Left side - 60% */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Name - letter by letter animation */}
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                style={{
                  textShadow: "0 0 30px rgba(0, 240, 255, 0.3)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          {/* Subtitles — bigger "Welcome" */}
          <div>
            <motion.p
              className="text-2xl md:text-3xl text-foreground/80 font-[family-name:var(--font-space-grotesk)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Welcome to my
            </motion.p>
            <motion.p
              className="text-3xl md:text-4xl font-bold text-cyan font-[family-name:var(--font-space-grotesk)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Maker Portfolio
            </motion.p>
          </div>

          {/* Tagline */}
          <motion.p
            className="text-foreground/60 text-lg max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            I design and build things.
          </motion.p>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <SocialIcons />
          </motion.div>

          {/* CV Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan text-cyan hover:bg-cyan hover:text-background font-medium transition-all duration-300 animate-pulse-glow"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Right side - 40% - Carousel */}
        <div className="lg:col-span-2 hidden lg:block">
          <ImageCarousel3D />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs font-mono">Scroll to explore</span>
        <svg
          className="w-5 h-5 animate-bounce-gentle"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7"
          />
        </svg>
      </motion.div>
    </section>
  );
}
