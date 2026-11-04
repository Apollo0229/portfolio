"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";
import type { Project } from "@/data/projects";

const STEP_MS = 1100;

/** The project's request path as a pipeline; a highlight walks the stages like a live request. */
export function FlowDiagram({ flow, loop, color }: { flow: string[]; loop: Project["loop"]; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % flow.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [inView, reduced, flow.length]);

  return (
    <div ref={ref} className="rounded-3xl border border-line bg-white p-6 sm:p-8">
      <ol className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-center">
        {flow.map((step, i) => {
          const on = i === active;
          return (
            <li key={step} className="flex flex-col items-center lg:flex-1 lg:flex-row">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative w-full rounded-2xl border px-3 py-3 text-center text-sm font-semibold text-ink transition-[background-color,box-shadow,transform] duration-500 lg:min-h-20 lg:content-center"
                style={{
                  borderColor: on ? color : `color-mix(in oklab, ${color} 35%, white)`,
                  background: on ? `color-mix(in oklab, ${color} 10%, white)` : "var(--color-canvas)",
                  boxShadow: on ? `0 10px 30px -10px ${color}` : "none",
                  transform: on ? "translateY(-3px)" : "none",
                }}
              >
                <span
                  className="mb-1 block font-mono text-[10px] font-bold tracking-wider uppercase"
                  style={{ color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
              </motion.div>
              {i < flow.length - 1 && <Connector color={color} delay={i * 0.25} />}
            </li>
          );
        })}
      </ol>
      {loop && (
        <p
          className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-2.5 text-center text-sm font-medium"
          style={{ borderColor: color, color }}
        >
          <RotateCcw className="size-4 shrink-0" />
          Step {String(loop.from + 1).padStart(2, "0")} → Step {String(loop.to + 1).padStart(2, "0")}: {loop.label}
        </p>
      )}
    </div>
  );
}

function Connector({ color, delay }: { color: string; delay: number }) {
  return (
    <div aria-hidden className="relative h-8 w-0.5 shrink-0 lg:h-0.5 lg:w-8">
      <div className="absolute inset-0" style={{ background: `color-mix(in oklab, ${color} 30%, white)` }} />
      <span
        className="absolute -left-[3px] size-2 animate-pulse-y rounded-full lg:-top-[3px] lg:left-auto lg:animate-pulse-x"
        style={{ background: color, boxShadow: `0 0 10px ${color}`, animationDelay: `${delay}s` }}
      />
    </div>
  );
}
