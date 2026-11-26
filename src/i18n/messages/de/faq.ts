import type { Faq } from '../en/faq';

export const faq: Faq = {
  eyebrow: 'FAQ',
  seeAll: 'Alle Fragen ansehen',
  title: 'Häufig gestellte Fragen',
  description: 'Alles Wichtige vor der Installation.',
  categories: {
    gettingStarted: 'Erste Schritte',
    product: 'Produkt',
    privacy: 'Datenschutz & Daten',
    billing: 'Tarife & Abrechnung',
  },
  stillQuestions: 'Noch Fragen?',
  contact: 'Kontakt aufnehmen',
  items: [
    {
      question: 'Ist die Nutzung von Power Interview AI legal?',
      category: 'gettingStarted',
      answer:
        'Power Interview AI ist für legitime Lern- und Vorbereitungszwecke rund ums Vorstellungsgespräch gedacht. Du bist jedoch selbst dafür verantwortlich, dass deine Nutzung mit geltendem Recht und den Nutzungsbedingungen der verwendeten Plattformen vereinbar ist. Nutze die App immer ethisch und legal.',
    },
    {
      question: 'Kann ich mit einem Probeinterview üben?',
      category: 'product',
      answer:
        'Ja, und es läuft direkt in der App, statt dich zu einem anderen Tool zu schicken. Wähl eine Erfahrungsstufe, eine Schwierigkeit und eine Länge von 3, 5, 8 oder 12 Fragen, und ein KI-Interviewer spricht seine Fragen laut in deiner Interviewsprache, hakt mit bis zu zwei Nachfragen nach, wenn eine Antwort etwas offenlässt, und hört zu, während du in dein Mikrofon antwortest. Fragen und Bewertung nutzen den Lebenslauf und die Stellenbeschreibung in deinem Konto. Am Ende bekommst du eine Gesamtbewertung mit Stärken und Lücken sowie jede Frage einzeln bewertet, mit Begründung und einer stärkeren Version deiner Antwort, exportierbar als DOCX oder Markdown.',
    },
    {
      question: 'Wie funktioniert der Datenschutz?',
      category: 'privacy',
      answer:
        'Deine Interviewkonfiguration - vollständiger Name, Profil/Lebenslauf und Kontext - wird in deinem Konto gespeichert, damit sie dich auf alle Geräte begleitet. Transkripte und Screenshots werden an unsere KI-Dienste gesendet, wenn du einen Vorschlag anforderst, und Transkripte werden nie auf unseren Servern gespeichert: Sie existieren nur für die Dauer deiner Sitzung. Dein Sitzungstoken und deine Geräteeinstellungen bleiben auf deinem Rechner. Wir verkaufen oder teilen deine persönlichen Daten niemals.',
    },
    {
      question: 'Welches KI-Modell steckt hinter den Vorschlägen?',
      category: 'product',
      answer:
        'Das Modell wird für dich bereitgestellt - nichts zu verbinden oder einzurichten. Neue Konten nutzen in ihrer Gratisstunde unser Gratis-Modell, und ein Abonnement bringt dich zu unserem SOTA-Modell, praktisch ohne Ratenlimit.',
    },
    {
      question: 'Welche Plattformen werden unterstützt?',
      category: 'gettingStarted',
      answer:
        'Power Interview AI läuft unter Windows 10/11 und macOS 13 oder neuer, auf Macs mit Apple Silicon und mit Intel.',
    },
    {
      question: 'In welchen Sprachen kann ich Interviews führen?',
      category: 'product',
      answer:
        'In 97 - von Englisch, Spanisch, Chinesisch und Hindi bis zu Kantonesisch, Swahili, Persisch und Tamil. Die vollständige Liste steht im Abschnitt Sprachen auf der Startseite, und die Sprachauswahl in der App hat ein Suchfeld. In 44 davon spricht der Probeinterviewer laut, in den übrigen schreibt er seine Fragen. Eine Einstellung entscheidet, welches Sprachmodell das Gespräch transkribiert, in welcher Sprache deine Vorschläge kommen und in welcher Sprache dein Bericht exportiert wird. Du kannst sie mitten im Interview ändern - die Transkription verbindet sich in der neuen Sprache neu, die Vorschläge folgen sofort. Arabisch, Hebräisch, Persisch, Urdu und die anderen Rechts-nach-links-Schriften werden durchgehend von rechts nach links dargestellt.',
    },
    {
      question: 'Brauche ich spezielle Hardware für Power Interview AI?',
      category: 'gettingStarted',
      answer:
        'Power Interview AI läuft auf den meisten modernen Windows- und Mac-Computern ohne besondere Hardware. Eine stabile Internetverbindung verbessert die Streaming-Qualität.',
    },
    {
      question: 'Wie genau ist die KI-Transkription?',
      category: 'product',
      answer:
        'Unsere Echtzeit-Transkription nutzt fortschrittliche Spracherkennung (ASR) mit Zweikanal-Unterstützung und Sprechererkennung. Die Genauigkeit hängt von der Audioqualität ab, ist in typischen Interviewsituationen mit klarem Ton aber ausgezeichnet.',
    },
    {
      question: 'Kann ich das für Programmierinterviews nutzen?',
      category: 'product',
      answer:
        'Ja. Erfasse bis zu vier Screenshots einer Coding-Aufgabe und erhalte einen Lösungsansatz mit hervorgehobenem Code. Nutze es, um das Erklären von Lösungen zu üben, und in Interviews, die KI-Tools erlauben.',
    },
    {
      question: 'Kann ich es in einem echten Interview nutzen?',
      category: 'privacy',
      answer:
        'Die Live-Hilfe kann neben Zoom, Google Meet oder Teams laufen, aber manche Arbeitgeber und Testplattformen erlauben keine KI-Unterstützung. Prüfe die Regeln jedes Interviews und nutze sie nur, wo sie zulässig ist. Das App-Fenster ist standardmäßig von Bildschirmaufnahmen ausgeschlossen, um die angezeigten persönlichen Daten zu schützen.',
    },
    {
      question: 'Was kostet ein Probeinterview?',
      category: 'billing',
      answer:
        'Nichts zusätzlich zu deinem Tarif. Mit einem Abonnement sind Probeinterviews unbegrenzt. In der Gratisstunde verbraucht ein Probeinterview die Zeit minutenweise, wie der Live-Assistent: Eine Sitzung mit 5 Fragen dauert meist etwa 13 Minuten, eine mit 8 Fragen etwa 20, die Stunde reicht also für ein paar vollständige Sitzungen. Läuft deine Gratiszeit mitten im Interview ab, endet es dort, und du bekommst trotzdem deinen Bericht.',
    },
    {
      question: 'Wie funktioniert das Abonnement?',
      category: 'billing',
      answer:
        'Jedes Konto startet mit einer Gratisstunde mit dem Gratis-Modell. Danach bekommst du mit einem Abonnement unbegrenzte Live- und Probeinterviews mit dem SOTA-Modell: $25 für einen Monat, $60 für ein Quartal ($20 im Monat) oder $180 für ein Jahr ($15 im Monat). Es ist ein vorausbezahlter Pass, keine wiederkehrende Abbuchung - nichts verlängert sich von selbst, und wenn du einen weiteren Pass kaufst, während einer läuft, wird seine Laufzeit an das aktuelle Enddatum angehängt.',
    },
    {
      question: 'Welche Zahlungsmethoden akzeptiert ihr?',
      category: 'billing',
      answer:
        'Wir akzeptieren ausschließlich Kryptowährungen. Keine Kreditkarte, kein PayPal und keine klassische Banküberweisung nötig. Das sorgt für maximale Privatsphäre und Sicherheit deiner Transaktionen. Kauf einfach Coins und bezahle damit in der App einen Monats-, Quartals- oder Jahrespass.',
    },
    {
      question: 'Gibt es eine kostenlose Testphase?',
      category: 'billing',
      answer:
        'Ja! Neue Nutzer:innen bekommen eine volle Gratisstunde mit unserem Gratis-Modell - praktisch ohne Ratenlimit und ohne Unterbrechungen. Sie enthält alle Funktionen: Live-Vorschläge, Vorschläge auf Abruf und Probeinterviews. Ein Abonnement bringt dich zum SOTA-Modell mit unbegrenzter Interviewzeit.',
    },
    {
      question: 'Kann ich mein Konto auf mehreren Computern nutzen?',
      category: 'billing',
      answer:
        'Ja. Dein Profil begleitet dich auf jeden Computer, an dem du dich anmeldest. Ein Konto führt aber immer nur ein Interview gleichzeitig: Startest du ein Interview auf einem zweiten Computer, endet das auf dem ersten.',
    },
    {
      question: 'Kann ich eine Erstattung bekommen?',
      category: 'billing',
      answer:
        'Erstattungen bearbeitet unser Support-Team. Schreib innerhalb von 14 Tagen nach dem Kauf mit deiner Bestellnummer an team@vectorleappulse.xyz. Wird die Erstattung genehmigt, beenden wir die damit bezahlte Abonnementzeit und überweisen dir das Geld zurück.',
    },
  ],
};
