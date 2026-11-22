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

export type FooterLink = NavLink & { privacy?: boolean };

export type FeaturedSlide = {
  href: string;
  meta: string[];
  title: string;
  image: string;
  width: number;
  height: number;
  span?: number;
};

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

export type Announcement = {
  category: string;
  categoryHref: string;
  date: string;
  title: string;
  href: string;
  description: string;
  rows: Array<{ label: string; linkLabel: string; href: string }>;
};

export type HeroCopy = {
  lead: string;
  statement: string;
};

export type ReportCopy = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type PageRecord = {
  slug: string;
  label: string;
  title: string;
  desc: string;
};

export type EventPage = {
  slug: string;
  label: string;
  title: string;
  desc: string;
};

export type ComingSoonNote = {
  body: string;
  contact?: {
    label: string;
    href: string;
  };
};

export type SearchTopic = {
  slug: string;
  label: string;
  description: string;
};

export type SearchArticle = {
  topic: string;
  date: string;
  title: string;
  excerpt: string;
};
