// Set to a path like "/images/portrait.jpg" once a photo is added to public/.
export const portrait: string | null = null;

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
  { year: "2023", title: "USAID Special Award", detail: "ISEF" },
  { year: "2023", title: "1st Prize", detail: "ViSEF" },
  { year: "2023", title: "1st Prize", detail: "Technion Robotraffic" },
  { year: "—", title: "Head of Technical Faculty", detail: "Le Hong Phong Science Club" },
];
