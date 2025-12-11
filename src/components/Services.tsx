import { useEffect, useRef } from "react";
import "./Services.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ScrollGallery from "./StackSwipedGallery";;

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

/* =============================
   SERVICE DATA MODEL
============================= */
type Service = {
  id: number;
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  intro: string;
  bullets: string[];
  image: string;
};

/* =============================
   SERVICE DATA
============================= */
const servicesData: Service[] = [
  {
    id: 1,
    eyebrow: "RESIDENTIAL & COMMERCIAL",
    titleTop: "Carpet & Upholstery",
    titleBottom: "Cleaning",
    intro:
      "Improve the health of your indoor environment. Let our IICRC certified technicians restore the beauty of your carpets and upholstery with our thorough 8-step cleaning process — from pre-vacuuming, spot treatment, and agitation to hot water extraction, grooming, and optional 3M Scotchgard protection.",
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
    eyebrow: "HARD SURFACE FLOOR CARE",
    titleTop: "Tile, Grout & Hard Surface",
    titleBottom: "Floor Cleaning",
    intro: "When routine cleaning no longer gives you the desired results, it's time to call us.",
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
    eyebrow: "FACILITY & OFFICE SPACES",
    titleTop: "Commercial Carpet &",
    titleBottom: "Hard Floor Programs",
    intro:
      "We provide facilities with quality cleaning programs that improve appearance, safety, and indoor air quality.",
    bullets: [
      "Commercial Carpet — Restorative & Maintenance",
      "Hard Floor Care — Restorative & Maintenance",
      "Indoor Air Quality Optimization",
      "Industry Best Practices",
      "Cost-Effective Long-Term Solutions",
    ],
    image: teamImg,
  },
];

/* =============================
   COMPONENT
============================= */
const Services: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  /* =============================
      GSAP PANEL ANIMATIONS
  ============================== */
  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel");

      panels.forEach((panel) => {
        const media = panel.querySelector(".service-image-frame");
        const headingLines = panel.querySelectorAll(".service-heading-line");
        const bodyItems = panel.querySelectorAll(".service-body-item");

        if (!media) return;

        // IMAGE FADE-IN
        gsap.from(media, {
          scrollTrigger: { trigger: panel, start: "top 80%" },
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        });

        // HEADINGS SLIDE UP
        gsap.to(headingLines, {
          scrollTrigger: { trigger: panel, start: "top 75%" },
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
        });

        // BODY TEXT FADE-UP
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

  /* =============================
      JSX
  ============================== */
  return (
    <section className="services-panels" ref={rootRef}>
      {servicesData.map((service, index) => (
        <article
          key={service.id}
          className={`panel service-panel ${index % 2 === 1 ? "service-panel--reverse" : ""}`}
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

            <button className="service-cta-btn service-body-item">
              Request a Quote
            </button>
          </div>
        </article>
      ))}

      <ScrollGallery images={galleryImages} />

    </section>
  );
};

export default Services;
