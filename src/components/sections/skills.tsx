import { Award, GraduationCap } from "lucide-react";
import { certifications, education, marqueeTech, skillGroups, type SkillGroup } from "@/data/profile";
import { Reveal } from "../effects/reveal";

export function Skills({ order }: { order: SkillGroup["id"][] }) {
  const groups = order
    .map((id) => skillGroups.find((g) => g.id === id))
    .filter((g): g is SkillGroup => Boolean(g));

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => {
          const primary = i === 0;
          return (
            <Reveal key={g.id} delay={i * 0.05}>
              <div
                className={`h-full rounded-3xl p-px ${
                  primary ? "bg-linear-to-br from-brand via-brand-2 to-brand-3" : "bg-line"
                }`}
              >
                <div className="h-full rounded-[calc(1.5rem-1px)] bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold">{g.label}</h3>
                    {primary && (
                      <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                        Core strength
                      </span>
                    )}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand ${
                          primary ? "border-brand/20 bg-brand/5 text-ink" : "border-line text-ink-soft"
                        }`}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div
        aria-hidden
        className="relative mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...marqueeTech, ...marqueeTech].map((t, i) => (
            <span
              key={i}
              className="rounded-full border border-line bg-white px-5 py-2 font-display text-lg font-semibold whitespace-nowrap text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.06}>
            <div className="flex h-full gap-4 rounded-3xl border border-line bg-white p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-600">
                <Award className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-pretty">{c.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {c.issuer} · {c.year}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.12}>
          <div className="flex h-full gap-4 rounded-3xl border border-line bg-white p-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky-50 text-sky-600">
              <GraduationCap className="size-5" />
            </span>
            <div>
              <p className="font-semibold">{education.degree}</p>
              <p className="mt-1 text-sm text-muted">
                {education.school} · {education.period}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
