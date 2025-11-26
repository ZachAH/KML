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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when changing routes
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav-content">

        {/* Logo + Tagline */}
        <Link to="/" className="nav-left">
          <img src={KmlLogo} alt="KML Logo" className="nav-logo" />
          <span className="nav-tagline">Clean You Can Trust</span>
        </Link>

        {/* Desktop Links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
          <Link to="/before-after" className={isActive("/before-after") ? "active" : ""}>
            Before & After
          </Link>

          {/* CTA moves inside here only on mobile */}
          <a href="tel:2623341881" className="nav-cta mobile-only">
            Call Us
          </a>
        </div>

        {/* Desktop CTA — visible only on large screens */}
        <a href="tel:2623341881" className="nav-cta desktop-only">
          Call Us
        </a>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>

      </nav>
    </header>
  );
};

export default Navbar;
