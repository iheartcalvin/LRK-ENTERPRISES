import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./MachinesCarouselNeon.css";

export default function MachinesCarouselNeon() {
  const machines = [
    {
      name: "Room Dryer Machine",
      desc: "High-efficiency industrial dryer designed for agriculture and processing industries.",
      image: "/machines/room-dryer.jpg"
    },
    {
      name: "Automatic Sieving Machine",
      desc: "Precision-grade sieve for sorting and grading agricultural products.",
      image: "/machines/sieving-machine.png"
    },
    {
      name: "Smart Clove Dryer",
      desc: "IoT-enabled drying system for consistent moisture control and automation.",
      image: "/machines/smart-clove-dryer.jpg"
    },
    {
      name: "Packaging & Sealing Unit",
      desc: "Automated sealing and packaging machine for production lines.",
      image: "/machines/packaging-unit.png"
    }
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % machines.length);
  const prev = () =>
    setIndex((i) => (i - 1 + machines.length) % machines.length);

  useEffect(() => {
    const auto = setInterval(next, 6000);
    return () => clearInterval(auto);
  }, []);

  const current = machines[index];

  return (
    <section id="machines-fab" className="machines-carousel-section">
      <h2 className="machines-title">Machines We Manufacture</h2>

      <div className="machines-carousel-wrapper">

        <motion.div
          key={current.image}
          className="machines-img-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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

        <button className="machines-nav prev" onClick={prev}>‹</button>
        <button className="machines-nav next" onClick={next}>›</button>
      </div>

      {/* INFO */}
      <motion.div
        key={current.name}
        className="machines-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3>{current.name}</h3>
        <p>{current.desc}</p>
      </motion.div>

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
            onClick={() => setIndex(i)}
            className={`machines-dot ${i === index ? "active" : ""}`}
          ></div>
        ))}
      </div>
    </section>
  );
}
