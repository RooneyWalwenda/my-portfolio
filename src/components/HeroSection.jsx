import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import './Hero.css';
import { Link as ScrollLink } from 'react-scroll';

export default function HeroSection({ setActiveTab }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const typewriterRef = useRef(null);

  const words = useMemo(() => [
    "React", "Java", "Spring Boot", "Docker",
    "JavaScript", "REST APIs", "MySQL", "Git"
  ], []);

  const typingSpeed = 150;
  const deletingSpeed = 70;
  const pauseBetweenWords = 1500;

  useEffect(() => {
    const typewriterEffect = () => {
      const currentWord = words[currentWordIndex];

      if (isTyping) {
        if (currentCharIndex < currentWord.length) {
          setTimeout(() => {
            setCurrentCharIndex(prev => prev + 1);
          }, typingSpeed);
        } else {
          setTimeout(() => {
            setIsTyping(false);
            setIsDeleting(true);
          }, pauseBetweenWords);
        }
      } else if (isDeleting) {
        if (currentCharIndex > 0) {
          setTimeout(() => {
            setCurrentCharIndex(prev => prev - 1);
          }, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setIsTyping(true);
        }
      }
    };

    const cursorBlink = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    const typingTimeout = setTimeout(typewriterEffect, isTyping ? typingSpeed : isDeleting ? deletingSpeed : pauseBetweenWords);

    return () => {
      clearTimeout(typingTimeout);
      clearInterval(cursorBlink);
    };
  }, [currentCharIndex, currentWordIndex, isTyping, isDeleting, words]);

  const handleViewCV = () => {
    window.open('/My Cv.pdf', '_blank');
  };

  const handleHireMeClick = () => {
    // Open WhatsApp with pre-filled message
    window.open("https://wa.me/254743485063?text=Hello%20Rooney%2C%20let's%20connect%20for%20work!", "_blank");
    
    // Optional: If you still want to switch to contact tab
    if (typeof setActiveTab === 'function') {
      setActiveTab('contact');
    }
  };

  return (
    <>
      <Helmet>
        <title>Roony Walwenda | Software Developer</title>
        <meta name="description" content="Professional portfolio of Roony Walwenda, Software Developer specializing in React, Java, and Spring Boot" />
      </Helmet>

      <section className="hero" id="home">
        <div className="video-background" aria-hidden="true">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            src="/Video files/animation coding video.mp4"
            className="background-video"
          />
          <div className="video-overlay"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="hero-greeting">Hi, I'm</span>
                <span className="name-gradient">Roony Walwenda</span>
              </h1>
              <p className="hero-subtitle">
                Software Developer | IT Graduate passionate about building modern, 
                high-performance applications with robust systems.
              </p>

              <div className="typewriter-container">
                <p className="typewriter-prefix">When Career meets passion..</p>
                <div className="typewriter-wrapper" ref={typewriterRef}>
                  <span className="typewriter-text">
                    {words[currentWordIndex].substring(0, currentCharIndex)}
                    <span className={`typewriter-cursor ${showCursor ? 'visible' : ''}`}>|</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-cta">
              <button 
                onClick={handleHireMeClick}
                className="btn btn-primary"
                aria-label="Contact Roony on WhatsApp"
              >
                <span className="btn-text">Hire Me</span>
                <div className="btn-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              <button 
                onClick={handleViewCV}
                className="btn btn-secondary"
                aria-label="View Roony's CV"
              >
                <span className="btn-text">View My CV</span>
                <div className="btn-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>

            <div className="tech-stack">
              {words.map((tech, index) => (
                <div 
                  className="tech-badge" 
                  key={tech}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-image">
            <div className="image-wrapper">
              <img 
                src="/profile-illustration.svg" 
                alt="Roony Walwenda - Software Developer" 
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <ScrollLink 
          to="about" 
          smooth={true} 
          duration={500} 
          className="scroll-indicator"
        >
          <span>Explore my work</span>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </ScrollLink>
      </section>
    </>
  );
}