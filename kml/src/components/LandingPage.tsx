import React from 'react';
import './LandingPage.css';
import KmlLogo from '../assets/KML.svg';

const LandingPage: React.FC = () => {
  // You can easily update your Google Maps link here
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=2334+Stonebridge+Dr+Suite+E+West+Bend+WI+53095";

  return (
    <div className="landing-page">
      
      {/* ====================================================== 
          1. HEADER (New Two-Tier Structure)
      ====================================================== */}
      <header className="site-header">
        
        {/* --- TOP BAR: Logo, Quote, Contact Info --- */}
        <div className="top-bar">
          <div className="logo">
            <img src={KmlLogo} alt="KML Cleaning Company Logo" className="logo-svg" />
            <span className="logo-text">"The Family Owned Local Cleaning Company You Know, Like and Trust"</span> 
          </div>

          <div className="header-contact-info">
            <a href="tel:262-334-1881" className="header-phone">(262) 334-1881</a>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="header-map-link" title="View on Google Maps">
              {/* Inline SVG for Google Maps icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Google Maps">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* --- MAIN NAVIGATION BAR --- */}
        <nav className="main-nav">
          <ul>
            <li><a href="#what">What our Cleaning Includes</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      {/* ====================================================== 
          2. HERO SECTION (Full-Width Image)
      ====================================================== */}
      <section className="hero">
        <div className="hero-content-wrapper">
          <h1>Spotless Cleaning Services for a Sparkling Home ✨</h1>
          <button className="cta-button">Get a Free Quote</button>
        </div>
      </section>

      {/* ====================================================== 
          3. SERVICES SECTION (Placeholder)
      ====================================================== */}
      <section className="services" id="services">
        <h2>Our Services</h2>
        <p>This section will list the types of cleaning services offered (e.g., Residential, Commercial, Deep Cleans, etc.).</p>
      </section>
      
      {/* ====================================================== 
          4. CONTACT SECTION 
      ====================================================== */}
      <section className="contact-section" id="contact">
        <div className="contact-heading">
          <h1>Contact Us:</h1>
          <p>Fill out the **Contact Form** below to get started with a quote or to set up an appointment. Thank out for the opportunity to clean for you!</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-visual">
            <div className="placeholder-image"></div> 
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-row">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>
              <input type="tel" placeholder="Phone" required />
              <input type="email" placeholder="Email *" required /> 
              
              <label htmlFor="message">Tell us about the areas you would like to have professionally cleaned:</label>
              <textarea id="message" rows={6}></textarea>
              
              <button type="submit" className="form-submit-button">Send</button>
            </form>
            
            <div className="contact-info">
              <p>2334 Stonebridge Dr, Suite E</p>
              <p>West Bend, WI 53095</p>
              <p>Phone: (262) 334-1881</p>
              <p>Email: kettlemoraineprofesionalcleaners@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;