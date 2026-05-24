import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

declare global {
  interface Window {
    HCPWidget: any;
  }
}

const serviceLinks = [
  { to: "/services/carpet-upholstery-cleaning", label: "Carpet & Upholstery Cleaning" },
  { to: "/services/lvt-tile-hard-surfaces", label: "LVT, Tile & Hard Surfaces" },
  { to: "/services/commercial-programs", label: "Commercial Programs" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = serviceLinks.some((s) => location.pathname === s.to);

  // Hover handlers with delay so the mouse can travel over the gap into the panel
  const handleDropdownEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 180);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
    document.body.classList.remove("nav-open");
  }, [location.pathname]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.classList.toggle("nav-open", next);
  };

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

          {/* ── SERVICES DROPDOWN (Desktop) ── */}
          <div
            className={`nav-dropdown-wrapper ${isServicesActive ? "active-parent" : ""}`}
            ref={dropdownRef}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              className={`nav-dropdown-trigger ${isServicesActive ? "active" : ""}`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((o) => !o)}
            >
              Services
              <span className={`nav-chevron ${servicesOpen ? "open" : ""}`}>▾</span>
            </button>

            {servicesOpen && (
              <div className="nav-dropdown-menu" role="menu">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className={`nav-dropdown-item ${isActive(s.to) ? "active" : ""}`}
                    role="menuitem"
                    onClick={() => setServicesOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ── SERVICES ACCORDION (Mobile) ── */}
          <div className="nav-mobile-services">
            <button
              className={`nav-mobile-services-toggle ${isServicesActive ? "active" : ""}`}
              onClick={() => setMobileServicesOpen((o) => !o)}
              aria-expanded={mobileServicesOpen}
            >
              Services
              <span className={`nav-chevron ${mobileServicesOpen ? "open" : ""}`}>▾</span>
            </button>
            {mobileServicesOpen && (
              <div className="nav-mobile-services-list">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className={`nav-mobile-service-link ${isActive(s.to) ? "active" : ""}`}
                    onClick={toggleMenu}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className={isActive("/contact") ? "active" : ""} onClick={toggleMenu}>
            Contact
          </Link>

          <Link
            to="/before-after"
            className={isActive("/before-after") ? "active" : ""}
            onClick={toggleMenu}
          >
            Before &amp; After
          </Link>

          {/* BOOK NOW inside mobile menu */}
          <button
            className="nav-book-btn mobile-only"
            onClick={() => { handleBooking(); toggleMenu(); }}
          >
            Book Online
          </button>
        </div>

        {/* Desktop actions */}
        <div className="nav-actions-desktop">
          <button
            className="nav-book-btn desktop-only"
            onClick={handleBooking}
          >
            Schedule a Cleaning
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
