"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";
import { roles } from "@/data/roles";
import { profile } from "@/data/profile";

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
];

const withSlash = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export function Nav() {
  const pathname = withSlash(usePathname());
  const activeRole = roles.find((r) => r.path === pathname);
  // Section anchors stay on the current role view; case-study pages link home.
  const base = activeRole?.path ?? "/";

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 max-w-6xl px-4">
        <nav className="flex items-center gap-3 rounded-2xl border border-line/80 bg-white/70 px-3 py-2 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl">
          <Link href={base} className="group flex shrink-0 items-center gap-2 pl-1">
            <span className="grid size-8 place-items-center rounded-lg bg-linear-to-br from-brand via-brand-2 to-brand-3 font-display text-sm font-extrabold text-white shadow-md transition-transform group-hover:rotate-6">
              AC
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-sm font-bold">{profile.name}</span>
              <span className="block font-mono text-[10px] tracking-wider text-muted uppercase">
                aka {profile.nickname}
              </span>
            </span>
          </Link>

          <div
            role="tablist"
            aria-label="Choose a role view"
            className="mx-auto flex min-w-0 items-center gap-0.5 overflow-x-auto rounded-xl bg-canvas p-1 [scrollbar-width:none]"
          >
            {roles.map((r) => {
              const active = r.key === activeRole?.key;
              return (
                <Link
                  key={r.key}
                  href={r.path}
                  scroll={false}
                  role="tab"
                  aria-selected={active}
                  className={`relative shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                    active ? "text-white" : "text-muted hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="role-pill"
                      className="absolute inset-0 rounded-lg bg-ink shadow"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{r.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`${base}#${s.id}`}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-canvas hover:text-ink"
              >
                {s.label}
              </Link>
            ))}
          </div>
          <Link
            href={`${base}#contact`}
            className="hidden shrink-0 rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg md:block"
          >
            Contact
          </Link>
        </nav>
      </div>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 h-0.5 origin-left bg-linear-to-r from-brand via-brand-2 to-brand-3"
      />
    </header>
  );
}
