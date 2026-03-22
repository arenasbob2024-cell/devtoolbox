import type { Metadata } from 'next';
import { getToolEntry } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getToolEntry(lang, 'helm-chart-validator');
  return {
    title: t?.pageTitle || 'Helm Chart Validator',
    description: t?.pageDescription || 'Validate Helm chart structure, values.yaml and Chart.yaml files',
    alternates: { languages: Object.fromEntries(['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th'].map(l => [l, '/' + l + '/tools/helm-chart-validator'])) },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="helm-chart-validator" lang={lang}>{children}</ToolSeoServer>;
}
