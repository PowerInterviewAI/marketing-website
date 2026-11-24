import type { Faq } from '../en/faq';

export const faq: Faq = {
  eyebrow: 'Perguntas frequentes',
  seeAll: 'Ver todas as perguntas',
  title: 'Perguntas frequentes',
  description: 'Tudo o que vale saber antes de instalar.',
  categories: {
    gettingStarted: 'Primeiros passos',
    product: 'Produto',
    privacy: 'Privacidade e dados',
    billing: 'Planos e cobrança',
  },
  stillQuestions: 'Ainda tem dúvidas?',
  contact: 'Fale com a gente',
  items: [
    {
      question: 'É legal usar o Power Interview AI?',
      category: 'gettingStarted',
      answer:
        'O Power Interview AI foi feito para fins legítimos de estudo e preparação para entrevistas. Mesmo assim, é sua responsabilidade garantir que o seu uso respeita as leis aplicáveis e os termos de serviço das plataformas que você usa. Use sempre de forma ética e legal.',
    },
    {
      question: 'Posso treinar com uma entrevista simulada?',
      category: 'product',
      answer:
        'Sim, e ela acontece dentro do app, sem mandar você para outra ferramenta. Escolha uma senioridade, uma dificuldade e uma duração de 3, 5, 8 ou 12 perguntas, e um entrevistador de IA faz as perguntas em voz alta no seu idioma de entrevista, aprofunda com até duas perguntas de acompanhamento quando a resposta deixa algo em aberto e escuta enquanto você responde no microfone. Perguntas e avaliação usam o currículo e a descrição da vaga já salvos na sua conta. No final você recebe uma nota geral com pontos fortes e lacunas, além de cada pergunta avaliada separadamente com justificativa e uma versão mais forte da sua resposta, exportável em DOCX ou Markdown.',
    },
    {
      question: 'Como funciona a proteção da privacidade?',
      category: 'privacy',
      answer:
        'A configuração da sua entrevista (nome completo, perfil/currículo e contexto) fica salva na sua conta para acompanhar você em todos os dispositivos. Transcrições e capturas são enviadas aos nossos serviços de IA quando você pede uma sugestão, e as transcrições nunca são guardadas nos nossos servidores: elas só existem enquanto dura a sua sessão. Seu token de sessão e as configurações do dispositivo ficam na sua máquina. Nunca vendemos nem compartilhamos suas informações pessoais.',
    },
    {
      question: 'Qual modelo de IA gera as sugestões?',
      category: 'product',
      answer:
        'O modelo é fornecido para você: não há nada para conectar ou configurar. Contas novas usam nosso modelo grátis na hora grátis, e uma assinatura leva você ao nosso modelo SOTA, sem limite de uso na prática.',
    },
    {
      question: 'Quais plataformas são compatíveis?',
      category: 'gettingStarted',
      answer:
        'O Power Interview AI funciona hoje no Windows. O suporte ao macOS está em desenvolvimento.',
    },
    {
      question: 'Em quais idiomas posso fazer entrevistas?',
      category: 'product',
      answer:
        'Em 97, do inglês, espanhol, chinês e hindi ao cantonês, suaíli, persa e tâmil. A lista completa está na seção Idiomas da página inicial, e o seletor de idioma do app tem busca. Em 44 deles o entrevistador simulado fala em voz alta, e nos demais escreve as perguntas. Uma única configuração define qual modelo de fala transcreve a chamada, em que idioma chegam suas sugestões e em que idioma o relatório é exportado. Você pode mudar no meio da entrevista: a transcrição reconecta no novo idioma e as sugestões mudam na hora. Árabe, hebraico, persa, urdu e as outras escritas da direita para a esquerda aparecem da direita para a esquerda em todo o app.',
    },
    {
      question: 'Preciso de um hardware especial para usar o Power Interview AI?',
      category: 'gettingStarted',
      answer:
        'O Power Interview AI funciona na maioria dos computadores Windows modernos, sem hardware especial. Uma conexão estável melhora a qualidade do streaming.',
    },
    {
      question: 'Qual é a precisão da transcrição com IA?',
      category: 'product',
      answer:
        'Nossa transcrição em tempo real usa reconhecimento automático de fala (ASR) avançado, com suporte a dois canais e detecção de quem fala. A precisão depende da qualidade do áudio, mas ela funciona muito bem em entrevistas típicas com áudio claro.',
    },
    {
      question: 'Posso usar em entrevistas de programação?',
      category: 'product',
      answer:
        'Sim. Capture até quatro telas de um problema de código para receber uma abordagem sugerida e código destacado. Use para praticar a explicação de soluções e em entrevistas que permitam ferramentas de IA.',
    },
    {
      question: 'Posso usar durante uma entrevista real?',
      category: 'privacy',
      answer:
        'A ajuda ao vivo pode funcionar ao lado do Zoom, Google Meet ou Teams, mas algumas empresas e plataformas de avaliação não permitem assistência de IA. Verifique as regras de cada entrevista e use apenas onde for permitido. Por padrão, a janela do app fica fora das capturas de tela para proteger os dados pessoais exibidos.',
    },
    {
      question: 'Quanto custa uma entrevista simulada?',
      category: 'billing',
      answer:
        'Nada além do seu plano. Com uma assinatura, as entrevistas simuladas são ilimitadas. Na hora grátis, uma simulação consome o tempo por minuto, como o assistente ao vivo: uma sessão de 5 perguntas costuma levar uns 13 minutos e uma de 8 uns 20, então a hora dá para algumas sessões completas. Se o seu tempo grátis acabar no meio da entrevista, ela termina ali e você ainda recebe o relatório.',
    },
    {
      question: 'Como funciona a assinatura?',
      category: 'billing',
      answer:
        'Toda conta começa com uma hora grátis no modelo grátis. Depois disso, uma assinatura dá entrevistas ao vivo e simuladas ilimitadas no modelo SOTA: US$ 25 por um mês, US$ 60 por um trimestre (US$ 20 ao mês) ou US$ 180 por um ano (US$ 15 ao mês). É um passe pré-pago, não uma cobrança recorrente: nada renova sozinho, e comprar outro passe enquanto um está ativo soma o tempo dele depois da data de término atual.',
    },
    {
      question: 'Quais formas de pagamento vocês aceitam?',
      category: 'billing',
      answer:
        'Aceitamos apenas criptomoedas. Não é preciso cartão de crédito, PayPal nem pagamento bancário tradicional. Isso garante o máximo de privacidade e segurança nas suas transações. Basta comprar criptomoedas e usá-las para pagar um passe mensal, trimestral ou anual dentro do app.',
    },
    {
      question: 'Tem teste grátis?',
      category: 'billing',
      answer:
        'Sim! Novos usuários ganham uma hora grátis inteira com nosso modelo grátis, sem limite de uso na prática e sem interrupções. Ela inclui todos os recursos: sugestões ao vivo, sugestões sob demanda e treino com entrevista simulada. Uma assinatura leva você ao modelo SOTA com tempo de entrevista ilimitado.',
    },
    {
      question: 'Posso usar minha conta em mais de um computador?',
      category: 'billing',
      answer:
        'Sim. Seu perfil acompanha você em qualquer computador em que você fizer login. Mas uma conta só faz uma entrevista por vez: começar uma entrevista num segundo computador encerra a que está rodando no primeiro.',
    },
    {
      question: 'Posso pedir reembolso?',
      category: 'billing',
      answer:
        'Os reembolsos são tratados pela nossa equipe de suporte. Escreva para team@vectorleappulse.xyz em até 14 dias após a compra, com o número do seu pedido. Se o reembolso for aprovado, encerramos o tempo de assinatura correspondente e devolvemos o dinheiro para você.',
    },
  ],
};
