import '../styles/contact.scss';

const Contact = () => {
  return (
    <section className="contact-section container">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-container">
        <p className="contact-text">
          Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
        </p>
        
        {/* Basic UI Form without backend action */}
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <textarea placeholder="Your Message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;