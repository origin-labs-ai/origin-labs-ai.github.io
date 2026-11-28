import { Suspense } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SearchExperience } from "@/components/search/search-experience";

export function SearchPage() {
  return (
    <>
      <a href="#main-content" className="aB5J5q_root" data-skip-link="true">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">
        {/* useSearchParams ko Suspense chahiye (static export prerender ke
            liye bhi) — query params client-side parse hote hain. */}
        <Suspense fallback={null}>
          <SearchExperience />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
