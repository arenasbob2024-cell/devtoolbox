---
title: "Linux CLI Tools Every Developer Should Know in 2026"
tags: linux, terminal, programming, tools
canonical_url: https://viadreams.cc/en/blog/linux-command-line-tools
published: true
---

The classic Unix tools are great, but modern replacements are faster, prettier, and smarter. Here are the tools I use daily.

## File Finding: fd (not find)

```bash
# find: verbose and slow
find . -name "*.tsx" -not -path "*/node_modules/*"

# fd: fast, gitignore-aware, intuitive
fd -e tsx              # All .tsx files
fd -e tsx src          # In src/ only
fd -H "\.env"          # Include hidden files
fd -t d components     # Find directories named "components"
```

fd automatically respects `.gitignore` and is 5-50x faster than find.

## Text Search: ripgrep (not grep)

```bash
# grep: slow, verbose
grep -r "useState" src --include="*.tsx"

# rg: fast, smart, beautiful output
rg "useState" src -t tsx
rg "TODO|FIXME|HACK" --glob "*.ts"
rg -l "useEffect"     # Just filenames
rg "func\w+" -o       # Only matching text
```

ripgrep respects `.gitignore`, handles binary files, and is 10-100x faster than grep.

## File Display: bat (not cat)

```bash
# cat: no syntax highlighting
cat src/index.ts

# bat: syntax highlighting, line numbers, Git integration
bat src/index.ts
bat --style=plain src/index.ts  # Just highlighting, no decorations
bat *.json                       # Multiple files with headers
```

bat also works as a `man` page colourizer: `export MANPAGER="sh -c 'col -bx | bat -l man -p'"`

## Directory Listing: eza (not ls)

```bash
# eza: modern ls with colors, icons, Git info
eza -la                   # Long list with hidden files
eza --tree --level=2      # Tree view
eza -la --git             # Show Git status for each file
eza -la --sort=modified   # Sort by modification time
```

## Git Diffs: delta

```bash
# ~/.gitconfig
[core]
  pager = delta

[delta]
  navigate = true      # Arrow keys to navigate hunks
  line-numbers = true
  syntax-theme = Monokai Extended
```

delta makes `git diff`, `git log -p`, and `git show` beautiful.

## Directory Jumping: zoxide

```bash
# Traditional: long path typing
cd ~/Projects/my-company/awesome-project/frontend/src

# zoxide: jump to most-used directories
z awesome     # Jumps to ~/Projects/.../awesome-project
z frontend    # Jumps to the frontend dir you use most
zi            # Interactive fuzzy finder (requires fzf)
```

zoxide learns your habits over time.

## Fuzzy Finding: fzf

```bash
# Fuzzy history search (Ctrl+R replacement)
history | fzf

# Interactive file picker
vim $(fzf)

# Kill processes interactively
kill $(ps aux | fzf | awk '{print $2}')

# Branch switching in git
git checkout $(git branch | fzf)
```

## JSON Processing: jq

```bash
# Pretty print
cat data.json | jq .

# Extract field
cat data.json | jq '.users[].email'

# Filter and transform
cat data.json | jq '[.users[] | select(.active) | {name, email}]'

# Combine with curl
curl https://api.github.com/users/torvalds | jq '{name, blog, followers}'
```

## HTTP Client: xh (httpie but faster)

```bash
# GET request
xh https://api.example.com/users

# POST with JSON
xh POST https://api.example.com/users name=Alice email=alice@example.com

# With auth
xh -A bearer -a mytoken GET https://api.example.com/protected
```

## The Setup

Install everything with:
```bash
# macOS
brew install fd ripgrep bat eza git-delta zoxide fzf jq xh

# Arch Linux
pacman -S fd ripgrep bat eza git-delta zoxide fzf jq xh

# Cargo (any platform)
cargo install fd-find ripgrep bat eza git-delta zoxide
```

Use [chmod calculator](https://viadreams.cc/en/tools/chmod-calculator) to set file permissions on your new tools.

---

*Full Linux tools guide at [viadreams.cc/en/blog/linux-command-line-tools](https://viadreams.cc/en/blog/linux-command-line-tools)*
