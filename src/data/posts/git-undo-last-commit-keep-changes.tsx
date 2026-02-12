'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Git Undo Last Commit: 5 Ways to Fix Mistakes (Keep Your Changes)',
    intro: 'Made a wrong commit? Don\'t panic. Git gives you multiple ways to undo commits while keeping your code changes intact. Whether you need to fix a commit message, unstage files, or completely reverse a pushed commit, this guide covers all 5 methods with clear explanations and practical examples.',

    quickTitle: 'Quick Answer: Undo Last Commit (Keep Changes)',
    quickDesc: 'If you just want to undo your last commit and keep all changes staged (ready to commit again), run this single command:',
    quickExplain: 'This moves HEAD back one commit but leaves all your changes in the staging area. Your code is untouched — you can modify files, fix the commit message, or add more changes before committing again.',
    quickBreakdown: 'What each part means:',
    quickBreakdown1: 'git reset — the command to move HEAD to a different commit',
    quickBreakdown2: '--soft — keep changes staged (in the index)',
    quickBreakdown3: 'HEAD~1 — one commit before the current HEAD',

    method1Title: 'Method 1: git reset --soft (Undo Commit, Keep Staged)',
    method1Desc: 'git reset --soft HEAD~1 is the gentlest way to undo a commit. It moves HEAD back by one commit, but your changes remain staged. This is perfect when you want to re-do the commit with a different message or add more files.',
    method1When: 'When to use:',
    method1When1: 'You want to change the commit message',
    method1When2: 'You forgot to add a file to the commit',
    method1When3: 'You want to split one commit into two',
    method1When4: 'You want to combine this with other changes before committing',
    method1After: 'After running this command, git status shows your changes as "Changes to be committed" (green). You can immediately commit again.',

    method2Title: 'Method 2: git reset --mixed (Undo Commit, Keep Unstaged)',
    method2Desc: 'git reset --mixed HEAD~1 (or simply git reset HEAD~1, since --mixed is the default) undoes the commit AND unstages the changes. Your files are preserved, but they appear as unstaged modifications.',
    method2When: 'When to use:',
    method2When1: 'You want to selectively re-stage only some files',
    method2When2: 'You want to review changes before re-committing',
    method2When3: 'You committed the wrong files and need to reorganize',
    method2When4: 'You want to split a large commit into several smaller ones',
    method2After: 'After running this command, git status shows your changes as "Changes not staged for commit" (red). You need to git add files before committing again.',
    method2Vs: 'Difference from --soft: With --soft, changes stay staged. With --mixed, changes are unstaged. Both keep your files intact.',

    method3Title: 'Method 3: git commit --amend (Modify Last Commit)',
    method3Desc: 'git commit --amend doesn\'t technically "undo" the commit — it replaces the last commit with a new one. This is the fastest way to fix a commit message or add forgotten files without creating extra commits in your history.',
    method3When: 'When to use:',
    method3When1: 'Fix a typo in the commit message',
    method3When2: 'Add a file you forgot to include',
    method3When3: 'Remove a file that shouldn\'t have been committed',
    method3When4: 'Update the commit with small additional changes',
    method3Warning: 'Warning: --amend rewrites the commit hash. Do NOT amend commits that have been pushed to a shared branch unless you coordinate with your team.',

    method4Title: 'Method 4: git revert (Safe Undo for Pushed Commits)',
    method4Desc: 'git revert creates a NEW commit that undoes the changes from a previous commit. Unlike reset, it does not rewrite history — it adds to it. This is the only safe way to undo commits on shared/public branches.',
    method4When: 'When to use:',
    method4When1: 'The commit has already been pushed to a shared branch',
    method4When2: 'Other developers have pulled the commit',
    method4When3: 'You need an auditable undo (the revert itself is recorded)',
    method4When4: 'Working on main/master or any protected branch',
    method4How: 'How it works: If your commit added a line, the revert commit removes that line. If your commit deleted a file, the revert commit restores that file.',
    method4Vs: 'Key difference from reset: Reset removes commits from history. Revert adds a new commit that undoes changes. Reset is for local/unpushed commits. Revert is for pushed/shared commits.',

    method5Title: 'Method 5: git reflog (Recover Lost Commits)',
    method5Desc: 'git reflog is your safety net. It records every move of HEAD in your local repository — even after destructive operations like reset --hard. If you accidentally lost commits, reflog can help you recover them.',
    method5When: 'When to use:',
    method5When1: 'You ran git reset --hard and lost changes',
    method5When2: 'You need to recover a commit after a bad rebase',
    method5When3: 'You accidentally deleted a branch with unmerged commits',
    method5When4: 'You need to find a previous state of your repository',
    method5Note: 'Important: Reflog is local only. It tracks HEAD movements on YOUR machine. It does not track other people\'s actions, and entries expire after 90 days by default.',

    comparisonTitle: 'Comparison: All 5 Methods Side by Side',
    method: 'Method',
    command: 'Command',
    changesKept: 'Changes Kept?',
    historyRewritten: 'History Rewritten?',
    safeForPushed: 'Safe for Pushed?',
    bestFor: 'Best For',
    yes: 'Yes',
    no: 'No',
    yesStaged: 'Yes (staged)',
    yesUnstaged: 'Yes (unstaged)',
    replaced: 'Yes (replaced)',
    newCommit: 'No (new commit)',
    recovers: 'Recovers lost',

    pushedTitle: 'Already Pushed? How to Handle Shared Branches',
    pushedDesc: 'What you do after an undo depends on whether the commit has been pushed and whether others have pulled it.',
    pushedScenario1Title: 'Scenario 1: Pushed, but nobody pulled yet',
    pushedScenario1Desc: 'You can use reset + force push, but use --force-with-lease to avoid overwriting others\' work:',
    pushedScenario1Warning: 'Warning: Force pushing rewrites remote history. Only do this on branches you own.',
    pushedScenario2Title: 'Scenario 2: Pushed, and others have pulled',
    pushedScenario2Desc: 'Use git revert. This is the only safe option:',
    pushedScenario3Title: 'Scenario 3: Pushed to a protected branch (main/master)',
    pushedScenario3Desc: 'Most teams protect main from force pushes. You must use revert:',
    pushedRule: 'Rule of thumb: If in doubt, use git revert. It is always safe.',

    multipleTitle: 'Undo Multiple Commits: HEAD~2, HEAD~3',
    multipleDesc: 'You can undo more than one commit by changing the number after HEAD~. The number specifies how many commits to go back.',
    multipleExplain: 'HEAD~N means "N commits before HEAD". You can also use commit hashes instead:',
    multipleWarning: 'Warning: Undoing multiple commits with reset on a shared branch is dangerous. Use revert for each commit instead:',
    multipleRevertNote: 'Note: When reverting multiple commits, revert them in reverse order (newest first) to avoid conflicts.',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between git reset --soft, --mixed, and --hard?',
    faq1a: '--soft keeps changes staged (ready to commit). --mixed (default) keeps changes but unstages them. --hard discards all changes permanently. Both --soft and --mixed are safe — your code is preserved. Only --hard is destructive.',
    faq2q: 'Can I undo a git reset --hard?',
    faq2a: 'Yes, if you act quickly. Use git reflog to find the commit hash before the reset, then run git reset --hard <hash> to restore it. However, uncommitted changes that were discarded by --hard cannot be recovered by Git (they were never recorded).',
    faq3q: 'Should I use reset or revert?',
    faq3a: 'Use reset for local/unpushed commits — it gives a cleaner history. Use revert for pushed/shared commits — it is safe and doesn\'t break other developers\' history. When in doubt, use revert.',
    faq4q: 'How do I undo a merge commit?',
    faq4a: 'For an unpushed merge: git reset --hard HEAD~1 (this discards the merge). For a pushed merge: git revert -m 1 HEAD (the -m 1 flag tells Git which parent to revert to, usually the main branch). Be careful: reverting a merge makes it tricky to re-merge the same branch later.',
    faq5q: 'What does HEAD~1 mean vs HEAD^?',
    faq5a: 'For most cases, HEAD~1 and HEAD^ are identical — both refer to the parent of the current commit. The difference matters for merge commits: HEAD^ is the first parent (usually main), HEAD^2 is the second parent (the merged branch). HEAD~2 means "grandparent" (two commits back in the first-parent chain).',
    faq6q: 'How do I undo a commit but keep the files on disk?',
    faq6a: 'Use git reset --soft HEAD~1 (keeps changes staged) or git reset HEAD~1 (keeps changes unstaged). Both preserve your files. Only git reset --hard HEAD~1 deletes your changes. If you already used --hard, check git reflog immediately.',
  },
  zh: {
    title: 'Git 撤销上次提交：5 种方法修复错误（保留代码更改）',
    intro: '提交错了？不要慌。Git 提供了多种方法来撤销提交，同时保留你的代码更改。无论你需要修复提交消息、取消暂存文件，还是完全撤销已推送的提交，本指南涵盖了所有 5 种方法，附带清晰的解释和实用示例。',

    quickTitle: '快速解答：撤销上次提交（保留更改）',
    quickDesc: '如果你只是想撤销上次提交并保留所有更改在暂存区（随时可以重新提交），运行这一条命令：',
    quickExplain: '这会将 HEAD 回退一个提交，但所有更改保留在暂存区。你的代码完全不变——你可以修改文件、修复提交消息，或添加更多更改后再次提交。',
    quickBreakdown: '各部分含义：',
    quickBreakdown1: 'git reset — 将 HEAD 移动到不同提交的命令',
    quickBreakdown2: '--soft — 保留更改在暂存区（索引中）',
    quickBreakdown3: 'HEAD~1 — 当前 HEAD 的前一个提交',

    method1Title: '方法一：git reset --soft（撤销提交，保留暂存）',
    method1Desc: 'git reset --soft HEAD~1 是最温和的撤销提交方式。它将 HEAD 回退一个提交，但你的更改保留在暂存区。当你想用不同的消息重新提交或添加更多文件时，这是最佳选择。',
    method1When: '适用场景：',
    method1When1: '你想更改提交消息',
    method1When2: '你忘记在提交中添加某个文件',
    method1When3: '你想将一个提交拆分为两个',
    method1When4: '你想与其他更改合并后再提交',
    method1After: '运行此命令后，git status 显示你的更改为"已暂存的更改"（绿色）。你可以立即再次提交。',

    method2Title: '方法二：git reset --mixed（撤销提交，保留未暂存）',
    method2Desc: 'git reset --mixed HEAD~1（或简写为 git reset HEAD~1，因为 --mixed 是默认选项）撤销提交并取消暂存更改。你的文件被保留，但显示为未暂存的修改。',
    method2When: '适用场景：',
    method2When1: '你想有选择地只重新暂存部分文件',
    method2When2: '你想在重新提交前审查更改',
    method2When3: '你提交了错误的文件，需要重新组织',
    method2When4: '你想将一个大提交拆分为几个小提交',
    method2After: '运行此命令后，git status 显示你的更改为"未暂存的更改"（红色）。你需要先 git add 文件才能再次提交。',
    method2Vs: '与 --soft 的区别：--soft 保持更改在暂存区。--mixed 取消暂存更改。两者都保留你的文件完整性。',

    method3Title: '方法三：git commit --amend（修改上次提交）',
    method3Desc: 'git commit --amend 严格来说不是"撤销"提交——它用一个新提交替换上次提交。这是修复提交消息或添加遗忘文件的最快方式，不会在历史中产生额外的提交。',
    method3When: '适用场景：',
    method3When1: '修复提交消息中的拼写错误',
    method3When2: '添加忘记包含的文件',
    method3When3: '移除不应该被提交的文件',
    method3When4: '用少量额外更改更新提交',
    method3Warning: '警告：--amend 会重写提交哈希。不要修改已推送到共享分支的提交，除非你与团队协调好。',

    method4Title: '方法四：git revert（已推送提交的安全撤销）',
    method4Desc: 'git revert 创建一个新提交来撤销之前提交的更改。与 reset 不同，它不会重写历史——而是添加历史。这是在共享/公共分支上撤销提交的唯一安全方式。',
    method4When: '适用场景：',
    method4When1: '提交已推送到共享分支',
    method4When2: '其他开发者已拉取该提交',
    method4When3: '你需要可审计的撤销（revert 本身会被记录）',
    method4When4: '在 main/master 或任何受保护分支上工作',
    method4How: '工作原理：如果你的提交添加了一行，revert 提交会删除那一行。如果你的提交删除了一个文件，revert 提交会恢复该文件。',
    method4Vs: '与 reset 的关键区别：Reset 从历史中移除提交。Revert 添加一个新提交来撤销更改。Reset 用于本地/未推送的提交。Revert 用于已推送/共享的提交。',

    method5Title: '方法五：git reflog（恢复丢失的提交）',
    method5Desc: 'git reflog 是你的安全网。它记录本地仓库中 HEAD 的每一次移动——即使在 reset --hard 等破坏性操作之后。如果你意外丢失了提交，reflog 可以帮你恢复。',
    method5When: '适用场景：',
    method5When1: '你运行了 git reset --hard 并丢失了更改',
    method5When2: '你需要在错误的 rebase 后恢复提交',
    method5When3: '你意外删除了包含未合并提交的分支',
    method5When4: '你需要找到仓库的先前状态',
    method5Note: '重要提示：Reflog 仅限本地。它跟踪你的机器上 HEAD 的移动。它不跟踪其他人的操作，条目默认在 90 天后过期。',

    comparisonTitle: '对比：5 种方法一览',
    method: '方法',
    command: '命令',
    changesKept: '保留更改？',
    historyRewritten: '重写历史？',
    safeForPushed: '对已推送安全？',
    bestFor: '最适合',
    yes: '是',
    no: '否',
    yesStaged: '是（已暂存）',
    yesUnstaged: '是（未暂存）',
    replaced: '是（替换）',
    newCommit: '否（新提交）',
    recovers: '恢复丢失的',

    pushedTitle: '已经推送了？如何处理共享分支',
    pushedDesc: '撤销后的操作取决于提交是否已推送以及其他人是否已拉取。',
    pushedScenario1Title: '场景 1：已推送，但还没人拉取',
    pushedScenario1Desc: '你可以使用 reset + 强制推送，但要用 --force-with-lease 以避免覆盖他人的工作：',
    pushedScenario1Warning: '警告：强制推送会重写远程历史。只在你自己拥有的分支上这样做。',
    pushedScenario2Title: '场景 2：已推送，且其他人已拉取',
    pushedScenario2Desc: '使用 git revert。这是唯一安全的选择：',
    pushedScenario3Title: '场景 3：推送到了受保护分支（main/master）',
    pushedScenario3Desc: '大多数团队保护 main 分支不允许强制推送。你必须使用 revert：',
    pushedRule: '经验法则：如果不确定，使用 git revert。它始终是安全的。',

    multipleTitle: '撤销多个提交：HEAD~2、HEAD~3',
    multipleDesc: '你可以通过更改 HEAD~ 后面的数字来撤销多个提交。数字指定要回退多少个提交。',
    multipleExplain: 'HEAD~N 表示"HEAD 之前 N 个提交"。你也可以使用提交哈希：',
    multipleWarning: '警告：在共享分支上使用 reset 撤销多个提交是危险的。应该对每个提交使用 revert：',
    multipleRevertNote: '提示：撤销多个提交时，按倒序（从最新开始）逐个 revert 以避免冲突。',

    faqTitle: '常见问题',
    faq1q: 'git reset --soft、--mixed 和 --hard 有什么区别？',
    faq1a: '--soft 保留更改在暂存区（随时可提交）。--mixed（默认）保留更改但取消暂存。--hard 永久丢弃所有更改。--soft 和 --mixed 都是安全的——你的代码会被保留。只有 --hard 是破坏性的。',
    faq2q: '可以撤销 git reset --hard 吗？',
    faq2a: '如果及时操作，可以。使用 git reflog 找到 reset 之前的提交哈希，然后运行 git reset --hard <hash> 来恢复。但是，被 --hard 丢弃的未提交更改无法被 Git 恢复（它们从未被记录）。',
    faq3q: '应该使用 reset 还是 revert？',
    faq3a: '对本地/未推送的提交使用 reset——历史更干净。对已推送/共享的提交使用 revert——安全且不会破坏其他开发者的历史。如果不确定，用 revert。',
    faq4q: '如何撤销合并提交？',
    faq4a: '对于未推送的合并：git reset --hard HEAD~1（丢弃合并）。对于已推送的合并：git revert -m 1 HEAD（-m 1 告诉 Git 回退到哪个父提交，通常是主分支）。注意：撤销合并后，重新合并同一分支会变得复杂。',
    faq5q: 'HEAD~1 和 HEAD^ 有什么区别？',
    faq5a: '在大多数情况下，HEAD~1 和 HEAD^ 是相同的——都指向当前提交的父提交。区别在合并提交时才重要：HEAD^ 是第一个父提交（通常是 main），HEAD^2 是第二个父提交（被合并的分支）。HEAD~2 表示"祖父提交"（在第一父链中回退两步）。',
    faq6q: '如何撤销提交但保留磁盘上的文件？',
    faq6a: '使用 git reset --soft HEAD~1（保留更改在暂存区）或 git reset HEAD~1（保留更改为未暂存）。两者都会保留你的文件。只有 git reset --hard HEAD~1 会删除你的更改。如果你已经用了 --hard，立即检查 git reflog。',
  },
};

export default function GitUndoLastCommit({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p className="text-lg leading-relaxed mb-8">{t.intro}</p>

      {/* Quick Answer */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.quickTitle}</h2>
      <p className="mb-4">{t.quickDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`$ git reset --soft HEAD~1`}</code></pre>
      <p className="mt-4 mb-4">{t.quickExplain}</p>
      <p className="font-semibold mb-2">{t.quickBreakdown}</p>
      <ul className="list-disc pl-6 space-y-1 mb-6">
        <li><code className="text-yellow-300">git reset</code> — {t.quickBreakdown1}</li>
        <li><code className="text-yellow-300">--soft</code> — {t.quickBreakdown2}</li>
        <li><code className="text-yellow-300">HEAD~1</code> — {t.quickBreakdown3}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Before: You committed something wrong
$ git log --oneline
a1b2c3d (HEAD -> main) wrong commit message
f4e5d6c previous good commit

# Undo it:
$ git reset --soft HEAD~1

# After: Commit is gone, changes are staged
$ git log --oneline
f4e5d6c (HEAD -> main) previous good commit

$ git status
Changes to be committed:
  modified:   src/app.tsx
  modified:   src/utils.ts`}</code></pre>

      {/* Method 1: git reset --soft */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.method1Title}</h2>
      <p className="mb-4">{t.method1Desc}</p>
      <p className="font-semibold mb-2">{t.method1When}</p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li>{t.method1When1}</li>
        <li>{t.method1When2}</li>
        <li>{t.method1When3}</li>
        <li>{t.method1When4}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Undo last commit, keep changes staged
$ git reset --soft HEAD~1

# Fix the commit message and recommit
$ git commit -m "correct commit message"

# Or add a forgotten file and recommit
$ git add forgotten-file.ts
$ git commit -m "feature: add login with all files"

# Or split into two commits
$ git reset --soft HEAD~1
$ git reset HEAD src/unrelated-file.ts   # unstage one file
$ git commit -m "feature: add login"
$ git add src/unrelated-file.ts
$ git commit -m "fix: update config"`}</code></pre>
      <p className="mt-4 text-gray-300">{t.method1After}</p>

      {/* Method 2: git reset --mixed */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.method2Title}</h2>
      <p className="mb-4">{t.method2Desc}</p>
      <p className="font-semibold mb-2">{t.method2When}</p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li>{t.method2When1}</li>
        <li>{t.method2When2}</li>
        <li>{t.method2When3}</li>
        <li>{t.method2When4}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Undo last commit, unstage all changes
$ git reset HEAD~1          # --mixed is the default
# or explicitly:
$ git reset --mixed HEAD~1

# Now selectively stage what you need
$ git status
Changes not staged for commit:
  modified:   src/auth.ts
  modified:   src/config.ts
  modified:   src/test.ts

# Stage only what belongs in this commit
$ git add src/auth.ts
$ git commit -m "feature: add authentication"

# Stage the rest separately
$ git add src/config.ts src/test.ts
$ git commit -m "chore: update config and tests"`}</code></pre>
      <p className="mt-4 text-gray-300">{t.method2After}</p>
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-4">
        <p className="text-blue-300">{t.method2Vs}</p>
      </div>

      {/* Method 3: git commit --amend */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.method3Title}</h2>
      <p className="mb-4">{t.method3Desc}</p>
      <p className="font-semibold mb-2">{t.method3When}</p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li>{t.method3When1}</li>
        <li>{t.method3When2}</li>
        <li>{t.method3When3}</li>
        <li>{t.method3When4}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Fix commit message only
$ git commit --amend -m "fix: correct the typo in error handler"

# Add a forgotten file to the last commit
$ git add forgotten-file.ts
$ git commit --amend --no-edit    # keeps the original message

# Remove a file from the last commit
$ git reset HEAD^ -- secrets.env  # unstage the file
$ git commit --amend --no-edit

# Change both message and content
$ git add extra-changes.ts
$ git commit --amend -m "feature: complete login with validation"

# View the amended result
$ git log --oneline -1
b2c3d4e (HEAD -> main) feature: complete login with validation`}</code></pre>
      <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mt-4">
        <p className="text-yellow-300">{t.method3Warning}</p>
      </div>

      {/* Method 4: git revert */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.method4Title}</h2>
      <p className="mb-4">{t.method4Desc}</p>
      <p className="font-semibold mb-2">{t.method4When}</p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li>{t.method4When1}</li>
        <li>{t.method4When2}</li>
        <li>{t.method4When3}</li>
        <li>{t.method4When4}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Revert the last commit (creates a new commit)
$ git revert HEAD

# Git opens editor with default message:
# Revert "add broken feature"
# This reverts commit a1b2c3d.

# Skip the editor, use default message
$ git revert HEAD --no-edit

# Revert a specific commit by hash
$ git revert a1b2c3d

# Revert without committing (stage changes only)
$ git revert HEAD --no-commit
$ git status
Changes to be committed:
  modified:   src/feature.ts    # changes are reversed
$ git commit -m "revert: remove broken feature"

# Result: history shows both the original and the revert
$ git log --oneline
e5f6g7h (HEAD -> main) Revert "add broken feature"
a1b2c3d add broken feature
f4e5d6c previous good commit`}</code></pre>
      <p className="mt-4 mb-2">{t.method4How}</p>
      <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mt-4">
        <p className="text-green-300">{t.method4Vs}</p>
      </div>

      {/* Method 5: git reflog */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.method5Title}</h2>
      <p className="mb-4">{t.method5Desc}</p>
      <p className="font-semibold mb-2">{t.method5When}</p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li>{t.method5When1}</li>
        <li>{t.method5When2}</li>
        <li>{t.method5When3}</li>
        <li>{t.method5When4}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# View the reflog (recent HEAD movements)
$ git reflog
a1b2c3d (HEAD -> main) HEAD@{0}: reset: moving to HEAD~1
f4e5d6c HEAD@{1}: commit: add important feature
b7c8d9e HEAD@{2}: commit: previous work
...

# Oh no! I accidentally reset --hard and lost my commit!
# Find it in reflog:
$ git reflog
b7c8d9e (HEAD -> main) HEAD@{0}: reset: moving to HEAD~1
f4e5d6c HEAD@{1}: commit: add important feature   # <-- there it is!

# Recover it:
$ git reset --hard f4e5d6c
# or create a new branch from it:
$ git branch recover-branch f4e5d6c

# Recover after a bad rebase:
$ git reflog
c1d2e3f (HEAD -> feature) HEAD@{0}: rebase (finish)
a1b2c3d HEAD@{1}: rebase (start)
x9y8z7w HEAD@{2}: commit: my work before rebase  # <-- before rebase

$ git reset --hard x9y8z7w   # back to pre-rebase state

# Recover a deleted branch:
$ git branch -D feature-branch    # oops!
$ git reflog | grep feature
h1i2j3k HEAD@{5}: commit: work on feature-branch
$ git checkout -b feature-branch h1i2j3k   # recovered!`}</code></pre>
      <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4 mt-4">
        <p className="text-purple-300">{t.method5Note}</p>
      </div>

      {/* Comparison Table */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.comparisonTitle}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-3 py-2 text-left">{t.method}</th>
              <th className="border border-gray-700 px-3 py-2 text-left">{t.command}</th>
              <th className="border border-gray-700 px-3 py-2 text-left">{t.changesKept}</th>
              <th className="border border-gray-700 px-3 py-2 text-left">{t.historyRewritten}</th>
              <th className="border border-gray-700 px-3 py-2 text-left">{t.safeForPushed}</th>
              <th className="border border-gray-700 px-3 py-2 text-left">{t.bestFor}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-3 py-2 font-mono">reset --soft</td>
              <td className="border border-gray-700 px-3 py-2 font-mono text-xs">git reset --soft HEAD~1</td>
              <td className="border border-gray-700 px-3 py-2 text-green-400">{t.yesStaged}</td>
              <td className="border border-gray-700 px-3 py-2 text-yellow-400">{t.yes}</td>
              <td className="border border-gray-700 px-3 py-2 text-red-400">{t.no}</td>
              <td className="border border-gray-700 px-3 py-2">{lang === 'zh' ? '重新提交/修改消息' : 'Recommit / fix message'}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-3 py-2 font-mono">reset --mixed</td>
              <td className="border border-gray-700 px-3 py-2 font-mono text-xs">git reset HEAD~1</td>
              <td className="border border-gray-700 px-3 py-2 text-green-400">{t.yesUnstaged}</td>
              <td className="border border-gray-700 px-3 py-2 text-yellow-400">{t.yes}</td>
              <td className="border border-gray-700 px-3 py-2 text-red-400">{t.no}</td>
              <td className="border border-gray-700 px-3 py-2">{lang === 'zh' ? '选择性重新暂存' : 'Selective re-staging'}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-3 py-2 font-mono">commit --amend</td>
              <td className="border border-gray-700 px-3 py-2 font-mono text-xs">git commit --amend</td>
              <td className="border border-gray-700 px-3 py-2 text-green-400">{t.replaced}</td>
              <td className="border border-gray-700 px-3 py-2 text-yellow-400">{t.yes}</td>
              <td className="border border-gray-700 px-3 py-2 text-red-400">{t.no}</td>
              <td className="border border-gray-700 px-3 py-2">{lang === 'zh' ? '快速修复上次提交' : 'Quick fix last commit'}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-3 py-2 font-mono">revert</td>
              <td className="border border-gray-700 px-3 py-2 font-mono text-xs">git revert HEAD</td>
              <td className="border border-gray-700 px-3 py-2 text-green-400">{t.newCommit}</td>
              <td className="border border-gray-700 px-3 py-2 text-green-400">{t.no}</td>
              <td className="border border-gray-700 px-3 py-2 text-green-400">{t.yes}</td>
              <td className="border border-gray-700 px-3 py-2">{lang === 'zh' ? '已推送/共享的提交' : 'Pushed / shared commits'}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-3 py-2 font-mono">reflog</td>
              <td className="border border-gray-700 px-3 py-2 font-mono text-xs">git reflog + reset</td>
              <td className="border border-gray-700 px-3 py-2 text-green-400">{t.recovers}</td>
              <td className="border border-gray-700 px-3 py-2 text-gray-400">-</td>
              <td className="border border-gray-700 px-3 py-2 text-gray-400">-</td>
              <td className="border border-gray-700 px-3 py-2">{lang === 'zh' ? '恢复丢失的提交' : 'Recovering lost commits'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Visual: reset modes */}
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-6"><code>{`# Visual: How the 3 reset modes affect your changes

                    Working Dir    Staging Area    Repository
                    ───────────    ────────────    ──────────
reset --soft          ✓ kept        ✓ kept        ✗ commit removed
reset --mixed         ✓ kept        ✗ unstaged    ✗ commit removed
reset --hard          ✗ DELETED     ✗ DELETED     ✗ commit removed

commit --amend        ✓ kept        ✓ merged      ✗ commit replaced
revert                ✓ kept        ✓ new commit  ✓ preserved (adds new)`}</code></pre>

      {/* Already Pushed */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.pushedTitle}</h2>
      <p className="mb-4">{t.pushedDesc}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.pushedScenario1Title}</h3>
      <p className="mb-2">{t.pushedScenario1Desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Undo the commit locally
$ git reset --soft HEAD~1

# Make your fix
$ git add .
$ git commit -m "correct commit"

# Force push (safe version)
$ git push --force-with-lease origin my-branch`}</code></pre>
      <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mt-2 mb-4">
        <p className="text-yellow-300">{t.pushedScenario1Warning}</p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.pushedScenario2Title}</h3>
      <p className="mb-2">{t.pushedScenario2Desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Create a revert commit
$ git revert HEAD --no-edit

# Push normally (no force needed)
$ git push origin main`}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.pushedScenario3Title}</h3>
      <p className="mb-2">{t.pushedScenario3Desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# On a protected branch, revert is your only option
$ git revert HEAD --no-edit
$ git push origin main

# Or revert via a pull request:
$ git checkout -b revert-broken-feature
$ git revert HEAD --no-edit
$ git push origin revert-broken-feature
# Then create a PR to merge the revert`}</code></pre>

      <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mt-4">
        <p className="font-bold text-green-300">{t.pushedRule}</p>
      </div>

      {/* Undo Multiple Commits */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.multipleTitle}</h2>
      <p className="mb-4">{t.multipleDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Undo last 2 commits (keep changes staged)
$ git reset --soft HEAD~2

# Undo last 3 commits (keep changes unstaged)
$ git reset HEAD~3

# Undo last 5 commits (DISCARD all changes - dangerous!)
$ git reset --hard HEAD~5`}</code></pre>
      <p className="mt-4 mb-4">{t.multipleExplain}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Reset to a specific commit hash
$ git log --oneline
a1b2c3d (HEAD) fourth commit
e4f5g6h third commit
i7j8k9l second commit
m0n1o2p first commit

# Go back to "second commit"
$ git reset --soft i7j8k9l
# Now "third commit" and "fourth commit" changes are staged`}</code></pre>
      <p className="mt-4 mb-4 font-semibold text-yellow-300">{t.multipleWarning}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Safe way to undo multiple pushed commits: revert each one
# Revert in reverse order (newest first)
$ git revert HEAD --no-edit        # undo commit 3
$ git revert HEAD~1 --no-edit      # undo commit 2

# Or revert a range (Git 1.7.2+)
$ git revert HEAD~2..HEAD --no-edit

# Push all reverts at once
$ git push origin main`}</code></pre>
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-4">
        <p className="text-blue-300">{t.multipleRevertNote}</p>
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.faqTitle}</h2>
      <div className="space-y-6">
        {[
          [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a],
          [t.faq4q, t.faq4a], [t.faq5q, t.faq5a], [t.faq6q, t.faq6a],
        ].map(([q, a], i) => (
          <div key={i} className="border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{q}</h3>
            <p className="text-gray-300">{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
