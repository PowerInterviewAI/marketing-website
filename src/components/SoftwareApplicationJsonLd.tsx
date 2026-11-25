import { JsonLd } from '@/components/JsonLd';
import type { Locale } from '@/i18n/config';
import { buildSoftwareApplicationJsonLd, buildWebSiteJsonLd } from '@/lib/jsonLd';
import { getPlans } from '@/lib/plans';

/**
 * The home page's schema: the app itself, and the WebSite block Google reads on
 * the home page to pick the site name it shows above results. Split out of
 * page.tsx to keep that file about layout.
 */
export function SoftwareApplicationJsonLd({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd data={buildWebSiteJsonLd(locale)} />
      <JsonLd data={buildSoftwareApplicationJsonLd(getPlans(), locale)} />
    </>
  );
}

export default SoftwareApplicationJsonLd;
