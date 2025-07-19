import { useState, useEffect, useRef } from 'react';
import profileImg1 from './assets/profile2.jpg';
import './AboutMe.css';

const AboutMe = () => {
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const vantaRef = useRef(null);
  const fullName = "Jai Ganesh H";

  const skills = [
    "Full-stack Development",
    "Python Backend Development",
    "Mobile App Development",
    "Python Development",
    "AI/ML Development",
    "UI/UX Design",
  ];

  // Initialize Vanta.js Globe effect
  useEffect(() => {
    let vantaEffect = null;
    const loadVanta = async () => {
      if (window.VANTA && vantaRef.current) {
        vantaEffect = window.VANTA.GLOBE({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x111827,
          color: 0x3b82f6,
          color2: 0xa855f7,
          size: 1.2,
          spacing: 20
        });
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

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

  // Detect when section is in viewport and cycle skills
  useEffect(() => {
    setIsVisible(true);
    
    const cycleSkills = setInterval(() => {
      setActiveSkillIndex((prev) => (prev + 1) % skills.length);
    }, 2500);
    
    return () => clearInterval(cycleSkills);
  }, []);

  return (
    <div id="home" className="about-me-container" ref={vantaRef}>
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
              With expertise in fullstack development, mobile apps, blockchain, and AI/ML, I love creating
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
                    <span className="skill-name">{skill}</span>: {index === activeSkillIndex ? '"<🔥>"' : '"Proficient"'},
                  </div>
                ))}
                <div className="code-line">{`}`};</div>
              </div>
            </div>
          </div>
          
          {/* Right side - Profile Image */}
          <div className="profile-image animation-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="image-container">
              {/* Glowing effect in background */}
              <div className="image-glow"></div>
              
         
              
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;