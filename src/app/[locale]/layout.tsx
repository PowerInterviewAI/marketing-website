import React from 'react';

import 'github-markdown-css/github-markdown.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { InlineScript } from '@/components/InlineScript';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { LOCALES, LOCALE_META, isLocale, localizePath } from '@/i18n/config';
import { getClientMessages, getMessages } from '@/i18n/messages';
import { buildOrganizationJsonLd } from '@/lib/jsonLd';
import { cn } from '@/lib/utils';
import '@/styles/index.css';

// next/font self-hosts these at build time, so there's no request to Google and
// no swap-in flash. Each is exposed as a CSS variable that tailwind.config.js
// maps to font-sans / font-display / font-mono.
const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontDisplay = Inter_Tight({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Mono carries real weight on this site: install commands, version strings and
// hotkey chips all render in it.
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://www.powerinterviewai.com';
const SITE_NAME = 'Power Interview AI';
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
    robots: { index: true, follow: true },
    alternates: { canonical: localizePath(locale, '/') },
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
      url: localizePath(locale, '/'),
      title: site.ogTitle,
      description: site.description,
      images: [
        {
          url: '/open-graph.png',
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
      images: ['/open-graph.png'],
    },
  };
}

// Kept in sync with --background in src/styles/index.css and with
// public/manifest.json - all three used to disagree.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0c0e' },
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
      className={cn(fontSans.variable, fontDisplay.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeInitScript} />
        {/* Organization is the only schema true of every route. The
            SoftwareApplication and FAQPage blocks moved to the pages whose
            content they describe - see src/lib/jsonLd.ts. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd(locale)) }}
        />
      </head>
      <body suppressHydrationWarning>
        <LocaleProvider locale={locale} messages={getClientMessages(locale)}>
          <ThemeProvider>{children}</ThemeProvider>
        </LocaleProvider>
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
