"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { PauseIcon, PlayIcon } from "./brand";

const DESKTOP_ART = "/sites/anthropic/images/hero-canvas-desktop-clean.png";
const MOBILE_ART = "/sites/anthropic/images/hero-canvas-mobile-clean.png";

const SPRING_STIFFNESS = 120;
const SPRING_DAMPING = 30;

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(
    image,
    (width - drawWidth) / 2,
    (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

export function PublicBenefitReport() {
  const cardRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(true);

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
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const images: Record<"desktop" | "mobile", HTMLImageElement> = {
      desktop: new Image(),
      mobile: new Image(),
    };
    images.desktop.src = DESKTOP_ART;
    images.mobile.src = MOBILE_ART;

    const render = () => {
      const width = Math.round(card.clientWidth);
      const height = Math.round(card.clientHeight);
      if (!width || !height) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      const image = window.matchMedia("(min-width: 768px)").matches
        ? images.desktop
        : images.mobile;

      if (image.complete && image.naturalWidth > 0) {
        drawCover(context, image, canvas.width, canvas.height);
      } else {
        image.addEventListener(
          "load",
          () => drawCover(context, image, canvas.width, canvas.height),
          { once: true },
        );
      }
    };

    render();

    const observer = new ResizeObserver(render);
    observer.observe(card);

    return () => observer.disconnect();
  }, []);

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
            className="rLIPjq_card"
            data-component="MissionHomepageSizzle"
          >
            <canvas ref={canvasRef} aria-hidden="true" width={1425} height={802} />

            <div
              className="Bo9kyq_container _8i4M7a_grid"
              data-component="CSSGrid.Container"
            >
              <div className="Bo9kyq_standard" data-component="CSSGrid.Standard">
                <div
                  className="Bo9kyq_m-full Bo9kyq_t-span-8 Bo9kyq_t-start-3 Bo9kyq_d-span-6 Bo9kyq_d-start-4"
                  data-component="CSSGrid.Item"
                >
                  <div className="_8i4M7a_copy" data-shown="">
                    <h2
                      className="tOQyXa_headline-1 _8i4M7a_title"
                      data-component="Headline"
                    >
                      2026 Public Benefit Report
                    </h2>
                    <div className="_8i4M7a_overview">
                      <p className="tOQyXa_body-3" data-component="Body">
                        Anthropic is a Public Benefit Corporation (PBC), a
                        designation that requires us to balance the financial
                        interests of shareholders with the benefit to the
                        broader public. This report takes stock of what we are
                        doing to serve the public benefit, and of the work
                        ahead.
                      </p>
                    </div>
                    <Link
                      data-component="AnchorButton"
                      data-variant="primary"
                      className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-primary f9ZZrG_size-medium"
                      href="/public-benefit-charter"
                    >
                      Learn more
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
              onClick={() => setPlaying((current) => !current)}
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
