import universityImg from './assets/university.jpg';
import highschoolImg from './assets/highschool.jpg';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Share+Tech+Mono&family=Barlow:wght@400;500&display=swap');

  :root {
    --acid: #CCFF00;
    --black: #0A0A0A;
    --panel: #161616;
    --panel2: #1C1C1C;
    --border: #2A2A2A;
    --muted: #666666;
    --white: #F0F0F0;
  }

  .ed-root {
    background: var(--black);
    padding: 5rem 2rem;
    font-family: 'Barlow', sans-serif;
    color: var(--white);
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }

  /* Watermark */
  .ed-bg-wm {
    position: absolute;
    bottom: -2rem;
    right: -1rem;
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
  .ed-corner-tl {
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
  .ed-container {
    max-width: 860px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  /* Header */
  .ed-head {
    margin-bottom: 3rem;
  }

  .ed-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--acid);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    opacity: 0.85;
  }

  .ed-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: var(--white);
  }

  .ed-title span {
    color: var(--acid);
  }

  .ed-divider {
    width: 60px;
    height: 2px;
    background: var(--acid);
    margin-top: 1.2rem;
    opacity: 0.6;
  }

  /* Timeline */
  .ed-timeline {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* Connector between cards */
  .ed-connector {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;
  }

  .ed-conn-line {
    width: 1px;
    height: 60px;
    background: var(--border);
    position: relative;
  }

  .ed-conn-line::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: var(--acid);
    border: 2px solid var(--black);
  }

  /* Card */
  .ed-card {
    background: var(--black);
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: background 0.25s, border-color 0.25s, opacity 0.6s ease, transform 0.6s ease;
    opacity: 0;
    transform: translateY(24px);
  }

  .ed-card.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .ed-card:hover {
    background: var(--panel);
    border-color: rgba(204, 255, 0, 0.2);
  }

  /* Acid top sweep */
  .ed-card::before {
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

  .ed-card:hover::before {
    transform: scaleX(1);
  }

  /* Image area */
  .ed-img-wrap {
    position: relative;
    height: 200px;
    overflow: hidden;
    background: var(--panel2);
    flex-shrink: 0;
  }

  .ed-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(40%) contrast(1.05);
    transition: transform 0.5s ease, filter 0.4s ease;
  }

  .ed-card:hover .ed-img-wrap img {
    transform: scale(1.04);
    filter: grayscale(10%) contrast(1.1);
  }

  .ed-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(10, 10, 10, 0.9));
  }

  /* Year badge on image */
  .ed-year-badge {
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
  .ed-body {
    padding: 1.5rem 1.75rem 1.75rem;
  }

  .ed-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.85rem;
  }

  .ed-idx {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: rgba(204, 255, 0, 0.3);
    letter-spacing: 0.15em;
  }

  .ed-type {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid var(--border);
    padding: 0.2rem 0.5rem;
    transition: border-color 0.25s, color 0.25s;
  }

  .ed-card:hover .ed-type {
    border-color: rgba(204, 255, 0, 0.3);
    color: var(--acid);
  }

  /* Degree title */
  .ed-degree {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.55rem;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: var(--white);
    margin-bottom: 0.4rem;
    line-height: 1.05;
  }

  /* School row */
  .ed-school-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-bottom: 1.2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }

  .ed-school-name {
    font-family: 'Barlow', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--white);
  }

  .ed-school-loc {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* Section label */
  .ed-section-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: rgba(204, 255, 0, 0.4);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }

  /* Course tags */
  .ed-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.2rem;
  }

  .ed-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: rgba(204, 255, 0, 0.6);
    letter-spacing: 0.07em;
    text-transform: uppercase;
    border: 1px solid rgba(204, 255, 0, 0.15);
    padding: 0.18rem 0.5rem;
    transition: border-color 0.2s, color 0.2s;
  }

  .ed-card:hover .ed-tag {
    border-color: rgba(204, 255, 0, 0.3);
    color: var(--acid);
  }

  /* Highlights */
  .ed-highlights {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .ed-highlight {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    color: var(--muted);
    letter-spacing: 0.05em;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  .ed-highlight::before {
    content: '—';
    color: rgba(204, 255, 0, 0.4);
    flex-shrink: 0;
  }

  /* Corner bracket */
  .ed-corner-br {
    position: absolute;
    bottom: 0.85rem;
    right: 0.85rem;
    width: 14px;
    height: 14px;
    border-bottom: 1.5px solid rgba(204, 255, 0, 0.12);
    border-right: 1.5px solid rgba(204, 255, 0, 0.12);
    transition: border-color 0.25s;
  }

  .ed-card:hover .ed-corner-br {
    border-color: var(--acid);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .ed-root {
      padding: 3.5rem 1.25rem;
    }

    .ed-title {
      font-size: clamp(2.2rem, 9vw, 3.5rem);
    }

    .ed-img-wrap {
      height: 160px;
    }

    .ed-school-row {
      flex-direction: column;
      gap: 0.2rem;
    }
  }
`;

const educationData = [
  {
    idx: '01',
    type: 'Secondary Education',
    degree: 'Schooling',
    school: 'St Johns Matriculation School',
    location: 'Thirunindravur, Chennai',
    years: '2016 — 2023',
    image: highschoolImg,
    imageAlt: 'High School Campus',
    coursework: ['Python', 'C++', 'HTML', 'Computer Basics', 'Adv. Mathematics'],
    highlights: [
      'Graduated with Honors (80%)',
      'Passionate about CS & Innovation',
      'Built beginner-level projects',
    ],
  },
  {
    idx: '02',
    type: 'Undergraduate',
    degree: 'B.E Computer Science Eng.',
    school: 'Jaya Engineering College',
    location: 'Thiruninravur, Chennai',
    years: '2023 — 2027',
    image: universityImg,
    imageAlt: 'University Campus',
    coursework: ['Full-Stack Dev', 'AIML Development', 'Blockchain', 'Smart Contracts'],
    highlights: [
      'SIH 2024 Finalist',
      'Participated in Hackathons',
      'Building AI Models',
    ],
  },
];

const Education = () => {
  return (
    <>
      <style>{styles}</style>
      <section id="education" className="ed-root">
        <div className="ed-bg-wm">EDUCATION</div>
        <div className="ed-corner-tl" />

        <div className="ed-container">
          <div className="ed-head">
            <div className="ed-label">// 06 — Learning Journey</div>
            <h2 className="ed-title">EDUCA<span>TION</span></h2>
            <div className="ed-divider" />
          </div>

          <div className="ed-timeline">
            {educationData.map((item, i) => (
              <>
                <div key={item.idx} className="ed-card in-view">
                  {/* Image */}
                  <div className="ed-img-wrap">
                    <img src={item.image} alt={item.imageAlt} />
                    <div className="ed-img-overlay" />
                    <span className="ed-year-badge">{item.years}</span>
                  </div>

                  {/* Body */}
                  <div className="ed-body">
                    <div className="ed-card-top">
                      <span className="ed-idx">// {item.idx}</span>
                      <span className="ed-type">{item.type}</span>
                    </div>

                    <h3 className="ed-degree">{item.degree}</h3>

                    <div className="ed-school-row">
                      <span className="ed-school-name">{item.school}</span>
                      <span className="ed-school-loc">{item.location}</span>
                    </div>

                    <div className="ed-section-label">// Coursework</div>
                    <div className="ed-tags">
                      {item.coursework.map((c) => (
                        <span key={c} className="ed-tag">{c}</span>
                      ))}
                    </div>

                    <div className="ed-section-label">// Highlights</div>
                    <div className="ed-highlights">
                      {item.highlights.map((h) => (
                        <span key={h} className="ed-highlight">{h}</span>
                      ))}
                    </div>
                  </div>

                  <div className="ed-corner-br" />
                </div>

                {/* Connector between cards */}
                {i < educationData.length - 1 && (
                  <div className="ed-connector">
                    <div className="ed-conn-line" />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;