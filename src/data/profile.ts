import type { Metric } from "./projects";

export const profile = {
  name: "Austin Creamer",
  nickname: "Apollo",
  title: "Senior Full-Stack Engineer",
  location: "Birmingham, AL · Open to remote",
  email: "apollo000229@gmail.com",
  github: "https://github.com/Apollo0229",
  githubHandle: "Apollo0229",
  linkedin: "https://www.linkedin.com/in/austin-creamer-8b2483260",
  yearsOfExperience: 7,
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  domain: string;
  /** Brand-ish accent for the company mark. */
  accent: string;
  /** One line on what the job was about. */
  summary: string;
  metrics: Metric[];
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Zapier",
    role: "Senior Full-Stack Engineer",
    period: "May 2024 – Jul 2026",
    location: "Remote, US",
    domain: "AI · Workflow automation SaaS",
    accent: "#ff4f00",
    summary: "Full-stack and AI work on the automation platform behind 8,000+ app integrations.",
    metrics: [
      { value: "99.999%", label: "webhook tracking reliability" },
      { value: "−50%", label: "integration setup time" },
      { value: "60 FPS", label: "on 150-step workflows" },
    ],
    highlights: [
      "Built the Copilot natural-language workflow builder, from Next.js canvas to Django AI service.",
      "Moved task delivery onto a transactional-outbox event engine handling 40,000+ tasks per second.",
      "Shipped a 60 FPS infinite workflow canvas and self-correcting multi-agent automation.",
    ],
    stack: ["Python", "Django", "Go", "Kafka", "React", "Next.js", "TypeScript", "LangGraph"],
  },
  {
    company: "Regions Bank",
    role: "Senior Software Engineer / Full-Stack Team Lead",
    period: "Jul 2021 – Apr 2024",
    location: "Birmingham, AL",
    domain: "Fintech · Digital banking",
    accent: "#4d8a1f",
    summary: "Led full-stack delivery on digital banking, enterprise APIs and fraud decision support.",
    metrics: [
      { value: "−40%", label: "page-load time" },
      { value: "<150ms", label: "insight dashboard rendering" },
      { value: "Months → days", label: "partner API onboarding" },
    ],
    highlights: [
      "Moved the public web platform to Next.js micro-frontends over .NET Core services and Sitecore.",
      "Built an event-driven enterprise API layer between legacy cores and modern platforms.",
      "Delivered explainable fraud scoring and a shared component library for financial insights.",
    ],
    stack: ["C#", ".NET Core", "Java", "React", "Next.js", "Kafka", "Python", "Azure"],
  },
  {
    company: "Shipt",
    role: "Full-Stack Engineer",
    period: "Jan 2020 – Jun 2021",
    location: "Birmingham, AL",
    domain: "E-commerce · Same-day delivery",
    accent: "#0f9d76",
    summary: "Real-time messaging, delivery capacity and order batching for a same-day marketplace.",
    metrics: [
      { value: "15,000+/s", label: "delivery-slot API operations" },
      { value: "<200ms", label: "shopper–customer chat latency" },
      { value: "+18%", label: "in-store picking efficiency" },
    ],
    highlights: [
      "Built real-time shopper–customer messaging with an SMS fallback for in-store dead zones.",
      "Kept delivery windows available through record pandemic traffic with Redis-locked slots.",
      "Rebuilt the web store on Next.js and fed ML estimates into a C++ order-batching solver.",
    ],
    stack: ["Go", "Python", "Node.js", "React", "React Native", "Next.js", "Redis", "Kafka"],
  },
  {
    company: "Daxko",
    role: "Software Engineer",
    period: "May 2019 – Dec 2019",
    location: "Birmingham, AL",
    domain: "Enterprise SaaS · Membership software",
    accent: "#2563eb",
    summary: "Membership and operations software for fitness and wellness organizations.",
    metrics: [{ value: "−20%", label: "transaction defects" }],
    highlights: [
      "Built automated SMS and email member re-engagement on Rails, Sidekiq and Twilio.",
      "Shipped a React and Electron childcare check-in kiosk for YMCA branches.",
      "Consolidated acquired platforms' member data with Debezium, Kafka and Spring Boot.",
    ],
    stack: ["Java", "Spring Boot", "Ruby on Rails", "React", "Kafka", "Python"],
  },
];

export type SkillGroup = {
  id: "frontend" | "backend" | "ai" | "cloud" | "data" | "languages";
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Angular", "Redux", "Tailwind CSS", "HTML5 Canvas / SVG", "Web Workers", "Accessibility (WCAG)"],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    items: ["Node.js", "Python", "FastAPI", "Django", "ASP.NET Core", "Spring Boot", "Ruby on Rails", "Go", "REST / SOAP", "Microservices"],
  },
  {
    id: "ai",
    label: "AI & LLM",
    items: ["LLM orchestration", "RAG pipelines", "Multi-agent validation", "Prompt engineering", "Semantic search", "Vector databases"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Harness", "OpenShift", "NGINX", "Linux"],
  },
  {
    id: "data",
    label: "Data & Messaging",
    items: ["PostgreSQL", "SQL Server", "Redis", "Elasticsearch", "Kafka", "Celery", "IBM MQ", "S3"],
  },
  {
    id: "languages",
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "C#", "Java", "Ruby", "Go"],
  },
];

export const marqueeTech = [
  "React", "TypeScript", "Next.js", "Python", "Node.js", "C# / .NET", "Kafka", "PostgreSQL",
  "Elasticsearch", "AWS", "Kubernetes", "Docker", "Redis", "LLMs", "RAG", "Vector DBs",
  "Django", "FastAPI", "Spring Boot", "Go", "WebSockets", "Tailwind CSS",
];

export const certifications = [
  { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2024" },
  { name: "AI Developer Professional Certificate", issuer: "DeepLearning.AI", year: "2025" },
];

export const education = {
  school: "Samford University",
  degree: "B.S. in Computer Science",
  period: "2015 – 2019",
};
