// src/components/SideBar.jsx
import React, { useState } from 'react';
import '../App.css';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';


function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth < 768) setCollapsed(true);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className='close' onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? ">" : "X"}
      </button>

      <ul className='sidebarList'>
        {/* HOME */}
        <li className='row' onClick={() => scrollTo('home')}>
          <div className="icon"><HomeIcon /></div>
          {!collapsed && <div className="title">Home</div>}
          {collapsed && <span className="tooltip">Home</span>}
        </li>

        {/* SERVICES + DROPDOWN */}
        <li className='row' onClick={() => !collapsed && setServicesOpen(!servicesOpen)}>
          <div className="icon"><BuildIcon /></div>
          {!collapsed && (
            <div className="title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Services
              {servicesOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </div>
          )}
          {collapsed && <span className="tooltip">Services</span>}
        </li>

        {/* DROPDOWN ITEMS - Animated */}
        {!collapsed && (
          <div className={`services-dropdown ${servicesOpen ? 'open' : ''}`}>
            <li className='dropdown-item' onClick={() => scrollTo('machines-fab')}>
              <span>Machine Fabrication</span>
            </li>
            <li className='dropdown-item' onClick={() => scrollTo('custom-fab')}>
              <span>Custom Fabrication</span>
            </li>
            <li className='dropdown-item' onClick={() => scrollTo('repair')}>
              <span>Electronic Repair & Maintenance</span>
            </li>
          </div>
        )}
        {/* If collapsed, show tooltip on hover */}
        {collapsed && servicesOpen && (
          <div className="collapsed-tooltip">
            <div>Machine Fabrication</div>
            <div>Construction Fabrication</div>
            <div>Electronic Repair</div>
          </div>
        )}

        {/* OTHER LINKS */}
        <li className='row' onClick={() => scrollTo('projects')}>
          <div className="icon"><ColorLensIcon /></div>
          {!collapsed && <div className="title">Projects</div>}
          {collapsed && <span className="tooltip">Projects</span>}
        </li>

        <li className='row' onClick={() => scrollTo('contact')}>
          <div className="icon"><ContactPhoneIcon /></div>
          {!collapsed && <div className="title">Clients</div>}
          {collapsed && <span className="tooltip">Clients</span>}
        </li>
      </ul>
    </div>
  );
}

export default SideBar;