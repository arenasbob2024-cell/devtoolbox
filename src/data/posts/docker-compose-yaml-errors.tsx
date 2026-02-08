import Link from 'next/link';

const dcT: Record<string, Record<string, string>> = {
  en: { intro: 'Docker Compose YAML files are deceptively simple — until they break. A single misplaced space, a wrong indentation level, or an unquoted special character can produce cryptic error messages. Here are the <strong>10 most common mistakes</strong> and exactly how to fix each one.', link_validate: 'Validate your YAML with our JSON-YAML Converter →', link_json_fmt: 'Format JSON output from "docker compose config" →', lbl_err: 'Error message:', lbl_prob: 'Problem:', lbl_fix: 'Fix:', lbl_chars: 'Characters that need quoting:', lbl_tip: 'Editor tip:', lbl_anchor: 'Problem:', err1_title: 'Error 1: Tabs Instead of Spaces', err1_prob: 'YAML strictly prohibits tab characters for indentation. This is the #1 mistake.', err1_fix: 'Replace all tabs with spaces (2 spaces per indent level is standard).', err1_tip: 'Enable "Render Whitespace" in your editor to see the difference between tabs and spaces. In VS Code: Settings → Render Whitespace → "all".', err2_title: 'Error 2: Inconsistent Indentation', err2_prob: 'Mixing different indentation levels (e.g., 2 spaces for some, 4 for others).', err3_title: 'Error 3: Unquoted Special Characters in Values', err3_prob: 'YAML interprets certain characters specially. Colons, hashes, and braces need quoting.', err4_title: 'Error 4: Wrong Port Mapping Format', err4_prob: 'Port values that look like base-60 numbers to YAML (e.g., 80:80 without quotes).', err5_title: 'Error 5: Missing or Wrong Version Key', err5_prob: 'Docker Compose v2 (the current version) no longer requires or accepts the version key.', err5_note: 'If you\'re using docker compose (v2, with a space), remove the version key. If you\'re using docker-compose (v1, with a hyphen), keep it.', err6_title: 'Error 6: Environment Variables as Mapping vs List', err6_prob: 'Mixing mapping and list syntax for environment variables.', err7_title: 'Error 7: Boolean Values Not Quoted', err7_msg: 'No error, but unexpected behavior.', err7_prob: 'YAML interprets yes, no, true, false, on, off as booleans, not strings.', err8_title: 'Error 8: Duplicate Keys', err8_msg: 'Often no error — the second value silently overwrites the first.', err9_title: 'Error 9: Volumes Path Mapping Issues', err9_prob: 'Windows paths with backslashes cause issues without proper quoting.', err10_title: 'Error 10: YAML Anchors Used Incorrectly', err10_prob: 'Referencing an anchor (*name) before defining it (&name).', h2_checklist: 'Quick Validation Checklist', checklist_intro: 'Before running docker compose up, verify:', c1: 'Run docker compose config to validate syntax', c2: 'Check for tabs', c3: 'Ensure all port mappings are quoted', c4: 'Verify no duplicate keys at the same level', c5: 'Quote all values containing special characters', c6: 'Use consistent indentation (2 spaces recommended)', h2_faq: 'Frequently Asked Questions', faq1_q: 'How do I validate a Docker Compose file before running it?', faq1_a: 'Run "docker compose config" (or "docker-compose config" for v1) to validate and display the resolved configuration. This command parses the YAML, resolves variables, and shows any syntax errors. You can also use online YAML validators or our JSON-YAML Converter tool to check syntax.', faq2_q: 'Why does Docker Compose say "service must be a mapping" or "services must be a mapping"?', faq2_a: 'This error means your services section (or an individual service) is not properly structured as a YAML mapping (key-value pairs). Common causes: missing indentation under a service name, using a list (-) where a mapping (key:value) is expected, or a typo in the service structure.', faq3_q: 'Should I use tabs or spaces in Docker Compose YAML files?', faq3_a: 'Always use spaces. YAML does not allow tabs for indentation — this is the single most common source of YAML parse errors. Configure your editor to insert 2 spaces when you press Tab. Most editors have a "Convert Indentation to Spaces" command.' },
  fr: { intro: 'Les fichiers YAML Docker Compose semblent simples — jusqu\'à ce qu\'ils cassent. Un espace mal placé, une mauvaise indentation ou un caractère spécial non quoté provoque des erreurs cryptiques. Voici les <strong>10 erreurs les plus courantes</strong> et comment les corriger.', link_validate: 'Validez votre YAML avec notre convertisseur JSON-YAML →', link_json_fmt: 'Formater la sortie JSON de "docker compose config" →', lbl_err: 'Message d\'erreur :', lbl_prob: 'Problème :', lbl_fix: 'Solution :', lbl_chars: 'Caractères à quoter :', lbl_tip: 'Astuce éditeur :', lbl_anchor: 'Problème :', err1_title: 'Erreur 1 : Tabulations au lieu d\'espaces', err1_prob: 'YAML interdit strictement les tabulations pour l\'indentation.', err1_fix: 'Remplacez toutes les tabulations par des espaces (2 espaces par niveau).', err1_tip: 'Activez "Render Whitespace" pour distinguer tabulations et espaces.', err2_title: 'Erreur 2 : Indentation incohérente', err2_prob: 'Mélange de niveaux d\'indentation (2 espaces ici, 4 là).', err3_title: 'Erreur 3 : Caractères spéciaux non quotés', err3_prob: 'YAML interprète certains caractères. Colons, hashes et accolades doivent être quotés.', err4_title: 'Erreur 4 : Mauvais format de mapping de ports', err4_prob: 'YAML peut interpréter 80:80 comme base-60 sans guillemets.', err5_title: 'Erreur 5 : Clé version absente ou incorrecte', err5_prob: 'Docker Compose v2 n\'exige plus la clé version.', err5_note: 'Avec docker compose (v2) : supprimez version. Avec docker-compose (v1) : gardez-la.', err6_title: 'Erreur 6 : Variables d\'environnement mapping vs liste', err6_prob: 'Mélange de syntaxe mapping et liste pour les variables d\'environnement.', err7_title: 'Erreur 7 : Valeurs booléennes non quotées', err7_msg: 'Pas d\'erreur visible, comportement inattendu.', err7_prob: 'YAML interprète yes, no, true, false, on, off comme booléens.', err8_title: 'Erreur 8 : Clés dupliquées', err8_msg: 'Souvent pas d\'erreur — la seconde valeur écrase silencieusement la première.', err9_title: 'Erreur 9 : Chemins volumes', err9_prob: 'Chemins Windows avec backslashes posent problème sans guillemets.', err10_title: 'Erreur 10 : Ancres YAML mal utilisées', err10_prob: 'Référencer une ancre (*nom) avant de la définir (&nom).', h2_checklist: 'Checklist de validation rapide', checklist_intro: 'Avant docker compose up, vérifiez :', c1: 'Exécutez docker compose config pour valider la syntaxe', c2: 'Vérifiez les tabulations', c3: 'Quotez tous les mappings de ports', c4: 'Pas de clés dupliquées au même niveau', c5: 'Quotez les valeurs avec caractères spéciaux', c6: 'Indentation cohérente (2 espaces recommandés)', h2_faq: 'Questions fréquentes', faq1_q: 'Comment valider un fichier Docker Compose avant de le lancer ?', faq1_a: 'Exécutez "docker compose config" pour valider et afficher la config résolue. Cette commande analyse le YAML, résout les variables et affiche les erreurs de syntaxe.', faq2_q: 'Pourquoi Docker Compose dit-il "service must be a mapping" ?', faq2_a: 'Votre section services (ou un service) n\'est pas correctement structurée en mapping YAML (paires clé-valeur). Causes fréquentes : indentation manquante, liste (-) au lieu de mapping.', faq3_q: 'Tabulations ou espaces dans les fichiers YAML Docker Compose ?', faq3_a: 'Toujours des espaces. YAML n\'autorise pas les tabulations — c\'est la cause #1 des erreurs de parse. Configurez votre éditeur pour insérer 2 espaces avec Tab.' },
  de: { intro: 'Docker Compose YAML-Dateien wirken einfach — bis sie brechen. Ein falsches Leerzeichen, falsche Einrückung oder ein unquotierter Sonderzeichen führt zu kryptischen Fehlern. Hier die <strong>10 häufigsten Fehler</strong> und wie man sie behebt.', link_validate: 'YAML mit unserem JSON-YAML-Konverter validieren →', link_json_fmt: 'JSON-Ausgabe von "docker compose config" formatieren →', lbl_err: 'Fehlermeldung:', lbl_prob: 'Problem:', lbl_fix: 'Lösung:', lbl_chars: 'Zu quotende Zeichen:', lbl_tip: 'Editor-Tipp:', lbl_anchor: 'Problem:', err1_title: 'Fehler 1: Tabs statt Leerzeichen', err1_prob: 'YAML verbietet Tabs für Einrückung strikt.', err1_fix: 'Ersetzen Sie alle Tabs durch Leerzeichen (2 pro Ebene).', err1_tip: 'Aktivieren Sie "Render Whitespace" im Editor.', err2_title: 'Fehler 2: Inkonsistente Einrückung', err2_prob: 'Gemischt: 2 Leerzeichen hier, 4 dort.', err3_title: 'Fehler 3: Unquotierte Sonderzeichen', err3_prob: 'YAML interpretiert Doppelpunkte, Hashes und Klammern speziell. Quoten Sie sie.', err4_title: 'Fehler 4: Falsches Port-Mapping-Format', err4_prob: 'YAML kann 80:80 ohne Anführungszeichen als Base-60 interpretieren.', err5_title: 'Fehler 5: Fehlender oder falscher Version-Key', err5_prob: 'Docker Compose v2 benötigt den version-Key nicht mehr.', err5_note: 'Bei docker compose (v2): version entfernen. Bei docker-compose (v1): behalten.', err6_title: 'Fehler 6: Umgebungsvariablen Mapping vs Liste', err6_prob: 'Vermischung von Mapping- und Listen-Syntax.', err7_title: 'Fehler 7: Boolesche Werte nicht quotiert', err7_msg: 'Kein Fehler, aber unerwartetes Verhalten.', err7_prob: 'YAML interpretiert yes, no, true, false, on, off als Boolesche Werte.', err8_title: 'Fehler 8: Doppelte Keys', err8_msg: 'Oft kein Fehler — der zweite Wert überschreibt still den ersten.', err9_title: 'Fehler 9: Volumen-Pfad-Probleme', err9_prob: 'Windows-Pfade mit Backslashes benötigen Quotierung.', err10_title: 'Fehler 10: YAML-Anker falsch verwendet', err10_prob: 'Anker (*name) vor Definition (&name) referenziert.', h2_checklist: 'Schnell-Checkliste', checklist_intro: 'Vor docker compose up prüfen:', c1: 'docker compose config zur Syntax-Validierung ausführen', c2: 'Auf Tabs prüfen', c3: 'Alle Port-Mappings quoten', c4: 'Keine doppelten Keys auf gleicher Ebene', c5: 'Werte mit Sonderzeichen quoten', c6: 'Konsistente Einrückung (2 Leerzeichen)', h2_faq: 'Häufige Fragen', faq1_q: 'Wie validiere ich eine Docker Compose-Datei vor dem Start?', faq1_a: 'Führen Sie "docker compose config" aus, um die Konfiguration zu validieren und anzuzeigen.', faq2_q: 'Warum "service must be a mapping"?', faq2_a: 'Die services-Sektion ist nicht korrekt als YAML-Mapping strukturiert. Häufig: fehlende Einrückung oder falsche Syntax.', faq3_q: 'Tabs oder Leerzeichen in Docker Compose YAML?', faq3_a: 'Immer Leerzeichen. YAML erlaubt keine Tabs für Einrückung. Editor auf 2 Leerzeichen pro Tab einstellen.' },
  it: { intro: 'I file YAML di Docker Compose sembrano semplici — finché non si rompono. Uno spazio fuori posto, un\'indentazione sbagliata o un carattere speciale non quotato genera errori criptici. Ecco i <strong>10 errori più comuni</strong> e come correggerli.', link_validate: 'Valida YAML con il nostro convertitore JSON-YAML →', link_json_fmt: 'Formatta output JSON di "docker compose config" →', lbl_err: 'Messaggio di errore:', lbl_prob: 'Problema:', lbl_fix: 'Soluzione:', lbl_chars: 'Caratteri da quotare:', lbl_tip: 'Suggerimento editor:', lbl_anchor: 'Problema:', err1_title: 'Errore 1: Tab invece di spazi', err1_prob: 'YAML vieta rigorosamente i tab per l\'indentazione.', err1_fix: 'Sostituire tutti i tab con spazi (2 per livello).', err1_tip: 'Attivare "Render Whitespace" nell\'editor.', err2_title: 'Errore 2: Indentazione incoerente', err2_prob: 'Mescolati livelli diversi (2 spazi qui, 4 là).', err3_title: 'Errore 3: Caratteri speciali non quotati', err3_prob: 'YAML interpreta due punti, hash e parentesi in modo speciale. Vanno quotati.', err4_title: 'Errore 4: Formato mapping porte sbagliato', err4_prob: 'YAML può interpretare 80:80 come base-60 senza virgolette.', err5_title: 'Errore 5: Chiave version mancante o errata', err5_prob: 'Docker Compose v2 non richiede più la chiave version.', err5_note: 'Con docker compose (v2): rimuovere version. Con docker-compose (v1): mantenerla.', err6_title: 'Errore 6: Variabili ambiente mapping vs lista', err6_prob: 'Mescolata sintassi mapping e lista per le variabili d\'ambiente.', err7_title: 'Errore 7: Valori booleani non quotati', err7_msg: 'Nessun errore visibile, comportamento inatteso.', err7_prob: 'YAML interpreta yes, no, true, false, on, off come booleani.', err8_title: 'Errore 8: Chiavi duplicate', err8_msg: 'Spesso nessun errore — il secondo valore sovrascrive il primo.', err9_title: 'Errore 9: Percorsi volumi', err9_prob: 'Percorsi Windows con backslash richiedono virgolette.', err10_title: 'Errore 10: Ancore YAML usate male', err10_prob: 'Ancora (*nome) referenziata prima della definizione (&nome).', h2_checklist: 'Checklist validazione rapida', checklist_intro: 'Prima di docker compose up, verifica:', c1: 'Esegui docker compose config per validare la sintassi', c2: 'Controlla tab', c3: 'Quota tutti i mapping delle porte', c4: 'Nessuna chiave duplicata allo stesso livello', c5: 'Quota valori con caratteri speciali', c6: 'Indentazione coerente (2 spazi)', h2_faq: 'Domande frequenti', faq1_q: 'Come validare un file Docker Compose prima di eseguirlo?', faq1_a: 'Esegui "docker compose config" per validare e visualizzare la configurazione risolta.', faq2_q: 'Perché "service must be a mapping"?', faq2_a: 'La sezione services non è strutturata correttamente come mapping YAML. Cause comuni: indentazione mancante.', faq3_q: 'Tab o spazi nei file YAML Docker Compose?', faq3_a: 'Sempre spazi. YAML non consente tab per l\'indentazione. Configura l\'editor per inserire 2 spazi con Tab.' },
  es: { intro: 'Los archivos YAML de Docker Compose parecen sencillos — hasta que fallan. Un espacio mal colocado, indentación incorrecta o un carácter especial sin comillas genera errores crípticos. Aquí están los <strong>10 errores más comunes</strong> y cómo corregirlos.', link_validate: 'Valida tu YAML con nuestro convertidor JSON-YAML →', link_json_fmt: 'Formatear salida JSON de "docker compose config" →', lbl_err: 'Mensaje de error:', lbl_prob: 'Problema:', lbl_fix: 'Solución:', lbl_chars: 'Caracteres que requieren comillas:', lbl_tip: 'Consejo de editor:', lbl_anchor: 'Problema:', err1_title: 'Error 1: Tabulaciones en lugar de espacios', err1_prob: 'YAML prohíbe estrictamente tabulaciones para indentación.', err1_fix: 'Reemplazar todas las tabulaciones por espacios (2 por nivel).', err1_tip: 'Activar "Render Whitespace" en el editor.', err2_title: 'Error 2: Indentación inconsistente', err2_prob: 'Mezcla de niveles (2 espacios aquí, 4 allí).', err3_title: 'Error 3: Caracteres especiales sin comillas', err3_prob: 'YAML interpreta dos puntos, almohadillas y llaves de forma especial. Hay que ponerlos entre comillas.', err4_title: 'Error 4: Formato de mapeo de puertos incorrecto', err4_prob: 'YAML puede interpretar 80:80 como base-60 sin comillas.', err5_title: 'Error 5: Clave version ausente o incorrecta', err5_prob: 'Docker Compose v2 ya no requiere la clave version.', err5_note: 'Con docker compose (v2): eliminar version. Con docker-compose (v1): mantenerla.', err6_title: 'Error 6: Variables de entorno mapping vs lista', err6_prob: 'Mezcla de sintaxis mapping y lista para variables de entorno.', err7_title: 'Error 7: Valores booleanos sin comillas', err7_msg: 'Sin error visible, comportamiento inesperado.', err7_prob: 'YAML interpreta yes, no, true, false, on, off como booleanos.', err8_title: 'Error 8: Claves duplicadas', err8_msg: 'A menudo sin error — el segundo valor sobrescribe al primero.', err9_title: 'Error 9: Rutas de volúmenes', err9_prob: 'Rutas Windows con barras invertidas requieren comillas.', err10_title: 'Error 10: Anclas YAML usadas incorrectamente', err10_prob: 'Referenciar ancla (*nombre) antes de definirla (&nombre).', h2_checklist: 'Lista de validación rápida', checklist_intro: 'Antes de docker compose up, verifica:', c1: 'Ejecuta docker compose config para validar sintaxis', c2: 'Comprueba tabulaciones', c3: 'Pon comillas a todos los mapeos de puertos', c4: 'Sin claves duplicadas al mismo nivel', c5: 'Pon comillas a valores con caracteres especiales', c6: 'Indentación consistente (2 espacios)', h2_faq: 'Preguntas frecuentes', faq1_q: '¿Cómo validar un archivo Docker Compose antes de ejecutarlo?', faq1_a: 'Ejecuta "docker compose config" para validar y mostrar la configuración resuelta.', faq2_q: '¿Por qué "service must be a mapping"?', faq2_a: 'La sección services no está estructurada correctamente como mapping YAML. Causas comunes: indentación faltante.', faq3_q: '¿Tabulaciones o espacios en archivos YAML Docker Compose?', faq3_a: 'Siempre espacios. YAML no permite tabulaciones para indentación. Configura el editor para insertar 2 espacios con Tab.' },
  zh: { intro: 'Docker Compose 的 YAML 文件看起来简单，出错时却很难排查。多一个空格、缩进层级错误或未加引号的特殊字符，都会产生晦涩的错误信息。下面整理 <strong>10 个最常见错误</strong> 及对应的修复方法。', link_validate: '使用 JSON-YAML 转换器验证 YAML →', link_json_fmt: '格式化 "docker compose config" 的 JSON 输出 →', lbl_err: '错误信息：', lbl_prob: '问题：', lbl_fix: '修复：', lbl_chars: '需要加引号的字符：', lbl_tip: '编辑器提示：', lbl_anchor: '问题：', err1_title: '错误 1：用 Tab 代替空格', err1_prob: 'YAML 严格禁止使用 Tab 做缩进，这是最常见的错误之一。', err1_fix: '将所有 Tab 替换为空格（通常每级 2 个空格）。', err1_tip: '在编辑器中开启「显示空白字符」，可区分 Tab 和空格。VS Code：设置 → Render Whitespace → "all"。', err2_title: '错误 2：缩进不一致', err2_prob: '混用不同缩进（例如部分用 2 个空格，部分用 4 个）。', err3_title: '错误 3：值中未加引号的特殊字符', err3_prob: 'YAML 会特殊解析冒号、井号和花括号等，需加引号。', err4_title: '错误 4：端口映射格式错误', err4_prob: 'YAML 可能将未加引号的 80:80 等解释为 base-60 数字。', err5_title: '错误 5：version 键缺失或错误', err5_prob: 'Docker Compose v2 不再要求或接受 version 键。', err5_note: '若使用 docker compose（v2，带空格），删除 version。若使用 docker-compose（v1，带连字符），保留。', err6_title: '错误 6：环境变量 mapping 与 list 混用', err6_prob: '环境变量混用了 mapping 和 list 两种语法。', err7_title: '错误 7：布尔值未加引号', err7_msg: '无显式报错，但行为异常。', err7_prob: 'YAML 会把 yes、no、true、false、on、off 解析为布尔值，而非字符串。', err8_title: '错误 8：重复的键', err8_msg: '通常不报错，第二个值会静默覆盖第一个。', err9_title: '错误 9：卷路径映射问题', err9_prob: 'Windows 路径若带反斜杠且未加引号，易出问题。', err10_title: '错误 10：YAML 锚点使用不当', err10_prob: '在定义锚点（&name）之前就引用它（*name）。', h2_checklist: '快速校验清单', checklist_intro: '运行 docker compose up 前请确认：', c1: '执行 docker compose config 校验语法', c2: '检查是否包含 Tab', c3: '所有端口映射都加引号', c4: '同一层级无重复键', c5: '含特殊字符的值都加引号', c6: '缩进一致（建议 2 空格）', h2_faq: '常见问题', faq1_q: '运行前如何验证 Docker Compose 文件？', faq1_a: '执行 "docker compose config"（v1 为 "docker-compose config"）可验证并显示解析后的配置。该命令会解析 YAML、解析变量并显示语法错误。也可使用在线 YAML 校验或我们的 JSON-YAML 转换工具。', faq2_q: 'Docker Compose 报 "service must be a mapping" 或 "services must be a mapping" 是什么意思？', faq2_a: '表示 services 段（或某个服务）未正确写成 YAML 映射（键值对）。常见原因：服务名下方缩进错误、在需要 mapping 的地方使用了 list（-）、或结构拼写错误。', faq3_q: 'Docker Compose YAML 应使用 Tab 还是空格？', faq3_a: '应始终使用空格。YAML 不允许用 Tab 做缩进，这是 YAML 解析错误的首要原因。建议在编辑器中把 Tab 映射为插入 2 个空格。' },
  id: { intro: 'File YAML Docker Compose terlihat sederhana — sampai rusak. Satu spasi salah, indentasi keliru, atau karakter khusus tanpa tanda kutip menimbulkan error kriptik. Berikut <strong>10 kesalahan paling umum</strong> dan cara memperbaikinya.', link_validate: 'Validasi YAML dengan JSON-YAML Converter kami →', link_json_fmt: 'Format output JSON dari "docker compose config" →', lbl_err: 'Pesan error:', lbl_prob: 'Masalah:', lbl_fix: 'Perbaikan:', lbl_chars: 'Karakter yang perlu dikutip:', lbl_tip: 'Tip editor:', lbl_anchor: 'Masalah:', err1_title: 'Error 1: Tab bukan Spasi', err1_prob: 'YAML melarang ketat karakter tab untuk indentasi.', err1_fix: 'Ganti semua tab dengan spasi (2 spasi per level).', err1_tip: 'Aktifkan "Render Whitespace" di editor.', err2_title: 'Error 2: Indentasi Tidak Konsisten', err2_prob: 'Campuran level indentasi (2 spasi di sini, 4 di sana).', err3_title: 'Error 3: Karakter Khusus Tanpa Kutip', err3_prob: 'YAML menginterpretasi titik dua, hash, dan kurung secara khusus. Harus dikutip.', err4_title: 'Error 4: Format Pemetaan Port Salah', err4_prob: 'YAML dapat menginterpretasi 80:80 tanpa kutip sebagai base-60.', err5_title: 'Error 5: Kunci Version Hilang atau Salah', err5_prob: 'Docker Compose v2 tidak lagi memerlukan kunci version.', err5_note: 'Dengan docker compose (v2): hapus version. Dengan docker-compose (v1): pertahankan.', err6_title: 'Error 6: Variabel Lingkungan Mapping vs Daftar', err6_prob: 'Pencampuran sintaks mapping dan daftar untuk variabel lingkungan.', err7_title: 'Error 7: Nilai Boolean Tanpa Kutip', err7_msg: 'Tidak ada error terlihat, perilaku tak terduga.', err7_prob: 'YAML menginterpretasi yes, no, true, false, on, off sebagai boolean.', err8_title: 'Error 8: Kunci Duplikat', err8_msg: 'Sering tidak ada error — nilai kedua menimpa yang pertama.', err9_title: 'Error 9: Masalah Path Volumes', err9_prob: 'Path Windows dengan backslash perlu tanda kutip.', err10_title: 'Error 10: Anchor YAML Salah Gunakan', err10_prob: 'Referensi anchor (*nama) sebelum definisi (&nama).', h2_checklist: 'Checklist Validasi Cepat', checklist_intro: 'Sebelum docker compose up, verifikasi:', c1: 'Jalankan docker compose config untuk validasi sintaks', c2: 'Periksa tab', c3: 'Kutip semua pemetaan port', c4: 'Tidak ada kunci duplikat di level sama', c5: 'Kutip nilai yang mengandung karakter khusus', c6: 'Indentasi konsisten (2 spasi)', h2_faq: 'Pertanyaan Umum', faq1_q: 'Bagaimana memvalidasi file Docker Compose sebelum menjalankannya?', faq1_a: 'Jalankan "docker compose config" untuk memvalidasi dan menampilkan konfigurasi yang di-resolve.', faq2_q: 'Mengapa "service must be a mapping"?', faq2_a: 'Bagian services tidak terstruktur dengan benar sebagai mapping YAML. Penyebab umum: indentasi kurang.', faq3_q: 'Tab atau spasi di file YAML Docker Compose?', faq3_a: 'Selalu spasi. YAML tidak mengizinkan tab untuk indentasi. Konfigurasi editor untuk menyisipkan 2 spasi saat Tab.' },
  th: { intro: 'ไฟล์ YAML ของ Docker Compose ดูง่าย — จนกว่าจะพัง ช่องว่างผิดที่ การเยื้องผิด หรือตัวอักษรพิเศษไม่ใส่เครื่องหมายคำพูด ทำให้เกิดข้อความแสดงข้อผิดพลาดที่อ่านยาก นี่คือ <strong>10 ความผิดพลาดที่พบบ่อยที่สุด</strong> และวิธีแก้ไข', link_validate: 'ตรวจสอบ YAML ด้วย JSON-YAML Converter ของเรา →', link_json_fmt: 'จัดรูปแบบ JSON จาก "docker compose config" →', lbl_err: 'ข้อความข้อผิดพลาด:', lbl_prob: 'ปัญหา:', lbl_fix: 'การแก้ไข:', lbl_chars: 'ตัวอักษรที่ต้องใส่เครื่องหมายคำพูด:', lbl_tip: 'เคล็ดลับตัวแก้ไข:', lbl_anchor: 'ปัญหา:', err1_title: 'ข้อผิดพลาด 1: ใช้ Tab แทนช่องว่าง', err1_prob: 'YAML ไม่อนุญาตให้ใช้ Tab สำหรับการเยื้อง', err1_fix: 'แทนที่ Tab ทั้งหมดด้วยช่องว่าง (2 ช่องว่างต่อระดับ)', err1_tip: 'เปิด "Render Whitespace" ในตัวแก้ไข', err2_title: 'ข้อผิดพลาด 2: การเยื้องไม่สอดคล้องกัน', err2_prob: 'ผสมระดับการเยื้อง (2 ช่องว่างที่นี่ 4 ที่นั่น)', err3_title: 'ข้อผิดพลาด 3: ตัวอักษรพิเศษไม่ใส่เครื่องหมายคำพูด', err3_prob: 'YAML ตีความโคลอน แฮช และวงเล็บปีกกาเป็นพิเศษ ต้องใส่เครื่องหมายคำพูด', err4_title: 'ข้อผิดพลาด 4: รูปแบบการแมปพอร์ตผิด', err4_prob: 'YAML อาจตีความ 80:80 โดยไม่ใส่เครื่องหมายคำพูดเป็นฐาน 60', err5_title: 'ข้อผิดพลาด 5: ไม่มีหรือผิดคีย์ version', err5_prob: 'Docker Compose v2 ไม่ต้องการคีย์ version อีกต่อไป', err5_note: 'ใช้ docker compose (v2): ลบ version ใช้ docker-compose (v1): เก็บไว้', err6_title: 'ข้อผิดพลาด 6: ตัวแปรแวดล้อม mapping vs list', err6_prob: 'ผสมไวยากรณ์ mapping และ list สำหรับตัวแปรแวดล้อม', err7_title: 'ข้อผิดพลาด 7: ค่าบูลีนไม่ใส่เครื่องหมายคำพูด', err7_msg: 'ไม่เกิดข้อผิดพลาด แต่พฤติกรรมไม่ตรงตามที่คาดไว้', err7_prob: 'YAML ตีความ yes, no, true, false, on, off เป็นบูลีน', err8_title: 'ข้อผิดพลาด 8: คีย์ซ้ำ', err8_msg: 'มักไม่เกิดข้อผิดพลาด — ค่าที่สองจะเขียนทับค่าแรก', err9_title: 'ข้อผิดพลาด 9: ปัญหา path ของ volumes', err9_prob: 'Path ของ Windows ที่มี backslash ต้องใส่เครื่องหมายคำพูด', err10_title: 'ข้อผิดพลาด 10: YAML anchors ใช้ผิด', err10_prob: 'อ้างอิง anchor (*name) ก่อนกำหนด (&name)', h2_checklist: 'รายการตรวจสอบอย่างรวดเร็ว', checklist_intro: 'ก่อน docker compose up ให้ตรวจสอบ:', c1: 'รัน docker compose config เพื่อตรวจสอบไวยากรณ์', c2: 'ตรวจสอบ tab', c3: 'ใส่เครื่องหมายคำพูดกับ mapping ของพอร์ตทั้งหมด', c4: 'ไม่มีคีย์ซ้ำในระดับเดียวกัน', c5: 'ใส่เครื่องหมายคำพูดกับค่าที่มีตัวอักษรพิเศษ', c6: 'การเยื้องสอดคล้องกัน (2 ช่องว่างแนะนำ)', h2_faq: 'คำถามที่พบบ่อย', faq1_q: 'ตรวจสอบไฟล์ Docker Compose ก่อนรันอย่างไร?', faq1_a: 'รัน "docker compose config" เพื่อตรวจสอบและแสดง config ที่แก้ไขแล้ว', faq2_q: 'ทำไม "service must be a mapping"?', faq2_a: 'ส่วน services ไม่ได้จัดโครงสร้างอย่างถูกต้องเป็น mapping YAML สาเหตุทั่วไป: การเยื้องไม่ครบ', faq3_q: 'ใช้ Tab หรือช่องว่างในไฟล์ YAML Docker Compose?', faq3_a: 'ใช้ช่องว่างเสมอ YAML ไม่อนุญาตให้ใช้ Tab สำหรับการเยื้อง ตั้งค่า editor ให้ insert 2 ช่องว่างเมื่อกด Tab.' },
};

export default function DockerYamlErrors({ lang }: { lang: string }) {
  const d = dcT[lang] || dcT['en'];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: d.faq1_q, acceptedAnswer: { '@type': 'Answer', text: d.faq1_a } },
      { '@type': 'Question', name: d.faq2_q, acceptedAnswer: { '@type': 'Answer', text: d.faq2_a } },
      { '@type': 'Question', name: d.faq3_q, acceptedAnswer: { '@type': 'Answer', text: d.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: d.intro }} />

      <p>
        <Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600 }}>
          {d.link_validate}
        </Link>
      </p>

      <h2>{d.err1_title}</h2>
      <p><strong>{d.lbl_err}</strong></p>
      <pre><code>{`yaml: line 5: found a tab character where an indentation space is expected`}</code></pre>
      <p><strong>{d.lbl_prob}</strong> {d.err1_prob}</p>
      <p><strong>{d.lbl_fix}</strong> {d.err1_fix}</p>
      <pre><code>{`# BAD (tabs - invisible but breaks YAML)
services:
\tweb:
\t\timage: nginx

# GOOD (2 spaces)
services:
  web:
    image: nginx`}</code></pre>
      <blockquote>
        <p><strong>{d.lbl_tip}</strong> {d.err1_tip}</p>
      </blockquote>

      <h2>{d.err2_title}</h2>
      <p><strong>{d.lbl_err}</strong></p>
      <pre><code>{`yaml: line 8: mapping values are not allowed in this context`}</code></pre>
      <p><strong>{d.lbl_prob}</strong> {d.err2_prob}</p>
      <pre><code>{`# BAD (inconsistent: 2 spaces then 4 spaces)
services:
  web:
      image: nginx     # 4 spaces - inconsistent!
      ports:
        - "80:80"

# GOOD (consistent 2 spaces)
services:
  web:
    image: nginx       # 2 spaces - consistent
    ports:
      - "80:80"`}</code></pre>

      <h2>{d.err3_title}</h2>
      <p><strong>{d.lbl_err}</strong></p>
      <pre><code>{`yaml: line 6: did not find expected key`}</code></pre>
      <p><strong>{d.lbl_prob}</strong> {d.err3_prob}</p>
      <pre><code>{`# BAD
services:
  web:
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb  # colon in value!
      - APP_TITLE=My App: The Best                       # colon in value!

# GOOD (quote values with special characters)
services:
  web:
    environment:
      - "DATABASE_URL=postgres://user:pass@db:5432/mydb"
      - "APP_TITLE=My App: The Best"`}</code></pre>
      <p><strong>{d.lbl_chars}</strong> <code>: &#123; &#125; [ ] , & * # ? | - &lt; &gt; = ! % @</code></p>

      <h2>{d.err4_title}</h2>
      <p><strong>{d.lbl_err}</strong></p>
      <pre><code>{`services.web.ports contains an invalid type, it should be a number, or an object`}</code></pre>
      <p><strong>{d.lbl_prob}</strong> {d.err4_prob}</p>
      <pre><code>{`# RISKY (YAML may interpret as base-60)
services:
  web:
    ports:
      - 80:80        # Works but risky
      - 5432:5432    # May cause issues

# SAFE (always quote port mappings)
services:
  web:
    ports:
      - "80:80"
      - "5432:5432"
      - "127.0.0.1:3000:3000"`}</code></pre>

      <h2>{d.err5_title}</h2>
      <p><strong>{d.lbl_err}</strong></p>
      <pre><code>{`(root) Additional property version is not allowed`}</code></pre>
      <p><strong>{d.lbl_prob}</strong> {d.err5_prob}</p>
      <pre><code>{`# OUTDATED (Docker Compose v1 format)
version: "3.8"
services:
  web:
    image: nginx

# CURRENT (Docker Compose v2 - no version needed)
services:
  web:
    image: nginx`}</code></pre>
      <p>{d.err5_note}</p>

      <h2>{d.err6_title}</h2>
      <p><strong>{d.lbl_err}</strong></p>
      <pre><code>{`services.web.environment must be a mapping or an array`}</code></pre>
      <p><strong>{d.lbl_prob}</strong> {d.err6_prob}</p>
      <pre><code>{`# Format A: List (with dashes)
services:
  web:
    environment:
      - NODE_ENV=production
      - PORT=3000

# Format B: Mapping (key: value)
services:
  web:
    environment:
      NODE_ENV: production
      PORT: 3000

# BAD: Mixing both formats
services:
  web:
    environment:
      NODE_ENV: production
      - PORT=3000          # ERROR: mixing formats!`}</code></pre>

      <h2>{d.err7_title}</h2>
      <p><strong>{d.lbl_err}</strong> {d.err7_msg}</p>
      <p><strong>{d.lbl_prob}</strong> {d.err7_prob}</p>
      <pre><code>{`# BAD (YAML converts to boolean true/false)
services:
  web:
    environment:
      FEATURE_FLAG: yes       # becomes boolean true, not string "yes"
      DEBUG: on               # becomes boolean true
      COUNTRY: NO             # becomes boolean false (Norway code!)

# GOOD (quote string values)
services:
  web:
    environment:
      FEATURE_FLAG: "yes"
      DEBUG: "on"
      COUNTRY: "NO"`}</code></pre>

      <h2>{d.err8_title}</h2>
      <p><strong>{d.lbl_err}</strong> {d.err8_msg}</p>
      <pre><code>{`# BAD (duplicate 'ports' key - second one silently wins)
services:
  web:
    image: nginx
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    ports:                    # DUPLICATE! This replaces the first ports
      - "443:443"

# GOOD (combine under single key)
services:
  web:
    image: nginx
    ports:
      - "80:80"
      - "443:443"
    environment:
      - NODE_ENV=production`}</code></pre>

      <h2>{d.err9_title}</h2>
      <p><strong>{d.lbl_err}</strong></p>
      <pre><code>{`services.web.volumes contains an invalid type`}</code></pre>
      <p><strong>{d.lbl_prob}</strong> {d.err9_prob}</p>
      <pre><code>{`# BAD (Windows paths without quotes)
services:
  web:
    volumes:
      - C:\\Users\\me\\app:/app     # Backslashes cause issues

# GOOD (use forward slashes or quotes)
services:
  web:
    volumes:
      - "./app:/app"
      - "/home/user/data:/data"
      - "C:/Users/me/app:/app"      # Forward slashes on Windows`}</code></pre>

      <h2>{d.err10_title}</h2>
      <p><strong>{d.lbl_err}</strong></p>
      <pre><code>{`yaml: unknown anchor 'common'`}</code></pre>
      <p><strong>{d.lbl_prob}</strong> {d.err10_prob}</p>
      <pre><code>{`# BAD (reference before definition)
services:
  web:
    <<: *common          # ERROR: 'common' not defined yet

x-common: &common
  restart: always

# GOOD (define anchor first, then reference)
x-common: &common
  restart: always
  logging:
    driver: json-file

services:
  web:
    <<: *common
    image: nginx
  api:
    <<: *common
    image: node:20`}</code></pre>

      <h2>{d.h2_checklist}</h2>
      <p>{d.checklist_intro}</p>
      <ol>
        <li>{d.c1}</li>
        <li>{d.c2}: <code>grep -P &apos;\t&apos; docker-compose.yml</code></li>
        <li>{d.c3}</li>
        <li>{d.c4}</li>
        <li>{d.c5}</li>
        <li>{d.c6}</li>
      </ol>

      <p>
        <Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600 }}>
          {d.link_validate}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>
          {d.link_json_fmt}
        </Link>
      </p>

      <div className="faq-section">
        <h2>{d.h2_faq}</h2>
        <h3>{d.faq1_q}</h3>
        <p>{d.faq1_a}</p>
        <h3>{d.faq2_q}</h3>
        <p>{d.faq2_a}</p>
        <h3>{d.faq3_q}</h3>
        <p>{d.faq3_a}</p>
      </div>
    </>
  );
}
