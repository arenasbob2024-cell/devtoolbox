type UGCStrings = {
  rateThis: string;
  ratings: string;
  helpful: string;
  yes: string;
  no: string;
  share: string;
  copyLink: string;
  copied: string;
  feedback: string;
  feedbackPlaceholder: string;
  submit: string;
  thankYou: string;
};

const strings: Record<string, UGCStrings> = {
  en: { rateThis: 'Rate this tool', ratings: 'ratings', helpful: 'Was this helpful?', yes: 'Yes', no: 'No', share: 'Share', copyLink: 'Copy Link', copied: 'Copied!', feedback: 'Have suggestions?', feedbackPlaceholder: 'Tell us how we can improve...', submit: 'Submit', thankYou: 'Thanks for your feedback!' },
  zh: { rateThis: '\u8bc4\u4ef7\u6b64\u5de5\u5177', ratings: '\u4eba\u8bc4\u4ef7', helpful: '\u8fd9\u7bc7\u6587\u7ae0\u6709\u5e2e\u52a9\u5417\uff1f', yes: '\u6709\u7528', no: '\u6ca1\u7528', share: '\u5206\u4eab', copyLink: '\u590d\u5236\u94fe\u63a5', copied: '\u5df2\u590d\u5236\uff01', feedback: '\u6709\u6539\u8fdb\u5efa\u8bae\uff1f', feedbackPlaceholder: '\u544a\u8bc9\u6211\u4eec\u5982\u4f55\u6539\u8fdb...', submit: '\u63d0\u4ea4', thankYou: '\u611f\u8c22\u53cd\u9988\uff01' },
  ja: { rateThis: '\u3053\u306e\u30c4\u30fc\u30eb\u3092\u8a55\u4fa1', ratings: '\u4ef6\u306e\u8a55\u4fa1', helpful: '\u3053\u306e\u8a18\u4e8b\u306f\u5f79\u306b\u7acb\u3061\u307e\u3057\u305f\u304b\uff1f', yes: '\u306f\u3044', no: '\u3044\u3044\u3048', share: '\u5171\u6709', copyLink: '\u30ea\u30f3\u30af\u3092\u30b3\u30d4\u30fc', copied: '\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f\uff01', feedback: '\u63d0\u6848\u304c\u3042\u308a\u307e\u3059\u304b\uff1f', feedbackPlaceholder: '\u6539\u5584\u70b9\u3092\u6559\u3048\u3066\u304f\u3060\u3055\u3044...', submit: '\u9001\u4fe1', thankYou: '\u30d5\u30a3\u30fc\u30c9\u30d0\u30c3\u30af\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\uff01' },
  ko: { rateThis: '\uc774 \ub3c4\uad6c \ud3c9\uac00', ratings: '\uac1c \ud3c9\uac00', helpful: '\ub3c4\uc6c0\uc774 \ub418\uc5c8\ub098\uc694?', yes: '\uc608', no: '\uc544\ub2c8\uc624', share: '\uacf5\uc720', copyLink: '\ub9c1\ud06c \ubcf5\uc0ac', copied: '\ubcf5\uc0ac\ub428!', feedback: '\uac1c\uc120 \uc81c\uc548\uc774 \uc788\uc73c\uc2e0\uac00\uc694?', feedbackPlaceholder: '\uac1c\uc120 \uc0ac\ud56d\uc744 \uc54c\ub824\uc8fc\uc138\uc694...', submit: '\uc81c\ucd9c', thankYou: '\ud53c\ub4dc\ubc31 \uac10\uc0ac\ud569\ub2c8\ub2e4!' },
  fr: { rateThis: 'Notez cet outil', ratings: 'avis', helpful: 'Cet article vous a-t-il aid\u00e9 ?', yes: 'Oui', no: 'Non', share: 'Partager', copyLink: 'Copier le lien', copied: 'Copi\u00e9 !', feedback: 'Des suggestions ?', feedbackPlaceholder: 'Dites-nous comment am\u00e9liorer...', submit: 'Envoyer', thankYou: 'Merci pour votre retour !' },
  de: { rateThis: 'Bewerten Sie dieses Tool', ratings: 'Bewertungen', helpful: 'War das hilfreich?', yes: 'Ja', no: 'Nein', share: 'Teilen', copyLink: 'Link kopieren', copied: 'Kopiert!', feedback: 'Vorschl\u00e4ge?', feedbackPlaceholder: 'Sagen Sie uns, wie wir verbessern k\u00f6nnen...', submit: 'Senden', thankYou: 'Danke f\u00fcr Ihr Feedback!' },
  es: { rateThis: 'Califica esta herramienta', ratings: 'calificaciones', helpful: '\u00bfFue \u00fatil?', yes: 'S\u00ed', no: 'No', share: 'Compartir', copyLink: 'Copiar enlace', copied: '\u00a1Copiado!', feedback: '\u00bfSugerencias?', feedbackPlaceholder: 'Cu\u00e9ntanos c\u00f3mo mejorar...', submit: 'Enviar', thankYou: '\u00a1Gracias por tu opini\u00f3n!' },
  pt: { rateThis: 'Avalie esta ferramenta', ratings: 'avalia\u00e7\u00f5es', helpful: 'Isso foi \u00fatil?', yes: 'Sim', no: 'N\u00e3o', share: 'Compartilhar', copyLink: 'Copiar link', copied: 'Copiado!', feedback: 'Sugest\u00f5es?', feedbackPlaceholder: 'Diga-nos como podemos melhorar...', submit: 'Enviar', thankYou: 'Obrigado pelo feedback!' },
  it: { rateThis: 'Valuta questo strumento', ratings: 'valutazioni', helpful: '\u00c8 stato utile?', yes: 'S\u00ec', no: 'No', share: 'Condividi', copyLink: 'Copia link', copied: 'Copiato!', feedback: 'Suggerimenti?', feedbackPlaceholder: 'Dicci come possiamo migliorare...', submit: 'Invia', thankYou: 'Grazie per il feedback!' },
  nl: { rateThis: 'Beoordeel deze tool', ratings: 'beoordelingen', helpful: 'Was dit nuttig?', yes: 'Ja', no: 'Nee', share: 'Delen', copyLink: 'Link kopi\u00ebren', copied: 'Gekopieerd!', feedback: 'Suggesties?', feedbackPlaceholder: 'Vertel ons hoe we kunnen verbeteren...', submit: 'Verzenden', thankYou: 'Bedankt voor je feedback!' },
  pl: { rateThis: 'Oce\u0144 to narz\u0119dzie', ratings: 'ocen', helpful: 'Czy to by\u0142o pomocne?', yes: 'Tak', no: 'Nie', share: 'Udost\u0119pnij', copyLink: 'Kopiuj link', copied: 'Skopiowano!', feedback: 'Sugestie?', feedbackPlaceholder: 'Powiedz nam, jak mo\u017cemy poprawi\u0107...', submit: 'Wy\u015blij', thankYou: 'Dzi\u0119kujemy za opini\u0119!' },
  sv: { rateThis: 'Betygs\u00e4tt detta verktyg', ratings: 'betyg', helpful: 'Var detta hj\u00e4lpsamt?', yes: 'Ja', no: 'Nej', share: 'Dela', copyLink: 'Kopiera l\u00e4nk', copied: 'Kopierad!', feedback: 'F\u00f6rslag?', feedbackPlaceholder: 'Ber\u00e4tta f\u00f6r oss hur vi kan f\u00f6rb\u00e4ttra...', submit: 'Skicka', thankYou: 'Tack f\u00f6r din feedback!' },
  no: { rateThis: 'Vurder dette verkt\u00f8yet', ratings: 'vurderinger', helpful: 'Var dette nyttig?', yes: 'Ja', no: 'Nei', share: 'Del', copyLink: 'Kopier lenke', copied: 'Kopiert!', feedback: 'Forslag?', feedbackPlaceholder: 'Fortell oss hvordan vi kan forbedre...', submit: 'Send', thankYou: 'Takk for tilbakemeldingen!' },
  id: { rateThis: 'Nilai alat ini', ratings: 'penilaian', helpful: 'Apakah ini membantu?', yes: 'Ya', no: 'Tidak', share: 'Bagikan', copyLink: 'Salin tautan', copied: 'Disalin!', feedback: 'Ada saran?', feedbackPlaceholder: 'Beri tahu kami cara memperbaiki...', submit: 'Kirim', thankYou: 'Terima kasih atas masukan Anda!' },
  th: { rateThis: '\u0e43\u0e2b\u0e49\u0e04\u0e30\u0e41\u0e19\u0e19\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e21\u0e37\u0e2d\u0e19\u0e35\u0e49', ratings: '\u0e04\u0e30\u0e41\u0e19\u0e19', helpful: '\u0e1a\u0e17\u0e04\u0e27\u0e32\u0e21\u0e19\u0e35\u0e49\u0e21\u0e35\u0e1b\u0e23\u0e30\u0e42\u0e22\u0e0a\u0e19\u0e4c\u0e44\u0e2b\u0e21?', yes: '\u0e43\u0e0a\u0e48', no: '\u0e44\u0e21\u0e48\u0e43\u0e0a\u0e48', share: '\u0e41\u0e0a\u0e23\u0e4c', copyLink: '\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01\u0e25\u0e34\u0e07\u0e01\u0e4c', copied: '\u0e04\u0e31\u0e14\u0e25\u0e2d\u0e01\u0e41\u0e25\u0e49\u0e27!', feedback: '\u0e21\u0e35\u0e02\u0e49\u0e2d\u0e40\u0e2a\u0e19\u0e2d\u0e41\u0e19\u0e30\u0e44\u0e2b\u0e21?', feedbackPlaceholder: '\u0e1a\u0e2d\u0e01\u0e40\u0e23\u0e32\u0e27\u0e48\u0e32\u0e08\u0e30\u0e1b\u0e23\u0e31\u0e1a\u0e1b\u0e23\u0e38\u0e07\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e44\u0e23...', submit: '\u0e2a\u0e48\u0e07', thankYou: '\u0e02\u0e2d\u0e1a\u0e04\u0e38\u0e13\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e04\u0e27\u0e32\u0e21\u0e04\u0e34\u0e14\u0e40\u0e2b\u0e47\u0e19!' },
};

export function getUGCStrings(lang: string): UGCStrings {
  return strings[lang] || strings.en;
}
