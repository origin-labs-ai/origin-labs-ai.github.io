/* Tiny-more popup ke related pages — Anthropic ke connection-map popup ka
   data. Har card ke liye 5 related pages: kuchh real (/search topics) baaki
   /coming-soon (user rule: kai pages ek hi destination par redirect). */

export interface RelatedPage {
  category: string;
  date: string;
  title: string;
  href: string;
}

export interface RelatedPagesData {
  summary: string;
  items: RelatedPage[];
}

const defaultItems: RelatedPage[] = [
  { category: "Research", date: "Oct 16, 2026", title: "Scaling behaviors in production systems", href: "/coming-soon" },
  { category: "Research", date: "Oct 9, 2026", title: "Measuring what matters in production", href: "/coming-soon" },
  { category: "Alignment", date: "Sep 30, 2026", title: "Teaching models to ask before they act", href: "/search?topic=alignment" },
  { category: "Safeguards", date: "Sep 18, 2026", title: "Auditing agentic workflows at scale", href: "/search?topic=safeguards" },
  { category: "Announcements", date: "Sep 5, 2026", title: "Opening our evaluation suite to the public", href: "/coming-soon" },
];

export const relatedPages: Record<string, RelatedPagesData> = {
  "Introducing Haiku": {
    summary: "Built for high-volume work at low latency.",
    items: [
      { category: "Announcements", date: "Oct 7, 2026", title: "Introducing Haiku in the API", href: "/coming-soon" },
      { category: "Research", date: "Sep 30, 2026", title: "Distillation at production scale", href: "/search?topic=interpretability" },
      { category: "Announcements", date: "Sep 28, 2026", title: "Introducing Sonnet", href: "/coming-soon" },
      { category: "Safeguards", date: "Sep 18, 2026", title: "Evaluating small models under pressure", href: "/search?topic=safeguards" },
      { category: "Research", date: "Sep 5, 2026", title: "Latency budgets for interactive agents", href: "/coming-soon" },
    ],
  },
  "Introducing Sonnet": {
    summary: "The new models set a new bar in coding.",
    items: [
      { category: "Announcements", date: "Sep 28, 2026", title: "Introducing Sonnet in the API", href: "/coming-soon" },
      { category: "Research", date: "Sep 22, 2026", title: "Real-time agents in production", href: "/search?topic=cybersecurity" },
      { category: "Announcements", date: "Oct 7, 2026", title: "Introducing Haiku", href: "/coming-soon" },
      { category: "Research", date: "Sep 12, 2026", title: "Coding benchmarks that reflect real work", href: "/coming-soon" },
      { category: "Announcements", date: "Sep 22, 2026", title: "Introducing Opus", href: "/coming-soon" },
    ],
  },
  "Introducing Opus": {
    summary: "Our flagship model for the hardest work.",
    items: [
      { category: "Announcements", date: "Sep 22, 2026", title: "Introducing Opus in the API", href: "/coming-soon" },
      { category: "Research", date: "Sep 15, 2026", title: "Long-running agents that hold context", href: "/search?topic=life-sciences" },
      { category: "Alignment", date: "Sep 9, 2026", title: "Structured honesty in frontier models", href: "/search?topic=alignment" },
      { category: "Announcements", date: "Sep 28, 2026", title: "Introducing Sonnet", href: "/coming-soon" },
      { category: "Policy", date: "Sep 2, 2026", title: "Auditing frontier deployments", href: "/coming-soon" },
    ],
  },
  "The Origin Institute": {
    summary: "The hardest questions powerful AI raises.",
    items: [
      { category: "Institute", date: "Oct 2, 2026", title: "Institute fellowships open for 2027", href: "/coming-soon" },
      { category: "Institute", date: "Sep 24, 2026", title: "Studying AI's impact on institutions", href: "/search?topic=institute" },
      { category: "Policy", date: "Sep 11, 2026", title: "What societies owe each other in transition", href: "/coming-soon" },
      { category: "Institute", date: "Aug 29, 2026", title: "Economic scenarios we plan for", href: "/coming-soon" },
      { category: "Policy", date: "Aug 15, 2026", title: "Governing frontier capability jumps", href: "/search?topic=transparency" },
    ],
  },
  "Constitution": {
    summary: "The values every Origin model must embody.",
    items: [
      { category: "Alignment", date: "Oct 12, 2026", title: "Constitution updates, explained", href: "/coming-soon" },
      { category: "Alignment", date: "Oct 3, 2026", title: "How we revise the constitution", href: "/coming-soon" },
      { category: "Alignment", date: "Sep 26, 2026", title: "Reading the constitution end to end", href: "/search?topic=alignment" },
      { category: "Alignment", date: "Sep 14, 2026", title: "Where constitutions meet policy", href: "/coming-soon" },
      { category: "Alignment", date: "Sep 1, 2026", title: "Public feedback on model values", href: "/coming-soon" },
    ],
  },
  "Responsible scaling policy": {
    summary: "Our framework for managing frontier risks.",
    items: [
      { category: "Policy", date: "Oct 9, 2026", title: "Responsible scaling policy, version 3", href: "/coming-soon" },
      { category: "Policy", date: "Sep 27, 2026", title: "Capability thresholds, defined", href: "/search?topic=safeguards" },
      { category: "Policy", date: "Sep 19, 2026", title: "Inside a red-team evaluation", href: "/coming-soon" },
      { category: "Policy", date: "Sep 8, 2026", title: "Security standards for frontier labs", href: "/coming-soon" },
      { category: "Policy", date: "Aug 25, 2026", title: "Why we publish our safeguards", href: "/coming-soon" },
    ],
  },
  "AI safety, in the open": {
    summary: "Why we share our safety research openly.",
    items: [
      { category: "Policy", date: "Oct 14, 2026", title: "Publishing what we learn", href: "/coming-soon" },
      { category: "Policy", date: "Oct 2, 2026", title: "Open evaluations beat closed ones", href: "/coming-soon" },
      { category: "Alignment", date: "Sep 21, 2026", title: "Safety cases in public review", href: "/search?topic=alignment" },
      { category: "Policy", date: "Sep 10, 2026", title: "External audits, on the record", href: "/coming-soon" },
      { category: "Policy", date: "Aug 30, 2026", title: "The case for openness at the frontier", href: "/coming-soon" },
    ],
  },
};

export const relatedPagesFor = (title: string): RelatedPagesData =>
  relatedPages[title] ?? {
    summary: "More from Origin research and policy.",
    items: defaultItems,
  };
