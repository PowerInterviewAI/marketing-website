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
  roles: {
    eyebrow: 'Any job',
    title: 'Your role. Your questions.',
    description:
      'Add your CV and the job description. Every question is written for the position you want.',
    sample: 'Sample question',
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
  checker: {
    label: 'Is my language supported?',
    placeholder: 'Type a language, like Tamil or தமிழ்',
    voice: 'Spoken and written',
    written: 'Written questions',
    none: 'No match. Try the English or native name.',
  },
};

export type Story = typeof story;
