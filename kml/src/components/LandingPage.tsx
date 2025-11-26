import "./LandingPage.css";
import Navbar from "./Navbar";
import Services from "./Services";
import heroVideo from "../assets/cleaning/carpet_cleaning.mp4";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1 className="hero-title">
            Health-Focused Carpet & Floor Cleaning You Can Trust
          </h1>
          <p className="hero-subtext">
            Certified cleaning experts delivering safer, healthier homes and workplaces.
          </p>

          <div className="hero-cta-group">
            <a href="#contact" className="cta primary">
              Request a Quote
            </a>
            <a href="tel:2623341881" className="cta secondary">
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services />
    </div>
  );
};

export default LandingPage;
