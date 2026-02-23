'use client';
import React from 'react';

const codeVariants = `// Using class-variance-authority (cva) for type-safe variants
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    // Base classes applied to every variant
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

// Usage:
// <Button variant="outline" size="sm">Click me</Button>
// <Button variant="destructive">Delete</Button>`;

const codeApply = `/* globals.css — using @apply to extract reusable patterns */
@layer components {
    /* Card component pattern */
    .card {
        @apply rounded-lg border bg-card text-card-foreground shadow-sm;
    }

    .card-header {
        @apply flex flex-col space-y-1.5 p-6;
    }

    .card-title {
        @apply text-2xl font-semibold leading-none tracking-tight;
    }

    .card-content {
        @apply p-6 pt-0;
    }

    /* Form field pattern */
    .form-label {
        @apply text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70;
    }

    .form-input {
        @apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
               ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium
               placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
    }

    /* Badge pattern */
    .badge {
        @apply inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold
               transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2;
    }
}

/* Use sparingly — prefer utility classes in JSX for maintainability */`;

const codeCnUtil = `// lib/utils.ts — the cn() helper (used everywhere in shadcn/ui)
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// clsx: conditionally join class names
// twMerge: intelligently merge Tailwind classes (handles conflicts)
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Examples:
cn('px-4 py-2', 'px-6')           // 'py-2 px-6' (px-4 overridden)
cn('text-red-500', isActive && 'text-blue-500')  // conditional
cn({ 'opacity-50': disabled, 'cursor-not-allowed': disabled })`;

const codeHeadless = `// Using Headless UI (Tailwind Labs) for accessible components
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
];

export function Select() {
    const [selected, setSelected] = useState(people[0]);

    return (
        <Listbox value={selected} onChange={setSelected}>
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {people.map((person) => (
                        <Listbox.Option key={person.id} value={person} className={({ active }) => cn('relative cursor-default select-none py-2 pl-10 pr-4', active ? 'bg-amber-100 text-amber-900' : 'text-gray-900')}>
                            {({ selected }) => (
                                <>
                                    <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>{person.name}</span>
                                    {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"><CheckIcon className="h-5 w-5" /></span> : null}
                                </>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    );
}`;

const codeTailwindConfig = `// tailwind.config.ts — extend with design tokens
import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                // CSS variable-based colors for theming
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};

export default config;`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Tailwind CSS Component Patterns: Reusable UI Without CSS Chaos',
    intro: 'Tailwind CSS\'s utility-first approach can lead to bloated JSX if not organized properly. In 2026, the ecosystem has converged on patterns like class-variance-authority (cva) for variant management, the cn() helper for class merging, @apply for truly repeated patterns, and Headless UI for accessible interactive components. This guide covers all of them.',
    cvaTitle: 'class-variance-authority (cva): Type-Safe Variants',
    cvaDesc: 'cva is the standard way to manage component variants in Tailwind. It gives you full TypeScript types for variants, default variants, and compound variants — all without CSS-in-JS.',
    applyTitle: 'When to Use @apply',
    applyDesc: '@apply extracts repeated Tailwind class combinations into CSS classes. Use it sparingly — only for patterns repeated 10+ times across many files. Most patterns belong in React components.',
    cnTitle: 'The cn() Utility: Merging Classes Safely',
    cnDesc: 'clsx handles conditional classes, and tailwind-merge resolves Tailwind conflicts (e.g., px-4 + px-6 → px-6). Together they form the cn() utility used in every shadcn/ui component.',
    headlessTitle: 'Headless UI: Accessible Interactive Components',
    headlessDesc: 'Headless UI (by Tailwind Labs) provides fully accessible interactive components with zero styling. You bring the Tailwind classes; it handles ARIA attributes, keyboard navigation, and focus management.',
    configTitle: 'Tailwind Config: Design Tokens and Theming',
    configDesc: 'Extending Tailwind with CSS custom properties (variables) enables theme switching without JavaScript. This is the pattern used by shadcn/ui and Radix UI themes.',
    comparisonTitle: 'Component Library Approaches',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Use cva for any component with 2+ variants. It catches typos at compile time and auto-generates TypeScript types.',
    bp2: 'Always use cn() (twMerge + clsx) to merge classes. Never concatenate strings directly — Tailwind conflicts will break styles.',
    bp3: 'Avoid @apply for components. Use it only for truly global patterns like .prose or third-party library overrides.',
    bp4: 'Design tokens via CSS variables in tailwind.config.ts enable dark mode and theming without duplicating utility classes.',
    bp5: 'For accessible dropdowns, modals, tooltips — use Headless UI or Radix UI primitives. Rolling your own is bug-prone.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Should I use Tailwind or a CSS-in-JS library like styled-components?',
    faq1a: 'In 2026, Tailwind with CVA and shadcn/ui is the dominant pattern for new React projects. CSS-in-JS has performance overhead with React Server Components (they serialize styles to HTML). Tailwind generates static CSS at build time, has zero runtime overhead, and works natively with RSC.',
    faq2q: 'What is shadcn/ui and should I use it?',
    faq2a: 'shadcn/ui is a collection of copy-paste components built with Radix UI + Tailwind + CVA. Unlike traditional component libraries (MUI, Chakra), you own the source code — components live in your repo. This means full customization without fighting library styles. Highly recommended for new projects.',
    faq3q: 'How do I handle dark mode with Tailwind?',
    faq3a: 'Add darkMode: "class" to tailwind.config.ts. Then add the dark: prefix to utility classes (e.g., dark:bg-gray-900). Toggle by adding/removing the dark class on the html element. With CSS variables and design tokens, you can update a single :root block for complete theme switches.',
    faq4q: 'How do I prevent Tailwind class purging in production?',
    faq4a: 'Configure the content array in tailwind.config.ts to include all files that use Tailwind classes. Never construct class names dynamically (e.g., bg-${color}-500) — Tailwind\'s purge cannot analyze interpolated strings. Use the full class name in your source code.',
    faq5q: 'Is Tailwind CSS good for design systems?',
    faq5a: 'Yes, but requires discipline. Use design tokens (CSS variables) mapped to Tailwind colors/spacing. Create a component library using cva. Document all variant combinations. Teams at Vercel, Linear, and PlanetScale use Tailwind-based design systems at scale.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Tailwind CSS 组件模式：可复用 UI，无 CSS 混乱',
    intro: 'Tailwind CSS 的工具优先方法如果组织不当会导致 JSX 臃肿。2026 年，生态系统已在几种模式上达成共识：用 class-variance-authority (cva) 管理变体，用 cn() 助手合并类名，用 @apply 处理真正重复的模式，以及用 Headless UI 处理可访问的交互式组件。',
    cvaTitle: 'class-variance-authority (cva)：类型安全的变体',
    cvaDesc: 'cva 是在 Tailwind 中管理组件变体的标准方式。它为变体、默认变体和复合变体提供完整的 TypeScript 类型——所有这些都无需 CSS-in-JS。',
    applyTitle: '何时使用 @apply',
    applyDesc: '@apply 将重复的 Tailwind 类组合提取为 CSS 类。谨慎使用——仅适用于在多个文件中重复 10 次以上的模式。大多数模式应放在 React 组件中。',
    cnTitle: 'cn() 工具：安全合并类名',
    cnDesc: 'clsx 处理条件类，tailwind-merge 解决 Tailwind 冲突（如 px-4 + px-6 → px-6）。它们共同构成了每个 shadcn/ui 组件使用的 cn() 工具。',
    headlessTitle: 'Headless UI：可访问的交互式组件',
    headlessDesc: 'Headless UI（由 Tailwind Labs 提供）提供完全无样式的可访问交互式组件。你提供 Tailwind 类；它处理 ARIA 属性、键盘导航和焦点管理。',
    configTitle: 'Tailwind 配置：设计令牌和主题',
    configDesc: '使用 CSS 自定义属性（变量）扩展 Tailwind 可以实现无 JavaScript 的主题切换。这是 shadcn/ui 和 Radix UI 主题使用的模式。',
    comparisonTitle: '组件库方法对比',
    bestPracticesTitle: '最佳实践',
    bp1: '对具有 2 个以上变体的任何组件使用 cva。它在编译时捕获拼写错误并自动生成 TypeScript 类型。',
    bp2: '始终使用 cn()（twMerge + clsx）合并类名。永远不要直接连接字符串——Tailwind 冲突会破坏样式。',
    bp3: '避免对组件使用 @apply。仅将其用于真正的全局模式，如 .prose 或第三方库覆盖。',
    bp4: '通过 tailwind.config.ts 中 CSS 变量的设计令牌可以实现暗模式和主题，无需重复工具类。',
    bp5: '对于可访问的下拉菜单、模态框、工具提示——使用 Headless UI 或 Radix UI 基元。自己实现容易出错。',
    faqTitle: '常见问题',
    faq1q: '我应该使用 Tailwind 还是 styled-components 等 CSS-in-JS 库？',
    faq1a: '2026 年，Tailwind + CVA + shadcn/ui 是新 React 项目的主流模式。CSS-in-JS 在 React Server Components 中有性能开销。Tailwind 在构建时生成静态 CSS，零运行时开销，并原生支持 RSC。',
    faq2q: 'shadcn/ui 是什么，我应该使用它吗？',
    faq2a: 'shadcn/ui 是使用 Radix UI + Tailwind + CVA 构建的复制粘贴组件集合。与传统组件库不同，你拥有源代码——组件存在于你的仓库中。这意味着完全自定义，无需对抗库样式。强烈推荐用于新项目。',
    faq3q: '如何使用 Tailwind 处理暗模式？',
    faq3a: '在 tailwind.config.ts 中添加 darkMode: "class"。然后为工具类添加 dark: 前缀（如 dark:bg-gray-900）。通过在 html 元素上添加/移除 dark 类来切换。',
    faq4q: '如何防止 Tailwind 类在生产中被清除？',
    faq4a: '在 tailwind.config.ts 中配置 content 数组以包含所有使用 Tailwind 类的文件。永远不要动态构建类名（如 bg-${color}-500）——Tailwind 的清除无法分析插值字符串。',
    faq5q: 'Tailwind CSS 适合设计系统吗？',
    faq5a: '是的，但需要纪律。使用映射到 Tailwind 颜色/间距的设计令牌（CSS 变量）。使用 cva 创建组件库。记录所有变体组合。Vercel、Linear 等公司在大规模使用基于 Tailwind 的设计系统。',
    relatedTitle: '相关工具',
  },
  fr: { title: 'Patterns de composants Tailwind CSS : UI réutilisable sans chaos CSS', intro: 'L\'approche utility-first de Tailwind CSS peut mener à un JSX gonflé si elle n\'est pas organisée correctement. En 2026, l\'écosystème s\'est concentré sur des patterns comme cva, cn() et Headless UI.', cvaTitle: 'class-variance-authority (cva) : variantes typées', cvaDesc: 'cva est la manière standard de gérer les variantes de composants dans Tailwind.', applyTitle: 'Quand utiliser @apply', applyDesc: '@apply extrait les combinaisons de classes Tailwind répétées en classes CSS.', cnTitle: 'L\'utilitaire cn() : fusionner les classes en toute sécurité', cnDesc: 'clsx gère les classes conditionnelles, tailwind-merge résout les conflits Tailwind.', headlessTitle: 'Headless UI : composants interactifs accessibles', headlessDesc: 'Headless UI fournit des composants interactifs accessibles sans aucun style.', configTitle: 'Config Tailwind : design tokens et thèmes', configDesc: 'Étendre Tailwind avec des variables CSS permet de changer de thème sans JavaScript.', comparisonTitle: 'Approches des bibliothèques de composants', bestPracticesTitle: 'Bonnes pratiques', bp1: 'Utiliser cva pour tout composant avec 2+ variantes.', bp2: 'Toujours utiliser cn() pour fusionner les classes.', bp3: 'Éviter @apply pour les composants.', bp4: 'Les design tokens via variables CSS permettent le mode sombre sans dupliquer les classes.', bp5: 'Pour les dropdowns, modals — utiliser Headless UI ou Radix UI.', faqTitle: 'FAQ', faq1q: 'Tailwind ou CSS-in-JS ?', faq1a: 'En 2026, Tailwind + CVA + shadcn/ui est le pattern dominant pour les nouveaux projets React.', faq2q: 'Qu\'est-ce que shadcn/ui ?', faq2a: 'shadcn/ui est une collection de composants copy-paste construits avec Radix UI + Tailwind + CVA.', faq3q: 'Comment gérer le dark mode avec Tailwind ?', faq3a: 'Ajouter darkMode: "class" dans tailwind.config.ts et utiliser le préfixe dark:.', faq4q: 'Comment éviter la purge des classes Tailwind en production ?', faq4a: 'Configurer le tableau content dans tailwind.config.ts pour inclure tous les fichiers qui utilisent Tailwind.', faq5q: 'Tailwind est-il bon pour les systèmes de design ?', faq5a: 'Oui, mais cela demande de la discipline. Utiliser des design tokens (variables CSS).', relatedTitle: 'Outils associés' },
  de: { title: 'Tailwind CSS Komponentenmuster: Wiederverwendbare UI ohne CSS-Chaos', intro: 'Der Utility-First-Ansatz von Tailwind kann zu aufgeblähtem JSX führen, wenn er nicht richtig organisiert wird.', cvaTitle: 'class-variance-authority (cva): Typsichere Varianten', cvaDesc: 'cva ist der Standardweg zur Verwaltung von Komponentenvarianten in Tailwind.', applyTitle: 'Wann @apply verwenden', applyDesc: '@apply extrahiert wiederholte Tailwind-Klassenkombinationen in CSS-Klassen.', cnTitle: 'Das cn()-Hilfsprogramm: Klassen sicher zusammenführen', cnDesc: 'clsx verarbeitet bedingte Klassen, tailwind-merge löst Tailwind-Konflikte auf.', headlessTitle: 'Headless UI: Zugängliche interaktive Komponenten', headlessDesc: 'Headless UI bietet vollständig zugängliche interaktive Komponenten ohne Styling.', configTitle: 'Tailwind-Konfiguration: Design-Tokens und Theming', configDesc: 'Tailwind mit CSS-Variablen zu erweitern ermöglicht Theme-Wechsel ohne JavaScript.', comparisonTitle: 'Komponentenbibliothek-Ansätze', bestPracticesTitle: 'Best Practices', bp1: 'cva für jede Komponente mit 2+ Varianten verwenden.', bp2: 'Immer cn() zum Zusammenführen von Klassen verwenden.', bp3: '@apply für Komponenten vermeiden.', bp4: 'Design-Tokens über CSS-Variablen für Dark Mode.', bp5: 'Für Dropdowns, Modals — Headless UI oder Radix UI verwenden.', faqTitle: 'Häufige Fragen', faq1q: 'Tailwind oder CSS-in-JS?', faq1a: '2026 ist Tailwind + CVA + shadcn/ui das dominante Muster für neue React-Projekte.', faq2q: 'Was ist shadcn/ui?', faq2a: 'shadcn/ui ist eine Sammlung von Copy-Paste-Komponenten, die mit Radix UI + Tailwind + CVA erstellt wurden.', faq3q: 'Wie wird Dark Mode mit Tailwind gehandhabt?', faq3a: 'darkMode: "class" in tailwind.config.ts hinzufügen und das dark:-Präfix verwenden.', faq4q: 'Wie vermeide ich das Bereinigen von Tailwind-Klassen in der Produktion?', faq4a: 'Das content-Array in tailwind.config.ts konfigurieren, um alle Dateien einzuschließen.', faq5q: 'Ist Tailwind gut für Design-Systeme?', faq5a: 'Ja, aber es erfordert Disziplin. Design-Tokens (CSS-Variablen) verwenden.', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Patrones de componentes Tailwind CSS: UI reutilizable sin caos CSS', intro: 'El enfoque utility-first de Tailwind CSS puede llevar a JSX inflado si no se organiza correctamente.', cvaTitle: 'class-variance-authority (cva): variantes con tipos', cvaDesc: 'cva es la forma estándar de gestionar variantes de componentes en Tailwind.', applyTitle: 'Cuándo usar @apply', applyDesc: '@apply extrae combinaciones de clases Tailwind repetidas en clases CSS.', cnTitle: 'La utilidad cn(): fusionar clases de forma segura', cnDesc: 'clsx maneja clases condicionales, tailwind-merge resuelve conflictos de Tailwind.', headlessTitle: 'Headless UI: componentes interactivos accesibles', headlessDesc: 'Headless UI proporciona componentes interactivos accesibles sin estilos.', configTitle: 'Config Tailwind: design tokens y temas', configDesc: 'Extender Tailwind con variables CSS permite cambiar temas sin JavaScript.', comparisonTitle: 'Enfoques de bibliotecas de componentes', bestPracticesTitle: 'Mejores prácticas', bp1: 'Usar cva para cualquier componente con 2+ variantes.', bp2: 'Siempre usar cn() para fusionar clases.', bp3: 'Evitar @apply para componentes.', bp4: 'Design tokens via CSS variables para dark mode.', bp5: 'Para dropdowns, modals — usar Headless UI o Radix UI.', faqTitle: 'Preguntas frecuentes', faq1q: '¿Tailwind o CSS-in-JS?', faq1a: 'En 2026, Tailwind + CVA + shadcn/ui es el patrón dominante para nuevos proyectos React.', faq2q: '¿Qué es shadcn/ui?', faq2a: 'shadcn/ui es una colección de componentes copy-paste construidos con Radix UI + Tailwind + CVA.', faq3q: '¿Cómo manejar dark mode con Tailwind?', faq3a: 'Agregar darkMode: "class" en tailwind.config.ts y usar el prefijo dark:.', faq4q: '¿Cómo prevenir la purga de clases Tailwind en producción?', faq4a: 'Configurar el array content en tailwind.config.ts para incluir todos los archivos.', faq5q: '¿Tailwind es bueno para sistemas de diseño?', faq5a: 'Sí, pero requiere disciplina. Usar design tokens (variables CSS).', relatedTitle: 'Herramientas relacionadas' },
  ja: { title: 'Tailwind CSSコンポーネントパターン：CSSカオスなしの再利用可能なUI', intro: 'TailwindのユーティリティファーストアプローチはCVA、cn()、Headless UIなどのパターンで整理できます。', cvaTitle: 'class-variance-authority (cva)：型安全なバリアント', cvaDesc: 'cvaはTailwindでコンポーネントバリアントを管理する標準的な方法です。', applyTitle: '@applyをいつ使うか', applyDesc: '@applyは繰り返されるTailwindクラスの組み合わせをCSSクラスに抽出します。', cnTitle: 'cn()ユーティリティ：クラスを安全にマージ', cnDesc: 'clsxは条件付きクラスを処理し、tailwind-mergeはTailwindの競合を解決します。', headlessTitle: 'Headless UI：アクセシブルなインタラクティブコンポーネント', headlessDesc: 'Headless UIはスタイルなしで完全にアクセシブルなコンポーネントを提供します。', configTitle: 'Tailwind設定：デザイントークンとテーマ', configDesc: 'CSS変数でTailwindを拡張することでJavaScriptなしのテーマ切り替えが可能。', comparisonTitle: 'コンポーネントライブラリアプローチ', bestPracticesTitle: 'ベストプラクティス', bp1: '2+バリアントを持つすべてのコンポーネントにcvaを使用。', bp2: 'クラスをマージするには常にcn()を使用。', bp3: 'コンポーネントには@applyを使わない。', bp4: 'CSS変数によるデザイントークンでダークモード対応。', bp5: 'ドロップダウン、モーダルにはHeadless UIかRadix UIを使用。', faqTitle: 'よくある質問', faq1q: 'TailwindかCSS-in-JSか？', faq1a: '2026年はTailwind + CVA + shadcn/uiが新規Reactプロジェクトの主流パターンです。', faq2q: 'shadcn/uiとは？', faq2a: 'shadcn/uiはRadix UI + Tailwind + CVAで構築されたコピー&ペーストコンポーネント集。', faq3q: 'TailwindでダークモードをどうするかΩ', faq3a: 'tailwind.config.tsにdarkMode: "class"を追加してdark:プレフィックスを使用。', faq4q: '本番環境でTailwindクラスのパージを防ぐには？', faq4a: 'tailwind.config.tsのcontentにすべてのTailwindクラスを使うファイルを含める。', faq5q: 'TailwindはデザインシステムにO向きですか？', faq5a: 'はい。CSS変数でデザイントークンを使いcvaでコンポーネントライブラリを作成します。', relatedTitle: '関連ツール' },
  ko: { title: 'Tailwind CSS 컴포넌트 패턴: CSS 혼란 없이 재사용 가능한 UI', intro: 'Tailwind CSS의 유틸리티 우선 접근법은 제대로 구성하지 않으면 부풀어 오른 JSX가 될 수 있습니다.', cvaTitle: 'class-variance-authority (cva): 타입 안전 변형', cvaDesc: 'cva는 Tailwind에서 컴포넌트 변형을 관리하는 표준 방법입니다.', applyTitle: '@apply를 언제 사용할까', applyDesc: '@apply는 반복되는 Tailwind 클래스 조합을 CSS 클래스로 추출합니다.', cnTitle: 'cn() 유틸리티: 안전하게 클래스 병합', cnDesc: 'clsx는 조건부 클래스를 처리하고, tailwind-merge는 Tailwind 충돌을 해결합니다.', headlessTitle: 'Headless UI: 접근 가능한 인터랙티브 컴포넌트', headlessDesc: 'Headless UI는 스타일 없이 완전히 접근 가능한 인터랙티브 컴포넌트를 제공합니다.', configTitle: 'Tailwind 설정: 디자인 토큰과 테마', configDesc: 'CSS 변수로 Tailwind를 확장하면 JavaScript 없이 테마 전환이 가능합니다.', comparisonTitle: '컴포넌트 라이브러리 접근 방식', bestPracticesTitle: '모범 사례', bp1: '변형이 2개 이상인 모든 컴포넌트에 cva를 사용하세요.', bp2: '클래스 병합에는 항상 cn()을 사용하세요.', bp3: '컴포넌트에는 @apply를 사용하지 마세요.', bp4: 'CSS 변수를 통한 디자인 토큰으로 다크 모드를 구현하세요.', bp5: '드롭다운, 모달에는 Headless UI나 Radix UI를 사용하세요.', faqTitle: '자주 묻는 질문', faq1q: 'Tailwind와 CSS-in-JS 중 어느 것을 선택해야 하나요?', faq1a: '2026년에는 Tailwind + CVA + shadcn/ui가 새 React 프로젝트의 지배적인 패턴입니다.', faq2q: 'shadcn/ui란 무엇인가요?', faq2a: 'shadcn/ui는 Radix UI + Tailwind + CVA로 만들어진 복사-붙여넣기 컴포넌트 모음입니다.', faq3q: 'Tailwind로 다크 모드를 어떻게 처리하나요?', faq3a: 'tailwind.config.ts에 darkMode: "class"를 추가하고 dark: 접두사를 사용합니다.', faq4q: '프로덕션에서 Tailwind 클래스 퍼지를 방지하려면?', faq4a: 'tailwind.config.ts의 content 배열에 Tailwind 클래스를 사용하는 모든 파일을 포함시키세요.', faq5q: 'Tailwind가 디자인 시스템에 적합한가요?', faq5a: '네, 하지만 규율이 필요합니다. CSS 변수를 이용한 디자인 토큰을 사용하세요.', relatedTitle: '관련 도구' },
  pt: { title: 'Padrões de componentes Tailwind CSS: UI reutilizável sem caos CSS', intro: 'A abordagem utility-first do Tailwind CSS pode levar a JSX inchado se não for organizado corretamente.', cvaTitle: 'class-variance-authority (cva): variantes com tipos', cvaDesc: 'cva é a forma padrão de gerenciar variantes de componentes no Tailwind.', applyTitle: 'Quando usar @apply', applyDesc: '@apply extrai combinações de classes Tailwind repetidas em classes CSS.', cnTitle: 'O utilitário cn(): mesclar classes com segurança', cnDesc: 'clsx lida com classes condicionais, tailwind-merge resolve conflitos do Tailwind.', headlessTitle: 'Headless UI: componentes interativos acessíveis', headlessDesc: 'Headless UI fornece componentes interativos acessíveis sem estilo.', configTitle: 'Configuração Tailwind: design tokens e temas', configDesc: 'Estender Tailwind com variáveis CSS permite troca de temas sem JavaScript.', comparisonTitle: 'Abordagens de bibliotecas de componentes', bestPracticesTitle: 'Boas práticas', bp1: 'Usar cva para qualquer componente com 2+ variantes.', bp2: 'Sempre usar cn() para mesclar classes.', bp3: 'Evitar @apply para componentes.', bp4: 'Design tokens via variáveis CSS para dark mode.', bp5: 'Para dropdowns, modais — usar Headless UI ou Radix UI.', faqTitle: 'Perguntas frequentes', faq1q: 'Tailwind ou CSS-in-JS?', faq1a: 'Em 2026, Tailwind + CVA + shadcn/ui é o padrão dominante para novos projetos React.', faq2q: 'O que é shadcn/ui?', faq2a: 'shadcn/ui é uma coleção de componentes copy-paste construídos com Radix UI + Tailwind + CVA.', faq3q: 'Como lidar com dark mode no Tailwind?', faq3a: 'Adicionar darkMode: "class" no tailwind.config.ts e usar o prefixo dark:.', faq4q: 'Como prevenir a purga de classes Tailwind em produção?', faq4a: 'Configurar o array content no tailwind.config.ts para incluir todos os arquivos.', faq5q: 'O Tailwind é bom para sistemas de design?', faq5a: 'Sim, mas requer disciplina. Usar design tokens (variáveis CSS).', relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'Pattern di componenti Tailwind CSS: UI riutilizzabile senza caos CSS', intro: 'L\'approccio utility-first di Tailwind CSS può portare a JSX gonfio se non organizzato correttamente.', cvaTitle: 'class-variance-authority (cva): varianti type-safe', cvaDesc: 'cva è il modo standard per gestire le varianti dei componenti in Tailwind.', applyTitle: 'Quando usare @apply', applyDesc: '@apply estrae combinazioni ripetute di classi Tailwind in classi CSS.', cnTitle: 'L\'utilità cn(): unire classi in sicurezza', cnDesc: 'clsx gestisce classi condizionali, tailwind-merge risolve i conflitti Tailwind.', headlessTitle: 'Headless UI: componenti interattivi accessibili', headlessDesc: 'Headless UI fornisce componenti interattivi accessibili senza stili.', configTitle: 'Configurazione Tailwind: design token e temi', configDesc: 'Estendere Tailwind con variabili CSS permette di cambiare tema senza JavaScript.', comparisonTitle: 'Approcci alle librerie di componenti', bestPracticesTitle: 'Best practice', bp1: 'Usare cva per qualsiasi componente con 2+ varianti.', bp2: 'Usare sempre cn() per unire le classi.', bp3: 'Evitare @apply per i componenti.', bp4: 'Design token via variabili CSS per dark mode.', bp5: 'Per dropdown, modal — usare Headless UI o Radix UI.', faqTitle: 'FAQ', faq1q: 'Tailwind o CSS-in-JS?', faq1a: 'Nel 2026, Tailwind + CVA + shadcn/ui è il pattern dominante per nuovi progetti React.', faq2q: 'Cos\'è shadcn/ui?', faq2a: 'shadcn/ui è una raccolta di componenti copy-paste costruiti con Radix UI + Tailwind + CVA.', faq3q: 'Come gestire il dark mode con Tailwind?', faq3a: 'Aggiungere darkMode: "class" in tailwind.config.ts e usare il prefisso dark:.', faq4q: 'Come prevenire il purging delle classi Tailwind in produzione?', faq4a: 'Configurare l\'array content in tailwind.config.ts per includere tutti i file.', faq5q: 'Tailwind è buono per i design system?', faq5a: 'Sì, ma richiede disciplina. Usare design token (variabili CSS).', relatedTitle: 'Strumenti correlati' },
  nl: { title: 'Tailwind CSS componentpatronen: herbruikbare UI zonder CSS-chaos', intro: 'De utility-first aanpak van Tailwind CSS kan leiden tot opgezwollen JSX als het niet goed georganiseerd is.', cvaTitle: 'class-variance-authority (cva): typeveilige varianten', cvaDesc: 'cva is de standaard manier om componentvarianten in Tailwind te beheren.', applyTitle: 'Wanneer @apply gebruiken', applyDesc: '@apply extraheert herhaalde Tailwind-klassencombinaties in CSS-klassen.', cnTitle: 'Het cn()-hulpprogramma: klassen veilig samenvoegen', cnDesc: 'clsx verwerkt voorwaardelijke klassen, tailwind-merge lost Tailwind-conflicten op.', headlessTitle: 'Headless UI: toegankelijke interactieve componenten', headlessDesc: 'Headless UI biedt volledig toegankelijke interactieve componenten zonder styling.', configTitle: 'Tailwind-configuratie: designtokens en thema\'s', configDesc: 'Tailwind uitbreiden met CSS-variabelen maakt themawisseling zonder JavaScript mogelijk.', comparisonTitle: 'Componentbibliotheekbenaderingen', bestPracticesTitle: 'Best practices', bp1: 'cva gebruiken voor elke component met 2+ varianten.', bp2: 'Altijd cn() gebruiken om klassen samen te voegen.', bp3: '@apply vermijden voor componenten.', bp4: 'Designtokens via CSS-variabelen voor dark mode.', bp5: 'Voor dropdowns, modals — Headless UI of Radix UI gebruiken.', faqTitle: 'Veelgestelde vragen', faq1q: 'Tailwind of CSS-in-JS?', faq1a: 'In 2026 is Tailwind + CVA + shadcn/ui het dominante patroon voor nieuwe React-projecten.', faq2q: 'Wat is shadcn/ui?', faq2a: 'shadcn/ui is een verzameling copy-paste componenten gebouwd met Radix UI + Tailwind + CVA.', faq3q: 'Hoe omgaan met dark mode in Tailwind?', faq3a: 'darkMode: "class" toevoegen aan tailwind.config.ts en het dark:-voorvoegsel gebruiken.', faq4q: 'Hoe Tailwind-klassen purgen in productie voorkomen?', faq4a: 'De content-array in tailwind.config.ts configureren om alle bestanden met Tailwind-klassen op te nemen.', faq5q: 'Is Tailwind goed voor ontwerpsystemen?', faq5a: 'Ja, maar vereist discipline. Designtokens (CSS-variabelen) gebruiken.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Wzorce komponentów Tailwind CSS: wielokrotnego użytku UI bez chaosu CSS', intro: 'Podejście utility-first Tailwind CSS może prowadzić do rozdętego JSX, jeśli nie jest odpowiednio zorganizowane.', cvaTitle: 'class-variance-authority (cva): warianty z typami', cvaDesc: 'cva to standardowy sposób zarządzania wariantami komponentów w Tailwind.', applyTitle: 'Kiedy używać @apply', applyDesc: '@apply wyodrębnia powtarzające się kombinacje klas Tailwind do klas CSS.', cnTitle: 'Narzędzie cn(): bezpieczne łączenie klas', cnDesc: 'clsx obsługuje warunkowe klasy, tailwind-merge rozwiązuje konflikty Tailwind.', headlessTitle: 'Headless UI: dostępne komponenty interaktywne', headlessDesc: 'Headless UI dostarcza w pełni dostępne komponenty interaktywne bez stylów.', configTitle: 'Konfiguracja Tailwind: tokeny projektowe i motywy', configDesc: 'Rozszerzenie Tailwind zmiennymi CSS umożliwia zmianę motywu bez JavaScript.', comparisonTitle: 'Podejścia do bibliotek komponentów', bestPracticesTitle: 'Najlepsze praktyki', bp1: 'Używać cva dla każdego komponentu z 2+ wariantami.', bp2: 'Zawsze używać cn() do łączenia klas.', bp3: 'Unikać @apply dla komponentów.', bp4: 'Tokeny projektowe przez zmienne CSS dla dark mode.', bp5: 'Dla dropdownów, modali — używać Headless UI lub Radix UI.', faqTitle: 'FAQ', faq1q: 'Tailwind czy CSS-in-JS?', faq1a: 'W 2026 Tailwind + CVA + shadcn/ui to dominujący wzorzec dla nowych projektów React.', faq2q: 'Co to jest shadcn/ui?', faq2a: 'shadcn/ui to kolekcja komponentów copy-paste zbudowanych z Radix UI + Tailwind + CVA.', faq3q: 'Jak obsługiwać dark mode z Tailwind?', faq3a: 'Dodać darkMode: "class" do tailwind.config.ts i używać prefiksu dark:.', faq4q: 'Jak zapobiec usuwaniu klas Tailwind w produkcji?', faq4a: 'Skonfigurować tablicę content w tailwind.config.ts, aby zawierała wszystkie pliki.', faq5q: 'Czy Tailwind nadaje się do systemów projektowania?', faq5a: 'Tak, ale wymaga dyscypliny. Używać tokenów projektowych (zmiennych CSS).', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'Tailwind CSS komponentmönster: återanvändbart UI utan CSS-kaos', intro: 'Tailwind CSS utility-first-ansats kan leda till uppsvällt JSX om det inte är korrekt organiserat.', cvaTitle: 'class-variance-authority (cva): typsäkra varianter', cvaDesc: 'cva är standardsättet att hantera komponentvarianter i Tailwind.', applyTitle: 'När du ska använda @apply', applyDesc: '@apply extraherar upprepade Tailwind-klasskombinat till CSS-klasser.', cnTitle: 'Hjälpprogrammet cn(): slå samman klasser säkert', cnDesc: 'clsx hanterar villkorliga klasser, tailwind-merge löser Tailwind-konflikter.', headlessTitle: 'Headless UI: tillgängliga interaktiva komponenter', headlessDesc: 'Headless UI ger helt tillgängliga interaktiva komponenter utan stilering.', configTitle: 'Tailwind-konfiguration: designtokens och teman', configDesc: 'Att utöka Tailwind med CSS-variabler möjliggör temaväxling utan JavaScript.', comparisonTitle: 'Biblioteksmetoder för komponenter', bestPracticesTitle: 'Bästa praxis', bp1: 'Använd cva för alla komponenter med 2+ varianter.', bp2: 'Använd alltid cn() för att slå samman klasser.', bp3: 'Undvik @apply för komponenter.', bp4: 'Designtokens via CSS-variabler för dark mode.', bp5: 'För rullgardinsmenyer, modaler — använd Headless UI eller Radix UI.', faqTitle: 'Vanliga frågor', faq1q: 'Tailwind eller CSS-in-JS?', faq1a: '2026 är Tailwind + CVA + shadcn/ui det dominerande mönstret för nya React-projekt.', faq2q: 'Vad är shadcn/ui?', faq2a: 'shadcn/ui är en samling copy-paste-komponenter byggda med Radix UI + Tailwind + CVA.', faq3q: 'Hur hanterar man dark mode med Tailwind?', faq3a: 'Lägg till darkMode: "class" i tailwind.config.ts och använd dark:-prefixet.', faq4q: 'Hur förhindrar man Tailwind-klasspurging i produktion?', faq4a: 'Konfigurera content-arrayen i tailwind.config.ts för att inkludera alla filer med Tailwind-klasser.', faq5q: 'Är Tailwind bra för designsystem?', faq5a: 'Ja, men det kräver disciplin. Använd designtokens (CSS-variabler).', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Tailwind CSS komponentmønstre: gjenbrukbart UI uten CSS-kaos', intro: 'Tailwind CSS utility-first-tilnærming kan føre til oppblåst JSX hvis det ikke er riktig organisert.', cvaTitle: 'class-variance-authority (cva): typesikre varianter', cvaDesc: 'cva er standardmåten å administrere komponentvarianter i Tailwind.', applyTitle: 'Når bruke @apply', applyDesc: '@apply trekker ut gjentatte Tailwind-klasse-kombinasjoner til CSS-klasser.', cnTitle: 'Hjelpeprogrammet cn(): slå sammen klasser trygt', cnDesc: 'clsx håndterer betingede klasser, tailwind-merge løser Tailwind-konflikter.', headlessTitle: 'Headless UI: tilgjengelige interaktive komponenter', headlessDesc: 'Headless UI gir fullt tilgjengelige interaktive komponenter uten styling.', configTitle: 'Tailwind-konfigurasjon: designtokens og temaer', configDesc: 'Å utvide Tailwind med CSS-variabler muliggjør temabytte uten JavaScript.', comparisonTitle: 'Bibliotektilnærminger for komponenter', bestPracticesTitle: 'Beste praksis', bp1: 'Bruke cva for alle komponenter med 2+ varianter.', bp2: 'Alltid bruke cn() for å slå sammen klasser.', bp3: 'Unngå @apply for komponenter.', bp4: 'Designtokens via CSS-variabler for dark mode.', bp5: 'For dropdowns, modaler — bruke Headless UI eller Radix UI.', faqTitle: 'Ofte stilte spørsmål', faq1q: 'Tailwind eller CSS-in-JS?', faq1a: 'I 2026 er Tailwind + CVA + shadcn/ui det dominerende mønsteret for nye React-prosjekter.', faq2q: 'Hva er shadcn/ui?', faq2a: 'shadcn/ui er en samling copy-paste komponenter bygget med Radix UI + Tailwind + CVA.', faq3q: 'Hvordan håndtere dark mode med Tailwind?', faq3a: 'Legge til darkMode: "class" i tailwind.config.ts og bruke dark:-prefikset.', faq4q: 'Hvordan forhindre Tailwind-klasse purging i produksjon?', faq4a: 'Konfigurere content-arrayen i tailwind.config.ts for å inkludere alle filer.', faq5q: 'Er Tailwind bra for designsystemer?', faq5a: 'Ja, men krever disiplin. Bruke designtokens (CSS-variabler).', relatedTitle: 'Relaterte verktøy' },
  id: { title: 'Pola Komponen Tailwind CSS: UI yang Dapat Digunakan Kembali Tanpa Kekacauan CSS', intro: 'Pendekatan utility-first Tailwind CSS dapat menyebabkan JSX yang membengkak jika tidak diatur dengan benar.', cvaTitle: 'class-variance-authority (cva): Varian Bertipe', cvaDesc: 'cva adalah cara standar untuk mengelola varian komponen di Tailwind.', applyTitle: 'Kapan Menggunakan @apply', applyDesc: '@apply mengekstrak kombinasi kelas Tailwind yang berulang ke kelas CSS.', cnTitle: 'Utilitas cn(): Menggabungkan Kelas dengan Aman', cnDesc: 'clsx menangani kelas kondisional, tailwind-merge menyelesaikan konflik Tailwind.', headlessTitle: 'Headless UI: Komponen Interaktif yang Dapat Diakses', headlessDesc: 'Headless UI menyediakan komponen interaktif yang sepenuhnya dapat diakses tanpa gaya.', configTitle: 'Konfigurasi Tailwind: Token Desain dan Tema', configDesc: 'Memperluas Tailwind dengan variabel CSS memungkinkan pergantian tema tanpa JavaScript.', comparisonTitle: 'Pendekatan Perpustakaan Komponen', bestPracticesTitle: 'Praktik Terbaik', bp1: 'Gunakan cva untuk setiap komponen dengan 2+ varian.', bp2: 'Selalu gunakan cn() untuk menggabungkan kelas.', bp3: 'Hindari @apply untuk komponen.', bp4: 'Token desain via variabel CSS untuk dark mode.', bp5: 'Untuk dropdown, modal — gunakan Headless UI atau Radix UI.', faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Tailwind atau CSS-in-JS?', faq1a: 'Di 2026, Tailwind + CVA + shadcn/ui adalah pola dominan untuk proyek React baru.', faq2q: 'Apa itu shadcn/ui?', faq2a: 'shadcn/ui adalah kumpulan komponen copy-paste yang dibangun dengan Radix UI + Tailwind + CVA.', faq3q: 'Bagaimana menangani dark mode dengan Tailwind?', faq3a: 'Tambahkan darkMode: "class" ke tailwind.config.ts dan gunakan prefiks dark:.', faq4q: 'Bagaimana mencegah purging kelas Tailwind di produksi?', faq4a: 'Konfigurasikan array content di tailwind.config.ts untuk menyertakan semua file.', faq5q: 'Apakah Tailwind baik untuk sistem desain?', faq5a: 'Ya, tetapi membutuhkan disiplin. Gunakan token desain (variabel CSS).', relatedTitle: 'Alat Terkait' },
  th: { title: 'รูปแบบ Tailwind CSS Component: UI ที่ใช้ซ้ำได้โดยไม่มี CSS Chaos', intro: 'แนวทาง utility-first ของ Tailwind CSS อาจทำให้ JSX บวมขึ้นหากไม่จัดการอย่างถูกต้อง', cvaTitle: 'class-variance-authority (cva): Variants ที่มีความปลอดภัยด้านประเภท', cvaDesc: 'cva คือวิธีมาตรฐานในการจัดการ variants ของ component ใน Tailwind', applyTitle: 'เมื่อใดควรใช้ @apply', applyDesc: '@apply ดึงกลุ่มคลาส Tailwind ที่ซ้ำกันออกมาเป็นคลาส CSS', cnTitle: 'ยูทิลิตี้ cn(): รวมคลาสอย่างปลอดภัย', cnDesc: 'clsx จัดการคลาสแบบมีเงื่อนไข tailwind-merge แก้ไขความขัดแย้งของ Tailwind', headlessTitle: 'Headless UI: Components ที่เข้าถึงได้', headlessDesc: 'Headless UI ให้ components แบบ interactive ที่เข้าถึงได้เต็มรูปแบบโดยไม่มีสไตล์', configTitle: 'การตั้งค่า Tailwind: Design Tokens และ Theming', configDesc: 'การขยาย Tailwind ด้วย CSS variables ช่วยให้สลับธีมได้โดยไม่ต้องใช้ JavaScript', comparisonTitle: 'แนวทางของ Component Library', bestPracticesTitle: 'แนวปฏิบัติที่ดีที่สุด', bp1: 'ใช้ cva สำหรับ component ที่มี 2+ variants', bp2: 'ใช้ cn() เสมอเพื่อรวมคลาส', bp3: 'หลีกเลี่ยง @apply สำหรับ components', bp4: 'Design tokens ผ่าน CSS variables สำหรับ dark mode', bp5: 'สำหรับ dropdown, modal ใช้ Headless UI หรือ Radix UI', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'ควรใช้ Tailwind หรือ CSS-in-JS?', faq1a: 'ในปี 2026 Tailwind + CVA + shadcn/ui คือรูปแบบที่นิยมสำหรับโปรเจ็กต์ React ใหม่', faq2q: 'shadcn/ui คืออะไร?', faq2a: 'shadcn/ui คือชุด components แบบ copy-paste ที่สร้างด้วย Radix UI + Tailwind + CVA', faq3q: 'จะจัดการ dark mode กับ Tailwind อย่างไร?', faq3a: 'เพิ่ม darkMode: "class" ใน tailwind.config.ts และใช้ prefix dark:', faq4q: 'จะป้องกันการ purge คลาส Tailwind ใน production ได้อย่างไร?', faq4a: 'ตั้งค่า array content ใน tailwind.config.ts ให้ครอบคลุมไฟล์ทั้งหมดที่ใช้ Tailwind', faq5q: 'Tailwind เหมาะกับ design system ไหม?', faq5a: 'ใช่ แต่ต้องมีวินัย ใช้ design tokens (CSS variables)', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function TailwindComponentPatterns({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

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

  const libraryRows = [
    { lib: 'shadcn/ui', approach: 'Copy-paste + Radix + CVA', ownership: 'You own the code', theming: 'CSS variables', a11y: 'Radix primitives' },
    { lib: 'Chakra UI', approach: 'Component library', ownership: 'npm dependency', theming: 'Theme object', a11y: 'Built-in' },
    { lib: 'MUI (Material)', approach: 'Component library', ownership: 'npm dependency', theming: 'Theme provider', a11y: 'Built-in' },
    { lib: 'Mantine', approach: 'Component library', ownership: 'npm dependency', theming: 'CSS variables', a11y: 'Built-in' },
    { lib: 'DaisyUI', approach: 'Tailwind plugin', ownership: 'Config only', theming: 'CSS variables', a11y: 'Manual' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.cvaTitle}</h2>
      <p>{t.cvaDesc}</p>
      <pre style={preStyle}><code>{codeVariants}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.applyTitle}</h2>
      <p>{t.applyDesc}</p>
      <pre style={preStyle}><code>{codeApply}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.cnTitle}</h2>
      <p>{t.cnDesc}</p>
      <pre style={preStyle}><code>{codeCnUtil}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.headlessTitle}</h2>
      <p>{t.headlessDesc}</p>
      <pre style={preStyle}><code>{codeHeadless}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.configTitle}</h2>
      <p>{t.configDesc}</p>
      <pre style={preStyle}><code>{codeTailwindConfig}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Library', 'Approach', 'Code Ownership', 'Theming', 'Accessibility'].map(h => (
                <th key={h} style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {libraryRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 600 }}>{row.lib}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.approach}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.ownership}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.theming}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.a11y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[[t.faq1q, t.faq1a],[t.faq2q, t.faq2a],[t.faq3q, t.faq3a],[t.faq4q, t.faq4a],[t.faq5q, t.faq5a]].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/css-minifier" style={{ color: '#3182ce' }}>CSS Minifier</a></li>
          <li><a href="/en/tools/color-converter" style={{ color: '#3182ce' }}>Color Converter</a></li>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
        </ul>
      </div>
    </article>
  );
}
