import type { Metadata } from 'next';
import { getToolEntry } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getToolEntry(lang, 'api-rate-limit-calculator');
  return {
    title: t?.pageTitle || 'API Rate Limit Calculator',
    description: t?.pageDescription || t?.description || 'Calculate API rate limits, costs, and quota planning for LLM and REST APIs',
    alternates: {
      languages: Object.fromEntries(
        ['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th']
          .map(l => [l, '/' + l + '/tools/api-rate-limit-calculator'])
      ),
    },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="api-rate-limit-calculator" lang={lang}>{children}</ToolSeoServer>;
}
