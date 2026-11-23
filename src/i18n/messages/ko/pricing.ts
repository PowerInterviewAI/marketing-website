import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: '요금',
  title: '1시간 무료, 그다음은 무제한',
  description:
    '무료 모델로 1시간 무료로 시작하세요. 더 필요하면 구독해서 SOTA 모델로 실시간 면접과 모의 면접을 무제한으로 - 월 {monthly}, 또는 연간 결제 시 월 {yearly}.',
  monthNoun: { one: '개월', other: '개월' },
  trialBadge: '새 계정: 1시간 무료',
  coinsBadge: '암호화폐만 - 카드, PayPal, 계좌 정보 불필요',
  prepaidBadge: '선불 - 자동 갱신 없음',

  tier: {
    caption: '무료 요금제와 구독 비교',
    whatYouGet: '제공 내용',
    trial: '무료',
    paid: '구독',
    included: '포함',
    duration: {
      label: '면접 시간',
      trial: '1시간, 1회',
      paid: '무제한',
    },
    model: { label: '제공 모델', trial: '무료 모델', paid: 'SOTA 모델' },
    live: '실시간 제안',
    triggered: '요청형 제안',
    mock: '채점 리포트가 있는 모의 면접',
    rateLimit: { label: '사용 제한', trial: '사실상 없음', paid: '사실상 없음' },
  },

  billing: {
    title: '결제 방식',
    free: '무료 1시간',
    freeText:
      '실시간 세션과 모의 세션은 시간을 분 단위로 씁니다. 시간이 다 되면 세션이 멈추지만, 모의 면접은 그래도 리포트를 줍니다.',
    paid: '구독',
    paidText:
      '1개월, 3개월, 1년 단위로 암호화폐로 한 번 결제합니다. 자동으로 갱신되는 것은 없습니다: 원할 때 이용권을 하나 더 사면, 그 기간이 현재 종료일 뒤에 더해집니다.',
  },

  plans: {
    free: '첫 1시간 동안 무료 모델로 앱의 모든 기능',
    monthly: 'SOTA 모델로 무제한 면접, 한 달씩',
    quarterly: 'SOTA 모델로 3개월간 무제한 면접',
    yearly: 'SOTA 모델로 꼬박 1년간 무제한 면접',
  },
  popular: '추천',
  save: '{percent}% 할인',
  planNames: { free: '무료', monthly: '월간', quarterly: '3개월', yearly: '연간' },
  perMonth: '/ 월',
  freeLine: '면접 1시간, 1회',
  billedAs: '{months}{monthNoun} 이용, {price} 일시불',
  features: {
    suggestions: '실시간 제안과 요청형 제안',
    mock: '채점 리포트가 있는 모의 면접',
    freeModel: '무료 모델',
    sotaModel: 'SOTA 모델, 사실상 사용 제한 없음',
    oneHour: '면접 시간 1시간',
    unlimited: '면접 시간 무제한',
    noRenewal: '자동 갱신 없음',
  },
  getStarted: '시작하기',
  startFree: '무료로 시작하기',
};
