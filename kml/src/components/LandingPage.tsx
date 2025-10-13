import React from 'react';
import './LandingPage.css'; // We'll create this next

// Define the component using a standard function declaration
const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* This is where we'll add sections like:
        1. Header/Navigation
        2. Hero Section (with a catchy headline and call-to-action)
        3. Services Overview
        4. Testimonials/Social Proof
        5. Contact Information / Footer
      */}
      
      <header className="navbar">
        <div className="logo">Clean Sweep Co.</div>
        <nav>
          <ul>
          <li><a href="#contact">Contact</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h1>Spotless Cleaning Services for a Sparkling Home ✨</h1>
        <p>Your local experts in residential and commercial cleaning. Book a free estimate today!</p>
        <button className="cta-button">Get a Free Quote</button>
      </section>

      {/* Placeholder for other sections */}
      <section className="services">
        <h2>Our Services</h2>
        {/* ... */}
      </section>
      
    </div>
  );
};

// Export the component so it can be used in App.tsx
export default LandingPage;