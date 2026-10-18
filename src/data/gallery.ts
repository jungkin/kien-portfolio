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

// ─────────────────────────────────────────────────────────────
// GALLERY CATEGORIES — Customize these to match your work.
// "All" is always first and shows everything.
// ─────────────────────────────────────────────────────────────

export const categories = [
  "All",
  "Robotics",
  "Research",
  "Internship",
  "Artworks",
  "Others",
] as const;

export type Category = (typeof categories)[number];

// ─────────────────────────────────────────────────────────────
// GALLERY ITEMS — The Library section at the bottom of the page.
// Add images and videos here. They'll be filterable by category.
//
// For images: just set `image` to the path in public/.
// For videos: set `type: "video"`, `image` to a thumbnail,
//             and `media` to the video file path.
// ─────────────────────────────────────────────────────────────

export const galleryItems: GalleryItem[] = [
  // ============ SAMPLE ITEMS ============
  {
    id: "sample-1",
    title: "Competition Day",
    description: "Your team at the competition. Replace this with your own photos.",
    image: "/images/gallery/sample/placeholder.jpg",
    type: "image",
    category: "Robotics",
    year: "2025",
  },
  {
    id: "sample-2",
    title: "Robot CAD Design",
    description: "Full CAD assembly of the competition robot.",
    image: "/images/gallery/sample/placeholder.jpg",
    type: "image",
    category: "Robotics",
    year: "2025",
  },
  {
    id: "sample-3",
    title: "Team Photo",
    description: "The crew that built it all. Add your team photos here.",
    image: "/images/gallery/sample/placeholder.jpg",
    type: "image",
    category: "Robotics",
    year: "2024",
  },
  {
    id: "sample-4",
    title: "Research Output",
    description: "Data visualization from your research project.",
    image: "/images/gallery/sample/placeholder.jpg",
    type: "image",
    category: "Research",
    year: "2023",
  },
  {
    id: "sample-5",
    title: "3D Visualization",
    description: "Interactive visualization built during an internship.",
    image: "/images/gallery/sample/placeholder.jpg",
    type: "image",
    category: "Internship",
    year: "2023",
  },
  {
    id: "sample-6",
    title: "Sci-Fi Environment",
    description: "Hard-surface sci-fi environment piece, modeled and rendered in Blender.",
    image: "/images/gallery/sample/placeholder.jpg",
    type: "image",
    category: "Artworks",
    year: "2023",
  },

  // ============ VIDEO EXAMPLE (uncomment to use) ============
  // {
  //   id: "sample-video-1",
  //   title: "Robot Test Run",
  //   description: "First test of the autonomous system.",
  //   image: "/images/video-thumbs/sample-thumb.jpg",
  //   media: "/videos/sample-video.mp4",
  //   type: "video",
  //   category: "Robotics",
  //   year: "2025",
  // },
];
