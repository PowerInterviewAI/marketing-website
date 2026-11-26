import type { Hero } from '../en/hero';

export const hero: Hero = {
  title: '面接は練習で準備し、本番はサポート付きで。',
  subtitle:
    '回答ごとに採点する AI 面接官と声に出して練習。本番では Zoom、Meet、Teams の横にリアルタイムの文字起こしと回答のポイントを表示します。あらゆる職種に、あなたの言語で。',
  free: '1 時間無料',
  noCard: 'クレジットカード不要',

  trust: {
    platformsLabel: '対応プラットフォーム',
    platforms: 'Windows と macOS に対応',
    languagesLabel: '面接言語',
    voices: '{voices} 言語の音声',
    rolesLabel: '職種',
    roles: 'IT 以外のどんな職種にも',
    privacyLabel: 'プライバシー',
    privacy: '文字起こしは保存されません',
    badgeAlt: 'PeerPush での Power Interview AI の評価',
  },

  download: {
    forWindows: 'Windows 版をダウンロード',
    forMac: 'macOS 版をダウンロード',
    generic: 'ダウンロード',
    allReleases: 'すべてのリリース',
    latest: '最新',
    windows: 'Windows',
    mac: 'macOS',
    macArm: 'Apple シリコン搭載 Mac',
    macIntel: 'Intel 搭載 Mac',
    free: '無料でダウンロード',
    stickyNote: '1 時間無料',
    mobileNote: 'Power Interview AI は Windows PC と Mac で動作します。',
    shareLink: 'PC にリンクを送る',
    copyLink: 'PC 用リンクをコピー',
    linkCopied: 'コピーしました',
    shareText: 'PC に Power Interview AI をダウンロード',
  },

  surface: {
    preview: '面接プレビュー',
    before: '面接前',
    during: '面接中',
    mock: '模擬面接',
    live: 'ライブサポート',
    question: '質問 {n} / {total}',
    interviewer: '面接官',
    you: 'あなた',
    score: 'スコア',
    strength: '強み',
    gap: '改善点',
    suggestion: '提案',
    language: '面接言語',
    yours: 'ブラウザの言語',
    pauseLanguages: '言語プレビューを一時停止',
    playLanguages: '言語プレビューを再生',
    allLanguages: '全 {count} 言語',
  },

  demo: {
    watch: 'デモを見る',
    title: '製品デモ',
    close: 'デモを閉じる',
    clips: {
      mock: {
        title: 'スペイン語の模擬面接',
        description: 'AI 面接官の質問に声で答えると、発言が文字で表示されます。',
      },
      report: {
        title: '採点レポート',
        description: 'スコア、課題、各回答の改善例を確認できます。',
      },
      live: {
        title: '日本語のライブサポート',
        description: '会話の横に、あなたの言語で短い要点を表示します。',
      },
      coding: {
        title: 'コーディング解説',
        description: 'コーディング問題を解法、コード、計算量に整理します。',
      },
    },
  },

  install: {
    eyebrow: 'インストール',
    title: '無料の 1 時間を始める',
    description: 'アプリをダウンロードして履歴書を追加し、今夜最初の模擬面接を始めましょう。',
    more: 'その他のインストール方法',
    tabCli: 'コマンドライン',
    tabInstaller: 'インストーラ',
    tabSource: 'ソースから',
    windows: 'Windows',
    macos: 'macOS',
    copy: 'インストールコマンドをコピー',
    copied: 'コピーしました',
    versionAgnostic:
      'バージョンに依存しないコマンドを表示しています - リリースはインストール時に取得されます。',
    windowsInstaller: 'Windows インストーラ',
    latestRelease: '最新リリース',
    macArm: 'macOS - Apple シリコン',
    macIntel: 'macOS - Intel',
    viewReleases: 'GitHub ですべてのリリースを見る',
    sourceText: 'リポジトリをクローンしてソースから実行します。Node.js 22.15 以上が必要です。',
    viewBuild: 'ビルド手順を見る',
  },
};
