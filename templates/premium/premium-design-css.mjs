/** Premium-tier component CSS (Coal & Terracotta dark — nav dropdown, local SEO, services 7–10) */

export const PREMIUM_COMPONENT_CSS = `
/* ── Premium tier extensions ────────────────────────────── */

.cta-row {
  margin-top: 2rem;
}
.cta-row--inline {
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
}
.section--pb-lg {
  padding-bottom: 6rem;
}
.area-panel-copy {
  color: var(--muted);
  margin-top: 0.55rem;
  line-height: 1.75;
}
.area-panel-actions {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.contact-meta {
  margin-top: 1rem;
  color: var(--muted);
  line-height: 1.65;
}
.contact-form-intro {
  margin: 0;
  color: var(--muted);
}
.cta-band--spaced {
  margin-top: 3rem;
}

/* Service area nav dropdown (desktop pill nav) */
.nav-links li.nav-dd {
  position: relative;
  list-style: none;
  display: flex;
  align-items: center;
}
.nav-links li.nav-dd::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 0.55rem;
}
.nav-dd-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--muted);
  padding: 0.38rem 0.75rem;
  border-radius: 100px;
  white-space: nowrap;
  transition: color 0.18s var(--ease), background 0.18s var(--ease);
  -webkit-tap-highlight-color: transparent;
}
.nav-dd-trigger:hover,
.nav-dd-trigger:focus-visible {
  color: var(--ink);
  background: rgba(242,237,230,0.07);
}
.nav-dd-trigger[aria-current="page"] {
  color: var(--ink);
  background: rgba(242,237,230,0.07);
}
.nav-dd-caret {
  font-size: 0.62em;
  opacity: 0.75;
  transform: translateY(1px);
}
.nav-dd-panel {
  display: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% + 0.55rem);
  min-width: 220px;
  background: rgba(17,16,9,0.96);
  backdrop-filter: blur(18px);
  border: 1px solid var(--line-mid);
  border-radius: 8px;
  padding: 0.35rem 0;
  box-shadow: 0 14px 40px rgba(0,0,0,0.45);
  z-index: 220;
  list-style: none;
  margin: 0;
}
.nav-dd-panel li { margin: 0; }
.nav-dd-panel a {
  display: block;
  padding: 0.55rem 1.1rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--muted);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.18s, background 0.18s;
}
.nav-dd-panel a:hover,
.nav-dd-panel a:focus-visible {
  color: var(--copper);
  background: rgba(201,105,66,0.08);
}
.nav-dd-panel a[aria-current="page"] {
  color: var(--copper);
}
.nav-dd:hover .nav-dd-panel,
.nav-dd:focus-within .nav-dd-panel,
.nav-dd-panel.is-open {
  display: block;
}

/* Mobile overlay — service area subgroup */
.nav-overlay-sa-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  width: 100%;
  padding: 0.75rem 2rem 0;
  margin-top: 0.35rem;
  border-top: 1px solid var(--line);
}
.nav-overlay-sa-label {
  font-size: 0.67rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--copper);
  margin-bottom: 0.25rem;
}
.nav-menu-link--sub {
  font-size: clamp(1.15rem, 3.5vw, 1.65rem) !important;
  font-weight: 600 !important;
  opacity: 0.85;
}

/* Service area hub — local landing cards */
.local-pages-section {
  margin-top: 2.75rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}
.local-pages-section h2 {
  margin-bottom: 0.35rem;
}
.local-pages-section h2 span {
  color: var(--copper);
}
.local-pages-section .section-lead {
  margin: 0 0 1.25rem;
  color: var(--muted);
  line-height: 1.75;
  max-width: 860px;
  font-size: 0.98rem;
}
.local-pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1px;
  background: var(--line);
  margin-top: 1.25rem;
}
.local-page-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.35rem 1.4rem;
  background: var(--bg-card);
  text-decoration: none;
  color: inherit;
  transition: background 0.2s var(--ease);
}
.local-page-card:hover {
  background: var(--bg-card-2);
}
.local-page-card__k {
  font-size: 0.67rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--copper);
}
.local-page-card strong {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.08rem;
  font-weight: 800;
  color: var(--ink);
}
.local-page-card__d {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.6;
}

/* Local landing pages (location-*) */
.loc-page {
  padding-bottom: 5rem;
}
.loc-page .page-kicker {
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--copper);
  margin-bottom: 0.5rem;
}
.loc-page .hook {
  color: var(--muted);
  line-height: 1.7;
  max-width: 720px;
  margin-top: 0.85rem;
  font-size: 1.02rem;
}
.loc-page .loc-prose {
  color: var(--muted);
  line-height: 1.75;
  max-width: 72ch;
  margin-top: 1rem;
}
.loc-page h2 {
  margin-top: 2.25rem;
  margin-bottom: 0.55rem;
}
.loc-page h2 span {
  color: var(--copper);
}
.loc-page .section-sub {
  margin-top: 0.35rem;
}
.loc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1px;
  background: var(--line);
  margin-top: 1.25rem;
}
.loc-card {
  background: var(--bg-card);
  padding: 1.5rem 1.4rem;
}
.loc-card h3 {
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
}
.loc-card p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.65;
}
.loc-cross {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1.5rem;
}
.loc-cross a {
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
.loc-cross a:hover {
  border-color: var(--copper);
}
.loc-map {
  border: 1px solid var(--line);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 2rem;
  background: var(--bg-card);
}
.loc-map__img {
  display: block;
  width: 100%;
  height: auto;
  min-height: 280px;
  max-height: 420px;
  object-fit: cover;
}
.loc-map__credit {
  margin: 0;
  padding: 0.45rem 0.75rem;
  font-size: 0.68rem;
  color: var(--faint);
  background: var(--bg-card-2);
  border-top: 1px solid var(--line);
}
.loc-map__credit a {
  color: inherit;
  font-weight: 600;
}
.chips-fallback {
  margin-top: 1.75rem;
  font-weight: 600;
  color: var(--muted);
}

/* Services hub — six detail cards + services 7–10 band */
.svc-priority-grid--six {
  grid-template-columns: repeat(3, 1fr);
}
.svc-priority-grid--extended {
  grid-template-columns: repeat(4, 1fr);
}
.svc-hub-extended {
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--line);
}

/* Premium testimonials CTA band */
.tts-services--premium {
  margin-top: 3rem;
  padding: 2.5rem;
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 3px;
}
.tts-services--premium .tts-services-lead {
  color: var(--muted);
  line-height: 1.75;
  max-width: 52rem;
  margin-top: 0.5rem;
}
.tts-services--premium .tts-services-lead strong {
  color: var(--ink);
  font-weight: 600;
}

@media (max-width: 900px) {
  .svc-priority-grid--six,
  .svc-priority-grid--extended {
    grid-template-columns: 1fr;
  }
  .local-pages-grid,
  .loc-grid {
    grid-template-columns: 1fr;
  }
}
`;
