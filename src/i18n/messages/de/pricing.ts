import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: 'Preise',
  title: 'Eine Stunde gratis, danach unbegrenzt',
  description:
    'Starte mit einer Gratisstunde mit dem Gratis-Modell. Wenn du mehr willst, abonniere unbegrenzte Live- und Probeinterviews mit dem SOTA-Modell - {monthly} im Monat oder {yearly} im Monat bei jährlicher Zahlung.',
  monthNoun: { one: 'Monat', other: 'Monate' },
  coinsBadge: 'Nur Krypto - keine Karte, kein PayPal, keine Bankdaten',

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
    free: 'Alle Funktionen testen',
    monthly: 'Für ein anstehendes Interview',
    quarterly: 'Für eine aktive Jobsuche',
    yearly: 'Für eine längere Jobsuche',
  },
  included: { every: 'In jedem Plan enthalten', paid: 'Mit jedem bezahlten Plan' },
  popular: 'Empfohlen',
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
