// App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import About from './components/about.jsx';
import Project from './components/Project.jsx';
import Skills from './components/skills.jsx';
import { motion } from "framer-motion";
import Contact from './components/contact.jsx';
import './styles/App.scss';

function App() {
  return (
    <div className="app-layout">
      {/* Navbar hamesha yahan render hoga */}
      <Navbar /> 
      
      {/* Main content area jahan pages switch honge */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/skills" element={<Skills />} />
      
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;