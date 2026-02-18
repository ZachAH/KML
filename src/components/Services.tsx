import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import "./Services.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lazy load heavy gallery component
const ScrollGallery = lazy(() => import("./StackSwipedGallery"));

// Service Images
import couchImg from "../assets/cleaning/services/robert_cushion.webp";
import tileImg from "../assets/cleaning/services/robert_extraction.webp";
import teamImg from "../assets/cleaning/services/van.webp";

// Load carousel images lazily
const carouselImports = import.meta.glob("../assets/carasaoul/*.webp", {
  eager: false,
});

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
      "Everyday life leaves carpets and furniture holding onto dirt, allergens, and odors that affect the comfort and health of your space. When you're ready to restore a cleaner, healthier home or workplace, our IICRC-certified technicians step in with a proven 8-step process — from pre-vacuuming and spot treatment to hot water extraction, grooming, and optional 3M Scotchgard protection.",
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

const WAVE_PATH =
  "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C41.13,38.15,124.26,67.14,213,76.53c45,4.75,90.38,1.44,138.4-1.28Z";

const Services: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    const loadGallery = async () => {
      const paths = await Promise.all(
        Object.values(carouselImports).map(async (mod: any) => {
          const m = await mod();
          return m.default;
        })
      );
      setGalleryImages(paths);
    };
    loadGallery();
  }, []);

  // 🔑 SHARED BOOKING FUNCTION (Same as Navbar)
  const handleBooking = () => {
    if (window.HCPWidget) {
      window.HCPWidget.openModal();
    } else {
      console.error("Booking widget not loaded yet");
      // Optional: Fallback to your old modal or a direct link if widget fails
    }
  };

  // GSAP Entrance Animations
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
      {servicesData.map((service, index) => {
        const isGreen = index === 1;

        return (
          <article
            key={service.id}
            className={`panel service-panel ${isGreen ? "panel-green" : "panel-white"} ${
              index % 2 === 1 ? "service-panel--reverse" : ""
            }`}
          >
            {service.id === 3 && (
              <div className="panel-divider divider-top">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d={WAVE_PATH} fill="#ffffff" />
                </svg>
              </div>
            )}

            <div className="service-panel-media">
              <div className="service-image-frame">
                <img
                  src={service.image}
                  alt={service.titleTop}
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
            </div>

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
              {/* 🔑 TRIGGER HCP MODAL DIRECTLY */}
              <button
                className="service-cta-btn service-body-item"
                type="button"
                onClick={handleBooking}
              >
                Schedule a Cleaning
              </button>
            </div>

            {service.id === 1 && (
              <div className="panel-divider divider-bottom">
                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  style={{ background: "#014421" }}
                >
                  <path d={WAVE_PATH} fill="#01351d" />
                </svg>
              </div>
            )}

            {service.id === 2 && (
              <div className="panel-divider divider-bottom">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d={WAVE_PATH} fill="#ffffff" />
                </svg>
              </div>
            )}

            {service.id === 3 && (
              <div className="panel-divider divider-bottom">
                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  style={{ background: "#014421" }}
                >
                  <path d={WAVE_PATH} fill="#01351d" />
                </svg>
              </div>
            )}
          </article>
        );
      })}

      <article className="panel gallery-panel panel-green">
        <Suspense fallback={<div className="gallery-loading">Loading Gallery...</div>}>
          {galleryImages.length > 0 && <ScrollGallery images={galleryImages} />}
        </Suspense>
      </article>

      {/* 🔑 OLD MODAL REMOVED FOR CLEANER FLOW */}
    </section>
  );
};

export default Services;