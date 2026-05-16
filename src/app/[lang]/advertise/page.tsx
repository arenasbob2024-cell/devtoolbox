import AdvertisePageClient from './AdvertisePageClient';
import { i18n, type Locale } from '@/i18n/config';

const BASE_URL = 'https://viadreams.cc';

function getSearchValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] || '';
  }

  return value || '';
}

function buildAdvertiseJsonLd(lang: Locale, source: string, category: string) {
  const pageUrl = `${BASE_URL}/${lang}/advertise/`;
  const offers = [
    {
      name: 'Category Sponsor',
      description: 'Own a high-intent developer tool category for a monthly test.',
      minPrice: 299,
      maxPrice: 799,
    },
    {
      name: 'Article Sponsor',
      description: 'Place a sponsor CTA inside developer guides or comparison articles.',
      minPrice: 149,
      maxPrice: 499,
    },
    {
      name: 'Sitewide Visibility',
      description: 'Show a sponsor offer on high-visibility homepage, mobile, and sitewide fallback surfaces.',
      minPrice: 199,
      maxPrice: 599,
    },
    {
      name: 'Partner Test',
      description: 'Run a short campaign across one to three tracked placements.',
      minPrice: 99,
      maxPrice: 299,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Advertise on DevToolBox',
        description: 'Reach developers with sponsorships, partner placements, and advertising on DevToolBox.',
        inLanguage: lang,
        isPartOf: {
          '@id': `${BASE_URL}/#website`,
        },
        about: category || source || 'developer advertising',
      },
      {
        '@type': 'OfferCatalog',
        '@id': `${pageUrl}#sponsorship-packages`,
        name: 'DevToolBox Sponsorship Packages',
        url: pageUrl,
        itemListElement: offers.map((offer, index) => ({
          '@type': 'Offer',
          position: index + 1,
          name: offer.name,
          description: offer.description,
          availability: 'https://schema.org/InStock',
          url: pageUrl,
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            minPrice: offer.minPrice,
            maxPrice: offer.maxPrice,
          },
          itemOffered: {
            '@type': 'Service',
            name: `DevToolBox ${offer.name}`,
            serviceType: 'Developer audience sponsorship',
            provider: {
              '@type': 'Organization',
              name: 'DevToolBox',
              url: BASE_URL,
            },
          },
        })),
      },
    ],
  };
}

export default async function AdvertisePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang: rawLang } = await params;
  const query = await searchParams;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const source = getSearchValue(query?.source);
  const category = getSearchValue(query?.category);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAdvertiseJsonLd(lang, source, category)) }}
      />
      <AdvertisePageClient
        source={source}
        category={category}
      />
    </>
  );
}
