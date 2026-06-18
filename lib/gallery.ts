import fs from "fs";
import path from "path";

const IMAGE_EXT = /\.(png|jpe?g|webp|gif)$/i;

export function listGalleryImages(): string[] {
  const dir = path.join(process.cwd(), "public", "gallery");
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
      .map((e) => `/gallery/${encodeURIComponent(e.name)}`)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}
