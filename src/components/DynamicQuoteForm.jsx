import React, { useState } from "react";
import "./DynamicQuoteForm.css";

export default function DynamicQuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    material: "",
    thickness: "",
    finish: "",
    quantity: 1,
    details: "",
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    // Note: In a real app, you'd upload this to a server. 
    // Here we just flag that a file was attached.
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Get existing quotes
    const existingQuotes = JSON.parse(localStorage.getItem('lrk-quotes') || '[]');

    // 2. Create new quote object
    const newQuote = {
      ...formData,
      id: Date.now(),
      status: 'Pending',
      file: formData.file ? "Image/File Uploaded (Local)" : "No File"
    };

    // 3. Save to storage
    localStorage.setItem('lrk-quotes', JSON.stringify([...existingQuotes, newQuote]));
    
    // 4. Trigger storage event for Admin panel
    window.dispatchEvent(new Event("storage"));

    alert("Quote Request Sent! We will review and email you shortly.");
    setFormData({ 
      name: "", email: "", phone: "", 
      material: "", thickness: "", finish: "", 
      quantity: 1, details: "", file: null 
    });
  };

  return (
    <section id="custom-fab" className="dq-section">
      <h2 className="dq-title">Get a Custom Fabrication Quote</h2>
      <p className="dq-subtitle">Tell us what you need, and we'll build it.</p>

      <div className="dq-form-wrapper">
        <form onSubmit={handleSubmit}>
          
          {/* Contact Info */}
          <div className="dq-row">
             <div className="dq-field">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
            </div>
            <div className="dq-field">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
            </div>
          </div>

          {/* Project Specs */}
          <div className="dq-row">
            <div className="dq-field">
              <label>Material Preference</label>
              <select name="material" value={formData.material} onChange={handleChange}>
                <option value="">Select material</option>
                <option value="Wood">Wood (MDF/Plywood)</option>
                <option value="Acrylic">Acrylic / Perspex</option>
                <option value="Aluminum">Aluminum</option>
                <option value="Steel">Steel</option>
                <option value="3D Print">3D Printing (PLA/ABS)</option>
              </select>
            </div>

            <div className="dq-field">
              <label>Thickness / Spec</label>
              <select name="thickness" value={formData.thickness} onChange={handleChange}>
                <option value="">Select spec</option>
                <option value="3mm">3mm</option>
                <option value="6mm">6mm</option>
                <option value="10mm+">10mm+</option>
                <option value="Custom">Custom (Specify below)</option>
              </select>
            </div>
          </div>

          <div className="dq-row">
            <div className="dq-field">
               <label>Finish Type</label>
               <select name="finish" value={formData.finish} onChange={handleChange}>
                 <option value="Raw">Raw / Unfinished</option>
                 <option value="Polished">Polished</option>
                 <option value="Spray Paint">Spray Painted</option>
                 <option value="Powder Coat">Powder Coated</option>
               </select>
            </div>
            <div className="dq-field">
               <label>Quantity</label>
               <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange} />
            </div>
          </div>

          {/* Details & File */}
          <div className="dq-field">
            <label>Project Details & Dimensions (L x W x H)</label>
            <textarea 
              name="details" 
              rows="4" 
              value={formData.details} 
              onChange={handleChange} 
              placeholder="Describe your project dimensions and requirements..."
            ></textarea>
          </div>

          <div className="dq-field">
            <label>Upload Design/Sketch (Optional)</label>
            <input type="file" onChange={handleFile} className="file-input" />
          </div>

          <button type="submit" className="dq-btn">
            Submit Quote Request
          </button>
        </form>
      </div>
    </section>
  );
}