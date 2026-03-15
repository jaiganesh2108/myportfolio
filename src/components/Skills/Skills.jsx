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

  .sk-root {
    background: var(--black);
    padding: 5rem 2rem;
    font-family: 'Barlow', sans-serif;
    color: var(--white);
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }

  /* Watermark */
  .sk-bg-wm {
    position: absolute;
    bottom: -2rem;
    left: -1rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(5rem, 14vw, 12rem);
    color: rgba(204, 255, 0, 0.04);
    text-transform: uppercase;
    letter-spacing: -0.04em;
    line-height: 1;
    user-select: none;
    white-space: nowrap;
    pointer-events: none;
    z-index: 0;
  }

  /* Corner line accent */
  .sk-corner-accent {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    border-top: 1.5px solid rgba(204, 255, 0, 0.2);
    border-right: 1.5px solid rgba(204, 255, 0, 0.2);
    pointer-events: none;
    z-index: 0;
  }

  /* Container */
  .sk-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  /* Header */
  .sk-head {
    margin-bottom: 3rem;
  }

  .sk-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--acid);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    opacity: 0.85;
  }

  .sk-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: var(--white);
  }

  .sk-title span {
    color: var(--acid);
  }

  .sk-divider {
    width: 60px;
    height: 2px;
    background: var(--acid);
    margin-top: 1.2rem;
    opacity: 0.6;
  }

  /* Grid — 1px gap using background trick for clean separator lines */
  .sk-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1px;
    background: var(--border);
  }

  /* Card */
  .sk-card {
    background: var(--black);
    padding: 1.75rem;
    position: relative;
    overflow: hidden;
    transition: background 0.25s;
    opacity: 0;
    transform: translateY(24px);
    transition: background 0.25s, opacity 0.6s ease, transform 0.6s ease;
  }

  .sk-card.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .sk-card:hover {
    background: var(--panel);
  }

  /* Acid top-border sweep on hover */
  .sk-card::before {
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

  .sk-card:hover::before {
    transform: scaleX(1);
  }

  /* Card index */
  .sk-card-idx {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: rgba(204, 255, 0, 0.3);
    letter-spacing: 0.15em;
    margin-bottom: 0.9rem;
  }

  /* Card title */
  .sk-card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.65rem;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: var(--white);
    margin-bottom: 0.4rem;
    line-height: 1;
  }

  /* Card description */
  .sk-card-desc {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted);
    letter-spacing: 0.07em;
    text-transform: uppercase;
    margin-bottom: 1.4rem;
    line-height: 1.6;
  }

  /* Icons image */
  .sk-icons {
    width: 100%;
    border-radius: 0;
    display: block;
    transition: opacity 0.2s;
  }

  .sk-card:hover .sk-icons {
    opacity: 0.95;
  }

  /* Corner bracket decoration */
  .sk-card-corner {
    position: absolute;
    bottom: 0.85rem;
    right: 0.85rem;
    width: 16px;
    height: 16px;
    border-bottom: 1.5px solid rgba(204, 255, 0, 0.15);
    border-right: 1.5px solid rgba(204, 255, 0, 0.15);
    transition: border-color 0.25s;
  }

  .sk-card:hover .sk-card-corner {
    border-color: var(--acid);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .sk-root {
      padding: 3.5rem 1.25rem;
    }

    .sk-grid {
      grid-template-columns: 1fr;
    }

    .sk-title {
      font-size: clamp(2.2rem, 9vw, 3.5rem);
    }
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
      { threshold: 0.15 }
    );

    const cards = document.querySelectorAll('.sk-card');
    cards.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`;
      observer.observe(el);
    });

    return () => cards.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <style>{styles}</style>
      <section id="skills" className="sk-root" ref={sectionRef}>
        <div className="sk-bg-wm">SKILLS</div>
        <div className="sk-corner-accent" />

        <div className="sk-container">
          <div className="sk-head">
            <div className="sk-label">// 03 — Technology Arsenal</div>
            <h2 className="sk-title">
              MY <span>TECH</span><br />ARSENAL
            </h2>
            <div className="sk-divider" />
          </div>

          <div className="sk-grid">
            {skillCategories.map((cat) => (
              <div key={cat.idx} className="sk-card">
                <div className="sk-card-idx">// {cat.idx}</div>
                <h3 className="sk-card-title">{cat.title}</h3>
                <p className="sk-card-desc">{cat.description}</p>
                <img
                  src={`https://skillicons.dev/icons?i=${cat.icons}&perline=7&theme=dark`}
                  alt={cat.alt}
                  className="sk-icons"
                  loading="lazy"
                />
                <div className="sk-card-corner" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;