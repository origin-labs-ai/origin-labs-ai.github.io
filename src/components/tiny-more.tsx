"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ArrowRightIcon, TinyMoreCloseIcon, TinyMoreMoreIcon } from "./brand";
import { relatedPagesFor } from "@/content/related-pages";

/* Anthropic ke tiny-more connection popup ka clone — click par 5 circles
   ek doosre se jude SVG diagram, hover par us page ka card, click par
   redirect. Flip rule: neeche kam space to upar, upar kam space to neeche. */

const NODE_XY: Array<[number, number]> = [
  [31.4, 58.5],
  [79.2, 64.8],
  [137.7, 61.2],
  [195.7, 51.1],
  [248.6, 40.2],
];
const POPUP_W = 320;
const POPUP_H = 392;

export function TinyMoreButton({ title }: { title: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const data = relatedPagesFor(title);
  const close = () => {
    setOpen(false);
    setHovered(0);
  };

  // Open par button rect se fixed position + flip side (space-based).
  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const spaceBelow = window.innerHeight - r.bottom;
    const spaceAbove = r.top;
    // Flip rule: jis side ki jagah zyada ho us taraf khule — neeche fit ho to
    // neeche, warna upar, warna jis side zyada space ho.
    const side =
      spaceBelow >= POPUP_H + 12
        ? "below"
        : spaceAbove >= POPUP_H + 12
          ? "above"
          : spaceBelow >= spaceAbove
            ? "below"
            : "above";
    let left = Math.min(Math.max(12, r.left + r.width / 2 - POPUP_W / 2), window.innerWidth - POPUP_W - 12);
    let top = side === "below" ? r.bottom + 12 : r.top - POPUP_H - 12;
    // Popup viewport ke andar + sticky header (84px) ke neeche rahe.
    top = Math.min(Math.max(92, top), window.innerHeight - POPUP_H - 8);
    setPos({ top, left });
    window.dispatchEvent(
      new CustomEvent("origin:related-open", {
        detail: btnRef.current?.getAttribute("aria-label") ?? "",
      }),
    );
  }, [open]);

  // Doosra popup khula to ye band.
  useEffect(() => {
    if (!open) return;
    const onCloseOthers = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== (btnRef.current?.getAttribute("aria-label") ?? "")) setOpen(false);
    };
    window.addEventListener("origin:related-open", onCloseOthers);
    return () => window.removeEventListener("origin:related-open", onCloseOthers);
  }, [open]);

  // Outside click / scroll / Escape — band.
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!btnRef.current?.contains(target) && !popupRef.current?.contains(target)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDown, true);
    window.addEventListener("scroll", close, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown, true);
      window.removeEventListener("scroll", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        tabIndex={0}
        aria-label={`Related to ${title}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`hN4zBq_tiny-more-button ${open ? "hN4zBq_state-open" : "hN4zBq_state-closed"}`}
        onClick={() => setOpen((current) => !current)}
      >
        <TinyMoreCloseIcon aria-hidden="true" className={`hN4zBq_icon${open ? " hN4zBq_icon-visible" : ""}`} />
        <TinyMoreMoreIcon aria-hidden="true" className={`hN4zBq_icon${open ? "" : " hN4zBq_icon-visible"}`} />
      </button>
      {/* Portal se body me render — carousel/section ke transforms fixed
          positioning ko tod dete hain (containing block shift ho jaata hai). */}
      {open && pos
        ? createPortal(
            <div ref={popupRef} role="dialog" aria-label={`Related articles: ${title}`} className="origin-related-popup" style={{ top: pos.top, left: pos.left }}>
          <div className="origin-related-tooltip">
            <div className="origin-related-header">
              <h3>Related articles</h3>
              <button type="button" aria-label="Close" className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-tertiary f9ZZrG_size-small f9ZZrG_icon-format-icon-only" onClick={close}>
                <span className="f9ZZrG_icon">
                  <TinyMoreCloseIcon />
                </span>
              </button>
            </div>
            <p className="origin-related-summary">{data.summary}</p>
            <div className="origin-related-diagram">
              <svg viewBox="0 0 280 105" aria-hidden="true">
                {NODE_XY.slice(0, -1).map(([x, y], i) => {
                  const [nx, ny] = NODE_XY[i + 1];
                  return <line className="origin-related-edge" key={`e${i}`} x1={x} y1={y} x2={nx} y2={ny} />;
                })}
                {NODE_XY.map(([x, y], i) => (
                  <g
                    className="origin-related-node"
                    key={`n${i}`}
                    data-hovered={hovered === i ? "" : undefined}
                    transform={`translate(${x} ${y})`}
                    onMouseOver={() => setHovered(i)}
                    onClick={() => router.push(data.items[i]?.href ?? "/coming-soon")}
                  >
                    <circle className="origin-related-node-ring" r="10.73" />
                    <circle className="origin-related-node-dot" r="4.2" />
                  </g>
                ))}
              </svg>
            </div>
            <Link href={data.items[hovered]?.href ?? "/coming-soon"} className="origin-related-card">
              <span className="origin-related-card-meta">
                <span>{data.items[hovered]?.category}</span>
                <span>{data.items[hovered]?.date}</span>
              </span>
              <span className="origin-related-card-title">{data.items[hovered]?.title}</span>
            </Link>
            {/* Live jaisa View more CTA — first related page ka link. */}
            <Link href={data.items[0]?.href ?? "/coming-soon"} className="origin-related-cta">
              View more
              <ArrowRightIcon className="origin-related-cta-icon" />
            </Link>
          </div>
        </div>,
            document.body,
          )
        : null}
    </>
  );
}
