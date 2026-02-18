import React, { useRef } from "react";

import "./LandingPage.css";
import Services from "./Services";
import KMLLogo from "../assets/cleaning/KML_Logo.svg";
import Testimonials from "./Testimonials";

const LandingPage: React.FC = () => {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="landing-page">
      {/* 1. HERO SECTION 
          - Clean White Background
          - Glass Prism Sweep Effect
      */}
      <section className="hero clean-hero">

        {/* The Premium Glass Prism Sweep */}
        <div className="glass-prism-container">
          <div className="prism-sweep"></div>
        </div>

        {/* Subtle Background Orbs */}
        <div className="hero-bg-orb orb-1" />
        <div className="hero-bg-orb orb-2" />

        <div className="hero-content">
          <div className="hero-layout">

            {/* Logo Block (Now Cleanly Embedded) */}
            <div className="hero-logo-block">
              <div className="tilt-wrapper" ref={wrapperRef}>
                <div className="tilt-card" ref={tiltRef}>
                  <img
                    src={KMLLogo}
                    alt="KML Professional Cleaning"
                    className="hero-logo"
                  />
                </div>
              </div>
            </div>

            {/* Text Block with Masked Reveal */}
            <div className="hero-text-block">
              <div className="text-reveal-mask">
                <h1 className="hero-heading">
                  For That Clean <span className="feeling-accent"> Feeling.</span>
                </h1>
              </div>
              <p className="hero-subheading">
              Helping you create <span className="sub-highlight">healthier spaces</span>,
                <span className="sub-highlight"> greater comfort</span>, and
                <span className="sub-highlight"> peace of mind</span>.
              </p>
            </div>
          </div>
        </div>

        {/* 2. THE FLOW TRANSITION
            SVG Divider creates the smooth hill that bleeds into the Green section
        */}
        <div className="section-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,120V20C200,80,400,0,600,40,800,80,1000,20,1200,60V120H0Z"
              fill="#014421"
            />
          </svg>
        </div>
      </section>

      <main>
        {/* The Green Section */}
        <div className="section-dark-green">
          <Testimonials />
        </div>

        {/* Back to White for Services */}
        <div className="section-white">
          <Services />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;