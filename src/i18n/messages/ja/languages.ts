import type { Languages } from '../en/languages';

export const languages: Languages = {
  eyebrow: '対応言語',
  title: '{count} {noun}で面接',
  titleNoun: { one: '言語', other: '言語' },
  description:
    '面接で使う言語で練習し、採点を受け、レポートを出力できます。{count} 言語のうち {voices} 言語は AI 面接官が音声で質問します。',
  spokenBadge: '{voices} 言語は模擬面接官が音声で質問',
  writtenBadge: '{written} 言語は質問を文字で表示',
  spokenAria: '模擬面接の質問は音声で読み上げられます',
  writtenAria: '模擬面接の質問は文字で表示されます',
  showWritten: 'ほかの {written} 言語を表示',
  note: '音声のない言語でも、模擬面接は機能を削ったものではありません：面接官は質問を読み上げる代わりに文字で表示し、追加質問、採点、エクスポートするレポートは変わりません。アラビア語、ヘブライ語、ペルシャ語、ウルドゥー語などの右から左に書く文字は、アプリ全体で右から左に表示されます。',
  link: '模擬面接について詳しく',
};
