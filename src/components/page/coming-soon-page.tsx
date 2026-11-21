import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ComingSoon } from "@/components/page/coming-soon";
import type { ComingSoonNote } from "@/types/content";

type ComingSoonPageProps = {
  label: string;
  note: ComingSoonNote;
};

export function ComingSoonPage({ label, note }: ComingSoonPageProps) {
  return (
    <>
      <a href="#main-content" className="aB5J5q_root" data-skip-link="true">
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content">
        <ComingSoon label={label} note={note} />
      </main>

      <SiteFooter />
    </>
  );
}
