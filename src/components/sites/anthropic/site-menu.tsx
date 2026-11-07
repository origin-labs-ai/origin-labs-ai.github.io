"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRightIcon,
  ChevronDown,
  CloseIcon,
  LinkedInIcon,
  LogoA,
  XIcon,
  YouTubeIcon,
} from "./brand";
import { NavDropdown } from "./nav-dropdown";
import {
  headerMenus,
  menuFeatured,
  menuMainPanels,
  menuMoreGroups,
  type MenuPanel,
} from "./nav-data";

const mainItems = ["Research", "Policy", "Commitments", "Company"];

function MenuGroup({ panel, className }: { panel: MenuPanel; className?: string }) {
  return (
    <div className={`bBp9FW_root${className ? ` ${className}` : ""}`}>
      <div
        className="bBp9FW_columns"
        style={{ "--menu-group-columns": panel.columnsCount } as CSSProperties}
      >
        {panel.columns.map((column, columnIndex) => (
          <div className="bBp9FW_column" key={`column-${columnIndex}`}>
            {column.heading ? (
              <span className="tOQyXa_caption-1 bBp9FW_heading" data-component="Caption">
                {column.heading}
              </span>
            ) : null}
            <ul className={`bBp9FW_links${column.flowInTwo ? " bBp9FW_flowsInTwo" : ""}`}>
              {column.links.map((link) => (
                <li className="bBp9FW_item" key={`${link.href}-${link.label}`}>
                  <a
                    className="bBp9FW_link"
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    <span className="tOQyXa_caption-1" data-component="Caption">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SiteMenu({ onClose }: { onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [openMain, setOpenMain] = useState<string | null>(null);
  const [openMore, setOpenMore] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const tryClaudeMenu = headerMenus.find((menu) => menu.label === "Try Claude");
  const totalFeatured = menuFeatured.length;

  return (
    <div role="dialog" tabIndex={-1} data-open="" className="A1YAyq_popup theme-slate">
      <h2 className="A1YAyq_title">Menu</h2>

      <div className="A1YAyq_bar">
        <Link aria-label="Anthropic" className="A1YAyq_logo" href="/">
          <LogoA />
        </Link>
        <button
          ref={closeButtonRef}
          type="button"
          tabIndex={0}
          aria-label="Close menu"
          data-component="Button"
          data-variant="tertiary"
          className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-small f9ZZrG_icon-format-icon-only"
          onClick={onClose}
        >
          <span className="f9ZZrG_icon">
            <CloseIcon />
          </span>
        </button>
      </div>

      <div role="presentation" className="A1YAyq_scrollArea">
        <div
          role="presentation"
          tabIndex={0}
          className="A1YAyq_viewport base-ui-disable-scrollbar"
        >
          <div role="presentation" className="A1YAyq_content">
            <div className="OU0HOa_root OU0HOa_withFeatured">
              <nav aria-label="Menu" className="OU0HOa_nav">
                <div data-orientation="vertical" className="OU0HOa_main">
                  <Link className="OU0HOa_mainLink" data-active="true" href="/">
                    <span className="OU0HOa_mainLabel">Home</span>
                  </Link>
                  <Link className="OU0HOa_mainLink" href="/news">
                    <span className="OU0HOa_mainLabel">News</span>
                  </Link>

                  {mainItems.map((label, index) => {
                    const panel = menuMainPanels[label];
                    const open = openMain === label;
                    return (
                      <div
                        key={label}
                        data-orientation="vertical"
                        data-index={index}
                        data-open={open ? "" : undefined}
                        data-closed={open ? undefined : ""}
                      >
                        <h3
                          data-orientation="vertical"
                          data-index={index}
                          className="OU0HOa_header"
                          data-open={open ? "" : undefined}
                          data-closed={open ? undefined : ""}
                        >
                          <button
                            type="button"
                            tabIndex={0}
                            aria-disabled="false"
                            aria-expanded={open}
                            data-panel-open={open ? "" : undefined}
                            className="OU0HOa_mainTrigger"
                            onClick={() => setOpenMain(open ? null : label)}
                          >
                            <span className="OU0HOa_mainLabel">{label}</span>
                            <div className="OU0HOa_mainCaret">
                              <ChevronDown />
                            </div>
                          </button>
                        </h3>
                        {open && panel ? (
                          <div
                            role="region"
                            data-orientation="vertical"
                            data-index={index}
                            data-open=""
                            className="OU0HOa_panel"
                            style={{ "--accordion-panel-height": "auto" } as CSSProperties}
                          >
                            <MenuGroup panel={panel} className="OU0HOa_mainGroup" />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                <section
                  aria-label="Featured"
                  data-kind="articles"
                  className="HhA2_a_root OU0HOa_featured"
                >
                  <div className="HhA2_a_viewport">
                    <div
                      className="HhA2_a_track menu-featured-track"
                      style={{ "--menu-featured-index": featuredIndex } as CSSProperties}
                    >
                      {menuFeatured.map((slide, index) => (
                        <div
                          className={`HhA2_a_slide${
                            index === menuFeatured.length - 1 ? " menu-featured-last" : ""
                          }`}
                          key={slide.href}
                          style={
                            {
                              "--menu-featured-span": slide.span ?? 3,
                            } as CSSProperties
                          }
                        >
                          <a className="HhA2_a_card" href={slide.href}>
                            <span className="tOQyXa_caption-1 HhA2_a_meta" data-component="Caption">
                              {slide.meta.map((part) => (
                                <span className="HhA2_a_metaPart" key={part}>
                                  {part}
                                </span>
                              ))}
                            </span>
                            <span className="HhA2_a_picture">
                              <img
                                className="HhA2_a_image"
                                alt=""
                                loading="lazy"
                                draggable={false}
                                src={slide.image}
                                width={slide.width}
                                height={slide.height}
                              />
                            </span>
                            <span
                              className="tOQyXa_headline-6 HhA2_a_title"
                              data-component="Headline"
                            >
                              {slide.title}
                            </span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="HhA2_a_controls">
                    <div
                      role="group"
                      className="n4MhcW_carousel-controls"
                      aria-label="Carousel controls"
                    >
                      <button
                        aria-label="Previous article"
                        data-component="Button"
                        data-variant="tertiary"
                        className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-small f9ZZrG_icon-format-icon-only"
                        onClick={() => setFeaturedIndex((value) => Math.max(0, value - 1))}
                      >
                        <span className="f9ZZrG_icon">
                          <ArrowRightIcon className="rotate-180" />
                        </span>
                      </button>
                      <div className="n4MhcW_carousel-controls-pagination" aria-live="polite">
                        <div className="n4MhcW_carousel-count">
                          {String(featuredIndex + 1).padStart(2, "0")}
                        </div>
                        <div>/</div>
                        <div className="n4MhcW_carousel-count">
                          {String(totalFeatured).padStart(2, "0")}
                        </div>
                      </div>
                      <button
                        aria-label="Next article"
                        data-component="Button"
                        data-variant="tertiary"
                        className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-small f9ZZrG_icon-format-icon-only"
                        onClick={() =>
                          setFeaturedIndex((value) => Math.min(totalFeatured - 1, value + 1))
                        }
                      >
                        <span className="f9ZZrG_icon">
                          <ArrowRightIcon />
                        </span>
                      </button>
                    </div>
                  </div>
                </section>

                <div className="OU0HOa_end">
                  <div data-orientation="vertical" className="OU0HOa_more">
                    {menuMoreGroups.map((group, index) => {
                      const open = openMore === group.label;
                      return (
                        <div
                          key={group.label}
                          data-orientation="vertical"
                          data-index={index}
                          data-open={open ? "" : undefined}
                          data-closed={open ? undefined : ""}
                          className="OU0HOa_moreGroup"
                        >
                          <h3
                            data-orientation="vertical"
                            data-index={index}
                            className="OU0HOa_header"
                            data-open={open ? "" : undefined}
                            data-closed={open ? undefined : ""}
                          >
                            <button
                              type="button"
                              tabIndex={0}
                              aria-disabled="false"
                              aria-expanded={open}
                              data-panel-open={open ? "" : undefined}
                              className="OU0HOa_moreTrigger"
                              onClick={() => setOpenMore(open ? null : group.label)}
                            >
                              <span
                                className="tOQyXa_caption-1 OU0HOa_moreLabel"
                                data-component="Caption"
                              >
                                {group.label}
                              </span>
                              <div className="OU0HOa_moreCaret">
                                <ChevronDown />
                              </div>
                            </button>
                          </h3>
                          {open ? (
                            <div
                              role="region"
                              data-orientation="vertical"
                              data-index={index}
                              data-open=""
                              className="OU0HOa_panel"
                              style={{ "--accordion-panel-height": "auto" } as CSSProperties}
                            >
                              <div className="OU0HOa_moreContent">
                                <MenuGroup panel={group} />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>

                  <div className="OU0HOa_footer">
                    <div className="OU0HOa_ctas">
                      {tryClaudeMenu ? (
                        <NavDropdown
                          menu={tryClaudeMenu}
                          corner="small"
                          direction="up"
                          className="menu-cta-dropdown"
                          popupClassName="OU0HOa_ctaPopup"
                        />
                      ) : null}
                      <a
                        data-component="AnchorButton"
                        data-variant="tertiary"
                        className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-small f9ZZrG_icon-format-trailing"
                        target="_blank"
                        rel="noopener"
                        href="https://claude.com/contact-sales"
                      >
                        Contact Sales
                        <span className="f9ZZrG_icon">
                          <ArrowRightIcon />
                        </span>
                      </a>
                      <a
                        data-component="AnchorButton"
                        data-variant="tertiary"
                        className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-small"
                        target="_blank"
                        rel="noopener"
                        href="https://claude.com/download"
                      >
                        Download app
                      </a>
                    </div>
                    <ul className="OU0HOa_socials">
                      <li>
                        <a
                          href="https://www.youtube.com/@anthropic-ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Link to Anthropic's youtube account"
                        >
                          <YouTubeIcon />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://x.com/AnthropicAI"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Link to Anthropic's x account"
                        >
                          <XIcon />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/company/anthropicresearch"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Link to Anthropic's linkedin account"
                        >
                          <LinkedInIcon />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
