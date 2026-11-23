import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: '价格',
  title: '免费一小时，之后不限时',
  description:
    '先用免费模型免费体验一小时。想要更多时，订阅即可在 SOTA 模型上不限次进行实时面试和模拟面试 - 每月 {monthly}，或按年付费每月仅 {yearly}。',
  monthNoun: { one: '个月', other: '个月' },
  coinsBadge: '仅限加密货币 - 无需银行卡、PayPal 或银行信息',

  billing: {
    title: '计费方式',
    free: '免费一小时',
    freeText: '实时会话和模拟会话按分钟消耗时长。用完时会话停止，模拟面试仍会给出报告。',
    paid: '订阅',
    paidText:
      '用加密货币一次性支付一个月、一个季度或一年。不会自动续费：随时可以再买一张通行证，其时长会累加在当前到期日之后。',
  },

  plans: {
    free: '体验全部功能',
    monthly: '适合近期面试',
    quarterly: '适合积极求职',
    yearly: '适合长期求职',
  },
  included: { every: '所有方案均包含', paid: '付费方案额外包含' },
  popular: '推荐',
  save: '节省 {percent}%',
  planNames: { free: '免费', monthly: '月度', quarterly: '季度', yearly: '年度' },
  perMonth: '/ 月',
  freeLine: '1 小时面试，仅一次',
  billedAs: '一次性支付 {price}，可用 {months} {monthNoun}',
  features: {
    suggestions: '实时建议和按需建议',
    mock: '带评分报告的模拟面试',
    freeModel: '免费模型',
    sotaModel: 'SOTA 模型，实际上没有使用限制',
    oneHour: '1 小时面试时长',
    unlimited: '面试时长不限',
    noRenewal: '不自动续费',
  },
  getStarted: '开始使用',
  startFree: '免费开始',
};
