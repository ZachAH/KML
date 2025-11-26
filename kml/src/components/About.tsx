import "./About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-container">
        <h2 className="about-heading">About Kettle Moraine Cleaning</h2>

        <p className="about-subtext">
          We are a trusted, locally-owned cleaning company proudly serving Washington County and the surrounding areas.
          Our mission is simple: deliver a healthier, cleaner home or workplace for every customer.
        </p>

        <p className="about-subtext">
          With certified technicians, state-of-the-art equipment, and a focus on customer care — we bring unmatched
          results to carpets, upholstery, tile, grout, and commercial environments.
        </p>

        <ul className="about-list">
          <li>20+ Years of Professional Cleaning Experience</li>
          <li>Certified Technicians — IICRC Standards</li>
          <li>Eco-friendly Solutions for Cleaner Air Quality</li>
          <li>Trusted by Local Homes, Schools & Businesses</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
