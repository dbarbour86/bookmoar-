import { ImageResponse } from "next/og";

// Apple Touch Icon dimensions
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "#FF2538",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F5F5F5",
          borderRadius: "50%",
          fontWeight: 900,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-4px",
          paddingBottom: "4px",
        }}
      >
        BM
      </div>
    ),
    {
      ...size,
    }
  );
}
