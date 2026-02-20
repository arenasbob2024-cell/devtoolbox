---
title: "chmod Cheat Sheet: Linux File Permissions in 5 Minutes"
published: false
description: "Stop guessing chmod numbers. Here's the complete reference for Linux file permissions -- octal values, common patterns, and the commands you actually need."
tags: linux, devops, beginners, tutorial
canonical_url: https://viadreams.cc/en/blog/chmod-calculator-linux-permissions-guide
cover_image: https://viadreams.cc/og-image.png
---

If you've ever SSH'd into a server and run `chmod 777` just to make things work... this post is for you. Let's fix that.

Linux file permissions are simpler than they look. Once you understand the three-digit number, you'll never have to Google "chmod 755 vs 644" again.

## The Permission Model in 60 Seconds

Every file has three permission categories:
- **Owner** (u) -- the user who created it
- **Group** (g) -- users in the file's group
- **Others** (o) -- everyone else

Each category gets three permission types:
- **Read (r)** = 4
- **Write (w)** = 2
- **Execute (x)** = 1

Add them up for each category. That's your chmod number.

```
-rwxr-xr--  deploy.sh
 |||  ||| ||
 |||  ||| |+-- Others: r-- (4)
 |||  ||+----- Group:  r-x (5)
 ||+---------- Owner:  rwx (7)

chmod 754 deploy.sh
```

## The Octal Cheat Sheet

| Value | Symbolic | Meaning |
|-------|----------|---------|
| 0 | `---` | No permissions |
| 1 | `--x` | Execute only |
| 2 | `-w-` | Write only |
| 3 | `-wx` | Write + execute |
| 4 | `r--` | Read only |
| 5 | `r-x` | Read + execute |
| 6 | `rw-` | Read + write |
| 7 | `rwx` | Full access |

## The Permissions You'll Actually Use

| chmod | Who gets what | When to use it |
|-------|--------------|----------------|
| `755` | Owner: rwx, Group/Others: rx | Directories, scripts, web doc root |
| `644` | Owner: rw, Group/Others: r | HTML, CSS, config files, documents |
| `700` | Owner: rwx, nobody else | `~/.ssh` directory, private scripts |
| `600` | Owner: rw, nobody else | SSH keys, `.env` files, credentials |
| `400` | Owner: r, nobody else | SSL certs, read-only secrets |
| `750` | Owner: rwx, Group: rx | Shared project dirs |
| `775` | Owner: rwx, Group: rwx, Others: rx | Team upload directories |
| `777` | Everyone: rwx | **Never in production.** |

## Common Patterns for Developers

### Web Server Files (Apache/Nginx)

```bash
# Standard web permissions
find /var/www -type f -exec chmod 644 {} \;
find /var/www -type d -exec chmod 755 {} \;
```

### SSH Keys (SSH Will Refuse if Wrong)

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa          # private key
chmod 644 ~/.ssh/id_rsa.pub      # public key
chmod 644 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/config
```

### Environment and Secret Files

```bash
chmod 600 .env
chmod 600 config/database.yml
chmod 600 credentials.json
```

### Scripts and Executables

```bash
chmod 755 deploy.sh      # shared script
chmod 700 my-script.sh   # private script
```

## Numeric vs Symbolic Mode

You can use either style:

```bash
# Numeric -- set all permissions at once
chmod 755 script.sh

# Symbolic -- add/remove specific permissions
chmod u+x script.sh       # add execute for owner
chmod g-w file.txt         # remove write for group
chmod o= file.txt          # remove all for others
chmod a+r file.txt         # add read for everyone
```

## Special Permissions (The 4th Digit)

There are three special bits you'll occasionally encounter:

**setuid (4000)** -- Process runs as file owner, not executor. Example: `/usr/bin/passwd` runs as root.

**setgid (2000)** -- On directories, new files inherit the directory's group. Essential for shared team folders.

**Sticky bit (1000)** -- On directories, only file owner can delete files. Classic example: `/tmp` uses `1777`.

```bash
chmod 4755 program        # setuid
chmod 2775 shared-dir/    # setgid
chmod 1777 /tmp           # sticky bit
```

## 7 Best Practices

1. **Start restrictive.** Begin with `600` and loosen only as needed.
2. **Never use 777 in production.** If your app needs it, your architecture has a bug.
3. **Audit regularly.** Run `find / -perm -777 -type f` to find overly permissive files.
4. **Use groups, not world-readable.** Create a shared group instead of opening to others.
5. **Be careful with recursive chmod.** Double-check the path before running `chmod -R`.
6. **Set umask for secure defaults.** Add `umask 027` to your shell profile.
7. **Document permissions in deploy scripts.** Don't rely on memory.

---

*Originally published on [DevToolBox](https://viadreams.cc/en/blog/chmod-calculator-linux-permissions-guide). Try our free [chmod Calculator](https://viadreams.cc/en/tools/chmod-calculator) -- toggle checkboxes and see the octal number, symbolic notation, and `ls -l` output in real time. 100% client-side, no data leaves your browser.*
