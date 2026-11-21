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
 * instead of being removed from the page.
 */
export function placeholderHref(href: string): string {
  if (href.startsWith("/")) return isLiveHref(href) ? href : "https://~.ai";
  if (href.startsWith("http")) {
    return href.includes("claude") ? "https://~.ai" : "https://-.ai";
  }
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
