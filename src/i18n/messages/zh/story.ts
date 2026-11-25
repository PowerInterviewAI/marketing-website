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
  modes: {
    eyebrow: '一个应用，两种模式',
    title: '面试前，也在面试中',
    description: '与会给你打分的 AI 面试官练习，真正通话时开着实时帮助。用其中一个，或两个都用。',
    sample: '示例',
    shared: '两种模式读取同一份简历和职位描述，任何订阅都可无限使用。',
    mock: {
      tag: '面试前',
      title: '模拟面试',
      body: 'AI 面试官开口提问，对单薄的回答追问，并为每个回答打分。',
      points: ['按你的岗位和级别出题', '每题最多两次追问', '带评分和更优回答的报告'],
      link: '了解模拟面试',
    },
    live: {
      tag: '面试中',
      title: '实时面试',
      body: '通话进行时，在 Zoom、Google Meet 或 Teams 旁显示实时转写和简短要点。',
      points: ['通话双方都会转写', '基于你简历的建议', '通过截图获得编程帮助'],
      link: '了解实时帮助',
    },
  },
  live: {
    eyebrow: '实时面试',
    title: '通话进行时，给你回答要点',
    description:
      '应用听取通话双方，并在旁边显示简短、相关的要点，内容来自你的简历和所申请的职位。不会有机器人加入会议。',
    points: [
      {
        title: '双方声音都转写',
        body: '你的麦克风和通话音频，按说话人实时标注。',
      },
      {
        title: '来自你经历的建议',
        body: '每条建议都基于你的简历和职位描述，而不是泛泛之谈。',
      },
      {
        title: '通话中切换语言',
        body: '建议立即跟随切换，{count} 种语言任选。',
      },
      {
        title: '导出会话',
        body: '将摘要、转写和所有建议保存为 Word 或 Markdown。',
      },
    ],
    imageAlt: '示例实时会话中的 Power Interview AI：实时转写上方显示建议的回答要点',
    caption: '在真实应用中使用预设数据录制的示例会话。',
    cta: '免费试用实时帮助',
    note: '请仅在允许使用 AI 工具的面试中使用实时帮助。请始终遵守各雇主的规定。',
  },
  roles: {
    eyebrow: '任何岗位',
    title: '你的岗位，你的问题。',
    description: '添加简历和职位描述，每个问题都为你想要的岗位而写。',
    sample: '示例问题',
    controls: {
      previous: '上一个岗位',
      next: '下一个岗位',
      pause: '暂停幻灯片',
      play: '播放幻灯片',
      slide: '第 {n} 个，共 {total} 个',
    },
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
  notes: {
    eyebrow: '面试笔记',
    title: '笔记自动生成',
    description:
      '说话时无需手动记录。通话结束后，应用会把转写内容整理成结构化笔记，让你记得被问了什么，也知道下一步该做什么。',
    points: [
      { title: 'AI 通话摘要', body: '讨论了什么、你的优势、需要改进的地方以及后续步骤。' },
      { title: '完整转写', body: '对话中的每一句话，都标注说话人和时间。' },
      { title: '保留所有建议', body: '你看到的要点，与各自回答的问题并列保存。' },
      { title: 'Word 或 Markdown', body: '停止会话时会提示保存，也可以随时从工具栏导出。' },
    ],
    panel: '面试笔记',
    sampleLabel: '示例',
    sample: {
      title: '客户成功经理面试 - Alex Rivera',
      date: '日期/时间：2026/3/12 05:21',
      summaryHeading: '摘要',
      summary: '讨论了客户挽回、续约规划和升级处理。回答具体，先讲结果。',
      strengths: { heading: '主要优势', items: ['结果先行，案例清晰', '跟进迅速且用心'] },
      nextSteps: { heading: '后续步骤', items: ['发送恢复计划示例', '准备续约相关指标'] },
      transcriptHeading: '转写',
      transcript: [
        { speaker: '面试官', text: '请讲一次你挽回不满意客户的经历。' },
        {
          speaker: 'Alex Rivera',
          text: '我们最大的客户因交付延迟很不满。我当天就打了电话，并商定了恢复计划。',
        },
      ],
    },
    caption: '使用预设数据的示例笔记。',
    cta: '下次通话即可获得笔记',
    note: '笔记来自实时会话：仅在允许使用 AI 工具的面试中使用，并始终遵守各雇主的规定。',
  },
  checker: {
    label: '支持我的语言吗？',
    placeholder: '输入语言，例如 泰米尔语 或 தமிழ்',
    voice: '语音和文字',
    written: '文字问题',
    none: '未找到。请尝试英文名称或本地名称。',
  },
  showcase: {
    eyebrow: '走进应用',
    title: '这里的每个界面都是真实应用',
    body: '设置、个人资料、模拟面试、实时建议、评分报告和导出，均在桌面应用中使用示例数据截取。',
    link: '浏览文档',
    sample: '真实界面，示例数据',
  },
};
