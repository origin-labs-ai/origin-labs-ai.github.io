import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SearchExperience } from "@/components/search/search-experience";

export function SearchPage({ topic }: { topic?: string }) {
  return (
    <>
      <a href="#main-content" className="aB5J5q_root" data-skip-link="true">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">
        <SearchExperience topic={topic} />
      </main>
      <SiteFooter />
    </>
  );
}
