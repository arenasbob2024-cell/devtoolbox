'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON Minifier',
    description: 'Minify and compress JSON data online. Remove all whitespace, line breaks, and formatting to reduce file size. See original vs minified size comparison instantly.',
    inputLabel: 'JSON Input',
    inputPlaceholder: 'Paste your JSON here to minify...',
    outputLabel: 'Minified JSON',
    outputPlaceholder: 'Minified JSON will appear here...',
    minifyBtn: 'Minify',
    clear: 'Clear',
    loadSample: 'Load Sample',
    error: 'Error',
    originalSize: 'Original',
    minifiedSize: 'Minified',
    savings: 'Savings',
    introTitle: 'Online JSON Minifier & Compressor',
    introText: 'This free JSON minifier tool removes all unnecessary whitespace, line breaks, and indentation from your JSON data to produce the smallest possible output. Minifying JSON is essential for reducing payload size in API responses, configuration storage, and network transfers. Our JSON compressor shows you the exact size reduction so you can see how much bandwidth you are saving.',
    cheatTitle: 'JSON Size Optimization Tips',
    tipCol: 'Tip',
    descCol: 'Description',
    impactCol: 'Impact',
    tip1: 'Short key names',
    tip1Desc: 'Use abbreviated keys like "n" instead of "name"',
    tip1Impact: 'High',
    tip2: 'Remove null values',
    tip2Desc: 'Omit keys with null values when not needed',
    tip2Impact: 'Medium',
    tip3: 'Use arrays over objects',
    tip3Desc: 'Arrays with positional values skip key names',
    tip3Impact: 'High',
    tip4: 'Flat structure',
    tip4Desc: 'Flatten deeply nested objects when possible',
    tip4Impact: 'Medium',
    tip5: 'Number precision',
    tip5Desc: 'Remove unnecessary decimal places (3.10 -> 3.1)',
    tip5Impact: 'Low',
    tip6: 'Boolean as integers',
    tip6Desc: 'Use 0/1 instead of false/true (saves 3-4 chars each)',
    tip6Impact: 'Low',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Why minify JSON?',
    faq1a: 'Minifying JSON reduces file size by removing all unnecessary whitespace, indentation, and line breaks. This is important for production environments where smaller payloads mean faster network transfers, lower bandwidth costs, and quicker parsing. For example, a 10KB formatted JSON file might shrink to 6KB when minified, saving 40% in transfer size. This adds up significantly when serving millions of API requests.',
    faq2q: 'What is the difference between JSON minification and gzip compression?',
    faq2a: 'JSON minification removes whitespace and formatting characters from the JSON text itself, reducing the raw file size. Gzip compression is a separate step that applies a compression algorithm to the data for transfer. Both can be used together for maximum savings: first minify to remove whitespace, then gzip to compress the result. Gzip typically achieves 60-80% compression on JSON data, and minifying first makes gzip even more effective.',
    faq3q: 'How small can JSON get?',
    faq3a: 'The minimum JSON size depends on the data it represents. You cannot remove data values, but you can minimize overhead: use short key names, omit null values, prefer arrays over objects where possible, and remove unnecessary decimal precision. Combining minification with gzip compression, JSON payloads can typically be reduced to 20-30% of their original formatted size. For extreme optimization, consider binary formats like MessagePack or Protocol Buffers.',
    relatedTitle: 'Related JSON Tools',
  },
  zh: {
    title: 'JSON 压缩器',
    description: '在线压缩和精简 JSON 数据。移除所有空白、换行和格式化以减小文件大小。即时查看原始与压缩大小对比。',
    inputLabel: 'JSON 输入',
    inputPlaceholder: '在此粘贴要压缩的 JSON...',
    outputLabel: '压缩后的 JSON',
    outputPlaceholder: '压缩后的 JSON 将显示在此...',
    minifyBtn: '压缩',
    clear: '清除',
    loadSample: '加载示例',
    error: '错误',
    originalSize: '原始大小',
    minifiedSize: '压缩后',
    savings: '节省',
    introTitle: '在线 JSON 压缩和精简工具',
    introText: '这个免费的 JSON 压缩工具可以移除所有不必要的空白、换行和缩进，生成最小的输出。压缩 JSON 对于减少 API 响应大小、配置存储和网络传输至关重要。',
    cheatTitle: 'JSON 大小优化技巧',
    tipCol: '技巧',
    descCol: '说明',
    impactCol: '影响',
    tip1: '短键名', tip1Desc: '使用缩写键名，如 "n" 代替 "name"', tip1Impact: '高',
    tip2: '移除 null 值', tip2Desc: '不需要时省略 null 值的键', tip2Impact: '中',
    tip3: '使用数组替代对象', tip3Desc: '位置值的数组可跳过键名', tip3Impact: '高',
    tip4: '扁平化结构', tip4Desc: '尽可能扁平化深层嵌套对象', tip4Impact: '中',
    tip5: '数字精度', tip5Desc: '移除不必要的小数位（3.10 -> 3.1）', tip5Impact: '低',
    tip6: '布尔值用整数', tip6Desc: '用 0/1 代替 false/true（每个节省 3-4 字符）', tip6Impact: '低',
    faqTitle: '常见问题',
    faq1q: '为什么要压缩 JSON？',
    faq1a: '压缩 JSON 通过移除所有不必要的空白、缩进和换行来减小文件大小。在生产环境中，更小的负载意味着更快的网络传输、更低的带宽成本和更快的解析速度。',
    faq2q: 'JSON 压缩和 gzip 压缩有什么区别？',
    faq2a: 'JSON 压缩移除文本中的空白和格式字符。Gzip 是对数据应用压缩算法的独立步骤。两者可以组合使用：先压缩移除空白，再 gzip 压缩结果。',
    faq3q: 'JSON 能压缩到多小？',
    faq3a: '最小 JSON 大小取决于数据本身。可以使用短键名、省略 null 值、优先使用数组等方式最小化开销。结合 gzip，JSON 通常可以减少到原始大小的 20-30%。',
    relatedTitle: '相关 JSON 工具',
  },
  fr: {
    title: 'Minificateur JSON',
    description: 'Minifiez et compressez des donnees JSON en ligne. Supprimez tous les espaces et le formatage pour reduire la taille. Comparaison taille originale vs minifiee.',
    inputLabel: 'Entree JSON',
    inputPlaceholder: 'Collez votre JSON ici pour minifier...',
    outputLabel: 'JSON minifie',
    outputPlaceholder: 'Le JSON minifie apparaitra ici...',
    minifyBtn: 'Minifier',
    clear: 'Effacer',
    loadSample: 'Charger un exemple',
    error: 'Erreur',
    originalSize: 'Original',
    minifiedSize: 'Minifie',
    savings: 'Economie',
    introTitle: 'Minificateur et compresseur JSON en ligne',
    introText: 'Cet outil gratuit supprime tous les espaces, sauts de ligne et indentation inutiles de vos donnees JSON. Essentiel pour reduire la taille des payloads API et des transferts reseau.',
    cheatTitle: 'Conseils d\'optimisation de taille JSON',
    tipCol: 'Conseil', descCol: 'Description', impactCol: 'Impact',
    tip1: 'Noms de cles courts', tip1Desc: 'Utilisez des abreviations pour les cles', tip1Impact: 'Eleve',
    tip2: 'Supprimer les nulls', tip2Desc: 'Omettez les cles avec valeurs null', tip2Impact: 'Moyen',
    tip3: 'Tableaux vs objets', tip3Desc: 'Les tableaux positionnels evitent les noms de cles', tip3Impact: 'Eleve',
    tip4: 'Structure plate', tip4Desc: 'Aplatissez les objets profondement imbriques', tip4Impact: 'Moyen',
    tip5: 'Precision numerique', tip5Desc: 'Supprimez les decimales inutiles', tip5Impact: 'Faible',
    tip6: 'Booleens en entiers', tip6Desc: 'Utilisez 0/1 au lieu de false/true', tip6Impact: 'Faible',
    faqTitle: 'Questions frequentes',
    faq1q: 'Pourquoi minifier le JSON ?', faq1a: 'La minification reduit la taille en supprimant les espaces inutiles, important pour la production avec des transferts plus rapides et des couts de bande passante reduits.',
    faq2q: 'Difference entre minification JSON et compression gzip ?', faq2a: 'La minification supprime les espaces du texte. Gzip applique un algorithme de compression. Les deux peuvent etre combines pour des economies maximales.',
    faq3q: 'Jusqu\'ou peut-on reduire le JSON ?', faq3a: 'Cela depend des donnees. Avec des cles courtes, pas de nulls, et gzip, le JSON peut etre reduit a 20-30% de sa taille originale.',
    relatedTitle: 'Outils JSON connexes',
  },
  de: {
    title: 'JSON Minifier',
    description: 'JSON-Daten online minifizieren und komprimieren. Alle Leerzeichen und Formatierung entfernen um die Dateigroesse zu reduzieren. Groessenvergleich sofort sehen.',
    inputLabel: 'JSON-Eingabe',
    inputPlaceholder: 'JSON hier einfuegen zum Minifizieren...',
    outputLabel: 'Minifiziertes JSON',
    outputPlaceholder: 'Minifiziertes JSON erscheint hier...',
    minifyBtn: 'Minifizieren',
    clear: 'Loeschen',
    loadSample: 'Beispiel laden',
    error: 'Fehler',
    originalSize: 'Original',
    minifiedSize: 'Minifiziert',
    savings: 'Ersparnis',
    introTitle: 'Online JSON Minifier & Kompressor',
    introText: 'Dieses kostenlose Tool entfernt alle unnoeigen Leerzeichen, Zeilenumbrueche und Einrueckungen. Wichtig fuer die Reduzierung von API-Payload-Groessen und Netzwerktransfers.',
    cheatTitle: 'JSON-Groessenoptimierungstipps',
    tipCol: 'Tipp', descCol: 'Beschreibung', impactCol: 'Wirkung',
    tip1: 'Kurze Schluesselnamen', tip1Desc: 'Abgekuerzte Schluessel verwenden', tip1Impact: 'Hoch',
    tip2: 'Null-Werte entfernen', tip2Desc: 'Schluessel mit null-Werten weglassen', tip2Impact: 'Mittel',
    tip3: 'Arrays statt Objekte', tip3Desc: 'Arrays mit Positionswerten sparen Schluesselnamen', tip3Impact: 'Hoch',
    tip4: 'Flache Struktur', tip4Desc: 'Tief verschachtelte Objekte abflachen', tip4Impact: 'Mittel',
    tip5: 'Zahlenpraezision', tip5Desc: 'Unnoetige Dezimalstellen entfernen', tip5Impact: 'Gering',
    tip6: 'Booleans als Integer', tip6Desc: '0/1 statt false/true verwenden', tip6Impact: 'Gering',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Warum JSON minifizieren?', faq1a: 'Minifizierung reduziert die Groesse durch Entfernen unnoeiger Leerzeichen. Wichtig fuer Produktion mit schnelleren Transfers und geringeren Bandbreitenkosten.',
    faq2q: 'Unterschied zwischen JSON-Minifizierung und gzip?', faq2a: 'Minifizierung entfernt Leerzeichen aus dem Text. Gzip wendet einen Kompressionsalgorithmus an. Beide koennen kombiniert werden.',
    faq3q: 'Wie klein kann JSON werden?', faq3a: 'Haengt von den Daten ab. Mit kurzen Schluesseln, ohne Nulls und mit gzip kann JSON auf 20-30% der Originalgroesse reduziert werden.',
    relatedTitle: 'Verwandte JSON-Tools',
  },
  es: {
    title: 'Minificador JSON',
    description: 'Minifica y comprime datos JSON en linea. Elimina todos los espacios y el formato para reducir el tamano. Ve la comparacion de tamano original vs minificado.',
    inputLabel: 'Entrada JSON',
    inputPlaceholder: 'Pega tu JSON aqui para minificar...',
    outputLabel: 'JSON minificado',
    outputPlaceholder: 'El JSON minificado aparecera aqui...',
    minifyBtn: 'Minificar',
    clear: 'Limpiar',
    loadSample: 'Cargar ejemplo',
    error: 'Error',
    originalSize: 'Original',
    minifiedSize: 'Minificado',
    savings: 'Ahorro',
    introTitle: 'Minificador y compresor JSON en linea',
    introText: 'Esta herramienta gratuita elimina todos los espacios, saltos de linea e indentacion innecesarios. Esencial para reducir el tamano de payloads API y transferencias de red.',
    cheatTitle: 'Consejos de optimizacion de tamano JSON',
    tipCol: 'Consejo', descCol: 'Descripcion', impactCol: 'Impacto',
    tip1: 'Nombres de clave cortos', tip1Desc: 'Usar abreviaturas para las claves', tip1Impact: 'Alto',
    tip2: 'Eliminar valores null', tip2Desc: 'Omitir claves con valores null', tip2Impact: 'Medio',
    tip3: 'Arrays vs objetos', tip3Desc: 'Arrays posicionales ahorran nombres de clave', tip3Impact: 'Alto',
    tip4: 'Estructura plana', tip4Desc: 'Aplanar objetos profundamente anidados', tip4Impact: 'Medio',
    tip5: 'Precision numerica', tip5Desc: 'Eliminar decimales innecesarios', tip5Impact: 'Bajo',
    tip6: 'Booleanos como enteros', tip6Desc: 'Usar 0/1 en vez de false/true', tip6Impact: 'Bajo',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Por que minificar JSON?', faq1a: 'La minificacion reduce el tamano eliminando espacios innecesarios. Importante para produccion con transferencias mas rapidas y menores costos de ancho de banda.',
    faq2q: 'Diferencia entre minificacion JSON y compresion gzip?', faq2a: 'La minificacion elimina espacios del texto. Gzip aplica un algoritmo de compresion. Ambos pueden combinarse para maximo ahorro.',
    faq3q: 'Que tan pequeno puede ser el JSON?', faq3a: 'Depende de los datos. Con claves cortas, sin nulls y con gzip, el JSON puede reducirse al 20-30% del tamano original.',
    relatedTitle: 'Herramientas JSON relacionadas',
  },
  ja: {
    title: 'JSON 圧縮ツール',
    description: 'JSON データをオンラインで圧縮・ミニファイ。すべての空白、改行、フォーマットを削除してファイルサイズを削減。元のサイズと圧縮後のサイズを即座に比較。',
    inputLabel: 'JSON 入力',
    inputPlaceholder: '圧縮する JSON をここに貼り付け...',
    outputLabel: '圧縮された JSON',
    outputPlaceholder: '圧縮された JSON がここに表示されます...',
    minifyBtn: '圧縮',
    clear: 'クリア',
    loadSample: 'サンプル読込',
    error: 'エラー',
    originalSize: '元のサイズ',
    minifiedSize: '圧縮後',
    savings: '節約',
    introTitle: 'オンライン JSON 圧縮ツール',
    introText: 'この無料ツールで不要な空白、改行、インデントをすべて削除して最小の出力を生成。API レスポンスサイズの削減やネットワーク転送に不可欠です。',
    cheatTitle: 'JSON サイズ最適化のヒント',
    tipCol: 'ヒント', descCol: '説明', impactCol: '効果',
    tip1: '短いキー名', tip1Desc: 'キーの略称を使用', tip1Impact: '高',
    tip2: 'null 値の削除', tip2Desc: '不要な null 値のキーを省略', tip2Impact: '中',
    tip3: 'オブジェクトより配列', tip3Desc: '位置値の配列はキー名を省略', tip3Impact: '高',
    tip4: 'フラット構造', tip4Desc: '深いネストをフラット化', tip4Impact: '中',
    tip5: '数値精度', tip5Desc: '不要な小数点以下を削除', tip5Impact: '低',
    tip6: 'ブール値を整数に', tip6Desc: 'false/true の代わりに 0/1', tip6Impact: '低',
    faqTitle: 'よくある質問',
    faq1q: 'なぜ JSON を圧縮するのか？', faq1a: '圧縮は不要な空白を削除してサイズを縮小します。本番環境での高速転送と低帯域幅コストに重要です。',
    faq2q: 'JSON 圧縮と gzip 圧縮の違いは？', faq2a: 'JSON 圧縮はテキストから空白を削除。gzip は圧縮アルゴリズムを適用。両方を組み合わせて最大の節約が可能です。',
    faq3q: 'JSON はどこまで小さくできる？', faq3a: 'データに依存します。短いキー、null なし、gzip と組み合わせて、元のサイズの 20-30% まで削減可能です。',
    relatedTitle: '関連 JSON ツール',
  },
  ko: {
    title: 'JSON 압축기',
    description: 'JSON 데이터를 온라인에서 압축하세요. 모든 공백, 줄바꿈, 포맷을 제거하여 파일 크기를 줄입니다. 원본 대 압축 크기 비교를 즉시 확인하세요.',
    inputLabel: 'JSON 입력',
    inputPlaceholder: '압축할 JSON을 여기에 붙여넣기...',
    outputLabel: '압축된 JSON',
    outputPlaceholder: '압축된 JSON이 여기에 표시됩니다...',
    minifyBtn: '압축',
    clear: '지우기',
    loadSample: '샘플 로드',
    error: '오류',
    originalSize: '원본',
    minifiedSize: '압축 후',
    savings: '절감',
    introTitle: '온라인 JSON 압축 도구',
    introText: '이 무료 도구로 불필요한 공백, 줄바꿈, 들여쓰기를 모두 제거하여 최소 출력을 생성합니다. API 응답 크기 감소와 네트워크 전송에 필수적입니다.',
    cheatTitle: 'JSON 크기 최적화 팁',
    tipCol: '팁', descCol: '설명', impactCol: '효과',
    tip1: '짧은 키 이름', tip1Desc: '키에 약어 사용', tip1Impact: '높음',
    tip2: 'null 값 제거', tip2Desc: '불필요한 null 값 키 생략', tip2Impact: '중간',
    tip3: '객체 대신 배열', tip3Desc: '위치 값 배열은 키 이름 생략', tip3Impact: '높음',
    tip4: '평탄한 구조', tip4Desc: '깊은 중첩을 평탄화', tip4Impact: '중간',
    tip5: '숫자 정밀도', tip5Desc: '불필요한 소수점 제거', tip5Impact: '낮음',
    tip6: '불리언을 정수로', tip6Desc: 'false/true 대신 0/1 사용', tip6Impact: '낮음',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON을 왜 압축하나요?', faq1a: '압축은 불필요한 공백을 제거하여 크기를 줄입니다. 프로덕션 환경에서 빠른 전송과 낮은 대역폭 비용에 중요합니다.',
    faq2q: 'JSON 압축과 gzip 압축의 차이점은?', faq2a: 'JSON 압축은 텍스트에서 공백을 제거합니다. gzip은 압축 알고리즘을 적용합니다. 둘을 결합하면 최대 절감이 가능합니다.',
    faq3q: 'JSON은 얼마나 작아질 수 있나요?', faq3a: '데이터에 따라 다릅니다. 짧은 키, null 없이, gzip과 결합하면 원본 크기의 20-30%까지 줄일 수 있습니다.',
    relatedTitle: '관련 JSON 도구',
  },
};

export default function JsonMinifier() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [sizeInfo, setSizeInfo] = useState<{ original: number; minified: number } | null>(null);

  const minify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      setSizeInfo({
        original: new Blob([input]).size,
        minified: new Blob([minified]).size,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
      setSizeInfo(null);
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      name: "DevToolBox",
      version: "2.0.0",
      description: "Free online developer tools",
      features: [
        "JSON Minifier",
        "JSON Beautifier",
        "JSON Validator"
      ],
      config: {
        theme: "dark",
        language: "en",
        notifications: true,
        debug: false
      },
      stats: {
        users: 15000,
        tools: 106,
        languages: 15
      },
      active: true
    }, null, 2));
    setOutput('');
    setError('');
    setSizeInfo(null);
  };

  const savingsPercent = sizeInfo
    ? Math.round(((sizeInfo.original - sizeInfo.minified) / sizeInfo.original) * 100)
    : 0;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="json-minifier">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={minify} className="btn btn-primary">{t.minifyBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); setSizeInfo(null); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          {t.error}: {error}
        </div>
      )}

      {/* Size Comparison */}
      {sizeInfo && (
        <div style={{
          display: 'flex',
          gap: 16,
          padding: '12px 16px',
          marginBottom: 16,
          background: 'rgba(34, 197, 94, 0.08)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
          borderRadius: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.originalSize}:</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{sizeInfo.original.toLocaleString()} B</span>
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: 16 }}>&#8594;</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.minifiedSize}:</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-emerald)' }}>{sizeInfo.minified.toLocaleString()} B</span>
          </div>
          <div style={{
            marginLeft: 'auto',
            background: 'rgba(34, 197, 94, 0.15)',
            borderRadius: 6,
            padding: '4px 12px',
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--accent-emerald)',
          }}>
            {t.savings}: {savingsPercent}%
          </div>
        </div>
      )}

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder}
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder}
            style={{ minHeight: 350, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      {/* Intro / SEO paragraph */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        {/* Cheat Sheet Table */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.cheatTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.tipCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.descCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.impactCol}</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t.tip1, t.tip1Desc, t.tip1Impact],
                [t.tip2, t.tip2Desc, t.tip2Impact],
                [t.tip3, t.tip3Desc, t.tip3Impact],
                [t.tip4, t.tip4Desc, t.tip4Impact],
                [t.tip5, t.tip5Desc, t.tip5Impact],
                [t.tip6, t.tip6Desc, t.tip6Impact],
              ].map(([tip, desc, impact], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{tip}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: impact === 'High' || impact === 'Hoch' || impact === 'Eleve' || impact === 'Alto' || impact === '高' || impact === '높음'
                        ? 'rgba(34, 197, 94, 0.15)'
                        : impact === 'Low' || impact === 'Gering' || impact === 'Faible' || impact === 'Bajo' || impact === '低' || impact === '낮음'
                          ? 'rgba(244, 63, 94, 0.1)'
                          : 'rgba(59, 130, 246, 0.1)',
                      color: impact === 'High' || impact === 'Hoch' || impact === 'Eleve' || impact === 'Alto' || impact === '高' || impact === '높음'
                        ? 'var(--accent-emerald)'
                        : impact === 'Low' || impact === 'Gering' || impact === 'Faible' || impact === 'Bajo' || impact === '低' || impact === '낮음'
                          ? 'var(--accent-rose)'
                          : 'var(--accent-blue)',
                    }}>
                      {impact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        {/* Related Tools */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-beautifier`, label: 'JSON Beautifier' },
            { href: `/${lang}/tools/json-validator`, label: 'JSON Validator' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                fontSize: 13,
                color: 'var(--accent-blue)',
                textDecoration: 'none',
                background: 'var(--bg-input)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
