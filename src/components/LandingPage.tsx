import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

import "./LandingPage.css";
import Services from "./Services";
import KMLLogo from "../assets/cleaning/KML_Logo.svg";
import Testimonials from "./Testimonials";

const LandingPage: React.FC = () => {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // GSAP Cursor-driven tilt effect
  useEffect(() => {
    const card = tiltRef.current;
    const wrapper = wrapperRef.current;
    if (!card || !wrapper) return;

    const handleMove = (e: MouseEvent) => {
      const bounds = wrapper.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      const rotateY = gsap.utils.interpolate(-18, 18, x / bounds.width);
      const rotateX = gsap.utils.interpolate(12, -12, y / bounds.height);

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformOrigin: "center center",
        ease: "linear",
        duration: 0.08,
        force3D: true,
        overwrite: "auto",
      });
    };

    const handleEnter = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        transformPerspective: 800,
        transformOrigin: "center center",
        ease: "power2.out",
        duration: 0.16,
        overwrite: "auto",
      });
    };

    const handleLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "power3.out",
        duration: 0.35,
        overwrite: "auto",
      });
    };

    wrapper.addEventListener("mousemove", handleMove);
    wrapper.addEventListener("mouseenter", handleEnter);
    wrapper.addEventListener("mouseleave", handleLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMove);
      wrapper.removeEventListener("mouseenter", handleEnter);
      wrapper.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

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
                <span className="sub-highlight"> peace of mind</span> you can feel every day.
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
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C41.13,38.15,124.26,67.14,213,76.53c45,4.75,90.38,1.44,138.4-1.28Z"
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