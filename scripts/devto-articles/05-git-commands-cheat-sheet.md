---
title: "Every Git Command You Need, With Examples You Can Actually Copy"
published: false
description: "The complete Git cheat sheet for daily use. Setup, branching, merging, undoing mistakes, and advanced tricks -- all with real copy-paste examples."
tags: git, beginners, tutorial, devops
canonical_url: https://viadreams.cc/en/blog/git-commands-cheat-sheet
cover_image: https://viadreams.cc/og-image.png
---

I use Git every single day and I still look things up. There's no shame in it. Here's the reference I keep coming back to -- organized by workflow, with the flags you'll actually need.

## Setup & Configuration

```bash
# Set your identity (do this first)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Set default branch to main
git config --global init.defaultBranch main

# Enable colored output
git config --global color.ui auto

# Set VS Code as your editor
git config --global core.editor "code --wait"

# View all settings
git config --list
```

```bash
# Initialize a new repo
git init

# Clone an existing repo
git clone https://github.com/user/repo.git

# Shallow clone (just latest commit -- much faster)
git clone --depth 1 https://github.com/user/repo.git

# Clone a specific branch
git clone --branch develop https://github.com/user/repo.git
```

## The Daily Workflow

These are the commands you'll use dozens of times every day.

### Stage & Commit

```bash
# Stage specific files
git add index.html style.css

# Stage everything
git add .

# Stage parts of a file interactively
git add -p filename.js

# Commit with a message
git commit -m "Add user authentication"

# Stage tracked files and commit in one step
git commit -am "Fix dark mode styles"

# Amend the last commit
git commit --amend -m "Better commit message"

# Amend without changing message
git commit --amend --no-edit
```

### Check Status & Diffs

```bash
# What's changed?
git status
git status -sb    # compact format

# Unstaged changes
git diff

# Staged changes (what will be committed)
git diff --staged

# Compare branches
git diff main..feature-branch

# Just the filenames
git diff --name-only

# Stats summary
git diff --stat
```

## Branching & Merging

This is where Git gets powerful.

```bash
# List branches
git branch         # local
git branch -a      # all (local + remote)

# Create and switch to new branch
git checkout -b feature/login
# or (modern syntax)
git switch -c feature/login

# Switch branches
git checkout main
git switch main

# Rename current branch
git branch -m new-name

# Delete a branch
git branch -d feature/done       # safe delete
git branch -D feature/abandoned  # force delete

# Merge a branch into current
git merge feature/login

# Merge without fast-forward (preserves branch history)
git merge --no-ff feature/login

# Rebase current branch onto main
git rebase main
```

## Remote Operations

```bash
# View remotes
git remote -v

# Add a remote
git remote add origin https://github.com/user/repo.git

# Fetch updates (doesn't modify your code)
git fetch origin

# Pull (fetch + merge)
git pull origin main

# Pull with rebase (cleaner history)
git pull --rebase origin main

# Push
git push origin main

# Push and set upstream (first push of a branch)
git push -u origin feature/login

# Delete a remote branch
git push origin --delete feature/old
```

## History & Inspection

```bash
# View commit log
git log
git log --oneline           # compact
git log --oneline --graph   # with branch visualization
git log -5                  # last 5 commits
git log --author="Alice"    # by author

# Search commits
git log --grep="bugfix"
git log -S "functionName"   # find when code was added/removed

# Who changed each line?
git blame filename.js

# Show a specific commit
git show abc1234

# Show what changed in a commit
git show --stat abc1234
```

## Undoing Mistakes

Everyone needs these. Learn them before you need them.

```bash
# Discard unstaged changes in a file
git checkout -- filename.js
git restore filename.js        # modern syntax

# Unstage a file (keep changes)
git reset HEAD filename.js
git restore --staged filename.js  # modern syntax

# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last commit, keep changes unstaged
git reset HEAD~1

# Undo last commit, discard everything (dangerous!)
git reset --hard HEAD~1

# Create a new commit that reverses a previous one (safe for shared branches)
git revert abc1234

# Recover deleted branch or lost commit
git reflog
git checkout -b recovered abc1234
```

## Advanced Tricks

These save hours when you need them.

### Stash

```bash
# Stash current changes
git stash

# Stash with a description
git stash push -m "WIP: login form"

# List stashes
git stash list

# Apply most recent stash
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Drop a stash
git stash drop stash@{0}
```

### Cherry-Pick

```bash
# Apply a specific commit to current branch
git cherry-pick abc1234

# Cherry-pick without committing
git cherry-pick --no-commit abc1234
```

### Bisect (Find the Bug)

```bash
# Start bisecting
git bisect start
git bisect bad           # current commit is broken
git bisect good abc1234  # this old commit was fine

# Git checks out middle commits -- you test and mark:
git bisect good  # or
git bisect bad

# When found:
git bisect reset
```

### Clean

```bash
# Preview what would be deleted
git clean -nd

# Delete untracked files
git clean -fd

# Delete untracked files AND directories
git clean -ffd
```

## FAQ Quick Answers

**merge vs rebase?** -- Merge preserves full branch history with a merge commit. Rebase creates a linear history by replaying commits. Use merge for shared branches, rebase for local feature branches.

**fetch vs pull?** -- Fetch downloads data without touching your code. Pull = fetch + merge. Use fetch when you want to inspect first.

**How to undo last commit?** -- `git reset --soft HEAD~1` keeps changes staged. `git reset HEAD~1` keeps changes unstaged. `git reset --hard HEAD~1` discards everything.

**Remove file from tracking without deleting?** -- `git rm --cached filename` then add to `.gitignore`.

---

*Originally published on [DevToolBox](https://viadreams.cc/en/blog/git-commands-cheat-sheet). Try our free [Git Command Generator](https://viadreams.cc/en/tools/git-command-generator) -- build Git commands interactively. 100% client-side, no data leaves your browser.*
