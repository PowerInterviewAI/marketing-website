import type { Hero } from '../en/hero';

export const hero: Hero = {
  title: '실수는 면접장이 아니라 여기서 하세요.',
  subtitle:
    '내 언어로 AI 면접관과 소리 내어 연습하세요. 모든 답변에 점수와 개선안을 제공하며, 영업부터 라이브 코딩까지 모든 직무에 맞춥니다.',
  free: '1시간 무료',
  noCard: '신용카드 불필요',

  trust: {
    platformsLabel: '플랫폼',
    platforms: '지금은 Windows, macOS는 곧 지원',
    languagesLabel: '면접 언어',
    voices: '음성 지원 {voices}개 언어',
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
    preview: '면접 미리보기',
    mock: '모의 면접',
    live: '실시간 도움',
    sample: '샘플',
    question: '질문 {n}/{total}',
    interviewer: '면접관',
    you: '나',
    score: '점수',
    strength: '강점',
    gap: '개선점',
    suggestion: '제안',
    language: '면접 언어',
    yours: '브라우저 언어',
    pauseLanguages: '언어 미리보기 일시정지',
    playLanguages: '언어 미리보기 재생',
    allLanguages: '전체 {count}개 언어',
  },

  demo: {
    watch: '데모 보기',
    title: '제품 데모',
    close: '데모 닫기',
    sample: '실제 앱에서 준비된 데이터로 녹화한 샘플 세션입니다.',
    clips: {
      mock: {
        title: '스페인어 모의 면접',
        description: 'AI 면접관이 질문하고 소리 내어 답하면 말이 화면에 표시됩니다.',
      },
      report: {
        title: '점수 보고서',
        description: '점수, 부족한 점, 각 답변의 개선안을 확인하세요.',
      },
      live: {
        title: '일본어 실시간 도움',
        description: '대화 옆에 내 언어로 짧은 요점을 보여 줍니다.',
      },
      coding: {
        title: '코딩 풀이',
        description: '코딩 문제를 접근법, 코드, 복잡도로 정리합니다.',
      },
    },
  },

  install: {
    eyebrow: '설치',
    title: '무료 1시간 시작하기',
    description: '앱을 다운로드하고 이력서를 추가한 뒤 오늘 밤 첫 모의 면접을 시작하세요.',
    more: '다른 설치 방법',
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
