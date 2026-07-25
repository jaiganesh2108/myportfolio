import { useState, useEffect, useRef } from 'react';
import profileImg1 from './assets/profile2.jpg';
import resumePdf from './assets/Resume.pdf';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Share+Tech+Mono&family=Barlow:wght@500;600;700&display=swap');

  :root {
    --acid: #CBFF3E;
    --acid-dim: #AEDD1F;
    --ink: #0D1130;
    --ink-soft: rgba(13,17,48,0.62);
    --ink-faint: rgba(13,17,48,0.4);
    --pill-bg: rgba(255,255,255,0.88);
    --pill-border: rgba(13,17,48,0.08);
  }

  .nb-wrap {
    position: fixed;
    top: 1.1rem;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    padding: 0 1.25rem;
    pointer-events: none;
  }

  .nb-pill {
    pointer-events: auto;
    width: 100%;
    max-width: 760px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--pill-bg);
    border: 1px solid var(--pill-border);
    border-radius: 999px;
    padding: 0.45rem 0.55rem 0.45rem 0.55rem;
    box-shadow: 0 10px 30px rgba(13,17,48,0.08);
    backdrop-filter: blur(10px);
    transition: box-shadow 0.3s ease, transform 0.35s ease, opacity 0.35s ease, background 0.3s ease;
    font-family: 'Barlow', sans-serif;
  }

  .nb-pill.scrolled {
    box-shadow: 0 14px 34px rgba(13,17,48,0.14);
    background: rgba(255,255,255,0.96);
  }

  .nb-pill.hidden {
    transform: translateY(-140%);
    opacity: 0;
  }

  /* brand: avatar + name */
  .nb-brand {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    text-decoration: none;
    padding: 0.15rem 0.6rem 0.15rem 0.15rem;
    flex-shrink: 0;
  }

  .nb-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--acid);
    flex-shrink: 0;
  }

  .nb-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 18%;
    display: block;
  }

  .nb-name {
    font-weight: 700;
    font-size: 0.92rem;
    color: var(--ink);
    white-space: nowrap;
  }

  /* desktop links */
  .nb-links {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    margin: 0 auto;
    flex-wrap: nowrap;
  }

  .nb-link {
    font-weight: 600;
    font-size: 0.86rem;
    color: var(--ink-soft);
    text-decoration: none;
    padding: 0.5rem 0.7rem;
    border-radius: 999px;
    white-space: nowrap;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .nb-link:hover {
    color: var(--ink);
    background: rgba(13,17,48,0.05);
  }

  .nb-link.active {
    color: var(--ink);
    background: rgba(203,255,62,0.35);
  }

  /* resume pill button */
  .nb-resume {
    flex-shrink: 0;
    font-weight: 700;
    font-size: 0.86rem;
    color: var(--ink);
    text-decoration: none;
    background: rgba(13,17,48,0.06);
    border: 1px solid var(--pill-border);
    padding: 0.55rem 1.15rem;
    border-radius: 999px;
    white-space: nowrap;
    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .nb-resume:hover {
    background: var(--ink);
    color: var(--acid);
    transform: translateY(-1px);
  }

  /* mobile toggle */
  .nb-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background: rgba(13,17,48,0.06);
    border: 1px solid var(--pill-border);
    border-radius: 50%;
    color: var(--ink);
    font-size: 1rem;
    cursor: pointer;
    flex-shrink: 0;
    margin-left: auto;
    transition: background 0.2s ease;
  }

  .nb-toggle:hover {
    background: rgba(13,17,48,0.1);
  }

  /* mobile dropdown card */
  .nb-mobile-wrap {
    pointer-events: none;
    display: flex;
    justify-content: center;
    padding: 0 1.25rem;
  }

  .nb-mobile {
    pointer-events: auto;
    width: 100%;
    max-width: 760px;
    margin-top: 0.6rem;
    background: rgba(255,255,255,0.98);
    border: 1px solid var(--pill-border);
    border-radius: 22px;
    box-shadow: 0 14px 34px rgba(13,17,48,0.14);
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.3s ease, opacity 0.25s ease;
  }

  .nb-mobile.open {
    max-height: 480px;
    opacity: 1;
  }

  .nb-mlink {
    display: block;
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
    font-size: 0.92rem;
    color: var(--ink-soft);
    text-decoration: none;
    padding: 0.85rem 1.4rem;
    border-bottom: 1px solid var(--pill-border);
    border-left: 3px solid transparent;
    transition: color 0.2s ease, background 0.2s ease, border-left-color 0.2s ease;
  }

  .nb-mlink:last-child { border-bottom: none; }

  .nb-mlink:hover,
  .nb-mlink.active {
    color: var(--ink);
    background: rgba(203,255,62,0.14);
    border-left-color: var(--acid);
  }

  .nb-mresume {
    display: block;
    font-weight: 700;
    font-size: 0.92rem;
    color: var(--ink);
    text-decoration: none;
    text-align: center;
    padding: 0.9rem 1.4rem;
    background: rgba(13,17,48,0.05);
  }

  @media (max-width: 860px) {
    .nb-links,
    .nb-resume {
      display: none;
    }

    .nb-toggle {
      display: flex;
    }
  }
`;

const NavBar = () => {
  const sections = ['Home', 'Skills', 'Projects', 'Achievements', 'Education', 'Connect'];

  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hidden, setHidden] = useState(false);
  const idleTimerRef = useRef(null);

  const showNav = () => setHidden(false);

  const resetIdleTimer = () => {
    showNav();
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (!expanded) setHidden(true);
    }, 2500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const currentPos = window.scrollY + 100;
      sections.forEach((section) => {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (currentPos >= offsetTop && currentPos < offsetTop + offsetHeight) {
            setActiveSection(section.toLowerCase());
          }
        }
      });

      resetIdleTimer();
    };

    const handleActivity = () => resetIdleTimer();
    const handleFocus = () => showNav();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity, { passive: true });
    window.addEventListener('focus', handleFocus);

    resetIdleTimer();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('focus', handleFocus);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (expanded) setHidden(false);
  }, [expanded]);

  const toggleMenu = () => {
    setExpanded((p) => !p);
    setHidden(false);
  };

  const handleLinkClick = () => {
    if (expanded) setExpanded(false);
    showNav();
    resetIdleTimer();
  };

  return (
    <>
      <style>{styles}</style>

      <div className="nb-wrap">
        <div className={`nb-pill ${scrolled ? 'scrolled' : ''} ${hidden && !expanded ? 'hidden' : ''}`}>
          <a href="#home" className="nb-brand" onClick={handleLinkClick}>
            <span className="nb-avatar">
              <img src={profileImg1} alt="Jai Ganesh H" />
            </span>
            <span className="nb-name">Jai Ganesh H</span>
          </a>

          <div className="nb-links">
            {sections.slice(1).map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className={`nb-link ${activeSection === section.toLowerCase() ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                {section}
              </a>
            ))}
          </div>

          <a className="nb-resume" href={resumePdf} download="Resume.pdf">
            Resume
          </a>

          <button
            className="nb-toggle"
            onClick={toggleMenu}
            aria-label={expanded ? 'Close menu' : 'Open menu'}
          >
            {expanded ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <div className="nb-mobile-wrap" style={{ position: 'fixed', top: '4.3rem', left: 0, right: 0, zIndex: 999 }}>
        <div className={`nb-mobile ${expanded ? 'open' : ''}`}>
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              className={`nb-mlink ${activeSection === section.toLowerCase() ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              {section}
            </a>
          ))}
          <a className="nb-mresume" href={resumePdf} download="Resume.pdf" onClick={handleLinkClick}>
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
};

export default NavBar;