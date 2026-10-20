"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollspy } from "@/hooks/useScrollspy";
import { RESUME_URL } from "@/data/resume";

const LINKS = [
  { label: "Work", id: "work" },
  { label: "CAD", id: "cad" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];
const SECTION_IDS = LINKS.map((l) => l.id);

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      className="flex items-center gap-3"
      aria-label="Kien Nguyen — back to top"
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center border border-ink font-mono text-[11px] font-medium tracking-wider text-ink"
      >
        KN
      </span>
      <span className="font-display text-base font-semibold tracking-tight text-ink">
        Kien Nguyen
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollspy(SECTION_IDS);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        id="top"
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          scrolled
            ? "border-rule bg-paper/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6"
        >
          <Brand />

          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative py-1 text-sm transition-colors ${
                      isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-signal transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Résumé ↗
              </a>
            </li>
          </ul>

          <button
            ref={menuBtn}
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-rule-strong md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-ink" />
              <span className="block h-px w-5 bg-ink" />
            </span>
          </button>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-paper md:hidden"
        >
          <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between border-b border-rule px-4 sm:px-6">
            <Brand onClick={() => setOpen(false)} />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border border-rule-strong font-mono text-lg"
              aria-label="Close menu"
              onClick={() => {
                setOpen(false);
                menuBtn.current?.focus();
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <ul className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-4 pt-6 sm:px-6">
            {LINKS.map((l, i) => (
              <li key={l.id} className="border-b border-rule">
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline gap-4 py-5 font-display text-4xl font-semibold tracking-tight ${
                    active === l.id ? "text-signal-ink" : "text-ink"
                  }`}
                >
                  <span className="label">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-8">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-block border border-ink bg-ink px-5 py-3 font-mono text-[13px] uppercase tracking-[0.08em] text-paper"
              >
                Résumé ↗
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
