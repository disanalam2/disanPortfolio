import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Naye Layout aur Page imports
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AboutContainer from './pages/About/AboutContainer';
import Projects from './pages/Projects/Projects';
import Skills from './pages/Skills/Skills';
import Experience from './pages/Experience/Experience';
import Education from './pages/Education/Education';
import Certificates from './pages/Certificate/Certificates';
import Contact from './pages/Contact/Contact';
import Login from './pages/Admin/Login';

import './styles/main.scss'; // Assuming main.scss handles the global variables and layout classes

function App() {
  const location = useLocation();
  
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AboutContainer />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/certificate" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Login />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;