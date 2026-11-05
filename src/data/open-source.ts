import { CircleCheckBig, Database, type LucideIcon, RotateCcw, Search, Send, ShieldCheck, Sparkles, Zap } from "lucide-react";
import type { RoleKey } from "./roles";

export type TraceStep = {
  icon: LucideIcon;
  label: string;
  detail: string;
  tone: "ok" | "bad";
};

export type OpenSourceProject = {
  name: string;
  tagline: string;
  description: string;
  /** Live demo, if the project has one. */
  demo?: string;
  source: string;
  highlights: string[];
  stack: string[];
  /** Role pages that show this project first. */
  leadFor: RoleKey[];
  /** A real run, replayed beside the card. */
  trace: { title: string; steps: TraceStep[] };
};

export const openSource: OpenSourceProject[] = [
  {
    name: "Flowsmith",
    tagline: "Plain English in. Validated workflows out.",
    description:
      "Describe an automation and Flowsmith retrieves the right apps, plans a workflow with Claude or an offline planner, and checks every step and data reference before anything could run. Invalid plans go back to the model with structured hints.",
    demo: "https://apollo0229.github.io/flowsmith/",
    source: "https://github.com/Apollo0229/flowsmith",
    highlights: [
      "Deterministic validator: 17 issue types, each with a path and a fix hint",
      "Self-correcting loop: rejected plans go back to Claude with the validator's hints",
      "Free in the browser with an offline planner; Claude Opus 5.5 with your own key",
    ],
    stack: ["TypeScript", "React 19", "Vite", "Claude API", "Structured outputs", "BM25 retrieval", "Vitest", "GitHub Actions"],
    leadFor: ["fullstack", "frontend", "ai"],
    trace: {
      title: "Example run: a mistake caught and corrected",
      steps: [
        { icon: Search, label: "Retrieve", detail: "stripe · hubspot · slack · filter", tone: "ok" },
        { icon: Sparkles, label: "Plan", detail: "4 steps proposed", tone: "ok" },
        { icon: ShieldCheck, label: "Validate", detail: 'No output "email" on trigger. Did you mean "customer_email"?', tone: "bad" },
        { icon: RotateCcw, label: "Correct", detail: "Hint sent back to the planner", tone: "ok" },
        { icon: ShieldCheck, label: "Validate", detail: "Valid workflow", tone: "ok" },
      ],
    },
  },
  {
    name: "Relay",
    tagline: "Webhooks in. Nothing lost. Processed once.",
    description:
      "An event pipeline built to survive crashes. Each webhook and its outbox message commit in one transaction, a Go relay moves them to Kafka, and Python workers apply every event exactly once, with delay-topic retries and a dead-letter topic.",
    source: "https://github.com/Apollo0229/relay",
    highlights: [
      "Crash-tested: relay, worker, API and Kafka killed mid-load; 21,295 webhooks, none lost, none applied twice",
      "1,000 webhooks/s at 55ms p95; load tests exposed a Postgres NOTIFY bottleneck, and removing it lifted ingest 4.4×",
      "Live React dashboard over server-sent events, with buttons that trigger retries and dead letters",
    ],
    stack: ["Python", "FastAPI", "Go", "Kafka", "PostgreSQL", "React", "TypeScript", "k6", "Docker", "GitHub Actions"],
    leadFor: ["backend"],
    trace: {
      title: "Crash test: every service killed mid-load",
      steps: [
        { icon: Send, label: "Load", detail: "300 webhooks/s from 32 sources", tone: "ok" },
        { icon: Zap, label: "kill -9", detail: "Relay, worker, API and Kafka, one after another", tone: "bad" },
        { icon: RotateCcw, label: "Recover", detail: "1,996 failed sends retried with the same key", tone: "ok" },
        { icon: Database, label: "Store", detail: "21,295 acknowledged · 21,295 stored", tone: "ok" },
        { icon: CircleCheckBig, label: "Process", detail: "21,295 applied once · 198 redeliveries skipped", tone: "ok" },
      ],
    },
  },
];

/** The projects in the order a role page shows them. */
export function openSourceFor(role: RoleKey): OpenSourceProject[] {
  return [...openSource].sort((a, b) => Number(b.leadFor.includes(role)) - Number(a.leadFor.includes(role)));
}
