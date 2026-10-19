/* CAD Lab models. Adding a model = one entry here (+ the .glb in public/models).
   Standard GLB convention: units mm, centred at origin, one grey material,
   mesh/node names "<partname>_<index>". Articulated models (`articulated: true`)
   keep their node hierarchy (z-up, units mm, NOT centred) and are animated live. */

export type ExplodeMode =
  | { kind: "axial"; axis: "x" | "y" | "z" } // parts slide along one axis (shaft)
  | { kind: "radial" } // parts move away from the assembly centre
  | { kind: "none" }; // articulated model: no explode, joints animate instead

export interface CADModel {
  id: string;
  /** drawing-style index shown in the list, e.g. "M-01" */
  code: string;
  title: string;
  /** short context line: project / org */
  context: string;
  /** short tag for the list row */
  tag: string;
  src: string;
  note: string;
  explode: ExplodeMode;
  /** explode amount (0–1) the model opens with */
  defaultExplode: number;
  /** multiplier on the explode distance (1 = default spread) */
  explodeScale?: number;
  /** case-insensitive substrings of part names drawn in signal orange */
  highlight: string[];
  /** alt text for the canvas */
  alt: string;
  /** keep the node hierarchy and animate joints (URDF-style model, z-up) */
  articulated?: boolean;
}

export const MODELS: CADModel[] = [
  {
    id: "cycloidal-20to1",
    code: "M-01",
    title: "Cycloidal Reducer 20:1",
    context: "Personal project · NEMA 23 / 10 N·m target",
    tag: "Personal",
    src: "/models/cycloidal-20to1.glb",
    note: "The 20:1 variant of my 3D-printable cycloidal reducer for a NEMA 23 servo. The design is meant to be backdrivable and to hold up to 10 N·m; the cycloidal disks are drawn in orange.",
    explode: { kind: "axial", axis: "z" },
    defaultExplode: 0.3,
    highlight: ["cycloidal disk"],
    alt: "Interactive 3D model of a 20:1 cycloidal reducer assembly",
  },
  {
    id: "cycloidal-30to1",
    code: "M-02",
    title: "Compact Cycloidal Reducer 30:1",
    context: "Personal project",
    tag: "Personal",
    src: "/models/cycloidal-30to1.glb",
    note: "Compact variant with two cycloidal disks driven by an eccentric cam, sized for a NEMA 17 pancake motor. The 30:1 ratio is the second variant I explored alongside the 20:1 design.",
    explode: { kind: "axial", axis: "y" },
    defaultExplode: 0.3,
    highlight: ["cycloidal disk"],
    alt: "Interactive 3D model of a compact 30:1 cycloidal reducer with a NEMA 17 pancake motor",
  },
  {
    id: "planetary",
    code: "M-03",
    title: "Duo-Planetary Actuator Module",
    context: "VinMotion internship · Summer 2025 (prototype)",
    tag: "VinMotion",
    src: "/models/planetary.glb",
    note: "Two-stage (duo) planetary actuator module prototype from my VinMotion internship — 3D-printed for fit-check and assembly.",
    explode: { kind: "axial", axis: "z" },
    defaultExplode: 0.3,
    highlight: [],
    alt: "Interactive 3D model of a duo-planetary actuator module",
  },
  {
    id: "airbrake",
    code: "M-04",
    title: "Rocket Airbrake Assembly",
    context: "NASA Student Launch · USF",
    tag: "NASA SL",
    src: "/models/airbrake.glb",
    note: "Airbrake section for USF's NASA Student Launch rocket: a lead-screw nut drives a lever-arm linkage that deploys the flaps (orange) into the airflow. Targets 42 N of drag per flap within a ≤ 4 lb system.",
    explode: { kind: "radial" },
    defaultExplode: 0,
    explodeScale: 0.4,
    highlight: ["airbrakes flap"],
    alt: "Interactive 3D model of a rocket airbrake assembly with deploying flaps",
  },
  {
    id: "robot-arm",
    code: "M-05",
    title: "5-DOF Robot Arm (URDF)",
    context: "Personal project · SolidWorks → URDF",
    tag: "Personal",
    src: "/models/robot-arm.glb",
    note: "Robot arm modeled in SolidWorks and exported to URDF: 7 joints (5 revolute plus 2 prismatic gripper fingers, orange). The joints here sweep slowly through their URDF limits.",
    explode: { kind: "none" },
    defaultExplode: 0,
    highlight: ["link_6", "link_7"],
    alt: "Interactive 3D model of a 5-DOF robot arm with a two-finger gripper, joints animating within their limits",
    articulated: true,
  },
];

/** Resolve a hash/slug like "m-03" or an id to a model. */
export function findModel(key: string): CADModel | undefined {
  const k = key.toLowerCase();
  return MODELS.find((m) => m.code.toLowerCase() === k || m.id === k);
}
