import type { Metadata } from 'next';
import { getToolEntry } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getToolEntry(lang, 'systemd-unit-validator');
  return {
    title: t?.pageTitle || 'Systemd Unit Validator',
    description: t?.pageDescription || t?.description || 'Validate and lint systemd service unit files',
    alternates: {
      languages: Object.fromEntries(
        ['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th']
          .map(l => [l, '/' + l + '/tools/systemd-unit-validator'])
      ),
    },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="systemd-unit-validator" lang={lang}>{children}</ToolSeoServer>;
}
