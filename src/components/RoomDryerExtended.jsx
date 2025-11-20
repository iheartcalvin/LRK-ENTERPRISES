import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import useScrollGlow from "../hooks/useScrollGlow";
import ContactModal from "./ContactModal";
import "./RoomDryerExtended.css";




export default function RoomDryerExtended() {
  const ref = useRef(null);
  const glow = useScrollGlow(ref);
  const [open, setOpen] = useState(false);

  // Product Images for Viewer
const productImages = [
    "/room-dryer-large.jpg",
    "/room-dryer-side.jpg",
    "/room-dryer-door-open.jpg",
    "/room-dryer-back.jpg"
  ];
  
  const [activeImage, setActiveImage] = useState(productImages[0]);
  

  // Parallax tilt math
  const viewerRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sx: 1 });

  function handlePointerMove(e) {
    const el = viewerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 16; // rotateY
    const rx = -(py - 0.5) * 10; // rotateX
    const sx = 1.02; // slight scale on hover
    setTilt({ rx, ry, sx });
  }

  function resetTilt() {
    setTilt({ rx: 0, ry: 0, sx: 1 });
  }

  // Specs (from the doc you uploaded)
  const specs = [
    { icon: "model", label: "Model", value: "XF500" },
    { icon: "type", label: "Type", value: "Industrial Room Dryer" },
    { icon: "capacity", label: "Capacity", value: "500 Kg / Batch" },
    { icon: "supply", label: "Power Supply", value: "380 VAC, 50 Hz, 3 Phase" },
    { icon: "power", label: "Power Input", value: "7 kW (Max 10 kW)" },
    { icon: "tray", label: "Tray Size", value: "800 × 600 mm" },
    { icon: "trays", label: "Number of Trays", value: "220 pcs" },
    { icon: "dehydration", label: "Dehydration Cap.", value: "20 Liters / Hour" },
    { icon: "temp", label: "Temp. Range", value: "0°C – 350°C" },
    { icon: "material", label: "Material", value: "Stainless Steel SUS304" },
    { icon: "insulation", label: "Insulation", value: "Polyurethane Jacket" },
    { icon: "chamber", label: "Chamber Walls", value: "Stainless Steel 1.5mm" },
    { icon: "operation", label: "Operation", value: "Hot Air Circulation / Dehydration" },
    { icon: "application", label: "Application", value: "Fruits, veg, herbs, spices, grains, industrial" },
  ];

  const whyPoints = [
    {
      title: "Uniform Hot-Air Circulation",
      text: "High-efficiency airflow ensures even drying across all trays, preventing hotspots and preserving quality.",
      icon: "air",
    },
    {
      title: "Food-grade SUS304 Steel",
      text: "Durable, hygienic stainless steel construction for long service life and easy cleaning.",
      icon: "steel",
    },
    {
      title: "Wide Temperature Control",
      text: "Advanced controller lets you set 0–350°C for versatile drying of crops and industrial materials.",
      icon: "temp",
    },
    {
      title: "Energy-efficient Insulation",
      text: "Polyurethane jacket reduces heat loss — lower energy use and faster dry cycles.",
      icon: "insulation",
    },
    {
      title: "Large-capacity Design",
      text: "500 kg per batch and 220 trays for commercial-scale operations.",
      icon: "capacity",
    },
    {
      title: "Low Maintenance",
      text: "Accessible trays and smooth internal finishes make cleaning and upkeep fast and simple.",
      icon: "wrench",
    },
  ];

  return (
    <section ref={ref} className="rde-section">
      {/* subtle scroll-reactive svg (top accent) */}
      <svg className="rde-top-neon" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="rdeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor={`rgba(16,124,16,${0.18 + glow * 0.6})`} />
            <stop offset="60%" stopColor={`rgba(255,45,170,${0.08 + glow * 0.5})`} />
            <stop offset="100%" stopColor={`rgba(16,124,16,${0.18 + glow * 0.6})`} />
          </linearGradient>
        </defs>
        <path
          d="M0,80 C200,10 500,140 1000,40"
          stroke="url(#rdeGrad)"
          strokeWidth={2 + glow * 3}
          fill="none"
          style={{ filter: `blur(${2 + glow * 4}px)`, opacity: 0.3 + glow * 0.6 }}
        />
      </svg>

      <div className="rde-container">
        {/* Left: Viewer */}
        <div className="rde-left">
            <h1 className="rde-title">All new <br></br>Industrial Room Dryer - XF500</h1>
            <p className="rde-subtitle">High-Capacity Hot Air Dehydration for Commercial & Industrial Use</p>
            <motion.div
    className="rde-viewer"
    ref={viewerRef}
    onPointerMove={handlePointerMove}
    onPointerLeave={resetTilt}
    onPointerUp={resetTilt}
    style={{
      transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.sx})`,
    }}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55 }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Background glow */}
    <div className="rde-viewer-glow" aria-hidden />

    {/* ACTIVE IMAGE */}
    <img
      className="rde-dryer-img"
      src={activeImage}
      alt="Room Dryer View"
      draggable={false}
    />

    {/* Rim neon */}
    <div className="rde-rim" aria-hidden />
  </motion.div>

  {/* Thumbnails */}
  <div className="rde-thumbs">
    {productImages.map((img) => (
      <button
        key={img}
        className={`rde-thumb-btn ${activeImage === img ? "active" : ""}`}
        onClick={() => setActiveImage(img)}
      >
        <img src={img} alt="Dryer thumbnail" className="rde-thumb-img" />
      </button>
    ))}
  </div>

  {/* CTA Buttons */}
  <div className="rde-quick">
    <button className="rde-cta" onClick={() => setOpen(true)}>Request Quote</button>
    <button className="rde-cta-outline" onClick={() => setOpen(true)}>Contact</button>
  </div>

        </div>

        {/* Right: Specs & Why Choose */}
        <div className="rde-right">
          <motion.div
            className="rde-specs-card"
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="rde-card-title">Technical Specifications</h3>
            <div className="rde-specs-grid">
              {specs.map((s, i) => (
                <div className="rde-spec-row" key={s.label}>
                  <div className="rde-spec-icon">{renderIcon(s.icon)}</div>
                  <div className="rde-spec-label">{s.label}</div>
                  <div className="rde-spec-value">{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rde-why-card"
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            viewport={{ once: true }}
          >
            <h3 className="rde-card-title">Why Choose Our Dryer?</h3>

            <div className="rde-why-grid">
              {whyPoints.map((w) => (
                <div className="rde-why-item" key={w.title}>
                  <div className="rde-why-icon">{renderIcon(w.icon)}</div>
                  <div>
                    <div className="rde-why-title">{w.title}</div>
                    <div className="rde-why-text">{w.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rde-why-cta">
              <button className="rde-cta" onClick={() => setOpen(true)}>Get Pricing & Specs</button>
              <button className="rde-cta-outline" onClick={() => setOpen(true)}>Request Demo</button>
            </div>
          </motion.div>
        </div>
      </div>

      <ContactModal 
  open={open} 
  onClose={() => setOpen(false)} 
  source="Industrial Dryer XF500" 
/>
    </section>
  );
}

/* Inline SVG icon factory to keep files minimal; returns JSX */
function renderIcon(name) {
  const common = { width: 34, height: 34, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

  switch (name) {
    case "model":
      return (
        <svg {...common}><rect x="3" y="6" width="18" height="12" rx="2" stroke="#fff" strokeWidth="1.2"/><path d="M7 10h10" stroke="#107C10" strokeWidth="1.2" /></svg>
      );
    case "type":
      return (
        <svg {...common}><circle cx="12" cy="12" r="8" stroke="#fff" strokeWidth="1.2"/><path d="M8 12h8" stroke="#FF2DAA" strokeWidth="1.2"/></svg>
      );
    case "capacity":
      return (
        <svg {...common}><rect x="3" y="5" width="18" height="4" rx="1" stroke="#fff" strokeWidth="1"/><rect x="3" y="11" width="12" height="8" rx="1" stroke="#107C10" strokeWidth="1"/></svg>
      );
    case "supply":
      return (
        <svg {...common}><path d="M3 12h18" stroke="#fff" strokeWidth="1.2"/><path d="M12 3v18" stroke="#FF2DAA" strokeWidth="1.2"/></svg>
      );
    case "power":
      return (
        <svg {...common}><path d="M12 2v20" stroke="#fff" strokeWidth="1.2"/><path d="M6 12h12" stroke="#107C10" strokeWidth="1.2"/></svg>
      );
    case "tray":
      return (
        <svg {...common}><rect x="3" y="6" width="18" height="3" rx="1" stroke="#fff" strokeWidth="1"/><rect x="3" y="11" width="18" height="3" rx="1" stroke="#107C10" strokeWidth="1"/></svg>
      );
    case "trays":
      return (<svg {...common}><path d="M4 7h16M4 12h16M4 17h8" stroke="#fff" strokeWidth="1.2"/></svg>);
    case "dehydration":
      return (<svg {...common}><path d="M12 4v12" stroke="#fff" strokeWidth="1.2"/><path d="M7 8h10" stroke="#107C10" strokeWidth="1.2"/></svg>);
    case "temp":
      return (<svg {...common}><path d="M12 2v14" stroke="#fff" strokeWidth="1.2"/><path d="M9 18h6" stroke="#FF2DAA" strokeWidth="1.2"/></svg>);
    case "material":
      return (<svg {...common}><rect x="4" y="4" width="16" height="16" rx="2" stroke="#fff" strokeWidth="1.2"/><path d="M6 12h12" stroke="#107C10" strokeWidth="1.2"/></svg>);
    case "insulation":
      return (<svg {...common}><path d="M3 12c0 4 4 8 9 8s9-4 9-8" stroke="#fff" strokeWidth="1.2"/><path d="M12 4v8" stroke="#FF2DAA" strokeWidth="1.2"/></svg>);
    case "chamber":
      return (<svg {...common}><path d="M4 6h16v12H4z" stroke="#fff" strokeWidth="1.2"/><path d="M7 9h10" stroke="#107C10" strokeWidth="1.2"/></svg>);
    case "operation":
      return (<svg {...common}><path d="M5 12h14" stroke="#fff" strokeWidth="1.2"/><path d="M12 5v14" stroke="#107C10" strokeWidth="1.2"/></svg>);
    case "application":
      return (<svg {...common}><path d="M4 7h16v10H4z" stroke="#fff" strokeWidth="1.2"/><path d="M8 11h8" stroke="#FF2DAA" strokeWidth="1.2"/></svg>);
    // why icons
    case "air":
      return (<svg {...common}><path d="M3 12s3-4 9-4 9 4 9 4" stroke="#107C10" strokeWidth="1.4"/></svg>);
    case "steel":
      return (<svg {...common}><rect x="4" y="4" width="16" height="16" rx="2" stroke="#fff" strokeWidth="1.1"/><path d="M6 8h12" stroke="#107C10" strokeWidth="1.2"/></svg>);
    case "insulation":
      return (<svg {...common}><path d="M3 8h18" stroke="#fff" strokeWidth="1.1"/><path d="M3 12h18" stroke="#107C10" strokeWidth="1.1"/></svg>);
    case "wrench":
      return (<svg {...common}><path d="M6 6l6 6" stroke="#FF2DAA" strokeWidth="1.2"/><path d="M14 14l4 4" stroke="#107C10" strokeWidth="1.2"/></svg>);
    default:
      return (<svg {...common}><circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.1"/></svg>);
  }
}
