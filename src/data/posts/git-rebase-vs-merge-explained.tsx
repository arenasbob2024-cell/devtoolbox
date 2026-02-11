'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Git Rebase vs Merge: When to Use Each',
    intro: 'The rebase vs merge debate is one of the most common discussions in Git workflow. Both commands integrate changes from one branch into another, but they do it in fundamentally different ways. Understanding when to use each is crucial for maintaining a clean, navigable project history.',
    mergeTitle: 'How Git Merge Works',
    mergeDesc: 'Git merge creates a new "merge commit" that ties together the histories of both branches. It preserves the complete history and chronological order of commits.',
    mergeHow: 'When you run git merge feature, Git finds the common ancestor of both branches, then creates a new commit that combines the changes from both.',
    rebaseTitle: 'How Git Rebase Works',
    rebaseDesc: 'Git rebase moves (or "replays") your commits on top of another branch. It rewrites commit history to create a linear sequence of commits.',
    rebaseHow: 'When you run git rebase main from your feature branch, Git takes each commit in your branch, temporarily removes it, updates your branch to match main, then re-applies each commit one by one on top.',
    visualTitle: 'Visual Comparison',
    whenMergeTitle: 'When to Use Merge',
    whenMerge1: 'Public/shared branches — Merge never rewrites history, so it is safe for branches others are working on.',
    whenMerge2: 'Preserving context — The merge commit shows when a feature branch was integrated and by whom.',
    whenMerge3: 'Team collaboration — When multiple people work on the same branch, merge avoids conflicts from history rewriting.',
    whenMerge4: 'Release branches — Merging release branches preserves the exact integration point.',
    whenRebaseTitle: 'When to Use Rebase',
    whenRebase1: 'Feature branches (before merging to main) — Rebase creates a clean linear history before the final merge.',
    whenRebase2: 'Keeping up to date — Rebase your feature branch onto the latest main to get new changes without merge commits.',
    whenRebase3: 'Before PR submission — A rebased branch with clean commits is easier to review.',
    whenRebase4: 'Cleaning up local commits — Interactive rebase lets you squash, reorder, and edit commits before sharing.',
    interactiveTitle: 'Interactive Rebase: Squash, Fixup, Reorder',
    interactiveDesc: 'Interactive rebase (git rebase -i) is one of the most powerful Git features. It lets you modify commits before sharing them.',
    goldenRuleTitle: 'The Golden Rule: Never Rebase Public Branches',
    goldenRuleDesc: 'If a branch has been pushed and others are working on it, DO NOT rebase it. Rebase rewrites commit hashes, which means other developers will have divergent histories and will face painful merge conflicts.',
    goldenRule: 'Golden Rule: Only rebase commits that have NOT been pushed to a shared remote, or that only you are working on.',
    comparisonTitle: 'Merge vs Rebase: Complete Comparison',
    workflowsTitle: 'Common Git Workflows',
    workflow1Title: 'Feature Branch Workflow',
    workflow1Desc: 'Create a feature branch, develop, rebase onto main, then merge with --no-ff. This gives a linear history with clear merge points.',
    workflow2Title: 'Gitflow Workflow',
    workflow2Desc: 'Uses develop, feature, release, and hotfix branches. Always merge (never rebase) between long-lived branches.',
    workflow3Title: 'Trunk-Based Development',
    workflow3Desc: 'Short-lived feature branches (< 1 day). Rebase onto main frequently, merge quickly. Favored by high-performing teams.',
    dangersTitle: 'Dangerous Scenarios',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Can I undo a rebase?',
    faq1a: 'Yes. Use git reflog to find the commit hash before the rebase, then git reset --hard <hash> to restore it. The reflog keeps a record of all HEAD movements for 90 days by default.',
    faq2q: 'Should I rebase or merge when updating my feature branch?',
    faq2a: 'If you are the only person working on the feature branch, rebase is preferred for a cleaner history. If others are also working on it, use merge to avoid rewriting shared history.',
    faq3q: 'What is git pull --rebase?',
    faq3a: 'Instead of merging the remote branch into your local branch (creating a merge commit), git pull --rebase replays your local commits on top of the remote changes. It keeps your history linear.',
    faq4q: 'What happens if I rebase a branch that has been pushed?',
    faq4a: 'You will need to force push (git push --force-with-lease). Anyone who has pulled the old commits will have divergent history and will need to reset or re-clone. This is why you should only rebase branches that you alone work on.',
    faq5q: 'Is squash merge the same as rebase + squash?',
    faq5a: 'Similar result, different mechanism. GitHub\'s "Squash and merge" button squashes all commits into one and creates a merge commit. Rebase -i with squash lets you choose which commits to combine and gives you more control.',
    faq6q: 'Which is better for open source contributions?',
    faq6a: 'Most open source projects prefer rebased, clean commits. Before submitting a PR, rebase onto the latest main and squash fixup commits. This makes the PR easier to review and the history cleaner.',
    criteria: 'Criteria',
    merge: 'Merge',
    rebase: 'Rebase',
    scenario: 'Scenario',
    risk: 'Risk',
    prevention: 'Prevention',
  },
  zh: {
    title: 'Git Rebase vs Merge：何时使用哪个（图解对比）',
    intro: 'rebase 和 merge 的争论是 Git 工作流中最常见的讨论之一。两个命令都将一个分支的更改整合到另一个分支，但方式完全不同。理解何时使用哪个对于维护清晰、可导航的项目历史至关重要。',
    mergeTitle: 'Git Merge 工作原理',
    mergeDesc: 'Git merge 创建一个新的"合并提交"来连接两个分支的历史。它保留了完整的历史记录和提交的时间顺序。',
    mergeHow: '当你运行 git merge feature 时，Git 找到两个分支的公共祖先，然后创建一个新的提交来合并两者的更改。',
    rebaseTitle: 'Git Rebase 工作原理',
    rebaseDesc: 'Git rebase 将你的提交移动（或"重放"）到另一个分支的顶部。它重写提交历史以创建线性的提交序列。',
    rebaseHow: '当你在功能分支上运行 git rebase main 时，Git 取出你分支中的每个提交，临时移除它们，将分支更新到 main 的最新状态，然后逐个在顶部重新应用每个提交。',
    visualTitle: '可视化对比',
    whenMergeTitle: '何时使用 Merge',
    whenMerge1: '公共/共享分支——Merge 不会重写历史，对其他人正在使用的分支是安全的。',
    whenMerge2: '保留上下文——合并提交显示了功能分支何时以及由谁整合。',
    whenMerge3: '团队协作——多人在同一分支工作时，merge 避免了历史重写导致的冲突。',
    whenMerge4: '发布分支——合并发布分支保留了确切的整合点。',
    whenRebaseTitle: '何时使用 Rebase',
    whenRebase1: '功能分支（合并到 main 之前）——Rebase 在最终合并前创建干净的线性历史。',
    whenRebase2: '保持更新——将功能分支 rebase 到最新的 main 上，获取新更改而不产生合并提交。',
    whenRebase3: '提交 PR 之前——经过 rebase 的干净提交更容易审查。',
    whenRebase4: '清理本地提交——交互式 rebase 让你在分享之前压缩、重排和编辑提交。',
    interactiveTitle: '交互式 Rebase：压缩、修正、重排',
    interactiveDesc: '交互式 rebase（git rebase -i）是 Git 最强大的功能之一。它允许你在分享前修改提交。',
    goldenRuleTitle: '黄金法则：永远不要 Rebase 公共分支',
    goldenRuleDesc: '如果分支已推送且其他人正在使用它，不要 rebase。Rebase 会重写提交哈希，其他开发者将面临分叉的历史和痛苦的合并冲突。',
    goldenRule: '黄金法则：只 rebase 没有推送到共享远程仓库的提交，或只有你自己在使用的分支。',
    comparisonTitle: 'Merge vs Rebase：完整对比',
    workflowsTitle: '常见 Git 工作流',
    workflow1Title: '功能分支工作流',
    workflow1Desc: '创建功能分支，开发，rebase 到 main，然后用 --no-ff 合并。这提供了带有清晰合并点的线性历史。',
    workflow2Title: 'Gitflow 工作流',
    workflow2Desc: '使用 develop、feature、release 和 hotfix 分支。长期分支之间始终 merge（不要 rebase）。',
    workflow3Title: '主干开发',
    workflow3Desc: '短期功能分支（< 1 天）。频繁 rebase 到 main，快速合并。高效团队的首选。',
    dangersTitle: '危险场景',
    faqTitle: '常见问题',
    faq1q: '可以撤销 rebase 吗？',
    faq1a: '可以。使用 git reflog 找到 rebase 前的提交哈希，然后用 git reset --hard <hash> 恢复。reflog 默认保留所有 HEAD 移动记录 90 天。',
    faq2q: '更新功能分支时应该 rebase 还是 merge？',
    faq2a: '如果只有你一个人在功能分支上工作，rebase 更好，历史更干净。如果其他人也在使用该分支，用 merge 避免重写共享历史。',
    faq3q: '什么是 git pull --rebase？',
    faq3a: 'git pull --rebase 将你的本地提交重放到远程更改之上，而不是创建合并提交。它保持历史线性。',
    faq4q: '如果 rebase 了已推送的分支会怎样？',
    faq4a: '你需要强制推送（git push --force-with-lease）。已拉取旧提交的人将面临分叉历史。这就是为什么只应 rebase 你独自工作的分支。',
    faq5q: 'squash merge 和 rebase + squash 一样吗？',
    faq5a: '结果类似，机制不同。GitHub 的 "Squash and merge" 按钮将所有提交压缩为一个并创建合并提交。Rebase -i 的 squash 让你选择压缩哪些提交，控制力更强。',
    faq6q: '开源贡献应该用哪个？',
    faq6a: '大多数开源项目倾向于经过 rebase 的干净提交。提交 PR 前，rebase 到最新 main 并压缩修正提交。',
    criteria: '标准',
    merge: 'Merge',
    rebase: 'Rebase',
    scenario: '场景',
    risk: '风险',
    prevention: '预防',
  },
  ja: {
    title: 'Git Rebase vs Merge：どちらをいつ使うべきか',
    intro: 'rebase と merge の議論はGitワークフローで最も一般的なものの1つです。両コマンドはあるブランチの変更を別のブランチに統合しますが、根本的に異なる方法で行います。それぞれをいつ使用するかを理解することが、クリーンなプロジェクト履歴の維持に不可欠です。',
    mergeTitle: 'Git Merge の仕組み',
    mergeDesc: 'Git merge は両ブランチの履歴を結びつける新しい「マージコミット」を作成します。完全な履歴とコミットの時系列を保持します。',
    mergeHow: 'git merge feature を実行すると、Gitは共通の祖先を見つけ、両方の変更を組み合わせた新しいコミットを作成します。',
    rebaseTitle: 'Git Rebase の仕組み',
    rebaseDesc: 'Git rebase はコミットを別のブランチの上に移動（「リプレイ」）します。コミット履歴を書き換えて線形のシーケンスを作ります。',
    rebaseHow: 'feature ブランチで git rebase main を実行すると、各コミットを一時的に外し、mainの最新に合わせ、コミットを1つずつ上に再適用します。',
    visualTitle: 'ビジュアル比較',
    whenMergeTitle: 'Merge を使うべき場面',
    whenMerge1: '公開/共有ブランチ——Mergeは履歴を書き換えないので安全。',
    whenMerge2: 'コンテキストの保持——マージコミットが統合タイミングを示す。',
    whenMerge3: 'チームコラボレーション——複数人が同じブランチで作業する場合。',
    whenMerge4: 'リリースブランチ——正確な統合ポイントを保持。',
    whenRebaseTitle: 'Rebase を使うべき場面',
    whenRebase1: 'featureブランチ（mainへマージ前）——クリーンな線形履歴を作成。',
    whenRebase2: '最新状態の維持——マージコミットなしで新しい変更を取得。',
    whenRebase3: 'PR送信前——リベース済みのクリーンなコミットはレビューしやすい。',
    whenRebase4: 'ローカルコミットの整理——インタラクティブリベースで圧縮・並べ替え・編集。',
    interactiveTitle: 'インタラクティブRebase：squash、fixup、並べ替え',
    interactiveDesc: 'インタラクティブrebase（git rebase -i）はGitで最も強力な機能の1つです。',
    goldenRuleTitle: 'ゴールデンルール：公開ブランチは絶対にRebaseしない',
    goldenRuleDesc: 'プッシュ済みで他の人が使っているブランチをrebaseしてはいけません。コミットハッシュが変わり、他の開発者が困ります。',
    goldenRule: 'ゴールデンルール：共有リモートにプッシュされていないコミット、または自分だけが作業しているブランチのみrebaseする。',
    comparisonTitle: 'Merge vs Rebase：完全比較',
    workflowsTitle: '一般的なGitワークフロー',
    workflow1Title: 'フィーチャーブランチワークフロー',
    workflow1Desc: 'featureブランチを作成→開発→mainにrebase→--no-ffでマージ。',
    workflow2Title: 'Gitflowワークフロー',
    workflow2Desc: 'develop、feature、release、hotfixブランチを使用。長寿命ブランチ間は常にmerge。',
    workflow3Title: 'トランクベース開発',
    workflow3Desc: '短命なfeatureブランチ（1日以内）。頻繁にrebase、素早くマージ。',
    dangersTitle: '危険なシナリオ',
    faqTitle: 'よくある質問',
    faq1q: 'rebaseを元に戻せますか？',
    faq1a: 'はい。git reflogでrebase前のコミットハッシュを見つけ、git reset --hardで復元できます。',
    faq2q: 'featureブランチの更新にはrebase？merge？',
    faq2a: '自分だけが作業しているならrebase。他の人も使っているならmerge。',
    faq3q: 'git pull --rebaseとは？',
    faq3a: 'マージコミットを作らず、ローカルコミットをリモート変更の上にリプレイします。',
    faq4q: 'プッシュ済みブランチをrebaseするとどうなる？',
    faq4a: 'force pushが必要になります。旧コミットを取得済みの人は問題に直面します。',
    faq5q: 'squash mergeとrebase + squashは同じ？',
    faq5a: '結果は似ていますが仕組みが違います。GitHubのsquash mergeは全コミットを1つに。rebase -iは選択的に圧縮できます。',
    faq6q: 'OSSコントリビューションにはどちら？',
    faq6a: 'ほとんどのOSSプロジェクトはリベース済みのクリーンなコミットを好みます。',
    criteria: '基準',
    merge: 'Merge',
    rebase: 'Rebase',
    scenario: 'シナリオ',
    risk: 'リスク',
    prevention: '予防策',
  },
  ko: {
    title: 'Git Rebase vs Merge: 언제 어떤 것을 사용할까',
    intro: 'rebase와 merge 논쟁은 Git 워크플로에서 가장 흔한 논의 중 하나입니다. 두 명령 모두 한 브랜치의 변경사항을 다른 브랜치에 통합하지만, 근본적으로 다른 방식으로 수행합니다. 각각을 언제 사용하는지 이해하는 것이 깨끗한 프로젝트 히스토리 유지에 중요합니다.',
    mergeTitle: 'Git Merge 작동 방식',
    mergeDesc: 'Git merge는 두 브랜치의 히스토리를 연결하는 새로운 "머지 커밋"을 생성합니다.',
    mergeHow: 'git merge feature를 실행하면, Git이 공통 조상을 찾고 두 변경사항을 합친 새 커밋을 만듭니다.',
    rebaseTitle: 'Git Rebase 작동 방식',
    rebaseDesc: 'Git rebase는 커밋을 다른 브랜치 위로 이동("리플레이")합니다. 커밋 히스토리를 다시 써서 선형 시퀀스를 만듭니다.',
    rebaseHow: 'feature 브랜치에서 git rebase main을 실행하면, Git이 각 커밋을 일시적으로 제거하고, main 최신으로 업데이트한 후, 커밋을 하나씩 위에 다시 적용합니다.',
    visualTitle: '시각적 비교',
    whenMergeTitle: 'Merge를 사용할 때',
    whenMerge1: '공개/공유 브랜치 — Merge는 히스토리를 다시 쓰지 않아 안전합니다.',
    whenMerge2: '컨텍스트 보존 — 머지 커밋이 통합 시점을 보여줍니다.',
    whenMerge3: '팀 협업 — 여러 사람이 같은 브랜치에서 작업할 때.',
    whenMerge4: '릴리스 브랜치 — 정확한 통합 지점을 보존합니다.',
    whenRebaseTitle: 'Rebase를 사용할 때',
    whenRebase1: 'Feature 브랜치 (main에 머지 전) — 깨끗한 선형 히스토리를 만듭니다.',
    whenRebase2: '최신 상태 유지 — 머지 커밋 없이 새 변경사항을 가져옵니다.',
    whenRebase3: 'PR 제출 전 — 리베이스된 깨끗한 커밋은 리뷰하기 쉽습니다.',
    whenRebase4: '로컬 커밋 정리 — 인터랙티브 리베이스로 스쿼시, 재정렬, 편집.',
    interactiveTitle: '인터랙티브 Rebase: squash, fixup, 재정렬',
    interactiveDesc: '인터랙티브 rebase(git rebase -i)는 Git에서 가장 강력한 기능 중 하나입니다.',
    goldenRuleTitle: '황금 규칙: 공개 브랜치는 절대 Rebase하지 마세요',
    goldenRuleDesc: '푸시되었고 다른 사람이 사용 중인 브랜치는 rebase하면 안 됩니다.',
    goldenRule: '황금 규칙: 공유 리모트에 푸시되지 않은 커밋, 또는 자신만 작업하는 브랜치만 rebase하세요.',
    comparisonTitle: 'Merge vs Rebase: 완전 비교',
    workflowsTitle: '일반적인 Git 워크플로',
    workflow1Title: 'Feature Branch 워크플로',
    workflow1Desc: 'feature 브랜치 생성 → 개발 → main에 rebase → --no-ff로 머지.',
    workflow2Title: 'Gitflow 워크플로',
    workflow2Desc: 'develop, feature, release, hotfix 브랜치 사용. 장기 브랜치 간에는 항상 merge.',
    workflow3Title: '트렁크 기반 개발',
    workflow3Desc: '짧은 수명의 feature 브랜치 (1일 미만). 자주 rebase, 빠르게 머지.',
    dangersTitle: '위험한 시나리오',
    faqTitle: '자주 묻는 질문',
    faq1q: 'rebase를 되돌릴 수 있나요?',
    faq1a: '네. git reflog으로 rebase 전 커밋 해시를 찾고 git reset --hard로 복원할 수 있습니다.',
    faq2q: 'feature 브랜치 업데이트 시 rebase? merge?',
    faq2a: '혼자 작업하는 브랜치라면 rebase. 다른 사람도 사용 중이라면 merge.',
    faq3q: 'git pull --rebase란?',
    faq3a: '머지 커밋 없이 로컬 커밋을 리모트 변경 위에 리플레이합니다.',
    faq4q: '푸시된 브랜치를 rebase하면?',
    faq4a: 'force push가 필요합니다. 이전 커밋을 받은 사람은 문제가 생깁니다.',
    faq5q: 'squash merge와 rebase + squash는 같은가요?',
    faq5a: '결과는 비슷하지만 메커니즘이 다릅니다.',
    faq6q: '오픈소스 기여에는 어떤 것이 좋나요?',
    faq6a: '대부분의 오픈소스 프로젝트는 리베이스된 깨끗한 커밋을 선호합니다.',
    criteria: '기준',
    merge: 'Merge',
    rebase: 'Rebase',
    scenario: '시나리오',
    risk: '위험',
    prevention: '예방',
  },
  fr: {
    title: 'Git Rebase vs Merge : Quand utiliser chacun',
    intro: 'Le débat rebase vs merge est l\'une des discussions les plus courantes dans les workflows Git. Les deux commandes intègrent les changements d\'une branche dans une autre, mais de manières fondamentalement différentes.',
    mergeTitle: 'Comment fonctionne Git Merge',
    mergeDesc: 'Git merge crée un nouveau "commit de merge" qui lie les historiques des deux branches.',
    mergeHow: 'Git trouve l\'ancêtre commun des deux branches, puis crée un nouveau commit combinant les changements.',
    rebaseTitle: 'Comment fonctionne Git Rebase',
    rebaseDesc: 'Git rebase déplace (ou "rejoue") vos commits au-dessus d\'une autre branche, créant une séquence linéaire.',
    rebaseHow: 'Git retire temporairement vos commits, met à jour la branche, puis réapplique chaque commit un par un.',
    visualTitle: 'Comparaison visuelle',
    whenMergeTitle: 'Quand utiliser Merge',
    whenMerge1: 'Branches publiques/partagées — Merge ne réécrit jamais l\'historique.',
    whenMerge2: 'Préserver le contexte — Le commit de merge montre quand une branche a été intégrée.',
    whenMerge3: 'Collaboration d\'équipe — Quand plusieurs personnes travaillent sur la même branche.',
    whenMerge4: 'Branches de release — Préserve le point d\'intégration exact.',
    whenRebaseTitle: 'Quand utiliser Rebase',
    whenRebase1: 'Branches feature (avant merge dans main) — Crée un historique linéaire propre.',
    whenRebase2: 'Rester à jour — Rebase votre branche feature sur main sans commits de merge.',
    whenRebase3: 'Avant soumission de PR — Des commits propres sont plus faciles à reviewer.',
    whenRebase4: 'Nettoyer les commits locaux — Rebase interactif pour squash, réordonner, éditer.',
    interactiveTitle: 'Rebase interactif : squash, fixup, réordonner',
    interactiveDesc: 'Le rebase interactif (git rebase -i) est l\'une des fonctionnalités les plus puissantes de Git.',
    goldenRuleTitle: 'Règle d\'or : Ne jamais Rebase les branches publiques',
    goldenRuleDesc: 'Si une branche a été poussée et d\'autres y travaillent, NE PAS la rebase.',
    goldenRule: 'Règle d\'or : Ne rebase que les commits non poussés sur un remote partagé.',
    comparisonTitle: 'Merge vs Rebase : Comparaison complète',
    workflowsTitle: 'Workflows Git courants',
    workflow1Title: 'Feature Branch Workflow',
    workflow1Desc: 'Créer branche → développer → rebase sur main → merge avec --no-ff.',
    workflow2Title: 'Gitflow Workflow',
    workflow2Desc: 'Utilise develop, feature, release, hotfix. Toujours merge entre branches longue durée.',
    workflow3Title: 'Trunk-Based Development',
    workflow3Desc: 'Branches feature courtes (< 1 jour). Rebase fréquent, merge rapide.',
    dangersTitle: 'Scénarios dangereux',
    faqTitle: 'Questions fréquemment posées',
    faq1q: 'Peut-on annuler un rebase ?',
    faq1a: 'Oui. Utilisez git reflog pour trouver le hash avant le rebase, puis git reset --hard.',
    faq2q: 'Rebase ou merge pour mettre à jour ma branche feature ?',
    faq2a: 'Seul sur la branche : rebase. Branche partagée : merge.',
    faq3q: 'Qu\'est-ce que git pull --rebase ?',
    faq3a: 'Rejoue vos commits locaux au-dessus des changements distants, sans commit de merge.',
    faq4q: 'Que se passe-t-il si je rebase une branche déjà poussée ?',
    faq4a: 'Vous devrez faire un force push. Les autres auront un historique divergent.',
    faq5q: 'Squash merge = rebase + squash ?',
    faq5a: 'Résultat similaire, mécanisme différent. Le rebase -i offre plus de contrôle.',
    faq6q: 'Lequel pour les contributions open source ?',
    faq6a: 'La plupart des projets open source préfèrent des commits rebasés et propres.',
    criteria: 'Critère',
    merge: 'Merge',
    rebase: 'Rebase',
    scenario: 'Scénario',
    risk: 'Risque',
    prevention: 'Prévention',
  },
  de: {
    title: 'Git Rebase vs Merge: Wann welches verwenden',
    intro: 'Die Rebase-vs-Merge-Debatte ist eine der häufigsten Diskussionen im Git-Workflow. Beide Befehle integrieren Änderungen von einem Branch in einen anderen, aber auf grundlegend unterschiedliche Weise.',
    mergeTitle: 'Wie Git Merge funktioniert',
    mergeDesc: 'Git merge erstellt einen neuen "Merge-Commit", der die Historien beider Branches verbindet.',
    mergeHow: 'Git findet den gemeinsamen Vorfahren und erstellt einen neuen Commit, der die Änderungen beider kombiniert.',
    rebaseTitle: 'Wie Git Rebase funktioniert',
    rebaseDesc: 'Git rebase verschiebt Ihre Commits auf einen anderen Branch und erstellt eine lineare Sequenz.',
    rebaseHow: 'Git entfernt Ihre Commits temporär, aktualisiert den Branch und wendet jeden Commit einzeln wieder an.',
    visualTitle: 'Visueller Vergleich',
    whenMergeTitle: 'Wann Merge verwenden',
    whenMerge1: 'Öffentliche/geteilte Branches — Merge schreibt nie die Historie um.',
    whenMerge2: 'Kontext bewahren — Der Merge-Commit zeigt den Integrationszeitpunkt.',
    whenMerge3: 'Teamarbeit — Wenn mehrere Personen am selben Branch arbeiten.',
    whenMerge4: 'Release-Branches — Bewahrt den genauen Integrationspunkt.',
    whenRebaseTitle: 'Wann Rebase verwenden',
    whenRebase1: 'Feature-Branches (vor dem Merge in main) — Saubere lineare Historie.',
    whenRebase2: 'Aktuell bleiben — Rebase auf main ohne Merge-Commits.',
    whenRebase3: 'Vor PR-Einreichung — Saubere Commits sind leichter zu reviewen.',
    whenRebase4: 'Lokale Commits aufräumen — Interaktives Rebase zum Squashen und Umordnen.',
    interactiveTitle: 'Interaktives Rebase: squash, fixup, umordnen',
    interactiveDesc: 'Interaktives Rebase (git rebase -i) ist eine der mächtigsten Git-Funktionen.',
    goldenRuleTitle: 'Goldene Regel: Öffentliche Branches nie rebasen',
    goldenRuleDesc: 'Wenn ein Branch gepusht wurde und andere daran arbeiten, NICHT rebasen.',
    goldenRule: 'Goldene Regel: Nur Commits rebasen, die nicht auf ein geteiltes Remote gepusht wurden.',
    comparisonTitle: 'Merge vs Rebase: Vollständiger Vergleich',
    workflowsTitle: 'Gängige Git-Workflows',
    workflow1Title: 'Feature Branch Workflow',
    workflow1Desc: 'Feature-Branch erstellen → entwickeln → auf main rebasen → mit --no-ff mergen.',
    workflow2Title: 'Gitflow Workflow',
    workflow2Desc: 'Nutzt develop, feature, release, hotfix. Zwischen langlebigen Branches immer merge.',
    workflow3Title: 'Trunk-Based Development',
    workflow3Desc: 'Kurzlebige Feature-Branches (< 1 Tag). Häufiges Rebase, schnelles Merge.',
    dangersTitle: 'Gefährliche Szenarien',
    faqTitle: 'Häufig gestellte Fragen',
    faq1q: 'Kann man ein Rebase rückgängig machen?',
    faq1a: 'Ja. Mit git reflog den Hash vor dem Rebase finden, dann git reset --hard.',
    faq2q: 'Rebase oder Merge zum Aktualisieren des Feature-Branches?',
    faq2a: 'Allein am Branch: Rebase. Geteilter Branch: Merge.',
    faq3q: 'Was ist git pull --rebase?',
    faq3a: 'Spielt lokale Commits auf den Remote-Änderungen ab, ohne Merge-Commit.',
    faq4q: 'Was passiert beim Rebase eines gepushten Branches?',
    faq4a: 'Force Push wird nötig. Andere haben divergierende Historie.',
    faq5q: 'Ist Squash Merge dasselbe wie Rebase + Squash?',
    faq5a: 'Ähnliches Ergebnis, anderer Mechanismus. Rebase -i bietet mehr Kontrolle.',
    faq6q: 'Welches für Open-Source-Beiträge?',
    faq6a: 'Die meisten Open-Source-Projekte bevorzugen rebasete, saubere Commits.',
    criteria: 'Kriterium',
    merge: 'Merge',
    rebase: 'Rebase',
    scenario: 'Szenario',
    risk: 'Risiko',
    prevention: 'Prävention',
  },
  es: {
    title: 'Git Rebase vs Merge: Cuándo usar cada uno',
    intro: 'El debate rebase vs merge es una de las discusiones más comunes en flujos de trabajo Git. Ambos comandos integran cambios de una rama a otra, pero de formas fundamentalmente diferentes.',
    mergeTitle: 'Cómo funciona Git Merge',
    mergeDesc: 'Git merge crea un nuevo "commit de merge" que une los historiales de ambas ramas.',
    mergeHow: 'Git encuentra el ancestro común y crea un nuevo commit combinando los cambios.',
    rebaseTitle: 'Cómo funciona Git Rebase',
    rebaseDesc: 'Git rebase mueve tus commits encima de otra rama, creando una secuencia lineal.',
    rebaseHow: 'Git remueve temporalmente tus commits, actualiza la rama y reaplicar cada commit uno por uno.',
    visualTitle: 'Comparación visual',
    whenMergeTitle: 'Cuándo usar Merge',
    whenMerge1: 'Ramas públicas/compartidas — Merge nunca reescribe el historial.',
    whenMerge2: 'Preservar contexto — El commit de merge muestra cuándo se integró una rama.',
    whenMerge3: 'Colaboración en equipo — Cuando varias personas trabajan en la misma rama.',
    whenMerge4: 'Ramas de release — Preserva el punto de integración exacto.',
    whenRebaseTitle: 'Cuándo usar Rebase',
    whenRebase1: 'Ramas feature (antes de merge a main) — Historial lineal limpio.',
    whenRebase2: 'Mantenerse actualizado — Rebase tu rama feature sobre main sin commits de merge.',
    whenRebase3: 'Antes de enviar PR — Commits limpios son más fáciles de revisar.',
    whenRebase4: 'Limpiar commits locales — Rebase interactivo para squash, reordenar, editar.',
    interactiveTitle: 'Rebase interactivo: squash, fixup, reordenar',
    interactiveDesc: 'El rebase interactivo (git rebase -i) es una de las funciones más poderosas de Git.',
    goldenRuleTitle: 'Regla de oro: Nunca Rebase ramas públicas',
    goldenRuleDesc: 'Si una rama ha sido pusheada y otros trabajan en ella, NO la rebases.',
    goldenRule: 'Regla de oro: Solo rebasa commits que NO han sido pusheados a un remoto compartido.',
    comparisonTitle: 'Merge vs Rebase: Comparación completa',
    workflowsTitle: 'Flujos de trabajo Git comunes',
    workflow1Title: 'Feature Branch Workflow',
    workflow1Desc: 'Crear rama feature → desarrollar → rebase a main → merge con --no-ff.',
    workflow2Title: 'Gitflow Workflow',
    workflow2Desc: 'Usa develop, feature, release, hotfix. Siempre merge entre ramas de larga duración.',
    workflow3Title: 'Trunk-Based Development',
    workflow3Desc: 'Ramas feature cortas (< 1 día). Rebase frecuente, merge rápido.',
    dangersTitle: 'Escenarios peligrosos',
    faqTitle: 'Preguntas frecuentes',
    faq1q: '¿Se puede deshacer un rebase?',
    faq1a: 'Sí. Usa git reflog para encontrar el hash anterior y git reset --hard para restaurar.',
    faq2q: '¿Rebase o merge para actualizar mi rama feature?',
    faq2a: 'Solo tú en la rama: rebase. Rama compartida: merge.',
    faq3q: '¿Qué es git pull --rebase?',
    faq3a: 'Reproduce tus commits locales sobre los cambios remotos, sin commit de merge.',
    faq4q: '¿Qué pasa si rebaso una rama ya pusheada?',
    faq4a: 'Necesitarás force push. Otros tendrán un historial divergente.',
    faq5q: '¿Squash merge = rebase + squash?',
    faq5a: 'Resultado similar, mecanismo diferente. Rebase -i ofrece más control.',
    faq6q: '¿Cuál para contribuciones open source?',
    faq6a: 'La mayoría de proyectos open source prefieren commits rebasados y limpios.',
    criteria: 'Criterio',
    merge: 'Merge',
    rebase: 'Rebase',
    scenario: 'Escenario',
    risk: 'Riesgo',
    prevention: 'Prevención',
  },
};

export default function GitRebaseVsMerge({ lang }: { lang: string }) {
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

      {/* How Merge Works */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.mergeTitle}</h2>
      <p className="mb-4">{t.mergeDesc}</p>
      <p className="mb-4">{t.mergeHow}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`          A---B---C  feature
         /         \\
    D---E---F---G---H  main (merge commit)

$ git checkout main
$ git merge feature`}</code></pre>

      {/* How Rebase Works */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.rebaseTitle}</h2>
      <p className="mb-4">{t.rebaseDesc}</p>
      <p className="mb-4">{t.rebaseHow}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`Before rebase:
          A---B---C  feature
         /
    D---E---F---G  main

After rebase:
                    A'--B'--C'  feature
                   /
    D---E---F---G  main

$ git checkout feature
$ git rebase main`}</code></pre>

      {/* Visual Comparison */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.visualTitle}</h2>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`╔═══════════════════════════════════════════╗
║              MERGE RESULT                 ║
║                                           ║
║    D---E---F---G---H  main                ║
║         \\       /                          ║
║          A---B---C  feature               ║
║                                           ║
║  ✓ Preserves all commits                  ║
║  ✓ Shows merge point                      ║
║  ✗ Non-linear history                     ║
╚═══════════════════════════════════════════╝

╔═══════════════════════════════════════════╗
║              REBASE RESULT                ║
║                                           ║
║    D---E---F---G---A'--B'--C'  main       ║
║                                           ║
║  ✓ Clean linear history                   ║
║  ✓ Easy to read                           ║
║  ✗ Rewrites commit hashes                 ║
╚═══════════════════════════════════════════╝`}</code></pre>

      {/* When to Use Merge */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.whenMergeTitle}</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>{t.whenMerge1}</li>
        <li>{t.whenMerge2}</li>
        <li>{t.whenMerge3}</li>
        <li>{t.whenMerge4}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`# Merge with merge commit (recommended for main)
$ git checkout main
$ git merge --no-ff feature
$ git push origin main`}</code></pre>

      {/* When to Use Rebase */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.whenRebaseTitle}</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>{t.whenRebase1}</li>
        <li>{t.whenRebase2}</li>
        <li>{t.whenRebase3}</li>
        <li>{t.whenRebase4}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`# Update feature branch with latest main
$ git checkout feature
$ git rebase main

# If conflicts occur, resolve them, then:
$ git add .
$ git rebase --continue`}</code></pre>

      {/* Interactive Rebase */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.interactiveTitle}</h2>
      <p className="mb-4">{t.interactiveDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`$ git rebase -i HEAD~4

# Editor opens:
pick a1b2c3d Add user authentication
pick e4f5g6h Fix typo in auth
pick i7j8k9l Add password validation
pick m0n1o2p Fix lint error

# Change to:
pick a1b2c3d Add user authentication
fixup e4f5g6h Fix typo in auth       # merge into previous, discard message
pick i7j8k9l Add password validation
fixup m0n1o2p Fix lint error          # merge into previous, discard message

# Result: 2 clean commits instead of 4

# Commands:
# pick   = use commit as-is
# squash = merge into previous commit, keep message
# fixup  = merge into previous commit, discard message
# reword = use commit but edit message
# drop   = remove commit entirely`}</code></pre>

      {/* Golden Rule */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.goldenRuleTitle}</h2>
      <p className="mb-4">{t.goldenRuleDesc}</p>
      <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
        <p className="font-bold text-red-300">{t.goldenRule}</p>
      </div>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# ❌ DANGEROUS: Rebasing a shared branch
$ git checkout main
$ git rebase feature  # NEVER do this!

# ✅ SAFE: Rebasing your own feature branch
$ git checkout my-feature    # only I work on this
$ git rebase main            # safe!
$ git push --force-with-lease origin my-feature`}</code></pre>

      {/* Comparison Table */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.comparisonTitle}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.criteria}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.merge}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.rebase}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '历史记录' : 'History'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '非线性，保留所有分支' : 'Non-linear, preserves branches'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '线性，整洁' : 'Linear, clean'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '提交哈希' : 'Commit hashes'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '保持不变' : 'Preserved'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '改变（新哈希）' : 'Changed (new hashes)'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '冲突解决' : 'Conflict resolution'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '一次性解决' : 'Once (in merge commit)'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '每个提交可能都要解决' : 'Per commit (may resolve multiple times)'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '可追溯性' : 'Traceability'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '高（合并提交显示上下文）' : 'High (merge commit shows context)'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '中（线性但缺少分支信息）' : 'Medium (linear but no branch info)'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '安全性' : 'Safety'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '安全（不重写历史）' : 'Safe (no history rewrite)'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '有风险（重写历史）' : 'Risky (rewrites history)'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '适合共享分支' : 'For shared branches'}</td><td className="border border-gray-700 px-4 py-2">✅</td><td className="border border-gray-700 px-4 py-2">❌</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '适合个人分支' : 'For personal branches'}</td><td className="border border-gray-700 px-4 py-2">✅</td><td className="border border-gray-700 px-4 py-2">✅</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '可撤销性' : 'Reversibility'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '简单（git revert）' : 'Easy (git revert)'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '较难（需要 reflog）' : 'Harder (requires reflog)'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">git bisect</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '较难（非线性）' : 'Harder (non-linear)'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '更容易（线性历史）' : 'Easier (linear history)'}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Workflows */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.workflowsTitle}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.workflow1Title}</h3>
      <p className="mb-4">{t.workflow1Desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`$ git checkout -b feature/login
# ... develop ...
$ git rebase main              # clean up history
$ git checkout main
$ git merge --no-ff feature/login  # merge with commit
$ git branch -d feature/login`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.workflow2Title}</h3>
      <p className="mb-4">{t.workflow2Desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Always merge between long-lived branches
$ git checkout develop
$ git merge --no-ff feature/login
$ git checkout release/1.0
$ git merge --no-ff develop
$ git checkout main
$ git merge --no-ff release/1.0
$ git tag v1.0`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.workflow3Title}</h3>
      <p className="mb-4">{t.workflow3Desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Short-lived branch, rebase often
$ git checkout -b fix/typo
# ... quick fix ...
$ git rebase main
$ git checkout main
$ git merge fix/typo    # fast-forward
$ git push`}</code></pre>

      {/* Dangerous Scenarios */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.dangersTitle}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.scenario}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.risk}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.prevention}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? 'Rebase main/master' : 'Rebase main/master'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '所有人的历史都被破坏' : 'Everyone\'s history breaks'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '永远不要 rebase main' : 'Never rebase main'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? 'Rebase 共享功能分支' : 'Rebase shared feature branch'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '协作者面临分叉历史' : 'Collaborators face divergent history'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '对共享分支使用 merge' : 'Use merge for shared branches'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">git push --force</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '覆盖远程更改' : 'Overwrites remote changes'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '使用 --force-with-lease' : 'Use --force-with-lease instead'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '冲突解决后继续 rebase 出错' : 'Wrong conflict resolution during rebase'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '代码丢失或损坏' : 'Code loss or corruption'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '仔细检查每个冲突，使用 git rebase --abort 重来' : 'Review each conflict, use git rebase --abort to restart'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? 'Rebase 有合并提交的分支' : 'Rebase branch with merge commits'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '合并提交被展平，导致困惑' : 'Merge commits flattened, confusing'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '使用 --rebase-merges 或避免' : 'Use --rebase-merges or avoid'}</td></tr>
          </tbody>
        </table>
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
