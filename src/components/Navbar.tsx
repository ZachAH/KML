import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

// 1. Tell TypeScript that HCPWidget exists on the global window object
declare global {
  interface Window {
    HCPWidget: any;
  }
}

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

  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove("nav-open");
  }, [location.pathname]);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.classList.toggle("nav-open", next);
  };

  // 2. Function to trigger the modal safely
  const handleBooking = () => {
    if (window.HCPWidget) {
      window.HCPWidget.openModal();
    } else {
      console.error("Booking widget not loaded yet");
    }
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav-content">
        
        {/* NAV LINKS */}
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

          {/* 3. BOOK NOW BUTTON inside mobile menu */}
          <button 
            className="nav-book-btn mobile-only" 
            onClick={() => { handleBooking(); toggleMenu(); }}
          >
            Book Online
          </button>
        </div>

        {/* 4. BOOK NOW BUTTON for Desktop (visible next to hamburger) */}
        <div className="nav-actions-desktop">
           <button 
            className="nav-book-btn desktop-only" 
            onClick={handleBooking}
          >
            Book Online
          </button>

          {!menuOpen && (
            <button
              className="hamburger"
              onClick={toggleMenu}
              aria-label="Open menu"
            >
              <div className="hamburger-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="menu-text">MENU</span>
            </button>
          )}
        </div>

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