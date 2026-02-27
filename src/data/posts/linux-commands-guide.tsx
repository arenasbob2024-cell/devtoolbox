'use client';

import React from 'react';

const translations = {
  en: {
    title: 'Linux Commands Guide — Essential Command Line Reference for Developers',
    description:
      'A comprehensive reference for Linux command line tools. Covers file system navigation, text processing, process management, networking, permissions, SSH, and shell productivity tips with real examples.',
    content: 'en',
  },
  zh: {
    title: 'Linux 命令指南 — 开发者必备命令行参考手册',
    description:
      '全面的 Linux 命令行工具参考手册，涵盖文件系统导航、文本处理、进程管理、网络命令、权限管理、SSH 远程连接和 Shell 效率技巧，附带真实示例。',
    content: 'zh',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I find a file by name in Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the find command: `find /path -name "filename.txt"`. For case-insensitive search use `-iname`. To search only in the current directory and its subdirectories: `find . -name "*.log"`. The locate command is faster for system-wide searches after running `updatedb`.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between cp and mv in Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '`cp` copies a file or directory, leaving the original intact. `mv` moves (or renames) a file or directory, removing it from the source location. Use `cp -r` for directories and `mv` when you want to rename or relocate without duplication.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check disk usage in Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use `df -h` to see filesystem disk space usage in human-readable format. Use `du -sh /path` to see the size of a specific directory. `du -sh *` lists sizes of all items in the current directory. `ncdu` is an interactive ncurses-based alternative.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I kill a process by name in Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use `pkill processname` to kill by name, or `killall processname`. To find the PID first, run `pgrep processname` or `ps aux | grep processname`, then use `kill PID`. For force kill use `kill -9 PID` or `pkill -9 processname`.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does chmod 755 mean in Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'chmod 755 sets permissions: owner can read/write/execute (7=4+2+1), group can read/execute (5=4+0+1), others can read/execute (5=4+0+1). This is a common permission for web server directories and executable scripts. Use `chmod +x file` to simply add execute permission.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I search for text inside files in Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use `grep "pattern" filename` for basic search. For recursive search in a directory: `grep -r "pattern" /path`. Case-insensitive: `grep -i "pattern"`. Show line numbers: `grep -n "pattern" file`. Use `grep -l` to list only filenames that match. For regex patterns use `grep -E` or `egrep`.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I connect to a remote server using SSH?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use `ssh username@hostname` or `ssh username@IP_address`. Specify a port with `-p`: `ssh -p 2222 user@host`. Use key-based authentication with `-i`: `ssh -i ~/.ssh/id_rsa user@host`. To run a command remotely: `ssh user@host "ls -la"`. Add hosts to ~/.ssh/config for convenient aliases.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use pipes and redirects in Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pipes (`|`) send output of one command to another: `ls -la | grep ".txt"`. Redirect output to a file with `>` (overwrite) or `>>` (append): `echo "hello" > file.txt`. Redirect stderr with `2>`: `command 2> errors.log`. Redirect both stdout and stderr: `command > output.log 2>&1`. Read input from a file with `<`.',
      },
    },
  ],
};

const codeStyle: React.CSSProperties = {
  backgroundColor: '#1e293b',
  color: '#e2e8f0',
  padding: '16px 20px',
  borderRadius: '8px',
  fontFamily: 'monospace',
  fontSize: '14px',
  lineHeight: '1.7',
  overflowX: 'auto',
  margin: '16px 0',
  whiteSpace: 'pre',
  display: 'block',
};

const inlineCodeStyle: React.CSSProperties = {
  backgroundColor: '#f1f5f9',
  color: '#0f172a',
  padding: '2px 6px',
  borderRadius: '4px',
  fontFamily: 'monospace',
  fontSize: '0.875em',
};

const h2Style: React.CSSProperties = {
  fontSize: '1.6rem',
  fontWeight: 700,
  color: '#0f172a',
  marginTop: '48px',
  marginBottom: '16px',
  borderBottom: '2px solid #e2e8f0',
  paddingBottom: '8px',
};

const h3Style: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#1e293b',
  marginTop: '32px',
  marginBottom: '12px',
};

const pStyle: React.CSSProperties = {
  lineHeight: '1.8',
  color: '#374151',
  marginBottom: '16px',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '24px',
  fontSize: '14px',
};

const thStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  padding: '10px 14px',
  textAlign: 'left',
  fontWeight: 600,
  color: '#374151',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  padding: '10px 14px',
  color: '#374151',
  verticalAlign: 'top',
};

const tdAltStyle: React.CSSProperties = {
  ...tdStyle,
  backgroundColor: '#f8fafc',
};

function EnglishContent() {
  return (
    <article style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '860px', margin: '0 auto', padding: '0 16px' }}>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '1rem', color: '#0369a1', marginBottom: '8px' }}>TL;DR</p>
        <p style={{ color: '#0c4a6e', lineHeight: '1.7', margin: 0 }}>
          This guide covers the essential Linux commands every developer needs — from navigating the filesystem and managing files, to processing text, managing processes, configuring permissions, and working over SSH. Each section includes real command examples with flags explained and developer-focused tips.
        </p>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '40px',
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b', marginBottom: '12px' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.9', color: '#374151' }}>
          <li><code style={inlineCodeStyle}>find</code> and <code style={inlineCodeStyle}>grep</code> are the most versatile search tools — master their flags early</li>
          <li>Use pipes (<code style={inlineCodeStyle}>|</code>) to chain commands and build powerful one-liners</li>
          <li><code style={inlineCodeStyle}>chmod</code>, <code style={inlineCodeStyle}>chown</code> control access — understand octal vs symbolic modes</li>
          <li><code style={inlineCodeStyle}>ps aux</code>, <code style={inlineCodeStyle}>top</code>, and <code style={inlineCodeStyle}>kill</code> are your process management trio</li>
          <li>SSH key-based auth + <code style={inlineCodeStyle}>~/.ssh/config</code> makes remote work seamless</li>
          <li><code style={inlineCodeStyle}>alias</code> and shell functions save hours of repetitive typing</li>
          <li><code style={inlineCodeStyle}>rsync</code> is superior to <code style={inlineCodeStyle}>scp</code> for large or incremental file transfers</li>
          <li>Always test destructive commands with <code style={inlineCodeStyle}>--dry-run</code> or <code style={inlineCodeStyle}>echo</code> first</li>
        </ul>
      </div>

      {/* Introduction */}
      <h2 style={h2Style}>Introduction</h2>
      <p style={pStyle}>
        The Linux command line is one of the most powerful tools in a developer&apos;s arsenal. Whether you&apos;re deploying applications to production servers, automating build pipelines, debugging issues, or managing files efficiently, mastery of the terminal separates productive developers from those who struggle with their tools.
      </p>
      <p style={pStyle}>
        This guide serves as a comprehensive reference covering the commands you&apos;ll use daily. Each command is shown with practical flags and real-world examples. Rather than simply listing syntax, we explain <em>when</em> and <em>why</em> to use each command, with a focus on developer workflows.
      </p>

      {/* 1. File System Navigation */}
      <h2 style={h2Style}>1. File System Navigation</h2>
      <p style={pStyle}>
        Understanding how to move around the Linux filesystem efficiently is the foundation of everything else. These commands help you orient yourself and locate files.
      </p>

      <h3 style={h3Style}>ls — List Directory Contents</h3>
      <p style={pStyle}><code style={inlineCodeStyle}>ls</code> is the most frequently used command. It lists files and directories in the current or specified path.</p>
      <code style={codeStyle}>{`# Basic listing
ls

# Long format with permissions, owner, size, date
ls -l

# Include hidden files (dotfiles)
ls -la

# Human-readable file sizes
ls -lh

# Sort by modification time, newest first
ls -lt

# Reverse order (oldest first)
ls -ltr

# List specific directory
ls -la /var/log

# Recursive listing
ls -R /etc/nginx`}</code>

      <h3 style={h3Style}>cd — Change Directory</h3>
      <code style={codeStyle}>{`# Go to home directory
cd
cd ~

# Go to previous directory
cd -

# Go up one level
cd ..

# Go up two levels
cd ../..

# Absolute path
cd /var/www/html

# Relative path
cd ../projects/myapp`}</code>

      <h3 style={h3Style}>pwd — Print Working Directory</h3>
      <code style={codeStyle}>{`# Print current directory
pwd

# Resolve symlinks (show physical path)
pwd -P`}</code>

      <h3 style={h3Style}>find — Search for Files</h3>
      <p style={pStyle}><code style={inlineCodeStyle}>find</code> is extremely powerful for locating files based on name, type, size, date, permissions, and more.</p>
      <code style={codeStyle}>{`# Find by name (exact)
find /home -name "config.json"

# Find by name (case-insensitive)
find . -iname "readme*"

# Find all .log files
find /var/log -name "*.log"

# Find files modified in the last 7 days
find . -mtime -7

# Find files larger than 100MB
find / -size +100M

# Find empty files
find . -empty -type f

# Find and execute: delete all .tmp files
find . -name "*.tmp" -exec rm {} \;

# Find directories only
find . -type d -name "node_modules"

# Find and print with details
find . -name "*.py" -ls

# Exclude a directory from search
find . -path ./node_modules -prune -o -name "*.js" -print`}</code>

      <h3 style={h3Style}>locate — Fast File Lookup</h3>
      <code style={codeStyle}>{`# Locate a file (uses prebuilt index)
locate nginx.conf

# Case-insensitive
locate -i myfile

# Limit results
locate -n 10 "*.conf"

# Update the database (run as root)
sudo updatedb`}</code>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Command</th>
            <th style={thStyle}>Speed</th>
            <th style={thStyle}>Real-time</th>
            <th style={thStyle}>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><code style={inlineCodeStyle}>find</code></td>
            <td style={tdStyle}>Slower</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>Complex criteria, new files, scripts</td>
          </tr>
          <tr>
            <td style={tdAltStyle}><code style={inlineCodeStyle}>locate</code></td>
            <td style={tdAltStyle}>Very fast</td>
            <td style={tdAltStyle}>No (uses index)</td>
            <td style={tdAltStyle}>Quick system-wide name search</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={inlineCodeStyle}>which</code></td>
            <td style={tdStyle}>Instant</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>Finding executable path</td>
          </tr>
          <tr>
            <td style={tdAltStyle}><code style={inlineCodeStyle}>whereis</code></td>
            <td style={tdAltStyle}>Fast</td>
            <td style={tdAltStyle}>Yes</td>
            <td style={tdAltStyle}>Binary + man page locations</td>
          </tr>
        </tbody>
      </table>

      {/* 2. File Operations */}
      <h2 style={h2Style}>2. File Operations</h2>

      <h3 style={h3Style}>cp — Copy Files and Directories</h3>
      <code style={codeStyle}>{`# Copy a file
cp source.txt destination.txt

# Copy to directory
cp file.txt /tmp/

# Copy directory recursively
cp -r mydir/ /backup/mydir/

# Preserve timestamps and permissions
cp -p file.txt /backup/

# Interactive (prompt before overwrite)
cp -i source.txt dest.txt

# Verbose output
cp -v *.conf /etc/nginx/conf.d/

# Copy multiple files
cp file1.txt file2.txt /destination/`}</code>

      <h3 style={h3Style}>mv — Move or Rename</h3>
      <code style={codeStyle}>{`# Rename a file
mv oldname.txt newname.txt

# Move to directory
mv file.txt /tmp/

# Move directory
mv mydir/ /var/www/

# Interactive (prompt before overwrite)
mv -i source.txt dest.txt

# Move multiple files
mv *.log /var/log/archive/`}</code>

      <h3 style={h3Style}>rm — Remove Files and Directories</h3>
      <code style={codeStyle}>{`# Remove a file
rm file.txt

# Interactive (prompt for each file)
rm -i file.txt

# Remove directory recursively (CAREFUL!)
rm -rf mydir/

# Remove with verbose output
rm -v *.tmp

# Force removal (ignore nonexistent files)
rm -f file.txt

# Tip: always dry-run with echo first
echo rm -rf /some/path`}</code>

      <h3 style={h3Style}>mkdir — Create Directories</h3>
      <code style={codeStyle}>{`# Create a directory
mkdir myproject

# Create with parents (no error if exists)
mkdir -p /var/log/myapp/2024

# Create with specific permissions
mkdir -m 755 public_dir

# Create multiple directories
mkdir src tests docs`}</code>

      <h3 style={h3Style}>touch — Create Files / Update Timestamps</h3>
      <code style={codeStyle}>{`# Create empty file
touch newfile.txt

# Create multiple files
touch file1.txt file2.txt file3.txt

# Update access and modification time
touch existingfile.txt

# Set specific timestamp
touch -t 202401011200 file.txt`}</code>

      <h3 style={h3Style}>ln — Create Links</h3>
      <code style={codeStyle}>{`# Hard link (same inode, same filesystem)
ln original.txt hardlink.txt

# Symbolic (soft) link
ln -s /path/to/original symlink

# Symbolic link to directory
ln -s /var/www/html /home/user/www

# Overwrite existing symlink
ln -sf /new/target existing_symlink

# List symlinks
ls -la | grep "->"`}</code>

      {/* 3. Text Processing */}
      <h2 style={h2Style}>3. Text Processing</h2>
      <p style={pStyle}>
        Linux text processing tools are among the most powerful in the ecosystem. Chained together with pipes, they form a complete data transformation pipeline.
      </p>

      <h3 style={h3Style}>cat — Concatenate and Display Files</h3>
      <code style={codeStyle}>{`# Display file content
cat file.txt

# Display with line numbers
cat -n file.txt

# Concatenate multiple files
cat file1.txt file2.txt > combined.txt

# Create file with content (end with Ctrl+D)
cat > newfile.txt

# Append to file
cat >> file.txt`}</code>

      <h3 style={h3Style}>grep — Search Text Patterns</h3>
      <code style={codeStyle}>{`# Search for pattern
grep "error" logfile.txt

# Case-insensitive search
grep -i "Error" logfile.txt

# Recursive search in directory
grep -r "TODO" ./src/

# Show line numbers
grep -n "function" app.js

# Show only filenames with matches
grep -l "import React" src/**/*.tsx

# Invert match (lines NOT containing pattern)
grep -v "debug" logfile.txt

# Count matching lines
grep -c "ERROR" logfile.txt

# Extended regex
grep -E "error|warning|critical" app.log

# Context: show 3 lines before and after match
grep -C 3 "NullPointerException" error.log

# Match whole words only
grep -w "cat" file.txt

# Highlight matches
grep --color=auto "pattern" file.txt`}</code>

      <h3 style={h3Style}>sed — Stream Editor</h3>
      <code style={codeStyle}>{`# Replace first occurrence per line
sed 's/old/new/' file.txt

# Replace all occurrences (global)
sed 's/old/new/g' file.txt

# Edit file in-place
sed -i 's/old/new/g' file.txt

# Create backup before editing
sed -i.bak 's/localhost/production.db/g' config.env

# Delete lines matching pattern
sed '/^#/d' config.txt

# Delete blank lines
sed '/^$/d' file.txt

# Print specific line numbers
sed -n '10,20p' file.txt

# Insert line after pattern
sed '/^server/a\    listen 443 ssl;' nginx.conf`}</code>

      <h3 style={h3Style}>awk — Pattern Processing</h3>
      <code style={codeStyle}>{`# Print second column of CSV
awk -F',' '{print $2}' data.csv

# Print lines where 3rd column > 100
awk '$3 > 100' data.txt

# Sum column values
awk '{sum += $3} END {print sum}' data.txt

# Print filename and line count
awk 'END {print FILENAME, NR}' file.txt

# Process /etc/passwd: print username and shell
awk -F: '{print $1, $7}' /etc/passwd

# Multiple operations
awk '{gsub(/foo/, "bar"); print}' file.txt

# Print lines between two patterns
awk '/START/,/END/' file.txt`}</code>

      <h3 style={h3Style}>cut, sort, uniq, wc</h3>
      <code style={codeStyle}>{`# cut: extract fields
cut -d',' -f1,3 data.csv          # fields 1 and 3
cut -c1-10 file.txt               # first 10 characters

# sort: sort lines
sort file.txt                     # alphabetical
sort -n numbers.txt               # numeric
sort -r file.txt                  # reverse
sort -k2 data.txt                 # sort by column 2
sort -u file.txt                  # unique (remove dupes)

# uniq: filter duplicate lines (requires sorted input)
sort file.txt | uniq              # remove duplicates
sort file.txt | uniq -c           # count occurrences
sort file.txt | uniq -d           # show only duplicates

# wc: word/line/character count
wc -l file.txt                    # line count
wc -w file.txt                    # word count
wc -c file.txt                    # byte count
wc file.txt                       # all: lines words bytes`}</code>

      {/* 4. Process Management */}
      <h2 style={h2Style}>4. Process Management</h2>

      <h3 style={h3Style}>ps — Process Status</h3>
      <code style={codeStyle}>{`# All processes with full info
ps aux

# Show processes for current user
ps -u $USER

# Tree view showing parent/child
ps -ejH
pstree

# Find process by name
ps aux | grep nginx

# Sort by CPU usage
ps aux --sort=-%cpu | head -10

# Sort by memory usage
ps aux --sort=-%mem | head -10`}</code>

      <h3 style={h3Style}>top and htop — Real-Time Monitor</h3>
      <code style={codeStyle}>{`# Launch top (interactive)
top

# top keyboard shortcuts:
# q = quit
# k = kill process (enter PID)
# M = sort by memory
# P = sort by CPU
# u = filter by user

# htop (enhanced, more user-friendly)
htop

# Top for specific user
top -u www-data

# Non-interactive, 1 iteration, no header
top -bn1 | grep "Cpu(s)"`}</code>

      <h3 style={h3Style}>kill — Terminate Processes</h3>
      <code style={codeStyle}>{`# Graceful terminate (SIGTERM, default)
kill PID

# Force kill (SIGKILL — cannot be caught)
kill -9 PID

# Kill by name
pkill nginx
killall node

# Force kill by name
pkill -9 python

# Send signal to all matching processes
pkill -HUP nginx    # reload nginx config

# Find PID first
pgrep -l node

# Kill all processes of a user
pkill -u username`}</code>

      <h3 style={h3Style}>jobs, bg, fg, nohup</h3>
      <code style={codeStyle}>{`# List background jobs
jobs

# Suspend current process
Ctrl+Z

# Resume in background
bg %1

# Bring to foreground
fg %1

# Run in background from start
command &

# Run immune to hangup signal (survives logout)
nohup ./server.sh &

# Disown a running job (detach from shell)
disown %1

# Run with output to file
nohup python app.py > app.log 2>&1 &`}</code>

      {/* 5. Permissions & Ownership */}
      <h2 style={h2Style}>5. Permissions and Ownership</h2>

      <h3 style={h3Style}>chmod — Change File Mode</h3>
      <p style={pStyle}>Linux permissions use a 3-tier system: owner, group, others. Each tier can have read (4), write (2), execute (1) permissions.</p>
      <code style={codeStyle}>{`# Symbolic mode
chmod +x script.sh           # add execute for all
chmod -w file.txt            # remove write for all
chmod u+x,g-w file.txt      # add exec for user, remove write for group
chmod a+r file.txt           # add read for all

# Octal mode (most common)
chmod 755 script.sh          # rwxr-xr-x (owner rwx, group rx, others rx)
chmod 644 config.txt         # rw-r--r-- (owner rw, group r, others r)
chmod 600 ~/.ssh/id_rsa      # rw------- (owner only)
chmod 777 public_dir         # rwxrwxrwx (AVOID in production)

# Recursive
chmod -R 755 /var/www/html

# Common patterns:
# 755 — directories, executables
# 644 — regular files
# 600 — private keys, sensitive config
# 700 — private directories`}</code>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Octal</th>
            <th style={thStyle}>Symbolic</th>
            <th style={thStyle}>Meaning</th>
            <th style={thStyle}>Common Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>777</td>
            <td style={tdStyle}>rwxrwxrwx</td>
            <td style={tdStyle}>All can read/write/exec</td>
            <td style={tdStyle}>Avoid in production</td>
          </tr>
          <tr>
            <td style={tdAltStyle}>755</td>
            <td style={tdAltStyle}>rwxr-xr-x</td>
            <td style={tdAltStyle}>Owner full, others read+exec</td>
            <td style={tdAltStyle}>Directories, scripts</td>
          </tr>
          <tr>
            <td style={tdStyle}>644</td>
            <td style={tdStyle}>rw-r--r--</td>
            <td style={tdStyle}>Owner rw, others read-only</td>
            <td style={tdStyle}>Config files, web assets</td>
          </tr>
          <tr>
            <td style={tdAltStyle}>600</td>
            <td style={tdAltStyle}>rw-------</td>
            <td style={tdAltStyle}>Owner only</td>
            <td style={tdAltStyle}>SSH keys, secrets</td>
          </tr>
          <tr>
            <td style={tdStyle}>400</td>
            <td style={tdStyle}>r--------</td>
            <td style={tdStyle}>Owner read-only</td>
            <td style={tdStyle}>Certificates</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>chown and chgrp — Change Ownership</h3>
      <code style={codeStyle}>{`# Change owner
chown newuser file.txt

# Change owner and group
chown newuser:newgroup file.txt

# Change group only
chgrp www-data /var/www/html

# Recursive ownership change
chown -R www-data:www-data /var/www/html

# Preserve root (prevent accidental root recursion)
chown --preserve-root -R user:group /dir

# Check current ownership
ls -la file.txt
stat file.txt`}</code>

      {/* 6. Network Commands */}
      <h2 style={h2Style}>6. Network Commands</h2>

      <h3 style={h3Style}>curl — Transfer Data with URLs</h3>
      <code style={codeStyle}>{`# GET request
curl https://api.example.com/users

# POST with JSON body
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# Send Authorization header
curl -H "Authorization: Bearer TOKEN" https://api.example.com/me

# Download file
curl -O https://example.com/file.tar.gz

# Download with custom filename
curl -o output.tar.gz https://example.com/archive.tar.gz

# Follow redirects
curl -L https://example.com

# Show response headers
curl -I https://example.com

# Verbose output (for debugging)
curl -v https://example.com

# Upload file
curl -F "file=@/path/to/file.txt" https://upload.example.com

# Resume download
curl -C - -O https://example.com/bigfile.iso`}</code>

      <h3 style={h3Style}>wget — Download Files</h3>
      <code style={codeStyle}>{`# Download file
wget https://example.com/file.tar.gz

# Download in background
wget -b https://example.com/bigfile.iso

# Resume interrupted download
wget -c https://example.com/file.tar.gz

# Mirror website
wget -r -np https://example.com/docs/

# Limit download speed
wget --limit-rate=1m https://example.com/file.iso

# Download multiple URLs from file
wget -i urls.txt`}</code>

      <h3 style={h3Style}>ping, netstat, ss, ip</h3>
      <code style={codeStyle}>{`# ping: test connectivity
ping google.com
ping -c 4 8.8.8.8          # send 4 packets
ping -i 0.5 host           # 0.5s interval

# netstat: network connections (older)
netstat -tuln               # listening ports
netstat -anp | grep :80     # connections on port 80

# ss: modern replacement for netstat
ss -tuln                    # listening TCP/UDP
ss -tp                      # show process names
ss -s                       # summary statistics
ss -tnp state established   # established connections

# ip: modern network interface tool
ip addr show                # show all interfaces
ip addr show eth0           # specific interface
ip route show               # routing table
ip link set eth0 up/down    # bring interface up/down
ip -s link                  # interface statistics

# ifconfig (legacy but still common)
ifconfig
ifconfig eth0`}</code>

      {/* 7. Disk & Memory */}
      <h2 style={h2Style}>7. Disk and Memory Management</h2>

      <h3 style={h3Style}>df — Disk Filesystem Usage</h3>
      <code style={codeStyle}>{`# Human-readable sizes
df -h

# Specific filesystem
df -h /var

# Include filesystem type
df -Th

# Show inode usage
df -i

# Show only local filesystems
df -hl`}</code>

      <h3 style={h3Style}>du — Disk Usage of Files/Directories</h3>
      <code style={codeStyle}>{`# Summary of current directory
du -sh .

# Summary of specific directory
du -sh /var/log

# All items in current directory, sorted
du -sh * | sort -h

# Top 10 largest directories
du -h /var | sort -rh | head -10

# Exclude directory
du -sh --exclude=node_modules /myproject

# Show at depth 1
du -h --max-depth=1 /home`}</code>

      <h3 style={h3Style}>free — Memory Usage</h3>
      <code style={codeStyle}>{`# Human-readable memory info
free -h

# In megabytes
free -m

# Show total line
free -ht

# Watch memory continuously
watch -n 1 free -h`}</code>

      <h3 style={h3Style}>lsblk — List Block Devices</h3>
      <code style={codeStyle}>{`# List all block devices
lsblk

# Show filesystem type and mount points
lsblk -f

# Show in tree format with sizes
lsblk -t`}</code>

      {/* 8. Package Management */}
      <h2 style={h2Style}>8. Package Management</h2>

      <h3 style={h3Style}>apt — Debian / Ubuntu</h3>
      <code style={codeStyle}>{`# Update package list
sudo apt update

# Upgrade all packages
sudo apt upgrade

# Install a package
sudo apt install nginx

# Remove a package
sudo apt remove nginx

# Remove with config files
sudo apt purge nginx

# Search for packages
apt search keyword

# Show package info
apt show nginx

# List installed packages
apt list --installed

# Clean package cache
sudo apt autoremove && sudo apt clean`}</code>

      <h3 style={h3Style}>yum / dnf — RHEL / CentOS / Fedora</h3>
      <code style={codeStyle}>{`# Update all packages
sudo yum update

# Install package
sudo yum install httpd

# Remove package
sudo yum remove httpd

# Search packages
yum search nginx

# Show package info
yum info nginx

# dnf (modern replacement for yum)
sudo dnf install nginx
sudo dnf update
sudo dnf remove nginx`}</code>

      <h3 style={h3Style}>brew — macOS Homebrew</h3>
      <code style={codeStyle}>{`# Update Homebrew
brew update

# Install package
brew install node

# Upgrade package
brew upgrade node

# Upgrade all
brew upgrade

# Remove package
brew uninstall node

# Search packages
brew search redis

# List installed
brew list

# Show info
brew info nginx`}</code>

      {/* 9. SSH & Remote */}
      <h2 style={h2Style}>9. SSH and Remote Access</h2>

      <h3 style={h3Style}>ssh — Secure Shell</h3>
      <code style={codeStyle}>{`# Basic connection
ssh user@hostname
ssh user@192.168.1.100

# Specify port
ssh -p 2222 user@host

# Use identity file (private key)
ssh -i ~/.ssh/id_rsa user@host

# Run a command remotely
ssh user@host "ls -la /var/www"

# X11 forwarding (GUI apps)
ssh -X user@host

# SSH tunneling (local port forward)
ssh -L 8080:localhost:80 user@host

# Reverse tunnel
ssh -R 9090:localhost:3000 user@host

# Keep connection alive
ssh -o ServerAliveInterval=60 user@host`}</code>

      <h3 style={h3Style}>SSH Config File</h3>
      <p style={pStyle}>Create <code style={inlineCodeStyle}>~/.ssh/config</code> for convenient aliases and settings:</p>
      <code style={codeStyle}>{`# ~/.ssh/config
Host myserver
    HostName 192.168.1.100
    User deploy
    Port 2222
    IdentityFile ~/.ssh/deploy_key
    ServerAliveInterval 60

Host staging
    HostName staging.example.com
    User ubuntu
    ForwardAgent yes

# Now connect with:
ssh myserver
ssh staging`}</code>

      <h3 style={h3Style}>scp — Secure Copy</h3>
      <code style={codeStyle}>{`# Copy file to remote
scp local_file.txt user@host:/remote/path/

# Copy file from remote
scp user@host:/remote/file.txt ./local/

# Copy directory recursively
scp -r ./mydir user@host:/home/user/

# Specify port
scp -P 2222 file.txt user@host:/tmp/`}</code>

      <h3 style={h3Style}>rsync — Efficient File Sync</h3>
      <p style={pStyle}><code style={inlineCodeStyle}>rsync</code> only transfers changed files, making it far more efficient than <code style={inlineCodeStyle}>scp</code> for large or repeated transfers.</p>
      <code style={codeStyle}>{`# Sync local to remote
rsync -avz ./src/ user@host:/var/www/app/

# Sync remote to local
rsync -avz user@host:/var/www/ ./backup/

# Delete files on destination not in source
rsync -avz --delete ./src/ user@host:/var/www/

# Dry run (show what would be transferred)
rsync -avzn ./src/ user@host:/var/www/

# Exclude directory
rsync -avz --exclude='node_modules' ./src/ user@host:/app/

# Use custom SSH port
rsync -avz -e "ssh -p 2222" ./src/ user@host:/var/www/

# Flags explained:
# -a  archive mode (recursive + preserve permissions)
# -v  verbose
# -z  compress during transfer
# -n  dry run`}</code>

      {/* 10. Shell Productivity */}
      <h2 style={h2Style}>10. Shell Productivity</h2>

      <h3 style={h3Style}>alias — Command Shortcuts</h3>
      <code style={codeStyle}>{`# Create temporary alias
alias ll='ls -la'
alias gs='git status'
alias gp='git pull'
alias dc='docker-compose'

# Make permanent: add to ~/.bashrc or ~/.zshrc
echo "alias ll='ls -la'" >> ~/.bashrc
source ~/.bashrc

# Remove alias
unalias ll

# List all aliases
alias

# Common useful aliases
alias ..='cd ..'
alias ...='cd ../..'
alias grep='grep --color=auto'
alias mkdir='mkdir -p'
alias ports='netstat -tulanp'`}</code>

      <h3 style={h3Style}>history — Command History</h3>
      <code style={codeStyle}>{`# Show history
history

# Show last 20 commands
history 20

# Search history interactively
Ctrl+R  # then type to search

# Run command by number
!42

# Run last command
!!

# Run last command starting with string
!git

# Clear history
history -c

# Search history with grep
history | grep "docker"`}</code>

      <h3 style={h3Style}>Pipes and Redirects</h3>
      <code style={codeStyle}>{`# Pipe: send stdout to next command
ls -la | grep ".txt"
ps aux | grep nginx | grep -v grep
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10

# Redirect stdout to file (overwrite)
ls -la > filelist.txt

# Append stdout to file
echo "new line" >> notes.txt

# Redirect stderr to file
command 2> errors.log

# Redirect both stdout and stderr
command > output.log 2>&1

# Discard output
command > /dev/null 2>&1

# Read from file
sort < unsorted.txt

# Here document
cat << EOF > config.txt
server=localhost
port=5432
EOF

# Tee: write to file AND stdout
command | tee output.txt
command | tee -a output.txt  # append`}</code>

      <h3 style={h3Style}>xargs — Build and Execute Commands</h3>
      <code style={codeStyle}>{`# Delete all .log files found
find /var/log -name "*.log" | xargs rm -f

# Run command for each line
cat urls.txt | xargs curl -O

# Parallel execution (-P)
cat files.txt | xargs -P 4 -I{} process_file {}

# Prompt before execution
echo "file.txt" | xargs -p rm

# Handle filenames with spaces (-0 with find -print0)
find . -name "*.txt" -print0 | xargs -0 wc -l`}</code>

      <h3 style={h3Style}>Useful One-Liners for Developers</h3>
      <code style={codeStyle}>{`# Find all TODO comments in codebase
grep -rn "TODO" ./src --include="*.ts"

# Count lines of code by extension
find . -name "*.js" | xargs wc -l | tail -1

# Watch a log file in real-time
tail -f /var/log/nginx/access.log

# Monitor file for changes
watch -n 2 ls -la /var/www/uploads/

# Show top 10 most-used commands
history | awk '{print $2}' | sort | uniq -c | sort -rn | head -10

# Kill all node processes
pkill -f node

# Find which process is using port 3000
lsof -i :3000
ss -tlnp | grep 3000

# Generate random password
openssl rand -base64 32

# Base64 encode/decode
echo "hello" | base64
echo "aGVsbG8=" | base64 -d

# Download and execute install script
curl -fsSL https://get.docker.com | sh

# Check if command exists
command -v docker && echo "Docker installed" || echo "Not found"`}</code>

      {/* FAQs */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>How do I find a file by name in Linux?</h3>
        <p style={pStyle}>Use the <code style={inlineCodeStyle}>find</code> command: <code style={inlineCodeStyle}>find /path -name &quot;filename.txt&quot;</code>. For case-insensitive search use <code style={inlineCodeStyle}>-iname</code>. To search only in the current directory and its subdirectories: <code style={inlineCodeStyle}>find . -name &quot;*.log&quot;</code>. The <code style={inlineCodeStyle}>locate</code> command is faster for system-wide searches after running <code style={inlineCodeStyle}>updatedb</code>.</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>What is the difference between cp and mv?</h3>
        <p style={pStyle}><code style={inlineCodeStyle}>cp</code> copies a file, leaving the original in place. <code style={inlineCodeStyle}>mv</code> moves or renames a file, removing it from the original location. Use <code style={inlineCodeStyle}>cp -r</code> for directories and <code style={inlineCodeStyle}>mv</code> when you need to rename without duplicating.</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>How do I check disk usage in Linux?</h3>
        <p style={pStyle}>Use <code style={inlineCodeStyle}>df -h</code> to see filesystem-level usage. Use <code style={inlineCodeStyle}>du -sh /path</code> for a specific directory, or <code style={inlineCodeStyle}>du -sh *</code> to list all items in the current directory sorted by size.</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>How do I kill a process by name?</h3>
        <p style={pStyle}>Use <code style={inlineCodeStyle}>pkill processname</code> or <code style={inlineCodeStyle}>killall processname</code>. To find the PID first: <code style={inlineCodeStyle}>pgrep processname</code> or <code style={inlineCodeStyle}>ps aux | grep processname</code>, then <code style={inlineCodeStyle}>kill PID</code>. Force kill: <code style={inlineCodeStyle}>kill -9 PID</code> or <code style={inlineCodeStyle}>pkill -9 processname</code>.</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>What does chmod 755 mean?</h3>
        <p style={pStyle}>It sets permissions: owner can read/write/execute (7=4+2+1), group can read/execute (5=4+0+1), others can read/execute. This is the standard permission for directories and executable scripts. Use <code style={inlineCodeStyle}>chmod +x file</code> to simply add execute permission without changing anything else.</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>How do I search for text inside files?</h3>
        <p style={pStyle}>Use <code style={inlineCodeStyle}>grep &quot;pattern&quot; filename</code>. For recursive directory search: <code style={inlineCodeStyle}>grep -r &quot;pattern&quot; /path</code>. Add <code style={inlineCodeStyle}>-n</code> for line numbers, <code style={inlineCodeStyle}>-i</code> for case-insensitive, <code style={inlineCodeStyle}>-l</code> to list only filenames. Use <code style={inlineCodeStyle}>grep -E</code> for extended regular expressions.</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>How do I connect to a remote server using SSH?</h3>
        <p style={pStyle}>Use <code style={inlineCodeStyle}>ssh username@hostname</code> or <code style={inlineCodeStyle}>ssh username@IP</code>. Specify a port with <code style={inlineCodeStyle}>-p</code>. For key-based auth: <code style={inlineCodeStyle}>ssh -i ~/.ssh/id_rsa user@host</code>. Create <code style={inlineCodeStyle}>~/.ssh/config</code> with named host aliases to avoid repeating flags.</p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>How do I use pipes and redirects?</h3>
        <p style={pStyle}>Pipes (<code style={inlineCodeStyle}>|</code>) send the output of one command as input to the next. Redirect to file with <code style={inlineCodeStyle}>&gt;</code> (overwrite) or <code style={inlineCodeStyle}>&gt;&gt;</code> (append). Redirect stderr with <code style={inlineCodeStyle}>2&gt;</code> and both stdout+stderr with <code style={inlineCodeStyle}>&gt; file 2&gt;&amp;1</code>. Use <code style={inlineCodeStyle}>tee</code> to write to a file and continue the pipeline simultaneously.</p>
      </div>
    </article>
  );
}

function ChineseContent() {
  return (
    <article style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '860px', margin: '0 auto', padding: '0 16px' }}>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '1rem', color: '#0369a1', marginBottom: '8px' }}>TL;DR 速览</p>
        <p style={{ color: '#0c4a6e', lineHeight: '1.7', margin: 0 }}>
          本指南涵盖开发者每天都会用到的核心 Linux 命令——从文件系统导航、文件管理，到文本处理、进程管理、权限配置和 SSH 远程访问。每个命令都附有实用标志和真实示例，聚焦开发者工作流场景。
        </p>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '40px',
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b', marginBottom: '12px' }}>核心要点</p>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.9', color: '#374151' }}>
          <li><code style={inlineCodeStyle}>find</code> 和 <code style={inlineCodeStyle}>grep</code> 是最通用的搜索工具，尽早掌握它们的标志参数</li>
          <li>管道（<code style={inlineCodeStyle}>|</code>）可以串联命令，构建强大的单行命令</li>
          <li><code style={inlineCodeStyle}>chmod</code>、<code style={inlineCodeStyle}>chown</code> 控制访问权限，理解八进制和符号模式的区别</li>
          <li><code style={inlineCodeStyle}>ps aux</code>、<code style={inlineCodeStyle}>top</code> 和 <code style={inlineCodeStyle}>kill</code> 是进程管理三件套</li>
          <li>SSH 密钥认证 + <code style={inlineCodeStyle}>~/.ssh/config</code> 让远程工作更流畅</li>
          <li><code style={inlineCodeStyle}>alias</code> 和 Shell 函数能节省大量重复输入</li>
          <li>大文件或增量传输时，<code style={inlineCodeStyle}>rsync</code> 优于 <code style={inlineCodeStyle}>scp</code></li>
          <li>执行破坏性命令前，始终用 <code style={inlineCodeStyle}>--dry-run</code> 或 <code style={inlineCodeStyle}>echo</code> 预演</li>
        </ul>
      </div>

      {/* Introduction */}
      <h2 style={h2Style}>简介</h2>
      <p style={pStyle}>
        Linux 命令行是开发者工具箱中最强大的工具之一。无论是将应用部署到生产服务器、自动化构建流水线、调试问题，还是高效管理文件，掌握终端命令是区分高效开发者与普通开发者的关键。
      </p>
      <p style={pStyle}>
        本指南作为全面参考手册，涵盖日常使用的核心命令。每个命令都展示了实用标志和真实示例，不仅展示语法，更解释<em>何时</em>和<em>为何</em>使用该命令，重点关注开发者工作流。
      </p>

      {/* 1. File System Navigation */}
      <h2 style={h2Style}>1. 文件系统导航</h2>
      <p style={pStyle}>
        高效在 Linux 文件系统中移动是所有操作的基础。这些命令帮助你定位自己的位置并找到文件。
      </p>

      <h3 style={h3Style}>ls — 列出目录内容</h3>
      <p style={pStyle}><code style={inlineCodeStyle}>ls</code> 是使用最频繁的命令，列出当前或指定路径下的文件和目录。</p>
      <code style={codeStyle}>{`# 基本列表
ls

# 长格式（含权限、所有者、大小、日期）
ls -l

# 包含隐藏文件（点文件）
ls -la

# 人性化文件大小
ls -lh

# 按修改时间排序（最新在前）
ls -lt

# 逆序（最旧在前）
ls -ltr

# 列出指定目录
ls -la /var/log`}</code>

      <h3 style={h3Style}>cd, pwd, find, locate</h3>
      <code style={codeStyle}>{`# 切换到主目录
cd ~

# 返回上一个目录
cd -

# 打印当前目录
pwd

# 按名称查找文件
find /home -name "config.json"

# 按扩展名查找
find . -name "*.log"

# 查找最近7天修改的文件
find . -mtime -7

# 快速全局查找（使用索引）
locate nginx.conf
sudo updatedb  # 更新索引`}</code>

      {/* 2. File Operations */}
      <h2 style={h2Style}>2. 文件操作</h2>

      <h3 style={h3Style}>cp, mv, rm, mkdir, touch, ln</h3>
      <code style={codeStyle}>{`# 复制文件
cp source.txt dest.txt
cp -r mydir/ /backup/       # 递归复制目录
cp -p file.txt /backup/     # 保留时间戳和权限

# 移动/重命名
mv oldname.txt newname.txt
mv file.txt /tmp/

# 删除（谨慎使用！）
rm file.txt
rm -rf mydir/               # 强制递归删除
rm -i file.txt              # 交互确认

# 创建目录
mkdir myproject
mkdir -p /var/log/myapp/2024  # 含父目录

# 创建空文件
touch newfile.txt

# 创建符号链接
ln -s /path/to/original symlink
ln original.txt hardlink.txt  # 硬链接`}</code>

      {/* 3. Text Processing */}
      <h2 style={h2Style}>3. 文本处理</h2>
      <p style={pStyle}>Linux 文本处理工具极其强大，通过管道组合使用可构成完整的数据转换流水线。</p>

      <h3 style={h3Style}>cat, grep, sed, awk</h3>
      <code style={codeStyle}>{`# cat: 显示文件内容
cat file.txt
cat -n file.txt             # 显示行号

# grep: 搜索文本模式
grep "error" logfile.txt
grep -i "Error" logfile.txt   # 不区分大小写
grep -r "TODO" ./src/         # 递归搜索
grep -n "function" app.js     # 显示行号
grep -v "debug" logfile.txt   # 反向匹配
grep -E "error|warning" app.log  # 扩展正则

# sed: 流编辑器
sed 's/old/new/g' file.txt          # 替换所有
sed -i 's/localhost/prod.db/g' .env  # 原地修改
sed '/^#/d' config.txt              # 删除注释行
sed -n '10,20p' file.txt            # 打印指定行

# awk: 模式处理
awk -F',' '{print $2}' data.csv     # 打印第2列
awk '$3 > 100' data.txt             # 过滤行
awk '{sum += $3} END {print sum}' data.txt  # 求和
awk -F: '{print $1, $7}' /etc/passwd       # 处理passwd`}</code>

      <h3 style={h3Style}>cut, sort, uniq, wc</h3>
      <code style={codeStyle}>{`# cut: 提取字段
cut -d',' -f1,3 data.csv    # 提取第1和第3字段
cut -c1-10 file.txt         # 前10个字符

# sort: 排序
sort file.txt               # 字母序
sort -n numbers.txt         # 数字序
sort -rh sizes.txt          # 逆序人性化大小
sort -u file.txt            # 去重排序

# uniq: 过滤重复行（需先排序）
sort file.txt | uniq        # 去重
sort file.txt | uniq -c     # 统计出现次数
sort file.txt | uniq -d     # 仅显示重复行

# wc: 计数
wc -l file.txt              # 行数
wc -w file.txt              # 单词数
wc -c file.txt              # 字节数`}</code>

      {/* 4. Process Management */}
      <h2 style={h2Style}>4. 进程管理</h2>

      <h3 style={h3Style}>ps, top, kill, nohup</h3>
      <code style={codeStyle}>{`# 查看所有进程
ps aux

# 按CPU使用率排序
ps aux --sort=-%cpu | head -10

# 实时监控（交互式）
top
htop                        # 增强版，更友好

# 按名称杀进程
pkill nginx
killall node
pkill -9 python             # 强制杀

# 按PID杀进程
kill PID
kill -9 PID                 # 强制杀（SIGKILL）

# 后台运行并免疫挂断信号
nohup ./server.sh &
nohup python app.py > app.log 2>&1 &

# 作业控制
Ctrl+Z                      # 暂停当前进程
bg %1                       # 恢复到后台
fg %1                       # 恢复到前台
jobs                        # 列出后台作业`}</code>

      {/* 5. Permissions */}
      <h2 style={h2Style}>5. 权限与所有权</h2>

      <h3 style={h3Style}>chmod, chown, chgrp</h3>
      <code style={codeStyle}>{`# chmod: 修改权限（八进制）
chmod 755 script.sh         # rwxr-xr-x
chmod 644 config.txt        # rw-r--r--
chmod 600 ~/.ssh/id_rsa     # rw------- (私钥)
chmod -R 755 /var/www/html  # 递归设置

# chmod: 符号模式
chmod +x script.sh          # 添加执行权限
chmod u+x,g-w file.txt     # 用户+x，组-w
chmod a+r file.txt          # 所有人+读

# chown: 修改所有者
chown newuser file.txt
chown newuser:newgroup file.txt
chown -R www-data:www-data /var/www/html

# chgrp: 修改所属组
chgrp www-data /var/www/html`}</code>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>八进制</th>
            <th style={thStyle}>符号表示</th>
            <th style={thStyle}>含义</th>
            <th style={thStyle}>常用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>755</td>
            <td style={tdStyle}>rwxr-xr-x</td>
            <td style={tdStyle}>所有者全权，其他人读+执行</td>
            <td style={tdStyle}>目录、可执行脚本</td>
          </tr>
          <tr>
            <td style={tdAltStyle}>644</td>
            <td style={tdAltStyle}>rw-r--r--</td>
            <td style={tdAltStyle}>所有者读写，其他只读</td>
            <td style={tdAltStyle}>配置文件、Web资源</td>
          </tr>
          <tr>
            <td style={tdStyle}>600</td>
            <td style={tdStyle}>rw-------</td>
            <td style={tdStyle}>仅所有者读写</td>
            <td style={tdStyle}>SSH私钥、密钥文件</td>
          </tr>
          <tr>
            <td style={tdAltStyle}>400</td>
            <td style={tdAltStyle}>r--------</td>
            <td style={tdAltStyle}>仅所有者只读</td>
            <td style={tdAltStyle}>证书文件</td>
          </tr>
        </tbody>
      </table>

      {/* 6. Network */}
      <h2 style={h2Style}>6. 网络命令</h2>

      <h3 style={h3Style}>curl, wget, ping, ss, ip</h3>
      <code style={codeStyle}>{`# curl: 数据传输
curl https://api.example.com/users      # GET请求
curl -X POST https://api.example.com \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}'                 # POST JSON
curl -H "Authorization: Bearer TOKEN" url  # 带认证
curl -O https://example.com/file.tar.gz    # 下载文件
curl -L https://example.com               # 跟随重定向
curl -v https://example.com              # 详细调试

# wget: 文件下载
wget https://example.com/file.tar.gz
wget -c https://example.com/file.iso    # 断点续传
wget -b https://example.com/file.iso    # 后台下载

# ping: 测试连通性
ping google.com
ping -c 4 8.8.8.8

# ss: 查看网络连接（netstat现代替代品）
ss -tuln                    # 监听中的TCP/UDP端口
ss -tp                      # 显示进程名
ss -tnp state established   # 已建立的连接

# ip: 网络接口管理
ip addr show                # 显示所有接口
ip route show               # 路由表
ip link set eth0 up         # 启用接口`}</code>

      {/* 7. Disk & Memory */}
      <h2 style={h2Style}>7. 磁盘与内存</h2>

      <code style={codeStyle}>{`# df: 文件系统使用情况
df -h                       # 人性化格式
df -Th                      # 含文件系统类型

# du: 目录/文件磁盘用量
du -sh .                    # 当前目录总大小
du -sh /var/log             # 指定目录大小
du -sh * | sort -h          # 当前目录各项大小并排序
du -h --max-depth=1 /home   # 深度1

# free: 内存使用
free -h                     # 人性化格式
watch -n 1 free -h          # 实时监控

# lsblk: 块设备列表
lsblk
lsblk -f                    # 含文件系统类型和挂载点`}</code>

      {/* 8. Package Management */}
      <h2 style={h2Style}>8. 包管理</h2>
      <code style={codeStyle}>{`# apt (Debian/Ubuntu)
sudo apt update             # 更新包列表
sudo apt upgrade            # 升级所有包
sudo apt install nginx      # 安装
sudo apt remove nginx       # 卸载
sudo apt purge nginx        # 卸载含配置文件
apt search keyword          # 搜索

# yum/dnf (RHEL/CentOS/Fedora)
sudo yum update
sudo yum install httpd
sudo dnf install nginx      # dnf为yum现代替代

# brew (macOS)
brew update
brew install node
brew upgrade node
brew uninstall node
brew list`}</code>

      {/* 9. SSH & Remote */}
      <h2 style={h2Style}>9. SSH 与远程访问</h2>

      <code style={codeStyle}>{`# 基本连接
ssh user@hostname
ssh -p 2222 user@host       # 指定端口
ssh -i ~/.ssh/id_rsa user@host  # 使用密钥

# 远程执行命令
ssh user@host "ls -la /var/www"

# SSH隧道（本地端口转发）
ssh -L 8080:localhost:80 user@host

# ~/.ssh/config 示例
Host myserver
    HostName 192.168.1.100
    User deploy
    Port 2222
    IdentityFile ~/.ssh/deploy_key

# 配置后直接使用：ssh myserver

# scp: 安全复制
scp file.txt user@host:/remote/path/
scp user@host:/remote/file.txt ./
scp -r ./mydir user@host:/home/user/

# rsync: 增量同步（推荐用于大文件）
rsync -avz ./src/ user@host:/var/www/app/
rsync -avz --delete ./src/ user@host:/var/www/  # 删除目标多余文件
rsync -avzn ./src/ user@host:/var/www/          # 演练模式
rsync -avz --exclude='node_modules' ./src/ user@host:/app/`}</code>

      {/* 10. Shell Productivity */}
      <h2 style={h2Style}>10. Shell 效率技巧</h2>

      <code style={codeStyle}>{`# alias: 命令快捷方式
alias ll='ls -la'
alias gs='git status'
alias ..='cd ..'
# 永久添加到 ~/.bashrc 或 ~/.zshrc
echo "alias ll='ls -la'" >> ~/.bashrc
source ~/.bashrc

# history: 命令历史
history
history 20                  # 最近20条
Ctrl+R                      # 交互搜索历史
!!                          # 重新执行上条命令
!42                         # 执行历史编号42的命令

# 管道与重定向
ls -la | grep ".txt"        # 管道
command > output.txt        # 重定向（覆盖）
command >> output.txt       # 追加
command 2> errors.log       # 重定向stderr
command > out.log 2>&1      # stdout+stderr都重定向
command | tee output.txt    # 输出到文件同时继续传递

# xargs: 批量执行
find . -name "*.log" | xargs rm -f
cat urls.txt | xargs curl -O
find . -name "*.txt" -print0 | xargs -0 wc -l  # 处理含空格的文件名

# 实用单行命令
grep -rn "TODO" ./src --include="*.ts"   # 查找所有TODO
tail -f /var/log/nginx/access.log        # 实时查看日志
lsof -i :3000                            # 查看3000端口使用
pkill -f node                            # 杀死所有node进程
history | awk '{print $2}' | sort | uniq -c | sort -rn | head -10  # 最常用命令`}</code>

      {/* FAQs */}
      <h2 style={h2Style}>常见问题解答</h2>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>如何在 Linux 中按文件名查找文件？</h3>
        <p style={pStyle}>使用 <code style={inlineCodeStyle}>find</code> 命令：<code style={inlineCodeStyle}>find /path -name &quot;filename.txt&quot;</code>。不区分大小写搜索用 <code style={inlineCodeStyle}>-iname</code>。搜索当前目录：<code style={inlineCodeStyle}>find . -name &quot;*.log&quot;</code>。<code style={inlineCodeStyle}>locate</code> 命令使用预建索引，全局搜索更快，使用前需运行 <code style={inlineCodeStyle}>sudo updatedb</code>。</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>cp 和 mv 有什么区别？</h3>
        <p style={pStyle}><code style={inlineCodeStyle}>cp</code> 复制文件，原文件保留不变。<code style={inlineCodeStyle}>mv</code> 移动或重命名文件，原位置的文件被移走。复制目录用 <code style={inlineCodeStyle}>cp -r</code>；只需重命名而不需要保留副本时用 <code style={inlineCodeStyle}>mv</code>。</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>如何查看 Linux 磁盘使用情况？</h3>
        <p style={pStyle}>用 <code style={inlineCodeStyle}>df -h</code> 查看文件系统级别的磁盘占用。用 <code style={inlineCodeStyle}>du -sh /path</code> 查看特定目录大小，<code style={inlineCodeStyle}>du -sh * | sort -h</code> 列出当前目录各项大小并排序。</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>如何按名称杀死进程？</h3>
        <p style={pStyle}>使用 <code style={inlineCodeStyle}>pkill 进程名</code> 或 <code style={inlineCodeStyle}>killall 进程名</code>。先找 PID：<code style={inlineCodeStyle}>pgrep 进程名</code> 或 <code style={inlineCodeStyle}>ps aux | grep 进程名</code>，再 <code style={inlineCodeStyle}>kill PID</code>。强制杀：<code style={inlineCodeStyle}>kill -9 PID</code> 或 <code style={inlineCodeStyle}>pkill -9 进程名</code>。</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>chmod 755 是什么意思？</h3>
        <p style={pStyle}>设置权限：所有者可读/写/执行（7=4+2+1），组可读/执行（5=4+0+1），其他人可读/执行。这是目录和可执行脚本的标准权限。使用 <code style={inlineCodeStyle}>chmod +x 文件名</code> 可快速添加执行权限。</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>如何在文件中搜索文本？</h3>
        <p style={pStyle}>使用 <code style={inlineCodeStyle}>grep &quot;模式&quot; 文件名</code>。递归搜索目录：<code style={inlineCodeStyle}>grep -r &quot;模式&quot; /路径</code>。加 <code style={inlineCodeStyle}>-n</code> 显示行号，<code style={inlineCodeStyle}>-i</code> 不区分大小写，<code style={inlineCodeStyle}>-l</code> 只列出匹配文件名，<code style={inlineCodeStyle}>-E</code> 使用扩展正则表达式。</p>
      </div>

      <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>如何使用 SSH 连接远程服务器？</h3>
        <p style={pStyle}>使用 <code style={inlineCodeStyle}>ssh 用户名@主机名</code>。指定端口加 <code style={inlineCodeStyle}>-p</code>。密钥认证：<code style={inlineCodeStyle}>ssh -i ~/.ssh/id_rsa user@host</code>。创建 <code style={inlineCodeStyle}>~/.ssh/config</code> 配置主机别名，避免每次重复输入参数。</p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ ...h3Style, marginTop: '0' }}>如何使用管道和重定向？</h3>
        <p style={pStyle}>管道（<code style={inlineCodeStyle}>|</code>）将前一命令的输出传给下一命令。用 <code style={inlineCodeStyle}>&gt;</code> 重定向到文件（覆盖），<code style={inlineCodeStyle}>&gt;&gt;</code> 追加。用 <code style={inlineCodeStyle}>2&gt;</code> 重定向错误输出，<code style={inlineCodeStyle}>&gt; file 2&gt;&amp;1</code> 同时重定向 stdout 和 stderr。用 <code style={inlineCodeStyle}>tee</code> 同时写入文件并继续传递管道。</p>
      </div>
    </article>
  );
}

export default function LinuxCommandsGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] ?? translations.en;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <header style={{ marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: '1.3',
              marginBottom: '12px',
            }}
          >
            {t.title}
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#475569',
              lineHeight: '1.7',
              marginBottom: '0',
            }}
          >
            {t.description}
          </p>
        </header>

        {lang === 'zh' ? <ChineseContent /> : <EnglishContent />}
      </div>
    </>
  );
}
