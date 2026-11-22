"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CloseIcon,
  MenuIcon,
  SearchCloseIcon,
  SearchIcon,
  Wordmark,
} from "@/components/brand";
import { headerMenus } from "@/content/navigation";
import { resolveMenu } from "@/lib/links";
import { NavDropdown } from "./nav-dropdown";
import { SiteMenu } from "./site-menu";

const resolvedHeaderMenus = headerMenus.map(resolveMenu);

const researchMenu = resolvedHeaderMenus.find((menu) => menu.label === "Research");
const policyMenu = resolvedHeaderMenus.find((menu) => menu.label === "Policy");
const commitmentsMenu = resolvedHeaderMenus.find(
  (menu) => menu.label === "Commitments",
);
const companyMenu = resolvedHeaderMenus.find((menu) => menu.label === "Company");
const tryOriginMenu = resolvedHeaderMenus.find(
  (menu) => menu.label === "Try Code",
);

const DROPDOWN_CLOSE_MS = 200;

export function SiteHeader({
  hideOnScroll = false,
  overlay = false,
}: {
  hideOnScroll?: boolean;
  overlay?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  // Search bar /search par hamesha khula rehta hai (derived). Baaki pages par
  // search button IN-PLACE kholta hai — live Anthropic jaisa: URL wahi rehta
  // hai, box right→left wipe hota hai (Z2kMRa CSS animation), idle fade.
  const [overlaySearchOpen, setOverlaySearchOpen] = useState(false);
  const searchOpen =
    pathname?.startsWith("/search") || overlaySearchOpen;
  const onSearchRoute = pathname?.startsWith("/search") ?? false;
  const searchNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live naapa: search button par wipe (~0.3s) ke baad ~1s par /search
  // navigate hota hai (box khula rehta hai, peeche search landing aati hai).
  // Timer X / Escape / route-change par cancel hota hai.
  const clearSearchNavTimer = () => {
    if (searchNavTimerRef.current) {
      clearTimeout(searchNavTimerRef.current);
      searchNavTimerRef.current = null;
    }
  };

  // Route badle to overlay state reset (header shared layout me persist ho to
  // bhi clean rahe) + delayed auto-navigation timer clear (Enter se pehle hi
  // navigate ho gaya to double-push na ho).
  useEffect(() => {
    clearSearchNavTimer();
    setOverlaySearchOpen(false);
  }, [pathname]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState(true);
  const lastScrollY = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchRootRef = useRef<HTMLDivElement>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [closingDropdown, setClosingDropdown] = useState<string | null>(null);
  const pendingDropdownRef = useRef<string | null>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDropdownTimer = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
  };

  const finishDropdownClose = () => {
    clearDropdownTimer();
    const next = pendingDropdownRef.current;
    pendingDropdownRef.current = null;
    setClosingDropdown(null);
    if (next) setActiveDropdown(next);
  };

  const openDropdown = (id: string) => {
    if (activeDropdown === id) return;
    if (closingDropdown === id) {
      clearDropdownTimer();
      pendingDropdownRef.current = null;
      setClosingDropdown(null);
      setActiveDropdown(id);
      return;
    }
    if (activeDropdown || closingDropdown) {
      pendingDropdownRef.current = id;
      if (activeDropdown && !closingDropdown) {
        setClosingDropdown(activeDropdown);
        setActiveDropdown(null);
        clearDropdownTimer();
        dropdownTimerRef.current = setTimeout(
          finishDropdownClose,
          DROPDOWN_CLOSE_MS,
        );
      }
      return;
    }
    pendingDropdownRef.current = null;
    setActiveDropdown(id);
  };

  const closeDropdown = (id: string) => {
    if (activeDropdown === id) {
      clearDropdownTimer();
      pendingDropdownRef.current = null;
      setActiveDropdown(null);
      setClosingDropdown(id);
      dropdownTimerRef.current = setTimeout(
        finishDropdownClose,
        DROPDOWN_CLOSE_MS,
      );
    } else if (pendingDropdownRef.current === id) {
      pendingDropdownRef.current = null;
    } else if (closingDropdown === id && !pendingDropdownRef.current) {
      clearDropdownTimer();
      setClosingDropdown(null);
    }
  };

  useEffect(() => clearDropdownTimer, []);

  useEffect(() => () => clearSearchNavTimer(), []);

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

  // /search route par input auto-focus hota hai; homepage overlay open par
  // NAHI (live jaisa — focus BODY par rehta hai, koi focus-ring flash nahi).
  useEffect(() => {
    if (!onSearchRoute) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [onSearchRoute]);

  useEffect(() => {
    if (!searchOpen) return;
    // /search par Escape = home; homepage overlay par Escape = sirf close.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (onSearchRoute) {
          router.push("/");
        } else {
          clearSearchNavTimer();
          setOverlaySearchOpen(false);
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen, onSearchRoute, router]);

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
                {researchMenu ? (
                  <NavDropdown
                    menu={researchMenu}
                    open={activeDropdown === researchMenu.label}
                    onOpen={openDropdown}
                    onClose={closeDropdown}
                  />
                ) : null}
                {policyMenu ? (
                  <NavDropdown
                    menu={policyMenu}
                    open={activeDropdown === policyMenu.label}
                    onOpen={openDropdown}
                    onClose={closeDropdown}
                  />
                ) : null}
                {commitmentsMenu ? (
                  <NavDropdown
                    menu={commitmentsMenu}
                    open={activeDropdown === commitmentsMenu.label}
                    onOpen={openDropdown}
                    onClose={closeDropdown}
                  />
                ) : null}
              </div>
            </div>
          </div>

          <div className="UTJ3Tq_logo">
            <Link aria-label="Origin" href="/">
              <div className="ZrbDXq_logo-wrapper">
                <div className="ZrbDXq_logo-lottie">
                  <Wordmark style={{ width: 82, height: 34 }} />
                </div>
              </div>
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
                          {companyMenu ? (
                          <NavDropdown
                            menu={companyMenu}
                            open={activeDropdown === companyMenu.label}
                            onOpen={openDropdown}
                            onClose={closeDropdown}
                          />
                        ) : null}
                        </div>
                      </div>
                      <div className="_7u0keW_root">
                        {tryOriginMenu ? (
                          <NavDropdown
                            menu={tryOriginMenu}
                            open={activeDropdown === tryOriginMenu.label}
                            onOpen={openDropdown}
                            onClose={closeDropdown}
                          />
                        ) : null}
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
                          type="search"
                          enterKeyHint="search"
                          placeholder="Enter search..."
                          aria-label="Search"
                          className="TGeX9W_input"
                          name="q"
                          defaultValue=""
                          onKeyDown={(event) => {
                            if (event.key === "Enter" && event.currentTarget.value.trim()) {
                              router.push(
                                `/search?q=${encodeURIComponent(
                                  event.currentTarget.value.trim()
                                )}`
                              );
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
                    onClick={() => {
                      // /search par: pehla close = query clear karke /search
                      // (bar khula rehta hai), doosra = home. Homepage overlay
                      // par: box wipe-close + query clear, wahi page par.
                      if (onSearchRoute) {
                        if (window.location.search) {
                          router.push("/search");
                        } else {
                          router.push("/");
                        }
                      } else {
                        clearSearchNavTimer();
                        if (inputRef.current) inputRef.current.value = "";
                        setOverlaySearchOpen(false);
                      }
                    }}
                  >
                    <span className="f9ZZrG_icon">
                      <SearchCloseIcon className="lqbdHG_icon" />
                    </span>
                  </button>
                ) : (
                  <button
                    aria-label="Search"
                    data-component="Button"
                    data-variant="tertiary"
                    className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-small f9ZZrG_icon-format-icon-only"
                    onClick={() => {
                      setOverlaySearchOpen(true);
                      // Live jaisa: wipe complete hone ke baad ~1s par /search.
                      clearSearchNavTimer();
                      searchNavTimerRef.current = setTimeout(() => {
                        searchNavTimerRef.current = null;
                        router.push("/search");
                      }, 1000);
                    }}
                  >
                    <span className="f9ZZrG_icon">
                      <SearchIcon className="lqbdHG_icon" />
                    </span>
                  </button>
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
