import { useState, useEffect, useRef } from 'react';
import profileImg1 from './assets/profile2.jpg';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Share+Tech+Mono&family=Barlow:wght@400;500&display=swap');

  :root {
    --acid: #CCFF00;
    --acid-dim: #AADD00;
    --black: #0A0A0A;
    --dark: #111111;
    --panel: #161616;
    --border: #2A2A2A;
    --muted: #888888;
    --white: #F5F5F5;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ra-root {
    min-height: 100vh;
    background: var(--black);
    color: var(--white);
    font-family: 'Barlow', sans-serif;
    display: flex;
    overflow: hidden;
    position: relative;
  }

  /* ─── LEFT ACID PANEL ─────────────────── */
  .ra-left {
    width: 42%;
    min-height: 100vh;
    background: var(--acid);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.5rem 2.5rem 2rem;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .ra-left::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: -20px;
    width: 120%;
    height: 180px;
    background: var(--black);
    opacity: 0.06;
    transform: rotate(-4deg);
    pointer-events: none;
  }

  .ra-logo {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--black);
    letter-spacing: 0.12em;
    border: 1.5px solid var(--black);
    display: inline-block;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
  }

  .ra-hero-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0;
  }

  .ra-greeting {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    color: rgba(0,0,0,0.55);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .ra-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 900;
    line-height: 0.9;
    color: var(--black);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
  }

  .ra-name .cursor-wrap {
    display: inline;
  }

  .ra-cursor {
    display: inline-block;
    width: 6px;
    height: 0.85em;
    background: var(--black);
    margin-left: 4px;
    vertical-align: middle;
    animation: blink 0.9s step-end infinite;
  }

  .ra-tagline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.05rem;
    color: rgba(0,0,0,0.6);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    line-height: 1.4;
    max-width: 320px;
    margin-bottom: 2rem;
  }

  .ra-skill-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--black);
    color: var(--acid);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.78rem;
    padding: 0.45rem 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: transform 0.25s ease;
  }

  .ra-skill-pill .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--acid);
    flex-shrink: 0;
  }

  .ra-bottom-left {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .ra-desc {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: rgba(0,0,0,0.5);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 1.6;
    max-width: 280px;
  }

  .ra-watermark {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(3rem, 7vw, 5.5rem);
    color: rgba(0,0,0,0.08);
    text-transform: uppercase;
    letter-spacing: -0.03em;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    margin-top: 0.5rem;
  }

  /* ─── RIGHT DARK PANEL ─────────────────── */
  .ra-right {
    flex: 1;
    min-height: 100vh;
    background: var(--black);
    display: flex;
    flex-direction: column;
    padding: 2.5rem 3rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .ra-section-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    color: var(--acid);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 3rem;
    opacity: 0.9;
  }

  /* Profile image area */
  .ra-profile-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0 2rem;
    position: relative;
  }

  .ra-img-frame {
    position: relative;
    width: 260px;
    height: 260px;
  }

  .ra-img-frame::before {
    content: '';
    position: absolute;
    top: 14px;
    left: 14px;
    right: -14px;
    bottom: -14px;
    border: 1.5px solid var(--acid);
    opacity: 0.35;
    pointer-events: none;
    z-index: 0;
  }

  .ra-img-border {
    position: absolute;
    inset: 0;
    border: 1.5px solid var(--border);
    z-index: 2;
    pointer-events: none;
  }

  .ra-img-inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 1;
    background: var(--panel);
  }

  .ra-img-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(30%) contrast(1.05);
    transition: filter 0.4s;
  }

  .ra-img-inner:hover img {
    filter: grayscale(0%) contrast(1.1);
  }

  .ra-img-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--panel);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 5rem;
    color: var(--acid);
    opacity: 0.5;
    letter-spacing: -0.04em;
  }

  .ra-img-tag {
    position: absolute;
    bottom: -12px;
    right: -14px;
    background: var(--acid);
    color: var(--black);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    padding: 0.3rem 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    z-index: 10;
  }

  .ra-corner-tl {
    position: absolute;
    top: -1px; left: -1px;
    width: 18px; height: 18px;
    border-top: 2px solid var(--acid);
    border-left: 2px solid var(--acid);
    pointer-events: none;
    z-index: 3;
  }
  .ra-corner-br {
    position: absolute;
    bottom: -1px; right: -1px;
    width: 18px; height: 18px;
    border-bottom: 2px solid var(--acid);
    border-right: 2px solid var(--acid);
    pointer-events: none;
    z-index: 3;
  }

  /* Skills terminal block */
  .ra-terminal {
    background: var(--panel);
    border: 1px solid var(--border);
    padding: 1rem 1.25rem;
    margin-top: auto;
    position: relative;
  }

  .ra-terminal-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.65rem;
    border-bottom: 1px solid var(--border);
  }

  .ra-dot { width: 8px; height: 8px; border-radius: 50%; }
  .ra-dot.r { background: #ff5f57; }
  .ra-dot.y { background: #febc2e; }
  .ra-dot.g { background: #28c840; }

  .ra-terminal-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.06em;
    margin-left: 0.25rem;
  }

  .ra-code {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    line-height: 1.7;
  }

  .ra-code .kw { color: var(--acid); }
  .ra-code .var { color: #60a5fa; }
  .ra-code .str { color: #c084fc; }
  .ra-code .skill-row { display: flex; padding-left: 1.2rem; transition: all 0.25s; }
  .ra-code .skill-row.active { color: #22d3ee; transform: translateX(5px); }
  .ra-code .skill-row:not(.active) { color: rgba(136,136,136,0.7); }
  .ra-code .skill-key { color: #c084fc; }
  .ra-code .skill-fire { color: var(--acid); }

  /* Side numbers decoration */
  .ra-side-num {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: rgba(204,255,0,0.15);
    letter-spacing: 0.15em;
    user-select: none;
    white-space: nowrap;
  }

  /* Animations */
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .ra-left, .ra-right {
    animation: fadeSlideIn 0.7s ease both;
  }
  .ra-right { animation-delay: 0.12s; }

  /* Responsive */
  @media (max-width: 900px) {
    .ra-root { flex-direction: column; }
    .ra-left { width: 100%; min-height: auto; padding: 2rem; }
    .ra-right { padding: 2rem; min-height: auto; }
    .ra-name { font-size: clamp(3rem, 12vw, 5rem); }
    .ra-img-frame { width: 200px; height: 200px; }
  }
`;

const AboutMe = () => {
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const fullName = "Jai Ganesh H";

  const skills = [
    "Full-Stack Development",
    "Python Backend Dev",
    "Mobile App Development",
    "AI / ML Development",
    "UI / UX Design",
    "Blockchain Development",
  ];

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= fullName.length) {
        setTypedText(fullName.substring(0, i));
        i++;
      } else clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveSkillIndex(p => (p + 1) % skills.length);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div id="home" className="ra-root">

        {/* ─── LEFT PANEL ─── */}
        <div className="ra-left">
          <div className="ra-logo">JG — Portfolio</div>

          <div className="ra-hero-text">
            <div className="ra-greeting">// 01 — Introduction</div>

            <h1 className="ra-name">
              <span className="cursor-wrap">
                {typedText}
              </span>
              <span className="ra-cursor" />
            </h1>

            <p className="ra-tagline">
              Building tomorrow's<br />
              digital experiences<br />
              today.
            </p>

            <div className="ra-skill-pill">
              <span className="dot" />
              {skills[activeSkillIndex]}
            </div>
          </div>

          <div className="ra-bottom-left">
            <p className="ra-desc">
              CSE student & developer.<br />
              Fullstack · Mobile · Blockchain · AI/ML<br />
              Turning ideas into real solutions.
            </p>
            <div className="ra-watermark">JG.DEV</div>
          </div>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div className="ra-right">
          <div className="ra-section-label">// 02 — Profile</div>

          <div className="ra-profile-area">
            <div className="ra-img-frame">
              <div className="ra-corner-tl" />
              <div className="ra-corner-br" />
              <div className="ra-img-border" />
              <div className="ra-img-inner">
                {/* Replace src with your actual import when using locally */}
                { <img src={profileImg1} alt="Jai Ganesh H" /> }
                <div className="ra-img-placeholder">JG</div>
              </div>
              <div className="ra-img-tag">@jaiganesh_h</div>
            </div>
          </div>

          <div className="ra-terminal">
            <div className="ra-terminal-bar">
              <span className="ra-dot r" />
              <span className="ra-dot y" />
              <span className="ra-dot g" />
              <span className="ra-terminal-title">skills.js — ~/portfolio</span>
            </div>
            <div className="ra-code">
              <div><span className="kw">const</span> <span className="var">skills</span> = {'{'}</div>
              {skills.map((skill, i) => (
                <div key={skill} className={`skill-row${activeSkillIndex === i ? ' active' : ''}`}>
                  <span className="skill-key">"{skill}"</span>
                  <span>: </span>
                  <span className={activeSkillIndex === i ? 'skill-fire' : 'str'}>
                    {activeSkillIndex === i ? '"🔥 active"' : '"proficient"'}
                  </span>,
                </div>
              ))}
              <div>{'}'}</div>
            </div>
          </div>

          <div className="ra-side-num">PORTFOLIO · 2025 · JAIGANESH.DEV</div>
        </div>

      </div>
    </>
  );
};

export default AboutMe;