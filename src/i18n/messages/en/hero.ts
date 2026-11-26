/** The hero block, its demo carousel, trust strip and the install panel below it. */
export const hero = {
  title: 'Practice the interview. Get backup in the real one.',
  subtitle:
    'Rehearse out loud with an AI interviewer that scores every answer, then keep live transcription and talking points beside your Zoom, Meet or Teams call. Any job, in your language.',
  free: '1 free hour',
  noCard: 'No credit card',

  trust: {
    platformsLabel: 'Platforms',
    platforms: 'Windows and macOS',
    languagesLabel: 'Interview languages',
    voices: '{voices} languages spoken aloud',
    rolesLabel: 'Roles',
    roles: 'Any role, not just tech',
    privacyLabel: 'Privacy',
    privacy: 'Transcripts never persisted',
    badgeAlt: 'Power Interview AI rating on PeerPush',
  },

  download: {
    forWindows: 'Download for Windows',
    forMac: 'Download for macOS',
    generic: 'Download',
    allReleases: 'All releases',
    latest: 'latest',
    windows: 'Windows',
    mac: 'macOS',
    macArm: 'Apple Silicon Mac',
    macIntel: 'Intel Mac',
    free: 'Download free',
    stickyNote: '1 hour free',
    mobileNote: 'Power Interview AI runs on your Windows PC or Mac.',
    shareLink: 'Send link to my PC',
    copyLink: 'Copy link for my PC',
    linkCopied: 'Link copied',
    shareText: 'Download Power Interview AI on my PC',
  },

  surface: {
    preview: 'Interview preview',
    before: 'Before',
    during: 'During',
    mock: 'Mock interview',
    live: 'Live help',
    question: 'Question {n} of {total}',
    interviewer: 'Interviewer',
    you: 'You',
    score: 'Score',
    strength: 'Strength',
    gap: 'To improve',
    suggestion: 'Suggestion',
    language: 'Interview language',
    yours: 'Your browser language',
    pauseLanguages: 'Pause language preview',
    playLanguages: 'Play language preview',
    allLanguages: 'All {count} languages',
  },

  demo: {
    watch: 'Watch demo',
    title: 'Product demos',
    close: 'Close demo',
    clips: {
      mock: {
        title: 'Mock interview in Spanish',
        description:
          'The AI interviewer asks, you answer aloud, and your words appear as you speak.',
      },
      report: {
        title: 'Scored report',
        description: 'See your score, gaps, and a stronger version of each answer.',
      },
      live: {
        title: 'Live help in Japanese',
        description: 'Short talking points in your language beside the conversation.',
      },
      coding: {
        title: 'Coding walkthrough',
        description: 'Turn a coding problem into an approach, code, and complexity.',
      },
    },
  },

  install: {
    eyebrow: 'Install',
    title: 'Start your free hour',
    description: 'Download the app, add your CV, and run your first mock interview tonight.',
    more: 'More ways to install',
    tabCli: 'Command line',
    tabInstaller: 'Installer',
    tabSource: 'From source',
    windows: 'Windows',
    macos: 'macOS',
    copy: 'Copy install command',
    copied: 'Copied',
    versionAgnostic:
      'Showing the version-agnostic command - the release lookup runs at install time.',
    windowsInstaller: 'Windows installer',
    latestRelease: 'latest release',
    macArm: 'macOS - Apple Silicon',
    macIntel: 'macOS - Intel',
    viewReleases: 'View all releases on GitHub',
    sourceText: 'Clone the repository and run from source. Requires Node.js 22.15+.',
    viewBuild: 'View build instructions',
  },
};

export type Hero = typeof hero;
