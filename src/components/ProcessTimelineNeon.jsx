import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./ProcessTimelineNeon.css";

export default function ProcessTimelineNeon() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const steps = [
    {
      title: "1. Consultation & Requirements",
      desc: "Understanding the client’s goals, challenges, and functional expectations through detailed analysis.",
    },
    {
      title: "2. Concept & System Design",
      desc: "We create detailed technical concepts, architecture plans, and component specifications.",
    },
    {
      title: "3. Prototype Development",
      desc: "Hardware, software, and mechanical parts are prototyped, tested, and validated.",
    },
    {
      title: "4. Assembly & Manufacturing",
      desc: "Full system production begins — electronics, fabrication, wiring, casing, and integration.",
    },
    {
      title: "5. Quality Testing",
      desc: "Rigorous electrical, mechanical, performance, and safety testing is conducted.",
    },
    {
      title: "6. Delivery & Deployment",
      desc: "Installation, setup, calibration, and final training for the client.",
    },
    {
      title: "7. Support & Maintenance",
      desc: "Continuous support, updates, and preventive maintenance to ensure reliability.",
    },
  ];

  return (
    <section className="timeline-section">
      <h2 className="timeline-title">Our Process</h2>
      <p className="timeline-subtitle">
        A seamless, engineered workflow from idea to final deployment.
      </p>

      <div className="timeline-wrapper" ref={ref}>
        <div className={`timeline-line ${inView ? "line-active" : ""}`} />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="timeline-step"
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-card">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
