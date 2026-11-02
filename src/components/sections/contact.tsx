"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "../effects/reveal";

export function Contact({ roleTitle }: { roleTitle: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Reveal>
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/4 size-80 animate-float rounded-full bg-brand/50 blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 size-80 animate-float rounded-full bg-brand-3/40 blur-3xl [animation-delay:-4s]" />
          <div className="absolute inset-0 bg-grid opacity-20 invert" />
        </div>

        <p className="font-mono text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">Contact</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
          Hiring {/^[AEIOU]/.test(roleTitle) ? "an" : "a"} {roleTitle}? Let&apos;s talk.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-white/70">
          Email is the fastest way to reach me.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-ink shadow-2xl shadow-brand/40 transition hover:-translate-y-1"
          >
            <Mail className="size-5 text-brand" />
            <span className="font-mono text-sm sm:text-base">{profile.email}</span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-4 font-semibold text-white/90 transition hover:bg-white/10"
          >
            {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
            <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
          </button>
        </div>
      </div>
    </Reveal>
  );
}
