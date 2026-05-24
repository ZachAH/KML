import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ServicePage.css";
import couchImg from "../../assets/cleaning/services/robert_cushion.webp";
import extractionImg from "../../assets/cleaning/services/robert_extraction.webp";

declare global {
  interface Window {
    HCPWidget: any;
  }
}

const handleBooking = () => {
  if (window.HCPWidget) window.HCPWidget.openModal();
};

export default function CarpetUpholstery() {
  useEffect(() => {
    document.title =
      "Carpet & Upholstery Cleaning in West Bend, WI | Kettle Moraine Professional Cleaners";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Professional carpet and upholstery cleaning in Washington County, WI. IICRC-certified technicians, hot water extraction, 3M Scotchgard protection, and an 8-step process. Serving West Bend since 1987. Call (262) 334-1881."
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://kmpc.netlify.app/services/carpet-upholstery-cleaning");
    return () => { if (canonical) canonical.setAttribute("href", "https://kmpc.netlify.app/"); };
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section className="sp-hero">
        <p className="sp-eyebrow">Healthier Homes &amp; Workspaces</p>
        <h1>Carpet &amp; Upholstery Cleaning</h1>
        <p className="sp-hero-sub">
          Deep-cleaning services for carpets, rugs, and furniture — powered by
          IICRC-certified technicians and a proven 8-step process that removes
          dirt, allergens, and odors at the source.
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
              src={couchImg}
              alt="Technician cleaning upholstery cushions in West Bend, WI"
              loading="eager"
              width="800"
              height="1000"
            />
          </div>
          <div className="sp-overview-text">
            <h2>Restore the Comfort &amp; Health of Your Space</h2>
            <p>
              Everyday life leaves carpets and furniture holding onto dirt,
              allergens, pet dander, and odors that affect the comfort and
              health of your home or workplace. Vacuuming helps, but only
              professional hot water extraction reaches the deep-down
              contamination that vacuums leave behind.
            </p>
            <p>
              Our IICRC-certified technicians bring professional-grade
              equipment and a comprehensive 8-step cleaning process to every
              job — from pre-vacuuming and spot treatment to hot water
              extraction, fabric grooming, and optional 3M Scotchgard
              protection. The result is clean you can feel, with drying times
              typically measured in hours, not days.
            </p>
            <p>
              We serve residential and commercial clients throughout Washington
              County, Ozaukee County, and the greater Milwaukee area. Whether
              it's a single room of carpet or an entire facility's worth of
              upholstered seating, we're equipped to handle it.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ── */}
      <section className="sp-offer">
        <div className="sp-offer-inner">
          <h2>What We Clean</h2>
          <p className="sp-offer-lead">
            From wall-to-wall carpet to area rugs, sofas, and commercial seating
            — we have the training and equipment for every fiber type and soil
            condition.
          </p>
          <div className="sp-offer-grid">
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🏠</div>
              <h3>Residential Carpet Cleaning</h3>
              <p>
                Hot water extraction and low-moisture cleaning for all carpet
                types — Berber, cut pile, loop, and more. Safe for kids and
                pets.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🛋️</div>
              <h3>Upholstery Cleaning</h3>
              <p>
                Sofas, sectionals, loveseats, chairs, and ottomans. We identify
                the right method — hot water extraction, low moisture, or dry
                cleaning — based on your fabric's care code.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🧹</div>
              <h3>Area Rug Cleaning</h3>
              <p>
                On-location and in-plant cleaning for wool, synthetic, and
                delicate area rugs. Proper cleaning protects color, fiber, and
                value.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🛡️</div>
              <h3>3M Scotchgard Protection</h3>
              <p>
                Optional fabric protector applied after cleaning to repel
                future spills, slow re-soiling, and extend the life of your
                carpet and upholstery.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🌿</div>
              <h3>Spot &amp; Stain Treatment</h3>
              <p>
                Pre-treatment of heavily soiled areas, traffic lanes, and
                individual stains before the main extraction step for maximum
                removal.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🏢</div>
              <h3>Commercial Upholstery</h3>
              <p>
                Conference room chairs, lobby seating, and guest room
                upholstery. Scheduled maintenance programs available for
                businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ── */}
      <section className="sp-why">
        <div className="sp-why-inner">
          <h2>Our 8-Step Cleaning Process</h2>
          <div className="sp-why-grid">
            <div className="sp-why-item">
              <div className="sp-why-item-num">1</div>
              <h3>Pre-Inspection</h3>
              <p>
                We assess fiber type, soil level, stains, and any areas of
                concern before beginning.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">2</div>
              <h3>Pre-Vacuuming</h3>
              <p>
                Dry soil is removed first so it doesn't turn into mud during
                wet extraction.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">3</div>
              <h3>Pre-Spotting</h3>
              <p>
                Individual stains are pre-treated with targeted agents to break
                down stubborn soils.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">4</div>
              <h3>Pre-Conditioning</h3>
              <p>
                A professional cleaning agent is applied to emulsify oils and
                loosen deeply embedded dirt.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">5</div>
              <h3>Agitation</h3>
              <p>
                A grooming rake or brush works the pre-conditioner into the
                fiber to maximize soil release.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">6</div>
              <h3>Hot Water Extraction</h3>
              <p>
                High-pressure hot water is injected and immediately extracted
                along with dissolved soils and cleaning agents.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">7</div>
              <h3>Neutralizing</h3>
              <p>
                A pH-balancing rinse ensures no detergent residue remains in
                the fiber to attract future soil.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">8</div>
              <h3>Grooming &amp; Post-Inspection</h3>
              <p>
                Pile is groomed for even drying and a final inspection confirms
                the results meet our standards.
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
              src={extractionImg}
              alt="Hot water extraction carpet cleaning in Washington County Wisconsin"
              loading="lazy"
              width="800"
              height="1000"
            />
          </div>
          <div className="sp-overview-text">
            <h2>IICRC-Certified. Family-Owned. Serving Washington County Since 1987.</h2>
            <p>
              The Institute of Inspection, Cleaning and Restoration Certification
              (IICRC) sets the industry standard for cleaning professionals.
              Every technician on our team is trained and certified — meaning
              you get consistent, documented methods backed by industry science,
              not guesswork.
            </p>
            <p>
              As a family-owned business rooted in West Bend, WI, we've built
              our reputation one clean at a time. We work in your home or
              business the way we'd want someone to work in ours — with care,
              respect, and attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sp-faq">
        <div className="sp-faq-inner">
          <h2>Frequently Asked Questions</h2>

          <div className="sp-faq-item">
            <p className="sp-faq-q">How long does carpet cleaning take to dry?</p>
            <p className="sp-faq-a">
              Most carpets dry within 4–8 hours under normal household
              conditions. Opening windows, running fans, or turning on your
              HVAC system will speed drying. Heavily soiled carpets or thick
              pile may take slightly longer. We recommend staying off the carpet
              for at least 2 hours after cleaning.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">Is hot water extraction safe for all carpet types?</p>
            <p className="sp-faq-a">
              Hot water extraction (also called steam cleaning) is the
              IICRC-recommended method for most residential and commercial
              carpets. For delicate fibers like wool or certain natural
              materials, we adjust our methods accordingly during the
              pre-inspection. We'll always recommend the right process for your
              specific carpet.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">How often should I have my carpets professionally cleaned?</p>
            <p className="sp-faq-a">
              The IICRC recommends professional cleaning every 12–18 months for
              average households. Homes with pets, children, or allergy
              sufferers benefit from cleaning every 6–12 months. High-traffic
              commercial areas may require quarterly or even monthly maintenance
              cleaning to preserve appearance and extend carpet life.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">Can you remove pet odors and stains?</p>
            <p className="sp-faq-a">
              Yes. We use enzyme-based pre-treatment products designed to break
              down the proteins in pet urine that cause lingering odors. For
              severe urine contamination that has soaked into the pad or
              subfloor, we can discuss the best treatment options during our
              pre-inspection. Results vary based on the extent and age of the
              contamination.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">Do you move furniture before cleaning?</p>
            <p className="sp-faq-a">
              We move light furniture such as chairs, ottomans, and end tables
              as part of our standard service. For heavier pieces like sofas,
              beds, and large entertainment centers, we clean around them or
              can discuss options on a case-by-case basis.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sp-cta">
        <h2>Ready for a Cleaner, Healthier Home?</h2>
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
          <Link to="/services/lvt-tile-hard-surfaces">LVT, Tile &amp; Hard Surface Cleaning</Link>
          <Link to="/services/commercial-programs">Commercial Carpet &amp; Hard Floor Programs</Link>
          <Link to="/before-after">Before &amp; After Gallery</Link>
          <Link to="/about">About Us</Link>
        </div>
      </section>
    </main>
  );
}
