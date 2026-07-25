import { useState, useEffect } from 'react';
import profileImg1 from './assets/profile2.jpg';
import resumePdf from './assets/Resume.pdf';
import InteractiveDots from './InteractiveDots';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Share+Tech+Mono&family=Barlow:wght@400;500;600&display=swap');

  :root {
    --acid: #CBFF3E;
    --acid-dim: #AEDD1F;
    --violet: #C084FC;
    --ink: #0D1130;
    --ink-soft: rgba(13,17,48,0.6);
    --ink-faint: rgba(13,17,48,0.38);
    --bg: #FBFAF6;
    --line: rgba(13,17,48,0.08);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .jg-root {
    position: relative;
    min-height: 100vh;
    background: var(--bg);
    color: var(--ink);
    font-family: 'Barlow', sans-serif;
    overflow: hidden;
    opacity: 0;
    animation: pageIn 0.7s ease forwards;
  }

  @keyframes pageIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* ── interactive dot background layer ── */
  .jg-dots-layer {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .jg-dots-canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .jg-bg-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
    opacity: 0.22;
  }

  .jg-bg-blob.a {
    width: 480px;
    height: 480px;
    top: -14%;
    left: -10%;
    background: radial-gradient(circle, var(--acid), transparent 70%);
    animation: blobDriftA 32s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
  }

  .jg-bg-blob.b {
    width: 440px;
    height: 440px;
    bottom: -14%;
    right: -10%;
    background: radial-gradient(circle, var(--violet), transparent 70%);
    opacity: 0.16;
    animation: blobDriftB 36s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
  }

  @keyframes blobDriftA {
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(40px, 30px) scale(1.08); }
  }

  @keyframes blobDriftB {
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(-35px, -25px) scale(1.06); }
  }

  .jg-hero {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 4.5rem 2rem 2.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* content sits above the canvas visually, but doesn't block mouse
     tracking — the dots listen on window, so this is purely about
     click-through for links/buttons underneath text if ever needed */
  .jg-hero * {
    position: relative;
  }

  /* hand-drawn squiggle doodles */
  .jg-doodle {
    position: absolute;
    stroke: var(--ink);
    opacity: 0.45;
    z-index: 1;
  }
  .jg-doodle-top { top: 3.6rem; left: 50%; transform: translateX(90px); width: 70px; }

  .jg-eyebrow {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 1.7rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: rgba(255,255,255,0.6);
    opacity: 0;
    animation: fadeUp 0.6s ease 0.05s forwards;
  }

  .jg-eyebrow .live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--acid);
    box-shadow: 0 0 0 3px rgba(203,255,62,0.25);
    animation: pulseDot 1.8s ease-in-out infinite;
  }

  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }

  .jg-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(2.5rem, 5.6vw, 4.6rem);
    line-height: 1.06;
    letter-spacing: -0.01em;
    max-width: 960px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.3em 0.28em;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.15s forwards;
  }

  .jg-avatar-wrap {
    position: relative;
    width: 132px;
    height: 132px;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.6s ease 0.1s forwards, avatarFloat 6s ease-in-out 0.7s infinite;
    opacity: 0;
  }

  .jg-avatar-glow {
    position: absolute;
    inset: -16px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(203,255,62,0.4), transparent 70%);
    filter: blur(12px);
    z-index: 0;
  }

  .jg-avatar {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--acid);
    box-shadow: 0 16px 34px rgba(13,17,48,0.16);
    z-index: 1;
    background: #fff;
  }

  .jg-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 18%;
    display: block;
  }

  @keyframes avatarFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .jg-highlight {
    position: relative;
    white-space: nowrap;
  }

  .jg-highlight::after {
    content: '';
    position: absolute;
    left: -2%;
    right: -2%;
    bottom: 0.05em;
    height: 0.34em;
    background: var(--acid);
    z-index: -1;
    opacity: 0.55;
    transform-origin: left;
    animation: highlightSweep 1.4s ease 0.5s both;
  }

  @keyframes highlightSweep {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  .jg-subline {
    margin-top: 1.3rem;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    color: var(--ink-soft);
    max-width: 620px;
    line-height: 1.65;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.25s forwards;
  }

  .jg-subline strong {
    color: var(--ink);
    font-weight: 600;
  }

  .jg-cta-row {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 1.1rem;
    flex-wrap: wrap;
    justify-content: center;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.35s forwards;
  }

  .jg-cta-doodle { width: 60px; opacity: 0.42; }

  .jg-cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    background: var(--acid);
    color: var(--ink);
    text-decoration: none;
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.55rem 0.55rem 0.55rem 1.65rem;
    border-radius: 999px;
    box-shadow: 0 10px 26px rgba(203,255,62,0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .jg-cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 34px rgba(203,255,62,0.45);
  }

  .jg-cta-primary .arrow-circle {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--ink);
    color: var(--acid);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    transition: transform 0.2s ease;
  }

  .jg-cta-primary:hover .arrow-circle {
    transform: translateY(2px);
  }

  .jg-cta-ghost {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-soft);
    border: 1.4px solid var(--line);
    padding: 0.68rem 1.25rem;
    border-radius: 999px;
    background: rgba(255,255,255,0.7);
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
  }

  .jg-cta-ghost:hover {
    border-color: var(--ink);
    color: var(--ink);
    background: #fff;
  }

  /* scroll cue */
  .jg-scroll-cue {
    margin-top: 2.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.45s forwards, bob 2.4s ease-in-out 1.2s infinite;
  }

  .jg-scroll-cue span {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }

  .jg-scroll-cue svg { stroke: var(--ink-faint); }

  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }

  /* tools / "brands" row */
  .jg-tools {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 2rem 2.75rem;
    border-top: 1px solid var(--line);
    display: flex;
    align-items: center;
    gap: 2.4rem;
    flex-wrap: wrap;
  }

  .jg-tools-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-faint);
    white-space: nowrap;
  }

  .jg-tools-list {
    display: flex;
    gap: 2.2rem;
    flex-wrap: wrap;
    flex: 1;
  }

  .jg-tool {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.15rem;
    letter-spacing: 0.02em;
    color: var(--ink-faint);
    text-transform: uppercase;
    transition: color 0.3s ease;
    cursor: default;
  }

  .jg-tool.is-active {
    color: var(--ink);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 720px) {
    .jg-doodle-top { display: none; }
    .jg-avatar-wrap { width: 100px; height: 100px; }
    .jg-tools { flex-direction: column; align-items: flex-start; gap: 1rem; }
    .jg-tools-list { gap: 1.4rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const AboutMe = () => {
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);

  const skills = [
    'Full-Stack Development',
    'Python Backend Dev',
    'Mobile App Development',
    'AI / ML Development',
    'UI / UX Design',
    'Blockchain Development',
  ];

  const tools = ['React', 'Python', 'React Native', 'TensorFlow', 'Solidity', 'Figma'];

  useEffect(() => {
    const t = setInterval(() => {
      setActiveSkillIndex((p) => (p + 1) % skills.length);
    }, 2600);
    return () => clearInterval(t);
  }, [skills.length]);

  return (
    <>
      <style>{styles}</style>
      <div id="home" className="jg-root">
        <div className="jg-dots-layer">
          <InteractiveDots dotColor="#0D1130" gridSpacing={32} animationSpeed={0.005} />
        </div>
        <div className="jg-bg-blob a" />
        <div className="jg-bg-blob b" />

        <div className="jg-hero">
          <svg className="jg-doodle jg-doodle-top" viewBox="0 0 70 40" fill="none">
            <path d="M2 30C10 6 26 2 34 14C40 24 52 6 66 8" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <div className="jg-eyebrow">
            <span className="live-dot" />
            build v2.6 — status: actively shipping
          </div>

          <div className="jg-avatar-wrap">
            <div className="jg-avatar-glow" />
            <div className="jg-avatar">
              <img src={profileImg1} alt="Jai Ganesh H" />
            </div>
          </div>

          <h1 className="jg-headline">
            <span>Turning midnight ideas into things that</span>
            <span className="jg-highlight">actually ship</span>
            <span>— across web, mobile &amp; machine learning.</span>
          </h1>

          <p className="jg-subline">
            I'm <strong>Jai Ganesh H</strong>, a CSE student who treats every bug like a plot
            twist and every deploy like opening night. Right now I'm deep in moble and AI development
            , still working out how to make the good ideas outrun the deadlines.
          </p>

          <div className="jg-cta-row">
            <svg className="jg-cta-doodle" viewBox="0 0 60 40" fill="none">
              <path d="M2 8C14 2 18 18 8 22C0 25 6 34 20 32C34 30 40 12 56 10" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <a className="jg-cta-primary" href={resumePdf} download="Resume.pdf">
              Grab My Resume
              <span className="arrow-circle">↓</span>
            </a>
            <a className="jg-cta-ghost" href="#work">
              See What I've Built
            </a>
          </div>

          <div className="jg-scroll-cue">
            <span>keep scrolling</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        <div className="jg-tools">
          <span className="jg-tools-label">Currently compiling with</span>
          <div className="jg-tools-list">
            {tools.map((tool, i) => (
              <span key={tool} className={`jg-tool${i === activeSkillIndex % tools.length ? ' is-active' : ''}`}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;