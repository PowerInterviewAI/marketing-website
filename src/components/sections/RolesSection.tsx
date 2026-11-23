import React from 'react';

import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

import { RolePicker } from './RolePicker';

/** Carries the old Benefits and Why Us anchors, which legacy URLs still redirect to. */
export const RolesSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const copy = getMessages(locale).story.roles;

  return (
    <Section id={SECTIONS.benefits} tone="muted" aria-labelledby="roles-heading">
      <span id={SECTIONS.whyChoose} className="absolute -top-20" aria-hidden="true" />
      <SectionHeading
        id="roles-heading"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <RolePicker copy={copy} />
    </Section>
  );
};

export default RolesSection;
