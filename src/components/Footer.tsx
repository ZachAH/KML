import "./Footer.css";
import kmlLogo from "../assets/cleaning/KML_Logo.svg";

// Footer images
import footerImg1 from "../assets/footer/badge-1.svg";
import footerImg2 from "../assets/footer/badge-2.svg";
import footerImg3 from "../assets/footer/badge-3.svg";
import footerImg4 from "../assets/footer/badge-4.svg";
import footerImg5 from "../assets/footer/badge-5.webp";
import footerImg6 from "../assets/footer/badge-6.svg";
import footerImg7 from "../assets/footer/badge-7.svg";

const badgeLinks = [
  { src: footerImg1, alt: "IICRC Certification", href: "https://iicrc.org" },
  { src: footerImg5, alt: "CRI Member",          href: "https://carpet-rug.org" },
];

const socialLinks = [
  { src: footerImg6, alt: "Facebook",             href: "https://www.facebook.com/profile.php?id=100090393265941" },
  { src: footerImg7, alt: "Instagram",            href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120V20C200,80,400,0,600,40,800,80,1000,20,1200,60V120H0Z" fill="#01351d" />
        </svg>
      </div>
      
      <div className="footer-container">
        {/* TOP LINE: Logo, Socials, and Certs */}
        <div className="footer-brand">
          <img src={kmlLogo} alt="Kettle Moraine Logo" className="footer-logo" />
          
          <div className="footer-assets">
            {/* Social Icons */}
            <div className="footer-socials">
              {socialLinks.map(({ src, alt, href }) => (
                <a key={alt} href={href} target="_blank" rel="noopener noreferrer">
                  <img src={src} alt={alt} className="footer-icon-color" />
                </a>
              ))}
            </div>

            <div className="footer-asset-divider" />

            {/* Certification Badges */}
            <div className="footer-badges-row">
              {badgeLinks.map(({ src, alt, href }) => (
                <a key={alt} href={href} target="_blank" rel="noopener noreferrer">
                  <img src={src} alt={alt} className="footer-icon-color" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* INFO COLUMNS: Now cleaner with just text */}
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:+12623341881" className="footer-link">(262) 334-1881</a>
            <a href="mailto:kettlemoraineprocleaners@gmail.com" className="footer-link">
              kettlemoraineprocleaners@gmail.com
            </a>
          </div>

          <div className="footer-col">
            <h4>Visit</h4>
            <a 
              href="https://www.google.com/maps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link address"
            >
              2334 Stonebridge Cir Unit E<br/> 
              West Bend, WI 53095
            </a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <a href="/about" className="footer-link">About Us</a>
            <a href="/services" className="footer-link">Our Services</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} Kettle Moraine Professional Cleaners.
        </p>
        
        <div className="credit">
          <span>Website by <a href="https://zhowellportfolio.netlify.app/" target="_blank" rel="noopener noreferrer">Zachary Howell</a></span>
          <div className="tech-stack">
            <img src={footerImg2} alt="React" />
            <img src={footerImg3} alt="TypeScript" />
            <img src={footerImg4} alt="Vite" />
          </div>
        </div>
      </div>
    </footer>
  );
}