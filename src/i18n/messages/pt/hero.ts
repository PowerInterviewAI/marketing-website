import type { Hero } from '../en/hero';

export const hero: Hero = {
  title: 'Erre aqui, não na entrevista.',
  subtitle:
    'Pratique em voz alta com um entrevistador de IA no seu idioma. Cada resposta recebe nota e melhorias, para qualquer trabalho, de vendas a testes de código ao vivo.',
  free: '1 hora grátis',
  noCard: 'Sem cartão de crédito',
  secondary: 'Veja como funciona',

  trust: {
    platformsLabel: 'Plataformas',
    platforms: 'Windows agora, macOS em breve',
    languagesLabel: 'Idiomas de entrevista',
    voices: '{voices} vozes faladas',
    rolesLabel: 'Cargos',
    roles: 'Qualquer cargo, não só tecnologia',
    privacyLabel: 'Privacidade',
    privacy: 'Transcrições nunca são guardadas',
    badgeAlt: 'Avaliação do Power Interview AI no PeerPush',
  },

  download: {
    forWindows: 'Baixar para Windows',
    generic: 'Baixar',
    macosNotReady: 'A versão para macOS ainda não está pronta: estamos trabalhando nela.',
    windowsInstead: 'Baixar para Windows',
    allReleases: 'Todas as versões',
    latest: 'mais recente',
    windows: 'Windows',
    macosSoon: 'macOS (em breve)',
    macosSoonTitle: 'Em desenvolvimento',
    free: 'Baixar grátis',
    stickyNote: '1 hora grátis',
    mobileNote: 'O Power Interview AI funciona no seu PC com Windows.',
    shareLink: 'Enviar link para meu PC',
    copyLink: 'Copiar link para meu PC',
    linkCopied: 'Link copiado',
    shareText: 'Baixar o Power Interview AI no meu PC',
  },

  surface: {
    play: 'Reproduzir demonstração',
    pause: 'Pausar demonstração',
    previous: 'Demonstração anterior',
    next: 'Próxima demonstração',
    clips: 'Clipes de demonstração',
    preview: 'Prévia da entrevista',
    mock: 'Entrevista simulada',
    live: 'Ajuda ao vivo',
    sample: 'Exemplo',
    question: 'Pergunta {n} de {total}',
    interviewer: 'Entrevistador',
    you: 'Você',
    score: 'Nota',
    strength: 'Ponto forte',
    gap: 'A melhorar',
    suggestion: 'Sugestão',
    language: 'Idioma da entrevista',
    yours: 'Idioma do seu navegador',
    pauseLanguages: 'Pausar prévia de idiomas',
    playLanguages: 'Reproduzir prévia de idiomas',
    allLanguages: 'Todos os {count} idiomas',
  },
  demos: [
    {
      title: 'Assistente de entrevista ao vivo e exportação inteligente',
      description:
        'Sugestões instantâneas durante a chamada e, depois, uma exportação inteligente com resumo e insights',
    },
    {
      title: 'Desafio de código - Percurso em grafo',
      description: 'Capture o problema da tela e leia a solução na sobreposição furtiva',
    },
    {
      title: 'Desafio de código - Componentes conexos',
      description: 'Várias capturas dão à IA o enunciado completo, as restrições e a assinatura',
    },
    {
      title: 'Desafio de código - Recursão em árvore binária',
      description:
        'Role o código só com atalhos: escondido no compartilhamento de tela e sem roubar o foco',
    },
  ],

  install: {
    eyebrow: 'Instalação',
    title: 'Três jeitos de começar',
    description:
      'Escolha o que combina com o seu jeito de trabalhar. O comando de uma linha baixa a versão mais recente e abre o instalador para você.',
    tabCli: 'Linha de comando',
    tabInstaller: 'Instalador',
    tabSource: 'A partir do código',
    windows: 'Windows',
    macos: 'macOS',
    copy: 'Copiar o comando de instalação',
    copied: 'Copiado',
    macosReference:
      'A versão para macOS ainda não está pronta: estamos trabalhando nela. O comando fica aqui como referência, mas pode não gerar uma instalação funcional.',
    versionAgnostic:
      'Mostrando o comando independente de versão: a versão é buscada na hora da instalação.',
    windowsInstaller: 'Instalador para Windows',
    latestRelease: 'versão mais recente',
    macArm: 'macOS - Apple Silicon',
    macIntel: 'macOS - Intel',
    macosInstallersNotReady:
      'Os instaladores para macOS ainda não estão prontos: estamos trabalhando neles.',
    viewReleases: 'Ver todas as versões no GitHub',
    sourceText: 'Clone o repositório e rode a partir do código. Requer Node.js 22.15+.',
    viewBuild: 'Ver as instruções de build',
  },
};
