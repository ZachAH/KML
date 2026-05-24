import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ServicePage.css";
import vanImg from "../../assets/cleaning/services/van.webp";
import couchImg from "../../assets/cleaning/services/robert_cushion.webp";

declare global {
  interface Window {
    HCPWidget: any;
  }
}

const handleBooking = () => {
  if (window.HCPWidget) window.HCPWidget.openModal();
};

export default function CommercialPrograms() {
  useEffect(() => {
    document.title =
      "Commercial Carpet & Hard Floor Programs in West Bend, WI | Kettle Moraine Professional Cleaners";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Commercial carpet and hard floor cleaning programs in West Bend, WI and southeastern Wisconsin. Restorative & maintenance cleaning, construction clean-up, indoor air quality. IICRC-certified. Call (262) 334-1881."
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://kmpc.netlify.app/services/commercial-programs");
    return () => { if (canonical) canonical.setAttribute("href", "https://kmpc.netlify.app/"); };
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section className="sp-hero">
        <p className="sp-eyebrow">Smart Commercial Maintenance</p>
        <h1>Commercial Carpet &amp; Hard Floor Programs</h1>
        <p className="sp-hero-sub">
          Customized floor care programs for businesses, property managers, and
          facility teams — designed to protect your floors, reduce long-term
          costs, and maintain a clean, professional environment without
          disrupting daily operations.
        </p>
        <button className="sp-hero-cta" type="button" onClick={handleBooking}>
          Request a Program Quote
        </button>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="sp-overview">
        <div className="sp-overview-inner">
          <div className="sp-overview-image">
            <img
              src={vanImg}
              alt="Commercial floor cleaning service vehicle in West Bend Wisconsin"
              loading="eager"
              width="800"
              height="1000"
            />
          </div>
          <div className="sp-overview-text">
            <h2>Floor Care That Works Around Your Business</h2>
            <p>
              Managing a facility means juggling appearance, safety, and
              long-term costs — all while keeping operations running smoothly.
              Worn carpets and dull hard floors don't just look bad; they signal
              neglect to clients and employees and shorten the lifespan of your
              flooring investment.
            </p>
            <p>
              Our commercial floor care programs are built around your facility's
              needs. We work with property managers, office administrators,
              restaurant and retail operators, healthcare facilities, and more —
              scheduling cleaning during off-hours or between shifts so your
              business is never interrupted.
            </p>
            <p>
              From a one-time restorative clean before a major event to an
              ongoing monthly maintenance program, we provide the consistent
              results commercial environments demand — backed by IICRC
              certification and 30+ years of experience in Wisconsin.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ── */}
      <section className="sp-offer">
        <div className="sp-offer-inner">
          <h2>Commercial Cleaning Services</h2>
          <p className="sp-offer-lead">
            We handle carpet, hard floors, and post-construction cleanup for
            commercial facilities of all sizes across Washington County and
            southeastern Wisconsin.
          </p>
          <div className="sp-offer-grid">
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🏢</div>
              <h3>Commercial Carpet — Restorative</h3>
              <p>
                Deep extraction cleaning to reverse years of soil buildup,
                traffic lane darkening, and embedded contaminants. Ideal for
                pre-lease, post-lease, or before major business events.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🔄</div>
              <h3>Commercial Carpet — Maintenance</h3>
              <p>
                Scheduled low-moisture or hot water extraction programs that
                keep high-traffic areas clean between restorative cleans —
                extending carpet life and protecting your investment.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">◼</div>
              <h3>Hard Floor Care — Restorative</h3>
              <p>
                Strip, clean, and refinish for VCT and vinyl. Deep grout
                extraction and sealing for tile. Honing and polishing for
                natural stone. We restore floors that look past their prime.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">✨</div>
              <h3>Hard Floor Care — Maintenance</h3>
              <p>
                Scheduled scrub-and-recoat, burnishing, and periodic deep
                cleaning programs designed to maintain appearance and minimize
                the need for costly restorative work.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🏗️</div>
              <h3>Construction Clean-Up</h3>
              <p>
                Post-construction and post-renovation deep cleaning for
                commercial spaces. We remove construction dust, adhesive
                residue, and debris from all hard surface and carpet flooring.
              </p>
            </div>
            <div className="sp-offer-card">
              <div className="sp-offer-card-icon">🌬️</div>
              <h3>Indoor Air Quality Optimization</h3>
              <p>
                Carpets act as air filters, trapping dust, allergens, and
                contaminants. Regular professional extraction cleaning
                measurably improves indoor air quality — important for
                employee health and comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PROFESSIONAL ── */}
      <section className="sp-why">
        <div className="sp-why-inner">
          <h2>Why Commercial Clients Choose Us</h2>
          <div className="sp-why-grid">
            <div className="sp-why-item">
              <div className="sp-why-item-num">1</div>
              <h3>Flexible Scheduling</h3>
              <p>
                Early morning, evenings, and weekends — we work around your
                hours so cleaning never interrupts business operations.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">2</div>
              <h3>Documented Programs</h3>
              <p>
                We help you build a floor care schedule that satisfies
                manufacturer warranty requirements and keeps a record of
                maintenance history.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">3</div>
              <h3>Cost-Effective Longevity</h3>
              <p>
                Regular maintenance cleaning costs a fraction of carpet or
                floor replacement. We help you extend asset life and manage
                facility budgets.
              </p>
            </div>
            <div className="sp-why-item">
              <div className="sp-why-item-num">4</div>
              <h3>IICRC-Certified Technicians</h3>
              <p>
                Our team is trained to industry standards — bringing consistent,
                professional results every visit, not just on the first one.
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
              src={couchImg}
              alt="Commercial upholstery cleaning for offices and businesses in Wisconsin"
              loading="lazy"
              width="800"
              height="1000"
            />
          </div>
          <div className="sp-overview-text">
            <h2>Industries We Serve</h2>
            <p>
              We've worked with a wide range of commercial clients across
              southeastern Wisconsin, including:
            </p>
            <ul style={{ paddingLeft: "1.4rem", lineHeight: "2", color: "#374037", fontSize: "1rem" }}>
              <li>Office buildings and corporate campuses</li>
              <li>Retail stores and shopping centers</li>
              <li>Restaurants and hospitality venues</li>
              <li>Healthcare and medical facilities</li>
              <li>Property management companies</li>
              <li>Schools and educational facilities</li>
              <li>Religious organizations and community centers</li>
              <li>Post-construction and renovation projects</li>
            </ul>
            <p style={{ marginTop: "16px" }}>
              If your facility has floors, we have a program for it. Reach out
              for a customized quote — no obligation.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sp-faq">
        <div className="sp-faq-inner">
          <h2>Frequently Asked Questions</h2>

          <div className="sp-faq-item">
            <p className="sp-faq-q">Can you work around our business hours?</p>
            <p className="sp-faq-a">
              Absolutely. We regularly schedule commercial cleaning during early
              morning hours, evenings, and weekends to avoid disrupting your
              staff and customers. For larger facilities, we can work in sections
              so portions of the space remain accessible at all times.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">How do maintenance programs work?</p>
            <p className="sp-faq-a">
              We start with an assessment of your facility — floor types, traffic
              patterns, soil load, and budget. From there we recommend a
              cleaning frequency and method combination (for example: monthly
              interim cleaning plus quarterly hot water extraction for
              commercial carpet). We document each visit and adjust the program
              as conditions change.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">What does commercial carpet maintenance cleaning involve?</p>
            <p className="sp-faq-a">
              Interim maintenance methods include encapsulation cleaning and
              bonnet cleaning — low-moisture techniques that remove surface soil
              quickly, allowing the carpet to dry within 30–60 minutes. These
              are used between periodic restorative hot water extraction cleans
              to maintain appearance and extend carpet life.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">Do you handle large commercial facilities?</p>
            <p className="sp-faq-a">
              Yes. We're equipped for commercial jobs of varying sizes, from
              small offices to large multi-tenant buildings and retail centers.
              For very large facilities, we'll discuss staging and scheduling
              options to complete the work efficiently. Contact us with your
              facility's square footage for an accurate quote.
            </p>
          </div>

          <div className="sp-faq-item">
            <p className="sp-faq-q">Can you help with post-construction cleanup on new floors?</p>
            <p className="sp-faq-a">
              Yes. Post-construction cleaning is one of our specialties. We
              remove drywall dust, adhesive residue, paint overspray, and
              construction debris from hard surface floors and carpet. We work
              directly with contractors and property managers to coordinate
              timing so floors are clean and ready for move-in or opening day.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sp-cta">
        <h2>Let's Build a Program for Your Facility</h2>
        <p>
          Serving businesses in West Bend, Menomonee Falls, Germantown,
          Slinger, Hartford, and across Washington County and southeastern
          Wisconsin.
        </p>
        <div className="sp-cta-actions">
          <button
            className="sp-cta-btn-primary"
            type="button"
            onClick={handleBooking}
          >
            Request a Quote
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
          <Link to="/services/lvt-tile-hard-surfaces">LVT, Tile &amp; Hard Surface Cleaning</Link>
          <Link to="/before-after">Before &amp; After Gallery</Link>
          <Link to="/about">About Us</Link>
        </div>
      </section>
    </main>
  );
}
