'use client';

import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    tldr: 'Linux file permissions control who can read, write, or execute files and directories. Every permission is described by three layers (owner, group, others) and three actions (r=4, w=2, x=1). chmod 755 means owner has full access (7=rwx), group and others have read and execute (5=r-x). Use our free chmod calculator to generate the exact command without memorizing octal math.',

    takeaway1: 'Every Linux file has three permission layers: owner (u), group (g), and others (o).',
    takeaway2: 'Read=4, Write=2, Execute=1. Add them together for each layer: chmod 644 = rw-r--r--.',
    takeaway3: 'chmod 755 for directories and executables; chmod 644 for regular files; chmod 600 for secrets.',
    takeaway4: 'chmod -R applies permissions recursively; use find to apply different rules for files vs directories.',
    takeaway5: 'Special bits: setuid (4000), setgid (2000), sticky bit (1000) — understand them before using.',
    takeaway6: 'Never use chmod 777 in production — it gives every user on the system read/write/execute access.',
    takeaway7: 'Use chown to change ownership, chgrp to change group, chmod to change permissions.',
    takeaway8: 'ACLs (Access Control Lists) extend the classic 9-bit model to per-user and per-group rules.',

    h2_what: '1. What Are Linux File Permissions?',
    what_p1: 'Every file and directory on a Linux or Unix-like system carries a set of <strong>file permissions</strong> that control access. These permissions are stored as metadata alongside the file and are enforced by the kernel on every read, write, or execute operation. When you run <code>ls -la</code>, the leftmost column displays the permission string, for example <code>-rwxr-xr--</code>. Understanding this string is the first step to mastering Linux security.',
    what_p2: 'The permission system has three fundamental <strong>access types</strong>. <strong>Read (r)</strong> allows a user to view the contents of a file or list the contents of a directory. <strong>Write (w)</strong> allows modifying a file or creating, deleting, and renaming entries inside a directory. <strong>Execute (x)</strong> allows running a file as a program (scripts, binaries) or entering a directory with the <code>cd</code> command. Without execute permission on a directory, you cannot access anything inside it, even if you have read permission.',
    what_p3: 'The permission string from <code>ls -l</code> has 10 characters. The first character indicates the file type: <code>-</code> is a regular file, <code>d</code> is a directory, <code>l</code> is a symbolic link, <code>c</code> is a character device, <code>b</code> is a block device. The remaining nine characters are three groups of three bits each, representing owner, group, and others permissions.',
    what_code1: '-rwxr-xr--  2  alice  webteam  4096  Feb 27  deploy.sh\n^\u2514\u2500 file type: - = regular file\n \\rwx\u2500\u2500\u2500\u2500\u2500\u2500  owner (alice): read + write + execute\n    \\r-x\u2500\u2500\u2500  group (webteam): read + execute\n       \\r--    others: read only',

    h2_layers: '2. The Three-Layer Model: Owner, Group, Others',
    layers_p1: 'Linux uses a three-layer access model. The <strong>owner</strong> (also called "user" or "u") is the account that created the file. The <strong>group</strong> ("g") is a named collection of users who share common access rights. <strong>Others</strong> ("o") — sometimes called "world" — refers to everyone else on the system who is not the owner and not in the file\'s group.',
    layers_p2: 'When the kernel checks permissions for an access request, it checks layers in order. If the requesting user is the file owner, the owner bits apply and no further checking occurs. If the user is a member of the file\'s group, the group bits apply. Otherwise, the others bits apply. This means the owner\'s permissions apply exclusively to the owner and do not cascade. A common gotcha: a file with permissions <code>---rwxrwx</code> gives the owner <em>no access</em> while group and others have full access.',
    layers_p3: 'You can view a file\'s owner and group with <code>ls -la</code> — the third and fourth columns show the owner and group names respectively. Use <code>stat filename</code> for even more detail, including the octal representation of the permissions:',
    layers_code: '$ ls -la deploy.sh\n-rwxr-xr--  1  alice  webteam  4096  deploy.sh\n\n$ stat deploy.sh\n  File: deploy.sh\n  Size: 4096      Blocks: 8    IO Block: 4096  regular file\nDevice: 803h/2051d  Inode: 131073  Links: 1\nAccess: (0754/-rwxr-xr--)  Uid: ( 1001/   alice)   Gid: ( 1002/ webteam)',

    h2_numeric: '3. Numeric (Octal) vs Symbolic Notation',
    numeric_p1: 'Linux permissions can be expressed in two ways: <strong>numeric (octal)</strong> and <strong>symbolic</strong>. Both represent the same nine bits, but they are useful in different contexts. The numeric form is faster to type and easier to reason about when setting all permissions at once. The symbolic form is better when you want to add or remove a single permission without affecting others.',
    numeric_p2: 'In <strong>numeric mode</strong>, each of the three permission types is assigned a numeric value: <strong>Read = 4</strong>, <strong>Write = 2</strong>, <strong>Execute = 1</strong>. For each layer (owner, group, others), you add up the values of the permissions you want to grant, producing a digit from 0 to 7. Three such digits form the complete permission number. For example, <code>chmod 755</code> means: owner 7 (4+2+1 = rwx), group 5 (4+0+1 = r-x), others 5 (4+0+1 = r-x).',
    numeric_table_intro: 'Quick reference for the eight possible octal digits:',
    numeric_p3: 'In <strong>symbolic mode</strong>, you specify <em>who</em> (<code>u</code>=owner, <code>g</code>=group, <code>o</code>=others, <code>a</code>=all), an <em>operator</em> (<code>+</code>=add, <code>-</code>=remove, <code>=</code>=set exactly), and the <em>permissions</em> (<code>r</code>, <code>w</code>, <code>x</code>). Multiple changes can be comma-separated. The key advantage of symbolic mode is that it does not touch bits you do not mention, making it safer for selective changes.',
    numeric_code: '# Numeric mode — set all nine bits at once\nchmod 755 script.sh    # rwxr-xr-x\nchmod 644 index.html   # rw-r--r--\nchmod 600 .env         # rw-------\n\n# Symbolic mode — modify specific bits\nchmod u+x script.sh    # add execute for owner\nchmod go-w config.php  # remove write from group+others\nchmod a+r readme.txt   # add read for everyone\nchmod u=rwx,go=rx dir/ # set exactly: 755',

    h2_common: '4. Common Permission Values: 644, 755, 777, 700, 600',
    common_p1: 'Certain permission values appear constantly in web development, DevOps, and system administration. Knowing them by heart makes you faster and safer. Here is a comprehensive reference table of the most important chmod values:',
    common_p2: 'The three most important values to memorize are <strong>644</strong> (standard file), <strong>755</strong> (standard directory or executable), and <strong>600</strong> (sensitive secrets). Get these right and you will handle 90% of real-world situations correctly.',
    common_p3: 'For web servers, the typical convention is directories at 755 and files at 644. This allows the web server process (often running as www-data or nginx) to traverse directories and read files while preventing unauthorized modifications. Configuration files that contain credentials should be 640 or 600.',

    h2_special: '5. Understanding setuid, setgid, and the Sticky Bit',
    special_p1: 'Beyond the standard nine permission bits, Linux supports three <strong>special permission bits</strong> that modify how files and directories behave. These are represented as a leading fourth digit in the octal notation and appear as special characters in <code>ls -l</code> output. Misunderstanding them is a common source of security vulnerabilities.',
    special_suid_title: 'setuid (SUID) — 4000',
    special_suid_desc: 'When the setuid bit is set on an <strong>executable file</strong>, the process runs with the <strong>file owner\'s effective user ID</strong> instead of the user who executes it. The classic example is <code>/usr/bin/passwd</code>: it needs root privileges to modify <code>/etc/shadow</code>, yet any user must be able to change their own password. In <code>ls -l</code>, SUID replaces the owner execute bit: <code>-rwsr-xr-x</code>. If the file has no execute permission for the owner, the <code>s</code> appears as uppercase <code>S</code> (<code>-rwSr-xr-x</code>), indicating the bit is set but ineffective. On <strong>directories</strong>, setuid is generally ignored on Linux (though respected on some BSDs).',
    special_sgid_title: 'setgid (SGID) — 2000',
    special_sgid_desc: 'On an <strong>executable file</strong>, setgid causes the process to run with the <strong>file\'s group</strong> as the effective group ID. On a <strong>directory</strong>, setgid is far more commonly useful: new files and subdirectories created inside automatically <strong>inherit the directory\'s group</strong>, rather than the creator\'s primary group. This is the standard mechanism for shared team directories where all files must belong to the same group. In <code>ls -l</code>, the group execute bit changes to <code>s</code> (or <code>S</code> if execute is not set).',
    special_sticky_title: 'Sticky Bit — 1000',
    special_sticky_desc: 'On a <strong>directory</strong>, the sticky bit restricts deletion: only the <strong>file\'s owner</strong>, the <strong>directory\'s owner</strong>, or <strong>root</strong> can delete or rename files within it, even if other users have write permission on the directory. The canonical example is <code>/tmp</code> (permissions <code>1777</code>): every user can create files there, but no one can delete another user\'s files. In <code>ls -l</code>, the others execute bit shows as <code>t</code> (or <code>T</code> if execute is not set): <code>drwxrwxrwt</code>. On files, the sticky bit is ignored on modern Linux systems.',
    special_code: '# Setting special bits (numeric: prefix with 4, 2, or 1)\nchmod 4755 /usr/local/bin/myapp  # setuid: rwsr-xr-x\nchmod 2775 /var/www/shared        # setgid: rwxrwsr-x\nchmod 1777 /tmp/scratch           # sticky: rwxrwxrwt\n\n# Symbolic alternatives\nchmod u+s myapp   # set SUID\nchmod g+s shared/ # set SGID on directory\nchmod +t scratch/ # set sticky bit\n\n# Check special bits with ls\nls -la /usr/bin/passwd\n-rwsr-xr-x 1 root shadow 68208 /usr/bin/passwd\n#   ^ s = setuid is set',

    h2_chmod_vs: '6. chmod vs chown vs chgrp',
    chmodvs_p1: 'Permission management in Linux involves three distinct commands that are often confused. Understanding the difference between them is essential for correct system administration.',
    chmodvs_p2: '<strong>chmod</strong> (change mode) modifies the <em>permission bits</em> of a file or directory. It changes who can read, write, or execute the file. It does not change the file\'s owner or group. Syntax: <code>chmod [options] mode file...</code>',
    chmodvs_p3: '<strong>chown</strong> (change owner) changes the <em>owner</em> and optionally the <em>group</em> of a file. Only root can change the owner of a file. Regular users can change the group to another group they belong to. Syntax: <code>chown [options] owner[:group] file...</code>',
    chmodvs_p4: '<strong>chgrp</strong> (change group) changes only the <em>group</em> of a file. It is equivalent to <code>chown :group file</code> but is more explicit when you only want to change the group. Syntax: <code>chgrp [options] group file...</code>',
    chmodvs_code: '# chmod: change permissions\nchmod 644 config.php\nchmod u+x deploy.sh\nchmod -R 755 public_html/\n\n# chown: change owner\nchown alice file.txt          # change owner to alice\nchown alice:webteam file.txt  # change owner and group\nchown -R www-data:www-data /var/www/html/\n\n# chgrp: change group\nchgrp webteam project.conf\nchgrp -R developers /srv/app/\n\n# Check result\nls -la file.txt\n-rw-r--r-- 1 alice webteam 1024 Feb 27 file.txt',

    h2_lsla: '7. Viewing Permissions with ls -la',
    lsla_p1: 'The <code>ls -la</code> command is the standard way to inspect file permissions. The <code>-l</code> flag enables long format and <code>-a</code> shows hidden files (those beginning with a dot). Each line contains the permission string, hard link count, owner name, group name, file size, modification timestamp, and filename.',
    lsla_p2: 'Reading the permission string: the first character is the file type. The next three characters are the <strong>owner\'s</strong> permissions (read, write, execute). The following three are the <strong>group\'s</strong> permissions. The final three are <strong>others\'</strong> permissions. A letter indicates the permission is granted; a dash indicates it is denied.',
    lsla_code: '$ ls -la /var/www/html/\ntotal 48\ndrwxr-xr-x  4  www-data  www-data  4096  Feb 27 .\ndrwxr-xr-x  8  root      root      4096  Feb 20 ..\n-rw-r--r--  1  www-data  www-data  2048  Feb 27 index.html\n-rw-r-----  1  www-data  www-data   512  Feb 25 config.php\ndrwxr-xr-x  2  www-data  www-data  4096  Feb 26 assets/\ndrwxrws---  2  www-data  webteam   4096  Feb 27 uploads/\n-rwsr-xr-x  1  root      root      8192  Feb 10 setuid-tool\n\n# Breakdown of -rw-r-----:\n# - : regular file\n# rw- : owner can read and write (6)\n# r-- : group can only read (4)\n# --- : others have no access (0)\n# = chmod 640',
    lsla_p3: 'The <code>stat</code> command gives even more detail, including the octal permission value directly, the inode number, and timestamps for access, modification, and change. This is useful for scripting and verification:',
    lsla_code2: '$ stat /var/www/html/config.php\n  File: /var/www/html/config.php\n  Size: 512\n  Access: (0640/-rw-r-----)\n  Uid: (33/www-data)  Gid: (33/www-data)',

    h2_recursive: '8. Recursive Permission Changes with chmod -R',
    recursive_p1: 'The <code>-R</code> (recursive) flag applies permission changes to a directory and everything inside it. While convenient, it must be used carefully because it applies the same permission bits to both files and directories — which often have different requirements.',
    recursive_p2: 'The problem with naive <code>chmod -R 755</code>: directories need execute permission (to be traversed), but regular files generally should not be executable. Setting 755 recursively makes every file executable, which is both unnecessary and a security concern.',
    recursive_p3: 'The correct approach uses <code>find</code> with <code>-type f</code> and <code>-type d</code> to apply different permissions to files and directories separately:',
    recursive_code: '# WRONG: makes all files executable too\nchmod -R 755 /var/www/html/\n\n# CORRECT: different permissions for files and directories\nfind /var/www/html -type d -exec chmod 755 {} \\;\nfind /var/www/html -type f -exec chmod 644 {} \\;\n\n# Fix a deploy directory (more efficient with +)\nfind /var/www/html -type d -exec chmod u=rwx,go=rx {} +\nfind /var/www/html -type f -exec chmod u=rw,go=r {} +\n\n# Preserve execute bit only for already-executable files\nfind /var/www/html -type f -perm /111 -exec chmod 755 {} +\nfind /var/www/html -type f ! -perm /111 -exec chmod 644 {} +',

    h2_webserver: '9. Permission Best Practices for Web Servers',
    webserver_p1: 'Web server permissions are one of the most critical security configurations for any application deployment. Getting them wrong can lead to data breaches, defacements, or privilege escalation. Here is the authoritative reference for Apache and Nginx deployments.',
    webserver_p2: '<strong>Web root files and directories:</strong> The standard convention is 644 for files and 755 for directories. The web server process (www-data, nginx, or apache) needs read access to files and execute (traverse) access to directories. Never give the web server write access to the web root.',
    webserver_code1: '# Standard web server permissions\nfind /var/www/html -type d -exec chmod 755 {} +\nfind /var/www/html -type f -exec chmod 644 {} +\n\n# Ownership: root owns files, web server can read\nchown -R root:www-data /var/www/html/\n\n# PHP/config files: even more restrictive\nchmod 640 /var/www/html/config.php   # owner rw, group r\nchmod 600 /var/www/html/.env         # owner rw only',
    webserver_p3: '<strong>Upload directories:</strong> If your application allows file uploads, the upload directory must be writable by the web server process. Grant group write permission and ensure the web server process is in the group:',
    webserver_code2: '# Upload directory: web server can write, but sticky for safety\nchmod 2775 /var/www/html/uploads/   # setgid + owner:rwx group:rwx\nchown root:www-data /var/www/html/uploads/\n\n# Even more secure: completely separate upload directory\nmkdir -p /srv/uploads\nchown www-data:www-data /srv/uploads\nchmod 700 /srv/uploads  # only www-data can access',
    webserver_p4: '<strong>SSH keys:</strong> SSH is extremely strict about key permissions. If permissions are too open, SSH refuses to use the key with "WARNING: UNPROTECTED PRIVATE KEY FILE!"',
    webserver_code3: '# SSH keys: exact permissions required\nchmod 700 ~/.ssh/             # directory: owner only\nchmod 600 ~/.ssh/id_ed25519   # private key: owner rw only\nchmod 644 ~/.ssh/id_ed25519.pub  # public key: readable\nchmod 600 ~/.ssh/authorized_keys  # authorized keys\nchmod 644 ~/.ssh/known_hosts      # known hosts',
    webserver_p5: '<strong>Environment and secret files:</strong> Files containing API keys, database passwords, and other credentials must be restricted to the minimum necessary access:',
    webserver_code4: '# Secret files: owner read-write only\nchmod 600 .env\nchmod 600 database.yml\nchmod 600 secrets.json\nchmod 400 ssl-private.key  # SSL private key: read only\n\n# Check for overly permissive files\nfind /var/www -name ".env" -perm /044\nfind / -name "*.pem" -perm /022 -type f',

    h2_trouble: '10. Troubleshooting: 403 Forbidden and Permission Denied',
    trouble_p1: 'Permission errors are among the most common causes of application failures during deployment. The two most frequent errors are HTTP 403 Forbidden and shell "Permission denied" messages. Here is a systematic troubleshooting guide.',
    trouble_403_title: 'HTTP 403 Forbidden',
    trouble_403_desc: 'A 403 error from a web server almost always indicates a permission problem. The web server process cannot read the requested file or traverse a parent directory. Check permissions on the file itself AND all parent directories in the path:',
    trouble_code1: '# Check the full path permissions\nnamei -l /var/www/html/app/config.php\nf: /var/www/html/app/config.php\n drwxr-xr-x root     root     /\n drwxr-xr-x root     root     var\n drwxr-xr-x root     root     www\n drwxr-xr-x root     www-data html\n drwxr-x--- root     www-data app     <- missing execute for others!\n -rw-r--r-- www-data www-data config.php\n\n# Fix the directory\nchmod 755 /var/www/html/app/\n\n# Also check if the web server user can read the file\nsudo -u www-data stat /var/www/html/app/config.php',
    trouble_denied_title: 'Permission Denied in Shell',
    trouble_denied_desc: 'Shell "Permission denied" errors occur when a user lacks the necessary permission bits. Diagnose with <code>ls -la</code> and compare against the current user:',
    trouble_code2: '# Check who you are\nwhoami\nid\n\n# Check file permissions and ownership\nls -la problematic-file\n\n# Check directory execute permission\nls -la /path/to/directory/\n\n# Common fixes\nchmod +x script.sh          # forgot to make script executable\nsudo chown $USER file.txt   # wrong owner\nnewgrp groupname            # join a group without re-login\n\n# Check effective permissions (Linux 4.5+)\ngetfattr -n system.posix_acl_access file',

    h2_filevdir: '11. File vs Directory Permissions: Key Differences',
    filevdir_p1: 'The same permission bits mean different things for files versus directories. This distinction trips up many developers, especially when setting recursive permissions.',
    filevdir_p2: '<strong>For files:</strong> Read (r) allows viewing the file contents. Write (w) allows modifying or replacing the file contents. Execute (x) allows running the file as a program. The permissions apply directly to the file data.',
    filevdir_p3: '<strong>For directories:</strong> Read (r) allows listing the directory contents with <code>ls</code>. Write (w) allows creating, deleting, and renaming entries inside the directory — not modifying files within it. Execute (x) allows entering the directory with <code>cd</code> and accessing files inside it by name. Without execute, you cannot access anything inside the directory even if you know the filenames.',
    filevdir_table: 'This distinction has important security implications. A directory with write permission allows deleting any file inside it regardless of the file\'s own permissions. This is why the sticky bit (1000) on <code>/tmp</code> is critical — it prevents users from deleting each other\'s files despite having write access to the directory.',

    h2_acl: '12. ACL (Access Control Lists) for Advanced Permissions',
    acl_p1: 'The classic Unix permission model (owner/group/others) only allows one owner and one group per file. For scenarios requiring access by multiple specific users or groups, this model becomes limiting. <strong>Access Control Lists (ACLs)</strong> extend the permission system to allow per-user and per-group rules.',
    acl_p2: 'ACLs are supported on most modern Linux filesystems (ext4, xfs, btrfs) and can be managed with the <code>getfacl</code> and <code>setfacl</code> commands. You must ensure the filesystem is mounted with ACL support (usually enabled by default on modern distros).',
    acl_code: '# View ACLs\ngetfacl /var/www/project/\n# file: /var/www/project/\n# owner: alice\n# group: webteam\nuser::rwx\ngroup::r-x\nother::r-x\n\n# Grant additional user (bob) read access\nsetfacl -m u:bob:r-- /var/www/project/secret.conf\n\n# Grant a specific group write access\nsetfacl -m g:deployteam:rw /var/www/project/config/\n\n# Apply ACL recursively\nsetfacl -R -m u:bob:rx /var/www/project/\n\n# Set default ACL for new files in directory\nsetfacl -d -m u:bob:rx /var/www/project/\n\n# Remove ACL entry\nsetfacl -x u:bob /var/www/project/secret.conf\n\n# Remove all ACLs\nsetfacl -b /var/www/project/secret.conf',
    acl_p3: 'When a file has ACLs, <code>ls -l</code> shows a <code>+</code> after the permission string: <code>-rw-r--r--+</code>. The effective permission for a user is determined by combining the base permissions with any applicable ACL entries. Mask entries in ACLs can further limit effective permissions.',

    h2_faq: '13. Frequently Asked Questions',
    faq1_q: 'What does chmod 755 mean?',
    faq1_a: 'chmod 755 sets the owner permissions to rwx (read+write+execute = 7), the group to r-x (read+execute = 5), and others to r-x (5). In symbolic notation: rwxr-xr-x. This is the standard permission for directories and executable scripts because everyone can read and enter/run, but only the owner can modify.',
    faq2_q: 'What is the difference between chmod 644 and chmod 755?',
    faq2_a: 'chmod 644 (rw-r--r--) removes execute permission from all three layers. This is the standard for regular files like HTML, CSS, PHP files, and documents that should be read but not executed. chmod 755 (rwxr-xr-x) adds execute permission to all three layers, making it appropriate for directories (execute = traverse) and executable scripts. Use 644 for static files, 755 for directories and scripts.',
    faq3_q: 'Is chmod 777 ever safe to use?',
    faq3_a: 'chmod 777 grants full read, write, and execute access to every user on the system. It is almost never safe in production environments. If multiple users share a server (typical of VPS, cloud instances, shared hosting), any user could read sensitive files or inject malicious code. For troubleshooting in an isolated development environment it can be a temporary diagnostic tool, but it must be changed before any real deployment. If your application only works with 777, the actual problem is incorrect ownership or group membership.',
    faq4_q: 'How do I make a shell script executable?',
    faq4_a: 'Use chmod +x script.sh to add execute permission for the owner. If others also need to run it, use chmod 755 script.sh. Remember that making a file executable does not guarantee it will run correctly — you also need a valid shebang line at the top (e.g., #!/bin/bash or #!/usr/bin/env python3) and the correct interpreter installed.',
    faq5_q: 'What is umask and how does it affect new file permissions?',
    faq5_a: 'The umask (user file creation mask) is subtracted from the default permissions when new files are created. The default new file permission is 666 (rw-rw-rw-) and for directories it is 777. A common umask of 022 results in files created with 644 (666-022) and directories with 755 (777-022). A stricter umask of 027 gives files 640 and directories 750. Run umask in your shell to see the current value, and set it in ~/.bashrc or /etc/profile to make it persistent.',
    faq6_q: 'What does the + mean in ls -la output?',
    faq6_a: 'A + at the end of the permission string (e.g., -rw-r--r--+) indicates the file has extended Access Control List (ACL) entries beyond the standard owner/group/others model. Use getfacl filename to see the full ACL. A . (dot) at the end indicates the file has SELinux security context applied. Both + and . can appear simultaneously.',
    faq7_q: 'How do I recursively fix web server permissions?',
    faq7_a: 'The safest approach uses find to apply different permissions to files and directories separately. Run: find /var/www/html -type d -exec chmod 755 {} + to set all directories to 755, then find /var/www/html -type f -exec chmod 644 {} + to set all files to 644. Then set ownership with chown -R www-data:www-data /var/www/html. Always double-check the target path before running recursive commands.',
    faq8_q: 'Can I use chmod on macOS?',
    faq8_a: 'Yes. macOS is based on BSD Unix and supports the same chmod syntax as Linux, including both numeric and symbolic modes. However, macOS also has its own extended ACL system using chmod +a and chmod -a (different from the Linux setfacl approach). You can view ACLs with ls -le. The behavior of special bits like setuid on directories differs slightly between macOS and Linux.',

    conclusion: 'Understanding Linux file permissions is a foundational skill for every developer working with servers, containers, or CI/CD pipelines. The three-layer model (owner, group, others), the numeric encoding (read=4, write=2, execute=1), and the key values (644, 755, 600) cover the vast majority of real-world scenarios. For complex access patterns, ACLs provide the flexibility of per-user and per-group rules. Use our chmod calculator to generate the exact command you need without manually computing octal sums.',
    linkToolBottom: 'Calculate any chmod value instantly with our free online chmod calculator.',
  },

  zh: {
    tldr: 'Linux 文件权限控制谁可以读取、写入或执行文件和目录。每个权限由三层（所有者、组、其他人）和三种操作（r=4, w=2, x=1）描述。chmod 755 表示所有者拥有完全访问权限（7=rwx），组和其他人拥有读取和执行权限（5=r-x）。使用我们的免费 chmod 计算器，无需记住八进制数学即可生成精确命令。',

    takeaway1: '每个 Linux 文件都有三个权限层：所有者（u）、组（g）和其他人（o）。',
    takeaway2: '读取=4，写入=2，执行=1。每层相加：chmod 644 = rw-r--r--。',
    takeaway3: '目录和可执行文件用 chmod 755；普通文件用 chmod 644；敏感文件用 chmod 600。',
    takeaway4: 'chmod -R 递归应用权限；使用 find 对文件和目录分别应用不同规则。',
    takeaway5: '特殊位：setuid（4000）、setgid（2000）、sticky bit（1000）——使用前务必理解其含义。',
    takeaway6: '生产环境中永远不要使用 chmod 777——它让系统上的每个用户都有读/写/执行权限。',
    takeaway7: '使用 chown 更改所有权，chgrp 更改组，chmod 更改权限。',
    takeaway8: 'ACL（访问控制列表）将经典的 9 位模型扩展为每用户和每组规则。',

    h2_what: '1. 什么是 Linux 文件权限？',
    what_p1: 'Linux 或类 Unix 系统上的每个文件和目录都携带一组<strong>文件权限</strong>来控制访问。这些权限以元数据形式存储在文件旁边，内核在每次读取、写入或执行操作时都会强制执行。运行 <code>ls -la</code> 时，最左侧的列显示权限字符串，例如 <code>-rwxr-xr--</code>。理解此字符串是掌握 Linux 安全的第一步。',
    what_p2: '权限系统有三种基本<strong>访问类型</strong>。<strong>读取（r）</strong>允许用户查看文件内容或列出目录内容。<strong>写入（w）</strong>允许修改文件或在目录中创建、删除和重命名条目。<strong>执行（x）</strong>允许将文件作为程序（脚本、二进制文件）运行，或使用 <code>cd</code> 命令进入目录。没有目录的执行权限，即使有读取权限也无法访问其中的任何内容。',
    what_p3: '<code>ls -l</code> 的权限字符串有 10 个字符。第一个字符表示文件类型：<code>-</code> 是普通文件，<code>d</code> 是目录，<code>l</code> 是符号链接。其余九个字符是三组各三位，分别代表所有者、组和其他人的权限。',
    what_code1: '-rwxr-xr--  2  alice  webteam  4096  Feb 27  deploy.sh\n^\u2514\u2500 文件类型: - = 普通文件\n \\rwx\u2500\u2500\u2500\u2500\u2500\u2500  所有者(alice): 读 + 写 + 执行\n    \\r-x\u2500\u2500\u2500  组(webteam): 读 + 执行\n       \\r--    其他人: 仅读',

    h2_layers: '2. 三层模型：所有者、组、其他人',
    layers_p1: 'Linux 使用三层访问模型。<strong>所有者</strong>（也称"用户"或"u"）是创建文件的账户。<strong>组</strong>（"g"）是共享公共访问权限的用户命名集合。<strong>其他人</strong>（"o"）指系统上所有既不是所有者也不在文件组中的其他人。',
    layers_p2: '内核检查权限时按顺序检查各层。如果请求用户是文件所有者，则应用所有者位，不再进行进一步检查。如果用户是文件组的成员，则应用组位。否则，应用其他人位。常见陷阱：权限为 <code>---rwxrwx</code> 的文件给所有者<em>无访问权</em>，而组和其他人有完全访问权。',
    layers_p3: '使用 <code>ls -la</code> 可以查看文件的所有者和组——第三列和第四列分别显示所有者和组名称。使用 <code>stat filename</code> 获取更多详情，包括权限的八进制表示：',
    layers_code: '$ ls -la deploy.sh\n-rwxr-xr--  1  alice  webteam  4096  deploy.sh\n\n$ stat deploy.sh\n  File: deploy.sh\n  Size: 4096      Blocks: 8    IO Block: 4096  regular file\nAccess: (0754/-rwxr-xr--)  Uid: ( 1001/   alice)   Gid: ( 1002/ webteam)',

    h2_numeric: '3. 数字（八进制）vs 符号表示法',
    numeric_p1: 'Linux 权限可以用两种方式表示：<strong>数字（八进制）</strong>和<strong>符号</strong>。两者都表示相同的九个位，但在不同场景下各有优势。数字形式在一次设置所有权限时更快更直观。符号形式在只想添加或删除单个权限而不影响其他权限时更好。',
    numeric_p2: '在<strong>数字模式</strong>中，每种权限类型被分配一个数值：<strong>读取 = 4</strong>，<strong>写入 = 2</strong>，<strong>执行 = 1</strong>。对每层（所有者、组、其他人），将想要授予的权限值相加，产生 0 到 7 之间的数字。三个这样的数字构成完整的权限号。例如，<code>chmod 755</code> 意味着：所有者 7（4+2+1 = rwx），组 5（4+0+1 = r-x），其他人 5（4+0+1 = r-x）。',
    numeric_table_intro: '八个可能八进制数字的快速参考：',
    numeric_p3: '在<strong>符号模式</strong>中，指定<em>谁</em>（<code>u</code>=所有者，<code>g</code>=组，<code>o</code>=其他人，<code>a</code>=所有人），<em>操作符</em>（<code>+</code>=添加，<code>-</code>=删除，<code>=</code>=精确设置）和<em>权限</em>（<code>r</code>、<code>w</code>、<code>x</code>）。多个更改可以用逗号分隔。符号模式的关键优势是不会改变未提及的位。',
    numeric_code: '# 数字模式——一次设置所有九个位\nchmod 755 script.sh    # rwxr-xr-x\nchmod 644 index.html   # rw-r--r--\nchmod 600 .env         # rw-------\n\n# 符号模式——修改特定位\nchmod u+x script.sh    # 为所有者添加执行权限\nchmod go-w config.php  # 从组和其他人删除写权限\nchmod a+r readme.txt   # 为所有人添加读权限\nchmod u=rwx,go=rx dir/ # 精确设置：755',

    h2_common: '4. 常用权限值：644、755、777、700、600',
    common_p1: '某些权限值在 Web 开发、DevOps 和系统管理中经常出现。熟记它们让你更快更安全。以下是最重要的 chmod 值综合参考表：',
    common_p2: '最重要的三个值：<strong>644</strong>（标准文件）、<strong>755</strong>（标准目录或可执行文件）和 <strong>600</strong>（敏感机密）。记住这三个，你就能正确处理 90% 的现实场景。',
    common_p3: '对于 Web 服务器，典型约定是目录用 755，文件用 644。这允许 Web 服务器进程（通常以 www-data 或 nginx 运行）遍历目录和读取文件，同时防止未授权修改。包含凭据的配置文件应该是 640 或 600。',

    h2_special: '5. 理解 setuid、setgid 和 Sticky Bit',
    special_p1: '除了标准的九个权限位外，Linux 还支持三个<strong>特殊权限位</strong>，用于修改文件和目录的行为方式。它们在八进制表示法中用前导第四位数字表示，在 <code>ls -l</code> 输出中显示为特殊字符。误解它们是常见的安全漏洞来源。',
    special_suid_title: 'setuid（SUID）—— 4000',
    special_suid_desc: '当 setuid 位设置在<strong>可执行文件</strong>上时，进程以<strong>文件所有者的有效用户 ID</strong>运行，而不是执行它的用户。经典例子是 <code>/usr/bin/passwd</code>：它需要 root 权限来修改 <code>/etc/shadow</code>，但任何用户都必须能够更改自己的密码。在 <code>ls -l</code> 中，SUID 替换所有者执行位：<code>-rwsr-xr-x</code>。',
    special_sgid_title: 'setgid（SGID）—— 2000',
    special_sgid_desc: '在<strong>可执行文件</strong>上，setgid 使进程以<strong>文件的组</strong>作为有效组 ID 运行。在<strong>目录</strong>上更常用：目录内创建的新文件和子目录自动<strong>继承目录的组</strong>，而不是创建者的主组。这是共享团队目录的标准机制。',
    special_sticky_title: 'Sticky Bit —— 1000',
    special_sticky_desc: '在<strong>目录</strong>上，sticky bit 限制删除：只有<strong>文件所有者</strong>、<strong>目录所有者</strong>或 <strong>root</strong> 才能删除或重命名其中的文件，即使其他用户对目录有写入权限。典型例子是 <code>/tmp</code>（权限 <code>1777</code>）。',
    special_code: '# 设置特殊位（数字：前缀加 4、2 或 1）\nchmod 4755 /usr/local/bin/myapp  # setuid: rwsr-xr-x\nchmod 2775 /var/www/shared        # setgid: rwxrwsr-x\nchmod 1777 /tmp/scratch           # sticky: rwxrwxrwt\n\n# 符号替代\nchmod u+s myapp   # 设置 SUID\nchmod g+s shared/ # 在目录上设置 SGID\nchmod +t scratch/ # 设置 sticky bit',

    h2_chmod_vs: '6. chmod vs chown vs chgrp',
    chmodvs_p1: 'Linux 中的权限管理涉及三个经常被混淆的不同命令。理解它们之间的差异对正确的系统管理至关重要。',
    chmodvs_p2: '<strong>chmod</strong>（更改模式）修改文件或目录的<em>权限位</em>。它改变谁可以读取、写入或执行文件，但不改变文件的所有者或组。语法：<code>chmod [选项] 模式 文件...</code>',
    chmodvs_p3: '<strong>chown</strong>（更改所有者）更改文件的<em>所有者</em>和可选的<em>组</em>。只有 root 可以更改文件的所有者。普通用户可以将组更改为他们所属的另一个组。语法：<code>chown [选项] 所有者[:组] 文件...</code>',
    chmodvs_p4: '<strong>chgrp</strong>（更改组）仅更改文件的<em>组</em>。等同于 <code>chown :group file</code>，但在只想更改组时更明确。语法：<code>chgrp [选项] 组 文件...</code>',
    chmodvs_code: '# chmod: 更改权限\nchmod 644 config.php\nchmod u+x deploy.sh\n\n# chown: 更改所有者\nchown alice file.txt          # 将所有者更改为 alice\nchown alice:webteam file.txt  # 更改所有者和组\nchown -R www-data:www-data /var/www/html/\n\n# chgrp: 更改组\nchgrp webteam project.conf\nchgrp -R developers /srv/app/',

    h2_lsla: '7. 使用 ls -la 查看权限',
    lsla_p1: '<code>ls -la</code> 命令是检查文件权限的标准方式。<code>-l</code> 标志启用长格式，<code>-a</code> 显示隐藏文件。每行包含权限字符串、硬链接数、所有者名、组名、文件大小、修改时间戳和文件名。',
    lsla_p2: '解读权限字符串：第一个字符是文件类型。接下来三个字符是<strong>所有者的</strong>权限（读、写、执行）。随后三个是<strong>组的</strong>权限。最后三个是<strong>其他人的</strong>权限。字母表示授予了该权限，短横线表示拒绝。',
    lsla_code: '$ ls -la /var/www/html/\ntotal 48\ndrwxr-xr-x  4  www-data  www-data  4096  Feb 27 .\n-rw-r--r--  1  www-data  www-data  2048  Feb 27 index.html\n-rw-r-----  1  www-data  www-data   512  Feb 25 config.php\ndrwxrws---  2  www-data  webteam   4096  Feb 27 uploads/\n\n# -rw-r----- 的解析:\n# - : 普通文件\n# rw- : 所有者可读写 (6)\n# r-- : 组只能读 (4)\n# --- : 其他人无权限 (0)\n# = chmod 640',
    lsla_p3: '<code>stat</code> 命令提供更多详情，包括直接显示八进制权限值。这在脚本编写和验证时非常有用：',
    lsla_code2: '$ stat /var/www/html/config.php\n  File: /var/www/html/config.php\n  Size: 512\n  Access: (0640/-rw-r-----)\n  Uid: (33/www-data)  Gid: (33/www-data)',

    h2_recursive: '8. 使用 chmod -R 递归更改权限',
    recursive_p1: '<code>-R</code>（递归）标志将权限更改应用于目录及其所有内容。虽然方便，但必须谨慎使用，因为它对文件和目录应用相同的权限位——而这两者通常有不同的需求。',
    recursive_p2: '简单的 <code>chmod -R 755</code> 的问题：目录需要执行权限（可遍历），但普通文件通常不应该可执行。递归设置 755 会使每个文件都可执行，这既不必要又是安全隐患。',
    recursive_p3: '正确方法是使用 <code>find</code> 结合 <code>-type f</code> 和 <code>-type d</code> 对文件和目录分别应用不同的权限：',
    recursive_code: '# 错误：也会让所有文件可执行\nchmod -R 755 /var/www/html/\n\n# 正确：对文件和目录分别设置不同权限\nfind /var/www/html -type d -exec chmod 755 {} +\nfind /var/www/html -type f -exec chmod 644 {} +',

    h2_webserver: '9. Web 服务器权限最佳实践',
    webserver_p1: 'Web 服务器权限是任何应用部署中最关键的安全配置之一。设置错误可能导致数据泄露、网站篡改或权限提升。',
    webserver_p2: '<strong>Web 根目录文件和目录：</strong>标准约定是文件 644，目录 755。Web 服务器进程（www-data、nginx 或 apache）需要读取文件和遍历目录的权限，但永远不要给 Web 服务器对 Web 根目录的写访问权限。',
    webserver_code1: '# 标准 Web 服务器权限\nfind /var/www/html -type d -exec chmod 755 {} +\nfind /var/www/html -type f -exec chmod 644 {} +\n\n# 所有权：root 拥有文件，Web 服务器可读\nchown -R root:www-data /var/www/html/\n\n# PHP/配置文件：更严格\nchmod 640 /var/www/html/config.php\nchmod 600 /var/www/html/.env',
    webserver_p3: '<strong>上传目录：</strong>如果应用允许文件上传，上传目录必须对 Web 服务器进程可写：',
    webserver_code2: '# 上传目录：Web 服务器可写\nchmod 2775 /var/www/html/uploads/\nchown root:www-data /var/www/html/uploads/',
    webserver_p4: '<strong>SSH 密钥：</strong>SSH 对密钥权限非常严格。权限过于开放时，SSH 会拒绝使用密钥。',
    webserver_code3: '# SSH 密钥：需要精确的权限\nchmod 700 ~/.ssh/\nchmod 600 ~/.ssh/id_ed25519\nchmod 644 ~/.ssh/id_ed25519.pub\nchmod 600 ~/.ssh/authorized_keys',
    webserver_p5: '<strong>环境和机密文件：</strong>包含 API 密钥、数据库密码和其他凭据的文件必须限制为最低必要访问权限：',
    webserver_code4: '# 机密文件：仅所有者读写\nchmod 600 .env\nchmod 600 database.yml\nchmod 400 ssl-private.key',

    h2_trouble: '10. 故障排查：403 Forbidden 和 Permission denied',
    trouble_p1: '权限错误是部署期间应用程序故障最常见的原因之一。最常见的两个错误是 HTTP 403 Forbidden 和 shell 的"Permission denied"消息。',
    trouble_403_title: 'HTTP 403 Forbidden',
    trouble_403_desc: 'Web 服务器的 403 错误几乎总是表示权限问题。检查文件本身AND路径中所有父目录的权限：',
    trouble_code1: '# 检查完整路径权限\nnamei -l /var/www/html/app/config.php\n\n# 修复目录\nchmod 755 /var/www/html/app/\n\n# 检查 Web 服务器用户是否可以读取文件\nsudo -u www-data stat /var/www/html/app/config.php',
    trouble_denied_title: 'Shell 中的 Permission Denied',
    trouble_denied_desc: 'Shell "Permission denied" 错误发生在用户缺少必要的权限位时。使用 <code>ls -la</code> 诊断并与当前用户比较：',
    trouble_code2: '# 检查当前用户\nwhoami && id\n\n# 检查文件权限\nls -la problematic-file\n\n# 常见修复\nchmod +x script.sh      # 忘记使脚本可执行\nsudo chown $USER file   # 错误的所有者',

    h2_filevdir: '11. 文件 vs 目录权限：关键差异',
    filevdir_p1: '相同的权限位对文件和目录意义不同。这种区别让许多开发者困惑，尤其是在设置递归权限时。',
    filevdir_p2: '<strong>对于文件：</strong>读取（r）允许查看文件内容。写入（w）允许修改或替换文件内容。执行（x）允许将文件作为程序运行。',
    filevdir_p3: '<strong>对于目录：</strong>读取（r）允许使用 <code>ls</code> 列出目录内容。写入（w）允许在目录内创建、删除和重命名条目。执行（x）允许使用 <code>cd</code> 进入目录并按名称访问其中的文件。',
    filevdir_table: '目录的写入权限允许删除其中的任何文件，无论文件本身的权限如何。这就是 <code>/tmp</code> 上的 sticky bit（1000）至关重要的原因——它防止用户删除彼此的文件，尽管对目录有写访问权限。',

    h2_acl: '12. ACL（访问控制列表）用于高级权限',
    acl_p1: '经典的 Unix 权限模型（所有者/组/其他人）每个文件只允许一个所有者和一个组。对于需要多个特定用户或组访问的场景，该模型变得有限。<strong>访问控制列表（ACL）</strong>将权限系统扩展为允许每用户和每组规则。',
    acl_p2: 'ACL 在大多数现代 Linux 文件系统（ext4、xfs、btrfs）上受支持，可以使用 <code>getfacl</code> 和 <code>setfacl</code> 命令管理。',
    acl_code: '# 查看 ACL\ngetfacl /var/www/project/\n\n# 授予特定用户（bob）读取权限\nsetfacl -m u:bob:r-- /var/www/project/secret.conf\n\n# 授予特定组写访问权限\nsetfacl -m g:deployteam:rw /var/www/project/config/\n\n# 递归应用 ACL\nsetfacl -R -m u:bob:rx /var/www/project/\n\n# 为新文件设置默认 ACL\nsetfacl -d -m u:bob:rx /var/www/project/\n\n# 删除 ACL 条目\nsetfacl -x u:bob /var/www/project/secret.conf',
    acl_p3: '当文件有 ACL 时，<code>ls -l</code> 在权限字符串后显示 <code>+</code>：<code>-rw-r--r--+</code>。使用 <code>getfacl filename</code> 查看完整 ACL。',

    h2_faq: '13. 常见问题',
    faq1_q: 'chmod 755 是什么意思？',
    faq1_a: 'chmod 755 将所有者权限设置为 rwx（读+写+执行=7），组设置为 r-x（读+执行=5），其他人设置为 r-x（5）。符号表示：rwxr-xr-x。这是目录和可执行脚本的标准权限，因为所有人都可以读取和进入/运行，但只有所有者可以修改。',
    faq2_q: 'chmod 644 和 chmod 755 有什么区别？',
    faq2_a: 'chmod 644（rw-r--r--）从所有三层删除执行权限。这是普通文件（如 HTML、CSS、PHP 文件和文档）的标准设置，这些文件应该被读取但不应被执行。chmod 755（rwxr-xr-x）向所有三层添加执行权限，适用于目录（执行=遍历）和可执行脚本。',
    faq3_q: 'chmod 777 有时安全吗？',
    faq3_a: 'chmod 777 给系统上的每个用户完全的读、写和执行权限。在生产环境中几乎永远不安全。如果你的应用只在 777 下工作，实际问题是错误的所有权或组成员身份。',
    faq4_q: '如何使 shell 脚本可执行？',
    faq4_a: '使用 chmod +x script.sh 为所有者添加执行权限。如果其他人也需要运行它，使用 chmod 755 script.sh。记住，使文件可执行并不保证它会正确运行——还需要在顶部有有效的 shebang 行（如 #!/bin/bash）和已安装的正确解释器。',
    faq5_q: '什么是 umask 以及它如何影响新文件权限？',
    faq5_a: 'umask（用户文件创建掩码）在创建新文件时从默认权限中减去。新文件的默认权限是 666，目录是 777。常见的 umask 022 导致文件以 644（666-022）创建，目录以 755 创建。运行 umask 查看当前值，在 ~/.bashrc 中设置使其持久化。',
    faq6_q: 'ls -la 输出中的 + 是什么意思？',
    faq6_a: '权限字符串末尾的 + 表示文件有超出标准模型的扩展 ACL 条目。使用 getfacl filename 查看完整 ACL。点（.）表示文件应用了 SELinux 安全上下文。',
    faq7_q: '如何递归修复 Web 服务器权限？',
    faq7_a: '最安全的方法使用 find 对文件和目录分别应用不同的权限。运行：find /var/www/html -type d -exec chmod 755 {} + 设置所有目录，然后 find /var/www/html -type f -exec chmod 644 {} + 设置所有文件。然后用 chown -R www-data:www-data /var/www/html 设置所有权。在运行递归命令前始终仔细检查目标路径。',
    faq8_q: '可以在 macOS 上使用 chmod 吗？',
    faq8_a: '可以。macOS 基于 BSD Unix，支持与 Linux 相同的 chmod 语法，包括数字和符号模式。macOS 还有自己的扩展 ACL 系统（使用 chmod +a 和 chmod -a）。',

    conclusion: '理解 Linux 文件权限是每个使用服务器、容器或 CI/CD 管道的开发者的基础技能。三层模型（所有者、组、其他人）、数字编码（读取=4，写入=2，执行=1）和关键值（644、755、600）覆盖了绝大多数现实场景。使用我们的 chmod 计算器无需手动计算八进制即可生成所需的精确命令。',
    linkToolBottom: '使用我们的免费在线 chmod 计算器即时计算任何 chmod 值。',
  },
};

export default function ChmodCalculatorOnlineGuide({ lang }: { lang: string }) {
  const s = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
      { '@type': 'Question', name: s.faq6_q, acceptedAnswer: { '@type': 'Answer', text: s.faq6_a } },
      { '@type': 'Question', name: s.faq7_q, acceptedAnswer: { '@type': 'Answer', text: s.faq7_a } },
      { '@type': 'Question', name: s.faq8_q, acceptedAnswer: { '@type': 'Answer', text: s.faq8_a } },
    ],
  };

  const octalRows = [
    { octal: '0', rwx: '---', meaning: lang === 'zh' ? '无权限' : 'No permissions' },
    { octal: '1', rwx: '--x', meaning: lang === 'zh' ? '仅执行' : 'Execute only' },
    { octal: '2', rwx: '-w-', meaning: lang === 'zh' ? '仅写入' : 'Write only' },
    { octal: '3', rwx: '-wx', meaning: lang === 'zh' ? '写入 + 执行' : 'Write + Execute' },
    { octal: '4', rwx: 'r--', meaning: lang === 'zh' ? '仅读取' : 'Read only' },
    { octal: '5', rwx: 'r-x', meaning: lang === 'zh' ? '读取 + 执行' : 'Read + Execute' },
    { octal: '6', rwx: 'rw-', meaning: lang === 'zh' ? '读取 + 写入' : 'Read + Write' },
    { octal: '7', rwx: 'rwx', meaning: lang === 'zh' ? '读取 + 写入 + 执行' : 'Read + Write + Execute' },
  ];

  const commonPerms = [
    { octal: '777', sym: 'rwxrwxrwx', meaning: lang === 'zh' ? '所有人完全访问' : 'Full access for everyone', use: lang === 'zh' ? '仅临时调试，生产环境绝不使用' : 'Temporary debug only; NEVER production', danger: true },
    { octal: '755', sym: 'rwxr-xr-x', meaning: lang === 'zh' ? '所有者完全；其他人读+执行' : 'Owner full; others read+execute', use: lang === 'zh' ? '目录、可执行脚本、Web 服务器文档根' : 'Directories, scripts, web root', danger: false },
    { octal: '775', sym: 'rwxrwxr-x', meaning: lang === 'zh' ? '所有者+组完全；其他人读+执行' : 'Owner+group full; others read+execute', use: lang === 'zh' ? '共享团队目录' : 'Shared team directories', danger: false },
    { octal: '750', sym: 'rwxr-x---', meaning: lang === 'zh' ? '所有者完全；组读+执行；其他人无' : 'Owner full; group read+execute; others none', use: lang === 'zh' ? '私有项目目录' : 'Private project directories', danger: false },
    { octal: '700', sym: 'rwx------', meaning: lang === 'zh' ? '仅所有者完全访问' : 'Owner full access only', use: lang === 'zh' ? '~/.ssh 目录，私有脚本' : '~/.ssh directory, private scripts', danger: false },
    { octal: '666', sym: 'rw-rw-rw-', meaning: lang === 'zh' ? '所有人读+写，无执行' : 'Read+write for all, no execute', use: lang === 'zh' ? '临时共享文件（罕用）' : 'Temporary shared files (rare)', danger: true },
    { octal: '644', sym: 'rw-r--r--', meaning: lang === 'zh' ? '所有者读+写；其他人只读' : 'Owner read+write; others read only', use: lang === 'zh' ? 'HTML、CSS、PHP、普通文档' : 'HTML, CSS, PHP, regular documents', danger: false },
    { octal: '640', sym: 'rw-r-----', meaning: lang === 'zh' ? '所有者读+写；组只读；其他人无' : 'Owner rw; group read; others none', use: lang === 'zh' ? '日志文件、共享配置' : 'Log files, shared configs', danger: false },
    { octal: '600', sym: 'rw-------', meaning: lang === 'zh' ? '仅所有者读+写' : 'Owner read+write only', use: lang === 'zh' ? 'SSH 私钥、.env 文件、数据库凭据' : 'SSH private keys, .env, credentials', danger: false },
    { octal: '400', sym: 'r--------', meaning: lang === 'zh' ? '仅所有者只读' : 'Owner read only', use: lang === 'zh' ? 'SSL 证书、只读机密' : 'SSL certificates, read-only secrets', danger: false },
  ];

  const fileDirDiffs = [
    {
      bit: 'r (4)',
      file: lang === 'zh' ? '查看文件内容 (cat, less, vim)' : 'View file contents (cat, less, vim)',
      dir: lang === 'zh' ? '列出目录内容 (ls)' : 'List directory contents (ls)',
    },
    {
      bit: 'w (2)',
      file: lang === 'zh' ? '修改、覆盖、截断文件' : 'Modify, overwrite, truncate file',
      dir: lang === 'zh' ? '在目录内创建、删除、重命名条目' : 'Create, delete, rename entries inside',
    },
    {
      bit: 'x (1)',
      file: lang === 'zh' ? '将文件作为程序运行' : 'Run file as a program',
      dir: lang === 'zh' ? '进入目录 (cd)，通过名称访问文件' : 'Enter directory (cd), access files by name',
    },
  ];

  const isZh = lang === 'zh';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          {s.tldr}{' '}
          <Link href={`/${lang}/tools/chmod-calculator`} style={{ fontWeight: 600 }}>
            {isZh ? '免费 chmod 计算器' : 'Free chmod Calculator'}
          </Link>
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>{s.takeaway1}</strong></li>
          <li>{s.takeaway2}</li>
          <li>{s.takeaway3}</li>
          <li>{s.takeaway4}</li>
          <li>{s.takeaway5}</li>
          <li>{s.takeaway6}</li>
          <li>{s.takeaway7}</li>
          <li>
            {s.takeaway8}{' '}
            <Link href={`/${lang}/tools/chmod-calculator`} style={{ fontWeight: 600 }}>
              {isZh ? '试试我们的 chmod 计算器' : 'Try our chmod calculator'}
            </Link>.
          </li>
        </ul>
      </div>

      {/* Section 1 */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.what_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.what_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.what_p3 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.what_code1}</code>
      </pre>

      <p>
        <Link href={`/${lang}/tools/chmod-calculator`} style={{ fontWeight: 600 }}>
          {isZh ? '→ 立即试用我们的免费交互式 chmod 计算器' : '→ Try our free interactive chmod calculator now'}
        </Link>
      </p>

      {/* Section 2 */}
      <h2>{s.h2_layers}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.layers_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.layers_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.layers_p3 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.layers_code}</code>
      </pre>

      {/* Section 3 */}
      <h2>{s.h2_numeric}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.numeric_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.numeric_p2 }} />
      <p>{s.numeric_table_intro}</p>

      <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
                {isZh ? '八进制' : 'Octal'}
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
                {isZh ? '符号' : 'Symbolic'}
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
                {isZh ? '含义' : 'Meaning'}
              </th>
            </tr>
          </thead>
          <tbody>
            {octalRows.map((row, i) => (
              <tr key={row.octal} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', fontWeight: 600 }}>{row.octal}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#059669' }}>{row.rwx}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>{row.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p dangerouslySetInnerHTML={{ __html: s.numeric_p3 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.numeric_code}</code>
      </pre>

      {/* Section 4 */}
      <h2>{s.h2_common}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.common_p1 }} />

      <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
                {isZh ? '八进制' : 'Octal'}
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
                {isZh ? '符号' : 'Symbolic'}
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
                {isZh ? '含义' : 'Meaning'}
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
                {isZh ? '典型用途' : 'Typical Use'}
              </th>
            </tr>
          </thead>
          <tbody>
            {commonPerms.map((row, i) => (
              <tr key={row.octal} style={{ background: row.danger ? '#fff7ed' : (i % 2 === 0 ? '#ffffff' : '#f8fafc') }}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', fontWeight: 700, color: row.danger ? '#c2410c' : '#1e293b' }}>{row.octal}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#059669', fontSize: '0.875em' }}>{row.sym}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>{row.meaning}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', color: row.danger ? '#c2410c' : '#374151', fontSize: '0.9em' }}>{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p dangerouslySetInnerHTML={{ __html: s.common_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.common_p3 }} />

      {/* Section 5 */}
      <h2>{s.h2_special}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.special_p1 }} />

      <h3 style={{ color: '#1e40af' }}>{s.special_suid_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.special_suid_desc }} />

      <h3 style={{ color: '#1e40af' }}>{s.special_sgid_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.special_sgid_desc }} />

      <h3 style={{ color: '#1e40af' }}>{s.special_sticky_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.special_sticky_desc }} />

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.special_code}</code>
      </pre>

      {/* Section 6 */}
      <h2>{s.h2_chmod_vs}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.chmodvs_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.chmodvs_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.chmodvs_p3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.chmodvs_p4 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.chmodvs_code}</code>
      </pre>

      {/* Section 7 */}
      <h2>{s.h2_lsla}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.lsla_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.lsla_p2 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.lsla_code}</code>
      </pre>
      <p dangerouslySetInnerHTML={{ __html: s.lsla_p3 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.lsla_code2}</code>
      </pre>

      {/* Section 8 */}
      <h2>{s.h2_recursive}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.recursive_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.recursive_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.recursive_p3 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.recursive_code}</code>
      </pre>

      {/* Section 9 */}
      <h2>{s.h2_webserver}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.webserver_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.webserver_p2 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.webserver_code1}</code>
      </pre>
      <p dangerouslySetInnerHTML={{ __html: s.webserver_p3 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.webserver_code2}</code>
      </pre>
      <p dangerouslySetInnerHTML={{ __html: s.webserver_p4 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.webserver_code3}</code>
      </pre>
      <p dangerouslySetInnerHTML={{ __html: s.webserver_p5 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.webserver_code4}</code>
      </pre>

      {/* Tool CTA */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', margin: '24px 0' }}>
        <p style={{ margin: 0, fontWeight: 500 }}>
          {isZh ? '需要生成精确的 chmod 命令？' : 'Need to generate the exact chmod command?'}{' '}
          <Link href={`/${lang}/tools/chmod-calculator`} style={{ fontWeight: 700 }}>
            {isZh ? '使用我们的免费 chmod 计算器' : 'Use our free chmod calculator'}
          </Link>
          {' '}{isZh ? '——勾选复选框即可即时查看八进制值、符号表示和完整的 chmod 命令。' : '— check the boxes and instantly see the octal value, symbolic notation, and full chmod command.'}
        </p>
      </div>

      {/* Section 10 */}
      <h2>{s.h2_trouble}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.trouble_p1 }} />

      <h3 style={{ color: '#dc2626' }}>{s.trouble_403_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.trouble_403_desc }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.trouble_code1}</code>
      </pre>

      <h3 style={{ color: '#dc2626' }}>{s.trouble_denied_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.trouble_denied_desc }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.trouble_code2}</code>
      </pre>

      {/* Section 11 */}
      <h2>{s.h2_filevdir}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.filevdir_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.filevdir_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.filevdir_p3 }} />

      <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
                {isZh ? '权限位' : 'Permission Bit'}
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
                {isZh ? '文件' : 'File'}
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
                {isZh ? '目录' : 'Directory'}
              </th>
            </tr>
          </thead>
          <tbody>
            {fileDirDiffs.map((row, i) => (
              <tr key={row.bit} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', fontWeight: 600 }}>{row.bit}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>{row.file}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>{row.dir}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p dangerouslySetInnerHTML={{ __html: s.filevdir_table }} />

      {/* Section 12 */}
      <h2>{s.h2_acl}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.acl_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.acl_p2 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875em', lineHeight: 1.6 }}>
        <code>{s.acl_code}</code>
      </pre>
      <p dangerouslySetInnerHTML={{ __html: s.acl_p3 }} />

      {/* Section 13: FAQ */}
      <h2>{s.h2_faq}</h2>

      {[
        [s.faq1_q, s.faq1_a],
        [s.faq2_q, s.faq2_a],
        [s.faq3_q, s.faq3_a],
        [s.faq4_q, s.faq4_a],
        [s.faq5_q, s.faq5_a],
        [s.faq6_q, s.faq6_a],
        [s.faq7_q, s.faq7_a],
        [s.faq8_q, s.faq8_a],
      ].map(([q, a], idx) => (
        <div key={idx} style={{ marginBottom: '16px', padding: '16px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
          <p style={{ fontWeight: 700, marginBottom: '8px', color: '#1e293b' }}>{q}</p>
          <p style={{ margin: 0, color: '#374151' }}>{a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <h2>{isZh ? '总结' : 'Conclusion'}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.conclusion }} />

      <p>
        <Link href={`/${lang}/tools/chmod-calculator`} style={{ fontWeight: 600 }}>
          {s.linkToolBottom}
        </Link>
      </p>
    </>
  );
}
