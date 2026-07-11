import { ImageResponse } from "next/og";

// Favicon dimensions
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Dynamically generate the favicon using JSX
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
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
          letterSpacing: "-1px",
          paddingBottom: "1px",
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
