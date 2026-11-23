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
