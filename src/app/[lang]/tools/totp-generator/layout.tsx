import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.tools?.['totp-generator'];
  return {
    title: t?.pageTitle || 'TOTP Generator',
    description: t?.pageDescription || t?.description || 'Generate Time-based One-Time Passwords for 2FA testing',
    alternates: {
      languages: Object.fromEntries(
        ['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th']
          .map(l => [l, '/' + l + '/tools/totp-generator'])
      ),
    },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="totp-generator" lang={lang}>{children}</ToolSeoServer>;
}
