export type RenderStyle = "ink" | "shaded";

export interface ModelStats {
  /** bounding box in mm (x, y, z) */
  bbox: [number, number, number];
  /** unique part names */
  parts: number;
  /** individual meshes */
  bodies: number;
  tris: number;
}
