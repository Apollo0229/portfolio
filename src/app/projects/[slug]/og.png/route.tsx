import { ogCard } from "@/components/og-card";
import { getProject, projects, trackLabels, type Track } from "@/data/projects";

export const dynamic = "force-static";
export const dynamicParams = false;

// Satori cannot resolve CSS variables, so the track colors are repeated here.
const accent: Record<Track, string> = {
  ai: "#7c3aed",
  backend: "#059669",
  frontend: "#0284c7",
  fullstack: "#ea580c",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function GET(_: Request, { params }: RouteContext<"/projects/[slug]/og.png">) {
  const project = getProject((await params).slug)!;
  return ogCard({
    eyebrow: `${project.company} · ${trackLabels[project.track]}`,
    title: project.title,
    subtitle: project.tagline,
    accent: accent[project.track],
  });
}
