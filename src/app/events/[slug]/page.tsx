import type { Metadata } from "next";
import { notFound } from "next/navigation";

const eventPages = [
  { slug: "aws-summit-dc", title: "AWS Summit DC \\ Anthropic" },
  { slug: "aws-summit-london", title: "AWS Summit London \\ Anthropic" },
  { slug: "aws-summit-nyc", title: "AWS Summit NYC \\ Anthropic" },
  { slug: "aws-summit-tokyo", title: "AWS Summit Tokyo \\ Anthropic" },
  {
    slug: "claude-for-finance",
    title: "Claude for Financial Services \\ Anthropic",
  },
  { slug: "google-cloud-next-2025", title: "Google Cloud Next 2025 \\ Anthropic" },
  { slug: "paris-builder-summit", title: "Paris Builder Summit \\ Anthropic" },
  { slug: "seoul-builder-summit", title: "Seoul Builder Summit \\ Anthropic" },
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return eventPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = eventPages.find((item) => item.slug === slug);
  if (!page) return {};
  return { title: page.title };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = eventPages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <iframe
      src={`/sites/anthropic/webflow/events__${page.slug}.html`}
      title={page.title}
      className="webflow-frame"
    />
  );
}
