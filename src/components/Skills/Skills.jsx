import { useEffect, useRef } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,700&family=Share+Tech+Mono&family=Barlow:wght@300;400;500&display=swap');

  :root {
    --acid: #CCFF00;
    --acid-dim: rgba(204,255,0,0.08);
    --acid-mid: rgba(204,255,0,0.18);
    --black: #080808;
    --panel: #111111;
    --border: #1E1E1E;
    --muted: #555555;
    --muted-hi: #888888;
    --white: #EFEFEF;
    --white-dim: rgba(239,239,239,0.06);
  }

  /* ── Root ─────────────────────────────── */
  .sk-root {
    background: var(--black);
    padding: 6rem 2.5rem 7rem;
    font-family: 'Barlow', sans-serif;
    color: var(--white);
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }

  /* Scanline overlay */
  .sk-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.18) 2px,
      rgba(0,0,0,0.18) 4px
    );
    pointer-events: none;
    z-index: 0;
    mix-blend-mode: multiply;
  }

  /* Subtle radial acid glow */
  .sk-glow {
    position: absolute;
    top: -20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(204,255,0,0.04) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
  }

  /* Large watermark */
  .sk-bg-wm {
    position: absolute;
    bottom: -1.5rem;
    left: -0.5rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(6rem, 15vw, 13rem);
    color: rgba(204,255,0,0.03);
    text-transform: uppercase;
    letter-spacing: -0.04em;
    line-height: 1;
    user-select: none;
    white-space: nowrap;
    pointer-events: none;
    z-index: 0;
  }

  /* Corner accents */
  .sk-corner {
    position: absolute;
    width: 48px;
    height: 48px;
    pointer-events: none;
    z-index: 1;
  }
  .sk-corner--tr { top: 2rem; right: 2.5rem; border-top: 1px solid var(--acid-mid); border-right: 1px solid var(--acid-mid); }
  .sk-corner--bl { bottom: 2rem; left: 2.5rem; border-bottom: 1px solid var(--acid-mid); border-left: 1px solid var(--acid-mid); }

  /* ── Container ────────────────────────── */
  .sk-container {
    max-width: 1240px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  /* ── Header ───────────────────────────── */
  .sk-head {
    margin-bottom: 3.5rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .sk-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--acid);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    margin-bottom: 0.9rem;
    opacity: 0.75;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .sk-label::after {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: var(--acid);
    opacity: 0.4;
  }

  .sk-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(3rem, 7.5vw, 6rem);
    text-transform: uppercase;
    letter-spacing: -0.025em;
    line-height: 0.9;
    color: var(--white);
    margin: 0;
  }

  .sk-title em {
    font-style: italic;
    color: var(--acid);
    display: block;
    line-height: 0.88;
  }

  .sk-subtitle-row {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-top: 1.4rem;
  }

  .sk-divider {
    width: 48px;
    height: 2px;
    background: var(--acid);
    flex-shrink: 0;
  }

  .sk-tagline {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted-hi);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  /* ── Grid ─────────────────────────────── */
  .sk-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }

  /* Row 1: cards 1–3 each take 2 of 6 columns */
  .sk-card:nth-child(1),
  .sk-card:nth-child(2),
  .sk-card:nth-child(3) { grid-column: span 2; }

  /* Row 2: cards 4–5 each take 3 of 6 columns → perfectly centred */
  .sk-card:nth-child(4),
  .sk-card:nth-child(5) { grid-column: span 3; }

  /* ── Card ─────────────────────────────── */
  .sk-card {
    background: var(--black);
    padding: 2rem 1.75rem 1.75rem;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(28px);
    transition:
      background 0.3s ease,
      opacity 0.55s ease,
      transform 0.55s ease;
  }

  .sk-card.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .sk-card:hover {
    background: var(--panel);
  }

  /* Acid top sweep */
  .sk-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--acid);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .sk-card:hover::before { transform: scaleX(1); }

  /* Inner left-border accent */
  .sk-card::after {
    content: '';
    position: absolute;
    top: 20%;
    left: 0;
    width: 1px;
    height: 0;
    background: linear-gradient(to bottom, transparent, var(--acid), transparent);
    transition: height 0.4s ease 0.1s;
    opacity: 0.35;
  }
  .sk-card:hover::after { height: 60%; }

  /* Number tag */
  .sk-card-idx {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    color: rgba(204,255,0,0.28);
    letter-spacing: 0.18em;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .sk-card-idx::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 1px;
    background: rgba(204,255,0,0.2);
  }

  /* Card title */
  .sk-card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.55rem;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: var(--white);
    margin: 0 0 0.3rem;
    line-height: 1;
    transition: color 0.2s;
  }
  .sk-card:hover .sk-card-title { color: #fff; }

  /* Card description */
  .sk-card-desc {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.575rem;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin: 0 0 1.5rem;
    line-height: 1.7;
    transition: color 0.2s;
  }
  .sk-card:hover .sk-card-desc { color: var(--muted-hi); }

  /* Icon image */
  .sk-icons-wrap {
    position: relative;
    overflow: hidden;
  }
  .sk-icons-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 70%, rgba(204,255,0,0.04));
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .sk-card:hover .sk-icons-wrap::after { opacity: 1; }

  .sk-icons {
    width: 100%;
    display: block;
    filter: brightness(0.82) saturate(0.9);
    transition: filter 0.3s ease, transform 0.4s ease;
  }
  .sk-card:hover .sk-icons {
    filter: brightness(1) saturate(1.05);
    transform: scale(1.01);
  }

  /* Bottom-right corner bracket */
  .sk-card-corner {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    width: 14px;
    height: 14px;
    border-bottom: 1px solid rgba(204,255,0,0.12);
    border-right: 1px solid rgba(204,255,0,0.12);
    transition: border-color 0.25s, width 0.25s, height 0.25s;
  }
  .sk-card:hover .sk-card-corner {
    border-color: rgba(204,255,0,0.55);
    width: 18px;
    height: 18px;
  }

  /* Dot pulse */
  .sk-dot {
    position: absolute;
    top: 0.9rem;
    right: 1rem;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--acid);
    opacity: 0;
    transition: opacity 0.25s;
  }
  .sk-dot::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1px solid var(--acid);
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.3s, transform 0.3s;
  }
  .sk-card:hover .sk-dot { opacity: 1; }
  .sk-card:hover .sk-dot::before { opacity: 0.4; transform: scale(1.5); }

  /* ── Footer row ───────────────────────── */
  .sk-foot {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s;
  }
  .sk-foot.in-view { opacity: 1; transform: translateY(0); }

  .sk-foot-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: rgba(204,255,0,0.25);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .sk-foot-dots {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .sk-foot-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--border);
  }
  .sk-foot-dot:first-child { background: var(--acid); opacity: 0.5; }

  /* ── Responsive ───────────────────────── */
  @media (max-width: 900px) {
    .sk-root { padding: 4rem 1.5rem 5rem; }
    .sk-grid { grid-template-columns: repeat(2, 1fr); }
    .sk-card:nth-child(1),
    .sk-card:nth-child(2),
    .sk-card:nth-child(3),
    .sk-card:nth-child(4) { grid-column: span 1; }
    .sk-card:nth-child(5) { grid-column: span 2; }
  }

  @media (max-width: 580px) {
    .sk-root { padding: 3.5rem 1rem 4rem; }
    .sk-grid { grid-template-columns: 1fr; }
    .sk-card:nth-child(1),
    .sk-card:nth-child(2),
    .sk-card:nth-child(3),
    .sk-card:nth-child(4),
    .sk-card:nth-child(5) { grid-column: span 1; }
    .sk-title { font-size: clamp(2.6rem, 10vw, 3.5rem); }
  }
`;

const skillCategories = [
  {
    idx: '01',
    title: 'Languages',
    icons: 'python,js,ts,kotlin,dart,cpp,solidity',
    alt: 'Programming Languages',
    description: 'Building blocks of digital innovation',
  },
  {
    idx: '02',
    title: 'Frontend & Backend',
    icons: 'react,django,flutter,nodejs,express,androidstudio,firebase',
    alt: 'Frontend & Backend Frameworks',
    description: 'Crafting experiences, powering functionality',
  },
  {
    idx: '03',
    title: 'Database & DevOps',
    icons: 'mongodb,sqlite,postgres,docker,jenkins,github,git',
    alt: 'Database & DevOps Tools',
    description: 'Storing data, streamlining deployment',
  },
  {
    idx: '04',
    title: 'AI / ML / DS',
    icons: 'tensorflow,pytorch,numpy,pandas,scikitlearn,opencv',
    alt: 'AI/ML/Data Science Tools',
    description: 'Intelligence through data and algorithms',
  },
  {
    idx: '05',
    title: 'Tools & Platforms',
    icons: 'vscode,figma,postman,ubuntu,linux',
    alt: 'Tools & Platforms',
    description: 'Essential gear for modern development',
  },
];

const Skills = () => {
  const footRef = useRef(null);

  useEffect(() => {
    /* Card stagger reveal */
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const cards = document.querySelectorAll('.sk-card');
    cards.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.09}s`;
      cardObserver.observe(el);
    });

    /* Footer reveal */
    const footObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          footObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (footRef.current) footObserver.observe(footRef.current);

    return () => {
      cards.forEach((el) => cardObserver.unobserve(el));
      if (footRef.current) footObserver.unobserve(footRef.current);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <section id="skills" className="sk-root">
        {/* Atmospheric glow */}
        <div className="sk-glow" />

        {/* Watermark */}
        <div className="sk-bg-wm" aria-hidden="true">SKILLS</div>

        {/* Corner accents */}
        <div className="sk-corner sk-corner--tr" aria-hidden="true" />
        <div className="sk-corner sk-corner--bl" aria-hidden="true" />

        <div className="sk-container">

          {/* ── Header ── */}
          <header className="sk-head">
            <div className="sk-label">// 03 — Technology Arsenal</div>
            <h2 className="sk-title">
              MY<br />
              <em>TECH</em>
              ARSENAL
            </h2>
            <div className="sk-subtitle-row">
              <div className="sk-divider" />
              <span className="sk-tagline">languages · frameworks · tools</span>
            </div>
          </header>

          {/* ── Cards ── */}
          <div className="sk-grid" role="list">
            {skillCategories.map((cat) => (
              <article key={cat.idx} className="sk-card" role="listitem">
                <div className="sk-card-idx">// {cat.idx}</div>
                <h3 className="sk-card-title">{cat.title}</h3>
                <p className="sk-card-desc">{cat.description}</p>
                <div className="sk-icons-wrap">
                  <img
                    src={`https://skillicons.dev/icons?i=${cat.icons}&perline=7&theme=dark`}
                    alt={cat.alt}
                    className="sk-icons"
                    loading="lazy"
                    width="100%"
                  />
                </div>
                <div className="sk-card-corner" aria-hidden="true" />
                <div className="sk-dot" aria-hidden="true" />
              </article>
            ))}
          </div>

          {/* ── Footer row ── */}
          <div className="sk-foot" ref={footRef} aria-hidden="true">
            <span className="sk-foot-label">END OF STACK // v2025</span>
            <div className="sk-foot-dots">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="sk-foot-dot" />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Skills;