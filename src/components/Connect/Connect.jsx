import { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Share+Tech+Mono&family=Barlow:wght@400;500&display=swap');

  :root {
    --acid: #CCFF00;
    --black: #0A0A0A;
    --panel: #161616;
    --border: #2A2A2A;
    --muted: #666666;
    --white: #F0F0F0;
  }

  .cn-root {
    background: var(--black);
    padding: 5rem 2rem;
    font-family: 'Barlow', sans-serif;
    color: var(--white);
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }

  /* Watermark */
  .cn-bg-wm {
    position: absolute;
    bottom: -2rem;
    right: -1rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(5rem, 14vw, 11rem);
    color: rgba(204, 255, 0, 0.04);
    text-transform: uppercase;
    letter-spacing: -0.04em;
    line-height: 1;
    user-select: none;
    white-space: nowrap;
    pointer-events: none;
    z-index: 0;
  }

  /* Corner accent */
  .cn-corner-tl {
    position: absolute;
    top: 2rem;
    left: 2rem;
    width: 50px;
    height: 50px;
    border-top: 1.5px solid rgba(204, 255, 0, 0.18);
    border-left: 1.5px solid rgba(204, 255, 0, 0.18);
    pointer-events: none;
    z-index: 0;
  }

  /* Container */
  .cn-container {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  /* Header */
  .cn-head {
    margin-bottom: 2rem;
  }

  .cn-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--acid);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    opacity: 0.85;
  }

  .cn-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: var(--white);
  }

  .cn-title span {
    color: var(--acid);
  }

  .cn-divider {
    width: 60px;
    height: 2px;
    background: var(--acid);
    margin-top: 1.2rem;
    opacity: 0.6;
  }

  /* Description */
  .cn-desc {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 1.75rem 0 2.5rem;
    line-height: 1.8;
  }

  /* Split layout */
  .cn-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    margin-bottom: 1px;
    transition: opacity 0.6s ease, transform 0.6s ease;
    opacity: 0;
    transform: translateY(20px);
  }

  .cn-body.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  /* Shared panel styles */
  .cn-form-panel,
  .cn-info-panel {
    background: var(--black);
    padding: 2rem;
    position: relative;
    overflow: hidden;
    transition: background 0.25s;
  }

  .cn-form-panel:hover,
  .cn-info-panel:hover {
    background: var(--panel);
  }

  .cn-form-panel::before,
  .cn-info-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--acid);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .cn-form-panel:hover::before,
  .cn-info-panel:hover::before {
    transform: scaleX(1);
  }

  .cn-info-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Panel index label */
  .cn-panel-idx {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    color: rgba(204, 255, 0, 0.3);
    letter-spacing: 0.15em;
    margin-bottom: 1.25rem;
  }

  /* Form */
  .cn-form {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .cn-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
  }

  .cn-input {
    width: 100%;
    background: var(--panel);
    border: 1px solid var(--border);
    color: var(--white);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.05em;
    padding: 0.7rem 0.9rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .cn-input::placeholder {
    color: var(--muted);
  }

  .cn-input:focus {
    border-color: rgba(204, 255, 0, 0.5);
  }

  .cn-textarea {
    resize: vertical;
    min-height: 120px;
  }

  .cn-submit {
    background: var(--acid);
    color: #000;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: none;
    padding: 0.85rem 1.5rem;
    cursor: pointer;
    transition: background 0.2s, letter-spacing 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
  }

  .cn-submit:hover {
    background: #DDFF22;
    letter-spacing: 0.14em;
  }

  /* Info panel */
  .cn-info-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: var(--white);
    margin-bottom: 0.6rem;
    line-height: 1.05;
  }

  .cn-info-sub {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1.8;
    margin-bottom: 2rem;
  }

  /* Social links */
  .cn-socials {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .cn-social {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.6rem 0;
    border-bottom: 1px solid var(--border);
    transition: color 0.2s, border-bottom-color 0.2s;
  }

  .cn-social:last-child {
    border-bottom: none;
  }

  .cn-social:hover {
    color: var(--acid);
    border-bottom-color: rgba(204, 255, 0, 0.25);
  }

  .cn-social-icon {
    width: 28px;
    height: 28px;
    background: var(--panel);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }

  .cn-social:hover .cn-social-icon {
    background: var(--acid);
    border-color: var(--acid);
    color: #000;
  }

  /* Corner bracket */
  .cn-corner-br {
    position: absolute;
    bottom: 0.85rem;
    right: 0.85rem;
    width: 14px;
    height: 14px;
    border-bottom: 1.5px solid rgba(204, 255, 0, 0.12);
    border-right: 1.5px solid rgba(204, 255, 0, 0.12);
    transition: border-color 0.25s;
  }

  .cn-form-panel:hover .cn-corner-br,
  .cn-info-panel:hover .cn-corner-br {
    border-color: var(--acid);
  }

  /* Responsive */
  @media (max-width: 700px) {
    .cn-root {
      padding: 3.5rem 1.25rem;
    }

    .cn-body {
      grid-template-columns: 1fr;
    }

    .cn-row {
      grid-template-columns: 1fr;
    }

    .cn-title {
      font-size: clamp(2.2rem, 9vw, 3.5rem);
    }
  }
`;

const socialLinks = [
  { icon: '✉', label: 'jaig7335@gmail.com', href: 'mailto:jaig7335@gmail.com' },
  { icon: 'in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/jai-ganesh-h-588a48321' },
  { icon: 'gh', label: 'GitHub', href: 'https://github.com/jaiganesh2108' },
  { icon: 'ig', label: 'Instagram', href: 'https://www.instagram.com/jg_official_2005' },
  { icon: '𝕏', label: 'Twitter / X', href: 'http://x.com/JaiGaneshh95881' },
  { icon: 'fb', label: 'Facebook', href: 'https://www.facebook.com/share/19c8Mn9W2s/' },
];

const Connect = () => {
  const sectionRef = useRef(null);
  const bodyRef = useRef(null);
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
      { threshold: 0.1 }
    );

    if (bodyRef.current) observer.observe(bodyRef.current);
    return () => { if (bodyRef.current) observer.unobserve(bodyRef.current); };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { ...formData, name: `${formData.firstName} ${formData.lastName}` },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert('Message sent successfully!');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      })
      .catch(() => alert('Failed to send message.'));
  };

  return (
    <>
      <style>{styles}</style>
      <section id="connect" className="cn-root" ref={sectionRef}>
        <div className="cn-bg-wm">CONNECT</div>
        <div className="cn-corner-tl" />

        <div className="cn-container">
          <div className="cn-head">
            <div className="cn-label">// 08 — Get in Touch</div>
            <h2 className="cn-title">LET'S <span>CONNECT</span></h2>
            <div className="cn-divider" />
          </div>

          <p className="cn-desc">
            Open to new opportunities and collaborations.<br />
            Reach out — I respond within 24 hours.
          </p>

          <div className="cn-body" ref={bodyRef}>
            {/* Form panel */}
            <div className="cn-form-panel">
              <div className="cn-panel-idx">// 01 — Send a Message</div>
              <form className="cn-form" onSubmit={handleSubmit}>
                <div className="cn-row">
                  <input className="cn-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                  <input className="cn-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                </div>
                <div className="cn-row">
                  <input className="cn-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                  <input className="cn-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                </div>
                <textarea className="cn-input cn-textarea" name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="5" required />
                <button className="cn-submit" type="submit">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9l20-7z" />
                  </svg>
                  Send Message →
                </button>
              </form>
              <div className="cn-corner-br" />
            </div>

            {/* Info panel */}
            <div className="cn-info-panel">
              <div>
                <div className="cn-panel-idx">// 02 — Find Me Online</div>
                <h3 className="cn-info-title">Jai Ganesh H</h3>
                <p className="cn-info-sub">
                  CSE Student & Developer<br />
                  Chennai, India · Available for Freelance
                </p>
              </div>
              <div className="cn-socials">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} className="cn-social" target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
                    <span className="cn-social-icon">{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
              <div className="cn-corner-br" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Connect;