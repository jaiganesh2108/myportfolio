import { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import './Connect.css';

const Connect = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll') || [];
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here (e.g., API call)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <section id="connect" className="connect" ref={sectionRef}>
      <div className="decorative-elements">
        <div className="decorative-circle1"></div>
        <div className="decorative-circle2"></div>
        <div className="decorative-circle3"></div>
      </div>

      <div className="connect-container">
        <h2 className="connect-title animate-on-scroll">
          <span className="header-line">
            <div className="line-decoration left"></div>
            <span className="header-subtitle">Get in Touch</span>
            <div className="line-decoration right"></div>
          </span>
          <span className="title-gradient">Let's Connect</span>
        </h2>
        <p className="connect-text animate-on-scroll">
          I'm open to new opportunities and collaborations. Reach out to me!
        </p>

        <div className="connect-form-container animate-on-scroll">
          <div className="form-glow"></div>
          <form className="connect-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="form-input form-textarea"
                rows="5"
                required
              />
            </div>
            <button type="submit" className="form-submit">
              Send Message
            </button>
          </form>
        </div>

        <div className="connect-links animate-on-scroll">
          <a href="mailto:your.email@example.com" className="connect-link">
            <FaEnvelope className="connect-icon" />
          </a>
          <a href="https://linkedin.com/in/yourprofile" className="connect-link">
            <FaLinkedin className="connect-icon" />
          </a>
        </div>
      </div>
      
    </section>
  );
};

export default Connect;