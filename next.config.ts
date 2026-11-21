import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const isGithubPages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
  ...(isGithubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        output: process.env.VERCEL ? undefined : ("standalone" as const),
        async headers() {
          return [
            {
              source: "/sites/:path*",
              headers: [
                { key: "Access-Control-Allow-Origin", value: "*" },
              ],
            },
          ];
        },
      }),
  devIndicators: false,
};

export default nextConfig;
