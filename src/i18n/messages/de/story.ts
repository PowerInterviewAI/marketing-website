import type { Story } from '../en/story';

export const story: Story = {
  answer: {
    eyebrow: 'Probeinterview',
    title: 'Hör, wie eine stärkere Antwort klingt',
    description:
      'Antworte laut. Der Bericht zeigt, warum deine Antwort so ankam, und formuliert aus deiner eigenen Erfahrung eine stärkere Version.',
    question: 'Erzählen Sie von einer schwierigen Deadline.',
    weakLabel: 'Dein erster Versuch',
    strongLabel: 'Verbesserte Antwort',
    weak: 'Wir hatten mal eine knappe Deadline, also hat das Team viel gearbeitet und am Ende hat es geklappt.',
    strong:
      'Als ein Kunde unseren Launch um zwei Wochen vorzog, reduzierte ich den Umfang auf drei nötige Funktionen, plante zwei Personen um, und wir lieferten pünktlich.',
    scoreLabel: 'Antwortbewertung',
    replay: 'Wiederholen',
    points: [
      'Bewertung pro Frage',
      'Nachfragen bei dünnen Antworten',
      'Export als DOCX oder Markdown',
    ],
  },
  roles: {
    eyebrow: 'Jeder Job',
    title: 'Deine Rolle. Deine Fragen.',
    description:
      'Füge Lebenslauf und Stellenbeschreibung hinzu. Jede Frage wird für die Position geschrieben, die du willst.',
    sample: 'Beispielfrage',
    items: {
      developer: {
        label: 'Entwicklung',
        question: 'Wie würden Sie einen Rate Limiter für eine öffentliche API entwerfen?',
      },
      sales: {
        label: 'Vertrieb',
        question: 'Wie retten Sie einen Deal, der kurz vor Quartalsende still geworden ist?',
      },
      nurse: {
        label: 'Pflege',
        question: 'Wie priorisieren Sie, wenn zwei Patienten Sie gleichzeitig brauchen?',
      },
      teacher: {
        label: 'Lehramt',
        question: 'Wie unterstützen Sie Lernende, die den Anschluss verloren haben?',
      },
      finance: {
        label: 'Finanzen',
        question: 'Erzählen Sie von einer falschen Prognose und was Sie geändert haben.',
      },
    },
  },
  coding: {
    eyebrow: 'Für Entwickler',
    title: 'Bereit für die Live-Coding-Runde',
    description:
      'Mach aus jeder Coding-Aufgabe eine geführte Lösung und übe, sie so zu erklären, wie Interviewer es erwarten.',
    steps: [
      {
        title: 'Aufgabe erfassen',
        body: 'Füge bis zu vier Screenshots von Aufgabe, Vorgaben und Beispielen hinzu.',
      },
      {
        title: 'Ansatz sehen',
        body: 'Erhalte einen Lösungsvorschlag mit Syntaxhervorhebung.',
      },
      {
        title: 'Selbst erklären',
        body: 'Sprich Logik, Sonderfälle und Komplexität durch, bis du sie beherrschst.',
      },
    ],
    panel: 'Code-Vorschlag',
    approachLabel: 'Ansatz',
    approach:
      'Nach Start sortieren, dann jedes überlappende Intervall mit dem letzten zusammenführen.',
    complexityLabel: 'Komplexität',
    note: 'Nutze es zum Üben und in Interviews, die KI-Tools erlauben. Beachte immer die Regeln des Arbeitgebers.',
    cta: 'Coding-Interviews üben',
  },
  checker: {
    label: 'Wird meine Sprache unterstützt?',
    placeholder: 'Sprache eingeben, z. B. Tamil oder தமிழ்',
    voice: 'Gesprochen und geschrieben',
    written: 'Schriftliche Fragen',
    none: 'Kein Treffer. Versuche den englischen oder eigenen Namen.',
  },
};
