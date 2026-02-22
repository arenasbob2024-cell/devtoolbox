'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Chmod Visualizer',
    description: 'Interactive chmod permission calculator. Convert between symbolic and numeric Unix/Linux file permissions with a visual interface.',
    owner: 'Owner', group: 'Group', others: 'Others',
    read: 'Read', write: 'Write', execute: 'Execute',
    numeric: 'Numeric', symbolic: 'Symbolic', command: 'Command',
    commonLabel: 'Common Permissions',
    introTitle: 'Free Online Chmod Permission Calculator',
    introText: 'Easily calculate and visualize Unix/Linux file permissions with this interactive chmod calculator. Toggle read, write, and execute permissions for owner, group, and others. Instantly see the numeric (octal) and symbolic representations, plus the ready-to-use chmod command. Perfect for system administrators, DevOps engineers, and developers working with Linux servers.',
    howTitle: 'How to Use Chmod Visualizer',
    step1: 'Toggle permission checkboxes for owner, group, and others',
    step2: 'See the numeric (octal) value update in real-time',
    step3: 'Copy the symbolic notation or chmod command',
    step4: 'Or enter a numeric value to see the corresponding permissions',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is chmod?', faq1a: 'chmod (change mode) is a Unix/Linux command used to change file and directory permissions. It controls who can read, write, or execute a file using either numeric (octal) or symbolic notation.',
    faq2q: 'What do the numbers mean?', faq2a: 'Each digit represents permissions for owner, group, and others respectively. Read=4, Write=2, Execute=1. Add them together: 7=rwx, 6=rw-, 5=r-x, 4=r--, 0=---.',
    faq3q: 'What is 755 permission?', faq3a: '755 means the owner has read, write, and execute (7), while group and others have read and execute (5). This is the most common permission for directories and executable scripts.',
    faq4q: 'What is 644 permission?', faq4a: '644 means the owner can read and write (6), while group and others can only read (4). This is the standard permission for regular files like HTML, CSS, and configuration files.',
    faq5q: 'Is this tool safe to use?', faq5a: 'Yes, all calculations happen entirely in your browser. No data is sent to any server. This tool simply helps you visualize and calculate permissions.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Chmod 可视化工具',
    description: '交互式 chmod 权限计算器。可视化转换 Unix/Linux 文件权限。',
    owner: '所有者', group: '组', others: '其他',
    read: '读取', write: '写入', execute: '执行',
    numeric: '数字', symbolic: '符号', command: '命令',
    commonLabel: '常用权限',
    introTitle: '免费在线 Chmod 权限计算器',
    introText: '使用此交互式 chmod 计算器轻松计算和可视化 Unix/Linux 文件权限。适合系统管理员和开发者。',
    howTitle: '如何使用', step1: '切换权限复选框', step2: '实时查看数字值更新', step3: '复制符号表示或命令', step4: '或输入数字值查看权限',
    faqTitle: '常见问题',
    faq1q: '什么是 chmod？', faq1a: 'chmod 是 Unix/Linux 命令，用于更改文件和目录权限。',
    faq2q: '数字代表什么？', faq2a: '每位数字分别代表所有者、组和其他的权限。读=4，写=2，执行=1。',
    faq3q: '755 权限是什么？', faq3a: '所有者有读写执行权限(7)，组和其他有读和执行权限(5)。',
    faq4q: '644 权限是什么？', faq4a: '所有者可读写(6)，组和其他只读(4)。',
    faq5q: '工具安全吗？', faq5a: '完全安全，所有计算在浏览器中完成。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'Chmod ビジュアライザー',
    description: 'インタラクティブなchmod権限計算ツール。',
    owner: 'オーナー', group: 'グループ', others: 'その他',
    read: '読み取り', write: '書き込み', execute: '実行',
    numeric: '数値', symbolic: 'シンボリック', command: 'コマンド',
    commonLabel: 'よく使う権限',
    introTitle: '無料chmod権限計算ツール', introText: 'Unix/Linuxファイル権限を視覚的に計算します。',
    howTitle: '使い方', step1: '権限チェックボックスを切り替え', step2: '数値がリアルタイムで更新', step3: 'シンボリック表記をコピー', step4: '数値を入力して権限を確認',
    faqTitle: 'よくある質問',
    faq1q: 'chmodとは？', faq1a: 'chmodはUnix/Linuxのファイル権限変更コマンドです。',
    faq2q: '数字の意味は？', faq2a: '各桁はオーナー、グループ、その他の権限。読=4、書=2、実行=1。',
    faq3q: '755権限とは？', faq3a: 'オーナーはrwx(7)、グループとその他はr-x(5)。',
    faq4q: '644権限とは？', faq4a: 'オーナーはrw-(6)、グループとその他はr--(4)。',
    faq5q: '安全ですか？', faq5a: 'はい、すべてブラウザ内で処理されます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Chmod 시각화 도구',
    description: '대화형 chmod 권한 계산기.',
    owner: '소유자', group: '그룹', others: '기타',
    read: '읽기', write: '쓰기', execute: '실행',
    numeric: '숫자', symbolic: '심볼릭', command: '명령어',
    commonLabel: '자주 사용하는 권한',
    introTitle: '무료 chmod 권한 계산기', introText: 'Unix/Linux 파일 권한을 시각적으로 계산합니다.',
    howTitle: '사용 방법', step1: '권한 체크박스 전환', step2: '숫자 값 실시간 업데이트', step3: '심볼릭 표기 복사', step4: '숫자 값 입력으로 권한 확인',
    faqTitle: '자주 묻는 질문',
    faq1q: 'chmod란?', faq1a: 'chmod는 Unix/Linux 파일 권한 변경 명령어입니다.',
    faq2q: '숫자의 의미는?', faq2a: '각 자리는 소유자, 그룹, 기타의 권한. 읽기=4, 쓰기=2, 실행=1.',
    faq3q: '755 권한이란?', faq3a: '소유자 rwx(7), 그룹과 기타 r-x(5).',
    faq4q: '644 권한이란?', faq4a: '소유자 rw-(6), 그룹과 기타 r--(4).',
    faq5q: '안전한가요?', faq5a: '네, 모든 처리가 브라우저에서 이루어집니다.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'Chmod Visualiseur', description: 'Calculateur interactif de permissions chmod.',
    owner: 'Proprietaire', group: 'Groupe', others: 'Autres', read: 'Lecture', write: 'Ecriture', execute: 'Execution',
    numeric: 'Numerique', symbolic: 'Symbolique', command: 'Commande', commonLabel: 'Permissions courantes',
    introTitle: 'Calculateur chmod gratuit', introText: 'Calculez facilement les permissions Unix/Linux.',
    howTitle: 'Comment utiliser', step1: 'Cochez les permissions', step2: 'Valeur numerique en temps reel', step3: 'Copiez la commande', step4: 'Entrez une valeur numerique',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que chmod?', faq1a: 'chmod change les permissions des fichiers Unix/Linux.',
    faq2q: 'Que signifient les chiffres?', faq2a: 'Lecture=4, Ecriture=2, Execution=1.',
    faq3q: 'Que signifie 755?', faq3a: 'Proprietaire rwx(7), groupe et autres r-x(5).',
    faq4q: 'Que signifie 644?', faq4a: 'Proprietaire rw-(6), groupe et autres r--(4).',
    faq5q: 'Est-ce securise?', faq5a: 'Oui, tout se passe dans votre navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Chmod Visualisierer', description: 'Interaktiver chmod-Berechtigungsrechner.',
    owner: 'Besitzer', group: 'Gruppe', others: 'Andere', read: 'Lesen', write: 'Schreiben', execute: 'Ausfuehren',
    numeric: 'Numerisch', symbolic: 'Symbolisch', command: 'Befehl', commonLabel: 'Haeufige Berechtigungen',
    introTitle: 'Kostenloser chmod-Rechner', introText: 'Berechnen Sie Unix/Linux-Dateiberechtigungen visuell.',
    howTitle: 'So verwenden', step1: 'Berechtigungen umschalten', step2: 'Numerischer Wert aktualisiert sich', step3: 'Befehl kopieren', step4: 'Numerischen Wert eingeben',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist chmod?', faq1a: 'chmod aendert Dateiberechtigungen in Unix/Linux.',
    faq2q: 'Was bedeuten die Zahlen?', faq2a: 'Lesen=4, Schreiben=2, Ausfuehren=1.',
    faq3q: 'Was bedeutet 755?', faq3a: 'Besitzer rwx(7), Gruppe und Andere r-x(5).',
    faq4q: 'Was bedeutet 644?', faq4a: 'Besitzer rw-(6), Gruppe und Andere r--(4).',
    faq5q: 'Ist es sicher?', faq5a: 'Ja, alles laeuft im Browser.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Chmod Visualizador', description: 'Calculadora interactiva de permisos chmod.',
    owner: 'Propietario', group: 'Grupo', others: 'Otros', read: 'Lectura', write: 'Escritura', execute: 'Ejecucion',
    numeric: 'Numerico', symbolic: 'Simbolico', command: 'Comando', commonLabel: 'Permisos comunes',
    introTitle: 'Calculadora chmod gratuita', introText: 'Calcula permisos Unix/Linux visualmente.',
    howTitle: 'Como usar', step1: 'Marca los permisos', step2: 'Valor numerico en tiempo real', step3: 'Copia el comando', step4: 'Introduce un valor numerico',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es chmod?', faq1a: 'chmod cambia los permisos de archivos Unix/Linux.',
    faq2q: 'Que significan los numeros?', faq2a: 'Lectura=4, Escritura=2, Ejecucion=1.',
    faq3q: 'Que significa 755?', faq3a: 'Propietario rwx(7), grupo y otros r-x(5).',
    faq4q: 'Que significa 644?', faq4a: 'Propietario rw-(6), grupo y otros r--(4).',
    faq5q: 'Es seguro?', faq5a: 'Si, todo se procesa en tu navegador.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Chmod Visualizador', description: 'Calculadora interativa de permissoes chmod.',
    owner: 'Proprietario', group: 'Grupo', others: 'Outros', read: 'Leitura', write: 'Escrita', execute: 'Execucao',
    numeric: 'Numerico', symbolic: 'Simbolico', command: 'Comando', commonLabel: 'Permissoes comuns',
    introTitle: 'Calculadora chmod gratuita', introText: 'Calcule permissoes Unix/Linux visualmente.',
    howTitle: 'Como usar', step1: 'Marque as permissoes', step2: 'Valor numerico em tempo real', step3: 'Copie o comando', step4: 'Insira um valor numerico',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e chmod?', faq1a: 'chmod altera permissoes de arquivos Unix/Linux.',
    faq2q: 'O que significam os numeros?', faq2a: 'Leitura=4, Escrita=2, Execucao=1.',
    faq3q: 'O que significa 755?', faq3a: 'Proprietario rwx(7), grupo e outros r-x(5).',
    faq4q: 'O que significa 644?', faq4a: 'Proprietario rw-(6), grupo e outros r--(4).',
    faq5q: 'E seguro?', faq5a: 'Sim, tudo e processado no seu navegador.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Chmod Visualizzatore', description: 'Calcolatore interattivo di permessi chmod.',
    owner: 'Proprietario', group: 'Gruppo', others: 'Altri', read: 'Lettura', write: 'Scrittura', execute: 'Esecuzione',
    numeric: 'Numerico', symbolic: 'Simbolico', command: 'Comando', commonLabel: 'Permessi comuni',
    introTitle: 'Calcolatore chmod gratuito', introText: 'Calcola i permessi Unix/Linux visivamente.',
    howTitle: 'Come usare', step1: 'Seleziona i permessi', step2: 'Valore numerico in tempo reale', step3: 'Copia il comando', step4: 'Inserisci un valore numerico',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cos\'e chmod?', faq1a: 'chmod cambia i permessi dei file Unix/Linux.',
    faq2q: 'Cosa significano i numeri?', faq2a: 'Lettura=4, Scrittura=2, Esecuzione=1.',
    faq3q: 'Cosa significa 755?', faq3a: 'Proprietario rwx(7), gruppo e altri r-x(5).',
    faq4q: 'Cosa significa 644?', faq4a: 'Proprietario rw-(6), gruppo e altri r--(4).',
    faq5q: 'E sicuro?', faq5a: 'Si, tutto avviene nel browser.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'Chmod Visualisatie', description: 'Interactieve chmod-rechten calculator.',
    owner: 'Eigenaar', group: 'Groep', others: 'Anderen', read: 'Lezen', write: 'Schrijven', execute: 'Uitvoeren',
    numeric: 'Numeriek', symbolic: 'Symbolisch', command: 'Commando', commonLabel: 'Veelgebruikte rechten',
    introTitle: 'Gratis chmod-calculator', introText: 'Bereken Unix/Linux bestandsrechten visueel.',
    howTitle: 'Hoe te gebruiken', step1: 'Schakel rechten in/uit', step2: 'Numerieke waarde wordt bijgewerkt', step3: 'Kopieer het commando', step4: 'Voer een numerieke waarde in',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is chmod?', faq1a: 'chmod wijzigt bestandsrechten in Unix/Linux.',
    faq2q: 'Wat betekenen de cijfers?', faq2a: 'Lezen=4, Schrijven=2, Uitvoeren=1.',
    faq3q: 'Wat betekent 755?', faq3a: 'Eigenaar rwx(7), groep en anderen r-x(5).',
    faq4q: 'Wat betekent 644?', faq4a: 'Eigenaar rw-(6), groep en anderen r--(4).',
    faq5q: 'Is het veilig?', faq5a: 'Ja, alles draait in je browser.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Chmod Wizualizator', description: 'Interaktywny kalkulator uprawnien chmod.',
    owner: 'Wlasciciel', group: 'Grupa', others: 'Inni', read: 'Odczyt', write: 'Zapis', execute: 'Wykonanie',
    numeric: 'Numeryczny', symbolic: 'Symboliczny', command: 'Polecenie', commonLabel: 'Czeste uprawnienia',
    introTitle: 'Darmowy kalkulator chmod', introText: 'Oblicz uprawnienia plikow Unix/Linux wizualnie.',
    howTitle: 'Jak uzywac', step1: 'Przelacz uprawnienia', step2: 'Wartosc numeryczna sie aktualizuje', step3: 'Skopiuj polecenie', step4: 'Wpisz wartosc numeryczna',
    faqTitle: 'FAQ',
    faq1q: 'Czym jest chmod?', faq1a: 'chmod zmienia uprawnienia plikow Unix/Linux.',
    faq2q: 'Co oznaczaja liczby?', faq2a: 'Odczyt=4, Zapis=2, Wykonanie=1.',
    faq3q: 'Co oznacza 755?', faq3a: 'Wlasciciel rwx(7), grupa i inni r-x(5).',
    faq4q: 'Co oznacza 644?', faq4a: 'Wlasciciel rw-(6), grupa i inni r--(4).',
    faq5q: 'Czy jest bezpieczne?', faq5a: 'Tak, wszystko dziala w przegladarce.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Chmod Visualiserare', description: 'Interaktiv chmod-raettighetskalkylatorn.',
    owner: 'Aegare', group: 'Grupp', others: 'Andra', read: 'Laes', write: 'Skriv', execute: 'Koer',
    numeric: 'Numerisk', symbolic: 'Symbolisk', command: 'Kommando', commonLabel: 'Vanliga raettigheter',
    introTitle: 'Gratis chmod-kalkylator', introText: 'Beraekna Unix/Linux-filraettigheter visuellt.',
    howTitle: 'Hur man anvaender', step1: 'Vaexla raettigheter', step2: 'Numeriskt vaerde uppdateras', step3: 'Kopiera kommandot', step4: 'Ange ett numeriskt vaerde',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad aer chmod?', faq1a: 'chmod aendrar filraettigheter i Unix/Linux.',
    faq2q: 'Vad betyder siffrorna?', faq2a: 'Laes=4, Skriv=2, Koer=1.',
    faq3q: 'Vad betyder 755?', faq3a: 'Aegare rwx(7), grupp och andra r-x(5).',
    faq4q: 'Vad betyder 644?', faq4a: 'Aegare rw-(6), grupp och andra r--(4).',
    faq5q: 'Aer det saekert?', faq5a: 'Ja, allt koers i din webblaesare.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Chmod Visualisering', description: 'Interaktiv chmod-rettighetskalkulator.',
    owner: 'Eier', group: 'Gruppe', others: 'Andre', read: 'Les', write: 'Skriv', execute: 'Kjoer',
    numeric: 'Numerisk', symbolic: 'Symbolsk', command: 'Kommando', commonLabel: 'Vanlige rettigheter',
    introTitle: 'Gratis chmod-kalkulator', introText: 'Beregn Unix/Linux-filtilganger visuelt.',
    howTitle: 'Hvordan bruke', step1: 'Veksle rettigheter', step2: 'Numerisk verdi oppdateres', step3: 'Kopier kommandoen', step4: 'Skriv inn en numerisk verdi',
    faqTitle: 'Ofte stilte sporsmaal',
    faq1q: 'Hva er chmod?', faq1a: 'chmod endrer filtilganger i Unix/Linux.',
    faq2q: 'Hva betyr tallene?', faq2a: 'Les=4, Skriv=2, Kjoer=1.',
    faq3q: 'Hva betyr 755?', faq3a: 'Eier rwx(7), gruppe og andre r-x(5).',
    faq4q: 'Hva betyr 644?', faq4a: 'Eier rw-(6), gruppe og andre r--(4).',
    faq5q: 'Er det trygt?', faq5a: 'Ja, alt kjoeres i nettleseren din.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Chmod Visualizer', description: 'Kalkulator izin chmod interaktif.',
    owner: 'Pemilik', group: 'Grup', others: 'Lainnya', read: 'Baca', write: 'Tulis', execute: 'Eksekusi',
    numeric: 'Numerik', symbolic: 'Simbolik', command: 'Perintah', commonLabel: 'Izin umum',
    introTitle: 'Kalkulator chmod gratis', introText: 'Hitung izin file Unix/Linux secara visual.',
    howTitle: 'Cara menggunakan', step1: 'Toggle izin', step2: 'Nilai numerik diperbarui', step3: 'Salin perintah', step4: 'Masukkan nilai numerik',
    faqTitle: 'FAQ',
    faq1q: 'Apa itu chmod?', faq1a: 'chmod mengubah izin file di Unix/Linux.',
    faq2q: 'Apa arti angka?', faq2a: 'Baca=4, Tulis=2, Eksekusi=1.',
    faq3q: 'Apa arti 755?', faq3a: 'Pemilik rwx(7), grup dan lainnya r-x(5).',
    faq4q: 'Apa arti 644?', faq4a: 'Pemilik rw-(6), grup dan lainnya r--(4).',
    faq5q: 'Apakah aman?', faq5a: 'Ya, semua proses di browser Anda.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'Chmod Visualizer', description: 'เครื่องคำนวณสิทธิ์ chmod แบบโต้ตอบ',
    owner: 'เจ้าของ', group: 'กลุ่ม', others: 'อื่นๆ', read: 'อ่าน', write: 'เขียน', execute: 'ดำเนินการ',
    numeric: 'ตัวเลข', symbolic: 'สัญลักษณ์', command: 'คำสั่ง', commonLabel: 'สิทธิ์ที่ใช้บ่อย',
    introTitle: 'เครื่องคำนวณ chmod ฟรี', introText: 'คำนวณสิทธิ์ไฟล์ Unix/Linux แบบเห็นภาพ',
    howTitle: 'วิธีใช้', step1: 'สลับสิทธิ์', step2: 'ค่าตัวเลขอัปเดตทันที', step3: 'คัดลอกคำสั่ง', step4: 'ป้อนค่าตัวเลข',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'chmod คืออะไร?', faq1a: 'chmod เปลี่ยนสิทธิ์ไฟล์ใน Unix/Linux',
    faq2q: 'ตัวเลขหมายถึงอะไร?', faq2a: 'อ่าน=4, เขียน=2, ดำเนินการ=1',
    faq3q: '755 หมายถึงอะไร?', faq3a: 'เจ้าของ rwx(7), กลุ่มและอื่นๆ r-x(5)',
    faq4q: '644 หมายถึงอะไร?', faq4a: 'เจ้าของ rw-(6), กลุ่มและอื่นๆ r--(4)',
    faq5q: 'ปลอดภัยไหม?', faq5a: 'ใช่ ทุกอย่างทำงานในเบราว์เซอร์',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

type Perms = [boolean, boolean, boolean];

const COMMON_PERMS = [
  { value: '777', label: 'rwxrwxrwx', desc: 'Full access' },
  { value: '755', label: 'rwxr-xr-x', desc: 'Directories/scripts' },
  { value: '644', label: 'rw-r--r--', desc: 'Regular files' },
  { value: '600', label: 'rw-------', desc: 'Private files' },
  { value: '700', label: 'rwx------', desc: 'Private dirs' },
  { value: '444', label: 'r--r--r--', desc: 'Read-only' },
];

function permsToOctal(r: boolean, w: boolean, x: boolean): number {
  return (r ? 4 : 0) + (w ? 2 : 0) + (x ? 1 : 0);
}

function octalToPerms(n: number): Perms {
  return [(n & 4) !== 0, (n & 2) !== 0, (n & 1) !== 0];
}

function permsToSymbolic(r: boolean, w: boolean, x: boolean): string {
  return `${r ? 'r' : '-'}${w ? 'w' : '-'}${x ? 'x' : '-'}`;
}

export default function ChmodVisualizer() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [owner, setOwner] = useState<Perms>([true, true, true]);
  const [group, setGroup] = useState<Perms>([true, false, true]);
  const [others, setOthers] = useState<Perms>([true, false, true]);

  const octal = `${permsToOctal(...owner)}${permsToOctal(...group)}${permsToOctal(...others)}`;
  const symbolic = `-${permsToSymbolic(...owner)}${permsToSymbolic(...group)}${permsToSymbolic(...others)}`;
  const command = `chmod ${octal} filename`;

  const handleOctalInput = useCallback((val: string) => {
    if (/^[0-7]{3}$/.test(val)) {
      setOwner(octalToPerms(parseInt(val[0])));
      setGroup(octalToPerms(parseInt(val[1])));
      setOthers(octalToPerms(parseInt(val[2])));
    }
  }, []);

  const toggle = (who: 'owner' | 'group' | 'others', idx: number) => {
    const setter = who === 'owner' ? setOwner : who === 'group' ? setGroup : setOthers;
    const current = who === 'owner' ? owner : who === 'group' ? group : others;
    const next = [...current] as Perms;
    next[idx] = !next[idx];
    setter(next);
  };

  const checkboxStyle: React.CSSProperties = { width: 20, height: 20, accentColor: 'var(--accent-blue)', cursor: 'pointer' };
  const cellStyle: React.CSSProperties = { padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' };
  const headerStyle: React.CSSProperties = { ...cellStyle, fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' };

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
    <ToolLayout title={t.title} description={t.description} toolId="chmod-visualizer">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Permission Grid */}
      <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-input)' }}>
              <th style={headerStyle}></th>
              <th style={headerStyle}>{t.read} (r)</th>
              <th style={headerStyle}>{t.write} (w)</th>
              <th style={headerStyle}>{t.execute} (x)</th>
              <th style={headerStyle}>{t.numeric}</th>
            </tr>
          </thead>
          <tbody>
            {([
              { label: t.owner, perms: owner, who: 'owner' as const },
              { label: t.group, perms: group, who: 'group' as const },
              { label: t.others, perms: others, who: 'others' as const },
            ]).map(({ label, perms, who }) => (
              <tr key={who}>
                <td style={{ ...cellStyle, fontWeight: 600, fontSize: 14, textAlign: 'left', paddingLeft: 20 }}>{label}</td>
                {perms.map((checked, idx) => (
                  <td key={idx} style={cellStyle}>
                    <input type="checkbox" checked={checked} onChange={() => toggle(who, idx)} style={checkboxStyle} />
                  </td>
                ))}
                <td style={{ ...cellStyle, fontFamily: 'monospace', fontWeight: 700, fontSize: 18, color: 'var(--accent-blue)' }}>
                  {permsToOctal(...perms)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: t.numeric, value: octal },
          { label: t.symbolic, value: symbolic },
          { label: t.command, value: command },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: 'var(--bg-input)', borderRadius: 10, padding: '16px 20px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>{label}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: 16, fontWeight: 700, fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{value}</code>
              <CopyButton text={value} />
            </div>
          </div>
        ))}
      </div>

      {/* Octal Input */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.numeric}</label>
        <input
          type="text"
          value={octal}
          onChange={e => handleOctalInput(e.target.value)}
          maxLength={3}
          style={{ width: 120, padding: '10px 16px', fontSize: 20, fontFamily: 'monospace', fontWeight: 700, textAlign: 'center', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-primary)' }}
        />
      </div>

      {/* Common Permissions */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.commonLabel}</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
          {COMMON_PERMS.map(p => (
            <button key={p.value} onClick={() => handleOctalInput(p.value)}
              style={{
                padding: '10px 14px', borderRadius: 8, border: octal === p.value ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                background: octal === p.value ? 'rgba(59,130,246,0.1)' : 'var(--bg-input)', cursor: 'pointer', textAlign: 'left',
                color: 'var(--text-primary)',
              }}>
              <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 14 }}>{p.value} <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>{p.label}</span></div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* SEO Content */}
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
            { href: `/${lang}/tools/password-generator`, label: 'Password Generator' },
            { href: `/${lang}/tools/hash-generator`, label: 'Hash Generator' },
            { href: `/${lang}/tools/htaccess-generator`, label: '.htaccess Generator' },
            { href: `/${lang}/tools/nginx-config`, label: 'Nginx Config Generator' },
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
