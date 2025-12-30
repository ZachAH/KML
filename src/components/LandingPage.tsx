import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

import "./LandingPage.css";
import Services from "./Services";

import KMLLogo from "../assets/cleaning/KML_Logo.svg";
import Testimonials from "./Testimonials";


const LandingPage: React.FC = () => {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Cursor-driven tilt effect (extra snappy + overwrite)
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
        ease: "linear",     // more “locked” to cursor
        duration: 0.08,     // was 0.12 – tighter
        force3D: true,        // ← MASSIVE improvement
        overwrite: "auto",  // kill previous tween to avoid lag
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
      <section className="hero clean-hero">
      <div className="hero-shine"></div>
        <div className="hero-sparkles">
          <span className="bg-sparkle"></span>
          <span className="bg-sparkle"></span>
          <span className="bg-sparkle"></span>
          <span className="bg-sparkle"></span>

          <span className="bg-sparkle-diamond"></span>
          <span className="bg-sparkle-diamond"></span>
          <span className="bg-sparkle-diamond"></span>
        </div>

        {/* background orbs */}
        <div className="hero-bg-orb orb-1" />
        <div className="hero-bg-orb orb-2" />

        <div className="hero-content">
          <div className="hero-layout">
            {/* Tilt Logo */}
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

            {/* Text */}
            <div className="hero-text-block">
              {/* sparkles around text */}
              <div className="hero-text-sparkles">
                <span className="text-sparkle text-sparkle--1" />
                <span className="text-sparkle text-sparkle--2" />
                <span className="text-sparkle text-sparkle--3" />
                <span className="text-sparkle text-sparkle--4" />
              </div>

              <h1 className="hero-heading">
              Local. Trusted. Focused on Healthier Homes.
              </h1>

              <p className="hero-subheading">
              Professional residential and commercial cleaning across Washington County and surrounding areas — helping you create healthier spaces, greater comfort, and peace of mind you can feel every day.              </p>
            </div>
          </div>
        </div>
      </section>

      <main>
        <Testimonials />
        <Services />
      </main>
    </div>
  );
};

export default LandingPage;
