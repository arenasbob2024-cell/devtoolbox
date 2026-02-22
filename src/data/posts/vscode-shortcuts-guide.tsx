'use client';

import Link from 'next/link';

export default function VscodeShortcutsGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>Why Keyboard Shortcuts Matter for Developers</h2>
      <p>
        <strong>VS Code keyboard shortcuts</strong> are one of the fastest ways to boost your coding productivity. Every time you reach for the mouse, you lose a few seconds -- and those seconds add up to hours over a week. Developers who master keyboard shortcuts in Visual Studio Code report completing tasks 30-50% faster than those who rely on menus and mouse clicks.
      </p>
      <p>
        This guide covers the most impactful VS Code shortcuts for macOS and Windows/Linux, organized by workflow category. Whether you are editing code, navigating files, managing terminals, or debugging, these shortcuts will transform how you work.
      </p>

      <h2>Essential Navigation Shortcuts</h2>
      <p>
        Navigation is where you spend the most time. These shortcuts help you jump between files, symbols, and lines without touching the mouse.
      </p>

      <h3>File and Tab Navigation</h3>
      <table>
        <thead>
          <tr><th>Action</th><th>macOS</th><th>Windows / Linux</th></tr>
        </thead>
        <tbody>
          <tr><td>Quick Open (file by name)</td><td>Cmd+P</td><td>Ctrl+P</td></tr>
          <tr><td>Command Palette</td><td>Cmd+Shift+P</td><td>Ctrl+Shift+P</td></tr>
          <tr><td>Switch between open tabs</td><td>Cmd+Tab / Ctrl+Tab</td><td>Ctrl+Tab</td></tr>
          <tr><td>Go to specific tab</td><td>Cmd+1...9</td><td>Ctrl+1...9</td></tr>
          <tr><td>Close current tab</td><td>Cmd+W</td><td>Ctrl+W</td></tr>
          <tr><td>Reopen closed tab</td><td>Cmd+Shift+T</td><td>Ctrl+Shift+T</td></tr>
          <tr><td>Toggle sidebar visibility</td><td>Cmd+B</td><td>Ctrl+B</td></tr>
          <tr><td>Toggle terminal</td><td>Cmd+`</td><td>Ctrl+`</td></tr>
          <tr><td>Open Explorer panel</td><td>Cmd+Shift+E</td><td>Ctrl+Shift+E</td></tr>
          <tr><td>Open Search panel</td><td>Cmd+Shift+F</td><td>Ctrl+Shift+F</td></tr>
          <tr><td>Open Source Control panel</td><td>Cmd+Shift+G</td><td>Ctrl+Shift+G</td></tr>
          <tr><td>Open Extensions panel</td><td>Cmd+Shift+X</td><td>Ctrl+Shift+X</td></tr>
        </tbody>
      </table>

      <h3>Code Navigation</h3>
      <table>
        <thead>
          <tr><th>Action</th><th>macOS</th><th>Windows / Linux</th></tr>
        </thead>
        <tbody>
          <tr><td>Go to line number</td><td>Ctrl+G</td><td>Ctrl+G</td></tr>
          <tr><td>Go to symbol in file</td><td>Cmd+Shift+O</td><td>Ctrl+Shift+O</td></tr>
          <tr><td>Go to symbol in workspace</td><td>Cmd+T</td><td>Ctrl+T</td></tr>
          <tr><td>Go to definition</td><td>F12</td><td>F12</td></tr>
          <tr><td>Peek definition (inline)</td><td>Option+F12</td><td>Alt+F12</td></tr>
          <tr><td>Go to type definition</td><td>Cmd+Click</td><td>Ctrl+Click</td></tr>
          <tr><td>Find all references</td><td>Shift+F12</td><td>Shift+F12</td></tr>
          <tr><td>Go back / forward</td><td>Ctrl+- / Ctrl+Shift+-</td><td>Alt+Left / Alt+Right</td></tr>
          <tr><td>Breadcrumb navigation</td><td>Cmd+Shift+.</td><td>Ctrl+Shift+.</td></tr>
        </tbody>
      </table>

      <h2>Editing Shortcuts That Save Hours</h2>
      <p>
        These editing shortcuts handle the tasks you repeat hundreds of times a day: moving lines, duplicating code, selecting text, and formatting.
      </p>

      <h3>Line Operations</h3>
      <table>
        <thead>
          <tr><th>Action</th><th>macOS</th><th>Windows / Linux</th></tr>
        </thead>
        <tbody>
          <tr><td>Move line up / down</td><td>Option+Up / Down</td><td>Alt+Up / Down</td></tr>
          <tr><td>Copy line up / down</td><td>Shift+Option+Up / Down</td><td>Shift+Alt+Up / Down</td></tr>
          <tr><td>Delete entire line</td><td>Cmd+Shift+K</td><td>Ctrl+Shift+K</td></tr>
          <tr><td>Insert line below</td><td>Cmd+Enter</td><td>Ctrl+Enter</td></tr>
          <tr><td>Insert line above</td><td>Cmd+Shift+Enter</td><td>Ctrl+Shift+Enter</td></tr>
          <tr><td>Indent line</td><td>Cmd+]</td><td>Ctrl+]</td></tr>
          <tr><td>Outdent line</td><td>Cmd+[</td><td>Ctrl+[</td></tr>
          <tr><td>Toggle line comment</td><td>Cmd+/</td><td>Ctrl+/</td></tr>
          <tr><td>Toggle block comment</td><td>Shift+Option+A</td><td>Shift+Alt+A</td></tr>
          <tr><td>Join lines</td><td>Ctrl+J</td><td>(custom binding)</td></tr>
        </tbody>
      </table>

      <h3>Selection and Multi-Cursor</h3>
      <p>
        Multi-cursor editing is one of VS Code's most powerful features. Once you master it, you will never want to edit text any other way.
      </p>
      <table>
        <thead>
          <tr><th>Action</th><th>macOS</th><th>Windows / Linux</th></tr>
        </thead>
        <tbody>
          <tr><td>Add cursor above / below</td><td>Cmd+Option+Up / Down</td><td>Ctrl+Alt+Up / Down</td></tr>
          <tr><td>Add cursor at click position</td><td>Option+Click</td><td>Alt+Click</td></tr>
          <tr><td>Select current word</td><td>Cmd+D</td><td>Ctrl+D</td></tr>
          <tr><td>Select all occurrences of word</td><td>Cmd+Shift+L</td><td>Ctrl+Shift+L</td></tr>
          <tr><td>Select current line</td><td>Cmd+L</td><td>Ctrl+L</td></tr>
          <tr><td>Expand selection</td><td>Cmd+Shift+Right</td><td>Shift+Alt+Right</td></tr>
          <tr><td>Shrink selection</td><td>Cmd+Shift+Left</td><td>Shift+Alt+Left</td></tr>
          <tr><td>Column (box) selection</td><td>Shift+Option+Drag</td><td>Shift+Alt+Drag</td></tr>
          <tr><td>Select all matching find results</td><td>Cmd+Shift+L after Cmd+F</td><td>Ctrl+Shift+L after Ctrl+F</td></tr>
        </tbody>
      </table>

      <h3>Multi-Cursor Workflow Example</h3>
      <pre><code className="language-text">{`Scenario: Rename a CSS class in multiple places at once

1. Place cursor on the class name
2. Press Cmd+D (Ctrl+D) repeatedly to select each occurrence
3. Type the new name -- all instances update simultaneously

Before:
  <div class="old-card">
    <h2 class="old-card-title">...</h2>
    <p class="old-card-body">...</p>
  </div>

After (typed "new-card" once):
  <div class="new-card">
    <h2 class="new-card-title">...</h2>
    <p class="new-card-body">...</p>
  </div>`}</code></pre>

      <h2>Search and Replace</h2>
      <table>
        <thead>
          <tr><th>Action</th><th>macOS</th><th>Windows / Linux</th></tr>
        </thead>
        <tbody>
          <tr><td>Find in file</td><td>Cmd+F</td><td>Ctrl+F</td></tr>
          <tr><td>Replace in file</td><td>Cmd+Option+F</td><td>Ctrl+H</td></tr>
          <tr><td>Find in workspace (all files)</td><td>Cmd+Shift+F</td><td>Ctrl+Shift+F</td></tr>
          <tr><td>Replace in workspace</td><td>Cmd+Shift+H</td><td>Ctrl+Shift+H</td></tr>
          <tr><td>Find next / previous match</td><td>Cmd+G / Cmd+Shift+G</td><td>F3 / Shift+F3</td></tr>
          <tr><td>Toggle regex in search</td><td>Cmd+Option+R</td><td>Alt+R</td></tr>
          <tr><td>Toggle case-sensitive search</td><td>Cmd+Option+C</td><td>Alt+C</td></tr>
          <tr><td>Toggle whole word match</td><td>Cmd+Option+W</td><td>Alt+W</td></tr>
        </tbody>
      </table>

      <h3>Regex Search Examples in VS Code</h3>
      <pre><code className="language-text">{`# Find all console.log statements
console\\.log\\(.*\\)

# Find function declarations (JS/TS)
(function|const|let|var)\\s+\\w+\\s*=\\s*(async\\s+)?\\(

# Find TODO/FIXME comments
(TODO|FIXME|HACK|BUG):\\s*.*

# Find imports from a specific module
import.*from\\s+['"]@/components.*['"]

# Find empty HTML tags
<(\\w+)[^>]*>\\s*<\\/\\1>

# Replace: convert px to rem (capture group)
Find:    (\\d+)px
Replace: calc($1 / 16 * 1rem)`}</code></pre>

      <h2>Code Intelligence and Refactoring</h2>
      <table>
        <thead>
          <tr><th>Action</th><th>macOS</th><th>Windows / Linux</th></tr>
        </thead>
        <tbody>
          <tr><td>Trigger suggestions</td><td>Ctrl+Space</td><td>Ctrl+Space</td></tr>
          <tr><td>Trigger parameter hints</td><td>Cmd+Shift+Space</td><td>Ctrl+Shift+Space</td></tr>
          <tr><td>Quick Fix (lightbulb actions)</td><td>Cmd+.</td><td>Ctrl+.</td></tr>
          <tr><td>Rename symbol</td><td>F2</td><td>F2</td></tr>
          <tr><td>Format document</td><td>Shift+Option+F</td><td>Shift+Alt+F</td></tr>
          <tr><td>Format selection</td><td>Cmd+K Cmd+F</td><td>Ctrl+K Ctrl+F</td></tr>
          <tr><td>Organize imports</td><td>Shift+Option+O</td><td>Shift+Alt+O</td></tr>
          <tr><td>Extract to function/variable</td><td>Cmd+. (select refactoring)</td><td>Ctrl+. (select refactoring)</td></tr>
          <tr><td>Fold / unfold code block</td><td>Cmd+Option+[ / ]</td><td>Ctrl+Shift+[ / ]</td></tr>
          <tr><td>Fold all / unfold all</td><td>Cmd+K Cmd+0 / Cmd+K Cmd+J</td><td>Ctrl+K Ctrl+0 / Ctrl+K Ctrl+J</td></tr>
        </tbody>
      </table>

      <h2>Terminal and Integrated Tools</h2>
      <table>
        <thead>
          <tr><th>Action</th><th>macOS</th><th>Windows / Linux</th></tr>
        </thead>
        <tbody>
          <tr><td>Toggle integrated terminal</td><td>Cmd+`</td><td>Ctrl+`</td></tr>
          <tr><td>Create new terminal</td><td>Cmd+Shift+`</td><td>Ctrl+Shift+`</td></tr>
          <tr><td>Split terminal</td><td>Cmd+\</td><td>Ctrl+\</td></tr>
          <tr><td>Switch terminal instance</td><td>Cmd+Shift+[ / ]</td><td>Ctrl+PageUp / PageDown</td></tr>
          <tr><td>Clear terminal</td><td>Cmd+K</td><td>Ctrl+K</td></tr>
          <tr><td>Kill terminal</td><td>Click trash icon or type exit</td><td>Click trash icon or type exit</td></tr>
          <tr><td>Toggle problems panel</td><td>Cmd+Shift+M</td><td>Ctrl+Shift+M</td></tr>
          <tr><td>Toggle output panel</td><td>Cmd+Shift+U</td><td>Ctrl+Shift+U</td></tr>
        </tbody>
      </table>

      <h2>Debugging Shortcuts</h2>
      <table>
        <thead>
          <tr><th>Action</th><th>macOS</th><th>Windows / Linux</th></tr>
        </thead>
        <tbody>
          <tr><td>Start / continue debugging</td><td>F5</td><td>F5</td></tr>
          <tr><td>Stop debugging</td><td>Shift+F5</td><td>Shift+F5</td></tr>
          <tr><td>Restart debugging</td><td>Cmd+Shift+F5</td><td>Ctrl+Shift+F5</td></tr>
          <tr><td>Step over</td><td>F10</td><td>F10</td></tr>
          <tr><td>Step into</td><td>F11</td><td>F11</td></tr>
          <tr><td>Step out</td><td>Shift+F11</td><td>Shift+F11</td></tr>
          <tr><td>Toggle breakpoint</td><td>F9</td><td>F9</td></tr>
          <tr><td>Conditional breakpoint</td><td>Right-click gutter</td><td>Right-click gutter</td></tr>
          <tr><td>Inline breakpoint</td><td>Shift+F9</td><td>Shift+F9</td></tr>
          <tr><td>Debug console</td><td>Cmd+Shift+Y</td><td>Ctrl+Shift+Y</td></tr>
        </tbody>
      </table>

      <h2>Git Integration Shortcuts</h2>
      <table>
        <thead>
          <tr><th>Action</th><th>macOS</th><th>Windows / Linux</th></tr>
        </thead>
        <tbody>
          <tr><td>Open Source Control view</td><td>Cmd+Shift+G</td><td>Ctrl+Shift+G</td></tr>
          <tr><td>Stage changes</td><td>Click + icon or Cmd+Shift+G then select</td><td>Click + icon</td></tr>
          <tr><td>View diff of file</td><td>Click file in Source Control</td><td>Click file in Source Control</td></tr>
          <tr><td>Open Git output</td><td>Cmd+Shift+U (select Git)</td><td>Ctrl+Shift+U (select Git)</td></tr>
          <tr><td>Inline diff view toggle</td><td>From Command Palette</td><td>From Command Palette</td></tr>
        </tbody>
      </table>

      <h2>Window and Layout Management</h2>
      <table>
        <thead>
          <tr><th>Action</th><th>macOS</th><th>Windows / Linux</th></tr>
        </thead>
        <tbody>
          <tr><td>Split editor right</td><td>Cmd+\</td><td>Ctrl+\</td></tr>
          <tr><td>Split editor down</td><td>Cmd+K Cmd+\</td><td>Ctrl+K Ctrl+\</td></tr>
          <tr><td>Focus editor group 1/2/3</td><td>Cmd+1 / Cmd+2 / Cmd+3</td><td>Ctrl+1 / Ctrl+2 / Ctrl+3</td></tr>
          <tr><td>Move editor to next group</td><td>Cmd+Option+Right</td><td>Ctrl+Alt+Right</td></tr>
          <tr><td>Toggle full screen</td><td>Cmd+Ctrl+F</td><td>F11</td></tr>
          <tr><td>Toggle Zen Mode</td><td>Cmd+K Z</td><td>Ctrl+K Z</td></tr>
          <tr><td>Zoom in / out</td><td>Cmd+= / Cmd+-</td><td>Ctrl+= / Ctrl+-</td></tr>
          <tr><td>Toggle word wrap</td><td>Option+Z</td><td>Alt+Z</td></tr>
          <tr><td>Toggle minimap</td><td>From Command Palette</td><td>From Command Palette</td></tr>
        </tbody>
      </table>

      <h2>Custom Keybindings</h2>
      <p>
        You can customize any shortcut via <strong>Cmd+K Cmd+S</strong> (Ctrl+K Ctrl+S on Windows/Linux), or edit the <code>keybindings.json</code> file directly. Here are some popular custom bindings:
      </p>
      <pre><code className="language-json">{`// keybindings.json - Open via Cmd+K Cmd+S, then click the {} icon
[
  // Duplicate line without clipboard (alternative)
  {
    "key": "cmd+shift+d",
    "command": "editor.action.copyLinesDownAction",
    "when": "editorTextFocus"
  },
  // Move between editor tabs
  {
    "key": "cmd+1",
    "command": "workbench.action.openEditorAtIndex1"
  },
  // Toggle terminal with Cmd+J (common preference)
  {
    "key": "cmd+j",
    "command": "workbench.action.togglePanel"
  },
  // Save all files
  {
    "key": "cmd+shift+s",
    "command": "workbench.action.files.saveAll"
  },
  // Quick switch between recent files
  {
    "key": "cmd+e",
    "command": "workbench.action.quickOpenRecent"
  }
]`}</code></pre>

      <h2>Productivity Tips and Workflows</h2>

      <h3>Tip 1: The Quick Open Power Pattern</h3>
      <pre><code className="language-text">{`Cmd+P (Ctrl+P) supports special prefixes:

  filename       → Open file by name
  :lineNumber    → Go to line (e.g., :42)
  @symbol        → Go to symbol in file
  @:category     → Symbols grouped by category
  #symbol        → Go to symbol in workspace
  >command       → Run VS Code command
  ?              → Show help for Quick Open

Example workflow:
  1. Cmd+P → type "user" → opens UserComponent.tsx
  2. Cmd+P → type ":125" → jumps to line 125
  3. Cmd+P → type "@handleSubmit" → jumps to handleSubmit function`}</code></pre>

      <h3>Tip 2: Emmet Abbreviations for HTML/CSS</h3>
      <pre><code className="language-text">{`VS Code has built-in Emmet support. Type abbreviations and press Tab:

HTML:
  div.container>ul>li*5>a    → nested structure with 5 list items
  .card>.title+.body+.footer → div with three children
  input:email                → <input type="email">
  link:css                   → <link rel="stylesheet">
  !                          → full HTML5 boilerplate

CSS:
  m10        → margin: 10px;
  p20-30     → padding: 20px 30px;
  df         → display: flex;
  jcc        → justify-content: center;
  aic        → align-items: center;
  bgc#333    → background-color: #333;
  fz16       → font-size: 16px;`}</code></pre>

      <h3>Tip 3: Snippets for Repetitive Code</h3>
      <pre><code className="language-json">{`// Open: Cmd+Shift+P → "Configure User Snippets"
// Select language (e.g., typescriptreact.json)
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "interface \${1:Component}Props {",
      "  $2",
      "}",
      "",
      "export default function \${1:Component}({ $3 }: \${1:Component}Props) {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  );",
      "}"
    ]
  },
  "useState Hook": {
    "prefix": "ush",
    "body": "const [$1, set\${1/(.*)/$\{1:/capitalize\}/}] = useState<$2>($3);"
  },
  "useEffect Hook": {
    "prefix": "ueh",
    "body": [
      "useEffect(() => {",
      "  $1",
      "  return () => {",
      "    $2",
      "  };",
      "}, [$3]);"
    ]
  }
}`}</code></pre>

      <h2>VS Code Settings for Maximum Productivity</h2>
      <pre><code className="language-json">{`// settings.json - Open via Cmd+, then click {} icon
{
  // Auto-save files after delay
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,

  // Format on save and paste
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,

  // Smooth cursor animation
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.cursorBlinking": "smooth",

  // Bracket pair colorization (built-in)
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",

  // Sticky scroll (shows current scope)
  "editor.stickyScroll.enabled": true,

  // Minimap settings
  "editor.minimap.enabled": true,
  "editor.minimap.maxColumn": 80,

  // Font and display
  "editor.fontSize": 14,
  "editor.lineHeight": 1.6,
  "editor.fontLigatures": true,

  // Terminal settings
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.cursorStyle": "line"
}`}</code></pre>

      <h2>Essential Extensions for Shortcut Power Users</h2>
      <table>
        <thead>
          <tr><th>Extension</th><th>Purpose</th><th>Key Shortcut Added</th></tr>
        </thead>
        <tbody>
          <tr><td>Vim</td><td>Vim keybindings in VS Code</td><td>All Vim motions</td></tr>
          <tr><td>GitLens</td><td>Git blame, history, comparisons</td><td>Various Git shortcuts</td></tr>
          <tr><td>Bookmarks</td><td>Mark and jump between lines</td><td>Ctrl+Alt+K to toggle</td></tr>
          <tr><td>Project Manager</td><td>Switch between projects quickly</td><td>Alt+Shift+P</td></tr>
          <tr><td>Multi-Cursor Case Preserve</td><td>Preserves case during multi-cursor edits</td><td>Works with Cmd+D</td></tr>
          <tr><td>IntelliCode</td><td>AI-assisted code completion</td><td>Enhances Ctrl+Space</td></tr>
        </tbody>
      </table>

      <h2>Printable Cheat Sheet Summary</h2>
      <pre><code className="language-text">{`╔══════════════════════════════════════════════════════════════╗
║              VS CODE SHORTCUTS CHEAT SHEET                   ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  NAVIGATE                    EDIT                            ║
║  Cmd+P     Quick Open        Cmd+D     Select word           ║
║  Cmd+Shift+P  Command Palette  Option+Up  Move line up      ║
║  Ctrl+G    Go to line        Cmd+Shift+K  Delete line        ║
║  F12       Go to definition  Cmd+/     Toggle comment        ║
║  Cmd+Shift+O  Go to symbol   Shift+Option+F  Format          ║
║                                                              ║
║  SEARCH                     MULTI-CURSOR                     ║
║  Cmd+F     Find in file     Cmd+D       Add next match       ║
║  Cmd+Shift+F  Find in workspace  Cmd+Shift+L  All matches   ║
║  Cmd+H     Replace           Option+Click  Add cursor        ║
║                              Cmd+Option+Up  Cursor above     ║
║                                                              ║
║  TERMINAL                   DEBUG                            ║
║  Cmd+\`     Toggle terminal   F5        Start debugging       ║
║  Cmd+Shift+\`  New terminal   F9        Toggle breakpoint     ║
║  Cmd+\\     Split terminal    F10       Step over             ║
║                              F11       Step into             ║
╚══════════════════════════════════════════════════════════════╝`}</code></pre>

      <h2>Conclusion</h2>
      <p>
        Mastering VS Code keyboard shortcuts is an investment that pays off every day. Start by learning five shortcuts this week, practice them until they become muscle memory, then add five more the next week. Within a month, you will navigate and edit code dramatically faster.
      </p>
      <p>
        The most impactful shortcuts to learn first are: <strong>Cmd+P</strong> (Quick Open), <strong>Cmd+D</strong> (select next occurrence), <strong>Cmd+Shift+P</strong> (Command Palette), <strong>Option+Up/Down</strong> (move lines), and <strong>Cmd+/</strong> (toggle comment). These five alone will transform your daily workflow.
      </p>
      <p>
        Use our <Link href={`/${lang}/tools/diff-checker`}>Diff Checker</Link> to compare code changes, or explore our <Link href={`/${lang}/blog/git-commands-cheat-sheet`}>Git Commands Cheat Sheet</Link> to complement your VS Code productivity.
      </p>
    </>
  );
}
