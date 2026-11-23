import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: 'Preise',
  title: 'Eine Stunde gratis, danach unbegrenzt',
  description:
    'Starte mit einer Gratisstunde mit dem Gratis-Modell. Wenn du mehr willst, abonniere unbegrenzte Live- und Probeinterviews mit dem SOTA-Modell - {monthly} im Monat oder {yearly} im Monat bei jährlicher Zahlung.',
  monthNoun: { one: 'Monat', other: 'Monate' },
  trialBadge: 'Neue Konten: 1 Stunde gratis',
  coinsBadge: 'Nur Krypto - keine Karte, kein PayPal, keine Bankdaten',
  prepaidBadge: 'Im Voraus bezahlt - verlängert sich nie von selbst',

  tier: {
    caption: 'Der Gratis-Tarif im Vergleich zum Abonnement',
    whatYouGet: 'Was du bekommst',
    trial: 'Gratis',
    paid: 'Abonnement',
    included: 'Enthalten',
    duration: {
      label: 'Interviewzeit',
      trial: '1 Stunde, einmalig',
      paid: 'Unbegrenzt',
    },
    model: { label: 'Verwendetes Modell', trial: 'Gratis-Modell', paid: 'SOTA-Modell' },
    live: 'Live-Vorschläge',
    triggered: 'Vorschläge auf Abruf',
    mock: 'Probeinterviews mit bewertetem Bericht',
    rateLimit: { label: 'Ratenlimit', trial: 'Praktisch keins', paid: 'Praktisch keins' },
  },

  billing: {
    title: 'So funktioniert die Abrechnung',
    free: 'Die Gratisstunde',
    freeText:
      'Live- und Probeinterviews verbrauchen sie minutenweise. Wenn sie aufgebraucht ist, endet die Sitzung, und ein Probeinterview liefert trotzdem seinen Bericht.',
    paid: 'Ein Abonnement',
    paidText:
      'Zahl einmal in Krypto für einen Monat, ein Quartal oder ein Jahr. Nichts verlängert sich automatisch: Kauf einen weiteren Pass, wann du willst, und seine Laufzeit wird an dein aktuelles Enddatum angehängt.',
  },

  plans: {
    free: 'Alles, was die App kann, mit dem Gratis-Modell, für deine erste Stunde',
    monthly: 'Unbegrenzte Interviews mit dem SOTA-Modell, jeweils für einen Monat',
    quarterly: 'Unbegrenzte Interviews mit dem SOTA-Modell für drei Monate',
    yearly: 'Unbegrenzte Interviews mit dem SOTA-Modell für ein ganzes Jahr',
  },
  popular: 'Am beliebtesten',
  save: '{percent} % sparen',
  planNames: {
    free: 'Gratis',
    monthly: 'Monatlich',
    quarterly: 'Vierteljährlich',
    yearly: 'Jährlich',
  },
  perMonth: '/ Monat',
  freeLine: '1 Stunde Interviews, einmalig',
  billedAs: '{price} einmalig für {months} {monthNoun}',
  features: {
    suggestions: 'Live-Vorschläge und Vorschläge auf Abruf',
    mock: 'Probeinterviews mit bewertetem Bericht',
    freeModel: 'Gratis-Modell',
    sotaModel: 'SOTA-Modell, praktisch ohne Ratenlimit',
    oneHour: 'Eine Stunde Interviewzeit',
    unlimited: 'Unbegrenzte Interviewzeit',
    noRenewal: 'Keine automatische Verlängerung',
  },
  getStarted: 'Loslegen',
  startFree: 'Gratis starten',
};
