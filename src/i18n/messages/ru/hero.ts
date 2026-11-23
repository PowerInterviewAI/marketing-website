import type { Hero } from '../en/hero';

export const hero: Hero = {
  title: 'Ошибайтесь здесь, а не на собеседовании.',
  subtitle:
    'Тренируйтесь вслух с ИИ-интервьюером на своём языке. Каждый ответ получает оценку и улучшения для любой работы, от продаж до лайв-кодинга.',
  free: '1 час бесплатно',
  noCard: 'Без банковской карты',
  secondary: 'Как это работает',

  trust: {
    platformsLabel: 'Платформы',
    platforms: 'Windows сейчас, macOS скоро',
    languagesLabel: 'Языки собеседования',
    voices: '{voices} языка с озвучкой',
    rolesLabel: 'Профессии',
    roles: 'Любая профессия, не только IT',
    privacyLabel: 'Конфиденциальность',
    privacy: 'Расшифровки нигде не сохраняются',
    badgeAlt: 'Рейтинг Power Interview AI на PeerPush',
  },

  download: {
    forWindows: 'Скачать для Windows',
    generic: 'Скачать',
    macosNotReady: 'Поддержка macOS пока не готова - мы активно над ней работаем.',
    windowsInstead: 'Скачать версию для Windows',
    allReleases: 'Все релизы',
    latest: 'последняя',
    windows: 'Windows',
    macosSoon: 'macOS (скоро)',
    macosSoonTitle: 'В активной разработке',
    free: 'Скачать бесплатно',
    stickyNote: '1 час бесплатно',
    mobileNote: 'Power Interview AI работает на компьютере с Windows.',
    shareLink: 'Отправить ссылку на ПК',
    copyLink: 'Скопировать ссылку для ПК',
    linkCopied: 'Ссылка скопирована',
    shareText: 'Скачать Power Interview AI на компьютер',
  },

  surface: {
    play: 'Воспроизвести демо',
    pause: 'Приостановить демо',
    previous: 'Предыдущее демо',
    next: 'Следующее демо',
    clips: 'Демо-ролики',
    preview: 'Предпросмотр собеседования',
    mock: 'Пробное собеседование',
    live: 'Живая помощь',
    sample: 'Пример',
    question: 'Вопрос {n} из {total}',
    interviewer: 'Интервьюер',
    you: 'Вы',
    score: 'Оценка',
    strength: 'Сильная сторона',
    gap: 'Улучшить',
    suggestion: 'Подсказка',
    language: 'Язык собеседования',
    yours: 'Язык вашего браузера',
    pauseLanguages: 'Приостановить показ языков',
    playLanguages: 'Запустить показ языков',
    allLanguages: 'Все языки ({count})',
  },
  demos: [
    {
      title: 'Помощник на живом собеседовании и умный экспорт',
      description: 'Мгновенные подсказки во время звонка и умный экспорт итогов и выводов',
    },
    {
      title: 'Задача по программированию - обход графа',
      description: 'Захватите условие с экрана и читайте решение в скрытом оверлее',
    },
    {
      title: 'Задача по программированию - компоненты связности',
      description: 'Несколько скриншотов дают ИИ полное условие, ограничения и сигнатуру',
    },
    {
      title: 'Задача по программированию - рекурсия по бинарному дереву',
      description: 'Прокручивайте код горячими клавишами - оверлей скрыт и не отбирает фокус',
    },
  ],

  install: {
    eyebrow: 'Установка',
    title: 'Три способа запустить',
    description:
      'Выберите, что вам удобнее. Команда в одну строку скачает последний релиз и сама запустит установщик.',
    tabCli: 'Командная строка',
    tabInstaller: 'Установщик',
    tabSource: 'Из исходников',
    windows: 'Windows',
    macos: 'macOS',
    copy: 'Скопировать команду установки',
    copied: 'Скопировано',
    macosReference:
      'Поддержка macOS пока не готова - мы активно над ней работаем. Команда оставлена для справки и может не привести к рабочей установке.',
    versionAgnostic:
      'Показана команда без привязки к версии - поиск релиза выполняется во время установки.',
    windowsInstaller: 'Установщик для Windows',
    latestRelease: 'последний релиз',
    macArm: 'macOS - Apple Silicon',
    macIntel: 'macOS - Intel',
    macosInstallersNotReady: 'Установщики для macOS пока не готовы - мы активно над ними работаем.',
    viewReleases: 'Все релизы на GitHub',
    sourceText: 'Склонируйте репозиторий и запустите из исходников. Требуется Node.js 22.15+.',
    viewBuild: 'Инструкция по сборке',
  },
};
