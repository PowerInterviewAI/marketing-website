/** The hero block, its demo carousel, trust strip and the install panel below it. */
export const hero = {
  badge: 'Mock interview + live interview, 1 hour free',
  titleLead: 'Rehearse the interview, then',
  titleAccent: 'sit the real one with live help',
  mockLabel: 'Mock interview:',
  mockText:
    'an AI interviewer speaks its questions, presses on a thin answer, and scores every one you give.',
  liveLabel: 'Live interview:',
  liveText:
    'the same desktop app stays open on the real Zoom, Google Meet or Teams call, hidden from screen share, transcribing both sides and suggesting what to say.',
  rolePre: 'Both are built from the CV and job description you paste in, so it fits',
  roleStrong: 'any role',
  rolePost: '- sales, finance, nursing, teaching, consulting, engineering - not just software.',
  ctaMock: 'Start with a mock interview',
  ctaLive: 'See the live interview features',
  freeNote:
    'One free hour covers everything: practice sessions, live suggestions and triggered suggestions alike. Pay with coins only, no credit card required.',

  trust: {
    platformsLabel: 'Platforms',
    platforms: 'Windows now, macOS coming soon',
    languagesLabel: 'Interview languages',
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
  },

  surface: {
    play: 'Play demo',
    pause: 'Pause demo',
    previous: 'Previous demo',
    next: 'Next demo',
    clips: 'Demo clips',
  },
  /** Same order as MEDIA_ITEMS in src/components/sections/hero/constants.ts. */
  demos: [
    {
      title: 'Live Interview Assistant & Smart Export',
      description:
        'Real-time AI-powered interview assistance with instant suggestions and smart export of interview summaries and insights',
    },
    {
      title: 'Coding Challenge - Graph Traversal',
      description:
        'Capture the problem from your screen and read a syntax-highlighted solution streamed into the stealth overlay while you type',
    },
    {
      title: 'Coding Challenge - Connected Components',
      description:
        'Multi-screenshot context lets the AI pick up the full problem statement, constraints, and starter signature before it answers',
    },
    {
      title: 'Coding Challenge - Binary Tree Recursion',
      description:
        'Scroll the code panel with hotkeys alone - the overlay stays hidden from screen share and never steals focus from your editor',
    },
  ],

  install: {
    eyebrow: 'Install',
    title: 'Three ways to get it running',
    description:
      'Pick whichever fits how you work. The one-liner downloads the latest release and launches the installer for you.',
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
