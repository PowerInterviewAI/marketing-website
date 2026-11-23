import type { Story } from '../en/story';

export const story: Story = {
  answer: {
    eyebrow: 'Entretien simulé',
    title: 'Écoutez ce qu’est une meilleure réponse',
    description:
      'Répondez à voix haute. Le rapport explique l’effet de votre réponse, puis en rédige une version plus forte à partir de votre expérience.',
    question: 'Parlez-moi d’une échéance difficile.',
    weakLabel: 'Votre premier essai',
    strongLabel: 'Réponse améliorée',
    weak: 'Nous avons eu un délai serré une fois, alors l’équipe a beaucoup travaillé et nous avons fini par y arriver.',
    strong:
      'Quand un client a avancé le lancement de deux semaines, j’ai réduit le périmètre à trois fonctions clés, réaffecté deux personnes et nous avons livré à la nouvelle date.',
    scoreLabel: 'Note de la réponse',
    replay: 'Rejouer',
    points: ['Note par question', 'Relances sur les réponses légères', 'Export DOCX ou Markdown'],
  },
  roles: {
    eyebrow: 'Tous les métiers',
    title: 'Votre poste. Vos questions.',
    description: 'Ajoutez votre CV et l’offre. Chaque question est écrite pour le poste visé.',
    sample: 'Exemple de question',
    items: {
      developer: {
        label: 'Développement',
        question: 'Comment concevriez-vous un limiteur de débit pour une API publique ?',
      },
      sales: {
        label: 'Vente',
        question:
          'Comment relancez-vous une affaire devenue silencieuse avant la fin du trimestre ?',
      },
      nurse: {
        label: 'Soins infirmiers',
        question: 'Comment établissez-vous vos priorités quand deux patients ont besoin de vous ?',
      },
      teacher: {
        label: 'Enseignement',
        question: 'Comment aidez-vous un élève qui a pris du retard ?',
      },
      finance: {
        label: 'Finance',
        question: 'Parlez-moi d’une prévision erronée et de ce que vous avez changé.',
      },
    },
  },
  coding: {
    eyebrow: 'Pour les développeurs',
    title: 'Préparez le test de code en direct',
    description:
      'Transformez un problème de code en solution guidée, puis entraînez-vous à l’expliquer comme un recruteur l’attend.',
    steps: [
      {
        title: 'Capturez le problème',
        body: 'Ajoutez jusqu’à quatre captures de l’énoncé, des contraintes et des exemples.',
      },
      {
        title: 'Voyez l’approche',
        body: 'Recevez une solution suggérée avec coloration syntaxique.',
      },
      {
        title: 'Expliquez-la vous-même',
        body: 'Parcourez la logique, les cas limites et la complexité jusqu’à les maîtriser.',
      },
    ],
    panel: 'Suggestion de code',
    approachLabel: 'Approche',
    approach: 'Trier par début, puis fusionner chaque intervalle qui chevauche le dernier.',
    complexityLabel: 'Complexité',
    note: 'À utiliser pour s’entraîner et lors d’entretiens autorisant les outils d’IA. Respectez toujours les règles de l’employeur.',
    cta: 'S’entraîner au code',
  },
  checker: {
    label: 'Ma langue est-elle disponible ?',
    placeholder: 'Saisissez une langue, comme tamoul ou தமிழ்',
    voice: 'Parlée et écrite',
    written: 'Questions écrites',
    none: 'Aucun résultat. Essayez le nom anglais ou natif.',
  },
};
