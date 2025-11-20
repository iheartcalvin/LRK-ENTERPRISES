import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const loadProjects = () => {
    const saved = localStorage.getItem('lrk-projects');
    if (saved) setProjects(JSON.parse(saved));
  };

  useEffect(() => {
    loadProjects();
    window.addEventListener('storage', loadProjects);
    return () => window.removeEventListener('storage', loadProjects);
  }, []);

  const categories = {};
  projects.forEach(p => {
    const cat = p.category || 'Uncategorized';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(p);
  });

  const order = ['Electronic Parts Supply', 'Fabrication Services', 'Repair & Maintenance', 'Tech Manufacturing'];

  return (
    <div id="projects" className="projects-section">
      <h1 className="neon-reveal" style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px'}}>Our Portfolio</h1>

      {order.map(cat => {
        const items = categories[cat] || [];
        if (items.length === 0) return null;

        return (
          <div key={cat} className="category-group">
            <h2 className="cat-title">{cat}</h2>
            <div className="projects-grid">
              {items.map((p) => (
                <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
              ))}
            </div>
          </div>
        );
      })}

      {/* FLOATING MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>
              <div className="modal-slider">
                <ImageSlider images={selectedProject.images} />
              </div>
              <div className="modal-details">
                <h2>{selectedProject.title}</h2>
                <div className="meta-tags">
                  {selectedProject.location && <span className="tag loc">📍 {selectedProject.location}</span>}
                  {selectedProject.date && <span className="tag date">📅 {selectedProject.date}</span>}
                </div>
                <p className="full-desc">{selectedProject.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, onClick }) {
  const images = project.images && project.images.length > 0 ? project.images : [];
  return (
    <div className="project-card" onClick={onClick}>
      <div className="card-image-wrapper">
         {images.length > 0 ? (
           <img src={images[0]} alt={project.title} />
         ) : (
           <div className="placeholder">No Image</div>
         )}
         {images.length > 1 && <span className="slide-indicator">+{images.length - 1}</span>}
      </div>
      <div className="card-info">
        <h3>{project.title}</h3>
        {project.location && <small className="subtle-loc">📍 {project.location}</small>}
        <p className="subtle-desc">{project.desc ? project.desc.substring(0, 60) + '...' : ''}</p>
      </div>
    </div>
  );
}

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return <div className="no-img">No Images</div>;

  const next = () => setCurrent(current === images.length - 1 ? 0 : current + 1);
  const prev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);

  return (
    <div className="slider-container">
      <img src={images[current]} alt="slide" className="main-slide" />
      {images.length > 1 && (
        <>
          <button className="nav-btn left" onClick={prev}>❮</button>
          <button className="nav-btn right" onClick={next}>❯</button>
          <div className="dots">
            {images.map((_, i) => (
              <span key={i} className={i === current ? "dot active" : "dot"} onClick={() => setCurrent(i)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Projects;