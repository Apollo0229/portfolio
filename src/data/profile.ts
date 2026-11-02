export const profile = {
  name: "Austin Creamer",
  nickname: "Apollo",
  title: "Senior Full-Stack Engineer",
  location: "Birmingham, AL · Open to remote",
  email: "apollo000229@gmail.com",
  github: "https://github.com/Apollo0229",
  githubHandle: "Apollo0229",
  yearsOfExperience: 7,
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  domain: string;
  stack: string[];
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Zapier",
    role: "Senior Full-Stack Engineer",
    period: "May 2024 – Jul 2026",
    location: "Remote, US",
    domain: "AI · Workflow automation SaaS",
    stack: ["Python", "Node.js", "React", "TypeScript", "Kafka", "Elasticsearch", "LLMs / RAG"],
    highlights: [
      "Built and maintained Python and Node.js services, API orchestration and data-processing workflows powering automation across 8,000+ app integrations.",
      "Tuned concurrency, retries and failure handling in high-volume background processing — ~25% higher event throughput and ~30% fewer peak-period API timeouts.",
      "Shipped customer-facing dashboards and workflow interfaces in React, TypeScript and Tailwind CSS that made complex automation easier to configure and debug.",
      "Built RAG-based, multi-step LLM workflows with validation and controlled execution steps for reliable AI-assisted automation.",
      "Traced production failures across frontend, backend and integration layers of distributed workflows, cutting recurring incidents.",
    ],
  },
  {
    company: "Regions Bank",
    role: "Senior Software Engineer / Full-Stack Team Lead",
    period: "Jul 2021 – Apr 2024",
    location: "Birmingham, AL",
    domain: "Fintech · Digital banking",
    stack: ["C#", "ASP.NET Core", "Angular", "React", "AWS", "Docker", "Kubernetes", "Harness"],
    highlights: [
      "Led full-stack development of high-volume digital banking applications in C#, ASP.NET Core, Angular and React.",
      "Built REST and SOAP APIs connecting frontends to banking services, relational databases and external systems with strict security and data-integrity requirements.",
      "Containerized services with Docker and Kubernetes on AWS and automated releases through Harness CI/CD — release cycles ~30% shorter.",
      "Closed application and API security findings through input validation, access-control hardening, dependency updates and database fixes.",
    ],
  },
  {
    company: "Shipt",
    role: "Full Stack Engineer",
    period: "Jan 2020 – Jun 2021",
    location: "Birmingham, AL",
    domain: "E-commerce · Same-day marketplace",
    stack: ["Node.js", "TypeScript", "WebSockets", "React", "Ruby on Rails", "Go", "PostgreSQL"],
    highlights: [
      "Developed full-stack features for a same-day retail marketplace used by millions of customers and shoppers.",
      "Refactored the real-time customer-to-shopper messaging system (Node.js, TypeScript, WebSockets) — ~25% fewer connection failures at peak traffic.",
      "Built reusable React components for customer and shopper workflows.",
      "Extended Ruby on Rails and Go microservices on PostgreSQL and AWS for order and communication workflows.",
    ],
  },
  {
    company: "Daxko",
    role: "Software Engineer",
    period: "May 2019 – Dec 2019",
    location: "Birmingham, AL",
    domain: "Enterprise SaaS · Membership & operations",
    stack: ["Java", "Spring Boot", "React", "SQL"],
    highlights: [
      "Built full-stack features for membership and operations software used by fitness and wellness organizations.",
      "Improved Spring Boot APIs and transaction-processing workflows — ~20% fewer transaction-related defects in affected modules.",
      "Delivered React UI enhancements, backend fixes and database updates with product stakeholders.",
    ],
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
