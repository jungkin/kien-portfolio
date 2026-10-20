"use client";

import { useState } from "react";
import { RESUME_URL, onResumeClick } from "@/data/resume";

const EMAIL = "nguyenletrungkien2006@gmail.com";

const ROWS = [
  { label: "Phone", value: "+1 (813) 679-8339", href: "tel:+18136798339", external: false, preview: false },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kien-le-trung-nguyen",
    href: "https://www.linkedin.com/in/kien-le-trung-nguyen/",
    external: true,
    preview: false,
  },
  { label: "Résumé", value: "View résumé", href: RESUME_URL, external: false, preview: true },
];

const valueClass =
  "group inline-flex min-w-0 items-center gap-3 break-all text-lg font-medium text-ink md:text-2xl";
const arrow =
  "inline-block shrink-0 text-signal-ink transition-transform duration-200 group-hover:translate-x-1";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <footer id="contact" className="pt-20 md:pt-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="h-px w-full bg-ink" aria-hidden="true" />
        <div className="mt-3 flex items-center justify-between">
          <span className="label">06 — Contact</span>
          <span className="label" aria-hidden="true">
            Sheet 06 / 06
          </span>
        </div>

        <h2 className="mt-8 font-display text-[clamp(2.75rem,8.5vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
          Let&apos;s build robots together<span className="text-signal">.</span>
        </h2>

        <ul className="mt-14 border-t border-rule-strong md:mt-20">
          <li className="grid gap-2 border-b border-rule py-5 md:grid-cols-[220px_1fr] md:items-center">
            <span className="label">Email</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <a href={`mailto:${EMAIL}`} className={valueClass}>
                {EMAIL}
                <span aria-hidden="true" className={arrow}>→</span>
              </a>
              <button
                type="button"
                onClick={copy}
                aria-label="Copy email address"
                className="border border-rule-strong px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? "Email address copied" : ""}
              </span>
            </div>
          </li>

          {ROWS.map((r) => (
            <li
              key={r.label}
              className="grid gap-2 border-b border-rule py-5 md:grid-cols-[220px_1fr] md:items-center"
            >
              <span className="label">{r.label}</span>
              <a
                href={r.href}
                className={valueClass}
                {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(r.preview ? { onClick: onResumeClick } : {})}
              >
                {r.value}
                <span aria-hidden="true" className={arrow}>
                  {r.external ? "↗" : "→"}
                </span>
              </a>
            </li>
          ))}

          <li className="grid gap-2 border-b border-rule py-5 md:grid-cols-[220px_1fr] md:items-center">
            <span className="label">Location</span>
            <span className="text-lg font-medium text-ink md:text-2xl">Tampa, FL</span>
          </li>
        </ul>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © 2026 Kien Nguyen ·{" "}
            <a
              href="https://github.com/Murathanx12/Web-Portfolio-Template"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-ink"
            >
              Built on an MIT template by Murathan Abdullaev
            </a>
          </p>
          <a href="#top" className="label hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
