export interface FlipCardData {
  id: string;
  title: string;
  image: string;
  description: string;
  year: string;
}

// ─────────────────────────────────────────────────────────────
// FLIP CARDS — These appear in the About section as a 2x3 grid.
// Each card has a front image and a back with text.
// Replace with your own projects/highlights.
// ─────────────────────────────────────────────────────────────

export const flipCards: FlipCardData[] = [
  {
    id: "highlight-1",
    title: "Competition Robotics",
    image: "/images/hero/hero-placeholder.jpg",
    description:
      "5 years of competitive robotics across multiple teams. Awards, late-night builds, and way too much hot glue. Replace this with your own highlight.",
    year: "2020-2025",
  },
  {
    id: "highlight-2",
    title: "Team Leadership",
    image: "/images/hero/hero-placeholder.jpg",
    description:
      "Founded and led a team of 30+ members. Secured sponsorships, mentored students, and somehow kept the robot from catching fire. Your story goes here.",
    year: "2023-2025",
  },
  {
    id: "highlight-3",
    title: "CAD & Design",
    image: "/images/gallery/sample/placeholder.jpg",
    description:
      "Full CAD assemblies from drivetrain to mechanisms. Everything designed in Fusion 360 with manufacturing-ready drawings. Swap in your design work.",
    year: "2020-2025",
  },
  {
    id: "highlight-4",
    title: "R&D Engineering",
    image: "/images/gallery/sample/placeholder.jpg",
    description:
      "Internship experience in product design, 3D visualization, and prototyping. Real-world engineering with real deadlines. Add your own experience.",
    year: "2023",
  },
  {
    id: "highlight-5",
    title: "Aerospace & UAV",
    image: "/images/gallery/sample/placeholder.jpg",
    description:
      "Designed a fixed-wing UAV from concept through CFD analysis to prototype. Replace with your own aerospace, drone, or hardware project.",
    year: "2021-2022",
  },
  {
    id: "highlight-6",
    title: "3D Art & VFX",
    image: "/images/gallery/sample/placeholder.jpg",
    description:
      "Hard-surface modeling, sci-fi environments, and concept art. Blender and Unreal Engine are the tools of choice. Show off your creative side.",
    year: "2019-Present",
  },
];

// ─────────────────────────────────────────────────────────────
// SKILLS — Add, remove, or recategorize as needed.
// Categories: mechanical, software, design, tools
// ─────────────────────────────────────────────────────────────

export type SkillCategory = "mechanical" | "software" | "design" | "tools";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export const skills: Skill[] = [
  { name: "Fusion 360", category: "mechanical" },
  { name: "CNC", category: "mechanical" },
  { name: "Laser Cutting", category: "mechanical" },
  { name: "Sheet Metal", category: "mechanical" },
  { name: "3D Printing", category: "mechanical" },
  { name: "Python", category: "software" },
  { name: "C++", category: "software" },
  { name: "React", category: "software" },
  { name: "Next.js", category: "software" },
  { name: "FastAPI", category: "software" },
  { name: "TensorFlow", category: "software" },
  { name: "Git", category: "software" },
  { name: "Blender", category: "design" },
  { name: "Unreal Engine", category: "design" },
  { name: "Substance Painter", category: "design" },
  { name: "Revit", category: "design" },
  { name: "Three.js", category: "design" },
  { name: "ESP32", category: "tools" },
  { name: "Raspberry Pi", category: "tools" },
  { name: "Arduino", category: "tools" },
];
