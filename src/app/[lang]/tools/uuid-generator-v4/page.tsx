'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

function generateUUIDv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'UUID v4 Generator',
    description: 'Generate random UUID v4 identifiers in bulk. Copy UUIDs instantly with options for uppercase and no-dash formats.',
    count: 'Count',
    generateBtn: 'Generate UUID v4',
    clear: 'Clear',
    uppercase: 'Uppercase',
    noDashes: 'No dashes',
    copyAll: 'Copy All',
    introTitle: 'Free Online UUID v4 Generator',
    introText: 'UUID v4 (Universally Unique Identifier version 4) uses random or pseudo-random numbers to generate identifiers. Each UUID v4 has 122 random bits, making collisions virtually impossible (the probability of generating two identical UUIDs is about 1 in 5.3 x 10^36). UUID v4 is the most commonly used UUID version in software development for database primary keys, session tokens, correlation IDs, and distributed system identifiers.',
    howTitle: 'UUID v4 Format Explained',
    step1: 'UUID v4 follows the format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
    step2: 'The "4" in the third group indicates version 4 (random)',
    step3: 'The "y" character is one of 8, 9, a, or b (variant 1)',
    step4: 'Total of 32 hexadecimal digits (128 bits), with 122 bits of randomness',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is UUID v4?',
    faq1a: 'UUID v4 is a 128-bit identifier generated using random or pseudo-random numbers. It follows the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, where the "4" indicates version 4 and "y" is constrained to specific values. UUID v4 is defined in RFC 4122 and is the most widely used UUID version because it does not require any central authority or coordination to generate unique identifiers.',
    faq2q: 'Is UUID v4 truly unique?',
    faq2a: 'While not mathematically guaranteed to be unique, UUID v4 uses 122 bits of randomness, giving approximately 5.3 x 10^36 possible values. The probability of generating a duplicate is astronomically low. You would need to generate 1 billion UUIDs per second for about 85 years to have a 50% probability of a single collision. For all practical purposes, UUID v4 values are unique.',
    faq3q: 'UUID v4 vs UUID v7 - which should I use?',
    faq3a: 'UUID v4 is fully random and suitable for most use cases. UUID v7 (proposed in RFC 9562) includes a timestamp prefix, making it sortable by creation time - ideal for database primary keys where insertion order matters. Choose UUID v4 for general-purpose unique identifiers and UUID v7 for time-ordered database keys.',
    faq4q: 'How to generate UUID v4 in code?',
    faq4a: 'In JavaScript: crypto.randomUUID(). In Python: import uuid; str(uuid.uuid4()). In Java: UUID.randomUUID().toString(). In Go: use the google/uuid package with uuid.New(). In Node.js: require("crypto").randomUUID(). Most languages have built-in or standard library support for UUID v4 generation.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'UUID v4 生成器',
    description: '批量生成随机 UUID v4 标识符。支持大写和无连字符格式，即时复制。',
    count: '数量',
    generateBtn: '生成 UUID v4',
    clear: '清除',
    uppercase: '大写',
    noDashes: '无连字符',
    copyAll: '全部复制',
    introTitle: '免费在线 UUID v4 生成器',
    introText: 'UUID v4 使用随机数生成标识符。每个 UUID v4 有 122 位随机性，碰撞概率约为 5.3 x 10^36 分之一。UUID v4 是软件开发中最常用的 UUID 版本。',
    howTitle: 'UUID v4 格式说明',
    step1: 'UUID v4 格式: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
    step2: '第三组中的"4"表示版本 4（随机）',
    step3: '"y"字符为 8、9、a 或 b 之一（变体 1）',
    step4: '共 32 个十六进制数字（128 位），其中 122 位为随机',
    faqTitle: '常见问题',
    faq1q: '什么是 UUID v4？',
    faq1a: 'UUID v4 是使用随机数生成的 128 位标识符。它遵循 RFC 4122 标准，是最广泛使用的 UUID 版本，因为不需要任何中央机构协调。',
    faq2q: 'UUID v4 真的唯一吗？',
    faq2a: 'UUID v4 使用 122 位随机性，可能值约为 5.3 x 10^36。实际上碰撞概率极低，可视为唯一。',
    faq3q: 'UUID v4 和 UUID v7 该选哪个？',
    faq3a: 'UUID v4 完全随机，适合大多数场景。UUID v7 包含时间戳前缀，适合需要按时间排序的数据库主键。',
    faq4q: '如何在代码中生成 UUID v4？',
    faq4a: 'JavaScript: crypto.randomUUID()。Python: uuid.uuid4()。Java: UUID.randomUUID()。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Generateur UUID v4',
    description: 'Generez des identifiants UUID v4 aleatoires en masse. Options majuscules et sans tirets.',
    count: 'Nombre', generateBtn: 'Generer UUID v4', clear: 'Effacer',
    uppercase: 'Majuscules', noDashes: 'Sans tirets', copyAll: 'Tout copier',
    introTitle: 'Generateur UUID v4 gratuit', introText: 'UUID v4 utilise des nombres aleatoires pour generer des identifiants. Chaque UUID v4 a 122 bits de hasard, rendant les collisions pratiquement impossibles.',
    howTitle: 'Format UUID v4',
    step1: 'Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', step2: 'Le "4" indique la version 4 (aleatoire)',
    step3: '"y" est 8, 9, a ou b (variante 1)', step4: '32 chiffres hexadecimaux (128 bits), 122 bits aleatoires',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que UUID v4 ?', faq1a: 'UUID v4 est un identifiant de 128 bits genere a l\'aide de nombres aleatoires, defini dans RFC 4122.',
    faq2q: 'UUID v4 est-il vraiment unique ?', faq2a: 'Avec 122 bits de hasard, la probabilite de collision est astronomiquement faible.',
    faq3q: 'UUID v4 vs UUID v7 ?', faq3a: 'UUID v4 est entierement aleatoire. UUID v7 inclut un horodatage pour le tri.',
    faq4q: 'Comment generer UUID v4 dans le code ?', faq4a: 'JavaScript: crypto.randomUUID(). Python: uuid.uuid4().',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'UUID v4 Generator',
    description: 'Generieren Sie zufaellige UUID v4 Bezeichner in Massen. Optionen fuer Grossbuchstaben und ohne Bindestriche.',
    count: 'Anzahl', generateBtn: 'UUID v4 generieren', clear: 'Loeschen',
    uppercase: 'Grossbuchstaben', noDashes: 'Ohne Bindestriche', copyAll: 'Alles kopieren',
    introTitle: 'Kostenloser UUID v4 Generator', introText: 'UUID v4 verwendet Zufallszahlen zur Erzeugung von Bezeichnern. Jede UUID v4 hat 122 Zufallsbits.',
    howTitle: 'UUID v4 Format',
    step1: 'Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', step2: '"4" zeigt Version 4 an (zufaellig)',
    step3: '"y" ist 8, 9, a oder b (Variante 1)', step4: '32 Hexadezimalziffern (128 Bits), 122 Zufallsbits',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist UUID v4?', faq1a: 'UUID v4 ist ein 128-Bit-Bezeichner, der mit Zufallszahlen generiert wird, definiert in RFC 4122.',
    faq2q: 'Ist UUID v4 wirklich einzigartig?', faq2a: 'Mit 122 Bits Zufaelligkeit ist die Kollisionswahrscheinlichkeit astronomisch niedrig.',
    faq3q: 'UUID v4 vs UUID v7?', faq3a: 'UUID v4 ist vollstaendig zufaellig. UUID v7 enthaelt einen Zeitstempel fuer Sortierung.',
    faq4q: 'Wie generiert man UUID v4 im Code?', faq4a: 'JavaScript: crypto.randomUUID(). Python: uuid.uuid4().',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador UUID v4',
    description: 'Genera identificadores UUID v4 aleatorios en masa. Opciones de mayusculas y sin guiones.',
    count: 'Cantidad', generateBtn: 'Generar UUID v4', clear: 'Limpiar',
    uppercase: 'Mayusculas', noDashes: 'Sin guiones', copyAll: 'Copiar todo',
    introTitle: 'Generador UUID v4 gratuito', introText: 'UUID v4 usa numeros aleatorios para generar identificadores. Cada UUID v4 tiene 122 bits de aleatoriedad.',
    howTitle: 'Formato UUID v4',
    step1: 'Formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', step2: '"4" indica version 4 (aleatorio)',
    step3: '"y" es 8, 9, a o b (variante 1)', step4: '32 digitos hexadecimales (128 bits), 122 bits aleatorios',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es UUID v4?', faq1a: 'UUID v4 es un identificador de 128 bits generado con numeros aleatorios, definido en RFC 4122.',
    faq2q: 'Es UUID v4 realmente unico?', faq2a: 'Con 122 bits de aleatoriedad, la probabilidad de colision es astronomicamente baja.',
    faq3q: 'UUID v4 vs UUID v7?', faq3a: 'UUID v4 es completamente aleatorio. UUID v7 incluye una marca temporal para ordenacion.',
    faq4q: 'Como generar UUID v4 en codigo?', faq4a: 'JavaScript: crypto.randomUUID(). Python: uuid.uuid4().',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'UUID v4 ジェネレーター',
    description: 'ランダムな UUID v4 識別子を一括生成。大文字やハイフンなしの形式に対応。',
    count: '数量', generateBtn: 'UUID v4 生成', clear: 'クリア',
    uppercase: '大文字', noDashes: 'ハイフンなし', copyAll: 'すべてコピー',
    introTitle: '無料オンライン UUID v4 ジェネレーター', introText: 'UUID v4 は乱数を使用して識別子を生成します。各 UUID v4 は 122 ビットのランダム性を持ちます。',
    howTitle: 'UUID v4 フォーマット',
    step1: 'フォーマット: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', step2: '"4" はバージョン 4（ランダム）を示す',
    step3: '"y" は 8、9、a、b のいずれか（バリアント 1）', step4: '32 桁の16進数（128 ビット）、122 ビットがランダム',
    faqTitle: 'よくある質問',
    faq1q: 'UUID v4 とは？', faq1a: 'UUID v4 は乱数で生成される 128 ビット識別子で、RFC 4122 で定義されています。',
    faq2q: 'UUID v4 は本当にユニーク？', faq2a: '122 ビットのランダム性により、衝突確率は天文学的に低いです。',
    faq3q: 'UUID v4 と UUID v7 の違いは？', faq3a: 'UUID v4 は完全ランダム。UUID v7 はタイムスタンプを含みソート可能。',
    faq4q: 'コードで UUID v4 を生成するには？', faq4a: 'JavaScript: crypto.randomUUID()。Python: uuid.uuid4()。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'UUID v4 생성기',
    description: '랜덤 UUID v4 식별자를 대량 생성합니다. 대문자 및 하이픈 없는 형식 옵션 제공.',
    count: '수량', generateBtn: 'UUID v4 생성', clear: '지우기',
    uppercase: '대문자', noDashes: '하이픈 없이', copyAll: '모두 복사',
    introTitle: '무료 온라인 UUID v4 생성기', introText: 'UUID v4는 난수를 사용하여 식별자를 생성합니다. 각 UUID v4는 122비트의 무작위성을 가집니다.',
    howTitle: 'UUID v4 형식',
    step1: '형식: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', step2: '"4"는 버전 4(무작위)를 나타냄',
    step3: '"y"는 8, 9, a, b 중 하나(변형 1)', step4: '32개의 16진수(128비트), 122비트가 무작위',
    faqTitle: '자주 묻는 질문',
    faq1q: 'UUID v4란?', faq1a: 'UUID v4는 난수로 생성되는 128비트 식별자로, RFC 4122에 정의되어 있습니다.',
    faq2q: 'UUID v4는 정말 고유한가요?', faq2a: '122비트의 무작위성으로 충돌 확률은 천문학적으로 낮습니다.',
    faq3q: 'UUID v4 vs UUID v7?', faq3a: 'UUID v4는 완전 무작위. UUID v7은 타임스탬프를 포함하여 정렬 가능.',
    faq4q: '코드에서 UUID v4를 생성하는 방법은?', faq4a: 'JavaScript: crypto.randomUUID(). Python: uuid.uuid4().',
    relatedTitle: '관련 도구',
  },
};

export default function UuidGeneratorV4() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => {
      let uuid = generateUUIDv4();
      if (noDashes) uuid = uuid.replace(/-/g, '');
      if (uppercase) uuid = uuid.toUpperCase();
      return uuid;
    });
    setUuids(newUuids);
  };

  const allText = uuids.join('\n');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="uuid-generator-v4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={generate} className="btn btn-primary">{t.generateBtn}</button>
        <button onClick={() => setUuids([])} className="btn btn-secondary">{t.clear}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.count}:</label>
          <input type="number" value={count}
            onChange={e => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            style={{ width: 60, padding: '6px 10px', fontSize: 13 }} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} /> {t.uppercase}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={noDashes} onChange={e => setNoDashes(e.target.checked)} /> {t.noDashes}
        </label>
        {uuids.length > 0 && <div style={{ marginLeft: 'auto' }}><CopyButton text={allText} /></div>}
      </div>

      {/* UUID List */}
      {uuids.length > 0 && (
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, marginBottom: 20 }}>
          {uuids.map((uuid, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < uuids.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
              <code style={{ fontSize: 13, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{uuid}</code>
              <CopyButton text={uuid} />
            </div>
          ))}
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
          <li>{t.step4}</li>
        </ol>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/uuid-generator`, label: 'UUID Generator' },
            { href: `/${lang}/tools/password-generator`, label: 'Password Generator' },
            { href: `/${lang}/tools/fake-data`, label: 'Fake Data Generator' },
            { href: `/${lang}/tools/hash-generator`, label: 'Hash Generator' },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
