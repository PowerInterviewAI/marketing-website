/** The home page's practice, role, developer and language-checker sections. */
export const story = {
  answer: {
    eyebrow: 'Mock interview',
    title: 'Hear what a stronger answer sounds like',
    description:
      'Answer out loud. The report shows why your answer landed where it did, then writes a stronger version from your own experience.',
    question: 'Tell me about a time you handled a difficult deadline.',
    weakLabel: 'Your first try',
    strongLabel: 'Improved answer',
    weak: 'We had a tight deadline once, so the team worked hard and we got it done in the end.',
    strong:
      'When a client moved our launch up two weeks, I cut the scope to the three features they needed, reassigned two people, and we shipped on the new date.',
    scoreLabel: 'Answer score',
    replay: 'Replay',
    points: [
      'Scored question by question',
      'Follow-ups on thin answers',
      'Export as DOCX or Markdown',
    ],
  },
  tour: {
    title: 'See everything in 90 seconds',
    description:
      'Mock interviews, live help, coding rounds and the smart report after the call, narrated in English. The people in it are fictional.',
    play: 'Play the 90-second tour',
  },
  modes: {
    eyebrow: 'One app, two modes',
    title: 'Before the interview, and during it',
    description:
      'Practice against an AI interviewer that scores you, then keep live help open on the real call. Use one, or both.',
    shared:
      'Both modes read the same CV and job description, and both are unlimited on any subscription.',
    mock: {
      tag: 'Before',
      title: 'Mock interview',
      body: 'An AI interviewer asks its questions out loud, presses on thin answers and scores every reply.',
      points: [
        'Questions written for your role and seniority',
        'Up to two follow-ups on each question',
        'A scored report with a stronger answer for each',
      ],
      link: 'How the mock interview works',
    },
    live: {
      tag: 'During',
      title: 'Live interview',
      body: 'Live transcription and short talking points beside Zoom, Google Meet or Teams while the call is happening.',
      points: [
        'Both sides of the call transcribed',
        'Suggestions grounded in your own CV',
        'Coding help from a screenshot',
      ],
      link: 'How live help works',
    },
  },
  live: {
    eyebrow: 'Live interview',
    title: 'Talking points while the call is happening',
    description:
      'The app listens to both sides of the call and puts short, relevant points beside it, drawn from your CV and the job you applied for. No bot joins the meeting.',
    /** Same order as the icons in LiveSection. `{count}` is LANGUAGE_COUNT. */
    points: [
      {
        title: 'Both voices, transcribed',
        body: 'Your microphone and the call audio, labelled by speaker as the conversation happens.',
      },
      {
        title: 'Suggestions from your experience',
        body: 'Each one is grounded in your CV and the job description, not generic advice.',
      },
      {
        title: 'Switch language mid-call',
        body: 'Suggestions follow at once, in any of the {count} languages.',
      },
      {
        title: 'Export the session',
        body: 'Save a summary, the transcript and every suggestion as Word or Markdown.',
      },
    ],
    imageAlt:
      'Power Interview AI during a sample live session: suggested talking points above the live transcript',
    cta: 'Try live help free',
    note: 'Use live help only in interviews that allow AI tools. Always follow each employer’s rules.',
  },
  roles: {
    eyebrow: 'Any job',
    title: 'Your role. Your questions.',
    description:
      'Add your CV and the job description. Every question is written for the position you want.',
    /** Slide-show controls; `{n}` and `{total}` are filled in by RolePicker. */
    controls: {
      previous: 'Previous role',
      next: 'Next role',
      pause: 'Pause slide show',
      play: 'Play slide show',
      slide: '{n} of {total}',
    },
    items: {
      developer: {
        label: 'Developer',
        question: 'Walk me through how you would design a rate limiter for a public API.',
      },
      sales: {
        label: 'Sales',
        question: 'How would you recover a deal that has gone quiet before quarter end?',
      },
      nurse: {
        label: 'Nurse',
        question: 'Describe how you prioritize care when two patients need you at once.',
      },
      teacher: {
        label: 'Teacher',
        question: 'How do you support a student who has fallen behind the class?',
      },
      finance: {
        label: 'Finance',
        question: 'Tell me about a forecast that was wrong and what you changed.',
      },
    },
  },
  coding: {
    eyebrow: 'For developers',
    title: 'Get ready for the live coding round',
    description:
      'Turn any coding problem into a guided walkthrough, then practice explaining it the way an interviewer expects.',
    steps: [
      {
        title: 'Capture the problem',
        body: 'Add up to four screenshots of the statement, constraints, and examples.',
      },
      {
        title: 'See the approach',
        body: 'Get a suggested solution streamed with syntax-highlighted code.',
      },
      {
        title: 'Explain it yourself',
        body: 'Talk through the logic, edge cases, and complexity until it is yours.',
      },
    ],
    panel: 'Code suggestion',
    approachLabel: 'Approach',
    approach: 'Sort by start, then merge each interval that overlaps the last one.',
    complexityLabel: 'Complexity',
    note: 'Use it to practice and in interviews that allow AI tools. Always follow each employer’s rules.',
    cta: 'Practice coding interviews',
  },
  /**
   * What a live session leaves behind - the client's export: the model's
   * summary, the transcript by speaker, every suggestion, as Word or Markdown.
   */
  notes: {
    eyebrow: 'Interview notes',
    title: 'Your notes write themselves',
    description:
      'Nothing to type while you talk. When the call ends, the app turns the transcript into structured notes, so you remember what was asked and know what to do next.',
    /** Same order as the icons in NotesSection. */
    points: [
      {
        title: 'An AI summary of the call',
        body: 'What was discussed, where you were strong, what to work on and the next steps.',
      },
      {
        title: 'The full transcript',
        body: 'Every line of the conversation, labelled by speaker and time.',
      },
      {
        title: 'Every suggestion kept',
        body: 'The talking points you saw, beside the question each one answered.',
      },
      {
        title: 'Word or Markdown',
        body: 'Offered when you stop the session, or export at any time from the toolbar.',
      },
    ],
    panel: 'Interview notes',
    sample: {
      title: 'Customer Success Manager interview - Alex Rivera',
      date: 'Date/Time: Mar 12, 2026, 5:21 AM',
      summaryHeading: 'Summary',
      summary:
        'Covered account recovery, renewal planning and handling escalations. Answers were specific and led with outcomes.',
      strengths: {
        heading: 'Key strengths',
        items: ['Clear, outcome-first stories', 'Fast, personal follow-up'],
      },
      nextSteps: {
        heading: 'Next steps',
        items: ['Send the recovery plan example', 'Prepare renewal metrics'],
      },
      transcriptHeading: 'Transcript',
      transcript: [
        {
          speaker: 'Interviewer',
          text: 'Tell me about a time you turned around an unhappy customer.',
        },
        {
          speaker: 'Alex Rivera',
          text: 'Our largest client was frustrated by a late delivery. I called them that day and agreed a recovery plan.',
        },
      ],
    },
    cta: 'Get notes from your next call',
    note: 'Notes come from a live session: use it only in interviews that allow AI tools, and follow each employer’s rules.',
  },
  checker: {
    label: 'Is my language supported?',
    placeholder: 'Type a language, like Tamil or தமிழ்',
    voice: 'Spoken and written',
    written: 'Written questions',
    none: 'No match. Try the English or native name.',
  },
  showcase: {
    eyebrow: 'Inside the app',
    title: 'Every screen here is the real app',
    body: 'Setup, your profile, the mock interview, live suggestions, the scored report and the export, captured from the desktop app.',
    link: 'Browse the documentation',
  },
};

export type Story = typeof story;
