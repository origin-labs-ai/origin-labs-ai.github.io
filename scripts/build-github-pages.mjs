import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const assetBase = (process.env.ASSET_BASE_URL || "").replace(/\/$/, "");

if (!assetBase) {
  console.error("ASSET_BASE_URL is required (for example https://origin.vercel.app)");
  process.exit(1);
}

console.log(`Building static export (assets -> ${assetBase})`);
const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const build = spawnSync(npx, ["next", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: { ...process.env, GITHUB_PAGES: "1" },
});
if (build.error) console.error(build.error);
if (build.status !== 0) process.exit(build.status ?? 1);

const textExtensions = new Set([
  ".html",
  ".css",
  ".js",
  ".json",
  ".xml",
  ".txt",
  ".webmanifest",
  ".svg",
]);

function walk(dir, visit) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, visit);
    else visit(path);
  }
}

let rewritten = 0;
walk(outDir, (file) => {
  const ext = file.slice(file.lastIndexOf("."));
  if (!textExtensions.has(ext)) return;
  const before = readFileSync(file, "utf8");
  if (!before.includes("/sites/anthropic/")) return;
  const after = before.replaceAll("/sites/anthropic/", `${assetBase}/sites/anthropic/`);
  if (after !== before) {
    writeFileSync(file, after);
    rewritten += 1;
  }
});
console.log(`Rewrote /sites/anthropic/ asset URLs in ${rewritten} files`);

if (existsSync(join(outDir, "sites"))) {
  rmSync(join(outDir, "sites"), { recursive: true, force: true });
  console.log("Removed out/sites (served from Vercel)");
}

// GitHub Pages runs Jekyll by default, which would drop the _next directory.
writeFileSync(join(outDir, ".nojekyll"), "");

// Next.js redirects are not supported by output: "export", so emit static
// redirect pages for every source in next.config.ts.
const config = readFileSync(join(root, "next.config.ts"), "utf8");
const redirectPattern =
  /\{\s*source:\s*"([^"]+)",\s*destination:\s*"([^"]+)",\s*permanent:\s*true\s*\}/g;
let redirectCount = 0;
for (const match of config.matchAll(redirectPattern)) {
  const source = match[1];
  const destination = match[2];
  if (!source.startsWith("/")) continue;
  const target = /^https?:\/\//.test(destination) ? destination : destination;
  const dir = join(outDir, source.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${target}">
<title>Redirecting…</title>
</head>
<body>
<p>Redirecting to <a href="${target}">${target}</a>…</p>
</body>
</html>
`;
  writeFileSync(join(dir, "index.html"), html);
  redirectCount += 1;
}
console.log(`Generated ${redirectCount} static redirect pages`);

function dirSize(dir) {
  let total = 0;
  walk(dir, (file) => {
    total += statSync(file).size;
  });
  return total;
}

console.log(`Static site size: ${(dirSize(outDir) / 1024 / 1024).toFixed(1)} MB`);
