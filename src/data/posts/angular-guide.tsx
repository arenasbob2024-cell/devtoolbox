'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Angular Guide: Complete Tutorial for TypeScript-First Frontend Development (Angular 17+)',
    description: 'A comprehensive Angular guide covering components, directives, services, dependency injection, reactive forms, RxJS observables, routing, NgRx state management, and Angular vs React vs Vue comparison with real TypeScript code examples.',
    tldr: 'Angular is a complete, opinionated TypeScript-first frontend framework maintained by Google. Unlike React (a library) or Vue (a progressive framework), Angular gives you everything out of the box: component system, two-way data binding, dependency injection, HTTP client, router, reactive forms, and a powerful CLI. It has a steeper learning curve but excels in large enterprise applications where structure and consistency matter. Angular 17+ introduced standalone components, signals, and a new control flow syntax that dramatically simplify development.',
    keyTakeaway1: 'Angular is a full framework, not a library — it provides opinionated solutions for routing, forms, HTTP, testing, and state management without third-party decisions.',
    keyTakeaway2: 'Every Angular application is built from components — a component is a TypeScript class with a @Component decorator, a template, and optional styles.',
    keyTakeaway3: 'Dependency injection is central to Angular — services are singleton classes provided at module or root level, injected via constructor parameters.',
    keyTakeaway4: 'Use reactive forms (FormGroup/FormControl) over template-driven forms for complex scenarios — they are easier to test and provide synchronous access to form values.',
    keyTakeaway5: 'RxJS Observables power Angular — the async pipe handles subscriptions automatically, preventing memory leaks in templates.',
    keyTakeaway6: 'Standalone components (Angular 14+) eliminate the need for NgModule for most use cases, making Angular apps smaller and simpler to reason about.',
    intro: 'Angular is a battle-tested, TypeScript-first web application framework built and maintained by Google. First released as AngularJS in 2010 and completely rewritten as Angular 2 in 2016, it is now on version 17+ with a rapid release cadence of two major versions per year. Angular is the framework of choice for large enterprise applications at companies like Google, Microsoft, IBM, and many Fortune 500 firms. Its opinionated nature — enforcing TypeScript, providing a complete toolchain, and mandating architectural patterns — makes it ideal for large teams where consistency and maintainability are critical. This guide covers everything you need to know, from components and directives to NgRx state management and the latest Angular 17+ features.',
    h2WhatIsAngular: 'What is Angular? The Full-Framework Philosophy',
    whatIsDesc: 'Angular differs fundamentally from React and Vue in its design philosophy. React is a UI rendering library — you compose it with third-party tools for routing (React Router), state (Redux/Zustand), and HTTP (Axios/fetch). Vue is a progressive framework that starts simple and scales up. Angular is a complete, batteries-included framework: it ships with a router, HTTP client, reactive forms, animation system, internationalization, testing utilities, and a CLI. This means more initial complexity but less decision fatigue and more consistency across large codebases.',
    h3AngularCLI: 'Angular CLI: The Essential Toolchain',
    cliDesc: 'The Angular CLI (@angular/cli) is the primary way to create, build, test, and deploy Angular applications. It provides code generation (ng generate), a development server with hot module replacement, optimized production builds with tree shaking and differential loading, unit test runner (Karma/Jest), and end-to-end test runner (Cypress/Playwright).',
    h3TypeScriptFirst: 'TypeScript-First Architecture',
    typescriptDesc: 'Angular was designed from scratch with TypeScript in mind. Type safety is not optional — Angular relies on TypeScript decorators (@Component, @Injectable, @Input, @Output) for its metadata system. The Angular compiler (Ivy) performs ahead-of-time (AOT) compilation, converting TypeScript and templates into optimized JavaScript before the browser runs them. This enables better error detection at build time, smaller bundle sizes, and faster runtime performance.',
    h2Components: 'Angular Components: The Building Blocks',
    componentsDesc: 'A component is the fundamental building block of an Angular application. Every visible element in Angular is a component. A component consists of three parts: a TypeScript class that defines logic and data, an HTML template that defines the view, and CSS/SCSS styles that define the appearance. Components are decorated with @Component, which provides Angular with the metadata it needs to create and render the component.',
    h3DataBinding: 'Data Binding: Four Types',
    dataBindingDesc: 'Angular supports four types of data binding that connect the component class to the template. Interpolation ({{ }}) renders class properties as text. Property binding ([property]="expression") sets DOM or component properties. Event binding ((event)="handler()") responds to user actions. Two-way binding ([(ngModel)]="property") combines property and event binding to keep the view and model in sync — this requires importing FormsModule.',
    h3ComponentInputOutput: 'Component Communication: @Input and @Output',
    inputOutputDesc: 'Parent and child components communicate through @Input and @Output decorators. @Input allows a parent to pass data down to a child component via property binding. @Output paired with EventEmitter allows a child to emit events that the parent can listen to. This creates a clear, unidirectional data flow pattern that is easy to test and reason about.',
    h3Lifecycle: 'Component Lifecycle Hooks',
    lifecycleDesc: 'Angular components have a defined lifecycle managed by Angular. The key hooks are: ngOnChanges (called when input properties change), ngOnInit (called once after first ngOnChanges — use for initialization logic), ngDoCheck (custom change detection), ngAfterContentInit (after content projection), ngAfterViewInit (after view and child views are initialized), and ngOnDestroy (cleanup before component is destroyed — unsubscribe here to prevent memory leaks).',
    h2Directives: 'Angular Directives: Extending HTML',
    directivesDesc: 'Directives are classes that add behavior to DOM elements. Angular has three types: components (directives with templates), structural directives (change DOM layout by adding/removing elements), and attribute directives (change appearance or behavior of an element). Built-in directives cover the most common use cases, but you can create custom directives for reusable behavior.',
    h3StructuralDirectives: 'Structural Directives: ngIf, ngFor, ngSwitch',
    structuralDesc: 'Structural directives manipulate the DOM structure. The asterisk (*) prefix is syntactic sugar that Angular expands into a longer form. *ngIf conditionally includes/excludes elements, *ngFor iterates over a collection and stamps out a template for each item, and *ngSwitch switches among a set of views based on a condition. In Angular 17+, the new control flow syntax (@if, @for, @switch) replaces these with a more readable, type-safe alternative.',
    h3AttributeDirectives: 'Attribute Directives: ngClass, ngStyle, Custom',
    attributeDesc: 'Attribute directives modify the appearance or behavior of elements without changing the DOM structure. ngClass dynamically adds or removes CSS classes, ngStyle dynamically sets inline styles. Custom attribute directives use the @Directive decorator and can access the host element via ElementRef and listen to host events with @HostListener.',
    h3CustomDirectives: 'Creating Custom Directives',
    customDirectiveDesc: 'Custom directives are created with the @Directive decorator. They receive the host ElementRef for direct DOM manipulation and can accept @Input properties to configure behavior. The @HostListener decorator binds to host element events. The @HostBinding decorator binds to host element properties or attributes. Custom directives are powerful for reusable behaviors like auto-focus, highlight on hover, drag-and-drop, and input masking.',
    h2Services: 'Services and Dependency Injection',
    servicesDesc: 'Services are singleton classes in Angular that encapsulate business logic, data access, and shared functionality. They follow the Single Responsibility Principle: components handle UI, services handle everything else. The Angular dependency injection (DI) system automatically provides service instances to classes that need them via constructor injection.',
    h3Injectable: '@Injectable and the DI System',
    injectableDesc: 'Services are decorated with @Injectable. The providedIn property determines the injection scope. providedIn: "root" creates a singleton available application-wide (the most common choice). providedIn: "any" creates a separate instance per lazy-loaded module. Providing in a specific module creates a scoped singleton. Angular 14+ supports the inject() function as an alternative to constructor injection, enabling dependency injection in standalone functions.',
    h3SingletonPattern: 'The Singleton Pattern and Service State',
    singletonDesc: 'When a service is provided in root, Angular creates exactly one instance for the entire application lifecycle. This makes services ideal for shared state (user authentication status, shopping cart, application settings), caching HTTP responses, and cross-component communication via RxJS Subjects. Be careful not to store UI state in root-provided services — prefer component-level or feature-level services for component-specific data.',
    h3HTTPClient: 'HttpClient: Making API Calls',
    httpClientDesc: 'Angular provides HttpClient in @angular/common/http for making HTTP requests. It returns Observables (not Promises), integrates with Angular change detection, supports interceptors for cross-cutting concerns (auth headers, error handling, logging), and provides type-safe responses with generics. Import HttpClientModule in AppModule or use provideHttpClient() in standalone bootstrapping.',
    h2ReactiveForms: 'Reactive Forms and Template-Driven Forms',
    formsDesc: 'Angular provides two approaches to building forms. Template-driven forms use NgModel directives in the template and are simpler for basic use cases but harder to test and validate. Reactive forms (also called model-driven forms) define the form structure in the component class using FormGroup and FormControl — they are the recommended approach for any form with complex validation, dynamic fields, or that needs to be unit tested.',
    h3FormGroupControl: 'FormGroup and FormControl',
    formGroupDesc: 'A reactive form is built from a tree of FormGroup and FormControl instances. FormControl tracks the value and validation status of an individual input. FormGroup tracks the value and validity of a group of controls as a whole. FormArray manages an array of controls. The FormBuilder service provides convenient shorthand syntax for creating these programmatically. Each control tracks its dirty, pristine, touched, untouched, valid, and invalid states.',
    h3Validators: 'Built-in and Custom Validators',
    validatorsDesc: 'Angular provides built-in validators: Validators.required, Validators.minLength(n), Validators.maxLength(n), Validators.email, Validators.pattern(regexp), and Validators.min/max for numeric values. Multiple validators can be combined in an array. For async validation (e.g., checking if a username is taken via API), use async validators that return an Observable or Promise. Cross-field validation is done at the FormGroup level using custom validator functions.',
    h3FormSubmission: 'Form Submission and Error Display',
    formSubmissionDesc: 'Handle form submission with (ngSubmit) on the form element. Check form.valid before processing. Display validation errors by checking control.errors and control.touched (to avoid showing errors before the user interacts). Angular 14+ introduced typed reactive forms — FormControl<string>, FormGroup<{email: FormControl<string>}> — providing full TypeScript type safety throughout the form.',
    h2RxJS: 'RxJS and Observables in Angular',
    rxjsDesc: 'RxJS (Reactive Extensions for JavaScript) is deeply integrated into Angular. HTTP requests, router events, form value changes, and the async pipe all use Observables. Understanding RxJS is essential for effective Angular development. Observables represent a stream of values over time and are lazy (nothing happens until you subscribe), cancelable (unlike Promises), and composable with operators.',
    h3AsyncPipe: 'The async Pipe: Automatic Subscription Management',
    asyncPipeDesc: 'The async pipe is one of Angular\'s most powerful features. It subscribes to an Observable or Promise in the template, automatically unsubscribes when the component is destroyed (preventing memory leaks), and triggers change detection when new values arrive. The pattern of exposing data as Observables from services and using async pipe in templates is the recommended Angular pattern — it keeps components lean and handles subscription lifecycle automatically.',
    h3RxJSOperators: 'Essential RxJS Operators',
    operatorsDesc: 'RxJS provides 100+ operators, but a few cover 90% of use cases. map transforms each emitted value. filter discards values that do not match a predicate. switchMap cancels the previous inner Observable and subscribes to a new one (ideal for search autocomplete: cancel previous HTTP request when new input arrives). mergeMap subscribes to inner Observables concurrently. combineLatest emits when any source emits, combining latest values. debounceTime delays emissions by a specified time, ignoring intermediate values (ideal for search inputs to avoid firing on every keystroke).',
    h3SubjectsAndBehaviorSubjects: 'Subjects and BehaviorSubjects for State',
    subjectsDesc: 'A Subject is both an Observable and an Observer — it can emit values and be subscribed to. A BehaviorSubject holds a current value and emits it immediately to new subscribers (ideal for current user state, theme settings). A ReplaySubject buffers a specified number of emissions and replays them to new subscribers. In services, expose Subjects as Observables (using .asObservable()) to prevent external code from calling next() directly.',
    h2Router: 'Angular Router: Navigation and Lazy Loading',
    routerDesc: 'The Angular Router enables navigation between views in a single-page application. Routes map URL paths to components. The router handles browser history, URL parameters, query parameters, route guards, and lazy loading of feature modules. Configure routes with RouterModule.forRoot() at the application level and RouterModule.forChild() in feature modules.',
    h3LazyLoading: 'Lazy Loading: Performance at Scale',
    lazyLoadingDesc: 'Lazy loading splits your application into separate JavaScript bundles loaded on demand when the user navigates to that route. This dramatically reduces initial bundle size and time-to-interactive. In Angular 17+, lazy loading is configured with loadComponent (for standalone components) or loadChildren (for route configuration files). The Angular CLI automatically handles code splitting. Preloading strategies (PreloadAllModules) can pre-load lazy modules in the background after the initial load.',
    h3RouteGuards: 'Route Guards: Protecting Routes',
    routeGuardsDesc: 'Route guards control navigation to and from routes. CanActivate prevents unauthorized navigation to a route (e.g., authentication check). CanDeactivate prevents leaving a route with unsaved changes. CanActivateChild guards child routes. Resolve pre-fetches data before a route activates, eliminating loading states in the component. In Angular 15+, guards are functions (not classes) using the inject() function for dependencies, making them simpler to write and test.',
    h3ActivatedRoute: 'ActivatedRoute: Reading URL Parameters',
    activatedRouteDesc: 'ActivatedRoute provides access to route information: URL parameters (route.params or route.paramMap), query parameters (route.queryParams or route.queryParamMap), route data (route.data), and URL segments (route.url). All are exposed as Observables — subscribe to handle navigation between the same component with different parameters. Use snapshot for one-time access when you only need the initial value.',
    h2StateManagement: 'State Management: NgRx and the Store Pattern',
    stateDesc: 'For complex applications, component @Input/@Output communication and services with Subjects become difficult to manage. NgRx (inspired by Redux) provides a predictable state container: a single immutable store, actions that describe state changes, reducers that compute new state from actions, selectors that derive data from the store, and effects that handle side effects (HTTP calls). This pattern makes state changes explicit, traceable, and testable.',
    h3NgRxActions: 'NgRx Actions and Reducers',
    actionsDesc: 'Actions are simple objects with a type string describing what happened (e.g., "[Product List] Load Products", "[Cart] Add Item"). They can carry a payload. The createAction function creates type-safe action creators. Reducers are pure functions that take the current state and an action and return a new state — never mutate the existing state. The createReducer function with on() handles specific actions. The initial state defines the state shape and default values.',
    h3NgRxSelectors: 'Selectors: Derived State',
    selectorsDesc: 'Selectors are pure functions that select, derive, and memoize state. createSelector combines multiple selectors and memoizes the result — the projector function only re-runs when input selectors produce new values. This makes selectors very efficient even in complex applications. Select state in components with store.select(mySelector), which returns an Observable that emits when the selected state changes. Compose selectors for maximum reuse.',
    h3NgRxEffects: 'NgRx Effects: Side Effects',
    effectsDesc: 'Effects handle asynchronous side effects (HTTP calls, localStorage, timers) triggered by actions. An effect listens for specific actions using Actions and ofType(), performs the side effect, and dispatches a success or failure action. Effects keep reducers pure and components free from async logic. The createEffect function wraps the effect Observable and handles error recovery with catchError to prevent the effect from dying on error.',
    h2Comparison: 'Angular vs React vs Vue: Framework Comparison',
    comparisonDesc: 'Choosing a frontend framework depends on your team size, project complexity, and organizational needs. Here is a detailed comparison of Angular, React, and Vue across critical dimensions.',
    h2Angular17Features: 'Angular 17+ New Features',
    angular17Desc: 'Angular 17 (released November 2023) introduced the most significant developer experience improvements since Angular 2. The new control flow syntax (@if, @for, @switch) built into the template compiler replaces *ngIf and *ngFor with better performance and type safety. Standalone components are now the default — NgModule is optional. Signals provide a new, fine-grained reactivity primitive that integrates with Angular change detection. The new application builder (Vite + esbuild) delivers 87% faster build times.',
    h3Signals: 'Angular Signals: Fine-Grained Reactivity',
    signalsDesc: 'Signals (Angular 16+) are reactive primitives that track dependencies automatically. A signal holds a value and notifies consumers when it changes. signal() creates a writable signal, computed() creates a derived signal (like Vue\'s computed), and effect() runs side effects when signals change. Signals integrate with Angular\'s change detection, enabling fine-grained updates without Zone.js in future versions. They are simpler to reason about than RxJS for synchronous state.',
    h3StandaloneComponents: 'Standalone Components',
    standaloneDesc: 'Standalone components (stable in Angular 15, default in 17) do not require NgModule. The standalone: true flag in @Component allows direct importing of dependencies (other components, pipes, directives) in the imports array. bootstrapApplication() replaces platformBrowserDynamic().bootstrapModule() for the root application. Standalone APIs make Angular apps smaller (no module boilerplate), easier to understand, and better for tree shaking.',
    h2FAQ: 'Frequently Asked Questions',
    faq1Q: 'Is Angular good for small projects?',
    faq1A: 'Angular has a steeper initial setup compared to React or Vue, making it potentially overkill for small projects or prototypes. The CLI, TypeScript requirement, and architectural patterns add complexity upfront. However, for projects expected to grow, starting with Angular\'s structure prevents painful refactoring later. Standalone components in Angular 17 significantly reduce boilerplate. For truly small projects (landing pages, simple SPAs), React or Vue may be a better fit.',
    faq2Q: 'What is the difference between Angular and AngularJS?',
    faq2A: 'AngularJS (Angular 1.x) and Angular (2+) are completely different frameworks that share only the name. AngularJS was released in 2010 and uses JavaScript, a scope-based model, and two-way data binding with dirty checking. Angular 2 was a complete rewrite in 2016, using TypeScript, a component-based architecture, unidirectional data flow, ahead-of-time compilation, and a completely different API. AngularJS reached end of life in December 2021. When people say "Angular" today, they always mean Angular 2+.',
    faq3Q: 'How does Angular change detection work?',
    faq3A: 'Angular uses Zone.js to intercept asynchronous operations (setTimeout, HTTP calls, DOM events) and automatically trigger change detection. By default, Angular checks every component in the tree after any async operation. The OnPush change detection strategy optimizes this by only checking a component when its inputs change or an Observable emits via async pipe. Signals (Angular 16+) provide an even more granular reactivity model that can eventually replace Zone.js entirely (Angular is working toward "zoneless" mode).',
    faq4Q: 'What are standalone components in Angular 17?',
    faq4A: 'Standalone components are components that do not belong to any NgModule. Introduced as experimental in Angular 14 and stable in Angular 15, they became the default in Angular 17. With standalone: true in @Component, you import dependencies directly in the component\'s imports array instead of declaring them in a module. This eliminates the verbose NgModule pattern, reduces boilerplate, improves tree shaking, and makes components more self-contained and reusable.',
    faq5Q: 'When should I use NgRx vs Angular services for state?',
    faq5A: 'Use Angular services (with BehaviorSubject or Signals) for most applications. NgRx adds significant complexity (boilerplate, learning curve, additional dependencies) and is only worthwhile for large applications with complex shared state that multiple teams touch, state changes that need to be logged/debugged/time-traveled, or when the codebase needs to onboard many developers who benefit from predictable patterns. The NgRx team itself recommends starting without NgRx and adding it only when needed.',
    faq6Q: 'How do Angular Signals compare to RxJS?',
    faq6A: 'Signals and RxJS serve different purposes and are complementary, not replacements. Signals are synchronous reactive primitives designed for component state — they are simpler to learn and use for UI state that does not involve async operations. RxJS is powerful for complex async flows, event streams, and multi-step transformations (debounce, retry, race conditions). The Angular team provides interop between them: toSignal() converts an Observable to a Signal, toObservable() does the reverse.',
    faq7Q: 'What is tree shaking in Angular and why does it matter?',
    faq7A: 'Tree shaking is the process of eliminating dead code (unused exports) from the final bundle during build. Angular\'s Ivy compiler and the CLI\'s production build (using webpack or esbuild) perform aggressive tree shaking. Standalone components improve tree shaking over NgModules because they explicitly declare their dependencies, making it easier for the bundler to identify unused code. This results in smaller bundle sizes: a minimal standalone Angular app is now under 30KB gzipped.',
    faq8Q: 'What version of Angular should I use in 2024/2025?',
    faq8A: 'Use Angular 17 or 18 for new projects. Angular 17 introduced the new template control flow, standalone-by-default, the new application builder (Vite + esbuild), and the revamped angular.dev documentation. Angular 18 added zoneless change detection (experimental), built-in internationalization improvements, and Material 3 components. Angular follows a 6-month major release cycle with LTS support for 18 months after release, so Angular 16 and 17 are both in LTS as of 2024.',
  },
  zh: {
    title: 'Angular 完全指南：TypeScript 优先的前端开发教程（Angular 17+）',
    description: '全面的 Angular 指南，涵盖组件、指令、服务、依赖注入、响应式表单、RxJS Observable、路由、NgRx 状态管理，以及 Angular vs React vs Vue 对比，附真实 TypeScript 代码示例。',
    tldr: 'Angular 是由 Google 维护的完整、强约定 TypeScript 优先前端框架。与 React（库）或 Vue（渐进式框架）不同，Angular 开箱即用提供一切：组件系统、双向数据绑定、依赖注入、HTTP 客户端、路由器、响应式表单和强大的 CLI。学习曲线较陡，但在结构和一致性至关重要的大型企业应用中表现出色。Angular 17+ 引入了独立组件、信号和新的控制流语法，大幅简化了开发。',
    keyTakeaway1: 'Angular 是完整框架，而非库——它为路由、表单、HTTP、测试和状态管理提供有主见的解决方案，无需第三方决策。',
    keyTakeaway2: '每个 Angular 应用都由组件构建——组件是带有 @Component 装饰器、模板和可选样式的 TypeScript 类。',
    keyTakeaway3: '依赖注入是 Angular 的核心——服务是在模块或根级别提供的单例类，通过构造函数参数注入。',
    keyTakeaway4: '对于复杂场景，优先使用响应式表单（FormGroup/FormControl）而非模板驱动表单——它们更易于测试，并提供对表单值的同步访问。',
    keyTakeaway5: 'RxJS Observable 驱动 Angular——async 管道自动处理订阅，防止模板中的内存泄漏。',
    keyTakeaway6: '独立组件（Angular 14+）消除了大多数用例中对 NgModule 的需求，使 Angular 应用更小、更易于理解。',
    intro: 'Angular 是由 Google 构建和维护的经过实战检验的 TypeScript 优先 Web 应用框架。最初于 2010 年作为 AngularJS 发布，并于 2016 年作为 Angular 2 完全重写，现在已发展到 17+ 版本，每年发布两个主要版本。Angular 是 Google、Microsoft、IBM 和众多财富 500 强公司大型企业应用的首选框架。其强约定性——强制使用 TypeScript、提供完整工具链、要求架构模式——使其非常适合需要一致性和可维护性的大型团队。本指南涵盖从组件和指令到 NgRx 状态管理以及最新 Angular 17+ 特性的所有内容。',
    h2WhatIsAngular: 'Angular 是什么？完整框架理念',
    whatIsDesc: 'Angular 与 React 和 Vue 在设计理念上根本不同。React 是一个 UI 渲染库——你需要用第三方工具来组合路由（React Router）、状态（Redux/Zustand）和 HTTP（Axios/fetch）。Vue 是一个渐进式框架，从简单开始逐步扩展。Angular 是一个完整的、内置电池的框架：它附带路由器、HTTP 客户端、响应式表单、动画系统、国际化、测试工具和 CLI。这意味着初始复杂性更高，但在大型代码库中决策疲劳更少，一致性更强。',
    h3AngularCLI: 'Angular CLI：核心工具链',
    cliDesc: 'Angular CLI（@angular/cli）是创建、构建、测试和部署 Angular 应用的主要方式。它提供代码生成（ng generate）、带热模块替换的开发服务器、带树摇和差异加载的优化生产构建、单元测试运行器（Karma/Jest）和端到端测试运行器（Cypress/Playwright）。',
    h3TypeScriptFirst: 'TypeScript 优先架构',
    typescriptDesc: 'Angular 从零开始以 TypeScript 为核心设计。类型安全不是可选的——Angular 依赖 TypeScript 装饰器（@Component、@Injectable、@Input、@Output）进行元数据系统。Angular 编译器（Ivy）执行预先编译（AOT），在浏览器运行之前将 TypeScript 和模板转换为优化的 JavaScript。这使得在构建时能更好地检测错误，减小包大小，并提高运行时性能。',
    h2Components: 'Angular 组件：构建块',
    componentsDesc: '组件是 Angular 应用的基本构建块。Angular 中的每个可见元素都是一个组件。组件由三个部分组成：定义逻辑和数据的 TypeScript 类、定义视图的 HTML 模板以及定义外观的 CSS/SCSS 样式。组件用 @Component 装饰，它向 Angular 提供创建和渲染组件所需的元数据。',
    h3DataBinding: '数据绑定：四种类型',
    dataBindingDesc: 'Angular 支持将组件类连接到模板的四种数据绑定。插值（{{ }}）将类属性渲染为文本。属性绑定（[property]="expression"）设置 DOM 或组件属性。事件绑定（(event)="handler()"）响应用户操作。双向绑定（[(ngModel)]="property"）结合属性和事件绑定，保持视图和模型同步——这需要导入 FormsModule。',
    h3ComponentInputOutput: '组件通信：@Input 和 @Output',
    inputOutputDesc: '父组件和子组件通过 @Input 和 @Output 装饰器进行通信。@Input 允许父组件通过属性绑定向子组件传递数据。@Output 与 EventEmitter 配对允许子组件发出父组件可以监听的事件。这创建了清晰的单向数据流模式，易于测试和理解。',
    h3Lifecycle: '组件生命周期钩子',
    lifecycleDesc: 'Angular 组件具有由 Angular 管理的定义生命周期。关键钩子有：ngOnChanges（输入属性变化时调用）、ngOnInit（第一次 ngOnChanges 后调用一次——用于初始化逻辑）、ngDoCheck（自定义变更检测）、ngAfterContentInit（内容投影后）、ngAfterViewInit（视图和子视图初始化后）和 ngOnDestroy（组件销毁前清理——在此处取消订阅以防止内存泄漏）。',
    h2Directives: 'Angular 指令：扩展 HTML',
    directivesDesc: '指令是向 DOM 元素添加行为的类。Angular 有三种类型：组件（带模板的指令）、结构指令（通过添加/删除元素改变 DOM 布局）和属性指令（改变元素的外观或行为）。内置指令涵盖了最常见的用例，但你可以创建自定义指令实现可复用行为。',
    h3StructuralDirectives: '结构指令：ngIf、ngFor、ngSwitch',
    structuralDesc: '结构指令操纵 DOM 结构。星号（*）前缀是 Angular 展开为更长形式的语法糖。*ngIf 有条件地包含/排除元素，*ngFor 遍历集合并为每个项目生成模板，*ngSwitch 根据条件在一组视图之间切换。在 Angular 17+ 中，新的控制流语法（@if、@for、@switch）以更好的性能和类型安全替代了这些指令。',
    h3AttributeDirectives: '属性指令：ngClass、ngStyle、自定义',
    attributeDesc: '属性指令修改元素的外观或行为，而不改变 DOM 结构。ngClass 动态添加或删除 CSS 类，ngStyle 动态设置内联样式。自定义属性指令使用 @Directive 装饰器，可以通过 ElementRef 访问宿主元素，并使用 @HostListener 监听宿主事件。',
    h3CustomDirectives: '创建自定义指令',
    customDirectiveDesc: '自定义指令用 @Directive 装饰器创建。它们接收宿主 ElementRef 进行直接 DOM 操作，可以接受 @Input 属性来配置行为。@HostListener 装饰器绑定到宿主元素事件。@HostBinding 装饰器绑定到宿主元素属性或特性。自定义指令非常适合自动聚焦、悬停高亮、拖放和输入掩码等可复用行为。',
    h2Services: '服务与依赖注入',
    servicesDesc: '服务是 Angular 中封装业务逻辑、数据访问和共享功能的单例类。它们遵循单一职责原则：组件处理 UI，服务处理其他一切。Angular 依赖注入（DI）系统通过构造函数注入自动向需要它们的类提供服务实例。',
    h3Injectable: '@Injectable 和 DI 系统',
    injectableDesc: '服务用 @Injectable 装饰。providedIn 属性确定注入范围。providedIn: "root" 创建全应用程序可用的单例（最常见的选择）。providedIn: "any" 为每个惰性加载模块创建单独的实例。在特定模块中提供会创建作用域单例。Angular 14+ 支持 inject() 函数作为构造函数注入的替代方案，允许在独立函数中进行依赖注入。',
    h3SingletonPattern: '单例模式与服务状态',
    singletonDesc: '当服务在根级别提供时，Angular 为整个应用程序生命周期创建恰好一个实例。这使服务非常适合共享状态（用户身份验证状态、购物车、应用程序设置）、缓存 HTTP 响应以及通过 RxJS Subject 进行跨组件通信。注意不要在根级别提供的服务中存储 UI 状态——对于组件特定数据，优先使用组件级或功能级服务。',
    h3HTTPClient: 'HttpClient：发起 API 调用',
    httpClientDesc: 'Angular 在 @angular/common/http 中提供 HttpClient 用于发起 HTTP 请求。它返回 Observable（而非 Promise），与 Angular 变更检测集成，支持拦截器处理横切关注点（认证头、错误处理、日志记录），并通过泛型提供类型安全的响应。在 AppModule 中导入 HttpClientModule 或在独立引导中使用 provideHttpClient()。',
    h2ReactiveForms: '响应式表单与模板驱动表单',
    formsDesc: 'Angular 提供两种构建表单的方法。模板驱动表单在模板中使用 NgModel 指令，对基本用例更简单但难以测试和验证。响应式表单（也称模型驱动表单）使用 FormGroup 和 FormControl 在组件类中定义表单结构——它们是任何具有复杂验证、动态字段或需要单元测试的表单的推荐方法。',
    h3FormGroupControl: 'FormGroup 和 FormControl',
    formGroupDesc: '响应式表单由 FormGroup 和 FormControl 实例树构建。FormControl 跟踪单个输入的值和验证状态。FormGroup 整体跟踪一组控件的值和有效性。FormArray 管理控件数组。FormBuilder 服务提供方便的简写语法以编程方式创建这些。每个控件跟踪其 dirty、pristine、touched、untouched、valid 和 invalid 状态。',
    h3Validators: '内置和自定义验证器',
    validatorsDesc: 'Angular 提供内置验证器：Validators.required、Validators.minLength(n)、Validators.maxLength(n)、Validators.email、Validators.pattern(regexp) 和用于数字值的 Validators.min/max。多个验证器可以组合在数组中。对于异步验证（例如，通过 API 检查用户名是否被占用），使用返回 Observable 或 Promise 的异步验证器。跨字段验证在 FormGroup 级别使用自定义验证器函数完成。',
    h3FormSubmission: '表单提交和错误显示',
    formSubmissionDesc: '在表单元素上使用 (ngSubmit) 处理表单提交。在处理之前检查 form.valid。通过检查 control.errors 和 control.touched 显示验证错误（以避免在用户交互之前显示错误）。Angular 14+ 引入了类型化响应式表单——FormControl<string>、FormGroup<{email: FormControl<string>}>——在整个表单中提供完整的 TypeScript 类型安全。',
    h2RxJS: 'Angular 中的 RxJS 和 Observable',
    rxjsDesc: 'RxJS（JavaScript 响应式扩展）深度集成到 Angular 中。HTTP 请求、路由器事件、表单值更改和 async 管道都使用 Observable。理解 RxJS 对于有效的 Angular 开发至关重要。Observable 表示随时间流动的值流，它是惰性的（在订阅之前什么都不会发生）、可取消的（与 Promise 不同）和可用运算符组合的。',
    h3AsyncPipe: 'async 管道：自动订阅管理',
    asyncPipeDesc: 'async 管道是 Angular 最强大的功能之一。它在模板中订阅 Observable 或 Promise，在组件销毁时自动取消订阅（防止内存泄漏），并在新值到达时触发变更检测。将数据作为 Observable 从服务中暴露并在模板中使用 async 管道的模式是推荐的 Angular 模式——它保持组件精简并自动处理订阅生命周期。',
    h3RxJSOperators: '核心 RxJS 运算符',
    operatorsDesc: 'RxJS 提供 100+ 个运算符，但少数几个涵盖了 90% 的用例。map 转换每个发出的值。filter 丢弃不匹配谓词的值。switchMap 取消之前的内部 Observable 并订阅新的（非常适合搜索自动完成：当新输入到达时取消之前的 HTTP 请求）。mergeMap 并发订阅内部 Observable。combineLatest 在任何源发出时发出，结合最新值。debounceTime 延迟发出指定时间，忽略中间值（非常适合搜索输入以避免每次击键都触发）。',
    h3SubjectsAndBehaviorSubjects: '用于状态的 Subject 和 BehaviorSubject',
    subjectsDesc: 'Subject 既是 Observable 又是 Observer——它可以发出值并被订阅。BehaviorSubject 保存当前值并立即向新订阅者发出它（非常适合当前用户状态、主题设置）。ReplaySubject 缓冲指定数量的发出内容并向新订阅者重放。在服务中，将 Subject 作为 Observable 暴露（使用 .asObservable()）以防止外部代码直接调用 next()。',
    h2Router: 'Angular 路由器：导航和惰性加载',
    routerDesc: 'Angular 路由器支持单页应用中视图之间的导航。路由将 URL 路径映射到组件。路由器处理浏览器历史、URL 参数、查询参数、路由守卫和功能模块的惰性加载。在应用程序级别使用 RouterModule.forRoot() 配置路由，在功能模块中使用 RouterModule.forChild()。',
    h3LazyLoading: '惰性加载：规模化性能',
    lazyLoadingDesc: '惰性加载将应用程序分割成单独的 JavaScript 包，在用户导航到该路由时按需加载。这大幅减少初始包大小和可交互时间。在 Angular 17+ 中，惰性加载使用 loadComponent（对于独立组件）或 loadChildren（对于路由配置文件）进行配置。Angular CLI 自动处理代码分割。预加载策略（PreloadAllModules）可以在初始加载后在后台预加载惰性模块。',
    h3RouteGuards: '路由守卫：保护路由',
    routeGuardsDesc: '路由守卫控制到路由和从路由的导航。CanActivate 防止未经授权导航到路由（例如，身份验证检查）。CanDeactivate 防止离开有未保存更改的路由。CanActivateChild 守护子路由。Resolve 在路由激活之前预取数据，消除组件中的加载状态。在 Angular 15+ 中，守卫是函数（非类），使用 inject() 函数处理依赖项，使其更简单易写和测试。',
    h3ActivatedRoute: 'ActivatedRoute：读取 URL 参数',
    activatedRouteDesc: 'ActivatedRoute 提供对路由信息的访问：URL 参数（route.params 或 route.paramMap）、查询参数（route.queryParams 或 route.queryParamMap）、路由数据（route.data）和 URL 片段（route.url）。所有这些都作为 Observable 暴露——订阅以处理使用不同参数在同一组件之间的导航。当你只需要初始值时，使用快照进行一次性访问。',
    h2StateManagement: '状态管理：NgRx 和存储模式',
    stateDesc: '对于复杂应用程序，组件 @Input/@Output 通信和带 Subject 的服务变得难以管理。NgRx（受 Redux 启发）提供可预测的状态容器：单一不可变存储、描述状态更改的动作、从动作计算新状态的 reducer、从存储派生数据的选择器，以及处理副作用（HTTP 调用）的效果。这种模式使状态更改明确、可追溯和可测试。',
    h3NgRxActions: 'NgRx 动作和 Reducer',
    actionsDesc: '动作是描述发生了什么的简单对象，带有类型字符串（例如，"[Product List] Load Products"、"[Cart] Add Item"）。它们可以携带载荷。createAction 函数创建类型安全的动作创建器。Reducer 是纯函数，接受当前状态和动作并返回新状态——永远不要改变现有状态。带有 on() 的 createReducer 函数处理特定动作。初始状态定义状态形状和默认值。',
    h3NgRxSelectors: '选择器：派生状态',
    selectorsDesc: '选择器是选择、派生和记忆状态的纯函数。createSelector 结合多个选择器并记忆结果——只有当输入选择器产生新值时，投影函数才会重新运行。这使选择器在复杂应用程序中也非常高效。在组件中使用 store.select(mySelector) 选择状态，它返回一个 Observable，当选定状态更改时发出。组合选择器以最大化重用。',
    h3NgRxEffects: 'NgRx 效果：副作用',
    effectsDesc: '效果处理由动作触发的异步副作用（HTTP 调用、localStorage、定时器）。效果使用 Actions 和 ofType() 监听特定动作，执行副作用，并调度成功或失败动作。效果保持 reducer 纯净，组件不含异步逻辑。createEffect 函数包装效果 Observable 并使用 catchError 处理错误恢复，以防止效果因错误而停止。',
    h2Comparison: 'Angular vs React vs Vue：框架对比',
    comparisonDesc: '选择前端框架取决于你的团队规模、项目复杂性和组织需求。以下是 Angular、React 和 Vue 在关键维度上的详细对比。',
    h2Angular17Features: 'Angular 17+ 新特性',
    angular17Desc: 'Angular 17（2023 年 11 月发布）引入了自 Angular 2 以来最重要的开发者体验改进。内置于模板编译器的新控制流语法（@if、@for、@switch）以更好的性能和类型安全替代了 *ngIf 和 *ngFor。独立组件现在是默认的——NgModule 是可选的。信号提供了与 Angular 变更检测集成的新的细粒度响应性原语。新的应用构建器（Vite + esbuild）提供了 87% 更快的构建时间。',
    h3Signals: 'Angular 信号：细粒度响应性',
    signalsDesc: '信号（Angular 16+）是自动跟踪依赖关系的响应性原语。信号保存一个值，并在值更改时通知消费者。signal() 创建可写信号，computed() 创建派生信号（类似 Vue 的计算属性），effect() 在信号更改时运行副作用。信号与 Angular 的变更检测集成，在未来版本中无需 Zone.js 即可实现细粒度更新。对于同步状态，它们比 RxJS 更易于理解。',
    h3StandaloneComponents: '独立组件',
    standaloneDesc: '独立组件（Angular 15 中稳定，17 中默认）不属于任何 NgModule。@Component 中的 standalone: true 标志允许在 imports 数组中直接导入依赖项（其他组件、管道、指令），而不是在模块中声明它们。bootstrapApplication() 取代 platformBrowserDynamic().bootstrapModule() 用于根应用程序。独立 API 使 Angular 应用更小（无模块样板代码）、更易于理解，并且更好地支持树摇。',
    h2FAQ: '常见问题',
    faq1Q: 'Angular 适合小型项目吗？',
    faq1A: '与 React 或 Vue 相比，Angular 的初始设置更复杂，对于小型项目或原型可能过于复杂。CLI、TypeScript 要求和架构模式在前期增加了复杂性。但是，对于预期会增长的项目，从 Angular 的结构开始可以避免后来痛苦的重构。Angular 17 中的独立组件显著减少了样板代码。对于真正的小型项目（落地页、简单 SPA），React 或 Vue 可能更合适。',
    faq2Q: 'Angular 和 AngularJS 有什么区别？',
    faq2A: 'AngularJS（Angular 1.x）和 Angular（2+）是完全不同的框架，只是共享名称。AngularJS 于 2010 年发布，使用 JavaScript、基于作用域的模型和带脏检查的双向数据绑定。Angular 2 于 2016 年完全重写，使用 TypeScript、基于组件的架构、单向数据流、预先编译和完全不同的 API。AngularJS 于 2021 年 12 月停止维护。今天人们说"Angular"时，总是指 Angular 2+。',
    faq3Q: 'Angular 变更检测是如何工作的？',
    faq3A: 'Angular 使用 Zone.js 拦截异步操作（setTimeout、HTTP 调用、DOM 事件）并自动触发变更检测。默认情况下，Angular 在任何异步操作后检查树中的每个组件。OnPush 变更检测策略通过仅在输入变化或 Observable 通过 async 管道发出时检查组件来优化这一点。信号（Angular 16+）提供了更细粒度的响应模型，最终可以完全替代 Zone.js（Angular 正在朝着"无 zone"模式努力）。',
    faq4Q: 'Angular 17 中的独立组件是什么？',
    faq4A: '独立组件是不属于任何 NgModule 的组件。在 Angular 14 中作为实验性功能引入，在 Angular 15 中稳定，在 Angular 17 中成为默认。在 @Component 中使用 standalone: true，你在组件的 imports 数组中直接导入依赖项，而不是在模块中声明它们。这消除了冗长的 NgModule 模式，减少了样板代码，改进了树摇，并使组件更加自包含和可复用。',
    faq5Q: '我应该何时使用 NgRx vs Angular 服务进行状态管理？',
    faq5A: '对于大多数应用程序，使用带有 BehaviorSubject 或信号的 Angular 服务。NgRx 增加了显著的复杂性（样板代码、学习曲线、额外依赖项），只有在以下情况才值得：具有多个团队接触的复杂共享状态的大型应用程序、需要记录/调试/时间旅行的状态更改，或者代码库需要让许多受益于可预测模式的开发人员加入。NgRx 团队本身建议在没有 NgRx 的情况下开始，只在需要时添加它。',
    faq6Q: 'Angular 信号与 RxJS 相比如何？',
    faq6A: '信号和 RxJS 服务于不同目的，是互补的，而非替代品。信号是为组件状态设计的同步响应性原语——对于不涉及异步操作的 UI 状态，它们更易于学习和使用。RxJS 对于复杂的异步流、事件流和多步转换（防抖、重试、竞争条件）非常强大。Angular 团队提供了它们之间的互操作：toSignal() 将 Observable 转换为信号，toObservable() 做相反的事情。',
    faq7Q: 'Angular 中的树摇是什么，为什么重要？',
    faq7A: '树摇是在构建期间从最终包中消除死代码（未使用的导出）的过程。Angular 的 Ivy 编译器和 CLI 的生产构建（使用 webpack 或 esbuild）执行积极的树摇。独立组件比 NgModules 更好地支持树摇，因为它们明确声明其依赖项，使打包器更容易识别未使用的代码。这导致更小的包大小：最小独立 Angular 应用现在压缩后不到 30KB。',
    faq8Q: '2024/2025 年应该使用哪个版本的 Angular？',
    faq8A: '新项目使用 Angular 17 或 18。Angular 17 引入了新的模板控制流、默认独立、新的应用构建器（Vite + esbuild）和重新设计的 angular.dev 文档。Angular 18 添加了无 zone 变更检测（实验性）、内置国际化改进和 Material 3 组件。Angular 遵循 6 个月主要发布周期，发布后 18 个月内提供 LTS 支持，因此截至 2024 年，Angular 16 和 17 都处于 LTS 中。',
  },
};

export default function AngularGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

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

  const codeStyle: React.CSSProperties = {
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    padding: '1.25rem 1.5rem',
    borderRadius: '0.5rem',
    overflowX: 'auto',
    fontSize: '0.84rem',
    lineHeight: '1.65',
    marginBottom: '1.5rem',
    display: 'block',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginTop: '2.5rem',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e2e8f0',
    color: '#0f172a',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginTop: '1.75rem',
    marginBottom: '0.75rem',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    marginBottom: '1rem',
    lineHeight: '1.8',
    color: '#334155',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1.5rem',
    fontSize: '0.875rem',
    overflowX: 'auto',
    display: 'block',
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontWeight: 600,
    borderBottom: '2px solid #334155',
    whiteSpace: 'nowrap',
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.65rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    verticalAlign: 'top',
    color: '#334155',
  };

  const tdAltStyle: React.CSSProperties = {
    ...tdStyle,
    backgroundColor: '#f8fafc',
  };

  const faqItemStyle: React.CSSProperties = {
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '1.25rem',
    marginBottom: '1.25rem',
  };

  return (
    <article style={{ maxWidth: 'none', lineHeight: '1.75' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{
        background: '#f0f9ff',
        borderLeft: '4px solid #0ea5e9',
        borderRadius: '0 0.5rem 0.5rem 0',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
      }}>
        <strong style={{ fontSize: '0.95rem', color: '#0369a1', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.75' }}>{t.tldr}</p>
      </div>

      {/* Introduction */}
      <p style={{ fontSize: '1.05rem', lineHeight: '1.85', marginBottom: '2rem', color: '#1e293b' }}>{t.intro}</p>

      {/* Key Takeaways */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '0.75rem',
        padding: '1.25rem 1.5rem',
        marginBottom: '2.5rem',
      }}>
        <strong style={{ fontSize: '1rem', display: 'block', marginBottom: '0.75rem', color: '#0f172a' }}>Key Takeaways</strong>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          {[t.keyTakeaway1, t.keyTakeaway2, t.keyTakeaway3, t.keyTakeaway4, t.keyTakeaway5, t.keyTakeaway6].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', color: '#334155', lineHeight: '1.7' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ── Section 1: What is Angular ── */}
      <h2 style={h2Style}>{t.h2WhatIsAngular}</h2>
      <p style={pStyle}>{t.whatIsDesc}</p>

      <h3 style={h3Style}>{t.h3AngularCLI}</h3>
      <p style={pStyle}>{t.cliDesc}</p>
      <pre><code style={codeStyle}>{
'# Install Angular CLI globally\n' +
'npm install -g @angular/cli\n\n' +
'# Create a new Angular application\n' +
'ng new my-app --routing --style=scss\n\n' +
'# Start development server\n' +
'ng serve --open\n\n' +
'# Generate a component\n' +
'ng generate component features/user-profile\n' +
'ng g c features/user-profile  # shorthand\n\n' +
'# Generate a service\n' +
'ng generate service services/auth\n\n' +
'# Build for production\n' +
'ng build --configuration production\n\n' +
'# Run unit tests\n' +
'ng test\n\n' +
'# Run end-to-end tests\n' +
'ng e2e'
      }</code></pre>

      <h3 style={h3Style}>{t.h3TypeScriptFirst}</h3>
      <p style={pStyle}>{t.typescriptDesc}</p>

      {/* ── Section 2: Components ── */}
      <h2 style={h2Style}>{t.h2Components}</h2>
      <p style={pStyle}>{t.componentsDesc}</p>

      <pre><code style={codeStyle}>{
'// user-card.component.ts\n' +
'import { Component, Input, Output, EventEmitter, OnInit } from \'@angular/core\';\n\n' +
'interface User {\n' +
'  id: number;\n' +
'  name: string;\n' +
'  email: string;\n' +
'  role: string;\n' +
'}\n\n' +
'@Component({\n' +
'  selector: \'app-user-card\',\n' +
'  standalone: true,\n' +
'  template: `\n' +
'    <div class="card">\n' +
'      <h3>{{ user.name }}</h3>\n' +
'      <p>{{ user.email }}</p>\n' +
'      <span>{{ user.role | uppercase }}</span>\n' +
'      <button (click)="onSelect()">Select User</button>\n' +
'    </div>\n' +
'  `,\n' +
'  styles: [`\n' +
'    .card { border: 1px solid #e2e8f0; padding: 1rem; border-radius: 8px; }\n' +
'  `]\n' +
'})\n' +
'export class UserCardComponent implements OnInit {\n' +
'  @Input({ required: true }) user!: User;\n' +
'  @Output() userSelected = new EventEmitter<User>();\n\n' +
'  ngOnInit(): void {\n' +
'    console.log(\'Component initialized for user:\', this.user.name);\n' +
'  }\n\n' +
'  onSelect(): void {\n' +
'    this.userSelected.emit(this.user);\n' +
'  }\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{t.h3DataBinding}</h3>
      <p style={pStyle}>{t.dataBindingDesc}</p>
      <pre><code style={codeStyle}>{
'<!-- app.component.html -->\n\n' +
'<!-- 1. Interpolation: renders text -->\n' +
'<h1>{{ title }}</h1>\n' +
'<p>Hello, {{ user.name }}!</p>\n\n' +
'<!-- 2. Property binding: sets DOM property -->\n' +
'<img [src]="user.avatarUrl" [alt]="user.name">\n' +
'<button [disabled]="isLoading">Submit</button>\n' +
'<app-user-card [user]="currentUser"></app-user-card>\n\n' +
'<!-- 3. Event binding: responds to DOM events -->\n' +
'<button (click)="handleClick()">Click Me</button>\n' +
'<input (input)="onInputChange($event)">\n' +
'<form (ngSubmit)="onSubmit()">...</form>\n\n' +
'<!-- 4. Two-way binding: syncs view and model -->\n' +
'<input [(ngModel)]="searchTerm" placeholder="Search...">\n' +
'<p>You typed: {{ searchTerm }}</p>\n\n' +
'<!-- Template reference variable (#) -->\n' +
'<input #emailInput type="email">\n' +
'<button (click)="handleEmail(emailInput.value)">Submit</button>'
      }</code></pre>

      <h3 style={h3Style}>{t.h3ComponentInputOutput}</h3>
      <p style={pStyle}>{t.inputOutputDesc}</p>
      <pre><code style={codeStyle}>{
'// parent.component.ts\n' +
'@Component({\n' +
'  selector: \'app-parent\',\n' +
'  standalone: true,\n' +
'  imports: [UserCardComponent, NgFor],\n' +
'  template: `\n' +
'    <h2>Users ({{ selectedCount }} selected)</h2>\n' +
'    <app-user-card\n' +
'      *ngFor="let user of users"\n' +
'      [user]="user"\n' +
'      (userSelected)="onUserSelected($event)">\n' +
'    </app-user-card>\n' +
'  `\n' +
'})\n' +
'export class ParentComponent {\n' +
'  users: User[] = [...];\n' +
'  selectedCount = 0;\n\n' +
'  onUserSelected(user: User): void {\n' +
'    this.selectedCount++;\n' +
'    console.log(\'Selected:\', user.name);\n' +
'  }\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{t.h3Lifecycle}</h3>
      <p style={pStyle}>{t.lifecycleDesc}</p>
      <pre><code style={codeStyle}>{
'import {\n' +
'  Component, OnInit, OnDestroy, OnChanges,\n' +
'  Input, SimpleChanges\n' +
'} from \'@angular/core\';\n' +
'import { Subscription } from \'rxjs\';\n\n' +
'@Component({ selector: \'app-lifecycle\', template: \'\' })\n' +
'export class LifecycleComponent implements OnInit, OnChanges, OnDestroy {\n' +
'  @Input() userId!: number;\n' +
'  private subscription = new Subscription();\n\n' +
'  ngOnChanges(changes: SimpleChanges): void {\n' +
'    if (changes[\'userId\'] && !changes[\'userId\'].firstChange) {\n' +
'      console.log(\'userId changed to:\', changes[\'userId\'].currentValue);\n' +
'      this.loadUser(changes[\'userId\'].currentValue);\n' +
'    }\n' +
'  }\n\n' +
'  ngOnInit(): void {\n' +
'    // Safe to access @Input values here\n' +
'    this.loadUser(this.userId);\n' +
'  }\n\n' +
'  private loadUser(id: number): void { /* ... */ }\n\n' +
'  ngOnDestroy(): void {\n' +
'    // Cleanup: unsubscribe to prevent memory leaks\n' +
'    this.subscription.unsubscribe();\n' +
'  }\n' +
'}'
      }</code></pre>

      {/* ── Section 3: Directives ── */}
      <h2 style={h2Style}>{t.h2Directives}</h2>
      <p style={pStyle}>{t.directivesDesc}</p>

      <h3 style={h3Style}>{t.h3StructuralDirectives}</h3>
      <p style={pStyle}>{t.structuralDesc}</p>
      <pre><code style={codeStyle}>{
'<!-- ngIf: conditional rendering -->\n' +
'<div *ngIf="isLoggedIn; else loginBlock">\n' +
'  <p>Welcome back, {{ user.name }}!</p>\n' +
'</div>\n' +
'<ng-template #loginBlock>\n' +
'  <app-login-form></app-login-form>\n' +
'</ng-template>\n\n' +
'<!-- ngFor: list rendering with index and trackBy -->\n' +
'<ul>\n' +
'  <li *ngFor="let item of items; let i = index; trackBy: trackById">\n' +
'    {{ i + 1 }}. {{ item.name }}\n' +
'  </li>\n' +
'</ul>\n\n' +
'<!-- Angular 17+ new control flow syntax -->\n' +
'@if (isLoggedIn) {\n' +
'  <p>Welcome, {{ user.name }}!</p>\n' +
'} @else {\n' +
'  <app-login-form />\n' +
'}\n\n' +
'@for (item of items; track item.id; let i = $index) {\n' +
'  <li>{{ i + 1 }}. {{ item.name }}</li>\n' +
'} @empty {\n' +
'  <li>No items found.</li>\n' +
'}\n\n' +
'@switch (user.role) {\n' +
'  @case (\'admin\') { <app-admin-panel /> }\n' +
'  @case (\'editor\') { <app-editor-panel /> }\n' +
'  @default { <app-viewer-panel /> }\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{t.h3AttributeDirectives}</h3>
      <p style={pStyle}>{t.attributeDesc}</p>
      <pre><code style={codeStyle}>{
'<!-- ngClass: dynamic CSS classes -->\n' +
'<div [ngClass]="{\n' +
'  \'active\': isActive,\n' +
'  \'error\': hasError,\n' +
'  \'loading\': isLoading\n' +
'}">\n' +
'  Status indicator\n' +
'</div>\n\n' +
'<!-- ngStyle: dynamic inline styles -->\n' +
'<div [ngStyle]="{\n' +
'  \'color\': textColor,\n' +
'  \'font-size\': fontSize + \'px\',\n' +
'  \'background-color\': isHighlighted ? \'#fef3c7\' : \'transparent\'\n' +
'}">\n' +
'  Styled content\n' +
'</div>\n\n' +
'<!-- Built-in pipes -->\n' +
'<p>{{ price | currency:\'USD\' }}</p>\n' +
'<p>{{ date | date:\'longDate\' }}</p>\n' +
'<p>{{ name | uppercase }}</p>\n' +
'<p>{{ longText | slice:0:100 }}...</p>'
      }</code></pre>

      <h3 style={h3Style}>{t.h3CustomDirectives}</h3>
      <p style={pStyle}>{t.customDirectiveDesc}</p>
      <pre><code style={codeStyle}>{
'// highlight.directive.ts\n' +
'import {\n' +
'  Directive, ElementRef, HostListener,\n' +
'  Input, OnInit\n' +
'} from \'@angular/core\';\n\n' +
'@Directive({\n' +
'  selector: \'[appHighlight]\',\n' +
'  standalone: true,\n' +
'})\n' +
'export class HighlightDirective implements OnInit {\n' +
'  @Input() appHighlight = \'#fef3c7\';\n' +
'  @Input() defaultColor = \'transparent\';\n\n' +
'  constructor(private el: ElementRef) {}\n\n' +
'  ngOnInit(): void {\n' +
'    this.el.nativeElement.style.transition = \'background-color 0.2s\';\n' +
'  }\n\n' +
'  @HostListener(\'mouseenter\')\n' +
'  onMouseEnter(): void {\n' +
'    this.el.nativeElement.style.backgroundColor = this.appHighlight;\n' +
'  }\n\n' +
'  @HostListener(\'mouseleave\')\n' +
'  onMouseLeave(): void {\n' +
'    this.el.nativeElement.style.backgroundColor = this.defaultColor;\n' +
'  }\n' +
'}\n\n' +
'// Usage in template:\n' +
'// <p appHighlight="#d1fae5">Hover over me!</p>\n' +
'// <p [appHighlight]="userColor" defaultColor="#f0f9ff">Custom color</p>'
      }</code></pre>

      {/* ── Section 4: Services and DI ── */}
      <h2 style={h2Style}>{t.h2Services}</h2>
      <p style={pStyle}>{t.servicesDesc}</p>

      <h3 style={h3Style}>{t.h3Injectable}</h3>
      <p style={pStyle}>{t.injectableDesc}</p>
      <pre><code style={codeStyle}>{
'// auth.service.ts\n' +
'import { Injectable, inject } from \'@angular/core\';\n' +
'import { HttpClient } from \'@angular/common/http\';\n' +
'import { BehaviorSubject, Observable, tap } from \'rxjs\';\n\n' +
'interface AuthUser {\n' +
'  id: number;\n' +
'  email: string;\n' +
'  token: string;\n' +
'}\n\n' +
'@Injectable({\n' +
'  providedIn: \'root\', // singleton for entire app\n' +
'})\n' +
'export class AuthService {\n' +
'  private http = inject(HttpClient);\n' +
'  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);\n\n' +
'  // Expose as read-only Observable\n' +
'  currentUser$ = this.currentUserSubject.asObservable();\n\n' +
'  get isLoggedIn(): boolean {\n' +
'    return this.currentUserSubject.value !== null;\n' +
'  }\n\n' +
'  login(email: string, password: string): Observable<AuthUser> {\n' +
'    return this.http.post<AuthUser>(\'/api/auth/login\', { email, password }).pipe(\n' +
'      tap(user => {\n' +
'        localStorage.setItem(\'token\', user.token);\n' +
'        this.currentUserSubject.next(user);\n' +
'      })\n' +
'    );\n' +
'  }\n\n' +
'  logout(): void {\n' +
'    localStorage.removeItem(\'token\');\n' +
'    this.currentUserSubject.next(null);\n' +
'  }\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{t.h3HTTPClient}</h3>
      <p style={pStyle}>{t.httpClientDesc}</p>
      <pre><code style={codeStyle}>{
'// products.service.ts\n' +
'import { Injectable, inject } from \'@angular/core\';\n' +
'import { HttpClient, HttpParams } from \'@angular/common/http\';\n' +
'import { Observable } from \'rxjs\';\n' +
'import { map, catchError } from \'rxjs/operators\';\n\n' +
'interface Product {\n' +
'  id: number;\n' +
'  name: string;\n' +
'  price: number;\n' +
'  category: string;\n' +
'}\n\n' +
'interface ProductsResponse {\n' +
'  data: Product[];\n' +
'  total: number;\n' +
'  page: number;\n' +
'}\n\n' +
'@Injectable({ providedIn: \'root\' })\n' +
'export class ProductsService {\n' +
'  private http = inject(HttpClient);\n' +
'  private baseUrl = \'/api/products\';\n\n' +
'  getProducts(page = 1, category?: string): Observable<ProductsResponse> {\n' +
'    let params = new HttpParams().set(\'page\', page);\n' +
'    if (category) params = params.set(\'category\', category);\n\n' +
'    return this.http.get<ProductsResponse>(this.baseUrl, { params });\n' +
'  }\n\n' +
'  getProduct(id: number): Observable<Product> {\n' +
'    return this.http.get<Product>(this.baseUrl + \'/\' + id);\n' +
'  }\n\n' +
'  createProduct(product: Omit<Product, \'id\'>): Observable<Product> {\n' +
'    return this.http.post<Product>(this.baseUrl, product);\n' +
'  }\n\n' +
'  updateProduct(id: number, updates: Partial<Product>): Observable<Product> {\n' +
'    return this.http.patch<Product>(this.baseUrl + \'/\' + id, updates);\n' +
'  }\n\n' +
'  deleteProduct(id: number): Observable<void> {\n' +
'    return this.http.delete<void>(this.baseUrl + \'/\' + id);\n' +
'  }\n' +
'}\n\n' +
'// HTTP Interceptor (Angular 15+ functional style)\n' +
'// app.config.ts\n' +
'import { provideHttpClient, withInterceptors } from \'@angular/common/http\';\n\n' +
'export const authInterceptor = (req, next) => {\n' +
'  const token = localStorage.getItem(\'token\');\n' +
'  if (token) {\n' +
'    req = req.clone({\n' +
'      setHeaders: { Authorization: \'Bearer \' + token }\n' +
'    });\n' +
'  }\n' +
'  return next(req);\n' +
'};\n\n' +
'// Bootstrap:\n' +
'bootstrapApplication(AppComponent, {\n' +
'  providers: [\n' +
'    provideHttpClient(withInterceptors([authInterceptor]))\n' +
'  ]\n' +
'});'
      }</code></pre>

      {/* ── Section 5: Reactive Forms ── */}
      <h2 style={h2Style}>{t.h2ReactiveForms}</h2>
      <p style={pStyle}>{t.formsDesc}</p>

      <h3 style={h3Style}>{t.h3FormGroupControl}</h3>
      <p style={pStyle}>{t.formGroupDesc}</p>
      <pre><code style={codeStyle}>{
'// registration.component.ts\n' +
'import { Component, inject } from \'@angular/core\';\n' +
'import {\n' +
'  FormBuilder, FormGroup, FormControl,\n' +
'  Validators, ReactiveFormsModule\n' +
'} from \'@angular/forms\';\n\n' +
'@Component({\n' +
'  selector: \'app-registration\',\n' +
'  standalone: true,\n' +
'  imports: [ReactiveFormsModule],\n' +
'  template: `\n' +
'    <form [formGroup]="form" (ngSubmit)="onSubmit()">\n' +
'      <div>\n' +
'        <label>Email</label>\n' +
'        <input formControlName="email" type="email">\n' +
'        @if (email.invalid && email.touched) {\n' +
'          @if (email.errors?.[\'required\']) { <span>Email is required</span> }\n' +
'          @if (email.errors?.[\'email\']) { <span>Invalid email format</span> }\n' +
'        }\n' +
'      </div>\n' +
'      <div formGroupName="password">\n' +
'        <input formControlName="value" type="password">\n' +
'        <input formControlName="confirm" type="password">\n' +
'        @if (form.get(\'password\')?.errors?.[\'mismatch\']) {\n' +
'          <span>Passwords do not match</span>\n' +
'        }\n' +
'      </div>\n' +
'      <button type="submit" [disabled]="form.invalid">Register</button>\n' +
'    </form>\n' +
'  `\n' +
'})\n' +
'export class RegistrationComponent {\n' +
'  private fb = inject(FormBuilder);\n\n' +
'  form = this.fb.group({\n' +
'    email: [\'\', [Validators.required, Validators.email]],\n' +
'    name: [\'\', [Validators.required, Validators.minLength(2)]],\n' +
'    password: this.fb.group({\n' +
'      value: [\'\', [Validators.required, Validators.minLength(8)]],\n' +
'      confirm: [\'\', Validators.required],\n' +
'    }, { validators: passwordMatchValidator }),\n' +
'  });\n\n' +
'  get email() { return this.form.get(\'email\') as FormControl; }\n\n' +
'  onSubmit(): void {\n' +
'    if (this.form.valid) {\n' +
'      console.log(this.form.value);\n' +
'    }\n' +
'  }\n' +
'}\n\n' +
'// Custom cross-field validator\n' +
'function passwordMatchValidator(group: AbstractControl) {\n' +
'  const value = group.get(\'value\')?.value;\n' +
'  const confirm = group.get(\'confirm\')?.value;\n' +
'  return value === confirm ? null : { mismatch: true };\n' +
'}'
      }</code></pre>

      {/* ── Section 6: RxJS ── */}
      <h2 style={h2Style}>{t.h2RxJS}</h2>
      <p style={pStyle}>{t.rxjsDesc}</p>

      <h3 style={h3Style}>{t.h3AsyncPipe}</h3>
      <p style={pStyle}>{t.asyncPipeDesc}</p>
      <pre><code style={codeStyle}>{
'// products-list.component.ts\n' +
'import { Component, inject } from \'@angular/core\';\n' +
'import { AsyncPipe, NgFor, NgIf } from \'@angular/common\';\n' +
'import { ProductsService } from \'../services/products.service\';\n\n' +
'@Component({\n' +
'  selector: \'app-products-list\',\n' +
'  standalone: true,\n' +
'  imports: [AsyncPipe, NgFor, NgIf],\n' +
'  template: `\n' +
'    @if (products$ | async; as response) {\n' +
'      <p>Total: {{ response.total }}</p>\n' +
'      @for (product of response.data; track product.id) {\n' +
'        <div>{{ product.name }} - {{ product.price | currency }}</div>\n' +
'      }\n' +
'    } @else {\n' +
'      <app-loading-spinner />\n' +
'    }\n' +
'  `\n' +
'})\n' +
'export class ProductsListComponent {\n' +
'  private productService = inject(ProductsService);\n\n' +
'  // No manual subscribe/unsubscribe needed!\n' +
'  products$ = this.productService.getProducts();\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{t.h3RxJSOperators}</h3>
      <p style={pStyle}>{t.operatorsDesc}</p>
      <pre><code style={codeStyle}>{
'// search.component.ts — debounced search with switchMap\n' +
'import { Component, inject, OnInit } from \'@angular/core\';\n' +
'import { FormControl, ReactiveFormsModule } from \'@angular/forms\';\n' +
'import { HttpClient } from \'@angular/common/http\';\n' +
'import {\n' +
'  debounceTime, distinctUntilChanged,\n' +
'  switchMap, filter, map, catchError\n' +
'} from \'rxjs/operators\';\n' +
'import { of } from \'rxjs\';\n\n' +
'@Component({\n' +
'  selector: \'app-search\',\n' +
'  standalone: true,\n' +
'  imports: [ReactiveFormsModule, AsyncPipe, NgFor],\n' +
'  template: `\n' +
'    <input [formControl]="searchControl" placeholder="Search products...">\n' +
'    @for (result of results$ | async; track result.id) {\n' +
'      <div>{{ result.name }}</div>\n' +
'    }\n' +
'  `\n' +
'})\n' +
'export class SearchComponent {\n' +
'  private http = inject(HttpClient);\n' +
'  searchControl = new FormControl(\'\');\n\n' +
'  results$ = this.searchControl.valueChanges.pipe(\n' +
'    debounceTime(300),          // Wait 300ms after last keystroke\n' +
'    distinctUntilChanged(),     // Skip if same value\n' +
'    filter(term => term!.length >= 2), // Min 2 chars\n' +
'    switchMap(term =>           // Cancel previous request\n' +
'      this.http.get<Product[]>(\'/api/search?q=\' + term).pipe(\n' +
'        catchError(() => of([]))  // Handle errors gracefully\n' +
'      )\n' +
'    ),\n' +
'    map(results => results.slice(0, 10)) // Top 10 results\n' +
'  );\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{t.h3SubjectsAndBehaviorSubjects}</h3>
      <p style={pStyle}>{t.subjectsDesc}</p>
      <pre><code style={codeStyle}>{
'// theme.service.ts\n' +
'import { Injectable } from \'@angular/core\';\n' +
'import { BehaviorSubject, Subject, ReplaySubject } from \'rxjs\';\n\n' +
'type Theme = \'light\' | \'dark\';\n\n' +
'@Injectable({ providedIn: \'root\' })\n' +
'export class ThemeService {\n' +
'  // BehaviorSubject: has initial value, emits immediately to new subscribers\n' +
'  private themeSubject = new BehaviorSubject<Theme>(\'light\');\n' +
'  theme$ = this.themeSubject.asObservable(); // read-only\n\n' +
'  // Subject: no initial value, emits to current subscribers only\n' +
'  private notificationSubject = new Subject<string>();\n' +
'  notification$ = this.notificationSubject.asObservable();\n\n' +
'  // ReplaySubject: buffers last N emissions for new subscribers\n' +
'  private activityLog = new ReplaySubject<string>(5); // last 5 actions\n' +
'  activityLog$ = this.activityLog.asObservable();\n\n' +
'  get currentTheme(): Theme {\n' +
'    return this.themeSubject.value;\n' +
'  }\n\n' +
'  toggleTheme(): void {\n' +
'    const next: Theme = this.themeSubject.value === \'light\' ? \'dark\' : \'light\';\n' +
'    this.themeSubject.next(next);\n' +
'    this.activityLog.next(\'Theme changed to \' + next);\n' +
'  }\n\n' +
'  notify(message: string): void {\n' +
'    this.notificationSubject.next(message);\n' +
'  }\n' +
'}'
      }</code></pre>

      {/* ── Section 7: Router ── */}
      <h2 style={h2Style}>{t.h2Router}</h2>
      <p style={pStyle}>{t.routerDesc}</p>

      <h3 style={h3Style}>{t.h3LazyLoading}</h3>
      <p style={pStyle}>{t.lazyLoadingDesc}</p>
      <pre><code style={codeStyle}>{
'// app.routes.ts\n' +
'import { Routes } from \'@angular/router\';\n\n' +
'export const routes: Routes = [\n' +
'  {\n' +
'    path: \'\',\n' +
'    loadComponent: () => import(\'./home/home.component\')\n' +
'      .then(m => m.HomeComponent)\n' +
'  },\n' +
'  {\n' +
'    path: \'products\',\n' +
'    loadComponent: () => import(\'./products/products-list.component\')\n' +
'      .then(m => m.ProductsListComponent)\n' +
'  },\n' +
'  {\n' +
'    path: \'products/:id\',\n' +
'    loadComponent: () => import(\'./products/product-detail.component\')\n' +
'      .then(m => m.ProductDetailComponent)\n' +
'  },\n' +
'  {\n' +
'    path: \'admin\',\n' +
'    canActivate: [authGuard],\n' +
'    loadChildren: () => import(\'./admin/admin.routes\')\n' +
'      .then(m => m.adminRoutes)\n' +
'  },\n' +
'  {\n' +
'    path: \'**\',\n' +
'    loadComponent: () => import(\'./not-found/not-found.component\')\n' +
'      .then(m => m.NotFoundComponent)\n' +
'  }\n' +
'];\n\n' +
'// app.config.ts\n' +
'import { provideRouter, withPreloading, PreloadAllModules } from \'@angular/router\';\n\n' +
'export const appConfig = {\n' +
'  providers: [\n' +
'    provideRouter(routes, withPreloading(PreloadAllModules))\n' +
'  ]\n' +
'};'
      }</code></pre>

      <h3 style={h3Style}>{t.h3RouteGuards}</h3>
      <p style={pStyle}>{t.routeGuardsDesc}</p>
      <pre><code style={codeStyle}>{
'// auth.guard.ts (Angular 15+ functional style)\n' +
'import { inject } from \'@angular/core\';\n' +
'import { CanActivateFn, Router } from \'@angular/router\';\n' +
'import { AuthService } from \'./auth.service\';\n\n' +
'export const authGuard: CanActivateFn = (route, state) => {\n' +
'  const authService = inject(AuthService);\n' +
'  const router = inject(Router);\n\n' +
'  if (authService.isLoggedIn) {\n' +
'    return true;\n' +
'  }\n\n' +
'  // Redirect to login, preserve intended URL\n' +
'  return router.createUrlTree([\'/login\'], {\n' +
'    queryParams: { returnUrl: state.url }\n' +
'  });\n' +
'};\n\n' +
'// Unsaved changes guard\n' +
'export const unsavedChangesGuard: CanDeactivateFn<EditFormComponent> =\n' +
'  (component) => {\n' +
'    if (component.hasUnsavedChanges()) {\n' +
'      return window.confirm(\'You have unsaved changes. Leave anyway?\');\n' +
'    }\n' +
'    return true;\n' +
'  };'
      }</code></pre>

      <h3 style={h3Style}>{t.h3ActivatedRoute}</h3>
      <p style={pStyle}>{t.activatedRouteDesc}</p>
      <pre><code style={codeStyle}>{
'// product-detail.component.ts\n' +
'import { Component, inject, OnInit } from \'@angular/core\';\n' +
'import { ActivatedRoute, Router } from \'@angular/router\';\n' +
'import { switchMap } from \'rxjs/operators\';\n\n' +
'@Component({ selector: \'app-product-detail\', standalone: true, template: \'\' })\n' +
'export class ProductDetailComponent implements OnInit {\n' +
'  private route = inject(ActivatedRoute);\n' +
'  private router = inject(Router);\n' +
'  private productService = inject(ProductsService);\n\n' +
'  // Reactive: re-fetches when :id changes without re-creating the component\n' +
'  product$ = this.route.paramMap.pipe(\n' +
'    map(params => Number(params.get(\'id\'))),\n' +
'    switchMap(id => this.productService.getProduct(id))\n' +
'  );\n\n' +
'  ngOnInit(): void {\n' +
'    // Query params\n' +
'    this.route.queryParams.subscribe(params => {\n' +
'      const tab = params[\'tab\'] || \'details\';\n' +
'      console.log(\'Active tab:\', tab);\n' +
'    });\n' +
'  }\n\n' +
'  goBack(): void {\n' +
'    this.router.navigate([\'/products\']);\n' +
'  }\n\n' +
'  goToEdit(id: number): void {\n' +
'    this.router.navigate([\'/products\', id, \'edit\'], {\n' +
'      queryParams: { mode: \'full\' }\n' +
'    });\n' +
'  }\n' +
'}'
      }</code></pre>

      {/* ── Section 8: NgRx ── */}
      <h2 style={h2Style}>{t.h2StateManagement}</h2>
      <p style={pStyle}>{t.stateDesc}</p>

      <h3 style={h3Style}>{t.h3NgRxActions}</h3>
      <p style={pStyle}>{t.actionsDesc}</p>
      <pre><code style={codeStyle}>{
'// store/products/products.actions.ts\n' +
'import { createAction, props } from \'@ngrx/store\';\n\n' +
'// Load actions\n' +
'export const loadProducts = createAction(\'[Product List] Load Products\');\n' +
'export const loadProductsSuccess = createAction(\n' +
'  \'[Product List] Load Products Success\',\n' +
'  props<{ products: Product[] }>()\n' +
');\n' +
'export const loadProductsFailure = createAction(\n' +
'  \'[Product List] Load Products Failure\',\n' +
'  props<{ error: string }>()\n' +
');\n\n' +
'// CRUD actions\n' +
'export const addToCart = createAction(\n' +
'  \'[Cart] Add Item\',\n' +
'  props<{ product: Product; quantity: number }>()\n' +
');\n\n' +
'// store/products/products.reducer.ts\n' +
'import { createReducer, on } from \'@ngrx/store\';\n\n' +
'interface ProductsState {\n' +
'  products: Product[];\n' +
'  loading: boolean;\n' +
'  error: string | null;\n' +
'}\n\n' +
'const initialState: ProductsState = {\n' +
'  products: [],\n' +
'  loading: false,\n' +
'  error: null,\n' +
'};\n\n' +
'export const productsReducer = createReducer(\n' +
'  initialState,\n' +
'  on(loadProducts, state => ({ ...state, loading: true, error: null })),\n' +
'  on(loadProductsSuccess, (state, { products }) => ({\n' +
'    ...state,\n' +
'    loading: false,\n' +
'    products,\n' +
'  })),\n' +
'  on(loadProductsFailure, (state, { error }) => ({\n' +
'    ...state,\n' +
'    loading: false,\n' +
'    error,\n' +
'  }))\n' +
');'
      }</code></pre>

      <h3 style={h3Style}>{t.h3NgRxSelectors}</h3>
      <p style={pStyle}>{t.selectorsDesc}</p>
      <pre><code style={codeStyle}>{
'// store/products/products.selectors.ts\n' +
'import { createFeatureSelector, createSelector } from \'@ngrx/store\';\n\n' +
'const selectProductsState = createFeatureSelector<ProductsState>(\'products\');\n\n' +
'export const selectAllProducts = createSelector(\n' +
'  selectProductsState,\n' +
'  state => state.products\n' +
');\n\n' +
'export const selectProductsLoading = createSelector(\n' +
'  selectProductsState,\n' +
'  state => state.loading\n' +
');\n\n' +
'// Derived selector: memoized, only recalculates when inputs change\n' +
'export const selectAvailableProducts = createSelector(\n' +
'  selectAllProducts,\n' +
'  products => products.filter(p => p.stock > 0)\n' +
');\n\n' +
'export const selectProductById = (id: number) => createSelector(\n' +
'  selectAllProducts,\n' +
'  products => products.find(p => p.id === id)\n' +
');\n\n' +
'// Using in component:\n' +
'@Component({ template: \'\' })\n' +
'export class ProductsComponent {\n' +
'  private store = inject(Store);\n\n' +
'  products$ = this.store.select(selectAvailableProducts);\n' +
'  loading$ = this.store.select(selectProductsLoading);\n\n' +
'  ngOnInit() {\n' +
'    this.store.dispatch(loadProducts());\n' +
'  }\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{t.h3NgRxEffects}</h3>
      <p style={pStyle}>{t.effectsDesc}</p>
      <pre><code style={codeStyle}>{
'// store/products/products.effects.ts\n' +
'import { Injectable, inject } from \'@angular/core\';\n' +
'import { Actions, createEffect, ofType } from \'@ngrx/effects\';\n' +
'import { switchMap, map, catchError } from \'rxjs/operators\';\n' +
'import { of } from \'rxjs\';\n\n' +
'@Injectable()\n' +
'export class ProductsEffects {\n' +
'  private actions$ = inject(Actions);\n' +
'  private productService = inject(ProductsService);\n\n' +
'  loadProducts$ = createEffect(() =>\n' +
'    this.actions$.pipe(\n' +
'      ofType(loadProducts),\n' +
'      switchMap(() =>\n' +
'        this.productService.getProducts().pipe(\n' +
'          map(response => loadProductsSuccess({ products: response.data })),\n' +
'          catchError(error =>\n' +
'            of(loadProductsFailure({ error: error.message }))\n' +
'          )\n' +
'        )\n' +
'      )\n' +
'    )\n' +
'  );\n\n' +
'  // Effect that dispatches no action\n' +
'  logProductLoad$ = createEffect(() =>\n' +
'    this.actions$.pipe(\n' +
'      ofType(loadProductsSuccess),\n' +
'      tap(({ products }) => console.log(\'Loaded \' + products.length + \' products\'))\n' +
'    ),\n' +
'    { dispatch: false }\n' +
'  );\n' +
'}'
      }</code></pre>

      {/* ── Section 9: Comparison Table ── */}
      <h2 style={h2Style}>{t.h2Comparison}</h2>
      <p style={pStyle}>{t.comparisonDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Dimension</th>
              <th style={{ ...thStyle, borderLeft: '1px solid #475569' }}>Angular</th>
              <th style={{ ...thStyle, borderLeft: '1px solid #475569' }}>React</th>
              <th style={{ ...thStyle, borderLeft: '1px solid #475569' }}>Vue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Type</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Full framework</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>UI library</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Progressive framework</td>
            </tr>
            <tr>
              <td style={{ ...tdAltStyle, fontWeight: 600 }}>Language</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>TypeScript (mandatory)</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>JS or TypeScript</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>JS or TypeScript</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Maintained by</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Google</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Meta (Facebook)</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Community / Evan You</td>
            </tr>
            <tr>
              <td style={{ ...tdAltStyle, fontWeight: 600 }}>Learning curve</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Steep (DI, RxJS, decorators)</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Moderate (hooks, JSX)</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Gentle (Options/Composition API)</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Routing</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Built-in (Angular Router)</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Third-party (React Router)</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Built-in (Vue Router)</td>
            </tr>
            <tr>
              <td style={{ ...tdAltStyle, fontWeight: 600 }}>State management</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Services/NgRx/Signals</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Redux/Zustand/Recoil</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Vuex / Pinia</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Forms</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Built-in (reactive + template)</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Third-party (React Hook Form)</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Built-in (v-model)</td>
            </tr>
            <tr>
              <td style={{ ...tdAltStyle, fontWeight: 600 }}>HTTP client</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Built-in (HttpClient)</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Third-party (Axios/fetch)</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Third-party (Axios/fetch)</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Render approach</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Incremental DOM / Zone.js</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Virtual DOM</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Virtual DOM (VDOM)</td>
            </tr>
            <tr>
              <td style={{ ...tdAltStyle, fontWeight: 600 }}>Min bundle (gzip)</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>~30KB (standalone)</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>~45KB (React + ReactDOM)</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>~16KB (Vue 3)</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Enterprise adoption</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Very high (banking, gov, Google)</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Very high (startups + enterprise)</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>High (Asia, mid-market)</td>
            </tr>
            <tr>
              <td style={{ ...tdAltStyle, fontWeight: 600 }}>Testing</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>TestBed (built-in DI testing)</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>React Testing Library</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Vue Testing Library</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>SSR support</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Angular Universal (built-in)</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Next.js</td>
              <td style={{ ...tdStyle, borderLeft: '1px solid #e2e8f0' }}>Nuxt.js</td>
            </tr>
            <tr>
              <td style={{ ...tdAltStyle, fontWeight: 600 }}>Best for</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Large enterprise apps, big teams</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Any scale, flexible architecture</td>
              <td style={{ ...tdAltStyle, borderLeft: '1px solid #e2e8f0' }}>Rapid development, gentle onboarding</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Section 10: Angular 17+ Features ── */}
      <h2 style={h2Style}>{t.h2Angular17Features}</h2>
      <p style={pStyle}>{t.angular17Desc}</p>

      <h3 style={h3Style}>{t.h3Signals}</h3>
      <p style={pStyle}>{t.signalsDesc}</p>
      <pre><code style={codeStyle}>{
'// counter.component.ts — Signals example\n' +
'import { Component, signal, computed, effect } from \'@angular/core\';\n\n' +
'@Component({\n' +
'  selector: \'app-counter\',\n' +
'  standalone: true,\n' +
'  template: `\n' +
'    <p>Count: {{ count() }}</p>\n' +
'    <p>Double: {{ doubled() }}</p>\n' +
'    <button (click)="increment()">+</button>\n' +
'    <button (click)="decrement()">-</button>\n' +
'  `\n' +
'})\n' +
'export class CounterComponent {\n' +
'  count = signal(0);\n\n' +
'  // Computed signal: automatically updates when count changes\n' +
'  doubled = computed(() => this.count() * 2);\n\n' +
'  constructor() {\n' +
'    // Effect: runs side effect when signal changes\n' +
'    effect(() => {\n' +
'      console.log(\'Count is now:\', this.count());\n' +
'      // Automatically tracks this.count() as a dependency\n' +
'    });\n' +
'  }\n\n' +
'  increment(): void { this.count.update(v => v + 1); }\n' +
'  decrement(): void { this.count.update(v => v - 1); }\n' +
'}\n\n' +
'// Signals from Observables\n' +
'import { toSignal, toObservable } from \'@angular/core/rxjs-interop\';\n\n' +
'@Component({ standalone: true, template: \'\' })\n' +
'export class ExampleComponent {\n' +
'  private userService = inject(UserService);\n\n' +
'  // Convert Observable to Signal\n' +
'  currentUser = toSignal(this.userService.currentUser$);\n\n' +
'  // Use in template without async pipe\n' +
'  // {{ currentUser()?.name }}\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{t.h3StandaloneComponents}</h3>
      <p style={pStyle}>{t.standaloneDesc}</p>
      <pre><code style={codeStyle}>{
'// main.ts — Angular 17+ bootstrap (no AppModule!)\n' +
'import { bootstrapApplication } from \'@angular/platform-browser\';\n' +
'import { provideRouter } from \'@angular/router\';\n' +
'import { provideHttpClient, withInterceptors } from \'@angular/common/http\';\n' +
'import { provideAnimations } from \'@angular/platform-browser/animations\';\n' +
'import { provideStore } from \'@ngrx/store\';\n' +
'import { AppComponent } from \'./app/app.component\';\n' +
'import { routes } from \'./app/app.routes\';\n\n' +
'bootstrapApplication(AppComponent, {\n' +
'  providers: [\n' +
'    provideRouter(routes),\n' +
'    provideHttpClient(withInterceptors([authInterceptor])),\n' +
'    provideAnimations(),\n' +
'    provideStore({ products: productsReducer }),\n' +
'  ]\n' +
'});\n\n' +
'// app.component.ts — standalone root component\n' +
'@Component({\n' +
'  selector: \'app-root\',\n' +
'  standalone: true,\n' +
'  imports: [\n' +
'    RouterOutlet,\n' +
'    RouterLink,\n' +
'    HeaderComponent,\n' +
'    FooterComponent,\n' +
'  ],\n' +
'  template: `\n' +
'    <app-header />\n' +
'    <main>\n' +
'      <router-outlet />\n' +
'    </main>\n' +
'    <app-footer />\n' +
'  `\n' +
'})\n' +
'export class AppComponent {}'
      }</code></pre>

      {/* ── FAQ Section ── */}
      <h2 style={h2Style}>{t.h2FAQ}</h2>

      <div style={faqItemStyle}>
        <strong style={{ color: '#0f172a', fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>{t.faq1Q}</strong>
        <p style={{ ...pStyle, marginBottom: 0 }}>{t.faq1A}</p>
      </div>

      <div style={faqItemStyle}>
        <strong style={{ color: '#0f172a', fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>{t.faq2Q}</strong>
        <p style={{ ...pStyle, marginBottom: 0 }}>{t.faq2A}</p>
      </div>

      <div style={faqItemStyle}>
        <strong style={{ color: '#0f172a', fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>{t.faq3Q}</strong>
        <p style={{ ...pStyle, marginBottom: 0 }}>{t.faq3A}</p>
      </div>

      <div style={faqItemStyle}>
        <strong style={{ color: '#0f172a', fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>{t.faq4Q}</strong>
        <p style={{ ...pStyle, marginBottom: 0 }}>{t.faq4A}</p>
      </div>

      <div style={faqItemStyle}>
        <strong style={{ color: '#0f172a', fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>{t.faq5Q}</strong>
        <p style={{ ...pStyle, marginBottom: 0 }}>{t.faq5A}</p>
      </div>

      <div style={faqItemStyle}>
        <strong style={{ color: '#0f172a', fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>{t.faq6Q}</strong>
        <p style={{ ...pStyle, marginBottom: 0 }}>{t.faq6A}</p>
      </div>

      <div style={faqItemStyle}>
        <strong style={{ color: '#0f172a', fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>{t.faq7Q}</strong>
        <p style={{ ...pStyle, marginBottom: 0 }}>{t.faq7A}</p>
      </div>

      <div style={{ ...faqItemStyle, borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
        <strong style={{ color: '#0f172a', fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>{t.faq8Q}</strong>
        <p style={{ ...pStyle, marginBottom: 0 }}>{t.faq8A}</p>
      </div>
    </article>
  );
}
