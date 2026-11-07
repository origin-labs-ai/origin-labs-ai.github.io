import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageRuntime } from "@/components/sites/anthropic/page-runtime";
import { PageVariants } from "@/components/sites/anthropic/page-variants";
import { SiteFooter } from "@/components/sites/anthropic/site-footer";
import { SiteHeader } from "@/components/sites/anthropic/site-header";
import pageIndex from "@/data/anthropic/page-index.json";

type PageIndexItem = {
  slug: string;
  title: string;
  desc: string;
  noHeader: boolean;
  customFooter: boolean;
  hideOnScroll: boolean;
  overlayHeader: boolean;
};

const pages = pageIndex as PageIndexItem[];

// The legacy design-system chunk is only referenced by this one source page.
// Loading it globally would override the newer fluid type scale everywhere.
const legacyStylesheets: Record<string, string> = {
  "features/project-deal": "/sites/anthropic/css/legacy-1fhuklhxgugg8.css",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug.split("/") }));
}

function findPage(slug: string[]) {
  const key = slug.join("/");
  return pages.find((page) => page.slug === key);
}

function readPage(slug: string[]) {
  const key = slug.join("/");
  const file = path.join(
    process.cwd(),
    "src/data/anthropic/pages",
    `${key.replace(/\//g, "__")}.json`,
  );

  return JSON.parse(fs.readFileSync(file, "utf8")) as {
    slug: string;
    title: string;
    desc: string;
    main: string;
  };
}

function readMobilePage(key: string) {
  const file = path.join(
    process.cwd(),
    "src/data/anthropic/pages-mobile",
    `${key.replace(/\//g, "__")}.json`,
  );
  if (!fs.existsSync(file)) return undefined;

  const data = JSON.parse(fs.readFileSync(file, "utf8")) as { main: string };
  return data.main;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.desc || undefined,
  };
}

export default async function ClonedPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();

  const data = readPage(slug);
  const mobileMain = readMobilePage(page.slug);
  const legacyStylesheet = legacyStylesheets[page.slug];

  return (
    <div className="cloned-page" data-slug={page.slug}>
      {legacyStylesheet ? (
        <link
          rel="stylesheet"
          href={legacyStylesheet}
          precedence="anthropic-legacy"
        />
      ) : null}

      <a href="#main-content" className="aB5J5q_root" data-skip-link="true">
        Skip to main content
      </a>

      {page.noHeader ? null : (
        <SiteHeader
          hideOnScroll={page.hideOnScroll}
          overlay={page.overlayHeader}
        />
      )}

      <main id="main-content">
        <PageVariants desktop={data.main} mobile={mobileMain} />
      </main>

      <PageRuntime slug={page.slug} />

      {page.customFooter ? null : <SiteFooter />}
    </div>
  );
}
