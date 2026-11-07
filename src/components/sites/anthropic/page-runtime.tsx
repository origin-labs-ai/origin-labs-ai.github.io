"use client";

import { useEffect } from "react";

const ACCORDION_SELECTOR = [
  ".otSNYa_Trigger",
  ".zftEOa_trigger",
  ".fCjHva_trigger",
  ".Xud4PW_drawerTrigger",
].join(",");

function setAccordionState(button: HTMLButtonElement, open: boolean) {
  const header = button.closest("h3");
  const item = header?.parentElement ?? button.parentElement;
  const panelId = button.getAttribute("aria-controls");
  const panel =
    (panelId ? document.getElementById(panelId) : null) ??
    item?.querySelector<HTMLElement>("[role='region']") ??
    null;

  button.setAttribute("aria-expanded", String(open));
  if (open) {
    button.setAttribute("data-panel-open", "");
  } else {
    button.removeAttribute("data-panel-open");
  }

  for (const element of [header, item]) {
    if (!element) continue;
    if (open) {
      element.setAttribute("data-open", "");
      element.removeAttribute("data-closed");
    } else {
      element.setAttribute("data-closed", "");
      element.removeAttribute("data-open");
    }
  }

  if (!panel) return;
  if (open) {
    if (panel.id) button.setAttribute("aria-controls", panel.id);
    panel.removeAttribute("hidden");
    panel.setAttribute("data-open", "");
    panel.removeAttribute("data-closed");
    panel.style.setProperty("--accordion-panel-height", "auto");
    panel.style.setProperty("--accordion-panel-width", "auto");
  } else {
    button.removeAttribute("aria-controls");
    panel.setAttribute("hidden", "");
    panel.setAttribute("data-closed", "");
    panel.removeAttribute("data-open");
  }
}

export function PageRuntime({ slug }: { slug: string }) {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // Side table of contents: fade in once the first section nears the
    // middle of the viewport, track the active section, and float centered.
    const toc = document.querySelector<HTMLElement>(".iOB4wG_side-toc");
    if (toc) {
      const links = Array.from(
        toc.querySelectorAll<HTMLAnchorElement>("a[href^='#']"),
      );
      const targets = links.map((link) => {
        const href = link.getAttribute("href") ?? "";
        return href.length > 1 ? document.getElementById(href.slice(1)) : null;
      });
      const footer = document.querySelector("footer");
      let frame = 0;

      const update = () => {
        frame = 0;
        const viewportHeight = window.innerHeight;
        const firstTarget = targets.find(Boolean);
        const firstTop = firstTarget
          ? firstTarget.getBoundingClientRect().top
          : null;
        const footerTop = footer ? footer.getBoundingClientRect().top : null;
        const visible =
          firstTop !== null &&
          firstTop < viewportHeight * 0.5 &&
          !(footerTop !== null && footerTop <= 240);
        toc.classList.toggle("iOB4wG_is-visible", visible);

        const list = toc.querySelector("ol");
        if (list) {
          toc.style.top = `${Math.max(
            96,
            (viewportHeight - list.offsetHeight) / 2,
          )}px`;
        }

        let active = 0;
        targets.forEach((target, index) => {
          if (
            target &&
            target.getBoundingClientRect().top <= viewportHeight * 0.4
          ) {
            active = index;
          }
        });
        links.forEach((link, index) => {
          link.classList.toggle("iOB4wG_is-active", index === active);
        });
      };

      const onScroll = () => {
        if (!frame) frame = window.requestAnimationFrame(update);
      };

      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) window.cancelAnimationFrame(frame);
      });
    }

    // Base UI style accordions whose panels were injected at build time.
    document
      .querySelectorAll<HTMLButtonElement>(ACCORDION_SELECTOR)
      .forEach((button) => {
        const onClick = () => {
          const open = button.getAttribute("aria-expanded") !== "true";
          setAccordionState(button, open);
        };
        button.addEventListener("click", onClick);
        cleanups.push(() => button.removeEventListener("click", onClick));
      });

    // Model-page heroes flag the header as "away" only while the hero is on
    // screen; once it scrolls past, the header follows normal hide-on-scroll.
    const heroNav = document.querySelector<HTMLElement>("[data-hero-nav]");
    if (heroNav) {
      const onHeroScroll = () => {
        if (window.scrollY >= heroNav.offsetHeight) {
          heroNav.removeAttribute("data-hero-nav");
          window.removeEventListener("scroll", onHeroScroll);
        }
      };
      window.addEventListener("scroll", onHeroScroll, { passive: true });
      cleanups.push(() =>
        window.removeEventListener("scroll", onHeroScroll),
      );
    }

    // Listing heroes carry a captured overlay nav with its own copy of the
    // header logo; keep that copy's wordmark collapse in sync with scrolling
    // so it does not paint over the real header's A mark.
    const overlayHeaders = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".WXQxba_overlayNav header.UTJ3Tq_root",
      ),
    );
    if (overlayHeaders.length) {
      const syncOverlayHeaders = () => {
        const scrolled = window.scrollY > 50;
        overlayHeaders.forEach((header) => {
          if (scrolled) header.setAttribute("data-scrolled", "true");
          else header.removeAttribute("data-scrolled");
        });
      };
      syncOverlayHeaders();
      window.addEventListener("scroll", syncOverlayHeaders, { passive: true });
      cleanups.push(() =>
        window.removeEventListener("scroll", syncOverlayHeaders),
      );
    }

    // Launch hero intro: the source plays a one-time reveal (image squares
    // animate, then the title fades in and the skip button disappears). The
    // captured desktop markup freezes a mid-intro frame, so replay the same
    // 6.2s ending and let "Skip intro" finish it immediately.
    const launchStage = document.querySelector<HTMLElement>(
      ".WHJwZW_moo-hero .stage",
    );
    if (launchStage) {
      const squares = Array.from(
        launchStage.querySelectorAll<HTMLElement>(".sq"),
      );
      const title = launchStage.querySelector<HTMLElement>(".name");
      const eyebrow = launchStage.querySelector<HTMLElement>(".eyebrow");
      const skip = launchStage.querySelector<HTMLButtonElement>(
        ".skipbtn:not(.scrollcue)",
      );
      if (skip && !skip.classList.contains("gone")) {
        let timer = 0;
        const finish = () => {
          window.clearTimeout(timer);
          squares.forEach((square) => square.setAttribute("hidden", ""));
          title?.classList.add("in");
          eyebrow?.classList.add("in");
          // The source also reveals the table of contents and releases the
          // hero's "away" flag so the sticky header returns at the end of
          // the intro (the captured desktop markup freezes both mid-intro).
          launchStage.querySelector("nav")?.classList.add("in");
          launchStage
            .closest<HTMLElement>(".WHJwZW_moo-hero")
            ?.removeAttribute("data-hero-nav");
          skip.classList.add("gone");
          skip.disabled = true;
        };
        timer = window.setTimeout(finish, 6200);
        skip.addEventListener("click", finish);
        cleanups.push(() => {
          window.clearTimeout(timer);
          skip.removeEventListener("click", finish);
        });
      }
    }

    // Opus launch hero: the source holds the "Introducing" frame until the
    // visitor scrolls, then resolves to the title/TOC frame and returns to the
    // top. Swap in the captured final stage at the same point.
    const opusHero = document.querySelector<HTMLElement>(
      "section[data-opus-hero]",
    );
    const opusFinal =
      opusHero?.querySelector<HTMLTemplateElement>("template[data-opus-final]");
    if (opusHero && opusFinal) {
      const stage = opusHero.querySelector<HTMLElement>(".stage");
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        if (stage) stage.innerHTML = opusFinal.innerHTML;
        opusHero.style.height = "120vh";
        opusHero.setAttribute("data-hero-nav", "over");
        // The source settles at scrollY 1, which also lets the sticky header
        // reveal itself on the upward scroll tick.
        window.scrollTo(0, 1);
      };
      const onScroll = () => {
        if (window.scrollY > 120) finish();
      };
      const cue = stage?.querySelector<HTMLElement>(".cue");
      cue?.addEventListener("click", finish);
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        cue?.removeEventListener("click", finish);
      });
    }

    // Comparison grids carry their desktop width inline; re-measure so the
    // label rows track the table's responsive width.
    document.querySelectorAll<HTMLElement>(".zKqBAG_wrap").forEach((wrap) => {
      const table = wrap.querySelector<HTMLElement>(".zKqBAG_table");
      if (!table) return;
      const spacer = wrap.querySelector<HTMLElement>(".zKqBAG_spacer");
      const sync = () => {
        const width = table.getBoundingClientRect().width;
        if (width > 0) {
          wrap.style.setProperty("--grid-table-w", `${width}px`);
          if (spacer) spacer.style.width = `${width}px`;
        }
        wrap.style.setProperty("--grid-live-rest", "0px");
      };
      sync();
      window.addEventListener("resize", sync);
      cleanups.push(() => window.removeEventListener("resize", sync));
    });

    // Listing rows measure their collapsed height lazily on mobile, exactly
    // like the live expanders (the captured markup carries the desktop value).
    // The live observer preloads about one viewport ahead; rows further down
    // keep the default collapsed height until they come near the viewport.
    if (window.matchMedia("(max-width: 767px)").matches) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const expander = entry.target as HTMLElement;
            const summary =
              expander.querySelector<HTMLElement>(".bxgyUW_summary");
            if (summary) {
              const height = Math.round(
                summary.getBoundingClientRect().height,
              );
              if (height > 0) {
                expander.style.setProperty("--peek-height", `${height}px`);
              }
            }
            observer.unobserve(expander);
          }
        },
        { rootMargin: "100% 0px" },
      );
      document
        .querySelectorAll<HTMLElement>(".bxgyUW_row > ._2Zn0cq_container")
        .forEach((expander) => {
          expander.style.removeProperty("--peek-height");
          observer.observe(expander);
        });
      cleanups.push(() => observer.disconnect());
    }

    // Claude Corps FAQ accordion.
    document
      .querySelectorAll<HTMLButtonElement>(".Q_bhtW_itemTrigger")
      .forEach((button) => {
        const onClick = () => {
          const expanded = button.getAttribute("aria-expanded") === "true";
          const open = !expanded;
          button.setAttribute("aria-expanded", String(open));
          const icon = button.querySelector(".Q_bhtW_itemIcon");
          icon?.classList.toggle("Q_bhtW_itemIconOpen", open);
          const wrap = button.parentElement?.querySelector<HTMLElement>(
            ".Q_bhtW_answerWrap",
          );
          if (!wrap) return;
          wrap.hidden = !open;
          wrap.style.height = open ? "auto" : "0";
          wrap.style.opacity = open ? "1" : "0";
        };
        button.addEventListener("click", onClick);
        cleanups.push(() => button.removeEventListener("click", onClick));
      });

    // Tabs: three variants used across the site.
    document
      .querySelectorAll<HTMLElement>("[role='tablist']")
      .forEach((tablist) => {
        const tabs = Array.from(
          tablist.querySelectorAll<HTMLButtonElement>("[role='tab']"),
        ).filter((tab) => tab.hasAttribute("aria-selected"));
        if (!tabs.length) return;

        const initialIndex = Math.max(
          0,
          tabs.findIndex(
            (tab) => tab.getAttribute("aria-selected") === "true",
          ),
        );

        // Testimonial carousel tabs: slides overlap inside a fixed-height
        // stage, and only aria-hidden/inert move between the panels.
        if (tabs[0].classList.contains("L6ovVW_tab")) {
          const root = tablist.closest<HTMLElement>("._1oJwFW_root");
          const stage =
            root?.querySelector<HTMLElement>("._1oJwFW_stage") ?? null;
          const slides = stage
            ? Array.from(
                stage.querySelectorAll<HTMLElement>("._1oJwFW_slide"),
              )
            : [];
          let active = initialIndex;

          const apply = (index: number) => {
            active = index;
            tabs.forEach((tab, tabIndex) => {
              const selected = tabIndex === index;
              tab.setAttribute("aria-selected", String(selected));
              tab.setAttribute("tabindex", selected ? "0" : "-1");
              tab.classList.toggle("L6ovVW_tab-active", selected);
            });
            slides.forEach((slide, slideIndex) => {
              const state =
                slideIndex === index
                  ? "active"
                  : slideIndex === index - 1
                    ? "prev"
                    : slideIndex < index
                      ? "far-prev"
                      : slideIndex === index + 1
                        ? "next"
                        : "far-next";
              slide.setAttribute("data-slide", state);
              const panel =
                slide.querySelector<HTMLElement>("._1oJwFW_panel");
              if (!panel) return;
              panel.removeAttribute("hidden");
              if (slideIndex === index) {
                panel.removeAttribute("aria-hidden");
                panel.removeAttribute("inert");
              } else {
                panel.setAttribute("aria-hidden", "true");
                panel.setAttribute("inert", "");
              }
            });
            const activeSlide = slides[index];
            if (
              stage &&
              activeSlide &&
              stage.classList.contains("_1oJwFW_is-fluid")
            ) {
              stage.style.height = `${Math.ceil(
                activeSlide.getBoundingClientRect().height,
              )}px`;
            }
          };

          apply(initialIndex);
          tabs.forEach((tab, index) => {
            const onClick = () => apply(index);
            tab.addEventListener("click", onClick);
            cleanups.push(() => tab.removeEventListener("click", onClick));
          });
          const onResize = () => apply(active);
          window.addEventListener("resize", onResize);
          cleanups.push(() => window.removeEventListener("resize", onResize));
          return;
        }

        // Pill tabs with a sliding indicator (Base UI). Panels live in the
        // enclosing tabbed section; some pages reuse this as a category filter.
        if (tabs[0].classList.contains("iIvFzq_tab")) {
          const root = tablist.closest<HTMLElement>(".iIvFzq_root");
          const indicator =
            root?.querySelector<HTMLElement>(".iIvFzq_indicator") ?? null;
          const section = tablist.closest<HTMLElement>(
            ".uN-ikG_tabbed-section",
          );
          const panels = section
            ? Array.from(
                section.querySelectorAll<HTMLElement>(".uN-ikG_tab-panel"),
              )
            : [];
          const goals = tablist.closest<HTMLElement>(".rf4O3G_goals");
          const goalItems = goals
            ? Array.from(
                goals.querySelectorAll<HTMLElement>(".rf4O3G_goal-item"),
              )
            : [];
          let active = initialIndex;

          const moveIndicator = (tab: HTMLButtonElement | undefined) => {
            if (!indicator || !tab) return;
            const left = tab.offsetLeft;
            const width = tab.offsetWidth;
            indicator.style.setProperty("--active-tab-left", `${left}px`);
            indicator.style.setProperty("--active-tab-width", `${width}px`);
            indicator.style.setProperty(
              "--active-tab-right",
              `${tablist.scrollWidth - left - width}px`,
            );
            indicator.style.setProperty("--active-tab-top", "4px");
            indicator.style.setProperty("--active-tab-bottom", "4px");
            indicator.style.setProperty("--active-tab-height", "28px");
          };

          const apply = (index: number) => {
            active = index;
            tabs.forEach((tab, tabIndex) => {
              const selected = tabIndex === index;
              tab.toggleAttribute("data-active", selected);
              if (selected) {
                tab.setAttribute("data-composite-item-active", "");
              } else {
                tab.removeAttribute("data-composite-item-active");
              }
              tab.setAttribute("aria-selected", String(selected));
              tab.setAttribute("tabindex", selected ? "0" : "-1");
            });
            panels.forEach((panel, panelIndex) => {
              const selected = panelIndex === index;
              panel.classList.toggle("uN-ikG_active", selected);
              panel.setAttribute("aria-hidden", String(!selected));
            });
            if (goalItems.length) {
              const category = tabs[index]?.textContent?.trim() ?? "";
              const showAll = category.toLowerCase() === "all";
              goalItems.forEach((item) => {
                const itemCategory =
                  item
                    .querySelector(".rf4O3G_goal-category")
                    ?.textContent?.trim() ?? "";
                const match = showAll || itemCategory === category;
                item.style.display = match ? "" : "none";
              });
            }
            moveIndicator(tabs[index]);
          };

          apply(initialIndex);
          tabs.forEach((tab, index) => {
            const onClick = () => apply(index);
            tab.addEventListener("click", onClick);
            cleanups.push(() => tab.removeEventListener("click", onClick));
          });
          const onResize = () => moveIndicator(tabs[active]);
          window.addEventListener("resize", onResize);
          cleanups.push(() => window.removeEventListener("resize", onResize));
          return;
        }

        // Generic tabs (kN30kq/e33EQa): active class plus hidden panels.
        const knStage =
          tablist
            .closest<HTMLElement>(".kN30kq_root")
            ?.querySelector<HTMLElement>(".kN30kq_stage") ?? null;
        const activeToken = Array.from(tabs[initialIndex].classList).find(
          (token) => /(?:Active|-active)$/.test(token),
        );
        const suffix = activeToken
          ? activeToken.endsWith("Active")
            ? "Active"
            : "-active"
          : null;
        const baseToken =
          activeToken && suffix ? activeToken.slice(0, -suffix.length) : null;

        tabs.forEach((tab) => {
          const onClick = () => {
            tabs.forEach((candidate) => {
              const selected = candidate === tab;
              candidate.setAttribute("aria-selected", String(selected));
              candidate.setAttribute("tabindex", selected ? "0" : "-1");
              if (activeToken) candidate.classList.remove(activeToken);
              const panelId = candidate.getAttribute("aria-controls");
              const panel = panelId ? document.getElementById(panelId) : null;
              if (panel) panel.hidden = !selected;
            });
            if (
              activeToken &&
              baseToken &&
              tab.classList.contains(baseToken)
            ) {
              tab.classList.add(activeToken);
            }
            if (knStage) {
              const panelId = tab.getAttribute("aria-controls");
              const panel = panelId
                ? document.getElementById(panelId)
                : null;
              if (panel) {
                knStage.style.height = `${Math.ceil(
                  panel.getBoundingClientRect().height,
                )}px`;
              }
            }
          };
          tab.addEventListener("click", onClick);
          cleanups.push(() => tab.removeEventListener("click", onClick));
        });
      });

    // kN30kq view switcher: mobile keeps one tab in the row and moves the
    // rest into a "more" menu; selecting an item swaps the visible tab.
    if (window.matchMedia("(max-width: 767px)").matches) {
      document.querySelectorAll<HTMLElement>(".kN30kq_root").forEach((root) => {
        const row = root.querySelector<HTMLElement>(".kN30kq_tabs");
        const more = root.querySelector<HTMLElement>(".kN30kq_more");
        const menu = more?.querySelector<HTMLElement>(".kN30kq_menu");
        const moreButton =
          more?.querySelector<HTMLButtonElement>(".kN30kq_moreButton");
        const tabs = row
          ? Array.from(
              row.querySelectorAll<HTMLButtonElement>(
                ":scope > button[role='tab']",
              ),
            )
          : [];
        if (!menu || !moreButton || tabs.length < 2) return;

        const rebuildMenu = () => {
          const visible = tabs.find((tab) => !tab.hidden) ?? tabs[0];
          menu.innerHTML = "";
          tabs.forEach((tab) => {
            if (tab === visible) return;
            const item = document.createElement("button");
            item.type = "button";
            item.setAttribute("role", "menuitem");
            item.className = "caption kN30kq_menuItem";
            item.textContent = tab.textContent?.trim() ?? "";
            menu.appendChild(item);
          });
        };

        const selectTab = (tab: HTMLButtonElement) => {
          tabs.forEach((candidate) => {
            candidate.hidden = candidate !== tab;
          });
          tab.click();
          rebuildMenu();
          menu.hidden = true;
          moreButton.setAttribute("aria-expanded", "false");
        };

        const onMenuClick = (event: Event) => {
          const target = event.target as HTMLElement | null;
          const item = target?.closest<HTMLElement>(".kN30kq_menuItem");
          if (!item) return;
          const label = item.textContent?.trim() ?? "";
          const tab = tabs.find(
            (candidate) => candidate.textContent?.trim() === label,
          );
          if (tab) selectTab(tab);
        };
        const onMoreClick = () => {
          const open = menu.hidden;
          menu.hidden = !open;
          moreButton.setAttribute("aria-expanded", String(open));
        };

        menu.addEventListener("click", onMenuClick);
        moreButton.addEventListener("click", onMoreClick);
        cleanups.push(() => {
          menu.removeEventListener("click", onMenuClick);
          moreButton.removeEventListener("click", onMoreClick);
        });
        rebuildMenu();
      });
    }

    // Careers job board team groups.
    document
      .querySelectorAll<HTMLButtonElement>("._8DFgsW_teamHeader")
      .forEach((button) => {
        const onClick = () => {
          const open = button.getAttribute("aria-expanded") !== "true";
          button.setAttribute("aria-expanded", String(open));
          const group = button.closest<HTMLElement>("._8DFgsW_teamGroup");
          group?.setAttribute("data-open", String(open));
          const panelId = button.getAttribute("aria-controls");
          const panel = panelId ? document.getElementById(panelId) : null;
          if (panel) {
            if (open) panel.removeAttribute("inert");
            else panel.setAttribute("inert", "");
          }
        };
        button.addEventListener("click", onClick);
        cleanups.push(() => button.removeEventListener("click", onClick));
      });

    // Leadership bios: reveal the remaining paragraphs.
    document
      .querySelectorAll<HTMLButtonElement>(".SoxqZG_expandButton")
      .forEach((button) => {
        const onClick = () => {
          const open = button.getAttribute("aria-expanded") !== "true";
          button.setAttribute("aria-expanded", String(open));
          const targetId = button.getAttribute("aria-controls");
          const target = targetId ? document.getElementById(targetId) : null;
          if (target) target.setAttribute("data-expanded", String(open));
          const caret = button.querySelector(".SoxqZG_caretIcon");
          caret?.classList.toggle("SoxqZG_expanded", open);
          const textNode = Array.from(button.childNodes).find(
            (node) =>
              node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
          );
          if (textNode) {
            textNode.textContent = open ? "Collapse " : "Read full bio ";
          }
        };
        button.addEventListener("click", onClick);
        cleanups.push(() => button.removeEventListener("click", onClick));
      });

    // Copy the model ID button.
    document
      .querySelectorAll<HTMLButtonElement>(
        "button.id[aria-label^='Copy the model ID']",
      )
      .forEach((button) => {
        let timer = 0;
        const onClick = async () => {
          const code = button.querySelector("code")?.textContent ?? "";
          try {
            await navigator.clipboard.writeText(code);
          } catch {
            return;
          }
          button.setAttribute("data-copied", "");
          const status = button.parentElement?.querySelector(
            "[role='status']",
          );
          if (status) status.textContent = "Model ID copied";
          window.clearTimeout(timer);
          timer = window.setTimeout(() => {
            button.removeAttribute("data-copied");
            if (status) status.textContent = "";
          }, 1600);
        };
        button.addEventListener("click", onClick);
        cleanups.push(() => {
          button.removeEventListener("click", onClick);
          window.clearTimeout(timer);
        });
      });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [slug]);

  return null;
}
