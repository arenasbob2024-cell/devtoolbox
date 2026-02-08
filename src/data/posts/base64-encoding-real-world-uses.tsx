import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Base64 is everywhere in web development, but most tutorials only explain <em>how</em> it works. This article focuses on the <strong>7 real-world scenarios</strong> where you\u2019ll actually use Base64 encoding in your daily development work, with code examples you can copy directly.',
    try_tool: 'Try our Base64 Encoder/Decoder tool \u2192',
    h2_1: '1. Embedding Images in HTML/CSS (Data URIs)',
    p1_1: 'Data URIs let you embed small images directly in your HTML or CSS, eliminating an HTTP request. This is particularly useful for icons, logos, and tiny UI elements.',
    p1_when: '<strong>When to use:</strong> Images under 10KB (icons, small logos, UI elements).',
    p1_not: '<strong>When NOT to use:</strong> Images over 10KB \u2014 the 33% size increase outweighs the saved HTTP request.',
    convert_tool: 'Convert images to Base64 with our encoder \u2192',
    h2_2: '2. JWT Token Structure',
    p2_1: 'JSON Web Tokens (JWT) use <strong>Base64URL encoding</strong> (a URL-safe variant) for their three parts: header, payload, and signature. Understanding this is essential for debugging authentication issues.',
    p2_key: '<strong>Key insight:</strong> JWT tokens are <em>not encrypted</em>. Anyone can decode the header and payload with a simple Base64 decode. The signature verifies integrity, not secrecy.',
    jwt_tool: 'Decode JWT tokens with our JWT Decoder \u2192',
    h2_3: '3. Kubernetes Secrets',
    p3_1: 'Kubernetes stores secret values as Base64-encoded strings in YAML manifests. This is one of the most common Base64 use cases in DevOps.',
    p3_warn: '<strong>Security warning:</strong> Base64 in Kubernetes secrets is for encoding, not encryption. Use solutions like Sealed Secrets, External Secrets, or Vault for real security.',
    h2_4: '4. API Request/Response Payloads',
    p4_1: 'When APIs need to transmit binary data (images, files, certificates) within JSON payloads, Base64 encoding is the standard approach since JSON only supports text.',
    h2_5: '5. HTTP Basic Authentication',
    p5_1: 'The HTTP Basic Authentication scheme transmits credentials as a Base64-encoded string in the <code>Authorization</code> header. This is still used in many APIs.',
    p5_warn: '<strong>Always use HTTPS</strong> with Basic Auth. Over plain HTTP, Base64 credentials can be trivially decoded by anyone intercepting the traffic.',
    h2_6: '6. Email Attachments (MIME)',
    p6_1: 'Email protocols (SMTP) were designed for ASCII text only. Binary attachments \u2014 images, PDFs, documents \u2014 are Base64-encoded before being included in email messages via MIME.',
    p6_2: 'Behind the scenes, the MIME message looks like:',
    h2_7: '7. Storing Binary Data in Text-Only Systems',
    p7_1: 'Some systems \u2014 environment variables, JSON config files, CSV exports \u2014 only support text. Base64 lets you safely embed binary data in these text-only contexts.',
    p7_2: 'This pattern is commonly used in cloud platforms (Heroku, Railway, Fly.io) where environment variables are the primary configuration mechanism.',
    h2_compare: 'Base64 vs Base64URL',
    p_compare: 'Standard Base64 uses <code>+</code> and <code>/</code> which are not safe in URLs. Base64URL replaces them with <code>-</code> and <code>_</code>:',
    th_variant: 'Variant',
    th_alphabet: 'Alphabet',
    th_padding: 'Padding',
    th_used_in: 'Used In',
    td_padding_yes: '= padding',
    td_padding_no: 'No padding',
    td_used_1: 'Email, data URIs, K8s secrets',
    td_used_2: 'JWT tokens, URL parameters',
    h2_ref: 'Quick Reference: Base64 Commands',
    encode_tool: 'Encode and decode Base64 instantly with our tool \u2192',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Is Base64 encoding the same as encryption?',
    faq1_a: 'No. Base64 is an encoding scheme, not encryption. Anyone can decode Base64 data \u2014 it provides no security. Base64 is designed for safe data transport through text-only channels, not for protecting sensitive information.',
    faq2_q: 'Why does Base64 increase data size by ~33%?',
    faq2_a: 'Base64 converts 3 bytes of binary data into 4 ASCII characters (6 bits per character instead of 8). This 3:4 ratio means Base64-encoded data is approximately 33% larger than the original binary data. The trade-off is universal text compatibility.',
    faq3_q: 'When should I NOT use Base64?',
    faq3_a: 'Avoid Base64 for large files (images over 10KB, videos, documents) as it significantly increases payload size. Also avoid it for long-term storage in databases \u2014 use binary columns (BLOB/BYTEA) instead. Base64 is best for small data traveling through text-only channels.',
  },
  fr: {
    intro: 'Base64 est omnipr\u00e9sent dans le d\u00e9veloppement web, mais la plupart des tutoriels n\u2019expliquent que <em>comment</em> cela fonctionne. Cet article se concentre sur les <strong>7 sc\u00e9narios concrets</strong> o\u00f9 vous utiliserez r\u00e9ellement l\u2019encodage Base64 dans votre travail quotidien de d\u00e9veloppement, avec des exemples de code \u00e0 copier directement.',
    try_tool: 'Essayez notre outil d\u2019encodage/d\u00e9codage Base64 \u2192',
    h2_1: '1. Int\u00e9gration d\u2019images en HTML/CSS (Data URIs)',
    p1_1: 'Les Data URIs permettent d\u2019int\u00e9grer de petites images directement dans votre HTML ou CSS, \u00e9liminant une requ\u00eate HTTP. C\u2019est particuli\u00e8rement utile pour les ic\u00f4nes, logos et petits \u00e9l\u00e9ments d\u2019interface.',
    p1_when: '<strong>Quand utiliser :</strong> Images de moins de 10 Ko (ic\u00f4nes, petits logos, \u00e9l\u00e9ments d\u2019interface).',
    p1_not: '<strong>Quand NE PAS utiliser :</strong> Images de plus de 10 Ko \u2014 l\u2019augmentation de 33 % de la taille l\u2019emporte sur l\u2019\u00e9conomie de la requ\u00eate HTTP.',
    convert_tool: 'Convertissez vos images en Base64 avec notre encodeur \u2192',
    h2_2: '2. Structure des jetons JWT',
    p2_1: 'Les JSON Web Tokens (JWT) utilisent l\u2019<strong>encodage Base64URL</strong> (une variante s\u00fbre pour les URL) pour leurs trois parties : en-t\u00eate, charge utile et signature. Comprendre cela est essentiel pour d\u00e9boguer les probl\u00e8mes d\u2019authentification.',
    p2_key: '<strong>Point cl\u00e9 :</strong> Les jetons JWT ne sont <em>pas chiffr\u00e9s</em>. N\u2019importe qui peut d\u00e9coder l\u2019en-t\u00eate et la charge utile avec un simple d\u00e9codage Base64. La signature v\u00e9rifie l\u2019int\u00e9grit\u00e9, pas la confidentialit\u00e9.',
    jwt_tool: 'D\u00e9codez les jetons JWT avec notre d\u00e9codeur JWT \u2192',
    h2_3: '3. Secrets Kubernetes',
    p3_1: 'Kubernetes stocke les valeurs secr\u00e8tes sous forme de cha\u00eenes encod\u00e9es en Base64 dans les manifestes YAML. C\u2019est l\u2019un des cas d\u2019utilisation Base64 les plus courants en DevOps.',
    p3_warn: '<strong>Avertissement de s\u00e9curit\u00e9 :</strong> Le Base64 dans les secrets Kubernetes sert \u00e0 l\u2019encodage, pas au chiffrement. Utilisez des solutions comme Sealed Secrets, External Secrets ou Vault pour une vraie s\u00e9curit\u00e9.',
    h2_4: '4. Charges utiles de requ\u00eates/r\u00e9ponses API',
    p4_1: 'Lorsque les API doivent transmettre des donn\u00e9es binaires (images, fichiers, certificats) dans des charges JSON, l\u2019encodage Base64 est l\u2019approche standard car JSON ne prend en charge que le texte.',
    h2_5: '5. Authentification HTTP Basic',
    p5_1: 'Le sch\u00e9ma d\u2019authentification HTTP Basic transmet les identifiants sous forme de cha\u00eene encod\u00e9e en Base64 dans l\u2019en-t\u00eate <code>Authorization</code>. C\u2019est encore utilis\u00e9 dans de nombreuses API.',
    p5_warn: '<strong>Utilisez toujours HTTPS</strong> avec l\u2019authentification Basic. En HTTP non chiffr\u00e9, les identifiants Base64 peuvent \u00eatre d\u00e9cod\u00e9s trivialement par quiconque intercepte le trafic.',
    h2_6: '6. Pi\u00e8ces jointes des e-mails (MIME)',
    p6_1: 'Les protocoles e-mail (SMTP) ont \u00e9t\u00e9 con\u00e7us pour du texte ASCII uniquement. Les pi\u00e8ces jointes binaires \u2014 images, PDF, documents \u2014 sont encod\u00e9es en Base64 avant d\u2019\u00eatre incluses dans les messages via MIME.',
    p6_2: 'En coulisses, le message MIME ressemble \u00e0 :',
    h2_7: '7. Stockage de donn\u00e9es binaires dans des syst\u00e8mes texte uniquement',
    p7_1: 'Certains syst\u00e8mes \u2014 variables d\u2019environnement, fichiers de configuration JSON, exports CSV \u2014 ne prennent en charge que le texte. Base64 permet d\u2019int\u00e9grer en toute s\u00e9curit\u00e9 des donn\u00e9es binaires dans ces contextes texte uniquement.',
    p7_2: 'Ce sch\u00e9ma est couramment utilis\u00e9 dans les plateformes cloud (Heroku, Railway, Fly.io) o\u00f9 les variables d\u2019environnement sont le principal m\u00e9canisme de configuration.',
    h2_compare: 'Base64 vs Base64URL',
    p_compare: 'Le Base64 standard utilise <code>+</code> et <code>/</code> qui ne sont pas s\u00fbrs dans les URL. Base64URL les remplace par <code>-</code> et <code>_</code> :',
    th_variant: 'Variante',
    th_alphabet: 'Alphabet',
    th_padding: 'Remplissage',
    th_used_in: 'Utilis\u00e9 dans',
    td_padding_yes: 'Remplissage =',
    td_padding_no: 'Pas de remplissage',
    td_used_1: 'E-mail, data URIs, secrets K8s',
    td_used_2: 'Jetons JWT, param\u00e8tres d\u2019URL',
    h2_ref: 'R\u00e9f\u00e9rence rapide : Commandes Base64',
    encode_tool: 'Encodez et d\u00e9codez du Base64 instantan\u00e9ment avec notre outil \u2192',
    h2_faq: 'Questions fr\u00e9quemment pos\u00e9es',
    faq1_q: 'L\u2019encodage Base64 est-il identique au chiffrement ?',
    faq1_a: 'Non. Base64 est un sch\u00e9ma d\u2019encodage, pas du chiffrement. N\u2019importe qui peut d\u00e9coder des donn\u00e9es Base64 \u2014 il ne fournit aucune s\u00e9curit\u00e9. Base64 est con\u00e7u pour le transport s\u00fbr de donn\u00e9es \u00e0 travers des canaux texte uniquement, pas pour prot\u00e9ger des informations sensibles.',
    faq2_q: 'Pourquoi Base64 augmente-t-il la taille des donn\u00e9es d\u2019environ 33 % ?',
    faq2_a: 'Base64 convertit 3 octets de donn\u00e9es binaires en 4 caract\u00e8res ASCII (6 bits par caract\u00e8re au lieu de 8). Ce ratio 3:4 signifie que les donn\u00e9es encod\u00e9es en Base64 sont environ 33 % plus grandes que les donn\u00e9es binaires d\u2019origine. Le compromis est la compatibilit\u00e9 universelle avec le texte.',
    faq3_q: 'Quand ne dois-je PAS utiliser Base64 ?',
    faq3_a: '\u00c9vitez Base64 pour les fichiers volumineux (images de plus de 10 Ko, vid\u00e9os, documents) car cela augmente consid\u00e9rablement la taille de la charge utile. \u00c9vitez-le aussi pour le stockage \u00e0 long terme en base de donn\u00e9es \u2014 utilisez des colonnes binaires (BLOB/BYTEA) \u00e0 la place. Base64 est id\u00e9al pour les petites donn\u00e9es transitant par des canaux texte uniquement.',
  },
  de: {
    intro: 'Base64 ist in der Webentwicklung allgegenw\u00e4rtig, aber die meisten Tutorials erkl\u00e4ren nur, <em>wie</em> es funktioniert. Dieser Artikel konzentriert sich auf die <strong>7 realen Szenarien</strong>, in denen Sie Base64-Kodierung tats\u00e4chlich in Ihrer t\u00e4glichen Entwicklungsarbeit verwenden werden, mit Codebeispielen zum direkten Kopieren.',
    try_tool: 'Probieren Sie unser Base64-Encoder/Decoder-Tool aus \u2192',
    h2_1: '1. Bilder in HTML/CSS einbetten (Data-URIs)',
    p1_1: 'Data-URIs erm\u00f6glichen es, kleine Bilder direkt in HTML oder CSS einzubetten und dabei eine HTTP-Anfrage einzusparen. Das ist besonders n\u00fctzlich f\u00fcr Icons, Logos und kleine UI-Elemente.',
    p1_when: '<strong>Wann verwenden:</strong> Bilder unter 10 KB (Icons, kleine Logos, UI-Elemente).',
    p1_not: '<strong>Wann NICHT verwenden:</strong> Bilder \u00fcber 10 KB \u2014 die 33%ige Gr\u00f6\u00dfenzunahme \u00fcberwiegt die eingesparte HTTP-Anfrage.',
    convert_tool: 'Konvertieren Sie Bilder mit unserem Encoder in Base64 \u2192',
    h2_2: '2. JWT-Token-Struktur',
    p2_1: 'JSON Web Tokens (JWT) verwenden <strong>Base64URL-Kodierung</strong> (eine URL-sichere Variante) f\u00fcr ihre drei Teile: Header, Payload und Signatur. Das Verst\u00e4ndnis davon ist f\u00fcr das Debuggen von Authentifizierungsproblemen unerl\u00e4sslich.',
    p2_key: '<strong>Wichtiger Hinweis:</strong> JWT-Tokens sind <em>nicht verschl\u00fcsselt</em>. Jeder kann Header und Payload mit einem einfachen Base64-Decode entschl\u00fcsseln. Die Signatur \u00fcberpr\u00fcft die Integrit\u00e4t, nicht die Geheimhaltung.',
    jwt_tool: 'Dekodieren Sie JWT-Tokens mit unserem JWT-Decoder \u2192',
    h2_3: '3. Kubernetes-Secrets',
    p3_1: 'Kubernetes speichert geheime Werte als Base64-kodierte Zeichenketten in YAML-Manifesten. Dies ist einer der h\u00e4ufigsten Base64-Anwendungsf\u00e4lle in DevOps.',
    p3_warn: '<strong>Sicherheitswarnung:</strong> Base64 in Kubernetes-Secrets dient der Kodierung, nicht der Verschl\u00fcsselung. Verwenden Sie L\u00f6sungen wie Sealed Secrets, External Secrets oder Vault f\u00fcr echte Sicherheit.',
    h2_4: '4. API-Anfrage-/Antwort-Payloads',
    p4_1: 'Wenn APIs bin\u00e4re Daten (Bilder, Dateien, Zertifikate) innerhalb von JSON-Payloads \u00fcbertragen m\u00fcssen, ist Base64-Kodierung der Standardansatz, da JSON nur Text unterst\u00fctzt.',
    h2_5: '5. HTTP-Basic-Authentifizierung',
    p5_1: 'Das HTTP-Basic-Authentifizierungsschema \u00fcbertr\u00e4gt Anmeldedaten als Base64-kodierten String im <code>Authorization</code>-Header. Dies wird noch in vielen APIs verwendet.',
    p5_warn: '<strong>Verwenden Sie immer HTTPS</strong> bei Basic Auth. \u00dcber unverschl\u00fcsseltes HTTP k\u00f6nnen Base64-Anmeldedaten von jedem, der den Verkehr abf\u00e4ngt, trivial dekodiert werden.',
    h2_6: '6. E-Mail-Anh\u00e4nge (MIME)',
    p6_1: 'E-Mail-Protokolle (SMTP) wurden nur f\u00fcr ASCII-Text entwickelt. Bin\u00e4re Anh\u00e4nge \u2014 Bilder, PDFs, Dokumente \u2014 werden vor der Einbindung in E-Mail-Nachrichten per MIME Base64-kodiert.',
    p6_2: 'Hinter den Kulissen sieht die MIME-Nachricht so aus:',
    h2_7: '7. Bin\u00e4rdaten in reinen Textsystemen speichern',
    p7_1: 'Einige Systeme \u2014 Umgebungsvariablen, JSON-Konfigurationsdateien, CSV-Exporte \u2014 unterst\u00fctzen nur Text. Base64 erm\u00f6glicht das sichere Einbetten von Bin\u00e4rdaten in diesen reinen Textkontexten.',
    p7_2: 'Dieses Muster wird h\u00e4ufig in Cloud-Plattformen (Heroku, Railway, Fly.io) verwendet, in denen Umgebungsvariablen der prim\u00e4re Konfigurationsmechanismus sind.',
    h2_compare: 'Base64 vs. Base64URL',
    p_compare: 'Standard-Base64 verwendet <code>+</code> und <code>/</code>, die in URLs nicht sicher sind. Base64URL ersetzt sie durch <code>-</code> und <code>_</code>:',
    th_variant: 'Variante',
    th_alphabet: 'Alphabet',
    th_padding: 'Auff\u00fcllung',
    th_used_in: 'Verwendet in',
    td_padding_yes: '= Auff\u00fcllung',
    td_padding_no: 'Keine Auff\u00fcllung',
    td_used_1: 'E-Mail, Data-URIs, K8s-Secrets',
    td_used_2: 'JWT-Tokens, URL-Parameter',
    h2_ref: 'Kurzreferenz: Base64-Befehle',
    encode_tool: 'Kodieren und dekodieren Sie Base64 sofort mit unserem Tool \u2192',
    h2_faq: 'H\u00e4ufig gestellte Fragen',
    faq1_q: 'Ist Base64-Kodierung dasselbe wie Verschl\u00fcsselung?',
    faq1_a: 'Nein. Base64 ist ein Kodierungsschema, keine Verschl\u00fcsselung. Jeder kann Base64-Daten dekodieren \u2014 es bietet keine Sicherheit. Base64 ist f\u00fcr den sicheren Datentransport \u00fcber reine Textkan\u00e4le konzipiert, nicht zum Schutz sensibler Informationen.',
    faq2_q: 'Warum vergr\u00f6\u00dfert Base64 die Datenmenge um ~33 %?',
    faq2_a: 'Base64 wandelt 3 Bytes bin\u00e4rer Daten in 4 ASCII-Zeichen um (6 Bit pro Zeichen statt 8). Dieses 3:4-Verh\u00e4ltnis bedeutet, dass Base64-kodierte Daten etwa 33 % gr\u00f6\u00dfer sind als die urspr\u00fcnglichen Bin\u00e4rdaten. Der Kompromiss ist universelle Textkompatibilit\u00e4t.',
    faq3_q: 'Wann sollte ich Base64 NICHT verwenden?',
    faq3_a: 'Vermeiden Sie Base64 f\u00fcr gro\u00dfe Dateien (Bilder \u00fcber 10 KB, Videos, Dokumente), da es die Payload-Gr\u00f6\u00dfe erheblich erh\u00f6ht. Vermeiden Sie es auch f\u00fcr die Langzeitspeicherung in Datenbanken \u2014 verwenden Sie stattdessen bin\u00e4re Spalten (BLOB/BYTEA). Base64 eignet sich am besten f\u00fcr kleine Daten, die \u00fcber reine Textkan\u00e4le transportiert werden.',
  },
  it: {
    intro: 'Base64 \u00e8 ovunque nello sviluppo web, ma la maggior parte dei tutorial spiega solo <em>come</em> funziona. Questo articolo si concentra sui <strong>7 scenari reali</strong> in cui utilizzerai effettivamente la codifica Base64 nel tuo lavoro quotidiano di sviluppo, con esempi di codice da copiare direttamente.',
    try_tool: 'Prova il nostro strumento di codifica/decodifica Base64 \u2192',
    h2_1: '1. Incorporare immagini in HTML/CSS (Data URI)',
    p1_1: 'I Data URI permettono di incorporare piccole immagini direttamente nel tuo HTML o CSS, eliminando una richiesta HTTP. \u00c8 particolarmente utile per icone, loghi e piccoli elementi dell\u2019interfaccia.',
    p1_when: '<strong>Quando usare:</strong> Immagini sotto i 10 KB (icone, piccoli loghi, elementi UI).',
    p1_not: '<strong>Quando NON usare:</strong> Immagini oltre 10 KB \u2014 l\u2019aumento del 33 % della dimensione supera il risparmio della richiesta HTTP.',
    convert_tool: 'Converti le immagini in Base64 con il nostro encoder \u2192',
    h2_2: '2. Struttura dei token JWT',
    p2_1: 'I JSON Web Token (JWT) utilizzano la <strong>codifica Base64URL</strong> (una variante sicura per gli URL) per le loro tre parti: intestazione, payload e firma. Comprendere questo \u00e8 essenziale per il debug dei problemi di autenticazione.',
    p2_key: '<strong>Punto chiave:</strong> I token JWT <em>non sono crittografati</em>. Chiunque pu\u00f2 decodificare l\u2019intestazione e il payload con una semplice decodifica Base64. La firma verifica l\u2019integrit\u00e0, non la segretezza.',
    jwt_tool: 'Decodifica i token JWT con il nostro JWT Decoder \u2192',
    h2_3: '3. Secret di Kubernetes',
    p3_1: 'Kubernetes memorizza i valori segreti come stringhe codificate in Base64 nei manifesti YAML. Questo \u00e8 uno dei casi d\u2019uso Base64 pi\u00f9 comuni in DevOps.',
    p3_warn: '<strong>Avviso di sicurezza:</strong> Il Base64 nei secret di Kubernetes serve per la codifica, non per la crittografia. Usa soluzioni come Sealed Secrets, External Secrets o Vault per una sicurezza reale.',
    h2_4: '4. Payload di richieste/risposte API',
    p4_1: 'Quando le API devono trasmettere dati binari (immagini, file, certificati) all\u2019interno di payload JSON, la codifica Base64 \u00e8 l\u2019approccio standard poich\u00e9 JSON supporta solo testo.',
    h2_5: '5. Autenticazione HTTP Basic',
    p5_1: 'Lo schema di autenticazione HTTP Basic trasmette le credenziali come stringa codificata in Base64 nell\u2019header <code>Authorization</code>. \u00c8 ancora utilizzato in molte API.',
    p5_warn: '<strong>Usa sempre HTTPS</strong> con l\u2019autenticazione Basic. Su HTTP non crittografato, le credenziali Base64 possono essere decodificate banalmente da chiunque intercetti il traffico.',
    h2_6: '6. Allegati e-mail (MIME)',
    p6_1: 'I protocolli e-mail (SMTP) sono stati progettati solo per testo ASCII. Gli allegati binari \u2014 immagini, PDF, documenti \u2014 vengono codificati in Base64 prima di essere inclusi nei messaggi e-mail tramite MIME.',
    p6_2: 'Dietro le quinte, il messaggio MIME appare cos\u00ec:',
    h2_7: '7. Archiviazione di dati binari in sistemi solo testo',
    p7_1: 'Alcuni sistemi \u2014 variabili d\u2019ambiente, file di configurazione JSON, esportazioni CSV \u2014 supportano solo testo. Base64 permette di incorporare in modo sicuro dati binari in questi contesti solo testo.',
    p7_2: 'Questo schema \u00e8 comunemente utilizzato nelle piattaforme cloud (Heroku, Railway, Fly.io) dove le variabili d\u2019ambiente sono il principale meccanismo di configurazione.',
    h2_compare: 'Base64 vs Base64URL',
    p_compare: 'Il Base64 standard utilizza <code>+</code> e <code>/</code> che non sono sicuri negli URL. Base64URL li sostituisce con <code>-</code> e <code>_</code>:',
    th_variant: 'Variante',
    th_alphabet: 'Alfabeto',
    th_padding: 'Riempimento',
    th_used_in: 'Usato in',
    td_padding_yes: 'Riempimento =',
    td_padding_no: 'Nessun riempimento',
    td_used_1: 'E-mail, data URI, secret K8s',
    td_used_2: 'Token JWT, parametri URL',
    h2_ref: 'Riferimento rapido: Comandi Base64',
    encode_tool: 'Codifica e decodifica Base64 istantaneamente con il nostro strumento \u2192',
    h2_faq: 'Domande frequenti',
    faq1_q: 'La codifica Base64 \u00e8 uguale alla crittografia?',
    faq1_a: 'No. Base64 \u00e8 uno schema di codifica, non crittografia. Chiunque pu\u00f2 decodificare dati Base64 \u2014 non fornisce alcuna sicurezza. Base64 \u00e8 progettato per il trasporto sicuro dei dati attraverso canali solo testo, non per proteggere informazioni sensibili.',
    faq2_q: 'Perch\u00e9 Base64 aumenta la dimensione dei dati di circa il 33 %?',
    faq2_a: 'Base64 converte 3 byte di dati binari in 4 caratteri ASCII (6 bit per carattere anzich\u00e9 8). Questo rapporto 3:4 significa che i dati codificati in Base64 sono circa il 33 % pi\u00f9 grandi dei dati binari originali. Il compromesso \u00e8 la compatibilit\u00e0 universale con il testo.',
    faq3_q: 'Quando NON dovrei usare Base64?',
    faq3_a: 'Evita Base64 per file di grandi dimensioni (immagini oltre 10 KB, video, documenti) poich\u00e9 aumenta significativamente la dimensione del payload. Evitalo anche per l\u2019archiviazione a lungo termine nei database \u2014 usa colonne binarie (BLOB/BYTEA) invece. Base64 \u00e8 ideale per piccoli dati che viaggiano attraverso canali solo testo.',
  },
  es: {
    intro: 'Base64 est\u00e1 en todas partes en el desarrollo web, pero la mayor\u00eda de los tutoriales solo explican <em>c\u00f3mo</em> funciona. Este art\u00edculo se centra en los <strong>7 escenarios reales</strong> donde realmente usar\u00e1s la codificaci\u00f3n Base64 en tu trabajo diario de desarrollo, con ejemplos de c\u00f3digo que puedes copiar directamente.',
    try_tool: 'Prueba nuestra herramienta de codificaci\u00f3n/decodificaci\u00f3n Base64 \u2192',
    h2_1: '1. Incrustar im\u00e1genes en HTML/CSS (Data URIs)',
    p1_1: 'Los Data URIs permiten incrustar im\u00e1genes peque\u00f1as directamente en tu HTML o CSS, eliminando una solicitud HTTP. Esto es particularmente \u00fatil para iconos, logos y peque\u00f1os elementos de interfaz.',
    p1_when: '<strong>Cu\u00e1ndo usar:</strong> Im\u00e1genes menores de 10 KB (iconos, logos peque\u00f1os, elementos de UI).',
    p1_not: '<strong>Cu\u00e1ndo NO usar:</strong> Im\u00e1genes mayores de 10 KB \u2014 el aumento del 33 % en tama\u00f1o supera la solicitud HTTP ahorrada.',
    convert_tool: 'Convierte im\u00e1genes a Base64 con nuestro codificador \u2192',
    h2_2: '2. Estructura de tokens JWT',
    p2_1: 'Los JSON Web Tokens (JWT) usan <strong>codificaci\u00f3n Base64URL</strong> (una variante segura para URLs) para sus tres partes: encabezado, carga \u00fatil y firma. Entender esto es esencial para depurar problemas de autenticaci\u00f3n.',
    p2_key: '<strong>Punto clave:</strong> Los tokens JWT <em>no est\u00e1n cifrados</em>. Cualquiera puede decodificar el encabezado y la carga \u00fatil con una simple decodificaci\u00f3n Base64. La firma verifica la integridad, no el secreto.',
    jwt_tool: 'Decodifica tokens JWT con nuestro decodificador JWT \u2192',
    h2_3: '3. Secrets de Kubernetes',
    p3_1: 'Kubernetes almacena valores secretos como cadenas codificadas en Base64 en manifiestos YAML. Este es uno de los casos de uso de Base64 m\u00e1s comunes en DevOps.',
    p3_warn: '<strong>Advertencia de seguridad:</strong> El Base64 en los secrets de Kubernetes es para codificaci\u00f3n, no cifrado. Usa soluciones como Sealed Secrets, External Secrets o Vault para seguridad real.',
    h2_4: '4. Cargas \u00fatiles de solicitudes/respuestas API',
    p4_1: 'Cuando las APIs necesitan transmitir datos binarios (im\u00e1genes, archivos, certificados) dentro de cargas JSON, la codificaci\u00f3n Base64 es el enfoque est\u00e1ndar ya que JSON solo admite texto.',
    h2_5: '5. Autenticaci\u00f3n HTTP Basic',
    p5_1: 'El esquema de autenticaci\u00f3n HTTP Basic transmite credenciales como una cadena codificada en Base64 en el encabezado <code>Authorization</code>. Todav\u00eda se usa en muchas APIs.',
    p5_warn: '<strong>Usa siempre HTTPS</strong> con autenticaci\u00f3n Basic. A trav\u00e9s de HTTP sin cifrar, las credenciales Base64 pueden ser decodificadas trivialmente por cualquiera que intercepte el tr\u00e1fico.',
    h2_6: '6. Adjuntos de correo electr\u00f3nico (MIME)',
    p6_1: 'Los protocolos de correo electr\u00f3nico (SMTP) fueron dise\u00f1ados solo para texto ASCII. Los adjuntos binarios \u2014 im\u00e1genes, PDFs, documentos \u2014 se codifican en Base64 antes de incluirse en mensajes de correo electr\u00f3nico a trav\u00e9s de MIME.',
    p6_2: 'Tras bambalinas, el mensaje MIME se ve as\u00ed:',
    h2_7: '7. Almacenamiento de datos binarios en sistemas de solo texto',
    p7_1: 'Algunos sistemas \u2014 variables de entorno, archivos de configuraci\u00f3n JSON, exportaciones CSV \u2014 solo admiten texto. Base64 permite incrustar datos binarios de forma segura en estos contextos de solo texto.',
    p7_2: 'Este patr\u00f3n se usa com\u00fanmente en plataformas en la nube (Heroku, Railway, Fly.io) donde las variables de entorno son el mecanismo de configuraci\u00f3n principal.',
    h2_compare: 'Base64 vs Base64URL',
    p_compare: 'El Base64 est\u00e1ndar usa <code>+</code> y <code>/</code> que no son seguros en URLs. Base64URL los reemplaza por <code>-</code> y <code>_</code>:',
    th_variant: 'Variante',
    th_alphabet: 'Alfabeto',
    th_padding: 'Relleno',
    th_used_in: 'Usado en',
    td_padding_yes: 'Relleno =',
    td_padding_no: 'Sin relleno',
    td_used_1: 'Correo, data URIs, secrets K8s',
    td_used_2: 'Tokens JWT, par\u00e1metros de URL',
    h2_ref: 'Referencia r\u00e1pida: Comandos Base64',
    encode_tool: 'Codifica y decodifica Base64 al instante con nuestra herramienta \u2192',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: '\u00bfEs la codificaci\u00f3n Base64 lo mismo que el cifrado?',
    faq1_a: 'No. Base64 es un esquema de codificaci\u00f3n, no cifrado. Cualquiera puede decodificar datos Base64 \u2014 no proporciona seguridad. Base64 est\u00e1 dise\u00f1ado para el transporte seguro de datos a trav\u00e9s de canales de solo texto, no para proteger informaci\u00f3n sensible.',
    faq2_q: '\u00bfPor qu\u00e9 Base64 aumenta el tama\u00f1o de los datos en ~33 %?',
    faq2_a: 'Base64 convierte 3 bytes de datos binarios en 4 caracteres ASCII (6 bits por car\u00e1cter en lugar de 8). Esta proporci\u00f3n 3:4 significa que los datos codificados en Base64 son aproximadamente un 33 % m\u00e1s grandes que los datos binarios originales. La compensaci\u00f3n es la compatibilidad universal con texto.',
    faq3_q: '\u00bfCu\u00e1ndo NO deber\u00eda usar Base64?',
    faq3_a: 'Evita Base64 para archivos grandes (im\u00e1genes de m\u00e1s de 10 KB, videos, documentos) ya que aumenta significativamente el tama\u00f1o de la carga \u00fatil. Tambi\u00e9n ev\u00edtalo para almacenamiento a largo plazo en bases de datos \u2014 usa columnas binarias (BLOB/BYTEA) en su lugar. Base64 es ideal para datos peque\u00f1os que viajan por canales de solo texto.',
  },
  zh: {
    intro: 'Base64 \u5728 Web \u5f00\u53d1\u4e2d\u65e0\u5904\u4e0d\u5728\uff0c\u4f46\u5927\u591a\u6570\u6559\u7a0b\u53ea\u89e3\u91ca\u4e86\u5b83\u662f<em>\u5982\u4f55</em>\u5de5\u4f5c\u7684\u3002\u672c\u6587\u91cd\u70b9\u4ecb\u7ecd\u60a8\u5728\u65e5\u5e38\u5f00\u53d1\u5de5\u4f5c\u4e2d\u5b9e\u9645\u4f7f\u7528 Base64 \u7f16\u7801\u7684 <strong>7 \u4e2a\u771f\u5b9e\u573a\u666f</strong>\uff0c\u5e76\u63d0\u4f9b\u53ef\u76f4\u63a5\u590d\u5236\u7684\u4ee3\u7801\u793a\u4f8b\u3002',
    try_tool: '\u8bd5\u8bd5\u6211\u4eec\u7684 Base64 \u7f16\u7801/\u89e3\u7801\u5de5\u5177 \u2192',
    h2_1: '1. \u5728 HTML/CSS \u4e2d\u5d4c\u5165\u56fe\u7247\uff08Data URI\uff09',
    p1_1: 'Data URI \u5141\u8bb8\u60a8\u5c06\u5c0f\u56fe\u7247\u76f4\u63a5\u5d4c\u5165 HTML \u6216 CSS \u4e2d\uff0c\u4ece\u800c\u7701\u53bb\u4e00\u6b21 HTTP \u8bf7\u6c42\u3002\u8fd9\u5bf9\u4e8e\u56fe\u6807\u3001\u5fbd\u6807\u548c\u5c0f\u578b UI \u5143\u7d20\u7279\u522b\u6709\u7528\u3002',
    p1_when: '<strong>\u4f55\u65f6\u4f7f\u7528\uff1a</strong>10KB \u4ee5\u4e0b\u7684\u56fe\u7247\uff08\u56fe\u6807\u3001\u5c0f\u5fbd\u6807\u3001UI \u5143\u7d20\uff09\u3002',
    p1_not: '<strong>\u4f55\u65f6\u4e0d\u4f7f\u7528\uff1a</strong>\u8d85\u8fc7 10KB \u7684\u56fe\u7247\u2014\u201433% \u7684\u5927\u5c0f\u589e\u52a0\u4f1a\u62b5\u6d88\u8282\u7701\u7684 HTTP \u8bf7\u6c42\u3002',
    convert_tool: '\u4f7f\u7528\u6211\u4eec\u7684\u7f16\u7801\u5668\u5c06\u56fe\u7247\u8f6c\u6362\u4e3a Base64 \u2192',
    h2_2: '2. JWT \u4ee4\u724c\u7ed3\u6784',
    p2_1: 'JSON Web Token\uff08JWT\uff09\u4f7f\u7528 <strong>Base64URL \u7f16\u7801</strong>\uff08\u4e00\u79cd URL \u5b89\u5168\u7684\u53d8\u4f53\uff09\u6765\u5904\u7406\u5176\u4e09\u4e2a\u90e8\u5206\uff1a\u5934\u90e8\u3001\u8f7d\u8377\u548c\u7b7e\u540d\u3002\u7406\u89e3\u8fd9\u4e00\u70b9\u5bf9\u4e8e\u8c03\u8bd5\u8ba4\u8bc1\u95ee\u9898\u81f3\u5173\u91cd\u8981\u3002',
    p2_key: '<strong>\u5173\u952e\u70b9\uff1a</strong>JWT \u4ee4\u724c<em>\u672a\u52a0\u5bc6</em>\u3002\u4efb\u4f55\u4eba\u90fd\u53ef\u4ee5\u901a\u8fc7\u7b80\u5355\u7684 Base64 \u89e3\u7801\u6765\u8bfb\u53d6\u5934\u90e8\u548c\u8f7d\u8377\u3002\u7b7e\u540d\u9a8c\u8bc1\u7684\u662f\u5b8c\u6574\u6027\uff0c\u800c\u975e\u4fdd\u5bc6\u6027\u3002',
    jwt_tool: '\u4f7f\u7528\u6211\u4eec\u7684 JWT \u89e3\u7801\u5668\u89e3\u7801 JWT \u4ee4\u724c \u2192',
    h2_3: '3. Kubernetes Secrets',
    p3_1: 'Kubernetes \u5728 YAML \u6e05\u5355\u4e2d\u4ee5 Base64 \u7f16\u7801\u5b57\u7b26\u4e32\u7684\u5f62\u5f0f\u5b58\u50a8\u5bc6\u94a5\u503c\u3002\u8fd9\u662f DevOps \u4e2d\u6700\u5e38\u89c1\u7684 Base64 \u4f7f\u7528\u573a\u666f\u4e4b\u4e00\u3002',
    p3_warn: '<strong>\u5b89\u5168\u8b66\u544a\uff1a</strong>Kubernetes Secrets \u4e2d\u7684 Base64 \u7528\u4e8e\u7f16\u7801\uff0c\u800c\u975e\u52a0\u5bc6\u3002\u8bf7\u4f7f\u7528 Sealed Secrets\u3001External Secrets \u6216 Vault \u7b49\u89e3\u51b3\u65b9\u6848\u6765\u5b9e\u73b0\u771f\u6b63\u7684\u5b89\u5168\u6027\u3002',
    h2_4: '4. API \u8bf7\u6c42/\u54cd\u5e94\u8f7d\u8377',
    p4_1: '\u5f53 API \u9700\u8981\u5728 JSON \u8f7d\u8377\u4e2d\u4f20\u8f93\u4e8c\u8fdb\u5236\u6570\u636e\uff08\u56fe\u7247\u3001\u6587\u4ef6\u3001\u8bc1\u4e66\uff09\u65f6\uff0cBase64 \u7f16\u7801\u662f\u6807\u51c6\u65b9\u6cd5\uff0c\u56e0\u4e3a JSON \u53ea\u652f\u6301\u6587\u672c\u3002',
    h2_5: '5. HTTP Basic \u8ba4\u8bc1',
    p5_1: 'HTTP Basic \u8ba4\u8bc1\u65b9\u6848\u4ee5 Base64 \u7f16\u7801\u5b57\u7b26\u4e32\u7684\u5f62\u5f0f\u5728 <code>Authorization</code> \u5934\u4e2d\u4f20\u8f93\u51ed\u636e\u3002\u8bb8\u591a API \u4ecd\u5728\u4f7f\u7528\u5b83\u3002',
    p5_warn: '<strong>\u52a1\u5fc5\u4f7f\u7528 HTTPS</strong> \u914d\u5408 Basic \u8ba4\u8bc1\u3002\u5728\u672a\u52a0\u5bc6\u7684 HTTP \u4e0a\uff0c\u4efb\u4f55\u62e6\u622a\u6d41\u91cf\u7684\u4eba\u90fd\u53ef\u4ee5\u8f7b\u6613\u89e3\u7801 Base64 \u51ed\u636e\u3002',
    h2_6: '6. \u7535\u5b50\u90ae\u4ef6\u9644\u4ef6\uff08MIME\uff09',
    p6_1: '\u7535\u5b50\u90ae\u4ef6\u534f\u8bae\uff08SMTP\uff09\u6700\u521d\u4ec5\u4e3a ASCII \u6587\u672c\u8bbe\u8ba1\u3002\u4e8c\u8fdb\u5236\u9644\u4ef6\u2014\u2014\u56fe\u7247\u3001PDF\u3001\u6587\u6863\u2014\u2014\u5728\u901a\u8fc7 MIME \u5305\u542b\u5728\u7535\u5b50\u90ae\u4ef6\u4e2d\u4e4b\u524d\u4f1a\u88ab Base64 \u7f16\u7801\u3002',
    p6_2: '\u5728\u5e55\u540e\uff0cMIME \u6d88\u606f\u770b\u8d77\u6765\u50cf\u8fd9\u6837\uff1a',
    h2_7: '7. \u5728\u7eaf\u6587\u672c\u7cfb\u7edf\u4e2d\u5b58\u50a8\u4e8c\u8fdb\u5236\u6570\u636e',
    p7_1: '\u67d0\u4e9b\u7cfb\u7edf\u2014\u2014\u73af\u5883\u53d8\u91cf\u3001JSON \u914d\u7f6e\u6587\u4ef6\u3001CSV \u5bfc\u51fa\u2014\u2014\u53ea\u652f\u6301\u6587\u672c\u3002Base64 \u8ba9\u60a8\u53ef\u4ee5\u5b89\u5168\u5730\u5728\u8fd9\u4e9b\u7eaf\u6587\u672c\u73af\u5883\u4e2d\u5d4c\u5165\u4e8c\u8fdb\u5236\u6570\u636e\u3002',
    p7_2: '\u8fd9\u79cd\u6a21\u5f0f\u5e38\u7528\u4e8e\u4e91\u5e73\u53f0\uff08Heroku\u3001Railway\u3001Fly.io\uff09\uff0c\u5728\u8fd9\u4e9b\u5e73\u53f0\u4e2d\uff0c\u73af\u5883\u53d8\u91cf\u662f\u4e3b\u8981\u7684\u914d\u7f6e\u673a\u5236\u3002',
    h2_compare: 'Base64 \u4e0e Base64URL',
    p_compare: '\u6807\u51c6 Base64 \u4f7f\u7528 <code>+</code> \u548c <code>/</code>\uff0c\u8fd9\u4e9b\u5b57\u7b26\u5728 URL \u4e2d\u4e0d\u5b89\u5168\u3002Base64URL \u5c06\u5b83\u4eec\u66ff\u6362\u4e3a <code>-</code> \u548c <code>_</code>\uff1a',
    th_variant: '\u53d8\u4f53',
    th_alphabet: '\u5b57\u6bcd\u8868',
    th_padding: '\u586b\u5145',
    th_used_in: '\u7528\u9014',
    td_padding_yes: '= \u586b\u5145',
    td_padding_no: '\u65e0\u586b\u5145',
    td_used_1: '\u7535\u5b50\u90ae\u4ef6\u3001Data URI\u3001K8s Secrets',
    td_used_2: 'JWT \u4ee4\u724c\u3001URL \u53c2\u6570',
    h2_ref: '\u5feb\u901f\u53c2\u8003\uff1aBase64 \u547d\u4ee4',
    encode_tool: '\u4f7f\u7528\u6211\u4eec\u7684\u5de5\u5177\u5373\u65f6\u7f16\u7801\u548c\u89e3\u7801 Base64 \u2192',
    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: 'Base64 \u7f16\u7801\u548c\u52a0\u5bc6\u4e00\u6837\u5417\uff1f',
    faq1_a: '\u4e0d\u4e00\u6837\u3002Base64 \u662f\u4e00\u79cd\u7f16\u7801\u65b9\u6848\uff0c\u4e0d\u662f\u52a0\u5bc6\u3002\u4efb\u4f55\u4eba\u90fd\u53ef\u4ee5\u89e3\u7801 Base64 \u6570\u636e\u2014\u2014\u5b83\u4e0d\u63d0\u4f9b\u5b89\u5168\u6027\u3002Base64 \u65e8\u5728\u901a\u8fc7\u7eaf\u6587\u672c\u901a\u9053\u5b89\u5168\u4f20\u8f93\u6570\u636e\uff0c\u800c\u975e\u4fdd\u62a4\u654f\u611f\u4fe1\u606f\u3002',
    faq2_q: '\u4e3a\u4ec0\u4e48 Base64 \u4f1a\u4f7f\u6570\u636e\u5927\u5c0f\u589e\u52a0\u7ea6 33%\uff1f',
    faq2_a: 'Base64 \u5c06 3 \u5b57\u8282\u7684\u4e8c\u8fdb\u5236\u6570\u636e\u8f6c\u6362\u4e3a 4 \u4e2a ASCII \u5b57\u7b26\uff08\u6bcf\u4e2a\u5b57\u7b26 6 \u4f4d\u800c\u975e 8 \u4f4d\uff09\u3002\u8fd9\u79cd 3:4 \u7684\u6bd4\u7387\u610f\u5473\u7740 Base64 \u7f16\u7801\u540e\u7684\u6570\u636e\u6bd4\u539f\u59cb\u4e8c\u8fdb\u5236\u6570\u636e\u5927\u7ea6\u589e\u52a0 33%\u3002\u5176\u4ee3\u4ef7\u6362\u6765\u7684\u662f\u901a\u7528\u7684\u6587\u672c\u517c\u5bb9\u6027\u3002',
    faq3_q: '\u4ec0\u4e48\u65f6\u5019\u4e0d\u5e94\u8be5\u4f7f\u7528 Base64\uff1f',
    faq3_a: '\u907f\u514d\u5bf9\u5927\u6587\u4ef6\uff08\u8d85\u8fc7 10KB \u7684\u56fe\u7247\u3001\u89c6\u9891\u3001\u6587\u6863\uff09\u4f7f\u7528 Base64\uff0c\u56e0\u4e3a\u5b83\u4f1a\u663e\u8457\u589e\u52a0\u8f7d\u8377\u5927\u5c0f\u3002\u4e5f\u5e94\u907f\u514d\u5728\u6570\u636e\u5e93\u4e2d\u8fdb\u884c\u957f\u671f\u5b58\u50a8\u2014\u2014\u8bf7\u6539\u7528\u4e8c\u8fdb\u5236\u5217\uff08BLOB/BYTEA\uff09\u3002Base64 \u6700\u9002\u5408\u901a\u8fc7\u7eaf\u6587\u672c\u901a\u9053\u4f20\u8f93\u7684\u5c0f\u6570\u636e\u3002',
  },
  id: {
    intro: 'Base64 ada di mana-mana dalam pengembangan web, tetapi sebagian besar tutorial hanya menjelaskan <em>cara</em> kerjanya. Artikel ini berfokus pada <strong>7 skenario nyata</strong> di mana Anda benar-benar akan menggunakan encoding Base64 dalam pekerjaan pengembangan sehari-hari, dengan contoh kode yang bisa langsung disalin.',
    try_tool: 'Coba alat Encoder/Decoder Base64 kami \u2192',
    h2_1: '1. Menyematkan Gambar di HTML/CSS (Data URI)',
    p1_1: 'Data URI memungkinkan Anda menyematkan gambar kecil langsung di HTML atau CSS, menghilangkan satu permintaan HTTP. Ini sangat berguna untuk ikon, logo, dan elemen UI kecil.',
    p1_when: '<strong>Kapan menggunakan:</strong> Gambar di bawah 10KB (ikon, logo kecil, elemen UI).',
    p1_not: '<strong>Kapan TIDAK menggunakan:</strong> Gambar di atas 10KB \u2014 peningkatan ukuran 33% melebihi penghematan permintaan HTTP.',
    convert_tool: 'Konversi gambar ke Base64 dengan encoder kami \u2192',
    h2_2: '2. Struktur Token JWT',
    p2_1: 'JSON Web Token (JWT) menggunakan <strong>encoding Base64URL</strong> (varian yang aman untuk URL) untuk tiga bagiannya: header, payload, dan signature. Memahami ini penting untuk debugging masalah autentikasi.',
    p2_key: '<strong>Poin penting:</strong> Token JWT <em>tidak dienkripsi</em>. Siapa pun dapat mendekode header dan payload dengan dekode Base64 sederhana. Signature memverifikasi integritas, bukan kerahasiaan.',
    jwt_tool: 'Dekode token JWT dengan JWT Decoder kami \u2192',
    h2_3: '3. Kubernetes Secrets',
    p3_1: 'Kubernetes menyimpan nilai rahasia sebagai string yang di-encode Base64 dalam manifes YAML. Ini adalah salah satu kasus penggunaan Base64 paling umum di DevOps.',
    p3_warn: '<strong>Peringatan keamanan:</strong> Base64 di Kubernetes Secrets adalah untuk encoding, bukan enkripsi. Gunakan solusi seperti Sealed Secrets, External Secrets, atau Vault untuk keamanan nyata.',
    h2_4: '4. Payload Permintaan/Respons API',
    p4_1: 'Ketika API perlu mengirimkan data biner (gambar, file, sertifikat) dalam payload JSON, encoding Base64 adalah pendekatan standar karena JSON hanya mendukung teks.',
    h2_5: '5. Autentikasi HTTP Basic',
    p5_1: 'Skema autentikasi HTTP Basic mengirimkan kredensial sebagai string yang di-encode Base64 dalam header <code>Authorization</code>. Ini masih digunakan di banyak API.',
    p5_warn: '<strong>Selalu gunakan HTTPS</strong> dengan autentikasi Basic. Melalui HTTP biasa, kredensial Base64 dapat dengan mudah didekode oleh siapa pun yang menyadap lalu lintas.',
    h2_6: '6. Lampiran Email (MIME)',
    p6_1: 'Protokol email (SMTP) dirancang hanya untuk teks ASCII. Lampiran biner \u2014 gambar, PDF, dokumen \u2014 di-encode Base64 sebelum disertakan dalam pesan email melalui MIME.',
    p6_2: 'Di balik layar, pesan MIME terlihat seperti ini:',
    h2_7: '7. Menyimpan Data Biner di Sistem Hanya-Teks',
    p7_1: 'Beberapa sistem \u2014 variabel lingkungan, file konfigurasi JSON, ekspor CSV \u2014 hanya mendukung teks. Base64 memungkinkan Anda menyematkan data biner dengan aman dalam konteks hanya-teks ini.',
    p7_2: 'Pola ini umum digunakan di platform cloud (Heroku, Railway, Fly.io) di mana variabel lingkungan adalah mekanisme konfigurasi utama.',
    h2_compare: 'Base64 vs Base64URL',
    p_compare: 'Base64 standar menggunakan <code>+</code> dan <code>/</code> yang tidak aman di URL. Base64URL menggantinya dengan <code>-</code> dan <code>_</code>:',
    th_variant: 'Varian',
    th_alphabet: 'Alfabet',
    th_padding: 'Padding',
    th_used_in: 'Digunakan di',
    td_padding_yes: 'Padding =',
    td_padding_no: 'Tanpa padding',
    td_used_1: 'Email, data URI, K8s Secrets',
    td_used_2: 'Token JWT, parameter URL',
    h2_ref: 'Referensi Cepat: Perintah Base64',
    encode_tool: 'Encode dan decode Base64 secara instan dengan alat kami \u2192',
    h2_faq: 'Pertanyaan yang Sering Diajukan',
    faq1_q: 'Apakah encoding Base64 sama dengan enkripsi?',
    faq1_a: 'Tidak. Base64 adalah skema encoding, bukan enkripsi. Siapa pun dapat mendekode data Base64 \u2014 tidak memberikan keamanan. Base64 dirancang untuk transportasi data yang aman melalui saluran hanya-teks, bukan untuk melindungi informasi sensitif.',
    faq2_q: 'Mengapa Base64 meningkatkan ukuran data sebesar ~33%?',
    faq2_a: 'Base64 mengonversi 3 byte data biner menjadi 4 karakter ASCII (6 bit per karakter, bukan 8). Rasio 3:4 ini berarti data yang di-encode Base64 sekitar 33% lebih besar dari data biner asli. Imbalannya adalah kompatibilitas teks universal.',
    faq3_q: 'Kapan saya TIDAK boleh menggunakan Base64?',
    faq3_a: 'Hindari Base64 untuk file besar (gambar di atas 10KB, video, dokumen) karena secara signifikan meningkatkan ukuran payload. Hindari juga untuk penyimpanan jangka panjang di database \u2014 gunakan kolom biner (BLOB/BYTEA) sebagai gantinya. Base64 paling cocok untuk data kecil yang berpindah melalui saluran hanya-teks.',
  },
  th: {
    intro: 'Base64 \u0e21\u0e35\u0e2d\u0e22\u0e39\u0e48\u0e17\u0e38\u0e01\u0e2b\u0e19\u0e41\u0e2b\u0e48\u0e07\u0e43\u0e19\u0e01\u0e32\u0e23\u0e1e\u0e31\u0e12\u0e19\u0e32\u0e40\u0e27\u0e47\u0e1a \u0e41\u0e15\u0e48\u0e1a\u0e17\u0e40\u0e23\u0e35\u0e22\u0e19\u0e2a\u0e48\u0e27\u0e19\u0e43\u0e2b\u0e0d\u0e48\u0e2d\u0e18\u0e34\u0e1a\u0e32\u0e22\u0e40\u0e1e\u0e35\u0e22\u0e07\u0e27\u0e48\u0e32\u0e21\u0e31\u0e19<em>\u0e17\u0e33\u0e07\u0e32\u0e19\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e44\u0e23</em> \u0e1a\u0e17\u0e04\u0e27\u0e32\u0e21\u0e19\u0e35\u0e49\u0e40\u0e19\u0e49\u0e19\u0e17\u0e35\u0e48 <strong>7 \u0e2a\u0e16\u0e32\u0e19\u0e01\u0e32\u0e23\u0e13\u0e4c\u0e08\u0e23\u0e34\u0e07</strong> \u0e17\u0e35\u0e48\u0e04\u0e38\u0e13\u0e08\u0e30\u0e43\u0e0a\u0e49\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a Base64 \u0e08\u0e23\u0e34\u0e07 \u0e46 \u0e43\u0e19\u0e07\u0e32\u0e19\u0e1e\u0e31\u0e12\u0e19\u0e32\u0e1b\u0e23\u0e30\u0e08\u0e33\u0e27\u0e31\u0e19 \u0e1e\u0e23\u0e49\u0e2d\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e42\u0e04\u0e49\u0e14\u0e17\u0e35\u0e48\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01\u0e44\u0e14\u0e49\u0e42\u0e14\u0e22\u0e15\u0e23\u0e07',
    try_tool: '\u0e25\u0e2d\u0e07\u0e43\u0e0a\u0e49\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e21\u0e37\u0e2d\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a/\u0e16\u0e2d\u0e14\u0e23\u0e2b\u0e31\u0e2a Base64 \u0e02\u0e2d\u0e07\u0e40\u0e23\u0e32 \u2192',
    h2_1: '1. \u0e1d\u0e31\u0e07\u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e\u0e43\u0e19 HTML/CSS (Data URI)',
    p1_1: 'Data URI \u0e0a\u0e48\u0e27\u0e22\u0e43\u0e2b\u0e49\u0e04\u0e38\u0e13\u0e1d\u0e31\u0e07\u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e\u0e02\u0e19\u0e32\u0e14\u0e40\u0e25\u0e47\u0e01\u0e25\u0e07\u0e43\u0e19 HTML \u0e2b\u0e23\u0e37\u0e2d CSS \u0e42\u0e14\u0e22\u0e15\u0e23\u0e07 \u0e25\u0e14\u0e01\u0e32\u0e23\u0e23\u0e49\u0e2d\u0e07\u0e02\u0e2d HTTP \u0e25\u0e07\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e04\u0e23\u0e31\u0e49\u0e07 \u0e0b\u0e36\u0e48\u0e07\u0e21\u0e35\u0e1b\u0e23\u0e30\u0e42\u0e22\u0e0a\u0e19\u0e4c\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e22\u0e34\u0e48\u0e07\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e44\u0e2d\u0e04\u0e2d\u0e19 \u0e42\u0e25\u0e42\u0e01\u0e49 \u0e41\u0e25\u0e30\u0e2d\u0e07\u0e04\u0e4c\u0e1b\u0e23\u0e30\u0e01\u0e2d\u0e1a UI \u0e02\u0e19\u0e32\u0e14\u0e40\u0e25\u0e47\u0e01',
    p1_when: '<strong>\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e43\u0e14\u0e04\u0e27\u0e23\u0e43\u0e0a\u0e49:</strong> \u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e\u0e02\u0e19\u0e32\u0e14\u0e15\u0e48\u0e33\u0e01\u0e27\u0e48\u0e32 10KB (\u0e44\u0e2d\u0e04\u0e2d\u0e19 \u0e42\u0e25\u0e42\u0e01\u0e49\u0e02\u0e19\u0e32\u0e14\u0e40\u0e25\u0e47\u0e01 \u0e2d\u0e07\u0e04\u0e4c\u0e1b\u0e23\u0e30\u0e01\u0e2d\u0e1a UI)',
    p1_not: '<strong>\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e43\u0e14\u0e44\u0e21\u0e48\u0e04\u0e27\u0e23\u0e43\u0e0a\u0e49:</strong> \u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e\u0e02\u0e19\u0e32\u0e14\u0e40\u0e01\u0e34\u0e19 10KB \u2014 \u0e01\u0e32\u0e23\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e02\u0e19\u0e32\u0e14 33% \u0e21\u0e35\u0e19\u0e49\u0e33\u0e2b\u0e19\u0e31\u0e01\u0e21\u0e32\u0e01\u0e01\u0e27\u0e48\u0e32\u0e01\u0e32\u0e23\u0e1b\u0e23\u0e30\u0e2b\u0e22\u0e31\u0e14\u0e04\u0e33\u0e02\u0e2d HTTP',
    convert_tool: '\u0e41\u0e1b\u0e25\u0e07\u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e\u0e40\u0e1b\u0e47\u0e19 Base64 \u0e14\u0e49\u0e27\u0e22\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e21\u0e37\u0e2d\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a\u0e02\u0e2d\u0e07\u0e40\u0e23\u0e32 \u2192',
    h2_2: '2. \u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07 JWT Token',
    p2_1: 'JSON Web Token (JWT) \u0e43\u0e0a\u0e49 <strong>\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a Base64URL</strong> (\u0e15\u0e31\u0e27\u0e41\u0e1b\u0e23\u0e17\u0e35\u0e48\u0e1b\u0e25\u0e2d\u0e14\u0e20\u0e31\u0e22\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a URL) \u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e2a\u0e32\u0e21\u0e2a\u0e48\u0e27\u0e19: header, payload \u0e41\u0e25\u0e30 signature \u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e43\u0e08\u0e2a\u0e34\u0e48\u0e07\u0e19\u0e35\u0e49\u0e40\u0e1b\u0e47\u0e19\u0e2a\u0e34\u0e48\u0e07\u0e08\u0e33\u0e40\u0e1b\u0e47\u0e19\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e01\u0e32\u0e23\u0e14\u0e35\u0e1a\u0e31\u0e01\u0e1b\u0e31\u0e0d\u0e2b\u0e32\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e15\u0e31\u0e27\u0e15\u0e19',
    p2_key: '<strong>\u0e08\u0e38\u0e14\u0e2a\u0e33\u0e04\u0e31\u0e0d:</strong> JWT token <em>\u0e44\u0e21\u0e48\u0e44\u0e14\u0e49\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a\u0e25\u0e31\u0e1a</em> \u0e43\u0e04\u0e23\u0e01\u0e47\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e16\u0e2d\u0e14\u0e23\u0e2b\u0e31\u0e2a header \u0e41\u0e25\u0e30 payload \u0e44\u0e14\u0e49\u0e14\u0e49\u0e27\u0e22\u0e01\u0e32\u0e23\u0e16\u0e2d\u0e14\u0e23\u0e2b\u0e31\u0e2a Base64 \u0e2d\u0e22\u0e48\u0e32\u0e07\u0e07\u0e48\u0e32\u0e22 signature \u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e21\u0e1a\u0e39\u0e23\u0e13\u0e4c \u0e44\u0e21\u0e48\u0e43\u0e0a\u0e48\u0e04\u0e27\u0e32\u0e21\u0e25\u0e31\u0e1a',
    jwt_tool: '\u0e16\u0e2d\u0e14\u0e23\u0e2b\u0e31\u0e2a JWT token \u0e14\u0e49\u0e27\u0e22 JWT Decoder \u0e02\u0e2d\u0e07\u0e40\u0e23\u0e32 \u2192',
    h2_3: '3. Kubernetes Secrets',
    p3_1: 'Kubernetes \u0e40\u0e01\u0e47\u0e1a\u0e04\u0e48\u0e32\u0e25\u0e31\u0e1a\u0e43\u0e19\u0e23\u0e39\u0e1b\u0e41\u0e1a\u0e1a\u0e2a\u0e15\u0e23\u0e34\u0e07\u0e17\u0e35\u0e48\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a Base64 \u0e43\u0e19\u0e44\u0e1f\u0e25\u0e4c YAML manifest \u0e19\u0e35\u0e48\u0e40\u0e1b\u0e47\u0e19\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e43\u0e19\u0e01\u0e23\u0e13\u0e35\u0e01\u0e32\u0e23\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19 Base64 \u0e17\u0e35\u0e48\u0e1e\u0e1a\u0e1a\u0e48\u0e2d\u0e22\u0e17\u0e35\u0e48\u0e2a\u0e38\u0e14\u0e43\u0e19 DevOps',
    p3_warn: '<strong>\u0e04\u0e33\u0e40\u0e15\u0e37\u0e2d\u0e19\u0e14\u0e49\u0e32\u0e19\u0e04\u0e27\u0e32\u0e21\u0e1b\u0e25\u0e2d\u0e14\u0e20\u0e31\u0e22:</strong> Base64 \u0e43\u0e19 Kubernetes Secrets \u0e21\u0e35\u0e44\u0e27\u0e49\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a (encoding) \u0e44\u0e21\u0e48\u0e43\u0e0a\u0e48\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a\u0e25\u0e31\u0e1a (encryption) \u0e43\u0e0a\u0e49\u0e42\u0e0b\u0e25\u0e39\u0e0a\u0e31\u0e19\u0e40\u0e0a\u0e48\u0e19 Sealed Secrets, External Secrets \u0e2b\u0e23\u0e37\u0e2d Vault \u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e04\u0e27\u0e32\u0e21\u0e1b\u0e25\u0e2d\u0e14\u0e20\u0e31\u0e22\u0e17\u0e35\u0e48\u0e41\u0e17\u0e49\u0e08\u0e23\u0e34\u0e07',
    h2_4: '4. Payload \u0e04\u0e33\u0e02\u0e2d/\u0e01\u0e32\u0e23\u0e15\u0e2d\u0e1a\u0e01\u0e25\u0e31\u0e1a API',
    p4_1: '\u0e40\u0e21\u0e37\u0e48\u0e2d API \u0e15\u0e49\u0e2d\u0e07\u0e2a\u0e48\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e44\u0e1a\u0e19\u0e32\u0e23\u0e35 (\u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e \u0e44\u0e1f\u0e25\u0e4c \u0e43\u0e1a\u0e23\u0e31\u0e1a\u0e23\u0e2d\u0e07) \u0e20\u0e32\u0e22\u0e43\u0e19 JSON payload \u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a Base64 \u0e40\u0e1b\u0e47\u0e19\u0e27\u0e34\u0e18\u0e35\u0e21\u0e32\u0e15\u0e23\u0e10\u0e32\u0e19 \u0e40\u0e19\u0e37\u0e48\u0e2d\u0e07\u0e08\u0e32\u0e01 JSON \u0e23\u0e2d\u0e07\u0e23\u0e31\u0e1a\u0e40\u0e09\u0e1e\u0e32\u0e30\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21',
    h2_5: '5. \u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e15\u0e31\u0e27\u0e15\u0e19 HTTP Basic',
    p5_1: '\u0e23\u0e39\u0e1b\u0e41\u0e1a\u0e1a\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e15\u0e31\u0e27\u0e15\u0e19 HTTP Basic \u0e2a\u0e48\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e23\u0e31\u0e1a\u0e23\u0e2d\u0e07\u0e40\u0e1b\u0e47\u0e19\u0e2a\u0e15\u0e23\u0e34\u0e07\u0e17\u0e35\u0e48\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a Base64 \u0e43\u0e19\u0e2a\u0e48\u0e27\u0e19\u0e2b\u0e31\u0e27 <code>Authorization</code> \u0e0b\u0e36\u0e48\u0e07\u0e22\u0e31\u0e07\u0e04\u0e07\u0e43\u0e0a\u0e49\u0e43\u0e19 API \u0e08\u0e33\u0e19\u0e27\u0e19\u0e21\u0e32\u0e01',
    p5_warn: '<strong>\u0e43\u0e0a\u0e49 HTTPS \u0e40\u0e2a\u0e21\u0e2d</strong>\u0e01\u0e31\u0e1a Basic Auth \u0e1c\u0e48\u0e32\u0e19 HTTP \u0e41\u0e1a\u0e1a\u0e44\u0e21\u0e48\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a\u0e25\u0e31\u0e1a \u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e23\u0e31\u0e1a\u0e23\u0e2d\u0e07 Base64 \u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e16\u0e39\u0e01\u0e16\u0e2d\u0e14\u0e23\u0e2b\u0e31\u0e2a\u0e44\u0e14\u0e49\u0e07\u0e48\u0e32\u0e22 \u0e46 \u0e42\u0e14\u0e22\u0e43\u0e04\u0e23\u0e01\u0e47\u0e15\u0e32\u0e21\u0e17\u0e35\u0e48\u0e14\u0e31\u0e01\u0e08\u0e31\u0e1a\u0e17\u0e23\u0e32\u0e1f\u0e1f\u0e34\u0e01',
    h2_6: '6. \u0e44\u0e1f\u0e25\u0e4c\u0e41\u0e19\u0e1a\u0e2d\u0e35\u0e40\u0e21\u0e25 (MIME)',
    p6_1: '\u0e42\u0e1b\u0e23\u0e42\u0e15\u0e04\u0e2d\u0e25\u0e2d\u0e35\u0e40\u0e21\u0e25 (SMTP) \u0e16\u0e39\u0e01\u0e2d\u0e2d\u0e01\u0e41\u0e1a\u0e1a\u0e21\u0e32\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21 ASCII \u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19 \u0e44\u0e1f\u0e25\u0e4c\u0e41\u0e19\u0e1a\u0e44\u0e1a\u0e19\u0e32\u0e23\u0e35 \u2014 \u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e, PDF, \u0e40\u0e2d\u0e01\u0e2a\u0e32\u0e23 \u2014 \u0e08\u0e30\u0e16\u0e39\u0e01\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a Base64 \u0e01\u0e48\u0e2d\u0e19\u0e23\u0e27\u0e21\u0e43\u0e19\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e2d\u0e35\u0e40\u0e21\u0e25\u0e1c\u0e48\u0e32\u0e19 MIME',
    p6_2: '\u0e40\u0e1a\u0e37\u0e49\u0e2d\u0e07\u0e2b\u0e25\u0e31\u0e07 \u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21 MIME \u0e21\u0e35\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e14\u0e31\u0e07\u0e19\u0e35\u0e49:',
    h2_7: '7. \u0e08\u0e31\u0e14\u0e40\u0e01\u0e47\u0e1a\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e44\u0e1a\u0e19\u0e32\u0e23\u0e35\u0e43\u0e19\u0e23\u0e30\u0e1a\u0e1a\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19',
    p7_1: '\u0e1a\u0e32\u0e07\u0e23\u0e30\u0e1a\u0e1a \u2014 \u0e15\u0e31\u0e27\u0e41\u0e1b\u0e23\u0e2a\u0e20\u0e32\u0e1e\u0e41\u0e27\u0e14\u0e25\u0e49\u0e2d\u0e21, \u0e44\u0e1f\u0e25\u0e4c\u0e04\u0e2d\u0e19\u0e1f\u0e34\u0e01 JSON, \u0e01\u0e32\u0e23\u0e2a\u0e48\u0e07\u0e2d\u0e2d\u0e01 CSV \u2014 \u0e23\u0e2d\u0e07\u0e23\u0e31\u0e1a\u0e40\u0e09\u0e1e\u0e32\u0e30\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21 Base64 \u0e0a\u0e48\u0e27\u0e22\u0e43\u0e2b\u0e49\u0e04\u0e38\u0e13\u0e1d\u0e31\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e44\u0e1a\u0e19\u0e32\u0e23\u0e35\u0e44\u0e14\u0e49\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e1b\u0e25\u0e2d\u0e14\u0e20\u0e31\u0e22\u0e43\u0e19\u0e1a\u0e23\u0e34\u0e1a\u0e17\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19\u0e40\u0e2b\u0e25\u0e48\u0e32\u0e19\u0e35\u0e49',
    p7_2: '\u0e23\u0e39\u0e1b\u0e41\u0e1a\u0e1a\u0e19\u0e35\u0e49\u0e43\u0e0a\u0e49\u0e01\u0e31\u0e19\u0e17\u0e31\u0e48\u0e27\u0e44\u0e1b\u0e43\u0e19\u0e41\u0e1e\u0e25\u0e15\u0e1f\u0e2d\u0e23\u0e4c\u0e21\u0e04\u0e25\u0e32\u0e27\u0e14\u0e4c (Heroku, Railway, Fly.io) \u0e17\u0e35\u0e48\u0e15\u0e31\u0e27\u0e41\u0e1b\u0e23\u0e2a\u0e20\u0e32\u0e1e\u0e41\u0e27\u0e14\u0e25\u0e49\u0e2d\u0e21\u0e40\u0e1b\u0e47\u0e19\u0e01\u0e25\u0e44\u0e01\u0e01\u0e32\u0e23\u0e01\u0e33\u0e2b\u0e19\u0e14\u0e04\u0e48\u0e32\u0e2b\u0e25\u0e31\u0e01',
    h2_compare: 'Base64 \u0e40\u0e17\u0e35\u0e22\u0e1a\u0e01\u0e31\u0e1a Base64URL',
    p_compare: 'Base64 \u0e21\u0e32\u0e15\u0e23\u0e10\u0e32\u0e19\u0e43\u0e0a\u0e49 <code>+</code> \u0e41\u0e25\u0e30 <code>/</code> \u0e0b\u0e36\u0e48\u0e07\u0e44\u0e21\u0e48\u0e1b\u0e25\u0e2d\u0e14\u0e20\u0e31\u0e22\u0e43\u0e19 URL Base64URL \u0e41\u0e17\u0e19\u0e17\u0e35\u0e48\u0e14\u0e49\u0e27\u0e22 <code>-</code> \u0e41\u0e25\u0e30 <code>_</code>:',
    th_variant: '\u0e15\u0e31\u0e27\u0e41\u0e1b\u0e23',
    th_alphabet: '\u0e15\u0e31\u0e27\u0e2d\u0e31\u0e01\u0e29\u0e23',
    th_padding: '\u0e01\u0e32\u0e23\u0e40\u0e15\u0e34\u0e21',
    th_used_in: '\u0e43\u0e0a\u0e49\u0e43\u0e19',
    td_padding_yes: '\u0e01\u0e32\u0e23\u0e40\u0e15\u0e34\u0e21 =',
    td_padding_no: '\u0e44\u0e21\u0e48\u0e21\u0e35\u0e01\u0e32\u0e23\u0e40\u0e15\u0e34\u0e21',
    td_used_1: '\u0e2d\u0e35\u0e40\u0e21\u0e25, Data URI, K8s Secrets',
    td_used_2: 'JWT token, \u0e1e\u0e32\u0e23\u0e32\u0e21\u0e34\u0e40\u0e15\u0e2d\u0e23\u0e4c URL',
    h2_ref: '\u0e2d\u0e49\u0e32\u0e07\u0e2d\u0e34\u0e07\u0e14\u0e48\u0e27\u0e19: \u0e04\u0e33\u0e2a\u0e31\u0e48\u0e07 Base64',
    encode_tool: '\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a\u0e41\u0e25\u0e30\u0e16\u0e2d\u0e14\u0e23\u0e2b\u0e31\u0e2a Base64 \u0e17\u0e31\u0e19\u0e17\u0e35\u0e14\u0e49\u0e27\u0e22\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e21\u0e37\u0e2d\u0e02\u0e2d\u0e07\u0e40\u0e23\u0e32 \u2192',
    h2_faq: '\u0e04\u0e33\u0e16\u0e32\u0e21\u0e17\u0e35\u0e48\u0e1e\u0e1a\u0e1a\u0e48\u0e2d\u0e22',
    faq1_q: '\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a Base64 \u0e40\u0e2b\u0e21\u0e37\u0e2d\u0e19\u0e01\u0e31\u0e1a\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a\u0e25\u0e31\u0e1a\u0e2b\u0e23\u0e37\u0e2d\u0e44\u0e21\u0e48?',
    faq1_a: '\u0e44\u0e21\u0e48 Base64 \u0e40\u0e1b\u0e47\u0e19\u0e23\u0e39\u0e1b\u0e41\u0e1a\u0e1a\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a (encoding) \u0e44\u0e21\u0e48\u0e43\u0e0a\u0e48\u0e01\u0e32\u0e23\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a\u0e25\u0e31\u0e1a (encryption) \u0e43\u0e04\u0e23\u0e01\u0e47\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e16\u0e2d\u0e14\u0e23\u0e2b\u0e31\u0e2a\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25 Base64 \u0e44\u0e14\u0e49 \u2014 \u0e44\u0e21\u0e48\u0e44\u0e14\u0e49\u0e43\u0e2b\u0e49\u0e04\u0e27\u0e32\u0e21\u0e1b\u0e25\u0e2d\u0e14\u0e20\u0e31\u0e22 Base64 \u0e16\u0e39\u0e01\u0e2d\u0e2d\u0e01\u0e41\u0e1a\u0e1a\u0e21\u0e32\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e01\u0e32\u0e23\u0e02\u0e19\u0e2a\u0e48\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e1b\u0e25\u0e2d\u0e14\u0e20\u0e31\u0e22\u0e1c\u0e48\u0e32\u0e19\u0e0a\u0e48\u0e2d\u0e07\u0e17\u0e32\u0e07\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19 \u0e44\u0e21\u0e48\u0e43\u0e0a\u0e48\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e1b\u0e01\u0e1b\u0e49\u0e2d\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e17\u0e35\u0e48\u0e2a\u0e33\u0e04\u0e31\u0e0d',
    faq2_q: '\u0e17\u0e33\u0e44\u0e21 Base64 \u0e16\u0e36\u0e07\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e02\u0e19\u0e32\u0e14\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e1b\u0e23\u0e30\u0e21\u0e32\u0e13 33%?',
    faq2_a: 'Base64 \u0e41\u0e1b\u0e25\u0e07 3 \u0e44\u0e1a\u0e15\u0e4c\u0e02\u0e2d\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e44\u0e1a\u0e19\u0e32\u0e23\u0e35\u0e40\u0e1b\u0e47\u0e19 4 \u0e15\u0e31\u0e27\u0e2d\u0e31\u0e01\u0e29\u0e23 ASCII (6 \u0e1a\u0e34\u0e15\u0e15\u0e48\u0e2d\u0e15\u0e31\u0e27\u0e2d\u0e31\u0e01\u0e29\u0e23\u0e41\u0e17\u0e19\u0e17\u0e35\u0e48\u0e08\u0e30\u0e40\u0e1b\u0e47\u0e19 8) \u0e2d\u0e31\u0e15\u0e23\u0e32\u0e2a\u0e48\u0e27\u0e19 3:4 \u0e19\u0e35\u0e49\u0e2b\u0e21\u0e32\u0e22\u0e04\u0e27\u0e32\u0e21\u0e27\u0e48\u0e32\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e17\u0e35\u0e48\u0e40\u0e02\u0e49\u0e32\u0e23\u0e2b\u0e31\u0e2a Base64 \u0e21\u0e35\u0e02\u0e19\u0e32\u0e14\u0e43\u0e2b\u0e0d\u0e48\u0e01\u0e27\u0e48\u0e32\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e44\u0e1a\u0e19\u0e32\u0e23\u0e35\u0e40\u0e14\u0e34\u0e21\u0e1b\u0e23\u0e30\u0e21\u0e32\u0e13 33% \u0e2a\u0e34\u0e48\u0e07\u0e17\u0e35\u0e48\u0e44\u0e14\u0e49\u0e41\u0e25\u0e01\u0e21\u0e32\u0e04\u0e37\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e40\u0e02\u0e49\u0e32\u0e01\u0e31\u0e19\u0e44\u0e14\u0e49\u0e01\u0e31\u0e1a\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e2a\u0e32\u0e01\u0e25',
    faq3_q: '\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e43\u0e14\u0e17\u0e35\u0e48\u0e44\u0e21\u0e48\u0e04\u0e27\u0e23\u0e43\u0e0a\u0e49 Base64?',
    faq3_a: '\u0e2b\u0e25\u0e35\u0e01\u0e40\u0e25\u0e35\u0e48\u0e22\u0e07 Base64 \u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e44\u0e1f\u0e25\u0e4c\u0e02\u0e19\u0e32\u0e14\u0e43\u0e2b\u0e0d\u0e48 (\u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e\u0e40\u0e01\u0e34\u0e19 10KB \u0e27\u0e34\u0e14\u0e35\u0e42\u0e2d \u0e40\u0e2d\u0e01\u0e2a\u0e32\u0e23) \u0e40\u0e19\u0e37\u0e48\u0e2d\u0e07\u0e08\u0e32\u0e01\u0e08\u0e30\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e02\u0e19\u0e32\u0e14 payload \u0e2d\u0e22\u0e48\u0e32\u0e07\u0e21\u0e32\u0e01 \u0e2b\u0e25\u0e35\u0e01\u0e40\u0e25\u0e35\u0e48\u0e22\u0e07\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e01\u0e32\u0e23\u0e08\u0e31\u0e14\u0e40\u0e01\u0e47\u0e1a\u0e23\u0e30\u0e22\u0e30\u0e22\u0e32\u0e27\u0e43\u0e19\u0e10\u0e32\u0e19\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e14\u0e49\u0e27\u0e22 \u2014 \u0e43\u0e0a\u0e49\u0e04\u0e2d\u0e25\u0e31\u0e21\u0e19\u0e4c\u0e44\u0e1a\u0e19\u0e32\u0e23\u0e35 (BLOB/BYTEA) \u0e41\u0e17\u0e19 Base64 \u0e40\u0e2b\u0e21\u0e32\u0e30\u0e17\u0e35\u0e48\u0e2a\u0e38\u0e14\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e02\u0e19\u0e32\u0e14\u0e40\u0e25\u0e47\u0e01\u0e17\u0e35\u0e48\u0e40\u0e14\u0e34\u0e19\u0e17\u0e32\u0e07\u0e1c\u0e48\u0e32\u0e19\u0e0a\u0e48\u0e2d\u0e07\u0e17\u0e32\u0e07\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19',
  },
};

export default function Base64Uses({ lang }: { lang: string }) {
  const tx = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: tx.faq1_q,
        acceptedAnswer: { '@type': 'Answer', text: tx.faq1_a },
      },
      {
        '@type': 'Question',
        name: tx.faq2_q,
        acceptedAnswer: { '@type': 'Answer', text: tx.faq2_a },
      },
      {
        '@type': 'Question',
        name: tx.faq3_q,
        acceptedAnswer: { '@type': 'Answer', text: tx.faq3_a },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: tx.intro }} />

      <p>
        <Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600 }}>
          {tx.try_tool}
        </Link>
      </p>

      <h2>{tx.h2_1}</h2>
      <p>{tx.p1_1}</p>
      <pre><code>{`<!-- Embed a small icon directly in HTML -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEU..." alt="icon" />

/* Embed in CSS */
.icon {
  background-image: url('data:image/svg+xml;base64,PHN2Zy...');
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p1_when }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p1_not }} />

      <pre><code>{`// Node.js: Convert image file to Base64 data URI
const fs = require('fs');
const imageBuffer = fs.readFileSync('icon.png');
const base64 = imageBuffer.toString('base64');
const dataUri = \`data:image/png;base64,\${base64}\`;
console.log(dataUri);`}</code></pre>

      <p>
        <Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600 }}>
          {tx.convert_tool}
        </Link>
      </p>

      <h2>{tx.h2_2}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_1 }} />
      <pre><code>{`// A JWT token:
// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiam9obiJ9.signature
//  ^^^^^ header ^^^^^   ^^^^^ payload ^^^^^

// Decoding the header (Base64URL → JSON):
atob('eyJhbGciOiJIUzI1NiJ9');
// → '{"alg":"HS256"}'

// Decoding the payload:
atob('eyJ1c2VyIjoiam9obiJ9');
// → '{"user":"john"}'`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_key }} />
      <p>
        <Link href={`/${lang}/tools/jwt-decoder`} style={{ fontWeight: 600 }}>
          {tx.jwt_tool}
        </Link>
      </p>

      <h2>{tx.h2_3}</h2>
      <p>{tx.p3_1}</p>
      <pre><code>{`# Creating a Kubernetes Secret
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  DB_PASSWORD: c3VwZXItc2VjcmV0  # echo -n 'super-secret' | base64
  DB_USER: YWRtaW4=              # echo -n 'admin' | base64`}</code></pre>
      <pre><code>{`# Encode a value for Kubernetes secrets
echo -n 'my-password' | base64
# → bXktcGFzc3dvcmQ=

# Decode a Kubernetes secret value
echo -n 'bXktcGFzc3dvcmQ=' | base64 --decode
# → my-password

# IMPORTANT: Always use -n with echo to avoid trailing newline!`}</code></pre>
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p3_warn }} />
      </blockquote>

      <h2>{tx.h2_4}</h2>
      <p>{tx.p4_1}</p>
      <pre><code>{`// Uploading an image via API
const fileInput = document.getElementById('avatar');
const file = fileInput.files[0];

const reader = new FileReader();
reader.onload = async () => {
  const base64 = reader.result.split(',')[1]; // Remove data URI prefix

  await fetch('/api/upload-avatar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      data: base64,        // Base64-encoded file content
      contentType: file.type,
    }),
  });
};
reader.readAsDataURL(file);`}</code></pre>

      <h2>{tx.h2_5}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_1 }} />
      <pre><code>{`// Constructing Basic Auth header
const username = 'admin';
const password = 'secret123';
const credentials = btoa(\`\${username}:\${password}\`);
// → "YWRtaW46c2VjcmV0MTIz"

// Using in fetch
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Basic \${credentials}\`,
  },
});

// curl equivalent
// curl -u admin:secret123 https://api.example.com/data
// (curl Base64-encodes automatically with -u)`}</code></pre>
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p5_warn }} />
      </blockquote>

      <h2>{tx.h2_6}</h2>
      <p>{tx.p6_1}</p>
      <pre><code>{`// Node.js: Sending email with attachment (nodemailer)
const nodemailer = require('nodemailer');
const fs = require('fs');

const pdfBuffer = fs.readFileSync('report.pdf');

await transporter.sendMail({
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Monthly Report',
  attachments: [
    {
      filename: 'report.pdf',
      content: pdfBuffer,
      // nodemailer handles Base64 encoding internally
      encoding: 'base64',
    },
  ],
});`}</code></pre>
      <p>{tx.p6_2}</p>
      <pre><code>{`Content-Type: application/pdf
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="report.pdf"

JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMg
MCBSPj4Kc3RyZWFtCkJUCi9GMS...`}</code></pre>

      <h2>{tx.h2_7}</h2>
      <p>{tx.p7_1}</p>
      <pre><code>{`# .env file: Store SSL certificate as Base64
SSL_CERT=LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0t...
SSL_KEY=LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0t...

# In your application:
# const cert = Buffer.from(process.env.SSL_CERT, 'base64');`}</code></pre>
      <pre><code>{`// Storing binary config in JSON
{
  "favicon": "iVBORw0KGgoAAAANSUhEUgAAA...",
  "sslCert": "LS0tLS1CRUdJTiBDRVJUSUZJ..."
}`}</code></pre>
      <p>{tx.p7_2}</p>

      <h2>{tx.h2_compare}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p_compare }} />
      <table>
        <thead>
          <tr><th>{tx.th_variant}</th><th>{tx.th_alphabet}</th><th>{tx.th_padding}</th><th>{tx.th_used_in}</th></tr>
        </thead>
        <tbody>
          <tr><td>Base64</td><td>A-Z, a-z, 0-9, +, /</td><td>{tx.td_padding_yes}</td><td>{tx.td_used_1}</td></tr>
          <tr><td>Base64URL</td><td>A-Z, a-z, 0-9, -, _</td><td>{tx.td_padding_no}</td><td>{tx.td_used_2}</td></tr>
        </tbody>
      </table>

      <h2>{tx.h2_ref}</h2>
      <pre><code>{`# Encode a string
echo -n 'Hello World' | base64
# → SGVsbG8gV29ybGQ=

# Decode a string
echo -n 'SGVsbG8gV29ybGQ=' | base64 --decode
# → Hello World

# Encode a file
base64 < input.bin > output.txt

# Decode a file
base64 --decode < encoded.txt > output.bin

# JavaScript (browser)
btoa('Hello World')        // encode
atob('SGVsbG8gV29ybGQ=')  // decode

# Python
import base64
base64.b64encode(b'Hello World')
base64.b64decode(b'SGVsbG8gV29ybGQ=')`}</code></pre>

      <p>
        <Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600 }}>
          {tx.encode_tool}
        </Link>
      </p>

      {/* FAQ */}
      <div className="faq-section">
        <h2>{tx.h2_faq}</h2>

        <h3>{tx.faq1_q}</h3>
        <p>{tx.faq1_a}</p>

        <h3>{tx.faq2_q}</h3>
        <p>{tx.faq2_a}</p>

        <h3>{tx.faq3_q}</h3>
        <p>{tx.faq3_a}</p>
      </div>
    </>
  );
}
