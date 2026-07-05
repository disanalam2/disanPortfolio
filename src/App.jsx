import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga4';

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-PEPZVJ6MEK";
ReactGA.initialize(GA_MEASUREMENT_ID);

// Naye Layout aur Page imports
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/common/Loader';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy loaded pages
const AboutContainer = lazy(() => import('./pages/About/AboutContainer'));
const Projects = lazy(() => import('./pages/Projects/Projects'));
const Skills = lazy(() => import('./pages/Skills/Skills'));
const Experience = lazy(() => import('./pages/Experience/Experience'));
const Education = lazy(() => import('./pages/Education/Education'));
const Certificates = lazy(() => import('./pages/Certificate/Certificates'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const BlogsArchive = lazy(() => import('./pages/Blogs/BlogsArchive'));
const BlogPost = lazy(() => import('./pages/Blogs/BlogPost'));
const Login = lazy(() => import('./pages/Admin/Login'));

import './styles/main.scss'; // Assuming main.scss handles the global variables and layout classes

function App() {
  const location = useLocation();
  
  // Track page views on route change
  React.useEffect(() => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location]);

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <ErrorBoundary>
          <AnimatePresence mode="wait" initial={false}>
            <Suspense fallback={<Loader message="Loading Page..." />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AboutContainer />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/education" element={<Education />} />
                <Route path="/certificate" element={<Certificates />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blogs" element={<BlogsArchive />} />
                <Route path="/blogs/:slug" element={<BlogPost />} />
                <Route path="/admin" element={<Login />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;