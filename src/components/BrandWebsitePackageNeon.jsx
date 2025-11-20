import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import useScrollGlow from "../hooks/useScrollGlow";
import ContactModal from "./ContactModal";
import "../components/BrandWebsitePackageNeon.css";

const featureBlocks = [
  {
    title: "Branding Package",
    items: [
      "Primary & secondary logos",
      "Color palette & typography",
      "Brand style guide (PDF)",
    ],
  },
  {
    title: "Website UI/UX Design",
    items: [
      "Homepage, About, Services, Contact pages",
      "Mobile-responsive UI screens",
    ],
  },
  {
    title: "Website Development",
    items: [
      "WordPress / Webflow / Custom",
      "Domain + hosting setup",
      "Basic SEO + speed optimization",
    ],
  },
  {
    title: "Social Media Kit",
    items: ["6–12 branded templates", "Profile + cover banners"],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BrandWebsitePackageNeon() {
  const sectionRef = useRef(null);
  const glow = useScrollGlow(sectionRef); // 0..1
  const [open, setOpen] = useState(false);

  // dynamic styles for SVG gradient and stroke width based on glow
  const gradientStops = {
    stop1: `rgba(16,124,16,${0.25 + glow * 0.9})`,
    stop2: `rgba(255,45,170,${0.15 + glow * 0.7})`,
    stop3: `rgba(16,124,16,${0.25 + glow * 0.8})`,
  };
  const strokeWidth = 2 + glow * 3;

  return (
    <section ref={sectionRef} className="neon-section" aria-labelledby="neon-title">
      {/* scroll-reactive SVG border */}
      <svg
        className="scroll-neon-border"
        viewBox="0 0 1000 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="scrollGlowGrad" x1="0" x2="1">
            <stop offset="0%" stopColor={gradientStops.stop1} />
            <stop offset="50%" stopColor={gradientStops.stop2} />
            <stop offset="100%" stopColor={gradientStops.stop3} />
          </linearGradient>
        </defs>

        <path
          d="M0,120 C200,20 500,200 1000,50"
          stroke="url(#scrollGlowGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          style={{
            filter: `blur(${2 + glow * 6}px)`,
            opacity: 0.28 + glow * 0.72,
            transform: `translateY(${glow * -6}px)`,
          }}
        />
      </svg>

      {/* decorative faint streak (SVG) */}
      <div className="neon-overlay" aria-hidden="true">
        <svg className="neon-streak" viewBox="0 0 800 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#107C10" stopOpacity="0.08" />
              <stop offset="70%" stopColor="#FF2DAA" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path d="M0,120 C150,20 350,220 800,80" stroke="url(#g1)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="neon-container">
        <motion.div
          className="neon-intro"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 id="neon-title" className="neon-title" variants={fadeUp}>
            Brand + Website Starter Kit
          </motion.h2>

          <motion.p className="neon-subtitle" variants={fadeUp}>
            A cyber-neon identity + website solution — stylish, fast, and built to convert.
          </motion.p>
        </motion.div>

        <motion.div
          className="neon-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          <motion.div className="neon-features" variants={fadeUp}>
            <h3 className="neon-section-heading">What’s Included</h3>

            {featureBlocks.map((block, i) => (
              <motion.div
                className="neon-feature-block"
                key={block.title}
                variants={fadeUp}
                style={{ "--delay": `${i * 0.05}s` }}
              >
                <h4>{block.title}</h4>
                <ul>
                  {block.items.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="neon-payments" variants={fadeUp}>
            <h3 className="neon-payment-heading">Payment Options</h3>

            <div className="neon-cards">
              {/* Full Payment Card */}
              <motion.article
                className="neon-card"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                role="region"
                aria-label="Full payment option"
              >
                <div className="neon-card-inner">
                  <div className="neon-card-glow" />
                  <h4>Option 1: Full Payment</h4>
                  <p className="neon-price-list">
                    <strong>Basic:</strong> $150–$300 <br />
                    <strong>Standard:</strong> $300–$700 <br />
                    <strong>Premium:</strong> $700–$1500+
                  </p>

                  <motion.button
                    className="neon-btn neon-btn-green"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setOpen(true)}
                    aria-label="Get started with full payment"
                  >
                    Get Started
                    <span className="btn-ripple" />
                  </motion.button>
                </div>
              </motion.article>

              {/* Installment Card */}
              <motion.article
                className="neon-card"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                role="region"
                aria-label="Installment payment option"
              >
                <div className="neon-card-inner">
                  <div className="neon-card-glow neon-card-glow-pink" />
                  <h4>Option 2: Installments</h4>
                  <p className="neon-price-list">
                    50% upfront <br />
                    25% after UI/UX approval <br />
                    25% after completion <br />
                    <br />
                    Or 3-month plan available.
                  </p>

                  <motion.button
                    className="neon-btn neon-btn-pink"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setOpen(true)}
                    aria-label="Start with installments"
                  >
                    Start with Installments
                    <span className="btn-ripple" />
                  </motion.button>
                </div>
              </motion.article>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}