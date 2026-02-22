'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

/* ── Permission helpers ───────────────────────────────────────── */
type Permission = { read: boolean; write: boolean; execute: boolean };

function permToNumber(p: Permission): number {
  return (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
}

function permToString(p: Permission): string {
  return (p.read ? 'r' : '-') + (p.write ? 'w' : '-') + (p.execute ? 'x' : '-');
}

function numberToPerm(n: number): Permission {
  return { read: !!(n & 4), write: !!(n & 2), execute: !!(n & 1) };
}

function describePermission(n: number): string {
  const perms: string[] = [];
  if (n & 4) perms.push('read');
  if (n & 2) perms.push('write');
  if (n & 1) perms.push('execute');
  return perms.length ? perms.join(' + ') : 'none';
}

/* ── i18n ──────────────────────────────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Chmod Calculator',
    description: 'Calculate Unix/Linux file permissions with interactive checkboxes. Generate chmod commands in numeric and symbolic notation.',
    owner: 'Owner (User)',
    group: 'Group',
    others: 'Others (World)',
    read: 'Read',
    write: 'Write',
    execute: 'Execute',
    numericLabel: 'Numeric',
    symbolicLabel: 'Symbolic',
    commandLabel: 'Command',
    enterNumeric: 'Enter numeric permission',
    commonTitle: 'Common Permissions',
    common755: 'Owner all, others read+exec',
    common644: 'Owner read+write, others read',
    common777: 'All permissions for everyone',
    common700: 'Owner only, full access',
    common600: 'Owner read+write only',
    common444: 'Read-only for everyone',
    common400: 'Owner read only',
    common750: 'Owner all, group read+exec',
    permDesc: 'Permission Description',
    ownerCan: 'Owner can',
    groupCan: 'Group can',
    othersCan: 'Others can',
    introTitle: 'Free Online Chmod Calculator',
    introText: 'The chmod (change mode) command is used in Unix and Linux systems to set file and directory permissions. Permissions control who can read, write, or execute files. This calculator helps you convert between the numeric (octal) notation like 755 and the symbolic notation like rwxr-xr-x. Each digit in the numeric notation represents permissions for owner, group, and others respectively. Read = 4, Write = 2, Execute = 1, and these values are summed for each category.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What does chmod 755 mean?',
    faq1a: 'Chmod 755 sets the file permissions so that the owner has full read, write, and execute permissions (7 = 4+2+1), while the group and others have read and execute permissions (5 = 4+1). In symbolic notation, this is rwxr-xr-x. This is the most common permission for executable scripts and public directories.',
    faq2q: 'What is the difference between chmod 644 and 755?',
    faq2a: 'Chmod 644 (rw-r--r--) gives the owner read and write access, while group and others can only read. Chmod 755 (rwxr-xr-x) additionally gives execute permission to everyone. Use 644 for regular files (like .html, .css, .php) and 755 for directories and executable scripts.',
    faq3q: 'What does chmod 777 mean and is it safe?',
    faq3a: 'Chmod 777 gives full read, write, and execute permissions to everyone (owner, group, and others). This is generally NOT recommended for security reasons, as it allows any user on the system to modify or execute the file. Use more restrictive permissions like 755 or 644 instead.',
    faq4q: 'How do I use chmod in the terminal?',
    faq4a: 'Use the command "chmod [permissions] [filename]". For example: "chmod 755 script.sh" sets rwxr-xr-x on script.sh. Use "chmod -R 755 directory/" to apply permissions recursively to all files in a directory. You can also use symbolic notation: "chmod u+x script.sh" adds execute permission for the owner.',
    faq5q: 'What is the difference between numeric and symbolic chmod notation?',
    faq5a: 'Numeric notation uses three octal digits (e.g., 755) where each digit represents the sum of read (4), write (2), and execute (1) for owner, group, and others. Symbolic notation uses letters: u (user/owner), g (group), o (others), a (all), with + (add), - (remove), = (set) and r, w, x for permissions.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Chmod 计算器',
    description: '使用交互式复选框计算 Unix/Linux 文件权限。支持数字和符号表示法生成 chmod 命令。',
    owner: '所有者（用户）',
    group: '组',
    others: '其他用户',
    read: '读取',
    write: '写入',
    execute: '执行',
    numericLabel: '数字表示',
    symbolicLabel: '符号表示',
    commandLabel: '命令',
    enterNumeric: '输入数字权限',
    commonTitle: '常用权限',
    common755: '所有者全部，其他读取+执行',
    common644: '所有者读写，其他只读',
    common777: '所有人全部权限',
    common700: '仅所有者，完全访问',
    common600: '仅所有者读写',
    common444: '所有人只读',
    common400: '仅所有者读取',
    common750: '所有者全部，组读取+执行',
    permDesc: '权限说明',
    ownerCan: '所有者可以',
    groupCan: '组可以',
    othersCan: '其他用户可以',
    introTitle: '免费在线 Chmod 计算器',
    introText: 'chmod（更改模式）命令用于 Unix 和 Linux 系统中设置文件和目录权限。权限控制谁可以读取、写入或执行文件。此计算器帮助您在数字（八进制）表示法（如 755）和符号表示法（如 rwxr-xr-x）之间转换。读取=4，写入=2，执行=1。',
    faqTitle: '常见问题',
    faq1q: 'chmod 755 是什么意思？',
    faq1a: 'chmod 755 设置文件权限，使所有者拥有完全的读写执行权限（7=4+2+1），而组和其他用户拥有读取和执行权限（5=4+1）。这是可执行脚本和公共目录最常用的权限设置。',
    faq2q: 'chmod 644 和 755 有什么区别？',
    faq2a: 'chmod 644 给所有者读写权限，组和其他用户只读。chmod 755 额外给所有人执行权限。644 用于普通文件，755 用于目录和可执行脚本。',
    faq3q: 'chmod 777 是什么意思，安全吗？',
    faq3a: 'chmod 777 给所有人完全的读写执行权限。出于安全原因通常不建议使用，因为它允许系统上的任何用户修改或执行该文件。',
    faq4q: '如何在终端中使用 chmod？',
    faq4a: '使用命令 "chmod [权限] [文件名]"。例如："chmod 755 script.sh"。使用 -R 标志递归应用权限。也可以使用符号表示法。',
    faq5q: '数字和符号 chmod 表示法有什么区别？',
    faq5a: '数字表示法使用三个八进制数字，每个数字是读取（4）、写入（2）、执行（1）的和。符号表示法使用字母 u、g、o、a 加上 +、-、= 和 r、w、x。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'Chmod 計算機',
    description: 'インタラクティブなチェックボックスで Unix/Linux ファイルパーミッションを計算。数値・シンボリック表記で chmod コマンドを生成。',
    owner: 'オーナー', group: 'グループ', others: 'その他',
    read: '読取', write: '書込', execute: '実行',
    numericLabel: '数値', symbolicLabel: 'シンボリック', commandLabel: 'コマンド',
    enterNumeric: '数値パーミッションを入力',
    commonTitle: 'よく使うパーミッション',
    common755: 'オーナー全権限、他は読取+実行', common644: 'オーナー読書、他は読取のみ',
    common777: '全員全権限', common700: 'オーナーのみ完全アクセス',
    common600: 'オーナー読書のみ', common444: '全員読取のみ',
    common400: 'オーナー読取のみ', common750: 'オーナー全権限、グループ読取+実行',
    permDesc: 'パーミッション説明', ownerCan: 'オーナーは', groupCan: 'グループは', othersCan: 'その他は',
    introTitle: '無料オンライン Chmod 計算機',
    introText: 'chmod コマンドは Unix/Linux でファイルパーミッションを設定するために使用されます。この計算機は数値表記とシンボリック表記の変換を支援します。',
    faqTitle: 'よくある質問',
    faq1q: 'chmod 755 の意味は？', faq1a: 'オーナーに全権限（rwx）、グループとその他に読取と実行権限（r-x）を設定します。',
    faq2q: 'chmod 644 と 755 の違いは？', faq2a: '644 はオーナーに読書権限、他は読取のみ。755 は全員に実行権限も追加。',
    faq3q: 'chmod 777 は安全？', faq3a: '全員に全権限を与えるため、セキュリティ上推奨されません。',
    faq4q: 'ターミナルでの chmod の使い方は？', faq4a: '"chmod 755 script.sh" のように使用します。-R で再帰的に適用できます。',
    faq5q: '数値とシンボリック表記の違いは？', faq5a: '数値は 3 桁の 8 進数。シンボリックは u,g,o,a と r,w,x の文字を使用します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Chmod 계산기',
    description: '대화형 체크박스로 Unix/Linux 파일 권한을 계산. 숫자 및 기호 표기법으로 chmod 명령어 생성.',
    owner: '소유자', group: '그룹', others: '기타',
    read: '읽기', write: '쓰기', execute: '실행',
    numericLabel: '숫자', symbolicLabel: '기호', commandLabel: '명령어',
    enterNumeric: '숫자 권한 입력',
    commonTitle: '자주 사용하는 권한',
    common755: '소유자 전체, 기타 읽기+실행', common644: '소유자 읽기+쓰기, 기타 읽기',
    common777: '모든 사용자 전체 권한', common700: '소유자만 전체 접근',
    common600: '소유자만 읽기+쓰기', common444: '모든 사용자 읽기 전용',
    common400: '소유자만 읽기', common750: '소유자 전체, 그룹 읽기+실행',
    permDesc: '권한 설명', ownerCan: '소유자:', groupCan: '그룹:', othersCan: '기타:',
    introTitle: '무료 온라인 Chmod 계산기',
    introText: 'chmod 명령어는 Unix/Linux에서 파일 권한을 설정하는 데 사용됩니다. 이 계산기는 숫자 표기법과 기호 표기법 간의 변환을 도와줍니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'chmod 755의 의미는?', faq1a: '소유자에게 모든 권한(rwx), 그룹과 기타에게 읽기+실행 권한(r-x)을 설정합니다.',
    faq2q: 'chmod 644와 755의 차이?', faq2a: '644는 소유자 읽기+쓰기, 기타 읽기만. 755는 모두에게 실행 권한도 추가.',
    faq3q: 'chmod 777은 안전한가요?', faq3a: '모든 사용자에게 모든 권한을 부여하므로 보안상 권장되지 않습니다.',
    faq4q: '터미널에서 chmod 사용법?', faq4a: '"chmod 755 script.sh"처럼 사용합니다. -R로 재귀적으로 적용할 수 있습니다.',
    faq5q: '숫자와 기호 표기법의 차이?', faq5a: '숫자는 3자리 8진수. 기호는 u,g,o,a와 r,w,x 문자를 사용합니다.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'Calculateur Chmod',
    description: 'Calculez les permissions Unix/Linux avec des cases a cocher interactives. Generez des commandes chmod en notation numerique et symbolique.',
    owner: 'Proprietaire', group: 'Groupe', others: 'Autres',
    read: 'Lecture', write: 'Ecriture', execute: 'Execution',
    numericLabel: 'Numerique', symbolicLabel: 'Symbolique', commandLabel: 'Commande',
    enterNumeric: 'Entrez la permission numerique',
    commonTitle: 'Permissions Courantes',
    common755: 'Proprio tout, autres lecture+exec', common644: 'Proprio lecture+ecriture, autres lecture',
    common777: 'Toutes permissions pour tous', common700: 'Proprio seul, acces complet',
    common600: 'Proprio lecture+ecriture seul', common444: 'Lecture seule pour tous',
    common400: 'Proprio lecture seule', common750: 'Proprio tout, groupe lecture+exec',
    permDesc: 'Description des Permissions', ownerCan: 'Proprietaire peut', groupCan: 'Groupe peut', othersCan: 'Autres peuvent',
    introTitle: 'Calculateur Chmod en Ligne Gratuit',
    introText: 'La commande chmod est utilisee dans les systemes Unix/Linux pour definir les permissions de fichiers et repertoires.',
    faqTitle: 'Questions Frequentes',
    faq1q: 'Que signifie chmod 755 ?', faq1a: 'Le proprietaire a tous les droits (rwx), le groupe et les autres ont lecture et execution (r-x).',
    faq2q: 'Difference entre chmod 644 et 755 ?', faq2a: '644 donne lecture+ecriture au proprietaire, lecture aux autres. 755 ajoute l\'execution pour tous.',
    faq3q: 'chmod 777 est-il sur ?', faq3a: 'Non, il donne tous les droits a tout le monde, ce qui pose des risques de securite.',
    faq4q: 'Comment utiliser chmod dans le terminal ?', faq4a: 'Utilisez "chmod 755 fichier.sh". Utilisez -R pour appliquer recursivement.',
    faq5q: 'Difference entre notation numerique et symbolique ?', faq5a: 'Numerique: 3 chiffres octaux. Symbolique: lettres u,g,o,a avec r,w,x.',
    relatedTitle: 'Outils associes',
  },
  de: {
    title: 'Chmod Rechner',
    description: 'Berechnen Sie Unix/Linux Dateiberechtigungen mit interaktiven Kontrollkaestchen. Generieren Sie chmod Befehle.',
    owner: 'Besitzer', group: 'Gruppe', others: 'Andere',
    read: 'Lesen', write: 'Schreiben', execute: 'Ausfuehren',
    numericLabel: 'Numerisch', symbolicLabel: 'Symbolisch', commandLabel: 'Befehl',
    enterNumeric: 'Numerische Berechtigung eingeben',
    commonTitle: 'Haeufige Berechtigungen',
    common755: 'Besitzer alles, andere lesen+ausfuehren', common644: 'Besitzer lesen+schreiben, andere lesen',
    common777: 'Alle Berechtigungen fuer alle', common700: 'Nur Besitzer, voller Zugriff',
    common600: 'Nur Besitzer lesen+schreiben', common444: 'Nur lesen fuer alle',
    common400: 'Nur Besitzer lesen', common750: 'Besitzer alles, Gruppe lesen+ausfuehren',
    permDesc: 'Berechtigungsbeschreibung', ownerCan: 'Besitzer kann', groupCan: 'Gruppe kann', othersCan: 'Andere koennen',
    introTitle: 'Kostenloser Online Chmod Rechner',
    introText: 'Der chmod Befehl wird in Unix/Linux verwendet um Dateiberechtigungen zu setzen.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was bedeutet chmod 755?', faq1a: 'Besitzer hat volle Rechte (rwx), Gruppe und Andere haben Lese- und Ausfuehrrechte (r-x).',
    faq2q: 'Unterschied zwischen chmod 644 und 755?', faq2a: '644 gibt Besitzer Lese+Schreibrechte, Andere nur Lesen. 755 gibt zusaetzlich Ausfuehrrechte.',
    faq3q: 'Ist chmod 777 sicher?', faq3a: 'Nein, es gibt allen alle Rechte, was ein Sicherheitsrisiko darstellt.',
    faq4q: 'Wie benutze ich chmod im Terminal?', faq4a: 'Verwenden Sie "chmod 755 datei.sh". Mit -R rekursiv anwenden.',
    faq5q: 'Unterschied numerische und symbolische Notation?', faq5a: 'Numerisch: 3 Oktalziffern. Symbolisch: Buchstaben u,g,o,a mit r,w,x.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Calculadora Chmod',
    description: 'Calcula permisos de archivos Unix/Linux con casillas interactivas. Genera comandos chmod en notacion numerica y simbolica.',
    owner: 'Propietario', group: 'Grupo', others: 'Otros',
    read: 'Lectura', write: 'Escritura', execute: 'Ejecucion',
    numericLabel: 'Numerico', symbolicLabel: 'Simbolico', commandLabel: 'Comando',
    enterNumeric: 'Ingresa permiso numerico',
    commonTitle: 'Permisos Comunes',
    common755: 'Propietario todo, otros lectura+ejec', common644: 'Propietario lectura+escritura, otros lectura',
    common777: 'Todos permisos para todos', common700: 'Solo propietario, acceso completo',
    common600: 'Solo propietario lectura+escritura', common444: 'Solo lectura para todos',
    common400: 'Solo propietario lectura', common750: 'Propietario todo, grupo lectura+ejec',
    permDesc: 'Descripcion de Permisos', ownerCan: 'Propietario puede', groupCan: 'Grupo puede', othersCan: 'Otros pueden',
    introTitle: 'Calculadora Chmod en Linea Gratis',
    introText: 'El comando chmod se usa en sistemas Unix/Linux para configurar permisos de archivos y directorios.',
    faqTitle: 'Preguntas Frecuentes',
    faq1q: 'Que significa chmod 755?', faq1a: 'El propietario tiene todos los permisos (rwx), grupo y otros tienen lectura y ejecucion (r-x).',
    faq2q: 'Diferencia entre chmod 644 y 755?', faq2a: '644 da lectura+escritura al propietario, solo lectura a otros. 755 agrega ejecucion para todos.',
    faq3q: 'chmod 777 es seguro?', faq3a: 'No, da todos los permisos a todos, lo cual es un riesgo de seguridad.',
    faq4q: 'Como usar chmod en terminal?', faq4a: 'Usa "chmod 755 archivo.sh". Usa -R para aplicar recursivamente.',
    faq5q: 'Diferencia notacion numerica y simbolica?', faq5a: 'Numerica: 3 digitos octales. Simbolica: letras u,g,o,a con r,w,x.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'Calcolatore Chmod',
    description: 'Calcola permessi file Unix/Linux con checkbox interattive. Genera comandi chmod in notazione numerica e simbolica.',
    owner: 'Proprietario', group: 'Gruppo', others: 'Altri',
    read: 'Lettura', write: 'Scrittura', execute: 'Esecuzione',
    numericLabel: 'Numerico', symbolicLabel: 'Simbolico', commandLabel: 'Comando',
    enterNumeric: 'Inserisci permesso numerico',
    commonTitle: 'Permessi Comuni',
    common755: 'Proprietario tutto, altri lettura+esec', common644: 'Proprietario lettura+scrittura, altri lettura',
    common777: 'Tutti i permessi per tutti', common700: 'Solo proprietario, accesso completo',
    common600: 'Solo proprietario lettura+scrittura', common444: 'Solo lettura per tutti',
    common400: 'Solo proprietario lettura', common750: 'Proprietario tutto, gruppo lettura+esec',
    permDesc: 'Descrizione Permessi', ownerCan: 'Proprietario puo', groupCan: 'Gruppo puo', othersCan: 'Altri possono',
    introTitle: 'Calcolatore Chmod Online Gratuito',
    introText: 'Il comando chmod viene utilizzato nei sistemi Unix/Linux per impostare i permessi di file e directory.',
    faqTitle: 'Domande Frequenti',
    faq1q: 'Cosa significa chmod 755?', faq1a: 'Il proprietario ha tutti i permessi (rwx), gruppo e altri hanno lettura ed esecuzione (r-x).',
    faq2q: 'Differenza tra chmod 644 e 755?', faq2a: '644 da lettura+scrittura al proprietario, solo lettura agli altri. 755 aggiunge esecuzione per tutti.',
    faq3q: 'chmod 777 e sicuro?', faq3a: 'No, da tutti i permessi a tutti, il che e un rischio per la sicurezza.',
    faq4q: 'Come usare chmod nel terminale?', faq4a: 'Usa "chmod 755 file.sh". Usa -R per applicare ricorsivamente.',
    faq5q: 'Differenza notazione numerica e simbolica?', faq5a: 'Numerica: 3 cifre ottali. Simbolica: lettere u,g,o,a con r,w,x.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Calculadora Chmod',
    description: 'Calcule permissoes Unix/Linux com caixas de selecao interativas. Gere comandos chmod em notacao numerica e simbolica.',
    owner: 'Proprietario', group: 'Grupo', others: 'Outros',
    read: 'Leitura', write: 'Escrita', execute: 'Execucao',
    numericLabel: 'Numerico', symbolicLabel: 'Simbolico', commandLabel: 'Comando',
    enterNumeric: 'Insira permissao numerica',
    commonTitle: 'Permissoes Comuns',
    common755: 'Dono tudo, outros leitura+exec', common644: 'Dono leitura+escrita, outros leitura',
    common777: 'Todas permissoes para todos', common700: 'Apenas dono, acesso total',
    common600: 'Apenas dono leitura+escrita', common444: 'Somente leitura para todos',
    common400: 'Apenas dono leitura', common750: 'Dono tudo, grupo leitura+exec',
    permDesc: 'Descricao das Permissoes', ownerCan: 'Dono pode', groupCan: 'Grupo pode', othersCan: 'Outros podem',
    introTitle: 'Calculadora Chmod Online Gratuita',
    introText: 'O comando chmod e usado em sistemas Unix/Linux para definir permissoes de arquivos e diretorios.',
    faqTitle: 'Perguntas Frequentes',
    faq1q: 'O que significa chmod 755?', faq1a: 'O dono tem todas as permissoes (rwx), grupo e outros tem leitura e execucao (r-x).',
    faq2q: 'Diferenca entre chmod 644 e 755?', faq2a: '644 da leitura+escrita ao dono, apenas leitura aos outros. 755 adiciona execucao para todos.',
    faq3q: 'chmod 777 e seguro?', faq3a: 'Nao, da todas as permissoes a todos, o que e um risco de seguranca.',
    faq4q: 'Como usar chmod no terminal?', faq4a: 'Use "chmod 755 arquivo.sh". Use -R para aplicar recursivamente.',
    faq5q: 'Diferenca notacao numerica e simbolica?', faq5a: 'Numerica: 3 digitos octais. Simbolica: letras u,g,o,a com r,w,x.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'Chmod Calculator',
    description: 'Bereken Unix/Linux bestandsrechten met interactieve selectievakjes. Genereer chmod commando\'s.',
    owner: 'Eigenaar', group: 'Groep', others: 'Anderen',
    read: 'Lezen', write: 'Schrijven', execute: 'Uitvoeren',
    numericLabel: 'Numeriek', symbolicLabel: 'Symbolisch', commandLabel: 'Commando',
    enterNumeric: 'Voer numerieke rechten in',
    commonTitle: 'Veelgebruikte Rechten',
    common755: 'Eigenaar alles, anderen lezen+uitvoeren', common644: 'Eigenaar lezen+schrijven, anderen lezen',
    common777: 'Alle rechten voor iedereen', common700: 'Alleen eigenaar, volledige toegang',
    common600: 'Alleen eigenaar lezen+schrijven', common444: 'Alleen lezen voor iedereen',
    common400: 'Alleen eigenaar lezen', common750: 'Eigenaar alles, groep lezen+uitvoeren',
    permDesc: 'Beschrijving Rechten', ownerCan: 'Eigenaar kan', groupCan: 'Groep kan', othersCan: 'Anderen kunnen',
    introTitle: 'Gratis Online Chmod Calculator',
    introText: 'Het chmod commando wordt in Unix/Linux gebruikt om bestandsrechten in te stellen.',
    faqTitle: 'Veelgestelde Vragen',
    faq1q: 'Wat betekent chmod 755?', faq1a: 'Eigenaar heeft alle rechten (rwx), groep en anderen hebben lees- en uitvoerrechten (r-x).',
    faq2q: 'Verschil tussen chmod 644 en 755?', faq2a: '644 geeft eigenaar lees+schrijfrechten, anderen alleen lezen. 755 voegt uitvoerrechten toe.',
    faq3q: 'Is chmod 777 veilig?', faq3a: 'Nee, het geeft iedereen alle rechten, wat een beveiligingsrisico is.',
    faq4q: 'Hoe gebruik ik chmod in de terminal?', faq4a: 'Gebruik "chmod 755 bestand.sh". Gebruik -R voor recursieve toepassing.',
    faq5q: 'Verschil numerieke en symbolische notatie?', faq5a: 'Numeriek: 3 octale cijfers. Symbolisch: letters u,g,o,a met r,w,x.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Kalkulator Chmod',
    description: 'Oblicz uprawnienia plikow Unix/Linux z interaktywnymi polami wyboru. Generuj komendy chmod.',
    owner: 'Wlasciciel', group: 'Grupa', others: 'Inni',
    read: 'Odczyt', write: 'Zapis', execute: 'Wykonanie',
    numericLabel: 'Numeryczny', symbolicLabel: 'Symboliczny', commandLabel: 'Komenda',
    enterNumeric: 'Wpisz uprawnienie numeryczne',
    commonTitle: 'Czeste Uprawnienia',
    common755: 'Wlasciciel wszystko, inni odczyt+wyk', common644: 'Wlasciciel odczyt+zapis, inni odczyt',
    common777: 'Wszystkie uprawnienia dla wszystkich', common700: 'Tylko wlasciciel, pelny dostep',
    common600: 'Tylko wlasciciel odczyt+zapis', common444: 'Tylko odczyt dla wszystkich',
    common400: 'Tylko wlasciciel odczyt', common750: 'Wlasciciel wszystko, grupa odczyt+wyk',
    permDesc: 'Opis uprawnien', ownerCan: 'Wlasciciel moze', groupCan: 'Grupa moze', othersCan: 'Inni moga',
    introTitle: 'Darmowy Kalkulator Chmod Online',
    introText: 'Komenda chmod jest uzywana w systemach Unix/Linux do ustawiania uprawnien plikow.',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Co oznacza chmod 755?', faq1a: 'Wlasciciel ma pelne prawa (rwx), grupa i inni maja odczyt i wykonanie (r-x).',
    faq2q: 'Roznica miedzy chmod 644 a 755?', faq2a: '644 daje wlascicielowi odczyt+zapis, innym tylko odczyt. 755 dodaje wykonanie dla wszystkich.',
    faq3q: 'Czy chmod 777 jest bezpieczny?', faq3a: 'Nie, daje wszystkie prawa wszystkim, co stanowi ryzyko bezpieczenstwa.',
    faq4q: 'Jak uzywac chmod w terminalu?', faq4a: 'Uzyj "chmod 755 plik.sh". Uzyj -R dla rekurencyjnego stosowania.',
    faq5q: 'Roznica miedzy notacja numeryczna a symboliczna?', faq5a: 'Numeryczna: 3 cyfry oktalne. Symboliczna: litery u,g,o,a z r,w,x.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Chmod Kalkylator',
    description: 'Berakna Unix/Linux filrattigheter med interaktiva kryssrutor. Generera chmod kommandon.',
    owner: 'Agare', group: 'Grupp', others: 'Andra',
    read: 'Las', write: 'Skriv', execute: 'Kor',
    numericLabel: 'Numerisk', symbolicLabel: 'Symbolisk', commandLabel: 'Kommando',
    enterNumeric: 'Ange numerisk rattighet',
    commonTitle: 'Vanliga Rattigheter',
    common755: 'Agare allt, andra las+kor', common644: 'Agare las+skriv, andra las',
    common777: 'Alla rattigheter for alla', common700: 'Endast agare, full atkomst',
    common600: 'Endast agare las+skriv', common444: 'Endast las for alla',
    common400: 'Endast agare las', common750: 'Agare allt, grupp las+kor',
    permDesc: 'Rattighetsbeskrivning', ownerCan: 'Agaren kan', groupCan: 'Gruppen kan', othersCan: 'Andra kan',
    introTitle: 'Gratis Online Chmod Kalkylator',
    introText: 'Chmod kommandot anvands i Unix/Linux for att satta filrattigheter.',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad betyder chmod 755?', faq1a: 'Agaren har alla rattigheter (rwx), grupp och andra har las och kor (r-x).',
    faq2q: 'Skillnad mellan chmod 644 och 755?', faq2a: '644 ger agaren las+skriv, andra bara las. 755 lagger till kor for alla.',
    faq3q: 'Ar chmod 777 sakert?', faq3a: 'Nej, det ger alla alla rattigheter, vilket ar en saekerhetsrisk.',
    faq4q: 'Hur anvander jag chmod?', faq4a: 'Anvand "chmod 755 fil.sh". Anvand -R for rekursiv tillämpning.',
    faq5q: 'Skillnad numerisk och symbolisk notation?', faq5a: 'Numerisk: 3 oktala siffror. Symbolisk: bokstaverna u,g,o,a med r,w,x.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Chmod Kalkulator',
    description: 'Beregn Unix/Linux filtillatelser med interaktive avkrysningsbokser. Generer chmod kommandoer.',
    owner: 'Eier', group: 'Gruppe', others: 'Andre',
    read: 'Les', write: 'Skriv', execute: 'Kjoer',
    numericLabel: 'Numerisk', symbolicLabel: 'Symbolsk', commandLabel: 'Kommando',
    enterNumeric: 'Skriv inn numerisk tillatelse',
    commonTitle: 'Vanlige Tillatelser',
    common755: 'Eier alt, andre les+kjoer', common644: 'Eier les+skriv, andre les',
    common777: 'Alle tillatelser for alle', common700: 'Kun eier, full tilgang',
    common600: 'Kun eier les+skriv', common444: 'Kun les for alle',
    common400: 'Kun eier les', common750: 'Eier alt, gruppe les+kjoer',
    permDesc: 'Tillatelsebeskrivelse', ownerCan: 'Eier kan', groupCan: 'Gruppe kan', othersCan: 'Andre kan',
    introTitle: 'Gratis Online Chmod Kalkulator',
    introText: 'Chmod kommandoen brukes i Unix/Linux for a sette filtillatelser.',
    faqTitle: 'Vanlige sporrsmal',
    faq1q: 'Hva betyr chmod 755?', faq1a: 'Eier har alle tillatelser (rwx), gruppe og andre har les og kjoer (r-x).',
    faq2q: 'Forskjell mellom chmod 644 og 755?', faq2a: '644 gir eier les+skriv, andre bare les. 755 legger til kjoer for alle.',
    faq3q: 'Er chmod 777 trygt?', faq3a: 'Nei, det gir alle alle tillatelser, som er en sikkerhetsrisiko.',
    faq4q: 'Hvordan bruke chmod?', faq4a: 'Bruk "chmod 755 fil.sh". Bruk -R for rekursiv anvendelse.',
    faq5q: 'Forskjell numerisk og symbolsk notasjon?', faq5a: 'Numerisk: 3 oktale siffer. Symbolsk: bokstavene u,g,o,a med r,w,x.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Kalkulator Chmod',
    description: 'Hitung izin file Unix/Linux dengan kotak centang interaktif. Hasilkan perintah chmod.',
    owner: 'Pemilik', group: 'Grup', others: 'Lainnya',
    read: 'Baca', write: 'Tulis', execute: 'Eksekusi',
    numericLabel: 'Numerik', symbolicLabel: 'Simbolik', commandLabel: 'Perintah',
    enterNumeric: 'Masukkan izin numerik',
    commonTitle: 'Izin Umum',
    common755: 'Pemilik semua, lainnya baca+eksekusi', common644: 'Pemilik baca+tulis, lainnya baca',
    common777: 'Semua izin untuk semua', common700: 'Hanya pemilik, akses penuh',
    common600: 'Hanya pemilik baca+tulis', common444: 'Hanya baca untuk semua',
    common400: 'Hanya pemilik baca', common750: 'Pemilik semua, grup baca+eksekusi',
    permDesc: 'Deskripsi Izin', ownerCan: 'Pemilik bisa', groupCan: 'Grup bisa', othersCan: 'Lainnya bisa',
    introTitle: 'Kalkulator Chmod Online Gratis',
    introText: 'Perintah chmod digunakan di Unix/Linux untuk mengatur izin file.',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Apa arti chmod 755?', faq1a: 'Pemilik memiliki semua izin (rwx), grup dan lainnya memiliki baca dan eksekusi (r-x).',
    faq2q: 'Perbedaan chmod 644 dan 755?', faq2a: '644 memberi pemilik baca+tulis, lainnya hanya baca. 755 menambahkan eksekusi untuk semua.',
    faq3q: 'Apakah chmod 777 aman?', faq3a: 'Tidak, memberikan semua izin kepada semua orang, yang merupakan risiko keamanan.',
    faq4q: 'Cara menggunakan chmod di terminal?', faq4a: 'Gunakan "chmod 755 file.sh". Gunakan -R untuk menerapkan secara rekursif.',
    faq5q: 'Perbedaan notasi numerik dan simbolik?', faq5a: 'Numerik: 3 digit oktal. Simbolik: huruf u,g,o,a dengan r,w,x.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เครื่องคำนวณ Chmod',
    description: 'คำนวณสิทธิ์ไฟล์ Unix/Linux ด้วยช่องทำเครื่องหมายแบบโต้ตอบ สร้างคำสั่ง chmod',
    owner: 'เจ้าของ', group: 'กลุ่ม', others: 'อื่นๆ',
    read: 'อ่าน', write: 'เขียน', execute: 'รัน',
    numericLabel: 'ตัวเลข', symbolicLabel: 'สัญลักษณ์', commandLabel: 'คำสั่ง',
    enterNumeric: 'ป้อนสิทธิ์แบบตัวเลข',
    commonTitle: 'สิทธิ์ที่ใช้บ่อย',
    common755: 'เจ้าของทั้งหมด อื่นๆ อ่าน+รัน', common644: 'เจ้าของอ่าน+เขียน อื่นๆ อ่าน',
    common777: 'สิทธิ์ทั้งหมดสำหรับทุกคน', common700: 'เจ้าของเท่านั้น เข้าถึงเต็มที่',
    common600: 'เจ้าของอ่าน+เขียนเท่านั้น', common444: 'อ่านอย่างเดียวสำหรับทุกคน',
    common400: 'เจ้าของอ่านเท่านั้น', common750: 'เจ้าของทั้งหมด กลุ่มอ่าน+รัน',
    permDesc: 'คำอธิบายสิทธิ์', ownerCan: 'เจ้าของสามารถ', groupCan: 'กลุ่มสามารถ', othersCan: 'อื่นๆ สามารถ',
    introTitle: 'เครื่องคำนวณ Chmod ออนไลน์ฟรี',
    introText: 'คำสั่ง chmod ใช้ในระบบ Unix/Linux เพื่อตั้งค่าสิทธิ์ไฟล์และไดเรกทอรี',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'chmod 755 หมายถึงอะไร?', faq1a: 'เจ้าของมีสิทธิ์ทั้งหมด (rwx) กลุ่มและอื่นๆ มีสิทธิ์อ่านและรัน (r-x)',
    faq2q: 'ความแตกต่างระหว่าง chmod 644 กับ 755?', faq2a: '644 ให้เจ้าของอ่าน+เขียน อื่นๆ อ่านอย่างเดียว 755 เพิ่มสิทธิ์รันให้ทุกคน',
    faq3q: 'chmod 777 ปลอดภัยไหม?', faq3a: 'ไม่ เพราะให้สิทธิ์ทั้งหมดแก่ทุกคน ซึ่งเป็นความเสี่ยงด้านความปลอดภัย',
    faq4q: 'ใช้ chmod ในเทอร์มินัลอย่างไร?', faq4a: 'ใช้ "chmod 755 file.sh" ใช้ -R สำหรับการใช้งานแบบ recursive',
    faq5q: 'ความแตกต่างระหว่างสัญกรณ์ตัวเลขและสัญลักษณ์?', faq5a: 'ตัวเลข: 3 หลักฐานแปด สัญลักษณ์: ตัวอักษร u,g,o,a กับ r,w,x',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

export default function ChmodCalculatorPage() {
  const { lang } = useLang();
  const t = ui[(lang as string) || 'en'] || ui.en;

  const [owner, setOwner] = useState<Permission>({ read: true, write: true, execute: true });
  const [group, setGroup] = useState<Permission>({ read: true, write: false, execute: true });
  const [others, setOthers] = useState<Permission>({ read: true, write: false, execute: true });
  const [numericInput, setNumericInput] = useState('');

  const numeric = useMemo(() => `${permToNumber(owner)}${permToNumber(group)}${permToNumber(others)}`, [owner, group, others]);
  const symbolic = useMemo(() => `-${permToString(owner)}${permToString(group)}${permToString(others)}`, [owner, group, others]);
  const command = `chmod ${numeric} filename`;

  const applyNumeric = (val: string) => {
    setNumericInput(val);
    if (/^[0-7]{3}$/.test(val)) {
      setOwner(numberToPerm(parseInt(val[0])));
      setGroup(numberToPerm(parseInt(val[1])));
      setOthers(numberToPerm(parseInt(val[2])));
    }
  };

  const commonPermissions = [
    { num: '755', desc: t.common755 },
    { num: '644', desc: t.common644 },
    { num: '777', desc: t.common777 },
    { num: '700', desc: t.common700 },
    { num: '600', desc: t.common600 },
    { num: '444', desc: t.common444 },
    { num: '400', desc: t.common400 },
    { num: '750', desc: t.common750 },
  ];

  const renderPermGroup = (label: string, perm: Permission, setPerm: (p: Permission) => void) => (
    <div style={{
      background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
      border: '1px solid var(--border-color)',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: 'var(--accent-blue)' }}>{label}</div>
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { key: 'read' as const, label: t.read, letter: 'r', color: 'var(--accent-emerald)' },
          { key: 'write' as const, label: t.write, letter: 'w', color: 'var(--accent-orange)' },
          { key: 'execute' as const, label: t.execute, letter: 'x', color: 'var(--accent-rose)' },
        ].map(({ key, label: lbl, letter, color }) => (
          <label key={key} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            cursor: 'pointer', padding: '8px 12px', borderRadius: 8,
            background: perm[key] ? `${color}15` : 'transparent',
            border: `1px solid ${perm[key] ? color : 'var(--border-color)'}`,
            transition: 'all 0.15s',
          }}>
            <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'monospace', color: perm[key] ? color : 'var(--text-secondary)' }}>{letter}</span>
            <span style={{ fontSize: 11 }}>{lbl}</span>
            <input type="checkbox" checked={perm[key]} onChange={e => setPerm({ ...perm, [key]: e.target.checked })}
              style={{ accentColor: color }} />
          </label>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', fontSize: 24, fontWeight: 800, fontFamily: 'monospace', color: 'var(--accent-blue)' }}>
          {permToNumber(perm)}
        </div>
      </div>
    </div>
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="chmod-calculator">
      {/* Result Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        <div style={{
          background: 'var(--bg-input)', borderRadius: 10, padding: '16px', textAlign: 'center',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.numericLabel}</div>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{numeric}</div>
          <CopyButton text={numeric} />
        </div>
        <div style={{
          background: 'var(--bg-input)', borderRadius: 10, padding: '16px', textAlign: 'center',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.symbolicLabel}</div>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'monospace', color: 'var(--accent-emerald)' }}>{symbolic}</div>
          <CopyButton text={symbolic} />
        </div>
        <div style={{
          background: 'var(--bg-input)', borderRadius: 10, padding: '16px', textAlign: 'center',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.commandLabel}</div>
          <div style={{ fontSize: 16, fontWeight: 600, fontFamily: 'monospace', color: 'var(--accent-purple)', marginTop: 6 }}>{command}</div>
          <CopyButton text={command} />
        </div>
      </div>

      {/* Numeric Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>{t.enterNumeric}</label>
        <input
          type="text"
          value={numericInput}
          onChange={e => applyNumeric(e.target.value)}
          placeholder="755"
          maxLength={3}
          style={{ width: 120, textAlign: 'center', fontSize: 20, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 8, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)' }}
        />
      </div>

      {/* Permission Checkboxes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        {renderPermGroup(t.owner, owner, setOwner)}
        {renderPermGroup(t.group, group, setGroup)}
        {renderPermGroup(t.others, others, setOthers)}
      </div>

      {/* Permission Description */}
      <div style={{ marginBottom: 20, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{t.permDesc}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
          <div><strong style={{ color: 'var(--accent-blue)' }}>{t.ownerCan}:</strong> {describePermission(permToNumber(owner))}</div>
          <div><strong style={{ color: 'var(--accent-emerald)' }}>{t.groupCan}:</strong> {describePermission(permToNumber(group))}</div>
          <div><strong style={{ color: 'var(--accent-orange)' }}>{t.othersCan}:</strong> {describePermission(permToNumber(others))}</div>
        </div>
      </div>

      {/* Common Permissions */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{t.commonTitle}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
          {commonPermissions.map(({ num, desc }) => (
            <button key={num} onClick={() => applyNumeric(num)}
              className="btn btn-ghost"
              style={{
                display: 'flex', justifyContent: 'space-between', padding: '8px 14px',
                background: numeric === num ? 'var(--accent-blue)15' : undefined,
                border: numeric === num ? '1px solid var(--accent-blue)' : undefined,
              }}>
              <code style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{num}</code>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Intro */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{t.faqTitle}</h2>
        {[
          { q: t.faq1q, a: t.faq1a },
          { q: t.faq2q, a: t.faq2a },
          { q: t.faq3q, a: t.faq3a },
          { q: t.faq4q, a: t.faq4a },
          { q: t.faq5q, a: t.faq5a },
        ].map((faq, i) => (
          <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <summary style={{ fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>{faq.q}</summary>
            <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
          </details>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </ToolLayout>
  );
}
