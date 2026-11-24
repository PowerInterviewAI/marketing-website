import type { Story } from '../en/story';

export const story: Story = {
  answer: {
    eyebrow: 'Entrevista simulada',
    title: 'Ouça como soa uma resposta melhor',
    description:
      'Responda em voz alta. O relatório mostra por que sua resposta funcionou ou não e escreve uma versão melhor com a sua experiência.',
    question: 'Fale de uma vez em que você enfrentou um prazo difícil.',
    weakLabel: 'Sua primeira tentativa',
    strongLabel: 'Resposta melhorada',
    weak: 'Uma vez tivemos um prazo apertado, então o time trabalhou bastante e no fim deu certo.',
    strong:
      'Quando um cliente antecipou o lançamento em duas semanas, reduzi o escopo às três funções essenciais, realoquei duas pessoas e entregamos na nova data.',
    scoreLabel: 'Nota da resposta',
    replay: 'Repetir',
    points: ['Nota por pergunta', 'Perguntas de aprofundamento', 'Exporte em DOCX ou Markdown'],
  },
  modes: {
    eyebrow: 'Um app, dois modos',
    title: 'Antes da entrevista e durante ela',
    description:
      'Pratique com um entrevistador de IA que te avalia e deixe a ajuda ao vivo aberta na chamada real. Use um ou os dois.',
    sample: 'Exemplo',
    shared:
      'Os dois modos leem o mesmo currículo e a mesma vaga, e ambos são ilimitados em qualquer assinatura.',
    mock: {
      tag: 'Antes',
      title: 'Entrevista simulada',
      body: 'Um entrevistador de IA faz as perguntas em voz alta, insiste em respostas fracas e dá nota a cada uma.',
      points: [
        'Perguntas escritas para seu cargo e nível',
        'Até duas perguntas de acompanhamento por pergunta',
        'Um relatório com nota e uma resposta melhor para cada uma',
      ],
      link: 'Como funciona a entrevista simulada',
    },
    live: {
      tag: 'Durante',
      title: 'Entrevista ao vivo',
      body: 'Transcrição ao vivo e pontos-chave curtos ao lado do Zoom, Google Meet ou Teams enquanto a chamada acontece.',
      points: [
        'Os dois lados da chamada transcritos',
        'Sugestões baseadas no seu currículo',
        'Ajuda com código a partir de uma captura',
      ],
      link: 'Como funciona a ajuda ao vivo',
    },
  },
  live: {
    eyebrow: 'Entrevista ao vivo',
    title: 'Pontos-chave enquanto a chamada acontece',
    description:
      'O app ouve os dois lados da chamada e mostra ao lado pontos curtos e relevantes, tirados do seu currículo e da vaga. Nenhum bot entra na reunião.',
    points: [
      {
        title: 'As duas vozes transcritas',
        body: 'Seu microfone e o áudio da chamada, identificados por pessoa enquanto vocês falam.',
      },
      {
        title: 'Sugestões a partir da sua experiência',
        body: 'Cada uma se baseia no seu currículo e na vaga, não em conselhos genéricos.',
      },
      {
        title: 'Troque de idioma no meio da chamada',
        body: 'As sugestões acompanham na hora, em qualquer um dos {count} idiomas.',
      },
      {
        title: 'Exporte a sessão',
        body: 'Salve um resumo, a transcrição e cada sugestão em Word ou Markdown.',
      },
    ],
    imageAlt:
      'Power Interview AI em uma sessão de exemplo: pontos-chave sugeridos acima da transcrição ao vivo',
    caption: 'Sessão de exemplo gravada no app real com dados preparados.',
    cta: 'Teste a ajuda ao vivo grátis',
    note: 'Use a ajuda ao vivo só em entrevistas que permitam ferramentas de IA. Siga sempre as regras de cada empresa.',
  },
  roles: {
    eyebrow: 'Qualquer trabalho',
    title: 'Seu cargo. Suas perguntas.',
    description:
      'Adicione seu currículo e a vaga. Cada pergunta é escrita para o cargo que você quer.',
    sample: 'Pergunta de exemplo',
    items: {
      developer: {
        label: 'Desenvolvimento',
        question: 'Como você projetaria um limitador de requisições para uma API pública?',
      },
      sales: {
        label: 'Vendas',
        question: 'Como você recuperaria um negócio que esfriou antes do fim do trimestre?',
      },
      nurse: {
        label: 'Enfermagem',
        question: 'Como você prioriza o cuidado quando dois pacientes precisam de você?',
      },
      teacher: {
        label: 'Educação',
        question: 'Como você apoia um aluno que ficou para trás?',
      },
      finance: {
        label: 'Finanças',
        question: 'Fale de uma previsão errada e do que você mudou.',
      },
    },
  },
  coding: {
    eyebrow: 'Para desenvolvedores',
    title: 'Prepare-se para o teste de código ao vivo',
    description:
      'Transforme qualquer problema em uma solução guiada e pratique explicá-la como o entrevistador espera.',
    steps: [
      {
        title: 'Capture o problema',
        body: 'Adicione até quatro capturas do enunciado, restrições e exemplos.',
      },
      {
        title: 'Veja a abordagem',
        body: 'Receba uma solução sugerida com código destacado.',
      },
      {
        title: 'Explique você mesmo',
        body: 'Repasse a lógica, os casos extremos e a complexidade até dominar.',
      },
    ],
    panel: 'Sugestão de código',
    approachLabel: 'Abordagem',
    approach: 'Ordene pelo início e una cada intervalo que se sobrepõe ao último.',
    complexityLabel: 'Complexidade',
    note: 'Use para praticar e em entrevistas que permitam ferramentas de IA. Siga sempre as regras de cada empresa.',
    cta: 'Praticar entrevistas de código',
  },
  checker: {
    label: 'Meu idioma é compatível?',
    placeholder: 'Digite um idioma, como tâmil ou தமிழ்',
    voice: 'Falado e escrito',
    written: 'Perguntas escritas',
    none: 'Nada encontrado. Tente o nome em inglês ou nativo.',
  },
};
