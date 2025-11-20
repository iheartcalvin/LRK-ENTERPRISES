import React, { useRef, useState } from "react";
import ContactModal from "./ContactModal";
import useScrollGlow from "../hooks/useScrollGlow";
import "./BrandWebsitePackageNeon.css"; // reusing neon styling
import ProcessTimelineNeon from "./ProcessTimelineNeon";
import MachinesCarouselNeon from "./MachinesCarouselNeon";

export default function TechManufacturingNeon() {
  const ref = useRef(null);
  const glow = useScrollGlow(ref);
  const [open, setOpen] = useState(false);

  const stop1 = `rgba(34,119,255,${0.15 + glow * 0.6})`;
  const stop2 = `rgba(255,45,170,${0.12 + glow * 0.6})`;
  const stop3 = `rgba(34,119,255,${0.15 + glow * 0.6})`;

  return (
    <section ref={ref} className="neon-section">
        <MachinesCarouselNeon />




      {/* Scroll Glow Border */}
      <svg className="scroll-neon-border" viewBox="0 0 1000 140" preserveAspectRatio="none">
        <defs>
          <linearGradient id="techGlow" x1="0" x2="1">
            <stop offset="0%" stopColor={stop1} />
            <stop offset="50%" stopColor={stop2} />
            <stop offset="100%" stopColor={stop3} />
          </linearGradient>
        </defs>

        <path
          d="M0,100 C200,10 500,200 1000,50"
          stroke="url(#techGlow)"
          strokeWidth={2 + glow * 3}
          fill="none"
          style={{
            opacity: 0.35 + glow * 0.4,
            filter: `blur(${2 + glow * 6}px)`
          }}
        />
      </svg>

      <div className="neon-container">

        {/* INTRO SECTION */}
        <div className="neon-intro">
          <h2 className="neon-title">Manufacturing of Modern Technology Systems</h2>
          <p className="neon-subtitle">
            Development and assembly of cutting-edge technology-driven solutions.  
            Built with a focus on innovation, automation, and efficiency to meet evolving industry demands.
          </p>
        </div>

        <div className="neon-content">

          {/* LEFT COLUMN — CAPABILITIES */}
          <div className="neon-features">

            <h3 className="neon-section-heading">Core Capabilities</h3>

            <div className="neon-feature-block">
              <h4>Industrial Automation Systems</h4>
              <ul>
                <li>IoT-enabled hardware solutions</li>
                <li>Smart machine controllers</li>
                <li>Embedded automation modules</li>
              </ul>
            </div>

            <div className="neon-feature-block">
              <h4>Electronics Assembly</h4>
              <ul>
                <li>PCB manufacturing & soldering</li>
                <li>Component integration</li>
                <li>Microcontroller-based systems</li>
              </ul>
            </div>

            <div className="neon-feature-block">
              <h4>Mechanical Fabrication</h4>
              <ul>
                <li>Custom metal & plastic casing</li>
                <li>Precision machining parts</li>
                <li>Structural frameworks</li>
              </ul>
            </div>

            <div className="neon-feature-block">
              <h4>Product Development Process</h4>
              <ul>
                <li>Concept & prototyping</li>
                <li>Hardware & firmware development</li>
                <li>Assembly, testing & calibration</li>
                <li>Final deployment & support</li>
              </ul>
            </div>

            <button className="neon-btn neon-btn-green" onClick={() => setOpen(true)}>
              Start a Project
            </button>
          </div>

          {/* RIGHT COLUMN — SERVICE CARDS */}
          <div className="neon-payments">
            <h3 className="neon-payment-heading">Technology Manufacturing Services</h3>

            <div className="neon-cards">

              {/* CARD 1 */}
              <div className="neon-card">
                <div className="neon-card-glow"></div>
                <div className="neon-card-inner">
                  <h4>Custom Technology Development</h4>
                  <div className="neon-price-list">
                    • Hardware & embedded systems<br/>
                    • Industrial automation design<br/>
                    • IoT product development<br/>
                    • Prototype to production rollout<br/>
                  </div>

                  <button
                    onClick={() => setOpen(true)}
                    className="neon-btn neon-btn-green"
                  >
                    Request Consultation
                  </button>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="neon-card">
                <div className="neon-card-glow neon-card-glow-pink"></div>
                <div className="neon-card-inner">
                  <h4>Full Assembly & Production</h4>
                  <div className="neon-price-list">
                    • PCB population & testing<br/>
                    • Mechanical fabrication<br/>
                    • System integration<br/>
                    • Quality assurance & packaging<br/>
                  </div>

                  <button
                    onClick={() => setOpen(true)}
                    className="neon-btn neon-btn-pink"
                  >
                    Start Manufacturing
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <ProcessTimelineNeon />


      <ContactModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
