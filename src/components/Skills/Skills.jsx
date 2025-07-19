import { useEffect, useRef } from 'react';
import './Skills.css';

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
      { threshold: 0.2 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const skillCategories = [
    {
      title: '</> Languages',
      icons: 'python,js,ts,kotlin,dart,cpp,solidity',
      alt: 'Programming Languages',
      description: 'Building blocks of digital innovation',
      color: 'blue'
    },
    {
      title: '🧑🏻‍💻 Frontend & Backend',
      icons: 'react,django,flutter,nodejs,express,androidstudio,firebase',
      alt: 'Frontend & Backend Frameworks',
      description: 'Crafting experiences, powering functionality',
      color: 'purple'
    },
    {
      title: '🌐 Database & DevOps',
      icons: 'mongodb,sqlite,postgres,docker,jenkins,github,git',
      alt: 'Database & DevOps Tools',
      description: 'Storing data, streamlining deployment',
      color: 'teal'
    },
    {
      title: '🧠 AI/ML/DS',
      icons: 'tensorflow,pytorch,numpy,pandas,scikitlearn,opencv',
      alt: 'AI/ML/Data Science Tools',
      description: 'Intelligence through data and algorithms',
      color: 'emerald'
    },
    {
      title: '🛠️ Tools & Platforms',
      icons: 'vscode,figma,postman,ubuntu,linux',
      alt: 'Tools & Platforms',
      description: 'Essential gear for modern development',
      color: 'amber'
    },
  ];

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      {/* Animated background elements */}
      <div className="background-elements">
        <div className="tech-particle-field"></div>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="background-circle"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              opacity: Math.random() * 0.3 + 0.1,
              background: i % 4 === 0 
                ? 'rgba(59, 130, 246, 0.15)' 
                : i % 4 === 1 
                  ? 'rgba(168, 85, 247, 0.15)' 
                  : i % 4 === 2
                    ? 'rgba(20, 184, 166, 0.15)'
                    : 'rgba(16, 185, 129, 0.15)',
              transform: 'translate(-50%, -50%)',
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        <div className="decorative-circle1"></div>
        <div className="decorative-circle2"></div>
        <div className="decorative-circle3"></div>
        <div className="decorative-circle4"></div>
      </div>

      <div className="cosmic-trail">
        <div className="cosmic-trail-line"></div>
      </div>

      <div className="skills-container">
        <h2 className="skills-title animate-on-scroll">
          <span className="header-line">
            <div className="line-decoration left"></div>
            <span className="header-subtitle">My Expertise</span>
            <div className="line-decoration right"></div>
          </span>
          <span className="title-gradient">Technology Arsenal</span>
        </h2>
        
        <div className="skills-wrapper">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className={`category-section category-${category.color} animate-on-scroll`} 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="category-content">
                <h3 className="category-title">
                  <span className={`title-text ${category.color}-gradient`}>{category.title}</span>
                  <span className={`title-underline ${category.color}-underline`}></span>
                </h3>
                <p className="category-description">{category.description}</p>
                
                <div className="skills-grid">
                  <div className="icon-container">
                    <div className={`icon-glow ${category.color}-glow`}></div>
                    <img
                      src={`https://skillicons.dev/icons?i=${category.icons}&perline=7&theme=dark`}
                      alt={category.alt}
                      className={`skills-icon-row ${category.color}-shadow`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              
              <div className={`category-backdrop ${category.color}-backdrop`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;