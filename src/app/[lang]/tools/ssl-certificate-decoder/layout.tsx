import type { Metadata } from 'next';
import { getToolEntry } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getToolEntry(lang, 'ssl-certificate-decoder');
  return {
    title: t?.pageTitle || 'SSL Certificate Decoder',
    description: t?.pageDescription || 'Decode and inspect SSL/TLS certificates, view expiry and chain details',
    alternates: { languages: Object.fromEntries(['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th'].map(l => [l, '/' + l + '/tools/ssl-certificate-decoder'])) },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="ssl-certificate-decoder" lang={lang}>{children}</ToolSeoServer>;
}
