import React from 'react';

import 'github-markdown-css/github-markdown.css';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { AnalyticsListener } from '@/components/AnalyticsListener';
import { InlineScript } from '@/components/InlineScript';
import { JsonLd } from '@/components/JsonLd';
import { SpotlightTracker } from '@/components/SpotlightTracker';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SITE_NAME, SITE_URL } from '@/config/site';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { LOCALES, LOCALE_META, isLocale } from '@/i18n/config';
import { getClientMessages, getMessages } from '@/i18n/messages';
import { buildOrganizationJsonLd } from '@/lib/jsonLd';
import { cn } from '@/lib/utils';
import '@/styles/index.css';

// next/font self-hosts these at build time, so there's no request to Google and
// no swap-in flash. Each is exposed as a CSS variable that tailwind.config.js
// maps to font-sans / font-mono. Latin-ext and Cyrillic cover the site's German,
// French, Spanish, Portuguese and Russian copy in the brand face; CJK falls back
// to the system font chosen by the page's `lang`.
const fontSans = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-sans',
  // unicode-range fetches only the subset a page uses. Preloading would make every
  // English visitor download the Cyrillic and Latin Extended files too.
  preload: false,
  display: 'swap',
});

// Mono carries real weight on this site: install commands, version strings and
// hotkey chips all render in it.
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  preload: false,
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { site } = getMessages(locale).meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: site.title,
    description: site.description,
    keywords: site.keywords,
    authors: [{ name: SITE_NAME }],
    // Allow full-length snippets and large image previews: without these,
    // Google and Bing may cap how much of a page they quote in results and AI
    // answers. No canonical here - a layout-level canonical is inherited by
    // any route that forgets its own and would point that page at the home
    // page. Every route sets its own through buildMetadata().
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    applicationName: SITE_NAME,
    manifest: '/manifest.json',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: SITE_NAME,
    },
    formatDetection: { telephone: false },
    openGraph: {
      type: 'website',
      title: site.ogTitle,
      description: site.description,
      images: [
        {
          url: '/brand/open-graph.png',
          width: 1200,
          height: 630,
          alt: site.ogAlt,
        },
      ],
      siteName: SITE_NAME,
      locale: LOCALE_META[locale].ogLocale,
    },
    twitter: {
      card: 'summary_large_image',
      title: site.twitterTitle,
      description: site.twitterDescription,
      images: ['/brand/open-graph.png'],
    },
  };
}

// Kept in sync with --background in src/styles/index.css and with
// public/manifest.json - all three used to disagree.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f7f8' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
};

// Sets the dark/light class on <html> before hydration to avoid a flash of the wrong theme.
const themeInitScript = `
(function () {
  const theme = localStorage.getItem('theme') || 'dark';
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.add('light');
  }
})();
`;

// Only the configured locales exist; src/proxy.ts rewrites everything else onto
// /en, where the catch-all route renders the 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={LOCALE_META[locale].htmlLang}
      className={cn(fontSans.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeInitScript} />
        {/* Reveal starts hidden and needs JavaScript to appear. */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        {/* Organization is the only schema true of every route. The
            SoftwareApplication and FAQPage blocks moved to the pages whose
            content they describe - see src/lib/jsonLd.ts. */}
        <JsonLd data={buildOrganizationJsonLd(locale)} />
      </head>
      <body suppressHydrationWarning>
        <LocaleProvider locale={locale} messages={getClientMessages(locale)}>
          <ThemeProvider>{children}</ThemeProvider>
        </LocaleProvider>
        <AnalyticsListener />
        <SpotlightTracker />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V6LKZ75M3J"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V6LKZ75M3J');
          `}
        </Script>
      </body>
    </html>
  );
}
