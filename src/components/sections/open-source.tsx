import { ArrowUpRight, Check, CircleAlert } from "lucide-react";
import { openSourceFor } from "@/data/open-source";
import type { RoleKey } from "@/data/roles";
import { GitHubIcon } from "../icons";
import { Reveal } from "../effects/reveal";

// Each card replays a real run of the project beside its description.
export function OpenSource({ role }: { role: RoleKey }) {
  return (
    <div className="space-y-6">
      {openSourceFor(role).map((p, index) => (
        <Reveal key={p.name}>
          <article className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-10">
            <div aria-hidden className="absolute inset-0 -z-10">
              <div className="absolute -top-24 -right-16 size-80 animate-float rounded-full bg-brand/40 blur-3xl" />
              <div className="absolute -bottom-28 left-10 size-72 animate-float rounded-full bg-brand-3/30 blur-3xl [animation-delay:-4s]" />
              <div className="absolute inset-0 bg-grid opacity-20 invert" />
            </div>

            <div
              className={`grid gap-10 lg:items-center ${index % 2 ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]"}`}
            >
              <div className={index % 2 ? "lg:order-2" : undefined}>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs font-semibold tracking-wider uppercase">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  {p.demo ? "Open source · live demo" : "Open source · crash-tested"}
                </p>
                <h3 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{p.name}</h3>
                <p className="mt-2 font-display text-xl font-semibold text-white/90">{p.tagline}</p>
                <p className="mt-4 max-w-xl text-pretty text-white/70">{p.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-pretty text-white/85">
                      <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-400/90 text-ink">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/80">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-ink shadow-lg shadow-brand/30 transition hover:-translate-y-0.5"
                    >
                      Try the live demo
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      p.demo
                        ? "inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/10"
                        : "group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-ink shadow-lg shadow-brand/30 transition hover:-translate-y-0.5"
                    }
                  >
                    <GitHubIcon className="size-4" />
                    {p.demo ? "Source" : "Read the code and results"}
                  </a>
                </div>
              </div>

              <figure>
                <figcaption className="px-1 pb-3 font-mono text-[11px] tracking-wider text-white/50 uppercase">
                  {p.trace.title}
                </figcaption>
                <ol className="space-y-2">
                  {p.trace.steps.map((s, i) => (
                    <li key={i}>
                      <Reveal delay={0.15 + i * 0.12} y={12}>
                        <div
                          className={`flex items-start gap-3 rounded-xl border px-4 py-3 backdrop-blur ${
                            s.tone === "bad" ? "border-rose-400/40 bg-rose-500/10" : "border-white/10 bg-white/5"
                          }`}
                        >
                          <span
                            className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg ${
                              s.tone === "bad" ? "bg-rose-400/20 text-rose-300" : "bg-emerald-400/15 text-emerald-300"
                            }`}
                          >
                            <s.icon className="size-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold">{s.label}</p>
                            <p className={`text-xs ${s.tone === "bad" ? "text-rose-200" : "text-white/60"}`}>{s.detail}</p>
                          </div>
                          {s.tone === "bad" ? (
                            <CircleAlert className="mt-1 ml-auto size-4 shrink-0 text-rose-300" aria-label="Error" />
                          ) : (
                            <Check className="mt-1 ml-auto size-4 shrink-0 text-emerald-300" aria-label="Passed" />
                          )}
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </figure>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
