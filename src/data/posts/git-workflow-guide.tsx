'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Git Advanced Workflow Guide: Internals, Branching Strategies, Rebase, Hooks, and CI/CD',
    intro: 'Git is far more than add, commit, and push. Mastering Git internals, branching strategies, interactive rebase, hooks, and CI/CD integration transforms your development workflow. This guide covers 13 essential Git topics with practical examples for professional developers.',
    tldr: 'Git stores data as content-addressable objects (blobs, trees, commits, tags). Use Git Flow for scheduled releases, GitHub Flow for continuous delivery, or trunk-based development for rapid iteration. Interactive rebase lets you squash, reword, and reorder commits. Cherry-pick selects specific commits, bisect finds bugs via binary search. Hooks automate quality checks, and semantic release with GitHub Actions automates versioning.',
    takeaway1: 'Git stores everything as objects (blobs, trees, commits) identified by SHA-1 hashes, not as file diffs.',
    takeaway2: 'Choose Git Flow for complex releases, GitHub Flow for simplicity, or trunk-based for high-velocity teams.',
    takeaway3: 'Interactive rebase rewrites history cleanly — use squash, fixup, reword, and edit to craft meaningful commits.',
    takeaway4: 'Git bisect performs binary search to find the exact commit that introduced a bug.',
    takeaway5: 'Git hooks (pre-commit, commit-msg, pre-push) automate linting, testing, and commit message validation.',
    takeaway6: 'Sign commits with GPG or SSH keys to verify author identity and establish trust in your codebase.',
    h2Internals: 'Git Internals',
    internalsDesc: 'Git is a content-addressable filesystem. Every file, directory, and commit is stored as an object identified by a SHA-1 hash. Understanding this model explains why Git is so fast and how operations like branch, merge, and rebase actually work under the hood.',
    internalsTip: 'A branch in Git is just a 41-byte file containing a commit SHA. Creating a branch is essentially free, which is why Git encourages branching workflows. HEAD is a symbolic reference that points to the current branch, and tags are permanent pointers to specific commits.',
    internalsNote: 'Git has four object types: blobs store file contents, trees represent directories mapping names to blobs or other trees, commits point to a tree and parent commits, and annotated tags point to commits with metadata. The SHA-1 hash is computed from the object type, size, and content, ensuring data integrity across the entire history.',
    h3ObjectModel: 'The Object Model',
    objectModelDesc: 'When you run git add, Git creates a blob object for each file. When you commit, Git creates a tree object for each directory and a commit object pointing to the root tree. Branches and tags are simply files containing a commit SHA, making them lightweight references rather than copies of data.',
    h2Branching: 'Branching Strategies',
    branchingDesc: 'A branching strategy defines how your team creates, merges, and releases code. The right choice depends on team size, release cadence, and deployment model. Three dominant strategies have emerged in the industry.',
    branchingTip: 'Git Flow works best for teams shipping versioned software with scheduled releases. GitHub Flow is ideal for web applications with continuous deployment. Trunk-based development suits teams with strong CI/CD pipelines, feature flags, and a culture of small, frequent commits.',
    branchingNote: 'Git Flow uses two permanent branches (main and develop) plus temporary feature, release, and hotfix branches. GitHub Flow uses only main plus short-lived feature branches merged via pull requests. Trunk-based development commits directly to main or uses very short-lived branches lasting hours, not days.',
    h3BranchNaming: 'Branch Naming Conventions',
    branchNamingDesc: 'Consistent branch names improve readability and automation. Common patterns include type/description (feat/user-auth, fix/login-bug), type/ticket-id (feat/JIRA-123), and owner/description (alice/refactor-api). Many teams prefix with feat/, fix/, hotfix/, chore/, or docs/ to categorize branches automatically.',
    h2Rebase: 'Interactive Rebase',
    rebaseDesc: 'Interactive rebase lets you rewrite commit history before sharing it. You can squash multiple commits into one, reword commit messages, reorder commits, or edit a commit to split it. This keeps your history clean and meaningful.',
    rebaseTip: 'The golden rule of rebase: never rebase commits that have been pushed to a shared branch. Rebase rewrites commit SHAs, which causes conflicts for anyone who has based work on the original commits. Use rebase only on local or personal branches before merging.',
    rebaseNote: 'When you rebase, Git creates new commits with new SHAs that have the same changes as the originals. The old commits become orphaned and will eventually be garbage collected. If you rebase a branch that others have pulled, they will see divergent history and face merge conflicts.',
    h3AutoSquash: 'Autosquash Workflow',
    autoSquashDesc: 'Use git commit --fixup=<sha> to create fixup commits, then git rebase -i --autosquash automatically moves them next to the target commit with the fixup command. This workflow lets you make corrections as you work and clean up later without manual reordering.',
    h2CherryBisect: 'Cherry-Pick and Bisect',
    cherryBisectDesc: 'Cherry-pick applies specific commits from one branch to another without merging the entire branch. Bisect uses binary search to find the commit that introduced a bug. Together, they are essential debugging and selective-merge tools.',
    cherryBisectTip: 'Cherry-pick creates a new commit with a different SHA, so the same change exists twice in history. Use it sparingly for hotfixes or backports. For routine work, prefer merge or rebase to keep history connected.',
    cherryBisectNote: 'Automated bisect is extremely powerful: provide a test script that returns exit code 0 for good and non-zero for bad, and Git will automatically narrow down to the exact commit. This works with any test, build script, or even a manual inspection command.',
    h3BisectAutomation: 'Automating Bisect',
    bisectAutoDesc: 'For maximum efficiency, write a small script that reproduces the bug and exits with non-zero on failure. Pass it to git bisect run and Git will perform the entire binary search unattended. With 1000 commits, bisect only needs about 10 tests to find the culprit.',
    h2Stash: 'Stash and Worktrees',
    stashDesc: 'Git stash temporarily shelves uncommitted changes so you can switch branches. Worktrees let you check out multiple branches simultaneously in separate directories, avoiding constant stashing and branch switching.',
    stashTip: 'Worktrees are especially useful for code review: check out a PR branch in a separate worktree while keeping your feature branch untouched. Each worktree has its own working directory and index, but shares the same .git repository.',
    stashNote: 'Stash entries are stored as commit objects in a special reflog. You can create multiple stashes, apply them selectively, and even create a branch from a stash entry. The --keep-index flag stashes only unstaged changes, useful when you want to test what is currently staged.',
    h3WorktreeUseCases: 'Worktree Use Cases',
    worktreeUseCasesDesc: 'Common worktree scenarios include: reviewing a pull request while working on your own feature, running a long build on one branch while coding on another, comparing behavior between branches side-by-side, and maintaining a production hotfix branch that is always checked out and ready for emergency patches.',
    h3StashBranch: 'Creating a Branch from a Stash',
    stashBranchDesc: 'If you stashed changes but then realize they deserve their own branch, use git stash branch new-branch-name stash@{0}. This creates a new branch from the commit where the stash was originally created, applies the stash, and drops it. It is the cleanest way to promote stashed work into a proper feature branch.',
    h2Hooks: 'Git Hooks',
    hooksDesc: 'Hooks are scripts that Git runs before or after certain events like commit, push, or merge. They enforce code quality standards, validate commit messages, run tests, and prevent bad code from entering the repository.',
    hooksTip: 'Client-side hooks (pre-commit, commit-msg, pre-push) run on the developer machine. Server-side hooks (pre-receive, post-receive) run on the remote. Use Husky or lefthook to version-control client hooks so every team member runs the same checks.',
    hooksNote: 'Common hook workflows include: pre-commit runs linters and formatters via lint-staged, commit-msg validates conventional commit format with commitlint, and pre-push runs the test suite. The prepare-commit-msg hook can auto-populate commit messages with branch names or ticket numbers.',
    h3HookManagers: 'Hook Manager Comparison',
    hookManagersDesc: 'Husky is the most popular hook manager with 30k+ GitHub stars and simple configuration via .husky/ directory. Lefthook is faster, written in Go, and supports parallel hook execution. simple-git-hooks is a zero-dependency alternative for projects that need minimal setup. All three store hooks in the repository so every contributor runs the same checks.',
    h3LintStaged: 'lint-staged Configuration',
    lintStagedDesc: 'lint-staged runs linters only on staged files, keeping pre-commit hooks fast even in large repos. Configure it in package.json or a separate .lintstagedrc file. Map glob patterns to commands: JavaScript files to ESLint and Prettier, CSS to Stylelint, and Markdown to markdownlint. Failed checks abort the commit, preventing poorly formatted code from entering the repo.',
    h2Submodules: 'Submodules and Subtrees',
    submodulesDesc: 'Submodules and subtrees let you include external repositories inside your project. Submodules maintain a pointer to a specific commit in another repo. Subtrees merge the external repo history directly into your project tree.',
    submodulesTip: 'Submodules are better when you need to pin an exact version of a dependency and update it explicitly. Subtrees are simpler for consumers because they do not require special clone commands. Many teams prefer subtrees for shared libraries and submodules for vendored dependencies.',
    submodulesNote: 'A .gitmodules file tracks submodule URLs and paths. After cloning a repo with submodules, run git submodule update --init --recursive. Forgetting this step is the most common submodule issue. With subtrees, all code lives in your repo so consumers never need extra commands.',
    h3MonoVsMulti: 'Monorepo vs Multi-repo',
    monoVsMultiDesc: 'Monorepos store all projects in a single repository, simplifying dependency management and atomic cross-project changes. Multi-repos give teams autonomy and isolation. Submodules bridge both approaches: a parent repo references child repos at specific commits. Tools like Nx, Turborepo, and Lerna help manage monorepo builds and dependency graphs.',
    h2MergeRebase: 'Merge vs Rebase',
    mergeRebaseDesc: 'Merge creates a merge commit preserving branch history. Rebase replays commits on top of another branch creating a linear history. Each approach has tradeoffs in readability, conflict resolution, and collaboration safety.',
    mergeRebaseTip: 'A common team convention is to rebase locally before opening a pull request, then merge the PR with a merge commit on the main branch. This gives you clean individual commits plus a clear record of when features were integrated.',
    mergeRebaseNote: 'The --no-ff flag on merge always creates a merge commit even when a fast-forward is possible. This preserves the branch topology so you can see when a feature branch was merged. Some teams prefer squash merges to collapse an entire feature branch into a single commit on main.',
    h3ConflictResolution: 'Conflict Resolution Tips',
    conflictDesc: 'Use git mergetool to open a visual diff tool. Configure merge.conflictstyle=diff3 to see the common ancestor alongside both sides of a conflict. After resolving, use git diff --check to verify no conflict markers remain. For rerere (reuse recorded resolution), enable it with git config rerere.enabled true to auto-resolve repeated conflicts.',
    h3SquashMerge: 'Squash Merge Strategy',
    squashMergeDesc: 'Squash merge combines all commits from a feature branch into a single commit on the target branch. This creates a clean main branch history where each commit represents a complete feature. The tradeoff is losing individual commit history from the feature branch. GitHub and GitLab offer squash merge as a PR merge option alongside regular merge and rebase merge.',
    h2Reflog: 'Git Reflog',
    reflogDesc: 'The reflog records every change to HEAD and branch tips, including commits, rebases, resets, and checkouts. It is your safety net for recovering lost commits, undoing bad rebases, and restoring deleted branches.',
    reflogTip: 'Reflog entries expire after 90 days for reachable commits and 30 days for unreachable ones. You can change this with gc.reflogExpire and gc.reflogExpireUnreachable. After a bad operation, check the reflog immediately before running git gc.',
    reflogNote: 'The reflog is local only and is not shared when you push or pull. Each developer has their own reflog. If you accidentally force-push over a remote branch, the remote reflog (if the server supports it) or another team member local reflog may be your only recovery option.',
    h3RecoveryPatterns: 'Common Recovery Patterns',
    recoveryDesc: 'The most frequent recovery scenarios are: undoing a bad rebase (reset to reflog entry before rebase), restoring a deleted branch (find last commit SHA in reflog), recovering an amended commit (the previous version exists in reflog), and retrieving a dropped stash (use git fsck to find unreachable commit objects).',
    h3ReflogVsFsck: 'Reflog vs git fsck',
    reflogVsFsckDesc: 'Reflog tracks HEAD and branch tip movements, so it finds commits that were recently referenced. Git fsck --unreachable finds all orphaned objects, including those never referenced by any branch. Use reflog first for recent recovery, and fsck as a last resort for objects that fell outside the reflog window.',
    h2Signing: 'Signing Commits',
    signingDesc: 'Signed commits prove that code was authored by a verified identity. GitHub and GitLab display a verified badge next to signed commits. You can sign with GPG keys or SSH keys (Git 2.34+).',
    signingTip: 'SSH signing is simpler than GPG because most developers already have SSH keys. Configure an allowed_signers file to verify signatures from your team. Organizations can require signed commits via branch protection rules.',
    signingNote: 'To verify SSH-signed commits locally, create an allowed_signers file listing trusted public keys in the format: email nametype base64key. Then set gpg.ssh.allowedSignersFile in your git config. This enables git verify-commit and git log --show-signature to validate signatures.',
    h3VigilantMode: 'Vigilant Mode',
    vigilantDesc: 'GitHub offers vigilant mode which marks unsigned commits as unverified, making it clear when a commit lacks a valid signature. Enable it in your GitHub settings under SSH and GPG keys. Combined with branch protection rules requiring signed commits, this creates a strong chain of trust for your codebase.',
    h3SigningTags: 'Signing Tags for Releases',
    signingTagsDesc: 'Use git tag -s v1.0.0 to create a signed annotated tag. Signed tags verify that a release was created by an authorized person. CI pipelines can verify tag signatures before building and deploying. This is especially important for open source projects where anyone can submit pull requests but only maintainers should create releases.',
    h2LFS: 'Large File Storage',
    lfsDesc: 'Git LFS replaces large files (images, videos, binaries, datasets) with lightweight pointer files in your repository, storing the actual file content on a remote server. This keeps your repo small and clone times fast.',
    lfsTip: 'Track large files with LFS before committing them. If you accidentally commit a large file without LFS, use git lfs migrate to rewrite history. Most Git hosts (GitHub, GitLab, Bitbucket) include free LFS storage with limits.',
    lfsNote: 'LFS pointer files are small text files containing the SHA-256 hash and size of the actual content. During checkout, LFS hooks download the real file from the LFS server. During push, the smudge and clean filters upload new large files automatically. This is transparent to your normal Git workflow.',
    h3LFSBestPractices: 'LFS Best Practices',
    lfsBestPracticesDesc: 'Add .gitattributes to your repo before tracking files with LFS. Use git lfs migrate to convert existing large files. Set up LFS locking for binary files that cannot be merged (design files, compiled assets). Monitor your LFS storage usage, as most hosts charge for bandwidth and storage beyond free tiers.',
    h2LogDiff: 'Advanced Log and Diff',
    logDiffDesc: 'Git log and diff have powerful formatting and filtering options. Pretty formats create custom output for changelogs and reports. Diff algorithms like patience and histogram produce cleaner diffs for complex changes.',
    logDiffTip: 'The pickaxe option (-S) searches for commits that add or remove a specific string. The -G option searches for commits where the diff matches a regex. These are invaluable for understanding when and why a function was introduced or removed.',
    logDiffNote: 'The patience diff algorithm handles moved code blocks better than the default Myers algorithm by finding unique matching lines first. The histogram algorithm is an optimized version of patience used by default in JGit. For word-level changes, use --word-diff=color to highlight inline modifications.',
    h3GitAliases: 'Useful Git Aliases',
    gitAliasesDesc: 'Create aliases for frequently used log and diff commands. Add them to your global .gitconfig under the [alias] section. Popular aliases include lg for a decorated graph log, last for showing the last commit, unstage for resetting staged files, and amend for amending the last commit without editing the message.',
    h3StatisticsReporting: 'Repository Statistics',
    statsDesc: 'Use git shortlog -sn to rank contributors by commit count. Use git log --format="%ae" | sort | uniq -c | sort -rn to list contributors by email. The git diff --stat command shows a summary of changed files. For detailed contribution analytics, tools like git-fame and gitstats generate comprehensive reports with charts and timelines.',
    h2CICD: 'CI/CD Integration',
    cicdDesc: 'Git integrates tightly with CI/CD pipelines. Conventional commits enable automated versioning with semantic release. GitHub Actions workflows trigger on push, pull request, or tag events to build, test, and deploy automatically.',
    cicdTip: 'Conventional commits follow a structured format: type(scope): description. Types include feat, fix, docs, style, refactor, test, and chore. Tools like commitlint enforce this format, and semantic-release uses it to determine version bumps and generate changelogs.',
    cicdNote: 'Semantic-release analyzes commit messages since the last release to determine the next version number. A feat commit triggers a minor bump, a fix triggers a patch, and a BREAKING CHANGE footer triggers a major bump. It can also generate release notes, create GitHub releases, and publish to npm automatically.',
    h3ProtectedBranches: 'Branch Protection Rules',
    protectedBranchesDesc: 'Configure branch protection on main to require pull request reviews, passing CI checks, signed commits, and linear history. This prevents direct pushes to main, ensures code review, and maintains a clean commit history. GitHub, GitLab, and Bitbucket all support these rules with varying granularity.',
    h3ChangelogGeneration: 'Automated Changelog Generation',
    changelogDesc: 'Tools like conventional-changelog and release-please parse conventional commit messages to generate formatted changelogs. Each release section groups changes by type: features, bug fixes, breaking changes, and documentation updates. This eliminates manual changelog maintenance and ensures every merged PR is documented.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is the difference between git merge and git rebase?',
    faq1A: 'Merge creates a merge commit that combines two branches, preserving full history. Rebase replays your commits on top of the target branch, creating a linear history. Use merge for shared branches, rebase for local cleanup.',
    faq2Q: 'How do I undo a git rebase?',
    faq2A: 'Use git reflog to find the commit before the rebase, then git reset --hard to that commit. The reflog records every HEAD change, so you can always recover from a bad rebase.',
    faq3Q: 'Should I use Git Flow or trunk-based development?',
    faq3A: 'Use Git Flow for teams with scheduled releases and multiple environments. Use trunk-based development for teams practicing continuous deployment with feature flags and short-lived branches.',
    faq4Q: 'How do I sign commits with SSH keys?',
    faq4A: 'Configure git with gpg.format=ssh and user.signingkey pointing to your SSH public key. Then use git commit -S to sign. Git 2.34+ supports SSH signing natively.',
    faq5Q: 'What is git bisect and when should I use it?',
    faq5A: 'Git bisect performs a binary search through your commit history to find the exact commit that introduced a bug. Mark a known good commit and a bad commit, then bisect tests the midpoint until it isolates the offending commit.',
    faq6Q: 'How does Git LFS work?',
    faq6A: 'Git LFS replaces large files with small pointer files in your repo. The actual file content is stored on a separate LFS server. Git LFS hooks intercept checkout and push operations to download and upload large files transparently.',
    faq7Q: 'What are the most useful git hooks?',
    faq7A: 'Pre-commit runs linters and formatters before each commit. Commit-msg validates commit message format. Pre-push runs tests before pushing. Use Husky or lefthook to manage hooks across your team.',
    faq8Q: 'How do I recover a deleted branch?',
    faq8A: 'Use git reflog to find the last commit on the deleted branch, then git checkout -b branch-name commit-sha to recreate it. Reflog entries persist for 90 days by default, giving you a generous recovery window.',
  },
  zh: {
    title: 'Git 高级工作流指南：内部原理、分支策略、变基、钩子和 CI/CD',
    intro: 'Git 远不止 add、commit 和 push。掌握 Git 内部原理、分支策略、交互式变基、钩子和 CI/CD 集成将彻底改变你的开发工作流。本指南涵盖 13 个必备 Git 主题，为专业开发者提供实用示例。',
    tldr: 'Git 将数据存储为内容可寻址对象（blob、tree、commit、tag）。使用 Git Flow 进行计划发布，GitHub Flow 进行持续交付，或基于主干开发进行快速迭代。交互式变基可以压缩、改写和重排提交。Cherry-pick 选择特定提交，bisect 通过二分查找定位 bug。钩子自动化质量检查，语义化发布配合 GitHub Actions 自动化版本管理。',
    takeaway1: 'Git 将所有内容存储为由 SHA-1 哈希标识的对象（blob、tree、commit），而不是文件差异。',
    takeaway2: '选择 Git Flow 处理复杂发布，GitHub Flow 追求简单，或基于主干开发适合高速团队。',
    takeaway3: '交互式变基干净地重写历史——使用 squash、fixup、reword 和 edit 来编写有意义的提交。',
    takeaway4: 'Git bisect 执行二分查找，精确定位引入 bug 的提交。',
    takeaway5: 'Git 钩子（pre-commit、commit-msg、pre-push）自动化代码检查、测试和提交信息验证。',
    takeaway6: '使用 GPG 或 SSH 密钥签名提交，验证作者身份并建立代码库信任。',
    h2Internals: 'Git 内部原理',
    internalsDesc: 'Git 是一个内容可寻址的文件系统。每个文件、目录和提交都作为对象存储，由 SHA-1 哈希标识。理解这个模型能解释 Git 为何如此快速，以及分支、合并和变基的底层工作原理。',
    internalsTip: 'Git 中的分支只是一个包含提交 SHA 的 41 字节文件。创建分支几乎零成本，这就是 Git 鼓励分支工作流的原因。HEAD 是指向当前分支的符号引用，标签是指向特定提交的永久指针。',
    internalsNote: 'Git 有四种对象类型：blob 存储文件内容，tree 表示目录将名称映射到 blob 或其他 tree，commit 指向 tree 和父提交，带注释的 tag 指向带元数据的提交。SHA-1 哈希由对象类型、大小和内容计算，确保整个历史的数据完整性。',
    h3ObjectModel: '对象模型',
    objectModelDesc: '运行 git add 时，Git 为每个文件创建 blob 对象。提交时，Git 为每个目录创建 tree 对象和一个指向根 tree 的 commit 对象。分支和标签只是包含提交 SHA 的文件，使它们成为轻量级引用而非数据副本。',
    h2Branching: '分支策略',
    branchingDesc: '分支策略定义了团队如何创建、合并和发布代码。正确的选择取决于团队规模、发布节奏和部署模型。业界已形成三种主流策略。',
    branchingTip: 'Git Flow 最适合按计划发布版本化软件的团队。GitHub Flow 适合持续部署的 Web 应用。基于主干开发适合拥有强大 CI/CD 管道、功能标志和频繁小提交文化的团队。',
    branchingNote: 'Git Flow 使用两个永久分支（main 和 develop）加临时的 feature、release 和 hotfix 分支。GitHub Flow 仅使用 main 加通过 PR 合并的短生命周期 feature 分支。基于主干开发直接提交到 main 或使用持续数小时而非数天的极短生命周期分支。',
    h3BranchNaming: '分支命名规范',
    branchNamingDesc: '一致的分支名称提高可读性和自动化能力。常见模式包括 type/description（feat/user-auth、fix/login-bug）、type/ticket-id（feat/JIRA-123）和 owner/description（alice/refactor-api）。许多团队使用 feat/、fix/、hotfix/、chore/ 或 docs/ 前缀来自动分类分支。',
    h2Rebase: '交互式变基',
    rebaseDesc: '交互式变基让你在分享之前重写提交历史。可以将多个提交压缩为一个、改写提交信息、重排提交顺序或编辑提交进行拆分。这使历史保持清晰有意义。',
    rebaseTip: '变基的黄金法则：永远不要对已推送到共享分支的提交进行变基。变基会重写提交 SHA，这会给基于原始提交工作的人造成冲突。仅在合并前对本地或个人分支使用变基。',
    rebaseNote: '变基时，Git 创建具有相同更改但新 SHA 的新提交。旧提交变成孤立的，最终会被垃圾回收。如果对他人已拉取的分支进行变基，他们会看到分歧的历史并面临合并冲突。',
    h3AutoSquash: 'Autosquash 工作流',
    autoSquashDesc: '使用 git commit --fixup=<sha> 创建修正提交，然后 git rebase -i --autosquash 自动将它们移到目标提交旁边并设置 fixup 命令。这个工作流让你在工作时进行修正，之后再清理，无需手动重排。',
    h2CherryBisect: 'Cherry-Pick 和 Bisect',
    cherryBisectDesc: 'Cherry-pick 将特定提交从一个分支应用到另一个分支而不合并整个分支。Bisect 使用二分查找定位引入 bug 的提交。它们是必备的调试和选择性合并工具。',
    cherryBisectTip: 'Cherry-pick 创建具有不同 SHA 的新提交，因此同一更改在历史中存在两次。谨慎使用它进行热修复或回溯移植。对于日常工作，优先使用合并或变基保持历史连贯。',
    cherryBisectNote: '自动 bisect 非常强大：提供一个测试脚本，好的返回退出码 0，坏的返回非零，Git 会自动缩小到精确的提交。这适用于任何测试、构建脚本甚至手动检查命令。',
    h3BisectAutomation: '自动化 Bisect',
    bisectAutoDesc: '为了最大效率，编写一个能重现 bug 的小脚本，失败时返回非零退出码。将它传给 git bisect run，Git 会无人值守地执行整个二分查找。对于 1000 个提交，bisect 只需约 10 次测试即可找到罪魁祸首。',
    h2Stash: '暂存和工作树',
    stashDesc: 'Git stash 临时搁置未提交的更改，方便切换分支。工作树让你在独立目录中同时检出多个分支，避免频繁暂存和切换分支。',
    stashTip: '工作树特别适合代码审查：在单独的工作树中检出 PR 分支，同时保持你的功能分支不受影响。每个工作树有自己的工作目录和索引，但共享同一个 .git 仓库。',
    stashNote: '暂存条目作为提交对象存储在特殊的 reflog 中。你可以创建多个暂存、选择性应用，甚至从暂存条目创建分支。--keep-index 标志只暂存未暂存的更改，当你想测试当前已暂存内容时很有用。',
    h3WorktreeUseCases: '工作树使用场景',
    worktreeUseCasesDesc: '常见工作树场景包括：在处理自己功能的同时审查 PR、在一个分支上运行长时间构建的同时在另一个分支上编码、并排比较不同分支的行为、以及维护一个始终检出并准备好进行紧急补丁的生产热修复分支。',
    h3StashBranch: '从暂存创建分支',
    stashBranchDesc: '如果暂存了更改但发现它们应该有自己的分支，使用 git stash branch new-branch-name stash@{0}。这会从暂存最初创建时的提交创建新分支，应用暂存并删除它。这是将暂存工作提升为正式功能分支最干净的方式。',
    h2Hooks: 'Git 钩子',
    hooksDesc: '钩子是 Git 在提交、推送或合并等事件前后运行的脚本。它们强制执行代码质量标准、验证提交信息、运行测试并防止坏代码进入仓库。',
    hooksTip: '客户端钩子（pre-commit、commit-msg、pre-push）在开发者机器上运行。服务端钩子（pre-receive、post-receive）在远程运行。使用 Husky 或 lefthook 对客户端钩子进行版本控制，确保每个团队成员运行相同的检查。',
    hooksNote: '常见的钩子工作流包括：pre-commit 通过 lint-staged 运行检查器和格式化器，commit-msg 使用 commitlint 验证约定式提交格式，pre-push 运行测试套件。prepare-commit-msg 钩子可以自动用分支名或工单号填充提交信息。',
    h3HookManagers: '钩子管理器比较',
    hookManagersDesc: 'Husky 是最流行的钩子管理器，拥有 30k+ GitHub star，通过 .husky/ 目录简单配置。Lefthook 更快，用 Go 编写，支持并行钩子执行。simple-git-hooks 是零依赖的替代方案，适合需要最小化设置的项目。三者都将钩子存储在仓库中，确保每个贡献者运行相同的检查。',
    h3LintStaged: 'lint-staged 配置',
    lintStagedDesc: 'lint-staged 仅对暂存文件运行检查器，即使在大型仓库中也能保持 pre-commit 钩子快速。在 package.json 或单独的 .lintstagedrc 文件中配置。将 glob 模式映射到命令：JavaScript 文件到 ESLint 和 Prettier，CSS 到 Stylelint，Markdown 到 markdownlint。检查失败会中止提交，防止格式不好的代码进入仓库。',
    h2Submodules: '子模块和子树',
    submodulesDesc: '子模块和子树让你在项目中包含外部仓库。子模块维护指向另一个仓库特定提交的指针。子树将外部仓库历史直接合并到你的项目树中。',
    submodulesTip: '当需要锁定依赖的精确版本并显式更新时，子模块更好。子树对使用者更简单，因为不需要特殊的克隆命令。许多团队对共享库使用子树，对供应商依赖使用子模块。',
    submodulesNote: '.gitmodules 文件跟踪子模块的 URL 和路径。克隆包含子模块的仓库后，运行 git submodule update --init --recursive。忘记这一步是最常见的子模块问题。使用子树时，所有代码都在你的仓库中，使用者不需要额外命令。',
    h3MonoVsMulti: 'Monorepo vs Multi-repo',
    monoVsMultiDesc: 'Monorepo 将所有项目存储在单个仓库中，简化依赖管理和跨项目原子更改。Multi-repo 给团队自主权和隔离性。子模块桥接两种方式：父仓库在特定提交引用子仓库。Nx、Turborepo 和 Lerna 等工具帮助管理 monorepo 构建和依赖图。',
    h2MergeRebase: '合并 vs 变基',
    mergeRebaseDesc: '合并创建合并提交保留分支历史。变基将提交重放到另一个分支之上创建线性历史。每种方式在可读性、冲突解决和协作安全方面各有取舍。',
    mergeRebaseTip: '常见的团队惯例是在打开拉取请求前在本地变基，然后在主分支上用合并提交合并 PR。这样既有干净的单独提交，又有功能集成时间的清晰记录。',
    mergeRebaseNote: '合并的 --no-ff 标志即使可以快进也始终创建合并提交。这保留了分支拓扑结构，让你能看到功能分支何时被合并。一些团队偏好压缩合并，将整个功能分支折叠为主分支上的单个提交。',
    h3ConflictResolution: '冲突解决技巧',
    conflictDesc: '使用 git mergetool 打开可视化差异工具。配置 merge.conflictstyle=diff3 同时查看共同祖先和冲突双方。解决后使用 git diff --check 验证没有残留冲突标记。启用 rerere（重用已记录的解决方案）通过 git config rerere.enabled true 自动解决重复冲突。',
    h3SquashMerge: '压缩合并策略',
    squashMergeDesc: '压缩合并将功能分支的所有提交合并为目标分支上的单个提交。这创建了干净的主分支历史，每个提交代表一个完整功能。代价是失去功能分支的单独提交历史。GitHub 和 GitLab 提供压缩合并作为 PR 合并选项，与常规合并和变基合并并列。',
    h2Reflog: 'Git Reflog',
    reflogDesc: 'reflog 记录 HEAD 和分支指针的每次变更，包括提交、变基、重置和检出。它是恢复丢失提交、撤销错误变基和恢复已删除分支的安全网。',
    reflogTip: 'reflog 条目对可达提交在 90 天后过期，对不可达提交在 30 天后过期。可以通过 gc.reflogExpire 和 gc.reflogExpireUnreachable 更改。在错误操作后，请在运行 git gc 之前立即检查 reflog。',
    reflogNote: 'reflog 仅存在于本地，推送或拉取时不会共享。每个开发者有自己的 reflog。如果意外强制推送覆盖了远程分支，远程 reflog（如果服务器支持）或其他团队成员的本地 reflog 可能是唯一的恢复选项。',
    h3RecoveryPatterns: '常见恢复模式',
    recoveryDesc: '最常见的恢复场景包括：撤销错误变基（重置到变基前的 reflog 条目）、恢复已删除的分支（在 reflog 中找到最后的提交 SHA）、恢复修改过的提交（之前的版本存在于 reflog 中）、以及找回丢弃的暂存（使用 git fsck 查找不可达的提交对象）。',
    h3ReflogVsFsck: 'Reflog vs git fsck',
    reflogVsFsckDesc: 'reflog 跟踪 HEAD 和分支指针的移动，所以它能找到最近引用过的提交。git fsck --unreachable 找到所有孤立对象，包括从未被任何分支引用的对象。先用 reflog 进行近期恢复，fsck 作为最后手段用于超出 reflog 窗口期的对象。',
    h2Signing: '签名提交',
    signingDesc: '签名提交证明代码由已验证的身份创建。GitHub 和 GitLab 在签名提交旁显示已验证徽章。可以使用 GPG 密钥或 SSH 密钥（Git 2.34+）签名。',
    signingTip: 'SSH 签名比 GPG 更简单，因为大多数开发者已经有 SSH 密钥。配置 allowed_signers 文件来验证团队成员的签名。组织可以通过分支保护规则要求签名提交。',
    signingNote: '要在本地验证 SSH 签名的提交，创建一个 allowed_signers 文件列出可信公钥，格式为：email nametype base64key。然后在 git 配置中设置 gpg.ssh.allowedSignersFile。这样 git verify-commit 和 git log --show-signature 就能验证签名。',
    h3VigilantMode: '警戒模式',
    vigilantDesc: 'GitHub 提供警戒模式，将未签名的提交标记为未验证，明确显示提交缺少有效签名。在 GitHub 设置的 SSH 和 GPG 密钥中启用它。结合要求签名提交的分支保护规则，这为代码库建立了强大的信任链。',
    h3SigningTags: '为发布签名标签',
    signingTagsDesc: '使用 git tag -s v1.0.0 创建签名的注释标签。签名标签验证发布由授权人员创建。CI 管道可以在构建和部署前验证标签签名。这对开源项目尤其重要，因为任何人都可以提交 PR，但只有维护者应该创建发布。',
    h2LFS: '大文件存储',
    lfsDesc: 'Git LFS 用轻量级指针文件替换仓库中的大文件（图片、视频、二进制文件、数据集），将实际文件内容存储在远程服务器上，保持仓库小巧、克隆快速。',
    lfsTip: '在提交大文件之前用 LFS 跟踪它们。如果不小心在没有 LFS 的情况下提交了大文件，使用 git lfs migrate 重写历史。大多数 Git 托管（GitHub、GitLab、Bitbucket）包含有限额的免费 LFS 存储。',
    lfsNote: 'LFS 指针文件是包含实际内容 SHA-256 哈希和大小的小文本文件。检出时，LFS 钩子从 LFS 服务器下载真实文件。推送时，smudge 和 clean 过滤器自动上传新的大文件。这对你正常的 Git 工作流是透明的。',
    h3LFSBestPractices: 'LFS 最佳实践',
    lfsBestPracticesDesc: '在使用 LFS 跟踪文件之前先将 .gitattributes 添加到仓库。使用 git lfs migrate 转换现有大文件。为无法合并的二进制文件（设计文件、编译资源）设置 LFS 锁定。监控 LFS 存储使用量，因为大多数托管商对超出免费额度的带宽和存储收费。',
    h2LogDiff: '高级 Log 和 Diff',
    logDiffDesc: 'Git log 和 diff 有强大的格式化和过滤选项。Pretty 格式为变更日志和报告创建自定义输出。patience 和 histogram 差异算法为复杂变更产生更清晰的差异。',
    logDiffTip: 'pickaxe 选项（-S）搜索添加或删除特定字符串的提交。-G 选项搜索差异匹配正则表达式的提交。这些对理解函数何时以及为何被引入或移除非常宝贵。',
    logDiffNote: 'patience 差异算法通过先找到唯一匹配行来更好地处理移动的代码块。histogram 算法是 JGit 默认使用的 patience 优化版。对于单词级更改，使用 --word-diff=color 高亮内联修改。',
    h3GitAliases: '实用 Git 别名',
    gitAliasesDesc: '为常用的 log 和 diff 命令创建别名。在全局 .gitconfig 的 [alias] 部分添加它们。流行的别名包括 lg（装饰图形日志）、last（显示最后一次提交）、unstage（重置暂存文件）和 amend（修改最后一次提交而不编辑信息）。',
    h3StatisticsReporting: '仓库统计',
    statsDesc: '使用 git shortlog -sn 按提交数排名贡献者。使用 git log --format="%ae" | sort | uniq -c | sort -rn 按邮箱列出贡献者。git diff --stat 命令显示更改文件的摘要。对于详细的贡献分析，git-fame 和 gitstats 等工具生成包含图表和时间线的综合报告。',
    h2CICD: 'CI/CD 集成',
    cicdDesc: 'Git 与 CI/CD 管道紧密集成。约定式提交通过语义化发布实现自动版本管理。GitHub Actions 工作流在推送、拉取请求或标签事件时触发，自动构建、测试和部署。',
    cicdTip: '约定式提交遵循结构化格式：type(scope): description。类型包括 feat、fix、docs、style、refactor、test 和 chore。commitlint 等工具强制执行此格式，semantic-release 使用它来确定版本升级并生成变更日志。',
    cicdNote: 'Semantic-release 分析自上次发布以来的提交信息来确定下一个版本号。feat 提交触发次版本升级，fix 触发补丁版本，BREAKING CHANGE 页脚触发主版本升级。它还能自动生成发布说明、创建 GitHub Release 和发布到 npm。',
    h3ProtectedBranches: '分支保护规则',
    protectedBranchesDesc: '在 main 上配置分支保护，要求拉取请求审查、通过 CI 检查、签名提交和线性历史。这防止直接推送到 main，确保代码审查，并维护干净的提交历史。GitHub、GitLab 和 Bitbucket 都支持这些规则，粒度各有不同。',
    h3ChangelogGeneration: '自动变更日志生成',
    changelogDesc: 'conventional-changelog 和 release-please 等工具解析约定式提交信息生成格式化的变更日志。每个发布部分按类型分组更改：功能、错误修复、破坏性更改和文档更新。这消除了手动维护变更日志的需要，确保每个合并的 PR 都有记录。',
    h2Faq: '常见问题',
    faq1Q: 'git merge 和 git rebase 有什么区别？',
    faq1A: '合并创建合并提交组合两个分支，保留完整历史。变基将你的提交重放到目标分支之上，创建线性历史。共享分支用合并，本地清理用变基。',
    faq2Q: '如何撤销 git rebase？',
    faq2A: '使用 git reflog 找到变基前的提交，然后 git reset --hard 到该提交。reflog 记录每次 HEAD 变更，所以总能从错误变基中恢复。',
    faq3Q: '应该使用 Git Flow 还是基于主干开发？',
    faq3A: '有计划发布和多环境的团队用 Git Flow。实践持续部署、使用功能标志和短生命周期分支的团队用基于主干开发。',
    faq4Q: '如何用 SSH 密钥签名提交？',
    faq4A: '配置 git 的 gpg.format=ssh 和 user.signingkey 指向你的 SSH 公钥。然后使用 git commit -S 签名。Git 2.34+ 原生支持 SSH 签名。',
    faq5Q: '什么是 git bisect，什么时候使用？',
    faq5A: 'Git bisect 对提交历史执行二分查找，精确定位引入 bug 的提交。标记已知的好提交和坏提交，bisect 测试中间点直到隔离出问题提交。',
    faq6Q: 'Git LFS 如何工作？',
    faq6A: 'Git LFS 用小指针文件替换仓库中的大文件。实际内容存储在独立的 LFS 服务器上。Git LFS 钩子拦截检出和推送操作，透明地下载和上传大文件。',
    faq7Q: '最有用的 git 钩子有哪些？',
    faq7A: 'Pre-commit 在每次提交前运行检查器和格式化器。Commit-msg 验证提交信息格式。Pre-push 在推送前运行测试。使用 Husky 或 lefthook 在团队中管理钩子。',
    faq8Q: '如何恢复已删除的分支？',
    faq8A: '使用 git reflog 找到删除分支的最后一个提交，然后 git checkout -b branch-name commit-sha 重建。reflog 条目默认保留 90 天。',
  },
};

export default function GitWorkflowGuide({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginTop: '2.5rem',
    marginBottom: '1rem',
  };
  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginTop: '2rem',
    marginBottom: '0.75rem',
  };
  const pStyle: React.CSSProperties = {
    marginBottom: '1rem',
    lineHeight: '1.7',
  };
  const preStyle: React.CSSProperties = {
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    padding: '1rem',
    borderRadius: '0.5rem',
    overflowX: 'auto',
    fontSize: '0.875rem',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  };
  const tipStyle: React.CSSProperties = {
    background: '#fffbeb',
    borderLeft: '4px solid #f59e0b',
    padding: '1rem 1.5rem',
    marginBottom: '1.5rem',
    borderRadius: '0 0.5rem 0.5rem 0',
    lineHeight: '1.7',
  };
  const noteStyle: React.CSSProperties = {
    background: '#f0fdf4',
    borderLeft: '4px solid #22c55e',
    padding: '1rem 1.5rem',
    marginBottom: '1.5rem',
    borderRadius: '0 0.5rem 0.5rem 0',
    lineHeight: '1.7',
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>
        {t.intro}
      </p>

      {/* TL;DR */}
      <div style={{
        background: '#f0f9ff',
        borderLeft: '4px solid #0ea5e9',
        padding: '1rem 1.5rem',
        marginBottom: '2rem',
        borderRadius: '0 0.5rem 0.5rem 0',
      }}>
        <strong>TL;DR:</strong> {t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
          marginTop: 0,
        }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </h3>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: 0 }}>
          {[t.takeaway1, t.takeaway2, t.takeaway3, t.takeaway4, t.takeaway5, t.takeaway6].map(
            (item, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
            )
          )}
        </ul>
      </div>

      {/* 1. Git Internals */}
      <h2 style={h2Style}>{t.h2Internals}</h2>
      <p style={pStyle}>{t.internalsDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.internalsTip}
      </div>
      <pre style={preStyle}><code>{'# Explore Git objects\n' +
'git cat-file -t HEAD          # commit\n' +
'git cat-file -p HEAD          # show commit content\n' +
'git cat-file -p HEAD^{tree}   # show tree (directory listing)\n' +
'\n' +
'# Every object is stored in .git/objects/\n' +
'# Object types: blob (file), tree (dir), commit, tag\n' +
'echo "hello" | git hash-object --stdin    # compute SHA-1\n' +
'git rev-parse HEAD             # full SHA of HEAD\n' +
'git rev-parse --short HEAD     # short SHA\n' +
'\n' +
'# Pack files compress objects for efficiency\n' +
'git count-objects -vH          # show object stats\n' +
'git gc                         # garbage collect and pack\n' +
'git verify-pack -v .git/objects/pack/*.idx | head'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.internalsNote}
      </div>

      <h3 style={h3Style}>{t.h3ObjectModel}</h3>
      <p style={pStyle}>{t.objectModelDesc}</p>

      {/* 2. Branching Strategies */}
      <h2 style={h2Style}>{t.h2Branching}</h2>
      <p style={pStyle}>{t.branchingDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.branchingTip}
      </div>
      <pre style={preStyle}><code>{'# Git Flow: structured releases\n' +
'git flow init                         # initialize git-flow\n' +
'git flow feature start user-auth      # create feature branch\n' +
'git flow feature finish user-auth     # merge to develop\n' +
'git flow release start 2.0.0          # create release branch\n' +
'git flow release finish 2.0.0         # merge to main + develop\n' +
'\n' +
'# GitHub Flow: simple continuous delivery\n' +
'git checkout -b feat/add-search       # branch from main\n' +
'git push -u origin feat/add-search    # push and open PR\n' +
'# PR review -> merge -> auto deploy\n' +
'\n' +
'# Trunk-based: short-lived branches\n' +
'git checkout -b fix/typo main\n' +
'git commit -am "fix: correct typo in header"\n' +
'git push origin fix/typo              # merge within hours'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.branchingNote}
      </div>

      <h3 style={h3Style}>{t.h3BranchNaming}</h3>
      <p style={pStyle}>{t.branchNamingDesc}</p>

      {/* 3. Interactive Rebase */}
      <h2 style={h2Style}>{t.h2Rebase}</h2>
      <p style={pStyle}>{t.rebaseDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.rebaseTip}
      </div>
      <pre style={preStyle}><code>{'# Interactive rebase last 4 commits\n' +
'git rebase -i HEAD~4\n' +
'\n' +
'# Editor opens with:\n' +
'# pick a1b2c3d Add user model\n' +
'# pick e4f5g6h Fix typo in model       -> fixup\n' +
'# pick i7j8k9l Add user controller     -> squash\n' +
'# pick m0n1o2p Update error messages   -> reword\n' +
'\n' +
'# Commands:\n' +
'# pick   = keep commit as-is\n' +
'# squash = combine with previous, edit message\n' +
'# fixup  = combine with previous, discard message\n' +
'# reword = keep commit, edit message\n' +
'# edit   = pause to amend the commit\n' +
'# drop   = remove commit entirely\n' +
'\n' +
'# Abort if something goes wrong\n' +
'git rebase --abort'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.rebaseNote}
      </div>

      <h3 style={h3Style}>{t.h3AutoSquash}</h3>
      <p style={pStyle}>{t.autoSquashDesc}</p>

      {/* 4. Cherry-Pick and Bisect */}
      <h2 style={h2Style}>{t.h2CherryBisect}</h2>
      <p style={pStyle}>{t.cherryBisectDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.cherryBisectTip}
      </div>
      <pre style={preStyle}><code>{'# Cherry-pick a single commit to current branch\n' +
'git cherry-pick abc1234\n' +
'\n' +
'# Cherry-pick range without committing\n' +
'git cherry-pick abc1234..def5678 --no-commit\n' +
'git commit -m "feat: backport fixes from develop"\n' +
'\n' +
'# Bisect: find the bug-introducing commit\n' +
'git bisect start\n' +
'git bisect bad                 # current commit is broken\n' +
'git bisect good v1.0.0         # this tag was working\n' +
'# Git checks out midpoint, test it, then:\n' +
'git bisect good                # or git bisect bad\n' +
'# Repeat until Git identifies the culprit\n' +
'git bisect reset               # return to original HEAD\n' +
'\n' +
'# Automated bisect with a test script\n' +
'git bisect start HEAD v1.0.0\n' +
'git bisect run npm test'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.cherryBisectNote}
      </div>

      <h3 style={h3Style}>{t.h3BisectAutomation}</h3>
      <p style={pStyle}>{t.bisectAutoDesc}</p>

      {/* 5. Stash and Worktrees */}
      <h2 style={h2Style}>{t.h2Stash}</h2>
      <p style={pStyle}>{t.stashDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.stashTip}
      </div>
      <pre style={preStyle}><code>{'# Stash with a descriptive message\n' +
'git stash push -m "WIP: auth refactor"\n' +
'git stash list                     # list all stashes\n' +
'git stash show -p stash@{0}        # show stash diff\n' +
'git stash pop                      # apply and remove\n' +
'git stash apply stash@{1}          # apply without removing\n' +
'git stash drop stash@{2}           # delete specific stash\n' +
'\n' +
'# Stash including untracked files\n' +
'git stash push -u -m "include new files"\n' +
'\n' +
'# Worktrees: multiple branches simultaneously\n' +
'git worktree add ../hotfix-branch hotfix/v2\n' +
'git worktree add ../feature-branch feat/search\n' +
'git worktree list                  # list all worktrees\n' +
'git worktree remove ../hotfix-branch'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.stashNote}
      </div>

      <h3 style={h3Style}>{t.h3WorktreeUseCases}</h3>
      <p style={pStyle}>{t.worktreeUseCasesDesc}</p>

      <h3 style={h3Style}>{t.h3StashBranch}</h3>
      <p style={pStyle}>{t.stashBranchDesc}</p>

      {/* 6. Git Hooks */}
      <h2 style={h2Style}>{t.h2Hooks}</h2>
      <p style={pStyle}>{t.hooksDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.hooksTip}
      </div>
      <pre style={preStyle}><code>{'#!/bin/sh\n' +
'# .husky/pre-commit\n' +
'npx lint-staged\n' +
'\n' +
'# .husky/commit-msg\n' +
'npx --no -- commitlint --edit "\\$1"\n' +
'\n' +
'# package.json lint-staged config\n' +
'# "lint-staged": {\n' +
'#   "*.{js,ts}": ["eslint --fix", "prettier --write"],\n' +
'#   "*.css": ["stylelint --fix"]\n' +
'# }\n' +
'\n' +
'# Setup husky in a project\n' +
'npx husky init\n' +
'echo "npx lint-staged" > .husky/pre-commit\n' +
'echo "npx commitlint --edit \\$1" > .husky/commit-msg'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.hooksNote}
      </div>

      <h3 style={h3Style}>{t.h3HookManagers}</h3>
      <p style={pStyle}>{t.hookManagersDesc}</p>

      <h3 style={h3Style}>{t.h3LintStaged}</h3>
      <p style={pStyle}>{t.lintStagedDesc}</p>

      {/* 7. Submodules and Subtrees */}
      <h2 style={h2Style}>{t.h2Submodules}</h2>
      <p style={pStyle}>{t.submodulesDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.submodulesTip}
      </div>
      <pre style={preStyle}><code>{'# Submodules: pointer to external repo commit\n' +
'git submodule add https://github.com/lib/utils.git libs/utils\n' +
'git submodule update --init --recursive\n' +
'git submodule update --remote         # pull latest\n' +
'\n' +
'# Clone repo with submodules\n' +
'git clone --recurse-submodules https://github.com/org/project\n' +
'\n' +
'# Subtrees: merge external repo into your tree\n' +
'git subtree add --prefix=libs/utils \\\n' +
'  https://github.com/lib/utils.git main --squash\n' +
'\n' +
'# Pull updates from subtree remote\n' +
'git subtree pull --prefix=libs/utils \\\n' +
'  https://github.com/lib/utils.git main --squash\n' +
'\n' +
'# Push changes back to subtree remote\n' +
'git subtree push --prefix=libs/utils \\\n' +
'  https://github.com/lib/utils.git main'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.submodulesNote}
      </div>

      <h3 style={h3Style}>{t.h3MonoVsMulti}</h3>
      <p style={pStyle}>{t.monoVsMultiDesc}</p>

      {/* 8. Merge vs Rebase */}
      <h2 style={h2Style}>{t.h2MergeRebase}</h2>
      <p style={pStyle}>{t.mergeRebaseDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.mergeRebaseTip}
      </div>
      <pre style={preStyle}><code>{'# Merge: preserves branch history\n' +
'git checkout main\n' +
'git merge feature/auth --no-ff    # always create merge commit\n' +
'\n' +
'# Rebase: linear history\n' +
'git checkout feature/auth\n' +
'git rebase main                   # replay commits on main\n' +
'git checkout main\n' +
'git merge feature/auth            # fast-forward merge\n' +
'\n' +
'# Resolve conflicts during rebase\n' +
'git rebase main\n' +
'# CONFLICT in file.js\n' +
'# Edit file.js to resolve\n' +
'git add file.js\n' +
'git rebase --continue\n' +
'\n' +
'# Merge strategies\n' +
'git merge -s ours legacy-branch   # keep ours, discard theirs\n' +
'git merge -X theirs feature       # prefer theirs on conflict'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.mergeRebaseNote}
      </div>

      <h3 style={h3Style}>{t.h3ConflictResolution}</h3>
      <p style={pStyle}>{t.conflictDesc}</p>

      <h3 style={h3Style}>{t.h3SquashMerge}</h3>
      <p style={pStyle}>{t.squashMergeDesc}</p>

      {/* 9. Git Reflog */}
      <h2 style={h2Style}>{t.h2Reflog}</h2>
      <p style={pStyle}>{t.reflogDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.reflogTip}
      </div>
      <pre style={preStyle}><code>{'# View reflog (every HEAD movement)\n' +
'git reflog\n' +
'# abc1234 HEAD@{0}: commit: add feature\n' +
'# def5678 HEAD@{1}: rebase: updating HEAD\n' +
'# ghi9012 HEAD@{2}: checkout: moving to main\n' +
'\n' +
'# Recover from bad rebase\n' +
'git reset --hard HEAD@{2}         # go back to before rebase\n' +
'\n' +
'# Restore a deleted branch\n' +
'git reflog | grep "checkout: moving from feature"\n' +
'git checkout -b feature/restored abc1234\n' +
'\n' +
'# Recover a dropped stash\n' +
'git fsck --unreachable | grep commit\n' +
'git stash apply <sha>\n' +
'\n' +
'# Reflog for a specific branch\n' +
'git reflog show feature/auth'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.reflogNote}
      </div>

      <h3 style={h3Style}>{t.h3RecoveryPatterns}</h3>
      <p style={pStyle}>{t.recoveryDesc}</p>

      <h3 style={h3Style}>{t.h3ReflogVsFsck}</h3>
      <p style={pStyle}>{t.reflogVsFsckDesc}</p>

      {/* 10. Signing Commits */}
      <h2 style={h2Style}>{t.h2Signing}</h2>
      <p style={pStyle}>{t.signingDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.signingTip}
      </div>
      <pre style={preStyle}><code>{'# GPG signing setup\n' +
'gpg --full-generate-key           # generate GPG key\n' +
'gpg --list-secret-keys --keyid-format=long\n' +
'git config --global user.signingkey ABC123DEF456\n' +
'git config --global commit.gpgsign true\n' +
'\n' +
'# SSH signing (Git 2.34+)\n' +
'git config --global gpg.format ssh\n' +
'git config --global user.signingkey ~/.ssh/id_ed25519.pub\n' +
'git config --global commit.gpgsign true\n' +
'\n' +
'# Sign a single commit\n' +
'git commit -S -m "feat: signed commit"\n' +
'\n' +
'# Verify signatures\n' +
'git log --show-signature -1\n' +
'git verify-commit HEAD\n' +
'git verify-tag v1.0.0'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.signingNote}
      </div>

      <h3 style={h3Style}>{t.h3VigilantMode}</h3>
      <p style={pStyle}>{t.vigilantDesc}</p>

      <h3 style={h3Style}>{t.h3SigningTags}</h3>
      <p style={pStyle}>{t.signingTagsDesc}</p>

      {/* 11. Git LFS */}
      <h2 style={h2Style}>{t.h2LFS}</h2>
      <p style={pStyle}>{t.lfsDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.lfsTip}
      </div>
      <pre style={preStyle}><code>{'# Install and initialize Git LFS\n' +
'git lfs install\n' +
'\n' +
'# Track file patterns\n' +
'git lfs track "*.psd"\n' +
'git lfs track "*.zip"\n' +
'git lfs track "datasets/**"\n' +
'\n' +
'# .gitattributes is updated automatically\n' +
'# *.psd filter=lfs diff=lfs merge=lfs -text\n' +
'\n' +
'git add .gitattributes\n' +
'git add assets/design.psd\n' +
'git commit -m "feat: add design files with LFS"\n' +
'\n' +
'# Check LFS status\n' +
'git lfs ls-files                  # list tracked files\n' +
'git lfs status                    # show pending changes\n' +
'git lfs env                       # show LFS config\n' +
'\n' +
'# Migrate existing files to LFS\n' +
'git lfs migrate import --include="*.psd"'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.lfsNote}
      </div>

      <h3 style={h3Style}>{t.h3LFSBestPractices}</h3>
      <p style={pStyle}>{t.lfsBestPracticesDesc}</p>

      {/* 12. Advanced Log and Diff */}
      <h2 style={h2Style}>{t.h2LogDiff}</h2>
      <p style={pStyle}>{t.logDiffDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.logDiffTip}
      </div>
      <pre style={preStyle}><code>{'# Pretty log formats\n' +
'git log --oneline --graph --all --decorate\n' +
'git log --pretty=format:"%h %an %ar %s" -10\n' +
'git log --since="2 weeks ago" --author="Alice"\n' +
'git log --grep="fix:" --oneline\n' +
'\n' +
'# Diff algorithms for cleaner output\n' +
'git diff --patience file.js       # better for moved blocks\n' +
'git diff --histogram               # improved patience\n' +
'git diff --word-diff               # inline word changes\n' +
'\n' +
'# Find who changed a line\n' +
'git blame -L 10,20 src/app.js\n' +
'git log -p -S "functionName"      # pickaxe search\n' +
'\n' +
'# Shortlog for changelogs\n' +
'git shortlog -sn --no-merges      # commit count by author\n' +
'git log --format="%s" v1.0..v2.0  # messages between tags'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.logDiffNote}
      </div>

      <h3 style={h3Style}>{t.h3GitAliases}</h3>
      <p style={pStyle}>{t.gitAliasesDesc}</p>

      <h3 style={h3Style}>{t.h3StatisticsReporting}</h3>
      <p style={pStyle}>{t.statsDesc}</p>

      {/* 13. CI/CD Integration */}
      <h2 style={h2Style}>{t.h2CICD}</h2>
      <p style={pStyle}>{t.cicdDesc}</p>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {t.cicdTip}
      </div>
      <pre style={preStyle}><code>{'# .github/workflows/ci.yml\n' +
'name: CI Pipeline\n' +
'on:\n' +
'  push:\n' +
'    branches: [main]\n' +
'  pull_request:\n' +
'    branches: [main]\n' +
'jobs:\n' +
'  test:\n' +
'    runs-on: ubuntu-latest\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: actions/setup-node@v4\n' +
'        with:\n' +
'          node-version: 20\n' +
'      - run: npm ci\n' +
'      - run: npm test\n' +
'\n' +
'# Conventional commits + semantic release\n' +
'# feat: -> minor, fix: -> patch, BREAKING CHANGE: -> major\n' +
'npm install -D semantic-release\n' +
'npx semantic-release              # auto version + changelog'}</code></pre>
      <div style={noteStyle}>
        <strong>{isZh ? '深入了解：' : 'Deep dive:'}</strong> {t.cicdNote}
      </div>

      <h3 style={h3Style}>{t.h3ProtectedBranches}</h3>
      <p style={pStyle}>{t.protectedBranchesDesc}</p>

      <h3 style={h3Style}>{t.h3ChangelogGeneration}</h3>
      <p style={pStyle}>{t.changelogDesc}</p>

      {/* FAQ */}
      <h2 style={h2Style}>{t.h2Faq}</h2>
      {[
        [t.faq1Q, t.faq1A],
        [t.faq2Q, t.faq2A],
        [t.faq3Q, t.faq3A],
        [t.faq4Q, t.faq4A],
        [t.faq5Q, t.faq5A],
        [t.faq6Q, t.faq6A],
        [t.faq7Q, t.faq7A],
        [t.faq8Q, t.faq8A],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={h3Style}>{q}</h3>
          <p style={pStyle}>{a}</p>
        </div>
      ))}
    </article>
  );
}
