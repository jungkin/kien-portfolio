export const portrait: string | null = "/images/about/portrait-1.webp";

export const bio: string[] = [
  "I'm Kien, a mechanical engineering student at the University of South Florida. I've spent a summer assembling and debugging humanoid robots at VinMotion in Hanoi, I design airbrakes for USF's NASA Student Launch rocket, and back in high school I built a quadruped that could walk on landslide mud.",
  "I like the part of robotics where the math meets the metal: sizing a motor, packaging a gearbox, and making the thing actually fit together on the bench.",
];

export const currently =
  "NOW: B.S. ME @ USF, junior · NASA Student Launch airbrakes · building a cycloidal gearbox";

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "CAD / Design",
    items: [
      "SolidWorks (CSWA)",
      "Part design",
      "Surface modeling",
      "Mechanical assemblies",
      "Engineering drawings",
      "Actuator components",
      "DFM for 3D printing",
      "McMaster-Carr sourcing",
      "GD&T basics",
    ],
  },
  {
    category: "Analysis / Simulation",
    items: [
      "Ansys",
      "SolidWorks Simulation",
      "Topology optimization",
      "First-principles stress/strain",
      "Torque sizing",
      "Tolerance analysis",
      "Stiffness estimation",
    ],
  },
  {
    category: "Robotics / Actuators",
    items: [
      "Planetary gearboxes",
      "Cycloidal gearboxes",
      "Motors",
      "Bearings",
      "Sensors",
      "Inverse kinematics",
      "Basic motion control",
    ],
  },
  {
    category: "Programming / Test",
    items: ["MATLAB", "Python", "C/C++", "Arduino", "VS Code", "Data analysis", "Test scripting"],
  },
  {
    category: "Manufacturing",
    items: [
      "3D printing (Bambu Lab)",
      "Soldering",
      "Hand & shop tools",
      "Prototype assembly",
      "Fit-checking",
    ],
  },
];

export const certification = {
  name: "Certified SolidWorks Associate",
  short: "CSWA",
};

export interface Award {
  year: string;
  title: string;
  detail?: string;
}

export const awards: Award[] = [
  {
    year: "2023",
    title: "ISEF 2023 Finalist",
    detail: "Regeneron International Science & Engineering Fair, Dallas (May 2023) · project ROBO065T",
  },
  {
    year: "2023",
    title: "USAID Science for Development Award, 3rd Place",
    detail: "Working in Crisis & Conflict category, ISEF 2023",
  },
  {
    year: "2023",
    title: "1st Prize, Robotics & Intelligent Machines",
    detail: "Ho Chi Minh City Science & Engineering Fair 2022–23",
  },
  {
    year: "2023",
    title: "1st Place, 4-Wheel LEGO Category",
    detail: "13th Nadav Shoham Robotraffic Competition (Technion)",
  },
  {
    year: "2022–23",
    title: "Master Robot Builders, Finland",
    detail: "Participant, 2022 and 2023",
  },
  {
    year: "2025",
    title: "Certified SolidWorks Associate (CSWA) and Additive Manufacturing Associate",
    detail: "April 2025",
  },
  { year: "—", title: "Head of Technical Faculty", detail: "Le Hong Phong Science Club" },
];

export interface AboutPhoto {
  src: string;
  alt: string;
  caption: string;
}

// ISEF 2023 photo strip, shown under the awards list.
export const isefPhotos: AboutPhoto[] = [
  {
    src: "/images/about/isef-usaid-award.webp",
    alt: "ISEF 2023 stage screen listing Minh Duc Le and Le Trung Kien Nguyen of Ho Chi Minh, Viet Nam, as third place in the USAID award, with the awardees on stage",
    caption: "USAID Science for Development Award, 3rd place — ISEF 2023, Dallas",
  },
  {
    src: "/images/about/isef-sendoff-with-advisors.webp",
    alt: "Two ISEF team students in suits with their two advisors in front of the Van Mieu gate in Hanoi",
    caption: "Before departing for ISEF, with my advisors",
  },
];
