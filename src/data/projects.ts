export interface Project {
  slug: string;
  title: string;
  org: string;
  period: string;
  tags: string[];
  status?: "in-progress";
  metrics: { value: string; label: string }[];
  summary: string;
  problem: string;
  approach: string;
  results: string[];
  role: string;
  tools: string[];
  thumbnail: string;
  images: string[];
  links?: { label: string; url: string }[];
  chart?: SubmersionChart;
}

export interface SubmersionChart {
  title: string;
  unit: string;
  categories: string[];
  series: { name: string; values: number[]; accent?: boolean }[];
}

// ─────────────────────────────────────────────────────────────
// CASE STUDIES — shown in the Selected Work section.
// To swap a drawing for a photo, change `thumbnail` (and `images`).
// ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "duo-planetary-actuator",
    title: "Duo-Planetary Actuator Prototypes",
    org: "VinMotion, Hanoi",
    period: "Summer 2025",
    tags: ["Actuators", "Humanoids", "CAD", "3D Printing"],
    metrics: [
      { value: "2", label: "full-scale actuator prototypes" },
      { value: "19", label: "humanoid assemblies inspected" },
    ],
    summary:
      "Built two 3D-printed duo-planetary actuator prototypes and inspected 19 humanoid assemblies before a public exhibition.",
    problem:
      "VinMotion wanted to explore self-manufactured actuators for its humanoid robots and catch design errors before a public exhibition.",
    approach:
      "Worked with the mechanical and actuator teams on CAD review, part fit-checks and assembly of 3D-printed duo-planetary actuators. Ran quality checks and assembly reviews on 16 A1.6 and 3 A2.1 humanoids, filed failure reports and fixed CAD issues.",
    results: [
      "2 full-scale prototypes built for future actuator experiments.",
      "Design errors flagged before the exhibition.",
      "Wrote A1.6 / A2.1 assembly instructions that cut onboarding time for new interns.",
    ],
    role: "Mechanical Engineering Intern",
    tools: ["SolidWorks", "Bambu Lab 3D printers", "Hand tools", "Assembly fixtures"],
    thumbnail: "/images/projects/duo-planetary-actuator.svg",
    images: [],
  },
  {
    slug: "rocket-airbrake",
    title: "Rocket Airbrake Mechanism",
    org: "NASA Student Launch, USF",
    period: "2024 – present",
    tags: ["Mechanism Design", "Aerostructures", "SolidWorks"],
    metrics: [
      { value: "~200%", label: "drag improvement" },
      { value: "42 N", label: "per flap" },
      { value: "≤4 lb", label: "system" },
    ],
    summary:
      "A compact, light airbrake mechanism iterated over three SolidWorks prototypes for USF's NASA Student Launch rocket.",
    problem:
      "The rocket needs active airbrakes to hit its target apogee: a compact, light mechanism that deploys flaps against subsonic airflow.",
    approach:
      "Designed and iterated 3 SolidWorks prototypes, optimizing lever-arm travel, packaging and flap geometry. Supported PID calibration and flight-readiness testing by measuring dimensions, mass properties and component angles.",
    results: [
      "~200% drag improvement across iterations.",
      "Mechanism targets 42 N drag per flap within a ≤4 lb budget.",
    ],
    role: "Aerostructures & Airbrake Mechanical Design Junior Engineer",
    tools: ["SolidWorks", "Shop tools", "Hand tools"],
    thumbnail: "/images/projects/rocket-airbrake.svg",
    images: [],
  },
  {
    slug: "bolted-fin-frame",
    title: "Bolted Fin Frame",
    org: "NASA Student Launch, USF",
    period: "2025",
    tags: ["Design for Maintenance", "SolidWorks"],
    metrics: [{ value: "~50%", label: "faster fin replacement" }],
    summary:
      "A bolted fin-can frame so damaged fins can be swapped on the full-scale rocket without re-bonding.",
    problem:
      "Damaged fins on the full-scale rocket needed to be replaceable without re-bonding.",
    approach:
      "Designed a bolted fin-can frame so damaged fins can be swapped on the full-scale rocket without re-bonding.",
    results: ["~50% faster fin replacement."],
    role: "Aerostructures & Airbrake Mechanical Design Junior Engineer",
    tools: ["SolidWorks", "Hand tools"],
    thumbnail: "/images/projects/bolted-fin-frame.svg",
    images: [],
  },
  {
    slug: "webbed-foot-quadruped",
    title: "Bio-Inspired Webbed Foot for a Quadruped",
    org: "ViSEF & ISEF 2023",
    period: "2022 – 2023",
    tags: ["Legged Robots", "Bio-inspired", "Sensors", "Research"],
    metrics: [
      { value: "25×", label: "lower foot pressure" },
      { value: "1st", label: "Prize, ViSEF" },
      { value: "USAID", label: "Special Award, ISEF" },
    ],
    summary:
      "A webbed foot that cut foot pressure about 25× so a quadruped can walk on landslide mud.",
    problem:
      "Rescue robots on landslide terrain sink into mud with about 50% water content.",
    approach:
      "Designed a webbed foot with a much larger end-effector contact area. Sized servos from first-principles torque calculations (leg geometry, stance, mass, joint angles), integrated FSR force sensors for terrain-aware foot placement, and programmed 8 gaits (walk, turn, pitch, roll, yaw).",
    results: [
      "~25× lower foot pressure.",
      "Submersion cut from 35 / 21 / 20 / 10 mm to 10 / 6 / 5 / 3 mm across four legs.",
      "Climbed a 20° incline carrying a 1 kg rescue payload.",
    ],
    role: "Researcher",
    tools: ["CAD", "Arduino", "C/C++", "FSR sensors", "Servos"],
    thumbnail: "/images/projects/webbed-foot-quadruped.svg",
    images: [],
    chart: {
      title: "Foot submersion in mud",
      unit: "mm",
      categories: ["Leg 1", "Leg 2", "Leg 3", "Leg 4"],
      series: [
        { name: "Rounded foot", values: [35, 21, 20, 10] },
        { name: "Webbed foot", values: [10, 6, 5, 3], accent: true },
      ],
    },
  },
  {
    slug: "cycloidal-gearbox",
    title: "Cycloidal Gearbox for NEMA 23",
    org: "Personal project",
    period: "2026",
    tags: ["Actuators", "Gearbox Design", "In Progress"],
    status: "in-progress",
    metrics: [{ value: "10 N·m", label: "target output torque" }],
    summary:
      "A 3D-printable cycloidal reducer for a NEMA 23 servo, targeting 10 N·m output.",
    problem:
      "A NEMA 23 servo needs a compact, 3D-printable reducer to reach robot-joint torque levels.",
    approach:
      "Designing a 3D-printable cycloidal reducer for a NEMA 23 servo, targeting 10 N·m output, alongside planetary gearbox prototypes.",
    results: ["In progress: design and prototyping underway."],
    role: "Designer (personal project)",
    tools: ["SolidWorks", "Bambu Lab 3D printers"],
    thumbnail: "/images/projects/cycloidal-gearbox.svg",
    images: [],
  },
];

// ─────────────────────────────────────────────────────────────
// PERSONAL INFO
// ─────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Kien Nguyen",
  fullName: "Le Trung Kien Nguyen",
  title: "Mechanical Engineering Student — Actuators, Mechanisms & Legged Robots",
  tagline:
    "Mechanical engineering student at USF designing actuators, mechanisms and legged robots — from first-principles torque math to the assembled prototype.",
  bio: "",
  education: "University of South Florida — B.S. Mechanical Engineering, expected May 2027",
  email: "nguyenletrungkien2006@gmail.com",
  phone: "+1 (813) 679-8339",
  location: "Tampa, FL",
  links: {
    linkedin: "https://linkedin.com/in/kien-le-trung-nguyen/",
  },
};
