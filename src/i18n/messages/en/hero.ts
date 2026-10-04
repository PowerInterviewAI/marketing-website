/** The hero block, its demo carousel, trust strip and the install panel below it. */
export const hero = {
  badge: 'Mock interview + live interview, 1 hour free',
  titleLead: 'Rehearse the interview, then',
  titleAccent: 'sit the real one with live help',
  mockLabel: 'Mock interview:',
  mockText: 'an AI interviewer asks aloud, presses on weak answers, and scores each one.',
  liveLabel: 'Live interview:',
  liveText:
    'the same app runs on your real Zoom, Meet or Teams call, hidden from screen share, and suggests what to say.',
  rolePre: 'Both use your CV and job description, so they fit',
  roleStrong: 'any role',
  rolePost: '- sales, finance, nursing, teaching, engineering, not just software.',
  ctaMock: 'Start with a mock interview',
  ctaLive: 'See the live interview features',
  freeNote: 'One free hour covers practice and live help. Pay with coins only, no credit card.',

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
        'Instant suggestions during the call, then a smart export of the summary and insights',
    },
    {
      title: 'Coding Challenge - Graph Traversal',
      description:
        'Capture the problem from your screen and read the solution in the stealth overlay',
    },
    {
      title: 'Coding Challenge - Connected Components',
      description: 'Several screenshots give the AI the full statement, constraints and signature',
    },
    {
      title: 'Coding Challenge - Binary Tree Recursion',
      description:
        'Scroll the code with hotkeys alone - hidden from screen share, never steals focus',
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
