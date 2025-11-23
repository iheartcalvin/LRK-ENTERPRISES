// src/components/Skill.js
import React from 'react'

function Skill() {
  return (
    <div id='skills' className='Skill'>
        <h1>What we Do!</h1>
        <div className='rate'>
        
        {/* Electronic Parts Supply */}
        <div className='web'>
        <h3>Electronic Parts Supply</h3>
        <p>
        Sourcing and distribution of high-quality electronic components. Partnerships with trusted suppliers to ensure cost-effective and timely delivery.</p>
        <div className='bar'></div>
        </div>

        {/* Fabrication Services */}
        <div className='graphics'>
        <h3>Fabrication Services</h3>
        <p>From raw materials to finished products, our fabrication capabilities cover a wide range of needs. Explore our CNC cutting, welding, and structural metalwork services.</p>
        <div className='bar2'></div>
        </div>

        {/* Repair & Maintenance */}
        <div className='compmain'>
        <h3>Repair & Maintenance Services</h3>
        <p>Professional repair and preventive maintenance of electronic machines and equipment. On-site and workshop services designed to minimize downtime for clients.</p>
        <div className='bar3'></div>
        </div>

        {/* Tech Manufacturing */}
        <div className='software'>
        <h3>Tech Manufacturing</h3>
        <p>Development and assembly of cutting-edge technology-driven solutions. Focus on innovation, automation, and efficiency to meet evolving industry demands.</p>
        <div className='bar4'></div>
        </div>
        
        </div>
    </div>
  )
}

export default Skill