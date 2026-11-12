export type Track = "ai" | "backend" | "frontend" | "fullstack";

export const trackLabels: Record<Track, string> = {
  ai: "AI Engineering",
  backend: "Backend",
  frontend: "Frontend",
  fullstack: "Full Stack",
};

export type Company = "Zapier" | "Regions Bank" | "Shipt" | "Daxko";

export type Metric = { value: string; label: string };

/** A picture of the product the work was part of. The caption says exactly what it shows. */
export type ProjectImage = {
  /** Path under /public, without the base path. */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

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
  /** Measured results only; empty when there are none to stand behind. */
  metrics: Metric[];
  stack: string[];
  /** Left-to-right request path shown as an animated pipeline diagram. */
  flow: string[];
  /** Optional feedback edge drawn under the pipeline, e.g. a retry loop. */
  loop?: { from: number; to: number; label: string };
  image?: ProjectImage;
};

export const projects: Project[] = [
  // ── Zapier ──────────────────────────────────────────────────────────────
  {
    slug: "copilot-workflow-builder",
    company: "Zapier",
    track: "fullstack",
    period: "Mid 2024 – Late 2025",
    title: "Copilot-Assisted Natural Language Workflow Builder",
    short: "Copilot Workflow Builder",
    tagline: "Describe an automation in plain words and watch it appear, step by step, on a live canvas.",
    focus:
      "Let people set up multi-step automations by describing them, without manual API pairing, variable formatting or validation rules.",
    architecture:
      "A Backend-for-Frontend design. A Next.js layer serves the interactive canvas and relays each plain-text request to a Python/Django service, which extracts entities with generative AI, turns them into a structured JSON workflow tree and records it in an isolated PostgreSQL ledger. A long-lived WebSocket keeps the user's canvas and the backend in sync.",
    challenge:
      "Live updates to large, multi-tier workflow maps arrived out of order over the network, causing layout shifts and broken schema hydration.",
    approach:
      "Formal JSON Schema guardrails in Django so every generated workflow is well-formed before it reaches the client, and optimistic UI updates in React so the canvas renders smoothly even for detailed flows.",
    outcome:
      "Setting up a typical five-step integration took half the time, and far fewer people abandoned configuration part way through.",
    metrics: [
      { value: "−50%", label: "time to set up a five-step integration" },
      { value: "JSON Schema", label: "guardrails on every generated workflow" },
    ],
    stack: ["Next.js", "React", "Python", "Django", "PostgreSQL", "OpenAI API", "WebSockets", "Docker"],
    flow: ["Plain-English request", "Next.js BFF", "Django AI service", "JSON Schema check", "PostgreSQL ledger", "Live canvas"],
    image: {
      src: "/projects/copilot-workflow-builder.webp",
      width: 1452,
      height: 948,
      alt: "Zapier's Copilot workflow editor, with a chat panel beside the workflow steps it built",
      caption: "Public screenshot of Zapier Copilot's workflow editor, the product this work was part of. Screenshot: Zapier.",
    },
  },
  {
    slug: "visual-workflow-canvas",
    company: "Zapier",
    track: "frontend",
    period: "Late 2024 – Early 2026",
    title: "Infinite Canvas Visualization Architecture",
    short: "Workflow Canvas",
    tagline: "An infinite workflow canvas that holds 60 FPS with up to 150 branching app steps.",
    focus:
      "Give people one visual workspace to plan, simulate and organize their operations, replacing separate list menus with an infinite canvas.",
    architecture:
      "Execution paths are drawn on a hybrid HTML5 Canvas and SVG layer instead of DOM nodes. Local state lives in Zustand to avoid root-level React re-renders, and node layout is calculated in background Web Workers so the main thread stays free.",
    challenge:
      "Dragging large automations with hundreds of linked fields caused visible lag and stutter, especially on lower-spec mobile and desktop screens.",
    approach:
      "A frustum-culling engine that unmounts workflow components outside the viewport and freezes deep UI-tree calculations beyond the visible bounds.",
    outcome:
      "The main rendering thread held a steady 60 FPS for workflows with up to 150 app steps, and frontend memory use fell by about a third.",
    metrics: [
      { value: "60 FPS", label: "steady, with up to 150 app steps" },
      { value: "−35%", label: "frontend memory use (approx.)" },
    ],
    stack: ["React", "TypeScript", "Zustand", "HTML5 Canvas", "SVG", "Web Workers", "Vite"],
    flow: ["Pointer input", "Zustand store", "Web Worker layout", "Viewport culling", "Canvas + SVG paint"],
    image: {
      src: "/projects/visual-workflow-canvas.webp",
      width: 1600,
      height: 905,
      alt: "A Zapier workflow with conditional branches laid out as connected steps",
      caption:
        "Public screenshot of Zapier's branching workflow interface. It shows the product, not the canvas rendering engine described here. Screenshot: Zapier.",
    },
  },
  {
    slug: "reliable-event-routing",
    company: "Zapier",
    track: "backend",
    period: "Mid 2024 – Mid 2025",
    title: "Transactional Outbox Event Engine for Fault-Tolerant Retries",
    short: "Reliable Event Routing",
    tagline: "Every workflow task delivered, even through traffic spikes and third-party outages.",
    focus:
      "Stop data loss and dropped executions during sudden traffic surges or when third-party services go down.",
    architecture:
      "The transactional core of the execution engine. Instead of calling third-party endpoints mid-transaction, each state change and its task payload commit together in one PostgreSQL transaction (a transactional outbox). Go log tailers poll the outbox and publish to Kafka, where consumers route each webhook to its destination.",
    challenge:
      "Write amplification in PostgreSQL during big volume spikes could lock critical databases.",
    approach:
      "A dynamic database-splitting framework plus Redis sliding-window rate limits that move non-critical retry queues off the main write path.",
    outcome:
      "Webhook delivery tracking reached 99.999% reliability, with no more “zombie” tasks that silently went missing, at peaks above 40,000 tasks per second.",
    metrics: [
      { value: "99.999%", label: "webhook tracking reliability" },
      { value: "40,000+/s", label: "tasks at peak load" },
    ],
    stack: ["Go", "Apache Kafka", "PostgreSQL", "AWS EKS", "Redis Enterprise", "Envoy"],
    flow: ["Workflow step", "PostgreSQL + outbox", "Go outbox tailer", "Kafka", "Routing consumers", "Destination webhook"],
    loop: { from: 5, to: 3, label: "failed deliveries retried through rate-limited queues" },
  },
  {
    slug: "autonomous-agent-orchestration",
    company: "Zapier",
    track: "ai",
    period: "Early 2024 – Mid 2026",
    title: "Multi-Agent Automation Orchestration Platform",
    short: "Agent Orchestration",
    tagline: "AI agents that act on open-ended requests, and stop to ask a person when they aren't sure.",
    focus:
      "Move automation beyond fixed logic chains, so agents can make decisions, handle unexpected data and fix broken steps on their own.",
    architecture:
      "Custom LangGraph execution loops handle open-ended requests such as “if pipeline costs shift, alert the manager and update the tracking sheet”. Incoming data is embedded and matched against past workflow behavior in a Milvus vector cluster, and that context goes to an LLM router behind FastAPI, which turns the request into sequential API calls across Zapier's integrations.",
    challenge:
      "Models sometimes looped endlessly or guessed API values that didn't exist when working with customized user spreadsheets.",
    approach:
      "Real-time evaluation tracing with Braintrust, plus validation loops that pause the agent and hand off to a person whenever confidence drops below a set floor.",
    outcome:
      "Agents corrected more than 30% of minor data mismatches on their own, lifting completion rates for complex, open-ended tasks.",
    metrics: [{ value: "30%+", label: "minor data mismatches self-corrected" }],
    stack: ["Python", "LangGraph", "LangChain", "Milvus", "Qdrant", "FastAPI", "Braintrust", "AWS Bedrock"],
    flow: ["Open-ended request", "Embeddings + Milvus", "LLM router", "LangGraph agent", "Confidence check", "Zapier actions"],
    loop: { from: 4, to: 3, label: "low confidence pauses for human review" },
    image: {
      src: "/projects/autonomous-agent-orchestration.webp",
      width: 1600,
      height: 1212,
      alt: "Zapier Agents interface showing an agent's instructions and connected tools",
      caption: "Public screenshot of Zapier Agents. The orchestration backend described here isn't visible in it. Screenshot: Zapier.",
    },
  },

  // ── Regions Bank ────────────────────────────────────────────────────────
  {
    slug: "regions-web-platform",
    company: "Regions Bank",
    track: "fullstack",
    period: "Late 2021 – 2023",
    title: "Next-Gen Web Experience & Content Platform Modernization",
    short: "Web Platform Modernization",
    tagline: "A slow monolithic banking site rebuilt as fast, independently deployed micro-frontends.",
    focus:
      "Replace slow, monolithic web layers with a responsive acquisition and self-service experience, and end long release cycles that hurt page speed and search rankings.",
    architecture:
      "A headless, decoupled platform. Next.js micro-frontends serve static and server-rendered components, calling C#/.NET Core microservices through an enterprise API gateway. Those services aggregate data from the Sitecore CMS and core banking systems, and everything runs on Kubernetes (AKS).",
    challenge: "Migrating a large enterprise site without downtime and without breaking established SEO structure.",
    approach:
      "Next.js dynamic routing with Incremental Static Regeneration, so editors publish to Sitecore without full redeployments or cache clears.",
    outcome:
      "Page-load times dropped by about 40%, and frontend and backend teams could ship their services independently.",
    metrics: [
      { value: "−40%", label: "page-load time (approx.)" },
      { value: "Independent", label: "frontend and backend releases" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "C#", ".NET Core", "Sitecore", "Kubernetes (AKS)", "Azure Pipelines"],
    flow: ["Visitor", "Next.js micro-frontends", "API gateway", ".NET Core services", "Sitecore + core banking"],
    image: {
      src: "/projects/regions-web-platform.webp",
      width: 800,
      height: 600,
      alt: "Regions online banking for business on a laptop, showing the Business Services product page",
      caption: "Public image of Regions' online banking for business. Image: Regions Bank.",
    },
  },
  {
    slug: "financial-insights-components",
    company: "Regions Bank",
    track: "frontend",
    period: "Early 2023 – Early 2024",
    title: "Customer Insights Engine & Component Library",
    short: "Financial Insights UI",
    tagline: "Spending insights and cash-flow trends inside digital banking, on one shared component library.",
    focus:
      "Replace static transaction ledgers with visual insights such as subscription trackers, spending spikes and predicted cash flow, on web and mobile alike.",
    architecture:
      "A cross-platform React and React Native front end that consumes standard JSON events from notification microservices. Redux Toolkit manages transaction streams on the device, so components re-render only when new insights arrive.",
    challenge:
      "Rendering financial charts, real-time alerts and interactive graphs smoothly across many mobile and web screen configurations.",
    approach:
      "A strict, reusable design-system component library, and list virtualization to render long transaction ledgers without memory leaks.",
    outcome:
      "Dashboard rendering stayed under 150 ms per session, crash rates fell and more customers adopted the financial-health widgets.",
    metrics: [{ value: "<150ms", label: "rendering per dashboard session" }],
    stack: ["React Native", "React", "TypeScript", "Redux Toolkit", "Webpack", "Jest", "React Testing Library", "Figma"],
    flow: ["Notification services", "JSON events", "Redux Toolkit store", "Design-system components", "Virtualized ledgers"],
    image: {
      src: "/projects/financial-insights-components.webp",
      width: 750,
      height: 500,
      alt: "The Regions mobile app with account balances and a Track spending widget",
      caption: "Public image of the Regions mobile app, including its spending-insights widget. Image: Regions Bank.",
    },
  },
  {
    slug: "enterprise-api-layer",
    company: "Regions Bank",
    track: "backend",
    period: "2022 – Mid 2023",
    title: "Enterprise API Integration & Core Modernization Layer",
    short: "Enterprise API Layer",
    tagline: "A secure, event-driven middle tier between decades-old cores and modern banking platforms.",
    focus:
      "Untangle decades of legacy dependencies: real-time data access, reusable enterprise APIs and faster settlement across modern payment rails.",
    architecture:
      "A horizontally scalable middle tier between legacy deposit and lending systems and SaaS-based modern cores. Kafka streams core-system events in real time, and Axway API Management handles security, throttling and open-banking protocols, with every client authenticating through OpenID Connect before it reaches ledger data.",
    challenge:
      "Keeping data consistent between real-time open-banking transactions and batch-oriented core databases, without corruption.",
    approach:
      "Transactional outbox patterns inside the microservices, keeping message queues and relational state consistent even through network partitions.",
    outcome:
      "Onboarding a corporate partner to the APIs went from months to days, with the layer sustaining spikes of thousands of transactions per second.",
    metrics: [
      { value: "Months → days", label: "partner API onboarding" },
      { value: "1,000s TPS", label: "transaction spikes sustained" },
    ],
    stack: ["Java", "Spring Boot", "C#", ".NET Web API", "Apache Kafka", "Axway API Management", "OpenID Connect", "Azure", "Docker"],
    flow: ["Partner or app", "Axway gateway + OIDC", "Spring Boot / .NET services", "Outbox", "Kafka", "Legacy + SaaS cores"],
    image: {
      src: "/projects/enterprise-api-layer.webp",
      width: 1600,
      height: 871,
      alt: "A sign-in screen with email and password fields and a single sign-on button",
      caption:
        "Illustration only: a single sign-on screen from Forcepoint ONE, a third-party security product. It is not a Regions system; Regions' internal API tooling isn't public.",
    },
  },
  {
    slug: "fraud-decision-support",
    company: "Regions Bank",
    track: "ai",
    period: "Mid 2021 – Early 2024",
    title: "Intelligent Fraud Detection & Decision Support Models",
    short: "Fraud Decision Support",
    tagline: "Real-time fraud scores that explain themselves to the people who act on them.",
    focus:
      "Catch more commercial fraud while cutting the false positives that slow businesses down and disrupt treasury clients' daily work.",
    architecture:
      "A high-throughput machine-learning platform over structured and unstructured transaction histories. Features come from a federated Snowflake repository, models score each event against the client's historical baseline in real time, and scores feed automated alerts and decision-support dashboards for relationship managers.",
    challenge:
      "Bias in historical training data and unexplainable model shifts were an unacceptable risk for a bank.",
    approach:
      "A federated data-governance program and explainable-AI frameworks (SHAP and LIME) that show exactly why each anomaly score fired.",
    outcome:
      "Clearly more accurate than the earlier rules-based engine, isolating anomalies in milliseconds and helping commercial clients avoid wire and data fraud.",
    metrics: [
      { value: "Real time", label: "scoring against each client's baseline" },
      { value: "SHAP / LIME", label: "explanation behind every score" },
    ],
    stack: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "Apache Spark", "Snowflake", "MLOps", "SHAP", "LIME"],
    flow: ["Transactions", "Snowflake features", "Fraud models", "SHAP / LIME explanation", "Alerts + dashboards"],
    image: {
      src: "/projects/fraud-decision-support.webp",
      width: 1600,
      height: 1200,
      alt: "A fraud-analytics dashboard with fraud rates by category, by date, by risk level and by US state",
      caption:
        "Illustration only: a generic fraud-analytics dashboard built on sample data. It is not a Regions system; Regions' internal fraud tools aren't public.",
    },
  },

  // ── Shipt ───────────────────────────────────────────────────────────────
  {
    slug: "realtime-shopper-messaging",
    company: "Shipt",
    track: "fullstack",
    period: "2020",
    title: "Real-Time Order Tracking & Communication Platform",
    short: "Shopper Messaging",
    tagline: "Shoppers and customers in touch in real time, even from a store with no signal.",
    focus:
      "Connect shoppers in the aisles with customers at home, so out-of-stock items get replacement approvals right away as order volumes surge.",
    architecture:
      "Shopper (React Native) and customer clients hold long-lived WebSocket connections to a real-time messaging gateway. Go microservices handle the concurrency, Redis keeps active chat sessions in memory and PostgreSQL stores order records.",
    challenge:
      "Poor cellular coverage inside concrete stores kept dropping WebSockets, and messages were lost.",
    approach:
      "An automatic fallback: when a WebSocket heartbeat fails, the backend switches delivery to a queued SMS pipeline through telecom providers.",
    outcome:
      "Chat latency stayed under 200 ms and messages lost to in-store dead zones fell by more than 90%, through a phase of multiplying order volume.",
    metrics: [
      { value: "<200ms", label: "chat latency" },
      { value: "−90%+", label: "messages lost in store dead zones" },
    ],
    stack: ["Go", "Node.js", "TypeScript", "React Native", "React", "WebSockets", "gRPC", "Redis", "PostgreSQL"],
    flow: ["Shopper app", "WebSocket gateway", "Go services", "Redis sessions", "Customer app"],
    loop: { from: 2, to: 1, label: "heartbeat lost → queued SMS fallback" },
    image: {
      src: "/projects/realtime-shopper-messaging.webp",
      width: 614,
      height: 644,
      alt: "Shipt's in-app chat between a shopper and a customer about an order",
      caption: "Public screenshot of Shipt's shopper–customer messaging. Screenshot: Shipt.",
    },
  },
  {
    slug: "web-checkout-rearchitecture",
    company: "Shipt",
    track: "frontend",
    period: "Q1 – Q4 2020",
    title: "Responsive Web App Core Re-architecture",
    short: "Web Catalog & Checkout",
    tagline: "The desktop store moved from a client-rendered SPA to Next.js, and got much faster.",
    focus:
      "Improve search crawlability, page speed and desktop–mobile parity as desktop orders grew.",
    architecture:
      "The web store moved from a client-side SPA to server-side and static rendering with Next.js. Landing pages and catalog layouts arrive as full HTML, while carts, promo codes and delivery-time choices live in Redux.",
    challenge:
      "Endless product grids full of images caused memory bloat and layout shifts during hydration.",
    approach:
      "Strict code-splitting boundaries, virtualized grid rows and a standard component library to cut re-render overhead.",
    outcome:
      "First Contentful Paint fell by more than 1.5 seconds, and desktop checkout conversion rose by an estimated 12%.",
    metrics: [
      { value: "−1.5s+", label: "First Contentful Paint" },
      { value: "~12%", label: "more desktop checkouts (estimated)" },
    ],
    stack: ["React", "Next.js", "TypeScript", "Redux", "Styled Components", "Cypress"],
    flow: ["Shopper's browser", "Next.js SSR / SSG", "Catalog HTML", "Redux cart state", "Checkout"],
    image: {
      src: "/projects/web-checkout-rearchitecture.webp",
      width: 500,
      height: 400,
      alt: "Target's same-day delivery checkout, powered by Shipt",
      caption:
        "Target's same-day delivery checkout powered by Shipt, from a 2019 press article. It shows the service, not the Shipt web app described here. Image: Target.",
    },
  },
  {
    slug: "delivery-window-engine",
    company: "Shipt",
    track: "backend",
    period: "Early – Aug 2020",
    title: "High-Availability Delivery Window Slots Engine",
    short: "Delivery Windows",
    tagline: "Delivery windows that held up through record pandemic demand, with no double-booked slots.",
    focus:
      "End “no delivery windows available” during the early-2020 spikes by calculating regional capacity in real time without overloading the main databases.",
    architecture:
      "A multi-threaded Go service computes open windows by joining shopper availability, store hours and historical drive times. A write-through cache on Redis Enterprise prevents over-allocating any hour, and completed orders emit Kafka events for matching and routing.",
    challenge:
      "Thousands of shoppers trying to book the same evening slot at once created severe race conditions.",
    approach:
      "A distributed lock manager in Redis, with slot selection kept fully separate from payment processing through asynchronous queues.",
    outcome:
      "Record traffic passed without a widespread database timeout or checkout failure, at more than 15,000 API operations per second with slot checks under 50 ms.",
    metrics: [
      { value: "15,000+/s", label: "API operations at peak" },
      { value: "<50ms", label: "per slot check" },
    ],
    stack: ["Go", "Python", "Apache Kafka", "Redis Enterprise", "PostgreSQL", "Kubernetes (EKS)"],
    flow: ["Checkout", "Go slot engine", "Redis locks + cache", "Kafka events", "Matching + routing"],
    image: {
      src: "/projects/delivery-window-engine.webp",
      width: 1400,
      height: 1312,
      alt: "Shipt app screens for choosing a delivery time and for a shopper's available orders",
      caption: "Public screenshots of Shipt's delivery scheduling and shopper order-availability screens. Screenshots: Shipt.",
    },
  },
  {
    slug: "smart-batching-optimizer",
    company: "Shipt",
    track: "ai",
    period: "Mid 2020 – Q2 2021",
    title: "Predictive Shopper Route & Batching Optimization",
    short: "Smart Batching",
    tagline: "Machine-learned estimates feeding a fast solver that groups orders into one shopper trip.",
    focus:
      "Raise shopper efficiency (items picked per hour) and delivery economics, so the existing network could absorb volume spikes with stable pay.",
    architecture:
      "Historical pickups, item weights and trip data live in Snowflake, and Spark prepares the features. XGBoost models estimate picking and driving times, which feed a high-performance C++ heuristic solver that groups several customers' orders into a single shopper trip.",
    challenge:
      "Static routing couldn't cope with real-time surprises such as out-of-stock items or traffic accidents.",
    approach:
      "Dynamic reinforcement loops that recalculate active batches on the fly from telemetry sent by the Shopper app.",
    outcome:
      "In-store picking efficiency rose 18%, miles driven per order fell by an estimated 14%, and late deliveries dropped noticeably.",
    metrics: [
      { value: "+18%", label: "in-store picking efficiency" },
      { value: "−14%", label: "miles driven per order (estimated)" },
    ],
    stack: ["Python", "C++", "XGBoost", "TensorFlow", "Apache Spark", "Snowflake", "AWS SageMaker"],
    flow: ["Snowflake history", "Spark features", "XGBoost estimates", "C++ batching solver", "Shopper app"],
    loop: { from: 4, to: 3, label: "live telemetry re-batches active trips" },
  },

  // ── Daxko ───────────────────────────────────────────────────────────────
  {
    slug: "member-engagement-automation",
    company: "Daxko",
    track: "fullstack",
    period: "May – Nov 2019",
    title: "Omni-Channel Member Engagement & Drip Automation Engine",
    short: "Member Engagement",
    tagline: "Gyms re-engage members who stop showing up, automatically, by SMS and email.",
    focus:
      "Take manual outreach off gym staff: members who haven't checked in for a set time (say 14 days) get re-engaged automatically, cutting churn without front-desk work.",
    architecture:
      "A React configuration dashboard over a Ruby on Rails backend that tracks member behavior such as check-in drop-offs and visit milestones. Sidekiq workers backed by Redis run high-volume message queues that send SMS through Twilio and email through AWS SES.",
    challenge:
      "Large batches sent during the morning rush hit provider rate limits and slowed database transactions.",
    approach:
      "A distributed token-bucket rate limiter in Redis to smooth delivery, and transactional writes moved off the primary PostgreSQL tables.",
    outcome:
      "Shipped to enterprise customers in November 2019, ahead of the post-holiday rush, automating lifecycle messages across hundreds of community centers.",
    metrics: [],
    stack: ["Ruby on Rails", "React", "Node.js", "PostgreSQL", "Redis", "Sidekiq", "Twilio", "AWS SES"],
    flow: ["Check-in events", "Rails rules", "Sidekiq + Redis queues", "Token-bucket limiter", "Twilio SMS / SES email"],
    image: {
      src: "/projects/member-engagement-automation.webp",
      width: 956,
      height: 528,
      alt: "Daxko Engage's playbook builder for automated member messages",
      caption:
        "Public screenshot of Daxko Engage's playbook builder, from a later version of the product than the 2019 work described here. Screenshot: Daxko.",
    },
  },
  {
    slug: "childcare-checkin-kiosk",
    company: "Daxko",
    track: "frontend",
    period: "Jun – Dec 2019",
    title: "Childcare & Family Security Check-In Kiosk",
    short: "Childcare Check-In",
    tagline: "A fast, secure check-in terminal for the busiest minutes of a YMCA's day.",
    focus:
      "Make the morning and evening childcare rush at community centers and YMCAs fast and safe: drop-off, allergy alerts and guardian verification in one terminal.",
    architecture:
      "A React single-page app, packaged in Electron for desktop installs or run in tablet browsers. It keeps a WebSocket open to local hardware and authentication servers, and Redux synchronizes scans, authorized-guardian photos and room capacities locally.",
    challenge:
      "Barcode scanners, signature pads and webcams streaming data locked up the single-threaded UI.",
    approach: "Hardware data streams moved into background Web Workers, keeping the interface loop responsive.",
    outcome:
      "Replaced aging legacy screens with one modern component system that looks and behaves the same across operating systems, rolled out to client branches in December 2019.",
    metrics: [],
    stack: ["React", "TypeScript", "Redux", "Sass", "WebSockets", "Electron", "Jest"],
    flow: ["Scanner / camera / pad", "Web Workers", "Redux state", "Kiosk UI", "Auth servers"],
  },
  {
    slug: "member-ledger-sync",
    company: "Daxko",
    track: "backend",
    period: "May – Oct 2019",
    title: "Multi-Tenant Data Normalization & Event Sync Service",
    short: "Member Ledger Sync",
    tagline: "One consolidated member ledger from the databases of several acquired platforms.",
    focus:
      "Give large fitness chains one view of rosters, payments and usage across all locations, after Daxko acquired several separate platforms.",
    architecture:
      "Change data capture: Debezium reads row-level changes from each acquired platform's database and streams them into Kafka, where Java/Spring Boot services normalize the payloads and update a central SQL Server reporting ledger.",
    challenge:
      "Unexpected schema changes in older local databases crashed consumers and stalled replication.",
    approach:
      "A central Avro Schema Registry in Kafka to enforce data contracts, with malformed payloads isolated in dead-letter queues.",
    outcome:
      "Real-time consolidated reporting across separate products, without a risky database migration.",
    metrics: [],
    stack: ["Java", "Spring Boot", "Apache Kafka", "Debezium", "Avro Schema Registry", "SQL Server", "Docker", "AWS ECS"],
    flow: ["Acquired platform DBs", "Debezium CDC", "Kafka + Avro registry", "Spring Boot normalizers", "SQL Server ledger"],
    loop: { from: 3, to: 2, label: "contract violations parked in dead-letter queues" },
  },
  {
    slug: "retention-propensity-scoring",
    company: "Daxko",
    track: "ai",
    period: "May – Nov 2019",
    title: "Member Retention & Propensity Scoring Pipeline",
    short: "Retention Scoring",
    tagline: "Flagging members likely to cancel, months before they ask.",
    focus:
      "Spot members likely to cancel well before they do, so operations teams can reach them with offers or personal-training check-ins.",
    architecture:
      "A weekly batch pipeline orchestrated by Airflow pulls anonymized check-ins, account ages, payment declines and facility distances from Redshift. Python builds the features, an ensemble of Random Forest and XGBoost classifiers on SageMaker scores each member, and the risk scores flow back into retention dashboards.",
    challenge:
      "Members who visit irregularly produced sparse data and many false positives in the baseline models.",
    approach:
      "Feature engineering that tracks how consistent a member's time-of-day and day-of-week check-ins are, rather than raw visit counts.",
    outcome:
      "Marketing teams had member-health dashboards in place before the post-holiday peak season.",
    metrics: [],
    stack: ["Python", "scikit-learn", "XGBoost", "Random Forest", "Pandas", "Amazon Redshift", "AWS SageMaker", "Apache Airflow"],
    flow: ["Redshift history", "Airflow weekly job", "Feature engineering", "RF + XGBoost on SageMaker", "Retention dashboards"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const companies: Company[] = ["Zapier", "Regions Bank", "Shipt", "Daxko"];

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
    body: "Kafka, change data capture and async workers absorb bursts and keep request handling separate from downstream work.",
    projects: ["reliable-event-routing", "enterprise-api-layer", "delivery-window-engine", "member-ledger-sync"],
  },
  {
    id: "outbox",
    title: "Reliable event publication",
    body: "Transactional outbox: the business change and its event commit in one local transaction, and consumers tolerate retries and duplicates.",
    projects: ["reliable-event-routing", "enterprise-api-layer"],
  },
  {
    id: "realtime",
    title: "Real-time state under load",
    body: "WebSockets, Redis and distributed locks keep live state correct when thousands of people act at the same moment.",
    projects: ["realtime-shopper-messaging", "delivery-window-engine", "copilot-workflow-builder"],
  },
  {
    id: "interfaces",
    title: "Data-heavy interfaces that stay smooth",
    body: "Canvas/SVG layers, Web Workers, virtualization and viewport culling take work off the main thread.",
    projects: ["visual-workflow-canvas", "financial-insights-components", "web-checkout-rearchitecture", "childcare-checkin-kiosk"],
  },
  {
    id: "ai",
    title: "Models are checked, not trusted",
    body: "Generated plans and model scores pass schema checks, confidence floors and explanations before they act or reach a person.",
    projects: ["autonomous-agent-orchestration", "copilot-workflow-builder", "fraud-decision-support"],
  },
  {
    id: "resilience",
    title: "Graceful under failure",
    body: "Fallback channels, rate limiters and dead-letter queues keep things working when networks, partners or schemas misbehave.",
    projects: ["realtime-shopper-messaging", "member-engagement-automation", "member-ledger-sync", "reliable-event-routing"],
  },
];
