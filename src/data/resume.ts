import type { MouseEvent } from "react";

// The résumé PDF lives in public/. A descriptive filename means a recruiter who
// saves it gets a sensible name. public/cv.pdf is kept as a copy so older links
// keep working.
export const RESUME_URL = "/Kien-Nguyen-Resume.pdf";

// Page 1 of the PDF rendered to an image (220 dpi). Mobile browsers can't show a
// PDF inside the page (Android Chrome downloads it instead), so the pop-up viewer
// shows this image. Regenerate it whenever the PDF changes.
export const RESUME_PREVIEW = "/images/resume-preview.webp";

const OPEN_EVENT = "resume:open";

/** Click handler for résumé links: opens the pop-up viewer instead of navigating.
 *  Ctrl/⌘/Shift/middle-click still follow the link to the raw PDF. */
export function onResumeClick(e: MouseEvent<HTMLAnchorElement>) {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onResumeOpen(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
