import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// Favicon dimensions
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  const filePath = path.join(process.cwd(), "public", "icon-32.png");
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
          width="32"
          height="32"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
