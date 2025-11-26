import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";
import BeforeAfter from "./components/BeforeAfter";

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

export default function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<LandingPage />} />
        <Route path="/before-after" element={<BeforeAfter />} />

      </Routes>
      {/* <MobileCTA /> */}
      <Footer />
    </Router>  );
}

function MobileCTA() {
  return (
    <div className="mobile-cta">
      <a href="tel:2623341881">📞 Call</a>
      <Link to="/contact">✉️ Get Quote</Link>
    </div>
  );
}
