import type { Features } from '../en/features';

export const features: Features = {
  eyebrow: 'Fonctionnalités',
  title: 'Tout ce dont la répétition a besoin, et tout ce que l’appel ne peut pas voir',
  description:
    'Chaque fonctionnalité, marquée selon la partie de l’application à laquelle elle appartient : l’entretien d’entraînement où vous répétez, l’entretien en direct que vous passez ensuite, ou les deux. Tout s’appuie sur votre propre CV et l’offre d’emploi, le métier peut donc être n’importe lequel : l’aide au code est une fonctionnalité parmi neuf, pas la raison d’être de l’application.',
  scope: { mock: 'Entretien d’entraînement', live: 'Entretien en direct', both: 'Les deux' },
  cta: 'Télécharger gratuitement',
  mock: {
    title: 'Entretien d’entraînement',
    description:
      'Un recruteur IA qui **pose ses questions à voix haute**, insiste face à une réponse mince et note chacune de vos réponses au regard de votre CV et de l’offre d’emploi. Questions comportementales, techniques, situationnelles et de clôture, rédigées pour le poste que vous avez collé : un poste d’infirmier ou de commercial aussi bien qu’un poste d’ingénieur. Exportez le rapport en DOCX ou Markdown.',
    link: 'Comment fonctionnent les entretiens d’entraînement',
  },
  transcription: {
    title: 'Transcription en direct',
    description:
      'Transcription sur deux canaux avec détection automatique de l’interlocuteur et historique complet de la conversation. Changez de micro **en plein entretien** sans arrêter la séance : aucun trou dans la transcription, rien à relancer.',
  },
  stealth: {
    title: 'Mode furtif',
    description:
      'Travaillez discrètement grâce aux raccourcis clavier, au réglage de l’opacité et au placement intelligent de la fenêtre. La fenêtre **n’apparaît pas sur les captures d’écran** et reste invisible lors d’un partage d’écran complet.',
  },
  languages: {
    title: '{count} {noun}',
    description:
      'Un seul réglage pilote les trois : le modèle vocal qui transcrit l’appel, la langue de vos suggestions et celle de votre rapport exporté. Changez-le **en plein entretien**, pas seulement avant de commencer. Prise en charge complète de l’écriture de droite à gauche pour l’arabe, l’hébreu, le persan, l’ourdou et d’autres, et le recruteur d’entraînement parle à voix haute dans **{voices}** d’entre elles.',
    link: 'Voir les {count} langues',
  },
  suggestions: {
    title: 'Suggestions de réponse par IA',
    description:
      'Des réponses personnalisées et contextuelles fondées sur votre CV, l’offre d’emploi et **tout l’historique de la conversation**. Les suggestions s’adaptent à votre style de communication pour que vous parliez de votre propre expérience plutôt que de lire des conseils génériques. Activez le **mode professionnel** pour des indices lisibles d’un coup d’œil (un titre et des mots-clés) au lieu de phrases complètes.',
  },
  code: {
    title: 'Suggestions de code',
    description:
      'Pour les entretiens avec une épreuve technique : analyse de captures d’écran et solutions générées par LLM pour les exercices de code, avec coloration syntaxique. **Facultatif** : le reste de l’assistant en direct fonctionne exactement pareil lors d’un entretien sans aucune ligne de code.',
  },
  export: {
    title: 'Export de notes par IA',
    description:
      '**Export intelligent de réunion** pour les entretiens, les entretiens d’entraînement et les visioconférences. Résumés générés par IA, actions à mener, transcriptions avec interlocuteurs identifiés et notes de suivi. Export en **DOCX** pour un partage facile avec des personnes comme avec des équipes.',
  },
  plans: {
    title: 'Toutes les formules, toutes les fonctionnalités',
    description:
      'Aucune fonctionnalité n’est réservée aux abonnés. L’heure offerte fait tourner toute l’application avec le **modèle gratuit** : suggestions en direct, suggestions à la demande et entretiens d’entraînement. Un abonnement vous fait passer au **modèle SOTA** avec un temps d’entretien illimité.',
  },
  privacy: {
    title: 'La confidentialité d’abord',
    description:
      'Les transcriptions ne sont jamais conservées après votre séance, qu’il s’agisse d’un entraînement ou d’un vrai appel. Aucune exploitation de données, et un contrôle total sur vos informations.',
  },
};
