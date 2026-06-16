/** HTML shell + page builders for sync-starter-from-sample.mjs */

import {
  aggregateRatingField,
  reviewLdScript,
  HOME_FAQ_LD,
  SERVICES_FAQ_LD,
  ABOUT_FAQ_LD,
  BREADCRUMB_HOME,
  BREADCRUMB_SERVICES,
  BREADCRUMB_ABOUT,
  BREADCRUMB_ARTICLES,
  BREADCRUMB_CONTACT,
  BREADCRUMB_ARTICLE_POST,
  serviceLdBlock,
  webPageDateModifiedLd,
} from "../shared/schema-blocks.mjs";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&amp;display=swap";

export function faqItem(question, answer) {
  return `          <div class="faq-item">
            <button class="faq-summary" aria-expanded="false">
              ${question}
              <span class="faq-icon" aria-hidden="true">+</span>
            </button>
            <div class="faq-answer" role="region">
              <div class="faq-answer-inner">${answer}</div>
            </div>
          </div>`;
}

export function shellHead({
  title,
  description,
  canonical,
  ogUrl,
  themeColor = "{{BRAND_DARK}}",
  cssHref = "./styles.css",
  faviconHref = "./favicon.svg",
  extraHead = "",
  preloadHero = false,
  ogType = "website",
  ogImage = "{{OG_IMAGE_URL}}",
  twitter = true,
}) {
  return `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="theme-color" content="${themeColor}" />
  <meta name="dateModified" content="{{SITE_LAST_MODIFIED}}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${ogUrl}" />
  <meta property="og:image" content="${ogImage}" />${
    twitter
      ? `
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImage}" />`
      : ""
  }
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />${
    preloadHero
      ? `
  <link rel="preload" as="image" href="{{HERO_IMAGE_URL}}" fetchpriority="high" />`
      : ""
  }
  <link href="${FONTS}" rel="stylesheet" />
  <link rel="stylesheet" href="${cssHref}" />
  <link rel="icon" href="${faviconHref}" type="image/svg+xml" />${extraHead}
</head>`;
}

export function shellNav() {
  return `  <a class="skip-link" href="#main">{{SKIP_TO_CONTENT_LABEL}}</a>

  <nav class="site-nav" aria-label="{{NAV_PRIMARY_ARIA_LABEL}}">
    <div class="nav-pill">
      <a class="nav-logo" href="/"><span class="nav-logo__media">{{HEADER_LOGO_IMG}}</span><span class="nav-logo__text nav-logo__text--fallback">{{BUSINESS_NAME_SHORT}}<span class="dot">.</span></span><span class="nav-logo__text nav-logo__text--beside">{{BUSINESS_NAME_SHORT}}</span></a>
      <ul class="nav-links" role="list">
        <li><a class="nav-link" href="/">{{NAV_LABEL_HOME}}</a></li>
        <li><a class="nav-link" href="/services">{{NAV_LABEL_SERVICES}}</a></li>
        <li><a class="nav-link" href="/about">{{NAV_LABEL_ABOUT}}</a></li>
        <li><a class="nav-link" href="/articles">{{NAV_LABEL_ARTICLES}}</a></li>
        <li><a class="nav-link" href="/contact">{{NAV_LABEL_CONTACT}}</a></li>
      </ul>
      <div class="nav-cta">
        <a class="btn btn-ghost btn-sm" href="/contact">{{HEADER_CTA_SECONDARY_LABEL}}</a>
        <a class="btn btn-primary btn-sm" href="tel:{{PHONE_NUMBER_E164}}">{{PHONE_NUMBER_DISPLAY}}</a>
      </div>
      <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-overlay">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <div class="nav-overlay" id="nav-overlay" role="dialog" aria-modal="true" aria-label="{{NAV_PRIMARY_ARIA_LABEL}}">
    <ul class="nav-menu-links" role="list">
      <li><a class="nav-menu-link" href="/">{{NAV_LABEL_HOME}}</a></li>
      <li><a class="nav-menu-link" href="/services">{{NAV_LABEL_SERVICES}}</a></li>
      <li><a class="nav-menu-link" href="/about">{{NAV_LABEL_ABOUT}}</a></li>
      <li><a class="nav-menu-link" href="/articles">{{NAV_LABEL_ARTICLES}}</a></li>
      <li><a class="nav-menu-link" href="/contact">{{NAV_LABEL_CONTACT}}</a></li>
    </ul>
    <div class="nav-overlay-footer">
      <a class="btn btn-primary" href="tel:{{PHONE_NUMBER_E164}}">{{PHONE_NUMBER_DISPLAY}}</a>
    </div>
  </div>`;
}

export function shellFooter({ includeHours = false, includeEmail = true } = {}) {
  const contactItems = [
    `<li><a href="tel:{{PHONE_NUMBER_E164}}">{{PHONE_NUMBER_DISPLAY}}</a></li>`,
    includeEmail ? `<li><a href="mailto:{{EMAIL}}">{{EMAIL}}</a></li>` : "",
    includeHours ? `<li>{{BUSINESS_HOURS}}</li>` : "",
  ]
    .filter(Boolean)
    .join("\n          ");

  return `  <footer>
    <div class="footer-grid">
      <div>
        <div class="footer-brand-name">{{BUSINESS_NAME_SHORT}}<span class="dot">.</span></div>
        <p class="footer-blurb">{{FOOTER_TAGLINE}}</p>
      </div>
      <div>
        <div class="footer-col-label">{{FOOTER_PAGES_HEADING}}</div>
        <ul class="footer-links" role="list">
          <li><a href="/">{{NAV_LABEL_HOME}}</a></li>
          <li><a href="/services">{{NAV_LABEL_SERVICES}}</a></li>
          <li><a href="/about">{{NAV_LABEL_ABOUT}}</a></li>
          <li><a href="/articles">{{NAV_LABEL_ARTICLES}}</a></li>
          <li><a href="/contact">{{NAV_LABEL_CONTACT}}</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-label">Contact</div>
        <ul class="footer-links" role="list">
          ${contactItems}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; {{YEAR_CURRENT}} {{BUSINESS_NAME}}</span>
      <span>{{CITY}}, {{STATE}} · {{LICENSE_TYPE}}</span>
    </div>
  </footer>`;
}

export function shellScripts(cssPrefix = ".") {
  const p = cssPrefix === ".." ? ".." : ".";
  return `  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <script src="${p}/main.js" defer></script>`;
}

export function pageWrap(head, main, footer, scripts) {
  return `<!DOCTYPE html>
<html lang="{{HTML_LANG|en}}" class="no-js">
${head}
<body class="no-js {{HEADER_BRAND_CLASS|header-brand--text}}">
${shellNav()}

  <main id="main">
${main}
  </main>

${footer}
${scripts}
</body>
</html>`;
}

export function buildIndexHtml() {
  const head = shellHead({
    title: "{{HOME_PAGE_TITLE}}",
    description: "{{HOME_META_DESCRIPTION}}",
    canonical: "{{SITE_URL}}/",
    ogUrl: "{{SITE_URL}}/",
    preloadHero: true,
    extraHead: `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "{{BUSINESS_NAME}}",
    "telephone": "{{PHONE_NUMBER_E164}}",
    "email": "{{EMAIL}}",
    "url": "{{SITE_URL}}",
    "image": ["{{HERO_IMAGE_URL}}"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "{{ADDRESS_LINE_1}}",
      "addressLocality": "{{CITY}}",
      "addressRegion": "{{STATE}}",
      "postalCode": "{{ZIP}}"
    },
    "areaServed": {{AREA_SERVED_JSON}}{{JSON_LD_LOGO_ENTRY}}${aggregateRatingField()}
  }
  </script>
  ${serviceLdBlock()}
  ${reviewLdScript(1)}
  ${reviewLdScript(2)}
  ${HOME_FAQ_LD}
  ${BREADCRUMB_HOME}
  ${webPageDateModifiedLd('"{{SITE_URL}}/"', '"{{HOME_PAGE_TITLE}}"')}`,
  });

  const main = `
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">{{HERO_KICKER_CHIP_1_HTML}}</div>
        <h1 class="hero-h1">{{HERO_H1_LINE_1}} <span class="accent">{{HERO_H1_ACCENT}}</span></h1>
        <p class="hero-sub">{{HERO_SUBHEADLINE}}</p>
        <div class="hero-cta-group">
          <a class="btn btn-primary btn-lg" href="tel:{{PHONE_NUMBER_E164}}">{{HERO_PRIMARY_CTA_LABEL}}</a>
          <a class="btn btn-outline btn-lg" href="/contact">{{HERO_SECONDARY_CTA_LABEL}}</a>
        </div>
      </div>
      <div class="hero-image-side" aria-hidden="true">
        <div class="hero-img-clip">
          <img src="{{HERO_IMAGE_URL}}" alt="{{HERO_IMAGE_ALT}}" loading="eager" fetchpriority="high" width="900" height="1200" />
        </div>
      </div>
    </section>

    <div class="stats-strip">
      <div class="stats-inner" data-reveal-stagger>
        <div class="stat-cell" data-stagger-item>
          <div class="stat-val">{{HERO_PROOF_1_VALUE}}</div>
          <div class="stat-label">{{HERO_PROOF_1_TITLE}}</div>
          <p class="stat-note">{{HERO_PROOF_1_SUB}}</p>
        </div>
        <div class="stat-cell" data-stagger-item>
          <div class="stat-val">{{HERO_PROOF_2_VALUE}}</div>
          <div class="stat-label">{{HERO_PROOF_2_TITLE}}</div>
          <p class="stat-note">{{HERO_PROOF_2_SUB}}</p>
        </div>
        <div class="stat-cell" data-stagger-item>
          <div class="stat-val">{{HERO_PROOF_3_VALUE}}</div>
          <div class="stat-label">{{HERO_PROOF_3_TITLE}}</div>
          <p class="stat-note">{{HERO_PROOF_3_SUB}}</p>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <span class="eyebrow">{{HOME_PROBLEM_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{HOME_PROBLEM_H2_LINE_1}} <span class="accent">{{HOME_PROBLEM_H2_ACCENT}}</span></h2>
        <p class="section-sub" data-reveal data-reveal-delay="0.1">{{HOME_PROBLEM_INTRO}}</p>
        <div class="problem-grid" data-reveal-stagger>
          <div class="problem-cell" data-stagger-item>
            <div class="problem-tag">{{HOME_PROBLEM_TILE_1_CHIP}}</div>
            <h3>{{HOME_PROBLEM_TILE_1_TITLE}}</h3>
            <p>{{HOME_PROBLEM_TILE_1_BODY}}</p>
          </div>
          <div class="problem-cell alt" data-stagger-item>
            <div class="problem-tag">{{HOME_PROBLEM_TILE_2_CHIP}}</div>
            <h3>{{HOME_PROBLEM_TILE_2_TITLE}}</h3>
            <p>{{HOME_PROBLEM_TILE_2_BODY}}</p>
          </div>
          <div class="problem-cell dark-accent" data-stagger-item>
            <div class="problem-tag">{{HOME_PROBLEM_TILE_3_CHIP}}</div>
            <h3>{{HOME_PROBLEM_TILE_3_TITLE}}</h3>
            <p>{{HOME_PROBLEM_TILE_3_BODY}}</p>
          </div>
          <div class="problem-cell" data-stagger-item>
            <div class="problem-tag">{{HOME_PROBLEM_TILE_4_CHIP}}</div>
            <h3>{{HOME_PROBLEM_TILE_4_TITLE}}</h3>
            <p>{{HOME_PROBLEM_TILE_4_BODY}}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <span class="eyebrow">{{HOME_STANDARD_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{HOME_STANDARD_H2_LINE_1}} <span class="accent">{{HOME_STANDARD_H2_ACCENT}}</span></h2>
        <div class="editorial-split" data-reveal>
          <div class="editorial-body">
            <p>{{HOME_STANDARD_MISSION_P1}}</p>
            <p>{{HOME_STANDARD_MISSION_P2}}</p>
            <p>{{HOME_STANDARD_MISSION_P3}}</p>
          </div>
          <aside>
            <div class="quote-card">
              <p class="quote-text">{{HOME_STANDARD_PULL_QUOTE}}</p>
              <p class="quote-attr">{{HOME_STANDARD_PULL_QUOTE_NAME}} &nbsp;·&nbsp; {{HOME_STANDARD_PULL_QUOTE_BYLINE}}</p>
            </div>
          </aside>
        </div>
        <div style="margin-top:4.5rem" data-reveal-heading>
          <h2>Six things that shape<br>every visit</h2>
        </div>
        <div class="values-grid" data-reveal-stagger style="margin-top:2rem">
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">01</span><h3>{{HOME_VALUE_TILE_1_TITLE}}</h3><p>{{HOME_VALUE_TILE_1_BODY}}</p></div>
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">02</span><h3>{{HOME_VALUE_TILE_2_TITLE}}</h3><p>{{HOME_VALUE_TILE_2_BODY}}</p></div>
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">03</span><h3>{{HOME_VALUE_TILE_3_TITLE}}</h3><p>{{HOME_VALUE_TILE_3_BODY}}</p></div>
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">04</span><h3>{{HOME_VALUE_TILE_4_TITLE}}</h3><p>{{HOME_VALUE_TILE_4_BODY}}</p></div>
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">05</span><h3>{{HOME_VALUE_TILE_5_TITLE}}</h3><p>{{HOME_VALUE_TILE_5_BODY}}</p></div>
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">06</span><h3>{{HOME_VALUE_TILE_6_TITLE}}</h3><p>{{HOME_VALUE_TILE_6_BODY}}</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <span class="eyebrow">{{HOME_SERVICES_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{HOME_SERVICES_H2_LINE_1}}<br><span class="accent">{{HOME_SERVICES_H2_ACCENT}}</span></h2>
        <p class="section-sub" data-reveal>{{HOME_SERVICES_INTRO}}</p>
        <div class="services-bento" data-reveal-stagger>
          <div class="svc-tile featured" data-stagger-item>
            <span class="svc-num" aria-hidden="true">01</span>
            <h3>{{SERVICE_1_NAME}}</h3>
            <p>{{SERVICE_1_DESC}}</p>
            <span class="svc-tag">{{SERVICE_1_TAG}}</span>
          </div>
          <div class="svc-tile alt" data-stagger-item>
            <h3>{{SERVICE_2_NAME}}</h3>
            <p>{{SERVICE_2_DESC}}</p>
            <span class="svc-tag">{{SERVICE_2_TAG}}</span>
          </div>
          <div class="svc-tile" data-stagger-item>
            <h3>{{SERVICE_3_NAME}}</h3>
            <p>{{SERVICE_3_DESC}}</p>
            <span class="svc-tag">{{SERVICE_3_TAG}}</span>
          </div>
        </div>
        <div style="margin-top:2.25rem" data-reveal>
          <a class="btn btn-outline" href="/services">{{HOME_SERVICES_CTA_LABEL}}</a>
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <span class="eyebrow">{{HOME_PROCESS_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{HOME_PROCESS_H2_LINE_1}} <span class="accent">{{HOME_PROCESS_H2_ACCENT}}</span></h2>
        <p class="section-sub" data-reveal>{{HOME_PROCESS_INTRO}}</p>
        <div class="process-list" data-reveal-stagger>
          <div class="process-connector" aria-hidden="true"></div>
          <div class="pl-step" data-stagger-item>
            <div class="pl-num-wrap"><span>1</span></div>
            <h3>{{PROCESS_STEP_1_TITLE}}</h3>
            <p>{{PROCESS_STEP_1_BODY}}</p>
            <div class="pl-tag">{{PROCESS_STEP_1_TAG}}</div>
          </div>
          <div class="pl-step" data-stagger-item>
            <div class="pl-num-wrap"><span>2</span></div>
            <h3>{{PROCESS_STEP_2_TITLE}}</h3>
            <p>{{PROCESS_STEP_2_BODY}}</p>
            <div class="pl-tag">{{PROCESS_STEP_2_TAG}}</div>
          </div>
          <div class="pl-step" data-stagger-item>
            <div class="pl-num-wrap"><span>3</span></div>
            <h3>{{PROCESS_STEP_3_TITLE}}</h3>
            <p>{{PROCESS_STEP_3_BODY}}</p>
            <div class="pl-tag">{{PROCESS_STEP_3_TAG}}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <span class="eyebrow">{{HOME_ARTICLES_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{HOME_ARTICLES_H2_LINE_1}} <span class="accent">{{HOME_ARTICLES_H2_ACCENT}}</span></h2>
        <p class="section-sub" data-reveal>{{ARTICLES_INTRO}}</p>
        <div class="post-list" data-reveal-stagger>
          <a class="post-link" href="{{ARTICLE_1_URL}}" data-stagger-item>
            <div class="post-top">
              <div class="post-eyebrow">{{ARTICLE_1_CATEGORY}}</div>
              <div class="post-date">{{ARTICLE_1_DATE}}</div>
            </div>
            <div class="post-title">{{ARTICLE_1_TITLE}}</div>
            <p class="post-excerpt">{{ARTICLE_1_EXCERPT}}</p>
            <div class="post-cta">{{ARTICLE_CARD_CTA_LABEL|Read the article →}}</div>
          </a>
        </div>
        <div style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap" data-reveal>
          <a class="btn btn-primary" href="/articles">{{HOME_ARTICLES_PRIMARY_CTA_LABEL}}</a>
          <a class="btn btn-ghost" href="/contact">{{HOME_ARTICLES_SECONDARY_CTA_LABEL}}</a>
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <span class="eyebrow">{{HOME_SERVICE_AREA_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{HOME_SERVICE_AREA_H2_LINE_1}} <span class="accent">{{HOME_SERVICE_AREA_H2_ACCENT}}</span></h2>
        <div class="area-split {{HOME_SERVICE_AREA_SPLIT_CLASS}}" data-reveal>
          <div class="area-text">
            <p>{{HOME_SERVICE_AREA_BODY_1}}</p>
            <p>{{HOME_SERVICE_AREA_BODY_2_HTML}}</p>
          </div>
          <div class="area-photo" aria-label="{{HOME_SERVICE_AREA_IMAGE_ARIA_LABEL}}">
            <img src="{{HOME_SERVICE_AREA_IMAGE_URL}}" alt="{{HOME_SERVICE_AREA_IMAGE_ALT}}" width="{{HOME_SERVICE_AREA_IMAGE_WIDTH}}" height="{{HOME_SERVICE_AREA_IMAGE_HEIGHT}}" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <span class="eyebrow">{{HOME_TESTIMONIALS_SECTION_KICKER}}</span>
        <div class="testimonial-grid" data-reveal-stagger>
          <figure class="testimonial-item" data-stagger-item>
            <blockquote class="testimonial-quote">{{TESTIMONIAL_1_TEXT}}</blockquote>
            <figcaption class="testimonial-attr"><strong>{{TESTIMONIAL_1_NAME}}</strong> <span aria-hidden="true">·</span> {{TESTIMONIAL_1_CITY}}</figcaption>
          </figure>
          <figure class="testimonial-item" data-stagger-item>
            <blockquote class="testimonial-quote">{{TESTIMONIAL_2_TEXT}}</blockquote>
            <figcaption class="testimonial-attr"><strong>{{TESTIMONIAL_2_NAME}}</strong> <span aria-hidden="true">·</span> {{TESTIMONIAL_2_CITY}}</figcaption>
          </figure>
        </div>
        <div class="cta-block" data-reveal>
          <div>
            <h2>{{FINAL_CTA_HEADLINE}}</h2>
            <p class="section-sub">{{FINAL_CTA_SUB}}</p>
          </div>
          <div class="cta-block-actions">
            <a class="btn btn-primary btn-lg" href="/contact">{{FINAL_CTA_PRIMARY_LABEL}}</a>
            <a class="btn btn-ghost btn-lg" href="tel:{{PHONE_NUMBER_E164}}">{{FINAL_CTA_SECONDARY_LABEL}}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <span class="eyebrow">{{HOME_FAQ_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{HOME_FAQ_H2_LINE_1}} <span class="accent">{{HOME_FAQ_H2_ACCENT}}</span></h2>
        <p class="section-sub" data-reveal>{{HOME_FAQ_INTRO}}</p>
        <div class="faq-block" data-reveal>
${faqItem("{{HOME_FAQ_1_QUESTION}}", "{{HOME_FAQ_1_ANSWER}}")}
${faqItem("{{HOME_FAQ_2_QUESTION}}", "{{HOME_FAQ_2_ANSWER}}")}
${faqItem("{{HOME_FAQ_3_QUESTION}}", "{{HOME_FAQ_3_ANSWER}}")}
${faqItem("{{HOME_FAQ_4_QUESTION}}", "{{HOME_FAQ_4_ANSWER}}")}
        </div>
      </div>
    </section>`;

  return pageWrap(head, main, shellFooter({ includeHours: true }), shellScripts());
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
  </script>
  ${ABOUT_FAQ_LD}
  ${BREADCRUMB_ABOUT}
  ${webPageDateModifiedLd('"{{SITE_URL}}/about"', '"{{ABOUT_PAGE_TITLE}}"')}`,
  });

  const main = `
    <div class="page-hero">
      <div class="container">
        <span class="eyebrow">{{ABOUT_SECTION_KICKER}}</span>
        <h1>{{ABOUT_H1_LINE_1}} <span class="accent">{{ABOUT_H1_ACCENT}}</span></h1>
        <p class="section-sub">{{ABOUT_LEAD}}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <span class="eyebrow">{{ABOUT_MISSION_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{ABOUT_MISSION_H2_LINE_1}} <span class="accent">{{ABOUT_MISSION_H2_ACCENT}}</span></h2>
        <div class="editorial-split" data-reveal>
          <div class="editorial-body">
            <p>{{ABOUT_MISSION_P1}}</p>
            <p>{{ABOUT_MISSION_P2}}</p>
            <p>{{ABOUT_MISSION_P3}}</p>
          </div>
          <aside>
            <div class="quote-card">
              <p class="quote-text">{{ABOUT_MISSION_PULL_QUOTE}}</p>
              <p class="quote-attr">{{ABOUT_MISSION_PULL_QUOTE_NAME}} &nbsp;·&nbsp; {{ABOUT_MISSION_PULL_QUOTE_BYLINE}}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <span class="eyebrow">{{ABOUT_VALUES_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{ABOUT_VALUES_H2_LINE_1}} <span class="accent">{{ABOUT_VALUES_H2_ACCENT}}</span></h2>
        <div class="values-grid" data-reveal-stagger style="margin-top:2.5rem">
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">01</span><h3>{{ABOUT_VALUE_TILE_1_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_1_BODY}}</p></div>
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">02</span><h3>{{ABOUT_VALUE_TILE_2_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_2_BODY}}</p></div>
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">03</span><h3>{{ABOUT_VALUE_TILE_3_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_3_BODY}}</p></div>
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">04</span><h3>{{ABOUT_VALUE_TILE_4_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_4_BODY}}</p></div>
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">05</span><h3>{{ABOUT_VALUE_TILE_5_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_5_BODY}}</p></div>
          <div class="value-cell" data-stagger-item><span class="value-num" aria-hidden="true">06</span><h3>{{ABOUT_VALUE_TILE_6_TITLE}}</h3><p>{{ABOUT_VALUE_TILE_6_BODY}}</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <span class="eyebrow">{{ABOUT_SERVE_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{ABOUT_SERVE_H2_LINE_1}} <span class="accent">{{ABOUT_SERVE_H2_ACCENT}}</span></h2>
        <p class="section-sub" data-reveal>{{ABOUT_SERVE_INTRO}}</p>
        <div class="grid-auto" data-reveal-stagger>
          <div class="card" data-stagger-item><h3>{{ABOUT_SERVE_CARD_1_TITLE}}</h3><p>{{ABOUT_SERVE_CARD_1_BODY}}</p><div class="card-tag">{{ABOUT_SERVE_CARD_1_TAG}}</div></div>
          <div class="card" data-stagger-item><h3>{{ABOUT_SERVE_CARD_2_TITLE}}</h3><p>{{ABOUT_SERVE_CARD_2_BODY}}</p><div class="card-tag">{{ABOUT_SERVE_CARD_2_TAG}}</div></div>
          <div class="card" data-stagger-item><h3>{{ABOUT_SERVE_CARD_3_TITLE}}</h3><p>{{ABOUT_SERVE_CARD_3_BODY}}</p><div class="card-tag">{{ABOUT_SERVE_CARD_3_TAG}}</div></div>
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <span class="eyebrow">{{ABOUT_FAQ_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{ABOUT_FAQ_H2_LINE_1}} <span class="accent">{{ABOUT_FAQ_H2_ACCENT}}</span></h2>
        <div class="faq-block" data-reveal>
${faqItem("{{ABOUT_FAQ_1_QUESTION}}", "{{ABOUT_FAQ_1_ANSWER}}")}
${faqItem("{{ABOUT_FAQ_2_QUESTION}}", "{{ABOUT_FAQ_2_ANSWER}}")}
${faqItem("{{ABOUT_FAQ_3_QUESTION}}", "{{ABOUT_FAQ_3_ANSWER}}")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-band" data-reveal>
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

  return pageWrap(head, main, shellFooter(), shellScripts());
}

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
  </script>
  ${SERVICES_FAQ_LD}
  ${BREADCRUMB_SERVICES}
  ${webPageDateModifiedLd('"{{SITE_URL}}/services"', '"{{SERVICES_PAGE_TITLE}}"')}`,
  });

  const svcRow = (n, name, body, tag) => `          <div class="svc-row" data-stagger-item>
            <span class="svc-n">${n}</span>
            <div><h3>${name}</h3><p>${body}</p></div>
            <span class="svc-tag">${tag}</span>
          </div>`;

  const main = `
    <div class="page-hero">
      <div class="container">
        <span class="eyebrow">{{SERVICES_SECTION_KICKER}}</span>
        <h1>{{SERVICES_H1_LINE_1}} <span class="accent">{{SERVICES_H1_ACCENT}}</span></h1>
        <p class="section-sub">{{SERVICES_INTRO}}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <span class="eyebrow">{{SERVICES_GRID_SECTION_KICKER}}</span>
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
        <span class="eyebrow">{{SERVICES_PROBLEM_SECTION_KICKER}}</span>
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
        <span class="eyebrow">{{SERVICES_VISIT_SECTION_KICKER}}</span>
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
        <span class="eyebrow">{{SERVICES_WHY_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{SERVICES_WHY_H2_LINE_1}} <span class="accent">{{SERVICES_WHY_H2_ACCENT}}</span></h2>
        <div class="why-grid" data-reveal-stagger>
          <div class="why-cell" data-stagger-item><h3>{{HOME_VALUE_TILE_1_TITLE}}</h3><p>{{HOME_VALUE_TILE_1_BODY}}</p><div class="card-tag">{{WHY_CHOOSE_1_TAG}}</div></div>
          <div class="why-cell" data-stagger-item><h3>{{HOME_VALUE_TILE_2_TITLE}}</h3><p>{{HOME_VALUE_TILE_2_BODY}}</p><div class="card-tag">{{WHY_CHOOSE_2_TAG}}</div></div>
          <div class="why-cell" data-stagger-item><h3>{{HOME_VALUE_TILE_3_TITLE}}</h3><p>{{HOME_VALUE_TILE_3_BODY}}</p><div class="card-tag">{{WHY_CHOOSE_3_TAG}}</div></div>
        </div>
        <p style="margin-top:2.25rem" data-reveal>
          <a href="/about" class="area-link">{{SERVICES_WHY_STORY_LINK_LABEL}}</a>
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <span class="eyebrow">{{SERVICES_FAQ_SECTION_KICKER}}</span>
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

  return pageWrap(head, main, shellFooter(), shellScripts());
}

export function buildArticlesHtml() {
  const head = shellHead({
    title: "{{ARTICLES_PAGE_TITLE}}",
    description: "{{ARTICLES_META_DESCRIPTION}}",
    canonical: "{{SITE_URL}}/articles",
    ogUrl: "{{SITE_URL}}/articles",
    extraHead: `
  ${BREADCRUMB_ARTICLES}
  ${webPageDateModifiedLd('"{{SITE_URL}}/articles"', '"{{ARTICLES_PAGE_TITLE}}"')}`,
  });

  const postLink = (n) => `          <a class="post-link" href="{{ARTICLE_${n}_URL}}" data-stagger-item>
            <div class="post-top">
              <div class="post-eyebrow">{{ARTICLE_${n}_CATEGORY}}</div>
              <div class="post-date">{{ARTICLE_${n}_DATE}}</div>
            </div>
            <div class="post-title">{{ARTICLE_${n}_TITLE}}</div>
            <p class="post-excerpt">{{ARTICLE_${n}_EXCERPT}}</p>
            <div class="post-cta">{{ARTICLE_CARD_CTA_LABEL|Read the article →}}</div>
          </a>`;

  const main = `
    <div class="page-hero">
      <div class="container">
        <span class="eyebrow">{{ARTICLES_SECTION_KICKER}}</span>
        <h1>{{ARTICLES_H1_LINE_1}} <span class="accent">{{ARTICLES_H1_ACCENT}}</span></h1>
        <p class="section-sub">{{ARTICLES_INTRO}}</p>
        <p class="section-sub" style="margin-top:0.75rem">{{ARTICLES_INTRO_SECOND}}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="post-list" data-reveal-stagger>
${postLink(1)}
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <h2 data-reveal-heading>Topics we hear <span class="accent">every single week</span></h2>
        <div class="topic-grid" data-reveal-stagger>
          <div class="topic-cell" data-stagger-item><div class="topic-label">{{SERVICE_1_TAG}}</div><h3>{{SERVICE_1_NAME}}</h3><p>{{SERVICE_1_DESC}}</p></div>
          <div class="topic-cell" data-stagger-item><div class="topic-label">{{SERVICE_2_TAG}}</div><h3>{{SERVICE_2_NAME}}</h3><p>{{SERVICE_2_DESC}}</p></div>
          <div class="topic-cell" data-stagger-item><div class="topic-label">{{SERVICE_3_TAG}}</div><h3>{{SERVICE_3_NAME}}</h3><p>{{SERVICE_3_DESC}}</p></div>
          <div class="topic-cell" data-stagger-item><div class="topic-label">Guide</div><h3>{{PRIMARY_KEYWORD_1}}</h3><p>{{PRIMARY_SERVICE}} tips for {{CITY}} homeowners.</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-block" data-reveal>
          <div>
            <h2>{{ARTICLES_CTA_HEADLINE}}</h2>
            <p class="section-sub">{{ARTICLES_CTA_SUB}}</p>
          </div>
          <div class="cta-block-actions">
            <a class="btn btn-primary btn-lg" href="/contact">{{ARTICLES_CTA_PRIMARY_LABEL}}</a>
            <a class="btn btn-ghost btn-lg" href="tel:{{PHONE_NUMBER_E164}}">{{ARTICLES_CTA_SECONDARY_LABEL}}</a>
          </div>
        </div>
      </div>
    </section>`;

  return pageWrap(head, main, shellFooter(), shellScripts());
}

export function buildContactHtml() {
  const head = shellHead({
    title: "{{CONTACT_PAGE_TITLE}}",
    description: "{{CONTACT_META_DESCRIPTION}}",
    canonical: "{{SITE_URL}}/contact",
    ogUrl: "{{SITE_URL}}/contact",
    extraHead: `
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"ContactPage",
    "name":"{{CONTACT_PAGE_TITLE}}",
    "url":"{{SITE_URL}}/contact",
    "about":{"@type":"LocalBusiness","name":"{{BUSINESS_NAME}}","telephone":"{{PHONE_NUMBER_E164}}"}
  }
  </script>
  ${BREADCRUMB_CONTACT}
  ${webPageDateModifiedLd('"{{SITE_URL}}/contact"', '"{{CONTACT_PAGE_TITLE}}"')}`,
  });

  const main = `
    <div class="page-hero">
      <div class="container">
        <span class="eyebrow">{{CONTACT_SECTION_KICKER}}</span>
        <h1>{{CONTACT_H1_LINE_1}} <span class="accent">{{CONTACT_H1_ACCENT}}</span></h1>
        <p class="section-sub">{{CONTACT_LEAD}}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="contact-2col" data-reveal>
          <div class="contact-card">
            <h3>{{CONTACT_CALL_CARD_TITLE}}</h3>
            <p>{{CONTACT_CALL_COPY}}</p>
            <a class="btn btn-primary btn-lg" href="tel:{{PHONE_NUMBER_E164}}" style="width:100%;justify-content:center;margin-bottom:1.5rem">{{PHONE_NUMBER_DISPLAY}}</a>
            <div class="contact-meta">
              <div class="meta-row"><span class="meta-label">Email</span><span class="meta-val"><a href="mailto:{{EMAIL}}">{{EMAIL}}</a></span></div>
              <div class="meta-row"><span class="meta-label">Hours</span><span class="meta-val">{{BUSINESS_HOURS}}</span></div>
              <div class="meta-row"><span class="meta-label">Notes</span><span class="meta-val">{{CONTACT_CALL_META_HTML}}</span></div>
            </div>
          </div>
          <div class="contact-card">
            <h3>{{CONTACT_FORM_CARD_TITLE}}</h3>
            <p>{{CONTACT_FORM_INTRO}}</p>
            <form id="contact-form" class="form-grid" action="{{CONTACT_FORM_ACTION}}" method="{{CONTACT_FORM_METHOD}}" novalidate>
              <div class="form-field">
                <label class="form-label" for="name">{{CONTACT_FIELD_NAME_LABEL}}</label>
                <input class="form-input" id="name" name="name" type="text" autocomplete="name" required />
              </div>
              <div class="form-field">
                <label class="form-label" for="phone">{{CONTACT_FIELD_PHONE_LABEL}}</label>
                <input class="form-input" id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required />
              </div>
              <div class="form-field">
                <label class="form-label" for="address">{{CONTACT_FIELD_ADDRESS_LABEL}}</label>
                <input class="form-input" id="address" name="address" type="text" autocomplete="street-address" required />
              </div>
              <div class="form-field">
                <label class="form-label" for="service">{{CONTACT_FIELD_SERVICE_LABEL}}</label>
                <select class="form-input" id="service" name="service" required>
                  <option value="" disabled selected>{{CONTACT_SERVICE_SELECT_PLACEHOLDER}}</option>
                  <option value="service-1">{{CONTACT_SERVICE_OPTION_1}}</option>
                  <option value="service-2">{{CONTACT_SERVICE_OPTION_2}}</option>
                  <option value="service-3">{{CONTACT_SERVICE_OPTION_3}}</option>
                  <option value="other">{{CONTACT_SERVICE_OPTION_OTHER}}</option>
                </select>
              </div>
              <div class="form-field">
                <label class="form-label" for="timing">{{CONTACT_FIELD_TIMING_LABEL}}</label>
                <select class="form-input" id="timing" name="timing">
                  <option>{{CONTACT_TIMING_OPTION_1}}</option>
                  <option>{{CONTACT_TIMING_OPTION_2}}</option>
                  <option>{{CONTACT_TIMING_OPTION_3}}</option>
                  <option>{{CONTACT_TIMING_OPTION_4}}</option>
                </select>
              </div>
              <div class="form-field">
                <label class="form-label" for="message">{{CONTACT_FIELD_MESSAGE_LABEL}}</label>
                <textarea class="form-input" id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg" style="width:100%;justify-content:center">{{CONTACT_FORM_SUBMIT_LABEL}}</button>
              <p class="form-note">{{CONTACT_FORM_FOOTNOTE}}</p>
            </form>
            <div id="form-success" style="display:none;margin-top:1rem;color:var(--copper);font-weight:600;line-height:1.6">{{CONTACT_FORM_SUCCESS_MESSAGE}}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-warm">
      <div class="container">
        <span class="eyebrow">{{CONTACT_NEXT_STEPS_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{CONTACT_NEXT_STEPS_H2_LINE_1}} <span class="accent">{{CONTACT_NEXT_STEPS_H2_ACCENT}}</span></h2>
        <div class="steps-4" data-reveal-stagger>
          <div class="step4-cell" data-stagger-item><em>{{CONTACT_NEXT_STEP_1_LABEL}}</em><h3>{{CONTACT_NEXT_STEP_1_TITLE}}</h3><p>{{CONTACT_NEXT_STEP_1_BODY}}</p></div>
          <div class="step4-cell" data-stagger-item><em>{{CONTACT_NEXT_STEP_2_LABEL}}</em><h3>{{CONTACT_NEXT_STEP_2_TITLE}}</h3><p>{{CONTACT_NEXT_STEP_2_BODY}}</p></div>
          <div class="step4-cell" data-stagger-item><em>{{CONTACT_NEXT_STEP_3_LABEL}}</em><h3>{{CONTACT_NEXT_STEP_3_TITLE}}</h3><p>{{CONTACT_NEXT_STEP_3_BODY}}</p></div>
          <div class="step4-cell" data-stagger-item><em>{{CONTACT_NEXT_STEP_4_LABEL}}</em><h3>{{CONTACT_NEXT_STEP_4_TITLE}}</h3><p>{{CONTACT_NEXT_STEP_4_BODY}}</p></div>
        </div>
        <div class="card" style="margin-top:2rem;border-color:var(--copper-line);background:var(--copper-dim)" data-reveal>
          <h3>{{CONTACT_RESPONSE_CARD_TITLE}}</h3>
          <p style="margin:.45rem 0 0">{{CONTACT_RESPONSE_TIME}}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <span class="eyebrow">{{CONTACT_FAQ_SECTION_KICKER}}</span>
        <h2 data-reveal-heading>{{CONTACT_FAQ_H2_LINE_1}} <span class="accent">{{CONTACT_FAQ_H2_ACCENT}}</span></h2>
        <div class="faq-block" data-reveal>
${faqItem("{{CONTACT_FAQ_1_QUESTION}}", "{{CONTACT_FAQ_1_ANSWER}}")}
${faqItem("{{CONTACT_FAQ_2_QUESTION}}", "{{CONTACT_FAQ_2_ANSWER}}")}
${faqItem("{{CONTACT_FAQ_3_QUESTION}}", "{{CONTACT_FAQ_3_ANSWER}}")}
        </div>
        <div class="map-wrap" style="margin-top:3rem" data-reveal>
          <iframe title="{{MAP_IFRAME_TITLE}}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="{{MAP_EMBED_URL}}"></iframe>
        </div>
      </div>
    </section>`;

  return pageWrap(head, main, shellFooter({ includeHours: true }), shellScripts());
}

export function buildArticlePostHtml() {
  const head = shellHead({
    title: "{{ARTICLE_POST_PAGE_TITLE}}",
    description: "{{ARTICLE_POST_META_DESCRIPTION}}",
    canonical: "{{SITE_URL}}{{ARTICLE_1_URL}}",
    ogUrl: "{{SITE_URL}}{{ARTICLE_1_URL}}",
    cssHref: "../styles.css",
    faviconHref: "../favicon.svg",
    ogType: "article",
    ogImage: "{{ARTICLE_POST_OG_IMAGE_URL}}",
    extraHead: `
  <script type="application/ld+json">
{{ARTICLE_POST_SCHEMA_JSON}}
  </script>
  ${BREADCRUMB_ARTICLE_POST}
  ${webPageDateModifiedLd('"{{SITE_URL}}/articles/{{ARTICLE_1_URL}}"', '"{{ARTICLE_1_TITLE}}"')}`,
  });

  const main = `
    <div class="page-hero article-shell">
      <div class="container">
        <p class="article-back"><a href="/articles">← {{NAV_LABEL_ARTICLES}}</a></p>
        <p class="article-meta-line"><span class="article-cat">{{ARTICLE_POST_CATEGORY}}</span><span class="article-meta-sep"> · </span><time datetime="">{{ARTICLE_POST_DATE}}</time><span class="article-meta-sep"> · </span>{{ARTICLE_POST_AUTHOR_LINE}}</p>
        <h1 class="article-h1">{{ARTICLE_POST_H1_LINE_1}} <span class="accent">{{ARTICLE_POST_H1_ACCENT}}</span></h1>
        <p class="section-sub article-dek">{{ARTICLE_POST_DEK}}</p>
        <div class="article-tldr-wrap">{{ARTICLE_POST_TLDR_HTML}}</div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="article-body article-prose">{{ARTICLE_POST_BODY_HTML}}</div>
        <div class="cta-band" style="margin-top:2.75rem" data-reveal>
          <div>
            <h2>{{FINAL_CTA_HEADLINE}}</h2>
            <p class="section-sub">{{FINAL_CTA_SUB}}</p>
          </div>
          <div class="cta-band-actions">
            <a class="btn btn-primary btn-lg" href="/contact">{{FINAL_CTA_PRIMARY_LABEL}}</a>
            <a class="btn btn-ghost btn-lg" href="tel:{{PHONE_NUMBER_E164}}">{{FINAL_CTA_SECONDARY_LABEL}}</a>
          </div>
        </div>
      </div>
    </section>`;

  return `<!DOCTYPE html>
<!--
  Build: copy this file to ARTICLE_POST_SLUG_FILENAME (e.g. articles/roof-maintenance-houston-tx.html), then replace tokens.
  Public URL is ARTICLE_1_URL (extensionless, root-relative, e.g. /articles/roof-maintenance-houston-tx). CSS/icons use ../ from articles/.
-->
<html lang="{{HTML_LANG|en}}" class="no-js">
${head}
<body class="no-js {{HEADER_BRAND_CLASS|header-brand--text}}">
${shellNav()}

  <main id="main">
${main}
  </main>

${shellFooter()}
${shellScripts("..")}
</body>
</html>`;
}

export const SUPPLEMENTAL_CSS = `
/* ── Ahana starter template extensions ───────────────────── */

.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.skip-link:focus {
  left: 1rem !important;
  top: 1rem !important;
  width: auto !important;
  height: auto !important;
  z-index: 300;
  padding: 0.55rem 0.85rem;
  background: var(--bg-card);
  color: var(--ink);
  border-radius: 3px;
  border: 1px solid var(--line-mid);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.88rem;
}

.nav-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}
.nav-logo .logo__img {
  height: 36px;
  width: auto;
  max-width: min(160px, 34vw);
  object-fit: contain;
  display: none;
}
/* Safe defaults: text-only wordmark unless image / image+text mode */
.nav-logo__media:not(:has(.logo__img)) { display: none; }
.nav-logo__text--beside { display: none; }
body.header-brand--text .nav-logo__text--beside { display: none !important; }
body.header-brand--image .nav-logo .logo__img { display: block; }
body.header-brand--image .nav-logo__text { display: none !important; }
body.header-brand--image-text .nav-logo .logo__img { display: block; }
body.header-brand--image-text .nav-logo__text--fallback { display: none !important; }
body.header-brand--image-text .nav-logo .dot { display: none !important; }
body.header-brand--image-text .nav-logo__text--beside { display: inline; white-space: nowrap; }

.area-split.split--text-only { grid-template-columns: 1fr; }
.area-split.split--text-only .area-photo { display: none; }

.article-shell { padding-top: 0; }
.article-back { margin-bottom: 1.25rem; font-size: 0.88rem; }
.article-back a { color: var(--copper); text-decoration: none; font-weight: 500; }
.article-back a:hover { color: var(--ink); }
.article-meta-line {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--faint);
  margin-bottom: 1rem;
}
.article-cat { color: var(--copper); }
.article-h1 { font-size: clamp(2rem, 4vw, 3.2rem); margin-bottom: 1rem; }
.article-dek { margin-bottom: 1.5rem; }
.article-tldr-wrap {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 1.5rem 1.35rem;
  margin-bottom: 0;
}
.article-prose {
  color: var(--muted);
  line-height: 1.75;
  max-width: 65ch;
}
.article-prose h2 {
  color: var(--ink);
  font-size: 1.45rem;
  margin: 2rem 0 0.75rem;
}
.article-prose h3 {
  color: var(--ink);
  font-size: 1.1rem;
  margin: 1.5rem 0 0.5rem;
}
.article-prose p { margin-bottom: 1rem; }
.article-prose ul,
.article-prose ol { margin: 0 0 1rem 1.25rem; }
.article-prose li { margin-bottom: 0.35rem; }
.article-prose a { color: var(--copper); }
`;

export const MAIN_JS_EXTRA = `
  /* ── Smooth scroll for hash links ─────────────────────── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var hash = a.getAttribute('href');
    if (!hash || hash === '#') return;
    var target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });

  /* ── Phone click tracking ─────────────────────────────── */
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'phone_click', {
          event_category: 'Contact',
          event_label: a.href
        });
      }
    });
  });

  /* ── Contact form (demo / non-Netlify) ─────────────────── */
  var form = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (form.getAttribute('data-netlify') === 'true') return;
      var action = (form.getAttribute('action') || '').trim();
      if (action && action !== '#' && !/^javascript:/i.test(action)) {
        try {
          var u = new URL(action, window.location.href);
          if (u.origin !== window.location.origin) return;
        } catch (err) {
          return;
        }
      }
      e.preventDefault();
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    });
  }

  /* ── Nav active state (extensionless paths) ───────────── */
  function pathKeyFromPathname(p) {
    var pathOnly = (p || '').split(/[?#]/)[0];
    var trimmed = pathOnly.replace(/\\/+$/, '');
    if (!trimmed) return 'index';
    var segs = trimmed.split('/');
    var last = segs[segs.length - 1] || '';
    if (last.endsWith('.html')) last = last.slice(0, -5);
    return last || 'index';
  }

  var path = pathKeyFromPathname(window.location.pathname);
  document.querySelectorAll('.nav-link, .nav-menu-link').forEach(function (a) {
    var h = a.getAttribute('href');
    if (!h || h.charAt(0) === '#' || /^tel:/i.test(h)) return;
    try {
      var file = pathKeyFromPathname(new URL(h, window.location.href).pathname);
      if (file === path) a.setAttribute('aria-current', 'page');
    } catch (err) {}
  });
`;
