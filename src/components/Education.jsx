import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';  // Correct import
import './Education.css';

const educationData = [
  {
    institution: "Masinde Muliro University",
    degree: "BSc. Information Technology",
    period: "2021 - 2025",
    description: "Bachelor's degree in Information Technology",
    achievements: [
      "Specialized in software development and system architecture",
      "Completed coursework in Java, Databases, and Web Technologies",
    ],
    bgImage: "mmust.jpg",
  },
  {
    institution: "Chianda Boys High School",
    degree: "Kenya Certificate of Secondary Education",
    period: "2017 - 2020",
    description: "Graduated with B+ (71 points)",
    achievements: ["Mathematics and Sciences focus", "Participated in technical clubs"],
    bgImage: "chianda.jpeg",
  },
  {
    institution: "Tuju Primary School",
    degree: "Kenya Certificate of Primary Education",
    period: "2016",
    description: "Graduated with 358 marks out of 500",
    achievements: ["Top performer in mathematics", "Early interest in technology"],
    bgImage: "Tuju.jpg",
  },
];

const certifications = [
  {
    title: "Basic Digital Skills",
    issuer: "ICT Authority, Kenya & KICTANet",
    date: "2025",
    description: "Online certificate of completion",
    bgImage: "kicktanet.PNG",
  },
  {
    title: "Integrating WhatsApp with ChatGPT",
    issuer: "SimpliLearn",
    date: "2025",
    description: "Certificate of completion",
    bgImage: "simpli.PNG",
  },
  {
    title: "AI, Cybersecurity, Cloud Computing",
    issuer: "IBM",
    date: "2022",
    description: "Completion certificate - Academic Achievement Award",
    bgImage: "cert.jpg",
  },
];

const EducationCard = ({ edu, index }) => {
  const bgUrl = `${process.env.PUBLIC_URL}/${edu.bgImage}`;
  
  return (
    <motion.div 
      className="timeline-item"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <div className="timeline-marker"></div>
      <div className="timeline-content">
        <div
          className="education-bg-image"
          style={{ backgroundImage: `url(${bgUrl})` }}
          aria-label={`${edu.institution} background image`}
        ></div>
        <div className="content-overlay">
          <h4>{edu.institution}</h4>
          <div className="timeline-meta">
            <span className="degree">{edu.degree}</span>
            <span className="period">{edu.period}</span>
          </div>
          <p className="timeline-description">{edu.description}</p>
          <ul className="achievements-list">
            {edu.achievements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const CertificationCard = ({ cert, index }) => {
  const bgUrl = `${process.env.PUBLIC_URL}/${cert.bgImage}`;
  
  return (
    <motion.div
      className="certification-card"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div
        className="certification-bg-image"
        style={{ backgroundImage: `url(${bgUrl})` }}
        aria-label={`${cert.issuer} certification background`}
      ></div>
      <div className="certification-content">
        <div className="certification-header">
          <h4>{cert.title}</h4>
          <span className="certification-date">{cert.date}</span>
        </div>
        <div className="certification-body">
          <p className="issuer">{cert.issuer}</p>
          <p className="description">{cert.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section id="education" className="education-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="title-decorator">Education & Certifications</span>
          </h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Formal education and professional certifications that shaped my technical expertise
          </motion.p>
        </motion.div>

        <div className="education-container">
          <div className="education-timeline">
            <h3 className="timeline-title">Academic Journey</h3>
            <div className="timeline">
              {educationData.map((edu, index) => (
                <EducationCard key={index} edu={edu} index={index} />
              ))}
            </div>
          </div>

          <div className="certifications-grid">
            <h3 className="certifications-title">Professional Certifications</h3>
            <div className="certifications">
              {certifications.map((cert, index) => (
                <CertificationCard key={index} cert={cert} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}