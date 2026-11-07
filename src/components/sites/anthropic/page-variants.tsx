"use client";

import { useLayoutEffect, useRef } from "react";

type PageVariantsProps = {
  desktop: string;
  mobile?: string;
};

/**
 * Some source pages render JS-driven charts that lay out differently at
 * mobile widths. Those pages ship a second, mobile-captured DOM; keep only
 * the variant that matches the viewport so ids and runtime handlers stay
 * unique.
 */
export function PageVariants({ desktop, mobile }: PageVariantsProps) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile && mobileRef.current) {
      desktopRef.current?.remove();
    } else {
      mobileRef.current?.remove();
    }
  }, []);

  return (
    <div className="page-variants" data-mobile={mobile ? "true" : undefined}>
      <div
        ref={desktopRef}
        className="page-variant page-variant-desktop"
        dangerouslySetInnerHTML={{ __html: desktop }}
      />
      {mobile ? (
        <div
          ref={mobileRef}
          className="page-variant page-variant-mobile"
          dangerouslySetInnerHTML={{ __html: mobile }}
        />
      ) : null}
    </div>
  );
}
