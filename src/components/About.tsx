import "./About.css";
import aboutimg from "../assets/cleaning/about.jpg";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <h2 className="about-heading">About Kettle Moraine Professional Cleaners</h2>

        <div className="about-grid">
          {/* Image */}
          <div className="about-image-wrapper">
            <img
              src={aboutimg}
              alt="The family behind Kettle Moraine Professional Cleaners"
              className="about-image"
            />
          </div>

          {/* Text */}
          <div className="about-text">
            <p className="about-subtext">
              We’re a local, family-run cleaning company serving Washington County and surrounding areas.
              Since 1987, our focus has been simple: healthier homes, cleaner workplaces, and service you can trust.
              When you call us, you get experienced professionals who care about the details.
            </p>

            <p className="about-subtext">
              Our certified technicians use proven, manufacturer-safe processes and professional-grade equipment to deliver
              deep, lasting results — from carpets and upholstery to LVT, tile, grout, and commercial spaces.
            </p>

            <ul className="about-list">
              <li><strong>Serving the community since 1987</strong> (30+ years of experience)</li>
              <li><strong>IICRC-certified technicians</strong> and industry best practices</li>
              <li><strong>Trusted by local homes & businesses</strong> for consistent, reliable results</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
