"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { trackLabels, type Project, type Track } from "@/data/projects";
import { SpotlightCard } from "../effects/spotlight-card";
import { Chip, CompanyMark, TrackBadge, trackColor } from "../ui";

const filters: ("all" | Track)[] = ["all", "ai", "backend", "frontend", "fullstack"];

export function Work({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"all" | Track>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.track === filter);
  const count = (f: "all" | Track) => (f === "all" ? projects.length : projects.filter((p) => p.track === f).length);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter case studies by track">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`relative rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              filter === f ? "border-ink text-white" : "border-line bg-white text-muted hover:text-ink"
            }`}
          >
            {filter === f && (
              <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <span className="relative">
              {f === "all" ? "All work" : trackLabels[f]}
              <span className={`ml-1.5 font-mono text-xs ${filter === f ? "text-white/60" : "text-muted/70"}`}>{count(f)}</span>
            </span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => {
            const featured = i === 0 && filter === "all";
            return (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={featured ? "md:col-span-2 lg:col-span-3" : ""}
              >
                <ProjectCard project={p} featured={featured} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function ProjectCard({ project: p, featured }: { project: Project; featured: boolean }) {
  return (
    <SpotlightCard color={trackColor[p.track]} tilt={featured ? 2 : 4} className="h-full rounded-3xl">
      <Link
        href={`/projects/${p.slug}/`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white/90 p-6 shadow-sm transition-shadow hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] sm:p-7"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 rounded-t-3xl opacity-80"
          style={{ background: `linear-gradient(90deg, ${trackColor[p.track]}, transparent)` }}
        />
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <TrackBadge track={p.track} />
            <CompanyMark company={p.company} />
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div className={featured ? "mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end" : "mt-5"}>
          <div>
            <p className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-muted">
              <CalendarDays className="size-3.5" />
              {p.period}
            </p>
            <h3
              className={`mt-2 font-display font-bold tracking-tight text-balance ${featured ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}
            >
              {p.title}
            </h3>
            <p className="mt-3 text-pretty text-muted">{p.tagline}</p>
          </div>

          <dl className={`grid gap-3 ${featured ? "grid-cols-3" : "mt-6 grid-cols-2"}`}>
            {(featured ? p.metrics : p.metrics.slice(0, 2)).map((m) => (
              <div key={m.label} className="flex flex-col-reverse justify-end rounded-2xl bg-canvas p-3">
                <dt className="mt-0.5 text-xs leading-snug text-muted">{m.label}</dt>
                <dd className="font-display text-lg font-extrabold tracking-tight sm:text-xl" style={{ color: trackColor[p.track] }}>
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {p.stack.slice(0, featured ? 7 : 4).map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </Link>
    </SpotlightCard>
  );
}
