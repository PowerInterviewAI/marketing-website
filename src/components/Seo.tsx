import { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  noIndex?: boolean;
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

export default function Seo({ title, description, url, image, noIndex }: SeoProps) {
  useEffect(() => {
    const baseTitle = 'Power Interview AI';
    const resolvedUrl = url || 'https://www.powerinterviewai.com/';
    const resolvedImage = image || 'https://www.powerinterviewai.com/logo.png';
    const resolvedDescription =
      description ||
      'Privacy-first AI interview coach and meeting note taker — live transcription, AI reply suggestions, mock interview practice, and smart exports for Google Meet, Zoom, Teams, and more.';

    if (title) {
      document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} - ${baseTitle}`;
    } else {
      document.title = `${baseTitle} - Privacy-First Interview Coach & AI Note Taker`;
    }

    setMeta('description', resolvedDescription);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('og:title', title || baseTitle, 'property');
    setMeta('og:description', resolvedDescription, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', baseTitle, 'property');
    setMeta('og:locale', 'en_US', 'property');
    setMeta('og:url', resolvedUrl, 'property');
    setMeta('og:image', resolvedImage, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title || baseTitle);
    setMeta('twitter:description', resolvedDescription);
    setMeta('twitter:image', resolvedImage);
    setMeta('twitter:url', resolvedUrl);

    // canonical link
    if (resolvedUrl) {
      let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = resolvedUrl;
    }
  }, [title, description, url, image, noIndex]);

  return null;
}
