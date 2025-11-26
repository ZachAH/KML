import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-section" id="contact">
      <div className="contact-container">

        <h2 className="contact-heading">Contact Us:</h2>
        <p className="contact-sub">
          Fill out the Contact Form below to get started with a quote or to set up an appointment.
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.7348618073277!2d-88.17854392395144!3d43.409041068891556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8804fdef9e4db2ef%3A0xa9e815281ee4ef0!2s2334%20Stonebridge%20Dr%20Ste%20E%2C%20West%20Bend%2C%20WI%2053095!5e0!3m2!1sen!2us!4v1732580000000!5m2!1sen!2us"
              ></iframe>

              <div className="map-pin"></div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=2334+Stonebridge+Dr+Suite+E+West+Bend+WI+53095"
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
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();

                const formData = new FormData(e.currentTarget);
                const first = formData.get("first_name") || "";
                const last = formData.get("last_name") || "";
                const phone = formData.get("phone") || "";
                const email = formData.get("email") || "";
                const message = formData.get("message") || "";

                const subject = encodeURIComponent(
                  `Cleaning Service Quote Request from ${first} ${last}`
                );

                const body = encodeURIComponent(
`Name: ${first} ${last}
Phone: ${phone}
Email: ${email}

Requested Cleaning Services:
${message}`
                );

                window.location.href = `mailto:kettlemoraineprofesionalcleaners@gmail.com?subject=${subject}&body=${body}`;
              }}
            >
              <div className="form-row">
                <input type="text" name="first_name" placeholder="First Name" required />
                <input type="text" name="last_name" placeholder="Last Name" required />
              </div>

              <input type="tel" name="phone" placeholder="Phone" required />
              <input type="email" name="email" placeholder="Email *" required />

              <textarea
                name="message"
                placeholder="Tell us about the services you would like professionally cleaned:"
                rows={6}
                required
              ></textarea>

              <button type="submit" className="form-submit-button">
                Send
              </button>
            </form>

            <div className="contact-info">
              <p>2334 Stonebridge Dr, Suite E</p>
              <p>West Bend, WI 53095</p>
              <p>Phone: (262) 334-1881</p>
              <p>Email: kettlemoraineprofesionalcleaners@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
