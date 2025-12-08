import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  /* Add shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove("nav-open");
  }, [location.pathname]);

  /* Toggle menu */
  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.classList.toggle("nav-open", next);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav-content">

        {/* NAV LINKS (desktop + mobile) */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={isActive("/") ? "active" : ""} onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""} onClick={toggleMenu}>
            About
          </Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""} onClick={toggleMenu}>
            Contact
          </Link>
          <Link
            to="/before-after"
            className={isActive("/before-after") ? "active" : ""}
            onClick={toggleMenu}
          >
            Before & After
          </Link>

          {/* CTA in menu */}
          <a href="tel:2623341881" className="nav-cta mobile-only">
            Call Us
          </a>
        </div>

        {/* Desktop CTA */}
        <a href="tel:2623341881" className="nav-cta desktop-only">
          Call Us
        </a>

        {/* Hamburger Button */}
        {!menuOpen && (
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <span></span><span></span><span></span>
          </button>
        )}

        {/* Close Button (X) */}
        {menuOpen && (
          <button
            className="close-mobile-nav"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            ×
          </button>
        )}

      </nav>
    </header>
  );
};

export default Navbar;
