export interface ExperienceEntry {
  dates: string;
  org: string;
  role: string;
  location: string;
  bullets: string[];
  /** small renders shown under the bullets */
  images?: { src: string; alt: string; caption?: string }[];
}

export const experience: ExperienceEntry[] = [
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
    dates: "06/2025 – 08/2025",
    org: "VinMotion",
    role: "Mechanical Engineering Intern — Mechanical Design, CAD, Prototyping & Assembly",
    location: "Hanoi, Vietnam",
    bullets: [
      "Inspected 19 humanoid assemblies (16 A1.6 + 3 A2.1).",
      "Built 2 duo-planetary actuator prototypes on Bambu Lab H2D and X1C printers.",
      "Fixed CAD issues and recommended design changes; exposure to CNC manufacturing.",
      "Wrote assembly instructions to cut onboarding time.",
    ],
  },
  {
    dates: "Summer 2025",
    org: "C&D Semiconductor",
    role: "CAD Design Intern",
    location: "San Jose, CA",
    bullets: [
      "Designed test parts in SolidWorks for the company's latest photoresist and spin-on-dielectric process equipment.",
      "Worked on equipment modules, including a process cabinet and a spin-coat bowl module.",
    ],
    images: [
      {
        src: "/images/cd-semiconductor/module-1.webp",
        alt: "SolidWorks render of a process equipment cabinet with an aluminium frame, electronics rack and control panel",
        caption: "Process cabinet",
      },
      {
        src: "/images/cd-semiconductor/module-2.webp",
        alt: "SolidWorks render of a spin-coat bowl module with a dispense arm",
        caption: "Spin-coat bowl module",
      },
    ],
  },
  {
    dates: "09/2022 – 05/2023",
    org: "HCMC Science Fair & ISEF",
    role: "Researcher — Quadruped robotics",
    location: "Ho Chi Minh City, Vietnam · Dallas, TX",
    bullets: [
      "Webbed foot with ~25× lower foot pressure than a rounded foot.",
      "FSR terrain sensing and 8 gaits; climbed a 20° incline with a 1 kg payload.",
      "Servo sizing via first-principles torque calculations.",
      "ISEF 2023 Finalist; USAID Science for Development Award, 3rd place.",
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
