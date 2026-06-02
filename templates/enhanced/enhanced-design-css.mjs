/** Enhanced-tier component CSS (dark Coal & Terracotta) */

export const ENHANCED_COMPONENT_CSS = `
/* ── Enhanced tier extensions ───────────────────────────── */

/* Nav logo: default text-only; hide empty / unreplaced logo slot */
.nav-logo .logo__img {
  height: 36px;
  width: auto;
  max-width: min(160px, 34vw);
  object-fit: contain;
  display: none;
}
.nav-logo__media:not(:has(.logo__img)) { display: none; }
.nav-logo__text--beside { display: none; }
body.header-brand--image .nav-logo .logo__img { display: block; }
body.header-brand--image-text .nav-logo .logo__img { display: block; }
body.header-brand--image-text .nav-logo__text--beside { display: inline; white-space: nowrap; }

/* Dense pill nav (Enhanced: 7 links + CTAs) — keep labels on one line */
@media (min-width: 761px) and (max-width: 1180px) {
  .nav-pill {
    gap: 0.5rem;
    padding-left: 1rem;
    padding-right: 0.45rem;
  }
  .nav-link {
    font-size: 0.76rem;
    padding: 0.35rem 0.5rem;
  }
  .nav-cta .btn-sm {
    padding: 0.4rem 0.65rem;
    font-size: 0.74rem;
  }
  .nav-logo {
    max-width: 9.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* Split home hero: .hero grid (text column + image column) from base styles.css */
.hero.enhanced-hero .hero-h1 {
  max-width: 640px;
  margin-bottom: 1rem;
}
.hero.enhanced-hero .hero-h1 .accent,
.hero.enhanced-hero .hero-h1 span { color: var(--copper); }
.hero.enhanced-hero .hero-sub {
  max-width: 620px;
  margin-bottom: 1.5rem;
}
.enhanced-hero .hero-kicker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-bottom: 1.1rem;
}
.enhanced-hero .hk {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--copper-dim);
  border: 1px solid var(--copper-line);
  color: var(--ink);
  border-radius: 100px;
  padding: 0.35rem 0.75rem;
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.enhanced-hero .hk strong { color: var(--copper); }
.enhanced-hero .hero-cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}
.enhanced-hero .hero-proof {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 3px;
  overflow: hidden;
}
.enhanced-hero .proof {
  background: var(--bg-card);
  padding: 1.25rem 1.15rem;
}
.enhanced-hero .p-title {
  font-size: 0.67rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--copper);
  font-weight: 600;
}
.enhanced-hero .p-val {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 1.05rem;
  margin-top: 0.25rem;
  color: var(--ink);
}
.enhanced-hero .p-sub {
  font-size: 0.82rem;
  color: var(--faint);
  line-height: 1.6;
  margin-top: 0.5rem;
}

.trust-bar {
  background: var(--bg-2);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 1.35rem 0;
}
.trust-row {
  max-width: var(--w);
  margin: 0 auto;
  padding: 0 2.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem 2.5rem;
}
.trust-item {
  font-size: 0.88rem;
  color: var(--muted);
}
.trust-item b { color: var(--ink); font-weight: 600; }

.enh-label {
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--copper);
  margin-bottom: 0.65rem;
}
.enh-title { margin-bottom: 0.75rem; }
.enh-title span { color: var(--copper); }
.enh-body {
  color: var(--muted);
  line-height: 1.75;
  max-width: 720px;
  margin-bottom: 1.5rem;
}

/* Home services: Enhanced = 6 primary → 2×3; use .svc-grid--8 for 8 → 2×4 */
.svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  margin-top: 2rem;
}
.svc-grid.svc-grid--8 {
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 1024px) {
  .svc-grid.svc-grid--8 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .svc-grid,
  .svc-grid.svc-grid--8 { grid-template-columns: 1fr; }
}
.svc-grid .svc-tile {
  display: block;
  text-decoration: none;
  color: inherit;
  background: var(--bg-card);
  padding: 1.75rem 1.5rem;
  transition: background 0.2s var(--ease);
}
.svc-grid .svc-tile:hover { background: var(--bg-card-2); }
.svc-grid .svc-tile h3 { margin-bottom: 0.45rem; }
.svc-grid .svc-tile p {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.65;
  margin: 0;
}

.steps-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  margin-top: 2rem;
}
.steps-row .step-cell {
  background: var(--bg-card);
  padding: 2rem 1.75rem;
}
.steps-row .step-num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 2rem;
  color: var(--copper);
  opacity: 0.35;
  line-height: 1;
  margin-bottom: 0.75rem;
}
.steps-row h3 { margin-bottom: 0.5rem; }
.steps-row p { font-size: 0.9rem; color: var(--muted); line-height: 1.65; margin: 0; }

[data-carousel] {
  margin-top: 2rem;
  border: 1px solid var(--line);
  border-radius: 3px;
  overflow: hidden;
  background: var(--bg-card);
}
[data-carousel] .c-track {
  display: flex;
  transition: transform 0.45s var(--ease);
}
[data-carousel] .c-item {
  flex: 0 0 100%;
  min-width: 100%;
}
[data-carousel] .c-item img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
}
[data-carousel] .c-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  border-top: 1px solid var(--line);
  gap: 1rem;
}
[data-carousel] .c-btn {
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.82rem;
  padding: 0.45rem 0.9rem;
  border-radius: 3px;
  border: 1px solid var(--line-mid);
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
[data-carousel] .c-btn:hover { border-color: var(--copper); color: var(--copper); }
[data-carousel] .c-meta { font-size: 0.82rem; color: var(--faint); }

.area-split-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
}
.area-panel {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 2rem 1.75rem;
}
.area-panel h3 { margin-bottom: 0.75rem; }
.area-panel--cta {
  background: var(--bg-card-2);
  border-color: var(--copper-line);
}
.area-list { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem; }
.area-list .li {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.6;
}
.area-list .li svg { flex-shrink: 0; color: var(--copper); margin-top: 0.15rem; }

.testi-preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  margin-top: 1.5rem;
}
.testi-preview-grid .card {
  background: var(--bg-card);
  padding: 1.75rem 1.5rem;
}
.testi-preview-grid .card h3 { font-size: 0.95rem; margin-bottom: 0.65rem; }
.testi-preview-grid .card p {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.7;
  font-style: italic;
}
.testi-preview-grid .card-meta {
  margin-top: 0.85rem;
  font-size: 0.75rem;
  color: var(--faint);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.cta-section-dark {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 3rem 2.5rem;
}

/* Service hub */
.svc-hub-section {
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--line);
  position: relative;
}
.svc-hub-section:first-of-type { margin-top: 2rem; padding-top: 0; border-top: 0; }
.svc-hub-section > h2 {
  margin: 0.35rem 0 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: clamp(1.35rem, 3vw, 1.85rem);
  line-height: 1.15;
}
.svc-hub-section > .section-sub { margin-top: 0.75rem; max-width: 720px; }
.svc-priority-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  margin-top: 1.5rem;
  align-items: stretch;
}
.svc-detail-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  background: var(--bg-card);
  padding: 2rem 1.75rem;
  min-height: 0;
  transition: background 0.2s var(--ease);
}
.svc-detail-card:hover { background: var(--bg-card-2); }
.svc-detail-card h3 { margin: 0 0 0.5rem; font-size: 1.12rem; }
.svc-detail-card p { font-size: 0.9rem; color: var(--muted); line-height: 1.65; flex: 1; margin: 0; }
.feature-lm {
  margin-top: 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--copper);
}
.feature-ico { display: none !important; }
.svc-add-more {
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--line);
  position: relative;
  z-index: 1;
  clear: both;
}
.svc-more-h2 {
  margin: 0.35rem 0 0.75rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: clamp(1.35rem, 3vw, 1.85rem);
  line-height: 1.15;
}
.svc-add-more > .section-sub { margin-top: 0; max-width: 720px; }
.svc-additional-list {
  margin-top: 1.25rem;
  padding-left: 1.25rem;
  color: var(--muted);
  line-height: 1.75;
  max-width: 720px;
}
.svc-additional-list li { margin-bottom: 0.35rem; }
@media (max-width: 900px) {
  .svc-priority-grid { grid-template-columns: 1fr; }
}
@media (min-width: 901px) and (max-width: 1100px) {
  .svc-priority-grid { grid-template-columns: repeat(2, 1fr); }
}

.sticky-svc-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 150;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: rgba(17,16,9,0.92);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--line);
}
.sticky-svc-primary,
.sticky-svc-call {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  padding: 0.62rem 1.2rem;
  border-radius: 3px;
}
.sticky-svc-primary {
  background: var(--copper);
  color: #fff;
}
.sticky-svc-call {
  border: 1px solid var(--line-mid);
  color: var(--ink);
}

/* Service detail pages */
.service-page { padding-bottom: 6rem; }
.service-page .page-kicker {
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--copper);
  margin-bottom: 0.5rem;
}
.service-page .hook {
  color: var(--muted);
  line-height: 1.7;
  max-width: 720px;
  margin-top: 0.85rem;
  font-size: 1.02rem;
}
.service-page .specs {
  margin-top: 1rem;
  color: var(--muted);
  line-height: 1.7;
}
.service-proof-callout {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin: 1.5rem 0;
  padding: 1.25rem 1.15rem;
  background: var(--copper-dim);
  border: 1px solid var(--copper-line);
  border-radius: 3px;
}
.service-proof-callout .proof { margin: 0; color: var(--muted); font-size: 0.92rem; line-height: 1.65; }
.proof-mark {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--copper);
  flex-shrink: 0;
  margin-top: 0.45rem;
}
.acc-block {
  margin-top: 1rem;
  border: 1px solid var(--line);
  border-radius: 3px;
  background: var(--bg-card);
}
.acc-block summary {
  padding: 1rem 1.15rem;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
  color: var(--ink);
}
.acc-block summary::-webkit-details-marker { display: none; }
.acc-block .acc-inner {
  padding: 0 1.15rem 1.15rem;
  color: var(--muted);
  font-size: 0.94rem;
  line-height: 1.65;
}
.detail-list { margin: 0.75rem 0 0 1.15rem; }
.detail-list li { margin-bottom: 0.4rem; }

.ba {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.25rem;
}
.ba .shot {
  border: 1px solid var(--line);
  border-radius: 3px;
  overflow: hidden;
  background: var(--bg-card);
}
.ba .shot img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
.ba figcaption {
  padding: 0.55rem 0.85rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--faint);
}

.wall {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: var(--line);
  margin-top: 1.25rem;
  align-items: stretch;
}
.wall .card {
  background: var(--bg-card);
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
}
.wall blockquote {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.7;
  font-style: italic;
  margin: 0;
  flex: 1;
}
.wall .by {
  margin-top: 0.85rem;
  font-size: 0.82rem;
  color: var(--faint);
}
.wall .by span { opacity: 0.7; }
/* Odd counts: last review spans full width (e.g. 5 → 2×2 + 1 centered) */
.wall--count-1 { grid-template-columns: 1fr; max-width: 42rem; }
.wall--count-3 .wall-card--span,
.wall--count-5 .wall-card--span,
.wall--count-7 .wall-card--span {
  grid-column: 1 / -1;
  max-width: min(42rem, 100%);
  justify-self: center;
  width: 100%;
}
@media (max-width: 700px) {
  .wall { grid-template-columns: 1fr; max-width: none; }
  .wall--count-3 .wall-card--span,
  .wall--count-5 .wall-card--span,
  .wall--count-7 .wall-card--span {
    max-width: none;
    grid-column: auto;
  }
}

.related {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.65rem;
}
.related a {
  display: inline-flex;
  padding: 0.5rem 0.95rem;
  border-radius: 3px;
  background: var(--bg-card);
  border: 1px solid var(--line-mid);
  color: var(--copper);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.85rem;
}
.related a:hover { border-color: var(--copper); }

.sticky-cta-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 150;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: rgba(17,16,9,0.92);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--line);
}

/* Gallery page */
.gallery-after {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}
.gallery-after h2 span { color: var(--copper); }
.gallery-cta-row {
  margin-top: 1.25rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Articles hub */
#ahana-articles-posts {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--line);
  margin-top: 2.25rem;
}
.js-ahana-article-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: var(--bg-card);
  padding: 1.55rem 1.6rem;
  transition: background 0.2s var(--ease), padding-left 0.2s;
}
.js-ahana-article-card:hover {
  background: var(--bg-card-2);
  padding-left: 1.85rem;
}
.js-ahana-article-card .tag {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--copper);
}
.js-ahana-article-card .top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
}
.js-ahana-article-card h2 {
  font-size: 1.45rem;
  margin-bottom: 0.55rem;
}
.js-ahana-article-card .excerpt {
  margin: 0;
  color: var(--muted);
  line-height: 1.75;
}
.js-ahana-article-card .meta { color: var(--faint); font-size: 0.88rem; font-weight: 600; }
.ahana-articles-empty {
  margin-top: 1.5rem;
  color: var(--muted);
  line-height: 1.75;
  max-width: 760px;
}

/* Service area */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.25rem 0;
}
.chip {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--line-mid);
  border-radius: 100px;
  font-size: 0.82rem;
  color: var(--muted);
}
#area-map-wrap,
.map {
  margin-top: 1.5rem;
  border: 1px solid var(--line);
  border-radius: 3px;
  overflow: hidden;
}
#service-area-map {
  width: 100%;
  height: 380px;
  background: var(--bg-card);
}
.sa-prose {
  color: var(--muted);
  line-height: 1.75;
  max-width: 760px;
  margin-top: 1rem;
}
.sa-cross { margin-top: 3rem; padding-top: 2.5rem; border-top: 1px solid var(--line); }
.sa-cross-h2 { margin-bottom: 0.75rem; }
.sa-cross-intro { color: var(--muted); line-height: 1.75; max-width: 760px; margin-bottom: 1.5rem; }
.sa-xgrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
}
.sa-xcard {
  background: var(--bg-card);
  padding: 1.75rem 1.5rem;
}
.sa-xcard h3 { margin-bottom: 0.5rem; }
.sa-xcard h3 a { color: var(--ink); text-decoration: none; }
.sa-xcard h3 a:hover { color: var(--copper); }
.sa-xcard p { font-size: 0.9rem; color: var(--muted); line-height: 1.65; margin: 0; }
.sa-xcard-lm {
  display: inline-block;
  margin-top: 0.85rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--copper);
  text-decoration: none;
}
.sa-hub {
  margin-top: 3rem;
  padding: 2.5rem;
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 3px;
}
.sa-hub-k {
  font-size: 0.67rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--copper);
  margin-bottom: 0.5rem;
}
.sa-hub-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.25rem; }

/* Testimonials page */
.tts-services {
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--line);
}
.tts-services-k {
  font-size: 0.67rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--copper);
}
.tts-services-links {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1.25rem;
  margin: 1.25rem 0;
  padding: 0;
}
.tts-services-links a {
  color: var(--copper);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
}
.tts-services-links a:hover { color: var(--ink); }

/* About depth page */
.depth-page { padding-bottom: 4rem; }
.about-hero {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: start;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--line);
  margin-bottom: 3rem;
}
.about-hero .sub { color: var(--muted); line-height: 1.75; margin-top: 0.75rem; }
.depth-aside {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 2rem 1.75rem;
}
.depth-quote {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 1.05rem;
  line-height: 1.55;
  color: var(--ink);
}
.depth-attr {
  margin-top: 1rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--faint);
}
.about-story { margin-bottom: 3rem; }
.about-prose p {
  color: var(--muted);
  line-height: 1.75;
  margin-top: 0.85rem;
  max-width: 72ch;
}
.values-6 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  margin: 1.5rem 0 3rem;
}
.depth-val {
  background: var(--bg-card);
  padding: 1.75rem 1.5rem;
  position: relative;
}
.depth-vn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--copper);
  opacity: 0.15;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.depth-val h3 { margin-bottom: 0.45rem; font-size: 1rem; }
.depth-val p { font-size: 0.88rem; color: var(--muted); line-height: 1.65; margin: 0; }
.depth-h { margin-bottom: 1.5rem; }
.depth-h .sub { color: var(--muted); margin-top: 0.5rem; line-height: 1.75; }
.depth-h .grid-auto {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  margin-top: 1.5rem;
}
.depth-h .card {
  background: var(--bg-card);
  padding: 1.75rem 1.5rem;
}
.depth-h .card .tag {
  margin-top: 0.85rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--copper);
}

/* Contact enhanced */
.contact-enh-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 1.5rem;
  margin-top: 2rem;
}
.contact-enh-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 2rem 1.75rem;
}
.contact-enh-card h2 { font-size: 1.25rem; margin-bottom: 0.65rem; }
.contact-enh-card .big {
  display: inline-block;
  margin-top: 1rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 1.35rem;
  color: var(--copper);
  text-decoration: none;
}
.contact-enh-card label {
  display: block;
  font-size: 0.67rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--faint);
  margin: 1rem 0 0.35rem;
}
.contact-enh-card input,
.contact-enh-card select,
.contact-enh-card textarea {
  width: 100%;
  padding: 0.65rem 0.75rem;
  background: rgba(242,237,230,0.04);
  border: 1px solid var(--line-mid);
  border-radius: 3px;
  color: var(--ink);
  font-family: inherit;
  font-size: 0.92rem;
}
.contact-enh-card .row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.contact-enh-card button[type="submit"],
.contact-enh-card button {
  margin-top: 1.25rem;
  width: 100%;
  padding: 0.75rem;
  background: var(--copper);
  color: #fff;
  border: none;
  border-radius: 3px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.92rem;
  cursor: pointer;
}
#ok { display: none; margin-top: 1rem; color: var(--copper); font-weight: 600; }

/* Legal / minimal */
.legal-page { padding-bottom: 4rem; }
.legal-page h2 {
  font-size: 1.25rem;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}
.legal-page p,
.legal-page ul {
  color: var(--muted);
  line-height: 1.75;
  margin-top: 0.75rem;
}
.legal-page ul { padding-left: 1.25rem; }
.legal-page a { color: var(--copper); }
.legal-inline-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
  font-size: 0.88rem;
  color: var(--faint);
}
.minimal-page {
  background: var(--bg);
  color: var(--ink);
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
.minimal-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}
.minimal-main h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-top: 0.5rem;
}
.minimal-main p {
  margin-top: 1rem;
  color: var(--muted);
  max-width: 440px;
  line-height: 1.65;
}
.minimal-actions {
  margin-top: 1.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}
.minimal-code {
  font-size: 0.85rem;
  color: var(--faint);
  margin-top: 0.5rem;
}

@media (max-width: 900px) {
  .enhanced-hero .hero-proof { grid-template-columns: 1fr; }
  .steps-row,
  .testi-preview-grid,
  .svc-priority-grid,
  .sa-xgrid,
  .values-6,
  .depth-h .grid-auto,
  .ba,
  .wall,
  .area-split-panels,
  .contact-enh-grid,
  .about-hero { grid-template-columns: 1fr; }
}
`;
