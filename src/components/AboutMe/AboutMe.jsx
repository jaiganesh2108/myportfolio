import { useState, useEffect } from 'react';
import profileImg1 from './assets/profile2.jpg';
import resumePdf from './assets/Resume.pdf';
import InteractiveDots from './InteractiveDots';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Share+Tech+Mono&family=Barlow:wght@400;500;600&family=Fraunces:ital,wght@0,600;1,600&display=swap');

  :root {
    --acid: #CBFF3E;
    --acid-dim: #AEDD1F;
    --acid-deep: #7BA80E;
    --violet: #C084FC;
    --violet-deep: #8B4FD6;
    --coral: #FF8A65;
    --coral-deep: #E05B33;
    --ink: #0D1130;
    --ink-soft: rgba(13,17,48,0.68);
    --ink-faint: rgba(13,17,48,0.5);
    --bg: #FBFAF6;
    --line: rgba(13,17,48,0.1);
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

  .jg-grain {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.05;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* giant ghost type behind the hero — the thing that makes it feel
     art-directed instead of a stock "centered hero" template */
  .jg-watermark {
    position: absolute;
    top: 6%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(5.5rem, 16vw, 13rem);
    letter-spacing: -0.02em;
    white-space: nowrap;
    color: var(--ink);
    opacity: 0.035;
    user-select: none;
    pointer-events: none;
  }

  .jg-hero-grid {
    position: relative;
    z-index: 1;
    max-width: 1160px;
    margin: 0 auto;
    padding: 4.25rem 2rem 2.5rem;
    display: grid;
    grid-template-columns: 1.12fr 0.88fr;
    gap: 2.5rem;
    align-items: center;
  }

  .jg-hero-grid * { position: relative; }

  .jg-hero-left { text-align: left; }

  .jg-doodle {
    position: absolute;
    stroke: var(--ink);
    opacity: 0.4;
    z-index: 1;
  }
  .jg-doodle-top { top: -1.6rem; left: 2px; width: 62px; }

  .jg-eyebrow {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-soft);
    font-weight: 600;
    margin-bottom: 1.6rem;
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
    background: var(--acid-deep);
    box-shadow: 0 0 0 3px rgba(203,255,62,0.25);
    animation: pulseDot 1.8s ease-in-out infinite;
  }

  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }

  .jg-highlight {
    position: relative;
    white-space: nowrap;
    font-style: italic;
    font-family: 'Fraunces', serif;
    font-weight: 600;
    color: var(--ink);
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
    opacity: 0.65;
    transform-origin: left;
    animation: highlightSweep 1.4s ease 0.5s both;
  }

  @keyframes highlightSweep {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  .jg-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(2.4rem, 4.6vw, 4rem);
    line-height: 1.08;
    letter-spacing: -0.01em;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.3em 0.28em;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.15s forwards;
  }

  /* individually-colored keywords instead of one flat block of text */
  .jg-word {
    padding-bottom: 0.04em;
    border-bottom: 4px solid transparent;
  }
  .jg-word.is-acid { border-color: var(--acid-deep); }
  .jg-word.is-violet { border-color: var(--violet-deep); }
  .jg-word.is-coral { border-color: var(--coral-deep); }

  .jg-role {
    margin-top: 1.2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(0.8rem, 1vw, 0.92rem);
    letter-spacing: 0.02em;
    color: var(--ink-soft);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background: rgba(13,17,48,0.04);
    border: 1px solid var(--line);
    opacity: 0;
    animation: fadeUp 0.6s ease 0.2s forwards;
  }

  .jg-role .prompt { color: var(--violet-deep); font-weight: 600; }

  .jg-role-text {
    position: relative;
    display: inline-block;
    min-width: 13ch;
    text-align: left;
    color: var(--ink);
    font-weight: 600;
  }

  .jg-role-text span {
    display: inline-block;
    animation: roleSwap 0.45s ease both;
  }

  @keyframes roleSwap {
    from { opacity: 0; transform: translateY(6px); filter: blur(2px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  .jg-cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: var(--acid-deep);
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .jg-subline {
    margin-top: 1.3rem;
    font-size: clamp(1rem, 1.3vw, 1.15rem);
    color: var(--ink-soft);
    max-width: 560px;
    line-height: 1.65;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.28s forwards;
  }

  .jg-subline strong {
    font-family: 'Fraunces', serif;
    font-style: italic;
    color: var(--violet-deep);
    font-weight: 600;
  }

  .jg-cta-row {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 1.1rem;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.38s forwards;
  }

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

  .jg-cta-primary:hover,
  .jg-cta-primary:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 16px 34px rgba(203,255,62,0.45);
  }

  .jg-cta-primary:focus-visible,
  .jg-cta-ghost:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 3px;
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
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease;
  }

  .jg-cta-ghost:hover {
    border-color: var(--ink);
    color: var(--ink);
    background: #fff;
    transform: translateY(-2px);
  }

  /* ── photo stage: a static, tilted "polaroid" instead of a floating
     circular avatar. no auto-playing motion lives here. ── */
  .jg-hero-right {
    display: flex;
    justify-content: center;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.22s forwards;
  }

  .jg-photo-stage {
    position: relative;
    width: 100%;
    max-width: 300px;
  }

  .jg-photo-card {
    position: relative;
    background: #fff;
    padding: 12px 12px 46px;
    border-radius: 14px;
    border: 2px solid var(--ink);
    box-shadow: 10px 12px 0 var(--acid), 10px 12px 0 1px var(--ink);
    transform: rotate(-3.5deg);
    transition: transform 0.35s ease, box-shadow 0.35s ease;
  }

  .jg-photo-card:hover {
    transform: rotate(0deg) translateY(-2px);
    box-shadow: 6px 8px 0 var(--acid), 6px 8px 0 1px var(--ink);
  }

  .jg-photo-frame {
    width: 100%;
    aspect-ratio: 1 / 1.05;
    border-radius: 6px;
    overflow: hidden;
    background: var(--bg);
  }

  .jg-photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 18%;
    display: block;
  }

  .jg-photo-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 12px;
    text-align: center;
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-weight: 600;
    font-size: 0.92rem;
    color: var(--ink-soft);
  }

  .jg-sticker {
    position: absolute;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 600;
    padding: 0.5rem 0.85rem;
    border-radius: 999px;
    border: 1.5px solid var(--ink);
    background: #fff;
    box-shadow: 4px 4px 0 var(--ink);
    white-space: nowrap;
    z-index: 2;
  }

  .jg-sticker-1 {
    top: -14px;
    left: -34px;
    background: var(--acid);
    transform: rotate(-7deg);
  }

  .jg-sticker-2 {
    bottom: 18px;
    right: -30px;
    background: var(--bg);
    color: var(--violet-deep);
    transform: rotate(5deg);
  }

  .jg-stamp {
    position: absolute;
    top: -22px;
    right: -18px;
    width: 74px;
    height: 74px;
    border-radius: 50%;
    background: var(--ink);
    color: var(--acid);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.56rem;
    letter-spacing: 0.06em;
    line-height: 1.25;
    text-transform: uppercase;
    padding: 0.4rem;
    transform: rotate(9deg);
    border: 3px solid var(--bg);
    box-shadow: 0 8px 18px rgba(13,17,48,0.25);
    z-index: 2;
  }

  .jg-scroll-cue {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding-bottom: 1.6rem;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.46s forwards, bob 2.4s ease-in-out 1.2s infinite;
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

  /* ── ticker marquee replaces the old static tag row — motion lives
     here instead of on the photo ── */
  .jg-marquee {
    position: relative;
    z-index: 1;
    border-top: 1px solid var(--line);
    padding: 1.3rem 0;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  }

  .jg-marquee-track {
    display: inline-flex;
    width: max-content;
    animation: marqueeScroll 24s linear infinite;
  }

  .jg-marquee:hover .jg-marquee-track {
    animation-play-state: paused;
  }

  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .jg-marquee-item {
    display: inline-flex;
    align-items: center;
    gap: 1.4rem;
    padding: 0 1.4rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: clamp(1.3rem, 2.6vw, 2rem);
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: var(--ink-faint);
    white-space: nowrap;
  }

  .jg-marquee-item:nth-child(3n+1) { color: var(--ink); }
  .jg-marquee-item:nth-child(3n+2) { color: var(--violet-deep); }
  .jg-marquee-item:nth-child(3n+3) { color: var(--acid-deep); }

  .jg-marquee-dot { font-size: 0.85rem; color: var(--ink-faint); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 860px) {
    .jg-hero-grid { grid-template-columns: 1fr; padding-top: 3rem; }
    .jg-hero-left { text-align: center; align-items: center; }
    .jg-headline { justify-content: center; }
    .jg-subline { margin-left: auto; margin-right: auto; }
    .jg-cta-row { justify-content: center; }
    .jg-doodle-top { display: none; }
    .jg-photo-stage { max-width: 240px; margin-top: 1rem; }
    .jg-watermark { top: 3%; }
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
  const tickerItems = [...tools, ...tools];

  useEffect(() => {
    const t = setInterval(() => {
      setActiveSkillIndex((p) => (p + 1) % skills.length);
    }, 2400);
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
        <div className="jg-grain" />
        <div className="jg-watermark" aria-hidden="true">JAI GANESH</div>

        <div className="jg-hero-grid">
          <div className="jg-hero-left">
            <svg className="jg-doodle jg-doodle-top" viewBox="0 0 70 40" fill="none">
              <path d="M2 30C10 6 26 2 34 14C40 24 52 6 66 8" strokeWidth="2" strokeLinecap="round" />
            </svg>

            <div className="jg-eyebrow">
              <span className="live-dot" />
              build v2.6 — status: actively shipping
            </div>

            <h1 className="jg-headline">
              <span>Turning midnight ideas into things that</span>
              <span className="jg-highlight">actually ship</span>
              <span>— across</span>
              <span className="jg-word is-acid">web</span>
              <span>,</span>
              <span className="jg-word is-violet">mobile</span>
              <span>&amp;</span>
              <span className="jg-word is-coral">machine learning</span>
              <span>.</span>
            </h1>

            <div className="jg-role">
              <span className="prompt">currently.exploring →</span>
              <span className="jg-role-text">
                <span key={activeSkillIndex}>{skills[activeSkillIndex]}</span>
              </span>
              <span className="jg-cursor" />
            </div>

            <p className="jg-subline">
              I'm <strong>Jai Ganesh H</strong>, a CSE student who treats every bug like a plot
              twist and every deploy like opening night. Right now I'm deep in mobile and AI
              development, still working out how to make the good ideas outrun the deadlines.
            </p>

            <div className="jg-cta-row">
              <a className="jg-cta-primary" href={resumePdf} download="Resume.pdf">
                Grab My Resume
                <span className="arrow-circle">↓</span>
              </a>
              <a className="jg-cta-ghost" href="#work">
                See What I've Built
              </a>
            </div>
          </div>

          <div className="jg-hero-right">
            <div className="jg-photo-stage">
              <div className="jg-stamp">EST. 2022 · CSE</div>
              <div className="jg-sticker jg-sticker-1">✦ open to work</div>

              <div className="jg-photo-card">
                <div className="jg-photo-frame">
                  <img src={profileImg1} alt="Jai Ganesh H" />
                </div>
                <div className="jg-photo-caption">Jai Ganesh H</div>
              </div>

              <div className="jg-sticker jg-sticker-2">📍 Chennai, IN</div>
            </div>
          </div>
        </div>

        <div className="jg-scroll-cue">
          <span>keep scrolling</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        <div className="jg-marquee">
          <div className="jg-marquee-track">
            {tickerItems.map((tool, i) => (
              <span className="jg-marquee-item" key={`${tool}-${i}`}>
                {tool}
                <span className="jg-marquee-dot">✺</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;