import { notFound } from 'next/navigation';
import { i18n, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { LangProvider } from '@/i18n/LangContext';
import HomePageClient from './HomePageClient';

export async function generateStaticParams() {
  const { i18n } = await import('@/i18n/config');
  return i18n.locales.map((lang) => ({ lang }));
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  
  // Validate locale
  if (!i18n.locales.includes(lang as Locale)) {
    notFound();
  }
  
  const dict = await getDictionary(lang as Locale);
  
  return (
    <LangProvider lang={lang as Locale} dict={dict}>
      <HomePageClient />
    </LangProvider>
  );
}
