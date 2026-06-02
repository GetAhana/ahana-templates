/** Home hero markup: Starter-style split (dark text column + image column with edge fade). */

export const ENHANCED_HOME_HERO_HTML = `
    <section class="hero enhanced-hero" id="hero">
      <div class="hero-content">
        <div class="hero-kicker" data-reveal>
          <div class="hk">Local pros in <strong>{{CITY}}, {{STATE}}</strong></div>
          <div class="hk">{{LICENSE_TYPE}}</div>
          <div class="hk">Rated {{REVIEW_RATING}}★ ({{REVIEW_COUNT}})</div>
        </div>
        <h1 class="hero-h1" data-reveal-heading>{{PRIMARY_SERVICE}} you can<br/><span class="accent">count on</span>.</h1>
        <p class="hero-sub" data-reveal>{{HERO_SUBHEADLINE|Residential and light commercial service with confident scheduling: priority dispatch for urgent calls, written estimates, and documented repairs across your primary service markets.}}</p>
        <div class="hero-cta-group" data-reveal>
          <a class="btn btn-primary btn-lg" href="tel:{{PHONE_NUMBER_E164}}">Call {{PHONE_NUMBER}}</a>
          <a class="btn btn-outline btn-lg" href="/contact">Get a free estimate</a>
        </div>
        <div class="hero-proof" data-reveal-stagger>
          <div class="proof" data-stagger-item>
            <div class="p-title">{{HERO_PROOF_1_TITLE|Fast response}}</div>
            <div class="p-val">{{HERO_PROOF_1_VALUE|Same-day priority}}</div>
            <div class="p-sub">{{HERO_PROOF_1_SUB|We prioritize urgent service calls with realistic arrival windows, clear written estimates before work begins, and transparent communication so you always understand the repair plan and pricing.}}</div>
          </div>
          <div class="proof" data-stagger-item>
            <div class="p-title">{{HERO_PROOF_2_TITLE|Photo updates}}</div>
            <div class="p-val">{{HERO_PROOF_2_VALUE|Documented}}</div>
            <div class="p-sub">{{HERO_PROOF_2_SUB|Job photos and notes show what we found on arrival, what you approved before we started, and the finished repair so you have a useful record for insurance, resale, or future service visits.}}</div>
          </div>
          <div class="proof" data-stagger-item>
            <div class="p-title">{{HERO_PROOF_3_TITLE|Warranty}}</div>
            <div class="p-val">{{HERO_PROOF_3_VALUE|1 year labor}}</div>
            <div class="p-sub">{{HERO_PROOF_3_SUB|Qualified installations and covered labor come with a written workmanship warranty and a straightforward process if something we addressed needs follow-up under the guarantee terms you receive at completion.}}</div>
          </div>
        </div>
      </div>
      <div class="hero-image-side" aria-hidden="true">
        <div class="hero-img-clip">
          <img src="{{HERO_IMAGE_URL}}" alt="" loading="eager" fetchpriority="high" width="900" height="1200" />
        </div>
      </div>
    </section>`;
