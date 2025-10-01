import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { motion } from 'framer-motion';
import './About.css';

const FloatingIcons = lazy(() => import('./FloatingIcons'));

const About = () => {
  const [animationKey, setAnimationKey] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [showProficiencies, setShowProficiencies] = useState([false, false, false]);

  const webDevText = 'Crafting responsive, high-performance web applications with modern frameworks, clean architecture patterns, and optimized workflows for scalable digital experiences';

  const resetAnimations = useCallback(() => {
    setTypedText('');
    setTypingComplete(false);
    setShowProficiencies([false, false, false]);
    setAnimationKey(prev => prev + 1);
  }, []);

  const startProficiencyAnimations = useCallback(() => {
    [0, 1, 2].forEach((_, i) => {
      setTimeout(() => {
        setShowProficiencies(prev => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      }, i * 200);
    });
  }, []);

  useEffect(() => {
    resetAnimations();
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < webDevText.length) {
        setTypedText(webDevText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTypingComplete(true);
        startProficiencyAnimations();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [resetAnimations, startProficiencyAnimations, webDevText]);

  // Force visibility of all elements
  useEffect(() => {
    const forceVisible = () => {
      document.querySelectorAll('.about-section *').forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      });
    };
    
    const timer = setTimeout(forceVisible, 100);
    return () => clearTimeout(timer);
  }, [animationKey]);

  // Animation variants
  const wordContainer = { 
    hidden: {}, 
    visible: { 
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.2
      } 
    } 
  };
  
  const wordItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };
  
  const cardContainer = { 
    hidden: {}, 
    visible: { 
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.5 
      } 
    } 
  };
  
  const cardItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 120, 
        damping: 12,
        mass: 0.5
      } 
    },
    hover: { 
      y: -8,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.3 }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        type: 'spring',
        stiffness: 400
      }
    })
  };

  const headerText = 'Professional Profile'.split(' ');
  const subtitleText = 'Software Developer | Web & Desktop Solutions Architect'.split(' ');

  const expertise = [
    {
      title: 'Web Development',
      text: typingComplete ? webDevText : typedText || '\u00A0',
      tech: ['React', 'JavaScript', 'HTML/CSS', 'Framer Motion'],
      icon: '🌐',
      gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
    },
    {
      title: 'Desktop Solutions',
      text: 'Engineering cross-platform desktop applications with native performance, modern UX principles, and seamless system integration.',
      tech: ['JavaFX', 'Kotlin', 'C++'],
      icon: '💻',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    }
  ];

  const proficiencies = [
    { 
      heading: 'Frontend', 
      list: ['React', 'JavaScript', 'HTML/CSS', 'Framer Motion'],
      color: '#6366f1',
      icon: '🖥️'
    },
    { 
      heading: 'Backend', 
      list: ['Spring Boot', 'MySQL', 'REST APIs'],
      color: '#10b981',
      icon: '⚙️'
    },
    { 
      heading: 'DevOps', 
      list: ['Docker', 'Git', 'Figma'],
      color: '#f59e0b',
      icon: '🔧'
    }
  ];

  return (
    <section id="about" className="about-section" key={animationKey}>
      <div className="about-container">
        <motion.div 
          className="about-header" 
          variants={wordContainer} 
          initial="hidden" 
          animate="visible"
        >
          <h2 className="about-title">
            {headerText.map((word, i) => (
              <motion.span 
                key={`header-${i}-${animationKey}`}
                variants={wordItem} 
                className="word" 
                style={{ '--i': i }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </h2>
          <motion.div 
            className="about-divider" 
            variants={wordItem}
          />
          <p className="about-subtitle">
            {subtitleText.map((word, i) => (
              <motion.span 
                key={`subtitle-${i}-${animationKey}`}
                variants={wordItem} 
                className="word" 
                style={{ '--i': i }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </p>
        </motion.div>

        <motion.div 
          className="professional-showcase" 
          variants={cardContainer} 
          initial="hidden" 
          animate="visible"
        >
          <div className="expertise-container">
            <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
              <FloatingIcons />
            </Suspense>

            <motion.div className="core-expertise">
              {expertise.map((item, idx) => (
                <motion.div
                  key={`expertise-${idx}-${animationKey}`}
                  className={`expertise-card ${item.title === 'Web Development' ? 'web-dev-card' : 'desktop-card'}`}
                  variants={cardItem}
                  whileHover="hover"
                >
                  <div className="card-header">
                    <motion.span 
                      className="card-icon"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        y: [0, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: idx * 0.3
                      }}
                    >
                      {item.icon}
                    </motion.span>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.text}</p>
                  <div className="tech-stack">
                    {item.tech.map((t, i) => (
                      <motion.span 
                        key={`tech-${i}-${animationKey}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: typingComplete ? 1 : 0, y: typingComplete ? 0 : 10 }}
                        transition={{ 
                          delay: typingComplete ? 0.3 + i * 0.1 : 0,
                          type: 'spring',
                          stiffness: 300
                        }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: idx === 0 ? 'rgba(37, 99, 235, 0.2)' : 'rgba(16, 185, 129, 0.2)'
                        }}
                        style={{ opacity: 1 }} // Force visibility
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className="technical-profile" 
            variants={cardItem}
            whileHover="hover"
          >
            <h3>Technical Proficiencies</h3>
            <div className="proficiency-columns">
              {proficiencies.map((col, i) => (
                <motion.div 
                  className="proficiency-column" 
                  key={`proficiency-${i}-${animationKey}`}
                  variants={cardItem}
                  initial="hidden"
                  animate={showProficiencies[i] ? "visible" : "hidden"}
                >
                  <h4 style={{ color: col.color }}>
                    <span className="column-icon" style={{ backgroundColor: col.color }}>
                      {col.icon}
                    </span>
                    {col.heading}
                  </h4>
                  <ul>
                    {col.list.map((li, j) => (
                      <motion.li 
                        key={`proficiency-item-${j}-${animationKey}`}
                        custom={j}
                        variants={listItem}
                        initial="hidden"
                        animate={showProficiencies[i] ? "visible" : "hidden"}
                        whileHover={{ 
                          x: 8,
                          color: col.color
                        }}
                        style={{ opacity: 1 }} // Force visibility
                      >
                        <svg 
                          className="proficiency-icon" 
                          viewBox="0 0 24 24" 
                          width="16" 
                          height="16"
                          style={{ color: col.color }}
                        >
                          <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                        </svg>
                        {li}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;