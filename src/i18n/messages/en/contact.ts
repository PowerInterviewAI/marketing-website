export const contact = {
  eyebrow: 'Contact',
  title: 'Get in touch',
  description: 'Questions, billing, or a bug during a call - pick whichever channel suits you.',
  discord: { handle: 'Community server', blurb: 'Chat with other candidates and the team' },
  telegram: { blurb: 'Announcements and quick questions' },
  x: { blurb: 'Product updates' },
  email: { name: 'Email', blurb: 'Detailed enquiries, billing, and refunds' },
  github: { blurb: 'Releases, issues, and source' },
};

export type Contact = typeof contact;
