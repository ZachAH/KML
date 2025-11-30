import "./LandingPage.css";
import Services from "./Services";
import heroVideo from "../assets/cleaning/carpet_cleaning.webm";
import heroMobileTablet from "../assets/cleaning/KML_MOBILE_TABLET.webm";
import heroMobilePhone from "../assets/cleaning/KML_LOGO_PHONE.mp4";


const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">

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
        {/* Tablet video */}
        <video
          className="hero-video tablet-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={heroMobileTablet} type="video/webm" />
        </video>

        {/* Small phone video */}
        <video
          className="hero-video phone-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={heroMobilePhone} type="video/webm" />
        </video>


        {/* Hero Content */}
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
      </section>

      {/* Services Section */}
      <Services />
    </div>
  );
};

export default LandingPage;
