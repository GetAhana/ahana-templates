/** Page builders for enhanced tier (Coal & Terracotta shell) */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  faqItem,
  shellHead,
  shellFooterEnhanced,
  shellScripts,
  pageWrap,
  minimalPageWrap,
} from "../shared/coal-design-shell.mjs";
import { ENHANCED_HOME_HERO_HTML } from "./enhanced-home-hero.mjs";
import {
  aggregateRatingField,
  reviewLdScript,
  ENHANCED_HOME_FAQ_LD,
  ENHANCED_SERVICES_FAQ_LD,
  ABOUT_FAQ_LD,
  BREADCRUMB_HOME,
  BREADCRUMB_SERVICES,
  BREADCRUMB_ABOUT,
  serviceLdBlock,
  webPageDateModifiedLd,
} from "../shared/schema-blocks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVICE_AREA_MAP_SCRIPT = fs.readFileSync(
  path.join(__dirname, "service-area-map.inline.js"),
  "utf8"
);

const gallerySlides = () =>
  Array.from({ length: 10 }, (_, i) => {
    const n = i + 1;
    return `          <div class="c-item"><img src="{{GALLERY_${n}_URL}}" alt="{{GALLERY_${n}_ALT}}" loading="lazy" /></div>`;
  }).join("\n");

const carouselBlock = () => `      <div class="carousel" data-carousel data-reveal>
        <div class="c-track" data-track>
${gallerySlides()}
        </div>
        <div class="c-nav">
          <button type="button" class="c-btn" data-prev>Prev</button>
          <div class="c-meta"><span data-index>1</span> / <span data-total>10</span></div>
          <button type="button" class="c-btn" data-next>Next</button>
        </div>
      </div>`;

function buildServicePage(num) {
  const head = shellHead({
    title: `{{SERVICE_${num}_SEO_TITLE}}`,
    description: `{{SERVICE_${num}_META_DESCRIPTION}}`,
    canonical: `{{SITE_URL}}/service-${num}`,
    ogUrl: `{{SITE_URL}}/service-${num}`,
    extraHead: `
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Service",
    "name":"{{SERVICE_${num}_NAME}}",
    "serviceType":"{{SERVICE_${num}_NAME}}",
    "description":"{{SERVICE_${num}_SCHEMA_DESCRIPTION}}",
    "provider":{"@type":"LocalBusiness","name":"{{BUSINESS_NAME}}","telephone":"{{PHONE_NUMBER_E164}}","url":"{{SITE_URL}}"},
    "areaServed":{{AREA_SERVED_JSON}}
  }
  </script>`,
  });

  const others = [1, 2, 3].filter((x) => x !== num);
  const relatedLinks = others
    .map(
      (x) =>
        `        <a href="/service-${x}">{{SERVICE_${x}_NAME}}</a>`
    )
    .join("\n");

  const main = `
    <section class="section service-page">
      <div class="container">
        <p class="page-kicker">{{SERVICE_${num}_NAME}}</p>
        <h1 data-reveal-heading>{{SERVICE_${num}_H1}}</h1>
        <div class="hook" data-reveal>{{SERVICE_${num}_INTRO}}</div>

        <h2 data-reveal-heading>{{SERVICE_${num}_SPECS_HEADLINE}}</h2>
        <div class="specs" data-reveal>{{SERVICE_${num}_SPECS_HTML}}</div>
        <div class="service-proof-callout" role="note" aria-label="At a glance" data-reveal>
          <span class="proof-mark" aria-hidden="true"></span>
          <p class="proof">{{SERVICE_${num}_PROOF_LINE}}</p>
        </div>

        <details class="acc-block" data-reveal>
          <summary>How we handle {{SERVICE_${num}_NAME}}</summary>
          <div class="acc-inner">
            <p>{{SERVICE_${num}_PROCESS_INTRO}}</p>
            <ul class="detail-list">
              <li><strong>{{SERVICE_${num}_STEP_1_TITLE}}</strong> — {{SERVICE_${num}_STEP_1_BODY}}</li>
              <li><strong>{{SERVICE_${num}_STEP_2_TITLE}}</strong> — {{SERVICE_${num}_STEP_2_BODY}}</li>
              <li><strong>{{SERVICE_${num}_STEP_3_TITLE}}</strong> — {{SERVICE_${num}_STEP_3_BODY}}</li>
            </ul>
          </div>
        </details>

        <details class="acc-block" data-reveal>
          <summary>When to call us</summary>
          <div class="acc-inner">
            <p>{{SERVICE_${num}_SIGNS_INTRO}}</p>
            <ul class="detail-list">
              <li>{{SERVICE_${num}_SIGN_1}}</li>
              <li>{{SERVICE_${num}_SIGN_2}}</li>
              <li>{{SERVICE_${num}_SIGN_3}}</li>
              <li>{{SERVICE_${num}_SIGN_4}}</li>
              <li>{{SERVICE_${num}_SIGN_5}}</li>
            </ul>
          </div>
        </details>

        <h2 data-reveal-heading>Before &amp; after <span class="accent">({{SERVICE_${num}_NAME}})</span></h2>
        <p class="section-sub" data-reveal>{{SERVICE_${num}_GALLERY_INTRO}}</p>
        <div class="ba" data-reveal>
          <figure class="shot">
            <img src="{{SERVICE_${num}_BEFORE_IMG_URL}}" alt="{{SERVICE_${num}_BEFORE_IMG_ALT}}" loading="lazy" />
            <figcaption>Before</figcaption>
          </figure>
          <figure class="shot">
            <img src="{{SERVICE_${num}_AFTER_IMG_URL}}" alt="{{SERVICE_${num}_AFTER_IMG_ALT}}" loading="lazy" />
            <figcaption>After</figcaption>
          </figure>
        </div>

        <h2 data-reveal-heading>What homeowners <span class="accent">say</span></h2>
        <p class="section-sub" data-reveal>{{SERVICE_${num}_TESTIMONIALS_INTRO}}</p>
        <div class="wall" data-reveal-stagger>
          <article class="card" data-stagger-item>
            <blockquote>“{{SERVICE_${num}_TESTIMONIAL_1_TEXT}}”</blockquote>
            <div class="by">{{SERVICE_${num}_TESTIMONIAL_1_NAME}} <span>· {{SERVICE_${num}_TESTIMONIAL_1_CITY}}</span></div>
          </article>
          <article class="card" data-stagger-item>
            <blockquote>“{{SERVICE_${num}_TESTIMONIAL_2_TEXT}}”</blockquote>
            <div class="by">{{SERVICE_${num}_TESTIMONIAL_2_NAME}} <span>· {{SERVICE_${num}_TESTIMONIAL_2_CITY}}</span></div>
          </article>
        </div>

        <h2 data-reveal-heading style="margin-top:2.5rem">FAQ — <span class="accent">{{SERVICE_${num}_NAME}}</span></h2>
        <div class="faq-block" data-reveal>
${faqItem(`{{SERVICE_${num}_FAQ_Q1}}`, `{{SERVICE_${num}_FAQ_A1}}`)}
${faqItem(`{{SERVICE_${num}_FAQ_Q2}}`, `{{SERVICE_${num}_FAQ_A2}}`)}
${faqItem(`{{SERVICE_${num}_FAQ_Q3}}`, `{{SERVICE_${num}_FAQ_A3}}`)}
        </div>

        <h2 data-reveal-heading style="margin-top:2.5rem">Related <span class="accent">services</span></h2>
        <p class="section-sub" data-reveal>{{SERVICE_${num}_RELATED_INTRO}}</p>
        <div class="related" data-reveal>
${relatedLinks}
        <a href="/services">All services</a>
        </div>
      </div>
    </section>

  <div class="sticky-cta-bar" role="region" aria-label="Quick contact">
    <a class="btn btn-ghost" href="/contact">Get free estimate</a>
    <a class="btn btn-primary" href="tel:{{PHONE_NUMBER_E164}}">Call {{PHONE_NUMBER}}</a>
  </div>`;

  return pageWrap(head, main, "", shellScripts());
}

export function buildIndexHtml() {
  const head = shellHead({
    title: "{{BUSINESS_NAME}} | {{PRIMARY_KEYWORD_1}} in {{CITY}}",
    description: "{{META_DESCRIPTION_FROM_IMAGES}}",
    canonical: "{{SITE_URL}}/",
    ogUrl: "{{SITE_URL}}/",
    ogImage: "{{SITE_URL}}/og-image.svg",
    preloadHero: true,
    extraHead: `
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"LocalBusiness",
    "name":"{{BUSINESS_NAME}}",
    "telephone":"{{PHONE_NUMBER_E164}}",
    "url":"{{SITE_URL}}",
    "address":{"@type":"PostalAddress","streetAddress":"{{ADDRESS_LINE_1}}","addressLocality":"{{CITY}}","addressRegion":"{{STATE}}","postalCode":"{{ZIP}}"},
    "areaServed": {{AREA_SERVED_JSON}}{{JSON_LD_LOGO_ENTRY}}${aggregateRatingField()}
  }
  </script>
  ${serviceLdBlock()}
  ${reviewLdScript(1)}
  ${reviewLdScript(2)}
  ${reviewLdScript(3)}
  ${ENHANCED_HOME_FAQ_LD}
  ${BREADCRUMB_HOME}
  ${webPageDateModifiedLd('"{{SITE_URL}}/"', '"{{BUSINESS_NAME}} | {{PRIMARY_KEYWORD_1}} in {{CITY}}"')}`,
  });

  const svcTile = (n, href) => `        <a class="svc-tile" href="${href}" data-stagger-item>
          <h3>{{SERVICE_${n}_NAME}}</h3>
          <p>{{SERVICE_${n}_DESC}}</p>
        </a>`;

  const main = `
${ENHANCED_HOME_HERO_HTML}

    <div class="trust-bar">
      <div class="trust-row">
        <div class="trust-item"><b>Licensed</b> &amp; insured</div>
        <div class="trust-item"><b>Financing</b> available</div>
        <div class="trust-item"><b>Emergency</b> service</div>
        <div class="trust-item"><b>Upfront</b> pricing</div>
        <div class="trust-item"><b>Local</b> crew</div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <p class="enh-label" data-reveal>{{HOME_SERVICES_SECTION_KICKER|Services}}</p>
        <h2 class="enh-title" data-reveal-heading>The services that drive the most calls<br/><span>in {{CITY}}</span></h2>
        <p class="enh-body" data-reveal>{{HOME_SERVICES_INTRO|These are the jobs we run most weeks for local homeowners—each summary explains what we check on site, how we price common scopes, and what good looks like when we are done. Open the full services hub for timelines, FAQs, and deeper detail on every line.}}</p>
        <div class="svc-grid svc-grid--6" data-reveal-stagger>
${svcTile(1, "/service-1")}
${svcTile(2, "/service-2")}
${svcTile(3, "/service-3")}
${svcTile(4, "/contact")}
${svcTile(5, "/contact")}
${svcTile(6, "/contact")}
        </div>
        <div style="margin-top:2rem" data-reveal>
          <a class="btn btn-primary" href="/services">See all services →</a>
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <p class="enh-label" data-reveal>How it works</p>
        <h2 class="enh-title" data-reveal-heading>A simple process with<br/><span>no surprises</span></h2>
        <p class="enh-body" data-reveal>Homeowners want clarity. Here’s how we take you from “problem” to “done” fast.</p>
        <div class="steps-row" data-reveal-stagger>
          <div class="step-cell" data-stagger-item>
            <div class="step-num">1</div>
            <h3>Call or request an estimate</h3>
            <p>Tell us what’s going on. We’ll confirm availability and schedule a time that works.</p>
          </div>
          <div class="step-cell" data-stagger-item>
            <div class="step-num">2</div>
            <h3>Inspection + clear plan</h3>
            <p>We inspect, take photos, and explain options. You get straightforward pricing and timelines.</p>
          </div>
          <div class="step-cell" data-stagger-item>
            <div class="step-num">3</div>
            <h3>Complete the job</h3>
            <p>Clean crews, quality materials, and a final walkthrough. We stand behind our work.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="enh-label" data-reveal>Our work</p>
        <h2 class="enh-title" data-reveal-heading>Real projects in and around<br/><span>{{CITY}}</span></h2>
        <p class="enh-body" data-reveal>A short carousel of recent projects—before/after shots and the details homeowners care about.</p>
${carouselBlock()}
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <p class="enh-label" data-reveal>Service area</p>
        <h2 class="enh-title" data-reveal-heading>Serving {{CITY}} and nearby<br/><span>cities</span></h2>
        <p class="enh-body" data-reveal>If you’re near {{CITY}}, there’s a good chance we can help. We serve: {{SERVICE_CITIES_ONE_LINE}}.</p>
        <div class="area-split-panels" data-reveal>
          <div class="area-panel">
            <h3>What you can expect</h3>
            <div class="area-list">
              <div class="li">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75"/></svg>
                <span><strong>Upfront pricing</strong> and a clear scope before work begins</span>
              </div>
              <div class="li">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75"/></svg>
                <span><strong>Fast scheduling</strong> with prioritized dispatch for urgent issues</span>
              </div>
              <div class="li">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75"/></svg>
                <span><strong>Clean job sites</strong> and a final walkthrough</span>
              </div>
            </div>
          </div>
          <div class="area-panel area-panel--cta">
            <h3>Get a free estimate</h3>
            <p style="color:var(--muted);margin-top:.55rem;line-height:1.75">Call now or request an estimate online. We’ll confirm details and next steps.</p>
            <div style="margin-top:1rem;display:flex;flex-direction:column;gap:.65rem">
              <a class="btn btn-primary" href="tel:{{PHONE_NUMBER_E164}}">{{PHONE_NUMBER}}</a>
              <a class="btn btn-outline" href="/contact">Request estimate →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="enh-label" data-reveal>Testimonials</p>
        <h2 class="enh-title" data-reveal-heading>Trusted by homeowners in<br/><span>{{CITY}}</span></h2>
        <p class="enh-body" data-reveal>Here’s what customers say after the job is done. Read more on the Testimonials page.</p>
        <div class="testi-preview-grid" data-reveal-stagger>
          <div class="card" data-stagger-item><h3>{{TESTIMONIAL_1_NAME}}</h3><p>“{{TESTIMONIAL_1_TEXT}}”</p><div class="card-meta">{{TESTIMONIAL_1_CITY}}</div></div>
          <div class="card" data-stagger-item><h3>{{TESTIMONIAL_2_NAME}}</h3><p>“{{TESTIMONIAL_2_TEXT}}”</p><div class="card-meta">{{TESTIMONIAL_2_CITY}}</div></div>
          <div class="card" data-stagger-item><h3>{{TESTIMONIAL_3_NAME}}</h3><p>“{{TESTIMONIAL_3_TEXT}}”</p><div class="card-meta">{{TESTIMONIAL_3_CITY}}</div></div>
        </div>
        <div style="margin-top:2rem" data-reveal>
          <a class="btn btn-primary" href="/testimonials">Read more testimonials →</a>
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <p class="enh-label" data-reveal>FAQ</p>
        <h2 class="enh-title" data-reveal-heading>Quick answers before you<br/><span>call</span></h2>
        <p class="enh-body" data-reveal>These are the most common questions we get from customers in {{CITY}}.</p>
        <div class="faq-block" data-reveal>
${faqItem("Do you offer emergency service?", "{{EMERGENCY_FAQ_ANSWER}}")}
${faqItem("How fast can you come out?", "{{SCHEDULING_FAQ_ANSWER}}")}
${faqItem("Do you provide free estimates?", "{{ESTIMATE_FAQ_ANSWER}}")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-section-dark" data-reveal>
          <p class="enh-label">Get started</p>
          <h2 class="enh-title">Talk to a local pro<br/><span>today</span></h2>
          <p class="enh-body">{{CTA_INTRO}}</p>
          <div style="margin-top:1.5rem;display:flex;gap:.85rem;flex-wrap:wrap">
            <a class="btn btn-primary btn-lg" href="tel:{{PHONE_NUMBER_E164}}">Call {{PHONE_NUMBER}}</a>
            <a class="btn btn-outline btn-lg" href="/contact">Request an estimate</a>
          </div>
        </div>
      </div>
    </section>`;

  return pageWrap(head, main, shellFooterEnhanced({ includeHours: true }), shellScripts());
}

export function buildAboutHtml() {
  const head = shellHead({
    title: "{{ABOUT_PAGE_TITLE}}",
    description: "{{ABOUT_META_DESCRIPTION}}",
    canonical: "{{SITE_URL}}/about",
    ogUrl: "{{SITE_URL}}/about",
    extraHead: `
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"LocalBusiness",
    "name":"{{BUSINESS_NAME}}",
    "telephone":"{{PHONE_NUMBER_E164}}",
    "url":"{{SITE_URL}}/about",
    "address":{"@type":"PostalAddress","streetAddress":"{{ADDRESS_LINE_1}}","addressLocality":"{{CITY}}","addressRegion":"{{STATE}}","postalCode":"{{ZIP}}"}{{JSON_LD_LOGO_ENTRY}}
  }
  </script>`,
  });

  const main = `
    <section class="section depth-page">
      <div class="container">
        <div class="about-hero" data-reveal>
          <div class="about-hero-copy">
            <p class="enh-label">{{ABOUT_SECTION_KICKER}}</p>
            <h1>{{ABOUT_H1_LINE_1}}<br /><span class="accent">{{ABOUT_H1_ACCENT}}</span></h1>
            <p class="sub">{{ABOUT_LEAD}}</p>
          </div>
          <aside class="depth-aside about-pullquote" aria-label="Leadership quote">
            <p class="depth-quote">{{ABOUT_MISSION_PULL_QUOTE}}</p>
            <p class="depth-attr"><strong>{{ABOUT_MISSION_PULL_QUOTE_NAME}}</strong> · {{ABOUT_MISSION_PULL_QUOTE_BYLINE}}</p>
          </aside>
        </div>

        <section class="about-story" aria-labelledby="about-mission-heading">
          <p class="enh-label">{{ABOUT_MISSION_SECTION_KICKER}}</p>
          <h2 id="about-mission-heading" data-reveal-heading>{{ABOUT_MISSION_H2_LINE_1}}<br /><span class="accent">{{ABOUT_MISSION_H2_ACCENT}}</span></h2>
          <div class="about-prose" data-reveal>
            <p>{{ABOUT_MISSION_P1}}</p>
            <p>{{ABOUT_MISSION_P2}}</p>
            <p>{{ABOUT_MISSION_P3}}</p>
          </div>
        </section>

        <div class="depth-h">
          <p class="enh-label">{{ABOUT_VALUES_SECTION_KICKER}}</p>
          <h2 data-reveal-heading>{{ABOUT_VALUES_H2_LINE_1}}<br /><span class="accent">{{ABOUT_VALUES_H2_ACCENT}}</span></h2>
        </div>
        <div class="values-6" data-reveal-stagger>
          <div class="depth-val" data-stagger-item><span class="depth-vn" aria-hidden="true">01</span><h3>{{ABOUT_VALUE_TILE_1_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_1_BODY}}</p></div>
          <div class="depth-val" data-stagger-item><span class="depth-vn" aria-hidden="true">02</span><h3>{{ABOUT_VALUE_TILE_2_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_2_BODY}}</p></div>
          <div class="depth-val" data-stagger-item><span class="depth-vn" aria-hidden="true">03</span><h3>{{ABOUT_VALUE_TILE_3_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_3_BODY}}</p></div>
          <div class="depth-val" data-stagger-item><span class="depth-vn" aria-hidden="true">04</span><h3>{{ABOUT_VALUE_TILE_4_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_4_BODY}}</p></div>
          <div class="depth-val" data-stagger-item><span class="depth-vn" aria-hidden="true">05</span><h3>{{ABOUT_VALUE_TILE_5_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_5_BODY}}</p></div>
          <div class="depth-val" data-stagger-item><span class="depth-vn" aria-hidden="true">06</span><h3>{{ABOUT_VALUE_TILE_6_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_6_BODY}}</p></div>
        </div>

        <div class="depth-h">
          <p class="enh-label">{{ABOUT_SERVE_SECTION_KICKER}}</p>
          <h2 data-reveal-heading>{{ABOUT_SERVE_H2_LINE_1}}<br /><span class="accent">{{ABOUT_SERVE_H2_ACCENT}}</span></h2>
          <p class="sub">{{ABOUT_SERVE_INTRO}}</p>
          <div class="grid-auto" data-reveal-stagger>
            <div class="card" data-stagger-item><h3>{{ABOUT_SERVE_CARD_1_TITLE}}</h3><p>{{ABOUT_SERVE_CARD_1_BODY}}</p><div class="tag">{{ABOUT_SERVE_CARD_1_TAG}}</div></div>
            <div class="card" data-stagger-item><h3>{{ABOUT_SERVE_CARD_2_TITLE}}</h3><p>{{ABOUT_SERVE_CARD_2_BODY}}</p><div class="tag">{{ABOUT_SERVE_CARD_2_TAG}}</div></div>
            <div class="card" data-stagger-item><h3>{{ABOUT_SERVE_CARD_3_TITLE}}</h3><p>{{ABOUT_SERVE_CARD_3_BODY}}</p><div class="tag">{{ABOUT_SERVE_CARD_3_TAG}}</div></div>
          </div>
        </div>

        <div class="depth-h">
          <p class="enh-label">{{ABOUT_FAQ_SECTION_KICKER}}</p>
          <h2 data-reveal-heading>{{ABOUT_FAQ_H2_LINE_1}}<br /><span class="accent">{{ABOUT_FAQ_H2_ACCENT}}</span></h2>
          <div class="faq-block" data-reveal>
${faqItem("{{ABOUT_FAQ_1_QUESTION}}", "{{ABOUT_FAQ_1_ANSWER}}")}
${faqItem("{{ABOUT_FAQ_2_QUESTION}}", "{{ABOUT_FAQ_2_ANSWER}}")}
${faqItem("{{ABOUT_FAQ_3_QUESTION}}", "{{ABOUT_FAQ_3_ANSWER}}")}
          </div>
        </div>

        <div class="cta-band" data-reveal style="margin-top:3rem">
          <div>
            <h2>{{ABOUT_CTA_HEADLINE}}</h2>
            <p class="section-sub">{{ABOUT_CTA_SUB}}</p>
          </div>
          <div class="cta-band-actions">
            <a class="btn btn-primary btn-lg" href="/contact">{{ABOUT_CTA_PRIMARY_LABEL}}</a>
            <a class="btn btn-ghost btn-lg" href="/services">{{ABOUT_CTA_SECONDARY_LABEL}}</a>
          </div>
        </div>
      </div>
    </section>`;

  return pageWrap(head, main, shellFooterEnhanced({ includeHours: true }), shellScripts());
}

const svcHubCard = (n, href) => `            <a class="svc-detail-card" href="${href}" data-stagger-item>
              <h3>{{SERVICE_${n}_NAME}}</h3>
              <p>{{SERVICE_${n}_DESC}}</p>
              <span class="feature-lm">Learn more</span>
            </a>`;

const svcRow = (n, name, body, tag) => `          <div class="svc-row" data-stagger-item>
            <span class="svc-n">${n}</span>
            <div><h3>${name}</h3><p>${body}</p></div>
            <span class="svc-tag">${tag}</span>
          </div>`;

/** Starter-parity depth sections (grid, problems, visit flow, why choose, FAQ, CTA). */
const servicesStarterDepthSections = () => `
    <section class="section">
      <div class="container">
        <p class="enh-label">{{SERVICES_GRID_SECTION_KICKER}}</p>
        <h2 data-reveal-heading>{{SERVICES_GRID_H2_LINE_1}} <span class="accent">{{SERVICES_GRID_H2_ACCENT}}</span></h2>
        <p class="section-sub" data-reveal>{{SERVICES_GRID_INTRO}}</p>
        <div class="svc-list" data-reveal-stagger>
${svcRow("01", "{{SERVICE_1_NAME}}", "{{SERVICE_1_LONG}}", "{{SERVICE_1_TAG}}")}
${svcRow("02", "{{SERVICE_2_NAME}}", "{{SERVICE_2_LONG}}", "{{SERVICE_2_TAG}}")}
${svcRow("03", "{{SERVICE_3_NAME}}", "{{SERVICE_3_LONG}}", "{{SERVICE_3_TAG}}")}
${svcRow("04", "{{SERVICE_4_NAME}}", "{{SERVICE_4_LONG}}", "{{SERVICE_4_TAG}}")}
${svcRow("05", "{{SERVICE_5_NAME}}", "{{SERVICE_5_LONG}}", "{{SERVICE_5_TAG}}")}
${svcRow("06", "{{SERVICE_6_NAME}}", "{{SERVICE_6_LONG}}", "{{SERVICE_6_TAG}}")}
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <p class="enh-label">{{SERVICES_PROBLEM_SECTION_KICKER}}</p>
        <h2 data-reveal-heading>{{SERVICES_PROBLEM_H2_LINE_1}} <span class="accent">{{SERVICES_PROBLEM_H2_ACCENT}}</span></h2>
        <div class="depth-quad" data-reveal-stagger>
          <div class="depth-tile" data-stagger-item><div class="depth-n" aria-hidden="true">01</div><span class="depth-chip">{{SERVICES_PROBLEM_TILE_1_CHIP}}</span><h3>{{SERVICES_PROBLEM_TILE_1_TITLE}}</h3><p>{{SERVICES_PROBLEM_TILE_1_BODY}}</p></div>
          <div class="depth-tile alt" data-stagger-item><div class="depth-n" aria-hidden="true">02</div><span class="depth-chip">{{SERVICES_PROBLEM_TILE_2_CHIP}}</span><h3>{{SERVICES_PROBLEM_TILE_2_TITLE}}</h3><p>{{SERVICES_PROBLEM_TILE_2_BODY}}</p></div>
          <div class="depth-tile alt" data-stagger-item><div class="depth-n" aria-hidden="true">03</div><span class="depth-chip">{{SERVICES_PROBLEM_TILE_3_CHIP}}</span><h3>{{SERVICES_PROBLEM_TILE_3_TITLE}}</h3><p>{{SERVICES_PROBLEM_TILE_3_BODY}}</p></div>
          <div class="depth-tile" data-stagger-item><div class="depth-n" aria-hidden="true">04</div><span class="depth-chip">{{SERVICES_PROBLEM_TILE_4_CHIP}}</span><h3>{{SERVICES_PROBLEM_TILE_4_TITLE}}</h3><p>{{SERVICES_PROBLEM_TILE_4_BODY}}</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="enh-label">{{SERVICES_VISIT_SECTION_KICKER}}</p>
        <h2 data-reveal-heading>{{SERVICES_VISIT_H2_LINE_1}} <span class="accent">{{SERVICES_VISIT_H2_ACCENT}}</span></h2>
        <div class="process-6" data-reveal-stagger>
          <div class="pl6-step" data-stagger-item><em>{{SERVICES_VISIT_STEP_1_LABEL}}</em><h3>{{SERVICES_VISIT_STEP_1_TITLE}}</h3><p>{{SERVICES_VISIT_STEP_1_BODY}}</p></div>
          <div class="pl6-step" data-stagger-item><em>{{SERVICES_VISIT_STEP_2_LABEL}}</em><h3>{{SERVICES_VISIT_STEP_2_TITLE}}</h3><p>{{SERVICES_VISIT_STEP_2_BODY}}</p></div>
          <div class="pl6-step" data-stagger-item><em>{{SERVICES_VISIT_STEP_3_LABEL}}</em><h3>{{SERVICES_VISIT_STEP_3_TITLE}}</h3><p>{{SERVICES_VISIT_STEP_3_BODY}}</p></div>
          <div class="pl6-step" data-stagger-item><em>{{SERVICES_VISIT_STEP_4_LABEL}}</em><h3>{{SERVICES_VISIT_STEP_4_TITLE}}</h3><p>{{SERVICES_VISIT_STEP_4_BODY}}</p></div>
          <div class="pl6-step" data-stagger-item><em>Step 5</em><h3>{{PROCESS_STEP_1_TITLE}}</h3><p>{{PROCESS_STEP_1_BODY}}</p></div>
          <div class="pl6-step" data-stagger-item><em>Step 6</em><h3>{{PROCESS_STEP_2_TITLE}}</h3><p>{{PROCESS_STEP_2_BODY}}</p></div>
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <p class="enh-label">{{SERVICES_WHY_SECTION_KICKER}}</p>
        <h2 data-reveal-heading>{{SERVICES_WHY_H2_LINE_1}} <span class="accent">{{SERVICES_WHY_H2_ACCENT}}</span></h2>
        <div class="why-grid" data-reveal-stagger>
          <div class="why-cell" data-stagger-item><h3>{{ABOUT_VALUE_TILE_1_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_1_BODY}}</p><div class="card-tag">{{WHY_CHOOSE_1_TAG}}</div></div>
          <div class="why-cell" data-stagger-item><h3>{{ABOUT_VALUE_TILE_2_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_2_BODY}}</p><div class="card-tag">{{WHY_CHOOSE_2_TAG}}</div></div>
          <div class="why-cell" data-stagger-item><h3>{{ABOUT_VALUE_TILE_3_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_3_BODY}}</p><div class="card-tag">{{WHY_CHOOSE_3_TAG}}</div></div>
        </div>
        <p style="margin-top:2.25rem" data-reveal>
          <a href="/about" class="area-link">{{SERVICES_WHY_STORY_LINK_LABEL}}</a>
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="enh-label">{{SERVICES_FAQ_SECTION_KICKER}}</p>
        <div class="faq-block" data-reveal>
${faqItem("{{SERVICES_FAQ_1_QUESTION}}", "{{SERVICES_FAQ_1_ANSWER}}")}
${faqItem("{{SERVICES_FAQ_2_QUESTION}}", "{{SERVICES_FAQ_2_ANSWER}}")}
${faqItem("{{SERVICES_FAQ_3_QUESTION}}", "{{SERVICES_FAQ_3_ANSWER}}")}
        </div>
      </div>
    </section>

    <section class="section" style="padding-bottom:7rem">
      <div class="container">
        <div class="cta-band" data-reveal>
          <div>
            <h2>{{SERVICES_CTA_HEADLINE}}</h2>
            <p class="section-sub">{{SERVICES_CTA_SUB}}</p>
          </div>
          <div class="cta-band-actions">
            <a class="btn btn-primary btn-lg" href="/contact">{{SERVICES_CTA_PRIMARY_LABEL}}</a>
            <a class="btn btn-ghost btn-lg" href="tel:{{PHONE_NUMBER_E164}}">{{SERVICES_CTA_SECONDARY_LABEL}}</a>
          </div>
        </div>
      </div>
    </section>`;

export function buildServicesHtml() {
  const head = shellHead({
    title: "{{SERVICES_PAGE_TITLE}}",
    description: "{{SERVICES_META_DESCRIPTION}}",
    canonical: "{{SITE_URL}}/services",
    ogUrl: "{{SITE_URL}}/services",
    extraHead: `
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Service",
    "provider":{"@type":"LocalBusiness","name":"{{BUSINESS_NAME}}"},
    "areaServed": {{AREA_SERVED_JSON}},
    "hasOfferCatalog":{
      "@type":"OfferCatalog",
      "name":"{{SERVICES_OFFER_CATALOG_NAME}}",
      "itemListElement":[
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"{{SERVICE_1_NAME}}"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"{{SERVICE_2_NAME}}"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"{{SERVICE_3_NAME}}"}}
      ]
    }
  }
  </script>`,
  });

  const main = `
    <div class="page-hero">
      <div class="container">
        <p class="enh-label">{{SERVICES_SECTION_KICKER}}</p>
        <h1>{{SERVICES_H1_LINE_1}} <span class="accent">{{SERVICES_H1_ACCENT}}</span></h1>
        <p class="section-sub">{{SERVICES_INTRO}}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <section class="svc-hub-section" aria-labelledby="svc-popular-heading">
          <p class="enh-label">{{SERVICES_HUB_POPULAR_KICKER|Most popular services}}</p>
          <h2 id="svc-popular-heading" data-reveal-heading>{{SERVICES_HUB_POPULAR_TITLE|Featured services (full detail pages)}}</h2>
          <p class="section-sub" data-reveal>{{SERVICES_HUB_POPULAR_INTRO|Each card opens a dedicated page with FAQs, process, and before/after photos.}}</p>
          <div class="svc-priority-grid" data-reveal-stagger>
${svcHubCard(1, "/service-1")}
${svcHubCard(2, "/service-2")}
${svcHubCard(3, "/service-3")}
          </div>
        </section>

        <section class="svc-hub-section" aria-labelledby="svc-core-heading">
          <p class="enh-label">{{SERVICES_HUB_CORE_KICKER|Additional core services}}</p>
          <h2 id="svc-core-heading" data-reveal-heading>{{SERVICES_HUB_CORE_TITLE|Core services on this hub}}</h2>
          <p class="section-sub" data-reveal>{{SERVICES_HUB_CORE_INTRO|Same crews and warranties—only the three cards above get full detail URLs on Enhanced.}}</p>
          <div class="svc-priority-grid" data-reveal-stagger>
${svcHubCard(4, "/contact")}
${svcHubCard(5, "/contact")}
${svcHubCard(6, "/contact")}
          </div>
        </section>

        <section class="svc-add-more" aria-labelledby="additional-services-heading">
          <p class="enh-label">Additional services</p>
          <h2 class="svc-more-h2" id="additional-services-heading">{{ADDITIONAL_SERVICES_TITLE|Other work we handle}}</h2>
          <p class="section-sub">{{ADDITIONAL_SERVICES_INTRO|Not sure which line fits? Call or text photos—we match scope to the right crew.}}</p>
          <ul class="svc-additional-list">
            {{ADDITIONAL_SERVICES_LIST_ITEMS}}
          </ul>
        </section>
      </div>
    </section>
${servicesStarterDepthSections()}

  <div class="sticky-svc-cta" role="region" aria-label="Quick estimate">
    <a class="sticky-svc-primary" href="/contact">Get free estimate</a>
    <a class="sticky-svc-call" href="tel:{{PHONE_NUMBER_E164}}">Call {{PHONE_NUMBER}}</a>
  </div>`;

  return pageWrap(head, main, shellFooterEnhanced({ includeHours: true }), shellScripts());
}

export function buildGalleryHtml() {
  const head = shellHead({
    title: "{{BUSINESS_NAME}} Gallery | {{CITY}}, {{STATE}}",
    description: "{{GALLERY_META_DESCRIPTION_FROM_IMAGES}}",
    canonical: "{{SITE_URL}}/gallery",
    ogUrl: "{{SITE_URL}}/gallery",
  });

  const main = `
    <div class="page-hero">
      <div class="container">
        <p class="enh-label">Gallery</p>
        <h1>Real Work in <span class="accent">{{CITY}}</span></h1>
        <p class="section-sub">{{GALLERY_INTRO|A few recent projects—before/after shots, detail work, and cleanup standards.}}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
${carouselBlock()}
        <section class="gallery-after" aria-labelledby="gallery-primary-heading" data-reveal>
          <h2 id="gallery-primary-heading"><span class="accent">{{PRIMARY_SERVICE}}</span> in {{CITY}}</h2>
          <p class="section-sub">{{SERVICES_INTRO|Clear scopes, photo documentation, and crews who keep the site clean from tear-off to final walkthrough.}}</p>
          <div class="gallery-cta-row">
            <a class="btn btn-primary btn-lg" href="tel:{{PHONE_NUMBER_E164}}">Call {{PHONE_NUMBER}}</a>
            <a class="btn btn-outline btn-lg" href="/contact">Get a free estimate →</a>
          </div>
        </section>
      </div>
    </section>`;

  return pageWrap(head, main, shellFooterEnhanced(), shellScripts());
}

export function buildTestimonialsHtml() {
  const head = shellHead({
    title: "{{TESTIMONIALS_PAGE_LABEL|Testimonials}} | {{BUSINESS_NAME}}",
    description:
      "{{TESTIMONIALS_META_DESCRIPTION|Read real homeowner feedback for {{BUSINESS_NAME}} in {{CITY}}, {{STATE}}.}}",
    canonical: "{{SITE_URL}}/testimonials",
    ogUrl: "{{SITE_URL}}/testimonials",
  });

  const main = `
    <div class="page-hero">
      <div class="container">
        <p class="enh-label">{{TESTIMONIALS_PAGE_LABEL|Testimonials}}</p>
        <h1>Trusted by <span class="accent">{{CITY}}</span> Homeowners</h1>
        <p class="section-sub">{{TESTIMONIALS_INTRO|Read recent feedback from homeowners who wanted clear options, clean crews, and documented work.}}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <section class="wall" data-reveal-stagger>
          <article class="card" data-testimonial-card data-stagger-item>
            <blockquote>“{{TESTIMONIALS_WALL_1_TEXT}}”</blockquote>
            <div class="by">{{TESTIMONIAL_1_NAME}} <span>· {{TESTIMONIAL_1_CITY}}</span></div>
          </article>
          <article class="card" data-testimonial-card data-stagger-item>
            <blockquote>“{{TESTIMONIALS_WALL_2_TEXT}}”</blockquote>
            <div class="by">{{TESTIMONIAL_2_NAME}} <span>· {{TESTIMONIAL_2_CITY}}</span></div>
          </article>
          <article class="card" data-testimonial-card data-stagger-item>
            <blockquote>“{{TESTIMONIALS_WALL_3_TEXT}}”</blockquote>
            <div class="by">{{TESTIMONIAL_3_NAME}} <span>· {{TESTIMONIAL_3_CITY}}</span></div>
          </article>
          <article class="card" data-testimonial-card data-stagger-item>
            <blockquote>“{{TESTIMONIALS_WALL_4_TEXT}}”</blockquote>
            <div class="by">{{TESTIMONIAL_4_NAME}} <span>· {{TESTIMONIAL_4_CITY}}</span></div>
          </article>
          <article class="card" data-testimonial-card data-stagger-item>
            <blockquote>“{{TESTIMONIALS_WALL_5_TEXT}}”</blockquote>
            <div class="by">{{TESTIMONIAL_5_NAME}} <span>· {{TESTIMONIAL_5_CITY}}</span></div>
          </article>
        </section>

        <section class="tts-services" aria-labelledby="tts-services-h2" data-reveal>
          <p class="tts-services-k">{{TESTIMONIALS_SERVICES_CTA_KICKER|Services}}</p>
          <h2 id="tts-services-h2" class="tts-services-h2">{{TESTIMONIALS_SERVICES_CTA_HEADLINE|Explore the services behind these homeowner stories}}</h2>
          <p class="section-sub">{{TESTIMONIALS_SERVICES_CTA_BODY|Reviews capture the experience—our services page breaks down scopes, materials, and what to expect for {{PRIMARY_SERVICE}} work across {{CITY}}. Follow the links for full write-ups, FAQs, and next steps.}}</p>
          <ul class="tts-services-links">
            <li><a href="/service-1">{{SERVICE_1_NAME}}</a></li>
            <li><a href="/service-2">{{SERVICE_2_NAME}}</a></li>
            <li><a href="/service-3">{{SERVICE_3_NAME}}</a></li>
          </ul>
          <div style="margin-top:1.25rem">
            <a class="btn btn-primary" href="/services">{{TESTIMONIALS_SERVICES_CTA_BUTTON|Browse all services and options}}</a>
          </div>
        </section>
      </div>
    </section>`;

  return pageWrap(head, main, shellFooterEnhanced(), shellScripts());
}

export function buildArticlesHtml() {
  const head = shellHead({
    title: "{{BUSINESS_NAME}} Articles | {{PRIMARY_SERVICE}} Tips in {{CITY}}, {{STATE}}",
    description: "{{BLOG_META_DESCRIPTION}}",
    canonical: "{{SITE_URL}}/articles",
    ogUrl: "{{SITE_URL}}/articles",
  });

  const main = `
    <div class="page-hero">
      <div class="container">
        <p class="enh-label">Articles</p>
        <h1>{{PRIMARY_SERVICE}} Advice for <span class="accent">{{CITY}}</span> Homeowners</h1>
        <p class="section-sub">{{BLOG_INTRO}}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="posts" id="ahana-articles-posts" data-reveal-stagger>
          <a class="post js-ahana-article-card" href="#" data-article-url="{{ARTICLE_1_URL}}" aria-labelledby="article-1" data-stagger-item>
            <div class="top">
              <div class="tag">{{ARTICLE_1_CATEGORY}}</div>
              <div class="meta">{{ARTICLE_1_DATE}}</div>
            </div>
            <h2 id="article-1">{{ARTICLE_1_TITLE}}</h2>
            <p class="excerpt">{{ARTICLE_1_EXCERPT}}</p>
          </a>
          <a class="post js-ahana-article-card" href="#" data-article-url="{{ARTICLE_2_URL}}" aria-labelledby="article-2" data-stagger-item>
            <div class="top">
              <div class="tag">{{ARTICLE_2_CATEGORY}}</div>
              <div class="meta">{{ARTICLE_2_DATE}}</div>
            </div>
            <h2 id="article-2">{{ARTICLE_2_TITLE}}</h2>
            <p class="excerpt">{{ARTICLE_2_EXCERPT}}</p>
          </a>
          <a class="post js-ahana-article-card" href="#" data-article-url="{{ARTICLE_3_URL}}" aria-labelledby="article-3" data-stagger-item>
            <div class="top">
              <div class="tag">{{ARTICLE_3_CATEGORY}}</div>
              <div class="meta">{{ARTICLE_3_DATE}}</div>
            </div>
            <h2 id="article-3">{{ARTICLE_3_TITLE}}</h2>
            <p class="excerpt">{{ARTICLE_3_EXCERPT}}</p>
          </a>
        </div>
        <p id="ahana-articles-empty" class="ahana-articles-empty" role="status" hidden>We're preparing helpful articles for homeowners in {{CITY}}. Check back soon.</p>
      </div>
    </section>`;

  return pageWrap(head, main, shellFooterEnhanced(), shellScripts());
}

export function buildContactHtml() {
  const head = shellHead({
    title: "{{CONTACT_PAGE_TITLE|Contact}} | {{BUSINESS_NAME}}",
    description: "{{CONTACT_META_DESCRIPTION}}",
    canonical: "{{SITE_URL}}/contact",
    ogUrl: "{{SITE_URL}}/contact",
  });

  const main = `
    <div class="page-hero">
      <div class="container">
        <p class="enh-label">Contact</p>
        <h1>Fast Quotes in <span class="accent">{{CITY}}</span></h1>
        <p class="section-sub">{{CONTACT_LEAD}}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="contact-enh-grid" data-reveal>
          <section class="contact-enh-card">
            <h2>Call</h2>
            <p>{{CONTACT_CALL_COPY}}</p>
            <a class="big" href="tel:{{PHONE_NUMBER_E164}}">{{PHONE_NUMBER}}</a>
            <p style="margin-top:1rem;color:var(--muted);line-height:1.65"><strong>Hours:</strong> {{BUSINESS_HOURS}}<br><strong>Email:</strong> {{EMAIL}}<br><strong>Address:</strong> {{ADDRESS_ONE_LINE}}</p>
          </section>
          <section class="contact-enh-card">
            <h2>Request a Quote</h2>
            <p style="margin:0;color:var(--muted)">{{CONTACT_FORM_INTRO}}</p>
            <div id="form">
              <div class="row">
                <div>
                  <label for="n">Name *</label>
                  <input id="n" type="text" required>
                </div>
                <div>
                  <label for="ph">Phone *</label>
                  <input id="ph" type="tel" required>
                </div>
              </div>
              <label for="sv">Service Needed *</label>
              <select id="sv" required>
                <option value="" disabled selected>Choose…</option>
                <option>{{SERVICE_1_NAME}}</option>
                <option>{{SERVICE_2_NAME}}</option>
                <option>{{SERVICE_3_NAME}}</option>
                <option>{{SERVICE_4_NAME}}</option>
                <option>{{SERVICE_5_NAME}}</option>
                <option>{{SERVICE_6_NAME}}</option>
                <option>Other</option>
              </select>
              <div class="row">
                <div>
                  <label for="z">Zip *</label>
                  <input id="z" type="text" maxlength="5" required>
                </div>
                <div>
                  <label for="t">Timing</label>
                  <select id="t">
                    <option>ASAP</option>
                    <option>This Week</option>
                    <option>Within a Month</option>
                  </select>
                </div>
              </div>
              <label for="d">Details</label>
              <textarea id="d" rows="3"></textarea>
              <button type="button" onclick="send(event)">Send Request →</button>
            </div>
            <div id="ok">Request received — we’ll contact you soon.</div>
          </section>
        </div>
      </div>
    </section>

  <script>
    function send(e){
      e.preventDefault();
      const n=document.getElementById('n').value.trim();
      const ph=document.getElementById('ph').value.trim();
      const sv=document.getElementById('sv').value;
      const z=document.getElementById('z').value.trim();
      if(!n||!ph||!sv||!z){alert('Please fill in required fields.');return;}
      document.getElementById('form').style.display='none';
      document.getElementById('ok').style.display='block';
    }
  </script>`;

  return pageWrap(head, main, shellFooterEnhanced({ includeHours: true }), shellScripts());
}

export function buildServiceAreaHtml() {
  const head = shellHead({
    title: "{{BUSINESS_NAME}} Service Area | {{CITY}}, {{STATE}}",
    description: "{{SERVICE_AREA_META_DESCRIPTION}}",
    canonical: "{{SITE_URL}}/service-area",
    ogUrl: "{{SITE_URL}}/service-area",
    extraHead: `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css" crossorigin="" />`,
  });

  const main = `
    <div class="page-hero">
      <div class="container">
        <p class="enh-label">{{SERVICE_AREA_PAGE_LABEL|Service Area}}</p>
        <h1>Serving <span class="accent">{{SERVICE_AREA_SHORT}}</span></h1>
        <p class="section-sub">{{SERVICE_AREA_INTRO}}</p>
        <p class="sa-prose">{{SERVICE_AREA_SEO_PARAGRAPH_1|From the city core to the suburbs we mark on the map, homeowners call us for primary trade work they can schedule with confidence. Each pin reflects a community where we answer emergency calls, book inspections, and return for documented repairs—not one-off estimates that never follow through.}}</p>
        <p class="sa-prose">{{SERVICE_AREA_SEO_PARAGRAPH_2|Whether you need a targeted fix after storm damage or a full replacement with upgraded materials, crews familiar with local codes and weather patterns reduce callbacks. Use the map above to confirm we run trucks in your neighborhood, then follow the service links below for scopes, FAQs, and timelines.}}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="chips" id="service-area-chips" role="list" aria-label="Communities served"></div>
        <script type="application/json" id="svc-cities-json">{{SERVICE_CITIES}}</script>
        <span id="ahana-svc-cities-one-line" hidden aria-hidden="true">{{SERVICE_CITIES_ONE_LINE}}</span>
        <span id="ahana-city-fallback" hidden aria-hidden="true">{{CITY}}</span>
        <noscript>
          <p class="chips" style="margin-top:1.75rem"><strong>Areas:</strong> {{SERVICE_CITIES_ONE_LINE}}</p>
        </noscript>

        <div class="map" id="area-map-wrap">
          <div id="service-area-map" role="img" aria-label="Map centered on {{BUSINESS_NAME}} showing combined service coverage area"></div>
        </div>
        <span id="biz-name-for-map" hidden>{{BUSINESS_NAME}}</span>

        <section class="sa-cross" aria-labelledby="sa-cross-h2" data-reveal>
          <h2 id="sa-cross-h2" class="sa-cross-h2">{{SERVICE_AREA_CROSS_H2|Service coverage tied to the work we perform}}</h2>
          <p class="sa-cross-intro">{{SERVICE_AREA_CROSS_INTRO|Match your town with the programs we run most often in your metro area. Each page lists FAQs, process steps, and photo-ready examples so you know what we recommend before we arrive.}}</p>
          <div class="sa-xgrid" data-reveal-stagger>
            <article class="sa-xcard" data-stagger-item>
              <h3><a href="/service-1">{{SERVICE_1_NAME}}</a></h3>
              <p>{{SERVICE_AREA_CROSS_CARD_1_BODY|Homeowners in our mapped service towns choose this flagship program when wind, hail, or age shows up on inspections—especially where attic ventilation and decking matter. We document findings, explain repair vs replacement, and schedule crews who already know local suppliers.}}</p>
              <a class="sa-xcard-lm" href="/service-1">View {{SERVICE_1_NAME}} details</a>
            </article>
            <article class="sa-xcard" data-stagger-item>
              <h3><a href="/service-2">{{SERVICE_2_NAME}}</a></h3>
              <p>{{SERVICE_AREA_CROSS_CARD_2_BODY|If gutters, flashing, or wall transitions are failing, we scope this line of work with photos you can share with insurance or HOAs. Expect clear pricing bands, realistic timelines, and crews who protect landscaping while we work.}}</p>
              <a class="sa-xcard-lm" href="/service-2">View {{SERVICE_2_NAME}} details</a>
            </article>
            <article class="sa-xcard" data-stagger-item>
              <h3><a href="/service-3">{{SERVICE_3_NAME}}</a></h3>
              <p>{{SERVICE_AREA_CROSS_CARD_3_BODY|For long-term performance in local heat and storm cycles, this upgrade path ties materials to code-ready installs. We align underlayment, ridge details, and manufacturer specs so work survives the next inspection cycle.}}</p>
              <a class="sa-xcard-lm" href="/service-3">View {{SERVICE_3_NAME}} details</a>
            </article>
          </div>
        </section>

        <section class="sa-hub" aria-labelledby="sa-hub-h2" data-reveal>
          <p class="sa-hub-k">{{SERVICE_AREA_HUB_CTA_KICKER|All services}}</p>
          <h2 id="sa-hub-h2" class="sa-hub-h2">{{SERVICE_AREA_HUB_CTA_HEADLINE|Compare every option in one place}}</h2>
          <p class="section-sub">{{SERVICE_AREA_HUB_CTA_BODY|The full services hub stacks priority work, add-ons, and neighborhood-specific notes so you can plan upgrades without guessing. Start there if you are weighing multiple scopes or want a single call to coordinate the next steps.}}</p>
          <div class="sa-hub-actions">
            <a class="btn btn-primary" href="/services">{{SERVICE_AREA_HUB_CTA_BUTTON|Open the full services hub}}</a>
            <a class="btn btn-outline" href="/contact">{{SERVICE_AREA_HUB_CTA_SECONDARY|Request a local estimate}}</a>
          </div>
        </section>

        <script type="application/json" id="area-markers-json">{{SERVICE_AREA_MAP_MARKERS_JSON}}</script>
        <script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>
        ${SERVICE_AREA_MAP_SCRIPT}
      </div>
    </section>`;

  return pageWrap(head, main, shellFooterEnhanced(), shellScripts());
}

export function buildPrivacyHtml() {
  const head = shellHead({
    title: "Privacy Policy | {{BUSINESS_NAME}}",
    description: "{{PRIVACY_META_DESCRIPTION}}",
    canonical: "{{SITE_URL}}/privacy-policy",
    ogUrl: "{{SITE_URL}}/privacy-policy",
  });

  const main = `
    <section class="section legal-page">
      <div class="container">
        <p class="enh-label">Legal</p>
        <h1>Privacy Policy</h1>
        <p>{{PRIVACY_INTRO}}</p>
        <h2>Information we collect</h2>
        <p>{{PRIVACY_COLLECTION}}</p>
        <ul>
          <li>{{PRIVACY_BULLET_1}}</li>
          <li>{{PRIVACY_BULLET_2}}</li>
          <li>{{PRIVACY_BULLET_3}}</li>
        </ul>
        <h2>How we use information</h2>
        <p>{{PRIVACY_USE}}</p>
        <h2>Contact</h2>
        <p>Questions about this policy: <a href="mailto:{{EMAIL}}">{{EMAIL}}</a> · {{PHONE_NUMBER}}</p>
        <footer class="legal-inline-footer">
          <p><a href="/terms">Terms of Use</a> · <a href="/">Home</a></p>
        </footer>
      </div>
    </section>`;

  return pageWrap(head, main, "", shellScripts());
}

export function buildTermsHtml() {
  const head = shellHead({
    title: "Terms of Use | {{BUSINESS_NAME}}",
    description: "{{TERMS_META_DESCRIPTION}}",
    canonical: "{{SITE_URL}}/terms",
    ogUrl: "{{SITE_URL}}/terms",
  });

  const main = `
    <section class="section legal-page">
      <div class="container">
        <p class="enh-label">Legal</p>
        <h1>Terms of Use</h1>
        <p>{{TERMS_INTRO}}</p>
        <h2>Website use</h2>
        <p>{{TERMS_WEBSITE_USE}}</p>
        <h2>Estimates &amp; scheduling</h2>
        <p>{{TERMS_ESTIMATES}}</p>
        <h2>Limitation of liability</h2>
        <p>{{TERMS_LIABILITY}}</p>
        <h2>Contact</h2>
        <p>{{BUSINESS_NAME}} · <a href="mailto:{{EMAIL}}">{{EMAIL}}</a> · {{PHONE_NUMBER}}</p>
        <footer class="legal-inline-footer">
          <p><a href="/privacy-policy">Privacy Policy</a> · <a href="/">Home</a></p>
        </footer>
      </div>
    </section>`;

  return pageWrap(head, main, "", shellScripts());
}

export function build404Html() {
  const head = shellHead({
    title: "Page not found | {{BUSINESS_NAME}}",
    description: "{{ERROR_404_MESSAGE}}",
    canonical: "{{SITE_URL}}/404",
    ogUrl: "{{SITE_URL}}/404",
    robots: "noindex",
    twitter: false,
  });

  const main = `
    <p class="enh-label">404</p>
    <h1>That page isn’t here.</h1>
    <p>{{ERROR_404_MESSAGE}}</p>
    <p class="minimal-code">{{SITE_URL}}</p>
    <div class="minimal-actions">
      <a class="btn btn-primary" href="/">Back to home</a>
    </div>`;

  return minimalPageWrap(head, main, shellScripts());
}

export function buildOfflineHtml() {
  const head = shellHead({
    title: "Offline | {{BUSINESS_NAME}}",
    description: "{{OFFLINE_MESSAGE}}",
    canonical: "{{SITE_URL}}/offline",
    ogUrl: "{{SITE_URL}}/offline",
    robots: "noindex",
    twitter: false,
  });

  const main = `
    <h1>You’re offline</h1>
    <p>{{OFFLINE_MESSAGE}}</p>
    <div class="minimal-actions">
      <a class="btn btn-primary" href="/">Try again</a>
      <a class="btn btn-ghost" href="tel:{{PHONE_NUMBER_E164}}">Call {{PHONE_NUMBER}}</a>
    </div>`;

  return minimalPageWrap(head, main, shellScripts());
}

export const buildService1Html = () => buildServicePage(1);
export const buildService2Html = () => buildServicePage(2);
export const buildService3Html = () => buildServicePage(3);
