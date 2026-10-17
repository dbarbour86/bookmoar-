import fs from "fs";
import path from "path";

export function GET() {
  const filePath = path.join(process.cwd(), "public", "favicon.ico");
  const buffer = fs.readFileSync(filePath);

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/x-icon",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
