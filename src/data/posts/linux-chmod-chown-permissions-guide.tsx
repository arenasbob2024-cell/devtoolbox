'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Linux chmod, chown & chgrp: Complete File Permissions Guide',
    intro: 'Linux file permissions are the foundation of system security. Every file and directory on a Linux system has an owner, a group, and a set of permission flags that determine who can read, write, or execute it. Mastering <strong>chmod</strong>, <strong>chown</strong>, and <strong>chgrp</strong> is essential for any developer, sysadmin, or DevOps engineer working with servers, containers, or CI/CD pipelines. This comprehensive guide covers everything from basic permission concepts to advanced ACLs and real-world troubleshooting.',

    h2_permission_model: '1. The Linux Permission Model',
    p_permission_model: 'Linux uses a discretionary access control (DAC) model. Every file and directory has three categories of users and three types of permissions:',
    h3_user_categories: 'User Categories',
    user_owner: '<strong>User (u)</strong> — The file owner. Usually the user who created the file.',
    user_group: '<strong>Group (g)</strong> — Users belonging to the file\'s group. Useful for team collaboration.',
    user_other: '<strong>Other (o)</strong> — Everyone else on the system.',
    user_all: '<strong>All (a)</strong> — A shorthand for user + group + other.',
    h3_permission_types: 'Permission Types',
    perm_read: '<strong>Read (r = 4)</strong> — View file contents; list directory entries.',
    perm_write: '<strong>Write (w = 2)</strong> — Modify file contents; create, rename, or delete files in a directory.',
    perm_exec: '<strong>Execute (x = 1)</strong> — Run a file as a program; enter (cd into) a directory.',
    p_dir_note: 'Note: For directories, <code>read</code> means you can list contents, <code>write</code> means you can create/delete entries, and <code>execute</code> means you can traverse (cd into) the directory. A directory with read but no execute allows listing names but not accessing file metadata.',

    h2_reading_permissions: '2. Reading Permissions — ls -la Output Explained',
    p_reading_permissions: 'The <code>ls -la</code> command displays detailed file information including permissions. Here is how to read the output:',
    p_breakdown: 'Let\'s break down a typical permission string:',
    p_first_char: 'The first character indicates the file type: <code>-</code> for regular file, <code>d</code> for directory, <code>l</code> for symbolic link, <code>b</code> for block device, <code>c</code> for character device.',
    p_nine_chars: 'The next 9 characters are three groups of three: owner permissions, group permissions, and other permissions. Each group shows read (r), write (w), and execute (x) — or a dash (-) if the permission is not set.',

    h2_chmod_numeric: '3. chmod Numeric (Octal) Mode',
    p_chmod_numeric: 'In numeric mode, permissions are expressed as a three-digit (or four-digit for special permissions) octal number. Each digit is the sum of its permission values:',
    p_octal_calc: 'To calculate: add Read (4) + Write (2) + Execute (1) for each category. For example, <code>rwxr-xr--</code> = 7 (4+2+1), 5 (4+0+1), 4 (4+0+0) = <strong>754</strong>.',
    h3_common_perms: 'Common Permission Values',
    perm_777: '<strong>777</strong> (rwxrwxrwx) — Full access for everyone. DANGEROUS — avoid in production!',
    perm_755: '<strong>755</strong> (rwxr-xr-x) — Owner full access; group and others can read and execute. Standard for directories and scripts.',
    perm_644: '<strong>644</strong> (rw-r--r--) — Owner can read/write; others read only. Standard for regular files.',
    perm_600: '<strong>600</strong> (rw-------) — Owner read/write only. Use for private configs, SSH keys.',
    perm_400: '<strong>400</strong> (r--------) — Owner read only. Use for certificates and sensitive read-only data.',
    perm_750: '<strong>750</strong> (rwxr-x---) — Owner full; group read/execute; others no access. Good for shared project directories.',
    perm_700: '<strong>700</strong> (rwx------) — Owner full access only. Use for ~/.ssh directory.',

    h2_chmod_symbolic: '4. chmod Symbolic Mode',
    p_chmod_symbolic: 'Symbolic mode lets you modify specific permissions without setting all of them at once. The syntax is <code>chmod [who][operator][permissions]</code> where:',
    p_who: '<strong>Who:</strong> u (user/owner), g (group), o (others), a (all)',
    p_operator: '<strong>Operator:</strong> + (add), - (remove), = (set exactly)',
    p_permissions: '<strong>Permissions:</strong> r (read), w (write), x (execute), X (execute only if directory or already executable)',
    p_symbolic_advantage: 'The advantage of symbolic mode is that you can change one permission without affecting others. This is especially useful in scripts and automation.',

    h2_chown: '5. chown — Change File Owner and Group',
    p_chown: 'The <code>chown</code> command changes the owner and/or group of files and directories. Only root (or sudo) can change file ownership. This is essential for setting up web servers, Docker volumes, and shared project directories.',
    h3_chown_syntax: 'Syntax and Examples',
    p_chown_formats: '<code>chown</code> accepts several formats:',
    chown_user: '<code>chown user file</code> — Change owner only',
    chown_user_group: '<code>chown user:group file</code> — Change owner and group',
    chown_group: '<code>chown :group file</code> — Change group only (same as chgrp)',
    chown_recursive: '<code>chown -R user:group dir/</code> — Recursive change for directory and all contents',
    h3_chown_options: 'Useful chown Options',
    chown_v: '<code>-v</code> (verbose) — Print each file as it is changed',
    chown_reference: '<code>--reference=reffile</code> — Set ownership to match another file',
    chown_no_deref: '<code>-h</code> — Change symlink ownership instead of the target file',
    chown_from: '<code>--from=olduser</code> — Only change if current owner matches',

    h2_chgrp: '6. chgrp — Change Group Ownership',
    p_chgrp: 'The <code>chgrp</code> command changes the group ownership of files. While <code>chown :group</code> can do the same thing, <code>chgrp</code> has a key advantage: regular users can use it to change a file\'s group to any group they belong to, without requiring root.',
    p_chgrp_when: 'Use <code>chgrp</code> when:',
    chgrp_reason1: 'You only need to change the group (not the owner)',
    chgrp_reason2: 'You are a regular user changing group to one of your groups',
    chgrp_reason3: 'In scripts where clarity matters — chgrp clearly communicates intent',

    h2_special: '7. Special Permissions — SUID, SGID, Sticky Bit',
    p_special: 'Beyond the standard rwx permissions, Linux has three special permission bits that modify how files and directories behave. These are represented as a fourth (leading) octal digit.',
    h3_suid: 'SUID — Set User ID (4xxx)',
    p_suid: 'When set on an executable file, the process runs with the permissions of the file <strong>owner</strong>, not the user who runs it. The classic example is <code>/usr/bin/passwd</code>, which needs root privileges to modify <code>/etc/shadow</code> but can be run by any user.',
    p_suid_display: 'In <code>ls -l</code> output, SUID shows as <code>s</code> in the owner execute position: <code>-rw<strong>s</strong>r-xr-x</code>. If the underlying execute bit is not set, it shows as <code>S</code> (uppercase).',
    h3_sgid: 'SGID — Set Group ID (2xxx)',
    p_sgid: 'On an executable, the process runs with the file\'s group. On a <strong>directory</strong>, new files created inside automatically inherit the directory\'s group instead of the creator\'s primary group. This is essential for shared project directories.',
    h3_sticky: 'Sticky Bit (1xxx)',
    p_sticky: 'When set on a directory, only the file owner, the directory owner, or root can delete or rename files within it — even if others have write permission. The classic example is <code>/tmp</code> (permissions 1777).',
    h3_find_special: 'Finding Files with Special Permissions',

    h2_umask: '8. umask — Default Permission Mask',
    p_umask: 'The <code>umask</code> command sets the default permission mask for newly created files and directories. It works by <strong>subtracting</strong> permissions from the maximum defaults (666 for files, 777 for directories).',
    p_umask_calc: 'Calculation: <strong>Effective permissions = Maximum defaults - umask</strong>',
    p_umask_common: 'Common umask values:',
    umask_022: '<strong>022</strong> — Files get 644, directories get 755. The most common default.',
    umask_027: '<strong>027</strong> — Files get 640, directories get 750. More restrictive; others get no access.',
    umask_077: '<strong>077</strong> — Files get 600, directories get 700. Very restrictive; only owner has access.',
    umask_002: '<strong>002</strong> — Files get 664, directories get 775. Group-friendly for shared development.',
    p_umask_persist: 'To make umask persistent, add it to <code>~/.bashrc</code>, <code>~/.profile</code>, or <code>/etc/profile</code> for system-wide settings.',

    h2_acl: '9. ACL — Access Control Lists',
    p_acl: 'Standard Linux permissions (user/group/other) only allow one owner and one group per file. When you need finer-grained access control — such as giving a specific user read access without changing the file\'s group — you need ACLs (Access Control Lists).',
    h3_getfacl: 'Reading ACLs with getfacl',
    h3_setfacl: 'Setting ACLs with setfacl',
    p_default_acl: '<strong>Default ACLs</strong> apply to new files and subdirectories created inside a directory. They act as an ACL template:',
    p_acl_when: 'Use ACLs when:',
    acl_reason1: 'Multiple users/groups need different access levels to the same file',
    acl_reason2: 'You cannot or do not want to create new system groups',
    acl_reason3: 'A web application needs access to files owned by a different user',
    p_acl_check: 'Files with ACLs show a <code>+</code> at the end of the permission string in <code>ls -l</code>: <code>-rw-r--r--<strong>+</strong></code>',

    h2_common_setups: '10. Common Permission Setups',
    p_common_setups: 'Here are production-ready permission configurations for common scenarios:',
    h3_web_server: 'Web Server Files (Nginx / Apache)',
    h3_ssh_keys: 'SSH Key Permissions',
    h3_scripts: 'Executable Scripts',
    h3_logs: 'Log Files',
    h3_shared_dir: 'Shared Project Directory',

    h2_security: '11. Security Best Practices',
    p_security: 'File permissions are your first line of defense. Follow these principles to keep your system secure:',
    security1: '<strong>Principle of Least Privilege:</strong> Grant the minimum permissions needed. Start restrictive and loosen only if necessary.',
    security2: '<strong>Never use 777:</strong> There is almost never a valid reason for 777 in production. If you think you need it, you probably need to fix ownership instead.',
    security3: '<strong>Audit SUID/SGID files regularly:</strong> These are privilege escalation vectors. Use <code>find</code> to discover them.',
    security4: '<strong>Use groups wisely:</strong> Instead of opening permissions to "others", add users to appropriate groups.',
    security5: '<strong>Protect sensitive files:</strong> SSH keys (600), config files with passwords (600), TLS certificates private keys (600).',
    security6: '<strong>Be careful with recursive chmod:</strong> Always double-check the path before running <code>chmod -R</code>. A typo can break your system.',
    security7: '<strong>Monitor permission changes:</strong> Use auditd to log file permission changes in production environments.',

    h2_troubleshooting: '12. Troubleshooting Common Permission Issues',
    p_troubleshooting: 'Permission errors are among the most common issues on Linux systems. Here are the most frequent problems and their solutions:',
    h3_permission_denied: '"Permission denied" Errors',
    p_permission_denied: 'The most common permission error. Check these in order:',
    ts_step1: '1. Check file permissions: <code>ls -la /path/to/file</code>',
    ts_step2: '2. Check directory permissions (you need execute on every parent directory)',
    ts_step3: '3. Check file ownership: does the running user/group match?',
    ts_step4: '4. Check for ACLs: <code>getfacl /path/to/file</code>',
    ts_step5: '5. Check SELinux or AppArmor: <code>ls -Z /path/to/file</code>',
    h3_sudo_vs_chown: 'sudo vs Fixing Ownership',
    p_sudo_vs_chown: 'Using <code>sudo</code> to bypass permission errors is a bad habit. Instead, fix the root cause:',
    sudo_bad: '<strong>Bad:</strong> <code>sudo vim /var/www/html/index.html</code> (creates root-owned files)',
    sudo_good: '<strong>Good:</strong> <code>sudo chown -R www-data:www-data /var/www/html</code> then edit normally',
    h3_docker_perms: 'Docker File Permission Issues',
    p_docker_perms: 'Docker containers often run as root inside the container, creating files with root ownership on the host. Common fixes:',

    try_tool: 'Try our interactive Chmod Calculator tool',
    link_tool: 'Chmod Calculator',

    faq1q: 'What is the difference between chmod, chown, and chgrp?',
    faq1a: 'chmod changes file permissions (read, write, execute). chown changes the file owner and optionally the group. chgrp changes only the group ownership. chmod controls what actions are allowed, while chown and chgrp control who the permission categories apply to.',
    faq2q: 'Why can\'t I chown a file without sudo?',
    faq2a: 'Only root can change file ownership. This is a security measure — if regular users could give away file ownership, they could bypass disk quotas and create files that appear to belong to other users. However, you can use chgrp without sudo to change a file\'s group to any group you belong to.',
    faq3q: 'What does the "s" in -rwsr-xr-x mean?',
    faq3a: 'The lowercase "s" in the owner execute position indicates the SUID (Set User ID) bit is set. This means the program runs with the file owner\'s privileges regardless of who executes it. For example, /usr/bin/passwd has SUID set so regular users can update /etc/shadow (which is owned by root).',
    faq4q: 'How do I find all files with 777 permissions?',
    faq4a: 'Run: find / -type f -perm 0777 2>/dev/null. To find and fix them: find /var/www -type f -perm 0777 -exec chmod 644 {} \\;. For directories: find /var/www -type d -perm 0777 -exec chmod 755 {} \\;. Regularly auditing for 777 permissions is a security best practice.',
    faq5q: 'How do I fix "Permission denied" for Docker mounted volumes?',
    faq5a: 'This happens because the container user UID differs from the host user UID. Solutions: 1) Use --user flag: docker run --user $(id -u):$(id -g). 2) Set ownership in Dockerfile: RUN chown -R appuser:appuser /app. 3) Use named volumes instead of bind mounts. 4) Match UIDs between container and host user.',
  },
  zh: {
    title: 'Linux chmod、chown 与 chgrp：文件权限完全指南',
    intro: 'Linux 文件权限是系统安全的基石。系统中每个文件和目录都有所有者、所属组和一组权限标志，决定了谁可以读取、写入或执行它。掌握 <strong>chmod</strong>、<strong>chown</strong> 和 <strong>chgrp</strong> 对于任何使用服务器、容器或 CI/CD 流水线的开发者、系统管理员或 DevOps 工程师都至关重要。本指南全面涵盖从基本权限概念到高级 ACL 和实际故障排除的所有内容。',

    h2_permission_model: '1. Linux 权限模型',
    p_permission_model: 'Linux 使用自主访问控制（DAC）模型。每个文件和目录都有三类用户和三种权限类型：',
    h3_user_categories: '用户类别',
    user_owner: '<strong>所有者 (u)</strong> — 文件的拥有者，通常是创建文件的用户。',
    user_group: '<strong>组 (g)</strong> — 属于文件所属组的用户，便于团队协作。',
    user_other: '<strong>其他人 (o)</strong> — 系统上的其他所有人。',
    user_all: '<strong>所有人 (a)</strong> — 所有者 + 组 + 其他人的简写。',
    h3_permission_types: '权限类型',
    perm_read: '<strong>读取 (r = 4)</strong> — 查看文件内容；列出目录条目。',
    perm_write: '<strong>写入 (w = 2)</strong> — 修改文件内容；在目录中创建、重命名或删除文件。',
    perm_exec: '<strong>执行 (x = 1)</strong> — 以程序方式运行文件；进入（cd）目录。',
    p_dir_note: '注意：对于目录，<code>读取</code>表示可以列出内容，<code>写入</code>表示可以创建/删除条目，<code>执行</code>表示可以进入（cd）目录。一个有读取权限但没有执行权限的目录可以列出文件名但无法访问文件元数据。',

    h2_reading_permissions: '2. 读取权限 — ls -la 输出详解',
    p_reading_permissions: '<code>ls -la</code> 命令显示详细的文件信息，包括权限。以下是如何读取输出：',
    p_breakdown: '让我们分解一个典型的权限字符串：',
    p_first_char: '第一个字符表示文件类型：<code>-</code> 普通文件，<code>d</code> 目录，<code>l</code> 符号链接，<code>b</code> 块设备，<code>c</code> 字符设备。',
    p_nine_chars: '接下来的 9 个字符分为三组，每组三个：所有者权限、组权限和其他人权限。每组显示读取 (r)、写入 (w) 和执行 (x) — 或破折号 (-) 表示未设置该权限。',

    h2_chmod_numeric: '3. chmod 数字（八进制）模式',
    p_chmod_numeric: '在数字模式中，权限用三位（或包含特殊权限的四位）八进制数表示。每个数字是其权限值的总和：',
    p_octal_calc: '计算方式：对每个类别将读取 (4) + 写入 (2) + 执行 (1) 相加。例如，<code>rwxr-xr--</code> = 7 (4+2+1)、5 (4+0+1)、4 (4+0+0) = <strong>754</strong>。',
    h3_common_perms: '常用权限值',
    perm_777: '<strong>777</strong> (rwxrwxrwx) — 所有人完全访问。危险 — 生产环境中避免使用！',
    perm_755: '<strong>755</strong> (rwxr-xr-x) — 所有者完全权限；组和其他人可读取和执行。目录和脚本的标准权限。',
    perm_644: '<strong>644</strong> (rw-r--r--) — 所有者可读写；其他人只读。普通文件的标准权限。',
    perm_600: '<strong>600</strong> (rw-------) — 仅所有者可读写。用于私密配置和 SSH 密钥。',
    perm_400: '<strong>400</strong> (r--------) — 仅所有者只读。用于证书和敏感只读数据。',
    perm_750: '<strong>750</strong> (rwxr-x---) — 所有者完全权限；组可读取/执行；其他人无权限。适合共享项目目录。',
    perm_700: '<strong>700</strong> (rwx------) — 仅所有者完全访问。用于 ~/.ssh 目录。',

    h2_chmod_symbolic: '4. chmod 符号模式',
    p_chmod_symbolic: '符号模式允许你修改特定权限而不需要一次设置所有权限。语法是 <code>chmod [谁][操作符][权限]</code>，其中：',
    p_who: '<strong>谁：</strong> u（所有者）、g（组）、o（其他人）、a（所有人）',
    p_operator: '<strong>操作符：</strong> +（添加）、-（移除）、=（精确设置）',
    p_permissions: '<strong>权限：</strong> r（读取）、w（写入）、x（执行）、X（仅在是目录或已有执行权限时添加执行）',
    p_symbolic_advantage: '符号模式的优点是可以更改一个权限而不影响其他权限。这在脚本和自动化中特别有用。',

    h2_chown: '5. chown — 更改文件所有者和组',
    p_chown: '<code>chown</code> 命令更改文件和目录的所有者和/或组。只有 root（或 sudo）可以更改文件所有权。这对于设置 Web 服务器、Docker 卷和共享项目目录至关重要。',
    h3_chown_syntax: '语法和示例',
    p_chown_formats: '<code>chown</code> 接受多种格式：',
    chown_user: '<code>chown user file</code> — 仅更改所有者',
    chown_user_group: '<code>chown user:group file</code> — 更改所有者和组',
    chown_group: '<code>chown :group file</code> — 仅更改组（与 chgrp 相同）',
    chown_recursive: '<code>chown -R user:group dir/</code> — 递归更改目录及其所有内容',
    h3_chown_options: '常用 chown 选项',
    chown_v: '<code>-v</code>（详细模式）— 显示每个被更改的文件',
    chown_reference: '<code>--reference=参考文件</code> — 设置所有权与另一个文件匹配',
    chown_no_deref: '<code>-h</code> — 更改符号链接本身的所有权而非目标文件',
    chown_from: '<code>--from=旧用户</code> — 仅在当前所有者匹配时才更改',

    h2_chgrp: '6. chgrp — 更改组所有权',
    p_chgrp: '<code>chgrp</code> 命令更改文件的组所有权。虽然 <code>chown :group</code> 也可以做同样的事情，但 <code>chgrp</code> 有一个关键优势：普通用户可以用它将文件的组更改为自己所属的任何组，无需 root 权限。',
    p_chgrp_when: '在以下情况使用 <code>chgrp</code>：',
    chgrp_reason1: '只需要更改组（不需要更改所有者）',
    chgrp_reason2: '作为普通用户将组更改为你所属的组',
    chgrp_reason3: '在脚本中需要清晰表达意图时 — chgrp 明确传达了操作目的',

    h2_special: '7. 特殊权限 — SUID、SGID、Sticky Bit',
    p_special: '除了标准的 rwx 权限，Linux 还有三种特殊权限位，用于修改文件和目录的行为方式。它们在八进制中表示为第四位（前导位）。',
    h3_suid: 'SUID — 设置用户 ID (4xxx)',
    p_suid: '当设置在可执行文件上时，进程以文件<strong>所有者</strong>的权限运行，而不是执行者的权限。经典示例是 <code>/usr/bin/passwd</code>，它需要 root 权限来修改 <code>/etc/shadow</code>，但任何用户都可以运行。',
    p_suid_display: '在 <code>ls -l</code> 输出中，SUID 在所有者执行位显示为 <code>s</code>：<code>-rw<strong>s</strong>r-xr-x</code>。如果底层执行位未设置，则显示为大写 <code>S</code>。',
    h3_sgid: 'SGID — 设置组 ID (2xxx)',
    p_sgid: '在可执行文件上，进程以文件的组身份运行。在<strong>目录</strong>上，目录内创建的新文件自动继承目录的组，而非创建者的主组。这对共享项目目录至关重要。',
    h3_sticky: 'Sticky Bit (1xxx)',
    p_sticky: '当设置在目录上时，只有文件所有者、目录所有者或 root 才能删除或重命名其中的文件 — 即使其他人有写权限。经典示例是 <code>/tmp</code>（权限 1777）。',
    h3_find_special: '查找具有特殊权限的文件',

    h2_umask: '8. umask — 默认权限掩码',
    p_umask: '<code>umask</code> 命令设置新建文件和目录的默认权限掩码。它通过从最大默认值（文件 666，目录 777）<strong>减去</strong>权限来工作。',
    p_umask_calc: '计算公式：<strong>有效权限 = 最大默认值 - umask</strong>',
    p_umask_common: '常见 umask 值：',
    umask_022: '<strong>022</strong> — 文件获得 644，目录获得 755。最常见的默认值。',
    umask_027: '<strong>027</strong> — 文件获得 640，目录获得 750。更严格；其他人无权限。',
    umask_077: '<strong>077</strong> — 文件获得 600，目录获得 700。非常严格；仅所有者有权限。',
    umask_002: '<strong>002</strong> — 文件获得 664，目录获得 775。适合共享开发的组友好设置。',
    p_umask_persist: '要使 umask 持久化，将其添加到 <code>~/.bashrc</code>、<code>~/.profile</code> 或系统范围的 <code>/etc/profile</code> 中。',

    h2_acl: '9. ACL — 访问控制列表',
    p_acl: '标准 Linux 权限（用户/组/其他人）每个文件只允许一个所有者和一个组。当你需要更精细的访问控制时 — 例如给特定用户读取权限而不更改文件的组 — 你需要 ACL（访问控制列表）。',
    h3_getfacl: '使用 getfacl 读取 ACL',
    h3_setfacl: '使用 setfacl 设置 ACL',
    p_default_acl: '<strong>默认 ACL</strong> 应用于目录内新建的文件和子目录。它们作为 ACL 模板：',
    p_acl_when: '在以下情况使用 ACL：',
    acl_reason1: '多个用户/组需要对同一文件有不同的访问级别',
    acl_reason2: '你不能或不想创建新的系统组',
    acl_reason3: 'Web 应用需要访问其他用户拥有的文件',
    p_acl_check: '有 ACL 的文件在 <code>ls -l</code> 的权限字符串末尾显示 <code>+</code>：<code>-rw-r--r--<strong>+</strong></code>',

    h2_common_setups: '10. 常见权限配置',
    p_common_setups: '以下是常见场景的生产就绪权限配置：',
    h3_web_server: 'Web 服务器文件（Nginx / Apache）',
    h3_ssh_keys: 'SSH 密钥权限',
    h3_scripts: '可执行脚本',
    h3_logs: '日志文件',
    h3_shared_dir: '共享项目目录',

    h2_security: '11. 安全最佳实践',
    p_security: '文件权限是你的第一道防线。遵循以下原则保护系统安全：',
    security1: '<strong>最小权限原则：</strong>授予所需的最低权限。从严格开始，仅在必要时放宽。',
    security2: '<strong>永远不要使用 777：</strong>生产环境中几乎没有使用 777 的正当理由。如果你认为需要它，你可能需要的是修复所有权。',
    security3: '<strong>定期审计 SUID/SGID 文件：</strong>这些是权限提升的攻击向量。使用 <code>find</code> 来发现它们。',
    security4: '<strong>明智地使用组：</strong>不要向"其他人"开放权限，而是将用户添加到适当的组。',
    security5: '<strong>保护敏感文件：</strong>SSH 密钥 (600)、含密码的配置文件 (600)、TLS 证书私钥 (600)。',
    security6: '<strong>谨慎使用递归 chmod：</strong>运行 <code>chmod -R</code> 前务必仔细检查路径。一个拼写错误可能破坏你的系统。',
    security7: '<strong>监控权限变更：</strong>在生产环境中使用 auditd 记录文件权限变更。',

    h2_troubleshooting: '12. 常见权限问题排查',
    p_troubleshooting: '权限错误是 Linux 系统中最常见的问题之一。以下是最常见的问题及其解决方案：',
    h3_permission_denied: '"Permission denied" 错误',
    p_permission_denied: '最常见的权限错误。按以下顺序检查：',
    ts_step1: '1. 检查文件权限：<code>ls -la /path/to/file</code>',
    ts_step2: '2. 检查目录权限（你需要对每个父目录都有执行权限）',
    ts_step3: '3. 检查文件所有权：运行的用户/组是否匹配？',
    ts_step4: '4. 检查 ACL：<code>getfacl /path/to/file</code>',
    ts_step5: '5. 检查 SELinux 或 AppArmor：<code>ls -Z /path/to/file</code>',
    h3_sudo_vs_chown: 'sudo 与修复所有权的对比',
    p_sudo_vs_chown: '用 <code>sudo</code> 绕过权限错误是一个坏习惯。应该修复根本原因：',
    sudo_bad: '<strong>不好：</strong><code>sudo vim /var/www/html/index.html</code>（会创建 root 所有的文件）',
    sudo_good: '<strong>正确：</strong><code>sudo chown -R www-data:www-data /var/www/html</code> 然后正常编辑',
    h3_docker_perms: 'Docker 文件权限问题',
    p_docker_perms: 'Docker 容器内部通常以 root 运行，导致宿主机上的文件为 root 所有。常见解决方案：',

    try_tool: '试试我们的交互式 Chmod 计算器工具',
    link_tool: 'Chmod 计算器',

    faq1q: 'chmod、chown 和 chgrp 有什么区别？',
    faq1a: 'chmod 更改文件权限（读取、写入、执行）。chown 更改文件所有者，可选地同时更改组。chgrp 仅更改组所有权。chmod 控制允许什么操作，而 chown 和 chgrp 控制权限类别适用于谁。',
    faq2q: '为什么不能在没有 sudo 的情况下 chown 文件？',
    faq2a: '只有 root 可以更改文件所有权。这是一项安全措施 — 如果普通用户可以转让文件所有权，他们就可以绕过磁盘配额并创建看似属于其他用户的文件。但是，你可以不用 sudo 使用 chgrp 将文件的组更改为你所属的任何组。',
    faq3q: '-rwsr-xr-x 中的 "s" 是什么意思？',
    faq3a: '所有者执行位中的小写 "s" 表示已设置 SUID（设置用户 ID）位。这意味着无论谁执行该程序，它都以文件所有者的权限运行。例如，/usr/bin/passwd 设置了 SUID，这样普通用户就可以更新 /etc/shadow（由 root 拥有）。',
    faq4q: '如何找到所有 777 权限的文件？',
    faq4a: '运行：find / -type f -perm 0777 2>/dev/null。要查找并修复：find /var/www -type f -perm 0777 -exec chmod 644 {} \\;。对于目录：find /var/www -type d -perm 0777 -exec chmod 755 {} \\;。定期审计 777 权限是安全最佳实践。',
    faq5q: '如何解决 Docker 挂载卷的 "Permission denied"？',
    faq5a: '这是因为容器用户 UID 与宿主机用户 UID 不同。解决方案：1) 使用 --user 标志：docker run --user $(id -u):$(id -g)。2) 在 Dockerfile 中设置所有权：RUN chown -R appuser:appuser /app。3) 使用命名卷代替绑定挂载。4) 让容器和宿主机用户的 UID 匹配。',
  },
};

export default function LinuxChmodChownPermissionsGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 600, marginTop: 28, marginBottom: 12, color: 'var(--text-primary)' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const ulStyle: React.CSSProperties = { lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 20 };
  const cardStyle: React.CSSProperties = { padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', marginBottom: 12 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }} dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* ============================================================ */}
      {/* 1. LINUX PERMISSION MODEL */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_permission_model}</h2>
      <p style={pStyle}>{t.p_permission_model}</p>

      <h3 style={h3Style}>{t.h3_user_categories}</h3>
      <ul style={ulStyle}>
        <li dangerouslySetInnerHTML={{ __html: t.user_owner }} />
        <li dangerouslySetInnerHTML={{ __html: t.user_group }} />
        <li dangerouslySetInnerHTML={{ __html: t.user_other }} />
        <li dangerouslySetInnerHTML={{ __html: t.user_all }} />
      </ul>

      <h3 style={h3Style}>{t.h3_permission_types}</h3>
      <ul style={ulStyle}>
        <li dangerouslySetInnerHTML={{ __html: t.perm_read }} />
        <li dangerouslySetInnerHTML={{ __html: t.perm_write }} />
        <li dangerouslySetInnerHTML={{ __html: t.perm_exec }} />
      </ul>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_dir_note }} />

      {/* ============================================================ */}
      {/* 2. READING PERMISSIONS */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_reading_permissions}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_reading_permissions }} />

      <pre style={codeStyle}><code>{`$ ls -la
total 32
drwxr-xr-x  5 alice developers 4096 Feb 10 09:00 .
drwxr-xr-x  3 root  root       4096 Jan 15 12:00 ..
-rw-r--r--  1 alice developers 1234 Feb 10 08:55 README.md
-rwxr-xr-x  1 alice developers 2048 Feb 10 08:50 deploy.sh
drwxrwx---  2 alice developers 4096 Feb 09 14:30 shared/
lrwxrwxrwx  1 alice developers   11 Feb 08 10:00 config -> config.yaml`}</code></pre>

      <p style={{ ...pStyle, marginTop: 20 }}>{t.p_breakdown}</p>
      <pre style={codeStyle}><code>{`-rwxr-xr-x  1  alice  developers  2048  Feb 10  deploy.sh
│└┬┘└┬┘└┬┘  │    │       │        │      │       │
│ │   │  │   │    │       │        │      │       └─ filename
│ │   │  │   │    │       │        │      └─ modification date
│ │   │  │   │    │       │        └─ file size (bytes)
│ │   │  │   │    │       └─ group owner
│ │   │  │   │    └─ file owner
│ │   │  │   └─ hard link count
│ │   │  └─ other permissions: r-x (read + execute = 5)
│ │   └─ group permissions:    r-x (read + execute = 5)
│ └─ owner permissions:        rwx (read + write + execute = 7)
└─ file type: - (regular file)`}</code></pre>

      <p style={{ ...pStyle, marginTop: 16 }} dangerouslySetInnerHTML={{ __html: t.p_first_char }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_nine_chars }} />

      {/* ============================================================ */}
      {/* 3. CHMOD NUMERIC MODE */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_chmod_numeric}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_chmod_numeric }} />

      <pre style={codeStyle}><code>{`  Read (r)  = 4
  Write (w) = 2
  Exec (x)  = 1
  None      = 0

  rwx = 4 + 2 + 1 = 7
  rw- = 4 + 2 + 0 = 6
  r-x = 4 + 0 + 1 = 5
  r-- = 4 + 0 + 0 = 4
  --- = 0 + 0 + 0 = 0`}</code></pre>

      <p style={{ ...pStyle, marginTop: 16 }} dangerouslySetInnerHTML={{ __html: t.p_octal_calc }} />

      <pre style={codeStyle}><code>{`# Set permissions using numeric mode
chmod 755 script.sh          # rwxr-xr-x
chmod 644 config.json        # rw-r--r--
chmod 600 id_rsa             # rw-------
chmod 400 server.crt         # r--------
chmod 750 /opt/project       # rwxr-x---
chmod -R 755 /var/www/html   # Recursive for directory tree`}</code></pre>

      <h3 style={h3Style}>{t.h3_common_perms}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { code: '777', color: '#ef4444', desc: t.perm_777 },
          { code: '755', color: '#3b82f6', desc: t.perm_755 },
          { code: '750', color: '#8b5cf6', desc: t.perm_750 },
          { code: '700', color: '#a855f7', desc: t.perm_700 },
          { code: '644', color: '#22c55e', desc: t.perm_644 },
          { code: '600', color: '#f59e0b', desc: t.perm_600 },
          { code: '400', color: '#6366f1', desc: t.perm_400 },
        ].map(p => (
          <div key={p.code} style={{ display: 'flex', gap: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', alignItems: 'center' }}>
            <code style={{ fontSize: 20, fontWeight: 800, color: p.color, minWidth: 50 }}>{p.code}</code>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: p.desc }} />
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/* 4. CHMOD SYMBOLIC MODE */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_chmod_symbolic}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_chmod_symbolic }} />
      <ul style={ulStyle}>
        <li dangerouslySetInnerHTML={{ __html: t.p_who }} />
        <li dangerouslySetInnerHTML={{ __html: t.p_operator }} />
        <li dangerouslySetInnerHTML={{ __html: t.p_permissions }} />
      </ul>

      <pre style={codeStyle}><code>{`# Add execute permission for owner
chmod u+x script.sh

# Remove write permission from group
chmod g-w config.json

# Set others to read-only
chmod o=r public.html

# Add read permission for all users
chmod a+r README.md

# Add execute for owner, remove write from group and others
chmod u+x,go-w deploy.sh

# Set owner=rwx, group=rx, others=nothing
chmod u=rwx,g=rx,o= project/

# Add execute only to directories (not files) recursively
chmod -R a+X /var/www/html

# Copy permissions from owner to group
chmod g=u shared-file.txt`}</code></pre>

      <p style={{ ...pStyle, marginTop: 16 }} dangerouslySetInnerHTML={{ __html: t.p_symbolic_advantage }} />

      {/* ============================================================ */}
      {/* 5. CHOWN */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_chown}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_chown }} />

      <h3 style={h3Style}>{t.h3_chown_syntax}</h3>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_chown_formats }} />
      <ul style={ulStyle}>
        <li dangerouslySetInnerHTML={{ __html: t.chown_user }} />
        <li dangerouslySetInnerHTML={{ __html: t.chown_user_group }} />
        <li dangerouslySetInnerHTML={{ __html: t.chown_group }} />
        <li dangerouslySetInnerHTML={{ __html: t.chown_recursive }} />
      </ul>

      <pre style={codeStyle}><code>{`# Change owner to 'alice'
sudo chown alice report.pdf

# Change owner and group
sudo chown alice:developers project/

# Change only the group (equivalent to chgrp)
sudo chown :www-data /var/www/html

# Recursive change for an entire directory tree
sudo chown -R www-data:www-data /var/www/html

# Change owner only if currently owned by 'bob'
sudo chown --from=bob alice important-file.txt

# Match ownership of another file
sudo chown --reference=/var/www/html/index.html newfile.html

# Change ownership of symlink itself (not the target)
sudo chown -h alice symlink.txt

# Verbose mode — see what changes
sudo chown -Rv alice:developers /opt/project/`}</code></pre>

      <h3 style={h3Style}>{t.h3_chown_options}</h3>
      <ul style={ulStyle}>
        <li dangerouslySetInnerHTML={{ __html: t.chown_v }} />
        <li dangerouslySetInnerHTML={{ __html: t.chown_reference }} />
        <li dangerouslySetInnerHTML={{ __html: t.chown_no_deref }} />
        <li dangerouslySetInnerHTML={{ __html: t.chown_from }} />
      </ul>

      {/* ============================================================ */}
      {/* 6. CHGRP */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_chgrp}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_chgrp }} />

      <pre style={codeStyle}><code>{`# Change group to 'developers'
chgrp developers project-file.txt

# Recursive group change
chgrp -R www-data /var/www/html

# Match group of another file
chgrp --reference=existing-file.txt new-file.txt

# Check your groups
groups
# Output: alice developers docker sudo

# Verbose mode
chgrp -Rv developers /opt/project/`}</code></pre>

      <p style={{ ...pStyle, marginTop: 16 }} dangerouslySetInnerHTML={{ __html: t.p_chgrp_when }} />
      <ul style={ulStyle}>
        <li>{t.chgrp_reason1}</li>
        <li>{t.chgrp_reason2}</li>
        <li>{t.chgrp_reason3}</li>
      </ul>

      {/* ============================================================ */}
      {/* 7. SPECIAL PERMISSIONS */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_special}</h2>
      <p style={pStyle}>{t.p_special}</p>

      <div style={cardStyle}>
        <strong style={{ color: '#f59e0b', fontSize: 16 }}>{t.h3_suid}</strong>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_suid }} />
        <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_suid_display }} />
        <pre style={{ ...codeStyle, marginTop: 12, padding: '10px 14px' }}><code>{`# Set SUID
chmod 4755 /usr/local/bin/my-tool
chmod u+s /usr/local/bin/my-tool

# Verify — shows 's' in owner execute position
ls -l /usr/bin/passwd
-rwsr-xr-x 1 root root 68208 Mar 14 /usr/bin/passwd`}</code></pre>
      </div>

      <div style={cardStyle}>
        <strong style={{ color: '#3b82f6', fontSize: 16 }}>{t.h3_sgid}</strong>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_sgid }} />
        <pre style={{ ...codeStyle, marginTop: 12, padding: '10px 14px' }}><code>{`# Set SGID on a directory — new files inherit group
chmod 2775 /opt/shared-project
chmod g+s /opt/shared-project

# Verify — shows 's' in group execute position
ls -ld /opt/shared-project
drwxrwsr-x 2 root developers 4096 Feb 10 /opt/shared-project

# Now any file created inside inherits 'developers' group
touch /opt/shared-project/newfile.txt
ls -l /opt/shared-project/newfile.txt
-rw-r--r-- 1 alice developers 0 Feb 10 newfile.txt`}</code></pre>
      </div>

      <div style={cardStyle}>
        <strong style={{ color: '#22c55e', fontSize: 16 }}>{t.h3_sticky}</strong>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.p_sticky}</p>
        <pre style={{ ...codeStyle, marginTop: 12, padding: '10px 14px' }}><code>{`# Set sticky bit
chmod 1777 /tmp
chmod +t /shared-uploads

# Verify — shows 't' in others execute position
ls -ld /tmp
drwxrwxrwt 15 root root 4096 Feb 10 /tmp`}</code></pre>
      </div>

      <h3 style={h3Style}>{t.h3_find_special}</h3>
      <pre style={codeStyle}><code>{`# Find all SUID files on the system
find / -perm -4000 -type f 2>/dev/null

# Find all SGID files
find / -perm -2000 -type f 2>/dev/null

# Find all files with sticky bit
find / -perm -1000 -type d 2>/dev/null

# Find SUID or SGID files (security audit)
find / -type f \\( -perm -4000 -o -perm -2000 \\) -exec ls -la {} \\; 2>/dev/null`}</code></pre>

      {/* ============================================================ */}
      {/* 8. UMASK */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_umask}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_umask }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_umask_calc }} />

      <pre style={codeStyle}><code>{`# Check current umask
umask
0022

# Display in symbolic notation
umask -S
u=rwx,g=rx,o=rx

# Set umask for current session
umask 022    # Files: 644, Dirs: 755
umask 027    # Files: 640, Dirs: 750
umask 077    # Files: 600, Dirs: 700
umask 002    # Files: 664, Dirs: 775

# Example: umask 022
#   New file:       666 - 022 = 644 (rw-r--r--)
#   New directory:  777 - 022 = 755 (rwxr-xr-x)

# Example: umask 077
#   New file:       666 - 077 = 600 (rw-------)
#   New directory:  777 - 077 = 700 (rwx------)`}</code></pre>

      <p style={{ ...pStyle, marginTop: 16 }}>{t.p_umask_common}</p>
      <ul style={ulStyle}>
        <li dangerouslySetInnerHTML={{ __html: t.umask_022 }} />
        <li dangerouslySetInnerHTML={{ __html: t.umask_027 }} />
        <li dangerouslySetInnerHTML={{ __html: t.umask_077 }} />
        <li dangerouslySetInnerHTML={{ __html: t.umask_002 }} />
      </ul>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_umask_persist }} />

      <pre style={codeStyle}><code>{`# Make umask persistent — add to ~/.bashrc or ~/.profile
echo 'umask 022' >> ~/.bashrc

# System-wide default — add to /etc/profile
echo 'umask 027' | sudo tee -a /etc/profile`}</code></pre>

      {/* ============================================================ */}
      {/* 9. ACL */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_acl}</h2>
      <p style={pStyle}>{t.p_acl}</p>

      <h3 style={h3Style}>{t.h3_getfacl}</h3>
      <pre style={codeStyle}><code>{`# View ACL of a file
getfacl report.txt
# file: report.txt
# owner: alice
# group: developers
user::rw-
user:bob:r--
group::r--
group:designers:rw-
mask::rw-
other::---

# View ACL of a directory (includes default ACLs)
getfacl /opt/shared-project/`}</code></pre>

      <h3 style={h3Style}>{t.h3_setfacl}</h3>
      <pre style={codeStyle}><code>{`# Grant read access to a specific user
setfacl -m u:bob:r report.txt

# Grant read+write to a specific group
setfacl -m g:designers:rw report.txt

# Remove ACL for a specific user
setfacl -x u:bob report.txt

# Remove all ACLs
setfacl -b report.txt

# Recursive ACL change
setfacl -Rm u:bob:rx /opt/project/`}</code></pre>

      <p style={{ ...pStyle, marginTop: 20 }} dangerouslySetInnerHTML={{ __html: t.p_default_acl }} />
      <pre style={codeStyle}><code>{`# Set default ACL on a directory — new files inherit these
setfacl -d -m u:bob:rx /opt/shared-project/
setfacl -d -m g:designers:rw /opt/shared-project/

# View default ACLs
getfacl /opt/shared-project/
# default:user:bob:r-x
# default:group:designers:rw-`}</code></pre>

      <p style={{ ...pStyle, marginTop: 16 }} dangerouslySetInnerHTML={{ __html: t.p_acl_when }} />
      <ul style={ulStyle}>
        <li>{t.acl_reason1}</li>
        <li>{t.acl_reason2}</li>
        <li>{t.acl_reason3}</li>
      </ul>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_acl_check }} />

      {/* ============================================================ */}
      {/* 10. COMMON PERMISSION SETUPS */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_common_setups}</h2>
      <p style={pStyle}>{t.p_common_setups}</p>

      <h3 style={h3Style}>{t.h3_web_server}</h3>
      <pre style={codeStyle}><code>{`# Nginx / Apache web root
sudo chown -R www-data:www-data /var/www/html
sudo find /var/www/html -type d -exec chmod 755 {} \\;
sudo find /var/www/html -type f -exec chmod 644 {} \\;

# Upload directory (needs write for web server)
sudo chmod 775 /var/www/html/uploads
sudo chown www-data:www-data /var/www/html/uploads

# PHP/Python application with write-protected code
sudo chown -R deploy:www-data /var/www/app
sudo find /var/www/app -type d -exec chmod 750 {} \\;
sudo find /var/www/app -type f -exec chmod 640 {} \\;
sudo chmod 770 /var/www/app/storage
sudo chmod 770 /var/www/app/cache`}</code></pre>

      <h3 style={h3Style}>{t.h3_ssh_keys}</h3>
      <pre style={codeStyle}><code>{`# SSH directory and key permissions (STRICT — SSH refuses otherwise)
chmod 700 ~/.ssh                    # drwx------
chmod 600 ~/.ssh/id_rsa             # -rw------- (private key)
chmod 644 ~/.ssh/id_rsa.pub         # -rw-r--r-- (public key)
chmod 600 ~/.ssh/authorized_keys    # -rw-------
chmod 600 ~/.ssh/config             # -rw-------
chmod 644 ~/.ssh/known_hosts        # -rw-r--r--`}</code></pre>

      <h3 style={h3Style}>{t.h3_scripts}</h3>
      <pre style={codeStyle}><code>{`# Make a script executable
chmod +x deploy.sh
chmod 755 /usr/local/bin/my-tool

# Cron scripts
chmod 750 /etc/cron.daily/backup-script

# Remove execute bit for safety when not needed
chmod -x data-file.csv`}</code></pre>

      <h3 style={h3Style}>{t.h3_logs}</h3>
      <pre style={codeStyle}><code>{`# Application logs — readable by group, not others
chmod 640 /var/log/myapp/*.log
chown root:adm /var/log/myapp/*.log

# Log directory
chmod 750 /var/log/myapp
chown root:adm /var/log/myapp

# Logrotate creates new files with these permissions
# In /etc/logrotate.d/myapp:
#   create 640 root adm`}</code></pre>

      <h3 style={h3Style}>{t.h3_shared_dir}</h3>
      <pre style={codeStyle}><code>{`# Create a shared project directory with SGID
sudo mkdir /opt/project
sudo chown root:developers /opt/project
sudo chmod 2775 /opt/project

# SGID (2) ensures new files inherit 'developers' group
# All members of 'developers' group can read/write
# Files created by any team member are group-accessible

# Add a user to the group
sudo usermod -aG developers alice
# User must log out and back in for group change to take effect`}</code></pre>

      {/* ============================================================ */}
      {/* 11. SECURITY BEST PRACTICES */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_security}</h2>
      <p style={pStyle}>{t.p_security}</p>
      <ul style={{ ...ulStyle, lineHeight: 2.2 }}>
        <li dangerouslySetInnerHTML={{ __html: t.security1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.security2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.security3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.security4 }} />
        <li dangerouslySetInnerHTML={{ __html: t.security5 }} />
        <li dangerouslySetInnerHTML={{ __html: t.security6 }} />
        <li dangerouslySetInnerHTML={{ __html: t.security7 }} />
      </ul>

      <pre style={codeStyle}><code>{`# Security audit commands

# Find all world-writable files
find / -type f -perm -002 -not -path '/proc/*' 2>/dev/null

# Find all SUID executables (potential privilege escalation)
find / -perm -4000 -type f 2>/dev/null

# Find files with no owner (orphaned files)
find / -nouser -o -nogroup 2>/dev/null

# Find files writable by others in sensitive directories
find /etc /usr -type f -perm -002 2>/dev/null

# Check for files with 777 permissions
find / -type f -perm 0777 2>/dev/null | head -20`}</code></pre>

      {/* ============================================================ */}
      {/* 12. TROUBLESHOOTING */}
      {/* ============================================================ */}
      <h2 style={h2Style}>{t.h2_troubleshooting}</h2>
      <p style={pStyle}>{t.p_troubleshooting}</p>

      <h3 style={h3Style}>{t.h3_permission_denied}</h3>
      <p style={pStyle}>{t.p_permission_denied}</p>
      <ul style={ulStyle}>
        <li dangerouslySetInnerHTML={{ __html: t.ts_step1 }} />
        <li>{t.ts_step2}</li>
        <li>{t.ts_step3}</li>
        <li dangerouslySetInnerHTML={{ __html: t.ts_step4 }} />
        <li dangerouslySetInnerHTML={{ __html: t.ts_step5 }} />
      </ul>

      <pre style={codeStyle}><code>{`# Systematic debugging of "Permission denied"
# Step 1: Check file permissions and ownership
ls -la /path/to/file

# Step 2: Check every parent directory (need 'x' on all)
namei -l /path/to/file

# Step 3: Check who you are running as
whoami
id
# uid=1000(alice) gid=1000(alice) groups=1000(alice),27(sudo),33(www-data)

# Step 4: Check ACLs
getfacl /path/to/file

# Step 5: Check SELinux context (if enabled)
ls -Z /path/to/file
getenforce`}</code></pre>

      <h3 style={h3Style}>{t.h3_sudo_vs_chown}</h3>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_sudo_vs_chown }} />
      <ul style={ulStyle}>
        <li dangerouslySetInnerHTML={{ __html: t.sudo_bad }} />
        <li dangerouslySetInnerHTML={{ __html: t.sudo_good }} />
      </ul>

      <pre style={codeStyle}><code>{`# Fix web files created with wrong ownership
sudo chown -R www-data:www-data /var/www/html
sudo find /var/www/html -type d -exec chmod 755 {} \\;
sudo find /var/www/html -type f -exec chmod 644 {} \\;

# Fix home directory permissions
sudo chown -R $USER:$USER ~/
chmod 700 ~/`}</code></pre>

      <h3 style={h3Style}>{t.h3_docker_perms}</h3>
      <p style={pStyle}>{t.p_docker_perms}</p>
      <pre style={codeStyle}><code>{`# Problem: container creates root-owned files on host
docker run -v $(pwd)/data:/app/data myimage
ls -la data/
# -rw-r--r-- 1 root root 1234 Feb 10 output.txt  <-- root owned!

# Solution 1: Run container as current user
docker run --user $(id -u):$(id -g) -v $(pwd)/data:/app/data myimage

# Solution 2: In Dockerfile, create and use non-root user
# FROM node:20
# RUN groupadd -g 1000 appuser && useradd -u 1000 -g appuser appuser
# USER appuser

# Solution 3: In docker-compose.yml
# services:
#   app:
#     user: "1000:1000"
#     volumes:
#       - ./data:/app/data

# Solution 4: Fix permissions in entrypoint
# ENTRYPOINT ["sh", "-c", "chown -R appuser:appuser /app/data && exec su-exec appuser $@"]`}</code></pre>

      {/* ============================================================ */}
      {/* TOOL CTA */}
      {/* ============================================================ */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 40, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.try_tool}</p>
        <Link href={`/${lang}/tools/chmod-calculator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          {t.link_tool} →
        </Link>
      </div>

      {/* ============================================================ */}
      {/* 13. FAQ */}
      {/* ============================================================ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a], [t.faq4q, t.faq4a], [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
