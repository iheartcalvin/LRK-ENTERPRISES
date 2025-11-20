// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';

const CATEGORIES = ['Web Apps', 'Graphics Design', 'UX & UI', 'Fabrication', 'Repair'];

// CHANGE THIS PASSWORD TO WHATEVER YOU WANT (keep it secret!)
const SECRET_PASSWORD = 'lrk2025';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({ title: '', desc: '', category: CATEGORIES[0], image: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('lrk-projects');
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  const saveProjects = (newProjects) => {
    localStorage.setItem('lrk-projects', JSON.stringify(newProjects));
    setProjects(newProjects);
    window.dispatchEvent(new Event('storage'));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const submitProject = (e) => {
    e.preventDefault();
    const updated = editingId
      ? projects.map(p => p.id === editingId ? { ...form, id: editingId } : p)
      : [...projects, { ...form, id: Date.now() }];
    saveProjects(updated);
    setForm({ title: '', desc: '', category: CATEGORIES[0], image: '' });
    setEditingId(null);
  };

  const login = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setShowPassword(false);
      setShowPanel(true);
      setPassword('');
    } else {
      alert('Wrong password!');
    }
  };

  // PORTAL – RENDERS ON TOP OF EVERYTHING
  const portalContent = (
    <>
      {/* LRK BUTTON */}
      <motion.button
        className="admin-toggle"
        onClick={() => setShowPassword(true)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        LRK
      </motion.button>

      {/* PASSWORD MODAL */}
      {showPassword && (
        <div className="password-overlay">
          <motion.div className="password-box" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <h3>LRK Admin Access</h3>
            <form onSubmit={login}>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <div className="password-buttons">
                <button type="submit">Enter</button>
                <button type="button" onClick={() => { setShowPassword(false); setPassword(''); }}>
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ADMIN PANEL */}
      {showPanel && (
        <motion.div
          className="admin-dashboard"
          initial={{ x: -450 }}
          animate={{ x: 0 }}
          exit={{ x: -450 }}
        >
          <div className="admin-header">
            <h2>LRK Admin Panel</h2>
            <button onClick={() => setShowPanel(false)}>×</button>
          </div>

          <form onSubmit={submitProject} className="admin-form">
            <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <textarea placeholder="Description" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} required />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <label className="image-upload">
              {form.image ? <img src={form.image} alt="preview" /> : "Upload Image"}
              <input type="file" accept="image/*" onChange={handleImage} />
            </label>
            <button type="submit">{editingId ? 'Update' : 'Add'} Project</button>
          </form>

          <div className="projects-list">
            <h3>Projects ({projects.length})</h3>
            {projects.map(p => (
              <div key={p.id} className="project-card">
                {p.image && <img src={p.image} alt={p.title} />}
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.category}</p>
                </div>
                <div className="actions">
                  <button onClick={() => { setForm(p); setEditingId(p.id); }}>Edit</button>
                  <button onClick={() => saveProjects(projects.filter(x => x.id !== p.id))} style={{ background: '#ff0033' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );

  return ReactDOM.createPortal(portalContent, document.body);
}