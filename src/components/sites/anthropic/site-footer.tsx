"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";

import {
  ChevronDown,
  ExternalArrow,
  LinkedInIcon,
  LogoA,
  Wordmark,
  XIcon,
  YouTubeIcon,
} from "./brand";
import { footerSections } from "./nav-data";

const socials = [
  {
    label: "Link to Anthropic's youtube account",
    href: "https://www.youtube.com/@anthropic-ai",
    Icon: YouTubeIcon,
  },
  {
    label: "Link to Anthropic's x account",
    href: "https://x.com/AnthropicAI",
    Icon: XIcon,
  },
  {
    label: "Link to Anthropic's linkedin account",
    href: "https://www.linkedin.com/company/anthropicresearch",
    Icon: LinkedInIcon,
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

  return (
    <footer className="theme-slate dU5k9q_footer">
      <span hidden />
      <div
        data-clip-path-nav="true"
        className="WXQxba_overlayNav theme-slate"
        aria-hidden="true"
      />
      <span aria-hidden="true" className="dU5k9q_underNavEdge" />

      <div className="dU5k9q_footerLayout">
        <div className="dU5k9q_logo">
          <Link aria-label="Anthropic home" href="/">
            <Wordmark className="dU5k9q_logoWordmark" />
            <LogoA className="dU5k9q_logoAbbreviated" />
          </Link>
        </div>

        <div className="dU5k9q_main">
          <div data-orientation="vertical" className="dU5k9q_sections">
            {footerSections.map((section, index) => {
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
                Anthropic is a Public Benefit Corporation. Our mission is the
                responsible development and maintenance of advanced AI for the
                long-term benefit of humanity.
              </p>
            </div>
          </section>
          <section>
            <h3>Log in</h3>
            <div className="dU5k9q_copySectionText">
              <ul>
                <li>
                  <a
                    href="https://claude.ai/"
                    className="kJj2WW_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Claude.ai
                    <ExternalArrow className="kJj2WW_linkIcon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://platform.claude.com/"
                    className="kJj2WW_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Claude console
                    <ExternalArrow className="kJj2WW_linkIcon" />
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="dU5k9q_sidebar">
          <div className="dU5k9q_sidebarDetails">
            <div>© 2026 Anthropic PBC</div>
            <ul className="dU5k9q_socialIcons">
              {socials.map(({ label, href, Icon }) => (
                <li key={href}>
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
