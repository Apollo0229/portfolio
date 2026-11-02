"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { trackLabels, type Project, type Track } from "@/data/projects";
import { SpotlightCard } from "../effects/spotlight-card";
import { Chip, TrackBadge, trackColor } from "../ui";

const filters: ("all" | Track)[] = ["all", "ai", "backend", "frontend", "fullstack"];

export function Work({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"all" | Track>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.track === filter);

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
            <span className="relative">{f === "all" ? "All work" : trackLabels[f]}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={i === 0 && filter === "all" ? "md:col-span-2" : ""}
            >
              <ProjectCard project={p} featured={i === 0 && filter === "all"} />
            </motion.div>
          ))}
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
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white/90 p-6 shadow-sm transition-shadow hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] sm:p-8"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 rounded-t-3xl opacity-80"
          style={{ background: `linear-gradient(90deg, ${trackColor[p.track]}, transparent)` }}
        />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TrackBadge track={p.track} />
            <span className="text-xs font-semibold text-muted">{p.company}</span>
          </div>
          <span className="grid size-9 place-items-center rounded-full border border-line text-muted transition group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div className={featured ? "mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end" : "mt-6"}>
          <div>
            <h3 className={`font-display font-bold tracking-tight text-balance ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
              {p.title}
            </h3>
            <p className="mt-3 text-pretty text-muted">{p.tagline}</p>
          </div>

          <dl className={`grid gap-3 ${featured ? "grid-cols-3" : "mt-6 grid-cols-2"}`}>
            {(featured ? p.metrics : p.metrics.slice(0, 2)).map((m) => (
              <div key={m.label} className="rounded-2xl bg-canvas p-3">
                <dt className="font-display text-xl font-extrabold tracking-tight" style={{ color: trackColor[p.track] }}>
                  {m.value}
                </dt>
                <dd className="mt-0.5 text-xs leading-snug text-muted">{m.label}</dd>
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
