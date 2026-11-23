import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: '料金',
  title: '最初の 1 時間は無料、その後は無制限',
  description:
    'まずは無料モデルで 1 時間無料。もっと使いたくなったら、サブスクリプションで SOTA モデルのライブ面接と模擬面接が無制限に - 月額 {monthly}、または年払いで月あたり {yearly}。',
  monthNoun: { one: 'か月', other: 'か月' },
  trialBadge: '新規アカウント：1 時間無料',
  coinsBadge: '暗号資産のみ - カード、PayPal、口座情報は不要',
  prepaidBadge: '前払い制 - 自動更新なし',

  tier: {
    caption: '無料プランとサブスクリプションの比較',
    whatYouGet: '内容',
    trial: '無料',
    paid: 'サブスクリプション',
    included: '含まれます',
    duration: {
      label: '面接時間',
      trial: '1 時間（1 回のみ）',
      paid: '無制限',
    },
    model: { label: '提供モデル', trial: '無料モデル', paid: 'SOTA モデル' },
    live: 'ライブ提案',
    triggered: 'オンデマンド提案',
    mock: '採点レポート付きの模擬面接',
    rateLimit: { label: '利用制限', trial: '実質なし', paid: '実質なし' },
  },

  billing: {
    title: '支払いのしくみ',
    free: '無料の 1 時間',
    freeText:
      'ライブ面接と模擬面接は時間を分単位で消費します。なくなるとセッションは終了しますが、模擬面接のレポートは受け取れます。',
    paid: 'サブスクリプション',
    paidText:
      '1 か月、3 か月、1 年分を暗号資産で一括払い。自動更新はありません：好きなときに追加のパスを購入でき、その期間は現在の終了日のあとに加算されます。',
  },

  plans: {
    free: '最初の 1 時間、無料モデルでアプリのすべての機能',
    monthly: 'SOTA モデルで面接し放題、1 か月ずつ',
    quarterly: 'SOTA モデルで 3 か月間面接し放題',
    yearly: 'SOTA モデルでまる 1 年間面接し放題',
  },
  popular: '一番人気',
  save: '{percent}% お得',
  planNames: { free: '無料', monthly: '月額', quarterly: '3 か月', yearly: '年額' },
  perMonth: '/ 月',
  freeLine: '面接 1 時間（1 回のみ）',
  billedAs: '{months}{monthNoun}分を {price} で一括払い',
  features: {
    suggestions: 'ライブ提案とオンデマンド提案',
    mock: '採点レポート付きの模擬面接',
    freeModel: '無料モデル',
    sotaModel: 'SOTA モデル、実質的に利用制限なし',
    oneHour: '面接時間 1 時間',
    unlimited: '面接時間無制限',
    noRenewal: '自動更新なし',
  },
  getStarted: '始める',
  startFree: '無料で始める',
};
