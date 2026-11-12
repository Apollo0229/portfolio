import Link from "next/link";
import { Activity, Gauge, Inbox, LifeBuoy, Radio, ShieldCheck, type LucideIcon } from "lucide-react";
import { getProject, patterns } from "@/data/projects";
import { Reveal } from "../effects/reveal";
import { SpotlightCard } from "../effects/spotlight-card";
import { trackColor } from "../ui";

const icons: Record<string, LucideIcon> = {
  events: Radio,
  outbox: Inbox,
  realtime: Activity,
  interfaces: Gauge,
  ai: ShieldCheck,
  resilience: LifeBuoy,
};

/** Recurring engineering themes, each linked to the case studies that use it. */
export function Patterns() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {patterns.map((pattern, i) => {
        const Icon = icons[pattern.id];
        return (
          <Reveal key={pattern.id} delay={i * 0.05} className="h-full">
            <SpotlightCard tilt={3} className="h-full rounded-3xl">
              <div className="flex h-full flex-col rounded-3xl border border-line bg-white/90 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-brand via-brand-2 to-brand-3 text-white shadow-md shadow-brand/30">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs font-bold text-muted/60">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{pattern.title}</h3>
                <p className="mt-2 text-pretty text-muted">{pattern.body}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {pattern.projects.map((slug) => {
                    const project = getProject(slug);
                    if (!project) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/projects/${slug}/`}
                          className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-2.5 py-1 text-xs font-semibold text-ink-soft transition hover:border-ink hover:text-ink"
                        >
                          <span className="size-1.5 rounded-full" style={{ background: trackColor[project.track] }} />
                          {project.short}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>
        );
      })}
    </div>
  );
}
