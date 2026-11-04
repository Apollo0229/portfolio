"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data/profile";
import { projects } from "@/data/projects";
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
      <ol className="relative space-y-10 pl-8 sm:pl-12">
        {experience.map((job, i) => {
          const work = projects.filter((p) => p.company === job.company);
          return (
            <li key={job.company} className="relative">
              <span
                aria-hidden
                className="absolute top-2 -left-8 grid size-4 place-items-center rounded-full border-2 border-brand bg-white sm:-left-12 sm:size-6"
              >
                <span className="size-1.5 rounded-full bg-brand sm:size-2" />
              </span>
              <Reveal delay={i * 0.05}>
                <article className="rounded-3xl border border-line bg-white/90 p-6 shadow-sm transition hover:shadow-lg sm:p-8">
                  <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{job.company}</h3>
                      <p className="font-medium text-ink-soft">{job.role}</p>
                    </div>
                    <div className="text-sm text-muted sm:text-right">
                      <p className="font-mono font-semibold text-ink">{job.period}</p>
                      <p>{job.location}</p>
                    </div>
                  </header>
                  <p className="mt-3 inline-block rounded-full bg-brand/8 px-3 py-1 text-xs font-semibold text-brand">
                    {job.domain}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-pretty text-ink-soft">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-2" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {job.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                  {work.length > 0 && (
                    <div className="mt-6 border-t border-line pt-5">
                      <p className="font-mono text-[11px] font-bold tracking-widest text-muted uppercase">Case studies</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {work.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/projects/${p.slug}/`}
                              className="group inline-flex items-center gap-1 rounded-full border border-line bg-canvas px-3 py-1.5 text-sm font-semibold text-ink-soft transition hover:border-ink hover:bg-ink hover:text-white"
                            >
                              {p.short}
                              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
