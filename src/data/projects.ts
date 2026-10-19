export interface ProjectVideo {
  src: string;
  poster: string;
  caption?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  /** "contain" for line drawings / cut-outs; photos default to "cover" */
  fit?: "cover" | "contain";
  /** label shown over the image, e.g. "Technical drawing" */
  tag?: string;
}

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
  /** compact spec sheet shown in the case study */
  specs?: { label: string; value: string }[];
  role: string;
  tools: string[];
  thumbnail: string;
  thumbnailAlt: string;
  thumbnailFit?: "cover" | "contain";
  /** CSS object-position for a cover thumbnail, e.g. "30% 50%" */
  thumbnailPosition?: string;
  /** hero clip: plays muted on card hover (desktop) and leads the case study */
  video?: ProjectVideo;
  /** additional clips shown in the case study */
  moreVideos?: ProjectVideo[];
  gallery: GalleryImage[];
  /** CAD Lab model code this project links to, e.g. "M-03" */
  cadModel?: string;
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
// The first entry is the featured (full-width) card.
// ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "webbed-foot-quadruped",
    title: "Bio-Inspired Webbed Foot for a Quadruped",
    org: "HCMC Science Fair & ISEF 2023",
    period: "2022 – 2023",
    tags: ["Legged Robots", "Bio-inspired", "Sensors", "Research"],
    metrics: [
      { value: "25×", label: "lower foot pressure" },
      { value: "20°", label: "incline climbed with a 1 kg kit" },
      { value: "ISEF", label: "2023 Finalist · USAID 3rd place" },
    ],
    summary:
      "A webbed foot that cut foot pressure about 25× so a quadruped can walk on landslide mud. ISEF 2023 finalist.",
    problem:
      "Rescue robots on landslide terrain sink into mud with about 50% water content. A small foot concentrates the robot's weight on a tiny patch, so the leg sinks and the robot stalls.",
    approach:
      "Designed a webbed foot with a much larger end-effector contact area (a fish-scale-patterned polypropylene sole, spring-suspended). Sized the servos from first-principles torque calculations (leg geometry, stance, mass, joint angles), put an FSR force sensor in each foot for terrain-aware foot placement, and programmed 8 gaits (walk, turn, pitch, roll, yaw) using inverse kinematics.",
    results: [
      "~25× lower foot pressure: 0.005 m² webbed foot area vs 0.0002 m² for the rounded foot.",
      "Submersion cut from 35 / 21 / 20 / 10 mm to 10 / 6 / 5 / 3 mm across four legs.",
      "Climbed a 20° incline carrying a 1 kg rescue-kit payload; also walked on a soft mattress.",
      "ISEF 2023 Finalist (Regeneron ISEF, Dallas, May 2023; project ROBO065T).",
      "USAID Science for Development Award, 3rd place — Working in Crisis & Conflict category, ISEF 2023.",
      "1st Prize, Robotics & Intelligent Machines — Ho Chi Minh City Science & Engineering Fair 2022–23.",
    ],
    specs: [
      { label: "Actuation", value: "12 × JX DC5821LV servos (21.8 kg·cm), 3 DOF per leg" },
      { label: "Leg segments", value: "8.8 cm upper / 14.4 cm lower" },
      { label: "Compute", value: "Raspberry Pi 4B + PCA9685 PWM driver" },
      { label: "Sensing", value: "4 × FSR-402 foot sensors, fisheye camera, GPS" },
      { label: "Power", value: "2S 5400 mAh LiPo" },
      { label: "Foot area", value: "0.005 m² webbed vs 0.0002 m² rounded (≈25×)" },
    ],
    role: "Researcher",
    tools: ["CAD", "3D printing", "Arduino", "Raspberry Pi", "C/C++", "FSR sensors", "Servos"],
    thumbnail: "/images/quadruped/mud-walk.webp",
    thumbnailAlt:
      "3D-printed quadruped robot with webbed feet standing on a patch of wet mud, camera head and wiring visible",
    thumbnailPosition: "50% 55%",
    video: {
      src: "/videos/quadruped-walk.mp4",
      poster: "/images/quadruped/walk-poster.webp",
      caption: "Side-view walking gait",
    },
    moreVideos: [
      {
        src: "/videos/quadruped-demo-full.mp4",
        poster: "/images/quadruped/demo-full-poster.webp",
        caption: "Full demo: side gait, turning in place, lateral and front gaits, crouch and stand",
      },
      {
        src: "/videos/quadruped-soft-terrain.mp4",
        poster: "/images/quadruped/soft-terrain-poster.webp",
        caption: "Soft terrain (mattress), carrying cargo",
      },
      {
        src: "/videos/quadruped-slope.mp4",
        poster: "/images/quadruped/slope-poster.webp",
        caption: "Incline test with cargo",
      },
    ],
    gallery: [
      {
        src: "/images/quadruped/mud-foot.webp",
        alt: "Front view of the quadruped on mud with webbed feet pressed into the surface and the camera head lit green",
        caption: "Front view: webbed feet on mud, camera head with two lights",
      },
      {
        src: "/images/quadruped/mud-test.webp",
        alt: "Quadruped from the front standing on wet mud",
        caption: "Webbed feet on the mud test bed",
      },
      {
        src: "/images/quadruped/side-gait.webp",
        alt: "Side profile of the quadruped mid-gait",
        caption: "Side profile mid-gait",
      },
      {
        src: "/images/quadruped/front-camera.webp",
        alt: "Low-angle front view of the quadruped's camera head with green light and two lamps",
        caption: "Camera head: fisheye camera and two lights",
      },
      {
        src: "/images/quadruped/cargo-hallway.webp",
        alt: "Quadruped walking down a hallway carrying a red tin cargo box",
        caption: "Carrying a cargo box (payload test)",
      },
      {
        src: "/images/quadruped/prototypes-cutout.webp",
        alt: "Quadruped with rounded feet carrying a red cargo box, cut out on a plain background",
        caption: "Quadruped with rounded feet carrying a cargo box",
        fit: "contain",
      },
      {
        src: "/images/quadruped/arm-bottle-grasp.webp",
        alt: "Quadruped with a mounted arm lifting a water bottle",
        caption: "Later iteration: manipulator arm + pan-tilt camera (lifting a bottle)",
      },
      {
        src: "/images/quadruped/pan-tilt-head.webp",
        alt: "Quadruped rearing up with a pan-tilt camera head",
        caption: "Later iteration: manipulator arm + pan-tilt camera (pan-tilt head)",
      },
      {
        src: "/images/projects/webbed-foot-quadruped.svg",
        alt: "Technical drawing of the webbed foot quadruped",
        caption: "Webbed foot, schematic drawing",
        fit: "contain",
        tag: "Technical drawing",
      },
    ],
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
      "Worked with the mechanical and actuator teams on CAD review, part fit-checks and assembly of 3D-printed duo-planetary actuators. Ran quality checks and assembly reviews on 16 A1.6 and 3 A2.1 humanoids, filed failure reports and fixed CAD issues. Printed on Bambu Lab H2D and X1C printers and was exposed to CNC manufacturing.",
    results: [
      "2 full-scale prototypes built for future actuator experiments.",
      "Design errors flagged before the exhibition.",
      "Wrote A1.6 / A2.1 assembly instructions that cut onboarding time for new interns.",
    ],
    role: "Mechanical Engineering Intern",
    tools: [
      "SolidWorks",
      "Bambu Lab H2D & X1C printers",
      "CNC exposure",
      "Hand tools",
      "Assembly fixtures",
    ],
    thumbnail: "/images/vinmotion/actuator-cutaway.webp",
    thumbnailAlt: "SolidWorks cutaway render of a duo-planetary actuator module",
    cadModel: "M-03",
    gallery: [
      {
        src: "/images/vinmotion/actuator-cutaway.webp",
        alt: "SolidWorks cutaway render of the duo-planetary actuator",
        caption: "Cutaway render of the actuator (SolidWorks)",
      },
      {
        src: "/images/vinmotion/logo-wall.webp",
        alt: "Kien Nguyen in a VinMotion polo, arms crossed, in front of the VinMotion logo wall",
        caption: "At VinMotion, Hanoi, summer 2025",
      },
      {
        src: "/images/projects/duo-planetary-actuator.svg",
        alt: "Technical drawing of a two-stage planetary actuator",
        caption: "Two-stage planetary actuator, schematic drawing",
        fit: "contain",
        tag: "Technical drawing",
      },
      {
        src: "/images/vinmotion/humanoid-company-photo.webp",
        alt: "VinMotion humanoid robot standing in an office corridor",
        caption: "VinMotion humanoid (company photo)",
      },
    ],
  },
  {
    slug: "rocket-airbrake",
    title: "Rocket Airbrake Mechanism",
    org: "NASA Student Launch, USF",
    period: "2025 – present",
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
      "Designed and iterated 3 SolidWorks prototypes, optimizing lever-arm travel, packaging and flap geometry. A lead-screw nut drives a lever-arm linkage that swings the flap out into the airstream. Supported PID calibration and flight-readiness testing by measuring dimensions, mass properties and component angles.",
    results: [
      "~200% drag improvement across iterations.",
      "Mechanism targets 42 N drag per flap within a ≤4 lb budget.",
      "Works during operation and flight without any major failure.",
    ],
    role: "Aerostructures & Airbrake Mechanical Design Junior Engineer",
    tools: ["SolidWorks", "Shop tools", "Hand tools"],
    thumbnail: "/images/airbrake/mechanism-poster.webp",
    thumbnailAlt: "SolidWorks view of the airbrake mechanism: lead screw, lever arms and a deployed flap",
    thumbnailPosition: "35% 50%",
    video: {
      src: "/videos/airbrake-mechanism.mp4",
      poster: "/images/airbrake/mechanism-poster.webp",
      caption: "SolidWorks motion study: lead-screw nut driving the lever-arm linkage to deploy the flap",
    },
    cadModel: "M-04",
    gallery: [
      {
        src: "/images/airbrake/render.webp",
        alt: "SolidWorks render of the airbrake assembly with bulkheads, stringers, a stepper motor and two deployed flaps",
        caption: "Airbrake section assembly with flaps deployed (SolidWorks)",
        fit: "contain",
      },
      {
        src: "/images/projects/rocket-airbrake.svg",
        alt: "Technical drawing of a rocket airbrake mechanism",
        caption: "Airbrake mechanism, schematic drawing",
        fit: "contain",
        tag: "Technical drawing",
      },
    ],
  },
  {
    slug: "cycloidal-gearbox",
    title: "Cycloidal Gearbox for NEMA 23",
    org: "Personal project",
    period: "2026 – present",
    tags: ["Actuators", "Gearbox Design", "In Progress"],
    status: "in-progress",
    metrics: [
      { value: "10 N·m", label: "target hold torque" },
      { value: "±0.4 mm", label: "printer tolerance to design around" },
      { value: "20:1 · 30:1", label: "ratio variants" },
    ],
    summary:
      "A backdrivable, 3D-printable cycloidal reducer for a NEMA 23 servo, targeting 10 N·m, with 20:1 and 30:1 variants.",
    problem:
      "A NEMA 23 servo needs a compact reducer to reach robot-joint torque levels. A printed cycloidal drive should be backdrivable and hold up to 10 N·m, but printer tolerance (about ±0.4 mm) threatens a low-backlash fit and friction heating may approach the plastic's glass transition.",
    approach:
      "Designing a 3D-printable cycloidal reducer for a NEMA 23 servo and trying different ratios: 20:1 and 30:1 variants, plus a compact version with two cycloidal disks on an eccentric cam for a NEMA 17 pancake motor. A v2 in aluminium 6061 is planned.",
    results: [
      "In progress: 20:1 and 30:1 variants modeled (see the CAD Lab).",
      "Waiting on bearings and bolts to assemble the first prototype.",
      "Next: v2 in aluminium 6061.",
    ],
    role: "Designer (personal project)",
    tools: ["SolidWorks", "Bambu Lab 3D printers"],
    thumbnail: "/images/cycloidal/cutaway-render.webp",
    thumbnailAlt: "SolidWorks cutaway render of a cycloidal gearbox showing stacked disks and bearings",
    cadModel: "M-01",
    gallery: [
      {
        src: "/images/cycloidal/cutaway-render.webp",
        alt: "SolidWorks cutaway render of the cycloidal gearbox",
        caption: "Cutaway render (SolidWorks)",
        fit: "contain",
      },
      {
        src: "/images/projects/cycloidal-gearbox.svg",
        alt: "Technical drawing of a cycloidal gearbox",
        caption: "Cycloidal reducer, schematic drawing",
        fit: "contain",
        tag: "Technical drawing",
      },
    ],
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
      "Designed a bolted fin-can frame so damaged fins can be swapped on the full-scale rocket without re-bonding. Produced the fin engineering drawings in SolidWorks.",
    results: [
      "~50% faster fin replacement.",
      "Fin drawings cover carbon fiber and fiberglass G12 variants.",
    ],
    specs: [
      { label: "Fin plate", value: "12.9 in × 7.7 in × 0.18 in (per drawing)" },
      { label: "Materials", value: "Carbon fiber or fiberglass G12" },
    ],
    role: "Aerostructures & Airbrake Mechanical Design Junior Engineer",
    tools: ["SolidWorks", "Hand tools"],
    thumbnail: "/images/airbrake/fin-drawing.webp",
    thumbnailAlt: "SolidWorks engineering drawing of a rocket fin, carbon fiber, NASA Student Launch 24-25",
    gallery: [
      {
        src: "/images/airbrake/fin-drawing.webp",
        alt: "Engineering drawing of the rocket fin in carbon fiber, dated 10/23/2024",
        caption: "Fin drawing: carbon fiber",
        fit: "contain",
        tag: "Technical drawing",
      },
      {
        src: "/images/airbrake/fin-fiber-drawing.webp",
        alt: "Engineering drawing of the rocket fin in fiberglass G12, dated 10/23/2024",
        caption: "Fin drawing: fiberglass G12 variant",
        fit: "contain",
        tag: "Technical drawing",
      },
      {
        src: "/images/projects/bolted-fin-frame.svg",
        alt: "Technical drawing of a bolted fin frame",
        caption: "Bolted fin-can frame, schematic drawing",
        fit: "contain",
        tag: "Technical drawing",
      },
    ],
  },
  {
    slug: "mars-rover",
    title: "Mars Rover (Rocker-Bogie)",
    org: "SolidWorks course → personal project",
    period: "2024 – present",
    tags: ["Mechanisms", "SolidWorks", "Simulation", "In Progress"],
    status: "in-progress",
    metrics: [
      { value: "100/100", label: "SolidWorks course final" },
      { value: "600 × 400 mm", label: "modular printed rover" },
    ],
    summary:
      "A rocker-bogie rover that started as a 100/100 SolidWorks course project and is becoming a 3D-printed modular 600 × 400 mm rover.",
    problem:
      "The course final required a full CAD model: at least 10 custom parts, assembly mates, engineering drawings and McMaster-Carr sourced parts. Arbitrary dimensions did not fit together, and the large assembly crashed my laptop.",
    approach:
      "Recalculated dimensions in assembly mode and split the model into sub-assemblies with lightweight mode to keep it responsive. Now evolving the design into a 3D-printed modular rover: a terrain-based tire pattern, rocker-bogie shear and bending simulation, and wheel torque calculations.",
    results: [
      "Scored 100/100 on the SolidWorks course final (Spring 2024).",
      "Sub-assemblies and lightweight mode solved the assembly crash.",
      "In progress: tire pattern, rocker-bogie stress simulation and wheel torque sizing for the 600 × 400 mm printed rover.",
    ],
    role: "Designer (course project, then personal project)",
    tools: ["SolidWorks", "SolidWorks Simulation", "McMaster-Carr", "3D printing"],
    thumbnail: "/images/mars-rover/solidworks-render.webp",
    thumbnailAlt: "SolidWorks render of a six-wheeled rocker-bogie rover with a mast camera",
    gallery: [
      {
        src: "/images/mars-rover/solidworks-render.webp",
        alt: "SolidWorks render of the six-wheel rocker-bogie rover from the course final project",
        caption: "Course final: full rover assembly (SolidWorks)",
      },
      {
        src: "/images/mars-rover/wireframe-render.webp",
        alt: "Rocker-bogie chassis model with chevron-pattern tires, overlaid on reference line art of a Mars rover",
        caption: "Rocker-bogie model with terrain-pattern tires, built over reference line art",
      },
    ],
  },
  {
    slug: "robot-arm-urdf",
    title: "5-DOF Robot Arm + URDF",
    org: "Personal project",
    period: "2026",
    tags: ["Robot Arm", "URDF", "SolidWorks", "Arduino"],
    metrics: [
      { value: "5-DOF", label: "arm + 2-finger gripper" },
      { value: "7", label: "URDF joints (5 revolute, 2 prismatic)" },
    ],
    summary:
      "A robot arm modeled in SolidWorks and exported to URDF with joint axes and limits, building on earlier Arduino servo-control prototypes.",
    problem:
      "Carry a CAD arm straight into a robot description (URDF) so the same model, with real joint axes and limits, can drive simulation and control code.",
    approach:
      "Modeled the arm in SolidWorks and exported it to URDF: 7 joints, 5 revolute plus 2 prismatic gripper fingers, each with an axis and limits. The same URDF skeleton animates in the CAD Lab (M-05). Earlier Arduino prototypes (2022) include an inverse-kinematics sketch (target x, y, z to base and two link angles driving hobby servos plus a gripper) and a joystick-controlled servo version.",
    results: [
      "URDF with 7 joints (5 revolute, 2 prismatic) exported from SolidWorks.",
      "Interactive model in the CAD Lab sweeps every joint through its limits.",
      "Arduino prototypes: closed-form 2-link inverse kinematics and joystick servo control.",
    ],
    specs: [
      { label: "Joints", value: "J1–J5 revolute, J6–J7 prismatic fingers" },
      { label: "Link offsets (URDF)", value: "400 mm and 350 mm" },
      { label: "Export", value: "SolidWorks to URDF (7 links + base)" },
    ],
    role: "Designer (personal project)",
    tools: ["SolidWorks", "URDF", "Arduino", "C/C++"],
    thumbnail: "/images/projects/robot-arm.svg",
    thumbnailAlt: "Technical drawing of a 5-DOF robot arm with joint callouts",
    thumbnailFit: "contain",
    cadModel: "M-05",
    gallery: [
      {
        src: "/images/projects/robot-arm.svg",
        alt: "Technical drawing of the 5-DOF robot arm with joint callouts J1 to J7",
        caption: "Arm kinematics, schematic drawing with joint callouts",
        fit: "contain",
        tag: "Technical drawing",
      },
    ],
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
