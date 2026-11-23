import type { Hero } from '../en/hero';

export const hero: Hero = {
  title: 'Faites vos erreurs ici, pas en entretien.',
  subtitle:
    'Entraînez-vous à voix haute avec un recruteur IA dans votre langue. Chaque réponse est notée et améliorée, pour tout métier, de la vente au test de code en direct.',
  free: '1 heure offerte',
  noCard: 'Sans carte bancaire',

  trust: {
    platformsLabel: 'Plateformes',
    platforms: 'Windows dès maintenant, macOS bientôt',
    languagesLabel: 'Langues d’entretien',
    voices: '{voices} voix parlées',
    rolesLabel: 'Métiers',
    roles: 'Tous les métiers, pas seulement la tech',
    privacyLabel: 'Confidentialité',
    privacy: 'Transcriptions jamais conservées',
    badgeAlt: 'Note de Power Interview AI sur PeerPush',
  },

  download: {
    forWindows: 'Télécharger pour Windows',
    generic: 'Télécharger',
    macosNotReady: 'La version macOS n’est pas encore prête : nous y travaillons activement.',
    windowsInstead: 'Télécharger pour Windows à la place',
    allReleases: 'Toutes les versions',
    latest: 'dernière',
    windows: 'Windows',
    macosSoon: 'macOS (bientôt)',
    macosSoonTitle: 'En cours de développement',
    free: 'Télécharger gratuitement',
    stickyNote: '1 heure offerte',
    mobileNote: 'Power Interview AI fonctionne sur votre PC Windows.',
    shareLink: 'Envoyer le lien à mon PC',
    copyLink: 'Copier le lien pour mon PC',
    linkCopied: 'Lien copié',
    shareText: 'Télécharger Power Interview AI sur mon PC',
  },

  surface: {
    preview: 'Aperçu de l’entretien',
    mock: 'Entretien simulé',
    live: 'Aide en direct',
    sample: 'Exemple',
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
    sample: 'Session d’exemple enregistrée dans la vraie application avec des données préparées.',
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
    macosReference:
      'La version macOS n’est pas encore prête : nous y travaillons activement. Cette commande reste ici pour référence mais peut ne pas aboutir à une installation fonctionnelle.',
    versionAgnostic:
      'Commande indépendante de la version : la version est recherchée au moment de l’installation.',
    windowsInstaller: 'Installateur Windows',
    latestRelease: 'dernière version',
    macArm: 'macOS - Apple Silicon',
    macIntel: 'macOS - Intel',
    macosInstallersNotReady:
      'Les installateurs macOS ne sont pas encore prêts : nous y travaillons activement.',
    viewReleases: 'Voir toutes les versions sur GitHub',
    sourceText: 'Clonez le dépôt et lancez depuis les sources. Nécessite Node.js 22.15+.',
    viewBuild: 'Voir les instructions de compilation',
  },
};
