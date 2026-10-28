/**
 * Fails a production build that still carries bracketed placeholder copy.
 *
 * Unknown facts live in the source as bracketed text like [YEAR] or
 * [ONE-LINE BIO FOR TRACIE] (see AGENTS.md). That is fine while the site is
 * being built, but none of it should ever reach peartreecompanies.com, so this
 * runs as npm's `prebuild` step and exits non-zero on Vercel production builds
 * only. Local and preview builds just report what is still outstanding.
 *
 * Run it directly to see the current list:
 *   node scripts/check-placeholders.mjs
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SOURCE_DIR = join(ROOT, "src");
const EXTENSIONS = [".ts", ".tsx"];

/**
 * A placeholder opens with an uppercase letter and runs on in capitals, digits,
 * spaces, underscores or hyphens: [YEAR], [LAST NAME], [ONE-LINE BIO]. An
 * optional colon allows a described slot such as [PHOTO: a building lobby].
 *
 * Keeping the head of the match all-caps is what separates placeholders from
 * the bracket syntax that surrounds them in this codebase: array indexes
 * (footer[0]), TypeScript tuples ([CardFooterItem, CardFooterItem]) and
 * Tailwind arbitrary values (text-[13px], aspect-[16/7], flex-[1_1_420px]).
 */
const PLACEHOLDER = /\[[A-Z][A-Z0-9_ ,./-]+(?::[^\]\n]*)?\]/g;

/** Strips block comments and whole-line comments so prose about placeholders is allowed. */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .map((line) => (/^\s*(\/\/|\*)/.test(line) ? "" : line))
    .join("\n");
}

function sourceFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) found.push(...sourceFiles(path));
    else if (EXTENSIONS.some((extension) => entry.endsWith(extension))) found.push(path);
  }
  return found;
}

const findings = [];
for (const file of sourceFiles(SOURCE_DIR)) {
  const lines = stripComments(readFileSync(file, "utf8")).split("\n");
  lines.forEach((line, index) => {
    for (const match of line.matchAll(PLACEHOLDER)) {
      findings.push({ file: relative(ROOT, file), line: index + 1, text: match[0] });
    }
  });
}

const isProduction = process.env.VERCEL_ENV === "production";

if (findings.length === 0) {
  if (!isProduction) console.log("check-placeholders: no placeholder copy found.");
  process.exit(0);
}

const summary = `${findings.length} placeholder${findings.length === 1 ? "" : "s"}`;
const detail = findings.map(({ file, line, text }) => `  ${file}:${line}  ${text}`).join("\n");

if (!isProduction) {
  console.warn(`check-placeholders: ${summary} still in src/ (allowed outside production).\n${detail}`);
  process.exit(0);
}

console.error(
  `check-placeholders: ${summary} would ship to production.\n${detail}\n\n` +
    "Supply the real copy, or remove the element that holds it. This check only blocks " +
    "VERCEL_ENV=production; local and preview builds are unaffected.",
);
process.exit(1);
