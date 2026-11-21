"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { PauseIcon, PlayIcon } from "@/components/brand";
import { reportCopy } from "@/content/home";

const SPRING_STIFFNESS = 120;
const SPRING_DAMPING = 30;

const reportVideos = [
  {
    src: "/media/origin-reveal.mp4",
    poster: "/media/origin-reveal-poster.webp",
    label: "Origin logo reveal animation",
  },
  {
    src: "/media/origin-frame.mp4",
    poster: "/media/origin-frame-poster.webp",
    label: "Origin silver frame animation",
  },
] as const;

export function HomeReport() {
  const cardRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLSpanElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const firstVideoEndedRef = useRef(false);
  const leftViewportRef = useRef(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [copyVisible, setCopyVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const sentinel = sentinelRef.current;
    if (!card || !sentinel) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      card.style.setProperty("--scroll-grow", "1");
      return;
    }

    let target = 0;
    let value = 0;
    let velocity = 0;
    let initialized = false;
    let frame = 0;
    let last = 0;

    const measure = () => {
      const rect = sentinel.getBoundingClientRect();
      const viewport = window.innerHeight;
      const rangeStart = rect.bottom - viewport;
      const rangeEnd = rect.top - viewport * 0.25;
      const span = rangeEnd - rangeStart;
      const progress =
        span === 0 ? 1 : (window.scrollY - rangeStart) / span;
      target = Math.min(1, Math.max(0, progress));
    };

    const tick = (now: number) => {
      const delta = last ? Math.min((now - last) / 1000, 0.064) : 1 / 60;
      last = now;

      if (!initialized) {
        value = target;
        initialized = true;
      } else {
        const steps = Math.max(1, Math.ceil(delta / (1 / 240)));
        const step = delta / steps;
        for (let index = 0; index < steps; index += 1) {
          const acceleration =
            -SPRING_STIFFNESS * (value - target) - SPRING_DAMPING * velocity;
          velocity += acceleration * step;
          value += velocity * step;
        }
        if (Math.abs(value - target) < 0.0002 && Math.abs(velocity) < 0.0002) {
          value = target;
          velocity = 0;
        }
      }

      card.style.setProperty("--scroll-grow", String(value));

      if (value !== target || velocity !== 0) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        last = 0;
      }
    };

    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      measure();
      start();
    };

    const onResize = () => {
      measure();
      if (!initialized) {
        value = target;
        initialized = true;
        card.style.setProperty("--scroll-grow", String(value));
      }
      start();
    };

    measure();
    value = target;
    initialized = true;
    card.style.setProperty("--scroll-grow", String(value));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const video = videoRefs.current[activeVideo];
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    if (!playing) {
      video.pause();
      return;
    }

    if (!inView) {
      video.pause();
      return;
    }

    const startPlayback = () => {
      const attempt = video.play();
      if (attempt) {
        attempt.catch(() => setPlaying(false));
      }
    };

    if (video.readyState >= 2) {
      startPlayback();
      return;
    }

    video.addEventListener("canplay", startPlayback, { once: true });
    return () => video.removeEventListener("canplay", startPlayback);
  }, [activeVideo, playing, inView]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== activeVideo) video.pause();
    });
  }, [activeVideo]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);

        if (!entry.isIntersecting) {
          leftViewportRef.current = true;
          return;
        }

        if (
          leftViewportRef.current &&
          firstVideoEndedRef.current &&
          activeVideo === 0
        ) {
          leftViewportRef.current = false;
          setCopyVisible(false);
          setActiveVideo(1);
          setPlaying(true);
        }
      },
      { threshold: 0 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [activeVideo]);

  const resumePlayback = () => {
    if (
      playing ||
      copyVisible ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const video = videoRefs.current[activeVideo];
    if (!video) return;
    if (video.ended) video.currentTime = 0;
    setCopyVisible(false);
    setPlaying(true);
  };

  const togglePlayback = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (playing) {
      setPlaying(false);
      return;
    }

    const video = videoRefs.current[activeVideo];
    if (video?.ended) video.currentTime = 0;
    setCopyVisible(false);
    setPlaying(true);
  };

  return (
    <section className="theme-ivory ZSMdoa_root" data-theme="ivory">
      <div className="rLIPjq_root">
        <div className="rLIPjq_frame">
          <span
            ref={sentinelRef}
            className="rLIPjq_sentinel"
            data-grow-timing="bottomEnters"
            aria-hidden="true"
          />
          <div
            ref={cardRef}
            className="rLIPjq_card origin-report-card"
            data-component="MissionHomepageSizzle"
            data-video={activeVideo}
            data-copy-visible={copyVisible ? "true" : "false"}
            onPointerEnter={resumePlayback}
          >
            <div className="origin-report-media" aria-hidden="true">
              {reportVideos.map((video, index) => (
                <video
                  key={video.src}
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  className="origin-report-video"
                  data-active={index === activeVideo ? "true" : "false"}
                  src={video.src}
                  poster={video.poster}
                  aria-label={video.label}
                  muted
                  playsInline
                  preload="auto"
                  tabIndex={-1}
                  onEnded={() => {
                    if (index === 0) firstVideoEndedRef.current = true;
                    setCopyVisible(true);
                    setPlaying(false);
                  }}
                />
              ))}
              <span className="origin-report-shade" />
            </div>

            <div
              className="Bo9kyq_container _8i4M7a_grid"
              data-component="CSSGrid.Container"
            >
              <div className="Bo9kyq_standard" data-component="CSSGrid.Standard">
                <div
                  className="Bo9kyq_m-full Bo9kyq_t-span-8 Bo9kyq_t-start-3 Bo9kyq_d-span-6 Bo9kyq_d-start-4"
                  data-component="CSSGrid.Item"
                >
                  <div
                    className="_8i4M7a_copy origin-report-copy"
                    data-shown={copyVisible ? "" : undefined}
                  >
                    <h2
                      className="tOQyXa_headline-1 _8i4M7a_title"
                      data-component="Headline"
                    >
                      {reportCopy.title}
                    </h2>
                    <div className="_8i4M7a_overview">
                      <p className="tOQyXa_body-3" data-component="Body">
                        {reportCopy.body}
                      </p>
                    </div>
                    <Link
                      data-component="AnchorButton"
                      data-variant="primary"
                      className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-primary f9ZZrG_size-medium"
                      href={reportCopy.ctaHref}
                    >
                      {reportCopy.ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-medium f9ZZrG_icon-format-icon-only rLIPjq_toggle Dg4lqa_button"
              aria-label={playing ? "Pause animation" : "Play animation"}
              data-state={playing ? "playing" : "paused"}
              onClick={togglePlayback}
            >
              <span className="Dg4lqa_window" aria-hidden="true">
                <span className="Dg4lqa_strip">
                  <PlayIcon />
                  <PauseIcon />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
