import type { Hero } from '../en/hero';

export const hero: Hero = {
  badge: 'Entretien d’entraînement + entretien en direct, 1 heure offerte',
  titleLead: 'Répétez l’entretien, puis',
  titleAccent: 'passez le vrai avec une aide en direct',
  mockLabel: 'Entretien d’entraînement :',
  mockText:
    'un recruteur IA pose ses questions à voix haute, insiste sur les réponses faibles et note chacune d’elles.',
  liveLabel: 'Entretien en direct :',
  liveText:
    'la même application tourne sur votre vrai appel Zoom, Meet ou Teams, invisible au partage d’écran, et vous suggère quoi dire.',
  rolePre: 'Les deux s’appuient sur votre CV et l’offre d’emploi, ils conviennent donc à',
  roleStrong: 'tous les métiers',
  rolePost:
    ' : vente, finance, soins infirmiers, enseignement, ingénierie, pas seulement le logiciel.',
  ctaMock: 'Commencer par un entretien d’entraînement',
  ctaLive: 'Voir les fonctionnalités de l’entretien en direct',
  freeNote:
    'Une heure offerte couvre l’entraînement et l’aide en direct. Paiement en crypto uniquement, sans carte bancaire.',

  trust: {
    platformsLabel: 'Plateformes',
    platforms: 'Windows dès maintenant, macOS bientôt',
    languagesLabel: 'Langues d’entretien',
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
    play: 'Lire la démo',
    pause: 'Mettre la démo en pause',
    previous: 'Démo précédente',
    next: 'Démo suivante',
    clips: 'Extraits de démo',
  },
  demos: [
    {
      title: 'Assistant d’entretien en direct et export intelligent',
      description:
        'Des suggestions instantanées pendant l’appel, puis un export intelligent du résumé et des points clés',
    },
    {
      title: 'Exercice de code - Parcours de graphe',
      description: 'Capturez l’énoncé à l’écran et lisez la solution dans la surcouche furtive',
    },
    {
      title: 'Exercice de code - Composantes connexes',
      description:
        'Plusieurs captures donnent à l’IA l’énoncé complet, les contraintes et la signature',
    },
    {
      title: 'Exercice de code - Récursion sur arbre binaire',
      description:
        'Faites défiler le code au clavier uniquement : invisible au partage d’écran, sans voler le focus',
    },
  ],

  install: {
    eyebrow: 'Installation',
    title: 'Trois façons de démarrer',
    description:
      'Choisissez celle qui correspond à votre façon de travailler. La commande en une ligne télécharge la dernière version et lance l’installateur pour vous.',
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
