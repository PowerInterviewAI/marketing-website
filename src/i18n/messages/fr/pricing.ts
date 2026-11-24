import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: 'Tarifs',
  title: 'Une heure offerte, puis illimité',
  description:
    'Commencez par une heure offerte avec le modèle gratuit. Si vous en voulez plus, abonnez-vous pour des entretiens en direct et d’entraînement illimités avec le modèle SOTA : {monthly} par mois, ou {yearly} par mois en paiement annuel.',
  monthNoun: { one: 'mois', other: 'mois' },
  coinsBadge: 'Crypto uniquement : ni carte, ni PayPal, ni coordonnées bancaires',

  billing: {
    title: 'Comment fonctionne la facturation',
    free: 'L’heure offerte',
    freeText:
      'Les séances en direct et d’entraînement la consomment à la minute. Quand elle est épuisée, la séance s’arrête, et un entretien d’entraînement vous donne tout de même son rapport.',
    paid: 'Un abonnement',
    paidText:
      'Payez une fois en crypto pour un mois, un trimestre ou un an. Rien ne se renouvelle automatiquement : achetez un autre pass quand vous voulez, et sa durée s’ajoute après votre date de fin actuelle.',
  },

  plans: {
    free: 'Essayez toutes les fonctions',
    monthly: 'Pour un entretien à venir',
    quarterly: 'Pour une recherche active',
    yearly: 'Pour une recherche plus longue',
  },
  included: { every: 'Inclus dans toutes les offres', paid: 'Avec toute offre payante' },
  popular: 'Recommandé',
  save: 'Économisez {percent} %',
  planNames: { free: 'Gratuit', monthly: 'Mensuel', quarterly: 'Trimestriel', yearly: 'Annuel' },
  perMonth: '/ mois',
  freeLine: '1 heure d’entretiens, une fois',
  billedAs: '{price} payés une fois pour {months} {monthNoun}',
  features: {
    suggestions: 'Suggestions en direct et à la demande',
    mock: 'Entretiens d’entraînement avec rapport noté',
    freeModel: 'Modèle gratuit',
    sotaModel: 'Modèle SOTA, sans limite d’usage en pratique',
    oneHour: 'Une heure de temps d’entretien',
    unlimited: 'Temps d’entretien illimité',
    noRenewal: 'Aucun renouvellement automatique',
  },
  getStarted: 'Commencer',
  startFree: 'Commencer gratuitement',
};
