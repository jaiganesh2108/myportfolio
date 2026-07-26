import { useEffect, useRef } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,700&family=Share+Tech+Mono&family=Barlow:wght@300;400;500;600&display=swap');

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
    background: radial-gradient(ellipse, rgba(204,255,0,0.05) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
  }

  .sk-glow-b {
    position: absolute;
    bottom: -25%;
    left: -8%;
    width: 520px;
    height: 520px;
    background: radial-gradient(ellipse, rgba(204,255,0,0.03) 0%, transparent 65%);
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
    padding: 2rem 1.75rem 1.5rem;
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

  /* Card top row: index tag + average mastery badge */
  .sk-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .sk-card-idx {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    color: rgba(204,255,0,0.28);
    letter-spacing: 0.18em;
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

  .sk-card-avg {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.1em;
    color: var(--acid);
    background: rgba(204,255,0,0.07);
    border: 1px solid rgba(204,255,0,0.25);
    padding: 0.22rem 0.5rem;
    border-radius: 3px;
    white-space: nowrap;
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

  /* ── Skill list: name + animated level bar instead of a flat
     icon strip, so each skill communicates proficiency ── */
  .sk-skill-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .sk-skill-row {
    display: grid;
    grid-template-columns: 22px minmax(0, 1fr) 64px 30px;
    align-items: center;
    gap: 0.6rem;
    padding: 0.2rem 0.3rem;
    border-radius: 3px;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .sk-skill-row:hover {
    background: rgba(204,255,0,0.05);
    transform: translateX(2px);
  }

  .sk-skill-icon {
    width: 18px;
    height: 18px;
    object-fit: contain;
    filter: brightness(0.85) saturate(0.9);
    transition: filter 0.2s ease;
  }
  .sk-skill-row:hover .sk-skill-icon {
    filter: brightness(1.05) saturate(1.05);
  }

  .sk-skill-name {
    font-family: 'Barlow', sans-serif;
    font-weight: 500;
    font-size: 0.78rem;
    letter-spacing: 0.01em;
    color: var(--white-dim, var(--muted-hi));
    color: #C7C7C7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease;
  }
  .sk-skill-row:hover .sk-skill-name { color: var(--white); }

  .sk-level-track {
    position: relative;
    height: 3px;
    border-radius: 2px;
    background: var(--white-dim);
    overflow: hidden;
  }

  .sk-level-fill {
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    background: linear-gradient(90deg, rgba(204,255,0,0.55), var(--acid));
    border-radius: 2px;
    transition: filter 0.2s ease;
  }
  .sk-skill-row:hover .sk-level-fill {
    filter: brightness(1.3);
  }

  .sk-skill-pct {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted);
    text-align: right;
    transition: color 0.2s ease;
  }
  .sk-skill-row:hover .sk-skill-pct { color: var(--acid); }

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
    .sk-skill-row { grid-template-columns: 20px minmax(0,1fr) 50px 26px; }
  }
`;

const skillCategories = [
  {
    idx: '01',
    title: 'Languages',
    description: 'Building blocks of digital innovation',
    skills: [
      { name: 'Python', icon: 'python', level: 90 },
      { name: 'JavaScript', icon: 'js', level: 85 },
      { name: 'TypeScript', icon: 'ts', level: 78 },
      { name: 'Kotlin', icon: 'kotlin', level: 70 },
      { name: 'Dart', icon: 'dart', level: 74 },
      { name: 'C++', icon: 'cpp', level: 65 },
      { name: 'Solidity', icon: 'solidity', level: 58 },
    ],
  },
  {
    idx: '02',
    title: 'Frontend & Backend',
    description: 'Crafting experiences, powering functionality',
    skills: [
      { name: 'React', icon: 'react', level: 90 },
      { name: 'Node.js', icon: 'nodejs', level: 84 },
      { name: 'Express', icon: 'express', level: 80 },
      { name: 'Django', icon: 'django', level: 78 },
      { name: 'Flutter', icon: 'flutter', level: 75 },
      { name: 'Android Studio', icon: 'androidstudio', level: 70 },
      { name: 'Firebase', icon: 'firebase', level: 76 },
    ],
  },
  {
    idx: '03',
    title: 'Database & DevOps',
    description: 'Storing data, streamlining deployment',
    skills: [
      { name: 'Git', icon: 'git', level: 92 },
      { name: 'GitHub', icon: 'github', level: 90 },
      { name: 'MongoDB', icon: 'mongodb', level: 82 },
      { name: 'PostgreSQL', icon: 'postgres', level: 76 },
      { name: 'SQLite', icon: 'sqlite', level: 80 },
      { name: 'Docker', icon: 'docker', level: 68 },
      { name: 'Jenkins', icon: 'jenkins', level: 55 },
    ],
  },
  {
    idx: '04',
    title: 'AI / ML / DS',
    description: 'Intelligence through data and algorithms',
    skills: [
      { name: 'NumPy', icon: 'numpy', level: 86 },
      { name: 'Pandas', icon: 'pandas', level: 85 },
      { name: 'Scikit-learn', icon: 'scikitlearn', level: 76 },
      { name: 'TensorFlow', icon: 'tensorflow', level: 74 },
      { name: 'PyTorch', icon: 'pytorch', level: 68 },
      { name: 'OpenCV', icon: 'opencv', level: 70 },
    ],
  },
  {
    idx: '05',
    title: 'Tools & Platforms',
    description: 'Essential gear for modern development',
    skills: [
      { name: 'VS Code', icon: 'vscode', level: 95 },
      { name: 'Linux', icon: 'linux', level: 82 },
      { name: 'Ubuntu', icon: 'ubuntu', level: 80 },
      { name: 'Postman', icon: 'postman', level: 78 },
      { name: 'Figma', icon: 'figma', level: 72 },
    ],
  },
];

const average = (skills) =>
  Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length);

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
        <div className="sk-glow-b" />

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
              <span className="sk-tagline">languages · frameworks · tools · proficiency</span>
            </div>
          </header>

          {/* ── Cards ── */}
          <div className="sk-grid" role="list">
            {skillCategories.map((cat) => (
              <article key={cat.idx} className="sk-card" role="listitem">
                <div className="sk-card-top">
                  <div className="sk-card-idx">// {cat.idx}</div>
                  <div className="sk-card-avg">{average(cat.skills)}% AVG</div>
                </div>
                <h3 className="sk-card-title">{cat.title}</h3>
                <p className="sk-card-desc">{cat.description}</p>

                <ul className="sk-skill-list">
                  {cat.skills.map((skill) => (
                    <li className="sk-skill-row" key={skill.name}>
                      <img
                        className="sk-skill-icon"
                        src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                        alt=""
                        loading="lazy"
                      />
                      <span className="sk-skill-name">{skill.name}</span>
                      <div className="sk-level-track">
                        <div
                          className="sk-level-fill"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="sk-skill-pct">{skill.level}%</span>
                    </li>
                  ))}
                </ul>

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