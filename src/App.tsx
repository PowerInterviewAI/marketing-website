import React from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ScrollToTop from '@/components/ScrollToTop';

import Benefits from './legacy-pages/Benefits';
import Contact from './legacy-pages/Contact';
import FAQ from './legacy-pages/FAQ';
import Features from './legacy-pages/Features';
import Home from './legacy-pages/Home';
import Pricing from './legacy-pages/Pricing';
import PrivacyPolicy from './legacy-pages/PrivacyPolicy';
import TermsOfService from './legacy-pages/TermsOfService';
import WhyChoose from './legacy-pages/WhyChoose';
import DocsIndex from './legacy-pages/docs';
import DocsPage from './legacy-pages/docs/[slug]';

const App: React.FC = () => {
  const showUpgradeOverlay = false;

  return (
    <BrowserRouter>
      <ScrollToTop />

      {showUpgradeOverlay && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 px-6 py-8 text-center text-white">
          <div className="max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl backdrop-blur-sm">
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-slate-400">
              Service upgrade underway
            </p>
            <h1 className="mb-4 text-4xl font-semibold sm:text-5xl">We'll be back soon</h1>
            <p className="text-lg leading-8 text-slate-300">
              Our service is currently upgrading. Thank you for your patience - please check back
              shortly.
            </p>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/why-choose" element={<WhyChoose />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/docs" element={<DocsIndex />} />
        <Route path="/docs/:slug" element={<DocsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
