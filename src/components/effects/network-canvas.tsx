"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; c: string };
type Packet = { a: number; b: number; t: number; speed: number; c: string };

const COLORS = ["#4f46e5", "#7c3aed", "#db2777", "#0284c7"];
const LINK_DIST = 150;
const MOUSE_DIST = 190;

/**
 * A drifting service graph: nodes link to near neighbours, data packets travel
 * along the links, and the cursor pulls nearby nodes into its own cluster.
 */
export function NetworkCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const packets: Packet[] = [];
    const mouse = { x: -9999, y: -9999 };
    let frame = 0;
    let visible = true;
    let lastPacket = 0;

    const seed = () => {
      const count = Math.min(90, Math.max(28, Math.floor((w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.4 + Math.random() * 1.8,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
      packets.length = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw(0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduced) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_DIST && d > 1) {
            n.vx += (dx / d) * 0.012;
            n.vy += (dy / d) * 0.012;
          }
          n.vx *= 0.985;
          n.vy *= 0.985;
          const speed = Math.hypot(n.vx, n.vy);
          if (speed < 0.12) {
            n.vx += (Math.random() - 0.5) * 0.04;
            n.vy += (Math.random() - 0.5) * 0.04;
          }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          n.x = Math.max(0, Math.min(w, n.x));
          n.y = Math.max(0, Math.min(h, n.y));
        }
      }

      const links: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            links.push([i, j]);
            ctx.strokeStyle = `rgba(79, 70, 229, ${0.16 * (1 - d / LINK_DIST)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        if (d < MOUSE_DIST) {
          ctx.strokeStyle = `rgba(219, 39, 119, ${0.35 * (1 - d / MOUSE_DIST)})`;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
        ctx.fillStyle = n.c;
        ctx.globalAlpha = d < MOUSE_DIST ? 0.95 : 0.55;
        ctx.beginPath();
        ctx.arc(n.x, n.y, d < MOUSE_DIST ? n.r + 1 : n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (reduced) return;

      if (now - lastPacket > 260 && links.length && packets.length < 14) {
        const [a, b] = links[Math.floor(Math.random() * links.length)];
        const forward = Math.random() > 0.5;
        packets.push({
          a: forward ? a : b,
          b: forward ? b : a,
          t: 0,
          speed: 0.012 + Math.random() * 0.012,
          c: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
        lastPacket = now;
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (p.t >= 1 || !a || !b) {
          packets.splice(i, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 9);
        glow.addColorStop(0, p.c);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      if (visible && !document.hidden) draw(now);
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    resize();
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
