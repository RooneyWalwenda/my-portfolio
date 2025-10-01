import React, { useState } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { FaServer, FaReact, FaDatabase, FaMobileAlt } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Projects.css';

const projects = [
  {
    title: "WinsFit Backend",
    description: "High-performance Spring Boot backend with Twilio integration for WinsFit's physiotherapy platform.",
    tech: [
      { name: "Spring Boot", icon: <FaServer /> },
      { name: "MySQL", icon: <FaDatabase /> },
      { name: "Twilio" },
      { name: "Docker" },
      { name: "JWT Auth" }
    ],
    demo: "https://winstec.me/",
    code: "https://github.com/rooneywalwenda/WinsFitApp",
    features: [
      "Twilio SMS/email integration",
      "Handles 1000+ concurrent requests",
      "Automated appointment reminders"
    ],
    hasVideo: true
  },
  {
    title: "WinsFit Frontend",
    description: "React-based interface for exercise prescription and physiotherapy bookings.",
    tech: [
      { name: "React", icon: <FaReact /> },
      { name: "Context API" },
      { name: "Responsive UI", icon: <FaMobileAlt /> }
    ],
    demo: "https://winstec.me/",
    code: "https://github.com/RooneyWalwenda/WinsFit-frontend",
    features: [
      "Interactive exercise planner",
      "Real-time booking system",
      "Patient progress tracking"
    ],
    hasVideo: true
  },
  {
    title: "Portfolio Website",
    description: "Professional showcase built with React demonstrating modern web development practices.",
    tech: [
      { name: "React", icon: <FaReact /> },
      { name: "CSS3" },
      { name: "Responsive Design" }
    ],
    demo: "https://www.winstec.me/",
    code: "https://github.com/RooneyWalwenda/my-portfolio",
    features: [
      "Performance optimized",
      "SEO friendly structure",
      "Accessibility compliant"
    ]
  }
];

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    },
    hidden: { opacity: 0, y: 50 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`project-card ${project.hasVideo ? 'has-video' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {project.hasVideo && (
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="project-video-bg"
          animate={{
            opacity: isHovered ? 0.25 : 0.15,
            scale: isHovered ? 1.03 : 1
          }}
          transition={{ duration: 0.4 }}
        >
          <source src="/Video files/animation web.mp4" type="video/mp4" />
        </motion.video>
      )}
      
      <div className="project-content">
        <div className="project-header">
          <h3>{project.title}</h3>
          <div className="project-links">
            <motion.a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiExternalLink /> Demo
            </motion.a>
            <motion.a 
              href={project.code} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub /> Code
            </motion.a>
          </div>
        </div>

        <p className="project-description">{project.description}</p>

        <div className="tech-stack">
          <h4>Technology Stack</h4>
          <div className="tech-tags">
            {project.tech.map((tech, i) => (
              <motion.span 
                key={i}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {tech.icon && <span className="tech-icon">{tech.icon}</span>}
                {tech.name}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="project-features">
          <h4>Key Features</h4>
          <ul>
            {project.features.map((feature, i) => (
              <motion.li 
                key={i}
                initial={{ x: -10, opacity: 0 }}
                animate={inView ? { 
                  x: 0, 
                  opacity: 1,
                  transition: {
                    delay: 0.3 + (i * 0.1),
                    duration: 0.4
                  }
                } : {}}
              >
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const headerVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    },
    hidden: { opacity: 0 }
  };

  const titleVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    },
    hidden: { opacity: 0, y: -30 }
  };

  const subtitleVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    },
    hidden: { opacity: 0, y: 20 }
  };

  const decoratorVariants = {
    visible: {
      width: ['0%', '100%'],
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    },
    hidden: { width: '0%' }
  };

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial="hidden"
          animate={controls}
          variants={headerVariants}
        >
          <motion.h2 className="section-title" variants={titleVariants}>
            <span className="title-decorator">
              Technical Excellence
              <motion.span 
                className="decorator-line"
                variants={decoratorVariants}
              />
            </span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={subtitleVariants}>
            Engineered solutions demonstrating architectural sophistication
          </motion.p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}