/**
 * Sample interview shown in the hero preview, one per language.
 *
 * Deliberately not a software question: the preview is the first evidence a
 * visitor sees that the product fits their job. Codes match
 * src/config/languages.ts. Non-English text wants a native-speaker pass.
 */
export interface HeroDemoLanguage {
  code: string;
  label: string;
  dir: 'ltr' | 'rtl';
  question: string;
  answer: string;
  strength: string;
  gap: string;
  hint: string;
  hintPoints: [string, string];
}

export const HERO_DEMO_SCORE = 82;
export const HERO_DEMO_QUESTION = { n: 3, total: 5 } as const;

export const HERO_DEMO_LANGUAGES: readonly HeroDemoLanguage[] = [
  {
    code: 'en',
    label: 'English',
    dir: 'ltr',
    question: 'Tell me about a time you turned around an unhappy customer.',
    answer:
      'Our largest client was ready to leave after a late delivery. I called them that day, agreed a recovery plan, and they renewed.',
    strength: 'Clear situation with a concrete result',
    gap: 'Add a number: how large was the contract?',
    hint: 'Lead with the outcome',
    hintPoints: ['The client renewed', 'You acted the same day'],
  },
  {
    code: 'es',
    label: 'Español',
    dir: 'ltr',
    question: 'Cuéntame una ocasión en la que recuperaste a un cliente insatisfecho.',
    answer:
      'Nuestro mayor cliente quería irse tras una entrega tardía. Lo llamé ese mismo día, acordamos un plan y renovó.',
    strength: 'Situación clara con un resultado concreto',
    gap: 'Añade una cifra: ¿de cuánto era el contrato?',
    hint: 'Empieza por el resultado',
    hintPoints: ['El cliente renovó', 'Actuaste el mismo día'],
  },
  {
    code: 'de',
    label: 'Deutsch',
    dir: 'ltr',
    question:
      'Erzählen Sie von einem Fall, in dem Sie einen unzufriedenen Kunden zurückgewonnen haben.',
    answer:
      'Unser größter Kunde wollte nach einer verspäteten Lieferung gehen. Ich rief noch am selben Tag an, wir vereinbarten einen Plan, und er verlängerte.',
    strength: 'Klare Situation mit konkretem Ergebnis',
    gap: 'Nennen Sie eine Zahl: Wie groß war der Vertrag?',
    hint: 'Beginnen Sie mit dem Ergebnis',
    hintPoints: ['Der Kunde verlängerte', 'Sie handelten am selben Tag'],
  },
  {
    code: 'fr',
    label: 'Français',
    dir: 'ltr',
    question: 'Parlez-moi d’une fois où vous avez reconquis un client mécontent.',
    answer:
      'Notre plus gros client voulait partir après un retard de livraison. Je l’ai appelé le jour même, nous avons convenu d’un plan et il a renouvelé.',
    strength: 'Situation claire et résultat concret',
    gap: 'Ajoutez un chiffre : quelle était la taille du contrat ?',
    hint: 'Commencez par le résultat',
    hintPoints: ['Le client a renouvelé', 'Vous avez agi le jour même'],
  },
  {
    code: 'pt',
    label: 'Português',
    dir: 'ltr',
    question: 'Conte sobre uma vez em que você reconquistou um cliente insatisfeito.',
    answer:
      'Nosso maior cliente queria sair após uma entrega atrasada. Liguei no mesmo dia, combinamos um plano e ele renovou.',
    strength: 'Situação clara com resultado concreto',
    gap: 'Inclua um número: qual era o tamanho do contrato?',
    hint: 'Comece pelo resultado',
    hintPoints: ['O cliente renovou', 'Você agiu no mesmo dia'],
  },
  {
    code: 'ru',
    label: 'Русский',
    dir: 'ltr',
    question: 'Расскажите о случае, когда вам удалось вернуть недовольного клиента.',
    answer:
      'Наш крупнейший клиент собирался уйти после задержки поставки. Я позвонил в тот же день, мы согласовали план, и он продлил договор.',
    strength: 'Ясная ситуация и конкретный результат',
    gap: 'Добавьте цифру: какой была сумма контракта?',
    hint: 'Начните с результата',
    hintPoints: ['Клиент продлил договор', 'Вы действовали в тот же день'],
  },
  {
    code: 'ar',
    label: 'العربية',
    dir: 'rtl',
    question: 'حدثني عن موقف استعدت فيه ثقة عميل غير راضٍ.',
    answer:
      'كان أكبر عملائنا على وشك المغادرة بعد تأخر في التسليم. اتصلت به في اليوم نفسه، واتفقنا على خطة، ثم جدد العقد.',
    strength: 'موقف واضح ونتيجة ملموسة',
    gap: 'أضف رقمًا: ما حجم العقد؟',
    hint: 'ابدأ بالنتيجة',
    hintPoints: ['جدد العميل العقد', 'تصرفت في اليوم نفسه'],
  },
  {
    code: 'hi',
    label: 'हिन्दी',
    dir: 'ltr',
    question: 'ऐसे समय के बारे में बताइए जब आपने एक नाराज़ ग्राहक को वापस जीता।',
    answer:
      'देर से डिलीवरी के बाद हमारा सबसे बड़ा ग्राहक जाने वाला था। मैंने उसी दिन फ़ोन किया, हमने एक योजना बनाई और उन्होंने अनुबंध बढ़ाया।',
    strength: 'स्पष्ट स्थिति और ठोस परिणाम',
    gap: 'एक संख्या जोड़ें: अनुबंध कितना बड़ा था?',
    hint: 'परिणाम से शुरू करें',
    hintPoints: ['ग्राहक ने अनुबंध बढ़ाया', 'आपने उसी दिन कदम उठाया'],
  },
  {
    code: 'ja',
    label: '日本語',
    dir: 'ltr',
    question: '不満を持つお客様との関係を立て直した経験を教えてください。',
    answer:
      '納品遅れで最大の取引先が離れかけていました。当日に電話して改善計画を合意し、契約を更新していただきました。',
    strength: '状況が明確で、具体的な成果がある',
    gap: '数字を加えましょう：契約の規模は？',
    hint: '結果から話す',
    hintPoints: ['契約が更新された', '当日に行動した'],
  },
  {
    code: 'ko',
    label: '한국어',
    dir: 'ltr',
    question: '불만이 있던 고객의 마음을 돌린 경험을 말씀해 주세요.',
    answer:
      '납품 지연으로 최대 고객사가 떠나려 했습니다. 당일 전화해 개선 계획에 합의했고 계약이 갱신되었습니다.',
    strength: '상황이 명확하고 성과가 구체적임',
    gap: '숫자를 더하세요: 계약 규모는 얼마였나요?',
    hint: '결과부터 말하기',
    hintPoints: ['고객이 계약을 갱신함', '당일 바로 대응함'],
  },
  {
    code: 'zh',
    label: '中文',
    dir: 'ltr',
    question: '请讲一次你挽回不满意客户的经历。',
    answer: '因交付延迟，我们最大的客户准备离开。我当天致电，商定了补救计划，客户最终续约。',
    strength: '情境清晰，结果具体',
    gap: '补充数字：合同规模有多大？',
    hint: '先说结果',
    hintPoints: ['客户完成续约', '你当天采取行动'],
  },
];
