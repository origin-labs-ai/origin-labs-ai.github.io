"use client";

import { useState } from "react";

import { TinyMoreCloseIcon, TinyMoreMoreIcon } from "./brand";

export function TinyMoreButton({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      tabIndex={0}
      aria-label={`Related to ${title}`}
      aria-haspopup="dialog"
      aria-expanded={open}
      className={`hN4zBq_tiny-more-button ${
        open ? "hN4zBq_state-open" : "hN4zBq_state-closed"
      }`}
      onClick={() => setOpen((current) => !current)}
    >
      <TinyMoreCloseIcon
        aria-hidden="true"
        className={`hN4zBq_icon${open ? " hN4zBq_icon-visible" : ""}`}
      />
      <TinyMoreMoreIcon
        aria-hidden="true"
        className={`hN4zBq_icon${open ? "" : " hN4zBq_icon-visible"}`}
      />
    </button>
  );
}
