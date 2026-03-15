import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.tools?.['websocket-tester'];
  return {
    title: t?.pageTitle || 'WebSocket Tester',
    description: t?.pageDescription || t?.description || 'Test WebSocket connections, send/receive messages in real-time',
    alternates: {
      languages: Object.fromEntries(
        ['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th']
          .map(l => [l, '/' + l + '/tools/websocket-tester'])
      ),
    },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="websocket-tester" lang={lang}>{children}</ToolSeoServer>;
}
