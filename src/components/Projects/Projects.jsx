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

  .pr-root {
    background: var(--black);
    padding: 5rem 2rem;
    font-family: 'Barlow', sans-serif;
    color: var(--white);
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }

  /* Watermark */
  .pr-bg-wm {
    position: absolute;
    bottom: -2rem;
    right: -1rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(4rem, 12vw, 10rem);
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
  .pr-corner-tl {
    position: absolute;
    top: 2rem;
    left: 2rem;
    width: 50px;
    height: 50px;
    border-top: 1.5px solid rgba(204, 255, 0, 0.18);
    border-left: 1.5px solid rgba(204, 255, 0, 0.18);
    pointer-events: none;
    z-index: 0;
  }

  /* Container */
  .pr-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  /* Header */
  .pr-head {
    margin-bottom: 3rem;
  }

  .pr-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--acid);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    opacity: 0.85;
  }

  .pr-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: var(--white);
  }

  .pr-title span {
    color: var(--acid);
  }

  .pr-divider {
    width: 60px;
    height: 2px;
    background: var(--acid);
    margin-top: 1.2rem;
    opacity: 0.6;
  }

  /* Grid */
  .pr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1px;
    background: var(--border);
  }

  /* Card */
  .pr-card {
    background: var(--black);
    padding: 1.75rem;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: background 0.25s, opacity 0.6s ease, transform 0.6s ease;
    opacity: 0;
    transform: translateY(24px);
  }

  .pr-card.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .pr-card:hover {
    background: var(--panel);
  }

  /* Acid sweep on hover */
  .pr-card::before {
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

  .pr-card:hover::before {
    transform: scaleX(1);
  }

  /* Card top row */
  .pr-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .pr-idx {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: rgba(204, 255, 0, 0.3);
    letter-spacing: 0.15em;
  }

  .pr-cat {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid var(--border);
    padding: 0.2rem 0.5rem;
    transition: border-color 0.25s, color 0.25s;
  }

  .pr-card:hover .pr-cat {
    border-color: rgba(204, 255, 0, 0.3);
    color: var(--acid);
  }

  /* Card title */
  .pr-ctitle {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: var(--white);
    margin-bottom: 0.65rem;
    line-height: 1.05;
  }

  /* Description */
  .pr-desc {
    font-family: 'Barlow', sans-serif;
    font-size: 0.83rem;
    color: var(--muted);
    line-height: 1.65;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }

  /* Footer */
  .pr-footer {
    margin-top: auto;
  }

  /* Tech tags */
  .pr-techs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.2rem;
  }

  .pr-tech {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: rgba(204, 255, 0, 0.6);
    letter-spacing: 0.07em;
    text-transform: uppercase;
    border: 1px solid rgba(204, 255, 0, 0.15);
    padding: 0.18rem 0.5rem;
    transition: border-color 0.2s, color 0.2s;
  }

  .pr-card:hover .pr-tech {
    border-color: rgba(204, 255, 0, 0.3);
    color: var(--acid);
  }

  /* Project link */
  .pr-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--acid);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    transition: gap 0.2s ease;
  }

  .pr-link:hover {
    gap: 0.9rem;
  }

  .pr-arrow {
    font-size: 0.9rem;
    transition: transform 0.2s ease;
  }

  .pr-link:hover .pr-arrow {
    transform: translateX(3px);
  }

  /* Corner bracket */
  .pr-corner-br {
    position: absolute;
    bottom: 0.85rem;
    right: 0.85rem;
    width: 14px;
    height: 14px;
    border-bottom: 1.5px solid rgba(204, 255, 0, 0.12);
    border-right: 1.5px solid rgba(204, 255, 0, 0.12);
    transition: border-color 0.25s;
  }

  .pr-card:hover .pr-corner-br {
    border-color: var(--acid);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .pr-root {
      padding: 3.5rem 1.25rem;
    }

    .pr-grid {
      grid-template-columns: 1fr;
    }

    .pr-title {
      font-size: clamp(2.2rem, 9vw, 3.5rem);
    }
  }
`;

const projects = [
  {
    idx: '01',
    title: 'E-Commerce Platform',
    desc: 'Full-stack e-commerce solution with user authentication, product management, and secure payment integration.',
    tech: ['React', 'Django', 'MongoDB'],
    category: 'Web App',
    link: 'https://github.com/jaiganesh2108/Robinkart',
  },
  {
    idx: '02',
    title: 'Task Management',
    desc: 'Real-time collaboration app with task assignment, progress tracking, and team communication features.',
    tech: ['Firebase', 'Flutter', 'Material UI'],
    category: 'Productivity',
    link: 'https://github.com/jaiganesh2108/To_Do_List-flutter-app',
  },
  {
    idx: '03',
    title: 'Portfolio Website',
    desc: 'Modern, responsive portfolio showcasing projects and skills with interactive elements and animations.',
    tech: ['React', 'Vite', 'CSS3', 'Framer Motion'],
    category: 'Frontend',
    link: 'https://github.com/jaiganesh2108/myportfolio',
  },
  {
    idx: '04',
    title: 'AI Market Place',
    desc: 'Real-time cryptocurrency market data with historical price charts, AI models, and personalized watchlists.',
    tech: ['React', 'Chart.js', 'Web3.py', 'Python'],
    category: 'Finance',
    link: 'https://github.com/jaiganesh2108/edu-dapp',
  },
  {
    idx: '05',
    title: 'AI Blog Generator',
    desc: 'Smart web app that generates high-quality blog posts from YouTube video links using OpenAI GPT and a Django backend.',
    tech: ['HTML', 'CSS', 'Django', 'Python'],
    category: 'AI/ML',
    link: 'https://github.com/jaiganesh2108/AI-Blog-Generator',
  },
  {
    idx: '06',
    title: 'Starfire AI',
    desc: 'Personal assistant for daily activities and student self-growth monitoring, with a unique developer-friendly architecture.',
    tech: ['OpenAI API', 'Desktop', 'Python'],
    category: 'AI',
    link: 'https://github.com/jaiganesh2108/starfire',
  },
];

const Projects = () => {
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

    const cards = document.querySelectorAll('.pr-card');
    cards.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`;
      observer.observe(el);
    });

    return () => cards.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <style>{styles}</style>
      <section id="projects" className="pr-root" ref={sectionRef}>
        <div className="pr-bg-wm">PROJECTS</div>
        <div className="pr-corner-tl" />

        <div className="pr-container">
          <div className="pr-head">
            <div className="pr-label">// 04 — Featured Work</div>
            <h2 className="pr-title">MY <span>PROJECTS</span></h2>
            <div className="pr-divider" />
          </div>

          <div className="pr-grid">
            {projects.map((project) => (
              <div key={project.idx} className="pr-card">
                <div className="pr-card-top">
                  <span className="pr-idx">// {project.idx}</span>
                  <span className="pr-cat">{project.category}</span>
                </div>

                <h3 className="pr-ctitle">{project.title}</h3>
                <p className="pr-desc">{project.desc}</p>

                <div className="pr-footer">
                  <div className="pr-techs">
                    {project.tech.map((t) => (
                      <span key={t} className="pr-tech">{t}</span>
                    ))}
                  </div>

                  <a href={project.link} className="pr-link" target="_blank" rel="noreferrer">
                    View Project <span className="pr-arrow">→</span>
                  </a>
                </div>

                <div className="pr-corner-br" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;