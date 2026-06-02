/** Coal & Terracotta dark shell — shared by starter sync and enhanced tier */

export const FONTS =
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
  robots = "",
}) {
  const robotsTag = robots ? `\n  <meta name="robots" content="${robots}" />` : "";
  return `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />${robotsTag}
  <meta name="theme-color" content="${themeColor}" />
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
  <link rel="icon" href="${faviconHref}" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="${faviconHref}" />
  <link rel="manifest" href="./site.webmanifest" />${extraHead}
</head>`;
}

export function shellNavEnhanced() {
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
        <li><a class="nav-link" href="/service-area">{{SERVICE_AREA_PAGE_LABEL|Areas}}</a></li>
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
      <li><a class="nav-menu-link" href="/service-area">{{SERVICE_AREA_PAGE_LABEL|Service Area}}</a></li>
    </ul>
    <div class="nav-overlay-footer">
      <a class="btn btn-primary" href="tel:{{PHONE_NUMBER_E164}}">{{PHONE_NUMBER_DISPLAY}}</a>
    </div>
  </div>`;
}

export function shellFooterEnhanced({ includeHours = true, includeEmail = true } = {}) {
  const contactItems = [
    `<li><a href="tel:{{PHONE_NUMBER_E164}}">{{PHONE_NUMBER}}</a></li>`,
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
        <div class="footer-col-label">{{FOOTER_PAGES_HEADING|Pages}}</div>
        <ul class="footer-links" role="list">
          <li><a href="/">{{NAV_LABEL_HOME|Home}}</a></li>
          <li><a href="/services">{{NAV_LABEL_SERVICES|Services}}</a></li>
          <li><a href="/gallery">Gallery</a></li>
          <li><a href="/testimonials">{{TESTIMONIALS_PAGE_LABEL|Testimonials}}</a></li>
          <li><a href="/about">{{NAV_LABEL_ABOUT|About}}</a></li>
          <li><a href="/articles">{{NAV_LABEL_ARTICLES|Articles}}</a></li>
          <li><a href="/service-area">{{SERVICE_AREA_PAGE_LABEL|Service area}}</a></li>
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
${shellNavEnhanced()}

  <main id="main">
${main}
  </main>

${footer}
${scripts}
</body>
</html>`;
}

export function minimalPageWrap(head, bodyMain, scripts = "") {
  return `<!DOCTYPE html>
<html lang="{{HTML_LANG|en}}" class="no-js">
${head}
<body class="no-js minimal-page">
  <main id="main" class="minimal-main">
${bodyMain}
  </main>
${scripts || `  <script src="./main.js" defer></script>`}
</body>
</html>`;
}
