"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";

/** Card with a cursor-following glow and a gentle 3D tilt. */
export function SpotlightCard({
  children,
  className = "",
  color,
  tilt = 6,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  tilt?: number;
}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), spring);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mx", `${x}px`);
    e.currentTarget.style.setProperty("--my", `${y}px`);
    if (e.pointerType === "mouse") {
      px.set(x / rect.width);
      py.set(y / rect.height);
    }
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, "--spot": color } as CSSProperties & Record<string, unknown>}
      className={`spotlight ${className}`}
    >
      {children}
    </motion.div>
  );
}
