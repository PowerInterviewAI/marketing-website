import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: 'Tarifs',
  title: 'Une heure offerte, puis illimité',
  description:
    'Commencez par une heure offerte avec le modèle gratuit. Si vous en voulez plus, abonnez-vous pour des entretiens en direct et d’entraînement illimités avec le modèle SOTA : {monthly} par mois, ou {yearly} par mois en paiement annuel.',
  monthNoun: { one: 'mois', other: 'mois' },
  trialBadge: 'Nouveaux comptes : 1 heure offerte',
  coinsBadge: 'Crypto uniquement : ni carte, ni PayPal, ni coordonnées bancaires',
  prepaidBadge: 'Prépayé : jamais renouvelé automatiquement',

  tier: {
    caption: 'La formule gratuite comparée à un abonnement',
    whatYouGet: 'Ce qui est inclus',
    trial: 'Gratuit',
    paid: 'Abonnement',
    included: 'Inclus',
    duration: {
      label: 'Temps d’entretien',
      trial: '1 heure, une fois',
      paid: 'Illimité',
    },
    model: { label: 'Modèle fourni', trial: 'Modèle gratuit', paid: 'Modèle SOTA' },
    live: 'Suggestions en direct',
    triggered: 'Suggestions à la demande',
    mock: 'Entretiens d’entraînement avec rapport noté',
    rateLimit: { label: 'Limite d’usage', trial: 'Aucune en pratique', paid: 'Aucune en pratique' },
  },

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
    free: 'Tout ce que fait l’application, avec le modèle gratuit, pour votre première heure',
    monthly: 'Entretiens illimités avec le modèle SOTA, un mois à la fois',
    quarterly: 'Entretiens illimités avec le modèle SOTA pendant trois mois',
    yearly: 'Entretiens illimités avec le modèle SOTA pendant une année entière',
  },
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
