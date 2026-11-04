"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { experience, type Experience } from "@/data/profile";
import { projects } from "@/data/projects";
import { CountUp } from "../effects/count-up";
import { Reveal } from "../effects/reveal";
import { Chip } from "../ui";

export function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-0.5 rounded bg-line sm:left-[11px]" />
      <motion.div
        aria-hidden
        style={{ scaleY }}
        className="absolute top-2 bottom-2 left-[7px] w-0.5 origin-top rounded bg-linear-to-b from-brand via-brand-2 to-brand-3 sm:left-[11px]"
      />
      <ol className="relative space-y-8 pl-8 sm:pl-12">
        {experience.map((job, i) => (
          <li key={job.company} className="relative">
            <span
              aria-hidden
              className="absolute top-8 -left-8 grid size-4 place-items-center rounded-full border-2 bg-white sm:-left-12 sm:size-6"
              style={{ borderColor: job.accent }}
            >
              <span className="size-1.5 rounded-full sm:size-2" style={{ background: job.accent }} />
            </span>
            <Reveal delay={i * 0.05}>
              <JobCard job={job} />
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

function JobCard({ job }: { job: Experience }) {
  const work = projects.filter((p) => p.company === job.company);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-line bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl sm:p-8">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: `linear-gradient(90deg, ${job.accent}, transparent 70%)` }}
      />

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="grid size-12 shrink-0 place-items-center rounded-2xl font-display text-xl font-extrabold text-white shadow-lg"
            style={{ background: job.accent, boxShadow: `0 12px 24px -12px ${job.accent}` }}
          >
            {job.company[0]}
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight">{job.company}</h3>
            <p className="font-medium text-ink-soft">{job.role}</p>
            <p className="mt-0.5 text-xs font-semibold" style={{ color: job.accent }}>
              {job.domain}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-sm sm:items-end">
          <span className="rounded-full bg-ink px-3 py-1 font-mono text-xs font-semibold text-white">{job.period}</span>
          <span className="inline-flex items-center gap-1 text-muted">
            <MapPin className="size-3.5" />
            {job.location}
          </span>
        </div>
      </header>

      <p className="mt-5 text-lg font-medium text-pretty text-ink">{job.summary}</p>

      <dl className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
        {job.metrics.map((m) => (
          <div
            key={m.label}
            className="flex flex-col-reverse justify-end rounded-2xl p-3 sm:p-4"
            style={{ background: `color-mix(in oklab, ${job.accent} 7%, white)` }}
          >
            <dt className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">{m.label}</dt>
            <dd>
              <CountUp
                value={m.value}
                className="block font-display text-lg font-extrabold tracking-tight whitespace-nowrap sm:text-3xl"
              />
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 space-y-2.5">
        {job.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-pretty text-ink-soft">
            <span
              aria-hidden
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white"
              style={{ background: job.accent }}
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <div className="flex flex-wrap gap-1.5">
          {job.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        {work.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label={`${job.company} case studies`}>
            {work.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}/`}
                  className="group/link inline-flex items-center gap-1 rounded-full border border-line bg-canvas px-3 py-1.5 text-sm font-semibold text-ink-soft transition hover:border-ink hover:bg-ink hover:text-white"
                >
                  {p.short}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
