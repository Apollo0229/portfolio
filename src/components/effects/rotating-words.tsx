"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function RotatingWords({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <span className={`inline-block ${className ?? ""}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: 12, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -12, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
