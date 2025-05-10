import { FaGithub } from 'react-icons/fa';
import './GitHub.css';

const GitHub = () => (
  <section id="github" className="github">
    <div className="github-container">
      <h2 className="github-title">My GitHub</h2>
      <p className="github-text">Explore my open-source projects and contributions!</p>
      <a href="https://github.com/yourusername" className="github-link">
        <FaGithub className="github-icon" /> Visit My GitHub
      </a>
    </div>
  </section>
);

export default GitHub;