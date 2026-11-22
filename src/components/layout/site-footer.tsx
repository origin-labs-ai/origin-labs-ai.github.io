"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { SiteHeader } from "@/components/layout/site-header";

import {
  ChevronDown,
  ExternalArrow,
  InstagramIcon,
  LinkedInIcon,
  LogoA,
  Wordmark,
  XIcon,
  YouTubeIcon,
} from "@/components/brand";
import { footerSections } from "@/content/navigation";
import { placeholderHref } from "@/lib/links";

const resolvedFooterSections = footerSections.map((section) => ({
  ...section,
  links: section.links.map((link) => ({
    ...link,
    href: placeholderHref(link.href),
  })),
}));

const socials = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@origin_labs_ai",
    Icon: YouTubeIcon,
  },
  {
    label: "X",
    href: "https://x.com/samxmaxx",
    Icon: XIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/satyam-thakur-9266b4434/",
    Icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/samxmaxx/?__pwa=1",
    Icon: InstagramIcon,
  },
];

function FooterLinkLabel({ label }: { label: string }) {
  return (
    <span className="dU5k9q_subsectionTitle">
      <span
        className="t8BUuq_container"
        style={{ overflowX: "hidden", "--fade-width": "8px" } as CSSProperties}
      >
        <span className="t8BUuq_content" style={{ transform: "none" }}>
          {label}
        </span>
      </span>
    </span>
  );
}

export function SiteFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Anthropic jaisa exact behavior (live site pe naapa): header logo KABHI
  // nahi hilta — sirf footer ka logo header ke paas aate hi fade hota hai.
  // Hysteresis threshold se flicker nahi hota.
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const footerLogo = footer.querySelector<HTMLElement>(".dU5k9q_logo");
      if (!footerLogo) return;
      const footerLogoY = footerLogo.getBoundingClientRect().top;
      const under = footer.hasAttribute("data-under-nav")
        ? footerLogoY < 260
        : footerLogoY < 220;
      if (under) {
        footer.setAttribute("data-under-nav", "");
      } else {
        footer.removeAttribute("data-under-nav");
      }
    };
    const onScroll = (event: Event) => {
      void event;
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <footer className="theme-slate dU5k9q_footer" ref={footerRef}>
      <span hidden />
      <div
        data-clip-path-nav="true"
        className="WXQxba_overlayNav theme-slate"
        aria-hidden="true"
      >
        {/* Footer ke top par header ki dark-theme replica — footer header ke
            neeche aane par yahi nav dikhta hai (search bar, X, hamburger,
            wordmark). INTERACTIVE hai: search input click/type/enter sab
            chalta hai, Anthropic ke bottom state jaisa. */}
        <div className="origin-header-mirror">
          <SiteHeader />
        </div>
      </div>
      <span aria-hidden="true" className="dU5k9q_underNavEdge" />

      <div className="dU5k9q_footerLayout">
        <div className="dU5k9q_logo">
          <Link aria-label="Origin home" href="/">
            <Wordmark className="dU5k9q_logoWordmark" />
            <LogoA className="dU5k9q_logoAbbreviated" />
          </Link>
        </div>

        <div className="dU5k9q_main">
          <div data-orientation="vertical" className="dU5k9q_sections">
            {resolvedFooterSections.map((section, index) => {
              const open = openSection === section.label;
              return (
                <div
                  key={section.label}
                  data-orientation="vertical"
                  data-index={index}
                  data-closed={open ? undefined : ""}
                  data-open={open ? "" : undefined}
                  className="dU5k9q_accordionItem"
                >
                  <h3
                    data-orientation="vertical"
                    data-index={index}
                    data-closed={open ? undefined : ""}
                    data-open={open ? "" : undefined}
                  >
                    <button
                      type="button"
                      tabIndex={0}
                      aria-expanded={open}
                      data-panel-open={open ? "" : undefined}
                      className="dU5k9q_trigger"
                      onClick={() =>
                        setOpenSection(open ? null : section.label)
                      }
                    >
                      <span className="dU5k9q_triggerText">
                        {section.label}
                      </span>
                      <div
                        className="dU5k9q_icon"
                        style={{
                          width: 20,
                          height: 20,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <ChevronDown />
                      </div>
                    </button>
                  </h3>

                  {open && section.links.length > 0 ? (
                    <div
                      role="region"
                      className="dU5k9q_panel"
                      style={
                        {
                          "--accordion-panel-height": "auto",
                        } as CSSProperties
                      }
                    >
                      <ul className="dU5k9q_subsections">
                        {section.links.map((link) => (
                          <li className="dU5k9q_subsection" key={link.label}>
                            {link.privacy ? (
                              <button
                                type="button"
                                className="lrYMKa_consentButton body-4 agate"
                              >
                                {link.label}
                              </button>
                            ) : (
                              <a
                                className="dU5k9q_subsectionLink"
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={
                                  link.external
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                <FooterLinkLabel label={link.label} />
                                {link.external ? (
                                  <ExternalArrow className="dU5k9q_subsectionLinkIcon" />
                                ) : null}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="dU5k9q_copySections">
          <section>
            <h3>Our mission</h3>
            <div className="dU5k9q_copySectionText">
              <p>
                Origin is an independent AI research and product studio. Our
                mission is to make advanced AI useful, understandable, and safe
                for the long term.
              </p>
            </div>
          </section>
          <section>
            <h3>Log in</h3>
            <div className="dU5k9q_copySectionText">
              <ul>
                <li>
                  <Link className="kJj2WW_link" href="/coming-soon">
                    Code
                  </Link>
                </li>
                <li>
                  <Link className="kJj2WW_link" href="/coming-soon">
                    Console
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="dU5k9q_sidebar">
          <div className="dU5k9q_sidebarDetails">
            <div>© 2026 Origin</div>
            <ul className="dU5k9q_socialIcons">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
