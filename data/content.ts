export const services = [
  { id: "estrategia", number: "01", title: "Estratégia", description: "[Descreva o serviço, para quem ele é e o resultado esperado.]", icon: "compass", detail: "[Explique etapas, entregáveis e diferenciais reais deste serviço.]" },
  { id: "criacao", number: "02", title: "Criação", description: "[Apresente uma segunda frente de atuação com linguagem do cliente.]", icon: "layers", detail: "[Inclua aqui o escopo e informações relevantes.]" },
  { id: "experiencia", number: "03", title: "Experiência", description: "[Mostre como este serviço contribui para a jornada do público.]", icon: "sparkles", detail: "[Inclua aqui processo, prazos e informações verificadas.]" },
];

export const benefits = [
  { title: "Uma direção clara", description: "[Explique uma vantagem concreta da sua abordagem.]" },
  { title: "Cada detalhe importa", description: "[Explique como o processo atende às necessidades do cliente.]" },
  { title: "Feito para durar", description: "[Descreva um benefício sustentável ou de longo prazo, se aplicável.]" },
];

export type Project = { id: string; title: string; category: string; image: string; alt: string; description: string; year?: string };
export const projects: Project[] = [
  { id: "projeto-a", title: "Projeto conceitual A", category: "Identidade", image: "/images/project-a.svg", alt: "Composição abstrata em tons de areia e azul", description: "[Substitua por um projeto real, sua história e entregáveis.]" },
  { id: "projeto-b", title: "Projeto conceitual B", category: "Digital", image: "/images/project-b.svg", alt: "Composição abstrata com formas circulares em laranja", description: "[Substitua por contexto, solução e imagens autorizadas.]" },
  { id: "projeto-c", title: "Projeto conceitual C", category: "Campanha", image: "/images/project-c.svg", alt: "Composição abstrata com blocos geométricos em azul", description: "[Substitua por resultados reais e informações verificadas.]" },
  { id: "projeto-d", title: "Projeto conceitual D", category: "Identidade", image: "/images/project-d.svg", alt: "Composição abstrata em tons escuros e creme", description: "[Substitua por um case real e suas imagens.]" },
];

export type Testimonial = { quote: string; name: string; role?: string; image?: string; rating?: number };
// Publicação bloqueada por padrão: inclua depoimentos reais, autorizados, e mude a flag abaixo.
export const showTestimonials = false;
export const testimonials: Testimonial[] = [];

export const faqs = [
  { question: "Como funciona o primeiro contato?", answer: "[Explique como a equipe recebe pedidos e qual é a próxima etapa.]" },
  { question: "Qual é o prazo de um projeto?", answer: "[Informe faixas de prazo reais ou explique como elas são definidas.]" },
  { question: "Vocês atendem à distância?", answer: "[Descreva a área de atendimento e o formato de trabalho.]" },
  { question: "Como solicitar uma proposta?", answer: "[Explique os dados necessários para preparar uma proposta.]" },
];

export const pageContent = {
  sobre: { eyebrow: "Quem somos", title: "Uma história construída com intenção.", description: "[Conte a história da marca, sua visão e o que move o trabalho.]" },
  servicos: { eyebrow: "O que fazemos", title: "Soluções para cada nova possibilidade.", description: "[Apresente a oferta de maneira específica e orientada ao cliente.]" },
  portfolio: { eyebrow: "Projetos", title: "Ideias em movimento.", description: "[Substitua os estudos conceituais por projetos reais antes de publicar.]" },
  depoimentos: { eyebrow: "Vozes", title: "A experiência, vista de perto.", description: "[Publique somente relatos reais e autorizados.]" },
  faq: { eyebrow: "Perguntas frequentes", title: "Tudo começa com clareza.", description: "[Respostas para as dúvidas mais comuns do seu público.]" },
  contato: { eyebrow: "Vamos conversar", title: "O próximo capítulo começa aqui.", description: "[Convide o visitante a entrar em contato e explique o retorno esperado.]" },
} as const;
