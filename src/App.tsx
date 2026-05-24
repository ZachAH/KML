import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";
import BeforeAfter from "./components/BeforeAfter";
import CarpetUpholstery from "./components/services/CarpetUpholstery";
import LVTTileHardSurfaces from "./components/services/LVTTileHardSurfaces";
import CommercialPrograms from "./components/services/CommercialPrograms";

// Smooth scrolling for hash navigation (/#services)
function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 80);
      }
    }
  }, [window.location.hash]);

  return null;
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToHash />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<LandingPage />} />
        <Route path="/before-after" element={<BeforeAfter />} />
        <Route path="/services/carpet-upholstery-cleaning" element={<CarpetUpholstery />} />
        <Route path="/services/lvt-tile-hard-surfaces" element={<LVTTileHardSurfaces />} />
        <Route path="/services/commercial-programs" element={<CommercialPrograms />} />
      </Routes>
      <Footer />
    </Router>
  );
}
