export interface UgcStrings {
  rating: { title: string; peopleRated: string };
  helpful: { question: string; thankYou: string };
  share: { title: string; copyLink: string; copied: string };
  feedback: { prompt: string; placeholder: string; submit: string; thankYou: string; expand: string };
}

const s: Record<string, UgcStrings> = {
  en: {
    rating: { title: 'Rate This Tool', peopleRated: '{count} ratings' },
    helpful: { question: 'Was this article helpful?', thankYou: 'Thanks for your feedback!' },
    share: { title: 'Share', copyLink: 'Copy Link', copied: 'Copied!' },
    feedback: { prompt: 'How can we improve this tool?', placeholder: 'Your suggestion...', submit: 'Submit', thankYou: 'Thank you for your feedback!', expand: 'Leave Feedback' },
  },
  zh: {
    rating: { title: '为此工具评分', peopleRated: '{count} 人已评分' },
    helpful: { question: '这篇文章对您有帮助吗？', thankYou: '感谢您的反馈！' },
    share: { title: '分享', copyLink: '复制链接', copied: '已复制！' },
    feedback: { prompt: '您有什么改进建议？', placeholder: '您的建议...', submit: '提交', thankYou: '感谢您的反馈！', expand: '留下反馈' },
  },
  ja: {
    rating: { title: 'このツールを評価', peopleRated: '{count} 件の評価' },
    helpful: { question: 'この記事は役に立ちましたか？', thankYou: 'フィードバックありがとうございます！' },
    share: { title: '共有', copyLink: 'リンクをコピー', copied: 'コピーしました！' },
    feedback: { prompt: 'このツールの改善点は？', placeholder: 'ご提案...', submit: '送信', thankYou: 'フィードバックありがとうございます！', expand: 'フィードバック' },
  },
  ko: {
    rating: { title: '도구 평가', peopleRated: '{count}개 평가' },
    helpful: { question: '이 기사가 도움이 되었나요?', thankYou: '피드백 감사합니다!' },
    share: { title: '공유', copyLink: '링크 복사', copied: '복사됨!' },
    feedback: { prompt: '이 도구를 어떻게 개선할까요?', placeholder: '제안 사항...', submit: '제출', thankYou: '피드백 감사합니다!', expand: '피드백 남기기' },
  },
  fr: {
    rating: { title: 'Notez cet outil', peopleRated: '{count} avis' },
    helpful: { question: 'Cet article vous a-t-il aide ?', thankYou: 'Merci pour votre retour !' },
    share: { title: 'Partager', copyLink: 'Copier le lien', copied: 'Copie !' },
    feedback: { prompt: 'Comment ameliorer cet outil ?', placeholder: 'Votre suggestion...', submit: 'Envoyer', thankYou: 'Merci pour votre retour !', expand: 'Laisser un avis' },
  },
  de: {
    rating: { title: 'Tool bewerten', peopleRated: '{count} Bewertungen' },
    helpful: { question: 'War dieser Artikel hilfreich?', thankYou: 'Danke fur Ihr Feedback!' },
    share: { title: 'Teilen', copyLink: 'Link kopieren', copied: 'Kopiert!' },
    feedback: { prompt: 'Wie konnen wir dieses Tool verbessern?', placeholder: 'Ihr Vorschlag...', submit: 'Senden', thankYou: 'Danke fur Ihr Feedback!', expand: 'Feedback geben' },
  },
  es: {
    rating: { title: 'Califica esta herramienta', peopleRated: '{count} calificaciones' },
    helpful: { question: 'Fue util este articulo?', thankYou: 'Gracias por tu opinion!' },
    share: { title: 'Compartir', copyLink: 'Copiar enlace', copied: 'Copiado!' },
    feedback: { prompt: 'Como podemos mejorar esta herramienta?', placeholder: 'Tu sugerencia...', submit: 'Enviar', thankYou: 'Gracias por tu opinion!', expand: 'Dejar comentario' },
  },
  pt: {
    rating: { title: 'Avalie esta ferramenta', peopleRated: '{count} avaliacoes' },
    helpful: { question: 'Este artigo foi util?', thankYou: 'Obrigado pelo seu feedback!' },
    share: { title: 'Compartilhar', copyLink: 'Copiar link', copied: 'Copiado!' },
    feedback: { prompt: 'Como podemos melhorar esta ferramenta?', placeholder: 'Sua sugestao...', submit: 'Enviar', thankYou: 'Obrigado pelo seu feedback!', expand: 'Deixar feedback' },
  },
  it: {
    rating: { title: 'Valuta questo strumento', peopleRated: '{count} valutazioni' },
    helpful: { question: 'Questo articolo e stato utile?', thankYou: 'Grazie per il tuo feedback!' },
    share: { title: 'Condividi', copyLink: 'Copia link', copied: 'Copiato!' },
    feedback: { prompt: 'Come possiamo migliorare questo strumento?', placeholder: 'Il tuo suggerimento...', submit: 'Invia', thankYou: 'Grazie per il tuo feedback!', expand: 'Lascia un feedback' },
  },
  nl: {
    rating: { title: 'Beoordeel deze tool', peopleRated: '{count} beoordelingen' },
    helpful: { question: 'Was dit artikel nuttig?', thankYou: 'Bedankt voor uw feedback!' },
    share: { title: 'Delen', copyLink: 'Link kopieren', copied: 'Gekopieerd!' },
    feedback: { prompt: 'Hoe kunnen we deze tool verbeteren?', placeholder: 'Uw suggestie...', submit: 'Verzenden', thankYou: 'Bedankt voor uw feedback!', expand: 'Feedback geven' },
  },
  pl: {
    rating: { title: 'Ocen to narzedzie', peopleRated: '{count} ocen' },
    helpful: { question: 'Czy ten artykul byl pomocny?', thankYou: 'Dziekujemy za opinie!' },
    share: { title: 'Udostepnij', copyLink: 'Kopiuj link', copied: 'Skopiowano!' },
    feedback: { prompt: 'Jak mozemy ulepszyc to narzedzie?', placeholder: 'Twoja sugestia...', submit: 'Wyslij', thankYou: 'Dziekujemy za opinie!', expand: 'Zostaw opinie' },
  },
  sv: {
    rating: { title: 'Betygsatt detta verktyg', peopleRated: '{count} betyg' },
    helpful: { question: 'Var denna artikel hjalpsam?', thankYou: 'Tack for din feedback!' },
    share: { title: 'Dela', copyLink: 'Kopiera lank', copied: 'Kopierad!' },
    feedback: { prompt: 'Hur kan vi forbattra detta verktyg?', placeholder: 'Ditt forslag...', submit: 'Skicka', thankYou: 'Tack for din feedback!', expand: 'Lamna feedback' },
  },
  no: {
    rating: { title: 'Vurder dette verktyet', peopleRated: '{count} vurderinger' },
    helpful: { question: 'Var denne artikkelen nyttig?', thankYou: 'Takk for tilbakemeldingen!' },
    share: { title: 'Del', copyLink: 'Kopier lenke', copied: 'Kopiert!' },
    feedback: { prompt: 'Hvordan kan vi forbedre dette verktyet?', placeholder: 'Ditt forslag...', submit: 'Send', thankYou: 'Takk for tilbakemeldingen!', expand: 'Gi tilbakemelding' },
  },
  id: {
    rating: { title: 'Nilai alat ini', peopleRated: '{count} penilaian' },
    helpful: { question: 'Apakah artikel ini membantu?', thankYou: 'Terima kasih atas umpan balik Anda!' },
    share: { title: 'Bagikan', copyLink: 'Salin tautan', copied: 'Disalin!' },
    feedback: { prompt: 'Bagaimana kami dapat meningkatkan alat ini?', placeholder: 'Saran Anda...', submit: 'Kirim', thankYou: 'Terima kasih atas umpan balik Anda!', expand: 'Beri masukan' },
  },
  th: {
    rating: { title: 'ให้คะแนนเครื่องมือนี้', peopleRated: '{count} คะแนน' },
    helpful: { question: 'บทความนี้มีประโยชน์หรือไม่?', thankYou: 'ขอบคุณสำหรับความคิดเห็น!' },
    share: { title: 'แชร์', copyLink: 'คัดลอกลิงก์', copied: 'คัดลอกแล้ว!' },
    feedback: { prompt: 'เราจะปรับปรุงเครื่องมือนี้ได้อย่างไร?', placeholder: 'ข้อเสนอแนะของคุณ...', submit: 'ส่ง', thankYou: 'ขอบคุณสำหรับความคิดเห็น!', expand: 'ให้ข้อเสนอแนะ' },
  },
};

export function getUgcStrings(lang: string): UgcStrings {
  return s[lang] || s['en'];
}
