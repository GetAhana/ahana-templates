import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svc1 = fs.readFileSync(path.join(__dirname, "service-1.html"), "utf8");

const pTitle = svc1.indexOf("<title>");
const pMeta = svc1.indexOf('<meta name="description"');
const pMetaEnd = svc1.indexOf("/>", pMeta) + 2;
const pLd = svc1.indexOf('<script type="application/ld+json">');
const pLdEnd = svc1.indexOf("</script>", pLd) + "</script>".length;
const pHeadEnd = svc1.indexOf("</head>");
const headTop = svc1.slice(0, pTitle);
const headMid = svc1.slice(pMetaEnd, pLd);
const headClose = svc1.slice(pLdEnd, pHeadEnd);

const pBody = svc1.indexOf("<body>");
const pMain = svc1.indexOf("<main>");
const pSticky = svc1.indexOf('<div class="sticky-cta"');
const pBodyEnd = svc1.indexOf("</body>");

const headerBlock = svc1.slice(pBody, pMain);
const stickyBlock = svc1.slice(pSticky, pBodyEnd);

function ldJson(n) {
  const L = `LOCATION_${n}_`;
  return `<script type="application/ld+json">
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
  </script>
`;
}

function mainInner(n) {
  const L = `LOCATION_${n}_`;
  const others = [1, 2, 3]
    .filter((i) => i !== n)
    .map(
      (i) =>
        `        <a href="location-${i}.html">{{LOCATION_${i}_MENU_LABEL|Area ${i}}}</a>`
    )
    .join("\n");
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

  return `<main>
    <div class="container">
      <div class="k">Local service SEO · {{${L}MENU_LABEL|Submarket}}</div>
      <h1>{{${L}H1|${h1Default}}}</h1>
      <div class="hook">{{${L}LEAD|${leadDefault} This page matches that intent with service-first messaging tied to neighborhoods you actually dispatch to.}}</div>
      <p>{{${L}SUPPORT_PARA|Tell us the seasons, permitting quirks, and competitor noise you deal with in this pocket of your market; we fold those details into headings, internal links, and FAQs.}}</p>

      <h2>Core services homeowners search for <span>in this area</span></h2>
      <p class="tight">{{${L}SERVICES_INTRO|Align this block with high-intent queries (e.g. storm + city). Each card should reflect a real offer your crews deliver in this submarket.}}</p>
      <div class="loc-grid">
        <div class="loc-card">
          <h3>{{${L}SVC_A_TITLE|Storm &amp; hail response}}</h3>
          <p>{{${L}SVC_A_BODY|Documentation-first inspections, insurance-friendly estimates, and crews who know how local weather patterns show up on roofs here.}}</p>
        </div>
        <div class="loc-card">
          <h3>{{${L}SVC_B_TITLE|Full roof replacement}}</h3>
          <p>{{${L}SVC_B_BODY|Material options suited to wind exposure, venting, and HOA or municipal requirements common in this corridor.}}</p>
        </div>
        <div class="loc-card">
          <h3>{{${L}SVC_C_TITLE|Exteriors &amp; water management}}</h3>
          <p>{{${L}SVC_C_BODY|Siding, gutters, flashing, and envelope details that stop repeat callbacks—written as local proof, not buzzwords.}}</p>
        </div>
      </div>

      <h2>Neighborhoods &amp; <span>dispatch reality</span></h2>
      <p class="tight">{{${L}NEIGHBORHOODS|Name the subdivisions or zip clusters you want to show up for. Search engines reward specificity; visitors reward honesty about where you’re fastest.}}</p>
      <ul class="detail-list">
        <li>{{${L}BULLET_1|Same-week emergency tarping when storms track across this submarket.}}</li>
        <li>{{${L}BULLET_2|Code-aware replacements for older housing stock common in established neighborhoods.}}</li>
        <li>{{${L}BULLET_3|Photo-heavy estimates so homeowners understand scope before work starts.}}</li>
      </ul>

      <h2>Questions <span>we answer on the phone</span></h2>
      <details class="faq-it">
        <summary>{{${L}FAQ_Q1|Do you offer same-week estimates in this area?}}</summary>
        <p>{{${L}FAQ_A1|Yes—when capacity allows we prioritize local emergency and storm-related calls and schedule estimates quickly.}}</p>
      </details>
      <details class="faq-it">
        <summary>{{${L}FAQ_Q2|Which services do you route to crews closest to this submarket?}}</summary>
        <p>{{${L}FAQ_A2|We align dispatch with the services listed on this page so homeowners get crews familiar with local codes, weather, and materials.}}</p>
      </details>

      <div class="loc-cross" aria-label="Related pages">
        <a href="service-area.html">Full service area</a>
${others}
        <a href="services.html">All services</a>
        <a href="contact.html">Request a quote</a>
      </div>

      <div class="loc-map">
        <div id="service-area-map" role="img" aria-label="Map showing service coverage for {{${L}MENU_LABEL}}" data-lat="{{MAP_CENTER_LAT}}" data-lng="{{MAP_CENTER_LNG}}" data-zoom="{{MAP_ZOOM|10}}"></div>
      </div>
      <span id="biz-name-for-map" hidden>{{BUSINESS_NAME}}</span>
      <script type="application/json" id="area-markers-json">{{SERVICE_AREA_MAP_MARKERS_JSON}}</script>
      <script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>
      <script src="./ahana-service-area-map.js" defer></script>
    </div>
  </main>`;
}

for (const n of [1, 2, 3]) {
  const L = `LOCATION_${n}_`;
  const titleLine = `  <title>{{${L}SEO_TITLE}}</title>`;
  const metaLine = `  <meta name="description" content="{{${L}META_DESCRIPTION}}" />`;
  const headNew =
    headTop +
    titleLine +
    "\n" +
    metaLine +
    "\n" +
    headMid +
    ldJson(n) +
    headClose +
    "\n</head>\n";

  const out =
    headNew +
    headerBlock +
    "\n" +
    mainInner(n) +
    "\n\n" +
    stickyBlock +
    "\n</body>\n</html>\n";

  fs.writeFileSync(path.join(__dirname, `location-${n}.html`), out, "utf8");
  console.log("location-" + n);
}
