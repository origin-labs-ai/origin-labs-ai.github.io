"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRightIcon,
  ChevronDown,
  CloseIcon,
  InstagramIcon,
  LinkedInIcon,
  LogoA,
  XIcon,
  YouTubeIcon,
} from "@/components/brand";
import {
  headerMenus,
  menuMainPanels,
  menuMoreGroups,
} from "@/content/navigation";
import { resolveMenu, resolvePanel } from "@/lib/links";
import type { MenuPanel } from "@/types/content";
import { NavDropdown } from "./nav-dropdown";

const resolvedMainPanels: Record<string, MenuPanel> = {};
for (const [label, panel] of Object.entries(menuMainPanels)) {
  resolvedMainPanels[label] = resolvePanel(panel);
}

const resolvedMoreGroups = menuMoreGroups.map((group) => ({
  ...group,
  ...resolvePanel(group),
}));

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

  const tryOriginMenuRaw = headerMenus.find((menu) => menu.label === "Try Code");
  const tryOriginMenu = tryOriginMenuRaw
    ? resolveMenu(tryOriginMenuRaw)
    : undefined;

  return (
    <div role="dialog" tabIndex={-1} data-open="" className="A1YAyq_popup theme-slate">
      <h2 className="A1YAyq_title">Menu</h2>

      <div className="A1YAyq_bar">
        <Link aria-label="Origin" className="A1YAyq_logo" href="/">
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
            {/* withFeatured class sirf nav ko right-column position par rakhti
                hai (captured inset-start calc) — featured section poora hata
                diya hai, ye sirf layout position ke liye hai. */}
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
                    const panel = resolvedMainPanels[label];
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

                <div className="OU0HOa_end">
                  <div data-orientation="vertical" className="OU0HOa_more">
                    {resolvedMoreGroups.map((group, index) => {
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
                      {tryOriginMenu ? (
                        <NavDropdown
                          menu={tryOriginMenu}
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
                        href="https://~.ai"
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
                        href="https://~.ai"
                      >
                        Download app
                      </a>
                    </div>
                    <ul className="OU0HOa_socials">
                      <li>
                        <a
                          href="https://www.youtube.com/@origin_labs_ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="YouTube"
                        >
                          <YouTubeIcon />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://x.com/samxmaxx"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="X"
                        >
                          <XIcon />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/in/satyam-thakur-9266b4434/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <LinkedInIcon />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/samxmaxx/?__pwa=1"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                        >
                          <InstagramIcon />
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
