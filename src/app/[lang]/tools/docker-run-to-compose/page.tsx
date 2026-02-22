'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: { title: 'Docker Run to Compose Converter', description: 'Convert docker run commands to docker-compose.yml format instantly. Supports ports, volumes, environment variables, networks, and more.', inputLabel: 'docker run Command', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 -v /data:/app/data -e NODE_ENV=production nginx:latest', outputLabel: 'docker-compose.yml', convert: 'Convert', clear: 'Clear', loadSample: 'Load Sample', copyLabel: 'Copy YAML', introTitle: 'Free Docker Run to Compose Converter', introText: 'Paste your docker run command and instantly get the equivalent docker-compose.yml configuration. The converter handles ports, volumes, environment variables, networks, restart policies, and more.', howTitle: 'How to Convert', step1: 'Paste your docker run command in the input area', step2: 'Click "Convert" to generate docker-compose.yml', step3: 'Review the generated YAML output', step4: 'Copy the result to use in your project', featuresTitle: 'Features', feature1: 'Port mapping (-p/--publish)', feature2: 'Volume mounts (-v/--volume)', feature3: 'Environment variables (-e/--env)', feature4: 'Container naming (--name)', feature5: 'Restart policies (--restart)', faqTitle: 'Frequently Asked Questions', faq1q: 'What docker run flags are supported?', faq1a: 'The converter supports common flags including -d (detach), -p (ports), -v (volumes), -e (environment), --name, --restart, --network, --env-file, -w (workdir), --cpus, --memory, and --entrypoint.', faq2q: 'What version of docker-compose is generated?', faq2a: 'The output uses docker-compose version 3.8 format, which is compatible with modern Docker and Docker Compose installations.', faq3q: 'Can I convert multiple docker run commands?', faq3a: 'Currently, this tool converts one docker run command at a time. You can convert multiple commands and manually combine them into a single docker-compose.yml file.', faq4q: 'Is my data sent to a server?', faq4a: 'No. All conversion happens locally in your browser. No data is transmitted to any server.', faq5q: 'What if my docker run command uses advanced flags?', faq5a: 'The converter handles most common flags. Unsupported flags will be noted in comments in the output so you can add them manually.', relatedTitle: 'Related Tools', errorEmpty: 'Please paste a docker run command.', errorParse: 'Could not parse the docker run command. Please check the syntax.' },
  zh: { title: 'Docker Run 转 Compose 转换器', description: '即时将 docker run 命令转换为 docker-compose.yml 格式。支持端口、卷、环境变量等。', inputLabel: 'docker run 命令', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 -v /data:/app/data -e NODE_ENV=production nginx:latest', outputLabel: 'docker-compose.yml', convert: '转换', clear: '清除', loadSample: '加载示例', copyLabel: '复制 YAML', introTitle: '免费 Docker Run 转 Compose 转换器', introText: '粘贴 docker run 命令，即时生成等效的 docker-compose.yml 配置。', howTitle: '如何转换', step1: '粘贴 docker run 命令', step2: '点击"转换"生成 YAML', step3: '查看生成的 YAML', step4: '复制结果', featuresTitle: '功能', feature1: '端口映射 (-p)', feature2: '卷挂载 (-v)', feature3: '环境变量 (-e)', feature4: '容器命名 (--name)', feature5: '重启策略 (--restart)', faqTitle: '常见问题', faq1q: '支持哪些 docker run 标志？', faq1a: '支持 -d、-p、-v、-e、--name、--restart、--network 等常见标志。', faq2q: '生成哪个版本的 docker-compose？', faq2a: '输出使用 docker-compose 3.8 版本格式。', faq3q: '可以转换多个命令吗？', faq3a: '目前一次转换一个命令。', faq4q: '数据会发送到服务器吗？', faq4a: '不会。所有转换在浏览器中本地完成。', faq5q: '不支持的标志怎么办？', faq5a: '不支持的标志会在输出中以注释形式标注。', relatedTitle: '相关工具', errorEmpty: '请粘贴 docker run 命令。', errorParse: '无法解析命令。' },
  ja: { title: 'Docker Run to Compose 変換', description: 'docker runコマンドをdocker-compose.yml形式に即座に変換。', inputLabel: 'docker runコマンド', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 -e NODE_ENV=production nginx:latest', outputLabel: 'docker-compose.yml', convert: '変換', clear: 'クリア', loadSample: 'サンプル', copyLabel: 'YAMLをコピー', introTitle: '無料Docker Run変換ツール', introText: 'docker runコマンドを貼り付けて即座にdocker-compose.ymlを生成。', howTitle: '変換方法', step1: 'コマンドを貼り付け', step2: '「変換」をクリック', step3: 'YAML出力を確認', step4: '結果をコピー', featuresTitle: '機能', feature1: 'ポートマッピング', feature2: 'ボリュームマウント', feature3: '環境変数', feature4: 'コンテナ命名', feature5: '再起動ポリシー', faqTitle: 'よくある質問', faq1q: '対応フラグは？', faq1a: '-d, -p, -v, -e, --name, --restart等。', faq2q: 'バージョンは？', faq2a: 'v3.8形式。', faq3q: '複数コマンド？', faq3a: '1つずつ。', faq4q: 'データ送信？', faq4a: 'いいえ。', faq5q: '未対応フラグ？', faq5a: 'コメントで表示。', relatedTitle: '関連ツール', errorEmpty: 'コマンドを入力してください。', errorParse: 'パースできません。' },
  ko: { title: 'Docker Run to Compose 변환기', description: 'docker run 명령을 docker-compose.yml 형식으로 즉시 변환합니다.', inputLabel: 'docker run 명령', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 -e NODE_ENV=production nginx:latest', outputLabel: 'docker-compose.yml', convert: '변환', clear: '지우기', loadSample: '샘플', copyLabel: 'YAML 복사', introTitle: '무료 Docker Run 변환기', introText: 'docker run 명령을 붙여넣어 docker-compose.yml을 즉시 생성합니다.', howTitle: '변환 방법', step1: '명령 붙여넣기', step2: '"변환" 클릭', step3: 'YAML 출력 확인', step4: '결과 복사', featuresTitle: '기능', feature1: '포트 매핑', feature2: '볼륨 마운트', feature3: '환경 변수', feature4: '컨테이너 이름', feature5: '재시작 정책', faqTitle: '자주 묻는 질문', faq1q: '지원 플래그는?', faq1a: '-d, -p, -v, -e, --name, --restart 등.', faq2q: '버전은?', faq2a: 'v3.8 형식.', faq3q: '여러 명령?', faq3a: '하나씩.', faq4q: '데이터 전송?', faq4a: '아니요.', faq5q: '미지원 플래그?', faq5a: '주석으로 표시.', relatedTitle: '관련 도구', errorEmpty: '명령을 입력하세요.', errorParse: '파싱 실패.' },
  fr: { title: 'Docker Run vers Compose', description: 'Convertissez les commandes docker run en docker-compose.yml.', inputLabel: 'Commande docker run', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 nginx:latest', outputLabel: 'docker-compose.yml', convert: 'Convertir', clear: 'Effacer', loadSample: 'Exemple', copyLabel: 'Copier YAML', introTitle: 'Convertisseur Docker Run Gratuit', introText: 'Collez votre commande docker run pour generer docker-compose.yml.', howTitle: 'Comment convertir', step1: 'Collez la commande', step2: 'Cliquez "Convertir"', step3: 'Verifiez le YAML', step4: 'Copiez le resultat', featuresTitle: 'Fonctionnalites', feature1: 'Ports (-p)', feature2: 'Volumes (-v)', feature3: 'Variables d\'env (-e)', feature4: 'Nommage (--name)', feature5: 'Restart (--restart)', faqTitle: 'FAQ', faq1q: 'Quels flags ?', faq1a: '-d, -p, -v, -e, --name, --restart, --network.', faq2q: 'Quelle version ?', faq2a: 'v3.8.', faq3q: 'Plusieurs commandes ?', faq3a: 'Une a la fois.', faq4q: 'Donnees envoyees ?', faq4a: 'Non.', faq5q: 'Flags non supportes ?', faq5a: 'En commentaires.', relatedTitle: 'Outils connexes', errorEmpty: 'Collez une commande.', errorParse: 'Impossible de parser.' },
  de: { title: 'Docker Run zu Compose Konverter', description: 'Konvertieren Sie docker run Befehle in docker-compose.yml.', inputLabel: 'docker run Befehl', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 nginx:latest', outputLabel: 'docker-compose.yml', convert: 'Konvertieren', clear: 'Leeren', loadSample: 'Beispiel', copyLabel: 'YAML kopieren', introTitle: 'Kostenloser Docker Run Konverter', introText: 'Fuegen Sie Ihren docker run Befehl ein.', howTitle: 'So konvertieren Sie', step1: 'Befehl einfuegen', step2: '"Konvertieren" klicken', step3: 'YAML pruefen', step4: 'Ergebnis kopieren', featuresTitle: 'Funktionen', feature1: 'Ports (-p)', feature2: 'Volumes (-v)', feature3: 'Umgebungsvariablen (-e)', feature4: 'Benennung (--name)', feature5: 'Neustart (--restart)', faqTitle: 'FAQ', faq1q: 'Welche Flags?', faq1a: '-d, -p, -v, -e, --name, --restart, --network.', faq2q: 'Welche Version?', faq2a: 'v3.8.', faq3q: 'Mehrere Befehle?', faq3a: 'Einer nach dem anderen.', faq4q: 'Daten gesendet?', faq4a: 'Nein.', faq5q: 'Nicht unterstuetzte Flags?', faq5a: 'Als Kommentare.', relatedTitle: 'Verwandte Tools', errorEmpty: 'Befehl eingeben.', errorParse: 'Kann nicht geparst werden.' },
  es: { title: 'Docker Run a Compose', description: 'Convierta comandos docker run a docker-compose.yml.', inputLabel: 'Comando docker run', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 nginx:latest', outputLabel: 'docker-compose.yml', convert: 'Convertir', clear: 'Limpiar', loadSample: 'Ejemplo', copyLabel: 'Copiar YAML', introTitle: 'Convertidor Docker Run Gratis', introText: 'Pegue su comando docker run.', howTitle: 'Como convertir', step1: 'Pegue el comando', step2: 'Clic "Convertir"', step3: 'Revise el YAML', step4: 'Copie', featuresTitle: 'Caracteristicas', feature1: 'Puertos', feature2: 'Volumenes', feature3: 'Variables de entorno', feature4: 'Nombre', feature5: 'Reinicio', faqTitle: 'FAQ', faq1q: 'Que flags?', faq1a: 'Los comunes.', faq2q: 'Version?', faq2a: 'v3.8.', faq3q: 'Varios comandos?', faq3a: 'Uno a la vez.', faq4q: 'Datos enviados?', faq4a: 'No.', faq5q: 'Flags no soportados?', faq5a: 'En comentarios.', relatedTitle: 'Herramientas', errorEmpty: 'Pegue un comando.', errorParse: 'No se puede parsear.' },
  pt: { title: 'Docker Run para Compose', description: 'Converta comandos docker run para docker-compose.yml.', inputLabel: 'Comando docker run', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 nginx:latest', outputLabel: 'docker-compose.yml', convert: 'Converter', clear: 'Limpar', loadSample: 'Exemplo', copyLabel: 'Copiar YAML', introTitle: 'Conversor Docker Run Gratis', introText: 'Cole seu comando docker run.', howTitle: 'Como converter', step1: 'Cole o comando', step2: 'Clique "Converter"', step3: 'Verifique o YAML', step4: 'Copie', featuresTitle: 'Recursos', feature1: 'Portas', feature2: 'Volumes', feature3: 'Variaveis de ambiente', feature4: 'Nome', feature5: 'Reinicio', faqTitle: 'FAQ', faq1q: 'Quais flags?', faq1a: 'Os comuns.', faq2q: 'Versao?', faq2a: 'v3.8.', faq3q: 'Varios comandos?', faq3a: 'Um por vez.', faq4q: 'Dados enviados?', faq4a: 'Nao.', faq5q: 'Flags nao suportados?', faq5a: 'Em comentarios.', relatedTitle: 'Ferramentas', errorEmpty: 'Cole um comando.', errorParse: 'Nao pode ser parseado.' },
  it: { title: 'Docker Run a Compose', description: 'Converti comandi docker run in docker-compose.yml.', inputLabel: 'Comando docker run', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 nginx:latest', outputLabel: 'docker-compose.yml', convert: 'Converti', clear: 'Cancella', loadSample: 'Esempio', copyLabel: 'Copia YAML', introTitle: 'Convertitore Docker Run Gratis', introText: 'Incolla il comando docker run.', howTitle: 'Come convertire', step1: 'Incolla il comando', step2: 'Clicca "Converti"', step3: 'Verifica il YAML', step4: 'Copia', featuresTitle: 'Funzionalita', feature1: 'Porte', feature2: 'Volumi', feature3: 'Variabili ambiente', feature4: 'Nome', feature5: 'Riavvio', faqTitle: 'FAQ', faq1q: 'Quali flag?', faq1a: 'I piu comuni.', faq2q: 'Versione?', faq2a: 'v3.8.', faq3q: 'Piu comandi?', faq3a: 'Uno alla volta.', faq4q: 'Dati inviati?', faq4a: 'No.', faq5q: 'Flag non supportati?', faq5a: 'Nei commenti.', relatedTitle: 'Strumenti correlati', errorEmpty: 'Incolla un comando.', errorParse: 'Non parseable.' },
  nl: { title: 'Docker Run naar Compose', description: 'Converteer docker run commando\'s naar docker-compose.yml.', inputLabel: 'docker run commando', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 nginx:latest', outputLabel: 'docker-compose.yml', convert: 'Converteer', clear: 'Wissen', loadSample: 'Voorbeeld', copyLabel: 'Kopieer YAML', introTitle: 'Gratis Docker Run Converter', introText: 'Plak uw docker run commando.', howTitle: 'Hoe te converteren', step1: 'Plak commando', step2: 'Klik "Converteer"', step3: 'Controleer YAML', step4: 'Kopieer', featuresTitle: 'Functies', feature1: 'Poorten', feature2: 'Volumes', feature3: 'Omgevingsvariabelen', feature4: 'Naam', feature5: 'Herstart', faqTitle: 'FAQ', faq1q: 'Welke flags?', faq1a: 'De meest voorkomende.', faq2q: 'Versie?', faq2a: 'v3.8.', faq3q: 'Meerdere commando\'s?', faq3a: 'Een per keer.', faq4q: 'Data verzonden?', faq4a: 'Nee.', faq5q: 'Niet-ondersteunde flags?', faq5a: 'Als commentaar.', relatedTitle: 'Gerelateerde tools', errorEmpty: 'Plak een commando.', errorParse: 'Kan niet worden geparsed.' },
  pl: { title: 'Docker Run do Compose', description: 'Konwertuj komendy docker run na docker-compose.yml.', inputLabel: 'Komenda docker run', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 nginx:latest', outputLabel: 'docker-compose.yml', convert: 'Konwertuj', clear: 'Wyczysc', loadSample: 'Przyklad', copyLabel: 'Kopiuj YAML', introTitle: 'Darmowy Konwerter Docker Run', introText: 'Wklej komende docker run.', howTitle: 'Jak konwertowac', step1: 'Wklej komende', step2: 'Kliknij "Konwertuj"', step3: 'Sprawdz YAML', step4: 'Skopiuj', featuresTitle: 'Funkcje', feature1: 'Porty', feature2: 'Wolumeny', feature3: 'Zmienne srodowiskowe', feature4: 'Nazwa', feature5: 'Restart', faqTitle: 'FAQ', faq1q: 'Jakie flagi?', faq1a: 'Najczesciej uzywane.', faq2q: 'Wersja?', faq2a: 'v3.8.', faq3q: 'Wiele komend?', faq3a: 'Jedna naraz.', faq4q: 'Dane wysylane?', faq4a: 'Nie.', faq5q: 'Nieobslugiwane flagi?', faq5a: 'W komentarzach.', relatedTitle: 'Powiazane', errorEmpty: 'Wklej komende.', errorParse: 'Nie mozna sparsowac.' },
  sv: { title: 'Docker Run till Compose', description: 'Konvertera docker run till docker-compose.yml.', inputLabel: 'docker run kommando', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 nginx:latest', outputLabel: 'docker-compose.yml', convert: 'Konvertera', clear: 'Rensa', loadSample: 'Exempel', copyLabel: 'Kopiera YAML', introTitle: 'Gratis Docker Run Konverterare', introText: 'Klistra in ditt docker run kommando.', howTitle: 'Hur man konverterar', step1: 'Klistra in', step2: 'Klicka "Konvertera"', step3: 'Granska YAML', step4: 'Kopiera', featuresTitle: 'Funktioner', feature1: 'Portar', feature2: 'Volymer', feature3: 'Miljovariabler', feature4: 'Namn', feature5: 'Omstart', faqTitle: 'FAQ', faq1q: 'Vilka flaggor?', faq1a: 'De vanligaste.', faq2q: 'Version?', faq2a: 'v3.8.', faq3q: 'Flera kommandon?', faq3a: 'Ett i taget.', faq4q: 'Data skickas?', faq4a: 'Nej.', faq5q: 'Ej stoedda flaggor?', faq5a: 'Som kommentarer.', relatedTitle: 'Relaterade verktyg', errorEmpty: 'Klistra in ett kommando.', errorParse: 'Kan inte parsas.' },
  no: { title: 'Docker Run til Compose', description: 'Konverter docker run til docker-compose.yml.', inputLabel: 'docker run kommando', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 nginx:latest', outputLabel: 'docker-compose.yml', convert: 'Konverter', clear: 'Toom', loadSample: 'Eksempel', copyLabel: 'Kopier YAML', introTitle: 'Gratis Docker Run Konverterer', introText: 'Lim inn docker run kommandoen.', howTitle: 'Slik konverterer du', step1: 'Lim inn', step2: 'Klikk "Konverter"', step3: 'Sjekk YAML', step4: 'Kopier', featuresTitle: 'Funksjoner', feature1: 'Porter', feature2: 'Volumer', feature3: 'Miljovariabler', feature4: 'Navn', feature5: 'Omstart', faqTitle: 'FAQ', faq1q: 'Hvilke flagg?', faq1a: 'De vanligste.', faq2q: 'Versjon?', faq2a: 'v3.8.', faq3q: 'Flere kommandoer?', faq3a: 'En om gangen.', faq4q: 'Data sendt?', faq4a: 'Nei.', faq5q: 'Ikke-stottede flagg?', faq5a: 'Som kommentarer.', relatedTitle: 'Relaterte verktoy', errorEmpty: 'Lim inn en kommando.', errorParse: 'Kan ikke parses.' },
  id: { title: 'Docker Run ke Compose', description: 'Konversi perintah docker run ke docker-compose.yml.', inputLabel: 'Perintah docker run', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 nginx:latest', outputLabel: 'docker-compose.yml', convert: 'Konversi', clear: 'Hapus', loadSample: 'Contoh', copyLabel: 'Salin YAML', introTitle: 'Konverter Docker Run Gratis', introText: 'Tempel perintah docker run Anda.', howTitle: 'Cara konversi', step1: 'Tempel perintah', step2: 'Klik "Konversi"', step3: 'Periksa YAML', step4: 'Salin', featuresTitle: 'Fitur', feature1: 'Port', feature2: 'Volume', feature3: 'Variabel lingkungan', feature4: 'Nama', feature5: 'Restart', faqTitle: 'FAQ', faq1q: 'Flag apa?', faq1a: 'Yang umum.', faq2q: 'Versi?', faq2a: 'v3.8.', faq3q: 'Banyak perintah?', faq3a: 'Satu per satu.', faq4q: 'Data dikirim?', faq4a: 'Tidak.', faq5q: 'Flag tidak didukung?', faq5a: 'Dalam komentar.', relatedTitle: 'Alat terkait', errorEmpty: 'Tempel perintah.', errorParse: 'Tidak bisa diparse.' },
  th: { title: 'Docker Run เป็น Compose', description: 'แปลงคำสั่ง docker run เป็น docker-compose.yml', inputLabel: 'คำสั่ง docker run', inputPlaceholder: 'docker run -d --name my-app -p 8080:80 nginx:latest', outputLabel: 'docker-compose.yml', convert: 'แปลง', clear: 'ล้าง', loadSample: 'ตัวอย่าง', copyLabel: 'คัดลอก YAML', introTitle: 'แปลง Docker Run ฟรี', introText: 'วางคำสั่ง docker run ของคุณ', howTitle: 'วิธีแปลง', step1: 'วางคำสั่ง', step2: 'คลิก "แปลง"', step3: 'ตรวจสอบ YAML', step4: 'คัดลอก', featuresTitle: 'คุณสมบัติ', feature1: 'พอร์ต', feature2: 'วอลุ่ม', feature3: 'ตัวแปรสภาพแวดล้อม', feature4: 'ชื่อ', feature5: 'รีสตาร์ท', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'แฟล็กอะไรบ้าง?', faq1a: 'ที่ใช้ทั่วไป', faq2q: 'เวอร์ชัน?', faq2a: 'v3.8', faq3q: 'หลายคำสั่ง?', faq3a: 'ทีละคำสั่ง', faq4q: 'ส่งข้อมูล?', faq4a: 'ไม่', faq5q: 'แฟล็กที่ไม่รองรับ?', faq5a: 'เป็นคอมเมนต์', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง', errorEmpty: 'กรุณาวางคำสั่ง', errorParse: 'ไม่สามารถแยกวิเคราะห์ได้' },
};

const SAMPLE = `docker run -d \\
  --name my-web-app \\
  -p 8080:80 \\
  -p 443:443 \\
  -v /home/user/html:/usr/share/nginx/html:ro \\
  -v /home/user/conf:/etc/nginx/conf.d \\
  -e NGINX_HOST=example.com \\
  -e NGINX_PORT=80 \\
  --restart unless-stopped \\
  --network my-network \\
  -w /usr/share/nginx \\
  nginx:alpine`;

function parseDockerRun(cmd: string): string {
  const cleaned = cmd.replace(/\\\s*\n/g, ' ').replace(/\s+/g, ' ').trim();
  if (!cleaned.startsWith('docker run') && !cleaned.startsWith('docker  run')) {
    throw new Error('Not a docker run command');
  }

  const tokens: string[] = [];
  let current = '';
  let inQuote = '';
  for (const ch of cleaned) {
    if (inQuote) {
      if (ch === inQuote) { inQuote = ''; } else { current += ch; }
    } else if (ch === '"' || ch === "'") {
      inQuote = ch;
    } else if (ch === ' ') {
      if (current) { tokens.push(current); current = ''; }
    } else {
      current += ch;
    }
  }
  if (current) tokens.push(current);

  const args = tokens.slice(2);
  const service: Record<string, unknown> = {};
  const ports: string[] = [];
  const volumes: string[] = [];
  const envVars: string[] = [];
  let image = '';
  let name = 'app';
  let i = 0;

  while (i < args.length) {
    const arg = args[i];
    if (arg === '-d' || arg === '--detach') { i++; continue; }
    if ((arg === '-p' || arg === '--publish') && i + 1 < args.length) { ports.push(args[++i]); i++; continue; }
    if ((arg === '-v' || arg === '--volume') && i + 1 < args.length) { volumes.push(args[++i]); i++; continue; }
    if ((arg === '-e' || arg === '--env') && i + 1 < args.length) { envVars.push(args[++i]); i++; continue; }
    if (arg === '--name' && i + 1 < args.length) { name = args[++i]; i++; continue; }
    if (arg === '--restart' && i + 1 < args.length) { service.restart = args[++i]; i++; continue; }
    if (arg === '--network' && i + 1 < args.length) { service.networks = [args[++i]]; i++; continue; }
    if ((arg === '-w' || arg === '--workdir') && i + 1 < args.length) { service.working_dir = args[++i]; i++; continue; }
    if (arg === '--entrypoint' && i + 1 < args.length) { service.entrypoint = args[++i]; i++; continue; }
    if (arg === '--cpus' && i + 1 < args.length) { service.cpus = args[++i]; i++; continue; }
    if ((arg === '-m' || arg === '--memory') && i + 1 < args.length) { service.mem_limit = args[++i]; i++; continue; }
    if (arg === '--env-file' && i + 1 < args.length) { service.env_file = [args[++i]]; i++; continue; }
    if (arg.startsWith('-')) { i++; continue; }
    image = arg; i++;
  }

  if (!image) throw new Error('No image found');

  service.image = image;
  if (name !== 'app') service.container_name = name;
  if (ports.length > 0) service.ports = ports;
  if (volumes.length > 0) service.volumes = volumes;
  if (envVars.length > 0) {
    service.environment = envVars;
  }

  const lines: string[] = ['version: "3.8"', '', 'services:', `  ${name}:`];
  const indent = '    ';

  for (const [key, val] of Object.entries(service)) {
    if (Array.isArray(val)) {
      lines.push(`${indent}${key}:`);
      val.forEach(v => lines.push(`${indent}  - "${v}"`));
    } else {
      lines.push(`${indent}${key}: ${typeof val === 'string' && val.includes(' ') ? `"${val}"` : val}`);
    }
  }

  if (service.networks) {
    lines.push('', 'networks:');
    (service.networks as string[]).forEach(n => {
      lines.push(`  ${n}:`);
      lines.push('    external: true');
    });
  }

  return lines.join('\n');
}

export default function DockerRunToCompose() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = useCallback(() => {
    setError('');
    if (!input.trim()) { setError(t.errorEmpty); setOutput(''); return; }
    try {
      const result = parseDockerRun(input);
      setOutput(result);
    } catch {
      setError(t.errorParse);
      setOutput('');
    }
  }, [input, t]);

  const handleClear = useCallback(() => { setInput(''); setOutput(''); setError(''); }, []);
  const handleSample = useCallback(() => { setInput(SAMPLE); setOutput(''); setError(''); }, []);

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="docker-run-to-compose">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleConvert} className="btn btn-primary" style={{ fontSize: 13 }}>{t.convert}</button>
        <button onClick={handleSample} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.loadSample}</button>
        <button onClick={handleClear} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#f43f5e' }}>{'\u2715'} {error}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.inputPlaceholder} spellCheck={false}
            style={{ flex: 1, minHeight: 360, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} label={t.copyLabel} />
          </div>
          <textarea value={output} readOnly placeholder="version: &quot;3.8&quot;" spellCheck={false}
            style={{ flex: 1, minHeight: 360, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, background: 'var(--bg-card)', opacity: output ? 1 : 0.5, resize: 'vertical' }} />
        </div>
      </div>

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li></ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.feature1}</li><li>{t.feature2}</li><li>{t.feature3}</li><li>{t.feature4}</li><li>{t.feature5}</li></ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', userSelect: 'none' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[{ href: `/${lang}/tools/json-to-yaml-converter`, label: 'JSON to YAML' }, { href: `/${lang}/tools/yaml-to-json-converter`, label: 'YAML to JSON' }].map((link) => (
            <a key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</a>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
