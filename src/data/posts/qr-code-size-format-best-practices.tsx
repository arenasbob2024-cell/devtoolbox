'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'QR Code Size, Format & Error Correction: Best Practices Guide',
    intro: 'QR codes are everywhere — restaurant menus, product packaging, event tickets, business cards, and digital marketing campaigns. Yet most people generate QR codes without understanding the technical factors that determine whether a code will scan reliably. This <strong>complete QR code best practices guide</strong> covers everything you need to know about QR code sizing, format selection, error correction levels, data capacity, content types, and design considerations to ensure your codes work perfectly every time.',

    h2_basics: 'QR Code Basics: How They Work',
    basicsDesc: 'QR (Quick Response) codes are two-dimensional matrix barcodes invented by Denso Wave in 1994. Unlike traditional one-dimensional barcodes that encode data in a single direction, QR codes store data in both horizontal and vertical patterns, enabling them to hold significantly more information.',
    basicsStructure: 'A QR code is made up of <strong>modules</strong> — the individual black and white squares that form the pattern. The number of modules determines the QR code <strong>version</strong>. QR codes range from Version 1 (21x21 modules) to Version 40 (177x177 modules). Higher versions can store more data but require more modules and therefore need to be printed larger to remain scannable.',
    basicsComponents: 'Every QR code contains these structural components:',
    basicsComponentsList: '<ul><li><strong>Finder patterns:</strong> The three large squares in the corners that help scanners detect and orient the code</li><li><strong>Alignment patterns:</strong> Smaller squares that help correct distortion, present in Version 2 and above</li><li><strong>Timing patterns:</strong> Alternating black and white modules that help the scanner determine module size</li><li><strong>Format information:</strong> Data about the error correction level and mask pattern used</li><li><strong>Data and error correction:</strong> The actual encoded data plus Reed-Solomon error correction codewords</li><li><strong>Quiet zone:</strong> The mandatory white border around the code (minimum 4 modules wide)</li></ul>',

    h2_minsize: 'Minimum Size Guide: Print, Screen, and Billboard',
    minsizeDesc: 'The minimum size of a QR code depends on the scanning context. A code that works perfectly on a phone screen may be unreadable when printed on a business card, and vice versa. The key principle is: <strong>the scanning distance determines the minimum size</strong>.',
    minsizeRule: 'The general rule of thumb is that a QR code should be at least <strong>1/10th of the scanning distance</strong>. If someone will scan the code from 30 cm (12 inches) away, the code should be at least 3 cm (1.2 inches) wide. This is known as the <strong>10:1 ratio</strong>.',
    minsizePrint: '<strong>Print (300 DPI):</strong> For printed materials like business cards, flyers, and brochures, the minimum recommended size is <strong>2 cm x 2 cm (0.8 x 0.8 inches)</strong>. At 300 DPI, this gives each module enough pixels to be clearly distinguishable. For business cards specifically, 2.5 cm x 2.5 cm (1 x 1 inch) is safer since the scanning distance is typically close range (10-20 cm).',
    minsizeScreen: '<strong>Screen display:</strong> For digital displays (mobile screens, tablets, monitors), the minimum recommended size is <strong>240 x 240 pixels</strong> for standard viewing. On high-DPI (Retina) screens, aim for <strong>320 x 320 CSS pixels</strong> to ensure crisp rendering. The code must be displayed at a 1:1 pixel ratio or larger — never scale a QR code down below its native module resolution.',
    minsizeBillboard: '<strong>Billboards and signage:</strong> For large-format printing meant to be scanned from a distance, use the 10:1 ratio strictly. A billboard scanned from 10 meters away needs a QR code at least <strong>1 meter x 1 meter</strong>. For highway billboards (20+ meters), the code needs to be at least <strong>2 meters x 2 meters</strong>, though QR codes on highway billboards are generally a bad idea since drivers should not be scanning while driving.',

    h2_sizetable: 'Scanning Distance vs. Minimum QR Code Size',
    sizetableDesc: 'Use this reference table to determine the minimum QR code size based on expected scanning distance:',

    h2_errorcorrection: 'Error Correction Levels: L, M, Q, H',
    ecDesc: 'QR codes use <strong>Reed-Solomon error correction</strong> to allow scanning even when part of the code is damaged, dirty, or obscured. There are four error correction levels, each trading data capacity for resilience:',
    ecAfter: '<strong>Recommendation:</strong> Use <strong>Level M (15%)</strong> as the default for most applications. It provides a good balance between data capacity and damage tolerance. Use <strong>Level H (30%)</strong> if you plan to embed a logo in the center of the QR code, since the logo effectively "damages" the code. Use <strong>Level L (7%)</strong> only when you need maximum data capacity and the code will be displayed in a controlled, clean environment (like a digital screen).',
    ecHow: 'Error correction works by adding redundant data (parity codewords) to the encoded message. When a scanner reads the code, it uses these parity codewords to detect and correct errors. The higher the error correction level, the more parity codewords are added, which means fewer codewords are available for actual data — hence the trade-off between capacity and resilience.',

    h2_datacapacity: 'Data Capacity by Error Correction Level',
    dcDesc: 'The maximum number of characters a QR code can store depends on the data type and error correction level. Here is the capacity for a Version 40 (maximum size) QR code:',
    dcNote: '<strong>Important:</strong> These are theoretical maximums for Version 40 codes (177x177 modules). In practice, you should keep data as short as possible. A URL-shortened link (around 30 characters) fits comfortably in a Version 3 code (29x29 modules), which is much smaller and easier to scan. Every additional character increases the version number and the number of modules, making the code harder to scan at small sizes.',

    h2_format: 'Best Format: SVG vs PNG vs PDF',
    formatDesc: 'Choosing the right file format for your QR code is critical for quality and flexibility:',
    formatAfter: '<strong>Recommendation:</strong> Always generate QR codes as <strong>SVG</strong> first. SVG is the master format from which you can derive any other format at any size. Use SVG directly for web display and convert to high-resolution PNG (minimum 1000x1000 pixels) or PDF for print. Never generate a QR code as a small raster image and then scale it up — this creates blurry modules that scanners struggle to read.',

    h2_content: 'QR Code Content Types',
    contentDesc: 'QR codes can encode different types of structured data. Here are the most common content types and their URI/format schemes:',
    contentNote: 'When encoding URLs, always include the full protocol (<code>https://</code>). Without it, many scanners will treat the content as plain text rather than a clickable link. For maximum compatibility, keep URLs under 100 characters by using URL shorteners or clean URL paths.',

    h2_design: 'Design Tips: Quiet Zone, Colors, and Logo Embedding',
    designDesc: 'While QR codes are functional elements, they can be designed to match your brand identity — within limits. Here are the key design rules:',
    designQuiet: '<strong>Quiet zone:</strong> The quiet zone is the mandatory white border around the QR code. It must be at least <strong>4 modules wide</strong> on all sides. This border is how scanners differentiate the code from surrounding content. Cropping or reducing the quiet zone is the single most common cause of scanning failures. Never place text, graphics, or other design elements within the quiet zone.',
    designColors: '<strong>Colors:</strong> QR codes work best with <strong>high contrast</strong>. The standard is black modules on a white background. You can customize colors, but follow these rules: (1) Dark modules on a light background — never invert this. (2) Maintain a contrast ratio of at least <strong>4:1</strong> between foreground and background. (3) Avoid gradients on modules. (4) Do not use similar colors for foreground and background (e.g., dark blue on black). (5) Test on multiple devices before deploying colored QR codes.',
    designLogo: '<strong>Logo embedding:</strong> You can place a small logo in the center of a QR code if you use <strong>error correction Level H (30%)</strong>. The logo should cover no more than <strong>10-15% of the total code area</strong> to stay within the error correction budget. Place the logo precisely in the center, use a white or light padding around it, and always test the code with the logo on at least 5 different devices and apps before deploying. Note that the logo area effectively "destroys" the modules underneath it, so the scanner relies entirely on error correction to recover that data.',
    designShape: '<strong>Module shapes:</strong> Some QR code generators offer rounded or dot-shaped modules instead of squares. While these can look more appealing, they reduce scanner reliability. If you use non-square modules, test extensively. The finder patterns (corner squares) should always remain standard squares for maximum compatibility.',

    h2_testing: 'Testing: Multiple Devices and Conditions',
    testingDesc: 'A QR code that scans on your phone may fail on other devices, in different lighting, or at different distances. Thorough testing is essential:',
    testingList: '<ul><li><strong>Test on at least 3 devices:</strong> iOS (Camera app), Android (Google Lens or Camera), and a dedicated QR scanner app. Each uses different decoding algorithms with different tolerances.</li><li><strong>Test at different distances:</strong> Scan from the minimum expected distance, the maximum expected distance, and somewhere in between.</li><li><strong>Test in different lighting:</strong> Bright sunlight (causes glare), indoor fluorescent lighting, dim/dark environments, and with camera flash.</li><li><strong>Test on the actual medium:</strong> Print the code on the actual material (glossy paper, matte paper, packaging, fabric) and test. Glossy surfaces can cause reflections that interfere with scanning.</li><li><strong>Test with the actual content:</strong> If the QR code links to a URL, verify the URL works, loads correctly on mobile, and does not redirect through too many intermediaries.</li><li><strong>Test at the actual size:</strong> If the code will be printed at 2 cm, test a printout at exactly 2 cm. Do not test a large version and assume the small version will work.</li><li><strong>Test after production:</strong> Check printed materials after the print run. Print quality issues (low ink, misalignment, paper texture) can degrade QR code readability.</li></ul>',

    h2_mistakes: 'Common Mistakes to Avoid',
    mistakesDesc: 'These are the most frequent QR code mistakes that lead to scanning failures:',
    mistakesList: '<ul><li><strong>Too small:</strong> Printing QR codes smaller than 2 cm for handheld scanning. Small codes with dense data are extremely hard to scan, especially on older devices. Always err on the side of larger.</li><li><strong>Low contrast:</strong> Using colors that do not provide enough contrast between modules and background. Light gray on white, dark blue on black, or any combination below a 4:1 contrast ratio will cause failures.</li><li><strong>No quiet zone:</strong> Cropping the white border or placing the code directly against other graphics. The quiet zone is not optional — without it, scanners cannot determine where the code begins and ends.</li><li><strong>Too much data:</strong> Encoding an entire paragraph of text or a 200-character URL. Keep data minimal. Use URL shorteners for links. The more data you encode, the denser the code and the harder it is to scan.</li><li><strong>Low resolution raster:</strong> Generating a QR code as a 100x100 pixel PNG and then scaling it up for print. This creates blurry, unreadable modules. Always generate at the target resolution or use SVG.</li><li><strong>Inverting colors:</strong> Creating a QR code with white modules on a dark background. Most scanners expect dark-on-light. Some modern scanners handle inversion, but many do not.</li><li><strong>Dynamic URL that expires:</strong> Linking to a URL that will change or expire. QR codes on printed materials are permanent — if the URL goes dead, the code becomes useless. Use permanent, redirect-capable URLs.</li><li><strong>Not testing on print:</strong> Testing only on a screen. Screen resolution, brightness, and contrast are very different from print. Always test on the actual printed medium.</li><li><strong>Placing on curved surfaces:</strong> Wrapping a QR code around a cylinder (like a bottle) without accounting for distortion. If the code wraps more than 30 degrees, it becomes difficult to scan.</li><li><strong>Ignoring error correction:</strong> Using Level L for a code that will be printed on a textured surface or partially covered by packaging. Always match the error correction level to the expected environment.</li></ul>',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the minimum size for a scannable QR code?',
    faq1_a: 'The minimum size depends on the scanning distance. For handheld scanning (10-30 cm away), the code should be at least <strong>2 cm x 2 cm (0.8 x 0.8 inches)</strong>. The general rule is the 10:1 ratio: the code should be at least 1/10th of the scanning distance. For digital screens, use at least 240x240 pixels. Always test at the actual size on the actual medium with multiple devices.',
    faq2_q: 'Which error correction level should I use?',
    faq2_a: 'Use <strong>Level M (15%)</strong> as the default for most use cases. Use <strong>Level H (30%)</strong> if you are embedding a logo in the center of the code, as the logo covers and effectively destroys some modules. Use <strong>Level L (7%)</strong> only for clean, controlled environments like digital screens where damage is unlikely and you need maximum data capacity.',
    faq3_q: 'Should I use SVG or PNG for my QR code?',
    faq3_a: 'Always generate QR codes as <strong>SVG</strong> first. SVG is a vector format that scales to any size without losing quality. Use SVG directly for web display. For print, export the SVG to a high-resolution PNG (at least 1000x1000 pixels at 300 DPI) or embed the SVG in a PDF. Never generate a small raster image and scale it up — this causes blurry modules that fail to scan.',
    faq4_q: 'Can I put a logo in my QR code?',
    faq4_a: 'Yes, but only if you use <strong>error correction Level H (30%)</strong>. The logo should cover no more than <strong>10-15% of the total code area</strong> and must be placed precisely in the center. Add white padding around the logo so it does not blend into surrounding modules. Always test the code with the logo on at least 5 different devices before deploying, as logo placement can cause scanning failures on some readers.',
    faq5_q: 'How much data can a QR code hold?',
    faq5_a: 'A maximum-size QR code (Version 40, 177x177 modules) can hold up to <strong>7,089 numeric characters</strong>, <strong>4,296 alphanumeric characters</strong>, or <strong>2,953 bytes</strong> of binary data at the lowest error correction level. However, in practice, you should keep data as short as possible. A typical URL (50-80 characters) fits in a Version 3-5 code that is easy to scan at small sizes. More data means more modules, which means the code needs to be larger to remain scannable.',
  },
  zh: {
    title: 'QR 码尺寸、格式与纠错：最佳实践指南',
    intro: 'QR 码无处不在——餐厅菜单、产品包装、活动门票、名片和数字营销活动。然而大多数人在生成 QR 码时并不了解决定扫码可靠性的技术因素。本<strong>完整 QR 码最佳实践指南</strong>涵盖了关于 QR 码尺寸、格式选择、纠错等级、数据容量、内容类型和设计注意事项的一切知识，确保你的码每次都能完美扫描。',

    h2_basics: 'QR 码基础：工作原理',
    basicsDesc: 'QR（Quick Response，快速响应）码是由 Denso Wave 于 1994 年发明的二维矩阵条码。与传统的一维条码只在单一方向编码数据不同，QR 码在水平和垂直方向上都存储数据，因此能容纳更多信息。',
    basicsStructure: 'QR 码由<strong>模块</strong>组成——即形成图案的黑白方块。模块数量决定了 QR 码的<strong>版本</strong>。QR 码从版本 1（21x21 模块）到版本 40（177x177 模块）不等。版本越高能存储更多数据，但需要更多模块，因此需要打印得更大才能保持可扫描。',
    basicsComponents: '每个 QR 码都包含以下结构组件：',
    basicsComponentsList: '<ul><li><strong>定位图案：</strong>角落的三个大正方形，帮助扫描器检测和定位码</li><li><strong>校正图案：</strong>较小的正方形，帮助校正变形，存在于版本 2 及以上</li><li><strong>定时图案：</strong>交替的黑白模块，帮助扫描器确定模块大小</li><li><strong>格式信息：</strong>关于使用的纠错等级和掩码模式的数据</li><li><strong>数据和纠错：</strong>实际编码的数据加上 Reed-Solomon 纠错码字</li><li><strong>静默区：</strong>码周围的必需白色边框（最少 4 个模块宽）</li></ul>',

    h2_minsize: '最小尺寸指南：打印、屏幕和广告牌',
    minsizeDesc: 'QR 码的最小尺寸取决于扫描场景。在手机屏幕上完美显示的码，打印在名片上可能无法读取，反之亦然。关键原则是：<strong>扫描距离决定最小尺寸</strong>。',
    minsizeRule: '一般经验法则是 QR 码应至少为<strong>扫描距离的 1/10</strong>。如果扫描距离为 30 厘米，码应至少 3 厘米宽。这被称为 <strong>10:1 比例</strong>。',
    minsizePrint: '<strong>打印（300 DPI）：</strong>对于名片、传单和宣传册等印刷品，建议最小尺寸为 <strong>2 厘米 x 2 厘米</strong>。在 300 DPI 下，每个模块有足够的像素清晰可辨。对于名片，2.5 厘米 x 2.5 厘米更安全，因为扫描距离通常很近（10-20 厘米）。',
    minsizeScreen: '<strong>屏幕显示：</strong>对于数字显示器（手机屏幕、平板电脑、显示器），标准观看的建议最小尺寸为 <strong>240 x 240 像素</strong>。在高 DPI（Retina）屏幕上，应使用 <strong>320 x 320 CSS 像素</strong>以确保清晰渲染。',
    minsizeBillboard: '<strong>广告牌和标牌：</strong>对于需要从远处扫描的大幅面印刷，严格使用 10:1 比例。从 10 米外扫描的广告牌需要至少 <strong>1 米 x 1 米</strong>的 QR 码。对于高速公路广告牌（20 米以上），码需要至少 <strong>2 米 x 2 米</strong>。',

    h2_sizetable: '扫描距离与最小 QR 码尺寸对照表',
    sizetableDesc: '使用此参考表根据预期扫描距离确定 QR 码的最小尺寸：',

    h2_errorcorrection: '纠错等级：L、M、Q、H',
    ecDesc: 'QR 码使用 <strong>Reed-Solomon 纠错</strong>来允许在部分码损坏、脏污或被遮挡时仍能扫描。有四种纠错等级，每种在数据容量和恢复能力之间进行权衡：',
    ecAfter: '<strong>建议：</strong>大多数应用使用<strong>等级 M（15%）</strong>作为默认值。它在数据容量和损坏容忍度之间提供了良好的平衡。如果计划在 QR 码中心嵌入 logo，使用<strong>等级 H（30%）</strong>，因为 logo 实际上会"损坏"码。仅在需要最大数据容量且码将在受控清洁环境（如数字屏幕）中显示时使用<strong>等级 L（7%）</strong>。',
    ecHow: '纠错通过向编码消息添加冗余数据（奇偶校验码字）来工作。扫描器读取码时，使用这些奇偶校验码字来检测和纠正错误。纠错等级越高，添加的奇偶校验码字越多，这意味着可用于实际数据的码字越少——这就是容量与恢复能力之间的权衡。',

    h2_datacapacity: '按纠错等级的数据容量',
    dcDesc: 'QR 码可存储的最大字符数取决于数据类型和纠错等级。以下是版本 40（最大尺寸）QR 码的容量：',
    dcNote: '<strong>重要：</strong>这些是版本 40 码（177x177 模块）的理论最大值。实际上你应该尽量缩短数据。一个短链接（约 30 个字符）可以轻松放入版本 3 码（29x29 模块），这更小也更容易扫描。每增加一个字符都会增加版本号和模块数，使码在小尺寸下更难扫描。',

    h2_format: '最佳格式：SVG vs PNG vs PDF',
    formatDesc: '为 QR 码选择正确的文件格式对质量和灵活性至关重要：',
    formatAfter: '<strong>建议：</strong>始终首先生成 <strong>SVG</strong> 格式的 QR 码。SVG 是主格式，可以从中以任何尺寸导出任何其他格式。网页显示直接使用 SVG，打印则转换为高分辨率 PNG（至少 1000x1000 像素）或 PDF。永远不要生成小尺寸光栅图像然后放大——这会产生模糊的模块，扫描器难以读取。',

    h2_content: 'QR 码内容类型',
    contentDesc: 'QR 码可以编码不同类型的结构化数据。以下是最常见的内容类型及其 URI/格式方案：',
    contentNote: '编码 URL 时，始终包含完整的协议（<code>https://</code>）。没有协议，许多扫描器会将内容视为纯文本而非可点击链接。为最大兼容性，使用 URL 缩短器或简洁路径将 URL 保持在 100 个字符以内。',

    h2_design: '设计技巧：静默区、颜色和 Logo 嵌入',
    designDesc: '虽然 QR 码是功能性元素，但可以在一定范围内设计以匹配品牌形象。以下是关键设计规则：',
    designQuiet: '<strong>静默区：</strong>静默区是 QR 码周围的必需白色边框。所有边至少需要 <strong>4 个模块宽</strong>。这个边框帮助扫描器区分码与周围内容。裁剪或缩小静默区是扫描失败最常见的原因。永远不要在静默区内放置文字、图形或其他设计元素。',
    designColors: '<strong>颜色：</strong>QR 码在<strong>高对比度</strong>下效果最好。标准是白色背景上的黑色模块。你可以自定义颜色，但要遵循以下规则：(1) 深色模块在浅色背景上——永远不要反转。(2) 前景和背景之间保持至少 <strong>4:1</strong> 的对比度比。(3) 模块上避免渐变。(4) 不要使用相似的前景和背景颜色。(5) 部署前在多台设备上测试。',
    designLogo: '<strong>Logo 嵌入：</strong>如果使用<strong>纠错等级 H（30%）</strong>，可以在 QR 码中心放置小 logo。Logo 不应覆盖超过<strong>总码面积的 10-15%</strong>，且必须精确放置在中心。在 logo 周围添加白色填充，部署前始终在至少 5 台不同设备上测试。',
    designShape: '<strong>模块形状：</strong>一些 QR 码生成器提供圆角或圆点模块而非方块。虽然外观可能更吸引人，但会降低扫描器可靠性。如果使用非方形模块，请进行广泛测试。定位图案（角落方块）应始终保持标准方形以获得最大兼容性。',

    h2_testing: '测试：多设备和多条件',
    testingDesc: '在你手机上能扫描的 QR 码可能在其他设备、不同光线或不同距离下失败。全面测试至关重要：',
    testingList: '<ul><li><strong>至少在 3 台设备上测试：</strong>iOS（相机应用）、Android（Google Lens 或相机）和专用 QR 扫描应用。每种使用不同的解码算法，容忍度不同。</li><li><strong>在不同距离测试：</strong>从最小预期距离、最大预期距离和中间距离扫描。</li><li><strong>在不同光线下测试：</strong>明亮阳光（会产生眩光）、室内荧光灯、昏暗/黑暗环境和相机闪光灯。</li><li><strong>在实际介质上测试：</strong>在实际材料（光面纸、哑光纸、包装材料、布料）上打印码并测试。光面表面会产生干扰扫描的反射。</li><li><strong>测试实际内容：</strong>如果 QR 码链接到 URL，验证 URL 有效、在移动端正确加载，且不会经过太多中间重定向。</li><li><strong>以实际尺寸测试：</strong>如果码将以 2 厘米打印，测试正好 2 厘米的打印件。不要测试大版本就假设小版本也能工作。</li><li><strong>生产后测试：</strong>印刷完成后检查印刷品。印刷质量问题（墨水不足、对齐不当、纸张纹理）可能降低 QR 码可读性。</li></ul>',

    h2_mistakes: '常见错误及避免方法',
    mistakesDesc: '以下是导致扫描失败的最常见 QR 码错误：',
    mistakesList: '<ul><li><strong>太小：</strong>手持扫描的 QR 码打印小于 2 厘米。数据密集的小码极难扫描，尤其在较旧设备上。始终偏向更大尺寸。</li><li><strong>低对比度：</strong>使用的颜色在模块和背景之间没有提供足够对比度。浅灰色在白色上、深蓝色在黑色上，或任何低于 4:1 对比度比的组合都会导致失败。</li><li><strong>没有静默区：</strong>裁剪白色边框或将码直接放在其他图形旁边。静默区不是可选的——没有它，扫描器无法确定码的起止位置。</li><li><strong>数据太多：</strong>编码一整段文字或 200 个字符的 URL。保持数据最少。链接使用 URL 缩短器。编码的数据越多，码越密集，越难扫描。</li><li><strong>低分辨率光栅：</strong>生成 100x100 像素的 PNG QR 码然后放大用于打印。这会产生模糊不可读的模块。始终以目标分辨率生成或使用 SVG。</li><li><strong>颜色反转：</strong>创建深色背景上白色模块的 QR 码。大多数扫描器期望深色在浅色上。一些现代扫描器可以处理反转，但许多不行。</li><li><strong>动态 URL 过期：</strong>链接到会更改或过期的 URL。印刷品上的 QR 码是永久的——如果 URL 失效，码就变得无用。使用永久的、可重定向的 URL。</li><li><strong>未在印刷品上测试：</strong>只在屏幕上测试。屏幕分辨率、亮度和对比度与打印非常不同。始终在实际印刷介质上测试。</li><li><strong>放在弯曲表面：</strong>将 QR 码包裹在圆柱体（如瓶子）上而不考虑变形。如果码弯曲超过 30 度，就很难扫描。</li><li><strong>忽略纠错：</strong>在有纹理的表面或会被部分覆盖的包装上使用等级 L。始终将纠错等级与预期环境匹配。</li></ul>',

    h2_faq: '常见问题',
    faq1_q: '可扫描 QR 码的最小尺寸是多少？',
    faq1_a: '最小尺寸取决于扫描距离。对于手持扫描（10-30 厘米），码应至少 <strong>2 厘米 x 2 厘米</strong>。一般规则是 10:1 比例：码至少应为扫描距离的 1/10。对于数字屏幕，至少使用 240x240 像素。始终在实际介质上以实际尺寸用多台设备测试。',
    faq2_q: '应该使用哪个纠错等级？',
    faq2_a: '大多数用例使用<strong>等级 M（15%）</strong>作为默认值。如果在码中心嵌入 logo，使用<strong>等级 H（30%）</strong>，因为 logo 会覆盖并破坏一些模块。仅在清洁受控环境（如数字屏幕）中且需要最大数据容量时使用<strong>等级 L（7%）</strong>。',
    faq3_q: 'QR 码应该使用 SVG 还是 PNG 格式？',
    faq3_a: '始终首先生成 <strong>SVG</strong> 格式的 QR 码。SVG 是矢量格式，可以缩放到任何尺寸而不损失质量。网页显示直接使用 SVG。打印时将 SVG 导出为高分辨率 PNG（至少 1000x1000 像素，300 DPI）或嵌入 PDF。永远不要生成小光栅图像然后放大。',
    faq4_q: '可以在 QR 码中放置 logo 吗？',
    faq4_a: '可以，但仅在使用<strong>纠错等级 H（30%）</strong>时。Logo 不应覆盖超过<strong>总码面积的 10-15%</strong>，且必须精确放置在中心。在 logo 周围添加白色填充，部署前始终在至少 5 台不同设备上测试。',
    faq5_q: 'QR 码能容纳多少数据？',
    faq5_a: '最大尺寸的 QR 码（版本 40，177x177 模块）在最低纠错等级下可容纳最多 <strong>7,089 个数字字符</strong>、<strong>4,296 个字母数字字符</strong>或 <strong>2,953 字节</strong>二进制数据。但实际中应尽量缩短数据。典型 URL（50-80 个字符）可放入版本 3-5 码中，小尺寸易于扫描。',
  },
};

export default function QrCodeBestPractices({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a.replace(/<[^>]*>/g, '') } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a.replace(/<[^>]*>/g, '') } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a.replace(/<[^>]*>/g, '') } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a.replace(/<[^>]*>/g, '') } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a.replace(/<[^>]*>/g, '') } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* -- QR Code Basics -- */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_basics}</h2>
      <p>{t.basicsDesc}</p>
      <p dangerouslySetInnerHTML={{ __html: t.basicsStructure }} />
      <p>{t.basicsComponents}</p>
      <div dangerouslySetInnerHTML={{ __html: t.basicsComponentsList }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`QR Code Version Reference:
┌─────────┬─────────────┬──────────────────────────────┐
│ Version │ Modules     │ Typical Use                  │
├─────────┼─────────────┼──────────────────────────────┤
│ 1       │ 21 x 21     │ Short URLs, numeric codes    │
│ 2       │ 25 x 25     │ Short URLs with tracking     │
│ 3       │ 29 x 29     │ Standard URLs (50-70 chars)  │
│ 5       │ 37 x 37     │ Long URLs, vCard basic       │
│ 10      │ 57 x 57     │ Full vCard, WiFi config      │
│ 15      │ 77 x 77     │ Large text blocks            │
│ 20      │ 97 x 97     │ Very large data payloads     │
│ 40      │ 177 x 177   │ Maximum capacity (rarely used)│
└─────────┴─────────────┴──────────────────────────────┘`}</code></pre>

      {/* -- Minimum Size Guide -- */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_minsize}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.minsizeDesc }} />
      <p dangerouslySetInnerHTML={{ __html: t.minsizeRule }} />
      <p dangerouslySetInnerHTML={{ __html: t.minsizePrint }} />
      <p dangerouslySetInnerHTML={{ __html: t.minsizeScreen }} />
      <p dangerouslySetInnerHTML={{ __html: t.minsizeBillboard }} />

      {/* -- Size Table -- */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_sizetable}</h2>
      <p>{t.sizetableDesc}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">Scanning Distance</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Minimum QR Code Size</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Typical Application</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">10 cm (4 in)</td>
              <td className="border border-gray-700 px-4 py-2">1 cm x 1 cm</td>
              <td className="border border-gray-700 px-4 py-2">Product labels, jewelry tags</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">20 cm (8 in)</td>
              <td className="border border-gray-700 px-4 py-2">2 cm x 2 cm</td>
              <td className="border border-gray-700 px-4 py-2">Business cards, receipts</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">30 cm (12 in)</td>
              <td className="border border-gray-700 px-4 py-2">3 cm x 3 cm</td>
              <td className="border border-gray-700 px-4 py-2">Flyers, brochures, menus</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">50 cm (20 in)</td>
              <td className="border border-gray-700 px-4 py-2">5 cm x 5 cm</td>
              <td className="border border-gray-700 px-4 py-2">Product packaging, book covers</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">1 m (3.3 ft)</td>
              <td className="border border-gray-700 px-4 py-2">10 cm x 10 cm</td>
              <td className="border border-gray-700 px-4 py-2">Posters, table tents</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">2 m (6.6 ft)</td>
              <td className="border border-gray-700 px-4 py-2">20 cm x 20 cm</td>
              <td className="border border-gray-700 px-4 py-2">Indoor signage, window displays</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">5 m (16 ft)</td>
              <td className="border border-gray-700 px-4 py-2">50 cm x 50 cm</td>
              <td className="border border-gray-700 px-4 py-2">Trade show banners, event signage</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">10 m (33 ft)</td>
              <td className="border border-gray-700 px-4 py-2">1 m x 1 m</td>
              <td className="border border-gray-700 px-4 py-2">Outdoor billboards, building signage</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">20 m (66 ft)</td>
              <td className="border border-gray-700 px-4 py-2">2 m x 2 m</td>
              <td className="border border-gray-700 px-4 py-2">Large outdoor advertising</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* -- Error Correction Levels -- */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_errorcorrection}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.ecDesc }} />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">Level</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Recovery Capacity</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Data Overhead</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono font-bold">L (Low)</td>
              <td className="border border-gray-700 px-4 py-2">~7% of codewords</td>
              <td className="border border-gray-700 px-4 py-2">Lowest</td>
              <td className="border border-gray-700 px-4 py-2">Clean digital screens, maximum data capacity needed</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono font-bold">M (Medium)</td>
              <td className="border border-gray-700 px-4 py-2">~15% of codewords</td>
              <td className="border border-gray-700 px-4 py-2">Moderate</td>
              <td className="border border-gray-700 px-4 py-2">General purpose (default), printed materials</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono font-bold">Q (Quartile)</td>
              <td className="border border-gray-700 px-4 py-2">~25% of codewords</td>
              <td className="border border-gray-700 px-4 py-2">High</td>
              <td className="border border-gray-700 px-4 py-2">Industrial/warehouse labels, outdoor use</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono font-bold">H (High)</td>
              <td className="border border-gray-700 px-4 py-2">~30% of codewords</td>
              <td className="border border-gray-700 px-4 py-2">Highest</td>
              <td className="border border-gray-700 px-4 py-2">Logo embedding, harsh environments, partial obstruction</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4" dangerouslySetInnerHTML={{ __html: t.ecAfter }} />
      <p>{t.ecHow}</p>

      {/* -- Data Capacity Table -- */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_datacapacity}</h2>
      <p>{t.dcDesc}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">Data Type</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Level L (7%)</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Level M (15%)</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Level Q (25%)</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Level H (30%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Numeric (0-9)</td>
              <td className="border border-gray-700 px-4 py-2">7,089</td>
              <td className="border border-gray-700 px-4 py-2">5,596</td>
              <td className="border border-gray-700 px-4 py-2">3,993</td>
              <td className="border border-gray-700 px-4 py-2">3,057</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Alphanumeric (A-Z, 0-9, symbols)</td>
              <td className="border border-gray-700 px-4 py-2">4,296</td>
              <td className="border border-gray-700 px-4 py-2">3,391</td>
              <td className="border border-gray-700 px-4 py-2">2,420</td>
              <td className="border border-gray-700 px-4 py-2">1,852</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Binary / Byte (UTF-8)</td>
              <td className="border border-gray-700 px-4 py-2">2,953</td>
              <td className="border border-gray-700 px-4 py-2">2,331</td>
              <td className="border border-gray-700 px-4 py-2">1,663</td>
              <td className="border border-gray-700 px-4 py-2">1,273</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Kanji / Kana</td>
              <td className="border border-gray-700 px-4 py-2">1,817</td>
              <td className="border border-gray-700 px-4 py-2">1,435</td>
              <td className="border border-gray-700 px-4 py-2">1,024</td>
              <td className="border border-gray-700 px-4 py-2">784</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4" dangerouslySetInnerHTML={{ __html: t.dcNote }} />

      {/* -- Format Comparison -- */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_format}</h2>
      <p>{t.formatDesc}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">Feature</th>
              <th className="border border-gray-700 px-4 py-2 text-left">SVG</th>
              <th className="border border-gray-700 px-4 py-2 text-left">PNG</th>
              <th className="border border-gray-700 px-4 py-2 text-left">PDF</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Type</td>
              <td className="border border-gray-700 px-4 py-2">Vector</td>
              <td className="border border-gray-700 px-4 py-2">Raster</td>
              <td className="border border-gray-700 px-4 py-2">Vector (container)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Scalability</td>
              <td className="border border-gray-700 px-4 py-2">Infinite, no quality loss</td>
              <td className="border border-gray-700 px-4 py-2">Fixed resolution, pixelates when scaled up</td>
              <td className="border border-gray-700 px-4 py-2">Infinite (if vector content inside)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">File size</td>
              <td className="border border-gray-700 px-4 py-2">Very small (2-10 KB)</td>
              <td className="border border-gray-700 px-4 py-2">Small to medium (5-50 KB)</td>
              <td className="border border-gray-700 px-4 py-2">Small (5-20 KB)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Web use</td>
              <td className="border border-gray-700 px-4 py-2">Excellent (inline or img tag)</td>
              <td className="border border-gray-700 px-4 py-2">Good (standard img tag)</td>
              <td className="border border-gray-700 px-4 py-2">Poor (requires embed/iframe)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Print use</td>
              <td className="border border-gray-700 px-4 py-2">Excellent (any DPI)</td>
              <td className="border border-gray-700 px-4 py-2">Good (if generated at 300+ DPI)</td>
              <td className="border border-gray-700 px-4 py-2">Excellent (industry standard for print)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Editability</td>
              <td className="border border-gray-700 px-4 py-2">Easy (XML text, CSS styling)</td>
              <td className="border border-gray-700 px-4 py-2">Difficult (requires image editor)</td>
              <td className="border border-gray-700 px-4 py-2">Moderate (requires PDF editor)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Color customization</td>
              <td className="border border-gray-700 px-4 py-2">Easy (CSS fill/stroke)</td>
              <td className="border border-gray-700 px-4 py-2">Must be set at generation time</td>
              <td className="border border-gray-700 px-4 py-2">Depends on content type</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Best for</td>
              <td className="border border-gray-700 px-4 py-2">Web, master file, any size output</td>
              <td className="border border-gray-700 px-4 py-2">Social media, email, messaging</td>
              <td className="border border-gray-700 px-4 py-2">Professional print, prepress</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4" dangerouslySetInnerHTML={{ __html: t.formatAfter }} />

      {/* -- Content Types -- */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_content}</h2>
      <p>{t.contentDesc}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">Content Type</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Format / URI Scheme</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">URL</td>
              <td className="border border-gray-700 px-4 py-2"><code>https://</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>https://example.com/page</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">vCard (Contact)</td>
              <td className="border border-gray-700 px-4 py-2"><code>BEGIN:VCARD...END:VCARD</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>BEGIN:VCARD\nVERSION:3.0\nN:Doe;John\nTEL:+1234567890\nEND:VCARD</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">WiFi</td>
              <td className="border border-gray-700 px-4 py-2"><code>WIFI:S:...;T:...;P:...;;</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>WIFI:S:MyNetwork;T:WPA;P:password123;;</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Email</td>
              <td className="border border-gray-700 px-4 py-2"><code>mailto:</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>mailto:hello@example.com?subject=Hello</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">SMS</td>
              <td className="border border-gray-700 px-4 py-2"><code>sms:</code> or <code>smsto:</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>sms:+1234567890?body=Hello</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Phone Call</td>
              <td className="border border-gray-700 px-4 py-2"><code>tel:</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>tel:+1234567890</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Geo Location</td>
              <td className="border border-gray-700 px-4 py-2"><code>geo:</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>geo:40.7128,-74.0060?q=New+York</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Calendar Event</td>
              <td className="border border-gray-700 px-4 py-2"><code>BEGIN:VEVENT...END:VEVENT</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>BEGIN:VEVENT\nSUMMARY:Meeting\nDTSTART:20260301T100000Z\nEND:VEVENT</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Plain Text</td>
              <td className="border border-gray-700 px-4 py-2">Raw text string</td>
              <td className="border border-gray-700 px-4 py-2"><code>Any plain text message up to capacity limit</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4" dangerouslySetInnerHTML={{ __html: t.contentNote }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Common QR code content format examples

// URL (most common)
"https://example.com/product/12345"

// WiFi network configuration
"WIFI:S:NetworkName;T:WPA;P:MyPassword123;H:false;;"
// S = SSID, T = Security type (WPA/WEP/nopass), P = Password, H = Hidden

// vCard contact
"BEGIN:VCARD\\nVERSION:3.0\\nFN:John Doe\\nORG:Acme Corp\\nTEL:+1-555-0123\\nEMAIL:john@example.com\\nURL:https://example.com\\nEND:VCARD"

// Email with subject and body
"mailto:support@example.com?subject=Help%20Request&body=I%20need%20assistance"

// SMS message
"sms:+15550123?body=Hello%20from%20QR"

// Geo location (latitude,longitude)
"geo:37.7749,-122.4194?q=San+Francisco"

// Calendar event (iCalendar format)
"BEGIN:VEVENT\\nSUMMARY:Team Meeting\\nDTSTART:20260315T140000Z\\nDTEND:20260315T150000Z\\nLOCATION:Conference Room A\\nEND:VEVENT"`}</code></pre>

      {/* -- Design Tips -- */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_design}</h2>
      <p>{t.designDesc}</p>
      <p dangerouslySetInnerHTML={{ __html: t.designQuiet }} />
      <p dangerouslySetInnerHTML={{ __html: t.designColors }} />
      <p dangerouslySetInnerHTML={{ __html: t.designLogo }} />
      <p dangerouslySetInnerHTML={{ __html: t.designShape }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`/* QR Code Design Checklist */

✓ Quiet zone: 4+ modules on all sides (never crop)
✓ Contrast ratio: 4:1 minimum (dark on light)
✓ Module color: Dark foreground, light background
✓ Logo size: Max 10-15% of code area (use EC Level H)
✓ Logo padding: White border around logo
✓ Finder patterns: Keep standard square shape
✓ Resolution: SVG or 300+ DPI PNG for print
✓ Testing: 3+ devices, multiple lighting conditions

✗ Do NOT invert colors (white on dark)
✗ Do NOT use gradients on modules
✗ Do NOT crop the quiet zone
✗ Do NOT use similar foreground/background colors
✗ Do NOT scale up low-resolution raster images`}</code></pre>

      {/* -- Testing -- */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_testing}</h2>
      <p>{t.testingDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: t.testingList }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# QR Code Testing Protocol

## Device Testing Matrix
┌──────────────┬─────────────────┬────────────────┐
│ Platform     │ Scanner App     │ Status         │
├──────────────┼─────────────────┼────────────────┤
│ iPhone       │ Camera (native) │ ☐ Pass / ☐ Fail│
│ iPhone       │ Chrome          │ ☐ Pass / ☐ Fail│
│ Android      │ Camera (native) │ ☐ Pass / ☐ Fail│
│ Android      │ Google Lens     │ ☐ Pass / ☐ Fail│
│ Any device   │ Dedicated app   │ ☐ Pass / ☐ Fail│
└──────────────┴─────────────────┴────────────────┘

## Distance Testing
- Minimum distance (10 cm):    ☐ Pass / ☐ Fail
- Normal distance (30 cm):     ☐ Pass / ☐ Fail
- Maximum distance (per spec): ☐ Pass / ☐ Fail

## Lighting Testing
- Bright sunlight:             ☐ Pass / ☐ Fail
- Indoor fluorescent:          ☐ Pass / ☐ Fail
- Dim / low light:             ☐ Pass / ☐ Fail
- With camera flash:           ☐ Pass / ☐ Fail

## Medium Testing
- Screen display:              ☐ Pass / ☐ Fail
- Printed (actual material):   ☐ Pass / ☐ Fail
- Printed (actual size):       ☐ Pass / ☐ Fail`}</code></pre>

      {/* -- Common Mistakes -- */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_mistakes}</h2>
      <p>{t.mistakesDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: t.mistakesList }} />

      {/* -- FAQ -- */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq1_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq2_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq3_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq4_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq5_a }} />
    </article>
  );
}
