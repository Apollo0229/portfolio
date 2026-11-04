import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { roles } from "@/data/roles";

export const dynamic = "force-static";

const SITE = "https://apollo0229.github.io/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...roles.map((r) => ({ url: `${SITE}${r.path}`, priority: r.path === "/" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${SITE}/projects/${p.slug}/`, priority: 0.7 })),
  ];
}
