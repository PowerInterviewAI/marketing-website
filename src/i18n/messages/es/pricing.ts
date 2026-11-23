import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: 'Precios',
  title: 'Una hora gratis y después, sin límites',
  description:
    'Empieza con una hora gratis con el modelo gratuito. Cuando quieras más, suscríbete para tener entrevistas en directo y de práctica ilimitadas con el modelo SOTA: {monthly} al mes, o {yearly} al mes con pago anual.',
  monthNoun: { one: 'mes', other: 'meses' },
  coinsBadge: 'Solo cripto: sin tarjeta, PayPal ni datos bancarios',

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
    free: 'Prueba todas las funciones',
    monthly: 'Para una entrevista próxima',
    quarterly: 'Para una búsqueda activa',
    yearly: 'Para una búsqueda más larga',
  },
  included: { every: 'Incluido en todos los planes', paid: 'Con cualquier plan de pago' },
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
