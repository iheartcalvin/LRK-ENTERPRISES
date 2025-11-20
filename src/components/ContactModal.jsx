import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ContactModal.css";

export default function ContactModal({ open, onClose, source = "General Inquiry" }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setSent(false);
    }
  }, [open]);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  }

  function submitForm(e) {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);

    if (Object.keys(eObj).length === 0) {
      // 1. Get existing messages
      const existing = JSON.parse(localStorage.getItem('lrk-quotes') || '[]');

      // 2. Create new message object
      const newMessage = {
        id: Date.now(),
        type: 'Contact', // Distinguish from 'Quote'
        source: source,  // Captured from the specific section
        name: form.name,
        email: form.email,
        details: form.message, // Mapping message to details for consistency
        status: 'Pending',
        date: new Date().toISOString()
      };

      // 3. Save and Trigger Update
      localStorage.setItem('lrk-quotes', JSON.stringify([...existing, newMessage]));
      window.dispatchEvent(new Event("storage"));

      // 4. Show success UI
      setTimeout(() => {
        setSent(true);
      }, 500);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="modal-card"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            role="dialog"
          >
            {!sent ? (
              <>
                <h3 className="modal-title">Contact Us</h3>
                <p style={{color:'#888', marginBottom:'15px', fontSize:'0.9rem'}}>Regarding: {source}</p>

                <form onSubmit={submitForm} noValidate>
                  <label>Name</label>
                  <input
                    type="text" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={errors.name ? "error" : ""}
                    autoFocus
                  />
                  {errors.name && <p className="err">{errors.name}</p>}

                  <label>Email</label>
                  <input
                    type="email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <p className="err">{errors.email}</p>}

                  <label>Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={errors.message ? "error" : ""}
                  />
                  {errors.message && <p className="err">{errors.message}</p>}

                  <button className="modal-submit-btn" type="submit">Send Message</button>
                </form>
              </>
            ) : (
              <motion.div className="modal-success" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <h3>Message Sent 🎉</h3>
                <p>We have received your inquiry regarding <b>{source}</b>.</p>
                <button className="modal-close-btn" onClick={onClose}>Close</button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}