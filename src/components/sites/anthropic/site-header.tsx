"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CloseIcon,
  LogoA,
  MenuIcon,
  SearchCloseIcon,
  SearchIcon,
  Wordmark,
} from "./brand";
import { NavDropdown } from "./nav-dropdown";
import { headerMenus } from "./nav-data";
import { SiteMenu } from "./site-menu";

const researchMenu = headerMenus.find((menu) => menu.label === "Research");
const policyMenu = headerMenus.find((menu) => menu.label === "Policy");
const commitmentsMenu = headerMenus.find((menu) => menu.label === "Commitments");
const companyMenu = headerMenus.find((menu) => menu.label === "Company");
const tryClaudeMenu = headerMenus.find((menu) => menu.label === "Try Claude");

export function SiteHeader({
  hideOnScroll = false,
  overlay = false,
}: {
  hideOnScroll?: boolean;
  overlay?: boolean;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState(true);
  const lastScrollY = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hideOnScroll) {
      lastScrollY.current = window.scrollY;
      const onScroll = () => {
        const y = window.scrollY;
        const previous = lastScrollY.current;
        if (y < previous - 2 && y > 0) setRevealed(true);
        else if (y > previous + 2) setRevealed(false);
        lastScrollY.current = y;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideOnScroll]);

  useEffect(() => {
    if (!searchOpen) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!searchRootRef.current?.contains(event.target as Node)) setSearchOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header
        className="UTJ3Tq_root"
        data-site-nav="true"
        data-focus-mode="false"
        data-hidden={hideOnScroll && !revealed ? "true" : "false"}
        data-scrolled={scrolled ? "true" : undefined}
        data-article={hideOnScroll ? "true" : undefined}
        data-revealed={hideOnScroll && revealed ? "true" : undefined}
        data-overlay={overlay ? "true" : undefined}
      >
        <nav className="UTJ3Tq_bar" aria-label="Main">
          <div className="UTJ3Tq_start">
            <div>
              <div className="_7u0keW_root">
                <Link
                  data-component="AnchorButton"
                  data-variant="tertiary"
                  className="f9ZZrG_button f9ZZrG_corner-full f9ZZrG_variant-tertiary f9ZZrG_size-small"
                  href="/news"
                >
                  News
                </Link>
                {researchMenu ? <NavDropdown menu={researchMenu} /> : null}
                {policyMenu ? <NavDropdown menu={policyMenu} /> : null}
                {commitmentsMenu ? <NavDropdown menu={commitmentsMenu} /> : null}
              </div>
            </div>
          </div>

          <div className="UTJ3Tq_logo">
            <Link aria-label="Anthropic" href="/">
              <div className="ZrbDXq_logo-wrapper">
                <div className="ZrbDXq_logo-lottie">
                  <Wordmark
                    style={{ width: 169.4, height: 19.02, top: 2.49, left: 0.3 }}
                  />
                </div>
              </div>
              <LogoA />
            </Link>
          </div>

          <div className="UTJ3Tq_end">
            <div className="vk8Wka_root">
              <div className="vk8Wka_swap">
                <div
                  ref={searchRootRef}
                  className="Z2kMRa_root"
                  data-open={searchOpen ? "true" : "false"}
                >
                  <div className="Z2kMRa_idle">
                    <div className="_3I4tGq_idle">
                      <div className="_3I4tGq_endItems">
                        <div className="_7u0keW_root">
                          {companyMenu ? <NavDropdown menu={companyMenu} /> : null}
                        </div>
                      </div>
                      <div className="_7u0keW_root">
                        {tryClaudeMenu ? <NavDropdown menu={tryClaudeMenu} /> : null}
                      </div>
                    </div>
                  </div>

                  <div className="Z2kMRa_search" inert={!searchOpen}>
                    <div role="search" className="TGeX9W_root">
                      <span className="TGeX9W_icon" aria-hidden="true">
                        <SearchIcon
                          className="lqbdHG_icon"
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                        />
                      </span>
                      <div className="aKo0nW_root TGeX9W_autocomplete">
                        <input
                          ref={inputRef}
                          data-list-empty=""
                          autoComplete="off"
                          spellCheck={false}
                          autoCorrect="off"
                          autoCapitalize="none"
                          role="combobox"
                          aria-expanded="false"
                          aria-haspopup="listbox"
                          aria-autocomplete="list"
                          placeholder="Enter search..."
                          aria-label="Search"
                          className="TGeX9W_input"
                          name="q"
                          defaultValue=""
                          onKeyDown={(event) => {
                            if (event.key === "Enter" && event.currentTarget.value.trim()) {
                              window.location.href = `/search?q=${encodeURIComponent(
                                event.currentTarget.value.trim()
                              )}`;
                            }
                          }}
                        />
                        <input
                          style={{
                            clipPath: "inset(50%)",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            border: 0,
                            padding: 0,
                            width: 1,
                            height: 1,
                            margin: -1,
                            position: "fixed",
                            top: 0,
                            left: 0,
                          }}
                          tabIndex={-1}
                          aria-hidden="true"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="vk8Wka_utilities">
                {searchOpen ? (
                  <button
                    aria-label="Close search"
                    data-component="Button"
                    data-variant="primary"
                    className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-primary f9ZZrG_size-small f9ZZrG_icon-format-icon-only"
                    onClick={() => setSearchOpen(false)}
                  >
                    <span className="f9ZZrG_icon">
                      <SearchCloseIcon className="lqbdHG_icon" />
                    </span>
                  </button>
                ) : (
                  <Link
                    aria-label="Search"
                    data-component="AnchorButton"
                    data-variant="tertiary"
                    className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-small f9ZZrG_icon-format-icon-only"
                    rel="nofollow"
                    href="/search"
                    prefetch={false}
                    onClick={(event) => {
                      event.preventDefault();
                      setSearchOpen(true);
                    }}
                  >
                    <span className="f9ZZrG_icon">
                      <SearchIcon className="lqbdHG_icon" />
                    </span>
                  </Link>
                )}
                <button
                  ref={menuButtonRef}
                  aria-label="Open menu"
                  aria-haspopup="dialog"
                  aria-expanded={menuOpen}
                  data-component="Button"
                  data-variant="tertiary"
                  className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-small f9ZZrG_icon-format-icon-only"
                  onClick={() => {
                    setSearchOpen(false);
                    setMenuOpen(true);
                  }}
                >
                  <span className="f9ZZrG_icon">
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {menuOpen ? <SiteMenu onClose={closeMenu} /> : null}
    </>
  );
}
