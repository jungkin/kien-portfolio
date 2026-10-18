export interface ExperienceEntry {
  dates: string;
  org: string;
  role: string;
  location: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    dates: "06/2025 – 08/2025",
    org: "VinMotion",
    role: "Mechanical Engineering Intern — Mechanical Design, CAD, Prototyping & Assembly",
    location: "Hanoi, Vietnam",
    bullets: [
      "Inspected 19 humanoid assemblies (16 A1.6 + 3 A2.1).",
      "Built 2 duo-planetary actuator prototypes.",
      "Fixed CAD issues and recommended design changes.",
      "Wrote assembly instructions to cut onboarding time.",
    ],
  },
  {
    dates: "09/2024 – present",
    org: "NASA Student Launch (USF)",
    role: "Aerostructures & Airbrake Mechanical Design Junior Engineer",
    location: "Tampa, FL",
    bullets: [
      "~200% airbrake drag improvement over 3 SolidWorks prototypes.",
      "42 N per flap mechanism within a ≤4 lb budget; bolted fin frame for ~50% faster replacement.",
      "Supported PID calibration and flight-readiness measurements.",
      "Manufactured and assembled custom parts.",
    ],
  },
  {
    dates: "09/2022 – 05/2023",
    org: "ViSEF & ISEF",
    role: "Researcher — Quadruped robotics",
    location: "Texas, USA",
    bullets: [
      "Webbed foot with ~25× lower foot pressure than a rounded foot.",
      "FSR terrain sensing and 8 gaits; climbed a 20° incline with a 1 kg payload.",
      "Servo sizing via first-principles torque calculations.",
    ],
  },
  {
    dates: "—",
    org: "Le Hong Phong Science Club",
    role: "Head of Technical Faculty",
    location: "",
    bullets: ["Led robotics competition teams in automation and vehicle design."],
  },
];
