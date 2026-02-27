'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Git Advanced Guide: Internals, Interactive Rebase, Hooks, LFS, Worktrees, and Expert Workflows — 2026',
    description:
      'Master advanced Git: object model (blob, tree, commit, tag), packfiles, interactive rebase (squash, fixup, reorder), reflog recovery, cherry-pick strategies, git bisect, merge strategies, hooks with examples, submodules vs subtrees, worktrees, stash, GPG signing, Git LFS, monorepo strategies, and a full workflow comparison (Gitflow vs trunk-based vs GitHub Flow).',
  },
  zh: {
    title: 'Git 高级指南：内部原理、交互式变基、Hooks、LFS、工作树与专家工作流 — 2026',
    description:
      '深入掌握 Git 高级特性：对象模型（blob、tree、commit、tag）、packfile、交互式变基（squash、fixup、reorder）、reflog 恢复、cherry-pick 策略、git bisect、合并策略、hooks 示例、submodule vs subtree、工作树、stash、GPG 签名、Git LFS、Monorepo 策略，以及工作流完整对比（Gitflow vs 主干开发 vs GitHub Flow）。',
  },
};

export default function GitAdvancedGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Git objects and how does the Git object model work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Git stores everything as content-addressed objects in .git/objects. There are four types: blob (stores file content), tree (stores directory listings with file modes and blob/tree SHAs), commit (stores a pointer to a tree, parent commits, author/committer, and message), and tag (stores an annotated pointer to a commit). Every object is identified by the SHA-1 (or SHA-256 in new repos) hash of its type + size + content. This means identical content always produces the same SHA and is stored only once, making Git very space-efficient. You can inspect objects with git cat-file -t <sha> (type) and git cat-file -p <sha> (pretty-print content).',
        },
      },
      {
        '@type': 'Question',
        name: 'How does interactive rebase work and when should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Interactive rebase (git rebase -i <base>) opens an editor listing commits from <base> to HEAD, each prefixed with an action: pick (keep), reword (edit message), edit (pause to amend), squash (combine with previous, merge messages), fixup (combine with previous, discard message), drop (remove), reorder (just move lines). You edit the list, save, and Git replays commits per your instructions. Use it to clean up local commits before opening a pull request: squash WIP commits, fix typos in messages, reorder logical steps. Never interactively rebase commits already pushed to a shared branch.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I recover lost commits using git reflog?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'git reflog shows every movement of HEAD (commits, resets, rebases, checkouts) for the past 90 days. Each entry has a short ref like HEAD@{3}. After an accidental git reset --hard or a botched rebase, find the pre-disaster SHA in the reflog, then run git reset --hard HEAD@{n} or git checkout -b recovery HEAD@{n} to restore it. git reflog show <branch> shows a specific branch\'s history. Reflog is local-only and not pushed to remotes, so it\'s your personal safety net.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is git bisect and how do I use it to find a bug?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'git bisect performs a binary search through commit history to find the commit that introduced a bug. Start with git bisect start, mark the bad commit (git bisect bad HEAD) and a known-good commit (git bisect good v1.0). Git checks out the midpoint commit; you test and mark it good or bad. Git keeps halving the range until it identifies the first bad commit. For automated testing, use git bisect run <script> — the script exits 0 for good, 1 for bad, 125 to skip. This turns an O(n) manual search into O(log n) steps.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the differences between Git submodules and subtrees?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Git submodules link external repositories as a pointer (a SHA commit reference) stored in .gitmodules. Contributors must run git submodule update --init after cloning. Updates to the submodule are explicit (cd into it, commit, then commit the pointer change in the parent). Git subtree (git subtree add/pull/push) copies the external repository content directly into a subdirectory of the parent repo. No extra clone steps are needed; contributors work with a normal repo. Subtree is simpler for contributors but makes the history messier. Submodules are better for strict versioning of large external dependencies.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Git worktrees enable parallel development?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'git worktree add <path> <branch> creates an additional working directory linked to the same repository. Each worktree can be on a different branch simultaneously — no stashing or branch switching needed. This is ideal for reviewing a colleague\'s PR while mid-feature, running a long test suite on main while working on a hotfix, or maintaining a docs branch alongside code. All worktrees share .git and object storage. Remove with git worktree remove <path> and prune stale entries with git worktree prune.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Git LFS and when should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Git LFS (Large File Storage) replaces large binary files (images, videos, datasets, compiled assets) with small pointer files in Git while storing the actual content on a separate LFS server. Without LFS, large binaries bloat the .git directory forever since Git stores full copies of every version. With LFS, install it (git lfs install), track patterns (git lfs track "*.psd"), commit the .gitattributes file, then commit normally. GitHub, GitLab, and Bitbucket all host LFS storage. Use LFS for any file above 50 MB or binary assets that change frequently.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which Git workflow should my team use: Gitflow, trunk-based, or GitHub Flow?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Choose based on release cadence and team size. Gitflow (main + develop + feature/release/hotfix branches) suits teams with scheduled versioned releases and multiple production versions to support (e.g., SaaS with enterprise tiers). GitHub Flow (short-lived feature branches + PR + merge to main + deploy) suits small-to-medium teams shipping continuously from a single main branch. Trunk-Based Development (direct commits to main or very short-lived branches < 2 days, feature flags for incomplete work) suits high-velocity teams with strong CI/CD and automated testing (Google, Netflix model). Most modern web teams do best with GitHub Flow or Trunk-Based Development.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/git-advanced-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', margin: '0 0 0.5rem 0' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          Git is a content-addressable object store. Every file, directory, commit, and tag is a{' '}
          <strong>SHA-hashed object</strong>. Mastering <strong>interactive rebase</strong> cleans
          history before PRs; <strong>reflog</strong> saves you from nearly any disaster;{' '}
          <strong>git bisect</strong> finds bugs in O(log n) steps; <strong>hooks</strong> enforce
          quality gates; <strong>worktrees</strong> enable true parallel branch work; and{' '}
          <strong>Git LFS</strong> keeps large binaries out of your object store. Use our{' '}
          <Link href={'/' + lang + '/tools/git-command-generator'} style={{ color: '#0284c7' }}>
            Git command generator
          </Link>{' '}
          to build complex commands visually.
        </p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b', margin: '0 0 0.75rem 0' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>Git objects (blob, tree, commit, tag) are content-addressed by SHA — identical content is stored once</li>
          <li>Interactive rebase (<code>git rebase -i</code>) rewrites local history — never use on shared branches</li>
          <li><code>git reflog</code> is your 90-day local safety net for recovering from any reset, rebase, or checkout mistake</li>
          <li><code>git bisect run &lt;script&gt;</code> automates bug hunting with binary search — O(log n) steps</li>
          <li>Git hooks (pre-commit, commit-msg, pre-push) enforce linting, tests, and conventions automatically</li>
          <li>Worktrees let you work on multiple branches simultaneously without stashing or switching</li>
          <li>Git LFS replaces large binaries with pointer files — essential for repos with assets &gt; 50 MB</li>
          <li>Choose workflow by release cadence: Gitflow for versioned releases, GitHub Flow for continuous delivery, Trunk-Based for high-velocity CI/CD</li>
        </ul>
      </div>

      {/* ── Section 1: Git Internals ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Git Internals: The Object Model
      </h2>
      <p>
        Understanding Git at the storage level transforms it from a magical version-control system into
        a predictable, debuggable tool. Git is fundamentally a <strong>content-addressable key-value
        store</strong>. Every piece of data — file contents, directory trees, commits, tags — is stored
        as an <em>object</em> identified by the SHA-1 hash of its content.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        The Four Object Types
      </h3>
      <p>
        Git has exactly four object types. Each is stored in <code>.git/objects/</code> as a
        zlib-compressed file named by its 40-character hex SHA.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Inspect any object
git cat-file -t <sha>        # show type: blob | tree | commit | tag
git cat-file -p <sha>        # pretty-print content
git cat-file -s <sha>        # show size in bytes

# 1. BLOB: stores raw file content (no filename, no permissions)
git cat-file -p HEAD:src/index.ts
# → raw TypeScript source

# 2. TREE: stores a directory listing
git cat-file -p HEAD^{tree}
# 100644 blob a1b2c3...  README.md
# 100755 blob d4e5f6...  scripts/deploy.sh
# 040000 tree 7g8h9i...  src

# 3. COMMIT: snapshot + metadata
git cat-file -p HEAD
# tree   7g8h9i...
# parent 0a1b2c...
# author  Alice <alice@example.com> 1700000000 +0000
# committer Alice <alice@example.com> 1700000000 +0000
#
# feat: add user authentication

# 4. TAG: annotated tag (points to a commit)
git cat-file -p v1.0.0
# object 0a1b2c...
# type   commit
# tag    v1.0.0
# tagger Alice <alice@example.com> 1700000000 +0000
#
# Release 1.0.0 - stable auth module`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Refs and the HEAD Pointer
      </h3>
      <p>
        Refs are human-readable names that point to SHA hashes. Branch refs live in{' '}
        <code>.git/refs/heads/</code>, remote-tracking refs in <code>.git/refs/remotes/</code>, and
        tags in <code>.git/refs/tags/</code>. <code>HEAD</code> is a special ref stored in{' '}
        <code>.git/HEAD</code> — it usually contains a <em>symbolic ref</em> (e.g.,{' '}
        <code>ref: refs/heads/main</code>) pointing to the current branch, but in detached HEAD state
        it contains a direct SHA.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Read HEAD directly
cat .git/HEAD
# ref: refs/heads/main

# Read a branch ref
cat .git/refs/heads/main
# a1b2c3d4e5f6...

# List all refs
git show-ref

# Symbolic ref resolution
git symbolic-ref HEAD        # → refs/heads/main
git rev-parse HEAD           # → full SHA

# Relative ref syntax
HEAD~1    # first parent of HEAD
HEAD~3    # three commits back
HEAD^2    # second parent (merge commit)
HEAD@{1}  # previous value of HEAD (reflog)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Packfiles: How Git Compresses History
      </h3>
      <p>
        Initially Git stores each object as a loose file. When you push, clone, or run{' '}
        <code>git gc</code>, Git creates <strong>packfiles</strong> — binary files that store many
        objects together using delta compression (storing the difference between similar objects rather
        than full copies). Packfiles live in <code>.git/objects/pack/</code> as a <code>.pack</code>{' '}
        (data) and <code>.idx</code> (index) pair.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Manually trigger garbage collection + repacking
git gc

# Aggressive repack (maximum compression, slow)
git gc --aggressive

# Inspect packfile contents
git verify-pack -v .git/objects/pack/*.idx | sort -k3 -n | tail -20
# Shows largest objects by uncompressed size

# Count loose objects vs packed
git count-objects -v
# count: 4          (loose objects)
# size: 16          (KB)
# in-pack: 8423     (packed objects)
# packs: 1
# size-pack: 2840   (KB)`}</code></pre>

      {/* ── Section 2: Interactive Rebase ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Interactive Rebase: Squash, Fixup, Reorder, Edit
      </h2>
      <p>
        Interactive rebase is Git&#39;s history-editing power tool. It lets you rewrite any sequence
        of local commits before sharing them, turning messy &quot;WIP&quot; histories into clean,
        reviewable commit chains. The fundamental rule: <strong>only rebase commits you
        haven&#39;t pushed to a shared remote</strong>.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Starting an Interactive Rebase
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Rebase last 4 commits interactively
git rebase -i HEAD~4

# Rebase everything since branching from main
git rebase -i main

# Rebase since a specific commit (not including it)
git rebase -i a1b2c3d

# The editor opens with a list like:
pick 1a2b3c feat: add login form
pick 4d5e6f wip: half-done validation
pick 7g8h9i fix typo in variable name
pick 0a1b2c feat: complete validation logic`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        All Interactive Rebase Commands
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Available actions (replace 'pick' with any of these):
pick    p  # use commit as-is
reword  r  # use commit but edit the commit message
edit    e  # use commit but stop for amending (git commit --amend)
squash  s  # combine with previous commit; merge both messages
fixup   f  # combine with previous commit; discard this message
drop    d  # remove the commit entirely
exec    x  # run a shell command after this commit
break      # pause here (continue with: git rebase --continue)
label   l  # label HEAD with a name
reset   t  # reset HEAD to a label
merge   m  # create a merge commit

# Common patterns:

# 1. Squash 4 WIP commits into 1
pick 1a2b3c feat: start login module
squash 4d5e6f wip: add form component
squash 7g8h9i wip: wire up state
squash 0a1b2c wip: final cleanup

# 2. Fixup a typo commit
pick 1a2b3c feat: add user profile page
fixup 4d5e6f fix typo in prop name

# 3. Reorder commits (just move lines)
pick 7g8h9i refactor: extract validation helper
pick 1a2b3c feat: add login form
pick 4d5e6f feat: add registration form

# 4. Edit a commit mid-rebase
# In editor: change 'pick' to 'edit' for a commit
# Git pauses; make changes, then:
git add -p
git commit --amend
git rebase --continue`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Auto-Squash with --fixup Commits
      </h3>
      <p>
        Create fixup commits during development with <code>git commit --fixup &lt;sha&gt;</code>, then
        use <code>git rebase -i --autosquash</code> to automatically arrange and mark them as{' '}
        <code>fixup</code> for the target commit.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# While developing, create fixup commits
git commit -m "feat: add login form"
# later...
git commit --fixup HEAD   # creates: "fixup! feat: add login form"

# Alternatively, fixup a specific earlier commit
git commit --fixup a1b2c3d

# At cleanup time, autosquash automatically places fixups
git rebase -i --autosquash main

# Enable autosquash by default (optional)
git config --global rebase.autoSquash true`}</code></pre>

      {/* ── Section 3: Git Reflog ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Git Reflog: Recovering Lost Commits
      </h2>
      <p>
        The <strong>reflog</strong> records every time a Git ref (branch, HEAD) is updated — commits,
        resets, rebases, merges, checkouts. It&#39;s your local undo history for Git operations
        themselves, not just file changes. Entries expire after 90 days (configurable) and are never
        pushed to remotes.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# View reflog for HEAD
git reflog
# HEAD@{0}: reset: moving to HEAD~3
# HEAD@{1}: commit: feat: add payment module
# HEAD@{2}: commit: feat: add cart
# HEAD@{3}: checkout: moving from main to feature/auth
# HEAD@{4}: commit: fix: correct email validation

# View reflog for a specific branch
git reflog show feature/auth

# Recover after accidental git reset --hard
git reset --hard HEAD~5   # oops! lost 5 commits
git reflog                # find the SHA before reset
git reset --hard HEAD@{1} # or: git reset --hard <sha>

# Recover a deleted branch
git branch deleted-branch  # accidentally deleted
git reflog                 # find last commit of that branch
git checkout -b deleted-branch HEAD@{3}

# Recover commits after a bad rebase
git rebase main           # rebase went wrong
git reflog                # find HEAD before rebase started
git reset --hard ORIG_HEAD  # Git stores pre-rebase position in ORIG_HEAD`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Configuring Reflog Expiry
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Default expiry values
git config gc.reflogExpire          # 90 days (normal entries)
git config gc.reflogExpireUnreachable  # 30 days (unreachable entries)

# Extend reflog retention (e.g., 1 year)
git config --global gc.reflogExpire 365.days
git config --global gc.reflogExpireUnreachable 90.days

# Never expire reflog (use with caution on large repos)
git config --global gc.reflogExpire never`}</code></pre>

      {/* ── Section 4: Cherry-Pick ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Cherry-Pick Strategies
      </h2>
      <p>
        <code>git cherry-pick</code> applies the changes introduced by one or more commits onto the
        current branch, creating new commits with the same diff but different SHAs. It is ideal for
        backporting fixes to release branches, selectively applying commits without merging entire
        branches, or rescuing commits from abandoned branches.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Cherry-pick a single commit
git cherry-pick a1b2c3d

# Cherry-pick a range of commits (inclusive)
git cherry-pick a1b2c3d..f0e1d2c  # from after a1b2c3d to f0e1d2c
git cherry-pick a1b2c3d^..f0e1d2c # include a1b2c3d itself

# Cherry-pick multiple specific commits
git cherry-pick a1b2c3d e4f5g6h i7j8k9l

# Cherry-pick without committing (stage only)
git cherry-pick --no-commit a1b2c3d
git cherry-pick -n a1b2c3d

# Cherry-pick with a custom commit message
git cherry-pick a1b2c3d
git commit --amend -m "backport: fix null pointer in auth (cherry-picked from a1b2c3d)"

# Resolving cherry-pick conflicts
git cherry-pick a1b2c3d
# CONFLICT: resolve files
git add .
git cherry-pick --continue

# Abort cherry-pick
git cherry-pick --abort

# Backport pattern: applying a fix to multiple release branches
git checkout release/2.1
git cherry-pick a1b2c3d   # apply the fix
git push origin release/2.1

git checkout release/2.0
git cherry-pick a1b2c3d
git push origin release/2.0`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Cherry-Pick vs Merge vs Rebase
      </h3>
      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Operation</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Use Case</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>New SHAs?</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>History Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}><code>cherry-pick</code></td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Apply specific commits across branches</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Yes</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Adds commits to current branch only</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}><code>merge</code></td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Integrate entire branch history</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>No (adds merge commit)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Preserves full branch topology</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}><code>rebase</code></td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Replay branch commits on new base</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Yes</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Linear history, rewrites SHAs</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Section 5: Git Bisect ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Git Bisect: Binary Search for Bugs
      </h2>
      <p>
        <code>git bisect</code> automates the process of finding which commit introduced a regression.
        Instead of manually checking commits one by one (O(n)), bisect uses binary search to find the
        culprit in O(log n) steps. For a repository with 1,000 commits between good and bad, that means
        at most 10 checks instead of 1,000.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Manual bisect session
git bisect start
git bisect bad HEAD        # current commit is broken
git bisect good v2.0.0     # this release was good
# Git checks out a midpoint commit...

# Test the midpoint, then mark it:
git bisect good   # this commit is fine
git bisect bad    # this commit is broken

# Git continues halving the range...
# Eventually: "a1b2c3d is the first bad commit"

# End the session (restore HEAD to original position)
git bisect reset

# ── Automated bisect with a test script ──
# Script must exit 0 = good, 1-127 = bad, 125 = skip
cat > /tmp/test-bug.sh << 'EOF'
#!/bin/bash
npm run build 2>/dev/null && npm test -- --testPathPattern="auth" 2>/dev/null
EOF
chmod +x /tmp/test-bug.sh

git bisect start
git bisect bad HEAD
git bisect good v2.0.0
git bisect run /tmp/test-bug.sh
# Git runs the script at each midpoint automatically

# Skip untestable commits (build failures, etc.)
git bisect skip HEAD

# View bisect log
git bisect log

# Replay a bisect from a saved log
git bisect log > bisect.log
git bisect replay bisect.log`}</code></pre>

      {/* ── Section 6: Advanced Merge Strategies ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Advanced Merge Strategies
      </h2>
      <p>
        Git supports multiple merge strategies and strategy options that control how conflicts are
        resolved. Choosing the right strategy can save significant manual conflict resolution effort.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Specify a strategy: git merge -s <strategy>
git merge -s ort feature/auth         # default (Ostensibly Recursive's Twin)
git merge -s recursive feature/auth   # older default, same concept
git merge -s resolve feature/auth     # two-way merge (simpler, faster)
git merge -s octopus branch1 branch2 branch3  # merge multiple branches at once
git merge -s ours feature/deprecated  # keep our version entirely (ignores theirs)
git merge -s subtree contrib/plugin   # for subtree merges

# Strategy OPTIONS: -X <option>
git merge -X ours feature/auth        # auto-resolve conflicts: prefer our version
git merge -X theirs feature/auth      # auto-resolve conflicts: prefer their version
git merge -X patience feature/auth    # use patience diff algorithm (better for large files)
git merge -X diff-algorithm=histogram # histogram diff (often best for code)
git merge -X ignore-space-change      # ignore whitespace-only changes in conflicts
git merge -X ignore-all-space         # ignore all whitespace
git merge -X no-renames               # do not detect renames during merge

# The 'ours' strategy vs 'ours' option
git merge -s ours feature/deprecated
# Creates a merge commit but discards ALL changes from feature/deprecated
# The result is identical to HEAD — useful to mark a branch as "merged" without taking its changes

git merge -X ours feature/auth
# Uses recursive/ort strategy but auto-resolves all conflicts by keeping OUR version
# Changes from feature/auth that don't conflict ARE still included

# Octopus merge: integrate multiple branches in a single commit
git merge branch-a branch-b branch-c
# Requires no conflicts; good for topic branches with no overlapping files`}</code></pre>

      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Strategy / Option</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Description</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}><code>ort</code> (default)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Improved recursive 3-way merge</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>General purpose, most scenarios</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}><code>octopus</code></td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Merge 3+ branches at once</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Non-conflicting topic branches</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}><code>ours</code> (strategy)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Discard all incoming changes</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Mark deprecated branches as merged</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}><code>-X ours</code></td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Auto-resolve conflicts with our version</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>When our branch is authoritative</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}><code>-X theirs</code></td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Auto-resolve conflicts with their version</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Accepting upstream changes wholesale</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}><code>-X patience</code></td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Better diff for large moved blocks</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Large refactors, moved functions</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Section 7: Git Hooks ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Git Hooks: Automating Quality Gates
      </h2>
      <p>
        Git hooks are scripts in <code>.git/hooks/</code> that Git executes at specific lifecycle
        points. They can be written in any language (bash, Python, Node.js) and enforce policies
        locally before code reaches the server. Unlike CI/CD, hooks run instantly on the developer&#39;s
        machine. Use{' '}
        <strong>Husky</strong> or <strong>Lefthook</strong> to manage hooks as part of your repository
        so they are shared across the team.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Client-Side Hooks
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# .git/hooks/pre-commit — runs before a commit is created
#!/bin/bash
set -e

echo "Running pre-commit checks..."

# 1. Run linter
npx eslint --ext .ts,.tsx src/ || {
  echo "ESLint failed. Fix errors before committing."
  exit 1
}

# 2. Run type check
npx tsc --noEmit || {
  echo "TypeScript errors found. Fix before committing."
  exit 1
}

# 3. Run tests related to staged files
STAGED=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(ts|tsx)$' || true)
if [ -n "$STAGED" ]; then
  npx jest --findRelatedTests $STAGED --passWithNoTests
fi

echo "All pre-commit checks passed!"
exit 0`}</code></pre>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# .git/hooks/commit-msg — validates commit message format
#!/bin/bash
# Enforce Conventional Commits: type(scope): description

COMMIT_MSG_FILE=\$1
COMMIT_MSG=$(cat "\$COMMIT_MSG_FILE")

PATTERN="^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(\\([a-z0-9-]+\\))?(!)?: .{1,72}"

if ! echo "\$COMMIT_MSG" | grep -qE "\$PATTERN"; then
  echo "ERROR: Commit message does not follow Conventional Commits format."
  echo "Expected: type(scope): description"
  echo "Examples:"
  echo "  feat(auth): add OAuth2 login"
  echo "  fix: correct null check in payment service"
  echo "  docs: update API documentation"
  echo ""
  echo "Your message: \$COMMIT_MSG"
  exit 1
fi

exit 0`}</code></pre>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# .git/hooks/pre-push — runs before git push
#!/bin/bash
set -e

REMOTE=\$1
URL=\$2

echo "Running pre-push checks against \$REMOTE (\$URL)..."

# Block pushing to main directly
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "\$CURRENT_BRANCH" = "main" ] && [ "\$REMOTE" = "origin" ]; then
  echo "ERROR: Direct pushes to main are not allowed."
  echo "Please create a feature branch and open a pull request."
  exit 1
fi

# Run full test suite before pushing
npm test -- --ci --coverage || {
  echo "Tests failed. Fix before pushing."
  exit 1
}

echo "Pre-push checks passed!"
exit 0`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Managing Hooks with Husky
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install Husky
npm install --save-dev husky
npx husky init

# .husky/pre-commit
npx lint-staged

# .husky/commit-msg
npx commitlint --edit \$1

# package.json: configure lint-staged
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}

# Install commitlint for conventional commits
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'chore', 'ci', 'build', 'revert'
    ]],
    'subject-max-length': [2, 'always', 72]
  }
};`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Server-Side Hooks
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Server-side hooks (in bare repository on server)
# These run on the remote/server and cannot be bypassed by clients

# pre-receive: runs before any refs are updated
# Receives: old-sha new-sha refname (one per line on stdin)
#!/bin/bash
while read oldrev newrev refname; do
  # Block force pushes to main
  if [ "\$refname" = "refs/heads/main" ]; then
    if git merge-base --is-ancestor "\$newrev" "\$oldrev" 2>/dev/null; then
      echo "ERROR: Force push to main is not allowed."
      exit 1
    fi
  fi
done

# post-receive: runs after refs are updated (for notifications)
#!/bin/bash
# Send Slack notification, trigger CI, update documentation, etc.
while read oldrev newrev refname; do
  branch=\${refname#refs/heads/}
  curl -s -X POST https://hooks.slack.com/... \\
    -d "{\"text\": \"Branch \$branch updated\"}"
done`}</code></pre>

      {/* ── Section 8: Submodules vs Subtrees ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Submodules vs Subtrees
      </h2>
      <p>
        Both submodules and subtrees let you embed one Git repository inside another. They have
        fundamentally different tradeoffs in complexity, contributor experience, and update workflows.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Git Submodules
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Add a submodule
git submodule add https://github.com/org/lib.git vendor/lib

# After cloning a repo with submodules
git clone --recurse-submodules https://github.com/org/project.git
# or for existing clones:
git submodule update --init --recursive

# Update a submodule to its latest remote commit
cd vendor/lib
git checkout main
git pull origin main
cd ../..
git add vendor/lib
git commit -m "chore: update lib submodule to latest"

# Update all submodules at once
git submodule update --remote --merge

# Remove a submodule
git submodule deinit vendor/lib
git rm vendor/lib
rm -rf .git/modules/vendor/lib

# .gitmodules (auto-generated)
[submodule "vendor/lib"]
  path = vendor/lib
  url = https://github.com/org/lib.git
  branch = main`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Git Subtree
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Add a subtree (copies content into your repo)
git subtree add --prefix=vendor/lib \
  https://github.com/org/lib.git main --squash

# Update subtree to latest upstream
git subtree pull --prefix=vendor/lib \
  https://github.com/org/lib.git main --squash

# Push local changes back to upstream (contribute upstream)
git subtree push --prefix=vendor/lib \
  https://github.com/org/lib.git my-feature-branch

# Add remote for easier management
git remote add lib https://github.com/org/lib.git
git subtree add --prefix=vendor/lib lib main --squash
git subtree pull --prefix=vendor/lib lib main --squash`}</code></pre>

      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Aspect</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Submodule</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Subtree</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Storage</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>SHA pointer only</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Full copy in repo</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Clone experience</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Needs --recurse-submodules</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Normal git clone</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Version pinning</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Exact SHA (explicit)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Manual pull required</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Contributing upstream</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Work inside submodule dir</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>git subtree push</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Complexity</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>High (two repos to manage)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Lower (one repo)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Best for</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Strict versioned dependencies</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Simpler contributor workflow</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Section 9: Git Worktrees ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Git Worktrees for Parallel Development
      </h2>
      <p>
        Git worktrees let you check out multiple branches simultaneously in separate directories —
        all sharing the same <code>.git</code> folder and object store. This is the clean solution
        to &quot;I need to review a PR but I&#39;m in the middle of something&quot;, with no stashing,
        no branch switching, and no wasted disk space for object duplication.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Add a new worktree for an existing branch
git worktree add ../project-hotfix hotfix/critical-fix

# Add a worktree and create a new branch
git worktree add -b feature/new-dashboard ../project-dashboard

# Add a worktree for a remote branch
git worktree add ../project-v2 origin/release/v2.0

# List all worktrees
git worktree list
# /home/user/project         a1b2c3d [main]
# /home/user/project-hotfix  d4e5f6g [hotfix/critical-fix]
# /home/user/project-dashboard f7g8h9i [feature/new-dashboard]

# Work in worktrees independently
cd ../project-hotfix
git commit -m "fix: resolve null pointer in payment"
git push origin hotfix/critical-fix

cd ../project-dashboard
# Continue work without affecting hotfix worktree

# Remove a worktree when done
git worktree remove ../project-hotfix

# Prune stale worktree metadata (if directory was manually deleted)
git worktree prune

# Lock a worktree (prevent accidental removal)
git worktree lock ../project-hotfix --reason "CI is running tests here"
git worktree unlock ../project-hotfix`}</code></pre>

      {/* ── Section 10: Advanced Stash ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Git Stash Advanced Usage
      </h2>
      <p>
        <code>git stash</code> saves dirty working directory state to a stack, letting you switch
        context quickly. Beyond the basic <code>stash</code> and <code>stash pop</code>, there are
        many powerful options for partial stashes, naming, and branch creation.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Basic stash (tracked files only)
git stash

# Include untracked files
git stash --include-untracked
git stash -u

# Include untracked AND ignored files
git stash --all

# Stash with a descriptive message
git stash push -m "WIP: half-done auth refactor"

# Stash only specific files (partial stash)
git stash push src/auth/login.ts src/auth/types.ts
git stash push -m "auth changes only" -- src/auth/

# List all stash entries
git stash list
# stash@{0}: WIP on main: a1b2c3d feat: add user profile
# stash@{1}: WIP: half-done auth refactor on feature/auth
# stash@{2}: On main: auth changes only

# Show stash contents
git stash show stash@{1}           # stat view
git stash show -p stash@{1}        # full diff

# Apply without removing from stack
git stash apply stash@{1}

# Apply and remove from stack
git stash pop stash@{1}

# Drop a specific stash
git stash drop stash@{2}

# Clear all stash entries
git stash clear

# Create a branch from stash (apply + new branch)
git stash branch feature/auth-work stash@{0}
# Creates branch, checks it out, applies stash, drops it

# Interactive patch stashing (choose hunks)
git stash push --patch
git stash push -p`}</code></pre>

      {/* ── Section 11: GPG Signing ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Signing Commits with GPG
      </h2>
      <p>
        GPG-signed commits cryptographically verify author identity. GitHub, GitLab, and Bitbucket
        display a &quot;Verified&quot; badge on signed commits. This is particularly important for
        regulated industries, open-source projects, and supply-chain security.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# 1. Generate a GPG key (if you don't have one)
gpg --full-generate-key
# Choose RSA 4096 bit, no expiry for personal use

# 2. List your keys to get the key ID
gpg --list-secret-keys --keyid-format=long
# sec   rsa4096/A1B2C3D4E5F6G7H8 2024-01-01 [SC]
#       LONGFINGERPRINTHERE
# uid   Alice Smith <alice@example.com>

# 3. Configure Git to use your key
git config --global user.signingkey A1B2C3D4E5F6G7H8

# 4. Enable automatic commit signing
git config --global commit.gpgsign true

# 5. Enable tag signing
git config --global tag.gpgsign true

# 6. Sign a single commit manually
git commit -S -m "feat: add payment module"

# 7. Sign an annotated tag
git tag -s v1.0.0 -m "Release 1.0.0"

# 8. Verify a signed commit
git verify-commit HEAD
git log --show-signature -1

# 9. Export public key to add to GitHub/GitLab
gpg --armor --export A1B2C3D4E5F6G7H8
# Copy the output → GitHub Settings → SSH and GPG Keys

# SSH signing (Git 2.34+, simpler alternative to GPG)
git config --global gpg.format ssh
git config --global user.signingkey "~/.ssh/id_ed25519.pub"
git config --global commit.gpgsign true`}</code></pre>

      {/* ── Section 12: Git LFS ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Git LFS for Large Files
      </h2>
      <p>
        <strong>Git LFS</strong> (Large File Storage) stores large binary files outside the Git
        object store, replacing them with small pointer files in the repository. Without LFS, every
        version of every large binary is stored permanently in <code>.git/objects</code>, bloating
        clone times and repo size. With LFS, only the pointer is cloned; actual content is downloaded
        on demand.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# 1. Install Git LFS
git lfs install

# 2. Track file patterns (adds rules to .gitattributes)
git lfs track "*.psd"
git lfs track "*.png"
git lfs track "*.mp4"
git lfs track "*.zip"
git lfs track "models/**"
git lfs track "*.bin" "*.h5" "*.pkl"

# IMPORTANT: commit .gitattributes first
git add .gitattributes
git commit -m "chore: configure Git LFS tracking"

# 3. Use git normally — LFS handles the rest
git add assets/logo.psd
git commit -m "design: update brand logo"
git push origin main

# 4. Inspect LFS-tracked files
git lfs ls-files           # list LFS-tracked files in current revision
git lfs status             # show LFS status of working directory
git lfs env                # show LFS configuration

# 5. Check what .gitattributes patterns are configured
git lfs track

# 6. Download LFS files (if cloned without LFS)
git lfs pull
git lfs fetch --all        # fetch all LFS versions (for mirrors)

# 7. Migrate existing large files to LFS
git lfs migrate import --include="*.psd,*.png" --everything
git push --force --all
git push --force --tags

# 8. Show LFS storage usage
git lfs du

# .gitattributes (auto-generated by git lfs track)
*.psd filter=lfs diff=lfs merge=lfs -text
*.png filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text`}</code></pre>

      {/* ── Section 13: Monorepo Strategies ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Monorepo Strategies with Git
      </h2>
      <p>
        A monorepo stores multiple projects (packages, services, apps) in a single Git repository.
        Companies like Google, Meta, Microsoft, and Airbnb use monorepos. The trade-offs involve
        tooling complexity vs atomic cross-project changes and unified dependency management.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Sparse Checkout for Large Monorepos
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Sparse checkout: check out only the packages you need
git clone --no-checkout https://github.com/org/monorepo.git
cd monorepo
git sparse-checkout init --cone
git sparse-checkout set packages/frontend packages/shared
git checkout main

# Add more packages as needed
git sparse-checkout add packages/api

# List current sparse-checkout paths
git sparse-checkout list

# Disable sparse-checkout (full checkout)
git sparse-checkout disable`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Partial Clone for Bandwidth Efficiency
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Blobless clone: download commits and trees but not blobs
# Blobs are fetched lazily when accessed
git clone --filter=blob:none https://github.com/org/monorepo.git

# Treeless clone: even more aggressive (commits only)
git clone --filter=tree:0 https://github.com/org/monorepo.git

# Combine partial clone with sparse checkout
git clone --filter=blob:none --no-checkout https://github.com/org/monorepo.git
cd monorepo
git sparse-checkout init --cone
git sparse-checkout set packages/frontend
git checkout main`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Monorepo Tooling
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# npm/pnpm/yarn workspaces — package.json
{
  "name": "monorepo-root",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}

# pnpm workspace (pnpm-workspace.yaml)
packages:
  - 'packages/*'
  - 'apps/*'

# Nx monorepo — only rebuild affected projects
npx nx affected:build --base=main
npx nx affected:test --base=HEAD~1

# Turborepo — pipeline-aware caching
# turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
turbo run build --filter=./packages/frontend

# Changesets — versioning and changelogs in monorepos
npx changeset          # create a changeset
npx changeset version  # bump versions
npx changeset publish  # publish to npm`}</code></pre>

      {/* ── Section 14: Git Workflow Comparison ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Git Workflow Comparison: Gitflow vs Trunk-Based vs GitHub Flow
      </h2>
      <p>
        Choosing the right branching workflow has a larger impact on team velocity than almost any
        other engineering process decision. Here is a comprehensive comparison of the three most
        widely used strategies.
      </p>

      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
              <th style={{ padding: '12px 14px', textAlign: 'left', border: '1px solid #334155' }}>Aspect</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', border: '1px solid #334155' }}>Gitflow</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', border: '1px solid #334155' }}>Trunk-Based Dev</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', border: '1px solid #334155' }}>GitHub Flow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>Main branches</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>main + develop</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>main (trunk) only</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>main only</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>Feature branch lifetime</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Days to weeks</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Hours to 2 days max</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Days to 1 week</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>Release cadence</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Scheduled (weekly/monthly)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Continuous (multiple/day)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>On merge (continuous)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>Feature flags needed?</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Optional</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Yes (required)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Sometimes</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>CI/CD requirement</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Moderate</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Very high (must be reliable)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Moderate–High</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>Multiple prod versions?</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Yes (release branches)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>No (single trunk)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>No</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>Team size</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Medium–Large</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Any (Google-scale to startup)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Small–Medium</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>Merge conflicts</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>High (long-lived branches)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Low (short branches)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Low–Moderate</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>Best for</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>SaaS with enterprise tiers, apps with versioned APIs</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Google/Netflix-style continuous deployment</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Most startups and modern SaaS</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>Key risk</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Branch divergence, integration hell</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Requires mature CI/CD and feature flags</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Incomplete features can ship without flags</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        GitHub Flow in Practice
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# GitHub Flow: Simple and effective for most teams
# Rule: main is always deployable

# 1. Create a descriptive feature branch
git checkout main
git pull origin main
git checkout -b feat/user-authentication

# 2. Make small, focused commits
git commit -m "feat: add login form component"
git commit -m "feat: implement JWT token validation"
git commit -m "test: add auth unit tests"

# 3. Push early and open a PR
git push -u origin feat/user-authentication
# Open PR on GitHub → CI runs → code review

# 4. Merge when approved (use squash or merge commit)
# Via GitHub UI: "Squash and merge" or "Create a merge commit"

# 5. Delete the branch and deploy
git checkout main
git pull origin main
git branch -d feat/user-authentication`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Trunk-Based Development in Practice
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Trunk-Based Development: high-frequency, small commits
# Rule: no branch lives more than 2 days

# 1. Pull trunk, create short-lived branch
git checkout main && git pull origin main
git checkout -b feat/add-search-icon  # tiny change

# 2. Commit and push within hours
git add src/components/SearchIcon.tsx
git commit -m "feat: add search icon component"
git push origin feat/add-search-icon
# CI passes → auto-merge to main

# 3. For larger features: use feature flags
// config/features.ts
export const features = {
  newSearchBar: process.env.NEXT_PUBLIC_FF_SEARCH_BAR === 'true',
};

// In component:
import { features } from '@/config/features';
{features.newSearchBar && <NewSearchBar />}

# 4. Commit-to-trunk approach (senior devs)
git checkout main
# ... small change ...
git add src/utils/format.ts
git commit -m "refactor: extract formatDate utility"
git push origin main  # only if CI is green (pre-push hook)`}</code></pre>

      {/* ── Section 15: FAQ ── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Frequently Asked Questions
      </h2>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the difference between git reset --soft, --mixed, and --hard?
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# --soft: moves HEAD only; staging and working tree unchanged
git reset --soft HEAD~1
# Commit is undone; all changes remain staged (green in git status)
# Use to: undo last commit but keep changes ready to re-commit

# --mixed (default): moves HEAD + resets staging; working tree unchanged
git reset HEAD~1
git reset --mixed HEAD~1
# Commit is undone; changes are unstaged (red in git status)
# Use to: unstage files, undo commits while keeping working changes

# --hard: moves HEAD + resets staging + resets working tree
git reset --hard HEAD~1
# DANGER: commit undone AND all working changes are discarded
# Use to: completely discard commits (recoverable via reflog within 90 days)`}</code></pre>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I undo a pushed commit without rewriting history?
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# git revert: creates a NEW commit that undoes the changes
# Safe for shared branches — does not rewrite history

# Revert the last commit
git revert HEAD

# Revert a specific commit
git revert a1b2c3d

# Revert a range of commits (most recent first)
git revert HEAD~3..HEAD

# Revert without auto-committing (stage the undo, review first)
git revert --no-commit HEAD
git revert -n HEAD

# Revert a merge commit (specify which parent to follow)
git revert -m 1 <merge-commit-sha>
# -m 1: keep the mainline (parent 1)
# -m 2: keep the feature branch (parent 2)`}</code></pre>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I clean up stale remote branches?
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Prune deleted remote branches from local tracking refs
git fetch --prune
git fetch -p

# Set as default (fetch always prunes)
git config --global fetch.prune true

# List branches already merged into main
git branch -r --merged main | grep -v "main\|HEAD"

# Delete a remote branch
git push origin --delete feature/old-feature

# Delete local branch
git branch -d feature/old-feature   # safe: fails if unmerged
git branch -D feature/old-feature   # force delete

# Clean up all local branches merged into main
git branch --merged main | grep -v "^\* \|main" | xargs git branch -d`}</code></pre>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I write better commit messages?
      </h3>
      <p>
        Follow the <strong>Conventional Commits</strong> specification and the 7 rules of great commit
        messages:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Conventional Commits format:
# type(scope): description
#
# [optional body]
#
# [optional footer(s)]

# Good examples:
feat(auth): add OAuth2 login with Google
fix(payment): resolve null pointer when card expires
docs(api): update rate limiting documentation
refactor(cache): extract Redis client to dedicated module
perf(images): lazy-load below-fold product images
test(auth): add integration tests for JWT refresh
chore(deps): upgrade Next.js to 15.1.0
ci(actions): add automated security scanning workflow

# 7 Rules of Great Commit Messages:
# 1. Separate subject from body with a blank line
# 2. Limit subject to 72 characters
# 3. Use imperative mood: "add feature" not "added feature"
# 4. Do not end subject with a period
# 5. Wrap body at 100 characters
# 6. Use body to explain WHAT and WHY, not HOW
# 7. Reference issues in footer: "Closes #123"

# Multi-line example:
git commit -m "fix(auth): prevent session fixation on login

Before this fix, the session ID was not regenerated after successful
authentication, leaving users vulnerable to session fixation attacks
where an attacker pre-sets a known session ID.

This commit regenerates the session ID immediately after the user
authenticates, following OWASP recommendation.

Closes #247
Security: CVE-2024-XXXX"`}</code></pre>

      {/* Related Tools */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Related Tools and Guides
      </h2>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
        <li>
          <Link href={'/' + lang + '/tools/git-command-generator'} style={{ color: '#0284c7' }}>
            Git Command Generator — build complex git commands visually
          </Link>
        </li>
        <li>
          <Link href={'/' + lang + '/blog/git-rebase-vs-merge'} style={{ color: '#0284c7' }}>
            Git Rebase vs Merge: When to Use Each Strategy
          </Link>
        </li>
        <li>
          <Link href={'/' + lang + '/blog/git-branching-strategies'} style={{ color: '#0284c7' }}>
            Git Branching Strategies: Gitflow, Trunk-Based, GitHub Flow
          </Link>
        </li>
        <li>
          <Link href={'/' + lang + '/blog/git-cherry-pick-revert-reset-guide'} style={{ color: '#0284c7' }}>
            Git Cherry-Pick, Revert, and Reset Guide
          </Link>
        </li>
        <li>
          <Link href={'/' + lang + '/blog/ci-cd-pipeline-best-practices'} style={{ color: '#0284c7' }}>
            CI/CD Pipeline Best Practices
          </Link>
        </li>
        <li>
          <Link href={'/' + lang + '/blog/github-actions-guide'} style={{ color: '#0284c7' }}>
            GitHub Actions Complete Guide
          </Link>
        </li>
      </ul>
    </article>
  );
}
