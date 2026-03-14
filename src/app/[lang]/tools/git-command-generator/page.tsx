'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface GitCommand {
  category: 'setup' | 'branching' | 'committing' | 'stashing' | 'merging' | 'remote' | 'undoing' | 'inspection' | 'advanced';
  command: string;
  description: string;
  example: string;
  flags: string;
}

const GIT_COMMANDS: GitCommand[] = [
  // Setup
  { category: 'setup', command: 'git config --global user.name "Your Name"', description: 'Set global username', example: 'git config --global user.name "John Doe"', flags: '--global' },
  { category: 'setup', command: 'git config --global user.email "email@example.com"', description: 'Set global email', example: 'git config --global user.email "john@example.com"', flags: '--global' },
  { category: 'setup', command: 'git init', description: 'Initialize a new git repository', example: 'git init my-project', flags: 'none' },
  { category: 'setup', command: 'git clone <repo-url>', description: 'Clone a repository', example: 'git clone https://github.com/user/repo.git', flags: 'none' },
  { category: 'setup', command: 'git clone --depth 1 <repo-url>', description: 'Clone with limited history (shallow clone)', example: 'git clone --depth 1 https://github.com/user/repo.git', flags: '--depth' },

  // Branching
  { category: 'branching', command: 'git branch', description: 'List local branches', example: 'git branch', flags: 'none' },
  { category: 'branching', command: 'git branch -a', description: 'List all branches (local and remote)', example: 'git branch -a', flags: '-a' },
  { category: 'branching', command: 'git branch <branch-name>', description: 'Create a new branch', example: 'git branch feature/new-feature', flags: 'none' },
  { category: 'branching', command: 'git checkout -b <branch-name>', description: 'Create and switch to new branch', example: 'git checkout -b feature/new-feature', flags: '-b' },
  { category: 'branching', command: 'git switch -c <branch-name>', description: 'Create and switch to new branch (modern)', example: 'git switch -c feature/new-feature', flags: '-c' },
  { category: 'branching', command: 'git checkout <branch-name>', description: 'Switch to an existing branch', example: 'git checkout main', flags: 'none' },
  { category: 'branching', command: 'git switch <branch-name>', description: 'Switch to branch (modern syntax)', example: 'git switch main', flags: 'none' },
  { category: 'branching', command: 'git branch -d <branch-name>', description: 'Delete a branch', example: 'git branch -d feature/old-feature', flags: '-d' },
  { category: 'branching', command: 'git branch -D <branch-name>', description: 'Force delete a branch', example: 'git branch -D feature/old-feature', flags: '-D' },
  { category: 'branching', command: 'git branch -m <old-name> <new-name>', description: 'Rename a branch', example: 'git branch -m old-feature new-feature', flags: '-m' },
  { category: 'branching', command: 'git branch -m <new-name>', description: 'Rename current branch', example: 'git branch -m renamed-feature', flags: '-m' },

  // Committing
  { category: 'committing', command: 'git status', description: 'Show working tree status', example: 'git status', flags: 'none' },
  { category: 'committing', command: 'git add <file>', description: 'Stage a specific file', example: 'git add src/index.js', flags: 'none' },
  { category: 'committing', command: 'git add .', description: 'Stage all changes', example: 'git add .', flags: 'none' },
  { category: 'committing', command: 'git add -A', description: 'Stage all changes including deletions', example: 'git add -A', flags: '-A' },
  { category: 'committing', command: 'git add -p', description: 'Interactive staging (patch mode)', example: 'git add -p', flags: '-p' },
  { category: 'committing', command: 'git commit -m "message"', description: 'Commit with message', example: 'git commit -m "Add new feature"', flags: '-m' },
  { category: 'committing', command: 'git commit -am "message"', description: 'Stage tracked files and commit', example: 'git commit -am "Update documentation"', flags: '-am' },
  { category: 'committing', command: 'git commit --amend', description: 'Modify the last commit', example: 'git commit --amend', flags: '--amend' },
  { category: 'committing', command: 'git commit --amend --no-edit', description: 'Amend last commit without changing message', example: 'git commit --amend --no-edit', flags: '--amend --no-edit' },
  { category: 'committing', command: 'git commit --allow-empty -m "message"', description: 'Create empty commit', example: 'git commit --allow-empty -m "Trigger CI/CD"', flags: '--allow-empty' },

  // Stashing
  { category: 'stashing', command: 'git stash', description: 'Stash current changes', example: 'git stash', flags: 'none' },
  { category: 'stashing', command: 'git stash save "message"', description: 'Stash with description', example: 'git stash save "WIP: feature development"', flags: 'none' },
  { category: 'stashing', command: 'git stash list', description: 'List all stashes', example: 'git stash list', flags: 'none' },
  { category: 'stashing', command: 'git stash pop', description: 'Apply and remove last stash', example: 'git stash pop', flags: 'none' },
  { category: 'stashing', command: 'git stash apply', description: 'Apply last stash without removing', example: 'git stash apply', flags: 'none' },
  { category: 'stashing', command: 'git stash apply stash@{n}', description: 'Apply specific stash by index', example: 'git stash apply stash@{2}', flags: 'none' },
  { category: 'stashing', command: 'git stash drop', description: 'Delete last stash', example: 'git stash drop', flags: 'none' },
  { category: 'stashing', command: 'git stash clear', description: 'Delete all stashes', example: 'git stash clear', flags: 'none' },

  // Merging
  { category: 'merging', command: 'git merge <branch-name>', description: 'Merge branch into current branch', example: 'git merge feature/new-feature', flags: 'none' },
  { category: 'merging', command: 'git merge --no-ff <branch-name>', description: 'Merge with merge commit', example: 'git merge --no-ff feature/new-feature', flags: '--no-ff' },
  { category: 'merging', command: 'git merge --squash <branch-name>', description: 'Squash and merge', example: 'git merge --squash feature/new-feature', flags: '--squash' },
  { category: 'merging', command: 'git merge --abort', description: 'Abort merge in progress', example: 'git merge --abort', flags: '--abort' },
  { category: 'merging', command: 'git rebase <branch-name>', description: 'Rebase current branch', example: 'git rebase main', flags: 'none' },
  { category: 'merging', command: 'git rebase -i HEAD~n', description: 'Interactive rebase last n commits', example: 'git rebase -i HEAD~3', flags: '-i' },
  { category: 'merging', command: 'git rebase --abort', description: 'Abort rebase', example: 'git rebase --abort', flags: '--abort' },
  { category: 'merging', command: 'git rebase --continue', description: 'Continue rebase after resolving conflicts', example: 'git rebase --continue', flags: '--continue' },

  // Remote
  { category: 'remote', command: 'git remote', description: 'List remote repositories', example: 'git remote', flags: 'none' },
  { category: 'remote', command: 'git remote -v', description: 'List remotes with URLs', example: 'git remote -v', flags: '-v' },
  { category: 'remote', command: 'git remote add <name> <url>', description: 'Add a new remote', example: 'git remote add origin https://github.com/user/repo.git', flags: 'none' },
  { category: 'remote', command: 'git remote remove <name>', description: 'Remove a remote', example: 'git remote remove old-remote', flags: 'none' },
  { category: 'remote', command: 'git remote rename <old> <new>', description: 'Rename a remote', example: 'git remote rename origin upstream', flags: 'none' },
  { category: 'remote', command: 'git remote set-url <name> <url>', description: 'Change remote URL', example: 'git remote set-url origin https://github.com/user/new-repo.git', flags: 'none' },
  { category: 'remote', command: 'git fetch', description: 'Fetch updates from remote', example: 'git fetch origin', flags: 'none' },
  { category: 'remote', command: 'git fetch --all', description: 'Fetch from all remotes', example: 'git fetch --all', flags: '--all' },
  { category: 'remote', command: 'git pull', description: 'Fetch and merge remote changes', example: 'git pull origin main', flags: 'none' },
  { category: 'remote', command: 'git pull --rebase', description: 'Fetch and rebase instead of merge', example: 'git pull --rebase origin main', flags: '--rebase' },
  { category: 'remote', command: 'git push', description: 'Push commits to remote', example: 'git push origin main', flags: 'none' },
  { category: 'remote', command: 'git push -u origin <branch>', description: 'Push and set upstream branch', example: 'git push -u origin feature/new-feature', flags: '-u' },
  { category: 'remote', command: 'git push --all', description: 'Push all branches', example: 'git push --all origin', flags: '--all' },
  { category: 'remote', command: 'git push --force', description: 'Force push (use with caution)', example: 'git push --force origin main', flags: '--force' },
  { category: 'remote', command: 'git push --force-with-lease', description: 'Safer force push', example: 'git push --force-with-lease origin main', flags: '--force-with-lease' },
  { category: 'remote', command: 'git push origin --delete <branch>', description: 'Delete remote branch', example: 'git push origin --delete feature/old-feature', flags: '--delete' },

  // Undoing
  { category: 'undoing', command: 'git restore <file>', description: 'Discard changes in working directory', example: 'git restore src/index.js', flags: 'none' },
  { category: 'undoing', command: 'git checkout -- <file>', description: 'Discard changes (older syntax)', example: 'git checkout -- src/index.js', flags: '--' },
  { category: 'undoing', command: 'git clean -fd', description: 'Remove untracked files and directories', example: 'git clean -fd', flags: '-fd' },
  { category: 'undoing', command: 'git reset <file>', description: 'Unstage a file', example: 'git reset src/index.js', flags: 'none' },
  { category: 'undoing', command: 'git reset --soft HEAD~1', description: 'Undo last commit, keep changes staged', example: 'git reset --soft HEAD~1', flags: '--soft' },
  { category: 'undoing', command: 'git reset --mixed HEAD~1', description: 'Undo last commit, keep changes unstaged', example: 'git reset --mixed HEAD~1', flags: '--mixed' },
  { category: 'undoing', command: 'git reset --hard HEAD~1', description: 'Undo last commit and discard changes', example: 'git reset --hard HEAD~1', flags: '--hard' },
  { category: 'undoing', command: 'git revert <commit-hash>', description: 'Create new commit that undoes changes', example: 'git revert abc1234', flags: 'none' },
  { category: 'undoing', command: 'git revert HEAD', description: 'Revert the last commit', example: 'git revert HEAD', flags: 'none' },

  // Inspection
  { category: 'inspection', command: 'git log', description: 'Show commit history', example: 'git log', flags: 'none' },
  { category: 'inspection', command: 'git log --oneline', description: 'Show condensed commit history', example: 'git log --oneline', flags: '--oneline' },
  { category: 'inspection', command: 'git log --graph --all --oneline', description: 'Show visual branch history', example: 'git log --graph --all --oneline', flags: '--graph --all' },
  { category: 'inspection', command: 'git log -n <number>', description: 'Show last n commits', example: 'git log -n 10', flags: '-n' },
  { category: 'inspection', command: 'git log --author="name"', description: 'Show commits by specific author', example: 'git log --author="John"', flags: '--author' },
  { category: 'inspection', command: 'git log --grep="pattern"', description: 'Search commits by message', example: 'git log --grep="bug fix"', flags: '--grep' },
  { category: 'inspection', command: 'git log <file>', description: 'Show history for specific file', example: 'git log src/index.js', flags: 'none' },
  { category: 'inspection', command: 'git show <commit-hash>', description: 'Show specific commit details', example: 'git show abc1234', flags: 'none' },
  { category: 'inspection', command: 'git diff', description: 'Show unstaged changes', example: 'git diff', flags: 'none' },
  { category: 'inspection', command: 'git diff --staged', description: 'Show staged changes', example: 'git diff --staged', flags: '--staged' },
  { category: 'inspection', command: 'git diff <branch1> <branch2>', description: 'Compare two branches', example: 'git diff main feature/new-feature', flags: 'none' },
  { category: 'inspection', command: 'git blame <file>', description: 'Show line-by-line commit history', example: 'git blame src/index.js', flags: 'none' },
  { category: 'inspection', command: 'git tag', description: 'List tags', example: 'git tag', flags: 'none' },
  { category: 'inspection', command: 'git tag <tag-name>', description: 'Create a tag', example: 'git tag v1.0.0', flags: 'none' },
  { category: 'inspection', command: 'git tag -a <tag-name> -m "message"', description: 'Create annotated tag', example: 'git tag -a v1.0.0 -m "Release 1.0"', flags: '-a' },

  // Advanced
  { category: 'advanced', command: 'git cherry-pick <commit-hash>', description: 'Apply specific commit to current branch', example: 'git cherry-pick abc1234', flags: 'none' },
  { category: 'advanced', command: 'git cherry-pick <commit1>..<commit2>', description: 'Cherry-pick range of commits', example: 'git cherry-pick abc1234..def5678', flags: 'none' },
  { category: 'advanced', command: 'git bisect start', description: 'Start binary search for bug', example: 'git bisect start', flags: 'none' },
  { category: 'advanced', command: 'git bisect bad', description: 'Mark current commit as bad', example: 'git bisect bad', flags: 'none' },
  { category: 'advanced', command: 'git bisect good <commit-hash>', description: 'Mark commit as good', example: 'git bisect good abc1234', flags: 'none' },
  { category: 'advanced', command: 'git reflog', description: 'Show reference logs', example: 'git reflog', flags: 'none' },
  { category: 'advanced', command: 'git fsck --lost-found', description: 'Find lost commits', example: 'git fsck --lost-found', flags: '--lost-found' },
  { category: 'advanced', command: 'git hook', description: 'Manage git hooks', example: 'git hook list', flags: 'none' },
  { category: 'advanced', command: 'git worktree add <path> <branch>', description: 'Create separate working tree', example: 'git worktree add ../hotfix main', flags: 'none' },
  { category: 'advanced', command: 'git submodule add <url> <path>', description: 'Add a submodule', example: 'git submodule add https://github.com/user/module.git modules/dep', flags: 'none' },
];

const CATEGORIES = [
  { key: 'setup', label: 'Setup' },
  { key: 'branching', label: 'Branching' },
  { key: 'committing', label: 'Committing' },
  { key: 'stashing', label: 'Stashing' },
  { key: 'merging', label: 'Merging' },
  { key: 'remote', label: 'Remote' },
  { key: 'undoing', label: 'Undoing' },
  { key: 'inspection', label: 'Inspection' },
  { key: 'advanced', label: 'Advanced' },
];

export default function GitCommandGenerator() {
  const { dict } = useLang();
  const t = dict.tools['git-command-generator'];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCommands = useMemo(() => {
    let results = GIT_COMMANDS;

    if (activeCategory && activeCategory !== 'all') {
      results = results.filter((cmd) => cmd.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      results = results.filter(
        (cmd) =>
          cmd.command.toLowerCase().includes(query) ||
          cmd.description.toLowerCase().includes(query) ||
          cmd.example.toLowerCase().includes(query)
      );
    }

    return results;
  }, [searchTerm, activeCategory]);

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="git-command-generator"
    >
      {/* Search Bar */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder={t.searchPlaceholder || 'Search commands (e.g., branch, commit, push)...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: 14,
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 20,
        flexWrap: 'wrap',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: 12,
      }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={{
            padding: '6px 12px',
            fontSize: 13,
            fontWeight: 600,
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            backgroundColor: !activeCategory ? 'var(--primary-color)' : 'var(--bg-secondary)',
            color: !activeCategory ? 'white' : 'var(--text-primary)',
            transition: 'all 0.2s',
          }}
        >
          All ({GIT_COMMANDS.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = GIT_COMMANDS.filter((cmd) => cmd.category === cat.key).length;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: '6px 12px',
                fontSize: 13,
                fontWeight: 600,
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                backgroundColor: activeCategory === cat.key ? 'var(--primary-color)' : 'var(--bg-secondary)',
                color: activeCategory === cat.key ? 'white' : 'var(--text-primary)',
                transition: 'all 0.2s',
              }}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
        {t.resultsCount || `Showing ${filteredCommands.length} command${filteredCommands.length !== 1 ? 's' : ''}`}
      </div>

      {/* Command Cards */}
      <div style={{ display: 'grid', gap: 12 }}>
        {filteredCommands.length > 0 ? (
          filteredCommands.map((cmd, idx) => (
            <div
              key={idx}
              style={{
                padding: 16,
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary-color)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  {/* Command */}
                  <div style={{
                    fontSize: 14,
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    backgroundColor: 'var(--bg-primary)',
                    padding: '8px 10px',
                    borderRadius: 6,
                    marginBottom: 8,
                    color: 'var(--primary-color)',
                    wordBreak: 'break-all',
                  }}>
                    {cmd.command}
                  </div>

                  {/* Description */}
                  <div style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    marginBottom: 8,
                    lineHeight: 1.5,
                  }}>
                    {cmd.description}
                  </div>

                  {/* Example */}
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                      {t.exampleLabel || 'Example:'}
                    </div>
                    <div style={{
                      fontSize: 12,
                      fontFamily: 'monospace',
                      backgroundColor: 'var(--bg-primary)',
                      padding: '6px 8px',
                      borderRadius: 4,
                      color: 'var(--text-secondary)',
                      wordBreak: 'break-all',
                    }}>
                      {cmd.example}
                    </div>
                  </div>

                  {/* Flags */}
                  {cmd.flags !== 'none' && (
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      <span style={{ fontWeight: 600 }}>{t.flagsLabel || 'Flags:'}</span> {cmd.flags}
                    </div>
                  )}
                </div>

                {/* Copy Button */}
                <div style={{ marginTop: 4 }}>
                  <CopyButton text={cmd.command} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{
            padding: 24,
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: 14,
          }}>
            {t.noResultsLabel || 'No commands found. Try a different search term.'}
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'About Git Command Generator'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
          {t.seoContent || 'Git is a distributed version control system used by millions of developers worldwide. This comprehensive guide provides quick access to over 60 essential Git commands organized by workflow category. Whether you\'re setting up your repository, managing branches, committing changes, or resolving conflicts, you\'ll find the command you need with explanations and practical examples.'}
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 12 }}>{t.seoFeaturesTitle || 'Key Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 16 }}>
          <li>{t.seoFeature1 || 'Search functionality to quickly find commands by keyword'}</li>
          <li>{t.seoFeature2 || 'Commands organized by workflow category for easy navigation'}</li>
          <li>{t.seoFeature3 || 'Real-world examples for each command'}</li>
          <li>{t.seoFeature4 || 'One-click copy functionality for fast command usage'}</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 12 }}>{t.seoWorkflowsTitle || 'Common Git Workflows'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Setup & Configuration:</strong> {t.seoWorkflow1 || 'Initialize repositories and configure user information'}</li>
          <li><strong>Branching Strategy:</strong> {t.seoWorkflow2 || 'Create, switch, and manage feature branches'}</li>
          <li><strong>Committing Changes:</strong> {t.seoWorkflow3 || 'Stage files, commit with meaningful messages, and amend commits'}</li>
          <li><strong>Remote Collaboration:</strong> {t.seoWorkflow4 || 'Push, pull, and manage remote repositories'}</li>
          <li><strong>Merging & Rebasing:</strong> {t.seoWorkflow5 || 'Integrate branches and maintain clean history'}</li>
          <li><strong>Undoing Changes:</strong> {t.seoWorkflow6 || 'Revert commits, reset changes, and recover lost work'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
