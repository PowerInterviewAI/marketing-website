import React, { useState } from 'react';

import Seo from '@/components/Seo';
import { ContactSection, FooterSection, Header } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const ContactPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const description =
    'Contact Power Interview AI support or sales - reach out for help, partnership, or product inquiries.';

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Contact"
        description={description}
        url="https://www.powerinterviewai.com/contact"
      />
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default ContactPage;
