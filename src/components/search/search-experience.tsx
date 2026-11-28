"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowRightIcon,
  CloseIcon,
  TinyMoreMoreIcon,
} from "@/components/brand";
import { searchArticles, searchTopics } from "@/content/search";
import type { SearchArticle, SearchTopic } from "@/types/content";

const sortByDateDesc = (a: { date: string }, b: { date: string }) =>
  b.date.localeCompare(a.date);

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const topicLabel = (slug: string) =>
  searchTopics.find((topic) => topic.slug === slug)?.label ?? slug;

export function SearchExperience() {
  // Static-export safe: query params useSearchParams se reactively milte
  // hain (client-side navigation par bhi update hoti hain).
  const params = useSearchParams();
  const topicSlug = params.get("topic") ?? "";
  const query = params.get("q") ?? "";
  const activeTopic =
    searchTopics.find((item) => item.slug === topicSlug) ?? null;

  const articles = useMemo(
    () =>
      searchArticles
        .filter((a) => a.topic === topicSlug)
        .sort(sortByDateDesc),
    [topicSlug],
  );

  // Header ke search input me clicked topic ka naam sync karo — Anthropic
  // jaisa: "Alignment" chip click → input me "Alignment" dikhta hai.
  // Mirror ka input bhi sync hota hai (querySelectorAll se saare).
  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>(
      "header .TGeX9W_input",
    );
    if (!inputs.length) return;
    const label = searchTopics.find((t) => t.slug === topicSlug)?.label ?? "";
    const value = label || query;
    inputs.forEach((input) => {
      input.value = value;
    });
  }, [topicSlug, query]);

  // GLOBAL RULING: panel ka content header ke search input ke left edge se
  // start hota hai — Anthropic jaisa (unke 2560 pe input/eyebrow/card teeno
  // x=1725). JS se input ki live position measure karke panel set hota hai.
  useEffect(() => {
    const align = () => {
      const input = document.querySelector("header .TGeX9W_input");
      const panel = document.querySelector<HTMLElement>(".origin-search-panel");
      const stage = document.querySelector(".origin-search-stage");
      if (!input || !panel || !stage) return;
      if (window.innerWidth <= 900) {
        // Mobile: apni media query layout — inline width reset karo.
        panel.style.width = "";
        return;
      }
      const inputLeft = input.getBoundingClientRect().left;
      const stageRect = stage.getBoundingClientRect();
      const padRight = parseFloat(getComputedStyle(stage).paddingRight) || 0;
      // Panel left = input left - 14 (scroll inset) → content input ke exact
      // pixel se start hota hai.
      const contentRight = stageRect.right - padRight;
      const width = Math.max(320, Math.round(contentRight - inputLeft + 14));
      panel.style.width = `${width}px`;
    };
    align();
    const timer1 = setTimeout(align, 300);
    const timer2 = setTimeout(align, 1000);
    document.fonts?.ready.then(align).catch(() => null);
    const observer = new ResizeObserver(align);
    observer.observe(document.documentElement);
    const header = document.querySelector("header");
    if (header) observer.observe(header);
    window.addEventListener("resize", align);
    return () => {
      observer.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", align);
    };
  }, []);

  return (
    <section className="origin-search-stage">
      <div className="origin-search-panel">
        {activeTopic ? (
          <TopicPanel
            articles={articles}
            key={activeTopic.slug}
            topic={activeTopic}
          />
        ) : (
          <div className="origin-search-landing">
            <h1 className="origin-search-h1">Search</h1>
            <h2 className="origin-search-top">Top searches</h2>
            <ul className="origin-search-chips">
              {searchTopics.map((item) => (
                <li key={item.slug}>
                  <Link
                    className="origin-search-chip"
                    href={`/search?topic=${item.slug}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function TopicPanel({
  articles,
  topic,
}: {
  articles: SearchArticle[];
  topic: SearchTopic;
}) {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  return (
    <div className="origin-search-scroll">
      <div className="origin-search-overview">
        <p className="origin-search-eyebrow">Topic overview</p>
        <h1 className="origin-search-title">{topic.label}</h1>
        <p className="origin-search-desc">{topic.description}</p>
        <p className="origin-search-count">
          {articles.length} RESULTS
          <ArrowRightIcon className="origin-search-count-icon" />
        </p>
      </div>
      <ul className="origin-search-list">
        {articles.map((article) => {
          const expanded = expandedKey === article.title;
          const toggle = () =>
            setExpandedKey(expanded ? null : article.title);
          return (
            <li
              className="origin-search-card"
              data-expanded={expanded ? "" : undefined}
              key={article.title}
            >
              {/* Card head + title dono clickable — Anthropic ke details/summary
                  jaisa. Dots button aur links apne kaam khud karte hain. */}
              <div className="origin-search-card-head" onClick={toggle}>
                <span className="origin-search-card-topic">
                  {topicLabel(article.topic)}
                </span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                <button
                  aria-label={
                    expanded
                      ? `Hide details for ${article.title}`
                      : `Show details for ${article.title}`
                  }
                  className="origin-search-card-dots"
                  type="button"
                >
                  {expanded ? (
                    /* Bold X glyph — Anthropic ke X jitna mota (CloseIcon ke
                       patle strokes 8-10px pe faint dash jaise dikhte the). */
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.6 1.6 L8.4 8.4 M8.4 1.6 L1.6 8.4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <TinyMoreMoreIcon />
                  )}
                </button>
              </div>
              <h2
                className="origin-search-card-title"
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest("a")) return;
                  toggle();
                }}
              >
                {expanded ? (
                  <Link href="/coming-soon">{article.title}</Link>
                ) : (
                  article.title
                )}
              </h2>
              <div
                className="origin-search-card-details"
                data-open={expanded ? "" : undefined}
              >
                <div>
                  <p className="origin-search-card-excerpt">{article.excerpt}</p>
                  <Link className="origin-search-card-cta" href="/coming-soon">
                    View article
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
