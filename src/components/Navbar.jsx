import React, { useState } from 'react';
import { Link } from 'react-scroll';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">RW</div>
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="hero" smooth={true} duration={500}>Home</Link>
          <Link to="about" smooth={true} duration={500}>About</Link>
          <Link to="skills" smooth={true} duration={500}>Skills</Link>
          <Link to="projects" smooth={true} duration={500}>Projects</Link>
          <Link to="contact" smooth={true} duration={500}>Contact</Link>
        </div>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      </div>
    </nav>
  );
}