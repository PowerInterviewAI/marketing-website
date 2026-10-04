import type { Locale } from '@/i18n/config';
import { buildSoftwareApplicationJsonLd } from '@/lib/jsonLd';
import { getPlans } from '@/lib/plans';

/**
 * Split out of page.tsx so this doesn't sit inline in Home() - getPlans() is
 * a hardcoded constant now, not a fetch, so there's nothing left to block on,
 * but keeping the schema generation in its own small component still keeps
 * page.tsx focused on layout.
 */
export function SoftwareApplicationJsonLd({ locale }: { locale: Locale }) {
  const plans = getPlans();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildSoftwareApplicationJsonLd(plans, locale)),
      }}
    />
  );
}

export default SoftwareApplicationJsonLd;
