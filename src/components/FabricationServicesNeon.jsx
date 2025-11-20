import React, { useRef, useState } from "react";
import "./BrandWebsitePackageNeon.css"; 
import ContactModal from "./ContactModal";
import useScrollGlow from "../hooks/useScrollGlow";
import FabricationCarousel from "./FabricationCarousel";
import DynamicQuoteForm from "./DynamicQuoteForm";

export default function FabricationServicesNeon() {
  const ref = useRef(null);
  const glow = useScrollGlow(ref);
  const [open, setOpen] = useState(false);

  const stop1 = `rgba(16,124,16,${0.15 + glow * 0.6})`;
  const stop2 = `rgba(255,45,170,${0.12 + glow * 0.6})`;
  const stop3 = `rgba(16,124,16,${0.15 + glow * 0.6})`;

  return (
    <section ref={ref} className="neon-section">

<FabricationCarousel />



      {/* Scroll Glow Border */}
      <svg className="scroll-neon-border" viewBox="0 0 1000 140" preserveAspectRatio="none">
        <defs>
          <linearGradient id="fabGlow" x1="0" x2="1">
            <stop offset="0%" stopColor={stop1} />
            <stop offset="50%" stopColor={stop2} />
            <stop offset="100%" stopColor={stop3} />
          </linearGradient>
        </defs>

        <path
          d="M0,100 C200,10 500,200 1000,50"
          stroke="url(#fabGlow)"
          strokeWidth={2 + glow * 3}
          fill="none"
          style={{
            opacity: 0.35 + glow * 0.4,
            filter: `blur(${2 + glow * 6}px)`
          }}
        />
      </svg>

      <div id="fabrication" className="neon-container">
        <div className="neon-intro">
          <h2 className="neon-title">Precision Fabrication Services</h2>
          <p className="neon-subtitle">
            CNC-powered fabrication for wood, metal, acrylic, and aluminum.  
            We design and manufacture custom products with premium quality and accuracy.
          </p>
        </div>

        <div className="neon-content">
          {/* LEFT COLUMN – FEATURES */}
          <div className="neon-features">
            <h3 className="neon-section-heading">Capabilities</h3>

            <div className="neon-feature-block">
              <h4>CNC Cutting & Engraving</h4>
              <ul>
                <li>2D & 3D CNC carving</li>
                <li>Laser cutting & engraving</li>
                <li>High-precision trimming for all materials</li>
              </ul>
            </div>

            <div className="neon-feature-block">
              <h4>Materials We Handle</h4>
              <ul>
                <li>Hardwood & plywood</li>
                <li>Mild steel, stainless steel</li>
                <li>Acrylic sheets</li>
                <li>Aluminum panels</li>
              </ul>
            </div>

            <div className="neon-feature-block">
              <h4>Our Fabrication Workflow</h4>
              <ul>
                <li>Concept & CAD design</li>
                <li>Technical drawing approval</li>
                <li>CNC manufacturing</li>
                <li>Finishing & quality inspection</li>
              </ul>
            </div>

            <div className="neon-feature-block">
              <h4>Products We Can Make</h4>
              <ul>
                <li>Furniture components</li>
                <li>Signage & branding products</li>
                <li>Machine parts & enclosures</li>
                <li>Decor & architectural elements</li>
              </ul>
            </div>

          </div>

          {/* RIGHT COLUMN – RFQ CARDS */}
          <div className="neon-payments">
            <h3 className="neon-payment-heading">Request a Quote</h3>

            <div className="neon-cards">

              {/* CARD 1 */}
              <div className="neon-card">
                <div className="neon-card-glow" />
                <div className="neon-card-inner">
                  <h4>Custom CNC Fabrication</h4>
                  <div className="neon-price-list">
                    • Upload your design or idea<br/>
                    • Select material (Wood / Metal / Acrylic / Aluminum)<br/>
                    • Choose finish & dimensions<br/>
                    • Get a custom quotation
                  </div>

                  <button
                    onClick={() => setOpen(true)}
                    className="neon-btn neon-btn-green"
                  >
                    Request Quote
                    <span className="btn-ripple"></span>
                  </button>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="neon-card">
                <div className="neon-card-glow neon-card-glow-pink" />
                <div className="neon-card-inner">
                  <h4>Bulk / Industrial Orders</h4>
                  <div className="neon-price-list">
                    • Mass production<br/>
                    • Large format CNC processing<br/>
                    • Metal & wood fabrication<br/>
                    • Delivered ready-for-assembly
                  </div>

                  <button
                    onClick={() => setOpen(true)}
                    className="neon-btn neon-btn-pink"
                  >
                    Request Quote
                    <span className="btn-ripple"></span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <ContactModal 
  open={open} 
  onClose={() => setOpen(false)} 
  source="Fabrication Services" 
/>
      <DynamicQuoteForm />


    </section>



  );
}
