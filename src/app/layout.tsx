import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home \\ Anthropic",
  description:
    "Anthropic is a public benefit corporation working to make sure transformative AI serves people and reduces risk.",
};

export const viewport: Viewport = {
  themeColor: "#faf9f5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <svg aria-hidden="true" focusable="false" className="hN4zBq_icons">
          <symbol id="tiny-more-button-close" viewBox="0 0 8 8">
            <path
              d="M7.14668 0.146596C7.34188 -0.048598 7.65844 -0.0484601 7.85372 0.146596C8.04899 0.341858 8.04899 0.658366 7.85372 0.853629L4.7072 4.00012L7.85372 7.14662C8.04898 7.34188 8.04898 7.65839 7.85372 7.85365C7.6828 8.02457 7.4189 8.0464 7.22481 7.9181L7.14668 7.85365L4.00016 4.70716L0.853637 7.85365C0.658368 8.04885 0.341842 8.04889 0.146597 7.85365C-0.0484415 7.65839 -0.0485411 7.34181 0.146597 7.14662L3.29312 4.00012L0.146597 0.853629L0.0821432 0.775504C-0.0458462 0.581447 -0.0241979 0.31739 0.146597 0.146596C0.317393 -0.0241977 0.581452 -0.0458458 0.775511 0.0821424L0.853637 0.146596L4.00016 3.29309L7.14668 0.146596Z"
              fill="currentColor"
            />
          </symbol>
          <symbol id="tiny-more-button-more" viewBox="0 0 12 2">
            <path
              d="M1 0C1.55228 0 2 0.447715 2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0ZM6 0C6.55228 0 7 0.447715 7 1C7 1.55228 6.55228 2 6 2C5.44772 2 5 1.55228 5 1C5 0.447715 5.44772 0 6 0ZM11 0C11.5523 0 12 0.447715 12 1C12 1.55228 11.5523 2 11 2C10.4477 2 10 1.55228 10 1C10 0.447715 10.4477 0 11 0Z"
              fill="currentColor"
            />
          </symbol>
        </svg>
        {children}
      </body>
    </html>
  );
}
