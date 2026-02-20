import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'A <strong>diff checker</strong> is an essential tool that every developer, writer, and system administrator needs in their toolkit. Whether you need to <strong>compare two files</strong>, review code changes, or <strong>find differences between two texts</strong>, understanding how diff algorithms work will make you significantly more productive. This comprehensive guide covers everything from the fundamentals of <strong>text diff</strong> algorithms to practical code examples in Git, JavaScript, Python, and Bash. If you need a quick <strong>diff checker online</strong> solution, our free tool lets you <strong>compare text online</strong> instantly with syntax highlighting and side-by-side view.',
    linkTool: 'Try our free online Text Diff Checker tool instantly.',
    h2_what: 'What Is a Diff Checker?',
    whatDesc1: 'A <strong>diff checker</strong> (also known as a <strong>text compare</strong> tool or <strong>file diff</strong> utility) is software that takes two pieces of text or two files as input and identifies the differences between them. The output, commonly called a "diff" or "patch," shows which lines were added, removed, or modified. The concept originated in the Unix world with the <code>diff</code> command created by Douglas McIlroy in 1974, and it has since become the foundation of every version control system, code review workflow, and document comparison tool in existence.',
    whatDesc2: 'At its core, a <strong>diff checker</strong> solves the problem of efficiently answering the question: "What changed between version A and version B?" This seemingly simple question is actually a computationally interesting problem. The diff algorithm must find the minimal set of edits (insertions and deletions) that transform text A into text B. This is known as the <strong>edit distance</strong> or <strong>shortest edit script</strong> problem, and the most common solution is based on the Longest Common Subsequence (LCS) algorithm.',
    whatDesc3: 'Modern <strong>online diff tools</strong> go far beyond simple line comparison. They offer syntax highlighting for code, character-level difference detection within changed lines, side-by-side and inline views, ignore whitespace options, and even semantic diff capabilities that understand the structure of programming languages. Whether you are performing a <strong>code diff</strong> during a pull request review or comparing configuration files after a deployment, understanding diff output is a critical developer skill.',
    h2_algorithms: 'How Diff Algorithms Work',
    algoDesc1: 'The foundation of every <strong>diff checker</strong> is the <strong>Longest Common Subsequence (LCS)</strong> algorithm. Given two sequences, LCS finds the longest sequence of elements that appear in the same order in both inputs (but not necessarily contiguously). Once the LCS is computed, everything not in the LCS represents the differences: elements only in the first input are deletions, and elements only in the second input are additions.',
    algoDesc2: 'The classic LCS algorithm uses dynamic programming with a time complexity of O(n*m) where n and m are the lengths of the two inputs. For large files, this can be slow. In 1986, Eugene Myers published a groundbreaking paper describing an algorithm that finds the shortest edit script in O(n*d) time, where d is the number of differences. Since most diffs have relatively few changes compared to the total file size, <strong>Myers\' algorithm</strong> is dramatically faster in practice. This is the algorithm used by Git and most modern <strong>text diff</strong> tools.',
    algoDesc3: 'The Myers algorithm works by exploring a graph of edit operations. It processes the two inputs and finds the shortest path from the top-left corner (beginning of both texts) to the bottom-right corner (end of both texts) in an edit graph, where horizontal moves represent deletions, vertical moves represent insertions, and diagonal moves represent matching characters or lines. The algorithm uses a clever greedy approach combined with linear space optimization to find this optimal path efficiently.',
    algoDesc4: '<strong>Line-by-line vs character-by-character diffing</strong>: Most tools first compare at the line level to find which lines changed, then optionally perform a character-level diff within those changed lines to highlight exactly which words or characters were modified. This two-pass approach is both efficient and produces the most readable output. Some specialized tools also offer <strong>word diff</strong> mode, which splits lines into words before comparing, producing output that is easier to read for prose and documentation.',
    h2_types: 'Types of Diff Output',
    typesDesc: 'There are several standard formats for displaying <strong>text diff</strong> results. Each format has its strengths depending on the use case:',
    type1: '<strong>Unified Diff</strong>: The most common format, used by <code>git diff</code> and most modern tools. It shows changes with <code>+</code> (added) and <code>-</code> (removed) prefixes, with a few lines of context around each change. The header includes <code>@@</code> hunk markers that indicate line numbers. This is the standard format for patches and code reviews.',
    type2: '<strong>Side-by-Side Diff</strong>: Displays the original and modified text in two columns next to each other, with changes highlighted. This format is very popular in graphical <strong>diff checker</strong> tools and web-based code review platforms because it makes it easy to visually scan for changes. Most <strong>diff checker online</strong> tools use this format.',
    type3: '<strong>Inline Diff</strong>: Shows the old and new versions interleaved in a single column, with deletions and additions color-coded (typically red for removed and green for added). GitHub uses this as one of its code review view options.',
    type4: '<strong>Context Diff</strong>: An older format that uses <code>!</code> to mark changed lines and shows the before/after versions in separate sections prefixed with <code>***</code> and <code>---</code>. While less common today, some legacy systems still use this format.',
    type5: '<strong>Word Diff</strong>: Instead of comparing whole lines, this mode compares individual words. Git supports this with <code>git diff --word-diff</code>. This is particularly useful for comparing prose, documentation, or any content where changes occur within lines rather than across entire lines.',
    h2_useCases: 'Common Use Cases for Diff Checking',
    useCasesDesc: '<strong>Diff checking</strong> and <strong>text comparison</strong> are integral to many professional workflows:',
    useCase1: '<strong>Code Review</strong>: Every pull request and merge request is fundamentally a diff. Developers review <strong>code diff</strong> output to understand what changed, verify correctness, suggest improvements, and ensure coding standards are met. Tools like GitHub, GitLab, and Bitbucket all present diffs as the primary interface for code review.',
    useCase2: '<strong>Document Versioning</strong>: Writers, editors, and legal professionals frequently need to <strong>compare two files</strong> to track changes between document revisions. Whether it is a contract, a specification, or a blog post draft, <strong>text compare</strong> tools make it easy to see exactly what was added, removed, or reworded.',
    useCase3: '<strong>Configuration File Changes</strong>: System administrators compare configuration files (nginx.conf, docker-compose.yml, .env files) before and after changes to verify that only intended modifications were made. A single misplaced character in a config file can cause a production outage, so <strong>file diff</strong> verification is critical.',
    useCase4: '<strong>API Response Comparison</strong>: When testing APIs, developers often need to compare JSON or XML responses between environments (staging vs production) or between versions. A <strong>diff checker</strong> helps identify unexpected changes in API output.',
    useCase5: '<strong>Merge Conflict Resolution</strong>: When Git encounters conflicting changes from different branches, it presents a three-way diff showing the common ancestor, the current branch, and the incoming branch. Understanding diff output is essential for resolving these conflicts correctly without losing work.',
    h2_codeExamples: 'Diff Checker Code Examples',
    codeGitTitle: 'Git Diff Commands',
    codeGitDesc: 'Git has the most powerful built-in <strong>diff checker</strong> available. Here are the essential <code>git diff</code> commands every developer should know:',
    codeJsTitle: 'JavaScript Text Diff (diff npm package)',
    codeJsDesc: 'The <code>diff</code> npm package is the most popular JavaScript library for computing <strong>text diff</strong> results programmatically. It provides multiple comparison functions for different granularity levels:',
    codePyTitle: 'Python Diff (difflib module)',
    codePyDesc: 'Python includes the powerful <code>difflib</code> module in its standard library. It provides classes and functions for comparing sequences, including generating unified diffs, context diffs, and even visual HTML diff reports:',
    codeBashTitle: 'Bash / Linux Diff Commands',
    codeBashDesc: 'Linux and macOS provide several command-line tools for <strong>text comparison</strong>. The classic <code>diff</code> command, along with enhanced alternatives, covers most use cases:',
    h2_readDiff: 'How to Read Diff Output',
    readDiffDesc: 'Understanding <strong>diff output</strong> is a fundamental developer skill. Here is a breakdown of the unified diff format, which is the most common format you will encounter in Git, code reviews, and patch files:',
    readDiffHeader: '<strong>File headers</strong>: The diff starts with <code>--- a/file.txt</code> (original file) and <code>+++ b/file.txt</code> (modified file). In Git, <code>a/</code> and <code>b/</code> are virtual prefixes representing the before and after versions.',
    readDiffHunk: '<strong>Hunk headers</strong>: Lines starting with <code>@@</code> indicate the location of changes. The format <code>@@ -start,count +start,count @@</code> tells you the line range in the original file (prefixed with <code>-</code>) and the modified file (prefixed with <code>+</code>). For example, <code>@@ -10,7 +10,8 @@</code> means the hunk starts at line 10 in both files, with 7 lines shown from the original and 8 lines from the modified version.',
    readDiffLines: '<strong>Changed lines</strong>: Lines starting with <code>-</code> (typically shown in red) were removed from the original. Lines starting with <code>+</code> (typically shown in green) were added in the new version. Lines with no prefix are unchanged context lines that help you locate the change in the file.',
    readDiffPatch: '<strong>Patch files</strong>: A diff can be saved as a <code>.patch</code> file and applied to another copy of the original file using <code>git apply patch-file.patch</code> or <code>patch -p1 &lt; patch-file.patch</code>. This is how open-source contributors share changes without direct repository access.',
    readDiffStat: '<strong>Diff statistics</strong>: Use <code>git diff --stat</code> to see a summary of changes showing the number of insertions and deletions per file, plus a visual bar graph. Use <code>git diff --shortstat</code> for a one-line summary like <code>3 files changed, 25 insertions(+), 10 deletions(-)</code>.',
    h2_tools: 'Best Diff Tools Comparison',
    toolsDesc: 'Here is a comparison of the best <strong>diff checker</strong> tools available, from our free <strong>online diff tool</strong> to powerful desktop applications:',
    tool1: '<strong>DevToolBox Text Diff (Online)</strong>: Our free <strong>diff checker online</strong> tool provides instant side-by-side comparison with syntax highlighting, character-level diff within changed lines, and support for large texts. No installation required, works in any browser, and your data stays private (processed entirely client-side). Perfect for quick comparisons without leaving your browser.',
    tool2: '<strong>VS Code Built-in Diff</strong>: Visual Studio Code includes an excellent diff editor. Right-click any file and select "Compare With..." or use <code>code --diff file1.txt file2.txt</code> from the terminal. VS Code provides inline and side-by-side views, character-level highlighting, and integrates with Git for reviewing staged changes.',
    tool3: '<strong>Beyond Compare</strong>: A commercial diff tool with support for files, directories, FTP sites, and cloud storage. It offers three-way merge, folder synchronization, and hex comparison. Available for Windows, macOS, and Linux. Popular with teams that need advanced merging capabilities.',
    tool4: '<strong>Meld</strong>: A free, open-source visual diff and merge tool for Linux (also available on macOS and Windows). It supports two-way and three-way comparison of files and directories, with Git, Mercurial, Subversion, and Bazaar integration.',
    tool5: '<strong>WinMerge</strong>: A free, open-source diff and merge tool for Windows. It supports file and folder comparison, syntax highlighting, and shell integration. Its simplicity and reliability make it popular among Windows developers.',
    tool6: '<strong>diff command (Unix/Linux)</strong>: The original command-line diff tool. Available on every Unix-like system. While it lacks a graphical interface, it is fast, scriptable, and perfect for use in CI/CD pipelines and automated scripts.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I compare two text files online?',
    faq1_a: 'To compare two text files online, paste the contents of each file into a diff checker tool like our free Text Diff Checker. The tool will instantly highlight added lines (in green), removed lines (in red), and unchanged context lines. Most online diff tools support side-by-side and inline views, character-level highlighting, and options to ignore whitespace differences. For large files, you can also use command-line tools like diff or git diff locally.',
    faq2_q: 'What does + and - mean in diff output?',
    faq2_a: 'In unified diff format (used by git diff and most modern tools), lines starting with + (plus) indicate content that was added in the new version, and lines starting with - (minus) indicate content that was removed from the original version. Lines without a prefix are unchanged context lines. In color-coded displays, + lines are typically shown in green and - lines in red. The @@ markers at the beginning of each section (called a hunk) show the line numbers where the changes occur.',
    faq3_q: 'How does git diff work?',
    faq3_a: 'Git diff uses the Myers diff algorithm to find the minimal set of changes between two versions of a file. When you run git diff with no arguments, it compares the working directory with the staging area (index). git diff --staged compares the staging area with the last commit (HEAD). git diff HEAD compares the working directory with HEAD. You can also compare specific commits with git diff commit1 commit2, or specific files with git diff -- path/to/file. Git diff outputs in unified diff format showing file headers, hunk headers with line numbers, and changed lines prefixed with + or -.',
    conclusion: 'Understanding how to use a <strong>diff checker</strong> effectively is a fundamental skill for developers, writers, and system administrators. From reading Git diff output during code reviews to comparing configuration files before deployment, the ability to quickly <strong>find differences between two texts</strong> saves hours of manual comparison. Whether you prefer command-line tools like <code>diff</code> and <code>git diff</code>, or graphical tools with side-by-side views, mastering diff comparison will make you significantly more productive. Bookmark this guide for quick reference, and try our free online tool for instant text comparison.',
    linkToolBottom: 'Compare two texts instantly with our free online Diff Checker tool.',
  },
  zh: {
    intro: '<strong>Diff 检查器</strong>是每个开发者、作家和系统管理员工具箱中必不可少的工具。无论你需要<strong>比较两个文件</strong>、审查代码更改，还是<strong>找出两段文本之间的差异</strong>，理解 diff 算法的工作原理将大幅提升你的生产力。本综合指南涵盖了从<strong>文本 diff</strong> 算法基础到 Git、JavaScript、Python 和 Bash 实际代码示例的所有内容。如果你需要一个快速的<strong>在线 diff 检查器</strong>，我们的免费工具可以即时在线比较文本，支持语法高亮和并排视图。',
    linkTool: '立即试用我们的免费在线文本 Diff 检查工具。',
    h2_what: '什么是 Diff 检查器？',
    whatDesc1: '<strong>Diff 检查器</strong>（也称为<strong>文本比较</strong>工具或<strong>文件差异</strong>工具）是一种软件，它接受两段文本或两个文件作为输入，并识别它们之间的差异。输出通常称为"diff"或"补丁"，显示哪些行被添加、删除或修改。这个概念源于 1974 年 Douglas McIlroy 在 Unix 中创建的 <code>diff</code> 命令，此后它成为每个版本控制系统、代码审查工作流和文档比较工具的基础。',
    whatDesc2: '从本质上讲，<strong>diff 检查器</strong>解决的是高效回答"A 版本和 B 版本之间有什么变化？"的问题。这个看似简单的问题实际上是一个计算上很有趣的问题。diff 算法必须找到将文本 A 转换为文本 B 的最小编辑集（插入和删除）。这被称为<strong>编辑距离</strong>或<strong>最短编辑脚本</strong>问题，最常见的解决方案基于最长公共子序列（LCS）算法。',
    whatDesc3: '现代<strong>在线 diff 工具</strong>远不止简单的行比较。它们提供代码语法高亮、变更行内的字符级差异检测、并排和内联视图、忽略空白选项，甚至能理解编程语言结构的语义 diff 功能。无论你是在 PR 审查中进行<strong>代码 diff</strong>，还是在部署后比较配置文件，理解 diff 输出都是一项关键的开发者技能。',
    h2_algorithms: 'Diff 算法的工作原理',
    algoDesc1: '每个 <strong>diff 检查器</strong>的基础是<strong>最长公共子序列（LCS）</strong>算法。给定两个序列，LCS 找到在两个输入中以相同顺序出现的最长元素序列（但不一定是连续的）。一旦计算出 LCS，不在 LCS 中的所有内容就代表差异：仅在第一个输入中的元素是删除，仅在第二个输入中的元素是添加。',
    algoDesc2: '经典的 LCS 算法使用动态规划，时间复杂度为 O(n*m)，其中 n 和 m 是两个输入的长度。对于大文件，这可能很慢。1986 年，Eugene Myers 发表了一篇开创性论文，描述了一种在 O(n*d) 时间内找到最短编辑脚本的算法，其中 d 是差异的数量。由于大多数 diff 相对于总文件大小的变化较少，<strong>Myers 算法</strong>在实践中快得多。这是 Git 和大多数现代文本 diff 工具使用的算法。',
    algoDesc3: 'Myers 算法通过探索编辑操作图来工作。它处理两个输入，在编辑图中找到从左上角（两个文本的开头）到右下角（两个文本的结尾）的最短路径，其中水平移动表示删除，垂直移动表示插入，对角移动表示匹配字符或行。该算法使用巧妙的贪心方法结合线性空间优化来高效找到最优路径。',
    algoDesc4: '<strong>逐行与逐字符 diff</strong>：大多数工具首先在行级别比较以找到哪些行发生了变化，然后可选地在这些更改的行内执行字符级 diff，以精确高亮修改了哪些单词或字符。这种两遍方法既高效又能产生最可读的输出。一些专门工具还提供<strong>词级 diff</strong> 模式，在比较之前将行拆分为单词，为散文和文档产生更易读的输出。',
    h2_types: 'Diff 输出类型',
    typesDesc: '显示<strong>文本 diff</strong> 结果有几种标准格式。每种格式根据使用场景有其优势：',
    type1: '<strong>统一 Diff（Unified Diff）</strong>：最常见的格式，由 <code>git diff</code> 和大多数现代工具使用。用 <code>+</code>（添加）和 <code>-</code>（删除）前缀显示更改，每个更改周围有几行上下文。标头包含 <code>@@</code> 块标记，指示行号。这是补丁和代码审查的标准格式。',
    type2: '<strong>并排 Diff（Side-by-Side）</strong>：在两列中并排显示原始和修改后的文本，并高亮更改。这种格式在图形化 diff 工具和基于 Web 的代码审查平台中非常流行，因为它便于直观扫描更改。',
    type3: '<strong>内联 Diff（Inline）</strong>：在单列中交错显示旧版和新版，删除和添加以颜色编码（通常红色表示删除，绿色表示添加）。GitHub 使用此格式作为其代码审查视图选项之一。',
    type4: '<strong>上下文 Diff（Context Diff）</strong>：较旧的格式，用 <code>!</code> 标记更改的行，在 <code>***</code> 和 <code>---</code> 前缀的单独部分中显示前后版本。虽然今天不太常见，但一些遗留系统仍使用此格式。',
    type5: '<strong>词级 Diff（Word Diff）</strong>：不比较整行，而是比较单个单词。Git 通过 <code>git diff --word-diff</code> 支持此功能。这对于比较散文、文档或行内发生更改的内容特别有用。',
    h2_useCases: 'Diff 检查的常见使用场景',
    useCasesDesc: '<strong>Diff 检查</strong>和<strong>文本比较</strong>是许多专业工作流的重要组成部分：',
    useCase1: '<strong>代码审查</strong>：每个 Pull Request 和 Merge Request 本质上都是一个 diff。开发者审查代码 diff 输出以了解更改内容、验证正确性、提出改进建议并确保遵循编码标准。GitHub、GitLab 和 Bitbucket 都将 diff 作为代码审查的主要界面。',
    useCase2: '<strong>文档版本控制</strong>：作家、编辑和法律专业人士经常需要比较两个文件以跟踪文档修订之间的更改。无论是合同、规范还是博客文章草稿，文本比较工具都能轻松查看添加、删除或改写的内容。',
    useCase3: '<strong>配置文件更改</strong>：系统管理员在更改前后比较配置文件（nginx.conf、docker-compose.yml、.env 文件）以验证仅进行了预期的修改。配置文件中的一个错误字符可能导致生产故障，因此文件 diff 验证至关重要。',
    useCase4: '<strong>API 响应比较</strong>：测试 API 时，开发者经常需要比较不同环境（预发布与生产）或不同版本之间的 JSON 或 XML 响应。Diff 检查器帮助识别 API 输出中的意外更改。',
    useCase5: '<strong>合并冲突解决</strong>：当 Git 遇到来自不同分支的冲突更改时，它会呈现三向 diff，显示公共祖先、当前分支和传入分支。理解 diff 输出对于正确解决冲突而不丢失工作至关重要。',
    h2_codeExamples: 'Diff 检查器代码示例',
    codeGitTitle: 'Git Diff 命令',
    codeGitDesc: 'Git 拥有最强大的内置 diff 检查器。以下是每个开发者都应该知道的基本 <code>git diff</code> 命令：',
    codeJsTitle: 'JavaScript 文本 Diff（diff npm 包）',
    codeJsDesc: '<code>diff</code> npm 包是最流行的 JavaScript 库，用于以编程方式计算文本 diff 结果。它提供多种比较函数，支持不同粒度级别：',
    codePyTitle: 'Python Diff（difflib 模块）',
    codePyDesc: 'Python 在其标准库中包含强大的 <code>difflib</code> 模块。它提供用于比较序列的类和函数，包括生成统一 diff、上下文 diff，甚至可视化 HTML diff 报告：',
    codeBashTitle: 'Bash / Linux Diff 命令',
    codeBashDesc: 'Linux 和 macOS 提供了几种用于文本比较的命令行工具。经典的 <code>diff</code> 命令以及增强的替代方案涵盖了大多数使用场景：',
    h2_readDiff: '如何阅读 Diff 输出',
    readDiffDesc: '理解 diff 输出是一项基本的开发者技能。以下是统一 diff 格式的详解，这是你在 Git、代码审查和补丁文件中最常遇到的格式：',
    readDiffHeader: '<strong>文件头</strong>：diff 以 <code>--- a/file.txt</code>（原始文件）和 <code>+++ b/file.txt</code>（修改后文件）开始。在 Git 中，<code>a/</code> 和 <code>b/</code> 是表示前后版本的虚拟前缀。',
    readDiffHunk: '<strong>块头</strong>：以 <code>@@</code> 开头的行指示更改位置。格式 <code>@@ -start,count +start,count @@</code> 告诉你原始文件（以 <code>-</code> 为前缀）和修改后文件（以 <code>+</code> 为前缀）的行范围。例如 <code>@@ -10,7 +10,8 @@</code> 表示块在两个文件的第 10 行开始，原始显示 7 行，修改后显示 8 行。',
    readDiffLines: '<strong>更改行</strong>：以 <code>-</code> 开头的行（通常显示为红色）已从原始文件中删除。以 <code>+</code> 开头的行（通常显示为绿色）在新版本中添加。没有前缀的行是未更改的上下文行，帮助你在文件中定位更改。',
    readDiffPatch: '<strong>补丁文件</strong>：diff 可以保存为 <code>.patch</code> 文件，并使用 <code>git apply</code> 或 <code>patch -p1</code> 应用到原始文件的另一个副本。这是开源贡献者在没有直接仓库访问权限时共享更改的方式。',
    readDiffStat: '<strong>Diff 统计</strong>：使用 <code>git diff --stat</code> 查看更改摘要，显示每个文件的插入和删除数量以及可视化条形图。使用 <code>git diff --shortstat</code> 获取如 <code>3 files changed, 25 insertions(+), 10 deletions(-)</code> 的单行摘要。',
    h2_tools: '最佳 Diff 工具比较',
    toolsDesc: '以下是可用的最佳 diff 检查器工具比较，从我们的免费在线 diff 工具到强大的桌面应用：',
    tool1: '<strong>DevToolBox 文本 Diff（在线）</strong>：我们的免费在线 diff 检查器工具提供即时并排比较，支持语法高亮、更改行内的字符级 diff 以及大文本支持。无需安装，任何浏览器均可使用，数据完全在客户端处理，保护隐私。非常适合不离开浏览器的快速比较。',
    tool2: '<strong>VS Code 内置 Diff</strong>：Visual Studio Code 包含优秀的 diff 编辑器。右键点击文件选择"比较..."或从终端使用 <code>code --diff file1.txt file2.txt</code>。支持内联和并排视图、字符级高亮，并与 Git 集成以审查暂存更改。',
    tool3: '<strong>Beyond Compare</strong>：商业 diff 工具，支持文件、目录、FTP 站点和云存储。提供三向合并、文件夹同步和十六进制比较。适用于 Windows、macOS 和 Linux。',
    tool4: '<strong>Meld</strong>：免费开源的可视化 diff 和合并工具，主要用于 Linux（也可在 macOS 和 Windows 上使用）。支持文件和目录的双向和三向比较，集成 Git、Mercurial、Subversion。',
    tool5: '<strong>WinMerge</strong>：免费开源的 Windows diff 和合并工具。支持文件和文件夹比较、语法高亮和 Shell 集成。简单可靠，深受 Windows 开发者欢迎。',
    tool6: '<strong>diff 命令（Unix/Linux）</strong>：原始的命令行 diff 工具。在每个类 Unix 系统上都可用。虽然没有图形界面，但速度快、可脚本化，非常适合在 CI/CD 流水线和自动化脚本中使用。',
    h2_faq: '常见问题',
    faq1_q: '如何在线比较两个文本文件？',
    faq1_a: '要在线比较两个文本文件，将每个文件的内容粘贴到 diff 检查器工具中，如我们的免费文本 Diff 检查器。工具将即时高亮添加的行（绿色）、删除的行（红色）和未更改的上下文行。大多数在线 diff 工具支持并排和内联视图、字符级高亮以及忽略空白差异选项。对于大文件，也可以在本地使用 diff 或 git diff 等命令行工具。',
    faq2_q: 'diff 输出中的 + 和 - 是什么意思？',
    faq2_a: '在统一 diff 格式（git diff 和大多数现代工具使用的格式）中，以 +（加号）开头的行表示在新版本中添加的内容，以 -（减号）开头的行表示从原始版本中删除的内容。没有前缀的行是未更改的上下文行。在彩色显示中，+ 行通常显示为绿色，- 行显示为红色。每个部分开头的 @@ 标记（称为 hunk）显示更改发生的行号。',
    faq3_q: 'git diff 是如何工作的？',
    faq3_a: 'Git diff 使用 Myers diff 算法来查找文件两个版本之间的最小更改集。不带参数运行 git diff 时，它比较工作目录与暂存区（索引）。git diff --staged 比较暂存区与上次提交（HEAD）。git diff HEAD 比较工作目录与 HEAD。你也可以用 git diff commit1 commit2 比较特定提交，或用 git diff -- path/to/file 比较特定文件。Git diff 以统一 diff 格式输出，显示文件头、带行号的块头以及以 + 或 - 为前缀的更改行。',
    conclusion: '有效使用 <strong>diff 检查器</strong>是开发者、作家和系统管理员的基本技能。从代码审查中阅读 Git diff 输出到部署前比较配置文件，快速找出两段文本差异的能力可以节省大量手动比较时间。无论你偏好命令行工具如 <code>diff</code> 和 <code>git diff</code>，还是带并排视图的图形工具，掌握 diff 比较都将大幅提高你的生产力。收藏本指南以备参考，并使用我们的免费在线工具进行即时文本比较。',
    linkToolBottom: '使用我们的免费在线 Diff 检查工具即时比较两段文本。',
  },
  fr: {
    intro: 'Un <strong>diff checker</strong> est un outil essentiel pour chaque developpeur, redacteur et administrateur systeme. Que vous ayez besoin de <strong>comparer deux fichiers</strong>, revoir des modifications de code ou <strong>trouver les differences entre deux textes</strong>, comprendre les algorithmes de diff vous rendra considerablement plus productif. Ce guide complet couvre tout, des algorithmes de <strong>text diff</strong> aux exemples de code en Git, JavaScript, Python et Bash.',
    linkTool: 'Essayez notre outil gratuit de comparaison de texte en ligne.',
    h2_what: 'Qu\'est-ce qu\'un Diff Checker ?',
    whatDesc1: 'Un <strong>diff checker</strong> (ou outil de <strong>comparaison de texte</strong>) est un logiciel qui prend deux textes ou fichiers et identifie les differences entre eux. La sortie, appelee "diff" ou "patch", montre quelles lignes ont ete ajoutees, supprimees ou modifiees. Le concept est ne avec la commande <code>diff</code> Unix creee par Douglas McIlroy en 1974.',
    whatDesc2: 'Un <strong>diff checker</strong> resout le probleme de repondre a : "Qu\'est-ce qui a change entre la version A et la version B ?" L\'algorithme de diff doit trouver l\'ensemble minimal d\'editions (insertions et suppressions) qui transforme le texte A en texte B. Ceci est base sur l\'algorithme de la Plus Longue Sous-sequence Commune (LCS).',
    whatDesc3: 'Les <strong>outils de diff en ligne</strong> modernes offrent la coloration syntaxique, la detection de differences au niveau des caracteres, les vues cote a cote et en ligne, les options d\'ignorer les espaces, et meme des capacites de diff semantique.',
    h2_algorithms: 'Comment fonctionnent les algorithmes de diff',
    algoDesc1: 'La base de chaque diff checker est l\'algorithme de la <strong>Plus Longue Sous-sequence Commune (LCS)</strong>. Il trouve la plus longue sequence d\'elements apparaissant dans le meme ordre dans les deux entrees.',
    algoDesc2: 'L\'algorithme LCS classique a une complexite O(n*m). L\'<strong>algorithme de Myers</strong> (1986) trouve le script d\'edition le plus court en O(n*d), ou d est le nombre de differences. C\'est l\'algorithme utilise par Git.',
    algoDesc3: 'L\'algorithme de Myers explore un graphe d\'operations d\'edition, trouvant le chemin le plus court entre le debut et la fin des deux textes de maniere optimale.',
    algoDesc4: '<strong>Diff ligne par ligne vs caractere par caractere</strong> : La plupart des outils comparent d\'abord au niveau des lignes, puis effectuent un diff caractere par caractere dans les lignes modifiees pour une meilleure lisibilite.',
    h2_types: 'Types de sortie Diff',
    typesDesc: 'Il existe plusieurs formats standard pour afficher les resultats de diff :',
    type1: '<strong>Diff unifie</strong> : Le format le plus courant, utilise par <code>git diff</code>. Montre les changements avec les prefixes <code>+</code> et <code>-</code>, avec des marqueurs <code>@@</code>.',
    type2: '<strong>Diff cote a cote</strong> : Affiche le texte original et modifie dans deux colonnes adjacentes. Tres populaire dans les outils graphiques et les plateformes de revue de code.',
    type3: '<strong>Diff en ligne</strong> : Montre les versions anciennes et nouvelles entrelacees dans une seule colonne, avec un code couleur (rouge/vert).',
    type4: '<strong>Diff contextuel</strong> : Un format plus ancien utilisant <code>!</code> pour marquer les lignes modifiees avec des sections <code>***</code> et <code>---</code>.',
    type5: '<strong>Diff par mots</strong> : Compare des mots individuels plutot que des lignes entieres. Git le supporte avec <code>git diff --word-diff</code>.',
    h2_useCases: 'Cas d\'utilisation courants',
    useCasesDesc: 'La verification de diff et la comparaison de texte sont essentielles dans de nombreux workflows :',
    useCase1: '<strong>Revue de code</strong> : Chaque pull request est fondamentalement un diff. Les developpeurs examinent le diff pour comprendre les changements et verifier la qualite du code.',
    useCase2: '<strong>Gestion de versions de documents</strong> : Les redacteurs et juristes comparent frequemment deux fichiers pour suivre les modifications entre les revisions.',
    useCase3: '<strong>Modifications de fichiers de configuration</strong> : Les administrateurs comparent les fichiers de configuration avant et apres les changements pour verifier que seules les modifications prevues ont ete effectuees.',
    useCase4: '<strong>Comparaison de reponses API</strong> : Les developpeurs comparent les reponses JSON ou XML entre les environnements pour identifier les changements inattendus.',
    useCase5: '<strong>Resolution de conflits de fusion</strong> : Comprendre le diff est essentiel pour resoudre correctement les conflits Git sans perdre de travail.',
    h2_codeExamples: 'Exemples de code Diff',
    codeGitTitle: 'Commandes Git Diff',
    codeGitDesc: 'Git dispose du diff checker integre le plus puissant. Voici les commandes <code>git diff</code> essentielles :',
    codeJsTitle: 'JavaScript Text Diff (package npm diff)',
    codeJsDesc: 'Le package npm <code>diff</code> est la bibliotheque JavaScript la plus populaire pour calculer les differences de texte :',
    codePyTitle: 'Python Diff (module difflib)',
    codePyDesc: 'Python inclut le puissant module <code>difflib</code> dans sa bibliotheque standard pour comparer des sequences :',
    codeBashTitle: 'Bash / Linux Diff',
    codeBashDesc: 'Linux et macOS fournissent plusieurs outils en ligne de commande pour la comparaison de texte :',
    h2_readDiff: 'Comment lire la sortie Diff',
    readDiffDesc: 'Comprendre la sortie diff est une competence fondamentale. Voici le format diff unifie :',
    readDiffHeader: '<strong>En-tetes de fichier</strong> : Le diff commence par <code>--- a/file.txt</code> (original) et <code>+++ b/file.txt</code> (modifie).',
    readDiffHunk: '<strong>En-tetes de bloc</strong> : Les lignes <code>@@</code> indiquent l\'emplacement des changements avec le format <code>@@ -debut,nombre +debut,nombre @@</code>.',
    readDiffLines: '<strong>Lignes modifiees</strong> : Les lignes <code>-</code> (rouge) ont ete supprimees, les lignes <code>+</code> (vert) ont ete ajoutees. Les lignes sans prefixe sont du contexte.',
    readDiffPatch: '<strong>Fichiers patch</strong> : Un diff peut etre sauvegarde en <code>.patch</code> et applique avec <code>git apply</code> ou <code>patch -p1</code>.',
    readDiffStat: '<strong>Statistiques</strong> : Utilisez <code>git diff --stat</code> pour un resume des changements par fichier.',
    h2_tools: 'Comparaison des meilleurs outils Diff',
    toolsDesc: 'Voici les meilleurs outils diff disponibles :',
    tool1: '<strong>DevToolBox Text Diff (En ligne)</strong> : Notre outil gratuit offre une comparaison cote a cote instantanee avec coloration syntaxique et diff au niveau des caracteres.',
    tool2: '<strong>VS Code Diff integre</strong> : VS Code inclut un excellent editeur diff avec vues en ligne et cote a cote.',
    tool3: '<strong>Beyond Compare</strong> : Outil commercial avec fusion trois voies et synchronisation de dossiers.',
    tool4: '<strong>Meld</strong> : Outil libre de diff visuel pour Linux, macOS et Windows.',
    tool5: '<strong>WinMerge</strong> : Outil libre de diff pour Windows avec integration shell.',
    tool6: '<strong>Commande diff (Unix)</strong> : L\'outil diff original en ligne de commande, rapide et scriptable.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Comment comparer deux fichiers texte en ligne ?',
    faq1_a: 'Collez le contenu de chaque fichier dans un outil diff en ligne comme notre Text Diff Checker gratuit. L\'outil mettra en evidence les lignes ajoutees (vert), supprimees (rouge) et le contexte inchange. La plupart des outils supportent les vues cote a cote et en ligne.',
    faq2_q: 'Que signifient + et - dans la sortie diff ?',
    faq2_a: 'Dans le format diff unifie, les lignes commencant par + indiquent du contenu ajoute, et les lignes commencant par - indiquent du contenu supprime. Les lignes sans prefixe sont du contexte inchange. Les marqueurs @@ montrent les numeros de ligne.',
    faq3_q: 'Comment fonctionne git diff ?',
    faq3_a: 'Git diff utilise l\'algorithme de Myers pour trouver l\'ensemble minimal de changements entre deux versions. Sans arguments, il compare le repertoire de travail avec l\'index. git diff --staged compare l\'index avec HEAD. La sortie est en format diff unifie.',
    conclusion: 'Maitriser le diff est une competence fondamentale pour les developpeurs et administrateurs. Utilisez notre outil gratuit pour une comparaison instantanee.',
    linkToolBottom: 'Comparez deux textes instantanement avec notre outil Diff Checker gratuit.',
  },
  de: {
    intro: 'Ein <strong>Diff Checker</strong> ist ein unverzichtbares Werkzeug fur jeden Entwickler, Autor und Systemadministrator. Ob Sie <strong>zwei Dateien vergleichen</strong>, Code-Anderungen uberprufen oder <strong>Unterschiede zwischen zwei Texten finden</strong> mussen, das Verstandnis von Diff-Algorithmen wird Sie deutlich produktiver machen. Dieser umfassende Leitfaden behandelt alles von den Grundlagen der <strong>Text-Diff</strong>-Algorithmen bis zu praktischen Code-Beispielen in Git, JavaScript, Python und Bash.',
    linkTool: 'Testen Sie unser kostenloses Online-Text-Diff-Tool.',
    h2_what: 'Was ist ein Diff Checker?',
    whatDesc1: 'Ein <strong>Diff Checker</strong> (auch bekannt als <strong>Textvergleichs</strong>-Tool) ist eine Software, die zwei Texte oder Dateien vergleicht und die Unterschiede identifiziert. Die Ausgabe zeigt, welche Zeilen hinzugefugt, entfernt oder geandert wurden. Das Konzept stammt vom Unix-Befehl <code>diff</code>, der 1974 von Douglas McIlroy erstellt wurde.',
    whatDesc2: 'Ein Diff Checker beantwortet effizient die Frage: "Was hat sich zwischen Version A und Version B geandert?" Der Algorithmus muss die minimale Menge an Bearbeitungen finden, die Text A in Text B umwandelt, basierend auf dem LCS-Algorithmus (Langste Gemeinsame Teilfolge).',
    whatDesc3: 'Moderne <strong>Online-Diff-Tools</strong> bieten Syntaxhervorhebung, Erkennung von Unterschieden auf Zeichenebene, Seite-an-Seite- und Inline-Ansichten sowie semantische Diff-Funktionen.',
    h2_algorithms: 'Wie Diff-Algorithmen funktionieren',
    algoDesc1: 'Die Grundlage jedes Diff Checkers ist der <strong>LCS-Algorithmus (Langste Gemeinsame Teilfolge)</strong>. Er findet die langste Sequenz von Elementen, die in beiden Eingaben in derselben Reihenfolge erscheinen.',
    algoDesc2: 'Der klassische LCS-Algorithmus hat eine Komplexitat von O(n*m). Der <strong>Myers-Algorithmus</strong> (1986) findet das kurzeste Edit-Skript in O(n*d), wobei d die Anzahl der Unterschiede ist. Dieser wird von Git verwendet.',
    algoDesc3: 'Der Myers-Algorithmus exploriert einen Edit-Graphen und findet den kurzesten Pfad zwischen dem Anfang und Ende beider Texte.',
    algoDesc4: '<strong>Zeilen- vs. Zeichen-Diff</strong>: Die meisten Tools vergleichen zuerst auf Zeilenebene und fuhren dann einen Zeichen-Diff innerhalb geanderten Zeilen durch.',
    h2_types: 'Arten der Diff-Ausgabe',
    typesDesc: 'Es gibt mehrere Standardformate fur die Anzeige von Diff-Ergebnissen:',
    type1: '<strong>Unified Diff</strong>: Das gangigste Format, von <code>git diff</code> verwendet. Zeigt Anderungen mit <code>+</code> und <code>-</code> Prafixen und <code>@@</code> Markierungen.',
    type2: '<strong>Seite-an-Seite Diff</strong>: Zeigt Original und Anderung in zwei Spalten nebeneinander mit Hervorhebung.',
    type3: '<strong>Inline Diff</strong>: Zeigt alte und neue Versionen verschachtelt in einer Spalte mit Farbcodierung.',
    type4: '<strong>Kontext Diff</strong>: Ein alteres Format mit <code>!</code> fur geanderte Zeilen und <code>***</code>/<code>---</code> Abschnitten.',
    type5: '<strong>Wort-Diff</strong>: Vergleicht einzelne Worter statt ganzer Zeilen. Git unterstutzt dies mit <code>git diff --word-diff</code>.',
    h2_useCases: 'Haufige Anwendungsfalle',
    useCasesDesc: 'Diff-Prufung und Textvergleich sind in vielen Workflows unverzichtbar:',
    useCase1: '<strong>Code Review</strong>: Jeder Pull Request ist im Grunde ein Diff. Entwickler uberprufen die Diff-Ausgabe, um Anderungen zu verstehen und Codequalitat sicherzustellen.',
    useCase2: '<strong>Dokumenten-Versionierung</strong>: Autoren und Juristen vergleichen haufig Dateien, um Anderungen zwischen Revisionen zu verfolgen.',
    useCase3: '<strong>Konfigurationsanderungen</strong>: Administratoren vergleichen Konfigurationsdateien vor und nach Anderungen zur Verifizierung.',
    useCase4: '<strong>API-Antwortvergleich</strong>: Entwickler vergleichen JSON/XML-Antworten zwischen Umgebungen, um unerwartete Anderungen zu identifizieren.',
    useCase5: '<strong>Merge-Konfliktlosung</strong>: Das Verstandnis der Diff-Ausgabe ist entscheidend fur die korrekte Losung von Git-Konflikten.',
    h2_codeExamples: 'Diff Code-Beispiele',
    codeGitTitle: 'Git Diff Befehle',
    codeGitDesc: 'Git verfugt uber den leistungsfahigsten integrierten Diff Checker. Hier sind die wesentlichen <code>git diff</code>-Befehle:',
    codeJsTitle: 'JavaScript Text Diff (diff npm Paket)',
    codeJsDesc: 'Das <code>diff</code> npm-Paket ist die beliebteste JavaScript-Bibliothek fur Text-Diff-Berechnungen:',
    codePyTitle: 'Python Diff (difflib Modul)',
    codePyDesc: 'Python enthalt das leistungsstarke <code>difflib</code>-Modul in seiner Standardbibliothek:',
    codeBashTitle: 'Bash / Linux Diff Befehle',
    codeBashDesc: 'Linux und macOS bieten mehrere Kommandozeilen-Tools fur den Textvergleich:',
    h2_readDiff: 'Diff-Ausgabe lesen',
    readDiffDesc: 'Das Verstandnis der Diff-Ausgabe ist eine grundlegende Entwicklerfahigkeit. Hier ist das Unified-Diff-Format:',
    readDiffHeader: '<strong>Datei-Header</strong>: Der Diff beginnt mit <code>--- a/file.txt</code> (Original) und <code>+++ b/file.txt</code> (modifiziert).',
    readDiffHunk: '<strong>Hunk-Header</strong>: <code>@@</code>-Zeilen zeigen die Position der Anderungen im Format <code>@@ -start,anzahl +start,anzahl @@</code>.',
    readDiffLines: '<strong>Geanderte Zeilen</strong>: <code>-</code>-Zeilen (rot) wurden entfernt, <code>+</code>-Zeilen (grun) wurden hinzugefugt. Zeilen ohne Prafix sind Kontext.',
    readDiffPatch: '<strong>Patch-Dateien</strong>: Ein Diff kann als <code>.patch</code>-Datei gespeichert und mit <code>git apply</code> oder <code>patch -p1</code> angewendet werden.',
    readDiffStat: '<strong>Statistiken</strong>: Verwenden Sie <code>git diff --stat</code> fur eine Zusammenfassung der Anderungen pro Datei.',
    h2_tools: 'Vergleich der besten Diff-Tools',
    toolsDesc: 'Hier sind die besten verfugbaren Diff-Checker-Tools:',
    tool1: '<strong>DevToolBox Text Diff (Online)</strong>: Unser kostenloses Tool bietet sofortigen Seite-an-Seite-Vergleich mit Syntaxhervorhebung und Zeichen-Diff.',
    tool2: '<strong>VS Code integrierter Diff</strong>: VS Code enthalt einen hervorragenden Diff-Editor mit Inline- und Seite-an-Seite-Ansichten.',
    tool3: '<strong>Beyond Compare</strong>: Kommerzielles Diff-Tool mit Drei-Wege-Merge und Ordnersynchronisation.',
    tool4: '<strong>Meld</strong>: Kostenloses Open-Source Diff-Tool fur Linux, macOS und Windows.',
    tool5: '<strong>WinMerge</strong>: Kostenloses Open-Source Diff-Tool fur Windows mit Shell-Integration.',
    tool6: '<strong>diff-Befehl (Unix)</strong>: Das ursprungliche Kommandozeilen-Diff-Tool, schnell und skriptfahig.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Wie vergleiche ich zwei Textdateien online?',
    faq1_a: 'Fugen Sie den Inhalt jeder Datei in ein Diff-Checker-Tool wie unseren kostenlosen Text Diff Checker ein. Das Tool hebt hinzugefugte Zeilen (grun), entfernte Zeilen (rot) und unveranderten Kontext hervor. Die meisten Online-Tools unterstutzen Seite-an-Seite- und Inline-Ansichten.',
    faq2_q: 'Was bedeuten + und - in der Diff-Ausgabe?',
    faq2_a: 'Im Unified-Diff-Format zeigen Zeilen mit + hinzugefugten Inhalt und Zeilen mit - entfernten Inhalt an. Zeilen ohne Prafix sind unveranderter Kontext. Die @@-Markierungen zeigen die Zeilennummern der Anderungen.',
    faq3_q: 'Wie funktioniert git diff?',
    faq3_a: 'Git diff verwendet den Myers-Algorithmus, um die minimale Menge an Anderungen zwischen zwei Versionen zu finden. Ohne Argumente vergleicht es das Arbeitsverzeichnis mit dem Index. git diff --staged vergleicht den Index mit HEAD. Die Ausgabe ist im Unified-Diff-Format.',
    conclusion: 'Das Beherrschen von Diff-Tools ist eine grundlegende Fahigkeit fur Entwickler und Administratoren. Nutzen Sie unser kostenloses Tool fur sofortigen Textvergleich.',
    linkToolBottom: 'Vergleichen Sie zwei Texte sofort mit unserem kostenlosen Diff Checker Tool.',
  },
  es: {
    intro: 'Un <strong>diff checker</strong> es una herramienta esencial para cada desarrollador, escritor y administrador de sistemas. Ya sea que necesites <strong>comparar dos archivos</strong>, revisar cambios de codigo o <strong>encontrar diferencias entre dos textos</strong>, comprender los algoritmos de diff te hara significativamente mas productivo. Esta guia completa cubre desde los algoritmos de <strong>text diff</strong> hasta ejemplos de codigo en Git, JavaScript, Python y Bash.',
    linkTool: 'Prueba nuestra herramienta gratuita de comparacion de texto en linea.',
    h2_what: 'Que es un Diff Checker?',
    whatDesc1: 'Un <strong>diff checker</strong> (tambien conocido como herramienta de <strong>comparacion de texto</strong>) es un software que toma dos textos o archivos e identifica las diferencias entre ellos. La salida muestra que lineas fueron agregadas, eliminadas o modificadas. El concepto se origino con el comando <code>diff</code> de Unix creado por Douglas McIlroy en 1974.',
    whatDesc2: 'Un diff checker resuelve el problema de responder eficientemente: "Que cambio entre la version A y la version B?" El algoritmo debe encontrar el conjunto minimo de ediciones que transforme el texto A en el texto B, basado en el algoritmo LCS (Subsecuencia Comun Mas Larga).',
    whatDesc3: 'Las <strong>herramientas de diff en linea</strong> modernas ofrecen resaltado de sintaxis, deteccion de diferencias a nivel de caracteres, vistas lado a lado y en linea, y capacidades de diff semantico.',
    h2_algorithms: 'Como funcionan los algoritmos de diff',
    algoDesc1: 'La base de cada diff checker es el algoritmo <strong>LCS (Subsecuencia Comun Mas Larga)</strong>. Encuentra la secuencia mas larga de elementos que aparecen en el mismo orden en ambas entradas.',
    algoDesc2: 'El algoritmo LCS clasico tiene complejidad O(n*m). El <strong>algoritmo de Myers</strong> (1986) encuentra el script de edicion mas corto en O(n*d), donde d es el numero de diferencias. Es el algoritmo usado por Git.',
    algoDesc3: 'El algoritmo de Myers explora un grafo de operaciones de edicion y encuentra el camino mas corto de manera optima.',
    algoDesc4: '<strong>Diff linea por linea vs caracter por caracter</strong>: La mayoria de herramientas primero comparan a nivel de lineas y luego hacen un diff de caracteres dentro de las lineas modificadas.',
    h2_types: 'Tipos de salida Diff',
    typesDesc: 'Existen varios formatos estandar para mostrar resultados de diff:',
    type1: '<strong>Diff unificado</strong>: El formato mas comun, usado por <code>git diff</code>. Muestra cambios con prefijos <code>+</code> y <code>-</code>, con marcadores <code>@@</code>.',
    type2: '<strong>Diff lado a lado</strong>: Muestra el texto original y modificado en dos columnas adyacentes con cambios resaltados.',
    type3: '<strong>Diff en linea</strong>: Muestra versiones antigua y nueva entrelazadas en una sola columna con codigo de colores.',
    type4: '<strong>Diff contextual</strong>: Un formato antiguo que usa <code>!</code> para lineas modificadas con secciones <code>***</code> y <code>---</code>.',
    type5: '<strong>Diff por palabras</strong>: Compara palabras individuales en lugar de lineas completas. Git lo soporta con <code>git diff --word-diff</code>.',
    h2_useCases: 'Casos de uso comunes',
    useCasesDesc: 'La verificacion de diff y la comparacion de texto son parte integral de muchos flujos de trabajo:',
    useCase1: '<strong>Revision de codigo</strong>: Cada pull request es fundamentalmente un diff. Los desarrolladores revisan el diff para entender cambios y verificar calidad.',
    useCase2: '<strong>Versionado de documentos</strong>: Escritores y profesionales legales frecuentemente comparan archivos para rastrear cambios entre revisiones.',
    useCase3: '<strong>Cambios en archivos de configuracion</strong>: Los administradores comparan archivos de configuracion antes y despues de los cambios para verificacion.',
    useCase4: '<strong>Comparacion de respuestas API</strong>: Los desarrolladores comparan respuestas JSON/XML entre entornos para identificar cambios inesperados.',
    useCase5: '<strong>Resolucion de conflictos de merge</strong>: Comprender el diff es esencial para resolver correctamente conflictos de Git.',
    h2_codeExamples: 'Ejemplos de codigo Diff',
    codeGitTitle: 'Comandos Git Diff',
    codeGitDesc: 'Git tiene el diff checker integrado mas poderoso. Aqui estan los comandos <code>git diff</code> esenciales:',
    codeJsTitle: 'JavaScript Text Diff (paquete npm diff)',
    codeJsDesc: 'El paquete npm <code>diff</code> es la biblioteca JavaScript mas popular para calcular diferencias de texto:',
    codePyTitle: 'Python Diff (modulo difflib)',
    codePyDesc: 'Python incluye el poderoso modulo <code>difflib</code> en su biblioteca estandar:',
    codeBashTitle: 'Bash / Linux Diff',
    codeBashDesc: 'Linux y macOS proporcionan varias herramientas de linea de comandos para comparacion de texto:',
    h2_readDiff: 'Como leer la salida Diff',
    readDiffDesc: 'Entender la salida diff es una habilidad fundamental. Aqui esta el formato diff unificado:',
    readDiffHeader: '<strong>Encabezados de archivo</strong>: El diff comienza con <code>--- a/file.txt</code> (original) y <code>+++ b/file.txt</code> (modificado).',
    readDiffHunk: '<strong>Encabezados de bloque</strong>: Las lineas <code>@@</code> indican la ubicacion de los cambios con formato <code>@@ -inicio,cantidad +inicio,cantidad @@</code>.',
    readDiffLines: '<strong>Lineas modificadas</strong>: Las lineas <code>-</code> (rojo) fueron eliminadas, las lineas <code>+</code> (verde) fueron agregadas. Las lineas sin prefijo son contexto.',
    readDiffPatch: '<strong>Archivos patch</strong>: Un diff puede guardarse como <code>.patch</code> y aplicarse con <code>git apply</code> o <code>patch -p1</code>.',
    readDiffStat: '<strong>Estadisticas</strong>: Use <code>git diff --stat</code> para un resumen de cambios por archivo.',
    h2_tools: 'Comparacion de las mejores herramientas Diff',
    toolsDesc: 'Aqui estan las mejores herramientas diff disponibles:',
    tool1: '<strong>DevToolBox Text Diff (Online)</strong>: Nuestra herramienta gratuita ofrece comparacion lado a lado instantanea con resaltado de sintaxis y diff a nivel de caracteres.',
    tool2: '<strong>VS Code Diff integrado</strong>: VS Code incluye un excelente editor diff con vistas en linea y lado a lado.',
    tool3: '<strong>Beyond Compare</strong>: Herramienta comercial con merge de tres vias y sincronizacion de carpetas.',
    tool4: '<strong>Meld</strong>: Herramienta libre de diff visual para Linux, macOS y Windows.',
    tool5: '<strong>WinMerge</strong>: Herramienta libre de diff para Windows con integracion shell.',
    tool6: '<strong>Comando diff (Unix)</strong>: La herramienta diff original de linea de comandos, rapida y scriptable.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Como comparo dos archivos de texto en linea?',
    faq1_a: 'Pegue el contenido de cada archivo en una herramienta diff en linea como nuestro Text Diff Checker gratuito. La herramienta resaltara las lineas agregadas (verde), eliminadas (rojo) y contexto sin cambios. La mayoria soporta vistas lado a lado y en linea.',
    faq2_q: 'Que significan + y - en la salida diff?',
    faq2_a: 'En el formato diff unificado, las lineas con + indican contenido agregado y las lineas con - indican contenido eliminado. Las lineas sin prefijo son contexto sin cambios. Los marcadores @@ muestran los numeros de linea.',
    faq3_q: 'Como funciona git diff?',
    faq3_a: 'Git diff usa el algoritmo de Myers para encontrar el conjunto minimo de cambios entre dos versiones. Sin argumentos, compara el directorio de trabajo con el index. git diff --staged compara el index con HEAD. La salida es en formato diff unificado.',
    conclusion: 'Dominar las herramientas diff es una habilidad fundamental para desarrolladores y administradores. Use nuestra herramienta gratuita para comparacion instantanea de texto.',
    linkToolBottom: 'Compare dos textos instantaneamente con nuestra herramienta Diff Checker gratuita.',
  },
  ja: {
    intro: '<strong>Diff チェッカー</strong>は、すべての開発者、ライター、システム管理者のツールキットに不可欠なツールです。<strong>2つのファイルを比較</strong>したり、コード変更をレビューしたり、<strong>2つのテキスト間の違いを見つけ</strong>たりする必要がある場合、diffアルゴリズムの仕組みを理解することで生産性が大幅に向上します。この包括的なガイドでは、<strong>テキストdiff</strong>アルゴリズムの基礎からGit、JavaScript、Python、Bashの実用的なコード例まですべてをカバーします。',
    linkTool: '無料オンラインテキストDiffチェッカーツールをお試しください。',
    h2_what: 'Diff チェッカーとは？',
    whatDesc1: '<strong>Diff チェッカー</strong>（<strong>テキスト比較</strong>ツールとも呼ばれる）は、2つのテキストまたはファイルを入力として受け取り、それらの間の違いを特定するソフトウェアです。出力は追加、削除、変更された行を示します。このコンセプトは1974年にDouglas McIlroyが作成したUnixの<code>diff</code>コマンドに由来します。',
    whatDesc2: 'Diffチェッカーは「バージョンAとバージョンBの間で何が変わったか？」という問題を効率的に解決します。diffアルゴリズムはテキストAをテキストBに変換する最小の編集セットを見つける必要があり、LCS（最長共通部分列）アルゴリズムに基づいています。',
    whatDesc3: '最新の<strong>オンラインdiffツール</strong>は、シンタックスハイライト、文字レベルの差分検出、サイドバイサイドおよびインラインビュー、空白無視オプション、セマンティックdiff機能を提供します。',
    h2_algorithms: 'Diffアルゴリズムの仕組み',
    algoDesc1: 'すべてのdiffチェッカーの基盤は<strong>LCS（最長共通部分列）</strong>アルゴリズムです。2つの入力で同じ順序で現れる最長の要素列を見つけます。',
    algoDesc2: '古典的なLCSアルゴリズムの計算量はO(n*m)です。<strong>Myersアルゴリズム</strong>（1986年）は差異数dに対してO(n*d)で最短編集スクリプトを見つけます。これがGitで使用されているアルゴリズムです。',
    algoDesc3: 'Myersアルゴリズムは編集操作のグラフを探索し、両テキストの最初から最後までの最短パスを最適に見つけます。',
    algoDesc4: '<strong>行単位vs文字単位のdiff</strong>：ほとんどのツールはまず行レベルで比較し、変更された行内で文字レベルのdiffを実行して読みやすい出力を生成します。',
    h2_types: 'Diff出力の種類',
    typesDesc: 'diff結果の表示にはいくつかの標準フォーマットがあります：',
    type1: '<strong>Unified Diff</strong>：<code>git diff</code>で使用される最も一般的なフォーマット。<code>+</code>と<code>-</code>プレフィックスと<code>@@</code>マーカーで変更を表示します。',
    type2: '<strong>サイドバイサイドDiff</strong>：元のテキストと変更後のテキストを2列に並べて表示し、変更をハイライトします。',
    type3: '<strong>インラインDiff</strong>：古いバージョンと新しいバージョンを1列に交互に表示し、色分け（赤/緑）します。',
    type4: '<strong>コンテキストDiff</strong>：<code>!</code>で変更行をマークし、<code>***</code>と<code>---</code>セクションを持つ古いフォーマット。',
    type5: '<strong>ワードDiff</strong>：行全体ではなく個々の単語を比較します。Gitは<code>git diff --word-diff</code>でサポートしています。',
    h2_useCases: '一般的なユースケース',
    useCasesDesc: 'Diff チェックとテキスト比較は多くのプロフェッショナルなワークフローに不可欠です：',
    useCase1: '<strong>コードレビュー</strong>：すべてのプルリクエストは基本的にdiffです。開発者は変更を理解しコード品質を確認するためにdiff出力をレビューします。',
    useCase2: '<strong>ドキュメントバージョニング</strong>：ライターや法律専門家はリビジョン間の変更を追跡するためにファイルを頻繁に比較します。',
    useCase3: '<strong>設定ファイルの変更</strong>：管理者は変更前後の設定ファイルを比較して、意図した変更のみが行われたことを確認します。',
    useCase4: '<strong>APIレスポンス比較</strong>：開発者は環境間のJSON/XMLレスポンスを比較して予期しない変更を特定します。',
    useCase5: '<strong>マージコンフリクト解決</strong>：diff出力の理解はGitコンフリクトを正しく解決するために不可欠です。',
    h2_codeExamples: 'Diffコード例',
    codeGitTitle: 'Git Diffコマンド',
    codeGitDesc: 'Gitには最も強力な組み込みdiffチェッカーがあります。必須の<code>git diff</code>コマンドをご紹介します：',
    codeJsTitle: 'JavaScript テキストDiff（diff npmパッケージ）',
    codeJsDesc: '<code>diff</code> npmパッケージはテキストdiff計算のための最も人気のあるJavaScriptライブラリです：',
    codePyTitle: 'Python Diff（difflibモジュール）',
    codePyDesc: 'Pythonは標準ライブラリに強力な<code>difflib</code>モジュールを含んでいます：',
    codeBashTitle: 'Bash / Linux Diffコマンド',
    codeBashDesc: 'LinuxとmacOSはテキスト比較のための複数のコマンドラインツールを提供します：',
    h2_readDiff: 'Diff出力の読み方',
    readDiffDesc: 'diff出力の理解は基本的な開発者スキルです。Unified Diffフォーマットを解説します：',
    readDiffHeader: '<strong>ファイルヘッダー</strong>：diffは<code>--- a/file.txt</code>（元のファイル）と<code>+++ b/file.txt</code>（変更後のファイル）で始まります。',
    readDiffHunk: '<strong>ハンクヘッダー</strong>：<code>@@</code>行は<code>@@ -開始,行数 +開始,行数 @@</code>のフォーマットで変更の位置を示します。',
    readDiffLines: '<strong>変更行</strong>：<code>-</code>行（赤）は削除、<code>+</code>行（緑）は追加。プレフィックスなしの行はコンテキストです。',
    readDiffPatch: '<strong>パッチファイル</strong>：diffは<code>.patch</code>ファイルとして保存し、<code>git apply</code>や<code>patch -p1</code>で適用できます。',
    readDiffStat: '<strong>統計</strong>：<code>git diff --stat</code>でファイルごとの変更概要を表示できます。',
    h2_tools: '最適なDiffツール比較',
    toolsDesc: '利用可能な最適なdiffチェッカーツールの比較です：',
    tool1: '<strong>DevToolBox テキストDiff（オンライン）</strong>：無料のオンラインdiffツールで、シンタックスハイライト付きの即時サイドバイサイド比較を提供します。',
    tool2: '<strong>VS Code内蔵Diff</strong>：VS Codeにはインラインとサイドバイサイドビューを備えた優れたdiffエディタが含まれています。',
    tool3: '<strong>Beyond Compare</strong>：3方向マージとフォルダ同期を備えた商用diffツール。',
    tool4: '<strong>Meld</strong>：Linux、macOS、Windows向けの無料オープンソースビジュアルdiffツール。',
    tool5: '<strong>WinMerge</strong>：シェル統合を備えたWindows向け無料オープンソースdiffツール。',
    tool6: '<strong>diffコマンド（Unix）</strong>：高速でスクリプト可能なオリジナルのコマンドラインdiffツール。',
    h2_faq: 'よくある質問',
    faq1_q: 'オンラインで2つのテキストファイルを比較するには？',
    faq1_a: '無料のText Diff Checkerのようなオンラインdiffツールに各ファイルの内容を貼り付けてください。ツールは追加行（緑）、削除行（赤）、変更なしのコンテキスト行を即座にハイライトします。ほとんどのオンラインツールはサイドバイサイドとインラインビューをサポートしています。',
    faq2_q: 'diff出力の + と - は何を意味しますか？',
    faq2_a: 'Unified Diffフォーマットで、+で始まる行は追加されたコンテンツ、-で始まる行は削除されたコンテンツを示します。プレフィックスなしの行は変更のないコンテキストです。@@マーカーは変更が発生する行番号を示します。',
    faq3_q: 'git diffはどのように動作しますか？',
    faq3_a: 'Git diffはMyersアルゴリズムを使用して2つのバージョン間の最小の変更セットを見つけます。引数なしの場合、作業ディレクトリとインデックスを比較します。git diff --stagedはインデックスとHEADを比較します。出力はUnified Diffフォーマットです。',
    conclusion: 'Diffツールの効果的な使用は、開発者と管理者にとって基本的なスキルです。無料のオンラインツールで即座にテキスト比較を行えます。',
    linkToolBottom: '無料オンラインDiffチェッカーツールで2つのテキストを即座に比較。',
  },
  ko: {
    intro: '<strong>Diff 체커</strong>는 모든 개발자, 작가, 시스템 관리자에게 필수적인 도구입니다. <strong>두 파일을 비교</strong>하거나, 코드 변경을 검토하거나, <strong>두 텍스트 간의 차이를 찾</strong>아야 할 때, diff 알고리즘의 작동 방식을 이해하면 생산성이 크게 향상됩니다. 이 종합 가이드는 <strong>텍스트 diff</strong> 알고리즘의 기초부터 Git, JavaScript, Python, Bash의 실용적인 코드 예제까지 모두 다룹니다.',
    linkTool: '무료 온라인 텍스트 Diff 체커 도구를 사용해 보세요.',
    h2_what: 'Diff 체커란?',
    whatDesc1: '<strong>Diff 체커</strong>(<strong>텍스트 비교</strong> 도구라고도 함)는 두 텍스트 또는 파일을 입력으로 받아 차이점을 식별하는 소프트웨어입니다. 출력은 추가, 삭제 또는 수정된 줄을 보여줍니다. 이 개념은 1974년 Douglas McIlroy가 만든 Unix <code>diff</code> 명령에서 시작되었습니다.',
    whatDesc2: 'Diff 체커는 "버전 A와 버전 B 사이에 무엇이 변경되었는가?"라는 질문에 효율적으로 답합니다. diff 알고리즘은 텍스트 A를 텍스트 B로 변환하는 최소 편집 세트를 찾아야 하며, LCS(최장 공통 부분 수열) 알고리즘을 기반으로 합니다.',
    whatDesc3: '최신 <strong>온라인 diff 도구</strong>는 구문 강조, 문자 수준 차이 감지, 나란히 보기 및 인라인 보기, 공백 무시 옵션, 시맨틱 diff 기능을 제공합니다.',
    h2_algorithms: 'Diff 알고리즘 작동 방식',
    algoDesc1: '모든 diff 체커의 기반은 <strong>LCS(최장 공통 부분 수열)</strong> 알고리즘입니다. 두 입력에서 같은 순서로 나타나는 가장 긴 요소 시퀀스를 찾습니다.',
    algoDesc2: '클래식 LCS 알고리즘의 시간 복잡도는 O(n*m)입니다. <strong>Myers 알고리즘</strong>(1986)은 차이 수 d에 대해 O(n*d)로 최단 편집 스크립트를 찾습니다. Git이 사용하는 알고리즘입니다.',
    algoDesc3: 'Myers 알고리즘은 편집 연산 그래프를 탐색하여 두 텍스트의 시작부터 끝까지 최단 경로를 최적으로 찾습니다.',
    algoDesc4: '<strong>줄 단위 vs 문자 단위 diff</strong>: 대부분의 도구는 먼저 줄 수준에서 비교한 후, 변경된 줄 내에서 문자 수준 diff를 수행하여 읽기 쉬운 출력을 생성합니다.',
    h2_types: 'Diff 출력 유형',
    typesDesc: 'diff 결과를 표시하는 여러 표준 형식이 있습니다:',
    type1: '<strong>Unified Diff</strong>: <code>git diff</code>에서 사용하는 가장 일반적인 형식. <code>+</code>와 <code>-</code> 접두사와 <code>@@</code> 마커로 변경을 표시합니다.',
    type2: '<strong>나란히 보기 Diff</strong>: 원본과 수정된 텍스트를 두 열에 나란히 표시하고 변경을 강조합니다.',
    type3: '<strong>인라인 Diff</strong>: 이전 버전과 새 버전을 한 열에 번갈아 표시하며 색상 코드(빨강/초록)를 사용합니다.',
    type4: '<strong>컨텍스트 Diff</strong>: <code>!</code>로 변경된 줄을 표시하고 <code>***</code>와 <code>---</code> 섹션을 가진 이전 형식.',
    type5: '<strong>워드 Diff</strong>: 전체 줄이 아닌 개별 단어를 비교합니다. Git은 <code>git diff --word-diff</code>으로 지원합니다.',
    h2_useCases: '일반적인 사용 사례',
    useCasesDesc: 'Diff 체크와 텍스트 비교는 많은 전문적인 워크플로에 필수적입니다:',
    useCase1: '<strong>코드 리뷰</strong>: 모든 풀 리퀘스트는 기본적으로 diff입니다. 개발자는 변경 사항을 이해하고 코드 품질을 확인하기 위해 diff 출력을 검토합니다.',
    useCase2: '<strong>문서 버전 관리</strong>: 작가와 법률 전문가는 리비전 간 변경 사항을 추적하기 위해 파일을 자주 비교합니다.',
    useCase3: '<strong>설정 파일 변경</strong>: 관리자는 변경 전후 설정 파일을 비교하여 의도한 수정만 이루어졌는지 확인합니다.',
    useCase4: '<strong>API 응답 비교</strong>: 개발자는 환경 간 JSON/XML 응답을 비교하여 예상치 못한 변경을 식별합니다.',
    useCase5: '<strong>머지 충돌 해결</strong>: diff 출력 이해는 Git 충돌을 올바르게 해결하는 데 필수적입니다.',
    h2_codeExamples: 'Diff 코드 예제',
    codeGitTitle: 'Git Diff 명령어',
    codeGitDesc: 'Git에는 가장 강력한 내장 diff 체커가 있습니다. 필수 <code>git diff</code> 명령어를 소개합니다:',
    codeJsTitle: 'JavaScript 텍스트 Diff (diff npm 패키지)',
    codeJsDesc: '<code>diff</code> npm 패키지는 텍스트 diff 계산을 위한 가장 인기 있는 JavaScript 라이브러리입니다:',
    codePyTitle: 'Python Diff (difflib 모듈)',
    codePyDesc: 'Python은 표준 라이브러리에 강력한 <code>difflib</code> 모듈을 포함하고 있습니다:',
    codeBashTitle: 'Bash / Linux Diff 명령어',
    codeBashDesc: 'Linux와 macOS는 텍스트 비교를 위한 여러 명령줄 도구를 제공합니다:',
    h2_readDiff: 'Diff 출력 읽는 방법',
    readDiffDesc: 'diff 출력 이해는 기본적인 개발자 스킬입니다. Unified Diff 형식을 설명합니다:',
    readDiffHeader: '<strong>파일 헤더</strong>: diff는 <code>--- a/file.txt</code>(원본)와 <code>+++ b/file.txt</code>(수정본)로 시작합니다.',
    readDiffHunk: '<strong>헝크 헤더</strong>: <code>@@</code> 줄은 <code>@@ -시작,개수 +시작,개수 @@</code> 형식으로 변경 위치를 표시합니다.',
    readDiffLines: '<strong>변경된 줄</strong>: <code>-</code> 줄(빨강)은 삭제, <code>+</code> 줄(초록)은 추가. 접두사 없는 줄은 컨텍스트입니다.',
    readDiffPatch: '<strong>패치 파일</strong>: diff를 <code>.patch</code> 파일로 저장하고 <code>git apply</code>나 <code>patch -p1</code>로 적용할 수 있습니다.',
    readDiffStat: '<strong>통계</strong>: <code>git diff --stat</code>으로 파일별 변경 요약을 확인할 수 있습니다.',
    h2_tools: '최고의 Diff 도구 비교',
    toolsDesc: '사용 가능한 최고의 diff 체커 도구 비교입니다:',
    tool1: '<strong>DevToolBox 텍스트 Diff(온라인)</strong>: 무료 온라인 diff 도구로, 구문 강조와 문자 수준 diff가 포함된 즉시 나란히 비교를 제공합니다.',
    tool2: '<strong>VS Code 내장 Diff</strong>: VS Code에는 인라인과 나란히 보기를 갖춘 우수한 diff 편집기가 포함되어 있습니다.',
    tool3: '<strong>Beyond Compare</strong>: 3방향 머지와 폴더 동기화를 지원하는 상용 diff 도구.',
    tool4: '<strong>Meld</strong>: Linux, macOS, Windows용 무료 오픈소스 비주얼 diff 도구.',
    tool5: '<strong>WinMerge</strong>: 셸 통합을 갖춘 Windows용 무료 오픈소스 diff 도구.',
    tool6: '<strong>diff 명령어(Unix)</strong>: 빠르고 스크립팅 가능한 오리지널 명령줄 diff 도구.',
    h2_faq: '자주 묻는 질문',
    faq1_q: '온라인에서 두 텍스트 파일을 비교하려면?',
    faq1_a: '무료 Text Diff Checker와 같은 온라인 diff 도구에 각 파일의 내용을 붙여넣으세요. 도구가 추가된 줄(초록), 삭제된 줄(빨강), 변경되지 않은 컨텍스트 줄을 즉시 강조합니다. 대부분의 온라인 도구는 나란히 보기와 인라인 보기를 지원합니다.',
    faq2_q: 'diff 출력에서 +와 -는 무엇을 의미하나요?',
    faq2_a: 'Unified Diff 형식에서 +로 시작하는 줄은 추가된 콘텐츠, -로 시작하는 줄은 삭제된 콘텐츠를 나타냅니다. 접두사 없는 줄은 변경되지 않은 컨텍스트입니다. @@ 마커는 변경이 발생하는 줄 번호를 보여줍니다.',
    faq3_q: 'git diff는 어떻게 작동하나요?',
    faq3_a: 'Git diff는 Myers 알고리즘을 사용하여 두 버전 간의 최소 변경 세트를 찾습니다. 인수 없이 실행하면 작업 디렉토리와 인덱스를 비교합니다. git diff --staged는 인덱스와 HEAD를 비교합니다. 출력은 Unified Diff 형식입니다.',
    conclusion: 'Diff 도구의 효과적인 사용은 개발자와 관리자에게 기본적인 스킬입니다. 무료 온라인 도구로 즉시 텍스트 비교를 수행하세요.',
    linkToolBottom: '무료 온라인 Diff 체커 도구로 두 텍스트를 즉시 비교하세요.',
  },
};

export default function DiffCheckerTextCompareGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/text-diff`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What Is a Diff Checker? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: How Diff Algorithms Work */}
      <h2>{s.h2_algorithms}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.algoDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.algoDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.algoDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.algoDesc4 }} />

      {/* Section 3: Types of Diff Output */}
      <h2>{s.h2_types}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.typesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.type1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.type2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.type3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.type4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.type5 }} />

      {/* Section 4: Common Use Cases */}
      <h2>{s.h2_useCases}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.useCasesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase5 }} />

      {/* Section 5: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codeGitTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeGitDesc }} />
      <pre><code>{`# ===== Basic git diff commands =====

# Compare working directory with staging area (unstaged changes)
git diff

# Compare staging area with last commit (staged changes)
git diff --staged
# or equivalently:
git diff --cached

# Compare working directory with last commit (all changes)
git diff HEAD

# Compare two specific commits
git diff abc1234 def5678

# Compare current branch with another branch
git diff main..feature-branch

# Compare a specific file between commits
git diff HEAD~3 HEAD -- src/app.js

# ===== Advanced git diff options =====

# Word-level diff (great for prose and documentation)
git diff --word-diff
# Output: [-old word-]{+new word+}

# Word diff with color only (no markers)
git diff --word-diff=color

# Show only file names that changed
git diff --name-only HEAD~5

# Show file names with change status (Added/Modified/Deleted)
git diff --name-status main..feature

# Show diff statistics (insertions/deletions per file)
git diff --stat
# Output:
#  src/app.js    | 15 +++++++++------
#  src/utils.js  |  8 +++++---
#  2 files changed, 14 insertions(+), 9 deletions(-)

# One-line summary of changes
git diff --shortstat
# Output: 2 files changed, 14 insertions(+), 9 deletions(-)

# Ignore whitespace changes
git diff -w
# or: git diff --ignore-all-space

# Ignore blank line changes
git diff --ignore-blank-lines

# Show diff with 10 lines of context (default is 3)
git diff -U10

# Generate a patch file
git diff > my-changes.patch

# Apply a patch file
git apply my-changes.patch

# Check if a patch applies cleanly (dry run)
git apply --check my-changes.patch`}</code></pre>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`// npm install diff
const Diff = require('diff');

const oldText = \`function greet(name) {
  console.log("Hello, " + name);
  return true;
}\`;

const newText = \`function greet(name, greeting) {
  console.log(greeting + ", " + name + "!");
  return true;
}\`;

// ===== Line-by-line diff =====
const lineDiff = Diff.diffLines(oldText, newText);
lineDiff.forEach(part => {
  const prefix = part.added ? '+' : part.removed ? '-' : ' ';
  const lines = part.value.split('\\n').filter(l => l);
  lines.forEach(line => console.log(prefix + ' ' + line));
});
// Output:
// - function greet(name) {
// + function greet(name, greeting) {
// -   console.log("Hello, " + name);
// +   console.log(greeting + ", " + name + "!");
//     return true;
//   }

// ===== Character-level diff =====
const charDiff = Diff.diffChars('hello world', 'hello there');
charDiff.forEach(part => {
  const color = part.added ? '\\x1b[32m' : part.removed ? '\\x1b[31m' : '';
  process.stdout.write(color + part.value + '\\x1b[0m');
});
// Highlights exact character changes

// ===== Word-level diff =====
const wordDiff = Diff.diffWords(
  'The quick brown fox jumps over the lazy dog',
  'The slow brown fox leaps over the tired dog'
);
wordDiff.forEach(part => {
  if (part.added) console.log('[+] ' + part.value);
  else if (part.removed) console.log('[-] ' + part.value);
});

// ===== Generate unified patch =====
const patch = Diff.createPatch(
  'greeting.js',  // filename
  oldText,         // old content
  newText,         // new content
  'original',      // old header
  'modified'       // new header
);
console.log(patch);
// Output: standard unified diff format

// ===== Apply a patch =====
const applied = Diff.applyPatch(oldText, patch);
console.log(applied === newText); // true

// ===== Structured patch for multiple files =====
const structuredPatch = Diff.structuredPatch(
  'old/file.js', 'new/file.js',
  oldText, newText, '', ''
);
console.log(JSON.stringify(structuredPatch.hunks, null, 2));`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`import difflib

old_text = """function greet(name) {
  console.log("Hello, " + name);
  return true;
}""".splitlines(keepends=True)

new_text = """function greet(name, greeting) {
  console.log(greeting + ", " + name + "!");
  return true;
}""".splitlines(keepends=True)

# ===== Unified diff (most common format) =====
diff = difflib.unified_diff(
    old_text, new_text,
    fromfile='greeting.js.orig',
    tofile='greeting.js',
    lineterm=''
)
print('\\n'.join(diff))
# Output:
# --- greeting.js.orig
# +++ greeting.js
# @@ -1,4 +1,4 @@
# -function greet(name) {
# -  console.log("Hello, " + name);
# +function greet(name, greeting) {
# +  console.log(greeting + ", " + name + "!");
#    return true;
#  }

# ===== Context diff (older format) =====
ctx_diff = difflib.context_diff(
    old_text, new_text,
    fromfile='original', tofile='modified'
)
print('\\n'.join(ctx_diff))

# ===== HTML visual diff report =====
d = difflib.HtmlDiff()
html = d.make_file(
    old_text, new_text,
    fromdesc='Original',
    todesc='Modified',
    context=True,  # show only changed sections
    numlines=3     # lines of context
)
with open('diff_report.html', 'w') as f:
    f.write(html)

# ===== SequenceMatcher for similarity ratio =====
seq = difflib.SequenceMatcher(None,
    ''.join(old_text), ''.join(new_text))
print(f"Similarity ratio: {seq.ratio():.2%}")
# Output: Similarity ratio: 72.41%

# ===== Get matching blocks =====
for block in seq.get_matching_blocks():
    print(f"  a[{block.a}:{block.a+block.size}] == "
          f"b[{block.b}:{block.b+block.size}] "
          f"(size={block.size})")

# ===== Get opcodes (edit operations) =====
for op, i1, i2, j1, j2 in seq.get_opcodes():
    print(f"  {op:8s} a[{i1}:{i2}] b[{j1}:{j2}]")
# Output:
#   equal    a[0:0] b[0:0]
#   replace  a[0:28] b[0:38]
#   equal    a[28:50] b[38:60]

# ===== Compare two files =====
with open('file1.txt') as f1, open('file2.txt') as f2:
    diff = difflib.unified_diff(
        f1.readlines(), f2.readlines(),
        fromfile='file1.txt', tofile='file2.txt'
    )
    print('\\n'.join(diff))`}</code></pre>

      <h3>{s.codeBashTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeBashDesc }} />
      <pre><code>{`# ===== Basic diff command =====

# Compare two files (default output format)
diff file1.txt file2.txt

# Unified diff format (most readable)
diff -u file1.txt file2.txt
# Output:
# --- file1.txt  2024-01-15 10:30:00
# +++ file2.txt  2024-01-15 11:45:00
# @@ -1,4 +1,4 @@
# -old line 1
# +new line 1
#  unchanged line

# Side-by-side comparison
diff -y file1.txt file2.txt
# or with specific width:
diff -y -W 120 file1.txt file2.txt

# Show only lines that differ (with side-by-side)
diff -y --suppress-common-lines file1.txt file2.txt

# Ignore case differences
diff -i file1.txt file2.txt

# Ignore all whitespace
diff -w file1.txt file2.txt

# Ignore blank lines
diff -B file1.txt file2.txt

# Recursive directory comparison
diff -r dir1/ dir2/

# Brief output (just report if files differ)
diff -q file1.txt file2.txt
# Output: Files file1.txt and file2.txt differ

# ===== Enhanced diff tools =====

# colordiff: colorized diff output
# Install: apt install colordiff / brew install colordiff
colordiff -u file1.txt file2.txt

# vimdiff: side-by-side in Vim editor
vimdiff file1.txt file2.txt

# sdiff: interactive side-by-side merge
sdiff file1.txt file2.txt

# ===== Practical examples =====

# Compare command output
diff <(ls dir1/) <(ls dir2/)

# Compare sorted files
diff <(sort file1.txt) <(sort file2.txt)

# Compare remote file with local file
diff <(curl -s https://example.com/config.yml) local-config.yml

# Generate a patch file
diff -u original.txt modified.txt > changes.patch

# Apply a patch
patch original.txt < changes.patch

# Dry run (check if patch applies cleanly)
patch --dry-run original.txt < changes.patch

# Reverse a patch
patch -R original.txt < changes.patch

# Compare two strings directly
diff <(echo "hello world") <(echo "hello there")`}</code></pre>

      {/* Section 6: How to Read Diff Output */}
      <h2>{s.h2_readDiff}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.readDiffDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.readDiffHeader }} />
      <p dangerouslySetInnerHTML={{ __html: s.readDiffHunk }} />
      <p dangerouslySetInnerHTML={{ __html: s.readDiffLines }} />

      <pre><code>{`# Example: reading a unified diff

diff --git a/src/config.js b/src/config.js
index 8a3b5c1..f29d4e2 100644
--- a/src/config.js                    ← original file
+++ b/src/config.js                    ← modified file
@@ -12,8 +12,9 @@ const defaults = {      ← hunk header: line 12, 8→9 lines
   timeout: 3000,                       ← context (unchanged)
   retries: 3,                          ← context (unchanged)
-  baseUrl: 'http://localhost:3000',    ← REMOVED (red)
-  debug: false,                        ← REMOVED (red)
+  baseUrl: 'https://api.example.com', ← ADDED (green)
+  debug: true,                         ← ADDED (green)
+  verbose: true,                       ← ADDED (green, new line)
   headers: {                           ← context (unchanged)
     'Content-Type': 'application/json' ← context (unchanged)
   }                                    ← context (unchanged)`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.readDiffPatch }} />
      <p dangerouslySetInnerHTML={{ __html: s.readDiffStat }} />

      <pre><code>{`# git diff --stat output example:
 src/config.js     | 5 +++--
 src/app.js        | 12 ++++++------
 tests/config.test | 28 ++++++++++++++++++++++++++++
 3 files changed, 37 insertions(+), 8 deletions(-)

# The bar shows the ratio of additions (+) to deletions (-)
# Longer bars = more changes in that file`}</code></pre>

      {/* Section 7: Best Diff Tools Comparison */}
      <h2>{s.h2_tools}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.toolsDesc }} />

      <table>
        <thead>
          <tr>
            <th>Tool</th>
            <th>Type</th>
            <th>Price</th>
            <th>Platform</th>
            <th>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>DevToolBox</strong></td><td>Web</td><td>Free</td><td>Any browser</td><td>Quick online comparisons</td></tr>
          <tr><td><strong>VS Code</strong></td><td>Editor</td><td>Free</td><td>Win/Mac/Linux</td><td>Code review + editing</td></tr>
          <tr><td><strong>Beyond Compare</strong></td><td>Desktop</td><td>$35-60</td><td>Win/Mac/Linux</td><td>3-way merge, folder sync</td></tr>
          <tr><td><strong>Meld</strong></td><td>Desktop</td><td>Free</td><td>Linux/Mac/Win</td><td>Visual diff + VCS integration</td></tr>
          <tr><td><strong>WinMerge</strong></td><td>Desktop</td><td>Free</td><td>Windows</td><td>File + folder comparison</td></tr>
          <tr><td><strong>diff (CLI)</strong></td><td>CLI</td><td>Free</td><td>Unix/Linux/Mac</td><td>Scripting + CI/CD pipelines</td></tr>
          <tr><td><strong>git diff</strong></td><td>CLI</td><td>Free</td><td>Any</td><td>Version control diffs</td></tr>
        </tbody>
      </table>

      <p dangerouslySetInnerHTML={{ __html: s.tool1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.tool2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.tool3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.tool4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.tool5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.tool6 }} />

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/text-diff`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
