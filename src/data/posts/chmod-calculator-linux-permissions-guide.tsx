import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Linux File Permissions Explained: The Complete chmod Calculator Guide',
    intro: 'Linux file permissions are the backbone of system security. Every file and directory on a Unix-like system carries metadata that determines who can read, write, or execute it. Whether you are deploying a web application, hardening a server, or troubleshooting a broken deploy script, understanding the <strong>chmod command</strong> and <strong>file permission numbers</strong> is non-negotiable. This comprehensive <strong>chmod calculator guide</strong> walks you through everything from basic permission concepts to special bits, with a complete <strong>chmod cheat sheet</strong> you can bookmark for daily use.',
    linkTool: 'Try our interactive chmod calculator to visualize permissions instantly.',
    h2_what: '1. What Are Linux File Permissions?',
    whatP1: 'Every file and directory in Linux has three categories of users that can interact with it. The <strong>owner</strong> (also called "user") is typically whoever created the file. The <strong>group</strong> is a set of users that share access rights. <strong>Others</strong> (sometimes called "world") refers to everyone else on the system. When you run <code>ls -l</code>, the first column reveals the permission string for each entry.',
    whatP2: 'Each user category can be granted three types of access. <strong>Read (r)</strong> allows viewing file contents or listing a directory. <strong>Write (w)</strong> allows modifying a file or creating and deleting entries in a directory. <strong>Execute (x)</strong> allows running a file as a program or entering a directory with <code>cd</code>. These nine permission bits (three categories times three types) form the foundation of the Unix permission model.',
    whatP3: 'Here is how a typical <code>ls -l</code> output looks and how to read the permission string:',
    whatCode: '-rwxr-xr--  1 alice  developers  4096 Feb 20 deploy.sh\n |||  |||  |||\n |||  |||  ||+-- Others: r-- (read only = 4)\n |||  |||  +--- Others: no write\n |||  ||+------ Group: r-x (read + execute = 5)\n |||  +-------- Group: no write\n ||+----------- Owner: rwx (read + write + execute = 7)\n |+------------ Owner: write\n +------------- Owner: read\n\n Permission number: 754',
    h2_numbers: '2. Understanding Permission Numbers (Octal Notation)',
    numbersP1: 'Linux represents each permission set as a single octal digit ranging from 0 to 7. The digit is calculated by adding the values of the granted permissions: <strong>Read = 4</strong>, <strong>Write = 2</strong>, <strong>Execute = 1</strong>. A file with no permissions for a category has the value 0. A three-digit number like <strong>755</strong> encodes all three categories: owner (7 = rwx), group (5 = r-x), others (5 = r-x).',
    numbersP2: 'This <strong>chmod cheat sheet</strong> for octal values covers every possible single-digit combination. Once you memorize these eight values, you can decode any <strong>linux file permission</strong> number instantly:',
    numbersTableOctal: 'Octal',
    numbersTableRwx: 'Symbolic',
    numbersTableMeaning: 'Meaning',
    numbersP3: 'To compute a full permission number, calculate each digit separately. For example, owner read+write (4+2=6), group read (4), others none (0) gives you <strong>640</strong>. This is one of the most practical skills in the <strong>linux permissions explained</strong> toolkit.',
    h2_table: '3. chmod Permission Reference Table',
    tableP1: 'Below is a comprehensive reference table showing the most commonly used <strong>chmod permission</strong> combinations. Bookmark this <strong>chmod cheat sheet</strong> for quick lookups when configuring servers, Docker containers, or CI/CD pipelines.',
    tableColOctal: 'Octal',
    tableColSymbolic: 'Symbolic',
    tableColMeaning: 'Meaning',
    tableColUse: 'Typical Use Case',
    perm777: 'Full access for everyone',
    use777: 'Temporary debugging only; NEVER use in production',
    perm755: 'Owner full; group/others read+execute',
    use755: 'Directories, executable scripts, web server document root',
    perm750: 'Owner full; group read+execute; others none',
    use750: 'Shared project directories, group-only executables',
    perm700: 'Owner full access only',
    use700: '~/.ssh directory, private scripts',
    perm666: 'Read+write for everyone; no execute',
    use666: 'Rarely used; temporary shared files',
    perm644: 'Owner read+write; group/others read',
    use644: 'HTML, CSS, PHP files, config files, regular documents',
    perm640: 'Owner read+write; group read; others none',
    use640: 'Log files, sensitive configs shared with group',
    perm600: 'Owner read+write only',
    use600: 'SSH private keys, .env files, database credentials',
    perm400: 'Owner read only',
    use400: 'SSL certificates, read-only secrets',
    perm775: 'Owner full; group full; others read+execute',
    use775: 'Shared upload directories, team project folders',
    h2_command: '4. How to Use the chmod Command',
    commandP1: 'The <code>chmod</code> command changes file and directory permissions. It supports two syntax modes: <strong>numeric (octal)</strong> mode sets all nine permission bits at once, while <strong>symbolic</strong> mode lets you add or remove specific permissions without affecting others. Both are essential in every developer\'s daily workflow.',
    commandNumericTitle: 'Numeric Mode',
    commandNumericDesc: 'In numeric mode you provide a three-digit (or four-digit for special permissions) octal number:',
    commandSymbolicTitle: 'Symbolic Mode',
    commandSymbolicDesc: 'Symbolic mode uses letters to specify who, what operation, and which permissions. The syntax is <code>chmod [ugoa][+-=][rwxXst]</code>:',
    commandSymbolicWho: '<strong>Who:</strong> u (user/owner), g (group), o (others), a (all)',
    commandSymbolicOp: '<strong>Operator:</strong> + (add permission), - (remove permission), = (set exactly)',
    commandSymbolicPerm: '<strong>Permission:</strong> r (read), w (write), x (execute), X (execute only if directory or already executable)',
    commandRecursiveTitle: 'Recursive chmod',
    commandRecursiveDesc: 'Use <code>chmod -R</code> to change permissions recursively. A common pattern is to set directories and files differently using <code>find</code>:',
    commandToolCta: 'Use our chmod calculator to generate the exact command you need:',
    h2_patterns: '5. Common chmod Patterns for Developers',
    patternsP1: 'Different file types demand specific permission settings. Getting these wrong is one of the most common causes of deployment failures, SSH errors, and security vulnerabilities. Here is a definitive reference of <strong>chmod patterns</strong> every developer should know.',
    patternsWebTitle: 'Web Server Files',
    patternsWebDesc: 'For Apache and Nginx web servers, the standard convention is <strong>644 for files</strong> and <strong>755 for directories</strong>. This allows the web server process to read files and traverse directories while preventing unauthorized modifications:',
    patternsScriptTitle: 'Scripts and Executables',
    patternsScriptDesc: 'Any file you want to run directly (shell scripts, Python scripts, compiled binaries) needs the execute bit. Use <strong>755</strong> for shared scripts and <strong>700</strong> for private ones:',
    patternsSshTitle: 'SSH Keys and Configuration',
    patternsSshDesc: 'SSH is very strict about permissions. If your key file is too permissive, SSH will refuse to use it with the error "Permissions are too open". These are the required settings:',
    patternsEnvTitle: 'Environment and Secret Files',
    patternsEnvDesc: 'Files containing API keys, database credentials, and other secrets must be locked down to owner-only access:',
    patternsUploadTitle: 'Upload Directories',
    patternsUploadDesc: 'Directories where a web application writes uploaded files need group write access so the web server process can create files:',
    h2_special: '6. Special Permissions: setuid, setgid, Sticky Bit',
    specialP1: 'Beyond the standard nine permission bits, Linux supports three special permission bits that modify execution behavior. These are represented as a fourth (leading) octal digit and appear as special characters in the <code>ls -l</code> output.',
    specialSuidTitle: 'setuid (SUID) -- 4000',
    specialSuidDesc: 'When set on an executable file, the process runs with the <strong>file owner\'s permissions</strong> instead of the user who executes it. The classic example is <code>/usr/bin/passwd</code>, which needs root privileges to modify <code>/etc/shadow</code> but must be runnable by any user. In <code>ls -l</code> output, SUID shows as <code>s</code> in the owner execute position (<code>-rw<strong>s</strong>r-xr-x</code>). If the execute bit is not set, it appears as uppercase <code>S</code>.',
    specialSgidTitle: 'setgid (SGID) -- 2000',
    specialSgidDesc: 'On an executable, SGID causes the process to run with the file\'s <strong>group</strong> privileges. On a <strong>directory</strong>, it is even more useful: new files created inside automatically inherit the directory\'s group instead of the creator\'s primary group. This is essential for shared team directories where all files must belong to the same group.',
    specialStickyTitle: 'Sticky Bit -- 1000',
    specialStickyDesc: 'When set on a directory, the sticky bit ensures that only the <strong>file owner</strong>, the <strong>directory owner</strong>, or <strong>root</strong> can delete or rename files within it, even if other users have write permission. The canonical example is <code>/tmp</code> (permissions <code>1777</code>), where all users can create files but cannot delete each other\'s files.',
    specialCodeTitle: 'Setting special permissions:',
    h2_best: '7. Best Practices for File Permissions',
    bestP1: 'File permissions are a critical layer of defense. Following these best practices will help you avoid security incidents and deployment headaches.',
    best1: '<strong>Follow the principle of least privilege.</strong> Grant only the minimum permissions needed. Start restrictive (e.g., 600) and loosen only if required.',
    best2: '<strong>Never use chmod 777 in production.</strong> It means every user on the system can read, modify, and execute the file. If your application requires 777 to work, your deployment architecture has a flaw.',
    best3: '<strong>Audit permissions regularly.</strong> Use <code>find / -perm -777 -type f</code> to locate overly permissive files. Schedule this as part of your security review process.',
    best4: '<strong>Use groups instead of world-readable permissions.</strong> If multiple users need access, create a shared group and set group permissions rather than opening files to "others".',
    best5: '<strong>Be careful with recursive chmod.</strong> Running <code>chmod -R 755 /</code> on the wrong directory can break your system. Always double-check the path and use <code>find</code> to target specific file types.',
    best6: '<strong>Document your permission requirements.</strong> Include chmod commands in your deployment scripts, Dockerfiles, and README files so the correct permissions are always applied.',
    best7: '<strong>Use umask to set secure defaults.</strong> Set <code>umask 027</code> in your shell profile so new files are created with 640 (files) and 750 (directories) by default.',
    bestP2: 'For a quick, visual way to determine the right permissions, use our chmod calculator tool linked below. It lets you toggle checkboxes and see the octal number, symbolic notation, and <code>ls -l</code> output in real time.',
    h2_faq: '8. Frequently Asked Questions',
    faq1q: 'What does chmod 755 mean?',
    faq1a: 'chmod 755 sets the file permissions so that the owner has full access (read + write + execute = 7), while the group and others have read and execute access only (4 + 1 = 5). In symbolic notation this is rwxr-xr-x. It is the standard permission for executable scripts, directories, and web server document roots.',
    faq2q: 'What is the difference between chmod 755 and 644?',
    faq2a: 'chmod 755 (rwxr-xr-x) grants execute permission to all three user categories, making it suitable for directories and executable scripts. chmod 644 (rw-r--r--) removes all execute permissions and only grants write to the owner, making it the standard for regular files like HTML, CSS, configuration files, and documents. Use 755 for things that need to be run or traversed, and 644 for things that only need to be read.',
    faq3q: 'How do I check file permissions in Linux?',
    faq3a: 'Run the command ls -la in your terminal to see detailed file information including permissions. The first column displays the permission string (e.g., -rwxr-xr-x). You can also use the stat command for a more detailed view: stat filename shows the permission in both octal and symbolic notation, along with owner and group information.',
    faq4q: 'What is the most secure file permission?',
    faq4a: 'The most secure standard permission is 000 (no access for anyone except root), but practically, 400 (read-only for owner) or 600 (read+write for owner only) are the most restrictive useful permissions. For SSH private keys, use 600. For SSL certificates, use 400. The principle of least privilege says you should always start with the most restrictive permissions and only add access as needed.',
    faq5q: 'Can I use chmod on Mac?',
    faq5a: 'Yes. macOS is built on BSD Unix and fully supports the chmod command with the same syntax as Linux. You can use both numeric mode (chmod 755 file) and symbolic mode (chmod u+x file). The permissions work identically to Linux. macOS also supports ACLs (Access Control Lists) for more fine-grained access control via the chmod +a and chmod -a syntax.',
    linkToolBottom: 'Calculate exact chmod values with our free online chmod calculator.',
    relatedHtaccess: 'Also check out our htaccess generator for Apache server configuration.',
    relatedPassword: 'Need a strong password? Try our password generator.',
  },
  zh: {
    title: 'Linux 文件权限完全指南：chmod 计算器与权限速查表',
    intro: 'Linux 文件权限是系统安全的基石。Unix 系统上的每个文件和目录都带有元数据，决定谁可以读取、写入或执行它。无论你是部署 Web 应用、加固服务器还是排查部署脚本问题，理解 <strong>chmod 命令</strong>和<strong>文件权限数字</strong>都是必不可少的。本综合 <strong>chmod 计算器指南</strong>将带你从基本权限概念到特殊位全面掌握，并提供可收藏的完整 <strong>chmod 速查表</strong>。',
    linkTool: '试用我们的交互式 chmod 计算器，即时可视化权限设置。',
    h2_what: '1. 什么是 Linux 文件权限？',
    whatP1: 'Linux 中的每个文件和目录都有三类可以与之交互的用户。<strong>所有者</strong>（也称"用户"）通常是创建文件的人。<strong>组</strong>是一组共享访问权限的用户。<strong>其他人</strong>（有时称为"世界"）指系统上的所有其他人。当你运行 <code>ls -l</code> 时，第一列会显示每个条目的权限字符串。',
    whatP2: '每个用户类别可以被授予三种访问类型。<strong>读取 (r)</strong> 允许查看文件内容或列出目录。<strong>写入 (w)</strong> 允许修改文件或在目录中创建和删除条目。<strong>执行 (x)</strong> 允许将文件作为程序运行或使用 <code>cd</code> 进入目录。这九个权限位（三个类别乘以三种类型）构成了 Unix 权限模型的基础。',
    whatP3: '以下是典型的 <code>ls -l</code> 输出以及如何解读权限字符串：',
    whatCode: '-rwxr-xr--  1 alice  developers  4096 Feb 20 deploy.sh\n |||  |||  |||\n |||  |||  ||+-- 其他人: r-- (只读 = 4)\n |||  |||  +--- 其他人: 无写入\n |||  ||+------ 组: r-x (读取 + 执行 = 5)\n |||  +-------- 组: 无写入\n ||+----------- 所有者: rwx (读取 + 写入 + 执行 = 7)\n |+------------ 所有者: 写入\n +------------- 所有者: 读取\n\n 权限数字: 754',
    h2_numbers: '2. 理解权限数字（八进制表示法）',
    numbersP1: 'Linux 将每组权限表示为 0 到 7 的单个八进制数字。数字由授予的权限值相加计算：<strong>读取 = 4</strong>，<strong>写入 = 2</strong>，<strong>执行 = 1</strong>。某类别无权限时值为 0。像 <strong>755</strong> 这样的三位数编码了所有三个类别：所有者 (7 = rwx)、组 (5 = r-x)、其他人 (5 = r-x)。',
    numbersP2: '以下是八进制值的 <strong>chmod 速查表</strong>，涵盖每种可能的单位组合。记住这八个值，你就能即时解码任何 <strong>linux 文件权限</strong>数字：',
    numbersTableOctal: '八进制',
    numbersTableRwx: '符号',
    numbersTableMeaning: '含义',
    numbersP3: '要计算完整的权限数字，分别计算每个数位。例如，所有者读+写 (4+2=6)、组读取 (4)、其他人无权限 (0) 得到 <strong>640</strong>。',
    h2_table: '3. chmod 权限参考表',
    tableP1: '下面是一个综合参考表，展示最常用的 <strong>chmod 权限</strong>组合。收藏此 <strong>chmod 速查表</strong>以便在配置服务器、Docker 容器或 CI/CD 流水线时快速查阅。',
    tableColOctal: '八进制', tableColSymbolic: '符号', tableColMeaning: '含义', tableColUse: '典型用途',
    perm777: '所有人完全访问', use777: '仅临时调试；生产环境绝不使用',
    perm755: '所有者完全；组/其他人读+执行', use755: '目录、可执行脚本、Web 服务器文档根',
    perm750: '所有者完全；组读+执行；其他人无', use750: '共享项目目录、组内可执行文件',
    perm700: '仅所有者完全访问', use700: '~/.ssh 目录、私有脚本',
    perm666: '所有人读+写；无执行', use666: '很少使用；临时共享文件',
    perm644: '所有者读+写；组/其他人读', use644: 'HTML、CSS、PHP 文件、配置文件、普通文档',
    perm640: '所有者读+写；组读；其他人无', use640: '日志文件、与组共享的敏感配置',
    perm600: '仅所有者读+写', use600: 'SSH 私钥、.env 文件、数据库凭据',
    perm400: '仅所有者只读', use400: 'SSL 证书、只读机密文件',
    perm775: '所有者完全；组完全；其他人读+执行', use775: '共享上传目录、团队项目文件夹',
    h2_command: '4. 如何使用 chmod 命令',
    commandP1: '<code>chmod</code> 命令用于更改文件和目录权限。它支持两种语法模式：<strong>数字（八进制）</strong>模式一次设置所有九个权限位，而<strong>符号</strong>模式可以在不影响其他权限的情况下添加或删除特定权限。两种模式都是开发者日常工作的必备技能。',
    commandNumericTitle: '数字模式',
    commandNumericDesc: '数字模式中，你提供一个三位（或四位用于特殊权限）八进制数字：',
    commandSymbolicTitle: '符号模式',
    commandSymbolicDesc: '符号模式使用字母指定谁、什么操作和哪些权限。语法为 <code>chmod [ugoa][+-=][rwxXst]</code>：',
    commandSymbolicWho: '<strong>谁：</strong> u (用户/所有者)、g (组)、o (其他人)、a (所有)',
    commandSymbolicOp: '<strong>操作符：</strong> + (添加权限)、- (移除权限)、= (精确设置)',
    commandSymbolicPerm: '<strong>权限：</strong> r (读取)、w (写入)、x (执行)、X (仅当目录或已可执行时执行)',
    commandRecursiveTitle: '递归 chmod',
    commandRecursiveDesc: '使用 <code>chmod -R</code> 递归更改权限。常见模式是使用 <code>find</code> 对目录和文件分别设置：',
    commandToolCta: '使用我们的 chmod 计算器生成你需要的精确命令：',
    h2_patterns: '5. 开发者常用 chmod 模式',
    patternsP1: '不同类型的文件需要特定的权限设置。设置错误是部署失败、SSH 错误和安全漏洞最常见的原因之一。以下是每个开发者都应了解的权威 <strong>chmod 模式</strong>参考。',
    patternsWebTitle: 'Web 服务器文件',
    patternsWebDesc: '对于 Apache 和 Nginx Web 服务器，标准约定是<strong>文件 644</strong>、<strong>目录 755</strong>。这允许 Web 服务器进程读取文件和遍历目录，同时防止未授权修改：',
    patternsScriptTitle: '脚本和可执行文件',
    patternsScriptDesc: '任何你想直接运行的文件（shell 脚本、Python 脚本、编译后的二进制文件）都需要执行位。共享脚本使用 <strong>755</strong>，私有脚本使用 <strong>700</strong>：',
    patternsSshTitle: 'SSH 密钥和配置',
    patternsSshDesc: 'SSH 对权限非常严格。如果你的密钥文件权限过于宽松，SSH 会拒绝使用它并报错 "Permissions are too open"。以下是必需的设置：',
    patternsEnvTitle: '环境和机密文件',
    patternsEnvDesc: '包含 API 密钥、数据库凭据和其他机密的文件必须锁定为仅所有者访问：',
    patternsUploadTitle: '上传目录',
    patternsUploadDesc: 'Web 应用写入上传文件的目录需要组写入权限，以便 Web 服务器进程可以创建文件：',
    h2_special: '6. 特殊权限：setuid、setgid、Sticky Bit',
    specialP1: '除了标准的九个权限位外，Linux 还支持三个特殊权限位来修改执行行为。它们表示为第四个（前导）八进制数字，并在 <code>ls -l</code> 输出中显示为特殊字符。',
    specialSuidTitle: 'setuid (SUID) -- 4000',
    specialSuidDesc: '设置在可执行文件上时，进程以<strong>文件所有者的权限</strong>而非执行者的权限运行。经典示例是 <code>/usr/bin/passwd</code>，它需要 root 权限来修改 <code>/etc/shadow</code>，但必须允许任何用户运行。在 <code>ls -l</code> 输出中，SUID 在所有者执行位显示为 <code>s</code>（<code>-rw<strong>s</strong>r-xr-x</code>）。如果执行位未设置，则显示为大写 <code>S</code>。',
    specialSgidTitle: 'setgid (SGID) -- 2000',
    specialSgidDesc: '在可执行文件上，SGID 使进程以文件的<strong>组</strong>权限运行。在<strong>目录</strong>上更有用：新创建的文件自动继承目录的组而非创建者的主组。这对于所有文件必须属于同一组的共享团队目录至关重要。',
    specialStickyTitle: 'Sticky Bit -- 1000',
    specialStickyDesc: '设置在目录上时，sticky bit 确保只有<strong>文件所有者</strong>、<strong>目录所有者</strong>或 <strong>root</strong> 才能删除或重命名其中的文件，即使其他用户有写入权限。典型示例是 <code>/tmp</code>（权限 <code>1777</code>），所有用户都可以创建文件但不能删除其他人的文件。',
    specialCodeTitle: '设置特殊权限：',
    h2_best: '7. 文件权限最佳实践',
    bestP1: '文件权限是关键的防御层。遵循这些最佳实践将帮助你避免安全事件和部署问题。',
    best1: '<strong>遵循最小权限原则。</strong>仅授予所需的最少权限。从限制性开始（如 600），仅在需要时放宽。',
    best2: '<strong>生产环境中绝不使用 chmod 777。</strong>它意味着系统上的所有用户都可以读取、修改和执行文件。如果你的应用需要 777 才能工作，说明部署架构存在缺陷。',
    best3: '<strong>定期审计权限。</strong>使用 <code>find / -perm -777 -type f</code> 查找权限过于宽松的文件。将此纳入安全审查流程。',
    best4: '<strong>使用组代替世界可读权限。</strong>如果多个用户需要访问，创建共享组并设置组权限，而非向"其他人"开放文件。',
    best5: '<strong>谨慎使用递归 chmod。</strong>在错误的目录上运行 <code>chmod -R 755 /</code> 可能破坏系统。始终仔细检查路径并使用 <code>find</code> 定位特定文件类型。',
    best6: '<strong>记录权限要求。</strong>在部署脚本、Dockerfile 和 README 文件中包含 chmod 命令，确保始终应用正确的权限。',
    best7: '<strong>使用 umask 设置安全默认值。</strong>在 shell 配置中设置 <code>umask 027</code>，新文件默认以 640（文件）和 750（目录）创建。',
    bestP2: '要快速直观地确定正确的权限，请使用下方链接的 chmod 计算器工具。它让你切换复选框并实时查看八进制数字、符号表示和 <code>ls -l</code> 输出。',
    h2_faq: '8. 常见问题',
    faq1q: 'chmod 755 是什么意思？',
    faq1a: 'chmod 755 设置文件权限，使所有者拥有完全访问权限（读+写+执行 = 7），而组和其他人仅有读取和执行权限（4+1 = 5）。符号表示为 rwxr-xr-x。它是可执行脚本、目录和 Web 服务器文档根的标准权限。',
    faq2q: 'chmod 755 和 644 有什么区别？',
    faq2a: 'chmod 755 (rwxr-xr-x) 向所有三个用户类别授予执行权限，适用于目录和可执行脚本。chmod 644 (rw-r--r--) 移除所有执行权限且仅向所有者授予写入权限，是 HTML、CSS、配置文件和文档等普通文件的标准。需要运行或遍历的使用 755，只需读取的使用 644。',
    faq3q: '如何在 Linux 中检查文件权限？',
    faq3a: '在终端运行 ls -la 命令查看详细文件信息，包括权限。第一列显示权限字符串（如 -rwxr-xr-x）。你也可以使用 stat 命令获取更详细的视图：stat filename 会同时显示八进制和符号表示的权限，以及所有者和组信息。',
    faq4q: '最安全的文件权限是什么？',
    faq4a: '最安全的标准权限是 000（除 root 外任何人都无法访问），但实际上 400（仅所有者只读）或 600（仅所有者读+写）是最实用的限制性权限。SSH 私钥使用 600，SSL 证书使用 400。最小权限原则要求始终从最严格的权限开始，仅在需要时添加访问权限。',
    faq5q: '可以在 Mac 上使用 chmod 吗？',
    faq5a: '可以。macOS 基于 BSD Unix，完全支持与 Linux 相同语法的 chmod 命令。你可以使用数字模式 (chmod 755 file) 和符号模式 (chmod u+x file)。权限工作方式与 Linux 完全相同。macOS 还通过 chmod +a 和 chmod -a 语法支持 ACL（访问控制列表）以实现更细粒度的访问控制。',
    linkToolBottom: '使用我们的免费在线 chmod 计算器计算精确权限值。',
    relatedHtaccess: '还可以查看我们的 htaccess 生成器来配置 Apache 服务器。',
    relatedPassword: '需要强密码？试试我们的密码生成器。',
  },
  fr: {
    title: 'Permissions Linux Expliquees : Guide Complet du Calculateur chmod',
    intro: 'Les permissions de fichiers Linux sont la base de la securite systeme. Chaque fichier et repertoire sur un systeme Unix porte des metadonnees qui determinent qui peut lire, ecrire ou executer. Que vous deployiez une application web, securisiez un serveur ou debogniez un script de deploiement, comprendre la commande <strong>chmod</strong> et les <strong>numeros de permissions</strong> est indispensable. Ce guide complet du <strong>calculateur chmod</strong> couvre tout, des concepts de base aux bits speciaux, avec un <strong>aide-memoire chmod</strong> complet.',
    linkTool: 'Essayez notre calculateur chmod interactif pour visualiser les permissions instantanement.',
    h2_what: '1. Que Sont les Permissions de Fichiers Linux ?',
    whatP1: 'Chaque fichier et repertoire sous Linux a trois categories d\'utilisateurs. Le <strong>proprietaire</strong> est generalement celui qui a cree le fichier. Le <strong>groupe</strong> est un ensemble d\'utilisateurs partageant des droits. Les <strong>autres</strong> designent tous les autres utilisateurs du systeme. La commande <code>ls -l</code> revele la chaine de permissions.',
    whatP2: 'Chaque categorie peut recevoir trois types d\'acces. <strong>Lecture (r)</strong> permet de voir le contenu. <strong>Ecriture (w)</strong> permet de modifier. <strong>Execution (x)</strong> permet de lancer un fichier ou d\'entrer dans un repertoire. Ces neuf bits forment le modele de permissions Unix.',
    whatP3: 'Voici un exemple typique de sortie <code>ls -l</code> :',
    whatCode: '-rwxr-xr--  1 alice  developers  4096 Feb 20 deploy.sh\n\n Proprietaire: rwx (7) | Groupe: r-x (5) | Autres: r-- (4)\n Permission: 754',
    h2_numbers: '2. Comprendre les Numeros de Permissions (Notation Octale)',
    numbersP1: 'Linux represente chaque ensemble de permissions par un chiffre octal de 0 a 7. Le chiffre est la somme des valeurs : <strong>Lecture = 4</strong>, <strong>Ecriture = 2</strong>, <strong>Execution = 1</strong>. Un nombre a trois chiffres comme <strong>755</strong> encode les trois categories.',
    numbersP2: 'Voici la table de reference octale pour chaque combinaison possible :',
    numbersTableOctal: 'Octal', numbersTableRwx: 'Symbolique', numbersTableMeaning: 'Signification',
    numbersP3: 'Pour calculer un numero complet, calculez chaque chiffre separement. Par exemple, proprietaire lecture+ecriture (4+2=6), groupe lecture (4), autres rien (0) donne <strong>640</strong>.',
    h2_table: '3. Table de Reference des Permissions chmod',
    tableP1: 'Voici une table de reference complete des combinaisons <strong>chmod</strong> les plus courantes.',
    tableColOctal: 'Octal', tableColSymbolic: 'Symbolique', tableColMeaning: 'Signification', tableColUse: 'Usage Typique',
    perm777: 'Acces total pour tous', use777: 'Debogage temporaire uniquement ; JAMAIS en production',
    perm755: 'Proprietaire total ; groupe/autres lecture+execution', use755: 'Repertoires, scripts executables, racine du serveur web',
    perm750: 'Proprietaire total ; groupe lecture+execution ; autres rien', use750: 'Repertoires de projet partages',
    perm700: 'Proprietaire uniquement', use700: 'Repertoire ~/.ssh, scripts prives',
    perm666: 'Lecture+ecriture pour tous ; sans execution', use666: 'Rarement utilise ; fichiers partages temporaires',
    perm644: 'Proprietaire lecture+ecriture ; groupe/autres lecture', use644: 'Fichiers HTML, CSS, PHP, configurations',
    perm640: 'Proprietaire lecture+ecriture ; groupe lecture ; autres rien', use640: 'Fichiers journaux, configs sensibles',
    perm600: 'Proprietaire lecture+ecriture uniquement', use600: 'Cles SSH privees, fichiers .env, identifiants',
    perm400: 'Proprietaire lecture seule', use400: 'Certificats SSL, secrets en lecture seule',
    perm775: 'Proprietaire total ; groupe total ; autres lecture+execution', use775: 'Repertoires de telechargement partages',
    h2_command: '4. Comment Utiliser la Commande chmod',
    commandP1: 'La commande <code>chmod</code> modifie les permissions. Elle supporte deux modes : <strong>numerique (octal)</strong> et <strong>symbolique</strong>.',
    commandNumericTitle: 'Mode Numerique',
    commandNumericDesc: 'En mode numerique, vous fournissez un nombre octal a trois ou quatre chiffres :',
    commandSymbolicTitle: 'Mode Symbolique',
    commandSymbolicDesc: 'Le mode symbolique utilise la syntaxe <code>chmod [ugoa][+-=][rwxXst]</code> :',
    commandSymbolicWho: '<strong>Qui :</strong> u (proprietaire), g (groupe), o (autres), a (tous)',
    commandSymbolicOp: '<strong>Operateur :</strong> + (ajouter), - (retirer), = (definir exactement)',
    commandSymbolicPerm: '<strong>Permission :</strong> r (lecture), w (ecriture), x (execution)',
    commandRecursiveTitle: 'chmod Recursif',
    commandRecursiveDesc: 'Utilisez <code>chmod -R</code> pour changer les permissions recursivement :',
    commandToolCta: 'Utilisez notre calculateur chmod pour generer la commande exacte :',
    h2_patterns: '5. Modeles chmod Courants pour les Developpeurs',
    patternsP1: 'Differents types de fichiers necessitent des permissions specifiques. Voici la reference definitive des <strong>modeles chmod</strong> essentiels.',
    patternsWebTitle: 'Fichiers de Serveur Web', patternsWebDesc: 'Pour Apache et Nginx : <strong>644 pour les fichiers</strong>, <strong>755 pour les repertoires</strong> :',
    patternsScriptTitle: 'Scripts et Executables', patternsScriptDesc: 'Utilisez <strong>755</strong> pour les scripts partages et <strong>700</strong> pour les scripts prives :',
    patternsSshTitle: 'Cles et Configuration SSH', patternsSshDesc: 'SSH est tres strict sur les permissions. Voici les parametres requis :',
    patternsEnvTitle: 'Fichiers d\'Environnement et Secrets', patternsEnvDesc: 'Les fichiers contenant des cles API et identifiants doivent etre restreints :',
    patternsUploadTitle: 'Repertoires de Telechargement', patternsUploadDesc: 'Les repertoires d\'upload necessitent les permissions d\'ecriture du groupe :',
    h2_special: '6. Permissions Speciales : setuid, setgid, Sticky Bit',
    specialP1: 'Au-dela des neuf bits standard, Linux supporte trois bits speciaux qui modifient le comportement d\'execution.',
    specialSuidTitle: 'setuid (SUID) -- 4000', specialSuidDesc: 'Le processus s\'execute avec les permissions du <strong>proprietaire du fichier</strong>. Exemple classique : <code>/usr/bin/passwd</code>. Affiche comme <code>s</code> dans la position d\'execution du proprietaire.',
    specialSgidTitle: 'setgid (SGID) -- 2000', specialSgidDesc: 'Sur un repertoire, les nouveaux fichiers heritent automatiquement du groupe du repertoire. Essentiel pour les repertoires de projets partages.',
    specialStickyTitle: 'Sticky Bit -- 1000', specialStickyDesc: 'Seuls le proprietaire du fichier, le proprietaire du repertoire ou root peuvent supprimer les fichiers. Exemple canonique : <code>/tmp</code> (1777).',
    specialCodeTitle: 'Definir les permissions speciales :',
    h2_best: '7. Bonnes Pratiques pour les Permissions',
    bestP1: 'Les permissions sont une couche de defense critique. Suivez ces bonnes pratiques.',
    best1: '<strong>Appliquez le principe du moindre privilege.</strong> N\'accordez que les permissions minimales necessaires.',
    best2: '<strong>N\'utilisez jamais chmod 777 en production.</strong> Cela donne un acces total a tous.',
    best3: '<strong>Auditez regulierement les permissions.</strong> Utilisez <code>find / -perm -777 -type f</code>.',
    best4: '<strong>Utilisez les groupes plutot que les permissions world-readable.</strong>',
    best5: '<strong>Soyez prudent avec chmod recursif.</strong> Verifiez toujours le chemin.',
    best6: '<strong>Documentez vos exigences de permissions.</strong> Incluez les commandes chmod dans vos scripts.',
    best7: '<strong>Utilisez umask pour des valeurs par defaut securisees.</strong> Definissez <code>umask 027</code>.',
    bestP2: 'Utilisez notre calculateur chmod pour determiner rapidement les bonnes permissions.',
    h2_faq: '8. Questions Frequemment Posees',
    faq1q: 'Que signifie chmod 755 ?', faq1a: 'chmod 755 donne au proprietaire un acces total (rwx = 7), et au groupe et aux autres un acces en lecture et execution (r-x = 5). C\'est la permission standard pour les scripts executables et les repertoires.',
    faq2q: 'Quelle est la difference entre chmod 755 et 644 ?', faq2a: 'chmod 755 (rwxr-xr-x) accorde l\'execution a tous, pour les repertoires et scripts. chmod 644 (rw-r--r--) supprime l\'execution et n\'accorde l\'ecriture qu\'au proprietaire, pour les fichiers reguliers.',
    faq3q: 'Comment verifier les permissions sous Linux ?', faq3a: 'Executez ls -la pour voir les permissions detaillees. Utilisez stat filename pour une vue plus complete avec les notations octale et symbolique.',
    faq4q: 'Quelle est la permission la plus securisee ?', faq4a: 'Pratiquement, 400 (lecture seule proprietaire) ou 600 (lecture+ecriture proprietaire) sont les plus restrictives. Pour les cles SSH, utilisez 600. Pour les certificats SSL, utilisez 400.',
    faq5q: 'Peut-on utiliser chmod sur Mac ?', faq5a: 'Oui. macOS est base sur BSD Unix et supporte pleinement chmod avec la meme syntaxe que Linux, en mode numerique et symbolique. macOS supporte aussi les ACL.',
    linkToolBottom: 'Calculez les valeurs chmod exactes avec notre calculateur gratuit en ligne.',
    relatedHtaccess: 'Consultez aussi notre generateur htaccess pour la configuration Apache.',
    relatedPassword: 'Besoin d\'un mot de passe fort ? Essayez notre generateur de mots de passe.',
  },
  de: {
    title: 'Linux Dateiberechtigungen Erklaert: Der Komplette chmod-Rechner Guide',
    intro: 'Linux Dateiberechtigungen sind das Rueckgrat der Systemsicherheit. Jede Datei und jedes Verzeichnis auf einem Unix-System traegt Metadaten, die bestimmen, wer lesen, schreiben oder ausfuehren darf. Ob Sie eine Webanwendung deployen, einen Server absichern oder ein Deployment-Skript debuggen -- das Verstaendnis des <strong>chmod-Befehls</strong> und der <strong>Berechtigungszahlen</strong> ist unverzichtbar. Dieser umfassende <strong>chmod-Rechner Guide</strong> fuehrt Sie durch alles von Grundkonzepten bis zu Spezialbits.',
    linkTool: 'Probieren Sie unseren interaktiven chmod-Rechner aus.',
    h2_what: '1. Was Sind Linux Dateiberechtigungen?',
    whatP1: 'Jede Datei unter Linux hat drei Benutzerkategorien. Der <strong>Eigentuemer</strong> ist typischerweise der Ersteller. Die <strong>Gruppe</strong> ist eine Menge von Benutzern mit gemeinsamen Rechten. <strong>Andere</strong> bezeichnet alle uebrigen Benutzer. Der Befehl <code>ls -l</code> zeigt den Berechtigungsstring.',
    whatP2: 'Jede Kategorie kann drei Zugriffstypen erhalten: <strong>Lesen (r)</strong>, <strong>Schreiben (w)</strong> und <strong>Ausfuehren (x)</strong>. Diese neun Bits bilden das Unix-Berechtigungsmodell.',
    whatP3: 'So sieht eine typische <code>ls -l</code> Ausgabe aus:',
    whatCode: '-rwxr-xr--  1 alice  developers  4096 Feb 20 deploy.sh\n\n Eigentuemer: rwx (7) | Gruppe: r-x (5) | Andere: r-- (4)\n Berechtigung: 754',
    h2_numbers: '2. Berechtigungszahlen Verstehen (Oktalnotation)',
    numbersP1: 'Linux stellt jede Berechtigungsgruppe als einzelne Oktalziffer (0-7) dar: <strong>Lesen = 4</strong>, <strong>Schreiben = 2</strong>, <strong>Ausfuehren = 1</strong>. Eine dreistellige Zahl wie <strong>755</strong> kodiert alle drei Kategorien.',
    numbersP2: 'Hier ist die Oktal-Referenztabelle:',
    numbersTableOctal: 'Oktal', numbersTableRwx: 'Symbolisch', numbersTableMeaning: 'Bedeutung',
    numbersP3: 'Um eine vollstaendige Berechtigungszahl zu berechnen, berechnen Sie jede Stelle einzeln. Beispiel: Eigentuemer Lesen+Schreiben (4+2=6), Gruppe Lesen (4), Andere nichts (0) ergibt <strong>640</strong>.',
    h2_table: '3. chmod Berechtigungsreferenztabelle',
    tableP1: 'Eine umfassende Referenztabelle der gaengigsten <strong>chmod-Berechtigungen</strong>.',
    tableColOctal: 'Oktal', tableColSymbolic: 'Symbolisch', tableColMeaning: 'Bedeutung', tableColUse: 'Typischer Einsatz',
    perm777: 'Voller Zugriff fuer alle', use777: 'Nur temporaeres Debugging; NIE in Produktion',
    perm755: 'Eigentuemer voll; Gruppe/Andere Lesen+Ausfuehren', use755: 'Verzeichnisse, ausfuehrbare Skripte, Webserver-Wurzel',
    perm750: 'Eigentuemer voll; Gruppe Lesen+Ausfuehren; Andere nichts', use750: 'Gemeinsame Projektverzeichnisse',
    perm700: 'Nur Eigentuemer voller Zugriff', use700: '~/.ssh Verzeichnis, private Skripte',
    perm666: 'Lesen+Schreiben fuer alle; kein Ausfuehren', use666: 'Selten verwendet; temporaere gemeinsame Dateien',
    perm644: 'Eigentuemer Lesen+Schreiben; Gruppe/Andere Lesen', use644: 'HTML, CSS, PHP, Konfigurationsdateien',
    perm640: 'Eigentuemer Lesen+Schreiben; Gruppe Lesen; Andere nichts', use640: 'Logdateien, sensible Konfigurationen',
    perm600: 'Nur Eigentuemer Lesen+Schreiben', use600: 'SSH-Privatschluessel, .env-Dateien, Zugangsdaten',
    perm400: 'Nur Eigentuemer Lesen', use400: 'SSL-Zertifikate, schreibgeschuetzte Geheimnisse',
    perm775: 'Eigentuemer voll; Gruppe voll; Andere Lesen+Ausfuehren', use775: 'Gemeinsame Upload-Verzeichnisse',
    h2_command: '4. Wie Man den chmod-Befehl Verwendet',
    commandP1: 'Der <code>chmod</code>-Befehl aendert Berechtigungen. Er unterstuetzt zwei Modi: <strong>numerisch (oktal)</strong> und <strong>symbolisch</strong>.',
    commandNumericTitle: 'Numerischer Modus', commandNumericDesc: 'Im numerischen Modus geben Sie eine drei- oder vierstellige Oktalzahl an:',
    commandSymbolicTitle: 'Symbolischer Modus', commandSymbolicDesc: 'Symbolischer Modus nutzt die Syntax <code>chmod [ugoa][+-=][rwxXst]</code>:',
    commandSymbolicWho: '<strong>Wer:</strong> u (Eigentuemer), g (Gruppe), o (Andere), a (Alle)',
    commandSymbolicOp: '<strong>Operator:</strong> + (hinzufuegen), - (entfernen), = (exakt setzen)',
    commandSymbolicPerm: '<strong>Berechtigung:</strong> r (Lesen), w (Schreiben), x (Ausfuehren)',
    commandRecursiveTitle: 'Rekursives chmod', commandRecursiveDesc: 'Verwenden Sie <code>chmod -R</code> fuer rekursive Aenderungen:',
    commandToolCta: 'Nutzen Sie unseren chmod-Rechner fuer den exakten Befehl:',
    h2_patterns: '5. Gaengige chmod-Muster fuer Entwickler',
    patternsP1: 'Verschiedene Dateitypen erfordern spezifische Berechtigungseinstellungen. Hier ist die definitive Referenz.',
    patternsWebTitle: 'Webserver-Dateien', patternsWebDesc: 'Standard: <strong>644 fuer Dateien</strong>, <strong>755 fuer Verzeichnisse</strong>:',
    patternsScriptTitle: 'Skripte und Ausfuehrbare', patternsScriptDesc: '<strong>755</strong> fuer gemeinsame Skripte, <strong>700</strong> fuer private:',
    patternsSshTitle: 'SSH-Schluessel und Konfiguration', patternsSshDesc: 'SSH ist sehr streng bei Berechtigungen:',
    patternsEnvTitle: 'Umgebungs- und Geheimnisdateien', patternsEnvDesc: 'Dateien mit API-Schluesseln muessen auf Eigentuemer beschraenkt sein:',
    patternsUploadTitle: 'Upload-Verzeichnisse', patternsUploadDesc: 'Upload-Verzeichnisse benoetigen Gruppen-Schreibrechte:',
    h2_special: '6. Spezialberechtigungen: setuid, setgid, Sticky Bit',
    specialP1: 'Neben den neun Standardbits gibt es drei Spezialbits.',
    specialSuidTitle: 'setuid (SUID) -- 4000', specialSuidDesc: 'Der Prozess laeuft mit den Rechten des <strong>Datei-Eigentuemers</strong>. Beispiel: <code>/usr/bin/passwd</code>. Anzeige als <code>s</code>.',
    specialSgidTitle: 'setgid (SGID) -- 2000', specialSgidDesc: 'Auf Verzeichnissen erben neue Dateien automatisch die Gruppe des Verzeichnisses.',
    specialStickyTitle: 'Sticky Bit -- 1000', specialStickyDesc: 'Nur Eigentuemer oder root koennen Dateien loeschen. Beispiel: <code>/tmp</code> (1777).',
    specialCodeTitle: 'Spezialberechtigungen setzen:',
    h2_best: '7. Best Practices fuer Dateiberechtigungen',
    bestP1: 'Berechtigungen sind eine kritische Verteidigungsschicht.',
    best1: '<strong>Prinzip der minimalen Rechte.</strong> Nur die notwendigen Berechtigungen vergeben.',
    best2: '<strong>Niemals chmod 777 in Produktion.</strong> Gibt jedem vollen Zugriff.',
    best3: '<strong>Regelmaessig Berechtigungen pruefen.</strong> <code>find / -perm -777 -type f</code> verwenden.',
    best4: '<strong>Gruppen statt world-readable verwenden.</strong>',
    best5: '<strong>Vorsicht mit rekursivem chmod.</strong> Pfad immer ueberpruefen.',
    best6: '<strong>Berechtigungsanforderungen dokumentieren.</strong>',
    best7: '<strong>umask fuer sichere Standardwerte.</strong> <code>umask 027</code> setzen.',
    bestP2: 'Nutzen Sie unseren chmod-Rechner fuer schnelle visuelle Berechtigungsbestimmung.',
    h2_faq: '8. Haeufig Gestellte Fragen',
    faq1q: 'Was bedeutet chmod 755?', faq1a: 'chmod 755 gibt dem Eigentuemer vollen Zugriff (rwx = 7) und Gruppe/Anderen Lese- und Ausfuehrungsrechte (r-x = 5). Standard fuer ausfuehrbare Skripte und Verzeichnisse.',
    faq2q: 'Was ist der Unterschied zwischen chmod 755 und 644?', faq2a: 'chmod 755 (rwxr-xr-x) erlaubt Ausfuehrung fuer alle -- fuer Verzeichnisse und Skripte. chmod 644 (rw-r--r--) entfernt Ausfuehrung und erlaubt nur dem Eigentuemer das Schreiben -- fuer regulaere Dateien.',
    faq3q: 'Wie pruefe ich Dateiberechtigungen unter Linux?', faq3a: 'Fuehren Sie ls -la aus. Die erste Spalte zeigt die Berechtigungen. Verwenden Sie stat fuer detailliertere Informationen.',
    faq4q: 'Was ist die sicherste Dateiberechtigung?', faq4a: 'Praktisch sind 400 (nur Lesen) oder 600 (Lesen+Schreiben nur Eigentuemer) die restriktivsten nuetzlichen Berechtigungen.',
    faq5q: 'Kann ich chmod auf dem Mac verwenden?', faq5a: 'Ja. macOS basiert auf BSD Unix und unterstuetzt chmod vollstaendig mit gleicher Syntax wie Linux.',
    linkToolBottom: 'Berechnen Sie chmod-Werte mit unserem kostenlosen Online-Rechner.',
    relatedHtaccess: 'Sehen Sie auch unseren htaccess-Generator fuer Apache-Konfiguration.',
    relatedPassword: 'Brauchen Sie ein starkes Passwort? Probieren Sie unseren Passwort-Generator.',
  },
  es: {
    title: 'Permisos de Archivos Linux Explicados: Guia Completa del Calculador chmod',
    intro: 'Los permisos de archivos Linux son la columna vertebral de la seguridad del sistema. Cada archivo y directorio en un sistema Unix lleva metadatos que determinan quien puede leer, escribir o ejecutar. Ya sea que estes desplegando una aplicacion web, asegurando un servidor o depurando un script de despliegue, comprender el comando <strong>chmod</strong> y los <strong>numeros de permisos</strong> es imprescindible. Esta guia completa del <strong>calculador chmod</strong> cubre todo.',
    linkTool: 'Prueba nuestro calculador chmod interactivo para visualizar permisos al instante.',
    h2_what: '1. Que Son los Permisos de Archivos Linux?',
    whatP1: 'Cada archivo en Linux tiene tres categorias de usuarios: <strong>propietario</strong>, <strong>grupo</strong> y <strong>otros</strong>. El comando <code>ls -l</code> revela la cadena de permisos.',
    whatP2: 'Cada categoria puede recibir tres tipos de acceso: <strong>Lectura (r)</strong>, <strong>Escritura (w)</strong> y <strong>Ejecucion (x)</strong>. Estos nueve bits forman el modelo de permisos Unix.',
    whatP3: 'Asi se ve una salida tipica de <code>ls -l</code>:',
    whatCode: '-rwxr-xr--  1 alice  developers  4096 Feb 20 deploy.sh\n\n Propietario: rwx (7) | Grupo: r-x (5) | Otros: r-- (4)\n Permiso: 754',
    h2_numbers: '2. Entendiendo los Numeros de Permisos (Notacion Octal)',
    numbersP1: 'Linux representa cada conjunto de permisos como un digito octal de 0 a 7: <strong>Lectura = 4</strong>, <strong>Escritura = 2</strong>, <strong>Ejecucion = 1</strong>. Un numero de tres digitos como <strong>755</strong> codifica las tres categorias.',
    numbersP2: 'Tabla de referencia octal:',
    numbersTableOctal: 'Octal', numbersTableRwx: 'Simbolico', numbersTableMeaning: 'Significado',
    numbersP3: 'Para calcular un numero completo, calcule cada digito por separado. Ejemplo: propietario lectura+escritura (4+2=6), grupo lectura (4), otros nada (0) da <strong>640</strong>.',
    h2_table: '3. Tabla de Referencia de Permisos chmod',
    tableP1: 'Tabla completa de las combinaciones de <strong>permisos chmod</strong> mas comunes.',
    tableColOctal: 'Octal', tableColSymbolic: 'Simbolico', tableColMeaning: 'Significado', tableColUse: 'Uso Tipico',
    perm777: 'Acceso total para todos', use777: 'Solo depuracion temporal; NUNCA en produccion',
    perm755: 'Propietario total; grupo/otros lectura+ejecucion', use755: 'Directorios, scripts ejecutables, raiz del servidor web',
    perm750: 'Propietario total; grupo lectura+ejecucion; otros nada', use750: 'Directorios de proyecto compartidos',
    perm700: 'Solo propietario acceso total', use700: 'Directorio ~/.ssh, scripts privados',
    perm666: 'Lectura+escritura para todos; sin ejecucion', use666: 'Poco usado; archivos compartidos temporales',
    perm644: 'Propietario lectura+escritura; grupo/otros lectura', use644: 'Archivos HTML, CSS, PHP, configuraciones',
    perm640: 'Propietario lectura+escritura; grupo lectura; otros nada', use640: 'Archivos de log, configs sensibles',
    perm600: 'Solo propietario lectura+escritura', use600: 'Claves SSH privadas, archivos .env, credenciales',
    perm400: 'Solo propietario lectura', use400: 'Certificados SSL, secretos de solo lectura',
    perm775: 'Propietario total; grupo total; otros lectura+ejecucion', use775: 'Directorios de subida compartidos',
    h2_command: '4. Como Usar el Comando chmod',
    commandP1: 'El comando <code>chmod</code> cambia los permisos. Soporta modo <strong>numerico (octal)</strong> y modo <strong>simbolico</strong>.',
    commandNumericTitle: 'Modo Numerico', commandNumericDesc: 'En modo numerico, proporcionas un numero octal de tres o cuatro digitos:',
    commandSymbolicTitle: 'Modo Simbolico', commandSymbolicDesc: 'Modo simbolico usa la sintaxis <code>chmod [ugoa][+-=][rwxXst]</code>:',
    commandSymbolicWho: '<strong>Quien:</strong> u (propietario), g (grupo), o (otros), a (todos)',
    commandSymbolicOp: '<strong>Operador:</strong> + (agregar), - (quitar), = (establecer exactamente)',
    commandSymbolicPerm: '<strong>Permiso:</strong> r (lectura), w (escritura), x (ejecucion)',
    commandRecursiveTitle: 'chmod Recursivo', commandRecursiveDesc: 'Usa <code>chmod -R</code> para cambios recursivos:',
    commandToolCta: 'Usa nuestro calculador chmod para generar el comando exacto:',
    h2_patterns: '5. Patrones chmod Comunes para Desarrolladores',
    patternsP1: 'Diferentes tipos de archivos requieren permisos especificos. Aqui esta la referencia definitiva.',
    patternsWebTitle: 'Archivos de Servidor Web', patternsWebDesc: 'Estandar: <strong>644 para archivos</strong>, <strong>755 para directorios</strong>:',
    patternsScriptTitle: 'Scripts y Ejecutables', patternsScriptDesc: '<strong>755</strong> para scripts compartidos, <strong>700</strong> para privados:',
    patternsSshTitle: 'Claves y Configuracion SSH', patternsSshDesc: 'SSH es muy estricto con los permisos:',
    patternsEnvTitle: 'Archivos de Entorno y Secretos', patternsEnvDesc: 'Archivos con claves API deben estar restringidos al propietario:',
    patternsUploadTitle: 'Directorios de Subida', patternsUploadDesc: 'Los directorios de subida necesitan escritura de grupo:',
    h2_special: '6. Permisos Especiales: setuid, setgid, Sticky Bit',
    specialP1: 'Ademas de los nueve bits estandar, Linux soporta tres bits especiales.',
    specialSuidTitle: 'setuid (SUID) -- 4000', specialSuidDesc: 'El proceso se ejecuta con los permisos del <strong>propietario del archivo</strong>. Ejemplo: <code>/usr/bin/passwd</code>.',
    specialSgidTitle: 'setgid (SGID) -- 2000', specialSgidDesc: 'En directorios, los nuevos archivos heredan el grupo del directorio automaticamente.',
    specialStickyTitle: 'Sticky Bit -- 1000', specialStickyDesc: 'Solo el propietario o root pueden eliminar archivos. Ejemplo: <code>/tmp</code> (1777).',
    specialCodeTitle: 'Establecer permisos especiales:',
    h2_best: '7. Mejores Practicas para Permisos de Archivos',
    bestP1: 'Los permisos son una capa critica de defensa.',
    best1: '<strong>Sigue el principio de minimo privilegio.</strong> Otorga solo los permisos minimos necesarios.',
    best2: '<strong>Nunca uses chmod 777 en produccion.</strong> Da acceso total a todos.',
    best3: '<strong>Audita permisos regularmente.</strong> Usa <code>find / -perm -777 -type f</code>.',
    best4: '<strong>Usa grupos en lugar de permisos world-readable.</strong>',
    best5: '<strong>Cuidado con chmod recursivo.</strong> Verifica siempre la ruta.',
    best6: '<strong>Documenta tus requisitos de permisos.</strong>',
    best7: '<strong>Usa umask para valores predeterminados seguros.</strong> Establece <code>umask 027</code>.',
    bestP2: 'Usa nuestro calculador chmod para determinar rapidamente los permisos correctos.',
    h2_faq: '8. Preguntas Frecuentes',
    faq1q: 'Que significa chmod 755?', faq1a: 'chmod 755 da al propietario acceso total (rwx = 7) y al grupo y otros acceso de lectura y ejecucion (r-x = 5). Es el permiso estandar para scripts ejecutables y directorios.',
    faq2q: 'Cual es la diferencia entre chmod 755 y 644?', faq2a: 'chmod 755 (rwxr-xr-x) otorga ejecucion a todos -- para directorios y scripts. chmod 644 (rw-r--r--) elimina ejecucion y solo otorga escritura al propietario -- para archivos regulares.',
    faq3q: 'Como verifico los permisos en Linux?', faq3a: 'Ejecuta ls -la para ver permisos detallados. Usa stat para informacion mas completa.',
    faq4q: 'Cual es el permiso mas seguro?', faq4a: 'Practicamente, 400 (solo lectura) o 600 (lectura+escritura solo propietario) son los mas restrictivos utiles.',
    faq5q: 'Puedo usar chmod en Mac?', faq5a: 'Si. macOS esta basado en BSD Unix y soporta completamente chmod con la misma sintaxis que Linux.',
    linkToolBottom: 'Calcula valores chmod exactos con nuestro calculador gratuito en linea.',
    relatedHtaccess: 'Consulta tambien nuestro generador htaccess para configuracion Apache.',
    relatedPassword: 'Necesitas una contrasena segura? Prueba nuestro generador de contrasenas.',
  },
  ja: {
    title: 'Linuxファイルパーミッション解説：完全なchmod計算機ガイド',
    intro: 'Linuxファイルパーミッションはシステムセキュリティの根幹です。Unix系システムのすべてのファイルとディレクトリには、誰が読み取り、書き込み、実行できるかを決定するメタデータがあります。Webアプリのデプロイ、サーバーの強化、デプロイスクリプトのデバッグなど、<strong>chmodコマンド</strong>と<strong>ファイルパーミッション番号</strong>の理解は必須です。この包括的な<strong>chmod計算機ガイド</strong>では、基本概念から特殊ビットまですべてをカバーします。',
    linkTool: 'インタラクティブなchmod計算機でパーミッションを即座に視覚化できます。',
    h2_what: '1. Linuxファイルパーミッションとは？',
    whatP1: 'Linuxのすべてのファイルとディレクトリには3つのユーザーカテゴリがあります。<strong>所有者</strong>は通常ファイルの作成者です。<strong>グループ</strong>はアクセス権を共有するユーザーの集合です。<strong>その他</strong>はシステム上の他のすべてのユーザーを指します。<code>ls -l</code>コマンドでパーミッション文字列を確認できます。',
    whatP2: '各カテゴリには3種類のアクセス権を付与できます。<strong>読み取り (r)</strong> はファイル内容の表示やディレクトリの一覧表示を許可します。<strong>書き込み (w)</strong> はファイルの変更やディレクトリ内のエントリの作成・削除を許可します。<strong>実行 (x)</strong> はプログラムとしての実行やディレクトリへの移動を許可します。',
    whatP3: '典型的な <code>ls -l</code> 出力の例：',
    whatCode: '-rwxr-xr--  1 alice  developers  4096 Feb 20 deploy.sh\n\n 所有者: rwx (7) | グループ: r-x (5) | その他: r-- (4)\n パーミッション番号: 754',
    h2_numbers: '2. パーミッション番号の理解（8進数表記）',
    numbersP1: 'Linuxは各パーミッションセットを0から7の8進数で表します：<strong>読み取り = 4</strong>、<strong>書き込み = 2</strong>、<strong>実行 = 1</strong>。<strong>755</strong>のような3桁の数字は3つのカテゴリすべてをエンコードします。',
    numbersP2: '8進数リファレンステーブル：',
    numbersTableOctal: '8進数', numbersTableRwx: 'シンボル', numbersTableMeaning: '意味',
    numbersP3: '完全なパーミッション番号を計算するには、各桁を個別に計算します。例：所有者 読み取り+書き込み (4+2=6)、グループ 読み取り (4)、その他 なし (0) で <strong>640</strong>。',
    h2_table: '3. chmodパーミッションリファレンステーブル',
    tableP1: '最もよく使われる<strong>chmodパーミッション</strong>の包括的なリファレンステーブルです。',
    tableColOctal: '8進数', tableColSymbolic: 'シンボル', tableColMeaning: '意味', tableColUse: '典型的な用途',
    perm777: '全員にフルアクセス', use777: '一時的なデバッグのみ；本番環境では絶対に使用しない',
    perm755: '所有者フル；グループ/その他 読み取り+実行', use755: 'ディレクトリ、実行スクリプト、Webサーバーのドキュメントルート',
    perm750: '所有者フル；グループ 読み取り+実行；その他 なし', use750: '共有プロジェクトディレクトリ',
    perm700: '所有者のみフルアクセス', use700: '~/.sshディレクトリ、プライベートスクリプト',
    perm666: '全員に読み取り+書き込み；実行なし', use666: 'まれに使用；一時的な共有ファイル',
    perm644: '所有者 読み取り+書き込み；グループ/その他 読み取り', use644: 'HTML、CSS、PHPファイル、設定ファイル',
    perm640: '所有者 読み取り+書き込み；グループ 読み取り；その他 なし', use640: 'ログファイル、機密設定',
    perm600: '所有者のみ読み取り+書き込み', use600: 'SSH秘密鍵、.envファイル、データベース資格情報',
    perm400: '所有者のみ読み取り', use400: 'SSL証明書、読み取り専用シークレット',
    perm775: '所有者フル；グループフル；その他 読み取り+実行', use775: '共有アップロードディレクトリ',
    h2_command: '4. chmodコマンドの使い方',
    commandP1: '<code>chmod</code>コマンドはファイルとディレクトリのパーミッションを変更します。<strong>数値（8進数）</strong>モードと<strong>シンボリック</strong>モードの2つをサポートしています。',
    commandNumericTitle: '数値モード', commandNumericDesc: '数値モードでは3桁または4桁の8進数を指定します：',
    commandSymbolicTitle: 'シンボリックモード', commandSymbolicDesc: 'シンボリックモードは <code>chmod [ugoa][+-=][rwxXst]</code> の構文を使用します：',
    commandSymbolicWho: '<strong>対象：</strong> u (所有者)、g (グループ)、o (その他)、a (全員)',
    commandSymbolicOp: '<strong>演算子：</strong> + (追加)、- (削除)、= (正確に設定)',
    commandSymbolicPerm: '<strong>パーミッション：</strong> r (読み取り)、w (書き込み)、x (実行)',
    commandRecursiveTitle: '再帰的chmod', commandRecursiveDesc: '<code>chmod -R</code>で再帰的に変更します：',
    commandToolCta: 'chmod計算機を使って正確なコマンドを生成：',
    h2_patterns: '5. 開発者向け一般的なchmodパターン',
    patternsP1: 'ファイルタイプごとに適切なパーミッション設定が異なります。ここでは必須の<strong>chmodパターン</strong>を紹介します。',
    patternsWebTitle: 'Webサーバーファイル', patternsWebDesc: '標準：<strong>ファイルは644</strong>、<strong>ディレクトリは755</strong>：',
    patternsScriptTitle: 'スクリプトと実行ファイル', patternsScriptDesc: '共有スクリプトは<strong>755</strong>、プライベートは<strong>700</strong>：',
    patternsSshTitle: 'SSH鍵と設定', patternsSshDesc: 'SSHはパーミッションに非常に厳格です：',
    patternsEnvTitle: '環境ファイルとシークレット', patternsEnvDesc: 'APIキーを含むファイルは所有者のみアクセス：',
    patternsUploadTitle: 'アップロードディレクトリ', patternsUploadDesc: 'アップロードディレクトリにはグループ書き込み権限が必要：',
    h2_special: '6. 特殊パーミッション：setuid、setgid、スティッキービット',
    specialP1: '標準の9ビットに加え、Linuxは実行動作を変更する3つの特殊ビットをサポートします。',
    specialSuidTitle: 'setuid (SUID) -- 4000', specialSuidDesc: 'プロセスは<strong>ファイル所有者の権限</strong>で実行されます。例：<code>/usr/bin/passwd</code>。',
    specialSgidTitle: 'setgid (SGID) -- 2000', specialSgidDesc: 'ディレクトリでは、新しいファイルが自動的にディレクトリのグループを継承します。',
    specialStickyTitle: 'スティッキービット -- 1000', specialStickyDesc: 'ファイル所有者またはrootのみが削除可能。例：<code>/tmp</code> (1777)。',
    specialCodeTitle: '特殊パーミッションの設定：',
    h2_best: '7. ファイルパーミッションのベストプラクティス',
    bestP1: 'ファイルパーミッションは重要な防御層です。',
    best1: '<strong>最小権限の原則に従う。</strong>必要最小限のパーミッションのみ付与する。',
    best2: '<strong>本番環境でchmod 777は絶対に使わない。</strong>全ユーザーにフルアクセスを与えてしまう。',
    best3: '<strong>定期的にパーミッションを監査する。</strong><code>find / -perm -777 -type f</code>を使用する。',
    best4: '<strong>world-readableの代わりにグループを使う。</strong>',
    best5: '<strong>再帰的chmodに注意する。</strong>パスを必ず確認する。',
    best6: '<strong>パーミッション要件を文書化する。</strong>',
    best7: '<strong>umaskで安全なデフォルト値を設定する。</strong><code>umask 027</code>を設定する。',
    bestP2: 'chmod計算機ツールで素早く正確なパーミッションを決定できます。',
    h2_faq: '8. よくある質問',
    faq1q: 'chmod 755の意味は？', faq1a: 'chmod 755は所有者にフルアクセス（rwx = 7）、グループとその他に読み取りと実行のアクセス（r-x = 5）を設定します。実行スクリプトとディレクトリの標準パーミッションです。',
    faq2q: 'chmod 755と644の違いは？', faq2a: 'chmod 755 (rwxr-xr-x) は全カテゴリに実行を許可し、ディレクトリとスクリプト向けです。chmod 644 (rw-r--r--) は実行を除去し書き込みを所有者のみに制限、通常ファイル向けです。',
    faq3q: 'Linuxでファイルパーミッションを確認する方法は？', faq3a: 'ls -laコマンドで詳細情報を表示します。statコマンドでさらに詳しい情報を確認できます。',
    faq4q: '最も安全なファイルパーミッションは？', faq4a: '実用的には400（所有者読み取りのみ）または600（所有者読み書きのみ）が最も制限的です。',
    faq5q: 'MacでChmodは使える？', faq5a: 'はい。macOSはBSD Unixベースで、Linuxと同じ構文でchmodを完全サポートしています。',
    linkToolBottom: '無料オンラインchmod計算機で正確な値を計算。',
    relatedHtaccess: 'Apache設定にはhtaccessジェネレーターもご覧ください。',
    relatedPassword: '強力なパスワードが必要ですか？パスワードジェネレーターをお試しください。',
  },
  ko: {
    title: 'Linux 파일 권한 설명: 완전한 chmod 계산기 가이드',
    intro: 'Linux 파일 권한은 시스템 보안의 핵심입니다. Unix 시스템의 모든 파일과 디렉터리에는 누가 읽기, 쓰기, 실행할 수 있는지 결정하는 메타데이터가 있습니다. 웹 애플리케이션 배포, 서버 보안 강화, 배포 스크립트 디버깅 등 <strong>chmod 명령어</strong>와 <strong>파일 권한 숫자</strong>의 이해는 필수입니다. 이 포괄적인 <strong>chmod 계산기 가이드</strong>는 기본 개념부터 특수 비트까지 모든 것을 다룹니다.',
    linkTool: '인터랙티브 chmod 계산기로 권한을 즉시 시각화하세요.',
    h2_what: '1. Linux 파일 권한이란?',
    whatP1: 'Linux의 모든 파일과 디렉터리에는 세 가지 사용자 범주가 있습니다. <strong>소유자</strong>는 일반적으로 파일 생성자입니다. <strong>그룹</strong>은 접근 권한을 공유하는 사용자 집합입니다. <strong>기타</strong>는 시스템의 나머지 모든 사용자를 의미합니다. <code>ls -l</code> 명령어로 권한 문자열을 확인할 수 있습니다.',
    whatP2: '각 범주에는 세 가지 접근 유형을 부여할 수 있습니다. <strong>읽기 (r)</strong>는 파일 내용 보기나 디렉터리 목록 표시를 허용합니다. <strong>쓰기 (w)</strong>는 파일 수정이나 디렉터리 내 항목 생성/삭제를 허용합니다. <strong>실행 (x)</strong>은 프로그램 실행이나 디렉터리 진입을 허용합니다.',
    whatP3: '일반적인 <code>ls -l</code> 출력 예시:',
    whatCode: '-rwxr-xr--  1 alice  developers  4096 Feb 20 deploy.sh\n\n 소유자: rwx (7) | 그룹: r-x (5) | 기타: r-- (4)\n 권한 번호: 754',
    h2_numbers: '2. 권한 숫자 이해하기 (8진법 표기)',
    numbersP1: 'Linux는 각 권한 세트를 0에서 7까지의 8진수로 표현합니다: <strong>읽기 = 4</strong>, <strong>쓰기 = 2</strong>, <strong>실행 = 1</strong>. <strong>755</strong>와 같은 세 자리 숫자는 세 범주 모두를 인코딩합니다.',
    numbersP2: '8진수 참조 테이블:',
    numbersTableOctal: '8진수', numbersTableRwx: '기호', numbersTableMeaning: '의미',
    numbersP3: '완전한 권한 번호를 계산하려면 각 자릿수를 개별적으로 계산합니다. 예: 소유자 읽기+쓰기 (4+2=6), 그룹 읽기 (4), 기타 없음 (0) = <strong>640</strong>.',
    h2_table: '3. chmod 권한 참조 테이블',
    tableP1: '가장 많이 사용되는 <strong>chmod 권한</strong> 조합의 포괄적인 참조 테이블입니다.',
    tableColOctal: '8진수', tableColSymbolic: '기호', tableColMeaning: '의미', tableColUse: '일반적인 용도',
    perm777: '모든 사용자에게 전체 접근', use777: '임시 디버깅만; 프로덕션에서 절대 사용 금지',
    perm755: '소유자 전체; 그룹/기타 읽기+실행', use755: '디렉터리, 실행 스크립트, 웹 서버 문서 루트',
    perm750: '소유자 전체; 그룹 읽기+실행; 기타 없음', use750: '공유 프로젝트 디렉터리',
    perm700: '소유자만 전체 접근', use700: '~/.ssh 디렉터리, 비공개 스크립트',
    perm666: '모든 사용자 읽기+쓰기; 실행 없음', use666: '거의 사용하지 않음; 임시 공유 파일',
    perm644: '소유자 읽기+쓰기; 그룹/기타 읽기', use644: 'HTML, CSS, PHP 파일, 설정 파일',
    perm640: '소유자 읽기+쓰기; 그룹 읽기; 기타 없음', use640: '로그 파일, 민감한 설정',
    perm600: '소유자만 읽기+쓰기', use600: 'SSH 개인키, .env 파일, 데이터베이스 자격 증명',
    perm400: '소유자만 읽기', use400: 'SSL 인증서, 읽기 전용 시크릿',
    perm775: '소유자 전체; 그룹 전체; 기타 읽기+실행', use775: '공유 업로드 디렉터리',
    h2_command: '4. chmod 명령어 사용법',
    commandP1: '<code>chmod</code> 명령어는 파일과 디렉터리 권한을 변경합니다. <strong>숫자(8진수)</strong> 모드와 <strong>기호</strong> 모드 두 가지를 지원합니다.',
    commandNumericTitle: '숫자 모드', commandNumericDesc: '숫자 모드에서는 3자리 또는 4자리 8진수를 지정합니다:',
    commandSymbolicTitle: '기호 모드', commandSymbolicDesc: '기호 모드는 <code>chmod [ugoa][+-=][rwxXst]</code> 구문을 사용합니다:',
    commandSymbolicWho: '<strong>대상:</strong> u (소유자), g (그룹), o (기타), a (모두)',
    commandSymbolicOp: '<strong>연산자:</strong> + (추가), - (제거), = (정확히 설정)',
    commandSymbolicPerm: '<strong>권한:</strong> r (읽기), w (쓰기), x (실행)',
    commandRecursiveTitle: '재귀적 chmod', commandRecursiveDesc: '<code>chmod -R</code>로 재귀적으로 변경합니다:',
    commandToolCta: 'chmod 계산기로 정확한 명령어를 생성하세요:',
    h2_patterns: '5. 개발자를 위한 일반적인 chmod 패턴',
    patternsP1: '파일 유형마다 특정 권한 설정이 필요합니다. 필수 <strong>chmod 패턴</strong> 참조입니다.',
    patternsWebTitle: '웹 서버 파일', patternsWebDesc: '표준: <strong>파일은 644</strong>, <strong>디렉터리는 755</strong>:',
    patternsScriptTitle: '스크립트와 실행 파일', patternsScriptDesc: '공유 스크립트는 <strong>755</strong>, 비공개는 <strong>700</strong>:',
    patternsSshTitle: 'SSH 키와 설정', patternsSshDesc: 'SSH는 권한에 매우 엄격합니다:',
    patternsEnvTitle: '환경 및 시크릿 파일', patternsEnvDesc: 'API 키가 포함된 파일은 소유자만 접근 가능해야 합니다:',
    patternsUploadTitle: '업로드 디렉터리', patternsUploadDesc: '업로드 디렉터리에는 그룹 쓰기 권한이 필요합니다:',
    h2_special: '6. 특수 권한: setuid, setgid, 스티키 비트',
    specialP1: '표준 9비트 외에 Linux는 실행 동작을 수정하는 3개의 특수 비트를 지원합니다.',
    specialSuidTitle: 'setuid (SUID) -- 4000', specialSuidDesc: '프로세스가 <strong>파일 소유자의 권한</strong>으로 실행됩니다. 예: <code>/usr/bin/passwd</code>.',
    specialSgidTitle: 'setgid (SGID) -- 2000', specialSgidDesc: '디렉터리에서 새 파일이 자동으로 디렉터리의 그룹을 상속합니다.',
    specialStickyTitle: '스티키 비트 -- 1000', specialStickyDesc: '파일 소유자 또는 root만 삭제 가능. 예: <code>/tmp</code> (1777).',
    specialCodeTitle: '특수 권한 설정:',
    h2_best: '7. 파일 권한 모범 사례',
    bestP1: '파일 권한은 중요한 방어 계층입니다.',
    best1: '<strong>최소 권한 원칙을 따르세요.</strong> 필요한 최소한의 권한만 부여하세요.',
    best2: '<strong>프로덕션에서 chmod 777은 절대 사용하지 마세요.</strong> 모든 사용자에게 전체 접근을 부여합니다.',
    best3: '<strong>정기적으로 권한을 감사하세요.</strong> <code>find / -perm -777 -type f</code>를 사용하세요.',
    best4: '<strong>world-readable 대신 그룹을 사용하세요.</strong>',
    best5: '<strong>재귀적 chmod에 주의하세요.</strong> 항상 경로를 확인하세요.',
    best6: '<strong>권한 요구사항을 문서화하세요.</strong>',
    best7: '<strong>umask로 안전한 기본값을 설정하세요.</strong> <code>umask 027</code>을 설정하세요.',
    bestP2: 'chmod 계산기 도구로 빠르고 정확한 권한을 결정하세요.',
    h2_faq: '8. 자주 묻는 질문',
    faq1q: 'chmod 755의 의미는?', faq1a: 'chmod 755는 소유자에게 전체 접근(rwx = 7), 그룹과 기타에게 읽기와 실행 접근(r-x = 5)을 설정합니다. 실행 스크립트와 디렉터리의 표준 권한입니다.',
    faq2q: 'chmod 755와 644의 차이는?', faq2a: 'chmod 755 (rwxr-xr-x)는 모든 범주에 실행을 허용하며 디렉터리와 스크립트용입니다. chmod 644 (rw-r--r--)는 실행을 제거하고 쓰기를 소유자로 제한하며 일반 파일용입니다.',
    faq3q: 'Linux에서 파일 권한을 확인하는 방법은?', faq3a: 'ls -la 명령어로 자세한 정보를 확인합니다. stat 명령어로 더 상세한 정보를 볼 수 있습니다.',
    faq4q: '가장 안전한 파일 권한은?', faq4a: '실용적으로 400(소유자 읽기만) 또는 600(소유자 읽기+쓰기만)이 가장 제한적인 유용한 권한입니다.',
    faq5q: 'Mac에서 chmod를 사용할 수 있나요?', faq5a: '네. macOS는 BSD Unix 기반이며 Linux와 동일한 구문으로 chmod를 완전히 지원합니다.',
    linkToolBottom: '무료 온라인 chmod 계산기로 정확한 값을 계산하세요.',
    relatedHtaccess: 'Apache 설정을 위한 htaccess 생성기도 확인하세요.',
    relatedPassword: '강력한 비밀번호가 필요하세요? 비밀번호 생성기를 사용해보세요.',
  },
};

export default function ChmodCalculatorLinuxPermissionsGuide({ lang }: { lang: string }) {
  const l = t[lang] || t.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: l.faq1q, acceptedAnswer: { '@type': 'Answer', text: l.faq1a } },
      { '@type': 'Question', name: l.faq2q, acceptedAnswer: { '@type': 'Answer', text: l.faq2a } },
      { '@type': 'Question', name: l.faq3q, acceptedAnswer: { '@type': 'Answer', text: l.faq3a } },
      { '@type': 'Question', name: l.faq4q, acceptedAnswer: { '@type': 'Answer', text: l.faq4a } },
      { '@type': 'Question', name: l.faq5q, acceptedAnswer: { '@type': 'Answer', text: l.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 13 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px' };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 12 };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const ctaBoxStyle: React.CSSProperties = { padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginBottom: 30 };

  const octalData = [
    ['0', '---', 'No permission'],
    ['1', '--x', 'Execute only'],
    ['2', '-w-', 'Write only'],
    ['3', '-wx', 'Write + Execute'],
    ['4', 'r--', 'Read only'],
    ['5', 'r-x', 'Read + Execute'],
    ['6', 'rw-', 'Read + Write'],
    ['7', 'rwx', 'Read + Write + Execute'],
  ];

  const permData = [
    ['777', 'rwxrwxrwx', l.perm777, l.use777, '#ef4444'],
    ['755', 'rwxr-xr-x', l.perm755, l.use755, '#3b82f6'],
    ['750', 'rwxr-x---', l.perm750, l.use750, '#6366f1'],
    ['700', 'rwx------', l.perm700, l.use700, '#8b5cf6'],
    ['666', 'rw-rw-rw-', l.perm666, l.use666, '#f97316'],
    ['644', 'rw-r--r--', l.perm644, l.use644, '#22c55e'],
    ['640', 'rw-r-----', l.perm640, l.use640, '#14b8a6'],
    ['600', 'rw-------', l.perm600, l.use600, '#f59e0b'],
    ['400', 'r--------', l.perm400, l.use400, '#a855f7'],
    ['775', 'rwxrwxr-x', l.perm775, l.use775, '#06b6d4'],
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article style={{ maxWidth: 768, margin: '0 auto' }}>

        {/* Intro */}
        <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 20 }} dangerouslySetInnerHTML={{ __html: l.intro }} />

        <div style={ctaBoxStyle}>
          <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{l.linkTool}</p>
          <Link href={`/${lang}/tools/chmod-calculator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Chmod Calculator &rarr;
          </Link>
        </div>

        {/* Section 1: What Are Linux File Permissions */}
        <h2 style={h2Style}>{l.h2_what}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.whatP1 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.whatP2 }} />
        <p style={pStyle}>{l.whatP3}</p>
        <pre style={codeStyle}><code>{l.whatCode}</code></pre>

        {/* Section 2: Understanding Permission Numbers */}
        <h2 style={h2Style}>{l.h2_numbers}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.numbersP1 }} />
        <p style={pStyle}>{l.numbersP2}</p>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{l.numbersTableOctal}</th>
                <th style={thStyle}>{l.numbersTableRwx}</th>
                <th style={thStyle}>{l.numbersTableMeaning}</th>
              </tr>
            </thead>
            <tbody>
              {octalData.map(([octal, rwx, meaning]) => (
                <tr key={octal}>
                  <td style={tdStyle}><code style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{octal}</code></td>
                  <td style={tdStyle}><code>{rwx}</code></td>
                  <td style={tdStyle}>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.numbersP3 }} />

        {/* Section 3: chmod Permission Reference Table */}
        <h2 style={h2Style}>{l.h2_table}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.tableP1 }} />

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{l.tableColOctal}</th>
                <th style={thStyle}>{l.tableColSymbolic}</th>
                <th style={thStyle}>{l.tableColMeaning}</th>
                <th style={thStyle}>{l.tableColUse}</th>
              </tr>
            </thead>
            <tbody>
              {permData.map(([octal, symbolic, meaning, use, color]) => (
                <tr key={octal}>
                  <td style={tdStyle}><code style={{ color: color, fontWeight: 800 }}>{octal}</code></td>
                  <td style={tdStyle}><code>{symbolic}</code></td>
                  <td style={tdStyle}>{meaning}</td>
                  <td style={{ ...tdStyle, fontSize: 12 }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 4: How to Use chmod Command */}
        <h2 style={h2Style}>{l.h2_command}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.commandP1 }} />

        <h3 style={h3Style}>{l.commandNumericTitle}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.commandNumericDesc }} />
        <pre style={codeStyle}><code>{`chmod 755 script.sh          # rwxr-xr-x
chmod 644 config.json        # rw-r--r--
chmod 600 id_rsa             # rw-------
chmod 400 cert.pem           # r--------
chmod -R 755 /var/www/html   # Recursive on directory`}</code></pre>

        <h3 style={h3Style}>{l.commandSymbolicTitle}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.commandSymbolicDesc }} />
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
          <li dangerouslySetInnerHTML={{ __html: l.commandSymbolicWho }} />
          <li dangerouslySetInnerHTML={{ __html: l.commandSymbolicOp }} />
          <li dangerouslySetInnerHTML={{ __html: l.commandSymbolicPerm }} />
        </ul>
        <pre style={codeStyle}><code>{`chmod u+x script.sh          # Add execute for owner
chmod g-w file.txt           # Remove write from group
chmod o+r document.pdf       # Add read for others
chmod a+x run.sh             # Add execute for all
chmod u=rwx,go=rx dir/       # Owner=rwx, group+others=rx (755)
chmod go-rwx secret.key      # Remove all from group+others`}</code></pre>

        <h3 style={h3Style}>{l.commandRecursiveTitle}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.commandRecursiveDesc }} />
        <pre style={codeStyle}><code>{`# Set directories to 755 and files to 644 (web server standard)
find /var/www/html -type d -exec chmod 755 {} \\;
find /var/www/html -type f -exec chmod 644 {} \\;

# Make all .sh files executable
find /opt/scripts -name "*.sh" -exec chmod 755 {} \\;`}</code></pre>

        <p style={pStyle}>{l.commandToolCta}</p>
        <div style={{ marginBottom: 24 }}>
          <Link href={`/${lang}/tools/chmod-calculator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Chmod Calculator &rarr;
          </Link>
        </div>

        {/* Section 5: Common chmod Patterns for Developers */}
        <h2 style={h2Style}>{l.h2_patterns}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.patternsP1 }} />

        <h3 style={h3Style}>{l.patternsWebTitle}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.patternsWebDesc }} />
        <pre style={codeStyle}><code>{`# Web server document root
chmod 755 /var/www/html
chmod 644 /var/www/html/index.html
chmod 644 /var/www/html/style.css
chmod 644 /var/www/html/.htaccess

# PHP / application files
chmod 644 /var/www/html/app/*.php
chmod 755 /var/www/html/app/storage`}</code></pre>

        <h3 style={h3Style}>{l.patternsScriptTitle}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.patternsScriptDesc }} />
        <pre style={codeStyle}><code>{`# Shared executable scripts
chmod 755 deploy.sh
chmod 755 /usr/local/bin/my-tool

# Private scripts (owner only)
chmod 700 backup-db.sh
chmod 700 cleanup.sh`}</code></pre>

        <h3 style={h3Style}>{l.patternsSshTitle}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.patternsSshDesc }} />
        <pre style={codeStyle}><code>{`chmod 700 ~/.ssh                 # SSH directory
chmod 600 ~/.ssh/id_rsa          # Private key
chmod 600 ~/.ssh/id_ed25519      # Private key (Ed25519)
chmod 644 ~/.ssh/id_rsa.pub      # Public key
chmod 600 ~/.ssh/authorized_keys # Authorized keys
chmod 600 ~/.ssh/config          # SSH config file`}</code></pre>

        <h3 style={h3Style}>{l.patternsEnvTitle}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.patternsEnvDesc }} />
        <pre style={codeStyle}><code>{`chmod 600 .env                   # Environment variables
chmod 600 .env.production        # Production secrets
chmod 600 database.yml           # Database credentials
chmod 600 credentials.json       # API credentials
chmod 400 ssl-cert.pem           # SSL certificate (read-only)`}</code></pre>

        <h3 style={h3Style}>{l.patternsUploadTitle}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.patternsUploadDesc }} />
        <pre style={codeStyle}><code>{`chmod 775 /var/www/html/uploads
chmod 775 /var/www/html/tmp
chmod 775 /var/www/html/cache

# Ensure web server group owns the directory
# chown www-data:www-data /var/www/html/uploads`}</code></pre>

        {/* Section 6: Special Permissions */}
        <h2 style={h2Style}>{l.h2_special}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.specialP1 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <strong style={{ color: '#f59e0b', fontSize: 15 }}>{l.specialSuidTitle}</strong>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: l.specialSuidDesc }} />
          </div>
          <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <strong style={{ color: '#3b82f6', fontSize: 15 }}>{l.specialSgidTitle}</strong>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: l.specialSgidDesc }} />
          </div>
          <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <strong style={{ color: '#22c55e', fontSize: 15 }}>{l.specialStickyTitle}</strong>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: l.specialStickyDesc }} />
          </div>
        </div>

        <h3 style={h3Style}>{l.specialCodeTitle}</h3>
        <pre style={codeStyle}><code>{`# SUID: run as file owner
chmod 4755 /usr/bin/passwd
chmod u+s /usr/bin/my-tool

# SGID: inherit group on directory
chmod 2755 /shared/project
chmod g+s /shared/project

# Sticky Bit: prevent deletion by others
chmod 1777 /tmp
chmod +t /shared/uploads

# Combine: SGID + standard permissions
chmod 2775 /team/shared-dir

# Find files with special permissions
find / -perm -4000 -type f 2>/dev/null  # Find SUID files
find / -perm -2000 -type f 2>/dev/null  # Find SGID files
find / -perm -1000 -type d 2>/dev/null  # Find sticky dirs`}</code></pre>

        {/* Section 7: Best Practices */}
        <h2 style={h2Style}>{l.h2_best}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.bestP1 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[l.best1, l.best2, l.best3, l.best4, l.best5, l.best6, l.best7].map((tip, i) => (
            <div key={i} style={{ padding: 14, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '3px solid var(--accent-blue)' }}>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }} dangerouslySetInnerHTML={{ __html: tip }} />
            </div>
          ))}
        </div>

        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.bestP2 }} />

        {/* Section 8: FAQ */}
        <h2 style={h2Style}>{l.h2_faq}</h2>
        {[
          [l.faq1q, l.faq1a],
          [l.faq2q, l.faq2a],
          [l.faq3q, l.faq3a],
          [l.faq4q, l.faq4a],
          [l.faq5q, l.faq5a],
        ].map(([q, a], i) => (
          <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
          </div>
        ))}

        {/* Bottom CTA */}
        <div style={ctaBoxStyle}>
          <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{l.linkToolBottom}</p>
          <Link href={`/${lang}/tools/chmod-calculator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Chmod Calculator &rarr;
          </Link>
        </div>

        {/* Related tools */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          <Link href={`/${lang}/tools/htaccess-generator`} style={{ color: 'var(--accent-blue)', fontSize: 14 }}>
            {l.relatedHtaccess}
          </Link>
          <Link href={`/${lang}/tools/password-generator`} style={{ color: 'var(--accent-blue)', fontSize: 14 }}>
            {l.relatedPassword}
          </Link>
        </div>

      </article>
    </>
  );
}
