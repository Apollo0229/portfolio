import type { Role } from "@/data/roles";
import { projects, type Project } from "@/data/projects";
import { Hero } from "./sections/hero";
import { Work } from "./sections/work";
import { ExperienceTimeline } from "./sections/experience";
import { Skills } from "./sections/skills";
import { Contact } from "./sections/contact";
import { SectionHeading } from "./ui";

export function RoleView({ role }: { role: Role }) {
  const ordered = role.projectOrder
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));

  return (
    <>
      <Hero role={role} />

      <section id="work" className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Case studies, told the way <span className="text-gradient">engineers</span> read them.
            </>
          }
          intro="Each project covers the problem, the architecture, what broke, how I fixed it, and the measured result."
        />
        <Work projects={ordered} />
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Experience"
          title="7+ years across AI SaaS, fintech, e-commerce and enterprise software."
        />
        <ExperienceTimeline />
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Toolbox"
          title={
            <>
              Skills, ordered for a <span className="text-gradient">{role.title}</span>.
            </>
          }
        />
        <Skills order={role.skillOrder} />
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 pt-12 pb-24">
        <Contact roleTitle={role.title} />
      </section>
    </>
  );
}
