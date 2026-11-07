"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "./brand";
import { learnSlides } from "./nav-data";
import { TinyMoreButton } from "./tiny-more";

export function LearnMore() {
  const trackRef = useRef<HTMLUListElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reset = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) setIndex(0);
    };
    reset();
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    if (!slide) return;
    track.style.transform = `translate3d(-${index * slide.offsetWidth}px, 0px, 0px)`;
  }, [index]);

  return (
    <section className="xiAwRW_root">
      <div className="xiAwRW_inner">
        <h2
          className="tOQyXa_caption-1 tOQyXa_weight--bold EotmOW_root xiAwRW_heading"
          data-component="FeaturedEyebrow"
        >
          <div aria-hidden="true">
            <span className="YyoeKW_line">Learn more</span>
          </div>
          <span className="YyoeKW_screen-reader-text">Learn more</span>
        </h2>

        <div
          ref={carouselRef}
          className="xiAwRW_carousel xiAwRW_fits-desktop"
          data-revealed={revealed ? "true" : "false"}
        >
          <div className="xiAwRW_viewport">
            <ul className="xiAwRW_container" ref={trackRef}>
              {learnSlides.map((slide) => (
                <li className="xiAwRW_slide" key={slide.href}>
                  <article className="xiAwRW_card">
                    <header className="nUeDbq_header xiAwRW_header">
                      <div className="nUeDbq_headerButton">
                        <TinyMoreButton title={slide.title} />
                      </div>
                      <p>
                        <a
                          className="wN10Da_link"
                          href={slide.topicHref}
                          rel={slide.topicNoFollow ? "nofollow" : undefined}
                        >
                          {slide.topic}
                        </a>
                      </p>
                    </header>

                    <a className="xiAwRW_link xiAwRW_anchor" href={slide.href}>
                      <div className="xiAwRW_media">
                        <img
                          alt=""
                          loading="lazy"
                          width={640}
                          height={800}
                          decoding="async"
                          style={{ color: "transparent" }}
                          src={slide.image}
                        />
                      </div>
                      <div className="xiAwRW_copy">
                        <h3
                          className="tOQyXa_headline-5 xiAwRW_title"
                          data-component="Headline"
                        >
                          {slide.title}
                        </h3>
                        <span
                          className="tOQyXa_caption-1 xiAwRW_summary"
                          data-component="Caption"
                        >
                          {slide.summary}
                        </span>
                      </div>
                    </a>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <div
            role="group"
            className="n4MhcW_carousel-controls xiAwRW_controls"
            aria-label="Carousel controls"
          >
            <button
              aria-label="Previous slide"
              data-component="Button"
              data-variant="tertiary"
              className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-small f9ZZrG_icon-format-icon-only"
              disabled={index === 0}
              onClick={() => setIndex((current) => Math.max(0, current - 1))}
            >
              <span className="f9ZZrG_icon">
                <ArrowLeftIcon />
              </span>
            </button>
            <div
              className="n4MhcW_carousel-controls-pagination"
              aria-live="polite"
            >
              <div className="n4MhcW_carousel-count">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>/</div>
              <div className="n4MhcW_carousel-count">
                {String(learnSlides.length).padStart(2, "0")}
              </div>
            </div>
            <button
              aria-label="Next slide"
              data-component="Button"
              data-variant="tertiary"
              className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-small f9ZZrG_icon-format-icon-only"
              disabled={index === learnSlides.length - 1}
              onClick={() =>
                setIndex((current) =>
                  Math.min(learnSlides.length - 1, current + 1),
                )
              }
            >
              <span className="f9ZZrG_icon">
                <ArrowRightIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
