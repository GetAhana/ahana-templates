/** Reusable JSON-LD blocks for Ahana templates (token placeholders substituted at build). */

export function aggregateRatingField() {
  return `,"aggregateRating":{"@type":"AggregateRating","ratingValue":"{{REVIEW_RATING}}","reviewCount":"{{REVIEW_COUNT}}"}`;
}

export function reviewLdScript(n) {
  return `
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Review",
    "itemReviewed":{"@type":"LocalBusiness","name":"{{BUSINESS_NAME}}"},
    "author":{"@type":"Person","name":"{{TESTIMONIAL_${n}_NAME}}"},
    "reviewBody":"{{TESTIMONIAL_${n}_TEXT}}",
    "reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"}
  }
  </script>`;
}

/** Build FAQPage JSON-LD from token pairs { q, a } where values are full JSON string tokens e.g. "{{HOME_FAQ_1_QUESTION}}" */
export function faqPageLd(pairs) {
  const entities = pairs
    .map(({ q, a }) => `{"@type":"Question","name":${q},"acceptedAnswer":{"@type":"Answer","text":${a}}}`)
    .join(",");
  return `
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[${entities}]
  }
  </script>`;
}

export function breadcrumbLd(items) {
  const list = items
    .map((item, i) => {
      const name = item.name.includes("{{") ? item.name : `"${item.name}"`;
      const url = item.url.includes("{{") ? item.url : `"${item.url}"`;
      return `{"@type":"ListItem","position":${i + 1},"name":${name},"item":${url}}`;
    })
    .join(",");
  return `
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[${list}]
  }
  </script>`;
}

export const HOME_FAQ_LD = faqPageLd([
  { q: '"{{HOME_FAQ_1_QUESTION}}"', a: '"{{HOME_FAQ_1_ANSWER}}"' },
  { q: '"{{HOME_FAQ_2_QUESTION}}"', a: '"{{HOME_FAQ_2_ANSWER}}"' },
  { q: '"{{HOME_FAQ_3_QUESTION}}"', a: '"{{HOME_FAQ_3_ANSWER}}"' },
  { q: '"{{HOME_FAQ_4_QUESTION}}"', a: '"{{HOME_FAQ_4_ANSWER}}"' },
]);

export const SERVICES_FAQ_LD = faqPageLd([
  { q: '"{{SERVICES_FAQ_1_QUESTION}}"', a: '"{{SERVICES_FAQ_1_ANSWER}}"' },
  { q: '"{{SERVICES_FAQ_2_QUESTION}}"', a: '"{{SERVICES_FAQ_2_ANSWER}}"' },
  { q: '"{{SERVICES_FAQ_3_QUESTION}}"', a: '"{{SERVICES_FAQ_3_ANSWER}}"' },
  { q: '"{{SERVICES_FAQ_4_QUESTION}}"', a: '"{{SERVICES_FAQ_4_ANSWER}}"' },
]);

export const ABOUT_FAQ_LD = faqPageLd([
  { q: '"{{ABOUT_FAQ_1_QUESTION}}"', a: '"{{ABOUT_FAQ_1_ANSWER}}"' },
  { q: '"{{ABOUT_FAQ_2_QUESTION}}"', a: '"{{ABOUT_FAQ_2_ANSWER}}"' },
  { q: '"{{ABOUT_FAQ_3_QUESTION}}"', a: '"{{ABOUT_FAQ_3_ANSWER}}"' },
]);

export const BREADCRUMB_HOME = breadcrumbLd([
  { name: '"{{BREADCRUMB_HOME_LABEL|Home}}"', url: '"{{SITE_URL}}/"' },
]);

export const BREADCRUMB_SERVICES = breadcrumbLd([
  { name: '"{{BREADCRUMB_HOME_LABEL|Home}}"', url: '"{{SITE_URL}}/"' },
  { name: '"{{NAV_LABEL_SERVICES}}"', url: '"{{SITE_URL}}/services"' },
]);

export const BREADCRUMB_ABOUT = breadcrumbLd([
  { name: '"{{BREADCRUMB_HOME_LABEL|Home}}"', url: '"{{SITE_URL}}/"' },
  { name: '"{{NAV_LABEL_ABOUT}}"', url: '"{{SITE_URL}}/about"' },
]);

export const BREADCRUMB_ARTICLES = breadcrumbLd([
  { name: '"{{BREADCRUMB_HOME_LABEL|Home}}"', url: '"{{SITE_URL}}/"' },
  { name: '"{{NAV_LABEL_ARTICLES}}"', url: '"{{SITE_URL}}/articles"' },
]);

export const BREADCRUMB_CONTACT = breadcrumbLd([
  { name: '"{{BREADCRUMB_HOME_LABEL|Home}}"', url: '"{{SITE_URL}}/"' },
  { name: '"{{NAV_LABEL_CONTACT}}"', url: '"{{SITE_URL}}/contact"' },
]);

export const BREADCRUMB_ARTICLE_POST = breadcrumbLd([
  { name: '"{{BREADCRUMB_HOME_LABEL|Home}}"', url: '"{{SITE_URL}}/"' },
  { name: '"{{NAV_LABEL_ARTICLES}}"', url: '"{{SITE_URL}}/articles"' },
  { name: '"{{ARTICLE_1_TITLE}}"', url: '"{{SITE_URL}}/articles/{{ARTICLE_1_URL}}"' },
]);

export const ENHANCED_HOME_FAQ_LD = faqPageLd([
  { q: '"Do you offer emergency service?"', a: '"{{EMERGENCY_FAQ_ANSWER}}"' },
  { q: '"How fast can you come out?"', a: '"{{SCHEDULING_FAQ_ANSWER}}"' },
  { q: '"Do you provide free estimates?"', a: '"{{ESTIMATE_FAQ_ANSWER}}"' },
]);

export const ENHANCED_SERVICES_FAQ_LD = faqPageLd([
  { q: '"{{SERVICES_FAQ_1_QUESTION}}"', a: '"{{SERVICES_FAQ_1_ANSWER}}"' },
  { q: '"{{SERVICES_FAQ_2_QUESTION}}"', a: '"{{SERVICES_FAQ_2_ANSWER}}"' },
  { q: '"{{SERVICES_FAQ_3_QUESTION}}"', a: '"{{SERVICES_FAQ_3_ANSWER}}"' },
]);

export function serviceLdBlock() {
  return `
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Service",
    "serviceType":"{{PRIMARY_SERVICE}}",
    "provider":{"@type":"LocalBusiness","name":"{{BUSINESS_NAME}}"},
    "areaServed": {{AREA_SERVED_JSON}}
  }
  </script>`;
}

export function webPageDateModifiedLd(pageUrl, pageNameToken) {
  return `
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"WebPage",
    "name":${pageNameToken},
    "url":${pageUrl},
    "dateModified":"{{SITE_LAST_MODIFIED}}"
  }
  </script>`;
}
