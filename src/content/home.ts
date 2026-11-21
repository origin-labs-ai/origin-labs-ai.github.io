import type {
  Announcement,
  HeroCopy,
  LearnSlide,
  ReportCopy,
} from "@/types/content";

export const heroCopy: HeroCopy = {
  lead: "Origin is an independent AI research and product studio.",
  statement:
    "We build useful systems, study how they change the world, and share what we learn, because the future should not be a black box.",
};

export const reportCopy: ReportCopy = {
  title: "Clarity over black boxes",
  body: "We publish how our systems are built, evaluated, and deployed. Our constitution, safety policies, and research notes are open for anyone who wants to understand the technology shaping their lives.",
  ctaLabel: "Read our constitution",
  ctaHref: "/constitution",
};

export const learnSlides: LearnSlide[] = [
  {
    href: "/institute",
    topic: "Institute",
    topicHref: "/search?topic=institute",
    topicNoFollow: true,
    title: "The Origin Institute",
    summary:
      "Our effort to confront the most significant challenges that powerful AI will pose to our societies.",
    image: "/sites/anthropic/images/institute.jpg",
    width: 1712,
    height: 2139,
  },
  {
    href: "/constitution",
    topic: "Alignment",
    topicHref: "/research/team/alignment",
    title: "Constitution",
    summary:
      "A detailed description of the values and behavior we want every model to embody.",
    image: "/sites/anthropic/images/constitution.png",
    width: 642,
    height: 803,
  },
  {
    href: "/responsible-scaling-policy",
    topic: "Responsible Scaling Policy",
    topicHref: "/search?topic=responsible-scaling-policy",
    topicNoFollow: true,
    title: "Responsible scaling policy",
    summary:
      "Our voluntary framework for managing catastrophic risks from advanced AI systems.",
    image: "/sites/anthropic/images/rsp.jpg",
    width: 1712,
    height: 2139,
  },
  {
    href: "/news/policy",
    topic: "Policy",
    topicHref: "/news/policy",
    title: "AI safety, in the open",
    summary:
      "Why we believe safety research is critical, and how we approach it at Origin.",
    image: "/sites/anthropic/images/safety.jpg",
    width: 1712,
    height: 2139,
  },
];

export const announcements: Announcement[] = [
  {
    category: "Announcements",
    categoryHref: "/news/announcements",
    date: "Oct 7, 2026",
    title: "Introducing Haiku",
    href: "/models/haiku",
    description:
      "Our fastest, most capable small model. Built for high-volume work like summarization, subagents, and browser use.",
    rows: [
      { label: "Model Details", linkLabel: "Haiku", href: "/models/haiku" },
      { label: "System Card", linkLabel: "View", href: "/system-cards" },
    ],
  },
  {
    category: "Announcements",
    categoryHref: "/news/announcements",
    date: "Sep 28, 2026",
    title: "Introducing Sonnet",
    href: "/models/sonnet",
    description:
      "Our mid-range model, tuned for fast, capable intelligence in real-time agents and high-volume work.",
    rows: [
      { label: "Model Details", linkLabel: "Sonnet", href: "/models/sonnet" },
      { label: "System Card", linkLabel: "View", href: "/system-cards" },
    ],
  },
  {
    category: "Announcements",
    categoryHref: "/news/announcements",
    date: "Sep 22, 2026",
    title: "Introducing Opus",
    href: "/models/opus",
    description:
      "Our flagship model, built for serious coding, knowledge work, and long-running AI agents.",
    rows: [
      { label: "Model Details", linkLabel: "Opus", href: "/models/opus" },
      { label: "System Card", linkLabel: "View", href: "/system-cards" },
    ],
  },
];
