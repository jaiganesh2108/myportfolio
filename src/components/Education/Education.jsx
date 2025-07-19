import './Education.css';
import universityImg from './assets/university.jpg'; // Import university image
import highschoolImg from './assets/highschool.jpg'; // Import high school image

const Education = () => {
  return (
    <section id="education" className="education">
      <div className="decorative-elements">
        <div className="decorative-circle1"></div>
        <div className="decorative-circle2"></div>
      </div>
      
      <div className="education-container">
        <div className="header-section">
          <div className="header-line">
            <div className="line-decoration left"></div>
            <span className="header-subtitle">MY LEARNING JOURNEY</span>
            <div className="line-decoration right"></div>
          </div>
          <h2 className="education-title">
            <span className="title-gradient">Educational Background</span>
          </h2>
        </div>
        
        <div className="education-timeline">
          <div className="education-card blue-card education-animate in-view">
            <div className="card-glow blue-glow"></div>
            <div className="education-content">
              <div className="education-image-container">
                <img 
                  src={highschoolImg} // Use imported high school image
                  alt="High School Campus" 
                  className="education-image"
                />
                <div className="education-image-overlay"></div>
              </div>
              <span className="education-year blue-tag">2016 - 2023</span>
              <h3 className="education-degree blue-gradient">Schooling</h3>
              <p className="education-school">
                <span className="school-name">St Johns Matriculation School</span>
                <span className="school-location">Thirunindravur, Chennai</span>
              </p>
              <div className="education-details">
                <h4 className="coursework-title">Key Coursework:</h4>
                <div className="coursework-tags">
                  <span className="course-tag">Python</span>
                  <span className="course-tag">C++</span>
                  <span className="course-tag">HTML</span>
                  <span className="course-tag">Computer Basics</span>
                  <span className="course-tag">Advanced Mathematics</span>
                </div>
              </div>
              <div className="education-achievements">
                <p>• Graduated with Honors (80%)</p>
                <p>• Passionate About Computer Science & Innovation </p>
                <p>• Built Some Beginner-Level Projects</p>
              </div>
            </div>
          </div>
          
          <div className="timeline-connector"></div>
          
          <div className="education-card purple-card education-animate in-view">
            <div className="card-glow purple-glow"></div>
            <div className="education-content">
              <div className="education-image-container">
                <img 
                  src={universityImg} // Use imported university image
                  alt="University Campus" 
                  className="education-image"
                />
                <div className="education-image-overlay"></div>
              </div>
              <span className="education-year purple-tag">2023 - 2027</span>
              <h3 className="education-degree purple-gradient">B.E Computer Science Engineering</h3>
              <p className="education-school">
                <span className="school-name">Jaya Engineering College</span>
                <span className="school-location">Thiruninravur, Chennai</span>
              </p>
              <div className="education-details">
                <h4 className="coursework-title">Focus Areas:</h4>
                <div className="coursework-tags">
                  <span className="course-tag">Computer Programming</span>
                  <span className="course-tag">Full-Stack Development</span>
                  <span className="course-tag">AIML Development</span>
                  <span className="course-tag">Blockchain & Smart Contracts</span>
                </div>
              </div>
              <div className="education-achievements">
                <p>• Participated in Hackathons</p>
                <p>• SIH 2024 Finalist</p>
                <p>• Building AI Models</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;