'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string | string[]>> = {
  en: {
    title: 'SSH Keygen: Ed25519 vs RSA Key Generation Guide',
    intro: 'SSH keys are the gold standard for secure server authentication, replacing passwords with cryptographic key pairs. Whether you are setting up a new development machine, configuring CI/CD pipelines, or hardening production servers, understanding how to generate and manage SSH keys is a fundamental skill. This comprehensive guide covers everything from key algorithm selection (Ed25519 vs RSA vs ECDSA) to advanced SSH configuration, agent management, and troubleshooting common issues.',

    // Section 1: What are SSH Keys
    whatTitle: 'What Are SSH Keys?',
    whatDesc: 'SSH (Secure Shell) keys are cryptographic key pairs used for authentication. Instead of typing a password every time you connect to a remote server, SSH keys let you prove your identity using public-key cryptography. This is both more secure and more convenient than password-based authentication.',
    whatFlow: 'An SSH key pair consists of two files:',
    whatPrivate: 'Private key: Stays on your local machine. Never share this file with anyone. It is analogous to a physical key that unlocks a door.',
    whatPublic: 'Public key: Placed on every server you want to access. It is analogous to a lock — anyone can see it, but only the matching private key can open it.',
    whatAuthTitle: 'How SSH Key Authentication Works',
    whatAuth1: '1. You attempt to connect to a server: ssh user@server.example.com',
    whatAuth2: '2. The server sends a random challenge encrypted with your public key.',
    whatAuth3: '3. Your SSH client uses your private key to decrypt the challenge and sends the response.',
    whatAuth4: '4. The server verifies the response. If correct, you are authenticated without ever sending a password.',
    whatAuthNote: 'This means even if an attacker intercepts the network traffic, they cannot authenticate as you without possessing your private key. Passwords, on the other hand, can be captured by keyloggers, phishing, or brute-force attacks.',

    // Section 2: Ed25519 vs RSA vs ECDSA
    compTitle: 'Ed25519 vs RSA vs ECDSA: Algorithm Comparison',
    compDesc: 'There are several algorithms available for SSH key generation. The three most common are RSA, ECDSA, and Ed25519. Each has different security properties, performance characteristics, and compatibility considerations.',
    compFeature: 'Feature',
    compEd25519: 'Ed25519',
    compRSA: 'RSA',
    compECDSA: 'ECDSA',
    compYear: 'Introduced',
    compYearEd25519: '2014 (OpenSSH 6.5)',
    compYearRSA: '1995 (SSH-1)',
    compYearECDSA: '2011 (OpenSSH 5.7)',
    compSecurity: 'Security Level',
    compSecurityEd25519: '~128-bit (equivalent to RSA-3072)',
    compSecurityRSA: '112-bit (2048) / 128-bit (3072) / 192-bit (4096)',
    compSecurityECDSA: '128-bit (P-256) / 192-bit (P-384)',
    compKeySize: 'Private Key Size',
    compKeySizeEd25519: '64 bytes (fixed)',
    compKeySizeRSA: '~3,200 bytes (4096-bit)',
    compKeySizeECDSA: '~256 bytes (P-256)',
    compPubKeySize: 'Public Key Size',
    compPubKeySizeEd25519: '32 bytes (fixed)',
    compPubKeySizeRSA: '~512 bytes (4096-bit)',
    compPubKeySizeECDSA: '~64 bytes (P-256)',
    compSignSpeed: 'Sign Speed',
    compSignSpeedEd25519: 'Very fast',
    compSignSpeedRSA: 'Slow',
    compSignSpeedECDSA: 'Fast',
    compVerifySpeed: 'Verify Speed',
    compVerifySpeedEd25519: 'Very fast',
    compVerifySpeedRSA: 'Fast',
    compVerifySpeedECDSA: 'Moderate',
    compCompat: 'Compatibility',
    compCompatEd25519: 'OpenSSH 6.5+ (2014), most modern systems',
    compCompatRSA: 'Universal (all SSH implementations)',
    compCompatECDSA: 'OpenSSH 5.7+, but NIST curve concerns',
    compRecommend: 'Recommendation',
    compRecommendEd25519: 'Best choice for new keys',
    compRecommendRSA: 'Use 4096-bit if Ed25519 not supported',
    compRecommendECDSA: 'Generally avoid — prefer Ed25519',
    compSummary: 'Ed25519 is the recommended algorithm for new SSH keys. It provides excellent security with small key sizes, fast operations, and resistance to several classes of implementation attacks. RSA-4096 remains a solid fallback for systems that do not support Ed25519. ECDSA is generally not recommended due to concerns about the NIST P-256 curve and sensitivity to poor random number generation.',

    // Section 3: Generate Ed25519 Key
    genEd25519Title: 'Generate an Ed25519 SSH Key',
    genEd25519Desc: 'Ed25519 keys are the modern standard. They are fast, secure, and produce compact key files. Here is how to generate one step by step:',
    genEd25519Step1: 'Step 1: Open your terminal (Linux/macOS) or Git Bash / PowerShell (Windows).',
    genEd25519Step2: 'Step 2: Run the ssh-keygen command with the Ed25519 algorithm:',
    genEd25519Step3: 'Step 3: When prompted for a file location, press Enter to accept the default (~/.ssh/id_ed25519), or specify a custom path:',
    genEd25519Step4: 'Step 4: Enter a strong passphrase when prompted (recommended), or press Enter for no passphrase:',
    genEd25519Step5: 'Step 5: Verify the key was created:',
    genEd25519Output: 'The command generates two files: id_ed25519 (private key) and id_ed25519.pub (public key). The -C flag adds a comment (typically your email) to help identify the key.',
    genEd25519Flags: 'Useful ssh-keygen flags for Ed25519:',
    genEd25519FlagT: '-t ed25519: Specifies the Ed25519 algorithm.',
    genEd25519FlagC: '-C "comment": Adds an identifying comment (usually your email).',
    genEd25519FlagF: '-f /path/to/key: Specifies the output file path.',
    genEd25519FlagN: '-N "passphrase": Sets the passphrase non-interactively (useful in scripts).',
    genEd25519FlagA: '-a 100: Number of KDF rounds for passphrase protection (higher = slower brute force). Default is 16.',

    // Section 4: Generate RSA Key
    genRSATitle: 'Generate an RSA SSH Key (4096-bit)',
    genRSADesc: 'If you need compatibility with older systems that do not support Ed25519, use RSA with a minimum key size of 4096 bits. RSA-2048 is still considered secure but offers a smaller security margin for the future.',
    genRSAStep1: 'Step 1: Run the ssh-keygen command with RSA and 4096 bits:',
    genRSAStep2: 'Step 2: Follow the same prompts as above (file location and passphrase).',
    genRSAStep3: 'Step 3: Verify the key:',
    genRSANote: 'Important: Never use RSA keys shorter than 2048 bits. RSA-1024 has been considered insecure since 2013. For maximum security margin, always use 4096 bits.',
    genRSAFlags: 'Useful ssh-keygen flags for RSA:',
    genRSAFlagB: '-b 4096: Specifies 4096-bit key length (default is 3072 in modern OpenSSH).',
    genRSAFlagO: '-o: Uses the new OpenSSH private key format (more resistant to brute-force). This is the default since OpenSSH 7.8.',

    // Section 5: Key File Locations
    locTitle: 'SSH Key File Locations',
    locDesc: 'SSH keys and configuration files are stored in the ~/.ssh/ directory. Understanding this directory structure is essential for managing your SSH setup.',
    locFile: 'File',
    locPurpose: 'Purpose',
    locPermission: 'Permissions',
    locIdEd25519: 'id_ed25519',
    locIdEd25519Desc: 'Ed25519 private key',
    locIdEd25519Perm: '600 (-rw-------)',
    locIdEd25519Pub: 'id_ed25519.pub',
    locIdEd25519PubDesc: 'Ed25519 public key',
    locIdEd25519PubPerm: '644 (-rw-r--r--)',
    locIdRsa: 'id_rsa',
    locIdRsaDesc: 'RSA private key',
    locIdRsaPerm: '600 (-rw-------)',
    locIdRsaPub: 'id_rsa.pub',
    locIdRsaPubDesc: 'RSA public key',
    locIdRsaPubPerm: '644 (-rw-r--r--)',
    locKnownHosts: 'known_hosts',
    locKnownHostsDesc: 'List of server fingerprints you have connected to (prevents MITM attacks)',
    locKnownHostsPerm: '644 (-rw-r--r--)',
    locAuthorizedKeys: 'authorized_keys',
    locAuthorizedKeysDesc: 'Public keys allowed to log in to this server (on the server side)',
    locAuthorizedKeysPerm: '600 (-rw-------)',
    locConfig: 'config',
    locConfigDesc: 'SSH client configuration file',
    locConfigPerm: '600 (-rw-------)',
    locSshDir: '~/.ssh/ directory',
    locSshDirPerm: '700 (drwx------)',
    locSshDirDesc: 'The parent directory must also have correct permissions',
    locWindowsNote: 'On Windows, the SSH directory is typically located at C:\\Users\\YourUsername\\.ssh\\. If you are using Git Bash, it maps to ~/.ssh/ as on Linux/macOS.',

    // Section 6: SSH Config File
    configTitle: 'SSH Config File (~/.ssh/config)',
    configDesc: 'The SSH config file is a powerful tool that lets you define connection presets, manage multiple keys, and configure advanced options. Instead of typing long SSH commands, you can create named aliases.',
    configBasic: 'Basic Configuration Example',
    configBasicDesc: 'Create or edit ~/.ssh/config:',
    configMultiKey: 'Using Multiple Keys for Different Services',
    configMultiKeyDesc: 'If you use different keys for GitHub, GitLab, and your production servers:',
    configProxy: 'ProxyJump: Connecting Through a Bastion Host',
    configProxyDesc: 'If you need to SSH through a jump server (bastion host) to reach an internal server:',
    configProxyUsage: 'Now you can connect directly with: ssh internal-server. SSH will automatically jump through the bastion host first.',
    configWildcard: 'Wildcard and Default Settings',
    configWildcardDesc: 'Apply default settings to all connections:',
    configOptions: 'Useful SSH Config Options',
    configOptIdentity: 'IdentityFile: Path to the private key to use.',
    configOptIdentitiesOnly: 'IdentitiesOnly yes: Only use the specified key, do not try others from the agent.',
    configOptForward: 'ForwardAgent yes: Forward your local SSH agent to the remote server (use cautiously).',
    configOptKeepAlive: 'ServerAliveInterval 60: Send a keep-alive packet every 60 seconds to prevent disconnection.',
    configOptProxy: 'ProxyJump bastion: Route the connection through another SSH host.',
    configOptPort: 'Port 2222: Connect to a non-standard SSH port.',

    // Section 7: Add Key to GitHub/GitLab
    gitTitle: 'Add SSH Key to GitHub / GitLab',
    gitDesc: 'Using SSH keys with GitHub and GitLab is the recommended way to authenticate for Git operations. Here is how to set it up:',
    gitStep1Title: 'Step 1: Copy Your Public Key',
    gitStep1Desc: 'Display and copy your public key:',
    gitStep2Title: 'Step 2: Add the Key to GitHub',
    gitStep2Desc1: '1. Go to GitHub.com > Settings > SSH and GPG keys > New SSH key.',
    gitStep2Desc2: '2. Give the key a descriptive title (e.g., "Work Laptop 2024").',
    gitStep2Desc3: '3. Paste your public key into the "Key" field.',
    gitStep2Desc4: '4. Click "Add SSH key".',
    gitStep3Title: 'Step 3: Add the Key to GitLab',
    gitStep3Desc1: '1. Go to GitLab.com > Preferences > SSH Keys.',
    gitStep3Desc2: '2. Paste your public key, set a title and optional expiry date.',
    gitStep3Desc3: '3. Click "Add key".',
    gitStep4Title: 'Step 4: Test the Connection',
    gitStep4Desc: 'Verify that your SSH key is working:',
    gitStep4Success: 'If successful, you will see a message like:',
    gitStep4GitLab: 'For GitLab:',
    gitCloneTitle: 'Step 5: Clone Repositories Using SSH',
    gitCloneDesc: 'Now you can clone repositories using the SSH URL instead of HTTPS:',
    gitSwitchDesc: 'To switch an existing repository from HTTPS to SSH:',

    // Section 8: SSH Agent
    agentTitle: 'SSH Agent: Managing Keys in Memory',
    agentDesc: 'The SSH agent is a background process that holds your private keys in memory so you do not have to enter your passphrase every time you use an SSH key. It is especially useful if your keys are protected with a passphrase (which they should be).',
    agentStartTitle: 'Start the SSH Agent',
    agentStartLinux: 'On Linux/macOS:',
    agentStartWindows: 'On Windows (PowerShell):',
    agentAddTitle: 'Add Keys to the Agent',
    agentAddDesc: 'Add your private key to the agent:',
    agentAddAll: 'Add all default keys:',
    agentListTitle: 'List Keys in the Agent',
    agentListDesc: 'View all keys currently loaded in the agent:',
    agentMacTitle: 'macOS Keychain Integration',
    agentMacDesc: 'On macOS, you can store your SSH key passphrase in the system Keychain so it persists across reboots:',
    agentMacConfig: 'Add this to your ~/.ssh/config to automatically load keys from the Keychain:',
    agentLifetime: 'Set Key Lifetime',
    agentLifetimeDesc: 'For security, you can set a timeout so keys are automatically removed after a period of inactivity:',
    agentForwardTitle: 'Agent Forwarding',
    agentForwardDesc: 'Agent forwarding lets you use your local SSH keys on a remote server without copying the keys there. Use it when you need to SSH from one server to another (e.g., pulling from GitHub on a deployment server):',
    agentForwardWarning: 'Warning: Agent forwarding exposes your keys to anyone with root access on the remote server. Only use it with servers you trust. Consider ProxyJump as a safer alternative.',

    // Section 9: Key Passphrase
    passTitle: 'SSH Key Passphrase',
    passDesc: 'A passphrase adds a layer of encryption to your private key file. Even if someone steals your private key file, they cannot use it without the passphrase.',
    passWhyTitle: 'Why Use a Passphrase?',
    passWhy1: 'Laptop theft: If your laptop is stolen, the passphrase prevents immediate access to your servers.',
    passWhy2: 'Malware: If malware reads your ~/.ssh/ directory, encrypted keys are useless without the passphrase.',
    passWhy3: 'Shared machines: If others have access to your user account, the passphrase is your last line of defense.',
    passWhy4: 'Compliance: Many security standards (SOC 2, ISO 27001) require encrypted private keys.',
    passCreateTitle: 'Creating a Key with a Strong Passphrase',
    passCreateDesc: 'When generating a new key, ssh-keygen will prompt for a passphrase. Use a strong, unique passphrase:',
    passChangeTitle: 'Change an Existing Key Passphrase',
    passChangeDesc: 'You can change (or add) a passphrase to an existing key without regenerating it:',
    passRemoveTitle: 'Remove a Passphrase (Not Recommended)',
    passRemoveDesc: 'If you need an unencrypted key (e.g., for automated scripts), you can remove the passphrase:',
    passRemoveWarning: 'Warning: Keys without a passphrase are a significant security risk. For automated systems, consider using ssh-agent, deploy keys with limited permissions, or a secrets manager instead.',
    passKdfTitle: 'Increase KDF Rounds',
    passKdfDesc: 'The -a flag controls how many rounds of key derivation are applied to the passphrase. Higher values make brute-force attacks slower:',

    // Section 10: Security Best Practices
    secTitle: 'SSH Key Security Best Practices',
    secPermTitle: 'File Permissions',
    secPermDesc: 'Incorrect permissions are one of the most common SSH issues. SSH will refuse to use keys or config files with overly permissive permissions:',
    secPermCommands: 'Set correct permissions:',
    secRotateTitle: 'Rotate Keys Regularly',
    secRotateDesc: 'Key rotation limits the blast radius if a key is compromised. Best practices:',
    secRotate1: 'Generate new keys at least once a year (or per your organization\'s policy).',
    secRotate2: 'Add the new public key to all servers before removing the old one.',
    secRotate3: 'Remove the old public key from authorized_keys after confirming the new key works.',
    secRotate4: 'Revoke old keys from GitHub/GitLab/Bitbucket.',
    secRotate5: 'Keep a record of when each key was generated and where it is deployed.',
    secDisableTitle: 'Disable Password Authentication on Servers',
    secDisableDesc: 'Once SSH key authentication is configured, disable password authentication to prevent brute-force attacks:',
    secDisableStep1: 'Edit /etc/ssh/sshd_config:',
    secDisableStep2: 'Restart the SSH service:',
    secDisableWarning: 'Warning: Before disabling password authentication, make sure your SSH key login works. Otherwise, you may lock yourself out of the server.',
    secMoreTitle: 'Additional Security Measures',
    secMore1: 'Use a non-standard SSH port (e.g., Port 2222) to reduce automated scanning noise.',
    secMore2: 'Install fail2ban to block IP addresses with too many failed login attempts.',
    secMore3: 'Disable root login: set PermitRootLogin no in sshd_config.',
    secMore4: 'Use AllowUsers or AllowGroups to restrict which users can SSH in.',
    secMore5: 'Enable two-factor authentication (2FA) for an additional layer of security.',
    secMore6: 'Monitor /var/log/auth.log (Debian/Ubuntu) or /var/log/secure (RHEL/CentOS) for suspicious activity.',

    // Section 11: Troubleshooting
    troubleTitle: 'Troubleshooting Common SSH Key Issues',
    troublePermDeniedTitle: 'Permission Denied (publickey)',
    troublePermDeniedDesc: 'This is the most common SSH error. It means the server rejected your key. Common causes and fixes:',
    troublePermDenied1: 'Wrong key being offered: Use ssh -i ~/.ssh/id_ed25519 user@server to specify the correct key.',
    troublePermDenied2: 'Public key not in authorized_keys: Add your public key to ~/.ssh/authorized_keys on the server.',
    troublePermDenied3: 'Wrong permissions on server: The server-side ~/.ssh/ directory and authorized_keys must have correct permissions.',
    troublePermDenied4: 'SSH agent not running: Start the agent and add your key.',
    troubleTooOpenTitle: '"Permissions are too open" Error',
    troubleTooOpenDesc: 'If you see "WARNING: UNPROTECTED PRIVATE KEY FILE!" or "Permissions 0644 for \'id_ed25519\' are too open", SSH is refusing to use the key because others can read it:',
    troubleTooOpenFix: 'Fix the permissions:',
    troubleTooOpenWindows: 'On Windows, right-click the file > Properties > Security > Advanced, and remove all permissions except for your user account.',
    troubleDebugTitle: 'Debug SSH Connections',
    troubleDebugDesc: 'Use the -v, -vv, or -vvv flags for increasing levels of debug output:',
    troubleDebugLook: 'Look for these key lines in the debug output:',
    troubleDebugLook1: '"Offering public key": Shows which keys SSH is trying.',
    troubleDebugLook2: '"Server accepts key": Confirms the key was accepted.',
    troubleDebugLook3: '"Authentication succeeded": Login was successful.',
    troubleDebugLook4: '"No more authentication methods to try": All offered keys were rejected.',
    troubleHostKeyTitle: 'Host Key Verification Failed',
    troubleHostKeyDesc: 'If the server\'s host key has changed (e.g., server rebuild), you will see a warning. Remove the old host key:',
    troubleHostKeyWarning: 'Warning: Only do this if you expect the host key to have changed (e.g., server rebuild). An unexpected change could indicate a man-in-the-middle attack.',
    troubleTimeoutTitle: 'Connection Timed Out',
    troubleTimeout1: 'Verify the server is running and accepting connections on the correct port.',
    troubleTimeout2: 'Check firewalls (ufw, iptables, or cloud security groups).',
    troubleTimeout3: 'Try connecting with a specific port: ssh -p 2222 user@server.',
    troubleTimeout4: 'Add ServerAliveInterval to your SSH config to prevent idle disconnections.',

    // Section 12: FAQ
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Should I use Ed25519 or RSA for SSH keys?',
    faq1a: 'Use Ed25519 for all new SSH keys. Ed25519 provides equivalent or better security than RSA-4096 with significantly smaller key sizes (32 bytes vs ~512 bytes for the public key), faster signing and verification, and resistance to certain implementation attacks. Only use RSA-4096 if you need compatibility with very old systems (pre-2014) that do not support Ed25519.',
    faq2q: 'Is it safe to use SSH keys without a passphrase?',
    faq2a: 'SSH keys without a passphrase are a significant security risk. If your private key file is ever compromised (laptop theft, malware, backup exposure), the attacker gets immediate access to all servers that trust that key. Always use a strong passphrase and rely on ssh-agent to avoid typing it repeatedly. For automated systems, use deploy keys with minimal permissions or a secrets manager.',
    faq3q: 'How do I use multiple SSH keys for different GitHub accounts?',
    faq3a: 'Create a separate key for each account and configure ~/.ssh/config with different Host aliases. For example, set Host github-personal with HostName github.com and IdentityFile ~/.ssh/id_ed25519_personal, and Host github-work with IdentityFile ~/.ssh/id_ed25519_work. Then clone using the alias: git clone git@github-personal:user/repo.git.',
    faq4q: 'What do I do if my SSH private key is compromised?',
    faq4a: 'Immediately remove the compromised public key from all servers (authorized_keys), GitHub, GitLab, and any other services. Generate a new key pair and deploy the new public key. Audit logs for any unauthorized access during the period the key may have been compromised. If the key was used for production servers, consider a full security audit.',
    faq5q: 'Can I convert an RSA key to Ed25519?',
    faq5a: 'No, you cannot convert between key algorithms. You must generate a new Ed25519 key pair with ssh-keygen -t ed25519 and then add the new public key to your servers and services (GitHub, GitLab, etc.). You can keep the old RSA key as a backup while transitioning, then remove it once the new Ed25519 key is deployed everywhere.',

    // Related tools
    relatedTitle: 'Related Tools',
    relatedHash: 'Hash Generator - Generate SHA-256, MD5, and other hashes for verifying file integrity and key fingerprints.',
    relatedPassword: 'Password Generator - Create strong, random passphrases for your SSH keys.',
  },
  zh: {
    title: 'SSH Keygen：Ed25519 vs RSA 密钥生成完全指南',
    intro: 'SSH 密钥是安全服务器认证的黄金标准，用加密密钥对替代密码。无论你是在设置新的开发机器、配置 CI/CD 流水线，还是加固生产服务器，理解如何生成和管理 SSH 密钥都是一项基本技能。本综合指南涵盖了从密钥算法选择（Ed25519 vs RSA vs ECDSA）到高级 SSH 配置、代理管理和常见问题排查的所有内容。',

    // Section 1: What are SSH Keys
    whatTitle: '什么是 SSH 密钥？',
    whatDesc: 'SSH（安全外壳协议）密钥是用于身份认证的加密密钥对。不必每次连接远程服务器时都输入密码，SSH 密钥让你使用公钥加密来证明身份。这比基于密码的认证更安全、更方便。',
    whatFlow: 'SSH 密钥对由两个文件组成：',
    whatPrivate: '私钥：保存在本地机器上。绝对不要与任何人共享此文件。它类似于打开门锁的物理钥匙。',
    whatPublic: '公钥：放置在每一台你想访问的服务器上。它类似于锁 — 任何人都可以看到它，但只有匹配的私钥才能打开它。',
    whatAuthTitle: 'SSH 密钥认证的工作流程',
    whatAuth1: '1. 你尝试连接服务器：ssh user@server.example.com',
    whatAuth2: '2. 服务器发送一个用你的公钥加密的随机挑战。',
    whatAuth3: '3. 你的 SSH 客户端使用私钥解密挑战并发送响应。',
    whatAuth4: '4. 服务器验证响应。如果正确，你就通过了认证，全程无需发送密码。',
    whatAuthNote: '这意味着即使攻击者截获了网络流量，他们也无法在没有你的私钥的情况下冒充你。而密码则可能被键盘记录器、钓鱼攻击或暴力破解所获取。',

    // Section 2: Ed25519 vs RSA vs ECDSA
    compTitle: 'Ed25519 vs RSA vs ECDSA：算法对比',
    compDesc: 'SSH 密钥生成有多种可用算法。最常见的三种是 RSA、ECDSA 和 Ed25519。每种都有不同的安全属性、性能特征和兼容性考量。',
    compFeature: '特性',
    compEd25519: 'Ed25519',
    compRSA: 'RSA',
    compECDSA: 'ECDSA',
    compYear: '引入时间',
    compYearEd25519: '2014（OpenSSH 6.5）',
    compYearRSA: '1995（SSH-1）',
    compYearECDSA: '2011（OpenSSH 5.7）',
    compSecurity: '安全级别',
    compSecurityEd25519: '~128 位（等效于 RSA-3072）',
    compSecurityRSA: '112 位 (2048) / 128 位 (3072) / 192 位 (4096)',
    compSecurityECDSA: '128 位 (P-256) / 192 位 (P-384)',
    compKeySize: '私钥大小',
    compKeySizeEd25519: '64 字节（固定）',
    compKeySizeRSA: '~3,200 字节（4096 位）',
    compKeySizeECDSA: '~256 字节（P-256）',
    compPubKeySize: '公钥大小',
    compPubKeySizeEd25519: '32 字节（固定）',
    compPubKeySizeRSA: '~512 字节（4096 位）',
    compPubKeySizeECDSA: '~64 字节（P-256）',
    compSignSpeed: '签名速度',
    compSignSpeedEd25519: '非常快',
    compSignSpeedRSA: '慢',
    compSignSpeedECDSA: '快',
    compVerifySpeed: '验证速度',
    compVerifySpeedEd25519: '非常快',
    compVerifySpeedRSA: '快',
    compVerifySpeedECDSA: '中等',
    compCompat: '兼容性',
    compCompatEd25519: 'OpenSSH 6.5+（2014），大多数现代系统',
    compCompatRSA: '通用（所有 SSH 实现）',
    compCompatECDSA: 'OpenSSH 5.7+，但 NIST 曲线存在争议',
    compRecommend: '推荐',
    compRecommendEd25519: '新密钥的最佳选择',
    compRecommendRSA: '如不支持 Ed25519 则使用 4096 位',
    compRecommendECDSA: '一般不推荐 — 优先使用 Ed25519',
    compSummary: 'Ed25519 是新 SSH 密钥的推荐算法。它以较小的密钥大小提供出色的安全性，操作速度快，并且能抵抗多类实现攻击。RSA-4096 仍然是不支持 Ed25519 的系统的可靠备选。由于对 NIST P-256 曲线的担忧以及对随机数生成质量的敏感性，通常不推荐使用 ECDSA。',

    // Section 3: Generate Ed25519 Key
    genEd25519Title: '生成 Ed25519 SSH 密钥',
    genEd25519Desc: 'Ed25519 密钥是现代标准。它们快速、安全，生成紧凑的密钥文件。以下是逐步生成方法：',
    genEd25519Step1: '步骤 1：打开终端（Linux/macOS）或 Git Bash / PowerShell（Windows）。',
    genEd25519Step2: '步骤 2：运行使用 Ed25519 算法的 ssh-keygen 命令：',
    genEd25519Step3: '步骤 3：当提示输入文件位置时，按 Enter 接受默认值（~/.ssh/id_ed25519），或指定自定义路径：',
    genEd25519Step4: '步骤 4：在提示时输入强密码短语（推荐），或按 Enter 跳过：',
    genEd25519Step5: '步骤 5：验证密钥已创建：',
    genEd25519Output: '该命令生成两个文件：id_ed25519（私钥）和 id_ed25519.pub（公钥）。-C 标志添加注释（通常是你的邮箱）以帮助识别密钥。',
    genEd25519Flags: 'Ed25519 常用 ssh-keygen 参数：',
    genEd25519FlagT: '-t ed25519：指定 Ed25519 算法。',
    genEd25519FlagC: '-C "注释"：添加标识注释（通常是你的邮箱）。',
    genEd25519FlagF: '-f /path/to/key：指定输出文件路径。',
    genEd25519FlagN: '-N "密码短语"：非交互式设置密码短语（在脚本中有用）。',
    genEd25519FlagA: '-a 100：密码短语保护的 KDF 轮数（越高 = 暴力破解越慢）。默认为 16。',

    // Section 4: Generate RSA Key
    genRSATitle: '生成 RSA SSH 密钥（4096 位）',
    genRSADesc: '如果你需要与不支持 Ed25519 的旧系统兼容，请使用最小密钥长度为 4096 位的 RSA。RSA-2048 仍然被认为是安全的，但未来的安全余量较小。',
    genRSAStep1: '步骤 1：运行使用 RSA 和 4096 位的 ssh-keygen 命令：',
    genRSAStep2: '步骤 2：按照上述相同的提示操作（文件位置和密码短语）。',
    genRSAStep3: '步骤 3：验证密钥：',
    genRSANote: '重要：永远不要使用少于 2048 位的 RSA 密钥。自 2013 年以来，RSA-1024 已被认为不安全。为获得最大安全余量，始终使用 4096 位。',
    genRSAFlags: 'RSA 常用 ssh-keygen 参数：',
    genRSAFlagB: '-b 4096：指定 4096 位密钥长度（现代 OpenSSH 默认为 3072）。',
    genRSAFlagO: '-o：使用新的 OpenSSH 私钥格式（更能抵抗暴力破解）。这是 OpenSSH 7.8 以来的默认格式。',

    // Section 5: Key File Locations
    locTitle: 'SSH 密钥文件位置',
    locDesc: 'SSH 密钥和配置文件存储在 ~/.ssh/ 目录中。了解此目录结构对管理 SSH 设置至关重要。',
    locFile: '文件',
    locPurpose: '用途',
    locPermission: '权限',
    locIdEd25519: 'id_ed25519',
    locIdEd25519Desc: 'Ed25519 私钥',
    locIdEd25519Perm: '600 (-rw-------)',
    locIdEd25519Pub: 'id_ed25519.pub',
    locIdEd25519PubDesc: 'Ed25519 公钥',
    locIdEd25519PubPerm: '644 (-rw-r--r--)',
    locIdRsa: 'id_rsa',
    locIdRsaDesc: 'RSA 私钥',
    locIdRsaPerm: '600 (-rw-------)',
    locIdRsaPub: 'id_rsa.pub',
    locIdRsaPubDesc: 'RSA 公钥',
    locIdRsaPubPerm: '644 (-rw-r--r--)',
    locKnownHosts: 'known_hosts',
    locKnownHostsDesc: '你已连接过的服务器指纹列表（防止中间人攻击）',
    locKnownHostsPerm: '644 (-rw-r--r--)',
    locAuthorizedKeys: 'authorized_keys',
    locAuthorizedKeysDesc: '允许登录此服务器的公钥列表（服务器端）',
    locAuthorizedKeysPerm: '600 (-rw-------)',
    locConfig: 'config',
    locConfigDesc: 'SSH 客户端配置文件',
    locConfigPerm: '600 (-rw-------)',
    locSshDir: '~/.ssh/ 目录',
    locSshDirPerm: '700 (drwx------)',
    locSshDirDesc: '父目录也必须具有正确的权限',
    locWindowsNote: '在 Windows 上，SSH 目录通常位于 C:\\Users\\你的用户名\\.ssh\\。如果你使用 Git Bash，它会像 Linux/macOS 一样映射到 ~/.ssh/。',

    // Section 6: SSH Config File
    configTitle: 'SSH 配置文件（~/.ssh/config）',
    configDesc: 'SSH 配置文件是一个强大的工具，让你定义连接预设、管理多个密钥和配置高级选项。你可以创建命名别名，而不是输入冗长的 SSH 命令。',
    configBasic: '基本配置示例',
    configBasicDesc: '创建或编辑 ~/.ssh/config：',
    configMultiKey: '为不同服务使用多个密钥',
    configMultiKeyDesc: '如果你为 GitHub、GitLab 和生产服务器使用不同的密钥：',
    configProxy: 'ProxyJump：通过堡垒机连接',
    configProxyDesc: '如果你需要通过跳板机（堡垒机）SSH 到内部服务器：',
    configProxyUsage: '现在你可以直接连接：ssh internal-server。SSH 会自动先跳转通过堡垒机。',
    configWildcard: '通配符和默认设置',
    configWildcardDesc: '为所有连接应用默认设置：',
    configOptions: '常用 SSH 配置选项',
    configOptIdentity: 'IdentityFile：要使用的私钥路径。',
    configOptIdentitiesOnly: 'IdentitiesOnly yes：仅使用指定的密钥，不尝试代理中的其他密钥。',
    configOptForward: 'ForwardAgent yes：将本地 SSH 代理转发到远程服务器（谨慎使用）。',
    configOptKeepAlive: 'ServerAliveInterval 60：每 60 秒发送一个保活数据包以防止断开连接。',
    configOptProxy: 'ProxyJump bastion：通过另一个 SSH 主机路由连接。',
    configOptPort: 'Port 2222：连接到非标准 SSH 端口。',

    // Section 7: Add Key to GitHub/GitLab
    gitTitle: '将 SSH 密钥添加到 GitHub / GitLab',
    gitDesc: '使用 SSH 密钥是 GitHub 和 GitLab 进行 Git 操作认证的推荐方式。以下是设置方法：',
    gitStep1Title: '步骤 1：复制你的公钥',
    gitStep1Desc: '显示并复制你的公钥：',
    gitStep2Title: '步骤 2：将密钥添加到 GitHub',
    gitStep2Desc1: '1. 前往 GitHub.com > Settings > SSH and GPG keys > New SSH key。',
    gitStep2Desc2: '2. 给密钥一个描述性标题（例如 "工作笔记本 2024"）。',
    gitStep2Desc3: '3. 将你的公钥粘贴到 "Key" 字段中。',
    gitStep2Desc4: '4. 点击 "Add SSH key"。',
    gitStep3Title: '步骤 3：将密钥添加到 GitLab',
    gitStep3Desc1: '1. 前往 GitLab.com > Preferences > SSH Keys。',
    gitStep3Desc2: '2. 粘贴你的公钥，设置标题和可选的过期日期。',
    gitStep3Desc3: '3. 点击 "Add key"。',
    gitStep4Title: '步骤 4：测试连接',
    gitStep4Desc: '验证你的 SSH 密钥是否正常工作：',
    gitStep4Success: '如果成功，你会看到类似以下的消息：',
    gitStep4GitLab: '对于 GitLab：',
    gitCloneTitle: '步骤 5：使用 SSH 克隆仓库',
    gitCloneDesc: '现在你可以使用 SSH URL 而不是 HTTPS 来克隆仓库：',
    gitSwitchDesc: '将现有仓库从 HTTPS 切换到 SSH：',

    // Section 8: SSH Agent
    agentTitle: 'SSH 代理：在内存中管理密钥',
    agentDesc: 'SSH 代理是一个后台进程，将你的私钥保存在内存中，这样你就不必每次使用 SSH 密钥时都输入密码短语。如果你的密钥受密码短语保护（应该如此），它特别有用。',
    agentStartTitle: '启动 SSH 代理',
    agentStartLinux: '在 Linux/macOS 上：',
    agentStartWindows: '在 Windows 上（PowerShell）：',
    agentAddTitle: '将密钥添加到代理',
    agentAddDesc: '将你的私钥添加到代理：',
    agentAddAll: '添加所有默认密钥：',
    agentListTitle: '列出代理中的密钥',
    agentListDesc: '查看当前加载在代理中的所有密钥：',
    agentMacTitle: 'macOS 钥匙串集成',
    agentMacDesc: '在 macOS 上，你可以将 SSH 密钥密码短语存储在系统钥匙串中，使其在重启后仍然有效：',
    agentMacConfig: '将以下内容添加到 ~/.ssh/config 以自动从钥匙串加载密钥：',
    agentLifetime: '设置密钥生命周期',
    agentLifetimeDesc: '为安全起见，你可以设置超时，使密钥在一段时间不活动后自动移除：',
    agentForwardTitle: '代理转发',
    agentForwardDesc: '代理转发让你在远程服务器上使用本地 SSH 密钥，无需将密钥复制到那里。当你需要从一个服务器 SSH 到另一个服务器时使用（例如在部署服务器上从 GitHub 拉取）：',
    agentForwardWarning: '警告：代理转发会将你的密钥暴露给远程服务器上具有 root 权限的任何人。仅在你信任的服务器上使用。考虑使用 ProxyJump 作为更安全的替代方案。',

    // Section 9: Key Passphrase
    passTitle: 'SSH 密钥密码短语',
    passDesc: '密码短语为你的私钥文件添加了一层加密。即使有人窃取了你的私钥文件，没有密码短语他们也无法使用它。',
    passWhyTitle: '为什么要使用密码短语？',
    passWhy1: '笔记本被盗：如果你的笔记本被盗，密码短语可以防止对你的服务器的即时访问。',
    passWhy2: '恶意软件：如果恶意软件读取了你的 ~/.ssh/ 目录，加密的密钥没有密码短语就无法使用。',
    passWhy3: '共享机器：如果其他人可以访问你的用户账户，密码短语是你的最后一道防线。',
    passWhy4: '合规性：许多安全标准（SOC 2、ISO 27001）要求加密私钥。',
    passCreateTitle: '使用强密码短语创建密钥',
    passCreateDesc: '生成新密钥时，ssh-keygen 会提示输入密码短语。使用强大、唯一的密码短语：',
    passChangeTitle: '更改现有密钥的密码短语',
    passChangeDesc: '你可以更改（或添加）现有密钥的密码短语，无需重新生成：',
    passRemoveTitle: '移除密码短语（不推荐）',
    passRemoveDesc: '如果你需要未加密的密钥（例如用于自动化脚本），可以移除密码短语：',
    passRemoveWarning: '警告：没有密码短语的密钥存在重大安全风险。对于自动化系统，考虑使用 ssh-agent、权限受限的部署密钥或密钥管理器。',
    passKdfTitle: '增加 KDF 轮数',
    passKdfDesc: '-a 标志控制对密码短语应用多少轮密钥派生。更高的值使暴力破解更慢：',

    // Section 10: Security Best Practices
    secTitle: 'SSH 密钥安全最佳实践',
    secPermTitle: '文件权限',
    secPermDesc: '不正确的权限是最常见的 SSH 问题之一。SSH 会拒绝使用权限过于宽松的密钥或配置文件：',
    secPermCommands: '设置正确的权限：',
    secRotateTitle: '定期轮换密钥',
    secRotateDesc: '密钥轮换可以限制密钥泄露时的影响范围。最佳实践：',
    secRotate1: '至少每年生成一次新密钥（或按照组织的策略）。',
    secRotate2: '在移除旧密钥之前，将新公钥添加到所有服务器。',
    secRotate3: '确认新密钥有效后，从 authorized_keys 中移除旧公钥。',
    secRotate4: '从 GitHub/GitLab/Bitbucket 撤销旧密钥。',
    secRotate5: '记录每个密钥的生成时间和部署位置。',
    secDisableTitle: '在服务器上禁用密码认证',
    secDisableDesc: '配置好 SSH 密钥认证后，禁用密码认证以防止暴力破解攻击：',
    secDisableStep1: '编辑 /etc/ssh/sshd_config：',
    secDisableStep2: '重启 SSH 服务：',
    secDisableWarning: '警告：在禁用密码认证之前，确保你的 SSH 密钥登录可以正常工作。否则，你可能会把自己锁在服务器外面。',
    secMoreTitle: '其他安全措施',
    secMore1: '使用非标准 SSH 端口（例如 Port 2222）以减少自动扫描噪音。',
    secMore2: '安装 fail2ban 以阻止登录失败次数过多的 IP 地址。',
    secMore3: '禁用 root 登录：在 sshd_config 中设置 PermitRootLogin no。',
    secMore4: '使用 AllowUsers 或 AllowGroups 限制哪些用户可以通过 SSH 登录。',
    secMore5: '启用双因素认证（2FA）以增加额外的安全层。',
    secMore6: '监控 /var/log/auth.log（Debian/Ubuntu）或 /var/log/secure（RHEL/CentOS）以发现可疑活动。',

    // Section 11: Troubleshooting
    troubleTitle: '常见 SSH 密钥问题排查',
    troublePermDeniedTitle: 'Permission Denied (publickey)',
    troublePermDeniedDesc: '这是最常见的 SSH 错误。它表示服务器拒绝了你的密钥。常见原因和修复方法：',
    troublePermDenied1: '提供了错误的密钥：使用 ssh -i ~/.ssh/id_ed25519 user@server 指定正确的密钥。',
    troublePermDenied2: '公钥不在 authorized_keys 中：将你的公钥添加到服务器上的 ~/.ssh/authorized_keys。',
    troublePermDenied3: '服务器上的权限错误：服务器端的 ~/.ssh/ 目录和 authorized_keys 必须具有正确的权限。',
    troublePermDenied4: 'SSH 代理未运行：启动代理并添加你的密钥。',
    troubleTooOpenTitle: '"Permissions are too open" 错误',
    troubleTooOpenDesc: '如果你看到 "WARNING: UNPROTECTED PRIVATE KEY FILE!" 或 "Permissions 0644 for \'id_ed25519\' are too open"，说明 SSH 拒绝使用该密钥，因为其他人可以读取它：',
    troubleTooOpenFix: '修复权限：',
    troubleTooOpenWindows: '在 Windows 上，右键点击文件 > 属性 > 安全 > 高级，移除除你的用户账户之外的所有权限。',
    troubleDebugTitle: '调试 SSH 连接',
    troubleDebugDesc: '使用 -v、-vv 或 -vvv 标志获取不同级别的调试输出：',
    troubleDebugLook: '在调试输出中查找以下关键行：',
    troubleDebugLook1: '"Offering public key"：显示 SSH 正在尝试哪些密钥。',
    troubleDebugLook2: '"Server accepts key"：确认密钥已被接受。',
    troubleDebugLook3: '"Authentication succeeded"：登录成功。',
    troubleDebugLook4: '"No more authentication methods to try"：所有提供的密钥都被拒绝。',
    troubleHostKeyTitle: 'Host Key Verification Failed',
    troubleHostKeyDesc: '如果服务器的主机密钥已更改（例如服务器重建），你会看到警告。移除旧的主机密钥：',
    troubleHostKeyWarning: '警告：仅在你预期主机密钥已更改时才执行此操作（例如服务器重建）。意外的更改可能表示中间人攻击。',
    troubleTimeoutTitle: '连接超时',
    troubleTimeout1: '验证服务器正在运行并在正确的端口上接受连接。',
    troubleTimeout2: '检查防火墙（ufw、iptables 或云安全组）。',
    troubleTimeout3: '尝试使用特定端口连接：ssh -p 2222 user@server。',
    troubleTimeout4: '在 SSH 配置中添加 ServerAliveInterval 以防止空闲断开。',

    // Section 12: FAQ
    faqTitle: '常见问题',
    faq1q: '应该使用 Ed25519 还是 RSA 作为 SSH 密钥？',
    faq1a: '为所有新的 SSH 密钥使用 Ed25519。Ed25519 提供与 RSA-4096 等效或更好的安全性，密钥大小显著更小（公钥 32 字节 vs ~512 字节），签名和验证更快，并且能抵抗某些实现攻击。只有当你需要与不支持 Ed25519 的非常旧的系统（2014 年之前）兼容时，才使用 RSA-4096。',
    faq2q: '不使用密码短语的 SSH 密钥安全吗？',
    faq2a: '没有密码短语的 SSH 密钥存在重大安全风险。如果你的私钥文件被泄露（笔记本被盗、恶意软件、备份暴露），攻击者可以立即访问信任该密钥的所有服务器。始终使用强密码短语，并依赖 ssh-agent 来避免重复输入。对于自动化系统，使用权限最小化的部署密钥或密钥管理器。',
    faq3q: '如何为不同的 GitHub 账户使用多个 SSH 密钥？',
    faq3a: '为每个账户创建单独的密钥，并在 ~/.ssh/config 中配置不同的 Host 别名。例如，设置 Host github-personal 使用 HostName github.com 和 IdentityFile ~/.ssh/id_ed25519_personal，设置 Host github-work 使用 IdentityFile ~/.ssh/id_ed25519_work。然后使用别名克隆：git clone git@github-personal:user/repo.git。',
    faq4q: 'SSH 私钥泄露后应该怎么做？',
    faq4a: '立即从所有服务器（authorized_keys）、GitHub、GitLab 和任何其他服务中移除泄露的公钥。生成新的密钥对并部署新的公钥。审查密钥可能被泄露期间的日志以查找未授权访问。如果该密钥用于生产服务器，考虑进行全面的安全审计。',
    faq5q: '可以将 RSA 密钥转换为 Ed25519 吗？',
    faq5a: '不可以，你无法在密钥算法之间进行转换。你必须使用 ssh-keygen -t ed25519 生成新的 Ed25519 密钥对，然后将新的公钥添加到你的服务器和服务（GitHub、GitLab 等）。你可以在过渡期间保留旧的 RSA 密钥作为备份，然后在新的 Ed25519 密钥部署到所有地方后将其移除。',

    // Related tools
    relatedTitle: '相关工具',
    relatedHash: '哈希生成器 - 生成 SHA-256、MD5 和其他哈希值，用于验证文件完整性和密钥指纹。',
    relatedPassword: '密码生成器 - 为你的 SSH 密钥创建强大的随机密码短语。',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 };
const noteBoxStyle: React.CSSProperties = { background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const warningBoxStyle: React.CSSProperties = { background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };

export default function SshKeygenEd25519RsaGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

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

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      {/* Section 1: What are SSH Keys */}
      <h2 style={h2Style}>{t.whatTitle}</h2>
      <p style={pStyle}>{t.whatDesc}</p>
      <p style={pStyle}>{t.whatFlow}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li><strong>{lang === 'zh' ? '私钥' : 'Private key'}:</strong> {t.whatPrivate}</li>
        <li><strong>{lang === 'zh' ? '公钥' : 'Public key'}:</strong> {t.whatPublic}</li>
      </ul>

      <h3 style={h3Style}>{t.whatAuthTitle}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[t.whatAuth1, t.whatAuth2, t.whatAuth3, t.whatAuth4].map((step, i) => (
          <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b'][i]}`, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {step}
          </div>
        ))}
      </div>

      <pre style={codeStyle}><code>{`# SSH Key Authentication Flow
Client                          Server
  │                               │
  │── 1. Connection request ─────>│
  │                               │
  │<── 2. Random challenge ───────│  (encrypted with your public key)
  │                               │
  │── 3. Decrypted response ─────>│  (signed with your private key)
  │                               │
  │<── 4. Access granted ─────────│  (response verified)
  │                               │`}</code></pre>

      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.whatAuthNote}</p>
      </div>

      {/* Section 2: Ed25519 vs RSA vs ECDSA */}
      <h2 style={h2Style}>{t.compTitle}</h2>
      <p style={pStyle}>{t.compDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.compFeature}</th>
              <th style={thStyle}>{t.compEd25519}</th>
              <th style={thStyle}>{t.compRSA}</th>
              <th style={thStyle}>{t.compECDSA}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.compYear, t.compYearEd25519, t.compYearRSA, t.compYearECDSA],
              [t.compSecurity, t.compSecurityEd25519, t.compSecurityRSA, t.compSecurityECDSA],
              [t.compKeySize, t.compKeySizeEd25519, t.compKeySizeRSA, t.compKeySizeECDSA],
              [t.compPubKeySize, t.compPubKeySizeEd25519, t.compPubKeySizeRSA, t.compPubKeySizeECDSA],
              [t.compSignSpeed, t.compSignSpeedEd25519, t.compSignSpeedRSA, t.compSignSpeedECDSA],
              [t.compVerifySpeed, t.compVerifySpeedEd25519, t.compVerifySpeedRSA, t.compVerifySpeedECDSA],
              [t.compCompat, t.compCompatEd25519, t.compCompatRSA, t.compCompatECDSA],
              [t.compRecommend, t.compRecommendEd25519, t.compRecommendRSA, t.compRecommendECDSA],
            ].map(([feature, ed25519, rsa, ecdsa], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{ed25519}</td>
                <td style={tdStyle}>{rsa}</td>
                <td style={tdStyle}>{ecdsa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 600 }}>{t.compSummary}</p>
      </div>

      {/* Section 3: Generate Ed25519 Key */}
      <h2 style={h2Style}>{t.genEd25519Title}</h2>
      <p style={pStyle}>{t.genEd25519Desc}</p>
      <p style={pStyle}>{t.genEd25519Step1}</p>
      <p style={pStyle}>{t.genEd25519Step2}</p>
      <pre style={codeStyle}><code>{`ssh-keygen -t ed25519 -C "your_email@example.com"`}</code></pre>

      <p style={pStyle}>{t.genEd25519Step3}</p>
      <pre style={codeStyle}><code>{`Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519):
# Press Enter for default, or type a custom path like:
# /home/user/.ssh/id_ed25519_github`}</code></pre>

      <p style={pStyle}>{t.genEd25519Step4}</p>
      <pre style={codeStyle}><code>{`Enter passphrase (empty for no passphrase):
Enter same passphrase again:
# Use a strong passphrase like: correct-horse-battery-staple`}</code></pre>

      <p style={pStyle}>{t.genEd25519Step5}</p>
      <pre style={codeStyle}><code>{`ls -la ~/.ssh/id_ed25519*

# Expected output:
-rw-------  1 user user  464 Jan 15 10:30 /home/user/.ssh/id_ed25519
-rw-r--r--  1 user user  105 Jan 15 10:30 /home/user/.ssh/id_ed25519.pub

# View your public key:
cat ~/.ssh/id_ed25519.pub
# ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... your_email@example.com`}</code></pre>

      <p style={pStyle}>{t.genEd25519Output}</p>
      <p style={pStyle}>{t.genEd25519Flags}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li><code>-t ed25519</code>: {t.genEd25519FlagT}</li>
        <li><code>-C &quot;comment&quot;</code>: {t.genEd25519FlagC}</li>
        <li><code>-f /path/to/key</code>: {t.genEd25519FlagF}</li>
        <li><code>-N &quot;passphrase&quot;</code>: {t.genEd25519FlagN}</li>
        <li><code>-a 100</code>: {t.genEd25519FlagA}</li>
      </ul>

      <pre style={codeStyle}><code>{`# Generate Ed25519 key with all options in one command:
ssh-keygen -t ed25519 -C "work@company.com" -f ~/.ssh/id_ed25519_work -a 100

# Generate key non-interactively (for scripts):
ssh-keygen -t ed25519 -C "deploy@ci" -f ~/.ssh/id_deploy -N "" -a 16`}</code></pre>

      {/* Section 4: Generate RSA Key */}
      <h2 style={h2Style}>{t.genRSATitle}</h2>
      <p style={pStyle}>{t.genRSADesc}</p>
      <p style={pStyle}>{t.genRSAStep1}</p>
      <pre style={codeStyle}><code>{`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`}</code></pre>

      <p style={pStyle}>{t.genRSAStep2}</p>
      <p style={pStyle}>{t.genRSAStep3}</p>
      <pre style={codeStyle}><code>{`ls -la ~/.ssh/id_rsa*

# Expected output:
-rw-------  1 user user 3,381 Jan 15 10:35 /home/user/.ssh/id_rsa
-rw-r--r--  1 user user   749 Jan 15 10:35 /home/user/.ssh/id_rsa.pub

# View the public key:
cat ~/.ssh/id_rsa.pub
# ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQ... your_email@example.com

# Verify key details:
ssh-keygen -l -f ~/.ssh/id_rsa.pub
# 4096 SHA256:abc123... your_email@example.com (RSA)`}</code></pre>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>{lang === 'zh' ? '重要' : 'Important'}:</strong> {t.genRSANote}</p>
      </div>

      <p style={pStyle}>{t.genRSAFlags}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li><code>-b 4096</code>: {t.genRSAFlagB}</li>
        <li><code>-o</code>: {t.genRSAFlagO}</li>
      </ul>

      {/* Section 5: Key File Locations */}
      <h2 style={h2Style}>{t.locTitle}</h2>
      <p style={pStyle}>{t.locDesc}</p>

      <pre style={codeStyle}><code>{`~/.ssh/
├── id_ed25519          # Ed25519 private key (chmod 600)
├── id_ed25519.pub      # Ed25519 public key  (chmod 644)
├── id_rsa              # RSA private key      (chmod 600)
├── id_rsa.pub          # RSA public key       (chmod 644)
├── config              # SSH client config    (chmod 600)
├── known_hosts         # Server fingerprints  (chmod 644)
└── authorized_keys     # Allowed public keys  (chmod 600, server-side)`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.locFile}</th>
              <th style={thStyle}>{t.locPurpose}</th>
              <th style={thStyle}>{t.locPermission}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.locSshDir, t.locSshDirDesc, t.locSshDirPerm],
              [t.locIdEd25519, t.locIdEd25519Desc, t.locIdEd25519Perm],
              [t.locIdEd25519Pub, t.locIdEd25519PubDesc, t.locIdEd25519PubPerm],
              [t.locIdRsa, t.locIdRsaDesc, t.locIdRsaPerm],
              [t.locIdRsaPub, t.locIdRsaPubDesc, t.locIdRsaPubPerm],
              [t.locConfig, t.locConfigDesc, t.locConfigPerm],
              [t.locKnownHosts, t.locKnownHostsDesc, t.locKnownHostsPerm],
              [t.locAuthorizedKeys, t.locAuthorizedKeysDesc, t.locAuthorizedKeysPerm],
            ].map(([file, purpose, perm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600, fontFamily: 'monospace', fontSize: 13 }}>{file}</td>
                <td style={tdStyle}>{purpose}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 13 }}>{perm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.locWindowsNote}</p>
      </div>

      {/* Section 6: SSH Config File */}
      <h2 style={h2Style}>{t.configTitle}</h2>
      <p style={pStyle}>{t.configDesc}</p>

      <h3 style={h3Style}>{t.configBasic}</h3>
      <p style={pStyle}>{t.configBasicDesc}</p>
      <pre style={codeStyle}><code>{`# ~/.ssh/config

# Personal server
Host myserver
    HostName 203.0.113.50
    User deploy
    Port 22
    IdentityFile ~/.ssh/id_ed25519

# Now connect with just:
# ssh myserver
# Instead of:
# ssh -i ~/.ssh/id_ed25519 deploy@203.0.113.50`}</code></pre>

      <h3 style={h3Style}>{t.configMultiKey}</h3>
      <p style={pStyle}>{t.configMultiKeyDesc}</p>
      <pre style={codeStyle}><code>{`# ~/.ssh/config

# GitHub (personal account)
Host github.com-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes

# GitHub (work account)
Host github.com-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes

# GitLab
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_ed25519_gitlab
    IdentitiesOnly yes
    PreferredAuthentications publickey

# Production server
Host production
    HostName prod.example.com
    User admin
    Port 2222
    IdentityFile ~/.ssh/id_ed25519_prod
    IdentitiesOnly yes

# Usage:
# git clone git@github.com-personal:myuser/repo.git
# git clone git@github.com-work:company/repo.git
# ssh production`}</code></pre>

      <h3 style={h3Style}>{t.configProxy}</h3>
      <p style={pStyle}>{t.configProxyDesc}</p>
      <pre style={codeStyle}><code>{`# ~/.ssh/config

# Bastion / Jump host
Host bastion
    HostName bastion.example.com
    User jumpuser
    IdentityFile ~/.ssh/id_ed25519
    Port 22

# Internal server (accessed through bastion)
Host internal-server
    HostName 10.0.1.50
    User admin
    IdentityFile ~/.ssh/id_ed25519
    ProxyJump bastion

# Chained jump: client → bastion1 → bastion2 → target
Host deep-internal
    HostName 10.0.2.100
    User admin
    ProxyJump bastion,bastion2`}</code></pre>
      <p style={pStyle}>{t.configProxyUsage}</p>

      <h3 style={h3Style}>{t.configWildcard}</h3>
      <p style={pStyle}>{t.configWildcardDesc}</p>
      <pre style={codeStyle}><code>{`# ~/.ssh/config

# Default settings for all hosts
Host *
    AddKeysToAgent yes
    IdentitiesOnly yes
    ServerAliveInterval 60
    ServerAliveCountMax 3
    Compression yes

# Settings for all *.example.com hosts
Host *.example.com
    User deploy
    IdentityFile ~/.ssh/id_ed25519_work
    Port 2222`}</code></pre>

      <p style={pStyle}>{t.configOptions}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li><code>IdentityFile</code>: {t.configOptIdentity}</li>
        <li><code>IdentitiesOnly</code>: {t.configOptIdentitiesOnly}</li>
        <li><code>ForwardAgent</code>: {t.configOptForward}</li>
        <li><code>ServerAliveInterval</code>: {t.configOptKeepAlive}</li>
        <li><code>ProxyJump</code>: {t.configOptProxy}</li>
        <li><code>Port</code>: {t.configOptPort}</li>
      </ul>

      {/* Section 7: Add Key to GitHub/GitLab */}
      <h2 style={h2Style}>{t.gitTitle}</h2>
      <p style={pStyle}>{t.gitDesc}</p>

      <h3 style={h3Style}>{t.gitStep1Title}</h3>
      <p style={pStyle}>{t.gitStep1Desc}</p>
      <pre style={codeStyle}><code>{`# Linux / macOS
cat ~/.ssh/id_ed25519.pub

# macOS — copy directly to clipboard:
pbcopy < ~/.ssh/id_ed25519.pub

# Linux (with xclip):
xclip -selection clipboard < ~/.ssh/id_ed25519.pub

# Windows (PowerShell):
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard

# Windows (Git Bash):
clip < ~/.ssh/id_ed25519.pub`}</code></pre>

      <h3 style={h3Style}>{t.gitStep2Title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[t.gitStep2Desc1, t.gitStep2Desc2, t.gitStep2Desc3, t.gitStep2Desc4].map((step, i) => (
          <div key={i} style={{ padding: '10px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {step}
          </div>
        ))}
      </div>

      <h3 style={h3Style}>{t.gitStep3Title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[t.gitStep3Desc1, t.gitStep3Desc2, t.gitStep3Desc3].map((step, i) => (
          <div key={i} style={{ padding: '10px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {step}
          </div>
        ))}
      </div>

      <h3 style={h3Style}>{t.gitStep4Title}</h3>
      <p style={pStyle}>{t.gitStep4Desc}</p>
      <pre style={codeStyle}><code>{`# Test GitHub connection:
ssh -T git@github.com`}</code></pre>
      <p style={pStyle}>{t.gitStep4Success}</p>
      <pre style={codeStyle}><code>{`Hi username! You've successfully authenticated, but GitHub does not provide shell access.`}</code></pre>
      <p style={pStyle}>{t.gitStep4GitLab}</p>
      <pre style={codeStyle}><code>{`# Test GitLab connection:
ssh -T git@gitlab.com

# Expected output:
Welcome to GitLab, @username!`}</code></pre>

      <h3 style={h3Style}>{t.gitCloneTitle}</h3>
      <p style={pStyle}>{t.gitCloneDesc}</p>
      <pre style={codeStyle}><code>{`# Clone via SSH (recommended):
git clone git@github.com:username/repository.git

# Instead of HTTPS:
# git clone https://github.com/username/repository.git`}</code></pre>
      <p style={pStyle}>{t.gitSwitchDesc}</p>
      <pre style={codeStyle}><code>{`# Check current remote URL:
git remote -v
# origin  https://github.com/username/repo.git (fetch)

# Switch to SSH:
git remote set-url origin git@github.com:username/repo.git

# Verify:
git remote -v
# origin  git@github.com:username/repo.git (fetch)`}</code></pre>

      {/* Section 8: SSH Agent */}
      <h2 style={h2Style}>{t.agentTitle}</h2>
      <p style={pStyle}>{t.agentDesc}</p>

      <h3 style={h3Style}>{t.agentStartTitle}</h3>
      <p style={pStyle}>{t.agentStartLinux}</p>
      <pre style={codeStyle}><code>{`# Start the SSH agent in the background:
eval "$(ssh-agent -s)"
# Output: Agent pid 12345

# Add to your shell profile (~/.bashrc, ~/.zshrc) to start automatically:
if [ -z "$SSH_AUTH_SOCK" ]; then
    eval "$(ssh-agent -s)" > /dev/null
fi`}</code></pre>

      <p style={pStyle}>{t.agentStartWindows}</p>
      <pre style={codeStyle}><code>{`# PowerShell (run as Administrator to enable the service):
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent

# Verify it is running:
Get-Service ssh-agent
# Status: Running`}</code></pre>

      <h3 style={h3Style}>{t.agentAddTitle}</h3>
      <p style={pStyle}>{t.agentAddDesc}</p>
      <pre style={codeStyle}><code>{`# Add a specific key:
ssh-add ~/.ssh/id_ed25519
# Enter passphrase for /home/user/.ssh/id_ed25519:
# Identity added: /home/user/.ssh/id_ed25519 (your_email@example.com)

# Add RSA key:
ssh-add ~/.ssh/id_rsa`}</code></pre>

      <p style={pStyle}>{t.agentAddAll}</p>
      <pre style={codeStyle}><code>{`# Add all default keys (id_rsa, id_ed25519, etc.):
ssh-add`}</code></pre>

      <h3 style={h3Style}>{t.agentListTitle}</h3>
      <p style={pStyle}>{t.agentListDesc}</p>
      <pre style={codeStyle}><code>{`# List keys with fingerprints:
ssh-add -l
# 256 SHA256:abc123... your_email@example.com (ED25519)
# 4096 SHA256:def456... your_email@example.com (RSA)

# List keys with full public key:
ssh-add -L`}</code></pre>

      <h3 style={h3Style}>{t.agentMacTitle}</h3>
      <p style={pStyle}>{t.agentMacDesc}</p>
      <pre style={codeStyle}><code>{`# Add key to macOS Keychain:
ssh-add --apple-use-keychain ~/.ssh/id_ed25519`}</code></pre>
      <p style={pStyle}>{t.agentMacConfig}</p>
      <pre style={codeStyle}><code>{`# ~/.ssh/config (macOS)
Host *
    UseKeychain yes
    AddKeysToAgent yes
    IdentityFile ~/.ssh/id_ed25519`}</code></pre>

      <h3 style={h3Style}>{t.agentLifetime}</h3>
      <p style={pStyle}>{t.agentLifetimeDesc}</p>
      <pre style={codeStyle}><code>{`# Add key with 1-hour timeout:
ssh-add -t 3600 ~/.ssh/id_ed25519

# Add key with 8-hour timeout (workday):
ssh-add -t 28800 ~/.ssh/id_ed25519

# Remove all keys from the agent:
ssh-add -D`}</code></pre>

      <h3 style={h3Style}>{t.agentForwardTitle}</h3>
      <p style={pStyle}>{t.agentForwardDesc}</p>
      <pre style={codeStyle}><code>{`# Forward agent for a single connection:
ssh -A user@server.example.com

# Or configure in ~/.ssh/config:
Host deploy-server
    HostName deploy.example.com
    User deploy
    ForwardAgent yes

# On the remote server, you can now use your local keys:
# ssh -T git@github.com  ← works without copying keys to the server`}</code></pre>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>{lang === 'zh' ? '警告' : 'Warning'}:</strong> {t.agentForwardWarning}</p>
      </div>

      {/* Section 9: Key Passphrase */}
      <h2 style={h2Style}>{t.passTitle}</h2>
      <p style={pStyle}>{t.passDesc}</p>

      <h3 style={h3Style}>{t.passWhyTitle}</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.passWhy1}</li>
        <li>{t.passWhy2}</li>
        <li>{t.passWhy3}</li>
        <li>{t.passWhy4}</li>
      </ul>

      <h3 style={h3Style}>{t.passCreateTitle}</h3>
      <p style={pStyle}>{t.passCreateDesc}</p>
      <pre style={codeStyle}><code>{`# Generate key with increased KDF rounds for stronger passphrase protection:
ssh-keygen -t ed25519 -C "your_email@example.com" -a 100

# When prompted, use a strong passphrase:
# Good:  correct-horse-battery-staple  (4+ random words)
# Good:  My$ecure_Key_2024!ForWork     (mixed characters)
# Bad:   password123                    (too simple)
# Bad:   qwerty                         (dictionary word)`}</code></pre>

      <h3 style={h3Style}>{t.passChangeTitle}</h3>
      <p style={pStyle}>{t.passChangeDesc}</p>
      <pre style={codeStyle}><code>{`# Change passphrase on an existing key:
ssh-keygen -p -f ~/.ssh/id_ed25519

# Output:
Enter old passphrase:
Enter new passphrase:
Enter same passphrase again:
Your identification has been saved with the new passphrase.`}</code></pre>

      <h3 style={h3Style}>{t.passRemoveTitle}</h3>
      <p style={pStyle}>{t.passRemoveDesc}</p>
      <pre style={codeStyle}><code>{`# Remove passphrase (enter empty string as new passphrase):
ssh-keygen -p -f ~/.ssh/id_ed25519

Enter old passphrase:
Enter new passphrase:        # ← Press Enter (empty)
Enter same passphrase again:  # ← Press Enter (empty)`}</code></pre>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>{lang === 'zh' ? '警告' : 'Warning'}:</strong> {t.passRemoveWarning}</p>
      </div>

      <h3 style={h3Style}>{t.passKdfTitle}</h3>
      <p style={pStyle}>{t.passKdfDesc}</p>
      <pre style={codeStyle}><code>{`# Default KDF rounds: 16 (fast, less secure against brute-force)
ssh-keygen -t ed25519 -C "email@example.com"

# Increased KDF rounds: 100 (slower key loading, much harder to brute-force)
ssh-keygen -t ed25519 -C "email@example.com" -a 100

# High KDF rounds: 200 (very slow, maximum brute-force resistance)
ssh-keygen -t ed25519 -C "email@example.com" -a 200

# Note: KDF rounds affect how long it takes to decrypt the key
# with the passphrase, NOT the SSH connection speed.
# -a 100 adds ~1 second to key loading time.`}</code></pre>

      {/* Section 10: Security Best Practices */}
      <h2 style={h2Style}>{t.secTitle}</h2>

      <h3 style={h3Style}>{t.secPermTitle}</h3>
      <p style={pStyle}>{t.secPermDesc}</p>
      <pre style={codeStyle}><code>{`# If permissions are wrong, SSH will show errors like:
# "WARNING: UNPROTECTED PRIVATE KEY FILE!"
# "Permissions 0644 for '/home/user/.ssh/id_ed25519' are too open."
# "It is required that your private key files are NOT accessible by others."`}</code></pre>

      <p style={pStyle}>{t.secPermCommands}</p>
      <pre style={codeStyle}><code>{`# Set correct permissions for the .ssh directory:
chmod 700 ~/.ssh

# Set correct permissions for private keys:
chmod 600 ~/.ssh/id_ed25519
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh/config

# Set correct permissions for public keys:
chmod 644 ~/.ssh/id_ed25519.pub
chmod 644 ~/.ssh/id_rsa.pub

# Set correct permissions for authorized_keys (server-side):
chmod 600 ~/.ssh/authorized_keys

# Set correct permissions for known_hosts:
chmod 644 ~/.ssh/known_hosts

# Verify all permissions at once:
ls -la ~/.ssh/
# drwx------  2 user user 4096 Jan 15 10:30 .
# -rw-------  1 user user  464 Jan 15 10:30 id_ed25519
# -rw-r--r--  1 user user  105 Jan 15 10:30 id_ed25519.pub
# -rw-------  1 user user  222 Jan 15 10:30 config`}</code></pre>

      <h3 style={h3Style}>{t.secRotateTitle}</h3>
      <p style={pStyle}>{t.secRotateDesc}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{t.secRotate1}</li>
        <li>{t.secRotate2}</li>
        <li>{t.secRotate3}</li>
        <li>{t.secRotate4}</li>
        <li>{t.secRotate5}</li>
      </ul>

      <pre style={codeStyle}><code>{`# Key rotation workflow:

# 1. Generate new key
ssh-keygen -t ed25519 -C "email@example.com-2025" -f ~/.ssh/id_ed25519_2025

# 2. Add new public key to server
ssh-copy-id -i ~/.ssh/id_ed25519_2025.pub user@server

# 3. Test new key works
ssh -i ~/.ssh/id_ed25519_2025 user@server

# 4. Remove old public key from server
ssh user@server "sed -i '/old_key_comment/d' ~/.ssh/authorized_keys"

# 5. Update local SSH config to use new key
# Edit ~/.ssh/config and change IdentityFile paths

# 6. Remove old local key files
rm ~/.ssh/id_ed25519_old ~/.ssh/id_ed25519_old.pub`}</code></pre>

      <h3 style={h3Style}>{t.secDisableTitle}</h3>
      <p style={pStyle}>{t.secDisableDesc}</p>
      <p style={pStyle}>{t.secDisableStep1}</p>
      <pre style={codeStyle}><code>{`# /etc/ssh/sshd_config

# Disable password authentication
PasswordAuthentication no

# Disable challenge-response authentication
ChallengeResponseAuthentication no

# Disable PAM (optional, depends on your setup)
# UsePAM no

# Enable public key authentication (should be default)
PubkeyAuthentication yes

# Disable root login
PermitRootLogin no

# Allow only specific users
AllowUsers deploy admin`}</code></pre>

      <p style={pStyle}>{t.secDisableStep2}</p>
      <pre style={codeStyle}><code>{`# Debian / Ubuntu:
sudo systemctl restart sshd

# RHEL / CentOS / Fedora:
sudo systemctl restart sshd

# Older systems:
sudo service ssh restart`}</code></pre>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>{lang === 'zh' ? '警告' : 'Warning'}:</strong> {t.secDisableWarning}</p>
      </div>

      <h3 style={h3Style}>{t.secMoreTitle}</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.secMore1}</li>
        <li>{t.secMore2}</li>
        <li>{t.secMore3}</li>
        <li>{t.secMore4}</li>
        <li>{t.secMore5}</li>
        <li>{t.secMore6}</li>
      </ul>

      {/* Section 11: Troubleshooting */}
      <h2 style={h2Style}>{t.troubleTitle}</h2>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{t.troublePermDeniedTitle}</h3>
      <p style={pStyle}>{t.troublePermDeniedDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[t.troublePermDenied1, t.troublePermDenied2, t.troublePermDenied3, t.troublePermDenied4].map((item, i) => (
          <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {item}
          </div>
        ))}
      </div>

      <pre style={codeStyle}><code>{`# Fix: Specify the correct key explicitly
ssh -i ~/.ssh/id_ed25519 user@server.example.com

# Fix: Copy your public key to the server
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server.example.com

# Or manually:
cat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

# Fix: Correct server-side permissions
ssh user@server "chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{t.troubleTooOpenTitle}</h3>
      <p style={pStyle}>{t.troubleTooOpenDesc}</p>
      <pre style={codeStyle}><code>{`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for '/home/user/.ssh/id_ed25519' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.`}</code></pre>

      <p style={pStyle}>{t.troubleTooOpenFix}</p>
      <pre style={codeStyle}><code>{`# Fix permissions:
chmod 600 ~/.ssh/id_ed25519
chmod 600 ~/.ssh/id_rsa
chmod 700 ~/.ssh`}</code></pre>
      <p style={pStyle}>{t.troubleTooOpenWindows}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{t.troubleDebugTitle}</h3>
      <p style={pStyle}>{t.troubleDebugDesc}</p>
      <pre style={codeStyle}><code>{`# Verbose mode (increasing detail):
ssh -v user@server.example.com     # Level 1: basic debug info
ssh -vv user@server.example.com    # Level 2: more detail
ssh -vvv user@server.example.com   # Level 3: maximum detail

# Example debug output (key parts):
debug1: Offering public key: /home/user/.ssh/id_ed25519 ED25519 SHA256:abc123...
debug1: Server accepts key: /home/user/.ssh/id_ed25519 ED25519 SHA256:abc123...
debug1: Authentication succeeded (publickey).`}</code></pre>

      <p style={pStyle}>{t.troubleDebugLook}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li><code>&quot;Offering public key&quot;</code>: {t.troubleDebugLook1}</li>
        <li><code>&quot;Server accepts key&quot;</code>: {t.troubleDebugLook2}</li>
        <li><code>&quot;Authentication succeeded&quot;</code>: {t.troubleDebugLook3}</li>
        <li><code>&quot;No more authentication methods to try&quot;</code>: {t.troubleDebugLook4}</li>
      </ul>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{t.troubleHostKeyTitle}</h3>
      <p style={pStyle}>{t.troubleHostKeyDesc}</p>
      <pre style={codeStyle}><code>{`# Remove a specific host key:
ssh-keygen -R server.example.com

# Remove by IP address:
ssh-keygen -R 203.0.113.50

# Remove by IP and port:
ssh-keygen -R "[server.example.com]:2222"

# Then reconnect and accept the new host key:
ssh user@server.example.com
# The authenticity of host 'server.example.com' can't be established.
# ED25519 key fingerprint is SHA256:xyz789...
# Are you sure you want to continue connecting (yes/no)? yes`}</code></pre>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>{lang === 'zh' ? '警告' : 'Warning'}:</strong> {t.troubleHostKeyWarning}</p>
      </div>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.troubleTimeoutTitle}</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{t.troubleTimeout1}</li>
        <li>{t.troubleTimeout2}</li>
        <li>{t.troubleTimeout3}</li>
        <li>{t.troubleTimeout4}</li>
      </ul>

      <pre style={codeStyle}><code>{`# Test connectivity:
ssh -v -o ConnectTimeout=10 user@server.example.com

# Check if the port is open:
nc -zv server.example.com 22
# or
telnet server.example.com 22

# Add keep-alive to prevent idle timeout (~/.ssh/config):
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3`}</code></pre>

      {/* Section 12: FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a], [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}

      {/* Related Tools */}
      <h2 style={h2Style}>{t.relatedTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <Link href={`/${lang}/tools/hash-generator`} style={{ display: 'block', padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          {t.relatedHash}
        </Link>
        <Link href={`/${lang}/tools/password-generator`} style={{ display: 'block', padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          {t.relatedPassword}
        </Link>
      </div>
    </div>
  );
}
