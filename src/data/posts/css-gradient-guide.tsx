import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'CSS gradients are one of the most powerful visual tools in a web developer\'s toolkit. They create smooth transitions between colors without the need for images, reducing page load times and providing infinite customization. This <strong>complete CSS gradient guide</strong> covers everything from basic linear gradients to advanced techniques like gradient text, animated gradients, and creative patterns.',
    linkTool: 'Create gradients visually with our CSS Gradient Generator →',
    h2_linear: 'Linear Gradients',
    linearDesc: 'Linear gradients transition colors along a straight line. They\'re the most commonly used gradient type.',
    h2_radial: 'Radial Gradients',
    radialDesc: 'Radial gradients radiate from a center point outward in a circular or elliptical shape.',
    h2_conic: 'Conic Gradients',
    conicDesc: 'Conic gradients transition colors around a center point, like a color wheel. They\'re perfect for pie charts and decorative elements.',
    h2_repeating: 'Repeating Gradients',
    repeatingDesc: 'Repeating gradients tile the gradient pattern to fill the entire element. Great for creating stripes and patterns.',
    h2_multiple: 'Multiple & Layered Gradients',
    multipleDesc: 'You can stack multiple gradients on a single element by comma-separating them. The first gradient is on top.',
    h2_text: 'Gradient Text Effects',
    textDesc: 'Apply gradients to text using background-clip for eye-catching headings and hero sections.',
    h2_borders: 'Gradient Borders',
    bordersDesc: 'CSS doesn\'t support gradient borders directly, but there are clever workarounds.',
    h2_patterns: 'Creative Gradient Patterns',
    patternsDesc: 'Combine repeating gradients to create complex patterns without images.',
    h2_perf: 'Performance & Browser Support',
    perfDesc: 'Gradients are rendered by the browser\'s GPU and are generally very performant. However, there are some things to keep in mind.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Can I animate CSS gradients?',
    faq1_a: 'CSS gradients cannot be directly animated with CSS transitions because they are background-images, not simple color values. However, you can animate them using: (1) CSS @property to register custom properties and animate them, (2) changing background-position on a larger-than-element gradient, or (3) using CSS Houdini for smooth gradient animations. The @property approach works in Chrome, Edge, and Safari.',
    faq2_q: 'What is the difference between linear-gradient and radial-gradient?',
    faq2_a: 'Linear gradients transition colors along a straight line (top to bottom, left to right, or at any angle). Radial gradients transition from a center point outward in a circle or ellipse. Linear is best for backgrounds and overlays; radial is great for spotlights, orbs, and circular effects.',
    faq3_q: 'How do I create a gradient border in CSS?',
    faq3_a: 'The most reliable method uses border-image with a linear-gradient or a pseudo-element with a gradient background behind a solid background element. The border-image approach works for simple cases, while the pseudo-element method gives you more control over border-radius.',
    faq4_q: 'Do CSS gradients affect page performance?',
    faq4_a: 'CSS gradients are GPU-rendered and highly performant — much better than equivalent gradient images. They add zero HTTP requests and scale perfectly at any resolution. Very complex gradients with many color stops (10+) or large repeating patterns may cause minor rendering overhead, but this is rarely noticeable.',
    faq5_q: 'How do I make a smooth gradient without color banding?',
    faq5_a: 'Color banding occurs when there aren\'t enough color steps between two very different colors. To fix it: (1) add intermediate color stops between the main colors, (2) use longer gradient distances, (3) add a slight noise overlay using a tiny SVG texture, or (4) use wider color transitions rather than hard stops.',
    conclusion: 'CSS gradients are a versatile and performant way to add visual depth to your web projects. Experiment with our tool to create the perfect gradient.',
    linkToolBottom: 'Design your gradient visually with our CSS Gradient Generator →',
  },
  fr: {
    intro: 'Les dégradés CSS sont l\'un des outils visuels les plus puissants. Ils créent des transitions fluides entre les couleurs sans images. Ce <strong>guide complet des dégradés CSS</strong> couvre tout, des basiques aux techniques avancées.',
    linkTool: 'Créez des dégradés visuellement avec notre Générateur de dégradés CSS →',
    h2_linear: 'Dégradés linéaires', linearDesc: 'Les dégradés linéaires transitionnent les couleurs le long d\'une ligne droite.',
    h2_radial: 'Dégradés radiaux', radialDesc: 'Les dégradés radiaux rayonnent depuis un point central.',
    h2_conic: 'Dégradés coniques', conicDesc: 'Les dégradés coniques transitionnent autour d\'un point central.',
    h2_repeating: 'Dégradés répétitifs', repeatingDesc: 'Les dégradés répétitifs permettent de créer des rayures et motifs.',
    h2_multiple: 'Dégradés multiples', multipleDesc: 'Vous pouvez empiler plusieurs dégradés sur un seul élément.',
    h2_text: 'Texte en dégradé', textDesc: 'Appliquez des dégradés au texte avec background-clip.',
    h2_borders: 'Bordures en dégradé', bordersDesc: 'CSS ne supporte pas directement les bordures en dégradé, mais il existe des solutions.',
    h2_patterns: 'Motifs créatifs', patternsDesc: 'Combinez les dégradés répétitifs pour créer des motifs complexes.',
    h2_perf: 'Performance et compatibilité', perfDesc: 'Les dégradés sont rendus par le GPU et sont très performants.',
    h2_faq: 'Questions fréquentes',
    faq1_q: 'Peut-on animer les dégradés CSS ?', faq1_a: 'Pas directement avec les transitions CSS, mais possible avec @property, background-position ou Houdini.',
    faq2_q: 'Différence entre linear-gradient et radial-gradient ?', faq2_a: 'Linéaire = ligne droite. Radial = du centre vers l\'extérieur en cercle ou ellipse.',
    faq3_q: 'Comment créer une bordure en dégradé ?', faq3_a: 'Utilisez border-image avec un gradient ou un pseudo-élément.',
    faq4_q: 'Les dégradés affectent-ils les performances ?', faq4_a: 'Non, ils sont rendus par le GPU et bien plus performants que des images.',
    faq5_q: 'Comment éviter le banding de couleurs ?', faq5_a: 'Ajoutez des arrêts intermédiaires et utilisez des transitions plus longues.',
    conclusion: 'Les dégradés CSS sont un outil polyvalent. Expérimentez avec notre outil.', linkToolBottom: 'Créez votre dégradé avec notre outil →',
  },
  de: {
    intro: 'CSS-Verläufe sind eines der mächtigsten visuellen Werkzeuge. Sie erzeugen fließende Farbübergänge ohne Bilder. Dieser <strong>vollständige CSS-Gradient-Guide</strong> deckt alles ab.',
    linkTool: 'Erstellen Sie Verläufe visuell mit unserem CSS Gradient Generator →',
    h2_linear: 'Lineare Verläufe', linearDesc: 'Lineare Verläufe wechseln Farben entlang einer geraden Linie.',
    h2_radial: 'Radiale Verläufe', radialDesc: 'Radiale Verläufe strahlen von einem Mittelpunkt nach außen.',
    h2_conic: 'Konische Verläufe', conicDesc: 'Konische Verläufe wechseln um einen Mittelpunkt herum.',
    h2_repeating: 'Wiederholende Verläufe', repeatingDesc: 'Erstellen Sie Streifen und Muster.',
    h2_multiple: 'Mehrfach-Verläufe', multipleDesc: 'Mehrere Verläufe auf einem Element stapeln.',
    h2_text: 'Verlaufstext', textDesc: 'Wenden Sie Verläufe auf Text mit background-clip an.',
    h2_borders: 'Verlaufsränder', bordersDesc: 'CSS unterstützt keine direkten Gradient-Ränder.',
    h2_patterns: 'Kreative Muster', patternsDesc: 'Kombinieren Sie Verläufe für komplexe Muster.',
    h2_perf: 'Performance & Kompatibilität', perfDesc: 'Verläufe werden vom GPU gerendert.',
    h2_faq: 'Häufige Fragen',
    faq1_q: 'Kann man CSS-Verläufe animieren?', faq1_a: 'Nicht direkt, aber mit @property oder background-position.',
    faq2_q: 'Unterschied linear-gradient vs radial-gradient?', faq2_a: 'Linear = gerade Linie. Radial = vom Zentrum nach außen.',
    faq3_q: 'Wie erstellt man einen Verlaufsrand?', faq3_a: 'Mit border-image oder Pseudo-Elementen.',
    faq4_q: 'Beeinflussen Verläufe die Performance?', faq4_a: 'Nein, GPU-gerendert und schneller als Bilder.',
    faq5_q: 'Wie vermeidet man Farbbanding?', faq5_a: 'Zwischenstopps hinzufügen und längere Übergänge verwenden.',
    conclusion: 'CSS-Verläufe sind vielseitig. Experimentieren Sie mit unserem Tool.', linkToolBottom: 'Gestalten Sie Ihren Verlauf mit unserem Tool →',
  },
  es: {
    intro: 'Los degradados CSS son una de las herramientas visuales más poderosas. Crean transiciones suaves entre colores sin imágenes. Esta <strong>guía completa de degradados CSS</strong> cubre todo.',
    linkTool: 'Crea degradados visualmente con nuestro Generador de degradados CSS →',
    h2_linear: 'Degradados lineales', linearDesc: 'Transicionan colores a lo largo de una línea recta.',
    h2_radial: 'Degradados radiales', radialDesc: 'Irradian desde un punto central.',
    h2_conic: 'Degradados cónicos', conicDesc: 'Transicionan alrededor de un punto central.',
    h2_repeating: 'Degradados repetitivos', repeatingDesc: 'Crean rayas y patrones.',
    h2_multiple: 'Degradados múltiples', multipleDesc: 'Apila varios degradados en un solo elemento.',
    h2_text: 'Texto con degradado', textDesc: 'Aplica degradados al texto con background-clip.',
    h2_borders: 'Bordes con degradado', bordersDesc: 'CSS no soporta bordes con degradado directamente.',
    h2_patterns: 'Patrones creativos', patternsDesc: 'Combina degradados para crear patrones complejos.',
    h2_perf: 'Rendimiento y compatibilidad', perfDesc: 'Los degradados son renderizados por la GPU.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: '¿Se pueden animar los degradados CSS?', faq1_a: 'No directamente, pero sí con @property o background-position.',
    faq2_q: '¿Diferencia entre linear-gradient y radial-gradient?', faq2_a: 'Lineal = línea recta. Radial = del centro hacia afuera.',
    faq3_q: '¿Cómo crear un borde con degradado?', faq3_a: 'Con border-image o pseudo-elementos.',
    faq4_q: '¿Afectan al rendimiento?', faq4_a: 'No, son renderizados por la GPU.',
    faq5_q: '¿Cómo evitar el banding?', faq5_a: 'Añadir paradas intermedias y transiciones más largas.',
    conclusion: 'Los degradados CSS son versátiles. Experimenta con nuestra herramienta.', linkToolBottom: 'Diseña tu degradado con nuestra herramienta →',
  },
  zh: {
    intro: 'CSS 渐变是 Web 开发者工具箱中最强大的视觉工具之一。它们无需图片即可创建平滑的颜色过渡。本<strong>完整 CSS 渐变指南</strong>涵盖从基础线性渐变到高级技巧。',
    linkTool: '使用我们的 CSS 渐变生成器可视化创建渐变 →',
    h2_linear: '线性渐变', linearDesc: '线性渐变沿直线方向过渡颜色，是最常用的渐变类型。',
    h2_radial: '径向渐变', radialDesc: '径向渐变从中心点向外辐射，呈圆形或椭圆形。',
    h2_conic: '锥形渐变', conicDesc: '锥形渐变围绕中心点旋转过渡颜色，适合饼图和装饰元素。',
    h2_repeating: '重复渐变', repeatingDesc: '重复渐变通过平铺渐变模式填充整个元素，适合创建条纹和图案。',
    h2_multiple: '多重叠加渐变', multipleDesc: '可以在单个元素上叠加多个渐变，用逗号分隔。',
    h2_text: '渐变文字效果', textDesc: '使用 background-clip 将渐变应用到文字上。',
    h2_borders: '渐变边框', bordersDesc: 'CSS 不直接支持渐变边框，但有巧妙的变通方案。',
    h2_patterns: '创意渐变图案', patternsDesc: '组合重复渐变创建复杂图案。',
    h2_perf: '性能与浏览器兼容性', perfDesc: '渐变由 GPU 渲染，性能优秀。',
    h2_faq: '常见问题',
    faq1_q: 'CSS 渐变可以做动画吗？', faq1_a: '不能直接用 CSS 过渡动画，但可以通过 @property、background-position 或 Houdini 实现。',
    faq2_q: 'linear-gradient 和 radial-gradient 有什么区别？', faq2_a: '线性 = 沿直线。径向 = 从中心向外。',
    faq3_q: '如何创建渐变边框？', faq3_a: '使用 border-image 或伪元素方法。',
    faq4_q: 'CSS 渐变影响性能吗？', faq4_a: '不会，GPU 渲染，比图片更快。',
    faq5_q: '如何避免颜色条带现象？', faq5_a: '添加中间色停点，使用较长的渐变距离。',
    conclusion: 'CSS 渐变是为 Web 项目增加视觉深度的强大工具。使用我们的工具实验创建。', linkToolBottom: '使用 CSS 渐变生成器设计你的渐变 →',
  },
  ja: {
    intro: 'CSSグラデーションはWeb開発者の最も強力なビジュアルツールの一つです。画像なしでスムーズな色の遷移を作成できます。この<strong>完全なCSSグラデーションガイド</strong>はすべてをカバーします。',
    linkTool: 'CSSグラデーションジェネレーターでビジュアルに作成 →',
    h2_linear: 'リニアグラデーション', linearDesc: '直線に沿って色を遷移させます。',
    h2_radial: 'ラジアルグラデーション', radialDesc: '中心点から外側に向かって放射状に色を遷移させます。',
    h2_conic: 'コニックグラデーション', conicDesc: '中心点の周りで色を遷移させます。',
    h2_repeating: 'リピーティンググラデーション', repeatingDesc: 'ストライプやパターンの作成に最適です。',
    h2_multiple: '複数・レイヤードグラデーション', multipleDesc: '複数のグラデーションを重ねることができます。',
    h2_text: 'グラデーションテキスト', textDesc: 'background-clipでテキストにグラデーションを適用。',
    h2_borders: 'グラデーションボーダー', bordersDesc: 'CSSは直接グラデーションボーダーをサポートしていません。',
    h2_patterns: 'クリエイティブパターン', patternsDesc: 'リピーティンググラデーションを組み合わせて複雑なパターンを作成。',
    h2_perf: 'パフォーマンスとブラウザサポート', perfDesc: 'グラデーションはGPUでレンダリングされます。',
    h2_faq: 'よくある質問',
    faq1_q: 'CSSグラデーションはアニメーションできますか？', faq1_a: '直接はできませんが、@propertyやbackground-positionで可能です。',
    faq2_q: 'linear-gradientとradial-gradientの違いは？', faq2_a: 'リニア = 直線。ラジアル = 中心から外側へ。',
    faq3_q: 'グラデーションボーダーの作り方は？', faq3_a: 'border-imageまたは疑似要素を使用。',
    faq4_q: 'パフォーマンスに影響しますか？', faq4_a: 'いいえ、GPUレンダリングで画像より高速。',
    faq5_q: 'カラーバンディングを防ぐには？', faq5_a: '中間カラーストップを追加し、長い遷移を使用。',
    conclusion: 'CSSグラデーションは多用途で高性能です。ツールで実験してみてください。', linkToolBottom: 'CSSグラデーションジェネレーターでデザイン →',
  },
  ko: {
    intro: 'CSS 그라디언트는 웹 개발자의 가장 강력한 시각적 도구 중 하나입니다. 이미지 없이 부드러운 색상 전환을 만들 수 있습니다. 이 <strong>완전한 CSS 그라디언트 가이드</strong>는 모든 것을 다룹니다.',
    linkTool: 'CSS 그라디언트 생성기로 시각적으로 만들기 →',
    h2_linear: '선형 그라디언트', linearDesc: '직선을 따라 색상을 전환합니다.',
    h2_radial: '방사형 그라디언트', radialDesc: '중심점에서 바깥쪽으로 색상을 전환합니다.',
    h2_conic: '원뿔형 그라디언트', conicDesc: '중심점 주위로 색상을 전환합니다.',
    h2_repeating: '반복 그라디언트', repeatingDesc: '줄무늬와 패턴 만들기에 적합합니다.',
    h2_multiple: '다중 레이어 그라디언트', multipleDesc: '여러 그라디언트를 하나의 요소에 쌓을 수 있습니다.',
    h2_text: '그라디언트 텍스트', textDesc: 'background-clip으로 텍스트에 그라디언트를 적용.',
    h2_borders: '그라디언트 테두리', bordersDesc: 'CSS는 그라디언트 테두리를 직접 지원하지 않습니다.',
    h2_patterns: '창의적 패턴', patternsDesc: '반복 그라디언트를 조합하여 복잡한 패턴을 만듭니다.',
    h2_perf: '성능 및 브라우저 지원', perfDesc: '그라디언트는 GPU로 렌더링됩니다.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'CSS 그라디언트를 애니메이션할 수 있나요?', faq1_a: '직접은 불가하지만 @property나 background-position으로 가능합니다.',
    faq2_q: 'linear-gradient와 radial-gradient의 차이?', faq2_a: '선형 = 직선. 방사형 = 중심에서 바깥으로.',
    faq3_q: '그라디언트 테두리를 만드는 방법?', faq3_a: 'border-image 또는 의사 요소를 사용.',
    faq4_q: '성능에 영향을 주나요?', faq4_a: '아니요, GPU 렌더링으로 이미지보다 빠릅니다.',
    faq5_q: '색상 밴딩을 방지하려면?', faq5_a: '중간 색상 정지점을 추가하고 긴 전환을 사용.',
    conclusion: 'CSS 그라디언트는 다재다능하고 성능이 뛰어납니다. 도구로 실험해 보세요.', linkToolBottom: 'CSS 그라디언트 생성기로 디자인 →',
  },
};

export default function CssGradientGuide({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/css-gradient`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Linear Gradients */}
      <h2>{s.h2_linear}</h2>
      <p>{s.linearDesc}</p>

      <h3>Basic Syntax</h3>
      <pre><code>{`/* Default: top to bottom */
background: linear-gradient(#3b82f6, #8b5cf6);

/* With direction */
background: linear-gradient(to right, #3b82f6, #8b5cf6);

/* With angle */
background: linear-gradient(45deg, #3b82f6, #8b5cf6);

/* Multiple color stops */
background: linear-gradient(90deg, #ef4444, #f59e0b, #22c55e, #3b82f6);

/* Color stops with positions */
background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);`}</code></pre>

      <h3>Direction Keywords</h3>
      <pre><code>{`background: linear-gradient(to top, ...);         /* 0deg */
background: linear-gradient(to right, ...);       /* 90deg */
background: linear-gradient(to bottom, ...);      /* 180deg - default */
background: linear-gradient(to left, ...);        /* 270deg */
background: linear-gradient(to top right, ...);   /* diagonal */
background: linear-gradient(to bottom left, ...); /* diagonal */`}</code></pre>

      <h3>Hard Color Stops (Sharp Transitions)</h3>
      <pre><code>{`/* Sharp 50/50 split */
background: linear-gradient(90deg, #3b82f6 50%, #ef4444 50%);

/* Three equal sections */
background: linear-gradient(90deg,
  #3b82f6 33.3%, #22c55e 33.3%,
  #22c55e 66.6%, #ef4444 66.6%
);`}</code></pre>

      {/* Radial Gradients */}
      <h2>{s.h2_radial}</h2>
      <p>{s.radialDesc}</p>
      <pre><code>{`/* Default: ellipse at center */
background: radial-gradient(#3b82f6, #1e1b4b);

/* Circle shape */
background: radial-gradient(circle, #3b82f6, #1e1b4b);

/* Positioned center */
background: radial-gradient(circle at top left, #3b82f6, #1e1b4b);
background: radial-gradient(circle at 25% 75%, #3b82f6, #1e1b4b);

/* Sized circle */
background: radial-gradient(circle 200px at center, #3b82f6, transparent);

/* Size keywords */
background: radial-gradient(closest-side, #3b82f6, #1e1b4b);
background: radial-gradient(farthest-corner, #3b82f6, #1e1b4b);

/* Spotlight effect */
background: radial-gradient(circle 300px at 50% 30%,
  rgba(59, 130, 246, 0.3), transparent
);`}</code></pre>

      {/* Conic Gradients */}
      <h2>{s.h2_conic}</h2>
      <p>{s.conicDesc}</p>
      <pre><code>{`/* Basic color wheel */
background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);

/* Pie chart */
background: conic-gradient(
  #3b82f6 0deg 120deg,   /* 33% */
  #22c55e 120deg 210deg, /* 25% */
  #f59e0b 210deg 300deg, /* 25% */
  #ef4444 300deg 360deg  /* 17% */
);

/* Starting angle and position */
background: conic-gradient(from 45deg at 50% 50%, #3b82f6, #8b5cf6, #3b82f6);

/* Donut chart (combine with radial) */
background:
  radial-gradient(circle 60px, var(--bg-primary) 99%, transparent),
  conic-gradient(#3b82f6 0% 40%, #22c55e 40% 70%, #ef4444 70% 100%);
border-radius: 50%;`}</code></pre>

      {/* Repeating Gradients */}
      <h2>{s.h2_repeating}</h2>
      <p>{s.repeatingDesc}</p>
      <pre><code>{`/* Diagonal stripes */
background: repeating-linear-gradient(
  45deg,
  #3b82f6, #3b82f6 10px,
  transparent 10px, transparent 20px
);

/* Horizontal stripes */
background: repeating-linear-gradient(
  0deg,
  #1e1b4b, #1e1b4b 2px,
  transparent 2px, transparent 20px
);

/* Repeating radial */
background: repeating-radial-gradient(
  circle, #3b82f6, #3b82f6 5px,
  transparent 5px, transparent 15px
);

/* Repeating conic (sunburst) */
background: repeating-conic-gradient(
  #3b82f6 0deg 10deg, transparent 10deg 20deg
);`}</code></pre>

      {/* Multiple Gradients */}
      <h2>{s.h2_multiple}</h2>
      <p>{s.multipleDesc}</p>
      <pre><code>{`/* Spotlight overlay on gradient */
background:
  radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1), transparent 50%),
  linear-gradient(135deg, #0f172a, #1e1b4b);

/* Cross pattern */
background:
  linear-gradient(90deg, transparent 49.5%, rgba(255,255,255,0.05) 49.5%, rgba(255,255,255,0.05) 50.5%, transparent 50.5%),
  linear-gradient(0deg, transparent 49.5%, rgba(255,255,255,0.05) 49.5%, rgba(255,255,255,0.05) 50.5%, transparent 50.5%);
background-size: 40px 40px;`}</code></pre>

      {/* Gradient Text */}
      <h2>{s.h2_text}</h2>
      <p>{s.textDesc}</p>
      <pre><code>{`/* Gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; /* fallback */
}

/* Animated gradient text (using @property) */
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.animated-gradient-text {
  background: linear-gradient(var(--gradient-angle), #3b82f6, #ec4899, #3b82f6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rotate-gradient 3s linear infinite;
}

@keyframes rotate-gradient {
  to { --gradient-angle: 360deg; }
}`}</code></pre>

      {/* Gradient Borders */}
      <h2>{s.h2_borders}</h2>
      <p>{s.bordersDesc}</p>
      <pre><code>{`/* Method 1: border-image (no border-radius support) */
.gradient-border-1 {
  border: 3px solid;
  border-image: linear-gradient(135deg, #3b82f6, #ec4899) 1;
}

/* Method 2: pseudo-element (supports border-radius) */
.gradient-border-2 {
  position: relative;
  border-radius: 12px;
  padding: 3px; /* border width */
  background: linear-gradient(135deg, #3b82f6, #ec4899);
}
.gradient-border-2::before {
  content: '';
  position: absolute;
  inset: 3px; /* same as padding */
  background: var(--bg-card); /* inner background */
  border-radius: 9px; /* outer radius minus border width */
}
.gradient-border-2 > * { position: relative; }

/* Method 3: outline + mask (modern browsers) */
.gradient-border-3 {
  background:
    linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
    linear-gradient(135deg, #3b82f6, #ec4899) border-box;
  border: 3px solid transparent;
  border-radius: 12px;
}`}</code></pre>

      {/* Patterns */}
      <h2>{s.h2_patterns}</h2>
      <p>{s.patternsDesc}</p>
      <pre><code>{`/* Checkerboard */
background:
  conic-gradient(#1e293b 90deg, transparent 90deg 180deg,
    #1e293b 180deg 270deg, transparent 270deg) 0 0 / 40px 40px;

/* Dots */
background:
  radial-gradient(circle 3px, #3b82f6 99%, transparent) 0 0 / 20px 20px;

/* Carbon fiber */
background:
  radial-gradient(#333 15%, transparent 16%),
  radial-gradient(#333 15%, transparent 16%);
background-size: 8px 8px;
background-position: 0 0, 4px 4px;
background-color: #222;`}</code></pre>

      {/* Performance */}
      <h2>{s.h2_perf}</h2>
      <p>{s.perfDesc}</p>
      <ul>
        <li><strong>GPU-rendered:</strong> Gradients are composited by the GPU, making them faster than equivalent images.</li>
        <li><strong>Zero HTTP requests:</strong> Unlike background images, gradients add no network overhead.</li>
        <li><strong>Retina-ready:</strong> Gradients scale perfectly at any resolution without becoming pixelated.</li>
        <li><strong>Browser support:</strong> Linear and radial gradients have 99%+ support. Conic gradients work in all modern browsers (Chrome, Firefox, Safari, Edge). Use <code>@supports</code> for progressive enhancement if targeting older browsers.</li>
        <li><strong>Avoid:</strong> Extremely complex gradients with 20+ color stops on elements that reflow frequently.</li>
      </ul>

      {/* FAQ */}
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

      <p style={{ marginTop: 32 }}>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/css-gradient`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
