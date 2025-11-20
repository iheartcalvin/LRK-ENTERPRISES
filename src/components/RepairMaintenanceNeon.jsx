import React, { useRef, useState } from "react";
import ContactModal from "./ContactModal";
import useScrollGlow from "../hooks/useScrollGlow";
import "./BrandWebsitePackageNeon.css"; // reusing same neon styles

export default function RepairMaintenanceNeon() {
  const ref = useRef(null);
  const glow = useScrollGlow(ref);
  const [open, setOpen] = useState(false);

  const stop1 = `rgba(16,124,16,${0.15 + glow * 0.6})`;
  const stop2 = `rgba(255,45,170,${0.12 + glow * 0.6})`;
  const stop3 = `rgba(16,124,16,${0.15 + glow * 0.6})`;

  return (
    <section ref={ref} className="neon-section">

      {/* Scroll Glow Border */}
      <svg className="scroll-neon-border" viewBox="0 0 1000 140" preserveAspectRatio="none">
        <defs>
          <linearGradient id="repairGlow" x1="0" x2="1">
            <stop offset="0%" stopColor={stop1} />
            <stop offset="50%" stopColor={stop2} />
            <stop offset="100%" stopColor={stop3} />
          </linearGradient>
        </defs>

        <path
          d="M0,100 C200,10 500,200 1000,50"
          stroke="url(#repairGlow)"
          strokeWidth={2 + glow * 3}
          fill="none"
          style={{
            opacity: 0.35 + glow * 0.4,
            filter: `blur(${2 + glow * 6}px)`
          }}
        />
      </svg>

      <div className="neon-container">
        {/* Intro */}
        <div id="repair" className="neon-intro">
          <h2 className="neon-title">Repair & Maintenance Services</h2>
          <p className="neon-subtitle">
            Professional repair and preventive maintenance for electronic machines and equipment. 
            On-site and workshop services designed to minimize downtime and keep your equipment running at peak performance.
          </p>
        </div>

        <div className="neon-content">

          {/* LEFT — SERVICES OVERVIEW */}
          <div className="neon-features">

            <h3 className="neon-section-heading">What We Offer</h3>

            <div className="neon-feature-block">
              <h4>Diagnosis & Fault Detection</h4>
              <ul>
                <li>Full equipment inspection</li>
                <li>Electronic and mechanical testing</li>
                <li>Root-cause analysis</li>
              </ul>
            </div>

            <div className="neon-feature-block">
              <h4>Repair Services</h4>
              <ul>
                <li>PCB repairs & replacements</li>
                <li>Motor repair & rewinding</li>
                <li>Sensor & electronics replacement</li>
                <li>Machine calibration</li>
              </ul>
            </div>

            <div className="neon-feature-block">
              <h4>Maintenance Services</h4>
              <ul>
                <li>Preventive maintenance packages</li>
                <li>Scheduled service plans</li>
                <li>Lubrication, cleaning & tuning</li>
                <li>Performance optimization</li>
              </ul>
            </div>

            <div className="neon-feature-block">
              <h4>Service Options</h4>
              <ul>
                <li>On-site servicing</li>
                <li>Workshop repairs</li>
                <li>Emergency service response</li>
              </ul>
            </div>

            <button className="neon-btn neon-btn-green" onClick={() => setOpen(true)}>
              Book Diagnosis
            </button>
          </div>

          {/* RIGHT — RFQ STYLE CARDS */}
          <div className="neon-payments">
            <h3 className="neon-payment-heading">Service Options</h3>

            <div className="neon-cards">

              {/* Card 1 */}
              <div className="neon-card">
                <div className="neon-card-glow" />
                <div className="neon-card-inner">
                  <h4>On-Site Repair Service</h4>
                  <div className="neon-price-list">
                    • Technician dispatched to your location <br/>
                    • Ideal for heavy or fixed machinery <br/>
                    • Full diagnosis included <br/>
                    • Fast response supported
                  </div>

                  <button
                    onClick={() => setOpen(true)}
                    className="neon-btn neon-btn-green"
                  >
                    Book On-Site Service
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="neon-card">
                <div className="neon-card-glow neon-card-glow-pink" />
                <div className="neon-card-inner">
                  <h4>Workshop Repair Service</h4>
                  <div className="neon-price-list">
                    • Detailed bench diagnosis <br/>
                    • Lab testing & component-level repairs <br/>
                    • Cheaper than on-site service <br/>
                    • Tools & diagnostics fully available
                  </div>

                  <button
                    onClick={() => setOpen(true)}
                    className="neon-btn neon-btn-pink"
                  >
                    Book Workshop Service
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
