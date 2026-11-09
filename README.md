# CJBR Sites — landing page Premium

Landing page implementada sobre o esqueleto Premium existente (Next.js, React e TypeScript). Conteúdo comercial baseado em `output/pdf/cardapio-pacotes-acessiveis.pdf`. Logo original preservada em `public/images/cjbr-sites-logo-v4.png` e enquadrada via CSS.

## Executar

```sh
npm ci
npm run dev
```

Validação: `npm run typecheck` e `npm run build`.

## Adicionar os contatos

Em `config/site.ts`, preencha:

- `contact.whatsapp`: DDI + DDD + número, somente dígitos. Exemplo de formato: `55DDDNUMERO`.
- `contact.email`: seu endereço Gmail completo.

Os CTAs de orçamento levam à seção de contato. Enquanto os dados estão vazios, ela exibe “WhatsApp em breve” e “E-mail de contato em breve”, sem gerar links inválidos. Depois de preencher, os canais tornam-se links reais automaticamente.

## Conteúdo e identidade

- `app/page.tsx`: landing page e seções.
- `data/landing.ts`: planos, funcionalidades adicionais e FAQ.
- `app/globals.css`: identidade visual, mockup ilustrativo e responsividade.
- `components/sections/contact-options.tsx`: canais de contato.
- `public/downloads/cardapio-pacotes-acessiveis.pdf`: cardápio completo disponível no site.

Identidade: branco, grafite `#17191d`, azul `#285cf6`, superfícies `#f6f7f9`, tipografia sans-serif e ilustrações em CSS. O conceito visual do hero é ilustrativo, não um portfólio de cliente.

As rotas demonstrativas do template foram desativadas. Os componentes originais permanecem disponíveis para reaproveitamento; a landing page usa apenas os novos conteúdos.

Antes de publicar, configure `NEXT_PUBLIC_SITE_URL` com o domínio real em `.env.local`/ambiente de produção. O repositório do projeto é https://github.com/CleitonJr01/CJBRsite. O envio ao GitHub não publica o site em uma hospedagem.

## SEO, compartilhamento e desempenho

- Endereço canônico: `https://cjbrsites.vercel.app`. `NEXT_PUBLIC_SITE_URL` pode substituí-lo com uma URL HTTP(S) válida. O valor demonstrativo `exemplo.com.br` é descartado.
- Título e descrição para busca, Open Graph e Twitter Card em `config/site.ts` e `lib/seo.ts`.
- Imagem social horizontal: `public/images/social/cjbr-compartilhamento-v1.jpg` (1200 × 630).
- Arte quadrada: `public/images/social/cjbr-divulgacao-quadrada-v1.jpg` (1080 × 1080).
- Textos prontos: `docs/compartilhamento.md`.
- Dados estruturados de Organization, WebSite, WebPage e catálogo de serviços derivados dos planos reais. Não publica telefone, endereço, avaliações ou redes sociais fictícios.
- Sitemap inclui somente páginas habilitadas; não altera artificialmente a data de atualização. Previews Vercel recebem `noindex` e sitemap vazio. PDFs recebem `X-Robots-Tag: noindex` para concentrar a busca na landing page.
- Logo WebP de aproximadamente 4,7 KB, dimensões reservadas e carregamento tardio no rodapé. A imagem original fica preservada. Página principal pré-renderizada; não carrega fontes externas nem scripts de analytics sem configuração.
- Imagens têm cache de 24 horas com revalidação. Arquivos sociais podem ser versionados para renovar as prévias.

Após publicar, confira o canonical e as imagens no domínio público. Cadastre a propriedade no Google Search Console e envie `https://cjbrsites.vercel.app/sitemap.xml`. A publicação, verificação de propriedade e indexação não são realizadas automaticamente por essas alterações de código. As plataformas também podem manter prévias antigas em cache.


## Orçamento, contato e aparência

- Anúncios, métricas avulsas e pacote combinado estão ocultos por `features.ads: false` em `config/site.ts`. O menu mostra Hospedagem. O link público do cardápio antigo foi retirado da página porque ainda descreve esses serviços; os PDFs originais permanecem preservados.
- `lib/quote.ts` monta o catálogo a partir dos preços em `data/landing.ts`, calcula em centavos e separa cobrança única da mensal. Itens com preço “a partir de” continuam identificados como estimativa.
- `components/shop/quote-builder.tsx` permite selecionar/remover serviços, revisar valores e incluir observações. Um plano de site substitui outro; um mensal substitui outro. Pedidos no WhatsApp substitui Vitrine digital, que já está incluída.
- Contato: `cjbrsites@gmail.com`. Gmail e aplicativo de e-mail recebem o mesmo resumo. O visitante revisa e envia; o site não dispara mensagens nem cobra pagamentos.
- WhatsApp permanece “Em breve”. Para ativar, preencha `siteConfig.contact.whatsapp` com DDI, DDD e número, somente dígitos. O mesmo resumo será enviado ao link de conversa.
- O seletor de tema segue inicialmente a preferência do dispositivo. O banner permite guardar tema e IDs dos serviços via armazenamento local. “Só o necessário” guarda apenas a decisão e remove preferências opcionais. Observações nunca são persistidas. Não há rastreadores de anúncios/analytics. Reabra o aviso no botão Cookies do rodapé.
- Logo do cabeçalho: `public/images/cjbr-logo-transparent.webp`, com alpha real. A versão PNG transparente fica na mesma pasta. O original é preservado.
- Nova logo baseada no favicon: `cjbr-logo-favicon.svg` / `.png` e `cjbr-logo-favicon-light.svg` / `.png`. A variante nova está disponível como arquivo; o cabeçalho continua com a marca anterior, agora transparente.
- `npm test` verifica exclusividade, totais, estimativas, codificação dos contatos e ausência de número de WhatsApp. Build: `npm run build`. Tipos: `npm run typecheck`.
