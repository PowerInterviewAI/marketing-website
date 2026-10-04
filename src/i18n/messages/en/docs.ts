/**
 * The documentation's own chrome. The guides themselves are markdown in
 * src/content/docs and are still English only.
 */
export const docs = {
  breadcrumb: {
    label: 'Breadcrumb',
    home: 'Home',
    documentation: 'Documentation',
    notFound: 'Not found',
  },
  sidebar: {
    documentation: 'Documentation',
    all: 'All documentation',
    menu: 'Docs menu',
    menuDialog: 'Documentation menu',
    close: 'Close documentation menu',
  },
  pager: {
    label: 'Documentation pagination',
    previous: 'Previous',
    next: 'Next',
    backToAll: 'Back to all documentation',
  },
  index: {
    title: 'Documentation',
    description: 'A quick overview of guides and reference material - click any card to read more.',
    noPreview: 'No preview available.',
    readMore: 'Read more →',
  },
  notFound: {
    heading: "This page isn't in the docs",
    body: "The guide you're looking for doesn't exist or has been renamed. Start from the documentation index, or pick up one of these.",
    all: 'All documentation',
    home: 'Back to home',
  },
  linkToSection: 'Link to section',
  image: {
    enlarge: 'Enlarge image',
    enlargeNamed: 'Enlarge image: {alt}',
    preview: 'Image preview',
    previewNamed: 'Image preview: {alt}',
    close: 'Close preview',
  },
};

export type Docs = typeof docs;
