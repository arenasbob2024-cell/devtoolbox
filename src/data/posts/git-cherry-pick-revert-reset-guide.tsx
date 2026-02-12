'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'Understanding <strong>git cherry-pick</strong>, <strong>git revert</strong>, and <strong>git reset</strong> is essential for any developer who needs to move commits between branches, undo mistakes, or rewrite history. This comprehensive guide covers each command in depth with practical examples, conflict resolution strategies, and real-world workflows. Whether you need to backport a hotfix, undo a bad deploy, or clean up messy history, you will find the right approach here.',
    linkTool: 'Generate Git commands interactively with our Git Command Generator \u2192',

    h2CherryPickBasics: 'Cherry-Pick Basics: Applying Individual Commits',
    pCherryPickBasics: 'git cherry-pick takes one or more existing commits and applies them as new commits on the current branch. Unlike merge or rebase, cherry-pick lets you select specific commits rather than integrating an entire branch. The original commit remains untouched \u2014 cherry-pick creates a brand new commit with a different hash but identical changes.',
    pCherryPickWhen: 'When to use cherry-pick:',
    cherryPickWhen1: 'Backporting a bug fix from a development branch to a release branch',
    cherryPickWhen2: 'Pulling a single feature commit without merging unrelated changes',
    cherryPickWhen3: 'Recovering a commit from a deleted or abandoned branch',
    cherryPickWhen4: 'Applying a fix to multiple maintenance branches',

    h2CherryPickOptions: 'Cherry-Pick Options and Flags',
    pCherryPickOptions: 'git cherry-pick supports several useful flags that control how the commit is applied. These options give you fine-grained control over the cherry-pick process.',
    optNoCommit: '--no-commit (-n): Apply changes to the working directory and staging area without creating a commit. This lets you combine multiple cherry-picks into a single commit or modify the changes before committing.',
    optAppendSource: '-x: Append a line "(cherry picked from commit ...)" to the commit message. This is extremely useful for tracking the origin of cherry-picked commits, especially across release branches.',
    optEdit: '--edit (-e): Open the commit message editor before creating the commit. Use this when you need to adjust the commit message for context in the target branch.',
    optRange: 'A..B range: Cherry-pick a range of commits from A (exclusive) to B (inclusive). Note that A is NOT included \u2014 it defines the starting point.',
    optSignoff: '--signoff (-s): Add a "Signed-off-by" trailer to the commit message, commonly required in open-source projects.',

    h2CherryPickConflicts: 'Resolving Cherry-Pick Conflicts',
    pCherryPickConflicts: 'Cherry-pick conflicts happen when the changes in the cherry-picked commit overlap with changes already on the target branch. Since the commit is being applied out of its original context, conflicts are more common than with regular merges.',
    pConflictSteps: 'When a conflict occurs, Git pauses the cherry-pick and marks the conflicting files. You have three options:',
    conflictStep1: 'Resolve and continue: Fix the conflict markers in the affected files, stage the resolved files with git add, then run git cherry-pick --continue.',
    conflictStep2: 'Abort: Run git cherry-pick --abort to cancel the cherry-pick entirely and return to the state before it started.',
    conflictStep3: 'Skip: Run git cherry-pick --skip to skip the current commit and move on to the next one (when cherry-picking a range).',

    h2Revert: 'Git Revert: Safely Undoing Commits',
    pRevert: 'git revert creates a new commit that undoes the changes introduced by a previous commit. Unlike reset, revert does not rewrite history \u2014 it adds to it. This makes revert safe for shared branches because other collaborators will not have their history invalidated.',
    pRevertMerge: 'Reverting a merge commit is a special case. Merge commits have two parents, so you must tell Git which parent to revert to using the -m flag. In most cases, -m 1 specifies the mainline (the branch you merged into), which is what you typically want.',
    pRevertWarning: 'Important: After reverting a merge, if you later want to re-merge the same branch, Git will think those changes already exist. You will need to "revert the revert" first.',

    h2Reset: 'Git Reset: Moving the Branch Pointer',
    pReset: 'git reset moves the current branch pointer to a specified commit. Depending on the mode used, it may also modify the staging area (index) and working directory. Understanding the three modes is critical to using reset safely.',
    resetSoftTitle: '--soft: Move HEAD only',
    resetSoftDesc: 'Moves HEAD to the target commit. Staging area and working directory are untouched. All changes from the "removed" commits appear as staged (ready to commit). Perfect for squashing commits or re-doing a commit message.',
    resetMixedTitle: '--mixed (default): Move HEAD + unstage',
    resetMixedDesc: 'Moves HEAD to the target commit and resets the staging area. Changes remain in the working directory as unstaged modifications. This is the default mode when you run git reset without a flag.',
    resetHardTitle: '--hard: Move HEAD + unstage + discard',
    resetHardDesc: 'Moves HEAD to the target commit, resets the staging area, AND discards all changes in the working directory. This is destructive \u2014 uncommitted work is permanently lost (unless recoverable via reflog for committed changes).',
    resetTableHeader: 'Comparison Table: git reset modes',
    resetTableMode: 'Mode',
    resetTableHead: 'HEAD',
    resetTableIndex: 'Staging Area (Index)',
    resetTableWorking: 'Working Directory',
    resetTableSafe: 'Safe?',
    resetTableSoftRow: 'Moved|Unchanged|Unchanged|Yes',
    resetTableMixedRow: 'Moved|Reset|Unchanged|Yes',
    resetTableHardRow: 'Moved|Reset|Reset (deleted)|NO',

    h2ResetVsRevertVsCheckout: 'Reset vs Revert vs Checkout: When to Use Which',
    pResetVsRevertVsCheckout: 'These three commands all "undo" changes, but they work at fundamentally different levels. Choosing the right one depends on whether the commits are pushed and whether you want to preserve history.',
    compareReset: 'git reset: Rewrites history by moving the branch pointer backward. Use for local/unpushed commits only. Cannot be used safely on shared branches.',
    compareRevert: 'git revert: Creates a new commit that reverses changes. Safe for shared branches. Does not rewrite history. Use when commits are already pushed.',
    compareCheckout: 'git checkout (or git restore): Modifies the working directory without affecting commits or branches. Use for discarding uncommitted changes to specific files.',
    pSafetyRule: 'The golden rule: If the commit has been pushed to a shared remote, use revert. If it is local only, reset is cleaner.',

    h2UndoCherryPick: 'Undoing a Cherry-Pick',
    pUndoCherryPick: 'If you cherry-picked a commit and want to undo it, you have two approaches depending on whether you have pushed the cherry-pick:',
    undoNotPushed: 'Not pushed yet: Use git reset to move HEAD back before the cherry-picked commit. This cleanly removes it from history.',
    undoPushed: 'Already pushed: Use git revert on the cherry-picked commit. This creates a new commit that reverses the cherry-pick without rewriting shared history.',

    h2CrossRepo: 'Cherry-Pick Across Repositories',
    pCrossRepo: 'Sometimes you need to cherry-pick a commit from a different repository (e.g., from an upstream project or a colleague\'s fork). Git supports this by adding the other repo as a remote, fetching its commits, and then cherry-picking.',
    pCrossRepoSteps: 'The workflow involves three steps: add the remote, fetch its branches, and cherry-pick the specific commit by its hash.',

    h2RebaseAlternative: 'Interactive Rebase as an Alternative to Cherry-Pick',
    pRebaseAlternative: 'In many cases, interactive rebase (git rebase -i) can accomplish what cherry-pick does, but with more flexibility. Rebase is better when you want to reorder, squash, edit, or drop commits within the same branch. Cherry-pick is better when you want to copy commits between different branches.',
    rebaseWhen: 'Use rebase instead of cherry-pick when:',
    rebaseWhen1: 'You want to clean up commits before merging a feature branch',
    rebaseWhen2: 'You need to reorder commits within the same branch',
    rebaseWhen3: 'You want to squash multiple commits into one',
    rebaseWhen4: 'You are moving an entire sequence of commits (not just one or two)',
    cherryPickWhenBetter: 'Use cherry-pick instead of rebase when:',
    cherryPickWhenBetter1: 'You need to copy specific commits to a completely different branch',
    cherryPickWhenBetter2: 'You want to backport a fix to a release/maintenance branch',
    cherryPickWhenBetter3: 'You only need one or two commits, not a whole sequence',

    h2RealWorld: 'Real-World Scenarios',
    pRealWorld: 'Let us walk through the most common real-world situations where cherry-pick, revert, and reset are the right tools.',
    scenarioHotfix: 'Scenario 1: Hotfix Backport',
    scenarioHotfixDesc: 'A critical bug is found in production. The fix was already committed on the develop branch. You need to apply just that fix to the release branch without pulling in unfinished features.',
    scenarioExtract: 'Scenario 2: Feature Extraction',
    scenarioExtractDesc: 'A developer committed a useful utility function as part of a larger feature branch. Another team needs that utility immediately but cannot wait for the full feature to be merged.',
    scenarioRelease: 'Scenario 3: Release Branch Patches',
    scenarioReleaseDesc: 'You maintain multiple release branches (v1.x, v2.x). A security fix committed on main needs to be applied to all active release branches.',

    h2DangerousOps: 'Dangerous Operations and Safety Nets',
    pDangerousOps: 'Some Git operations can cause permanent data loss if used carelessly. Understanding the risks and knowing the recovery mechanisms is essential.',
    dangerResetHard: 'git reset --hard: Permanently discards uncommitted changes. There is no way to recover unstaged or untracked files after this operation. Always check git status and git stash before using --hard.',
    dangerForcePush: 'git push --force: Overwrites the remote branch history. This can destroy other developers\' work if they have based commits on the old history. Prefer --force-with-lease which refuses to push if the remote has been updated since your last fetch.',
    dangerReflog: 'The safety net \u2014 git reflog: Git records every HEAD movement in the reflog. Even after a destructive reset, you can often recover commits by finding their hash in the reflog and checking them out or creating a branch from them. The reflog is kept for 90 days by default.',

    h2Faq: 'Frequently Asked Questions',
    faq1q: 'What is the difference between git cherry-pick and git merge?',
    faq1a: 'git merge integrates all commits from one branch into another, creating a merge commit that joins the two histories. git cherry-pick copies only specific individual commits and applies them as new commits on the current branch. Use merge when you want to integrate an entire branch; use cherry-pick when you only need specific commits.',
    faq2q: 'Can I cherry-pick a merge commit?',
    faq2a: 'Yes, but you must specify which parent to use with the -m flag. For example, "git cherry-pick -m 1 <merge-commit-hash>" tells Git to use the first parent (the branch that was merged into) as the base. However, cherry-picking merge commits is generally discouraged because it can cause confusing duplicate changes. Consider cherry-picking the individual commits from the merged branch instead.',
    faq3q: 'How do I undo a git reset --hard?',
    faq3a: 'If you reset --hard and lost commits, use "git reflog" to find the commit hash before the reset, then run "git reset --hard <hash>" or "git branch recovery <hash>" to restore them. However, uncommitted changes (files that were never staged or committed) cannot be recovered by Git after a hard reset.',
    faq4q: 'Should I use git reset or git revert to undo a commit?',
    faq4a: 'Use git reset for local/unpushed commits \u2014 it gives a cleaner history by removing the commit entirely. Use git revert for commits that have been pushed to a shared remote \u2014 it creates a new "undo" commit without rewriting history. If you are unsure whether others have pulled your commit, always use revert to be safe.',
    faq5q: 'Why does my cherry-pick create a different commit hash than the original?',
    faq5a: 'A commit hash is determined by the commit content, parent, author date, and committer date. When you cherry-pick, the new commit has a different parent and a new committer date, so it gets a different hash even though the code changes are identical. This is by design \u2014 Git treats them as distinct commits. Use the -x flag to add a reference to the original commit in the message.',

    pConclusion: 'Mastering git cherry-pick, revert, and reset gives you precise control over your repository history. Remember: use reset for local cleanup, revert for shared branches, and cherry-pick for copying specific commits. When in doubt, check git reflog \u2014 it is your safety net.',
    linkToolBottom: 'Try the Git Command Generator \u2192',
  },
  zh: {
    intro: '\u7406\u89e3 <strong>git cherry-pick</strong>\u3001<strong>git revert</strong> \u548c <strong>git reset</strong> \u5bf9\u4e8e\u4efb\u4f55\u9700\u8981\u5728\u5206\u652f\u4e4b\u95f4\u79fb\u52a8\u63d0\u4ea4\u3001\u64a4\u9500\u9519\u8bef\u6216\u91cd\u5199\u5386\u53f2\u7684\u5f00\u53d1\u8005\u6765\u8bf4\u90fd\u662f\u5fc5\u4e0d\u53ef\u5c11\u7684\u3002\u672c\u7efc\u5408\u6307\u5357\u6df1\u5165\u8bb2\u89e3\u6bcf\u4e2a\u547d\u4ee4\uff0c\u63d0\u4f9b\u5b9e\u9645\u793a\u4f8b\u3001\u51b2\u7a81\u89e3\u51b3\u7b56\u7565\u548c\u771f\u5b9e\u5de5\u4f5c\u6d41\u7a0b\u3002\u65e0\u8bba\u4f60\u9700\u8981\u56de\u79fb\u70ed\u4fee\u590d\u3001\u64a4\u9500\u9519\u8bef\u90e8\u7f72\u8fd8\u662f\u6e05\u7406\u6df7\u4e71\u7684\u5386\u53f2\uff0c\u4f60\u90fd\u80fd\u5728\u8fd9\u91cc\u627e\u5230\u6b63\u786e\u7684\u65b9\u6cd5\u3002',
    linkTool: '\u4f7f\u7528\u6211\u4eec\u7684 Git \u547d\u4ee4\u751f\u6210\u5668\u4ea4\u4e92\u5f0f\u751f\u6210\u547d\u4ee4 \u2192',

    h2CherryPickBasics: 'Cherry-Pick \u57fa\u7840\uff1a\u5e94\u7528\u5355\u4e2a\u63d0\u4ea4',
    pCherryPickBasics: 'git cherry-pick \u83b7\u53d6\u4e00\u4e2a\u6216\u591a\u4e2a\u73b0\u6709\u63d0\u4ea4\uff0c\u5e76\u5c06\u5b83\u4eec\u4f5c\u4e3a\u65b0\u63d0\u4ea4\u5e94\u7528\u5230\u5f53\u524d\u5206\u652f\u3002\u4e0e merge \u6216 rebase \u4e0d\u540c\uff0ccherry-pick \u5141\u8bb8\u4f60\u9009\u62e9\u7279\u5b9a\u7684\u63d0\u4ea4\uff0c\u800c\u4e0d\u662f\u96c6\u6210\u6574\u4e2a\u5206\u652f\u3002\u539f\u59cb\u63d0\u4ea4\u4fdd\u6301\u4e0d\u53d8\u2014\u2014cherry-pick \u521b\u5efa\u4e00\u4e2a\u5168\u65b0\u7684\u63d0\u4ea4\uff0c\u54c8\u5e0c\u503c\u4e0d\u540c\u4f46\u53d8\u66f4\u76f8\u540c\u3002',
    pCherryPickWhen: '\u4f55\u65f6\u4f7f\u7528 cherry-pick\uff1a',
    cherryPickWhen1: '\u5c06\u5f00\u53d1\u5206\u652f\u7684 bug \u4fee\u590d\u56de\u79fb\u5230\u53d1\u5e03\u5206\u652f',
    cherryPickWhen2: '\u62c9\u53d6\u5355\u4e2a\u529f\u80fd\u63d0\u4ea4\u800c\u4e0d\u5408\u5e76\u65e0\u5173\u53d8\u66f4',
    cherryPickWhen3: '\u4ece\u5df2\u5220\u9664\u6216\u5e9f\u5f03\u7684\u5206\u652f\u4e2d\u6062\u590d\u63d0\u4ea4',
    cherryPickWhen4: '\u5c06\u4fee\u590d\u5e94\u7528\u5230\u591a\u4e2a\u7ef4\u62a4\u5206\u652f',

    h2CherryPickOptions: 'Cherry-Pick \u9009\u9879\u548c\u6807\u5fd7',
    pCherryPickOptions: 'git cherry-pick \u652f\u6301\u591a\u4e2a\u6709\u7528\u7684\u6807\u5fd7\uff0c\u63a7\u5236\u63d0\u4ea4\u7684\u5e94\u7528\u65b9\u5f0f\u3002\u8fd9\u4e9b\u9009\u9879\u8ba9\u4f60\u7cbe\u7ec6\u63a7\u5236 cherry-pick \u8fc7\u7a0b\u3002',
    optNoCommit: '--no-commit (-n)\uff1a\u5c06\u53d8\u66f4\u5e94\u7528\u5230\u5de5\u4f5c\u76ee\u5f55\u548c\u66f2\u5b58\u533a\uff0c\u4f46\u4e0d\u521b\u5efa\u63d0\u4ea4\u3002\u8fd9\u8ba9\u4f60\u53ef\u4ee5\u5c06\u591a\u4e2a cherry-pick \u5408\u5e76\u4e3a\u4e00\u4e2a\u63d0\u4ea4\uff0c\u6216\u5728\u63d0\u4ea4\u524d\u4fee\u6539\u53d8\u66f4\u3002',
    optAppendSource: '-x\uff1a\u5728\u63d0\u4ea4\u6d88\u606f\u4e2d\u8ffd\u52a0 "(cherry picked from commit ...)" \u884c\u3002\u8fd9\u5bf9\u4e8e\u8ddf\u8e2a cherry-pick \u7684\u6765\u6e90\u975e\u5e38\u6709\u7528\uff0c\u5c24\u5176\u662f\u8de8\u53d1\u5e03\u5206\u652f\u65f6\u3002',
    optEdit: '--edit (-e)\uff1a\u5728\u521b\u5efa\u63d0\u4ea4\u524d\u6253\u5f00\u63d0\u4ea4\u6d88\u606f\u7f16\u8f91\u5668\u3002\u5f53\u4f60\u9700\u8981\u8c03\u6574\u63d0\u4ea4\u6d88\u606f\u4ee5\u9002\u5e94\u76ee\u6807\u5206\u652f\u7684\u4e0a\u4e0b\u6587\u65f6\u4f7f\u7528\u3002',
    optRange: 'A..B \u8303\u56f4\uff1aCherry-pick \u4ece A\uff08\u4e0d\u5305\u542b\uff09\u5230 B\uff08\u5305\u542b\uff09\u7684\u4e00\u7cfb\u5217\u63d0\u4ea4\u3002\u6ce8\u610f A \u4e0d\u4f1a\u88ab\u5305\u542b\u2014\u2014\u5b83\u5b9a\u4e49\u8d77\u59cb\u70b9\u3002',
    optSignoff: '--signoff (-s)\uff1a\u5728\u63d0\u4ea4\u6d88\u606f\u4e2d\u6dfb\u52a0 "Signed-off-by" \u5c3e\u90e8\uff0c\u8fd9\u5728\u5f00\u6e90\u9879\u76ee\u4e2d\u901a\u5e38\u662f\u5fc5\u9700\u7684\u3002',

    h2CherryPickConflicts: '\u89e3\u51b3 Cherry-Pick \u51b2\u7a81',
    pCherryPickConflicts: 'Cherry-pick \u51b2\u7a81\u53d1\u751f\u5728 cherry-pick \u7684\u63d0\u4ea4\u4e2d\u7684\u53d8\u66f4\u4e0e\u76ee\u6807\u5206\u652f\u4e0a\u5df2\u6709\u7684\u53d8\u66f4\u91cd\u53e0\u65f6\u3002\u7531\u4e8e\u63d0\u4ea4\u88ab\u5e94\u7528\u5728\u5176\u539f\u59cb\u4e0a\u4e0b\u6587\u4e4b\u5916\uff0c\u51b2\u7a81\u6bd4\u666e\u901a\u5408\u5e76\u66f4\u5e38\u89c1\u3002',
    pConflictSteps: '\u5f53\u51b2\u7a81\u53d1\u751f\u65f6\uff0cGit \u4f1a\u6682\u505c cherry-pick \u5e76\u6807\u8bb0\u51b2\u7a81\u6587\u4ef6\u3002\u4f60\u6709\u4e09\u4e2a\u9009\u62e9\uff1a',
    conflictStep1: '\u89e3\u51b3\u5e76\u7ee7\u7eed\uff1a\u4fee\u590d\u53d7\u5f71\u54cd\u6587\u4ef6\u4e2d\u7684\u51b2\u7a81\u6807\u8bb0\uff0c\u7528 git add \u66f2\u5b58\u5df2\u89e3\u51b3\u7684\u6587\u4ef6\uff0c\u7136\u540e\u8fd0\u884c git cherry-pick --continue\u3002',
    conflictStep2: '\u4e2d\u6b62\uff1a\u8fd0\u884c git cherry-pick --abort \u5b8c\u5168\u53d6\u6d88 cherry-pick\uff0c\u56de\u5230\u5f00\u59cb\u524d\u7684\u72b6\u6001\u3002',
    conflictStep3: '\u8df3\u8fc7\uff1a\u8fd0\u884c git cherry-pick --skip \u8df3\u8fc7\u5f53\u524d\u63d0\u4ea4\u5e76\u7ee7\u7eed\u4e0b\u4e00\u4e2a\uff08\u5f53 cherry-pick \u4e00\u4e2a\u8303\u56f4\u65f6\uff09\u3002',

    h2Revert: 'Git Revert\uff1a\u5b89\u5168\u5730\u64a4\u9500\u63d0\u4ea4',
    pRevert: 'git revert \u521b\u5efa\u4e00\u4e2a\u65b0\u63d0\u4ea4\u6765\u64a4\u9500\u4e4b\u524d\u63d0\u4ea4\u5f15\u5165\u7684\u53d8\u66f4\u3002\u4e0e reset \u4e0d\u540c\uff0crevert \u4e0d\u4f1a\u91cd\u5199\u5386\u53f2\u2014\u2014\u5b83\u662f\u6dfb\u52a0\u5386\u53f2\u3002\u8fd9\u4f7f\u5f97 revert \u5bf9\u4e8e\u5171\u4eab\u5206\u652f\u662f\u5b89\u5168\u7684\uff0c\u56e0\u4e3a\u5176\u4ed6\u534f\u4f5c\u8005\u7684\u5386\u53f2\u4e0d\u4f1a\u88ab\u7834\u574f\u3002',
    pRevertMerge: '\u64a4\u9500\u5408\u5e76\u63d0\u4ea4\u662f\u4e00\u4e2a\u7279\u6b8a\u60c5\u51b5\u3002\u5408\u5e76\u63d0\u4ea4\u6709\u4e24\u4e2a\u7236\u63d0\u4ea4\uff0c\u6240\u4ee5\u4f60\u5fc5\u987b\u4f7f\u7528 -m \u6807\u5fd7\u544a\u8bc9 Git \u8981\u56de\u9000\u5230\u54ea\u4e2a\u7236\u63d0\u4ea4\u3002\u5728\u5927\u591a\u6570\u60c5\u51b5\u4e0b\uff0c-m 1 \u6307\u5b9a\u4e3b\u7ebf\uff08\u4f60\u5408\u5e76\u5230\u7684\u5206\u652f\uff09\uff0c\u8fd9\u901a\u5e38\u662f\u4f60\u60f3\u8981\u7684\u3002',
    pRevertWarning: '\u91cd\u8981\u63d0\u793a\uff1a\u64a4\u9500\u5408\u5e76\u540e\uff0c\u5982\u679c\u4f60\u4ee5\u540e\u60f3\u91cd\u65b0\u5408\u5e76\u540c\u4e00\u5206\u652f\uff0cGit \u4f1a\u8ba4\u4e3a\u8fd9\u4e9b\u53d8\u66f4\u5df2\u7ecf\u5b58\u5728\u3002\u4f60\u9700\u8981\u5148\u201c\u64a4\u9500\u64a4\u9500\u201d\u3002',

    h2Reset: 'Git Reset\uff1a\u79fb\u52a8\u5206\u652f\u6307\u9488',
    pReset: 'git reset \u5c06\u5f53\u524d\u5206\u652f\u6307\u9488\u79fb\u52a8\u5230\u6307\u5b9a\u7684\u63d0\u4ea4\u3002\u6839\u636e\u4f7f\u7528\u7684\u6a21\u5f0f\uff0c\u5b83\u8fd8\u53ef\u80fd\u4fee\u6539\u66f2\u5b58\u533a\uff08\u7d22\u5f15\uff09\u548c\u5de5\u4f5c\u76ee\u5f55\u3002\u7406\u89e3\u4e09\u79cd\u6a21\u5f0f\u5bf9\u4e8e\u5b89\u5168\u4f7f\u7528 reset \u81f3\u5173\u91cd\u8981\u3002',
    resetSoftTitle: '--soft\uff1a\u4ec5\u79fb\u52a8 HEAD',
    resetSoftDesc: '\u5c06 HEAD \u79fb\u52a8\u5230\u76ee\u6807\u63d0\u4ea4\u3002\u66f2\u5b58\u533a\u548c\u5de5\u4f5c\u76ee\u5f55\u4e0d\u53d8\u3002\u6240\u6709\u201c\u79fb\u9664\u201d\u63d0\u4ea4\u7684\u53d8\u66f4\u4f1a\u663e\u793a\u4e3a\u5df2\u66f2\u5b58\uff08\u51c6\u5907\u63d0\u4ea4\uff09\u3002\u975e\u5e38\u9002\u5408\u538b\u7f29\u63d0\u4ea4\u6216\u91cd\u65b0\u7f16\u5199\u63d0\u4ea4\u6d88\u606f\u3002',
    resetMixedTitle: '--mixed\uff08\u9ed8\u8ba4\uff09\uff1a\u79fb\u52a8 HEAD + \u53d6\u6d88\u66f2\u5b58',
    resetMixedDesc: '\u5c06 HEAD \u79fb\u52a8\u5230\u76ee\u6807\u63d0\u4ea4\u5e76\u91cd\u7f6e\u66f2\u5b58\u533a\u3002\u53d8\u66f4\u4fdd\u7559\u5728\u5de5\u4f5c\u76ee\u5f55\u4e2d\u4f5c\u4e3a\u672a\u66f2\u5b58\u7684\u4fee\u6539\u3002\u8fd9\u662f\u4e0d\u5e26\u6807\u5fd7\u8fd0\u884c git reset \u65f6\u7684\u9ed8\u8ba4\u6a21\u5f0f\u3002',
    resetHardTitle: '--hard\uff1a\u79fb\u52a8 HEAD + \u53d6\u6d88\u66f2\u5b58 + \u4e22\u5f03\u53d8\u66f4',
    resetHardDesc: '\u5c06 HEAD \u79fb\u52a8\u5230\u76ee\u6807\u63d0\u4ea4\uff0c\u91cd\u7f6e\u66f2\u5b58\u533a\uff0c\u5e76\u4e22\u5f03\u5de5\u4f5c\u76ee\u5f55\u4e2d\u7684\u6240\u6709\u53d8\u66f4\u3002\u8fd9\u662f\u7834\u574f\u6027\u7684\u2014\u2014\u672a\u63d0\u4ea4\u7684\u5de5\u4f5c\u5c06\u6c38\u4e45\u4e22\u5931\uff08\u9664\u975e\u5df2\u63d0\u4ea4\u7684\u53d8\u66f4\u53ef\u901a\u8fc7 reflog \u6062\u590d\uff09\u3002',
    resetTableHeader: '\u5bf9\u6bd4\u8868\uff1agit reset \u6a21\u5f0f',
    resetTableMode: '\u6a21\u5f0f',
    resetTableHead: 'HEAD',
    resetTableIndex: '\u66f2\u5b58\u533a\uff08\u7d22\u5f15\uff09',
    resetTableWorking: '\u5de5\u4f5c\u76ee\u5f55',
    resetTableSafe: '\u5b89\u5168\uff1f',
    resetTableSoftRow: '\u79fb\u52a8|\u4e0d\u53d8|\u4e0d\u53d8|\u662f',
    resetTableMixedRow: '\u79fb\u52a8|\u91cd\u7f6e|\u4e0d\u53d8|\u662f',
    resetTableHardRow: '\u79fb\u52a8|\u91cd\u7f6e|\u91cd\u7f6e\uff08\u5220\u9664\uff09|\u5426',

    h2ResetVsRevertVsCheckout: 'Reset vs Revert vs Checkout\uff1a\u4f55\u65f6\u4f7f\u7528\u54ea\u4e2a',
    pResetVsRevertVsCheckout: '\u8fd9\u4e09\u4e2a\u547d\u4ee4\u90fd\u53ef\u4ee5\u201c\u64a4\u9500\u201d\u53d8\u66f4\uff0c\u4f46\u5b83\u4eec\u5728\u6839\u672c\u4e0a\u5728\u4e0d\u540c\u5c42\u9762\u5de5\u4f5c\u3002\u9009\u62e9\u6b63\u786e\u7684\u547d\u4ee4\u53d6\u51b3\u4e8e\u63d0\u4ea4\u662f\u5426\u5df2\u63a8\u9001\u4ee5\u53ca\u4f60\u662f\u5426\u60f3\u4fdd\u7559\u5386\u53f2\u3002',
    compareReset: 'git reset\uff1a\u901a\u8fc7\u5411\u540e\u79fb\u52a8\u5206\u652f\u6307\u9488\u91cd\u5199\u5386\u53f2\u3002\u4ec5\u7528\u4e8e\u672c\u5730/\u672a\u63a8\u9001\u7684\u63d0\u4ea4\u3002\u4e0d\u80fd\u5b89\u5168\u5730\u7528\u4e8e\u5171\u4eab\u5206\u652f\u3002',
    compareRevert: 'git revert\uff1a\u521b\u5efa\u4e00\u4e2a\u65b0\u63d0\u4ea4\u6765\u53cd\u8f6c\u53d8\u66f4\u3002\u5bf9\u5171\u4eab\u5206\u652f\u5b89\u5168\u3002\u4e0d\u91cd\u5199\u5386\u53f2\u3002\u5f53\u63d0\u4ea4\u5df2\u88ab\u63a8\u9001\u65f6\u4f7f\u7528\u3002',
    compareCheckout: 'git checkout\uff08\u6216 git restore\uff09\uff1a\u4fee\u6539\u5de5\u4f5c\u76ee\u5f55\u800c\u4e0d\u5f71\u54cd\u63d0\u4ea4\u6216\u5206\u652f\u3002\u7528\u4e8e\u4e22\u5f03\u7279\u5b9a\u6587\u4ef6\u7684\u672a\u63d0\u4ea4\u53d8\u66f4\u3002',
    pSafetyRule: '\u9ec4\u91d1\u6cd5\u5219\uff1a\u5982\u679c\u63d0\u4ea4\u5df2\u88ab\u63a8\u9001\u5230\u5171\u4eab\u8fdc\u7a0b\u4ed3\u5e93\uff0c\u4f7f\u7528 revert\u3002\u5982\u679c\u4ec5\u5728\u672c\u5730\uff0creset \u66f4\u5e72\u51c0\u3002',

    h2UndoCherryPick: '\u64a4\u9500 Cherry-Pick',
    pUndoCherryPick: '\u5982\u679c\u4f60 cherry-pick \u4e86\u4e00\u4e2a\u63d0\u4ea4\u5e76\u60f3\u8981\u64a4\u9500\u5b83\uff0c\u6839\u636e\u662f\u5426\u5df2\u63a8\u9001\u6709\u4e24\u79cd\u65b9\u6cd5\uff1a',
    undoNotPushed: '\u672a\u63a8\u9001\uff1a\u4f7f\u7528 git reset \u5c06 HEAD \u79fb\u56de cherry-pick \u63d0\u4ea4\u4e4b\u524d\u3002\u8fd9\u4f1a\u5e72\u51c0\u5730\u4ece\u5386\u53f2\u4e2d\u79fb\u9664\u5b83\u3002',
    undoPushed: '\u5df2\u63a8\u9001\uff1a\u5bf9 cherry-pick \u7684\u63d0\u4ea4\u4f7f\u7528 git revert\u3002\u8fd9\u4f1a\u521b\u5efa\u4e00\u4e2a\u65b0\u63d0\u4ea4\u6765\u53cd\u8f6c cherry-pick\uff0c\u800c\u4e0d\u91cd\u5199\u5171\u4eab\u5386\u53f2\u3002',

    h2CrossRepo: '\u8de8\u4ed3\u5e93 Cherry-Pick',
    pCrossRepo: '\u6709\u65f6\u4f60\u9700\u8981\u4ece\u4e0d\u540c\u7684\u4ed3\u5e93 cherry-pick \u4e00\u4e2a\u63d0\u4ea4\uff08\u4f8b\u5982\u4ece\u4e0a\u6e38\u9879\u76ee\u6216\u540c\u4e8b\u7684 fork\uff09\u3002Git \u901a\u8fc7\u6dfb\u52a0\u5176\u4ed6\u4ed3\u5e93\u4e3a\u8fdc\u7a0b\u3001\u83b7\u53d6\u5176\u63d0\u4ea4\u3001\u7136\u540e cherry-pick \u6765\u652f\u6301\u8fd9\u4e00\u64cd\u4f5c\u3002',
    pCrossRepoSteps: '\u5de5\u4f5c\u6d41\u7a0b\u5305\u542b\u4e09\u4e2a\u6b65\u9aa4\uff1a\u6dfb\u52a0\u8fdc\u7a0b\u3001\u83b7\u53d6\u5176\u5206\u652f\u3001\u7136\u540e\u6309\u54c8\u5e0c\u503c cherry-pick \u7279\u5b9a\u63d0\u4ea4\u3002',

    h2RebaseAlternative: '\u4ea4\u4e92\u5f0f Rebase \u4f5c\u4e3a Cherry-Pick \u7684\u66ff\u4ee3\u65b9\u6848',
    pRebaseAlternative: '\u5728\u5f88\u591a\u60c5\u51b5\u4e0b\uff0c\u4ea4\u4e92\u5f0f rebase\uff08git rebase -i\uff09\u53ef\u4ee5\u5b8c\u6210 cherry-pick \u505a\u7684\u4e8b\u60c5\uff0c\u4f46\u66f4\u7075\u6d3b\u3002\u5f53\u4f60\u60f3\u5728\u540c\u4e00\u5206\u652f\u5185\u91cd\u65b0\u6392\u5e8f\u3001\u538b\u7f29\u3001\u7f16\u8f91\u6216\u5220\u9664\u63d0\u4ea4\u65f6\uff0cRebase \u66f4\u597d\u3002\u5f53\u4f60\u60f3\u5728\u4e0d\u540c\u5206\u652f\u4e4b\u95f4\u590d\u5236\u63d0\u4ea4\u65f6\uff0ccherry-pick \u66f4\u597d\u3002',
    rebaseWhen: '\u4f55\u65f6\u7528 rebase \u4ee3\u66ff cherry-pick\uff1a',
    rebaseWhen1: '\u4f60\u60f3\u5728\u5408\u5e76\u529f\u80fd\u5206\u652f\u524d\u6e05\u7406\u63d0\u4ea4',
    rebaseWhen2: '\u4f60\u9700\u8981\u5728\u540c\u4e00\u5206\u652f\u5185\u91cd\u65b0\u6392\u5e8f\u63d0\u4ea4',
    rebaseWhen3: '\u4f60\u60f3\u5c06\u591a\u4e2a\u63d0\u4ea4\u538b\u7f29\u4e3a\u4e00\u4e2a',
    rebaseWhen4: '\u4f60\u8981\u79fb\u52a8\u6574\u4e2a\u63d0\u4ea4\u5e8f\u5217\uff08\u4e0d\u4ec5\u4ec5\u662f\u4e00\u4e24\u4e2a\uff09',
    cherryPickWhenBetter: '\u4f55\u65f6\u7528 cherry-pick \u4ee3\u66ff rebase\uff1a',
    cherryPickWhenBetter1: '\u4f60\u9700\u8981\u5c06\u7279\u5b9a\u63d0\u4ea4\u590d\u5236\u5230\u5b8c\u5168\u4e0d\u540c\u7684\u5206\u652f',
    cherryPickWhenBetter2: '\u4f60\u60f3\u5c06\u4fee\u590d\u56de\u79fb\u5230\u53d1\u5e03/\u7ef4\u62a4\u5206\u652f',
    cherryPickWhenBetter3: '\u4f60\u53ea\u9700\u8981\u4e00\u4e24\u4e2a\u63d0\u4ea4\uff0c\u4e0d\u662f\u6574\u4e2a\u5e8f\u5217',

    h2RealWorld: '\u771f\u5b9e\u573a\u666f',
    pRealWorld: '\u8ba9\u6211\u4eec\u6765\u770b\u770b\u6700\u5e38\u89c1\u7684\u771f\u5b9e\u573a\u666f\uff0c\u5176\u4e2d cherry-pick\u3001revert \u548c reset \u662f\u6b63\u786e\u7684\u5de5\u5177\u3002',
    scenarioHotfix: '\u573a\u666f 1\uff1a\u70ed\u4fee\u590d\u56de\u79fb',
    scenarioHotfixDesc: '\u751f\u4ea7\u73af\u5883\u53d1\u73b0\u4e86\u4e00\u4e2a\u4e25\u91cd bug\u3002\u4fee\u590d\u5df2\u7ecf\u5728 develop \u5206\u652f\u4e0a\u63d0\u4ea4\u3002\u4f60\u9700\u8981\u5c06\u8fd9\u4e2a\u4fee\u590d\u5e94\u7528\u5230\u53d1\u5e03\u5206\u652f\uff0c\u800c\u4e0d\u62c9\u53d6\u672a\u5b8c\u6210\u7684\u529f\u80fd\u3002',
    scenarioExtract: '\u573a\u666f 2\uff1a\u529f\u80fd\u63d0\u53d6',
    scenarioExtractDesc: '\u4e00\u4e2a\u5f00\u53d1\u8005\u5728\u4e00\u4e2a\u8f83\u5927\u7684\u529f\u80fd\u5206\u652f\u4e2d\u63d0\u4ea4\u4e86\u4e00\u4e2a\u6709\u7528\u7684\u5de5\u5177\u51fd\u6570\u3002\u53e6\u4e00\u4e2a\u56e2\u961f\u7acb\u5373\u9700\u8981\u8fd9\u4e2a\u5de5\u5177\uff0c\u4f46\u65e0\u6cd5\u7b49\u5f85\u5b8c\u6574\u529f\u80fd\u5408\u5e76\u3002',
    scenarioRelease: '\u573a\u666f 3\uff1a\u53d1\u5e03\u5206\u652f\u8865\u4e01',
    scenarioReleaseDesc: '\u4f60\u7ef4\u62a4\u591a\u4e2a\u53d1\u5e03\u5206\u652f\uff08v1.x\u3001v2.x\uff09\u3002\u5728 main \u4e0a\u63d0\u4ea4\u7684\u5b89\u5168\u4fee\u590d\u9700\u8981\u5e94\u7528\u5230\u6240\u6709\u6d3b\u8dc3\u7684\u53d1\u5e03\u5206\u652f\u3002',

    h2DangerousOps: '\u5371\u9669\u64cd\u4f5c\u548c\u5b89\u5168\u7f51',
    pDangerousOps: '\u4e00\u4e9b Git \u64cd\u4f5c\u5982\u679c\u4e0d\u5c0f\u5fc3\u4f7f\u7528\u4f1a\u5bfc\u81f4\u6c38\u4e45\u6570\u636e\u4e22\u5931\u3002\u7406\u89e3\u98ce\u9669\u5e76\u77e5\u9053\u6062\u590d\u673a\u5236\u81f3\u5173\u91cd\u8981\u3002',
    dangerResetHard: 'git reset --hard\uff1a\u6c38\u4e45\u4e22\u5f03\u672a\u63d0\u4ea4\u7684\u53d8\u66f4\u3002\u6b64\u64cd\u4f5c\u540e\u65e0\u6cd5\u6062\u590d\u672a\u66f2\u5b58\u6216\u672a\u8ddf\u8e2a\u7684\u6587\u4ef6\u3002\u59cb\u7ec8\u5728\u4f7f\u7528 --hard \u524d\u68c0\u67e5 git status \u548c git stash\u3002',
    dangerForcePush: 'git push --force\uff1a\u8986\u76d6\u8fdc\u7a0b\u5206\u652f\u5386\u53f2\u3002\u5982\u679c\u5176\u4ed6\u5f00\u53d1\u8005\u5df2\u57fa\u4e8e\u65e7\u5386\u53f2\u63d0\u4ea4\uff0c\u8fd9\u53ef\u80fd\u7834\u574f\u4ed6\u4eec\u7684\u5de5\u4f5c\u3002\u4f18\u5148\u4f7f\u7528 --force-with-lease\uff0c\u5b83\u4f1a\u5728\u8fdc\u7a0b\u5df2\u66f4\u65b0\u65f6\u62d2\u7edd\u63a8\u9001\u3002',
    dangerReflog: '\u5b89\u5168\u7f51\u2014\u2014git reflog\uff1aGit \u5728 reflog \u4e2d\u8bb0\u5f55\u6bcf\u6b21 HEAD \u79fb\u52a8\u3002\u5373\u4f7f\u5728\u7834\u574f\u6027 reset \u540e\uff0c\u4f60\u901a\u5e38\u53ef\u4ee5\u901a\u8fc7\u5728 reflog \u4e2d\u627e\u5230\u63d0\u4ea4\u54c8\u5e0c\u5e76\u7b7e\u51fa\u6216\u4ece\u4e2d\u521b\u5efa\u5206\u652f\u6765\u6062\u590d\u63d0\u4ea4\u3002reflog \u9ed8\u8ba4\u4fdd\u7559 90 \u5929\u3002',

    h2Faq: '\u5e38\u89c1\u95ee\u9898',
    faq1q: 'git cherry-pick \u548c git merge \u6709\u4ec0\u4e48\u533a\u522b\uff1f',
    faq1a: 'git merge \u5c06\u4e00\u4e2a\u5206\u652f\u7684\u6240\u6709\u63d0\u4ea4\u96c6\u6210\u5230\u53e6\u4e00\u4e2a\u5206\u652f\uff0c\u521b\u5efa\u4e00\u4e2a\u8fde\u63a5\u4e24\u4e2a\u5386\u53f2\u7684\u5408\u5e76\u63d0\u4ea4\u3002git cherry-pick \u53ea\u590d\u5236\u7279\u5b9a\u7684\u5355\u4e2a\u63d0\u4ea4\uff0c\u5e76\u5c06\u5b83\u4eec\u4f5c\u4e3a\u65b0\u63d0\u4ea4\u5e94\u7528\u5230\u5f53\u524d\u5206\u652f\u3002\u60f3\u96c6\u6210\u6574\u4e2a\u5206\u652f\u65f6\u7528 merge\uff1b\u53ea\u9700\u8981\u7279\u5b9a\u63d0\u4ea4\u65f6\u7528 cherry-pick\u3002',
    faq2q: '\u53ef\u4ee5 cherry-pick \u4e00\u4e2a\u5408\u5e76\u63d0\u4ea4\u5417\uff1f',
    faq2a: '\u53ef\u4ee5\uff0c\u4f46\u4f60\u5fc5\u987b\u4f7f\u7528 -m \u6807\u5fd7\u6307\u5b9a\u4f7f\u7528\u54ea\u4e2a\u7236\u63d0\u4ea4\u3002\u4f8b\u5982\uff0c"git cherry-pick -m 1 <\u5408\u5e76\u63d0\u4ea4\u54c8\u5e0c>" \u544a\u8bc9 Git \u4f7f\u7528\u7b2c\u4e00\u4e2a\u7236\u63d0\u4ea4\uff08\u88ab\u5408\u5e76\u5230\u7684\u5206\u652f\uff09\u4f5c\u4e3a\u57fa\u7840\u3002\u4f46\u662f\uff0ccherry-pick \u5408\u5e76\u63d0\u4ea4\u901a\u5e38\u4e0d\u88ab\u63a8\u8350\uff0c\u56e0\u4e3a\u5b83\u53ef\u80fd\u5bfc\u81f4\u6df7\u4e71\u7684\u91cd\u590d\u53d8\u66f4\u3002\u8003\u8651\u6539\u4e3a cherry-pick \u88ab\u5408\u5e76\u5206\u652f\u4e2d\u7684\u5404\u4e2a\u63d0\u4ea4\u3002',
    faq3q: '\u5982\u4f55\u64a4\u9500 git reset --hard\uff1f',
    faq3a: '\u5982\u679c\u4f60\u7528 reset --hard \u4e22\u5931\u4e86\u63d0\u4ea4\uff0c\u4f7f\u7528 "git reflog" \u627e\u5230 reset \u4e4b\u524d\u7684\u63d0\u4ea4\u54c8\u5e0c\uff0c\u7136\u540e\u8fd0\u884c "git reset --hard <\u54c8\u5e0c>" \u6216 "git branch recovery <\u54c8\u5e0c>" \u6765\u6062\u590d\u3002\u4f46\u662f\uff0c\u672a\u63d0\u4ea4\u7684\u53d8\u66f4\uff08\u4ece\u672a\u66f2\u5b58\u6216\u63d0\u4ea4\u7684\u6587\u4ef6\uff09\u5728\u786c\u91cd\u7f6e\u540e\u65e0\u6cd5\u88ab Git \u6062\u590d\u3002',
    faq4q: '\u5e94\u8be5\u4f7f\u7528 git reset \u8fd8\u662f git revert \u6765\u64a4\u9500\u63d0\u4ea4\uff1f',
    faq4a: '\u5bf9\u672c\u5730/\u672a\u63a8\u9001\u7684\u63d0\u4ea4\u4f7f\u7528 git reset\u2014\u2014\u5b83\u901a\u8fc7\u5b8c\u5168\u79fb\u9664\u63d0\u4ea4\u63d0\u4f9b\u66f4\u5e72\u51c0\u7684\u5386\u53f2\u3002\u5bf9\u5df2\u63a8\u9001\u5230\u5171\u4eab\u8fdc\u7a0b\u7684\u63d0\u4ea4\u4f7f\u7528 git revert\u2014\u2014\u5b83\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u201c\u64a4\u9500\u201d\u63d0\u4ea4\u800c\u4e0d\u91cd\u5199\u5386\u53f2\u3002\u5982\u679c\u4e0d\u786e\u5b9a\u5176\u4ed6\u4eba\u662f\u5426\u5df2\u62c9\u53d6\u4f60\u7684\u63d0\u4ea4\uff0c\u59cb\u7ec8\u4f7f\u7528 revert \u4ee5\u786e\u4fdd\u5b89\u5168\u3002',
    faq5q: '\u4e3a\u4ec0\u4e48\u6211\u7684 cherry-pick \u521b\u5efa\u4e86\u4e0e\u539f\u59cb\u4e0d\u540c\u7684\u63d0\u4ea4\u54c8\u5e0c\uff1f',
    faq5a: '\u63d0\u4ea4\u54c8\u5e0c\u7531\u63d0\u4ea4\u5185\u5bb9\u3001\u7236\u63d0\u4ea4\u3001\u4f5c\u8005\u65e5\u671f\u548c\u63d0\u4ea4\u8005\u65e5\u671f\u51b3\u5b9a\u3002\u5f53\u4f60 cherry-pick \u65f6\uff0c\u65b0\u63d0\u4ea4\u6709\u4e0d\u540c\u7684\u7236\u63d0\u4ea4\u548c\u65b0\u7684\u63d0\u4ea4\u8005\u65e5\u671f\uff0c\u6240\u4ee5\u5373\u4f7f\u4ee3\u7801\u53d8\u66f4\u76f8\u540c\uff0c\u4e5f\u4f1a\u5f97\u5230\u4e0d\u540c\u7684\u54c8\u5e0c\u3002\u8fd9\u662f\u8bbe\u8ba1\u5982\u6b64\u7684\u2014\u2014Git \u5c06\u5b83\u4eec\u89c6\u4e3a\u4e0d\u540c\u7684\u63d0\u4ea4\u3002\u4f7f\u7528 -x \u6807\u5fd7\u5728\u6d88\u606f\u4e2d\u6dfb\u52a0\u5bf9\u539f\u59cb\u63d0\u4ea4\u7684\u5f15\u7528\u3002',

    pConclusion: '\u638c\u63e1 git cherry-pick\u3001revert \u548c reset \u8ba9\u4f60\u80fd\u7cbe\u786e\u63a7\u5236\u4ed3\u5e93\u5386\u53f2\u3002\u8bb0\u4f4f\uff1a\u672c\u5730\u6e05\u7406\u7528 reset\uff0c\u5171\u4eab\u5206\u652f\u7528 revert\uff0c\u590d\u5236\u7279\u5b9a\u63d0\u4ea4\u7528 cherry-pick\u3002\u5982\u6709\u7591\u95ee\uff0c\u68c0\u67e5 git reflog\u2014\u2014\u5b83\u662f\u4f60\u7684\u5b89\u5168\u7f51\u3002',
    linkToolBottom: '\u8bd5\u8bd5 Git \u547d\u4ee4\u751f\u6210\u5668 \u2192',
  },
};

export default function GitCherryPickRevertResetGuide({ lang }: { lang: string }) {
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
    ],
  };

  const softRow = t.resetTableSoftRow.split('|');
  const mixedRow = t.resetTableMixedRow.split('|');
  const hardRow = t.resetTableHardRow.split('|');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      <p>
        <Link href={`/${lang}/tools/git-command-generator`} style={{ fontWeight: 600 }}>
          {t.linkTool}
        </Link>
      </p>

      {/* ============================================================ */}
      {/* CHERRY-PICK BASICS */}
      {/* ============================================================ */}
      <h2>{t.h2CherryPickBasics}</h2>
      <p>{t.pCherryPickBasics}</p>

      <pre><code>{`# Apply a single commit to the current branch
git cherry-pick abc1234

# Apply multiple commits at once
git cherry-pick abc1234 def5678 ghi9012

# Cherry-pick the tip of another branch
git cherry-pick feature-branch`}</code></pre>

      <p><strong>{t.pCherryPickWhen}</strong></p>
      <ul>
        <li>{t.cherryPickWhen1}</li>
        <li>{t.cherryPickWhen2}</li>
        <li>{t.cherryPickWhen3}</li>
        <li>{t.cherryPickWhen4}</li>
      </ul>

      <pre><code>{`# Example: Backport a fix from develop to release
git checkout release/1.0
git cherry-pick abc1234      # the fix commit on develop
git push origin release/1.0`}</code></pre>

      {/* ============================================================ */}
      {/* CHERRY-PICK OPTIONS */}
      {/* ============================================================ */}
      <h2>{t.h2CherryPickOptions}</h2>
      <p>{t.pCherryPickOptions}</p>

      <h3>--no-commit (-n)</h3>
      <p>{t.optNoCommit}</p>
      <pre><code>{`# Apply changes without committing
git cherry-pick --no-commit abc1234

# Combine multiple cherry-picks into one commit
git cherry-pick --no-commit abc1234
git cherry-pick --no-commit def5678
git commit -m "Backport: fix login and auth bugs"

# Check what changed before committing
git cherry-pick -n abc1234
git diff --staged`}</code></pre>

      <h3>-x (append source reference)</h3>
      <p>{t.optAppendSource}</p>
      <pre><code>{`# Cherry-pick with source tracking
git cherry-pick -x abc1234

# Resulting commit message:
# Fix: prevent null pointer in auth module
#
# (cherry picked from commit abc1234567890abcdef)`}</code></pre>

      <h3>--edit (-e)</h3>
      <p>{t.optEdit}</p>
      <pre><code>{`# Cherry-pick and edit the commit message
git cherry-pick --edit abc1234`}</code></pre>

      <h3>A..B range</h3>
      <p>{t.optRange}</p>
      <pre><code>{`# Cherry-pick commits from abc1234 (exclusive) to ghi9012 (inclusive)
# This picks def5678 and ghi9012
git cherry-pick abc1234..ghi9012

# Equivalent to:
git cherry-pick def5678 ghi9012

# Cherry-pick a range with source tracking
git cherry-pick -x abc1234..ghi9012`}</code></pre>

      <h3>--signoff (-s)</h3>
      <p>{t.optSignoff}</p>
      <pre><code>{`# Cherry-pick with sign-off
git cherry-pick --signoff abc1234

# Resulting message includes:
# Signed-off-by: Your Name <you@example.com>`}</code></pre>

      {/* ============================================================ */}
      {/* CHERRY-PICK CONFLICTS */}
      {/* ============================================================ */}
      <h2>{t.h2CherryPickConflicts}</h2>
      <p>{t.pCherryPickConflicts}</p>
      <p>{t.pConflictSteps}</p>

      <h3>1. {t.conflictStep1.split(':')[0]}</h3>
      <p>{t.conflictStep1}</p>
      <pre><code>{`# Cherry-pick triggers a conflict
git cherry-pick abc1234
# CONFLICT (content): Merge conflict in src/auth.js

# 1. Open the file and resolve conflict markers
#    <<<<<<< HEAD
#    const timeout = 5000;
#    =======
#    const timeout = 3000;
#    >>>>>>> abc1234

# 2. Stage the resolved file
git add src/auth.js

# 3. Continue the cherry-pick
git cherry-pick --continue`}</code></pre>

      <h3>2. {t.conflictStep2.split(':')[0]}</h3>
      <p>{t.conflictStep2}</p>
      <pre><code>{`# Abort the cherry-pick and return to the previous state
git cherry-pick --abort`}</code></pre>

      <h3>3. {t.conflictStep3.split(':')[0]}</h3>
      <p>{t.conflictStep3}</p>
      <pre><code>{`# Skip the current conflicting commit in a range
git cherry-pick --skip`}</code></pre>

      {/* ============================================================ */}
      {/* GIT REVERT */}
      {/* ============================================================ */}
      <h2>{t.h2Revert}</h2>
      <p>{t.pRevert}</p>

      <pre><code>{`# Revert the last commit
git revert HEAD

# Revert a specific commit
git revert abc1234

# Revert without auto-committing (stage changes only)
git revert --no-commit abc1234

# Revert multiple commits (creates one revert per commit)
git revert HEAD~3..HEAD

# Revert with a custom message
git revert abc1234 -m 1 --edit`}</code></pre>

      <h3>{lang === 'zh' ? '\u64a4\u9500\u5408\u5e76\u63d0\u4ea4' : 'Reverting Merge Commits'}</h3>
      <p>{t.pRevertMerge}</p>
      <pre><code>{`# Revert a merge commit (keep the mainline, undo the merged branch)
git revert -m 1 <merge-commit-hash>

# -m 1 = keep parent 1 (the branch you merged INTO, e.g., main)
# -m 2 = keep parent 2 (the branch that was merged, e.g., feature)

# Example workflow:
git log --oneline --graph
# *   e5f6g7h (HEAD -> main) Merge branch 'feature-x'
# |\\
# | * c3d4e5f Add feature X
# | * a1b2c3d Start feature X
# |/
# * 9z8y7x6 Previous main commit

# Undo the merge but keep main's history:
git revert -m 1 e5f6g7h`}</code></pre>

      <p><strong>{t.pRevertWarning}</strong></p>
      <pre><code>{`# If you need to re-merge feature-x later:
# First, revert the revert
git revert <revert-commit-hash>
# Then merge again
git merge feature-x`}</code></pre>

      {/* ============================================================ */}
      {/* GIT RESET */}
      {/* ============================================================ */}
      <h2>{t.h2Reset}</h2>
      <p>{t.pReset}</p>

      <h3>{t.resetSoftTitle}</h3>
      <p>{t.resetSoftDesc}</p>
      <pre><code>{`# Undo the last commit, keep everything staged
git reset --soft HEAD~1

# Undo the last 3 commits, keep all changes staged
git reset --soft HEAD~3

# Use case: squash last 3 commits into one
git reset --soft HEAD~3
git commit -m "Combined: feature implementation"`}</code></pre>

      <h3>{t.resetMixedTitle}</h3>
      <p>{t.resetMixedDesc}</p>
      <pre><code>{`# Undo last commit, unstage changes (default mode)
git reset HEAD~1
# same as:
git reset --mixed HEAD~1

# Unstage a specific file without changing it
git reset HEAD src/app.js
# modern alternative:
git restore --staged src/app.js`}</code></pre>

      <h3>{t.resetHardTitle}</h3>
      <p>{t.resetHardDesc}</p>
      <pre><code>{`# ⚠️ DESTRUCTIVE: Undo last commit AND discard all changes
git reset --hard HEAD~1

# ⚠️ DESTRUCTIVE: Reset to match remote branch exactly
git reset --hard origin/main

# ⚠️ DESTRUCTIVE: Discard all uncommitted changes
git reset --hard HEAD`}</code></pre>

      <h3>{t.resetTableHeader}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12, marginBottom: 24 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.resetTableMode}</th>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.resetTableHead}</th>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.resetTableIndex}</th>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.resetTableWorking}</th>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.resetTableSafe}</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '8px 12px' }}><code>--soft</code></td>
            <td style={{ padding: '8px 12px' }}>{softRow[0]}</td>
            <td style={{ padding: '8px 12px' }}>{softRow[1]}</td>
            <td style={{ padding: '8px 12px' }}>{softRow[2]}</td>
            <td style={{ padding: '8px 12px' }}>{softRow[3]}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '8px 12px' }}><code>--mixed</code></td>
            <td style={{ padding: '8px 12px' }}>{mixedRow[0]}</td>
            <td style={{ padding: '8px 12px' }}>{mixedRow[1]}</td>
            <td style={{ padding: '8px 12px' }}>{mixedRow[2]}</td>
            <td style={{ padding: '8px 12px' }}>{mixedRow[3]}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '8px 12px' }}><code>--hard</code></td>
            <td style={{ padding: '8px 12px' }}>{hardRow[0]}</td>
            <td style={{ padding: '8px 12px' }}>{hardRow[1]}</td>
            <td style={{ padding: '8px 12px' }}>{hardRow[2]}</td>
            <td style={{ padding: '8px 12px', color: '#ef4444', fontWeight: 700 }}>{hardRow[3]}</td>
          </tr>
        </tbody>
      </table>

      <pre><code>{`# Visual diagram of git reset modes:
#
# Commit History:  A --- B --- C --- D (HEAD)
#
# git reset --soft B:
#   HEAD -> B,  staging = C+D changes,  working dir = C+D changes
#
# git reset --mixed B:
#   HEAD -> B,  staging = clean,  working dir = C+D changes
#
# git reset --hard B:
#   HEAD -> B,  staging = clean,  working dir = clean (C+D GONE)`}</code></pre>

      {/* ============================================================ */}
      {/* RESET VS REVERT VS CHECKOUT */}
      {/* ============================================================ */}
      <h2>{t.h2ResetVsRevertVsCheckout}</h2>
      <p>{t.pResetVsRevertVsCheckout}</p>

      <ul>
        <li><strong>git reset:</strong> {t.compareReset}</li>
        <li><strong>git revert:</strong> {t.compareRevert}</li>
        <li><strong>git checkout / restore:</strong> {t.compareCheckout}</li>
      </ul>

      <p><strong>{t.pSafetyRule}</strong></p>

      <pre><code>{`# Decision flowchart:
#
# Is the commit pushed to a shared remote?
# ├── YES → git revert <commit>
# └── NO
#     ├── Want to remove commit entirely? → git reset --hard HEAD~1
#     ├── Want to redo commit?            → git reset --soft HEAD~1
#     └── Want to discard file changes?   → git restore <file>`}</code></pre>

      {/* ============================================================ */}
      {/* UNDOING A CHERRY-PICK */}
      {/* ============================================================ */}
      <h2>{t.h2UndoCherryPick}</h2>
      <p>{t.pUndoCherryPick}</p>

      <h3>{lang === 'zh' ? '\u672a\u63a8\u9001\u7684\u60c5\u51b5' : 'If not pushed yet'}</h3>
      <p>{t.undoNotPushed}</p>
      <pre><code>{`# Undo the cherry-pick (it was the last commit)
git reset --hard HEAD~1

# Or if you want to keep the changes for review:
git reset --soft HEAD~1`}</code></pre>

      <h3>{lang === 'zh' ? '\u5df2\u63a8\u9001\u7684\u60c5\u51b5' : 'If already pushed'}</h3>
      <p>{t.undoPushed}</p>
      <pre><code>{`# Find the cherry-picked commit hash
git log --oneline -5

# Revert it (safe for shared branches)
git revert <cherry-picked-commit-hash>
git push`}</code></pre>

      {/* ============================================================ */}
      {/* CHERRY-PICK ACROSS REPOS */}
      {/* ============================================================ */}
      <h2>{t.h2CrossRepo}</h2>
      <p>{t.pCrossRepo}</p>
      <p>{t.pCrossRepoSteps}</p>

      <pre><code>{`# Step 1: Add the other repository as a remote
git remote add upstream https://github.com/original/project.git

# Step 2: Fetch commits from the remote
git fetch upstream

# Step 3: Cherry-pick the specific commit
git cherry-pick <commit-hash-from-upstream>

# Full example: cherry-pick a fix from a colleague's fork
git remote add alice https://github.com/alice/project.git
git fetch alice
git log alice/main --oneline -10   # find the commit hash
git cherry-pick abc1234             # apply it

# Clean up: remove the remote when done
git remote remove alice`}</code></pre>

      {/* ============================================================ */}
      {/* INTERACTIVE REBASE ALTERNATIVE */}
      {/* ============================================================ */}
      <h2>{t.h2RebaseAlternative}</h2>
      <p>{t.pRebaseAlternative}</p>

      <p><strong>{t.rebaseWhen}</strong></p>
      <ul>
        <li>{t.rebaseWhen1}</li>
        <li>{t.rebaseWhen2}</li>
        <li>{t.rebaseWhen3}</li>
        <li>{t.rebaseWhen4}</li>
      </ul>

      <pre><code>{`# Interactive rebase: reorder, squash, edit, or drop commits
git rebase -i HEAD~5

# Opens an editor with:
# pick a1b2c3d First commit
# pick d4e5f6g Second commit
# pick h7i8j9k Third commit
# pick l0m1n2o Fourth commit
# pick p3q4r5s Fifth commit
#
# Change "pick" to:
#   squash (s) - combine with previous commit
#   edit (e)   - pause to amend this commit
#   drop (d)   - remove this commit
#   reword (r) - change commit message`}</code></pre>

      <p><strong>{t.cherryPickWhenBetter}</strong></p>
      <ul>
        <li>{t.cherryPickWhenBetter1}</li>
        <li>{t.cherryPickWhenBetter2}</li>
        <li>{t.cherryPickWhenBetter3}</li>
      </ul>

      <pre><code>{`# Cherry-pick is better for cross-branch operations:
git checkout release/2.0
git cherry-pick develop~3      # specific fix from develop
git cherry-pick -x abc1234     # with source tracking`}</code></pre>

      {/* ============================================================ */}
      {/* REAL-WORLD SCENARIOS */}
      {/* ============================================================ */}
      <h2>{t.h2RealWorld}</h2>
      <p>{t.pRealWorld}</p>

      <h3>{t.scenarioHotfix}</h3>
      <p>{t.scenarioHotfixDesc}</p>
      <pre><code>{`# 1. Find the fix commit on develop
git log develop --oneline --grep="fix critical"
# abc1234 Fix critical auth bypass vulnerability

# 2. Switch to the release branch
git checkout release/1.0

# 3. Cherry-pick the fix with source tracking
git cherry-pick -x abc1234

# 4. Push to the release branch
git push origin release/1.0

# 5. Tag the hotfix release
git tag -a v1.0.1 -m "Hotfix: auth bypass"
git push origin v1.0.1`}</code></pre>

      <h3>{t.scenarioExtract}</h3>
      <p>{t.scenarioExtractDesc}</p>
      <pre><code>{`# 1. Find the utility commit in the feature branch
git log feature/big-refactor --oneline
# ghi9012 Add date formatting utility
# def5678 Refactor user module (WIP)
# abc1234 Start big refactor

# 2. Cherry-pick just the utility commit
git checkout main
git cherry-pick ghi9012

# 3. Push so the other team can use it
git push origin main`}</code></pre>

      <h3>{t.scenarioRelease}</h3>
      <p>{t.scenarioReleaseDesc}</p>
      <pre><code>{`# Security fix committed on main
git log main --oneline -1
# abc1234 Fix: patch XSS vulnerability in input sanitizer

# Apply to all active release branches
git checkout release/1.x
git cherry-pick -x abc1234
git push origin release/1.x

git checkout release/2.x
git cherry-pick -x abc1234
git push origin release/2.x

# Verify the fix is on all branches
git log release/1.x --oneline -1
git log release/2.x --oneline -1`}</code></pre>

      {/* ============================================================ */}
      {/* DANGEROUS OPERATIONS */}
      {/* ============================================================ */}
      <h2>{t.h2DangerousOps}</h2>
      <p>{t.pDangerousOps}</p>

      <h3>git reset --hard</h3>
      <p>{t.dangerResetHard}</p>
      <pre><code>{`# ⚠️ Before using --hard, always check:
git status          # any uncommitted changes?
git stash           # save them first if needed

# If you already ran reset --hard and need to recover:
git reflog
# abc1234 HEAD@{0}: reset: moving to HEAD~3
# def5678 HEAD@{1}: commit: Important work
# ghi9012 HEAD@{2}: commit: More important work

# Recover by resetting to the pre-reset state:
git reset --hard def5678
# Or create a recovery branch:
git branch recovery def5678`}</code></pre>

      <h3>git push --force</h3>
      <p>{t.dangerForcePush}</p>
      <pre><code>{`# ⚠️ NEVER force push to shared branches without coordination
# BAD: Overwrites remote history unconditionally
git push --force

# BETTER: Only push if remote hasn't changed since last fetch
git push --force-with-lease

# SAFEST: Fetch first, then force-with-lease
git fetch origin
git push --force-with-lease origin feature-branch`}</code></pre>

      <h3>git reflog ({lang === 'zh' ? '\u5b89\u5168\u7f51' : 'Safety Net'})</h3>
      <p>{t.dangerReflog}</p>
      <pre><code>{`# View the reflog (all HEAD movements)
git reflog

# Example output:
# abc1234 HEAD@{0}: reset: moving to origin/main
# def5678 HEAD@{1}: commit: Add new feature
# ghi9012 HEAD@{2}: cherry-pick: Fix auth bug
# jkl3456 HEAD@{3}: checkout: moving from feature to main

# Recover ANY previous state:
git checkout def5678          # detached HEAD at that commit
git branch recovery def5678   # or create a branch

# The reflog is kept for 90 days by default
# Check the expiry setting:
git config gc.reflogExpire`}</code></pre>

      {/* ============================================================ */}
      {/* FAQ */}
      {/* ============================================================ */}
      <div className="faq-section">
        <h2>{t.h2Faq}</h2>
        <h3>{t.faq1q}</h3>
        <p>{t.faq1a}</p>
        <h3>{t.faq2q}</h3>
        <p>{t.faq2a}</p>
        <h3>{t.faq3q}</h3>
        <p>{t.faq3a}</p>
        <h3>{t.faq4q}</h3>
        <p>{t.faq4a}</p>
        <h3>{t.faq5q}</h3>
        <p>{t.faq5a}</p>
      </div>

      <p>{t.pConclusion}</p>

      <p>
        <Link href={`/${lang}/tools/git-command-generator`} style={{ fontWeight: 600 }}>
          {t.linkToolBottom}
        </Link>
      </p>
    </>
  );
}
