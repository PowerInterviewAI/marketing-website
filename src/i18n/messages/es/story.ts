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
  roles: {
    eyebrow: 'Cualquier trabajo',
    title: 'Tu puesto. Tus preguntas.',
    description: 'Añade tu CV y la oferta. Cada pregunta se escribe para el puesto que quieres.',
    sample: 'Pregunta de ejemplo',
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
  checker: {
    label: '¿Está disponible mi idioma?',
    placeholder: 'Escribe un idioma, como tamil o தமிழ்',
    voice: 'Hablado y escrito',
    written: 'Preguntas escritas',
    none: 'Sin resultados. Prueba con el nombre en inglés o nativo.',
  },
};
