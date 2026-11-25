import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/config/site';

/**
 * Search and AI crawlers named explicitly, each allowed everywhere.
 *
 * `*` already allows them, so this changes nothing for a crawler that honours
 * the wildcard. It is here so the intent is on record: the site wants to be
 * quoted by AI assistants and answer engines (that is what public/llms.txt
 * and /llms-full.txt are for). A future `Disallow` aimed at scrapers must
 * not quietly shut these out as well. Some operators also treat a bot that is
 * only covered by `*` more conservatively than one that is named.
 */
const AI_AND_SEARCH_CRAWLERS = [
  // Search
  'Googlebot',
  'Bingbot',
  'DuckDuckBot',
  'YandexBot',
  'Baiduspider',
  'Applebot',
  // AI search and assistants
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'meta-externalagent',
  'MistralAI-User',
  'DuckAssistBot',
  'cohere-ai',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_AND_SEARCH_CRAWLERS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
