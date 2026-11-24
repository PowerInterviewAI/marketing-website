const BASE_TIME = 1795000000000;
const reveal = (text, progress) =>
  text.slice(0, Math.floor(text.length * Math.max(0, Math.min(1, progress))));
const span = (t, start, end) => (t - start) / (end - start);

export const account = {
  isLoggedIn: true,
  isBackendLive: true,
  credits: 3600,
  creditsPerMinute: 60,
  subscribed: true,
  subscriptionExpiresAt: BASE_TIME + 60 * 86400000,
  subscriptionPlan: 'quarterly',
  userRole: 'user',
  providedLLMModel: 'SOTA',
  interviewConfig: { fullName: 'Alex Rivera', hasProfileData: true },
  interviewConfigLoaded: true,
  onboardingCompleted: true,
  accountEmail: 'alex@example.com',
  mockInterviewSupported: true,
  hasMockContent: false,
  hasUnsavedMockContent: false,
  transcripts: [],
  liveSuggestions: [],
  actionSuggestions: [],
  mockInterview: null,
  hasHistory: false,
  runningState: 'idle',
};

export const baseConfig = {
  language: 'en',
  uiLanguage: 'en',
  sessionToken: 'sample',
  email: '',
  password: '',
  rememberMe: false,
  audioInputDeviceName: '',
  autoScrollLiveSuggestions: true,
  autoScrollActionSuggestions: true,
  autoScrollTranscript: true,
  showTranscriptPanel: true,
  transcriptDockHeight: null,
  hintOnlyMode: true,
  mockLiveHintsEnabled: false,
  hideTaskbarWhileRunning: false,
  allowScreenCapture: true,
};

const setup = { role: '', seniority: 'senior', difficulty: 'standard', question_count: 5 };
export const mock = (overrides) => ({
  state: 'listening',
  setup,
  currentQuestion: null,
  questionNumber: 2,
  answers: [],
  currentAnswerText: '',
  liveHints: [],
  report: null,
  reportError: null,
  rescoring: false,
  exported: false,
  error: null,
  ...overrides,
});

const esPrevious = {
  question: 'Cuéntame sobre tu experiencia liderando equipos de ventas.',
  kind: 'behavioral',
  answer:
    'Durante cuatro años dirigí un equipo de ocho personas y aumentamos la renovación de clientes un 18 %.',
  skipped: false,
};
const esQuestion =
  '¿Cómo recuperarías una cuenta importante que está a punto de cancelar su contrato?';
const esAnswer =
  'Primero llamaría al cliente ese mismo día para entender el motivo real. Después acordaría un plan con fechas concretas, asignaría un responsable y revisaría los avances cada semana hasta recuperar su confianza.';
const esCurrent = (chunks) => ({
  text: esQuestion,
  kind: 'situational',
  hasAudio: true,
  isFollowUp: false,
  chunks,
});

export const report = {
  overall_score: 82,
  strengths: [
    'Opens with a concrete situation',
    'Quantifies the business result',
    'Takes clear ownership of the recovery plan',
  ],
  gaps: ['Explain the trade-offs you considered', 'Close by linking the result to this role'],
  questions: [
    {
      question: 'Tell me about a time you handled a difficult deadline.',
      answer:
        'A client moved our launch up by two weeks, so the team worked harder and we got it done.',
      score: 64,
      justification:
        'The situation is clear, but the answer does not show what you personally decided or what changed because of it.',
      stronger_answer:
        'When a client moved our launch up two weeks, I cut the scope to the three features they needed, reassigned two people, and we shipped on the new date.',
    },
    {
      question: 'How would you recover a key account that plans to leave?',
      answer:
        'I would call them the same day, agree a recovery plan with dates, and review progress every week.',
      score: 88,
      justification: 'Strong ownership and a practical sequence of actions.',
      stronger_answer:
        'I would call the same day, confirm the root cause, agree dated milestones, and report progress weekly until renewal.',
    },
    {
      question: 'Describe a decision you made with incomplete data.',
      answer:
        'I used the last two quarters of pipeline data and set a checkpoint to revisit the decision after 30 days.',
      score: 84,
      justification: 'Good judgment, with a sensible way to reduce risk.',
      stronger_answer:
        'I used two quarters of pipeline data, stated my assumptions, and set a 30-day checkpoint to change course if needed.',
    },
    {
      question: 'Tell me about feedback that changed how you work.',
      answer:
        'A manager told me I jumped to solutions, so I now start client calls by asking more questions.',
      score: 79,
      justification: 'Honest and specific, but it needs a measurable outcome.',
      stronger_answer:
        'After feedback that I jumped to solutions, I began each call with discovery questions, and my close rate rose over the next quarter.',
    },
    {
      question: 'Why do you want this role?',
      answer:
        'I want to lead a larger team and apply my account recovery experience in a growing company.',
      score: 91,
      justification: 'Connects your experience directly to the role.',
      stronger_answer:
        'I want to lead a larger team and bring my account recovery experience to a company that is expanding its enterprise customers.',
    },
  ],
};

const jaQuestion = '不満を持つお客様との関係を立て直した経験を教えてください。';
const jaAnswerStart = 'はい、納品遅れで最大の取引先が離れかけたことがあります。';
const jaHint =
  '**結果から話す**\n\n- 最大の取引先が契約を更新\n- 当日に電話して原因を確認\n- 改善計画と週次の進捗報告';

const problemSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#f7f7f8"/><text x="28" y="48" font-family="Segoe UI,Arial" font-size="24" font-weight="700" fill="#18181b">Merge Intervals</text><text x="28" y="92" font-family="Segoe UI,Arial" font-size="17" fill="#3f3f46">Given an array of intervals, merge all overlapping</text><text x="28" y="118" font-family="Segoe UI,Arial" font-size="17" fill="#3f3f46">intervals and return the non-overlapping result.</text><rect x="28" y="150" width="584" height="106" rx="8" fill="#e4e4e7"/><text x="46" y="188" font-family="Consolas,monospace" font-size="16" fill="#18181b">Input: [[1,3],[2,6],[8,10],[15,18]]</text><text x="46" y="222" font-family="Consolas,monospace" font-size="16" fill="#18181b">Output: [[1,6],[8,10],[15,18]]</text><text x="28" y="300" font-family="Segoe UI,Arial" font-size="16" fill="#52525b">1 &lt;= intervals.length &lt;= 10^4</text></svg>`;
const problemImage = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(problemSvg)}`;
const codeAnswer = `**Approach:** sort by start, then merge each interval that overlaps the last one.

\`\`\`typescript
function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [];

  for (const [start, end] of intervals) {
    const last = merged.at(-1);
    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}
\`\`\`

**Complexity:** O(n log n) time for the sort, O(n) space for the result.

**Say out loud:** sorting guarantees any overlap is with the most recent merged interval.`;

export const SCENES = {
  mock: {
    route: '/mock-interview',
    duration: 15,
    preview: 8.5,
    config: { language: 'es', uiLanguage: 'es' },
    at: (t) => {
      const answers = [esPrevious];
      if (t < 0.9)
        return {
          ...account,
          mockInterview: mock({ state: 'generating', answers, currentQuestion: null }),
        };
      if (t < 4.6)
        return {
          ...account,
          mockInterview: mock({
            state: 'speaking',
            answers,
            currentQuestion: esCurrent([esQuestion]),
          }),
        };
      if (t < 12.2)
        return {
          ...account,
          mockInterview: mock({
            state: 'listening',
            answers,
            currentQuestion: esCurrent([esQuestion]),
            currentAnswerText: reveal(esAnswer, span(t, 5, 11.8)),
          }),
        };
      return {
        ...account,
        mockInterview: mock({
          state: 'evaluating',
          answers: [
            ...answers,
            { question: esQuestion, kind: 'situational', answer: esAnswer, skipped: false },
          ],
          currentQuestion: esCurrent([esQuestion]),
        }),
      };
    },
  },
  report: {
    route: '/mock-interview',
    duration: 15,
    preview: 7,
    config: {},
    at: (t) => {
      if (t < 1.4)
        return {
          ...account,
          mockInterview: mock({
            state: 'scoring',
            questionNumber: 5,
            answers: report.questions.map((q) => ({
              question: q.question,
              kind: 'behavioral',
              answer: q.answer,
              skipped: false,
            })),
          }),
        };
      return {
        ...account,
        hasMockContent: true,
        hasUnsavedMockContent: true,
        mockInterview: mock({
          state: 'finished',
          questionNumber: 5,
          report,
          answers: report.questions.map((q) => ({
            question: q.question,
            kind: 'behavioral',
            answer: q.answer,
            skipped: false,
          })),
        }),
      };
    },
    actions: [
      {
        t: 5.2,
        js: `(() => { const s = [...document.querySelectorAll('*')].find(e => e.scrollHeight > e.clientHeight + 40 && getComputedStyle(e).overflowY === 'auto'); window.__scroller = s; if (s) s.scrollTo({ top: 310, behavior: 'smooth' }); return 1; })()`,
      },
      {
        t: 7.2,
        js: `document.querySelector('[data-slot=accordion-trigger], [data-radix-collection-item]')?.click(); 1`,
      },
      { t: 8.3, js: `window.__scroller?.scrollTo({ top: 560, behavior: 'smooth' }); 1` },
    ],
  },
  live: {
    route: '/main',
    duration: 15,
    preview: 9.5,
    config: { language: 'ja', uiLanguage: 'ja' },
    at: (t) => {
      const transcripts = [
        {
          timestamp: BASE_TIME,
          text: '本日はお時間をいただきありがとうございます。',
          speaker: 'other',
        },
        {
          timestamp: BASE_TIME + 3000,
          text: 'こちらこそ、よろしくお願いいたします。',
          speaker: 'self',
        },
      ];
      if (t > 0.6)
        transcripts.push({
          timestamp: BASE_TIME + 7000,
          text: reveal(jaQuestion, span(t, 0.6, 3.4)),
          speaker: 'other',
        });
      if (t > 9.6)
        transcripts.push({
          timestamp: BASE_TIME + 16000,
          text: reveal(jaAnswerStart, span(t, 9.4, 13)),
          speaker: 'self',
        });
      const liveSuggestions =
        t < 3.6
          ? []
          : [
              {
                timestamp: BASE_TIME + 9000,
                last_question: jaQuestion,
                answer: reveal(jaHint, span(t, 4.1, 8)),
                state: t < 8 ? 'loading' : 'success',
                error: '',
                mode: 'professional',
              },
            ];
      return {
        ...account,
        runningState: 'running',
        hasHistory: true,
        transcripts,
        liveSuggestions,
      };
    },
  },
  coding: {
    route: '/main',
    duration: 15,
    preview: 13.6,
    config: { showTranscriptPanel: false },
    actions: [
      {
        t: 12,
        js: `(() => { const s = [...document.querySelectorAll('main *')].filter(e => e.scrollHeight > e.clientHeight + 20 && getComputedStyle(e).overflowY === 'auto').sort((a, b) => b.clientHeight - a.clientHeight)[0]; if (s) s.scrollTo({ top: s.scrollHeight, behavior: 'smooth' }); return 1; })()`,
      },
    ],
    at: (t) => {
      const actionSuggestions =
        t < 0.6
          ? []
          : [
              {
                timestamp: BASE_TIME + 1000,
                last_question: '',
                answer: t < 2.6 ? '' : reveal(codeAnswer, span(t, 2.6, 11.5)),
                image_urls: [problemImage],
                state:
                  t < 1.6 ? 'uploading' : t < 2.6 ? 'pending' : t < 11.5 ? 'loading' : 'success',
                error: '',
              },
            ];
      return {
        ...account,
        runningState: 'running',
        hasHistory: true,
        transcripts: [],
        actionSuggestions,
      };
    },
  },
};
