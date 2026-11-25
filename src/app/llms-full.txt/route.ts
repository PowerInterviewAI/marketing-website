import { INTERVIEW_LANGUAGES, LANGUAGE_COUNT, VOICE_LANGUAGE_COUNT } from '@/config/languages';
import { ROUTES, docPath } from '@/config/routes';
import { SITE_NAME, SITE_URL, SOCIAL_PROFILES, SUPPORT_EMAIL, absoluteUrl } from '@/config/site';
import { format } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { getDocContent, getDocSlugs, getDocTitle } from '@/lib/docs';
import { getPlans } from '@/lib/plans';
import { applyReleaseTokens, getLatestVersion } from '@/lib/release';

/**
 * /llms-full.txt - the whole English knowledge base in one plain-text file.
 *
 * public/llms.txt is the index an assistant reads first; this is the file it
 * reads when it wants the answers themselves without crawling a dozen pages:
 * the product summary, the plans, the full language list, every FAQ answer
 * and every doc. Everything is generated from the sources the pages render -
 * the plans, src/config/languages.ts, the FAQ catalogue and the markdown in
 * src/content/docs - so it cannot drift from the site the way a second
 * hand-written copy would.
 *
 * Regenerated hourly, like the docs, because the download links in the
 * markdown carry the latest release version.
 */
export const revalidate = 3600;

// Site-relative links and images in the markdown become absolute: the file is
// read out of context, where `/docs/live-interview` resolves to nothing.
const absolutizeLinks = (markdown: string) => markdown.replace(/\]\(\//g, `](${SITE_URL}/`);

// Each doc opens with its own `# Title`; demote every heading one level so the
// docs nest under this file's `## Documentation` section.
const demoteHeadings = (markdown: string) => {
  let inFence = false;
  return markdown
    .split('\n')
    .map((line) => {
      if (/^\s*```/.test(line)) inFence = !inFence;
      return !inFence && /^#{1,5}\s/.test(line) ? `##${line}` : line;
    })
    .join('\n');
};

export async function GET() {
  const messages = getMessages('en');
  const { structured } = messages.meta;
  const { planNames } = messages.pricing;
  const version = await getLatestVersion();

  const plans = getPlans()
    .map((plan) =>
      plan.price_usd === 0
        ? `- ${planNames[plan.plan]}: one free hour of interviews, once, on the free model.`
        : `- ${planNames[plan.plan]}: $${plan.price_usd} prepaid for ${plan.months} month${
            plan.months === 1 ? '' : 's'
          } ($${plan.price_per_month_usd} a month), unlimited live and mock interviews on the SOTA model, never auto-renewed.`
    )
    .join('\n');

  const languages = INTERVIEW_LANGUAGES.map(
    (language) =>
      `- ${language.name} (${language.nativeName})${language.hasVoice ? ' - spoken mock interviewer' : ''}`
  ).join('\n');

  const faq = messages.faq.items
    .map((item) => `### ${item.question}\n\n${item.answer}`)
    .join('\n\n');

  const docs = getDocSlugs()
    .map((slug) => {
      const raw = getDocContent(slug);
      if (!raw) return '';
      const body = demoteHeadings(absolutizeLinks(applyReleaseTokens(raw, version)));
      return `<!-- ${getDocTitle(slug, raw)}: ${absoluteUrl(docPath(slug))} -->\n\n${body.trim()}`;
    })
    .filter(Boolean)
    .join('\n\n---\n\n');

  const features = structured.featureList
    .map(
      (feature) =>
        `- ${format(feature, { languages: LANGUAGE_COUNT, voices: VOICE_LANGUAGE_COUNT })}`
    )
    .join('\n');

  const body = `# ${SITE_NAME} - full reference

> ${structured.softwareDescription}

This is the complete English reference for ${SITE_NAME} (${SITE_URL}), generated from the website's own content. The short index is at ${SITE_URL}/llms.txt. The site is also published in German, Spanish, French, Brazilian Portuguese, Russian, Japanese, Korean and Simplified Chinese under /de, /es, /fr, /pt, /ru, /ja, /ko and /zh.

## Features

${features}

## Plans and pricing

Details: ${absoluteUrl(ROUTES.pricing)}. Payment is cryptocurrency only.

${plans}

## Interview languages

An interview can run in ${LANGUAGE_COUNT} languages; the mock interviewer speaks its questions aloud in ${VOICE_LANGUAGE_COUNT} of them and writes them in the rest, with identical follow-ups, scoring and report. Details: ${absoluteUrl(ROUTES.languages)}.

${languages}

## Frequently asked questions

Source: ${absoluteUrl(ROUTES.faq)}

${faq}

## Documentation

Index: ${absoluteUrl(ROUTES.docs)}

${docs}

## Contact

- Email: ${SUPPORT_EMAIL}
${SOCIAL_PROFILES.map((url) => `- ${url}`).join('\n')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  });
}
