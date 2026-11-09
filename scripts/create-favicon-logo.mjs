import sharp from 'sharp';
import { readFile,writeFile } from 'node:fs/promises';
const icon=(await readFile('public/favicon.svg','utf8')).replace(/<svg[^>]*>|<\/svg>/g,'');
for (const [name,color] of [['cjbr-logo-favicon','#17191d'],['cjbr-logo-favicon-light','#ffffff']]) {
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="760" height="280" viewBox="0 0 760 280"><g transform="translate(20 20) scale(3.75)">${icon}</g><g fill="${color}" font-family="DejaVu Sans,Arial,sans-serif"><text x="305" y="160" font-size="136" font-weight="700" letter-spacing="-6">CJBR</text><text x="313" y="229" font-size="52" letter-spacing="14">sites</text></g></svg>`;
 await writeFile(`public/images/${name}.svg`,svg);
 await sharp(Buffer.from(svg)).png().toFile(`public/images/${name}.png`);
}
await sharp('public/images/cjbr-logo-transparent.png').trim().resize({width:440}).webp({quality:90}).toFile('public/images/cjbr-logo-transparent.webp');
console.log('Logos transparentes em PNG, WebP e SVG preparadas.');
const darkLogo=await readFile('public/images/cjbr-logo-favicon.svg');
const lightLogo=await readFile('public/images/cjbr-logo-favicon-light.svg');
const preview=`<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="560"><rect width="720" height="560" fill="#f7f9fc"/><rect x="720" width="720" height="560" fill="#101620"/><g font-family="DejaVu Sans,Arial,sans-serif" font-size="18" letter-spacing="3"><text x="58" y="76" fill="#626873">CJBR SITES · NOVA ASSINATURA</text><text x="778" y="76" fill="#afb9c9">VERSÃO PARA FUNDO ESCURO</text></g><image href="data:image/svg+xml;base64,${darkLogo.toString('base64')}" x="55" y="170" width="610" height="225"/><image href="data:image/svg+xml;base64,${lightLogo.toString('base64')}" x="775" y="170" width="610" height="225"/><g font-family="DejaVu Sans,Arial,sans-serif" font-size="15"><text x="58" y="500" fill="#626873">Mesmo símbolo do favicon. Arquivos com fundo transparente.</text><text x="778" y="500" fill="#afb9c9">Disponível em PNG e SVG.</text></g></svg>`;
await sharp(Buffer.from(preview)).png().toFile('public/images/cjbr-logo-favicon-preview.png');
