import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComingSoonPage } from "@/components/page/coming-soon-page";
import { eventPages, findEvent } from "@/content/events";

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
  const page = findEvent(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.desc,
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = findEvent(slug);
  if (!page) notFound();

  return (
    <ComingSoonPage
      label={page.label}
      note={{
        body: "This event page is being rebuilt. Event details and recordings will be published here soon.",
      }}
    />
  );
}
