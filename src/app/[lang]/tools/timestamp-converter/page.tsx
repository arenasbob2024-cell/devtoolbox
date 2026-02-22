'use client';

import { useState, useEffect, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Unix Timestamp Converter',
    description: 'Convert between Unix timestamps (seconds/milliseconds) and human-readable dates. Auto-detect format, show ISO 8601, relative time, and timezone info.',
    tsInput: 'Timestamp Input',
    dateInput: 'Date Input',
    nowBtn: 'Now',
    convertBtn: 'Convert',
    clearBtn: 'Clear',
    tsPlaceholder: 'Enter Unix timestamp (e.g. 1700000000)',
    datePlaceholder: 'Enter date (e.g. 2025-01-15 12:00:00)',
    results: 'Conversion Results',
    unixSec: 'Unix (seconds)',
    unixMs: 'Unix (milliseconds)',
    iso8601: 'ISO 8601',
    utcDate: 'UTC Date',
    localDate: 'Local Date',
    relative: 'Relative Time',
    dayOfWeek: 'Day of Week',
    timezone: 'Timezone',
    format: 'Format',
    seconds: 'Seconds',
    milliseconds: 'Milliseconds',
    auto: 'Auto-detect',
    emptyState: 'Enter a Unix timestamp or date string and click Convert',
    invalidInput: 'Invalid input. Enter a Unix timestamp or valid date string.',
    ago: 'ago',
    fromNow: 'from now',
    liveTs: 'Current Unix Timestamp',
    introTitle: 'Free Online Unix Timestamp Converter',
    introText: 'Convert Unix timestamps (epoch time) to human-readable dates and vice versa. This tool auto-detects whether the input is in seconds or milliseconds, and converts to ISO 8601, UTC, local time, relative time, and more. Essential for developers working with APIs, databases, and logging systems.',
    howTitle: 'How to Convert Unix Timestamps',
    step1: 'Enter a Unix timestamp (seconds or milliseconds) or a human-readable date',
    step2: 'The tool auto-detects the input format, or use the format toggle',
    step3: 'Click Convert to see all date representations',
    step4: 'Click the copy button next to any format to copy the value',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a Unix timestamp?',
    faq1a: 'A Unix timestamp (also called epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC. It is widely used in programming, databases, and APIs as a universal time representation.',
    faq2q: 'What is the difference between seconds and milliseconds timestamps?',
    faq2a: 'A seconds-based Unix timestamp is typically 10 digits (e.g., 1700000000), while a milliseconds-based timestamp is 13 digits (e.g., 1700000000000). JavaScript Date.now() returns milliseconds, while most Unix systems use seconds.',
    faq3q: 'What is the Year 2038 problem?',
    faq3a: 'The Year 2038 problem occurs because 32-bit systems store Unix timestamps as a signed 32-bit integer, which overflows on January 19, 2038. Modern 64-bit systems are not affected.',
    faq4q: 'How does the auto-detect feature work?',
    faq4a: 'If the input number has 13 or more digits, it is treated as milliseconds. Numbers with 10 or fewer digits are treated as seconds. Non-numeric input is parsed as a date string.',
    faq5q: 'What timezone is used for conversion?',
    faq5a: 'Unix timestamps are always in UTC. The tool shows both UTC and your local timezone based on your browser settings.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Unix 时间戳转换器',
    description: '在 Unix 时间戳（秒/毫秒）与人类可读日期之间转换。自动检测格式，显示 ISO 8601、相对时间和时区。',
    tsInput: '时间戳输入', dateInput: '日期输入', nowBtn: '当前时间', convertBtn: '转换', clearBtn: '清除',
    tsPlaceholder: '输入 Unix 时间戳（如 1700000000）', datePlaceholder: '输入日期（如 2025-01-15 12:00:00）',
    results: '转换结果', unixSec: 'Unix（秒）', unixMs: 'Unix（毫秒）', iso8601: 'ISO 8601',
    utcDate: 'UTC 日期', localDate: '本地日期', relative: '相对时间', dayOfWeek: '星期',
    timezone: '时区', format: '格式', seconds: '秒', milliseconds: '毫秒', auto: '自动检测',
    emptyState: '输入 Unix 时间戳或日期字符串并点击转换',
    invalidInput: '无效输入。请输入 Unix 时间戳或有效日期字符串。',
    ago: '前', fromNow: '后', liveTs: '当前 Unix 时间戳',
    introTitle: '免费在线 Unix 时间戳转换器',
    introText: '将 Unix 时间戳（纪元时间）转换为人类可读的日期格式，反之亦然。自动检测秒或毫秒输入格式，支持 ISO 8601、UTC、本地时间和相对时间显示。',
    howTitle: '如何转换 Unix 时间戳', step1: '输入 Unix 时间戳或日期字符串', step2: '工具自动检测输入格式', step3: '点击转换查看所有日期格式', step4: '点击复制按钮复制值',
    faqTitle: '常见问题',
    faq1q: '什么是 Unix 时间戳？', faq1a: 'Unix 时间戳是自 1970 年 1 月 1 日 00:00:00 UTC 以来经过的秒数，广泛用于编程、数据库和 API。',
    faq2q: '秒和毫秒时间戳有什么区别？', faq2a: '秒级时间戳通常为 10 位数字，毫秒级为 13 位。JavaScript 的 Date.now() 返回毫秒。',
    faq3q: '什么是 2038 年问题？', faq3a: '32 位系统将时间戳存储为有符号 32 位整数，2038 年 1 月 19 日会溢出。64 位系统不受影响。',
    faq4q: '自动检测如何工作？', faq4a: '13 位及以上数字视为毫秒，10 位及以下视为秒。非数字输入按日期字符串解析。',
    faq5q: '使用什么时区？', faq5a: 'Unix 时间戳始终为 UTC。工具同时显示 UTC 和您的本地时区。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur Timestamp Unix',
    description: 'Convertissez entre timestamps Unix (secondes/millisecondes) et dates lisibles.',
    tsInput: 'Timestamp', dateInput: 'Date', nowBtn: 'Maintenant', convertBtn: 'Convertir', clearBtn: 'Effacer',
    tsPlaceholder: 'Entrez un timestamp Unix', datePlaceholder: 'Entrez une date',
    results: 'Resultats', unixSec: 'Unix (secondes)', unixMs: 'Unix (millisecondes)', iso8601: 'ISO 8601',
    utcDate: 'Date UTC', localDate: 'Date locale', relative: 'Temps relatif', dayOfWeek: 'Jour',
    timezone: 'Fuseau', format: 'Format', seconds: 'Secondes', milliseconds: 'Millisecondes', auto: 'Auto',
    emptyState: 'Entrez un timestamp ou une date', invalidInput: 'Entree invalide.',
    ago: 'il y a', fromNow: 'dans', liveTs: 'Timestamp Unix actuel',
    introTitle: 'Convertisseur Timestamp Unix gratuit', introText: 'Convertissez les timestamps Unix en dates lisibles et inversement avec detection automatique.',
    howTitle: 'Comment convertir', step1: 'Entrez un timestamp ou une date', step2: 'Detection automatique', step3: 'Cliquez Convertir', step4: 'Copiez la valeur',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce qu\'un timestamp Unix ?', faq1a: 'Le nombre de secondes depuis le 1er janvier 1970 UTC.',
    faq2q: 'Secondes vs millisecondes ?', faq2a: 'Secondes = 10 chiffres, millisecondes = 13 chiffres.',
    faq3q: 'Le probleme de 2038 ?', faq3a: 'Les systemes 32 bits deborderont le 19 janvier 2038.',
    faq4q: 'Auto-detection ?', faq4a: '13+ chiffres = millisecondes, sinon secondes.',
    faq5q: 'Fuseau horaire ?', faq5a: 'Timestamps en UTC. Affiche UTC et votre fuseau local.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Unix-Zeitstempel-Konverter',
    description: 'Konvertieren Sie zwischen Unix-Zeitstempeln und lesbaren Daten.',
    tsInput: 'Zeitstempel', dateInput: 'Datum', nowBtn: 'Jetzt', convertBtn: 'Konvertieren', clearBtn: 'Loeschen',
    tsPlaceholder: 'Unix-Zeitstempel eingeben', datePlaceholder: 'Datum eingeben',
    results: 'Ergebnisse', unixSec: 'Unix (Sekunden)', unixMs: 'Unix (Millisekunden)', iso8601: 'ISO 8601',
    utcDate: 'UTC-Datum', localDate: 'Lokales Datum', relative: 'Relative Zeit', dayOfWeek: 'Wochentag',
    timezone: 'Zeitzone', format: 'Format', seconds: 'Sekunden', milliseconds: 'Millisekunden', auto: 'Auto',
    emptyState: 'Zeitstempel oder Datum eingeben', invalidInput: 'Ungueltige Eingabe.',
    ago: 'vor', fromNow: 'in', liveTs: 'Aktueller Unix-Zeitstempel',
    introTitle: 'Kostenloser Unix-Zeitstempel-Konverter', introText: 'Konvertieren Sie Unix-Zeitstempel in lesbare Daten und umgekehrt.',
    howTitle: 'Wie man konvertiert', step1: 'Zeitstempel oder Datum eingeben', step2: 'Automatische Erkennung', step3: 'Konvertieren klicken', step4: 'Wert kopieren',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein Unix-Zeitstempel?', faq1a: 'Sekunden seit dem 1. Januar 1970 UTC.',
    faq2q: 'Sekunden vs Millisekunden?', faq2a: 'Sekunden = 10 Ziffern, Millisekunden = 13 Ziffern.',
    faq3q: 'Das 2038-Problem?', faq3a: '32-Bit-Systeme laufen am 19. Januar 2038 ueber.',
    faq4q: 'Auto-Erkennung?', faq4a: '13+ Ziffern = Millisekunden, sonst Sekunden.',
    faq5q: 'Welche Zeitzone?', faq5a: 'Zeitstempel sind UTC. Zeigt UTC und lokale Zeitzone.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor de Timestamp Unix',
    description: 'Convierte entre timestamps Unix y fechas legibles.',
    tsInput: 'Timestamp', dateInput: 'Fecha', nowBtn: 'Ahora', convertBtn: 'Convertir', clearBtn: 'Borrar',
    tsPlaceholder: 'Ingresa timestamp Unix', datePlaceholder: 'Ingresa una fecha',
    results: 'Resultados', unixSec: 'Unix (segundos)', unixMs: 'Unix (milisegundos)', iso8601: 'ISO 8601',
    utcDate: 'Fecha UTC', localDate: 'Fecha local', relative: 'Tiempo relativo', dayOfWeek: 'Dia',
    timezone: 'Zona horaria', format: 'Formato', seconds: 'Segundos', milliseconds: 'Milisegundos', auto: 'Auto',
    emptyState: 'Ingresa un timestamp o fecha', invalidInput: 'Entrada invalida.',
    ago: 'hace', fromNow: 'en', liveTs: 'Timestamp Unix actual',
    introTitle: 'Convertidor de Timestamp Unix gratuito', introText: 'Convierte timestamps Unix a fechas legibles y viceversa.',
    howTitle: 'Como convertir', step1: 'Ingresa timestamp o fecha', step2: 'Deteccion automatica', step3: 'Clic en Convertir', step4: 'Copia el valor',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es un timestamp Unix?', faq1a: 'Segundos desde el 1 de enero de 1970 UTC.',
    faq2q: 'Segundos vs milisegundos?', faq2a: 'Segundos = 10 digitos, milisegundos = 13 digitos.',
    faq3q: 'El problema del 2038?', faq3a: 'Los sistemas de 32 bits desbordan el 19 de enero de 2038.',
    faq4q: 'Auto-deteccion?', faq4a: '13+ digitos = milisegundos, sino segundos.',
    faq5q: 'Que zona horaria?', faq5a: 'Timestamps en UTC. Muestra UTC y tu zona local.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'Unixタイムスタンプ変換ツール',
    description: 'Unixタイムスタンプ（秒/ミリ秒）と日付を相互変換。',
    tsInput: 'タイムスタンプ', dateInput: '日付', nowBtn: '現在', convertBtn: '変換', clearBtn: 'クリア',
    tsPlaceholder: 'Unixタイムスタンプを入力', datePlaceholder: '日付を入力',
    results: '変換結果', unixSec: 'Unix（秒）', unixMs: 'Unix（ミリ秒）', iso8601: 'ISO 8601',
    utcDate: 'UTC日付', localDate: 'ローカル日付', relative: '相対時間', dayOfWeek: '曜日',
    timezone: 'タイムゾーン', format: '形式', seconds: '秒', milliseconds: 'ミリ秒', auto: '自動',
    emptyState: 'タイムスタンプまたは日付を入力', invalidInput: '無効な入力です。',
    ago: '前', fromNow: '後', liveTs: '現在のUnixタイムスタンプ',
    introTitle: '無料Unixタイムスタンプ変換ツール', introText: 'Unixタイムスタンプと日付を相互変換します。',
    howTitle: '変換方法', step1: 'タイムスタンプまたは日付を入力', step2: '形式を自動検出', step3: '変換をクリック', step4: '値をコピー',
    faqTitle: 'よくある質問',
    faq1q: 'Unixタイムスタンプとは？', faq1a: '1970年1月1日UTCからの経過秒数です。',
    faq2q: '秒とミリ秒の違い？', faq2a: '秒は10桁、ミリ秒は13桁です。',
    faq3q: '2038年問題とは？', faq3a: '32ビットシステムは2038年1月19日にオーバーフローします。',
    faq4q: '自動検出の仕組み？', faq4a: '13桁以上はミリ秒、それ以外は秒です。',
    faq5q: 'タイムゾーンは？', faq5a: 'タイムスタンプはUTCです。UTCとローカルの両方を表示します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Unix 타임스탬프 변환기',
    description: 'Unix 타임스탬프(초/밀리초)와 날짜를 상호 변환합니다.',
    tsInput: '타임스탬프', dateInput: '날짜', nowBtn: '현재', convertBtn: '변환', clearBtn: '지우기',
    tsPlaceholder: 'Unix 타임스탬프 입력', datePlaceholder: '날짜 입력',
    results: '변환 결과', unixSec: 'Unix (초)', unixMs: 'Unix (밀리초)', iso8601: 'ISO 8601',
    utcDate: 'UTC 날짜', localDate: '로컬 날짜', relative: '상대 시간', dayOfWeek: '요일',
    timezone: '시간대', format: '형식', seconds: '초', milliseconds: '밀리초', auto: '자동',
    emptyState: '타임스탬프 또는 날짜를 입력하세요', invalidInput: '잘못된 입력입니다.',
    ago: '전', fromNow: '후', liveTs: '현재 Unix 타임스탬프',
    introTitle: '무료 Unix 타임스탬프 변환기', introText: 'Unix 타임스탬프와 날짜를 상호 변환합니다.',
    howTitle: '변환 방법', step1: '타임스탬프 또는 날짜 입력', step2: '형식 자동 감지', step3: '변환 클릭', step4: '값 복사',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Unix 타임스탬프란?', faq1a: '1970년 1월 1일 UTC 이후 경과된 초 수입니다.',
    faq2q: '초와 밀리초의 차이?', faq2a: '초는 10자리, 밀리초는 13자리입니다.',
    faq3q: '2038년 문제란?', faq3a: '32비트 시스템은 2038년 1월 19일에 오버플로됩니다.',
    faq4q: '자동 감지?', faq4a: '13자리 이상은 밀리초, 아니면 초입니다.',
    faq5q: '시간대는?', faq5a: 'UTC와 로컬 시간대를 모두 표시합니다.',
    relatedTitle: '관련 도구',
  },
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getRelativeTime(date: Date, t: Record<string, string>): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const absDiff = Math.abs(diff);
  const suffix = diff > 0 ? t.ago : t.fromNow;
  if (absDiff < 60000) return `${Math.floor(absDiff / 1000)}s ${suffix}`;
  if (absDiff < 3600000) return `${Math.floor(absDiff / 60000)}m ${suffix}`;
  if (absDiff < 86400000) return `${Math.floor(absDiff / 3600000)}h ${suffix}`;
  if (absDiff < 2592000000) return `${Math.floor(absDiff / 86400000)}d ${suffix}`;
  if (absDiff < 31536000000) return `${Math.floor(absDiff / 2592000000)}mo ${suffix}`;
  return `${Math.floor(absDiff / 31536000000)}y ${suffix}`;
}

interface ConvertedDate {
  unixSec: number;
  unixMs: number;
  iso: string;
  utc: string;
  local: string;
  relative: string;
  dayOfWeek: string;
  timezone: string;
}

export default function TimestampConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [tsInput, setTsInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [format, setFormat] = useState<'auto' | 'seconds' | 'milliseconds'>('auto');
  const [result, setResult] = useState<ConvertedDate | null>(null);
  const [error, setError] = useState('');
  const [currentTs, setCurrentTs] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => setCurrentTs(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const convertFromTimestamp = useCallback((input: string) => {
    setError('');
    const trimmed = input.trim();
    if (!trimmed) { setError(t.invalidInput); setResult(null); return; }
    const num = Number(trimmed);
    if (isNaN(num)) { setError(t.invalidInput); setResult(null); return; }
    let ms: number;
    if (format === 'auto') { ms = trimmed.length >= 13 ? num : num * 1000; }
    else if (format === 'milliseconds') { ms = num; }
    else { ms = num * 1000; }
    const date = new Date(ms);
    if (isNaN(date.getTime())) { setError(t.invalidInput); setResult(null); return; }
    setResult({
      unixSec: Math.floor(ms / 1000), unixMs: ms,
      iso: date.toISOString(), utc: date.toUTCString(),
      local: date.toLocaleString(), relative: getRelativeTime(date, t),
      dayOfWeek: DAYS[date.getUTCDay()],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }, [format, t]);

  const convertFromDate = useCallback((input: string) => {
    setError('');
    const trimmed = input.trim();
    if (!trimmed) { setError(t.invalidInput); setResult(null); return; }
    const date = new Date(trimmed);
    if (isNaN(date.getTime())) { setError(t.invalidInput); setResult(null); return; }
    const ms = date.getTime();
    setResult({
      unixSec: Math.floor(ms / 1000), unixMs: ms,
      iso: date.toISOString(), utc: date.toUTCString(),
      local: date.toLocaleString(), relative: getRelativeTime(date, t),
      dayOfWeek: DAYS[date.getUTCDay()],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }, [t]);

  const handleNow = () => {
    const now = Date.now();
    const date = new Date(now);
    setTsInput(Math.floor(now / 1000).toString());
    setDateInput('');
    setError('');
    setResult({
      unixSec: Math.floor(now / 1000), unixMs: now,
      iso: date.toISOString(), utc: date.toUTCString(),
      local: date.toLocaleString(), relative: getRelativeTime(date, t),
      dayOfWeek: DAYS[date.getUTCDay()],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  const handleClear = () => { setTsInput(''); setDateInput(''); setResult(null); setError(''); };

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

  const rows = result ? [
    { label: t.unixSec, value: result.unixSec.toString() },
    { label: t.unixMs, value: result.unixMs.toString() },
    { label: t.iso8601, value: result.iso },
    { label: t.utcDate, value: result.utc },
    { label: t.localDate, value: result.local },
    { label: t.relative, value: result.relative },
    { label: t.dayOfWeek, value: result.dayOfWeek },
    { label: t.timezone, value: result.timezone },
  ] : [];

  return (
    <ToolLayout title={t.title} description={t.description} toolId="timestamp-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Live timestamp */}
      <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t.liveTs}:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <code style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-blue)' }}>{currentTs}</code>
          <CopyButton text={currentTs.toString()} />
        </div>
      </div>

      {/* Format selector */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.format}</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['auto', 'seconds', 'milliseconds'] as const).map(f => (
            <button key={f} onClick={() => setFormat(f)}
              className={format === f ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: 12, padding: '6px 14px' }}>
              {f === 'auto' ? t.auto : f === 'seconds' ? t.seconds : t.milliseconds}
            </button>
          ))}
        </div>
      </div>

      {/* Input panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.tsInput}</label>
          <input type="text" value={tsInput} onChange={e => setTsInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && convertFromTimestamp(tsInput)}
            placeholder={t.tsPlaceholder} style={{ width: '100%', marginBottom: 8 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => convertFromTimestamp(tsInput)} className="btn btn-primary" style={{ flex: 1 }}>{t.convertBtn}</button>
            <button onClick={handleNow} className="btn btn-secondary">{t.nowBtn}</button>
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.dateInput}</label>
          <input type="text" value={dateInput} onChange={e => setDateInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && convertFromDate(dateInput)}
            placeholder={t.datePlaceholder} style={{ width: '100%', marginBottom: 8 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => convertFromDate(dateInput)} className="btn btn-primary" style={{ flex: 1 }}>{t.convertBtn}</button>
            <button onClick={handleClear} className="btn btn-secondary">{t.clearBtn}</button>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 8, background: '#fee2e2', color: '#dc2626', fontSize: 13 }}>{error}</div>
      )}

      {/* Results */}
      <div style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.results}</h2>
        {result ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {rows.map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'var(--bg-input)', borderRadius: 6, padding: '10px 14px',
                border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: 8,
              }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <span style={{ fontSize: 11, color: 'var(--accent-blue)', fontWeight: 700, marginRight: 8 }}>{label}:</span>
                  <code style={{ fontSize: 13, wordBreak: 'break-all' }}>{value}</code>
                </div>
                <CopyButton text={value} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)', fontSize: 14 }}>{t.emptyState}</div>
        )}
      </div>

      {/* SEO content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li>
        </ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, i) => (
            <details key={i} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/cron-parser`, label: 'Cron Expression Parser' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/number-base`, label: 'Number Base Converter' },
            { href: `/${lang}/tools/uuid-generator`, label: 'UUID Generator' },
          ].map(link => (
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
