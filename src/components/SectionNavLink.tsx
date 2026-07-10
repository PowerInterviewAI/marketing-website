'use client';

import React from 'react';

import Link from 'next/link';

interface SectionNavLinkProps {
  label: string;
  sectionId: string;
  to: string;
  isHome: boolean;
  scrollToSection?: (sectionId: string) => void;
  className?: string;
}

// Renders an in-page scroll button on the home page, or a router Link elsewhere.
export const SectionNavLink: React.FC<SectionNavLinkProps> = ({
  label,
  sectionId,
  to,
  isHome,
  scrollToSection,
  className = 'text-sm font-medium transition-colors hover:text-primary',
}) =>
  isHome && scrollToSection ? (
    <button onClick={() => scrollToSection(sectionId)} className={className}>
      {label}
    </button>
  ) : (
    <Link href={to} className={className}>
      {label}
    </Link>
  );

export default SectionNavLink;
