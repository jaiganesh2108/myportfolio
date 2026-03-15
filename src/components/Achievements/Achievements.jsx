import { useEffect, useRef } from 'react';
import hackathonImage from './assets/hackathon2024.jpg';
import codefestImage from './assets/codeathon2025.jpg';
import atriaImage from './assets/atria.jpg';

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

  .ac-root {
    background: var(--black);
    padding: 5rem 2rem;
    font-family: 'Barlow', sans-serif;
    color: var(--white);
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }

  /* Watermark */
  .ac-bg-wm {
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
  .ac-corner-tr {
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
  .ac-container {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  /* Header */
  .ac-head {
    margin-bottom: 3rem;
  }

  .ac-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--acid);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    opacity: 0.85;
  }

  .ac-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: var(--white);
  }

  .ac-title span {
    color: var(--acid);
  }

  .ac-divider {
    width: 60px;
    height: 2px;
    background: var(--acid);
    margin-top: 1.2rem;
    opacity: 0.6;
  }

  /* Grid */
  .ac-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1px;
    background: var(--border);
  }

  /* Card */
  .ac-card {
    background: var(--black);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: background 0.25s, opacity 0.6s ease, transform 0.6s ease;
    opacity: 0;
    transform: translateY(24px);
  }

  .ac-card.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .ac-card:hover {
    background: var(--panel);
  }

  /* Acid top sweep */
  .ac-card::before {
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
    z-index: 10;
  }

  .ac-card:hover::before {
    transform: scaleX(1);
  }

  /* Image area */
  .ac-img-wrap {
    position: relative;
    height: 200px;
    overflow: hidden;
    background: var(--panel);
    flex-shrink: 0;
  }

  .ac-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(40%) contrast(1.05);
    transition: transform 0.5s ease, filter 0.4s ease;
  }

  .ac-card:hover .ac-img-wrap img {
    transform: scale(1.05);
    filter: grayscale(10%) contrast(1.1);
  }

  .ac-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(10, 10, 10, 0.85));
  }

  /* Badge overlaid on image */
  .ac-img-badge {
    position: absolute;
    bottom: 0.75rem;
    left: 0.85rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: var(--acid);
    color: #000;
    padding: 0.22rem 0.65rem;
    z-index: 2;
  }

  /* Card body */
  .ac-body {
    padding: 1.5rem 1.75rem 1.75rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .ac-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.85rem;
  }

  .ac-idx {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: rgba(204, 255, 0, 0.3);
    letter-spacing: 0.15em;
  }

  .ac-date {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* Card title */
  .ac-ctitle {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: var(--white);
    margin-bottom: 0.65rem;
    line-height: 1.05;
  }

  /* Description */
  .ac-desc {
    font-family: 'Barlow', sans-serif;
    font-size: 0.83rem;
    color: var(--muted);
    line-height: 1.65;
    flex-grow: 1;
  }

  /* Corner bracket */
  .ac-corner-br {
    position: absolute;
    bottom: 0.85rem;
    right: 0.85rem;
    width: 14px;
    height: 14px;
    border-bottom: 1.5px solid rgba(204, 255, 0, 0.12);
    border-right: 1.5px solid rgba(204, 255, 0, 0.12);
    transition: border-color 0.25s;
  }

  .ac-card:hover .ac-corner-br {
    border-color: var(--acid);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .ac-root {
      padding: 3.5rem 1.25rem;
    }

    .ac-grid {
      grid-template-columns: 1fr;
    }

    .ac-title {
      font-size: clamp(2.2rem, 9vw, 3.5rem);
    }

    .ac-img-wrap {
      height: 160px;
    }
  }
`;

const achievements = [
  {
    idx: '01',
    title: 'Smart India Hackathon 2024 Finalist',
    description:
      "Selected among top innovators to solve SIH1748, a challenge by the National Critical Information Infrastructure Protection Center (NCIIPC) at IIT Jammu — India's premier national innovation competition.",
    image: hackathonImage,
    date: 'Dec 2024',
    badge: 'Finalist',
  },
  {
    idx: '02',
    title: 'Codeathon — Special Prize Winner',
    description:
      'Recognized with a Special Prize for innovative problem-solving and technical excellence in a 24-hour Codeathon. Presented a solution focused on practical implementation, scalability, and user-centric design.',
    image: codefestImage,
    date: 'Mar 2025',
    badge: 'Winner',
  },
  {
    idx: '03',
    title: 'Several Hackathon Experience',
    description:
      'Participated in several hackathons, gaining hands-on experience in rapid prototyping, cross-functional collaboration, and real-world problem-solving under pressure.',
    image: atriaImage,
    date: '2024–2025',
    badge: 'Participated',
  },
];

const Achievements = () => {
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

    const cards = document.querySelectorAll('.ac-card');
    cards.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.12}s`;
      observer.observe(el);
    });

    return () => cards.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <style>{styles}</style>
      <section id="achievements" className="ac-root" ref={sectionRef}>
        <div className="ac-bg-wm">WINS</div>
        <div className="ac-corner-tr" />

        <div className="ac-container">
          <div className="ac-head">
            <div className="ac-label">// 05 — Recognition</div>
            <h2 className="ac-title">ACHIEVE<span>MENTS</span></h2>
            <div className="ac-divider" />
          </div>

          <div className="ac-grid">
            {achievements.map((item) => (
              <div key={item.idx} className="ac-card">
                {/* Image */}
                <div className="ac-img-wrap">
                  <img src={item.image} alt={item.title} />
                  <div className="ac-img-overlay" />
                  <span className="ac-img-badge">{item.badge}</span>
                </div>

                {/* Body */}
                <div className="ac-body">
                  <div className="ac-card-top">
                    <span className="ac-idx">// {item.idx}</span>
                    <span className="ac-date">{item.date}</span>
                  </div>
                  <h3 className="ac-ctitle">{item.title}</h3>
                  <p className="ac-desc">{item.description}</p>
                </div>

                <div className="ac-corner-br" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Achievements;