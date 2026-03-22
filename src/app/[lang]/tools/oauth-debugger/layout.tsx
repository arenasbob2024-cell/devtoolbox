import type { Metadata } from 'next';
import { getToolEntry } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getToolEntry(lang, 'oauth-debugger');
  return {
    title: t?.pageTitle || 'OAuth 2.0 Debugger',
    description: t?.pageDescription || 'Debug OAuth 2.0 flows, decode tokens, and test authorization endpoints',
    alternates: { languages: Object.fromEntries(['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th'].map(l => [l, '/' + l + '/tools/oauth-debugger'])) },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="oauth-debugger" lang={lang}>{children}</ToolSeoServer>;
}
