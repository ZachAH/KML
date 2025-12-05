import { useEffect, useRef } from "react";
import "./Services.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

// Images
import couchImg from "../assets/cleaning/services/robert_cushion.webp";
import tileImg from "../assets/cleaning/services/robert_extraction.webp";
import teamImg from "../assets/cleaning/services/van.webp";

// AUTO IMPORT CAROUSEL IMAGES
const carouselImports = import.meta.glob("../assets/carasaoul/*.webp", {
  eager: true,
});
const galleryImages: string[] = Object.values(carouselImports).map(
  (mod: any) => mod.default
);

gsap.registerPlugin(ScrollTrigger, Observer);

/* =============================
   SERVICE DATA
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
    intro:
      "When routine cleaning no longer gives you the desired results, it's time to call us.",
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
      "We provide facilities with quality cleaning programs that improve appearance and safety.",
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

const Services: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  /* ==========================================================
     GSAP EFFECTS (UPDATED CAROUSEL LOGIC)
  ========================================================== */
  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      /* ================= PANEL ANIMATIONS (Unchanged) ================= */
      const panels = gsap.utils.toArray<HTMLElement>(".panel");

      panels.forEach((panel) => {
        const media = panel.querySelector(".service-image-frame");
        const headingLines = panel.querySelectorAll(".service-heading-line");
        const bodyItems = panel.querySelectorAll(".service-body-item");

        if (!media) return;

        gsap.from(media, {
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        });

        gsap.to(headingLines, {
          scrollTrigger: {
            trigger: panel,
            start: "top 75%",
          },
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
        });

        gsap.from(bodyItems, {
          scrollTrigger: {
            trigger: panel,
            start: "top 70%",
          },
          y: 24,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        });
      });

      /* ================= PREMIUM 3D CAROUSEL (Refactored) ================= */
      if (!carouselRef.current) return;

      const carousel = document.getElementById("kml-carousel")!;
      const images = gsap.utils.toArray<HTMLElement>(
        "#kml-carousel .carousel-3d-image"
      );

      const total = images.length;
      // Using the radius from your example for circular math
      const radius = 242; 
      const angleStep = 360 / total;
      
      // Progress object holds the current rotation state
      const progress = { value: 0 }; 

      // The core function that calculates the 3D position and rotation of every image
      const animateCarousel = () => {
        images.forEach((img, index) => {
          // Calculate theta (angle) based on the continuous progress
          const theta = index / total - progress.value;

          // Calculate x and z (depth) using sin/cos of the angle
          const x = -Math.sin(theta * Math.PI * 2) * radius;
          const z = Math.cos(theta * Math.PI * 2) * radius;
          
          // Calculate the rotation angle for the image itself
          const rotationY = 360 * -theta;

          // Apply the transform using GSAP set
          gsap.set(img, {
            x: x,
            z: z,
            rotationY: rotationY,
            // Dim and scale based on Z-depth for a more pronounced 3D look
            opacity: z < -radius * 0.2 ? 0.35 : 1, 
            filter: z < -radius * 0.2 ? "brightness(0.75)" : "brightness(1.12)",
          });

          // Custom class logic (for styling front card - uses rotationY)
          const currentRotation = rotationY % 360;
          if (Math.abs(currentRotation) < angleStep / 2 || Math.abs(currentRotation) > 360 - angleStep / 2) {
             img.classList.add("is-front");
          } else {
             img.classList.remove("is-front");
          }
        });
      };

      // Auto rotation: continuous tween
      const autoRotateTween = gsap.to(progress, {
        value: "+=1", 
        duration: 40, // Adjust speed here (higher duration = slower)
        repeat: -1,
        ease: "none",
        paused: false,
      });

      // Update on every tick
      gsap.ticker.add(animateCarousel);


      // Drag + Wheel Observer (to override the auto-rotation)
      Observer.create({
        target: carouselRef.current,
        type: "pointer,touch,wheel",
        
        onPress() {
          autoRotateTween.pause(); // Pause auto-rotation
          carousel.style.cursor = 'grabbing';
        },
        
        onDrag(self) {
          const delta = self.deltaX ?? 0;
          const velocity = delta * 0.0005; // Adjust sensitivity for drag

          // Apply immediate change based on drag
          progress.value += velocity;
          animateCarousel();
        },
        
        onWheel(self) {
          autoRotateTween.pause(); // Pause auto-rotation
          
          progress.value += self.deltaY * 0.0005; // Adjust sensitivity for wheel
          animateCarousel();
          
          // Restart auto-rotate after short delay
          gsap.delayedCall(2, () => autoRotateTween.resume());
        },
        
        onRelease() {
           carousel.style.cursor = 'grab';
           // Restart auto-rotate after short delay
           gsap.delayedCall(2, () => autoRotateTween.resume());
        },
      });
      // END CAROUSEL LOGIC
    });

    return () => ctx.revert();
  }, []);

  /* ==========================================================
     JSX RETURN
  ========================================================== */

  return (
    <section className="services-panels" ref={rootRef}>
      {servicesData.map((service, index) => (
        <article
          key={service.id}
          className={`panel service-panel ${
            index % 2 === 1 ? "service-panel--reverse" : ""
          }`}
        >
          <div className="service-panel-media">
            <div className="service-image-frame">
              <img src={service.image} alt={service.titleTop} />
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

            <button className="service-cta-btn service-body-item">
              Request a Quote
            </button>
          </div>
        </article>
      ))}

      {/* GALLERY CAROUSEL */}
      <section className="panel gallery-panel" ref={carouselRef}>
        <h2 className="gallery-title">See the Difference</h2>
        <p className="gallery-subtitle">
          A look at real spaces we’ve helped refresh.
        </p>

        <div className="carousel-3d" id="kml-carousel">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className="carousel-3d-image"
              style={{ backgroundImage: `url(${src})` }}
            ></div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Services;