import { useState, useEffect } from "react";
import "./Services.css";

// Images
import carpetImg from "../assets/cleaning/services/carpet_clean.jpg";
import couchImg from "../assets/cleaning/services/couch_cushion.jpg";
import tileImg from "../assets/cleaning/services/office.jpg";
import teamImg from "../assets/cleaning/services/team.jpg";

const servicesData = [
  {
    id: 1,
    title: "Carpet & Upholstery Cleaning",
    preview: "Hot Water Extraction • Upholstery Care • Area Rugs",
    image: couchImg,
    details: (
      <>
        <p>
          Improve the appearance and health of your home environment with
          professional carpet and upholstery care. Our certified technicians
          restore fibers while eliminating deep-down dirt, stains & allergens.
        </p>

        <ul>
          <li>Hot Water Extraction Cleaning</li>
          <li>Low-Moisture & Dry Cleaning Options</li>
          <li>Area Rug Cleaning — On-location or In-plant</li>
          <li>IICRC Certified Service</li>
          <li>Optional 3M Scotchgard Protection</li>
        </ul>

        <button className="service-cta-btn">Request a Quote</button>
      </>
    ),
  },
  {
    id: 2,
    title: "Hard Surface Floor Cleaning",
    preview: "Tile & Grout • Vinyl • Natural Stone • Wood",
    image: tileImg,
    details: (
      <>
        <p>
          Restore the shine, safety and cleanliness of the floors you use every
          day — professionally cleaned to manufacturer recommendations.
        </p>

        <ul>
          <li>Tile & Grout Cleaning & Sealing</li>
          <li>VCT, LVT & Vinyl Surface Care</li>
          <li>Wood Floor Deep Cleaning</li>
          <li>Marble, Granite & Terrazzo Cleaning</li>
          <li>Improves Indoor Health & Appearance</li>
        </ul>

        <button className="service-cta-btn">Request a Quote</button>
      </>
    ),
  },
  {
    id: 3,
    title: "Commercial Cleaning Services",
    preview: "Janitorial • Carpet Programs • Floor Care",
    image: teamImg,
    details: (
      <>
        <p>
          Professional custodial cleaning focused on safety, appearance
          & cost-effective facility health.
        </p>

        <ul>
          <li>Janitorial & Office Cleaning</li>
          <li>Commercial Carpet Maintenance</li>
          <li>Hard Floor Maintenance Programs</li>
          <li>Safety & Health-Focused Cleaning</li>
        </ul>

        <button className="service-cta-btn">Request a Quote</button>
      </>
    ),
  },
];

const Services = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");

    const reveal = () => {
      const trigger = window.innerHeight * 0.85;

      cards.forEach(card => {
        const top = card.getBoundingClientRect().top;
        if (top < trigger) {
          card.classList.add("visible");
        }
      });
    };

    reveal();
    window.addEventListener("scroll", reveal);
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  const toggleService = (id: number) => {
    const isClosing = expanded === id;
    setExpanded(isClosing ? null : id);
  
    if (!isClosing) {
      setTimeout(() => {
        const element = document.getElementById(`service-${id}`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 450); // matches CSS expand animation timing
    }
  };
  

  return (
    <section className="services-section" id="services">
      <h2 className="services-title">Our Professional Cleaning Services</h2>

      <div className="services-grid">
        {servicesData.map((service) => (
          <div
            key={service.id}
            id={`service-${service.id}`}
            className={`service-card ${expanded === service.id ? "expanded" : ""}`}
            onClick={() => toggleService(service.id)}
          >
            <img src={service.image} alt={service.title} className="service-img" />

            <div className="service-overlay">
              <h3>{service.title}</h3>
              <p>{service.preview}</p>
              <span className="service-btn">Learn More</span>
            </div>

            <div className="service-details">{service.details}</div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Services;
