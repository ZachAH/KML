import "./Footer.css";

// Footer images
import footerImg1 from "../assets/footer/badge-1.svg";
import footerImg2 from "../assets/footer/badge-2.svg";
import footerImg3 from "../assets/footer/badge-3.svg";
import footerImg4 from "../assets/footer/badge-4.svg";
import footerImg5 from "../assets/footer/badge-5.webp";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Footer image row */}
      <div className="footer-images">
        <img src={footerImg1} alt="Professional cleaning certification" />
        <img src={footerImg5} alt="Professional cleaning certification" />
        <img src={footerImg2} alt="Industry standard certification" />
        <img src={footerImg3} alt="Eco-friendly cleaning badge" />
        <img src={footerImg4} alt="Trusted local business badge" />
      </div>

      <p>
        © {new Date().getFullYear()} Kettle Moraine Professional Cleaners. All rights reserved.
      </p>

      <p className="credit">
        Website by{" "}
        <a
          href="https://zhowellportfolio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zach Howell
        </a>
      </p>
    </footer>
  );
}
