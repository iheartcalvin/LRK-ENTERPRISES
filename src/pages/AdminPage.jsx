import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser'; 
import '../components/AdminDashboard.css'; 


const CATEGORIES = ['Electronic Parts Supply', 'Fabrication Services', 'Repair & Maintenance', 'Tech Manufacturing'];
const CAROUSEL_CATEGORIES = ['Fabrication', 'Machines'];
const ADMIN_PASSWORD = 'lrk2025'; // <<< CHANGE THIS PASSWORD

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Data State
  const [projects, setProjects] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [carousels, setCarousels] = useState([]);
  
  // Project Form State
  const [form, setForm] = useState({ title: '', desc: '', category: CATEGORIES[0], images: [], location: '', date: '' });
  const [editingId, setEditingId] = useState(null);

  // Carousel Form State <-- NEW STATE for Carousels
  const [carouselForm, setCarouselForm] = useState({ name: '', desc: '', category: CAROUSEL_CATEGORIES[0], image: '' });
  const [editingCarouselId, setEditingCarouselId] = useState(null);

  // Reply State
  const [response, setResponse] = useState({ price: '', message: '', msgId: null });
  const [replyFile, setReplyFile] = useState(null); 
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const loadData = () => {
        setProjects(JSON.parse(localStorage.getItem('lrk-projects') || '[]'));
        setInbox(JSON.parse(localStorage.getItem('lrk-quotes') || '[]'));
        setCarousels(JSON.parse(localStorage.getItem('lrk-carousels') || '[]'));
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // --- HELPER: Badge Color based on Source ---
  const getSourceColor = (source) => {
    if (!source) return '#555';
    if (source.includes('Fabrication')) return '#FF2DAA';
    if (source.includes('Dryer')) return '#FFA500';
    if (source.includes('Repair')) return '#107C10';
    return '#1375bc';
  };

  // --- CLOUDINARY UPLOAD (Uses .env) ---
  const uploadToCloudinary = async (file) => {
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.REACT_APP_CLOUDINARY_PRESET;
    
    if (!cloudName || !preset) {
        console.error("Cloudinary environment variables missing.");
        alert("Cloudinary keys are missing from .env file.");
        return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset); 
    
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, { 
        method: "POST",
        body: formData
      });
      const data = await res.json();
      return data.secure_url; 
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload PDF. Check Cloudinary settings or network.");
      return null;
    }
  };

  // --- SEND REPLY (Uses .env) ---
  const sendReply = async (e) => {
    e.preventDefault();
    setSending(true);

    const currentMsg = inbox.find(q => q.id === response.msgId);
    if (!currentMsg) return;

    let invoiceLink = "N/A";

    if (replyFile) {
      alert("Uploading Invoice... Please wait.");
      invoiceLink = await uploadToCloudinary(replyFile);
      if (!invoiceLink) {
        setSending(false);
        return; 
      }
    }

    // Retrieve EmailJS keys from .env
    const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID; 
    const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID; 
    const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY; 

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.error("EmailJS environment variables missing.");
        alert("EmailJS keys are missing from .env file.");
        setSending(false);
        return;
    }
    
    const templateParams = {
      to_name: currentMsg.name,
      to_email: currentMsg.email,
      source_section: currentMsg.source || "General",
      original_request: currentMsg.details,
      quote_price: response.price || "N/A",
      admin_message: response.message,
      invoice_link: invoiceLink 
    };
    
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        alert('Reply sent successfully!');
        const updatedInbox = inbox.map(q => 
          q.id === response.msgId ? { ...q, status: 'Replied' } : q
        );
        localStorage.setItem('lrk-quotes', JSON.stringify(updatedInbox));
        setInbox(updatedInbox);
        
        setResponse({ price: '', message: '', msgId: null });
        setReplyFile(null);
        setSending(false);
      }, (error) => {
        alert('Failed to send email: ' + JSON.stringify(error));
        setSending(false);
      });
  };

  // --- LOGIN ---
  const login = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setIsAuthenticated(true);
    else alert('Wrong password!');
  };

  const saveCarousels = (newCarousels) => { // <-- NEW FUNCTION
    localStorage.setItem('lrk-carousels', JSON.stringify(newCarousels));
    setCarousels(newCarousels);
    setCarouselForm({ name: '', desc: '', category: CAROUSEL_CATEGORIES[0], image: '' });
    setEditingCarouselId(null);
  };

  // --- PROJECT FUNCTIONS ---
  const saveProjects = (newProjects) => {
    try {
      localStorage.setItem('lrk-projects', JSON.stringify(newProjects));
      setProjects(newProjects);
      window.dispatchEvent(new Event("storage"));
    } catch (e) { alert("Storage full!"); }
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    })).then(newImages => {
      setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    });
  };

  const submitProject = (e) => {
    e.preventDefault();
    const updated = editingId
      ? projects.map(p => p.id === editingId ? { ...form, id: editingId } : p)
      : [...projects, { ...form, id: Date.now() }];
    saveProjects(updated);
    setForm({ title: '', desc: '', category: CATEGORIES[0], images: [], location: '', date: '' });
    setEditingId(null);


  };

  const handleCarouselImage = (e) => { // <-- NEW FUNCTION
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCarouselForm(p => ({ ...p, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const submitCarousel = (e) => { 
    e.preventDefault();
    if (!carouselForm.image || !carouselForm.image.startsWith('/') && !carouselForm.image.startsWith('http')) {
        alert('Please enter a valid Image URL (must start with / or http).');
        return;
    }

    const item = { ...carouselForm, id: editingCarouselId || Date.now(), desc: carouselForm.desc || carouselForm.name };

    let newCarousels;
    if (editingCarouselId) {
      newCarousels = carousels.map(c => c.id === editingCarouselId ? item : c);
    } else {
      newCarousels = [...carousels, item];
    }
    saveCarousels(newCarousels);
  };

  


  if (!isAuthenticated) {
    return (
      <div className="admin-login-fullpage">
        <motion.div className="login-box" animate={{ scale: 1, opacity: 1 }}>
          <img src="/LRK.svg" alt="LRK Logo" className="login-logo" />
          <form onSubmit={login}>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">ENTER</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-fullpage">
      <div className="admin-header-full">
        <h1>LRK DASHBOARD</h1>
        <div className="tabs">
        <button className={activeTab === 'inbox' ? 'active' : ''} onClick={() => setActiveTab('inbox')}>
                Inbox ({inbox.filter(q => q.status === 'Pending').length})
            </button>
            <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>
                Projects ({projects.length})
            </button>
            {/* NEW TAB */}
            <button className={activeTab === 'carousels' ? 'active' : ''} onClick={() => setActiveTab('carousels')}>
                Carousels ({carousels.length})
            </button>
        </div>
        <button onClick={() => navigate('/')}>Exit</button>
      </div>

      <div className="admin-content">
        
        {/* === INBOX TAB (CONTACTS & QUOTES) === */}
        {activeTab === 'inbox' && (
          <div className="quotes-manager">
            <div className="quotes-list">
              {inbox.length === 0 && <p style={{color:'#888'}}>No messages received yet.</p>}
              
              {inbox.slice().reverse().map(msg => (
                <div 
                  key={msg.id} 
                  className={`quote-card ${msg.status}`} 
                  style={{borderLeftColor: msg.status === 'Pending' ? getSourceColor(msg.source) : '#555'}}
                >
                  <div className="q-header">
                    <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                      <h4>{msg.name}</h4>
                      <span style={{
                        fontSize:'0.75rem', 
                        background: getSourceColor(msg.source), 
                        color:'white', 
                        padding:'2px 8px', 
                        borderRadius:'4px'
                      }}>
                        {msg.source || "General"}
                      </span>
                    </div>
                    <small>{new Date(msg.id).toLocaleDateString()}</small>
                  </div>

                  <div className="q-details">
                    <p><strong>Email:</strong> {msg.email}</p>
                    
                    {msg.material && (
                       <div className="specs-grid">
                         <span>🛠 {msg.material}</span>
                         <span>📏 {msg.thickness}</span>
                         <span>🔢 Qty: {msg.quantity}</span>
                       </div>
                    )}

                    <p className="msg-body"><strong>Message:</strong> {msg.details}</p>
                    
                    {msg.file && msg.file !== "No File" && <p style={{color:'var(--neon-green)'}}>📎 Attachment Included (User)</p>}
                  </div>
                  
                  {msg.status === 'Pending' && (
                    <button onClick={() => setResponse({ ...response, msgId: msg.id })} className="reply-btn">
                      Reply
                    </button>
                  )}
                  {msg.status === 'Replied' && <span className="status-tag">Replied</span>}
                </div>
              ))}
            </div>

            {/* Reply Panel */}
            {response.msgId && (
              <div className="reply-panel">
                <h3>Reply to {inbox.find(i => i.id === response.msgId)?.name}</h3>
                <form onSubmit={sendReply}>
                  <label>Quote Price (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 1,500,000 TZS" 
                    value={response.price}
                    onChange={e => setResponse({...response, price: e.target.value})} 
                  />
                  
                  <label>Response Message</label>
                  <textarea 
                    placeholder="Write your reply here..." 
                    value={response.message}
                    onChange={e => setResponse({...response, message: e.target.value})}
                    required
                  ></textarea>

                  {/* File Attachment Input */}
                  <label style={{marginTop:'15px', display:'block', color:'var(--neon-green)'}}>
                    📎 Attach Certified Proforma Invoice (PDF/Image)
                  </label>
                  <input 
                    type="file" 
                    accept=".pdf, image/*"
                    onChange={(e) => setReplyFile(e.target.files[0])}
                    style={{border:'1px dashed #555', padding:'10px', background:'#111', width:'95%'}}
                  />
                  {replyFile && <p style={{fontSize:'0.8rem', marginTop:'5px', color:'#ccc'}}>{replyFile.name} ready to upload.</p>}


                  <div className="reply-actions">
                    <button type="button" onClick={() => { setResponse({ price: '', message: '', msgId: null }); setReplyFile(null); }}>Cancel</button>
                    <button type="submit" disabled={sending}>
                      {sending ? 'Uploading & Sending...' : 'Send Reply'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

{activeTab === 'carousels' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-content" key="carousels">
            <div className="admin-form">
              <h3>{editingCarouselId ? 'Edit' : 'Add New'} Carousel Item</h3>
              <form onSubmit={submitCarousel} className="project-form">
                <input
                  placeholder="Item Name (e.g. Smart Clove Dryer)"
                  value={carouselForm.name}
                  onChange={e => setCarouselForm({ ...carouselForm, name: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Short Description (used for info section)"
                  value={carouselForm.desc}
                  onChange={e => setCarouselForm({ ...carouselForm, desc: e.target.value })}
                  rows="3"
                />
                <select
                  value={carouselForm.category}
                  onChange={e => setCarouselForm({ ...carouselForm, category: e.target.value })}
                  required
                >
                  {CAROUSEL_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                
                {/* FIX: Replaced file upload with a URL input */}
                <div className="image-section">
                    <input
                        placeholder="Image URL (e.g., /machines/clove-dryer.jpg)"
                        value={carouselForm.image}
                        onChange={e => setCarouselForm({ ...carouselForm, image: e.target.value })}
                        required
                    />
                    <p className="hint-text">
                        **NOTE:** Images must be hosted (e.g., in your `/public` folder or a CDN) and referenced by URL.
                        Direct file upload was removed to prevent the Local Storage Quota Exceeded error.
                    </p>

                    <div className="image-previews">
                        {carouselForm.image && (
                            <div className="thumb" style={{ width: '100px', height: '100px' }}>
                                <img src={carouselForm.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>
                </div>

                <button type="submit">{editingCarouselId ? 'Update Item' : 'Add Item'}</button>
              </form>
            </div>

            <div className="projects-list">
               <h2>Carousel Items ({carousels.length})</h2>
               {carousels.map(c => (
                <div key={c.id} className="project-item">
                  <div className="p-img">{c.image && <img src={c.image} alt="t" />}</div>
                  <div className="p-info"><strong>{c.name}</strong><small>{c.category}</small></div>
                  <div className="actions">
                    <button onClick={() => { setCarouselForm(c); setEditingCarouselId(c.id); }}>Edit</button>
                    <button onClick={() => saveCarousels(carousels.filter(x => x.id !== c.id))} className="del">Del</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* === PROJECTS TAB === */}
        {activeTab === 'projects' && (
           <>
            <form onSubmit={submitProject} className="admin-form">
              <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
              <div className="form-row">
                <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-row">
                <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <textarea placeholder="Description" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} required />
              
              <div className="image-section">
                <label className="upload-btn">
                  + Add Images
                  <input type="file" multiple accept="image/*" onChange={handleImages} style={{display: 'none'}} />
                </label>
                <div className="image-previews">
                  {form.images.map((img, i) => (
                    <div key={i} className="thumb" onClick={() => setForm(p => ({...p, images: p.images.filter((_,idx)=>idx!==i)}))}>
                      <img src={img} alt="preview" /><span>x</span>
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit">{editingId ? 'Update' : 'Publish'}</button>
            </form>

            <div className="projects-list">
               {projects.map(p => (
                <div key={p.id} className="project-item">
                  <div className="p-img">{p.images[0] && <img src={p.images[0]} alt="t"/>}</div>
                  <div className="p-info"><strong>{p.title}</strong><small>{p.category}</small></div>
                  <div className="actions">
                     <button onClick={() => { setForm(p); setEditingId(p.id); }}>Edit</button>
                     <button onClick={() => saveProjects(projects.filter(x => x.id !== p.id))} className="del">Del</button>
                  </div>
                </div>
               ))}
            </div>
           </>
        )}
      </div>
    </div>
  );
}