import type { Metric } from "./projects";
import type { SkillGroup } from "./profile";

export type RoleKey = "fullstack" | "frontend" | "backend" | "ai";

export type Role = {
  key: RoleKey;
  /** Path segment; the full-stack view lives at the site root. */
  path: string;
  label: string;
  title: string;
  headline: [string, string];
  rotating: string[];
  summary: string;
  stats: Metric[];
  projectOrder: string[];
  skillOrder: SkillGroup["id"][];
  /** Lines of the typed code card in the hero. */
  code: { key: string; value: string }[];
};

export const roles: Role[] = [
  {
    key: "fullstack",
    path: "/",
    label: "Full Stack",
    title: "Senior Full-Stack Engineer",
    headline: ["I ship products", "from database to pixel."],
    rotating: ["AI automation", "digital banking", "real-time marketplaces", "enterprise SaaS"],
    summary:
      "7+ years building and scaling enterprise web apps, SaaS platforms and distributed services at Zapier, Regions Bank, Shipt and Daxko. I own features end to end — React interfaces, Python/Node/.NET APIs, data pipelines and the cloud they run on.",
    stats: [
      { value: "7+", label: "years in production engineering" },
      { value: "8,000+", label: "app integrations supported at Zapier" },
      { value: "10", label: "case studies across 3 companies" },
      { value: "4.8s→320ms", label: "audit search latency (hot tier)" },
    ],
    projectOrder: [
      "zap-history-audit-engine",
      "client-lockbox-portal",
      "natural-language-workflow-engine",
      "shopper-delivery-audit-platform",
      "async-messaging-pipeline",
      "visual-workflow-canvas",
      "core-banking-cloud-migration",
      "behavioral-ai-engine",
      "fulfillment-routing-engine",
      "merchant-catalog-workspace",
    ],
    skillOrder: ["frontend", "backend", "ai", "cloud", "data", "languages"],
    code: [
      { key: "role", value: '"Senior Full-Stack Engineer"' },
      { key: "frontend", value: '["React", "TypeScript", "Next.js"]' },
      { key: "backend", value: '["Python", "Node.js", "C#/.NET"]' },
      { key: "ships", value: '"database → pixel"' },
    ],
  },
  {
    key: "frontend",
    path: "/frontend/",
    label: "Frontend",
    title: "Senior Frontend Engineer",
    headline: ["Interfaces that stay", "fast at enterprise scale."],
    rotating: ["60 FPS canvases", "accessible design systems", "data-heavy dashboards", "real-time UIs"],
    summary:
      "I build React and TypeScript interfaces for complex, data-heavy products — a 150-step workflow canvas at a steady 60 FPS, a 1,500-node merchant catalog rescued from 15 FPS, and streaming search dashboards that answer in 320 ms. Performance is a feature, not an afterthought.",
    stats: [
      { value: "60 FPS", label: "on 150+ step workflow graphs" },
      { value: "1,500+", label: "catalog nodes at 60 FPS" },
      { value: "4.8s→320ms", label: "treasury dashboard response" },
      { value: "7+", label: "years shipping React UIs" },
    ],
    projectOrder: [
      "visual-workflow-canvas",
      "merchant-catalog-workspace",
      "client-lockbox-portal",
      "zap-history-audit-engine",
      "shopper-delivery-audit-platform",
      "natural-language-workflow-engine",
      "async-messaging-pipeline",
      "behavioral-ai-engine",
      "core-banking-cloud-migration",
      "fulfillment-routing-engine",
    ],
    skillOrder: ["frontend", "languages", "backend", "ai", "cloud", "data"],
    code: [
      { key: "role", value: '"Senior Frontend Engineer"' },
      { key: "stack", value: '["React", "TypeScript", "Canvas"]' },
      { key: "fps", value: "60" },
      { key: "layout", value: '"off-main-thread"' },
    ],
  },
  {
    key: "backend",
    path: "/backend/",
    label: "Backend",
    title: "Senior Backend Engineer",
    headline: ["Distributed systems", "that don't drop messages."],
    rotating: ["Kafka pipelines", "zero-downtime migrations", "high-throughput APIs", "secure banking services"],
    summary:
      "I design and run the services behind the UI — Kafka and Celery pipelines that absorb high-volume event bursts, mainframe-to-distributed core banking migrations, and secure REST/SOAP APIs in Python, Node.js, C#/.NET, Java and Go on AWS and Kubernetes.",
    stats: [
      { value: "−90%", label: "Kafka TCP connections" },
      { value: "−34%", label: "core infrastructure cost" },
      { value: "10×", label: "lower broker connection burden" },
      { value: "−40%", label: "mainframe dependency overhead" },
    ],
    projectOrder: [
      "async-messaging-pipeline",
      "core-banking-cloud-migration",
      "fulfillment-routing-engine",
      "zap-history-audit-engine",
      "client-lockbox-portal",
      "shopper-delivery-audit-platform",
      "natural-language-workflow-engine",
      "behavioral-ai-engine",
      "visual-workflow-canvas",
      "merchant-catalog-workspace",
    ],
    skillOrder: ["backend", "data", "cloud", "languages", "ai", "frontend"],
    code: [
      { key: "role", value: '"Senior Backend Engineer"' },
      { key: "stack", value: '["Python", "Kafka", "Postgres"]' },
      { key: "pattern", value: '"transactional outbox"' },
      { key: "brokerConns", value: '"−90%"' },
    ],
  },
  {
    key: "ai",
    path: "/ai/",
    label: "AI",
    title: "AI Engineer",
    headline: ["LLMs made reliable", "enough for production."],
    rotating: ["RAG pipelines", "multi-agent validation", "LLM orchestration", "LLM governance"],
    summary:
      "I turn LLMs into dependable product features: retrieval over live API schemas, deterministic validators that catch hallucinated endpoints before anything runs, and governance layers that policy-check every customer-facing answer in regulated banking.",
    stats: [
      { value: "91%", label: "zero-shot workflow generation" },
      { value: "−42%", label: "creation drop-off with AI" },
      { value: "+55%", label: "automated support resolution" },
      { value: "0", label: "privacy exposures from LLM answers" },
    ],
    projectOrder: [
      "natural-language-workflow-engine",
      "behavioral-ai-engine",
      "zap-history-audit-engine",
      "async-messaging-pipeline",
      "client-lockbox-portal",
      "core-banking-cloud-migration",
      "shopper-delivery-audit-platform",
      "fulfillment-routing-engine",
      "visual-workflow-canvas",
      "merchant-catalog-workspace",
    ],
    skillOrder: ["ai", "backend", "data", "cloud", "languages", "frontend"],
    code: [
      { key: "role", value: '"AI Engineer"' },
      { key: "stack", value: '["LLMs", "RAG", "Vector DB"]' },
      { key: "zeroShot", value: '"91%"' },
      { key: "hallucinations", value: '"linted"' },
    ],
  },
];

export const getRole = (key: string) => roles.find((r) => r.key === key);
