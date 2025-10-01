import React, { useEffect, useState } from 'react';
import './Experience.css';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    role: "Lead Backend Developer Intern",
    company: "Giktek Ventures",
    period: "05/2024 - 08/2024",
    location: "Nairobi, Kenya",
    achievements: [
      "Spearheaded backend development for enterprise applications using Spring Boot",
      "Reduced API response times by 30% through optimized database queries",
      "Containerized 3+ microservices using Docker, improving deployment efficiency",
      "Mentored 2 junior developers in RESTful API best practices"
    ],
    technologies: ["Java", "Spring Boot", "MySQL", "Docker", "REST APIs"],
    icon: "💻"
  },
  {
    role: "Full Stack Developer",
    company: "WinsFit Application Team",
    period: "01/2025 - 04/2025",
    location: "Masinde Muliro University",
    achievements: [
      "Developed a fitness application for exercise prescription and physiotherapy integration",
      "Implemented real-time exercise tracking with React frontend and Spring Boot backend",
      "Integrated therapeutic protocols with 95% accuracy rate",
      "Delivered project within 12-week sprint as final year project"
    ],
    technologies: ["React", "Spring Boot", "JavaScript", "Figma"],
    icon: "🚀"
  },
  {
    role: "Help Desk & Support Team Lead",
    company: "Masinde Muliro University",
    period: "05/2022 - 08/2022",
    location: "Kakamega, Kenya",
    achievements: [
      "Led 5-member team providing technical support to 500+ users",
      "Repaired and cleaned desktop computers, monitors and keyboards",
      "Trained 15+ staff members on IT systems and security protocols"
    ],
    photo: "/photos/help_desk.jpg",
    technologies: ["User Support", "Troubleshooting", "Documentation"],
    icon: "🛠️"
  }
];

const ExperienceCard = ({ exp, index, activeCard, setActiveCard }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const isActive = activeCard === index;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.15,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    },
    hidden: { 
      opacity: 0, 
      y: 30 
    }
  };

  const handleCardClick = () => {
    setActiveCard(isActive ? null : index);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      whileHover={{ scale: isActive ? 1 : 1.02 }}
      className={`timeline-card ${exp.photo ? 'has-photo' : ''} ${isActive ? 'active' : ''}`}
      onClick={handleCardClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {exp.photo && (
        <div className="experience-photo">
          <img 
            src={exp.photo} 
            alt={`${exp.role} at ${exp.company}`} 
            className="blended-photo"
            loading="lazy"
          />
          <div className="photo-overlay"></div>
        </div>
      )}
      
      <div className="timeline-content">
        <div className="timeline-header">
          <motion.div className="role-icon" layout>
            {exp.icon}
          </motion.div>
          <div>
            <h3>{exp.role}</h3>
            <div className="timeline-meta">
              <span className="company">{exp.company}</span>
              <span className="period">{exp.period}</span>
              <span className="location">{exp.location}</span>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {(!isActive && !isHovered) && (
            <motion.div 
              className="preview-achievements"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {exp.achievements.slice(0, 2).map((item, i) => (
                <motion.div 
                  key={i}
                  className="preview-achievement"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                >
                  <div className="achievement-marker"></div>
                  {item.length > 60 ? `${item.substring(0, 60)}...` : item}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {(isActive || isHovered) && (
            <motion.ul 
              className="achievements-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {exp.achievements.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                >
                  <div className="achievement-marker"></div>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        
        <div className="tech-tags">
          {exp.technologies.map((tech, i) => (
            <motion.span 
              key={i} 
              className="tech-tag"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              layout
            >
              {tech}
            </motion.span>
          ))}
        </div>
        
        <motion.div 
          className="expand-indicator"
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    visible: { 
      transition: { 
        staggerChildren: 0.1 
      } 
    },
    hidden: { 
      transition: { 
        staggerChildren: 0.05, 
        staggerDirection: -1 
      } 
    }
  };

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>
      <div className="floating-element floating-element-4"></div>
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            hidden: { opacity: 0, y: 20 }
          }}
          className="section-header"
        >
          <h2 className="section-title">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
                hidden: { opacity: 0, y: 20 }
              }}
            >
              Professional Journey
            </motion.span>
          </h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } },
                hidden: { opacity: 0, y: 20 }
              }}
            >
              My career path and key experiences
            </motion.span>
          </p>
        </motion.div>

        <motion.div 
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          layout
        >
          {experiences.map((exp, index) => (
            <ExperienceCard 
              key={index} 
              exp={exp} 
              index={index} 
              activeCard={activeCard}
              setActiveCard={setActiveCard}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}