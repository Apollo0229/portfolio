import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const font = (weight: number) => readFile(join(process.cwd(), `src/assets/fonts/bricolage-${weight}.ttf`));

/** Shared 1200×630 link-preview card rendered at build time. */
export async function ogCard({ eyebrow, title, subtitle, accent }: { eyebrow: string; title: string; subtitle: string; accent: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #f6f7fb 0%, #eef0ff 55%, #fdf0f7 100%)",
          color: "#0b0d1a",
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed, #db2777)",
              color: "white",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            AC
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 800, color: accent, letterSpacing: 2, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: title.length > 40 ? 64 : 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#5d6380", lineHeight: 1.35 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24, color: "#2a2f45" }}>
          <div style={{ display: "flex", fontWeight: 800 }}>Austin Creamer · Senior Full-Stack Engineer</div>
          <div style={{ display: "flex", width: 220, height: 10, borderRadius: 5, background: "linear-gradient(90deg, #4f46e5, #7c3aed, #db2777)" }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: await font(500), weight: 500, style: "normal" },
        { name: "Bricolage", data: await font(800), weight: 800, style: "normal" },
      ],
    },
  );
}
