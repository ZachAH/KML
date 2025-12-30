import React, { useEffect, useRef, useState } from "react";
import "./Services.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ScrollGallery from "./StackSwipedGallery";

// Service Images
import couchImg from "../assets/cleaning/services/robert_cushion.webp";
import tileImg from "../assets/cleaning/services/robert_extraction.webp";
import teamImg from "../assets/cleaning/services/van.webp";

// Auto-import carousel gallery images
const carouselImports = import.meta.glob("../assets/carasaoul/*.webp", {
  eager: true,
});
const galleryImages: string[] = Object.values(carouselImports).map(
  (mod: any) => mod.default
);

gsap.registerPlugin(ScrollTrigger);

type Service = {
  id: number;
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  intro: string;
  bullets: string[];
  image: string;
};

const servicesData: Service[] = [
  {
    id: 1,
    eyebrow: "HEALTHIER HOMES & WORKSPACES",
    titleTop: "Carpet & Upholstery",
    titleBottom: " Cleaning",
    intro:
      "Everyday life leaves carpets and furniture holding onto dirt, allergens, and odors that affect the comfort and health of your space. When you’re ready to restore a cleaner, healthier home or workplace, our IICRC-certified technicians step in with a proven 8-step process — from pre-vacuuming and spot treatment to hot water extraction, grooming, and optional 3M Scotchgard protection.",
    bullets: [
      "Carpets — Hot Water Extraction & Low Moisture Cleaning",
      "Upholstery — Hot Water Extraction, Low Moisture & Dry Cleaning",
      "Area Rugs — On Location & In-plant Cleaning",
      "IICRC Certified Technicians",
      "Comprehensive 8-Step Cleaning Process",
      "Optional 3M Scotchgard Protection",
    ],
    image: couchImg,
  },
  {
    id: 2,
    eyebrow: "MODERN FLOOR CARE SOLUTIONS",
    titleTop: "LVT, Tile & Hard Surfaces",
    titleBottom: "",
    intro:
      "LVT and other hard surface floors are built to last — but without proper care, they quickly lose their shine, protection, and lifespan. When your floors start to look dull or worn, professional hard surface cleaning helps you protect your investment, restore appearance, and keep your space looking its best.",
    bullets: [
      "Tile & Grout — Ceramic, Porcelain & Quarry",
      "Wood — Solid, Engineered & Laminate",
      "Vinyl — VCT, LVT, LVP & Sheet Vinyl",
      "Natural Stone — Marble, Granite & Terrazzo",
      "Manufacturer-Safe Cleaning Processes",
      "IICRC Certified Technicians",
    ],
    image: tileImg,
  },
  {
    id: 3,
    eyebrow: "SMART COMMERCIAL MAINTENANCE",
    titleTop: "Commercial Carpet &",
    titleBottom: " Hard Floor Programs",
    intro:
      "Managing a facility means balancing appearance, safety, and long-term costs. Our commercial cleaning programs help you stay ahead of wear, protect your floors, and create a cleaner, healthier environment — without disrupting daily operations.",
    bullets: [
      "Construction Clean Up",
      "Commercial Carpet — Restorative & Maintenance",
      "Hard Floor Care — Restorative & Maintenance",
      "Indoor Air Quality Optimization",
      "Industry Best Practices",
      "Cost-Effective Long-Term Solutions",
    ],
    image: teamImg,
  },
];

const EMAIL_TO = "kettlemoraineprofesionalcleaners@gmail.com";
const PHONE_TEL = "12623341881"; // (262) 334-1881
const PHONE_DISPLAY = "(262) 334-1881";

const Services: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Modal state
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openQuoteModal = (service: Service) => {
    setSelectedService(service);
    setQuoteOpen(true);
  };

  const closeQuoteModal = () => {
    setQuoteOpen(false);
    setSelectedService(null);
  };

  const handleEmailQuote = () => {
    const serviceName = selectedService
      ? `${selectedService.titleTop}${selectedService.titleBottom}`.trim()
      : "Cleaning Service";

    const subject = encodeURIComponent(`Quote Request: ${serviceName}`);

    const body = encodeURIComponent(
      `Hi Kettle Moraine Professional Cleaners,

I’d like to request a quote for: ${serviceName}

Name:
Phone:
Email:
Address/City:
Best time to contact me:
Details (rooms/sq ft/any stains, etc.):

Thank you!`
    );

    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
  };

  // Close modal on Escape
  useEffect(() => {
    if (!quoteOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuoteModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [quoteOpen]);

  // Your existing GSAP animation setup
  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel");

      panels.forEach((panel) => {
        const media = panel.querySelector(".service-image-frame");
        const headingLines = panel.querySelectorAll(".service-heading-line");
        const bodyItems = panel.querySelectorAll(".service-body-item");

        if (!media) return;

        gsap.from(media, {
          scrollTrigger: { trigger: panel, start: "top 80%" },
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        });

        gsap.to(headingLines, {
          scrollTrigger: { trigger: panel, start: "top 75%" },
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
        });

        gsap.from(bodyItems, {
          scrollTrigger: { trigger: panel, start: "top 70%" },
          y: 24,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-panels" ref={rootRef}>
      {servicesData.map((service, index) => (
        <article
          key={service.id}
          className={`panel service-panel ${index % 2 === 1 ? "service-panel--reverse" : ""
            }`}
        >
          {/* IMAGE SIDE */}
          <div className="service-panel-media">
            <div className="service-image-frame">
              <img src={service.image} alt={service.titleTop} />
            </div>
          </div>

          {/* TEXT SIDE */}
          <div className="service-panel-copy">
            <p className="service-eyebrow service-body-item">{service.eyebrow}</p>

            <h2 className="service-heading">
              <span className="service-heading-line">{service.titleTop}</span>
              <span className="service-heading-line">{service.titleBottom}</span>
            </h2>

            <p className="service-intro service-body-item">{service.intro}</p>

            <ul className="service-list">
              {service.bullets.map((item, i) => (
                <li key={i} className="service-body-item">
                  {item}
                </li>
              ))}
            </ul>

            <button
              className="service-cta-btn service-body-item"
              type="button"
              onClick={() => openQuoteModal(service)}
            >
              Request a Quote
            </button>
          </div>
        </article>
      ))}

      {/* === GALLERY PANEL === */}
      <article className="panel gallery-panel">
        <ScrollGallery images={galleryImages} />
      </article>

      {/* === QUOTE MODAL === */}
      {quoteOpen && (
        <div
          className="quote-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Request a quote"
          onClick={closeQuoteModal}
        >
          <div
            className="quote-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="quote-modal-close"
              onClick={closeQuoteModal}
              aria-label="Close"
            >
              <span aria-hidden>×</span>            
            </button>


            <p className="quote-modal-eyebrow">REQUEST A QUOTE</p>
            <h3 className="quote-modal-title">How would you like to reach us?</h3>

            {selectedService && (
              <p className="quote-modal-sub">
                For:{" "}
                <strong>
                  {`${selectedService.titleTop}${selectedService.titleBottom}`.trim()}
                </strong>
              </p>
            )}

            <div className="quote-modal-actions">
              <button
                type="button"
                className="quote-action-btn"
                onClick={handleEmailQuote}
              >
                Send Email
              </button>

              <a
                className="quote-action-btn"
                href={`tel:${PHONE_TEL}`}
                aria-label={`Call us at ${PHONE_DISPLAY}`}
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
