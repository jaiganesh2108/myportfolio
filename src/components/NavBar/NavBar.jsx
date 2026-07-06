import React, { useState, useEffect, useRef } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Share+Tech+Mono&display=swap');

  :root {
    --acid: #CCFF00;
    --black: #0A0A0A;
    --panel: #161616;
    --border: #2A2A2A;
    --muted: #888888;
  }

  .nb {
    width: 100%;
    background: var(--black);
    border-bottom: 1px solid var(--border);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transition: background 0.3s, border-color 0.3s, transform 0.35s ease, opacity 0.35s ease;
  }

  .nb.scrolled {
    background: rgba(10, 10, 10, 0.96);
    border-bottom-color: rgba(204, 255, 0, 0.18);
    backdrop-filter: blur(8px);
  }

  .nb.hidden {
    transform: translateY(-110%);
    opacity: 0;
    pointer-events: none;
  }

  .nb-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 58px;
    padding: 0 2rem;
    gap: 1.5rem;
  }

  /* Logo */
  .nb-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    color: var(--acid);
    letter-spacing: -0.03em;
    text-transform: uppercase;
    border: 2px solid var(--acid);
    padding: 0.2rem 0.75rem;
    line-height: 1;
    flex-shrink: 0;
    user-select: none;
    text-decoration: none;
  }

  /* Section index label */
  .nb-divider {
    width: 1px;
    height: 28px;
    background: var(--border);
    flex-shrink: 0;
  }

  .nb-index {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: rgba(204, 255, 0, 0.35);
    letter-spacing: 0.12em;
    white-space: nowrap;
    flex-shrink: 0;
    transition: color 0.3s;
  }

  .nb.scrolled .nb-index {
    color: rgba(204, 255, 0, 0.55);
  }

  /* Desktop links */
  .nb-links {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .nb-link {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.5rem 0.9rem;
    position: relative;
    transition: color 0.2s;
    white-space: nowrap;
  }

  .nb-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0.9rem;
    right: 0.9rem;
    height: 1.5px;
    background: var(--acid);
    transform: scaleX(0);
    transition: transform 0.2s;
    transform-origin: left;
  }

  .nb-link:hover {
    color: var(--acid);
  }

  .nb-link:hover::after,
  .nb-link.active::after {
    transform: scaleX(1);
  }

  .nb-link.active {
    color: var(--acid);
  }

  /* Mobile toggle */
  .nb-toggle {
    display: none;
    background: none;
    border: 1.5px solid var(--border);
    color: var(--acid);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    padding: 0.35rem 0.75rem;
    cursor: pointer;
    margin-left: auto;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: border-color 0.2s, color 0.2s;
    flex-shrink: 0;
  }

  .nb-toggle:hover {
    border-color: var(--acid);
  }

  /* Mobile menu */
  .nb-mobile {
    display: none;
    background: var(--panel);
    border-top: 1px solid var(--border);
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease;
  }

  .nb-mobile.open {
    max-height: 500px;
  }

  .nb-mlink {
    display: block;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.9rem 2rem;
    border-bottom: 1px solid var(--border);
    border-left: 2px solid transparent;
    transition: color 0.2s, background 0.2s, border-left-color 0.2s;
  }

  .nb-mlink:hover,
  .nb-mlink.active {
    color: var(--acid);
    background: rgba(204, 255, 0, 0.04);
    border-left-color: var(--acid);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .nb-links,
    .nb-divider,
    .nb-index {
      display: none;
    }

    .nb-toggle {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .nb-mobile {
      display: block;
    }
  }
`;

const NavBar = () => {
  const sections = ['Home', 'Skills', 'Projects', 'Achievements', 'Education', 'GitHub', 'Connect'];

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
      sections.forEach(section => {
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
  }, []);

  useEffect(() => {
    if (expanded) setHidden(false);
  }, [expanded]);

  const toggleMenu = () => {
    setExpanded(p => !p);
    setHidden(false);
  };

  const handleLinkClick = () => {
    if (expanded) setExpanded(false);
    showNav();
    resetIdleTimer();
  };

  const activeIndex = sections.findIndex(s => s.toLowerCase() === activeSection);
  const indexLabel = `// ${String(activeIndex >= 0 ? activeIndex : 0).padStart(2, '0')} — ${activeSection.toUpperCase()}`;

  return (
    <>
      <style>{styles}</style>
      <nav className={`nb ${scrolled ? 'scrolled' : ''} ${hidden && !expanded ? 'hidden' : ''}`}>
        <div className="nb-container">
          <a href="#home" className="nb-logo">JG</a>

          <div className="nb-divider" />
          <span className="nb-index">{indexLabel}</span>

          {/* Desktop links */}
          <div className="nb-links">
            {sections.map(section => (
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

          {/* Mobile toggle */}
          <button
            className="nb-toggle"
            onClick={toggleMenu}
            aria-label={expanded ? 'Close menu' : 'Open menu'}
          >
            {expanded ? '✕ CLOSE' : '☰ MENU'}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`nb-mobile ${expanded ? 'open' : ''}`}>
          {sections.map(section => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              className={`nb-mlink ${activeSection === section.toLowerCase() ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              {section}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavBar;