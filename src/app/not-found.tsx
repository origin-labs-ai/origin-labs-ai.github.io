import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <>
      <a href="#main-content" className="aB5J5q_root" data-skip-link="true">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">
        <section className="origin-404">
          <div className="origin-404-inner">
            <h1 className="origin-404-title">Page not found</h1>
            <p className="origin-404-body">
              The page you are looking for does not exist or has been moved.
              The link may be old, mistyped, or still on its way.
            </p>
            <Link className="origin-404-button" href="/">
              Back to home
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

