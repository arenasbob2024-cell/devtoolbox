import type { Metadata } from 'next';
import { getToolEntry } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getToolEntry(lang, 'font-pairing-tool');
  return {
    title: t?.pageTitle || 'Font Pairing Tool',
    description: t?.pageDescription || 'Find beautiful font combinations for web design with live preview',
    alternates: { languages: Object.fromEntries(['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th'].map(l => [l, '/' + l + '/tools/font-pairing-tool'])) },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="font-pairing-tool" lang={lang}>{children}</ToolSeoServer>;
}
