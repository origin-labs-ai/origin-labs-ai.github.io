import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComingSoonPage } from "@/components/page/coming-soon-page";
import { SearchPage } from "@/components/search/search-page";
import {
  comingSoonNote,
  findSectionPage,
  sectionPages,
} from "@/content/sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return sectionPages.map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findSectionPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.desc,
  };
}

export default async function SectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const page = findSectionPage(slug);
  if (!page) notFound();

  if (slug[0] === "search" && slug.length === 1) {
    const sp = await searchParams;
    const topic = typeof sp.topic === "string" ? sp.topic : undefined;
    return <SearchPage topic={topic} />;
  }

  return <ComingSoonPage label={page.label} note={comingSoonNote(page)} />;
}
