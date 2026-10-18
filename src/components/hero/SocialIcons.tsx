"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/projects";

const socials = [
  {
    name: "GitHub",
    url: personalInfo.links.github,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: personalInfo.links.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "ArtStation",
    url: personalInfo.links.artstation,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 002.164 1.333h13.457l-2.792-4.838H0zm24-2.219a2.408 2.408 0 00-.476-1.439L14.458 0H9.632l9.9 17.143 3.542-1.639h.926zm-7.882 2.22L9.87 6.169l-6.248 10.82-.001.735h12.497z" />
      </svg>
    ),
  },
  {
    name: "Sketchfab",
    url: personalInfo.links.sketchfab,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.026.017a1.6 1.6 0 0 0-.756.2L1.626 5.536a1.6 1.6 0 0 0-.8 1.387v10.154a1.6 1.6 0 0 0 .8 1.386l9.644 5.32a1.6 1.6 0 0 0 1.536 0l9.644-5.32a1.6 1.6 0 0 0 .8-1.386V6.923a1.6 1.6 0 0 0-.8-1.387L13.006.217a1.6 1.6 0 0 0-.78-.2h-.2zm.078 3.07l7.384 4.073-7.384 4.073-7.384-4.073 7.384-4.073zM3.826 8.923l7.2 3.973v8.147l-7.2-3.973V8.923zm16.348 0v8.147l-7.2 3.973v-8.147l7.2-3.973z" />
      </svg>
    ),
  },
  {
    name: "GrabCAD",
    url: personalInfo.links.grabcad,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: personalInfo.links.youtube,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      {socials.map((social, i) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white hover:text-cyan hover:border-cyan hover:bg-cyan/5 transition-all duration-300"
          title={social.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + i * 0.08 }}
        >
          {social.icon}
        </motion.a>
      ))}
    </div>
  );
}
