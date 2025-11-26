export default function Contact() {
    return (
      <section className="contact-section" id="contact">
        <div className="contact-heading">
          <h1>Contact Us:</h1>
          <p>
            Fill out the <strong>Contact Form</strong> below to get started with a
            quote or to set up an appointment. Thank you for the opportunity to
            clean for you!
          </p>
        </div>
  
        <div className="contact-content">
          <div className="contact-visual">
            <div className="placeholder-image"></div>
          </div>
  
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-row">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>
  
              <input type="tel" placeholder="Phone" required />
              <input type="email" placeholder="Email *" required />
  
              <label htmlFor="message">
                Tell us about the areas you would like to have professionally
                cleaned:
              </label>
              <textarea id="message" rows={6}></textarea>
  
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
      </section>
    );
  }
  