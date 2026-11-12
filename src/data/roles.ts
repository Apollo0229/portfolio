import { type Metric, projects } from "./projects";
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

/** The case studies a role leads with, then every other one in the site's usual order. */
const leadWith = (...lead: string[]) => [...lead, ...projects.map((p) => p.slug).filter((s) => !lead.includes(s))];

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
      { value: "16", label: "case studies across 4 companies" },
      { value: "−50%", label: "setup time for five-step Zapier integrations" },
      { value: "99.999%", label: "webhook tracking reliability at Zapier" },
    ],
    projectOrder: leadWith("copilot-workflow-builder", "regions-web-platform", "realtime-shopper-messaging", "member-engagement-automation"),
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
      "I build React and TypeScript interfaces for complex, data-heavy products — an infinite workflow canvas holding 60 FPS at 150 steps, banking insight dashboards that render in under 150 ms, and a Next.js storefront that cut First Contentful Paint by 1.5 seconds. Performance is a feature, not an afterthought.",
    stats: [
      { value: "60 FPS", label: "on 150-step workflow canvases" },
      { value: "<150ms", label: "banking dashboard rendering" },
      { value: "−1.5s+", label: "First Contentful Paint at Shipt" },
      { value: "7+", label: "years shipping React UIs" },
    ],
    projectOrder: leadWith("visual-workflow-canvas", "financial-insights-components", "web-checkout-rearchitecture", "childcare-checkin-kiosk"),
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
      "I design and run the services behind the UI — transactional-outbox event engines on Kafka, secure API layers between legacy banking cores and modern platforms, and Go services that hold up under record checkout traffic, in Go, Java, C#/.NET, Python and Node.js on AWS, Azure and Kubernetes.",
    stats: [
      { value: "99.999%", label: "webhook tracking reliability" },
      { value: "40,000+/s", label: "tasks at peak at Zapier" },
      { value: "15,000+/s", label: "delivery-slot API operations at Shipt" },
      { value: "<50ms", label: "per delivery-slot check" },
    ],
    projectOrder: leadWith("reliable-event-routing", "enterprise-api-layer", "delivery-window-engine", "member-ledger-sync"),
    skillOrder: ["backend", "data", "cloud", "languages", "ai", "frontend"],
    code: [
      { key: "role", value: '"Senior Backend Engineer"' },
      { key: "stack", value: '["Go", "Kafka", "Postgres"]' },
      { key: "pattern", value: '"transactional outbox"' },
      { key: "reliability", value: '"99.999%"' },
    ],
  },
  {
    key: "ai",
    path: "/ai/",
    label: "AI",
    title: "AI Engineer",
    headline: ["LLMs made reliable", "enough for production."],
    rotating: ["multi-agent orchestration", "LLM guardrails", "explainable ML", "vector retrieval"],
    summary:
      "I turn models into dependable product features: agents that pause for a person when their confidence drops, generated workflows checked against a schema before they run, fraud scores that explain themselves in regulated banking, and ML that batches delivery routes.",
    stats: [
      { value: "30%+", label: "data mismatches self-corrected by agents" },
      { value: "−50%", label: "integration setup time with Copilot" },
      { value: "+18%", label: "shopper picking efficiency from ML batching" },
      { value: "4", label: "AI case studies across 4 companies" },
    ],
    projectOrder: leadWith("autonomous-agent-orchestration", "fraud-decision-support", "smart-batching-optimizer", "retention-propensity-scoring", "copilot-workflow-builder"),
    skillOrder: ["ai", "backend", "data", "cloud", "languages", "frontend"],
    code: [
      { key: "role", value: '"AI Engineer"' },
      { key: "stack", value: '["LLMs", "LangGraph", "Vector DB"]' },
      { key: "selfCorrected", value: '"30%+"' },
      { key: "lowConfidence", value: '"human review"' },
    ],
  },
];

export const getRole = (key: string) => roles.find((r) => r.key === key);
