'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JWT Generator & Decoder',
    description: 'Generate and decode JWT tokens with custom headers, payloads, and secrets.',
    headerTab: 'Header',
    payloadTab: 'Payload',
    secretLabel: 'Secret / Key',
    secretPlaceholder: 'Enter your secret key',
    algorithmLabel: 'Algorithm',
    generateBtn: 'Generate JWT',
    decodeTab: 'Decode',
    generateTab: 'Generate',
    encodedLabel: 'Encoded Token',
    encodedPlaceholder: 'Paste a JWT token to decode...',
    decodedHeader: 'Decoded Header',
    decodedPayload: 'Decoded Payload',
    signatureInfo: 'Signature',
    signatureDesc: 'To verify the signature, provide the secret key used to sign this token.',
    verifyBtn: 'Verify Signature',
    validSig: 'Signature is valid',
    invalidSig: 'Signature is invalid',
    generatedToken: 'Generated Token',
    tokenParts: 'Token Parts',
    headerPart: 'Header (red)',
    payloadPart: 'Payload (purple)',
    signaturePart: 'Signature (blue)',
    invalidJson: 'Invalid JSON',
    copied: 'Copied!',
    addClaim: 'Add Claim',
    claimKey: 'Key',
    claimValue: 'Value',
    removeClaim: 'Remove',
    standardClaims: 'Standard Claims',
    iss: 'iss (Issuer)',
    sub: 'sub (Subject)',
    aud: 'aud (Audience)',
    exp: 'exp (Expiration)',
    iat: 'iat (Issued At)',
    jti: 'jti (JWT ID)',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a JWT token?',
    faq1a: 'A JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. It consists of three Base64URL-encoded parts: header, payload, and signature, separated by dots.',
    faq2q: 'Is it safe to use this JWT generator?',
    faq2a: 'This tool runs entirely in your browser — no data is sent to any server. However, never use real production secrets in online tools. Use this tool for testing and development only.',
    faq3q: 'What algorithms does JWT support?',
    faq3a: 'JWT supports symmetric algorithms (HS256, HS384, HS512 using HMAC) and asymmetric algorithms (RS256, RS384, RS512 using RSA, and ES256, ES384, ES512 using ECDSA). This tool supports the HS family.',
    faq4q: 'What is the exp claim?',
    faq4a: 'The exp (expiration time) claim identifies the expiration time on or after which the JWT must not be accepted for processing. It is represented as a Unix timestamp (seconds since January 1, 1970).',
    faq5q: 'How do I verify a JWT token?',
    faq5a: 'To verify a JWT, you need the secret key (for HS algorithms) or the public key (for RS/ES algorithms). The receiver recomputes the signature and checks it matches the one in the token.',
  },
  fr: {
    title: 'Generateur et Decodeur JWT',
    description: 'Generez et decodez des tokens JWT avec des en-tetes, charges utiles et secrets personnalises.',
    headerTab: 'En-tete',
    payloadTab: 'Charge utile',
    secretLabel: 'Secret / Cle',
    secretPlaceholder: 'Entrez votre cle secrete',
    algorithmLabel: 'Algorithme',
    generateBtn: 'Generer JWT',
    decodeTab: 'Decoder',
    generateTab: 'Generer',
    encodedLabel: 'Token encode',
    encodedPlaceholder: 'Collez un token JWT a decoder...',
    decodedHeader: 'En-tete decode',
    decodedPayload: 'Charge utile decodee',
    signatureInfo: 'Signature',
    signatureDesc: 'Pour verifier la signature, fournissez la cle secrete utilisee pour signer ce token.',
    verifyBtn: 'Verifier la signature',
    validSig: 'La signature est valide',
    invalidSig: 'La signature est invalide',
    generatedToken: 'Token genere',
    tokenParts: 'Parties du token',
    headerPart: 'En-tete (rouge)',
    payloadPart: 'Charge utile (violet)',
    signaturePart: 'Signature (bleu)',
    invalidJson: 'JSON invalide',
    copied: 'Copie!',
    addClaim: 'Ajouter',
    claimKey: 'Cle',
    claimValue: 'Valeur',
    removeClaim: 'Supprimer',
    standardClaims: 'Claims standard',
    iss: 'iss (Emetteur)',
    sub: 'sub (Sujet)',
    aud: 'aud (Audience)',
    exp: 'exp (Expiration)',
    iat: 'iat (Date emission)',
    jti: 'jti (ID JWT)',
    faqTitle: 'Questions frequemment posees',
    faq1q: 'Qu\'est-ce qu\'un token JWT?',
    faq1a: 'Un JSON Web Token (JWT) est un moyen compact et sur pour URL de representer des reclamations a transferer entre deux parties.',
    faq2q: 'Est-il sur d\'utiliser ce generateur JWT?',
    faq2a: 'Cet outil fonctionne entierement dans votre navigateur — aucune donnee n\'est envoyee a un serveur.',
    faq3q: 'Quels algorithmes JWT supporte-t-il?',
    faq3a: 'JWT supporte les algorithmes symetriques (HS256, HS384, HS512) et asymetriques (RS256, ES256, etc.).',
    faq4q: 'Qu\'est-ce que la claim exp?',
    faq4a: 'La claim exp (expiration time) identifie le moment apres lequel le JWT ne doit plus etre accepte.',
    faq5q: 'Comment verifier un token JWT?',
    faq5a: 'Pour verifier un JWT, vous avez besoin de la cle secrete (pour HS) ou de la cle publique (pour RS/ES).',
  },
  de: {
    title: 'JWT-Generator & Decoder',
    description: 'JWT-Tokens mit benutzerdefinierten Headern, Payloads und Secrets generieren und decodieren.',
    headerTab: 'Header',
    payloadTab: 'Payload',
    secretLabel: 'Secret / Schluessel',
    secretPlaceholder: 'Geheimschluessel eingeben',
    algorithmLabel: 'Algorithmus',
    generateBtn: 'JWT generieren',
    decodeTab: 'Decodieren',
    generateTab: 'Generieren',
    encodedLabel: 'Codierter Token',
    encodedPlaceholder: 'JWT-Token zum Decodieren einfuegen...',
    decodedHeader: 'Decodierter Header',
    decodedPayload: 'Decodierter Payload',
    signatureInfo: 'Signatur',
    signatureDesc: 'Um die Signatur zu verifizieren, geben Sie den geheimen Schluessel an.',
    verifyBtn: 'Signatur verifizieren',
    validSig: 'Signatur ist gueltig',
    invalidSig: 'Signatur ist ungueltig',
    generatedToken: 'Generierter Token',
    tokenParts: 'Token-Teile',
    headerPart: 'Header (rot)',
    payloadPart: 'Payload (lila)',
    signaturePart: 'Signatur (blau)',
    invalidJson: 'Ungueltiges JSON',
    copied: 'Kopiert!',
    addClaim: 'Hinzufuegen',
    claimKey: 'Schluessel',
    claimValue: 'Wert',
    removeClaim: 'Entfernen',
    standardClaims: 'Standard-Claims',
    iss: 'iss (Aussteller)',
    sub: 'sub (Betreff)',
    aud: 'aud (Zielgruppe)',
    exp: 'exp (Ablaufzeit)',
    iat: 'iat (Ausgestellt am)',
    jti: 'jti (JWT-ID)',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein JWT-Token?',
    faq1a: 'Ein JSON Web Token (JWT) ist ein kompaktes, URL-sicheres Mittel zur Darstellung von Anspruechen zwischen zwei Parteien.',
    faq2q: 'Ist dieser JWT-Generator sicher?',
    faq2a: 'Dieses Tool laeuft vollstaendig in Ihrem Browser — es werden keine Daten an einen Server gesendet.',
    faq3q: 'Welche Algorithmen unterstuetzt JWT?',
    faq3a: 'JWT unterstuetzt symmetrische (HS256, HS384, HS512) und asymmetrische Algorithmen (RS256, ES256, etc.).',
    faq4q: 'Was ist der exp-Claim?',
    faq4a: 'Der exp-Claim gibt die Ablaufzeit an, nach der der JWT nicht mehr verarbeitet werden darf.',
    faq5q: 'Wie verifiziere ich einen JWT-Token?',
    faq5a: 'Zur Verifizierung benoetigen Sie den geheimen Schluessel (fuer HS) oder den oeffentlichen Schluessel (fuer RS/ES).',
  },
  it: {
    title: 'Generatore e Decodificatore JWT',
    description: 'Genera e decodifica token JWT con header, payload e segreti personalizzati.',
    headerTab: 'Header', payloadTab: 'Payload', secretLabel: 'Segreto / Chiave',
    secretPlaceholder: 'Inserisci la tua chiave segreta', algorithmLabel: 'Algoritmo',
    generateBtn: 'Genera JWT', decodeTab: 'Decodifica', generateTab: 'Genera',
    encodedLabel: 'Token codificato', encodedPlaceholder: 'Incolla un token JWT da decodificare...',
    decodedHeader: 'Header decodificato', decodedPayload: 'Payload decodificato',
    signatureInfo: 'Firma', signatureDesc: 'Per verificare la firma, fornisci la chiave segreta.',
    verifyBtn: 'Verifica firma', validSig: 'Firma valida', invalidSig: 'Firma non valida',
    generatedToken: 'Token generato', tokenParts: 'Parti del token',
    headerPart: 'Header (rosso)', payloadPart: 'Payload (viola)', signaturePart: 'Firma (blu)',
    invalidJson: 'JSON non valido', copied: 'Copiato!', addClaim: 'Aggiungi',
    claimKey: 'Chiave', claimValue: 'Valore', removeClaim: 'Rimuovi',
    standardClaims: 'Claim standard', iss: 'iss (Emittente)', sub: 'sub (Soggetto)',
    aud: 'aud (Audience)', exp: 'exp (Scadenza)', iat: 'iat (Emesso il)', jti: 'jti (ID JWT)',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cos\'e un token JWT?', faq1a: 'Un JSON Web Token (JWT) e un mezzo compatto e sicuro per URL per rappresentare claims tra due parti.',
    faq2q: 'E sicuro usare questo generatore?', faq2a: 'Questo strumento funziona interamente nel tuo browser — nessun dato viene inviato a un server.',
    faq3q: 'Quali algoritmi supporta JWT?', faq3a: 'JWT supporta algoritmi simmetrici (HS256, HS384, HS512) e asimmetrici (RS256, ES256, ecc.).',
    faq4q: 'Cos\'e il claim exp?', faq4a: 'Il claim exp identifica il momento dopo il quale il JWT non deve essere accettato.',
    faq5q: 'Come verifico un token JWT?', faq5a: 'Per verificare un JWT, serve la chiave segreta (per HS) o la chiave pubblica (per RS/ES).',
  },
  es: {
    title: 'Generador y Decodificador JWT',
    description: 'Genera y decodifica tokens JWT con cabeceras, payloads y secretos personalizados.',
    headerTab: 'Cabecera', payloadTab: 'Payload', secretLabel: 'Secreto / Clave',
    secretPlaceholder: 'Ingresa tu clave secreta', algorithmLabel: 'Algoritmo',
    generateBtn: 'Generar JWT', decodeTab: 'Decodificar', generateTab: 'Generar',
    encodedLabel: 'Token codificado', encodedPlaceholder: 'Pega un token JWT para decodificar...',
    decodedHeader: 'Cabecera decodificada', decodedPayload: 'Payload decodificado',
    signatureInfo: 'Firma', signatureDesc: 'Para verificar la firma, proporciona la clave secreta.',
    verifyBtn: 'Verificar firma', validSig: 'Firma valida', invalidSig: 'Firma invalida',
    generatedToken: 'Token generado', tokenParts: 'Partes del token',
    headerPart: 'Cabecera (rojo)', payloadPart: 'Payload (morado)', signaturePart: 'Firma (azul)',
    invalidJson: 'JSON invalido', copied: 'Copiado!', addClaim: 'Agregar',
    claimKey: 'Clave', claimValue: 'Valor', removeClaim: 'Eliminar',
    standardClaims: 'Claims estandar', iss: 'iss (Emisor)', sub: 'sub (Sujeto)',
    aud: 'aud (Audiencia)', exp: 'exp (Expiracion)', iat: 'iat (Emitido en)', jti: 'jti (ID JWT)',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es un token JWT?', faq1a: 'Un JSON Web Token (JWT) es un medio compacto y seguro para URL de representar claims entre dos partes.',
    faq2q: 'Es seguro usar este generador?', faq2a: 'Esta herramienta funciona completamente en tu navegador — ningun dato se envia a un servidor.',
    faq3q: 'Que algoritmos soporta JWT?', faq3a: 'JWT soporta algoritmos simetricos (HS256, HS384, HS512) y asimetricos (RS256, ES256, etc.).',
    faq4q: 'Que es el claim exp?', faq4a: 'El claim exp identifica el momento despues del cual el JWT no debe ser aceptado.',
    faq5q: 'Como verifico un token JWT?', faq5a: 'Para verificar un JWT, necesitas la clave secreta (para HS) o la clave publica (para RS/ES).',
  },
  pt: {
    title: 'Gerador e Decodificador JWT',
    description: 'Gere e decodifique tokens JWT com cabecalhos, payloads e segredos personalizados.',
    headerTab: 'Cabecalho', payloadTab: 'Payload', secretLabel: 'Segredo / Chave',
    secretPlaceholder: 'Digite sua chave secreta', algorithmLabel: 'Algoritmo',
    generateBtn: 'Gerar JWT', decodeTab: 'Decodificar', generateTab: 'Gerar',
    encodedLabel: 'Token codificado', encodedPlaceholder: 'Cole um token JWT para decodificar...',
    decodedHeader: 'Cabecalho decodificado', decodedPayload: 'Payload decodificado',
    signatureInfo: 'Assinatura', signatureDesc: 'Para verificar a assinatura, forneca a chave secreta.',
    verifyBtn: 'Verificar assinatura', validSig: 'Assinatura valida', invalidSig: 'Assinatura invalida',
    generatedToken: 'Token gerado', tokenParts: 'Partes do token',
    headerPart: 'Cabecalho (vermelho)', payloadPart: 'Payload (roxo)', signaturePart: 'Assinatura (azul)',
    invalidJson: 'JSON invalido', copied: 'Copiado!', addClaim: 'Adicionar',
    claimKey: 'Chave', claimValue: 'Valor', removeClaim: 'Remover',
    standardClaims: 'Claims padrao', iss: 'iss (Emissor)', sub: 'sub (Sujeito)',
    aud: 'aud (Audiencia)', exp: 'exp (Expiracao)', iat: 'iat (Emitido em)', jti: 'jti (ID JWT)',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e um token JWT?', faq1a: 'Um JSON Web Token (JWT) e um meio compacto e seguro para URL de representar claims entre duas partes.',
    faq2q: 'E seguro usar este gerador?', faq2a: 'Esta ferramenta funciona inteiramente no seu navegador — nenhum dado e enviado a um servidor.',
    faq3q: 'Quais algoritmos o JWT suporta?', faq3a: 'JWT suporta algoritmos simetricos (HS256, HS384, HS512) e assimetricos (RS256, ES256, etc.).',
    faq4q: 'O que e o claim exp?', faq4a: 'O claim exp identifica o momento apos o qual o JWT nao deve ser aceito.',
    faq5q: 'Como verifico um token JWT?', faq5a: 'Para verificar um JWT, voce precisa da chave secreta (para HS) ou da chave publica (para RS/ES).',
  },
  nl: {
    title: 'JWT Generator & Decoder',
    description: 'Genereer en decodeer JWT-tokens met aangepaste headers, payloads en secrets.',
    headerTab: 'Header', payloadTab: 'Payload', secretLabel: 'Secret / Sleutel',
    secretPlaceholder: 'Voer uw geheime sleutel in', algorithmLabel: 'Algoritme',
    generateBtn: 'JWT genereren', decodeTab: 'Decoderen', generateTab: 'Genereren',
    encodedLabel: 'Gecodeerd token', encodedPlaceholder: 'Plak een JWT-token om te decoderen...',
    decodedHeader: 'Gedecodeerde header', decodedPayload: 'Gedecodeerde payload',
    signatureInfo: 'Handtekening', signatureDesc: 'Om de handtekening te verifieren, geef de geheime sleutel op.',
    verifyBtn: 'Handtekening verifieren', validSig: 'Handtekening is geldig', invalidSig: 'Handtekening is ongeldig',
    generatedToken: 'Gegenereerd token', tokenParts: 'Tokenonderdelen',
    headerPart: 'Header (rood)', payloadPart: 'Payload (paars)', signaturePart: 'Handtekening (blauw)',
    invalidJson: 'Ongeldige JSON', copied: 'Gekopieerd!', addClaim: 'Toevoegen',
    claimKey: 'Sleutel', claimValue: 'Waarde', removeClaim: 'Verwijderen',
    standardClaims: 'Standaardclaims', iss: 'iss (Uitgever)', sub: 'sub (Onderwerp)',
    aud: 'aud (Doelgroep)', exp: 'exp (Vervaltijd)', iat: 'iat (Uitgegeven op)', jti: 'jti (JWT-ID)',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is een JWT-token?', faq1a: 'Een JSON Web Token (JWT) is een compacte, URL-veilige manier om claims tussen twee partijen te vertegenwoordigen.',
    faq2q: 'Is het veilig om deze JWT-generator te gebruiken?', faq2a: 'Dit hulpmiddel werkt volledig in uw browser — er worden geen gegevens naar een server gestuurd.',
    faq3q: 'Welke algoritmen ondersteunt JWT?', faq3a: 'JWT ondersteunt symmetrische (HS256, HS384, HS512) en asymmetrische algoritmen (RS256, ES256, enz.).',
    faq4q: 'Wat is de exp-claim?', faq4a: 'De exp-claim identificeert het vervaltijdstip waarna het JWT niet meer geaccepteerd mag worden.',
    faq5q: 'Hoe verifieer ik een JWT-token?', faq5a: 'Om een JWT te verifieren, hebt u de geheime sleutel (voor HS) of de openbare sleutel (voor RS/ES) nodig.',
  },
  pl: {
    title: 'Generator i Dekoder JWT',
    description: 'Generuj i dekoduj tokeny JWT z niestandardowymi naglowkami, payloadami i sekretami.',
    headerTab: 'Naglowek', payloadTab: 'Payload', secretLabel: 'Sekret / Klucz',
    secretPlaceholder: 'Wprowadz swoj klucz tajny', algorithmLabel: 'Algorytm',
    generateBtn: 'Generuj JWT', decodeTab: 'Dekoduj', generateTab: 'Generuj',
    encodedLabel: 'Zakodowany token', encodedPlaceholder: 'Wklej token JWT do zdekodowania...',
    decodedHeader: 'Zdekodowany naglowek', decodedPayload: 'Zdekodowany payload',
    signatureInfo: 'Podpis', signatureDesc: 'Aby zweryfikowac podpis, podaj klucz tajny.',
    verifyBtn: 'Weryfikuj podpis', validSig: 'Podpis jest prawidlowy', invalidSig: 'Podpis jest nieprawidlowy',
    generatedToken: 'Wygenerowany token', tokenParts: 'Czesci tokena',
    headerPart: 'Naglowek (czerwony)', payloadPart: 'Payload (fioletowy)', signaturePart: 'Podpis (niebieski)',
    invalidJson: 'Nieprawidlowy JSON', copied: 'Skopiowano!', addClaim: 'Dodaj',
    claimKey: 'Klucz', claimValue: 'Wartosc', removeClaim: 'Usun',
    standardClaims: 'Standardowe claims', iss: 'iss (Wystawca)', sub: 'sub (Podmiot)',
    aud: 'aud (Odbiorcy)', exp: 'exp (Wygasniecie)', iat: 'iat (Wystawiono)', jti: 'jti (ID JWT)',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Co to jest token JWT?', faq1a: 'JSON Web Token (JWT) to kompaktowy, bezpieczny dla URL sposob reprezentowania claimow miedzy dwiema stronami.',
    faq2q: 'Czy ten generator JWT jest bezpieczny?', faq2a: 'To narzedzie dziala wylacznie w Twojej przegladarce — zadne dane nie sa wysylane na serwer.',
    faq3q: 'Jakie algorytmy obsluguje JWT?', faq3a: 'JWT obsluguje algorytmy symetryczne (HS256, HS384, HS512) i asymetryczne (RS256, ES256 itd.).',
    faq4q: 'Co to jest claim exp?', faq4a: 'Claim exp identyfikuje czas wygasniecia, po ktorym JWT nie powinien byc akceptowany.',
    faq5q: 'Jak zweryfikowac token JWT?', faq5a: 'Do weryfikacji JWT potrzebny jest klucz tajny (dla HS) lub klucz publiczny (dla RS/ES).',
  },
  sv: {
    title: 'JWT-generator & Decoder',
    description: 'Generera och dekodera JWT-tokens med anpassade huvuden, nyttolaster och hemligheter.',
    headerTab: 'Huvud', payloadTab: 'Nyttolast', secretLabel: 'Hemlighet / Nyckel',
    secretPlaceholder: 'Ange din hemliga nyckel', algorithmLabel: 'Algoritm',
    generateBtn: 'Generera JWT', decodeTab: 'Dekoda', generateTab: 'Generera',
    encodedLabel: 'Kodad token', encodedPlaceholder: 'Klistra in en JWT-token for att dekoda...',
    decodedHeader: 'Dekodat huvud', decodedPayload: 'Dekodad nyttolast',
    signatureInfo: 'Signatur', signatureDesc: 'For att verifiera signaturen, ange den hemliga nyckel som anvandes.',
    verifyBtn: 'Verifiera signatur', validSig: 'Signaturen ar giltig', invalidSig: 'Signaturen ar ogiltig',
    generatedToken: 'Genererad token', tokenParts: 'Tokendelar',
    headerPart: 'Huvud (rott)', payloadPart: 'Nyttolast (lila)', signaturePart: 'Signatur (bla)',
    invalidJson: 'Ogiltig JSON', copied: 'Kopierat!', addClaim: 'Lagg till',
    claimKey: 'Nyckel', claimValue: 'Varde', removeClaim: 'Ta bort',
    standardClaims: 'Standardansprak', iss: 'iss (Utfardare)', sub: 'sub (Amne)',
    aud: 'aud (Malgrupp)', exp: 'exp (Utgangstid)', iat: 'iat (Utfardat)', jti: 'jti (JWT-ID)',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad ar en JWT-token?', faq1a: 'En JSON Web Token (JWT) ar ett kompakt, URL-sakert satt att representera ansprak mellan tva parter.',
    faq2q: 'Ar det sakert att anvanda denna JWT-generator?', faq2a: 'Det har verktyget kors helt i din webblasare — inga data skickas till nagon server.',
    faq3q: 'Vilka algoritmer stodjer JWT?', faq3a: 'JWT stodjer symmetriska (HS256, HS384, HS512) och asymmetriska algoritmer (RS256, ES256, osv.).',
    faq4q: 'Vad ar exp-ansprak?', faq4a: 'Exp-ansprakat identifierar utgangstiden efter vilken JWT inte far accepteras.',
    faq5q: 'Hur verifierar jag en JWT-token?', faq5a: 'For att verifiera en JWT behovar du den hemliga nyckeln (for HS) eller den offentliga nyckeln (for RS/ES).',
  },
  no: {
    title: 'JWT-generator og Dekoder',
    description: 'Generer og dekod JWT-tokens med tilpassede hoder, nyttelaster og hemmeligheter.',
    headerTab: 'Hode', payloadTab: 'Nyttelast', secretLabel: 'Hemmelighet / Nokkel',
    secretPlaceholder: 'Skriv inn din hemmelige nokkel', algorithmLabel: 'Algoritme',
    generateBtn: 'Generer JWT', decodeTab: 'Dekod', generateTab: 'Generer',
    encodedLabel: 'Kodet token', encodedPlaceholder: 'Lim inn et JWT-token for a dekode...',
    decodedHeader: 'Dekodet hode', decodedPayload: 'Dekodet nyttelast',
    signatureInfo: 'Signatur', signatureDesc: 'For a verifisere signaturen, oppgi den hemmelige nokkelen.',
    verifyBtn: 'Verifiser signatur', validSig: 'Signaturen er gyldig', invalidSig: 'Signaturen er ugyldig',
    generatedToken: 'Generert token', tokenParts: 'Tokendeler',
    headerPart: 'Hode (rod)', payloadPart: 'Nyttelast (lilla)', signaturePart: 'Signatur (bla)',
    invalidJson: 'Ugyldig JSON', copied: 'Kopiert!', addClaim: 'Legg til',
    claimKey: 'Nokkel', claimValue: 'Verdi', removeClaim: 'Fjern',
    standardClaims: 'Standardkrav', iss: 'iss (Utsteder)', sub: 'sub (Subjekt)',
    aud: 'aud (Malgruppe)', exp: 'exp (Utlopstid)', iat: 'iat (Utstedt)', jti: 'jti (JWT-ID)',
    faqTitle: 'Vanlige sporsmal',
    faq1q: 'Hva er et JWT-token?', faq1a: 'Et JSON Web Token (JWT) er et kompakt, URL-sikkert middel for a representere krav mellom to parter.',
    faq2q: 'Er det trygt a bruke denne JWT-generatoren?', faq2a: 'Dette verktøyet kjøres helt i nettleseren din — ingen data sendes til noen server.',
    faq3q: 'Hvilke algoritmer støtter JWT?', faq3a: 'JWT støtter symmetriske (HS256, HS384, HS512) og asymmetriske algoritmer (RS256, ES256, osv.).',
    faq4q: 'Hva er exp-kravet?', faq4a: 'Exp-kravet identifiserer utløpstiden etter hvilken JWT ikke bør aksepteres.',
    faq5q: 'Hvordan verifiserer jeg et JWT-token?', faq5a: 'For å verifisere en JWT trenger du den hemmelige nøkkelen (for HS) eller den offentlige nøkkelen (for RS/ES).',
  },
  zh: {
    title: 'JWT 生成器与解码器',
    description: '使用自定义 Header、Payload 和密钥在线生成和解码 JWT 令牌，支持 HS256、HS384、HS512 算法。',
    headerTab: 'Header', payloadTab: 'Payload', secretLabel: '密钥 / Secret',
    secretPlaceholder: '输入您的密钥', algorithmLabel: '算法',
    generateBtn: '生成 JWT', decodeTab: '解码', generateTab: '生成',
    encodedLabel: '编码后的令牌', encodedPlaceholder: '粘贴 JWT 令牌进行解码...',
    decodedHeader: '解码的 Header', decodedPayload: '解码的 Payload',
    signatureInfo: '签名', signatureDesc: '要验证签名，请提供用于签署此令牌的密钥。',
    verifyBtn: '验证签名', validSig: '签名有效', invalidSig: '签名无效',
    generatedToken: '生成的令牌', tokenParts: '令牌组成',
    headerPart: 'Header（红色）', payloadPart: 'Payload（紫色）', signaturePart: '签名（蓝色）',
    invalidJson: 'JSON 格式无效', copied: '已复制！', addClaim: '添加声明',
    claimKey: '键', claimValue: '值', removeClaim: '删除',
    standardClaims: '标准声明', iss: 'iss（签发者）', sub: 'sub（主体）',
    aud: 'aud（受众）', exp: 'exp（过期时间）', iat: 'iat（签发时间）', jti: 'jti（JWT ID）',
    faqTitle: '常见问题',
    faq1q: '什么是 JWT 令牌？', faq1a: 'JSON Web Token（JWT）是一种紧凑的、URL 安全的方式，用于在两方之间传递声明。它由 Header、Payload 和 Signature 三部分组成，用点号分隔。',
    faq2q: '使用此 JWT 生成器安全吗？', faq2a: '此工具完全在您的浏览器中运行——不会向任何服务器发送数据。但请勿在在线工具中使用真实的生产密钥。',
    faq3q: 'JWT 支持哪些算法？', faq3a: 'JWT 支持对称算法（HS256、HS384、HS512）和非对称算法（RS256、ES256 等）。此工具支持 HS 系列。',
    faq4q: 'exp 声明是什么？', faq4a: 'exp（过期时间）声明标识了 JWT 的过期时间，之后该令牌不应被接受处理。以 Unix 时间戳表示。',
    faq5q: '如何验证 JWT 令牌？', faq5a: '要验证 JWT，您需要密钥（对于 HS 算法）或公钥（对于 RS/ES 算法）。接收方重新计算签名并与令牌中的签名进行比较。',
  },
  ja: {
    title: 'JWT ジェネレーター & デコーダー',
    description: 'カスタムヘッダー、ペイロード、シークレットで JWT トークンをオンラインで生成・デコードします。HS256/384/512 対応。',
    headerTab: 'ヘッダー', payloadTab: 'ペイロード', secretLabel: 'シークレット / キー',
    secretPlaceholder: '秘密鍵を入力してください', algorithmLabel: 'アルゴリズム',
    generateBtn: 'JWT を生成', decodeTab: 'デコード', generateTab: '生成',
    encodedLabel: 'エンコード済みトークン', encodedPlaceholder: 'デコードする JWT トークンを貼り付けてください...',
    decodedHeader: 'デコードされたヘッダー', decodedPayload: 'デコードされたペイロード',
    signatureInfo: '署名', signatureDesc: '署名を検証するには、このトークンの署名に使用された秘密鍵を入力してください。',
    verifyBtn: '署名を検証', validSig: '署名は有効です', invalidSig: '署名は無効です',
    generatedToken: '生成されたトークン', tokenParts: 'トークンの構成',
    headerPart: 'ヘッダー（赤）', payloadPart: 'ペイロード（紫）', signaturePart: '署名（青）',
    invalidJson: '無効な JSON', copied: 'コピーしました！', addClaim: 'クレームを追加',
    claimKey: 'キー', claimValue: '値', removeClaim: '削除',
    standardClaims: '標準クレーム', iss: 'iss（発行者）', sub: 'sub（主体）',
    aud: 'aud（受信者）', exp: 'exp（有効期限）', iat: 'iat（発行日時）', jti: 'jti（JWT ID）',
    faqTitle: 'よくある質問',
    faq1q: 'JWT トークンとは何ですか？', faq1a: 'JSON Web Token（JWT）は、2つのパーティ間でクレームを転送するためのコンパクトで URL セーフな手段です。',
    faq2q: 'この JWT ジェネレーターは安全ですか？', faq2a: 'このツールはブラウザ内で完全に動作します——データはサーバーに送信されません。',
    faq3q: 'JWT はどのようなアルゴリズムをサポートしていますか？', faq3a: 'JWT は対称アルゴリズム（HS256、HS384、HS512）と非対称アルゴリズム（RS256、ES256 など）をサポートしています。',
    faq4q: 'exp クレームとは何ですか？', faq4a: 'exp クレームは JWT の有効期限を示します。この時刻以降、JWT は処理のために受け入れてはなりません。',
    faq5q: 'JWT トークンを検証するにはどうすればよいですか？', faq5a: 'JWT を検証するには、秘密鍵（HS の場合）または公開鍵（RS/ES の場合）が必要です。',
  },
  ko: {
    title: 'JWT 생성기 & 디코더',
    description: '사용자 정의 헤더, 페이로드, 시크릿으로 JWT 토큰을 온라인으로 생성하고 디코딩하세요.',
    headerTab: '헤더', payloadTab: '페이로드', secretLabel: '시크릿 / 키',
    secretPlaceholder: '비밀 키를 입력하세요', algorithmLabel: '알고리즘',
    generateBtn: 'JWT 생성', decodeTab: '디코드', generateTab: '생성',
    encodedLabel: '인코딩된 토큰', encodedPlaceholder: '디코딩할 JWT 토큰을 붙여넣으세요...',
    decodedHeader: '디코딩된 헤더', decodedPayload: '디코딩된 페이로드',
    signatureInfo: '서명', signatureDesc: '서명을 확인하려면 이 토큰에 서명하는 데 사용된 비밀 키를 제공하세요.',
    verifyBtn: '서명 확인', validSig: '서명이 유효합니다', invalidSig: '서명이 유효하지 않습니다',
    generatedToken: '생성된 토큰', tokenParts: '토큰 구성',
    headerPart: '헤더 (빨간색)', payloadPart: '페이로드 (보라색)', signaturePart: '서명 (파란색)',
    invalidJson: '잘못된 JSON', copied: '복사됨!', addClaim: '클레임 추가',
    claimKey: '키', claimValue: '값', removeClaim: '제거',
    standardClaims: '표준 클레임', iss: 'iss (발행자)', sub: 'sub (주체)',
    aud: 'aud (대상)', exp: 'exp (만료 시간)', iat: 'iat (발행 시간)', jti: 'jti (JWT ID)',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JWT 토큰이란 무엇인가요?', faq1a: 'JSON Web Token(JWT)은 두 당사자 간에 클레임을 전달하기 위한 컴팩트하고 URL 안전한 방법입니다.',
    faq2q: '이 JWT 생성기는 안전한가요?', faq2a: '이 도구는 완전히 브라우저에서 실행됩니다 — 데이터는 서버로 전송되지 않습니다.',
    faq3q: 'JWT는 어떤 알고리즘을 지원하나요?', faq3a: 'JWT는 대칭 알고리즘(HS256, HS384, HS512)과 비대칭 알고리즘(RS256, ES256 등)을 지원합니다.',
    faq4q: 'exp 클레임이란 무엇인가요?', faq4a: 'exp 클레임은 JWT가 처리에 허용되지 않아야 하는 만료 시간을 식별합니다.',
    faq5q: 'JWT 토큰을 어떻게 검증하나요?', faq5a: 'JWT를 검증하려면 비밀 키(HS의 경우) 또는 공개 키(RS/ES의 경우)가 필요합니다.',
  },
  id: {
    title: 'Generator & Decoder JWT',
    description: 'Generate dan decode token JWT dengan header, payload, dan secret kustom secara online.',
    headerTab: 'Header', payloadTab: 'Payload', secretLabel: 'Secret / Kunci',
    secretPlaceholder: 'Masukkan kunci rahasia Anda', algorithmLabel: 'Algoritma',
    generateBtn: 'Generate JWT', decodeTab: 'Decode', generateTab: 'Generate',
    encodedLabel: 'Token terenkode', encodedPlaceholder: 'Tempel token JWT untuk didecode...',
    decodedHeader: 'Header terdecode', decodedPayload: 'Payload terdecode',
    signatureInfo: 'Tanda tangan', signatureDesc: 'Untuk memverifikasi tanda tangan, berikan kunci rahasia yang digunakan.',
    verifyBtn: 'Verifikasi tanda tangan', validSig: 'Tanda tangan valid', invalidSig: 'Tanda tangan tidak valid',
    generatedToken: 'Token yang dihasilkan', tokenParts: 'Bagian token',
    headerPart: 'Header (merah)', payloadPart: 'Payload (ungu)', signaturePart: 'Tanda tangan (biru)',
    invalidJson: 'JSON tidak valid', copied: 'Disalin!', addClaim: 'Tambah klaim',
    claimKey: 'Kunci', claimValue: 'Nilai', removeClaim: 'Hapus',
    standardClaims: 'Klaim standar', iss: 'iss (Penerbit)', sub: 'sub (Subjek)',
    aud: 'aud (Audiens)', exp: 'exp (Kedaluwarsa)', iat: 'iat (Diterbitkan)', jti: 'jti (ID JWT)',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu token JWT?', faq1a: 'JSON Web Token (JWT) adalah cara yang kompak dan aman untuk URL untuk mewakili klaim yang akan ditransfer antara dua pihak.',
    faq2q: 'Apakah generator JWT ini aman?', faq2a: 'Alat ini berjalan sepenuhnya di browser Anda — tidak ada data yang dikirim ke server manapun.',
    faq3q: 'Algoritma apa yang didukung JWT?', faq3a: 'JWT mendukung algoritma simetris (HS256, HS384, HS512) dan asimetris (RS256, ES256, dll.).',
    faq4q: 'Apa itu klaim exp?', faq4a: 'Klaim exp mengidentifikasi waktu kedaluwarsa setelah itu JWT tidak boleh diterima untuk diproses.',
    faq5q: 'Bagaimana cara memverifikasi token JWT?', faq5a: 'Untuk memverifikasi JWT, Anda memerlukan kunci rahasia (untuk HS) atau kunci publik (untuk RS/ES).',
  },
  th: {
    title: 'เครื่องมือสร้างและถอดรหัส JWT',
    description: 'สร้างและถอดรหัส JWT token ออนไลน์ด้วย header, payload และ secret ที่กำหนดเอง รองรับ HS256, HS384, HS512',
    headerTab: 'Header', payloadTab: 'Payload', secretLabel: 'Secret / คีย์',
    secretPlaceholder: 'ใส่คีย์ลับของคุณ', algorithmLabel: 'อัลกอริทึม',
    generateBtn: 'สร้าง JWT', decodeTab: 'ถอดรหัส', generateTab: 'สร้าง',
    encodedLabel: 'Token ที่เข้ารหัสแล้ว', encodedPlaceholder: 'วาง JWT token เพื่อถอดรหัส...',
    decodedHeader: 'Header ที่ถอดรหัสแล้ว', decodedPayload: 'Payload ที่ถอดรหัสแล้ว',
    signatureInfo: 'ลายเซ็น', signatureDesc: 'เพื่อตรวจสอบลายเซ็น ให้ใส่คีย์ลับที่ใช้ลงนาม token นี้',
    verifyBtn: 'ตรวจสอบลายเซ็น', validSig: 'ลายเซ็นถูกต้อง', invalidSig: 'ลายเซ็นไม่ถูกต้อง',
    generatedToken: 'Token ที่สร้างแล้ว', tokenParts: 'ส่วนประกอบของ Token',
    headerPart: 'Header (แดง)', payloadPart: 'Payload (ม่วง)', signaturePart: 'ลายเซ็น (น้ำเงิน)',
    invalidJson: 'JSON ไม่ถูกต้อง', copied: 'คัดลอกแล้ว!', addClaim: 'เพิ่ม Claim',
    claimKey: 'คีย์', claimValue: 'ค่า', removeClaim: 'ลบ',
    standardClaims: 'Standard Claims', iss: 'iss (ผู้ออก)', sub: 'sub (หัวข้อ)',
    aud: 'aud (ผู้รับ)', exp: 'exp (หมดอายุ)', iat: 'iat (ออกเมื่อ)', jti: 'jti (JWT ID)',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'JWT token คืออะไร?', faq1a: 'JSON Web Token (JWT) คือวิธีการที่กะทัดรัดและปลอดภัยสำหรับ URL ในการแสดง claims ระหว่างสองฝ่าย',
    faq2q: 'เครื่องมือ JWT นี้ปลอดภัยหรือไม่?', faq2a: 'เครื่องมือนี้ทำงานทั้งหมดในเบราว์เซอร์ของคุณ — ไม่มีข้อมูลส่งไปยังเซิร์ฟเวอร์ใดๆ',
    faq3q: 'JWT รองรับอัลกอริทึมใดบ้าง?', faq3a: 'JWT รองรับอัลกอริทึมแบบสมมาตร (HS256, HS384, HS512) และแบบไม่สมมาตร (RS256, ES256 ฯลฯ)',
    faq4q: 'exp claim คืออะไร?', faq4a: 'exp claim ระบุเวลาหมดอายุที่หลังจากนั้น JWT จะไม่ควรได้รับการยอมรับในการประมวลผล',
    faq5q: 'จะตรวจสอบ JWT token ได้อย่างไร?', faq5a: 'เพื่อตรวจสอบ JWT คุณต้องมีคีย์ลับ (สำหรับ HS) หรือคีย์สาธารณะ (สำหรับ RS/ES)',
  },
};

// Base64URL encoding/decoding utilities
function base64UrlEncode(str: string): string {
  const base64 = btoa(unescape(encodeURIComponent(str)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4);
  try {
    return decodeURIComponent(escape(atob(padded)));
  } catch {
    return atob(padded);
  }
}

// HMAC-SHA signing using Web Crypto API
async function hmacSign(algorithm: string, secret: string, data: string): Promise<string> {
  const hashAlgo = algorithm === 'HS256' ? 'SHA-256' : algorithm === 'HS384' ? 'SHA-384' : 'SHA-512';
  const enc = new TextEncoder();
  const keyData = enc.encode(secret);
  const msgData = enc.encode(data);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: hashAlgo } },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, msgData);
  const bytes = new Uint8Array(signature);
  let binary = '';
  bytes.forEach(b => { binary += String.fromCharCode(b); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

interface CustomClaim {
  id: string;
  key: string;
  value: string;
}

export default function JwtGeneratorPage() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [activeTab, setActiveTab] = useState<'generate' | 'decode'>('generate');
  const [algorithm, setAlgorithm] = useState('HS256');
  const [secret, setSecret] = useState('your-256-bit-secret');
  const [headerJson, setHeaderJson] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payloadJson, setPayloadJson] = useState(() => {
    const now = Math.floor(Date.now() / 1000);
    return JSON.stringify({
      sub: '1234567890',
      name: 'John Doe',
      iat: now,
      exp: now + 3600,
    }, null, 2);
  });
  const [generatedToken, setGeneratedToken] = useState('');
  const [generateError, setGenerateError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Decode tab state
  const [encodedToken, setEncodedToken] = useState('');
  const [decodedHeader, setDecodedHeader] = useState('');
  const [decodedPayload, setDecodedPayload] = useState('');
  const [decodeError, setDecodeError] = useState('');
  const [verifySecret, setVerifySecret] = useState('');
  const [verifyResult, setVerifyResult] = useState<null | boolean>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Custom claims
  const [customClaims, setCustomClaims] = useState<CustomClaim[]>([]);

  const updateHeaderAlg = useCallback((alg: string) => {
    setAlgorithm(alg);
    try {
      const h = JSON.parse(headerJson);
      h.alg = alg;
      setHeaderJson(JSON.stringify(h, null, 2));
    } catch {
      setHeaderJson(`{\n  "alg": "${alg}",\n  "typ": "JWT"\n}`);
    }
  }, [headerJson]);

  const addCustomClaim = () => {
    setCustomClaims(prev => [...prev, { id: crypto.randomUUID(), key: '', value: '' }]);
  };

  const removeCustomClaim = (id: string) => {
    setCustomClaims(prev => prev.filter(c => c.id !== id));
  };

  const updateCustomClaim = (id: string, field: 'key' | 'value', value: string) => {
    setCustomClaims(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const applyCustomClaimsToPayload = () => {
    try {
      const payload = JSON.parse(payloadJson);
      customClaims.forEach(c => {
        if (c.key) {
          let val: string | number | boolean = c.value;
          if (!isNaN(Number(c.value)) && c.value !== '') val = Number(c.value);
          else if (c.value === 'true') val = true;
          else if (c.value === 'false') val = false;
          payload[c.key] = val;
        }
      });
      setPayloadJson(JSON.stringify(payload, null, 2));
    } catch {
      setGenerateError(t.invalidJson);
    }
  };

  const generateJWT = async () => {
    setGenerateError('');
    setIsGenerating(true);
    try {
      let header: Record<string, unknown>;
      let payload: Record<string, unknown>;
      try {
        header = JSON.parse(headerJson);
      } catch {
        setGenerateError(`Header: ${t.invalidJson}`);
        setIsGenerating(false);
        return;
      }
      try {
        payload = JSON.parse(payloadJson);
      } catch {
        setGenerateError(`Payload: ${t.invalidJson}`);
        setIsGenerating(false);
        return;
      }

      const headerEncoded = base64UrlEncode(JSON.stringify(header));
      const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
      const signingInput = `${headerEncoded}.${payloadEncoded}`;
      const signature = await hmacSign(algorithm, secret, signingInput);
      setGeneratedToken(`${signingInput}.${signature}`);
    } catch (e) {
      setGenerateError(String(e));
    } finally {
      setIsGenerating(false);
    }
  };

  const decodeToken = useCallback((token: string) => {
    setDecodeError('');
    setDecodedHeader('');
    setDecodedPayload('');
    setVerifyResult(null);

    if (!token.trim()) return;

    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      setDecodeError('Invalid JWT format: expected 3 parts separated by dots');
      return;
    }

    try {
      const headerDecoded = base64UrlDecode(parts[0]);
      const payloadDecoded = base64UrlDecode(parts[1]);
      setDecodedHeader(JSON.stringify(JSON.parse(headerDecoded), null, 2));
      setDecodedPayload(JSON.stringify(JSON.parse(payloadDecoded), null, 2));
    } catch (e) {
      setDecodeError(`Decode error: ${String(e)}`);
    }
  }, []);

  const handleTokenInput = (value: string) => {
    setEncodedToken(value);
    decodeToken(value);
  };

  const verifySignature = async () => {
    setIsVerifying(true);
    setVerifyResult(null);
    try {
      const parts = encodedToken.trim().split('.');
      if (parts.length !== 3) { setVerifyResult(false); return; }

      const headerDecoded = JSON.parse(base64UrlDecode(parts[0]));
      const alg = headerDecoded.alg || 'HS256';
      const signingInput = `${parts[0]}.${parts[1]}`;
      const expectedSig = await hmacSign(alg, verifySecret, signingInput);
      setVerifyResult(expectedSig === parts[2]);
    } catch {
      setVerifyResult(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const tokenParts = generatedToken ? generatedToken.split('.') : [];

  const faqs = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
    { q: t.faq5q, a: t.faq5a },
  ];

  return (
    <ToolLayout title={t.title} description={t.description} toolId="jwt-generator">
      <div className="space-y-6">
        {/* Tab switcher */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {(['generate', 'decode'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'generate' ? t.generateTab : t.decodeTab}
            </button>
          ))}
        </div>

        {activeTab === 'generate' && (
          <div className="space-y-6">
            {/* Algorithm and Secret */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.algorithmLabel}
                </label>
                <select
                  value={algorithm}
                  onChange={(e) => updateHeaderAlg(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="HS256">HS256</option>
                  <option value="HS384">HS384</option>
                  <option value="HS512">HS512</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.secretLabel}
                </label>
                <input
                  type="text"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder={t.secretPlaceholder}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                />
              </div>
            </div>

            {/* Header and Payload editors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.headerTab}
                </label>
                <textarea
                  value={headerJson}
                  onChange={(e) => setHeaderJson(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                  spellCheck={false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.payloadTab}
                </label>
                <textarea
                  value={payloadJson}
                  onChange={(e) => setPayloadJson(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Custom Claims */}
            {customClaims.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.standardClaims}</p>
                {customClaims.map((claim) => (
                  <div key={claim.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={claim.key}
                      onChange={(e) => updateCustomClaim(claim.id, 'key', e.target.value)}
                      placeholder={t.claimKey}
                      className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-mono"
                    />
                    <input
                      type="text"
                      value={claim.value}
                      onChange={(e) => updateCustomClaim(claim.id, 'value', e.target.value)}
                      placeholder={t.claimValue}
                      className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-mono"
                    />
                    <button
                      onClick={() => removeCustomClaim(claim.id)}
                      className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      {t.removeClaim}
                    </button>
                  </div>
                ))}
                <button
                  onClick={applyCustomClaimsToPayload}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Apply to Payload
                </button>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={generateJWT}
                disabled={isGenerating}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
              >
                {isGenerating ? '...' : t.generateBtn}
              </button>
              <button
                onClick={addCustomClaim}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
              >
                + {t.addClaim}
              </button>
            </div>

            {generateError && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm font-mono">
                {generateError}
              </div>
            )}

            {/* Generated Token */}
            {generatedToken && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.generatedToken}</label>
                    <CopyButton text={generatedToken} label="Copy" />
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm break-all leading-relaxed">
                    {tokenParts.length === 3 && (
                      <>
                        <span className="text-red-600 dark:text-red-400">{tokenParts[0]}</span>
                        <span className="text-gray-500">.</span>
                        <span className="text-purple-600 dark:text-purple-400">{tokenParts[1]}</span>
                        <span className="text-gray-500">.</span>
                        <span className="text-blue-600 dark:text-blue-400">{tokenParts[2]}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Token parts legend */}
                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                    <span className="text-gray-600 dark:text-gray-400">{t.headerPart}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                    <span className="text-gray-600 dark:text-gray-400">{t.payloadPart}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                    <span className="text-gray-600 dark:text-gray-400">{t.signaturePart}</span>
                  </div>
                </div>

                {/* Decoded parts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1 uppercase tracking-wide">{t.headerPart}</p>
                    <pre className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900 rounded-lg text-xs font-mono overflow-auto text-gray-800 dark:text-gray-200">
                      {headerJson}
                    </pre>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1 uppercase tracking-wide">{t.payloadPart}</p>
                    <pre className="p-3 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900 rounded-lg text-xs font-mono overflow-auto text-gray-800 dark:text-gray-200">
                      {payloadJson}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'decode' && (
          <div className="space-y-6">
            {/* Token input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.encodedLabel}
              </label>
              <textarea
                value={encodedToken}
                onChange={(e) => handleTokenInput(e.target.value)}
                placeholder={t.encodedPlaceholder}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                spellCheck={false}
              />
            </div>

            {decodeError && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                {decodeError}
              </div>
            )}

            {/* Decoded parts */}
            {decodedHeader && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wide">{t.decodedHeader}</p>
                    <CopyButton text={decodedHeader} label="Copy" />
                  </div>
                  <pre className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900 rounded-lg text-xs font-mono overflow-auto text-gray-800 dark:text-gray-200 min-h-[100px]">
                    {decodedHeader}
                  </pre>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">{t.decodedPayload}</p>
                    <CopyButton text={decodedPayload} label="Copy" />
                  </div>
                  <pre className="p-3 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900 rounded-lg text-xs font-mono overflow-auto text-gray-800 dark:text-gray-200 min-h-[100px]">
                    {decodedPayload}
                  </pre>
                </div>
              </div>
            )}

            {/* Signature verification */}
            {decodedHeader && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg space-y-3">
                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400">{t.signatureInfo}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.signatureDesc}</p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={verifySecret}
                    onChange={(e) => setVerifySecret(e.target.value)}
                    placeholder={t.secretPlaceholder}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-mono"
                  />
                  <button
                    onClick={verifySignature}
                    disabled={isVerifying || !verifySecret}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    {isVerifying ? '...' : t.verifyBtn}
                  </button>
                </div>
                {verifyResult !== null && (
                  <div className={`flex items-center gap-2 text-sm font-medium ${verifyResult ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    <span>{verifyResult ? '✓' : '✗'}</span>
                    <span>{verifyResult ? t.validSig : t.invalidSig}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* FAQ */}
        <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t.faqTitle}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 list-none">
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{faq.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform duration-200 ml-2 flex-shrink-0">▼</span>
                </summary>
                <div className="p-4 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
