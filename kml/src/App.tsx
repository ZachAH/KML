import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Services from "./components/Services";
import Contact from "./components/Contact";
import About from "./components/About";

// Smooth scrolling for hash navigation (/#services)
function ScrollToHash() {
  const { hash } = window.location;

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 80); // slight delay for router load
      }
    }
  }, [hash]);

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

        {/* Optional: direct services page route (can reuse same component) */}
        <Route path="/services" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
