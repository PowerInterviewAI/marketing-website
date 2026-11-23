import type { Story } from '../en/story';

export const story: Story = {
  answer: {
    eyebrow: '模擬面接',
    title: 'より良い回答を、自分の経験から',
    description:
      '声に出して答えると、評価の理由を示し、あなたの経験をもとにより強い回答を作成します。',
    question: '厳しい納期に対応した経験を教えてください。',
    weakLabel: '最初の回答',
    strongLabel: '改善後の回答',
    weak: '以前、納期が厳しいことがありましたが、チームで頑張って最後は間に合いました。',
    strong:
      '顧客がリリースを 2 週間早めた際、範囲を必須の 3 機能に絞り、2 名を再配置して、新しい期日に納品しました。',
    scoreLabel: '回答スコア',
    replay: 'もう一度',
    points: ['質問ごとに採点', '浅い回答には追加質問', 'DOCX / Markdown で出力'],
  },
  roles: {
    eyebrow: 'あらゆる職種',
    title: 'あなたの職種に、あなたの質問を。',
    description: '履歴書と求人情報を追加すると、志望職種に合わせた質問を作成します。',
    sample: '質問の例',
    items: {
      developer: {
        label: '開発者',
        question: '公開 API のレート制限をどう設計しますか？',
      },
      sales: {
        label: '営業',
        question: '四半期末前に停滞した商談をどう立て直しますか？',
      },
      nurse: {
        label: '看護師',
        question: '2 人の患者に同時に呼ばれたら、どう優先順位をつけますか？',
      },
      teacher: {
        label: '教師',
        question: '授業に遅れた生徒をどう支援しますか？',
      },
      finance: {
        label: '財務',
        question: '予測が外れた経験と、そこで変えたことを教えてください。',
      },
    },
  },
  coding: {
    eyebrow: '開発者向け',
    title: 'ライブコーディング面接に備える',
    description: 'コーディング問題をステップごとの解説に変え、面接官に伝わる説明を練習できます。',
    steps: [
      {
        title: '問題をキャプチャ',
        body: '問題文、制約、例のスクリーンショットを最大 4 枚追加します。',
      },
      {
        title: '解法を確認',
        body: '構文ハイライト付きの解答案が表示されます。',
      },
      {
        title: '自分で説明',
        body: 'ロジック、境界条件、計算量を自分の言葉で話せるまで練習します。',
      },
    ],
    panel: 'コードの提案',
    approachLabel: '解法',
    approach: '開始位置でソートし、直前と重なる区間を順に統合します。',
    complexityLabel: '計算量',
    note: '練習用、または AI ツールが許可された面接でご利用ください。各企業のルールを必ず守ってください。',
    cta: 'コーディング面接を練習',
  },
  checker: {
    label: '自分の言語に対応していますか？',
    placeholder: '言語を入力（例: タミル語、தமிழ்）',
    voice: '音声とテキスト',
    written: 'テキストの質問',
    none: '見つかりません。英語名または現地語名で検索してください。',
  },
};
