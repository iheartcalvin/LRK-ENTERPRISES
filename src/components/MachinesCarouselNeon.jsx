import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MachinesCarouselNeon.css";

export default function MachinesCarouselNeon() {
  // machines array is now a state initialized as empty
  const [machines, setMachines] = useState([]); 
  const [index, setIndex] = useState(0);

  // --- DYNAMIC DATA LOADING ---
  const loadMachines = () => {
    // Load all carousel items and filter for 'Machines'
    const savedCarousels = JSON.parse(localStorage.getItem('lrk-carousels') || '[]');
    const machineItems = savedCarousels.filter(c => c.category === 'Machines');
    setMachines(machineItems);
    
    // Reset index if the data changed and the current index is out of bounds
    if (machineItems.length > 0 && index >= machineItems.length) {
      setIndex(0);
    }
  };

  useEffect(() => {
    loadMachines(); 
    // Listen for changes from Admin panel
    window.addEventListener('storage', loadMachines); 
    return () => window.removeEventListener('storage', loadMachines);
  }, [index]); // Depend on index to update carousel when data is loaded/changed

  // --- CAROUSEL LOGIC ---
  const next = () => setIndex((i) => (i + 1) % machines.length);
  const prev = () =>
    setIndex((i) => (i - 1 + machines.length) % machines.length);

  useEffect(() => {
    if (machines.length > 0) {
        const auto = setInterval(next, 6000);
        return () => clearInterval(auto);
    }
  }, [machines]);

  const current = machines[index] || {};

  if (machines.length === 0) {
    return (
        <section id="machines-fab" className="machines-carousel-section">
            <h2 className="machines-title">Tech Manufacturing Showcase</h2>
            <p className="empty-state">No machines have been added to the carousel yet. Check the Admin Panel.</p>
        </section>
    );
  }

  return (
    <section id="machines-fab" className="machines-carousel-section">
      <h2 className="machines-title">Tech Manufacturing Showcase</h2>
      
      <div className="machines-carousel-wrapper">
        {/* IMAGE */}
        <AnimatePresence mode="wait">
        <motion.div
          key={current.image}
          className="machines-image-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.img
            src={current.image}
            alt={current.name}
            className="machines-img"
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
        </motion.div>
        </AnimatePresence>

        <button className="machines-nav prev" onClick={prev}>‹</button>
        <button className="machines-nav next" onClick={next}>›</button>
      </div>

      {/* INFO */}
      <AnimatePresence mode="wait">
      <motion.div
        key={current.name + '-info'}
        className="machines-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3>{current.name}</h3>
        <p>{current.desc}</p>
      </motion.div>
      </AnimatePresence>

      {/* THUMBNAILS */}
      <div className="machines-thumbs">
        {machines.map((machine, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`machines-thumb-btn ${index === i ? "active" : ""}`}
          >
            <img src={machine.image} alt="thumb" />
          </button>
        ))}
      </div>

      {/* DOTS */}
      <div className="machines-dots">
        {machines.map((_, i) => (
          <div
            key={i}
            className={`machines-dot ${index === i ? "active" : ""}`}
          />
        ))}
      </div>

    </section>
  );
}