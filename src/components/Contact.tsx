import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
//branch update

export default function Contact() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const first   = formData.get("first_name") as string;
    const last    = formData.get("last_name")  as string;
    const phone   = formData.get("phone")      as string;
    const email   = formData.get("email")      as string;
    const message = formData.get("message")    as string;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  `${first} ${last}`,
          from_email: email,
          phone,
          message,
          to_email:   "kettlemoraineprocleaners@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      setShowThankYou(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try calling us directly at (262) 344-1881.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-section" id="contact">
      <div className="contact-container">

        <h2 className="contact-heading">Contact Us:</h2>
        <p className="contact-sub">
          Fill out the Contact Form below to get started with a quote or to set up an appointment, or feel free to give us a call.
          Thank you for the opportunity to clean for you!
        </p>

        <div className="contact-content">
          {/* MAP AREA */}
          <div className="contact-visual">
            <div className="map-wrapper">
              <iframe
                title="KML Location"
                className="contact-map"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.334015199118!2d-88.1728522!3d43.390947600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880458ab40339a93%3A0x218347a220dbe43f!2sKettle%20Moraine%20Professional%20Cleaners%2C%20Inc.!5e0!3m2!1sen!2sus!4v1771546882204!5m2!1sen!2sus"
              ></iframe>
              <div className="map-pin"></div>
              <a
                href="https://maps.google.com/?cid=2414852586862273599&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl"
                target="_blank"
                rel="noopener noreferrer"
                className="map-directions-btn"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* FORM AREA */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" name="first_name" placeholder="First Name" required />
                <input type="text" name="last_name"  placeholder="Last Name"  required />
              </div>
              <input type="tel"   name="phone"   placeholder="Phone"    required />
              <input type="email" name="email"   placeholder="Email *"  required />
              <textarea
                name="message"
                placeholder="Tell us about the areas you would like professionally cleaned:"
                rows={6}
                required
              />

              {error && <p className="form-error">{error}</p>}

              <div className="form-actions">
                <button
                  type="submit"
                  className="form-submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending…" : "Send"}
                </button>
              </div>
            </form>

            <div className="contact-info">
              {/* <p>2334 Stonebridge Cir, Unit E</p>
              <p>West Bend, WI 53095</p>
              <p>Phone: <a href="tel:+12623341881">(262) 344-1881</a></p>
              <p>
                Email:{" "}
                <a href="mailto:kettlemoraineprocleaners@gmail.com">
                  kettlemoraineprocleaners@gmail.com
                </a>
              </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* THANK YOU POPUP */}
      {showThankYou && (
        <div className="thankyou-overlay" onClick={() => setShowThankYou(false)}>
          <div className="thankyou-modal" onClick={(e) => e.stopPropagation()}>
            <div className="thankyou-icon">✓</div>
            <h3 className="thankyou-title">Thank You!</h3>
            <p className="thankyou-message">
              We've received your message and will respond within one business day.
              We look forward to cleaning for you!
            </p>
            <button className="thankyou-close-btn" onClick={() => setShowThankYou(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}