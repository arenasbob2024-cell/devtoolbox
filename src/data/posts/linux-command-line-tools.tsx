'use client';
import React from 'react';

const codeFdRipgrep = `# fd: modern find replacement (written in Rust)
# Faster, respects .gitignore, simpler syntax

# Install
brew install fd          # macOS
apt install fd-find      # Ubuntu/Debian (binary is 'fdfind')

# Find files by name (case-insensitive by default)
fd config                # finds files named 'config', 'Config.js', etc.
fd '\\.tsx$'              # regex: all .tsx files
fd -e ts -e tsx          # by extension (no dot)
fd -t d src              # type: directory named 'src'
fd -t f -x wc -l        # find files, run 'wc -l' on each (parallel)

# ripgrep (rg): grep replacement -- blazing fast, respects .gitignore
# Install: brew install ripgrep / apt install ripgrep

# Basic search
rg 'useState'                       # search current dir recursively
rg 'TODO|FIXME' --glob '*.ts'       # glob filter
rg -l 'console\\.log'               # list file names only
rg -n 'export default' src/         # show line numbers

# Context lines
rg -C 3 'throw new Error'           # 3 lines before and after
rg -A 5 'async function fetchUser'  # 5 lines after match

# Type filtering (rg knows language extensions)
rg --type ts 'interface'            # TypeScript files only
rg --type-add 'web:*.{html,css,js}' --type web 'font-face'`;

const codeBatEza = `# bat: cat with syntax highlighting, line numbers, git diffs
# Install: brew install bat / apt install bat (binary may be 'batcat')

# Basic usage
bat README.md                       # with syntax highlighting
bat src/index.ts                    # TypeScript highlighted
bat --style=plain file.txt          # no decorations (pipe-safe)
bat --paging=never file.txt         # don't use pager

# Show git changes inline (like 'diff')
bat --diff src/app.ts               # highlight lines changed vs git

# As a colorized pager for man pages
export MANPAGER="sh -c 'col -bx | bat -l man -p'"

# eza: modern ls replacement (was exa, now maintained fork)
# Install: brew install eza / apt install eza

# Basic usage
eza                                 # color-coded by file type
eza -l                              # long listing (like ls -l)
eza -la                             # include hidden files
eza --tree                          # tree view
eza --tree --level=2                # tree, max 2 levels deep
eza -l --git                        # show git status per file
eza --sort=modified                 # sort by modification time
eza -lh --group                     # human sizes, group by owner

# Useful aliases
alias ls='eza --color=auto'
alias ll='eza -l --git'
alias la='eza -la --git'
alias lt='eza --tree --level=2'`;

const codeDeltaZoxide = `# delta: syntax-highlighting pager for git diffs
# Install: brew install git-delta / cargo install git-delta

# Configure in ~/.gitconfig
[core]
    pager = delta

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true      # n/N to jump between diff sections
    light = false        # set to true for light terminal
    side-by-side = true  # show old/new side by side
    line-numbers = true
    syntax-theme = Dracula

# Now all git diff/log/show output is highlighted
git diff HEAD~1
git log -p --follow -- src/utils.ts
git show a1b2c3d

# zoxide: smarter cd that learns your habits
# Install: brew install zoxide / apt install zoxide

# Add to ~/.zshrc or ~/.bashrc:
eval "$(zoxide init zsh)"    # for zsh
eval "$(zoxide init bash)"   # for bash

# Usage -- z learns directories you visit frequently
z project         # jump to most-used directory matching 'project'
z dev tool        # multiple terms: matches paths containing both
zi                # interactive mode: fuzzy search with fzf

# After a few days of normal use:
z dev             # /Users/you/Development/my-project
z dt              # /Users/you/devtoolbox
z log             # /var/log  or wherever you go most often`;

const codeFzfJq = `# fzf: command-line fuzzy finder -- connects everything together
# Install: brew install fzf / apt install fzf

# Interactive file picker
vim $(fzf)                          # open any file in vim
code $(fzf --preview 'bat {}')      # open in VS Code with preview

# Shell history search (Ctrl+R replacement)
export FZF_CTRL_R_OPTS="--sort --exact"

# Pipe into fzf for interactive selection
git branch | fzf | xargs git checkout    # interactive branch switcher
docker ps | fzf | awk '{print $1}' | xargs docker stop

# jq: JSON processor for the command line
# Install: brew install jq / apt install jq

# Basic extraction
curl -s https://api.github.com/repos/sharkdp/fd | jq '.stargazers_count'
cat package.json | jq '.dependencies | keys'
cat data.json | jq '.users[] | {name, email}'

# Filtering and transformation
cat users.json | jq '[.[] | select(.active == true)] | length'
cat logs.json  | jq '.[] | select(.level == "error") | .message'

# Build new structure
cat data.json | jq '{ total: length, names: [.[].name] }'

# Compact output (single line)
cat pretty.json | jq -c .           # minified JSON output`;

const codeHttpieXh = `# HTTPie / xh: human-friendly HTTP clients
# HTTPie: pip install httpie  |  brew install httpie
# xh (Rust, faster): brew install xh / cargo install xh

# GET request
http GET https://api.example.com/users
xh GET https://api.example.com/users         # same, xh syntax

# POST JSON (auto-detected from key=value syntax)
http POST https://api.example.com/users \\
  name="Alice" \\
  email="alice@example.com" \\
  role=admin

# With headers and auth
http GET https://api.example.com/profile \\
  Authorization:"Bearer $TOKEN" \\
  Accept:application/json

# Form data
http --form POST https://example.com/upload file@/path/to/file.txt

# Download file
http --download https://example.com/file.zip

# Save session (cookies, headers) between requests
http --session=./session.json POST https://api.example.com/login \\
  username=admin password=secret

http --session=./session.json GET https://api.example.com/dashboard`;

const codeShellAliases = `# Productivity shell aliases and functions
# Add to ~/.zshrc or ~/.bashrc

# Navigation
alias ..='cd ..'
alias ...='cd ../..'

# Safety nets
alias rm='rm -i'            # confirm before delete
alias cp='cp -i'            # confirm before overwrite
alias mv='mv -i'

# One-line process management
alias psg='ps aux | grep -v grep | grep -i'
alias ports='ss -tlnp'      # listening ports (Linux)
alias myip='curl -s ifconfig.me'

# Git shortcuts
alias gs='git status -sb'
alias ga='git add -p'       # interactive staging
alias gl='git log --oneline --graph --decorate -20'

# Modern replacements (if installed)
command -v fd  > /dev/null && alias find='fd'
command -v rg  > /dev/null && alias grep='rg'
command -v bat > /dev/null && alias cat='bat --paging=never'
command -v eza > /dev/null && alias ls='eza'

# Useful functions
mkcd() { mkdir -p "$1" && cd "$1"; }          # mkdir + cd
extract() {                                    # universal archive extractor
  case "$1" in
    *.tar.gz)  tar xzf "$1"  ;;
    *.tar.bz2) tar xjf "$1"  ;;
    *.zip)     unzip "$1"    ;;
    *.gz)      gunzip "$1"   ;;
    *.7z)      7z x "$1"     ;;
    *) echo "Unknown format: $1" ;;
  esac
}`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Linux Command Line Tools Every Developer Should Know in 2026',
    intro: 'The classic UNIX tools (find, grep, cat, ls) still work, but a new generation of Rust-powered replacements offers significantly better performance, sensible defaults, and developer-friendly output. This guide covers fd, ripgrep, bat, eza, delta, zoxide, fzf, jq, and HTTPie.',
    fdTitle: 'fd and ripgrep: Find and Search, Supercharged',
    fdDesc: 'fd replaces find with sane defaults (respects .gitignore, case-insensitive, color output). ripgrep replaces grep with 10-100x faster search through large codebases.',
    batTitle: 'bat and eza: Better cat and ls',
    batDesc: 'bat adds syntax highlighting and git diff integration to cat. eza replaces ls with git status indicators, human-readable sizes by default, and tree output.',
    deltaTitle: 'delta and zoxide: Git Diffs and Smart Navigation',
    deltaDesc: 'delta transforms git diff output with syntax highlighting and side-by-side view. zoxide learns your most-visited directories and lets you jump there with 1-2 letter commands.',
    fzfTitle: 'fzf and jq: Fuzzy Finding and JSON Processing',
    fzfDesc: 'fzf adds interactive fuzzy search to any command. jq is the standard tool for parsing, filtering, and transforming JSON data in shell scripts and API work.',
    httpTitle: 'HTTPie and xh: Human-Friendly HTTP Clients',
    httpDesc: 'HTTPie and xh offer intuitive syntax for making HTTP requests, with automatic JSON formatting, session management, and clear output — replacing curl for development work.',
    aliasTitle: 'Shell Aliases and Productivity Functions',
    aliasDesc: 'Good aliases and shell functions reduce repetitive typing. This section covers safety aliases, git shortcuts, and universal helper functions like mkcd and extract.',
    comparisonTitle: 'Classic vs Modern Tool Comparison',
    faqTitle: 'Frequently Asked Questions',
    faqQ1: 'Will these tools work on macOS?',
    faqA1: 'Yes. All tools listed are cross-platform. Install via Homebrew: brew install fd ripgrep bat eza git-delta zoxide fzf jq httpie. For Linux, use your package manager (apt, dnf, pacman) or cargo install for Rust tools.',
    faqQ2: 'Is it safe to alias grep to rg?',
    faqA2: 'For interactive use, yes. But be careful in scripts — ripgrep has slightly different flag compatibility. A safer approach is to use rg explicitly in scripts and only alias for your interactive shell sessions.',
    faqQ3: 'How do fzf and zoxide compare?',
    faqA3: 'They solve different problems. zoxide learns from your cd history and lets you jump to frequent directories with z keyword. fzf is a general fuzzy finder that integrates with any command output. They complement each other: zi uses fzf inside zoxide for interactive selection.',
    faqQ4: 'Should I use HTTPie or curl in scripts?',
    faqA4: 'For automation and scripts, curl is more portable (pre-installed everywhere) and has more options. HTTPie/xh are better for interactive development and API testing. Use xh for scripts where you control the environment since it is a single binary.',
    relatedTools: 'Related Tools',
  },
  zh: {
    title: '2026 年每位开发者应掌握的 Linux 命令行工具',
    intro: '经典 UNIX 工具（find、grep、cat、ls）依然有效，但新一代 Rust 驱动的替代品提供了显著更好的性能、合理的默认值和对开发者友好的输出。本指南涵盖 fd、ripgrep、bat、eza、delta、zoxide、fzf、jq 和 HTTPie。',
    fdTitle: 'fd 和 ripgrep：增强版查找与搜索',
    fdDesc: 'fd 以合理的默认值替代 find（遵守 .gitignore、不区分大小写、彩色输出）。ripgrep 替代 grep，在大型代码库中搜索速度提升 10-100 倍。',
    batTitle: 'bat 和 eza：更好的 cat 和 ls',
    batDesc: 'bat 为 cat 增加了语法高亮和 git diff 集成。eza 以 git 状态指示器、默认人类可读的文件大小和树形输出替代 ls。',
    deltaTitle: 'delta 和 zoxide：Git 差异与智能导航',
    deltaDesc: 'delta 通过语法高亮和并排视图改造 git diff 输出。zoxide 学习你最常访问的目录，让你用 1-2 个字母命令跳转过去。',
    fzfTitle: 'fzf 和 jq：模糊搜索与 JSON 处理',
    fzfDesc: 'fzf 为任何命令添加交互式模糊搜索。jq 是 shell 脚本和 API 工作中解析、过滤和转换 JSON 数据的标准工具。',
    httpTitle: 'HTTPie 和 xh：对开发者友好的 HTTP 客户端',
    httpDesc: 'HTTPie 和 xh 提供直观的 HTTP 请求语法，具有自动 JSON 格式化、会话管理和清晰的输出——在开发工作中替代 curl。',
    aliasTitle: 'Shell 别名与生产力函数',
    aliasDesc: '好的别名和 shell 函数可以减少重复输入。本节涵盖安全别名、git 快捷键和通用辅助函数，如 mkcd 和 extract。',
    comparisonTitle: '经典工具 vs 现代工具对比',
    faqTitle: '常见问题',
    faqQ1: '这些工具在 macOS 上能用吗？',
    faqA1: '能。所有列出的工具都是跨平台的。通过 Homebrew 安装：brew install fd ripgrep bat eza git-delta zoxide fzf jq httpie。Linux 上使用包管理器（apt、dnf、pacman）或 cargo install 安装 Rust 工具。',
    faqQ2: '将 grep 别名为 rg 安全吗？',
    faqA2: '交互使用时可以。但在脚本中需谨慎——ripgrep 的参数兼容性略有不同。更安全的做法是在脚本中显式使用 rg，只在交互式 shell 会话中设置别名。',
    faqQ3: 'fzf 和 zoxide 有何区别？',
    faqA3: '它们解决不同的问题。zoxide 从 cd 历史中学习，让你用 z 关键字跳转到常用目录。fzf 是与任何命令输出集成的通用模糊查找器。两者互补：zi 在 zoxide 内部使用 fzf 进行交互式选择。',
    faqQ4: '脚本中应该用 HTTPie 还是 curl？',
    faqA4: '自动化和脚本中，curl 更具移植性（随处预装）且选项更多。HTTPie/xh 更适合交互式开发和 API 测试。在你能控制环境的脚本中可使用 xh，因为它是单一二进制文件。',
    relatedTools: '相关工具',
  },
  fr: {
    title: 'Outils en ligne de commande Linux que tout développeur devrait connaître en 2026',
    intro: 'Les outils UNIX classiques fonctionnent toujours, mais une nouvelle génération propulsée par Rust offre de meilleures performances.',
    fdTitle: 'fd et ripgrep : recherche surpuissante',
    fdDesc: 'fd remplace find avec des comportements sensés. ripgrep remplace grep avec une vitesse 10-100x supérieure.',
    batTitle: 'bat et eza : un meilleur cat et ls',
    batDesc: 'bat ajoute la coloration syntaxique à cat. eza remplace ls avec des indicateurs git.',
    deltaTitle: 'delta et zoxide : diffs git et navigation intelligente',
    deltaDesc: 'delta transforme la sortie de git diff. zoxide apprend vos répertoires fréquents.',
    fzfTitle: 'fzf et jq : recherche floue et traitement JSON',
    fzfDesc: 'fzf ajoute la recherche floue interactive. jq est l\'outil standard pour JSON.',
    httpTitle: 'HTTPie et xh : clients HTTP conviviaux',
    httpDesc: 'HTTPie et xh offrent une syntaxe intuitive pour les requêtes HTTP.',
    aliasTitle: 'Alias shell et fonctions de productivité',
    aliasDesc: 'De bons alias et fonctions shell réduisent la saisie répétitive.',
    comparisonTitle: 'Comparaison des outils classiques vs modernes',
    faqTitle: 'Questions fréquentes',
    faqQ1: 'Ces outils fonctionnent-ils sur macOS ?',
    faqA1: 'Oui, tous sont multiplateforme. Installez via Homebrew ou apt/dnf.',
    faqQ2: 'Est-il sûr d\'alias grep en rg ?',
    faqA2: 'Pour l\'usage interactif, oui. Mais soyez prudent dans les scripts.',
    faqQ3: 'Comment fzf et zoxide se comparent-ils ?',
    faqA3: 'Ils résolvent des problèmes différents et se complètent.',
    faqQ4: 'Dois-je utiliser HTTPie ou curl dans les scripts ?',
    faqA4: 'curl est plus portable pour l\'automatisation. HTTPie/xh sont meilleurs pour le développement interactif.',
    relatedTools: 'Outils associés',
  },
  de: {
    title: 'Linux-Befehlszeilentools, die jeder Entwickler 2026 kennen sollte',
    intro: 'Die klassischen UNIX-Tools funktionieren noch, aber eine neue Generation von Rust-Tools bietet erheblich bessere Leistung.',
    fdTitle: 'fd und ripgrep: Supercharged Suche',
    fdDesc: 'fd ersetzt find mit vernünftigen Standardwerten. ripgrep ersetzt grep mit 10-100x höherer Geschwindigkeit.',
    batTitle: 'bat und eza: Besseres cat und ls',
    batDesc: 'bat fügt Syntaxhervorhebung zu cat hinzu. eza ersetzt ls mit Git-Status-Indikatoren.',
    deltaTitle: 'delta und zoxide: Git-Diffs und intelligente Navigation',
    deltaDesc: 'delta transformiert git-diff-Ausgaben. zoxide lernt Ihre häufig besuchten Verzeichnisse.',
    fzfTitle: 'fzf und jq: Fuzzy-Suche und JSON-Verarbeitung',
    fzfDesc: 'fzf fügt interaktive Fuzzy-Suche zu jedem Befehl hinzu. jq ist das Standardtool für JSON.',
    httpTitle: 'HTTPie und xh: Entwicklerfreundliche HTTP-Clients',
    httpDesc: 'HTTPie und xh bieten intuitive Syntax für HTTP-Anfragen.',
    aliasTitle: 'Shell-Aliase und Produktivitätsfunktionen',
    aliasDesc: 'Gute Aliase und Shell-Funktionen reduzieren wiederholtes Tippen.',
    comparisonTitle: 'Klassische vs. moderne Werkzeuge',
    faqTitle: 'Häufig gestellte Fragen',
    faqQ1: 'Funktionieren diese Tools auf macOS?',
    faqA1: 'Ja, alle sind plattformübergreifend. Installation über Homebrew oder apt/dnf.',
    faqQ2: 'Ist es sicher, grep auf rg zu aliasieren?',
    faqA2: 'Für den interaktiven Einsatz ja, aber in Skripten mit Vorsicht.',
    faqQ3: 'Wie vergleichen sich fzf und zoxide?',
    faqA3: 'Sie lösen unterschiedliche Probleme und ergänzen sich.',
    faqQ4: 'Soll ich HTTPie oder curl in Skripten verwenden?',
    faqA4: 'curl ist portabler für Automatisierung. HTTPie/xh sind besser für interaktive Entwicklung.',
    relatedTools: 'Verwandte Tools',
  },
  es: {
    title: 'Herramientas de línea de comandos Linux que todo desarrollador debería conocer en 2026',
    intro: 'Las herramientas UNIX clásicas siguen funcionando, pero una nueva generación impulsada por Rust ofrece un rendimiento significativamente mejor.',
    fdTitle: 'fd y ripgrep: búsqueda potenciada',
    fdDesc: 'fd reemplaza find con valores predeterminados sensatos. ripgrep reemplaza grep con velocidad 10-100x mayor.',
    batTitle: 'bat y eza: mejor cat y ls',
    batDesc: 'bat añade resaltado de sintaxis a cat. eza reemplaza ls con indicadores de git.',
    deltaTitle: 'delta y zoxide: diffs de git y navegación inteligente',
    deltaDesc: 'delta transforma la salida de git diff. zoxide aprende tus directorios frecuentes.',
    fzfTitle: 'fzf y jq: búsqueda difusa y procesamiento JSON',
    fzfDesc: 'fzf añade búsqueda difusa interactiva. jq es la herramienta estándar para JSON.',
    httpTitle: 'HTTPie y xh: clientes HTTP amigables',
    httpDesc: 'HTTPie y xh ofrecen sintaxis intuitiva para solicitudes HTTP.',
    aliasTitle: 'Alias de shell y funciones de productividad',
    aliasDesc: 'Los buenos alias y funciones de shell reducen la escritura repetitiva.',
    comparisonTitle: 'Herramientas clásicas vs modernas',
    faqTitle: 'Preguntas frecuentes',
    faqQ1: '¿Estas herramientas funcionan en macOS?',
    faqA1: 'Sí, todas son multiplataforma. Instale via Homebrew o apt/dnf.',
    faqQ2: '¿Es seguro crear un alias de grep a rg?',
    faqA2: 'Para uso interactivo, sí. Pero tenga cuidado en los scripts.',
    faqQ3: '¿Cómo se comparan fzf y zoxide?',
    faqA3: 'Resuelven diferentes problemas y se complementan entre sí.',
    faqQ4: '¿Debo usar HTTPie o curl en scripts?',
    faqA4: 'curl es más portable para automatización. HTTPie/xh son mejores para desarrollo interactivo.',
    relatedTools: 'Herramientas relacionadas',
  },
  ja: {
    title: '2026年すべての開発者が知っておくべきLinuxコマンドラインツール',
    intro: '古典的なUNIXツール（find、grep、cat、ls）はまだ機能しますが、Rust製の新世代ツールははるかに優れたパフォーマンスを提供します。',
    fdTitle: 'fdとripgrep：強化されたファイル検索とコンテンツ検索',
    fdDesc: 'fdは合理的なデフォルトでfindを置き換えます。ripgrepはgrepより10-100倍高速です。',
    batTitle: 'batとeza：より良いcatとls',
    batDesc: 'batはcatにシンタックスハイライトを追加します。ezaはgitステータス表示付きでlsを置き換えます。',
    deltaTitle: 'deltaとzoxide：gitの差分とスマートナビゲーション',
    deltaDesc: 'deltaはgit diffの出力を改善します。zoxideは頻繁に訪れるディレクトリを学習します。',
    fzfTitle: 'fzfとjq：ファジー検索とJSON処理',
    fzfDesc: 'fzfは任意のコマンドにインタラクティブなファジー検索を追加します。jqはJSONを処理する標準ツールです。',
    httpTitle: 'HTTPieとxh：開発者に優しいHTTPクライアント',
    httpDesc: 'HTTPieとxhは自動JSONフォーマットでHTTPリクエストの直感的な構文を提供します。',
    aliasTitle: 'シェルエイリアスと生産性関数',
    aliasDesc: '良いエイリアスとシェル関数は繰り返しの入力を減らします。',
    comparisonTitle: 'クラシックツールvs.モダンツールの比較',
    faqTitle: 'よくある質問',
    faqQ1: 'これらのツールはmacOSで動作しますか？',
    faqA1: 'はい、すべてクロスプラットフォームです。Homebrewまたはapt/dnfでインストールできます。',
    faqQ2: 'grepをrgにエイリアスするのは安全ですか？',
    faqA2: 'インタラクティブな使用には安全ですが、スクリプトでは注意が必要です。',
    faqQ3: 'fzfとzoxideはどう違いますか？',
    faqA3: '異なる問題を解決し、互いを補完します。',
    faqQ4: 'スクリプトでHTTPieとcurlのどちらを使うべきですか？',
    faqA4: 'curlは自動化に移植性が高く、HTTPie/xhはインタラクティブな開発に適しています。',
    relatedTools: '関連ツール',
  },
  ko: {
    title: '2026년 모든 개발자가 알아야 할 Linux 커맨드라인 도구',
    intro: '클래식 UNIX 도구(find, grep, cat, ls)는 여전히 작동하지만, Rust 기반의 새 세대 도구들은 훨씬 더 나은 성능을 제공합니다.',
    fdTitle: 'fd와 ripgrep: 강화된 파일 및 콘텐츠 검색',
    fdDesc: 'fd는 합리적인 기본값으로 find를 대체합니다. ripgrep은 grep보다 10-100배 빠릅니다.',
    batTitle: 'bat와 eza: 더 나은 cat과 ls',
    batDesc: 'bat는 cat에 구문 강조를 추가합니다. eza는 git 상태 표시와 함께 ls를 대체합니다.',
    deltaTitle: 'delta와 zoxide: git diff와 스마트 탐색',
    deltaDesc: 'delta는 git diff 출력을 개선합니다. zoxide는 자주 방문하는 디렉터리를 학습합니다.',
    fzfTitle: 'fzf와 jq: 퍼지 검색과 JSON 처리',
    fzfDesc: 'fzf는 모든 명령에 대화형 퍼지 검색을 추가합니다. jq는 JSON 처리의 표준 도구입니다.',
    httpTitle: 'HTTPie와 xh: 개발자 친화적 HTTP 클라이언트',
    httpDesc: 'HTTPie와 xh는 자동 JSON 형식으로 HTTP 요청을 위한 직관적인 구문을 제공합니다.',
    aliasTitle: '쉘 별칭과 생산성 함수',
    aliasDesc: '좋은 별칭과 쉘 함수는 반복적인 입력을 줄여줍니다.',
    comparisonTitle: '클래식 도구 vs 현대 도구 비교',
    faqTitle: '자주 묻는 질문',
    faqQ1: '이 도구들이 macOS에서 작동하나요?',
    faqA1: '예, 모두 크로스플랫폼입니다. Homebrew 또는 apt/dnf로 설치할 수 있습니다.',
    faqQ2: 'grep을 rg로 별칭하는 것이 안전한가요?',
    faqA2: '대화형 사용에는 안전하지만, 스크립트에서는 주의가 필요합니다.',
    faqQ3: 'fzf와 zoxide는 어떻게 다른가요?',
    faqA3: '서로 다른 문제를 해결하며 보완적입니다.',
    faqQ4: '스크립트에서 HTTPie와 curl 중 어느 것을 사용해야 하나요?',
    faqA4: 'curl은 자동화에 더 이식성이 높고, HTTPie/xh는 대화형 개발에 더 좋습니다.',
    relatedTools: '관련 도구',
  },
  pt: {
    title: 'Ferramentas de linha de comando Linux que todo desenvolvedor deve conhecer em 2026',
    intro: 'As ferramentas UNIX clássicas ainda funcionam, mas uma nova geração impulsionada por Rust oferece desempenho muito melhor.',
    fdTitle: 'fd e ripgrep: pesquisa potencializada',
    fdDesc: 'fd substitui find com padrões sensatos. ripgrep substitui grep com velocidade 10-100x maior.',
    batTitle: 'bat e eza: cat e ls melhores',
    batDesc: 'bat adiciona destaque de sintaxe ao cat. eza substitui ls com indicadores de git.',
    deltaTitle: 'delta e zoxide: diffs git e navegação inteligente',
    deltaDesc: 'delta transforma a saída do git diff. zoxide aprende seus diretórios frequentes.',
    fzfTitle: 'fzf e jq: busca fuzzy e processamento JSON',
    fzfDesc: 'fzf adiciona busca fuzzy interativa. jq é a ferramenta padrão para JSON.',
    httpTitle: 'HTTPie e xh: clientes HTTP amigáveis ao desenvolvedor',
    httpDesc: 'HTTPie e xh oferecem sintaxe intuitiva para requisições HTTP.',
    aliasTitle: 'Aliases de shell e funções de produtividade',
    aliasDesc: 'Bons aliases e funções shell reduzem a digitação repetitiva.',
    comparisonTitle: 'Comparação de ferramentas clássicas vs modernas',
    faqTitle: 'Perguntas frequentes',
    faqQ1: 'Essas ferramentas funcionam no macOS?',
    faqA1: 'Sim, todas são multiplataforma. Instale via Homebrew ou apt/dnf.',
    faqQ2: 'É seguro criar alias de grep para rg?',
    faqA2: 'Para uso interativo, sim. Mas tenha cuidado em scripts.',
    faqQ3: 'Como fzf e zoxide se comparam?',
    faqA3: 'Eles resolvem problemas diferentes e se complementam.',
    faqQ4: 'Devo usar HTTPie ou curl em scripts?',
    faqA4: 'curl é mais portátil para automação. HTTPie/xh são melhores para desenvolvimento interativo.',
    relatedTools: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'Linux opdrachtregel-tools die elke ontwikkelaar zou moeten kennen in 2026',
    intro: 'De klassieke UNIX-tools werken nog steeds, maar een nieuwe generatie Rust-aangedreven tools biedt aanzienlijk betere prestaties.',
    fdTitle: 'fd en ripgrep: krachtige zoekfunctionaliteit',
    fdDesc: 'fd vervangt find met verstandige standaardinstellingen. ripgrep vervangt grep met 10-100x hogere snelheid.',
    batTitle: 'bat en eza: betere cat en ls',
    batDesc: 'bat voegt syntaxismarkering toe aan cat. eza vervangt ls met git-statusindikatoren.',
    deltaTitle: 'delta en zoxide: git-diffs en slimme navigatie',
    deltaDesc: 'delta transformeert git-diff-uitvoer. zoxide leert uw veelgebruikte mappen.',
    fzfTitle: 'fzf en jq: fuzzy zoeken en JSON-verwerking',
    fzfDesc: 'fzf voegt interactief fuzzy zoeken toe. jq is de standaardtool voor JSON.',
    httpTitle: 'HTTPie en xh: ontwikkelaarsvriendelijke HTTP-clients',
    httpDesc: 'HTTPie en xh bieden intuïtieve syntaxis voor HTTP-verzoeken.',
    aliasTitle: 'Shell-aliassen en productiviteitsfuncties',
    aliasDesc: 'Goede aliassen en shell-functies verminderen repetitief typen.',
    comparisonTitle: 'Vergelijking van klassieke vs moderne tools',
    faqTitle: 'Veelgestelde vragen',
    faqQ1: 'Werken deze tools op macOS?',
    faqA1: 'Ja, alle zijn platformonafhankelijk. Installeer via Homebrew of apt/dnf.',
    faqQ2: 'Is het veilig om grep te aliasen naar rg?',
    faqA2: 'Voor interactief gebruik wel, maar wees voorzichtig in scripts.',
    faqQ3: 'Hoe vergelijken fzf en zoxide zich?',
    faqA3: 'Ze lossen verschillende problemen op en vullen elkaar aan.',
    faqQ4: 'Moet ik HTTPie of curl gebruiken in scripts?',
    faqA4: 'curl is beter draagbaar voor automatisering. HTTPie/xh zijn beter voor interactieve ontwikkeling.',
    relatedTools: 'Gerelateerde tools',
  },
  it: {
    title: 'Strumenti da riga di comando Linux che ogni sviluppatore dovrebbe conoscere nel 2026',
    intro: 'Gli strumenti UNIX classici funzionano ancora, ma una nuova generazione di strumenti Rust offre prestazioni significativamente migliori.',
    fdTitle: 'fd e ripgrep: ricerca potenziata',
    fdDesc: 'fd sostituisce find con impostazioni predefinite sensate. ripgrep sostituisce grep con velocità 10-100x maggiore.',
    batTitle: 'bat e eza: cat e ls migliori',
    batDesc: 'bat aggiunge la colorazione della sintassi a cat. eza sostituisce ls con indicatori git.',
    deltaTitle: 'delta e zoxide: diff git e navigazione intelligente',
    deltaDesc: 'delta trasforma l\'output di git diff. zoxide impara le tue directory frequenti.',
    fzfTitle: 'fzf e jq: ricerca fuzzy e elaborazione JSON',
    fzfDesc: 'fzf aggiunge la ricerca fuzzy interattiva. jq è lo strumento standard per JSON.',
    httpTitle: 'HTTPie e xh: client HTTP amichevoli per sviluppatori',
    httpDesc: 'HTTPie e xh offrono sintassi intuitiva per le richieste HTTP.',
    aliasTitle: 'Alias shell e funzioni di produttività',
    aliasDesc: 'Buoni alias e funzioni shell riducono la digitazione ripetitiva.',
    comparisonTitle: 'Confronto strumenti classici vs moderni',
    faqTitle: 'Domande frequenti',
    faqQ1: 'Questi strumenti funzionano su macOS?',
    faqA1: 'Sì, tutti sono multipiattaforma. Installa tramite Homebrew o apt/dnf.',
    faqQ2: 'È sicuro creare un alias di grep in rg?',
    faqA2: 'Per l\'uso interattivo, sì. Ma fai attenzione negli script.',
    faqQ3: 'Come si confrontano fzf e zoxide?',
    faqA3: 'Risolvono problemi diversi e si completano a vicenda.',
    faqQ4: 'Devo usare HTTPie o curl negli script?',
    faqA4: 'curl è più portabile per l\'automazione. HTTPie/xh sono migliori per lo sviluppo interattivo.',
    relatedTools: 'Strumenti correlati',
  },
  pl: {
    title: 'Narzędzia wiersza poleceń Linux, które każdy programista powinien znać w 2026 roku',
    intro: 'Klasyczne narzędzia UNIX nadal działają, ale nowa generacja narzędzi opartych na Rust oferuje znacznie lepszą wydajność.',
    fdTitle: 'fd i ripgrep: wzmocnione wyszukiwanie',
    fdDesc: 'fd zastępuje find z rozsądnymi wartościami domyślnymi. ripgrep zastępuje grep z 10-100x większą szybkością.',
    batTitle: 'bat i eza: lepszy cat i ls',
    batDesc: 'bat dodaje podświetlanie składni do cat. eza zastępuje ls z wskaźnikami git.',
    deltaTitle: 'delta i zoxide: diff git i inteligentna nawigacja',
    deltaDesc: 'delta przekształca wyjście git diff. zoxide uczy się Twoich częstych katalogów.',
    fzfTitle: 'fzf i jq: wyszukiwanie rozmyte i przetwarzanie JSON',
    fzfDesc: 'fzf dodaje interaktywne wyszukiwanie rozmyte. jq to standardowe narzędzie do JSON.',
    httpTitle: 'HTTPie i xh: przyjazne dla programistów klienty HTTP',
    httpDesc: 'HTTPie i xh oferują intuicyjną składnię żądań HTTP.',
    aliasTitle: 'Aliasy powłoki i funkcje produktywności',
    aliasDesc: 'Dobre aliasy i funkcje powłoki redukują powtarzające się pisanie.',
    comparisonTitle: 'Porównanie narzędzi klasycznych vs nowoczesnych',
    faqTitle: 'Często zadawane pytania',
    faqQ1: 'Czy te narzędzia działają na macOS?',
    faqA1: 'Tak, wszystkie są wieloplatformowe. Zainstaluj przez Homebrew lub apt/dnf.',
    faqQ2: 'Czy bezpieczne jest aliasowanie grep do rg?',
    faqA2: 'Do interaktywnego użytku tak, ale w skryptach zachowaj ostrożność.',
    faqQ3: 'Jak porównują się fzf i zoxide?',
    faqA3: 'Rozwiązują różne problemy i się uzupełniają.',
    faqQ4: 'Czy powinienem używać HTTPie czy curl w skryptach?',
    faqA4: 'curl jest bardziej przenośny dla automatyzacji. HTTPie/xh są lepsze do interaktywnego tworzenia.',
    relatedTools: 'Powiązane narzędzia',
  },
  sv: {
    title: 'Linux kommandoradsverktyg som varje utvecklare bör känna till 2026',
    intro: 'De klassiska UNIX-verktygen fungerar fortfarande, men en ny generation Rust-drivna verktyg erbjuder avsevärt bättre prestanda.',
    fdTitle: 'fd och ripgrep: kraftfull sökning',
    fdDesc: 'fd ersätter find med vettiga standardinställningar. ripgrep ersätter grep med 10-100x högre hastighet.',
    batTitle: 'bat och eza: bättre cat och ls',
    batDesc: 'bat lägger till syntaxmarkering i cat. eza ersätter ls med git-statusindikatorer.',
    deltaTitle: 'delta och zoxide: git-diffs och smart navigering',
    deltaDesc: 'delta transformerar git diff-utdata. zoxide lär sig dina vanliga kataloger.',
    fzfTitle: 'fzf och jq: fuzzy-sökning och JSON-bearbetning',
    fzfDesc: 'fzf lägger till interaktiv fuzzy-sökning. jq är standardverktyget för JSON.',
    httpTitle: 'HTTPie och xh: utvecklarvänliga HTTP-klienter',
    httpDesc: 'HTTPie och xh erbjuder intuitiv syntax för HTTP-förfrågningar.',
    aliasTitle: 'Shell-alias och produktivitetsfunktioner',
    aliasDesc: 'Bra alias och shell-funktioner minskar repetitiv inmatning.',
    comparisonTitle: 'Jämförelse av klassiska vs moderna verktyg',
    faqTitle: 'Vanliga frågor',
    faqQ1: 'Fungerar dessa verktyg på macOS?',
    faqA1: 'Ja, alla är plattformsoberoende. Installera via Homebrew eller apt/dnf.',
    faqQ2: 'Är det säkert att aliasa grep till rg?',
    faqA2: 'För interaktiv användning ja, men var försiktig i skript.',
    faqQ3: 'Hur jämförs fzf och zoxide?',
    faqA3: 'De löser olika problem och kompletterar varandra.',
    faqQ4: 'Ska jag använda HTTPie eller curl i skript?',
    faqA4: 'curl är mer portabelt för automatisering. HTTPie/xh är bättre för interaktiv utveckling.',
    relatedTools: 'Relaterade verktyg',
  },
  no: {
    title: 'Linux kommandolinjeverktøy enhver utvikler bør kjenne i 2026',
    intro: 'De klassiske UNIX-verktøyene fungerer fortsatt, men en ny generasjon Rust-drevne verktøy tilbyr betydelig bedre ytelse.',
    fdTitle: 'fd og ripgrep: kraftig søk',
    fdDesc: 'fd erstatter find med fornuftige standardinnstillinger. ripgrep erstatter grep med 10-100x høyere hastighet.',
    batTitle: 'bat og eza: bedre cat og ls',
    batDesc: 'bat legger til syntaksmarkering i cat. eza erstatter ls med git-statusindikatorer.',
    deltaTitle: 'delta og zoxide: git-diffs og smart navigering',
    deltaDesc: 'delta transformerer git diff-utdata. zoxide lærer dine hyppige kataloger.',
    fzfTitle: 'fzf og jq: fuzzy-søk og JSON-behandling',
    fzfDesc: 'fzf legger til interaktivt fuzzy-søk. jq er standardverktøyet for JSON.',
    httpTitle: 'HTTPie og xh: utviklervennlige HTTP-klienter',
    httpDesc: 'HTTPie og xh tilbyr intuitiv syntaks for HTTP-forespørsler.',
    aliasTitle: 'Shell-aliaser og produktivitetsfunksjoner',
    aliasDesc: 'Gode aliaser og shell-funksjoner reduserer repetitiv skriving.',
    comparisonTitle: 'Sammenligning av klassiske vs moderne verktøy',
    faqTitle: 'Vanlige spørsmål',
    faqQ1: 'Fungerer disse verktøyene på macOS?',
    faqA1: 'Ja, alle er plattformuavhengige. Installer via Homebrew eller apt/dnf.',
    faqQ2: 'Er det trygt å aliase grep til rg?',
    faqA2: 'For interaktiv bruk ja, men vær forsiktig i skript.',
    faqQ3: 'Hvordan sammenlignes fzf og zoxide?',
    faqA3: 'De løser ulike problemer og utfyller hverandre.',
    faqQ4: 'Bør jeg bruke HTTPie eller curl i skript?',
    faqA4: 'curl er mer bærbart for automatisering. HTTPie/xh er bedre for interaktiv utvikling.',
    relatedTools: 'Relaterte verktøy',
  },
  id: {
    title: 'Alat baris perintah Linux yang harus diketahui setiap pengembang di tahun 2026',
    intro: 'Alat UNIX klasik masih berfungsi, tetapi generasi baru alat berbasis Rust menawarkan kinerja yang jauh lebih baik.',
    fdTitle: 'fd dan ripgrep: pencarian yang ditingkatkan',
    fdDesc: 'fd menggantikan find dengan default yang masuk akal. ripgrep menggantikan grep dengan kecepatan 10-100x lebih tinggi.',
    batTitle: 'bat dan eza: cat dan ls yang lebih baik',
    batDesc: 'bat menambahkan penyorotan sintaks ke cat. eza menggantikan ls dengan indikator git.',
    deltaTitle: 'delta dan zoxide: git diff dan navigasi cerdas',
    deltaDesc: 'delta mengubah output git diff. zoxide mempelajari direktori yang sering dikunjungi.',
    fzfTitle: 'fzf dan jq: pencarian fuzzy dan pemrosesan JSON',
    fzfDesc: 'fzf menambahkan pencarian fuzzy interaktif. jq adalah alat standar untuk JSON.',
    httpTitle: 'HTTPie dan xh: klien HTTP yang ramah pengembang',
    httpDesc: 'HTTPie dan xh menawarkan sintaks intuitif untuk permintaan HTTP.',
    aliasTitle: 'Alias shell dan fungsi produktivitas',
    aliasDesc: 'Alias dan fungsi shell yang baik mengurangi pengetikan berulang.',
    comparisonTitle: 'Perbandingan alat klasik vs modern',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faqQ1: 'Apakah alat-alat ini bekerja di macOS?',
    faqA1: 'Ya, semuanya lintas platform. Instal melalui Homebrew atau apt/dnf.',
    faqQ2: 'Apakah aman untuk mengalias grep ke rg?',
    faqA2: 'Untuk penggunaan interaktif, ya. Tapi berhati-hatilah dalam skrip.',
    faqQ3: 'Bagaimana perbandingan fzf dan zoxide?',
    faqA3: 'Mereka menyelesaikan masalah berbeda dan saling melengkapi.',
    faqQ4: 'Haruskah saya menggunakan HTTPie atau curl dalam skrip?',
    faqA4: 'curl lebih portabel untuk otomatisasi. HTTPie/xh lebih baik untuk pengembangan interaktif.',
    relatedTools: 'Alat terkait',
  },
  th: {
    title: 'เครื่องมือบรรทัดคำสั่ง Linux ที่นักพัฒนาทุกคนควรรู้ในปี 2026',
    intro: 'เครื่องมือ UNIX แบบคลาสสิกยังคงใช้งานได้ แต่รุ่นใหม่ที่ขับเคลื่อนด้วย Rust มอบประสิทธิภาพที่ดีกว่ามาก',
    fdTitle: 'fd และ ripgrep: การค้นหาที่ได้รับการปรับปรุง',
    fdDesc: 'fd แทนที่ find ด้วยค่าเริ่มต้นที่สมเหตุสมผล ripgrep แทนที่ grep ด้วยความเร็ว 10-100 เท่า',
    batTitle: 'bat และ eza: cat และ ls ที่ดีกว่า',
    batDesc: 'bat เพิ่มการเน้นไวยากรณ์ให้กับ cat eza แทนที่ ls ด้วยตัวบ่งชี้ git',
    deltaTitle: 'delta และ zoxide: git diff และการนำทางอัจฉริยะ',
    deltaDesc: 'delta แปลงผลลัพธ์ git diff zoxide เรียนรู้ไดเรกทอรีที่คุณใช้บ่อย',
    fzfTitle: 'fzf และ jq: การค้นหาแบบ fuzzy และการประมวลผล JSON',
    fzfDesc: 'fzf เพิ่มการค้นหาแบบ fuzzy เชิงโต้ตอบ jq เป็นเครื่องมือมาตรฐานสำหรับ JSON',
    httpTitle: 'HTTPie และ xh: HTTP client ที่เป็นมิตรกับนักพัฒนา',
    httpDesc: 'HTTPie และ xh มอบไวยากรณ์ที่ใช้งานง่ายสำหรับคำขอ HTTP',
    aliasTitle: 'Shell alias และฟังก์ชันเพิ่มประสิทธิภาพ',
    aliasDesc: 'Alias และฟังก์ชัน shell ที่ดีช่วยลดการพิมพ์ซ้ำ',
    comparisonTitle: 'การเปรียบเทียบเครื่องมือแบบคลาสสิกและสมัยใหม่',
    faqTitle: 'คำถามที่พบบ่อย',
    faqQ1: 'เครื่องมือเหล่านี้ใช้งานได้บน macOS ไหม?',
    faqA1: 'ใช่ ทั้งหมดเป็น cross-platform ติดตั้งผ่าน Homebrew หรือ apt/dnf',
    faqQ2: 'การใช้ alias grep เป็น rg ปลอดภัยไหม?',
    faqA2: 'สำหรับการใช้งานเชิงโต้ตอบ ใช่ แต่ระวังในสคริปต์',
    faqQ3: 'fzf และ zoxide แตกต่างกันอย่างไร?',
    faqA3: 'พวกเขาแก้ปัญหาที่แตกต่างกันและเสริมซึ่งกันและกัน',
    faqQ4: 'ควรใช้ HTTPie หรือ curl ในสคริปต์?',
    faqA4: 'curl พกพาได้ดีกว่าสำหรับการทำงานอัตโนมัติ HTTPie/xh ดีกว่าสำหรับการพัฒนาเชิงโต้ตอบ',
    relatedTools: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

export default function LinuxCommandLineTools({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faqQ1, acceptedAnswer: { '@type': 'Answer', text: t.faqA1 } },
      { '@type': 'Question', name: t.faqQ2, acceptedAnswer: { '@type': 'Answer', text: t.faqA2 } },
      { '@type': 'Question', name: t.faqQ3, acceptedAnswer: { '@type': 'Answer', text: t.faqA3 } },
      { '@type': 'Question', name: t.faqQ4, acceptedAnswer: { '@type': 'Answer', text: t.faqA4 } },
    ],
  };

  const toolRows = [
    { classic: 'find', modern: 'fd', lang: 'Rust', keyDiff: 'Respects .gitignore, case-insensitive by default, regex support' },
    { classic: 'grep', modern: 'ripgrep (rg)', lang: 'Rust', keyDiff: '10-100x faster, parallel search, respects .gitignore' },
    { classic: 'cat', modern: 'bat', lang: 'Rust', keyDiff: 'Syntax highlighting, line numbers, git diff integration' },
    { classic: 'ls', modern: 'eza', lang: 'Rust', keyDiff: 'Colors, git status, icons, tree view, human sizes default' },
    { classic: 'diff / git diff', modern: 'delta', lang: 'Rust', keyDiff: 'Syntax highlighting, side-by-side, line numbers, themes' },
    { classic: 'cd', modern: 'zoxide (z)', lang: 'Rust', keyDiff: 'Frecency-based jump, interactive with fzf (zi)' },
    { classic: 'Ctrl+R history', modern: 'fzf', lang: 'Go', keyDiff: 'Fuzzy search, composable with any command, preview pane' },
    { classic: 'python -m json.tool', modern: 'jq', lang: 'C', keyDiff: 'Filter, transform, query — full DSL for JSON' },
    { classic: 'curl', modern: 'httpie / xh', lang: 'Python/Rust', keyDiff: 'Human-readable output, auto JSON, session management' },
  ];

  const preStyle: React.CSSProperties = {
    background: '#1c1c2e',
    color: '#cdd6f4',
    padding: '1.25rem',
    borderRadius: '0.5rem',
    overflowX: 'auto',
    fontSize: '0.85rem',
    lineHeight: '1.7',
    margin: '1rem 0',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-3xl font-bold mb-4 text-gray-900">{t.title}</h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">{t.intro}</p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.fdTitle}</h2>
        <p className="text-gray-600 mb-3">{t.fdDesc}</p>
        <pre style={preStyle}><code>{codeFdRipgrep}</code></pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.batTitle}</h2>
        <p className="text-gray-600 mb-3">{t.batDesc}</p>
        <pre style={preStyle}><code>{codeBatEza}</code></pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.deltaTitle}</h2>
        <p className="text-gray-600 mb-3">{t.deltaDesc}</p>
        <pre style={preStyle}><code>{codeDeltaZoxide}</code></pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.fzfTitle}</h2>
        <p className="text-gray-600 mb-3">{t.fzfDesc}</p>
        <pre style={preStyle}><code>{codeFzfJq}</code></pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.httpTitle}</h2>
        <p className="text-gray-600 mb-3">{t.httpDesc}</p>
        <pre style={preStyle}><code>{codeHttpieXh}</code></pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.aliasTitle}</h2>
        <p className="text-gray-600 mb-3">{t.aliasDesc}</p>
        <pre style={preStyle}><code>{codeShellAliases}</code></pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t.comparisonTitle}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Classic</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Modern</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Language</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Key Improvements</th>
              </tr>
            </thead>
            <tbody>
              {toolRows.map((row, i) => (
                <tr key={row.classic} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-200 px-4 py-2 font-mono text-gray-600">{row.classic}</td>
                  <td className="border border-gray-200 px-4 py-2 font-mono font-medium text-green-700">{row.modern}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{row.lang}</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-600">{row.keyDiff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t.faqTitle}</h2>
        <div className="space-y-4">
          {[
            { q: t.faqQ1, a: t.faqA1 },
            { q: t.faqQ2, a: t.faqA2 },
            { q: t.faqQ3, a: t.faqA3 },
            { q: t.faqQ4, a: t.faqA4 },
          ].map(({ q, a }) => (
            <div key={q} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-800">{t.relatedTools}</h2>
        <div className="flex flex-wrap gap-2">
          {['regex-tester', 'json-formatter', 'url-encoder', 'base64-encoder', 'cron-parser'].map(tool => (
            <a
              key={tool}
              href={`/${lang}/tools/${tool}`}
              className="inline-block bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm transition-colors"
            >
              {tool}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
