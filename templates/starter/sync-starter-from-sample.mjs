/**
 * Migrates design from samples/starter/ into tokenized templates/starter/.
 * Run: node templates/starter/sync-starter-from-sample.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildIndexHtml,
  buildAboutHtml,
  buildServicesHtml,
  buildArticlesHtml,
  buildContactHtml,
  buildArticlePostHtml,
  SUPPLEMENTAL_CSS,
  MAIN_JS_EXTRA,
} from "./sync-starter-pages.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const starterDir = __dirname;
const sampleDir = path.join(__dirname, "../../samples/starter");
const sharedDir = path.join(__dirname, "../../templates/shared");

const BUNDLE_MANIFEST = [
  { file: "tokens.json", source: "templates/shared/tokens.json", type: "shared" },
  { file: "index.html", source: "templates/starter/index.html", type: "tier" },
  { file: "services.html", source: "templates/starter/services.html", type: "tier" },
  { file: "about.html", source: "templates/starter/about.html", type: "tier" },
  { file: "articles.html", source: "templates/starter/articles.html", type: "tier" },
  { file: "article-post-1.html", source: "templates/starter/article-post-1.html", type: "tier" },
  { file: "contact.html", source: "templates/starter/contact.html", type: "tier" },
  { file: "styles.css", source: "templates/starter/styles.css", type: "tier" },
  { file: "main.js", source: "templates/starter/main.js", type: "tier" },
  { file: "robots.txt", source: "templates/starter/robots.txt", type: "tier" },
  { file: "sitemap.xml", source: "templates/starter/sitemap.xml", type: "tier" },
  { file: "netlify.toml", source: "templates/starter/netlify.toml", type: "tier" },
  { file: "_redirects", source: "templates/starter/_redirects", type: "tier" },
  { file: "favicon.svg", source: "templates/starter/favicon.svg", type: "tier" },
  { file: "humans.txt", source: "templates/starter/humans.txt", type: "tier" },
  { file: ".gitignore", source: "templates/starter/.gitignore", type: "tier" },
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeOut(relPath, content) {
  const full = path.join(starterDir, relPath);
  fs.writeFileSync(full, content, "utf8");
  return relPath;
}

function buildStyles(sampleCss) {
  let css = sampleCss
    .replace(/--copper:\s*#C96942;/, "--copper: {{BRAND_ACCENT|#C96942}};")
    .replace(
      /--copper-dim:\s*rgba\(201,105,66,0\.18\);/,
      "--copper-dim: {{BRAND_ACCENT_SOFT|rgba(201,105,66,0.18)}};"
    )
    .replace(
      /--copper-line:\s*rgba\(201,105,66,0\.30\);/,
      "--copper-line: {{BRAND_ACCENT_LINE|rgba(201,105,66,0.30)}};"
    );

  if (!css.includes(".skip-link")) {
    css += SUPPLEMENTAL_CSS;
  } else if (!css.includes("header-brand--text")) {
    css += SUPPLEMENTAL_CSS;
  }

  if (!css.includes(".form-note")) {
    css +=
      "\n.form-note { font-size: 0.82rem; color: var(--faint); line-height: 1.65; }\n";
  }

  return css.trimEnd() + "\n";
}

function buildMainJs(sampleJs) {
  if (sampleJs.includes("pathKeyFromPathname")) {
    return sampleJs;
  }
  const marker = "\n})();";
  const idx = sampleJs.lastIndexOf(marker);
  if (idx === -1) {
    throw new Error("Could not locate main.js IIFE closing in sample");
  }
  return sampleJs.slice(0, idx) + MAIN_JS_EXTRA + marker + "\n";
}

function buildBundle() {
  const parts = [];
  for (const entry of BUNDLE_MANIFEST) {
    const filePath =
      entry.type === "shared"
        ? path.join(sharedDir, entry.file)
        : path.join(starterDir, entry.file);
    const content = read(filePath);
    parts.push(
      [
        "================================================================================",
        `FILE: ${entry.file}`,
        `SOURCE: ${entry.source}`,
        `TYPE: ${entry.type}`,
        "================================================================================",
        "",
        content.trimEnd(),
        "",
      ].join("\n")
    );
  }
  return parts.join("\n").trimEnd() + "\n";
}

function main() {
  const sampleCss = read(path.join(sampleDir, "styles.css"));
  const sampleJs = read(path.join(sampleDir, "main.js"));
  const websiteTemplate = read(path.join(sampleDir, "WEBSITE_TEMPLATE.txt"));

  const generated = {
    "index.html": buildIndexHtml(),
    "about.html": buildAboutHtml(),
    "services.html": buildServicesHtml(),
    "articles.html": buildArticlesHtml(),
    "contact.html": buildContactHtml(),
    "article-post-1.html": buildArticlePostHtml(),
    "styles.css": buildStyles(sampleCss),
    "main.js": buildMainJs(sampleJs),
    "WEBSITE_TEMPLATE.txt": websiteTemplate,
  };

  for (const [name, content] of Object.entries(generated)) {
    writeOut(name, content);
  }

  writeOut("bundle.txt", buildBundle());

  console.log("sync-starter-from-sample.mjs complete\n");
  console.log("Updated files in templates/starter/:");
  for (const name of [...Object.keys(generated), "bundle.txt"]) {
    console.log("  -", name);
  }
}

main();
