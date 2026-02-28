'use client';
import React from 'react';

const translations: Record<string, {
  title: string;
  description: string;
  toc: string[];
  tldr: string;
  takeaways: string[];
  body: Record<string, string>;
}> = {
  en: {
    title: 'Starship Prompt Complete Guide 2026: The Cross-Shell Prompt That Works Everywhere',
    description: 'Master Starship — the minimal, fast, and infinitely customizable cross-shell prompt. Covers installation, starship.toml configuration, modules, git status, language detection, cloud contexts, presets, Nerd Fonts, performance tuning, and power-user tips for Bash, Zsh, Fish, PowerShell, and Nushell.',
    toc: [
      'What Is Starship and Why It Matters',
      'Starship vs Oh My Zsh vs Powerlevel10k vs Pure',
      'Installation',
      'Shell Setup (Bash, Zsh, Fish, PowerShell, Nushell, Cmd, Elvish, Tcsh, Xonsh)',
      'starship.toml Configuration Basics',
      'Module System Overview',
      'Git Status Module',
      'Language Detection Modules',
      'Cloud and Kubernetes Modules',
      'Docker Context Module',
      'Directory Module Customization',
      'Custom Modules',
      'Command Duration and Execution Time',
      'Battery Module',
      'Time and Username Modules',
      'Nerd Font Icons and Symbols',
      'Color and Style Customization',
      'Preset Themes',
      'Performance Comparison',
      'Right Prompt Configuration',
      'Conditional Modules',
      'Integration with tmux and screen',
      'Creating and Sharing Presets',
      'Common Configurations by Use Case',
      'Tips and Tricks for Power Users',
      'FAQ',
    ],
    tldr: 'Starship is a minimal, blazing-fast, cross-shell prompt written in Rust. It works with Bash, Zsh, Fish, PowerShell, Nushell, and more. It auto-detects your project context — Git branch, language versions, cloud provider, Docker context — and displays only what is relevant. Configuration lives in a single starship.toml file. In 2026, Starship remains the gold standard for developers who want a beautiful, informative prompt without shell-specific lock-in or performance penalties.',
    takeaways: [
      'Starship is written in Rust and renders prompts in under 10ms, making it one of the fastest prompt tools available',
      'A single starship.toml configures the prompt identically across Bash, Zsh, Fish, PowerShell, Nushell, and 4 other shells',
      'Over 50 built-in modules auto-detect Git status, language runtimes, cloud contexts, Docker, battery level, and more',
      'Nerd Font icons provide a visually rich experience with glyphs for every language and tool',
      'Built-in presets like Tokyo Night, Gruvbox Rainbow, and Pastel Powerline let you switch themes instantly',
      'Custom modules let you display any shell command output directly in the prompt',
    ],
    body: {
      introP1: 'Your terminal prompt is the most-viewed piece of text in your development workflow. It greets you thousands of times a day, yet most developers use a default prompt that shows nothing more than a dollar sign and a path. A great prompt tells you what branch you are on, whether you have uncommitted changes, what language runtime is active, and which cloud context you are targeting — all without running a single command.',
      introP2: 'Starship is the answer to every prompt frustration. Written in Rust for speed, designed for cross-shell compatibility, and configured through a single TOML file, Starship has become the de facto standard prompt for modern developers. This guide covers everything from installation to advanced customization, with real configuration examples you can copy directly into your starship.toml.',
      whatTitle: 'What Is Starship and Why It Matters',
      whatP1: 'Starship is an open-source, cross-shell prompt written in Rust. It replaces your default shell prompt with a context-aware, information-rich line that automatically adapts to your current project. Walk into a Node.js project and Starship shows the Node version. Switch to a Python virtualenv and it displays the environment name. Check out a Git branch and it reveals the branch name with ahead/behind counts, staged changes, and untracked files.',
      whatP2: 'Why does a cross-shell prompt matter? Developers frequently switch between shells — Bash on remote servers, Zsh on macOS, Fish on personal machines, PowerShell on Windows workstations. Shell-specific prompt frameworks like Oh My Zsh only work in one shell. Starship works everywhere with identical configuration, identical appearance, and identical behavior.',
      whatList1: 'Cross-shell: one config file for Bash, Zsh, Fish, PowerShell, Nushell, Cmd, Elvish, Tcsh, Xonsh',
      whatList2: 'Blazing fast: written in Rust, renders in under 10ms even with many modules enabled',
      whatList3: 'Context-aware: auto-detects Git, Node, Python, Rust, Go, Java, Docker, Kubernetes, AWS, GCP, Azure',
      whatList4: 'Single-file config: everything lives in ~/.config/starship.toml',
      whatList5: 'Over 50 built-in modules with sensible defaults — works great out of the box',
      whatList6: 'Active community with 45,000+ GitHub stars and frequent releases',
      compTitle: 'Starship vs Oh My Zsh vs Powerlevel10k vs Pure',
      compDesc: 'Each prompt tool serves different needs. This comparison helps you understand where Starship excels and where alternatives might be a better fit.',
      installTitle: 'Installation',
      installDesc: 'Starship distributes as a single binary. Install it with your preferred method, then add the init script to your shell configuration.',
      shellTitle: 'Shell Setup (Bash, Zsh, Fish, PowerShell, Nushell, Cmd, Elvish, Tcsh, Xonsh)',
      shellDesc: 'After installing the Starship binary, you need to add a single line to your shell configuration file to activate it. Here is the init command for each supported shell.',
      tomlTitle: 'starship.toml Configuration Basics',
      tomlP1: 'All Starship configuration lives in ~/.config/starship.toml (or the path set by the STARSHIP_CONFIG environment variable). The file uses TOML format with sections for the overall prompt format and individual modules.',
      tomlP2: 'The top-level format key defines the prompt layout. Each module has its own section with options like format, style, symbol, and disabled. You can also set scan_timeout and command_timeout at the top level to control performance.',
      moduleTitle: 'Module System Overview',
      moduleP1: 'Starship uses a modular architecture. Each piece of information in your prompt is a module — git_branch, nodejs, python, directory, and so on. Modules are only shown when relevant: the nodejs module appears only when a package.json or .node-version file is detected in the current directory tree.',
      moduleP2: 'The default format string includes all built-in modules in a sensible order. You can override this to reorder modules, remove ones you do not need, or add custom modules. Each module supports a format string that controls exactly what text and symbols are displayed.',
      gitTitle: 'Git Status Module',
      gitP1: 'The Git modules are the most popular Starship features. The git_branch module shows the current branch name with a customizable symbol. The git_status module displays a compact summary of your working tree state: staged, modified, untracked, deleted, renamed, and stashed counts, plus ahead/behind information relative to the upstream branch.',
      gitP2: 'You can customize every symbol in git_status. The default symbols are concise but you can replace them with Nerd Font icons or emoji for a more visual experience. The git_commit module shows the current commit hash when in detached HEAD state, and git_state shows when you are in the middle of a rebase, merge, cherry-pick, or bisect.',
      langTitle: 'Language Detection Modules',
      langP1: 'Starship includes modules for virtually every programming language and runtime. Each language module detects specific files (like package.json for Node.js, Cargo.toml for Rust, or pyproject.toml for Python) and displays the active version. This is incredibly useful when switching between projects that require different runtime versions.',
      langP2: 'You can customize the symbol, style, and version format for each language module. The detect_files, detect_folders, and detect_extensions options let you fine-tune when each module activates.',
      cloudTitle: 'Cloud and Kubernetes Modules',
      cloudP1: 'For DevOps and cloud engineers, Starship provides modules for AWS, Google Cloud, Azure, and Kubernetes. The aws module reads your AWS_PROFILE and region, the gcloud module shows the active GCP project and region, and the kubernetes module displays the current cluster and namespace from your kubeconfig.',
      cloudP2: 'These modules are disabled by default to avoid performance overhead for developers who do not use cloud CLIs. Enable them in your starship.toml when needed.',
      dockerTitle: 'Docker Context Module',
      dockerP1: 'The docker_context module displays the current Docker context, which is critical when switching between local development, remote Docker hosts, and container orchestration platforms. It only appears when the context is not set to the default, reducing prompt noise.',
      dirTitle: 'Directory Module Customization',
      dirP1: 'The directory module controls how the current path is displayed. By default, Starship truncates long paths to three parent directories. You can customize the truncation length, truncation symbol, substitutions (replace long paths like ~/Developer/projects with short aliases), and whether to show the read-only symbol for directories where you lack write permission.',
      customTitle: 'Custom Modules',
      customP1: 'Custom modules let you display any shell command output in your prompt. This is Starship\'s escape hatch for information that no built-in module covers. Define a custom module with a command, a when condition, and a format string. Starship caches the output based on the command_timeout setting.',
      customP2: 'Common custom module use cases include showing the current Terraform workspace, displaying the active tmux session, showing the number of background jobs, or indicating VPN connection status.',
      durationTitle: 'Command Duration and Execution Time',
      durationP1: 'The cmd_duration module shows how long the last command took to execute. By default it only appears when the command took longer than 2 seconds, keeping the prompt clean for quick commands. You can customize the threshold, format, and whether to show millisecond precision.',
      batteryTitle: 'Battery Module',
      batteryP1: 'The battery module displays the current battery level and charging status. It is useful for laptop users who want a quick indicator without looking at the system tray. You can define custom thresholds with different symbols and styles for each battery level range.',
      timeTitle: 'Time and Username Modules',
      timeP1: 'The time module shows the current time in a configurable format. It is disabled by default but useful for developers who want timestamps in their terminal history. The username module displays the current user, which is especially helpful when SSHing into remote servers to confirm which user you are logged in as.',
      nerdTitle: 'Nerd Font Icons and Symbols',
      nerdP1: 'Nerd Fonts are patched fonts that include thousands of icons from Font Awesome, Devicons, Octicons, and other icon sets. Starship uses Nerd Font symbols by default for language icons, Git symbols, and other glyphs. To see these icons correctly, install a Nerd Font and set it as your terminal font.',
      nerdP2: 'Popular Nerd Font choices include FiraCode Nerd Font, JetBrainsMono Nerd Font, and Hack Nerd Font. If you prefer not to use Nerd Fonts, Starship provides a text-only preset that replaces all icons with plain ASCII characters.',
      colorTitle: 'Color and Style Customization',
      colorP1: 'Starship styles use a string format that combines foreground color, background color, and text attributes. The format is "fg:color bg:color attributes" where attributes include bold, italic, underline, dimmed, inverted, and strikethrough. Colors can be standard terminal color names, hex codes, or ANSI 256 color numbers.',
      presetTitle: 'Preset Themes',
      presetP1: 'Starship ships with several built-in presets that completely change the look and feel of your prompt. Apply a preset with the starship preset command, which overwrites your starship.toml with the preset configuration.',
      presetP2: 'You can use a preset as a starting point and then customize individual modules. The preset command also supports outputting to stdout so you can review the configuration before applying it.',
      perfTitle: 'Performance Comparison',
      perfP1: 'Prompt performance matters because a slow prompt makes every command feel sluggish. Starship is written in Rust and optimized for speed. It runs each module in parallel and caches results aggressively. The typical render time is 5-15ms, compared to 50-200ms for Oh My Zsh themes and 20-50ms for Powerlevel10k with instant prompt disabled.',
      perfP2: 'You can benchmark your Starship configuration with the built-in timings command, which breaks down render time by module so you can identify and disable slow modules.',
      rightTitle: 'Right Prompt Configuration',
      rightP1: 'Starship supports right-side prompts in shells that support them (Zsh, Fish, PowerShell, Elvish, Nushell). The right_format key in starship.toml defines what appears on the right side. Common choices include the time module, command duration, and status code.',
      condTitle: 'Conditional Modules',
      condP1: 'You can make modules appear only in certain directories by combining the detect_files, detect_folders, and detect_extensions options. Custom modules support a when condition that runs a shell command and shows the module only when the command succeeds (exit code 0).',
      condP2: 'This is useful for showing project-specific information: display the Terraform workspace only in directories containing .tf files, or show a custom deployment target only when a deploy.yaml is present.',
      tmuxTitle: 'Integration with tmux and screen',
      tmuxP1: 'Starship works seamlessly inside tmux and GNU screen sessions. Since Starship modifies the shell prompt (not the terminal emulator), it renders correctly regardless of the terminal multiplexer. For tmux users, you can show the active tmux session name in your prompt using a custom module.',
      shareTitle: 'Creating and Sharing Presets',
      shareP1: 'To create a shareable preset, craft your starship.toml with all desired module configurations, then share the file directly or host it as a URL. Others can apply it with starship preset or by copying the file to their config directory. The Starship community maintains a repository of user-contributed presets.',
      usecaseTitle: 'Common Configurations by Use Case',
      usecaseP1: 'Different workflows benefit from different prompt configurations. Here are optimized setups for three common developer profiles.',
      usecaseWeb: 'Web Development',
      usecaseDevops: 'DevOps / Cloud Engineering',
      usecaseData: 'Data Science / ML',
      tipsTitle: 'Tips and Tricks for Power Users',
      tip1: 'Use starship timings to identify slow modules and optimize your prompt render time',
      tip2: 'Set STARSHIP_CACHE to a ramdisk path for even faster module caching on Linux',
      tip3: 'Use env_var module to display custom environment variables like API endpoints or deployment targets',
      tip4: 'Combine directory substitutions to create short aliases for deep project paths',
      tip5: 'Use the status module to show exit codes and signal names for failed commands',
      tip6: 'Set scan_timeout to a lower value (like 20ms) on slow filesystems such as NFS or SSHFS',
      tip7: 'Add a line_break module between the info line and the input line for a two-line prompt layout',
      tip8: 'Use palettes in starship.toml to define reusable color names for consistent theming',
      faqTitle: 'Frequently Asked Questions',
      faq1Q: 'Is Starship free and open source?',
      faq1A: 'Yes, Starship is completely free and open source under the ISC license. The source code is on GitHub at starship/starship and contributions are welcome.',
      faq2Q: 'Does Starship slow down my terminal?',
      faq2A: 'No. Starship is written in Rust and renders in under 10ms for most configurations. It is significantly faster than shell-based prompt frameworks like Oh My Zsh. Use starship timings to verify performance.',
      faq3Q: 'Do I need Nerd Fonts for Starship?',
      faq3A: 'Not strictly. Starship works without Nerd Fonts but some symbols will display as missing characters. Use the starship preset plain-text-symbols command to switch to a text-only configuration, or install a Nerd Font for the best visual experience.',
      faq4Q: 'Can Starship replace Oh My Zsh?',
      faq4A: 'Starship replaces the prompt/theme component of Oh My Zsh. It does not replace Oh My Zsh plugins for aliases, completions, and shell functions. Many developers use Oh My Zsh for plugins while using Starship for the prompt by disabling the Oh My Zsh theme.',
      faq5Q: 'How do I configure Starship for multiple shells?',
      faq5A: 'Starship uses a single ~/.config/starship.toml file that applies to all shells. Add the eval "$(starship init bash)" or equivalent init command to each shell config file. The same TOML file produces an identical prompt across all shells.',
      faq6Q: 'Can I use Starship over SSH?',
      faq6A: 'Yes. Install Starship on the remote server and add the init command to the remote shell config. The prompt will render on the remote server. Alternatively, some users sync their starship.toml to remote machines using dotfile managers.',
      faq7Q: 'How do I update Starship?',
      faq7A: 'Update through your package manager: brew upgrade starship on macOS, curl -sS https://starship.rs/install.sh | sh on Linux, scoop update starship on Windows, or cargo install starship if installed via Cargo.',
      faq8Q: 'How do I show only specific modules?',
      faq8A: 'Override the format key in starship.toml to list only the modules you want. For example, format = "$directory$git_branch$git_status$character" shows only the directory, git branch, git status, and prompt character, hiding all other modules.',
    },
  },
  zh: {
    title: 'Starship 跨 Shell 提示符完全指南 2026：适用于所有终端的最佳提示符',
    description: '掌握 Starship — 极简、极速、无限可定制的跨 Shell 提示符。涵盖安装、starship.toml 配置、模块系统、Git 状态、语言检测、云上下文、预设主题、Nerd Fonts、性能调优及 Bash、Zsh、Fish、PowerShell、Nushell 的高级技巧。',
    toc: [
      '什么是 Starship 以及为什么它很重要',
      'Starship vs Oh My Zsh vs Powerlevel10k vs Pure',
      '安装',
      'Shell 配置（Bash、Zsh、Fish、PowerShell、Nushell、Cmd、Elvish、Tcsh、Xonsh）',
      'starship.toml 配置基础',
      '模块系统概览',
      'Git 状态模块',
      '语言检测模块',
      '云和 Kubernetes 模块',
      'Docker 上下文模块',
      '目录模块自定义',
      '自定义模块',
      '命令耗时和执行时间',
      '电池模块',
      '时间和用户名模块',
      'Nerd Font 图标和符号',
      '颜色和样式自定义',
      '预设主题',
      '性能对比',
      '右侧提示符配置',
      '条件模块',
      '与 tmux 和 screen 集成',
      '创建和分享预设',
      '按场景的常见配置',
      '高级用户技巧',
      '常见问题',
    ],
    tldr: 'Starship 是一个用 Rust 编写的极简、极速、跨 Shell 提示符。它支持 Bash、Zsh、Fish、PowerShell、Nushell 等多种 Shell。它自动检测项目上下文 — Git 分支、语言版本、云提供商、Docker 上下文 — 仅显示相关信息。配置集中在单个 starship.toml 文件中。在 2026 年，Starship 仍然是追求美观、信息丰富的提示符而不受 Shell 锁定或性能损失的开发者的首选。',
    takeaways: [
      'Starship 用 Rust 编写，渲染提示符仅需不到 10ms，是最快的提示符工具之一',
      '单个 starship.toml 文件可在 Bash、Zsh、Fish、PowerShell、Nushell 及其他 4 种 Shell 中生成相同配置',
      '超过 50 个内置模块自动检测 Git 状态、语言运行时、云上下文、Docker、电池电量等',
      'Nerd Font 图标为每种语言和工具提供丰富的视觉体验',
      'Tokyo Night、Gruvbox Rainbow、Pastel Powerline 等内置预设可即时切换主题',
      '自定义模块可将任意 Shell 命令输出直接显示在提示符中',
    ],
    body: {
      introP1: '终端提示符是你开发流程中查看次数最多的文本。它每天向你问好数千次，但大多数开发者使用的默认提示符只显示一个美元符号和一个路径。一个优秀的提示符能告诉你当前所在分支、是否有未提交的更改、活跃的语言运行时版本以及目标云上下文 — 而无需运行任何命令。',
      introP2: 'Starship 是解决所有提示符困扰的答案。用 Rust 编写以确保速度，为跨 Shell 兼容而设计，通过单个 TOML 文件配置，Starship 已成为现代开发者的事实标准提示符。本指南涵盖从安装到高级自定义的所有内容，提供可以直接复制到 starship.toml 中的真实配置示例。',
      whatTitle: '什么是 Starship 以及为什么它很重要',
      whatP1: 'Starship 是一个用 Rust 编写的开源跨 Shell 提示符。它用上下文感知的、信息丰富的提示符替换默认 Shell 提示符，自动适应当前项目。进入 Node.js 项目，Starship 显示 Node 版本。切换到 Python 虚拟环境，它显示环境名称。检出 Git 分支，它显示分支名以及领先/落后计数、暂存更改和未跟踪文件。',
      whatP2: '为什么跨 Shell 提示符很重要？开发者经常在不同 Shell 之间切换 — 远程服务器上的 Bash、macOS 上的 Zsh、个人机器上的 Fish、Windows 工作站上的 PowerShell。像 Oh My Zsh 这样特定于 Shell 的提示符框架只在一种 Shell 中工作。Starship 在所有地方都使用相同的配置、相同的外观和相同的行为。',
      whatList1: '跨 Shell：一个配置文件适用于 Bash、Zsh、Fish、PowerShell、Nushell、Cmd、Elvish、Tcsh、Xonsh',
      whatList2: '极速：用 Rust 编写，即使启用多个模块也能在 10ms 内渲染',
      whatList3: '上下文感知：自动检测 Git、Node、Python、Rust、Go、Java、Docker、Kubernetes、AWS、GCP、Azure',
      whatList4: '单文件配置：所有设置都在 ~/.config/starship.toml 中',
      whatList5: '超过 50 个内置模块带有合理的默认值 — 开箱即用效果很好',
      whatList6: '活跃的社区，拥有 45,000+ GitHub 星标和频繁发布',
      compTitle: 'Starship vs Oh My Zsh vs Powerlevel10k vs Pure',
      compDesc: '每种提示符工具适合不同的需求。此对比帮助你了解 Starship 的优势以及替代方案可能更适合的场景。',
      installTitle: '安装',
      installDesc: 'Starship 以单个二进制文件分发。使用你喜欢的方式安装，然后将初始化脚本添加到 Shell 配置中。',
      shellTitle: 'Shell 配置（Bash、Zsh、Fish、PowerShell、Nushell、Cmd、Elvish、Tcsh、Xonsh）',
      shellDesc: '安装 Starship 二进制文件后，你需要在 Shell 配置文件中添加一行来激活它。以下是每个支持的 Shell 的初始化命令。',
      tomlTitle: 'starship.toml 配置基础',
      tomlP1: '所有 Starship 配置都在 ~/.config/starship.toml 中（或通过 STARSHIP_CONFIG 环境变量设置的路径）。该文件使用 TOML 格式，包含整体提示符格式和各个模块的配置节。',
      tomlP2: '顶层 format 键定义提示符布局。每个模块有自己的配置节，包含 format、style、symbol 和 disabled 等选项。你还可以在顶层设置 scan_timeout 和 command_timeout 来控制性能。',
      moduleTitle: '模块系统概览',
      moduleP1: 'Starship 使用模块化架构。提示符中的每条信息都是一个模块 — git_branch、nodejs、python、directory 等。模块仅在相关时显示：nodejs 模块仅在当前目录树中检测到 package.json 或 .node-version 文件时才出现。',
      moduleP2: '默认格式字符串以合理的顺序包含所有内置模块。你可以覆盖它来重新排序模块、移除不需要的模块或添加自定义模块。每个模块支持格式字符串，精确控制显示的文本和符号。',
      gitTitle: 'Git 状态模块',
      gitP1: 'Git 模块是 Starship 最受欢迎的功能。git_branch 模块显示当前分支名和可自定义的符号。git_status 模块显示工作树状态的紧凑摘要：暂存、修改、未跟踪、删除、重命名和贮藏计数，加上相对于上游分支的领先/落后信息。',
      gitP2: '你可以自定义 git_status 中的每个符号。默认符号简洁，但你可以用 Nerd Font 图标或表情替换它们以获得更直观的体验。git_commit 模块在分离 HEAD 状态下显示当前提交哈希，git_state 显示你是否正在进行变基、合并、摘取或二分查找。',
      langTitle: '语言检测模块',
      langP1: 'Starship 包含几乎所有编程语言和运行时的模块。每个语言模块检测特定文件（如 Node.js 的 package.json、Rust 的 Cargo.toml 或 Python 的 pyproject.toml）并显示活跃版本。在切换需要不同运行时版本的项目时，这非常有用。',
      langP2: '你可以为每个语言模块自定义符号、样式和版本格式。detect_files、detect_folders 和 detect_extensions 选项让你精细调整每个模块何时激活。',
      cloudTitle: '云和 Kubernetes 模块',
      cloudP1: '对于 DevOps 和云工程师，Starship 提供 AWS、Google Cloud、Azure 和 Kubernetes 模块。aws 模块读取 AWS_PROFILE 和区域，gcloud 模块显示活跃的 GCP 项目和区域，kubernetes 模块显示 kubeconfig 中的当前集群和命名空间。',
      cloudP2: '这些模块默认禁用，以避免对不使用云 CLI 的开发者造成性能开销。在需要时在 starship.toml 中启用它们。',
      dockerTitle: 'Docker 上下文模块',
      dockerP1: 'docker_context 模块显示当前 Docker 上下文，这在切换本地开发、远程 Docker 主机和容器编排平台时至关重要。它仅在上下文不是默认值时出现，减少提示符噪音。',
      dirTitle: '目录模块自定义',
      dirP1: '目录模块控制当前路径的显示方式。默认情况下，Starship 将长路径截断为三个父目录。你可以自定义截断长度、截断符号、替换（用短别名替换长路径如 ~/Developer/projects），以及是否在缺少写权限的目录显示只读符号。',
      customTitle: '自定义模块',
      customP1: '自定义模块让你在提示符中显示任何 Shell 命令输出。这是 Starship 针对内置模块未覆盖的信息的扩展机制。使用 command、when 条件和 format 字符串定义自定义模块。Starship 根据 command_timeout 设置缓存输出。',
      customP2: '常见的自定义模块用例包括显示当前 Terraform 工作区、显示活跃的 tmux 会话、显示后台作业数或指示 VPN 连接状态。',
      durationTitle: '命令耗时和执行时间',
      durationP1: 'cmd_duration 模块显示上一条命令的执行时间。默认仅在命令超过 2 秒时显示，保持快速命令的提示符整洁。你可以自定义阈值、格式以及是否显示毫秒精度。',
      batteryTitle: '电池模块',
      batteryP1: '电池模块显示当前电池电量和充电状态。对于不想查看系统托盘的笔记本用户很有用。你可以为每个电池电量范围定义自定义阈值、不同的符号和样式。',
      timeTitle: '时间和用户名模块',
      timeP1: '时间模块以可配置的格式显示当前时间。默认禁用，但对于想在终端历史中加时间戳的开发者很有用。用户名模块显示当前用户，在 SSH 到远程服务器时确认登录用户身份特别有帮助。',
      nerdTitle: 'Nerd Font 图标和符号',
      nerdP1: 'Nerd Fonts 是包含数千个图标的修补字体，来自 Font Awesome、Devicons、Octicons 和其他图标集。Starship 默认使用 Nerd Font 符号来显示语言图标、Git 符号和其他字形。要正确显示这些图标，请安装 Nerd Font 并将其设为终端字体。',
      nerdP2: '流行的 Nerd Font 选择包括 FiraCode Nerd Font、JetBrainsMono Nerd Font 和 Hack Nerd Font。如果你不想使用 Nerd Fonts，Starship 提供纯文本预设，将所有图标替换为普通 ASCII 字符。',
      colorTitle: '颜色和样式自定义',
      colorP1: 'Starship 样式使用组合前景色、背景色和文本属性的字符串格式。格式为 "fg:color bg:color attributes"，属性包括 bold、italic、underline、dimmed、inverted 和 strikethrough。颜色可以是标准终端颜色名、十六进制代码或 ANSI 256 色号。',
      presetTitle: '预设主题',
      presetP1: 'Starship 附带几个内置预设，可完全改变提示符的外观和感觉。使用 starship preset 命令应用预设，它会用预设配置覆盖你的 starship.toml。',
      presetP2: '你可以将预设作为起点，然后自定义各个模块。preset 命令还支持输出到标准输出，以便在应用前查看配置。',
      perfTitle: '性能对比',
      perfP1: '提示符性能很重要，因为慢速提示符会让每个命令都感觉迟缓。Starship 用 Rust 编写并针对速度进行了优化。它并行运行每个模块并积极缓存结果。典型渲染时间为 5-15ms，而 Oh My Zsh 主题为 50-200ms，禁用即时提示符的 Powerlevel10k 为 20-50ms。',
      perfP2: '你可以使用内置的 timings 命令对 Starship 配置进行基准测试，它按模块分解渲染时间，以便识别和禁用慢速模块。',
      rightTitle: '右侧提示符配置',
      rightP1: 'Starship 在支持右侧提示符的 Shell（Zsh、Fish、PowerShell、Elvish、Nushell）中支持右侧提示符。starship.toml 中的 right_format 键定义右侧显示的内容。常见选择包括时间模块、命令耗时和状态码。',
      condTitle: '条件模块',
      condP1: '你可以通过组合 detect_files、detect_folders 和 detect_extensions 选项使模块仅在特定目录中出现。自定义模块支持 when 条件，运行 Shell 命令并仅在命令成功（退出码 0）时显示模块。',
      condP2: '这对于显示项目特定信息很有用：仅在包含 .tf 文件的目录中显示 Terraform 工作区，或仅在存在 deploy.yaml 时显示自定义部署目标。',
      tmuxTitle: '与 tmux 和 screen 集成',
      tmuxP1: 'Starship 在 tmux 和 GNU screen 会话中无缝工作。由于 Starship 修改的是 Shell 提示符（而非终端模拟器），无论使用什么终端复用器，它都能正确渲染。对于 tmux 用户，你可以使用自定义模块在提示符中显示活跃的 tmux 会话名。',
      shareTitle: '创建和分享预设',
      shareP1: '要创建可分享的预设，编写包含所有模块配置的 starship.toml，然后直接分享文件或将其托管为 URL。其他人可以使用 starship preset 或将文件复制到配置目录来应用它。Starship 社区维护着用户贡献的预设仓库。',
      usecaseTitle: '按场景的常见配置',
      usecaseP1: '不同的工作流受益于不同的提示符配置。以下是三种常见开发者角色的优化设置。',
      usecaseWeb: 'Web 开发',
      usecaseDevops: 'DevOps / 云工程',
      usecaseData: '数据科学 / ML',
      tipsTitle: '高级用户技巧',
      tip1: '使用 starship timings 识别慢速模块并优化提示符渲染时间',
      tip2: '在 Linux 上将 STARSHIP_CACHE 设置为 ramdisk 路径以实现更快的模块缓存',
      tip3: '使用 env_var 模块显示自定义环境变量，如 API 端点或部署目标',
      tip4: '组合目录替换为深层项目路径创建短别名',
      tip5: '使用 status 模块显示失败命令的退出码和信号名',
      tip6: '在 NFS 或 SSHFS 等慢速文件系统上将 scan_timeout 设为较低值（如 20ms）',
      tip7: '在信息行和输入行之间添加 line_break 模块以实现双行提示符布局',
      tip8: '在 starship.toml 中使用 palettes 定义可复用的颜色名以保持主题一致性',
      faqTitle: '常见问题',
      faq1Q: 'Starship 是免费开源的吗？',
      faq1A: '是的，Starship 完全免费，基于 ISC 许可证开源。源代码在 GitHub 的 starship/starship 仓库，欢迎社区贡献。',
      faq2Q: 'Starship 会拖慢我的终端吗？',
      faq2A: '不会。Starship 用 Rust 编写，大多数配置的渲染时间不到 10ms。它比 Oh My Zsh 等基于 Shell 的提示符框架快得多。使用 starship timings 验证性能。',
      faq3Q: '使用 Starship 需要 Nerd Fonts 吗？',
      faq3A: '不是严格需要。Starship 没有 Nerd Fonts 也能工作，但某些符号会显示为缺失字符。使用 starship preset plain-text-symbols 命令切换到纯文本配置，或安装 Nerd Font 获得最佳视觉体验。',
      faq4Q: 'Starship 可以替代 Oh My Zsh 吗？',
      faq4A: 'Starship 替代的是 Oh My Zsh 的提示符/主题组件。它不替代 Oh My Zsh 的别名、补全和 Shell 函数插件。许多开发者使用 Oh My Zsh 的插件同时用 Starship 作为提示符，只需禁用 Oh My Zsh 主题即可。',
      faq5Q: '如何为多个 Shell 配置 Starship？',
      faq5A: 'Starship 使用单个 ~/.config/starship.toml 文件，适用于所有 Shell。在每个 Shell 配置文件中添加 eval "$(starship init bash)" 或等效的初始化命令。相同的 TOML 文件在所有 Shell 中生成相同的提示符。',
      faq6Q: '可以通过 SSH 使用 Starship 吗？',
      faq6A: '可以。在远程服务器上安装 Starship 并在远程 Shell 配置中添加初始化命令。提示符将在远程服务器上渲染。或者，一些用户使用 dotfile 管理器将 starship.toml 同步到远程机器。',
      faq7Q: '如何更新 Starship？',
      faq7A: '通过包管理器更新：macOS 上 brew upgrade starship，Linux 上 curl -sS https://starship.rs/install.sh | sh，Windows 上 scoop update starship，或通过 Cargo 安装的使用 cargo install starship。',
      faq8Q: '如何只显示特定模块？',
      faq8A: '在 starship.toml 中覆盖 format 键，只列出你想要的模块。例如，format = "$directory$git_branch$git_status$character" 只显示目录、Git 分支、Git 状态和提示符字符，隐藏所有其他模块。',
    },
  },
};

export default function StarshipPromptGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.body.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.body.faq1A } },
      { '@type': 'Question', name: t.body.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.body.faq2A } },
      { '@type': 'Question', name: t.body.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.body.faq3A } },
      { '@type': 'Question', name: t.body.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.body.faq4A } },
      { '@type': 'Question', name: t.body.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.body.faq5A } },
      { '@type': 'Question', name: t.body.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.body.faq6A } },
      { '@type': 'Question', name: t.body.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.body.faq7A } },
      { '@type': 'Question', name: t.body.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.body.faq8A } },
    ],
  };

  const codeStyle = { backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.7' };
  const h2Style = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const h3Style = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const pStyle = { marginBottom: '1rem', lineHeight: '1.75' };
  const ulStyle = { paddingLeft: '1.5rem', marginBottom: '1.5rem' };
  const liStyle = { marginBottom: '0.5rem', lineHeight: '1.75' };
  const tableStyle = { width: '100%', borderCollapse: 'collapse' as const, marginBottom: '1.5rem', fontSize: '0.875rem' };
  const thStyle = { border: '1px solid #e2e8f0', padding: '0.75rem', backgroundColor: '#f8fafc', fontWeight: 600, textAlign: 'left' as const };
  const tdStyle = { border: '1px solid #e2e8f0', padding: '0.75rem', textAlign: 'left' as const };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0c4a6e', fontSize: '1.1rem' }}>TL;DR</p>
        <p style={{ margin: 0, lineHeight: '1.75', color: '#0c4a6e' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Key Takeaways</p>
        <ul style={ulStyle}>
          {t.takeaways.map((item, i) => (
            <li key={i} style={liStyle}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Table of Contents */}
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Table of Contents</p>
        <ol style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {t.toc.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.35rem', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ol>
      </div>

      {/* Introduction */}
      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>{t.body.introP1}</p>
      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.body.introP2}</p>

      {/* What Is Starship */}
      <h2 style={h2Style}>{t.body.whatTitle}</h2>
      <p style={pStyle}>{t.body.whatP1}</p>
      <p style={pStyle}>{t.body.whatP2}</p>
      <ul style={ulStyle}>
        {[t.body.whatList1, t.body.whatList2, t.body.whatList3, t.body.whatList4, t.body.whatList5, t.body.whatList6].map((item, i) => (
          <li key={i} style={liStyle}>{item}</li>
        ))}
      </ul>

      {/* Comparison Table */}
      <h2 style={h2Style}>{t.body.compTitle}</h2>
      <p style={pStyle}>{t.body.compDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>Starship</th>
              <th style={thStyle}>Oh My Zsh</th>
              <th style={thStyle}>Powerlevel10k</th>
              <th style={thStyle}>Pure</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Type</td><td style={tdStyle}>Cross-shell binary</td><td style={tdStyle}>Zsh framework</td><td style={tdStyle}>Zsh theme</td><td style={tdStyle}>Zsh theme</td></tr>
            <tr><td style={tdStyle}>Language</td><td style={tdStyle}>Rust</td><td style={tdStyle}>Shell script</td><td style={tdStyle}>Shell script + C</td><td style={tdStyle}>Shell script</td></tr>
            <tr><td style={tdStyle}>Shell Support</td><td style={tdStyle}>9 shells</td><td style={tdStyle}>Zsh only</td><td style={tdStyle}>Zsh only</td><td style={tdStyle}>Zsh + Fish</td></tr>
            <tr><td style={tdStyle}>Render Time</td><td style={tdStyle}>5-15ms</td><td style={tdStyle}>50-200ms</td><td style={tdStyle}>10-30ms (instant prompt)</td><td style={tdStyle}>30-60ms</td></tr>
            <tr><td style={tdStyle}>Config Format</td><td style={tdStyle}>TOML</td><td style={tdStyle}>.zshrc</td><td style={tdStyle}>Wizard + .p10k.zsh</td><td style={tdStyle}>.zshrc</td></tr>
            <tr><td style={tdStyle}>Modules</td><td style={tdStyle}>50+</td><td style={tdStyle}>300+ plugins</td><td style={tdStyle}>30+ segments</td><td style={tdStyle}>Git only</td></tr>
            <tr><td style={tdStyle}>Nerd Font Required</td><td style={tdStyle}>Optional</td><td style={tdStyle}>Theme-dependent</td><td style={tdStyle}>Optional</td><td style={tdStyle}>No</td></tr>
            <tr><td style={tdStyle}>Right Prompt</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Theme-dependent</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td></tr>
            <tr><td style={tdStyle}>Custom Modules</td><td style={tdStyle}>Yes (TOML)</td><td style={tdStyle}>Write plugin</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td></tr>
            <tr><td style={tdStyle}>Instant Prompt</td><td style={tdStyle}>No (not needed)</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes (async)</td></tr>
          </tbody>
        </table>
      </div>

      {/* Installation */}
      <h2 style={h2Style}>{t.body.installTitle}</h2>
      <p style={pStyle}>{t.body.installDesc}</p>

      <h3 style={h3Style}>Install Script (Linux / macOS)</h3>
      <pre style={codeStyle}><code>{'curl -sS https://starship.rs/install.sh | sh'}</code></pre>

      <h3 style={h3Style}>Homebrew (macOS / Linux)</h3>
      <pre style={codeStyle}><code>{'brew install starship'}</code></pre>

      <h3 style={h3Style}>Scoop (Windows)</h3>
      <pre style={codeStyle}><code>{'scoop install starship'}</code></pre>

      <h3 style={h3Style}>Cargo (Rust)</h3>
      <pre style={codeStyle}><code>{'cargo install starship --locked'}</code></pre>

      <h3 style={h3Style}>Package Managers</h3>
      <pre style={codeStyle}><code>{'# Arch Linux\n'
        + 'pacman -S starship\n'
        + '\n'
        + '# Nix\n'
        + 'nix-env -iA nixpkgs.starship\n'
        + '\n'
        + '# Conda\n'
        + 'conda install -c conda-forge starship\n'
        + '\n'
        + '# Termux (Android)\n'
        + 'pkg install starship\n'
        + '\n'
        + '# Chocolatey (Windows)\n'
        + 'choco install starship\n'
        + '\n'
        + '# WinGet (Windows)\n'
        + 'winget install --id Starship.Starship'}</code></pre>

      {/* Shell Setup */}
      <h2 style={h2Style}>{t.body.shellTitle}</h2>
      <p style={pStyle}>{t.body.shellDesc}</p>

      <h3 style={h3Style}>Bash (~/.bashrc)</h3>
      <pre style={codeStyle}><code>{'eval "$(starship init bash)"'}</code></pre>

      <h3 style={h3Style}>Zsh (~/.zshrc)</h3>
      <pre style={codeStyle}><code>{'eval "$(starship init zsh)"'}</code></pre>

      <h3 style={h3Style}>Fish (~/.config/fish/config.fish)</h3>
      <pre style={codeStyle}><code>{'starship init fish | source'}</code></pre>

      <h3 style={h3Style}>PowerShell ($PROFILE)</h3>
      <pre style={codeStyle}><code>{'Invoke-Expression (&starship init powershell)'}</code></pre>

      <h3 style={h3Style}>Nushell</h3>
      <pre style={codeStyle}><code>{'# In env.nu\n'
        + 'mkdir ~/.cache/starship\n'
        + 'starship init nu | save -f ~/.cache/starship/init.nu\n'
        + '\n'
        + '# In config.nu\n'
        + 'use ~/.cache/starship/init.nu'}</code></pre>

      <h3 style={h3Style}>Other Shells</h3>
      <pre style={codeStyle}><code>{'# Cmd (via Clink) — starship.lua in Clink scripts directory\n'
        + 'load(io.popen(\'starship init cmd\'):read("*a"))()\n'
        + '\n'
        + '# Elvish (~/.elvish/rc.elv)\n'
        + 'eval (starship init elvish)\n'
        + '\n'
        + '# Tcsh (~/.tcshrc)\n'
        + 'eval `starship init tcsh`\n'
        + '\n'
        + '# Xonsh (~/.xonshrc)\n'
        + 'execx($(starship init xonsh))'}</code></pre>

      {/* starship.toml basics */}
      <h2 style={h2Style}>{t.body.tomlTitle}</h2>
      <p style={pStyle}>{t.body.tomlP1}</p>
      <p style={pStyle}>{t.body.tomlP2}</p>
      <pre style={codeStyle}><code>{'# ~/.config/starship.toml\n'
        + '\n'
        + '# Top-level prompt format\n'
        + 'format = """\n'
        + '\\$directory\\\n'
        + '\\$git_branch\\\n'
        + '\\$git_status\\\n'
        + '\\$nodejs\\\n'
        + '\\$python\\\n'
        + '\\$rust\\\n'
        + '\\$docker_context\\\n'
        + '\\$cmd_duration\\\n'
        + '\\$line_break\\\n'
        + '\\$character\"\"\"\n'
        + '\n'
        + '# Timeout for scanning directories (milliseconds)\n'
        + 'scan_timeout = 30\n'
        + '\n'
        + '# Timeout for commands run by modules\n'
        + 'command_timeout = 500\n'
        + '\n'
        + '# Blank line between prompts\n'
        + 'add_newline = true\n'
        + '\n'
        + '# Prompt character\n'
        + '[character]\n'
        + 'success_symbol = "[>](bold green)"\n'
        + 'error_symbol = "[>](bold red)"'}</code></pre>

      {/* Module System */}
      <h2 style={h2Style}>{t.body.moduleTitle}</h2>
      <p style={pStyle}>{t.body.moduleP1}</p>
      <p style={pStyle}>{t.body.moduleP2}</p>
      <pre style={codeStyle}><code>{'# Disable a module entirely\n'
        + '[package]\n'
        + 'disabled = true\n'
        + '\n'
        + '# Customize module format\n'
        + '[nodejs]\n'
        + 'format = "via [Node \\$version](bold green) "\n'
        + '\n'
        + '# Change module symbol\n'
        + '[python]\n'
        + 'symbol = "py "\n'
        + 'format = \'via [\\${symbol}\\${pyenv_prefix}(\\${version})(\\(\\$virtualenv\\))](bold yellow) \''}</code></pre>

      {/* Git Status */}
      <h2 style={h2Style}>{t.body.gitTitle}</h2>
      <p style={pStyle}>{t.body.gitP1}</p>
      <p style={pStyle}>{t.body.gitP2}</p>
      <pre style={codeStyle}><code>{'[git_branch]\n'
        + 'symbol = " "        # Nerd Font branch icon\n'
        + 'style = "bold purple"\n'
        + 'format = "on [\\$symbol\\$branch(:$remote_branch)](\\$style) "\n'
        + '\n'
        + '[git_status]\n'
        + 'ahead = "A\\${count} "\n'
        + 'behind = "B\\${count} "\n'
        + 'diverged = "D\\${ahead_count}/\\${behind_count} "\n'
        + 'staged = "+\\${count} "\n'
        + 'modified = "!\\${count} "\n'
        + 'untracked = "?\\${count} "\n'
        + 'deleted = "x\\${count} "\n'
        + 'stashed = "*\\${count} "\n'
        + 'style = "bold red"\n'
        + '\n'
        + '[git_commit]\n'
        + 'commit_hash_length = 7\n'
        + 'tag_symbol = " "\n'
        + '\n'
        + '[git_state]\n'
        + 'rebase = "REBASING"\n'
        + 'merge = "MERGING"\n'
        + 'cherry_pick = "CHERRY-PICKING"'}</code></pre>

      <p style={pStyle}>Visual prompt example showing Git status in action:</p>
      <pre style={{ ...codeStyle, backgroundColor: '#1e1e2e', color: '#cdd6f4' }}><code>{'# Clean branch, ahead of remote by 2 commits\n'
        + '~/projects/myapp on  main A2 \n'
        + '> \n'
        + '\n'
        + '# Branch with staged and modified files\n'
        + '~/projects/myapp on  feature/auth +3 !2 ?1 \n'
        + '> \n'
        + '\n'
        + '# Detached HEAD during interactive rebase\n'
        + '~/projects/myapp on  a3f7c21 REBASING 3/5\n'
        + '> '}</code></pre>

      {/* Language Modules */}
      <h2 style={h2Style}>{t.body.langTitle}</h2>
      <p style={pStyle}>{t.body.langP1}</p>
      <p style={pStyle}>{t.body.langP2}</p>
      <pre style={codeStyle}><code>{'# Node.js — detects package.json, .node-version, .nvmrc\n'
        + '[nodejs]\n'
        + 'format = "via [ \\$version](bold green) "\n'
        + 'detect_files = ["package.json", ".node-version"]\n'
        + 'detect_extensions = ["js", "mjs", "cjs", "ts", "mts"]\n'
        + '\n'
        + '# Python — detects pyproject.toml, requirements.txt, .python-version\n'
        + '[python]\n'
        + 'format = \'via [\\${symbol}\\${pyenv_prefix}(\\${version})(\\(\\$virtualenv\\))](bold yellow) \'\n'
        + 'symbol = " "\n'
        + '\n'
        + '# Rust — detects Cargo.toml\n'
        + '[rust]\n'
        + 'format = "via [ \\$version](bold red) "\n'
        + '\n'
        + '# Go — detects go.mod, go.sum, .go files\n'
        + '[golang]\n'
        + 'format = "via [ \\$version](bold cyan) "\n'
        + '\n'
        + '# Java — detects pom.xml, build.gradle, .java files\n'
        + '[java]\n'
        + 'format = "via [ \\$version](bold red) "\n'
        + '\n'
        + '# Ruby — detects Gemfile, .ruby-version\n'
        + '[ruby]\n'
        + 'format = "via [ \\$version](bold red) "\n'
        + '\n'
        + '# PHP — detects composer.json, .php files\n'
        + '[php]\n'
        + 'format = "via [ \\$version](bold purple) "'}</code></pre>

      {/* Cloud Modules */}
      <h2 style={h2Style}>{t.body.cloudTitle}</h2>
      <p style={pStyle}>{t.body.cloudP1}</p>
      <p style={pStyle}>{t.body.cloudP2}</p>
      <pre style={codeStyle}><code>{'# AWS — reads AWS_PROFILE and region\n'
        + '[aws]\n'
        + 'disabled = false\n'
        + 'format = \'on [\\$symbol(\\$profile)(\\(\\$region\\))](bold yellow) \'\n'
        + 'symbol = " "\n'
        + '\n'
        + '[aws.region_aliases]\n'
        + 'us-east-1 = "use1"\n'
        + 'eu-west-1 = "euw1"\n'
        + '\n'
        + '# Google Cloud\n'
        + '[gcloud]\n'
        + 'disabled = false\n'
        + 'format = \'on [\\$symbol\\$account(@\\$domain)(\\(\\$region\\))](bold blue) \'\n'
        + 'symbol = " "\n'
        + '\n'
        + '# Azure\n'
        + '[azure]\n'
        + 'disabled = false\n'
        + 'format = "on [ \\$subscription](bold blue) "\n'
        + '\n'
        + '# Kubernetes — shows cluster and namespace\n'
        + '[kubernetes]\n'
        + 'disabled = false\n'
        + 'format = \'on [ \\$context(\\(\\$namespace\\))](bold purple) \'\n'
        + '\n'
        + '[kubernetes.context_aliases]\n'
        + '"arn:aws:eks:us-east-1:123456789:cluster/prod" = "prod"\n'
        + '"gke_myproject_us-central1_staging" = "staging"'}</code></pre>

      {/* Docker Context */}
      <h2 style={h2Style}>{t.body.dockerTitle}</h2>
      <p style={pStyle}>{t.body.dockerP1}</p>
      <pre style={codeStyle}><code>{'[docker_context]\n'
        + 'format = "via [ \\$context](bold blue) "\n'
        + 'only_with_files = true\n'
        + 'detect_files = ["docker-compose.yml", "docker-compose.yaml", "Dockerfile"]\n'
        + 'detect_extensions = ["dockerfile"]'}</code></pre>

      {/* Directory Module */}
      <h2 style={h2Style}>{t.body.dirTitle}</h2>
      <p style={pStyle}>{t.body.dirP1}</p>
      <pre style={codeStyle}><code>{'[directory]\n'
        + 'truncation_length = 4\n'
        + 'truncation_symbol = ".../""\n'
        + 'truncate_to_repo = true\n'
        + 'read_only = " "\n'
        + 'style = "bold cyan"\n'
        + '\n'
        + '# Path substitutions for shorter display\n'
        + '[directory.substitutions]\n'
        + '"~/Developer/projects" = "DEV"\n'
        + '"~/Documents/work" = "WORK"\n'
        + '"~/.config" = "CFG"'}</code></pre>

      {/* Custom Modules */}
      <h2 style={h2Style}>{t.body.customTitle}</h2>
      <p style={pStyle}>{t.body.customP1}</p>
      <p style={pStyle}>{t.body.customP2}</p>
      <pre style={codeStyle}><code>{'# Show current Terraform workspace\n'
        + '[custom.terraform]\n'
        + 'command = "terraform workspace show"\n'
        + 'when = "test -f main.tf"\n'
        + 'format = "via [TF \\$output](bold purple) "\n'
        + 'shell = ["bash", "--noprofile", "--norc"]\n'
        + '\n'
        + '# Show active tmux session\n'
        + '[custom.tmux]\n'
        + 'command = "tmux display-message -p \'#S\' 2>/dev/null"\n'
        + 'when = "test -n \\"\\$TMUX\\""\n'
        + 'format = "[ \\$output](bold yellow) "\n'
        + '\n'
        + '# VPN status indicator\n'
        + '[custom.vpn]\n'
        + 'command = "echo connected"\n'
        + 'when = "pgrep -x openvpn"\n'
        + 'format = "[ VPN](bold green) "'}</code></pre>

      {/* Command Duration */}
      <h2 style={h2Style}>{t.body.durationTitle}</h2>
      <p style={pStyle}>{t.body.durationP1}</p>
      <pre style={codeStyle}><code>{'[cmd_duration]\n'
        + 'min_time = 2_000          # Show only for commands > 2s\n'
        + 'format = "took [\\$duration](bold yellow) "\n'
        + 'show_milliseconds = false\n'
        + 'show_notifications = true  # Desktop notification for long commands\n'
        + 'min_time_to_notify = 30_000  # Notify if > 30s'}</code></pre>

      {/* Battery */}
      <h2 style={h2Style}>{t.body.batteryTitle}</h2>
      <p style={pStyle}>{t.body.batteryP1}</p>
      <pre style={codeStyle}><code>{'[battery]\n'
        + 'full_symbol = " "\n'
        + 'charging_symbol = " "\n'
        + 'discharging_symbol = " "\n'
        + '\n'
        + '[[battery.display]]\n'
        + 'threshold = 15\n'
        + 'style = "bold red"\n'
        + '\n'
        + '[[battery.display]]\n'
        + 'threshold = 50\n'
        + 'style = "bold yellow"\n'
        + '\n'
        + '[[battery.display]]\n'
        + 'threshold = 100\n'
        + 'style = "bold green"'}</code></pre>

      {/* Time and Username */}
      <h2 style={h2Style}>{t.body.timeTitle}</h2>
      <p style={pStyle}>{t.body.timeP1}</p>
      <pre style={codeStyle}><code>{'[time]\n'
        + 'disabled = false\n'
        + 'format = "at [ \\$time](bold dimmed white) "\n'
        + 'time_format = "%H:%M"\n'
        + 'utc_time_offset = "local"\n'
        + '\n'
        + '[username]\n'
        + 'show_always = false    # Only show on SSH or root\n'
        + 'style_root = "bold red"\n'
        + 'style_user = "bold yellow"\n'
        + 'format = "[\\$user]($style) "\n'
        + '\n'
        + '[hostname]\n'
        + 'ssh_only = true\n'
        + 'format = "on [\\$hostname](bold dimmed green) "\n'
        + 'trim_at = "."'}</code></pre>

      {/* Nerd Fonts */}
      <h2 style={h2Style}>{t.body.nerdTitle}</h2>
      <p style={pStyle}>{t.body.nerdP1}</p>
      <p style={pStyle}>{t.body.nerdP2}</p>
      <pre style={codeStyle}><code>{'# Install Nerd Font on macOS\n'
        + 'brew install --cask font-fira-code-nerd-font\n'
        + 'brew install --cask font-jetbrains-mono-nerd-font\n'
        + '\n'
        + '# Switch to text-only symbols (no Nerd Font needed)\n'
        + 'starship preset plain-text-symbols -o ~/.config/starship.toml'}</code></pre>

      {/* Color and Style */}
      <h2 style={h2Style}>{t.body.colorTitle}</h2>
      <p style={pStyle}>{t.body.colorP1}</p>
      <pre style={codeStyle}><code>{'# Style syntax examples\n'
        + '[directory]\n'
        + 'style = "bold cyan"                    # Bold cyan foreground\n'
        + '\n'
        + '[git_branch]\n'
        + 'style = "fg:#a6e3a1 bold"              # Hex color, bold\n'
        + '\n'
        + '[nodejs]\n'
        + 'style = "fg:green bg:#1e1e2e bold"     # Green on dark background\n'
        + '\n'
        + '[cmd_duration]\n'
        + 'style = "fg:220 italic"                # ANSI 256 color, italic\n'
        + '\n'
        + '# Define reusable color palettes (Starship 1.17+)\n'
        + 'palette = "catppuccin_mocha"\n'
        + '\n'
        + '[palettes.catppuccin_mocha]\n'
        + 'rosewater = "#f5e0dc"\n'
        + 'mauve = "#cba6f7"\n'
        + 'red = "#f38ba8"\n'
        + 'peach = "#fab387"\n'
        + 'green = "#a6e3a1"\n'
        + 'blue = "#89b4fa"\n'
        + 'text = "#cdd6f4"'}</code></pre>

      {/* Presets */}
      <h2 style={h2Style}>{t.body.presetTitle}</h2>
      <p style={pStyle}>{t.body.presetP1}</p>
      <p style={pStyle}>{t.body.presetP2}</p>
      <pre style={codeStyle}><code>{'# List all available presets\n'
        + 'starship preset --list\n'
        + '\n'
        + '# Apply Tokyo Night preset\n'
        + 'starship preset tokyo-night -o ~/.config/starship.toml\n'
        + '\n'
        + '# Apply Gruvbox Rainbow preset\n'
        + 'starship preset gruvbox-rainbow -o ~/.config/starship.toml\n'
        + '\n'
        + '# Apply Pastel Powerline preset\n'
        + 'starship preset pastel-powerline -o ~/.config/starship.toml\n'
        + '\n'
        + '# Apply Nerd Font Symbols preset\n'
        + 'starship preset nerd-font-symbols -o ~/.config/starship.toml\n'
        + '\n'
        + '# Apply Bracketed Segments preset\n'
        + 'starship preset bracketed-segments -o ~/.config/starship.toml\n'
        + '\n'
        + '# Apply Plain Text preset (no special fonts needed)\n'
        + 'starship preset plain-text-symbols -o ~/.config/starship.toml\n'
        + '\n'
        + '# Preview a preset before applying\n'
        + 'starship preset tokyo-night'}</code></pre>

      {/* Performance */}
      <h2 style={h2Style}>{t.body.perfTitle}</h2>
      <p style={pStyle}>{t.body.perfP1}</p>
      <p style={pStyle}>{t.body.perfP2}</p>
      <pre style={codeStyle}><code>{'# Benchmark your current Starship config\n'
        + 'starship timings\n'
        + '\n'
        + '# Example output:\n'
        + '# directory 0.8ms | git_branch 1.2ms | git_status 3.1ms\n'
        + '# nodejs 1.5ms | character 0.1ms | Total 6.7ms\n'
        + '\n'
        + '# Optimize: reduce command timeout for slow modules\n'
        + 'command_timeout = 200\n'
        + '\n'
        + '# Disable modules you do not use\n'
        + '[php]\n'
        + 'disabled = true'}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <p style={{ ...pStyle, fontWeight: 600 }}>Startup Time Benchmarks (2026):</p>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Prompt Tool</th>
              <th style={thStyle}>Cold Start</th>
              <th style={thStyle}>Warm Render</th>
              <th style={thStyle}>Memory</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Starship</td><td style={tdStyle}>~15ms</td><td style={tdStyle}>5-10ms</td><td style={tdStyle}>~8MB</td></tr>
            <tr><td style={tdStyle}>Powerlevel10k (instant)</td><td style={tdStyle}>~25ms</td><td style={tdStyle}>10-20ms</td><td style={tdStyle}>~12MB</td></tr>
            <tr><td style={tdStyle}>Pure</td><td style={tdStyle}>~40ms</td><td style={tdStyle}>30-50ms</td><td style={tdStyle}>~5MB</td></tr>
            <tr><td style={tdStyle}>Oh My Zsh (agnoster)</td><td style={tdStyle}>~150ms</td><td style={tdStyle}>50-100ms</td><td style={tdStyle}>~30MB</td></tr>
            <tr><td style={tdStyle}>Default prompt</td><td style={tdStyle}>&lt;1ms</td><td style={tdStyle}>&lt;1ms</td><td style={tdStyle}>0MB</td></tr>
          </tbody>
        </table>
      </div>

      {/* Right Prompt */}
      <h2 style={h2Style}>{t.body.rightTitle}</h2>
      <p style={pStyle}>{t.body.rightP1}</p>
      <pre style={codeStyle}><code>{'# Right-side prompt configuration\n'
        + 'right_format = """\n'
        + '\\$cmd_duration\\\n'
        + '\\$time\"\"\"\n'
        + '\n'
        + '[cmd_duration]\n'
        + 'format = "[\\$duration](dimmed yellow)"\n'
        + '\n'
        + '[time]\n'
        + 'disabled = false\n'
        + 'format = "[\\$time](dimmed white)"\n'
        + 'time_format = "%H:%M:%S"'}</code></pre>

      {/* Conditional Modules */}
      <h2 style={h2Style}>{t.body.condTitle}</h2>
      <p style={pStyle}>{t.body.condP1}</p>
      <p style={pStyle}>{t.body.condP2}</p>
      <pre style={codeStyle}><code>{'# Show Terraform module only in directories with .tf files\n'
        + '[terraform]\n'
        + 'format = "via [TF \\$version \\$workspace](bold purple) "\n'
        + 'detect_files = [".terraform", "main.tf"]\n'
        + '\n'
        + '# Custom module with when condition\n'
        + '[custom.deploy_target]\n'
        + 'command = "cat deploy.yaml | grep target | cut -d: -f2"\n'
        + 'when = "test -f deploy.yaml"\n'
        + 'format = "deploy:[\\$output](bold red) "\n'
        + '\n'
        + '# Show Python only for Python projects\n'
        + '[python]\n'
        + 'detect_files = ["pyproject.toml", "requirements.txt", "setup.py", "Pipfile"]\n'
        + 'detect_extensions = []  # Do not trigger on .py files in non-Python projects'}</code></pre>

      {/* tmux Integration */}
      <h2 style={h2Style}>{t.body.tmuxTitle}</h2>
      <p style={pStyle}>{t.body.tmuxP1}</p>
      <pre style={codeStyle}><code>{'# Custom module to show tmux session in prompt\n'
        + '[custom.tmux_session]\n'
        + 'command = "tmux display-message -p \'#S\' 2>/dev/null"\n'
        + 'when = "test -n \\"\\$TMUX\\""\n'
        + 'format = "[ \\$output](bold yellow) "\n'
        + 'shell = ["bash", "--noprofile", "--norc"]\n'
        + '\n'
        + '# Tip: Add to your format string\n'
        + '# format = "\\${custom.tmux_session}\\$directory\\$git_branch..."'}</code></pre>

      {/* Creating Presets */}
      <h2 style={h2Style}>{t.body.shareTitle}</h2>
      <p style={pStyle}>{t.body.shareP1}</p>
      <pre style={codeStyle}><code>{'# Share your config directly\n'
        + 'cp ~/.config/starship.toml ~/my-starship-preset.toml\n'
        + '\n'
        + '# Apply a preset from a URL\n'
        + 'curl -sS https://example.com/my-preset.toml \\\n'
        + '  -o ~/.config/starship.toml\n'
        + '\n'
        + '# Apply a preset from a local file\n'
        + 'cp ~/shared-configs/team-preset.toml ~/.config/starship.toml\n'
        + '\n'
        + '# Use STARSHIP_CONFIG env var for per-project presets\n'
        + 'export STARSHIP_CONFIG=~/projects/myapp/.starship.toml'}</code></pre>

      {/* Use Case Configs */}
      <h2 style={h2Style}>{t.body.usecaseTitle}</h2>
      <p style={pStyle}>{t.body.usecaseP1}</p>

      <h3 style={h3Style}>{t.body.usecaseWeb}</h3>
      <pre style={codeStyle}><code>{'# Optimized for web development\n'
        + 'format = """\n'
        + '\\$directory\\\n'
        + '\\$git_branch\\$git_status\\\n'
        + '\\$nodejs\\\n'
        + '\\$bun\\\n'
        + '\\$deno\\\n'
        + '\\$docker_context\\\n'
        + '\\$cmd_duration\\\n'
        + '\\$line_break\\\n'
        + '\\$character\"\"\"\n'
        + '\n'
        + '[nodejs]\n'
        + 'format = "via [ \\$version](bold green) "\n'
        + '\n'
        + '[bun]\n'
        + 'format = "via [ \\$version](bold white) "\n'
        + '\n'
        + '[deno]\n'
        + 'format = "via [ \\$version](bold green) "\n'
        + '\n'
        + '# Disable irrelevant modules\n'
        + '[aws]\n'
        + 'disabled = true\n'
        + '[gcloud]\n'
        + 'disabled = true\n'
        + '[java]\n'
        + 'disabled = true'}</code></pre>

      <h3 style={h3Style}>{t.body.usecaseDevops}</h3>
      <pre style={codeStyle}><code>{'# Optimized for DevOps / Cloud Engineering\n'
        + 'format = """\n'
        + '\\$username\\$hostname\\$directory\\\n'
        + '\\$git_branch\\$git_status\\\n'
        + '\\$kubernetes\\$aws\\$gcloud\\$terraform\\\n'
        + '\\$docker_context\\$cmd_duration\\\n'
        + '\\$line_break\\$character\"\"\"\n'
        + '\n'
        + '[kubernetes]\n'
        + 'disabled = false\n'
        + 'format = \'[ \\$context(\\(\\$namespace\\))](bold purple) \'\n'
        + '\n'
        + '[aws]\n'
        + 'disabled = false\n'
        + 'format = \'[ \\$profile(\\(\\$region\\))](bold yellow) \'\n'
        + '\n'
        + '[terraform]\n'
        + 'format = "via [TF \\$version \\$workspace](bold purple) "'}</code></pre>

      <h3 style={h3Style}>{t.body.usecaseData}</h3>
      <pre style={codeStyle}><code>{'# Optimized for Data Science / ML\n'
        + 'format = """\n'
        + '\\$directory\\$git_branch\\$git_status\\\n'
        + '\\$python\\$conda\\$julia\\$rlang\\\n'
        + '\\$docker_context\\$cmd_duration\\\n'
        + '\\$line_break\\$character\"\"\"\n'
        + '\n'
        + '[python]\n'
        + 'format = \'via [\\${symbol}(\\${version})(\\(\\$virtualenv\\))](bold yellow) \'\n'
        + 'symbol = " "\n'
        + '\n'
        + '[conda]\n'
        + 'format = "via [ \\$environment](bold green) "\n'
        + '\n'
        + '# Show long-running training times\n'
        + '[cmd_duration]\n'
        + 'min_time = 5_000\n'
        + 'show_notifications = true'}</code></pre>

      {/* Tips */}
      <h2 style={h2Style}>{t.body.tipsTitle}</h2>
      <ul style={ulStyle}>
        {[t.body.tip1, t.body.tip2, t.body.tip3, t.body.tip4, t.body.tip5, t.body.tip6, t.body.tip7, t.body.tip8].map((tip, i) => (
          <li key={i} style={liStyle}><strong>Tip {i + 1}:</strong> {tip}</li>
        ))}
      </ul>

      {/* FAQ */}
      <h2 style={h2Style}>{t.body.faqTitle}</h2>
      {[
        { q: t.body.faq1Q, a: t.body.faq1A },
        { q: t.body.faq2Q, a: t.body.faq2A },
        { q: t.body.faq3Q, a: t.body.faq3A },
        { q: t.body.faq4Q, a: t.body.faq4A },
        { q: t.body.faq5Q, a: t.body.faq5A },
        { q: t.body.faq6Q, a: t.body.faq6A },
        { q: t.body.faq7Q, a: t.body.faq7A },
        { q: t.body.faq8Q, a: t.body.faq8A },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{faq.q}</h3>
          <p style={pStyle}>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
