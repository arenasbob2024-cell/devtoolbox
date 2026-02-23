'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: { title: 'Python Formatter Online', subtitle: 'Format Python Code to PEP 8 Standards — Free', intro: 'A Python formatter automatically applies PEP 8 style guidelines to your code — fixing indentation, adding proper spacing around operators, and ensuring consistent formatting. This tool links to our Python code tools to help you write cleaner code.', whatIsPep8: 'What is PEP 8?', pep8Text: 'PEP 8 is Python\'s official style guide. It covers naming conventions, indentation (4 spaces), line length (79 chars max), import ordering, and whitespace usage. Following PEP 8 makes code more readable and maintainable.', keyRules: 'Key PEP 8 Rules', faq: 'FAQ', faq1q: 'Which Python formatter should I use?', faq1a: 'Black is the most popular — it\'s opinionated and fast. autopep8 is lighter and follows PEP 8 strictly. isort handles import sorting. For VS Code, install the Python extension with Black as the formatter.', faq2q: 'How do I run a Python formatter locally?', faq2a: 'Install Black: pip install black, then run: black your_file.py. For autopep8: pip install autopep8, then: autopep8 --in-place your_file.py', faq3q: 'Does Python formatting affect performance?', faq3a: 'No. Formatting only changes whitespace and style — the compiled bytecode is identical. Formatting is purely for human readability.', cta: 'Try Our Code Tools →', relatedTitle: 'Related Tools' },
  fr: { title: 'Formateur Python en Ligne', subtitle: 'Formatez le Code Python selon PEP 8 — Gratuit', intro: 'Un formateur Python applique automatiquement les directives de style PEP 8 à votre code.', whatIsPep8: 'Qu\'est-ce que PEP 8 ?', pep8Text: 'PEP 8 est le guide de style officiel de Python. Il couvre les conventions de nommage, l\'indentation et l\'espacement.', keyRules: 'Règles PEP 8 essentielles', faq: 'FAQ', faq1q: 'Quel formateur Python utiliser ?', faq1a: 'Black est le plus populaire — opinioné et rapide. autopep8 est plus léger et suit strictement PEP 8.', faq2q: 'Comment exécuter un formateur Python localement ?', faq2a: 'Installez Black : pip install black, puis : black votre_fichier.py', faq3q: 'Le formatage Python affecte-t-il les performances ?', faq3a: 'Non. Le formatage ne change que les espaces — le bytecode compilé est identique.', cta: 'Essayez Nos Outils →', relatedTitle: 'Outils associés' },
  de: { title: 'Python-Formatierer Online', subtitle: 'Python-Code nach PEP 8 formatieren — Kostenlos', intro: 'Ein Python-Formatierer wendet automatisch PEP 8-Stilrichtlinien auf Ihren Code an.', whatIsPep8: 'Was ist PEP 8?', pep8Text: 'PEP 8 ist Pythons offizieller Styleguide. Er umfasst Namenskonventionen, Einrückung und Abstand.', keyRules: 'Wichtige PEP 8-Regeln', faq: 'FAQ', faq1q: 'Welchen Python-Formatierer sollte ich verwenden?', faq1a: 'Black ist am beliebtesten — meinungsstark und schnell. autopep8 ist leichter und folgt strikt PEP 8.', faq2q: 'Wie führe ich einen Python-Formatierer lokal aus?', faq2a: 'Installieren Sie Black: pip install black, dann: black ihre_datei.py', faq3q: 'Beeinflusst Python-Formatierung die Leistung?', faq3a: 'Nein. Formatierung ändert nur Leerzeichen — der kompilierte Bytecode ist identisch.', cta: 'Unsere Tools ausprobieren →', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Formateador Python Online', subtitle: 'Formatee Código Python según PEP 8 — Gratis', intro: 'Un formateador Python aplica automáticamente las pautas de estilo PEP 8 a su código.', whatIsPep8: '¿Qué es PEP 8?', pep8Text: 'PEP 8 es la guía de estilo oficial de Python. Cubre convenciones de nomenclatura, indentación y espaciado.', keyRules: 'Reglas clave de PEP 8', faq: 'FAQ', faq1q: '¿Qué formateador Python debo usar?', faq1a: 'Black es el más popular — opinado y rápido. autopep8 es más ligero y sigue estrictamente PEP 8.', faq2q: '¿Cómo ejecuto un formateador Python localmente?', faq2a: 'Instale Black: pip install black, luego: black su_archivo.py', faq3q: '¿El formateo Python afecta el rendimiento?', faq3a: 'No. El formateo solo cambia espacios — el bytecode compilado es idéntico.', cta: 'Probar Nuestras Herramientas →', relatedTitle: 'Herramientas relacionadas' },
  it: { title: 'Formattatore Python Online', subtitle: 'Formatta il Codice Python secondo PEP 8 — Gratis', intro: 'Un formattatore Python applica automaticamente le linee guida di stile PEP 8 al tuo codice.', whatIsPep8: 'Cos\'è PEP 8?', pep8Text: 'PEP 8 è la guida di stile ufficiale di Python. Copre convenzioni di denominazione, indentazione e spaziatura.', keyRules: 'Regole chiave di PEP 8', faq: 'FAQ', faq1q: 'Quale formattatore Python usare?', faq1a: 'Black è il più popolare — supponente e veloce. autopep8 è più leggero e segue rigorosamente PEP 8.', faq2q: 'Come eseguo un formattatore Python localmente?', faq2a: 'Installa Black: pip install black, poi: black il_tuo_file.py', faq3q: 'La formattazione Python influisce sulle prestazioni?', faq3a: 'No. La formattazione cambia solo gli spazi — il bytecode compilato è identico.', cta: 'Prova i Nostri Strumenti →', relatedTitle: 'Strumenti correlati' },
  pt: { title: 'Formatador Python Online', subtitle: 'Formate Código Python segundo PEP 8 — Grátis', intro: 'Um formatador Python aplica automaticamente as diretrizes de estilo PEP 8 ao seu código.', whatIsPep8: 'O que é PEP 8?', pep8Text: 'PEP 8 é o guia de estilo oficial do Python. Cobre convenções de nomenclatura, indentação e espaçamento.', keyRules: 'Regras chave do PEP 8', faq: 'FAQ', faq1q: 'Qual formatador Python usar?', faq1a: 'Black é o mais popular — opinativo e rápido. autopep8 é mais leve e segue estritamente o PEP 8.', faq2q: 'Como executar um formatador Python localmente?', faq2a: 'Instale o Black: pip install black, depois: black seu_arquivo.py', faq3q: 'A formatação Python afeta o desempenho?', faq3a: 'Não. A formatação apenas muda espaços em branco — o bytecode compilado é idêntico.', cta: 'Experimente Nossas Ferramentas →', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'Python-Formatter Online', subtitle: 'Python-code formatteren naar PEP 8 — Gratis', intro: 'Een Python-formatter past automatisch PEP 8-stijlrichtlijnen toe op uw code.', whatIsPep8: 'Wat is PEP 8?', pep8Text: 'PEP 8 is de officiële stijlgids van Python. Het behandelt naamgevingsconventies, inspringing en spaties.', keyRules: 'Belangrijke PEP 8-regels', faq: 'FAQ', faq1q: 'Welke Python-formatter moet ik gebruiken?', faq1a: 'Black is het meest populair — eigenwijs en snel. autopep8 is lichter en volgt strikt PEP 8.', faq2q: 'Hoe voer ik een Python-formatter lokaal uit?', faq2a: 'Installeer Black: pip install black, dan: black uw_bestand.py', faq3q: 'Beïnvloedt Python-opmaak de prestaties?', faq3a: 'Nee. Opmaak verandert alleen witruimte — de gecompileerde bytecode is identiek.', cta: 'Probeer Onze Tools →', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Formater Python Online', subtitle: 'Formatuj Kod Python według PEP 8 — Bezpłatnie', intro: 'Formater Python automatycznie stosuje wytyczne stylu PEP 8 do Twojego kodu.', whatIsPep8: 'Co to jest PEP 8?', pep8Text: 'PEP 8 to oficjalny przewodnik stylu Pythona. Obejmuje konwencje nazewnictwa, wcięcia i odstępy.', keyRules: 'Kluczowe zasady PEP 8', faq: 'FAQ', faq1q: 'Jakiego formatera Python użyć?', faq1a: 'Black jest najpopularniejszy — opiniotwórczy i szybki. autopep8 jest lżejszy i ściśle stosuje PEP 8.', faq2q: 'Jak uruchomić formater Python lokalnie?', faq2a: 'Zainstaluj Black: pip install black, następnie: black twój_plik.py', faq3q: 'Czy formatowanie Python wpływa na wydajność?', faq3a: 'Nie. Formatowanie zmienia tylko białe znaki — skompilowany bytecode jest identyczny.', cta: 'Wypróbuj Nasze Narzędzia →', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'Python-Formaterare Online', subtitle: 'Formatera Python-kod enligt PEP 8 — Gratis', intro: 'En Python-formaterare tillämpar automatiskt PEP 8-stilriktlinjer på din kod.', whatIsPep8: 'Vad är PEP 8?', pep8Text: 'PEP 8 är Pythons officiella stilguide. Den täcker namnkonventioner, indragning och mellanrum.', keyRules: 'Viktiga PEP 8-regler', faq: 'FAQ', faq1q: 'Vilken Python-formaterare ska jag använda?', faq1a: 'Black är mest populär — egensinnig och snabb. autopep8 är lättare och följer strikt PEP 8.', faq2q: 'Hur kör jag en Python-formaterare lokalt?', faq2a: 'Installera Black: pip install black, sedan: black din_fil.py', faq3q: 'Påverkar Python-formatering prestandan?', faq3a: 'Nej. Formatering ändrar bara blanksteg — den kompilerade bytekoden är identisk.', cta: 'Prova Våra Verktyg →', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Python-Formater Online', subtitle: 'Formater Python-kode etter PEP 8 — Gratis', intro: 'En Python-formater anvender automatisk PEP 8-stilveiledninger på koden din.', whatIsPep8: 'Hva er PEP 8?', pep8Text: 'PEP 8 er Pythons offisielle stilguide. Den dekker navnekonvensjoner, innrykk og mellomrom.', keyRules: 'Viktige PEP 8-regler', faq: 'FAQ', faq1q: 'Hvilken Python-formater bør jeg bruke?', faq1a: 'Black er mest populær — meningssterk og rask. autopep8 er lettere og følger PEP 8 strengt.', faq2q: 'Hvordan kjører jeg en Python-formater lokalt?', faq2a: 'Installer Black: pip install black, deretter: black din_fil.py', faq3q: 'Påvirker Python-formatering ytelsen?', faq3a: 'Nei. Formatering endrer bare mellomrom — den kompilerte bytekoden er identisk.', cta: 'Prøv Verktøyene Våre →', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'Python格式化工具在线', subtitle: '按PEP 8标准格式化Python代码 — 免费', intro: 'Python格式化工具自动将PEP 8样式指南应用于您的代码。', whatIsPep8: '什么是PEP 8？', pep8Text: 'PEP 8是Python的官方样式指南，涵盖命名约定、缩进和间距。', keyRules: 'PEP 8核心规则', faq: '常见问题', faq1q: '应该使用哪种Python格式化工具？', faq1a: 'Black最受欢迎，固执且快速。autopep8更轻量级，严格遵循PEP 8。', faq2q: '如何在本地运行Python格式化工具？', faq2a: '安装Black：pip install black，然后运行：black 你的文件.py', faq3q: 'Python格式化会影响性能吗？', faq3a: '不会。格式化只改变空白，编译后的字节码完全相同。', cta: '试试我们的工具 →', relatedTitle: '相关工具' },
  ja: { title: 'Pythonフォーマッターオンライン', subtitle: 'PEP 8規格でPythonコードをフォーマット — 無料', intro: 'Pythonフォーマッターは自動的にPEP 8スタイルガイドラインをコードに適用します。', whatIsPep8: 'PEP 8とは？', pep8Text: 'PEP 8はPythonの公式スタイルガイドです。命名規則、インデント、スペースをカバーしています。', keyRules: '主なPEP 8ルール', faq: 'よくある質問', faq1q: 'どのPythonフォーマッターを使うべきですか？', faq1a: 'Blackが最も人気です。opinioatedで高速です。autopep8はより軽量でPEP 8に厳密に従います。', faq2q: 'ローカルでPythonフォーマッターを実行するには？', faq2a: 'Blackをインストール: pip install black、次に: black ファイル.py', faq3q: 'Pythonのフォーマットはパフォーマンスに影響しますか？', faq3a: 'いいえ。フォーマットは空白のみ変更し、コンパイルされたバイトコードは同一です。', cta: 'ツールを試す →', relatedTitle: '関連ツール' },
  ko: { title: '파이썬 포매터 온라인', subtitle: 'PEP 8 표준으로 파이썬 코드 포맷 — 무료', intro: '파이썬 포매터는 자동으로 PEP 8 스타일 가이드라인을 코드에 적용합니다.', whatIsPep8: 'PEP 8이란?', pep8Text: 'PEP 8은 파이썬의 공식 스타일 가이드입니다. 네이밍 규칙, 들여쓰기, 공백을 다룹니다.', keyRules: '주요 PEP 8 규칙', faq: 'FAQ', faq1q: '어떤 파이썬 포매터를 사용해야 하나요?', faq1a: 'Black이 가장 인기 있습니다 — 독자적이고 빠릅니다. autopep8은 더 가볍고 PEP 8을 엄격히 따릅니다.', faq2q: '로컬에서 파이썬 포매터를 실행하는 방법은?', faq2a: 'Black 설치: pip install black, 그런 다음: black 파일.py', faq3q: '파이썬 포맷팅이 성능에 영향을 미치나요?', faq3a: '아니요. 포맷팅은 공백만 변경하며 컴파일된 바이트코드는 동일합니다.', cta: '도구 사용해보기 →', relatedTitle: '관련 도구' },
  id: { title: 'Python Formatter Online', subtitle: 'Format Kode Python ke Standar PEP 8 — Gratis', intro: 'Python formatter secara otomatis menerapkan panduan gaya PEP 8 ke kode Anda.', whatIsPep8: 'Apa itu PEP 8?', pep8Text: 'PEP 8 adalah panduan gaya resmi Python. Ini mencakup konvensi penamaan, indentasi, dan spasi.', keyRules: 'Aturan kunci PEP 8', faq: 'FAQ', faq1q: 'Python formatter mana yang harus digunakan?', faq1a: 'Black paling populer — berpendapat dan cepat. autopep8 lebih ringan dan mengikuti PEP 8 dengan ketat.', faq2q: 'Bagaimana cara menjalankan Python formatter secara lokal?', faq2a: 'Instal Black: pip install black, kemudian: black file_anda.py', faq3q: 'Apakah pemformatan Python memengaruhi kinerja?', faq3a: 'Tidak. Pemformatan hanya mengubah spasi — bytecode yang dikompilasi identik.', cta: 'Coba Alat Kami →', relatedTitle: 'Alat terkait' },
  th: { title: 'Python Formatter ออนไลน์', subtitle: 'จัดรูปแบบโค้ด Python ตามมาตรฐาน PEP 8 — ฟรี', intro: 'Python formatter ใช้แนวทาง PEP 8 กับโค้ดของคุณโดยอัตโนมัติ', whatIsPep8: 'PEP 8 คืออะไร?', pep8Text: 'PEP 8 คือคู่มือสไตล์อย่างเป็นทางการของ Python ครอบคลุมการตั้งชื่อ การเยื้อง และช่องว่าง', keyRules: 'กฎ PEP 8 หลัก', faq: 'คำถามที่พบบ่อย', faq1q: 'ควรใช้ Python formatter ตัวไหน?', faq1a: 'Black เป็นที่นิยมมากที่สุด มีความเห็นและรวดเร็ว autopep8 เบากว่าและทำตาม PEP 8 อย่างเคร่งครัด', faq2q: 'วิธีรัน Python formatter ในเครื่อง?', faq2a: 'ติดตั้ง Black: pip install black จากนั้น: black ไฟล์.py', faq3q: 'การจัดรูปแบบ Python ส่งผลต่อประสิทธิภาพหรือไม่?', faq3a: 'ไม่ การจัดรูปแบบเปลี่ยนเฉพาะช่องว่าง bytecode ที่คอมไพล์แล้วเหมือนกัน', cta: 'ลองใช้เครื่องมือของเรา →', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const pep8Rules = [
  { rule: 'Indentation', desc: 'Use 4 spaces per indentation level (not tabs)' },
  { rule: 'Max Line Length', desc: '79 characters for code, 72 for docstrings' },
  { rule: 'Imports', desc: 'One import per line, grouped: stdlib, third-party, local' },
  { rule: 'Spaces', desc: 'Spaces around operators: x = 1 + 2 (not x=1+2)' },
  { rule: 'Blank Lines', desc: '2 blank lines before top-level functions/classes' },
  { rule: 'Naming', desc: 'snake_case for functions/variables, PascalCase for classes' },
  { rule: 'Docstrings', desc: 'Triple-quoted strings for all public modules/functions/classes' },
];

export default function PythonFormatterOnlinePage({ params }: { params: { lang: string } }) {
  const lang = params?.lang || 'en';
  const tr = t[lang] || t.en;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{tr.title}</h1>
      <p className="text-blue-600 font-medium mb-6">{tr.subtitle}</p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
        <p className="text-gray-700">{tr.intro}</p>
      </div>

      <div className="text-center mb-8">
        <a
          href={`/${lang}/tools/json-formatter`}
          className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md mr-4"
        >
          {tr.cta}
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.whatIsPep8}</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{tr.pep8Text}</p>

          <div className="mt-4 bg-gray-900 text-green-400 rounded-lg p-4 text-xs font-mono">
            <div className="text-gray-400 mb-2"># Bad (not PEP 8)</div>
            <div>{'def myFunction( x,y):'}</div>
            <div>{'  return x+y'}</div>
            <div className="mt-2 text-gray-400"># Good (PEP 8)</div>
            <div>{'def my_function(x, y):'}</div>
            <div>{'    return x + y'}</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Python Formatters</h2>
          <div className="space-y-3">
            {[
              { name: 'Black', desc: 'The "uncompromising" formatter — no configuration needed', cmd: 'pip install black && black .' },
              { name: 'autopep8', desc: 'Fixes PEP 8 violations, more conservative than Black', cmd: 'pip install autopep8 && autopep8 --in-place file.py' },
              { name: 'isort', desc: 'Sorts imports alphabetically and by section', cmd: 'pip install isort && isort .' },
              { name: 'ruff', desc: 'Extremely fast formatter written in Rust', cmd: 'pip install ruff && ruff format .' },
            ].map((tool) => (
              <div key={tool.name} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{tool.name}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{tool.desc}</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{tool.cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.keyRules}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pep8Rules.map((rule) => (
            <div key={rule.rule} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
              <div>
                <span className="font-semibold text-gray-900 text-sm">{rule.rule}: </span>
                <span className="text-gray-600 text-sm">{rule.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{tr.faq}</h2>
        <div className="space-y-4">
          {[
            { q: tr.faq1q, a: tr.faq1a },
            { q: tr.faq2q, a: tr.faq2a },
            { q: tr.faq3q, a: tr.faq3a },
          ].map((item, i) => (
            <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-600 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.relatedTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/sql-formatter`, label: 'SQL Formatter' },
            { href: `/${lang}/tools/javascript-minifier`, label: 'JS Minifier' },
            { href: `/${lang}/tools/html-formatter`, label: 'HTML Formatter' },
            { href: `/${lang}/tools/css-formatter`, label: 'CSS Formatter' },
            { href: `/${lang}/tools/yaml-validator`, label: 'YAML Validator' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-center p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-600 text-sm font-medium text-gray-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
