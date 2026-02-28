'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Cursor vs GitHub Copilot 2026: The Complete Developer Guide',
    description: 'An in-depth comparison of Cursor IDE and GitHub Copilot covering features, pricing, AI models, code completion quality, agent capabilities, privacy, and real-world workflows to help you choose the right AI coding tool.',
    intro: 'The AI-assisted coding landscape in 2026 is dominated by two major players: Cursor, a standalone AI-native IDE, and GitHub Copilot, an AI extension that works across multiple editors. Both promise to dramatically accelerate development, but they take fundamentally different approaches. Cursor rebuilds the editor experience around AI from the ground up, while Copilot enhances your existing IDE with powerful AI capabilities. This guide breaks down every aspect of both tools so you can make an informed decision for your workflow.',
    tldr: 'TL;DR: Cursor is the better choice if you want the most advanced AI coding experience and are willing to use a dedicated IDE. GitHub Copilot is the better choice if you need multi-IDE support, already use GitHub extensively, or prefer to stay in JetBrains or Neovim. Both are excellent tools that will significantly boost your productivity. Many professional developers use both.',
    keyTakeaways: 'Key Takeaways',
    kt1: 'Cursor offers deeper AI integration with Composer (multi-file editing), superior codebase context via @codebase, and support for multiple AI models including Claude and GPT-4.',
    kt2: 'Copilot provides broader IDE support (VS Code, JetBrains, Neovim, Xcode), tighter GitHub integration, and a mature agent mode in VS Code.',
    kt3: 'Cursor Pro costs $20/month with unlimited completions; Copilot Individual costs $10/month or $100/year. Both have free tiers.',
    kt4: 'Cursor excels at large refactoring tasks and multi-file edits; Copilot excels at inline completions and GitHub workflow integration.',
    kt5: 'For maximum productivity, many developers use Copilot in JetBrains for daily work and Cursor for complex AI-driven refactoring sessions.',

    h2Overview: 'Overview: Two Different Philosophies',
    overviewDesc: 'Cursor and Copilot represent two distinct approaches to AI-assisted development. Understanding this fundamental difference is key to choosing the right tool.',
    h3CursorPhilosophy: 'Cursor: The AI-Native IDE',
    cursorPhilosophyDesc: 'Cursor is a fork of VS Code rebuilt from the ground up with AI at its core. Every feature is designed around AI interaction: the tab key, the command palette, the sidebar, and the terminal all have deep AI integration. The philosophy is that AI should not be an add-on but the primary way you interact with your editor. Cursor treats the entire codebase as context and provides features like Composer for multi-file editing that go beyond what an extension can achieve.',
    h3CopilotPhilosophy: 'GitHub Copilot: The Universal AI Extension',
    copilotPhilosophyDesc: 'Copilot takes the opposite approach: rather than building a new editor, it brings AI capabilities to the editors developers already use. Copilot works as an extension in VS Code, JetBrains IDEs, Neovim, Xcode, and even the GitHub web interface. The philosophy is that AI should meet developers where they are, integrating seamlessly into existing workflows and leveraging the deep ecosystem of each IDE.',

    h2FeatureComparison: 'Feature-by-Feature Comparison',
    thFeature: 'Feature',
    thCursor: 'Cursor',
    thCopilot: 'GitHub Copilot',

    h2Pricing: 'Pricing Comparison (2026)',
    thTier: 'Tier',
    thPrice: 'Price',
    thIncludes: 'What You Get',

    h2CodeCompletion: 'Code Completion Quality',
    codeCompletionDesc: 'Both tools provide real-time code completions as you type, but they differ in how they generate and present suggestions.',
    h3CursorCompletion: 'Cursor Code Completion',
    cursorCompletionDesc: 'Cursor uses a custom-trained completion model optimized for speed, with the ability to fall back to larger models (Claude, GPT-4) for complex completions. Its tab-based completion system predicts not just the next line but entire code blocks, and it can suggest edits to existing code (not just insertions). The multi-line diff-style completions are particularly powerful for refactoring.',
    h3CopilotCompletion: 'Copilot Code Completion',
    copilotCompletionDesc: 'Copilot uses GPT-4o as its primary completion engine, delivering fast and accurate inline suggestions. The completion quality has improved dramatically in 2026, with better understanding of project context through open tabs and imported modules. Copilot excels at recognizing patterns in your code and continuing them consistently. The ghost text preview is clean and non-intrusive.',

    h2AIChatAgent: 'AI Chat and Agent Capabilities',
    h3CursorComposer: 'Cursor Composer',
    cursorComposerDesc: 'Composer is Cursor\'s standout feature. It allows you to describe a change in natural language and have the AI edit multiple files simultaneously. Composer creates a diff view showing proposed changes across your codebase, and you can accept, reject, or modify each change individually. It understands project structure, follows your coding conventions, and can handle complex refactoring tasks that span dozens of files.',
    h3CopilotChat: 'Copilot Chat and Agent Mode',
    copilotChatDesc: 'Copilot Chat provides an inline chat panel where you can ask questions, request code generation, and get explanations. The agent mode (launched in 2025) enables autonomous multi-step task execution: Copilot can run terminal commands, edit files, read error output, and iterate until the task is complete. Copilot Workspace extends this to the GitHub web interface, turning issues into implemented PRs.',

    h2CodebaseContext: 'Codebase-Aware Context',
    h3CursorContext: 'Cursor: @codebase and .cursorrules',
    cursorContextDesc: 'Cursor provides deep codebase understanding through several mechanisms. The @codebase command indexes your entire project and uses embeddings to find relevant code for any query. You can reference specific files with @file, symbols with @symbol, and documentation with @docs. The .cursorrules file lets you define project-specific instructions that persist across sessions.',
    h3CopilotContext: 'Copilot: @workspace and #file',
    copilotContextDesc: 'Copilot uses @workspace to search across your entire project, #file to reference specific files, and @terminal for terminal output context. The copilot-instructions.md file (in .github/) provides project-level guidance. While effective, the context mechanism is slightly less granular than Cursor\'s approach. Copilot also uses open tabs and import graphs to build context automatically.',

    h2Privacy: 'Privacy and Security',
    privacyDesc: 'Data privacy is a critical concern when using AI coding tools, especially for enterprise teams working on proprietary code.',
    h3CursorPrivacy: 'Cursor Privacy',
    cursorPrivacyDesc: 'Cursor offers a Privacy Mode that ensures no code is stored on their servers and is not used for training. In Privacy Mode, code is sent to the AI model provider (Anthropic or OpenAI) for inference only. Cursor Business adds SOC 2 compliance, enforced privacy mode, and admin controls. You can also configure Cursor to use a self-hosted model via API keys for maximum control.',
    h3CopilotPrivacy: 'Copilot Privacy',
    copilotPrivacyDesc: 'Copilot Individual does not use your code for model training (opt-out by default since 2024). Copilot Business and Enterprise provide additional guarantees: no code is retained beyond the request, IP indemnity is included, and content exclusion policies let you block specific files or repositories. Enterprise adds SAML SSO, audit logs, and compliance certifications.',

    h2IDESupport: 'IDE and Platform Support',
    h3CursorIDE: 'Cursor: VS Code Ecosystem',
    cursorIDEDesc: 'Cursor is a standalone application built on the VS Code codebase. It supports most VS Code extensions, themes, and keybindings. However, you must use the Cursor application itself. You cannot use Cursor\'s AI features as an extension in other editors. This is the primary trade-off: you get deeper AI integration at the cost of being locked into one editor.',
    h3CopilotIDE: 'Copilot: Multi-IDE Support',
    copilotIDEDesc: 'Copilot works across VS Code, Visual Studio, JetBrains IDEs (IntelliJ, PyCharm, WebStorm, etc.), Neovim, Xcode, and the GitHub.com web editor. The feature set varies by IDE: VS Code gets the fullest experience (chat, agent mode, inline suggestions), while other editors may only have inline completions and basic chat. This flexibility is a major advantage for teams with diverse IDE preferences.',

    h2Performance: 'Performance and Latency',
    performanceDesc: 'Speed matters when AI suggestions need to feel like a natural part of your typing flow.',
    h3CursorPerf: 'Cursor Performance',
    cursorPerfDesc: 'Cursor\'s custom completion model delivers suggestions in 200-400ms, which feels nearly instant during normal typing. For Composer operations and chat responses using Claude or GPT-4, expect 1-3 seconds for initial response with streaming. Cursor pre-fetches completions based on predicted cursor movement, so suggestions often appear before you need them. The local indexing for @codebase takes 30-60 seconds for medium projects and runs in the background.',
    h3CopilotPerf: 'Copilot Performance',
    copilotPerfDesc: 'Copilot inline completions arrive in 100-300ms, making them among the fastest in the industry. Chat responses stream in 1-2 seconds. Agent mode operations can take 10-60 seconds per step depending on complexity. Copilot benefits from GitHub\'s infrastructure and CDN, providing consistent performance globally. The new Copilot completions engine in 2026 has reduced latency by 40% compared to 2024.',

    h2Models: 'AI Model Support',
    h3CursorModels: 'Cursor: Multi-Model Flexibility',
    cursorModelsDesc: 'Cursor supports Claude 3.5 Sonnet, Claude Opus, GPT-4o, GPT-4 Turbo, and its own custom fine-tuned models for fast completions. You can switch models per conversation or set defaults for different tasks. Pro users can bring their own API keys for OpenAI, Anthropic, Google, or any OpenAI-compatible endpoint. This flexibility means you always have access to the best model for each task.',
    h3CopilotModels: 'Copilot: GitHub-Curated Models',
    copilotModelsDesc: 'Copilot primarily uses GPT-4o for completions and chat. In 2026, Copilot added model selection in chat, allowing access to Claude 3.5 Sonnet and Gemini through the GitHub Marketplace. However, completions still use the GPT-4o-based engine. Enterprise customers can request access to specific models. The model selection is more curated and less flexible than Cursor but ensures consistent quality.',

    h2Workflows: 'Real-World Workflow Examples',
    h3Refactoring: 'Workflow 1: Large Refactoring',
    refactoringCursor: 'In Cursor, you open Composer (Cmd+I), describe the refactoring goal, and reference files with @file. Composer generates a multi-file diff that you review and apply. For example, to migrate a Redux codebase to Zustand, you would describe the pattern and Composer handles the store creation, hook updates, provider removal, and import changes across all files.',
    refactoringCopilot: 'In Copilot, you open the Chat panel, describe the refactoring goal with @workspace context, and Copilot generates step-by-step guidance. In agent mode, Copilot can execute the changes autonomously, running tests between steps to verify correctness. The workflow is more sequential compared to Cursor\'s parallel diff approach.',
    h3BugFixing: 'Workflow 2: Bug Fixing',
    bugFixingDesc: 'When debugging, both tools offer powerful assistance but through different interfaces.',
    h3NewFeature: 'Workflow 3: Building a New Feature',
    newFeatureDesc: 'For feature development, Cursor\'s Composer lets you describe the entire feature and generate scaffolding across multiple files in one operation. Copilot\'s agent mode achieves similar results through an iterative approach, creating files one at a time and verifying each step.',
    h3TestWriting: 'Workflow 4: Writing Tests',
    testWritingDesc: 'Both tools excel at test generation. Cursor can generate tests for an entire module at once through Composer. Copilot\'s /tests slash command generates tests for selected code, and its agent mode can create test files, run them, and fix failures iteratively.',

    h2DecisionMatrix: 'When to Choose Cursor vs Copilot',
    h3ChooseCursor: 'Choose Cursor When:',
    chooseCursorList: 'You want the most advanced AI-first editing experience|You frequently do multi-file refactoring and need Composer|You want to use Claude or switch between AI models freely|You work primarily in VS Code and are comfortable switching to a fork|You want granular codebase context with @codebase indexing|You are a solo developer or small team with flexibility in tooling|You value the ability to use custom or self-hosted models',
    h3ChooseCopilot: 'Choose Copilot When:',
    chooseCopilotList: 'You use JetBrains, Neovim, Xcode, or Visual Studio|Your team has diverse IDE preferences|You heavily use GitHub Issues, PRs, and Actions|You need enterprise compliance (SOC 2, SAML, IP indemnity)|You want the fastest inline completions with minimal setup|You need Copilot Workspace for issue-to-PR automation|Your organization already has GitHub Enterprise licensing',

    h2UseBoth: 'Can You Use Both Together?',
    useBothDesc: 'Yes, and many professional developers do exactly this. You can install the Copilot extension inside Cursor to get the best of both worlds: Cursor\'s Composer and tab completions alongside Copilot\'s inline suggestions and chat. However, you will want to configure which tool handles completions to avoid conflicts. A common setup is to use Cursor\'s native completions (which are faster and more context-aware) and Copilot Chat as a secondary assistant.',

    h2Migration: 'Migration Guide',
    h3CopilotToCursor: 'Migrating from Copilot to Cursor',
    copilotToCursorDesc: 'Switching from Copilot to Cursor is straightforward since Cursor is VS Code-based. Your extensions, settings, and keybindings transfer automatically. Import your VS Code profile on first launch. Create a .cursorrules file to replace your copilot-instructions.md. The main adjustment is learning Composer (Cmd+I) and the @-reference system for codebase context.',
    h3CursorToCopilot: 'Migrating from Cursor to Copilot',
    cursorToCopilotDesc: 'Moving from Cursor back to VS Code with Copilot means losing Composer multi-file editing. Convert your .cursorrules to .github/copilot-instructions.md. Use Copilot\'s agent mode for multi-step tasks that you previously did with Composer. Your VS Code extensions and settings carry over directly. The main adjustment is learning Copilot\'s @workspace and slash commands.',

    h2Community: 'Community and Ecosystem',
    h3CursorCommunity: 'Cursor Ecosystem',
    cursorCommunityDesc: 'Cursor has a rapidly growing community with active forums, a Discord server, and a GitHub repository for .cursorrules sharing. The ecosystem includes community-maintained rules files for popular frameworks (Next.js, Rails, Django, etc.), shared prompt libraries, and third-party tutorials. Being a younger product, the community is smaller but highly engaged and innovative.',
    h3CopilotCommunity: 'Copilot Ecosystem',
    copilotCommunityDesc: 'Copilot benefits from GitHub\'s massive developer community and ecosystem. There are thousands of blog posts, courses, and tutorials. GitHub\'s own documentation is extensive. Copilot extensions are emerging as a platform, allowing third-party tools to integrate with Copilot Chat. The enterprise adoption rate gives Copilot a broader knowledge base of best practices and patterns.',

    h2Roadmap: '2026 Roadmap and Future Direction',
    h3CursorRoadmap: 'Cursor\'s Direction',
    cursorRoadmapDesc: 'Cursor is focused on pushing the boundary of what AI can do inside an editor. Expected developments include deeper background AI agents that continuously improve your code, enhanced Composer with visual UI generation, built-in code review AI, and tighter integration with local models for air-gapped environments. Cursor aims to make the AI so integral that the traditional editing experience feels obsolete.',
    h3CopilotRoadmap: 'Copilot\'s Direction',
    copilotRoadmapDesc: 'GitHub is investing heavily in Copilot Workspace and agent capabilities. The roadmap includes expanding agent mode across all supported IDEs, deeper integration with GitHub Actions for automated testing and deployment, Copilot for pull request reviews, and natural language-driven project management. GitHub aims to make Copilot the AI layer for the entire software development lifecycle, not just coding.',

    h2QuickSetup: 'Quick Setup Guide',
    h3CursorSetup: 'Setting Up Cursor',
    cursorSetupDesc: 'Getting started with Cursor takes about 5 minutes. Download the app, import your VS Code profile, and you are ready to go.',
    h3CopilotSetup: 'Setting Up Copilot',
    copilotSetupDesc: 'Copilot setup requires a GitHub account and installing the extension in your IDE of choice.',

    h2Shortcuts: 'Keyboard Shortcuts Comparison',
    shortcutsDesc: 'Both tools rely heavily on keyboard shortcuts for an efficient workflow. Here are the essential shortcuts you need to know.',

    h2PerformanceTable: 'Performance Benchmarks',
    perfTableDesc: 'Based on community benchmarks and real-world testing in February 2026 with medium-sized TypeScript projects (50-100 files).',
    thMetric: 'Metric',
    thCursorVal: 'Cursor',
    thCopilotVal: 'Copilot',

    h2BestPractices: 'Best Practices for Each Tool',
    h3CursorBP: 'Cursor Best Practices',
    cursorBP1: 'Create a comprehensive .cursorrules file for every project. Include coding standards, preferred libraries, architecture patterns, and example code.',
    cursorBP2: 'Use Composer for changes spanning more than 2 files. For single-file edits, inline Cmd+K is faster.',
    cursorBP3: 'Reference specific files and symbols with @ mentions rather than pasting code into chat. This gives the AI better context.',
    cursorBP4: 'Set Claude as your default model for complex reasoning tasks and use the fast model for completions.',
    cursorBP5: 'Index your codebase regularly by opening the project fresh. The embeddings improve search and context retrieval.',
    cursorBP6: 'Use Cursor\'s terminal integration to let the AI see error messages and command output directly.',
    h3CopilotBP: 'Copilot Best Practices',
    copilotBP1: 'Create .github/copilot-instructions.md with project-specific rules. This is your equivalent of .cursorrules.',
    copilotBP2: 'Keep relevant files open in tabs. Copilot uses open tabs as context for better suggestions.',
    copilotBP3: 'Use slash commands in Chat (/explain, /fix, /tests) for structured interactions that produce better results.',
    copilotBP4: 'Leverage agent mode for multi-step tasks: it can run commands, read output, and iterate automatically.',
    copilotBP5: 'Write descriptive commit messages and PR descriptions. Copilot uses these to understand your intent in future suggestions.',
    copilotBP6: 'Use content exclusions in Business/Enterprise to prevent sensitive files from being sent to the model.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is Cursor better than GitHub Copilot in 2026?',
    faq1A: 'Neither is universally better. Cursor provides a deeper AI-first editing experience with superior multi-file editing through Composer and flexible model selection. Copilot offers broader IDE support, tighter GitHub integration, and a more mature ecosystem. Your choice depends on whether you prioritize the depth of AI integration (Cursor) or flexibility and platform support (Copilot).',
    faq2Q: 'Can I use Cursor and Copilot together?',
    faq2A: 'Yes. You can install the GitHub Copilot extension inside Cursor. Many developers use Cursor native completions for inline suggestions and Copilot Chat as a secondary assistant. Configure completion providers carefully to avoid conflicting suggestions.',
    faq3Q: 'Which tool has better code completion?',
    faq3A: 'Cursor and Copilot offer comparable completion quality in 2026. Cursor completions are more context-aware due to codebase indexing and support multi-line edits (not just insertions). Copilot completions are slightly faster (100-300ms) and benefit from GPT-4o fine-tuning. For most developers the difference is marginal.',
    faq4Q: 'Is my code safe with Cursor and Copilot?',
    faq4A: 'Both tools offer privacy controls. Cursor Privacy Mode prevents code storage and training. Copilot Business and Enterprise do not retain code or use it for training, and include IP indemnity. Both tools send code to cloud APIs for inference. For air-gapped requirements, Cursor supports self-hosted models via custom API endpoints.',
    faq5Q: 'Which is more cost-effective for teams?',
    faq5A: 'Copilot Business at $19 per user per month is more cost-effective for teams that need multi-IDE support and GitHub integration. Cursor Business at $40 per user per month is pricier but includes more advanced AI features. If your team exclusively uses VS Code, Cursor may provide more value per dollar due to Composer and model flexibility.',
    faq6Q: 'Does Cursor work with all VS Code extensions?',
    faq6A: 'Cursor supports the vast majority of VS Code extensions since it is built on the VS Code codebase. Some extensions that deeply modify the editor UI or use proprietary VS Code APIs may have compatibility issues. Popular extensions like ESLint, Prettier, GitLens, and language-specific extensions work without problems.',
    faq7Q: 'Can Copilot do multi-file editing like Cursor Composer?',
    faq7A: 'Copilot agent mode can edit multiple files sequentially as part of an autonomous workflow. However, it does not provide the same simultaneous multi-file diff view that Cursor Composer offers. Copilot Workspace on GitHub.com provides a multi-file planning and editing experience for issue-to-PR workflows.',
    faq8Q: 'Which tool is better for learning to code?',
    faq8A: 'Copilot is generally better for beginners because it works within standard VS Code (familiar environment), has extensive documentation and tutorials, and the inline suggestions help you learn patterns naturally. Cursor is better for intermediate developers who want to understand AI-assisted workflows deeply. Both tools include code explanation features that aid learning.',
  },
  zh: {
    title: 'Cursor vs GitHub Copilot 2026：开发者完整指南',
    description: '深入比较 Cursor IDE 和 GitHub Copilot 的功能、定价、AI 模型、代码补全质量、Agent 能力、隐私性和实际工作流程，帮助你选择合适的 AI 编程工具。',
    intro: '2026 年 AI 辅助编程领域由两大工具主导：Cursor（独立的 AI 原生 IDE）和 GitHub Copilot（跨多个编辑器的 AI 扩展）。两者都承诺大幅加速开发，但采取了根本不同的方法。Cursor 从底层围绕 AI 重建编辑器体验，而 Copilot 用强大的 AI 能力增强你现有的 IDE。本指南详细分析两者的各个方面，帮助你做出明智的决策。',
    tldr: 'TL;DR：如果你想要最先进的 AI 编程体验且愿意使用专用 IDE，选 Cursor。如果你需要多 IDE 支持、大量使用 GitHub 或偏好 JetBrains/Neovim，选 Copilot。两者都是优秀的工具。许多专业开发者同时使用两者。',
    keyTakeaways: '核心要点',
    kt1: 'Cursor 提供更深层的 AI 集成：Composer（多文件编辑）、通过 @codebase 的卓越代码库上下文、支持 Claude 和 GPT-4 等多种 AI 模型。',
    kt2: 'Copilot 提供更广泛的 IDE 支持（VS Code、JetBrains、Neovim、Xcode）、更紧密的 GitHub 集成和成熟的 Agent 模式。',
    kt3: 'Cursor Pro 每月 $20 含无限补全；Copilot Individual 每月 $10。两者都有免费版。',
    kt4: 'Cursor 擅长大型重构和多文件编辑；Copilot 擅长行内补全和 GitHub 工作流集成。',
    kt5: '为获得最高效率，许多开发者在 JetBrains 中使用 Copilot 做日常工作，在 Cursor 中做复杂 AI 驱动的重构。',

    h2Overview: '概述：两种不同的理念',
    overviewDesc: 'Cursor 和 Copilot 代表了 AI 辅助开发的两种截然不同的方法。',
    h3CursorPhilosophy: 'Cursor：AI 原生 IDE',
    cursorPhilosophyDesc: 'Cursor 是基于 VS Code 从底层重建的 AI 原生 IDE。每个功能都围绕 AI 交互设计。它将整个代码库视为上下文，提供 Composer 多文件编辑等超越扩展能力的功能。',
    h3CopilotPhilosophy: 'GitHub Copilot：通用 AI 扩展',
    copilotPhilosophyDesc: 'Copilot 采取相反的方法：将 AI 能力带到开发者已有的编辑器中。它作为扩展在 VS Code、JetBrains、Neovim、Xcode 中工作，无缝集成到现有工作流中。',

    h2FeatureComparison: '功能逐项对比',
    thFeature: '功能',
    thCursor: 'Cursor',
    thCopilot: 'GitHub Copilot',

    h2Pricing: '定价比较（2026）',
    thTier: '套餐',
    thPrice: '价格',
    thIncludes: '包含内容',

    h2CodeCompletion: '代码补全质量',
    codeCompletionDesc: '两者都提供实时代码补全，但在生成和展示建议的方式上有所不同。',
    h3CursorCompletion: 'Cursor 代码补全',
    cursorCompletionDesc: 'Cursor 使用自定义训练的补全模型，速度快，可回退到 Claude 和 GPT-4 处理复杂补全。其 Tab 补全系统能预测整个代码块并建议对现有代码的编辑。',
    h3CopilotCompletion: 'Copilot 代码补全',
    copilotCompletionDesc: 'Copilot 使用 GPT-4o 作为主要补全引擎，提供快速准确的行内建议。2026 年补全质量大幅提升，更好地理解项目上下文。',

    h2AIChatAgent: 'AI 对话和 Agent 能力',
    h3CursorComposer: 'Cursor Composer',
    cursorComposerDesc: 'Composer 是 Cursor 的杀手级功能。用自然语言描述变更，AI 同时编辑多个文件，生成多文件 diff 供你审查。',
    h3CopilotChat: 'Copilot Chat 和 Agent 模式',
    copilotChatDesc: 'Copilot Chat 提供内联聊天面板。Agent 模式能自主执行多步任务：运行终端命令、编辑文件、读取错误输出并迭代。Copilot Workspace 将此扩展到 GitHub 网页端。',

    h2CodebaseContext: '代码库感知上下文',
    h3CursorContext: 'Cursor：@codebase 和 .cursorrules',
    cursorContextDesc: 'Cursor 通过 @codebase 索引整个项目，使用嵌入找到相关代码。支持 @file、@symbol、@docs 引用。.cursorrules 文件定义项目特定指令。',
    h3CopilotContext: 'Copilot：@workspace 和 #file',
    copilotContextDesc: 'Copilot 使用 @workspace 搜索项目、#file 引用文件、@terminal 获取终端输出。copilot-instructions.md 提供项目级指导。',

    h2Privacy: '隐私与安全',
    privacyDesc: '使用 AI 编程工具时，数据隐私是关键考量，特别是处理专有代码的企业团队。',
    h3CursorPrivacy: 'Cursor 隐私',
    cursorPrivacyDesc: 'Cursor 提供隐私模式，确保不存储代码且不用于训练。Business 版添加 SOC 2 合规和管理控制。支持自托管模型。',
    h3CopilotPrivacy: 'Copilot 隐私',
    copilotPrivacyDesc: 'Copilot Individual 默认不使用代码训练模型。Business 和 Enterprise 版提供额外保证：不保留代码、包含 IP 赔偿、支持内容排除策略。',

    h2IDESupport: 'IDE 和平台支持',
    h3CursorIDE: 'Cursor：VS Code 生态',
    cursorIDEDesc: 'Cursor 是基于 VS Code 的独立应用，支持大多数 VS Code 扩展。但必须使用 Cursor 应用本身，这是深度 AI 集成的代价。',
    h3CopilotIDE: 'Copilot：多 IDE 支持',
    copilotIDEDesc: 'Copilot 跨 VS Code、Visual Studio、JetBrains、Neovim、Xcode 工作。功能因 IDE 而异，VS Code 体验最完整。多 IDE 灵活性是重大优势。',

    h2Performance: '性能和延迟',
    performanceDesc: 'AI 建议需要感觉像打字的自然延续，速度至关重要。',
    h3CursorPerf: 'Cursor 性能',
    cursorPerfDesc: 'Cursor 自定义补全模型在 200-400ms 内交付建议。Composer 操作使用 Claude 或 GPT-4 时预计 1-3 秒。支持预取补全。',
    h3CopilotPerf: 'Copilot 性能',
    copilotPerfDesc: 'Copilot 行内补全在 100-300ms 内到达，行业最快之列。2026 年新引擎比 2024 年延迟降低 40%。',

    h2Models: 'AI 模型支持',
    h3CursorModels: 'Cursor：多模型灵活切换',
    cursorModelsDesc: 'Cursor 支持 Claude 3.5 Sonnet、Claude Opus、GPT-4o 及自定义微调模型。Pro 用户可使用自己的 API 密钥。',
    h3CopilotModels: 'Copilot：GitHub 策划模型',
    copilotModelsDesc: 'Copilot 主要使用 GPT-4o，2026 年在 Chat 中添加了 Claude 和 Gemini 选择。补全仍使用 GPT-4o 引擎。',

    h2Workflows: '实际工作流示例',
    h3Refactoring: '工作流 1：大型重构',
    refactoringCursor: '在 Cursor 中打开 Composer，描述重构目标并用 @file 引用文件，Composer 生成多文件 diff 供审查和应用。',
    refactoringCopilot: '在 Copilot 中打开 Chat 面板，用 @workspace 描述重构目标。Agent 模式可自主执行变更并在步骤间运行测试。',
    h3BugFixing: '工作流 2：Bug 修复',
    bugFixingDesc: '调试时两者都提供强大的辅助，但通过不同的界面。',
    h3NewFeature: '工作流 3：构建新功能',
    newFeatureDesc: 'Cursor 的 Composer 可以一次描述整个功能并跨多文件生成脚手架。Copilot 的 Agent 模式通过迭代方式实现类似结果。',
    h3TestWriting: '工作流 4：编写测试',
    testWritingDesc: '两者都擅长测试生成。Cursor 可通过 Composer 一次生成整个模块的测试。Copilot 的 /tests 命令生成选中代码的测试。',

    h2DecisionMatrix: '何时选择 Cursor vs Copilot',
    h3ChooseCursor: '选择 Cursor 的场景：',
    chooseCursorList: '你想要最先进的 AI 优先编辑体验|你经常做多文件重构需要 Composer|你想自由使用 Claude 或切换 AI 模型|你主要使用 VS Code 且愿意切换到 fork 版|你需要 @codebase 索引的精细代码库上下文|你是独立开发者或小团队|你需要自定义或自托管模型',
    h3ChooseCopilot: '选择 Copilot 的场景：',
    chooseCopilotList: '你使用 JetBrains、Neovim、Xcode 或 Visual Studio|你的团队有多样的 IDE 偏好|你大量使用 GitHub Issues、PR 和 Actions|你需要企业合规（SOC 2、SAML、IP 赔偿）|你想要最快的行内补全和最少的设置|你需要 Copilot Workspace 进行 issue 到 PR 的自动化|你的组织已有 GitHub Enterprise 许可',

    h2UseBoth: '可以同时使用两者吗？',
    useBothDesc: '可以，许多专业开发者就是这样做的。你可以在 Cursor 中安装 Copilot 扩展。常见设置是使用 Cursor 原生补全和 Copilot Chat 作为辅助助手。',

    h2Migration: '迁移指南',
    h3CopilotToCursor: '从 Copilot 迁移到 Cursor',
    copilotToCursorDesc: '切换简单，因为 Cursor 基于 VS Code。扩展、设置和快捷键自动迁移。创建 .cursorrules 替代 copilot-instructions.md。',
    h3CursorToCopilot: '从 Cursor 迁移到 Copilot',
    cursorToCopilotDesc: '回到 VS Code + Copilot 意味着失去 Composer 多文件编辑。将 .cursorrules 转换为 copilot-instructions.md。使用 Agent 模式替代 Composer。',

    h2Community: '社区和生态系统',
    h3CursorCommunity: 'Cursor 生态',
    cursorCommunityDesc: 'Cursor 社区快速增长，有活跃论坛、Discord 和 .cursorrules 共享库。生态较新但高度创新。',
    h3CopilotCommunity: 'Copilot 生态',
    copilotCommunityDesc: 'Copilot 受益于 GitHub 庞大的开发者社区。有大量教程、课程和文档。Copilot 扩展平台正在兴起。',

    h2Roadmap: '2026 路线图和未来方向',
    h3CursorRoadmap: 'Cursor 的方向',
    cursorRoadmapDesc: 'Cursor 专注于推动编辑器中 AI 能力的边界，包括后台 AI Agent、可视化 UI 生成、内置代码审查 AI 和本地模型集成。',
    h3CopilotRoadmap: 'Copilot 的方向',
    copilotRoadmapDesc: 'GitHub 大量投资 Copilot Workspace 和 Agent 能力，包括跨 IDE Agent 模式、GitHub Actions 深度集成、PR 审查和自然语言项目管理。',

    h2QuickSetup: '快速设置指南',
    h3CursorSetup: '设置 Cursor',
    cursorSetupDesc: 'Cursor 设置约需 5 分钟。下载应用，导入 VS Code 配置即可开始。',
    h3CopilotSetup: '设置 Copilot',
    copilotSetupDesc: 'Copilot 设置需要 GitHub 账户并在选择的 IDE 中安装扩展。',

    h2Shortcuts: '键盘快捷键对比',
    shortcutsDesc: '两个工具都依赖键盘快捷键来提高效率。以下是必须了解的快捷键。',

    h2PerformanceTable: '性能基准测试',
    perfTableDesc: '基于 2026 年 2 月社区基准测试和中型 TypeScript 项目（50-100 个文件）的实际测试。',
    thMetric: '指标',
    thCursorVal: 'Cursor',
    thCopilotVal: 'Copilot',

    h2BestPractices: '各工具最佳实践',
    h3CursorBP: 'Cursor 最佳实践',
    cursorBP1: '为每个项目创建全面的 .cursorrules 文件，包含编码标准、首选库和架构模式。',
    cursorBP2: '超过 2 个文件的变更使用 Composer；单文件编辑用 Cmd+K 更快。',
    cursorBP3: '用 @ 引用特定文件和符号，而不是粘贴代码到聊天中。',
    cursorBP4: '复杂推理任务设置 Claude 为默认模型，补全使用快速模型。',
    cursorBP5: '定期重新打开项目以更新代码库索引。',
    cursorBP6: '利用 Cursor 终端集成让 AI 直接看到错误消息。',
    h3CopilotBP: 'Copilot 最佳实践',
    copilotBP1: '创建 .github/copilot-instructions.md 作为项目特定规则。',
    copilotBP2: '保持相关文件在标签页中打开，Copilot 用它们作为上下文。',
    copilotBP3: '使用 Chat 中的斜杠命令（/explain、/fix、/tests）获得更好的结果。',
    copilotBP4: '利用 Agent 模式处理多步任务。',
    copilotBP5: '写描述性的提交消息和 PR 描述，帮助 Copilot 理解意图。',
    copilotBP6: '在 Business/Enterprise 中使用内容排除防止敏感文件被发送到模型。',

    h2Faq: '常见问题',
    faq1Q: '2026 年 Cursor 比 GitHub Copilot 好吗？',
    faq1A: '两者各有优势。Cursor 提供更深层的 AI 优先编辑体验和 Composer 多文件编辑。Copilot 提供更广泛的 IDE 支持和 GitHub 集成。选择取决于你更看重 AI 集成深度还是平台灵活性。',
    faq2Q: '可以同时使用 Cursor 和 Copilot 吗？',
    faq2A: '可以。在 Cursor 中安装 Copilot 扩展即可。许多开发者使用 Cursor 原生补全和 Copilot Chat 作为辅助。注意配置补全提供者以避免冲突。',
    faq3Q: '哪个工具代码补全更好？',
    faq3A: '2026 年两者补全质量相当。Cursor 更具上下文感知能力且支持多行编辑。Copilot 稍快（100-300ms）。差异对大多数开发者来说不大。',
    faq4Q: '我的代码在 Cursor 和 Copilot 中安全吗？',
    faq4A: '两者都提供隐私控制。Cursor 隐私模式防止代码存储和训练。Copilot Business/Enterprise 不保留代码并包含 IP 赔偿。两者都将代码发送到云 API 进行推理。',
    faq5Q: '对团队来说哪个更划算？',
    faq5A: 'Copilot Business 每用户每月 $19，对需要多 IDE 支持的团队更经济。Cursor Business 每用户每月 $40 但包含更高级的 AI 功能。如果团队只用 VS Code，Cursor 可能性价比更高。',
    faq6Q: 'Cursor 支持所有 VS Code 扩展吗？',
    faq6A: 'Cursor 支持绝大多数 VS Code 扩展。一些深度修改编辑器 UI 的扩展可能有兼容性问题。ESLint、Prettier、GitLens 等热门扩展正常工作。',
    faq7Q: 'Copilot 能像 Cursor Composer 一样多文件编辑吗？',
    faq7A: 'Copilot Agent 模式可以按顺序编辑多个文件。但不提供 Composer 的同时多文件 diff 视图。Copilot Workspace 在 GitHub 网页端提供多文件编辑体验。',
    faq8Q: '哪个工具更适合学习编程？',
    faq8A: 'Copilot 对初学者更友好，因为它在标准 VS Code 中工作且有丰富的教程。Cursor 更适合想深入了解 AI 辅助工作流的中级开发者。',
  },
};

export default function CursorVsCopilotGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  const featureRows = [
    ['Code Completion', 'Custom model + Claude/GPT-4 fallback', 'GPT-4o engine'],
    ['Inline Chat', 'Cmd+K for inline edits', 'Cmd+I for inline chat'],
    ['Chat Panel', 'Sidebar chat with model selection', 'Sidebar chat with slash commands'],
    ['Multi-File Editing', 'Composer (simultaneous diff view)', 'Agent mode (sequential edits)'],
    ['Agent Mode', 'Composer with terminal access', 'Full autonomous agent with tool use'],
    ['Codebase Context', '@codebase indexing + embeddings', '@workspace search + open tabs'],
    ['Terminal Integration', 'AI reads/writes terminal', 'AI reads terminal output'],
    ['Debugging', 'Inline error fix suggestions', 'Error explanation + fix suggestions'],
    ['Supported Languages', 'All (via model providers)', 'All major languages'],
    ['Model Selection', 'Claude, GPT-4, custom models', 'GPT-4o, Claude, Gemini (chat only)'],
    ['Custom Rules', '.cursorrules file', 'copilot-instructions.md'],
    ['IDE Platform', 'Cursor only (VS Code fork)', 'VS Code, JetBrains, Neovim, Xcode'],
  ];

  const pricingRows = [
    ['Cursor Free', '$0', '2000 completions, 50 slow premium requests/month'],
    ['Cursor Pro', '$20/mo', 'Unlimited completions, 500 fast premium requests, Claude + GPT-4'],
    ['Cursor Business', '$40/user/mo', 'Everything in Pro + SOC 2, admin controls, enforced privacy'],
    ['Copilot Free', '$0', '2000 completions, 50 chat messages/month'],
    ['Copilot Individual', '$10/mo', 'Unlimited completions, unlimited chat, agent mode'],
    ['Copilot Business', '$19/user/mo', 'Individual + policy controls, IP indemnity, content exclusions'],
    ['Copilot Enterprise', '$39/user/mo', 'Business + fine-tuned models, knowledge bases, SAML SSO'],
  ];

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem', margin: '1.5rem 0' }}>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 0, marginBottom: '0.75rem' }}>{t.keyTakeaways}</h3>
        <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
          {[t.kt1, t.kt2, t.kt3, t.kt4, t.kt5].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.9rem', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Overview */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Overview}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.overviewDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorPhilosophy}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorPhilosophyDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotPhilosophy}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotPhilosophyDesc}</p>

      {/* Feature Comparison Table */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2FeatureComparison}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thFeature}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thCursor}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thCopilot}</th>
            </tr>
          </thead>
          <tbody>
            {featureRows.map(([feature, cursor, copilot], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontWeight: 600 }}>{feature}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{cursor}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{copilot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Pricing}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thTier}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thPrice}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thIncludes}</th>
            </tr>
          </thead>
          <tbody>
            {pricingRows.map(([tier, price, includes], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontWeight: 600 }}>{tier}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{price}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{includes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Completion */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2CodeCompletion}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.codeCompletionDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorCompletion}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorCompletionDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'// Cursor Tab completion example\n'
        + '// Type a function signature and Cursor predicts the full body\n'
        + 'function validateEmail(email: string): boolean {\n'
        + '  // Cursor suggests the entire implementation:\n'
        + '  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$/;\n'
        + '  return emailRegex.test(email);\n'
        + '}\n\n'
        + '// Cursor can also suggest EDITS to existing code (not just insertions)\n'
        + '// If you have:\n'
        + '//   const data = fetch(url);\n'
        + '// Cursor may suggest changing it to:\n'
        + '//   const data = await fetch(url);\n'
        + '// This diff-style completion is unique to Cursor'}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotCompletion}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotCompletionDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'// Copilot ghost text completion example\n'
        + '// Write a descriptive comment and Copilot generates the code\n\n'
        + '// Parse a CSV string into an array of objects using the first row as headers\n'
        + 'function parseCSV(csv: string): Record<string, string>[] {\n'
        + '  const lines = csv.trim().split("\\n");\n'
        + '  const headers = lines[0].split(",").map(h => h.trim());\n'
        + '  return lines.slice(1).map(line => {\n'
        + '    const values = line.split(",").map(v => v.trim());\n'
        + '    return headers.reduce((obj, header, i) => {\n'
        + '      obj[header] = values[i] || "";\n'
        + '      return obj;\n'
        + '    }, {} as Record<string, string>);\n'
        + '  });\n'
        + '}'}</code></pre>

      {/* AI Chat and Agent */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2AIChatAgent}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorComposer}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorComposerDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'// Cursor Composer workflow example:\n'
        + '// 1. Press Cmd+I to open Composer\n'
        + '// 2. Type: "Migrate the auth module from express-session to JWT"\n'
        + '// 3. Reference files: @file:src/middleware/auth.ts @file:src/routes/login.ts\n'
        + '// 4. Composer generates diffs for ALL affected files:\n\n'
        + '// --- src/middleware/auth.ts ---\n'
        + '// - import session from "express-session";\n'
        + '// + import jwt from "jsonwebtoken";\n'
        + '// + import { expressjwt } from "express-jwt";\n\n'
        + '// --- src/routes/login.ts ---\n'
        + '// - req.session.userId = user.id;\n'
        + '// + const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "7d" });\n'
        + '// + res.cookie("token", token, { httpOnly: true });\n\n'
        + '// 5. Review each file diff and click Accept/Reject'}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotChat}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotChatDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'// Copilot Chat + Agent mode workflow:\n\n'
        + '// In Chat panel, type:\n'
        + '// @workspace Add rate limiting to all API routes using express-rate-limit\n\n'
        + '// Agent mode autonomously:\n'
        + '// 1. Scans src/routes/ for all route files\n'
        + '// 2. Installs express-rate-limit: npm install express-rate-limit\n'
        + '// 3. Creates src/middleware/rate-limit.ts\n'
        + '// 4. Adds rate limiter to each route file\n'
        + '// 5. Runs existing tests to verify no breakage\n'
        + '// 6. Fixes any failing tests\n'
        + '// 7. Shows summary of all changes\n\n'
        + '// Copilot Workspace (on GitHub.com):\n'
        + '// 1. Open a GitHub issue: "Add rate limiting"\n'
        + '// 2. Click "Open in Workspace"\n'
        + '// 3. AI generates a plan with file changes\n'
        + '// 4. Review, edit, and create PR directly'}</code></pre>

      {/* Codebase Context */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2CodebaseContext}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorContext}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorContextDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'// .cursorrules example for a Next.js project:\n\n'
        + 'You are an expert Next.js 14+ developer.\n\n'
        + 'Project conventions:\n'
        + '- Use App Router (not Pages Router)\n'
        + '- Server Components by default, "use client" only when needed\n'
        + '- Use Tailwind CSS for styling, no CSS modules\n'
        + '- Zod for all input validation\n'
        + '- Drizzle ORM for database queries\n'
        + '- Use server actions for mutations\n\n'
        + 'File structure:\n'
        + '- app/ for routes and layouts\n'
        + '- components/ for reusable UI components\n'
        + '- lib/ for utilities and shared logic\n'
        + '- db/ for schema and migrations\n\n'
        + 'Always include error handling and loading states.'}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotContext}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotContextDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'// .github/copilot-instructions.md example:\n\n'
        + '# Project: E-commerce API\n\n'
        + '## Tech Stack\n'
        + '- TypeScript + Express.js\n'
        + '- PostgreSQL with Prisma ORM\n'
        + '- Jest for testing\n'
        + '- Zod for validation\n\n'
        + '## Coding Standards\n'
        + '- All endpoints must have input validation\n'
        + '- Use async/await, never callbacks\n'
        + '- Return consistent error format: { error: string, code: number }\n'
        + '- All database queries must be in service layer (src/services/)\n'
        + '- Controllers handle HTTP only, no business logic\n\n'
        + '## Context References in Chat:\n'
        + '// @workspace - search entire project\n'
        + '// #file:src/types.ts - reference specific file\n'
        + '// @terminal - reference terminal output'}</code></pre>

      {/* Privacy */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Privacy}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.privacyDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorPrivacy}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorPrivacyDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotPrivacy}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotPrivacyDesc}</p>

      {/* IDE Support */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2IDESupport}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorIDE}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorIDEDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotIDE}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotIDEDesc}</p>

      {/* Performance */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Performance}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.performanceDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorPerf}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorPerfDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotPerf}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotPerfDesc}</p>

      {/* Models */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Models}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorModels}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorModelsDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotModels}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotModelsDesc}</p>

      {/* Workflows */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Workflows}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Refactoring}</h3>
      <p style={{ marginBottom: '0.5rem' }}><strong>Cursor:</strong> {t.refactoringCursor}</p>
      <p style={{ marginBottom: '1rem' }}><strong>Copilot:</strong> {t.refactoringCopilot}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3BugFixing}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.bugFixingDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'// Bug fixing workflow comparison:\n\n'
        + '// === Cursor ===\n'
        + '// 1. Select the error in terminal\n'
        + '// 2. Press Cmd+K and type: "Fix this error"\n'
        + '// 3. Cursor shows inline diff with the fix\n'
        + '// 4. Press Tab to accept\n\n'
        + '// === Copilot ===\n'
        + '// 1. See error underline in editor\n'
        + '// 2. Click the lightbulb or press Cmd+.\n'
        + '// 3. Select "Fix using Copilot"\n'
        + '// 4. Copilot explains the issue and applies the fix\n'
        + '// Or in Agent mode:\n'
        + '// 1. Paste error in chat: "Fix this test failure: @terminal"\n'
        + '// 2. Agent reads error, edits code, reruns test automatically'}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3NewFeature}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.newFeatureDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3TestWriting}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.testWritingDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'// Test generation comparison:\n\n'
        + '// === Cursor Composer ===\n'
        + '// Prompt: "Generate comprehensive tests for @file:src/utils/auth.ts"\n'
        + '// Composer creates the test file with edge cases in one operation\n\n'
        + '// === Copilot ===\n'
        + '// Select function > /tests command in Chat\n'
        + '// Or in Agent mode:\n'
        + '// "Write tests for src/utils/auth.ts, run them, and fix any failures"\n'
        + '// Agent creates tests, runs `npm test`, fixes red tests iteratively'}</code></pre>

      {/* Decision Matrix */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2DecisionMatrix}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ChooseCursor}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {t.chooseCursorList.split('|').map((item, i) => (
          <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ChooseCopilot}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {t.chooseCopilotList.split('|').map((item, i) => (
          <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>
        ))}
      </ul>

      {/* Use Both */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2UseBoth}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.useBothDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'// Using Cursor + Copilot together - settings.json:\n'
        + '{\n'
        + '  // Use Cursor native completions (faster, codebase-aware)\n'
        + '  "editor.inlineSuggest.enabled": true,\n\n'
        + '  // Disable Copilot inline completions to avoid conflicts\n'
        + '  "github.copilot.enable": {\n'
        + '    "*": false  // Disable Copilot completions\n'
        + '  },\n\n'
        + '  // Keep Copilot Chat enabled as secondary assistant\n'
        + '  "github.copilot.chat.enabled": true,\n\n'
        + '  // Cursor handles: Tab completions, Cmd+K edits, Composer\n'
        + '  // Copilot handles: Chat panel, /slash commands, @workspace queries\n'
        + '}'}</code></pre>

      {/* Migration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Migration}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotToCursor}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotToCursorDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorToCopilot}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorToCopilotDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'# Migration Checklist (works both directions):\n\n'
        + '# 1. Export current settings:\n'
        + '#    Cursor:  Settings > Export Profile\n'
        + '#    VS Code: Settings > Profiles > Export\n\n'
        + '# 2. Convert project rules file:\n'
        + '#    .cursorrules  -->  .github/copilot-instructions.md\n'
        + '#    .github/copilot-instructions.md  -->  .cursorrules\n\n'
        + '# 3. Verify extensions compatibility:\n'
        + '#    Most VS Code extensions work in both\n'
        + '#    Check: ESLint, Prettier, GitLens, language packs\n\n'
        + '# 4. Update keyboard shortcuts if customized:\n'
        + '#    Cmd+K (Cursor inline) vs Cmd+I (Copilot inline)\n'
        + '#    Cmd+L (Cursor chat) vs Cmd+Shift+I (Copilot chat)\n\n'
        + '# 5. Test core workflows:\n'
        + '#    [ ] Inline completions working\n'
        + '#    [ ] Chat responses accurate\n'
        + '#    [ ] Codebase context resolving\n'
        + '#    [ ] Terminal integration active'}</code></pre>

      {/* Community */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Community}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorCommunity}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorCommunityDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotCommunity}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotCommunityDesc}</p>

      {/* Roadmap */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Roadmap}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorRoadmap}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorRoadmapDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotRoadmap}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotRoadmapDesc}</p>

      {/* Quick Setup Guide */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2QuickSetup}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorSetup}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cursorSetupDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'# Cursor Setup Steps:\n\n'
        + '# 1. Download from cursor.com\n'
        + '# 2. On first launch, import VS Code settings:\n'
        + '#    Settings > Import VS Code Profile\n\n'
        + '# 3. Create .cursorrules in project root:\n'
        + 'touch .cursorrules\n\n'
        + '# 4. Configure your preferred AI model:\n'
        + '#    Settings > Models > Select Claude 3.5 Sonnet (recommended)\n\n'
        + '# 5. Enable Privacy Mode if needed:\n'
        + '#    Settings > Privacy > Enable Privacy Mode\n\n'
        + '# 6. Index your codebase:\n'
        + '#    Open command palette > "Cursor: Index Codebase"\n\n'
        + '# 7. Test it out:\n'
        + '#    Press Cmd+I to open Composer\n'
        + '#    Press Cmd+K for inline edit\n'
        + '#    Start typing and see Tab completions'}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotSetup}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.copilotSetupDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{'# Copilot Setup Steps:\n\n'
        + '# 1. Sign up at github.com/features/copilot\n'
        + '#    (Free tier available, no credit card needed)\n\n'
        + '# 2. Install the extension in VS Code:\n'
        + '#    Extensions > Search "GitHub Copilot" > Install\n'
        + '#    Also install "GitHub Copilot Chat"\n\n'
        + '# 3. Sign in with your GitHub account\n\n'
        + '# 4. Create project instructions:\n'
        + 'mkdir -p .github\n'
        + 'touch .github/copilot-instructions.md\n\n'
        + '# 5. Configure settings in VS Code:\n'
        + '# settings.json:\n'
        + '# {\n'
        + '#   "github.copilot.enable": { "*": true },\n'
        + '#   "github.copilot.chat.localeOverride": "en"\n'
        + '# }\n\n'
        + '# 6. Test it out:\n'
        + '#    Start typing and see ghost text suggestions\n'
        + '#    Press Cmd+Shift+I to open Copilot Chat\n'
        + '#    Type /help to see available commands'}</code></pre>

      {/* Keyboard Shortcuts Comparison */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Shortcuts}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.shortcutsDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Action</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Cursor</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Copilot</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Accept completion', 'Tab', 'Tab'],
              ['Dismiss suggestion', 'Esc', 'Esc'],
              ['Next suggestion', 'Option + ]', 'Option + ]'],
              ['Open inline edit', 'Cmd + K', 'Cmd + I'],
              ['Open chat panel', 'Cmd + L', 'Cmd + Shift + I'],
              ['Multi-file edit', 'Cmd + I (Composer)', 'N/A (use agent mode)'],
              ['Toggle AI completions', 'Cursor settings', 'Cmd + Shift + P > Toggle'],
              ['Accept word only', 'Cmd + Right', 'Cmd + Right'],
              ['Reference file in chat', '@file:path', '#file:path'],
              ['Search codebase', '@codebase query', '@workspace query'],
            ].map(([action, cursor, copilot], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{action}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>{cursor}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>{copilot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance Benchmarks Table */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2PerformanceTable}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.perfTableDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thMetric}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thCursorVal}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thCopilotVal}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Inline completion latency', '200-400ms', '100-300ms'],
              ['Chat first-token latency', '1-3s (streaming)', '1-2s (streaming)'],
              ['Codebase indexing time', '30-60s (medium project)', 'Automatic (background)'],
              ['Agent mode step time', '3-10s per step', '5-15s per step'],
              ['Memory usage (idle)', '~800MB', '~200MB (extension only)'],
              ['Multi-file edit speed', '5-15s (Composer)', 'Sequential (agent mode)'],
              ['Cold start time', '3-5s (standalone app)', '0s (extension already loaded)'],
              ['Completion acceptance rate', '~35% (community avg)', '~30% (GitHub reported)'],
            ].map(([metric, cursor, copilot], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontWeight: 500 }}>{metric}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{cursor}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{copilot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2BestPractices}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CursorBP}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.cursorBP1, t.cursorBP2, t.cursorBP3, t.cursorBP4, t.cursorBP5, t.cursorBP6].map((bp, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{bp}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CopilotBP}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.copilotBP1, t.copilotBP2, t.copilotBP3, t.copilotBP4, t.copilotBP5, t.copilotBP6].map((bp, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{bp}</li>
        ))}
      </ul>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>
      {[
        [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
        [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
          <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{a}</p>
        </div>
      ))}
    </article>
  );
}
