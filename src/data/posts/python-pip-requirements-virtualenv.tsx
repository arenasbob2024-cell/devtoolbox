'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Python pip, requirements.txt & Virtual Environments: The Complete Guide',
    intro: 'Managing Python dependencies is one of the first hurdles every developer faces. Whether you are installing packages with <code>pip</code>, pinning versions in <code>requirements.txt</code>, or isolating projects with virtual environments, getting the workflow right saves hours of debugging. This guide covers <strong>everything you need to know</strong> about pip, requirements files, virtual environments, and modern tools like pip-tools, pyproject.toml, and uv.',

    // Section 1: pip basics
    h2_pip_basics: 'pip Basics: Essential Commands',
    pip_basics_intro: '<code>pip</code> is the standard package installer for Python. It connects to the Python Package Index (PyPI) and installs packages into your Python environment. Here are the commands you will use every day.',
    pip_version: 'Check your pip version:',
    pip_install_desc: 'Install, uninstall, and inspect packages:',
    pip_upgrade_desc: 'Upgrade pip itself and packages:',
    pip_search_desc: 'Search and get package info:',

    // Section 2: requirements.txt
    h2_requirements: 'requirements.txt: Format and Version Pinning',
    requirements_intro: 'A <code>requirements.txt</code> file lists all the packages your project depends on. It is the standard way to share and reproduce Python environments.',
    requirements_format: 'Basic format:',
    requirements_generate: 'Generate requirements.txt from your current environment:',
    requirements_install: 'Install all dependencies from requirements.txt:',

    // Section 3: Virtual environments
    h2_venv: 'Virtual Environments: Why You Need Them',
    venv_intro: 'A virtual environment is an isolated Python installation that keeps project dependencies separate. Without it, installing a package for one project can break another. Virtual environments solve the "it works on my machine" problem.',
    h3_why_venv: 'Why Virtual Environments Matter',
    venv_reason1: 'Different projects can use different versions of the same package.',
    venv_reason2: 'You do not need admin/root privileges to install packages.',
    venv_reason3: 'You can reproduce exact environments on any machine.',
    venv_reason4: 'Uninstalling a project means just deleting the venv folder.',
    h3_create_venv: 'Creating and Using venv',
    venv_create_desc: 'The <code>venv</code> module is built into Python 3.3+:',
    venv_activate_desc: 'Activate the virtual environment:',
    venv_deactivate_desc: 'Deactivate when you are done:',
    venv_gitignore: 'Always add the venv folder to <code>.gitignore</code>:',

    // Section 4: venv vs virtualenv vs conda
    h2_comparison: 'venv vs virtualenv vs conda: Which Should You Use?',
    comparison_intro: 'Python has several tools for creating virtual environments. Here is when to use each one.',
    th_tool: 'Tool',
    th_included: 'Included with Python',
    th_speed: 'Speed',
    th_features: 'Key Features',
    th_best_for: 'Best For',
    venv_included: 'Yes (3.3+)',
    venv_speed: 'Fast',
    venv_features: 'Lightweight, no extra install needed',
    venv_best: 'Most Python projects',
    virtualenv_included: 'No (pip install virtualenv)',
    virtualenv_speed: 'Faster than venv',
    virtualenv_features: 'Supports Python 2, more features, faster creation',
    virtualenv_best: 'Legacy projects needing Python 2',
    conda_included: 'No (separate installer)',
    conda_speed: 'Slower',
    conda_features: 'Manages non-Python deps (C libs, CUDA), channels',
    conda_best: 'Data science, ML, scientific computing',

    // Section 5: pip install options
    h2_pip_options: 'pip install Options: Beyond the Basics',
    pip_options_intro: 'pip supports many flags that control how packages are installed. Here are the most useful ones.',
    pip_opt_r: 'Install from requirements file:',
    pip_opt_e: 'Install in editable/development mode (creates a symlink so changes are reflected immediately):',
    pip_opt_user: 'Install to user directory (no sudo needed):',
    pip_opt_no_cache: 'Force fresh download (skip cache):',
    pip_opt_target: 'Install to a custom directory:',
    pip_opt_index: 'Use a custom PyPI index:',
    pip_opt_extra_index: 'Use a private index in addition to PyPI:',

    // Section 6: Version specifiers
    h2_version: 'Version Specifiers Explained',
    version_intro: 'Understanding version specifiers is critical for managing dependencies correctly. Each specifier controls which versions pip is allowed to install.',
    th_specifier: 'Specifier',
    th_example: 'Example',
    th_meaning: 'Meaning',
    ver_exact: 'Exact version only',
    ver_not_equal: 'Any version except 1.0',
    ver_gte: 'Version 1.0 or higher',
    ver_lte: 'Version 2.0 or lower',
    ver_compat: 'Compatible release (>=1.4, ==1.*) — allows patches but not minor bumps',
    ver_wildcard: 'Any 1.x version',
    ver_range: 'Between 1.0 (inclusive) and 2.0 (exclusive)',
    version_advice: 'For most projects, use <code>~=</code> (compatible release) or pin exact versions with <code>==</code>.',

    // Section 7: requirements.txt best practices
    h2_best_practices: 'requirements.txt Best Practices',
    best_practices_intro: 'A well-maintained requirements file prevents dependency hell. Follow these practices to keep your projects stable.',
    h3_pin_versions: 'Pin Exact Versions in Production',
    pin_desc: 'Always pin exact versions for production deployments. Loose version ranges lead to unpredictable behavior.',
    h3_separate_files: 'Separate Dev and Production Dependencies',
    separate_desc: 'Keep development tools out of production:',
    h3_constraints: 'Use Constraints Files',
    constraints_desc: 'Constraints files set version limits without adding packages as dependencies:',
    constraints_usage: 'Use constraints when installing:',
    h3_comments: 'Add Comments for Context',
    comments_desc: 'Document why specific versions are pinned:',

    // Section 8: pyproject.toml
    h2_pyproject: 'pyproject.toml: Modern Python Packaging',
    pyproject_intro: '<code>pyproject.toml</code> is the modern standard for Python project configuration (PEP 621). It replaces <code>setup.py</code>, <code>setup.cfg</code>, and can even serve as a replacement for <code>requirements.txt</code> in many workflows.',
    pyproject_basic: 'Basic project dependencies in pyproject.toml:',
    pyproject_optional: 'Optional dependencies (dev, test, docs):',
    pyproject_install: 'Install with optional dependencies:',
    pyproject_backends: 'Popular build backends:',
    pyproject_backends_list: '<code>setuptools</code> — the classic, most widely used. <code>hatchling</code> — modern, fast, opinionated. <code>flit-core</code> — minimal, for simple packages. <code>poetry-core</code> — used by Poetry ecosystem.',

    // Section 9: pip-tools
    h2_pip_tools: 'pip-tools: Lock Your Dependencies',
    pip_tools_intro: '<code>pip-tools</code> bridges the gap between loose requirements and fully locked dependency files. It consists of two commands: <code>pip-compile</code> and <code>pip-sync</code>.',
    h3_pip_compile: 'pip-compile: Generate Locked Requirements',
    pip_compile_desc: 'Write your top-level dependencies in <code>requirements.in</code> and let pip-compile resolve the full dependency tree:',
    h3_pip_sync: 'pip-sync: Match Your Environment Exactly',
    pip_sync_desc: '<code>pip-sync</code> ensures your virtual environment matches the lock file exactly — it installs missing packages and removes extras:',
    pip_tools_workflow: 'Recommended workflow:',

    // Section 10: Common errors
    h2_errors: 'Common pip Errors and Fixes',
    errors_intro: 'Here are the most frequent pip errors and how to resolve them.',
    h3_no_matching: '"No matching distribution found"',
    no_matching_desc: 'This error means the package does not exist for your Python version or platform:',
    h3_ssl_error: 'SSL Certificate Errors',
    ssl_desc: 'SSL errors usually happen behind corporate proxies or on systems with outdated certificates:',
    h3_permission: 'Permission Denied Errors',
    permission_desc: 'Never use <code>sudo pip install</code>. Use virtual environments or <code>--user</code> instead:',
    h3_version_conflict: 'Version Conflicts',
    conflict_desc: 'When two packages need incompatible versions of the same dependency:',

    // Section 11: uv
    h2_uv: 'uv: The Fast pip Replacement',
    uv_intro: '<code>uv</code> is a Rust-based Python package installer and resolver. Built by the Astral team (makers of Ruff), it is a drop-in replacement for pip that is 10-100x faster.',
    uv_install: 'Install uv:',
    uv_usage: 'Use uv as a pip replacement:',
    uv_venv: 'Create and manage virtual environments:',
    uv_comparison: 'Speed comparison (real-world project with 100+ dependencies):',
    th_operation: 'Operation',
    th_pip_time: 'pip',
    th_uv_time: 'uv',
    uv_cold: 'Cold install',
    uv_cold_pip: '~45s',
    uv_cold_uv: '~3s',
    uv_cached: 'Cached install',
    uv_cached_pip: '~12s',
    uv_cached_uv: '~0.5s',
    uv_resolve: 'Dependency resolution',
    uv_resolve_pip: '~8s',
    uv_resolve_uv: '~0.3s',
    uv_advice: 'uv is fully compatible with requirements.txt, pyproject.toml, and the existing Python packaging ecosystem. It is production-ready and a recommended upgrade from pip for new projects.',

    // Section 12: FAQ
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between pip install and pip install -e?',
    faq1_a: 'pip install copies the package into your site-packages directory. pip install -e (editable mode) creates a symlink instead, so any changes to the source code are immediately reflected without reinstalling. Use -e for local development of packages you are actively working on.',
    faq2_q: 'Should I commit requirements.txt or use pyproject.toml?',
    faq2_a: 'For applications (web apps, scripts, services), use requirements.txt with pinned versions for reproducible deployments. For libraries/packages you publish, use pyproject.toml with flexible version ranges so downstream users can resolve compatible versions. Many teams use both: pyproject.toml for the source of truth and pip-compile to generate a locked requirements.txt.',
    faq3_q: 'How do I fix "externally-managed-environment" error on Ubuntu/Debian?',
    faq3_a: 'Starting with Python 3.11+ on Debian-based systems, pip refuses to install packages system-wide to protect the OS Python installation. The fix is simple: always use a virtual environment. Run python3 -m venv .venv && source .venv/bin/activate first, then pip install works normally inside the venv.',
    faq4_q: 'What is the difference between venv and virtualenv?',
    faq4_a: 'venv is built into Python 3.3+ and requires no installation. virtualenv is a third-party package that supports Python 2, creates environments faster, and has more features (like discovery of installed Python versions). For most modern Python 3 projects, venv is sufficient. Use virtualenv if you need Python 2 support or its extra features.',
    faq5_q: 'How do I use pip behind a corporate proxy?',
    faq5_a: 'Set the HTTP_PROXY and HTTPS_PROXY environment variables: export HTTPS_PROXY=http://proxy.company.com:8080. Or use pip directly: pip install --proxy http://proxy.company.com:8080 requests. If you also have SSL certificate issues, you may need: pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org requests.',

    // Related tools
    related_tools: 'Related Tools',
    related_json: 'JSON Formatter — validate and format JSON output from Python scripts and APIs.',
    related_hash: 'Hash Generator — generate MD5, SHA-256, and other hashes for file integrity verification.',
  },
  zh: {
    title: 'Python pip、requirements.txt 与虚拟环境完全指南',
    intro: '管理 Python 依赖是每个开发者面临的第一个障碍。无论你是用 <code>pip</code> 安装包、在 <code>requirements.txt</code> 中锁定版本，还是用虚拟环境隔离项目，掌握正确的工作流程可以节省数小时的调试时间。本指南涵盖了关于 pip、requirements 文件、虚拟环境以及 pip-tools、pyproject.toml、uv 等现代工具的<strong>所有知识</strong>。',

    // Section 1: pip basics
    h2_pip_basics: 'pip 基础：必备命令',
    pip_basics_intro: '<code>pip</code> 是 Python 的标准包安装工具。它连接到 Python 包索引（PyPI）并将包安装到你的 Python 环境中。以下是你每天都会用到的命令。',
    pip_version: '检查 pip 版本：',
    pip_install_desc: '安装、卸载和查看包：',
    pip_upgrade_desc: '升级 pip 本身和包：',
    pip_search_desc: '搜索和获取包信息：',

    // Section 2: requirements.txt
    h2_requirements: 'requirements.txt：格式和版本锁定',
    requirements_intro: '<code>requirements.txt</code> 文件列出了项目所依赖的所有包。它是共享和复现 Python 环境的标准方式。',
    requirements_format: '基本格式：',
    requirements_generate: '从当前环境生成 requirements.txt：',
    requirements_install: '从 requirements.txt 安装所有依赖：',

    // Section 3: Virtual environments
    h2_venv: '虚拟环境：为什么需要它',
    venv_intro: '虚拟环境是一个隔离的 Python 安装，用于将项目依赖分开管理。如果没有虚拟环境，为一个项目安装包可能会破坏另一个项目。虚拟环境解决了"在我机器上能跑"的问题。',
    h3_why_venv: '为什么虚拟环境很重要',
    venv_reason1: '不同项目可以使用同一个包的不同版本。',
    venv_reason2: '无需管理员/root 权限即可安装包。',
    venv_reason3: '可以在任何机器上精确复现环境。',
    venv_reason4: '卸载项目只需删除 venv 文件夹。',
    h3_create_venv: '创建和使用 venv',
    venv_create_desc: '<code>venv</code> 模块内置于 Python 3.3+：',
    venv_activate_desc: '激活虚拟环境：',
    venv_deactivate_desc: '完成后停用：',
    venv_gitignore: '始终将 venv 文件夹添加到 <code>.gitignore</code>：',

    // Section 4: venv vs virtualenv vs conda
    h2_comparison: 'venv vs virtualenv vs conda：该用哪个？',
    comparison_intro: 'Python 有多种创建虚拟环境的工具。以下是各自的适用场景。',
    th_tool: '工具',
    th_included: '是否内置',
    th_speed: '速度',
    th_features: '核心特性',
    th_best_for: '最佳适用场景',
    venv_included: '是（3.3+）',
    venv_speed: '快',
    venv_features: '轻量级，无需额外安装',
    venv_best: '大多数 Python 项目',
    virtualenv_included: '否（pip install virtualenv）',
    virtualenv_speed: '比 venv 更快',
    virtualenv_features: '支持 Python 2，功能更多，创建更快',
    virtualenv_best: '需要 Python 2 的遗留项目',
    conda_included: '否（独立安装器）',
    conda_speed: '较慢',
    conda_features: '管理非 Python 依赖（C 库、CUDA）、频道',
    conda_best: '数据科学、机器学习、科学计算',

    // Section 5: pip install options
    h2_pip_options: 'pip install 选项：进阶用法',
    pip_options_intro: 'pip 支持许多控制包安装方式的标志。以下是最常用的选项。',
    pip_opt_r: '从 requirements 文件安装：',
    pip_opt_e: '以可编辑/开发模式安装（创建符号链接，更改立即生效）：',
    pip_opt_user: '安装到用户目录（无需 sudo）：',
    pip_opt_no_cache: '强制重新下载（跳过缓存）：',
    pip_opt_target: '安装到自定义目录：',
    pip_opt_index: '使用自定义 PyPI 索引：',
    pip_opt_extra_index: '在 PyPI 之外使用私有索引：',

    // Section 6: Version specifiers
    h2_version: '版本说明符详解',
    version_intro: '理解版本说明符对于正确管理依赖至关重要。每个说明符控制 pip 允许安装哪些版本。',
    th_specifier: '说明符',
    th_example: '示例',
    th_meaning: '含义',
    ver_exact: '仅限精确版本',
    ver_not_equal: '除 1.0 以外的任何版本',
    ver_gte: '1.0 或更高版本',
    ver_lte: '2.0 或更低版本',
    ver_compat: '兼容版本（>=1.4, ==1.*）— 允许补丁更新但不允许次版本变更',
    ver_wildcard: '任何 1.x 版本',
    ver_range: '1.0（含）到 2.0（不含）之间',
    version_advice: '对于大多数项目，使用 <code>~=</code>（兼容版本）或用 <code>==</code> 锁定精确版本。',

    // Section 7: requirements.txt best practices
    h2_best_practices: 'requirements.txt 最佳实践',
    best_practices_intro: '良好维护的 requirements 文件可以防止依赖地狱。遵循这些实践来保持项目稳定。',
    h3_pin_versions: '在生产环境中锁定精确版本',
    pin_desc: '生产部署时始终锁定精确版本。宽松的版本范围会导致不可预测的行为。',
    h3_separate_files: '分离开发和生产依赖',
    separate_desc: '将开发工具与生产环境分开：',
    h3_constraints: '使用约束文件',
    constraints_desc: '约束文件设定版本限制，但不将包添加为依赖：',
    constraints_usage: '安装时使用约束：',
    h3_comments: '添加注释说明上下文',
    comments_desc: '记录为什么锁定特定版本：',

    // Section 8: pyproject.toml
    h2_pyproject: 'pyproject.toml：现代 Python 打包',
    pyproject_intro: '<code>pyproject.toml</code> 是 Python 项目配置的现代标准（PEP 621）。它取代了 <code>setup.py</code>、<code>setup.cfg</code>，在许多工作流中甚至可以替代 <code>requirements.txt</code>。',
    pyproject_basic: 'pyproject.toml 中的基本项目依赖：',
    pyproject_optional: '可选依赖（开发、测试、文档）：',
    pyproject_install: '安装可选依赖：',
    pyproject_backends: '流行的构建后端：',
    pyproject_backends_list: '<code>setuptools</code> — 经典且使用最广泛。<code>hatchling</code> — 现代、快速、有主见。<code>flit-core</code> — 极简，适合简单包。<code>poetry-core</code> — Poetry 生态系统使用。',

    // Section 9: pip-tools
    h2_pip_tools: 'pip-tools：锁定你的依赖',
    pip_tools_intro: '<code>pip-tools</code> 弥合了宽松 requirements 和完全锁定依赖文件之间的差距。它由两个命令组成：<code>pip-compile</code> 和 <code>pip-sync</code>。',
    h3_pip_compile: 'pip-compile：生成锁定的 Requirements',
    pip_compile_desc: '在 <code>requirements.in</code> 中写入顶层依赖，让 pip-compile 解析完整的依赖树：',
    h3_pip_sync: 'pip-sync：精确匹配你的环境',
    pip_sync_desc: '<code>pip-sync</code> 确保你的虚拟环境与锁定文件完全匹配 — 它安装缺失的包并移除多余的包：',
    pip_tools_workflow: '推荐的工作流程：',

    // Section 10: Common errors
    h2_errors: '常见 pip 错误及修复',
    errors_intro: '以下是最常见的 pip 错误以及如何解决它们。',
    h3_no_matching: '"No matching distribution found"',
    no_matching_desc: '此错误表示该包不存在于你的 Python 版本或平台上：',
    h3_ssl_error: 'SSL 证书错误',
    ssl_desc: 'SSL 错误通常发生在企业代理后面或证书过期的系统上：',
    h3_permission: '权限被拒绝错误',
    permission_desc: '永远不要使用 <code>sudo pip install</code>。请使用虚拟环境或 <code>--user</code>：',
    h3_version_conflict: '版本冲突',
    conflict_desc: '当两个包需要同一依赖的不兼容版本时：',

    // Section 11: uv
    h2_uv: 'uv：极速 pip 替代品',
    uv_intro: '<code>uv</code> 是基于 Rust 的 Python 包安装器和解析器。由 Astral 团队（Ruff 的创造者）打造，它是 pip 的直接替代品，速度快 10-100 倍。',
    uv_install: '安装 uv：',
    uv_usage: '用 uv 替代 pip：',
    uv_venv: '创建和管理虚拟环境：',
    uv_comparison: '速度对比（包含 100+ 依赖的真实项目）：',
    th_operation: '操作',
    th_pip_time: 'pip',
    th_uv_time: 'uv',
    uv_cold: '冷安装',
    uv_cold_pip: '~45秒',
    uv_cold_uv: '~3秒',
    uv_cached: '缓存安装',
    uv_cached_pip: '~12秒',
    uv_cached_uv: '~0.5秒',
    uv_resolve: '依赖解析',
    uv_resolve_pip: '~8秒',
    uv_resolve_uv: '~0.3秒',
    uv_advice: 'uv 完全兼容 requirements.txt、pyproject.toml 和现有的 Python 打包生态系统。它已经可以用于生产环境，推荐新项目使用 uv 替代 pip。',

    // Section 12: FAQ
    h2_faq: '常见问题',
    faq1_q: 'pip install 和 pip install -e 有什么区别？',
    faq1_a: 'pip install 会将包复制到 site-packages 目录。pip install -e（可编辑模式）则创建符号链接，因此对源代码的任何更改都会立即生效，无需重新安装。在开发你正在积极修改的本地包时使用 -e。',
    faq2_q: '应该提交 requirements.txt 还是使用 pyproject.toml？',
    faq2_a: '对于应用程序（Web 应用、脚本、服务），使用带有精确版本锁定的 requirements.txt 以实现可复现的部署。对于你发布的库/包，使用 pyproject.toml 并设置灵活的版本范围，让下游用户可以解析兼容版本。许多团队同时使用两者：pyproject.toml 作为真实来源，pip-compile 生成锁定的 requirements.txt。',
    faq3_q: '如何修复 Ubuntu/Debian 上的 "externally-managed-environment" 错误？',
    faq3_a: '从 Python 3.11+ 开始，Debian 系统上的 pip 拒绝在系统范围内安装包，以保护操作系统的 Python 安装。修复方法很简单：始终使用虚拟环境。先运行 python3 -m venv .venv && source .venv/bin/activate，然后 pip install 就可以在虚拟环境中正常工作。',
    faq4_q: 'venv 和 virtualenv 有什么区别？',
    faq4_a: 'venv 内置于 Python 3.3+，无需安装。virtualenv 是第三方包，支持 Python 2，创建环境更快，功能更多（如发现已安装的 Python 版本）。对于大多数现代 Python 3 项目，venv 就够用了。如果需要 Python 2 支持或其额外功能，使用 virtualenv。',
    faq5_q: '如何在企业代理后面使用 pip？',
    faq5_a: '设置 HTTP_PROXY 和 HTTPS_PROXY 环境变量：export HTTPS_PROXY=http://proxy.company.com:8080。或直接使用 pip：pip install --proxy http://proxy.company.com:8080 requests。如果还有 SSL 证书问题，可能需要：pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org requests。',

    // Related tools
    related_tools: '相关工具',
    related_json: 'JSON 格式化工具 — 验证和格式化 Python 脚本和 API 的 JSON 输出。',
    related_hash: '哈希生成器 — 生成 MD5、SHA-256 和其他哈希值，用于文件完整性验证。',
  },
};

export default function PythonPipRequirementsVirtualenv({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* ========== SECTION 1: PIP BASICS ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_pip_basics}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.pip_basics_intro }} />

      <p>{t.pip_version}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Check pip version
pip --version
# pip 24.0 from /usr/lib/python3/dist-packages/pip (python 3.12)

# Check which Python pip is linked to
pip -V
python -m pip --version`}</code>
      </pre>

      <p>{t.pip_install_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Install a package
pip install requests

# Install a specific version
pip install requests==2.31.0

# Uninstall a package
pip uninstall requests

# List all installed packages
pip list

# Show details about a specific package
pip show requests
# Name: requests
# Version: 2.31.0
# Location: /home/user/.venv/lib/python3.12/site-packages
# Requires: certifi, charset-normalizer, idna, urllib3

# List outdated packages
pip list --outdated`}</code>
      </pre>

      <p>{t.pip_upgrade_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Upgrade pip itself
python -m pip install --upgrade pip

# Upgrade a package to the latest version
pip install --upgrade requests

# Upgrade all outdated packages (bash one-liner)
pip list --outdated --format=columns | tail -n +3 | awk '{print $1}' | xargs pip install --upgrade`}</code>
      </pre>

      <p>{t.pip_search_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# pip search is disabled on PyPI — use the website or:
pip index versions requests
# Available versions: 2.31.0, 2.30.0, 2.29.0, ...

# Show package info without installing
pip show requests

# Download without installing (useful for offline installs)
pip download requests -d ./packages/`}</code>
      </pre>

      {/* ========== SECTION 2: REQUIREMENTS.TXT ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_requirements}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.requirements_intro }} />

      <p>{t.requirements_format}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# requirements.txt

# Pinned versions (recommended for production)
requests==2.31.0
flask==3.0.0
sqlalchemy==2.0.23

# Minimum version
numpy>=1.24.0

# Compatible release (allows patches: >=1.4.0, <2.0.0)
django~=4.2.0

# Version range
celery>=5.3.0,<6.0.0

# Install from git repository
git+https://github.com/user/repo.git@main#egg=mypackage

# Install from local file
./libs/my-local-package/

# Include another requirements file
-r requirements-base.txt`}</code>
      </pre>

      <p>{t.requirements_generate}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Generate from current environment (includes ALL packages)
pip freeze > requirements.txt

# The output looks like:
# certifi==2023.11.17
# charset-normalizer==3.3.2
# idna==3.6
# requests==2.31.0
# urllib3==2.1.0

# WARNING: pip freeze includes transitive dependencies too
# For cleaner results, use pip-tools (see below)`}</code>
      </pre>

      <p>{t.requirements_install}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Install all dependencies from requirements.txt
pip install -r requirements.txt

# Install from multiple files
pip install -r requirements.txt -r requirements-dev.txt

# Dry run — show what would be installed without installing
pip install -r requirements.txt --dry-run`}</code>
      </pre>

      {/* ========== SECTION 3: VIRTUAL ENVIRONMENTS ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_venv}</h2>
      <p>{t.venv_intro}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_why_venv}</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>{t.venv_reason1}</li>
        <li>{t.venv_reason2}</li>
        <li>{t.venv_reason3}</li>
        <li>{t.venv_reason4}</li>
      </ul>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_create_venv}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.venv_create_desc }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Create a virtual environment named ".venv"
python -m venv .venv

# Or with a custom name
python3 -m venv myproject-env

# Create with access to system packages
python -m venv --system-site-packages .venv

# Create with a specific Python version (if multiple installed)
python3.12 -m venv .venv`}</code>
      </pre>

      <p>{t.venv_activate_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Linux / macOS (bash/zsh)
source .venv/bin/activate

# Windows (PowerShell)
.venv\\Scripts\\Activate.ps1

# Windows (cmd.exe)
.venv\\Scripts\\activate.bat

# Fish shell
source .venv/bin/activate.fish

# Your prompt changes to show the active venv:
# (.venv) user@host:~/project$

# Verify you are using the venv Python
which python    # Linux/macOS
where python    # Windows
# Should point to .venv/bin/python or .venv\\Scripts\\python.exe`}</code>
      </pre>

      <p>{t.venv_deactivate_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Deactivate the virtual environment
deactivate

# Your prompt returns to normal:
# user@host:~/project$`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: t.venv_gitignore }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# .gitignore
.venv/
venv/
env/
.env/

# Also ignore compiled Python files
__pycache__/
*.py[cod]
*.egg-info/`}</code>
      </pre>

      {/* ========== SECTION 4: COMPARISON TABLE ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_comparison}</h2>
      <p>{t.comparison_intro}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_tool}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_included}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_speed}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_features}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_best_for}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-green-400">venv</td>
              <td className="border border-gray-700 px-4 py-2">{t.venv_included}</td>
              <td className="border border-gray-700 px-4 py-2">{t.venv_speed}</td>
              <td className="border border-gray-700 px-4 py-2">{t.venv_features}</td>
              <td className="border border-gray-700 px-4 py-2">{t.venv_best}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-yellow-400">virtualenv</td>
              <td className="border border-gray-700 px-4 py-2">{t.virtualenv_included}</td>
              <td className="border border-gray-700 px-4 py-2">{t.virtualenv_speed}</td>
              <td className="border border-gray-700 px-4 py-2">{t.virtualenv_features}</td>
              <td className="border border-gray-700 px-4 py-2">{t.virtualenv_best}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-blue-400">conda</td>
              <td className="border border-gray-700 px-4 py-2">{t.conda_included}</td>
              <td className="border border-gray-700 px-4 py-2">{t.conda_speed}</td>
              <td className="border border-gray-700 px-4 py-2">{t.conda_features}</td>
              <td className="border border-gray-700 px-4 py-2">{t.conda_best}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# virtualenv — install and use
pip install virtualenv
virtualenv .venv
source .venv/bin/activate   # same activation as venv

# conda — create and manage environments
conda create -n myproject python=3.12
conda activate myproject
conda install numpy pandas
conda deactivate

# conda — export and reproduce environment
conda env export > environment.yml
conda env create -f environment.yml`}</code>
      </pre>

      {/* ========== SECTION 5: PIP INSTALL OPTIONS ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_pip_options}</h2>
      <p>{t.pip_options_intro}</p>

      <p>{t.pip_opt_r}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`pip install -r requirements.txt
pip install -r requirements.txt -r requirements-dev.txt`}</code>
      </pre>

      <p>{t.pip_opt_e}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Install current directory in editable mode
pip install -e .

# Install with optional extras in editable mode
pip install -e ".[dev,test]"

# Install a local package from another directory
pip install -e ../my-other-package/`}</code>
      </pre>

      <p>{t.pip_opt_user}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Install to ~/.local (no admin rights needed)
pip install --user requests

# Packages go to:
# Linux: ~/.local/lib/python3.x/site-packages/
# macOS: ~/Library/Python/3.x/lib/python/site-packages/
# Windows: %APPDATA%\\Python\\Python3x\\site-packages\\`}</code>
      </pre>

      <p>{t.pip_opt_no_cache}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Skip the cache — useful in CI or to force re-download
pip install --no-cache-dir requests

# See where pip cache is stored
pip cache dir

# Clear all cached packages
pip cache purge`}</code>
      </pre>

      <p>{t.pip_opt_target}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Install to a specific directory
pip install --target ./vendor requests`}</code>
      </pre>

      <p>{t.pip_opt_index}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Use a custom PyPI mirror
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple requests

# Set default index permanently
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple`}</code>
      </pre>

      <p>{t.pip_opt_extra_index}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Use a private index alongside PyPI
pip install --extra-index-url https://private.pypi.company.com/simple mypackage`}</code>
      </pre>

      {/* ========== SECTION 6: VERSION SPECIFIERS ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_version}</h2>
      <p>{t.version_intro}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_specifier}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_example}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_meaning}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-green-400">==</td>
              <td className="border border-gray-700 px-4 py-2 font-mono">requests==2.31.0</td>
              <td className="border border-gray-700 px-4 py-2">{t.ver_exact}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-green-400">!=</td>
              <td className="border border-gray-700 px-4 py-2 font-mono">requests!=1.0</td>
              <td className="border border-gray-700 px-4 py-2">{t.ver_not_equal}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-green-400">&gt;=</td>
              <td className="border border-gray-700 px-4 py-2 font-mono">requests&gt;=1.0</td>
              <td className="border border-gray-700 px-4 py-2">{t.ver_gte}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-green-400">&lt;=</td>
              <td className="border border-gray-700 px-4 py-2 font-mono">requests&lt;=2.0</td>
              <td className="border border-gray-700 px-4 py-2">{t.ver_lte}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-green-400">~=</td>
              <td className="border border-gray-700 px-4 py-2 font-mono">requests~=1.4</td>
              <td className="border border-gray-700 px-4 py-2">{t.ver_compat}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-green-400">==1.*</td>
              <td className="border border-gray-700 px-4 py-2 font-mono">requests==1.*</td>
              <td className="border border-gray-700 px-4 py-2">{t.ver_wildcard}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-green-400">&gt;=,&lt;</td>
              <td className="border border-gray-700 px-4 py-2 font-mono">requests&gt;=1.0,&lt;2.0</td>
              <td className="border border-gray-700 px-4 py-2">{t.ver_range}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4" dangerouslySetInnerHTML={{ __html: t.version_advice }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Examples in requirements.txt:
requests==2.31.0        # Exact: always install 2.31.0
django~=4.2.0           # Compatible: >=4.2.0, <5.0.0
flask>=3.0,<4.0         # Range: any 3.x version
numpy>=1.24             # Minimum: 1.24 or higher
celery!=5.3.1           # Exclude: any version except 5.3.1`}</code>
      </pre>

      {/* ========== SECTION 7: BEST PRACTICES ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_best_practices}</h2>
      <p>{t.best_practices_intro}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_pin_versions}</h3>
      <p>{t.pin_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# BAD — loose versions lead to "works on my machine" problems
requests
flask>=2.0
sqlalchemy

# GOOD — exact pins for reproducible builds
requests==2.31.0
flask==3.0.0
sqlalchemy==2.0.23
werkzeug==3.0.1
jinja2==3.1.2`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_separate_files}</h3>
      <p>{t.separate_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# requirements.txt (production)
flask==3.0.0
gunicorn==21.2.0
sqlalchemy==2.0.23
redis==5.0.1

# requirements-dev.txt (development only)
-r requirements.txt
pytest==7.4.3
pytest-cov==4.1.0
black==23.12.0
mypy==1.7.1
ruff==0.1.8

# Install for development:
pip install -r requirements-dev.txt

# Install for production (Docker, CI):
pip install -r requirements.txt`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_constraints}</h3>
      <p>{t.constraints_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# constraints.txt — limits versions without adding as deps
urllib3<2.0
cryptography>=41.0.0
setuptools>=69.0`}</code>
      </pre>

      <p>{t.constraints_usage}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`pip install -r requirements.txt -c constraints.txt`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_comments}</h3>
      <p>{t.comments_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# requirements.txt with comments
requests==2.31.0          # HTTP client
flask==3.0.0              # Web framework
sqlalchemy==2.0.23        # ORM
celery==5.3.6             # Task queue
redis==5.0.1              # Celery broker backend
Pillow==10.1.0            # Pinned: 10.2.0 has regression in JPEG handling
cryptography==41.0.7      # Pinned: 42.x requires Rust 1.63+`}</code>
      </pre>

      {/* ========== SECTION 8: PYPROJECT.TOML ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_pyproject}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.pyproject_intro }} />

      <p>{t.pyproject_basic}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# pyproject.toml
[build-system]
requires = ["setuptools>=69.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my-project"
version = "1.0.0"
description = "A sample Python project"
requires-python = ">=3.10"
dependencies = [
    "requests>=2.31.0",
    "flask>=3.0.0,<4.0.0",
    "sqlalchemy~=2.0",
    "pydantic>=2.5.0",
]`}</code>
      </pre>

      <p>{t.pyproject_optional}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# pyproject.toml — optional dependency groups
[project.optional-dependencies]
dev = [
    "pytest>=7.4",
    "pytest-cov>=4.1",
    "black>=23.12",
    "ruff>=0.1.8",
    "mypy>=1.7",
]
docs = [
    "sphinx>=7.2",
    "sphinx-rtd-theme>=2.0",
]
test = [
    "pytest>=7.4",
    "pytest-asyncio>=0.23",
    "httpx>=0.25",  # for testing async HTTP
]`}</code>
      </pre>

      <p>{t.pyproject_install}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Install with optional dependencies
pip install ".[dev]"
pip install ".[dev,test,docs]"

# Editable install with extras
pip install -e ".[dev]"`}</code>
      </pre>

      <p>{t.pyproject_backends}</p>
      <p dangerouslySetInnerHTML={{ __html: t.pyproject_backends_list }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# setuptools (classic)
[build-system]
requires = ["setuptools>=69.0", "wheel"]
build-backend = "setuptools.build_meta"

# hatchling (modern)
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

# flit (minimal)
[build-system]
requires = ["flit_core>=3.4"]
build-backend = "flit_core.buildapi"

# poetry-core
[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"`}</code>
      </pre>

      {/* ========== SECTION 9: PIP-TOOLS ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_pip_tools}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.pip_tools_intro }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_pip_compile}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.pip_compile_desc }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Install pip-tools
pip install pip-tools

# Create requirements.in (your top-level deps)
# requirements.in
flask
requests
sqlalchemy
celery[redis]

# Compile to locked requirements.txt
pip-compile requirements.in

# Output: requirements.txt with ALL transitive deps pinned
# certifi==2023.11.17        # via requests
# charset-normalizer==3.3.2  # via requests
# click==8.1.7               # via flask
# flask==3.0.0               # via -r requirements.in
# ...

# Compile for a different Python version
pip-compile --python-version 3.11 requirements.in

# Upgrade all packages to latest compatible versions
pip-compile --upgrade requirements.in

# Upgrade a specific package
pip-compile --upgrade-package flask requirements.in`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_pip_sync}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.pip_sync_desc }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Sync your environment to match requirements.txt exactly
pip-sync requirements.txt

# Sync with multiple files (e.g., prod + dev)
pip-sync requirements.txt requirements-dev.txt

# Dry run — see what would change
pip-sync --dry-run requirements.txt`}</code>
      </pre>

      <p>{t.pip_tools_workflow}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Step 1: Write your direct dependencies in .in files
# requirements.in        — production deps
# requirements-dev.in    — dev deps (includes -r requirements.in)

# Step 2: Compile to locked .txt files
pip-compile requirements.in
pip-compile requirements-dev.in

# Step 3: Install with pip-sync
pip-sync requirements-dev.txt  # for development
pip-sync requirements.txt      # for production

# Step 4: When adding a new dependency
# Edit requirements.in, then re-run pip-compile

# Step 5: When upgrading
pip-compile --upgrade requirements.in
pip-sync requirements.txt`}</code>
      </pre>

      {/* ========== SECTION 10: COMMON ERRORS ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_errors}</h2>
      <p>{t.errors_intro}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_no_matching}</h3>
      <p>{t.no_matching_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# ERROR: No matching distribution found for some-package==1.0.0

# Fix 1: Check if the package name is correct
pip index versions some-package

# Fix 2: Check your Python version — some packages drop old Python support
python --version
pip install some-package  # without version pin

# Fix 3: Check if the package has wheels for your platform
pip install some-package --verbose

# Fix 4: The package may be on a different index
pip install some-package --extra-index-url https://other-index.com/simple`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ssl_error}</h3>
      <p>{t.ssl_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# ERROR: Could not fetch URL: SSL: CERTIFICATE_VERIFY_FAILED

# Fix 1: Update certificates
pip install --upgrade certifi

# Fix 2: Trust the hosts (corporate proxy workaround)
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org requests

# Fix 3: Set permanently in pip config
pip config set global.trusted-host "pypi.org files.pythonhosted.org"

# Fix 4: Use a custom certificate bundle
pip install --cert /path/to/company-ca-bundle.crt requests`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_permission}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.permission_desc }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# ERROR: Permission denied (NEVER use sudo pip install!)

# Fix 1: Use a virtual environment (BEST solution)
python -m venv .venv
source .venv/bin/activate
pip install requests  # works without sudo

# Fix 2: Install to user directory
pip install --user requests

# Fix 3: On Debian/Ubuntu with "externally-managed-environment"
# ALWAYS use a venv — this error protects your system Python
python3 -m venv .venv && source .venv/bin/activate && pip install requests`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_version_conflict}</h3>
      <p>{t.conflict_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# ERROR: package-a requires dep>=2.0 but package-b requires dep<2.0

# Fix 1: Check what's conflicting
pip check

# Fix 2: See the dependency tree
pip install pipdeptree
pipdeptree

# Fix 3: Try to find compatible versions
pip install "package-a>=1.0" "package-b>=2.0" --dry-run

# Fix 4: Use pip-compile to resolve automatically
# Write both in requirements.in and let pip-compile find compatible versions
pip-compile requirements.in`}</code>
      </pre>

      {/* ========== SECTION 11: UV ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_uv}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.uv_intro }} />

      <p>{t.uv_install}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Install uv (standalone — no Python required)
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# Or with pip
pip install uv

# Or with Homebrew
brew install uv`}</code>
      </pre>

      <p>{t.uv_usage}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Drop-in pip replacement — same commands, much faster
uv pip install requests
uv pip install -r requirements.txt
uv pip install -e ".[dev]"
uv pip uninstall requests
uv pip list
uv pip freeze
uv pip compile requirements.in -o requirements.txt`}</code>
      </pre>

      <p>{t.uv_venv}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Create a virtual environment with uv (much faster than python -m venv)
uv venv

# Create with a specific Python version
uv venv --python 3.12

# Activate (same as regular venv)
source .venv/bin/activate    # Linux/macOS
.venv\\Scripts\\activate       # Windows

# Full project workflow with uv
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt`}</code>
      </pre>

      <p>{t.uv_comparison}</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_operation}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_pip_time}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_uv_time}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">{t.uv_cold}</td>
              <td className="border border-gray-700 px-4 py-2 font-mono text-red-400">{t.uv_cold_pip}</td>
              <td className="border border-gray-700 px-4 py-2 font-mono text-green-400">{t.uv_cold_uv}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">{t.uv_cached}</td>
              <td className="border border-gray-700 px-4 py-2 font-mono text-red-400">{t.uv_cached_pip}</td>
              <td className="border border-gray-700 px-4 py-2 font-mono text-green-400">{t.uv_cached_uv}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">{t.uv_resolve}</td>
              <td className="border border-gray-700 px-4 py-2 font-mono text-red-400">{t.uv_resolve_pip}</td>
              <td className="border border-gray-700 px-4 py-2 font-mono text-green-400">{t.uv_resolve_uv}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4">{t.uv_advice}</p>

      {/* ========== SECTION 12: FAQ ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq1_q}</h3>
          <p>{t.faq1_a}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq2_q}</h3>
          <p>{t.faq2_a}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq3_q}</h3>
          <p>{t.faq3_a}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq4_q}</h3>
          <p>{t.faq4_a}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq5_q}</h3>
          <p>{t.faq5_a}</p>
        </div>
      </div>

      {/* ========== RELATED TOOLS ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.related_tools}</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>
            {t.related_json}
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/tools/hash-generator`} style={{ fontWeight: 600 }}>
            {t.related_hash}
          </Link>
        </li>
      </ul>
    </article>
  );
}
