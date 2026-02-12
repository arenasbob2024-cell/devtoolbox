'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'A well-defined <strong>git branch naming convention</strong> is the backbone of efficient team collaboration. When every developer follows the same naming pattern, code reviews become faster, CI/CD pipelines can automate deployments by branch type, and the entire commit history becomes self-documenting. This comprehensive guide covers the most popular branch naming strategies, enforcement techniques, and real-world examples for teams of every size.',
    link_git_tool: 'Generate Git commands interactively with our Git Command Generator \u2192',
    link_slug_tool: 'Create URL-friendly slugs with our Slug Generator \u2192',

    h2_why: 'Why Branch Naming Conventions Matter',
    p_why: 'Branch names are not just labels. They are communication tools that tell your team what work is happening, where it belongs, and how it should be handled. Without a consistent naming convention, repositories quickly become cluttered with branches like "fix", "test2", "johns-branch", and "final-final-v3". Here is why conventions matter:',
    p_why_collab: '<strong>Team collaboration:</strong> When a colleague sees <code>feature/PROJ-123-add-oauth-login</code>, they immediately know it is a feature branch, tied to ticket PROJ-123, and related to OAuth login. No Slack message needed.',
    p_why_cicd: '<strong>CI/CD automation:</strong> Build systems can trigger different pipelines based on branch prefixes. Feature branches run tests only, release branches deploy to staging, and hotfix branches fast-track to production.',
    p_why_read: '<strong>Readability and searchability:</strong> With hundreds of branches, consistent naming makes <code>git branch --list "feature/*"</code> and pull request filters actually useful. You can instantly find all work related to a specific area.',
    p_why_cleanup: '<strong>Automated cleanup:</strong> Scripts can identify and delete stale branches based on naming patterns, keeping your repository clean without manual intervention.',

    h2_prefixes: 'Common Branch Prefixes',
    p_prefixes: 'The most widely adopted convention uses a type prefix followed by a slash. Each prefix signals the intent and scope of the branch, making it immediately clear what kind of work the branch contains.',
    p_prefix_feature: '<strong>feature/</strong> \u2014 New functionality or enhancements. This is the most common prefix. Example: <code>feature/user-profile-page</code>, <code>feature/JIRA-456-search-api</code>',
    p_prefix_bugfix: '<strong>bugfix/</strong> \u2014 Non-urgent bug fixes scheduled for the next release. Example: <code>bugfix/fix-login-redirect</code>, <code>bugfix/PROJ-789-null-pointer</code>',
    p_prefix_hotfix: '<strong>hotfix/</strong> \u2014 Critical production fixes that need immediate deployment. Example: <code>hotfix/payment-gateway-timeout</code>, <code>hotfix/security-patch-xss</code>',
    p_prefix_release: '<strong>release/</strong> \u2014 Release preparation branches for versioning and final testing. Example: <code>release/2.1.0</code>, <code>release/2024-q1-sprint</code>',
    p_prefix_chore: '<strong>chore/</strong> \u2014 Maintenance tasks, dependency updates, config changes. Example: <code>chore/upgrade-node-20</code>, <code>chore/update-ci-config</code>',
    p_prefix_docs: '<strong>docs/</strong> \u2014 Documentation-only changes. Example: <code>docs/update-api-reference</code>, <code>docs/add-contributing-guide</code>',
    p_prefix_test: '<strong>test/</strong> \u2014 Adding or updating tests. Example: <code>test/add-e2e-checkout-flow</code>, <code>test/increase-coverage-auth</code>',
    p_prefix_refactor: '<strong>refactor/</strong> \u2014 Code restructuring without changing behavior. Example: <code>refactor/extract-payment-service</code>, <code>refactor/simplify-middleware</code>',

    h2_format: 'Format Patterns and Examples',
    p_format: 'The most effective branch naming format combines a type prefix, an optional ticket number, and a short kebab-case description. Here are the most common patterns used across the industry:',
    p_format_pattern1: '<strong>Pattern 1: type/description</strong> \u2014 Simple and clean, ideal for small teams or open-source projects without a ticketing system.',
    p_format_pattern2: '<strong>Pattern 2: type/TICKET-123-description</strong> \u2014 The gold standard for enterprise teams. Links branches directly to issue trackers like Jira, Linear, or GitHub Issues.',
    p_format_pattern3: '<strong>Pattern 3: username/type/description</strong> \u2014 Useful in large organizations where you need to know who owns a branch at a glance.',

    h2_rules: 'Branch Naming Rules',
    p_rules: 'Git has specific technical constraints on branch names, and teams add their own conventions on top. Following these rules prevents errors and keeps your repository consistent:',
    p_rule_nospaces: '<strong>No spaces:</strong> Git does not allow spaces in branch names. Use hyphens (<code>-</code>) or underscores (<code>_</code>) as separators. Hyphens are the industry standard.',
    p_rule_chars: '<strong>Allowed characters:</strong> Use lowercase alphanumeric characters, hyphens, underscores, and forward slashes. Avoid special characters like <code>~</code>, <code>^</code>, <code>:</code>, <code>?</code>, <code>*</code>, <code>[</code>, <code>\\</code>, and consecutive dots (<code>..</code>).',
    p_rule_length: '<strong>Max length:</strong> While Git technically allows up to 255 characters, keep branch names under 50-60 characters for readability. Long names are truncated in most Git UIs and become difficult to type.',
    p_rule_case: '<strong>Case convention:</strong> Use lowercase for everything. Mixing cases causes confusion and can create issues on case-insensitive file systems (like macOS and Windows). The only exception is the ticket ID, which is typically uppercase (e.g., PROJ-123).',
    p_rule_nodot: '<strong>No trailing dots or locks:</strong> Branch names cannot end with <code>.lock</code> or a period. They also cannot start with a hyphen.',

    h2_gitflow: 'Git Flow Branching Strategy',
    p_gitflow: 'Git Flow, introduced by Vincent Driessen in 2010, is the most structured branching model. It uses multiple long-lived branches and a strict workflow that is ideal for projects with scheduled releases.',
    p_gitflow_main: '<strong>main</strong> (or master) \u2014 Always reflects the production-ready state. Every commit on main should be a release that has been tested.',
    p_gitflow_develop: '<strong>develop</strong> \u2014 The integration branch where features come together. This branch always contains the latest delivered development changes for the next release.',
    p_gitflow_feature: '<strong>feature/*</strong> \u2014 Branched from develop, merged back into develop. Each feature gets its own branch.',
    p_gitflow_release: '<strong>release/*</strong> \u2014 Branched from develop when features are complete. Used for final testing, version bumps, and documentation before merging into both main and develop.',
    p_gitflow_hotfix: '<strong>hotfix/*</strong> \u2014 Branched from main for critical production fixes. Merged back into both main and develop.',

    h2_githubflow: 'GitHub Flow: Simplified Branching',
    p_githubflow: 'GitHub Flow is a lightweight alternative to Git Flow. It has only one rule: anything on <code>main</code> is deployable. All work happens in feature branches that are merged via pull requests. This model works best for teams practicing continuous deployment.',
    p_githubflow_steps: 'The workflow is simple: (1) Create a branch from main, (2) Add commits, (3) Open a pull request, (4) Discuss and review code, (5) Deploy from the branch for testing, (6) Merge to main. There are no develop, release, or hotfix branches \u2014 just main and feature branches.',

    h2_trunk: 'Trunk-Based Development',
    p_trunk: 'Trunk-based development takes simplicity even further. Developers commit directly to a single branch (trunk/main) or use very short-lived feature branches that last hours, not days. This strategy requires strong test coverage and feature flags to manage unreleased code.',
    p_trunk_shortlived: '<strong>Short-lived branches:</strong> Feature branches exist for a few hours to at most two days. They are small, focused, and merged frequently to avoid divergence.',
    p_trunk_flags: '<strong>Feature flags:</strong> Incomplete features are hidden behind feature flags (also called feature toggles), allowing the code to be merged into main without being visible to users. This eliminates the need for long-running branches.',
    p_trunk_ci: '<strong>Continuous integration:</strong> Every commit to trunk triggers the full CI pipeline. The trunk is always in a releasable state. This is the model used by Google, Meta, and many high-performing engineering teams.',

    h2_enforcement: 'Automated Enforcement with Git Hooks',
    p_enforcement: 'Conventions are only as good as their enforcement. Git hooks let you automatically validate branch names before code is pushed, ensuring every branch follows your team\'s naming rules.',
    p_enforcement_prepush: 'The <code>pre-push</code> hook runs locally before any push reaches the remote. It can check the branch name against a regex pattern and reject pushes from non-conforming branches.',
    p_enforcement_husky: '<strong>Husky</strong> is the most popular tool for managing Git hooks in JavaScript/TypeScript projects. It makes hook installation and sharing across the team effortless.',

    h2_cicd: 'CI/CD Integration with Branch Patterns',
    p_cicd: 'Modern CI/CD systems use branch patterns to trigger different workflows. By following a consistent branch naming convention, you can automate your entire build, test, and deploy pipeline based on branch prefixes.',
    p_cicd_github: '<strong>GitHub Actions</strong> uses <code>on.push.branches</code> and glob patterns to match branch names. You can run different jobs for feature, release, and hotfix branches.',
    p_cicd_gitlab: '<strong>GitLab CI</strong> uses the <code>rules</code> keyword with regex patterns to control which jobs run on which branches. This allows fine-grained pipeline control based on branch naming.',

    h2_protected: 'Protected Branch Rules',
    p_protected: 'Protected branches prevent direct pushes and enforce code review. Combined with naming conventions, they create a robust workflow where critical branches cannot be accidentally modified.',
    p_protected_main: '<strong>Protect main and develop:</strong> Require pull request reviews before merging. No direct pushes allowed. Enable status checks (CI must pass) and require up-to-date branches before merging.',
    p_protected_pattern: '<strong>Branch protection patterns:</strong> GitHub and GitLab both support wildcard patterns. You can protect all release branches with <code>release/*</code> and all hotfix branches with <code>hotfix/*</code>.',

    h2_examples: 'Examples by Project Type',
    p_examples: 'Different project types and team sizes benefit from different conventions. Here are practical recommendations:',
    p_ex_opensource: '<strong>Open Source Projects:</strong> Use simple prefixes without ticket numbers. Contributors should not need access to your issue tracker to name a branch. Pattern: <code>feature/add-dark-mode</code>, <code>fix/broken-link-readme</code>. Keep the CONTRIBUTING.md updated with naming rules.',
    p_ex_startup: '<strong>Startups (2\u201310 developers):</strong> Use GitHub Flow with short prefixes and optional ticket IDs. Speed matters more than ceremony. Pattern: <code>feat/onboarding-flow</code>, <code>fix/signup-validation</code>. Use Linear or GitHub Issues for lightweight tracking.',
    p_ex_enterprise: '<strong>Enterprise Teams (50+ developers):</strong> Use Git Flow with mandatory ticket IDs and owner prefixes. Automate enforcement with hooks and CI. Pattern: <code>feature/PROJ-1234-payment-refund-api</code>, <code>hotfix/PROJ-5678-fix-rate-limiter</code>. Every branch must map to a tracked issue.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the best git branch naming convention?',
    faq1_a: 'The best convention depends on your team size and workflow. For most teams, the pattern type/TICKET-123-short-description works well. Use prefixes like feature/, bugfix/, hotfix/, release/, and chore/ to categorize work. The key is consistency \u2014 pick a format and enforce it across the entire team with Git hooks or CI checks.',
    faq2_q: 'Should I use slashes or hyphens in branch names?',
    faq2_a: 'Use both, but for different purposes. Slashes (/) separate the branch type prefix from the description (e.g., feature/add-login). Hyphens (-) separate words within the description. This creates a clear hierarchy that Git UIs display as folders. Avoid underscores as the primary separator, though they are valid.',
    faq3_q: 'How long should a git branch name be?',
    faq3_a: 'Keep branch names under 50-60 characters. While Git allows up to 255 characters, shorter names are easier to read in terminal output, Git GUIs, and pull request lists. A good branch name should be descriptive enough to understand at a glance but concise enough to type without errors. Example: feature/PROJ-123-add-oauth is better than feature/PROJ-123-add-oauth-login-with-google-and-github-providers.',
    faq4_q: 'Can I rename a git branch after creating it?',
    faq4_a: 'Yes. Use "git branch -m old-name new-name" to rename a local branch, or "git branch -m new-name" if you are on the branch you want to rename. If you have already pushed the old branch, you need to push the new name and delete the old one on the remote: "git push origin new-name" followed by "git push origin --delete old-name". Be careful with branches that have open pull requests, as the PR will still reference the old name.',
    faq5_q: 'How do I enforce branch naming conventions in a team?',
    faq5_a: 'Use a combination of Git hooks and CI checks. Locally, set up a pre-push hook (using Husky for JS projects or a custom script) that validates the branch name against a regex pattern. On the server side, configure branch protection rules in GitHub or GitLab to only allow branches matching specific patterns. You can also add a CI job that fails if the branch name does not match your convention. Document the rules in your CONTRIBUTING.md file.',

    p_conclusion: 'A consistent git branch naming convention transforms a messy repository into an organized, automated, and self-documenting codebase. Start with the basics, enforce with hooks, and iterate as your team grows. Try our tools below to streamline your Git workflow.',
    link_git_tool_bottom: 'Try the Git Command Generator \u2192',
    link_slug_tool_bottom: 'Create URL-friendly branch names with Slug Generator \u2192',
  },
  zh: {
    intro: '\u4e00\u4e2a\u660e\u786e\u7684 <strong>Git \u5206\u652f\u547d\u540d\u89c4\u8303</strong>\u662f\u9ad8\u6548\u56e2\u961f\u534f\u4f5c\u7684\u57fa\u77f3\u3002\u5f53\u6bcf\u4e2a\u5f00\u53d1\u8005\u90fd\u9075\u5faa\u76f8\u540c\u7684\u547d\u540d\u6a21\u5f0f\u65f6\uff0c\u4ee3\u7801\u5ba1\u67e5\u53d8\u5f97\u66f4\u5feb\uff0cCI/CD \u7ba1\u9053\u53ef\u4ee5\u6839\u636e\u5206\u652f\u7c7b\u578b\u81ea\u52a8\u90e8\u7f72\uff0c\u6574\u4e2a\u63d0\u4ea4\u5386\u53f2\u4e5f\u53d8\u5f97\u81ea\u6587\u6863\u5316\u3002\u672c\u5168\u9762\u6307\u5357\u6db5\u76d6\u4e86\u6700\u6d41\u884c\u7684\u5206\u652f\u547d\u540d\u7b56\u7565\u3001\u5f3a\u5236\u6267\u884c\u6280\u672f\u4ee5\u53ca\u5404\u79cd\u89c4\u6a21\u56e2\u961f\u7684\u5b9e\u9645\u793a\u4f8b\u3002',
    link_git_tool: '\u4f7f\u7528\u6211\u4eec\u7684 Git \u547d\u4ee4\u751f\u6210\u5668\u4ea4\u4e92\u5f0f\u751f\u6210\u547d\u4ee4 \u2192',
    link_slug_tool: '\u4f7f\u7528\u6211\u4eec\u7684 Slug \u751f\u6210\u5668\u521b\u5efa URL \u53cb\u597d\u7684\u522b\u540d \u2192',

    h2_why: '\u4e3a\u4ec0\u4e48\u5206\u652f\u547d\u540d\u89c4\u8303\u5f88\u91cd\u8981',
    p_why: '\u5206\u652f\u540d\u4e0d\u4ec5\u4ec5\u662f\u6807\u7b7e\uff0c\u5b83\u4eec\u662f\u6c9f\u901a\u5de5\u5177\uff0c\u544a\u8bc9\u4f60\u7684\u56e2\u961f\u6b63\u5728\u8fdb\u884c\u4ec0\u4e48\u5de5\u4f5c\u3001\u5c5e\u4e8e\u54ea\u4e2a\u6a21\u5757\u4ee5\u53ca\u5e94\u8be5\u5982\u4f55\u5904\u7406\u3002\u6ca1\u6709\u4e00\u81f4\u7684\u547d\u540d\u89c4\u8303\uff0c\u4ed3\u5e93\u5f88\u5feb\u5c31\u4f1a\u5145\u65a5\u7740\u201cfix\u201d\u3001\u201ctest2\u201d\u3001\u201cjohns-branch\u201d\u548c\u201cfinal-final-v3\u201d\u8fd9\u6837\u7684\u5206\u652f\u3002\u4ee5\u4e0b\u662f\u89c4\u8303\u91cd\u8981\u7684\u539f\u56e0\uff1a',
    p_why_collab: '<strong>\u56e2\u961f\u534f\u4f5c\uff1a</strong>\u5f53\u540c\u4e8b\u770b\u5230 <code>feature/PROJ-123-add-oauth-login</code> \u65f6\uff0c\u4ed6\u4eec\u7acb\u5373\u77e5\u9053\u8fd9\u662f\u4e00\u4e2a\u529f\u80fd\u5206\u652f\uff0c\u5173\u8054\u5de5\u5355 PROJ-123\uff0c\u4e0e OAuth \u767b\u5f55\u76f8\u5173\u3002\u4e0d\u9700\u8981\u53d1 Slack \u6d88\u606f\u8be2\u95ee\u3002',
    p_why_cicd: '<strong>CI/CD \u81ea\u52a8\u5316\uff1a</strong>\u6784\u5efa\u7cfb\u7edf\u53ef\u4ee5\u6839\u636e\u5206\u652f\u524d\u7f00\u89e6\u53d1\u4e0d\u540c\u7684\u7ba1\u9053\u3002\u529f\u80fd\u5206\u652f\u53ea\u8fd0\u884c\u6d4b\u8bd5\uff0c\u53d1\u5e03\u5206\u652f\u90e8\u7f72\u5230\u6d4b\u8bd5\u73af\u5883\uff0c\u70ed\u4fee\u590d\u5206\u652f\u5feb\u901f\u4e0a\u7ebf\u5230\u751f\u4ea7\u73af\u5883\u3002',
    p_why_read: '<strong>\u53ef\u8bfb\u6027\u548c\u53ef\u641c\u7d22\u6027\uff1a</strong>\u5728\u6709\u6570\u767e\u4e2a\u5206\u652f\u7684\u60c5\u51b5\u4e0b\uff0c\u4e00\u81f4\u7684\u547d\u540d\u4f7f <code>git branch --list "feature/*"</code> \u548c\u62c9\u53d6\u8bf7\u6c42\u8fc7\u6ee4\u5668\u771f\u6b63\u53d8\u5f97\u6709\u7528\u3002\u4f60\u53ef\u4ee5\u7acb\u5373\u627e\u5230\u4e0e\u7279\u5b9a\u533a\u57df\u76f8\u5173\u7684\u6240\u6709\u5de5\u4f5c\u3002',
    p_why_cleanup: '<strong>\u81ea\u52a8\u6e05\u7406\uff1a</strong>\u811a\u672c\u53ef\u4ee5\u6839\u636e\u547d\u540d\u6a21\u5f0f\u8bc6\u522b\u548c\u5220\u9664\u8fc7\u65f6\u5206\u652f\uff0c\u65e0\u9700\u624b\u52a8\u5e72\u9884\u5373\u53ef\u4fdd\u6301\u4ed3\u5e93\u6574\u6d01\u3002',

    h2_prefixes: '\u5e38\u89c1\u5206\u652f\u524d\u7f00',
    p_prefixes: '\u6700\u5e7f\u6cdb\u91c7\u7528\u7684\u89c4\u8303\u4f7f\u7528\u7c7b\u578b\u524d\u7f00\u52a0\u659c\u6760\u3002\u6bcf\u4e2a\u524d\u7f00\u8868\u660e\u5206\u652f\u7684\u610f\u56fe\u548c\u8303\u56f4\uff0c\u8ba9\u4eba\u7acb\u5373\u660e\u767d\u5206\u652f\u5305\u542b\u4ec0\u4e48\u7c7b\u578b\u7684\u5de5\u4f5c\u3002',
    p_prefix_feature: '<strong>feature/</strong> \u2014 \u65b0\u529f\u80fd\u6216\u589e\u5f3a\u3002\u8fd9\u662f\u6700\u5e38\u89c1\u7684\u524d\u7f00\u3002\u793a\u4f8b\uff1a<code>feature/user-profile-page</code>\u3001<code>feature/JIRA-456-search-api</code>',
    p_prefix_bugfix: '<strong>bugfix/</strong> \u2014 \u975e\u7d27\u6025\u7684\u9519\u8bef\u4fee\u590d\uff0c\u8ba1\u5212\u5728\u4e0b\u4e2a\u7248\u672c\u4e2d\u53d1\u5e03\u3002\u793a\u4f8b\uff1a<code>bugfix/fix-login-redirect</code>\u3001<code>bugfix/PROJ-789-null-pointer</code>',
    p_prefix_hotfix: '<strong>hotfix/</strong> \u2014 \u9700\u8981\u7acb\u5373\u90e8\u7f72\u7684\u7d27\u6025\u751f\u4ea7\u4fee\u590d\u3002\u793a\u4f8b\uff1a<code>hotfix/payment-gateway-timeout</code>\u3001<code>hotfix/security-patch-xss</code>',
    p_prefix_release: '<strong>release/</strong> \u2014 \u7528\u4e8e\u7248\u672c\u53d1\u5e03\u548c\u6700\u7ec8\u6d4b\u8bd5\u7684\u53d1\u5e03\u51c6\u5907\u5206\u652f\u3002\u793a\u4f8b\uff1a<code>release/2.1.0</code>\u3001<code>release/2024-q1-sprint</code>',
    p_prefix_chore: '<strong>chore/</strong> \u2014 \u7ef4\u62a4\u4efb\u52a1\u3001\u4f9d\u8d56\u66f4\u65b0\u3001\u914d\u7f6e\u53d8\u66f4\u3002\u793a\u4f8b\uff1a<code>chore/upgrade-node-20</code>\u3001<code>chore/update-ci-config</code>',
    p_prefix_docs: '<strong>docs/</strong> \u2014 \u4ec5\u6587\u6863\u53d8\u66f4\u3002\u793a\u4f8b\uff1a<code>docs/update-api-reference</code>\u3001<code>docs/add-contributing-guide</code>',
    p_prefix_test: '<strong>test/</strong> \u2014 \u6dfb\u52a0\u6216\u66f4\u65b0\u6d4b\u8bd5\u3002\u793a\u4f8b\uff1a<code>test/add-e2e-checkout-flow</code>\u3001<code>test/increase-coverage-auth</code>',
    p_prefix_refactor: '<strong>refactor/</strong> \u2014 \u4e0d\u6539\u53d8\u884c\u4e3a\u7684\u4ee3\u7801\u91cd\u6784\u3002\u793a\u4f8b\uff1a<code>refactor/extract-payment-service</code>\u3001<code>refactor/simplify-middleware</code>',

    h2_format: '\u683c\u5f0f\u6a21\u5f0f\u4e0e\u793a\u4f8b',
    p_format: '\u6700\u6709\u6548\u7684\u5206\u652f\u547d\u540d\u683c\u5f0f\u7ed3\u5408\u4e86\u7c7b\u578b\u524d\u7f00\u3001\u53ef\u9009\u7684\u5de5\u5355\u53f7\u548c\u7b80\u77ed\u7684 kebab-case \u63cf\u8ff0\u3002\u4ee5\u4e0b\u662f\u884c\u4e1a\u4e2d\u6700\u5e38\u7528\u7684\u6a21\u5f0f\uff1a',
    p_format_pattern1: '<strong>\u6a21\u5f0f 1\uff1atype/description</strong> \u2014 \u7b80\u5355\u6e05\u6670\uff0c\u9002\u5408\u5c0f\u56e2\u961f\u6216\u6ca1\u6709\u5de5\u5355\u7cfb\u7edf\u7684\u5f00\u6e90\u9879\u76ee\u3002',
    p_format_pattern2: '<strong>\u6a21\u5f0f 2\uff1atype/TICKET-123-description</strong> \u2014 \u4f01\u4e1a\u56e2\u961f\u7684\u9ec4\u91d1\u6807\u51c6\u3002\u5c06\u5206\u652f\u76f4\u63a5\u94fe\u63a5\u5230 Jira\u3001Linear \u6216 GitHub Issues \u7b49\u5de5\u5355\u8ffd\u8e2a\u5668\u3002',
    p_format_pattern3: '<strong>\u6a21\u5f0f 3\uff1ausername/type/description</strong> \u2014 \u5728\u5927\u578b\u7ec4\u7ec7\u4e2d\u5f88\u6709\u7528\uff0c\u53ef\u4ee5\u4e00\u773c\u770b\u51fa\u8c01\u62e5\u6709\u8fd9\u4e2a\u5206\u652f\u3002',

    h2_rules: '\u5206\u652f\u547d\u540d\u89c4\u5219',
    p_rules: 'Git \u5bf9\u5206\u652f\u540d\u6709\u7279\u5b9a\u7684\u6280\u672f\u7ea6\u675f\uff0c\u56e2\u961f\u5728\u6b64\u57fa\u7840\u4e0a\u6dfb\u52a0\u81ea\u5df1\u7684\u89c4\u8303\u3002\u9075\u5faa\u8fd9\u4e9b\u89c4\u5219\u53ef\u4ee5\u9632\u6b62\u9519\u8bef\u5e76\u4fdd\u6301\u4ed3\u5e93\u4e00\u81f4\u6027\uff1a',
    p_rule_nospaces: '<strong>\u4e0d\u80fd\u6709\u7a7a\u683c\uff1a</strong>Git \u4e0d\u5141\u8bb8\u5206\u652f\u540d\u4e2d\u5305\u542b\u7a7a\u683c\u3002\u4f7f\u7528\u8fde\u5b57\u7b26\uff08<code>-</code>\uff09\u6216\u4e0b\u5212\u7ebf\uff08<code>_</code>\uff09\u4f5c\u4e3a\u5206\u9694\u7b26\u3002\u8fde\u5b57\u7b26\u662f\u884c\u4e1a\u6807\u51c6\u3002',
    p_rule_chars: '<strong>\u5141\u8bb8\u7684\u5b57\u7b26\uff1a</strong>\u4f7f\u7528\u5c0f\u5199\u5b57\u6bcd\u6570\u5b57\u3001\u8fde\u5b57\u7b26\u3001\u4e0b\u5212\u7ebf\u548c\u659c\u6760\u3002\u907f\u514d\u7279\u6b8a\u5b57\u7b26\uff0c\u5982 <code>~</code>\u3001<code>^</code>\u3001<code>:</code>\u3001<code>?</code>\u3001<code>*</code>\u3001<code>[</code>\u3001<code>\\</code> \u548c\u8fde\u7eed\u7684\u70b9\uff08<code>..</code>\uff09\u3002',
    p_rule_length: '<strong>\u6700\u5927\u957f\u5ea6\uff1a</strong>\u867d\u7136 Git \u6280\u672f\u4e0a\u5141\u8bb8\u6700\u591a 255 \u4e2a\u5b57\u7b26\uff0c\u4f46\u5e94\u5c06\u5206\u652f\u540d\u4fdd\u6301\u5728 50-60 \u4e2a\u5b57\u7b26\u4ee5\u5185\u4ee5\u63d0\u9ad8\u53ef\u8bfb\u6027\u3002\u957f\u540d\u79f0\u5728\u5927\u591a\u6570 Git UI \u4e2d\u4f1a\u88ab\u622a\u65ad\uff0c\u4e14\u96be\u4ee5\u8f93\u5165\u3002',
    p_rule_case: '<strong>\u5927\u5c0f\u5199\u89c4\u8303\uff1a</strong>\u5168\u90e8\u4f7f\u7528\u5c0f\u5199\u3002\u6df7\u5408\u5927\u5c0f\u5199\u4f1a\u5bfc\u81f4\u6df7\u6dc6\uff0c\u5e76\u4e14\u5728\u4e0d\u533a\u5206\u5927\u5c0f\u5199\u7684\u6587\u4ef6\u7cfb\u7edf\uff08\u5982 macOS \u548c Windows\uff09\u4e0a\u53ef\u80fd\u4f1a\u9020\u6210\u95ee\u9898\u3002\u552f\u4e00\u7684\u4f8b\u5916\u662f\u5de5\u5355 ID\uff0c\u901a\u5e38\u4e3a\u5927\u5199\uff08\u4f8b\u5982 PROJ-123\uff09\u3002',
    p_rule_nodot: '<strong>\u4e0d\u80fd\u4ee5\u70b9\u6216 .lock \u7ed3\u5c3e\uff1a</strong>\u5206\u652f\u540d\u4e0d\u80fd\u4ee5 <code>.lock</code> \u6216\u53e5\u53f7\u7ed3\u5c3e\uff0c\u4e5f\u4e0d\u80fd\u4ee5\u8fde\u5b57\u7b26\u5f00\u5934\u3002',

    h2_gitflow: 'Git Flow \u5206\u652f\u7b56\u7565',
    p_gitflow: 'Git Flow \u7531 Vincent Driessen \u4e8e 2010 \u5e74\u63d0\u51fa\uff0c\u662f\u6700\u7ed3\u6784\u5316\u7684\u5206\u652f\u6a21\u578b\u3002\u5b83\u4f7f\u7528\u591a\u4e2a\u957f\u671f\u5206\u652f\u548c\u4e25\u683c\u7684\u5de5\u4f5c\u6d41\uff0c\u975e\u5e38\u9002\u5408\u6709\u8ba1\u5212\u53d1\u5e03\u7684\u9879\u76ee\u3002',
    p_gitflow_main: '<strong>main</strong>\uff08\u6216 master\uff09\u2014 \u59cb\u7ec8\u53cd\u6620\u751f\u4ea7\u5c31\u7eea\u72b6\u6001\u3002main \u4e0a\u7684\u6bcf\u4e2a\u63d0\u4ea4\u90fd\u5e94\u8be5\u662f\u7ecf\u8fc7\u6d4b\u8bd5\u7684\u53d1\u5e03\u3002',
    p_gitflow_develop: '<strong>develop</strong> \u2014 \u529f\u80fd\u6c47\u805a\u7684\u96c6\u6210\u5206\u652f\u3002\u8be5\u5206\u652f\u59cb\u7ec8\u5305\u542b\u4e0b\u4e00\u4e2a\u7248\u672c\u7684\u6700\u65b0\u5f00\u53d1\u53d8\u66f4\u3002',
    p_gitflow_feature: '<strong>feature/*</strong> \u2014 \u4ece develop \u5206\u652f\u521b\u5efa\uff0c\u5408\u5e76\u56de develop\u3002\u6bcf\u4e2a\u529f\u80fd\u90fd\u6709\u81ea\u5df1\u7684\u5206\u652f\u3002',
    p_gitflow_release: '<strong>release/*</strong> \u2014 \u5f53\u529f\u80fd\u5b8c\u6210\u65f6\u4ece develop \u5206\u652f\u521b\u5efa\u3002\u7528\u4e8e\u6700\u7ec8\u6d4b\u8bd5\u3001\u7248\u672c\u53f7\u66f4\u65b0\u548c\u6587\u6863\u7f16\u5199\uff0c\u7136\u540e\u5408\u5e76\u5230 main \u548c develop\u3002',
    p_gitflow_hotfix: '<strong>hotfix/*</strong> \u2014 \u4ece main \u5206\u652f\u521b\u5efa\uff0c\u7528\u4e8e\u7d27\u6025\u751f\u4ea7\u4fee\u590d\u3002\u5408\u5e76\u56de main \u548c develop\u3002',

    h2_githubflow: 'GitHub Flow\uff1a\u7b80\u5316\u7684\u5206\u652f\u6a21\u5f0f',
    p_githubflow: 'GitHub Flow \u662f Git Flow \u7684\u8f7b\u91cf\u7ea7\u66ff\u4ee3\u65b9\u6848\u3002\u5b83\u53ea\u6709\u4e00\u4e2a\u89c4\u5219\uff1a<code>main</code> \u4e0a\u7684\u4efb\u4f55\u5185\u5bb9\u90fd\u662f\u53ef\u90e8\u7f72\u7684\u3002\u6240\u6709\u5de5\u4f5c\u90fd\u5728\u529f\u80fd\u5206\u652f\u4e2d\u8fdb\u884c\uff0c\u901a\u8fc7\u62c9\u53d6\u8bf7\u6c42\u5408\u5e76\u3002\u8fd9\u79cd\u6a21\u5f0f\u6700\u9002\u5408\u5b9e\u8df5\u6301\u7eed\u90e8\u7f72\u7684\u56e2\u961f\u3002',
    p_githubflow_steps: '\u5de5\u4f5c\u6d41\u5f88\u7b80\u5355\uff1a\uff081\uff09\u4ece main \u521b\u5efa\u5206\u652f\uff0c\uff082\uff09\u6dfb\u52a0\u63d0\u4ea4\uff0c\uff083\uff09\u5f00\u542f\u62c9\u53d6\u8bf7\u6c42\uff0c\uff084\uff09\u8ba8\u8bba\u548c\u5ba1\u67e5\u4ee3\u7801\uff0c\uff085\uff09\u4ece\u5206\u652f\u90e8\u7f72\u8fdb\u884c\u6d4b\u8bd5\uff0c\uff086\uff09\u5408\u5e76\u5230 main\u3002\u6ca1\u6709 develop\u3001release \u6216 hotfix \u5206\u652f\u2014\u2014\u53ea\u6709 main \u548c\u529f\u80fd\u5206\u652f\u3002',

    h2_trunk: '\u4e3b\u5e72\u5f00\u53d1\uff08Trunk-Based Development\uff09',
    p_trunk: '\u4e3b\u5e72\u5f00\u53d1\u5c06\u7b80\u5316\u505a\u5230\u4e86\u6781\u81f4\u3002\u5f00\u53d1\u8005\u76f4\u63a5\u63d0\u4ea4\u5230\u5355\u4e00\u5206\u652f\uff08trunk/main\uff09\uff0c\u6216\u4f7f\u7528\u975e\u5e38\u77ed\u547d\u7684\u529f\u80fd\u5206\u652f\uff0c\u53ea\u6301\u7eed\u51e0\u4e2a\u5c0f\u65f6\u800c\u4e0d\u662f\u51e0\u5929\u3002\u8fd9\u79cd\u7b56\u7565\u9700\u8981\u5f3a\u5927\u7684\u6d4b\u8bd5\u8986\u76d6\u7387\u548c\u529f\u80fd\u6807\u5fd7\u6765\u7ba1\u7406\u672a\u53d1\u5e03\u7684\u4ee3\u7801\u3002',
    p_trunk_shortlived: '<strong>\u77ed\u547d\u5206\u652f\uff1a</strong>\u529f\u80fd\u5206\u652f\u53ea\u5b58\u5728\u51e0\u4e2a\u5c0f\u65f6\u5230\u6700\u591a\u4e24\u5929\u3002\u5b83\u4eec\u5c0f\u800c\u96c6\u4e2d\uff0c\u9891\u7e41\u5408\u5e76\u4ee5\u907f\u514d\u504f\u79bb\u3002',
    p_trunk_flags: '<strong>\u529f\u80fd\u6807\u5fd7\uff1a</strong>\u672a\u5b8c\u6210\u7684\u529f\u80fd\u9690\u85cf\u5728\u529f\u80fd\u6807\u5fd7\uff08\u4e5f\u79f0\u529f\u80fd\u5f00\u5173\uff09\u540e\u9762\uff0c\u5141\u8bb8\u4ee3\u7801\u5408\u5e76\u5230 main \u800c\u4e0d\u4f1a\u5bf9\u7528\u6237\u53ef\u89c1\u3002\u8fd9\u6d88\u9664\u4e86\u5bf9\u957f\u671f\u8fd0\u884c\u5206\u652f\u7684\u9700\u6c42\u3002',
    p_trunk_ci: '<strong>\u6301\u7eed\u96c6\u6210\uff1a</strong>\u6bcf\u6b21\u63d0\u4ea4\u5230\u4e3b\u5e72\u90fd\u4f1a\u89e6\u53d1\u5b8c\u6574\u7684 CI \u7ba1\u9053\u3002\u4e3b\u5e72\u59cb\u7ec8\u5904\u4e8e\u53ef\u53d1\u5e03\u72b6\u6001\u3002\u8fd9\u662f Google\u3001Meta \u548c\u8bb8\u591a\u9ad8\u6548\u80fd\u5de5\u7a0b\u56e2\u961f\u91c7\u7528\u7684\u6a21\u5f0f\u3002',

    h2_enforcement: '\u4f7f\u7528 Git Hooks \u81ea\u52a8\u5f3a\u5236\u6267\u884c',
    p_enforcement: '\u89c4\u8303\u7684\u4ef7\u503c\u53d6\u51b3\u4e8e\u5176\u6267\u884c\u529b\u5ea6\u3002Git hooks \u5141\u8bb8\u4f60\u5728\u4ee3\u7801\u63a8\u9001\u524d\u81ea\u52a8\u9a8c\u8bc1\u5206\u652f\u540d\uff0c\u786e\u4fdd\u6bcf\u4e2a\u5206\u652f\u90fd\u9075\u5faa\u56e2\u961f\u7684\u547d\u540d\u89c4\u5219\u3002',
    p_enforcement_prepush: '<code>pre-push</code> hook \u5728\u4efb\u4f55\u63a8\u9001\u5230\u8fdc\u7a0b\u4e4b\u524d\u5728\u672c\u5730\u8fd0\u884c\u3002\u5b83\u53ef\u4ee5\u5c06\u5206\u652f\u540d\u4e0e\u6b63\u5219\u8868\u8fbe\u5f0f\u6a21\u5f0f\u5339\u914d\uff0c\u5e76\u62d2\u7edd\u4e0d\u7b26\u5408\u89c4\u8303\u7684\u5206\u652f\u7684\u63a8\u9001\u3002',
    p_enforcement_husky: '<strong>Husky</strong> \u662f JavaScript/TypeScript \u9879\u76ee\u4e2d\u6700\u6d41\u884c\u7684 Git hooks \u7ba1\u7406\u5de5\u5177\u3002\u5b83\u4f7f hooks \u7684\u5b89\u88c5\u548c\u56e2\u961f\u5171\u4eab\u53d8\u5f97\u8f7b\u800c\u6613\u4e3e\u3002',

    h2_cicd: 'CI/CD \u4e0e\u5206\u652f\u6a21\u5f0f\u96c6\u6210',
    p_cicd: '\u73b0\u4ee3 CI/CD \u7cfb\u7edf\u4f7f\u7528\u5206\u652f\u6a21\u5f0f\u89e6\u53d1\u4e0d\u540c\u7684\u5de5\u4f5c\u6d41\u3002\u901a\u8fc7\u9075\u5faa\u4e00\u81f4\u7684\u5206\u652f\u547d\u540d\u89c4\u8303\uff0c\u4f60\u53ef\u4ee5\u6839\u636e\u5206\u652f\u524d\u7f00\u81ea\u52a8\u5316\u6574\u4e2a\u6784\u5efa\u3001\u6d4b\u8bd5\u548c\u90e8\u7f72\u7ba1\u9053\u3002',
    p_cicd_github: '<strong>GitHub Actions</strong> \u4f7f\u7528 <code>on.push.branches</code> \u548c glob \u6a21\u5f0f\u6765\u5339\u914d\u5206\u652f\u540d\u3002\u4f60\u53ef\u4ee5\u4e3a feature\u3001release \u548c hotfix \u5206\u652f\u8fd0\u884c\u4e0d\u540c\u7684\u4efb\u52a1\u3002',
    p_cicd_gitlab: '<strong>GitLab CI</strong> \u4f7f\u7528 <code>rules</code> \u5173\u952e\u5b57\u548c\u6b63\u5219\u8868\u8fbe\u5f0f\u6a21\u5f0f\u6765\u63a7\u5236\u54ea\u4e9b\u4efb\u52a1\u5728\u54ea\u4e9b\u5206\u652f\u4e0a\u8fd0\u884c\u3002\u8fd9\u5141\u8bb8\u57fa\u4e8e\u5206\u652f\u547d\u540d\u8fdb\u884c\u7ec6\u7c92\u5ea6\u7684\u7ba1\u9053\u63a7\u5236\u3002',

    h2_protected: '\u53d7\u4fdd\u62a4\u5206\u652f\u89c4\u5219',
    p_protected: '\u53d7\u4fdd\u62a4\u5206\u652f\u9632\u6b62\u76f4\u63a5\u63a8\u9001\u5e76\u5f3a\u5236\u4ee3\u7801\u5ba1\u67e5\u3002\u7ed3\u5408\u547d\u540d\u89c4\u8303\uff0c\u5b83\u4eec\u521b\u5efa\u4e86\u4e00\u4e2a\u5065\u58ee\u7684\u5de5\u4f5c\u6d41\uff0c\u5173\u952e\u5206\u652f\u4e0d\u4f1a\u88ab\u610f\u5916\u4fee\u6539\u3002',
    p_protected_main: '<strong>\u4fdd\u62a4 main \u548c develop\uff1a</strong>\u5408\u5e76\u524d\u9700\u8981\u62c9\u53d6\u8bf7\u6c42\u5ba1\u67e5\u3002\u4e0d\u5141\u8bb8\u76f4\u63a5\u63a8\u9001\u3002\u542f\u7528\u72b6\u6001\u68c0\u67e5\uff08CI \u5fc5\u987b\u901a\u8fc7\uff09\uff0c\u5e76\u8981\u6c42\u5408\u5e76\u524d\u5206\u652f\u662f\u6700\u65b0\u7684\u3002',
    p_protected_pattern: '<strong>\u5206\u652f\u4fdd\u62a4\u6a21\u5f0f\uff1a</strong>GitHub \u548c GitLab \u90fd\u652f\u6301\u901a\u914d\u7b26\u6a21\u5f0f\u3002\u4f60\u53ef\u4ee5\u7528 <code>release/*</code> \u4fdd\u62a4\u6240\u6709\u53d1\u5e03\u5206\u652f\uff0c\u7528 <code>hotfix/*</code> \u4fdd\u62a4\u6240\u6709\u70ed\u4fee\u590d\u5206\u652f\u3002',

    h2_examples: '\u6309\u9879\u76ee\u7c7b\u578b\u5206\u7c7b\u7684\u793a\u4f8b',
    p_examples: '\u4e0d\u540c\u7684\u9879\u76ee\u7c7b\u578b\u548c\u56e2\u961f\u89c4\u6a21\u9002\u5408\u4e0d\u540c\u7684\u89c4\u8303\u3002\u4ee5\u4e0b\u662f\u5b9e\u7528\u5efa\u8bae\uff1a',
    p_ex_opensource: '<strong>\u5f00\u6e90\u9879\u76ee\uff1a</strong>\u4f7f\u7528\u7b80\u5355\u524d\u7f00\uff0c\u4e0d\u5e26\u5de5\u5355\u53f7\u3002\u8d21\u732e\u8005\u4e0d\u5e94\u8be5\u9700\u8981\u8bbf\u95ee\u4f60\u7684\u5de5\u5355\u7cfb\u7edf\u6765\u547d\u540d\u5206\u652f\u3002\u6a21\u5f0f\uff1a<code>feature/add-dark-mode</code>\u3001<code>fix/broken-link-readme</code>\u3002\u5728 CONTRIBUTING.md \u4e2d\u66f4\u65b0\u547d\u540d\u89c4\u5219\u3002',
    p_ex_startup: '<strong>\u521d\u521b\u516c\u53f8\uff082-10 \u4e2a\u5f00\u53d1\u8005\uff09\uff1a</strong>\u4f7f\u7528 GitHub Flow\uff0c\u77ed\u524d\u7f00\u52a0\u53ef\u9009\u7684\u5de5\u5355 ID\u3002\u901f\u5ea6\u6bd4\u4eea\u5f0f\u66f4\u91cd\u8981\u3002\u6a21\u5f0f\uff1a<code>feat/onboarding-flow</code>\u3001<code>fix/signup-validation</code>\u3002\u4f7f\u7528 Linear \u6216 GitHub Issues \u8fdb\u884c\u8f7b\u91cf\u7ea7\u8ddf\u8e2a\u3002',
    p_ex_enterprise: '<strong>\u4f01\u4e1a\u56e2\u961f\uff0850+ \u5f00\u53d1\u8005\uff09\uff1a</strong>\u4f7f\u7528 Git Flow\uff0c\u5f3a\u5236\u8981\u6c42\u5de5\u5355 ID \u548c\u6240\u6709\u8005\u524d\u7f00\u3002\u4f7f\u7528 hooks \u548c CI \u81ea\u52a8\u6267\u884c\u3002\u6a21\u5f0f\uff1a<code>feature/PROJ-1234-payment-refund-api</code>\u3001<code>hotfix/PROJ-5678-fix-rate-limiter</code>\u3002\u6bcf\u4e2a\u5206\u652f\u5fc5\u987b\u6620\u5c04\u5230\u4e00\u4e2a\u88ab\u8ddf\u8e2a\u7684\u5de5\u5355\u3002',

    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: '\u6700\u4f73\u7684 Git \u5206\u652f\u547d\u540d\u89c4\u8303\u662f\u4ec0\u4e48\uff1f',
    faq1_a: '\u6700\u4f73\u89c4\u8303\u53d6\u51b3\u4e8e\u4f60\u7684\u56e2\u961f\u89c4\u6a21\u548c\u5de5\u4f5c\u6d41\u3002\u5bf9\u4e8e\u5927\u591a\u6570\u56e2\u961f\uff0ctype/TICKET-123-short-description \u6a21\u5f0f\u5f88\u5408\u9002\u3002\u4f7f\u7528 feature/\u3001bugfix/\u3001hotfix/\u3001release/ \u548c chore/ \u7b49\u524d\u7f00\u5bf9\u5de5\u4f5c\u8fdb\u884c\u5206\u7c7b\u3002\u5173\u952e\u662f\u4e00\u81f4\u6027\u2014\u2014\u9009\u62e9\u4e00\u79cd\u683c\u5f0f\u5e76\u901a\u8fc7 Git hooks \u6216 CI \u68c0\u67e5\u5728\u6574\u4e2a\u56e2\u961f\u4e2d\u5f3a\u5236\u6267\u884c\u3002',
    faq2_q: '\u5206\u652f\u540d\u5e94\u8be5\u7528\u659c\u6760\u8fd8\u662f\u8fde\u5b57\u7b26\uff1f',
    faq2_a: '\u4e24\u8005\u90fd\u7528\uff0c\u4f46\u7528\u9014\u4e0d\u540c\u3002\u659c\u6760\uff08/\uff09\u5c06\u5206\u652f\u7c7b\u578b\u524d\u7f00\u4e0e\u63cf\u8ff0\u5206\u5f00\uff08\u4f8b\u5982 feature/add-login\uff09\u3002\u8fde\u5b57\u7b26\uff08-\uff09\u5206\u9694\u63cf\u8ff0\u4e2d\u7684\u5355\u8bcd\u3002\u8fd9\u521b\u5efa\u4e86\u4e00\u4e2a\u6e05\u6670\u7684\u5c42\u6b21\u7ed3\u6784\uff0cGit UI \u4f1a\u5c06\u5176\u663e\u793a\u4e3a\u6587\u4ef6\u5939\u3002\u5c3d\u91cf\u907f\u514d\u4f7f\u7528\u4e0b\u5212\u7ebf\u4f5c\u4e3a\u4e3b\u8981\u5206\u9694\u7b26\uff0c\u5c3d\u7ba1\u5b83\u662f\u6709\u6548\u7684\u3002',
    faq3_q: 'Git \u5206\u652f\u540d\u5e94\u8be5\u591a\u957f\uff1f',
    faq3_a: '\u5c06\u5206\u652f\u540d\u4fdd\u6301\u5728 50-60 \u4e2a\u5b57\u7b26\u4ee5\u5185\u3002\u867d\u7136 Git \u5141\u8bb8\u6700\u591a 255 \u4e2a\u5b57\u7b26\uff0c\u4f46\u8f83\u77ed\u7684\u540d\u79f0\u5728\u7ec8\u7aef\u8f93\u51fa\u3001Git GUI \u548c\u62c9\u53d6\u8bf7\u6c42\u5217\u8868\u4e2d\u66f4\u5bb9\u6613\u9605\u8bfb\u3002\u597d\u7684\u5206\u652f\u540d\u5e94\u8be5\u8db3\u591f\u63cf\u8ff0\u6027\u4ee5\u4fbf\u4e00\u7784\u5373\u61c2\uff0c\u4f46\u8db3\u591f\u7b80\u6d01\u4ee5\u907f\u514d\u8f93\u5165\u9519\u8bef\u3002\u4f8b\u5982\uff1afeature/PROJ-123-add-oauth \u6bd4 feature/PROJ-123-add-oauth-login-with-google-and-github-providers \u66f4\u597d\u3002',
    faq4_q: '\u521b\u5efa\u5206\u652f\u540e\u53ef\u4ee5\u91cd\u547d\u540d\u5417\uff1f',
    faq4_a: '\u53ef\u4ee5\u3002\u4f7f\u7528 "git branch -m old-name new-name" \u91cd\u547d\u540d\u672c\u5730\u5206\u652f\uff0c\u6216\u4f7f\u7528 "git branch -m new-name"\uff08\u5982\u679c\u4f60\u5728\u8981\u91cd\u547d\u540d\u7684\u5206\u652f\u4e0a\uff09\u3002\u5982\u679c\u5df2\u7ecf\u63a8\u9001\u4e86\u65e7\u5206\u652f\uff0c\u9700\u8981\u63a8\u9001\u65b0\u540d\u79f0\u5e76\u5220\u9664\u8fdc\u7a0b\u7684\u65e7\u5206\u652f\uff1a"git push origin new-name" \u7136\u540e "git push origin --delete old-name"\u3002\u6ce8\u610f\u6709\u5f00\u653e PR \u7684\u5206\u652f\uff0cPR \u4ecd\u4f1a\u5f15\u7528\u65e7\u540d\u79f0\u3002',
    faq5_q: '\u5982\u4f55\u5728\u56e2\u961f\u4e2d\u5f3a\u5236\u6267\u884c\u5206\u652f\u547d\u540d\u89c4\u8303\uff1f',
    faq5_a: '\u7ed3\u5408\u4f7f\u7528 Git hooks \u548c CI \u68c0\u67e5\u3002\u5728\u672c\u5730\uff0c\u8bbe\u7f6e pre-push hook\uff08JS \u9879\u76ee\u4f7f\u7528 Husky\uff0c\u6216\u81ea\u5b9a\u4e49\u811a\u672c\uff09\u6839\u636e\u6b63\u5219\u8868\u8fbe\u5f0f\u6a21\u5f0f\u9a8c\u8bc1\u5206\u652f\u540d\u3002\u5728\u670d\u52a1\u5668\u7aef\uff0c\u5728 GitHub \u6216 GitLab \u4e2d\u914d\u7f6e\u5206\u652f\u4fdd\u62a4\u89c4\u5219\uff0c\u53ea\u5141\u8bb8\u7b26\u5408\u7279\u5b9a\u6a21\u5f0f\u7684\u5206\u652f\u3002\u4f60\u8fd8\u53ef\u4ee5\u6dfb\u52a0\u4e00\u4e2a CI \u4efb\u52a1\uff0c\u5982\u679c\u5206\u652f\u540d\u4e0d\u7b26\u5408\u89c4\u8303\u5219\u5931\u8d25\u3002\u5728 CONTRIBUTING.md \u6587\u4ef6\u4e2d\u8bb0\u5f55\u89c4\u5219\u3002',

    p_conclusion: '\u4e00\u81f4\u7684 Git \u5206\u652f\u547d\u540d\u89c4\u8303\u53ef\u4ee5\u5c06\u6df7\u4e71\u7684\u4ed3\u5e93\u8f6c\u53d8\u4e3a\u4e00\u4e2a\u6709\u7ec4\u7ec7\u3001\u81ea\u52a8\u5316\u4e14\u81ea\u6587\u6863\u5316\u7684\u4ee3\u7801\u5e93\u3002\u4ece\u57fa\u7840\u5f00\u59cb\uff0c\u7528 hooks \u5f3a\u5236\u6267\u884c\uff0c\u968f\u56e2\u961f\u589e\u957f\u8fed\u4ee3\u4f18\u5316\u3002\u8bd5\u8bd5\u6211\u4eec\u4e0b\u9762\u7684\u5de5\u5177\u6765\u7b80\u5316\u4f60\u7684 Git \u5de5\u4f5c\u6d41\u3002',
    link_git_tool_bottom: '\u8bd5\u8bd5 Git \u547d\u4ee4\u751f\u6210\u5668 \u2192',
    link_slug_tool_bottom: '\u4f7f\u7528 Slug \u751f\u6210\u5668\u521b\u5efa URL \u53cb\u597d\u7684\u5206\u652f\u540d \u2192',
  },
};

export default function GitBranchNamingConvention({ lang }: { lang: string }) {
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
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <p>
        <Link href={`/${lang}/tools/git-command-generator`} style={{ fontWeight: 600 }}>
          {s.link_git_tool}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/slug-generator`} style={{ fontWeight: 600 }}>
          {s.link_slug_tool}
        </Link>
      </p>

      {/* ============================================================ */}
      {/* 1. WHY NAMING CONVENTIONS MATTER */}
      {/* ============================================================ */}
      <h2>{s.h2_why}</h2>
      <p>{s.p_why}</p>
      <p dangerouslySetInnerHTML={{ __html: s.p_why_collab }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_why_cicd }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_why_read }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_why_cleanup }} />

      <pre><code>{`# Without conventions - chaos:
git branch
  fix
  test2
  johns-branch
  final-final-v3
  new-feature
  temp

# With conventions - clarity:
git branch
  feature/PROJ-101-user-dashboard
  feature/PROJ-102-search-api
  bugfix/PROJ-200-login-redirect
  hotfix/PROJ-301-payment-timeout
  release/2.1.0
  chore/upgrade-dependencies`}</code></pre>

      {/* ============================================================ */}
      {/* 2. COMMON PREFIXES */}
      {/* ============================================================ */}
      <h2>{s.h2_prefixes}</h2>
      <p>{s.p_prefixes}</p>
      <p dangerouslySetInnerHTML={{ __html: s.p_prefix_feature }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_prefix_bugfix }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_prefix_hotfix }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_prefix_release }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_prefix_chore }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_prefix_docs }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_prefix_test }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_prefix_refactor }} />

      <pre><code>{`# Creating branches with proper prefixes
git checkout -b feature/add-user-authentication
git checkout -b bugfix/fix-cart-total-calculation
git checkout -b hotfix/critical-security-patch
git checkout -b release/3.0.0
git checkout -b chore/update-eslint-config
git checkout -b docs/add-api-documentation
git checkout -b test/add-integration-tests
git checkout -b refactor/extract-auth-module`}</code></pre>

      {/* ============================================================ */}
      {/* 3. FORMAT PATTERNS */}
      {/* ============================================================ */}
      <h2>{s.h2_format}</h2>
      <p>{s.p_format}</p>
      <p dangerouslySetInnerHTML={{ __html: s.p_format_pattern1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_format_pattern2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_format_pattern3 }} />

      <pre><code>{`# Pattern 1: type/description (simple)
feature/add-dark-mode
bugfix/fix-email-validation
hotfix/patch-sql-injection

# Pattern 2: type/TICKET-ID-description (enterprise)
feature/PROJ-123-add-oauth-login
bugfix/PROJ-456-fix-null-pointer
hotfix/PROJ-789-fix-payment-gateway

# Pattern 3: username/type/description (large teams)
john/feature/add-search-filters
sarah/bugfix/fix-timezone-offset
alex/hotfix/fix-rate-limiter

# Creating a branch with ticket ID
git checkout -b feature/PROJ-123-add-oauth-login

# Listing branches by prefix
git branch --list "feature/*"
git branch --list "hotfix/*"
git branch --list "*/PROJ-123*"`}</code></pre>

      {/* ============================================================ */}
      {/* 4. BRANCH NAMING RULES */}
      {/* ============================================================ */}
      <h2>{s.h2_rules}</h2>
      <p>{s.p_rules}</p>
      <p dangerouslySetInnerHTML={{ __html: s.p_rule_nospaces }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_rule_chars }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_rule_length }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_rule_case }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_rule_nodot }} />

      <pre><code>{`# VALID branch names
feature/add-login-page
bugfix/PROJ-123-fix-null-check
release/2.1.0
chore/update-deps
john/feature/dark-mode

# INVALID branch names
feature/add login page       # spaces not allowed
feature/add..login           # consecutive dots not allowed
-feature/login               # cannot start with hyphen
feature/login.lock           # cannot end with .lock
feature/add~login            # tilde not allowed
feature/add:login            # colon not allowed

# Check if a branch name is valid before creating
git check-ref-format --branch "feature/my-new-branch"

# Rename a poorly named branch
git branch -m "bad name" feature/proper-name`}</code></pre>

      {/* ============================================================ */}
      {/* 5. GIT FLOW */}
      {/* ============================================================ */}
      <h2>{s.h2_gitflow}</h2>
      <p>{s.p_gitflow}</p>
      <p dangerouslySetInnerHTML={{ __html: s.p_gitflow_main }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_gitflow_develop }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_gitflow_feature }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_gitflow_release }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_gitflow_hotfix }} />

      <pre><code>{`# Git Flow branch structure:
#
#  main ─────────●────────────●──────────●───▶ (production releases)
#                │            ▲          ▲
#                │         merge      merge
#                │            │          │
#  release/ ─────┼────── release/2.0 ────┘
#                │            ▲
#                │         merge
#                │            │
#  develop ──●───●───●───●────●───●───●──────▶ (integration)
#            │       ▲   │        ▲
#         branch  merge branch  merge
#            │       │   │        │
#  feature/ ─┴───●───┘   └──●────┘
#
#  hotfix/ ──────────────────────────── (from main, merge to main + develop)

# Start a new feature
git checkout develop
git checkout -b feature/PROJ-100-user-auth

# Complete a feature
git checkout develop
git merge --no-ff feature/PROJ-100-user-auth
git branch -d feature/PROJ-100-user-auth

# Start a release
git checkout develop
git checkout -b release/2.0.0

# Complete a release
git checkout main
git merge --no-ff release/2.0.0
git tag -a v2.0.0 -m "Release 2.0.0"
git checkout develop
git merge --no-ff release/2.0.0
git branch -d release/2.0.0

# Start a hotfix
git checkout main
git checkout -b hotfix/fix-critical-bug

# Complete a hotfix
git checkout main
git merge --no-ff hotfix/fix-critical-bug
git tag -a v2.0.1 -m "Hotfix 2.0.1"
git checkout develop
git merge --no-ff hotfix/fix-critical-bug
git branch -d hotfix/fix-critical-bug`}</code></pre>

      {/* ============================================================ */}
      {/* 6. GITHUB FLOW */}
      {/* ============================================================ */}
      <h2>{s.h2_githubflow}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.p_githubflow }} />
      <p>{s.p_githubflow_steps}</p>

      <pre><code>{`# GitHub Flow workflow:
#
#  main ──●──────────────●──────────────●──▶ (always deployable)
#         │              ▲              ▲
#      branch         merge          merge
#         │              │              │
#         └──●──●──●─PR─┘    └──●──PR──┘
#           feature/login    feature/search

# Step 1: Create a feature branch from main
git checkout main
git pull origin main
git checkout -b feature/add-search-functionality

# Step 2: Work on your feature, commit often
git add .
git commit -m "Add search input component"
git add .
git commit -m "Implement search API endpoint"
git add .
git commit -m "Add search results pagination"

# Step 3: Push and open a pull request
git push -u origin feature/add-search-functionality
# Then open a PR on GitHub

# Step 4: After PR approval, merge to main
# (Usually done via GitHub UI with "Squash and merge" or "Merge")

# Step 5: Clean up
git checkout main
git pull origin main
git branch -d feature/add-search-functionality
git push origin --delete feature/add-search-functionality`}</code></pre>

      {/* ============================================================ */}
      {/* 7. TRUNK-BASED DEVELOPMENT */}
      {/* ============================================================ */}
      <h2>{s.h2_trunk}</h2>
      <p>{s.p_trunk}</p>
      <p dangerouslySetInnerHTML={{ __html: s.p_trunk_shortlived }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_trunk_flags }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_trunk_ci }} />

      <pre><code>{`# Trunk-based development workflow:
#
#  main ──●──●──●──●──●──●──●──●──●──●──●──▶ (trunk, always releasable)
#         │     ▲  │  ▲     │  ▲
#       branch  │ branch │  branch │
#         │  merge │  merge  │  merge
#         └──●──┘  └──●──┘  └──●──┘
#        (hours)   (hours)   (hours)
#     short-lived feature branches

# Create a short-lived branch (will merge within hours)
git checkout main
git pull origin main
git checkout -b feature/add-tooltip-component

# Work quickly, commit small changes
git add src/components/Tooltip.tsx
git commit -m "Add Tooltip component with feature flag"

# Merge back quickly (same day)
git checkout main
git pull origin main
git merge feature/add-tooltip-component
git push origin main
git branch -d feature/add-tooltip-component

# Feature flag example (code merged but hidden)
# if (featureFlags.isEnabled('new-tooltip')) {
#   return <NewTooltip />;
# }
# return <OldTooltip />;`}</code></pre>

      {/* ============================================================ */}
      {/* 8. AUTOMATED ENFORCEMENT */}
      {/* ============================================================ */}
      <h2>{s.h2_enforcement}</h2>
      <p>{s.p_enforcement}</p>
      <p dangerouslySetInnerHTML={{ __html: s.p_enforcement_prepush }} />

      <h3>Git Hook: pre-push</h3>
      <p>Create a <code>.git/hooks/pre-push</code> script that validates branch names before pushing:</p>
      <pre><code>{`#!/bin/bash
# .git/hooks/pre-push - Validate branch naming convention

BRANCH=$(git symbolic-ref --short HEAD)

# Allow main, develop, and HEAD (detached)
if [[ "$BRANCH" == "main" || "$BRANCH" == "develop" || "$BRANCH" == "HEAD" ]]; then
  exit 0
fi

# Regex pattern for valid branch names
# Matches: feature/PROJ-123-description, bugfix/description, etc.
PATTERN="^(feature|bugfix|hotfix|release|chore|docs|test|refactor)/[a-zA-Z0-9._-]+(/?[a-zA-Z0-9._-]+)*$"

if [[ ! "$BRANCH" =~ $PATTERN ]]; then
  echo "ERROR: Branch name '$BRANCH' does not match naming convention."
  echo ""
  echo "Branch names must follow the pattern:"
  echo "  type/description"
  echo "  type/TICKET-123-description"
  echo ""
  echo "Valid prefixes: feature, bugfix, hotfix, release, chore, docs, test, refactor"
  echo ""
  echo "Examples:"
  echo "  feature/PROJ-123-add-login"
  echo "  bugfix/fix-email-validation"
  echo "  hotfix/critical-security-patch"
  exit 1
fi

exit 0`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.p_enforcement_husky }} />

      <h3>Husky + commitlint Setup</h3>
      <pre><code>{`# Install Husky and set up hooks
npm install --save-dev husky
npx husky init

# Create the pre-push hook
cat > .husky/pre-push << 'EOF'
#!/bin/bash
BRANCH=$(git symbolic-ref --short HEAD)

if [[ "$BRANCH" == "main" || "$BRANCH" == "develop" ]]; then
  exit 0
fi

PATTERN="^(feature|bugfix|hotfix|release|chore|docs|test|refactor)/[a-zA-Z0-9._-]+$"

if [[ ! "$BRANCH" =~ $PATTERN ]]; then
  echo "Branch name '$BRANCH' does not follow naming convention."
  echo "Use: type/description (e.g., feature/add-login)"
  exit 1
fi
EOF

chmod +x .husky/pre-push

# Verify it works
git checkout -b invalid-name
git push  # Will be rejected by the hook

git checkout -b feature/valid-branch-name
git push  # Will succeed`}</code></pre>

      {/* ============================================================ */}
      {/* 9. CI/CD INTEGRATION */}
      {/* ============================================================ */}
      <h2>{s.h2_cicd}</h2>
      <p>{s.p_cicd}</p>
      <p dangerouslySetInnerHTML={{ __html: s.p_cicd_github }} />

      <h3>GitHub Actions</h3>
      <pre><code>{`# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches:
      - main
      - develop
      - 'feature/**'
      - 'bugfix/**'
      - 'hotfix/**'
      - 'release/**'
  pull_request:
    branches: [main, develop]

jobs:
  # Run tests on ALL branches
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test

  # Deploy to staging only on release branches
  deploy-staging:
    needs: test
    if: startsWith(github.ref, 'refs/heads/release/')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - run: ./deploy.sh staging

  # Deploy to production only on main
  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - run: ./deploy.sh production

  # Fast-track hotfixes
  deploy-hotfix:
    needs: test
    if: startsWith(github.ref, 'refs/heads/hotfix/')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - run: ./deploy.sh hotfix-staging

  # Validate branch name
  validate-branch:
    runs-on: ubuntu-latest
    steps:
      - name: Check branch name
        run: |
          BRANCH=\${GITHUB_REF#refs/heads/}
          PATTERN="^(main|develop|(feature|bugfix|hotfix|release|chore|docs|test|refactor)/.+)$"
          if [[ ! "$BRANCH" =~ $PATTERN ]]; then
            echo "::error::Branch '$BRANCH' does not follow naming convention"
            exit 1
          fi`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.p_cicd_gitlab }} />

      <h3>GitLab CI</h3>
      <pre><code>{`# .gitlab-ci.yml
stages:
  - validate
  - test
  - deploy

validate-branch-name:
  stage: validate
  script:
    - |
      PATTERN="^(main|develop|(feature|bugfix|hotfix|release|chore|docs|test|refactor)/.+)$"
      if [[ ! "$CI_COMMIT_BRANCH" =~ $PATTERN ]]; then
        echo "Branch name does not follow convention: $CI_COMMIT_BRANCH"
        exit 1
      fi
  rules:
    - if: $CI_PIPELINE_SOURCE == "push"

test:
  stage: test
  script:
    - npm ci
    - npm test
  rules:
    - if: $CI_COMMIT_BRANCH

deploy-staging:
  stage: deploy
  script:
    - ./deploy.sh staging
  rules:
    - if: $CI_COMMIT_BRANCH =~ /^release\\/.+$/

deploy-production:
  stage: deploy
  script:
    - ./deploy.sh production
  rules:
    - if: $CI_COMMIT_BRANCH == "main"`}</code></pre>

      {/* ============================================================ */}
      {/* 10. PROTECTED BRANCHES */}
      {/* ============================================================ */}
      <h2>{s.h2_protected}</h2>
      <p>{s.p_protected}</p>
      <p dangerouslySetInnerHTML={{ __html: s.p_protected_main }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_protected_pattern }} />

      <pre><code>{`# GitHub CLI: Configure branch protection rules
# Protect main branch
gh api repos/{owner}/{repo}/branches/main/protection \\
  --method PUT \\
  --field required_status_checks='{"strict":true,"contexts":["test"]}' \\
  --field enforce_admins=true \\
  --field required_pull_request_reviews='{"required_approving_review_count":2}' \\
  --field restrictions=null

# List protected branches
gh api repos/{owner}/{repo}/branches --jq '.[] | select(.protected) | .name'

# View protection rules for a branch
gh api repos/{owner}/{repo}/branches/main/protection

# GitHub branch ruleset (newer approach, supports wildcards)
# Settings > Rules > Rulesets > New ruleset
# Target branches: main, develop, release/*, hotfix/*
# Rules:
#   - Require pull request before merging (2 approvals)
#   - Require status checks to pass
#   - Require branches to be up to date
#   - Block force pushes
#   - Block deletions`}</code></pre>

      {/* ============================================================ */}
      {/* 11. EXAMPLES BY PROJECT TYPE */}
      {/* ============================================================ */}
      <h2>{s.h2_examples}</h2>
      <p>{s.p_examples}</p>
      <p dangerouslySetInnerHTML={{ __html: s.p_ex_opensource }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_ex_startup }} />
      <p dangerouslySetInnerHTML={{ __html: s.p_ex_enterprise }} />

      <pre><code>{`# Open Source Project
feature/add-dark-mode
feature/improve-accessibility
fix/broken-link-readme
fix/typo-contributing-guide
docs/update-installation-guide
chore/upgrade-to-react-19

# Startup (GitHub Flow)
feat/onboarding-flow
feat/stripe-integration
fix/signup-validation
fix/mobile-responsive-nav
chore/setup-sentry

# Enterprise (Git Flow + Jira)
feature/PROJ-1234-payment-refund-api
feature/PROJ-1235-admin-dashboard-v2
bugfix/PROJ-2001-currency-rounding-error
hotfix/PROJ-3001-fix-rate-limiter
release/4.2.0
chore/PROJ-4001-upgrade-java-21
john.doe/feature/PROJ-1236-audit-logging`}</code></pre>

      {/* ============================================================ */}
      {/* 12. FAQ */}
      {/* ============================================================ */}
      <div className="faq-section">
        <h2>{s.h2_faq}</h2>
        <h3>{s.faq1_q}</h3>
        <p>{s.faq1_a}</p>
        <h3>{s.faq2_q}</h3>
        <p>{s.faq2_a}</p>
        <h3>{s.faq3_q}</h3>
        <p>{s.faq3_a}</p>
        <h3>{s.faq4_q}</h3>
        <p>{s.faq4_a}</p>
        <h3>{s.faq5_q}</h3>
        <p>{s.faq5_a}</p>
      </div>

      <p>{s.p_conclusion}</p>

      <p>
        <Link href={`/${lang}/tools/git-command-generator`} style={{ fontWeight: 600 }}>
          {s.link_git_tool_bottom}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/slug-generator`} style={{ fontWeight: 600 }}>
          {s.link_slug_tool_bottom}
        </Link>
      </p>
    </>
  );
}
