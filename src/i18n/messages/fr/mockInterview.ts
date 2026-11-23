import type { MockInterview } from '../en/mockInterview';

export const mockInterview: MockInterview = {
  eyebrow: 'Entretien d’entraînement',
  title: 'Répétez l’entretien avant de le passer',
  description:
    'Un entretien d’entraînement oral dans la même application de bureau. Il pose les questions, vous répondez à voix haute, et il vous rend un rapport noté sur ce que vous avez réellement dit.',
  steps: [
    {
      title: 'Choisissez le format',
      body: 'Un niveau de junior à staff, une difficulté et 3, 5, 8 ou 12 questions. Rien d’autre à remplir : l’entretien est construit à partir du CV et de l’offre d’emploi déjà enregistrés sur votre compte, ceux-là mêmes que lit l’assistant en direct.',
    },
    {
      title: 'Le recruteur parle',
      body: 'Questions comportementales, techniques, situationnelles et de clôture, posées à voix haute dans votre langue d’entretien. Une réponse mince entraîne jusqu’à deux relances sur la même question, comme le ferait un vrai recruteur.',
    },
    {
      title: 'Vous répondez à voix haute',
      body: 'Votre micro est transcrit pendant que vous parlez, et vous passez à la suite quand vous êtes prêt. Les suggestions de l’assistant en direct restent désactivées sauf si vous les activez : l’intérêt de l’exercice, c’est que vous réfléchissiez vous-même.',
    },
    {
      title: 'Vous recevez un bilan',
      body: 'Une note globale avec vos points forts et vos lacunes, puis chaque question notée séparément, avec l’explication de la note et une version plus solide de votre réponse.',
    },
  ],
  headphones: {
    badge: 'Casque',
    text: 'Portez-le pour un entretien d’entraînement. Avec des haut-parleurs, la fin d’une question parlée peut se retrouver au début de la réponse que votre micro transcrit.',
  },
  details: {
    scored: {
      title: 'Noté à partir de votre propre matériel',
      body: 'Les questions comme la notation s’appuient sur le profil et le contexte du poste enregistrés sur votre compte, si bien qu’un entraînement répète le poste que vous visez réellement.',
    },
    languages: {
      title: 'Les {count} {noun}',
      body: 'Un seul réglage vaut pour l’assistant en direct comme pour l’entraînement. Le recruteur parle à voix haute dans {voices} d’entre elles ; quand aucune voix n’est disponible, il écrit ses questions, et les relances comme la notation restent les mêmes.',
    },
    pricing: {
      title: 'Illimité avec un abonnement',
      body: 'Un abonnement couvre les entretiens d’entraînement et en direct, sans limite. Pendant l’heure offerte, un entraînement la consomme à la minute, et si elle s’épuise, l’entretien s’arrête là et vous recevez quand même votre rapport.',
    },
    report: {
      title: 'Le rapport vous appartient',
      body: 'Exportez-le en DOCX ou Markdown, dans la langue de votre entretien, et rangez-le à côté des notes de vos vrais appels.',
    },
  },
  cta: 'S’entraîner avant le vrai',
  guide: 'Lire le guide de l’entretien d’entraînement',
  cost: 'Ce que coûte une séance',
};
