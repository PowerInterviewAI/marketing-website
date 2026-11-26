import type { Hero } from '../en/hero';

export const hero: Hero = {
  title: 'Entraînez-vous. Puis soyez épaulé le jour J.',
  subtitle:
    'Répétez à voix haute avec un recruteur IA qui note chaque réponse, puis gardez transcription et points clés en direct à côté de Zoom, Meet ou Teams. Pour tout métier, dans votre langue.',
  free: '1 heure offerte',
  noCard: 'Sans carte bancaire',

  trust: {
    platformsLabel: 'Plateformes',
    platforms: 'Windows et macOS',
    languagesLabel: 'Langues d’entretien',
    voices: '{voices} langues avec voix',
    rolesLabel: 'Métiers',
    roles: 'Tous les métiers, pas seulement la tech',
    privacyLabel: 'Confidentialité',
    privacy: 'Transcriptions jamais conservées',
    badgeAlt: 'Note de Power Interview AI sur PeerPush',
  },

  download: {
    forWindows: 'Télécharger pour Windows',
    forMac: 'Télécharger pour macOS',
    generic: 'Télécharger',
    allReleases: 'Toutes les versions',
    latest: 'dernière',
    windows: 'Windows',
    mac: 'macOS',
    macArm: 'Mac Apple Silicon',
    macIntel: 'Mac Intel',
    free: 'Télécharger gratuitement',
    stickyNote: '1 heure offerte',
    mobileNote: 'Power Interview AI fonctionne sur votre PC Windows ou votre Mac.',
    shareLink: 'Envoyer le lien à mon PC',
    copyLink: 'Copier le lien pour mon PC',
    linkCopied: 'Lien copié',
    shareText: 'Télécharger Power Interview AI sur mon PC',
  },

  surface: {
    preview: 'Aperçu de l’entretien',
    before: 'Avant',
    during: 'Pendant',
    mock: 'Entretien simulé',
    live: 'Aide en direct',
    question: 'Question {n} sur {total}',
    interviewer: 'Recruteur',
    you: 'Vous',
    score: 'Note',
    strength: 'Point fort',
    gap: 'À améliorer',
    suggestion: 'Suggestion',
    language: 'Langue de l’entretien',
    yours: 'Langue de votre navigateur',
    pauseLanguages: 'Mettre l’aperçu des langues en pause',
    playLanguages: 'Lancer l’aperçu des langues',
    allLanguages: 'Les {count} langues',
  },

  demo: {
    watch: 'Voir la démo',
    title: 'Démos du produit',
    close: 'Fermer la démo',
    clips: {
      mock: {
        title: 'Entretien simulé en espagnol',
        description:
          'Le recruteur IA pose la question, vous répondez à voix haute et vos mots s’affichent.',
      },
      report: {
        title: 'Rapport noté',
        description:
          'Consultez votre note, vos lacunes et une meilleure version de chaque réponse.',
      },
      live: {
        title: 'Aide en direct en japonais',
        description: 'De courts points clés dans votre langue à côté de la conversation.',
      },
      coding: {
        title: 'Parcours de code',
        description: 'Transformez un problème de code en approche, solution et complexité.',
      },
    },
  },

  install: {
    eyebrow: 'Installation',
    title: 'Commencez votre heure offerte',
    description:
      'Téléchargez l’application, ajoutez votre CV et passez votre premier entretien simulé dès ce soir.',
    more: 'Autres méthodes d’installation',
    tabCli: 'Ligne de commande',
    tabInstaller: 'Installateur',
    tabSource: 'Depuis les sources',
    windows: 'Windows',
    macos: 'macOS',
    copy: 'Copier la commande d’installation',
    copied: 'Copié',
    versionAgnostic:
      'Commande indépendante de la version : la version est recherchée au moment de l’installation.',
    windowsInstaller: 'Installateur Windows',
    latestRelease: 'dernière version',
    macArm: 'macOS - Apple Silicon',
    macIntel: 'macOS - Intel',
    viewReleases: 'Voir toutes les versions sur GitHub',
    sourceText: 'Clonez le dépôt et lancez depuis les sources. Nécessite Node.js 22.15+.',
    viewBuild: 'Voir les instructions de compilation',
  },
};
