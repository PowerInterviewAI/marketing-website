import type { MockInterview } from '../en/mockInterview';

export const mockInterview: MockInterview = {
  eyebrow: 'Entrevista simulada',
  title: 'Ensaie a entrevista antes de fazê-la',
  description:
    'Uma entrevista simulada falada dentro do mesmo app de desktop. Ela pergunta, você responde em voz alta e recebe um relatório com nota sobre o que realmente disse.',
  steps: [
    {
      title: 'Escolha o formato',
      body: 'Senioridade de júnior a staff, dificuldade e 3, 5, 8 ou 12 perguntas. Mais nada para preencher: a entrevista é montada a partir do currículo e da descrição da vaga que já estão na sua conta, os mesmos que o assistente ao vivo lê.',
    },
    {
      title: 'O entrevistador fala',
      body: 'Perguntas comportamentais, técnicas, situacionais e de encerramento, feitas em voz alta no seu idioma de entrevista. Uma resposta rasa gera até duas perguntas de acompanhamento sobre a mesma questão, como um entrevistador de verdade faria.',
    },
    {
      title: 'Você responde em voz alta',
      body: 'Seu microfone é transcrito enquanto você fala, e você avança quando estiver pronto. As sugestões do assistente ao vivo ficam desligadas, a não ser que você ligue: a ideia é que você mesmo pense.',
    },
    {
      title: 'Você recebe uma avaliação',
      body: 'Uma nota geral com pontos fortes e lacunas e, depois, cada pergunta avaliada separadamente, com o motivo da nota e uma versão mais forte da sua resposta.',
    },
  ],
  headphones: {
    badge: 'Fones de ouvido',
    text: 'Use fones numa entrevista simulada. Com alto-falantes, o fim de uma pergunta falada pode cair no começo da resposta que seu microfone está transcrevendo.',
  },
  details: {
    scored: {
      title: 'Avaliada com o seu próprio material',
      body: 'Perguntas e avaliação usam o perfil e o contexto da vaga salvos na sua conta, então a simulação ensaia o cargo para o qual você vai mesmo fazer entrevista.',
    },
    languages: {
      title: 'Todos os {count} {noun}',
      body: 'Uma configuração vale para o assistente ao vivo e para a simulação. Em {voices} deles o entrevistador fala em voz alta; onde não há voz disponível, ele escreve as perguntas, e o acompanhamento e a avaliação não mudam.',
    },
    pricing: {
      title: 'Ilimitada com assinatura',
      body: 'Uma assinatura cobre entrevistas simuladas e ao vivo, sem limite em nenhuma. Na hora grátis, uma simulação consome o tempo por minuto e, se ele acabar, a entrevista termina ali e você ainda recebe o relatório.',
    },
    report: {
      title: 'O relatório é seu',
      body: 'Exporte como DOCX ou Markdown, no idioma da sua entrevista, e guarde junto das anotações das suas chamadas reais.',
    },
  },
  cta: 'Treine antes da real',
  guide: 'Ler o guia da entrevista simulada',
  cost: 'Quanto custa uma sessão',
};
