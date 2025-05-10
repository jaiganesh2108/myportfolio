import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import './Connect.css';

const Connect = () => (
  <section id="connect" className="connect">
    <div className="connect-container">
      <h2 className="connect-title">Let's Connect</h2>
      <p className="connect-text">I'm open to new opportunities and collaborations. Reach out to me!</p>
      <div className="connect-links">
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

export default Connect;