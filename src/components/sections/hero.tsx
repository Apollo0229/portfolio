"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import type { Role } from "@/data/roles";
import { profile } from "@/data/profile";
import { NetworkCanvas } from "../effects/network-canvas";
import { RotatingWords } from "../effects/rotating-words";
import { TypedCode } from "../effects/typed-code";
import { CountUp } from "../effects/count-up";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero({ role }: { role: Role }) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40">
      {/* Background: aurora blobs, masked grid, live service graph. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 size-[34rem] animate-float rounded-full bg-brand/25 blur-3xl" />
        <div className="absolute top-10 -right-40 size-[30rem] animate-float rounded-full bg-brand-3/20 blur-3xl [animation-delay:-3s]" />
        <div className="absolute bottom-0 left-1/3 size-[26rem] animate-float rounded-full bg-sky-400/20 blur-3xl [animation-delay:-6s]" />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <NetworkCanvas className="absolute inset-0 size-full" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-canvas" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0">
          <motion.p
            {...rise(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-medium text-ink-soft shadow-sm backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Open to {role.title} roles · {profile.location}
          </motion.p>

          <motion.p {...rise(0.05)} className="mb-3 font-mono text-sm text-muted">
            Hi, I&apos;m <span className="font-semibold text-ink">{profile.name}</span>
            <span className="text-brand"> — “{profile.nickname}”</span>
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            className="font-display text-5xl leading-[1.02] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {role.headline[0]}{" "}
            <span className="text-gradient animate-gradient">{role.headline[1]}</span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="mt-6 text-lg font-medium text-ink-soft sm:text-xl">
            Specialized in{" "}
            <RotatingWords words={role.rotating} className="font-semibold text-brand" />
          </motion.p>

          <motion.p {...rise(0.26)} className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
            {role.summary}
          </motion.p>

          <motion.div {...rise(0.34)} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-semibold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
            >
              View case studies
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/80 px-5 py-3 font-semibold text-ink backdrop-blur transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg"
            >
              <Mail className="size-4" />
              Email me
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0"
        >
          <TypedCode key={role.key} lines={role.code} filename={`${role.key}.ts`} />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 right-2 rounded-xl border border-line bg-white px-4 py-3 shadow-xl sm:-right-6"
          >
            <p className="text-[11px] font-semibold tracking-wider text-muted uppercase">Shipped at</p>
            <p className="font-display text-base font-bold text-ink">Zapier · Regions Bank · Shipt · Daxko</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-4">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-white/80 shadow-sm backdrop-blur lg:grid-cols-4">
          {role.stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...rise(0.4 + i * 0.08)}
              className="border-line p-5 sm:p-6 [&:not(:last-child)]:border-r max-lg:[&:nth-child(2)]:border-r-0 max-lg:[&:nth-child(-n+2)]:border-b"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp value={s.value} className="block font-display text-2xl font-extrabold tracking-tight sm:text-3xl" />
                <span className="mt-1 block text-sm text-muted">{s.label}</span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
