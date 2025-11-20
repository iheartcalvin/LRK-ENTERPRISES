import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./FabricationCarousel.css";

export default function FabricationCarousel() {
  const images = [
    "/room-dryer-large.jpg",
    "/door 1.jpg",
    "/gate.png",
    "/sink.jpg",
    "/barrier.png"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const auto = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(auto);
  }, []);

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  return (
    <section className="fab-carousel-section">
      <h2 className="fab-carousel-title">Fabricated Work Showcase</h2>

      <div className="fab-carousel-wrapper">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Fabricated sample"
          className="fab-carousel-img"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />

        <button className="fab-nav fab-prev" onClick={prev}>‹</button>
        <button className="fab-nav fab-next" onClick={next}>›</button>
      </div>

      {/* Thumbnails */}
      <div className="fab-thumbs">
        {images.map((img, i) => (
          <button
            key={i}
            className={`fab-thumb ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          >
            <img src={img} alt="thumb" />
          </button>
        ))}
      </div>
    </section>
  );
}
