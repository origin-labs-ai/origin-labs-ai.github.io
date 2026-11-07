"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronDown } from "./brand";
import type { DropdownMenu } from "./nav-data";

type NavDropdownProps = {
  menu: DropdownMenu;
  corner?: "full" | "small";
  className?: string;
  buttonClassName?: string;
  popupClassName?: string;
  direction?: "down" | "up";
};

export function NavDropdown({
  menu,
  corner = "full",
  className,
  buttonClassName,
  popupClassName,
  direction = "down",
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`nav-dropdown${className ? ` ${className}` : ""}`}>
      <button
        type="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        data-popup-open={open ? "" : undefined}
        onClick={() => setOpen((value) => !value)}
        className={`f9ZZrG_button ${
          corner === "full" ? "f9ZZrG_corner-full" : "f9ZZrG_corner-small"
        } f9ZZrG_variant-tertiary f9ZZrG_size-small f9ZZrG_icon-format-trailing _4mzI4G_trigger${
          buttonClassName ? ` ${buttonClassName}` : ""
        }`}
      >
        {menu.label}
        <span className="f9ZZrG_icon">
          <ChevronDown />
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          aria-orientation="vertical"
          data-align={menu.align ?? "left"}
          data-direction={direction}
          style={{ "--nav-dropdown-columns": menu.columnsCount } as CSSProperties}
          className={`_4mzI4G_popup nav-dropdown-popup${popupClassName ? ` ${popupClassName}` : ""}`}
        >
          {menu.columns.map((column, columnIndex) => (
            <div role="group" className="_4mzI4G_column" key={`${menu.label}-${columnIndex}`}>
              {column.heading ? (
                <div role="presentation" className="_4mzI4G_columnHeading">
                  <span className="tOQyXa_caption-1" data-component="Caption">
                    {column.heading}
                  </span>
                </div>
              ) : null}
              {column.links.map((link) => (
                <a
                  role="menuitem"
                  tabIndex={0}
                  className="_4mzI4G_item"
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  key={`${link.href}-${link.label}`}
                >
                  <span className="tOQyXa_caption-1 _4mzI4G_itemLabel" data-component="Caption">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
