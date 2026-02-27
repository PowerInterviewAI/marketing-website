import { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const setMeta = (name: string, content: string | undefined, attr = 'name') => {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
};

export default function Seo({ title, description, url, image }: SeoProps) {
  useEffect(() => {
    const baseTitle = 'Power Interview AI';
    if (title) {
      document.title = `${title} — ${baseTitle}`;
    } else {
      document.title = `${baseTitle} - Privacy-First AI Interview Assistant`;
    }

    setMeta('description', description);
    setMeta('og:title', title || baseTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:image', image, 'property');
    setMeta('twitter:title', title || baseTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // canonical link
    if (url) {
      let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = url;
    }
  }, [title, description, url, image]);

  return null;
}
