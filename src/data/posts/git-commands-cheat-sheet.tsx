import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Whether you are a beginner just getting started or an experienced developer who needs a quick reference, this <strong>comprehensive Git commands cheat sheet</strong> covers every essential command you need for day-to-day version control. Each command includes practical examples with commonly used flags so you can copy-paste and adapt them to your workflow immediately.',
    link_tool: 'Generate Git commands interactively with our Git Command Generator \u2192',
    h2_setup: 'Setup & Configuration',
    p_setup: 'Before you start working with Git, you need to configure your identity and initialize repositories. These commands establish the foundation for all your version control activities.',
    h2_basic: 'Basic Workflow',
    p_basic: 'These are the commands you will use dozens of times every day. They form the core add-commit cycle that tracks your changes.',
    h2_branching: 'Branching & Merging',
    p_branching: 'Branches let you work on features, fixes, and experiments in isolation. Mastering branching is what separates Git beginners from power users.',
    h2_remote: 'Remote Operations',
    p_remote: 'Remote commands let you collaborate with others by syncing your local repository with shared repositories on platforms like GitHub, GitLab, or Bitbucket.',
    h2_history: 'History & Inspection',
    p_history: 'Git stores every change ever made to your project. These commands help you search through history, find who changed what, and recover lost work.',
    h2_undo: 'Undoing Changes',
    p_undo: 'Everyone makes mistakes. Git provides several powerful mechanisms to undo changes at every stage, from uncommitted edits to published commits.',
    h2_advanced: 'Advanced Commands',
    p_advanced: 'These commands are less commonly used but incredibly powerful in the right situations. They can save you hours of debugging or complex refactoring.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between git merge and git rebase?',
    faq1_a: 'Both integrate changes from one branch into another, but they work differently. git merge creates a new merge commit that joins two branches, preserving the full branch history. git rebase replays your commits on top of the target branch, creating a linear history. Use merge for shared branches and rebase for local feature branches before merging. Rebase rewrites commit history, so never rebase commits that have been pushed to a shared remote.',
    faq2_q: 'How do I undo the last commit without losing changes?',
    faq2_a: 'Use "git reset --soft HEAD~1" to undo the last commit while keeping all changes staged. Use "git reset --mixed HEAD~1" (or just "git reset HEAD~1") to undo the commit and unstage the changes but keep them in your working directory. Only use "git reset --hard HEAD~1" if you want to completely discard the commit and all its changes.',
    faq3_q: 'What is the difference between git fetch and git pull?',
    faq3_a: 'git fetch downloads new data from the remote repository but does not modify your working directory or current branch. It updates your remote-tracking branches (e.g., origin/main) so you can inspect changes before integrating them. git pull is essentially git fetch followed by git merge \u2014 it downloads and immediately integrates remote changes into your current branch. Use fetch when you want to review changes first; use pull when you want to update immediately.',
    faq4_q: 'How do I resolve merge conflicts?',
    faq4_a: 'When a merge conflict occurs, Git marks the conflicting sections in the affected files with <<<<<<<, =======, and >>>>>>> markers. Open each conflicted file, decide which changes to keep (or combine both), remove the conflict markers, then stage the resolved files with "git add" and complete the merge with "git commit". Tools like VS Code, IntelliJ, and git mergetool can provide a visual side-by-side diff to make resolving easier.',
    faq5_q: 'How do I remove a file from Git tracking without deleting it?',
    faq5_a: 'Use "git rm --cached filename" to remove a file from Git tracking while keeping it on your local filesystem. This is useful when you accidentally committed a file that should be in .gitignore (like .env or node_modules). After running the command, add the file path to your .gitignore file and commit both changes.',
    p_conclusion: 'Bookmark this cheat sheet and refer back to it whenever you need a quick command reference. For an interactive experience, try our Git Command Generator tool below.',
    link_tool_bottom: 'Try the Git Command Generator \u2192',
  },
  fr: {
    intro: 'Que vous soyez d\u00e9butant ou d\u00e9veloppeur exp\u00e9riment\u00e9, cette <strong>fiche compl\u00e8te des commandes Git</strong> couvre toutes les commandes essentielles pour le contr\u00f4le de version au quotidien. Chaque commande inclut des exemples pratiques avec les flags les plus utilis\u00e9s.',
    link_tool: 'G\u00e9n\u00e9rez des commandes Git avec notre G\u00e9n\u00e9rateur de commandes Git \u2192',
    h2_setup: 'Configuration initiale',
    p_setup: 'Avant de commencer avec Git, configurez votre identit\u00e9 et initialisez vos d\u00e9p\u00f4ts. Ces commandes sont le fondement du contr\u00f4le de version.',
    h2_basic: 'Flux de travail de base',
    p_basic: 'Ces commandes sont utilis\u00e9es des dizaines de fois par jour. Elles forment le cycle add-commit qui suit vos modifications.',
    h2_branching: 'Branches et fusions',
    p_branching: 'Les branches permettent de travailler sur des fonctionnalit\u00e9s et corrections en isolation. Ma\u00eetriser les branches fait la diff\u00e9rence.',
    h2_remote: 'Op\u00e9rations distantes',
    p_remote: 'Les commandes distantes synchronisent votre d\u00e9p\u00f4t local avec les d\u00e9p\u00f4ts partag\u00e9s sur GitHub, GitLab ou Bitbucket.',
    h2_history: 'Historique et inspection',
    p_history: 'Git stocke chaque modification. Ces commandes permettent de parcourir l\u2019historique, trouver qui a modifi\u00e9 quoi et r\u00e9cup\u00e9rer du travail perdu.',
    h2_undo: 'Annuler des modifications',
    p_undo: 'Tout le monde fait des erreurs. Git offre des m\u00e9canismes puissants pour annuler des changements \u00e0 chaque \u00e9tape.',
    h2_advanced: 'Commandes avanc\u00e9es',
    p_advanced: 'Ces commandes sont moins courantes mais incroyablement puissantes dans les bonnes situations.',
    h2_faq: 'Questions fr\u00e9quentes',
    faq1_q: 'Quelle est la diff\u00e9rence entre git merge et git rebase ?',
    faq1_a: 'Les deux int\u00e8grent des changements mais diff\u00e9remment. git merge cr\u00e9e un commit de fusion pr\u00e9servant l\u2019historique complet. git rebase rejoue vos commits sur la branche cible, cr\u00e9ant un historique lin\u00e9aire. Utilisez merge pour les branches partag\u00e9es et rebase pour les branches locales.',
    faq2_q: 'Comment annuler le dernier commit sans perdre les modifications ?',
    faq2_a: 'Utilisez "git reset --soft HEAD~1" pour annuler le dernier commit en gardant les modifications index\u00e9es. "git reset HEAD~1" pour d\u00e9sindexer les modifications tout en les gardant.',
    faq3_q: 'Quelle diff\u00e9rence entre git fetch et git pull ?',
    faq3_a: 'git fetch t\u00e9l\u00e9charge les donn\u00e9es du d\u00e9p\u00f4t distant sans modifier votre branche. git pull est un fetch suivi d\u2019un merge \u2014 il int\u00e8gre imm\u00e9diatement les modifications distantes.',
    faq4_q: 'Comment r\u00e9soudre des conflits de fusion ?',
    faq4_a: 'Git marque les sections conflictuelles avec <<<<<<<, ======= et >>>>>>>. Ouvrez chaque fichier, d\u00e9cidez des changements \u00e0 garder, supprimez les marqueurs, puis "git add" et "git commit".',
    faq5_q: 'Comment retirer un fichier du suivi Git sans le supprimer ?',
    faq5_a: 'Utilisez "git rm --cached fichier" pour retirer le suivi tout en gardant le fichier localement. Ajoutez-le ensuite \u00e0 .gitignore.',
    p_conclusion: 'Gardez cette fiche en favori. Pour une exp\u00e9rience interactive, essayez notre outil ci-dessous.',
    link_tool_bottom: 'Essayer le G\u00e9n\u00e9rateur de commandes Git \u2192',
  },
  de: {
    intro: 'Ob Anf\u00e4nger oder erfahrener Entwickler \u2014 dieses <strong>umfassende Git-Befehle Cheat Sheet</strong> deckt alle wesentlichen Befehle f\u00fcr die t\u00e4gliche Versionskontrolle ab. Jeder Befehl enth\u00e4lt praktische Beispiele mit g\u00e4ngigen Flags.',
    link_tool: 'Git-Befehle interaktiv generieren mit unserem Git Command Generator \u2192',
    h2_setup: 'Einrichtung & Konfiguration',
    p_setup: 'Bevor Sie mit Git arbeiten, konfigurieren Sie Ihre Identit\u00e4t und initialisieren Sie Repositories.',
    h2_basic: 'Grundlegender Workflow',
    p_basic: 'Diese Befehle verwenden Sie t\u00e4glich dutzende Male. Sie bilden den Kern des Add-Commit-Zyklus.',
    h2_branching: 'Branching & Merging',
    p_branching: 'Branches erm\u00f6glichen isoliertes Arbeiten an Features und Fixes. Die Beherrschung von Branches unterscheidet Anf\u00e4nger von Power-Usern.',
    h2_remote: 'Remote-Operationen',
    p_remote: 'Remote-Befehle synchronisieren Ihr lokales Repository mit geteilten Repositories auf GitHub, GitLab oder Bitbucket.',
    h2_history: 'Verlauf & Inspektion',
    p_history: 'Git speichert jede jemals vorgenommene \u00c4nderung. Diese Befehle helfen beim Durchsuchen der Historie und bei der Wiederherstellung verlorener Arbeit.',
    h2_undo: '\u00c4nderungen r\u00fcckg\u00e4ngig machen',
    p_undo: 'Jeder macht Fehler. Git bietet leistungsstarke Mechanismen zum R\u00fcckg\u00e4ngigmachen von \u00c4nderungen.',
    h2_advanced: 'Fortgeschrittene Befehle',
    p_advanced: 'Diese Befehle werden seltener verwendet, sind aber in bestimmten Situationen \u00e4u\u00dferst leistungsf\u00e4hig.',
    h2_faq: 'H\u00e4ufig gestellte Fragen',
    faq1_q: 'Was ist der Unterschied zwischen git merge und git rebase?',
    faq1_a: 'Beide integrieren \u00c4nderungen, aber unterschiedlich. git merge erstellt einen Merge-Commit. git rebase spielt Commits auf der Zielbranch ab und erstellt eine lineare Historie. Verwenden Sie merge f\u00fcr gemeinsame Branches und rebase f\u00fcr lokale Feature-Branches.',
    faq2_q: 'Wie mache ich den letzten Commit r\u00fcckg\u00e4ngig ohne \u00c4nderungen zu verlieren?',
    faq2_a: 'Verwenden Sie "git reset --soft HEAD~1" zum R\u00fcckg\u00e4ngigmachen und Beibehalten der ge\u00e4nderten Dateien.',
    faq3_q: 'Was ist der Unterschied zwischen git fetch und git pull?',
    faq3_a: 'git fetch l\u00e4dt Daten vom Remote herunter ohne Ihre Arbeit zu \u00e4ndern. git pull ist ein fetch gefolgt von einem merge \u2014 \u00c4nderungen werden sofort integriert.',
    faq4_q: 'Wie l\u00f6se ich Merge-Konflikte?',
    faq4_a: 'Git markiert konfliktierende Abschnitte mit <<<<<<<, ======= und >>>>>>>. \u00d6ffnen Sie die Dateien, entscheiden Sie, welche \u00c4nderungen bleiben, entfernen Sie die Marker und committen Sie.',
    faq5_q: 'Wie entferne ich eine Datei aus dem Git-Tracking ohne sie zu l\u00f6schen?',
    faq5_a: 'Verwenden Sie "git rm --cached dateiname". F\u00fcgen Sie die Datei dann zu .gitignore hinzu.',
    p_conclusion: 'Speichern Sie dieses Cheat Sheet als Lesezeichen. F\u00fcr eine interaktive Erfahrung nutzen Sie unseren Git Command Generator.',
    link_tool_bottom: 'Git Command Generator ausprobieren \u2192',
  },
  es: {
    intro: 'Ya seas principiante o desarrollador experimentado, esta <strong>hoja de referencia completa de comandos Git</strong> cubre todos los comandos esenciales para el control de versiones diario. Cada comando incluye ejemplos pr\u00e1cticos con flags de uso com\u00fan.',
    link_tool: 'Genera comandos Git con nuestro Generador de Comandos Git \u2192',
    h2_setup: 'Configuraci\u00f3n inicial',
    p_setup: 'Antes de trabajar con Git, configura tu identidad e inicializa repositorios. Estos comandos son la base del control de versiones.',
    h2_basic: 'Flujo de trabajo b\u00e1sico',
    p_basic: 'Estos comandos los usar\u00e1s docenas de veces cada d\u00eda. Forman el ciclo add-commit que rastrea tus cambios.',
    h2_branching: 'Ramas y fusiones',
    p_branching: 'Las ramas permiten trabajar en funcionalidades y correcciones de forma aislada. Dominar las ramas diferencia a los principiantes de los expertos.',
    h2_remote: 'Operaciones remotas',
    p_remote: 'Los comandos remotos sincronizan tu repositorio local con repositorios compartidos en GitHub, GitLab o Bitbucket.',
    h2_history: 'Historial e inspecci\u00f3n',
    p_history: 'Git almacena cada cambio realizado. Estos comandos ayudan a buscar en el historial, encontrar qui\u00e9n cambi\u00f3 qu\u00e9 y recuperar trabajo perdido.',
    h2_undo: 'Deshacer cambios',
    p_undo: 'Todos cometemos errores. Git proporciona mecanismos poderosos para deshacer cambios en cada etapa.',
    h2_advanced: 'Comandos avanzados',
    p_advanced: 'Estos comandos se usan con menos frecuencia pero son incre\u00edblemente poderosos en las situaciones correctas.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: '\u00bfCu\u00e1l es la diferencia entre git merge y git rebase?',
    faq1_a: 'Ambos integran cambios pero de forma diferente. git merge crea un commit de fusi\u00f3n preservando el historial completo. git rebase reproduce tus commits sobre la rama destino, creando un historial lineal. Usa merge para ramas compartidas y rebase para ramas locales.',
    faq2_q: '\u00bfC\u00f3mo deshago el \u00faltimo commit sin perder cambios?',
    faq2_a: 'Usa "git reset --soft HEAD~1" para deshacer el \u00faltimo commit manteniendo los cambios preparados.',
    faq3_q: '\u00bfCu\u00e1l es la diferencia entre git fetch y git pull?',
    faq3_a: 'git fetch descarga datos del remoto sin modificar tu rama. git pull es un fetch seguido de un merge \u2014 integra los cambios remotos inmediatamente.',
    faq4_q: '\u00bfC\u00f3mo resuelvo conflictos de fusi\u00f3n?',
    faq4_a: 'Git marca las secciones conflictivas con <<<<<<<, ======= y >>>>>>>. Abre cada archivo, decide qu\u00e9 cambios mantener, elimina los marcadores y luego "git add" y "git commit".',
    faq5_q: '\u00bfC\u00f3mo elimino un archivo del seguimiento de Git sin borrarlo?',
    faq5_a: 'Usa "git rm --cached archivo" para eliminarlo del seguimiento manteniendo el archivo local. A\u00f1\u00e1delo a .gitignore despu\u00e9s.',
    p_conclusion: 'Guarda esta hoja de referencia en favoritos. Para una experiencia interactiva, prueba nuestro Generador de Comandos Git.',
    link_tool_bottom: 'Probar el Generador de Comandos Git \u2192',
  },
  zh: {
    intro: '\u65e0\u8bba\u4f60\u662f\u521a\u5165\u95e8\u7684\u65b0\u624b\u8fd8\u662f\u9700\u8981\u5feb\u901f\u67e5\u9605\u7684\u7ecf\u9a8c\u4e30\u5bcc\u7684\u5f00\u53d1\u8005\uff0c\u8fd9\u4efd<strong>\u5168\u9762\u7684 Git \u547d\u4ee4\u901f\u67e5\u8868</strong>\u6db5\u76d6\u4e86\u65e5\u5e38\u7248\u672c\u63a7\u5236\u6240\u9700\u7684\u6bcf\u4e00\u4e2a\u57fa\u672c\u547d\u4ee4\u3002\u6bcf\u4e2a\u547d\u4ee4\u90fd\u5305\u542b\u5e38\u7528\u6807\u5fd7\u7684\u5b9e\u9645\u793a\u4f8b\uff0c\u4fbf\u4e8e\u4f60\u7acb\u5373\u590d\u5236\u5e76\u5e94\u7528\u5230\u5de5\u4f5c\u6d41\u4e2d\u3002',
    link_tool: '\u4f7f\u7528\u6211\u4eec\u7684 Git \u547d\u4ee4\u751f\u6210\u5668\u4ea4\u4e92\u5f0f\u751f\u6210\u547d\u4ee4 \u2192',
    h2_setup: '\u521d\u59cb\u8bbe\u7f6e\u4e0e\u914d\u7f6e',
    p_setup: '\u5728\u5f00\u59cb\u4f7f\u7528 Git \u4e4b\u524d\uff0c\u4f60\u9700\u8981\u914d\u7f6e\u8eab\u4efd\u5e76\u521d\u59cb\u5316\u4ed3\u5e93\u3002\u8fd9\u4e9b\u547d\u4ee4\u662f\u6240\u6709\u7248\u672c\u63a7\u5236\u6d3b\u52a8\u7684\u57fa\u7840\u3002',
    h2_basic: '\u57fa\u672c\u5de5\u4f5c\u6d41',
    p_basic: '\u8fd9\u4e9b\u662f\u4f60\u6bcf\u5929\u4f1a\u7528\u5230\u65e0\u6570\u6b21\u7684\u547d\u4ee4\uff0c\u5b83\u4eec\u6784\u6210\u4e86\u8ddf\u8e2a\u53d8\u66f4\u7684\u6838\u5fc3 add-commit \u5faa\u73af\u3002',
    h2_branching: '\u5206\u652f\u4e0e\u5408\u5e76',
    p_branching: '\u5206\u652f\u8ba9\u4f60\u53ef\u4ee5\u5728\u9694\u79bb\u73af\u5883\u4e2d\u5f00\u53d1\u529f\u80fd\u3001\u4fee\u590d\u548c\u5b9e\u9a8c\u3002\u638c\u63e1\u5206\u652f\u662f Git \u521d\u5b66\u8005\u548c\u9ad8\u624b\u7684\u5206\u6c34\u5cad\u3002',
    h2_remote: '\u8fdc\u7a0b\u64cd\u4f5c',
    p_remote: '\u8fdc\u7a0b\u547d\u4ee4\u8ba9\u4f60\u901a\u8fc7\u5c06\u672c\u5730\u4ed3\u5e93\u4e0e GitHub\u3001GitLab \u6216 Bitbucket \u4e0a\u7684\u5171\u4eab\u4ed3\u5e93\u540c\u6b65\u6765\u4e0e\u4ed6\u4eba\u534f\u4f5c\u3002',
    h2_history: '\u5386\u53f2\u4e0e\u68c0\u67e5',
    p_history: 'Git \u5b58\u50a8\u4e86\u9879\u76ee\u4e2d\u7684\u6bcf\u4e00\u6b21\u53d8\u66f4\u3002\u8fd9\u4e9b\u547d\u4ee4\u5e2e\u52a9\u4f60\u641c\u7d22\u5386\u53f2\u3001\u67e5\u627e\u8c01\u4fee\u6539\u4e86\u4ec0\u4e48\u4ee5\u53ca\u6062\u590d\u4e22\u5931\u7684\u5de5\u4f5c\u3002',
    h2_undo: '\u64a4\u9500\u53d8\u66f4',
    p_undo: '\u6bcf\u4e2a\u4eba\u90fd\u4f1a\u72af\u9519\u3002Git \u63d0\u4f9b\u4e86\u5f3a\u5927\u7684\u673a\u5236\u6765\u64a4\u9500\u5404\u4e2a\u9636\u6bb5\u7684\u53d8\u66f4\u3002',
    h2_advanced: '\u9ad8\u7ea7\u547d\u4ee4',
    p_advanced: '\u8fd9\u4e9b\u547d\u4ee4\u4e0d\u592a\u5e38\u7528\uff0c\u4f46\u5728\u7279\u5b9a\u573a\u666f\u4e0b\u975e\u5e38\u5f3a\u5927\uff0c\u80fd\u8282\u7701\u4f60\u51e0\u4e2a\u5c0f\u65f6\u7684\u8c03\u8bd5\u6216\u91cd\u6784\u65f6\u95f4\u3002',
    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: 'git merge \u548c git rebase \u6709\u4ec0\u4e48\u533a\u522b\uff1f',
    faq1_a: '\u4e24\u8005\u90fd\u662f\u5c06\u4e00\u4e2a\u5206\u652f\u7684\u53d8\u66f4\u96c6\u6210\u5230\u53e6\u4e00\u4e2a\u5206\u652f\uff0c\u4f46\u65b9\u5f0f\u4e0d\u540c\u3002git merge \u521b\u5efa\u4e00\u4e2a\u5408\u5e76\u63d0\u4ea4\uff0c\u4fdd\u7559\u5b8c\u6574\u7684\u5206\u652f\u5386\u53f2\u3002git rebase \u5c06\u4f60\u7684\u63d0\u4ea4\u91cd\u653e\u5230\u76ee\u6807\u5206\u652f\u4e4b\u4e0a\uff0c\u521b\u5efa\u7ebf\u6027\u5386\u53f2\u3002\u5171\u4eab\u5206\u652f\u7528 merge\uff0c\u672c\u5730\u529f\u80fd\u5206\u652f\u7528 rebase\u3002',
    faq2_q: '\u5982\u4f55\u64a4\u9500\u6700\u540e\u4e00\u6b21\u63d0\u4ea4\u800c\u4e0d\u4e22\u5931\u4fee\u6539\uff1f',
    faq2_a: '\u4f7f\u7528 "git reset --soft HEAD~1" \u53ef\u4ee5\u64a4\u9500\u6700\u540e\u4e00\u6b21\u63d0\u4ea4\uff0c\u540c\u65f6\u4fdd\u7559\u6240\u6709\u5df2\u66f2\u5b58\u7684\u66f4\u6539\u3002\u4f7f\u7528 "git reset HEAD~1" \u64a4\u9500\u63d0\u4ea4\u5e76\u53d6\u6d88\u66f2\u5b58\uff0c\u4f46\u4fdd\u7559\u5de5\u4f5c\u76ee\u5f55\u4e2d\u7684\u66f4\u6539\u3002',
    faq3_q: 'git fetch \u548c git pull \u6709\u4ec0\u4e48\u533a\u522b\uff1f',
    faq3_a: 'git fetch \u4ece\u8fdc\u7a0b\u4ed3\u5e93\u4e0b\u8f7d\u65b0\u6570\u636e\uff0c\u4f46\u4e0d\u4fee\u6539\u4f60\u7684\u5de5\u4f5c\u76ee\u5f55\u6216\u5f53\u524d\u5206\u652f\u3002git pull \u672c\u8d28\u4e0a\u662f git fetch \u52a0 git merge\u2014\u2014\u5b83\u4f1a\u4e0b\u8f7d\u5e76\u7acb\u5373\u5c06\u8fdc\u7a0b\u66f4\u6539\u96c6\u6210\u5230\u5f53\u524d\u5206\u652f\u3002',
    faq4_q: '\u5982\u4f55\u89e3\u51b3\u5408\u5e76\u51b2\u7a81\uff1f',
    faq4_a: '\u5f53\u53d1\u751f\u5408\u5e76\u51b2\u7a81\u65f6\uff0cGit \u4f1a\u7528 <<<<<<<\u3001======= \u548c >>>>>>> \u6807\u8bb0\u51b2\u7a81\u90e8\u5206\u3002\u6253\u5f00\u6bcf\u4e2a\u51b2\u7a81\u6587\u4ef6\uff0c\u51b3\u5b9a\u4fdd\u7559\u54ea\u4e9b\u66f4\u6539\uff0c\u5220\u9664\u51b2\u7a81\u6807\u8bb0\uff0c\u7136\u540e "git add" \u548c "git commit"\u3002',
    faq5_q: '\u5982\u4f55\u4ece Git \u8ddf\u8e2a\u4e2d\u79fb\u9664\u6587\u4ef6\u800c\u4e0d\u5220\u9664\u5b83\uff1f',
    faq5_a: '\u4f7f\u7528 "git rm --cached \u6587\u4ef6\u540d" \u4ece Git \u8ddf\u8e2a\u4e2d\u79fb\u9664\u6587\u4ef6\uff0c\u540c\u65f6\u4fdd\u7559\u672c\u5730\u6587\u4ef6\u3002\u7136\u540e\u5c06\u5176\u52a0\u5165 .gitignore\u3002',
    p_conclusion: '\u6536\u85cf\u8fd9\u4efd\u901f\u67e5\u8868\uff0c\u968f\u65f6\u67e5\u9605\u3002\u60f3\u8981\u4ea4\u4e92\u5f0f\u4f53\u9a8c\uff0c\u8bf7\u8bd5\u8bd5\u6211\u4eec\u7684 Git \u547d\u4ee4\u751f\u6210\u5668\u3002',
    link_tool_bottom: '\u8bd5\u8bd5 Git \u547d\u4ee4\u751f\u6210\u5668 \u2192',
  },
  ja: {
    intro: '\u521d\u5fc3\u8005\u304b\u3089\u7d4c\u9a13\u8c4a\u5bcc\u306a\u958b\u767a\u8005\u307e\u3067\u3001\u3053\u306e<strong>\u5305\u62ec\u7684\u306aGit\u30b3\u30de\u30f3\u30c9\u30c1\u30fc\u30c8\u30b7\u30fc\u30c8</strong>\u306f\u65e5\u5e38\u306e\u30d0\u30fc\u30b8\u30e7\u30f3\u7ba1\u7406\u306b\u5fc5\u8981\u306a\u3059\u3079\u3066\u306e\u30b3\u30de\u30f3\u30c9\u3092\u30ab\u30d0\u30fc\u3057\u3066\u3044\u307e\u3059\u3002\u5404\u30b3\u30de\u30f3\u30c9\u306b\u306f\u3088\u304f\u4f7f\u308f\u308c\u308b\u30d5\u30e9\u30b0\u4ed8\u304d\u306e\u5b9f\u8df5\u7684\u306a\u4f8b\u304c\u542b\u307e\u308c\u3066\u3044\u307e\u3059\u3002',
    link_tool: 'Git\u30b3\u30de\u30f3\u30c9\u30b8\u30a7\u30cd\u30ec\u30fc\u30bf\u30fc\u3067\u30a4\u30f3\u30bf\u30e9\u30af\u30c6\u30a3\u30d6\u306b\u751f\u6210 \u2192',
    h2_setup: '\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7\u3068\u8a2d\u5b9a',
    p_setup: 'Git\u3092\u4f7f\u3046\u524d\u306b\u3001ID\u3092\u8a2d\u5b9a\u3057\u30ea\u30dd\u30b8\u30c8\u30ea\u3092\u521d\u671f\u5316\u3057\u307e\u3059\u3002',
    h2_basic: '\u57fa\u672c\u30ef\u30fc\u30af\u30d5\u30ed\u30fc',
    p_basic: '\u6bce\u65e5\u4f55\u5341\u56de\u3082\u4f7f\u3046\u30b3\u30de\u30f3\u30c9\u3067\u3059\u3002\u5909\u66f4\u3092\u8ffd\u8de1\u3059\u308badd-commit\u30b5\u30a4\u30af\u30eb\u306e\u6838\u3067\u3059\u3002',
    h2_branching: '\u30d6\u30e9\u30f3\u30c1\u3068\u30de\u30fc\u30b8',
    p_branching: '\u30d6\u30e9\u30f3\u30c1\u3067\u6a5f\u80fd\u3084\u4fee\u6b63\u3092\u5206\u96e2\u3057\u3066\u4f5c\u696d\u3067\u304d\u307e\u3059\u3002\u30d6\u30e9\u30f3\u30c1\u306e\u7fd2\u5f97\u304c\u521d\u5fc3\u8005\u3068\u4e0a\u7d1a\u8005\u3092\u5206\u3051\u307e\u3059\u3002',
    h2_remote: '\u30ea\u30e2\u30fc\u30c8\u64cd\u4f5c',
    p_remote: '\u30ea\u30e2\u30fc\u30c8\u30b3\u30de\u30f3\u30c9\u3067GitHub\u3001GitLab\u3001Bitbucket\u306e\u5171\u6709\u30ea\u30dd\u30b8\u30c8\u30ea\u3068\u540c\u671f\u3057\u307e\u3059\u3002',
    h2_history: '\u5c65\u6b74\u3068\u691c\u67fb',
    p_history: 'Git\u306f\u3059\u3079\u3066\u306e\u5909\u66f4\u3092\u4fdd\u5b58\u3057\u307e\u3059\u3002\u5c65\u6b74\u306e\u691c\u7d22\u3001\u5909\u66f4\u8005\u306e\u7279\u5b9a\u3001\u5931\u308f\u308c\u305f\u4f5c\u696d\u306e\u5fa9\u5143\u306b\u4f7f\u3044\u307e\u3059\u3002',
    h2_undo: '\u5909\u66f4\u306e\u53d6\u308a\u6d88\u3057',
    p_undo: '\u8ab0\u3067\u3082\u30df\u30b9\u306f\u3057\u307e\u3059\u3002Git\u306f\u3042\u3089\u3086\u308b\u6bb5\u968e\u3067\u5909\u66f4\u3092\u53d6\u308a\u6d88\u3059\u5f37\u529b\u306a\u4ed5\u7d44\u307f\u3092\u63d0\u4f9b\u3057\u307e\u3059\u3002',
    h2_advanced: '\u4e0a\u7d1a\u30b3\u30de\u30f3\u30c9',
    p_advanced: '\u4f7f\u7528\u983b\u5ea6\u306f\u4f4e\u3044\u3067\u3059\u304c\u3001\u7279\u5b9a\u306e\u72b6\u6cc1\u3067\u975e\u5e38\u306b\u5f37\u529b\u3067\u3059\u3002',
    h2_faq: '\u3088\u304f\u3042\u308b\u8cea\u554f',
    faq1_q: 'git merge\u3068git rebase\u306e\u9055\u3044\u306f\uff1f',
    faq1_a: '\u4e21\u65b9\u3068\u3082\u5909\u66f4\u3092\u7d71\u5408\u3057\u307e\u3059\u304c\u65b9\u6cd5\u304c\u7570\u306a\u308a\u307e\u3059\u3002merge\u306f\u30de\u30fc\u30b8\u30b3\u30df\u30c3\u30c8\u3092\u4f5c\u6210\u3057\u5b8c\u5168\u306a\u5c65\u6b74\u3092\u4fdd\u6301\u3057\u307e\u3059\u3002rebase\u306f\u30b3\u30df\u30c3\u30c8\u3092\u30bf\u30fc\u30b2\u30c3\u30c8\u30d6\u30e9\u30f3\u30c1\u306b\u518d\u9069\u7528\u3057\u7dda\u5f62\u5c65\u6b74\u3092\u4f5c\u308a\u307e\u3059\u3002\u5171\u6709\u30d6\u30e9\u30f3\u30c1\u306b\u306fmerge\u3001\u30ed\u30fc\u30ab\u30eb\u30d6\u30e9\u30f3\u30c1\u306b\u306frebase\u3092\u4f7f\u3044\u307e\u3057\u3087\u3046\u3002',
    faq2_q: '\u5909\u66f4\u3092\u5931\u308f\u305a\u306b\u6700\u5f8c\u306e\u30b3\u30df\u30c3\u30c8\u3092\u53d6\u308a\u6d88\u3059\u306b\u306f\uff1f',
    faq2_a: '"git reset --soft HEAD~1" \u3067\u30b3\u30df\u30c3\u30c8\u3092\u53d6\u308a\u6d88\u3057\u3001\u5909\u66f4\u3092\u30b9\u30c6\u30fc\u30b8\u306b\u6b8b\u3057\u307e\u3059\u3002',
    faq3_q: 'git fetch\u3068git pull\u306e\u9055\u3044\u306f\uff1f',
    faq3_a: 'fetch\u306f\u30ea\u30e2\u30fc\u30c8\u304b\u3089\u30c7\u30fc\u30bf\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u307e\u3059\u304c\u4f5c\u696d\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306f\u5909\u66f4\u3057\u307e\u305b\u3093\u3002pull\u306ffetch+merge\u3067\u5373\u5ea7\u306b\u7d71\u5408\u3057\u307e\u3059\u3002',
    faq4_q: '\u30de\u30fc\u30b8\u30b3\u30f3\u30d5\u30ea\u30af\u30c8\u306e\u89e3\u6c7a\u65b9\u6cd5\u306f\uff1f',
    faq4_a: 'Git\u306f\u7af6\u5408\u90e8\u5206\u3092<<<<<<<\u3001=======\u3001>>>>>>>\u3067\u30de\u30fc\u30af\u3057\u307e\u3059\u3002\u30d5\u30a1\u30a4\u30eb\u3092\u958b\u304d\u3001\u5909\u66f4\u3092\u9078\u629e\u3057\u3001\u30de\u30fc\u30ab\u30fc\u3092\u524a\u9664\u3057\u3066"git add"\u3068"git commit"\u3092\u5b9f\u884c\u3057\u307e\u3059\u3002',
    faq5_q: '\u30d5\u30a1\u30a4\u30eb\u3092\u524a\u9664\u305b\u305a\u306bGit\u8ffd\u8de1\u304b\u3089\u9664\u5916\u3059\u308b\u306b\u306f\uff1f',
    faq5_a: '"git rm --cached \u30d5\u30a1\u30a4\u30eb\u540d" \u3067\u8ffd\u8de1\u304b\u3089\u9664\u5916\u3057\u3001\u30ed\u30fc\u30ab\u30eb\u30d5\u30a1\u30a4\u30eb\u306f\u305d\u306e\u307e\u307e\u3067\u3059\u3002\u305d\u306e\u5f8c.gitignore\u306b\u8ffd\u52a0\u3057\u307e\u3057\u3087\u3046\u3002',
    p_conclusion: '\u3053\u306e\u30c1\u30fc\u30c8\u30b7\u30fc\u30c8\u3092\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3057\u3066\u304f\u3060\u3055\u3044\u3002\u30a4\u30f3\u30bf\u30e9\u30af\u30c6\u30a3\u30d6\u4f53\u9a13\u306b\u306fGit\u30b3\u30de\u30f3\u30c9\u30b8\u30a7\u30cd\u30ec\u30fc\u30bf\u30fc\u3092\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002',
    link_tool_bottom: 'Git\u30b3\u30de\u30f3\u30c9\u30b8\u30a7\u30cd\u30ec\u30fc\u30bf\u30fc\u3092\u8a66\u3059 \u2192',
  },
  ko: {
    intro: '\ucd08\ubcf4\uc790\ubd80\ud130 \uacbd\ud5d8 \ub9ce\uc740 \uac1c\ubc1c\uc790\uae4c\uc9c0, \uc774 <strong>\ud3ec\uad04\uc801\uc778 Git \uba85\ub839\uc5b4 \uce58\ud2b8\uc2dc\ud2b8</strong>\ub294 \uc77c\uc0c1\uc801\uc778 \ubc84\uc804 \uad00\ub9ac\uc5d0 \ud544\uc694\ud55c \ubaa8\ub4e0 \ud544\uc218 \uba85\ub839\uc5b4\ub97c \ub2e4\ub8f9\ub2c8\ub2e4. \uac01 \uba85\ub839\uc5b4\uc5d0\ub294 \uc790\uc8fc \uc0ac\uc6a9\ud558\ub294 \ud50c\ub798\uadf8\uc640 \ud568\uaed8 \uc2e4\uc6a9\uc801\uc778 \uc608\uc81c\uac00 \ud3ec\ud568\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.',
    link_tool: 'Git \uba85\ub839\uc5b4 \uc0dd\uc131\uae30\ub85c \ub300\ud654\ud615 \uc0dd\uc131 \u2192',
    h2_setup: '\uc124\uc815 \ubc0f \uad6c\uc131',
    p_setup: 'Git\uc744 \uc0ac\uc6a9\ud558\uae30 \uc804\uc5d0 \uc2e0\uc6d0\uc744 \uc124\uc815\ud558\uace0 \ub9ac\ud3ec\uc9c0\ud1a0\ub9ac\ub97c \ucd08\uae30\ud654\ud569\ub2c8\ub2e4.',
    h2_basic: '\uae30\ubcf8 \uc791\uc5c5 \ud750\ub984',
    p_basic: '\ub9e4\uc77c \uc218\uc2ed \ubc88 \uc0ac\uc6a9\ud558\ub294 \uba85\ub839\uc5b4\uc785\ub2c8\ub2e4. \ubcc0\uacbd \uc0ac\ud56d\uc744 \ucd94\uc801\ud558\ub294 \ud575\uc2ec add-commit \uc8fc\uae30\uc785\ub2c8\ub2e4.',
    h2_branching: '\ube0c\ub79c\uce58 \ubc0f \ubcd1\ud569',
    p_branching: '\ube0c\ub79c\uce58\ub85c \uae30\ub2a5, \uc218\uc815, \uc2e4\ud5d8\uc744 \uaca9\ub9ac\ud558\uc5ec \uc791\uc5c5\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ube0c\ub79c\uce58 \ub9c8\uc2a4\ud130\uac00 \ucd08\ubcf4\uc640 \uace0\uc218\ub97c \ub098\ub215\ub2c8\ub2e4.',
    h2_remote: '\uc6d0\uaca9 \uc791\uc5c5',
    p_remote: '\uc6d0\uaca9 \uba85\ub839\uc5b4\ub85c GitHub, GitLab, Bitbucket\uc758 \uacf5\uc720 \ub9ac\ud3ec\uc9c0\ud1a0\ub9ac\uc640 \ub3d9\uae30\ud654\ud569\ub2c8\ub2e4.',
    h2_history: '\uae30\ub85d \ubc0f \uac80\uc0ac',
    p_history: 'Git\uc740 \ubaa8\ub4e0 \ubcc0\uacbd \uc0ac\ud56d\uc744 \uc800\uc7a5\ud569\ub2c8\ub2e4. \uae30\ub85d \uac80\uc0c9, \ubcc0\uacbd\uc790 \ud655\uc778, \uc190\uc2e4\ub41c \uc791\uc5c5 \ubcf5\uad6c\uc5d0 \uc0ac\uc6a9\ud569\ub2c8\ub2e4.',
    h2_undo: '\ubcc0\uacbd \uc0ac\ud56d \ub418\ub3cc\ub9ac\uae30',
    p_undo: '\ub204\uad6c\ub098 \uc2e4\uc218\ud569\ub2c8\ub2e4. Git\uc740 \ubaa8\ub4e0 \ub2e8\uacc4\uc5d0\uc11c \ubcc0\uacbd\uc744 \ub418\ub3cc\ub9ac\ub294 \uac15\ub825\ud55c \ubc29\ubc95\uc744 \uc81c\uacf5\ud569\ub2c8\ub2e4.',
    h2_advanced: '\uace0\uae09 \uba85\ub839\uc5b4',
    p_advanced: '\uc790\uc8fc \uc0ac\uc6a9\ud558\uc9c0\ub294 \uc54a\uc9c0\ub9cc \ud2b9\uc815 \uc0c1\ud669\uc5d0\uc11c \ub9e4\uc6b0 \uac15\ub825\ud55c \uba85\ub839\uc5b4\uc785\ub2c8\ub2e4.',
    h2_faq: '\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',
    faq1_q: 'git merge\uc640 git rebase\uc758 \ucc28\uc774\uc810\uc740?',
    faq1_a: '\ub458 \ub2e4 \ubcc0\uacbd\uc744 \ud1b5\ud569\ud558\uc9c0\ub9cc \ubc29\uc2dd\uc774 \ub2e4\ub985\ub2c8\ub2e4. merge\ub294 \ubcd1\ud569 \ucee4\ubc0b\uc744 \uc0dd\uc131\ud558\uc5ec \uc804\uccb4 \uae30\ub85d\uc744 \ubcf4\uc874\ud569\ub2c8\ub2e4. rebase\ub294 \ucee4\ubc0b\uc744 \ub300\uc0c1 \ube0c\ub79c\uce58 \uc704\uc5d0 \uc7ac\uc801\uc6a9\ud558\uc5ec \uc120\ud615 \uae30\ub85d\uc744 \ub9cc\ub4ed\ub2c8\ub2e4. \uacf5\uc720 \ube0c\ub79c\uce58\uc5d0\ub294 merge, \ub85c\uceec \ube0c\ub79c\uce58\uc5d0\ub294 rebase\ub97c \uc0ac\uc6a9\ud558\uc138\uc694.',
    faq2_q: '\ubcc0\uacbd \uc0ac\ud56d\uc744 \uc783\uc9c0 \uc54a\uace0 \ub9c8\uc9c0\ub9c9 \ucee4\ubc0b\uc744 \ub418\ub3cc\ub9ac\ub824\uba74?',
    faq2_a: '"git reset --soft HEAD~1"\ub85c \ucee4\ubc0b\uc744 \ub418\ub3cc\ub9ac\uace0 \ubcc0\uacbd \uc0ac\ud56d\uc744 \uc2a4\ud14c\uc774\uc9d5\uc5d0 \uc720\uc9c0\ud569\ub2c8\ub2e4.',
    faq3_q: 'git fetch\uc640 git pull\uc758 \ucc28\uc774\uc810\uc740?',
    faq3_a: 'fetch\ub294 \uc6d0\uaca9\uc5d0\uc11c \ub370\uc774\ud130\ub97c \ub2e4\uc6b4\ub85c\ub4dc\ud558\uc9c0\ub9cc \uc791\uc5c5 \ub514\ub809\ud1a0\ub9ac\ub97c \ubcc0\uacbd\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. pull\uc740 fetch+merge\ub85c \uc989\uc2dc \ud1b5\ud569\ud569\ub2c8\ub2e4.',
    faq4_q: '\ubcd1\ud569 \ucda9\ub3cc \ud574\uacb0 \ubc29\ubc95\uc740?',
    faq4_a: 'Git\uc774 <<<<<<<, =======, >>>>>>>\ub85c \ucda9\ub3cc \ubd80\ubd84\uc744 \ud45c\uc2dc\ud569\ub2c8\ub2e4. \ud30c\uc77c\uc744 \uc5f4\uc5b4 \ubcc0\uacbd \uc0ac\ud56d\uc744 \uc120\ud0dd\ud558\uace0, \ub9c8\ucee4\ub97c \uc81c\uac70\ud55c \ud6c4 "git add"\uc640 "git commit"\uc744 \uc2e4\ud589\ud569\ub2c8\ub2e4.',
    faq5_q: '\ud30c\uc77c\uc744 \uc0ad\uc81c\ud558\uc9c0 \uc54a\uace0 Git \ucd94\uc801\uc5d0\uc11c \uc81c\uac70\ud558\ub824\uba74?',
    faq5_a: '"git rm --cached \ud30c\uc77c\uba85"\uc73c\ub85c \ucd94\uc801\uc5d0\uc11c \uc81c\uac70\ud558\uace0 \ub85c\uceec \ud30c\uc77c\uc740 \uc720\uc9c0\ud569\ub2c8\ub2e4. \uadf8 \ud6c4 .gitignore\uc5d0 \ucd94\uac00\ud558\uc138\uc694.',
    p_conclusion: '\uc774 \uce58\ud2b8\uc2dc\ud2b8\ub97c \ubd81\ub9c8\ud06c\ud558\uc138\uc694. \ub300\ud654\ud615 \uacbd\ud5d8\uc744 \uc6d0\ud558\uba74 Git \uba85\ub839\uc5b4 \uc0dd\uc131\uae30\ub97c \uc0ac\uc6a9\ud574 \ubcf4\uc138\uc694.',
    link_tool_bottom: 'Git \uba85\ub839\uc5b4 \uc0dd\uc131\uae30 \uc0ac\uc6a9\ud558\uae30 \u2192',
  },
};

export default function GitCommandsCheatSheet({ lang }: { lang: string }) {
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

      <p>
        <Link href={`/${lang}/tools/git-command-generator`} style={{ fontWeight: 600 }}>
          {s.link_tool}
        </Link>
      </p>

      {/* ============================================================ */}
      {/* SETUP & CONFIGURATION */}
      {/* ============================================================ */}
      <h2>{s.h2_setup}</h2>
      <p>{s.p_setup}</p>

      <h3>git config</h3>
      <p>Set your name and email that will appear in every commit you make. The <code>--global</code> flag applies the setting to all repositories on your machine.</p>
      <pre><code>{`# Set your identity (required before first commit)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Set default branch name to main
git config --global init.defaultBranch main

# Enable colored output
git config --global color.ui auto

# Set default editor (e.g., VS Code)
git config --global core.editor "code --wait"

# View all configuration
git config --list

# View a specific setting
git config user.name`}</code></pre>

      <h3>git init</h3>
      <p>Create a brand-new Git repository in your current directory. This creates a hidden <code>.git</code> folder that stores all version history.</p>
      <pre><code>{`# Initialize a new repository
git init

# Initialize with a specific default branch name
git init --initial-branch=main

# Initialize a bare repository (for servers)
git init --bare my-project.git`}</code></pre>

      <h3>git clone</h3>
      <p>Download an existing repository from a remote URL, including all its history, branches, and tags.</p>
      <pre><code>{`# Clone a repository
git clone https://github.com/user/repo.git

# Clone into a specific directory
git clone https://github.com/user/repo.git my-folder

# Clone only the latest commit (shallow clone, faster)
git clone --depth 1 https://github.com/user/repo.git

# Clone a specific branch
git clone --branch develop https://github.com/user/repo.git

# Clone with SSH
git clone git@github.com:user/repo.git`}</code></pre>

      {/* ============================================================ */}
      {/* BASIC WORKFLOW */}
      {/* ============================================================ */}
      <h2>{s.h2_basic}</h2>
      <p>{s.p_basic}</p>

      <h3>git add</h3>
      <p>Stage changes for the next commit. Think of the staging area as a draft of your next commit.</p>
      <pre><code>{`# Stage a specific file
git add index.html

# Stage multiple files
git add index.html style.css script.js

# Stage all changes in the current directory
git add .

# Stage all changes in the entire repository
git add -A

# Stage parts of a file interactively
git add -p filename.js

# Stage all files matching a pattern
git add *.css`}</code></pre>

      <h3>git commit</h3>
      <p>Record the staged changes as a new snapshot in the repository history.</p>
      <pre><code>{`# Commit with a message
git commit -m "Add user authentication feature"

# Commit with a multi-line message
git commit -m "Fix login bug" -m "The session token was not being refreshed properly"

# Stage all tracked files and commit in one step
git commit -am "Update styles for dark mode"

# Amend the last commit (change message or add files)
git commit --amend -m "Updated commit message"

# Amend the last commit without changing the message
git commit --amend --no-edit

# Create an empty commit (useful for triggering CI)
git commit --allow-empty -m "Trigger build"`}</code></pre>

      <h3>git status</h3>
      <p>Show the current state of your working directory and staging area.</p>
      <pre><code>{`# Full status
git status

# Short format (compact output)
git status -s

# Show branch info along with short format
git status -sb

# Show ignored files too
git status --ignored`}</code></pre>

      <h3>git diff</h3>
      <p>Show the differences between files in various states: working directory, staging area, and committed.</p>
      <pre><code>{`# Show unstaged changes (working directory vs staging area)
git diff

# Show staged changes (staging area vs last commit)
git diff --staged

# Compare two branches
git diff main..feature-branch

# Compare a specific file between branches
git diff main..feature-branch -- src/app.js

# Show only file names that changed
git diff --name-only

# Show a summary of changes (insertions/deletions)
git diff --stat

# Compare with a specific commit
git diff HEAD~3`}</code></pre>

      {/* ============================================================ */}
      {/* BRANCHING & MERGING */}
      {/* ============================================================ */}
      <h2>{s.h2_branching}</h2>
      <p>{s.p_branching}</p>

      <h3>git branch</h3>
      <p>List, create, rename, or delete branches. Branches are lightweight pointers to commits.</p>
      <pre><code>{`# List local branches (* marks current branch)
git branch

# List all branches (local + remote)
git branch -a

# List remote branches only
git branch -r

# Create a new branch (does NOT switch to it)
git branch feature-login

# Create a branch from a specific commit
git branch hotfix abc1234

# Rename the current branch
git branch -m new-name

# Rename a specific branch
git branch -m old-name new-name

# Delete a merged branch
git branch -d feature-login

# Force-delete an unmerged branch
git branch -D experimental-feature

# Show last commit on each branch
git branch -v`}</code></pre>

      <h3>git checkout / git switch</h3>
      <p>Switch between branches or restore files. <code>git switch</code> (introduced in Git 2.23) is the modern, safer alternative for branch switching.</p>
      <pre><code>{`# Switch to an existing branch
git checkout main
git switch main        # modern alternative

# Create and switch to a new branch
git checkout -b feature-search
git switch -c feature-search    # modern alternative

# Switch to the previous branch
git checkout -
git switch -

# Restore a file to its last committed state
git checkout -- filename.js
git restore filename.js    # modern alternative

# Restore a file from a specific commit
git checkout abc1234 -- filename.js

# Create a branch tracking a remote branch
git checkout -t origin/feature-branch
git switch -t origin/feature-branch`}</code></pre>

      <h3>git merge</h3>
      <p>Combine changes from one branch into another. This creates a merge commit that ties the histories together.</p>
      <pre><code>{`# Merge a branch into the current branch
git merge feature-login

# Merge with a custom commit message
git merge feature-login -m "Merge login feature into main"

# Merge without fast-forward (always create merge commit)
git merge --no-ff feature-login

# Abort a merge in progress (if conflicts arise)
git merge --abort

# Merge and squash all commits into one
git merge --squash feature-login`}</code></pre>

      <h3>git rebase</h3>
      <p>Reapply your commits on top of another branch. This produces a cleaner, linear history but rewrites commit hashes.</p>
      <pre><code>{`# Rebase current branch onto main
git rebase main

# Rebase interactively (squash, edit, reorder commits)
git rebase -i HEAD~5

# Continue rebase after resolving conflicts
git rebase --continue

# Skip the current conflicting commit
git rebase --skip

# Abort a rebase in progress
git rebase --abort

# Rebase onto a specific branch
git rebase --onto main feature-a feature-b`}</code></pre>

      {/* ============================================================ */}
      {/* REMOTE OPERATIONS */}
      {/* ============================================================ */}
      <h2>{s.h2_remote}</h2>
      <p>{s.p_remote}</p>

      <h3>git remote</h3>
      <p>Manage connections to remote repositories.</p>
      <pre><code>{`# List remotes
git remote -v

# Add a new remote
git remote add origin https://github.com/user/repo.git

# Add a second remote (e.g., for a fork)
git remote add upstream https://github.com/original/repo.git

# Change a remote URL
git remote set-url origin https://github.com/user/new-repo.git

# Remove a remote
git remote remove upstream

# Rename a remote
git remote rename origin github

# Show detailed info about a remote
git remote show origin`}</code></pre>

      <h3>git fetch</h3>
      <p>Download objects and refs from a remote without merging. This is safe because it does not modify your working directory.</p>
      <pre><code>{`# Fetch from the default remote (origin)
git fetch

# Fetch from a specific remote
git fetch upstream

# Fetch a specific branch
git fetch origin main

# Fetch all remotes
git fetch --all

# Fetch and prune deleted remote branches
git fetch --prune

# Fetch tags
git fetch --tags`}</code></pre>

      <h3>git pull</h3>
      <p>Fetch and integrate remote changes into your current branch. This is essentially <code>git fetch</code> + <code>git merge</code>.</p>
      <pre><code>{`# Pull from the tracked remote branch
git pull

# Pull with rebase instead of merge (cleaner history)
git pull --rebase

# Pull from a specific remote and branch
git pull origin main

# Pull and auto-stash local changes
git pull --autostash

# Set pull to always rebase by default
git config --global pull.rebase true`}</code></pre>

      <h3>git push</h3>
      <p>Upload your local commits to the remote repository.</p>
      <pre><code>{`# Push the current branch to its tracked remote
git push

# Push and set upstream tracking
git push -u origin feature-login

# Push a specific branch
git push origin main

# Push all branches
git push --all

# Push tags
git push --tags

# Push a specific tag
git push origin v1.0.0

# Delete a remote branch
git push origin --delete feature-login

# Force push (use with extreme caution!)
git push --force-with-lease`}</code></pre>

      {/* ============================================================ */}
      {/* HISTORY & INSPECTION */}
      {/* ============================================================ */}
      <h2>{s.h2_history}</h2>
      <p>{s.p_history}</p>

      <h3>git log</h3>
      <p>View the commit history. This is one of the most versatile Git commands with dozens of formatting options.</p>
      <pre><code>{`# View commit history
git log

# Compact one-line format
git log --oneline

# Show a graph of branches
git log --oneline --graph --all

# Show last N commits
git log -5

# Show commits by author
git log --author="John"

# Show commits in a date range
git log --since="2026-01-01" --until="2026-02-01"

# Search commit messages
git log --grep="fix bug"

# Show changes in each commit
git log -p

# Show stats (files changed, insertions, deletions)
git log --stat

# Custom format
git log --pretty=format:"%h %an %s" --date=short`}</code></pre>

      <h3>git show</h3>
      <p>Display detailed information about a specific commit, tag, or other Git object.</p>
      <pre><code>{`# Show the latest commit details
git show

# Show a specific commit
git show abc1234

# Show a file at a specific commit
git show abc1234:src/app.js

# Show only the file names changed in a commit
git show --name-only abc1234

# Show a tag
git show v1.0.0`}</code></pre>

      <h3>git blame</h3>
      <p>Show who last modified each line of a file. Essential for tracking down when and why a specific change was made.</p>
      <pre><code>{`# Show line-by-line author and commit info
git blame src/app.js

# Show blame for a specific line range
git blame -L 10,20 src/app.js

# Show blame with email instead of name
git blame -e src/app.js

# Ignore whitespace changes
git blame -w src/app.js

# Show the commit that MOVED or COPIED lines
git blame -C src/app.js`}</code></pre>

      <h3>git reflog</h3>
      <p>Show a log of all reference updates (branch switches, resets, rebases, etc.). This is your safety net for recovering lost commits.</p>
      <pre><code>{`# Show the reflog for HEAD
git reflog

# Show reflog for a specific branch
git reflog show main

# Show reflog with dates
git reflog --date=relative

# Recover a lost commit (find hash in reflog, then)
git checkout abc1234
# or create a branch from it
git branch recovered-work abc1234`}</code></pre>

      {/* ============================================================ */}
      {/* UNDOING CHANGES */}
      {/* ============================================================ */}
      <h2>{s.h2_undo}</h2>
      <p>{s.p_undo}</p>

      <h3>git reset</h3>
      <p>Move the current branch pointer to a different commit. The three modes control what happens to your changes.</p>
      <pre><code>{`# Soft reset: undo commit, keep changes staged
git reset --soft HEAD~1

# Mixed reset (default): undo commit, unstage changes
git reset HEAD~1

# Hard reset: undo commit AND discard all changes
git reset --hard HEAD~1

# Unstage a file (keep changes in working directory)
git reset HEAD filename.js

# Reset to a specific commit
git reset --hard abc1234

# Reset to match the remote branch
git reset --hard origin/main`}</code></pre>

      <h3>git revert</h3>
      <p>Create a new commit that undoes the changes from a previous commit. This is safe for shared branches because it does not rewrite history.</p>
      <pre><code>{`# Revert the last commit
git revert HEAD

# Revert a specific commit
git revert abc1234

# Revert without auto-committing (stage the revert)
git revert --no-commit abc1234

# Revert a merge commit (specify parent)
git revert -m 1 abc1234

# Revert a range of commits
git revert HEAD~3..HEAD`}</code></pre>

      <h3>git stash</h3>
      <p>Temporarily save uncommitted changes so you can switch branches or pull updates without committing half-done work.</p>
      <pre><code>{`# Stash all uncommitted changes
git stash

# Stash with a descriptive message
git stash push -m "WIP: login form validation"

# Stash including untracked files
git stash -u

# Stash including untracked and ignored files
git stash -a

# List all stashes
git stash list

# Apply the most recent stash (keep in stash list)
git stash apply

# Apply and remove the most recent stash
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Show the diff of a stash
git stash show -p stash@{0}

# Drop a specific stash
git stash drop stash@{1}

# Clear all stashes
git stash clear`}</code></pre>

      <h3>git clean</h3>
      <p>Remove untracked files from your working directory. Use with caution because this cannot be undone.</p>
      <pre><code>{`# Preview what would be deleted (dry run)
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Remove ignored files too
git clean -fX

# Remove ALL untracked files (ignored + non-ignored)
git clean -fx

# Interactive mode
git clean -i`}</code></pre>

      {/* ============================================================ */}
      {/* ADVANCED COMMANDS */}
      {/* ============================================================ */}
      <h2>{s.h2_advanced}</h2>
      <p>{s.p_advanced}</p>

      <h3>git cherry-pick</h3>
      <p>Apply specific commits from one branch onto another. Perfect for pulling individual bug fixes without merging an entire branch.</p>
      <pre><code>{`# Apply a specific commit to the current branch
git cherry-pick abc1234

# Cherry-pick without committing (stage only)
git cherry-pick --no-commit abc1234

# Cherry-pick a range of commits
git cherry-pick abc1234..def5678

# Continue after resolving conflicts
git cherry-pick --continue

# Abort cherry-pick
git cherry-pick --abort`}</code></pre>

      <h3>git bisect</h3>
      <p>Use binary search to find the exact commit that introduced a bug. This is one of the most underrated Git commands.</p>
      <pre><code>{`# Start bisecting
git bisect start

# Mark the current commit as bad
git bisect bad

# Mark a known good commit
git bisect good abc1234

# Git will checkout a commit - test it, then:
git bisect good    # if this commit is OK
git bisect bad     # if this commit has the bug

# When done, reset to original state
git bisect reset

# Automate with a test script
git bisect start HEAD abc1234
git bisect run npm test`}</code></pre>

      <h3>git worktree</h3>
      <p>Manage multiple working directories from a single repository. Work on two branches simultaneously without stashing or cloning.</p>
      <pre><code>{`# Create a new worktree for a branch
git worktree add ../hotfix-branch hotfix

# Create a worktree with a new branch
git worktree add -b new-feature ../feature-dir

# List all worktrees
git worktree list

# Remove a worktree
git worktree remove ../hotfix-branch

# Prune stale worktree entries
git worktree prune`}</code></pre>

      <h3>git tag</h3>
      <p>Create, list, and manage tags. Tags are typically used to mark release points (v1.0.0, v2.0.0, etc.).</p>
      <pre><code>{`# List all tags
git tag

# List tags matching a pattern
git tag -l "v1.*"

# Create a lightweight tag
git tag v1.0.0

# Create an annotated tag (recommended for releases)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag a specific commit
git tag -a v1.0.0 abc1234 -m "Release 1.0.0"

# Push a tag to remote
git push origin v1.0.0

# Push all tags
git push origin --tags

# Delete a local tag
git tag -d v1.0.0

# Delete a remote tag
git push origin --delete v1.0.0

# Show tag details
git show v1.0.0`}</code></pre>

      {/* ============================================================ */}
      {/* FAQ SECTION */}
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
          {s.link_tool_bottom}
        </Link>
      </p>
    </>
  );
}
