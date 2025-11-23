import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FabricationCarousel.css";

export default function FabricationCarousel() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  
  // --- DYNAMIC DATA LOADING ---
  const loadFabrications = () => {
    const savedCarousels = JSON.parse(localStorage.getItem('lrk-carousels') || '[]');
    
    // Filter for 'Fabrication' items and map to only get the image URL
    const fabricationItems = savedCarousels
      .filter(c => c.category === 'Fabrication')
      .map(c => c.image); 
      
    setImages(fabricationItems);
    
    if (fabricationItems.length > 0 && index >= fabricationItems.length) {
      setIndex(0);
    }
  };

  useEffect(() => {
    loadFabrications();
    // Listen for changes from Admin panel
    window.addEventListener('storage', loadFabrications); 
    return () => window.removeEventListener('storage', loadFabrications);
  }, [index]);


  // --- CAROUSEL LOGIC ---\n
  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  useEffect(() => {
    if (images.length > 0) {
        const auto = setInterval(next, 3500);
        return () => clearInterval(auto);
    }
  }, [images]);

  if (images.length === 0) {
    return (
        <section className="fab-carousel-section">
            <h2 className="fab-carousel-title">Fabricated Work Showcase</h2>
            <p className="empty-state">No fabrication images have been added to the carousel yet. Check the Admin Panel.</p>
        </section>
    );
  }

  return (
    <section className="fab-carousel-section">
      <h2 className="fab-carousel-title">Fabricated Work Showcase</h2>

      <div className="fab-carousel-wrapper">
        <AnimatePresence mode="wait">
        <motion.img
          key={images[index]} 
          src={images[index]}
          alt="Fabricated sample"
          className="fab-carousel-img"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        />
        </AnimatePresence>

        <button className="fab-nav fab-prev" onClick={prev}>‹</button>
        <button className="fab-nav fab-next" onClick={next}>›</button>
      </div>

      {/* Thumbnails */}
      <div className="fab-thumbs">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`fab-thumb-btn ${index === i ? "active" : ""}`}
          >
            <img src={img} alt={`Thumbnail ${i}`} />
          </button>
        ))}
      </div>
    </section>
  );
}