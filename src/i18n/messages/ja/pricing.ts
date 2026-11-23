import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: '料金',
  title: '最初の 1 時間は無料、その後は無制限',
  description:
    'まずは無料モデルで 1 時間無料。もっと使いたくなったら、サブスクリプションで SOTA モデルのライブ面接と模擬面接が無制限に - 月額 {monthly}、または年払いで月あたり {yearly}。',
  monthNoun: { one: 'か月', other: 'か月' },
  coinsBadge: '暗号資産のみ - カード、PayPal、口座情報は不要',

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
    free: 'すべての機能を試す',
    monthly: '近々の面接に',
    quarterly: '本格的な転職活動に',
    yearly: '長期の転職活動に',
  },
  included: { every: 'すべてのプランに含まれるもの', paid: '有料プランの特典' },
  popular: 'おすすめ',
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
