/** `**text**` marks emphasis - see RichText. */
export const features = {
  eyebrow: 'Features',
  title: "Everything the rehearsal needs, and everything the call can't see",
  description:
    'Every capability, labelled with the half of the app it belongs to: the mock interview you rehearse in, the live interview you sit afterwards, or both. It runs off your own CV and job description, so the role can be anything - the coding help is one feature among nine, not the point of the app.',
  scope: { mock: 'Mock interview', live: 'Live interview', both: 'Both' },
  cta: 'Download for free',
  mock: {
    title: 'Mock interview',
    description:
      'An AI interviewer that **speaks its questions**, presses on a thin answer, and scores every one of yours against your CV and the job description. Behavioural, technical, situational and closing questions, written for the role you pasted in - a nursing post or a sales one as readily as an engineering one. Export the report as DOCX or Markdown.',
    link: 'How mock interviews work',
  },
  transcription: {
    title: 'Live transcription',
    description:
      'Dual-channel transcription with automatic speaker detection and full conversation history. Change your microphone **mid-interview** without stopping the session - no gap in the transcript, nothing to restart.',
  },
  stealth: {
    title: 'Stealth mode',
    description:
      'Operate discreetly with hotkeys, opacity control, and smart window positioning. The window is **not capturable in screenshots** and stays invisible during full screen share.',
  },
  languages: {
    title: '{count} {noun}',
    description:
      'One setting drives all three: which speech model transcribes the call, the language your suggestions come back in, and the language of your exported report. Switch it **mid-interview**, not just before you start. Full right-to-left support for Arabic and Hebrew, and **{voices}** of them the mock interviewer speaks aloud.',
    link: 'See all {count} languages',
  },
  suggestions: {
    title: 'AI reply suggestions',
    description:
      'Personalised, context-aware responses grounded in your CV, the job description, and your **full conversation history**. Suggestions adapt to your communication style so you articulate your own experience rather than reading generic advice. Toggle **Professional Mode** for at-a-glance hints - a headline plus keyword bullets - instead of full sentences.',
  },
  code: {
    title: 'Code suggestions',
    description:
      'For the interviews that include a technical round: screenshot analysis with LLM-powered solutions for coding problems, complete with syntax highlighting. **Optional** - the rest of the live assistant works exactly the same on an interview that never shows you any code.',
  },
  export: {
    title: 'AI note taker export',
    description:
      '**Smart meeting export** for interviews, mock interviews, and video calls. AI-generated summaries, action items, speaker-labelled transcripts, and follow-up notes. Exports to **DOCX** for easy sharing across individuals and enterprise teams.',
  },
  plans: {
    title: 'Every plan, every feature',
    description:
      'No feature is paywalled. The free hour runs the whole app on the **free model** - live suggestions, triggered suggestions and mock interviews alike. Credits move you to the **SOTA model**, and suggestions keep working on the free model once they run out.',
  },
  privacy: {
    title: 'Privacy first',
    description:
      'Transcripts are never retained after your session - from a mock session and a real call alike. No data mining, and full control over your information.',
  },
};

export type Features = typeof features;
