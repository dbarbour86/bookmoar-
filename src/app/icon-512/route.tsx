import fs from "fs";
import path from "path";

export function GET() {
  const filePath = path.join(process.cwd(), "public", "icon-512.png");
  const buffer = fs.readFileSync(filePath);

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
