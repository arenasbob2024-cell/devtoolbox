'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Git Rebase vs Merge: When to Use Each Strategy',
    intro: 'Understanding the difference between <strong>git rebase</strong> and <strong>git merge</strong> is essential for every developer working with Git. Both commands integrate changes from one branch into another, but they do so in fundamentally different ways that affect your project history, team workflow, and conflict resolution process. This guide covers both strategies in depth with visual diagrams, practical examples, and team workflow recommendations.',
    h2HowMerge: 'How Git Merge Works',
    mergeP1: 'Git merge creates a new <strong>merge commit</strong> that has two parent commits, combining the histories of both branches. The original branch history is preserved exactly as it happened. This is a non-destructive operation.',
    mergeP2: 'When you run <code>git merge feature</code> from the main branch, Git finds the common ancestor of both branches, creates a new commit that combines the changes, and advances the main branch pointer to this new merge commit.',
    h2HowRebase: 'How Git Rebase Works',
    rebaseP1: 'Git rebase <strong>rewrites history</strong> by moving your branch commits to the tip of another branch. Instead of creating a merge commit, rebase replays each commit from your branch on top of the target branch, creating brand new commits with different SHA hashes.',
    rebaseP2: 'When you run <code>git rebase main</code> from a feature branch, Git identifies the common ancestor, temporarily removes your feature commits, fast-forwards to the tip of main, and then re-applies your commits one by one on top.',
    h2Visual: 'Visual Comparison',
    h2Comparison: 'Feature Comparison',
    thAspect: 'Aspect',
    thMerge: 'git merge',
    thRebase: 'git rebase',
    aspHistory: 'History',
    aspCommits: 'Commit SHAs',
    aspSafety: 'Safety',
    aspConflict: 'Conflict resolution',
    aspTeam: 'Team-friendly',
    aspRevert: 'Reverting',
    aspBisect: 'git bisect',
    aspGraph: 'Graph visualization',
    valMergeHist: 'Preserves all history + merge commit',
    valRebaseHist: 'Linear history (no merge commits)',
    valMergeCommit: 'Original SHAs preserved',
    valRebaseCommit: 'New SHAs created (rewritten)',
    valMergeSafety: 'Non-destructive (never rewrites history)',
    valRebaseSafety: 'Destructive (rewrites commit history)',
    valMergeConflict: 'Resolve once in merge commit',
    valRebaseConflict: 'May resolve per-commit during replay',
    valMergeTeam: 'Safe for shared branches',
    valRebaseTeam: 'Dangerous on shared branches',
    valMergeRevert: 'Easy (revert merge commit)',
    valRebaseRevert: 'Harder (find original commits)',
    valMergeBisect: 'Can be noisy with merge commits',
    valRebaseBisect: 'Clean linear history helps bisect',
    valMergeGraph: 'Complex graph with branches',
    valRebaseGraph: 'Clean single line',
    h2MergeDetail: 'Git Merge in Detail',
    h3FastForward: 'Fast-Forward Merge',
    ffP: 'When the target branch has no new commits since the feature branch diverged, Git can simply move the branch pointer forward. No merge commit is created.',
    h3ThreeWay: 'Three-Way Merge',
    threeWayP: 'When both branches have diverged (have new commits), Git performs a three-way merge using the common ancestor, the tip of each branch, and creates a merge commit.',
    h3NoFf: '--no-ff: Always Create Merge Commit',
    noFfP: 'The <code>--no-ff</code> flag forces Git to create a merge commit even when a fast-forward is possible. This preserves the branch history and makes it clear when features were integrated.',
    h2RebaseDetail: 'Git Rebase in Detail',
    h3BasicRebase: 'Basic Rebase',
    basicRebaseP: 'A standard rebase replays your commits on top of the target branch.',
    h3InteractiveRebase: 'Interactive Rebase',
    interactiveP: 'Interactive rebase (<code>git rebase -i</code>) lets you modify, squash, reorder, or drop commits before replaying them. This is one of Git\'s most powerful features for cleaning up commit history.',
    h3OntoRebase: '--onto Rebase',
    ontoP: 'The <code>--onto</code> flag lets you rebase a subset of commits onto a different base, which is useful for moving a branch that was based on the wrong parent.',
    h2Conflicts: 'Conflict Resolution',
    conflictsIntro: 'Both merge and rebase can produce conflicts, but the experience is different.',
    h3MergeConflicts: 'Merge Conflicts',
    mergeConflictP: 'During a merge, all conflicts are presented at once. You resolve them in a single commit. If the merge is complex, you may see many conflicting files, but you only need to resolve once.',
    h3RebaseConflicts: 'Rebase Conflicts',
    rebaseConflictP: 'During a rebase, conflicts may occur at each commit being replayed. You resolve conflicts one commit at a time, which can be tedious if many commits conflict. However, each conflict is typically smaller and easier to understand because it involves only one commit\'s changes.',
    h2Workflows: 'Team Workflow Strategies',
    h3MergeWorkflow: 'Merge-Based Workflow (GitHub Flow)',
    mergeWorkflowP: 'The most common team workflow uses merge exclusively. Developers create feature branches, open pull requests, and merge via the GitHub/GitLab UI. This approach is safe, simple, and creates a complete audit trail of when features were integrated.',
    h3RebaseWorkflow: 'Rebase-Before-Merge Workflow',
    rebaseWorkflowP: 'Teams that want clean history use rebase to update feature branches, then merge (with or without --no-ff) to integrate. This keeps the main branch history linear while still recording merge points.',
    h3SquashWorkflow: 'Squash and Merge Workflow',
    squashWorkflowP: 'Many teams prefer squash-and-merge, which combines all feature branch commits into a single commit on the main branch. GitHub and GitLab both support this as a merge strategy in pull requests.',
    h2GoldenRule: 'The Golden Rule of Rebasing',
    goldenRuleP: '<strong>Never rebase commits that have been pushed to a shared remote branch.</strong> Rebasing rewrites commit history (creates new SHA hashes). If other developers have based their work on the original commits, rebasing will cause conflicts, duplicated commits, and confusion. Only rebase your own local, unpushed commits.',
    h2BestPractices: 'Best Practices',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'When should I use rebase vs merge?',
    faq1A: 'Use <strong>rebase</strong> to update your local feature branch with the latest changes from main before opening a pull request. Use <strong>merge</strong> (or squash-merge) when integrating feature branches into the main branch, especially on shared branches.',
    faq2Q: 'Is rebase dangerous?',
    faq2A: 'Rebase rewrites history, which is dangerous on shared branches. If you only rebase local, unpushed commits, it is perfectly safe. The danger comes from rebasing commits that others have already pulled.',
    faq3Q: 'What is squash and merge?',
    faq3A: 'Squash and merge combines all commits from a feature branch into a single commit on the target branch. It creates a clean history like rebase but without rewriting any existing commits. GitHub and GitLab both support this as a pull request merge strategy.',
    faq4Q: 'Can I undo a rebase?',
    faq4A: 'Yes. Git keeps a reference log (reflog) of all branch pointer changes. You can find the pre-rebase state with <code>git reflog</code> and reset to it with <code>git reset --hard HEAD@{n}</code>. The reflog entries expire after 90 days by default.',
    faq5Q: 'Should my team use rebase or merge?',
    faq5A: 'Most teams benefit from a hybrid approach: developers rebase their local feature branches to stay current, then use squash-merge or merge --no-ff when integrating into main. This gives you clean history without the risks of rebasing shared branches.',
    faq6Q: 'What about git pull --rebase?',
    faq6A: '<code>git pull --rebase</code> (or <code>git pull -r</code>) fetches remote changes and rebases your local commits on top instead of creating a merge commit. This is safe and recommended for keeping your local branch clean. You can set it as default with <code>git config --global pull.rebase true</code>.',
    relatedTitle: 'Related Tools and Guides',
  },
  zh: {
    title: 'Git Rebase vs Merge：何时使用哪种策略',
    intro: '理解 <strong>git rebase</strong> 和 <strong>git merge</strong> 的区别对每个 Git 开发者都至关重要。两个命令都将更改从一个分支集成到另一个分支，但方式截然不同。',
    h2HowMerge: 'Git Merge 的工作原理', mergeP1: 'Git merge 创建一个新的<strong>合并提交</strong>，它有两个父提交，合并两个分支的历史。原始分支历史被完整保留。', mergeP2: '当你在主分支上运行 <code>git merge feature</code> 时，Git 找到共同祖先，创建合并提交，并推进主分支指针。',
    h2HowRebase: 'Git Rebase 的工作原理', rebaseP1: 'Git rebase <strong>重写历史</strong>，将你的分支提交移动到另一个分支的顶端。', rebaseP2: '当你从功能分支运行 <code>git rebase main</code> 时，Git 识别共同祖先，暂时移除你的提交，快进到 main 的顶端，然后逐个重新应用你的提交。',
    h2Visual: '可视化对比', h2Comparison: '功能对比',
    thAspect: '方面', thMerge: 'git merge', thRebase: 'git rebase',
    aspHistory: '历史', aspCommits: '提交 SHA', aspSafety: '安全性', aspConflict: '冲突解决', aspTeam: '团队友好', aspRevert: '回退', aspBisect: 'git bisect', aspGraph: '图形可视化',
    valMergeHist: '保留所有历史 + 合并提交', valRebaseHist: '线性历史（无合并提交）', valMergeCommit: '原始 SHA 保留', valRebaseCommit: '创建新 SHA（重写）', valMergeSafety: '非破坏性（不重写历史）', valRebaseSafety: '破坏性（重写提交历史）', valMergeConflict: '在合并提交中一次解决', valRebaseConflict: '在重放期间可能逐次解决', valMergeTeam: '对共享分支安全', valRebaseTeam: '对共享分支危险', valMergeRevert: '容易（回退合并提交）', valRebaseRevert: '较难（查找原始提交）', valMergeBisect: '合并提交可能干扰', valRebaseBisect: '干净的线性历史有助于 bisect', valMergeGraph: '带分支的复杂图', valRebaseGraph: '干净的单线',
    h2MergeDetail: 'Git Merge 详解', h3FastForward: '快进合并', ffP: '当目标分支没有新提交时，Git 可以简单地向前移动分支指针。', h3ThreeWay: '三方合并', threeWayP: '当两个分支都有新提交时，Git 执行三方合并。', h3NoFf: '--no-ff：始终创建合并提交', noFfP: '<code>--no-ff</code> 标志强制 Git 创建合并提交，即使可以快进。',
    h2RebaseDetail: 'Git Rebase 详解', h3BasicRebase: '基本 Rebase', basicRebaseP: '标准 rebase 将你的提交重放到目标分支之上。', h3InteractiveRebase: '交互式 Rebase', interactiveP: '交互式 rebase 让你可以修改、压缩、重排或丢弃提交。', h3OntoRebase: '--onto Rebase', ontoP: '<code>--onto</code> 标志让你将提交子集 rebase 到不同的基础上。',
    h2Conflicts: '冲突解决', conflictsIntro: 'merge 和 rebase 都可能产生冲突，但体验不同。', h3MergeConflicts: 'Merge 冲突', mergeConflictP: '合并时，所有冲突一次性呈现。', h3RebaseConflicts: 'Rebase 冲突', rebaseConflictP: 'Rebase 时，冲突可能在每次提交重放时出现。',
    h2Workflows: '团队工作流策略', h3MergeWorkflow: '基于 Merge 的工作流', mergeWorkflowP: '最常见的团队工作流，完全使用 merge。', h3RebaseWorkflow: '先 Rebase 后 Merge 工作流', rebaseWorkflowP: '使用 rebase 更新功能分支，然后合并。', h3SquashWorkflow: 'Squash and Merge 工作流', squashWorkflowP: '将所有功能分支提交合并为单个提交。',
    h2GoldenRule: 'Rebase 的黄金法则', goldenRuleP: '<strong>永远不要对已推送到共享远程分支的提交执行 rebase。</strong>',
    h2BestPractices: '最佳实践',
    h2Faq: '常见问题', faq1Q: '何时应该使用 rebase vs merge？', faq1A: '使用 <strong>rebase</strong> 在开 PR 前更新本地功能分支。使用 <strong>merge</strong> 将功能分支集成到主分支。', faq2Q: 'rebase 危险吗？', faq2A: 'Rebase 重写历史，对共享分支危险。对本地未推送的提交是安全的。', faq3Q: '什么是 squash and merge？', faq3A: '将功能分支的所有提交合并为目标分支上的单个提交。', faq4Q: '可以撤销 rebase 吗？', faq4A: '可以。使用 <code>git reflog</code> 找到 rebase 前的状态。', faq5Q: '团队应该用 rebase 还是 merge？', faq5A: '大多数团队受益于混合方法：开发者在本地 rebase，然后 squash-merge 到主分支。', faq6Q: 'git pull --rebase 是什么？', faq6A: '<code>git pull --rebase</code> 获取远程更改并将本地提交 rebase 到其上，而不是创建合并提交。',
    relatedTitle: '相关工具和指南',
  },
  ja: {
    title: 'Git Rebase vs Merge：各戦略をいつ使うべきか',
    intro: '<strong>git rebase</strong>と<strong>git merge</strong>の違いを理解することは、すべてのGit開発者にとって不可欠です。',
    h2HowMerge: 'Git Mergeの仕組み', mergeP1: 'Git mergeは2つの親コミットを持つ新しい<strong>マージコミット</strong>を作成します。', mergeP2: 'メインブランチで<code>git merge feature</code>を実行すると、Gitは共通の祖先を見つけます。',
    h2HowRebase: 'Git Rebaseの仕組み', rebaseP1: 'Git rebaseはブランチのコミットを別のブランチの先端に移動して<strong>履歴を書き換えます</strong>。', rebaseP2: 'フィーチャーブランチから<code>git rebase main</code>を実行すると、コミットが一つずつ再適用されます。',
    h2Visual: 'ビジュアル比較', h2Comparison: '機能比較', thAspect: '項目', thMerge: 'git merge', thRebase: 'git rebase', aspHistory: '履歴', aspCommits: 'コミットSHA', aspSafety: '安全性', aspConflict: 'コンフリクト解決', aspTeam: 'チーム向け', aspRevert: '取り消し', aspBisect: 'git bisect', aspGraph: 'グラフ表示',
    valMergeHist: 'すべての履歴を保持', valRebaseHist: '線形履歴', valMergeCommit: '元のSHAを保持', valRebaseCommit: '新しいSHAを作成', valMergeSafety: '非破壊的', valRebaseSafety: '破壊的', valMergeConflict: 'マージコミットで一度に解決', valRebaseConflict: 'コミットごとに解決', valMergeTeam: '共有ブランチに安全', valRebaseTeam: '共有ブランチに危険', valMergeRevert: '簡単', valRebaseRevert: '難しい', valMergeBisect: 'マージコミットでノイズ', valRebaseBisect: 'クリーンな履歴で有効', valMergeGraph: '複雑なグラフ', valRebaseGraph: 'クリーンな一本線',
    h2MergeDetail: 'Git Merge詳細', h3FastForward: 'ファストフォワードマージ', ffP: 'ターゲットブランチに新しいコミットがない場合。', h3ThreeWay: '3方向マージ', threeWayP: '両方のブランチが分岐した場合。', h3NoFf: '--no-ff', noFfP: 'ファストフォワードが可能でもマージコミットを強制。',
    h2RebaseDetail: 'Git Rebase詳細', h3BasicRebase: '基本的なRebase', basicRebaseP: '標準的なrebaseはコミットをターゲットブランチの上に再適用します。', h3InteractiveRebase: 'インタラクティブRebase', interactiveP: 'コミットの変更、スカッシュ、並べ替え、削除が可能。', h3OntoRebase: '--onto Rebase', ontoP: 'コミットのサブセットを別のベースにrebase。',
    h2Conflicts: 'コンフリクト解決', conflictsIntro: 'mergeとrebaseの両方でコンフリクトが発生する可能性があります。', h3MergeConflicts: 'Mergeコンフリクト', mergeConflictP: 'すべてのコンフリクトが一度に表示されます。', h3RebaseConflicts: 'Rebaseコンフリクト', rebaseConflictP: 'コミットごとにコンフリクトが発生する可能性があります。',
    h2Workflows: 'チームワークフロー', h3MergeWorkflow: 'Mergeベースのワークフロー', mergeWorkflowP: '最も一般的なチームワークフロー。', h3RebaseWorkflow: 'Rebase後Mergeワークフロー', rebaseWorkflowP: 'rebaseで更新してからmerge。', h3SquashWorkflow: 'Squash and Mergeワークフロー', squashWorkflowP: 'すべてのコミットを1つにまとめます。',
    h2GoldenRule: 'Rebaseの黄金律', goldenRuleP: '<strong>共有リモートブランチにプッシュ済みのコミットをrebaseしないでください。</strong>',
    h2BestPractices: 'ベストプラクティス',
    h2Faq: 'よくある質問', faq1Q: 'rebaseとmergeのどちらを使うべき？', faq1A: 'ローカルブランチの更新にrebase、メインブランチへの統合にmergeを使用。', faq2Q: 'rebaseは危険？', faq2A: '共有ブランチでは危険。ローカルの未プッシュコミットには安全。', faq3Q: 'squash and mergeとは？', faq3A: 'すべてのコミットを1つにまとめてマージ。', faq4Q: 'rebaseを取り消せる？', faq4A: 'はい。git reflogを使用。', faq5Q: 'チームはrebaseとmergeのどちら？', faq5A: 'ハイブリッドアプローチが最適。', faq6Q: 'git pull --rebaseとは？', faq6A: 'マージコミットの代わりにrebaseで更新を取得。',
    relatedTitle: '関連ツールとガイド',
  },
  ko: {
    title: 'Git Rebase vs Merge: 각 전략을 언제 사용해야 할까',
    intro: '<strong>git rebase</strong>와 <strong>git merge</strong>의 차이를 이해하는 것은 모든 Git 개발자에게 필수적입니다.',
    h2HowMerge: 'Git Merge 작동 원리', mergeP1: 'Git merge는 두 부모 커밋을 가진 새로운 <strong>머지 커밋</strong>을 만듭니다.', mergeP2: 'main 브랜치에서 <code>git merge feature</code>를 실행하면 공통 조상을 찾습니다.',
    h2HowRebase: 'Git Rebase 작동 원리', rebaseP1: 'Git rebase는 커밋을 다른 브랜치의 끝으로 이동하여 <strong>히스토리를 다시 씁니다</strong>.', rebaseP2: 'feature 브랜치에서 <code>git rebase main</code>을 실행하면 커밋이 하나씩 다시 적용됩니다.',
    h2Visual: '시각적 비교', h2Comparison: '기능 비교', thAspect: '항목', thMerge: 'git merge', thRebase: 'git rebase', aspHistory: '히스토리', aspCommits: '커밋 SHA', aspSafety: '안전성', aspConflict: '충돌 해결', aspTeam: '팀 친화적', aspRevert: '되돌리기', aspBisect: 'git bisect', aspGraph: '그래프 시각화',
    valMergeHist: '모든 히스토리 보존', valRebaseHist: '선형 히스토리', valMergeCommit: '원본 SHA 보존', valRebaseCommit: '새 SHA 생성', valMergeSafety: '비파괴적', valRebaseSafety: '파괴적', valMergeConflict: '머지 커밋에서 한 번에 해결', valRebaseConflict: '커밋별로 해결', valMergeTeam: '공유 브랜치에 안전', valRebaseTeam: '공유 브랜치에 위험', valMergeRevert: '쉬움', valRebaseRevert: '어려움', valMergeBisect: '머지 커밋으로 노이즈', valRebaseBisect: '깔끔한 히스토리로 유용', valMergeGraph: '복잡한 그래프', valRebaseGraph: '깔끔한 단일 선',
    h2MergeDetail: 'Git Merge 상세', h3FastForward: '패스트포워드 머지', ffP: '대상 브랜치에 새 커밋이 없을 때.', h3ThreeWay: '3-way 머지', threeWayP: '두 브랜치가 모두 분기했을 때.', h3NoFf: '--no-ff', noFfP: '패스트포워드가 가능해도 머지 커밋을 강제.',
    h2RebaseDetail: 'Git Rebase 상세', h3BasicRebase: '기본 Rebase', basicRebaseP: '표준 rebase는 커밋을 대상 브랜치 위에 다시 적용합니다.', h3InteractiveRebase: '인터랙티브 Rebase', interactiveP: '커밋 수정, 스쿼시, 재정렬, 삭제가 가능.', h3OntoRebase: '--onto Rebase', ontoP: '커밋 서브셋을 다른 베이스에 rebase.',
    h2Conflicts: '충돌 해결', conflictsIntro: 'merge와 rebase 모두 충돌이 발생할 수 있습니다.', h3MergeConflicts: 'Merge 충돌', mergeConflictP: '모든 충돌이 한 번에 표시됩니다.', h3RebaseConflicts: 'Rebase 충돌', rebaseConflictP: '커밋별로 충돌이 발생할 수 있습니다.',
    h2Workflows: '팀 워크플로우 전략', h3MergeWorkflow: 'Merge 기반 워크플로우', mergeWorkflowP: '가장 일반적인 팀 워크플로우.', h3RebaseWorkflow: 'Rebase 후 Merge 워크플로우', rebaseWorkflowP: 'rebase로 업데이트 후 merge.', h3SquashWorkflow: 'Squash and Merge 워크플로우', squashWorkflowP: '모든 커밋을 하나로 합칩니다.',
    h2GoldenRule: 'Rebase의 황금 규칙', goldenRuleP: '<strong>공유 원격 브랜치에 이미 푸시된 커밋을 rebase하지 마세요.</strong>',
    h2BestPractices: '모범 사례',
    h2Faq: '자주 묻는 질문', faq1Q: 'rebase와 merge 중 어느 것을 사용해야 하나요?', faq1A: '로컬 브랜치 업데이트에 rebase, 메인 브랜치 통합에 merge를 사용하세요.', faq2Q: 'rebase는 위험한가요?', faq2A: '공유 브랜치에서는 위험합니다. 로컬 미푸시 커밋에는 안전합니다.', faq3Q: 'squash and merge란?', faq3A: '모든 커밋을 하나로 합쳐서 머지합니다.', faq4Q: 'rebase를 취소할 수 있나요?', faq4A: '네. git reflog를 사용하세요.', faq5Q: '팀은 rebase와 merge 중 어느 것을 사용해야 하나요?', faq5A: '하이브리드 접근이 최적입니다.', faq6Q: 'git pull --rebase란?', faq6A: '머지 커밋 대신 rebase로 업데이트를 가져옵니다.',
    relatedTitle: '관련 도구 및 가이드',
  },
  fr: {
    title: 'Git Rebase vs Merge : Quand utiliser chaque strategie',
    intro: 'Comprendre la difference entre <strong>git rebase</strong> et <strong>git merge</strong> est essentiel pour tout developpeur.',
    h2HowMerge: 'Comment fonctionne Git Merge', mergeP1: 'Git merge cree un nouveau <strong>commit de merge</strong> avec deux parents.', mergeP2: 'Lorsque vous executez <code>git merge feature</code> sur la branche principale, Git trouve l\'ancetre commun.',
    h2HowRebase: 'Comment fonctionne Git Rebase', rebaseP1: 'Git rebase <strong>reecrit l\'historique</strong> en deplacant vos commits.', rebaseP2: 'Git identifie l\'ancetre commun et re-applique vos commits un par un.',
    h2Visual: 'Comparaison visuelle', h2Comparison: 'Comparaison des fonctionnalites', thAspect: 'Aspect', thMerge: 'git merge', thRebase: 'git rebase', aspHistory: 'Historique', aspCommits: 'SHA des commits', aspSafety: 'Securite', aspConflict: 'Resolution des conflits', aspTeam: 'Equipe', aspRevert: 'Annulation', aspBisect: 'git bisect', aspGraph: 'Graphe',
    valMergeHist: 'Preserve tout l\'historique', valRebaseHist: 'Historique lineaire', valMergeCommit: 'SHA originaux preserves', valRebaseCommit: 'Nouveaux SHA crees', valMergeSafety: 'Non destructif', valRebaseSafety: 'Destructif', valMergeConflict: 'Resoudre une fois', valRebaseConflict: 'Resoudre par commit', valMergeTeam: 'Sur pour les branches partagees', valRebaseTeam: 'Dangereux sur branches partagees', valMergeRevert: 'Facile', valRebaseRevert: 'Difficile', valMergeBisect: 'Bruyant avec les merges', valRebaseBisect: 'Historique propre', valMergeGraph: 'Graphe complexe', valRebaseGraph: 'Ligne unique propre',
    h2MergeDetail: 'Git Merge en detail', h3FastForward: 'Fast-Forward Merge', ffP: 'Quand la branche cible n\'a pas de nouveaux commits.', h3ThreeWay: 'Merge a trois voies', threeWayP: 'Quand les deux branches ont diverge.', h3NoFf: '--no-ff', noFfP: 'Force la creation d\'un commit de merge.',
    h2RebaseDetail: 'Git Rebase en detail', h3BasicRebase: 'Rebase basique', basicRebaseP: 'Re-applique vos commits sur la branche cible.', h3InteractiveRebase: 'Rebase interactif', interactiveP: 'Modifier, squasher, reordonner ou supprimer des commits.', h3OntoRebase: '--onto Rebase', ontoP: 'Rebase un sous-ensemble de commits.',
    h2Conflicts: 'Resolution des conflits', conflictsIntro: 'Les deux peuvent produire des conflits.', h3MergeConflicts: 'Conflits Merge', mergeConflictP: 'Tous les conflits sont presentes en une fois.', h3RebaseConflicts: 'Conflits Rebase', rebaseConflictP: 'Les conflits apparaissent par commit.',
    h2Workflows: 'Strategies de workflow', h3MergeWorkflow: 'Workflow base sur Merge', mergeWorkflowP: 'Le workflow le plus courant.', h3RebaseWorkflow: 'Workflow Rebase puis Merge', rebaseWorkflowP: 'Rebase pour mettre a jour, puis merge.', h3SquashWorkflow: 'Workflow Squash and Merge', squashWorkflowP: 'Combine tous les commits en un seul.',
    h2GoldenRule: 'La regle d\'or du Rebase', goldenRuleP: '<strong>Ne jamais rebase des commits deja pushes sur une branche partagee.</strong>',
    h2BestPractices: 'Bonnes pratiques',
    h2Faq: 'Questions frequentes', faq1Q: 'Quand utiliser rebase vs merge ?', faq1A: 'Rebase pour mettre a jour localement, merge pour integrer.', faq2Q: 'Le rebase est-il dangereux ?', faq2A: 'Sur les branches partagees oui, sur les branches locales non.', faq3Q: 'Qu\'est-ce que squash and merge ?', faq3A: 'Combine tous les commits en un seul.', faq4Q: 'Peut-on annuler un rebase ?', faq4A: 'Oui, avec git reflog.', faq5Q: 'Rebase ou merge pour l\'equipe ?', faq5A: 'Approche hybride recommandee.', faq6Q: 'Qu\'est-ce que git pull --rebase ?', faq6A: 'Rebase au lieu de merge lors du pull.',
    relatedTitle: 'Outils et guides associes',
  },
  de: {
    title: 'Git Rebase vs Merge: Wann welche Strategie verwenden',
    intro: 'Das Verstaendnis des Unterschieds zwischen <strong>git rebase</strong> und <strong>git merge</strong> ist fuer jeden Entwickler wichtig.',
    h2HowMerge: 'Wie Git Merge funktioniert', mergeP1: 'Git merge erstellt einen neuen <strong>Merge-Commit</strong> mit zwei Eltern.', mergeP2: 'Beim Ausfuehren von <code>git merge feature</code> findet Git den gemeinsamen Vorfahren.',
    h2HowRebase: 'Wie Git Rebase funktioniert', rebaseP1: 'Git rebase <strong>schreibt die Historie um</strong>.', rebaseP2: 'Git identifiziert den gemeinsamen Vorfahren und wendet Commits einzeln an.',
    h2Visual: 'Visueller Vergleich', h2Comparison: 'Funktionsvergleich', thAspect: 'Aspekt', thMerge: 'git merge', thRebase: 'git rebase', aspHistory: 'Historie', aspCommits: 'Commit-SHAs', aspSafety: 'Sicherheit', aspConflict: 'Konfliktloesung', aspTeam: 'Team-freundlich', aspRevert: 'Rueckgaengig', aspBisect: 'git bisect', aspGraph: 'Graph',
    valMergeHist: 'Gesamte Historie erhalten', valRebaseHist: 'Lineare Historie', valMergeCommit: 'Original-SHAs erhalten', valRebaseCommit: 'Neue SHAs erstellt', valMergeSafety: 'Nicht-destruktiv', valRebaseSafety: 'Destruktiv', valMergeConflict: 'Einmal loesen', valRebaseConflict: 'Pro Commit loesen', valMergeTeam: 'Sicher fuer geteilte Branches', valRebaseTeam: 'Gefaehrlich bei geteilten Branches', valMergeRevert: 'Einfach', valRebaseRevert: 'Schwieriger', valMergeBisect: 'Merge-Commits stoerend', valRebaseBisect: 'Saubere Historie hilfreich', valMergeGraph: 'Komplexer Graph', valRebaseGraph: 'Saubere Linie',
    h2MergeDetail: 'Git Merge im Detail', h3FastForward: 'Fast-Forward Merge', ffP: 'Wenn der Zielbranch keine neuen Commits hat.', h3ThreeWay: 'Drei-Wege-Merge', threeWayP: 'Wenn beide Branches divergiert sind.', h3NoFf: '--no-ff', noFfP: 'Erzwingt einen Merge-Commit.',
    h2RebaseDetail: 'Git Rebase im Detail', h3BasicRebase: 'Einfacher Rebase', basicRebaseP: 'Wendet Commits auf den Zielbranch an.', h3InteractiveRebase: 'Interaktiver Rebase', interactiveP: 'Commits aendern, zusammenfassen, umordnen.', h3OntoRebase: '--onto Rebase', ontoP: 'Subset von Commits auf neue Basis.',
    h2Conflicts: 'Konfliktloesung', conflictsIntro: 'Beide koennen Konflikte erzeugen.', h3MergeConflicts: 'Merge-Konflikte', mergeConflictP: 'Alle Konflikte auf einmal.', h3RebaseConflicts: 'Rebase-Konflikte', rebaseConflictP: 'Konflikte pro Commit.',
    h2Workflows: 'Team-Workflows', h3MergeWorkflow: 'Merge-basierter Workflow', mergeWorkflowP: 'Der gaengigste Team-Workflow.', h3RebaseWorkflow: 'Rebase-dann-Merge Workflow', rebaseWorkflowP: 'Rebase zum Aktualisieren, dann Merge.', h3SquashWorkflow: 'Squash and Merge Workflow', squashWorkflowP: 'Alle Commits zu einem zusammenfassen.',
    h2GoldenRule: 'Die goldene Regel des Rebase', goldenRuleP: '<strong>Nie bereits gepushte Commits auf geteilten Branches rebasen.</strong>',
    h2BestPractices: 'Best Practices',
    h2Faq: 'Haeufig gestellte Fragen', faq1Q: 'Wann rebase vs merge?', faq1A: 'Rebase fuer lokale Updates, Merge fuer Integration.', faq2Q: 'Ist Rebase gefaehrlich?', faq2A: 'Auf geteilten Branches ja, lokal nein.', faq3Q: 'Was ist Squash and Merge?', faq3A: 'Alle Commits zu einem zusammenfassen.', faq4Q: 'Kann man Rebase rueckgaengig machen?', faq4A: 'Ja, mit git reflog.', faq5Q: 'Rebase oder Merge fuer Teams?', faq5A: 'Hybrider Ansatz empfohlen.', faq6Q: 'Was ist git pull --rebase?', faq6A: 'Rebase statt Merge beim Pull.',
    relatedTitle: 'Verwandte Tools und Anleitungen',
  },
  es: {
    title: 'Git Rebase vs Merge: Cuando usar cada estrategia',
    intro: 'Entender la diferencia entre <strong>git rebase</strong> y <strong>git merge</strong> es esencial para todo desarrollador.',
    h2HowMerge: 'Como funciona Git Merge', mergeP1: 'Git merge crea un nuevo <strong>commit de merge</strong> con dos padres.', mergeP2: 'Al ejecutar <code>git merge feature</code>, Git encuentra el ancestro comun.',
    h2HowRebase: 'Como funciona Git Rebase', rebaseP1: 'Git rebase <strong>reescribe el historial</strong>.', rebaseP2: 'Git identifica el ancestro comun y re-aplica los commits uno a uno.',
    h2Visual: 'Comparacion visual', h2Comparison: 'Comparacion de funciones', thAspect: 'Aspecto', thMerge: 'git merge', thRebase: 'git rebase', aspHistory: 'Historial', aspCommits: 'SHA de commits', aspSafety: 'Seguridad', aspConflict: 'Resolucion de conflictos', aspTeam: 'Para equipos', aspRevert: 'Revertir', aspBisect: 'git bisect', aspGraph: 'Grafo',
    valMergeHist: 'Preserva todo el historial', valRebaseHist: 'Historial lineal', valMergeCommit: 'SHA originales preservados', valRebaseCommit: 'Nuevos SHA creados', valMergeSafety: 'No destructivo', valRebaseSafety: 'Destructivo', valMergeConflict: 'Resolver una vez', valRebaseConflict: 'Resolver por commit', valMergeTeam: 'Seguro en ramas compartidas', valRebaseTeam: 'Peligroso en ramas compartidas', valMergeRevert: 'Facil', valRebaseRevert: 'Dificil', valMergeBisect: 'Ruidoso con merges', valRebaseBisect: 'Historial limpio', valMergeGraph: 'Grafo complejo', valRebaseGraph: 'Linea limpia',
    h2MergeDetail: 'Git Merge en detalle', h3FastForward: 'Fast-Forward Merge', ffP: 'Cuando la rama destino no tiene nuevos commits.', h3ThreeWay: 'Merge de tres vias', threeWayP: 'Cuando ambas ramas han divergido.', h3NoFf: '--no-ff', noFfP: 'Fuerza la creacion de un commit de merge.',
    h2RebaseDetail: 'Git Rebase en detalle', h3BasicRebase: 'Rebase basico', basicRebaseP: 'Re-aplica commits sobre la rama destino.', h3InteractiveRebase: 'Rebase interactivo', interactiveP: 'Modificar, comprimir, reordenar o eliminar commits.', h3OntoRebase: '--onto Rebase', ontoP: 'Rebase un subconjunto de commits.',
    h2Conflicts: 'Resolucion de conflictos', conflictsIntro: 'Ambos pueden producir conflictos.', h3MergeConflicts: 'Conflictos Merge', mergeConflictP: 'Todos los conflictos a la vez.', h3RebaseConflicts: 'Conflictos Rebase', rebaseConflictP: 'Conflictos por commit.',
    h2Workflows: 'Estrategias de workflow', h3MergeWorkflow: 'Workflow basado en Merge', mergeWorkflowP: 'El workflow mas comun.', h3RebaseWorkflow: 'Workflow Rebase y luego Merge', rebaseWorkflowP: 'Rebase para actualizar, luego merge.', h3SquashWorkflow: 'Workflow Squash and Merge', squashWorkflowP: 'Combina todos los commits en uno.',
    h2GoldenRule: 'La regla de oro del Rebase', goldenRuleP: '<strong>Nunca hacer rebase de commits ya pusheados a una rama compartida.</strong>',
    h2BestPractices: 'Mejores practicas',
    h2Faq: 'Preguntas frecuentes', faq1Q: 'Cuando usar rebase vs merge?', faq1A: 'Rebase para actualizar localmente, merge para integrar.', faq2Q: 'Es peligroso el rebase?', faq2A: 'En ramas compartidas si, localmente no.', faq3Q: 'Que es squash and merge?', faq3A: 'Combina todos los commits en uno.', faq4Q: 'Se puede deshacer un rebase?', faq4A: 'Si, con git reflog.', faq5Q: 'Rebase o merge para equipos?', faq5A: 'Enfoque hibrido recomendado.', faq6Q: 'Que es git pull --rebase?', faq6A: 'Rebase en lugar de merge al hacer pull.',
    relatedTitle: 'Herramientas y guias relacionadas',
  },
};

export default function GitRebaseVsMerge({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2HowMerge}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.mergeP1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.mergeP2 }} />

      <h2>{s.h2HowRebase}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.rebaseP1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.rebaseP2 }} />

      <h2>{s.h2Visual}</h2>
      <pre><code className="language-text">{`BEFORE (both branches have diverged from common ancestor C2):

          C5---C6---C7  (feature)
         /
  C1---C2---C3---C4     (main)

AFTER git merge feature (from main):

          C5---C6---C7
         /            \\
  C1---C2---C3---C4----M8  (main) ← merge commit M8 has 2 parents
                            (feature still points to C7)

AFTER git rebase main (from feature):

  C1---C2---C3---C4                     (main)
                   \\
                    C5'---C6'---C7'     (feature) ← new commits (different SHAs)

  Then fast-forward merge:
  C1---C2---C3---C4---C5'---C6'---C7'  (main, feature) ← linear history`}</code></pre>

      <h2>{s.h2Comparison}</h2>
      <table>
        <thead><tr><th>{s.thAspect}</th><th>{s.thMerge}</th><th>{s.thRebase}</th></tr></thead>
        <tbody>
          <tr><td>{s.aspHistory}</td><td>{s.valMergeHist}</td><td>{s.valRebaseHist}</td></tr>
          <tr><td>{s.aspCommits}</td><td>{s.valMergeCommit}</td><td>{s.valRebaseCommit}</td></tr>
          <tr><td>{s.aspSafety}</td><td>{s.valMergeSafety}</td><td>{s.valRebaseSafety}</td></tr>
          <tr><td>{s.aspConflict}</td><td>{s.valMergeConflict}</td><td>{s.valRebaseConflict}</td></tr>
          <tr><td>{s.aspTeam}</td><td>{s.valMergeTeam}</td><td>{s.valRebaseTeam}</td></tr>
          <tr><td>{s.aspRevert}</td><td>{s.valMergeRevert}</td><td>{s.valRebaseRevert}</td></tr>
          <tr><td>{s.aspBisect}</td><td>{s.valMergeBisect}</td><td>{s.valRebaseBisect}</td></tr>
          <tr><td>{s.aspGraph}</td><td>{s.valMergeGraph}</td><td>{s.valRebaseGraph}</td></tr>
        </tbody>
      </table>

      <h2>{s.h2MergeDetail}</h2>

      <h3>{s.h3FastForward}</h3>
      <p>{s.ffP}</p>
      <pre><code className="language-bash">{`# Fast-forward merge (no merge commit created)
git checkout main
git merge feature

# Before:
# C1---C2 (main)
#        \\
#         C3---C4 (feature)

# After:
# C1---C2---C3---C4 (main, feature)
# main pointer simply moved forward`}</code></pre>

      <h3>{s.h3ThreeWay}</h3>
      <p>{s.threeWayP}</p>
      <pre><code className="language-bash">{`# Three-way merge (creates merge commit)
git checkout main
git merge feature

# Before:
#        C3---C4 (feature)
#       /
# C1---C2---C5---C6 (main)

# After:
#        C3---C4
#       /       \\
# C1---C2---C5---C6---M7 (main)  ← merge commit M7`}</code></pre>

      <h3>{s.h3NoFf}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.noFfP }} />
      <pre><code className="language-bash">{`# Force merge commit even when fast-forward is possible
git checkout main
git merge --no-ff feature

# Before:
# C1---C2 (main)
#        \\
#         C3---C4 (feature)

# After (with --no-ff):
# C1---C2---------M5 (main)  ← merge commit preserves branch history
#        \\       /
#         C3---C4 (feature)

# After (without --no-ff, default):
# C1---C2---C3---C4 (main, feature)  ← no evidence of branch`}</code></pre>

      <h2>{s.h2RebaseDetail}</h2>

      <h3>{s.h3BasicRebase}</h3>
      <p>{s.basicRebaseP}</p>
      <pre><code className="language-bash">{`# Basic rebase workflow
git checkout feature
git rebase main

# Before:
#        C3---C4 (feature)
#       /
# C1---C2---C5---C6 (main)

# After rebase:
#                     C3'---C4' (feature)  ← new commits!
#                    /
# C1---C2---C5---C6 (main)

# Then merge (fast-forward):
git checkout main
git merge feature
# C1---C2---C5---C6---C3'---C4' (main, feature)  ← linear!`}</code></pre>

      <h3>{s.h3InteractiveRebase}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.interactiveP }} />
      <pre><code className="language-bash">{`# Interactive rebase - clean up last 4 commits
git rebase -i HEAD~4

# Editor opens with:
pick abc1234 Add user model
pick def5678 Fix typo in user model
pick ghi9012 Add user validation
pick jkl3456 Fix validation edge case

# Change to:
pick abc1234 Add user model
fixup def5678 Fix typo in user model        # squash into previous, discard message
pick ghi9012 Add user validation
fixup jkl3456 Fix validation edge case      # squash into previous, discard message

# Result: 2 clean commits instead of 4
# "Add user model" (includes typo fix)
# "Add user validation" (includes edge case fix)

# Interactive rebase commands:
# pick   = use commit as-is
# reword = use commit but edit message
# edit   = use commit but stop for amending
# squash = meld into previous commit (keep message)
# fixup  = meld into previous commit (discard message)
# drop   = remove commit entirely`}</code></pre>

      <h3>{s.h3OntoRebase}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.ontoP }} />
      <pre><code className="language-bash">{`# --onto: Move a branch to a different base
# Scenario: feature-b was branched from feature-a by mistake
#           You want feature-b based on main instead

#        D---E (feature-b)
#       /
# A---B---C (feature-a)
#     |
#     F---G (main)

git rebase --onto main feature-a feature-b

# Result:
#     D'---E' (feature-b)  ← now based on main
#    /
# A---B---C (feature-a)
#     |
#     F---G (main)`}</code></pre>

      <h2>{s.h2Conflicts}</h2>
      <p>{s.conflictsIntro}</p>

      <h3>{s.h3MergeConflicts}</h3>
      <p>{s.mergeConflictP}</p>
      <pre><code className="language-bash">{`# Merge conflict workflow
git checkout main
git merge feature
# CONFLICT (content): Merge conflict in src/app.ts
# Automatic merge failed; fix conflicts and then commit

# 1. Open conflicting files and resolve
# 2. Stage resolved files
git add src/app.ts
# 3. Complete the merge
git commit  # creates merge commit with conflict resolution

# Abort merge if needed
git merge --abort`}</code></pre>

      <h3>{s.h3RebaseConflicts}</h3>
      <p>{s.rebaseConflictP}</p>
      <pre><code className="language-bash">{`# Rebase conflict workflow
git checkout feature
git rebase main
# CONFLICT in commit C3: Merge conflict in src/app.ts

# 1. Resolve conflict in src/app.ts
git add src/app.ts
# 2. Continue rebase to next commit
git rebase --continue
# May hit another conflict in C4...

# CONFLICT in commit C4: Merge conflict in src/utils.ts
git add src/utils.ts
git rebase --continue

# Abort rebase if it gets too complex
git rebase --abort  # returns to pre-rebase state

# Skip a problematic commit during rebase
git rebase --skip`}</code></pre>

      <h2>{s.h2Workflows}</h2>

      <h3>{s.h3MergeWorkflow}</h3>
      <p>{s.mergeWorkflowP}</p>
      <pre><code className="language-bash">{`# GitHub Flow (merge-based)
git checkout -b feature/add-auth
# ... make commits ...
git push -u origin feature/add-auth
# Open PR on GitHub
# Review + approve
# Click "Merge pull request" (creates merge commit)
# Or "Squash and merge" (single commit)`}</code></pre>

      <h3>{s.h3RebaseWorkflow}</h3>
      <p>{s.rebaseWorkflowP}</p>
      <pre><code className="language-bash">{`# Rebase-before-merge workflow
git checkout feature/add-auth
# ... make commits ...

# Before opening PR, update with latest main
git fetch origin
git rebase origin/main

# Force push (safe because it's your own branch)
git push --force-with-lease origin feature/add-auth

# Open PR on GitHub
# Merge with --no-ff to record integration point
git checkout main
git merge --no-ff feature/add-auth`}</code></pre>

      <h3>{s.h3SquashWorkflow}</h3>
      <p>{s.squashWorkflowP}</p>
      <pre><code className="language-bash">{`# Squash and merge (via GitHub UI or CLI)
git checkout main
git merge --squash feature/add-auth
git commit -m "feat: add authentication system"

# Before:
# main: A---B---C
# feature: A---B---D---E---F---G

# After squash-merge:
# main: A---B---C---H  ← H contains all changes from D+E+F+G
# (feature branch can be deleted)`}</code></pre>

      <h2>{s.h2GoldenRule}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.goldenRuleP }} />
      <pre><code className="language-bash">{`# DANGEROUS: Rebasing a shared branch
git checkout shared-feature
git rebase main
git push --force  # !! This rewrites history for everyone!

# SAFE: Rebasing your own local branch
git checkout my-local-feature
git rebase main
# No push yet, or push --force-with-lease to your own branch

# SAFE: Using --force-with-lease instead of --force
git push --force-with-lease origin my-feature
# Fails if remote has commits you haven't seen`}</code></pre>

      <h2>{s.h2BestPractices}</h2>
      <pre><code className="language-text">{`Git Rebase vs Merge Best Practices:

1. Use merge for integrating feature branches into main
   - Creates clear integration points
   - Safe for shared branches
   - Easy to revert entire features

2. Use rebase to keep feature branches up-to-date
   - git rebase main (before opening PR)
   - Creates clean, linear history
   - Makes code review easier

3. Use interactive rebase to clean up before PR
   - Squash fixup commits
   - Reword unclear commit messages
   - Drop debugging commits

4. Use git pull --rebase as default
   - Avoids unnecessary merge commits
   - git config --global pull.rebase true

5. Never rebase shared/pushed commits
   - Only rebase your own unpushed work
   - Use --force-with-lease, never --force

6. Use squash-merge for feature branches
   - One clean commit per feature on main
   - Detailed commits preserved in PR history

7. Use --no-ff for important merges
   - Preserves the fact that a branch existed
   - Makes git log --first-parent useful`}</code></pre>

      <h2>{s.h2Faq}</h2>

      <h3>{s.faq1Q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1A }} />

      <h3>{s.faq2Q}</h3>
      <p>{s.faq2A}</p>

      <h3>{s.faq3Q}</h3>
      <p>{s.faq3A}</p>

      <h3>{s.faq4Q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq4A }} />

      <h3>{s.faq5Q}</h3>
      <p>{s.faq5A}</p>

      <h3>{s.faq6Q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq6A }} />

      <h2>{s.relatedTitle}</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format Git config files</li>
        <li><Link href={`/${lang}/tools/diff-checker`}>Diff Checker</Link> - Compare code changes before merge</li>
        <li><Link href={`/${lang}/blog/git-commands-cheat-sheet`}>Git Commands Cheat Sheet</Link></li>
        <li><Link href={`/${lang}/blog/git-branch-naming-convention`}>Git Branch Naming Convention</Link></li>
        <li><Link href={`/${lang}/blog/git-cherry-pick-revert-reset-guide`}>Git Cherry-Pick, Revert, and Reset Guide</Link></li>
        <li><Link href={`/${lang}/blog/git-workflow-strategies`}>Git Workflow Strategies</Link></li>
      </ul>
    </>
  );
}
