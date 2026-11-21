import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComingSoonPage } from "@/components/page/coming-soon-page";
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
}) {
  const { slug } = await params;
  const page = findSectionPage(slug);
  if (!page) notFound();

  return <ComingSoonPage label={page.label} note={comingSoonNote(page)} />;
}
