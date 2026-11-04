"use client";

import { useEffect, useMemo, useState } from "react";

type Token = { text: string; cls: string };

const C = {
  kw: "text-[#c084fc]",
  name: "text-[#7dd3fc]",
  key: "text-[#f9a8d4]",
  val: "text-[#86efac]",
  punct: "text-white/60",
};

function tokenize(lines: { key: string; value: string }[]): Token[] {
  const tokens: Token[] = [
    { text: "const ", cls: C.kw },
    { text: "apollo", cls: C.name },
    { text: " = {\n", cls: C.punct },
  ];
  for (const l of lines) {
    tokens.push({ text: `  ${l.key}`, cls: C.key });
    tokens.push({ text: ": ", cls: C.punct });
    tokens.push({ text: l.value, cls: C.val });
    tokens.push({ text: ",\n", cls: C.punct });
  }
  tokens.push({ text: "};", cls: C.punct });
  return tokens;
}

// Each token remembers where it starts in the full text, so render can slice it.
function withOffsets(tokens: Token[]) {
  let offset = 0;
  return tokens.map((t) => {
    const start = offset;
    offset += t.text.length;
    return { ...t, start };
  });
}

/** A dark editor card that types out a role-specific object literal. */
export function TypedCode({ lines, filename }: { lines: { key: string; value: string }[]; filename: string }) {
  const tokens = useMemo(() => withOffsets(tokenize(lines)), [lines]);
  const text = tokens.map((t) => t.text).join("");
  const total = text.length;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setShown(total));
      return () => cancelAnimationFrame(id);
    }
    const id = window.setInterval(() => {
      setShown((s) => {
        if (s >= total) {
          window.clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, 28);
    return () => window.clearInterval(id);
  }, [total]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1024] shadow-[0_30px_80px_-20px_rgba(79,70,229,0.55)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/50">{filename}</span>
      </div>
      <pre className="relative min-h-[11.5rem] overflow-x-auto p-5 font-mono text-[13px] leading-6 sm:text-sm">
        {/* Invisible full text reserves the final size so layout never jumps. */}
        <code aria-hidden className="invisible block">
          {text}
        </code>
        <span className="sr-only">{text}</span>
        <code aria-hidden className="absolute inset-0 p-5">
          {tokens.map((t, i) => {
            if (shown <= t.start) return null;
            const part = t.text.slice(0, shown - t.start);
            return (
              <span key={i} className={t.cls}>
                {part}
              </span>
            );
          })}
          <span className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-blink bg-[#7dd3fc]" />
        </code>
      </pre>
    </div>
  );
}
