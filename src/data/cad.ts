export interface CADModel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  year: string;
  tools: string[];
  highlights: string[];
  images?: string[];
  sketchfabId: string;
}

// ─────────────────────────────────────────────────────────────
// CAD MODELS — These appear in the "CAD Designs" section.
// Each model is embedded via Sketchfab. To add your own:
//   1. Upload your model to Sketchfab (free account)
//   2. Copy the model ID from the URL (the hash after /models/)
//   3. Add an entry below
// ─────────────────────────────────────────────────────────────

export const cadModels: CADModel[] = [
  {
    id: "sample-model-1",
    title: "Sample Robot 2025",
    subtitle: "Competition Robot — Season 2",
    description:
      "A full competition robot assembly. Replace this with your own Sketchfab model. Upload your Fusion 360 / Blender export to Sketchfab, grab the model ID, and paste it below.",
    thumbnail: "/images/cad/sample-1.jpg",
    year: "2025",
    tools: ["Fusion 360", "CNC", "Laser Cutting", "Sheet Metal", "3D Printing"],
    highlights: [
      "200+ part assembly",
      "Custom mechanisms",
      "Replace with your own highlights",
    ],
    // Replace with your Sketchfab model ID:
    sketchfabId: "fba020af78034ea0943043c295c45dc1",
  },
  {
    id: "sample-model-2",
    title: "Sample Robot 2024",
    subtitle: "Competition Robot — Rookie Season",
    description:
      "Another example model entry. You can have as many or as few CAD models as you want in this section.",
    thumbnail: "/images/cad/sample-2.jpg",
    year: "2024",
    tools: ["Fusion 360", "Laser Cutting", "Sheet Metal", "3D Printing"],
    highlights: [
      "Designed for first-time builders",
      "Simple and reliable mechanisms",
      "Replace with your achievements",
    ],
    // Replace with your Sketchfab model ID:
    sketchfabId: "39678935659449599b18c3dee5a6bfe8",
  },
];

// Link to your GrabCAD profile (shown as "More models on GrabCAD" button)
export const grabcadProfile = "https://grabcad.com/your-profile";
