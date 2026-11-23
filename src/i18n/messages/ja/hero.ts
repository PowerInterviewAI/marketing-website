import type { Hero } from '../en/hero';

export const hero: Hero = {
  badge: '模擬面接 + ライブ面接、1 時間無料',
  titleLead: '面接をリハーサルしてから、',
  titleAccent: 'リアルタイムのサポート付きで本番へ',
  mockLabel: '模擬面接：',
  mockText: 'AI 面接官が声に出して質問し、弱い回答には突っ込み、すべての回答を採点します。',
  liveLabel: 'ライブ面接：',
  liveText:
    '同じアプリが本番の Zoom・Meet・Teams 通話で動き、画面共有には映らずに、何を話すべきかを提案します。',
  rolePre: 'どちらも履歴書と求人票をもとに動くので、',
  roleStrong: 'どんな職種にも',
  rolePost: '対応します - 営業、金融、看護、教育、エンジニアリングなど、ソフトウェアに限りません。',
  ctaMock: '模擬面接から始める',
  ctaLive: 'ライブ面接の機能を見る',
  freeNote:
    '無料の 1 時間で練習もライブサポートも使えます。支払いは暗号資産のみ、クレジットカード不要。',

  trust: {
    platformsLabel: '対応プラットフォーム',
    platforms: 'Windows に対応、macOS は近日対応',
    languagesLabel: '面接言語',
    rolesLabel: '職種',
    roles: 'IT 以外のどんな職種にも',
    privacyLabel: 'プライバシー',
    privacy: '文字起こしは保存されません',
    badgeAlt: 'PeerPush での Power Interview AI の評価',
  },

  download: {
    forWindows: 'Windows 版をダウンロード',
    generic: 'ダウンロード',
    macosNotReady: 'macOS 版はまだ準備中です - 現在開発を進めています。',
    windowsInstead: '代わりに Windows 版をダウンロード',
    allReleases: 'すべてのリリース',
    latest: '最新',
    windows: 'Windows',
    macosSoon: 'macOS（近日対応）',
    macosSoonTitle: '開発中です',
  },

  surface: {
    play: 'デモを再生',
    pause: 'デモを一時停止',
    previous: '前のデモ',
    next: '次のデモ',
    clips: 'デモ動画',
  },
  demos: [
    {
      title: 'ライブ面接アシスタントとスマートエクスポート',
      description: '通話中は即座に提案し、終了後は要約と気づきをスマートにエクスポート',
    },
    {
      title: 'コーディング課題 - グラフ探索',
      description: '画面から問題をキャプチャし、ステルスオーバーレイで解答を読む',
    },
    {
      title: 'コーディング課題 - 連結成分',
      description: '複数のスクリーンショットで、問題文・制約・関数シグネチャをすべて AI に渡す',
    },
    {
      title: 'コーディング課題 - 二分木の再帰',
      description:
        'ショートカットだけでコードをスクロール - 画面共有に映らず、フォーカスも奪わない',
    },
  ],

  install: {
    eyebrow: 'インストール',
    title: '始め方は 3 通り',
    description:
      '作業スタイルに合うものを選んでください。ワンライナーは最新リリースをダウンロードし、インストーラを起動します。',
    tabCli: 'コマンドライン',
    tabInstaller: 'インストーラ',
    tabSource: 'ソースから',
    windows: 'Windows',
    macos: 'macOS',
    copy: 'インストールコマンドをコピー',
    copied: 'コピーしました',
    macosReference:
      'macOS 版はまだ準備中です - 現在開発を進めています。このコマンドは参考として掲載していますが、正常にインストールできない場合があります。',
    versionAgnostic:
      'バージョンに依存しないコマンドを表示しています - リリースはインストール時に取得されます。',
    windowsInstaller: 'Windows インストーラ',
    latestRelease: '最新リリース',
    macArm: 'macOS - Apple シリコン',
    macIntel: 'macOS - Intel',
    macosInstallersNotReady: 'macOS 用インストーラはまだ準備中です - 現在開発を進めています。',
    viewReleases: 'GitHub ですべてのリリースを見る',
    sourceText: 'リポジトリをクローンしてソースから実行します。Node.js 22.15 以上が必要です。',
    viewBuild: 'ビルド手順を見る',
  },
};
