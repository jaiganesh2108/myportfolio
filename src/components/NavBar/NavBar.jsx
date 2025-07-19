import React, { useState, useEffect } from 'react';
import './NavBar.css';

const NavBar = () => {
  const sections = ['Home', 'Skills', 'Projects', 'Achievements', 'Education', 'GitHub', 'Connect'];
  
  // State for handling scroll effects
  const [scrolled, setScrolled] = useState(false);
  
  // State for handling mobile menu
  const [expanded, setExpanded] = useState(false);
  
  // State for active section
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Add scrolled class when page is scrolled
      setScrolled(window.scrollY > 50);
      
      // Find active section based on scroll position
      const currentPos = window.scrollY + 100;
      
      sections.forEach(section => {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            currentPos >= offsetTop &&
            currentPos < offsetTop + offsetHeight
          ) {
            setActiveSection(section.toLowerCase());
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setExpanded(!expanded);
  };
  
  // Handle link click (for mobile menu closing)
  const handleLinkClick = () => {
    if (expanded) {
      setExpanded(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${expanded ? 'navbar-expanded' : ''}`}>
      <div className="navbar-container">
        <h1 className="navbar-title">JG</h1>
        
        {/* Mobile menu toggle button */}
        <button 
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label={expanded ? 'Close menu' : 'Open menu'}
        >
          {expanded ? '✕' : '☰'}
        </button>
        
        <div className="navbar-links">
          {sections.map((section) => (
            <a 
              key={section} 
              href={`#${section.toLowerCase()}`} 
              className={`navbar-link ${activeSection === section.toLowerCase() ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              {section}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;