import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import KmlLogo from "../assets/KML.svg";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-content">

        {/* Logo */}
        <Link to="/" className="nav-left">
          <img src={KmlLogo} alt="KML Logo" className="nav-logo" />
          <span className="nav-tagline">Clean You Can Trust</span>
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>

        {/* Links */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={isActive("/") ? "active" : ""}>Services</Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
          <a href="tel:2623341881" className="nav-cta">Call Us</a>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;
