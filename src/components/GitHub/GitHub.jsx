import { useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import './GitHub.css';

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
      { threshold: 0.2 }
    );

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll') || [];
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="github" className="github" ref={sectionRef}>
      <div className="decorative-elements">
        <div className="decorative-circle1"></div>
        <div className="decorative-circle2"></div>
        <div className="decorative-circle3"></div>
      </div>

      <div className="github-container">
        <h2 className="github-title animate-on-scroll">
          <span className="header-line">
            <div className="line-decoration left"></div>
            <span className="header-subtitle">Open Source</span>
            <div className="line-decoration right"></div>
          </span>
          <span className="title-gradient">My GitHub Journey</span>
        </h2>
        <p className="github-text animate-on-scroll">
          Explore my open-source projects and contributions!
        </p>

        <div className="github-stats-grid">
          <div className="stats-card animate-on-scroll">
            <div className="card-glow"></div>
            <img
              src="https://github-readme-stats.vercel.app/api?username=jaiganesh2108&theme=radical&show_icons=true&hide_border=true&count_private=true&bg_color=0d1117&title_color=A855F7&icon_color=C084FC&text_color=ffffff"
              alt="GitHub Stats"
              className="stats-image"
              loading="lazy"
            />
          </div>
          <div className="stats-card animate-on-scroll">
            <div className="card-glow"></div>
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=jaiganesh2108&theme=radical&hide_border=true&background=0d1117&stroke=A855F7&ring=C084FC&fire=C084FC&currStreakNum=A855F7&sideNums=A855F7&currStreakLabel=A855F7&sideLabels=A855F7&dates=ffffff"
              alt="GitHub Streak"
              className="stats-image"
              loading="lazy"
            />
          </div>
          <div className="stats-card animate-on-scroll">
            <div className="card-glow"></div>
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs?username=jaiganesh2108&show_icons=true&locale=en&layout=compact&theme=midnight-purple&hide_border=true&bg_color=0d1117&title_color=00C4B4&text_color=ffffff"
              alt="Top Languages"
              className="stats-image"
              loading="lazy"
            />
          </div>
          <div className="stats-card full-width animate-on-scroll">
            <div className="card-glow"></div>
            <a href="https://github.com/jaiganesh2108/jaiganesh2108">
              <img
                src="https://github-readme-activity-graph.vercel.app/graph?username=jaiganesh2108&bg_color=0d1117&color=A855F7&line=C084FC&point=ffffff&area=true&hide_border=true&custom_title=Contribution%20Timeline"
                alt="Contribution Timeline"
                className="stats-image"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        <a
          href="https://github.com/jaiganesh2108"
          className="github-link animate-on-scroll"
        >
          <FaGithub className="github-icon" /> Visit My GitHub
        </a>
      </div>
    </section>
  );
};

export default GitHub;