import type { Story } from '../en/story';

export const story: Story = {
  answer: {
    eyebrow: 'Entrevista simulada',
    title: 'Escucha cómo suena una respuesta mejor',
    description:
      'Responde en voz alta. El informe explica por qué funcionó o no tu respuesta y escribe una versión mejor con tu propia experiencia.',
    question: 'Háblame de una ocasión con un plazo difícil.',
    weakLabel: 'Tu primer intento',
    strongLabel: 'Respuesta mejorada',
    weak: 'Una vez tuvimos un plazo ajustado, así que el equipo trabajó mucho y al final lo conseguimos.',
    strong:
      'Cuando un cliente adelantó el lanzamiento dos semanas, reduje el alcance a las tres funciones clave, reasigné a dos personas y entregamos en la nueva fecha.',
    scoreLabel: 'Puntuación',
    replay: 'Repetir',
    points: [
      'Puntuación por pregunta',
      'Repreguntas si falta detalle',
      'Exporta en DOCX o Markdown',
    ],
  },
  tour: {
    eyebrow: 'El recorrido completo',
    title: 'Todo en 90 segundos',
    description:
      'Entrevistas simuladas, ayuda en vivo, pruebas de código y el informe inteligente tras la llamada, narrado en inglés. Las pantallas de la app son reales con datos de ejemplo; las personas son ficticias.',
    play: 'Reproducir el recorrido de 90 segundos',
    sample: 'Ejemplo',
  },
  modes: {
    eyebrow: 'Una app, dos modos',
    title: 'Antes de la entrevista y durante ella',
    description:
      'Practica con un entrevistador de IA que te puntúa y deja abierta la ayuda en directo en la llamada real. Usa uno o los dos.',
    sample: 'Ejemplo',
    shared:
      'Los dos modos leen el mismo CV y la misma oferta, y ambos son ilimitados con cualquier suscripción.',
    mock: {
      tag: 'Antes',
      title: 'Entrevista simulada',
      body: 'Un entrevistador de IA hace sus preguntas en voz alta, insiste en las respuestas flojas y puntúa cada una.',
      points: [
        'Preguntas escritas para tu puesto y nivel',
        'Hasta dos repreguntas por pregunta',
        'Un informe puntuado con una respuesta mejor para cada una',
      ],
      link: 'Cómo funciona la entrevista simulada',
    },
    live: {
      tag: 'Durante',
      title: 'Entrevista en directo',
      body: 'Transcripción en directo y puntos clave breves junto a Zoom, Google Meet o Teams mientras transcurre la llamada.',
      points: [
        'Las dos partes de la llamada, transcritas',
        'Sugerencias basadas en tu propio CV',
        'Ayuda con código a partir de una captura',
      ],
      link: 'Cómo funciona la ayuda en directo',
    },
  },
  live: {
    eyebrow: 'Entrevista en directo',
    title: 'Puntos clave mientras transcurre la llamada',
    description:
      'La app escucha a las dos partes de la llamada y muestra al lado puntos breves y relevantes, sacados de tu CV y del puesto al que aspiras. Ningún bot se une a la reunión.',
    points: [
      {
        title: 'Las dos voces, transcritas',
        body: 'Tu micrófono y el audio de la llamada, etiquetados por persona mientras habláis.',
      },
      {
        title: 'Sugerencias desde tu experiencia',
        body: 'Cada una se basa en tu CV y en la oferta, no en consejos genéricos.',
      },
      {
        title: 'Cambia de idioma en plena llamada',
        body: 'Las sugerencias cambian al instante, en cualquiera de los {count} idiomas.',
      },
      {
        title: 'Exporta la sesión',
        body: 'Guarda un resumen, la transcripción y cada sugerencia en Word o Markdown.',
      },
    ],
    imageAlt:
      'Power Interview AI en una sesión de ejemplo: puntos clave sugeridos sobre la transcripción en directo',
    caption: 'Sesión de ejemplo grabada en la app real con datos preparados.',
    cta: 'Prueba gratis la ayuda en directo',
    note: 'Usa la ayuda en directo solo en entrevistas que permitan herramientas de IA. Sigue siempre las normas de cada empresa.',
  },
  roles: {
    eyebrow: 'Cualquier trabajo',
    title: 'Tu puesto. Tus preguntas.',
    description: 'Añade tu CV y la oferta. Cada pregunta se escribe para el puesto que quieres.',
    sample: 'Pregunta de ejemplo',
    controls: {
      previous: 'Puesto anterior',
      next: 'Puesto siguiente',
      pause: 'Pausar presentación',
      play: 'Reproducir presentación',
      slide: '{n} de {total}',
    },
    items: {
      developer: {
        label: 'Desarrollo',
        question: '¿Cómo diseñarías un limitador de peticiones para una API pública?',
      },
      sales: {
        label: 'Ventas',
        question: '¿Cómo recuperarías una venta que se ha enfriado antes del cierre del trimestre?',
      },
      nurse: {
        label: 'Enfermería',
        question: '¿Cómo priorizas la atención cuando dos pacientes te necesitan a la vez?',
      },
      teacher: {
        label: 'Docencia',
        question: '¿Cómo apoyas a un alumno que se ha quedado atrás?',
      },
      finance: {
        label: 'Finanzas',
        question: 'Cuéntame una previsión que falló y qué cambiaste.',
      },
    },
  },
  coding: {
    eyebrow: 'Para desarrolladores',
    title: 'Prepárate para la prueba de código en directo',
    description:
      'Convierte cualquier problema en una solución guiada y practica cómo explicarla como espera un entrevistador.',
    steps: [
      {
        title: 'Captura el problema',
        body: 'Añade hasta cuatro capturas del enunciado, las restricciones y los ejemplos.',
      },
      {
        title: 'Ve el enfoque',
        body: 'Recibe una solución sugerida con código resaltado.',
      },
      {
        title: 'Explícalo tú',
        body: 'Repasa la lógica, los casos límite y la complejidad hasta dominarlos.',
      },
    ],
    panel: 'Sugerencia de código',
    approachLabel: 'Enfoque',
    approach: 'Ordena por inicio y fusiona cada intervalo que se solape con el último.',
    complexityLabel: 'Complejidad',
    note: 'Úsalo para practicar y en entrevistas que permitan herramientas de IA. Sigue siempre las normas de cada empresa.',
    cta: 'Practicar entrevistas de código',
  },
  notes: {
    eyebrow: 'Notas de la entrevista',
    title: 'Tus notas se escriben solas',
    description:
      'Nada que teclear mientras hablas. Al terminar la llamada, la app convierte la transcripción en notas estructuradas para que recuerdes qué te preguntaron y sepas qué hacer después.',
    points: [
      {
        title: 'Un resumen de la llamada con IA',
        body: 'De qué se habló, dónde destacaste, qué mejorar y los próximos pasos.',
      },
      {
        title: 'La transcripción completa',
        body: 'Cada línea de la conversación, con el hablante y la hora.',
      },
      {
        title: 'Todas las sugerencias guardadas',
        body: 'Los puntos clave que viste, junto a la pregunta que respondía cada uno.',
      },
      {
        title: 'Word o Markdown',
        body: 'Se ofrece al detener la sesión, o expórtalo cuando quieras desde la barra de herramientas.',
      },
    ],
    panel: 'Notas de la entrevista',
    sampleLabel: 'Ejemplo',
    sample: {
      title: 'Entrevista para Customer Success Manager - Alex Rivera',
      date: 'Fecha/Hora: 12/3/2026, 5:21',
      summaryHeading: 'Resumen',
      summary:
        'Se habló de recuperar cuentas, planificar renovaciones y gestionar escalados. Respuestas concretas que empezaban por el resultado.',
      strengths: {
        heading: 'Puntos fuertes',
        items: ['Ejemplos claros, resultado primero', 'Seguimiento rápido y personal'],
      },
      nextSteps: {
        heading: 'Próximos pasos',
        items: ['Enviar el ejemplo de plan de recuperación', 'Preparar métricas de renovación'],
      },
      transcriptHeading: 'Transcripción',
      transcript: [
        {
          speaker: 'Entrevistador',
          text: 'Cuénteme una ocasión en la que recuperó a un cliente insatisfecho.',
        },
        {
          speaker: 'Alex Rivera',
          text: 'Nuestro mayor cliente estaba molesto por una entrega tardía. Lo llamé ese mismo día y acordamos un plan de recuperación.',
        },
      ],
    },
    caption: 'Notas de ejemplo con datos preparados.',
    cta: 'Obtén notas de tu próxima llamada',
    note: 'Las notas salen de una sesión en vivo: úsala solo en entrevistas que permitan herramientas de IA y sigue siempre las normas de cada empresa.',
  },
  checker: {
    label: '¿Está disponible mi idioma?',
    placeholder: 'Escribe un idioma, como tamil o தமிழ்',
    voice: 'Hablado y escrito',
    written: 'Preguntas escritas',
    none: 'Sin resultados. Prueba con el nombre en inglés o nativo.',
  },
  showcase: {
    eyebrow: 'Dentro de la app',
    title: 'Cada pantalla que ves es la app real',
    body: 'La configuración, tu perfil, la entrevista de práctica, las sugerencias en vivo, el informe con puntuación y la exportación, capturados en la app de escritorio con datos de ejemplo.',
    link: 'Ver la documentación',
    sample: 'Pantallas reales, datos de ejemplo',
  },
};
