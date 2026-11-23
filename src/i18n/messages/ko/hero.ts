import type { Hero } from '../en/hero';

export const hero: Hero = {
  badge: '모의 면접 + 실시간 면접, 1시간 무료',
  titleLead: '면접을 미리 연습하고,',
  titleAccent: '실전은 실시간 도움을 받으며',
  mockLabel: '모의 면접:',
  mockText: 'AI 면접관이 소리 내어 질문하고, 약한 답변은 파고들며, 모든 답변에 점수를 매깁니다.',
  liveLabel: '실시간 면접:',
  liveText:
    '같은 앱이 실제 Zoom, Meet, Teams 통화에서 화면 공유에 보이지 않게 실행되며, 무엇을 말할지 제안합니다.',
  rolePre: '두 기능 모두 이력서와 채용 공고를 바탕으로 하므로',
  roleStrong: '어떤 직무에도',
  rolePost: '맞습니다 - 영업, 금융, 간호, 교육, 엔지니어링 등 소프트웨어만이 아닙니다.',
  ctaMock: '모의 면접으로 시작하기',
  ctaLive: '실시간 면접 기능 보기',
  freeNote:
    '무료 1시간으로 연습과 실시간 도움을 모두 쓸 수 있습니다. 결제는 암호화폐로만, 신용카드 불필요.',

  trust: {
    platformsLabel: '플랫폼',
    platforms: '지금은 Windows, macOS는 곧 지원',
    languagesLabel: '면접 언어',
    rolesLabel: '직무',
    roles: 'IT뿐 아니라 모든 직무',
    privacyLabel: '개인정보',
    privacy: '전사 내용은 저장되지 않음',
    badgeAlt: 'PeerPush의 Power Interview AI 평점',
  },

  download: {
    forWindows: 'Windows용 다운로드',
    generic: '다운로드',
    macosNotReady: 'macOS 버전은 아직 준비 중입니다 - 열심히 개발하고 있습니다.',
    windowsInstead: '대신 Windows용 다운로드',
    allReleases: '모든 릴리스',
    latest: '최신',
    windows: 'Windows',
    macosSoon: 'macOS (곧 지원)',
    macosSoonTitle: '개발 중',
    free: '무료 다운로드',
    stickyNote: '1시간 무료',
    mobileNote: 'Power Interview AI는 Windows PC에서 실행됩니다.',
    shareLink: 'PC로 링크 보내기',
    copyLink: 'PC용 링크 복사',
    linkCopied: '링크 복사됨',
    shareText: 'PC에 Power Interview AI 다운로드',
  },

  surface: {
    play: '데모 재생',
    pause: '데모 일시정지',
    previous: '이전 데모',
    next: '다음 데모',
    clips: '데모 영상',
  },
  demos: [
    {
      title: '실시간 면접 어시스턴트 & 스마트 내보내기',
      description: '통화 중에는 즉시 제안하고, 끝나면 요약과 인사이트를 스마트하게 내보냅니다',
    },
    {
      title: '코딩 과제 - 그래프 탐색',
      description: '화면에서 문제를 캡처하고 스텔스 오버레이에서 풀이를 읽습니다',
    },
    {
      title: '코딩 과제 - 연결 요소',
      description: '여러 장의 스크린샷으로 AI에게 문제 전체, 제약 조건, 함수 시그니처를 전달합니다',
    },
    {
      title: '코딩 과제 - 이진 트리 재귀',
      description: '단축키만으로 코드를 스크롤 - 화면 공유에 보이지 않고 포커스도 빼앗지 않습니다',
    },
  ],

  install: {
    eyebrow: '설치',
    title: '시작하는 세 가지 방법',
    description:
      '작업 방식에 맞는 방법을 고르세요. 한 줄 명령어가 최신 릴리스를 내려받아 설치 프로그램을 실행해 줍니다.',
    tabCli: '명령줄',
    tabInstaller: '설치 프로그램',
    tabSource: '소스에서',
    windows: 'Windows',
    macos: 'macOS',
    copy: '설치 명령어 복사',
    copied: '복사됨',
    macosReference:
      'macOS 버전은 아직 준비 중입니다 - 열심히 개발하고 있습니다. 이 명령어는 참고용으로 남겨 두었으며 정상적으로 설치되지 않을 수 있습니다.',
    versionAgnostic: '버전과 무관한 명령어를 보여 줍니다 - 릴리스는 설치할 때 조회됩니다.',
    windowsInstaller: 'Windows 설치 프로그램',
    latestRelease: '최신 릴리스',
    macArm: 'macOS - Apple 실리콘',
    macIntel: 'macOS - Intel',
    macosInstallersNotReady: 'macOS 설치 프로그램은 아직 준비 중입니다 - 열심히 개발하고 있습니다.',
    viewReleases: 'GitHub에서 모든 릴리스 보기',
    sourceText: '저장소를 클론해 소스에서 실행하세요. Node.js 22.15 이상이 필요합니다.',
    viewBuild: '빌드 방법 보기',
  },
};
