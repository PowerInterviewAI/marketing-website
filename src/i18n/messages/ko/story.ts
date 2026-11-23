import type { Story } from '../en/story';

export const story: Story = {
  answer: {
    eyebrow: '모의 면접',
    title: '더 나은 답변이 어떻게 들리는지 확인하세요',
    description:
      '소리 내어 답하면 평가 이유를 보여 주고, 내 경험을 바탕으로 더 강한 답변을 작성합니다.',
    question: '어려운 마감을 처리한 경험을 말씀해 주세요.',
    weakLabel: '첫 번째 시도',
    strongLabel: '개선된 답변',
    weak: '마감이 빠듯한 적이 있었는데, 팀이 열심히 해서 결국 해냈습니다.',
    strong:
      '고객이 출시를 2주 앞당겼을 때 범위를 핵심 기능 3개로 줄이고 2명을 재배치해 새 일정에 맞춰 출시했습니다.',
    scoreLabel: '답변 점수',
    replay: '다시 보기',
    points: ['질문별 점수', '부족한 답변에 후속 질문', 'DOCX 또는 Markdown 내보내기'],
  },
  roles: {
    eyebrow: '모든 직무',
    title: '내 직무, 내 질문.',
    description: '이력서와 채용 공고를 추가하면 원하는 직무에 맞는 질문을 만듭니다.',
    sample: '예시 질문',
    items: {
      developer: {
        label: '개발자',
        question: '공개 API의 요청 제한 기능을 어떻게 설계하시겠습니까?',
      },
      sales: {
        label: '영업',
        question: '분기 말 전에 멈춘 거래를 어떻게 되살리시겠습니까?',
      },
      nurse: {
        label: '간호사',
        question: '두 환자가 동시에 필요로 할 때 어떻게 우선순위를 정하십니까?',
      },
      teacher: {
        label: '교사',
        question: '수업을 따라오지 못하는 학생을 어떻게 지원하십니까?',
      },
      finance: {
        label: '재무',
        question: '예측이 틀렸던 경험과 무엇을 바꿨는지 말씀해 주세요.',
      },
    },
  },
  coding: {
    eyebrow: '개발자용',
    title: '라이브 코딩 면접을 준비하세요',
    description:
      '코딩 문제를 단계별 풀이로 바꾸고, 면접관이 기대하는 방식으로 설명하는 연습을 하세요.',
    steps: [
      {
        title: '문제 캡처',
        body: '문제, 제약 조건, 예시의 스크린샷을 최대 4장 추가합니다.',
      },
      {
        title: '접근법 확인',
        body: '구문 강조가 적용된 풀이 제안을 받습니다.',
      },
      {
        title: '직접 설명',
        body: '로직, 예외 상황, 복잡도를 내 말로 설명할 때까지 연습합니다.',
      },
    ],
    panel: '코드 제안',
    approachLabel: '접근법',
    approach: '시작점으로 정렬한 뒤 이전 구간과 겹치는 구간을 병합합니다.',
    complexityLabel: '복잡도',
    note: '연습용 또는 AI 도구가 허용된 면접에서 사용하세요. 각 기업의 규칙을 항상 지켜 주세요.',
    cta: '코딩 면접 연습하기',
  },
  checker: {
    label: '내 언어를 지원하나요?',
    placeholder: '언어 입력 (예: 타밀어, தமிழ்)',
    voice: '음성 및 텍스트',
    written: '텍스트 질문',
    none: '결과가 없습니다. 영어 또는 현지 이름으로 검색해 보세요.',
  },
};
