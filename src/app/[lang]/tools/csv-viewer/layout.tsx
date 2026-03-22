import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';
import { getToolEntry } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

const TOOL_ID = 'csv-viewer';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const validLang = i18n.locales.includes(lang as Locale) ? lang : 'en';
  const t = (await getToolEntry(validLang as Locale, TOOL_ID)) || { pageTitle: 'CSV Viewer', pageDescription: 'View and explore CSV data in an interactive table' };
  const canonical = `https://viadreams.cc/${validLang}/tools/${TOOL_ID}`;
  return {
    title: t.pageTitle,
    description: t.pageDescription,
    alternates: {
      canonical,
      languages: Object.fromEntries(i18n.locales.map(l => [l, `https://viadreams.cc/${l}/tools/${TOOL_ID}`])),
    },
    openGraph: { title: t.pageTitle, description: t.pageDescription, url: canonical, type: 'website' },
    twitter: { card: 'summary_large_image', title: t.pageTitle, description: t.pageDescription },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = i18n.locales.includes(lang as Locale) ? lang : 'en';
  const t = (await getToolEntry(validLang as Locale, TOOL_ID)) || { pageTitle: 'CSV Viewer', pageDescription: 'View and explore CSV data in an interactive table' };
  return <ToolSeoServer toolId={TOOL_ID} lang={validLang} title={t.pageTitle} description={t.pageDescription}>{children}</ToolSeoServer>;
}
