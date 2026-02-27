'use client';

import React from 'react';

const translations = {
  en: {
    title: 'Vim Guide — Complete Vim/Neovim Tutorial for Developers',
    description:
      'Master Vim and Neovim with this comprehensive tutorial covering all modes, navigation, editing commands, text objects, macros, plugins, and configuration. Includes real keyboard shortcuts, .vimrc setup, and a Vim vs Neovim comparison.',
    content: 'en',
  },
  zh: {
    title: 'Vim 指南 — 开发者完整 Vim/Neovim 教程',
    description:
      '通过本综合教程掌握 Vim 和 Neovim，涵盖所有模式、导航、编辑命令、文本对象、宏、插件和配置。包含真实键盘快捷键、.vimrc 设置和 Vim vs Neovim 对比表。',
    content: 'zh',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I exit Vim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To exit Vim: press Escape to ensure you are in Normal mode, then type :q to quit (if no unsaved changes), :q! to quit without saving, :wq or :x to save and quit, or ZZ as a shortcut to save and quit. If you are stuck, Escape followed by :q! will always get you out.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the main modes in Vim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vim has five main modes: Normal mode (default, for navigation and commands), Insert mode (for typing text, entered with i, a, o, etc.), Visual mode (for selecting text, entered with v, V, or Ctrl+v), Command-line mode (for Ex commands, entered with :), and Replace mode (entered with R, overwrites existing text). Understanding modes is the key to Vim fluency.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Vim and Neovim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neovim is a modernized fork of Vim focused on extensibility and maintainability. Key differences: Neovim has built-in LSP (Language Server Protocol) support, uses Lua as its primary configuration language (init.lua) alongside Vimscript, has an async job control API, better defaults out of the box, and a more active plugin ecosystem. Vim is more stable and universally available. For new users, Neovim with a modern config (like LazyVim or Kickstart) offers a better IDE-like experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I search and replace text in Vim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the substitute command: :%s/old/new/g replaces all occurrences in the file. :s/old/new/g replaces on the current line only. Add the c flag for confirmation: :%s/old/new/gc. Use \\v for very magic mode (less escaping): :%s/\\v(foo|bar)/baz/g. Press / to search forward and ? to search backward. Use n and N to jump between matches.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are Vim text objects and why are they powerful?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Text objects let you operate on semantic units of text. They combine with operators: d (delete), c (change), y (yank), v (visual). Examples: diw deletes the inner word, ci" changes text inside quotes, da{ deletes a block including braces, yip yanks the inner paragraph. The pattern is operator + i/a + object. "i" means inner (without surrounding delimiter), "a" means around (including delimiter). Text objects are one of the most powerful Vim features for precise editing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Vim macros work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Macros record and replay a sequence of keystrokes. Start recording with q followed by a register letter (e.g., qa to record into register a). Perform your keystrokes. Stop recording with q. Replay with @ followed by the register (e.g., @a). Repeat the last macro with @@. Apply to multiple lines with a count: 10@a runs the macro 10 times. Macros are stored in named registers and can be edited by pasting the register contents, modifying them, and yanking them back.',
      },
    },
    {
      '@type': 'Question',
      name: 'What essential plugins should I install for Vim/Neovim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Essential plugins: telescope.nvim or fzf.vim for fuzzy finding files and text, nvim-tree or NERDTree for file explorer, vim-fugitive for Git integration, coc.nvim or Neovim native LSP for autocompletion and language features, nvim-treesitter for better syntax highlighting, lualine.nvim for a status line, and vim-surround for manipulating surrounding characters. For Neovim, consider LazyVim or Kickstart.nvim as full starter configurations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I split windows and manage buffers in Vim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Split horizontally with :split or Ctrl+w s. Split vertically with :vsplit or Ctrl+w v. Navigate between splits with Ctrl+w followed by h/j/k/l. Resize splits with Ctrl+w + or Ctrl+w -. Buffers are files loaded in memory: :ls lists all buffers, :b N switches to buffer N, :bn goes to next buffer, :bp goes to previous, :bd closes a buffer. Tabs work like workspaces: :tabnew opens a new tab, gt and gT navigate between tabs.',
      },
    },
  ],
};

const codeStyle: React.CSSProperties = {
  backgroundColor: '#1e293b',
  color: '#e2e8f0',
  padding: '16px 20px',
  borderRadius: '8px',
  fontFamily: '"Fira Code", "Cascadia Code", monospace',
  fontSize: '14px',
  lineHeight: '1.7',
  overflowX: 'auto',
  margin: '16px 0',
  whiteSpace: 'pre',
  display: 'block',
};

const inlineCodeStyle: React.CSSProperties = {
  backgroundColor: '#f1f5f9',
  color: '#0f172a',
  padding: '2px 6px',
  borderRadius: '4px',
  fontFamily: 'monospace',
  fontSize: '0.875em',
};

const h2Style: React.CSSProperties = {
  fontSize: '1.6rem',
  fontWeight: 700,
  color: '#0f172a',
  marginTop: '48px',
  marginBottom: '16px',
  borderBottom: '2px solid #e2e8f0',
  paddingBottom: '8px',
};

const h3Style: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#1e293b',
  marginTop: '32px',
  marginBottom: '12px',
};

const pStyle: React.CSSProperties = {
  lineHeight: '1.8',
  color: '#374151',
  marginBottom: '16px',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '24px',
  fontSize: '14px',
};

const thStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  padding: '10px 14px',
  textAlign: 'left',
  fontWeight: 600,
  color: '#374151',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  padding: '10px 14px',
  color: '#374151',
  verticalAlign: 'top',
};

const tdAltStyle: React.CSSProperties = {
  ...tdStyle,
  backgroundColor: '#f8fafc',
};

const kbdStyle: React.CSSProperties = {
  backgroundColor: '#1e293b',
  color: '#e2e8f0',
  padding: '2px 8px',
  borderRadius: '4px',
  fontFamily: 'monospace',
  fontSize: '0.85em',
  border: '1px solid #475569',
  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
};

function EnglishContent() {
  return (
    <article style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '860px', margin: '0 auto', padding: '0 16px' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '1rem', color: '#0369a1', marginBottom: '8px' }}>TL;DR</p>
        <p style={{ color: '#0c4a6e', lineHeight: '1.7', margin: 0 }}>
          Vim is a modal text editor — you switch between Normal, Insert, Visual, and Command modes. The learning curve is steep but the payoff is massive: editing at the speed of thought without leaving the keyboard. This guide covers everything from exiting Vim to recording macros, configuring Neovim, and building a modern IDE-like workflow with plugins like Telescope and LSP.
        </p>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '40px',
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b', marginBottom: '12px' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.9', color: '#374151' }}>
          <li>Vim has five modes — <strong>Normal</strong> is the default; always return to it with <kbd style={kbdStyle}>Escape</kbd></li>
          <li>Learn text objects (<code style={inlineCodeStyle}>diw</code>, <code style={inlineCodeStyle}>ci"</code>, <code style={inlineCodeStyle}>da{'{}'}</code>) — they are the most force-multiplying feature</li>
          <li>Use <code style={inlineCodeStyle}>.</code> (dot) to repeat the last change — combine with text objects for powerful edits</li>
          <li>Macros (<code style={inlineCodeStyle}>q</code>/<code style={inlineCodeStyle}>@</code>) automate repetitive multi-step edits across many lines</li>
          <li><code style={inlineCodeStyle}>:%s/old/new/gc</code> with the <code style={inlineCodeStyle}>c</code> flag lets you confirm each replacement interactively</li>
          <li>Neovim with Lua config (<code style={inlineCodeStyle}>init.lua</code>) + Lazy.nvim is the modern approach for a full IDE setup</li>
          <li>Splits + buffers + marks replace tabs in most workflows — learn <code style={inlineCodeStyle}>Ctrl+w</code> navigation</li>
          <li>Invest 1 week to break the initial barrier — productivity increases exponentially after that</li>
        </ul>
      </div>

      <h2 style={h2Style}>Introduction: Why Learn Vim in 2026?</h2>
      <p style={pStyle}>
        Vim has been a developer staple since 1991, and its influence has only grown. Every major IDE — VS Code, JetBrains, Xcode — offers a Vim emulation plugin as one of its most-installed extensions. SSH sessions, production servers, and container environments almost always have <code style={inlineCodeStyle}>vi</code> available. Understanding Vim gives you a universal editing superpower.
      </p>
      <p style={pStyle}>
        The core idea is <strong>modal editing</strong>: instead of using modifier keys (Ctrl, Alt) for every command, Vim switches between modes. In Normal mode, every key is a command. In Insert mode, keys type text. This sounds counterintuitive but enables extremely fast, precise text manipulation using mnemonic single-character commands.
      </p>
      <p style={pStyle}>
        <strong>Neovim</strong> is a modernized fork of Vim that adds built-in LSP support, async processing, a Lua API, and a vibrant plugin ecosystem. This guide covers both Vim and Neovim, noting differences where they exist. If you are starting fresh, Neovim is the recommended choice.
      </p>

      {/* =========================================================
          SECTION 1: VIM MODES
      ========================================================= */}
      <h2 style={h2Style}>1. Vim Modes Explained</h2>
      <p style={pStyle}>
        Understanding Vim&apos;s modal system is the single most important concept to grasp. Every confusion beginners face traces back to accidentally being in the wrong mode.
      </p>

      <h3 style={h3Style}>Normal Mode — The Command Hub</h3>
      <p style={pStyle}>
        Normal mode is the default mode when you open a file. Your keystrokes are interpreted as commands, not text input. Always return here with <kbd style={kbdStyle}>Escape</kbd> (or <kbd style={kbdStyle}>Ctrl+[</kbd> as a faster alternative). Most of your time in Vim should be spent in Normal mode — it is the hub you return to between every edit.
      </p>

      <h3 style={h3Style}>Insert Mode — Typing Text</h3>
      <p style={pStyle}>
        Insert mode works like a conventional text editor: keys type characters. Enter it from Normal mode with several commands, each placing the cursor differently:
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Key</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>i</code></td><td style={tdStyle}>Insert before cursor</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>I</code></td><td style={tdAltStyle}>Insert at beginning of line</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>a</code></td><td style={tdStyle}>Append after cursor</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>A</code></td><td style={tdAltStyle}>Append at end of line</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>o</code></td><td style={tdStyle}>Open new line below and insert</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>O</code></td><td style={tdAltStyle}>Open new line above and insert</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>s</code></td><td style={tdStyle}>Delete character and insert</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>S</code></td><td style={tdAltStyle}>Delete line and insert</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>c{'{motion}'}</code></td><td style={tdStyle}>Change (delete motion, then insert)</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>gi</code></td><td style={tdAltStyle}>Insert at last insert position</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>Visual Mode — Selecting Text</h3>
      <p style={pStyle}>
        Visual mode highlights text for operations. There are three variants:
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Key</th>
            <th style={thStyle}>Mode</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>v</code></td><td style={tdStyle}>Character Visual</td><td style={tdStyle}>Select character by character</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>V</code></td><td style={tdAltStyle}>Line Visual</td><td style={tdAltStyle}>Select entire lines</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>Ctrl+v</code></td><td style={tdStyle}>Block Visual</td><td style={tdStyle}>Rectangular column selection — insert/delete in columns simultaneously</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>gv</code></td><td style={tdAltStyle}>Re-select</td><td style={tdAltStyle}>Re-select the previous visual selection</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>Command-line Mode — Ex Commands</h3>
      <p style={pStyle}>
        Entered by pressing <kbd style={kbdStyle}>:</kbd> (colon) in Normal mode. This is where you run Ex commands: saving, quitting, substitutions, running shell commands, setting options. Press <kbd style={kbdStyle}>Enter</kbd> to execute and <kbd style={kbdStyle}>Escape</kbd> to cancel.
      </p>
      <code style={codeStyle}>{`:w              " Save
:q              " Quit
:wq             " Save and quit
:q!             " Quit without saving (discard changes)
:e filename     " Open file
:set number     " Enable line numbers
:!ls -la        " Run shell command
:help motion    " Open help for 'motion'`}</code>

      <h3 style={h3Style}>Replace Mode</h3>
      <p style={pStyle}>
        Entered with <kbd style={kbdStyle}>R</kbd> from Normal mode. Like Insert mode but overwrites existing characters rather than inserting. Press <kbd style={kbdStyle}>r</kbd> (lowercase) to replace a single character and return to Normal mode immediately.
      </p>

      {/* =========================================================
          SECTION 2: NAVIGATION
      ========================================================= */}
      <h2 style={h2Style}>2. Essential Navigation</h2>
      <p style={pStyle}>
        Effective navigation is what separates Vim novices from experts. The goal is to move to your target with the fewest keystrokes possible.
      </p>

      <h3 style={h3Style}>Basic Movement: h/j/k/l</h3>
      <p style={pStyle}>
        The four cardinal movement keys work in Normal mode. They were chosen because they are on the home row:
      </p>
      <code style={codeStyle}>{`h   ← left
j   ↓ down
k   ↑ up
l   → right

" All accept a count prefix:
5j  " move 5 lines down
10h " move 10 characters left`}</code>

      <h3 style={h3Style}>Word Motions</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Key</th>
            <th style={thStyle}>Motion</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>w</code></td><td style={tdStyle}>Move to start of next word (stops at punctuation)</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>W</code></td><td style={tdAltStyle}>Move to start of next WORD (space-delimited)</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>b</code></td><td style={tdStyle}>Move backward to start of word</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>B</code></td><td style={tdAltStyle}>Move backward to start of WORD</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>e</code></td><td style={tdStyle}>Move to end of word</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>E</code></td><td style={tdAltStyle}>Move to end of WORD</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>ge</code></td><td style={tdStyle}>Move to end of previous word</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>Line Navigation</h3>
      <code style={codeStyle}>{`0       " Move to start of line (column 0)
^       " Move to first non-whitespace character
$       " Move to end of line
g_      " Move to last non-whitespace character
+       " Move to first non-blank of next line
-       " Move to first non-blank of previous line

" Jump to specific column
5|      " Move to column 5`}</code>

      <h3 style={h3Style}>File Navigation</h3>
      <code style={codeStyle}>{`gg      " Go to first line of file
G       " Go to last line of file
42G     " Go to line 42
42gg    " Also go to line 42
Ctrl+f  " Scroll forward one full page
Ctrl+b  " Scroll backward one full page
Ctrl+d  " Scroll forward half page
Ctrl+u  " Scroll backward half page
Ctrl+e  " Scroll screen down one line (cursor stays)
Ctrl+y  " Scroll screen up one line (cursor stays)

zz      " Center cursor line on screen
zt      " Put cursor line at top of screen
zb      " Put cursor line at bottom of screen`}</code>

      <h3 style={h3Style}>Character Search on Current Line</h3>
      <code style={codeStyle}>{`f{char}   " Find next occurrence of char on line (cursor on char)
F{char}   " Find previous occurrence
t{char}   " Till: move cursor before next char
T{char}   " Till backward
;         " Repeat last f/F/t/T in same direction
,         " Repeat last f/F/t/T in opposite direction

" Example: to delete from cursor to the next comma:
dt,       " Delete till comma (not including it)
df,       " Delete through comma (including it)`}</code>

      <h3 style={h3Style}>Search Navigation</h3>
      <code style={codeStyle}>{`/pattern    " Search forward for pattern
?pattern    " Search backward for pattern
n           " Next match (same direction)
N           " Previous match (opposite direction)
*           " Search forward for word under cursor
#           " Search backward for word under cursor
g*          " Search for partial word under cursor
:%s/foo//gn " Count number of occurrences of 'foo'`}</code>

      <h3 style={h3Style}>Jumps and Position History</h3>
      <code style={codeStyle}>{`Ctrl+o    " Jump to previous position in jump list
Ctrl+i    " Jump to next position in jump list
:jumps    " Show jump list

''        " Jump to position before last big jump
'.        " Jump to last edited position
'^        " Jump to last insert position`}</code>

      {/* =========================================================
          SECTION 3: EDITING COMMANDS
      ========================================================= */}
      <h2 style={h2Style}>3. Core Editing Commands</h2>
      <p style={pStyle}>
        Vim&apos;s editing commands follow a <strong>verb + motion</strong> grammar. Once you internalize this pattern, commands become composable and predictable.
      </p>

      <h3 style={h3Style}>Delete, Yank, and Put</h3>
      <code style={codeStyle}>{`" === DELETE ===
x       " Delete character under cursor (like Del key)
X       " Delete character before cursor (like Backspace)
dd      " Delete entire line
D       " Delete from cursor to end of line
d$      " Same as D
d0      " Delete from cursor to start of line
dw      " Delete word (from cursor)
db      " Delete word backward
d3w     " Delete 3 words
dG      " Delete from current line to end of file
dgg     " Delete from current line to beginning of file

" === YANK (copy) ===
yy      " Yank (copy) current line
Y       " Yank current line (same as yy)
yw      " Yank word
y$      " Yank to end of line
y0      " Yank to start of line
yG      " Yank to end of file
y3w     " Yank 3 words

" === PUT (paste) ===
p       " Put (paste) after cursor / below current line
P       " Put before cursor / above current line
gp      " Put after cursor and move cursor after pasted text
"+p     " Paste from system clipboard (+ register)
"0p     " Paste the last explicitly yanked text`}</code>

      <h3 style={h3Style}>Change Commands</h3>
      <code style={codeStyle}>{`cc      " Change entire line (delete and enter Insert mode)
C       " Change from cursor to end of line
cw      " Change word from cursor
cb      " Change word backward
c$      " Change to end of line
c0      " Change to beginning of line
s       " Substitute character (delete + Insert mode)
S       " Substitute line (same as cc)`}</code>

      <h3 style={h3Style}>Undo and Redo</h3>
      <code style={codeStyle}>{`u         " Undo last change
U         " Undo all changes on current line
Ctrl+r    " Redo (undo the undo)
5u        " Undo last 5 changes
:undolist " Show undo history tree (Neovim: telescope undo)

" Neovim persistent undo (add to init.lua / .vimrc):
" set undofile
" set undodir=~/.vim/undo`}</code>

      <h3 style={h3Style}>Replace and Case</h3>
      <code style={codeStyle}>{`r{char}   " Replace character under cursor with char
R         " Enter Replace mode (overwrite characters)
~         " Toggle case of character under cursor
g~w       " Toggle case of word
guw       " Lowercase word
gUw       " Uppercase word
guu       " Lowercase entire line
gUU       " Uppercase entire line
g~~       " Toggle case of entire line

" Visual mode case operations:
" Select text in visual mode, then:
u         " Lowercase selection
U         " Uppercase selection
~         " Toggle case of selection`}</code>

      <h3 style={h3Style}>Indentation</h3>
      <code style={codeStyle}>{`>>        " Indent current line
<<        " Unindent current line
>3j       " Indent 3 lines down
>ip       " Indent inner paragraph
=         " Auto-indent (fix indentation)
==        " Auto-indent current line
=G        " Auto-indent from cursor to end of file
gg=G      " Auto-indent entire file (go to top, indent all)`}</code>

      <h3 style={h3Style}>Joining Lines</h3>
      <code style={codeStyle}>{`J         " Join current line with line below (space between)
gJ        " Join without adding space
3J        " Join current line and next 2 lines`}</code>

      {/* =========================================================
          SECTION 4: TEXT OBJECTS
      ========================================================= */}
      <h2 style={h2Style}>4. Text Objects — Vim&apos;s Superpower</h2>
      <p style={pStyle}>
        Text objects are the most powerful feature of Vim that most other editors lack. They let you operate on semantic chunks of text — words, sentences, paragraphs, quoted strings, parenthesized expressions, HTML tags — with a single operator.
      </p>
      <p style={pStyle}>
        The syntax is: <strong>operator + i/a + object</strong>. The <code style={inlineCodeStyle}>i</code> prefix means <em>inner</em> (excludes surrounding delimiter), while <code style={inlineCodeStyle}>a</code> means <em>around</em> (includes surrounding delimiter and trailing whitespace).
      </p>

      <h3 style={h3Style}>Word and Sentence Objects</h3>
      <code style={codeStyle}>{`" w = word, W = WORD, s = sentence, p = paragraph
diw     " Delete inner word (just the word, not spaces)
daw     " Delete a word (word + surrounding space)
ciw     " Change inner word (replaces word, stays in insert)
caw     " Change a word including space
yiw     " Yank inner word
viw     " Visual select inner word

diW     " Delete inner WORD (space-delimited)
dis     " Delete inner sentence
das     " Delete a sentence (including trailing space)
dip     " Delete inner paragraph (block separated by blank lines)
dap     " Delete a paragraph including surrounding blank lines`}</code>

      <h3 style={h3Style}>Delimiter Objects</h3>
      <code style={codeStyle}>{`" Works with: " ' \` ( ) [ ] { } < > t (tag)
ci"     " Change inside double quotes: "hello" → ""
ca"     " Change around double quotes (removes quotes too)
di'     " Delete inside single quotes
da'     " Delete around single quotes
ci(     " Change inside parentheses: foo(bar) → foo()
ca(     " Change around parens: foo(bar) → foo
ci[     " Change inside square brackets
ci{     " Change inside curly braces
ci<     " Change inside angle brackets
cit     " Change inside HTML/XML tag: <p>text</p> → <p></p>
cat     " Change around tag (removes the tag entirely)

" Practical examples:
" Cursor anywhere inside: console.log("hello world")
ci"     " → console.log("")    (change content in quotes)

" Cursor anywhere inside: function foo(a, b, c)
ci(     " → function foo()     (clear parameters)

" Cursor anywhere inside: const obj = { key: "value" }
ci{     " → const obj = {}     (clear object body)`}</code>

      <h3 style={h3Style}>Custom Text Objects (with plugins)</h3>
      <p style={pStyle}>
        The <code style={inlineCodeStyle}>vim-textobj-user</code> plugin allows creating custom text objects. Popular community text objects include <code style={inlineCodeStyle}>ae/ie</code> (entire file), <code style={inlineCodeStyle}>al/il</code> (current line), <code style={inlineCodeStyle}>ai/ii</code> (indented block), and <code style={inlineCodeStyle}>af/if</code> (function).
      </p>

      {/* =========================================================
          SECTION 5: VISUAL MODE
      ========================================================= */}
      <h2 style={h2Style}>5. Visual Mode Operations</h2>
      <p style={pStyle}>
        Visual mode makes selection explicit before applying operations, which is helpful for beginners and for complex operations.
      </p>

      <h3 style={h3Style}>Character and Line Visual</h3>
      <code style={codeStyle}>{`" Enter visual modes:
v       " Character visual
V       " Line visual
Ctrl+v  " Block (column) visual
gv      " Re-select previous visual selection
o       " In visual mode: jump to other end of selection

" Operations on visual selection:
d / x   " Delete selection
y       " Yank (copy) selection
c       " Change selection (delete + insert)
>       " Indent selection
<       " Unindent selection
=       " Auto-indent selection
u       " Lowercase selection
U       " Uppercase selection
~       " Toggle case
!cmd    " Filter selection through external command
:       " Enter Command mode for range commands`}</code>

      <h3 style={h3Style}>Block Visual Mode — Column Editing</h3>
      <p style={pStyle}>
        Block Visual mode (<kbd style={kbdStyle}>Ctrl+v</kbd>) is one of Vim&apos;s most impressive features, enabling simultaneous editing of multiple lines in a column:
      </p>
      <code style={codeStyle}>{`" Example: add a '#' comment to the beginning of 5 lines
1. Position cursor at start of first line
2. Ctrl+v         " enter block visual
3. 4j             " select 5 lines vertically
4. I              " capital I = insert at block start
5. #              " type the character(s) to insert
6. Escape         " apply to all selected lines

" Example: delete leading whitespace from a column block
1. Ctrl+v to select the whitespace column
2. d to delete it

" Appending to multiple lines:
1. Ctrl+v to select a column
2. $             " extend to end of each line
3. A             " append after each line's end
4. type text
5. Escape        " applies to all lines`}</code>

      {/* =========================================================
          SECTION 6: SEARCH AND REPLACE
      ========================================================= */}
      <h2 style={h2Style}>6. Search and Replace</h2>
      <p style={pStyle}>
        Vim&apos;s substitute command is one of the most powerful tools in its arsenal, supporting full regex patterns.
      </p>

      <h3 style={h3Style}>The Substitute Command</h3>
      <code style={codeStyle}>{`" Basic syntax: :[range]s/pattern/replacement/[flags]

:s/old/new          " Replace first 'old' on current line
:s/old/new/g        " Replace ALL on current line (g=global)
:%s/old/new/g       " Replace all in entire file (% = all lines)
:%s/old/new/gc      " Replace all, confirm each (c=confirm)
:%s/old/new/gi      " Replace all, case-insensitive (i)
:%s/old/new/gI      " Replace all, case-sensitive (override smartcase)

" Range examples:
:1,10s/foo/bar/g    " Lines 1-10
:10,20s/foo/bar/g   " Lines 10-20
:'<,'>s/foo/bar/g   " Visual selection (auto-filled after V-mode :)
:.,$s/foo/bar/g     " Current line to end of file

" Special patterns:
:%s/\bword\b/new/g  " Whole word only (\b = word boundary)
:%s/^/  /g          " Add 2 spaces to beginning of every line
:%s/  $//g          " Remove trailing whitespace
:%s/\s\+$//e        " Remove trailing whitespace (e=no error if not found)
:%s/\n\n/\r/g       " Replace double blank lines with single

" Using captured groups:
:%s/\(foo\)\(bar\)/\\2\\1/g   " Swap 'foo' and 'bar' → 'barfoo'
:%s/\v(foo)(bar)/\\2\\1/g     " Same with very magic (\v, less escaping)`}</code>

      <h3 style={h3Style}>Very Magic Mode</h3>
      <code style={codeStyle}>{`" \v enables 'very magic' mode — most chars have special meaning
" so you need less backslash escaping:
:%s/\v(https?):\/\/(\w+)/[\\2](\\0)/g  " Wrap URLs in markdown

" Pattern reference:
" \w = word character, \d = digit, \s = whitespace
" + = one or more, * = zero or more, ? = zero or one
" | = alternation (OR), () = capture group
" ^ = start of line, $ = end of line`}</code>

      <h3 style={h3Style}>Global Command</h3>
      <code style={codeStyle}>{`:g/pattern/command    " Run command on every line matching pattern
:g/TODO/d             " Delete all lines containing TODO
:g/^\s*$/d            " Delete all blank lines
:g/pattern/y A        " Yank all matching lines into register A
:g!/pattern/d         " Delete all lines NOT matching pattern (also :v/)
:v/pattern/d          " Same as :g!/pattern/d`}</code>

      {/* =========================================================
          SECTION 7: FILE OPERATIONS
      ========================================================= */}
      <h2 style={h2Style}>7. File Operations and Buffers</h2>

      <h3 style={h3Style}>Saving and Quitting</h3>
      <code style={codeStyle}>{`:w              " Write (save) file
:w filename     " Write to new filename (save as)
:w!             " Force write (overwrite read-only)
:wa             " Write all open buffers
:q              " Quit (fails if unsaved changes)
:q!             " Quit and discard unsaved changes
:wq             " Write and quit
:wqa            " Write all and quit
:x              " Write only if changed, then quit
ZZ              " Same as :x (shortcut in Normal mode)
ZQ              " Quit without saving (same as :q!)

" Reload file from disk (discard changes):
:e!             " Revert to saved version
:e              " Reload without the ! if file unchanged`}</code>

      <h3 style={h3Style}>Working with Buffers</h3>
      <p style={pStyle}>
        A buffer is a file loaded in memory. Buffers persist even when their window is closed. This is Vim&apos;s equivalent of open tabs in a conventional editor.
      </p>
      <code style={codeStyle}>{`:e filename     " Open file into new buffer
:ls             " List all buffers (also :buffers, :files)
:b N            " Switch to buffer number N
:b filename     " Switch to buffer by partial name
:bn             " Next buffer
:bp             " Previous buffer
:bf             " First buffer
:bl             " Last buffer
:bd             " Close (delete) current buffer
:bd N           " Close buffer N
:bw             " Wipe buffer (removes from buffer list)
:%bd            " Delete all buffers
:ball           " Open all buffers in split windows

" Quick navigation with fzf/Telescope (see plugins section):
" :Telescope buffers — fuzzy-find your open buffers`}</code>

      <h3 style={h3Style}>Windows (Splits)</h3>
      <code style={codeStyle}>{`:split          " Split horizontally (same file)
:split file     " Split horizontally, open file
:vsplit         " Split vertically (same file)
:vsplit file    " Split vertically, open file
:new            " New horizontal split with empty buffer
:vnew           " New vertical split with empty buffer

" Keyboard shortcuts (all Ctrl+w followed by key):
Ctrl+w h/j/k/l  " Navigate to split left/down/up/right
Ctrl+w w        " Cycle through windows
Ctrl+w W        " Cycle backward through windows
Ctrl+w =        " Make all windows equal size
Ctrl+w _        " Maximize current window height
Ctrl+w |        " Maximize current window width
Ctrl+w +/-      " Increase/decrease window height
Ctrl+w >/< " Increase/decrease window width
Ctrl+w r        " Rotate windows
Ctrl+w x        " Exchange current window with next
Ctrl+w q        " Close current window
Ctrl+w o        " Close all windows except current (:only)`}</code>

      <h3 style={h3Style}>Tabs</h3>
      <code style={codeStyle}>{`:tabnew         " Open new empty tab
:tabnew file    " Open file in new tab
:tabclose       " Close current tab
:tabonly        " Close all other tabs
gt              " Go to next tab
gT              " Go to previous tab
3gt             " Go to tab 3
:tabs           " List all tabs and their windows`}</code>

      {/* =========================================================
          SECTION 8: MARKS AND JUMPS
      ========================================================= */}
      <h2 style={h2Style}>8. Marks and Jumps</h2>
      <p style={pStyle}>
        Marks let you bookmark positions in files and jump back to them instantly.
      </p>

      <h3 style={h3Style}>Setting and Using Marks</h3>
      <code style={codeStyle}>{`m{a-z}      " Set local mark (lowercase = file-local)
m{A-Z}      " Set global mark (uppercase = cross-file)
'{mark}     " Jump to the line of mark
\`{mark}     " Jump to exact position (line + column) of mark
:marks      " List all marks

" Special automatic marks:
\`.          " Position of last change
\`'          " Position before last jump
\`<          " Start of last visual selection
\`>          " End of last visual selection
\`[          " Start of last yanked/changed text
\`]          " End of last yanked/changed text

" Cross-file jumps with global marks:
mA          " Set global mark A in file1
" (open file2)
\`A          " Jump back to exact position in file1`}</code>

      {/* =========================================================
          SECTION 9: MACROS
      ========================================================= */}
      <h2 style={h2Style}>9. Macros — Automating Repetitive Edits</h2>
      <p style={pStyle}>
        Macros record a sequence of Normal mode commands (including entering/exiting Insert mode, motions, and Ex commands) and replay them. They are Vim&apos;s most powerful automation feature for repetitive structural edits.
      </p>

      <h3 style={h3Style}>Recording and Playing Macros</h3>
      <code style={codeStyle}>{`qa          " Start recording into register 'a'
" ... perform your sequence of actions ...
q           " Stop recording

@a          " Play macro 'a' once
@@          " Replay last used macro
5@a         " Play macro 'a' 5 times
:%normal @a " Apply macro to every line in file

" View macro contents (paste register):
"ap         " Paste register 'a' to see the recorded sequence

" Edit a macro:
" 1. "ap          → paste the macro
" 2. Edit the pasted text
" 3. "ayy         → yank it back into register 'a'`}</code>

      <h3 style={h3Style}>Practical Macro Example</h3>
      <p style={pStyle}>
        Suppose you have a list of JavaScript variable names and want to wrap each in <code style={inlineCodeStyle}>console.log()</code>:
      </p>
      <code style={codeStyle}>{`" Initial state (cursor on first line):
myVar
anotherVar
thirdVar

" Record macro:
qa          " start recording to 'a'
I           " insert at beginning
console.log(  " type opening
Escape      " back to normal mode
A           " append at end
);          " type closing
Escape      " back to normal mode
j           " move to next line
q           " stop recording

" Result after @a on first line:
console.log(myVar);

" Apply to all remaining lines:
2@a         " or: select all 3 lines and :%normal @a`}</code>

      <h3 style={h3Style}>Advanced Macro Techniques</h3>
      <code style={codeStyle}>{`" Recursive macro (runs until it fails):
qaq         " Clear register 'a' (record empty macro)
qa          " Start recording
" ... actions ...
@a          " Call itself at end (recursive!)
q           " Stop recording
@a          " This will repeat until an error (e.g., end of file)

" Running macro on visual selection lines:
V5j         " Select 6 lines
:normal @a  " Apply macro 'a' to each selected line

" Running on lines matching pattern:
:g/pattern/normal @a   " Apply macro to lines matching pattern`}</code>

      {/* =========================================================
          SECTION 10: REGISTERS
      ========================================================= */}
      <h2 style={h2Style}>10. Registers</h2>
      <p style={pStyle}>
        Vim has multiple registers (named clipboards) for storing text and macros. Understanding them unlocks powerful copy-paste workflows.
      </p>
      <code style={codeStyle}>{`:reg            " List all register contents
:reg a b c      " List specific registers

" Named registers (a-z):
"ayy            " Yank current line into register 'a'
"ap             " Paste from register 'a'
"Ayy            " APPEND yank to register 'a' (uppercase appends)

" Special registers:
""              " Unnamed register (default for d, y, c, x)
"0              " Yank register (last explicit yank only, not deletes)
"1-"9           " Numbered registers (recent deletes/changes)
"+              " System clipboard (X11/Wayland primary selection)
"*              " System clipboard (middle-click paste on Linux)
"_              " Black hole register (discard, like /dev/null)
".              " Last inserted text
":              " Last Ex command
"/              " Last search pattern
"%              " Current filename
"#              " Alternate filename

" Tip: use "0p after multiple deletes to paste last yank
" without the delete overwriting the unnamed register`}</code>

      {/* =========================================================
          SECTION 11: VIMRC / INIT.LUA
      ========================================================= */}
      <h2 style={h2Style}>11. Configuration — .vimrc and init.lua</h2>
      <p style={pStyle}>
        Your configuration file is where you set options, key mappings, and plugins. Vim uses <code style={inlineCodeStyle}>~/.vimrc</code> (Vimscript). Neovim uses <code style={inlineCodeStyle}>~/.config/nvim/init.vim</code> (Vimscript) or <code style={inlineCodeStyle}>~/.config/nvim/init.lua</code> (Lua — recommended for new setups).
      </p>

      <h3 style={h3Style}>Essential .vimrc Settings</h3>
      <code style={codeStyle}>{`" ~/.vimrc — essential settings

" === BASICS ===
set nocompatible          " Not Vi-compatible (enable Vim improvements)
filetype plugin indent on " Enable filetype detection, plugins, indenting
syntax on                  " Enable syntax highlighting

" === UI ===
set number                " Show line numbers
set relativenumber        " Show relative line numbers (great for motions)
set ruler                 " Show cursor position in status bar
set showcmd               " Show incomplete commands
set showmode              " Show current mode
set wildmenu              " Enhanced command-line completion
set wildmode=list:longest " Complete like shell (list matches)
set cursorline            " Highlight current line
set scrolloff=8           " Keep 8 lines visible above/below cursor
set colorcolumn=80,120    " Highlight columns 80 and 120

" === SEARCH ===
set hlsearch              " Highlight search matches
set incsearch             " Incremental search (highlight as you type)
set ignorecase            " Case-insensitive search
set smartcase             " Override ignorecase if uppercase used

" === INDENTATION ===
set tabstop=2             " Tab displays as 2 spaces
set shiftwidth=2          " Indent with 2 spaces
set expandtab             " Use spaces instead of tabs
set autoindent            " Auto-indent new lines
set smartindent           " Smart auto-indenting

" === FILES ===
set encoding=utf-8        " Default encoding
set hidden                " Allow background buffers without saving
set noswapfile            " Disable swap files
set undofile              " Persistent undo across sessions
set undodir=~/.vim/undo   " Where to store undo files
set autoread              " Auto-reload files changed externally
set backup                " Keep backup files

" === PERFORMANCE ===
set lazyredraw            " Don't redraw during macros
set ttyfast               " Faster terminal connection

" === KEY MAPPINGS ===
let mapleader = ' '       " Space as leader key (very common)

" Quick save and quit
nnoremap <leader>w :w<CR>
nnoremap <leader>q :q<CR>
nnoremap <leader>Q :q!<CR>

" Clear search highlight
nnoremap <leader>h :nohlsearch<CR>

" Better split navigation
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" Move lines up/down
nnoremap <A-j> :m .+1<CR>==
nnoremap <A-k> :m .-2<CR>==
vnoremap <A-j> :m '>+1<CR>gv=gv
vnoremap <A-k> :m '<-2<CR>gv=gv

" Keep visual selection after indent
vnoremap > >gv
vnoremap < <gv

" Y should yank to end of line (like D and C)
nnoremap Y y$

" Center screen on search results
nnoremap n nzzzv
nnoremap N Nzzzv`}</code>

      <h3 style={h3Style}>Neovim init.lua (Modern Lua Config)</h3>
      <code style={codeStyle}>{`-- ~/.config/nvim/init.lua

-- === BASICS ===
vim.g.mapleader = ' '
vim.g.maplocalleader = ' '

-- === OPTIONS ===
local opt = vim.opt
opt.number = true
opt.relativenumber = true
opt.tabstop = 2
opt.shiftwidth = 2
opt.expandtab = true
opt.autoindent = true
opt.smartindent = true
opt.hlsearch = true
opt.incsearch = true
opt.ignorecase = true
opt.smartcase = true
opt.scrolloff = 8
opt.hidden = true
opt.undofile = true
opt.swapfile = false
opt.backup = false
opt.encoding = 'utf-8'
opt.cursorline = true
opt.colorcolumn = '80'
opt.termguicolors = true    -- Enable true color support
opt.signcolumn = 'yes'      -- Always show sign column (for LSP errors)
opt.updatetime = 250        -- Faster update for CursorHold events
opt.completeopt = 'menuone,noinsert,noselect'

-- === KEY MAPPINGS ===
local map = vim.keymap.set

-- Window navigation
map('n', '<C-h>', '<C-w>h')
map('n', '<C-j>', '<C-w>j')
map('n', '<C-k>', '<C-w>k')
map('n', '<C-l>', '<C-w>l')

-- Quick save/quit
map('n', '<leader>w', ':w<CR>')
map('n', '<leader>q', ':q<CR>')

-- Clear search highlight
map('n', '<leader>h', ':nohlsearch<CR>')

-- Move lines
map('n', '<A-j>', ':m .+1<CR>==')
map('n', '<A-k>', ':m .-2<CR>==')
map('v', '<A-j>', ":m '>+1<CR>gv=gv")
map('v', '<A-k>', ":m '<-2<CR>gv=gv")

-- Keep indent in visual mode
map('v', '>', '>gv')
map('v', '<', '<gv')

-- Y = yank to end of line
map('n', 'Y', 'y$')

-- === PLUGIN MANAGER (Lazy.nvim) ===
local lazypath = vim.fn.stdpath('data') .. '/lazy/lazy.nvim'
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    'git', 'clone', '--filter=blob:none',
    'https://github.com/folke/lazy.nvim.git',
    '--branch=stable', lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

require('lazy').setup({
  -- Theme
  { 'folke/tokyonight.nvim', priority = 1000, config = function()
    vim.cmd.colorscheme 'tokyonight'
  end },
  -- Fuzzy finder
  { 'nvim-telescope/telescope.nvim', dependencies = { 'nvim-lua/plenary.nvim' } },
  -- File tree
  { 'nvim-tree/nvim-tree.lua' },
  -- Treesitter (better syntax)
  { 'nvim-treesitter/nvim-treesitter', build = ':TSUpdate' },
  -- LSP
  { 'neovim/nvim-lspconfig' },
  -- Completion
  { 'hrsh7th/nvim-cmp', dependencies = { 'hrsh7th/cmp-nvim-lsp' } },
  -- Git
  { 'tpope/vim-fugitive' },
  { 'lewis6991/gitsigns.nvim' },
  -- Status line
  { 'nvim-lualine/lualine.nvim' },
  -- Surround
  { 'tpope/vim-surround' },
  -- Auto-pairs
  { 'windwp/nvim-autopairs' },
})`}</code>

      {/* =========================================================
          SECTION 12: PLUGINS
      ========================================================= */}
      <h2 style={h2Style}>12. Essential Plugins</h2>
      <p style={pStyle}>
        Vim&apos;s plugin ecosystem transforms it from a text editor into a full development environment. Here are the most impactful plugins every developer should know.
      </p>

      <h3 style={h3Style}>Telescope.nvim — Fuzzy Finder (Neovim)</h3>
      <p style={pStyle}>
        Telescope is the gold standard for fuzzy finding in Neovim. It searches files, buffers, git commits, LSP symbols, and almost anything else with a beautiful preview.
      </p>
      <code style={codeStyle}>{`-- In your init.lua key mappings:
local telescope = require('telescope.builtin')
vim.keymap.set('n', '<leader>ff', telescope.find_files)  -- find files
vim.keymap.set('n', '<leader>fg', telescope.live_grep)   -- grep in project
vim.keymap.set('n', '<leader>fb', telescope.buffers)     -- list buffers
vim.keymap.set('n', '<leader>fh', telescope.help_tags)   -- search help
vim.keymap.set('n', '<leader>fs', telescope.lsp_document_symbols)
vim.keymap.set('n', '<leader>fr', telescope.oldfiles)    -- recent files
vim.keymap.set('n', '<leader>gc', telescope.git_commits) -- git log`}</code>

      <h3 style={h3Style}>fzf.vim — Fuzzy Finder (Vim)</h3>
      <code style={codeStyle}>{`" In .vimrc (requires fzf installed separately):
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'

" Key mappings:
nnoremap <C-p> :Files<CR>      " Find files
nnoremap <leader>b :Buffers<CR> " List buffers
nnoremap <leader>g :Rg<CR>     " Live grep (requires ripgrep)
nnoremap <leader>l :Lines<CR>  " Search lines in open buffers`}</code>

      <h3 style={h3Style}>NERDTree / nvim-tree — File Explorer</h3>
      <code style={codeStyle}>{`" NERDTree (Vim and Neovim):
Plug 'preservim/nerdtree'

nnoremap <leader>e :NERDTreeToggle<CR>
nnoremap <leader>f :NERDTreeFind<CR>  " Reveal current file

" Inside NERDTree:
" o / Enter   = open file
" t           = open in new tab
" i           = open in horizontal split
" s           = open in vertical split
" ma          = create file/directory
" md          = delete
" mm          = rename/move

-- nvim-tree (Lua, modern):
require('nvim-tree').setup()
vim.keymap.set('n', '<leader>e', ':NvimTreeToggle<CR>')`}</code>

      <h3 style={h3Style}>vim-fugitive — Git Integration</h3>
      <p style={pStyle}>
        Tim Pope&apos;s vim-fugitive is described as &quot;the best Git wrapper of all time.&quot; It brings Git commands into Vim seamlessly.
      </p>
      <code style={codeStyle}>{`" Essential fugitive commands:
:Git status       " (or :G) — interactive git status
:Git add %        " Stage current file
:Git commit       " Commit with message in split
:Git push         " Push to remote
:Git log          " Git log
:Git blame        " Blame current file (press q to close)
:Git diff         " Diff working tree
:Git diff --staged " Diff staged changes

" In :Git status window:
" s = stage file
" u = unstage file
" -  = toggle stage
" cc = commit
" ca = amend commit
" dv = diff in vertical split`}</code>

      <h3 style={h3Style}>coc.nvim — Completion and LSP</h3>
      <code style={codeStyle}>{`" coc.nvim works for both Vim and Neovim:
Plug 'neoclide/coc.nvim', {'branch': 'release'}

" Install language servers:
:CocInstall coc-tsserver    " TypeScript/JavaScript
:CocInstall coc-pyright     " Python
:CocInstall coc-rust-analyzer " Rust
:CocInstall coc-eslint      " ESLint
:CocInstall coc-prettier    " Prettier formatting

" Key mappings for coc:
nmap <silent> gd <Plug>(coc-definition)      " Go to definition
nmap <silent> gy <Plug>(coc-type-definition) " Go to type def
nmap <silent> gi <Plug>(coc-implementation)  " Go to implementation
nmap <silent> gr <Plug>(coc-references)      " Find references
nmap <leader>rn <Plug>(coc-rename)           " Rename symbol
nmap <leader>f  <Plug>(coc-fix-current)      " Fix current issue
nmap <leader>ac <Plug>(coc-codeaction)       " Code action
K " Show hover docs (press K in normal mode)`}</code>

      <h3 style={h3Style}>Neovim Native LSP</h3>
      <code style={codeStyle}>{`-- neovim/nvim-lspconfig setup example:
local lspconfig = require('lspconfig')

-- TypeScript
lspconfig.tsserver.setup({
  on_attach = function(client, bufnr)
    -- Key mappings when LSP attaches
    local opts = { buffer = bufnr }
    vim.keymap.set('n', 'gd', vim.lsp.buf.definition, opts)
    vim.keymap.set('n', 'gr', vim.lsp.buf.references, opts)
    vim.keymap.set('n', 'K', vim.lsp.buf.hover, opts)
    vim.keymap.set('n', '<leader>rn', vim.lsp.buf.rename, opts)
    vim.keymap.set('n', '<leader>ca', vim.lsp.buf.code_action, opts)
    vim.keymap.set('n', '[d', vim.diagnostic.goto_prev, opts)
    vim.keymap.set('n', ']d', vim.diagnostic.goto_next, opts)
  end,
})

-- Python
lspconfig.pyright.setup({})

-- Rust
lspconfig.rust_analyzer.setup({})`}</code>

      <h3 style={h3Style}>vim-surround — Surround Text</h3>
      <code style={codeStyle}>{`" Tim Pope's vim-surround allows changing, adding, deleting surrounding chars

" Change surroundings:
cs'"      " Change surrounding ' to "    : 'word' → "word"
cs({      " Change surrounding ( to {    : (word) → { word }
cs)}      " Change surrounding ) to }    : (word) → {word}
cst<p>    " Change surrounding tag to <p>

" Delete surroundings:
ds'       " Delete surrounding '         : 'word' → word
ds(       " Delete surrounding (         : (word) → word
dst       " Delete surrounding tag

" Add surroundings (normal mode):
ysiw"     " Surround inner word with "   : word → "word"
ysiw(     " Surround inner word with ( ) : word → ( word )
ysip<p>   " Surround paragraph with <p>

" Add surroundings (visual mode):
S"        " After visual select, surround with "
S{        " After visual select, surround with {}`}</code>

      {/* =========================================================
          SECTION 13: VIM VS NEOVIM
      ========================================================= */}
      <h2 style={h2Style}>13. Vim vs Neovim Comparison</h2>
      <p style={pStyle}>
        Both Vim and Neovim are excellent editors. The right choice depends on your needs, workflow, and tolerance for configuration.
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>Vim 9.x</th>
              <th style={thStyle}>Neovim 0.9+</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}><strong>Config language</strong></td>
              <td style={tdStyle}>Vimscript 9 (new syntax)</td>
              <td style={tdStyle}>Lua (primary) + Vimscript</td>
            </tr>
            <tr>
              <td style={tdAltStyle}><strong>Built-in LSP</strong></td>
              <td style={tdAltStyle}>No (requires coc.nvim)</td>
              <td style={tdAltStyle}>Yes (vim.lsp)</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Treesitter</strong></td>
              <td style={tdStyle}>Plugin only</td>
              <td style={tdStyle}>Built-in (nvim-treesitter)</td>
            </tr>
            <tr>
              <td style={tdAltStyle}><strong>Async job control</strong></td>
              <td style={tdAltStyle}>Limited</td>
              <td style={tdAltStyle}>Full async API</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Plugin ecosystem</strong></td>
              <td style={tdStyle}>Large, mature</td>
              <td style={tdStyle}>Very active, Lua-first</td>
            </tr>
            <tr>
              <td style={tdAltStyle}><strong>Defaults</strong></td>
              <td style={tdAltStyle}>Conservative (Vi compat)</td>
              <td style={tdAltStyle}>Sensible modern defaults</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Performance</strong></td>
              <td style={tdStyle}>Excellent</td>
              <td style={tdStyle}>Excellent (faster for Lua plugins)</td>
            </tr>
            <tr>
              <td style={tdAltStyle}><strong>Floating windows</strong></td>
              <td style={tdAltStyle}>Limited</td>
              <td style={tdAltStyle}>Full support (used by Telescope etc.)</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Embeddable</strong></td>
              <td style={tdStyle}>No</td>
              <td style={tdStyle}>Yes (libneovim)</td>
            </tr>
            <tr>
              <td style={tdAltStyle}><strong>GUI support</strong></td>
              <td style={tdAltStyle}>gvim</td>
              <td style={tdAltStyle}>Neovide, Goneovim, etc.</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Universal availability</strong></td>
              <td style={tdStyle}>Pre-installed on most systems</td>
              <td style={tdStyle}>Must install separately</td>
            </tr>
            <tr>
              <td style={tdAltStyle}><strong>Starter configs</strong></td>
              <td style={tdAltStyle}>vimrc examples online</td>
              <td style={tdAltStyle}>LazyVim, Kickstart, AstroNvim</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Best for</strong></td>
              <td style={tdStyle}>Servers, scripting, Vimscript familiarity</td>
              <td style={tdStyle}>Full development workflow, modern IDE features</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={pStyle}>
        <strong>Recommendation:</strong> If you are new to modal editing, start with Neovim and the <a href="https://github.com/nvim-lua/kickstart.nvim" style={{ color: '#2563eb' }}>kickstart.nvim</a> starter config. It is well-documented and teaches you configuration as you use it. If you primarily edit config files on remote servers, vanilla Vim (which is nearly always present) is perfectly adequate.
      </p>

      {/* =========================================================
          SECTION 14: PRACTICAL TIPS
      ========================================================= */}
      <h2 style={h2Style}>14. Developer Workflow Tips</h2>

      <h3 style={h3Style}>The Dot Command — Most Underrated Feature</h3>
      <code style={codeStyle}>{`" The . command repeats the last change (everything from
" entering Insert mode to leaving it counts as one change)

" Example: add a semicolon to the end of a line
A;<Escape>   " Add semicolon at end
j.           " Move down, repeat: add semicolon to next line
j.           " Repeat again...

" Combined with f/t for powerful workflows:
" Add console.log around all 'response' variables:
/response    " find first occurrence
ciw          " change inner word
console.log(response)  " type new text
<Escape>
n.           " find next, repeat change`}</code>

      <h3 style={h3Style}>Abbreviations for Frequent Typos</h3>
      <code style={codeStyle}>{`" In .vimrc / init.lua:
iabbrev teh the
iabbrev recieve receive
iabbrev funciton function
iabbrev calback callback

" Expand while typing (press space after abbreviation)`}</code>

      <h3 style={h3Style}>Quickfix List — Navigate Errors and Search Results</h3>
      <code style={codeStyle}>{`:copen      " Open quickfix window
:cclose     " Close quickfix window
:cnext      " Jump to next error/result
:cprev      " Jump to previous error/result
:cfirst     " Jump to first
:clast      " Jump to last

" Populate quickfix with grep results:
:grep -r "pattern" .     " Search and load results into quickfix
:Rg pattern              " With fzf.vim: results go to quickfix

" Location list (window-local quickfix):
:lopen / :lclose
:lnext / :lprev`}</code>

      <h3 style={h3Style}>Spell Checking</h3>
      <code style={codeStyle}>{`:set spell          " Enable spell checking
:set spelllang=en_us " Set language
]s                  " Next misspelled word
[s                  " Previous misspelled word
z=                  " Show spelling suggestions
zg                  " Add word to dictionary
zw                  " Mark word as misspelled`}</code>

      <h3 style={h3Style}>Working with Multiple Files</h3>
      <code style={codeStyle}>{`" Open multiple files from command line:
vim file1.js file2.js file3.js
" Navigate: :bn :bp :b filename

" Open all JS files in project:
vim **/*.js

" Use argument list:
:args **/*.js       " Set argument list
:next / :prev       " Navigate args
:argdo %s/foo/bar/g " Apply to all args
:argdo w            " Save all args

" Project-wide search and replace (with quickfix):
:grep -r "oldName" .
:cfdo %s/oldName/newName/g | w`}</code>

      {/* =========================================================
          SECTION 15: FAQ
      ========================================================= */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>

      <h3 style={h3Style}>How do I exit Vim?</h3>
      <p style={pStyle}>
        Press <kbd style={kbdStyle}>Escape</kbd> to ensure you are in Normal mode, then: <code style={inlineCodeStyle}>:q</code> (quit, no unsaved changes), <code style={inlineCodeStyle}>:q!</code> (quit, discard changes), <code style={inlineCodeStyle}>:wq</code> or <code style={inlineCodeStyle}>ZZ</code> (save and quit). If everything feels broken, <kbd style={kbdStyle}>Escape</kbd> mashed repeatedly then <code style={inlineCodeStyle}>:q!</code> will always work.
      </p>

      <h3 style={h3Style}>What are Vim text objects and why are they powerful?</h3>
      <p style={pStyle}>
        Text objects let you operate on semantic units: <code style={inlineCodeStyle}>diw</code> deletes a word, <code style={inlineCodeStyle}>ci"</code> changes text inside quotes, <code style={inlineCodeStyle}>da{'{}'}</code> deletes a block including braces, <code style={inlineCodeStyle}>yip</code> yanks a paragraph. The pattern is <strong>operator + i/a + object</strong>. They make editing much faster than manually selecting characters.
      </p>

      <h3 style={h3Style}>How do I search and replace text in Vim?</h3>
      <p style={pStyle}>
        Use <code style={inlineCodeStyle}>:%s/old/new/g</code> to replace all occurrences in the file. Add <code style={inlineCodeStyle}>c</code> for confirmation (<code style={inlineCodeStyle}>:%s/old/new/gc</code>), <code style={inlineCodeStyle}>i</code> for case-insensitive. Use <code style={inlineCodeStyle}>:s/old/new/g</code> for the current line only. The <code style={inlineCodeStyle}>%</code> means &quot;all lines&quot; and can be replaced with a range like <code style={inlineCodeStyle}>1,10</code>.
      </p>

      <h3 style={h3Style}>What is the difference between Vim and Neovim?</h3>
      <p style={pStyle}>
        Neovim is a modernized fork with built-in LSP, Lua configuration, async processing, floating windows, and an active modern plugin ecosystem. Vim is more stable and universally pre-installed. For new development workflows, Neovim is recommended. For quick edits on servers, Vim is always available.
      </p>

      <h3 style={h3Style}>How do Vim macros work?</h3>
      <p style={pStyle}>
        Record with <code style={inlineCodeStyle}>qa</code> (record into register a), perform actions, stop with <code style={inlineCodeStyle}>q</code>. Replay with <code style={inlineCodeStyle}>@a</code> or <code style={inlineCodeStyle}>@@</code> for last macro. Apply to multiple lines with a count: <code style={inlineCodeStyle}>10@a</code>. Apply to all lines: <code style={inlineCodeStyle}>:%normal @a</code>.
      </p>

      <h3 style={h3Style}>How do I split windows and manage buffers?</h3>
      <p style={pStyle}>
        Split with <code style={inlineCodeStyle}>:split</code> / <code style={inlineCodeStyle}>:vsplit</code>. Navigate splits with <code style={inlineCodeStyle}>Ctrl+w h/j/k/l</code>. List buffers with <code style={inlineCodeStyle}>:ls</code>, switch with <code style={inlineCodeStyle}>:b N</code> or <code style={inlineCodeStyle}>:bn</code> / <code style={inlineCodeStyle}>:bp</code>. Close buffer with <code style={inlineCodeStyle}>:bd</code>. Use Telescope (<code style={inlineCodeStyle}>&lt;leader&gt;fb</code>) for fuzzy buffer switching.
      </p>

      <h3 style={h3Style}>What essential plugins should I install?</h3>
      <p style={pStyle}>
        For Neovim: Telescope (fuzzy finding), nvim-tree (file explorer), vim-fugitive (Git), nvim-lspconfig + nvim-cmp (LSP + completion), nvim-treesitter (syntax), lualine.nvim (status line), vim-surround (surround text), nvim-autopairs. For a full preset configuration, try LazyVim or Kickstart.nvim.
      </p>

      <h3 style={h3Style}>How do I learn Vim effectively?</h3>
      <p style={pStyle}>
        Run <code style={inlineCodeStyle}>vimtutor</code> from the terminal — it is a built-in 30-minute interactive tutorial. Focus on one new concept per day rather than trying to learn everything at once. Force yourself to use Vim exclusively for a week; the muscle memory develops quickly. Practice text objects and motions most — they provide the biggest productivity gain.
      </p>
    </article>
  );
}

function ChineseContent() {
  return (
    <article style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '860px', margin: '0 auto', padding: '0 16px' }}>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '1rem', color: '#0369a1', marginBottom: '8px' }}>TL;DR</p>
        <p style={{ color: '#0c4a6e', lineHeight: '1.7', margin: 0 }}>
          Vim 是一款模态文本编辑器 —— 你需要在普通模式、插入模式、可视模式和命令模式之间切换。学习曲线较陡，但回报巨大：完全不离开键盘即可以思考的速度进行编辑。本指南涵盖从退出 Vim 到录制宏、配置 Neovim、以及使用 Telescope 和 LSP 构建现代类 IDE 工作流的全部内容。
        </p>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '40px',
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b', marginBottom: '12px' }}>核心要点</p>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.9', color: '#374151' }}>
          <li>Vim 有五种模式 —— <strong>普通模式</strong>是默认模式；始终用 <kbd style={kbdStyle}>Escape</kbd> 返回</li>
          <li>学习文本对象（<code style={inlineCodeStyle}>diw</code>、<code style={inlineCodeStyle}>ci"</code>、<code style={inlineCodeStyle}>da{'{}'}</code>）—— 这是最有效率倍增效果的功能</li>
          <li>使用 <code style={inlineCodeStyle}>.</code>（点命令）重复上次修改 —— 与文本对象结合实现强大编辑</li>
          <li>宏（<code style={inlineCodeStyle}>q</code>/<code style={inlineCodeStyle}>@</code>）可在多行上自动化重复的多步骤编辑</li>
          <li>带 <code style={inlineCodeStyle}>c</code> 标志的 <code style={inlineCodeStyle}>:%s/旧/新/gc</code> 让你逐个确认每次替换</li>
          <li>Neovim + Lua 配置（<code style={inlineCodeStyle}>init.lua</code>）+ Lazy.nvim 是现代完整 IDE 设置的推荐方式</li>
          <li>分屏 + 缓冲区 + 标记可替代大多数工作流中的标签页 —— 掌握 <code style={inlineCodeStyle}>Ctrl+w</code> 导航</li>
          <li>投入一周时间突破初期障碍 —— 之后生产力呈指数级增长</li>
        </ul>
      </div>

      <h2 style={h2Style}>简介：为什么在 2026 年学习 Vim？</h2>
      <p style={pStyle}>
        Vim 自 1991 年以来一直是开发者的利器，其影响力有增无减。每个主流 IDE —— VS Code、JetBrains、Xcode —— 都提供 Vim 模拟插件，且通常是安装量最高的扩展之一。SSH 会话、生产服务器和容器环境几乎总是有 <code style={inlineCodeStyle}>vi</code> 可用。理解 Vim 赋予你一种通用的编辑超能力。
      </p>
      <p style={pStyle}>
        核心思想是<strong>模态编辑</strong>：Vim 在不同模式之间切换，而不是为每个命令使用修饰键（Ctrl、Alt）。在普通模式下，每个键都是命令；在插入模式下，键输入文字。这听起来违反直觉，但却能使用助记单字符命令实现极其快速、精确的文本操作。
      </p>
      <p style={pStyle}>
        <strong>Neovim</strong> 是 Vim 的现代化分支，增加了内置 LSP 支持、异步处理、Lua API 和活跃的插件生态系统。本指南同时涵盖 Vim 和 Neovim，在存在差异的地方会特别标注。如果你是新手，推荐选择 Neovim。
      </p>

      {/* ======================== 模式 ======================== */}
      <h2 style={h2Style}>1. Vim 模式详解</h2>
      <p style={pStyle}>理解 Vim 的模态系统是最重要的核心概念。初学者遇到的所有困惑都源于意外进入了错误的模式。</p>

      <h3 style={h3Style}>普通模式 — 命令中枢</h3>
      <p style={pStyle}>
        普通模式是打开文件时的默认模式。按键被解释为命令，而非文本输入。始终用 <kbd style={kbdStyle}>Escape</kbd>（或更快的 <kbd style={kbdStyle}>Ctrl+[</kbd>）返回此模式。在 Vim 中，你的大部分时间应该在普通模式下度过 —— 每次编辑之间都会返回这里。
      </p>

      <h3 style={h3Style}>插入模式 — 输入文字</h3>
      <p style={pStyle}>插入模式的工作方式与传统文本编辑器相同。从普通模式进入插入模式有多种方式，每种方式放置光标的位置不同：</p>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>按键</th><th style={thStyle}>操作</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>i</code></td><td style={tdStyle}>在光标前插入</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>I</code></td><td style={tdAltStyle}>在行首插入</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>a</code></td><td style={tdStyle}>在光标后追加</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>A</code></td><td style={tdAltStyle}>在行尾追加</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>o</code></td><td style={tdStyle}>在下方新建一行并插入</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>O</code></td><td style={tdAltStyle}>在上方新建一行并插入</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>s</code></td><td style={tdStyle}>删除字符并进入插入模式</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>S</code></td><td style={tdAltStyle}>删除行并进入插入模式</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>可视模式 — 选择文本</h3>
      <p style={pStyle}>可视模式在应用操作前高亮显示文本。有三种变体：</p>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>按键</th><th style={thStyle}>模式</th><th style={thStyle}>说明</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>v</code></td><td style={tdStyle}>字符可视</td><td style={tdStyle}>逐字符选择</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>V</code></td><td style={tdAltStyle}>行可视</td><td style={tdAltStyle}>选择整行</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>Ctrl+v</code></td><td style={tdStyle}>块可视</td><td style={tdStyle}>矩形列选择 —— 同时在多列中插入/删除</td></tr>
          <tr><td style={tdAltStyle}><code style={inlineCodeStyle}>gv</code></td><td style={tdAltStyle}>重新选择</td><td style={tdAltStyle}>重新选择上次的可视选区</td></tr>
        </tbody>
      </table>

      {/* ======================== 导航 ======================== */}
      <h2 style={h2Style}>2. 基本导航</h2>

      <h3 style={h3Style}>基础移动：h/j/k/l</h3>
      <code style={codeStyle}>{`h   ← 左
j   ↓ 下
k   ↑ 上
l   → 右

" 所有命令都接受数量前缀：
5j  " 向下移动5行
10h " 向左移动10个字符`}</code>

      <h3 style={h3Style}>单词移动</h3>
      <code style={codeStyle}>{`w     " 移到下一个单词开头（在标点处停止）
W     " 移到下一个 WORD 开头（以空格分隔）
b     " 向后移到单词开头
e     " 移到单词末尾
ge    " 向后移到上一个单词末尾`}</code>

      <h3 style={h3Style}>行和文件导航</h3>
      <code style={codeStyle}>{`0       " 移到行首（第0列）
^       " 移到第一个非空白字符
$       " 移到行尾
gg      " 移到文件第一行
G       " 移到文件最后一行
42G     " 移到第42行
Ctrl+f  " 向前滚动一整页
Ctrl+b  " 向后滚动一整页
zz      " 将当前行居中显示在屏幕上`}</code>

      <h3 style={h3Style}>搜索导航</h3>
      <code style={codeStyle}>{`/pattern    " 向前搜索模式
?pattern    " 向后搜索模式
n           " 下一个匹配（同方向）
N           " 上一个匹配（反方向）
*           " 向前搜索光标下的单词
#           " 向后搜索光标下的单词`}</code>

      {/* ======================== 编辑 ======================== */}
      <h2 style={h2Style}>3. 核心编辑命令</h2>

      <h3 style={h3Style}>删除、复制和粘贴</h3>
      <code style={codeStyle}>{`" === 删除 ===
x       " 删除光标下的字符
dd      " 删除整行
D       " 删除从光标到行尾
dw      " 删除单词
d3w     " 删除3个单词
dG      " 删除从当前行到文件末尾

" === 复制（yank）===
yy      " 复制当前行
yw      " 复制单词
y$      " 复制到行尾
yG      " 复制到文件末尾

" === 粘贴（put）===
p       " 在光标后粘贴
P       " 在光标前粘贴
"+p     " 从系统剪贴板粘贴（+寄存器）
"0p     " 粘贴上次明确复制的文本（非删除操作）`}</code>

      <h3 style={h3Style}>撤销和重做</h3>
      <code style={codeStyle}>{`u         " 撤销上次修改
U         " 撤销当前行的所有修改
Ctrl+r    " 重做（撤销撤销操作）
5u        " 撤销最近5次修改`}</code>

      {/* ======================== 文本对象 ======================== */}
      <h2 style={h2Style}>4. 文本对象 —— Vim 的超能力</h2>
      <p style={pStyle}>
        文本对象是 Vim 最强大的功能，大多数其他编辑器都缺乏这一特性。它们让你用单个操作符对语义块进行操作：单词、句子、段落、引号字符串、括号表达式、HTML 标签等。
      </p>
      <p style={pStyle}>
        语法是：<strong>操作符 + i/a + 对象</strong>。<code style={inlineCodeStyle}>i</code> 前缀表示<em>内部</em>（不包括外围分隔符），<code style={inlineCodeStyle}>a</code> 表示<em>周围</em>（包括外围分隔符）。
      </p>
      <code style={codeStyle}>{`diw     " 删除内部单词（只删单词，不含空格）
daw     " 删除整个单词（单词+周围空格）
ciw     " 修改内部单词（删除单词后进入插入模式）
ci"     " 修改双引号内的内容："hello" → ""
ca"     " 修改双引号及内容（删除引号）
ci(     " 修改括号内的内容：foo(bar) → foo()
da{     " 删除花括号及内容
yip     " 复制内部段落
dit     " 删除 HTML/XML 标签内的内容
cat     " 删除整个标签（含标签本身）

" 实际示例：
" 光标在以下内容内的任意位置：console.log("hello world")
ci"     " → console.log("")    （修改引号内容）

" 光标在以下内容内的任意位置：function foo(a, b, c)
ci(     " → function foo()     （清空参数）`}</code>

      {/* ======================== 搜索替换 ======================== */}
      <h2 style={h2Style}>5. 搜索和替换</h2>
      <code style={codeStyle}>{`" 基本语法：:[范围]s/模式/替换/[标志]

:s/old/new          " 替换当前行第一个 'old'
:s/old/new/g        " 替换当前行所有 'old'（g=全局）
:%s/old/new/g       " 替换整个文件中的所有（%=所有行）
:%s/old/new/gc      " 替换所有，逐个确认（c=确认）
:%s/old/new/gi      " 替换所有，不区分大小写（i）

" 范围示例：
:1,10s/foo/bar/g    " 第1-10行
:'<,'>s/foo/bar/g   " 可视选区（V模式后输入:自动填充）

" 实用模式：
:%s/\s\+$//e        " 删除每行末尾空白（e=找不到时不报错）
:%s/^/  /g          " 在每行开头添加2个空格

" 全局命令：
:g/pattern/d        " 删除所有包含模式的行
:g/^\s*$/d          " 删除所有空行
:v/pattern/d        " 删除所有不匹配模式的行`}</code>

      {/* ======================== 宏 ======================== */}
      <h2 style={h2Style}>6. 宏 —— 自动化重复编辑</h2>
      <p style={pStyle}>
        宏录制一系列普通模式命令（包括进入/退出插入模式、移动和 Ex 命令）并重放它们。对于重复的结构性编辑，宏是 Vim 最强大的自动化功能。
      </p>
      <code style={codeStyle}>{`qa          " 开始录制到寄存器 'a'
" ... 执行你的操作序列 ...
q           " 停止录制

@a          " 播放宏 'a' 一次
@@          " 重放上次使用的宏
5@a         " 播放宏 'a' 5次
:%normal @a " 将宏应用到文件的每一行

" 查看宏内容：
"ap         " 粘贴寄存器 'a' 查看录制的序列`}</code>

      {/* ======================== 配置 ======================== */}
      <h2 style={h2Style}>7. 配置 —— .vimrc 和 init.lua</h2>

      <h3 style={h3Style}>基本 .vimrc 设置</h3>
      <code style={codeStyle}>{`" ~/.vimrc — 基本设置

set nocompatible          " 不兼容 Vi（启用 Vim 改进）
filetype plugin indent on " 启用文件类型检测、插件和缩进
syntax on                  " 启用语法高亮

set number                " 显示行号
set relativenumber        " 显示相对行号（对移动命令非常有用）
set cursorline            " 高亮当前行
set hlsearch              " 高亮搜索匹配
set incsearch             " 增量搜索（边输入边高亮）
set ignorecase            " 搜索不区分大小写
set smartcase             " 使用大写时覆盖 ignorecase

set tabstop=2             " Tab 显示为 2 个空格
set shiftwidth=2          " 使用 2 个空格缩进
set expandtab             " 用空格代替 Tab
set hidden                " 允许后台缓冲区无需保存
set undofile              " 跨会话持久撤销
set noswapfile            " 禁用交换文件
set scrolloff=8           " 光标上下保持 8 行可见

let mapleader = ' '       " 空格键作为 leader 键

" 快速保存和退出
nnoremap <leader>w :w<CR>
nnoremap <leader>q :q<CR>

" 清除搜索高亮
nnoremap <leader>h :nohlsearch<CR>

" 更好的分屏导航
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l`}</code>

      {/* ======================== Vim vs Neovim ======================== */}
      <h2 style={h2Style}>8. Vim vs Neovim 对比</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>功能</th>
              <th style={thStyle}>Vim 9.x</th>
              <th style={thStyle}>Neovim 0.9+</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}><strong>配置语言</strong></td>
              <td style={tdStyle}>Vimscript 9（新语法）</td>
              <td style={tdStyle}>Lua（主要）+ Vimscript</td>
            </tr>
            <tr>
              <td style={tdAltStyle}><strong>内置 LSP</strong></td>
              <td style={tdAltStyle}>否（需要 coc.nvim）</td>
              <td style={tdAltStyle}>是（vim.lsp）</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Treesitter</strong></td>
              <td style={tdStyle}>仅插件</td>
              <td style={tdStyle}>内置（nvim-treesitter）</td>
            </tr>
            <tr>
              <td style={tdAltStyle}><strong>异步任务控制</strong></td>
              <td style={tdAltStyle}>有限</td>
              <td style={tdAltStyle}>完整异步 API</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>插件生态</strong></td>
              <td style={tdStyle}>庞大、成熟</td>
              <td style={tdStyle}>非常活跃，Lua 优先</td>
            </tr>
            <tr>
              <td style={tdAltStyle}><strong>默认设置</strong></td>
              <td style={tdAltStyle}>保守（Vi 兼容）</td>
              <td style={tdAltStyle}>合理的现代默认值</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>通用可用性</strong></td>
              <td style={tdStyle}>大多数系统预装</td>
              <td style={tdStyle}>需要单独安装</td>
            </tr>
            <tr>
              <td style={tdAltStyle}><strong>入门配置</strong></td>
              <td style={tdAltStyle}>网上有 vimrc 示例</td>
              <td style={tdAltStyle}>LazyVim、Kickstart、AstroNvim</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>最适合</strong></td>
              <td style={tdStyle}>服务器、脚本、熟悉 Vimscript</td>
              <td style={tdStyle}>完整开发工作流、现代 IDE 功能</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ======================== 插件 ======================== */}
      <h2 style={h2Style}>9. 必备插件</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>插件</th>
            <th style={thStyle}>功能</th>
            <th style={thStyle}>适用</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>telescope.nvim</td><td style={tdStyle}>模糊查找文件、文本、缓冲区</td><td style={tdStyle}>Neovim</td></tr>
          <tr><td style={tdAltStyle}>fzf.vim</td><td style={tdAltStyle}>模糊查找文件和内容</td><td style={tdAltStyle}>Vim + Neovim</td></tr>
          <tr><td style={tdStyle}>nvim-tree / NERDTree</td><td style={tdStyle}>文件资源管理器</td><td style={tdStyle}>Neovim / Vim</td></tr>
          <tr><td style={tdAltStyle}>vim-fugitive</td><td style={tdAltStyle}>Git 集成（最佳 Git 封装）</td><td style={tdAltStyle}>Vim + Neovim</td></tr>
          <tr><td style={tdStyle}>coc.nvim</td><td style={tdStyle}>自动补全和 LSP（Vim 兼容）</td><td style={tdStyle}>Vim + Neovim</td></tr>
          <tr><td style={tdAltStyle}>nvim-lspconfig</td><td style={tdAltStyle}>原生 LSP 配置</td><td style={tdAltStyle}>Neovim</td></tr>
          <tr><td style={tdStyle}>nvim-treesitter</td><td style={tdStyle}>更好的语法高亮和文本对象</td><td style={tdStyle}>Neovim</td></tr>
          <tr><td style={tdAltStyle}>lualine.nvim</td><td style={tdAltStyle}>美观的状态栏</td><td style={tdAltStyle}>Neovim</td></tr>
          <tr><td style={tdStyle}>vim-surround</td><td style={tdStyle}>操作括号、引号等包围字符</td><td style={tdStyle}>Vim + Neovim</td></tr>
          <tr><td style={tdAltStyle}>gitsigns.nvim</td><td style={tdAltStyle}>行内 Git 差异标记</td><td style={tdAltStyle}>Neovim</td></tr>
        </tbody>
      </table>

      {/* ======================== FAQ ======================== */}
      <h2 style={h2Style}>常见问题</h2>

      <h3 style={h3Style}>如何退出 Vim？</h3>
      <p style={pStyle}>
        按 <kbd style={kbdStyle}>Escape</kbd> 确保在普通模式，然后：<code style={inlineCodeStyle}>:q</code>（没有未保存修改时退出），<code style={inlineCodeStyle}>:q!</code>（强制退出，放弃修改），<code style={inlineCodeStyle}>:wq</code> 或 <code style={inlineCodeStyle}>ZZ</code>（保存并退出）。如果一切看起来都出了问题，反复按 <kbd style={kbdStyle}>Escape</kbd> 然后输入 <code style={inlineCodeStyle}>:q!</code> 总能成功退出。
      </p>

      <h3 style={h3Style}>Vim 的主要模式有哪些？</h3>
      <p style={pStyle}>
        Vim 有五种主要模式：普通模式（默认，用于导航和命令）、插入模式（用于输入文字，通过 i、a、o 等进入）、可视模式（用于选择文字，通过 v、V 或 Ctrl+v 进入）、命令行模式（用于 Ex 命令，通过 : 进入）和替换模式（通过 R 进入，覆盖现有文字）。理解模式是流畅使用 Vim 的关键。
      </p>

      <h3 style={h3Style}>如何在 Vim 中搜索和替换文本？</h3>
      <p style={pStyle}>
        使用替换命令：<code style={inlineCodeStyle}>:%s/旧/新/g</code> 替换文件中的所有出现。<code style={inlineCodeStyle}>:s/旧/新/g</code> 只替换当前行。添加 c 标志进行确认：<code style={inlineCodeStyle}>:%s/旧/新/gc</code>。<code style={inlineCodeStyle}>%</code> 表示"所有行"，可以替换为范围如 <code style={inlineCodeStyle}>1,10</code>。
      </p>

      <h3 style={h3Style}>Vim 和 Neovim 有什么区别？</h3>
      <p style={pStyle}>
        Neovim 是具有内置 LSP、Lua 配置、异步处理、浮动窗口和活跃现代插件生态系统的现代化分支。Vim 更稳定且通常预装在系统上。对于新的开发工作流，推荐 Neovim。在服务器上进行快速编辑时，Vim 总是可用的。
      </p>

      <h3 style={h3Style}>如何学习 Vim？</h3>
      <p style={pStyle}>
        在终端中运行 <code style={inlineCodeStyle}>vimtutor</code> —— 这是一个内置的 30 分钟互动教程。每天专注学习一个新概念，而不是一次性学完所有内容。强迫自己在一周内只使用 Vim；肌肉记忆会很快形成。最优先练习文本对象和移动命令 —— 它们带来最大的生产力提升。
      </p>
    </article>
  );
}

export default function VimGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {lang === 'zh' ? <ChineseContent /> : <EnglishContent />}
    </>
  );
}
