/** Page builders for premium tier (Coal & Terracotta shell + service area dropdown) */

import {
  faqItem,
  shellHead,
  shellFooterEnhanced,
  shellNavEnhanced,
  shellScripts,
  minimalPageWrap,
} from "../shared/coal-design-shell.mjs";
import {
  buildAboutHtml as buildAboutEnhanced,
  buildArticlesHtml as buildArticlesEnhanced,
  buildContactHtml as buildContactEnhanced,
  buildGalleryHtml as buildGalleryEnhanced,
  buildPrivacyHtml as buildPrivacyEnhanced,
  buildTermsHtml as buildTermsEnhanced,
  build404Html as build404Enhanced,
  buildOfflineHtml as buildOfflineEnhanced,
} from "../enhanced/sync-enhanced-pages.mjs";
import { ENHANCED_HOME_HERO_HTML } from "../enhanced/enhanced-home-hero.mjs";

export function shellNavPremium() {
  return `  <a class="skip-link" href="#main">{{SKIP_TO_CONTENT_LABEL|Skip to content}}</a>

  <nav class="site-nav" aria-label="{{NAV_PRIMARY_ARIA_LABEL|Primary}}">
    <div class="nav-pill">
      <a class="nav-logo" href="/"><span class="nav-logo__media">{{HEADER_LOGO_IMG}}</span><span class="nav-logo__text nav-logo__text--fallback">{{BUSINESS_NAME_SHORT}}<span class="dot">.</span></span><span class="nav-logo__text nav-logo__text--beside">{{BUSINESS_NAME_SHORT}}</span></a>
      <ul class="nav-links" role="list">
        <li><a class="nav-link" href="/">{{NAV_LABEL_HOME|Home}}</a></li>
        <li><a class="nav-link" href="/services">{{NAV_LABEL_SERVICES|Services}}</a></li>
        <li><a class="nav-link" href="/gallery">Gallery</a></li>
        <li><a class="nav-link" href="/testimonials">{{TESTIMONIALS_PAGE_LABEL|Testimonials}}</a></li>
        <li><a class="nav-link" href="/about">{{NAV_LABEL_ABOUT|About}}</a></li>
        <li><a class="nav-link" href="/articles">{{NAV_LABEL_ARTICLES|Articles}}</a></li>
        <li class="nav-dd">
          <button type="button" class="nav-dd-trigger" aria-expanded="false" aria-haspopup="true" aria-controls="nav-dd-sa-panel">{{SERVICE_AREA_PAGE_LABEL|Service area}} <span class="nav-dd-caret" aria-hidden="true">▾</span></button>
          <ul class="nav-dd-panel" id="nav-dd-sa-panel" role="menu">
            <li role="none"><a role="menuitem" href="/service-area">Coverage map &amp; list</a></li>
            <li role="none"><a role="menuitem" href="/location-1">{{LOCATION_1_MENU_LABEL|Metro north}}</a></li>
            <li role="none"><a role="menuitem" href="/location-2">{{LOCATION_2_MENU_LABEL|Central corridor}}</a></li>
            <li role="none"><a role="menuitem" href="/location-3">{{LOCATION_3_MENU_LABEL|South county}}</a></li>
          </ul>
        </li>
      </ul>
      <div class="nav-cta">
        <a class="btn btn-ghost btn-sm" href="/contact">{{HEADER_CTA_SECONDARY_LABEL|Get Estimate}}</a>
        <a class="btn btn-primary btn-sm" href="tel:{{PHONE_NUMBER_E164}}">{{PHONE_NUMBER_DISPLAY}}</a>
      </div>
      <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-overlay">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <div class="nav-overlay" id="nav-overlay" role="dialog" aria-modal="true" aria-label="{{NAV_PRIMARY_ARIA_LABEL|Primary}}">
    <ul class="nav-menu-links" role="list">
      <li><a class="nav-menu-link" href="/">{{NAV_LABEL_HOME|Home}}</a></li>
      <li><a class="nav-menu-link" href="/services">{{NAV_LABEL_SERVICES|Services}}</a></li>
      <li><a class="nav-menu-link" href="/gallery">Gallery</a></li>
      <li><a class="nav-menu-link" href="/testimonials">{{TESTIMONIALS_PAGE_LABEL|Testimonials}}</a></li>
      <li><a class="nav-menu-link" href="/about">{{NAV_LABEL_ABOUT|About}}</a></li>
      <li><a class="nav-menu-link" href="/articles">{{NAV_LABEL_ARTICLES|Articles}}</a></li>
    </ul>
    <div class="nav-overlay-sa-group" role="group" aria-label="{{SERVICE_AREA_PAGE_LABEL|Service area}}">
      <span class="nav-overlay-sa-label">{{SERVICE_AREA_PAGE_LABEL|Service area}}</span>
      <a class="nav-menu-link nav-menu-link--sub" href="/service-area">Coverage map &amp; list</a>
      <a class="nav-menu-link nav-menu-link--sub" href="/location-1">{{LOCATION_1_MENU_LABEL|Metro north}}</a>
      <a class="nav-menu-link nav-menu-link--sub" href="/location-2">{{LOCATION_2_MENU_LABEL|Central corridor}}</a>
      <a class="nav-menu-link nav-menu-link--sub" href="/location-3">{{LOCATION_3_MENU_LABEL|South county}}</a>
    </div>
    <div class="nav-overlay-footer">
      <a class="btn btn-primary" href="tel:{{PHONE_NUMBER_E164}}">{{PHONE_NUMBER_DISPLAY}}</a>
    </div>
  </div>`;
}

export function pageWrapPremium(head, main, footer, scripts) {
  return `<!DOCTYPE html>
<html lang="{{HTML_LANG|en}}" class="no-js">
${head}
<body class="no-js {{HEADER_BRAND_CLASS|header-brand--text}}">
${shellNavPremium()}

  <main id="main">
${main}
  </main>

${footer}
${scripts}
</body>
</html>`;
}

function withPremiumNav(html) {
  return html.replace(shellNavEnhanced(), shellNavPremium());
}

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

const localPagesSection = () => `
        <section class="local-pages-section" aria-labelledby="local-pages-heading" data-reveal>
          <h2 id="local-pages-heading" data-reveal-heading>Service-focused pages for <span class="accent">priority submarkets</span></h2>
          <p class="section-sub">{{SERVICE_AREA_LOCAL_PAGES_INTRO|These pages target how homeowners search in each area—by city plus the services you want to own. Each page uses unique, helpful copy (not duplicate templates) so search engines and visitors both see real local intent.}}</p>
          <div class="local-pages-grid" data-reveal-stagger>
            <a class="local-page-card" href="/location-1" data-stagger-item>
              <span class="local-page-card__k">Local SEO</span>
              <strong>{{LOCATION_1_MENU_LABEL|Metro north}}</strong>
              <span class="local-page-card__d">{{LOCATION_1_CARD_TEASER|Roofing, storm restoration, and exterior projects with crews staged closer to this corridor.}}</span>
            </a>
            <a class="local-page-card" href="/location-2" data-stagger-item>
              <span class="local-page-card__k">Local SEO</span>
              <strong>{{LOCATION_2_MENU_LABEL|Central corridor}}</strong>
              <span class="local-page-card__d">{{LOCATION_2_CARD_TEASER|High-demand repairs and replacements where response time and permitting familiarity matter.}}</span>
            </a>
            <a class="local-page-card" href="/location-3" data-stagger-item>
              <span class="local-page-card__k">Local SEO</span>
              <strong>{{LOCATION_3_MENU_LABEL|South county}}</strong>
              <span class="local-page-card__d">{{LOCATION_3_CARD_TEASER|Neighborhood-focused messaging, seasonal risks, and the services you want to rank for here.}}</span>
            </a>
          </div>
        </section>`;

const serviceAreaChipsScript = `
        <script>
          (function () {
            var chipHost = document.getElementById('service-area-chips');
            var rawCities = document.getElementById('svc-cities-json');
            if (chipHost && rawCities && rawCities.textContent.trim()) {
              try {
                var cities = JSON.parse(rawCities.textContent);
                if (Array.isArray(cities)) {
                  cities.forEach(function (lab) {
                    if (lab == null || String(lab).trim() === '') return;
                    var sp = document.createElement('span');
                    sp.className = 'chip';
                    sp.setAttribute('role', 'listitem');
                    sp.textContent = String(lab).trim();
                    chipHost.appendChild(sp);
                  });
                }
              } catch (e) {}
            }
            if (chipHost && chipHost.childElementCount === 0) {
              var oneLineEl = document.getElementById('ahana-svc-cities-one-line');
              var cityEl = document.getElementById('ahana-city-fallback');
              var oneLine = oneLineEl ? oneLineEl.textContent.replace(/\\s+/g, ' ').trim() : '';
              var cityFb = cityEl ? cityEl.textContent.replace(/\\s+/g, ' ').trim() : '';
              var tokenBroken = function (s) {
                return !s || s.indexOf('{{') !== -1;
              };
              var text = !tokenBroken(oneLine) ? oneLine : (!tokenBroken(cityFb) ? cityFb : '');
              if (text) {
                var fb = document.createElement('p');
                fb.className = 'chips chips-fallback';
                fb.textContent = text;
                chipHost.parentNode.insertBefore(fb, chipHost.nextSibling);
              }
            }
          })();
        </script>`;

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

  const others = [1, 2, 3, 4, 5, 6].filter((x) => x !== num);
  const relatedLinks = others
    .map((x) => `        <a href="/service-${x}">{{SERVICE_${x}_NAME}}</a>`)
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

        <h2 data-reveal-heading>FAQ — <span class="accent">{{SERVICE_${num}_NAME}}</span></h2>
        <div class="faq-block" data-reveal>
${faqItem(`{{SERVICE_${num}_FAQ_Q1}}`, `{{SERVICE_${num}_FAQ_A1}}`)}
${faqItem(`{{SERVICE_${num}_FAQ_Q2}}`, `{{SERVICE_${num}_FAQ_A2}}`)}
${faqItem(`{{SERVICE_${num}_FAQ_Q3}}`, `{{SERVICE_${num}_FAQ_A3}}`)}
        </div>

        <h2 data-reveal-heading>Related <span class="accent">services</span></h2>
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

  return pageWrapPremium(head, main, "", shellScripts());
}

function buildLocationPage(n) {
  const L = `LOCATION_${n}_`;
  const h1Default =
    n === 1
      ? "Exterior restoration &amp; roofing in North Metro, Colorado"
      : n === 2
        ? "Exterior restoration &amp; roofing in the Central Corridor"
        : "Exterior restoration &amp; roofing in South County";
  const leadDefault =
    n === 1
      ? "Homeowners here often search by city plus the exact exterior problem—hail, wind-driven leaks, aging siding, or emergency tarping."
      : n === 2
        ? "This submarket usually has denser housing stock and faster permit cycles—so homeowners search for speed and clarity."
        : "South-county searches often emphasize wind exposure, larger lots, and realistic arrival windows.";

  const others = [1, 2, 3]
    .filter((i) => i !== n)
    .map(
      (i) =>
        `        <a href="/location-${i}">{{LOCATION_${i}_MENU_LABEL|Area ${i}}}</a>`
    )
    .join("\n");

  const head = shellHead({
    title: `{{${L}SEO_TITLE}}`,
    description: `{{${L}META_DESCRIPTION}}`,
    canonical: `{{SITE_URL}}/location-${n}`,
    ogUrl: `{{SITE_URL}}/location-${n}`,
    extraHead: `
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"WebPage",
    "name":"{{${L}SEO_TITLE}}",
    "description":"{{${L}META_DESCRIPTION}}",
    "url":"{{SITE_URL}}/location-${n}"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":"{{${L}FAQ_Q1|Do you offer same-week estimates in this area?}}","acceptedAnswer":{"@type":"Answer","text":"{{${L}FAQ_A1|Yes—when capacity allows we prioritize local emergency and storm-related calls and schedule estimates quickly.}}"}},
      {"@type":"Question","name":"{{${L}FAQ_Q2|Which services do you route to crews closest to this submarket?}}","acceptedAnswer":{"@type":"Answer","text":"{{${L}FAQ_A2|We align dispatch with the services listed on this page so homeowners get crews familiar with local codes, weather, and materials.}}"}}
    ]
  }
  </script>`,
  });

  const main = `
    <section class="section loc-page">
      <div class="container">
        <p class="page-kicker">Local service SEO · {{${L}MENU_LABEL|Submarket}}</p>
        <h1 data-reveal-heading>{{${L}H1|${h1Default}}}</h1>
        <div class="hook" data-reveal>{{${L}LEAD|${leadDefault} This page matches that intent with service-first messaging tied to neighborhoods you actually dispatch to.}}</div>
        <p class="loc-prose" data-reveal>{{${L}SUPPORT_PARA|Tell us the seasons, permitting quirks, and competitor noise you deal with in this pocket of your market; we fold those details into headings, internal links, and FAQs.}}</p>

        <h2 data-reveal-heading>Core services homeowners search for <span class="accent">in this area</span></h2>
        <p class="section-sub" data-reveal>{{${L}SERVICES_INTRO|Align this block with high-intent queries (e.g. storm + city). Each card should reflect a real offer your crews deliver in this submarket.}}</p>
        <div class="loc-grid" data-reveal-stagger>
          <div class="loc-card" data-stagger-item>
            <h3>{{${L}SVC_A_TITLE|Storm &amp; hail response}}</h3>
            <p>{{${L}SVC_A_BODY|Documentation-first inspections, insurance-friendly estimates, and crews who know how local weather patterns show up on roofs here.}}</p>
          </div>
          <div class="loc-card" data-stagger-item>
            <h3>{{${L}SVC_B_TITLE|Full roof replacement}}</h3>
            <p>{{${L}SVC_B_BODY|Material options suited to wind exposure, venting, and HOA or municipal requirements common in this corridor.}}</p>
          </div>
          <div class="loc-card" data-stagger-item>
            <h3>{{${L}SVC_C_TITLE|Exteriors &amp; water management}}</h3>
            <p>{{${L}SVC_C_BODY|Siding, gutters, flashing, and envelope details that stop repeat callbacks—written as local proof, not buzzwords.}}</p>
          </div>
        </div>

        <h2 data-reveal-heading>Neighborhoods &amp; <span class="accent">dispatch reality</span></h2>
        <p class="section-sub" data-reveal>{{${L}NEIGHBORHOODS|Name the subdivisions or zip clusters you want to show up for. Search engines reward specificity; visitors reward honesty about where you're fastest.}}</p>
        <ul class="detail-list" data-reveal>
          <li>{{${L}BULLET_1|Same-week emergency tarping when storms track across this submarket.}}</li>
          <li>{{${L}BULLET_2|Code-aware replacements for older housing stock common in established neighborhoods.}}</li>
          <li>{{${L}BULLET_3|Photo-heavy estimates so homeowners understand scope before work starts.}}</li>
        </ul>

        <h2 data-reveal-heading>Questions <span class="accent">we answer on the phone</span></h2>
        <div class="faq-block" data-reveal>
${faqItem(`{{${L}FAQ_Q1|Do you offer same-week estimates in this area?}}`, `{{${L}FAQ_A1|Yes—when capacity allows we prioritize local emergency and storm-related calls and schedule estimates quickly.}}`)}
${faqItem(`{{${L}FAQ_Q2|Which services do you route to crews closest to this submarket?}}`, `{{${L}FAQ_A2|We align dispatch with the services listed on this page so homeowners get crews familiar with local codes, weather, and materials.}}`)}
        </div>

        <div class="loc-cross" aria-label="Related pages" data-reveal>
          <a href="/service-area">Full service area</a>
${others}
          <a href="/services">All services</a>
          <a href="/contact">Request a quote</a>
        </div>

        <div class="loc-map" data-reveal>
          <img
            class="loc-map__img"
            src="{{${L}MAP_IMG_URL}}"
            alt="Map of {{${L}MENU_LABEL}} service area"
            width="800"
            height="420"
            loading="lazy"
            decoding="async"
          />
          <p class="loc-map__credit">Map data © <a href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer">OpenStreetMap</a> contributors</p>
        </div>
      </div>
    </section>

  <div class="sticky-cta-bar" role="region" aria-label="Quick contact">
    <a class="btn btn-ghost" href="/contact">Get free estimate</a>
    <a class="btn btn-primary" href="tel:{{PHONE_NUMBER_E164}}">Call {{PHONE_NUMBER}}</a>
  </div>`;

  return pageWrapPremium(head, main, shellFooterEnhanced(), shellScripts());
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
    "areaServed": {{AREA_SERVED_JSON}}{{JSON_LD_LOGO_ENTRY}},
    "aggregateRating":{"@type":"AggregateRating","ratingValue":"{{REVIEW_RATING}}","reviewCount":"{{REVIEW_COUNT}}"}
  }
  </script>`,
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
        <div class="svc-grid" data-reveal-stagger>
${svcTile(1, "/service-1")}
${svcTile(2, "/service-2")}
${svcTile(3, "/service-3")}
${svcTile(4, "/service-4")}
${svcTile(5, "/service-5")}
${svcTile(6, "/service-6")}
        </div>
        <div class="cta-row" data-reveal>
          <a class="btn btn-primary" href="/services">See all services →</a>
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <p class="enh-label" data-reveal>How it works</p>
        <h2 class="enh-title" data-reveal-heading>A simple process with<br/><span>no surprises</span></h2>
        <p class="enh-body" data-reveal>Homeowners want clarity. Here's how we take you from "problem" to "done" fast.</p>
        <div class="steps-row" data-reveal-stagger>
          <div class="step-cell" data-stagger-item>
            <div class="step-num">1</div>
            <h3>Call or request an estimate</h3>
            <p>Tell us what's going on. We'll confirm availability and schedule a time that works.</p>
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
        <p class="enh-body" data-reveal>If you're near {{CITY}}, there's a good chance we can help. We serve: {{SERVICE_CITIES_ONE_LINE}}.</p>
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
            <p class="area-panel-copy">Call now or request an estimate online. We'll confirm details and next steps.</p>
            <div class="area-panel-actions">
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
        <p class="enh-body" data-reveal>Here's what customers say after the job is done. Read more on the Testimonials page.</p>
        <div class="testi-preview-grid" data-reveal-stagger>
          <div class="card" data-stagger-item><h3>{{TESTIMONIAL_1_NAME}}</h3><p>"{{TESTIMONIAL_1_TEXT}}"</p><div class="card-meta">{{TESTIMONIAL_1_CITY}}</div></div>
          <div class="card" data-stagger-item><h3>{{TESTIMONIAL_2_NAME}}</h3><p>"{{TESTIMONIAL_2_TEXT}}"</p><div class="card-meta">{{TESTIMONIAL_2_CITY}}</div></div>
          <div class="card" data-stagger-item><h3>{{TESTIMONIAL_3_NAME}}</h3><p>"{{TESTIMONIAL_3_TEXT}}"</p><div class="card-meta">{{TESTIMONIAL_3_CITY}}</div></div>
        </div>
        <div class="cta-row" data-reveal>
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
          <div class="cta-row cta-row--inline">
            <a class="btn btn-primary btn-lg" href="tel:{{PHONE_NUMBER_E164}}">Call {{PHONE_NUMBER}}</a>
            <a class="btn btn-outline btn-lg" href="/contact">Request an estimate</a>
          </div>
        </div>
      </div>
    </section>`;

  return pageWrapPremium(head, main, shellFooterEnhanced({ includeHours: true }), shellScripts());
}

export function buildServicesHtml() {
  const head = shellHead({
    title: "{{BUSINESS_NAME}} Services | {{CITY}}, {{STATE}}",
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
    "serviceType":"{{PRIMARY_SERVICE}} Services"
  }
  </script>`,
  });

  const svcDetailCard = (n) => `            <a class="svc-detail-card" href="/service-${n}" data-stagger-item>
              <h3>{{SERVICE_${n}_NAME}}</h3>
              <p>{{SERVICE_${n}_DESC}}</p>
              <span class="feature-lm">Learn more</span>
            </a>`;

  const svcHubCardContact = (n) => `            <a class="svc-detail-card" href="/contact" data-stagger-item>
              <h3>{{SERVICE_${n}_NAME}}</h3>
              <p>{{SERVICE_${n}_DESC}}</p>
              <span class="feature-lm">Request scope</span>
            </a>`;

  const main = `
    <div class="page-hero">
      <div class="container">
        <p class="enh-label">Services</p>
        <h1>Services for <span class="accent">{{CITY}}</span> Homeowners</h1>
        <p class="section-sub">{{SERVICES_INTRO|Houston-area heat, hail, and wind cycles stress every layer of the roof—we answer with licensed crews and clear scopes. Text photos of damage; we route you to the right fix fast.}}</p>
      </div>
    </div>

    <section class="section section--pb-lg">
      <div class="container">
        <section class="svc-hub-section" aria-labelledby="svc-popular-heading">
          <p class="enh-label">{{SERVICES_HUB_POPULAR_KICKER|Priority service detail pages}}</p>
          <h2 id="svc-popular-heading" data-reveal-heading>{{SERVICES_HUB_POPULAR_TITLE|Six full service URLs (Premium)}}</h2>
          <p class="section-sub" data-reveal>{{SERVICES_HUB_POPULAR_INTRO|Each card opens a dedicated page with FAQs, process, proof, and before/after photos—built on the same optimized layout as the Enhanced tier.}}</p>
          <div class="svc-priority-grid svc-priority-grid--six" data-reveal-stagger>
${[1, 2, 3, 4, 5, 6].map(svcDetailCard).join("\n")}
          </div>
        </section>

        <section class="svc-hub-extended" aria-labelledby="svc-ext-heading">
          <p class="enh-label">{{SERVICES_HUB_EXTENDED_KICKER|Hub visibility}}</p>
          <h2 id="svc-ext-heading" data-reveal-heading>{{SERVICES_HUB_EXTENDED_TITLE|Services #7–#10 (overview on this hub)}}</h2>
          <p class="section-sub" data-reveal>{{SERVICES_HUB_EXTENDED_INTRO|These lines stay visible across the site with short blurbs here; full dedicated URLs are reserved for your top six priorities above.}}</p>
          <div class="svc-priority-grid svc-priority-grid--extended" data-reveal-stagger>
${[7, 8, 9, 10].map(svcHubCardContact).join("\n")}
          </div>
        </section>

        <section class="svc-add-more" aria-labelledby="additional-services-heading">
          <p class="enh-label">Additional services</p>
          <h2 class="svc-more-h2" id="additional-services-heading">Other work we handle</h2>
          <p class="section-sub">{{ADDITIONAL_SERVICES_INTRO|Not sure which line fits? Call or text photos—we match scope to the right crew.}}</p>
          <ul class="svc-additional-list">
            {{ADDITIONAL_SERVICES_LIST_ITEMS}}
          </ul>
        </section>
      </div>
    </section>

  <div class="sticky-svc-cta" role="region" aria-label="Quick estimate">
    <a class="sticky-svc-primary" href="/contact">Get free estimate</a>
    <a class="sticky-svc-call" href="tel:{{PHONE_NUMBER_E164}}">Call {{PHONE_NUMBER}}</a>
  </div>`;

  return pageWrapPremium(head, main, shellFooterEnhanced({ includeHours: true }), shellScripts());
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
            <blockquote>"{{TESTIMONIALS_WALL_1_TEXT}}"</blockquote>
            <div class="by">{{TESTIMONIAL_1_NAME}} <span>· {{TESTIMONIAL_1_CITY}}</span></div>
          </article>
          <article class="card" data-testimonial-card data-stagger-item>
            <blockquote>"{{TESTIMONIALS_WALL_2_TEXT}}"</blockquote>
            <div class="by">{{TESTIMONIAL_2_NAME}} <span>· {{TESTIMONIAL_2_CITY}}</span></div>
          </article>
          <article class="card" data-testimonial-card data-stagger-item>
            <blockquote>"{{TESTIMONIALS_WALL_3_TEXT}}"</blockquote>
            <div class="by">{{TESTIMONIAL_3_NAME}} <span>· {{TESTIMONIAL_3_CITY}}</span></div>
          </article>
          <article class="card" data-testimonial-card data-stagger-item>
            <blockquote>"{{TESTIMONIALS_WALL_4_TEXT}}"</blockquote>
            <div class="by">{{TESTIMONIAL_4_NAME}} <span>· {{TESTIMONIAL_4_CITY}}</span></div>
          </article>
          <article class="card" data-testimonial-card data-stagger-item>
            <blockquote>"{{TESTIMONIALS_WALL_5_TEXT}}"</blockquote>
            <div class="by">{{TESTIMONIAL_5_NAME}} <span>· {{TESTIMONIAL_5_CITY}}</span></div>
          </article>
        </section>

        <section class="tts-services tts-services--premium" aria-labelledby="tts-services-h2" data-reveal>
          <p class="tts-services-k">{{TESTIMONIALS_SERVICES_CTA_KICKER|Services}}</p>
          <h2 id="tts-services-h2" class="tts-services-h2">{{TESTIMONIALS_SERVICES_CTA_HEADLINE|Explore the services behind these homeowner stories}}</h2>
          <p class="tts-services-lead">{{TESTIMONIALS_SERVICES_CTA_BODY|Reviews capture the experience—our services page breaks down scopes, materials, and what to expect for {{PRIMARY_SERVICE}} work across {{CITY}}. Follow the links for full write-ups, FAQs, and next steps.}}</p>
          <ul class="tts-services-links">
            <li><a href="/service-1">{{SERVICE_1_NAME}}</a></li>
            <li><a href="/service-2">{{SERVICE_2_NAME}}</a></li>
            <li><a href="/service-3">{{SERVICE_3_NAME}}</a></li>
            <li><a href="/service-4">{{SERVICE_4_NAME}}</a></li>
            <li><a href="/service-5">{{SERVICE_5_NAME}}</a></li>
            <li><a href="/service-6">{{SERVICE_6_NAME}}</a></li>
          </ul>
          <div class="cta-row">
            <a class="btn btn-primary" href="/services">{{TESTIMONIALS_SERVICES_CTA_BUTTON|Browse all services and options}}</a>
          </div>
        </section>
      </div>
    </section>`;

  return pageWrapPremium(head, main, shellFooterEnhanced(), shellScripts());
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
          <p class="chips chips-fallback"><strong>Areas:</strong> {{SERVICE_CITIES_ONE_LINE}}</p>
        </noscript>
${localPagesSection()}

        <div class="map" id="area-map-wrap">
          <div id="service-area-map" role="img" aria-label="Map centered on {{BUSINESS_NAME}} showing combined service coverage area" data-lat="{{MAP_CENTER_LAT}}" data-lng="{{MAP_CENTER_LNG}}" data-zoom="{{MAP_ZOOM|10}}"></div>
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
        <script src="./ahana-service-area-map.js" defer></script>
${serviceAreaChipsScript}
      </div>
    </section>`;

  return pageWrapPremium(head, main, shellFooterEnhanced(), shellScripts());
}

export function buildReviewsHtml() {
  const head = shellHead({
    title: "{{BUSINESS_NAME}} Reviews",
    description: "{{TESTIMONIALS_META_DESCRIPTION|Read real homeowner feedback for {{BUSINESS_NAME}} in {{CITY}}, {{STATE}}.}}",
    canonical: "{{SITE_URL}}/reviews",
    ogUrl: "{{SITE_URL}}/reviews",
    robots: "noindex",
    twitter: false,
    extraHead: `
  <meta http-equiv="refresh" content="0; url=/testimonials" />`,
  });

  const main = `
    <p class="enh-label">Redirect</p>
    <h1>Reviews moved to Testimonials</h1>
    <p>If you are not redirected, <a href="/testimonials">go to testimonials</a>.</p>
    <script>
      window.location.replace('/testimonials');
    </script>`;

  return minimalPageWrap(head, main, shellScripts());
}

export const buildAboutHtml = () =>
  withPremiumNav(buildAboutEnhanced()).replace(
    '<div class="cta-band" data-reveal style="margin-top:3rem">',
    '<div class="cta-band cta-band--spaced" data-reveal>'
  );
export const buildArticlesHtml = () => withPremiumNav(buildArticlesEnhanced());
export const buildContactHtml = () =>
  withPremiumNav(buildContactEnhanced())
    .replace(
      '<p style="margin-top:1rem;color:var(--muted);line-height:1.65">',
      '<p class="contact-meta">'
    )
    .replace('<p style="margin:0;color:var(--muted)">', '<p class="contact-form-intro">');
export const buildGalleryHtml = () => withPremiumNav(buildGalleryEnhanced());
export const buildPrivacyHtml = () => withPremiumNav(buildPrivacyEnhanced());
export const buildTermsHtml = () => withPremiumNav(buildTermsEnhanced());
export const build404Html = build404Enhanced;
export const buildOfflineHtml = buildOfflineEnhanced;

export const buildService1Html = () => buildServicePage(1);
export const buildService2Html = () => buildServicePage(2);
export const buildService3Html = () => buildServicePage(3);
export const buildService4Html = () => buildServicePage(4);
export const buildService5Html = () => buildServicePage(5);
export const buildService6Html = () => buildServicePage(6);

export const buildLocation1Html = () => buildLocationPage(1);
export const buildLocation2Html = () => buildLocationPage(2);
export const buildLocation3Html = () => buildLocationPage(3);
