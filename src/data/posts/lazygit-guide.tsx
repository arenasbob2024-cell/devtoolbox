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
    title: 'Lazygit Complete Guide 2026: Terminal UI for Git That Replaces Your GUI',
    description: 'Master Lazygit — the terminal UI for Git with interactive rebase, staging hunks, conflict resolution, worktrees, custom keybindings, Neovim integration, and advanced workflows.',
    toc: [
      'What Is Lazygit and Why It Matters',
      'Lazygit vs GitKraken vs Fork vs SourceTree vs tig',
      'Installation',
      'Interface Overview: The 5 Panels',
      'Keyboard Shortcuts Cheat Sheet',
      'Staging: Files, Hunks, and Lines',
      'Committing: Conventional Commits, Amend, Fixup',
      'Branching: Create, Merge, Rebase, Cherry-Pick',
      'Interactive Rebase',
      'Stashing',
      'Conflict Resolution',
      'Remote Operations',
      'Worktrees and Submodules',
      'Custom Commands and Keybindings',
      'Editor Integration: Neovim and VS Code',
      'Filtering, Searching, and Bisect',
      'Patch Management',
      'Themes and Customization',
      'Performance with Large Repos',
      'Common Workflows',
      'Tips and Tricks for Power Users',
      'FAQ',
    ],
    tldr: 'Lazygit is a free, open-source terminal UI for Git that makes complex operations like interactive rebase, partial staging, conflict resolution, and cherry-picking as simple as pressing a single key. It runs everywhere a terminal runs, integrates natively with Neovim and VS Code, and is fully customizable through config.yml. In 2026 it remains the fastest way to manage Git repositories without leaving the command line.',
    takeaways: [
      'Lazygit provides a full-featured Git GUI inside your terminal with a 5-panel interface covering status, files, branches, commits, and stash',
      'Interactive rebase is visual and intuitive: reorder, squash, fixup, edit, and drop commits by pressing single keys',
      'Stage individual lines and hunks with the spacebar, making surgical commits trivially easy',
      'Conflict resolution uses a side-by-side view where you pick changes with a single keystroke',
      'Custom commands in config.yml let you define project-specific Git workflows bound to any key',
      'Native Neovim integration via lazygit.nvim and VS Code via the terminal make it part of your editor workflow',
    ],
    body: {
      introP1: 'Git is the backbone of modern software development, but its command-line interface remains notoriously difficult to use for complex operations. Interactive rebase, partial staging, conflict resolution, and cherry-picking all require memorizing arcane flags and multi-step sequences. Lazygit solves this by wrapping the full power of Git in an intuitive terminal user interface.',
      introP2: 'Created by Jesse Duffield in 2018, Lazygit has grown into one of the most popular developer tools on GitHub with over 55,000 stars. It runs on macOS, Linux, and Windows, requires no GUI framework, and works over SSH. In 2026, with its mature plugin system, custom commands, and deep editor integrations, Lazygit has become the standard Git interface for terminal-centric developers.',
      whatTitle: 'What Is Lazygit and Why It Matters',
      whatP1: 'Lazygit is a terminal-based user interface for Git written in Go. It presents your repository state across five interactive panels: Status, Files, Branches, Commits, and Stash. Every Git operation — from staging individual lines to performing interactive rebases — is accessible through single-key shortcuts without typing any Git commands.',
      whatP2: 'Why does a terminal UI for Git matter? GUI tools like GitKraken and Fork are powerful but require dedicated applications, consume significant resources, and cannot run over SSH. The raw Git CLI is universal but hostile to complex operations. Lazygit occupies the sweet spot: full visual feedback with the speed and portability of the terminal.',
      whatList1: 'Runs everywhere: local terminal, SSH, tmux, Docker containers, WSL',
      whatList2: 'Zero dependencies beyond Git itself — single binary distribution',
      whatList3: 'Keyboard-driven: every action is a single keypress away',
      whatList4: 'Full Git feature coverage: rebase, cherry-pick, bisect, worktrees, submodules, patches',
      whatList5: 'Fully customizable keybindings, themes, and custom commands via config.yml',
      whatList6: 'Active development with frequent releases and a responsive maintainer',
      compTitle: 'Lazygit vs GitKraken vs Fork vs SourceTree vs tig',
      compDesc: 'Each Git client serves different workflows. This comparison helps you choose the right tool.',
      installTitle: 'Installation',
      installDesc: 'Lazygit distributes as a single binary. Install it with your preferred package manager or build from source.',
      interfaceTitle: 'Interface Overview: The 5 Panels',
      interfaceP1: 'When you launch Lazygit by typing lazygit in a Git repository, you see five panels arranged in a split layout. Each panel is focused with Tab or number keys, and actions within each panel are context-sensitive.',
      interfaceP2: 'The Status panel (1) shows the current branch, remote tracking status, and recent log. The Files panel (2) displays staged and unstaged changes similar to git status. The Branches panel (3) lists local and remote branches with checkout and merge options. The Commits panel (4) shows the commit log with interactive rebase capabilities. The Stash panel (5) manages your stash entries with preview.',
      shortcutsTitle: 'Keyboard Shortcuts Cheat Sheet',
      shortcutsDesc: 'Lazygit is entirely keyboard-driven. These are the most essential shortcuts organized by context.',
      stagingTitle: 'Staging: Files, Hunks, and Lines',
      stagingP1: 'One of Lazygit\'s most powerful features is granular staging. In the Files panel, press Space to stage or unstage an entire file. Press Enter on a file to open the staging view, where you can stage individual hunks or even individual lines.',
      stagingP2: 'In the staging view, use the arrow keys to navigate between hunks. Press Space to stage the current hunk. Press v to enter line-selection mode, then use arrows to select specific lines and Space to stage only those lines. This makes creating focused, atomic commits trivially easy.',
      commitTitle: 'Committing: Conventional Commits, Amend, Fixup',
      commitP1: 'Press c in the Files panel to open the commit message editor. Type your message and press Enter to commit. For conventional commits, simply type the prefix directly: feat: add user login or fix: resolve null pointer.',
      commitP2: 'Press A to amend the last commit (adds staged changes to the previous commit). Press shift+F on a commit in the Commits panel to create a fixup commit that will automatically squash into the target commit during the next interactive rebase with autosquash.',
      branchTitle: 'Branching: Create, Merge, Rebase, Cherry-Pick',
      branchP1: 'In the Branches panel, press n to create a new branch from the current HEAD. Press Space to checkout a branch. Press M to merge the selected branch into the current branch. Press r to rebase the current branch onto the selected branch.',
      branchP2: 'Cherry-picking is intuitive: navigate to the Commits panel, press C to copy a commit, switch to the target branch, and press V to paste (cherry-pick) the commit. You can copy multiple commits and paste them all at once.',
      rebaseTitle: 'Interactive Rebase',
      rebaseP1: 'Interactive rebase is where Lazygit truly shines. In the Commits panel, press e on any commit to start an interactive rebase from that point. Each commit shows its rebase action, and you can change them with single keys.',
      rebaseP2: 'Press s to squash a commit into the one below it. Press f to fixup (squash without keeping the message). Press d to drop a commit. Press e to edit a commit (pauses rebase so you can make changes). Use ctrl+j and ctrl+k to reorder commits by moving them up and down. Press m to change the commit message during rebase.',
      stashTitle: 'Stashing',
      stashP1: 'Press s in the Files panel to stash all changes. You will be prompted for a stash message. Press S to open stash options where you can choose to stash only staged changes, include untracked files, or keep the index.',
      stashP2: 'In the Stash panel, press Space to apply a stash entry (keeps the stash), press g to pop (apply and delete), or press d to drop a stash entry. Press Enter on any stash to preview its contents before applying.',
      conflictTitle: 'Conflict Resolution',
      conflictP1: 'When merge conflicts occur, Lazygit highlights conflicted files in the Files panel. Press Enter on a conflicted file to open the merge conflict view, which displays both sides of the conflict.',
      conflictP2: 'In the conflict view, press up/down arrows to navigate between conflict markers. Press left arrow to pick the incoming change (theirs), right arrow to pick the current change (ours), or b to pick both. After resolving all conflicts in a file, press Space to mark it as resolved and continue the merge or rebase.',
      remoteTitle: 'Remote Operations',
      remoteP1: 'Press P (uppercase) to push the current branch to the remote. Press p (lowercase) to pull. Press f to fetch all remotes. If the push is rejected, Lazygit will offer to force push with lease, which is safer than a plain force push because it checks that the remote has not been updated since your last fetch.',
      remoteP2: 'For managing multiple remotes, switch to the Remotes sub-panel within the Branches panel. Here you can add, edit, and remove remotes, as well as fetch from specific remotes.',
      worktreeTitle: 'Worktrees and Submodules',
      worktreeP1: 'Lazygit supports Git worktrees, allowing you to work on multiple branches simultaneously without stashing or switching. Press w in the Branches panel to create a new worktree for the selected branch. Lazygit will open a new instance in the worktree directory.',
      worktreeP2: 'For submodules, Lazygit detects them automatically and displays them in the Files panel. Press Enter on a submodule to open a new Lazygit instance inside that submodule, giving you full control over its Git operations.',
      customTitle: 'Custom Commands and Keybindings',
      customP1: 'Lazygit\'s config.yml lets you define custom commands bound to any key. This is extremely powerful for project-specific workflows like deploying, running tests, or triggering CI pipelines directly from the Git interface.',
      customP2: 'Custom commands can access context variables like the current branch name, selected commit hash, and file path. They can run in the background, show output in a popup, or open a new terminal panel.',
      editorTitle: 'Editor Integration: Neovim and VS Code',
      editorP1: 'Lazygit integrates seamlessly with Neovim through the lazygit.nvim plugin by kdheepak. This plugin opens Lazygit in a floating terminal window inside Neovim, bound to a configurable keymap (commonly <leader>gg). When you edit a file in Lazygit, it opens in your existing Neovim instance.',
      editorP2: 'For VS Code users, Lazygit runs in the integrated terminal. You can configure VS Code to launch Lazygit with a keyboard shortcut by adding a task or using the terminal profile feature. Some users bind it to Ctrl+Shift+G as a replacement for the built-in Source Control panel.',
      filterTitle: 'Filtering, Searching, and Bisect',
      filterP1: 'Press / in any panel to filter the list. In the Commits panel, this lets you search commit messages. In the Branches panel, you can quickly find a branch by name. In the Files panel, filter by filename. The filter is fuzzy, so partial matches work well.',
      filterP2: 'Lazygit supports git bisect for finding the commit that introduced a bug. Press b in the Commits panel to start a bisect session. Mark commits as good or bad with g and b respectively. Lazygit will navigate the binary search automatically and highlight the culprit commit.',
      patchTitle: 'Patch Management',
      patchP1: 'Lazygit has a built-in patch building feature. In the Commits panel, press Enter on a commit to view its diff. Press Space on specific files or hunks to add them to a custom patch. Once you have built your patch, press ctrl+p to open the patch options menu where you can apply the patch to the index, create a new commit from it, or copy it to the clipboard.',
      themeTitle: 'Themes and Customization',
      themeP1: 'Lazygit supports full theme customization through config.yml. You can set colors for every UI element including borders, selected lines, diff highlighting, and panel backgrounds. Lazygit ships with several built-in themes and can also inherit your terminal\'s color scheme.',
      perfTitle: 'Performance with Large Repos',
      perfP1: 'Lazygit handles large repositories efficiently because it shells out to Git for all operations rather than reimplementing Git in Go. For very large repos (100k+ commits), you can configure the commit log limit in config.yml to reduce memory usage. Lazygit also supports sparse checkout and partial clone workflows.',
      workflowTitle: 'Common Workflows',
      workflowP1: 'Here are three workflows that demonstrate Lazygit\'s power in daily development.',
      workflowFeature: 'Feature Branch Workflow',
      workflowHotfix: 'Hotfix Workflow',
      workflowRelease: 'Release Workflow',
      tipsTitle: 'Tips and Tricks for Power Users',
      tip1: 'Press ? in any panel to see all available keybindings for that context',
      tip2: 'Press + and - to expand and collapse the side panels for more diff space',
      tip3: 'Press x to open the action menu showing all possible actions for the current context',
      tip4: 'Use undo (z) and redo (ctrl+z) to revert accidental operations like commits or branch deletions',
      tip5: 'Press @ to open the command log showing every Git command Lazygit executes — great for learning Git',
      tip6: 'Create a branch-specific config by placing .lazygit.yml in your project root',
      tip7: 'Press w to open the diff menu to compare any two refs side by side',
      tip8: 'Navigate to the Reflog panel (accessible from the Commits panel tab) to recover lost commits',
      faqTitle: 'Frequently Asked Questions',
      faq1Q: 'Is Lazygit free and open source?',
      faq1A: 'Yes, Lazygit is completely free and open source under the MIT license. It is hosted on GitHub at jesseduffield/lazygit and accepts community contributions.',
      faq2Q: 'Does Lazygit work over SSH?',
      faq2A: 'Yes, since Lazygit is a terminal application, it works perfectly over SSH connections. This makes it ideal for managing Git repositories on remote servers, containers, and VMs.',
      faq3Q: 'Can I use Lazygit with Neovim?',
      faq3A: 'Yes, the lazygit.nvim plugin by kdheepak provides seamless Neovim integration. It opens Lazygit in a floating terminal window and supports opening files in your existing Neovim session.',
      faq4Q: 'How do I customize keybindings in Lazygit?',
      faq4A: 'Edit the config.yml file located at ~/.config/lazygit/config.yml (Linux/macOS) or %APPDATA%/lazygit/config.yml (Windows). The keybindings section lets you remap any action to any key.',
      faq5Q: 'Is Lazygit faster than GitKraken or Fork?',
      faq5A: 'Yes, Lazygit starts instantly (under 100ms) and uses minimal memory because it is a terminal application with no GUI framework. GitKraken and Fork use Electron or native frameworks that consume significantly more resources.',
      faq6Q: 'Does Lazygit support Git LFS?',
      faq6A: 'Yes, Lazygit works transparently with Git LFS. Since it delegates to the Git CLI for all operations, any Git extension including LFS, Git Crypt, and Git Annex works automatically.',
      faq7Q: 'Can I use Lazygit for interactive rebase instead of the command line?',
      faq7A: 'Absolutely. Interactive rebase is one of Lazygit\'s strongest features. You can reorder, squash, fixup, edit, and drop commits visually with single-key shortcuts, which is dramatically easier than editing a rebase todo file in a text editor.',
      faq8Q: 'How do I update Lazygit?',
      faq8A: 'Update through your package manager: brew upgrade lazygit on macOS, sudo apt update && sudo apt upgrade lazygit on Debian/Ubuntu, or scoop update lazygit on Windows. If installed via go install, run go install github.com/jesseduffield/lazygit@latest.',
    },
  },
  zh: {
    title: 'Lazygit 完全指南 2026：替代 GUI 的终端 Git 界面',
    description: '掌握 Lazygit — 终端 Git UI，支持交互式变基、暂存区块、冲突解决、工作树、自定义快捷键、Neovim 集成及高级工作流。',
    toc: [
      '什么是 Lazygit 以及为什么它很重要',
      'Lazygit vs GitKraken vs Fork vs SourceTree vs tig',
      '安装',
      '界面概览：5 个面板',
      '键盘快捷键速查表',
      '暂存：文件、区块和行',
      '提交：约定式提交、修改、修复',
      '分支：创建、合并、变基、摘取',
      '交互式变基',
      '贮藏',
      '冲突解决',
      '远程操作',
      '工作树和子模块',
      '自定义命令和键绑定',
      '编辑器集成：Neovim 和 VS Code',
      '过滤、搜索和二分查找',
      '补丁管理',
      '主题和自定义',
      '大型仓库性能',
      '常见工作流',
      '高级用户技巧',
      '常见问题',
    ],
    tldr: 'Lazygit 是一个免费开源的终端 Git UI，让交互式变基、部分暂存、冲突解决和摘取提交等复杂操作只需按一个键即可完成。它可以在任何终端环境中运行，原生集成 Neovim 和 VS Code，并通过 config.yml 完全可定制。在 2026 年，它仍然是不离开命令行管理 Git 仓库的最快方式。',
    takeaways: [
      'Lazygit 在终端中提供功能完整的 Git GUI，包含 5 个面板：状态、文件、分支、提交和贮藏',
      '交互式变基直观可视化：通过单键操作重新排序、压缩、修复、编辑和删除提交',
      '使用空格键暂存单独的行和区块，轻松创建精确的原子提交',
      '冲突解决使用并排视图，只需一个按键即可选择更改',
      'config.yml 中的自定义命令让你定义绑定到任意键的项目特定 Git 工作流',
      '通过 lazygit.nvim 原生集成 Neovim，通过终端集成 VS Code',
    ],
    body: {
      introP1: 'Git 是现代软件开发的支柱，但其命令行界面对于复杂操作仍然出了名的难用。交互式变基、部分暂存、冲突解决和摘取提交都需要记住晦涩的标志和多步骤序列。Lazygit 通过将 Git 的全部功能包装在直观的终端用户界面中来解决这个问题。',
      introP2: 'Lazygit 由 Jesse Duffield 于 2018 年创建，已发展成为 GitHub 上最受欢迎的开发者工具之一，拥有超过 55,000 颗星。它运行在 macOS、Linux 和 Windows 上，不需要 GUI 框架，可以通过 SSH 工作。在 2026 年，凭借其成熟的插件系统、自定义命令和深度编辑器集成，Lazygit 已成为面向终端的开发者的标准 Git 界面。',
      whatTitle: '什么是 Lazygit 以及为什么它很重要',
      whatP1: 'Lazygit 是一个用 Go 编写的基于终端的 Git 用户界面。它通过五个交互式面板展示你的仓库状态：状态、文件、分支、提交和贮藏。每个 Git 操作——从暂存单独的行到执行交互式变基——都可以通过单键快捷方式访问，无需输入任何 Git 命令。',
      whatP2: '为什么终端 Git UI 很重要？GitKraken 和 Fork 等 GUI 工具很强大，但需要专用应用程序，消耗大量资源，且无法通过 SSH 运行。原生 Git CLI 是通用的，但对复杂操作不友好。Lazygit 占据了最佳位置：终端的速度和可移植性加上完整的可视化反馈。',
      whatList1: '随处运行：本地终端、SSH、tmux、Docker 容器、WSL',
      whatList2: '除 Git 本身外零依赖 — 单二进制文件分发',
      whatList3: '键盘驱动：每个操作只需一次按键',
      whatList4: '完整的 Git 功能覆盖：变基、摘取、二分查找、工作树、子模块、补丁',
      whatList5: '通过 config.yml 完全可定制的键绑定、主题和自定义命令',
      whatList6: '活跃开发，频繁发布，维护者响应迅速',
      compTitle: 'Lazygit vs GitKraken vs Fork vs SourceTree vs tig',
      compDesc: '每个 Git 客户端适合不同的工作流。此比较帮助你选择合适的工具。',
      installTitle: '安装',
      installDesc: 'Lazygit 以单一二进制文件分发。使用你喜欢的包管理器安装或从源码构建。',
      interfaceTitle: '界面概览：5 个面板',
      interfaceP1: '在 Git 仓库中输入 lazygit 启动时，你会看到五个分屏排列的面板。每个面板通过 Tab 或数字键聚焦，面板内的操作根据上下文而变化。',
      interfaceP2: '状态面板（1）显示当前分支、远程跟踪状态和最近日志。文件面板（2）显示已暂存和未暂存的更改，类似 git status。分支面板（3）列出本地和远程分支，提供检出和合并选项。提交面板（4）显示提交日志，具有交互式变基功能。贮藏面板（5）管理你的贮藏条目并提供预览。',
      shortcutsTitle: '键盘快捷键速查表',
      shortcutsDesc: 'Lazygit 完全由键盘驱动。以下是按上下文组织的最重要快捷键。',
      stagingTitle: '暂存：文件、区块和行',
      stagingP1: 'Lazygit 最强大的功能之一是粒度暂存。在文件面板中，按空格键暂存或取消暂存整个文件。按 Enter 打开暂存视图，可以暂存单个区块甚至单独的行。',
      stagingP2: '在暂存视图中，使用方向键在区块之间导航。按空格键暂存当前区块。按 v 进入行选择模式，然后使用方向键选择特定行，再按空格键只暂存这些行。这使得创建专注的原子提交变得非常简单。',
      commitTitle: '提交：约定式提交、修改、修复',
      commitP1: '在文件面板中按 c 打开提交消息编辑器。输入消息后按 Enter 提交。对于约定式提交，直接输入前缀：feat: add user login 或 fix: resolve null pointer。',
      commitP2: '按 A 修改上一次提交（将暂存的更改添加到上一次提交）。在提交面板中按 shift+F 创建修复提交，它会在下次带有 autosquash 的交互式变基期间自动压缩到目标提交中。',
      branchTitle: '分支：创建、合并、变基、摘取',
      branchP1: '在分支面板中按 n 从当前 HEAD 创建新分支。按空格键检出分支。按 M 将选定分支合并到当前分支。按 r 将当前分支变基到选定分支上。',
      branchP2: '摘取提交很直观：导航到提交面板，按 C 复制提交，切换到目标分支，按 V 粘贴（摘取）提交。你可以复制多个提交并一次性全部粘贴。',
      rebaseTitle: '交互式变基',
      rebaseP1: '交互式变基是 Lazygit 真正闪耀的地方。在提交面板中，按 e 从某个提交开始交互式变基。每个提交显示其变基操作，你可以用单键更改它们。',
      rebaseP2: '按 s 将提交压缩到下面的提交中。按 f 进行修复（压缩但不保留消息）。按 d 删除提交。按 e 编辑提交（暂停变基以便你进行更改）。使用 ctrl+j 和 ctrl+k 通过上下移动来重新排序提交。按 m 在变基期间更改提交消息。',
      stashTitle: '贮藏',
      stashP1: '在文件面板中按 s 贮藏所有更改。系统会提示你输入贮藏消息。按 S 打开贮藏选项，你可以选择只贮藏已暂存的更改、包含未跟踪的文件或保留索引。',
      stashP2: '在贮藏面板中，按空格键应用贮藏条目（保留贮藏），按 g 弹出（应用并删除），或按 d 删除贮藏条目。按 Enter 预览任何贮藏的内容后再应用。',
      conflictTitle: '冲突解决',
      conflictP1: '当合并冲突发生时，Lazygit 在文件面板中高亮显示冲突文件。按 Enter 打开合并冲突视图，显示冲突的两侧。',
      conflictP2: '在冲突视图中，按上下方向键在冲突标记之间导航。按左方向键选择传入的更改（theirs），按右方向键选择当前的更改（ours），或按 b 选择两者。解决文件中所有冲突后，按空格键标记为已解决并继续合并或变基。',
      remoteTitle: '远程操作',
      remoteP1: '按 P（大写）推送当前分支到远程。按 p（小写）拉取。按 f 获取所有远程。如果推送被拒绝，Lazygit 会提供使用 force push with lease 的选项，这比普通强制推送更安全，因为它会检查远程自你上次获取后是否已更新。',
      remoteP2: '要管理多个远程，切换到分支面板内的远程子面板。在这里你可以添加、编辑和删除远程，以及从特定远程获取。',
      worktreeTitle: '工作树和子模块',
      worktreeP1: 'Lazygit 支持 Git 工作树，允许你同时在多个分支上工作，无需贮藏或切换。在分支面板中按 w 为选定分支创建新工作树。Lazygit 将在工作树目录中打开新实例。',
      worktreeP2: '对于子模块，Lazygit 自动检测并在文件面板中显示它们。按 Enter 打开子模块内的新 Lazygit 实例，给你对其 Git 操作的完全控制。',
      customTitle: '自定义命令和键绑定',
      customP1: 'Lazygit 的 config.yml 允许你定义绑定到任意键的自定义命令。这对于项目特定的工作流非常强大，如直接从 Git 界面部署、运行测试或触发 CI 流水线。',
      customP2: '自定义命令可以访问上下文变量，如当前分支名、选定的提交哈希和文件路径。它们可以在后台运行、在弹窗中显示输出或打开新的终端面板。',
      editorTitle: '编辑器集成：Neovim 和 VS Code',
      editorP1: 'Lazygit 通过 kdheepak 的 lazygit.nvim 插件与 Neovim 无缝集成。此插件在 Neovim 内的浮动终端窗口中打开 Lazygit，绑定到可配置的键映射（通常是 <leader>gg）。当你在 Lazygit 中编辑文件时，它会在你现有的 Neovim 实例中打开。',
      editorP2: '对于 VS Code 用户，Lazygit 在集成终端中运行。你可以通过添加任务或使用终端配置文件功能来配置 VS Code 以键盘快捷键启动 Lazygit。一些用户将其绑定到 Ctrl+Shift+G 作为内置源代码管理面板的替代品。',
      filterTitle: '过滤、搜索和二分查找',
      filterP1: '在任何面板中按 / 进行过滤。在提交面板中，这让你搜索提交消息。在分支面板中，你可以按名称快速找到分支。在文件面板中，按文件名过滤。过滤是模糊的，部分匹配也能很好地工作。',
      filterP2: 'Lazygit 支持 git bisect 来查找引入 bug 的提交。在提交面板中按 b 开始二分查找会话。分别用 g 和 b 标记提交为好或坏。Lazygit 将自动导航二分搜索并高亮显示罪魁祸首提交。',
      patchTitle: '补丁管理',
      patchP1: 'Lazygit 有内置的补丁构建功能。在提交面板中，按 Enter 查看提交的差异。按空格键选择特定文件或区块添加到自定义补丁中。构建好补丁后，按 ctrl+p 打开补丁选项菜单，你可以将补丁应用到索引、从中创建新提交或复制到剪贴板。',
      themeTitle: '主题和自定义',
      themeP1: 'Lazygit 通过 config.yml 支持完整的主题定制。你可以为每个 UI 元素设置颜色，包括边框、选中行、差异高亮和面板背景。Lazygit 附带几个内置主题，也可以继承你终端的配色方案。',
      perfTitle: '大型仓库性能',
      perfP1: 'Lazygit 高效处理大型仓库，因为它将所有操作委托给 Git 而不是用 Go 重新实现 Git。对于非常大的仓库（100k+ 提交），你可以在 config.yml 中配置提交日志限制以减少内存使用。Lazygit 还支持稀疏检出和部分克隆工作流。',
      workflowTitle: '常见工作流',
      workflowP1: '以下三个工作流展示了 Lazygit 在日常开发中的强大功能。',
      workflowFeature: '功能分支工作流',
      workflowHotfix: '热修复工作流',
      workflowRelease: '发布工作流',
      tipsTitle: '高级用户技巧',
      tip1: '在任何面板中按 ? 查看该上下文的所有可用键绑定',
      tip2: '按 + 和 - 展开和折叠侧边面板以获得更多差异空间',
      tip3: '按 x 打开操作菜单，显示当前上下文的所有可能操作',
      tip4: '使用撤销（z）和重做（ctrl+z）回退意外操作，如提交或分支删除',
      tip5: '按 @ 打开命令日志，显示 Lazygit 执行的每个 Git 命令 — 非常适合学习 Git',
      tip6: '通过在项目根目录放置 .lazygit.yml 创建特定于分支的配置',
      tip7: '按 w 打开差异菜单，并排比较任意两个引用',
      tip8: '导航到 Reflog 面板（可从提交面板选项卡访问）以恢复丢失的提交',
      faqTitle: '常见问题',
      faq1Q: 'Lazygit 是免费开源的吗？',
      faq1A: '是的，Lazygit 完全免费，基于 MIT 许可证开源。它托管在 GitHub 的 jesseduffield/lazygit 仓库，接受社区贡献。',
      faq2Q: 'Lazygit 可以通过 SSH 使用吗？',
      faq2A: '可以，因为 Lazygit 是终端应用程序，它可以完美地通过 SSH 连接工作。这使得它非常适合管理远程服务器、容器和虚拟机上的 Git 仓库。',
      faq3Q: '我可以在 Neovim 中使用 Lazygit 吗？',
      faq3A: '可以，kdheepak 的 lazygit.nvim 插件提供无缝的 Neovim 集成。它在浮动终端窗口中打开 Lazygit，并支持在你现有的 Neovim 会话中打开文件。',
      faq4Q: '如何自定义 Lazygit 的键绑定？',
      faq4A: '编辑位于 ~/.config/lazygit/config.yml（Linux/macOS）或 %APPDATA%/lazygit/config.yml（Windows）的 config.yml 文件。keybindings 部分允许你将任何操作重新映射到任何键。',
      faq5Q: 'Lazygit 比 GitKraken 或 Fork 快吗？',
      faq5A: '是的，Lazygit 启动速度极快（低于 100ms），内存使用极少，因为它是没有 GUI 框架的终端应用程序。GitKraken 和 Fork 使用 Electron 或原生框架，消耗明显更多资源。',
      faq6Q: 'Lazygit 支持 Git LFS 吗？',
      faq6A: '是的，Lazygit 与 Git LFS 透明地配合工作。由于它将所有操作委托给 Git CLI，任何 Git 扩展（包括 LFS、Git Crypt 和 Git Annex）都会自动工作。',
      faq7Q: '我可以用 Lazygit 代替命令行进行交互式变基吗？',
      faq7A: '当然可以。交互式变基是 Lazygit 最强大的功能之一。你可以通过单键快捷方式直观地重新排序、压缩、修复、编辑和删除提交，这比在文本编辑器中编辑变基待办文件要容易得多。',
      faq8Q: '如何更新 Lazygit？',
      faq8A: '通过包管理器更新：macOS 上 brew upgrade lazygit，Debian/Ubuntu 上 sudo apt update && sudo apt upgrade lazygit，Windows 上 scoop update lazygit。如果通过 go install 安装，运行 go install github.com/jesseduffield/lazygit@latest。',
    },
  },
};

export default function LazygitGuide({ lang }: { lang: string }) {
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

      {/* What Is Lazygit */}
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
              <th style={thStyle}>Lazygit</th>
              <th style={thStyle}>GitKraken</th>
              <th style={thStyle}>Fork</th>
              <th style={thStyle}>SourceTree</th>
              <th style={thStyle}>tig</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Type</td><td style={tdStyle}>Terminal UI</td><td style={tdStyle}>Desktop GUI</td><td style={tdStyle}>Desktop GUI</td><td style={tdStyle}>Desktop GUI</td><td style={tdStyle}>Terminal UI</td></tr>
            <tr><td style={tdStyle}>Price</td><td style={tdStyle}>Free (MIT)</td><td style={tdStyle}>\$4.95/mo Pro</td><td style={tdStyle}>\$49.99 one-time</td><td style={tdStyle}>Free</td><td style={tdStyle}>Free (GPL)</td></tr>
            <tr><td style={tdStyle}>Platform</td><td style={tdStyle}>macOS/Linux/Windows</td><td style={tdStyle}>macOS/Linux/Windows</td><td style={tdStyle}>macOS/Windows</td><td style={tdStyle}>macOS/Windows</td><td style={tdStyle}>macOS/Linux/Windows</td></tr>
            <tr><td style={tdStyle}>SSH Support</td><td style={tdStyle}>Yes (native)</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes (native)</td></tr>
            <tr><td style={tdStyle}>Interactive Rebase</td><td style={tdStyle}>Excellent (visual)</td><td style={tdStyle}>Good</td><td style={tdStyle}>Good</td><td style={tdStyle}>Basic</td><td style={tdStyle}>None</td></tr>
            <tr><td style={tdStyle}>Line-level Staging</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td><td style={tdStyle}>No</td></tr>
            <tr><td style={tdStyle}>Conflict Resolution</td><td style={tdStyle}>Built-in side-by-side</td><td style={tdStyle}>Built-in 3-way</td><td style={tdStyle}>Built-in 3-way</td><td style={tdStyle}>External tool</td><td style={tdStyle}>None</td></tr>
            <tr><td style={tdStyle}>Startup Time</td><td style={tdStyle}>&lt;100ms</td><td style={tdStyle}>3-5 seconds</td><td style={tdStyle}>1-2 seconds</td><td style={tdStyle}>2-4 seconds</td><td style={tdStyle}>&lt;50ms</td></tr>
            <tr><td style={tdStyle}>Memory Usage</td><td style={tdStyle}>~15MB</td><td style={tdStyle}>~500MB (Electron)</td><td style={tdStyle}>~200MB</td><td style={tdStyle}>~300MB</td><td style={tdStyle}>~5MB</td></tr>
            <tr><td style={tdStyle}>Custom Commands</td><td style={tdStyle}>Yes (config.yml)</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td><td style={tdStyle}>Custom actions</td><td style={tdStyle}>No</td></tr>
            <tr><td style={tdStyle}>Neovim Integration</td><td style={tdStyle}>lazygit.nvim</td><td style={tdStyle}>None</td><td style={tdStyle}>None</td><td style={tdStyle}>None</td><td style={tdStyle}>None</td></tr>
            <tr><td style={tdStyle}>Worktrees</td><td style={tdStyle}>Yes</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td></tr>
          </tbody>
        </table>
      </div>

      {/* Installation */}
      <h2 style={h2Style}>{t.body.installTitle}</h2>
      <p style={pStyle}>{t.body.installDesc}</p>

      <h3 style={h3Style}>macOS (Homebrew)</h3>
      <pre style={codeStyle}><code>{'brew install lazygit\n'
        + '\n'
        + '# Verify installation\n'
        + 'lazygit --version'}</code></pre>

      <h3 style={h3Style}>Ubuntu / Debian (apt)</h3>
      <pre style={codeStyle}><code>{'# Add the PPA repository\n'
        + 'LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po \'\"tag_name\": \"v\\K[^\"]*\')\n'
        + 'curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_\\${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"\n'
        + 'tar xf lazygit.tar.gz lazygit\n'
        + 'sudo install lazygit /usr/local/bin'}</code></pre>

      <h3 style={h3Style}>Windows (Scoop)</h3>
      <pre style={codeStyle}><code>{'scoop install lazygit\n'
        + '\n'
        + '# Or with Chocolatey\n'
        + 'choco install lazygit'}</code></pre>

      <h3 style={h3Style}>Go Install</h3>
      <pre style={codeStyle}><code>{'go install github.com/jesseduffield/lazygit@latest'}</code></pre>

      <h3 style={h3Style}>Docker</h3>
      <pre style={codeStyle}><code>{'# Run lazygit in a Docker container with your repo mounted\n'
        + 'docker run --rm -it \\\n'
        + '  -v /path/to/repo:/repo \\\n'
        + '  -w /repo \\\n'
        + '  lazyteam/lazygit:latest'}</code></pre>

      <h3 style={h3Style}>Arch Linux</h3>
      <pre style={codeStyle}><code>{'pacman -S lazygit'}</code></pre>

      {/* Interface Overview */}
      <h2 style={h2Style}>{t.body.interfaceTitle}</h2>
      <p style={pStyle}>{t.body.interfaceP1}</p>
      <p style={pStyle}>{t.body.interfaceP2}</p>
      <pre style={codeStyle}><code>{'# Launch lazygit in the current repository\n'
        + 'lazygit\n'
        + '\n'
        + '# Panel Layout:\n'
        + '# +------------------+----------------------------------+\n'
        + '# | 1. Status        |                                  |\n'
        + '# +------------------+        Main Panel                |\n'
        + '# | 2. Files         |     (diff / staging view)        |\n'
        + '# +------------------+                                  |\n'
        + '# | 3. Branches      |                                  |\n'
        + '# +------------------+                                  |\n'
        + '# | 4. Commits       |                                  |\n'
        + '# +------------------+                                  |\n'
        + '# | 5. Stash         |                                  |\n'
        + '# +------------------+----------------------------------+'}</code></pre>

      {/* Keyboard Shortcuts */}
      <h2 style={h2Style}>{t.body.shortcutsTitle}</h2>
      <p style={pStyle}>{t.body.shortcutsDesc}</p>

      <h3 style={h3Style}>Global Navigation</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr><th style={thStyle}>Key</th><th style={thStyle}>Action</th></tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Tab / Shift+Tab</td><td style={tdStyle}>Switch between panels</td></tr>
            <tr><td style={tdStyle}>1-5</td><td style={tdStyle}>Jump to specific panel</td></tr>
            <tr><td style={tdStyle}>h / l</td><td style={tdStyle}>Scroll left/right in sub-tabs</td></tr>
            <tr><td style={tdStyle}>j / k</td><td style={tdStyle}>Move up/down in list</td></tr>
            <tr><td style={tdStyle}>?</td><td style={tdStyle}>Show keybindings for current panel</td></tr>
            <tr><td style={tdStyle}>x</td><td style={tdStyle}>Open action menu</td></tr>
            <tr><td style={tdStyle}>/</td><td style={tdStyle}>Filter current list</td></tr>
            <tr><td style={tdStyle}>q</td><td style={tdStyle}>Quit lazygit</td></tr>
            <tr><td style={tdStyle}>@</td><td style={tdStyle}>Open command log</td></tr>
            <tr><td style={tdStyle}>z</td><td style={tdStyle}>Undo last action</td></tr>
            <tr><td style={tdStyle}>Ctrl+z</td><td style={tdStyle}>Redo</td></tr>
            <tr><td style={tdStyle}>+ / -</td><td style={tdStyle}>Expand/collapse side panels</td></tr>
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Files Panel</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr><th style={thStyle}>Key</th><th style={thStyle}>Action</th></tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Space</td><td style={tdStyle}>Stage/unstage file</td></tr>
            <tr><td style={tdStyle}>a</td><td style={tdStyle}>Stage/unstage all files</td></tr>
            <tr><td style={tdStyle}>Enter</td><td style={tdStyle}>Open file in staging view (hunk/line staging)</td></tr>
            <tr><td style={tdStyle}>c</td><td style={tdStyle}>Commit staged changes</td></tr>
            <tr><td style={tdStyle}>A</td><td style={tdStyle}>Amend last commit</td></tr>
            <tr><td style={tdStyle}>s</td><td style={tdStyle}>Stash changes</td></tr>
            <tr><td style={tdStyle}>S</td><td style={tdStyle}>Stash options (staged only, untracked, etc.)</td></tr>
            <tr><td style={tdStyle}>d</td><td style={tdStyle}>Discard changes in file</td></tr>
            <tr><td style={tdStyle}>e</td><td style={tdStyle}>Open file in editor</td></tr>
            <tr><td style={tdStyle}>o</td><td style={tdStyle}>Open file in default application</td></tr>
            <tr><td style={tdStyle}>i</td><td style={tdStyle}>Add to .gitignore</td></tr>
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Branches Panel</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr><th style={thStyle}>Key</th><th style={thStyle}>Action</th></tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Space</td><td style={tdStyle}>Checkout branch</td></tr>
            <tr><td style={tdStyle}>n</td><td style={tdStyle}>Create new branch</td></tr>
            <tr><td style={tdStyle}>d</td><td style={tdStyle}>Delete branch</td></tr>
            <tr><td style={tdStyle}>M</td><td style={tdStyle}>Merge selected into current</td></tr>
            <tr><td style={tdStyle}>r</td><td style={tdStyle}>Rebase current onto selected</td></tr>
            <tr><td style={tdStyle}>R</td><td style={tdStyle}>Rename branch</td></tr>
            <tr><td style={tdStyle}>f</td><td style={tdStyle}>Fetch</td></tr>
            <tr><td style={tdStyle}>w</td><td style={tdStyle}>Create worktree</td></tr>
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Commits Panel</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr><th style={thStyle}>Key</th><th style={thStyle}>Action</th></tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Enter</td><td style={tdStyle}>View commit diff</td></tr>
            <tr><td style={tdStyle}>C</td><td style={tdStyle}>Copy commit (for cherry-pick)</td></tr>
            <tr><td style={tdStyle}>V</td><td style={tdStyle}>Paste (cherry-pick) copied commits</td></tr>
            <tr><td style={tdStyle}>s</td><td style={tdStyle}>Squash commit into parent</td></tr>
            <tr><td style={tdStyle}>f</td><td style={tdStyle}>Fixup commit into parent</td></tr>
            <tr><td style={tdStyle}>d</td><td style={tdStyle}>Drop commit</td></tr>
            <tr><td style={tdStyle}>e</td><td style={tdStyle}>Edit commit (start interactive rebase)</td></tr>
            <tr><td style={tdStyle}>r</td><td style={tdStyle}>Reword commit message</td></tr>
            <tr><td style={tdStyle}>Ctrl+j / Ctrl+k</td><td style={tdStyle}>Move commit up/down (reorder)</td></tr>
            <tr><td style={tdStyle}>g</td><td style={tdStyle}>Reset to this commit</td></tr>
            <tr><td style={tdStyle}>t</td><td style={tdStyle}>Create tag at commit</td></tr>
            <tr><td style={tdStyle}>b</td><td style={tdStyle}>Bisect: mark good/bad</td></tr>
          </tbody>
        </table>
      </div>

      {/* Staging */}
      <h2 style={h2Style}>{t.body.stagingTitle}</h2>
      <p style={pStyle}>{t.body.stagingP1}</p>
      <p style={pStyle}>{t.body.stagingP2}</p>
      <pre style={codeStyle}><code>{'# Staging workflow in lazygit:\n'
        + '#\n'
        + '# 1. Navigate to Files panel (press 2)\n'
        + '# 2. Press Enter on a file to open staging view\n'
        + '# 3. Use arrow keys to navigate between hunks\n'
        + '# 4. Press Space to stage a hunk\n'
        + '# 5. Press v to toggle line-selection mode\n'
        + '# 6. Select specific lines with arrow keys\n'
        + '# 7. Press Space to stage selected lines only\n'
        + '# 8. Press Escape to return to files panel\n'
        + '# 9. Press c to commit staged changes'}</code></pre>

      {/* Committing */}
      <h2 style={h2Style}>{t.body.commitTitle}</h2>
      <p style={pStyle}>{t.body.commitP1}</p>
      <p style={pStyle}>{t.body.commitP2}</p>
      <pre style={codeStyle}><code>{'# Conventional commit examples in lazygit:\n'
        + '# Press c, then type:\n'
        + '#   feat: add user authentication\n'
        + '#   fix: resolve login redirect loop\n'
        + '#   refactor: extract validation logic\n'
        + '#   docs: update API reference\n'
        + '#   chore: upgrade dependencies\n'
        + '#   test: add unit tests for auth module\n'
        + '#   perf: optimize database queries\n'
        + '#   ci: add GitHub Actions workflow\n'
        + '\n'
        + '# Amend last commit: press A in Files panel\n'
        + '# Create fixup commit: press Shift+F on target commit in Commits panel\n'
        + '# Autosquash fixup commits: perform interactive rebase'}</code></pre>

      {/* Branching */}
      <h2 style={h2Style}>{t.body.branchTitle}</h2>
      <p style={pStyle}>{t.body.branchP1}</p>
      <p style={pStyle}>{t.body.branchP2}</p>
      <pre style={codeStyle}><code>{'# Branch operations in lazygit:\n'
        + '#\n'
        + '# Create branch: press n in Branches panel -> type name -> Enter\n'
        + '# Checkout: press Space on branch\n'
        + '# Merge: select branch -> press M -> confirm\n'
        + '# Rebase: select branch -> press r -> confirm\n'
        + '#\n'
        + '# Cherry-pick workflow:\n'
        + '# 1. Go to Commits panel\n'
        + '# 2. Press C on commit(s) to copy\n'
        + '# 3. Switch to target branch (Branches panel -> Space)\n'
        + '# 4. Press V to paste (cherry-pick) the commits'}</code></pre>

      {/* Interactive Rebase */}
      <h2 style={h2Style}>{t.body.rebaseTitle}</h2>
      <p style={pStyle}>{t.body.rebaseP1}</p>
      <p style={pStyle}>{t.body.rebaseP2}</p>
      <pre style={codeStyle}><code>{'# Interactive rebase actions in Commits panel:\n'
        + '#\n'
        + '# e  - edit: pause at this commit to amend\n'
        + '# s  - squash: merge into commit below, combine messages\n'
        + '# f  - fixup: merge into commit below, discard this message\n'
        + '# d  - drop: remove this commit entirely\n'
        + '# r  - reword: change commit message\n'
        + '# Ctrl+j - move commit down (later in history)\n'
        + '# Ctrl+k - move commit up (earlier in history)\n'
        + '#\n'
        + '# Example: squash last 3 commits into one\n'
        + '# 1. Press e on the commit 3 positions below HEAD\n'
        + '# 2. Press s on the 2nd commit\n'
        + '# 3. Press s on the 3rd commit\n'
        + '# 4. Edit the combined message\n'
        + '# 5. The rebase completes automatically'}</code></pre>

      {/* Stashing */}
      <h2 style={h2Style}>{t.body.stashTitle}</h2>
      <p style={pStyle}>{t.body.stashP1}</p>
      <p style={pStyle}>{t.body.stashP2}</p>
      <pre style={codeStyle}><code>{'# Stash operations:\n'
        + '#\n'
        + '# Files panel:\n'
        + '#   s     - stash all changes (prompted for message)\n'
        + '#   S     - stash options menu:\n'
        + '#           - Stash all changes\n'
        + '#           - Stash staged changes only\n'
        + '#           - Stash including untracked files\n'
        + '#           - Stash keeping index\n'
        + '#\n'
        + '# Stash panel:\n'
        + '#   Space - apply stash entry (keep in stash list)\n'
        + '#   g     - pop stash entry (apply and remove)\n'
        + '#   d     - drop stash entry (remove without applying)\n'
        + '#   Enter - preview stash contents before applying'}</code></pre>

      {/* Conflict Resolution */}
      <h2 style={h2Style}>{t.body.conflictTitle}</h2>
      <p style={pStyle}>{t.body.conflictP1}</p>
      <p style={pStyle}>{t.body.conflictP2}</p>
      <pre style={codeStyle}><code>{'# Conflict resolution in lazygit:\n'
        + '#\n'
        + '# 1. Conflicted files appear with red markers in Files panel\n'
        + '# 2. Press Enter on a conflicted file\n'
        + '# 3. The merge view shows both sides:\n'
        + '#    <<<<<<< HEAD (ours / current)\n'
        + '#    const name = "Alice";\n'
        + '#    =======\n'
        + '#    const name = "Bob";\n'
        + '#    >>>>>>> feature-branch (theirs / incoming)\n'
        + '#\n'
        + '# Navigation:\n'
        + '#   Up/Down  - move between conflict blocks\n'
        + '#   Left     - pick incoming (theirs)\n'
        + '#   Right    - pick current (ours)\n'
        + '#   b        - pick both\n'
        + '#   Space    - mark file as resolved after all conflicts handled'}</code></pre>

      {/* Remote Operations */}
      <h2 style={h2Style}>{t.body.remoteTitle}</h2>
      <p style={pStyle}>{t.body.remoteP1}</p>
      <p style={pStyle}>{t.body.remoteP2}</p>
      <pre style={codeStyle}><code>{'# Remote operations:\n'
        + '#\n'
        + '# P (uppercase) - Push to remote\n'
        + '# p (lowercase) - Pull from remote\n'
        + '# f             - Fetch all remotes\n'
        + '#\n'
        + '# If push is rejected (non-fast-forward):\n'
        + '#   Lazygit prompts: "Push rejected. Force push with lease?"\n'
        + '#   This runs: git push --force-with-lease\n'
        + '#   Safe because it checks remote hasn\'t been updated\n'
        + '#\n'
        + '# Managing remotes:\n'
        + '#   Navigate to Remotes sub-tab in Branches panel\n'
        + '#   n - add new remote\n'
        + '#   d - remove remote\n'
        + '#   e - edit remote URL'}</code></pre>

      {/* Worktrees and Submodules */}
      <h2 style={h2Style}>{t.body.worktreeTitle}</h2>
      <p style={pStyle}>{t.body.worktreeP1}</p>
      <p style={pStyle}>{t.body.worktreeP2}</p>
      <pre style={codeStyle}><code>{'# Worktrees in lazygit:\n'
        + '#\n'
        + '# In Branches panel:\n'
        + '#   w  - create new worktree for selected branch\n'
        + '#        Lazygit opens a new instance in the worktree directory\n'
        + '#\n'
        + '# Equivalent git commands:\n'
        + '# git worktree add ../my-feature-worktree feature-branch\n'
        + '# git worktree list\n'
        + '# git worktree remove ../my-feature-worktree\n'
        + '#\n'
        + '# Submodules:\n'
        + '#   Automatically detected in Files panel\n'
        + '#   Press Enter on a submodule -> opens new lazygit instance\n'
        + '#   Full Git operations available within the submodule'}</code></pre>

      {/* Custom Commands */}
      <h2 style={h2Style}>{t.body.customTitle}</h2>
      <p style={pStyle}>{t.body.customP1}</p>
      <p style={pStyle}>{t.body.customP2}</p>
      <pre style={codeStyle}><code>{'# ~/.config/lazygit/config.yml\n'
        + '\n'
        + 'customCommands:\n'
        + '  # Run tests for current project\n'
        + '  - key: "T"\n'
        + '    command: "npm test"\n'
        + '    context: "global"\n'
        + '    subprocess: true\n'
        + '\n'
        + '  # Deploy current branch\n'
        + '  - key: "D"\n'
        + '    command: "git push origin \\${BranchName}:deploy"\n'
        + '    context: "localBranches"\n'
        + '    loadingText: "Deploying..."\n'
        + '    description: "Deploy branch"\n'
        + '\n'
        + '  # Create conventional commit with scope prompt\n'
        + '  - key: "<c-c>"\n'
        + '    command: >-\n'
        + '      git commit -m "{{.Form.Type}}({{.Form.Scope}}): {{.Form.Message}}"\n'
        + '    context: "files"\n'
        + '    prompts:\n'
        + '      - type: "menu"\n'
        + '        key: "Type"\n'
        + '        title: "Commit type"\n'
        + '        options:\n'
        + '          - name: "feat"\n'
        + '            value: "feat"\n'
        + '          - name: "fix"\n'
        + '            value: "fix"\n'
        + '          - name: "refactor"\n'
        + '            value: "refactor"\n'
        + '          - name: "chore"\n'
        + '            value: "chore"\n'
        + '      - type: "input"\n'
        + '        key: "Scope"\n'
        + '        title: "Scope (optional)"\n'
        + '      - type: "input"\n'
        + '        key: "Message"\n'
        + '        title: "Commit message"\n'
        + '\n'
        + '  # Open PR for current branch on GitHub\n'
        + '  - key: "O"\n'
        + '    command: "gh pr create --web"\n'
        + '    context: "localBranches"\n'
        + '    description: "Open PR on GitHub"\n'
        + '    subprocess: true\n'
        + '\n'
        + '  # Show commit in browser\n'
        + '  - key: "B"\n'
        + '    command: "gh browse \\${CommitSha}"\n'
        + '    context: "commits"\n'
        + '    description: "Browse commit on GitHub"'}</code></pre>

      <h3 style={h3Style}>Keybinding Customization</h3>
      <pre style={codeStyle}><code>{'# ~/.config/lazygit/config.yml\n'
        + '\n'
        + 'keybinding:\n'
        + '  universal:\n'
        + '    quit: "Q"            # Change quit key\n'
        + '    togglePanel: "<tab>" # Default\n'
        + '    prevItem: "k"\n'
        + '    nextItem: "j"\n'
        + '    scrollUpMain: "<pgup>"\n'
        + '    scrollDownMain: "<pgdown>"\n'
        + '  files:\n'
        + '    commitChanges: "c"\n'
        + '    amendLastCommit: "A"\n'
        + '    stashChanges: "s"\n'
        + '  branches:\n'
        + '    createNewBranch: "n"\n'
        + '    checkoutByName: "N"\n'
        + '  commits:\n'
        + '    squashDown: "s"\n'
        + '    fixupCommit: "f"\n'
        + '    moveDownCommit: "<c-j>"\n'
        + '    moveUpCommit: "<c-k>"'}</code></pre>

      {/* Editor Integration */}
      <h2 style={h2Style}>{t.body.editorTitle}</h2>
      <p style={pStyle}>{t.body.editorP1}</p>
      <p style={pStyle}>{t.body.editorP2}</p>

      <h3 style={h3Style}>Neovim Setup (lazygit.nvim)</h3>
      <pre style={codeStyle}><code>{'-- lazy.nvim plugin spec\n'
        + '{\n'
        + '  "kdheepak/lazygit.nvim",\n'
        + '  cmd = {\n'
        + '    "LazyGit",\n'
        + '    "LazyGitConfig",\n'
        + '    "LazyGitCurrentFile",\n'
        + '    "LazyGitFilter",\n'
        + '    "LazyGitFilterCurrentFile",\n'
        + '  },\n'
        + '  dependencies = {\n'
        + '    "nvim-lua/plenary.nvim",\n'
        + '  },\n'
        + '  keys = {\n'
        + '    { "<leader>gg", "<cmd>LazyGit<cr>", desc = "Open LazyGit" },\n'
        + '    { "<leader>gf", "<cmd>LazyGitFilter<cr>", desc = "LazyGit filter" },\n'
        + '  },\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>VS Code Integration</h3>
      <pre style={codeStyle}><code>{'// .vscode/tasks.json — add a task to launch lazygit\n'
        + '{ "version": "2.0.0", "tasks": [{\n'
        + '  "label": "Open Lazygit", "type": "shell", "command": "lazygit",\n'
        + '  "presentation": { "reveal": "always", "panel": "dedicated", "focus": true },\n'
        + '  "problemMatcher": []\n'
        + '}]}\n'
        + '\n'
        + '// keybindings.json — bind to Ctrl+Shift+G\n'
        + '{ "key": "ctrl+shift+g", "command": "workbench.action.tasks.runTask",\n'
        + '  "args": "Open Lazygit" }'}</code></pre>

      {/* Filtering, Searching, Bisect */}
      <h2 style={h2Style}>{t.body.filterTitle}</h2>
      <p style={pStyle}>{t.body.filterP1}</p>
      <p style={pStyle}>{t.body.filterP2}</p>
      <pre style={codeStyle}><code>{'# Bisect workflow in lazygit:\n'
        + '#\n'
        + '# 1. Navigate to Commits panel (press 4)\n'
        + '# 2. Press b to start bisect\n'
        + '# 3. Mark the current commit as bad: b\n'
        + '# 4. Navigate to a known good commit: g\n'
        + '# 5. Lazygit checks out the midpoint automatically\n'
        + '# 6. Test your code, then mark as good (g) or bad (b)\n'
        + '# 7. Repeat until the culprit commit is found\n'
        + '# 8. Lazygit highlights the first bad commit\n'
        + '#\n'
        + '# Equivalent git commands:\n'
        + '# git bisect start\n'
        + '# git bisect bad HEAD\n'
        + '# git bisect good v1.0.0\n'
        + '# git bisect reset'}</code></pre>

      {/* Patch Management */}
      <h2 style={h2Style}>{t.body.patchTitle}</h2>
      <p style={pStyle}>{t.body.patchP1}</p>
      <pre style={codeStyle}><code>{'# Patch building workflow:\n'
        + '#\n'
        + '# 1. Go to Commits panel -> Enter on a commit\n'
        + '# 2. Select specific files/hunks with Space\n'
        + '#    (adds them to the custom patch)\n'
        + '# 3. Press Ctrl+P to open patch options:\n'
        + '#    - Apply patch to index\n'
        + '#    - Apply patch in reverse\n'
        + '#    - Create new commit from patch\n'
        + '#    - Copy patch to clipboard\n'
        + '#    - Flatten patch into current index\n'
        + '#\n'
        + '# This is extremely useful for:\n'
        + '# - Extracting specific changes from a large commit\n'
        + '# - Moving changes between branches without cherry-pick\n'
        + '# - Creating partial reverts'}</code></pre>

      {/* Themes */}
      <h2 style={h2Style}>{t.body.themeTitle}</h2>
      <p style={pStyle}>{t.body.themeP1}</p>
      <pre style={codeStyle}><code>{'# ~/.config/lazygit/config.yml\n'
        + '\n'
        + '# Catppuccin Mocha theme\n'
        + 'gui:\n'
        + '  nerdFontsVersion: "3"\n'
        + '  theme:\n'
        + '    activeBorderColor:\n'
        + '      - "#a6e3a1"  # green\n'
        + '      - bold\n'
        + '    inactiveBorderColor:\n'
        + '      - "#585b70"  # surface2\n'
        + '    optionsTextColor:\n'
        + '      - "#89b4fa"  # blue\n'
        + '    selectedLineBgColor:\n'
        + '      - "#313244"  # surface0\n'
        + '    cherryPickedCommitBgColor:\n'
        + '      - "#45475a"  # surface1\n'
        + '    cherryPickedCommitFgColor:\n'
        + '      - "#a6e3a1"  # green\n'
        + '    unstagedChangesColor:\n'
        + '      - "#f38ba8"  # red\n'
        + '    defaultFgColor:\n'
        + '      - "#cdd6f4"  # text\n'
        + '    searchingActiveBorderColor:\n'
        + '      - "#f9e2af"  # yellow\n'
        + '\n'
        + '# Other popular themes: Dracula, Gruvbox, Tokyo Night, Nord\n'
        + '# See: https://github.com/jesseduffield/lazygit/wiki/Custom-Themes'}</code></pre>

      <h3 style={h3Style}>Additional Configuration</h3>
      <pre style={codeStyle}><code>{'# ~/.config/lazygit/config.yml\n'
        + '\n'
        + 'gui:\n'
        + '  showFileTree: true          # Show files as tree instead of flat list\n'
        + '  showRandomTip: false        # Disable startup tips\n'
        + '  showCommandLog: false       # Hide command log by default\n'
        + '  showBottomLine: true        # Show keybinding hints at bottom\n'
        + '  sidePanelWidth: 0.3333      # Side panel takes 1/3 of width\n'
        + '  expandFocusedSidePanel: true # Auto-expand focused panel\n'
        + '  mainPanelSplitMode: "flexible" # flexible, horizontal, vertical\n'
        + '  language: "auto"            # auto, en, zh, ja, ko, etc.\n'
        + '  timeFormat: "02 Jan 06"     # Go time format for dates\n'
        + '  shortTimeFormat: "3:04PM"\n'
        + '\n'
        + 'git:\n'
        + '  paging:\n'
        + '    colorArg: always\n'
        + '    pager: delta --dark --paging=never  # Use delta for diffs\n'
        + '  commit:\n'
        + '    signOff: false\n'
        + '    autoWrapCommitMessage: true\n'
        + '    autoWrapWidth: 72\n'
        + '  merging:\n'
        + '    manualCommit: false\n'
        + '    args: ""                  # Extra args for git merge\n'
        + '  log:\n'
        + '    order: "topo-order"       # topo-order, date-order, author-date-order\n'
        + '    showGraph: "when-maximised" # always, never, when-maximised\n'
        + '  autoFetch: true             # Automatically fetch in background\n'
        + '  autoRefresh: true           # Refresh UI after Git operations'}</code></pre>

      {/* Performance */}
      <h2 style={h2Style}>{t.body.perfTitle}</h2>
      <p style={pStyle}>{t.body.perfP1}</p>
      <pre style={codeStyle}><code>{'# Performance tuning for large repos in config.yml\n'
        + '\n'
        + 'git:\n'
        + '  log:\n'
        + '    showGraph: "never"         # Disable graph for faster loading\n'
        + '  autoFetch: false             # Disable auto-fetch on large repos\n'
        + '  autoRefresh: false           # Disable auto-refresh\n'
        + '\n'
        + 'gui:\n'
        + '  showFileTree: false          # Flat list is faster than tree view\n'
        + '\n'
        + '# For repos with 100k+ commits:\n'
        + '# - Use git log --max-count to limit commit history\n'
        + '# - Consider git sparse-checkout for monorepos\n'
        + '# - Use git clone --filter=blob:none for partial clones'}</code></pre>

      {/* Common Workflows */}
      <h2 style={h2Style}>{t.body.workflowTitle}</h2>
      <p style={pStyle}>{t.body.workflowP1}</p>

      <h3 style={h3Style}>{t.body.workflowFeature}</h3>
      <pre style={codeStyle}><code>{'# Feature Branch Workflow in lazygit:\n'
        + '#\n'
        + '# 1. Create branch:    Branches panel -> n -> "feature/auth"\n'
        + '# 2. Make changes:     edit files in your editor\n'
        + '# 3. Stage changes:    Files panel -> Enter -> Space (per hunk)\n'
        + '# 4. Commit:           c -> "feat: add JWT authentication"\n'
        + '# 5. Continue work:    repeat steps 2-4\n'
        + '# 6. Rebase on main:   Branches panel -> select main -> r\n'
        + '# 7. Squash commits:   Commits panel -> s on each commit to squash\n'
        + '# 8. Push:             P (force push after rebase)\n'
        + '# 9. Create PR:        Custom command -> gh pr create --web'}</code></pre>

      <h3 style={h3Style}>{t.body.workflowHotfix}</h3>
      <pre style={codeStyle}><code>{'# Hotfix Workflow in lazygit:\n'
        + '#\n'
        + '# 1. Stash current work:  Files panel -> s -> "WIP: feature work"\n'
        + '# 2. Checkout main:       Branches panel -> Space on main\n'
        + '# 3. Create hotfix:       n -> "hotfix/critical-fix"\n'
        + '# 4. Fix the bug:         edit files\n'
        + '# 5. Stage and commit:    Space -> c -> "fix: critical null check"\n'
        + '# 6. Push:                P\n'
        + '# 7. Checkout feature:    Branches panel -> Space on feature branch\n'
        + '# 8. Pop stash:           Stash panel -> g (pop)\n'
        + '# 9. Rebase on main:      Branches panel -> select main -> r'}</code></pre>

      <h3 style={h3Style}>{t.body.workflowRelease}</h3>
      <pre style={codeStyle}><code>{'# Release Workflow in lazygit:\n'
        + '#\n'
        + '# 1. Checkout main:        Branches panel -> Space on main\n'
        + '# 2. Pull latest:          p\n'
        + '# 3. Create release:       n -> "release/v2.1.0"\n'
        + '# 4. Bump version:         edit package.json / version file\n'
        + '# 5. Commit:               c -> "chore: bump version to 2.1.0"\n'
        + '# 6. Tag:                  Commits panel -> t -> "v2.1.0"\n'
        + '# 7. Merge to main:        Branches panel -> select main -> M\n'
        + '# 8. Push with tags:       P (push), then push tags separately\n'
        + '#\n'
        + '# Push tags via custom command:\n'
        + '# customCommands:\n'
        + '#   - key: "T"\n'
        + '#     command: "git push --tags"\n'
        + '#     context: "global"'}</code></pre>

      {/* Tips and Tricks */}
      <h2 style={h2Style}>{t.body.tipsTitle}</h2>
      <ul style={ulStyle}>
        {[t.body.tip1, t.body.tip2, t.body.tip3, t.body.tip4, t.body.tip5, t.body.tip6, t.body.tip7, t.body.tip8].map((tip, i) => (
          <li key={i} style={liStyle}>{tip}</li>
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
