import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Flame, Layers, Sparkles, Target, Wrench } from "lucide-react";
import { getProject, patterns, projects, trackLabels } from "@/data/projects";
import { FlowDiagram } from "@/components/flow-diagram";
import { Reveal } from "@/components/effects/reveal";
import { CountUp } from "@/components/effects/count-up";
import { Chip, CompanyMark, TrackBadge, trackColor } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const url = `/projects/${project.slug}/`;
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.tagline,
      url,
      images: [{ url: `${url}og.png`, width: 1200, height: 630, alt: project.title }],
    },
    twitter: { title: project.title, description: project.tagline },
  };
}

export default async function CaseStudy({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const color = trackColor[project.track];
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];

  const story = [
    { icon: Layers, title: "Architecture", body: project.architecture },
    { icon: Flame, title: "The hard part", body: project.challenge },
    { icon: Wrench, title: "Approach", body: project.approach },
    { icon: CheckCircle2, title: "Outcome", body: project.outcome },
  ];
  const related = patterns.filter((p) => p.projects.includes(project.slug));

  return (
    <article>
      <header className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div
            className="absolute -top-32 left-1/2 size-[40rem] -translate-x-1/2 animate-float rounded-full blur-3xl"
            style={{ background: `color-mix(in oklab, ${color} 22%, transparent)` }}
          />
          <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <Link
              href="/#work"
              className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              All case studies
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <TrackBadge track={project.track} />
              <CompanyMark company={project.company} />
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                <CalendarDays className="size-3.5" />
                {project.period}
              </span>
            </div>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-xl text-pretty text-muted">{project.tagline}</p>
          </Reveal>

          <dl className="mt-12 grid gap-4 sm:grid-cols-3">
            {project.metrics.map((m, i) => (
              <Reveal key={m.label} delay={0.1 + i * 0.08}>
                <div className="h-full rounded-3xl border border-line bg-white/90 p-6 shadow-sm backdrop-blur">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <CountUp
                      value={m.value}
                      className="block font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                    />
                    <span className="mt-2 block text-sm text-muted">{m.label}</span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted">Reported project outcomes.</p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-16 px-4 pb-24">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <p className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase" style={{ color }}>
                <Target className="size-4" /> Focus
              </p>
              <p className="mt-3 text-lg text-pretty text-ink-soft">{project.focus}</p>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-3xl border border-line bg-white p-6 text-sm sm:p-8">
              <dt className="text-muted">Company</dt>
              <dd className="font-semibold">{project.company}</dd>
              <dt className="text-muted">Period</dt>
              <dd className="font-semibold">{project.period}</dd>
              <dt className="text-muted">Track</dt>
              <dd className="font-semibold">{trackLabels[project.track]}</dd>
              <dt className="text-muted">Pipeline</dt>
              <dd className="font-semibold">{project.flow.length} stages</dd>
            </dl>
          </div>
        </Reveal>

        <section>
          <Reveal>
            <h2 className="mb-6 font-display text-3xl font-bold tracking-tight">How the system flows</h2>
          </Reveal>
          <FlowDiagram flow={project.flow} loop={project.loop} color={color} />
        </section>

        <section className="space-y-6">
          {story.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.04}>
              <div className="grid gap-4 rounded-3xl border border-line bg-white p-6 sm:grid-cols-[14rem_1fr] sm:p-8">
                <h2 className="flex items-center gap-3 font-display text-xl font-bold">
                  <span
                    className="grid size-10 place-items-center rounded-xl text-white"
                    style={{ background: color }}
                  >
                    <Icon className="size-5" />
                  </span>
                  {title}
                </h2>
                <p className="text-lg leading-relaxed text-pretty text-ink-soft">{body}</p>
              </div>
            </Reveal>
          ))}
        </section>

        <Reveal>
          <h2 className="mb-4 font-display text-2xl font-bold">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </Reveal>

        {related.length > 0 && (
          <Reveal>
            <h2 className="mb-4 font-display text-2xl font-bold">Patterns in this project</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <div key={p.id} className="flex gap-4 rounded-3xl border border-line bg-white p-6">
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-xl"
                    style={{ color, background: `color-mix(in oklab, ${color} 12%, white)` }}
                  >
                    <Sparkles className="size-5" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold">{p.title}</p>
                    <p className="mt-1 text-sm text-pretty text-muted">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <nav aria-label="More case studies" className="grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}/`}
            className="group rounded-3xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-muted">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Previous
            </span>
            <span className="mt-2 block font-display text-lg font-bold">{prev.title}</span>
          </Link>
          <Link
            href={`/projects/${next.slug}/`}
            className="group rounded-3xl border border-line bg-white p-6 text-right transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="flex items-center justify-end gap-2 text-sm font-semibold text-muted">
              Next <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-2 block font-display text-lg font-bold">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
