export type Track = "ai" | "backend" | "frontend" | "fullstack";

export const trackLabels: Record<Track, string> = {
  ai: "AI Engineering",
  backend: "Backend",
  frontend: "Frontend",
  fullstack: "Full Stack",
};

export type Company = "Zapier" | "Regions Bank" | "Shipt";

export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  company: Company;
  track: Track;
  period: string;
  title: string;
  /** Compact name for chips and links. */
  short: string;
  tagline: string;
  focus: string;
  architecture: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: Metric[];
  stack: string[];
  /** Left-to-right request path shown as an animated pipeline diagram. */
  flow: string[];
  /** Optional feedback edge drawn under the pipeline, e.g. a retry loop. */
  loop?: { from: number; to: number; label: string };
};

export const projects: Project[] = [
  {
    slug: "zap-history-audit-engine",
    company: "Zapier",
    track: "fullstack",
    period: "Sep 2024 – Feb 2025",
    title: "High-Scale Zap History & Audit Engine",
    short: "Zap History & Audit",
    tagline: "Fast search, filtering and troubleshooting across multi-terabyte automation history.",
    focus:
      "Help customers search, filter, inspect and troubleshoot historical automation execution records at scale.",
    architecture:
      "A React interface talks to Python/Django services. Elasticsearch indexes recent task metadata and hot execution records, while older history is compressed and archived in AWS S3. A two-phase query flow searches the relevant Elasticsearch shards first; when a request spans older data, a background worker retrieves the archived records and streams updates to the UI over Server-Sent Events.",
    challenge:
      "Complex text searches and date filters across multi-terabyte execution history caused API latency and memory pressure.",
    approach:
      "An asynchronous search path that returns an immediate loading state, prioritizes indexed hot data and retrieves archived records in the background. SSE keeps the interface updating as historical results arrive.",
    outcome:
      "Median search latency for hot storage fell from more than 4.8 seconds to about 320 milliseconds, with steadier behavior during high-volume audits.",
    metrics: [
      { value: "4.8s → 320ms", label: "median search latency (hot storage)" },
      { value: "Multi-TB", label: "execution history searchable" },
      { value: "SSE", label: "streams archived results as they arrive" },
    ],
    stack: ["React", "Python", "Django", "Elasticsearch", "AWS S3", "Background workers", "Server-Sent Events"],
    flow: ["React search UI", "Django query coordinator", "Hot Elasticsearch shards", "S3 archive worker", "SSE stream", "Hydrated results"],
  },
  {
    slug: "visual-workflow-canvas",
    company: "Zapier",
    track: "frontend",
    period: "Mar 2025 – Jul 2025",
    title: "Interactive Visual Workflow Canvas",
    short: "Workflow Canvas",
    tagline: "A drag-and-drop workflow editor that holds 60 FPS with 150+ branching steps.",
    focus:
      "Provide a responsive drag-and-drop editor for building and managing nested, multi-branch automation workflows.",
    architecture:
      "React/TypeScript application state drives a hybrid Canvas and SVG renderer. Web Workers run layout calculations off the main thread, DOM virtualization removes off-screen steps from the render path, and static connection lines are drawn on a dedicated canvas layer.",
    challenge:
      "Pan-and-zoom across large workflows caused frame drops and visible stutter as nested branches grew.",
    approach:
      "Separated the rendering layers, moved layout into Web Workers, culled off-screen nodes and rendered static connections independently of the React update cycle.",
    outcome:
      "Steady rendering at about 60 FPS on workflow graphs with more than 150 active steps and branches.",
    metrics: [
      { value: "60 FPS", label: "sustained during pan & zoom" },
      { value: "150+", label: "active steps and branches per graph" },
      { value: "Off-thread", label: "layout in Web Workers" },
    ],
    stack: ["React", "TypeScript", "HTML5 Canvas", "SVG", "Web Workers", "DOM virtualization", "CSS Modules (LCH)"],
    flow: ["React graph state", "Layout Web Worker", "Viewport culling", "SVG node layer", "Canvas edge layer", "60 FPS frame"],
  },
  {
    slug: "async-messaging-pipeline",
    company: "Zapier",
    track: "backend",
    period: "Aug 2025 – Dec 2025",
    title: "High-Throughput Asynchronous Messaging Pipeline",
    short: "Messaging Pipeline",
    tagline: "Ingesting and dispatching high-volume webhooks and polling events without melting the brokers.",
    focus:
      "Reliably ingest, queue and dispatch high-volume webhooks and polling events across connected third-party apps.",
    architecture:
      "Django services persist application changes together with their outbox events. Celery workers process asynchronous work and publish to Kafka, while a sidecar proxy on each containerized worker pools and reuses broker connections so traffic spikes stop forcing fresh TCP handshakes.",
    challenge:
      "Large bursts of webhook and polling activity created heavy connection churn, network saturation and memory pressure at the Kafka broker boundary.",
    approach:
      "Sidecar-based connection pooling with persistent, pre-warmed connections, cutting the number of short-lived client connections that reach the brokers.",
    outcome:
      "Kafka TCP socket connections dropped 90% and core infrastructure operating costs fell 34%, with flatter latency during traffic bursts.",
    metrics: [
      { value: "−90%", label: "Kafka TCP socket connections" },
      { value: "−34%", label: "core infrastructure operating cost" },
      { value: "99.99%", label: "availability target under burst load" },
    ],
    stack: ["Python", "Django", "Apache Kafka", "Celery", "Transactional outbox", "Sidecar proxies", "TCP pooling"],
    flow: ["Webhooks & polls", "Django services", "Outbox table", "Celery workers", "Sidecar connection pool", "Kafka brokers"],
  },
  {
    slug: "natural-language-workflow-engine",
    company: "Zapier",
    track: "ai",
    period: "Jan 2026 – Jun 2026",
    title: "Natural Language to Workflow Engine",
    short: "NL → Workflow Engine",
    tagline: "Zapier Copilot Core — turning plain English into valid, executable multi-step automations.",
    focus:
      "Translate natural-language instructions into valid, executable, multi-step automation workflows.",
    architecture:
      "An LLM router classifies the user's intent. Relevant third-party API schemas are retrieved from a vector database and supplied as context for generation. Before anything runs, a deterministic validation layer checks the generated workflow JSON against schema requirements and step-dependency rules.",
    challenge:
      "Generated workflows sometimes contained fabricated API endpoint paths or invalid data mappings between steps, producing execution graphs with broken dependencies.",
    approach:
      "Deterministic schema and graph validation before execution. Invalid output is rejected with structured errors that go back to the model for a correction pass, instead of being trusted because the model produced it.",
    outcome:
      "A 91% zero-shot success rate on standard multi-step workflow generation and a 42% reduction in initial Zap-creation drop-off.",
    metrics: [
      { value: "91%", label: "zero-shot success on multi-step workflows" },
      { value: "−42%", label: "drop-off in initial Zap creation" },
      { value: "Pre-execution", label: "schema & dependency validation" },
    ],
    stack: ["LLM orchestration", "Intent classification", "Vector database", "RAG", "JSON Schema", "Graph linting"],
    flow: ["User prompt", "LLM intent router", "Schema retrieval (vector DB)", "Workflow generation", "Schema & graph validator", "Executable Zap"],
    loop: { from: 4, to: 3, label: "structured validation errors fed back for a correction pass" },
  },
  {
    slug: "core-banking-cloud-migration",
    company: "Regions Bank",
    track: "backend",
    period: "Jul 2021 – Apr 2024",
    title: "Core Banking Legacy Systems Transformation",
    short: "Core Banking Transformation",
    tagline: "Moving account and ledger capabilities off a monolithic mainframe onto distributed services.",
    focus:
      "Modernize core account and ledger infrastructure by moving capabilities from a monolithic mainframe toward highly available distributed services.",
    architecture:
      "An active-active dual-write replication topology, with Kafka streams and Celery workers handling asynchronous processing behind a Django service layer. A local outbox makes each database change and its event record atomic, and sidecar proxies pool persistent broker connections.",
    challenge:
      "Message failures, out-of-order transaction logs and database connection bottlenecks got worse during peak transaction periods.",
    approach:
      "Containerized sidecar proxies to cut connection churn and keep broker connectivity persistent, with Kafka and Celery moving replication work off the request path.",
    outcome:
      "Replication packet-drop errors were eliminated, mainframe dependency overhead fell 40%, and synchronization between the systems held at sub-second latency.",
    metrics: [
      { value: "0", label: "replication packet-drop errors" },
      { value: "−40%", label: "mainframe dependency overhead" },
      { value: "<1s", label: "synchronization between systems" },
    ],
    stack: ["Python", "Django", "Apache Kafka", "Celery", "Dual-write replication", "Transactional outbox", "Sidecar proxies"],
    flow: ["Mainframe ledger", "Dual-write replication", "Outbox events", "Sidecar broker pool", "Kafka + Celery", "Distributed services"],
  },
  {
    slug: "client-lockbox-portal",
    company: "Regions Bank",
    track: "fullstack",
    period: "Jul 2021 – Apr 2024",
    title: "Treasury Management Lockbox Retrieval Portal",
    short: "Treasury Lockbox Portal",
    tagline: "A search and reporting workspace for institutional treasury teams over huge lockbox histories.",
    focus:
      "Give institutional treasury users a search, filtering and reporting workspace for large volumes of lockbox transaction records.",
    architecture:
      "A React and TypeScript frontend backed by C#/.NET Core services over distributed Elasticsearch indices. Searches return an initial interface state quickly, then long-running historical queries continue asynchronously and stream updates over SSE while cold-bucket work completes.",
    challenge:
      "Queries over deeply historical, unstructured records caused severe slowdowns and application timeouts.",
    approach:
      "A two-phase asynchronous search pipeline that puts responsive initial results first and streams later updates while the historical work finishes.",
    outcome:
      "Multi-filter dashboard response time fell from about 4.8 seconds to 320 milliseconds, alongside a 48% improvement in commercial client satisfaction.",
    metrics: [
      { value: "4.8s → 320ms", label: "multi-filter dashboard response" },
      { value: "+48%", label: "commercial client satisfaction" },
      { value: "SSE", label: "streamed historical search results" },
    ],
    stack: ["React", "TypeScript", "C#", ".NET Core", "Elasticsearch", "Background processing", "Server-Sent Events"],
    flow: ["Treasury user", "React + TypeScript UI", ".NET Core services", "Elasticsearch indices", "Async cold-bucket search", "SSE updates"],
  },
  {
    slug: "behavioral-ai-engine",
    company: "Regions Bank",
    track: "ai",
    period: "Jul 2021 – Apr 2024",
    title: "Omnichannel Predictive Behavioral AI Engine",
    short: "Behavioral AI Engine",
    tagline: "Context-aware financial guidance and support automation, with every LLM answer policy-checked.",
    focus:
      "Use contextual signals to give more relevant financial guidance and automate customer-support interactions across banking channels.",
    architecture:
      "LLM inference combined with retrieval of relevant context and specialized governance logic, running in a Cloudera environment. Generated responses pass through a validation layer that checks them against defined semantic and policy boundaries before they reach a customer.",
    challenge:
      "Regulatory and privacy risk: hallucinated answers, and the chance of exposing sensitive customer information in generated content.",
    approach:
      "A pre-response validation and governance layer that checks generated content against defined boundaries before delivery — semantic and policy validation, not just syntax linting, because syntax checks cannot enforce privacy policy.",
    outcome:
      "Automated digital-support resolution improved 55%, with zero compliance or data-privacy exposures reported.",
    metrics: [
      { value: "+55%", label: "automated digital-support resolution" },
      { value: "0", label: "compliance or privacy exposures" },
      { value: "Pre-response", label: "semantic & policy validation" },
    ],
    stack: ["LLM inference", "RAG", "Vector search", "Multi-agent governance", "Response validation", "Cloudera"],
    flow: ["Customer channel", "Context retrieval (RAG)", "LLM inference", "Governance agents", "Policy validation", "Safe response"],
  },
  {
    slug: "fulfillment-routing-engine",
    company: "Shipt",
    track: "backend",
    period: "Jan 2020 – Jun 2021",
    title: "Real-Time Marketplace Fulfillment Routing Engine",
    short: "Fulfillment Routing",
    tagline: "Matching live shopper capacity to delivery queues through bursty mobile traffic.",
    focus:
      "Match active shopper capacity with live delivery queues using routing distance and traffic context.",
    architecture:
      "FastAPI services power routing and fulfillment workflows. Redis caches hot operational data, Kafka carries asynchronous events, and containerized workers with sidecar components absorb bursts of webhook activity before dispatch.",
    challenge:
      "Large bursts of mobile-app webhook triggers caused socket allocation failures and network drops at the message-broker boundary.",
    approach:
      "Micro-caching sidecars on worker nodes that bundle outbound requests before dispatch, cutting the connection load on the downstream brokers.",
    outcome:
      "Broker connection burden dropped 10×, and the platform supported up to 2.5 million active orders.",
    metrics: [
      { value: "10×", label: "lower broker connection burden" },
      { value: "2.5M", label: "active orders supported" },
      { value: "Real-time", label: "shopper-to-queue matching" },
    ],
    stack: ["Python", "FastAPI", "Redis", "Apache Kafka", "AWS", "Micro-caching sidecars", "Webhooks"],
    flow: ["Mobile app webhooks", "Micro-caching sidecar", "Kafka events", "FastAPI routing", "Redis capacity cache", "Shopper ↔ order match"],
  },
  {
    slug: "merchant-catalog-workspace",
    company: "Shipt",
    track: "frontend",
    period: "Jan 2020 – Jun 2021",
    title: "Interactive Merchant Catalog & Inventory Workspace",
    short: "Merchant Catalog",
    tagline: "A canvas workspace that took dense retail catalogs from 15 FPS to a smooth 60.",
    focus:
      "Give retail partners an interactive workspace to view, monitor and reorganize dense catalog and inventory structures.",
    architecture:
      "React and TypeScript around a Canvas-based grid for dense visual structures. Web Workers handle coordinate and layout math off the main thread, and viewport clipping keeps off-screen nodes out of the rendering work.",
    challenge:
      "Panning across large catalog graphs slowed layout and dropped rendering to about 15 FPS once more than 1,000 items were on screen.",
    approach:
      "Moved coordinate calculations into Web Workers and clipped rendering to the active viewport so off-screen nodes never touched the main rendering path.",
    outcome:
      "Stable rendering at about 60 FPS across workspaces with more than 1,500 active catalog nodes.",
    metrics: [
      { value: "15 → 60 FPS", label: "while panning large catalogs" },
      { value: "1,500+", label: "active catalog nodes" },
      { value: "Off-thread", label: "layout math in Web Workers" },
    ],
    stack: ["React", "TypeScript", "HTML5 Canvas", "Web Workers", "Viewport clipping", "LCH color styling"],
    flow: ["Catalog data", "Layout Web Worker", "Viewport clipping", "Canvas grid", "60 FPS workspace"],
  },
  {
    slug: "shopper-delivery-audit-platform",
    company: "Shipt",
    track: "fullstack",
    period: "Jan 2020 – Jun 2021",
    title: "Shopper Delivery Experience & Auditing Platform",
    short: "Delivery Auditing",
    tagline: "One operational workspace for trips, payouts and fulfillment records — fast at peak.",
    focus:
      "Bring trip details, shopper payouts and fulfillment records into one workspace for investigating delivery anomalies and payout accuracy.",
    architecture:
      "React provides the operational interface, Django serves the APIs, PostgreSQL stores relational delivery and payout data, and Elasticsearch searches operational logs. A multi-phase asynchronous query flow shows an immediate loading state and streams result chunks to the UI over SSE.",
    challenge:
      "Multi-column relational lookups across millions of historical delivery events made responses slow and the portal sluggish.",
    approach:
      "Asynchronous query processing with immediate UI feedback and incremental result delivery over SSE, so useful information shows up without waiting for one large response.",
    outcome:
      "Typical query responses went from several seconds to about 320 milliseconds, keeping the portal responsive during peak periods.",
    metrics: [
      { value: "~320ms", label: "typical query response (from several seconds)" },
      { value: "Millions", label: "of historical delivery events" },
      { value: "SSE", label: "streamed result chunks" },
    ],
    stack: ["React", "Python", "Django", "PostgreSQL", "Elasticsearch", "Async queries", "Server-Sent Events"],
    flow: ["Ops investigator", "React workspace", "Django APIs", "PostgreSQL + Elasticsearch", "Async query chunks", "SSE stream"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const companies: Company[] = ["Zapier", "Regions Bank", "Shipt"];

/** Recurring engineering themes across the case studies. */
export type Pattern = {
  id: string;
  title: string;
  body: string;
  projects: string[];
};

export const patterns: Pattern[] = [
  {
    id: "events",
    title: "Event-driven integration",
    body: "Kafka, webhooks, Celery workers and async processing to absorb bursts and keep request handling separate from downstream work.",
    projects: ["async-messaging-pipeline", "core-banking-cloud-migration", "fulfillment-routing-engine"],
  },
  {
    id: "outbox",
    title: "Reliable event publication",
    body: "Transactional outbox: the business change and its event commit in one local transaction, and consumers tolerate retries and duplicates.",
    projects: ["async-messaging-pipeline", "core-banking-cloud-migration"],
  },
  {
    id: "search",
    title: "Fast search over history",
    body: "Elasticsearch indexing, hot/cold tiers and background retrieval keep searches over years of records responsive.",
    projects: ["zap-history-audit-engine", "client-lockbox-portal", "shopper-delivery-audit-platform"],
  },
  {
    id: "interfaces",
    title: "Data-heavy interfaces at 60 FPS",
    body: "Canvas/SVG layers, Web Workers, virtualization and viewport clipping take work off the main thread.",
    projects: ["visual-workflow-canvas", "merchant-catalog-workspace"],
  },
  {
    id: "ai",
    title: "LLM output is untrusted input",
    body: "Generated workflows and answers are proposals, checked against schemas, dependency rules and policy before they run or ship.",
    projects: ["natural-language-workflow-engine", "behavioral-ai-engine"],
  },
  {
    id: "feedback",
    title: "Progress users can see",
    body: "Instant loading states, streamed partial results and structured errors make long async work feel fast.",
    projects: ["zap-history-audit-engine", "client-lockbox-portal", "shopper-delivery-audit-platform", "natural-language-workflow-engine"],
  },
];
