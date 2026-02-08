'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface GitCommand {
  category: string;
  label: string;
  command: string;
  description: string;
  params?: { key: string; label: string; placeholder: string; default?: string }[];
}

const gitCommands: GitCommand[] = [
  // Init & Clone
  { category: 'init', label: 'Initialize repository', command: 'git init', description: 'Create a new Git repository in the current directory' },
  { category: 'init', label: 'Clone repository', command: 'git clone {url}', description: 'Clone a remote repository', params: [{ key: 'url', label: 'Repository URL', placeholder: 'https://github.com/user/repo.git' }] },
  { category: 'init', label: 'Clone (specific branch)', command: 'git clone -b {branch} {url}', description: 'Clone a specific branch', params: [{ key: 'url', label: 'Repository URL', placeholder: 'https://github.com/user/repo.git' }, { key: 'branch', label: 'Branch name', placeholder: 'develop' }] },

  // Branch
  { category: 'branch', label: 'Create branch', command: 'git checkout -b {branch}', description: 'Create and switch to a new branch', params: [{ key: 'branch', label: 'Branch name', placeholder: 'feature/my-feature' }] },
  { category: 'branch', label: 'Switch branch', command: 'git checkout {branch}', description: 'Switch to an existing branch', params: [{ key: 'branch', label: 'Branch name', placeholder: 'main' }] },
  { category: 'branch', label: 'Delete branch (local)', command: 'git branch -d {branch}', description: 'Delete a local branch (safe)', params: [{ key: 'branch', label: 'Branch name', placeholder: 'feature/old-feature' }] },
  { category: 'branch', label: 'Delete branch (remote)', command: 'git push origin --delete {branch}', description: 'Delete a remote branch', params: [{ key: 'branch', label: 'Branch name', placeholder: 'feature/old-feature' }] },
  { category: 'branch', label: 'List all branches', command: 'git branch -a', description: 'Show local and remote branches' },
  { category: 'branch', label: 'Rename current branch', command: 'git branch -m {newname}', description: 'Rename the current branch', params: [{ key: 'newname', label: 'New name', placeholder: 'feature/new-name' }] },

  // Stage & Commit
  { category: 'commit', label: 'Stage all changes', command: 'git add .', description: 'Add all modified and new files to staging' },
  { category: 'commit', label: 'Stage specific file', command: 'git add {file}', description: 'Add a specific file to staging', params: [{ key: 'file', label: 'File path', placeholder: 'src/index.ts' }] },
  { category: 'commit', label: 'Commit with message', command: 'git commit -m "{message}"', description: 'Create a commit with a message', params: [{ key: 'message', label: 'Commit message', placeholder: 'feat: add user login' }] },
  { category: 'commit', label: 'Amend last commit', command: 'git commit --amend -m "{message}"', description: 'Modify the last commit message', params: [{ key: 'message', label: 'New message', placeholder: 'fix: correct typo' }] },
  { category: 'commit', label: 'Amend without changing message', command: 'git commit --amend --no-edit', description: 'Add staged changes to the last commit' },

  // Push & Pull
  { category: 'remote', label: 'Push to remote', command: 'git push origin {branch}', description: 'Push branch to remote', params: [{ key: 'branch', label: 'Branch', placeholder: 'main', default: 'main' }] },
  { category: 'remote', label: 'Push (set upstream)', command: 'git push -u origin {branch}', description: 'Push and set tracking branch', params: [{ key: 'branch', label: 'Branch', placeholder: 'feature/my-feature' }] },
  { category: 'remote', label: 'Pull latest', command: 'git pull origin {branch}', description: 'Pull and merge remote changes', params: [{ key: 'branch', label: 'Branch', placeholder: 'main', default: 'main' }] },
  { category: 'remote', label: 'Fetch all', command: 'git fetch --all', description: 'Download all remote refs without merging' },
  { category: 'remote', label: 'Force push', command: 'git push --force-with-lease origin {branch}', description: 'Force push (safe version)', params: [{ key: 'branch', label: 'Branch', placeholder: 'feature/my-feature' }] },

  // Merge & Rebase
  { category: 'merge', label: 'Merge branch', command: 'git merge {branch}', description: 'Merge another branch into current', params: [{ key: 'branch', label: 'Branch to merge', placeholder: 'feature/my-feature' }] },
  { category: 'merge', label: 'Rebase onto branch', command: 'git rebase {branch}', description: 'Rebase current branch onto another', params: [{ key: 'branch', label: 'Base branch', placeholder: 'main' }] },
  { category: 'merge', label: 'Abort merge', command: 'git merge --abort', description: 'Cancel an in-progress merge' },
  { category: 'merge', label: 'Abort rebase', command: 'git rebase --abort', description: 'Cancel an in-progress rebase' },
  { category: 'merge', label: 'Cherry-pick commit', command: 'git cherry-pick {hash}', description: 'Apply a specific commit to current branch', params: [{ key: 'hash', label: 'Commit hash', placeholder: 'abc1234' }] },

  // Undo & Reset
  { category: 'undo', label: 'Unstage file', command: 'git restore --staged {file}', description: 'Remove file from staging area', params: [{ key: 'file', label: 'File path', placeholder: 'src/index.ts' }] },
  { category: 'undo', label: 'Discard changes in file', command: 'git restore {file}', description: 'Revert file to last committed state', params: [{ key: 'file', label: 'File path', placeholder: 'src/index.ts' }] },
  { category: 'undo', label: 'Soft reset (keep changes)', command: 'git reset --soft HEAD~{n}', description: 'Undo commits but keep changes staged', params: [{ key: 'n', label: 'Number of commits', placeholder: '1', default: '1' }] },
  { category: 'undo', label: 'Hard reset (discard all)', command: 'git reset --hard HEAD~{n}', description: 'Undo commits and discard all changes', params: [{ key: 'n', label: 'Number of commits', placeholder: '1', default: '1' }] },
  { category: 'undo', label: 'Revert commit (safe)', command: 'git revert {hash}', description: 'Create a new commit that undoes a previous one', params: [{ key: 'hash', label: 'Commit hash', placeholder: 'abc1234' }] },

  // Stash
  { category: 'stash', label: 'Stash changes', command: 'git stash', description: 'Temporarily save uncommitted changes' },
  { category: 'stash', label: 'Stash with message', command: 'git stash push -m "{message}"', description: 'Stash with a descriptive name', params: [{ key: 'message', label: 'Stash message', placeholder: 'WIP: fixing login bug' }] },
  { category: 'stash', label: 'Apply last stash', command: 'git stash pop', description: 'Restore last stashed changes and remove stash' },
  { category: 'stash', label: 'List stashes', command: 'git stash list', description: 'Show all stashed changes' },

  // Info
  { category: 'info', label: 'Show status', command: 'git status', description: 'Show working tree status' },
  { category: 'info', label: 'Show log (oneline)', command: 'git log --oneline -n {n}', description: 'Show compact commit history', params: [{ key: 'n', label: 'Number of commits', placeholder: '10', default: '10' }] },
  { category: 'info', label: 'Show diff', command: 'git diff', description: 'Show unstaged changes' },
  { category: 'info', label: 'Show diff (staged)', command: 'git diff --staged', description: 'Show staged changes' },
  { category: 'info', label: 'Show file history', command: 'git log --follow -p {file}', description: 'Show full history of a file', params: [{ key: 'file', label: 'File path', placeholder: 'src/index.ts' }] },

  // Tags
  { category: 'tag', label: 'Create tag', command: 'git tag {tag}', description: 'Create a lightweight tag', params: [{ key: 'tag', label: 'Tag name', placeholder: 'v1.0.0' }] },
  { category: 'tag', label: 'Create annotated tag', command: 'git tag -a {tag} -m "{message}"', description: 'Create an annotated tag', params: [{ key: 'tag', label: 'Tag name', placeholder: 'v1.0.0' }, { key: 'message', label: 'Tag message', placeholder: 'Release v1.0.0' }] },
  { category: 'tag', label: 'Push tags', command: 'git push origin --tags', description: 'Push all local tags to remote' },
];

const categoryLabels: Record<string, string> = {
  init: 'Init & Clone',
  branch: 'Branch',
  commit: 'Stage & Commit',
  remote: 'Push & Pull',
  merge: 'Merge & Rebase',
  undo: 'Undo & Reset',
  stash: 'Stash',
  info: 'Info & Log',
  tag: 'Tags',
};

export default function GitCommandGenerator() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['git-command-generator'];
  const [activeCategory, setActiveCategory] = useState('init');
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [selectedCmd, setSelectedCmd] = useState<GitCommand | null>(null);

  const filteredCommands = gitCommands.filter(c => c.category === activeCategory);

  const buildCommand = (cmd: GitCommand): string => {
    let result = cmd.command;
    if (cmd.params) {
      for (const p of cmd.params) {
        const val = paramValues[`${cmd.label}-${p.key}`] || p.default || `<${p.label}>`;
        result = result.replace(`{${p.key}}`, val);
      }
    }
    return result;
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="git-command-generator"
    >
      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {Object.keys(categoryLabels).map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSelectedCmd(null); }}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: 'none',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              background: activeCategory === cat ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'var(--bg-input)',
              color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Commands list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filteredCommands.map(cmd => {
          const isSelected = selectedCmd?.label === cmd.label;
          const finalCommand = buildCommand(cmd);
          return (
            <div
              key={cmd.label}
              style={{
                background: isSelected ? 'rgba(59,130,246,0.08)' : 'var(--bg-input)',
                border: `1px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                borderRadius: 10,
                padding: 16,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => setSelectedCmd(isSelected ? null : cmd)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {cmd.label}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {cmd.description}
                  </div>
                </div>
                <CopyButton text={finalCommand} label={dict.common.copy} />
              </div>

              {/* Command display */}
              <div style={{
                marginTop: 10,
                padding: '8px 12px',
                background: 'var(--bg-primary)',
                borderRadius: 6,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: 'var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ color: 'var(--text-secondary)', userSelect: 'none' }}>$</span>
                {finalCommand}
              </div>

              {/* Parameter inputs (expanded when selected) */}
              {isSelected && cmd.params && cmd.params.length > 0 && (
                <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {cmd.params.map(p => (
                    <div key={p.key} style={{ flex: '1 1 200px' }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                        {p.label}
                      </label>
                      <input
                        type="text"
                        placeholder={p.placeholder}
                        value={paramValues[`${cmd.label}-${p.key}`] || ''}
                        onChange={e => setParamValues(prev => ({ ...prev, [`${cmd.label}-${p.key}`]: e.target.value }))}
                        onClick={e => e.stopPropagation()}
                        style={{ fontSize: 13, padding: '6px 10px' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
