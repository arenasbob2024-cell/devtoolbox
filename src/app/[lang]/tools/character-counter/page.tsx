'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Character Counter',
    description: 'Count characters, words, sentences, paragraphs, and estimate reading time. Perfect for essays, tweets, SEO meta descriptions, and more.',
    inputLabel: 'Enter or paste your text here',
    inputPlaceholder: 'Start typing or paste your text here...',
    characters: 'Characters',
    charactersNoSpaces: 'Without Spaces',
    words: 'Words',
    sentences: 'Sentences',
    paragraphs: 'Paragraphs',
    readingTime: 'Reading Time',
    speakingTime: 'Speaking Time',
    uniqueWords: 'Unique Words',
    avgWordLength: 'Avg Word Length',
    minutes: 'min',
    seconds: 'sec',
    clear: 'Clear',
    loadSample: 'Load Sample',
    charLimits: 'Common Limits',
    tweetLimit: 'Twitter/X: 280 chars',
    metaDesc: 'Meta Description: 160 chars',
    smsLimit: 'SMS: 160 chars',
    introTitle: 'Free Online Character Counter',
    introText: 'This character counter tool instantly counts characters, words, sentences, and paragraphs in your text. It also estimates reading time at 200 words per minute and speaking time at 130 words per minute. Use it for Twitter/X character limits, SEO meta descriptions, SMS messages, essays, and more.',
    tipTitle: 'Writing Tips',
    tip1: 'Twitter/X has a 280 character limit per tweet',
    tip2: 'Meta descriptions should be 150-160 characters for SEO',
    tip3: 'SMS messages are typically limited to 160 characters',
    tip4: 'LinkedIn posts perform best at 1,200-1,600 characters',
    tip5: 'Average reading speed is about 200-250 words per minute',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How does this character counter work?',
    faq1a: 'The character counter analyzes your text in real-time as you type or paste it. It counts every character including spaces, letters, numbers, and special characters. The word count splits text by spaces and common punctuation. Sentences are counted by periods, exclamation marks, and question marks.',
    faq2q: 'Does character count include spaces?',
    faq2a: 'Yes, the main character count includes all spaces. The "Without Spaces" count shows only non-whitespace characters. Most platforms like Twitter count spaces as characters in their limits.',
    faq3q: 'How is reading time calculated?',
    faq3a: 'Reading time is estimated based on the average adult reading speed of 200 words per minute. Speaking time is calculated at 130 words per minute, which is the average comfortable speaking speed. These are estimates and actual times may vary based on content complexity.',
    faq4q: 'What are common character limits to know?',
    faq4a: 'Common limits include Twitter/X (280), SMS (160), meta description (155-160), Instagram bio (150), Facebook post (63,206), Google Ads headline (30), and LinkedIn post (1,300).',
    faq5q: 'Can I count characters without spaces?',
    faq5a: 'Yes, the tool shows both total characters (with spaces) and character count without spaces separately. This is useful for platforms that count differently, or for tracking actual content density.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '字符计数器',
    description: '统计字符数、单词数、句子数、段落数并估算阅读时间。适用于文章、推文、SEO 描述等。',
    inputLabel: '在此输入或粘贴文本',
    inputPlaceholder: '开始输入或粘贴文本...',
    characters: '字符数', charactersNoSpaces: '不含空格', words: '单词数', sentences: '句子数', paragraphs: '段落数',
    readingTime: '阅读时间', speakingTime: '朗读时间', uniqueWords: '独特词数', avgWordLength: '平均词长',
    minutes: '分', seconds: '秒', clear: '清除', loadSample: '加载示例',
    charLimits: '常见字数限制', tweetLimit: 'Twitter/X: 280字', metaDesc: '描述: 160字', smsLimit: 'SMS: 160字',
    introTitle: '免费在线字符计数器', introText: '实时统计文本中的字符数、单词数、句子数和段落数，并估算阅读和朗读时间。',
    tipTitle: '写作提示', tip1: 'Twitter/X 每条推文限280字符', tip2: 'SEO元描述应控制在150-160字符', tip3: 'SMS短信通常限160字符', tip4: 'LinkedIn帖子1200-1600字符效果最佳', tip5: '平均阅读速度约200-250词/分钟',
    faqTitle: '常见问题',
    faq1q: '字符计数器如何工作？', faq1a: '计数器实时分析输入的文本，统计包含空格、字母、数字和特殊字符在内的所有字符。',
    faq2q: '字符数是否包含空格？', faq2a: '是的，主要字符数包含所有空格。"不含空格"显示非空白字符数。',
    faq3q: '阅读时间如何计算？', faq3a: '基于成人平均阅读速度200词/分钟估算。朗读时间按130词/分钟计算。',
    faq4q: '常见字数限制有哪些？', faq4a: 'Twitter(280)、SMS(160)、元描述(155-160)、Instagram简介(150)等。',
    faq5q: '能统计不含空格的字符数吗？', faq5a: '可以，工具分别显示总字符数（含空格）和不含空格的字符数。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Compteur de Caracteres',
    description: 'Comptez caracteres, mots, phrases et paragraphes. Estimez le temps de lecture.',
    inputLabel: 'Saisissez ou collez votre texte ici',
    inputPlaceholder: 'Commencez a taper ou collez votre texte...',
    characters: 'Caracteres', charactersNoSpaces: 'Sans espaces', words: 'Mots', sentences: 'Phrases', paragraphs: 'Paragraphes',
    readingTime: 'Temps de lecture', speakingTime: 'Temps de parole', uniqueWords: 'Mots uniques', avgWordLength: 'Longueur moy. mot',
    minutes: 'min', seconds: 'sec', clear: 'Effacer', loadSample: 'Charger exemple',
    charLimits: 'Limites communes', tweetLimit: 'Twitter/X: 280 car.', metaDesc: 'Meta description: 160', smsLimit: 'SMS: 160 car.',
    introTitle: 'Compteur de caracteres gratuit', introText: 'Comptez caracteres, mots et estimez le temps de lecture en temps reel.',
    tipTitle: 'Conseils', tip1: 'Twitter/X limite a 280 caracteres', tip2: 'Meta descriptions: 150-160 caracteres pour SEO', tip3: 'SMS limite a 160 caracteres', tip4: 'LinkedIn: 1200-1600 caracteres recommandes', tip5: 'Vitesse de lecture moyenne: 200-250 mots/min',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment fonctionne ce compteur?', faq1a: 'Le compteur analyse le texte en temps reel, comptant tous les caracteres, mots, phrases et paragraphes.',
    faq2q: 'Le compte inclut-il les espaces?', faq2a: 'Oui, le compte principal inclut tous les espaces. "Sans espaces" montre uniquement les non-espaces.',
    faq3q: 'Comment le temps de lecture est-il calcule?', faq3a: 'Base sur 200 mots/min pour la lecture et 130 mots/min pour la parole.',
    faq4q: 'Quelles sont les limites courantes?', faq4a: 'Twitter(280), SMS(160), meta description(155-160), Instagram bio(150).',
    faq5q: 'Puis-je compter sans espaces?', faq5a: 'Oui, les deux comptages sont affiches separement.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Zeichenzahler',
    description: 'Zeichen, Worter, Satze und Absatze zahlen. Lesezeit schatzen.',
    inputLabel: 'Text eingeben oder einfuegen',
    inputPlaceholder: 'Tippen oder Text einfuegen...',
    characters: 'Zeichen', charactersNoSpaces: 'Ohne Leerzeichen', words: 'Woerter', sentences: 'Satze', paragraphs: 'Absatze',
    readingTime: 'Lesezeit', speakingTime: 'Sprechzeit', uniqueWords: 'Eindeutige Woerter', avgWordLength: 'Mittlere Wortlaenge',
    minutes: 'min', seconds: 'Sek', clear: 'Loeschen', loadSample: 'Beispiel laden',
    charLimits: 'Haeufige Limits', tweetLimit: 'Twitter/X: 280 Z.', metaDesc: 'Meta-Beschr.: 160', smsLimit: 'SMS: 160 Z.',
    introTitle: 'Kostenloser Online-Zeichenzahler', introText: 'Zahlen Sie Zeichen, Woerter und schatzen Sie Lesezeit in Echtzeit.',
    tipTitle: 'Schreibtipps', tip1: 'Twitter/X Limit: 280 Zeichen', tip2: 'Meta-Beschreibungen: 150-160 Zeichen fur SEO', tip3: 'SMS: 160 Zeichen Limit', tip4: 'LinkedIn: 1200-1600 Zeichen empfohlen', tip5: 'Durchschnittliche Lesegeschwindigkeit: 200-250 W/min',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie funktioniert dieser Zeichenzahler?', faq1a: 'Analysiert Text in Echtzeit und zahlt alle Zeichen, Woerter, Satze und Absatze.',
    faq2q: 'Werden Leerzeichen gezahlt?', faq2a: 'Ja, die Hauptzahl umfasst alle Leerzeichen. "Ohne Leerzeichen" zeigt nur Nicht-Leerzeichen.',
    faq3q: 'Wie wird die Lesezeit berechnet?', faq3a: 'Basiert auf 200 W/min zum Lesen und 130 W/min zum Sprechen.',
    faq4q: 'Was sind haeufige Zeichenlimits?', faq4a: 'Twitter(280), SMS(160), Meta-Beschreibung(155-160), Instagram Bio(150).',
    faq5q: 'Kann ich ohne Leerzeichen zahlen?', faq5a: 'Ja, beide Zahlungen werden separat angezeigt.',
    relatedTitle: 'Verwandte Tools',
  },
  ja: {
    title: '文字数カウンター',
    description: '文字数、単語数、文章数、段落数をカウントし、読書時間を推定します。',
    inputLabel: 'テキストを入力または貼り付け',
    inputPlaceholder: 'テキストを入力または貼り付け...',
    characters: '文字数', charactersNoSpaces: 'スペースなし', words: '単語数', sentences: '文章数', paragraphs: '段落数',
    readingTime: '読書時間', speakingTime: 'スピーチ時間', uniqueWords: 'ユニーク単語', avgWordLength: '平均単語長',
    minutes: '分', seconds: '秒', clear: 'クリア', loadSample: 'サンプル',
    charLimits: '一般的な制限', tweetLimit: 'Twitter/X: 280文字', metaDesc: 'メタ説明: 160文字', smsLimit: 'SMS: 160文字',
    introTitle: '無料文字数カウンター', introText: 'テキストの文字数、単語数、文章数をリアルタイムでカウントし、読書時間を推定します。',
    tipTitle: 'ヒント', tip1: 'Twitter/Xは280文字まで', tip2: 'SEOのメタ説明は150-160文字', tip3: 'SMSは通常160文字まで', tip4: 'LinkedInは1200-1600文字が最適', tip5: '平均読書速度は200-250語/分',
    faqTitle: 'よくある質問',
    faq1q: 'このカウンターはどう動きますか？', faq1a: 'テキスト入力をリアルタイムで分析し、全文字、単語、文章、段落をカウントします。',
    faq2q: '文字数にスペースは含まれますか？', faq2a: 'はい、メインカウントには全スペースが含まれます。「スペースなし」は非空白文字のみです。',
    faq3q: '読書時間はどう計算されますか？', faq3a: '読書は200語/分、スピーチは130語/分の平均速度で計算します。',
    faq4q: '一般的な文字制限は？', faq4a: 'Twitter(280)、SMS(160)、メタ説明(155-160)、Instagramプロフィール(150)など。',
    faq5q: 'スペースなしで数えられますか？', faq5a: 'はい、両方のカウントが別々に表示されます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '글자 수 세기',
    description: '문자 수, 단어 수, 문장 수, 단락 수를 세고 읽기 시간을 예측합니다.',
    inputLabel: '텍스트 입력 또는 붙여넣기',
    inputPlaceholder: '텍스트를 입력하거나 붙여넣으세요...',
    characters: '문자 수', charactersNoSpaces: '공백 제외', words: '단어 수', sentences: '문장 수', paragraphs: '단락 수',
    readingTime: '읽기 시간', speakingTime: '말하기 시간', uniqueWords: '고유 단어', avgWordLength: '평균 단어 길이',
    minutes: '분', seconds: '초', clear: '지우기', loadSample: '샘플',
    charLimits: '일반 제한', tweetLimit: 'Twitter/X: 280자', metaDesc: '메타 설명: 160자', smsLimit: 'SMS: 160자',
    introTitle: '무료 글자 수 세기', introText: '텍스트의 문자 수, 단어 수, 문장 수를 실시간으로 계산하고 읽기 시간을 예측합니다.',
    tipTitle: '팁', tip1: 'Twitter/X는 280자 제한', tip2: 'SEO 메타 설명은 150-160자', tip3: 'SMS는 보통 160자 제한', tip4: 'LinkedIn은 1200-1600자가 최적', tip5: '평균 독서 속도는 200-250 단어/분',
    faqTitle: '자주 묻는 질문',
    faq1q: '이 카운터는 어떻게 작동하나요?', faq1a: '입력한 텍스트를 실시간으로 분석하여 모든 문자, 단어, 문장, 단락을 계산합니다.',
    faq2q: '문자 수에 공백이 포함되나요?', faq2a: '네, 기본 카운트에는 모든 공백이 포함됩니다. "공백 제외"는 비공백 문자만 표시합니다.',
    faq3q: '읽기 시간은 어떻게 계산되나요?', faq3a: '읽기는 200단어/분, 말하기는 130단어/분의 평균 속도로 계산됩니다.',
    faq4q: '일반적인 글자 수 제한은?', faq4a: 'Twitter(280), SMS(160), 메타 설명(155-160), Instagram 바이오(150) 등.',
    faq5q: '공백 없이 셀 수 있나요?', faq5a: '네, 두 가지 카운트가 별도로 표시됩니다.',
    relatedTitle: '관련 도구',
  },
};

const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet. It has been commonly used for testing typewriters and computer keyboards.

Character counters are essential tools for writers, marketers, and developers. Whether you need to stay within Twitter's 280-character limit or optimize your meta descriptions for SEO, knowing your character and word count is crucial.

This tool counts characters, words, sentences, and paragraphs in real time.`;

export default function CharacterCounter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === '' ? 0 : (text.match(/[.!?]+/g) || []).length;
    const paragraphs = text.trim() === '' ? 0 : text.trim().split(/\n\s*\n/).length;
    const wordList = text.trim() === '' ? [] : text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const uniqueWords = new Set(wordList).size;
    const avgWordLen = wordList.length > 0 ? (wordList.reduce((s, w) => s + w.length, 0) / wordList.length).toFixed(1) : '0.0';
    const readMins = Math.floor(words / 200);
    const readSecs = Math.round((words % 200) / 200 * 60);
    const speakMins = Math.floor(words / 130);
    const speakSecs = Math.round((words % 130) / 130 * 60);
    return { chars, charsNoSpaces, words, sentences, paragraphs, uniqueWords, avgWordLen, readMins, readSecs, speakMins, speakSecs };
  }, [text]);

  const statCards = [
    { label: t.characters, value: stats.chars, color: '#3b82f6' },
    { label: t.charactersNoSpaces, value: stats.charsNoSpaces, color: '#8b5cf6' },
    { label: t.words, value: stats.words, color: '#22c55e' },
    { label: t.sentences, value: stats.sentences, color: '#f59e0b' },
    { label: t.paragraphs, value: stats.paragraphs, color: '#ef4444' },
    { label: t.uniqueWords, value: stats.uniqueWords, color: '#06b6d4' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="character-counter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12, marginBottom: 16 }}>
        {statCards.map(({ label, value, color }) => (
          <div key={label} style={{ background: 'var(--bg-input)', border: `1px solid ${color}40`, borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: 'monospace' }}>{value.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Time cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#10b981' }}>{stats.readMins}{t.minutes} {stats.readSecs}{t.seconds}</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{t.readingTime}</div>
        </div>
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#f59e0b' }}>{stats.speakMins}{t.minutes} {stats.speakSecs}{t.seconds}</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{t.speakingTime}</div>
        </div>
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#8b5cf6' }}>{stats.avgWordLen}</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{t.avgWordLength}</div>
        </div>
      </div>

      {/* Textarea */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setText(SAMPLE_TEXT)} className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 10px' }}>{t.loadSample}</button>
            <button onClick={() => setText('')} className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 10px' }}>{t.clear}</button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={t.inputPlaceholder}
          style={{ minHeight: 200, fontSize: 14, lineHeight: 1.6 }}
        />
      </div>

      {/* Common limits */}
      <div style={{ padding: '12px 16px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>{t.charLimits}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { label: t.tweetLimit, max: 280 },
            { label: t.metaDesc, max: 160 },
            { label: t.smsLimit, max: 160 },
          ].map(({ label, max }) => {
            const pct = Math.min((stats.chars / max) * 100, 100);
            const over = stats.chars > max;
            return (
              <div key={label} style={{ flex: '1 1 200px', minWidth: 180 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                  <span style={{ color: over ? '#ef4444' : 'var(--text-secondary)' }}>{stats.chars}/{max}</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: 'var(--border-color)' }}>
                  <div style={{ height: '100%', borderRadius: 2, background: over ? '#ef4444' : '#3b82f6', width: `${pct}%`, transition: 'width 0.2s' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/markdown-preview`, label: 'Markdown Preview' },
            { href: `/${lang}/tools/word-counter`, label: 'Word Counter' },
            { href: `/${lang}/tools/lorem-ipsum`, label: 'Lorem Ipsum Generator' },
            { href: `/${lang}/tools/text-diff`, label: 'Text Diff Checker' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
