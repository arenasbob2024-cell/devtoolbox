import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'React Hooks revolutionized how we write React components. Since React 16.8, Hooks let you use state, lifecycle methods, context, and more in functional components — no classes needed. This <strong>complete React Hooks guide</strong> covers every built-in Hook with practical examples, common pitfalls, and best practices.',
    h2_useState: 'useState: Managing Component State',
    useStateDesc: '<code>useState</code> is the most fundamental Hook. It returns a stateful value and a function to update it.',
    h2_useEffect: 'useEffect: Side Effects and Lifecycle',
    useEffectDesc: '<code>useEffect</code> lets you perform side effects in function components. It replaces <code>componentDidMount</code>, <code>componentDidUpdate</code>, and <code>componentWillUnmount</code>.',
    h2_useContext: 'useContext: Consuming Context',
    useContextDesc: '<code>useContext</code> lets you subscribe to React context without nesting Consumer components. It simplifies passing data deeply through the component tree.',
    h2_useMemo: 'useMemo: Memoizing Expensive Computations',
    useMemoDesc: '<code>useMemo</code> caches the result of an expensive calculation between re-renders. Only recomputes when dependencies change.',
    h2_useCallback: 'useCallback: Memoizing Functions',
    useCallbackDesc: '<code>useCallback</code> returns a memoized version of a callback function. It is useful when passing callbacks to optimized child components that rely on reference equality.',
    h2_useRef: 'useRef: Mutable References',
    useRefDesc: '<code>useRef</code> returns a mutable ref object whose <code>.current</code> property persists across renders without causing re-renders.',
    h2_useReducer: 'useReducer: Complex State Logic',
    useReducerDesc: '<code>useReducer</code> is an alternative to <code>useState</code> for managing complex state logic. It follows the Redux pattern of dispatching actions to a reducer function.',
    h2_custom: 'Custom Hooks: Reusable Logic',
    customDesc: 'Custom Hooks let you extract component logic into reusable functions. A custom Hook is a function whose name starts with <code>use</code> and that may call other Hooks.',
    h2_rules: 'Rules of Hooks',
    rulesDesc: 'There are two essential rules you must follow when using Hooks.',
    rule1: '<strong>Only call Hooks at the top level.</strong> Do not call Hooks inside loops, conditions, or nested functions. This ensures Hooks are called in the same order each render.',
    rule2: '<strong>Only call Hooks from React functions.</strong> Call Hooks from React function components or custom Hooks, not from regular JavaScript functions.',
    h2_pitfalls: 'Common Pitfalls and Solutions',
    pitfall1_title: 'Stale Closures in useEffect',
    pitfall1_desc: 'When you reference state inside useEffect without including it in the dependency array, you get a stale closure — the effect sees an old value.',
    pitfall2_title: 'Infinite Loops with useEffect',
    pitfall2_desc: 'Setting state inside useEffect without proper dependencies causes infinite re-render loops.',
    pitfall3_title: 'Object/Array Dependencies',
    pitfall3_desc: 'Objects and arrays are compared by reference, not value. Creating them inline causes effects to run every render.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What are React Hooks and why should I use them?',
    faq1_a: 'React Hooks are functions that let you use React features like state, lifecycle, and context in functional components. They make code more readable, reusable, and testable compared to class components. Hooks also enable better code splitting and composition through custom Hooks.',
    faq2_q: 'What is the difference between useMemo and useCallback?',
    faq2_a: 'useMemo memoizes a computed value, while useCallback memoizes a function reference. useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). Use useMemo for expensive calculations and useCallback for stable function references passed to child components.',
    faq3_q: 'When should I use useReducer instead of useState?',
    faq3_a: 'Use useReducer when state logic is complex, involves multiple sub-values, or when the next state depends on the previous one. It is also useful when you want to pass dispatch down instead of callbacks, making the component logic more predictable.',
    faq4_q: 'Can I use Hooks in class components?',
    faq4_a: 'No, Hooks only work in functional components and custom Hooks. However, you can mix class and function components in the same application. You can wrap a Hook in a function component and use it alongside class components.',
    faq5_q: 'How do I avoid infinite loops with useEffect?',
    faq5_a: 'Always specify the correct dependency array. An empty array [] runs the effect once on mount. Include all variables the effect reads. For objects and arrays, use useMemo to stabilize references, or extract the specific primitive values you need.',
    conclusion: 'React Hooks are essential for modern React development. Master these core Hooks and you will be able to build any UI efficiently. Start with useState and useEffect, then gradually adopt useMemo, useCallback, and custom Hooks as your applications grow.',
  },
  fr: {
    intro: 'Les React Hooks ont revolutionne la maniere d\'ecrire des composants React. Depuis React 16.8, les Hooks permettent d\'utiliser le state, le cycle de vie, le contexte et plus dans les composants fonctionnels. Ce <strong>guide complet des React Hooks</strong> couvre chaque Hook avec des exemples pratiques.',
    h2_useState: 'useState : Gerer le state du composant',
    useStateDesc: '<code>useState</code> est le Hook le plus fondamental. Il retourne une valeur stateful et une fonction pour la mettre a jour.',
    h2_useEffect: 'useEffect : Effets de bord et cycle de vie',
    useEffectDesc: '<code>useEffect</code> permet d\'effectuer des effets de bord dans les composants fonctionnels.',
    h2_useContext: 'useContext : Consommer le contexte',
    useContextDesc: '<code>useContext</code> permet de s\'abonner au contexte React sans imbriquer des composants Consumer.',
    h2_useMemo: 'useMemo : Memoriser les calculs couteux',
    useMemoDesc: '<code>useMemo</code> met en cache le resultat d\'un calcul couteux entre les re-rendus.',
    h2_useCallback: 'useCallback : Memoriser les fonctions',
    useCallbackDesc: '<code>useCallback</code> retourne une version memorisee d\'une fonction callback.',
    h2_useRef: 'useRef : References mutables',
    useRefDesc: '<code>useRef</code> retourne un objet ref mutable dont la propriete <code>.current</code> persiste entre les rendus.',
    h2_useReducer: 'useReducer : Logique d\'etat complexe',
    useReducerDesc: '<code>useReducer</code> est une alternative a <code>useState</code> pour la logique d\'etat complexe.',
    h2_custom: 'Hooks personnalises : Logique reutilisable',
    customDesc: 'Les Hooks personnalises permettent d\'extraire la logique des composants en fonctions reutilisables.',
    h2_rules: 'Regles des Hooks',
    rulesDesc: 'Deux regles essentielles a suivre avec les Hooks.',
    rule1: '<strong>Appelez les Hooks uniquement au niveau superieur.</strong> Pas dans les boucles, conditions ou fonctions imbriquees.',
    rule2: '<strong>Appelez les Hooks uniquement depuis des fonctions React.</strong>',
    h2_pitfalls: 'Pieges courants et solutions',
    pitfall1_title: 'Closures obsoletes dans useEffect',
    pitfall1_desc: 'Quand vous referencez un state dans useEffect sans l\'inclure dans les dependances, vous obtenez une closure obsolete.',
    pitfall2_title: 'Boucles infinies avec useEffect',
    pitfall2_desc: 'Modifier le state dans useEffect sans dependances correctes cause des boucles de re-rendu infinies.',
    pitfall3_title: 'Dependances objet/tableau',
    pitfall3_desc: 'Les objets et tableaux sont compares par reference, pas par valeur.',
    h2_faq: 'Questions frequentes',
    faq1_q: 'Que sont les React Hooks ?', faq1_a: 'Les React Hooks sont des fonctions qui permettent d\'utiliser les fonctionnalites React dans les composants fonctionnels.',
    faq2_q: 'Quelle est la difference entre useMemo et useCallback ?', faq2_a: 'useMemo memorise une valeur calculee, useCallback memorise une reference de fonction.',
    faq3_q: 'Quand utiliser useReducer au lieu de useState ?', faq3_a: 'Quand la logique d\'etat est complexe ou implique plusieurs sous-valeurs.',
    faq4_q: 'Peut-on utiliser les Hooks dans les composants de classe ?', faq4_a: 'Non, les Hooks fonctionnent uniquement dans les composants fonctionnels.',
    faq5_q: 'Comment eviter les boucles infinies avec useEffect ?', faq5_a: 'Specifiez toujours le bon tableau de dependances.',
    conclusion: 'Les React Hooks sont essentiels pour le developpement React moderne. Maitrisez ces Hooks principaux pour construire des interfaces efficacement.',
  },
  de: {
    intro: 'React Hooks haben die Art, React-Komponenten zu schreiben, revolutioniert. Seit React 16.8 ermoglichen Hooks State, Lifecycle und mehr in funktionalen Komponenten. Dieser <strong>vollstandige React Hooks Guide</strong> behandelt jeden Hook mit praktischen Beispielen.',
    h2_useState: 'useState: Komponentenstate verwalten',
    useStateDesc: '<code>useState</code> ist der grundlegendste Hook.',
    h2_useEffect: 'useEffect: Seiteneffekte und Lifecycle',
    useEffectDesc: '<code>useEffect</code> ermoglicht Seiteneffekte in Funktionskomponenten.',
    h2_useContext: 'useContext: Kontext konsumieren',
    useContextDesc: '<code>useContext</code> abonniert React-Kontext ohne verschachtelte Consumer-Komponenten.',
    h2_useMemo: 'useMemo: Teure Berechnungen memoisieren',
    useMemoDesc: '<code>useMemo</code> cached das Ergebnis teurer Berechnungen zwischen Re-Renders.',
    h2_useCallback: 'useCallback: Funktionen memoisieren',
    useCallbackDesc: '<code>useCallback</code> gibt eine memoisierte Version einer Callback-Funktion zuruck.',
    h2_useRef: 'useRef: Veranderliche Referenzen',
    useRefDesc: '<code>useRef</code> gibt ein veranderliches Ref-Objekt zuruck.',
    h2_useReducer: 'useReducer: Komplexe State-Logik',
    useReducerDesc: '<code>useReducer</code> ist eine Alternative zu <code>useState</code> fur komplexe State-Logik.',
    h2_custom: 'Custom Hooks: Wiederverwendbare Logik',
    customDesc: 'Custom Hooks extrahieren Komponentenlogik in wiederverwendbare Funktionen.',
    h2_rules: 'Regeln der Hooks',
    rulesDesc: 'Zwei wesentliche Regeln fur Hooks.',
    rule1: '<strong>Hooks nur auf der obersten Ebene aufrufen.</strong>',
    rule2: '<strong>Hooks nur aus React-Funktionen aufrufen.</strong>',
    h2_pitfalls: 'Haufige Fallstricke und Losungen',
    pitfall1_title: 'Veraltete Closures in useEffect', pitfall1_desc: 'Wenn State in useEffect ohne korrekte Dependencies referenziert wird.',
    pitfall2_title: 'Endlosschleifen mit useEffect', pitfall2_desc: 'State in useEffect ohne korrekte Dependencies setzen verursacht Endlosschleifen.',
    pitfall3_title: 'Objekt-/Array-Dependencies', pitfall3_desc: 'Objekte und Arrays werden per Referenz verglichen.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Was sind React Hooks?', faq1_a: 'Funktionen, die React-Features in funktionalen Komponenten ermoglichen.',
    faq2_q: 'Unterschied zwischen useMemo und useCallback?', faq2_a: 'useMemo memoisiert einen Wert, useCallback memoisiert eine Funktion.',
    faq3_q: 'Wann useReducer statt useState?', faq3_a: 'Bei komplexer State-Logik oder mehreren Unterwerten.',
    faq4_q: 'Hooks in Klassenkomponenten?', faq4_a: 'Nein, nur in funktionalen Komponenten.',
    faq5_q: 'Endlosschleifen mit useEffect vermeiden?', faq5_a: 'Immer das korrekte Dependency-Array angeben.',
    conclusion: 'React Hooks sind unverzichtbar fur moderne React-Entwicklung.',
  },
  it: {
    intro: 'I React Hooks hanno rivoluzionato lo sviluppo dei componenti React. Dalla versione 16.8, i Hooks permettono di usare state, lifecycle e contesto nei componenti funzionali. Questa <strong>guida completa ai React Hooks</strong> copre ogni Hook con esempi pratici.',
    h2_useState: 'useState: Gestire lo state', useStateDesc: '<code>useState</code> e il Hook piu fondamentale.',
    h2_useEffect: 'useEffect: Effetti collaterali e lifecycle', useEffectDesc: '<code>useEffect</code> permette di eseguire effetti collaterali.',
    h2_useContext: 'useContext: Consumare il contesto', useContextDesc: '<code>useContext</code> permette di sottoscriversi al contesto React.',
    h2_useMemo: 'useMemo: Memorizzare calcoli costosi', useMemoDesc: '<code>useMemo</code> memorizza il risultato di un calcolo costoso.',
    h2_useCallback: 'useCallback: Memorizzare funzioni', useCallbackDesc: '<code>useCallback</code> restituisce una versione memorizzata di una callback.',
    h2_useRef: 'useRef: Riferimenti mutabili', useRefDesc: '<code>useRef</code> restituisce un oggetto ref mutabile.',
    h2_useReducer: 'useReducer: Logica di state complessa', useReducerDesc: '<code>useReducer</code> e un\'alternativa a <code>useState</code>.',
    h2_custom: 'Hooks personalizzati: Logica riutilizzabile', customDesc: 'I Hooks personalizzati estraggono la logica in funzioni riutilizzabili.',
    h2_rules: 'Regole dei Hooks', rulesDesc: 'Due regole essenziali per i Hooks.',
    rule1: '<strong>Chiamare i Hooks solo al livello superiore.</strong>', rule2: '<strong>Chiamare i Hooks solo da funzioni React.</strong>',
    h2_pitfalls: 'Trappole comuni e soluzioni',
    pitfall1_title: 'Closure obsolete in useEffect', pitfall1_desc: 'Quando si referenzia lo state senza includerlo nelle dipendenze.',
    pitfall2_title: 'Loop infiniti con useEffect', pitfall2_desc: 'Impostare lo state in useEffect senza dipendenze corrette.',
    pitfall3_title: 'Dipendenze oggetto/array', pitfall3_desc: 'Oggetti e array sono confrontati per riferimento.',
    h2_faq: 'Domande frequenti',
    faq1_q: 'Cosa sono i React Hooks?', faq1_a: 'Funzioni che permettono di usare le funzionalita React nei componenti funzionali.',
    faq2_q: 'Differenza tra useMemo e useCallback?', faq2_a: 'useMemo memorizza un valore, useCallback memorizza una funzione.',
    faq3_q: 'Quando usare useReducer?', faq3_a: 'Quando la logica di state e complessa.',
    faq4_q: 'Hooks nei componenti classe?', faq4_a: 'No, solo nei componenti funzionali.',
    faq5_q: 'Come evitare loop infiniti?', faq5_a: 'Specificare sempre le dipendenze corrette.',
    conclusion: 'I React Hooks sono essenziali per lo sviluppo React moderno.',
  },
  es: {
    intro: 'Los React Hooks revolucionaron la forma de escribir componentes React. Desde React 16.8, los Hooks permiten usar estado, ciclo de vida y contexto en componentes funcionales. Esta <strong>guia completa de React Hooks</strong> cubre cada Hook con ejemplos practicos.',
    h2_useState: 'useState: Gestionar estado', useStateDesc: '<code>useState</code> es el Hook mas fundamental.',
    h2_useEffect: 'useEffect: Efectos secundarios y ciclo de vida', useEffectDesc: '<code>useEffect</code> permite realizar efectos secundarios.',
    h2_useContext: 'useContext: Consumir contexto', useContextDesc: '<code>useContext</code> permite suscribirse al contexto de React.',
    h2_useMemo: 'useMemo: Memorizar calculos costosos', useMemoDesc: '<code>useMemo</code> almacena en cache el resultado de un calculo costoso.',
    h2_useCallback: 'useCallback: Memorizar funciones', useCallbackDesc: '<code>useCallback</code> devuelve una version memorizada de un callback.',
    h2_useRef: 'useRef: Referencias mutables', useRefDesc: '<code>useRef</code> devuelve un objeto ref mutable.',
    h2_useReducer: 'useReducer: Logica de estado compleja', useReducerDesc: '<code>useReducer</code> es una alternativa a <code>useState</code>.',
    h2_custom: 'Hooks personalizados: Logica reutilizable', customDesc: 'Los Hooks personalizados extraen logica en funciones reutilizables.',
    h2_rules: 'Reglas de los Hooks', rulesDesc: 'Dos reglas esenciales para los Hooks.',
    rule1: '<strong>Llamar a los Hooks solo en el nivel superior.</strong>', rule2: '<strong>Llamar a los Hooks solo desde funciones React.</strong>',
    h2_pitfalls: 'Trampas comunes y soluciones',
    pitfall1_title: 'Closures obsoletos en useEffect', pitfall1_desc: 'Cuando se referencia estado sin incluirlo en dependencias.',
    pitfall2_title: 'Bucles infinitos con useEffect', pitfall2_desc: 'Establecer estado en useEffect sin dependencias correctas.',
    pitfall3_title: 'Dependencias de objeto/array', pitfall3_desc: 'Objetos y arrays se comparan por referencia.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Que son los React Hooks?', faq1_a: 'Funciones que permiten usar caracteristicas de React en componentes funcionales.',
    faq2_q: 'Diferencia entre useMemo y useCallback?', faq2_a: 'useMemo memoriza un valor, useCallback memoriza una funcion.',
    faq3_q: 'Cuando usar useReducer?', faq3_a: 'Cuando la logica de estado es compleja.',
    faq4_q: 'Hooks en componentes de clase?', faq4_a: 'No, solo en componentes funcionales.',
    faq5_q: 'Como evitar bucles infinitos?', faq5_a: 'Especificar siempre las dependencias correctas.',
    conclusion: 'Los React Hooks son esenciales para el desarrollo React moderno.',
  },
  pt: {
    intro: 'Os React Hooks revolucionaram a forma de escrever componentes React. Desde o React 16.8, os Hooks permitem usar estado, ciclo de vida e contexto em componentes funcionais. Este <strong>guia completo de React Hooks</strong> cobre cada Hook com exemplos praticos.',
    h2_useState: 'useState: Gerenciar estado', useStateDesc: '<code>useState</code> e o Hook mais fundamental.',
    h2_useEffect: 'useEffect: Efeitos colaterais e ciclo de vida', useEffectDesc: '<code>useEffect</code> permite realizar efeitos colaterais.',
    h2_useContext: 'useContext: Consumir contexto', useContextDesc: '<code>useContext</code> permite assinar o contexto React.',
    h2_useMemo: 'useMemo: Memorizar calculos caros', useMemoDesc: '<code>useMemo</code> armazena em cache o resultado de um calculo caro.',
    h2_useCallback: 'useCallback: Memorizar funcoes', useCallbackDesc: '<code>useCallback</code> retorna uma versao memorizada de um callback.',
    h2_useRef: 'useRef: Referencias mutaveis', useRefDesc: '<code>useRef</code> retorna um objeto ref mutavel.',
    h2_useReducer: 'useReducer: Logica de estado complexa', useReducerDesc: '<code>useReducer</code> e uma alternativa ao <code>useState</code>.',
    h2_custom: 'Hooks personalizados: Logica reutilizavel', customDesc: 'Os Hooks personalizados extraem logica em funcoes reutilizaveis.',
    h2_rules: 'Regras dos Hooks', rulesDesc: 'Duas regras essenciais para os Hooks.',
    rule1: '<strong>Chame Hooks apenas no nivel superior.</strong>', rule2: '<strong>Chame Hooks apenas de funcoes React.</strong>',
    h2_pitfalls: 'Armadilhas comuns e solucoes',
    pitfall1_title: 'Closures obsoletas no useEffect', pitfall1_desc: 'Quando se referencia estado sem incluir nas dependencias.',
    pitfall2_title: 'Loops infinitos com useEffect', pitfall2_desc: 'Definir estado no useEffect sem dependencias corretas.',
    pitfall3_title: 'Dependencias de objeto/array', pitfall3_desc: 'Objetos e arrays sao comparados por referencia.',
    h2_faq: 'Perguntas frequentes',
    faq1_q: 'O que sao React Hooks?', faq1_a: 'Funcoes que permitem usar recursos do React em componentes funcionais.',
    faq2_q: 'Diferenca entre useMemo e useCallback?', faq2_a: 'useMemo memoriza um valor, useCallback memoriza uma funcao.',
    faq3_q: 'Quando usar useReducer?', faq3_a: 'Quando a logica de estado e complexa.',
    faq4_q: 'Hooks em componentes de classe?', faq4_a: 'Nao, apenas em componentes funcionais.',
    faq5_q: 'Como evitar loops infinitos?', faq5_a: 'Especificar sempre as dependencias corretas.',
    conclusion: 'Os React Hooks sao essenciais para o desenvolvimento React moderno.',
  },
  nl: {
    intro: 'React Hooks hebben de manier waarop we React-componenten schrijven veranderd. Sinds React 16.8 kun je state, lifecycle en context gebruiken in functionele componenten. Deze <strong>complete React Hooks gids</strong> behandelt elke Hook met praktische voorbeelden.',
    h2_useState: 'useState: State beheren', useStateDesc: '<code>useState</code> is de meest fundamentele Hook.',
    h2_useEffect: 'useEffect: Bijwerkingen en lifecycle', useEffectDesc: '<code>useEffect</code> maakt bijwerkingen mogelijk.',
    h2_useContext: 'useContext: Context consumeren', useContextDesc: '<code>useContext</code> abonneert op React-context.',
    h2_useMemo: 'useMemo: Dure berekeningen cachen', useMemoDesc: '<code>useMemo</code> cached het resultaat van dure berekeningen.',
    h2_useCallback: 'useCallback: Functies cachen', useCallbackDesc: '<code>useCallback</code> retourneert een gecachte versie van een callback.',
    h2_useRef: 'useRef: Muteerbare referenties', useRefDesc: '<code>useRef</code> retourneert een muteerbaar ref-object.',
    h2_useReducer: 'useReducer: Complexe state-logica', useReducerDesc: '<code>useReducer</code> is een alternatief voor <code>useState</code>.',
    h2_custom: 'Custom Hooks: Herbruikbare logica', customDesc: 'Custom Hooks extraheren componentlogica in herbruikbare functies.',
    h2_rules: 'Regels van Hooks', rulesDesc: 'Twee essentiele regels voor Hooks.',
    rule1: '<strong>Roep Hooks alleen aan op het hoogste niveau.</strong>', rule2: '<strong>Roep Hooks alleen aan vanuit React-functies.</strong>',
    h2_pitfalls: 'Veelvoorkomende valkuilen en oplossingen',
    pitfall1_title: 'Verouderde closures in useEffect', pitfall1_desc: 'Wanneer state gerefereerd wordt zonder het in de dependencies op te nemen.',
    pitfall2_title: 'Oneindige loops met useEffect', pitfall2_desc: 'State instellen in useEffect zonder correcte dependencies.',
    pitfall3_title: 'Object/array dependencies', pitfall3_desc: 'Objecten en arrays worden vergeleken op referentie.',
    h2_faq: 'Veelgestelde vragen',
    faq1_q: 'Wat zijn React Hooks?', faq1_a: 'Functies waarmee je React-features kunt gebruiken in functionele componenten.',
    faq2_q: 'Verschil tussen useMemo en useCallback?', faq2_a: 'useMemo cached een waarde, useCallback cached een functie.',
    faq3_q: 'Wanneer useReducer gebruiken?', faq3_a: 'Bij complexe state-logica.',
    faq4_q: 'Hooks in class-componenten?', faq4_a: 'Nee, alleen in functionele componenten.',
    faq5_q: 'Oneindige loops voorkomen?', faq5_a: 'Altijd de juiste dependency-array opgeven.',
    conclusion: 'React Hooks zijn essentieel voor moderne React-ontwikkeling.',
  },
  pl: {
    intro: 'React Hooks zrewolucjonizowaly sposob pisania komponentow React. Od wersji 16.8 Hooks pozwalaja uzywac stanu, cyklu zycia i kontekstu w komponentach funkcyjnych. Ten <strong>kompletny przewodnik po React Hooks</strong> omawia kazdy Hook z praktycznymi przykladami.',
    h2_useState: 'useState: Zarzadzanie stanem', useStateDesc: '<code>useState</code> to najbardziej podstawowy Hook.',
    h2_useEffect: 'useEffect: Efekty uboczne i cykl zycia', useEffectDesc: '<code>useEffect</code> umozliwia efekty uboczne.',
    h2_useContext: 'useContext: Konsumowanie kontekstu', useContextDesc: '<code>useContext</code> subskrybuje kontekst React.',
    h2_useMemo: 'useMemo: Zapamiętywanie kosztownych obliczen', useMemoDesc: '<code>useMemo</code> cachuje wynik kosztownych obliczen.',
    h2_useCallback: 'useCallback: Zapamiętywanie funkcji', useCallbackDesc: '<code>useCallback</code> zwraca zapamietana wersje callbacka.',
    h2_useRef: 'useRef: Mutowalne referencje', useRefDesc: '<code>useRef</code> zwraca mutowalny obiekt ref.',
    h2_useReducer: 'useReducer: Zlożona logika stanu', useReducerDesc: '<code>useReducer</code> to alternatywa dla <code>useState</code>.',
    h2_custom: 'Custom Hooks: Logika wielokrotnego uzytku', customDesc: 'Custom Hooks wyodrebniaja logike komponentow w funkcje wielokrotnego uzytku.',
    h2_rules: 'Zasady Hooks', rulesDesc: 'Dwie podstawowe zasady Hooks.',
    rule1: '<strong>Wywoluj Hooks tylko na najwyzszym poziomie.</strong>', rule2: '<strong>Wywoluj Hooks tylko z funkcji React.</strong>',
    h2_pitfalls: 'Typowe pulapki i rozwiazania',
    pitfall1_title: 'Nieaktualne domkniecia w useEffect', pitfall1_desc: 'Gdy stan jest referowany bez uwzglednienia w zaleznosniach.',
    pitfall2_title: 'Nieskonczone petle z useEffect', pitfall2_desc: 'Ustawianie stanu w useEffect bez poprawnych zaleznosci.',
    pitfall3_title: 'Zaleznosci obiektowe/tablicowe', pitfall3_desc: 'Obiekty i tablice sa porownywane przez referencje.',
    h2_faq: 'Czesto zadawane pytania',
    faq1_q: 'Czym sa React Hooks?', faq1_a: 'Funkcje umozliwiajace uzycie funkcji React w komponentach funkcyjnych.',
    faq2_q: 'Roznica miedzy useMemo a useCallback?', faq2_a: 'useMemo cachuje wartosc, useCallback cachuje funkcje.',
    faq3_q: 'Kiedy uzywac useReducer?', faq3_a: 'Gdy logika stanu jest zlożona.',
    faq4_q: 'Hooks w komponentach klasowych?', faq4_a: 'Nie, tylko w komponentach funkcyjnych.',
    faq5_q: 'Jak unikac nieskończonych petli?', faq5_a: 'Zawsze podawac poprawna tablice zaleznosci.',
    conclusion: 'React Hooks sa niezbedne w nowoczesnym rozwoju React.',
  },
  sv: {
    intro: 'React Hooks revolutionerade sattet att skriva React-komponenter. Sedan React 16.8 kan du anvanda state, lifecycle och kontext i funktionella komponenter. Denna <strong>kompletta React Hooks-guide</strong> gar igenom varje Hook med praktiska exempel.',
    h2_useState: 'useState: Hantera state', useStateDesc: '<code>useState</code> ar den mest grundlaggande Hooken.',
    h2_useEffect: 'useEffect: Sidoeffekter och lifecycle', useEffectDesc: '<code>useEffect</code> mojliggor sidoeffekter.',
    h2_useContext: 'useContext: Konsumera kontext', useContextDesc: '<code>useContext</code> prenumererar pa React-kontext.',
    h2_useMemo: 'useMemo: Cacha dyra berakningar', useMemoDesc: '<code>useMemo</code> cachar resultatet av dyra berakningar.',
    h2_useCallback: 'useCallback: Cacha funktioner', useCallbackDesc: '<code>useCallback</code> returnerar en cachad version av en callback.',
    h2_useRef: 'useRef: Muterbara referenser', useRefDesc: '<code>useRef</code> returnerar ett muterbart ref-objekt.',
    h2_useReducer: 'useReducer: Komplex state-logik', useReducerDesc: '<code>useReducer</code> ar ett alternativ till <code>useState</code>.',
    h2_custom: 'Custom Hooks: Ateranvandbar logik', customDesc: 'Custom Hooks extraherar komponentlogik till ateranvandbara funktioner.',
    h2_rules: 'Regler for Hooks', rulesDesc: 'Tva viktiga regler for Hooks.',
    rule1: '<strong>Anropa Hooks bara pa toppniva.</strong>', rule2: '<strong>Anropa Hooks bara fran React-funktioner.</strong>',
    h2_pitfalls: 'Vanliga fallgropar och losningar',
    pitfall1_title: 'Gamla closures i useEffect', pitfall1_desc: 'Nar state refereras utan att inkluderas i dependencies.',
    pitfall2_title: 'Oandliga loopar med useEffect', pitfall2_desc: 'Satta state i useEffect utan korrekta dependencies.',
    pitfall3_title: 'Objekt/array-dependencies', pitfall3_desc: 'Objekt och arrayer jamfors med referens.',
    h2_faq: 'Vanliga fragor',
    faq1_q: 'Vad ar React Hooks?', faq1_a: 'Funktioner som mojliggor React-funktioner i funktionella komponenter.',
    faq2_q: 'Skillnad mellan useMemo och useCallback?', faq2_a: 'useMemo cachar ett varde, useCallback cachar en funktion.',
    faq3_q: 'Nar anvanda useReducer?', faq3_a: 'Nar state-logiken ar komplex.',
    faq4_q: 'Hooks i klasskomponenter?', faq4_a: 'Nej, bara i funktionella komponenter.',
    faq5_q: 'Undvika oandliga loopar?', faq5_a: 'Ange alltid korrekt dependency-array.',
    conclusion: 'React Hooks ar essentiella for modern React-utveckling.',
  },
  no: {
    intro: 'React Hooks revolusjonerte maten a skrive React-komponenter pa. Siden React 16.8 kan du bruke state, lifecycle og kontekst i funksjonelle komponenter. Denne <strong>komplette React Hooks-guiden</strong> dekker hver Hook med praktiske eksempler.',
    h2_useState: 'useState: Handtere state', useStateDesc: '<code>useState</code> er den mest grunnleggende Hooken.',
    h2_useEffect: 'useEffect: Sideeffekter og lifecycle', useEffectDesc: '<code>useEffect</code> muliggjor sideeffekter.',
    h2_useContext: 'useContext: Konsumere kontekst', useContextDesc: '<code>useContext</code> abonnerer pa React-kontekst.',
    h2_useMemo: 'useMemo: Cache dyre beregninger', useMemoDesc: '<code>useMemo</code> cacher resultatet av dyre beregninger.',
    h2_useCallback: 'useCallback: Cache funksjoner', useCallbackDesc: '<code>useCallback</code> returnerer en cachet versjon av en callback.',
    h2_useRef: 'useRef: Muterbare referanser', useRefDesc: '<code>useRef</code> returnerer et muterbart ref-objekt.',
    h2_useReducer: 'useReducer: Kompleks state-logikk', useReducerDesc: '<code>useReducer</code> er et alternativ til <code>useState</code>.',
    h2_custom: 'Custom Hooks: Gjenbrukbar logikk', customDesc: 'Custom Hooks trekker ut komponentlogikk til gjenbrukbare funksjoner.',
    h2_rules: 'Regler for Hooks', rulesDesc: 'To viktige regler for Hooks.',
    rule1: '<strong>Kall Hooks bare pa toppniva.</strong>', rule2: '<strong>Kall Hooks bare fra React-funksjoner.</strong>',
    h2_pitfalls: 'Vanlige fallgruver og losninger',
    pitfall1_title: 'Utdaterte closures i useEffect', pitfall1_desc: 'Nar state refereres uten a inkluderes i dependencies.',
    pitfall2_title: 'Uendelige looper med useEffect', pitfall2_desc: 'Sette state i useEffect uten korrekte dependencies.',
    pitfall3_title: 'Objekt/array-dependencies', pitfall3_desc: 'Objekter og arrays sammenlignes med referanse.',
    h2_faq: 'Vanlige sporsmal',
    faq1_q: 'Hva er React Hooks?', faq1_a: 'Funksjoner som muliggjor React-funksjoner i funksjonelle komponenter.',
    faq2_q: 'Forskjell mellom useMemo og useCallback?', faq2_a: 'useMemo cacher en verdi, useCallback cacher en funksjon.',
    faq3_q: 'Nar bruke useReducer?', faq3_a: 'Nar state-logikken er kompleks.',
    faq4_q: 'Hooks i klassekomponenter?', faq4_a: 'Nei, bare i funksjonelle komponenter.',
    faq5_q: 'Unnga uendelige looper?', faq5_a: 'Alltid angi korrekt dependency-array.',
    conclusion: 'React Hooks er essensielle for moderne React-utvikling.',
  },
  zh: {
    intro: 'React Hooks 彻底改变了我们编写 React 组件的方式。自 React 16.8 起，Hooks 让你可以在函数组件中使用状态、生命周期方法、上下文等功能——无需类组件。本<strong>完整 React Hooks 指南</strong>通过实际示例介绍每个内置 Hook。',
    h2_useState: 'useState：管理组件状态',
    useStateDesc: '<code>useState</code> 是最基础的 Hook。它返回一个有状态的值和一个更新它的函数。',
    h2_useEffect: 'useEffect：副作用与生命周期',
    useEffectDesc: '<code>useEffect</code> 让你在函数组件中执行副作用，替代了 <code>componentDidMount</code>、<code>componentDidUpdate</code> 和 <code>componentWillUnmount</code>。',
    h2_useContext: 'useContext：消费上下文',
    useContextDesc: '<code>useContext</code> 让你无需嵌套 Consumer 组件即可订阅 React 上下文。',
    h2_useMemo: 'useMemo：缓存昂贵计算',
    useMemoDesc: '<code>useMemo</code> 在重新渲染之间缓存昂贵计算的结果。仅在依赖项更改时重新计算。',
    h2_useCallback: 'useCallback：缓存函数',
    useCallbackDesc: '<code>useCallback</code> 返回回调函数的缓存版本。在传递回调给优化的子组件时非常有用。',
    h2_useRef: 'useRef：可变引用',
    useRefDesc: '<code>useRef</code> 返回一个可变 ref 对象，其 <code>.current</code> 属性在渲染之间持久存在且不会触发重新渲染。',
    h2_useReducer: 'useReducer：复杂状态逻辑',
    useReducerDesc: '<code>useReducer</code> 是 <code>useState</code> 的替代方案，用于管理复杂的状态逻辑。它遵循 Redux 的 dispatch action 模式。',
    h2_custom: '自定义 Hooks：可复用逻辑',
    customDesc: '自定义 Hooks 让你将组件逻辑提取为可复用的函数。自定义 Hook 是以 <code>use</code> 开头的函数。',
    h2_rules: 'Hooks 规则',
    rulesDesc: '使用 Hooks 时必须遵循两条基本规则。',
    rule1: '<strong>只在顶层调用 Hooks。</strong>不要在循环、条件或嵌套函数中调用 Hooks。',
    rule2: '<strong>只从 React 函数中调用 Hooks。</strong>',
    h2_pitfalls: '常见陷阱与解决方案',
    pitfall1_title: 'useEffect 中的过时闭包', pitfall1_desc: '在 useEffect 中引用状态但未将其加入依赖数组时，你会得到过时闭包。',
    pitfall2_title: 'useEffect 的无限循环', pitfall2_desc: '在 useEffect 中设置状态但没有正确的依赖项会导致无限重新渲染。',
    pitfall3_title: '对象/数组依赖项', pitfall3_desc: '对象和数组按引用比较，而非按值比较。',
    h2_faq: '常见问题',
    faq1_q: '什么是 React Hooks？', faq1_a: 'React Hooks 是让你在函数组件中使用 React 特性（如状态、生命周期、上下文）的函数。',
    faq2_q: 'useMemo 和 useCallback 有什么区别？', faq2_a: 'useMemo 缓存计算值，useCallback 缓存函数引用。',
    faq3_q: '什么时候应该用 useReducer 而不是 useState？', faq3_a: '当状态逻辑复杂、涉及多个子值，或下一个状态依赖于前一个状态时。',
    faq4_q: '能在类组件中使用 Hooks 吗？', faq4_a: '不能，Hooks 只能在函数组件和自定义 Hooks 中使用。',
    faq5_q: '如何避免 useEffect 的无限循环？', faq5_a: '始终指定正确的依赖数组。空数组 [] 只在挂载时运行一次。',
    conclusion: 'React Hooks 是现代 React 开发的基础。掌握这些核心 Hooks，你就能高效构建任何 UI。',
  },
  ja: {
    intro: 'React HooksはReactコンポーネントの書き方を根本的に変えました。React 16.8以降、Hooksを使えばファンクショナルコンポーネントでstate、ライフサイクル、コンテキストなどを利用できます。この<strong>React Hooks完全ガイド</strong>は、各Hookを実践的な例で解説します。',
    h2_useState: 'useState：コンポーネントの状態管理', useStateDesc: '<code>useState</code>は最も基本的なHookです。',
    h2_useEffect: 'useEffect：副作用とライフサイクル', useEffectDesc: '<code>useEffect</code>でファンクショナルコンポーネントの副作用を実行できます。',
    h2_useContext: 'useContext：コンテキストの利用', useContextDesc: '<code>useContext</code>でConsumerコンポーネントなしにReactコンテキストを購読できます。',
    h2_useMemo: 'useMemo：高コスト計算のメモ化', useMemoDesc: '<code>useMemo</code>は高コスト計算の結果をキャッシュします。',
    h2_useCallback: 'useCallback：関数のメモ化', useCallbackDesc: '<code>useCallback</code>はメモ化されたコールバック関数を返します。',
    h2_useRef: 'useRef：ミュータブルな参照', useRefDesc: '<code>useRef</code>はミュータブルなrefオブジェクトを返します。',
    h2_useReducer: 'useReducer：複雑な状態ロジック', useReducerDesc: '<code>useReducer</code>は<code>useState</code>の代替で、複雑な状態ロジック向けです。',
    h2_custom: 'カスタムHooks：再利用可能なロジック', customDesc: 'カスタムHooksはコンポーネントロジックを再利用可能な関数に抽出します。',
    h2_rules: 'Hooksのルール', rulesDesc: 'Hooksの2つの基本ルール。',
    rule1: '<strong>Hooksはトップレベルでのみ呼び出す。</strong>', rule2: '<strong>HooksはReact関数からのみ呼び出す。</strong>',
    h2_pitfalls: 'よくある落とし穴と解決策',
    pitfall1_title: 'useEffectのstale closure', pitfall1_desc: '依存配列に含めずにstateを参照すると古い値を参照します。',
    pitfall2_title: 'useEffectの無限ループ', pitfall2_desc: '正しい依存配列なしにuseEffectでstateを設定すると無限ループになります。',
    pitfall3_title: 'オブジェクト/配列の依存関係', pitfall3_desc: 'オブジェクトと配列は参照で比較されます。',
    h2_faq: 'よくある質問',
    faq1_q: 'React Hooksとは？', faq1_a: 'ファンクショナルコンポーネントでReact機能を使用するための関数です。',
    faq2_q: 'useMemoとuseCallbackの違いは？', faq2_a: 'useMemoは値をキャッシュし、useCallbackは関数をキャッシュします。',
    faq3_q: 'useReducerを使うタイミングは？', faq3_a: '状態ロジックが複雑な場合。',
    faq4_q: 'クラスコンポーネントでHooksを使える？', faq4_a: 'いいえ、ファンクショナルコンポーネントでのみ使用できます。',
    faq5_q: '無限ループを避けるには？', faq5_a: '常に正しい依存配列を指定してください。',
    conclusion: 'React HooksはモダンなReact開発に不可欠です。',
  },
  ko: {
    intro: 'React Hooks는 React 컴포넌트 작성 방식을 혁신했습니다. React 16.8부터 Hooks를 사용하면 함수형 컴포넌트에서 state, lifecycle, context 등을 사용할 수 있습니다. 이 <strong>React Hooks 완전 가이드</strong>는 각 Hook을 실용적인 예제로 설명합니다.',
    h2_useState: 'useState: 컴포넌트 상태 관리', useStateDesc: '<code>useState</code>는 가장 기본적인 Hook입니다.',
    h2_useEffect: 'useEffect: 부수 효과와 생명주기', useEffectDesc: '<code>useEffect</code>로 함수형 컴포넌트에서 부수 효과를 수행합니다.',
    h2_useContext: 'useContext: 컨텍스트 소비', useContextDesc: '<code>useContext</code>로 Consumer 없이 React 컨텍스트를 구독합니다.',
    h2_useMemo: 'useMemo: 비싼 계산 메모이제이션', useMemoDesc: '<code>useMemo</code>는 비싼 계산 결과를 캐시합니다.',
    h2_useCallback: 'useCallback: 함수 메모이제이션', useCallbackDesc: '<code>useCallback</code>은 메모이제이션된 콜백을 반환합니다.',
    h2_useRef: 'useRef: 변경 가능한 참조', useRefDesc: '<code>useRef</code>는 변경 가능한 ref 객체를 반환합니다.',
    h2_useReducer: 'useReducer: 복잡한 상태 로직', useReducerDesc: '<code>useReducer</code>는 <code>useState</code>의 대안입니다.',
    h2_custom: '커스텀 Hooks: 재사용 가능한 로직', customDesc: '커스텀 Hooks는 컴포넌트 로직을 재사용 가능한 함수로 추출합니다.',
    h2_rules: 'Hooks 규칙', rulesDesc: 'Hooks의 두 가지 필수 규칙.',
    rule1: '<strong>Hooks는 최상위에서만 호출하세요.</strong>', rule2: '<strong>Hooks는 React 함수에서만 호출하세요.</strong>',
    h2_pitfalls: '흔한 함정과 해결책',
    pitfall1_title: 'useEffect의 stale closure', pitfall1_desc: '의존성 배열에 포함하지 않고 state를 참조하면 오래된 값을 봅니다.',
    pitfall2_title: 'useEffect 무한 루프', pitfall2_desc: '올바른 의존성 없이 useEffect에서 state를 설정하면 무한 루프가 발생합니다.',
    pitfall3_title: '객체/배열 의존성', pitfall3_desc: '객체와 배열은 참조로 비교됩니다.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'React Hooks란?', faq1_a: '함수형 컴포넌트에서 React 기능을 사용할 수 있게 하는 함수입니다.',
    faq2_q: 'useMemo와 useCallback의 차이?', faq2_a: 'useMemo는 값을 캐시하고, useCallback은 함수를 캐시합니다.',
    faq3_q: 'useReducer를 언제 사용?', faq3_a: '상태 로직이 복잡할 때.',
    faq4_q: '클래스 컴포넌트에서 Hooks 사용 가능?', faq4_a: '아니요, 함수형 컴포넌트에서만 가능합니다.',
    faq5_q: '무한 루프를 피하려면?', faq5_a: '항상 올바른 의존성 배열을 지정하세요.',
    conclusion: 'React Hooks는 현대 React 개발에 필수적입니다.',
  },
  id: {
    intro: 'React Hooks merevolusi cara menulis komponen React. Sejak React 16.8, Hooks memungkinkan Anda menggunakan state, lifecycle, dan konteks di komponen fungsional. <strong>Panduan lengkap React Hooks</strong> ini membahas setiap Hook dengan contoh praktis.',
    h2_useState: 'useState: Mengelola State', useStateDesc: '<code>useState</code> adalah Hook paling fundamental.',
    h2_useEffect: 'useEffect: Side Effects dan Lifecycle', useEffectDesc: '<code>useEffect</code> memungkinkan side effects di komponen fungsional.',
    h2_useContext: 'useContext: Mengonsumsi Context', useContextDesc: '<code>useContext</code> berlangganan React context tanpa Consumer.',
    h2_useMemo: 'useMemo: Memoize Kalkulasi Mahal', useMemoDesc: '<code>useMemo</code> meng-cache hasil kalkulasi mahal.',
    h2_useCallback: 'useCallback: Memoize Fungsi', useCallbackDesc: '<code>useCallback</code> mengembalikan versi memoize dari callback.',
    h2_useRef: 'useRef: Referensi Mutable', useRefDesc: '<code>useRef</code> mengembalikan objek ref mutable.',
    h2_useReducer: 'useReducer: Logika State Kompleks', useReducerDesc: '<code>useReducer</code> alternatif untuk <code>useState</code>.',
    h2_custom: 'Custom Hooks: Logika yang Dapat Digunakan Ulang', customDesc: 'Custom Hooks mengekstrak logika komponen menjadi fungsi yang dapat digunakan ulang.',
    h2_rules: 'Aturan Hooks', rulesDesc: 'Dua aturan penting untuk Hooks.',
    rule1: '<strong>Panggil Hooks hanya di level teratas.</strong>', rule2: '<strong>Panggil Hooks hanya dari fungsi React.</strong>',
    h2_pitfalls: 'Jebakan umum dan solusi',
    pitfall1_title: 'Stale closure di useEffect', pitfall1_desc: 'Saat state direferensikan tanpa dimasukkan dalam dependencies.',
    pitfall2_title: 'Loop tak terbatas dengan useEffect', pitfall2_desc: 'Mengatur state di useEffect tanpa dependencies yang benar.',
    pitfall3_title: 'Dependencies objek/array', pitfall3_desc: 'Objek dan array dibandingkan berdasarkan referensi.',
    h2_faq: 'Pertanyaan yang sering diajukan',
    faq1_q: 'Apa itu React Hooks?', faq1_a: 'Fungsi yang memungkinkan fitur React di komponen fungsional.',
    faq2_q: 'Perbedaan useMemo dan useCallback?', faq2_a: 'useMemo meng-cache nilai, useCallback meng-cache fungsi.',
    faq3_q: 'Kapan menggunakan useReducer?', faq3_a: 'Saat logika state kompleks.',
    faq4_q: 'Hooks di komponen kelas?', faq4_a: 'Tidak, hanya di komponen fungsional.',
    faq5_q: 'Menghindari loop tak terbatas?', faq5_a: 'Selalu tentukan dependency array yang benar.',
    conclusion: 'React Hooks sangat penting untuk pengembangan React modern.',
  },
  th: {
    intro: 'React Hooks ปฏิวัติวิธีการเขียน React components ตั้งแต่ React 16.8 Hooks ช่วยให้คุณใช้ state, lifecycle และ context ใน functional components ได้ <strong>คู่มือ React Hooks ฉบับสมบูรณ์</strong>นี้ครอบคลุมทุก Hook พร้อมตัวอย่างจริง',
    h2_useState: 'useState: จัดการ State', useStateDesc: '<code>useState</code> เป็น Hook พื้นฐานที่สุด',
    h2_useEffect: 'useEffect: Side Effects และ Lifecycle', useEffectDesc: '<code>useEffect</code> ช่วยให้ทำ side effects ใน function components',
    h2_useContext: 'useContext: ใช้งาน Context', useContextDesc: '<code>useContext</code> subscribe React context โดยไม่ต้อง Consumer',
    h2_useMemo: 'useMemo: Cache การคำนวณราคาแพง', useMemoDesc: '<code>useMemo</code> cache ผลลัพธ์ของการคำนวณราคาแพง',
    h2_useCallback: 'useCallback: Cache ฟังก์ชัน', useCallbackDesc: '<code>useCallback</code> คืนเวอร์ชัน cache ของ callback',
    h2_useRef: 'useRef: Mutable References', useRefDesc: '<code>useRef</code> คืน mutable ref object',
    h2_useReducer: 'useReducer: State Logic ที่ซับซ้อน', useReducerDesc: '<code>useReducer</code> เป็นทางเลือกของ <code>useState</code>',
    h2_custom: 'Custom Hooks: Logic ที่ใช้ซ้ำได้', customDesc: 'Custom Hooks แยก component logic เป็นฟังก์ชันที่ใช้ซ้ำได้',
    h2_rules: 'กฎของ Hooks', rulesDesc: 'กฎสำคัญ 2 ข้อของ Hooks',
    rule1: '<strong>เรียก Hooks ที่ระดับบนสุดเท่านั้น</strong>', rule2: '<strong>เรียก Hooks จากฟังก์ชัน React เท่านั้น</strong>',
    h2_pitfalls: 'กับดักทั่วไปและวิธีแก้',
    pitfall1_title: 'Stale closure ใน useEffect', pitfall1_desc: 'เมื่ออ้างอิง state โดยไม่รวมใน dependencies',
    pitfall2_title: 'Loop ไม่สิ้นสุดกับ useEffect', pitfall2_desc: 'ตั้ง state ใน useEffect โดยไม่มี dependencies ที่ถูกต้อง',
    pitfall3_title: 'Object/array dependencies', pitfall3_desc: 'Objects และ arrays เปรียบเทียบโดย reference',
    h2_faq: 'คำถามที่พบบ่อย',
    faq1_q: 'React Hooks คืออะไร?', faq1_a: 'ฟังก์ชันที่ช่วยให้ใช้ฟีเจอร์ React ใน functional components',
    faq2_q: 'ความแตกต่างระหว่าง useMemo กับ useCallback?', faq2_a: 'useMemo cache ค่า, useCallback cache ฟังก์ชัน',
    faq3_q: 'เมื่อไหร่ควรใช้ useReducer?', faq3_a: 'เมื่อ state logic ซับซ้อน',
    faq4_q: 'ใช้ Hooks ใน class components ได้ไหม?', faq4_a: 'ไม่ได้ ใช้ได้เฉพาะ functional components',
    faq5_q: 'หลีกเลี่ยง loop ไม่สิ้นสุดอย่างไร?', faq5_a: 'ระบุ dependency array ที่ถูกต้องเสมอ',
    conclusion: 'React Hooks จำเป็นสำหรับการพัฒนา React สมัยใหม่',
  },
};

export default function ReactHooksCompleteGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

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

      {/* ==================== useState ==================== */}
      <h2>{s.h2_useState}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.useStateDesc }} />
      <pre><code>{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
    </div>
  );
}

// Lazy initialization — runs only on first render
const [data, setData] = useState(() => {
  return JSON.parse(localStorage.getItem('data') || '{}');
});

// Updating objects — always create a new object
const [user, setUser] = useState({ name: '', age: 0 });
setUser(prev => ({ ...prev, name: 'Alice' }));

// Updating arrays — use spread or filter/map
const [items, setItems] = useState<string[]>([]);
setItems(prev => [...prev, 'new item']);
setItems(prev => prev.filter(item => item !== 'remove me'));`}</code></pre>

      {/* ==================== useEffect ==================== */}
      <h2>{s.h2_useEffect}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.useEffectDesc }} />
      <pre><code>{`import { useEffect, useState } from 'react';

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);

  // Runs when userId changes (componentDidMount + componentDidUpdate)
  useEffect(() => {
    let cancelled = false;
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setUser(data);
      });

    // Cleanup function (componentWillUnmount)
    return () => { cancelled = true; };
  }, [userId]); // dependency array

  return <div>{user?.name}</div>;
}

// Run once on mount
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []); // empty dependency array

// Run on every render (rarely needed)
useEffect(() => {
  console.log('Component rendered');
}); // no dependency array`}</code></pre>

      {/* ==================== useContext ==================== */}
      <h2>{s.h2_useContext}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.useContextDesc }} />
      <pre><code>{`import { createContext, useContext, useState } from 'react';

// 1. Create a context with a default value
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | null>(null);

// 2. Create a provider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume context with useContext
function ThemeButton() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('Must be inside ThemeProvider');

  return (
    <button onClick={ctx.toggleTheme}>
      Current: {ctx.theme}
    </button>
  );
}

// 4. Custom hook for cleaner usage
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}`}</code></pre>

      {/* ==================== useMemo ==================== */}
      <h2>{s.h2_useMemo}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.useMemoDesc }} />
      <pre><code>{`import { useMemo, useState } from 'react';

function ExpensiveList({ items, filter }: { items: Item[]; filter: string }) {
  // Only recalculates when items or filter changes
  const filteredItems = useMemo(() => {
    console.log('Filtering...');
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  // Memoize a sorted copy
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredItems]);

  return (
    <ul>
      {sortedItems.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

// Do NOT overuse useMemo — only for truly expensive computations
// Simple operations do not need memoization
const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items]);`}</code></pre>

      {/* ==================== useCallback ==================== */}
      <h2>{s.h2_useCallback}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.useCallbackDesc }} />
      <pre><code>{`import { useCallback, useState, memo } from 'react';

// Child component wrapped in memo — only re-renders if props change
const SearchInput = memo(({ onSearch }: { onSearch: (q: string) => void }) => {
  console.log('SearchInput rendered');
  return <input onChange={e => onSearch(e.target.value)} />;
});

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Without useCallback, a new function is created every render
  // causing SearchInput to re-render unnecessarily
  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    fetch(\`/api/search?q=\${q}\`)
      .then(res => res.json())
      .then(setResults);
  }, []); // stable reference

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>
    </div>
  );
}`}</code></pre>

      {/* ==================== useRef ==================== */}
      <h2>{s.h2_useRef}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.useRefDesc }} />
      <pre><code>{`import { useRef, useEffect, useState } from 'react';

function TextInputWithFocus() {
  // DOM reference
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus(); // auto-focus on mount
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused" />;
}

function StopWatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Track previous value
  const prevTimeRef = useRef(time);
  useEffect(() => { prevTimeRef.current = time; });

  return (
    <div>
      <p>Time: {time}s (prev: {prevTimeRef.current}s)</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}`}</code></pre>

      {/* ==================== useReducer ==================== */}
      <h2>{s.h2_useReducer}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.useReducerDesc }} />
      <pre><code>{`import { useReducer } from 'react';

interface State {
  count: number;
  step: number;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setStep'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'reset':
      return { count: 0, step: 1 };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <input
        type="number"
        value={state.step}
        onChange={e => dispatch({ type: 'setStep', payload: Number(e.target.value) })}
      />
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}`}</code></pre>

      {/* ==================== Custom Hooks ==================== */}
      <h2>{s.h2_custom}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.customDesc }} />
      <pre><code>{`// useLocalStorage — persist state to localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// useDebounce — debounce a rapidly changing value
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// useFetch — generic data fetching
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => { if (!cancelled) { setData(data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err); setLoading(false); } });
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  const debouncedName = useDebounce(name, 300);
  const { data, loading } = useFetch<User[]>(\`/api/search?q=\${debouncedName}\`);
}`}</code></pre>

      {/* ==================== Rules ==================== */}
      <h2>{s.h2_rules}</h2>
      <p>{s.rulesDesc}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: s.rule1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.rule2 }} />
      </ul>
      <pre><code>{`// WRONG — Hook inside a condition
function Bad({ isLoggedIn }) {
  if (isLoggedIn) {
    const [user, setUser] = useState(null); // breaks Hook order
  }
}

// CORRECT — condition inside the Hook
function Good({ isLoggedIn }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (isLoggedIn) fetchUser().then(setUser);
  }, [isLoggedIn]);
}`}</code></pre>

      {/* ==================== Pitfalls ==================== */}
      <h2>{s.h2_pitfalls}</h2>

      <h3>{s.pitfall1_title}</h3>
      <p>{s.pitfall1_desc}</p>
      <pre><code>{`// BUG: stale closure
function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // always logs 0 (stale!)
      setCount(count + 1); // always sets to 1
    }, 1000);
    return () => clearInterval(id);
  }, []); // count is missing from dependencies
}

// FIX: use functional update
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1); // always uses latest value
  }, 1000);
  return () => clearInterval(id);
}, []); // safe with functional update`}</code></pre>

      <h3>{s.pitfall2_title}</h3>
      <p>{s.pitfall2_desc}</p>
      <pre><code>{`// BUG: infinite loop
useEffect(() => {
  setCount(count + 1); // triggers re-render, which runs effect again
}); // no dependency array = runs every render

// FIX: add dependency array
useEffect(() => {
  if (count < 10) setCount(count + 1);
}, [count]); // only runs when count changes`}</code></pre>

      <h3>{s.pitfall3_title}</h3>
      <p>{s.pitfall3_desc}</p>
      <pre><code>{`// BUG: new object every render
function App() {
  const options = { page: 1, limit: 10 }; // new ref each render
  useEffect(() => {
    fetchData(options);
  }, [options]); // runs every render!
}

// FIX: useMemo to stabilize the reference
function App() {
  const options = useMemo(() => ({ page: 1, limit: 10 }), []);
  useEffect(() => {
    fetchData(options);
  }, [options]); // stable reference
}`}</code></pre>

      {/* ==================== FAQ ==================== */}
      <h2>{s.h2_faq}</h2>
      <details><summary><strong>{s.faq1_q}</strong></summary><p>{s.faq1_a}</p></details>
      <details><summary><strong>{s.faq2_q}</strong></summary><p>{s.faq2_a}</p></details>
      <details><summary><strong>{s.faq3_q}</strong></summary><p>{s.faq3_a}</p></details>
      <details><summary><strong>{s.faq4_q}</strong></summary><p>{s.faq4_a}</p></details>
      <details><summary><strong>{s.faq5_q}</strong></summary><p>{s.faq5_a}</p></details>

      <p><strong>{s.conclusion}</strong></p>
    </>
  );
}
