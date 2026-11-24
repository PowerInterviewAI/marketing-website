import type { Languages } from '../en/languages';

export const languages: Languages = {
  eyebrow: '支持语言',
  title: '支持 {count} {noun}的面试',
  titleNoun: { one: '种语言', other: '种语言' },
  description:
    '用面试语言练习、获得评分并导出报告。在 {count} 种语言中，AI 面试官可语音朗读其中 {voices} 种。',
  spokenBadge: '{voices} 种语言由模拟面试官说出',
  writtenBadge: '{written} 种语言以文字显示问题',
  spokenAria: '模拟面试问题会被大声读出',
  writtenAria: '模拟面试问题以文字显示',
  showWritten: '显示其余 {written} 种语言',
  note: '没有语音的语言依然是完整的模拟面试，而不是缩水版：面试官以文字显示问题而不是读出来，追问、评分和导出报告都不变。阿拉伯语、希伯来语、波斯语、乌尔都语等从右到左书写的文字，在整个应用中都从右到左显示。',
  link: '进一步了解模拟面试',
};
