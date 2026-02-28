'use client';

import React from 'react';
import Link from 'next/link';

const translations = {
  en: {
    title: 'Ansible Complete Guide: Infrastructure Automation Made Simple',
    description: 'Complete Ansible guide covering installation, inventory files, playbooks, modules, roles, Galaxy, Vault, Jinja2 templates, dynamic inventory, Docker/Kubernetes integration, AWX/Tower, and best practices for infrastructure automation.',
  },
  zh: {
    title: 'Ansible 完整指南：基础设施自动化从入门到精通',
    description: '完整 Ansible 指南，涵盖安装、清单文件、Playbook、模块、角色、Galaxy、Vault、Jinja2 模板、动态清单、Docker/Kubernetes 集成、AWX/Tower 和基础设施自动化最佳实践。',
  },
};

export default function AnsibleGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Ansible and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ansible is an open-source IT automation tool that uses SSH to connect to remote machines and execute tasks. Unlike Chef or Puppet, Ansible is agentless — no software needs to be installed on managed nodes. You write declarative YAML playbooks that describe the desired state of your infrastructure, and Ansible ensures each node matches that state. It uses a push-based model where the control node sends instructions over SSH (or WinRM for Windows).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Ansible and Terraform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ansible and Terraform serve different primary purposes. Terraform excels at infrastructure provisioning (creating VMs, networks, load balancers) using a declarative state model. Ansible excels at configuration management (installing software, managing services, deploying applications) on existing machines. Terraform tracks state in a state file while Ansible is stateless — it checks current state on every run. Many teams use both: Terraform to create infrastructure, then Ansible to configure it.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Ansible and Chef/Puppet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The key difference is that Ansible is agentless and uses SSH, while Chef and Puppet require agents installed on every managed node. Ansible uses YAML for playbooks (easy to learn), Chef uses Ruby DSL, and Puppet uses its own declarative language. Ansible follows a push model (you run it when needed), while Chef/Puppet use a pull model (agents periodically check for updates). Ansible has a lower learning curve and simpler setup, making it ideal for smaller teams and ad-hoc tasks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I manage secrets in Ansible securely?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ansible Vault is the built-in solution for encrypting sensitive data. Use "ansible-vault create secrets.yml" to create encrypted files, or "ansible-vault encrypt_string" to encrypt individual variables inline. Vault files are encrypted with AES-256 and can be safely committed to version control. You can use multiple vault passwords with vault IDs for different environments. For enterprise setups, integrate with HashiCorp Vault, AWS Secrets Manager, or CyberArk using lookup plugins.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are Ansible roles and why should I use them?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ansible roles are a standardized way to organize playbook content into reusable components. A role has a defined directory structure with folders for tasks, handlers, templates, files, variables, defaults, and meta information. Roles promote code reuse, make playbooks cleaner, and allow sharing through Ansible Galaxy. Instead of one massive playbook, you break functionality into roles like "nginx", "postgresql", "app-deploy" that can be mixed and matched across different playbooks and projects.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Ansible work with Docker and Kubernetes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ansible has dedicated modules for both Docker and Kubernetes. For Docker, use docker_container to manage containers, docker_image to build/pull images, and docker_compose to manage multi-container apps. For Kubernetes, use k8s module to manage any Kubernetes resource (pods, deployments, services), k8s_info to query cluster state, and helm module to manage Helm charts. Ansible can automate the entire lifecycle: build images, push to registry, update Kubernetes manifests, and perform rolling deployments.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Ansible AWX/Tower and when do I need it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AWX is the free open-source upstream project for Red Hat Ansible Automation Platform (formerly Tower). It provides a web UI, REST API, role-based access control (RBAC), job scheduling, centralized logging, and credential management for Ansible. You need AWX/Tower when multiple team members run playbooks, when you need audit trails and approval workflows, when you want to schedule automated runs, or when non-technical users need to trigger automation through a web interface.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle errors and failures in Ansible playbooks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ansible provides several error handling mechanisms: (1) ignore_errors: yes continues execution even if a task fails. (2) failed_when lets you define custom failure conditions. (3) block/rescue/always provides try-catch-finally style error handling. (4) any_errors_fatal: true stops all hosts immediately on any failure. (5) max_fail_percentage sets an acceptable failure threshold. (6) register + when lets you check task results before proceeding. Best practice is to use block/rescue for critical sections and always include cleanup tasks in the always block.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/ansible-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', margin: '0 0 0.5rem 0' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>Ansible</strong> is an agentless automation tool that uses SSH and YAML playbooks to configure servers,
          deploy applications, and orchestrate infrastructure. Define your hosts in an <strong>inventory</strong>,
          write <strong>playbooks</strong> with tasks and handlers, organize reusable logic into <strong>roles</strong>,
          encrypt secrets with <strong>Vault</strong>, and use <strong>Jinja2 templates</strong> for dynamic configuration files.
          It works seamlessly with Docker, Kubernetes, and cloud providers. Format your YAML configs with the{' '}
          <Link href="/en/tools/yaml-formatter" style={{ color: '#0284c7' }}>online YAML formatter</Link>.
        </p>
      </div>

      {/* Section 1: What is Ansible */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        1. What Is Ansible?
      </h2>
      <p>
        <strong>Ansible</strong> is an open-source IT automation engine developed by Red Hat. It automates configuration
        management, application deployment, cloud provisioning, and orchestration. Unlike Chef or Puppet, Ansible is
        <strong> agentless</strong> &mdash; it connects to managed nodes over SSH (or WinRM for Windows) and requires no
        software to be installed on target machines.
      </p>
      <p>
        Ansible uses a <strong>push-based model</strong>: you run commands from a control node, and Ansible pushes changes
        to remote hosts. Playbooks are written in <strong>YAML</strong>, making them human-readable and easy to version
        control. The idempotent design means running a playbook multiple times produces the same result &mdash; it only
        changes what needs changing.
      </p>

      {/* Section 2: Installation */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        2. Installing Ansible
      </h2>
      <p>
        Ansible only needs to be installed on the <strong>control node</strong> (your workstation or a CI server).
        Managed nodes only need Python and SSH.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Ubuntu / Debian\n'
        + 'sudo apt update\n'
        + 'sudo apt install -y ansible\n'
        + '\n'
        + '# RHEL / CentOS / Fedora\n'
        + 'sudo dnf install -y ansible-core\n'
        + '\n'
        + '# macOS (Homebrew)\n'
        + 'brew install ansible\n'
        + '\n'
        + '# pip (any OS — recommended for latest version)\n'
        + 'pip install ansible\n'
        + '\n'
        + '# Verify installation\n'
        + 'ansible --version\n'
        + '# ansible [core 2.16.x]'}</code></pre>

      {/* Section 3: Inventory Files */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        3. Inventory Files — Defining Your Infrastructure
      </h2>
      <p>
        An <strong>inventory</strong> tells Ansible which hosts to manage. It can be a simple INI file, YAML file,
        or a dynamic script that queries cloud APIs. The default location is <code>/etc/ansible/hosts</code>.
      </p>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        INI Format
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# inventory.ini\n'
        + '[webservers]\n'
        + 'web1.example.com ansible_user=ubuntu\n'
        + 'web2.example.com ansible_user=ubuntu\n'
        + '\n'
        + '[dbservers]\n'
        + 'db1.example.com ansible_user=root ansible_port=2222\n'
        + '\n'
        + '[production:children]\n'
        + 'webservers\n'
        + 'dbservers\n'
        + '\n'
        + '[production:vars]\n'
        + 'ansible_ssh_private_key_file=~/.ssh/prod_key'}</code></pre>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        YAML Format
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# inventory.yml\n'
        + 'all:\n'
        + '  children:\n'
        + '    webservers:\n'
        + '      hosts:\n'
        + '        web1.example.com:\n'
        + '          ansible_user: ubuntu\n'
        + '        web2.example.com:\n'
        + '          ansible_user: ubuntu\n'
        + '    dbservers:\n'
        + '      hosts:\n'
        + '        db1.example.com:\n'
        + '          ansible_user: root\n'
        + '          ansible_port: 2222'}</code></pre>

      {/* Section 4: Ad-Hoc Commands */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        4. Ad-Hoc Commands — Quick One-Liners
      </h2>
      <p>
        Ad-hoc commands let you run a single task on remote hosts without writing a playbook. They are perfect for
        quick checks, one-off operations, and troubleshooting.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Ping all hosts\n'
        + 'ansible all -i inventory.ini -m ping\n'
        + '\n'
        + '# Check disk space on webservers\n'
        + 'ansible webservers -m shell -a "df -h"\n'
        + '\n'
        + '# Install a package\n'
        + 'ansible dbservers -m apt -a "name=postgresql state=present" --become\n'
        + '\n'
        + '# Copy a file\n'
        + 'ansible all -m copy -a "src=/tmp/config.conf dest=/etc/app/config.conf"\n'
        + '\n'
        + '# Restart a service\n'
        + 'ansible webservers -m service -a "name=nginx state=restarted" --become\n'
        + '\n'
        + '# Gather facts\n'
        + 'ansible web1.example.com -m setup'}</code></pre>

      {/* Section 5: Playbooks */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        5. Playbooks — Tasks, Handlers, and Variables
      </h2>
      <p>
        A <strong>playbook</strong> is a YAML file containing one or more <strong>plays</strong>. Each play targets
        a group of hosts and defines a list of <strong>tasks</strong> to execute in order. Playbooks are the core of
        Ansible automation.
      </p>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Basic Playbook Structure
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# site.yml\n'
        + '---\n'
        + '- name: Configure web servers\n'
        + '  hosts: webservers\n'
        + '  become: yes\n'
        + '  vars:\n'
        + '    http_port: 80\n'
        + '    app_name: myapp\n'
        + '\n'
        + '  tasks:\n'
        + '    - name: Install Nginx\n'
        + '      apt:\n'
        + '        name: nginx\n'
        + '        state: present\n'
        + '        update_cache: yes\n'
        + '\n'
        + '    - name: Copy Nginx config\n'
        + '      template:\n'
        + '        src: nginx.conf.j2\n'
        + '        dest: /etc/nginx/sites-available/default\n'
        + '      notify: Restart Nginx\n'
        + '\n'
        + '    - name: Ensure Nginx is running\n'
        + '      service:\n'
        + '        name: nginx\n'
        + '        state: started\n'
        + '        enabled: yes\n'
        + '\n'
        + '  handlers:\n'
        + '    - name: Restart Nginx\n'
        + '      service:\n'
        + '        name: nginx\n'
        + '        state: restarted'}</code></pre>
      <p>
        <strong>Handlers</strong> are special tasks that run only when notified by another task. They execute once at the
        end of the play, even if notified multiple times. This is ideal for restarting services only when configuration
        files actually change.
      </p>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Variables in Playbooks
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Variable precedence (lowest to highest):\n'
        + '# 1. role defaults\n'
        + '# 2. inventory vars\n'
        + '# 3. playbook vars\n'
        + '# 4. role vars\n'
        + '# 5. task vars\n'
        + '# 6. extra vars (-e)\n'
        + '\n'
        + '- name: Deploy with variables\n'
        + '  hosts: webservers\n'
        + '  vars:\n'
        + '    app_version: "2.1.0"\n'
        + '    deploy_dir: /opt/myapp\n'
        + '  vars_files:\n'
        + '    - vars/common.yml\n'
        + '    - vars/production.yml\n'
        + '\n'
        + '  tasks:\n'
        + '    - name: Create deploy directory\n'
        + '      file:\n'
        + '        path: "{{ deploy_dir }}"\n'
        + '        state: directory\n'
        + '        mode: "0755"\n'
        + '\n'
        + '# Run with extra vars\n'
        + '# ansible-playbook site.yml -e "app_version=2.2.0"'}</code></pre>

      {/* Section 6: Modules */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        6. Essential Modules — apt, yum, copy, template, service, file, user
      </h2>
      <p>
        Ansible ships with thousands of modules. Here are the most commonly used ones for system administration.
      </p>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Package Management (apt / yum)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Install packages (Debian/Ubuntu)\n'
        + '- name: Install required packages\n'
        + '  apt:\n'
        + '    name:\n'
        + '      - nginx\n'
        + '      - python3-pip\n'
        + '      - git\n'
        + '      - curl\n'
        + '    state: present\n'
        + '    update_cache: yes\n'
        + '    cache_valid_time: 3600\n'
        + '\n'
        + '# Install packages (RHEL/CentOS)\n'
        + '- name: Install packages\n'
        + '  yum:\n'
        + '    name:\n'
        + '      - httpd\n'
        + '      - php\n'
        + '      - mariadb-server\n'
        + '    state: latest'}</code></pre>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        File Operations (copy / template / file)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Copy a static file\n'
        + '- name: Copy app config\n'
        + '  copy:\n'
        + '    src: files/app.conf\n'
        + '    dest: /etc/myapp/app.conf\n'
        + '    owner: root\n'
        + '    group: root\n'
        + '    mode: "0644"\n'
        + '    backup: yes\n'
        + '\n'
        + '# Deploy a Jinja2 template\n'
        + '- name: Deploy Nginx config\n'
        + '  template:\n'
        + '    src: templates/nginx.conf.j2\n'
        + '    dest: /etc/nginx/nginx.conf\n'
        + '    validate: "nginx -t -c %s"\n'
        + '  notify: Reload Nginx\n'
        + '\n'
        + '# Create directories and set permissions\n'
        + '- name: Create app directories\n'
        + '  file:\n'
        + '    path: /opt/myapp/logs\n'
        + '    state: directory\n'
        + '    owner: appuser\n'
        + '    group: appuser\n'
        + '    mode: "0755"\n'
        + '    recurse: yes'}</code></pre>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Service and User Management
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Manage services\n'
        + '- name: Start and enable Nginx\n'
        + '  service:\n'
        + '    name: nginx\n'
        + '    state: started\n'
        + '    enabled: yes\n'
        + '\n'
        + '# Manage system users\n'
        + '- name: Create application user\n'
        + '  user:\n'
        + '    name: appuser\n'
        + '    comment: "Application Service Account"\n'
        + '    shell: /bin/bash\n'
        + '    groups: www-data\n'
        + '    append: yes\n'
        + '    create_home: yes\n'
        + '\n'
        + '# Add SSH key for user\n'
        + '- name: Add authorized key\n'
        + '  authorized_key:\n'
        + '    user: appuser\n'
        + '    key: "{{ lookup(\'file\', \'~/.ssh/id_rsa.pub\') }}"'}</code></pre>

      {/* Section 7: Roles & Galaxy */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        7. Roles and Ansible Galaxy
      </h2>
      <p>
        <strong>Roles</strong> are the primary mechanism for organizing and reusing Ansible content. A role groups tasks,
        handlers, templates, files, and variables into a standardized directory structure.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Role directory structure\n'
        + 'roles/\n'
        + '  nginx/\n'
        + '    tasks/\n'
        + '      main.yml        # Entry point for tasks\n'
        + '    handlers/\n'
        + '      main.yml        # Handlers\n'
        + '    templates/\n'
        + '      nginx.conf.j2   # Jinja2 templates\n'
        + '    files/\n'
        + '      index.html      # Static files\n'
        + '    vars/\n'
        + '      main.yml        # Role variables (high precedence)\n'
        + '    defaults/\n'
        + '      main.yml        # Default variables (easily overridden)\n'
        + '    meta/\n'
        + '      main.yml        # Dependencies, metadata'}</code></pre>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Using Roles in Playbooks
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# site.yml — using roles\n'
        + '---\n'
        + '- name: Configure web stack\n'
        + '  hosts: webservers\n'
        + '  become: yes\n'
        + '  roles:\n'
        + '    - common\n'
        + '    - nginx\n'
        + '    - role: app_deploy\n'
        + '      vars:\n'
        + '        app_version: "3.0.0"\n'
        + '    - role: monitoring\n'
        + '      when: enable_monitoring | default(true)'}</code></pre>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Ansible Galaxy
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Initialize a new role skeleton\n'
        + 'ansible-galaxy role init my_role\n'
        + '\n'
        + '# Install a role from Galaxy\n'
        + 'ansible-galaxy role install geerlingguy.docker\n'
        + '\n'
        + '# Install roles from requirements file\n'
        + '# requirements.yml\n'
        + '---\n'
        + 'roles:\n'
        + '  - name: geerlingguy.docker\n'
        + '    version: "7.1.0"\n'
        + '  - name: geerlingguy.nginx\n'
        + '  - name: geerlingguy.postgresql\n'
        + '\n'
        + 'collections:\n'
        + '  - name: community.docker\n'
        + '    version: "3.4.0"\n'
        + '\n'
        + '# Install all from requirements\n'
        + 'ansible-galaxy install -r requirements.yml'}</code></pre>

      {/* Section 8: Variables & Facts */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        8. Variables and Facts
      </h2>
      <p>
        <strong>Facts</strong> are system information automatically gathered from managed nodes. Ansible collects
        facts about the OS, network interfaces, disks, memory, and more using the <code>setup</code> module.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Access facts in playbooks\n'
        + '- name: Show system information\n'
        + '  debug:\n'
        + '    msg: |\n'
        + '      OS: {{ ansible_distribution }} {{ ansible_distribution_version }}\n'
        + '      IP: {{ ansible_default_ipv4.address }}\n'
        + '      CPUs: {{ ansible_processor_vcpus }}\n'
        + '      RAM: {{ ansible_memtotal_mb }} MB\n'
        + '      Hostname: {{ ansible_hostname }}\n'
        + '\n'
        + '# Register task output as a variable\n'
        + '- name: Check if app is running\n'
        + '  shell: systemctl is-active myapp\n'
        + '  register: app_status\n'
        + '  ignore_errors: yes\n'
        + '\n'
        + '- name: Start app if not running\n'
        + '  service:\n'
        + '    name: myapp\n'
        + '    state: started\n'
        + '  when: app_status.rc != 0\n'
        + '\n'
        + '# Custom facts (place in /etc/ansible/facts.d/*.fact)\n'
        + '# /etc/ansible/facts.d/app.fact\n'
        + '# [general]\n'
        + '# version=2.1.0\n'
        + '# env=production\n'
        + '# Access: {{ ansible_local.app.general.version }}'}</code></pre>

      {/* Section 9: Conditionals & Loops */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        9. Conditionals and Loops
      </h2>
      <p>
        Ansible supports <code>when</code> conditionals and various loop constructs to make playbooks dynamic
        and adaptable to different environments.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Conditionals\n'
        + '- name: Install Apache on RedHat\n'
        + '  yum:\n'
        + '    name: httpd\n'
        + '    state: present\n'
        + '  when: ansible_os_family == "RedHat"\n'
        + '\n'
        + '- name: Install Apache on Debian\n'
        + '  apt:\n'
        + '    name: apache2\n'
        + '    state: present\n'
        + '  when: ansible_os_family == "Debian"\n'
        + '\n'
        + '# Loops with loop (replaces with_items)\n'
        + '- name: Create multiple users\n'
        + '  user:\n'
        + '    name: "{{ item.name }}"\n'
        + '    groups: "{{ item.groups }}"\n'
        + '    state: present\n'
        + '  loop:\n'
        + '    - { name: alice, groups: admin }\n'
        + '    - { name: bob, groups: developers }\n'
        + '    - { name: charlie, groups: developers }\n'
        + '\n'
        + '# Loop with dict2items\n'
        + '- name: Set sysctl parameters\n'
        + '  sysctl:\n'
        + '    name: "{{ item.key }}"\n'
        + '    value: "{{ item.value }}"\n'
        + '    sysctl_set: yes\n'
        + '  loop: "{{ sysctl_params | dict2items }}"\n'
        + '  vars:\n'
        + '    sysctl_params:\n'
        + '      net.core.somaxconn: 65535\n'
        + '      vm.swappiness: 10'}</code></pre>

      {/* Section 10: Jinja2 Templates */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        10. Jinja2 Templates
      </h2>
      <p>
        The <code>template</code> module renders <strong>Jinja2</strong> templates with variables and logic, then
        deploys the result to remote hosts. Templates are essential for generating configuration files dynamically.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# templates/nginx.conf.j2\n'
        + 'upstream app_backend {\n'
        + '{% for server in app_servers %}\n'
        + '    server {{ server }}:{{ app_port | default(8080) }};\n'
        + '{% endfor %}\n'
        + '}\n'
        + '\n'
        + 'server {\n'
        + '    listen {{ http_port | default(80) }};\n'
        + '    server_name {{ domain_name }};\n'
        + '\n'
        + '{% if ssl_enabled | default(false) %}\n'
        + '    listen 443 ssl;\n'
        + '    ssl_certificate     /etc/ssl/{{ domain_name }}.crt;\n'
        + '    ssl_certificate_key /etc/ssl/{{ domain_name }}.key;\n'
        + '{% endif %}\n'
        + '\n'
        + '    location / {\n'
        + '        proxy_pass http://app_backend;\n'
        + '        proxy_set_header Host \\$host;\n'
        + '        proxy_set_header X-Real-IP \\$remote_addr;\n'
        + '    }\n'
        + '\n'
        + '    # Generated by Ansible on {{ ansible_date_time.iso8601 }}\n'
        + '    # Managed by: {{ ansible_user_id }}\n'
        + '}'}</code></pre>
      <p>
        Jinja2 provides powerful filters: <code>{'{{ list | join(",") }}'}</code>, <code>{'{{ var | default("fallback") }}'}</code>,
        <code>{'{{ password | hash("sha512") }}'}</code>, and <code>{'{{ path | basename }}'}</code>.
      </p>

      {/* Section 11: Ansible Vault */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        11. Ansible Vault — Managing Secrets
      </h2>
      <p>
        <strong>Ansible Vault</strong> encrypts sensitive data (passwords, API keys, certificates) so they can be
        safely stored in version control. Files are encrypted with AES-256.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Create / encrypt / edit / view encrypted files\n'
        + 'ansible-vault create secrets.yml\n'
        + 'ansible-vault encrypt vars/production.yml\n'
        + 'ansible-vault edit secrets.yml\n'
        + 'ansible-vault view secrets.yml\n'
        + '\n'
        + '# Encrypt a single string (inline vault)\n'
        + 'ansible-vault encrypt_string \'SuperSecret123\' --name \'db_password\'\n'
        + '\n'
        + '# Run playbook with vault password\n'
        + 'ansible-playbook site.yml --ask-vault-pass\n'
        + 'ansible-playbook site.yml --vault-password-file ~/.vault_pass\n'
        + '\n'
        + '# Multiple vault IDs for different environments\n'
        + 'ansible-playbook site.yml \\\n'
        + '  --vault-id dev@~/.vault_dev \\\n'
        + '  --vault-id prod@~/.vault_prod'}</code></pre>

      {/* Section 12: Error Handling */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        12. Error Handling
      </h2>
      <p>
        Ansible provides <code>block</code>/<code>rescue</code>/<code>always</code> for structured error handling,
        similar to try/catch/finally in programming languages.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'- name: Deploy with error handling\n'
        + '  hosts: webservers\n'
        + '  tasks:\n'
        + '    - name: Deployment block\n'
        + '      block:\n'
        + '        - name: Pull latest code\n'
        + '          git:\n'
        + '            repo: https://github.com/org/app.git\n'
        + '            dest: /opt/app\n'
        + '            version: main\n'
        + '\n'
        + '        - name: Run database migrations\n'
        + '          command: /opt/app/manage.py migrate\n'
        + '\n'
        + '        - name: Restart application\n'
        + '          service:\n'
        + '            name: myapp\n'
        + '            state: restarted\n'
        + '\n'
        + '      rescue:\n'
        + '        - name: Rollback on failure\n'
        + '          command: /opt/app/rollback.sh\n'
        + '\n'
        + '        - name: Send failure notification\n'
        + '          mail:\n'
        + '            to: ops@example.com\n'
        + '            subject: "Deployment FAILED on {{ inventory_hostname }}"\n'
        + '            body: "Deployment failed. Rollback executed."\n'
        + '\n'
        + '      always:\n'
        + '        - name: Cleanup temp files\n'
        + '          file:\n'
        + '            path: /tmp/deploy_artifacts\n'
        + '            state: absent\n'
        + '\n'
        + '# Retry with custom failure condition\n'
        + '- name: Check URL (with retries)\n'
        + '  uri:\n'
        + '    url: http://localhost:8080/health\n'
        + '  register: health_check\n'
        + '  retries: 5\n'
        + '  delay: 10\n'
        + '  until: health_check.status == 200'}</code></pre>

      {/* Section 13: Tags */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        13. Tags — Selective Task Execution
      </h2>
      <p>
        <strong>Tags</strong> let you run specific subsets of tasks in a playbook. This is invaluable for
        large playbooks where you only need to update one part of the configuration.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'- name: Full server setup\n'
        + '  hosts: all\n'
        + '  tasks:\n'
        + '    - name: Install base packages\n'
        + '      apt:\n'
        + '        name: [vim, htop, curl, git]\n'
        + '        state: present\n'
        + '      tags: [packages, base]\n'
        + '\n'
        + '    - name: Configure firewall\n'
        + '      ufw:\n'
        + '        rule: allow\n'
        + '        port: "{{ item }}"\n'
        + '      loop: ["22", "80", "443"]\n'
        + '      tags: [firewall, security]\n'
        + '\n'
        + '    - name: Deploy application\n'
        + '      copy:\n'
        + '        src: app/\n'
        + '        dest: /opt/myapp/\n'
        + '      tags: [deploy, app]\n'
        + '\n'
        + '# Run only specific tags\n'
        + '# ansible-playbook site.yml --tags "deploy"\n'
        + '# ansible-playbook site.yml --tags "security,packages"\n'
        + '\n'
        + '# Skip specific tags\n'
        + '# ansible-playbook site.yml --skip-tags "firewall"\n'
        + '\n'
        + '# List all tags in a playbook\n'
        + '# ansible-playbook site.yml --list-tags'}</code></pre>

      {/* Section 14: Dynamic Inventory */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        14. Dynamic Inventory
      </h2>
      <p>
        Static inventory files work for small environments, but cloud infrastructure changes constantly. <strong>Dynamic
        inventory</strong> scripts or plugins query cloud APIs (AWS, GCP, Azure) to discover hosts automatically.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# AWS EC2 dynamic inventory plugin\n'
        + '# aws_ec2.yml\n'
        + '---\n'
        + 'plugin: amazon.aws.aws_ec2\n'
        + 'regions:\n'
        + '  - us-east-1\n'
        + '  - us-west-2\n'
        + 'filters:\n'
        + '  tag:Environment:\n'
        + '    - production\n'
        + '  instance-state-name:\n'
        + '    - running\n'
        + 'keyed_groups:\n'
        + '  - key: tags.Role\n'
        + '    prefix: role\n'
        + '  - key: placement.region\n'
        + '    prefix: aws_region\n'
        + 'compose:\n'
        + '  ansible_host: public_ip_address\n'
        + '\n'
        + '# Use dynamic inventory\n'
        + '# ansible-inventory -i aws_ec2.yml --list\n'
        + '# ansible-playbook -i aws_ec2.yml site.yml'}</code></pre>
      <p>
        For GCP, use <code>google.cloud.gcp_compute</code>; for Azure, use <code>azure.azcollection.azure_rm</code>. All follow the same pattern: filters, authentication, and host grouping.
      </p>

      {/* Section 15: Ansible with Docker */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        15. Ansible with Docker and Kubernetes
      </h2>
      <p>
        Ansible integrates with container platforms through dedicated collections: <code>community.docker</code> for
        Docker and <code>kubernetes.core</code> for Kubernetes.
      </p>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Docker Management
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Install collection first:\n'
        + '# ansible-galaxy collection install community.docker\n'
        + '\n'
        + '- name: Manage Docker containers\n'
        + '  hosts: docker_hosts\n'
        + '  tasks:\n'
        + '    - name: Pull application image\n'
        + '      community.docker.docker_image:\n'
        + '        name: myapp\n'
        + '        tag: "2.0"\n'
        + '        source: pull\n'
        + '\n'
        + '    - name: Run application container\n'
        + '      community.docker.docker_container:\n'
        + '        name: myapp\n'
        + '        image: "myapp:2.0"\n'
        + '        state: started\n'
        + '        restart_policy: unless-stopped\n'
        + '        ports:\n'
        + '          - "8080:8080"\n'
        + '        env:\n'
        + '          DB_HOST: "db.internal"\n'
        + '          NODE_ENV: "production"\n'
        + '        volumes:\n'
        + '          - /data/app:/app/data'}</code></pre>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Kubernetes Deployments
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# ansible-galaxy collection install kubernetes.core\n'
        + '\n'
        + '- name: Deploy to Kubernetes\n'
        + '  hosts: localhost\n'
        + '  tasks:\n'
        + '    - name: Create namespace\n'
        + '      kubernetes.core.k8s:\n'
        + '        state: present\n'
        + '        definition:\n'
        + '          apiVersion: v1\n'
        + '          kind: Namespace\n'
        + '          metadata:\n'
        + '            name: myapp-prod\n'
        + '\n'
        + '    - name: Deploy application from manifest\n'
        + '      kubernetes.core.k8s:\n'
        + '        state: present\n'
        + '        src: k8s/deployment.yml\n'
        + '        namespace: myapp-prod'}</code></pre>

      {/* Section 16: AWX / Tower */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        16. AWX and Ansible Automation Platform (Tower)
      </h2>
      <p>
        <strong>AWX</strong> is the open-source upstream project for the Red Hat Ansible Automation Platform
        (formerly Ansible Tower). It adds a web UI, REST API, role-based access control, job scheduling,
        and centralized credential management on top of command-line Ansible.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Deploy AWX on Kubernetes via AWX Operator\n'
        + 'kubectl apply -f https://raw.githubusercontent.com/ansible/\\\n'
        + '  awx-operator/main/deploy/awx-operator.yml\n'
        + '\n'
        + '# awx-instance.yml\n'
        + '---\n'
        + 'apiVersion: awx.ansible.com/v1beta1\n'
        + 'kind: AWX\n'
        + 'metadata:\n'
        + '  name: awx\n'
        + '  namespace: awx\n'
        + 'spec:\n'
        + '  service_type: NodePort\n'
        + '\n'
        + 'kubectl apply -f awx-instance.yml\n'
        + 'kubectl get pods -n awx -w'}</code></pre>
      <p>
        Key AWX features include Job Templates, Workflows (chaining templates), RBAC, encrypted credential storage,
        cron-like scheduling, and a REST API for CI/CD integration.
      </p>

      {/* Section 17: Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        17. Ansible Best Practices
      </h2>
      <p>
        Following these conventions keeps your Ansible projects maintainable as they grow.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# Recommended project layout\n'
        + 'ansible-project/\n'
        + '  inventories/\n'
        + '    production/\n'
        + '      hosts.yml\n'
        + '      group_vars/all.yml\n'
        + '      host_vars/web1.example.com.yml\n'
        + '    staging/\n'
        + '      hosts.yml\n'
        + '  roles/\n'
        + '    common/\n'
        + '    nginx/\n'
        + '    app/\n'
        + '  playbooks/\n'
        + '    site.yml\n'
        + '    webservers.yml\n'
        + '  ansible.cfg\n'
        + '  requirements.yml'}</code></pre>
      <p>
        <strong>Key best practices:</strong>
      </p>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8' }}>
        <li>Always name your tasks clearly &mdash; <code>name: Install Nginx</code> beats an unnamed task.</li>
        <li>Use <strong>roles</strong> for reusability; keep playbooks as thin orchestration layers.</li>
        <li>Pin role and collection versions in <code>requirements.yml</code>.</li>
        <li>Store secrets with <strong>Ansible Vault</strong>, never in plain text.</li>
        <li>Use <code>ansible-lint</code> to enforce coding standards.</li>
        <li>Test with <strong>Molecule</strong> before deploying to production.</li>
        <li>Use <code>--check</code> (dry run) and <code>--diff</code> to preview changes.</li>
        <li>Keep inventory per environment in separate directories.</li>
        <li>Use <code>group_vars</code> and <code>host_vars</code> instead of inline variables.</li>
        <li>Avoid using <code>shell</code>/<code>command</code> when a dedicated module exists.</li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{'# ansible.cfg — project-level configuration\n'
        + '[defaults]\n'
        + 'inventory = inventories/production/hosts.yml\n'
        + 'roles_path = roles\n'
        + 'retry_files_enabled = False\n'
        + 'stdout_callback = yaml\n'
        + 'forks = 20\n'
        + 'timeout = 30\n'
        + '\n'
        + '[privilege_escalation]\n'
        + 'become = True\n'
        + 'become_method = sudo\n'
        + 'become_ask_pass = False\n'
        + '\n'
        + '[ssh_connection]\n'
        + 'pipelining = True\n'
        + 'ssh_args = -o ControlMaster=auto -o ControlPersist=60s'}</code></pre>

      {/* Section 18: Ansible vs Terraform vs Chef vs Puppet */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        18. Ansible vs Terraform vs Chef vs Puppet
      </h2>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>Feature</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>Ansible</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>Terraform</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>Chef</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>Puppet</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Primary Use</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Config management</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Infrastructure provisioning</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Config management</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Config management</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Language</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>YAML</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>HCL</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Ruby DSL</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Puppet DSL</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Agent</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Agentless (SSH)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Agentless (API)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Agent required</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Agent required</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Model</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Push</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Push</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Pull</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Pull</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>State</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Stateless</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>State file</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Chef Server</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>PuppetDB</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Learning Curve</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Low</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Medium</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>High</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Medium-High</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Best For</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Server config, app deploy</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Cloud infra provisioning</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Complex enterprise config</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Large-scale compliance</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Many teams combine <strong>Terraform + Ansible</strong>: Terraform provisions infrastructure (VMs, networks,
        load balancers), then Ansible configures those machines (install packages, deploy apps, manage services).
        Use the{' '}
        <Link href="/en/tools/yaml-formatter" style={{ color: '#0284c7' }}>YAML formatter</Link>{' '}
        to keep both Terraform YAML and Ansible playbooks clean.
      </p>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem 1.25rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.75rem 0' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Agentless by design:</strong> Ansible uses SSH and requires no agent installation on managed nodes, simplifying setup dramatically.</li>
          <li><strong>YAML playbooks:</strong> human-readable, version-controllable, and idempotent; running them twice produces the same result.</li>
          <li><strong>Roles for reusability:</strong> break complex automation into roles and share them via Ansible Galaxy.</li>
          <li><strong>Vault for secrets:</strong> encrypt passwords and API keys with AES-256; use vault IDs for multi-environment setups.</li>
          <li><strong>Jinja2 templates:</strong> generate dynamic configuration files with variables, loops, and conditionals.</li>
          <li><strong>Dynamic inventory:</strong> query AWS, GCP, or Azure APIs to discover hosts automatically instead of hardcoding IPs.</li>
          <li><strong>Docker and Kubernetes modules:</strong> manage containers and cluster resources directly from playbooks.</li>
          <li><strong>Ansible + Terraform:</strong> use Terraform to provision infrastructure, then Ansible to configure it; they complement each other.</li>
        </ul>
      </div>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Frequently Asked Questions
      </h2>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>What is Ansible and how does it work?</h3>
      <p>Ansible is an agentless automation tool that connects over SSH and executes tasks from YAML playbooks. It uses a push model and requires no software on managed nodes.</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>What is the difference between Ansible and Terraform?</h3>
      <p>Terraform provisions infrastructure (VMs, networks) with a state file. Ansible configures existing machines (packages, services). Many teams use both together.</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>What is the difference between Ansible and Chef/Puppet?</h3>
      <p>Ansible is agentless (SSH) with YAML playbooks. Chef uses Ruby DSL and Puppet its own language, both requiring agents. Ansible pushes; Chef and Puppet pull.</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>How do I manage secrets in Ansible securely?</h3>
      <p>Use Ansible Vault for AES-256 encryption. Create encrypted files with <code>ansible-vault create</code>, encrypt strings inline, and run with <code>--ask-vault-pass</code> or a password file.</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>What are Ansible roles and why should I use them?</h3>
      <p>Roles package tasks, handlers, templates, and variables into a reusable directory structure. Share them via Ansible Galaxy and compose across projects.</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>How does Ansible work with Docker and Kubernetes?</h3>
      <p>Use <code>community.docker</code> for containers and images, <code>kubernetes.core</code> for pods and deployments. Ansible orchestrates the full lifecycle from build to rollout.</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>What is Ansible AWX/Tower and when do I need it?</h3>
      <p>AWX adds a web UI, REST API, RBAC, and job scheduling on top of CLI Ansible. Use it when teams need shared access, audit trails, or scheduled automation runs.</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>How do I handle errors and failures in Ansible playbooks?</h3>
      <p>Use <code>block</code>/<code>rescue</code>/<code>always</code> for try/catch/finally handling. Combine with <code>ignore_errors</code>, <code>failed_when</code>, and <code>retries</code>/<code>until</code> for robust automation.</p>

    </article>
  );
}
