import { useState, useEffect } from 'react';
import profileImg1 from './assets/profile1.jpg';
import './AboutMe.css';

const AboutMe = () => {
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullName = "Jai Ganesh H";

  const skills = [
    "Fullstack Development",
    "Mobile Apps",
    "Blockchain",
    "AI & Machine Learning",
    "UI/UX Design",
    "Cloud Computing"
  ];

  // Typing animation effect
  useEffect(() => {
    if (isVisible) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullName.length) {
          setTypedText(fullName.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Detect when section is in viewport
  useEffect(() => {
    setIsVisible(true);
    
    const cycleSkills = setInterval(() => {
      setActiveSkillIndex((prev) => (prev + 1) % skills.length);
    }, 2500);
    
    return () => clearInterval(cycleSkills);
  }, []);

  return (
    <div id="home" className="about-me-container">
      {/* Animated background elements */}
      <div className="background-elements">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="background-circle"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              opacity: 0.4,
              transform: 'translate(-50%, -50%)',
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="main-content">
        <div className="content-wrapper">
          
          {/* Left side - Content */}
          <div className="content-left animation-fade-in" style={{ animationDelay: '0.3s' }}>
            {/* Header */}
            <div className="header">
              <div className="header-line">
                <div className="line-decoration"></div>
                <span className="header-subtitle">Welcome to my portfolio</span>
              </div>
              
              <h1 className="main-title">
                Hi, I'm <span className="name-highlight">{typedText}</span>
                <span className="blink-cursor"></span>
              </h1>
              
              <h2 className="sub-title">
                <span>I specialize in </span>
                <span className="skill-highlight">
                  <span className="skill-text">{skills[activeSkillIndex]}</span>
                  <span className="skill-underline"></span>
                </span>
              </h2>
            </div>
            
            {/* Description */}
            <p className="description">
              Hello! I'm Jaiganesh, a passionate Computer Science Engineering student and developer.
              With expertise in fullstack development, mobile apps, blockchain, and AI, I love creating
              innovative solutions to real-world problems. My curiosity and commitment to learning drive
              me to explore the frontiers of technology.
            </p>
            
            {/* Skills showcase */}
            <div className="skills-container">
              <div className="skills-header">
                <div className="traffic-lights">
                  <div className="light red"></div>
                  <div className="light yellow"></div>
                  <div className="light green"></div>
                </div>
                <span className="skills-filename">skills.js</span>
              </div>
              
              <div className="skills-code">
                <div className="code-line">const <span className="code-variable">skills</span> = {`{`}</div>
                {skills.map((skill, index) => (
                  <div 
                    key={skill} 
                    className={`code-skill ${activeSkillIndex === index ? 'active-skill' : ''}`}
                  >
                    <span className="skill-name">{skill}</span>: {index === activeSkillIndex ? '"Advanced"' : '"Proficient"'},
                  </div>
                ))}
                <div className="code-line">{`}`};</div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="action-buttons">
              <a href="/resume.pdf" download className="resume-button">
                <div className="button-glow"></div>
                <button className="button-content">
                  <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download Resume</span>
                </button>
              </a>
              
              {/* Social icons */}
              <div className="social-icons">
                {[
                  { name: "GitHub", icon: (
                    <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.729.082-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.832 2.81 1.304 3.495.997.108-.775.418-1.304.76-1.604-2.665-.3-5.467-1.333-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.302-.54-1.52.105-3.175 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 6 0c2.295-1.552 3.3-1.23 3.3-1.23.645 1.655.24 2.873.12 3.175.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.825 1.096.825 2.22v3.293c0 .32.21.694.825.577C20.565 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  )},
                  { name: "LinkedIn", icon: (
                    <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )},
                  { name: "Twitter", icon: (
                    <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                    </svg>
                  )},
                  { name: "Instagram", icon: (
                    <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  )}
                ].map((platform) => (
                  <a 
                    key={platform.name} 
                    href="#" 
                    className="social-link"
                    aria-label={platform.name}
                  >
                    <div className="social-glow"></div>
                    <div className="social-content">
                      {platform.icon}
                    </div>
                    <span className="social-tooltip">
                      {platform.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right side - Profile Image */}
          <div className="profile-image animation-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="image-container">
              {/* Glowing effect in background */}
              <div className="image-glow"></div>
              
              {/* Decorative elements */}
              <div className="decorative-circle1"></div>
              <div className="decorative-circle2"></div>
              
              {/* Image container */}
              <div className="image-wrapper">
                <div className="image-inner">
                  <div className="image-content">
                    <img 
                      src={profileImg1}
                      alt="Jai Ganesh Portrait" 
                      className="profile-img"
                    />
                  </div>
                </div>
              </div>
              
              {/* Tech bubbles floating around */}
              {[
                { name: "React", top: "-10%", left: "20%", delay: "0s" },
                { name: "Node.js", top: "70%", left: "95%", delay: "1s" },
                { name: "Python", top: "100%", left: "75%", delay: "2s" },
                { name: "Flutter", top: "8%", left: "85%", delay: "3s" }
              ].map((tech, index) => (
                <div 
                  key={tech.name}
                  className="tech-bubble animate-float"
                  style={{ 
                    top: tech.top, 
                    left: tech.left, 
                    animationDelay: tech.delay
                  }}
                >
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;