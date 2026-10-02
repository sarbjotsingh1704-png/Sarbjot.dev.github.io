import fs from "node:fs";
import path from "node:path";

// Looks for public/images/portrait.(jpg|jpeg|png|webp). Returns its URL, or null so
// components can render a clean placeholder until you add your photo.
export function getPortrait() {
  const dir = path.join(process.cwd(), "public", "images");
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (fs.existsSync(path.join(dir, `portrait.${ext}`))) return `/images/portrait.${ext}`;
  }
  return null;
}
