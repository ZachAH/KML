import React from 'react';
import './LandingPage.css';
// Assuming the asset path is: src/assets/KML.svg based on your structure
import KmlLogo from '../assets/KML.svg'; 

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      
      {/* ====================================================== 
          1. NAVIGATION/HEADER 
      ====================================================== */}
      <header className="navbar">
        <div className="logo">
          {/* Your SVG Logo */}
          <img src={KmlLogo} alt="KML Cleaning Company Logo" className="logo-svg" />
          <span className="logo-text">"The Family Owned Local Cleaning Company You Know, Like and Trust"</span> 
        </div>
        
        <nav>
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
        
        {/* === NEW: Wrapper for Centering Content over Full-Width Image === */}
        <div className="hero-content-wrapper">
            <h1>Spotless Cleaning Services for a Sparkling Home ✨</h1>
                        
            <button className="cta-button">Get a Free Quote</button>
        </div>
        {/* ============================================================= */}

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
        
        {/* Contact Heading/Text */}
        <div className="contact-heading">
            <h1>Contact Us:</h1>
            <p>Fill out the **Contact Form** below to get started with a quote or to set up an appointment. Thank out for the opportunity to clean for you!</p>
        </div>
        
        {/* Main Content: Image & Form */}
        <div className="contact-content">
            
            {/* Visual Column (Left) */}
            <div className="contact-visual">
                <div className="placeholder-image"></div> 
            </div>
            
            {/* Form/Info Column (Right - Deep Green Background) */}
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
                
                {/* Contact Information */}
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