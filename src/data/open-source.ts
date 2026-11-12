import { CircleCheckBig, Database, Flame, type LucideIcon, RotateCcw, Search, Send, ShieldCheck, Sparkles, Timer, Zap } from "lucide-react";
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
  /** Hosted demo, if the project has one, and what its button says. */
  demo?: { url: string; label: string };
  /** The pill above the name. */
  badge: string;
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
    demo: { url: "https://apollo0229.github.io/flowsmith/", label: "Try the live demo" },
    badge: "Open source · live demo",
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
    demo: { url: "https://apollo0229.github.io/relay/", label: "Watch the crash test" },
    badge: "Open source · crash-test replay",
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
  {
    name: "Ledgerline",
    tagline: "Seven years of payments. Page one in milliseconds.",
    description:
      "Search across years of lockbox payments without waiting on the oldest data. An ASP.NET Core API sends the exact first page from the newest months at once, counts all older history in one request alongside it, and streams the totals year by year to a React portal over server-sent events.",
    demo: { url: "https://apollo0229.github.io/ledgerline/", label: "Replay real searches" },
    badge: "Open source · recorded demo",
    source: "https://github.com/Apollo0229/ledgerline",
    highlights: [
      "At 20 million payments under load: page one 1.9–6.3× sooner and 30–40% more searches per second than one query giving the same answer",
      "Measured, found, fixed: profiling showed the cold search counting every document twice; admission control fixed p95 latency under load",
      "Every streamed answer is tested against a plain search for exactly the same page and totals",
    ],
    stack: ["C#", ".NET 10", "ASP.NET Core", "Elasticsearch", "Server-sent events", "React 19", "TypeScript", "Docker", "xUnit", "GitHub Actions"],
    leadFor: ["fullstack", "backend"],
    trace: {
      title: "Recorded search: 20 million payments, caches dropped",
      steps: [
        { icon: Search, label: "Plan", detail: "Last 3 months, then 2026 back to 2019", tone: "ok" },
        { icon: Flame, label: "Hot tier", detail: "Exact first page of 50 at 48 ms", tone: "ok" },
        { icon: Database, label: "Cold history", detail: "8 years counted in one request, alongside", tone: "ok" },
        { icon: CircleCheckBig, label: "Done", detail: "20,000,000 matches totalled at 199 ms", tone: "ok" },
        { icon: Timer, label: "One plain search", detail: "203 ms before anything appears", tone: "bad" },
      ],
    },
  },
];

/** The projects in the order a role page shows them. */
export function openSourceFor(role: RoleKey): OpenSourceProject[] {
  return [...openSource].sort((a, b) => Number(b.leadFor.includes(role)) - Number(a.leadFor.includes(role)));
}
