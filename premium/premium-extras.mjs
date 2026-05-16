import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;

function relatedBlock(n) {
  const xs = [1, 2, 3, 4, 5, 6].filter((i) => i !== n);
  const lines = xs.map(
    (i) => `        <a href="service-${i}.html">{{SERVICE_${i}_NAME}}</a>`
  );
  lines.push(`        <a href="services.html">All services</a>`);
  return `      <div class="related">\n${lines.join("\n")}\n      </div>`;
}

function patchRelated(file, n) {
  let t = fs.readFileSync(path.join(root, file), "utf8");
  t = t.replace(/<div class="related">[\s\S]*?<\/div>/m, relatedBlock(n));
  fs.writeFileSync(path.join(root, file), t, "utf8");
  console.log("related:", file);
}

function cloneService(fromN, toN) {
  let t = fs.readFileSync(path.join(root, `service-${fromN}.html`), "utf8");
  const reTok = new RegExp(`SERVICE_${fromN}_`, "g");
  t = t.replace(reTok, `SERVICE_${toN}_`);
  const reHref = new RegExp(`service-${fromN}\\.html`, "g");
  t = t.replace(reHref, `service-${toN}.html`);
  fs.writeFileSync(path.join(root, `service-${toN}.html`), t, "utf8");
  console.log("clone service", toN);
}

for (const to of [4, 5, 6]) {
  cloneService(1, to);
  patchRelated(`service-${to}.html`, to);
}
for (const n of [1, 2, 3]) {
  patchRelated(`service-${n}.html`, n);
}

const localSection = `
      <section class="local-pages-section" aria-labelledby="local-pages-heading">
        <h2 id="local-pages-heading">Service-focused pages for <span>priority submarkets</span></h2>
        <p class="section-lead">{{SERVICE_AREA_LOCAL_PAGES_INTRO|These pages target how homeowners search in each area—by city plus the services you want to own. Each page uses unique, helpful copy (not duplicate templates) so search engines and visitors both see real local intent.}}</p>
        <div class="local-pages-grid">
          <a class="local-page-card" href="location-1.html">
            <span class="local-page-card__k">Local SEO</span>
            <strong>{{LOCATION_1_MENU_LABEL|Metro north}}</strong>
            <span class="local-page-card__d">{{LOCATION_1_CARD_TEASER|Roofing, storm restoration, and exterior projects with crews staged closer to this corridor.}}</span>
          </a>
          <a class="local-page-card" href="location-2.html">
            <span class="local-page-card__k">Local SEO</span>
            <strong>{{LOCATION_2_MENU_LABEL|Central corridor}}</strong>
            <span class="local-page-card__d">{{LOCATION_2_CARD_TEASER|High-demand repairs and replacements where response time and permitting familiarity matter.}}</span>
          </a>
          <a class="local-page-card" href="location-3.html">
            <span class="local-page-card__k">Local SEO</span>
            <strong>{{LOCATION_3_MENU_LABEL|South county}}</strong>
            <span class="local-page-card__d">{{LOCATION_3_CARD_TEASER|Neighborhood-focused messaging, seasonal risks, and the services you want to rank for here.}}</span>
          </a>
        </div>
      </section>
`;

const saPath = path.join(root, "service-area.html");
let sa = fs.readFileSync(saPath, "utf8");
const anchor = `      <noscript>\n        <p class="chips" style="margin-top:1.75rem"><strong>Areas:</strong> {{SERVICE_CITIES_ONE_LINE}}</p>\n      </noscript>\n\n      <div class="map"`;
if (!sa.includes("local-pages-section") && sa.includes(anchor)) {
  sa = sa.replace(anchor, `      <noscript>\n        <p class="chips" style="margin-top:1.75rem"><strong>Areas:</strong> {{SERVICE_CITIES_ONE_LINE}}</p>\n      </noscript>\n${localSection}\n      <div class="map"`);
  fs.writeFileSync(saPath, sa, "utf8");
  console.log("service-area: local pages inserted");
} else {
  console.log("service-area: skip insert", sa.includes("local-pages-section"));
}

const svcPath = path.join(root, "services.html");
let svc = fs.readFileSync(svcPath, "utf8");
const oldHub = `      <section class="svc-hub-section" aria-labelledby="svc-popular-heading">
        <div class="kicker">{{SERVICES_HUB_POPULAR_KICKER|Most popular services}}</div>
        <h2 id="svc-popular-heading">{{SERVICES_HUB_POPULAR_TITLE|Featured services (full detail pages)}}</h2>
        <p class="section-lead">{{SERVICES_HUB_POPULAR_INTRO|Each card opens a dedicated page with FAQs, process, and before/after photos.}}</p>
        <div class="svc-priority-grid">
          <a class="card svc-detail-card feature-card" href="service-1.html">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 10.5L12 4l9 6.5"/><path d="M9 21V12h6v9"/></svg></span>
            <h3>{{SERVICE_1_NAME}}</h3>
            <p>{{SERVICE_1_DESC}}</p>
            <span class="feature-lm">Learn more</span>
          </a>
          <a class="card svc-detail-card feature-card" href="service-2.html">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16"/><path d="M6 7v11a2 2 0 002 2h8a2 2 0 002-2V7"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/></svg></span>
            <h3>{{SERVICE_2_NAME}}</h3>
            <p>{{SERVICE_2_DESC}}</p>
            <span class="feature-lm">Learn more</span>
          </a>
          <a class="card svc-detail-card feature-card" href="service-3.html">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
            <h3>{{SERVICE_3_NAME}}</h3>
            <p>{{SERVICE_3_DESC}}</p>
            <span class="feature-lm">Learn more</span>
          </a>
        </div>
      </section>

      <section class="svc-hub-section" aria-labelledby="svc-core-heading">
        <div class="kicker">{{SERVICES_HUB_CORE_KICKER|Additional core services}}</div>
        <h2 id="svc-core-heading">{{SERVICES_HUB_CORE_TITLE|Core services on this hub}}</h2>
        <p class="section-lead">{{SERVICES_HUB_CORE_INTRO|Same crews and warranties—only the three cards above get full detail URLs on Enhanced.}}</p>
        <div class="svc-priority-grid">
          <article class="card feature-card">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18"/><path d="M4.5 10.5l7.5-7.5 7.5 7.5"/></svg></span>
            <h3>{{SERVICE_4_NAME}}</h3>
            <p>{{SERVICE_4_DESC}}</p>
            <a class="feature-lm" href="contact.html">Learn more</a>
          </article>
          <article class="card feature-card">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/></svg></span>
            <h3>{{SERVICE_5_NAME}}</h3>
            <p>{{SERVICE_5_DESC}}</p>
            <a class="feature-lm" href="contact.html">Learn more</a>
          </article>
          <article class="card feature-card">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3v4a1 1 0 001 1h4"/><path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"/></svg></span>
            <h3>{{SERVICE_6_NAME}}</h3>
            <p>{{SERVICE_6_DESC}}</p>
            <a class="feature-lm" href="contact.html">Learn more</a>
          </article>
        </div>
      </section>`;

const newHub = `      <section class="svc-hub-section" aria-labelledby="svc-popular-heading">
        <div class="kicker">{{SERVICES_HUB_POPULAR_KICKER|Priority service detail pages}}</div>
        <h2 id="svc-popular-heading">{{SERVICES_HUB_POPULAR_TITLE|Six full service URLs (Premium)}}</h2>
        <p class="section-lead">{{SERVICES_HUB_POPULAR_INTRO|Each card opens a dedicated page with FAQs, process, proof, and before/after photos—built on the same optimized layout as the Enhanced tier.}}</p>
        <div class="svc-priority-grid">
          <a class="card svc-detail-card feature-card" href="service-1.html">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 10.5L12 4l9 6.5"/><path d="M9 21V12h6v9"/></svg></span>
            <h3>{{SERVICE_1_NAME}}</h3>
            <p>{{SERVICE_1_DESC}}</p>
            <span class="feature-lm">Learn more</span>
          </a>
          <a class="card svc-detail-card feature-card" href="service-2.html">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16"/><path d="M6 7v11a2 2 0 002 2h8a2 2 0 002-2V7"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/></svg></span>
            <h3>{{SERVICE_2_NAME}}</h3>
            <p>{{SERVICE_2_DESC}}</p>
            <span class="feature-lm">Learn more</span>
          </a>
          <a class="card svc-detail-card feature-card" href="service-3.html">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
            <h3>{{SERVICE_3_NAME}}</h3>
            <p>{{SERVICE_3_DESC}}</p>
            <span class="feature-lm">Learn more</span>
          </a>
          <a class="card svc-detail-card feature-card" href="service-4.html">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18"/><path d="M4.5 10.5l7.5-7.5 7.5 7.5"/></svg></span>
            <h3>{{SERVICE_4_NAME}}</h3>
            <p>{{SERVICE_4_DESC}}</p>
            <span class="feature-lm">Learn more</span>
          </a>
          <a class="card svc-detail-card feature-card" href="service-5.html">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/></svg></span>
            <h3>{{SERVICE_5_NAME}}</h3>
            <p>{{SERVICE_5_DESC}}</p>
            <span class="feature-lm">Learn more</span>
          </a>
          <a class="card svc-detail-card feature-card" href="service-6.html">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3v4a1 1 0 001 1h4"/><path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"/></svg></span>
            <h3>{{SERVICE_6_NAME}}</h3>
            <p>{{SERVICE_6_DESC}}</p>
            <span class="feature-lm">Learn more</span>
          </a>
        </div>
      </section>

      <section class="svc-hub-section" aria-labelledby="svc-ext-heading">
        <div class="kicker">{{SERVICES_HUB_EXTENDED_KICKER|Hub visibility}}</div>
        <h2 id="svc-ext-heading">{{SERVICES_HUB_EXTENDED_TITLE|Services #7–#10 (overview on this hub)}}</h2>
        <p class="section-lead">{{SERVICES_HUB_EXTENDED_INTRO|These lines stay visible across the site with short blurbs here; full dedicated URLs are reserved for your top six priorities above.}}</p>
        <div class="svc-priority-grid">
          <article class="card feature-card">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18"/><path d="M4.5 10.5l7.5-7.5 7.5 7.5"/></svg></span>
            <h3>{{SERVICE_7_NAME}}</h3>
            <p>{{SERVICE_7_DESC}}</p>
            <a class="feature-lm" href="contact.html">Request scope</a>
          </article>
          <article class="card feature-card">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/></svg></span>
            <h3>{{SERVICE_8_NAME}}</h3>
            <p>{{SERVICE_8_DESC}}</p>
            <a class="feature-lm" href="contact.html">Request scope</a>
          </article>
          <article class="card feature-card">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3v4a1 1 0 001 1h4"/><path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"/></svg></span>
            <h3>{{SERVICE_9_NAME}}</h3>
            <p>{{SERVICE_9_DESC}}</p>
            <a class="feature-lm" href="contact.html">Request scope</a>
          </article>
          <article class="card feature-card">
            <span class="feature-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16"/><path d="M6 7v11a2 2 0 002 2h8a2 2 0 002-2V7"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/></svg></span>
            <h3>{{SERVICE_10_NAME}}</h3>
            <p>{{SERVICE_10_DESC}}</p>
            <a class="feature-lm" href="contact.html">Request scope</a>
          </article>
        </div>
      </section>`;

if (svc.includes(oldHub)) {
  svc = svc.replace(oldHub, newHub);
  fs.writeFileSync(svcPath, svc, "utf8");
  console.log("services.html: premium hub");
} else {
  console.log("services.html: hub pattern not found");
}

const ttPath = path.join(root, "testimonials.html");
let tt = fs.readFileSync(ttPath, "utf8");
const ttOld = `          <li><a href="service-3.html">{{SERVICE_3_NAME}}</a></li>
        </ul>`;
const ttNew = `          <li><a href="service-3.html">{{SERVICE_3_NAME}}</a></li>
          <li><a href="service-4.html">{{SERVICE_4_NAME}}</a></li>
          <li><a href="service-5.html">{{SERVICE_5_NAME}}</a></li>
          <li><a href="service-6.html">{{SERVICE_6_NAME}}</a></li>
        </ul>`;
if (tt.includes(ttOld)) {
  tt = tt.replace(ttOld, ttNew);
  fs.writeFileSync(ttPath, tt, "utf8");
  console.log("testimonials: service links 4–6");
}

const sm = `<?xml version="1.0" encoding="UTF-8"?>
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
    <loc>{{SITE_URL}}/wall-of-love</loc>
    <changefreq>monthly</changefreq>
    <priority>0.65</priority>
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
fs.writeFileSync(path.join(root, "sitemap.xml"), sm, "utf8");
console.log("sitemap.xml written");
