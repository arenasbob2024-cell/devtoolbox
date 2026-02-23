'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Cron Expression to Human Readable',
    description: 'Convert cron expressions to plain English. Understand when your cron jobs will run.',
    inputLabel: 'Cron Expression',
    placeholder: '0 9 * * 1-5',
    parseBtn: 'Parse',
    clearBtn: 'Clear',
    resultLabel: 'Human Readable',
    nextRunsLabel: 'Next 5 Runs',
    fieldLabel: 'Field Breakdown',
    minuteField: 'Minute',
    hourField: 'Hour',
    domField: 'Day of Month',
    monthField: 'Month',
    dowField: 'Day of Week',
    examplesLabel: 'Common Examples',
    errorMsg: 'Invalid cron expression. Use 5 fields: minute hour day-of-month month day-of-week',
    everyMinute: 'Every minute',
    everyHour: 'Every hour',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    formatNote: 'Format: minute hour day-of-month month day-of-week',
  },
  fr: { title: 'Expression Cron en Langage Naturel', description: 'Convertissez les expressions cron en langage naturel.', inputLabel: 'Expression Cron', placeholder: '0 9 * * 1-5', parseBtn: 'Analyser', clearBtn: 'Effacer', resultLabel: 'Lisible', nextRunsLabel: '5 prochaines exécutions', fieldLabel: 'Détail des champs', minuteField: 'Minute', hourField: 'Heure', domField: 'Jour du mois', monthField: 'Mois', dowField: 'Jour de semaine', examplesLabel: 'Exemples courants', errorMsg: 'Expression cron invalide.', everyMinute: 'Chaque minute', everyHour: 'Chaque heure', daily: 'Quotidien', weekly: 'Hebdomadaire', monthly: 'Mensuel', formatNote: 'Format: minute heure jour-du-mois mois jour-de-semaine' },
  de: { title: 'Cron-Ausdruck zu verständlichem Text', description: 'Cron-Ausdrücke in einfaches Deutsch umwandeln.', inputLabel: 'Cron-Ausdruck', placeholder: '0 9 * * 1-5', parseBtn: 'Analysieren', clearBtn: 'Löschen', resultLabel: 'Verständlicher Text', nextRunsLabel: 'Nächste 5 Ausführungen', fieldLabel: 'Feldaufschlüsselung', minuteField: 'Minute', hourField: 'Stunde', domField: 'Tag des Monats', monthField: 'Monat', dowField: 'Wochentag', examplesLabel: 'Häufige Beispiele', errorMsg: 'Ungültiger Cron-Ausdruck.', everyMinute: 'Jede Minute', everyHour: 'Jede Stunde', daily: 'Täglich', weekly: 'Wöchentlich', monthly: 'Monatlich', formatNote: 'Format: Minute Stunde Tag-des-Monats Monat Wochentag' },
  it: { title: 'Espressione Cron in Linguaggio Naturale', description: 'Converti espressioni cron in italiano semplice.', inputLabel: 'Espressione Cron', placeholder: '0 9 * * 1-5', parseBtn: 'Analizza', clearBtn: 'Cancella', resultLabel: 'Leggibile', nextRunsLabel: 'Prossime 5 esecuzioni', fieldLabel: 'Campi', minuteField: 'Minuto', hourField: 'Ora', domField: 'Giorno del mese', monthField: 'Mese', dowField: 'Giorno della settimana', examplesLabel: 'Esempi comuni', errorMsg: 'Espressione cron non valida.', everyMinute: 'Ogni minuto', everyHour: 'Ogni ora', daily: 'Giornaliero', weekly: 'Settimanale', monthly: 'Mensile', formatNote: 'Formato: minuto ora giorno-del-mese mese giorno-della-settimana' },
  es: { title: 'Expresión Cron a Lenguaje Natural', description: 'Convierte expresiones cron a lenguaje natural.', inputLabel: 'Expresión Cron', placeholder: '0 9 * * 1-5', parseBtn: 'Analizar', clearBtn: 'Limpiar', resultLabel: 'Legible', nextRunsLabel: 'Próximas 5 ejecuciones', fieldLabel: 'Campos', minuteField: 'Minuto', hourField: 'Hora', domField: 'Día del mes', monthField: 'Mes', dowField: 'Día de la semana', examplesLabel: 'Ejemplos comunes', errorMsg: 'Expresión cron inválida.', everyMinute: 'Cada minuto', everyHour: 'Cada hora', daily: 'Diario', weekly: 'Semanal', monthly: 'Mensual', formatNote: 'Formato: minuto hora día-del-mes mes día-de-la-semana' },
  pt: { title: 'Expressão Cron para Linguagem Natural', description: 'Converta expressões cron para linguagem natural.', inputLabel: 'Expressão Cron', placeholder: '0 9 * * 1-5', parseBtn: 'Analisar', clearBtn: 'Limpar', resultLabel: 'Legível', nextRunsLabel: 'Próximas 5 execuções', fieldLabel: 'Campos', minuteField: 'Minuto', hourField: 'Hora', domField: 'Dia do mês', monthField: 'Mês', dowField: 'Dia da semana', examplesLabel: 'Exemplos comuns', errorMsg: 'Expressão cron inválida.', everyMinute: 'A cada minuto', everyHour: 'A cada hora', daily: 'Diário', weekly: 'Semanal', monthly: 'Mensal', formatNote: 'Formato: minuto hora dia-do-mês mês dia-da-semana' },
  nl: { title: 'Cron naar Leesbaar', description: 'Converteer cron-expressies naar leesbaar Nederlands.', inputLabel: 'Cron-expressie', placeholder: '0 9 * * 1-5', parseBtn: 'Analyseer', clearBtn: 'Wissen', resultLabel: 'Leesbaar', nextRunsLabel: 'Volgende 5 uitvoeringen', fieldLabel: 'Velden', minuteField: 'Minuut', hourField: 'Uur', domField: 'Dag van de maand', monthField: 'Maand', dowField: 'Dag van de week', examplesLabel: 'Veelgebruikte voorbeelden', errorMsg: 'Ongeldige cron-expressie.', everyMinute: 'Elke minuut', everyHour: 'Elk uur', daily: 'Dagelijks', weekly: 'Wekelijks', monthly: 'Maandelijks', formatNote: 'Formaat: minuut uur dag-van-de-maand maand dag-van-de-week' },
  pl: { title: 'Wyrażenie Cron na Czytelny Tekst', description: 'Konwertuj wyrażenia cron na czytelny polski tekst.', inputLabel: 'Wyrażenie Cron', placeholder: '0 9 * * 1-5', parseBtn: 'Analizuj', clearBtn: 'Wyczyść', resultLabel: 'Czytelny tekst', nextRunsLabel: 'Następne 5 wykonań', fieldLabel: 'Pola', minuteField: 'Minuta', hourField: 'Godzina', domField: 'Dzień miesiąca', monthField: 'Miesiąc', dowField: 'Dzień tygodnia', examplesLabel: 'Częste przykłady', errorMsg: 'Nieprawidłowe wyrażenie cron.', everyMinute: 'Co minutę', everyHour: 'Co godzinę', daily: 'Codziennie', weekly: 'Co tydzień', monthly: 'Co miesiąc', formatNote: 'Format: minuta godzina dzień-miesiąca miesiąc dzień-tygodnia' },
  sv: { title: 'Cron till Läsbar Text', description: 'Konvertera cron-uttryck till läsbar svenska.', inputLabel: 'Cron-uttryck', placeholder: '0 9 * * 1-5', parseBtn: 'Analysera', clearBtn: 'Rensa', resultLabel: 'Läsbar text', nextRunsLabel: 'Nästa 5 körningar', fieldLabel: 'Fält', minuteField: 'Minut', hourField: 'Timme', domField: 'Dag i månaden', monthField: 'Månad', dowField: 'Veckodag', examplesLabel: 'Vanliga exempel', errorMsg: 'Ogiltigt cron-uttryck.', everyMinute: 'Varje minut', everyHour: 'Varje timme', daily: 'Dagligen', weekly: 'Varje vecka', monthly: 'Varje månad', formatNote: 'Format: minut timme dag-i-månaden månad veckodag' },
  no: { title: 'Cron til Lesbar Tekst', description: 'Konverter cron-uttrykk til lesbar norsk tekst.', inputLabel: 'Cron-uttrykk', placeholder: '0 9 * * 1-5', parseBtn: 'Analyser', clearBtn: 'Tøm', resultLabel: 'Lesbar tekst', nextRunsLabel: 'Neste 5 kjøringer', fieldLabel: 'Felt', minuteField: 'Minutt', hourField: 'Time', domField: 'Dag i måneden', monthField: 'Måned', dowField: 'Ukedag', examplesLabel: 'Vanlige eksempler', errorMsg: 'Ugyldig cron-uttrykk.', everyMinute: 'Hvert minutt', everyHour: 'Hver time', daily: 'Daglig', weekly: 'Ukentlig', monthly: 'Månedlig', formatNote: 'Format: minutt time dag-i-måneden måned ukedag' },
  zh: { title: 'Cron 表达式转人类可读', description: '将 Cron 表达式转换为易于理解的中文说明。', inputLabel: 'Cron 表达式', placeholder: '0 9 * * 1-5', parseBtn: '解析', clearBtn: '清除', resultLabel: '可读描述', nextRunsLabel: '未来5次运行时间', fieldLabel: '字段解析', minuteField: '分钟', hourField: '小时', domField: '日期', monthField: '月份', dowField: '星期', examplesLabel: '常见示例', errorMsg: '无效的 Cron 表达式，请使用5个字段。', everyMinute: '每分钟', everyHour: '每小时', daily: '每天', weekly: '每周', monthly: '每月', formatNote: '格式：分钟 小时 日 月 星期' },
  ja: { title: 'Cron式を人間が読める形式に変換', description: 'cron式をわかりやすい日本語に変換します。', inputLabel: 'Cron式', placeholder: '0 9 * * 1-5', parseBtn: '解析', clearBtn: 'クリア', resultLabel: '説明', nextRunsLabel: '次の5回の実行時刻', fieldLabel: 'フィールド内訳', minuteField: '分', hourField: '時', domField: '日', monthField: '月', dowField: '曜日', examplesLabel: 'よく使う例', errorMsg: '無効なcron式です。', everyMinute: '毎分', everyHour: '毎時', daily: '毎日', weekly: '毎週', monthly: '毎月', formatNote: 'フォーマット: 分 時 日 月 曜日' },
  ko: { title: 'Cron 표현식을 사람이 읽기 쉽게', description: 'cron 표현식을 이해하기 쉬운 한국어로 변환합니다.', inputLabel: 'Cron 표현식', placeholder: '0 9 * * 1-5', parseBtn: '파싱', clearBtn: '지우기', resultLabel: '설명', nextRunsLabel: '다음 5번 실행 시간', fieldLabel: '필드 분석', minuteField: '분', hourField: '시간', domField: '일', monthField: '월', dowField: '요일', examplesLabel: '일반적인 예', errorMsg: '잘못된 cron 표현식입니다.', everyMinute: '매분', everyHour: '매시간', daily: '매일', weekly: '매주', monthly: '매월', formatNote: '형식: 분 시간 일 월 요일' },
  id: { title: 'Ekspresi Cron ke Bahasa Manusia', description: 'Konversi ekspresi cron ke bahasa yang mudah dipahami.', inputLabel: 'Ekspresi Cron', placeholder: '0 9 * * 1-5', parseBtn: 'Parse', clearBtn: 'Hapus', resultLabel: 'Mudah Dibaca', nextRunsLabel: '5 Eksekusi Berikutnya', fieldLabel: 'Rincian Kolom', minuteField: 'Menit', hourField: 'Jam', domField: 'Hari Bulan', monthField: 'Bulan', dowField: 'Hari Minggu', examplesLabel: 'Contoh Umum', errorMsg: 'Ekspresi cron tidak valid.', everyMinute: 'Setiap menit', everyHour: 'Setiap jam', daily: 'Setiap hari', weekly: 'Setiap minggu', monthly: 'Setiap bulan', formatNote: 'Format: menit jam hari-bulan bulan hari-minggu' },
  th: { title: 'Cron Expression เป็นภาษาคน', description: 'แปลง cron expressions เป็นภาษาที่เข้าใจง่าย', inputLabel: 'Cron Expression', placeholder: '0 9 * * 1-5', parseBtn: 'แปลง', clearBtn: 'ล้าง', resultLabel: 'คำอธิบาย', nextRunsLabel: '5 ครั้งถัดไป', fieldLabel: 'รายละเอียดฟิลด์', minuteField: 'นาที', hourField: 'ชั่วโมง', domField: 'วันที่', monthField: 'เดือน', dowField: 'วันในสัปดาห์', examplesLabel: 'ตัวอย่างทั่วไป', errorMsg: 'Cron expression ไม่ถูกต้อง', everyMinute: 'ทุกนาที', everyHour: 'ทุกชั่วโมง', daily: 'ทุกวัน', weekly: 'ทุกสัปดาห์', monthly: 'ทุกเดือน', formatNote: 'รูปแบบ: นาที ชั่วโมง วันที่ เดือน วันในสัปดาห์' },
};

const EXAMPLES = [
  { cron: '* * * * *', desc: 'Every minute' },
  { cron: '0 * * * *', desc: 'Every hour' },
  { cron: '0 0 * * *', desc: 'Daily at midnight' },
  { cron: '0 9 * * 1-5', desc: 'Weekdays at 9 AM' },
  { cron: '0 0 * * 0', desc: 'Every Sunday at midnight' },
  { cron: '0 0 1 * *', desc: 'First day of every month' },
  { cron: '*/15 * * * *', desc: 'Every 15 minutes' },
  { cron: '0 9,17 * * *', desc: 'At 9 AM and 5 PM daily' },
  { cron: '0 0 1 1 *', desc: 'Annually on Jan 1st' },
  { cron: '30 3 * * 0', desc: 'Every Sunday at 3:30 AM' },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function parseCronField(field: string, min: number, max: number, names?: string[]): string {
  if (field === '*') return '*';
  if (field.includes('/')) {
    const [range, step] = field.split('/');
    const stepNum = parseInt(step);
    if (range === '*') return `every ${stepNum}`;
    return `every ${stepNum} starting at ${range}`;
  }
  if (field.includes('-')) {
    const [start, end] = field.split('-');
    if (names) {
      const s = parseInt(start);
      const e = parseInt(end);
      return `${names[s] ?? start} through ${names[e] ?? end}`;
    }
    return `${start} through ${end}`;
  }
  if (field.includes(',')) {
    const parts = field.split(',');
    if (names) {
      return parts.map(p => names[parseInt(p)] ?? p).join(', ');
    }
    return parts.join(', ');
  }
  const num = parseInt(field);
  if (!isNaN(num)) {
    if (names && num >= 0 && num < names.length) return names[num];
    return field;
  }
  return field;
}

function cronToHuman(cron: string): { description: string; fields: Array<{ label: string; value: string; raw: string }>; valid: boolean } {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return { description: '', fields: [], valid: false };
  const [min, hour, dom, month, dow] = parts;

  // Validate each part
  const validPart = (p: string) => /^[\d*/,\-]+$/.test(p);
  if (!parts.every(validPart)) return { description: '', fields: [], valid: false };

  const fields = [
    { label: 'Minute', raw: min, value: parseCronField(min, 0, 59) },
    { label: 'Hour', raw: hour, value: parseCronField(hour, 0, 23) },
    { label: 'Day of Month', raw: dom, value: parseCronField(dom, 1, 31) },
    { label: 'Month', raw: month, value: parseCronField(month, 1, 12, MONTHS) },
    { label: 'Day of Week', raw: dow, value: parseCronField(dow, 0, 6, DAYS) },
  ];

  // Build human description
  let desc = '';

  // Minute/hour handling
  if (min === '*' && hour === '*') {
    desc = 'Every minute';
  } else if (min.startsWith('*/')) {
    const step = min.slice(2);
    if (hour === '*') desc = `Every ${step} minutes`;
    else desc = `Every ${step} minutes during hour ${hour}`;
  } else if (hour === '*') {
    desc = `At minute ${min} of every hour`;
  } else if (min === '0' && hour !== '*') {
    const hrStr = hour.includes(',') ? hour : `${hour}:00`;
    desc = `At ${hrStr}`;
  } else {
    desc = `At ${hour}:${min.padStart(2, '0')}`;
  }

  // Day of week / month
  if (dom !== '*' && dow !== '*') {
    desc += `, on day ${dom} of the month and on ${parseCronField(dow, 0, 6, DAYS)}`;
  } else if (dom !== '*') {
    desc += `, on day ${dom} of the month`;
  } else if (dow !== '*') {
    const dowDesc = parseCronField(dow, 0, 6, DAYS);
    desc += `, every ${dowDesc}`;
  } else {
    if (min !== '*' || hour !== '*') desc += ', every day';
  }

  // Month
  if (month !== '*') {
    const monthDesc = parseCronField(month, 1, 12, MONTHS);
    desc += `, in ${monthDesc}`;
  }

  return { description: desc, fields, valid: true };
}

function getNextRuns(cron: string, count: number): string[] {
  // Simple approximation: just show conceptual next runs description
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return [];

  const results: string[] = [];
  const now = new Date();
  const [minPart, hourPart, , , dowPart] = parts;

  // Very simplified: try to show next occurrences
  let date = new Date(now);
  date.setSeconds(0, 0);
  let attempts = 0;

  while (results.length < count && attempts < 10080) {
    date.setMinutes(date.getMinutes() + 1);
    attempts++;

    const matches = (part: string, val: number, min: number): boolean => {
      if (part === '*') return true;
      if (part.startsWith('*/')) return (val - min) % parseInt(part.slice(2)) === 0;
      if (part.includes('-')) {
        const [a, b] = part.split('-').map(Number);
        return val >= a && val <= b;
      }
      if (part.includes(',')) return part.split(',').map(Number).includes(val);
      return parseInt(part) === val;
    };

    if (
      matches(minPart, date.getMinutes(), 0) &&
      matches(hourPart, date.getHours(), 0) &&
      (dowPart === '*' || matches(dowPart, date.getDay(), 0))
    ) {
      results.push(date.toLocaleString());
    }
  }
  return results;
}

export default function CronToHuman() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ReturnType<typeof cronToHuman> | null>(null);
  const [nextRuns, setNextRuns] = useState<string[]>([]);
  const [error, setError] = useState('');

  const parse = () => {
    if (!input.trim()) return;
    const parsed = cronToHuman(input.trim());
    if (!parsed.valid) {
      setError(t.errorMsg);
      setResult(null);
      setNextRuns([]);
      return;
    }
    setError('');
    setResult(parsed);
    setNextRuns(getNextRuns(input.trim(), 5));
  };

  const loadExample = (cron: string) => {
    setInput(cron);
    const parsed = cronToHuman(cron);
    setError('');
    setResult(parsed);
    setNextRuns(getNextRuns(cron, 5));
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="cron-to-human">
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && parse()}
            placeholder={t.placeholder}
            style={{ flex: 1, padding: '10px 14px', fontSize: 15, fontFamily: 'monospace', letterSpacing: 2, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
          />
          <button onClick={parse} className="btn btn-primary">{t.parseBtn}</button>
          <button onClick={() => { setInput(''); setResult(null); setNextRuns([]); setError(''); }} className="btn btn-secondary">{t.clearBtn}</button>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 6 }}>{t.formatNote}</div>
      </div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {error}
        </div>
      )}

      {result && result.valid && (
        <div style={{ marginBottom: 20 }}>
          {/* Human readable */}
          <div style={{ padding: '16px 20px', background: 'var(--bg-input)', borderRadius: 10, border: '1px solid var(--border-color)', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{t.resultLabel}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>{result.description}</div>
              </div>
              <CopyButton text={result.description} />
            </div>
          </div>

          {/* Field breakdown */}
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>{t.fieldLabel}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
              {result.fields.map((f, idx) => (
                <div key={idx} style={{ padding: '10px 12px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{f.label}</div>
                  <div style={{ fontSize: 18, fontFamily: 'monospace', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: 4 }}>{f.raw}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', wordBreak: 'break-word' }}>{f.value === '*' ? 'any' : f.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Next runs */}
          {nextRuns.length > 0 && (
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>{t.nextRunsLabel}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {nextRuns.map((run, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'var(--bg-input)', borderRadius: 6, border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 700, minWidth: 20 }}>#{idx + 1}</span>
                    <span style={{ fontSize: 13, fontFamily: 'monospace' }}>{run}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Examples */}
      <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>{t.examplesLabel}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {EXAMPLES.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => loadExample(ex.cron)}
              style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', cursor: 'pointer', fontSize: 13, textAlign: 'left', color: 'var(--text-primary)' }}
            >
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-blue)', marginRight: 8 }}>{ex.cron}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{ex.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
