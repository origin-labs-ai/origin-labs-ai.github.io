import { Announcements } from "@/components/home/announcements";
import { Hero } from "@/components/home/hero";
import { LearnMore } from "@/components/home/learn-more";
import { HomeReport } from "@/components/home/report";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

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
          <HomeReport />
          <Announcements />
          <LearnMore />
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
