'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'JWT Security Best Practices: Algorithm Choice, Expiry, Rotation, and Attack Prevention',
    intro: 'JSON Web Tokens are everywhere — but most implementations have critical security flaws. This guide covers <strong>algorithm selection</strong> (why RS256 beats HS256 in production), <strong>token expiry</strong> and rotation strategies, <strong>refresh token patterns</strong>, and how to defend against the top JWT attacks including algorithm confusion, the "none" algorithm bypass, and secret key brute-forcing.',
    h2WhatIsJwt: 'What Is a JWT and How Does It Work?',
    jwtP1: 'A JWT is a Base64URL-encoded string with three dot-separated parts: header (algorithm + type), payload (claims), and signature. The server signs the token with a secret or private key; clients send it with every request, and the server verifies the signature to confirm authenticity without a database lookup.',
    h2Algorithms: 'Algorithm Selection: HS256 vs RS256 vs ES256',
    algorithmsP1: 'The most common JWT security mistake is using HS256 (HMAC-SHA256) in a distributed system. HS256 requires every service that verifies tokens to share the same secret — if one service is compromised, all tokens are forged. RS256 and ES256 use asymmetric keys: only the auth server holds the private signing key; other services only need the public key to verify.',
    h2Expiry: 'Token Expiry and Rotation Strategy',
    expiryP1: 'Short-lived access tokens (15 minutes) paired with long-lived refresh tokens (7–30 days) is the industry standard. When the access token expires, the client silently exchanges the refresh token for a new pair. Refresh tokens must be stored server-side (in a database) so they can be revoked — unlike access tokens which are stateless.',
    h2Attacks: 'Common JWT Attacks and Defenses',
    attacksP1: 'The most dangerous JWT vulnerabilities are: (1) Algorithm confusion — attacker changes alg to "none" to bypass signature verification; (2) RS256→HS256 confusion — attacker tricks a server expecting RS256 into using the public key as an HS256 secret; (3) Weak secrets — HS256 keys under 256 bits are brute-forceable; (4) Missing exp claim validation — libraries may not validate expiry by default.',
    h2Storage: 'Secure Token Storage',
    storageP1: 'Access tokens: store in memory (JavaScript variable) — not localStorage (XSS-vulnerable) and not cookies without httpOnly. Refresh tokens: store in httpOnly, Secure, SameSite=Strict cookies. This combination prevents XSS from reading the refresh token and CSRF from using it (SameSite blocks cross-origin cookie submission).',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Should I use JWT or opaque session tokens?',
    faq1A: 'Use opaque session tokens (random IDs stored in a database) for traditional server-rendered apps — they are simpler, instantly revocable, and have no algorithm attack surface. Use JWTs for microservices or APIs where stateless verification across multiple services is needed. Do not use JWTs just because they are popular — the added complexity requires careful security implementation.',
    faq2Q: 'How do I revoke a JWT before it expires?',
    faq2A: 'JWTs are stateless by design, making instant revocation difficult. Solutions: (1) Short expiry (15 min) — compromised tokens expire quickly; (2) Token blacklist — store revoked JTI (JWT ID) claims in Redis until their exp time; (3) Token version in user record — increment a version field on revocation, include version in JWT, reject tokens with outdated versions. Option 3 requires one database lookup per request but provides instant revocation.',
    faq3Q: 'What claims should every JWT contain?',
    faq3A: 'Required: iss (issuer — your auth server URL), sub (subject — user ID), aud (audience — intended service), exp (expiration — Unix timestamp), iat (issued at), jti (unique token ID for revocation). Optional but useful: nbf (not before), roles/permissions claims. Always validate iss and aud on the receiving service to prevent token reuse across services.',
    faq4Q: 'How long should JWT secrets and private keys be?',
    faq4A: 'HS256 secrets: minimum 256 bits (32 bytes) of cryptographically random data — use crypto.randomBytes(32). HS512: minimum 512 bits. RS256/RS512: minimum 2048-bit RSA key (4096-bit recommended for long-lived keys). ES256: 256-bit elliptic curve key (P-256). Never use passwords or human-readable strings as secrets. Rotate secrets annually or after any suspected compromise.',
    relatedTitle: 'Related Tools',
  },
  fr: { title: 'Meilleures pratiques de sécurité JWT : Algorithmes, expiration, rotation et prévention des attaques', intro: 'Les JSON Web Tokens sont omniprésents — mais la plupart des implémentations présentent des failles de sécurité critiques. Ce guide couvre la <strong>sélection des algorithmes</strong>, l\'expiration et la rotation des tokens, les <strong>patterns de refresh token</strong>, et comment se défendre contre les principales attaques JWT.', h2WhatIsJwt: 'Qu\'est-ce qu\'un JWT et comment fonctionne-t-il ?', jwtP1: 'Un JWT est une chaîne encodée en Base64URL avec trois parties séparées par des points : en-tête (algorithme + type), payload (claims) et signature.', h2Algorithms: 'Sélection d\'algorithmes : HS256 vs RS256 vs ES256', algorithmsP1: 'L\'erreur de sécurité JWT la plus courante est d\'utiliser HS256 dans un système distribué. RS256 et ES256 utilisent des clés asymétriques : seul le serveur d\'authentification détient la clé de signature privée.', h2Expiry: 'Stratégie d\'expiration et de rotation des tokens', expiryP1: 'Les tokens d\'accès à courte durée de vie (15 minutes) associés à des tokens de rafraîchissement à longue durée de vie (7 à 30 jours) constituent la norme industrielle.', h2Attacks: 'Attaques JWT courantes et défenses', attacksP1: 'Les vulnérabilités JWT les plus dangereuses sont : la confusion d\'algorithme, la confusion RS256→HS256, les secrets faibles et la validation de l\'exp manquante.', h2Storage: 'Stockage sécurisé des tokens', storageP1: 'Tokens d\'accès : stockez en mémoire (variable JavaScript). Tokens de rafraîchissement : stockez dans des cookies httpOnly, Secure, SameSite=Strict.', h2Faq: 'Questions fréquentes', faq1Q: 'Devrais-je utiliser JWT ou des tokens de session opaques ?', faq1A: 'Utilisez des tokens de session opaques pour les applications rendues côté serveur. Utilisez les JWT pour les microservices ou les API où une vérification sans état est nécessaire.', faq2Q: 'Comment révoquer un JWT avant son expiration ?', faq2A: 'Solutions : expiration courte (15 min), liste noire de tokens dans Redis, ou version de token dans l\'enregistrement utilisateur.', faq3Q: 'Quels claims doit contenir chaque JWT ?', faq3A: 'Obligatoires : iss, sub, aud, exp, iat, jti. Validez toujours iss et aud sur le service destinataire.', faq4Q: 'Quelle longueur pour les secrets JWT et les clés privées ?', faq4A: 'Secrets HS256 : minimum 256 bits. RS256 : clé RSA minimum 2048 bits. ES256 : clé de courbe elliptique 256 bits.', relatedTitle: 'Outils associés' },
  de: { title: 'JWT-Sicherheits-Best-Practices: Algorithmuswahl, Ablauf, Rotation und Angriffsabwehr', intro: 'JSON Web Tokens sind allgegenwärtig — aber die meisten Implementierungen haben kritische Sicherheitslücken. Dieser Leitfaden behandelt <strong>Algorithmusauswahl</strong>, Token-Ablauf und Rotation, <strong>Refresh-Token-Muster</strong> und die Abwehr der wichtigsten JWT-Angriffe.', h2WhatIsJwt: 'Was ist ein JWT und wie funktioniert es?', jwtP1: 'Ein JWT ist ein Base64URL-kodierter String mit drei durch Punkte getrennten Teilen: Header (Algorithmus + Typ), Payload (Claims) und Signatur.', h2Algorithms: 'Algorithmusauswahl: HS256 vs RS256 vs ES256', algorithmsP1: 'Der häufigste JWT-Sicherheitsfehler ist die Verwendung von HS256 in einem verteilten System. RS256 und ES256 verwenden asymmetrische Schlüssel.', h2Expiry: 'Token-Ablauf- und Rotationsstrategie', expiryP1: 'Kurzlebige Access-Tokens (15 Minuten) gepaart mit langlebigen Refresh-Tokens (7–30 Tage) ist der Industriestandard.', h2Attacks: 'Häufige JWT-Angriffe und Verteidigungsmaßnahmen', attacksP1: 'Die gefährlichsten JWT-Schwachstellen sind: Algorithmusverwirrung, RS256→HS256-Verwirrung, schwache Secrets und fehlende exp-Validierung.', h2Storage: 'Sichere Token-Speicherung', storageP1: 'Access-Tokens: im Speicher speichern. Refresh-Tokens: in httpOnly, Secure, SameSite=Strict-Cookies speichern.', h2Faq: 'Häufig gestellte Fragen', faq1Q: 'Soll ich JWT oder opake Session-Tokens verwenden?', faq1A: 'Verwenden Sie opake Session-Tokens für serverseitig gerenderte Apps. Verwenden Sie JWTs für Microservices oder APIs, wo zustandslose Verifikation benötigt wird.', faq2Q: 'Wie widerrufe ich ein JWT vor dessen Ablauf?', faq2A: 'Lösungen: kurze Ablaufzeit (15 Min), Token-Blacklist in Redis, oder Token-Version im Benutzerdatensatz.', faq3Q: 'Welche Claims sollte jedes JWT enthalten?', faq3A: 'Pflicht: iss, sub, aud, exp, iat, jti. Validieren Sie immer iss und aud auf dem empfangenden Service.', faq4Q: 'Wie lang sollten JWT-Secrets und private Schlüssel sein?', faq4A: 'HS256-Secrets: mindestens 256 Bits. RS256: mindestens 2048-Bit-RSA-Schlüssel. ES256: 256-Bit-Elliptische-Kurven-Schlüssel.', relatedTitle: 'Verwandte Tools' },
  it: { title: 'Best Practice di Sicurezza JWT', intro: 'I JSON Web Token sono ovunque — ma la maggior parte delle implementazioni ha gravi falle di sicurezza. Questa guida copre la <strong>scelta degli algoritmi</strong>, la scadenza e rotazione dei token e la difesa dagli attacchi JWT più comuni.', h2WhatIsJwt: 'Cos\'è un JWT e come funziona?', jwtP1: 'Un JWT è una stringa codificata in Base64URL con tre parti separate da punti: header (algoritmo + tipo), payload (claims) e firma.', h2Algorithms: 'Scelta degli algoritmi: HS256 vs RS256 vs ES256', algorithmsP1: 'L\'errore di sicurezza JWT più comune è usare HS256 in un sistema distribuito. RS256 ed ES256 usano chiavi asimmetriche.', h2Expiry: 'Strategia di scadenza e rotazione dei token', expiryP1: 'Access token a breve durata (15 minuti) abbinati a refresh token a lunga durata (7–30 giorni) è lo standard del settore.', h2Attacks: 'Attacchi JWT comuni e difese', attacksP1: 'Le vulnerabilità JWT più pericolose sono: confusione di algoritmo, confusione RS256→HS256, segreti deboli e validazione exp mancante.', h2Storage: 'Archiviazione sicura dei token', storageP1: 'Access token: conservare in memoria. Refresh token: conservare in cookie httpOnly, Secure, SameSite=Strict.', h2Faq: 'Domande frequenti', faq1Q: 'Devo usare JWT o token di sessione opachi?', faq1A: 'Usa token di sessione opachi per app renderizzate lato server. Usa JWT per microservizi o API dove è necessaria la verifica stateless.', faq2Q: 'Come posso revocare un JWT prima della scadenza?', faq2A: 'Soluzioni: scadenza breve (15 min), blacklist di token in Redis o versione del token nel record utente.', faq3Q: 'Quali claim deve contenere ogni JWT?', faq3A: 'Obbligatori: iss, sub, aud, exp, iat, jti. Valida sempre iss e aud sul servizio ricevente.', faq4Q: 'Quanto devono essere lunghi i segreti JWT e le chiavi private?', faq4A: 'Segreti HS256: minimo 256 bit. RS256: chiave RSA minima 2048 bit. ES256: chiave a curva ellittica 256 bit.', relatedTitle: 'Strumenti correlati' },
  es: { title: 'Mejores practicas de seguridad JWT', intro: 'Los JSON Web Tokens estan en todas partes — pero la mayoria de las implementaciones tienen fallas de seguridad criticas. Esta guia cubre la <strong>seleccion de algoritmos</strong>, la expiracion y rotacion de tokens, y la defensa contra los principales ataques JWT.', h2WhatIsJwt: 'Que es un JWT y como funciona?', jwtP1: 'Un JWT es una cadena codificada en Base64URL con tres partes separadas por puntos: encabezado (algoritmo + tipo), payload (claims) y firma.', h2Algorithms: 'Seleccion de algoritmos: HS256 vs RS256 vs ES256', algorithmsP1: 'El error de seguridad JWT mas comun es usar HS256 en un sistema distribuido. RS256 y ES256 usan claves asimetricas.', h2Expiry: 'Estrategia de expiracion y rotacion de tokens', expiryP1: 'Los access tokens de corta duracion (15 minutos) junto con refresh tokens de larga duracion (7–30 dias) es el estandar de la industria.', h2Attacks: 'Ataques JWT comunes y defensas', attacksP1: 'Las vulnerabilidades JWT mas peligrosas son: confusion de algoritmo, confusion RS256→HS256, secretos debiles y falta de validacion de exp.', h2Storage: 'Almacenamiento seguro de tokens', storageP1: 'Access tokens: almacenar en memoria. Refresh tokens: almacenar en cookies httpOnly, Secure, SameSite=Strict.', h2Faq: 'Preguntas frecuentes', faq1Q: 'Deberia usar JWT o tokens de sesion opacos?', faq1A: 'Usa tokens de sesion opacos para apps renderizadas en el servidor. Usa JWT para microservicios o APIs donde se necesita verificacion sin estado.', faq2Q: 'Como puedo revocar un JWT antes de que expire?', faq2A: 'Soluciones: expiracion corta (15 min), lista negra de tokens en Redis o version de token en el registro de usuario.', faq3Q: 'Que claims debe contener cada JWT?', faq3A: 'Obligatorios: iss, sub, aud, exp, iat, jti. Valida siempre iss y aud en el servicio receptor.', faq4Q: 'Que tan largos deben ser los secretos JWT y las claves privadas?', faq4A: 'Secretos HS256: minimo 256 bits. RS256: clave RSA minima 2048 bits. ES256: clave de curva eliptica 256 bits.', relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'Melhores práticas de segurança JWT', intro: 'Os JSON Web Tokens estão em todo lugar — mas a maioria das implementações tem falhas críticas de segurança. Este guia cobre a <strong>seleção de algoritmos</strong>, a expiração e rotação de tokens e a defesa contra os principais ataques JWT.', h2WhatIsJwt: 'O que é um JWT e como funciona?', jwtP1: 'Um JWT é uma string codificada em Base64URL com três partes separadas por pontos: cabeçalho (algoritmo + tipo), payload (claims) e assinatura.', h2Algorithms: 'Seleção de algoritmos: HS256 vs RS256 vs ES256', algorithmsP1: 'O erro de segurança JWT mais comum é usar HS256 em um sistema distribuído. RS256 e ES256 usam chaves assimétricas.', h2Expiry: 'Estratégia de expiração e rotação de tokens', expiryP1: 'Access tokens de curta duração (15 minutos) combinados com refresh tokens de longa duração (7–30 dias) é o padrão da indústria.', h2Attacks: 'Ataques JWT comuns e defesas', attacksP1: 'As vulnerabilidades JWT mais perigosas são: confusão de algoritmo, confusão RS256→HS256, segredos fracos e validação de exp ausente.', h2Storage: 'Armazenamento seguro de tokens', storageP1: 'Access tokens: armazenar na memória. Refresh tokens: armazenar em cookies httpOnly, Secure, SameSite=Strict.', h2Faq: 'Perguntas frequentes', faq1Q: 'Devo usar JWT ou tokens de sessão opacos?', faq1A: 'Use tokens de sessão opacos para apps renderizados no servidor. Use JWTs para microsserviços ou APIs onde verificação sem estado é necessária.', faq2Q: 'Como revogar um JWT antes de expirar?', faq2A: 'Soluções: expiração curta (15 min), lista negra de tokens no Redis ou versão de token no registro do usuário.', faq3Q: 'Que claims cada JWT deve conter?', faq3A: 'Obrigatórios: iss, sub, aud, exp, iat, jti. Sempre valide iss e aud no serviço receptor.', faq4Q: 'Qual o tamanho dos segredos JWT e chaves privadas?', faq4A: 'Segredos HS256: mínimo 256 bits. RS256: chave RSA mínima 2048 bits. ES256: chave de curva elíptica 256 bits.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'JWT-beveiligingsbest practices', intro: 'JSON Web Tokens zijn overal — maar de meeste implementaties hebben kritieke beveiligingsfouten. Deze gids behandelt <strong>algoritme-selectie</strong>, token-vervaldatum en rotatie, en verdediging tegen de belangrijkste JWT-aanvallen.', h2WhatIsJwt: 'Wat is een JWT en hoe werkt het?', jwtP1: 'Een JWT is een Base64URL-gecodeerde string met drie door punten gescheiden delen: header (algoritme + type), payload (claims) en handtekening.', h2Algorithms: 'Algoritme-selectie: HS256 vs RS256 vs ES256', algorithmsP1: 'De meest voorkomende JWT-beveiligingsfout is het gebruik van HS256 in een gedistribueerd systeem. RS256 en ES256 gebruiken asymmetrische sleutels.', h2Expiry: 'Token-verval- en rotatiestrategie', expiryP1: 'Kortlevende access tokens (15 minuten) gecombineerd met langlevende refresh tokens (7–30 dagen) is de industriestandaard.', h2Attacks: 'Veelvoorkomende JWT-aanvallen en verdedigingen', attacksP1: 'De gevaarlijkste JWT-kwetsbaarheden zijn: algoritme-verwarring, RS256→HS256-verwarring, zwakke geheimen en ontbrekende exp-validatie.', h2Storage: 'Veilige token-opslag', storageP1: 'Access tokens: opslaan in geheugen. Refresh tokens: opslaan in httpOnly, Secure, SameSite=Strict cookies.', h2Faq: 'Veelgestelde vragen', faq1Q: 'Moet ik JWT of opaque sessietokens gebruiken?', faq1A: 'Gebruik opaque sessietokens voor server-rendered apps. Gebruik JWTs voor microservices of API\'s waar stateless verificatie nodig is.', faq2Q: 'Hoe kan ik een JWT voor vervaldatum intrekken?', faq2A: 'Oplossingen: korte vervaldatum (15 min), token-blacklist in Redis of tokenversie in gebruikersrecord.', faq3Q: 'Welke claims moet elke JWT bevatten?', faq3A: 'Verplicht: iss, sub, aud, exp, iat, jti. Valideer altijd iss en aud op de ontvangende service.', faq4Q: 'Hoe lang moeten JWT-geheimen en privésleutels zijn?', faq4A: 'HS256-geheimen: minimaal 256 bits. RS256: minimaal 2048-bit RSA-sleutel. ES256: 256-bit elliptische curve sleutel.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Najlepsze praktyki bezpieczeństwa JWT', intro: 'Tokeny JSON Web są wszędzie — ale większość implementacji ma krytyczne luki bezpieczeństwa. Ten przewodnik omawia <strong>wybór algorytmu</strong>, wygasanie i rotację tokenów oraz obronę przed głównymi atakami JWT.', h2WhatIsJwt: 'Co to jest JWT i jak działa?', jwtP1: 'JWT to ciąg zakodowany w Base64URL z trzema częściami oddzielonymi kropkami: nagłówek (algorytm + typ), payload (claims) i podpis.', h2Algorithms: 'Wybór algorytmu: HS256 vs RS256 vs ES256', algorithmsP1: 'Najczęstszy błąd bezpieczeństwa JWT to używanie HS256 w systemie rozproszonym. RS256 i ES256 używają kluczy asymetrycznych.', h2Expiry: 'Strategia wygasania i rotacji tokenów', expiryP1: 'Krótkotrwałe tokeny dostępu (15 minut) w połączeniu z długotrwałymi tokenami odświeżania (7–30 dni) to standard branżowy.', h2Attacks: 'Typowe ataki JWT i obrona', attacksP1: 'Najgroźniejsze luki JWT to: zamieszanie algorytmu, zamieszanie RS256→HS256, słabe sekrety i brakująca walidacja exp.', h2Storage: 'Bezpieczne przechowywanie tokenów', storageP1: 'Tokeny dostępu: przechowuj w pamięci. Tokeny odświeżania: przechowuj w plikach cookie httpOnly, Secure, SameSite=Strict.', h2Faq: 'Często zadawane pytania', faq1Q: 'Czy powinienem używać JWT czy nieprzezroczystych tokenów sesji?', faq1A: 'Używaj nieprzezroczystych tokenów sesji dla aplikacji renderowanych po stronie serwera. Używaj JWT dla mikroserwisów lub API.', faq2Q: 'Jak odwołać JWT przed wygaśnięciem?', faq2A: 'Rozwiązania: krótkie wygasanie (15 min), czarna lista tokenów w Redis lub wersja tokenu w rekordzie użytkownika.', faq3Q: 'Jakie claims powinien zawierać każdy JWT?', faq3A: 'Wymagane: iss, sub, aud, exp, iat, jti. Zawsze waliduj iss i aud w serwisie odbierającym.', faq4Q: 'Jak długie powinny być sekrety JWT i klucze prywatne?', faq4A: 'Sekrety HS256: minimum 256 bitów. RS256: minimum 2048-bitowy klucz RSA. ES256: 256-bitowy klucz krzywej eliptycznej.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'JWT-säkerhets bästa praxis', intro: 'JSON Web Tokens finns överallt — men de flesta implementationer har kritiska säkerhetsbrister. Den här guiden täcker <strong>algoritmval</strong>, token-utgång och rotation samt försvar mot de viktigaste JWT-attackerna.', h2WhatIsJwt: 'Vad är en JWT och hur fungerar den?', jwtP1: 'En JWT är en Base64URL-kodad sträng med tre punktseparerade delar: header (algoritm + typ), payload (claims) och signatur.', h2Algorithms: 'Algoritmval: HS256 vs RS256 vs ES256', algorithmsP1: 'Det vanligaste JWT-säkerhetsmisstaget är att använda HS256 i ett distribuerat system. RS256 och ES256 använder asymmetriska nycklar.', h2Expiry: 'Token-utgångs- och rotationsstrategi', expiryP1: 'Kortlivade access tokens (15 minuter) kombinerade med långlivade refresh tokens (7–30 dagar) är industristandarden.', h2Attacks: 'Vanliga JWT-attacker och försvar', attacksP1: 'De farligaste JWT-sårbarheterna är: algoritmförvirring, RS256→HS256-förvirring, svaga hemligheter och saknad exp-validering.', h2Storage: 'Säker tokenlagring', storageP1: 'Access tokens: spara i minnet. Refresh tokens: spara i httpOnly, Secure, SameSite=Strict-cookies.', h2Faq: 'Vanliga frågor', faq1Q: 'Ska jag använda JWT eller opaka sessionstokens?', faq1A: 'Använd opaka sessionstokens för serverrenderade appar. Använd JWT för mikrotjänster eller API:er där tillståndslös verifiering behövs.', faq2Q: 'Hur återkallar jag en JWT innan den löper ut?', faq2A: 'Lösningar: kort utgångstid (15 min), token-svartlista i Redis eller tokenversion i användarposten.', faq3Q: 'Vilka claims ska varje JWT innehålla?', faq3A: 'Obligatoriska: iss, sub, aud, exp, iat, jti. Validera alltid iss och aud på den mottagande tjänsten.', faq4Q: 'Hur långa ska JWT-hemligheter och privata nycklar vara?', faq4A: 'HS256-hemligheter: minst 256 bitar. RS256: minst 2048-bitars RSA-nyckel. ES256: 256-bitars elliptisk kurva-nyckel.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'JWT-sikkerhetsbeste praksiser', intro: 'JSON Web Tokens er overalt — men de fleste implementasjoner har kritiske sikkerhetsfeil. Denne guiden dekker <strong>algoritmvalg</strong>, token-utløp og rotasjon, og forsvar mot de viktigste JWT-angrepene.', h2WhatIsJwt: 'Hva er en JWT og hvordan fungerer den?', jwtP1: 'En JWT er en Base64URL-kodet streng med tre punktseparerte deler: header (algoritme + type), nyttelast (claims) og signatur.', h2Algorithms: 'Algoritmvalg: HS256 vs RS256 vs ES256', algorithmsP1: 'Den vanligste JWT-sikkerhetsfeilen er å bruke HS256 i et distribuert system. RS256 og ES256 bruker asymmetriske nøkler.', h2Expiry: 'Token-utløps- og rotasjonsstrategi', expiryP1: 'Kortlivede access tokens (15 minutter) kombinert med langlivede refresh tokens (7–30 dager) er industristandarden.', h2Attacks: 'Vanlige JWT-angrep og forsvar', attacksP1: 'De farligste JWT-sårbarhetene er: algoritmeforvirring, RS256→HS256-forvirring, svake hemmeligheter og manglende exp-validering.', h2Storage: 'Sikker tokenlagring', storageP1: 'Access tokens: lagre i minnet. Refresh tokens: lagre i httpOnly, Secure, SameSite=Strict-informasjonskapsler.', h2Faq: 'Vanlige spørsmål', faq1Q: 'Bør jeg bruke JWT eller opake sesjonstokens?', faq1A: 'Bruk opake sesjonstokens for serverrenderte apper. Bruk JWT for mikrotjenester eller API-er der tilstandsløs verifisering er nødvendig.', faq2Q: 'Hvordan tilbakekaller jeg en JWT før den utløper?', faq2A: 'Løsninger: kort utløpstid (15 min), token-svarteliste i Redis eller tokenversjon i brukerposten.', faq3Q: 'Hvilke claims bør hver JWT inneholde?', faq3A: 'Obligatoriske: iss, sub, aud, exp, iat, jti. Valider alltid iss og aud på den mottakende tjenesten.', faq4Q: 'Hvor lange bør JWT-hemmeligheter og private nøkler være?', faq4A: 'HS256-hemmeligheter: minimum 256 biter. RS256: minimum 2048-biters RSA-nøkkel. ES256: 256-biters elliptisk kurve-nøkkel.', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'JWT 安全最佳实践：算法选择、过期、轮换与攻击防御', intro: 'JSON Web Token 无处不在——但大多数实现存在严重安全漏洞。本指南涵盖<strong>算法选择</strong>（为何 RS256 优于 HS256）、Token 过期与轮换策略、<strong>Refresh Token 模式</strong>以及如何抵御算法混淆、"none" 算法绕过和密钥暴力破解等顶级 JWT 攻击。', h2WhatIsJwt: 'JWT 是什么？它如何工作？', jwtP1: 'JWT 是一个 Base64URL 编码的字符串，由三个点分隔的部分组成：头部（算法 + 类型）、载荷（声明）和签名。服务端用密钥或私钥签名 Token；客户端每次请求时发送它，服务端验证签名以确认真实性而无需数据库查找。', h2Algorithms: '算法选择：HS256 vs RS256 vs ES256', algorithmsP1: '最常见的 JWT 安全错误是在分布式系统中使用 HS256。HS256 要求每个验证 Token 的服务共享同一个密钥——若一个服务被攻破，所有 Token 都可被伪造。RS256 和 ES256 使用非对称密钥：只有认证服务器持有私钥，其他服务只需公钥即可验证。', h2Expiry: 'Token 过期与轮换策略', expiryP1: '短期 Access Token（15 分钟）配合长期 Refresh Token（7-30 天）是行业标准。Access Token 过期后，客户端静默地用 Refresh Token 换取新的令牌对。Refresh Token 必须存储在服务端（数据库中）以便可以撤销——不像 Access Token 是无状态的。', h2Attacks: '常见 JWT 攻击与防御', attacksP1: '最危险的 JWT 漏洞：（1）算法混淆——攻击者将 alg 改为 "none" 以绕过签名验证；（2）RS256→HS256 混淆——攻击者欺骗期望 RS256 的服务器将公钥作为 HS256 密钥；（3）弱密钥——小于 256 位的 HS256 密钥可被暴力破解；（4）缺少 exp 声明验证——库默认可能不验证过期时间。', h2Storage: '安全的 Token 存储', storageP1: 'Access Token：存储在内存中（JavaScript 变量）——不存在 localStorage（易受 XSS 攻击）。Refresh Token：存储在 httpOnly、Secure、SameSite=Strict cookie 中。这种组合防止 XSS 读取 Refresh Token，SameSite 阻止跨源 cookie 提交。', h2Faq: '常见问题', faq1Q: '我应该使用 JWT 还是不透明会话 Token？', faq1A: '传统服务端渲染应用使用不透明会话 Token（存储在数据库中的随机 ID）——更简单、可即时撤销、无算法攻击面。微服务或需要跨多个服务进行无状态验证的 API 使用 JWT。', faq2Q: '如何在过期前撤销 JWT？', faq2A: 'JWT 设计上是无状态的，即时撤销较难。解决方案：（1）短过期时间（15 分钟）；（2）Token 黑名单——在 Redis 中存储已撤销的 JTI；（3）用户记录中的 Token 版本——撤销时递增版本字段，在 JWT 中包含版本，拒绝版本过期的 Token。', faq3Q: '每个 JWT 应包含哪些声明？', faq3A: '必须：iss（签发者）、sub（主体/用户 ID）、aud（受众/目标服务）、exp（过期时间）、iat（签发时间）、jti（唯一 Token ID 用于撤销）。始终在接收服务上验证 iss 和 aud，防止跨服务的 Token 重用。', faq4Q: 'JWT 密钥和私钥应该多长？', faq4A: 'HS256 密钥：最少 256 位（32 字节）的加密随机数据，使用 crypto.randomBytes(32)。RS256/RS512：最少 2048 位 RSA 密钥（长期密钥推荐 4096 位）。ES256：256 位椭圆曲线密钥（P-256）。永远不要使用密码或人类可读字符串作为密钥。', relatedTitle: '相关工具' },
  ja: { title: 'JWTセキュリティのベストプラクティス：アルゴリズム選択、有効期限、ローテーション、攻撃防御', intro: 'JSON Web Tokenはいたるところで使われています — しかし、ほとんどの実装には重大なセキュリティの欠陥があります。このガイドでは<strong>アルゴリズム選択</strong>、トークンの有効期限とローテーション、<strong>リフレッシュトークンパターン</strong>、主要なJWT攻撃への防御方法を解説します。', h2WhatIsJwt: 'JWTとは何か、どのように機能するか？', jwtP1: 'JWTはBase64URLエンコードされた文字列で、ドットで区切られた3つの部分で構成されています：ヘッダー（アルゴリズム＋タイプ）、ペイロード（クレーム）、署名。', h2Algorithms: 'アルゴリズム選択：HS256 vs RS256 vs ES256', algorithmsP1: '最も一般的なJWTセキュリティのミスは、分散システムでHS256を使用することです。RS256とES256は非対称鍵を使用します。', h2Expiry: 'トークンの有効期限とローテーション戦略', expiryP1: '短命のアクセストークン（15分）と長命のリフレッシュトークン（7〜30日）のペアが業界標準です。', h2Attacks: '一般的なJWT攻撃と防御', attacksP1: '最も危険なJWT脆弱性：アルゴリズム混乱、RS256→HS256混乱、弱い秘密鍵、exp検証の欠如。', h2Storage: 'セキュアなトークン保存', storageP1: 'アクセストークン：メモリに保存。リフレッシュトークン：httpOnly、Secure、SameSite=StrictのCookieに保存。', h2Faq: 'よくある質問', faq1Q: 'JWTとopaque セッショントークンのどちらを使うべきか？', faq1A: 'サーバーサイドレンダリングアプリにはopaqueセッショントークンを使用。マイクロサービスやAPIにはJWTを使用。', faq2Q: '有効期限前にJWTを失効させるには？', faq2A: '解決策：短い有効期限（15分）、Redisでのトークンブラックリスト、ユーザーレコードのトークンバージョン。', faq3Q: 'すべてのJWTに含まれるべきクレームは？', faq3A: '必須：iss、sub、aud、exp、iat、jti。受信サービスでissとaudを必ず検証してください。', faq4Q: 'JWTの秘密鍵と秘密鍵の長さは？', faq4A: 'HS256の秘密鍵：最低256ビット。RS256：最低2048ビットのRSA鍵。ES256：256ビットの楕円曲線鍵。', relatedTitle: '関連ツール' },
  ko: { title: 'JWT 보안 모범 사례: 알고리즘 선택, 만료, 순환 및 공격 방어', intro: 'JSON Web Token은 어디에나 있습니다 — 하지만 대부분의 구현에는 심각한 보안 결함이 있습니다. 이 가이드는 <strong>알고리즘 선택</strong>, 토큰 만료 및 순환 전략, <strong>리프레시 토큰 패턴</strong>, 주요 JWT 공격에 대한 방어를 다룹니다.', h2WhatIsJwt: 'JWT란 무엇이고 어떻게 작동하나요?', jwtP1: 'JWT는 점으로 구분된 세 부분으로 구성된 Base64URL 인코딩 문자열입니다: 헤더(알고리즘 + 유형), 페이로드(클레임), 서명.', h2Algorithms: '알고리즘 선택: HS256 vs RS256 vs ES256', algorithmsP1: '가장 흔한 JWT 보안 실수는 분산 시스템에서 HS256을 사용하는 것입니다. RS256과 ES256은 비대칭 키를 사용합니다.', h2Expiry: '토큰 만료 및 순환 전략', expiryP1: '단기 액세스 토큰(15분)과 장기 리프레시 토큰(7~30일)의 조합이 업계 표준입니다.', h2Attacks: '일반적인 JWT 공격 및 방어', attacksP1: '가장 위험한 JWT 취약점: 알고리즘 혼동, RS256→HS256 혼동, 약한 시크릿, 누락된 exp 검증.', h2Storage: '안전한 토큰 저장', storageP1: '액세스 토큰: 메모리에 저장. 리프레시 토큰: httpOnly, Secure, SameSite=Strict 쿠키에 저장.', h2Faq: '자주 묻는 질문', faq1Q: 'JWT와 불투명 세션 토큰 중 어떤 것을 사용해야 하나요?', faq1A: '서버 사이드 렌더링 앱에는 불투명 세션 토큰을 사용하세요. 마이크로서비스나 API에는 JWT를 사용하세요.', faq2Q: 'JWT를 만료 전에 취소하려면 어떻게 해야 하나요?', faq2A: '해결책: 짧은 만료 시간(15분), Redis의 토큰 블랙리스트, 사용자 레코드의 토큰 버전.', faq3Q: '모든 JWT에 포함되어야 할 클레임은?', faq3A: '필수: iss, sub, aud, exp, iat, jti. 수신 서비스에서 항상 iss와 aud를 검증하세요.', faq4Q: 'JWT 시크릿과 개인 키의 길이는?', faq4A: 'HS256 시크릿: 최소 256비트. RS256: 최소 2048비트 RSA 키. ES256: 256비트 타원 곡선 키.', relatedTitle: '관련 도구' },
  id: { title: 'Praktik Terbaik Keamanan JWT', intro: 'JSON Web Token ada di mana-mana — tetapi sebagian besar implementasi memiliki kelemahan keamanan kritis. Panduan ini mencakup <strong>pemilihan algoritma</strong>, kedaluwarsa dan rotasi token, serta pertahanan terhadap serangan JWT utama.', h2WhatIsJwt: 'Apa itu JWT dan bagaimana cara kerjanya?', jwtP1: 'JWT adalah string yang dikodekan Base64URL dengan tiga bagian yang dipisahkan titik: header (algoritma + tipe), payload (klaim), dan tanda tangan.', h2Algorithms: 'Pemilihan Algoritma: HS256 vs RS256 vs ES256', algorithmsP1: 'Kesalahan keamanan JWT yang paling umum adalah menggunakan HS256 dalam sistem terdistribusi. RS256 dan ES256 menggunakan kunci asimetris.', h2Expiry: 'Strategi Kedaluwarsa dan Rotasi Token', expiryP1: 'Access token berumur pendek (15 menit) dipasangkan dengan refresh token berumur panjang (7-30 hari) adalah standar industri.', h2Attacks: 'Serangan JWT Umum dan Pertahanan', attacksP1: 'Kerentanan JWT paling berbahaya: kebingungan algoritma, kebingungan RS256→HS256, rahasia yang lemah, dan validasi exp yang hilang.', h2Storage: 'Penyimpanan Token yang Aman', storageP1: 'Access token: simpan di memori. Refresh token: simpan di cookie httpOnly, Secure, SameSite=Strict.', h2Faq: 'Pertanyaan yang Sering Diajukan', faq1Q: 'Haruskah saya menggunakan JWT atau token sesi buram?', faq1A: 'Gunakan token sesi buram untuk aplikasi yang dirender di server. Gunakan JWT untuk layanan mikro atau API di mana verifikasi stateless diperlukan.', faq2Q: 'Bagaimana cara mencabut JWT sebelum kedaluwarsa?', faq2A: 'Solusi: kedaluwarsa singkat (15 menit), daftar hitam token di Redis, atau versi token di catatan pengguna.', faq3Q: 'Klaim apa yang harus ada di setiap JWT?', faq3A: 'Wajib: iss, sub, aud, exp, iat, jti. Selalu validasi iss dan aud di layanan penerima.', faq4Q: 'Seberapa panjang rahasia JWT dan kunci privat harus?', faq4A: 'Rahasia HS256: minimal 256 bit. RS256: kunci RSA minimal 2048 bit. ES256: kunci kurva elips 256 bit.', relatedTitle: 'Alat Terkait' },
  th: { title: 'แนวปฏิบัติที่ดีที่สุดด้านความปลอดภัย JWT', intro: 'JSON Web Token อยู่ทุกหนแห่ง — แต่การใช้งานส่วนใหญ่มีช่องโหว่ด้านความปลอดภัยที่สำคัญ คู่มือนี้ครอบคลุม <strong>การเลือกอัลกอริทึม</strong>, การหมดอายุและการหมุนเวียน Token และการป้องกันการโจมตี JWT หลัก', h2WhatIsJwt: 'JWT คืออะไรและทำงานอย่างไร?', jwtP1: 'JWT คือสตริงที่เข้ารหัส Base64URL โดยมีสามส่วนที่คั่นด้วยจุด: header (อัลกอริทึม + ประเภท), payload (claims) และลายเซ็น', h2Algorithms: 'การเลือกอัลกอริทึม: HS256 vs RS256 vs ES256', algorithmsP1: 'ข้อผิดพลาดด้านความปลอดภัย JWT ที่พบบ่อยที่สุดคือการใช้ HS256 ในระบบแบบกระจาย RS256 และ ES256 ใช้คีย์แบบอสมมาตร', h2Expiry: 'กลยุทธ์การหมดอายุและการหมุนเวียน Token', expiryP1: 'Access token อายุสั้น (15 นาที) ร่วมกับ refresh token อายุยาว (7-30 วัน) คือมาตรฐานอุตสาหกรรม', h2Attacks: 'การโจมตี JWT ทั่วไปและการป้องกัน', attacksP1: 'ช่องโหว่ JWT ที่อันตรายที่สุด: ความสับสนของอัลกอริทึม, ความสับสน RS256→HS256, ความลับที่อ่อนแอ และการขาดการตรวจสอบ exp', h2Storage: 'การจัดเก็บ Token ที่ปลอดภัย', storageP1: 'Access token: เก็บไว้ในหน่วยความจำ Refresh token: เก็บไว้ใน cookie httpOnly, Secure, SameSite=Strict', h2Faq: 'คำถามที่พบบ่อย', faq1Q: 'ควรใช้ JWT หรือ opaque session token?', faq1A: 'ใช้ opaque session token สำหรับแอปที่เรนเดอร์ฝั่งเซิร์ฟเวอร์ ใช้ JWT สำหรับ microservices หรือ API ที่ต้องการการตรวจสอบแบบ stateless', faq2Q: 'วิธีเพิกถอน JWT ก่อนหมดอายุ?', faq2A: 'วิธีแก้: อายุสั้น (15 นาที), รายการดำ token ใน Redis หรือเวอร์ชัน token ในบันทึกผู้ใช้', faq3Q: 'JWT ควรมี claims อะไรบ้าง?', faq3A: 'จำเป็น: iss, sub, aud, exp, iat, jti ตรวจสอบ iss และ aud บนบริการที่รับเสมอ', faq4Q: 'ความลับ JWT และคีย์ส่วนตัวควรยาวแค่ไหน?', faq4A: 'ความลับ HS256: ขั้นต่ำ 256 บิต RS256: คีย์ RSA ขั้นต่ำ 2048 บิต ES256: คีย์ elliptic curve 256 บิต', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const jwtStructureCode = `// Anatomy of a JWT — Header.Payload.Signature

// 1. Header (Base64URL decoded)
const header = {
  alg: "RS256",   // Algorithm: RS256 (asymmetric) preferred over HS256 (symmetric)
  typ: "JWT"
};

// 2. Payload (Base64URL decoded) — the claims
const payload = {
  iss: "https://auth.example.com",         // Issuer
  sub: "user_01HXYZ123",                  // Subject (user ID)
  aud: "https://api.example.com",          // Audience (target service)
  exp: 1735689600,                         // Expiry: Unix timestamp (15 min from now)
  iat: 1735688700,                         // Issued at
  jti: "8f14e0f9-21af-4c1e-8f26-3b4a5c6d7e8f", // Unique token ID (for revocation)
  roles: ["user"],                         // Custom claims
  email: "alice@example.com"
};

// 3. Signature (server-side only)
// RS256: sign(base64url(header) + '.' + base64url(payload), PRIVATE_KEY)
// Verification: verify(token, PUBLIC_KEY) — other services only need the public key

// --- Generating a JWT with jsonwebtoken (Node.js) ---
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { randomUUID } from 'crypto';

const privateKey = readFileSync('./private.pem');   // RSA private key
const publicKey  = readFileSync('./public.pem');    // RSA public key (shared with all services)

function issueAccessToken(userId: string, roles: string[]): string {
  return jwt.sign(
    {
      sub: userId,
      aud: 'https://api.example.com',
      roles,
      jti: randomUUID(),
    },
    privateKey,
    {
      algorithm: 'RS256',
      issuer: 'https://auth.example.com',
      expiresIn: '15m',  // Short-lived access token
    }
  );
}

function verifyAccessToken(token: string) {
  return jwt.verify(token, publicKey, {
    algorithms: ['RS256'],           // CRITICAL: whitelist algorithms — never allow 'none'
    issuer: 'https://auth.example.com',
    audience: 'https://api.example.com',
  });
}`;

const refreshTokenCode = `// Refresh Token Pattern — Stateless Access + Stateful Refresh

import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

// ---- Token issuance ----
async function issueTokenPair(userId: string) {
  const accessToken = jwt.sign(
    { sub: userId, jti: randomUUID() },
    process.env.JWT_PRIVATE_KEY!,
    { algorithm: 'RS256', expiresIn: '15m' }
  );

  // Refresh token: random bytes stored in DB — NOT a JWT
  const refreshToken = randomBytes(64).toString('hex');
  const refreshExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  // Store hashed refresh token in DB (never store plaintext)
  await db.refreshTokens.create({
    tokenHash: sha256(refreshToken),
    userId,
    expiresAt: refreshExpiry,
    createdAt: new Date(),
  });

  return { accessToken, refreshToken, refreshExpiry };
}

// ---- Token refresh endpoint ----
app.post('/auth/refresh', async (req, res) =\u003e {
  const { refreshToken } = req.cookies; // httpOnly cookie
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

  const stored = await db.refreshTokens.findOne({
    tokenHash: sha256(refreshToken),
    expiresAt: { \u003e: new Date() }, // Not expired
    revokedAt: null,                  // Not revoked
  });

  if (!stored) return res.status(401).json({ error: 'Invalid or expired refresh token' });

  // Rotate: invalidate old, issue new pair (refresh token rotation)
  await db.refreshTokens.update(
    { id: stored.id },
    { revokedAt: new Date() }         // Revoke old refresh token
  );

  const newPair = await issueTokenPair(stored.userId);

  // Set new refresh token as httpOnly cookie
  res.cookie('refreshToken', newPair.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: newPair.refreshExpiry,
    path: '/auth/refresh',            // Scope cookie to refresh endpoint only
  });

  return res.json({ accessToken: newPair.accessToken });
});

// ---- Logout: revoke refresh token ----
app.post('/auth/logout', async (req, res) =\u003e {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    await db.refreshTokens.update(
      { tokenHash: sha256(refreshToken) },
      { revokedAt: new Date() }
    );
  }
  res.clearCookie('refreshToken', { path: '/auth/refresh' });
  return res.json({ success: true });
});`;

const attackDefenseCode = `// JWT Attack Defenses — Code Patterns

// ---- ATTACK 1: Algorithm confusion ("none" bypass) ----
// VULNERABLE: never use verify() without specifying allowed algorithms
const VULNERABLE = jwt.verify(token, secret); // attacker can set alg: "none"

// SAFE: always whitelist algorithms
const SAFE = jwt.verify(token, publicKey, {
  algorithms: ['RS256'], // Never include 'none', 'HS256' if you're using RS256
});

// ---- ATTACK 2: RS256 \u003e HS256 confusion ----
// Attacker changes alg from RS256 to HS256 and signs with the PUBLIC key as the secret
// Defense: always specify algorithm on verify — never infer from the token header
// VULNERABLE:
const header = JSON.parse(atob(token.split('.')[0]));
jwt.verify(token, publicKey, { algorithms: [header.alg] }); // attacker controls this!

// SAFE:
jwt.verify(token, publicKey, { algorithms: ['RS256'] }); // hardcoded

// ---- ATTACK 3: Weak HS256 secrets (brute-force) ----
// VULNERABLE: short or predictable secrets
const BAD_SECRET = 'secret';
const BAD_SECRET2 = 'mysupersecretkey';

// SAFE: 256-bit cryptographically random secret
import { randomBytes } from 'crypto';
const GOOD_SECRET = randomBytes(32).toString('hex'); // 256-bit
// Store in environment variable, rotate annually

// ---- ATTACK 4: Missing expiry validation ----
// Some older libraries skip exp check by default
// SAFE: always validate exp (jsonwebtoken does this by default)
try {
  const decoded = jwt.verify(token, publicKey, {
    algorithms: ['RS256'],
    clockTolerance: 30, // Allow 30 seconds clock skew max
    ignoreExpiration: false, // NEVER set this to true in production
  });
} catch (err) {
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
  }
  return res.status(401).json({ error: 'Invalid token' });
}

// ---- Token blacklist (for early revocation via jti) ----
import { createClient } from 'redis';
const redis = createClient();

async function revokeToken(jti: string, exp: number) {
  const ttl = exp - Math.floor(Date.now() / 1000); // seconds until natural expiry
  if (ttl \u003e 0) {
    await redis.set(\`jwt:revoked:\${jti}\`, '1', { EX: ttl });
  }
}

async function isTokenRevoked(jti: string): Promise\u003cboolean\u003e {
  return (await redis.get(\`jwt:revoked:\${jti}\`)) !== null;
}

// Middleware: check blacklist
app.use(async (req, res, next) =\u003e {
  const decoded = jwt.verify(req.headers.authorization?.split(' ')[1] ?? '', publicKey, {
    algorithms: ['RS256'],
  });
  if (await isTokenRevoked((decoded as jwt.JwtPayload).jti ?? '')) {
    return res.status(401).json({ error: 'Token revoked' });
  }
  next();
});`;

export default function JwtSecurityGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{s.title}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2 className="text-2xl font-semibold mt-8 mb-3">{s.h2WhatIsJwt}</h2>
      <p className="mb-4">{s.jwtP1}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">{s.h2Algorithms}</h2>
      <p className="mb-4">{s.algorithmsP1}</p>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 mb-6 overflow-x-auto">
        <pre className="text-sm whitespace-pre-wrap"><code>{jwtStructureCode}</code></pre>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-3">{s.h2Expiry}</h2>
      <p className="mb-4">{s.expiryP1}</p>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 mb-6 overflow-x-auto">
        <pre className="text-sm whitespace-pre-wrap"><code>{refreshTokenCode}</code></pre>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-3">{s.h2Attacks}</h2>
      <p className="mb-4">{s.attacksP1}</p>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 mb-6 overflow-x-auto">
        <pre className="text-sm whitespace-pre-wrap"><code>{attackDefenseCode}</code></pre>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-3">{s.h2Storage}</h2>
      <p className="mb-6">{s.storageP1}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">{s.h2Faq}</h2>
      <div className="space-y-4 mb-8">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2">{s.faq1Q}</h3>
          <p className="text-gray-600 dark:text-gray-300">{s.faq1A}</p>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2">{s.faq2Q}</h3>
          <p className="text-gray-600 dark:text-gray-300">{s.faq2A}</p>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2">{s.faq3Q}</h3>
          <p className="text-gray-600 dark:text-gray-300">{s.faq3A}</p>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2">{s.faq4Q}</h3>
          <p className="text-gray-600 dark:text-gray-300">{s.faq4A}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-3">{s.relatedTitle}</h2>
      <div className="flex flex-wrap gap-2">
        <Link href={`/${lang}/tools/jwt-decoder`} className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
          JWT Decoder
        </Link>
        <Link href={`/${lang}/tools/base64-encode-decode`} className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
          Base64 Encoder/Decoder
        </Link>
        <Link href={`/${lang}/tools/hash-generator`} className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
          Hash Generator
        </Link>
        <Link href={`/${lang}/tools/hmac-generator`} className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
          HMAC Generator
        </Link>
        <Link href={`/${lang}/tools/json-formatter`} className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
          JSON Formatter
        </Link>
      </div>
    </>
  );
}
