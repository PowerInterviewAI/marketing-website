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
  tour: {
    eyebrow: 'Die komplette Tour',
    title: 'Alles in 90 Sekunden',
    description:
      'Probeinterviews, Live-Hilfe, Coding-Runden und der smarte Bericht nach dem Gespräch, auf Englisch gesprochen. Die Personen darin sind fiktiv.',
    play: 'Die 90-Sekunden-Tour abspielen',
  },
  modes: {
    eyebrow: 'Eine App, zwei Modi',
    title: 'Vor dem Gespräch und währenddessen',
    description:
      'Übe mit einem KI-Interviewer, der dich bewertet, und lass im echten Call die Live-Hilfe offen. Nutze eins davon oder beides.',
    shared:
      'Beide Modi lesen denselben Lebenslauf und dieselbe Stellenbeschreibung, und beide sind in jedem Abo unbegrenzt.',
    mock: {
      tag: 'Vorher',
      title: 'Probeinterview',
      body: 'Ein KI-Interviewer stellt seine Fragen laut, hakt bei dünnen Antworten nach und bewertet jede Antwort.',
      points: [
        'Fragen für deine Rolle und dein Level',
        'Bis zu zwei Nachfragen pro Frage',
        'Bewerteter Bericht mit einer stärkeren Antwort zu jeder Frage',
      ],
      link: 'So funktioniert das Probeinterview',
    },
    live: {
      tag: 'Währenddessen',
      title: 'Live-Interview',
      body: 'Live-Transkription und kurze Stichpunkte neben Zoom, Google Meet oder Teams, während das Gespräch läuft.',
      points: [
        'Beide Seiten des Calls transkribiert',
        'Vorschläge auf Basis deines Lebenslaufs',
        'Coding-Hilfe per Screenshot',
      ],
      link: 'So funktioniert die Live-Hilfe',
    },
  },
  live: {
    eyebrow: 'Live-Interview',
    title: 'Stichpunkte, während das Gespräch läuft',
    description:
      'Die App hört beide Seiten des Calls und zeigt daneben kurze, passende Stichpunkte aus deinem Lebenslauf und der Stelle, auf die du dich bewirbst. Kein Bot tritt dem Meeting bei.',
    points: [
      {
        title: 'Beide Stimmen transkribiert',
        body: 'Dein Mikrofon und der Ton des Calls, nach Sprecher beschriftet, während ihr redet.',
      },
      {
        title: 'Vorschläge aus deiner Erfahrung',
        body: 'Jeder stützt sich auf deinen Lebenslauf und die Stellenbeschreibung, nicht auf Floskeln.',
      },
      {
        title: 'Sprache mitten im Call wechseln',
        body: 'Die Vorschläge folgen sofort, in jeder der {count} Sprachen.',
      },
      {
        title: 'Sitzung exportieren',
        body: 'Speichere Zusammenfassung, Transkript und alle Vorschläge als Word oder Markdown.',
      },
    ],
    imageAlt:
      'Power Interview AI in einer Beispielsitzung: vorgeschlagene Stichpunkte über dem Live-Transkript',
    cta: 'Live-Hilfe gratis testen',
    note: 'Nutze die Live-Hilfe nur in Interviews, die KI-Tools erlauben. Beachte immer die Regeln des Arbeitgebers.',
  },
  roles: {
    eyebrow: 'Jeder Job',
    title: 'Deine Rolle. Deine Fragen.',
    description:
      'Füge Lebenslauf und Stellenbeschreibung hinzu. Jede Frage wird für die Position geschrieben, die du willst.',
    controls: {
      previous: 'Vorherige Rolle',
      next: 'Nächste Rolle',
      pause: 'Diashow anhalten',
      play: 'Diashow abspielen',
      slide: '{n} von {total}',
    },
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
  notes: {
    eyebrow: 'Interview-Notizen',
    title: 'Deine Notizen schreiben sich selbst',
    description:
      'Nichts mitschreiben, während du sprichst. Nach dem Gespräch macht die App aus dem Transkript strukturierte Notizen, damit du weißt, was gefragt wurde und was als Nächstes zu tun ist.',
    points: [
      {
        title: 'Eine KI-Zusammenfassung des Gesprächs',
        body: 'Worüber gesprochen wurde, wo du stark warst, woran du arbeiten solltest und die nächsten Schritte.',
      },
      {
        title: 'Das vollständige Transkript',
        body: 'Jede Zeile des Gesprächs, nach Sprecher und Uhrzeit gekennzeichnet.',
      },
      {
        title: 'Jeder Vorschlag bleibt erhalten',
        body: 'Die Gesprächspunkte, die du gesehen hast, neben der Frage, auf die sie antworten.',
      },
      {
        title: 'Word oder Markdown',
        body: 'Wird beim Beenden der Sitzung angeboten, oder jederzeit über die Werkzeugleiste exportieren.',
      },
    ],
    panel: 'Interview-Notizen',
    sample: {
      title: 'Interview Customer Success Manager - Alex Rivera',
      date: 'Datum/Uhrzeit: 12.03.2026, 05:21',
      summaryHeading: 'Zusammenfassung',
      summary:
        'Themen: Rückgewinnung von Kunden, Verlängerungsplanung und Umgang mit Eskalationen. Die Antworten waren konkret und begannen mit dem Ergebnis.',
      strengths: {
        heading: 'Wichtigste Stärken',
        items: ['Klare Beispiele, Ergebnis zuerst', 'Schnelles, persönliches Nachfassen'],
      },
      nextSteps: {
        heading: 'Nächste Schritte',
        items: ['Beispiel für den Rettungsplan senden', 'Kennzahlen zur Verlängerung vorbereiten'],
      },
      transcriptHeading: 'Transkript',
      transcript: [
        {
          speaker: 'Interviewer',
          text: 'Erzählen Sie von einem Mal, als Sie einen unzufriedenen Kunden zurückgewonnen haben.',
        },
        {
          speaker: 'Alex Rivera',
          text: 'Unser größter Kunde war wegen einer verspäteten Lieferung verärgert. Ich habe noch am selben Tag angerufen und einen Rettungsplan vereinbart.',
        },
      ],
    },
    cta: 'Notizen aus deinem nächsten Gespräch',
    note: 'Die Notizen entstehen in einer Live-Sitzung: Nutze sie nur in Interviews, die KI-Tools erlauben, und beachte die Regeln des Arbeitgebers.',
  },
  checker: {
    label: 'Wird meine Sprache unterstützt?',
    placeholder: 'Sprache eingeben, z. B. Tamil oder தமிழ்',
    voice: 'Gesprochen und geschrieben',
    written: 'Schriftliche Fragen',
    none: 'Kein Treffer. Versuche den englischen oder eigenen Namen.',
  },
  showcase: {
    eyebrow: 'Einblick in die App',
    title: 'Jeder Bildschirm hier ist die echte App',
    body: 'Einrichtung, Ihr Profil, das Probeinterview, Live-Vorschläge, der bewertete Bericht und der Export – aufgenommen in der Desktop-App.',
    link: 'Zur Dokumentation',
  },
};
