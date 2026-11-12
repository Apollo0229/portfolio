import type { ReactNode } from "react";
import { trackLabels, type Company, type Track } from "@/data/projects";
import { Reveal } from "./effects/reveal";

export const trackColor: Record<Track, string> = {
  ai: "var(--color-track-ai)",
  backend: "var(--color-track-backend)",
  frontend: "var(--color-track-frontend)",
  fullstack: "var(--color-track-fullstack)",
};

export const companyColor: Record<Company, string> = {
  Zapier: "#ff4f00",
  "Regions Bank": "#4d8a1f",
  Shipt: "#0f9d76",
  Daxko: "#2563eb",
};

export function CompanyMark({ company }: { company: Company }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
      <span
        aria-hidden
        className="grid size-5 place-items-center rounded-md font-display text-[10px] font-extrabold text-white"
        style={{ background: companyColor[company] }}
      >
        {company[0]}
      </span>
      {company}
    </span>
  );
}

export function TrackBadge({ track }: { track: Track }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{
        color: trackColor[track],
        background: `color-mix(in oklab, ${trackColor[track]} 10%, white)`,
      }}
    >
      <span className="size-1.5 rounded-full" style={{ background: trackColor[track] }} />
      {trackLabels[track]}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-white px-2 py-0.5 font-mono text-[11px] text-ink-soft">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <p className="mb-3 font-mono text-xs font-semibold tracking-[0.2em] text-brand uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-pretty text-muted">{intro}</p>}
    </Reveal>
  );
}
