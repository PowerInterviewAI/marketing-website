import type { Features } from '../en/features';

export const features: Features = {
  eyebrow: 'Funktionen',
  title: 'Alles, was die Probe braucht, und alles, was das Gespräch nicht sieht',
  description:
    'Jede Funktion, gekennzeichnet mit dem Teil der App, zu dem sie gehört: das Probeinterview, in dem du übst, das Live-Interview, das du danach führst, oder beides. Sie arbeitet mit deinem eigenen Lebenslauf und der Stellenbeschreibung, die Rolle kann also alles sein - die Programmierhilfe ist eine von neun Funktionen, nicht der Zweck der App.',
  scope: { mock: 'Probeinterview', live: 'Live-Interview', both: 'Beides' },
  cta: 'Kostenlos herunterladen',
  mock: {
    title: 'Probeinterview',
    description:
      'Ein KI-Interviewer, der **seine Fragen ausspricht**, bei einer dünnen Antwort nachhakt und jede deiner Antworten anhand deines Lebenslaufs und der Stellenbeschreibung bewertet. Verhaltens-, Fach-, Situations- und Abschlussfragen, geschrieben für die Rolle, die du eingefügt hast - eine Stelle in der Pflege oder im Vertrieb genauso wie in der Technik. Exportiere den Bericht als DOCX oder Markdown.',
    link: 'So funktionieren Probeinterviews',
  },
  transcription: {
    title: 'Live-Transkription',
    description:
      'Zweikanal-Transkription mit automatischer Sprechererkennung und vollständigem Gesprächsverlauf. Wechsle dein Mikrofon **mitten im Interview**, ohne die Sitzung zu stoppen - keine Lücke im Transkript, nichts neu zu starten.',
  },
  stealth: {
    title: 'Tarnmodus',
    description:
      'Arbeite diskret mit Tastenkürzeln, Deckkraftsteuerung und cleverer Fensterplatzierung. Das Fenster ist **auf Screenshots nicht sichtbar** und bleibt auch bei Vollbildfreigabe unsichtbar.',
  },
  languages: {
    title: '{count} {noun}',
    description:
      'Eine Einstellung steuert alle drei: welches Sprachmodell das Gespräch transkribiert, in welcher Sprache deine Vorschläge kommen und die Sprache deines exportierten Berichts. Wechsle sie **mitten im Interview**, nicht nur vor dem Start. Volle Rechts-nach-links-Unterstützung für Arabisch, Hebräisch, Persisch, Urdu und weitere Schriften, und **{voices}** davon spricht der Probeinterviewer laut aus.',
    link: 'Alle {count} Sprachen ansehen',
  },
  suggestions: {
    title: 'KI-Antwortvorschläge',
    description:
      'Persönliche, kontextbezogene Antworten auf Basis deines Lebenslaufs, der Stellenbeschreibung und des **gesamten Gesprächsverlaufs**. Die Vorschläge passen sich deinem Kommunikationsstil an, damit du deine eigene Erfahrung schilderst statt allgemeiner Ratschläge. Schalte den **Profimodus** ein für Hinweise auf einen Blick - eine Überschrift plus Stichpunkte - statt ganzer Sätze.',
  },
  code: {
    title: 'Code-Vorschläge',
    description:
      'Für Interviews mit technischer Runde: Screenshot-Analyse mit LLM-gestützten Lösungen für Programmieraufgaben, samt Syntaxhervorhebung. **Optional** - der Rest des Live-Assistenten funktioniert in einem Interview, in dem nie Code vorkommt, genauso.',
  },
  export: {
    title: 'KI-Protokollexport',
    description:
      '**Intelligenter Gesprächsexport** für Interviews, Probeinterviews und Videocalls. KI-Zusammenfassungen, Aufgaben, Transkripte mit Sprecherkennzeichnung und Notizen für die Nachbereitung. Export als **DOCX**, zum einfachen Teilen mit Einzelpersonen und Teams.',
  },
  plans: {
    title: 'Jeder Tarif, jede Funktion',
    description:
      'Keine Funktion steckt hinter einer Bezahlschranke. Die Gratisstunde nutzt die ganze App mit dem **Gratis-Modell** - Live-Vorschläge, Vorschläge auf Abruf und Probeinterviews. Ein Abonnement bringt dich zum **SOTA-Modell** mit unbegrenzter Interviewzeit.',
  },
  privacy: {
    title: 'Datenschutz zuerst',
    description:
      'Transkripte werden nach deiner Sitzung nie aufbewahrt - weder aus einem Probeinterview noch aus einem echten Gespräch. Kein Data-Mining und volle Kontrolle über deine Daten.',
  },
};
