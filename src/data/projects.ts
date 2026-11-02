export type Track = "ai" | "backend" | "frontend" | "fullstack";

export const trackLabels: Record<Track, string> = {
  ai: "AI Engineering",
  backend: "Backend",
  frontend: "Frontend",
  fullstack: "Full Stack",
};

export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  company: "Zapier" | "Regions Bank";
  track: Track;
  title: string;
  tagline: string;
  purpose: string;
  mission: string;
  architecture: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: Metric[];
  stack: string[];
  /** Left-to-right request path shown as an animated pipeline diagram. */
  flow: string[];
  /** Optional feedback edge drawn under the pipeline, e.g. a retry loop. */
  loop?: { from: number; to: number; label: string };
};

export const projects: Project[] = [
  {
    slug: "natural-language-workflow-engine",
    company: "Zapier",
    track: "ai",
    title: "Natural Language to Workflow Engine",
    tagline: "Zapier Copilot Core — turning plain English into valid, multi-step automation graphs.",
    purpose:
      "Translate unstructured, conversational user prose into valid, deterministic multi-step integration graphs.",
    mission:
      "Let non-technical builders generate complex automation logic in pure natural language — no manual node editor required.",
    architecture:
      "An orchestration middleware runs intent classification through an LLM router. The raw prompt is combined with thousands of real-time third-party API schemas indexed dynamically in a vector database. A recursive validation compiler then checks the LLM-generated JSON graph against hard dependency rules before anything executes.",
    challenge:
      "LLM hallucinations and out-of-order execution graphs. Models fabricated API endpoint paths, or produced linear configurations that failed to pass data across non-consecutive steps — e.g. mapping Step 1 output straight into Step 3 without going through Step 2's transformer.",
    solution:
      "A multi-agent validation loop with deterministic graph-linting compilers. Every generated graph is evaluated by a headless syntax parser against strict schema models. If it is invalid, the compiler feeds the structured validation errors back into the LLM context for a fast self-correction pass.",
    results:
      "Initial Zap-creation drop-off fell by 42%, and the engine reached a 91% zero-shot success rate on standard multi-step workflow generation.",
    metrics: [
      { value: "91%", label: "zero-shot success on multi-step workflows" },
      { value: "−42%", label: "drop-off in initial Zap creation" },
      { value: "1000s", label: "live API schemas indexed for retrieval" },
    ],
    stack: ["Python", "LLM router", "Vector database", "RAG", "JSON Schema", "Multi-agent validation"],
    flow: ["User prompt", "LLM intent router", "Schema retrieval (vector DB)", "Graph generation", "Graph-lint compiler", "Valid Zap"],
    loop: { from: 4, to: 3, label: "validation errors fed back for self-correction" },
  },
  {
    slug: "async-messaging-pipeline",
    company: "Zapier",
    track: "backend",
    title: "High-Throughput Asynchronous Messaging Pipeline",
    tagline: "Ingesting and dispatching billions of webhooks and polling transactions a day.",
    purpose:
      "Reliably ingest, queue and dispatch billions of real-time webhooks and polling transactions daily.",
    mission:
      "Guarantee 99.99% availability with no data loss or duplication under extreme, unpredictable bursts across thousands of vendor APIs.",
    architecture:
      "Distributed messaging built on Apache Kafka clusters, Celery task workers and Python (Django) microservices. An explicit Outbox Pattern in the persistence layer decouples state changes from outbound events, paired with a custom sidecar proxy that manages pooled TCP connections to the Kafka brokers.",
    challenge:
      "Severe downstream network saturation and high memory allocation from thousands of concurrent, ephemeral TCP handshakes hitting Kafka during massive traffic spikes.",
    solution:
      "Custom sidecar proxies deployed on every containerized worker pod. Each sidecar intercepts outgoing telemetry and events and multiplexes individual client connections into a single persistent, pre-warmed TCP tunnel to the brokers.",
    results:
      "Kafka TCP connection counts dropped 90% system-wide (a 10× optimization), core infrastructure costs fell 34%, and latency curves flattened during extreme bursts.",
    metrics: [
      { value: "−90%", label: "Kafka TCP connections (10× reduction)" },
      { value: "−34%", label: "core infrastructure cost" },
      { value: "99.99%", label: "availability target under burst load" },
    ],
    stack: ["Python", "Django", "Apache Kafka", "Celery", "Outbox Pattern", "Sidecar proxies", "Kubernetes"],
    flow: ["Webhooks & polls", "Django services", "Outbox table", "Sidecar proxy", "Kafka cluster", "Celery workers"],
  },
  {
    slug: "visual-workflow-canvas",
    company: "Zapier",
    track: "frontend",
    title: "Interactive Visual Workflow Canvas",
    tagline: "A drag-and-drop editor that stays at 60 FPS with 150+ branching steps.",
    purpose:
      "Provide a high-fidelity, drag-and-drop workspace for authoring nested, multi-branch automation paths.",
    mission:
      "Deliver a fluid, accessible UI that handles large automation graphs (100+ steps) with pixel-perfect consistency and real-time state tracking.",
    architecture:
      "React and TypeScript on a customized HTML5 Canvas / SVG hybrid state architecture. Node layouts are calculated off the main thread in Web Workers with constraint-driven layout engines. Styling uses CSS modules in the LCH color space for perceptual uniformity and strict WCAG compliance across light and dark themes.",
    challenge:
      "Major performance degradation and frame-rate stutter during pan and zoom when re-rendering workflows with many nested dependency branches.",
    solution:
      "Rigorous DOM virtualization and layer separation. Steps outside the viewport are culled from the render path, and static connection lines are drawn on a dedicated hardware-accelerated background canvas — keeping the React state cycle free of layout work.",
    results:
      "A steady 60 FPS on enterprise-grade automation graphs with more than 150 active steps and branches.",
    metrics: [
      { value: "60 FPS", label: "sustained during pan & zoom" },
      { value: "150+", label: "active steps and branches per graph" },
      { value: "WCAG", label: "compliant in light & dark themes" },
    ],
    stack: ["React", "TypeScript", "HTML5 Canvas", "SVG", "Web Workers", "CSS Modules (LCH)"],
    flow: ["Graph state", "Layout Web Worker", "Viewport culling", "SVG node layer", "Canvas edge layer", "60 FPS frame"],
  },
  {
    slug: "zap-history-audit-engine",
    company: "Zapier",
    track: "fullstack",
    title: "High-Scale Zap History & Audit Engine",
    tagline: "Sub-second search across billions of task executions and terabytes of logs.",
    purpose:
      "Let customers instantly look up, filter, inspect and troubleshoot execution logs across billions of tasks.",
    mission:
      "A fast, intuitive UI connected directly to massively sharded hot and cold storage with sub-second retrieval.",
    architecture:
      "React on the frontend and Python Django on the backend, integrated with Elasticsearch clusters and AWS S3 storage tiers. Recent task metadata lives in hot indexes; history older than 30 days is compressed and tiered into object storage with specialized search-index caches.",
    challenge:
      "Heavy query lag and memory exhaustion when users ran complex text searches or date filters over logs spanning multiple terabytes.",
    solution:
      "A dual-phase asynchronous query protocol. The UI renders an instant placeholder while a lightweight coordinator queries local Elasticsearch shards first. If the search crosses into older data, a background worker fetches from historical buckets and streams live hydration updates to React over Server-Sent Events.",
    results:
      "Median audit-log search latency fell from over 4.8 s to 320 ms for hot storage, and uptime held steady through high-volume enterprise audits.",
    metrics: [
      { value: "4.8s → 320ms", label: "median search latency (hot tier)" },
      { value: "TBs", label: "of execution history searchable" },
      { value: "SSE", label: "live hydration of cold-storage results" },
    ],
    stack: ["React", "TypeScript", "Python", "Django", "Elasticsearch", "AWS S3", "Server-Sent Events"],
    flow: ["React search UI", "Query coordinator", "Hot ES shards", "Cold S3 tier worker", "SSE stream", "Hydrated results"],
  },
  {
    slug: "client-lockbox-portal",
    company: "Regions Bank",
    track: "fullstack",
    title: "Client Lockbox Automated Retrieval Portal",
    tagline: "Self-service check and document image retrieval for 8,000+ corporate clients.",
    purpose:
      "Streamline check and document image extraction for more than 8,000 corporate banking clients.",
    mission:
      "Eliminate manual retrieval workflows, cut load times and improve internal service-delivery metrics.",
    architecture:
      "A micro-frontend setup with React and TypeScript, talking securely to a C# .NET REST API gateway. The backend links dynamically to structured corporate blob storage holding millions of financial transaction snapshots.",
    challenge:
      "High rendering latency and browser memory leaks when enterprise customers pulled millions of historical statements or ran simultaneous bulk image queries.",
    solution:
      "A paginated query architecture with strict DOM virtualization in React, combined with server-side compression for fast transfer of large PDF files.",
    results:
      "More than 1,000 internal engineering and operations hours saved per year, with sub-second load times for corporate treasury teams.",
    metrics: [
      { value: "1,000+", label: "operations hours saved per year" },
      { value: "8,000+", label: "corporate clients served" },
      { value: "<1s", label: "load times for treasury teams" },
    ],
    stack: ["React", "TypeScript", "Micro-frontends", "C#", ".NET REST API", "Blob storage"],
    flow: ["Treasury user", "React micro-frontend", ".NET API gateway", "Paginated query", "Blob storage", "Compressed PDFs"],
  },
  {
    slug: "core-banking-cloud-migration",
    company: "Regions Bank",
    track: "backend",
    title: "Legacy Core Mainframe to Cloud SaaS Migration",
    tagline: "Replacing an end-of-life core banking ledger with zero downtime.",
    purpose:
      "Modernize and replace end-of-life core banking software with an agile cloud platform.",
    mission:
      "Enable seamless third-party fintech API connections and sharply reduce straight-through transaction-processing errors.",
    architecture:
      "On-premise mainframe structures replaced with a cloud-native SaaS banking platform (Temenos). RESTful APIs, distributed message queues and Kafka event streams handle transactional ledgers in real time.",
    challenge:
      "Keeping data mapping between the old ledger databases and the new cloud endpoints perfectly consistent, with zero downtime, during hot-deployment cycles.",
    solution:
      "Dual-write database strategies plus dedicated validation sidecars that audit transactional integrity in microsecond cycles before records are formally persisted.",
    results:
      "Time-to-market for new digital retail products fell from months to days, and manual intervention rates dropped.",
    metrics: [
      { value: "Months → days", label: "time-to-market for new products" },
      { value: "0", label: "downtime during hot deployments" },
      { value: "Real-time", label: "ledger events over Kafka" },
    ],
    stack: ["Temenos", "REST APIs", "Kafka", "Message queues", "Dual-write", "Validation sidecars"],
    flow: ["Banking channels", "REST APIs", "Dual-write layer", "Validation sidecar", "Cloud core (Temenos)", "Kafka ledger events"],
  },
  {
    slug: "behavioral-ai-engine",
    company: "Regions Bank",
    track: "ai",
    title: "Real-Time Behavioral Omnichannel AI Engine",
    tagline: "The evolution of Rosie — personalized financial nudges across every channel.",
    purpose:
      "Upgrade the legacy behavioral engine into a hyper-personalized, real-time AI context broker.",
    mission:
      "Deliver contextual financial nudges, custom risk profiles and live behavioral prompts across digital banking, contact centers and branches.",
    architecture:
      "Data frameworks on Cloudera with cloud analytics pipelines and real-time streaming. Machine-learning models run classification over transaction histories and live clickstream telemetry to serve real-time predictions.",
    challenge:
      "Avoiding chat latency while running dense risk and behavioral classification models over highly regulated, sensitive financial streams.",
    solution:
      "Inference moved to edge API brokers, with user behavioral cohorts pre-computed asynchronously so real-time checks need minimal database lookups.",
    results:
      "Unified customer experiences across branch networks and mobile apps, with measurable engagement gains from personalized mobile nudges.",
    metrics: [
      { value: "Omnichannel", label: "app, contact center & branch" },
      { value: "Edge", label: "inference for low-latency chat" },
      { value: "↑", label: "engagement from personalized nudges" },
    ],
    stack: ["Cloudera", "Streaming pipelines", "ML classification", "Edge inference", "Clickstream telemetry"],
    flow: ["Transactions & clickstream", "Streaming pipeline", "Async cohort builder", "Edge inference broker", "Personalized nudge"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
