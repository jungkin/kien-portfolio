export type MediaType = "image" | "video";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  media?: string;
  type: MediaType;
  category: string;
  year: string;
  link?: string;
}

// Filter categories. "All" is always first and shows everything.
export const categories = [
  "All",
  "Robotics",
  "Research",
  "Internship",
  "Others",
] as const;

export type Category = (typeof categories)[number];

// ─────────────────────────────────────────────────────────────
// GALLERY ITEMS — intentionally empty; the Gallery section is
// hidden while this array has no entries.
//
// To add an item, drop a file in public/images/gallery/ and push:
//   { id: "fin-can-1", title: "Fin can", description: "...",
//     image: "/images/gallery/fin-can-1.jpg", type: "image",
//     category: "Robotics", year: "2025" }
// For video: type "video", `image` = poster, `media` = file path.
// ─────────────────────────────────────────────────────────────

export const galleryItems: GalleryItem[] = [];
