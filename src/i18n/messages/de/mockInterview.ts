import type { MockInterview } from '../en/mockInterview';

export const mockInterview: MockInterview = {
  eyebrow: 'Probeinterview',
  title: 'Probe das Interview, bevor du es führst',
  description:
    'Ein gesprochenes Probeinterview in derselben Desktop-App. Es fragt, du antwortest laut, und du bekommst einen bewerteten Bericht über das, was du tatsächlich gesagt hast.',
  steps: [
    {
      title: 'Den Rahmen wählen',
      body: 'Erfahrungsstufe von Junior bis Staff, Schwierigkeit und 3, 5, 8 oder 12 Fragen. Sonst nichts auszufüllen: Das Interview entsteht aus dem Lebenslauf und der Stellenbeschreibung in deinem Konto - denselben, die auch der Live-Assistent liest.',
    },
    {
      title: 'Der Interviewer spricht',
      body: 'Verhaltens-, Fach-, Situations- und Abschlussfragen, laut gestellt in deiner Interviewsprache. Eine dünne Antwort zieht bis zu zwei Nachfragen zur selben Frage nach sich, so wie ein echter Interviewer nachhakt.',
    },
    {
      title: 'Du antwortest laut',
      body: 'Dein Mikrofon wird beim Sprechen transkribiert, und du gehst weiter, wenn du bereit bist. Vorschläge des Live-Assistenten bleiben aus, außer du schaltest sie ein: Der Sinn der Stunde ist, dass du selbst denkst.',
    },
    {
      title: 'Du bekommst eine Auswertung',
      body: 'Eine Gesamtbewertung mit Stärken und Lücken, dann jede Frage einzeln bewertet, mit Begründung und einer stärkeren Version deiner Antwort.',
    },
  ],
  headphones: {
    badge: 'Kopfhörer',
    text: 'Trag sie im Probeinterview. Über Lautsprecher kann das Ende einer gesprochenen Frage am Anfang der Antwort landen, die dein Mikrofon transkribiert.',
  },
  details: {
    scored: {
      title: 'Bewertet an deinem eigenen Material',
      body: 'Fragen und Bewertung nutzen beide das Profil und den Stellenkontext in deinem Konto, sodass ein Probeinterview genau die Rolle probt, für die du dich bewirbst.',
    },
    languages: {
      title: 'Alle {count} {noun}',
      body: 'Eine Einstellung gilt für den Live-Assistenten und das Probeinterview gleichermaßen. {voices} davon spricht der Interviewer laut aus; wo keine Stimme verfügbar ist, schreibt er seine Fragen, und Nachfragen und Bewertung bleiben gleich.',
    },
    pricing: {
      title: 'Unbegrenzt mit Abonnement',
      body: 'Ein Abonnement deckt Probe- und Live-Interviews gleichermaßen ab, ohne Limit. In der Gratisstunde verbraucht ein Probeinterview die Zeit minutenweise, und wenn sie endet, endet das Interview dort und du bekommst trotzdem deinen Bericht.',
    },
    report: {
      title: 'Der Bericht gehört dir',
      body: 'Exportiere ihn als DOCX oder Markdown, in der Sprache deines Interviews, und leg ihn neben die Notizen aus deinen echten Gesprächen.',
    },
  },
  cta: 'Vor dem echten Interview üben',
  guide: 'Anleitung zum Probeinterview lesen',
  cost: 'Was eine Sitzung kostet',
};
