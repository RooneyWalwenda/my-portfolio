import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">© {new Date().getFullYear()} Rooney Walwenda. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://linkedin.com/in/rooneywalwenda" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/rooneywalwenda" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="mailto:walwendarooney@gmail.com">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
