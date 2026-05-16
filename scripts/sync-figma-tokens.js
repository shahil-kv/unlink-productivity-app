#!/usr/bin/env node
/**
 * Reads Figma Local Variables (brand/ collection) and patches app/globals.css.
 * Run: npm run sync-figma
 * Requires: FIGMA_TOKEN env var (Figma personal access token)
 */

const FIGMA_FILE_KEY = "0fAHdmB6vJsyoGbSFmjm61"; // Shadcn base — update with your file key
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error("Error: FIGMA_TOKEN env var is not set.");
  console.error("Get one at figma.com → Settings → Security → Personal access tokens");
  process.exit(1);
}

async function fetchFigma(path) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    headers: { "X-Figma-Token": FIGMA_TOKEN },
  });
  if (!res.ok) throw new Error(`Figma API error: ${res.status} ${await res.text()}`);
  return res.json();
}

function hexFromRgba({ r, g, b }) {
  return (
    "#" +
    [r, g, b]
      .map((c) => Math.round(c * 255).toString(16).padStart(2, "0"))
      .join("")
  );
}

async function main() {
  const data = await fetchFigma(`/files/${FIGMA_FILE_KEY}/variables/local`);
  const variables = Object.values(data.meta?.variables ?? {});
  const collections = Object.values(data.meta?.variableCollections ?? {});
  const defaultMode = collections[0]?.modes?.[0]?.modeId;

  const tokens = {
    "--brand-bg":        null,
    "--brand-dark":      null,
    "--brand-accent":    null,
    "--brand-secondary": null,
    "--brand-border":    null,
    "--brand-surface":   null,
  };

  for (const v of variables) {
    const cssName =
      "--" +
      v.name
        .replace(/\//g, "-")
        .replace(/\s+/g, "-")
        .toLowerCase();
    if (!(cssName in tokens)) continue;
    const val = v.valuesByMode?.[defaultMode];
    if (!val) continue;
    if (v.resolvedType === "COLOR" && val.r !== undefined) {
      tokens[cssName] = hexFromRgba(val);
    } else if (v.resolvedType === "FLOAT") {
      tokens[cssName] = `${val}px`;
    }
  }

  const fs = await import("fs");
  let css = fs.readFileSync("app/globals.css", "utf8");

  for (const [key, value] of Object.entries(tokens)) {
    if (!value) continue;
    const escaped = key.replace(/[-]/g, "\\-");
    css = css.replace(
      new RegExp(`(${escaped}\\s*:\\s*)([^;]+)(;)`),
      `$1${value}$3`
    );
  }

  fs.writeFileSync("app/globals.css", css);
  const synced = Object.fromEntries(Object.entries(tokens).filter(([, v]) => v));
  console.log("Synced tokens:", synced);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
