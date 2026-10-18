"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollspy } from "@/hooks/useScrollspy";

const sections = [
  { id: "hero", label: "Home", number: "01" },
  { id: "about", label: "About Me", number: "02" },
  { id: "projects", label: "Projects", number: "03" },
  { id: "cad", label: "CAD Designs", number: "04" },
  { id: "polymodels", label: "Poly Models", number: "05" },
  { id: "library", label: "Library", number: "06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollspy(sections.map((s) => s.id));

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = useCallback(
    (id: string) => {
      setMenuOpen(false);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-background/70 backdrop-blur-xl border-b border-border"
            : "py-3 bg-transparent"
        }`}
      >
        <div className="w-full px-4 flex items-center justify-between">
          {/* Logo — change "YN" to your initials */}
          <button
            onClick={() => scrollTo("hero")}
            className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground hover:text-cyan transition-colors"
          >
            YN
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-[2px] bg-foreground origin-center"
              animate={
                menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-[2px] bg-foreground"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[2px] bg-foreground origin-center"
              animate={
                menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-2xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-8">
              {sections.map((section, i) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`text-left text-2xl md:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold transition-colors ${
                    activeId === section.id
                      ? "text-cyan"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <span className="font-mono text-sm text-foreground/40 mr-4">
                    {section.number}
                  </span>
                  {section.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
