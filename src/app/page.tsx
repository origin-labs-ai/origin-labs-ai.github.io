import { Announcements } from "@/components/sites/anthropic/announcements";
import { Hero } from "@/components/sites/anthropic/hero";
import { LearnMore } from "@/components/sites/anthropic/learn-more";
import { PublicBenefitReport } from "@/components/sites/anthropic/report";
import { SiteFooter } from "@/components/sites/anthropic/site-footer";
import { SiteHeader } from "@/components/sites/anthropic/site-header";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="aB5J5q_root" data-skip-link="true">
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content">
        <article data-page-top-spacer="condensed">
          <Hero />
          <PublicBenefitReport />
          <Announcements />
          <LearnMore />
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
