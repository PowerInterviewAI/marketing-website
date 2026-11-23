import type { MockInterview } from '../en/mockInterview';

export const mockInterview: MockInterview = {
  eyebrow: 'Entrevista de práctica',
  title: 'Ensaya la entrevista antes de hacerla',
  description:
    'Una entrevista de práctica hablada dentro de la misma aplicación de escritorio. Pregunta, respondes en voz alta y te devuelve un informe puntuado sobre lo que dijiste de verdad.',
  steps: [
    {
      title: 'Elige el formato',
      body: 'Nivel de júnior a staff, dificultad y 3, 5, 8 o 12 preguntas. Nada más que rellenar: la entrevista se construye con el CV y la descripción del puesto que ya tienes en tu cuenta, los mismos que lee el asistente en directo.',
    },
    {
      title: 'El entrevistador habla',
      body: 'Preguntas de comportamiento, técnicas, situacionales y de cierre, formuladas en voz alta en tu idioma de entrevista. Una respuesta pobre provoca hasta dos repreguntas sobre la misma pregunta, como haría un entrevistador real.',
    },
    {
      title: 'Respondes en voz alta',
      body: 'Tu micrófono se transcribe mientras hablas y avanzas cuando estés listo. Las sugerencias del asistente en directo están desactivadas salvo que las actives: la idea es que seas tú quien piense.',
    },
    {
      title: 'Recibes una evaluación',
      body: 'Una puntuación global con tus fortalezas y carencias y, después, cada pregunta puntuada por separado, con el porqué y una versión más sólida de tu respuesta.',
    },
  ],
  headphones: {
    badge: 'Auriculares',
    text: 'Úsalos en una entrevista de práctica. Con altavoces, el final de una pregunta hablada puede colarse al principio de la respuesta que transcribe tu micrófono.',
  },
  details: {
    scored: {
      title: 'Puntuada con tu propio material',
      body: 'Las preguntas y la puntuación usan el perfil y el contexto del puesto guardados en tu cuenta, así que la práctica ensaya el puesto al que de verdad te presentas.',
    },
    languages: {
      title: 'Los {count} {noun}',
      body: 'Un solo ajuste sirve para el asistente en directo y para la práctica. En {voices} de ellos el entrevistador habla en voz alta; donde no hay voz disponible, escribe sus preguntas, y las repreguntas y la puntuación no cambian.',
    },
    pricing: {
      title: 'Ilimitada con una suscripción',
      body: 'Una suscripción cubre las entrevistas de práctica y en directo, sin límite en ninguna. Con la hora gratis, una práctica la consume por minutos y, si se acaba, la entrevista termina ahí y aun así recibes tu informe.',
    },
    report: {
      title: 'El informe es tuyo',
      body: 'Expórtalo como DOCX o Markdown, en el idioma de tu entrevista, y guárdalo junto a las notas de tus llamadas reales.',
    },
  },
  cta: 'Practica antes de la real',
  guide: 'Leer la guía de la entrevista de práctica',
  cost: 'Lo que cuesta una sesión',
};
