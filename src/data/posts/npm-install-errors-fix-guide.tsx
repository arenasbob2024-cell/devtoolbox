'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'npm install Errors: Every Common Error and How to Fix It',
    intro: 'Running <code>npm install</code> and hitting a wall of red text is a rite of passage for every JavaScript developer. Whether it is a permissions error on macOS, a dependency conflict in a monorepo, or a corrupted cache in CI, the fix is usually straightforward once you know what to look for. This guide covers <strong>every common npm install error</strong>, explains why it happens, and gives you the exact commands to fix it.',
    h2_error_dict: 'Error Dictionary: Quick Reference Table',
    th_code: 'Error Code',
    th_meaning: 'What It Means',
    th_quick_fix: 'Quick Fix',
    eacces_meaning: 'Permission denied — npm tried to write to a directory you do not own.',
    eacces_fix: 'Use nvm or fix directory ownership (see below).',
    enoent_meaning: 'File or directory not found — a referenced path does not exist.',
    enoent_fix: 'Delete node_modules and package-lock.json, then reinstall.',
    eperm_meaning: 'Operation not permitted — often a file lock issue on Windows.',
    eperm_fix: 'Close editors/terminals locking the folder, then retry.',
    eresolve_meaning: 'Dependency conflict — two packages require incompatible versions of a peer dependency.',
    eresolve_fix: 'Use --legacy-peer-deps or --force (see section below).',
    err_socket_meaning: 'Network timeout — npm could not reach the registry.',
    err_socket_fix: 'Check network/proxy settings, or switch to a mirror registry.',
    code1_meaning: 'A lifecycle script (preinstall, postinstall) exited with error code 1.',
    code1_fix: 'Check build tools (Python, node-gyp, C++ compiler) are installed.',
    h2_eacces: 'EACCES: Fixing Permission Errors',
    eacces_intro: 'This is the most common error on macOS and Linux. It happens when npm tries to install global packages into a system-owned directory like <code>/usr/local/lib/node_modules</code>.',
    h3_eacces_mac: 'Fix on macOS / Linux (Recommended: Use nvm)',
    eacces_mac_desc: 'The best permanent fix is to use a Node version manager so npm installs into your home directory:',
    eacces_mac_alt: 'Alternative: Change npm default directory manually:',
    eacces_mac_chown: 'Nuclear option (not recommended for most users):',
    h3_eacces_win: 'Fix on Windows',
    eacces_win_desc: 'On Windows, run your terminal as Administrator, or better yet, use nvm-windows:',
    h2_eresolve: 'ERESOLVE: Fixing Dependency Conflicts',
    eresolve_intro: 'Starting with npm 7, peer dependency conflicts cause the install to fail by default. You will see a tree diagram showing which packages conflict.',
    eresolve_example_desc: 'Typical error output:',
    h3_legacy: '--legacy-peer-deps vs --force',
    legacy_desc: '<code>--legacy-peer-deps</code> tells npm to ignore peer dependency conflicts entirely (same behavior as npm 6). <code>--force</code> tells npm to install regardless and accept any potential issues. Here is when to use each:',
    legacy_option: '--legacy-peer-deps',
    legacy_when: 'When you know the peer dep mismatch is harmless (e.g., React 18 vs 17 peer dep).',
    force_option: '--force',
    force_when: 'When you want npm to fetch packages even if a cached copy exists and override conflicts.',
    preferred_desc: 'Preferred approach — pin the conflicting dependency:',
    h2_corruption: 'node_modules Corruption: When and How to Nuke and Reinstall',
    corruption_intro: 'Sometimes node_modules just gets into a bad state. Symptoms include "Cannot find module" errors for packages that are clearly in package.json, or strange build failures after switching branches.',
    h3_when_nuke: 'When to Nuke node_modules',
    nuke_reason1: 'After switching branches with different dependency trees.',
    nuke_reason2: 'After resolving merge conflicts in package-lock.json.',
    nuke_reason3: 'When you see "Module not found" for a clearly installed package.',
    nuke_reason4: 'After upgrading Node.js to a new major version.',
    h3_how_nuke: 'How to Clean Reinstall',
    nuke_cross: 'Cross-platform one-liner (works in bash):',
    nuke_windows: 'On Windows (PowerShell):',
    nuke_npx: 'Using npx for convenience:',
    cache_clean: 'If problems persist, also clean the npm cache:',
    h2_lockfile: 'package-lock.json Conflicts: Merge Strategies',
    lockfile_intro: 'When multiple developers change dependencies, package-lock.json merge conflicts are almost guaranteed. Never try to resolve them manually — the file is machine-generated.',
    h3_strategy: 'Recommended Merge Strategy',
    lockfile_step1: 'Accept either side of the conflict (it does not matter which):',
    lockfile_step2: 'Regenerate the lock file:',
    lockfile_step3: 'Commit the result:',
    h3_gitattributes: 'Prevent Conflicts with .gitattributes',
    gitattributes_desc: 'Add this to your <code>.gitattributes</code> to auto-resolve lock file conflicts:',
    h2_node_version: 'Node.js Version Incompatibility',
    node_version_intro: 'Many packages require specific Node.js versions. If your Node version is too old (or too new), npm install can fail with compilation errors or unsupported engine warnings.',
    h3_check_version: 'Check Required Version',
    check_version_desc: 'Look for the <code>engines</code> field in package.json:',
    h3_nvm_fnm: 'Use nvm or fnm to Switch Versions',
    nvm_desc: 'nvm (Node Version Manager):',
    fnm_desc: 'fnm (Fast Node Manager) — faster alternative:',
    nvmrc_desc: 'Create an <code>.nvmrc</code> file in your project root so the whole team uses the same version:',
    h2_ci: 'CI/CD Issues: Docker Builds and GitHub Actions',
    ci_intro: 'npm install behaves differently in CI environments. Caching, permissions, and network settings all need special attention.',
    h3_docker: 'Docker Builds',
    docker_desc: 'Common mistakes in Dockerfiles:',
    docker_tip: 'Key points: copy package files first for layer caching, use <code>npm ci</code> instead of <code>npm install</code> in CI (it is faster and deterministic), and use <code>--ignore-scripts</code> if you do not need postinstall scripts.',
    h3_github_actions: 'GitHub Actions Caching',
    github_actions_desc: 'Proper caching can cut install time by 70%+:',
    h2_flowchart: 'Decision Flowchart: npm install Failed — Follow This',
    flowchart_intro: 'Use this flowchart to diagnose your npm install failure:',
    flow_step1: '1. Is it a permission error (EACCES / EPERM)?',
    flow_step1_yes: 'YES -> Use nvm or fix directory ownership.',
    flow_step2: '2. Is it a dependency conflict (ERESOLVE)?',
    flow_step2_yes: 'YES -> Try --legacy-peer-deps first, then check version pinning.',
    flow_step3: '3. Is it a network error (SOCKET_TIMEOUT / FETCH)?',
    flow_step3_yes: 'YES -> Check proxy, VPN, or switch registry to npmmirror.com.',
    flow_step4: '4. Is it a build/compilation error (node-gyp / code 1)?',
    flow_step4_yes: 'YES -> Install build tools (python3, make, g++ / Visual Studio Build Tools).',
    flow_step5: '5. Is it "Cannot find module" or strange behavior?',
    flow_step5_yes: 'YES -> Delete node_modules + package-lock.json, then npm install.',
    flow_step6: '6. Still failing?',
    flow_step6_yes: 'YES -> Clean npm cache (npm cache clean --force), check Node version, try fresh clone.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I fix "npm ERR! EACCES: permission denied" on Mac?',
    faq1_a: 'The best fix is to install Node.js through nvm (Node Version Manager) which installs to your home directory and avoids permission issues entirely. Run: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash, then nvm install --lts. Alternatively, change the npm global directory: mkdir ~/.npm-global && npm config set prefix ~/.npm-global and add it to your PATH.',
    faq2_q: 'What does "npm ERR! ERESOLVE could not resolve" mean?',
    faq2_a: 'ERESOLVE means two or more packages in your dependency tree require different, incompatible versions of the same peer dependency. Starting with npm 7, this is a hard error. You can fix it by adding --legacy-peer-deps to your npm install command, which tells npm to ignore peer dependency conflicts (like npm 6 behavior), or by manually pinning compatible versions in your package.json overrides field.',
    faq3_q: 'Should I delete package-lock.json to fix npm install errors?',
    faq3_a: 'Deleting package-lock.json should be a last resort, not a first step. The lock file ensures deterministic installs. First try deleting only node_modules and running npm install. If that fails, then delete both node_modules and package-lock.json. Always commit the regenerated lock file.',
    faq4_q: 'Why does npm install fail in Docker but work locally?',
    faq4_a: 'Common causes: running as root without --unsafe-perm, missing native build tools (python3, make, g++) in the Docker image, COPY order preventing layer caching, or .dockerignore not excluding node_modules. Use npm ci instead of npm install in Docker for deterministic builds.',
    faq5_q: 'How do I fix "npm ERR! code 1" during npm install?',
    faq5_a: 'Error code 1 usually means a postinstall script failed, often a native module compilation (node-gyp). On macOS, install Xcode Command Line Tools: xcode-select --install. On Ubuntu/Debian: sudo apt install build-essential python3. On Windows: npm install -g windows-build-tools or install Visual Studio Build Tools.',
    faq6_q: 'What is the difference between npm install and npm ci?',
    faq6_a: 'npm install reads package.json and may update package-lock.json. npm ci (clean install) deletes node_modules, reads only package-lock.json, and installs exact versions. Use npm ci in CI/CD pipelines and Docker builds for faster, reproducible installs. Use npm install during local development when you need to update dependencies.',
  },
  zh: {
    title: 'npm install 报错：常见错误大全及修复方法',
    intro: '运行 <code>npm install</code> 然后看到一大片红色报错信息，是每个 JavaScript 开发者的必经之路。无论是 macOS 上的权限错误、monorepo 中的依赖冲突，还是 CI 中损坏的缓存，只要知道该查什么，修复通常很简单。本指南涵盖<strong>每一个常见的 npm install 错误</strong>，解释其原因，并提供精确的修复命令。',
    h2_error_dict: '错误速查表',
    th_code: '错误代码',
    th_meaning: '含义',
    th_quick_fix: '快速修复',
    eacces_meaning: '权限被拒绝 — npm 尝试写入你没有所有权的目录。',
    eacces_fix: '使用 nvm 或修复目录权限（见下文）。',
    enoent_meaning: '文件或目录不存在 — 引用的路径不存在。',
    enoent_fix: '删除 node_modules 和 package-lock.json，然后重新安装。',
    eperm_meaning: '操作不允许 — 通常是 Windows 上的文件锁定问题。',
    eperm_fix: '关闭锁定文件夹的编辑器/终端，然后重试。',
    eresolve_meaning: '依赖冲突 — 两个包需要某个 peer 依赖的不兼容版本。',
    eresolve_fix: '使用 --legacy-peer-deps 或 --force（见下文）。',
    err_socket_meaning: '网络超时 — npm 无法连接到注册表。',
    err_socket_fix: '检查网络/代理设置，或切换到镜像源。',
    code1_meaning: '生命周期脚本（preinstall、postinstall）以错误码 1 退出。',
    code1_fix: '检查构建工具（Python、node-gyp、C++ 编译器）是否已安装。',
    h2_eacces: 'EACCES：修复权限错误',
    eacces_intro: '这是 macOS 和 Linux 上最常见的错误。当 npm 尝试将全局包安装到系统目录（如 <code>/usr/local/lib/node_modules</code>）时会发生此错误。',
    h3_eacces_mac: '在 macOS / Linux 上修复（推荐：使用 nvm）',
    eacces_mac_desc: '最佳的永久修复方案是使用 Node 版本管理器，这样 npm 会安装到你的用户目录：',
    eacces_mac_alt: '备选方案：手动更改 npm 默认目录：',
    eacces_mac_chown: '强制方案（不推荐大多数用户使用）：',
    h3_eacces_win: '在 Windows 上修复',
    eacces_win_desc: '在 Windows 上以管理员身份运行终端，或者更好的方式是使用 nvm-windows：',
    h2_eresolve: 'ERESOLVE：修复依赖冲突',
    eresolve_intro: '从 npm 7 开始，peer 依赖冲突默认会导致安装失败。你会看到一个树状图显示哪些包存在冲突。',
    eresolve_example_desc: '典型错误输出：',
    h3_legacy: '--legacy-peer-deps 与 --force 的区别',
    legacy_desc: '<code>--legacy-peer-deps</code> 告诉 npm 完全忽略 peer 依赖冲突（与 npm 6 行为相同）。<code>--force</code> 告诉 npm 无论如何都安装，接受所有潜在问题。使用场景如下：',
    legacy_option: '--legacy-peer-deps',
    legacy_when: '当你确定 peer 依赖不匹配是无害的（如 React 18 vs 17 的 peer dep）。',
    force_option: '--force',
    force_when: '当你想让 npm 即使有缓存副本也重新获取包，并覆盖冲突。',
    preferred_desc: '推荐方案 — 固定冲突的依赖版本：',
    h2_corruption: 'node_modules 损坏：何时以及如何彻底重装',
    corruption_intro: '有时 node_modules 就是会进入异常状态。症状包括对 package.json 中明确存在的包报 "Cannot find module" 错误，或切换分支后出现奇怪的构建失败。',
    h3_when_nuke: '何时需要彻底清理 node_modules',
    nuke_reason1: '切换了有不同依赖树的分支后。',
    nuke_reason2: '解决 package-lock.json 的合并冲突后。',
    nuke_reason3: '当你看到 "Module not found" 但包明显已安装。',
    nuke_reason4: '将 Node.js 升级到新的主版本后。',
    h3_how_nuke: '如何干净地重新安装',
    nuke_cross: '跨平台一行命令（bash 下有效）：',
    nuke_windows: 'Windows（PowerShell）：',
    nuke_npx: '使用 npx 快捷方式：',
    cache_clean: '如果问题仍然存在，也清理 npm 缓存：',
    h2_lockfile: 'package-lock.json 冲突：合并策略',
    lockfile_intro: '当多个开发者修改依赖时，package-lock.json 的合并冲突几乎不可避免。永远不要尝试手动解决它们 — 这个文件是机器生成的。',
    h3_strategy: '推荐合并策略',
    lockfile_step1: '接受冲突的任一方（选哪边无所谓）：',
    lockfile_step2: '重新生成锁文件：',
    lockfile_step3: '提交结果：',
    h3_gitattributes: '使用 .gitattributes 预防冲突',
    gitattributes_desc: '在 <code>.gitattributes</code> 中添加以下内容以自动解决锁文件冲突：',
    h2_node_version: 'Node.js 版本不兼容',
    node_version_intro: '许多包需要特定的 Node.js 版本。如果你的 Node 版本太旧（或太新），npm install 可能会因编译错误或不支持的引擎警告而失败。',
    h3_check_version: '检查所需版本',
    check_version_desc: '查看 package.json 中的 <code>engines</code> 字段：',
    h3_nvm_fnm: '使用 nvm 或 fnm 切换版本',
    nvm_desc: 'nvm（Node 版本管理器）：',
    fnm_desc: 'fnm（快速 Node 管理器）— 更快的替代方案：',
    nvmrc_desc: '在项目根目录创建 <code>.nvmrc</code> 文件，让整个团队使用相同版本：',
    h2_ci: 'CI/CD 问题：Docker 构建和 GitHub Actions',
    ci_intro: 'npm install 在 CI 环境中的行为有所不同。缓存、权限和网络设置都需要特别注意。',
    h3_docker: 'Docker 构建',
    docker_desc: 'Dockerfile 中的常见错误：',
    docker_tip: '要点：先复制 package 文件以利用层缓存，在 CI 中使用 <code>npm ci</code> 而非 <code>npm install</code>（更快且确定性），如果不需要 postinstall 脚本则使用 <code>--ignore-scripts</code>。',
    h3_github_actions: 'GitHub Actions 缓存',
    github_actions_desc: '正确的缓存可以将安装时间缩短 70% 以上：',
    h2_flowchart: '决策流程图：npm install 失败 — 按此排查',
    flowchart_intro: '使用此流程图诊断你的 npm install 失败：',
    flow_step1: '1. 是否是权限错误（EACCES / EPERM）？',
    flow_step1_yes: '是 -> 使用 nvm 或修复目录所有权。',
    flow_step2: '2. 是否是依赖冲突（ERESOLVE）？',
    flow_step2_yes: '是 -> 先尝试 --legacy-peer-deps，然后检查版本固定。',
    flow_step3: '3. 是否是网络错误（SOCKET_TIMEOUT / FETCH）？',
    flow_step3_yes: '是 -> 检查代理、VPN，或切换到 npmmirror.com 镜像源。',
    flow_step4: '4. 是否是构建/编译错误（node-gyp / code 1）？',
    flow_step4_yes: '是 -> 安装构建工具（python3、make、g++ / Visual Studio Build Tools）。',
    flow_step5: '5. 是否是 "Cannot find module" 或异常行为？',
    flow_step5_yes: '是 -> 删除 node_modules + package-lock.json，然后 npm install。',
    flow_step6: '6. 仍然失败？',
    flow_step6_yes: '是 -> 清理 npm 缓存（npm cache clean --force），检查 Node 版本，尝试全新克隆。',
    h2_faq: '常见问题',
    faq1_q: '如何修复 Mac 上的 "npm ERR! EACCES: permission denied"？',
    faq1_a: '最佳方案是通过 nvm（Node 版本管理器）安装 Node.js，它会安装到你的用户目录，完全避免权限问题。运行：curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash，然后 nvm install --lts。或者更改 npm 全局目录：mkdir ~/.npm-global && npm config set prefix ~/.npm-global 并添加到 PATH。',
    faq2_q: '"npm ERR! ERESOLVE could not resolve" 是什么意思？',
    faq2_a: 'ERESOLVE 表示依赖树中有两个或多个包需要同一个 peer 依赖的不同且不兼容的版本。从 npm 7 开始这是一个硬错误。你可以在 npm install 命令中添加 --legacy-peer-deps 来修复（告诉 npm 忽略 peer 依赖冲突，与 npm 6 行为相同），或在 package.json 的 overrides 字段中手动固定兼容版本。',
    faq3_q: '是否应该删除 package-lock.json 来修复 npm install 错误？',
    faq3_a: '删除 package-lock.json 应该是最后的手段，而不是第一步。锁文件确保确定性安装。先尝试只删除 node_modules 并运行 npm install。如果失败，再同时删除 node_modules 和 package-lock.json。始终提交重新生成的锁文件。',
    faq4_q: '为什么 npm install 在 Docker 中失败但在本地正常？',
    faq4_a: '常见原因：以 root 身份运行但未使用 --unsafe-perm、Docker 镜像中缺少原生构建工具（python3、make、g++）、COPY 顺序影响层缓存、或 .dockerignore 未排除 node_modules。在 Docker 中使用 npm ci 代替 npm install 以获得确定性构建。',
    faq5_q: '如何修复 npm install 期间的 "npm ERR! code 1"？',
    faq5_a: '错误码 1 通常表示 postinstall 脚本失败，往往是原生模块编译（node-gyp）失败。在 macOS 上安装 Xcode 命令行工具：xcode-select --install。在 Ubuntu/Debian 上：sudo apt install build-essential python3。在 Windows 上：npm install -g windows-build-tools 或安装 Visual Studio Build Tools。',
    faq6_q: 'npm install 和 npm ci 有什么区别？',
    faq6_a: 'npm install 读取 package.json 并可能更新 package-lock.json。npm ci（干净安装）会删除 node_modules，仅读取 package-lock.json，安装精确版本。在 CI/CD 管道和 Docker 构建中使用 npm ci 以获得更快、可复现的安装。在本地开发中需要更新依赖时使用 npm install。',
  },
  ja: {
    title: 'npm install エラー：よくあるエラーとその修正方法',
    intro: '<code>npm install</code> を実行して赤いエラーメッセージの壁に直面するのは、すべての JavaScript 開発者が通る道です。macOS でのパーミッションエラー、monorepo での依存関係の競合、CI でのキャッシュ破損など、原因がわかれば修正は通常簡単です。このガイドでは<strong>よくある npm install エラーすべて</strong>を網羅し、原因を説明し、修正コマンドを提供します。',
    h2_error_dict: 'エラー辞書：クイックリファレンス',
    th_code: 'エラーコード',
    th_meaning: '意味',
    th_quick_fix: 'クイックフィックス',
    eacces_meaning: 'パーミッション拒否 — npm が所有権のないディレクトリに書き込もうとした。',
    eacces_fix: 'nvm を使用するか、ディレクトリの所有権を修正（下記参照）。',
    enoent_meaning: 'ファイルまたはディレクトリが見つからない。',
    enoent_fix: 'node_modules と package-lock.json を削除して再インストール。',
    eperm_meaning: '操作が許可されていない — Windows でのファイルロック問題が多い。',
    eperm_fix: 'フォルダをロックしているエディタ/ターミナルを閉じて再試行。',
    eresolve_meaning: '依存関係の競合 — 2つのパッケージが互換性のない peer 依存関係を要求。',
    eresolve_fix: '--legacy-peer-deps または --force を使用（下記参照）。',
    err_socket_meaning: 'ネットワークタイムアウト — npm がレジストリに接続できない。',
    err_socket_fix: 'ネットワーク/プロキシ設定を確認、またはミラーレジストリに切り替え。',
    code1_meaning: 'ライフサイクルスクリプト（preinstall, postinstall）がエラーコード 1 で終了。',
    code1_fix: 'ビルドツール（Python、node-gyp、C++ コンパイラ）がインストールされているか確認。',
    h2_eacces: 'EACCES：パーミッションエラーの修正',
    eacces_intro: 'macOS と Linux で最もよくあるエラーです。npm がグローバルパッケージを <code>/usr/local/lib/node_modules</code> のようなシステムディレクトリにインストールしようとすると発生します。',
    h3_eacces_mac: 'macOS / Linux での修正（推奨：nvm を使用）',
    eacces_mac_desc: '最善の恒久的な修正は Node バージョンマネージャーを使用することです。npm がホームディレクトリにインストールされます：',
    eacces_mac_alt: '代替手段：npm のデフォルトディレクトリを手動で変更：',
    eacces_mac_chown: '最終手段（ほとんどのユーザーには非推奨）：',
    h3_eacces_win: 'Windows での修正',
    eacces_win_desc: 'Windows では管理者としてターミナルを実行するか、nvm-windows を使用：',
    h2_eresolve: 'ERESOLVE：依存関係の競合を修正',
    eresolve_intro: 'npm 7 以降、peer 依存関係の競合はデフォルトでインストールを失敗させます。競合するパッケージを示すツリー図が表示されます。',
    eresolve_example_desc: '典型的なエラー出力：',
    h3_legacy: '--legacy-peer-deps と --force の違い',
    legacy_desc: '<code>--legacy-peer-deps</code> は npm に peer 依存関係の競合を完全に無視するよう指示します（npm 6 と同じ動作）。<code>--force</code> は競合に関係なくインストールを強制します。使い分け：',
    legacy_option: '--legacy-peer-deps',
    legacy_when: 'peer dep の不一致が無害だとわかっている場合（例：React 18 vs 17）。',
    force_option: '--force',
    force_when: 'キャッシュコピーがあっても再取得し、競合を上書きしたい場合。',
    preferred_desc: '推奨アプローチ — 競合する依存関係をピン留め：',
    h2_corruption: 'node_modules の破損：いつ・どのように削除して再インストールするか',
    corruption_intro: 'node_modules は時々異常な状態になります。package.json にあるパッケージの "Cannot find module" エラーや、ブランチ切り替え後の奇妙なビルド失敗が症状です。',
    h3_when_nuke: 'node_modules を削除すべきタイミング',
    nuke_reason1: '異なる依存関係ツリーのブランチに切り替えた後。',
    nuke_reason2: 'package-lock.json のマージコンフリクトを解決した後。',
    nuke_reason3: '明らかにインストール済みのパッケージで "Module not found" が出る場合。',
    nuke_reason4: 'Node.js をメジャーバージョンにアップグレードした後。',
    h3_how_nuke: 'クリーンインストールの方法',
    nuke_cross: 'クロスプラットフォームワンライナー（bash）：',
    nuke_windows: 'Windows（PowerShell）：',
    nuke_npx: 'npx を使った便利な方法：',
    cache_clean: '問題が解決しない場合は npm キャッシュもクリア：',
    h2_lockfile: 'package-lock.json の競合：マージ戦略',
    lockfile_intro: '複数の開発者が依存関係を変更すると、package-lock.json のマージコンフリクトはほぼ確実に発生します。手動で解決しようとしないでください — このファイルは機械生成です。',
    h3_strategy: '推奨マージ戦略',
    lockfile_step1: '競合のどちらか一方を受け入れる（どちらでも良い）：',
    lockfile_step2: 'ロックファイルを再生成：',
    lockfile_step3: '結果をコミット：',
    h3_gitattributes: '.gitattributes でコンフリクトを防止',
    gitattributes_desc: '<code>.gitattributes</code> に以下を追加してロックファイルのコンフリクトを自動解決：',
    h2_node_version: 'Node.js バージョンの非互換性',
    node_version_intro: '多くのパッケージは特定の Node.js バージョンを必要とします。Node バージョンが古すぎる（または新しすぎる）と、コンパイルエラーやエンジン警告で npm install が失敗する可能性があります。',
    h3_check_version: '必要なバージョンの確認',
    check_version_desc: 'package.json の <code>engines</code> フィールドを確認：',
    h3_nvm_fnm: 'nvm または fnm でバージョンを切り替え',
    nvm_desc: 'nvm（Node Version Manager）：',
    fnm_desc: 'fnm（Fast Node Manager）— より高速な代替手段：',
    nvmrc_desc: 'プロジェクトルートに <code>.nvmrc</code> ファイルを作成してチーム全体で同じバージョンを使用：',
    h2_ci: 'CI/CD の問題：Docker ビルドと GitHub Actions',
    ci_intro: 'npm install は CI 環境では動作が異なります。キャッシュ、パーミッション、ネットワーク設定すべてに注意が必要です。',
    h3_docker: 'Docker ビルド',
    docker_desc: 'Dockerfile でよくある間違い：',
    docker_tip: 'ポイント：レイヤーキャッシュのためにまず package ファイルをコピー、CI では <code>npm install</code> の代わりに <code>npm ci</code> を使用（高速で決定的）、postinstall スクリプトが不要なら <code>--ignore-scripts</code> を使用。',
    h3_github_actions: 'GitHub Actions キャッシュ',
    github_actions_desc: '適切なキャッシュでインストール時間を 70% 以上短縮できます：',
    h2_flowchart: '決定フローチャート：npm install 失敗時のガイド',
    flowchart_intro: 'このフローチャートで npm install の失敗を診断してください：',
    flow_step1: '1. パーミッションエラー（EACCES / EPERM）ですか？',
    flow_step1_yes: 'はい -> nvm を使用するか、ディレクトリの所有権を修正。',
    flow_step2: '2. 依存関係の競合（ERESOLVE）ですか？',
    flow_step2_yes: 'はい -> まず --legacy-peer-deps を試し、次にバージョン固定を確認。',
    flow_step3: '3. ネットワークエラー（SOCKET_TIMEOUT / FETCH）ですか？',
    flow_step3_yes: 'はい -> プロキシ、VPN を確認、またはレジストリをミラーに切り替え。',
    flow_step4: '4. ビルド/コンパイルエラー（node-gyp / code 1）ですか？',
    flow_step4_yes: 'はい -> ビルドツール（python3, make, g++ / Visual Studio Build Tools）をインストール。',
    flow_step5: '5. "Cannot find module" または異常な動作ですか？',
    flow_step5_yes: 'はい -> node_modules + package-lock.json を削除して npm install。',
    flow_step6: '6. まだ失敗しますか？',
    flow_step6_yes: 'はい -> npm キャッシュをクリア（npm cache clean --force）、Node バージョンを確認、新規クローンを試行。',
    h2_faq: 'よくある質問',
    faq1_q: 'Mac で "npm ERR! EACCES: permission denied" を修正するには？',
    faq1_a: '最善の修正は nvm（Node Version Manager）経由で Node.js をインストールすることです。ホームディレクトリにインストールされ、パーミッションの問題を完全に回避できます。実行：curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash、その後 nvm install --lts。または npm グローバルディレクトリを変更：mkdir ~/.npm-global && npm config set prefix ~/.npm-global を PATH に追加。',
    faq2_q: '"npm ERR! ERESOLVE could not resolve" とは？',
    faq2_a: 'ERESOLVE は依存関係ツリー内の2つ以上のパッケージが同じ peer 依存関係の異なる非互換バージョンを要求していることを意味します。npm 7 以降ではこれはハードエラーです。npm install コマンドに --legacy-peer-deps を追加するか、package.json の overrides フィールドで互換バージョンを手動で固定して修正できます。',
    faq3_q: 'npm install エラーを修正するために package-lock.json を削除すべき？',
    faq3_a: 'package-lock.json の削除は最終手段であるべきで、最初のステップではありません。ロックファイルは決定的なインストールを保証します。まず node_modules のみ削除して npm install を実行。失敗した場合、node_modules と package-lock.json の両方を削除。再生成されたロックファイルは必ずコミットしてください。',
    faq4_q: 'なぜ Docker で npm install が失敗するのにローカルでは動く？',
    faq4_a: '一般的な原因：root で実行しているが --unsafe-perm なし、Docker イメージにネイティブビルドツール（python3, make, g++）がない、COPY 順序によるレイヤーキャッシュの問題、.dockerignore が node_modules を除外していない。Docker では決定的なビルドのために npm ci を使用してください。',
    faq5_q: 'npm install 中の "npm ERR! code 1" を修正するには？',
    faq5_a: 'エラーコード 1 は通常 postinstall スクリプトの失敗、多くはネイティブモジュールコンパイル（node-gyp）を意味します。macOS：xcode-select --install。Ubuntu/Debian：sudo apt install build-essential python3。Windows：npm install -g windows-build-tools または Visual Studio Build Tools をインストール。',
    faq6_q: 'npm install と npm ci の違いは？',
    faq6_a: 'npm install は package.json を読み、package-lock.json を更新する可能性があります。npm ci（クリーンインストール）は node_modules を削除し、package-lock.json のみ読み、正確なバージョンをインストールします。CI/CD パイプラインと Docker ビルドでは npm ci を、ローカル開発では npm install を使用してください。',
  },
  ko: {
    title: 'npm install 오류: 모든 일반적인 오류와 해결 방법',
    intro: '<code>npm install</code>을 실행하고 빨간 에러 메시지에 막히는 것은 모든 JavaScript 개발자의 통과 의례입니다. macOS의 권한 오류, monorepo의 의존성 충돌, CI의 손상된 캐시 등 원인을 알면 해결은 보통 간단합니다. 이 가이드는 <strong>모든 일반적인 npm install 오류</strong>를 다루고, 원인을 설명하고, 정확한 수정 명령을 제공합니다.',
    h2_error_dict: '오류 사전: 빠른 참조 테이블',
    th_code: '오류 코드',
    th_meaning: '의미',
    th_quick_fix: '빠른 수정',
    eacces_meaning: '권한 거부 — npm이 소유하지 않은 디렉터리에 쓰려고 시도.',
    eacces_fix: 'nvm 사용 또는 디렉터리 소유권 수정 (아래 참조).',
    enoent_meaning: '파일 또는 디렉터리를 찾을 수 없음.',
    enoent_fix: 'node_modules와 package-lock.json 삭제 후 재설치.',
    eperm_meaning: '작업이 허용되지 않음 — Windows의 파일 잠금 문제가 많음.',
    eperm_fix: '폴더를 잠그고 있는 편집기/터미널을 닫고 재시도.',
    eresolve_meaning: '의존성 충돌 — 두 패키지가 호환되지 않는 peer 의존성 버전을 요구.',
    eresolve_fix: '--legacy-peer-deps 또는 --force 사용 (아래 참조).',
    err_socket_meaning: '네트워크 타임아웃 — npm이 레지스트리에 연결할 수 없음.',
    err_socket_fix: '네트워크/프록시 설정 확인 또는 미러 레지스트리로 전환.',
    code1_meaning: '라이프사이클 스크립트(preinstall, postinstall)가 오류 코드 1로 종료.',
    code1_fix: '빌드 도구(Python, node-gyp, C++ 컴파일러) 설치 확인.',
    h2_eacces: 'EACCES: 권한 오류 수정',
    eacces_intro: 'macOS와 Linux에서 가장 흔한 오류입니다. npm이 <code>/usr/local/lib/node_modules</code> 같은 시스템 디렉터리에 글로벌 패키지를 설치하려 할 때 발생합니다.',
    h3_eacces_mac: 'macOS / Linux에서 수정 (권장: nvm 사용)',
    eacces_mac_desc: '가장 좋은 영구적 해결책은 Node 버전 관리자를 사용하여 npm이 홈 디렉터리에 설치하도록 하는 것입니다:',
    eacces_mac_alt: '대안: npm 기본 디렉터리를 수동으로 변경:',
    eacces_mac_chown: '최후의 수단 (대부분의 사용자에게 비권장):',
    h3_eacces_win: 'Windows에서 수정',
    eacces_win_desc: 'Windows에서 관리자 권한으로 터미널을 실행하거나 nvm-windows를 사용:',
    h2_eresolve: 'ERESOLVE: 의존성 충돌 수정',
    eresolve_intro: 'npm 7부터 peer 의존성 충돌은 기본적으로 설치를 실패시킵니다. 충돌하는 패키지를 보여주는 트리 다이어그램이 표시됩니다.',
    eresolve_example_desc: '일반적인 오류 출력:',
    h3_legacy: '--legacy-peer-deps vs --force',
    legacy_desc: '<code>--legacy-peer-deps</code>는 npm에게 peer 의존성 충돌을 완전히 무시하라고 지시합니다 (npm 6과 동일한 동작). <code>--force</code>는 충돌에 관계없이 설치를 강제합니다. 사용 시기:',
    legacy_option: '--legacy-peer-deps',
    legacy_when: 'peer dep 불일치가 무해하다고 알 때 (예: React 18 vs 17).',
    force_option: '--force',
    force_when: '캐시된 복사본이 있어도 패키지를 다시 가져오고 충돌을 재정의하고 싶을 때.',
    preferred_desc: '권장 접근법 — 충돌하는 의존성 고정:',
    h2_corruption: 'node_modules 손상: 언제 그리고 어떻게 삭제하고 재설치하는가',
    corruption_intro: 'node_modules는 때때로 비정상 상태가 됩니다. package.json에 있는 패키지의 "Cannot find module" 오류나 브랜치 전환 후 이상한 빌드 실패가 증상입니다.',
    h3_when_nuke: 'node_modules를 삭제해야 할 때',
    nuke_reason1: '다른 의존성 트리를 가진 브랜치로 전환한 후.',
    nuke_reason2: 'package-lock.json의 병합 충돌을 해결한 후.',
    nuke_reason3: '명확히 설치된 패키지에서 "Module not found"가 나타날 때.',
    nuke_reason4: 'Node.js를 새 메이저 버전으로 업그레이드한 후.',
    h3_how_nuke: '클린 재설치 방법',
    nuke_cross: '크로스 플랫폼 원라이너 (bash):',
    nuke_windows: 'Windows (PowerShell):',
    nuke_npx: 'npx 사용:',
    cache_clean: '문제가 지속되면 npm 캐시도 정리:',
    h2_lockfile: 'package-lock.json 충돌: 병합 전략',
    lockfile_intro: '여러 개발자가 의존성을 변경하면 package-lock.json 병합 충돌은 거의 확실히 발생합니다. 수동으로 해결하려 하지 마세요 — 이 파일은 기계 생성입니다.',
    h3_strategy: '권장 병합 전략',
    lockfile_step1: '충돌의 어느 쪽이든 수락 (어느 쪽이든 상관없음):',
    lockfile_step2: '잠금 파일 재생성:',
    lockfile_step3: '결과 커밋:',
    h3_gitattributes: '.gitattributes로 충돌 방지',
    gitattributes_desc: '<code>.gitattributes</code>에 다음을 추가하여 잠금 파일 충돌 자동 해결:',
    h2_node_version: 'Node.js 버전 비호환성',
    node_version_intro: '많은 패키지는 특정 Node.js 버전을 필요로 합니다. Node 버전이 너무 오래되거나 새로우면 컴파일 오류나 지원되지 않는 엔진 경고로 npm install이 실패할 수 있습니다.',
    h3_check_version: '필요한 버전 확인',
    check_version_desc: 'package.json의 <code>engines</code> 필드를 확인:',
    h3_nvm_fnm: 'nvm 또는 fnm으로 버전 전환',
    nvm_desc: 'nvm (Node Version Manager):',
    fnm_desc: 'fnm (Fast Node Manager) — 더 빠른 대안:',
    nvmrc_desc: '프로젝트 루트에 <code>.nvmrc</code> 파일을 생성하여 팀 전체가 같은 버전을 사용:',
    h2_ci: 'CI/CD 문제: Docker 빌드와 GitHub Actions',
    ci_intro: 'npm install은 CI 환경에서 다르게 동작합니다. 캐싱, 권한, 네트워크 설정 모두 특별한 주의가 필요합니다.',
    h3_docker: 'Docker 빌드',
    docker_desc: 'Dockerfile의 일반적인 실수:',
    docker_tip: '핵심: 레이어 캐싱을 위해 package 파일을 먼저 복사, CI에서는 <code>npm install</code> 대신 <code>npm ci</code> 사용 (더 빠르고 결정적), postinstall 스크립트가 불필요하면 <code>--ignore-scripts</code> 사용.',
    h3_github_actions: 'GitHub Actions 캐싱',
    github_actions_desc: '적절한 캐싱으로 설치 시간을 70% 이상 단축할 수 있습니다:',
    h2_flowchart: '결정 플로우차트: npm install 실패 — 이 순서를 따르세요',
    flowchart_intro: '이 플로우차트로 npm install 실패를 진단하세요:',
    flow_step1: '1. 권한 오류 (EACCES / EPERM)인가?',
    flow_step1_yes: '예 -> nvm 사용 또는 디렉터리 소유권 수정.',
    flow_step2: '2. 의존성 충돌 (ERESOLVE)인가?',
    flow_step2_yes: '예 -> 먼저 --legacy-peer-deps 시도, 그다음 버전 고정 확인.',
    flow_step3: '3. 네트워크 오류 (SOCKET_TIMEOUT / FETCH)인가?',
    flow_step3_yes: '예 -> 프록시, VPN 확인 또는 레지스트리를 미러로 전환.',
    flow_step4: '4. 빌드/컴파일 오류 (node-gyp / code 1)인가?',
    flow_step4_yes: '예 -> 빌드 도구 (python3, make, g++ / Visual Studio Build Tools) 설치.',
    flow_step5: '5. "Cannot find module" 또는 이상한 동작인가?',
    flow_step5_yes: '예 -> node_modules + package-lock.json 삭제 후 npm install.',
    flow_step6: '6. 여전히 실패하는가?',
    flow_step6_yes: '예 -> npm 캐시 정리 (npm cache clean --force), Node 버전 확인, 새 클론 시도.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'Mac에서 "npm ERR! EACCES: permission denied"를 어떻게 수정하나요?',
    faq1_a: '가장 좋은 방법은 nvm(Node Version Manager)을 통해 Node.js를 설치하는 것입니다. 홈 디렉터리에 설치되어 권한 문제를 완전히 피할 수 있습니다. 실행: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash, 그 후 nvm install --lts.',
    faq2_q: '"npm ERR! ERESOLVE could not resolve"는 무슨 뜻인가요?',
    faq2_a: 'ERESOLVE는 의존성 트리에서 두 개 이상의 패키지가 같은 peer 의존성의 다른 호환되지 않는 버전을 요구한다는 의미입니다. npm 7부터 이것은 하드 오류입니다. --legacy-peer-deps를 추가하거나 package.json의 overrides 필드에서 호환 버전을 고정하여 수정할 수 있습니다.',
    faq3_q: 'npm install 오류를 수정하기 위해 package-lock.json을 삭제해야 하나요?',
    faq3_a: 'package-lock.json 삭제는 최후의 수단이어야 하며, 첫 번째 단계가 아닙니다. 잠금 파일은 결정적 설치를 보장합니다. 먼저 node_modules만 삭제하고 npm install을 실행하세요. 실패하면 둘 다 삭제하세요.',
    faq4_q: '왜 Docker에서 npm install이 실패하는데 로컬에서는 작동하나요?',
    faq4_a: '일반적 원인: root로 실행하지만 --unsafe-perm 없음, Docker 이미지에 네이티브 빌드 도구 없음, COPY 순서로 인한 레이어 캐싱 문제, .dockerignore가 node_modules를 제외하지 않음. Docker에서는 npm ci를 사용하세요.',
    faq5_q: 'npm install 중 "npm ERR! code 1"을 어떻게 수정하나요?',
    faq5_a: '오류 코드 1은 보통 postinstall 스크립트 실패, 주로 네이티브 모듈 컴파일(node-gyp)을 의미합니다. macOS: xcode-select --install. Ubuntu/Debian: sudo apt install build-essential python3. Windows: Visual Studio Build Tools 설치.',
    faq6_q: 'npm install과 npm ci의 차이는 무엇인가요?',
    faq6_a: 'npm install은 package.json을 읽고 package-lock.json을 업데이트할 수 있습니다. npm ci(클린 설치)는 node_modules를 삭제하고 package-lock.json만 읽어 정확한 버전을 설치합니다. CI/CD에서는 npm ci를, 로컬 개발에서는 npm install을 사용하세요.',
  },
  fr: {
    title: 'Erreurs npm install : chaque erreur courante et comment la corriger',
    intro: 'Lancer <code>npm install</code> et se heurter a un mur de texte rouge est un rite de passage pour tout developpeur JavaScript. Que ce soit une erreur de permissions sur macOS, un conflit de dependances dans un monorepo ou un cache corrompu en CI, la solution est generalement simple une fois que vous savez quoi chercher. Ce guide couvre <strong>chaque erreur courante de npm install</strong>, explique pourquoi elle survient et vous donne les commandes exactes pour la corriger.',
    h2_error_dict: 'Dictionnaire des erreurs : tableau de reference rapide',
    th_code: 'Code erreur',
    th_meaning: 'Signification',
    th_quick_fix: 'Correction rapide',
    eacces_meaning: 'Permission refusee — npm a tente d\'ecrire dans un repertoire que vous ne possedez pas.',
    eacces_fix: 'Utiliser nvm ou corriger la propriete du repertoire (voir ci-dessous).',
    enoent_meaning: 'Fichier ou repertoire introuvable — un chemin reference n\'existe pas.',
    enoent_fix: 'Supprimer node_modules et package-lock.json, puis reinstaller.',
    eperm_meaning: 'Operation non permise — souvent un probleme de verrouillage de fichier sous Windows.',
    eperm_fix: 'Fermer les editeurs/terminaux verrouillant le dossier, puis reessayer.',
    eresolve_meaning: 'Conflit de dependances — deux packages necessitent des versions incompatibles d\'une peer dependency.',
    eresolve_fix: 'Utiliser --legacy-peer-deps ou --force (voir section ci-dessous).',
    err_socket_meaning: 'Timeout reseau — npm n\'a pas pu atteindre le registre.',
    err_socket_fix: 'Verifier les parametres reseau/proxy ou changer de registre miroir.',
    code1_meaning: 'Un script de cycle de vie (preinstall, postinstall) a termine avec le code d\'erreur 1.',
    code1_fix: 'Verifier que les outils de build (Python, node-gyp, compilateur C++) sont installes.',
    h2_eacces: 'EACCES : corriger les erreurs de permissions',
    eacces_intro: 'C\'est l\'erreur la plus courante sur macOS et Linux. Elle se produit quand npm tente d\'installer des packages globaux dans un repertoire systeme comme <code>/usr/local/lib/node_modules</code>.',
    h3_eacces_mac: 'Correction sur macOS / Linux (recommande : utiliser nvm)',
    eacces_mac_desc: 'La meilleure correction permanente est d\'utiliser un gestionnaire de versions Node pour que npm installe dans votre repertoire personnel :',
    eacces_mac_alt: 'Alternative : changer manuellement le repertoire par defaut de npm :',
    eacces_mac_chown: 'Option nucleaire (deconseille pour la plupart des utilisateurs) :',
    h3_eacces_win: 'Correction sur Windows',
    eacces_win_desc: 'Sous Windows, lancez votre terminal en tant qu\'administrateur, ou mieux, utilisez nvm-windows :',
    h2_eresolve: 'ERESOLVE : corriger les conflits de dependances',
    eresolve_intro: 'Depuis npm 7, les conflits de peer dependencies font echouer l\'installation par defaut. Vous verrez un diagramme en arbre montrant les packages en conflit.',
    eresolve_example_desc: 'Sortie d\'erreur typique :',
    h3_legacy: '--legacy-peer-deps vs --force',
    legacy_desc: '<code>--legacy-peer-deps</code> dit a npm d\'ignorer completement les conflits de peer dependencies (meme comportement que npm 6). <code>--force</code> dit a npm d\'installer quand meme. Quand utiliser chacun :',
    legacy_option: '--legacy-peer-deps',
    legacy_when: 'Quand le decalage de peer dep est inoffensif (ex: React 18 vs 17).',
    force_option: '--force',
    force_when: 'Quand vous voulez que npm recupere les packages meme si une copie en cache existe.',
    preferred_desc: 'Approche preferee — epingler la dependance en conflit :',
    h2_corruption: 'Corruption de node_modules : quand et comment supprimer et reinstaller',
    corruption_intro: 'Parfois node_modules se retrouve dans un etat corrompu. Les symptomes incluent des erreurs "Cannot find module" pour des packages presents dans package.json, ou des echecs de build etranges apres un changement de branche.',
    h3_when_nuke: 'Quand supprimer node_modules',
    nuke_reason1: 'Apres avoir change de branche avec des arbres de dependances differents.',
    nuke_reason2: 'Apres avoir resolu des conflits de fusion dans package-lock.json.',
    nuke_reason3: 'Quand "Module not found" apparait pour un package clairement installe.',
    nuke_reason4: 'Apres une mise a jour de Node.js vers une nouvelle version majeure.',
    h3_how_nuke: 'Comment faire une reinstallation propre',
    nuke_cross: 'Commande multiplateforme (bash) :',
    nuke_windows: 'Sous Windows (PowerShell) :',
    nuke_npx: 'Avec npx :',
    cache_clean: 'Si les problemes persistent, nettoyez aussi le cache npm :',
    h2_lockfile: 'Conflits package-lock.json : strategies de fusion',
    lockfile_intro: 'Quand plusieurs developpeurs modifient les dependances, les conflits de fusion de package-lock.json sont quasi garantis. N\'essayez jamais de les resoudre manuellement — le fichier est genere automatiquement.',
    h3_strategy: 'Strategie de fusion recommandee',
    lockfile_step1: 'Accepter l\'un ou l\'autre cote du conflit (peu importe lequel) :',
    lockfile_step2: 'Regenerer le fichier de verrouillage :',
    lockfile_step3: 'Commiter le resultat :',
    h3_gitattributes: 'Prevenir les conflits avec .gitattributes',
    gitattributes_desc: 'Ajoutez ceci a votre <code>.gitattributes</code> pour resoudre automatiquement les conflits du fichier de verrouillage :',
    h2_node_version: 'Incompatibilite de version Node.js',
    node_version_intro: 'Beaucoup de packages necessitent des versions specifiques de Node.js. Si votre version est trop ancienne (ou trop recente), npm install peut echouer avec des erreurs de compilation.',
    h3_check_version: 'Verifier la version requise',
    check_version_desc: 'Cherchez le champ <code>engines</code> dans package.json :',
    h3_nvm_fnm: 'Utiliser nvm ou fnm pour changer de version',
    nvm_desc: 'nvm (Node Version Manager) :',
    fnm_desc: 'fnm (Fast Node Manager) — alternative plus rapide :',
    nvmrc_desc: 'Creez un fichier <code>.nvmrc</code> a la racine du projet pour que toute l\'equipe utilise la meme version :',
    h2_ci: 'Problemes CI/CD : builds Docker et GitHub Actions',
    ci_intro: 'npm install se comporte differemment dans les environnements CI. Le cache, les permissions et les parametres reseau necessitent une attention particuliere.',
    h3_docker: 'Builds Docker',
    docker_desc: 'Erreurs courantes dans les Dockerfiles :',
    docker_tip: 'Points cles : copier d\'abord les fichiers package pour le cache de couches, utiliser <code>npm ci</code> au lieu de <code>npm install</code> en CI (plus rapide et deterministe), utiliser <code>--ignore-scripts</code> si les scripts postinstall ne sont pas necessaires.',
    h3_github_actions: 'Cache GitHub Actions',
    github_actions_desc: 'Un cache correct peut reduire le temps d\'installation de plus de 70% :',
    h2_flowchart: 'Organigramme de decision : npm install a echoue — suivez ce guide',
    flowchart_intro: 'Utilisez cet organigramme pour diagnostiquer votre echec npm install :',
    flow_step1: '1. Est-ce une erreur de permissions (EACCES / EPERM) ?',
    flow_step1_yes: 'OUI -> Utiliser nvm ou corriger la propriete du repertoire.',
    flow_step2: '2. Est-ce un conflit de dependances (ERESOLVE) ?',
    flow_step2_yes: 'OUI -> Essayer d\'abord --legacy-peer-deps, puis verifier l\'epinglage de version.',
    flow_step3: '3. Est-ce une erreur reseau (SOCKET_TIMEOUT / FETCH) ?',
    flow_step3_yes: 'OUI -> Verifier proxy, VPN, ou changer de registre miroir.',
    flow_step4: '4. Est-ce une erreur de build/compilation (node-gyp / code 1) ?',
    flow_step4_yes: 'OUI -> Installer les outils de build (python3, make, g++ / Visual Studio Build Tools).',
    flow_step5: '5. Est-ce "Cannot find module" ou un comportement etrange ?',
    flow_step5_yes: 'OUI -> Supprimer node_modules + package-lock.json, puis npm install.',
    flow_step6: '6. Toujours en echec ?',
    flow_step6_yes: 'OUI -> Nettoyer le cache npm (npm cache clean --force), verifier la version Node, essayer un clone frais.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Comment corriger "npm ERR! EACCES: permission denied" sur Mac ?',
    faq1_a: 'La meilleure solution est d\'installer Node.js via nvm (Node Version Manager) qui installe dans votre repertoire personnel et evite les problemes de permissions. Executez : curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash, puis nvm install --lts.',
    faq2_q: 'Que signifie "npm ERR! ERESOLVE could not resolve" ?',
    faq2_a: 'ERESOLVE signifie que deux ou plusieurs packages dans votre arbre de dependances necessitent des versions differentes et incompatibles de la meme peer dependency. Depuis npm 7, c\'est une erreur bloquante. Ajoutez --legacy-peer-deps ou utilisez le champ overrides dans package.json.',
    faq3_q: 'Faut-il supprimer package-lock.json pour corriger les erreurs npm install ?',
    faq3_a: 'La suppression de package-lock.json devrait etre un dernier recours. Le fichier de verrouillage garantit des installations deterministes. Essayez d\'abord de supprimer uniquement node_modules. Commitez toujours le fichier de verrouillage regenere.',
    faq4_q: 'Pourquoi npm install echoue dans Docker mais fonctionne localement ?',
    faq4_a: 'Causes courantes : execution en root sans --unsafe-perm, outils de build natifs manquants, ordre COPY empechant le cache de couches, .dockerignore n\'excluant pas node_modules. Utilisez npm ci dans Docker.',
    faq5_q: 'Comment corriger "npm ERR! code 1" pendant npm install ?',
    faq5_a: 'Le code d\'erreur 1 signifie generalement l\'echec d\'un script postinstall, souvent une compilation de module natif (node-gyp). macOS : xcode-select --install. Ubuntu/Debian : sudo apt install build-essential python3. Windows : Visual Studio Build Tools.',
    faq6_q: 'Quelle est la difference entre npm install et npm ci ?',
    faq6_a: 'npm install lit package.json et peut mettre a jour package-lock.json. npm ci (clean install) supprime node_modules, lit uniquement package-lock.json et installe les versions exactes. Utilisez npm ci en CI/CD et npm install en developpement local.',
  },
  de: {
    title: 'npm install Fehler: Jeder haeufige Fehler und wie man ihn behebt',
    intro: '<code>npm install</code> ausfuehren und auf eine Wand roter Fehlermeldungen zu stossen, gehoert fuer jeden JavaScript-Entwickler dazu. Ob es ein Berechtigungsfehler auf macOS ist, ein Abhaengigkeitskonflikt in einem Monorepo oder ein beschaedigter Cache in CI — die Loesung ist meist einfach, wenn man weiss, wonach man suchen muss. Dieser Leitfaden deckt <strong>jeden haeufigen npm install Fehler</strong> ab, erklaert warum er auftritt und gibt die genauen Befehle zur Behebung.',
    h2_error_dict: 'Fehler-Woerterbuch: Kurzreferenz-Tabelle',
    th_code: 'Fehlercode',
    th_meaning: 'Bedeutung',
    th_quick_fix: 'Schnellbehebung',
    eacces_meaning: 'Berechtigung verweigert — npm hat versucht, in ein Verzeichnis zu schreiben, das Ihnen nicht gehoert.',
    eacces_fix: 'nvm verwenden oder Verzeichniseigentum korrigieren (siehe unten).',
    enoent_meaning: 'Datei oder Verzeichnis nicht gefunden — ein referenzierter Pfad existiert nicht.',
    enoent_fix: 'node_modules und package-lock.json loeschen, dann neu installieren.',
    eperm_meaning: 'Operation nicht erlaubt — oft ein Dateisperrproblem unter Windows.',
    eperm_fix: 'Editoren/Terminals schliessen, die den Ordner sperren, dann erneut versuchen.',
    eresolve_meaning: 'Abhaengigkeitskonflikt — zwei Pakete benoetigen inkompatible Versionen einer Peer-Abhaengigkeit.',
    eresolve_fix: '--legacy-peer-deps oder --force verwenden (siehe Abschnitt unten).',
    err_socket_meaning: 'Netzwerk-Timeout — npm konnte die Registry nicht erreichen.',
    err_socket_fix: 'Netzwerk-/Proxy-Einstellungen pruefen oder zu einer Mirror-Registry wechseln.',
    code1_meaning: 'Ein Lifecycle-Script (preinstall, postinstall) hat mit Fehlercode 1 beendet.',
    code1_fix: 'Pruefen, ob Build-Tools (Python, node-gyp, C++ Compiler) installiert sind.',
    h2_eacces: 'EACCES: Berechtigungsfehler beheben',
    eacces_intro: 'Dies ist der haeufigste Fehler auf macOS und Linux. Er tritt auf, wenn npm versucht, globale Pakete in ein Systemverzeichnis wie <code>/usr/local/lib/node_modules</code> zu installieren.',
    h3_eacces_mac: 'Behebung auf macOS / Linux (Empfohlen: nvm verwenden)',
    eacces_mac_desc: 'Die beste permanente Loesung ist ein Node-Versionsmanager, damit npm in Ihr Home-Verzeichnis installiert:',
    eacces_mac_alt: 'Alternative: npm-Standardverzeichnis manuell aendern:',
    eacces_mac_chown: 'Letzte Option (fuer die meisten Benutzer nicht empfohlen):',
    h3_eacces_win: 'Behebung unter Windows',
    eacces_win_desc: 'Unter Windows Terminal als Administrator ausfuehren oder besser nvm-windows verwenden:',
    h2_eresolve: 'ERESOLVE: Abhaengigkeitskonflikte beheben',
    eresolve_intro: 'Ab npm 7 fuehren Peer-Abhaengigkeitskonflikte standardmaessig zum Installationsfehler. Sie sehen ein Baumdiagramm, das zeigt, welche Pakete in Konflikt stehen.',
    eresolve_example_desc: 'Typische Fehlerausgabe:',
    h3_legacy: '--legacy-peer-deps vs --force',
    legacy_desc: '<code>--legacy-peer-deps</code> weist npm an, Peer-Abhaengigkeitskonflikte vollstaendig zu ignorieren (gleiches Verhalten wie npm 6). <code>--force</code> erzwingt die Installation. Wann welches verwenden:',
    legacy_option: '--legacy-peer-deps',
    legacy_when: 'Wenn der Peer-Dep-Unterschied harmlos ist (z.B. React 18 vs 17).',
    force_option: '--force',
    force_when: 'Wenn npm Pakete auch bei vorhandener Cache-Kopie neu holen und Konflikte ueberschreiben soll.',
    preferred_desc: 'Bevorzugter Ansatz — die konfligierende Abhaengigkeit pinnen:',
    h2_corruption: 'node_modules-Korruption: Wann und wie man loescht und neu installiert',
    corruption_intro: 'Manchmal geraet node_modules in einen schlechten Zustand. Symptome sind "Cannot find module"-Fehler fuer Pakete in package.json oder seltsame Build-Fehler nach Branchwechsel.',
    h3_when_nuke: 'Wann node_modules loeschen',
    nuke_reason1: 'Nach dem Wechsel zu Branches mit unterschiedlichen Abhaengigkeitsbaeumen.',
    nuke_reason2: 'Nach dem Loesen von Merge-Konflikten in package-lock.json.',
    nuke_reason3: 'Bei "Module not found" fuer ein eindeutig installiertes Paket.',
    nuke_reason4: 'Nach dem Upgrade von Node.js auf eine neue Hauptversion.',
    h3_how_nuke: 'Saubere Neuinstallation',
    nuke_cross: 'Plattformuebergreifender Einzeiler (bash):',
    nuke_windows: 'Windows (PowerShell):',
    nuke_npx: 'Mit npx:',
    cache_clean: 'Bei anhaltenden Problemen auch den npm-Cache leeren:',
    h2_lockfile: 'package-lock.json Konflikte: Merge-Strategien',
    lockfile_intro: 'Wenn mehrere Entwickler Abhaengigkeiten aendern, sind package-lock.json Merge-Konflikte fast garantiert. Versuchen Sie nie, sie manuell zu loesen — die Datei ist maschinengeneriert.',
    h3_strategy: 'Empfohlene Merge-Strategie',
    lockfile_step1: 'Eine Seite des Konflikts akzeptieren (egal welche):',
    lockfile_step2: 'Lock-Datei regenerieren:',
    lockfile_step3: 'Ergebnis committen:',
    h3_gitattributes: 'Konflikte mit .gitattributes vermeiden',
    gitattributes_desc: 'Fuegen Sie dies zu Ihrer <code>.gitattributes</code> hinzu, um Lock-Datei-Konflikte automatisch zu loesen:',
    h2_node_version: 'Node.js-Versionsinkompatibilitaet',
    node_version_intro: 'Viele Pakete benoetigen bestimmte Node.js-Versionen. Wenn Ihre Node-Version zu alt (oder zu neu) ist, kann npm install mit Kompilierungsfehlern scheitern.',
    h3_check_version: 'Benoetigte Version pruefen',
    check_version_desc: 'Suchen Sie das <code>engines</code>-Feld in package.json:',
    h3_nvm_fnm: 'Mit nvm oder fnm Versionen wechseln',
    nvm_desc: 'nvm (Node Version Manager):',
    fnm_desc: 'fnm (Fast Node Manager) — schnellere Alternative:',
    nvmrc_desc: 'Erstellen Sie eine <code>.nvmrc</code>-Datei im Projektstamm, damit das gesamte Team dieselbe Version verwendet:',
    h2_ci: 'CI/CD-Probleme: Docker-Builds und GitHub Actions',
    ci_intro: 'npm install verhaelt sich in CI-Umgebungen anders. Caching, Berechtigungen und Netzwerkeinstellungen benoetigen besondere Aufmerksamkeit.',
    h3_docker: 'Docker-Builds',
    docker_desc: 'Haeufige Fehler in Dockerfiles:',
    docker_tip: 'Wichtig: Zuerst Package-Dateien fuer Layer-Caching kopieren, in CI <code>npm ci</code> statt <code>npm install</code> verwenden (schneller und deterministisch), <code>--ignore-scripts</code> verwenden wenn postinstall-Scripts nicht benoetigt werden.',
    h3_github_actions: 'GitHub Actions Caching',
    github_actions_desc: 'Richtiges Caching kann die Installationszeit um 70%+ reduzieren:',
    h2_flowchart: 'Entscheidungs-Flussdiagramm: npm install fehlgeschlagen — folgen Sie diesem Leitfaden',
    flowchart_intro: 'Verwenden Sie dieses Flussdiagramm zur Diagnose Ihres npm install Fehlers:',
    flow_step1: '1. Ist es ein Berechtigungsfehler (EACCES / EPERM)?',
    flow_step1_yes: 'JA -> nvm verwenden oder Verzeichniseigentum korrigieren.',
    flow_step2: '2. Ist es ein Abhaengigkeitskonflikt (ERESOLVE)?',
    flow_step2_yes: 'JA -> Zuerst --legacy-peer-deps versuchen, dann Versions-Pinning pruefen.',
    flow_step3: '3. Ist es ein Netzwerkfehler (SOCKET_TIMEOUT / FETCH)?',
    flow_step3_yes: 'JA -> Proxy, VPN pruefen oder Registry wechseln.',
    flow_step4: '4. Ist es ein Build-/Kompilierungsfehler (node-gyp / code 1)?',
    flow_step4_yes: 'JA -> Build-Tools installieren (python3, make, g++ / Visual Studio Build Tools).',
    flow_step5: '5. Ist es "Cannot find module" oder seltsames Verhalten?',
    flow_step5_yes: 'JA -> node_modules + package-lock.json loeschen, dann npm install.',
    flow_step6: '6. Immer noch fehlgeschlagen?',
    flow_step6_yes: 'JA -> npm-Cache leeren (npm cache clean --force), Node-Version pruefen, frischen Clone versuchen.',
    h2_faq: 'Haeufig gestellte Fragen',
    faq1_q: 'Wie behebt man "npm ERR! EACCES: permission denied" auf dem Mac?',
    faq1_a: 'Die beste Loesung ist Node.js ueber nvm (Node Version Manager) zu installieren, was ins Home-Verzeichnis installiert und Berechtigungsprobleme vermeidet. Ausfuehren: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash, dann nvm install --lts.',
    faq2_q: 'Was bedeutet "npm ERR! ERESOLVE could not resolve"?',
    faq2_a: 'ERESOLVE bedeutet, dass zwei oder mehr Pakete verschiedene, inkompatible Versionen derselben Peer-Abhaengigkeit benoetigen. Ab npm 7 ist dies ein harter Fehler. Fuegen Sie --legacy-peer-deps hinzu oder verwenden Sie das overrides-Feld in package.json.',
    faq3_q: 'Sollte man package-lock.json loeschen, um npm install Fehler zu beheben?',
    faq3_a: 'Das Loeschen von package-lock.json sollte der letzte Ausweg sein. Die Lock-Datei garantiert deterministische Installationen. Versuchen Sie zuerst nur node_modules zu loeschen. Committen Sie immer die regenerierte Lock-Datei.',
    faq4_q: 'Warum scheitert npm install in Docker, funktioniert aber lokal?',
    faq4_a: 'Haeufige Ursachen: Ausfuehrung als root ohne --unsafe-perm, fehlende native Build-Tools im Docker-Image, COPY-Reihenfolge verhindert Layer-Caching, .dockerignore schliesst node_modules nicht aus. Verwenden Sie npm ci in Docker.',
    faq5_q: 'Wie behebt man "npm ERR! code 1" waehrend npm install?',
    faq5_a: 'Fehlercode 1 bedeutet normalerweise ein fehlgeschlagenes postinstall-Script, oft native Modulkompilierung (node-gyp). macOS: xcode-select --install. Ubuntu/Debian: sudo apt install build-essential python3. Windows: Visual Studio Build Tools.',
    faq6_q: 'Was ist der Unterschied zwischen npm install und npm ci?',
    faq6_a: 'npm install liest package.json und kann package-lock.json aktualisieren. npm ci (clean install) loescht node_modules, liest nur package-lock.json und installiert exakte Versionen. Verwenden Sie npm ci in CI/CD und npm install bei lokaler Entwicklung.',
  },
  es: {
    title: 'Errores de npm install: cada error comun y como solucionarlo',
    intro: 'Ejecutar <code>npm install</code> y encontrarse con un muro de texto rojo es un rito de paso para todo desarrollador JavaScript. Ya sea un error de permisos en macOS, un conflicto de dependencias en un monorepo o una cache corrupta en CI, la solucion suele ser directa una vez que sabes que buscar. Esta guia cubre <strong>cada error comun de npm install</strong>, explica por que ocurre y te da los comandos exactos para solucionarlo.',
    h2_error_dict: 'Diccionario de errores: tabla de referencia rapida',
    th_code: 'Codigo de error',
    th_meaning: 'Significado',
    th_quick_fix: 'Solucion rapida',
    eacces_meaning: 'Permiso denegado — npm intento escribir en un directorio que no posees.',
    eacces_fix: 'Usar nvm o corregir la propiedad del directorio (ver abajo).',
    enoent_meaning: 'Archivo o directorio no encontrado — una ruta referenciada no existe.',
    enoent_fix: 'Eliminar node_modules y package-lock.json, luego reinstalar.',
    eperm_meaning: 'Operacion no permitida — a menudo un problema de bloqueo de archivos en Windows.',
    eperm_fix: 'Cerrar editores/terminales que bloquean la carpeta, luego reintentar.',
    eresolve_meaning: 'Conflicto de dependencias — dos paquetes requieren versiones incompatibles de una peer dependency.',
    eresolve_fix: 'Usar --legacy-peer-deps o --force (ver seccion abajo).',
    err_socket_meaning: 'Timeout de red — npm no pudo alcanzar el registro.',
    err_socket_fix: 'Verificar configuracion de red/proxy o cambiar a un registro espejo.',
    code1_meaning: 'Un script de ciclo de vida (preinstall, postinstall) termino con codigo de error 1.',
    code1_fix: 'Verificar que las herramientas de compilacion (Python, node-gyp, compilador C++) esten instaladas.',
    h2_eacces: 'EACCES: corregir errores de permisos',
    eacces_intro: 'Este es el error mas comun en macOS y Linux. Ocurre cuando npm intenta instalar paquetes globales en un directorio del sistema como <code>/usr/local/lib/node_modules</code>.',
    h3_eacces_mac: 'Solucion en macOS / Linux (Recomendado: usar nvm)',
    eacces_mac_desc: 'La mejor solucion permanente es usar un gestor de versiones de Node para que npm instale en tu directorio de usuario:',
    eacces_mac_alt: 'Alternativa: cambiar manualmente el directorio por defecto de npm:',
    eacces_mac_chown: 'Opcion nuclear (no recomendada para la mayoria):',
    h3_eacces_win: 'Solucion en Windows',
    eacces_win_desc: 'En Windows, ejecuta tu terminal como Administrador, o mejor aun, usa nvm-windows:',
    h2_eresolve: 'ERESOLVE: corregir conflictos de dependencias',
    eresolve_intro: 'Desde npm 7, los conflictos de peer dependencies causan que la instalacion falle por defecto. Veras un diagrama de arbol mostrando que paquetes estan en conflicto.',
    eresolve_example_desc: 'Salida de error tipica:',
    h3_legacy: '--legacy-peer-deps vs --force',
    legacy_desc: '<code>--legacy-peer-deps</code> le dice a npm que ignore completamente los conflictos de peer dependencies (mismo comportamiento que npm 6). <code>--force</code> fuerza la instalacion. Cuando usar cada uno:',
    legacy_option: '--legacy-peer-deps',
    legacy_when: 'Cuando sabes que la discrepancia de peer dep es inofensiva (ej: React 18 vs 17).',
    force_option: '--force',
    force_when: 'Cuando quieres que npm obtenga paquetes incluso si existe una copia en cache.',
    preferred_desc: 'Enfoque preferido — fijar la dependencia en conflicto:',
    h2_corruption: 'Corrupcion de node_modules: cuando y como eliminar y reinstalar',
    corruption_intro: 'A veces node_modules entra en un estado corrupto. Los sintomas incluyen errores "Cannot find module" para paquetes en package.json, o fallos de compilacion extranos despues de cambiar de rama.',
    h3_when_nuke: 'Cuando eliminar node_modules',
    nuke_reason1: 'Despues de cambiar a ramas con arboles de dependencias diferentes.',
    nuke_reason2: 'Despues de resolver conflictos de fusion en package-lock.json.',
    nuke_reason3: 'Cuando aparece "Module not found" para un paquete claramente instalado.',
    nuke_reason4: 'Despues de actualizar Node.js a una nueva version principal.',
    h3_how_nuke: 'Como hacer una reinstalacion limpia',
    nuke_cross: 'Comando multiplataforma (bash):',
    nuke_windows: 'Windows (PowerShell):',
    nuke_npx: 'Usando npx:',
    cache_clean: 'Si los problemas persisten, tambien limpiar la cache de npm:',
    h2_lockfile: 'Conflictos de package-lock.json: estrategias de fusion',
    lockfile_intro: 'Cuando varios desarrolladores cambian dependencias, los conflictos de fusion de package-lock.json estan casi garantizados. Nunca intentes resolverlos manualmente — el archivo es generado automaticamente.',
    h3_strategy: 'Estrategia de fusion recomendada',
    lockfile_step1: 'Aceptar cualquier lado del conflicto (no importa cual):',
    lockfile_step2: 'Regenerar el archivo de bloqueo:',
    lockfile_step3: 'Hacer commit del resultado:',
    h3_gitattributes: 'Prevenir conflictos con .gitattributes',
    gitattributes_desc: 'Agrega esto a tu <code>.gitattributes</code> para resolver automaticamente conflictos del archivo de bloqueo:',
    h2_node_version: 'Incompatibilidad de version de Node.js',
    node_version_intro: 'Muchos paquetes requieren versiones especificas de Node.js. Si tu version es muy antigua (o muy nueva), npm install puede fallar con errores de compilacion.',
    h3_check_version: 'Verificar la version requerida',
    check_version_desc: 'Busca el campo <code>engines</code> en package.json:',
    h3_nvm_fnm: 'Usar nvm o fnm para cambiar versiones',
    nvm_desc: 'nvm (Node Version Manager):',
    fnm_desc: 'fnm (Fast Node Manager) — alternativa mas rapida:',
    nvmrc_desc: 'Crea un archivo <code>.nvmrc</code> en la raiz del proyecto para que todo el equipo use la misma version:',
    h2_ci: 'Problemas CI/CD: builds de Docker y GitHub Actions',
    ci_intro: 'npm install se comporta diferente en entornos CI. El cache, permisos y configuracion de red necesitan atencion especial.',
    h3_docker: 'Builds de Docker',
    docker_desc: 'Errores comunes en Dockerfiles:',
    docker_tip: 'Puntos clave: copiar primero los archivos package para cache de capas, usar <code>npm ci</code> en lugar de <code>npm install</code> en CI (mas rapido y deterministico), usar <code>--ignore-scripts</code> si no se necesitan scripts postinstall.',
    h3_github_actions: 'Cache de GitHub Actions',
    github_actions_desc: 'Un cache adecuado puede reducir el tiempo de instalacion en mas del 70%:',
    h2_flowchart: 'Diagrama de decision: npm install fallo — sigue esta guia',
    flowchart_intro: 'Usa este diagrama para diagnosticar tu fallo de npm install:',
    flow_step1: '1. Es un error de permisos (EACCES / EPERM)?',
    flow_step1_yes: 'SI -> Usar nvm o corregir la propiedad del directorio.',
    flow_step2: '2. Es un conflicto de dependencias (ERESOLVE)?',
    flow_step2_yes: 'SI -> Probar primero --legacy-peer-deps, luego verificar fijacion de version.',
    flow_step3: '3. Es un error de red (SOCKET_TIMEOUT / FETCH)?',
    flow_step3_yes: 'SI -> Verificar proxy, VPN, o cambiar de registro espejo.',
    flow_step4: '4. Es un error de compilacion (node-gyp / code 1)?',
    flow_step4_yes: 'SI -> Instalar herramientas de compilacion (python3, make, g++ / Visual Studio Build Tools).',
    flow_step5: '5. Es "Cannot find module" o comportamiento extrano?',
    flow_step5_yes: 'SI -> Eliminar node_modules + package-lock.json, luego npm install.',
    flow_step6: '6. Sigue fallando?',
    flow_step6_yes: 'SI -> Limpiar cache npm (npm cache clean --force), verificar version de Node, intentar un clon nuevo.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Como solucionar "npm ERR! EACCES: permission denied" en Mac?',
    faq1_a: 'La mejor solucion es instalar Node.js a traves de nvm (Node Version Manager) que instala en tu directorio de usuario y evita problemas de permisos. Ejecuta: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash, luego nvm install --lts.',
    faq2_q: 'Que significa "npm ERR! ERESOLVE could not resolve"?',
    faq2_a: 'ERESOLVE significa que dos o mas paquetes en tu arbol de dependencias requieren versiones diferentes e incompatibles de la misma peer dependency. Desde npm 7 es un error duro. Agrega --legacy-peer-deps o usa el campo overrides en package.json.',
    faq3_q: 'Debo eliminar package-lock.json para corregir errores de npm install?',
    faq3_a: 'Eliminar package-lock.json debe ser el ultimo recurso. El archivo de bloqueo garantiza instalaciones deterministicas. Primero intenta eliminar solo node_modules. Siempre haz commit del archivo de bloqueo regenerado.',
    faq4_q: 'Por que npm install falla en Docker pero funciona localmente?',
    faq4_a: 'Causas comunes: ejecucion como root sin --unsafe-perm, herramientas de compilacion nativas faltantes en la imagen Docker, orden de COPY impidiendo cache de capas, .dockerignore no excluyendo node_modules. Usa npm ci en Docker.',
    faq5_q: 'Como solucionar "npm ERR! code 1" durante npm install?',
    faq5_a: 'El codigo de error 1 generalmente significa un script postinstall fallido, a menudo compilacion de modulo nativo (node-gyp). macOS: xcode-select --install. Ubuntu/Debian: sudo apt install build-essential python3. Windows: Visual Studio Build Tools.',
    faq6_q: 'Cual es la diferencia entre npm install y npm ci?',
    faq6_a: 'npm install lee package.json y puede actualizar package-lock.json. npm ci (clean install) elimina node_modules, lee solo package-lock.json e instala versiones exactas. Usa npm ci en CI/CD y npm install en desarrollo local.',
  },
};

export default function NpmInstallErrors({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: t.faq6_q, acceptedAnswer: { '@type': 'Answer', text: t.faq6_a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* ========== ERROR DICTIONARY TABLE ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_error_dict}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_code}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_meaning}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_quick_fix}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-red-400">EACCES</td>
              <td className="border border-gray-700 px-4 py-2">{t.eacces_meaning}</td>
              <td className="border border-gray-700 px-4 py-2">{t.eacces_fix}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-red-400">ENOENT</td>
              <td className="border border-gray-700 px-4 py-2">{t.enoent_meaning}</td>
              <td className="border border-gray-700 px-4 py-2">{t.enoent_fix}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-red-400">EPERM</td>
              <td className="border border-gray-700 px-4 py-2">{t.eperm_meaning}</td>
              <td className="border border-gray-700 px-4 py-2">{t.eperm_fix}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-red-400">ERESOLVE</td>
              <td className="border border-gray-700 px-4 py-2">{t.eresolve_meaning}</td>
              <td className="border border-gray-700 px-4 py-2">{t.eresolve_fix}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-red-400">ERR_SOCKET_TIMEOUT</td>
              <td className="border border-gray-700 px-4 py-2">{t.err_socket_meaning}</td>
              <td className="border border-gray-700 px-4 py-2">{t.err_socket_fix}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-red-400">code 1</td>
              <td className="border border-gray-700 px-4 py-2">{t.code1_meaning}</td>
              <td className="border border-gray-700 px-4 py-2">{t.code1_fix}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========== EACCES ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_eacces}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.eacces_intro }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_eacces_mac}</h3>
      <p>{t.eacces_mac_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then install Node
nvm install --lts
nvm use --lts

# Verify — npm now installs to ~/.nvm/
which npm
# /home/youruser/.nvm/versions/node/v20.x.x/bin/npm`}</code>
      </pre>

      <p>{t.eacces_mac_alt}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'

# Add to ~/.bashrc or ~/.zshrc:
export PATH=~/.npm-global/bin:$PATH

# Reload shell
source ~/.bashrc`}</code>
      </pre>

      <p>{t.eacces_mac_chown}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# NOT recommended — changes system directory ownership
sudo chown -R $(whoami) /usr/local/lib/node_modules
sudo chown -R $(whoami) /usr/local/bin
sudo chown -R $(whoami) /usr/local/share`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_eacces_win}</h3>
      <p>{t.eacces_win_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Install nvm-windows from:
# https://github.com/coreybutler/nvm-windows/releases

# Then in an elevated (Admin) PowerShell:
nvm install lts
nvm use lts

# Or fix npm prefix for current user:
npm config set prefix %APPDATA%\\npm`}</code>
      </pre>

      {/* ========== ERESOLVE ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_eresolve}</h2>
      <p>{t.eresolve_intro}</p>

      <p><strong>{t.eresolve_example_desc}</strong></p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: @some-org/some-package@2.1.0
npm ERR! Found: react@18.2.0
npm ERR! node_modules/react
npm ERR!   react@"^18.2.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^16.8.0 || ^17.0.0" from some-library@3.5.0
npm ERR! node_modules/some-library
npm ERR!   some-library@"^3.5.0" from the root project`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_legacy}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.legacy_desc }} />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">Flag</th>
              <th className="border border-gray-700 px-4 py-2 text-left">When to Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-yellow-400">{t.legacy_option}</td>
              <td className="border border-gray-700 px-4 py-2">{t.legacy_when}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-yellow-400">{t.force_option}</td>
              <td className="border border-gray-700 px-4 py-2">{t.force_when}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Option 1: Ignore peer deps (safest workaround)
npm install --legacy-peer-deps

# Option 2: Force install (overrides everything)
npm install --force`}</code>
      </pre>

      <p>{t.preferred_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// In package.json — add "overrides" to pin the conflicting dep
{
  "overrides": {
    "some-library": {
      "react": "^18.2.0"
    }
  }
}

// Then run:
// npm install`}</code>
      </pre>

      {/* ========== NODE_MODULES CORRUPTION ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_corruption}</h2>
      <p>{t.corruption_intro}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_when_nuke}</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>{t.nuke_reason1}</li>
        <li>{t.nuke_reason2}</li>
        <li>{t.nuke_reason3}</li>
        <li>{t.nuke_reason4}</li>
      </ul>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_how_nuke}</h3>
      <p>{t.nuke_cross}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`rm -rf node_modules package-lock.json
npm install`}</code>
      </pre>

      <p>{t.nuke_windows}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install`}</code>
      </pre>

      <p>{t.nuke_npx}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`npx rimraf node_modules
npm install`}</code>
      </pre>

      <p>{t.cache_clean}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`npm cache clean --force
rm -rf node_modules package-lock.json
npm install`}</code>
      </pre>

      {/* ========== LOCKFILE CONFLICTS ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_lockfile}</h2>
      <p>{t.lockfile_intro}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_strategy}</h3>
      <p>{t.lockfile_step1}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Accept "theirs" (the incoming branch's version)
git checkout --theirs package-lock.json
git add package-lock.json

# OR accept "ours" (your branch's version)
git checkout --ours package-lock.json
git add package-lock.json`}</code>
      </pre>

      <p>{t.lockfile_step2}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`npm install`}</code>
      </pre>

      <p>{t.lockfile_step3}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`git add package-lock.json
git commit -m "chore: regenerate package-lock.json after merge"`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_gitattributes}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.gitattributes_desc }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# .gitattributes
package-lock.json merge=ours`}</code>
      </pre>

      {/* ========== NODE VERSION ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_node_version}</h2>
      <p>{t.node_version_intro}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_check_version}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.check_version_desc }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// package.json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}

// Check your current version:
// node -v
// npm -v`}</code>
      </pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_nvm_fnm}</h3>
      <p>{t.nvm_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# List available versions
nvm ls-remote

# Install a specific version
nvm install 20

# Switch to a version
nvm use 20

# Set a default
nvm alias default 20`}</code>
      </pre>

      <p>{t.fnm_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Install fnm (Rust-based, faster than nvm)
curl -fsSL https://fnm.vercel.app/install | bash

# Install and use a version
fnm install 20
fnm use 20
fnm default 20`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: t.nvmrc_desc }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Create .nvmrc file
echo "20" > .nvmrc

# Team members just run:
nvm use
# or
fnm use`}</code>
      </pre>

      {/* ========== CI/CD ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_ci}</h2>
      <p>{t.ci_intro}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_docker}</h3>
      <p>{t.docker_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# BAD Dockerfile — no layer caching, uses npm install
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]

# GOOD Dockerfile — proper layer caching, uses npm ci
FROM node:20-alpine
WORKDIR /app

# Copy package files first (layer caching!)
COPY package.json package-lock.json ./

# Use npm ci for deterministic installs
RUN npm ci --ignore-scripts

# Then copy the rest of the source
COPY . .

# Run any build steps after copy
RUN npm run build

CMD ["node", "index.js"]`}</code>
      </pre>
      <p dangerouslySetInnerHTML={{ __html: t.docker_tip }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_github_actions}</h3>
      <p>{t.github_actions_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'  # Caches ~/.npm automatically

      - run: npm ci       # Deterministic install
      - run: npm test
      - run: npm run build`}</code>
      </pre>

      {/* ========== FLOWCHART ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_flowchart}</h2>
      <p>{t.flowchart_intro}</p>

      <div className="bg-gray-900 p-6 rounded-lg space-y-4 text-sm font-mono">
        <div className="border-l-4 border-red-500 pl-4">
          <p className="text-red-400 font-bold">{t.flow_step1}</p>
          <p className="text-green-400 ml-4">{t.flow_step1_yes}</p>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <p className="text-orange-400 font-bold">{t.flow_step2}</p>
          <p className="text-green-400 ml-4">{t.flow_step2_yes}</p>
        </div>
        <div className="border-l-4 border-yellow-500 pl-4">
          <p className="text-yellow-400 font-bold">{t.flow_step3}</p>
          <p className="text-green-400 ml-4">{t.flow_step3_yes}</p>
        </div>
        <div className="border-l-4 border-blue-500 pl-4">
          <p className="text-blue-400 font-bold">{t.flow_step4}</p>
          <p className="text-green-400 ml-4">{t.flow_step4_yes}</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <p className="text-purple-400 font-bold">{t.flow_step5}</p>
          <p className="text-green-400 ml-4">{t.flow_step5_yes}</p>
        </div>
        <div className="border-l-4 border-pink-500 pl-4">
          <p className="text-pink-400 font-bold">{t.flow_step6}</p>
          <p className="text-green-400 ml-4">{t.flow_step6_yes}</p>
        </div>
      </div>

      {/* ========== FAQ ========== */}
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
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq6_q}</h3>
          <p>{t.faq6_a}</p>
        </div>
      </div>
    </article>
  );
}
