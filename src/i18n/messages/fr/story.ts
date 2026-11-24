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
  modes: {
    eyebrow: 'Une app, deux modes',
    title: 'Avant l’entretien, et pendant',
    description:
      'Entraînez-vous face à un recruteur IA qui vous note, puis gardez l’aide en direct ouverte pendant le vrai appel. L’un, l’autre ou les deux.',
    sample: 'Exemple',
    shared:
      'Les deux modes lisent le même CV et la même offre, et les deux sont illimités avec tout abonnement.',
    mock: {
      tag: 'Avant',
      title: 'Entretien simulé',
      body: 'Un recruteur IA pose ses questions à voix haute, relance sur les réponses trop minces et note chaque réponse.',
      points: [
        'Des questions écrites pour votre poste et votre niveau',
        'Jusqu’à deux relances par question',
        'Un rapport noté avec une meilleure réponse pour chacune',
      ],
      link: 'Comment fonctionne l’entretien simulé',
    },
    live: {
      tag: 'Pendant',
      title: 'Entretien en direct',
      body: 'Transcription en direct et points clés courts à côté de Zoom, Google Meet ou Teams pendant l’appel.',
      points: [
        'Les deux côtés de l’appel transcrits',
        'Des suggestions tirées de votre CV',
        'Aide au code à partir d’une capture',
      ],
      link: 'Comment fonctionne l’aide en direct',
    },
  },
  live: {
    eyebrow: 'Entretien en direct',
    title: 'Des points clés pendant l’appel',
    description:
      'L’app écoute les deux côtés de l’appel et affiche à côté des points courts et pertinents, tirés de votre CV et du poste visé. Aucun bot ne rejoint la réunion.',
    points: [
      {
        title: 'Les deux voix transcrites',
        body: 'Votre micro et le son de l’appel, identifiés par interlocuteur au fil de la conversation.',
      },
      {
        title: 'Des suggestions tirées de votre parcours',
        body: 'Chacune s’appuie sur votre CV et l’offre, pas sur des conseils génériques.',
      },
      {
        title: 'Changez de langue en plein appel',
        body: 'Les suggestions suivent aussitôt, dans n’importe laquelle des {count} langues.',
      },
      {
        title: 'Exportez la session',
        body: 'Enregistrez un résumé, la transcription et chaque suggestion en Word ou Markdown.',
      },
    ],
    imageAlt:
      'Power Interview AI pendant une session d’exemple : points clés suggérés au-dessus de la transcription en direct',
    caption: 'Session d’exemple enregistrée dans la vraie app avec des données préparées.',
    cta: 'Essayer l’aide en direct gratuitement',
    note: 'N’utilisez l’aide en direct que lors d’entretiens autorisant les outils d’IA. Respectez toujours les règles de l’employeur.',
  },
  roles: {
    eyebrow: 'Tous les métiers',
    title: 'Votre poste. Vos questions.',
    description: 'Ajoutez votre CV et l’offre. Chaque question est écrite pour le poste visé.',
    sample: 'Exemple de question',
    controls: {
      previous: 'Métier précédent',
      next: 'Métier suivant',
      pause: 'Mettre le diaporama en pause',
      play: 'Lancer le diaporama',
      slide: '{n} sur {total}',
    },
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
  showcase: {
    eyebrow: 'Dans l’application',
    title: 'Chaque écran ici est la vraie application',
    body: 'La configuration, votre profil, l’entretien d’entraînement, les suggestions en direct, le rapport noté et l’export, capturés dans l’application de bureau avec des données d’exemple.',
    link: 'Consulter la documentation',
    sample: 'Vrais écrans, données d’exemple',
  },
};
