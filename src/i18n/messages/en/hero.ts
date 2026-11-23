/** The hero block, its demo carousel, trust strip and the install panel below it. */
export const hero = {
  title: 'Make your mistakes here, not in the interview.',
  subtitle:
    'Practice out loud with an AI interviewer in your language. Get every answer scored and improved for any job, from sales to live coding rounds.',
  free: '1 free hour',
  noCard: 'No credit card',

  trust: {
    platformsLabel: 'Platforms',
    platforms: 'Windows now, macOS coming soon',
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
    generic: 'Download',
    macosNotReady: 'macOS support isn’t ready yet - we’re actively working on it.',
    windowsInstead: 'Download for Windows instead',
    allReleases: 'All releases',
    latest: 'latest',
    windows: 'Windows',
    macosSoon: 'macOS (coming soon)',
    macosSoonTitle: 'Actively being worked on',
    free: 'Download free',
    stickyNote: '1 hour free',
    mobileNote: 'Power Interview AI runs on your Windows PC.',
    shareLink: 'Send link to my PC',
    copyLink: 'Copy link for my PC',
    linkCopied: 'Link copied',
    shareText: 'Download Power Interview AI on my PC',
  },

  surface: {
    preview: 'Interview preview',
    mock: 'Mock interview',
    live: 'Live help',
    sample: 'Sample',
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
    sample: 'Sample session recorded in the real app with scripted data.',
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
    macosReference:
      'macOS support isn’t ready yet - we’re actively working on it. This command is left here for reference but may not produce a working install.',
    versionAgnostic:
      'Showing the version-agnostic command - the release lookup runs at install time.',
    windowsInstaller: 'Windows installer',
    latestRelease: 'latest release',
    macArm: 'macOS - Apple Silicon',
    macIntel: 'macOS - Intel',
    macosInstallersNotReady: 'macOS installers aren’t ready yet - we’re actively working on it.',
    viewReleases: 'View all releases on GitHub',
    sourceText: 'Clone the repository and run from source. Requires Node.js 22.15+.',
    viewBuild: 'View build instructions',
  },
};

export type Hero = typeof hero;
