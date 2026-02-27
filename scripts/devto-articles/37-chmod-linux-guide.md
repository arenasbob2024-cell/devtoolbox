---
title: "Linux File Permissions (chmod): The Complete Developer Guide"
tags: linux, devops, security, bash
canonical_url: https://viadreams.cc/en/blog/chmod-calculator-online-guide
published: true
---

Understanding Linux file permissions is essential for every developer working with servers, Docker, or CI/CD. Here's the complete guide.

## The Permission Model

Every file and directory has three sets of permissions for three types of users:

```
-rwxr-xr-x  1 user group  4096 Jan 1 12:00 script.sh
│└┬┘└┬┘└┬┘
│ │  │  └── Other (everyone else)
│ │  └───── Group
│ └──────── Owner/User
└────────── File type (- = file, d = directory, l = symlink)
```

Each set has three bits: **r** (read=4), **w** (write=2), **x** (execute=1)

## Octal Notation

```bash
chmod 755 script.sh   # rwxr-xr-x
chmod 644 config.txt  # rw-r--r--
chmod 600 private.key # rw-------
chmod 777 public/     # rwxrwxrwx (avoid for security)
chmod 700 ~/.ssh/     # rwx------
```

Common permission combos:
| Octal | Symbolic | Use case |
|-------|----------|----------|
| 755 | rwxr-xr-x | Scripts, executables |
| 644 | rw-r--r-- | Config files, static files |
| 600 | rw------- | Private keys, passwords |
| 755 | rwxr-xr-x | Web directories |
| 640 | rw-r----- | Group-readable configs |

## Symbolic Mode

```bash
chmod +x script.sh      # Add execute for all
chmod -w readonly.txt   # Remove write for all
chmod u+x,g-w file      # Add execute for user, remove write for group
chmod o= file           # Remove all permissions for others
chmod a+r public.html   # Add read for all (a = all)
```

## Recursive Changes

```bash
# Change all files in directory
chmod -R 755 /var/www/html/

# Change only files (not directories)
find /var/www -type f -exec chmod 644 {} \;

# Change only directories
find /var/www -type d -exec chmod 755 {} \;
```

## Web Server Best Practices

```bash
# Secure web app setup
find /var/www/myapp -type d -exec chmod 755 {} \;
find /var/www/myapp -type f -exec chmod 644 {} \;

# Scripts that must execute
chmod 755 /var/www/myapp/bin/*

# Config with secrets — owner only
chmod 600 /var/www/myapp/.env
chmod 640 /var/www/myapp/config/database.yml  # group can read
```

## Special Permissions

```bash
# Setuid (run as file owner)
chmod u+s /usr/bin/program  # = 4755

# Setgid (run as group / inherit group for directories)
chmod g+s /shared/project/  # = 2755

# Sticky bit (only owner can delete in directory)
chmod +t /tmp               # = 1777
```

## SSH Key Permissions (Critical)

```bash
chmod 700 ~/.ssh/           # Directory: user only
chmod 600 ~/.ssh/id_rsa     # Private key: user only
chmod 644 ~/.ssh/id_rsa.pub # Public key: readable
chmod 600 ~/.ssh/authorized_keys  # Authorized keys: user only
```

SSH refuses to use private keys with wrong permissions:
```
WARNING: UNPROTECTED PRIVATE KEY FILE!
Permissions 0644 for 'id_rsa' are too open.
```

## Troubleshooting 403 Errors

For Nginx/Apache 403 Forbidden:
```bash
# The web server user (www-data, nginx, apache) must be able to:
# 1. Execute (traverse) all parent directories
# 2. Read the file

# Fix: ensure execute on directories in path
chmod o+x /home/username/
chmod -R 755 /home/username/public_html/

# Or add web server to your group
usermod -aG username www-data
chmod 750 /home/username/public_html/
```

## chmod Calculator

For quick permission calculations without memorizing octal codes, use **[DevToolBox's chmod calculator](https://viadreams.cc/en/tools/chmod-calculator)** — toggle checkboxes for owner/group/other and get the correct octal and symbolic notation instantly.

---

*Calculate Linux file permissions instantly with [DevToolBox's chmod calculator](https://viadreams.cc/en/tools/chmod-calculator) — no more guessing octal codes.*
