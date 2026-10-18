export interface PolyModel {
  id: string;
  title: string;
  thumbnail: string;
  link: string;
}

// ─────────────────────────────────────────────────────────────
// POLY MODELS — These appear in the "Poly Models" section.
// Each links to an ArtStation (or other) page.
// Replace thumbnails and links with your own.
// ─────────────────────────────────────────────────────────────

export const polyModels: PolyModel[] = [
  {
    id: "model-1",
    title: "Sci-Fi Environment",
    thumbnail: "/images/gallery/sample/placeholder.jpg",
    link: "https://www.artstation.com/your-profile",
  },
  {
    id: "model-2",
    title: "Vehicle Concept",
    thumbnail: "/images/gallery/sample/placeholder.jpg",
    link: "https://www.artstation.com/your-profile",
  },
  {
    id: "model-3",
    title: "Character Design",
    thumbnail: "/images/gallery/sample/placeholder.jpg",
    link: "https://www.artstation.com/your-profile",
  },
];

// Link to your ArtStation profile (shown as "More on ArtStation" button)
export const artstationProfile = "https://www.artstation.com/your-profile";
