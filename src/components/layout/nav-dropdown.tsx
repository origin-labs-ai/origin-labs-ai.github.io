"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronDown } from "@/components/brand";
import type { DropdownMenu } from "@/types/content";

type NavDropdownProps = {
  menu: DropdownMenu;
  corner?: "full" | "small";
  className?: string;
  buttonClassName?: string;
  popupClassName?: string;
  direction?: "down" | "up";
  open?: boolean;
  onOpen?: (id: string) => void;
  onClose?: (id: string) => void;
};

export function NavDropdown({
  menu,
  corner = "full",
  className,
  buttonClassName,
  popupClassName,
  direction = "down",
  open,
  onOpen,
  onClose,
}: NavDropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerTypeRef = useRef("");

  const requestOpen = useCallback(() => {
    if (onOpen) onOpen(menu.label);
    else setInternalOpen(true);
  }, [onOpen, menu.label]);

  const requestClose = useCallback(() => {
    if (onClose) onClose(menu.label);
    else setInternalOpen(false);
  }, [onClose, menu.label]);

  const requestCloseRef = useRef(requestClose);
  useEffect(() => {
    requestCloseRef.current = requestClose;
  }, [requestClose]);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        requestCloseRef.current();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestCloseRef.current();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className={`nav-dropdown${className ? ` ${className}` : ""}`}
      onPointerDown={(event) => {
        pointerTypeRef.current = event.pointerType;
      }}
      onPointerEnter={(event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "touch") return;
        cancelClose();
        requestOpen();
      }}
      onPointerLeave={(event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "touch") return;
        cancelClose();
        closeTimerRef.current = setTimeout(() => requestCloseRef.current(), 70);
      }}
    >
      <button
        type="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        data-popup-open={isOpen ? "" : undefined}
        onClick={(event) => {
          cancelClose();
          const toggle = event.detail === 0 || pointerTypeRef.current === "touch";
          if (toggle && isOpen) requestClose();
          else requestOpen();
        }}
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

      <div
        role="menu"
        aria-orientation="vertical"
        aria-hidden={!isOpen}
        inert={!isOpen}
        data-open={isOpen ? "" : undefined}
        data-align={menu.align ?? "left"}
        data-direction={direction}
        style={{ "--nav-dropdown-columns": menu.columnsCount } as CSSProperties}
        className={`_4mzI4G_popup nav-dropdown-popup${popupClassName ? ` ${popupClassName}` : ""}`}
        onClick={() => {
          cancelClose();
          requestClose();
        }}
      >
        {menu.columns.map((column, columnIndex) => (
          <div
            role="group"
            className="_4mzI4G_column"
            key={`${menu.label}-${columnIndex}`}
          >
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
                <span
                  className="tOQyXa_caption-1 _4mzI4G_itemLabel"
                  data-component="Caption"
                >
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
