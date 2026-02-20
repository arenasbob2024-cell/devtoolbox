import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'MySQL vs PostgreSQL: Which Database Should You Use?', description: 'Compare MySQL and PostgreSQL databases side by side. Differences in performance, JSON support, replication, licensing, and best use cases.' },
  fr: { title: 'MySQL vs PostgreSQL : Quelle base de donnees choisir ?', description: 'Comparez MySQL et PostgreSQL cote a cote. Differences de performance, support JSON, replication, licence et cas d\'utilisation.' },
  de: { title: 'MySQL vs PostgreSQL: Welche Datenbank sollten Sie verwenden?', description: 'Vergleichen Sie MySQL und PostgreSQL Datenbanken. Unterschiede bei Performance, JSON-Support, Replikation und Anwendungsfaellen.' },
  it: { title: 'MySQL vs PostgreSQL: Quale database scegliere?', description: 'Confronta MySQL e PostgreSQL fianco a fianco. Differenze di prestazioni, supporto JSON, replica, licenza e casi d\'uso.' },
  es: { title: 'MySQL vs PostgreSQL: Que base de datos deberias usar?', description: 'Compara MySQL y PostgreSQL lado a lado. Diferencias en rendimiento, soporte JSON, replicacion, licencia y casos de uso.' },
  pt: { title: 'MySQL vs PostgreSQL: Qual banco de dados voce deve usar?', description: 'Compare MySQL e PostgreSQL lado a lado. Diferencas em desempenho, suporte JSON, replicacao, licenca e casos de uso.' },
  nl: { title: 'MySQL vs PostgreSQL: Welke database moet je gebruiken?', description: 'Vergelijk MySQL en PostgreSQL naast elkaar. Verschillen in prestaties, JSON-ondersteuning, replicatie en gebruiksscenario\'s.' },
  pl: { title: 'MySQL vs PostgreSQL: Ktora baze danych wybrac?', description: 'Porownaj MySQL i PostgreSQL obok siebie. Roznice w wydajnosci, wsparciu JSON, replikacji, licencji i zastosowaniach.' },
  sv: { title: 'MySQL vs PostgreSQL: Vilken databas ska du anvanda?', description: 'Jamfor MySQL och PostgreSQL sida vid sida. Skillnader i prestanda, JSON-stod, replikering och anvandningsfall.' },
  no: { title: 'MySQL vs PostgreSQL: Hvilken database bor du bruke?', description: 'Sammenlign MySQL og PostgreSQL side om side. Forskjeller i ytelse, JSON-stotte, replikering og bruksomrader.' },
  zh: { title: 'MySQL vs PostgreSQL：应该使用哪种数据库？', description: '并排比较 MySQL 和 PostgreSQL 数据库。性能、JSON 支持、复制、许可证及使用场景的差异。' },
  ja: { title: 'MySQL vs PostgreSQL：どちらのデータベースを使うべき？', description: 'MySQLとPostgreSQLデータベースを並べて比較。パフォーマンス、JSONサポート、レプリケーション、使用ケースの違い。' },
  ko: { title: 'MySQL vs PostgreSQL: 어떤 데이터베이스를 사용해야 할까요?', description: 'MySQL과 PostgreSQL 데이터베이스를 나란히 비교합니다. 성능, JSON 지원, 복제, 라이선스 및 사용 사례의 차이점.' },
  id: { title: 'MySQL vs PostgreSQL: Database Mana yang Harus Anda Gunakan?', description: 'Bandingkan MySQL dan PostgreSQL. Perbedaan performa, dukungan JSON, replikasi, lisensi, dan kasus penggunaan.' },
  th: { title: 'MySQL vs PostgreSQL: ควรใช้ฐานข้อมูลไหน?', description: 'เปรียบเทียบ MySQL และ PostgreSQL ประสิทธิภาพ การรองรับ JSON การจำลอง ใบอนุญาต และกรณีการใช้งาน' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/mysql-vs-postgresql`;
  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: `${t.title} | DevToolBox`,
      description: t.description,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.title} | DevToolBox`,
      description: t.description,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/mysql-vs-postgresql`])
        ),
        'x-default': `https://viadreams.cc/en/tools/mysql-vs-postgresql`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
