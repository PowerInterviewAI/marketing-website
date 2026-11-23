import type { Features } from '../en/features';

export const features: Features = {
  eyebrow: 'Recursos',
  title: 'Tudo o que o ensaio precisa, e tudo o que a chamada não consegue ver',
  description:
    'Cada recurso, marcado com a metade do app a que pertence: a entrevista simulada em que você ensaia, a entrevista ao vivo que você faz depois, ou as duas. Tudo funciona a partir do seu próprio currículo e da descrição da vaga, então o cargo pode ser qualquer um: a ajuda com código é um recurso entre nove, não o objetivo do app.',
  scope: { mock: 'Entrevista simulada', live: 'Entrevista ao vivo', both: 'As duas' },
  cta: 'Baixar grátis',
  mock: {
    title: 'Entrevista simulada',
    description:
      'Um entrevistador de IA que **faz as perguntas em voz alta**, insiste quando a resposta é rasa e dá nota a cada uma das suas com base no seu currículo e na descrição da vaga. Perguntas comportamentais, técnicas, situacionais e de encerramento, escritas para o cargo que você colou: uma vaga de enfermagem ou de vendas tanto quanto uma de engenharia. Exporte o relatório como DOCX ou Markdown.',
    link: 'Como funcionam as entrevistas simuladas',
  },
  transcription: {
    title: 'Transcrição ao vivo',
    description:
      'Transcrição em dois canais com detecção automática de quem fala e histórico completo da conversa. Troque de microfone **no meio da entrevista** sem parar a sessão: nenhuma lacuna na transcrição, nada para reiniciar.',
  },
  stealth: {
    title: 'Modo furtivo',
    description:
      'Trabalhe com discrição usando atalhos de teclado, controle de opacidade e posicionamento inteligente da janela. A janela **não aparece em capturas de tela** e continua invisível no compartilhamento de tela inteira.',
  },
  languages: {
    title: '{count} {noun}',
    description:
      'Uma única configuração controla as três coisas: qual modelo de fala transcreve a chamada, em que idioma chegam suas sugestões e o idioma do relatório exportado. Mude **no meio da entrevista**, não só antes de começar. Suporte completo da direita para a esquerda para árabe, hebraico, persa, urdu e outras escritas, e em **{voices}** deles o entrevistador simulado fala em voz alta.',
    link: 'Ver os {count} idiomas',
  },
  suggestions: {
    title: 'Sugestões de resposta com IA',
    description:
      'Respostas personalizadas e contextuais baseadas no seu currículo, na descrição da vaga e em **todo o histórico da conversa**. As sugestões se adaptam ao seu jeito de se comunicar para você contar a sua própria experiência em vez de ler conselhos genéricos. Ative o **modo profissional** para ver dicas de relance (um título e palavras-chave) em vez de frases completas.',
  },
  code: {
    title: 'Sugestões de código',
    description:
      'Para entrevistas com etapa técnica: análise de capturas de tela com soluções geradas por LLM para problemas de programação, com realce de sintaxe. **Opcional**: o resto do assistente ao vivo funciona do mesmo jeito numa entrevista que nunca mostra código.',
  },
  export: {
    title: 'Exportação de anotações com IA',
    description:
      '**Exportação inteligente de reuniões** para entrevistas, entrevistas simuladas e videochamadas. Resumos gerados por IA, itens de ação, transcrições com identificação de quem fala e notas de acompanhamento. Exporta para **DOCX** para compartilhar facilmente com pessoas e equipes.',
  },
  plans: {
    title: 'Todos os planos, todos os recursos',
    description:
      'Nenhum recurso fica atrás de um paywall. A hora grátis roda o app inteiro no **modelo grátis**: sugestões ao vivo, sugestões sob demanda e entrevistas simuladas. Uma assinatura leva você ao **modelo SOTA** com tempo de entrevista ilimitado.',
  },
  privacy: {
    title: 'Privacidade em primeiro lugar',
    description:
      'As transcrições nunca são guardadas depois da sua sessão, seja de uma entrevista simulada ou de uma chamada real. Sem mineração de dados e com controle total sobre as suas informações.',
  },
};
