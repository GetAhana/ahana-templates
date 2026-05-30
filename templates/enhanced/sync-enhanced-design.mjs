/**
 * Migrates templates/enhanced/ to Coal & Terracotta dark design (from templates/starter/).
 * Run: node templates/enhanced/sync-enhanced-design.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SUPPLEMENTAL_CSS } from "../starter/sync-starter-pages.mjs";
import { ENHANCED_COMPONENT_CSS } from "./enhanced-design-css.mjs";
import {
  buildIndexHtml,
  buildAboutHtml,
  buildServicesHtml,
  buildGalleryHtml,
  buildTestimonialsHtml,
  buildArticlesHtml,
  buildContactHtml,
  buildServiceAreaHtml,
  buildService1Html,
  buildService2Html,
  buildService3Html,
  buildPrivacyHtml,
  buildTermsHtml,
  build404Html,
  buildOfflineHtml,
} from "./sync-enhanced-pages.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const enhancedDir = __dirname;
const starterDir = path.join(__dirname, "../starter");
const sharedDir = path.join(__dirname, "../shared");

const BUNDLE_MANIFEST = [
  { file: "tokens.json", source: "templates/shared/tokens.json", type: "shared" },
  { file: "index.html", source: "templates/enhanced/index.html", type: "tier" },
  { file: "services.html", source: "templates/enhanced/services.html", type: "tier" },
  { file: "about.html", source: "templates/enhanced/about.html", type: "tier" },
  { file: "articles.html", source: "templates/enhanced/articles.html", type: "tier" },
  { file: "contact.html", source: "templates/enhanced/contact.html", type: "tier" },
  { file: "service-1.html", source: "templates/enhanced/service-1.html", type: "tier" },
  { file: "service-2.html", source: "templates/enhanced/service-2.html", type: "tier" },
  { file: "service-3.html", source: "templates/enhanced/service-3.html", type: "tier" },
  { file: "privacy-policy.html", source: "templates/enhanced/privacy-policy.html", type: "tier" },
  { file: "terms.html", source: "templates/enhanced/terms.html", type: "tier" },
  { file: "404.html", source: "templates/enhanced/404.html", type: "tier" },
  { file: "offline.html", source: "templates/enhanced/offline.html", type: "tier" },
  { file: "gallery.html", source: "templates/enhanced/gallery.html", type: "tier" },
  { file: "testimonials.html", source: "templates/enhanced/testimonials.html", type: "tier" },
  { file: "service-area.html", source: "templates/enhanced/service-area.html", type: "tier" },
  { file: "styles.css", source: "templates/enhanced/styles.css", type: "tier" },
  { file: "main.js", source: "templates/enhanced/main.js", type: "tier" },
  { file: "robots.txt", source: "templates/enhanced/robots.txt", type: "tier" },
  { file: "sitemap.xml", source: "templates/enhanced/sitemap.xml", type: "tier" },
  { file: "netlify.toml", source: "templates/enhanced/netlify.toml", type: "tier" },
  { file: "_redirects", source: "templates/enhanced/_redirects", type: "tier" },
  { file: "favicon.svg", source: "templates/enhanced/favicon.svg", type: "tier" },
  { file: "humans.txt", source: "templates/enhanced/humans.txt", type: "tier" },
  { file: ".gitignore", source: "templates/enhanced/.gitignore", type: "tier" },
  { file: "site.webmanifest", source: "templates/enhanced/site.webmanifest", type: "tier" },
  { file: "sw.js", source: "templates/enhanced/sw.js", type: "tier" },
  { file: "og-image.svg", source: "templates/enhanced/og-image.svg", type: "tier" },
];

const ENHANCED_MAIN_JS_EXTRA = `
  /* ── Articles hub (placeholder cards) ─────────────────── */
  function isArticleHubPlaceholder(title, excerpt) {
    var t = (title || '').toLowerCase();
    var x = (excerpt || '').toLowerCase();
    if (t.indexOf('planned topic') !== -1) return true;
    if (t.indexOf('add a page under articles') !== -1) return true;
    if (x.indexOf('planned topic') !== -1) return true;
    if (x.indexOf('add a page under articles') !== -1) return true;
    return false;
  }

  function initArticlesHub() {
    var grid = document.getElementById('ahana-articles-posts');
    var emptyEl = document.getElementById('ahana-articles-empty');
    if (!grid) return;
    var cards = grid.querySelectorAll('.js-ahana-article-card');
    var visible = 0;
    cards.forEach(function (card) {
      var url = (card.getAttribute('data-article-url') || '').trim();
      var titleEl = card.querySelector('h2');
      var title = titleEl ? titleEl.textContent.replace(/\\s+/g, ' ').trim() : '';
      var excerptEl = card.querySelector('.excerpt');
      var excerpt = excerptEl ? excerptEl.textContent.replace(/\\s+/g, ' ').trim() : '';
      var urlBad =
        !url ||
        url === '#' ||
        url.indexOf('{{') !== -1 ||
        /^javascript:/i.test(url);
      var titleBad = !title || title.indexOf('{{') !== -1;
      if (urlBad || titleBad || isArticleHubPlaceholder(title, excerpt)) {
        card.setAttribute('hidden', '');
        return;
      }
      visible++;
      card.setAttribute('href', url);
    });
    if (emptyEl) {
      emptyEl.hidden = visible !== 0;
    }
    if (visible === 0) {
      grid.setAttribute('hidden', '');
    } else {
      grid.removeAttribute('hidden');
    }
  }

  initArticlesHub();

  /* ── Image carousel ───────────────────────────────────── */
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('[data-track]');
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var idxEl = root.querySelector('[data-index]');
    var totalEl = root.querySelector('[data-total]');
    if (!track || !prev || !next || !idxEl || !totalEl) return;
    var slides = Array.from(track.children);
    if (!slides.length) return;
    var idx = 0;
    totalEl.textContent = String(slides.length);
    function render() {
      track.style.transform = 'translateX(' + -idx * 100 + '%)';
      idxEl.textContent = String(idx + 1);
    }
    prev.addEventListener('click', function () {
      idx = (idx - 1 + slides.length) % slides.length;
      render();
    });
    next.addEventListener('click', function () {
      idx = (idx + 1) % slides.length;
      render();
    });
    render();
  });

  /* ── Service worker ─────────────────────────────────────── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () {});
    });
  }
`;

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeOut(relPath, content) {
  const full = path.join(enhancedDir, relPath);
  fs.writeFileSync(full, content, "utf8");
  return relPath;
}

function buildStyles(starterCss) {
  let css = starterCss
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
  }
  css += ENHANCED_COMPONENT_CSS;
  return css.trimEnd() + "\n";
}

function buildMainJs(starterJs) {
  if (starterJs.includes("initArticlesHub")) {
    return starterJs;
  }
  const marker = "\n})();";
  const idx = starterJs.lastIndexOf(marker);
  if (idx === -1) {
    throw new Error("Could not locate main.js IIFE closing in starter");
  }
  return starterJs.slice(0, idx) + ENHANCED_MAIN_JS_EXTRA + marker + "\n";
}

function buildBundle() {
  const parts = [];
  for (const entry of BUNDLE_MANIFEST) {
    const filePath =
      entry.type === "shared"
        ? path.join(sharedDir, entry.file)
        : path.join(enhancedDir, entry.file);
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

function countTokensInDir(dir) {
  const tok = new Set();
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".html")) continue;
    const c = read(path.join(dir, f));
    for (const m of c.matchAll(/\{\{([^}]+)\}\}/g)) tok.add(m[1]);
  }
  return tok.size;
}

function lineCount(filePath) {
  return read(filePath).split("\n").length;
}

function main() {
  const starterCss = read(path.join(starterDir, "styles.css"));
  const starterJs = read(path.join(starterDir, "main.js"));
  const starterSpec = read(path.join(starterDir, "WEBSITE_TEMPLATE.txt"));

  const websiteTemplate =
    starterSpec.trimEnd() +
    `

────────────────────────────────────────────────────────────────────────────────
ENHANCED TIER — ADDITIONAL PAGES (beyond starter)
────────────────────────────────────────────────────────────────────────────────

Files (in addition to starter core):
  gallery.html, testimonials.html, service-area.html (Leaflet map),
  service-1.html, service-2.html, service-3.html,
  privacy-policy.html, terms.html, 404.html, offline.html

Navigation (extensionless URLs via _redirects):
  Home, Services, Gallery, Testimonials, About, Articles, Service Area
  Contact via header CTA (Get Estimate + phone), not always in nav list.

Index home:
  Full-bleed hero with {{HERO_IMAGE_URL}}, 6-service grid (service-1/2/3 + contact for 4–6),
  gallery carousel [data-carousel], testimonials preview, FAQ accordion.

Services hub:
  Three linked detail cards → /service-1, /service-2, /service-3
  Services 4–6 → /contact

Articles:
  Hub #ahana-articles-posts with .js-ahana-article-card and data-article-url tokens.

Service area:
  #service-area-map, Leaflet CSS in head, inline map script preserved.

Shell module: templates/shared/coal-design-shell.mjs
Sync: node templates/enhanced/sync-enhanced-design.mjs
`;

  const generated = {
    "index.html": buildIndexHtml(),
    "about.html": buildAboutHtml(),
    "services.html": buildServicesHtml(),
    "gallery.html": buildGalleryHtml(),
    "testimonials.html": buildTestimonialsHtml(),
    "articles.html": buildArticlesHtml(),
    "contact.html": buildContactHtml(),
    "service-area.html": buildServiceAreaHtml(),
    "service-1.html": buildService1Html(),
    "service-2.html": buildService2Html(),
    "service-3.html": buildService3Html(),
    "privacy-policy.html": buildPrivacyHtml(),
    "terms.html": buildTermsHtml(),
    "404.html": build404Html(),
    "offline.html": buildOfflineHtml(),
    "styles.css": buildStyles(starterCss),
    "main.js": buildMainJs(starterJs),
    "WEBSITE_TEMPLATE.txt": websiteTemplate + "\n",
  };

  for (const [name, content] of Object.entries(generated)) {
    writeOut(name, content);
  }

  writeOut("bundle.txt", buildBundle());

  const tokenCount = countTokensInDir(enhancedDir);
  const filesWritten = Object.keys(generated).concat(["bundle.txt"]);

  console.log("sync-enhanced-design.mjs complete\n");
  console.log("Updated files in templates/enhanced/:");
  for (const name of filesWritten) {
    const p = path.join(enhancedDir, name);
    const lines = fs.existsSync(p) ? lineCount(p) : 0;
    console.log(`  - ${name} (${lines} lines)`);
  }
  console.log(`\nUnique {{TOKEN}} placeholders in HTML: ${tokenCount}`);
}

main();
