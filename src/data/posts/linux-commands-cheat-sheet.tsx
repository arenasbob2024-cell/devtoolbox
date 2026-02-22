'use client';

import Link from 'next/link';

export default function LinuxCommandsCheatSheet({ lang }: { lang: string }) {
  return (
    <>
      <h2>Essential Linux Commands Every Developer Needs</h2>
      <p>
        Whether you are managing servers, deploying applications, or developing software, <strong>Linux commands</strong> are fundamental tools in every developer's toolkit. This cheat sheet covers 50 essential commands organized by category, with practical examples you can copy and use immediately. From file management and text processing to networking and system administration, these are the commands you will use daily.
      </p>

      <h2>File and Directory Management</h2>

      <h3>1. ls - List Directory Contents</h3>
      <pre><code className="language-bash">{`# Basic listing
ls

# Long format with permissions, size, dates
ls -la

# Human-readable file sizes
ls -lh

# Sort by modification time (newest first)
ls -lt

# Sort by size (largest first)
ls -lS

# Recursive listing
ls -R

# List only directories
ls -d */

# List with file type indicators
ls -F`}</code></pre>

      <h3>2. cd - Change Directory</h3>
      <pre><code className="language-bash">{`# Go to home directory
cd ~
cd

# Go to previous directory
cd -

# Go up one level
cd ..

# Go up two levels
cd ../..

# Absolute path
cd /var/log

# Navigate to a path with spaces
cd "My Documents"`}</code></pre>

      <h3>3. mkdir - Create Directories</h3>
      <pre><code className="language-bash">{`# Create a single directory
mkdir projects

# Create nested directories
mkdir -p src/components/ui

# Create with specific permissions
mkdir -m 755 deploy

# Create multiple directories
mkdir src tests docs config`}</code></pre>

      <h3>4. cp - Copy Files and Directories</h3>
      <pre><code className="language-bash">{`# Copy file
cp source.txt destination.txt

# Copy directory recursively
cp -r src/ backup/

# Copy preserving attributes
cp -a source/ destination/

# Copy with progress (verbose)
cp -v file.txt /backup/

# Interactive (prompt before overwrite)
cp -i important.conf /etc/

# Copy multiple files to directory
cp file1.txt file2.txt /destination/`}</code></pre>

      <h3>5. mv - Move and Rename</h3>
      <pre><code className="language-bash">{`# Rename file
mv old-name.txt new-name.txt

# Move file to directory
mv file.txt /home/user/documents/

# Move multiple files
mv *.log /var/log/archive/

# Interactive (prompt before overwrite)
mv -i source.txt destination.txt

# Move and rename directory
mv old-project/ new-project/`}</code></pre>

      <h3>6. rm - Remove Files and Directories</h3>
      <pre><code className="language-bash">{`# Remove file
rm file.txt

# Remove directory and contents
rm -r directory/

# Force remove without prompting
rm -rf build/

# Interactive (prompt before each removal)
rm -i *.tmp

# Remove empty directory
rmdir empty-folder/`}</code></pre>

      <h2>File Content and Text Processing</h2>

      <h3>7. cat - Display File Contents</h3>
      <pre><code className="language-bash">{`# Display file contents
cat file.txt

# Display with line numbers
cat -n file.txt

# Concatenate multiple files
cat header.txt body.txt footer.txt > page.html

# Display non-printing characters
cat -A file.txt`}</code></pre>

      <h3>8. head and tail - View File Ends</h3>
      <pre><code className="language-bash">{`# First 10 lines (default)
head file.txt

# First 20 lines
head -n 20 file.txt

# Last 10 lines (default)
tail file.txt

# Last 50 lines
tail -n 50 file.txt

# Follow file in real-time (great for logs)
tail -f /var/log/syslog

# Follow with retry (if file is recreated)
tail -F /var/log/app.log

# Last 100 lines then follow
tail -n 100 -f /var/log/nginx/access.log`}</code></pre>

      <h3>9. grep - Search Text Patterns</h3>
      <pre><code className="language-bash">{`# Search for pattern in file
grep "error" logfile.txt

# Case-insensitive search
grep -i "warning" logfile.txt

# Recursive search in directory
grep -r "TODO" src/

# Show line numbers
grep -n "function" app.js

# Count matches
grep -c "ERROR" logfile.txt

# Show only filenames with matches
grep -l "import" src/**/*.ts

# Invert match (lines NOT matching)
grep -v "DEBUG" logfile.txt

# Extended regex
grep -E "error|warning|critical" logfile.txt

# Show context (3 lines before and after)
grep -C 3 "Exception" logfile.txt`}</code></pre>

      <h3>10. find - Search for Files</h3>
      <pre><code className="language-bash">{`# Find by name
find /home -name "*.txt"

# Find by name (case-insensitive)
find . -iname "readme*"

# Find by type (f=file, d=directory)
find . -type f -name "*.log"
find . -type d -name "node_modules"

# Find by size
find . -size +100M          # Larger than 100MB
find . -size -1k            # Smaller than 1KB

# Find by modification time
find . -mtime -7            # Modified in last 7 days
find . -mtime +30           # Modified more than 30 days ago

# Find and execute command
find . -name "*.tmp" -exec rm {} \\;
find . -name "*.js" -exec wc -l {} +

# Find and delete
find /tmp -name "*.cache" -delete

# Exclude directories
find . -path ./node_modules -prune -o -name "*.ts" -print`}</code></pre>

      <h3>11. sed - Stream Editor</h3>
      <pre><code className="language-bash">{`# Replace first occurrence per line
sed 's/old/new/' file.txt

# Replace all occurrences
sed 's/old/new/g' file.txt

# Replace in-place (edit file directly)
sed -i 's/http:/https:/g' config.txt

# Delete lines matching pattern
sed '/DEBUG/d' logfile.txt

# Delete empty lines
sed '/^$/d' file.txt

# Insert line before match
sed '/pattern/i\\New line before' file.txt

# Print only matching lines
sed -n '/error/p' logfile.txt

# Replace on specific line
sed '5s/old/new/' file.txt`}</code></pre>

      <h3>12. awk - Pattern Processing</h3>
      <pre><code className="language-bash">{`# Print specific columns
awk '{print $1, $3}' data.txt

# Print with custom separator
awk -F',' '{print $1, $2}' data.csv

# Filter rows by condition
awk '$3 > 100' data.txt

# Sum a column
awk '{sum += $2} END {print sum}' data.txt

# Count lines
awk 'END {print NR}' file.txt

# Print unique values
awk '!seen[$1]++' data.txt

# Format output
awk '{printf "%-20s %10d\\n", $1, $2}' data.txt`}</code></pre>

      <h2>File Permissions and Ownership</h2>

      <h3>13. chmod - Change Permissions</h3>
      <pre><code className="language-bash">{`# Numeric mode
chmod 755 script.sh       # rwxr-xr-x
chmod 644 config.txt      # rw-r--r--
chmod 600 id_rsa          # rw-------

# Symbolic mode
chmod +x script.sh        # Add execute for all
chmod u+w file.txt        # Add write for owner
chmod go-r secret.txt     # Remove read for group/others
chmod a+r public.txt      # Add read for all

# Recursive
chmod -R 755 public/

# Common permission patterns
chmod 700 ~/.ssh           # SSH directory
chmod 600 ~/.ssh/id_rsa    # Private key
chmod 644 ~/.ssh/id_rsa.pub  # Public key`}</code></pre>

      <h3>14. chown - Change Ownership</h3>
      <pre><code className="language-bash">{`# Change owner
chown user file.txt

# Change owner and group
chown user:group file.txt

# Recursive ownership change
chown -R www-data:www-data /var/www/

# Change group only
chgrp developers project/`}</code></pre>

      <h2>Process Management</h2>

      <h3>15. ps - List Processes</h3>
      <pre><code className="language-bash">{`# All processes (full format)
ps aux

# Process tree
ps auxf

# Filter by name
ps aux | grep nginx

# Show processes for current user
ps ux

# Show process by PID
ps -p 1234 -o pid,ppid,%cpu,%mem,cmd`}</code></pre>

      <h3>16. top and htop - Monitor Processes</h3>
      <pre><code className="language-bash">{`# Interactive process viewer
top

# Sort by memory usage (in top, press M)
# Sort by CPU usage (in top, press P)
# Kill process (in top, press k then PID)

# Better alternative: htop
htop

# Filter by user
top -u username`}</code></pre>

      <h3>17. kill - Terminate Processes</h3>
      <pre><code className="language-bash">{`# Graceful termination (SIGTERM)
kill 1234

# Force kill (SIGKILL)
kill -9 1234

# Kill by name
killall nginx
pkill -f "node server.js"

# Kill all processes of a user
killall -u username`}</code></pre>

      <h2>Networking</h2>

      <h3>18. curl - Transfer Data</h3>
      <pre><code className="language-bash">{`# GET request
curl https://api.example.com/data

# POST with JSON
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John", "email": "john@example.com"}'

# Download file
curl -O https://example.com/file.zip

# Follow redirects
curl -L https://short.url/abc

# Show headers
curl -I https://example.com

# With authentication
curl -u username:password https://api.example.com/secure

# Upload file
curl -F "file=@photo.jpg" https://api.example.com/upload

# Silent with output
curl -sS https://api.example.com/data | jq .`}</code></pre>

      <h3>19. wget - Download Files</h3>
      <pre><code className="language-bash">{`# Download file
wget https://example.com/file.zip

# Download with custom filename
wget -O output.zip https://example.com/file.zip

# Resume interrupted download
wget -c https://example.com/large-file.iso

# Download entire website (mirror)
wget --mirror --convert-links https://example.com

# Quiet mode
wget -q https://example.com/file.zip`}</code></pre>

      <h3>20. ssh - Secure Shell</h3>
      <pre><code className="language-bash">{`# Connect to remote server
ssh user@hostname

# Connect on specific port
ssh -p 2222 user@hostname

# SSH with key file
ssh -i ~/.ssh/mykey.pem user@hostname

# SSH tunnel (local port forwarding)
ssh -L 8080:localhost:3000 user@server

# Remote port forwarding
ssh -R 9090:localhost:8080 user@server

# Copy files with scp
scp file.txt user@server:/remote/path/
scp -r directory/ user@server:/remote/path/

# SSH config (~/.ssh/config)
# Host myserver
#   HostName 192.168.1.100
#   User admin
#   Port 2222
#   IdentityFile ~/.ssh/mykey`}</code></pre>

      <h3>21-24. Network Diagnostics</h3>
      <pre><code className="language-bash">{`# Check connectivity
ping google.com
ping -c 4 8.8.8.8       # Send 4 packets only

# Trace route to host
traceroute google.com

# DNS lookup
nslookup example.com
dig example.com A
dig example.com MX

# Show network interfaces
ip addr show
ifconfig

# Show listening ports
ss -tlnp
netstat -tlnp

# Show active connections
ss -tnp`}</code></pre>

      <h2>Disk and Storage</h2>

      <h3>25-28. Disk Commands</h3>
      <pre><code className="language-bash">{`# Disk usage summary
df -h

# Directory size
du -sh /var/log/
du -sh */ | sort -rh      # Sort by size

# Find largest files
du -ah /home | sort -rh | head -20

# Disk usage of current directory
du -h --max-depth=1 .`}</code></pre>

      <h2>Archive and Compression</h2>

      <h3>29-32. tar, gzip, zip</h3>
      <pre><code className="language-bash">{`# Create tar.gz archive
tar -czf archive.tar.gz directory/

# Extract tar.gz
tar -xzf archive.tar.gz

# Extract to specific directory
tar -xzf archive.tar.gz -C /destination/

# List contents without extracting
tar -tzf archive.tar.gz

# Create zip archive
zip -r archive.zip directory/

# Extract zip
unzip archive.zip

# Compress single file
gzip large-file.log        # Creates large-file.log.gz
gunzip large-file.log.gz   # Decompress`}</code></pre>

      <h2>System Information</h2>

      <h3>33-38. System Commands</h3>
      <pre><code className="language-bash">{`# System info
uname -a                   # All system info
hostname                   # Server hostname
uptime                     # System uptime and load

# Memory usage
free -h

# CPU info
lscpu
cat /proc/cpuinfo | head -20

# Kernel version
uname -r

# OS release info
cat /etc/os-release

# Environment variables
env
echo $PATH
echo $HOME

# Current user
whoami
id`}</code></pre>

      <h2>User Management</h2>

      <h3>39-42. User Commands</h3>
      <pre><code className="language-bash">{`# Add user
sudo useradd -m -s /bin/bash newuser
sudo passwd newuser

# Add user to group
sudo usermod -aG docker newuser
sudo usermod -aG sudo newuser

# Switch user
su - username

# Run as root
sudo command

# List logged in users
who
w

# Last logins
last -10`}</code></pre>

      <h2>Package Management</h2>

      <h3>43-44. apt and yum</h3>
      <pre><code className="language-bash">{`# Debian/Ubuntu (apt)
sudo apt update              # Update package list
sudo apt upgrade             # Upgrade all packages
sudo apt install nginx       # Install package
sudo apt remove nginx        # Remove package
sudo apt search keyword      # Search packages
apt list --installed         # List installed packages

# RHEL/CentOS (yum/dnf)
sudo yum update
sudo yum install httpd
sudo yum remove httpd
yum search keyword
yum list installed`}</code></pre>

      <h2>Service Management (systemd)</h2>

      <h3>45-48. systemctl</h3>
      <pre><code className="language-bash">{`# Start/stop/restart service
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx

# Enable/disable at boot
sudo systemctl enable nginx
sudo systemctl disable nginx

# Check status
systemctl status nginx

# List all services
systemctl list-units --type=service

# View service logs
journalctl -u nginx
journalctl -u nginx --since "1 hour ago"
journalctl -u nginx -f   # Follow logs`}</code></pre>

      <h2>Text Output and Redirection</h2>

      <h3>49-50. Redirection and Pipes</h3>
      <pre><code className="language-bash">{`# Redirect output to file (overwrite)
echo "Hello" > file.txt
ls -la > listing.txt

# Append to file
echo "Another line" >> file.txt

# Redirect stderr
command 2> error.log

# Redirect both stdout and stderr
command > output.log 2>&1
command &> all.log

# Pipe output to another command
cat access.log | grep "404" | wc -l
ps aux | grep node | awk '{print $2}'
history | grep "docker" | tail -20

# tee - write to file AND stdout
command | tee output.log
command | tee -a output.log   # Append

# xargs - build commands from input
find . -name "*.tmp" | xargs rm
cat urls.txt | xargs -I {} curl -sS {}

# Process substitution
diff <(ls dir1/) <(ls dir2/)`}</code></pre>

      <h2>Quick Reference Table</h2>
      <table>
        <thead>
          <tr><th>Task</th><th>Command</th></tr>
        </thead>
        <tbody>
          <tr><td>Find text in files</td><td><code>grep -rn "pattern" .</code></td></tr>
          <tr><td>Find large files</td><td><code>find / -size +100M -type f</code></td></tr>
          <tr><td>Check disk space</td><td><code>df -h</code></td></tr>
          <tr><td>Check memory</td><td><code>free -h</code></td></tr>
          <tr><td>Monitor processes</td><td><code>htop</code> or <code>top</code></td></tr>
          <tr><td>Check open ports</td><td><code>ss -tlnp</code></td></tr>
          <tr><td>Follow log file</td><td><code>tail -f /var/log/syslog</code></td></tr>
          <tr><td>Kill process by name</td><td><code>pkill -f "process"</code></td></tr>
          <tr><td>Download file</td><td><code>wget URL</code> or <code>curl -O URL</code></td></tr>
          <tr><td>Create archive</td><td><code>tar -czf name.tar.gz dir/</code></td></tr>
          <tr><td>Search command history</td><td><code>history | grep "keyword"</code></td></tr>
          <tr><td>Check service status</td><td><code>systemctl status name</code></td></tr>
        </tbody>
      </table>

      <h2>Conclusion</h2>
      <p>
        Mastering these 50 Linux commands will make you significantly more productive as a developer. Start with the basics -- <code>ls</code>, <code>cd</code>, <code>grep</code>, <code>find</code> -- and gradually incorporate more advanced tools like <code>awk</code>, <code>sed</code>, and process management commands into your workflow. The command line is one of the most powerful tools at your disposal.
      </p>
      <p>
        Practice building command pipelines by combining commands with pipes. For example, analyzing log files with <code>grep</code>, <code>awk</code>, and <code>sort</code> is a skill that will save you hours of debugging time. Bookmark this cheat sheet and refer to it whenever you need a quick refresher.
      </p>
      <p>
        Generate secure passwords and hashes with our <Link href={`/${lang}/tools/password-generator`}>Password Generator</Link> and <Link href={`/${lang}/tools/hash-generator`}>Hash Generator</Link>, or explore the <Link href={`/${lang}/blog/chmod-permissions-explained`}>chmod permissions guide</Link> for a deeper dive into file permissions.
      </p>
    </>
  );
}
