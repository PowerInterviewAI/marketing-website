import type { Story } from '../en/story';

export const story: Story = {
  answer: {
    eyebrow: '模拟面试',
    title: '听听更好的回答是什么样',
    description: '开口作答后，报告会说明评分原因，并根据你的经历写出更有力的版本。',
    question: '请讲一次你应对紧迫截止日期的经历。',
    weakLabel: '第一次回答',
    strongLabel: '改进后的回答',
    weak: '有一次时间很紧，团队非常努力，最后还是完成了。',
    strong:
      '客户将上线提前两周时，我把范围缩减到三个核心功能，调配了两名同事，并按新日期完成交付。',
    scoreLabel: '回答评分',
    replay: '重播',
    points: ['逐题评分', '回答单薄时继续追问', '导出 DOCX 或 Markdown'],
  },
  roles: {
    eyebrow: '任何岗位',
    title: '你的岗位，你的问题。',
    description: '添加简历和职位描述，每个问题都为你想要的岗位而写。',
    sample: '示例问题',
    items: {
      developer: {
        label: '开发',
        question: '你会如何为公共 API 设计限流器？',
      },
      sales: {
        label: '销售',
        question: '季度末前客户突然没了回应，你会如何挽回？',
      },
      nurse: {
        label: '护理',
        question: '两位患者同时需要你时，你如何安排优先级？',
      },
      teacher: {
        label: '教师',
        question: '你如何帮助落后于全班的学生？',
      },
      finance: {
        label: '财务',
        question: '请讲一次预测出错的经历，以及你做出的改变。',
      },
    },
  },
  coding: {
    eyebrow: '面向开发者',
    title: '准备现场编程面试',
    description: '把任何编程题变成分步讲解，并练习按面试官期待的方式讲清思路。',
    steps: [
      {
        title: '截取题目',
        body: '最多添加四张题目、约束和示例的截图。',
      },
      {
        title: '查看思路',
        body: '获得带语法高亮的参考解法。',
      },
      {
        title: '自己讲解',
        body: '讲清逻辑、边界情况和复杂度，直到真正掌握。',
      },
    ],
    panel: '代码建议',
    approachLabel: '思路',
    approach: '按起点排序，然后依次合并与上一个区间重叠的区间。',
    complexityLabel: '复杂度',
    note: '请用于练习，或用于允许使用 AI 工具的面试。请始终遵守各雇主的规定。',
    cta: '练习编程面试',
  },
  checker: {
    label: '支持我的语言吗？',
    placeholder: '输入语言，例如 泰米尔语 或 தமிழ்',
    voice: '语音和文字',
    written: '文字问题',
    none: '未找到。请尝试英文名称或本地名称。',
  },
};
