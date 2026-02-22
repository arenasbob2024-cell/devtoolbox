'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: { title: 'CSV to JSON Online Converter', description: 'Convert CSV data to JSON array format instantly. Free, private, browser-based tool with no server required.', inputLabel: 'Input (CSV)', outputLabel: 'Output (JSON)', placeholder: 'Paste CSV data here...\n\nExample:\nname,age,city\nAlice,30,New York\nBob,25,London', convert: 'Convert to JSON', clear: 'Clear', copyLabel: 'Copy', introTitle: 'Free Online CSV to JSON Converter', introText: 'Paste your CSV data and instantly convert it to a JSON array of objects. The first row is used as field names (keys), and each subsequent row becomes a JSON object. Perfect for importing CSV data into JavaScript applications, APIs, or databases.', howTitle: 'How to Use', step1: 'Paste your CSV data with headers in the first row', step2: 'Click Convert to JSON to transform into a JSON array', step3: 'Copy the JSON output for your application', featuresTitle: 'Features', feature1: 'Auto-detects comma, semicolon, and tab delimiters', feature2: 'Handles quoted fields with commas and newlines', feature3: 'Numbers are automatically parsed as JSON numbers', feature4: 'Empty fields become null values in JSON', feature5: 'All processing in your browser - no data sent anywhere', faqTitle: 'FAQ', faq1q: 'What CSV formats are supported?', faq1a: 'The tool supports standard CSV with comma, semicolon, or tab delimiters. It auto-detects the delimiter from your data. Quoted fields (with commas or newlines inside) are handled correctly.', faq2q: 'How are data types handled?', faq2a: 'The converter automatically detects numbers and converts them to JSON number types. Boolean values (true/false) are also detected. Everything else is treated as a string.', faq3q: 'What happens with empty fields?', faq3a: 'Empty fields in your CSV are converted to null values in the JSON output, which is the standard way to represent missing data in JSON.', faq4q: 'Is my CSV data safe?', faq4a: 'Yes. All conversion happens entirely in your browser using JavaScript. No data is transmitted to any server. Your CSV data never leaves your device.', faq5q: 'Can it handle large CSV files?', faq5a: 'Yes. The tool can handle CSV files with thousands of rows. Performance depends on your browser memory and the size of the data.', relatedTitle: 'Related Tools', errorEmpty: 'Please enter CSV data to convert.', errorParse: 'Could not parse CSV. Check your data format.' },
  zh: { title: 'CSV 转 JSON 在线工具', description: '将 CSV 数据转换为 JSON 数组。免费、私密、浏览器内运行。', inputLabel: '输入 (CSV)', outputLabel: '输出 (JSON)', placeholder: '粘贴 CSV 数据...\n\n示例:\nname,age,city\nAlice,30,New York', convert: '转换', clear: '清除', copyLabel: '复制', introTitle: 'CSV 转 JSON 转换器', introText: '粘贴 CSV 数据，即时转换为 JSON 对象数组。', howTitle: '使用方法', step1: '粘贴包含表头的 CSV', step2: '点击转换', step3: '复制 JSON 输出', featuresTitle: '功能', feature1: '自动检测分隔符', feature2: '处理引号字段', feature3: '数字自动解析', feature4: '空字段转为 null', feature5: '浏览器内处理', faqTitle: '常见问题', faq1q: '支持什么 CSV 格式？', faq1a: '支持逗号、分号、制表符分隔。', faq2q: '如何处理数据类型？', faq2a: '自动检测数字和布尔值。', faq3q: '空字段怎么处理？', faq3a: '转换为 JSON 的 null 值。', faq4q: '数据安全吗？', faq4a: '完全在浏览器内处理。', faq5q: '能处理大文件吗？', faq5a: '可以处理数千行数据。', relatedTitle: '相关工具', errorEmpty: '请输入 CSV 数据。', errorParse: '无法解析 CSV。' },
  ja: { title: 'CSV to JSON 変換', description: 'CSV を JSON 配列に変換。無料、ブラウザ内。', inputLabel: '入力 (CSV)', outputLabel: '出力 (JSON)', placeholder: 'CSV を貼り付け...', convert: '変換', clear: 'クリア', copyLabel: 'コピー', introTitle: 'CSV to JSON 変換ツール', introText: 'CSV データを JSON オブジェクト配列に変換。', howTitle: '使い方', step1: 'ヘッダー付き CSV を貼り付け', step2: '変換をクリック', step3: 'JSON をコピー', featuresTitle: '機能', feature1: '区切り文字自動検出', feature2: '引用符フィールド対応', feature3: '数値自動解析', feature4: '空フィールドは null', feature5: 'ブラウザ内処理', faqTitle: 'FAQ', faq1q: 'どの CSV 形式？', faq1a: 'カンマ、セミコロン、タブ対応。', faq2q: 'データ型は？', faq2a: '数値とブール値を自動検出。', faq3q: '空フィールドは？', faq3a: 'null に変換。', faq4q: 'データは安全？', faq4a: 'ブラウザ内処理。', faq5q: '大きなファイルは？', faq5a: '数千行対応。', relatedTitle: '関連ツール', errorEmpty: 'CSV を入力。', errorParse: 'CSV を解析できません。' },
  ko: { title: 'CSV to JSON 변환기', description: 'CSV를 JSON 배열로 변환. 무료, 브라우저 내.', inputLabel: '입력 (CSV)', outputLabel: '출력 (JSON)', placeholder: 'CSV 붙여넣기...', convert: '변환', clear: '지우기', copyLabel: '복사', introTitle: 'CSV to JSON 변환기', introText: 'CSV 데이터를 JSON 객체 배열로 변환.', howTitle: '사용법', step1: '헤더가 있는 CSV 붙여넣기', step2: '변환 클릭', step3: 'JSON 복사', featuresTitle: '기능', feature1: '구분자 자동 감지', feature2: '인용 필드 처리', feature3: '숫자 자동 파싱', feature4: '빈 필드는 null', feature5: '브라우저 내 처리', faqTitle: 'FAQ', faq1q: '어떤 CSV 형식?', faq1a: '쉼표, 세미콜론, 탭 지원.', faq2q: '데이터 유형은?', faq2a: '숫자와 불리언 자동 감지.', faq3q: '빈 필드는?', faq3a: 'null로 변환.', faq4q: '데이터 안전?', faq4a: '브라우저 내 처리.', faq5q: '큰 파일?', faq5a: '수천 행 지원.', relatedTitle: '관련 도구', errorEmpty: 'CSV 입력.', errorParse: 'CSV를 파싱할 수 없습니다.' },
  fr: { title: 'Convertisseur CSV vers JSON', description: 'Convertir CSV en JSON. Gratuit, dans le navigateur.', inputLabel: 'Entree (CSV)', outputLabel: 'Sortie (JSON)', placeholder: 'Collez du CSV...', convert: 'Convertir', clear: 'Effacer', copyLabel: 'Copier', introTitle: 'Convertisseur CSV vers JSON', introText: 'Collez vos donnees CSV et convertissez en tableau JSON.', howTitle: 'Comment utiliser', step1: 'Collez le CSV avec en-tetes', step2: 'Cliquez Convertir', step3: 'Copiez le JSON', featuresTitle: 'Fonctionnalites', feature1: 'Detection automatique du delimiteur', feature2: 'Champs entre guillemets', feature3: 'Nombres detectes automatiquement', feature4: 'Champs vides en null', feature5: 'Traitement local', faqTitle: 'FAQ', faq1q: 'Quels formats CSV ?', faq1a: 'Virgule, point-virgule, tabulation.', faq2q: 'Types de donnees ?', faq2a: 'Nombres et booleens detectes.', faq3q: 'Champs vides ?', faq3a: 'Convertis en null.', faq4q: 'Donnees securisees ?', faq4a: 'Tout dans le navigateur.', faq5q: 'Gros fichiers ?', faq5a: 'Des milliers de lignes.', relatedTitle: 'Outils connexes', errorEmpty: 'Entrez du CSV.', errorParse: 'Impossible de parser le CSV.' },
  de: { title: 'CSV zu JSON Konverter', description: 'CSV in JSON umwandeln. Kostenlos, im Browser.', inputLabel: 'Eingabe (CSV)', outputLabel: 'Ausgabe (JSON)', placeholder: 'CSV einfuegen...', convert: 'Konvertieren', clear: 'Leeren', copyLabel: 'Kopieren', introTitle: 'CSV zu JSON Konverter', introText: 'CSV-Daten einfuegen und in JSON-Array umwandeln.', howTitle: 'Anleitung', step1: 'CSV mit Kopfzeile einfuegen', step2: 'Konvertieren klicken', step3: 'JSON kopieren', featuresTitle: 'Funktionen', feature1: 'Automatische Trennzeichen-Erkennung', feature2: 'Felder in Anfuehrungszeichen', feature3: 'Zahlen automatisch erkannt', feature4: 'Leere Felder als null', feature5: 'Lokale Verarbeitung', faqTitle: 'FAQ', faq1q: 'Welche CSV-Formate?', faq1a: 'Komma, Semikolon, Tab.', faq2q: 'Datentypen?', faq2a: 'Zahlen und Boolesche automatisch.', faq3q: 'Leere Felder?', faq3a: 'Werden zu null.', faq4q: 'Daten sicher?', faq4a: 'Im Browser.', faq5q: 'Grosse Dateien?', faq5a: 'Tausende Zeilen.', relatedTitle: 'Verwandte Tools', errorEmpty: 'CSV eingeben.', errorParse: 'CSV konnte nicht geparst werden.' },
  es: { title: 'Convertidor CSV a JSON', description: 'Convertir CSV a JSON. Gratis, en el navegador.', inputLabel: 'Entrada (CSV)', outputLabel: 'Salida (JSON)', placeholder: 'Pega CSV...', convert: 'Convertir', clear: 'Limpiar', copyLabel: 'Copiar', introTitle: 'Convertidor CSV a JSON', introText: 'Pega datos CSV y conviertelos a un array JSON.', howTitle: 'Como usar', step1: 'Pega CSV con encabezados', step2: 'Clic en Convertir', step3: 'Copia el JSON', featuresTitle: 'Caracteristicas', feature1: 'Deteccion automatica de delimitador', feature2: 'Campos entrecomillados', feature3: 'Numeros detectados automaticamente', feature4: 'Campos vacios como null', feature5: 'Procesamiento local', faqTitle: 'FAQ', faq1q: 'Que formatos CSV?', faq1a: 'Coma, punto y coma, tabulador.', faq2q: 'Tipos de datos?', faq2a: 'Numeros y booleanos detectados.', faq3q: 'Campos vacios?', faq3a: 'Convertidos a null.', faq4q: 'Datos seguros?', faq4a: 'En el navegador.', faq5q: 'Archivos grandes?', faq5a: 'Miles de filas.', relatedTitle: 'Herramientas relacionadas', errorEmpty: 'Ingresa CSV.', errorParse: 'No se pudo parsear el CSV.' },
  pt: { title: 'Conversor CSV para JSON', description: 'Converter CSV em JSON. Gratis, no navegador.', inputLabel: 'Entrada (CSV)', outputLabel: 'Saida (JSON)', placeholder: 'Cole CSV...', convert: 'Converter', clear: 'Limpar', copyLabel: 'Copiar', introTitle: 'Conversor CSV para JSON', introText: 'Cole dados CSV e converta para array JSON.', howTitle: 'Como usar', step1: 'Cole CSV com cabecalhos', step2: 'Clique Converter', step3: 'Copie o JSON', featuresTitle: 'Recursos', feature1: 'Deteccao automatica de delimitador', feature2: 'Campos entre aspas', feature3: 'Numeros detectados', feature4: 'Campos vazios como null', feature5: 'Processamento local', faqTitle: 'FAQ', faq1q: 'Quais formatos CSV?', faq1a: 'Virgula, ponto e virgula, tabulacao.', faq2q: 'Tipos de dados?', faq2a: 'Numeros e booleanos detectados.', faq3q: 'Campos vazios?', faq3a: 'Convertidos para null.', faq4q: 'Dados seguros?', faq4a: 'No navegador.', faq5q: 'Arquivos grandes?', faq5a: 'Milhares de linhas.', relatedTitle: 'Ferramentas relacionadas', errorEmpty: 'Insira CSV.', errorParse: 'Nao foi possivel parsear o CSV.' },
  it: { title: 'Convertitore CSV a JSON', description: 'Convertire CSV in JSON. Gratuito, nel browser.', inputLabel: 'Input (CSV)', outputLabel: 'Output (JSON)', placeholder: 'Incolla CSV...', convert: 'Converti', clear: 'Cancella', copyLabel: 'Copia', introTitle: 'Convertitore CSV a JSON', introText: 'Incolla dati CSV e convertili in array JSON.', howTitle: 'Come usare', step1: 'Incolla CSV con intestazioni', step2: 'Clicca Converti', step3: 'Copia il JSON', featuresTitle: 'Funzionalita', feature1: 'Rilevamento automatico delimitatore', feature2: 'Campi tra virgolette', feature3: 'Numeri rilevati', feature4: 'Campi vuoti come null', feature5: 'Elaborazione locale', faqTitle: 'FAQ', faq1q: 'Quali formati CSV?', faq1a: 'Virgola, punto e virgola, tab.', faq2q: 'Tipi di dati?', faq2a: 'Numeri e booleani rilevati.', faq3q: 'Campi vuoti?', faq3a: 'Convertiti in null.', faq4q: 'Dati sicuri?', faq4a: 'Nel browser.', faq5q: 'File grandi?', faq5a: 'Migliaia di righe.', relatedTitle: 'Strumenti correlati', errorEmpty: 'Inserisci CSV.', errorParse: 'Impossibile parsare il CSV.' },
  nl: { title: 'CSV naar JSON Converter', description: 'CSV naar JSON omzetten. Gratis, in de browser.', inputLabel: 'Invoer (CSV)', outputLabel: 'Uitvoer (JSON)', placeholder: 'Plak CSV...', convert: 'Converteren', clear: 'Wissen', copyLabel: 'Kopieren', introTitle: 'CSV naar JSON Converter', introText: 'Plak CSV-data en converteer naar JSON-array.', howTitle: 'Hoe te gebruiken', step1: 'Plak CSV met koppen', step2: 'Klik Converteren', step3: 'Kopieer JSON', featuresTitle: 'Functies', feature1: 'Automatische scheidingsteken-detectie', feature2: 'Velden tussen aanhalingstekens', feature3: 'Getallen automatisch', feature4: 'Lege velden als null', feature5: 'Lokale verwerking', faqTitle: 'FAQ', faq1q: 'Welke CSV-formaten?', faq1a: 'Komma, puntkomma, tab.', faq2q: 'Datatypes?', faq2a: 'Getallen en booleans automatisch.', faq3q: 'Lege velden?', faq3a: 'Worden null.', faq4q: 'Data veilig?', faq4a: 'In de browser.', faq5q: 'Grote bestanden?', faq5a: 'Duizenden rijen.', relatedTitle: 'Gerelateerde tools', errorEmpty: 'Voer CSV in.', errorParse: 'CSV kon niet worden geparsed.' },
  pl: { title: 'Konwerter CSV do JSON', description: 'Konwertuj CSV na JSON. Darmowy, w przegladarce.', inputLabel: 'Wejscie (CSV)', outputLabel: 'Wyjscie (JSON)', placeholder: 'Wklej CSV...', convert: 'Konwertuj', clear: 'Wyczysc', copyLabel: 'Kopiuj', introTitle: 'Konwerter CSV do JSON', introText: 'Wklej dane CSV i konwertuj na tablice JSON.', howTitle: 'Jak uzywac', step1: 'Wklej CSV z naglowkami', step2: 'Kliknij Konwertuj', step3: 'Skopiuj JSON', featuresTitle: 'Funkcje', feature1: 'Automatyczne wykrywanie separatora', feature2: 'Pola w cudzyslowach', feature3: 'Liczby automatycznie', feature4: 'Puste pola jako null', feature5: 'Przetwarzanie lokalne', faqTitle: 'FAQ', faq1q: 'Jakie formaty CSV?', faq1a: 'Przecinek, srednik, tabulator.', faq2q: 'Typy danych?', faq2a: 'Liczby i booleany automatycznie.', faq3q: 'Puste pola?', faq3a: 'Staja sie null.', faq4q: 'Dane bezpieczne?', faq4a: 'W przegladarce.', faq5q: 'Duze pliki?', faq5a: 'Tysiace wierszy.', relatedTitle: 'Powiazane narzedzia', errorEmpty: 'Wprowadz CSV.', errorParse: 'Nie mozna sparsowac CSV.' },
  sv: { title: 'CSV till JSON Konverterare', description: 'Konvertera CSV till JSON. Gratis, i webblaesaren.', inputLabel: 'Indata (CSV)', outputLabel: 'Utdata (JSON)', placeholder: 'Klistra in CSV...', convert: 'Konvertera', clear: 'Rensa', copyLabel: 'Kopiera', introTitle: 'CSV till JSON Konverterare', introText: 'Klistra in CSV-data och konvertera till JSON-array.', howTitle: 'Hur man anvaender', step1: 'Klistra in CSV med rubriker', step2: 'Klicka Konvertera', step3: 'Kopiera JSON', featuresTitle: 'Funktioner', feature1: 'Automatisk avgransardetektion', feature2: 'Citerade falt', feature3: 'Nummer automatiskt', feature4: 'Tomma falt som null', feature5: 'Lokal behandling', faqTitle: 'FAQ', faq1q: 'Vilka CSV-format?', faq1a: 'Komma, semikolon, tab.', faq2q: 'Datatyper?', faq2a: 'Nummer och booleska automatiskt.', faq3q: 'Tomma falt?', faq3a: 'Blir null.', faq4q: 'Data saekert?', faq4a: 'I webblaesaren.', faq5q: 'Stora filer?', faq5a: 'Tusentals rader.', relatedTitle: 'Relaterade verktyg', errorEmpty: 'Ange CSV.', errorParse: 'Kunde inte parsa CSV.' },
  no: { title: 'CSV til JSON Konverterer', description: 'Konverter CSV til JSON. Gratis, i nettleseren.', inputLabel: 'Inndata (CSV)', outputLabel: 'Utdata (JSON)', placeholder: 'Lim inn CSV...', convert: 'Konverter', clear: 'Toom', copyLabel: 'Kopier', introTitle: 'CSV til JSON Konverterer', introText: 'Lim inn CSV-data og konverter til JSON-array.', howTitle: 'Slik bruker du', step1: 'Lim inn CSV med overskrifter', step2: 'Klikk Konverter', step3: 'Kopier JSON', featuresTitle: 'Funksjoner', feature1: 'Automatisk skilletegn-deteksjon', feature2: 'Siterte felt', feature3: 'Tall automatisk', feature4: 'Tomme felt som null', feature5: 'Lokal behandling', faqTitle: 'FAQ', faq1q: 'Hvilke CSV-formater?', faq1a: 'Komma, semikolon, tab.', faq2q: 'Datatyper?', faq2a: 'Tall og boolske automatisk.', faq3q: 'Tomme felt?', faq3a: 'Blir null.', faq4q: 'Data trygt?', faq4a: 'I nettleseren.', faq5q: 'Store filer?', faq5a: 'Tusenvis av rader.', relatedTitle: 'Relaterte verktoy', errorEmpty: 'Skriv inn CSV.', errorParse: 'Kunne ikke parse CSV.' },
  id: { title: 'Konverter CSV ke JSON', description: 'Konversi CSV ke JSON. Gratis, di browser.', inputLabel: 'Input (CSV)', outputLabel: 'Output (JSON)', placeholder: 'Tempel CSV...', convert: 'Konversi', clear: 'Hapus', copyLabel: 'Salin', introTitle: 'Konverter CSV ke JSON', introText: 'Tempel data CSV dan konversi ke array JSON.', howTitle: 'Cara menggunakan', step1: 'Tempel CSV dengan header', step2: 'Klik Konversi', step3: 'Salin JSON', featuresTitle: 'Fitur', feature1: 'Deteksi pemisah otomatis', feature2: 'Field berkutip', feature3: 'Angka otomatis', feature4: 'Field kosong jadi null', feature5: 'Pemrosesan lokal', faqTitle: 'FAQ', faq1q: 'Format CSV apa?', faq1a: 'Koma, titik koma, tab.', faq2q: 'Tipe data?', faq2a: 'Angka dan boolean otomatis.', faq3q: 'Field kosong?', faq3a: 'Menjadi null.', faq4q: 'Data aman?', faq4a: 'Di browser.', faq5q: 'File besar?', faq5a: 'Ribuan baris.', relatedTitle: 'Alat terkait', errorEmpty: 'Masukkan CSV.', errorParse: 'Tidak bisa parsing CSV.' },
  th: { title: 'แปลง CSV เป็น JSON ออนไลน์', description: 'แปลงข้อมูล CSV เป็นรูปแบบ JSON ฟรี ในเบราว์เซอร์', inputLabel: 'อินพุต (CSV)', outputLabel: 'เอาต์พุต (JSON)', placeholder: 'วาง CSV...', convert: 'แปลง', clear: 'ล้าง', copyLabel: 'คัดลอก', introTitle: 'ตัวแปลง CSV เป็น JSON ฟรี', introText: 'วางข้อมูล CSV และแปลงเป็นอาร์เรย์ JSON ทันที', howTitle: 'วิธีใช้', step1: 'วาง CSV พร้อมส่วนหัว', step2: 'คลิกแปลง', step3: 'คัดลอก JSON', featuresTitle: 'คุณสมบัติ', feature1: 'ตรวจจับตัวคั่นอัตโนมัติ', feature2: 'รองรับฟิลด์ในเครื่องหมายคำพูด', feature3: 'แปลงตัวเลขอัตโนมัติ', feature4: 'ฟิลด์ว่างเป็น null', feature5: 'ประมวลผลในเครื่อง', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'รองรับ CSV รูปแบบไหน?', faq1a: 'คอมมา เซมิโคลอน แท็บ', faq2q: 'ประเภทข้อมูล?', faq2a: 'ตรวจจับตัวเลขและบูลีนอัตโนมัติ', faq3q: 'ฟิลด์ว่าง?', faq3a: 'แปลงเป็น null', faq4q: 'ข้อมูลปลอดภัยไหม?', faq4a: 'ทุกอย่างในเบราว์เซอร์', faq5q: 'ไฟล์ใหญ่ได้ไหม?', faq5a: 'รองรับหลายพันแถว', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง', errorEmpty: 'กรุณาป้อนข้อมูล CSV', errorParse: 'ไม่สามารถแยกวิเคราะห์ CSV' },
};

function detectDelimiter(csv: string): string {
  const firstLine = csv.split('\n')[0] || '';
  const commas = (firstLine.match(/,/g) || []).length;
  const semicolons = (firstLine.match(/;/g) || []).length;
  const tabs = (firstLine.match(/\t/g) || []).length;
  if (tabs >= commas && tabs >= semicolons && tabs > 0) return '\t';
  if (semicolons > commas && semicolons > 0) return ';';
  return ',';
}

function parseCSVLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        result.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

function csvToJson(csv: string): string {
  const delimiter = detectDelimiter(csv);
  const lines = csv.trim().split('\n').map(l => l.replace(/\r$/, ''));
  if (lines.length < 2) throw new Error('CSV must have at least a header row and one data row');

  const headers = parseCSVLine(lines[0], delimiter).map(h => h.trim());
  const result: Record<string, unknown>[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i], delimiter);
    const obj: Record<string, unknown> = {};
    headers.forEach((header, idx) => {
      const val = (values[idx] || '').trim();
      if (val === '') {
        obj[header] = null;
      } else if (val.toLowerCase() === 'true') {
        obj[header] = true;
      } else if (val.toLowerCase() === 'false') {
        obj[header] = false;
      } else if (!isNaN(Number(val)) && val !== '') {
        obj[header] = Number(val);
      } else {
        obj[header] = val;
      }
    });
    result.push(obj);
  }

  return JSON.stringify(result, null, 2);
}

export default function CsvToJsonOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = useCallback(() => {
    setError('');
    if (!input.trim()) { setError(t.errorEmpty); setOutput(''); return; }
    try { setOutput(csvToJson(input)); } catch (e) { setError(`${t.errorParse}: ${e instanceof Error ? e.message : String(e)}`); setOutput(''); }
  }, [input, t]);

  const handleClear = useCallback(() => { setInput(''); setOutput(''); setError(''); }, []);

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
    { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
    { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
  ]};

  return (
    <ToolLayout title={t.title} description={t.description} toolId="csv-to-json-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleConvert} className="btn btn-primary" style={{ fontSize: 13 }}>{t.convert}</button>
        <button onClick={handleClear} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
      </div>
      {error && <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose,#f43f5e)' }}>{'\u2715'} {error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}><label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label></div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} spellCheck={false} style={{ flex: 1, minHeight: 300, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}><label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label><CopyButton text={output} label={t.copyLabel} /></div>
          <textarea value={output} readOnly spellCheck={false} style={{ flex: 1, minHeight: 300, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, background: 'var(--bg-card)', opacity: output ? 1 : 0.5, resize: 'vertical' }} />
        </div>
      </div>
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li></ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.feature1}</li><li>{t.feature2}</li><li>{t.feature3}</li><li>{t.feature4}</li><li>{t.feature5}</li></ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {[{ q: t.faq1q, a: t.faq1a },{ q: t.faq2q, a: t.faq2a },{ q: t.faq3q, a: t.faq3a },{ q: t.faq4q, a: t.faq4a },{ q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', userSelect: 'none' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[{ href: `/${lang}/tools/csv-json-converter`, label: 'CSV/JSON Converter' },{ href: `/${lang}/tools/json-to-csv-converter`, label: 'JSON to CSV' },{ href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' }].map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
