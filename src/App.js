import React, { useState, lazy, Suspense } from 'react';
import './App.css';

const HeroSection = lazy(() => import('./components/HeroSection'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const LinkInterceptorWithToast = lazy(() => import('./components/LinkInterceptorWithToast'));
const ChatbotWidget = lazy(() => import('./components/ChatbotWidget')); // ✅ Chatbot import
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [visitedPages, setVisitedPages] = useState({
    about: false,
    experience: false,
    skills: false,
    projects: false,
    education: false,
    contact: false
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (!visitedPages[page]) {
      setVisitedPages(prev => ({ ...prev, [page]: true }));
    }
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HeroSection />;
      case 'about':
        return visitedPages.about ? <About key="about" /> : null;
      case 'experience':
        return visitedPages.experience ? <Experience key="experience" /> : null;
      case 'skills':
        return visitedPages.skills ? <Skills key="skills" /> : null;
      case 'projects':
        return visitedPages.projects ? <Projects key="projects" /> : null;
      case 'education':
        return visitedPages.education ? <Education key="education" /> : null;
      case 'contact':
        return visitedPages.contact ? <Contact key="contact" /> : null;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="app">
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <LinkInterceptorWithToast>
          <nav className="navbar">
            <div className="nav-container">
              <button 
                className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handlePageChange('home')}
              >
                Home
              </button>
              <button 
                className={`nav-btn ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => handlePageChange('about')}
              >
                About
              </button>
              <button 
                className={`nav-btn ${currentPage === 'experience' ? 'active' : ''}`}
                onClick={() => handlePageChange('experience')}
              >
                Experience
              </button>
              <button 
                className={`nav-btn ${currentPage === 'skills' ? 'active' : ''}`}
                onClick={() => handlePageChange('skills')}
              >
                Skills
              </button>
              <button 
                className={`nav-btn ${currentPage === 'projects' ? 'active' : ''}`}
                onClick={() => handlePageChange('projects')}
              >
                Projects
              </button>
              <button 
                className={`nav-btn ${currentPage === 'education' ? 'active' : ''}`}
                onClick={() => handlePageChange('education')}
              >
                Education
              </button>
              <button 
                className={`nav-btn ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => handlePageChange('contact')}
              >
                Contact
              </button>
            </div>
          </nav>

          <main className="page-content">
            {renderPage()}
          </main>

          <Footer />
          {currentPage !== 'home' && <ChatbotWidget />} {/* ✅ Show chatbot on all except homepage */}
        </LinkInterceptorWithToast>
      </Suspense>
    </div>
  );
}

export default App;
