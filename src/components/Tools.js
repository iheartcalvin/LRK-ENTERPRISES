import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // <--- NEW IMPORT
import DynamicQuoteForm from './DynamicQuoteForm'; 
import { SvgIcon } from '@mui/material';
import './Tool.css'; 

// --- Configuration: ADMIN WhatsApp Number ---
const ADMIN_WHATSAPP_NUMBER = '255682668909'; 

const SERVICE_CATEGORIES = [
    'Electronic Parts Supply', 
    'Fabrication Services', 
    'Repair & Maintenance', 
    'Tech Manufacturing',
    'Other'
];

// --- Service Contact Form Component (Used for Request Service) ---
function ServiceContactForm() {

  function submitServiceForm(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    const request = {
      id: Date.now(),
      name: f.get('name'),
      phone: f.get('phone'),
      email: f.get('email'),
      service: f.get('service'),
      details: f.get('message'), 
      source: `Service Request: ${f.get('service')}`, 
      date: new Date().toLocaleString('en-GB'),
      status: 'Pending'
    };

    // 1. SAVE TO LOCALSTORAGE (for Admin Panel)
    try {
      const existing = JSON.parse(localStorage.getItem('lrk-quotes') || '[]');
      existing.push(request);
      localStorage.setItem('lrk-quotes', JSON.stringify(existing));
      window.dispatchEvent(new Event("storage")); 
    } catch(err) {
      console.error("Failed to save to localStorage:", err);
    }
    
    alert('Thank you! We received your Service Request. We will contact you soon.');
    e.target.reset();
  }

  return (
    <div className="quote-form active-form">
      <h2>Service Request</h2>
      <p>Tell us about the service you need.</p>
      <form onSubmit={submitServiceForm}>
        <input name="name" placeholder="Your Name" required />
        <input name="phone" type="tel" placeholder="Phone Number" required />
        <input name="email" type="email" placeholder="Email" required />
        
        <select name="service" required>
          <option value="">Select Service Needed</option>
          {SERVICE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <textarea name="message" placeholder="Describe the issue or project in detail..." rows="5" required />
        <button type="submit" className="modal-submit-btn">
            Submit Service Request
        </button>
      </form>
    </div>
  );
}

// --- Main Tools Component ---
export default function Tools() {
  const [activeComponent, setActiveComponent] = useState(null); 

  const handleButtonClick = (componentName) => {
    setActiveComponent(activeComponent === componentName ? null : componentName);
  };

  const componentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  };

  const renderActiveComponent = () => {
    let content;

    switch (activeComponent) {
      case 'quote':
        content = <DynamicQuoteForm />;
        break;
      case 'service':
        content = <ServiceContactForm />;
        break;
      case 'whatsapp':
        const whatsappLink = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=Hello%20LRK%2C%20I%20would%20like%20to%20speak%20to%20an%20expert%20regarding...`;
        content = (
          <div className="whatsapp-expert-panel active-form">
            <h2>Speak to an Expert</h2>
            <p>We are available on WhatsApp to answer your technical questions.</p>
            <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="whatsapp-btn"
            >
                Chat on WhatsApp
            </a>
            <button onClick={() => setActiveComponent(null)} className="close-panel-btn">
                Close
            </button>
          </div>
        );
        break;
      default:
        return null;
    }
    
    // Wrap the active content in motion.div for animation
    return (
      <motion.div
        key={activeComponent} // <--- CRUCIAL: Must change key to trigger exit/enter
        variants={componentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.div>
    );
  };

  return (
    <div id='contact' className='tools'>
      <h1>Contact Us</h1>
      <div className='toolimg'>
        {/* Get a Quote Button */}
        <button 
            className={`toolbtn ${activeComponent === 'quote' ? 'active-tool' : ''}`} 
            onClick={() => handleButtonClick('quote')}
        >
            Get a Quote
        </button>
        {/* Request Service Button */}
        <button 
            className={`toolbtn ${activeComponent === 'service' ? 'active-tool' : ''}`} 
            onClick={() => handleButtonClick('service')}
        >
            Request Service
        </button>
        {/* Speak to an Expert Button */}
        <button 
            className={`toolbtn ${activeComponent === 'whatsapp' ? 'active-tool' : ''}`} 
            onClick={() => handleButtonClick('whatsapp')}
        >
            Speak to an Expert
        </button>
      </div>

      <div className='form-component-area'>
        <AnimatePresence mode="wait"> {/* <--- NEW: Ensures only one component is visible at a time */}
          {renderActiveComponent()}
        </AnimatePresence>
      </div>
    </div>
  );
}