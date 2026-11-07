import { createWriteStream, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { join } from "node:path";

const root = process.cwd();
const assetsDir = join(root, "public", "sites", "anthropic");
const tarball = join(root, "sites-assets.tar");
const url =
  process.env.ASSETS_TARBALL_URL ||
  "https://github.com/origin-labs-ai/origin-labs-ai.github.io/releases/download/assets-v1/sites.tar";

function hasAssets() {
  if (!existsSync(assetsDir)) return false;
  try {
    return readdirSync(assetsDir).length > 0 && statSync(assetsDir).isDirectory();
  } catch {
    return false;
  }
}

if (hasAssets()) {
  console.log("Heavy assets already present, skipping download");
  process.exit(0);
}

console.log(`Downloading heavy assets from ${url}`);
mkdirSync(join(root, "public", "sites"), { recursive: true });

const response = await fetch(url);
if (!response.ok || !response.body) {
  console.error(`Asset download failed: ${response.status} ${response.statusText}`);
  process.exit(1);
}

await pipeline(Readable.fromWeb(response.body), createWriteStream(tarball));
console.log(`Downloaded ${(statSync(tarball).size / 1024 / 1024).toFixed(1)} MB`);

const extract = spawnSync("tar", ["-xf", tarball, "-C", "public"], {
  cwd: root,
  stdio: "inherit",
});
rmSync(tarball, { force: true });
if (extract.status !== 0) {
  console.error("Failed to extract asset tarball");
  process.exit(extract.status ?? 1);
}

if (!hasAssets()) {
  console.error("Assets were not extracted correctly");
  process.exit(1);
}
console.log("Heavy assets ready");
