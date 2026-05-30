/**
 * Migrates templates/premium/ to Coal & Terracotta dark design.
 * Run: node templates/premium/sync-premium-design.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SUPPLEMENTAL_CSS } from "../starter/sync-starter-pages.mjs";
import { ENHANCED_COMPONENT_CSS } from "../enhanced/enhanced-design-css.mjs";
import { PREMIUM_COMPONENT_CSS } from "./premium-design-css.mjs";
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
  buildService4Html,
  buildService5Html,
  buildService6Html,
  buildLocation1Html,
  buildLocation2Html,
  buildLocation3Html,
  buildPrivacyHtml,
  buildTermsHtml,
  build404Html,
  buildOfflineHtml,
  buildReviewsHtml,
} from "./sync-premium-pages.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const premiumDir = __dirname;
const starterDir = path.join(__dirname, "../starter");
const enhancedDir = path.join(__dirname, "../enhanced");
const sharedDir = path.join(__dirname, "../shared");

const BUNDLE_MANIFEST = [
  { file: "tokens.json", source: "templates/shared/tokens.json", type: "shared" },
  { file: "index.html", source: "templates/premium/index.html", type: "tier" },
  { file: "services.html", source: "templates/premium/services.html", type: "tier" },
  { file: "about.html", source: "templates/premium/about.html", type: "tier" },
  { file: "articles.html", source: "templates/premium/articles.html", type: "tier" },
  { file: "contact.html", source: "templates/premium/contact.html", type: "tier" },
  { file: "service-1.html", source: "templates/premium/service-1.html", type: "tier" },
  { file: "service-2.html", source: "templates/premium/service-2.html", type: "tier" },
  { file: "service-3.html", source: "templates/premium/service-3.html", type: "tier" },
  { file: "service-4.html", source: "templates/premium/service-4.html", type: "tier" },
  { file: "service-5.html", source: "templates/premium/service-5.html", type: "tier" },
  { file: "service-6.html", source: "templates/premium/service-6.html", type: "tier" },
  { file: "location-1.html", source: "templates/premium/location-1.html", type: "tier" },
  { file: "location-2.html", source: "templates/premium/location-2.html", type: "tier" },
  { file: "location-3.html", source: "templates/premium/location-3.html", type: "tier" },
  { file: "privacy-policy.html", source: "templates/premium/privacy-policy.html", type: "tier" },
  { file: "terms.html", source: "templates/premium/terms.html", type: "tier" },
  { file: "404.html", source: "templates/premium/404.html", type: "tier" },
  { file: "offline.html", source: "templates/premium/offline.html", type: "tier" },
  { file: "gallery.html", source: "templates/premium/gallery.html", type: "tier" },
  { file: "testimonials.html", source: "templates/premium/testimonials.html", type: "tier" },
  { file: "service-area.html", source: "templates/premium/service-area.html", type: "tier" },
  { file: "reviews.html", source: "templates/premium/reviews.html", type: "tier" },
  { file: "styles.css", source: "templates/premium/styles.css", type: "tier" },
  { file: "main.js", source: "templates/premium/main.js", type: "tier" },
  { file: "ahana-service-area-map.js", source: "templates/premium/ahana-service-area-map.js", type: "tier" },
  { file: "robots.txt", source: "templates/premium/robots.txt", type: "tier" },
  { file: "sitemap.xml", source: "templates/premium/sitemap.xml", type: "tier" },
  { file: "netlify.toml", source: "templates/premium/netlify.toml", type: "tier" },
  { file: "_redirects", source: "templates/premium/_redirects", type: "tier" },
  { file: "favicon.svg", source: "templates/premium/favicon.svg", type: "tier" },
  { file: "humans.txt", source: "templates/premium/humans.txt", type: "tier" },
  { file: ".gitignore", source: "templates/premium/.gitignore", type: "tier" },
  { file: "site.webmanifest", source: "templates/premium/site.webmanifest", type: "tier" },
  { file: "sw.js", source: "templates/premium/sw.js", type: "tier" },
  { file: "og-image.svg", source: "templates/premium/og-image.svg", type: "tier" },
];

const PREMIUM_MAIN_JS_EXTRA = `
  /* ── Service area nav dropdown (desktop) ─────────────── */
  document.querySelectorAll('.nav-dd-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var panel = document.getElementById(trigger.getAttribute('aria-controls') || '');
      var open = trigger.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.nav-dd-trigger').forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
      });
      document.querySelectorAll('.nav-dd-panel').forEach(function (p) {
        p.classList.remove('is-open');
      });
      if (!open && panel) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.classList.add('is-open');
      }
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-dd-trigger').forEach(function (t) {
      t.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.nav-dd-panel').forEach(function (p) {
      p.classList.remove('is-open');
    });
  });

  /* ── Nav active: service area + location pages ───────── */
  (function () {
    var pathKey = pathKeyFromPathname(window.location.pathname);
    if (pathKey === 'service-area' || /^location-[123]$/.test(pathKey)) {
      var trig = document.querySelector('.nav-dd-trigger');
      if (trig) trig.setAttribute('aria-current', 'page');
    }
    document.querySelectorAll('.nav-dd-panel a').forEach(function (a) {
      var h = a.getAttribute('href');
      if (!h) return;
      try {
        var file = pathKeyFromPathname(new URL(h, window.location.href).pathname);
        if (file === pathKey) a.setAttribute('aria-current', 'page');
      } catch (err) {}
    });
    document.querySelectorAll('.nav-menu-link--sub').forEach(function (a) {
      var h = a.getAttribute('href');
      if (!h) return;
      try {
        var file = pathKeyFromPathname(new URL(h, window.location.href).pathname);
        if (file === pathKey) a.setAttribute('aria-current', 'page');
      } catch (err) {}
    });
  })();
`;

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>{{SITE_URL}}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/articles</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/gallery</loc>
    <changefreq>monthly</changefreq>
    <priority>0.72</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/testimonials</loc>
    <changefreq>monthly</changefreq>
    <priority>0.72</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/service-area</loc>
    <changefreq>monthly</changefreq>
    <priority>0.82</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/location-1</loc>
    <changefreq>monthly</changefreq>
    <priority>0.78</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/location-2</loc>
    <changefreq>monthly</changefreq>
    <priority>0.78</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/location-3</loc>
    <changefreq>monthly</changefreq>
    <priority>0.78</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/service-1</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/service-2</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/service-3</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/service-4</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/service-5</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/service-6</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/privacy-policy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.35</priority>
  </url>
  <url>
    <loc>{{SITE_URL}}/terms</loc>
    <changefreq>yearly</changefreq>
    <priority>0.35</priority>
  </url>
</urlset>
`;

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeOut(relPath, content) {
  const full = path.join(premiumDir, relPath);
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
  css += PREMIUM_COMPONENT_CSS;
  return css.trimEnd() + "\n";
}

function buildMainJs(enhancedJs) {
  if (enhancedJs.includes("nav-dd-trigger")) {
    return enhancedJs;
  }
  const marker = "\n})();";
  const idx = enhancedJs.lastIndexOf(marker);
  if (idx === -1) {
    throw new Error("Could not locate main.js IIFE closing in enhanced");
  }
  return enhancedJs.slice(0, idx) + PREMIUM_MAIN_JS_EXTRA + marker + "\n";
}

function buildBundle() {
  const parts = [];
  for (const entry of BUNDLE_MANIFEST) {
    const filePath =
      entry.type === "shared"
        ? path.join(sharedDir, entry.file)
        : path.join(premiumDir, entry.file);
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
  const enhancedJs = read(path.join(enhancedDir, "main.js"));
  const enhancedSpec = read(path.join(enhancedDir, "WEBSITE_TEMPLATE.txt"));

  const websiteTemplate =
    enhancedSpec.trimEnd() +
    `

────────────────────────────────────────────────────────────────────────────────
PREMIUM TIER — ADDITIONAL PAGES (beyond enhanced)
────────────────────────────────────────────────────────────────────────────────

Files (in addition to enhanced core):
  service-4.html, service-5.html, service-6.html,
  location-1.html, location-2.html, location-3.html,
  reviews.html (301 redirect to testimonials),
  ahana-service-area-map.js (Leaflet map helper)

Navigation:
  Same as Enhanced plus Service Area dropdown:
    Coverage map, {{LOCATION_1_MENU_LABEL}}, {{LOCATION_2_MENU_LABEL}}, {{LOCATION_3_MENU_LABEL}}
  Mobile overlay includes service area subgroup.

Services hub:
  Six full detail cards (service-1 … service-6) plus Services #7–#10 overview band.

Service area:
  Local SEO landing cards → /location-1, /location-2, /location-3
  Map via ahana-service-area-map.js with {{MAP_CENTER_LAT}}, {{MAP_CENTER_LNG}}.

Index home:
  All six service tiles link to dedicated service pages (not contact).

Shell module: templates/shared/coal-design-shell.mjs
Sync: node templates/premium/sync-premium-design.mjs
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
    "service-4.html": buildService4Html(),
    "service-5.html": buildService5Html(),
    "service-6.html": buildService6Html(),
    "location-1.html": buildLocation1Html(),
    "location-2.html": buildLocation2Html(),
    "location-3.html": buildLocation3Html(),
    "reviews.html": buildReviewsHtml(),
    "privacy-policy.html": buildPrivacyHtml(),
    "terms.html": buildTermsHtml(),
    "404.html": build404Html(),
    "offline.html": buildOfflineHtml(),
    "styles.css": buildStyles(starterCss),
    "main.js": buildMainJs(enhancedJs),
    "sitemap.xml": SITEMAP_XML,
    "WEBSITE_TEMPLATE.txt": websiteTemplate + "\n",
  };

  for (const [name, content] of Object.entries(generated)) {
    writeOut(name, content);
  }

  writeOut("bundle.txt", buildBundle());

  const htmlFiles = fs.readdirSync(premiumDir).filter((f) => f.endsWith(".html"));
  const tokenCount = countTokensInDir(premiumDir);
  const filesWritten = Object.keys(generated).concat(["bundle.txt"]);

  console.log("sync-premium-design.mjs complete\n");
  console.log("Updated files in templates/premium/:");
  for (const name of filesWritten) {
    const p = path.join(premiumDir, name);
    const lines = fs.existsSync(p) ? lineCount(p) : 0;
    console.log(`  - ${name} (${lines} lines)`);
  }
  console.log(`\nHTML pages: ${htmlFiles.length}`);
  console.log(`Unique {{TOKEN}} placeholders in HTML: ${tokenCount}`);
}

main();
