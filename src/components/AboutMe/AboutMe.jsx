import { useState, useEffect, useRef } from 'react';
import profileImg1 from './assets/profile2.jpg';
import resumePdf from './assets/Resume.pdf';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Share+Tech+Mono&family=Barlow:wght@400;500&display=swap');

  :root {
    --acid: #CCFF00;
    --acid-dim: #AADD00;
    --acid-glow: rgba(204,255,0,0.45);
    --black: #0A0A0A;
    --dark: #111111;
    --panel: #161616;
    --border: #2A2A2A;
    --muted: #888888;
    --white: #F5F5F5;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ═══════════════════════════════════════════════
     INTRO / WELCOME SCREEN
     ═══════════════════════════════════════════════ */
  .ra-intro {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: var(--black);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.55s ease, transform 0.55s ease;
  }

  .ra-intro.leaving {
    opacity: 0;
    transform: scale(1.02);
    pointer-events: none;
  }

  .ra-intro-eyebrow {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--acid);
    opacity: 0.8;
    margin-bottom: 1.25rem;
    animation: introFadeUp 0.6s ease both;
  }

  .ra-intro-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    font-size: clamp(2.2rem, 6vw, 4.2rem);
    color: var(--white);
    letter-spacing: -0.01em;
    text-align: center;
    line-height: 1.05;
    animation: introFadeUp 0.6s ease 0.15s both;
  }

  .ra-intro-title span {
    color: var(--acid);
  }

  .ra-intro-sub {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    color: var(--muted);
    margin-top: 1.5rem;
    text-transform: uppercase;
    animation: introFadeUp 0.6s ease 0.3s both;
  }

  .ra-intro-bar {
    width: 220px;
    height: 2px;
    background: var(--border);
    margin-top: 2.25rem;
    overflow: hidden;
    animation: introFadeUp 0.6s ease 0.3s both;
  }

  .ra-intro-bar-fill {
    height: 100%;
    background: var(--acid);
    width: 0%;
    animation: introLoad 1.9s ease forwards 0.2s;
  }

  @keyframes introFadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes introLoad {
    from { width: 0%; }
    to { width: 100%; }
  }

  /* ═══════════════════════════════════════════════
     PAGE ROOT
     ═══════════════════════════════════════════════ */
  .ra-root {
    min-height: 100vh;
    background:
      radial-gradient(circle at 18% 20%, rgba(204,255,0,0.09), transparent 32%),
      radial-gradient(circle at 82% 14%, rgba(204,255,0,0.05), transparent 26%),
      linear-gradient(135deg, #070707 0%, #0a0a0a 45%, #050505 100%);
    color: var(--white);
    font-family: 'Barlow', sans-serif;
    display: flex;
    overflow: hidden;
    position: relative;
    opacity: 0;
    animation: pageIn 0.7s ease forwards;
  }

  .ra-root.delayed { animation-delay: 0.05s; }

  @keyframes pageIn {
    from { opacity: 0; }
    to { opacity: 1; }
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
    inset: auto -10% -18% auto;
    width: 380px;
    height: 380px;
    background: radial-gradient(circle, rgba(0,0,0,0.12), transparent 66%);
    pointer-events: none;
    z-index: 0;
  }

  /* static faint grid texture, no motion */
  .ra-grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px);
    background-size: 36px 36px;
    pointer-events: none;
    z-index: 0;
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
    position: relative;
    z-index: 1;
    width: fit-content;
  }

  .ra-hero-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0;
    position: relative;
    z-index: 1;
  }

  .ra-greeting {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    color: rgba(0,0,0,0.55);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .ra-greeting .blip {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--black);
    opacity: 0.7;
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
    position: relative;
    min-height: 1em;
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
    color: rgba(0,0,0,0.62);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    line-height: 1.4;
    max-width: 320px;
    margin-bottom: 2rem;
  }

  .ra-identity-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    max-width: 420px;
  }

  .ra-stat-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .ra-stat {
    background: rgba(10,10,10,0.08);
    border: 1px solid rgba(10,10,10,0.12);
    padding: 0.85rem 0.9rem;
    backdrop-filter: blur(4px);
  }

  .ra-stat-value {
    display: block;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.4rem;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--black);
    margin-bottom: 0.35rem;
  }

  .ra-stat-label {
    display: block;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.56rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.54);
    line-height: 1.5;
  }

  .ra-about-card {
    background: rgba(10,10,10,0.1);
    border: 1px solid rgba(10,10,10,0.12);
    padding: 1rem 1.05rem;
    box-shadow: 0 16px 30px rgba(0,0,0,0.08);
  }

  .ra-about-head {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: rgba(0,0,0,0.6);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    margin-bottom: 0.55rem;
  }

  .ra-about-copy {
    font-family: 'Barlow', sans-serif;
    font-size: 0.92rem;
    line-height: 1.7;
    color: rgba(0,0,0,0.7);
    max-width: 34rem;
  }

  .ra-tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.85rem;
  }

  .ra-tag {
    display: inline-flex;
    align-items: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.72);
    border: 1px solid rgba(0,0,0,0.16);
    padding: 0.3rem 0.55rem;
    background: rgba(255,255,255,0.12);
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
    width: fit-content;
    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  }

  .ra-skill-pill .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--acid);
    flex-shrink: 0;
  }

  .ra-skill-text {
    display: inline-block;
    animation: skillIn 0.35s ease both;
  }

  @keyframes skillIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .ra-cta-row {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .ra-resume-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    background: transparent;
    color: var(--black);
    border: 1.6px solid var(--black);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    padding: 0.55rem 1rem;
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  }

  .ra-resume-btn:hover {
    background: var(--black);
    color: var(--acid);
    transform: translateY(-2px);
    box-shadow: 0 6px 22px rgba(0,0,0,0.35);
  }

  .ra-resume-btn .arrow {
    font-size: 0.85rem;
    line-height: 1;
  }

  .ra-bottom-left {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    z-index: 1;
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
    gap: 1.25rem;
  }

  /* static dot-grid backdrop, no motion */
  .ra-right::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(204,255,0,0.07) 1px, transparent 1px);
    background-size: 26px 26px;
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }

  .ra-right::after {
    content: '';
    position: absolute;
    top: -10%;
    right: -10%;
    width: 480px;
    height: 480px;
    background: radial-gradient(circle, rgba(204,255,0,0.08), transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .ra-section-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    color: var(--acid);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 3rem;
    opacity: 0.9;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .ra-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(204,255,0,0.35), transparent);
  }

  /* Profile image area */
  .ra-profile-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 0.5rem 0 1.5rem;
    position: relative;
    z-index: 1;
    flex-wrap: wrap;
  }

  .ra-img-frame {
    position: relative;
    width: 260px;
    height: 260px;
    flex-shrink: 0;
    box-shadow: 0 24px 50px rgba(0,0,0,0.28);
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

  .ra-img-inner::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0.08), transparent 22%, transparent 78%, rgba(0,0,0,0.08));
    pointer-events: none;
  }

  .ra-img-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    object-position: center 18%;
    filter: grayscale(8%) contrast(1.08) saturate(0.95);
    transition: filter 0.4s ease, transform 0.4s ease;
  }

  .ra-img-frame:hover .ra-img-inner img {
    filter: grayscale(0%) contrast(1.12) saturate(1.02);
    transform: scale(1.02);
  }

  .ra-profile-copy {
    width: min(280px, 100%);
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(204,255,0,0.14);
    padding: 1rem 1.05rem;
    box-shadow: 0 18px 30px rgba(0,0,0,0.18);
  }

  .ra-profile-kicker {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    color: var(--acid);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }

  .ra-profile-copy p {
    font-family: 'Barlow', sans-serif;
    font-size: 0.88rem;
    line-height: 1.7;
    color: rgba(240,240,240,0.74);
  }

  .ra-profile-list {
    margin-top: 0.9rem;
    display: grid;
    gap: 0.45rem;
  }

  .ra-profile-list span {
    display: block;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: rgba(240,240,240,0.6);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding-left: 0.8rem;
    position: relative;
  }

  .ra-profile-list span::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--acid);
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
    box-shadow: 0 4px 14px rgba(204,255,0,0.2);
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

  /* ─── PIXEL MASCOTS (static, gentle hover only) ─── */
  .ra-mascot-wrap {
    position: absolute;
    top: 5.5rem;
    right: 1.8rem;
    width: 190px;
    height: 190px;
    z-index: 5;
    cursor: default;
    transition: transform 0.25s ease, filter 0.25s ease;
    filter: drop-shadow(0 6px 16px rgba(204,255,0,0.14));
  }

  .ra-mascot-wrap:hover {
    transform: translateY(-4px);
    filter: drop-shadow(0 8px 22px rgba(204,255,0,0.3));
  }

  .ra-mascot-bubble {
    position: absolute;
    bottom: -6px;
    left: -10px;
    background: var(--panel);
    border: 1px solid var(--border);
    color: var(--acid);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.05em;
    padding: 0.18rem 0.4rem;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    pointer-events: none;
  }

  .ra-mascot-wrap:hover .ra-mascot-bubble {
    opacity: 1;
    transform: translateY(0);
  }

  .ra-mascot-wrap-2 {
    position: absolute;
    left: -2px;
    bottom: 18px;
    width: 145px;
    height: 145px;
    z-index: 5;
    cursor: default;
    transition: transform 0.25s ease, filter 0.25s ease;
    filter: drop-shadow(0 6px 14px rgba(192,132,252,0.18));
  }

  .ra-mascot-wrap-2:hover {
    transform: translateY(4px);
    filter: drop-shadow(0 8px 20px rgba(192,132,252,0.35));
  }

  .ra-mascot-wrap-2 .ra-mascot-bubble {
    left: auto;
    right: -8px;
    bottom: auto;
    top: -4px;
  }

  @media (max-width: 900px) {
    .ra-mascot-wrap-2 { width: 105px; height: 105px; left: 4px; bottom: 4px; }
  }

  /* Skills terminal block */
  .ra-terminal {
    background: var(--panel);
    border: 1px solid var(--border);
    padding: 1rem 1.25rem;
    position: relative;
    z-index: 1;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }

  .ra-terminal::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--acid), transparent);
    opacity: 0.4;
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

  .ra-terminal-title .blink-caret {
    animation: blink 1s step-end infinite;
  }

  .ra-terminal-note {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(136,136,136,0.8);
    margin-bottom: 0.6rem;
  }

  .ra-code {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    line-height: 1.7;
  }

  .ra-code .kw { color: var(--acid); }
  .ra-code .var { color: #60a5fa; }
  .ra-code .str { color: #c084fc; }
  .ra-code .skill-row {
    display: flex;
    padding-left: 1.2rem;
    transition: color 0.3s ease, transform 0.3s ease;
    position: relative;
  }
  .ra-code .skill-row.active {
    color: #22d3ee;
    transform: translateX(5px);
  }
  .ra-code .skill-row.active::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--acid);
  }
  .ra-code .skill-row:not(.active) { color: rgba(136,136,136,0.7); }
  .ra-code .skill-key { color: #c084fc; }
  .ra-code .skill-fire {
    color: var(--acid);
  }

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
    z-index: 1;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* Responsive */
  @media (max-width: 900px) {
    .ra-root { flex-direction: column; }
    .ra-left { width: 100%; min-height: auto; padding: 2rem; }
    .ra-right { padding: 2rem; min-height: auto; }
    .ra-name { font-size: clamp(3rem, 12vw, 5rem); }
    .ra-img-frame { width: 200px; height: 200px; }
    .ra-mascot-wrap { width: 130px; height: 130px; top: 3.5rem; right: 0.75rem; }
    .ra-stat-grid { grid-template-columns: 1fr; }
    .ra-profile-copy { width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// Pixel mascot recolored to fit the acid-green / black theme.
const PixelMascot = () => (
  <div className="ra-mascot-wrap">
    <svg viewBox="0 0 240 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <g fill="#CCFF00">
        <rect x="22" y="50" width="9" height="9"/>
        <rect x="13" y="59" width="9" height="9"/>
        <rect x="31" y="59" width="9" height="9"/>
        <rect x="22" y="68" width="9" height="9"/>
      </g>
      <g fill="#22d3ee">
        <rect x="195" y="35" width="7" height="7"/>
        <rect x="188" y="42" width="7" height="7"/>
        <rect x="202" y="42" width="7" height="7"/>
        <rect x="195" y="49" width="7" height="7"/>
      </g>

      <g fill="#0A0A0A">
        <rect x="80" y="40" width="10" height="10"/>
        <rect x="130" y="40" width="10" height="10"/>
        <rect x="70" y="130" width="10" height="10"/>
        <rect x="140" y="130" width="10" height="10"/>
      </g>

      <g fill="#1B1B1B">
        <rect x="90" y="40" width="10" height="10"/>
        <rect x="100" y="40" width="10" height="10"/>
        <rect x="110" y="40" width="10" height="10"/>
        <rect x="120" y="40" width="10" height="10"/>
        <rect x="70" y="50" width="10" height="10"/>
        <rect x="80" y="50" width="10" height="10"/>
        <rect x="90" y="50" width="10" height="10"/>
        <rect x="100" y="50" width="10" height="10"/>
        <rect x="110" y="50" width="10" height="10"/>
        <rect x="120" y="50" width="10" height="10"/>
        <rect x="130" y="50" width="10" height="10"/>
        <rect x="140" y="50" width="10" height="10"/>
        <rect x="70" y="60" width="10" height="10"/>
        <rect x="140" y="60" width="10" height="10"/>
        <rect x="60" y="70" width="10" height="10"/>
        <rect x="70" y="70" width="10" height="10"/>
        <rect x="140" y="70" width="10" height="10"/>
        <rect x="150" y="70" width="10" height="10"/>
        <rect x="60" y="80" width="10" height="10"/>
        <rect x="150" y="80" width="10" height="10"/>
        <rect x="60" y="90" width="10" height="10"/>
        <rect x="150" y="90" width="10" height="10"/>
        <rect x="60" y="100" width="10" height="10"/>
        <rect x="150" y="100" width="10" height="10"/>
        <rect x="70" y="110" width="10" height="10"/>
        <rect x="140" y="110" width="10" height="10"/>
        <rect x="70" y="120" width="10" height="10"/>
        <rect x="80" y="120" width="10" height="10"/>
        <rect x="130" y="120" width="10" height="10"/>
        <rect x="140" y="120" width="10" height="10"/>
        <rect x="80" y="130" width="10" height="10"/>
        <rect x="90" y="130" width="10" height="10"/>
        <rect x="100" y="130" width="10" height="10"/>
        <rect x="110" y="130" width="10" height="10"/>
        <rect x="120" y="130" width="10" height="10"/>
        <rect x="130" y="130" width="10" height="10"/>
      </g>

      <g fill="none" stroke="#CCFF00" strokeOpacity="0.35" strokeWidth="2">
        <rect x="60" y="70" width="100" height="60"/>
      </g>

      <g fill="#0E0E0E">
        <rect x="80" y="60" width="10" height="10"/>
        <rect x="90" y="60" width="10" height="10"/>
        <rect x="100" y="60" width="10" height="10"/>
        <rect x="110" y="60" width="10" height="10"/>
        <rect x="120" y="60" width="10" height="10"/>
        <rect x="130" y="60" width="10" height="10"/>
        <rect x="80" y="70" width="10" height="10"/>
        <rect x="90" y="70" width="10" height="10"/>
        <rect x="100" y="70" width="10" height="10"/>
        <rect x="110" y="70" width="10" height="10"/>
        <rect x="120" y="70" width="10" height="10"/>
        <rect x="130" y="70" width="10" height="10"/>
        <rect x="80" y="80" width="10" height="10"/>
        <rect x="90" y="80" width="10" height="10"/>
        <rect x="100" y="80" width="10" height="10"/>
        <rect x="110" y="80" width="10" height="10"/>
        <rect x="120" y="80" width="10" height="10"/>
        <rect x="130" y="80" width="10" height="10"/>
        <rect x="80" y="90" width="10" height="10"/>
        <rect x="90" y="90" width="10" height="10"/>
        <rect x="100" y="90" width="10" height="10"/>
        <rect x="110" y="90" width="10" height="10"/>
        <rect x="120" y="90" width="10" height="10"/>
        <rect x="130" y="90" width="10" height="10"/>
        <rect x="80" y="100" width="10" height="10"/>
        <rect x="90" y="100" width="10" height="10"/>
        <rect x="100" y="100" width="10" height="10"/>
        <rect x="110" y="100" width="10" height="10"/>
        <rect x="120" y="100" width="10" height="10"/>
        <rect x="130" y="100" width="10" height="10"/>
        <rect x="80" y="110" width="10" height="10"/>
        <rect x="90" y="110" width="10" height="10"/>
        <rect x="100" y="110" width="10" height="10"/>
        <rect x="110" y="110" width="10" height="10"/>
        <rect x="120" y="110" width="10" height="10"/>
        <rect x="130" y="110" width="10" height="10"/>
      </g>

      <g fill="#CCFF00">
        <rect x="95" y="80" width="11" height="14"/>
        <rect x="115" y="80" width="11" height="14"/>
      </g>
      <g fill="#0A0A0A">
        <rect x="97" y="82" width="4" height="4"/>
        <rect x="117" y="82" width="4" height="4"/>
        <rect x="101" y="89" width="3" height="3"/>
        <rect x="121" y="89" width="3" height="3"/>
      </g>

      <g fill="#CCFF00">
        <rect x="102" y="103" width="6" height="4"/>
        <rect x="108" y="106" width="6" height="4"/>
        <rect x="114" y="103" width="6" height="4"/>
      </g>

      <g fill="#CCFF00">
        <rect x="88" y="28" width="10" height="9"/>
        <rect x="112" y="28" width="10" height="9"/>
        <rect x="100" y="30" width="10" height="10"/>
      </g>
      <g fill="#0A0A0A">
        <rect x="103" y="33" width="4" height="4"/>
      </g>
      <g fill="#0A0A0A" opacity="0.5">
        <rect x="91" y="30" width="3" height="3"/>
        <rect x="115" y="30" width="3" height="3"/>
      </g>

      <g fill="#1B1B1B">
        <rect x="85" y="140" width="10" height="8"/>
        <rect x="125" y="140" width="10" height="8"/>
      </g>
    </svg>
    <span className="ra-mascot-bubble">hey, I'm here too ✦</span>
  </div>
);

// Second mascot — purple/cyan accent variant.
const PixelMascotTwo = () => (
  <div className="ra-mascot-wrap-2">
    <svg viewBox="0 0 240 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <g fill="#c084fc">
        <rect x="22" y="50" width="9" height="9"/>
        <rect x="13" y="59" width="9" height="9"/>
        <rect x="31" y="59" width="9" height="9"/>
        <rect x="22" y="68" width="9" height="9"/>
      </g>
      <g fill="#CCFF00">
        <rect x="195" y="35" width="7" height="7"/>
        <rect x="188" y="42" width="7" height="7"/>
        <rect x="202" y="42" width="7" height="7"/>
        <rect x="195" y="49" width="7" height="7"/>
      </g>

      <g fill="#0A0A0A">
        <rect x="80" y="40" width="10" height="10"/>
        <rect x="130" y="40" width="10" height="10"/>
        <rect x="70" y="130" width="10" height="10"/>
        <rect x="140" y="130" width="10" height="10"/>
      </g>

      <g fill="#1B1B1B">
        <rect x="90" y="40" width="10" height="10"/>
        <rect x="100" y="40" width="10" height="10"/>
        <rect x="110" y="40" width="10" height="10"/>
        <rect x="120" y="40" width="10" height="10"/>
        <rect x="70" y="50" width="10" height="10"/>
        <rect x="80" y="50" width="10" height="10"/>
        <rect x="90" y="50" width="10" height="10"/>
        <rect x="100" y="50" width="10" height="10"/>
        <rect x="110" y="50" width="10" height="10"/>
        <rect x="120" y="50" width="10" height="10"/>
        <rect x="130" y="50" width="10" height="10"/>
        <rect x="140" y="50" width="10" height="10"/>
        <rect x="70" y="60" width="10" height="10"/>
        <rect x="140" y="60" width="10" height="10"/>
        <rect x="60" y="70" width="10" height="10"/>
        <rect x="70" y="70" width="10" height="10"/>
        <rect x="140" y="70" width="10" height="10"/>
        <rect x="150" y="70" width="10" height="10"/>
        <rect x="60" y="80" width="10" height="10"/>
        <rect x="150" y="80" width="10" height="10"/>
        <rect x="60" y="90" width="10" height="10"/>
        <rect x="150" y="90" width="10" height="10"/>
        <rect x="60" y="100" width="10" height="10"/>
        <rect x="150" y="100" width="10" height="10"/>
        <rect x="70" y="110" width="10" height="10"/>
        <rect x="140" y="110" width="10" height="10"/>
        <rect x="70" y="120" width="10" height="10"/>
        <rect x="80" y="120" width="10" height="10"/>
        <rect x="130" y="120" width="10" height="10"/>
        <rect x="140" y="120" width="10" height="10"/>
        <rect x="80" y="130" width="10" height="10"/>
        <rect x="90" y="130" width="10" height="10"/>
        <rect x="100" y="130" width="10" height="10"/>
        <rect x="110" y="130" width="10" height="10"/>
        <rect x="120" y="130" width="10" height="10"/>
        <rect x="130" y="130" width="10" height="10"/>
      </g>

      <g fill="none" stroke="#c084fc" strokeOpacity="0.4" strokeWidth="2">
        <rect x="60" y="70" width="100" height="60"/>
      </g>

      <g fill="#0E0E0E">
        <rect x="80" y="60" width="10" height="10"/>
        <rect x="90" y="60" width="10" height="10"/>
        <rect x="100" y="60" width="10" height="10"/>
        <rect x="110" y="60" width="10" height="10"/>
        <rect x="120" y="60" width="10" height="10"/>
        <rect x="130" y="60" width="10" height="10"/>
        <rect x="80" y="70" width="10" height="10"/>
        <rect x="90" y="70" width="10" height="10"/>
        <rect x="100" y="70" width="10" height="10"/>
        <rect x="110" y="70" width="10" height="10"/>
        <rect x="120" y="70" width="10" height="10"/>
        <rect x="130" y="70" width="10" height="10"/>
        <rect x="80" y="80" width="10" height="10"/>
        <rect x="90" y="80" width="10" height="10"/>
        <rect x="100" y="80" width="10" height="10"/>
        <rect x="110" y="80" width="10" height="10"/>
        <rect x="120" y="80" width="10" height="10"/>
        <rect x="130" y="80" width="10" height="10"/>
        <rect x="80" y="90" width="10" height="10"/>
        <rect x="90" y="90" width="10" height="10"/>
        <rect x="100" y="90" width="10" height="10"/>
        <rect x="110" y="90" width="10" height="10"/>
        <rect x="120" y="90" width="10" height="10"/>
        <rect x="130" y="90" width="10" height="10"/>
        <rect x="80" y="100" width="10" height="10"/>
        <rect x="90" y="100" width="10" height="10"/>
        <rect x="100" y="100" width="10" height="10"/>
        <rect x="110" y="100" width="10" height="10"/>
        <rect x="120" y="100" width="10" height="10"/>
        <rect x="130" y="100" width="10" height="10"/>
        <rect x="80" y="110" width="10" height="10"/>
        <rect x="90" y="110" width="10" height="10"/>
        <rect x="100" y="110" width="10" height="10"/>
        <rect x="110" y="110" width="10" height="10"/>
        <rect x="120" y="110" width="10" height="10"/>
        <rect x="130" y="110" width="10" height="10"/>
      </g>

      <g fill="#c084fc">
        <rect x="95" y="80" width="11" height="14"/>
        <rect x="115" y="80" width="11" height="14"/>
      </g>
      <g fill="#0A0A0A">
        <rect x="97" y="82" width="4" height="4"/>
        <rect x="117" y="82" width="4" height="4"/>
        <rect x="101" y="89" width="3" height="3"/>
        <rect x="121" y="89" width="3" height="3"/>
      </g>

      <g fill="#22d3ee">
        <rect x="102" y="103" width="6" height="4"/>
        <rect x="108" y="106" width="6" height="4"/>
        <rect x="114" y="103" width="6" height="4"/>
      </g>

      <g fill="#c084fc">
        <rect x="88" y="28" width="10" height="9"/>
        <rect x="112" y="28" width="10" height="9"/>
        <rect x="100" y="30" width="10" height="10"/>
      </g>
      <g fill="#0A0A0A">
        <rect x="103" y="33" width="4" height="4"/>
      </g>
      <g fill="#0A0A0A" opacity="0.5">
        <rect x="91" y="30" width="3" height="3"/>
        <rect x="115" y="30" width="3" height="3"/>
      </g>

      <g fill="#1B1B1B">
        <rect x="85" y="140" width="10" height="8"/>
        <rect x="125" y="140" width="10" height="8"/>
      </g>
    </svg>
    <span className="ra-mascot-bubble">say hi ✧</span>
  </div>
);

// ─── Welcome / intro splash screen ───
const IntroScreen = ({ onDone }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const autoTimer = setTimeout(() => setLeaving(true), 2100);
    return () => clearTimeout(autoTimer);
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onDone, 500);
    return () => clearTimeout(t);
  }, [leaving, onDone]);

  return (
    <div
      className={`ra-intro${leaving ? ' leaving' : ''}`}
      onClick={() => setLeaving(true)}
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
    >
      <div className="ra-intro-eyebrow">// initializing</div>
      <h1 className="ra-intro-title">
        Welcome to <span>my portfolio</span>
      </h1>
      <div className="ra-intro-sub">click anywhere to continue</div>
      <div className="ra-intro-bar">
        <div className="ra-intro-bar-fill" />
      </div>
    </div>
  );
};

const AboutMe = () => {
  const [showIntro, setShowIntro] = useState(true);
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
    if (showIntro) return;
    let i = 0;
    const t = setInterval(() => {
      if (i <= fullName.length) {
        setTypedText(fullName.substring(0, i));
        i++;
      } else clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, [showIntro]);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveSkillIndex(p => (p + 1) % skills.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{styles}</style>

      {showIntro && <IntroScreen onDone={() => setShowIntro(false)} />}

      {!showIntro && (
        <div id="home" className="ra-root">

          {/* ─── LEFT PANEL ─── */}
          <div className="ra-left">
            <div className="ra-grid-overlay" />
            <div className="ra-logo">JG — Portfolio</div>

            <div className="ra-hero-text">
              <div className="ra-greeting"><span className="blip" />// 01 — Introduction</div>

              <h1 className="ra-name">
                {typedText}
                <span className="ra-cursor" />
              </h1>

              <p className="ra-tagline">
                Building tomorrow's<br />
                digital experiences<br />
                today.
              </p>

              <div className="ra-identity-stack">
                <div className="ra-stat-grid">
                  <div className="ra-stat">
                    <span className="ra-stat-value">04+</span>
                    <span className="ra-stat-label">Core disciplines</span>
                  </div>
                  <div className="ra-stat">
                    <span className="ra-stat-value">1</span>
                    <span className="ra-stat-label">Focused portfolio system</span>
                  </div>
                  <div className="ra-stat">
                    <span className="ra-stat-value">∞</span>
                    <span className="ra-stat-label">Curiosity & iteration</span>
                  </div>
                </div>

                <div className="ra-about-card">
                  <div className="ra-about-head">About me</div>
                  <p className="ra-about-copy">
                    I’m a CSE student who likes turning product ideas into clean,
                    responsive interfaces with strong visual rhythm, thoughtful UX,
                    and enough technical depth to make the experience feel solid.
                  </p>
                  <div className="ra-tag-cloud">
                    <span className="ra-tag">Frontend</span>
                    <span className="ra-tag">React</span>
                    <span className="ra-tag">Mobile</span>
                    <span className="ra-tag">AI / ML</span>
                    <span className="ra-tag">Blockchain</span>
                  </div>
                </div>
              </div>

              <div className="ra-skill-pill">
                <span className="dot" />
                <span key={activeSkillIndex} className="ra-skill-text">
                  {skills[activeSkillIndex]}
                </span>
              </div>

              <div className="ra-cta-row">
                <a
                  className="ra-resume-btn"
                  href={resumePdf}
                  download="Resume.pdf"
                >
                  Download Resume
                  <span className="arrow">↓</span>
                </a>
              </div>
            </div>

            <div className="ra-bottom-left">
              <p className="ra-desc">
                CSE student &amp; developer.<br />
                Fullstack · Mobile · Blockchain · AI/ML<br />
                Turning ideas into real solutions.
              </p>
              <div className="ra-watermark">JG.DEV</div>
            </div>
          </div>

          {/* ─── RIGHT PANEL ─── */}
          <div className="ra-right">
            <PixelMascot />

            <div className="ra-section-label">// 02 — Profile</div>

            <div className="ra-profile-area">
              <div className="ra-img-frame">
                <div className="ra-corner-tl" />
                <div className="ra-corner-br" />
                <div className="ra-img-border" />
                <div className="ra-img-inner">
                  <img src={profileImg1} alt="Jai Ganesh H" />
                </div>
                <div className="ra-img-tag">@jaiganesh_h</div>
              </div>

              <div className="ra-profile-copy">
                <div className="ra-profile-kicker">Creative developer profile</div>
                <p>
                  Designing fast, tactile, and dependable interfaces while keeping
                  the underlying system simple enough to scale.
                </p>
                <div className="ra-profile-list">
                  <span>UI systems with sharp hierarchy</span>
                  <span>Responsive layouts with motion restraint</span>
                  <span>Product thinking grounded in delivery</span>
                </div>
              </div>
              <PixelMascotTwo />
            </div>

            <div className="ra-terminal">
              <div className="ra-terminal-note">Live skill matrix</div>
              <div className="ra-terminal-bar">
                <span className="ra-dot r" />
                <span className="ra-dot y" />
                <span className="ra-dot g" />
                <span className="ra-terminal-title">skills.js — ~/portfolio<span className="blink-caret">_</span></span>
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
      )}
    </>
  );
};

export default AboutMe;