import { useEffect, useRef } from 'react';
import './Projects.css';

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
      { threshold: 0.2 }
    );

    const animatedElements = document.querySelectorAll('.project-animate');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const projects = [
    { 
      title: 'E-Commerce Platform', 
      desc: 'A full-stack e-commerce solution with user authentication, product management, and secure payment integration.',
      tech: ['React', 'Django', 'MongoDB'],
      category: 'Web App',
      color: 'blue',
      link: 'https://github.com/jaiganesh2108/Robinkart'
    },
    { 
      title: 'Task Management System', 
      desc: 'Real-time collaboration app with task assignment, progress tracking, and team communication features.',
      tech: ['Firebase', 'Futter', 'Material UI'],
      category: 'Productivity',
      color: 'purple',
      link: 'https://github.com/jaiganesh2108/To_Do_List-flutter-app'
    },
    { 
      title: 'Portfolio Website', 
      desc: 'A modern, responsive portfolio showcasing projects and skills with interactive elements and animations.',
      tech: ['React', 'Vite', 'CSS3', 'Framer Motion'],
      category: 'Frontend',
      color: 'teal',
      link: 'https://github.com/jaiganesh2108/myportfolio'
    },
    { 
      title: 'AI Market Place', 
      desc: 'Real-time cryptocurrency market data visualization with historical price charts AI models and personalized watchlists.',
      tech: ['React', 'Chart.js','Web3.py', 'Python'],
      category: 'Finance',
      color: 'amber',
      link: 'https://github.com/jaiganesh2108/edu-dapp'
    },
    { 
      title: 'AI Blog Generator', 
      desc: 'The AI Blog Generator is a smart web app that generates high-quality blog posts from YouTube video links using OpenAI GPT models and a Django (Python) backend.',
      tech: ['HTML', 'CSS', 'Django', 'Python'],
      category: 'AI/ML',
      color: 'blue',
      link: 'https://github.com/jaiganesh2108/AI-Blog-Generator'
    },
    { 
      title: 'Starfire AI', 
      desc: 'A personal assistent for assisting daily activities, monitering students for their self growth and learning. I already have a unique code which will be helpfull for developers to build from scratch.',
      tech: ['OpenAI API', 'Desktop', 'Python'],
      category: 'AI',
      color: 'purple',
      link: 'https://github.com/jaiganesh2108/starfire'
    }
  ];

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="decorative-elements">
        <div className="decorative-circle1"></div>
        <div className="decorative-circle2"></div>
        <div className="decorative-circle3"></div>
      </div>

      <div className="projects-container">
        <h2 className="projects-title project-animate">
          <span className="header-line">
            <div className="line-decoration left"></div>
            <span className="header-subtitle">Featured Work</span>
            <div className="line-decoration right"></div>
          </span>
          <span className="title-gradient">My Projects</span>
        </h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.title} 
              className={`project-card project-animate ${project.color}-card`} 
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="project-content">
                <div className="project-header">
                  <span className={`project-category ${project.color}-text`}>{project.category}</span>
                  <h3 className={`project-title ${project.color}-gradient`}>{project.title}</h3>
                </div>
                
                <p className="project-desc">{project.desc}</p>
                
                <div className="project-footer">
                  <div className="project-tech">
                    {project.tech.map((tech, i) => (
                      <span key={i} className={`tech-tag ${project.color}-tag`}>{tech}</span>
                    ))}
                  </div>
                  
                  <a href={project.link} className={`project-link ${project.color}-link`}>
                    <span>View Project</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="link-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className={`card-glow ${project.color}-glow`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;