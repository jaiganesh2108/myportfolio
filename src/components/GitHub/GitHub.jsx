import { useEffect, useRef } from 'react';

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

  .gh-root {
    background: var(--black);
    padding: 5rem 2rem;
    font-family: 'Barlow', sans-serif;
    color: var(--white);
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }

  /* Watermark */
  .gh-bg-wm {
    position: absolute;
    bottom: -2rem;
    left: -1rem;
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
  .gh-corner-tr {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-top: 1.5px solid rgba(204, 255, 0, 0.18);
    border-right: 1.5px solid rgba(204, 255, 0, 0.18);
    pointer-events: none;
    z-index: 0;
  }

  /* Container */
  .gh-container {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  /* Header */
  .gh-head {
    margin-bottom: 2rem;
  }

  .gh-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--acid);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    opacity: 0.85;
  }

  .gh-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: var(--white);
  }

  .gh-title span {
    color: var(--acid);
  }

  .gh-divider {
    width: 60px;
    height: 2px;
    background: var(--acid);
    margin-top: 1.2rem;
    opacity: 0.6;
  }

  /* Description */
  .gh-desc {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.68rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 1.75rem 0 2.5rem;
    line-height: 1.8;
  }

  /* Stats 3-column grid */
  .gh-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    margin-bottom: 1px;
  }

  /* Full-width row */
  .gh-full {
    background: var(--border);
    margin-bottom: 2.5rem;
  }

  /* Stat card */
  .gh-card {
    background: var(--black);
    padding: 1.25rem;
    position: relative;
    overflow: hidden;
    transition: background 0.25s, opacity 0.6s ease, transform 0.6s ease;
    opacity: 0;
    transform: translateY(20px);
  }

  .gh-card.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .gh-card:hover {
    background: var(--panel);
  }

  .gh-card::before {
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

  .gh-card:hover::before {
    transform: scaleX(1);
  }

  /* Full-width card */
  .gh-full-card {
    background: var(--black);
    padding: 1.25rem;
    position: relative;
    overflow: hidden;
    transition: background 0.25s, opacity 0.6s ease, transform 0.6s ease;
    opacity: 0;
    transform: translateY(20px);
  }

  .gh-full-card.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .gh-full-card:hover {
    background: var(--panel);
  }

  .gh-full-card::before {
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

  .gh-full-card:hover::before {
    transform: scaleX(1);
  }

  /* Card index label */
  .gh-card-idx {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    color: rgba(204, 255, 0, 0.3);
    letter-spacing: 0.15em;
    margin-bottom: 0.75rem;
  }

  /* Stats images */
  .gh-stats-img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Corner bracket */
  .gh-corner-br {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    width: 14px;
    height: 14px;
    border-bottom: 1.5px solid rgba(204, 255, 0, 0.12);
    border-right: 1.5px solid rgba(204, 255, 0, 0.12);
    transition: border-color 0.25s;
  }

  .gh-card:hover .gh-corner-br,
  .gh-full-card:hover .gh-corner-br {
    border-color: var(--acid);
  }

  /* CTA row */
  .gh-cta-wrap {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .gh-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    background: var(--acid);
    color: #000;
    padding: 0.85rem 1.75rem;
    transition: background 0.2s, gap 0.2s;
  }

  .gh-cta:hover {
    background: #DDFF22;
    gap: 1.1rem;
  }

  .gh-cta svg {
    flex-shrink: 0;
  }

  .gh-cta-arrow {
    font-size: 1rem;
    transition: transform 0.2s;
  }

  .gh-cta:hover .gh-cta-arrow {
    transform: translateX(3px);
  }

  .gh-cta-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .gh-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 600px) {
    .gh-root {
      padding: 3.5rem 1.25rem;
    }

    .gh-grid {
      grid-template-columns: 1fr;
    }

    .gh-title {
      font-size: clamp(2.2rem, 9vw, 3.5rem);
    }
  }
`;

const GitHub = () => {
  const sectionRef = useRef(null);

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

    const cards = sectionRef.current?.querySelectorAll('.gh-card, .gh-full-card') || [];
    cards.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`;
      observer.observe(el);
    });

    return () => cards.forEach((el) => observer.unobserve(el));
  }, []);

  const STATS_THEME = 'bg_color=0d1117&hide_border=true&title_color=CCFF00&text_color=ffffff&icon_color=AADD00';

  return (
    <>
      <style>{styles}</style>
      <section id="github" className="gh-root" ref={sectionRef}>
        <div className="gh-bg-wm">GITHUB</div>
        <div className="gh-corner-tr" />

        <div className="gh-container">
          <div className="gh-head">
            <div className="gh-label">// 07 — Open Source</div>
            <h2 className="gh-title">MY <span>GITHUB</span><br />JOURNEY</h2>
            <div className="gh-divider" />
          </div>

          <p className="gh-desc">
            Explore my open-source projects and contributions.<br />
            Building in public — one commit at a time.
          </p>

          {/* 3-column stats grid */}
          <div className="gh-grid">
            <div className="gh-card">
              <div className="gh-card-idx">// 01 — Stats</div>
              <img
                className="gh-stats-img"
                src={`https://github-readme-stats.vercel.app/api?username=jaiganesh2108&show_icons=true&count_private=true&${STATS_THEME}`}
                alt="GitHub Stats"
                loading="lazy"
              />
              <div className="gh-corner-br" />
            </div>

            <div className="gh-card">
              <div className="gh-card-idx">// 02 — Streak</div>
              <img
                className="gh-stats-img"
                src={`https://github-readme-streak-stats.herokuapp.com/?user=jaiganesh2108&background=0d1117&hide_border=true&stroke=CCFF00&ring=CCFF00&fire=CCFF00&currStreakNum=CCFF00&sideNums=ffffff&currStreakLabel=CCFF00&sideLabels=CCFF00&dates=888888`}
                alt="GitHub Streak"
                loading="lazy"
              />
              <div className="gh-corner-br" />
            </div>

            <div className="gh-card">
              <div className="gh-card-idx">// 03 — Languages</div>
              <img
                className="gh-stats-img"
                src={`https://github-readme-stats.vercel.app/api/top-langs?username=jaiganesh2108&layout=compact&${STATS_THEME}`}
                alt="Top Languages"
                loading="lazy"
              />
              <div className="gh-corner-br" />
            </div>
          </div>

          {/* Full-width contribution graph */}
          <div className="gh-full">
            <div className="gh-full-card">
              <div className="gh-card-idx">// 04 — Contribution Timeline</div>
              <a href="https://github.com/jaiganesh2108" target="_blank" rel="noreferrer">
                <img
                  className="gh-stats-img"
                  src="https://github-readme-activity-graph.vercel.app/graph?username=jaiganesh2108&bg_color=0d1117&color=CCFF00&line=AADD00&point=ffffff&area=true&hide_border=true&custom_title=Contribution%20Timeline"
                  alt="Contribution Timeline"
                  loading="lazy"
                />
              </a>
              <div className="gh-corner-br" />
            </div>
          </div>

          {/* CTA */}
          <div className="gh-cta-wrap">
            <a
              href="https://github.com/jaiganesh2108"
              className="gh-cta"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Visit My GitHub
              <span className="gh-cta-arrow">→</span>
            </a>
            <span className="gh-cta-label">github.com/jaiganesh2108</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default GitHub;