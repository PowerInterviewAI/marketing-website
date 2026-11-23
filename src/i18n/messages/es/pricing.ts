import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: 'Precios',
  title: 'Una hora gratis y después, sin límites',
  description:
    'Empieza con una hora gratis con el modelo gratuito. Cuando quieras más, suscríbete para tener entrevistas en directo y de práctica ilimitadas con el modelo SOTA: {monthly} al mes, o {yearly} al mes con pago anual.',
  monthNoun: { one: 'mes', other: 'meses' },
  trialBadge: 'Cuentas nuevas: 1 hora gratis',
  coinsBadge: 'Solo cripto: sin tarjeta, PayPal ni datos bancarios',
  prepaidBadge: 'Prepago: nunca se renueva solo',

  tier: {
    caption: 'El plan gratuito comparado con una suscripción',
    whatYouGet: 'Qué incluye',
    trial: 'Gratis',
    paid: 'Suscripción',
    included: 'Incluido',
    duration: {
      label: 'Tiempo de entrevista',
      trial: '1 hora, una vez',
      paid: 'Ilimitado',
    },
    model: { label: 'Modelo incluido', trial: 'Modelo gratuito', paid: 'Modelo SOTA' },
    live: 'Sugerencias en directo',
    triggered: 'Sugerencias a petición',
    mock: 'Entrevistas de práctica con informe puntuado',
    rateLimit: {
      label: 'Límite de uso',
      trial: 'Ninguno en la práctica',
      paid: 'Ninguno en la práctica',
    },
  },

  billing: {
    title: 'Cómo funciona la facturación',
    free: 'La hora gratis',
    freeText:
      'Las sesiones en directo y de práctica la consumen por minutos. Cuando se acaba, la sesión se detiene, y una entrevista de práctica aun así te da su informe.',
    paid: 'Una suscripción',
    paidText:
      'Paga una sola vez en cripto por un mes, un trimestre o un año. Nada se renueva automáticamente: compra otro pase cuando quieras y su tiempo se añade después de tu fecha de fin actual.',
  },

  plans: {
    free: 'Todo lo que hace la aplicación, con el modelo gratuito, durante tu primera hora',
    monthly: 'Entrevistas ilimitadas con el modelo SOTA, mes a mes',
    quarterly: 'Entrevistas ilimitadas con el modelo SOTA durante tres meses',
    yearly: 'Entrevistas ilimitadas con el modelo SOTA durante un año entero',
  },
  popular: 'Recomendado',
  save: 'Ahorra un {percent}%',
  planNames: { free: 'Gratis', monthly: 'Mensual', quarterly: 'Trimestral', yearly: 'Anual' },
  perMonth: '/ mes',
  freeLine: '1 hora de entrevistas, una vez',
  billedAs: '{price} en un solo pago por {months} {monthNoun}',
  features: {
    suggestions: 'Sugerencias en directo y a petición',
    mock: 'Entrevistas de práctica con informe puntuado',
    freeModel: 'Modelo gratuito',
    sotaModel: 'Modelo SOTA, sin límite de uso en la práctica',
    oneHour: 'Una hora de tiempo de entrevista',
    unlimited: 'Tiempo de entrevista ilimitado',
    noRenewal: 'Sin renovación automática',
  },
  getStarted: 'Empezar',
  startFree: 'Empezar gratis',
};
