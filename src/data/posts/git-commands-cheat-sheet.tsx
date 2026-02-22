'use client';

import Link from 'next/link';

export default function GitCommandsCheatSheet({ lang }: { lang: string }) {
  return (
    <>
      <h2>Why Every Developer Needs a Git Cheat Sheet</h2>
      <p>
        <strong>Git</strong> is the most widely used version control system in the world, powering collaboration for millions of developers on platforms like GitHub, GitLab, and Bitbucket. Whether you are a beginner learning version control for the first time or an experienced developer who needs a quick reference, having a comprehensive <strong>git commands cheat sheet</strong> saves time and prevents mistakes.
      </p>
      <p>
        This guide covers every essential Git command organized by workflow: from initial setup and basic operations to advanced techniques like interactive rebase, cherry-picking, and submodule management. Each command includes real-world examples with the most commonly used flags, so you can copy-paste them directly into your terminal.
      </p>
      <p>
        <Link href={`/${lang}/tools/diff-checker`} style={{ fontWeight: 600 }}>Compare text and code differences with our free Diff Checker tool.</Link>
      </p>

      <h2>Git Setup and Configuration</h2>
      <p>
        Before you start working with Git, configure your identity. Git uses this information to attribute commits to you. These settings are stored in <code>~/.gitconfig</code> globally or in <code>.git/config</code> per repository.
      </p>
      <pre><code className="language-bash">{`# Set your name and email (required for commits)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Set default branch name to main
git config --global init.defaultBranch main

# Enable colored output
git config --global color.ui auto

# Set default editor (for commit messages, rebase, etc.)
git config --global core.editor "code --wait"    # VS Code
git config --global core.editor "vim"             # Vim
git config --global core.editor "nano"            # Nano

# Configure line endings
git config --global core.autocrlf input   # macOS/Linux
git config --global core.autocrlf true    # Windows

# List all configuration settings
git config --list

# Show where a config value is set
git config --list --show-origin`}</code></pre>

      <h2>Creating and Cloning Repositories</h2>
      <p>
        Every Git project starts with <code>git init</code> (new project) or <code>git clone</code> (existing project). Understanding these commands is fundamental to your Git workflow.
      </p>
      <pre><code className="language-bash">{`# Initialize a new repository in the current directory
git init

# Initialize a new repository in a specific directory
git init my-project

# Initialize a bare repository (for servers, no working directory)
git init --bare my-project.git

# Clone a repository
git clone https://github.com/user/repo.git

# Clone into a specific directory
git clone https://github.com/user/repo.git my-folder

# Clone only a specific branch
git clone --branch develop --single-branch https://github.com/user/repo.git

# Shallow clone (only latest commit, faster for large repos)
git clone --depth 1 https://github.com/user/repo.git

# Clone with submodules
git clone --recurse-submodules https://github.com/user/repo.git`}</code></pre>

      <h2>Staging and Committing: The Core Workflow</h2>
      <p>
        The add-commit cycle is the heart of Git. You stage changes with <code>git add</code>, then record them permanently with <code>git commit</code>. Understanding the staging area (index) is crucial for controlling exactly what goes into each commit.
      </p>

      <h3>git add - Stage Changes</h3>
      <pre><code className="language-bash">{`# Stage a specific file
git add filename.js

# Stage multiple files
git add file1.js file2.css file3.html

# Stage all changes in current directory (new, modified, deleted)
git add .

# Stage all changes in entire repository
git add -A

# Stage only modified and deleted files (not new files)
git add -u

# Interactive staging - choose hunks to stage
git add -p

# Stage files matching a pattern
git add "*.js"
git add src/`}</code></pre>

      <h3>git commit - Record Changes</h3>
      <pre><code className="language-bash">{`# Commit staged changes with a message
git commit -m "Add user authentication feature"

# Commit with multi-line message
git commit -m "feat: add user login" -m "Implements JWT-based authentication with refresh tokens"

# Stage all tracked files and commit in one step
git commit -am "Fix typo in header component"

# Amend the last commit (change message or add files)
git commit --amend -m "Updated commit message"

# Amend without changing the message
git commit --amend --no-edit

# Create an empty commit (useful for triggering CI)
git commit --allow-empty -m "Trigger CI pipeline"

# Commit with a specific date
git commit --date="2026-01-15T10:00:00" -m "Backdated commit"`}</code></pre>

      <h3>git status and git diff - Inspect Changes</h3>
      <pre><code className="language-bash">{`# Show working tree status
git status

# Short status format
git status -s

# Show unstaged changes (working directory vs staging area)
git diff

# Show staged changes (staging area vs last commit)
git diff --staged
git diff --cached    # same as --staged

# Show changes between two commits
git diff abc123..def456

# Show changes between branches
git diff main..feature-branch

# Show only file names that changed
git diff --name-only

# Show statistics (insertions/deletions)
git diff --stat

# Diff a specific file
git diff -- path/to/file.js`}</code></pre>

      <h2>Branching: Work in Isolation</h2>
      <p>
        Branches let you develop features, fix bugs, and experiment without affecting the main codebase. Git branches are lightweight pointers to commits, making them fast to create and switch between.
      </p>
      <pre><code className="language-bash">{`# List local branches (* marks current branch)
git branch

# List all branches including remote
git branch -a

# List remote branches only
git branch -r

# Create a new branch
git branch feature-login

# Create and switch to a new branch
git checkout -b feature-login
git switch -c feature-login    # newer syntax (Git 2.23+)

# Switch to an existing branch
git checkout main
git switch main                # newer syntax

# Rename current branch
git branch -m new-name

# Rename a different branch
git branch -m old-name new-name

# Delete a branch (safe - only if merged)
git branch -d feature-login

# Force delete a branch (even if not merged)
git branch -D feature-login

# Delete a remote branch
git push origin --delete feature-login

# Show branches with last commit info
git branch -v

# Show branches that have been merged into current
git branch --merged

# Show branches not yet merged
git branch --no-merged`}</code></pre>

      <h2>Merging Branches</h2>
      <p>
        Merging combines changes from different branches. Git supports fast-forward merges (linear history) and three-way merges (merge commit). Understanding merge strategies helps you maintain a clean project history.
      </p>
      <pre><code className="language-bash">{`# Merge a branch into your current branch
git merge feature-login

# Merge with a merge commit (even if fast-forward is possible)
git merge --no-ff feature-login

# Merge with a custom commit message
git merge feature-login -m "Merge feature-login into main"

# Abort a merge (if there are conflicts)
git merge --abort

# Merge only if fast-forward is possible (no merge commit)
git merge --ff-only feature-login

# Squash merge (combine all commits into one, do not auto-commit)
git merge --squash feature-login
git commit -m "Add login feature (squashed)"

# Show merge conflicts
git diff --name-only --diff-filter=U`}</code></pre>

      <h3>Resolving Merge Conflicts</h3>
      <pre><code className="language-bash">{`# When a conflict occurs, Git marks files with conflict markers:
# <<<<<<< HEAD
# (your changes)
# =======
# (their changes)
# >>>>>>> feature-branch

# After manually resolving conflicts:
git add resolved-file.js
git commit    # completes the merge

# Use a merge tool
git mergetool

# Accept all of "ours" (current branch) changes
git checkout --ours filename.js
git add filename.js

# Accept all of "theirs" (incoming branch) changes
git checkout --theirs filename.js
git add filename.js`}</code></pre>

      <h2>Rebasing: Rewrite History</h2>
      <p>
        <code>git rebase</code> replays your commits on top of another branch, creating a linear history. It is an alternative to merging that produces a cleaner commit log. The golden rule: never rebase commits that have been pushed to a shared remote.
      </p>
      <pre><code className="language-bash">{`# Rebase current branch onto main
git rebase main

# Interactive rebase - reorder, squash, edit, or drop commits
git rebase -i HEAD~5      # last 5 commits
git rebase -i main        # all commits since branching from main

# Interactive rebase commands:
# pick   = keep commit as-is
# reword = keep commit but edit message
# edit   = pause to amend commit
# squash = meld into previous commit (keep message)
# fixup  = meld into previous commit (discard message)
# drop   = remove commit

# Continue rebase after resolving conflicts
git rebase --continue

# Skip a conflicting commit
git rebase --skip

# Abort rebase and return to original state
git rebase --abort

# Rebase and auto-squash fixup commits
git rebase -i --autosquash main`}</code></pre>

      <h2>Stashing: Save Work Temporarily</h2>
      <p>
        <code>git stash</code> lets you temporarily shelve changes so you can switch branches or pull updates. Think of it as a clipboard for your working directory changes.
      </p>
      <pre><code className="language-bash">{`# Stash all modified tracked files
git stash

# Stash with a descriptive message
git stash save "WIP: login form validation"
git stash push -m "WIP: login form validation"    # newer syntax

# Stash including untracked files
git stash -u
git stash --include-untracked

# Stash including ignored files
git stash -a
git stash --all

# List all stashes
git stash list

# Apply the most recent stash (keep it in stash list)
git stash apply

# Apply and remove from stash list
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Show stash diff
git stash show
git stash show -p stash@{0}    # show full diff

# Drop a specific stash
git stash drop stash@{1}

# Clear all stashes
git stash clear

# Create a branch from a stash
git stash branch new-feature stash@{0}`}</code></pre>

      <h2>Viewing History: git log</h2>
      <p>
        <code>git log</code> shows the commit history. It is one of the most powerful inspection tools in Git, with dozens of formatting options to display exactly what you need.
      </p>
      <pre><code className="language-bash">{`# Show commit history
git log

# Compact one-line format
git log --oneline

# Show graph with branch structure
git log --oneline --graph --all

# Show last N commits
git log -5

# Show commits by a specific author
git log --author="Alice"

# Show commits in a date range
git log --after="2026-01-01" --before="2026-02-01"

# Show commits that changed a specific file
git log -- path/to/file.js

# Show commits with diff
git log -p

# Show stats (files changed, insertions, deletions)
git log --stat

# Search commit messages
git log --grep="fix bug"

# Search for changes to a string in code (pickaxe)
git log -S "functionName"

# Custom format
git log --pretty=format:"%h %an %ar - %s"

# Show who changed each line of a file
git blame filename.js
git blame -L 10,20 filename.js    # lines 10-20 only`}</code></pre>

      <h2>Undoing Changes: Reset, Revert, Restore</h2>
      <p>
        Git provides multiple ways to undo changes, depending on whether they are uncommitted, committed locally, or already pushed to a remote. Choosing the right undo command prevents data loss.
      </p>
      <pre><code className="language-bash">{`# ===== Discard Unstaged Changes =====
# Restore a file to its last committed state
git checkout -- filename.js
git restore filename.js            # newer syntax (Git 2.23+)

# Restore all files
git checkout -- .
git restore .

# ===== Unstage Files =====
# Remove from staging area but keep changes
git reset HEAD filename.js
git restore --staged filename.js   # newer syntax

# ===== Reset Commits =====
# Soft reset: undo commit, keep changes staged
git reset --soft HEAD~1

# Mixed reset (default): undo commit, unstage changes
git reset HEAD~1
git reset --mixed HEAD~1

# Hard reset: undo commit AND discard all changes (DESTRUCTIVE)
git reset --hard HEAD~1

# Reset to a specific commit
git reset --hard abc1234

# ===== Revert (Safe for Shared Branches) =====
# Create a new commit that undoes a previous commit
git revert abc1234

# Revert without auto-committing
git revert --no-commit abc1234

# Revert a merge commit (specify parent number)
git revert -m 1 merge-commit-hash

# ===== Clean Untracked Files =====
# Preview what would be removed
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Remove untracked and ignored files
git clean -fdx`}</code></pre>

      <h2>Cherry-Pick: Apply Specific Commits</h2>
      <p>
        <code>git cherry-pick</code> copies a commit from one branch and applies it to another. It is useful for applying hotfixes or selectively porting features without merging entire branches.
      </p>
      <pre><code className="language-bash">{`# Cherry-pick a single commit
git cherry-pick abc1234

# Cherry-pick multiple commits
git cherry-pick abc1234 def5678

# Cherry-pick a range of commits
git cherry-pick abc1234..def5678

# Cherry-pick without committing (stage changes only)
git cherry-pick --no-commit abc1234

# Continue cherry-pick after resolving conflicts
git cherry-pick --continue

# Abort cherry-pick
git cherry-pick --abort`}</code></pre>

      <h2>Tags: Mark Release Points</h2>
      <p>
        Tags create permanent references to specific commits, typically used to mark release versions like <code>v1.0.0</code>. Unlike branches, tags do not move when new commits are made.
      </p>
      <pre><code className="language-bash">{`# List all tags
git tag

# List tags matching a pattern
git tag -l "v1.*"

# Create a lightweight tag
git tag v1.0.0

# Create an annotated tag (recommended for releases)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag a specific commit
git tag -a v1.0.0 abc1234 -m "Release version 1.0.0"

# Show tag details
git show v1.0.0

# Push a single tag to remote
git push origin v1.0.0

# Push all tags to remote
git push origin --tags

# Delete a local tag
git tag -d v1.0.0

# Delete a remote tag
git push origin --delete v1.0.0`}</code></pre>

      <h2>Remote Operations: Push, Pull, Fetch</h2>
      <p>
        Remote commands synchronize your local repository with shared repositories on platforms like GitHub, GitLab, or Bitbucket. Understanding the difference between fetch, pull, and push is essential for collaboration.
      </p>
      <pre><code className="language-bash">{`# ===== Managing Remotes =====
# List remote repositories
git remote -v

# Add a remote
git remote add origin https://github.com/user/repo.git

# Add a second remote (e.g., upstream for forks)
git remote add upstream https://github.com/original/repo.git

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git

# Remove a remote
git remote remove origin

# Rename a remote
git remote rename origin upstream

# ===== Fetch =====
# Download objects and refs from remote (does NOT merge)
git fetch origin

# Fetch all remotes
git fetch --all

# Fetch and prune deleted remote branches
git fetch --prune

# ===== Pull =====
# Fetch and merge remote changes
git pull origin main

# Pull with rebase instead of merge
git pull --rebase origin main

# ===== Push =====
# Push current branch to remote
git push origin main

# Push and set upstream tracking
git push -u origin feature-branch

# Push all branches
git push --all origin

# Force push (CAUTION: overwrites remote history)
git push --force origin feature-branch

# Safe force push (fails if remote has new commits)
git push --force-with-lease origin feature-branch`}</code></pre>

      <h2>Submodules: Nested Repositories</h2>
      <p>
        Submodules let you include and track external Git repositories inside your main repository. They are commonly used for shared libraries, themes, or third-party dependencies.
      </p>
      <pre><code className="language-bash">{`# Add a submodule
git submodule add https://github.com/user/library.git libs/library

# Initialize submodules after cloning
git submodule init
git submodule update

# Initialize and update in one command
git submodule update --init --recursive

# Update all submodules to latest remote commit
git submodule update --remote

# Remove a submodule
git submodule deinit libs/library
git rm libs/library
rm -rf .git/modules/libs/library

# Show submodule status
git submodule status`}</code></pre>

      <h2>Common Git Workflows</h2>
      <p>
        Real-world teams follow established branching strategies. Here are the three most popular Git workflows and the commands for each.
      </p>

      <h3>Feature Branch Workflow</h3>
      <p>
        The most common workflow for teams. Each feature gets its own branch, and changes are merged via pull requests after code review.
      </p>
      <pre><code className="language-bash">{`# 1. Start from an up-to-date main branch
git checkout main
git pull origin main

# 2. Create a feature branch
git checkout -b feature/user-profile

# 3. Work on the feature (add, commit, repeat)
git add .
git commit -m "feat: add user profile page"
git add .
git commit -m "feat: add avatar upload to profile"

# 4. Push the feature branch
git push -u origin feature/user-profile

# 5. Create a pull request on GitHub/GitLab

# 6. After PR is approved, merge and clean up
git checkout main
git pull origin main
git branch -d feature/user-profile
git push origin --delete feature/user-profile`}</code></pre>

      <h3>Hotfix Workflow</h3>
      <p>
        When a critical bug is found in production, you create a hotfix branch directly from the release or main branch to apply the fix quickly.
      </p>
      <pre><code className="language-bash">{`# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/fix-payment-bug

# 2. Fix the bug
git add .
git commit -m "fix: resolve payment processing timeout"

# 3. Merge into main
git checkout main
git merge --no-ff hotfix/fix-payment-bug
git tag -a v1.0.1 -m "Hotfix: payment timeout"
git push origin main --tags

# 4. Also merge into develop (if using Gitflow)
git checkout develop
git merge --no-ff hotfix/fix-payment-bug
git push origin develop

# 5. Clean up
git branch -d hotfix/fix-payment-bug
git push origin --delete hotfix/fix-payment-bug`}</code></pre>

      <h3>Release Workflow</h3>
      <p>
        Release branches prepare a new production release, allowing final bug fixes and metadata updates while the develop branch continues to receive new features.
      </p>
      <pre><code className="language-bash">{`# 1. Create release branch from develop
git checkout develop
git checkout -b release/v2.0.0

# 2. Bump version numbers, update changelog
git add .
git commit -m "chore: bump version to 2.0.0"

# 3. Fix any release bugs
git add .
git commit -m "fix: correct typo in release notes"

# 4. Merge into main and tag
git checkout main
git merge --no-ff release/v2.0.0
git tag -a v2.0.0 -m "Release 2.0.0"
git push origin main --tags

# 5. Merge back into develop
git checkout develop
git merge --no-ff release/v2.0.0
git push origin develop

# 6. Clean up
git branch -d release/v2.0.0`}</code></pre>

      <h2>Git Aliases: Speed Up Your Workflow</h2>
      <p>
        Git aliases let you create shortcuts for frequently used commands. Add these to your <code>~/.gitconfig</code> file to save hundreds of keystrokes every day.
      </p>
      <pre><code className="language-bash">{`# Set up useful aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all --decorate"
git config --global alias.last "log -1 HEAD --stat"
git config --global alias.unstage "reset HEAD --"
git config --global alias.undo "reset --soft HEAD~1"

# Usage:
git co main          # instead of git checkout main
git br -a            # instead of git branch -a
git lg               # beautiful graph log
git undo             # undo last commit, keep changes`}</code></pre>

      <h2>Git Tips and Best Practices</h2>
      <ul>
        <li><strong>Commit often, commit small</strong>: Each commit should represent a single logical change. This makes code review easier and allows precise reverts.</li>
        <li><strong>Write meaningful commit messages</strong>: Follow the conventional commits format: <code>type: description</code> (e.g., <code>feat: add search</code>, <code>fix: resolve null pointer</code>).</li>
        <li><strong>Never force-push to shared branches</strong>: Use <code>--force-with-lease</code> instead of <code>--force</code> to avoid overwriting teammates&apos; work.</li>
        <li><strong>Use .gitignore</strong>: Keep build artifacts, dependencies, environment files, and IDE settings out of your repository.</li>
        <li><strong>Pull before push</strong>: Always pull the latest changes before pushing to avoid unnecessary merge conflicts.</li>
        <li><strong>Use branches for everything</strong>: Never commit directly to main. Even small fixes should go through a branch and pull request.</li>
        <li><strong>Tag your releases</strong>: Use annotated tags with semantic versioning (v1.0.0) to mark release points.</li>
        <li><strong>Rebase local branches, merge shared branches</strong>: Use rebase to keep your feature branch up to date with main, but use merge for integrating feature branches into main.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between git merge and git rebase?</h3>
      <p>
        Both integrate changes from one branch into another. <code>git merge</code> creates a new merge commit that joins two branches, preserving the full branch history. <code>git rebase</code> replays your commits on top of the target branch, creating a linear history. Use merge for shared branches and rebase for local feature branches before merging. Never rebase commits that have been pushed to a shared remote.
      </p>

      <h3>How do I undo the last commit without losing changes?</h3>
      <p>
        Use <code>git reset --soft HEAD~1</code> to undo the last commit while keeping all changes staged. Use <code>git reset HEAD~1</code> (mixed reset) to undo the commit and unstage changes but keep them in your working directory. Only use <code>git reset --hard HEAD~1</code> if you want to completely discard the commit and all its changes.
      </p>

      <h3>What is the difference between git fetch and git pull?</h3>
      <p>
        <code>git fetch</code> downloads new data from the remote repository but does not modify your working directory or merge anything. It updates remote-tracking branches (e.g., origin/main). <code>git pull</code> is essentially <code>git fetch</code> followed by <code>git merge</code> &mdash; it downloads and immediately integrates remote changes into your current branch. Use fetch when you want to review changes first; use pull when you want to update immediately.
      </p>

      <h3>How do I resolve merge conflicts?</h3>
      <p>
        When a conflict occurs, Git marks conflicting sections with <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> markers. Open each conflicted file, decide which changes to keep (or combine both), remove the markers, then stage with <code>git add</code> and complete with <code>git commit</code>. Tools like VS Code and IntelliJ provide visual merge conflict resolution.
      </p>

      <h3>How do I remove a file from Git without deleting it?</h3>
      <p>
        Use <code>git rm --cached filename</code> to remove a file from Git tracking while keeping it in your working directory. Then add the file to <code>.gitignore</code> to prevent it from being tracked again. This is commonly used to untrack accidentally committed environment files or build artifacts.
      </p>

      <h3>How do I squash multiple commits into one?</h3>
      <p>
        Use interactive rebase: <code>git rebase -i HEAD~N</code> where N is the number of commits. In the editor, change <code>pick</code> to <code>squash</code> (or <code>s</code>) for all commits except the first one. Git will combine them into a single commit and let you edit the combined commit message.
      </p>
    </>
  );
}
