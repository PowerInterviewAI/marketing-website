import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: '요금',
  title: '1시간 무료, 그다음은 무제한',
  description:
    '무료 모델로 1시간 무료로 시작하세요. 더 필요하면 구독해서 SOTA 모델로 실시간 면접과 모의 면접을 무제한으로 - 월 {monthly}, 또는 연간 결제 시 월 {yearly}.',
  monthNoun: { one: '개월', other: '개월' },
  coinsBadge: '암호화폐만 - 카드, PayPal, 계좌 정보 불필요',

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
    free: '모든 기능 체험',
    monthly: '곧 있을 면접에',
    quarterly: '적극적인 구직 활동에',
    yearly: '장기 구직 활동에',
  },
  included: { every: '모든 요금제 포함', paid: '유료 요금제 혜택' },
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
