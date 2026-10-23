import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Naye Layout aur Page imports
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/common/Loader';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useAnalytics } from './hooks/useAnalytics';
import BackendStatusBanner from './components/common/BackendStatusBanner';
import BrandBackground from './components/common/BrandBackground';

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

// Legal & Statutory Compliance Pages (Gateway Approval & Freelancing)
const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/Legal/TermsConditions'));
const RefundPolicy = lazy(() => import('./pages/Legal/RefundPolicy'));
const DeliveryPolicy = lazy(() => import('./pages/Legal/DeliveryPolicy'));

import './styles/main.scss'; // Assuming main.scss handles the global variables and layout classes

function App() {
  const location = useLocation();
  
  useAnalytics();

  // Instant scroll-to-top on route change so user starts at the top of pages (especially from footer links)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Track page views on route change (Legacy Gtag)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-PEPZVJ6MEK', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return (
    <div className="app-layout">
      {/* Architectural 'DA' Brand & Cyber Technical Background Layer */}
      <BrandBackground />
      <BackendStatusBanner />
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

                {/* Legal & Compliance Routes (Payment Gateways & Freelancing) */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsConditions />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/delivery-policy" element={<DeliveryPolicy />} />
                <Route path="/shipping-policy" element={<DeliveryPolicy />} />
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