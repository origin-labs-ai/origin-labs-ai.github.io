import type {
  DropdownMenu,
  FeaturedSlide,
  FooterLink,
  MenuPanel,
} from "@/types/content";

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
          { label: "The Origin Institute", href: "/institute" },
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
          { label: "Constitution", href: "/constitution" },
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
          { label: "Origin Corps", href: "/origin-corps" },
          { label: "Economic Futures", href: "/economic-futures" },
        ],
      },
    ],
  },
  {
    label: "Try Origin",
    columnsCount: 1,
    columns: [
      {
        links: [
          { label: "Origin", href: "https://claude.ai/", external: true },
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
          { label: "The Origin Institute", href: "/institute" },
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
          { label: "Constitution", href: "/constitution" },
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
          { label: "Origin Corps", href: "/origin-corps" },
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
          { label: "Origin", href: "https://claude.com/product/overview", external: true },
          { label: "Origin Code", href: "https://claude.com/product/claude-code", external: true },
          { label: "Origin Code Enterprise", href: "https://claude.com/product/claude-code/enterprise", external: true },
          { label: "Origin Cowork", href: "https://claude.com/product/cowork", external: true },
          { label: "@Origin", href: "https://claude.com/product/tag", external: true },
          { label: "Origin Design", href: "https://claude.com/product/design", external: true },
          { label: "Origin Duet", href: "https://claude.com/product/claude-duet", external: true },
          { label: "Origin Science", href: "https://claude.com/product/claude-science", external: true },
          { label: "Origin Security", href: "https://claude.com/product/claude-security", external: true },
          { label: "Origin for Chrome", href: "https://claude.com/claude-for-chrome", external: true },
          { label: "Origin for Microsoft 365", href: "https://claude.com/claude-for-microsoft-365", external: true },
          { label: "Skills", href: "https://www.claude.com/skills", external: true },
          { label: "Pricing", href: "https://claude.com/pricing#api", external: true },
          { label: "Origin Platform", href: "https://claude.com/platform/api", external: true },
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
          { label: "Mythos", href: "/models/mythos" },
          { label: "Fable", href: "/models/fable" },
          { label: "Opus", href: "/models/opus" },
          { label: "Sonnet", href: "/models/sonnet" },
          { label: "Haiku", href: "/models/haiku" },
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
      { label: "Constitution", href: "/constitution" },
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
      { label: "News", href: "/news" },
      { label: "Careers", href: "/careers" },
      { label: "Policy", href: "/policy" },
      { label: "Economic Futures", href: "/economic-futures" },
      { label: "Constitution", href: "/constitution" },
      { label: "Policy on the AI Exponential", href: "/policy-on-the-ai-exponential" },
      { label: "Responsible Scaling Policy", href: "/responsible-scaling-policy" },
      { label: "Security and compliance", href: "https://trust.anthropic.com/", external: true },
      { label: "Transparency", href: "/transparency" },
    ],
  },
  {
    label: "Products",
    links: [
      { label: "Origin", href: "https://claude.com/product/overview", external: true },
      { label: "Origin Code", href: "https://claude.com/product/claude-code", external: true },
      { label: "Origin Code Enterprise", href: "https://claude.com/product/claude-code/enterprise", external: true },
      { label: "Origin Cowork", href: "https://claude.com/product/cowork", external: true },
      { label: "@Origin", href: "https://claude.com/product/tag", external: true },
      { label: "Origin Design", href: "https://claude.com/product/design", external: true },
      { label: "Origin Duet", href: "https://claude.com/product/claude-duet", external: true },
      { label: "Origin Science", href: "https://claude.com/product/claude-science", external: true },
      { label: "Origin Security", href: "https://claude.com/product/claude-security", external: true },
      { label: "Origin for Chrome", href: "https://claude.com/claude-for-chrome", external: true },
      { label: "Origin for Microsoft 365", href: "https://claude.com/claude-for-microsoft-365", external: true },
      { label: "Skills", href: "https://claude.com/skills", external: true },
      { label: "Pricing", href: "https://claude.com/pricing", external: true },
      { label: "Origin Platform", href: "https://claude.com/platform/api", external: true },
    ],
  },
  {
    label: "Models",
    links: [
      { label: "Mythos", href: "/models/mythos" },
      { label: "Fable", href: "/models/fable" },
      { label: "Opus", href: "/models/opus" },
      { label: "Sonnet", href: "/models/sonnet" },
      { label: "Haiku", href: "/models/haiku" },
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

export const menuFeatured: FeaturedSlide[] = [
  {
    href: "/research/researchers-use-origin",
    meta: ["Nov 5, 2026"],
    title: "AI for scientific discovery: How researchers use Origin",
    image: "/sites/anthropic/images/menu-nov5.jpg",
    width: 1280,
    height: 1280,
  },
  {
    href: "/research/investigating-vault-particles",
    meta: ["Nov 4, 2026"],
    title: "Investigating vault particles with Origin",
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
    title: "Expanding our partnership with GSA to bring Origin to all levels of government",
    image: "/sites/anthropic/images/menu-gsa.jpg",
    width: 2000,
    height: 1125,
    span: 6,
  },
];
