import { useEffect, useRef } from 'react';
import './Achievements.css';

const Achievements = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('achievement-in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const animatedElements = document.querySelectorAll('.achievement-animate');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const achievements = [
    {
      title: '1st Place at TechCrunch Hackathon 2024',
      description: 'Created an AI-powered solution that revolutionizes how developers document their code, winning the grand prize among 120+ teams.',
      image: '/api/placeholder/800/450',
      date: 'June 2024',
      badge: 'Gold Award'
    },
    {
      title: 'Best UI/UX Award at CodeFest 2023',
      description: 'Developed an intuitive and accessible interface for a healthcare application that stood out for its innovation and user-centered design.',
      image: '/api/placeholder/800/450',
      date: 'October 2023',
      badge: 'UI/UX Award'
    },
    {
      title: 'Published Open-Source Library on npm',
      description: 'Released a React component library with over 2,000 stars on GitHub and 50,000+ weekly downloads, contributing to the developer community.',
      image: '/api/placeholder/800/450',
      date: 'January 2023',
      badge: 'Open Source'
    }
  ];

  return (
    <section id="achievements" className="achievements" ref={sectionRef}>
      <div className="achievements-decorative-elements">
        <div className="achievements-decorative-circle1"></div>
        <div className="achievements-decorative-circle2"></div>
      </div>

      <div className="achievements-container">
        <h2 className="achievements-title achievement-animate">
          <span className="achievements-header-line">
            <div className="achievements-line-decoration left"></div>
            <span className="achievements-header-subtitle">Recognition</span>
            <div className="achievements-line-decoration right"></div>
          </span>
          <span className="achievements-title-gradient">Achievements & Hackathons</span>
        </h2>
        
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.title} 
              className="achievement-card achievement-animate" 
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="achievement-content">
                <div className="achievement-image-container">
                  <img src={achievement.image} alt={achievement.title} className="achievement-image" />
                  <div className="achievement-image-overlay"></div>
                </div>
                
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-desc">{achievement.description}</p>
                
                <div className="achievement-footer">
                  <div className="achievement-date">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {achievement.date}
                  </div>
                  <span className="achievement-badge">{achievement.badge}</span>
                </div>
              </div>
              
              <div className="achievement-card-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;