import "./LandingPage.css";
import Services from "./Services";

import heroVideo from "../assets/cleaning/hero_video.webm";
import heroLogo from "../assets/cleaning/KML_Logo.png";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">

      {/* Hero Section */}
      <section className="hero">

        {/* Hero Video */}
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={heroVideo} type="video/webm" />
        </video>

        <div className="mobile-hero-logo-wrapper">
          <img src={heroLogo} alt="KML Logo" className="mobile-hero-logo" />
        </div>



        {/* MOBILE BRAND TITLE */}
        <h2 className="mobile-hero-title">
          Kettle Moraine Professional Cleaners, Inc.
        </h2>

        {/* Hero Content (Desktop Only) */}
        <div className="hero-content">
          <h1 className="hero-title">
            Family-Owned. Community Trusted. Four Decades Strong.
          </h1>
          <p className="hero-subtext">
            Delivering reliable cleaning services with the same dedication and care that built our 40-year reputation.
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
      </section >

      <Services />
    </div >
  );
};

export default LandingPage;
