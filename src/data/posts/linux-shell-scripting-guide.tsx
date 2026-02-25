'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Linux Shell Scripting Guide: Bash Scripting from Beginner to Advanced',
    intro: `Shell scripting is one of the most powerful skills a developer or sysadmin can have. Whether you're automating repetitive tasks, managing servers, or building deployment pipelines, bash scripting saves hours every week. This comprehensive guide covers everything from basic syntax to advanced bash scripting best practices used in production environments.`,
    s1Title: 'Getting Started with Bash Shell Scripting',
    s2Title: 'Variables, Arrays, and Data Types',
    s3Title: 'Control Flow: Conditionals and Loops',
    s4Title: 'Functions and Modular Scripting',
    s5Title: 'Error Handling and Debugging',
    s6Title: 'Bash Scripting Best Practices',
    faqTitle: 'Frequently Asked Questions',
    conclusionTitle: 'Conclusion',
    relatedTitle: 'Related Tools',
  },
  fr: {
    title: 'Guide de scripting shell Linux : de débutant à avancé',
    intro: `Le scripting shell est l'une des compétences les plus puissantes qu'un développeur ou administrateur système puisse posséder.`,
    s1Title: 'Premiers pas avec le scripting Bash',
    s2Title: 'Variables, tableaux et types de données',
    s3Title: 'Flux de contrôle : conditions et boucles',
    s4Title: 'Fonctions et scripts modulaires',
    s5Title: 'Gestion des erreurs et débogage',
    s6Title: 'Bonnes pratiques de scripting Bash',
    faqTitle: 'Questions fréquentes',
    conclusionTitle: 'Conclusion',
    relatedTitle: 'Outils associés',
  },
  de: {
    title: 'Linux Shell Scripting Guide: Bash-Scripting von Anfänger bis Fortgeschrittener',
    intro: `Shell-Scripting ist eine der mächtigsten Fähigkeiten, die ein Entwickler oder Systemadministrator haben kann.`,
    s1Title: 'Einstieg in Bash Shell Scripting',
    s2Title: 'Variablen, Arrays und Datentypen',
    s3Title: 'Kontrollfluss: Bedingungen und Schleifen',
    s4Title: 'Funktionen und modulares Scripting',
    s5Title: 'Fehlerbehandlung und Debugging',
    s6Title: 'Bash Scripting Best Practices',
    faqTitle: 'Häufig gestellte Fragen',
    conclusionTitle: 'Fazit',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Guía completa de scripting shell en Linux: de principiante a avanzado',
    intro: `El scripting shell es una de las habilidades más poderosas que puede tener un desarrollador o administrador de sistemas.`,
    s1Title: 'Introducción al scripting Bash',
    s2Title: 'Variables, arrays y tipos de datos',
    s3Title: 'Flujo de control: condicionales y bucles',
    s4Title: 'Funciones y scripting modular',
    s5Title: 'Manejo de errores y depuración',
    s6Title: 'Mejores prácticas de scripting Bash',
    faqTitle: 'Preguntas frecuentes',
    conclusionTitle: 'Conclusión',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'Guida allo scripting shell Linux: da principiante ad avanzato',
    intro: `Lo scripting shell è una delle competenze più potenti che uno sviluppatore o un amministratore di sistema possa avere.`,
    s1Title: 'Iniziare con lo scripting Bash',
    s2Title: 'Variabili, array e tipi di dati',
    s3Title: 'Flusso di controllo: condizionali e cicli',
    s4Title: 'Funzioni e scripting modulare',
    s5Title: 'Gestione degli errori e debug',
    s6Title: 'Best practice per lo scripting Bash',
    faqTitle: 'Domande frequenti',
    conclusionTitle: 'Conclusione',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Guia de scripting shell Linux: do iniciante ao avançado',
    intro: `O scripting shell é uma das habilidades mais poderosas que um desenvolvedor ou administrador de sistemas pode ter.`,
    s1Title: 'Começando com scripting Bash',
    s2Title: 'Variáveis, arrays e tipos de dados',
    s3Title: 'Fluxo de controle: condicionais e loops',
    s4Title: 'Funções e scripting modular',
    s5Title: 'Tratamento de erros e depuração',
    s6Title: 'Melhores práticas de scripting Bash',
    faqTitle: 'Perguntas frequentes',
    conclusionTitle: 'Conclusão',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'Linux shell scripting gids: van beginner tot gevorderd',
    intro: `Shell scripting is een van de krachtigste vaardigheden die een ontwikkelaar of systeembeheerder kan hebben.`,
    s1Title: 'Aan de slag met Bash shell scripting',
    s2Title: 'Variabelen, arrays en datatypes',
    s3Title: 'Controlestroom: conditionelen en lussen',
    s4Title: 'Functies en modulair scripting',
    s5Title: 'Foutafhandeling en debuggen',
    s6Title: 'Bash scripting best practices',
    faqTitle: 'Veelgestelde vragen',
    conclusionTitle: 'Conclusie',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Przewodnik po skryptach shell Linux: od początkującego do zaawansowanego',
    intro: `Pisanie skryptów powłoki to jedna z najpotężniejszych umiejętności, jaką może posiadać programista lub administrator systemu.`,
    s1Title: 'Pierwsze kroki ze skryptami Bash',
    s2Title: 'Zmienne, tablice i typy danych',
    s3Title: 'Przepływ sterowania: warunki i pętle',
    s4Title: 'Funkcje i modułowe skryptowanie',
    s5Title: 'Obsługa błędów i debugowanie',
    s6Title: 'Najlepsze praktyki skryptowania Bash',
    faqTitle: 'Często zadawane pytania',
    conclusionTitle: 'Podsumowanie',
    relatedTitle: 'Powiązane narzędzia',
  },
  sv: {
    title: 'Linux shell scripting guide: från nybörjare till avancerad',
    intro: `Shell scripting är en av de kraftfullaste färdigheterna en utvecklare eller systemadministratör kan ha.`,
    s1Title: 'Komma igång med Bash shell scripting',
    s2Title: 'Variabler, arrayer och datatyper',
    s3Title: 'Kontrollflöde: villkor och loopar',
    s4Title: 'Funktioner och modulär scripting',
    s5Title: 'Felhantering och felsökning',
    s6Title: 'Bästa praxis för Bash scripting',
    faqTitle: 'Vanliga frågor',
    conclusionTitle: 'Slutsats',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Linux shell scripting guide: fra nybegynner til avansert',
    intro: `Shell scripting er en av de kraftigste ferdighetene en utvikler eller systemadministrator kan ha.`,
    s1Title: 'Komme i gang med Bash shell scripting',
    s2Title: 'Variabler, arrays og datatyper',
    s3Title: 'Kontrollflyt: betingelser og løkker',
    s4Title: 'Funksjoner og modulær scripting',
    s5Title: 'Feilhåndtering og debugging',
    s6Title: 'Beste praksis for Bash scripting',
    faqTitle: 'Ofte stilte spørsmål',
    conclusionTitle: 'Konklusjon',
    relatedTitle: 'Relaterte verktøy',
  },
  zh: {
    title: 'Linux Shell 脚本编程指南：从入门到高级',
    intro: `Shell 脚本编程是开发者或系统管理员最强大的技能之一。无论是自动化重复任务、管理服务器还是构建部署流水线，Bash 脚本每周都能节省大量时间。`,
    s1Title: '开始学习 Bash Shell 脚本',
    s2Title: '变量、数组和数据类型',
    s3Title: '控制流：条件和循环',
    s4Title: '函数和模块化脚本',
    s5Title: '错误处理和调试',
    s6Title: 'Bash 脚本最佳实践',
    faqTitle: '常见问题',
    conclusionTitle: '总结',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'Linux シェルスクリプトガイド：初心者から上級者まで',
    intro: `シェルスクリプトは、開発者やシステム管理者が持つことができる最も強力なスキルの1つです。`,
    s1Title: 'Bash シェルスクリプトを始めよう',
    s2Title: '変数、配列、データ型',
    s3Title: '制御フロー：条件分岐とループ',
    s4Title: '関数とモジュール化スクリプト',
    s5Title: 'エラー処理とデバッグ',
    s6Title: 'Bash スクリプトのベストプラクティス',
    faqTitle: 'よくある質問',
    conclusionTitle: 'まとめ',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Linux 셸 스크립팅 가이드: 초보자부터 고급자까지',
    intro: `셸 스크립팅은 개발자나 시스템 관리자가 가질 수 있는 가장 강력한 기술 중 하나입니다.`,
    s1Title: 'Bash 셸 스크립팅 시작하기',
    s2Title: '변수, 배열 및 데이터 타입',
    s3Title: '제어 흐름: 조건문과 반복문',
    s4Title: '함수와 모듈식 스크립팅',
    s5Title: '오류 처리 및 디버깅',
    s6Title: 'Bash 스크립팅 모범 사례',
    faqTitle: '자주 묻는 질문',
    conclusionTitle: '결론',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Panduan Skrip Shell Linux: dari Pemula hingga Mahir',
    intro: `Skrip shell adalah salah satu keterampilan paling kuat yang dapat dimiliki oleh pengembang atau administrator sistem.`,
    s1Title: 'Memulai dengan Skrip Shell Bash',
    s2Title: 'Variabel, Array, dan Tipe Data',
    s3Title: 'Alur Kontrol: Kondisional dan Loop',
    s4Title: 'Fungsi dan Skrip Modular',
    s5Title: 'Penanganan Kesalahan dan Debugging',
    s6Title: 'Praktik Terbaik Skrip Bash',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    conclusionTitle: 'Kesimpulan',
    relatedTitle: 'Alat Terkait',
  },
  th: {
    title: 'คู่มือ Linux Shell Scripting: จากมือใหม่สู่ขั้นสูง',
    intro: `Shell scripting เป็นหนึ่งในทักษะที่ทรงพลังที่สุดที่นักพัฒนาหรือผู้ดูแลระบบสามารถมีได้`,
    s1Title: 'เริ่มต้นกับ Bash Shell Scripting',
    s2Title: 'ตัวแปร อาร์เรย์ และประเภทข้อมูล',
    s3Title: 'การควบคุมการไหล: เงื่อนไขและลูป',
    s4Title: 'ฟังก์ชันและสคริปต์แบบโมดูลาร์',
    s5Title: 'การจัดการข้อผิดพลาดและการดีบัก',
    s6Title: 'แนวปฏิบัติที่ดีที่สุดสำหรับ Bash Scripting',
    faqTitle: 'คำถามที่พบบ่อย',
    conclusionTitle: 'สรุป',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

export default function LinuxShellScriptingGuide({ lang = 'en' }: { lang?: string }) {
  const s = t[lang] || t['en'];

  const shebangExample = `#!/usr/bin/env bash
# myscript.sh - A well-structured bash script
set -euo pipefail   # Exit on error, unbound var, pipe failure
IFS=$'\\n\\t'       # Safer word splitting

echo "Script started at $(date)"`;

  const variablesExample = `#!/usr/bin/env bash

# Simple variables
NAME="Alice"
AGE=30
PI=3.14159

# Read-only variable
readonly MAX_RETRIES=5

# Arrays
FRUITS=("apple" "banana" "cherry")
echo "\${FRUITS[0]}"      # apple
echo "\${FRUITS[@]}"      # all elements
echo "\${#FRUITS[@]}"     # array length

# Associative arrays (bash 4+)
declare -A CONFIG
CONFIG[host]="localhost"
CONFIG[port]="5432"
CONFIG[db]="myapp"

echo "Connecting to \${CONFIG[host]}:\${CONFIG[port]}"

# Command substitution
CURRENT_USER=\$(whoami)
FILE_COUNT=\$(ls -1 | wc -l)
echo "User \$CURRENT_USER has \$FILE_COUNT files here"`;

  const controlFlowExample = `#!/usr/bin/env bash

# If / elif / else
check_file() {
  local file="\$1"
  if [[ -f "\$file" ]]; then
    echo "\$file is a regular file"
  elif [[ -d "\$file" ]]; then
    echo "\$file is a directory"
  else
    echo "\$file does not exist"
  fi
}

# String comparisons
ENV="\${1:-development}"
case "\$ENV" in
  production)  echo "Running in PRODUCTION" ;;
  staging)     echo "Running in STAGING" ;;
  development) echo "Running in DEVELOPMENT" ;;
  *)           echo "Unknown environment: \$ENV"; exit 1 ;;
esac

# For loop
for i in {1..5}; do
  echo "Iteration \$i"
done

# While loop with counter
COUNTER=0
while [[ \$COUNTER -lt 10 ]]; do
  echo "Count: \$COUNTER"
  ((COUNTER++))
done

# Loop over files
for file in /etc/*.conf; do
  echo "Config file: \$file"
done`;

  const functionsExample = `#!/usr/bin/env bash

# Function with local variables and return value
get_disk_usage() {
  local path="\${1:-/}"
  local threshold="\${2:-80}"
  local usage
  usage=\$(df -h "\$path" | awk 'NR==2 {print \$5}' | tr -d '%')

  if [[ \$usage -gt \$threshold ]]; then
    echo "WARNING: Disk usage at \${usage}% (threshold: \${threshold}%)"
    return 1
  fi
  echo "Disk usage OK: \${usage}%"
  return 0
}

# Logging helper
log() {
  local level="\$1"; shift
  local message="\$*"
  local timestamp
  timestamp=\$(date '+%Y-%m-%d %H:%M:%S')
  echo "[\$timestamp] [\$level] \$message" | tee -a /var/log/myscript.log
}

# Usage
log INFO "Script started"
if ! get_disk_usage / 90; then
  log ERROR "Disk space critical!"
  exit 1
fi`;

  const errorHandlingExample = `#!/usr/bin/env bash
set -euo pipefail

# Trap for cleanup on exit
cleanup() {
  local exit_code=\$?
  echo "Cleaning up temp files..."
  rm -f /tmp/myscript_*
  if [[ \$exit_code -ne 0 ]]; then
    echo "Script failed with exit code \$exit_code"
  fi
}
trap cleanup EXIT

# Trap for specific signals
trap 'echo "Interrupted by user"; exit 130' INT TERM

# Safe file operations
TMPFILE=\$(mktemp /tmp/myscript_XXXXXX)
echo "Working in \$TMPFILE"

# Command with error checking
if ! curl -sf "https://api.example.com/health" > /dev/null; then
  echo "API is unreachable" >&2
  exit 1
fi

# Debug mode: bash -x script.sh
# Or enable inside script:
# set -x   # enable trace
# set +x   # disable trace`;

  const bestPracticesExample = `#!/usr/bin/env bash
# Best Practices Checklist

# 1. Always use shebang with env
#!/usr/bin/env bash

# 2. Set strict mode
set -euo pipefail

# 3. Quote all variables
FILE_PATH="/path/with spaces/file.txt"
cat "\$FILE_PATH"   # correct
cat \$FILE_PATH     # WRONG - word splitting bug

# 4. Use [[ ]] for conditionals (not [ ])
[[ -n "\$VAR" ]] && echo "VAR is set"

# 5. Use local in functions
my_func() {
  local result
  result=\$(compute_something)
  echo "\$result"
}

# 6. Check command existence before using
require_cmd() {
  command -v "\$1" >/dev/null 2>&1 || {
    echo "Required command not found: \$1" >&2
    exit 1
  }
}
require_cmd curl
require_cmd jq

# 7. Use meaningful exit codes
EXIT_OK=0
EXIT_ERR=1
EXIT_USAGE=2`;

  const faqs = [
    {
      q: 'What is the difference between #!/bin/bash and #!/usr/bin/env bash?',
      a: 'Using #!/usr/bin/env bash is more portable because it searches for bash in your PATH, making scripts work on macOS (where bash might be in /usr/local/bin) and Linux alike. Hardcoding #!/bin/bash only works if bash is exactly at /bin/bash.'
    },
    {
      q: 'How do I debug a bash script?',
      a: 'Run your script with bash -x script.sh to enable trace mode, which prints each command before executing it. You can also add set -x inside the script to enable it for specific sections, and set +x to disable. The set -euo pipefail line catches most common errors early.'
    },
    {
      q: 'What does set -euo pipefail do?',
      a: 'set -e exits the script if any command fails. set -u treats unset variables as errors. set -o pipefail makes pipelines fail if any command in the pipeline fails (not just the last one). Together they catch the most common bugs in shell scripts.'
    },
    {
      q: 'How do I pass arguments to a bash script?',
      a: 'Arguments are available as $1, $2, etc. $0 is the script name, $# is the argument count, $@ is all arguments as separate words, and $* is all arguments as one string. Use ${1:-default} to provide a default value when the argument is missing.'
    },
    {
      q: 'How do I read user input in a bash script?',
      a: 'Use the read command: read -p "Enter your name: " name. For passwords, use read -s -p "Password: " password to suppress echo. You can also read from a file line by line with: while IFS= read -r line; do echo "$line"; done < file.txt'
    },
    {
      q: 'How do I schedule a bash script to run automatically?',
      a: 'Use cron for scheduled tasks. Run crontab -e to edit your cron table. The format is: minute hour day month weekday command. For example, 0 2 * * * /path/to/script.sh runs the script every day at 2 AM. Use viadreams.cc cron expression tools to validate your cron syntax.'
    },
  ];

  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold mb-4">{s.title}</h1>

      <p className="text-lg text-gray-700 mb-8">{s.intro}</p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s1Title}</h2>
        <p className="mb-4">
          Every bash script should start with a shebang line and enable strict mode. These two practices alone eliminate a huge class of subtle bugs.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{shebangExample}</code>
        </pre>
        <p className="mb-4">
          The <code>set -euo pipefail</code> combination is essential for production scripts. Without it, your script will silently continue after errors, often causing cascading failures that are hard to diagnose.
        </p>
        <p>
          Save your script with a <code>.sh</code> extension and make it executable: <code>chmod +x myscript.sh</code>. Run it with <code>./myscript.sh</code> or <code>bash myscript.sh</code>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s2Title}</h2>
        <p className="mb-4">
          Bash supports several types of variables: strings, integers, arrays, and associative arrays (dictionaries). Understanding how each works prevents the most common scripting mistakes.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{variablesExample}</code>
        </pre>
        <p className="mb-4">
          Always quote variable expansions: use <code>"\$VAR"</code> instead of <code>\$VAR</code>. Unquoted variables undergo word splitting and glob expansion, which causes bugs when values contain spaces or special characters.
        </p>
        <h3 className="text-xl font-semibold mb-3">String Operations</h3>
        <p>
          Bash provides built-in string manipulation: <code>${VAR#prefix}'}</code> removes a prefix, <code>${VAR%suffix}'}</code> removes a suffix, <code>${VAR/old/new}'}</code> replaces the first occurrence, and <code>${VAR//old/new}'}</code> replaces all occurrences.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s3Title}</h2>
        <p className="mb-4">
          Bash provides if/elif/else, case statements, for loops, while loops, and until loops. The <code>[[ ]]</code> conditional syntax is preferred over the older <code>[ ]</code> because it supports regex matching and prevents word splitting.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{controlFlowExample}</code>
        </pre>
        <p>
          The <code>case</code> statement is cleaner than long if/elif chains for matching against patterns. Use it for argument parsing and environment-specific logic.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s4Title}</h2>
        <p className="mb-4">
          Functions make scripts reusable and testable. Always use <code>local</code> for variables inside functions to prevent polluting the global scope. Functions return exit codes (0–255), not values — use command substitution or output variables to return data.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{functionsExample}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s5Title}</h2>
        <p className="mb-4">
          Robust scripts use <code>trap</code> to handle unexpected exits and signals. This ensures cleanup code runs even if the script exits early due to an error.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{errorHandlingExample}</code>
        </pre>
        <p>
          Use <code>mktemp</code> to create temporary files safely, and always clean them up with a trap. Write error messages to stderr with <code>echo "error" &gt;&amp;2</code> so they don't pollute stdout pipelines.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s6Title}</h2>
        <p className="mb-4">
          Following these conventions will make your scripts maintainable and production-ready:
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{bestPracticesExample}</code>
        </pre>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use ShellCheck (shellcheck.net) to lint your scripts before running them in production</li>
          <li>Keep scripts focused — one script should do one thing well</li>
          <li>Use descriptive variable and function names (no single-letter variables except loop counters)</li>
          <li>Document parameters and expected behavior at the top of each script</li>
          <li>Version control your scripts with Git and test them in a staging environment first</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.faqTitle}</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.conclusionTitle}</h2>
        <p className="mb-4">
          Bash shell scripting is an indispensable skill for modern developers. Start with <code>set -euo pipefail</code> in every script, always quote your variables, use functions to organize logic, and implement proper error handling with <code>trap</code>. With practice, you'll be automating complex workflows confidently.
        </p>
        <p>
          As you advance, explore tools like <code>awk</code>, <code>sed</code>, <code>jq</code> for data processing, and consider writing more complex automation in Python when bash starts feeling limiting. The key is choosing the right tool for each task.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">{s.relatedTitle}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Link href="/tools/json-formatter" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JSON Formatter</Link>
          <Link href="/tools/yaml-validator" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">YAML Validator</Link>
          <Link href="/tools/base64-decoder" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">Base64 Decoder</Link>
          <Link href="/tools/regex-tester" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">Regex Tester</Link>
          <Link href="/tools/jwt-decoder" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JWT Decoder</Link>
          <Link href="/tools/json-diff-tool" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JSON Diff Tool</Link>
        </div>
      </section>
    </article>
  );
}
