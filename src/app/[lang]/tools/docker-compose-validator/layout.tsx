import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import ToolSeoServer from "@/components/ToolSeoServer";

type Props = { params: Promise<{ lang: Locale }>; children: React.ReactNode };

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.tools?.["docker-compose-validator"] || {};
  const title = t.pageTitle || t.name || "docker-compose-validator";
  const description = t.pageDescription || t.description || "";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", url: `https://viadreams.cc/${lang}/tools/docker-compose-validator` },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: `https://viadreams.cc/${lang}/tools/docker-compose-validator`,
      languages: Object.fromEntries(
        ["en", "fr", "de", "it", "es", "pt", "nl", "pl", "sv", "no", "zh", "ja", "ko", "id", "th"].map(l => [l, `https://viadreams.cc/${l}/tools/docker-compose-validator`])
      ),
    },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="docker-compose-validator" lang={lang}>{children}</ToolSeoServer>;
}
