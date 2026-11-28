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
}: {
  params: Promise<{ slug: string[] }>;
  // searchParams INTENTIONALLY await nahi karte — static export (GitHub
  // Pages) ke liye page fully static rehta hai; search query client-side
  // SearchExperience khud parse karta hai (useSearchParams).
}) {
  const { slug } = await params;
  const page = findSectionPage(slug);
  if (!page) notFound();

  if (slug[0] === "search" && slug.length === 1) {
    return <SearchPage />;
  }

  return <ComingSoonPage label={page.label} note={comingSoonNote(page)} />;
}
