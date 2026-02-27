import React from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Benefits from './pages/Benefits';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Features from './pages/Features';
import Home from './pages/Home';
import HowToUse from './pages/HowToUse';
import LegalNotice from './pages/LegalNotice';
import Pricing from './pages/Pricing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import WhyChoose from './pages/WhyChoose';
import DocsIndex from './pages/docs/DocsIndex';
import DocsPage from './pages/docs/DocsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/why-choose" element={<WhyChoose />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/legal-notice" element={<LegalNotice />} />
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
