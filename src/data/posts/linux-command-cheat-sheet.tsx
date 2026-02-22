'use client';

import Link from 'next/link';

export default function LinuxCommandCheatSheet({ lang }: { lang: string }) {
  return (
    <>
      <h2>Why Every Developer Needs Linux Commands</h2>
      <p>
        Whether you work on macOS, deploy to Linux servers, use Docker containers, or manage cloud infrastructure, <strong>Linux commands</strong> are an essential part of the developer toolkit. Knowing the right command can save hours of clicking through GUIs, and most development environments (CI/CD pipelines, containers, VMs) run on Linux under the hood.
      </p>
      <p>
        This cheat sheet covers the most commonly used Linux commands organized by category, with practical examples you can copy and use immediately. Each section includes the commands you will reach for daily plus lesser-known flags that unlock powerful workflows.
      </p>

      <h2>File and Directory Navigation</h2>
      <pre><code className="language-bash">{`# Print current working directory
pwd
# Output: /home/user/projects

# List files (detailed, human-readable, including hidden)
ls -lah
# -l  long format
# -a  show hidden files (dotfiles)
# -h  human-readable sizes (KB, MB, GB)

# List files sorted by modification time (newest first)
ls -lt

# Change directory
cd /var/log           # absolute path
cd ../                # parent directory
cd ~                  # home directory
cd -                  # previous directory

# Create directories (including nested)
mkdir -p project/src/components

# Remove directory (recursive)
rm -rf old-project/   # CAUTION: no confirmation

# Copy files and directories
cp file.txt backup.txt
cp -r src/ src-backup/         # recursive copy

# Move / rename
mv old-name.js new-name.js
mv file.txt /tmp/              # move to /tmp

# Create empty file or update timestamp
touch new-file.txt

# Show disk usage of a directory
du -sh node_modules/
# Output: 342M   node_modules/

# Show disk space on all mounted filesystems
df -h`}</code></pre>

      <h2>File Viewing and Searching</h2>
      <pre><code className="language-bash">{`# View entire file
cat package.json

# View file with line numbers
cat -n app.tsx

# View first/last N lines
head -20 server.log
tail -50 server.log

# Follow a log file in real time (stream new lines)
tail -f /var/log/nginx/access.log

# Page through a large file
less huge-file.log
# Use: /search  to search, q to quit, G to go to end

# Search for text in files (recursive, line numbers, ignore case)
grep -rni "TODO" src/
# -r  recursive
# -n  line numbers
# -i  case-insensitive

# Search with context (3 lines before and after)
grep -C 3 "error" server.log

# Find files by name
find . -name "*.tsx" -type f

# Find files modified in the last 24 hours
find . -mtime -1 -type f

# Find large files (> 100MB)
find / -size +100M -type f 2>/dev/null

# Count lines, words, characters
wc -l src/**/*.ts
# Output: line count per file + total

# Compare two files
diff file1.txt file2.txt
diff -u old.json new.json    # unified diff (git-style)`}</code></pre>

      <h2>Text Processing</h2>
      <pre><code className="language-bash">{`# Replace text in a file (in-place)
sed -i 's/oldText/newText/g' file.txt
# macOS: sed -i '' 's/old/new/g' file.txt

# Print specific columns (e.g., 1st and 3rd)
awk '{print $1, $3}' access.log

# Sort lines
sort names.txt              # alphabetical
sort -n numbers.txt          # numerical
sort -u names.txt            # unique only (remove duplicates)

# Remove duplicate lines (file must be sorted first)
sort data.txt | uniq

# Count occurrences of each line
sort data.txt | uniq -c | sort -rn

# Cut specific fields (delimiter-based)
cut -d',' -f1,3 data.csv    # fields 1 and 3, comma-delimited

# Translate / delete characters
echo "Hello World" | tr 'A-Z' 'a-z'     # lowercase
echo "hello   world" | tr -s ' '         # squeeze spaces

# Stream editor: delete blank lines
sed '/^$/d' file.txt

# Extract JSON values with jq
cat data.json | jq '.users[].name'
curl -s https://api.example.com/data | jq '.results | length'`}</code></pre>

      <h2>Process Management</h2>
      <pre><code className="language-bash">{`# List running processes
ps aux                    # all processes
ps aux | grep node        # filter by name

# Real-time process monitor
top
htop                      # better UI (install: apt install htop)

# Find process by port
lsof -i :3000             # what is using port 3000?
# On Linux: ss -tlnp | grep 3000

# Kill a process
kill 12345                # graceful (SIGTERM)
kill -9 12345             # force kill (SIGKILL)

# Kill process by name
pkill -f "node server.js"
killall node

# Run a command in the background
npm run dev &

# List background jobs
jobs

# Bring background job to foreground
fg %1

# Run a command that survives terminal close
nohup node server.js > output.log 2>&1 &

# Measure execution time
time npm run build`}</code></pre>

      <h2>Permissions and Ownership</h2>
      <pre><code className="language-bash">{`# View permissions
ls -la
# drwxr-xr-x  user  group  directory/
# -rw-r--r--  user  group  file.txt

# Permission format: [type][owner][group][others]
# r=read(4)  w=write(2)  x=execute(1)

# Change permissions (numeric)
chmod 755 script.sh        # rwxr-xr-x (owner: full, others: read+exec)
chmod 644 config.json      # rw-r--r-- (owner: read+write, others: read)
chmod 600 .env             # rw------- (owner only)

# Change permissions (symbolic)
chmod +x deploy.sh         # add execute for all
chmod u+w,go-w file.txt    # owner: add write, group+others: remove write

# Change ownership
chown user:group file.txt
chown -R www-data:www-data /var/www/   # recursive

# Make a file immutable (Linux only)
sudo chattr +i important.conf
# Remove: sudo chattr -i important.conf`}</code></pre>

      <h2>Networking</h2>
      <pre><code className="language-bash">{`# Test connectivity
ping -c 4 google.com       # send 4 packets

# DNS lookup
nslookup example.com
dig example.com A           # more detailed DNS query

# Download a file
wget https://example.com/file.zip
curl -O https://example.com/file.zip

# HTTP request with curl
curl -s https://api.example.com/users | jq .
curl -X POST -H "Content-Type: application/json" \\
  -d '{"name":"test"}' https://api.example.com/users

# Show network interfaces and IPs
ip addr show                # Linux
ifconfig                    # macOS / older Linux

# Show open ports
ss -tlnp                   # Linux
netstat -an | grep LISTEN   # macOS

# Check if a remote port is open
nc -zv example.com 443
# Output: Connection to example.com 443 port [tcp/https] succeeded!

# Trace network route
traceroute example.com

# Transfer files over SSH
scp file.txt user@server:/path/
scp -r folder/ user@server:/path/   # recursive

# SSH into a remote server
ssh user@server.com
ssh -i ~/.ssh/mykey.pem ec2-user@1.2.3.4`}</code></pre>

      <h2>Compression and Archives</h2>
      <pre><code className="language-bash">{`# Create a tar.gz archive
tar -czf archive.tar.gz folder/
# -c  create
# -z  gzip compress
# -f  filename

# Extract a tar.gz archive
tar -xzf archive.tar.gz
tar -xzf archive.tar.gz -C /destination/

# List archive contents without extracting
tar -tzf archive.tar.gz

# Create a zip archive
zip -r archive.zip folder/

# Extract a zip archive
unzip archive.zip
unzip archive.zip -d /destination/

# Compress a single file with gzip
gzip large-file.log
# Creates: large-file.log.gz (original is removed)

# Decompress
gunzip large-file.log.gz`}</code></pre>

      <h2>System Information</h2>
      <pre><code className="language-bash">{`# OS and kernel info
uname -a
cat /etc/os-release        # Linux distro details

# CPU info
nproc                      # number of cores
lscpu                      # detailed CPU info

# Memory usage
free -h                    # human-readable
# macOS: vm_stat

# Disk usage
df -h                      # filesystem disk space
du -sh /var/log/            # size of a directory

# System uptime
uptime

# Currently logged-in users
who
w

# Environment variables
env                        # all variables
echo $PATH                 # specific variable
export MY_VAR="value"      # set a variable (current session)

# Check a command's location
which node
which python3
type -a python             # all matching commands in PATH`}</code></pre>

      <h2>Package Management</h2>
      <pre><code className="language-text">{`Ubuntu / Debian (apt):
  sudo apt update                    # refresh package list
  sudo apt install nginx             # install package
  sudo apt remove nginx              # remove package
  sudo apt upgrade                   # upgrade all packages
  apt search keyword                 # search packages

CentOS / RHEL / Fedora (dnf/yum):
  sudo dnf install nginx
  sudo dnf remove nginx
  sudo dnf update

Alpine (apk):
  apk add nginx
  apk del nginx
  apk update

macOS (Homebrew):
  brew install node
  brew uninstall node
  brew update && brew upgrade
  brew search keyword`}</code></pre>

      <h2>Useful One-Liners for Developers</h2>
      <pre><code className="language-bash">{`# Find all TODO comments in a project
grep -rn "TODO\\|FIXME\\|HACK" src/

# Count lines of code (excluding node_modules)
find . -name "*.ts" -not -path "*/node_modules/*" | xargs wc -l

# Find the 10 largest files in current directory tree
find . -type f -exec du -h {} + | sort -rh | head -10

# Watch a command output (refresh every 2 seconds)
watch -n 2 'docker ps'

# Generate a random password
openssl rand -base64 32

# Get your public IP address
curl -s ifconfig.me

# Pretty-print JSON
cat data.json | python3 -m json.tool

# Monitor HTTP traffic on port 80
sudo tcpdump -i any port 80 -A

# Replace text across multiple files
find . -name "*.tsx" -exec sed -i 's/oldComponent/newComponent/g' {} +

# Disk space used by each subdirectory (sorted)
du -h --max-depth=1 | sort -rh

# Show which process is using the most memory
ps aux --sort=-%mem | head -10

# Quick HTTP server (serve current directory)
python3 -m http.server 8080`}</code></pre>

      <h2>Shell Shortcuts and Tricks</h2>
      <pre><code className="language-text">{`Keyboard Shortcuts (Bash/Zsh):
  Ctrl+C     Kill current process
  Ctrl+D     Exit terminal / end input
  Ctrl+Z     Suspend current process (resume with fg)
  Ctrl+R     Reverse search command history
  Ctrl+A     Move cursor to beginning of line
  Ctrl+E     Move cursor to end of line
  Ctrl+W     Delete word before cursor
  Ctrl+U     Delete from cursor to beginning of line
  Ctrl+L     Clear screen (same as 'clear')
  Tab        Auto-complete file/command names
  !!         Repeat last command
  !$         Last argument of previous command

Piping and Redirection:
  cmd > file          Redirect stdout to file (overwrite)
  cmd >> file         Redirect stdout to file (append)
  cmd 2> file         Redirect stderr to file
  cmd &> file         Redirect both stdout and stderr
  cmd1 | cmd2         Pipe stdout of cmd1 to stdin of cmd2
  cmd1 && cmd2        Run cmd2 only if cmd1 succeeds
  cmd1 || cmd2        Run cmd2 only if cmd1 fails`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between rm and rm -rf?</h3>
      <p>
        <code>rm</code> removes individual files and prompts for confirmation on protected files. <code>rm -rf</code> removes directories recursively (<code>-r</code>) and forces deletion without confirmation (<code>-f</code>). Use <code>rm -rf</code> with extreme caution -- there is no undo. Always double-check the path before running it, especially with variables or wildcards.
      </p>

      <h3>How do I make a script executable?</h3>
      <p>
        Run <code>chmod +x script.sh</code> to add execute permission, then run it with <code>./script.sh</code>. Make sure the script has a proper shebang line at the top, such as <code>#!/bin/bash</code> or <code>#!/usr/bin/env node</code> for Node.js scripts.
      </p>

      <h3>What is the difference between sudo and su?</h3>
      <p>
        <code>sudo</code> runs a single command as root (superuser) while keeping your current user session. <code>su</code> switches your entire session to another user (root by default). Best practice is to use <code>sudo</code> for individual commands rather than switching to root entirely, as it provides better auditing and limits the scope of elevated privileges.
      </p>

      <h3>How do I find which process is using a specific port?</h3>
      <p>
        On Linux, use <code>ss -tlnp | grep :3000</code> or <code>lsof -i :3000</code>. On macOS, use <code>lsof -i :3000</code>. The output shows the process ID (PID) and command name. You can then stop the process with <code>kill PID</code> or <code>kill -9 PID</code> for a force kill.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/chmod-calculator`}>Chmod Calculator</Link> - Calculate Linux file permissions visually</li>
        <li><Link href={`/${lang}/tools/cron-parser`}>Cron Parser</Link> - Parse and validate cron expressions</li>
        <li><Link href={`/${lang}/blog/chmod-permissions-explained`}>Chmod Permissions Explained</Link> - Deep dive into Linux permissions</li>
        <li><Link href={`/${lang}/blog/ssh-keygen-ed25519-rsa-guide`}>SSH Key Generation Guide</Link> - Generate and manage SSH keys</li>
      </ul>
    </>
  );
}
