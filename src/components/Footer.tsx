import "./Footer.css";

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
  { src: footerImg6, alt: "Facebook",             href: "https://www.facebook.com/profile.php?id=100090393265941" },
  { src: footerImg7, alt: "Instagram",            href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* TOP LINE: Primary Business Badges & Socials */}
      <div className="footer-images">
        {badgeLinks.map(({ src, alt, href }) => (
          <a
            key={alt}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-badge-link"
            aria-label={alt}
          >
            <img src={src} alt={alt} />
          </a>
        ))}
      </div>

      {/* CONTACT & ADDRESS BLOCK */}
      <div className="footer-contact">
        <div className="footer-contact-item">
          <span className="footer-contact-label">Address</span>
          <a
            href="https://maps.google.com/?cid=2414852586862273599&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl"
            target="_blank"
            rel="noopener noreferrer"
          >
            2334 Stonebridge Cir Unit E, West Bend, WI 53095
          </a>
        </div>
        <div className="footer-contact-divider" />
        <div className="footer-contact-item">
          <span className="footer-contact-label">Phone</span>
          <a href="tel:+12623341881">(262) 334-1881</a>
        </div>
        <div className="footer-contact-divider" />
        <div className="footer-contact-item">
          <span className="footer-contact-label">Email</span>
          <a href="mailto:kettlemoraineprocleaners@gmail.com">
            kettlemoraineprocleaners@gmail.com
          </a>
        </div>
      </div>

      <p className="copyright">
        © {new Date().getFullYear()} Kettle Moraine Professional Cleaners. All rights reserved.
      </p>

      {/* BOTTOM LINE: Tech stack credit */}
      <p className="credit">
        Website by{" "}
        <a
          href="https://zhowellportfolio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zachary Howell
        </a>
        <span className="tech-stack">
          <img src={footerImg2} alt="React" title="Built with React" />
          <img src={footerImg3} alt="TypeScript" title="TypeScript" />
          <img src={footerImg4} alt="Vite" title="Vite" />
        </span>
      </p>
    </footer>
  );
}