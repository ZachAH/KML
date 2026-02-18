import "./Footer.css";

// Footer images
import footerImg1 from "../assets/footer/badge-1.svg";
import footerImg2 from "../assets/footer/badge-2.svg";
import footerImg3 from "../assets/footer/badge-3.svg";
import footerImg4 from "../assets/footer/badge-4.svg";
import footerImg5 from "../assets/footer/badge-5.webp";
import footerImg6 from "../assets/footer/badge-6.svg";
import footerImg7 from "../assets/footer/badge-7.svg";

export default function Footer() {
  return (
    <footer className="footer">
      {/* 🔑 TOP LINE: Primary Business Badges & Socials */}
      <div className="footer-images">
        <img src={footerImg1} alt="IICRC Certification" />
        <img src={footerImg5} alt="CRI Member" />
        <img src={footerImg6} alt="Facebook" />
        <img src={footerImg7} alt="Instagram" />
      </div>

      <p className="copyright">
        © {new Date().getFullYear()} Kettle Moraine Professional Cleaners. All rights reserved. TEST
      </p>

      {/* 🔑 BOTTOM LINE: Smaller Tech Stack next to Credit */}
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