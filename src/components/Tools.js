import { SvgIcon } from '@mui/material'
import React from 'react'

function Tools() {
  return (
    <div id='contact' className='tools'>
        <h1>Contact Us</h1>
        <div className='toolimg'>
        
        
        <button className='toolbtn'>Get a Quote</button>
        <button className='toolbtn'>Request Service</button>
        <button className='toolbtn'>Speak to an Expert</button>
</div>
<div className="quote-form">
  <h2>Request a Quotation</h2>
  <form onSubmit={(e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const request = {
      id: Date.now(),
      name: f.get('name'),
      phone: f.get('phone'),
      email: f.get('email'),
      service: f.get('service'),
      message: f.get('message'),
      date: new Date().toLocaleString('en-GB'),
      status: 'new'
    };

    // 1. SAVE TO LOCALSTORAGE
    const existing = JSON.parse(localStorage.getItem('lrk-quotes') || '[]');
    existing.push(request);
    localStorage.setItem('lrk-quotes', JSON.stringify(existing));

    // 2. SEND EMAIL NOTIFICATION (via EmailJS)
    window.emailjs.send('service_yourid', 'template_yourid', {
      to_name: "Calvin",
      from_name: request.name,
      phone: request.phone,
      email: request.email,
      service: request.service,
      message: request.message,
      date: request.date
    });

    alert('Thank you! We received your request. We will contact you soon.');
    e.target.reset();
  }}>
    <input name="name" placeholder="Your Name" required />
    <input name="phone" type="tel" placeholder="Phone Number" required />
    <input name="email" type="email" placeholder="Email" required />
    <select name="service" required>
      <option value="">Select Service</option>
      <option>Machine Fabrication</option>
      <option>Custom Fabrication</option>
      <option>Electronic Repair & Maintenance</option>
      <option>CNC Machining</option>
      <option>Industrial Supply</option>
      <option>Other</option>
    </select>
    <textarea name="message" placeholder="Describe your project..." rows="5" required></textarea>
    <button type="submit">Send Request</button>
  </form>
</div>
</div>
  )
}

export default Tools