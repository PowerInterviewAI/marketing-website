import type { Features } from '../en/features';

export const features: Features = {
  eyebrow: 'Funciones',
  title: 'Todo lo que necesita el ensayo, y todo lo que la llamada no puede ver',
  description:
    'Cada función, etiquetada con la mitad de la aplicación a la que pertenece: la entrevista de práctica en la que ensayas, la entrevista en directo que haces después, o ambas. Funciona con tu propio CV y la descripción del puesto, así que el puesto puede ser cualquiera: la ayuda con código es una función entre nueve, no el objetivo de la aplicación.',
  scope: { mock: 'Entrevista de práctica', live: 'Entrevista en directo', both: 'Ambas' },
  cta: 'Descargar gratis',
  mock: {
    title: 'Entrevista de práctica',
    description:
      'Un entrevistador de IA que **formula sus preguntas en voz alta**, insiste ante una respuesta pobre y puntúa cada una de las tuyas según tu CV y la descripción del puesto. Preguntas de comportamiento, técnicas, situacionales y de cierre, escritas para el puesto que pegaste: una plaza de enfermería o de ventas igual que una de ingeniería. Exporta el informe como DOCX o Markdown.',
    link: 'Cómo funcionan las entrevistas de práctica',
  },
  transcription: {
    title: 'Transcripción en directo',
    description:
      'Transcripción de doble canal con detección automática del hablante e historial completo de la conversación. Cambia de micrófono **en plena entrevista** sin detener la sesión: sin huecos en la transcripción y sin nada que reiniciar.',
  },
  stealth: {
    title: 'Modo sigiloso',
    description:
      'Trabaja con discreción con atajos de teclado, control de opacidad y posicionamiento inteligente de la ventana. La ventana **no aparece en las capturas de pantalla** y sigue invisible al compartir la pantalla completa.',
  },
  languages: {
    title: '{count} {noun}',
    description:
      'Un solo ajuste controla las tres cosas: qué modelo de voz transcribe la llamada, en qué idioma llegan tus sugerencias y el idioma de tu informe exportado. Cámbialo **en plena entrevista**, no solo antes de empezar. Soporte completo de derecha a izquierda para árabe, hebreo, persa, urdu y otras escrituras, y en **{voices}** de ellos el entrevistador de práctica habla en voz alta.',
    link: 'Ver los {count} idiomas',
  },
  suggestions: {
    title: 'Sugerencias de respuesta con IA',
    description:
      'Respuestas personalizadas y contextuales basadas en tu CV, la descripción del puesto y **todo el historial de la conversación**. Las sugerencias se adaptan a tu forma de comunicarte para que cuentes tu propia experiencia en lugar de leer consejos genéricos. Activa el **modo profesional** para ver pistas de un vistazo (un titular y palabras clave) en lugar de frases completas.',
  },
  code: {
    title: 'Sugerencias de código',
    description:
      'Para las entrevistas con ronda técnica: análisis de capturas con soluciones generadas por LLM para problemas de programación, con resaltado de sintaxis. **Opcional**: el resto del asistente en directo funciona igual en una entrevista en la que nunca aparece código.',
  },
  export: {
    title: 'Exportación de notas con IA',
    description:
      '**Exportación inteligente de reuniones** para entrevistas, entrevistas de práctica y videollamadas. Resúmenes con IA, tareas, transcripciones con hablantes identificados y notas de seguimiento. Exporta a **DOCX** para compartir fácilmente con personas y equipos.',
  },
  plans: {
    title: 'Todos los planes, todas las funciones',
    description:
      'Ninguna función está tras un muro de pago. La hora gratis ejecuta toda la aplicación con el **modelo gratuito**: sugerencias en directo, sugerencias a petición y entrevistas de práctica. Una suscripción te pasa al **modelo SOTA** con tiempo de entrevista ilimitado.',
  },
  privacy: {
    title: 'La privacidad primero',
    description:
      'Las transcripciones nunca se conservan después de tu sesión, ni de una entrevista de práctica ni de una llamada real. Sin minería de datos y con control total sobre tu información.',
  },
};
