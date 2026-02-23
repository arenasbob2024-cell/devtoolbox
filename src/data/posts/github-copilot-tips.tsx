'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'GitHub Copilot Tips and Tricks: Maximize Your AI Pair Programming',
    intro: 'GitHub Copilot has become an essential tool for developers, boosting productivity by 30-55% according to studies. However, many developers only scratch the surface of what Copilot can do. This guide covers advanced techniques, prompt engineering strategies, and workflow integrations that will help you get the most out of your AI pair programmer in 2026.',
    h2HowWorks: 'How GitHub Copilot Works',
    howWorksDesc: 'Copilot uses large language models trained on public code repositories to generate code suggestions. It analyzes your current file, open tabs, recent edits, and comments to predict what you want to write next. Understanding how it works helps you write better prompts and get better suggestions.',
    h3Context: 'Context Window',
    contextDesc: 'Copilot considers several sources of context when generating suggestions: the current file (most important), open tabs in your editor, the file path and name, imported modules, and recent edit history. Maximizing the quality of these context signals improves suggestions.',
    h2PromptEngineering: 'Prompt Engineering for Copilot',
    promptDesc: 'The quality of Copilot suggestions depends heavily on how you write your code and comments. Think of every comment, function name, and type annotation as a prompt to the AI.',
    h3Comments: 'Comment-Driven Development',
    commentsDesc: 'Write descriptive comments before your code to guide Copilot. The more specific your comment, the more accurate the generated code.',
    h3FunctionSigs: 'Function Signatures as Prompts',
    functionSigsDesc: 'Well-typed function signatures with descriptive parameter names are powerful prompts. Copilot uses the name, parameters, return type, and JSDoc comments to infer what the function should do.',
    h3Examples: 'Provide Examples',
    examplesDesc: 'When Copilot does not generate the right code on the first try, provide an example of the expected input/output. Copilot is excellent at pattern recognition and will follow the established pattern.',
    h2Shortcuts: 'Essential Keyboard Shortcuts',
    shortcutsDesc: 'Master these shortcuts to work efficiently with Copilot.',
    h2CopilotChat: 'Copilot Chat',
    copilotChatDesc: 'Copilot Chat provides an interactive AI assistant directly in your editor. It can explain code, fix bugs, generate tests, and answer questions about your codebase.',
    h3SlashCommands: 'Slash Commands',
    slashCommandsDesc: 'Copilot Chat supports slash commands for common tasks. These provide structured interactions that produce better results than free-form questions.',
    h3ContextRefs: 'Context References',
    contextRefsDesc: 'Use @ references to point Copilot Chat at specific context: @workspace for the whole project, @file for specific files, @terminal for terminal output, and @selection for selected code.',
    h2Patterns: 'Advanced Patterns',
    h3TestGeneration: 'Test Generation',
    testGenDesc: 'Copilot excels at generating tests. Provide the function to test and a clear description of the expected behavior.',
    h3Refactoring: 'Code Refactoring',
    refactoringDesc: 'Use Copilot to refactor code by describing the desired transformation in a comment or using Copilot Chat.',
    h3Documentation: 'Documentation Generation',
    documentationDesc: 'Copilot can generate documentation from code, including JSDoc comments, README sections, and API documentation.',
    h3RegexHelp: 'Regular Expression Help',
    regexDesc: 'Copilot is particularly good at writing and explaining regular expressions. Describe what you want to match in natural language.',
    h3DataTransform: 'Data Transformations',
    dataTransformDesc: 'Copilot handles data transformation code well. Provide a sample input and expected output, and it will generate the transformation logic.',
    h2BestPractices: 'Best Practices',
    bp1: 'Always review generated code carefully before accepting. Copilot can produce plausible but incorrect code.',
    bp2: 'Keep open tabs relevant. Close unrelated files to improve context quality.',
    bp3: 'Use TypeScript for better suggestions. Type annotations dramatically improve Copilot accuracy.',
    bp4: 'Write specific comments. "Sort users by age descending" is better than "sort users".',
    bp5: 'Reject and re-prompt if the first suggestion is wrong. Copilot often improves on retry.',
    bp6: 'Use Copilot Chat for complex tasks instead of inline suggestions.',
    bp7: 'Create a Copilot instructions file (.github/copilot-instructions.md) for project-specific guidance.',
    bp8: 'Do not use Copilot for security-sensitive code without expert review.',
    bp9: 'Leverage Copilot for boilerplate, test generation, and documentation while focusing your effort on architecture and business logic.',
    h2Security: 'Security Considerations',
    securityDesc: 'While Copilot is powerful, it requires careful attention to security.',
    sec1: 'Never accept suggested credentials, API keys, or secrets without reviewing them',
    sec2: 'Copilot may suggest code with known vulnerabilities (SQL injection, XSS, etc.)',
    sec3: 'Always validate and sanitize user input, even in Copilot-generated code',
    sec4: 'Review cryptographic code suggestions with a security expert',
    sec5: 'Use Copilot Content Exclusions to prevent sensitive files from being sent to the model',
    sec6: 'Enable code scanning to catch security issues in generated code',
    h2CopilotX: 'Copilot Workspace and Agent Mode',
    copilotXDesc: 'GitHub Copilot continues to evolve beyond code completion. Copilot Workspace allows you to plan, implement, and review changes across entire repositories using natural language. Agent mode enables Copilot to autonomously complete multi-step tasks.',
    h3Workspace: 'Copilot Workspace',
    workspaceDesc: 'Copilot Workspace takes a GitHub issue and generates a plan, specifies file changes, implements the changes, and creates a pull request. You review and refine at each step.',
    h3AgentMode: 'Agent Mode in VS Code',
    agentModeDesc: 'Agent mode allows Copilot to autonomously execute multi-step tasks: running terminal commands, reading/editing files, and iterating based on errors. It is like having a junior developer that follows instructions.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is GitHub Copilot worth the $10/month?',
    faq1A: 'For professional developers, yes. Studies show Copilot increases productivity by 30-55% and significantly reduces time spent on boilerplate code, test writing, and documentation. The free tier (Copilot Free, 2000 completions/month) is enough for light use. The Individual plan ($10/month) is ideal for most developers. Business ($19/user/month) adds policy controls and enterprise features.',
    faq2Q: 'Does Copilot work with all programming languages?',
    faq2A: 'Copilot supports all major programming languages but works best with languages well-represented in its training data: TypeScript, JavaScript, Python, Go, Rust, Java, C++, C#, Ruby, and PHP. It also works with markup languages (HTML, CSS, SQL), configuration formats (YAML, JSON, TOML), and shell scripts.',
    faq3Q: 'Can Copilot understand my entire codebase?',
    faq3A: 'Copilot has a limited context window (currently several thousand tokens). It primarily uses the current file, open tabs, and recent edits. For broader codebase understanding, use Copilot Chat with @workspace to search across your project. Copilot does not have persistent memory of your codebase between sessions.',
    faq4Q: 'Is code generated by Copilot safe to use in proprietary projects?',
    faq4A: 'GitHub states that Copilot suggestions are generated and not copied from specific repositories. The Copilot Individual and Business plans include a filter to block suggestions matching public code. However, you are responsible for reviewing generated code for correctness, security, and licensing compliance. Enable the duplicate detection filter for added protection.',
    faq5Q: 'What is the difference between Copilot and ChatGPT for coding?',
    faq5A: 'Copilot is integrated into your editor and provides real-time suggestions with direct access to your codebase context (open files, project structure). ChatGPT requires copy-pasting code and lacks editor integration. Copilot is better for inline coding, while ChatGPT is better for architectural discussions, learning concepts, and debugging conversations.',
  },
  zh: {
    title: 'GitHub Copilot 技巧和窍门：最大化你的 AI 结对编程',
    intro: 'GitHub Copilot 已成为开发者的必备工具，据研究显示可提高 30-55% 的生产力。然而，许多开发者只触及了 Copilot 功能的表面。本指南涵盖高级技巧、提示工程策略和工作流集成。',
    h2HowWorks: 'GitHub Copilot 工作原理',
    howWorksDesc: 'Copilot 使用在公共代码库上训练的大语言模型来生成代码建议。它分析你的当前文件、打开的标签页、最近的编辑和注释来预测你想写什么。',
    h3Context: '上下文窗口',
    contextDesc: 'Copilot 在生成建议时考虑多个上下文源：当前文件、编辑器中打开的标签页、文件路径和名称、导入的模块以及最近的编辑历史。',
    h2PromptEngineering: 'Copilot 的提示工程',
    promptDesc: 'Copilot 建议的质量很大程度上取决于你如何编写代码和注释。每个注释、函数名和类型注解都是给 AI 的提示。',
    h3Comments: '注释驱动开发',
    commentsDesc: '在代码之前编写描述性注释来引导 Copilot。注释越具体，生成的代码越准确。',
    h3FunctionSigs: '函数签名作为提示',
    functionSigsDesc: '带有描述性参数名的类型化函数签名是强大的提示。',
    h3Examples: '提供示例',
    examplesDesc: '当 Copilot 第一次没有生成正确代码时，提供期望输入/输出的示例。',
    h2Shortcuts: '必备键盘快捷键',
    shortcutsDesc: '掌握这些快捷键以高效使用 Copilot。',
    h2CopilotChat: 'Copilot Chat',
    copilotChatDesc: 'Copilot Chat 在编辑器中提供交互式 AI 助手，可以解释代码、修复 bug、生成测试和回答问题。',
    h3SlashCommands: '斜杠命令',
    slashCommandsDesc: 'Copilot Chat 支持用于常见任务的斜杠命令。',
    h3ContextRefs: '上下文引用',
    contextRefsDesc: '使用 @ 引用指向特定上下文：@workspace 用于整个项目，@file 用于特定文件。',
    h2Patterns: '高级模式',
    h3TestGeneration: '测试生成',
    testGenDesc: 'Copilot 擅长生成测试。提供要测试的函数和期望行为的清晰描述。',
    h3Refactoring: '代码重构',
    refactoringDesc: '使用 Copilot 通过在注释中描述期望的转换来重构代码。',
    h3Documentation: '文档生成',
    documentationDesc: 'Copilot 可以从代码生成文档，包括 JSDoc 注释和 README 部分。',
    h3RegexHelp: '正则表达式帮助',
    regexDesc: 'Copilot 特别擅长编写和解释正则表达式。用自然语言描述你想匹配的内容。',
    h3DataTransform: '数据转换',
    dataTransformDesc: 'Copilot 很好地处理数据转换代码。提供示例输入和期望输出。',
    h2BestPractices: '最佳实践',
    bp1: '接受前始终仔细审查生成的代码',
    bp2: '保持打开的标签页相关。关闭不相关的文件以提高上下文质量',
    bp3: '使用 TypeScript 获得更好的建议。类型注解大幅提高准确性',
    bp4: '编写具体的注释',
    bp5: '如果第一个建议不对就拒绝并重新提示',
    bp6: '对复杂任务使用 Copilot Chat',
    bp7: '创建 Copilot 指令文件用于项目特定指导',
    bp8: '不要在没有专家审查的情况下将 Copilot 用于安全敏感代码',
    bp9: '利用 Copilot 处理模板代码、测试生成和文档，将精力集中在架构和业务逻辑上',
    h2Security: '安全注意事项',
    securityDesc: '虽然 Copilot 功能强大，但需要注意安全性。',
    sec1: '永远不要不审查就接受建议的凭据或 API 密钥',
    sec2: 'Copilot 可能建议有已知漏洞的代码',
    sec3: '始终验证和清理用户输入',
    sec4: '与安全专家一起审查加密代码建议',
    sec5: '使用 Copilot 内容排除防止敏感文件被发送到模型',
    sec6: '启用代码扫描以捕获生成代码中的安全问题',
    h2CopilotX: 'Copilot Workspace 和 Agent 模式',
    copilotXDesc: 'GitHub Copilot 持续进化。Copilot Workspace 允许使用自然语言计划、实施和审查整个仓库的变更。Agent 模式允许自主完成多步骤任务。',
    h3Workspace: 'Copilot Workspace',
    workspaceDesc: 'Copilot Workspace 接收 GitHub issue 并生成计划、指定文件变更、实施变更并创建 PR。',
    h3AgentMode: 'VS Code 中的 Agent 模式',
    agentModeDesc: 'Agent 模式允许 Copilot 自主执行多步骤任务：运行终端命令、读写文件并基于错误迭代。',
    h2Faq: '常见问题',
    faq1Q: 'GitHub Copilot 值 10 美元/月吗？',
    faq1A: '对专业开发者来说，值得。研究显示 Copilot 提高 30-55% 的生产力。免费层足够轻度使用。',
    faq2Q: 'Copilot 支持所有编程语言吗？',
    faq2A: 'Copilot 支持所有主要编程语言，但对 TypeScript、JavaScript、Python、Go 等效果最好。',
    faq3Q: 'Copilot 能理解整个代码库吗？',
    faq3A: 'Copilot 有有限的上下文窗口。主要使用当前文件和打开的标签页。使用 @workspace 搜索整个项目。',
    faq4Q: 'Copilot 生成的代码可以用在专有项目中吗？',
    faq4A: 'GitHub 表示 Copilot 建议是生成的而非从特定仓库复制的。启用重复检测过滤器以获得额外保护。',
    faq5Q: 'Copilot 和 ChatGPT 编程有什么区别？',
    faq5A: 'Copilot 集成在编辑器中并直接访问代码库上下文。ChatGPT 需要复制粘贴代码。Copilot 更适合内联编码，ChatGPT 更适合架构讨论。',
  },
};

export default function GithubCopilotTips({ lang }: { lang: string }) {
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
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* How Copilot Works */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2HowWorks}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.howWorksDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Context}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.contextDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Copilot context sources (ranked by importance):
// 1. Current file content (most important)
// 2. File name and path (e.g., src/utils/date.ts hints at date utilities)
// 3. Open tabs in your editor
// 4. Imported modules and their types
// 5. Recent edits and cursor position
// 6. Comments and JSDoc annotations

// PRO TIP: Name your files descriptively
// "helpers.ts" -> vague context
// "date-formatting-utils.ts" -> Copilot knows to suggest date formatting code`}</code></pre>

      {/* Prompt Engineering */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2PromptEngineering}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.promptDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Comments}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.commentsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// BAD: vague comment
// sort the data
function sortData(data) { ... }

// GOOD: specific comment with details
// Sort users by last login date, most recent first.
// Users who have never logged in should appear at the end.
// Preserve original array (return new sorted array).
function sortUsersByLastLogin(users: User[]): User[] {
  // Copilot will generate accurate sorting logic
}

// GREAT: step-by-step comments for complex logic
// 1. Filter out inactive users (status !== "active")
// 2. Group remaining users by department
// 3. Sort each group by join date (ascending)
// 4. Return a Map<department, User[]>
function organizeActiveUsers(users: User[]): Map<string, User[]> {
  // Copilot follows the steps precisely
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3FunctionSigs}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.functionSigsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Type annotations guide Copilot significantly

// BAD: no types, vague name
function process(data) { ... }

// GOOD: typed, descriptive name
function calculateMonthlyRevenue(
  transactions: Transaction[],
  month: number,
  year: number
): { total: number; count: number; average: number } {
  // Copilot will generate accurate calculation logic
}

// JSDoc enhances suggestions further
/**
 * Converts a file size in bytes to a human-readable string.
 * @param bytes - File size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Human-readable string like "1.5 MB" or "300 KB"
 * @example formatBytes(1536) // "1.5 KB"
 * @example formatBytes(1073741824) // "1 GB"
 */
function formatBytes(bytes: number, decimals = 2): string {
  // Copilot generates the exact implementation
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Examples}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.examplesDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Provide examples for pattern-based code generation

// Convert snake_case to camelCase
// "user_name" -> "userName"
// "first_name_last" -> "firstNameLast"
// "already_camelCase" -> "alreadyCamelCase"
function snakeToCamel(str: string): string {
  // Copilot follows the pattern from examples
}

// Generate test data following a pattern
const testUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "user" },
  // Copilot continues the pattern...
  // { id: 3, name: "Charlie", email: "charlie@example.com", role: "user" },
];`}</code></pre>

      {/* Keyboard Shortcuts */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Shortcuts}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.shortcutsDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Action</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Mac</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Windows/Linux</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Accept suggestion', 'Tab', 'Tab'],
              ['Dismiss suggestion', 'Esc', 'Esc'],
              ['Next suggestion', 'Option + ]', 'Alt + ]'],
              ['Previous suggestion', 'Option + [', 'Alt + ['],
              ['Open Copilot panel (10 suggestions)', 'Ctrl + Enter', 'Ctrl + Enter'],
              ['Inline Chat', 'Cmd + I', 'Ctrl + I'],
              ['Open Copilot Chat', 'Cmd + Shift + I', 'Ctrl + Shift + I'],
              ['Accept word', 'Cmd + Right Arrow', 'Ctrl + Right Arrow'],
              ['Accept line', 'Cmd + End', 'End'],
            ].map(([action, mac, win], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{action}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontFamily: 'monospace' }}>{mac}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontFamily: 'monospace' }}>{win}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Copilot Chat */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2CopilotChat}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.copilotChatDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3SlashCommands}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.slashCommandsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Copilot Chat slash commands (type in chat panel):

/explain    - Explain how the selected code works
/fix        - Propose a fix for problems in the selected code
/tests      - Generate unit tests for the selected code
/doc        - Generate documentation for the selected code
/optimize   - Analyze and improve performance of selected code
/clear      - Clear the chat history
/new        - Scaffold a new project or file

// Examples:
// Select a function, then type: /explain
// Select buggy code, then type: /fix
// Select a class, then type: /tests using vitest
// Type: /new create a REST API with Express and TypeScript`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ContextRefs}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.contextRefsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Context references in Copilot Chat:

@workspace  - Search and reference your entire workspace
@file       - Reference a specific file
@terminal   - Reference terminal output
@selection  - Reference currently selected code

// Examples:
// "How does authentication work in @workspace?"
// "What does @file:src/utils/auth.ts do?"
// "Fix the error shown in @terminal"
// "Refactor @selection to use async/await"

// Combining references for powerful queries:
// "Based on @file:src/types.ts, generate CRUD endpoints
//  for the User type in @file:src/routes/users.ts"`}</code></pre>

      {/* Advanced Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Patterns}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3TestGeneration}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.testGenDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Tip: Write one test manually, Copilot generates the rest

import { describe, it, expect } from "vitest";
import { formatBytes } from "./utils";

describe("formatBytes", () => {
  it("should format bytes correctly", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
  });

  // Copilot generates remaining tests:
  it("should format kilobytes", () => {
    expect(formatBytes(1024)).toBe("1 KB");
  });

  it("should format megabytes", () => {
    expect(formatBytes(1048576)).toBe("1 MB");
  });

  it("should handle decimal places", () => {
    expect(formatBytes(1536, 1)).toBe("1.5 KB");
  });

  it("should handle negative numbers", () => {
    expect(formatBytes(-1)).toBe("0 Bytes");
  });
});`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3RegexHelp}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.regexDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Describe what you want to match in natural language:

// Match email addresses (RFC 5322 simplified)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

// Match US phone numbers: (555) 123-4567, 555-123-4567, 5551234567
const phoneRegex = /^\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$/;

// Match ISO 8601 datetime: 2026-02-23T10:30:00Z
const isoDateRegex = /^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|[+-]\\d{2}:\\d{2})$/;

// Match semantic version: 1.2.3, 1.0.0-beta.1, 2.1.0+build.123
const semverRegex = /^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(-[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+)*)?(\\+[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+)*)?$/;`}</code></pre>

      {/* Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2BestPractices}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.bp1, t.bp2, t.bp3, t.bp4, t.bp5, t.bp6, t.bp7, t.bp8, t.bp9].map((bp, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{bp}</li>
        ))}
      </ul>

      {/* Security */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Security}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.securityDesc}</p>
      <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
        <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
          {[t.sec1, t.sec2, t.sec3, t.sec4, t.sec5, t.sec6].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Copilot Workspace and Agent Mode */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2CopilotX}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.copilotXDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Workspace}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.workspaceDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3AgentMode}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.agentModeDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Agent mode example prompts:

// "Add input validation to all API endpoints in src/routes/"
// -> Copilot scans files, adds Zod validation, runs tests

// "Refactor the auth module to use JWT instead of sessions"
// -> Copilot plans changes, modifies files, updates tests

// "Fix the failing CI tests in the latest PR"
// -> Copilot reads test output, identifies issues, applies fixes

// "Add dark mode support to all components"
// -> Copilot identifies components, adds theme variables, tests

// Agent mode workflow:
// 1. You describe the task in natural language
// 2. Copilot creates a plan with file changes
// 3. You review and approve the plan
// 4. Copilot executes: edits files, runs commands, iterates on errors
// 5. You review the final result`}</code></pre>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A],
          [t.faq4Q, t.faq4A], [t.faq5Q, t.faq5A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
