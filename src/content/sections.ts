import manifest from "@/content/pages/manifest.json";
import type { ComingSoonNote, PageRecord } from "@/types/content";

export const sectionPages = manifest as PageRecord[];

const pagesBySlug = new Map(sectionPages.map((page) => [page.slug, page]));

export function findSectionPage(slug: string[] | string): PageRecord | undefined {
  const key = Array.isArray(slug) ? slug.join("/") : slug;
  return pagesBySlug.get(key);
}

const pressContact = {
  label: "press@origin.com",
  href: "mailto:press@origin.com",
};

export function comingSoonNote(page: PageRecord): ComingSoonNote {
  if (page.slug === "news" || page.slug.startsWith("news/")) {
    return {
      body:
        page.slug === "news"
          ? "The newsroom is being rebuilt from the ground up. Announcements, research notes, and press resources will land here first."
          : "This news section is being rebuilt. New stories will be published here as the newsroom comes together.",
      contact: pressContact,
    };
  }

  if (page.slug.startsWith("models/")) {
    return {
      body: `Detailed model pages are being rebuilt. ${page.label} specifications, evaluations, and system cards will be published here soon.`,
    };
  }

  switch (page.slug) {
    case "coming-soon":
      return {
        body: "The link you followed points to something Origin is still building. It will open here as soon as it is ready.",
      };
    case "search":
      return {
        body: "Search is being rebuilt. Full-text search across Origin's research, models, and news will be available here soon.",
      };
    case "constitution":
      return {
        body: "The Origin Constitution is being prepared for publication. The full document will be published here when it is ready.",
      };
    case "careers":
      return {
        body: "We are rebuilding our careers page. Open roles, team information, and how we hire will be published here soon.",
      };
    case "origin-corps":
      return {
        body: "Origin Corps is being rebuilt. Fellowship and host program details, including how to apply, will be published here soon.",
      };
    case "institute":
      return {
        body: "The Origin Institute is being rebuilt. Research programs, publications, and ways to get involved will be published here soon.",
      };
    case "legal":
      return {
        body: "The legal center is being rebuilt. Terms, policies, and compliance resources will be published here soon.",
      };
    case "system-cards":
      return {
        body: "Model system cards are being rebuilt. Evaluations, safety documentation, and launch notes will be published here soon.",
      };
    default:
      return {
        body: `This section is being rebuilt. New material from Origin's research and product teams will be published here soon.`,
      };
  }
}
