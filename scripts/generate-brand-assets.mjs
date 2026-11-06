import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const file = (path) => fileURLToPath(new URL(path, root));
await mkdir(file('public/images/social'), { recursive: true });
const source = file('public/images/cjbr-sites-logo-v4.png');
const logo = await sharp(source)
  .extract({ left: 190, top: 470, width: 880, height: 320 })
  .resize(440, 160)
  .png().toBuffer();
await sharp(logo).webp({ quality: 85 }).toFile(file('public/images/cjbr-logo.webp'));
const logoData = `data:image/png;base64,${logo.toString('base64')}`;
const illustration = `<g transform="translate(795 150)">
 <rect x="0" y="0" width="330" height="310" rx="22" fill="#fff" stroke="#dce3f4" stroke-width="2"/>
 <path d="M0 42H330" stroke="#e3e8f2"/><circle cx="22" cy="22" r="4" fill="#b9c8e9"/><circle cx="36" cy="22" r="4" fill="#b9c8e9"/><circle cx="50" cy="22" r="4" fill="#b9c8e9"/>
 <rect x="28" y="70" width="130" height="12" rx="6" fill="#1b2435"/><rect x="28" y="94" width="90" height="8" rx="4" fill="#c5cee0"/>
 <g transform="translate(110 125) rotate(-15 85 65)"><rect x="-20" y="30" width="155" height="125" rx="30" fill="#163ba8"/><rect x="0" y="15" width="155" height="125" rx="30" fill="#376bf2"/><rect x="20" y="0" width="155" height="125" rx="30" fill="url(#blue)"/></g>
 <rect x="28" y="263" width="98" height="22" rx="5" fill="#285cf6"/>
 <g transform="translate(235 185) rotate(8)"><rect width="102" height="191" rx="20" fill="#17191d"/><rect x="5" y="6" width="92" height="179" rx="15" fill="#f5f8ff"/><rect x="34" y="11" width="34" height="7" rx="4" fill="#17191d"/><rect x="18" y="39" width="62" height="7" rx="3" fill="#1b2435"/><rect x="18" y="57" width="42" height="5" rx="2" fill="#b5c3e0"/><rect x="23" y="83" width="58" height="58" rx="14" fill="url(#blue)"/><rect x="18" y="160" width="65" height="11" rx="3" fill="#285cf6"/></g>
 </g>`;
const defs = `<defs><linearGradient id="blue" x2="1" y2="1"><stop stop-color="#96baff"/><stop offset=".5" stop-color="#4a80ff"/><stop offset="1" stop-color="#285cf6"/></linearGradient></defs>`;
const horizontal = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${defs}
<rect width="1200" height="630" fill="#fff"/><circle cx="1030" cy="290" r="350" fill="#f3f6ff"/><circle cx="1030" cy="290" r="285" fill="none" stroke="#e3eafa" stroke-width="2"/>
<image href="${logoData}" x="64" y="44" width="205" height="75"/>
<g font-family="DejaVu Sans,Arial,sans-serif"><text x="68" y="174" font-size="15" font-weight="700" letter-spacing="3" fill="#687286">SITES &amp; SOLUÇÕES DIGITAIS</text>
<text x="64" y="263" font-size="65" font-weight="700" letter-spacing="-3" fill="#17191d">Seu próximo</text><text x="64" y="341" font-size="65" font-weight="700" letter-spacing="-3" fill="#285cf6">passo no digital.</text>
<text x="68" y="399" font-size="22" fill="#626873">Sites, landing pages e soluções</text><text x="68" y="432" font-size="22" fill="#626873">para o seu negócio crescer.</text>
<rect x="68" y="476" width="328" height="46" rx="8" fill="#17191d"/><text x="90" y="506" font-size="17" fill="#fff" font-weight="700">Conheça os nossos planos ↗</text>
<text x="68" y="581" font-size="18" fill="#626873">cjbrsites.vercel.app</text></g>${illustration}</svg>`;
const square = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">${defs}
<rect width="1080" height="1080" fill="#fff"/><circle cx="1060" cy="1010" r="620" fill="#f1f5ff"/>
<image href="${logoData}" x="72" y="52" width="260" height="95"/>
<g font-family="DejaVu Sans,Arial,sans-serif"><text x="80" y="226" font-size="17" font-weight="700" letter-spacing="3" fill="#687286">SITES &amp; SOLUÇÕES DIGITAIS</text>
<text x="72" y="330" font-size="88" font-weight="700" letter-spacing="-4" fill="#17191d">Seu negócio.</text><text x="72" y="433" font-size="88" font-weight="700" letter-spacing="-4" fill="#17191d">Seu próximo</text><text x="72" y="536" font-size="88" font-weight="700" letter-spacing="-4" fill="#285cf6">grande passo.</text>
<text x="80" y="611" font-size="26" fill="#626873">Sites, landing pages, pedidos e agendamentos.</text>
<text x="80" y="654" font-size="26" fill="#626873">Conheça as soluções da CJBR Sites.</text>
<rect x="80" y="736" width="372" height="64" rx="10" fill="#285cf6"/><text x="107" y="777" font-size="22" font-weight="700" fill="#fff">Encontre seu plano ideal ↗</text>
<text x="80" y="1000" font-size="24" fill="#626873">cjbrsites.vercel.app</text></g>
<g transform="translate(0 585) scale(.65)">${illustration}</g></svg>`;
for (const [name, svg] of [['cjbr-compartilhamento-v1', horizontal], ['cjbr-divulgacao-quadrada-v1', square]]) {
 await writeFile(file(`public/images/social/${name}.svg`), svg);
 await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(file(`public/images/social/${name}.jpg`));
}
const icon = await readFile(file('public/favicon.svg'));
await sharp(icon).resize(180,180).png().toFile(file('public/apple-touch-icon.png'));
await sharp(icon).resize(48,48).png().toFile(file('public/favicon-48.png'));
console.log('Logo otimizada, ícones e imagens sociais gerados.');
