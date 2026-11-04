import { ArrowUpRight, Check, CircleAlert, RotateCcw, Search, ShieldCheck, Sparkles } from "lucide-react";
import { openSource } from "@/data/open-source";
import { GitHubIcon } from "../icons";
import { Reveal } from "../effects/reveal";

// The illustration replays one real Flowsmith run: a bad reference, caught and fixed.
const run = [
  { icon: Search, label: "Retrieve", detail: "stripe · hubspot · slack · filter", tone: "ok" },
  { icon: Sparkles, label: "Plan", detail: "4 steps proposed", tone: "ok" },
  { icon: ShieldCheck, label: "Validate", detail: 'No output "email" on trigger. Did you mean "customer_email"?', tone: "bad" },
  { icon: RotateCcw, label: "Correct", detail: "Hint sent back to the planner", tone: "ok" },
  { icon: ShieldCheck, label: "Validate", detail: "Valid workflow", tone: "ok" },
] as const;

export function OpenSource() {
  return (
    <div className="space-y-6">
      {openSource.map((p) => (
        <Reveal key={p.name}>
          <article className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-10">
            <div aria-hidden className="absolute inset-0 -z-10">
              <div className="absolute -top-24 -right-16 size-80 animate-float rounded-full bg-brand/40 blur-3xl" />
              <div className="absolute -bottom-28 left-10 size-72 animate-float rounded-full bg-brand-3/30 blur-3xl [animation-delay:-4s]" />
              <div className="absolute inset-0 bg-grid opacity-20 invert" />
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs font-semibold tracking-wider uppercase">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  Open source · live demo
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
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-ink shadow-lg shadow-brand/30 transition hover:-translate-y-0.5"
                  >
                    Try the live demo
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    <GitHubIcon className="size-4" />
                    Source
                  </a>
                </div>
              </div>

              <ol aria-label="Example run: a mistake caught and corrected" className="space-y-2">
                {run.map((s, i) => (
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
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
