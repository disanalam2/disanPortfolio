import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/navbar.jsx';
import About from './components/about.jsx';
import Project from './components/Project.jsx';
import Skills from './components/skills.jsx';
import Experience from './components/experience.jsx';
import Certificate from './components/certificate.jsx';
import Contact from './components/contact.jsx';
import Footer from './components/footer.jsx';
import Login from './components/admin-login.jsx';
import './styles/App.scss';

function App() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<About isAdmin={isAdmin}/>} />
            <Route path="/projects" element={<Project isAdmin={isAdmin}/>} />
            <Route path="/skills" element={<Skills isAdmin={isAdmin}/>} />
            <Route path="/experience" element={<Experience isAdmin={isAdmin}/>} />
            <Route path="/certificate" element={<Certificate isAdmin={isAdmin}/>} />
            <Route path="/contact" element={<Contact isAdmin={isAdmin} />} />
            <Route path="/admin" element={<Login setIsAdmin={setIsAdmin} />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;