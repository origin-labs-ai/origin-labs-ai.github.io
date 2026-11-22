import manifest from "@/content/pages/manifest.json";
import type {
  DropdownMenu,
  MenuPanel,
  NavColumn,
  PageRecord,
} from "@/types/content";

const livePages = new Set(
  (manifest as PageRecord[]).map((page) => page.slug),
);

export function isLiveHref(href: string): boolean {
  if (!href.startsWith("/")) return true;
  const [pathname] = href.split(/[?#]/);
  const path = pathname.replace(/^\/+|\/+$/g, "");
  if (path === "" || path === "events" || path.startsWith("events/")) {
    return true;
  }
  return livePages.has(path);
}

/**
 * Expired or unowned destinations stay visible as explicit placeholders
 * instead of being removed from the page: every one of them opens the shared
 * internal coming-soon page, wherever the link is used.
 */
export function placeholderHref(href: string): string {
  if (href.startsWith("/")) return isLiveHref(href) ? href : "/coming-soon";
  if (href.startsWith("http")) return "/coming-soon";
  return href;
}

function withPlaceholders(columns: NavColumn[]): NavColumn[] {
  return columns.map((column) => ({
    ...column,
    links: column.links.map((link) => ({
      ...link,
      href: placeholderHref(link.href),
    })),
  }));
}

export function resolveMenu(menu: DropdownMenu): DropdownMenu {
  return { ...menu, columns: withPlaceholders(menu.columns) };
}

export function resolvePanel(panel: MenuPanel): MenuPanel {
  return { ...panel, columns: withPlaceholders(panel.columns) };
}
