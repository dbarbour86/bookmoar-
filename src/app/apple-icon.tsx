import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// Apple Touch Icon dimensions
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  const filePath = path.join(process.cwd(), "public", "apple-icon.png");
  const base64 = fs.readFileSync(filePath).toString("base64");
  const dataUrl = `data:image/png;base64,${base64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dataUrl}
          alt="Book Moar"
          width="180"
          height="180"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
