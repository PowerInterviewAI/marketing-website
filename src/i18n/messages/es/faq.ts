import type { Faq } from '../en/faq';

export const faq: Faq = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Preguntas frecuentes',
  description: 'Todo lo que conviene saber antes de instalar.',
  categories: {
    gettingStarted: 'Primeros pasos',
    product: 'Producto',
    privacy: 'Privacidad y datos',
    billing: 'Planes y facturación',
  },
  stillQuestions: '¿Más preguntas?',
  contact: 'Contáctanos',
  items: [
    {
      question: '¿Es legal usar Power Interview AI?',
      category: 'gettingStarted',
      answer:
        'Power Interview AI está pensado para fines legítimos de formación y preparación de entrevistas. Aun así, eres responsable de que tu uso cumpla las leyes aplicables y las condiciones de servicio de las plataformas que utilices. Úsalo siempre de forma ética y legal.',
    },
    {
      question: '¿Puedo practicar con una entrevista de práctica?',
      category: 'product',
      answer:
        'Sí, y se hace dentro de la aplicación, sin enviarte a otra herramienta. Elige un nivel, una dificultad y una duración de 3, 5, 8 o 12 preguntas, y un entrevistador de IA formula sus preguntas en voz alta en tu idioma de entrevista, repregunta hasta dos veces cuando una respuesta deja algo abierto y escucha mientras respondes por el micrófono. Las preguntas y la puntuación usan el CV y la descripción del puesto guardados en tu cuenta. Al final recibes una puntuación global con fortalezas y carencias, además de cada pregunta puntuada por separado con su justificación y una versión más sólida de tu respuesta, exportable como DOCX o Markdown.',
    },
    {
      question: '¿Cómo funciona la protección de la privacidad?',
      category: 'privacy',
      answer:
        'La configuración de tu entrevista (nombre completo, perfil/CV y contexto) se guarda en tu cuenta para que te acompañe en todos tus dispositivos. Las transcripciones y capturas se envían a nuestros servicios de IA cuando pides una sugerencia, y las transcripciones nunca se guardan en nuestros servidores: solo existen mientras dura tu sesión. Tu token de sesión y los ajustes del dispositivo se quedan en tu equipo. Nunca vendemos ni compartimos tu información personal.',
    },
    {
      question: '¿Qué modelo de IA genera las sugerencias?',
      category: 'product',
      answer:
        'El modelo lo ponemos nosotros: no hay nada que conectar ni configurar. Las cuentas nuevas usan nuestro modelo gratuito durante su hora gratis, y una suscripción te pasa a nuestro modelo SOTA sin límite de uso en la práctica.',
    },
    {
      question: '¿Qué plataformas son compatibles?',
      category: 'gettingStarted',
      answer:
        'Power Interview AI funciona hoy en Windows. La compatibilidad con macOS está en desarrollo.',
    },
    {
      question: '¿En qué idiomas puedo hacer entrevistas?',
      category: 'product',
      answer:
        'En 97, del inglés, el español, el chino y el hindi al cantonés, el suajili, el persa y el tamil. La lista completa está en la sección Idiomas de la página de inicio, y el selector de idioma de la aplicación tiene un buscador. En 44 de ellos el entrevistador de práctica habla en voz alta y en el resto escribe sus preguntas. Un solo ajuste decide qué modelo de voz transcribe la llamada, en qué idioma llegan tus sugerencias y en qué idioma se exporta tu informe. Puedes cambiarlo en plena entrevista: la transcripción se reconecta en el nuevo idioma y las sugerencias cambian al instante. El árabe, el hebreo, el persa, el urdu y las demás escrituras de derecha a izquierda se muestran de derecha a izquierda en todo momento.',
    },
    {
      question: '¿Necesito un hardware especial para usar Power Interview AI?',
      category: 'gettingStarted',
      answer:
        'Power Interview AI funciona en la mayoría de los ordenadores Windows modernos sin hardware especial. Una conexión estable mejora la calidad de la transmisión.',
    },
    {
      question: '¿Qué precisión tiene la transcripción con IA?',
      category: 'product',
      answer:
        'Nuestra transcripción en tiempo real usa reconocimiento automático del habla (ASR) avanzado con soporte de doble canal y detección del hablante. La precisión depende de la calidad del audio, pero funciona de maravilla en entrevistas típicas con un audio claro.',
    },
    {
      question: '¿Puedo usarlo en entrevistas de programación?',
      category: 'product',
      answer:
        'Sí. Captura hasta cuatro pantallas de un problema de código para obtener un enfoque sugerido y código resaltado. Úsalo para practicar cómo explicar soluciones y en entrevistas que permitan herramientas de IA.',
    },
    {
      question: '¿Puedo usarlo durante una entrevista real?',
      category: 'privacy',
      answer:
        'La ayuda en directo puede funcionar junto a Zoom, Google Meet o Teams, pero algunas empresas y plataformas de evaluación no permiten la asistencia de IA. Revisa las normas de cada entrevista y úsala solo donde esté permitida. La ventana de la app se excluye por defecto de las capturas de pantalla para proteger los datos personales que muestra.',
    },
    {
      question: '¿Cuánto cuesta una entrevista de práctica?',
      category: 'billing',
      answer:
        'Nada aparte de tu plan. Con una suscripción, las entrevistas de práctica son ilimitadas. Con la hora gratis, una práctica la consume por minutos, igual que el asistente en directo: una sesión de 5 preguntas suele durar unos 13 minutos y una de 8, unos 20, así que la hora da para un par de sesiones completas. Si tu tiempo gratis se acaba en plena entrevista, termina ahí y aun así recibes tu informe.',
    },
    {
      question: '¿Cómo funciona la suscripción?',
      category: 'billing',
      answer:
        'Todas las cuentas empiezan con una hora gratis con el modelo gratuito. Después, una suscripción te da entrevistas en directo y de práctica ilimitadas con el modelo SOTA: $25 por un mes, $60 por un trimestre ($20 al mes) o $180 por un año ($15 al mes). Es un pase de prepago, no un cargo recurrente: nada se renueva solo, y si compras otro pase mientras uno está activo, su tiempo se añade después de la fecha de fin actual.',
    },
    {
      question: '¿Qué métodos de pago aceptáis?',
      category: 'billing',
      answer:
        'Solo aceptamos criptomonedas. No hace falta tarjeta de crédito, PayPal ni pagos bancarios tradicionales. Así garantizamos la máxima privacidad y seguridad en tus transacciones. Compra monedas y úsalas para pagar un pase mensual, trimestral o anual dentro de la aplicación.',
    },
    {
      question: '¿Hay una prueba gratis?',
      category: 'billing',
      answer:
        '¡Sí! Los usuarios nuevos tienen una hora gratis completa con nuestro modelo gratuito, sin límite de uso en la práctica y sin interrupciones. Incluye todas las funciones: sugerencias en directo, sugerencias a petición y entrevistas de práctica. Una suscripción te pasa al modelo SOTA con tiempo de entrevista ilimitado.',
    },
    {
      question: '¿Puedo usar mi cuenta en más de un ordenador?',
      category: 'billing',
      answer:
        'Sí. Tu perfil te acompaña en cualquier ordenador en el que inicies sesión. Eso sí, una cuenta solo puede tener una entrevista a la vez: empezar una entrevista en un segundo ordenador termina la que estaba en marcha en el primero.',
    },
    {
      question: '¿Puedo pedir un reembolso?',
      category: 'billing',
      answer:
        'Los reembolsos los gestiona nuestro equipo de soporte. Escribe a team@vectorleappulse.xyz en los 14 días siguientes a la compra con tu número de pedido. Si se aprueba el reembolso, cerramos el tiempo de suscripción que pagaste y te devolvemos el dinero.',
    },
  ],
};
