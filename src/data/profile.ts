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
      { value: "91%", label: "zero-shot workflow generation" },
      { value: "−90%", label: "Kafka connections" },
      { value: "320ms", label: "audit search (from 4.8s)" },
    ],
    highlights: [
      "Built the natural-language → workflow engine behind Zapier Copilot.",
      "Scaled the Kafka and Celery pipeline that carries webhook and polling bursts.",
      "Shipped fast audit search and a 60 FPS workflow canvas in React.",
    ],
    stack: ["Python", "Django", "React", "TypeScript", "Kafka", "Elasticsearch", "LLMs / RAG"],
  },
  {
    company: "Regions Bank",
    role: "Senior Software Engineer / Full-Stack Team Lead",
    period: "Jul 2021 – Apr 2024",
    location: "Birmingham, AL",
    domain: "Fintech · Digital banking",
    accent: "#4d8a1f",
    summary: "Led full-stack delivery on core banking, treasury and customer-support platforms.",
    metrics: [
      { value: "−40%", label: "mainframe dependency" },
      { value: "+48%", label: "treasury client satisfaction" },
      { value: "+55%", label: "automated support resolution" },
    ],
    highlights: [
      "Moved core ledger workloads off the mainframe onto event-driven services.",
      "Built a streaming search portal for institutional treasury clients.",
      "Added policy-checked LLM answers to digital support, with zero privacy exposures.",
    ],
    stack: ["C#", ".NET Core", "React", "Python", "Kafka", "Elasticsearch", "AWS"],
  },
  {
    company: "Shipt",
    role: "Full-Stack Engineer",
    period: "Jan 2020 – Jun 2021",
    location: "Birmingham, AL",
    domain: "E-commerce · Same-day delivery",
    accent: "#0f9d76",
    summary: "Real-time fulfillment, merchant tools and delivery operations for a same-day marketplace.",
    metrics: [
      { value: "2.5M", label: "active orders supported" },
      { value: "10×", label: "lower broker load" },
      { value: "60 FPS", label: "on 1,500+ catalog nodes" },
    ],
    highlights: [
      "Built real-time routing that matches shoppers to live delivery queues.",
      "Took the merchant catalog workspace from 15 to 60 FPS.",
      "Cut delivery-audit queries from seconds to about 320 ms.",
    ],
    stack: ["Python", "FastAPI", "Django", "React", "TypeScript", "Redis", "Kafka"],
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
      "Hardened Spring Boot APIs and transaction-processing workflows.",
      "Shipped React features and database fixes with product teams.",
    ],
    stack: ["Java", "Spring Boot", "React", "SQL"],
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
