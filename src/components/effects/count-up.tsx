"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

// Splits "−90%" / "8,000+" / "4.8s→320ms" into prefix, leading number, suffix.
const NUMBER = /^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/;

/** Counts the leading number of a metric up from zero when scrolled into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const el = ref.current;
    const match = value.match(NUMBER);
    if (!el || !inView || !match) return;
    const [, prefix, raw, suffix] = match;
    const target = Number(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const grouped = raw.includes(",");
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const n = grouped
          ? Math.round(v).toLocaleString("en-US")
          : v.toFixed(decimals);
        el.textContent = `${prefix}${n}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  // Server HTML carries the final value, so the stat reads correctly without JS.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
