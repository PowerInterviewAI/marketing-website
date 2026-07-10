import React from 'react';

import { SiDiscord, SiGithub, SiProtonmail, SiTelegram, SiX } from '@icons-pack/react-simple-icons';
import { Link, useLocation } from 'react-router-dom';

import Container from '@/components/Container';
import { SectionNavLink } from '@/components/SectionNavLink';

interface FooterSectionProps {
  scrollToSection?: (sectionId: string) => void; // optional; if provided we still support in-page scroll on home
}

const FOOTER_LINK_CLASS = 'text-muted-foreground transition-colors hover:text-primary';

export const FooterSection: React.FC<FooterSectionProps> = ({ scrollToSection }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

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
                href="https://github.com/PowerInterviewAI/client-app"
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
                href="mailto:team@vectorleappulse.xyz"
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
                <SectionNavLink
                  label="Features"
                  sectionId="features"
                  to="/features"
                  isHome={isHome}
                  scrollToSection={scrollToSection}
                  className={FOOTER_LINK_CLASS}
                />
              </li>
              <li>
                <SectionNavLink
                  label="Pricing"
                  sectionId="pricing"
                  to="/pricing"
                  isHome={isHome}
                  scrollToSection={scrollToSection}
                  className={FOOTER_LINK_CLASS}
                />
              </li>
              <li>
                <a
                  href="https://github.com/PowerInterviewAI/client-app/releases/latest"
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
                <SectionNavLink
                  label="FAQ"
                  sectionId="faq"
                  to="/faq"
                  isHome={isHome}
                  scrollToSection={scrollToSection}
                  className={FOOTER_LINK_CLASS}
                />
              </li>
              <li>
                <a
                  href="https://github.com/PowerInterviewAI/client-app"
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
                <SectionNavLink
                  label="Support"
                  sectionId="contact"
                  to="/contact"
                  isHome={isHome}
                  scrollToSection={scrollToSection}
                  className={FOOTER_LINK_CLASS}
                />
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
                  href="https://github.com/PowerInterviewAI/client-app/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  License
                </a>
              </li>
              <li>
                <SectionNavLink
                  label="Contact"
                  sectionId="contact"
                  to="/contact"
                  isHome={isHome}
                  scrollToSection={scrollToSection}
                  className={FOOTER_LINK_CLASS}
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} VectorLeap Pulse Innovation LTD. All rights reserved.
          </p>
          <p className="mt-2">Made to help you ace your interviews while protecting your privacy</p>
        </div>
      </Container>
    </footer>
  );
};

export default FooterSection;
