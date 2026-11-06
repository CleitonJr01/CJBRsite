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
