import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ServicePage.css";
import tileImg from "../../assets/cleaning/services/robert_extraction.webp";
import vanImg from "../../assets/cleaning/services/van.webp";

declare global {
  interface Window {
    HCPWidget: any;
  }
}

const handleBooking = () => {
  if (window.HCPWidget) window.HCPWidget.openModal();
};

export default function LVTTileHardSurfaces() {
  useEffect(() => {
    document.title =
      "LVT, Tile & Hard Surface Floor Cleaning in West Bend, WI | Kettle Moraine Professional Cleaners";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Professional LVT, tile, grout, hardwood, and natural stone floor cleaning in Washington County, WI. Manufacturer-safe processes. IICRC-certified. Serving West Bend since 1987. Call (262) 334-1881."
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://kmpc.netlify.app/services/lvt-tile-hard-surfaces");
    return () => { if (canonical) canonical.setAttribute("href", "https://kmpc.netlify.app/"); };
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section className="sp-hero">
        <p className="sp-eyebrow">Modern Floor Care Solutions</p>
        <h1>LVT, Tile &amp; Hard Surface Cleaning</h1>
        <p className="sp-hero-sub">
          Professional cleaning and restoration for all hard surface floors —
          LVT, luxury vinyl plank, tile and grout, hardwood, natural stone, and
          more. Manufacturer-safe methods by IICRC-certified technicians.
        </p>
        <button className="sp-hero-cta" type="button" onClick={handleBooking}>
          Schedule a Cleaning
        </button>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="sp-overview">
        <div className="sp-overview-inner">
          <div className="sp-overview-image">
            <img
              src={tileImg}
              alt="Professional tile and hard surface floor cleaning in West Bend Wisconsin"
              loading="eager"
              width="800"
              height="1000"
            />
          </div>
          <div className="sp-overview-text">
            <h2>Protect Your Investment. Restore Your Floors.</h2>
            <p>
              Hard surface floors are built to last — but without the right
              care, LVT, tile, grout, and natural stone can lose their
              protective finish, trap deep-set grime, and start to look worn
              long before their time. Consumer mops and grocery-store cleaners
              often leave behind residue that attracts more dirt, creating a
              cycle that wears down your floors.
            </p>
            <p>
              Our professional hard surface cleaning goes beyond the surface.
              We use manufacturer-recommended, pH-correct solutions and
              specialized equipment to extract embedded soil from grout lines,
              strip and re-coat vinyl floors where needed, and restore the
              natural luster of stone surfaces — all without the risk of
              over-wetting, warping, or finish damage that DIY cleaning can
              cause.
            </p>
            <p>
              Whether you have a single bathroom with stubborn grout or an
              entire facility's worth of hard floors, we customize our approach
              to your specific floor type and condition.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ── */}
      <section className="sp-offer">
        <div className="sp-offer-inner">
          <h2>Hard Surface Floors We Service</h2>
          <p className="sp-offer-lead">
            Every floor type has unique cleaning requirements. Our
            IICRC-certified technicians are trained to identify and apply the
            correct method for each surface.
          </p>
          <div className="sp-offer-grid">
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">◼</div>
              <h3>Tile &amp; Grout</h3>
              <p>
                Ceramic, porcelain, and quarry tile with deep grout line
                cleaning using high-pressure hot water extraction. Grout sealing
                available to prevent future staining.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🪵</div>
              <h3>Hardwood &amp; Engineered Wood</h3>
              <p>
                Low-moisture cleaning methods safe for solid, engineered, and
                laminate wood floors. Preserves finish integrity and prevents
                warping or swelling.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🔲</div>
              <h3>LVT &amp; Luxury Vinyl Plank</h3>
              <p>
                Cleaning and protective coating for LVT, LVP, VCT, and sheet
                vinyl. Strip-and-wax programs available for commercial VCT
                floors.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">💎</div>
              <h3>Natural Stone</h3>
              <p>
                Marble, granite, slate, and terrazzo require pH-neutral
                solutions to avoid etching. We clean, hone, and polish natural
                stone surfaces to their original brilliance.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🛡️</div>
              <h3>Grout Sealing</h3>
              <p>
                After deep cleaning, we apply a professional-grade grout sealer
                to lock out future stains and moisture — dramatically reducing
                cleaning effort going forward.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">✨</div>
              <h3>Restoration Cleaning</h3>
              <p>
                Floors with years of built-up residue, failed finish, or
                neglected grout benefit from our restorative process before
                transitioning to a regular maintenance program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PROFESSIONAL ── */}
      <section className="sp-why">
        <div className="sp-why-inner">
          <h2>Why Professional Hard Surface Cleaning Matters</h2>
          <div className="sp-why-grid">
            <div className="sp-why-item">
              <div className="sp-why-item-num">1</div>
              <h3>Correct Chemistry</h3>
              <p>
                Wrong pH cleaners etch stone, strip vinyl coatings, and cloud
                tile finishes. We use the right product for each surface.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">2</div>
              <h3>Deep Grout Extraction</h3>
              <p>
                High-pressure hot water extraction pulls soil out of grout
                pores that scrubbing can't reach.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">3</div>
              <h3>Manufacturer-Safe Methods</h3>
              <p>
                We follow manufacturer guidelines for each floor type, protecting
                your warranty and extending floor life.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">4</div>
              <h3>IICRC Certification</h3>
              <p>
                Our technicians are certified by the leading industry body,
                meaning documented, tested methods — not trial and error.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECOND IMAGE ── */}
      <section className="sp-overview" style={{ paddingTop: 0 }}>
        <div className="sp-overview-inner reverse">
          <div className="sp-overview-image">
            <img
              src={vanImg}
              alt="Kettle Moraine Professional Cleaners service vehicle in Washington County WI"
              loading="lazy"
              width="800"
              height="1000"
            />
          </div>
          <div className="sp-overview-text">
            <h2>Local, Family-Owned — Serving Washington County Since 1987</h2>
            <p>
              Kettle Moraine Professional Cleaners has been caring for floors
              in West Bend, Menomonee Falls, Germantown, Slinger, Hartford, and
              surrounding communities since 1987. When you hire us, you're
              working with experienced professionals who live and work in the
              same communities you do.
            </p>
            <p>
              We arrive on time, treat your space with respect, and stand
              behind our results. Most jobs are completed in a single visit,
              and our technicians will walk you through proper care and
              maintenance practices to keep your floors looking their best
              between professional cleanings.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sp-faq">
        <div className="sp-faq-inner">
          <h2>Frequently Asked Questions</h2>

          <div className="sp-faq-item">
            <p className="sp-faq-q">Can you clean LVT without damaging the wear layer?</p>
            <p className="sp-faq-a">
              Yes. LVT and LVP have a protective wear layer that can be damaged
              by abrasive scrubbers or high-pH alkaline cleaners. We use
              manufacturer-recommended, neutral-pH solutions and soft-agitation
              equipment specifically suited for vinyl flooring. Your floor's
              finish is preserved, not stripped.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">How do you clean grout without damaging tile?</p>
            <p className="sp-faq-a">
              Our process uses a pH-appropriate pre-treatment to loosen embedded
              soil in the grout matrix, followed by high-pressure hot water
              extraction that pulls the soil out without abrading the grout or
              surrounding tile. We adjust pressure and temperature based on
              tile type and grout age.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">Do you clean natural stone like marble and granite?</p>
            <p className="sp-faq-a">
              Yes. Natural stone requires special care — acidic cleaners (like
              vinegar or many consumer products) will permanently etch marble and
              limestone. We use stone-safe, pH-neutral cleaning agents and
              equipment appropriate for polished, honed, and textured finishes.
              We can also discuss honing and polishing options for etched or
              dull stone surfaces.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">How long after cleaning can we walk on the floors?</p>
            <p className="sp-faq-a">
              For tile and hard surface cleaning, floors are typically ready for
              foot traffic within 30–60 minutes. If we apply a grout sealer or
              floor finish, we'll provide specific curing time recommendations —
              generally 1–4 hours depending on the product and ambient conditions.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">Should I seal my grout after cleaning?</p>
            <p className="sp-faq-a">
              We strongly recommend it. Grout is naturally porous and will
              re-absorb soil and moisture almost immediately without a sealer.
              Professional sealing after deep cleaning dramatically slows
              re-soiling and makes routine maintenance far easier. Most grout
              sealers last 2–5 years depending on traffic and cleaning habits.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sp-cta">
        <h2>Give Your Floors the Care They Deserve</h2>
        <p>
          Serving West Bend, Menomonee Falls, Germantown, Slinger, Hartford, and
          all of Washington County and surrounding areas.
        </p>
        <div className="sp-cta-actions">
          <button
            className="sp-cta-btn-primary"
            type="button"
            onClick={handleBooking}
          >
            Schedule Online
          </button>
          <a className="sp-cta-btn-secondary" href="tel:+12623341881">
            Call (262) 334-1881
          </a>
        </div>
      </section>

      {/* ── SEO Internal Links ── */}
      <section className="sp-also">
        <div className="sp-also-inner">
          <p>Also see:</p>
          <Link to="/services/carpet-upholstery-cleaning">Carpet &amp; Upholstery Cleaning</Link>
          <Link to="/services/commercial-programs">Commercial Carpet &amp; Hard Floor Programs</Link>
          <Link to="/before-after">Before &amp; After Gallery</Link>
          <Link to="/about">About Us</Link>
        </div>
      </section>
    </main>
  );
}
