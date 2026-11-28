/* GitHub Pages export se UNREFERENCED heavy assets delete karta hai. Build
   me saare /sites/anthropic/... references (html/css/js/txt payloads) collect
   karke jo files kahin refer nahi ho rahi unko out/sites/ se hata deta hai —
   warna 1.3GB artifact Pages ki 1GB limit se pass nahi hota. */

import { existsSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const sitesDir = join(outDir, "sites", "anthropic");

if (!existsSync(outDir) || !existsSync(sitesDir)) {
  console.log("No out/sites/anthropic to prune, skipping");
  process.exit(0);
}

const refs = new Set();
const textExtensions = new Set([
  ".html",
  ".css",
  ".js",
  ".txt",
  ".json",
  ".xml",
  ".webmanifest",
  ".rsc",
  ".map",
]);

function collect(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      collect(path);
      continue;
    }
    const ext = path.slice(path.lastIndexOf("."));
    if (!textExtensions.has(ext)) continue;
    let text = "";
    try {
      text = readFileSync(path, "utf8");
    } catch {
      continue;
    }
    for (const m of text.matchAll(
      /\/sites\/anthropic\/[a-zA-Z0-9\-_./@]+\.[a-zA-Z0-9]{2,5}/g,
    )) {
      refs.add(m[0].replaceAll("\\", "/"));
    }
  }
}

collect(outDir);

let removed = 0;
let keptBytes = 0;
function prune(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        prune(path);
        continue;
      }
      const rel = "/" + path.slice(outDir.length + 1).replaceAll("\\", "/");
      if (refs.has(rel)) {
        keptBytes += statSync(path).size;
        continue;
      }
      rmSync(path);
      removed += 1;
    }
}

prune(sitesDir);

const mb = Math.round(keptBytes / 1048576);
console.log(
  `Pruned ${removed} unreferenced asset files; kept ${refs.size} referenced (~${mb} MB)`,
);
