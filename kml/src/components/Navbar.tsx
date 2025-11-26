import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import KmlLogo from "../assets/KML.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-content">

        {/* Logo → always leads home */}
        <Link to="/">
          <img src={KmlLogo} alt="KML Logo" className="nav-logo" />
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <a href="/#services">Services</a> {/* scroll-to section */}
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a href="tel:2623341881" className="nav-cta">Call Us</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
