import type { EventPage } from "@/types/content";

const separator = " \\ Origin";

function event(slug: string, label: string): EventPage {
  return {
    slug,
    label,
    title: `${label}${separator}`,
    desc: `${label} is being rebuilt. Event details and recordings will be published soon.`,
  };
}

export const eventPages: EventPage[] = [
  event("aws-summit-dc", "AWS Summit DC"),
  event("aws-summit-london", "AWS Summit London"),
  event("aws-summit-nyc", "AWS Summit NYC"),
  event("aws-summit-tokyo", "AWS Summit Tokyo"),
  event("ai-for-finance", "AI for Financial Services"),
  event("google-cloud-next-2025", "Google Cloud Next 2025"),
  event("paris-builder-summit", "Paris Builder Summit"),
  event("seoul-builder-summit", "Seoul Builder Summit"),
];

export function findEvent(slug: string): EventPage | undefined {
  return eventPages.find((page) => page.slug === slug);
}
