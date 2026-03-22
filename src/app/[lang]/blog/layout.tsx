import type { Metadata } from 'next';
import { getUIDictionary } from '@/i18n/getDictionary';
import { i18n, type Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const dict = await getUIDictionary(lang);
  const blog = (dict as Record<string, unknown>).blog as Record<string, string> | undefined;
  const title = blog?.title || 'DevToolBox Blog';
  const description = blog?.description || 'Developer guides, tutorials, and best practices';
  const url = `https://viadreams.cc/${lang}/blog`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | DevToolBox`,
      description,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/blog`])
        ),
        'x-default': 'https://viadreams.cc/en/blog',
      },
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
