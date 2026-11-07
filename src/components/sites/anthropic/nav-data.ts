export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavColumn = {
  heading?: string;
  flowInTwo?: boolean;
  links: NavLink[];
};

export type DropdownMenu = {
  label: string;
  columns: NavColumn[];
  columnsCount: number;
  align?: "left" | "right";
};

export type MenuPanel = {
  columns: NavColumn[];
  columnsCount: number;
};

export const headerMenus: DropdownMenu[] = [
  {
    label: "Research",
    columnsCount: 2,
    columns: [
      {
        links: [
          { label: "Overview", href: "/research" },
          { label: "Alignment", href: "/research/team/alignment" },
          { label: "Interpretability", href: "/research/team/interpretability" },
          { label: "Engineering", href: "/engineering" },
          { label: "Science", href: "/science" },
        ],
      },
      {
        links: [
          { label: "The Anthropic Institute", href: "/institute" },
          { label: "Economics", href: "/research/team/economics" },
          { label: "Frontier Red Team", href: "/research/team/frontier-red-team" },
          { label: "Societal Impacts", href: "/research/team/societal-impacts" },
        ],
      },
    ],
  },
  {
    label: "Policy",
    columnsCount: 1,
    columns: [
      {
        links: [
          { label: "Overview", href: "/policy" },
          { label: "Policy on the AI Exponential", href: "/policy-on-the-ai-exponential" },
        ],
      },
    ],
  },
  {
    label: "Commitments",
    columnsCount: 2,
    columns: [
      {
        links: [
          { label: "Claude’s Constitution", href: "/constitution" },
          { label: "Beneficial Deployments", href: "/beneficial-deployments" },
          { label: "Responsible Scaling Policy", href: "/responsible-scaling-policy" },
          { label: "Frontier Safety Roadmap", href: "/responsible-scaling-policy/roadmap" },
        ],
      },
      {
        links: [
          { label: "Transparency", href: "/transparency" },
          { label: "Threat Intelligence", href: "/threat-intelligence" },
        ],
      },
    ],
  },
  {
    label: "Company",
    columnsCount: 3,
    align: "right",
    columns: [
      {
        heading: "Who we are",
        links: [
          { label: "About us", href: "/company" },
          { label: "Leadership", href: "/company/leadership" },
          { label: "Public benefit report", href: "/public-benefit-report" },
          {
            label: "Customers",
            href: "https://claude.com/customers",
            external: true,
          },
        ],
      },
      {
        heading: "Join us",
        links: [
          { label: "Careers", href: "/careers" },
          { label: "Events", href: "/events" },
        ],
      },
      {
        heading: "Programs",
        links: [
          { label: "Claude Corps", href: "/claude-corps" },
          { label: "Economic Futures", href: "/economic-futures" },
        ],
      },
    ],
  },
  {
    label: "Try Claude",
    columnsCount: 1,
    columns: [
      {
        links: [
          { label: "Claude AI", href: "https://claude.ai/", external: true },
          { label: "Console", href: "https://platform.claude.com/login?returnTo=%2F%3F", external: true },
        ],
      },
    ],
  },
];

export const menuMainPanels: Record<string, MenuPanel> = {
  Research: {
    columnsCount: 2,
    columns: [
      {
        links: [
          { label: "Overview", href: "/research" },
          { label: "Alignment", href: "/research/team/alignment" },
          { label: "Interpretability", href: "/research/team/interpretability" },
          { label: "Engineering", href: "/engineering" },
          { label: "Science", href: "/science" },
        ],
      },
      {
        links: [
          { label: "The Anthropic Institute", href: "/institute" },
          { label: "Economics", href: "/research/team/economics" },
          { label: "Frontier Red Team", href: "/research/team/frontier-red-team" },
          { label: "Societal Impacts", href: "/research/team/societal-impacts" },
        ],
      },
    ],
  },
  Policy: {
    columnsCount: 1,
    columns: [
      {
        links: [
          { label: "Overview", href: "/policy" },
          { label: "Policy on the AI Exponential", href: "/policy-on-the-ai-exponential" },
        ],
      },
    ],
  },
  Commitments: {
    columnsCount: 2,
    columns: [
      {
        links: [
          { label: "Claude’s Constitution", href: "/constitution" },
          { label: "Beneficial Deployments", href: "/beneficial-deployments" },
          { label: "Responsible Scaling Policy", href: "/responsible-scaling-policy" },
          { label: "Frontier Safety Roadmap", href: "/responsible-scaling-policy/roadmap" },
        ],
      },
      {
        links: [
          { label: "Transparency", href: "/transparency" },
          { label: "Threat Intelligence", href: "/threat-intelligence" },
        ],
      },
    ],
  },
  Company: {
    columnsCount: 3,
    columns: [
      {
        heading: "Who we are",
        links: [
          { label: "About us", href: "/company" },
          { label: "Leadership", href: "/company/leadership" },
          { label: "Public benefit report", href: "/public-benefit-report" },
          { label: "Customers", href: "https://claude.com/customers", external: true },
        ],
      },
      {
        heading: "Join us",
        links: [
          { label: "Careers", href: "/careers" },
          { label: "Events", href: "/events" },
        ],
      },
      {
        heading: "Programs",
        links: [
          { label: "Claude Corps", href: "/claude-corps" },
          { label: "Economic Futures", href: "/economic-futures" },
        ],
      },
    ],
  },
};

export const menuMoreGroups: Array<{ label: string } & MenuPanel> = [
  {
    label: "Products",
    columnsCount: 1,
    columns: [
      {
        flowInTwo: true,
        links: [
          { label: "Claude", href: "https://claude.com/product/overview", external: true },
          { label: "Claude Code", href: "https://claude.com/product/claude-code", external: true },
          { label: "Claude Code Enterprise", href: "https://claude.com/product/claude-code/enterprise", external: true },
          { label: "Claude Cowork", href: "https://claude.com/product/cowork", external: true },
          { label: "@Claude", href: "https://claude.com/product/tag", external: true },
          { label: "Claude Design", href: "https://claude.com/product/design", external: true },
          { label: "Claude Duet", href: "https://claude.com/product/claude-duet", external: true },
          { label: "Claude Science", href: "https://claude.com/product/claude-science", external: true },
          { label: "Claude Security", href: "https://claude.com/product/claude-security", external: true },
          { label: "Claude for Chrome", href: "https://claude.com/claude-for-chrome", external: true },
          { label: "Claude for Microsoft 365", href: "https://claude.com/claude-for-microsoft-365", external: true },
          { label: "Skills", href: "https://www.claude.com/skills", external: true },
          { label: "Pricing", href: "https://claude.com/pricing#api", external: true },
          { label: "Claude Platform", href: "https://claude.com/platform/api", external: true },
        ],
      },
    ],
  },
  {
    label: "Models",
    columnsCount: 1,
    columns: [
      {
        links: [
          { label: "Mythos", href: "/claude/mythos" },
          { label: "Fable", href: "/claude/fable" },
          { label: "Opus", href: "/claude/opus" },
          { label: "Sonnet", href: "/claude/sonnet" },
          { label: "Haiku", href: "/claude/haiku" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    columnsCount: 1,
    columns: [
      {
        flowInTwo: true,
        links: [
          { label: "AI agents", href: "https://claude.com/solutions/agents", external: true },
          { label: "Code modernization", href: "https://claude.com/solutions/code-modernization", external: true },
          { label: "Coding", href: "https://claude.com/solutions/coding", external: true },
          { label: "Customer support", href: "https://claude.com/solutions/customer-support", external: true },
          { label: "Cybersecurity", href: "https://claude.com/solutions/cybersecurity", external: true },
          { label: "Enterprise", href: "https://claude.com/solutions/enterprise", external: true },
          { label: "Financial advisors", href: "https://claude.com/solutions/financial-advisors", external: true },
          { label: "Financial services", href: "https://claude.com/solutions/financial-services", external: true },
          { label: "Government", href: "https://claude.com/solutions/government", external: true },
          { label: "Healthcare", href: "https://claude.com/solutions/healthcare", external: true },
          { label: "Higher education", href: "https://claude.com/solutions/education", external: true },
          { label: "K-12 teachers", href: "https://claude.com/solutions/teachers", external: true },
          { label: "Legal", href: "https://claude.com/solutions/legal", external: true },
          { label: "Life sciences", href: "https://claude.com/solutions/life-sciences", external: true },
          { label: "Nonprofits", href: "https://claude.com/solutions/nonprofits", external: true },
          { label: "Sales", href: "https://claude.com/solutions/sales", external: true },
          { label: "Small business", href: "https://claude.com/solutions/small-business", external: true },
        ],
      },
    ],
  },
  {
    label: "Help and security",
    columnsCount: 2,
    columns: [
      {
        links: [
          { label: "Availability", href: "/legal/supported-regions" },
          { label: "Check files", href: "https://claude.com/check-files", external: true },
          { label: "Regional compliance", href: "https://claude.com/regional-compliance", external: true },
          { label: "Report abuse", href: "https://claude.com/form/anthropic-content-reporting", external: true },
        ],
      },
      {
        links: [
          { label: "Security and compliance", href: "https://trust.anthropic.com/", external: true },
          { label: "Status", href: "https://status.anthropic.com/", external: true },
          { label: "Support center", href: "https://support.claude.com/en/", external: true },
        ],
      },
    ],
  },
  {
    label: "Terms and policies",
    columnsCount: 2,
    columns: [
      {
        links: [
          { label: "Privacy policy", href: "/legal/privacy" },
          { label: "Responsible disclosure policy", href: "/responsible-disclosure-policy" },
          { label: "Terms of service: Consumer", href: "/legal/consumer-terms" },
          { label: "Terms of service: Commercial", href: "/legal/commercial-terms" },
        ],
      },
      {
        links: [
          { label: "Legal center", href: "/legal" },
          { label: "Consumer health data privacy policy", href: "/legal/consumer-health-data-privacy-policy" },
          { label: "Usage policy", href: "/legal/aup" },
          { label: "Terms of service: US K-12", href: "/legal/k12-terms" },
        ],
      },
    ],
  },
];

export type FooterLink = NavLink & { privacy?: boolean };

export const footerSections: Array<{ label: string; links: FooterLink[] }> = [
  { label: "Research", links: [] },
  {
    label: "Policy",
    links: [
      { label: "Overview", href: "/policy" },
      { label: "Policy on the AI Exponential", href: "/policy-on-the-ai-exponential" },
    ],
  },
  {
    label: "Commitments",
    links: [
      { label: "Claude’s Constitution", href: "/constitution" },
      { label: "Beneficial Deployments", href: "/beneficial-deployments" },
      { label: "Responsible Scaling Policy", href: "/responsible-scaling-policy" },
      { label: "Frontier Safety Roadmap", href: "/responsible-scaling-policy/roadmap" },
      { label: "Transparency", href: "/transparency" },
      { label: "Threat Intelligence", href: "/threat-intelligence" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About us", href: "/company" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Public benefit report", href: "/public-benefit-report" },
      { label: "News", href: "/news" },
      { label: "Careers", href: "/careers" },
      { label: "Policy", href: "/policy" },
      { label: "Economic Futures", href: "/economic-futures" },
      { label: "Claude's Constitution", href: "/constitution" },
      { label: "Policy on the AI Exponential", href: "/policy-on-the-ai-exponential" },
      { label: "Responsible Scaling Policy", href: "/responsible-scaling-policy" },
      { label: "Security and compliance", href: "https://trust.anthropic.com/", external: true },
      { label: "Transparency", href: "/transparency" },
    ],
  },
  {
    label: "Products",
    links: [
      { label: "Claude", href: "https://claude.com/product/overview", external: true },
      { label: "Claude Code", href: "https://claude.com/product/claude-code", external: true },
      { label: "Claude Code Enterprise", href: "https://claude.com/product/claude-code/enterprise", external: true },
      { label: "Claude Cowork", href: "https://claude.com/product/cowork", external: true },
      { label: "@Claude", href: "https://claude.com/product/tag", external: true },
      { label: "Claude Design", href: "https://claude.com/product/design", external: true },
      { label: "Claude Duet", href: "https://claude.com/product/claude-duet", external: true },
      { label: "Claude Science", href: "https://claude.com/product/claude-science", external: true },
      { label: "Claude Security", href: "https://claude.com/product/claude-security", external: true },
      { label: "Claude for Chrome", href: "https://claude.com/claude-for-chrome", external: true },
      { label: "Claude for Microsoft 365", href: "https://claude.com/claude-for-microsoft-365", external: true },
      { label: "Skills", href: "https://claude.com/skills", external: true },
      { label: "Pricing", href: "https://claude.com/pricing", external: true },
      { label: "Claude Platform", href: "https://claude.com/platform/api", external: true },
    ],
  },
  {
    label: "Models",
    links: [
      { label: "Mythos", href: "/claude/mythos" },
      { label: "Fable", href: "/claude/fable" },
      { label: "Opus", href: "/claude/opus" },
      { label: "Sonnet", href: "/claude/sonnet" },
      { label: "Haiku", href: "/claude/haiku" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { label: "AI agents", href: "https://claude.com/solutions/agents", external: true },
      { label: "Code modernization", href: "https://claude.com/solutions/code-modernization", external: true },
      { label: "Coding", href: "https://claude.com/solutions/coding", external: true },
      { label: "Customer support", href: "https://claude.com/solutions/customer-support", external: true },
      { label: "Cybersecurity", href: "https://claude.com/solutions/cybersecurity", external: true },
      { label: "Enterprise", href: "https://claude.com/solutions/enterprise", external: true },
      { label: "Financial advisors", href: "https://claude.com/solutions/financial-advisors", external: true },
      { label: "Financial services", href: "https://claude.com/solutions/financial-services", external: true },
      { label: "Government", href: "https://claude.com/solutions/government", external: true },
      { label: "Healthcare", href: "https://claude.com/solutions/healthcare", external: true },
      { label: "Higher education", href: "https://claude.com/solutions/education", external: true },
      { label: "K-12 teachers", href: "https://claude.com/solutions/teachers", external: true },
      { label: "Legal", href: "https://claude.com/solutions/legal", external: true },
      { label: "Life sciences", href: "https://claude.com/solutions/life-sciences", external: true },
      { label: "Managed Agents", href: "https://claude.com/platform/claude-managed-agents", external: true },
      { label: "Nonprofits", href: "https://claude.com/solutions/nonprofits", external: true },
      { label: "Small business", href: "https://claude.com/solutions/small-business", external: true },
    ],
  },
  {
    label: "Help and security",
    links: [
      { label: "Availability", href: "/legal/supported-regions" },
      { label: "Check files", href: "https://claude.com/check-files", external: true },
      { label: "Regional compliance", href: "https://claude.com/regional-compliance", external: true },
      { label: "Report abuse", href: "https://claude.com/form/anthropic-content-reporting", external: true },
      { label: "Status", href: "https://status.claude.com/", external: true },
      { label: "Support center", href: "https://support.claude.com/en/", external: true },
      { label: "Security and compliance", href: "https://trust.anthropic.com/", external: true },
    ],
  },
  {
    label: "Terms and policies",
    links: [
      { label: "Privacy choices", href: "#", privacy: true },
      { label: "Legal center", href: "/legal" },
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Responsible disclosure policy", href: "/responsible-disclosure-policy" },
      { label: "Terms of service: Commercial", href: "/legal/commercial-terms" },
      { label: "Terms of service: Consumer", href: "/legal/consumer-terms" },
      { label: "Terms of service: US K-12", href: "/legal/k12-terms" },
      { label: "Consumer health data privacy policy", href: "/legal/consumer-health-data-privacy-policy" },
      { label: "Usage policy", href: "/legal/aup" },
    ],
  },
];

export type FeaturedSlide = {
  href: string;
  meta: string[];
  title: string;
  image: string;
  width: number;
  height: number;
  span?: number;
};

export const menuFeatured: FeaturedSlide[] = [
  {
    href: "/research/how-researchers-use-claude",
    meta: ["Nov 5, 2026"],
    title: "AI for scientific discovery: How researchers use Claude",
    image: "/sites/anthropic/images/menu-nov5.jpg",
    width: 1280,
    height: 1280,
  },
  {
    href: "/research/investigating-vault-particles-with-claude",
    meta: ["Nov 4, 2026"],
    title: "Investigating vault particles with Claude",
    image: "/sites/anthropic/images/menu-nov4.jpg",
    width: 1280,
    height: 1280,
  },
  {
    href: "/news/ai-for-science-expands-foundations-research-institutions",
    meta: ["Announcements", "Oct 28, 2026"],
    title: "AI for Science expands to foundations and research institutions",
    image: "/sites/anthropic/images/menu-oct28.jpg",
    width: 1280,
    height: 1280,
  },
  {
    href: "/research/agents-judgment-calls",
    meta: ["Oct 27, 2026"],
    title: "How AI agents shape experts’ judgment calls",
    image: "/sites/anthropic/images/menu-oct27.jpg",
    width: 1280,
    height: 1280,
  },
  {
    href: "/news/expanding-partnership-gsa",
    meta: ["Partnerships", "Oct 27, 2026"],
    title: "Expanding our partnership with GSA to bring Claude to all levels of government",
    image: "/sites/anthropic/images/menu-gsa.jpg",
    width: 2000,
    height: 1125,
    span: 6,
  },
];

export type LearnSlide = {
  href: string;
  topic: string;
  topicHref: string;
  topicNoFollow?: boolean;
  title: string;
  summary: string;
  image: string;
  width: number;
  height: number;
};

export const learnSlides: LearnSlide[] = [
  {
    href: "/institute",
    topic: "Institute",
    topicHref: "/search?topic=institute",
    topicNoFollow: true,
    title: "The Anthropic Institute",
    summary: "Our effort to confront the most significant challenges that powerful AI will pose to our societies.",
    image: "/sites/anthropic/images/institute.jpg",
    width: 1712,
    height: 2139,
  },
  {
    href: "/constitution",
    topic: "Alignment",
    topicHref: "/research/team/alignment",
    title: "Claude's Constitution",
    summary: "A detailed description of our vision for Claude’s values and behavior.",
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
    summary: "Our voluntary framework for managing catastrophic risks from advanced AI systems.",
    image: "/sites/anthropic/images/rsp.jpg",
    width: 1712,
    height: 2139,
  },
  {
    href: "/news/core-views-on-ai-safety",
    topic: "Policy",
    topicHref: "/news/policy",
    title: "Core views on AI safety",
    summary: "Why we believe AI safety research is critical, and how we approach it at Anthropic.",
    image: "/sites/anthropic/images/safety.jpg",
    width: 1712,
    height: 2139,
  },
];

export type Announcement = {
  category: string;
  categoryHref: string;
  date: string;
  title: string;
  href: string;
  description: string;
  rows: Array<{ label: string; linkLabel: string; href: string }>;
};

export const announcements: Announcement[] = [
  {
    category: "Announcements",
    categoryHref: "/news/announcements",
    date: "Oct 7, 2026",
    title: "Introducing Claude Haiku 5.5",
    href: "/claude-haiku-5-5",
    description:
      "Claude Haiku 5.5 is our fastest, most capable small model. Built for high-volume work like summarization, subagents, and browser use.",
    rows: [
      { label: "Model Details", linkLabel: "Haiku", href: "/claude/haiku" },
      { label: "System Card", linkLabel: "View", href: "/document/claude-haiku-5-5-system-card" },
    ],
  },
  {
    category: "Announcements",
    categoryHref: "/news/announcements",
    date: "Sep 28, 2026",
    title: "Introducing Claude Sonnet 5.5",
    href: "/claude-sonnet-5-5",
    description:
      "Claude Sonnet 5.5 is a clear upgrade over Claude Sonnet 5, runs 30%+ faster, and costs up to 30% less for most work.",
    rows: [
      { label: "Model Details", linkLabel: "Sonnet", href: "/claude/sonnet" },
      { label: "System Card", linkLabel: "View", href: "/document/claude-sonnet-5-5-system-card" },
    ],
  },
  {
    category: "Announcements",
    categoryHref: "/news/announcements",
    date: "Sep 22, 2026",
    title: "Introducing Claude Opus 5.5",
    href: "/claude-opus-5-5",
    description:
      "Claude Opus 5.5 leads in agentic coding and knowledge work, and costs 40% less to run than Opus 5 on typical workloads.",
    rows: [
      { label: "Model Details", linkLabel: "Opus", href: "/claude/opus" },
      { label: "System Card", linkLabel: "View", href: "/document/claude-opus-5-5-system-card" },
    ],
  },
];
