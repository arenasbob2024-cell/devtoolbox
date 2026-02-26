'use client';

import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    tldr: 'A text diff tool finds the exact differences between two versions of a file or string. This guide covers the three major diff algorithms (Myers, Patience, Histogram), how to read <code>git diff</code> output, terminal tools like <code>diff</code>, <code>colordiff</code>, and <code>delta</code>, programmatic diffing in JavaScript (<code>jsdiff</code>) and Python (<code>difflib</code>), semantic vs line-based diffing, three-way merge and conflict resolution, using diffs in CI/CD for regression detection, and best practices for keeping diffs readable.',
    keyTitle: 'Key Takeaways',
    key1: 'The Myers algorithm (used by Git) finds the shortest edit script in O(n*d) time, making it ideal for most diff scenarios.',
    key2: 'Patience diff and Histogram diff produce more human-readable output by aligning on unique lines and reducing noisy hunks.',
    key3: 'Unified diff format (lines prefixed with <code>+</code>, <code>-</code>, and <code>@@</code> hunk headers) is the standard across Git, patch files, and code review tools.',
    key4: 'Terminal-based viewers like <code>delta</code> and <code>colordiff</code> dramatically improve the readability of command-line diff output.',
    key5: 'Three-way merge compares two branches against a common ancestor; understanding its mechanics is essential for resolving Git conflicts correctly.',
    key6: 'Integrating diff-based checks into CI/CD pipelines catches unintended changes to API contracts, configuration files, and snapshots automatically.',
    linkTool: 'Try our free Text Diff Checker tool to compare two texts instantly.',
    h2_what: 'What Is a Diff and Why It Matters',
    whatP1: 'A <strong>diff</strong> (short for "difference") is the output of comparing two texts or files and identifying what changed between them. Every line is classified as added, removed, or unchanged. The concept was born on Unix in 1974 with the <code>diff</code> command, and it now underpins every version control system, code review platform, and deployment pipeline in modern software engineering.',
    whatP2: 'Diffs matter because they answer the most fundamental question in collaborative development: <strong>"What changed?"</strong> During a code review, the diff is the artifact reviewers examine. During debugging, the diff between a working commit and a broken one isolates the root cause. During deployment, the diff between the current and previous release defines the blast radius of a change.',
    whatP3: 'Beyond code, diffs are used to compare configuration files before and after changes, track edits in legal documents and contracts, detect unauthorized modifications to critical system files, and verify that data migrations transformed records correctly. Any workflow that involves versions benefits from diffing.',
    h2_algorithms: 'Diff Algorithms: Myers, Patience, and Histogram',
    algoIntro: 'Not all diffs are computed the same way. The choice of algorithm affects both the speed of computation and the readability of the resulting output. Here are the three most important algorithms you should know:',
    algoMyersTitle: 'Myers Diff Algorithm',
    algoMyersP1: 'Published by Eugene Myers in 1986, this is the default algorithm in Git. It models the diff problem as finding the shortest path through an edit graph where horizontal edges represent deletions, vertical edges represent insertions, and diagonal edges represent matches. The algorithm runs in O(n*d) time, where n is the size of the input and d is the number of differences. Because most real-world diffs have far fewer changes than total lines, this is extremely fast in practice.',
    algoMyersP2: 'Myers diff finds the <strong>shortest edit script</strong> (SES), meaning it produces the minimum number of additions and deletions to transform text A into text B. This is mathematically optimal but sometimes produces output that is hard for humans to read, especially when code has been moved or refactored rather than simply edited in place.',
    algoPatienceTitle: 'Patience Diff Algorithm',
    algoPatienceP1: 'Patience diff (invented by Bram Cohen) takes a different approach. It first identifies lines that appear exactly once in both files -- these "unique common lines" serve as reliable anchors. It then uses the Longest Increasing Subsequence (LIS) of these anchors to establish the alignment, and recurses into the gaps between anchors using a standard LCS algorithm.',
    algoPatienceP2: 'The result is output that tends to align on function signatures, class declarations, and other structural markers rather than on accidental matches like blank lines or closing braces. You can enable it in Git with <code>git diff --diff-algorithm=patience</code> or by setting <code>diff.algorithm = patience</code> in your <code>.gitconfig</code>.',
    algoHistogramTitle: 'Histogram Diff Algorithm',
    algoHistogramP1: 'Histogram diff is an optimization of Patience diff that was developed for the JGit project (the Java implementation of Git). It builds a histogram of line occurrences to identify low-frequency lines as anchors, then applies the same recursive strategy as Patience diff. It generally produces results of similar quality to Patience diff but can be faster on certain inputs.',
    algoHistogramP2: 'Enable it in Git with <code>git diff --diff-algorithm=histogram</code>. Many developers who find the default Myers output confusing on heavily refactored files switch to either Patience or Histogram as their default algorithm.',
    algoCompareTitle: 'Algorithm Comparison',
    h2_gitdiff: 'git diff Explained: Unified Format and Side-by-Side',
    gitdiffIntro: 'The <code>git diff</code> command is the tool developers interact with most frequently for comparing file versions. Understanding its output format is a core developer skill.',
    gitdiffUnifiedTitle: 'Unified Diff Format',
    gitdiffUnifiedP1: 'By default, <code>git diff</code> outputs in <strong>unified diff format</strong>. Here is what each part means:',
    gitdiffHeader: '<strong>File headers</strong>: <code>--- a/src/app.js</code> identifies the original file and <code>+++ b/src/app.js</code> identifies the modified file. The <code>a/</code> and <code>b/</code> prefixes are virtual path markers.',
    gitdiffHunk: '<strong>Hunk headers</strong>: A line like <code>@@ -15,7 +15,9 @@ function processData()</code> means the hunk starts at line 15 in the original (showing 7 lines) and at line 15 in the modified version (showing 9 lines). The text after the second <code>@@</code> is the nearest function or scope name, added by Git for context.',
    gitdiffLines: '<strong>Changed lines</strong>: Lines beginning with <code>-</code> were removed, lines beginning with <code>+</code> were added, and lines with no prefix are unchanged context lines (3 by default, adjustable with <code>-U&lt;n&gt;</code>).',
    gitdiffCommandsTitle: 'Essential git diff Commands',
    gitdiffSideBySideTitle: 'Side-by-Side View',
    gitdiffSideBySideP1: 'Git does not natively produce side-by-side output, but several tools provide this view. The <code>delta</code> pager (discussed below) renders side-by-side diffs in the terminal with syntax highlighting. GitHub and GitLab present side-by-side diffs in their pull request interfaces. You can also use <code>diff --side-by-side</code> (or <code>diff -y</code>) from the GNU coreutils <code>diff</code> command for a basic two-column layout.',
    h2_terminal: 'Comparing Files in the Terminal: diff, colordiff, delta',
    termIntro: 'While <code>git diff</code> covers version-controlled files, you often need to compare arbitrary files. Here are the essential terminal tools:',
    termDiffTitle: 'The Classic diff Command',
    termDiffP1: 'Available on every Unix-like system, <code>diff</code> is the original file comparison tool. Key flags include <code>-u</code> (unified output), <code>-r</code> (recursive directory comparison), <code>-q</code> (report only whether files differ), <code>-w</code> (ignore whitespace), and <code>-y</code> (side-by-side output). It is the tool that CI/CD scripts and Makefiles typically invoke for automated comparisons.',
    termColordiffTitle: 'colordiff: Color-Enhanced diff',
    termColordiffP1: 'The <code>colordiff</code> wrapper adds ANSI color codes to the output of <code>diff</code>, making additions, deletions, and context immediately distinguishable. Install it via your package manager (<code>apt install colordiff</code>, <code>brew install colordiff</code>) and use it as a drop-in replacement: <code>colordiff -u file1.txt file2.txt</code>. You can also pipe standard diff output through it: <code>diff -u a.txt b.txt | colordiff</code>.',
    termDeltaTitle: 'delta: A Modern Diff Viewer',
    termDeltaP1: 'The <code>delta</code> pager (git-delta) transforms diff output into a richly formatted display with syntax highlighting, line numbers, side-by-side mode, and navigation. It integrates as a Git pager by adding a few lines to your <code>.gitconfig</code>. Once configured, every <code>git diff</code>, <code>git log -p</code>, and <code>git show</code> command automatically renders through delta.',
    h2_jsdiff: 'Diff in JavaScript: The jsdiff Library',
    jsdiffIntro: 'The <code>diff</code> npm package (commonly called <strong>jsdiff</strong>) is the standard library for computing text differences in JavaScript and TypeScript. It powers many web-based diff viewers and is used in testing frameworks for snapshot comparison.',
    jsdiffFunctionsTitle: 'Core Diffing Functions',
    jsdiffFunctionsP1: 'jsdiff provides several granularity levels: <code>Diff.diffChars()</code> compares character by character, <code>Diff.diffWords()</code> splits on word boundaries, <code>Diff.diffLines()</code> compares line by line, and <code>Diff.diffSentences()</code> operates at sentence level. Each function returns an array of change objects with <code>value</code>, <code>added</code>, and <code>removed</code> properties.',
    jsdiffPatchTitle: 'Creating and Applying Patches',
    jsdiffPatchP1: '<code>Diff.createPatch()</code> generates a unified diff string that can be saved as a <code>.patch</code> file. <code>Diff.applyPatch()</code> takes the original text and a patch string and produces the modified text. This is useful for implementing undo/redo functionality or for transmitting changes efficiently over a network.',
    h2_python: 'Diff in Python: The difflib Module',
    pythonIntro: 'Python ships with <code>difflib</code> in its standard library, providing everything from unified diffs to HTML visual comparison reports. No external packages are needed.',
    pythonUnifiedTitle: 'Generating Unified Diffs',
    pythonUnifiedP1: '<code>difflib.unified_diff()</code> takes two sequences of strings (typically lines from <code>splitlines()</code>) and returns an iterator of diff lines in unified format. Pass <code>fromfile</code> and <code>tofile</code> for file headers, and <code>lineterm=""</code> to avoid double newlines when printing.',
    pythonHtmlTitle: 'HTML Visual Diff',
    pythonHtmlP1: '<code>difflib.HtmlDiff()</code> generates a complete HTML page with a side-by-side table highlighting differences. This is invaluable for generating diff reports in automated testing or documentation pipelines.',
    pythonSequenceTitle: 'SequenceMatcher for Similarity',
    pythonSequenceP1: '<code>difflib.SequenceMatcher</code> provides a <code>ratio()</code> method that returns a float between 0 and 1 representing the similarity of two sequences. This is useful for fuzzy matching, plagiarism detection, and finding the closest match in a list of strings.',
    h2_semantic: 'Semantic Diff vs Line-Based Diff',
    semanticP1: 'Traditional diff tools operate on lines of text without understanding the content. A <strong>line-based diff</strong> treats every line as an atomic unit: if a single character changes on a line, the entire line is marked as modified. This works well for most code but can produce misleading output when formatting changes occur (like re-indenting a block or reflowing a paragraph).',
    semanticP2: 'A <strong>semantic diff</strong> (also called structural diff or AST diff) parses the content into a tree structure (such as an Abstract Syntax Tree for code) and compares the trees rather than the raw text. This means it can distinguish between a meaningful code change and a pure formatting change, detect moved functions or methods even when they change position in the file, and produce diffs that align with the logical structure of the language.',
    semanticP3: 'Tools like <code>difftastic</code>, <code>GumTree</code>, and <code>Semantic Diff</code> for VS Code implement this approach. While they are more computationally expensive than line-based diff, they are increasingly popular for code review workflows where understanding intent matters more than seeing raw text changes.',
    semanticP4: 'For web-based scenarios, Google\'s <code>diff-match-patch</code> library offers a character-level diff with semantic cleanup heuristics that group changes into human-meaningful units, even without full AST parsing.',
    h2_threeway: 'Three-Way Merge and Conflict Resolution',
    threewayP1: 'A <strong>three-way merge</strong> occurs when Git (or any VCS) needs to combine changes from two branches that diverged from a common ancestor. Instead of comparing just two files, it considers three versions: the <strong>base</strong> (common ancestor), <strong>ours</strong> (current branch), and <strong>theirs</strong> (incoming branch).',
    threewayP2: 'The merge algorithm works by computing two diffs: base-to-ours and base-to-theirs. If a particular region changed in only one of the two diffs, that change is accepted automatically. If both diffs modify the same region in the same way, the change is also accepted (convergent edits). A <strong>conflict</strong> occurs only when both diffs modify the same region in different ways.',
    threewayP3: 'When a conflict occurs, Git writes conflict markers into the file:',
    threewayP4: 'The developer must then manually choose which version to keep, combine them, or write entirely new code. Merge tools like VS Code, IntelliJ, and <code>vimdiff</code> present three-way diffs visually, with the base version in the center and the two branch versions on either side.',
    threewayP5: 'Git also supports the <code>diff3</code> conflict style (<code>git config merge.conflictstyle diff3</code>) which includes the base version between the markers, making it much easier to understand what the original code looked like before either branch changed it.',
    h2_cicd: 'Diff in CI/CD: Automated Regression Detection',
    cicdP1: 'Diffs are not just for human review -- they are powerful tools for automated quality gates in CI/CD pipelines. Here are common patterns:',
    cicdSnapshot: '<strong>Snapshot Testing</strong>: Frameworks like Jest (JavaScript) and pytest (Python) serialize outputs and compare them against stored snapshots. When the diff is non-empty, the test fails, forcing the developer to either fix the regression or explicitly approve the new snapshot.',
    cicdApi: '<strong>API Contract Checks</strong>: Tools like <code>openapi-diff</code> compare OpenAPI/Swagger specs between the current branch and the base branch. Breaking changes (removed endpoints, changed types) fail the CI build, preventing accidental API breakages.',
    cicdConfig: '<strong>Configuration Drift Detection</strong>: Infrastructure-as-Code tools like Terraform produce a "plan" that is essentially a diff of the desired state vs the current state. The CI pipeline can block applies that contain unexpected changes.',
    cicdBinary: '<strong>Binary Artifact Diffing</strong>: Tools like <code>diffoscope</code> can compare compiled binaries, Docker images, and archives to detect unintended changes in build outputs, such as undeterministic timestamps or embedded secrets.',
    cicdSize: '<strong>Bundle Size Monitoring</strong>: Build pipelines can diff the size of JavaScript bundles or Docker images between commits and flag regressions that exceed a threshold.',
    h2_bestpractices: 'Best Practices for Readable Diffs',
    bpIntro: 'The quality of a diff is not just about the algorithm -- it is heavily influenced by how code is written and committed. Here are practices that produce clean, reviewable diffs:',
    bp1: '<strong>Make atomic commits</strong>: Each commit should contain a single logical change. Mixing a refactoring with a feature addition creates a noisy diff that is difficult to review. If you need to refactor before adding a feature, commit the refactoring separately.',
    bp2: '<strong>Use consistent formatting</strong>: Enforce a formatter (Prettier, Black, gofmt) across the project. When everyone uses the same formatting rules, diffs never contain pure formatting noise. Run the formatter as a pre-commit hook so it is automatic.',
    bp3: '<strong>Avoid unnecessary whitespace changes</strong>: Changing indentation style or adding trailing newlines across many files creates massive diffs that obscure real changes. If a whitespace change is needed, do it in a dedicated commit.',
    bp4: '<strong>Prefer appending to rewriting</strong>: When adding entries to a list, configuration file, or array, add new entries at the end rather than inserting in the middle. This minimizes the context that changes in the diff and avoids merge conflicts with other branches modifying the same list.',
    bp5: '<strong>Add trailing commas in arrays and objects</strong>: In languages that support trailing commas (JavaScript, TypeScript, Python, Rust), always include them. This way, adding a new item to a list only produces a one-line diff instead of a two-line diff that modifies the previous last line.',
    bp6: '<strong>Write descriptive commit messages</strong>: While not part of the diff itself, a good commit message helps reviewers understand the intent of a diff before they read it. This context makes the review process faster and more accurate.',
    bp7: '<strong>Split large PRs into stacked diffs</strong>: A 2000-line diff is overwhelming to review. Break large changes into a series of smaller, sequentially dependent pull requests. Each PR is easier to understand and review, and the overall change is less likely to introduce bugs.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the best diff algorithm for code review?',
    faq1_a: 'For most code review scenarios, the Patience diff algorithm produces the most human-readable output because it aligns on unique structural lines like function signatures and class declarations. You can set it as your Git default with git config --global diff.algorithm patience. The default Myers algorithm is faster and produces mathematically minimal diffs, but its output can be confusing when code has been moved or refactored. Histogram diff is a good middle ground: it is faster than Patience on large files while producing similarly readable results.',
    faq2_q: 'How do I compare two text files online without installing anything?',
    faq2_a: 'Paste the contents of both files into an online diff checker tool like our free Text Diff Checker. The tool highlights added lines in green, removed lines in red, and unchanged context lines in their default color. All processing happens in your browser, so your data never leaves your device. For large files or frequent comparisons, you may prefer a local tool like VS Code (which has a built-in diff editor) or the command-line diff command.',
    faq3_q: 'What is the difference between a two-way diff and a three-way merge?',
    faq3_a: 'A two-way diff compares two files directly and shows what changed between them. A three-way merge compares two files against their common ancestor (the base version). This extra context allows the merge tool to automatically resolve non-overlapping changes. Three-way merge is what Git uses when combining branches. A conflict only occurs when both branches modify the same region of the base differently.',
    faq4_q: 'How do I make git diff output more readable?',
    faq4_a: 'Install the delta pager and set it as your Git pager in .gitconfig. Delta adds syntax highlighting, line numbers, and side-by-side mode to all Git diff output. You can also use git diff --word-diff to see changes at word granularity instead of line granularity, which is especially useful for documentation changes. Another option is git diff --color-words, which highlights changed words inline without markers.',
    faq5_q: 'Can I use diff tools in CI/CD pipelines?',
    faq5_a: 'Yes, diffs are widely used in CI/CD for regression detection. Common patterns include snapshot testing (Jest, pytest), API contract checking with tools like openapi-diff, configuration drift detection with Terraform plan, and bundle size monitoring. The diff command itself can be used in shell scripts with its exit code: it returns 0 if files are identical and 1 if they differ, making it easy to fail a pipeline step on unexpected changes.',
    faq6_q: 'What is a semantic diff and when should I use one?',
    faq6_a: 'A semantic diff (or structural diff) parses code into an Abstract Syntax Tree and compares the trees rather than raw text lines. This means it can distinguish real logic changes from formatting changes, and it can detect code that has been moved within a file. Tools like difftastic and GumTree implement semantic diffing. Use a semantic diff when reviewing large refactors, when your team has inconsistent formatting, or when you need to understand the intent of changes rather than just the text-level differences.',
    faq7_q: 'How does the Patience diff algorithm differ from Myers?',
    faq7_a: 'The Myers algorithm finds the mathematically shortest edit script by exploring an edit graph greedily. It is fast (O(n*d) time) but can produce counterintuitive output when code has been rearranged. Patience diff first identifies lines that are unique in both files and uses them as stable anchors, then fills in the gaps recursively. This tends to produce diffs that align with the logical structure of the code (e.g., matching function headers with function headers) rather than on accidental matches like blank lines or braces.',
    conclusion: 'Understanding diff tools and algorithms is essential for effective code review, debugging, and deployment workflows. From choosing the right algorithm (Myers for speed, Patience for readability) to integrating automated diff checks into CI/CD, the ability to quickly and accurately identify changes between file versions is a core engineering skill. For quick comparisons without any setup, use our online tool. For deep integration into your daily workflow, configure <code>delta</code> as your Git pager and consider switching to Patience or Histogram diff as your default algorithm.',
    linkToolBottom: 'Compare two texts instantly with our free online Text Diff Checker tool.',
  },
  zh: {
    tldr: '文本 diff 工具可以精确找出两个版本的文件或字符串之间的差异。本指南涵盖三种主要 diff 算法（Myers、Patience、Histogram）、如何阅读 <code>git diff</code> 输出、终端工具如 <code>diff</code>、<code>colordiff</code> 和 <code>delta</code>、JavaScript（<code>jsdiff</code>）和 Python（<code>difflib</code>）中的编程化 diff、语义 diff 与行级 diff 的区别、三方合并与冲突解决、在 CI/CD 中使用 diff 进行回归检测，以及保持 diff 可读性的最佳实践。',
    keyTitle: '核心要点',
    key1: 'Myers 算法（Git 使用的默认算法）在 O(n*d) 时间内找到最短编辑脚本，适用于大多数 diff 场景。',
    key2: 'Patience diff 和 Histogram diff 通过在唯一行上对齐来生成更易读的输出，减少噪声 hunk。',
    key3: '统一 diff 格式（以 <code>+</code>、<code>-</code> 为前缀的行和 <code>@@</code> hunk 头）是 Git、补丁文件和代码审查工具的标准格式。',
    key4: '终端查看器如 <code>delta</code> 和 <code>colordiff</code> 可以显著提高命令行 diff 输出的可读性。',
    key5: '三方合并将两个分支与公共祖先进行比较；理解其机制对于正确解决 Git 冲突至关重要。',
    key6: '将基于 diff 的检查集成到 CI/CD 流水线中，可以自动捕获对 API 契约、配置文件和快照的意外更改。',
    linkTool: '使用我们的免费文本 Diff 检查工具即时比较两段文本。',
    h2_what: '什么是 Diff 以及它为何重要',
    whatP1: '<strong>diff</strong>（"difference"的缩写）是比较两段文本或文件并识别它们之间变化的输出。每一行被分类为添加、删除或未更改。这个概念起源于 1974 年 Unix 的 <code>diff</code> 命令，现在它支撑着现代软件工程中每个版本控制系统、代码审查平台和部署流水线。',
    whatP2: 'Diff 之所以重要，是因为它回答了协作开发中最基本的问题：<strong>"什么发生了变化？"</strong> 在代码审查中，diff 是审查者检查的产物。在调试中，工作提交和故障提交之间的 diff 可以隔离根本原因。在部署中，当前版本和上一版本之间的 diff 定义了变更的影响范围。',
    whatP3: '除了代码，diff 还用于在更改前后比较配置文件、跟踪法律文件和合同中的编辑、检测关键系统文件的未授权修改，以及验证数据迁移是否正确转换了记录。任何涉及版本的工作流都能从 diff 中受益。',
    h2_algorithms: 'Diff 算法：Myers、Patience 和 Histogram',
    algoIntro: '并非所有 diff 的计算方式都相同。算法的选择既影响计算速度，也影响结果输出的可读性。以下是你应该了解的三种最重要的算法：',
    algoMyersTitle: 'Myers Diff 算法',
    algoMyersP1: 'Myers 算法由 Eugene Myers 于 1986 年发表，是 Git 的默认算法。它将 diff 问题建模为在编辑图中寻找最短路径，其中水平边表示删除，垂直边表示插入，对角线边表示匹配。算法运行时间为 O(n*d)，其中 n 是输入大小，d 是差异数量。由于实际 diff 的更改通常远少于总行数，因此实际运行非常快。',
    algoMyersP2: 'Myers diff 找到<strong>最短编辑脚本</strong>（SES），即产生将文本 A 转换为文本 B 所需的最少添加和删除操作。这在数学上是最优的，但有时对人类来说难以阅读，特别是当代码被移动或重构而不是简单地就地编辑时。',
    algoPatienceTitle: 'Patience Diff 算法',
    algoPatienceP1: 'Patience diff（由 Bram Cohen 发明）采用不同的方法。它首先识别在两个文件中只出现一次的行——这些"唯一公共行"充当可靠的锚点。然后使用这些锚点的最长递增子序列（LIS）建立对齐，并在锚点之间的间隙中使用标准 LCS 算法递归处理。',
    algoPatienceP2: '结果是输出倾向于在函数签名、类声明和其他结构标记上对齐，而不是在空白行或右花括号等偶然匹配上对齐。你可以在 Git 中通过 <code>git diff --diff-algorithm=patience</code> 或在 <code>.gitconfig</code> 中设置 <code>diff.algorithm = patience</code> 来启用。',
    algoHistogramTitle: 'Histogram Diff 算法',
    algoHistogramP1: 'Histogram diff 是 Patience diff 的优化版本，为 JGit 项目开发。它构建行出现频率的直方图来识别低频行作为锚点，然后应用与 Patience diff 相同的递归策略。它通常产生与 Patience diff 相似质量的结果，但在某些输入上更快。',
    algoHistogramP2: '在 Git 中通过 <code>git diff --diff-algorithm=histogram</code> 启用。许多发现默认 Myers 输出在重度重构文件上令人困惑的开发者会切换到 Patience 或 Histogram 作为默认算法。',
    algoCompareTitle: '算法对比',
    h2_gitdiff: 'git diff 详解：统一格式与并排视图',
    gitdiffIntro: '<code>git diff</code> 是开发者最频繁使用的文件版本比较工具。理解其输出格式是一项核心开发者技能。',
    gitdiffUnifiedTitle: '统一 Diff 格式',
    gitdiffUnifiedP1: '默认情况下，<code>git diff</code> 以<strong>统一 diff 格式</strong>输出。以下是各部分的含义：',
    gitdiffHeader: '<strong>文件头</strong>：<code>--- a/src/app.js</code> 标识原始文件，<code>+++ b/src/app.js</code> 标识修改后的文件。<code>a/</code> 和 <code>b/</code> 前缀是虚拟路径标记。',
    gitdiffHunk: '<strong>Hunk 头</strong>：如 <code>@@ -15,7 +15,9 @@ function processData()</code> 表示 hunk 从原始文件第 15 行开始（显示 7 行），修改版本第 15 行开始（显示 9 行）。第二个 <code>@@</code> 后的文本是 Git 添加的最近函数或作用域名称。',
    gitdiffLines: '<strong>更改行</strong>：以 <code>-</code> 开头的行被删除，以 <code>+</code> 开头的行被添加，无前缀的行是未更改的上下文行（默认 3 行，可用 <code>-U&lt;n&gt;</code> 调整）。',
    gitdiffCommandsTitle: '常用 git diff 命令',
    gitdiffSideBySideTitle: '并排视图',
    gitdiffSideBySideP1: 'Git 原生不生成并排输出，但有多种工具提供此视图。<code>delta</code> 分页器（下文讨论）可在终端中渲染带语法高亮的并排 diff。GitHub 和 GitLab 在其 PR 界面中呈现并排 diff。你也可以使用 GNU coreutils 的 <code>diff -y</code> 获得基本的两列布局。',
    h2_terminal: '终端中的文件比较：diff、colordiff、delta',
    termIntro: '虽然 <code>git diff</code> 覆盖了版本控制文件，但你经常需要比较任意文件。以下是必备的终端工具：',
    termDiffTitle: '经典 diff 命令',
    termDiffP1: '在每个类 Unix 系统上都可用，<code>diff</code> 是原始的文件比较工具。关键标志包括 <code>-u</code>（统一输出）、<code>-r</code>（递归目录比较）、<code>-q</code>（仅报告文件是否不同）、<code>-w</code>（忽略空白）和 <code>-y</code>（并排输出）。',
    termColordiffTitle: 'colordiff：带颜色的 diff',
    termColordiffP1: '<code>colordiff</code> 包装器为 <code>diff</code> 的输出添加 ANSI 颜色代码。通过包管理器安装（<code>apt install colordiff</code>、<code>brew install colordiff</code>），作为直接替代品使用：<code>colordiff -u file1.txt file2.txt</code>。',
    termDeltaTitle: 'delta：现代 Diff 查看器',
    termDeltaP1: '<code>delta</code> 分页器将 diff 输出转换为具有语法高亮、行号、并排模式和导航的丰富格式显示。通过在 <code>.gitconfig</code> 中添加几行即可集成为 Git 分页器。配置后，每个 <code>git diff</code>、<code>git log -p</code> 和 <code>git show</code> 命令都会自动通过 delta 渲染。',
    h2_jsdiff: 'JavaScript 中的 Diff：jsdiff 库',
    jsdiffIntro: '<code>diff</code> npm 包（通常称为 <strong>jsdiff</strong>）是在 JavaScript 和 TypeScript 中计算文本差异的标准库。它为许多基于 Web 的 diff 查看器提供支持，并用于测试框架的快照比较。',
    jsdiffFunctionsTitle: '核心 Diff 函数',
    jsdiffFunctionsP1: 'jsdiff 提供多种粒度级别：<code>Diff.diffChars()</code> 逐字符比较，<code>Diff.diffWords()</code> 按单词边界分割，<code>Diff.diffLines()</code> 逐行比较，<code>Diff.diffSentences()</code> 按句子操作。每个函数返回一个包含 <code>value</code>、<code>added</code> 和 <code>removed</code> 属性的变更对象数组。',
    jsdiffPatchTitle: '创建和应用补丁',
    jsdiffPatchP1: '<code>Diff.createPatch()</code> 生成统一 diff 字符串，可保存为 <code>.patch</code> 文件。<code>Diff.applyPatch()</code> 接受原始文本和补丁字符串并产生修改后的文本。这对于实现撤销/重做功能或通过网络高效传输更改非常有用。',
    h2_python: 'Python 中的 Diff：difflib 模块',
    pythonIntro: 'Python 的标准库中自带 <code>difflib</code>，从统一 diff 到 HTML 可视化比较报告，一应俱全。无需安装额外包。',
    pythonUnifiedTitle: '生成统一 Diff',
    pythonUnifiedP1: '<code>difflib.unified_diff()</code> 接受两个字符串序列（通常是 <code>splitlines()</code> 的行），返回统一格式的 diff 行迭代器。传入 <code>fromfile</code> 和 <code>tofile</code> 作为文件头，<code>lineterm=""</code> 避免打印时出现双换行。',
    pythonHtmlTitle: 'HTML 可视化 Diff',
    pythonHtmlP1: '<code>difflib.HtmlDiff()</code> 生成包含并排表格的完整 HTML 页面，高亮显示差异。这对于在自动化测试或文档流水线中生成 diff 报告非常有价值。',
    pythonSequenceTitle: 'SequenceMatcher 计算相似度',
    pythonSequenceP1: '<code>difflib.SequenceMatcher</code> 提供 <code>ratio()</code> 方法，返回 0 到 1 之间的浮点数表示两个序列的相似度。这对于模糊匹配、查重检测和在字符串列表中查找最接近的匹配非常有用。',
    h2_semantic: '语义 Diff 与行级 Diff',
    semanticP1: '传统 diff 工具在不理解内容的情况下对文本行进行操作。<strong>行级 diff</strong> 将每一行视为原子单元：如果一行中有一个字符改变，整行都被标记为已修改。这对大多数代码有效，但当发生格式更改（如重新缩进代码块或重排段落）时可能产生误导性输出。',
    semanticP2: '<strong>语义 diff</strong>（也称为结构化 diff 或 AST diff）将内容解析为树结构（如代码的抽象语法树），然后比较树而非原始文本。这意味着它可以区分有意义的代码更改和纯格式更改，检测移动的函数或方法，并产生与语言逻辑结构对齐的 diff。',
    semanticP3: '工具如 <code>difftastic</code>、<code>GumTree</code> 和 VS Code 的 <code>Semantic Diff</code> 实现了这种方法。虽然比行级 diff 计算成本更高，但在理解意图比查看原始文本更改更重要的代码审查工作流中越来越受欢迎。',
    semanticP4: '对于 Web 场景，Google 的 <code>diff-match-patch</code> 库提供字符级 diff 和语义清理启发式，即使没有完整的 AST 解析，也能将更改分组为人类可理解的单元。',
    h2_threeway: '三方合并与冲突解决',
    threewayP1: '<strong>三方合并</strong>发生在 Git（或任何 VCS）需要合并从公共祖先分叉的两个分支的更改时。它不仅比较两个文件，还考虑三个版本：<strong>base</strong>（公共祖先）、<strong>ours</strong>（当前分支）和 <strong>theirs</strong>（传入分支）。',
    threewayP2: '合并算法通过计算两个 diff 工作：base-to-ours 和 base-to-theirs。如果某个区域只在其中一个 diff 中更改，则自动接受该更改。如果两个 diff 以相同方式修改同一区域，更改也会被接受（收敛编辑）。<strong>冲突</strong>仅在两个 diff 以不同方式修改同一区域时发生。',
    threewayP3: '当发生冲突时，Git 会在文件中写入冲突标记：',
    threewayP4: '开发者必须手动选择保留哪个版本、合并它们或编写全新的代码。VS Code、IntelliJ 和 <code>vimdiff</code> 等合并工具以可视化方式呈现三方 diff，base 版本在中间，两个分支版本在两侧。',
    threewayP5: 'Git 还支持 <code>diff3</code> 冲突样式（<code>git config merge.conflictstyle diff3</code>），在标记之间包含 base 版本，使得理解任一分支更改前的原始代码更加容易。',
    h2_cicd: 'CI/CD 中的 Diff：自动化回归检测',
    cicdP1: 'Diff 不仅用于人工审查——它们在 CI/CD 流水线中也是强大的自动化质量门控工具。以下是常见模式：',
    cicdSnapshot: '<strong>快照测试</strong>：Jest（JavaScript）和 pytest（Python）等框架序列化输出并与存储的快照进行比较。当 diff 非空时测试失败，迫使开发者修复回归或明确批准新快照。',
    cicdApi: '<strong>API 契约检查</strong>：<code>openapi-diff</code> 等工具比较当前分支和基准分支之间的 OpenAPI/Swagger 规范。破坏性更改（删除端点、更改类型）导致 CI 构建失败，防止意外的 API 破坏。',
    cicdConfig: '<strong>配置漂移检测</strong>：Terraform 等基础设施即代码工具生成的"计划"本质上是期望状态与当前状态的 diff。CI 流水线可以阻止包含意外更改的应用。',
    cicdBinary: '<strong>二进制制品 Diff</strong>：<code>diffoscope</code> 等工具可以比较编译的二进制文件、Docker 镜像和归档文件，检测构建输出中的意外更改。',
    cicdSize: '<strong>包大小监控</strong>：构建流水线可以 diff 提交之间的 JavaScript 包大小或 Docker 镜像大小，标记超过阈值的回归。',
    h2_bestpractices: '保持 Diff 可读性的最佳实践',
    bpIntro: 'diff 的质量不仅取决于算法——它很大程度上受代码编写和提交方式的影响。以下是产生干净、易于审查的 diff 的实践：',
    bp1: '<strong>原子化提交</strong>：每个提交应包含单一逻辑更改。将重构与功能添加混合会产生难以审查的嘈杂 diff。如果需要在添加功能前重构，请单独提交重构。',
    bp2: '<strong>统一格式化</strong>：在项目中强制使用格式化工具（Prettier、Black、gofmt）。当每个人使用相同的格式化规则时，diff 永远不会包含纯格式噪声。将格式化工具作为 pre-commit hook 运行使其自动化。',
    bp3: '<strong>避免不必要的空白更改</strong>：跨多个文件更改缩进样式或添加尾随换行会创建遮蔽真实更改的大量 diff。如果需要空白更改，在专用提交中进行。',
    bp4: '<strong>优先追加而非重写</strong>：向列表、配置文件或数组添加条目时，在末尾添加而不是在中间插入。这可以最小化 diff 中更改的上下文，避免与修改同一列表的其他分支产生合并冲突。',
    bp5: '<strong>在数组和对象中添加尾随逗号</strong>：在支持尾随逗号的语言中（JavaScript、TypeScript、Python、Rust），始终包含它们。这样添加新项目到列表只产生一行 diff，而不是修改前一个最后一行的两行 diff。',
    bp6: '<strong>编写描述性提交消息</strong>：虽然不是 diff 本身的一部分，但好的提交消息帮助审查者在阅读 diff 之前理解其意图。这种上下文使审查过程更快更准确。',
    bp7: '<strong>将大 PR 拆分为堆叠 diff</strong>：2000 行的 diff 令人望而却步。将大型更改分解为一系列较小的、顺序依赖的 PR。每个 PR 更容易理解和审查，整体更改引入 bug 的可能性更小。',
    h2_faq: '常见问题',
    faq1_q: '代码审查中最好的 diff 算法是什么？',
    faq1_a: '对于大多数代码审查场景，Patience diff 算法生成最易读的输出，因为它在函数签名和类声明等唯一结构行上对齐。你可以通过 git config --global diff.algorithm patience 将其设为 Git 默认值。默认的 Myers 算法更快且产生数学上最小的 diff，但当代码被移动或重构时其输出可能令人困惑。Histogram diff 是一个好的折中方案。',
    faq2_q: '如何在不安装任何东西的情况下在线比较两个文本文件？',
    faq2_a: '将两个文件的内容粘贴到在线 diff 检查工具中，如我们的免费文本 Diff 检查器。工具会以绿色高亮添加的行，红色高亮删除的行。所有处理都在浏览器中进行，数据不会离开你的设备。对于大文件或频繁比较，可以使用 VS Code（内置 diff 编辑器）或命令行 diff 命令。',
    faq3_q: '双向 diff 和三方合并有什么区别？',
    faq3_a: '双向 diff 直接比较两个文件并显示它们之间的变化。三方合并将两个文件与其公共祖先（base 版本）进行比较。这种额外的上下文允许合并工具自动解决非重叠的更改。三方合并是 Git 合并分支时使用的方式。只有当两个分支以不同方式修改 base 的同一区域时才会发生冲突。',
    faq4_q: '如何让 git diff 输出更易读？',
    faq4_a: '安装 delta 分页器并在 .gitconfig 中将其设为 Git 分页器。Delta 为所有 Git diff 输出添加语法高亮、行号和并排模式。你也可以使用 git diff --word-diff 以单词粒度查看更改，这对文档更改特别有用。另一个选项是 git diff --color-words，它内联高亮更改的单词。',
    faq5_q: 'CI/CD 流水线中可以使用 diff 工具吗？',
    faq5_a: '是的，diff 在 CI/CD 中广泛用于回归检测。常见模式包括快照测试（Jest、pytest）、使用 openapi-diff 进行 API 契约检查、使用 Terraform plan 进行配置漂移检测和包大小监控。diff 命令本身可以在 shell 脚本中使用其退出码：文件相同返回 0，不同返回 1，便于在意外更改时使流水线步骤失败。',
    faq6_q: '什么是语义 diff，何时应该使用？',
    faq6_a: '语义 diff（或结构化 diff）将代码解析为抽象语法树并比较树而非原始文本行。这意味着它可以区分真正的逻辑更改和格式更改，并可以检测在文件内移动的代码。difftastic 和 GumTree 等工具实现了语义 diff。当审查大型重构、团队格式不一致或需要理解更改意图时使用语义 diff。',
    faq7_q: 'Patience diff 算法与 Myers 有何不同？',
    faq7_a: 'Myers 算法通过贪心地探索编辑图来找到数学上最短的编辑脚本。它速度快（O(n*d) 时间）但当代码被重新排列时可能产生违反直觉的输出。Patience diff 首先识别在两个文件中都是唯一的行并将其用作稳定锚点，然后递归地填充间隙。这倾向于产生与代码逻辑结构对齐的 diff（例如将函数头与函数头匹配）而不是在空白行或花括号等偶然匹配上对齐。',
    conclusion: '理解 diff 工具和算法对于有效的代码审查、调试和部署工作流至关重要。从选择正确的算法（Myers 追求速度，Patience 追求可读性）到将自动化 diff 检查集成到 CI/CD，快速准确地识别文件版本之间变化的能力是一项核心工程技能。对于无需任何设置的快速比较，请使用我们的在线工具。对于深度集成到日常工作流，请将 <code>delta</code> 配置为 Git 分页器，并考虑切换到 Patience 或 Histogram diff 作为默认算法。',
    linkToolBottom: '使用我们的免费在线 Diff 检查工具即时比较两段文本。',
  },
};

export default function TextDiffOnlineGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
      { '@type': 'Question', name: s.faq6_q, acceptedAnswer: { '@type': 'Answer', text: s.faq6_a } },
      { '@type': 'Question', name: s.faq7_q, acceptedAnswer: { '@type': 'Answer', text: s.faq7_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <p style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>TL;DR</p>
        <p style={{ margin: 0, lineHeight: 1.7, fontSize: 14 }} dangerouslySetInnerHTML={{ __html: s.tldr }} />
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <p style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>{s.keyTitle}</p>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, fontSize: 14 }}>
          <li dangerouslySetInnerHTML={{ __html: s.key1 }} />
          <li dangerouslySetInnerHTML={{ __html: s.key2 }} />
          <li dangerouslySetInnerHTML={{ __html: s.key3 }} />
          <li dangerouslySetInnerHTML={{ __html: s.key4 }} />
          <li dangerouslySetInnerHTML={{ __html: s.key5 }} />
          <li dangerouslySetInnerHTML={{ __html: s.key6 }} />
        </ul>
      </div>

      <p><Link href={`/${lang}/tools/text-diff`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.linkTool}</Link></p>

      {/* Section 1: What Is a Diff and Why It Matters */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatP1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatP2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatP3 }} />
      <p><Link href={`/${lang}/tools/text-diff`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.linkTool}</Link></p>

      {/* Section 2: Diff Algorithms */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{s.h2_algorithms}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.algoIntro }} />

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.algoMyersTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.algoMyersP1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.algoMyersP2 }} />

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.algoPatienceTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.algoPatienceP1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.algoPatienceP2 }} />

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.algoHistogramTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.algoHistogramP1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.algoHistogramP2 }} />

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.algoCompareTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>Algorithm</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>Time Complexity</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>Readability</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Myers</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>O(n*d)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Good (minimal edits)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>General use, speed-critical</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Patience</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>O(n*d) + LIS</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Excellent (structural alignment)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Code review, refactored files</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Histogram</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>O(n*d) + histogram</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Excellent</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Large files, balanced speed/readability</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 3: git diff Explained */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{s.h2_gitdiff}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.gitdiffIntro }} />

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.gitdiffUnifiedTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.gitdiffUnifiedP1 }} />
      <ul style={{ lineHeight: 1.8 }}>
        <li dangerouslySetInnerHTML={{ __html: s.gitdiffHeader }} />
        <li dangerouslySetInnerHTML={{ __html: s.gitdiffHunk }} />
        <li dangerouslySetInnerHTML={{ __html: s.gitdiffLines }} />
      </ul>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`--- a/src/utils.js
+++ b/src/utils.js
@@ -10,7 +10,9 @@ function processData(input) {
   const cleaned = input.trim();
-  const result = transform(cleaned);
-  return result;
+  const validated = validate(cleaned);
+  const result = transform(validated);
+  return { data: result, status: 'ok' };
 }

 // Context lines above and below the change`}</code></pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.gitdiffCommandsTitle}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`# Compare working directory vs staging area (unstaged changes)
git diff

# Compare staging area vs last commit (staged changes)
git diff --staged

# Compare working directory vs HEAD (all uncommitted changes)
git diff HEAD

# Compare two branches
git diff main..feature-branch

# Compare two specific commits
git diff abc1234 def5678

# Diff a specific file only
git diff -- src/config.ts

# Word-level diff (useful for prose/docs)
git diff --word-diff

# Color-coded word-level diff (no markers)
git diff --color-words

# Show only filenames that changed
git diff --name-only HEAD~5

# Show filenames with status (A/M/D)
git diff --name-status main..feature

# Statistics: insertions/deletions per file
git diff --stat

# Choose diff algorithm
git diff --diff-algorithm=patience
git diff --diff-algorithm=histogram

# Ignore whitespace changes
git diff -w

# Show diff with more context (default is 3 lines)
git diff -U10

# Generate a patch file
git diff > changes.patch

# Apply a patch
git apply changes.patch`}</code></pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.gitdiffSideBySideTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.gitdiffSideBySideP1 }} />

      {/* Section 4: Terminal Tools */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{s.h2_terminal}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.termIntro }} />

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.termDiffTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.termDiffP1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`# Unified diff (most common)
diff -u original.txt modified.txt

# Side-by-side comparison
diff -y --width=120 file1.txt file2.txt

# Recursive directory comparison
diff -r dir1/ dir2/

# Report only which files differ (no details)
diff -rq dir1/ dir2/

# Ignore all whitespace
diff -u -w file1.txt file2.txt

# Ignore blank lines
diff -u -B file1.txt file2.txt

# Brief: only report if files differ (exit code 0 or 1)
diff -q file1.txt file2.txt`}</code></pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.termColordiffTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.termColordiffP1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`# Install
brew install colordiff    # macOS
apt install colordiff     # Ubuntu/Debian

# Use as drop-in replacement
colordiff -u original.txt modified.txt

# Pipe standard diff through colordiff
diff -u file1.txt file2.txt | colordiff`}</code></pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.termDeltaTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.termDeltaP1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`# Install
brew install git-delta    # macOS
apt install delta         # Ubuntu 22.04+

# Configure as Git pager in ~/.gitconfig
[core]
    pager = delta

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true
    side-by-side = true
    line-numbers = true
    syntax-theme = Dracula

# Now every git diff, git log -p, git show
# automatically renders through delta`}</code></pre>

      {/* Section 5: jsdiff */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{s.h2_jsdiff}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.jsdiffIntro }} />

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.jsdiffFunctionsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.jsdiffFunctionsP1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`import * as Diff from 'diff';

const oldText = \`function greet(name) {
  console.log("Hello, " + name);
  return true;
}\`;

const newText = \`function greet(name, greeting = "Hello") {
  console.log(greeting + ", " + name + "!");
  return { success: true };
}\`;

// Line-by-line diff
const changes = Diff.diffLines(oldText, newText);
changes.forEach(part => {
  const prefix = part.added ? '+' : part.removed ? '-' : ' ';
  part.value.split('\\n').filter(Boolean).forEach(line => {
    console.log(prefix + ' ' + line);
  });
});

// Character-level diff
const charChanges = Diff.diffChars('hello world', 'hello there');
// Returns: [{value:'hello '}, {removed:true,value:'world'}, {added:true,value:'there'}]

// Word-level diff
const wordChanges = Diff.diffWords(
  'The quick brown fox',
  'The slow brown fox'
);
// Identifies 'quick' -> 'slow' as the only change`}</code></pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.jsdiffPatchTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.jsdiffPatchP1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`import * as Diff from 'diff';

// Create a unified patch
const patch = Diff.createPatch(
  'greeting.js',   // filename
  oldText,          // old content
  newText,          // new content
  'v1',             // old header
  'v2'              // new header
);
console.log(patch);
// Outputs standard unified diff format

// Apply the patch to get the new text
const result = Diff.applyPatch(oldText, patch);
console.log(result === newText); // true

// Structured patch (returns parsed hunk objects)
const structured = Diff.structuredPatch(
  'old.js', 'new.js', oldText, newText, '', ''
);
console.log(structured.hunks);
// [{oldStart:1, oldLines:4, newStart:1, newLines:4, lines:[...]}]`}</code></pre>

      <p><Link href={`/${lang}/tools/text-diff`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.linkTool}</Link></p>

      {/* Section 6: Python difflib */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{s.h2_python}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.pythonIntro }} />

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.pythonUnifiedTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.pythonUnifiedP1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`import difflib

old = """def greet(name):
    print(f"Hello, {name}")
    return True""".splitlines()

new = """def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")
    return {"success": True}""".splitlines()

# Generate unified diff
diff = difflib.unified_diff(
    old, new,
    fromfile='greet_v1.py',
    tofile='greet_v2.py',
    lineterm=''
)
print('\\n'.join(diff))

# Output:
# --- greet_v1.py
# +++ greet_v2.py
# @@ -1,3 +1,3 @@
# -def greet(name):
# -    print(f"Hello, {name}")
# -    return True
# +def greet(name, greeting="Hello"):
# +    print(f"{greeting}, {name}!")
# +    return {"success": True}`}</code></pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.pythonHtmlTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.pythonHtmlP1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`import difflib

old = "Hello World\\nFoo Bar\\nBaz Qux".splitlines()
new = "Hello World\\nFoo Baz\\nBaz Qux\\nNew Line".splitlines()

# Generate a complete HTML diff report
html_diff = difflib.HtmlDiff()
report = html_diff.make_file(old, new, 'Original', 'Modified')

with open('diff_report.html', 'w') as f:
    f.write(report)
# Opens in browser with side-by-side colored comparison`}</code></pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 12 }}>{s.pythonSequenceTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.pythonSequenceP1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`from difflib import SequenceMatcher

a = "the quick brown fox"
b = "the slow brown fox jumps"

matcher = SequenceMatcher(None, a, b)
print(f"Similarity: {matcher.ratio():.2%}")  # ~72%

# Get matching blocks
for block in matcher.get_matching_blocks():
    print(f"a[{block.a}:{block.a+block.size}] == b[{block.b}:{block.b+block.size}]")

# Get opcodes (edit operations)
for op, i1, i2, j1, j2 in matcher.get_opcodes():
    print(f"{op:>8s} a[{i1}:{i2}] -> b[{j1}:{j2}]")
# Output: equal, replace, equal, insert`}</code></pre>

      {/* Section 7: Semantic Diff */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{s.h2_semantic}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.semanticP1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.semanticP2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.semanticP3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.semanticP4 }} />

      {/* Section 8: Three-Way Merge */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{s.h2_threeway}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.threewayP1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.threewayP2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.threewayP3 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`<<<<<<< HEAD (ours - current branch)
const timeout = 5000;
=======
const timeout = 10000;
>>>>>>> feature-branch (theirs - incoming branch)

# With diff3 conflict style (recommended):
# git config merge.conflictstyle diff3
<<<<<<< HEAD
const timeout = 5000;
||||||| merged common ancestor (base)
const timeout = 3000;
=======
const timeout = 10000;
>>>>>>> feature-branch`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.threewayP4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.threewayP5 }} />

      {/* Section 9: Diff in CI/CD */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{s.h2_cicd}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.cicdP1 }} />
      <ul style={{ lineHeight: 1.8 }}>
        <li dangerouslySetInnerHTML={{ __html: s.cicdSnapshot }} />
        <li dangerouslySetInnerHTML={{ __html: s.cicdApi }} />
        <li dangerouslySetInnerHTML={{ __html: s.cicdConfig }} />
        <li dangerouslySetInnerHTML={{ __html: s.cicdBinary }} />
        <li dangerouslySetInnerHTML={{ __html: s.cicdSize }} />
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`# CI/CD example: fail if API spec changed unexpectedly
# .github/workflows/api-check.yml
name: API Contract Check
on: [pull_request]
jobs:
  diff-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Check API spec for breaking changes
        run: |
          git diff origin/main -- openapi.yaml > api-diff.txt
          if [ -s api-diff.txt ]; then
            echo "API spec changed. Review required."
            cat api-diff.txt
            npx openapi-diff origin/main:openapi.yaml openapi.yaml
          fi

# Snapshot test in Jest
test('renders correctly', () => {
  const tree = renderer.create(<Component />).toJSON();
  expect(tree).toMatchSnapshot();
  // If output changes, test fails with a diff
});

# Bundle size check
CURRENT_SIZE=$(stat -f%z dist/bundle.js)
BASE_SIZE=$(git show origin/main:dist/bundle.js | wc -c)
DIFF=$((CURRENT_SIZE - BASE_SIZE))
if [ $DIFF -gt 10240 ]; then
  echo "Bundle size increased by $DIFF bytes (>10KB threshold)"
  exit 1
fi`}</code></pre>

      {/* Section 10: Best Practices */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{s.h2_bestpractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bpIntro }} />
      <ol style={{ lineHeight: 2.0, paddingLeft: 20 }}>
        <li dangerouslySetInnerHTML={{ __html: s.bp1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.bp2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.bp3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.bp4 }} />
        <li dangerouslySetInnerHTML={{ __html: s.bp5 }} />
        <li dangerouslySetInnerHTML={{ __html: s.bp6 }} />
        <li dangerouslySetInnerHTML={{ __html: s.bp7 }} />
      </ol>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 20, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`# Example: trailing comma produces cleaner diffs

# WITHOUT trailing comma - 2-line diff to add "grape":
  const fruits = [
    "apple",
    "banana",
-   "cherry"
+   "cherry",
+   "grape"
  ];

# WITH trailing comma - 1-line diff to add "grape":
  const fruits = [
    "apple",
    "banana",
    "cherry",
+   "grape",
  ];`}</code></pre>

      {/* FAQ Section */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{s.h2_faq}</h2>

      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{s.faq1_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{s.faq1_a}</p>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{s.faq2_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{s.faq2_a}</p>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{s.faq3_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{s.faq3_a}</p>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{s.faq4_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{s.faq4_a}</p>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{s.faq5_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{s.faq5_a}</p>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{s.faq6_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{s.faq6_a}</p>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{s.faq7_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{s.faq7_a}</p>
      </div>

      {/* Conclusion */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>Conclusion</h2>
      <p dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p style={{ marginTop: 16 }}>
        <Link href={`/${lang}/tools/text-diff`} style={{ fontWeight: 700, color: '#2563eb', fontSize: 16 }}>{s.linkToolBottom}</Link>
      </p>
    </>
  );
}
