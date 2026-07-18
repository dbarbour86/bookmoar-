import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 270,
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
          letterSpacing: "-10px",
          paddingBottom: "10px",
        }}
      >
        BM
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}
