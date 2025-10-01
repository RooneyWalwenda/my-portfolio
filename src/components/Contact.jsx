import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import './contact.css';

function Contact() {
  return (
    <section className="contact-section" id="contact">
      {/* Decorative divider */}
      <div className="section-divider">
        <div className="divider-line"></div>
      </div>

      {/* Main container */}
      <div className="contact-container">
        {/* Animated title */}
        <h2 className="section-title">
          <span className="title-text">Get In Touch</span>
          <span className="title-underline"></span>
        </h2>

        {/* Contact grid */}
        <div className="contact-grid">
          {/* Email Card */}
          <div className="contact-card">
            <div className="card-inner">
              <div className="icon-wrapper" style={{ '--icon-color': '#D44638' }}>
                <FaEnvelope className="contact-icon" />
                <div className="icon-backdrop"></div>
              </div>
              <div className="text-content">
                <h3>Email</h3>
                <a href="mailto:walwendarooney@gmail.com" className="contact-link">
                  walwendarooney@gmail.com
                  <FiArrowUpRight className="link-arrow" />
                </a>
              </div>
            </div>
            <div className="card-hover-effect"></div>
          </div>

          {/* LinkedIn Card */}
<div className="contact-card">
  <div className="card-inner">
    <div className="icon-wrapper" style={{ '--icon-color': '#0A66C2' }}>
      <FaLinkedin className="contact-icon" />
      <div className="icon-backdrop"></div>
    </div>
    <div className="text-content">
      <h3>LinkedIn</h3>
      <a 
        href="https://www.linkedin.com/in/rooneysoftwaredevletscode?originalSubdomain=ke" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="contact-link"
        data-skip-external
      >
        Connect Now
        <FiArrowUpRight className="link-arrow" />
      </a>
    </div>
  </div>
  <div className="card-hover-effect"></div>
</div>

          {/* GitHub Card */}
          <div className="contact-card">
            <div className="card-inner">
              <div className="icon-wrapper" style={{ '--icon-color': '#181717' }}>
                <FaGithub className="contact-icon" />
                <div className="icon-backdrop"></div>
              </div>
              <div className="text-content">
                <h3>GitHub</h3>
                <a 
                  href="https://github.com/rooneywalwenda" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  View Projects
                  <FiArrowUpRight className="link-arrow" />
                </a>
              </div>
            </div>
            <div className="card-hover-effect"></div>
          </div>

          {/* WhatsApp Card */}
          <div className="contact-card">
            <div className="card-inner">
              <div className="icon-wrapper" style={{ '--icon-color': '#25D366' }}>
                <FaWhatsapp className="contact-icon" />
                <div className="icon-backdrop"></div>
              </div>
              <div className="text-content">
                <h3>WhatsApp</h3>
                <a 
                  href="https://wa.me/254743485063?text=Hello%20Rooney%2C%20let's%20connect!" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  Instant Message
                  <FiArrowUpRight className="link-arrow" />
                </a>
              </div>
            </div>
            <div className="card-hover-effect"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;