import type { Metadata } from 'next';
import { getToolEntry } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getToolEntry(lang, 'connection-string-builder');
  return {
    title: t?.pageTitle || 'Connection String Builder',
    description: t?.pageDescription || t?.description || 'Build database connection strings for MySQL, PostgreSQL, MongoDB and more',
    alternates: {
      languages: Object.fromEntries(
        ['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th']
          .map(l => [l, '/' + l + '/tools/connection-string-builder'])
      ),
    },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="connection-string-builder" lang={lang}>{children}</ToolSeoServer>;
}
