// src/App.js
import './App.css';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import SideBar from './components/SideBar';
import Skill from './components/Skill';
import Tools from './components/Tools';
import Head from './Head.jsx';
import Foot from './components/Foot';
import RoomDryerExtended from './components/RoomDryerExtended';
import FabricationServicesNeon from './components/FabricationServicesNeon';
import RepairMaintenanceNeon from './components/RepairMaintenanceNeon';
import TechManufacturingNeon from './components/TechManufacturingNeon';
import { useFadeIn } from './hooks/useFadeIn.js';
import { useScrollAnimation } from './hooks/useScrollAnimation.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

function App() {
  useScrollAnimation();
  const aboutRef = useFadeIn();

  return (
    <Router>
      <Routes>
        {/* MAIN APP ROUTE */}
        <Route path="/" element={
          <div id='home' className="App">
            <Head />
            <SideBar/>
            
            <div className='Hero'>
              <div className='split'>
                <About />
                <Tools />
              </div>
              <div id="skills" className="scroll-animate fade-left stagger">
                <Skill />
              </div>
            </div>

            {/* SERVICES SHOWCASE */}
            <RoomDryerExtended />
            <TechManufacturingNeon />
            
            <FabricationServicesNeon />
            
            <RepairMaintenanceNeon />

            <div className='experience-page'>
              <Experience />
              <Projects />
            </div>

            <Foot />
            
            {/* This component likely creates the link/button to /admin */}
          </div>
        } />

        {/* ADMIN ROUTE */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;