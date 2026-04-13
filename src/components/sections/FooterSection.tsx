import React from 'react';

import { SiDiscord, SiGithub, SiProtonmail, SiTelegram, SiX } from '@icons-pack/react-simple-icons';
import { Link, useLocation } from 'react-router-dom';

import Container from '@/components/Container';

interface FooterSectionProps {
  scrollToSection?: (sectionId: string) => void; // optional; if provided we still support in-page scroll on home
}

export const FooterSection: React.FC<FooterSectionProps> = ({ scrollToSection }) => {
  const location = useLocation();

  return (
    <footer className="border-t py-12 md:py-16" role="contentinfo">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Power Interview AI Logo"
                className="h-6 w-6"
              />
              <span className="text-lg font-bold">Power Interview AI</span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Your personal AI-powered interview coach. Privacy-first, powerful, and effective.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/PowerInterviewAI/client"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="GitHub"
              >
                <SiGithub className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/power_interview_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Telegram"
              >
                <SiTelegram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/power_interview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="X"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/TJJp5azK7Z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Discord"
              >
                <SiDiscord className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@powerinterviewai.com"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Email"
              >
                <SiProtonmail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                {location.pathname === '/' && scrollToSection ? (
                  <button
                    onClick={() => scrollToSection('features')}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Features
                  </button>
                ) : (
                  <Link
                    to="/features"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Features
                  </Link>
                )}
              </li>
              <li>
                {location.pathname === '/' && scrollToSection ? (
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Pricing
                  </button>
                ) : (
                  <Link
                    to="/pricing"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Pricing
                  </Link>
                )}
              </li>
              <li>
                <a
                  href="https://github.com/PowerInterviewAI/client/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Download
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                {location.pathname === '/' && scrollToSection ? (
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    FAQ
                  </button>
                ) : (
                  <Link
                    to="/faq"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    FAQ
                  </Link>
                )}
              </li>
              <li>
                <a
                  href="https://github.com/PowerInterviewAI/client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/power_interview_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Telegram Channel
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/TJJp5azK7Z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Discord Server
                </a>
              </li>
              <li>
                {location.pathname === '/' && scrollToSection ? (
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Support
                  </button>
                ) : (
                  <Link
                    to="/contact"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Support
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/PowerInterviewAI/client/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  License
                </a>
              </li>
              <li>
                {location.pathname === '/' && scrollToSection ? (
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Contact
                  </button>
                ) : (
                  <Link
                    to="/contact"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Contact
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Power Interview AI. All rights reserved.</p>
          <p className="mt-2">Made to help you ace your interviews while protecting your privacy</p>
        </div>
      </Container>
    </footer>
  );
};

export default FooterSection;
