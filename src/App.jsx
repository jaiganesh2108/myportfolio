import NavBar from './components/NavBar/NavBar';
import AboutMe from './components/AboutMe/AboutMe';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Achievements from './components/Achievements/Achievements';
import Education from './components/Education/Education';
import GitHub from './components/GitHub/GitHub';
import Connect from './components/Connect/Connect';
import CanvasCursor from './components/CanvasCursor/CanvasCursor';
import './index.css';

function App() {
  return (
    <div>
      <CanvasCursor />
      <NavBar />
      <AboutMe />
      <Skills />
      <Projects />
      <Achievements />
      <Education />
      <GitHub />
      <Connect />
    </div>
  );
}

export default App;