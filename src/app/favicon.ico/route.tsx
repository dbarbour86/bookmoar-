import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
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
      width: 32,
      height: 32,
    }
  );
}
