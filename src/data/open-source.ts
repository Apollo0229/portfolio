export type OpenSourceProject = {
  name: string;
  tagline: string;
  description: string;
  demo: string;
  source: string;
  highlights: string[];
  stack: string[];
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
  },
];
