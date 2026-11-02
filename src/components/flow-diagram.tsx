"use client";

import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import type { Project } from "@/data/projects";

/** The project's request path as a pipeline with data pulses moving along it. */
export function FlowDiagram({ flow, loop, color }: { flow: string[]; loop: Project["loop"]; color: string }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
      <ol className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-center">
        {flow.map((step, i) => (
          <li key={step} className="flex flex-col items-center lg:flex-1 lg:flex-row">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative w-full rounded-2xl border bg-canvas px-3 py-3 text-center text-sm font-semibold text-ink lg:min-h-20 lg:content-center"
              style={{ borderColor: `color-mix(in oklab, ${color} 35%, white)` }}
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
        ))}
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
