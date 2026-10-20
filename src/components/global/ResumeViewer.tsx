"use client";

import { useEffect, useRef, useState } from "react";
import { RESUME_PREVIEW, RESUME_URL, onResumeOpen } from "@/data/resume";

export default function ResumeViewer() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<Element | null>(null);

  useEffect(
    () =>
      onResumeOpen(() => {
        returnFocus.current = document.activeElement;
        setOpen(true);
      }),
    []
  );

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (returnFocus.current instanceof HTMLElement) returnFocus.current.focus();
    };
  }, [open]);

  if (!open) return null;

  const btn =
    "inline-flex items-center gap-2 border border-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Résumé preview"
        className="relative z-10 flex h-full w-full max-w-[880px] flex-col border-ink bg-paper sm:h-[calc(100vh-3rem)] sm:border"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-4 py-3">
          <span className="label">Résumé · Kien Nguyen</span>
          <div className="flex items-center gap-2">
            <a
              href={RESUME_URL}
              download="Kien-Nguyen-Resume.pdf"
              className={`${btn} bg-ink text-paper hover:bg-paper hover:text-ink`}
            >
              Download PDF ↓
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} hidden text-ink hover:bg-ink hover:text-paper sm:inline-flex`}
            >
              Open ↗
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className={`${btn} text-ink hover:bg-ink hover:text-paper`}
            >
              Close ×
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain bg-paper-2 p-3 sm:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={RESUME_PREVIEW}
            alt="Résumé of Le Trung Kien Nguyen, mechanical engineering student at the University of South Florida"
            width={1870}
            height={2420}
            className="mx-auto h-auto w-full max-w-[816px] border border-rule bg-white shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
