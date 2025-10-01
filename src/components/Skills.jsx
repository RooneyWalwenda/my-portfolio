import React, { useRef, useEffect, useState } from 'react';
import './Skills.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Typewriter = ({ text, delay, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return <span>{currentText}</span>;
};

export default function Skills() {
  const controls = useAnimation();
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [loaded, setLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const cardRefs = useRef([]);

  // Initialize card refs
  useEffect(() => {
    cardRefs.current = Array(6).fill().map((_, i) => cardRefs.current[i] || React.createRef());
  }, []);

  useEffect(() => {
    if (sectionInView) {
      setLoaded(true);
    }
  }, [sectionInView]);

  const methodologies = [
    {
      icon: "🛠️",
      title: "System Architecture",
      description: "Designing scalable backends with proper separation of concerns, clean code principles, and optimized database structures.",
      color: "#ffffff",
      textColor: "#1e293b",
      typewriter: false
    },
    {
      icon: "⚡",
      title: "Performance First",
      description: "Prioritizing efficient algorithms, caching strategies, and lazy loading to ensure lightning-fast applications.",
      color: "#f8fafc",
      textColor: "#1e293b",
      typewriter: true
    },
    {
      icon: "🔒",
      title: "Security Minded",
      description: "Implementing authentication, input validation, and encryption following OWASP guidelines from day one.",
      color: "#ffffff",
      textColor: "#1e293b",
      typewriter: false
    },
    {
      icon: "🔄",
      title: "Agile Delivery",
      description: "Iterative development with CI/CD pipelines, automated testing, and weekly sprints for reliable releases.",
      color: "#f1f5f9",
      textColor: "#1e293b",
      typewriter: true
    },
    {
      icon: "🧪",
      title: "Testing Strategy",
      description: "Comprehensive test coverage including unit, integration, and end-to-end testing for quality assurance.",
      color: "#ffffff",
      textColor: "#1e293b",
      typewriter: false
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Building applications that provide optimal viewing across all device sizes and platforms.",
      color: "#f8fafc",
      textColor: "#1e293b",
      typewriter: true
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    },
    hover: {
      y: -8,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Technical Approach
            </motion.span>
          </h2>
          <motion.div
            className="section-divider"
            initial={{ scaleX: 0 }}
            animate={sectionInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            How I engineer robust solutions
          </motion.p>
        </motion.div>

        <div className="scroll-container">
          <div className="methodology-grid">
            {methodologies.map((method, index) => (
              <motion.div
                key={index}
                ref={cardRefs.current[index]}
                className={`methodology-card ${activeCard === index ? 'active' : ''}`}
                variants={cardVariants}
                initial="hidden"
                animate={sectionInView ? "visible" : "hidden"}
                transition={{ delay: 0.1 * index }}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCard(activeCard === index ? null : index)}
                style={{ 
                  background: method.color,
                  color: method.textColor,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="card-content">
                  <div className="methodology-icon" aria-hidden="true">
                    {method.icon}
                  </div>
                  <h3>{method.title}</h3>
                  <p>
                    {loaded && sectionInView && method.typewriter ? (
                      <Typewriter 
                        text={method.description} 
                        delay={20} 
                        onComplete={() => setActiveCard(index)}
                      />
                    ) : (
                      method.description
                    )}
                  </p>
                </div>
                <div className="card-overlay"></div>
                <motion.div 
                  className="active-indicator"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}