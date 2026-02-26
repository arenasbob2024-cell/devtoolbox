'use client';

import Link from 'next/link';

/* -------------------------------------------------------------------------- */
/*  Git Command Generator -- Build Git Commands Visually Online Guide         */
/* -------------------------------------------------------------------------- */

const h2Style: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 48,
  marginBottom: 16,
  color: 'var(--text-primary)',
  lineHeight: 1.3,
};

const h3Style: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  marginTop: 32,
  marginBottom: 12,
  color: 'var(--text-primary)',
  lineHeight: 1.4,
};

const pStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.8,
  color: 'var(--text-secondary)',
  marginBottom: 16,
};

const codeBlockStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  border: '1px solid var(--border-color)',
  borderRadius: 8,
  padding: '16px 20px',
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.8,
  marginBottom: 20,
};

const inlineCodeStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: 14,
  fontFamily: 'monospace',
  color: 'var(--accent-blue)',
  fontWeight: 600,
};

const thStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  border: '1px solid var(--border-color)',
  padding: '10px 14px',
  textAlign: 'left',
  fontWeight: 700,
  fontSize: 14,
};

const tdStyle: React.CSSProperties = {
  border: '1px solid var(--border-color)',
  padding: '10px 14px',
  fontSize: 13,
};

const tldrBoxStyle: React.CSSProperties = {
  background: '#f0f9ff',
  border: '2px solid #bae6fd',
  borderRadius: 12,
  padding: '20px 24px',
  marginBottom: 32,
};

const keyTakeawaysStyle: React.CSSProperties = {
  background: '#f8fafc',
  borderRadius: 12,
  padding: '20px 24px',
  marginBottom: 32,
  border: '1px solid #e2e8f0',
};

const ulStyle: React.CSSProperties = {
  paddingLeft: 24,
  marginBottom: 16,
  lineHeight: 1.9,
  fontSize: 15,
};

const linkStyle: React.CSSProperties = {
  color: 'var(--accent-blue)',
  fontWeight: 600,
  textDecoration: 'none',
};

const tipBoxStyle: React.CSSProperties = {
  background: '#fffbeb',
  border: '1px solid #fde68a',
  borderRadius: 8,
  padding: '14px 18px',
  marginBottom: 20,
  fontSize: 14,
  lineHeight: 1.7,
};

const warningBoxStyle: React.CSSProperties = {
  background: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: 8,
  padding: '14px 18px',
  marginBottom: 20,
  fontSize: 14,
  lineHeight: 1.7,
};

export default function GitCommandGeneratorOnlineGuide({ lang }: { lang: string }) {
  return (
    <>
      {/* ---- TL;DR Box ---- */}
      <div style={tldrBoxStyle}>
        <strong style={{ fontSize: 17 }}>TL;DR</strong>
        <p style={{ ...pStyle, marginBottom: 0, marginTop: 8 }}>
          The <Link href={`/${lang}/tools/git-command-generator`} style={linkStyle}>Git Command Generator</Link> lets
          you build complex Git commands visually -- no memorization required.  Pick an operation (commit, branch,
          merge, rebase, stash, cherry-pick, reset, log, etc.), set flags through a point-and-click interface, and
          copy the resulting command in one click.  Below you will find a comprehensive reference covering every
          essential Git command category, collaboration workflows, and productivity tips that pair perfectly with the
          generator.
        </p>
      </div>

      {/* ---- Key Takeaways ---- */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ fontSize: 17, display: 'block', marginBottom: 10 }}>Key Takeaways</strong>
        <ul style={{ ...ulStyle, marginBottom: 0 }}>
          <li>A visual Git command builder eliminates syntax errors and speeds up complex operations like interactive rebase, cherry-pick ranges, and advanced log formatting.</li>
          <li>Understanding the staging area, HEAD, refs, and the reflog is fundamental to mastering any git commands list.</li>
          <li>Branching strategies (feature-branch, trunk-based, GitFlow) determine how teams collaborate and ship code safely.</li>
          <li>Git hooks automate quality checks (linting, testing, commit message validation) before code ever reaches a remote.</li>
          <li>Worktrees let you work on multiple branches simultaneously without stashing or switching context.</li>
          <li>Git aliases and custom log formats turn repetitive multi-flag commands into one-word shortcuts.</li>
        </ul>
      </div>

      {/* ================================================================== */}
      {/*  Section 1 -- Essential Git Commands                                */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Essential Git Commands Every Developer Should Know</h2>
      <p style={pStyle}>
        Whether you are onboarding at a new company or contributing to open-source for the first time, a solid
        understanding of the core git commands is non-negotiable.  The list below covers daily operations that make
        up roughly 90% of every developer&#39;s workflow.
      </p>

      <h3 style={h3Style}>Repository Initialization and Cloning</h3>
      <pre style={codeBlockStyle}><code>{`# Create a brand-new repo in the current directory
git init

# Clone a remote repository (HTTPS)
git clone https://github.com/user/repo.git

# Clone only the latest commit -- great for CI
git clone --depth 1 https://github.com/user/repo.git

# Clone a specific branch
git clone -b develop --single-branch https://github.com/user/repo.git`}</code></pre>

      <h3 style={h3Style}>Staging, Committing, and Status</h3>
      <p style={pStyle}>
        The staging area (also called the index) is Git&#39;s unique middle ground between the working directory and
        the repository.  Learning to stage selectively is one of the fastest ways to write cleaner history.
      </p>
      <pre style={codeBlockStyle}><code>{`# Check working directory status
git status
git status -s          # short format

# Stage specific files
git add file.txt
git add src/ tests/    # stage entire directories

# Stage all changes (tracked + untracked)
git add -A

# Interactive staging -- choose hunks within a file
git add -p file.txt

# Commit with message
git commit -m "feat: add user authentication"

# Commit all tracked changes (skip staging)
git commit -am "fix: correct typo in README"

# Amend the last commit (message or content)
git commit --amend -m "feat: add user authentication with OAuth"

# Amend without changing the message
git commit --amend --no-edit`}</code></pre>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> Use the <Link href={`/${lang}/tools/git-command-generator`} style={linkStyle}>Git Command
        Generator</Link> to visually compose these commands with all the right flags -- no copy-paste from Stack
        Overflow needed.
      </div>

      <h3 style={h3Style}>Viewing History and Diffing</h3>
      <pre style={codeBlockStyle}><code>{`# Compact one-line log with graph
git log --oneline --graph --decorate --all

# Filter by author or date
git log --author="alice" --since="2026-01-01"

# Search commit messages
git log --grep="authentication"

# Custom pretty format
git log --pretty=format:"%h %ad | %s%d [%an]" --date=short

# Diff staged changes vs last commit
git diff --staged

# Compare two branches (file names only)
git diff --name-only main..HEAD`}</code></pre>

      {/* ================================================================== */}
      {/*  Section 2 -- Branching and Merging                                 */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Branching and Merging -- The Heart of Collaboration</h2>
      <p style={pStyle}>
        Branches are cheap in Git -- they are simply pointers to commits.  Mastering branch operations is essential
        for parallel development and clean code integration.
      </p>

      <h3 style={h3Style}>Branch Management</h3>
      <pre style={codeBlockStyle}><code>{`# List all branches (local + remote)
git branch -a

# Create and switch to a new branch
git switch -c feature/login

# Rename current branch
git branch -m new-name

# Delete a merged / unmerged branch
git branch -d feature/login   # safe delete
git branch -D feature/login   # force delete

# Track a remote branch locally
git checkout --track origin/develop`}</code></pre>

      <h3 style={h3Style}>Merging Strategies</h3>
      <p style={pStyle}>
        Git offers several merge strategies.  The right one depends on whether you want to preserve full history,
        create a clean linear history, or squash a feature into a single commit.
      </p>
      <pre style={codeBlockStyle}><code>{`# Fast-forward merge (no merge commit if possible)
git merge feature/login

# Force a merge commit even if fast-forward is possible
git merge --no-ff feature/login

# Squash all feature commits into one
git merge --squash feature/login
git commit -m "feat: implement login flow"

# Abort a merge in progress
git merge --abort

# Use ours/theirs strategy for conflict resolution
git merge -X ours feature/login
git merge -X theirs feature/login`}</code></pre>

      <div style={tipBoxStyle}>
        <strong>Best practice:</strong> Use <span style={inlineCodeStyle}>--no-ff</span> merges on shared branches
        so the feature boundary is always visible in the graph.
      </div>

      <p style={pStyle}>
        When merge conflicts arise, Git marks conflicting sections with <span style={inlineCodeStyle}>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span> / <span style={inlineCodeStyle}>=======</span> / <span style={inlineCodeStyle}>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</span> markers.
        Resolve them manually or with <span style={inlineCodeStyle}>git mergetool</span>, then <span style={inlineCodeStyle}>git add</span> the
        resolved files and commit.
      </p>

      {/* ================================================================== */}
      {/*  Section 3 -- Rebasing                                              */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Rebasing -- Rewriting History for a Clean Timeline</h2>
      <p style={pStyle}>
        Where <span style={inlineCodeStyle}>git merge</span> preserves the complete branching history,
        <span style={inlineCodeStyle}> git rebase</span> replays your commits on top of another branch to create
        a linear sequence.  The result is a cleaner, easier-to-read log.
      </p>

      <h3 style={h3Style}>Standard Rebase</h3>
      <pre style={codeBlockStyle}><code>{`# Rebase current branch onto main
git rebase main

# Rebase onto a specific commit
git rebase --onto main feature/base feature/child

# Continue after resolving conflicts
git rebase --continue

# Skip the current commit during rebase
git rebase --skip

# Abort the entire rebase
git rebase --abort`}</code></pre>

      <h3 style={h3Style}>Interactive Rebase</h3>
      <p style={pStyle}>
        Interactive rebase (<span style={inlineCodeStyle}>git rebase -i</span>) lets you rewrite, reorder, squash,
        or drop commits.  It is the single most powerful history-editing tool in Git.
      </p>
      <pre style={codeBlockStyle}><code>{`# Interactive rebase for the last 5 commits
git rebase -i HEAD~5

# Available commands in the interactive editor:
# pick   = keep commit as-is
# reword = keep commit but edit message
# edit   = pause to amend the commit
# squash = meld into previous commit (keep message)
# fixup  = meld into previous commit (discard message)
# drop   = remove the commit entirely

# Autosquash: automatically reorder fixup! and squash! commits
git rebase -i --autosquash HEAD~10`}</code></pre>

      <div style={warningBoxStyle}>
        <strong>Warning:</strong> Never rebase commits that have already been pushed to a shared branch.  Rebasing
        rewrites commit hashes, which forces everyone else to reconcile divergent histories.
      </div>

      {/* ================================================================== */}
      {/*  Section 4 -- Cherry-Pick                                           */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Cherry-Pick -- Surgical Commit Transplants</h2>
      <p style={pStyle}>
        <span style={inlineCodeStyle}>git cherry-pick</span> copies individual commits from one branch to another.
        It is ideal for back-porting hotfixes or selectively pulling in work without merging an entire branch.
      </p>
      <pre style={codeBlockStyle}><code>{`# Cherry-pick a single commit
git cherry-pick abc1234

# Cherry-pick without committing (stage only)
git cherry-pick --no-commit abc1234

# Cherry-pick a range of commits
git cherry-pick abc1234..def5678

# Cherry-pick from another branch by commit hash
git cherry-pick feature/payments~3

# Abort a cherry-pick in progress
git cherry-pick --abort

# Continue after resolving conflicts
git cherry-pick --continue`}</code></pre>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr>
            <th style={thStyle}>Scenario</th>
            <th style={thStyle}>Command</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Backport a hotfix to release branch</td><td style={tdStyle}><code style={inlineCodeStyle}>git cherry-pick &lt;hotfix-sha&gt;</code></td></tr>
          <tr><td style={tdStyle}>Pull single feature commit to main</td><td style={tdStyle}><code style={inlineCodeStyle}>git cherry-pick --no-commit &lt;sha&gt;</code></td></tr>
          <tr><td style={tdStyle}>Apply a range of commits</td><td style={tdStyle}><code style={inlineCodeStyle}>git cherry-pick A..B</code></td></tr>
        </tbody>
      </table>

      {/* ================================================================== */}
      {/*  Section 5 -- Stash                                                 */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Git Stash -- Shelving Work in Progress</h2>
      <p style={pStyle}>
        When you need to switch branches but are not ready to commit, <span style={inlineCodeStyle}>git stash</span> saves
        your uncommitted changes to a temporary stack.
      </p>
      <pre style={codeBlockStyle}><code>{`# Stash with a descriptive message
git stash push -m "WIP: refactoring auth module"

# Stash including untracked files
git stash -u

# List all stashes
git stash list

# Apply and remove from stack
git stash pop

# Apply a specific stash (keep in stack)
git stash apply stash@{2}

# Show diff of a stash
git stash show -p stash@{0}

# Create a branch from a stash
git stash branch new-feature stash@{1}

# Clear all stashes
git stash clear`}</code></pre>

      {/* ================================================================== */}
      {/*  Section 6 -- Reset vs Revert                                       */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Reset vs Revert -- Undoing Changes the Right Way</h2>
      <p style={pStyle}>
        Both <span style={inlineCodeStyle}>git reset</span> and <span style={inlineCodeStyle}>git revert</span> undo
        changes, but they operate very differently. Understanding which to use is critical, especially on shared
        branches.
      </p>

      <h3 style={h3Style}>git reset -- Moving HEAD Backward</h3>
      <pre style={codeBlockStyle}><code>{`git reset --soft HEAD~1    # uncommit, keep staged
git reset HEAD~1           # uncommit + unstage (default)
git reset --hard HEAD~1    # discard everything
git restore --staged file  # unstage a single file`}</code></pre>

      <h3 style={h3Style}>git revert -- Safe History Undo</h3>
      <pre style={codeBlockStyle}><code>{`git revert abc1234                  # undo commit (new commit)
git revert --no-commit abc1234      # stage undo without committing
git revert -m 1 <merge-commit-sha>  # revert a merge commit`}</code></pre>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr>
            <th style={thStyle}>Aspect</th>
            <th style={thStyle}>git reset</th>
            <th style={thStyle}>git revert</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>History modification</td><td style={tdStyle}>Rewrites history</td><td style={tdStyle}>Preserves history</td></tr>
          <tr><td style={tdStyle}>Safe for shared branches</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes</td></tr>
          <tr><td style={tdStyle}>Creates new commit</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes</td></tr>
          <tr><td style={tdStyle}>Use case</td><td style={tdStyle}>Local cleanup</td><td style={tdStyle}>Undo on public branches</td></tr>
        </tbody>
      </table>

      {/* ================================================================== */}
      {/*  Section 7 -- Git Log Formatting                                    */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Git Log Formatting -- Custom Output for Every Workflow</h2>
      <p style={pStyle}>
        The <span style={inlineCodeStyle}>--pretty=format</span> flag unlocks a mini template language.  Key
        placeholders: <span style={inlineCodeStyle}>%h</span> (short hash), <span style={inlineCodeStyle}>%an</span> (author),
        <span style={inlineCodeStyle}> %ad</span> (date), <span style={inlineCodeStyle}>%s</span> (subject),
        <span style={inlineCodeStyle}> %d</span> (decorations), <span style={inlineCodeStyle}>%Cgreen/%Creset</span> (colors).
      </p>
      <pre style={codeBlockStyle}><code>{`# Changelog-style
git log --pretty=format:"%Cgreen%h%Creset %s (%Cblue%an%Creset, %ar)"

# JSON output for scripting
git log --pretty=format:'{"hash":"%h","author":"%an","msg":"%s"}' --date=iso

# Only merge commits / only non-merge commits
git log --merges --oneline
git log --no-merges --oneline`}</code></pre>

      {/* ================================================================== */}
      {/*  Section 8 -- Git Aliases                                           */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Git Aliases -- One-Word Shortcuts for Complex Commands</h2>
      <p style={pStyle}>
        Git aliases let you abbreviate any command. They live in <span style={inlineCodeStyle}>~/.gitconfig</span> and
        can save thousands of keystrokes per week.
      </p>
      <p style={pStyle}>
        Define aliases directly in <span style={inlineCodeStyle}>~/.gitconfig</span>:
      </p>
      <pre style={codeBlockStyle}><code>{`[alias]
  co  = checkout
  br  = branch
  ci  = commit
  st  = status
  lg  = log --oneline --graph --decorate --all
  last = log -1 HEAD --stat
  undo = reset --soft HEAD~1
  oops = commit --amend --no-edit
  today = log --since=midnight --oneline
  ds  = diff --staged
  wip = !git add -A && git commit -m "WIP: work in progress"
  cleanup = !git branch --merged main | grep -v main | xargs git branch -d`}</code></pre>

      {/* ================================================================== */}
      {/*  Section 9 -- Interactive Staging                                    */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Interactive Staging -- Craft Precise Commits</h2>
      <p style={pStyle}>
        Interactive staging with <span style={inlineCodeStyle}>git add -p</span> (patch mode) lets you review each
        change hunk by hunk and decide whether to stage it.  This results in atomic, self-contained commits that
        are easier to review and revert.
      </p>
      <pre style={codeBlockStyle}><code>{`# Enter patch mode -- review each hunk
git add -p
# y=stage, n=skip, s=split, e=edit, q=quit

# Interactive staging with full menu
git add -i

# Unstage specific hunks selectively
git reset -p`}</code></pre>
      <p style={pStyle}>
        Pair interactive staging with a visual builder: the <Link href={`/${lang}/tools/git-command-generator`} style={linkStyle}>Git Command Generator</Link> shows
        you every available flag for <span style={inlineCodeStyle}>git add</span> so you never miss an option.
      </p>

      {/* ================================================================== */}
      {/*  Section 10 -- Worktrees                                             */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Git Worktrees -- Multiple Branches, Zero Stashing</h2>
      <p style={pStyle}>
        <span style={inlineCodeStyle}>git worktree</span> lets you check out multiple branches simultaneously in
        separate directories.  This is a game-changer when you need to review a pull request while your feature
        branch has uncommitted work.
      </p>
      <pre style={codeBlockStyle}><code>{`# Add a new worktree for an existing branch
git worktree add ../hotfix hotfix/urgent-fix

# Add a worktree with a new branch
git worktree add -b feature/new-ui ../new-ui main

# List all worktrees
git worktree list

# Remove a worktree
git worktree remove ../hotfix

# Prune stale worktree references
git worktree prune`}</code></pre>

      <div style={tipBoxStyle}>
        <strong>Workflow tip:</strong> Create a directory layout like <span style={inlineCodeStyle}>project-main/</span>,
        <span style={inlineCodeStyle}> project-feature/</span>, and <span style={inlineCodeStyle}>project-review/</span> so
        each worktree has a clear purpose.
      </div>

      {/* ================================================================== */}
      {/*  Section 11 -- Submodules                                            */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Git Submodules -- Managing Dependencies as Repos</h2>
      <p style={pStyle}>
        Submodules let you embed one Git repository inside another.  They are commonly used for shared libraries,
        design systems, or vendored dependencies.
      </p>
      <pre style={codeBlockStyle}><code>{`# Add a submodule
git submodule add https://github.com/lib/shared-utils.git libs/shared

# Clone a repo including its submodules
git clone --recurse-submodules https://github.com/user/repo.git

# Initialize + update after a regular clone
git submodule init && git submodule update

# Update all submodules to latest remote commit
git submodule update --remote --merge

# Remove a submodule completely
git submodule deinit libs/shared
git rm libs/shared`}</code></pre>

      <div style={warningBoxStyle}>
        <strong>Caution:</strong> Submodules add complexity.  For many use cases, package managers (npm, pip, go
        modules) or monorepo tools (Nx, Turborepo) are simpler alternatives.
      </div>

      {/* ================================================================== */}
      {/*  Section 12 -- Git Hooks                                             */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Git Hooks -- Automate Quality Gates</h2>
      <p style={pStyle}>
        Git hooks are scripts that run automatically at specific points in the Git workflow.  They live in
        <span style={inlineCodeStyle}> .git/hooks/</span> and can enforce coding standards, run tests, and validate
        commit messages before code reaches the remote.
      </p>

      <h3 style={h3Style}>Common Client-Side Hooks</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr>
            <th style={thStyle}>Hook</th>
            <th style={thStyle}>When It Runs</th>
            <th style={thStyle}>Common Use</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>pre-commit</code></td><td style={tdStyle}>Before commit is created</td><td style={tdStyle}>Lint, format, type-check</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>prepare-commit-msg</code></td><td style={tdStyle}>After default message generated</td><td style={tdStyle}>Auto-add ticket number</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>commit-msg</code></td><td style={tdStyle}>After user enters message</td><td style={tdStyle}>Validate Conventional Commits</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>pre-push</code></td><td style={tdStyle}>Before push to remote</td><td style={tdStyle}>Run test suite</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>post-merge</code></td><td style={tdStyle}>After a merge completes</td><td style={tdStyle}>Auto-install dependencies</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>post-checkout</code></td><td style={tdStyle}>After checkout / switch</td><td style={tdStyle}>Environment setup</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>Example: pre-commit Hook with Husky</h3>
      <pre style={codeBlockStyle}><code>{`# Install Husky for shareable hooks
npx husky-init && npm install

# Add lint-staged as a pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Validate commit messages (Conventional Commits)
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'`}</code></pre>

      {/* ================================================================== */}
      {/*  Section 13 -- Collaboration Workflows                               */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Collaboration Workflows -- Choosing the Right Strategy</h2>
      <p style={pStyle}>
        How a team organizes branches determines code quality, release cadence, and developer experience.  Here
        are the three most popular approaches.
      </p>

      <h3 style={h3Style}>1. Feature Branch Workflow</h3>
      <p style={pStyle}>
        Every feature or bug fix gets its own branch created from <span style={inlineCodeStyle}>main</span>.
        When the work is complete, a pull request is opened, reviewed, and merged.
      </p>
      <pre style={codeBlockStyle}><code>{`# Create feature branch
git switch -c feature/user-profile

# Work, commit, push
git add .
git commit -m "feat: add user profile page"
git push -u origin feature/user-profile

# After PR approval, merge
git switch main
git pull origin main
git merge --no-ff feature/user-profile
git push origin main
git branch -d feature/user-profile`}</code></pre>

      <h3 style={h3Style}>2. Trunk-Based Development</h3>
      <p style={pStyle}>
        Developers commit directly to <span style={inlineCodeStyle}>main</span> (or use very short-lived branches).
        Feature flags control which code is active in production.  This approach favors continuous integration and
        reduces merge conflicts.
      </p>
      <pre style={codeBlockStyle}><code>{`# Work directly on main with small, frequent commits
git switch main
git pull --rebase origin main
git add .
git commit -m "feat: add profile avatar behind feature flag"
git push origin main`}</code></pre>

      <h3 style={h3Style}>3. GitFlow</h3>
      <p style={pStyle}>
        GitFlow uses dedicated branches for features, releases, and hotfixes.  It is well-suited for projects with
        scheduled releases and multiple supported versions.
      </p>
      <pre style={codeBlockStyle}><code>{`# Feature: branch from develop, merge back
git switch -c feature/payment develop
# ... work ...
git switch develop && git merge --no-ff feature/payment

# Release: branch from develop, merge into main + develop
git switch -c release/1.2.0 develop
git switch main && git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Release 1.2.0"
git switch develop && git merge --no-ff release/1.2.0

# Hotfix: branch from main, merge into main + develop
git switch -c hotfix/fix-crash main
git switch main && git merge --no-ff hotfix/fix-crash
git tag -a v1.2.1 -m "Hotfix 1.2.1"
git switch develop && git merge --no-ff hotfix/fix-crash`}</code></pre>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr>
            <th style={thStyle}>Workflow</th>
            <th style={thStyle}>Best For</th>
            <th style={thStyle}>Merge Style</th>
            <th style={thStyle}>Complexity</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Feature Branch</td><td style={tdStyle}>Most teams</td><td style={tdStyle}>PR-based merge</td><td style={tdStyle}>Low</td></tr>
          <tr><td style={tdStyle}>Trunk-Based</td><td style={tdStyle}>CI/CD-heavy teams</td><td style={tdStyle}>Direct push / short PRs</td><td style={tdStyle}>Low</td></tr>
          <tr><td style={tdStyle}>GitFlow</td><td style={tdStyle}>Scheduled releases</td><td style={tdStyle}>Multiple long-lived branches</td><td style={tdStyle}>High</td></tr>
        </tbody>
      </table>

      {/* ================================================================== */}
      {/*  Section 14 -- Remote Operations                                     */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Remote Operations -- Syncing with the World</h2>
      <pre style={codeBlockStyle}><code>{`# Add a remote
git remote add upstream https://github.com/original/repo.git

# Fetch and prune deleted remote branches
git fetch --prune

# Pull with rebase (cleaner history)
git pull --rebase origin main

# Push and set upstream tracking
git push -u origin feature/login

# Delete a remote branch
git push origin --delete feature/login

# Safe force push (refuses if remote has new commits)
git push --force-with-lease origin feature/login`}</code></pre>

      {/* ================================================================== */}
      {/*  Section 15 -- Tags and Releases                                     */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Tags and Releases</h2>
      <pre style={codeBlockStyle}><code>{`# Create an annotated tag (recommended)
git tag -a v1.0.0 -m "Production release 1.0.0"

# Tag a specific commit
git tag -a v0.9.0 abc1234 -m "Beta release"

# List tags matching a pattern
git tag -l "v1.*"

# Push all tags to remote
git push origin --tags

# Delete a local + remote tag
git tag -d v1.0.0
git push origin --delete v1.0.0`}</code></pre>

      {/* ================================================================== */}
      {/*  Section 16 -- Advanced: Reflog, Bisect, Clean                       */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Advanced Git Commands -- Reflog, Bisect, and Clean</h2>

      <h3 style={h3Style}>git reflog -- Your Safety Net</h3>
      <p style={pStyle}>
        The reflog records every movement of HEAD.  Even after a hard reset or bad rebase, you can recover lost
        commits.
      </p>
      <pre style={codeBlockStyle}><code>{`git reflog                          # view reflog
git switch -c recovered <sha>       # recover a lost commit`}</code></pre>

      <h3 style={h3Style}>git bisect -- Binary Search for Bugs</h3>
      <pre style={codeBlockStyle}><code>{`git bisect start
git bisect bad                      # current commit is broken
git bisect good v1.0.0              # this commit was OK
# Git checks out midpoints -- mark good/bad until culprit found
git bisect reset                    # done

# Automate: run test at each midpoint
git bisect start HEAD v1.0.0
git bisect run npm test`}</code></pre>

      <h3 style={h3Style}>git clean -- Remove Untracked Files</h3>
      <pre style={codeBlockStyle}><code>{`git clean -n    # dry run
git clean -fd   # remove untracked files + directories
git clean -fdX  # also remove ignored files`}</code></pre>

      {/* ================================================================== */}
      {/*  Section 17 -- Complete Git Commands List Table                       */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Git Commands List -- Quick Reference</h2>
      <p style={pStyle}>
        Bookmark this page as your printable git cheat sheet, or generate any command visually with
        the <Link href={`/${lang}/tools/git-command-generator`} style={linkStyle}>Git Command Generator</Link>.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Command</th>
            <th style={thStyle}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Init</td><td style={tdStyle}><code style={inlineCodeStyle}>git init</code></td><td style={tdStyle}>Create new repo</td></tr>
          <tr><td style={tdStyle}>Clone</td><td style={tdStyle}><code style={inlineCodeStyle}>git clone &lt;url&gt;</code></td><td style={tdStyle}>Copy remote repo</td></tr>
          <tr><td style={tdStyle}>Stage</td><td style={tdStyle}><code style={inlineCodeStyle}>git add -A</code></td><td style={tdStyle}>Stage all changes</td></tr>
          <tr><td style={tdStyle}>Commit</td><td style={tdStyle}><code style={inlineCodeStyle}>git commit -m &quot;msg&quot;</code></td><td style={tdStyle}>Record changes</td></tr>
          <tr><td style={tdStyle}>Branch</td><td style={tdStyle}><code style={inlineCodeStyle}>git switch -c &lt;name&gt;</code></td><td style={tdStyle}>Create + switch branch</td></tr>
          <tr><td style={tdStyle}>Merge</td><td style={tdStyle}><code style={inlineCodeStyle}>git merge --no-ff &lt;branch&gt;</code></td><td style={tdStyle}>Merge with commit</td></tr>
          <tr><td style={tdStyle}>Rebase</td><td style={tdStyle}><code style={inlineCodeStyle}>git rebase main</code></td><td style={tdStyle}>Replay on top of main</td></tr>
          <tr><td style={tdStyle}>Stash</td><td style={tdStyle}><code style={inlineCodeStyle}>git stash push -m &quot;msg&quot;</code></td><td style={tdStyle}>Shelve WIP</td></tr>
          <tr><td style={tdStyle}>Cherry-pick</td><td style={tdStyle}><code style={inlineCodeStyle}>git cherry-pick &lt;sha&gt;</code></td><td style={tdStyle}>Copy single commit</td></tr>
          <tr><td style={tdStyle}>Reset</td><td style={tdStyle}><code style={inlineCodeStyle}>git reset --soft HEAD~1</code></td><td style={tdStyle}>Undo commit, keep staged</td></tr>
          <tr><td style={tdStyle}>Revert</td><td style={tdStyle}><code style={inlineCodeStyle}>git revert &lt;sha&gt;</code></td><td style={tdStyle}>Undo commit safely</td></tr>
          <tr><td style={tdStyle}>Tag</td><td style={tdStyle}><code style={inlineCodeStyle}>git tag -a v1.0.0 -m &quot;msg&quot;</code></td><td style={tdStyle}>Mark a release</td></tr>
          <tr><td style={tdStyle}>Worktree</td><td style={tdStyle}><code style={inlineCodeStyle}>git worktree add &lt;path&gt; &lt;branch&gt;</code></td><td style={tdStyle}>Multi-branch checkout</td></tr>
          <tr><td style={tdStyle}>Bisect</td><td style={tdStyle}><code style={inlineCodeStyle}>git bisect start</code></td><td style={tdStyle}>Binary search for bugs</td></tr>
          <tr><td style={tdStyle}>Reflog</td><td style={tdStyle}><code style={inlineCodeStyle}>git reflog</code></td><td style={tdStyle}>Recover lost commits</td></tr>
        </tbody>
      </table>

      {/* ================================================================== */}
      {/*  Section 18 -- Using the Git Command Generator Tool                  */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Using the Git Command Generator Tool</h2>
      <p style={pStyle}>
        Remembering flags and syntax for every git operation is unrealistic.  The
        <Link href={`/${lang}/tools/git-command-generator`} style={linkStyle}> Git Command Generator</Link> on
        DevToolBox solves this by providing a visual interface:
      </p>
      <ul style={ulStyle}>
        <li><strong>Select an operation</strong> -- commit, branch, merge, rebase, stash, cherry-pick, reset, revert, log, tag, remote, and more.</li>
        <li><strong>Configure flags</strong> -- toggle checkboxes and fill in inputs instead of remembering flag names.</li>
        <li><strong>Copy the result</strong> -- the generated command updates in real time.  Click copy and paste it into your terminal.</li>
        <li><strong>Learn while building</strong> -- each flag includes a short description, so you learn Git syntax naturally.</li>
      </ul>
      <p style={pStyle}>
        Whether you are constructing an interactive rebase, formatting a custom log output, or building a
        <span style={inlineCodeStyle}> cherry-pick</span> range, the generator handles the syntax so you can focus
        on the task.
      </p>

      {/* ================================================================== */}
      {/*  FAQ with Schema.org FAQPage JSON-LD                                 */}
      {/* ================================================================== */}

      <h2 style={h2Style}>Frequently Asked Questions</h2>

      <h3 style={h3Style}>What is the difference between git merge and git rebase?</h3>
      <p style={pStyle}>
        <span style={inlineCodeStyle}>git merge</span> joins two branch histories by creating a merge commit,
        preserving the complete branching structure.  <span style={inlineCodeStyle}>git rebase</span> replays your
        commits on top of another branch, producing a linear history without merge commits.  Use merge on shared
        branches for safety; use rebase on local feature branches for cleanliness.
      </p>

      <h3 style={h3Style}>How do I undo the last git commit without losing changes?</h3>
      <p style={pStyle}>
        Run <span style={inlineCodeStyle}>git reset --soft HEAD~1</span>.  This moves HEAD back one commit but
        keeps all changes staged.  If you want to unstage them as well, use <span style={inlineCodeStyle}>git reset HEAD~1</span> (mixed
        mode, the default).  To discard changes entirely,
        use <span style={inlineCodeStyle}>git reset --hard HEAD~1</span> -- but be careful, this is irreversible.
      </p>

      <h3 style={h3Style}>What are the most important git commands for beginners?</h3>
      <p style={pStyle}>
        Start with these ten: <span style={inlineCodeStyle}>git init</span>, <span style={inlineCodeStyle}>git clone</span>,
        <span style={inlineCodeStyle}> git add</span>, <span style={inlineCodeStyle}>git commit</span>,
        <span style={inlineCodeStyle}> git status</span>, <span style={inlineCodeStyle}>git log</span>,
        <span style={inlineCodeStyle}> git branch</span>, <span style={inlineCodeStyle}>git switch</span>,
        <span style={inlineCodeStyle}> git merge</span>, and <span style={inlineCodeStyle}>git push</span>.  These
        cover creating repos, making changes, viewing history, branching, and syncing with remotes.
      </p>

      <h3 style={h3Style}>How do I create a git cheat sheet for my team?</h3>
      <p style={pStyle}>
        Combine the quick reference table above with your team&#39;s specific conventions (branch naming, commit
        message format, merge strategy).  Store it in your project&#39;s <span style={inlineCodeStyle}>CONTRIBUTING.md</span> or
        wiki.  Alternatively, use the <Link href={`/${lang}/tools/git-command-generator`} style={linkStyle}>Git Command
        Generator</Link> as a living, interactive cheat sheet that everyone can bookmark.
      </p>

      <h3 style={h3Style}>When should I use git stash vs creating a WIP commit?</h3>
      <p style={pStyle}>
        Use <span style={inlineCodeStyle}>git stash</span> for quick context switches when you plan to return to
        the same branch shortly.  Create a WIP commit when you want your progress tracked in the branch history
        (you can always squash it later with interactive rebase).  Stashes are local-only and easy to lose; WIP
        commits travel with the branch to the remote.
      </p>

      <h3 style={h3Style}>How does git cherry-pick differ from git merge?</h3>
      <p style={pStyle}>
        <span style={inlineCodeStyle}>git merge</span> brings an entire branch&#39;s changes into the current
        branch.  <span style={inlineCodeStyle}>git cherry-pick</span> copies individual commits by their SHA hash,
        leaving the source branch untouched.  Cherry-pick is best for back-porting specific fixes; merge is best
        for integrating complete features.
      </p>

      <h3 style={h3Style}>What is git reflog and how does it save me?</h3>
      <p style={pStyle}>
        <span style={inlineCodeStyle}>git reflog</span> is a local log of every position HEAD has pointed to.
        Even after a hard reset, force push, or bad rebase, you can find the SHA of the state you want and check
        it out.  Think of it as Git&#39;s undo history -- it records actions that <span style={inlineCodeStyle}>git log</span> does
        not track, like branch deletions and rebases.
      </p>

      {/* ---- FAQPage JSON-LD ---- */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the difference between git merge and git rebase?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'git merge joins two branch histories by creating a merge commit, preserving the complete branching structure. git rebase replays your commits on top of another branch, producing a linear history without merge commits. Use merge on shared branches for safety; use rebase on local feature branches for cleanliness.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I undo the last git commit without losing changes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Run git reset --soft HEAD~1. This moves HEAD back one commit but keeps all changes staged. If you want to unstage them as well, use git reset HEAD~1 (mixed mode). To discard changes entirely, use git reset --hard HEAD~1.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the most important git commands for beginners?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start with these ten: git init, git clone, git add, git commit, git status, git log, git branch, git switch, git merge, and git push. These cover creating repos, making changes, viewing history, branching, and syncing with remotes.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I create a git cheat sheet for my team?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Combine the quick reference table with your team-specific conventions (branch naming, commit message format, merge strategy). Store it in CONTRIBUTING.md or your project wiki. Alternatively, use the Git Command Generator as a living, interactive cheat sheet.',
                },
              },
              {
                '@type': 'Question',
                name: 'When should I use git stash vs creating a WIP commit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Use git stash for quick context switches when you plan to return to the same branch shortly. Create a WIP commit when you want progress tracked in branch history. Stashes are local-only and easy to lose; WIP commits travel with the branch to the remote.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does git cherry-pick differ from git merge?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'git merge brings an entire branch\'s changes into the current branch. git cherry-pick copies individual commits by their SHA hash, leaving the source branch untouched. Cherry-pick is best for back-porting specific fixes; merge is best for integrating complete features.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is git reflog and how does it save me?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'git reflog is a local log of every position HEAD has pointed to. Even after a hard reset, force push, or bad rebase, you can find the SHA of the state you want and check it out. It records actions that git log does not track, like branch deletions and rebases.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use the Git Command Generator offline?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Git Command Generator runs entirely in your browser with no server-side processing. Once the page is loaded, you can use it without an active internet connection.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
