export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  description: string;
  role: string;
  tools: string[];
  highlights: string[];
  thumbnail: string;
  images: string[];
  modelPath?: string;
  sketchfabId?: string;
  links?: { label: string; url: string }[];
}

// ─────────────────────────────────────────────────────────────
// SAMPLE PROJECTS — Replace these with your own work.
// Each project gets its own card in the Projects section and
// a detail overlay. Add as many as you like.
// ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "project-alpha",
    title: "Project Alpha",
    subtitle: "Lead Engineer — Autonomous Systems",
    year: "2024-2025",
    tags: ["Robotics", "AI", "Embedded Systems"],
    description:
      "An autonomous navigation system built from scratch. Integrated LiDAR, computer vision, and path-planning algorithms to guide a mobile robot through dynamic environments. As Optimus Prime once said: freedom is the right of all sentient beings — and this robot is free to roam wherever it pleases.",
    role: "Lead Engineer — System architecture, sensor fusion, navigation stack",
    tools: ["Python", "ROS2", "TensorFlow", "Fusion 360"],
    highlights: [
      "Real-time obstacle avoidance at 30fps",
      "Won 1st place at Regional Robotics Competition",
      "Integrated 4 sensor modalities into unified pipeline",
      "Open-sourced the navigation stack",
    ],
    thumbnail: "/images/gallery/sample/project-alpha.jpg",
    images: [
      "/images/gallery/sample/project-alpha-2.jpg",
      "/images/gallery/sample/project-alpha-3.jpg",
    ],
    links: [],
  },
  {
    slug: "project-beta",
    title: "Project Beta",
    subtitle: "Mechanical Design Lead — Competition Robot",
    year: "2023-2024",
    tags: ["CAD", "Manufacturing", "Mechanical Design"],
    description:
      "Designed and manufactured a competition robot from the ground up. Every bracket, gearbox, and weld was planned in CAD before hitting the shop floor. The robot could lift, score, and climb — a true Swiss Army knife of the arena.",
    role: "Mechanical Design Lead — Full robot CAD, manufacturing, assembly",
    tools: ["Fusion 360", "CNC", "Laser Cutting", "Sheet Metal", "3D Printing"],
    highlights: [
      "200+ part assembly with full constraints",
      "Custom swerve drive system",
      "Designed for manufacturability with student team",
      "Regional finalist — top 8 out of 40 teams",
    ],
    thumbnail: "/images/gallery/sample/project-beta.jpg",
    images: [
      "/images/gallery/sample/project-beta-2.jpg",
    ],
    links: [],
  },
  {
    slug: "project-gamma",
    title: "Project Gamma",
    subtitle: "Research Intern — Deep Learning & Signal Processing",
    year: "2023",
    tags: ["AI", "Deep Learning", "Research", "Audio"],
    description:
      "Research project exploring acoustic localization using deep learning. Built a CNN-based framework that processes multi-channel audio to predict real-time 2D positions. The three laws of robotics say a robot must obey orders — this one just listens really well.",
    role: "Research Intern — Model architecture, data pipeline, experiments",
    tools: ["Python", "TensorFlow", "NumPy", "Signal Processing"],
    highlights: [
      "Published research paper",
      "CNN with 4x Conv1D layers and dual-head output",
      "Multi-device audio synchronization framework",
    ],
    thumbnail: "/images/gallery/sample/project-gamma.jpg",
    images: [],
    links: [{ label: "Research Paper", url: "#" }],
  },
  {
    slug: "project-delta",
    title: "Project Delta",
    subtitle: "R&D Intern — 3D Visualization & Product Design",
    year: "2023",
    tags: ["R&D", "CAD", "3D Visualization", "Unreal Engine"],
    description:
      "Built an interactive 3D visualization application for client presentations. Modeled the product in Blender, rigged it for real-time interaction in Unreal Engine, and delivered a polished demo that helped close deals.",
    role: "R&D Engineer — Product design, 3D visualization, client demos",
    tools: ["Fusion 360", "Blender", "Unreal Engine", "3D Scanning"],
    highlights: [
      "Interactive real-time 3D product viewer",
      "CAD-to-polygon pipeline for game engine import",
      "Used for actual client pitches",
      "Hands-on manufacturing floor experience",
    ],
    thumbnail: "/images/gallery/sample/project-delta.jpg",
    images: [
      "/images/gallery/sample/project-delta-2.jpg",
    ],
    links: [],
  },
  {
    slug: "creative-portfolio",
    title: "3D Art & Creative Work",
    subtitle: "Hard Surface Modeling, Environments, Concept Art",
    year: "2020-Present",
    tags: ["3D Art", "Blender", "Unreal Engine", "VFX"],
    description:
      "Ongoing creative practice in hard-surface modeling, environment design, and concept art. Sci-fi corridors, mechs, vehicles — if it looks like it belongs in a space opera, it probably came from this portfolio.",
    role: "3D Artist — Modeling, texturing, lighting, rendering",
    tools: ["Blender", "Unreal Engine", "Substance Painter"],
    highlights: [
      "ArtStation portfolio with 10+ published pieces",
      "Sci-fi environments and vehicle concepts",
      "Game-ready assets and turntable renders",
    ],
    thumbnail: "/images/gallery/sample/creative.jpg",
    images: [
      "/images/gallery/sample/creative-2.jpg",
    ],
    links: [
      { label: "ArtStation", url: "https://www.artstation.com/your-profile" },
      { label: "Sketchfab", url: "https://sketchfab.com/your-profile" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// PERSONAL INFO — This is YOU. Update everything below.
// ─────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Your Name",
  title: "Your Title & Specialty",
  tagline: "I design and build things.",
  bio: "Write a short bio about yourself here. Talk about your background, what you study or do professionally, and what drives you. Two to three sentences is the sweet spot.\n\nEnd with something memorable. Something that makes people want to scroll down.",
  education: "",
  email: "your.email@example.com",
  links: {
    linkedin: "https://linkedin.com/in/your-profile",
    artstation: "https://www.artstation.com/your-profile",
    sketchfab: "https://sketchfab.com/your-profile",
    grabcad: "https://grabcad.com/your-profile",
    github: "https://github.com/your-username",
    youtube: "https://www.youtube.com/@your-channel",
  },
};
