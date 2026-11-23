import type { Pricing } from '../en/pricing';

export const pricing: Pricing = {
  eyebrow: 'Preços',
  title: 'Uma hora grátis, depois ilimitado',
  description:
    'Comece com uma hora grátis no modelo grátis. Quando quiser mais, assine para ter entrevistas ao vivo e simuladas ilimitadas no modelo SOTA: {monthly} ao mês, ou {yearly} ao mês no plano anual.',
  monthNoun: { one: 'mês', other: 'meses' },
  trialBadge: 'Contas novas: 1 hora grátis',
  coinsBadge: 'Só cripto: sem cartão, PayPal ou dados bancários',
  prepaidBadge: 'Pré-pago: nunca renova sozinho',

  tier: {
    caption: 'O plano grátis comparado com uma assinatura',
    whatYouGet: 'O que você recebe',
    trial: 'Grátis',
    paid: 'Assinatura',
    included: 'Incluído',
    duration: {
      label: 'Tempo de entrevista',
      trial: '1 hora, uma vez',
      paid: 'Ilimitado',
    },
    model: { label: 'Modelo incluído', trial: 'Modelo grátis', paid: 'Modelo SOTA' },
    live: 'Sugestões ao vivo',
    triggered: 'Sugestões sob demanda',
    mock: 'Entrevistas simuladas com relatório de avaliação',
    rateLimit: { label: 'Limite de uso', trial: 'Nenhum na prática', paid: 'Nenhum na prática' },
  },

  billing: {
    title: 'Como funciona a cobrança',
    free: 'A hora grátis',
    freeText:
      'Sessões ao vivo e simuladas consomem o tempo por minuto. Quando ele acaba, a sessão para, e uma entrevista simulada ainda entrega o relatório.',
    paid: 'Uma assinatura',
    paidText:
      'Pague uma vez em cripto por um mês, um trimestre ou um ano. Nada renova automaticamente: compre outro passe quando quiser, e o tempo dele é somado depois da sua data de término atual.',
  },

  plans: {
    free: 'Tudo o que o app faz, no modelo grátis, na sua primeira hora',
    monthly: 'Entrevistas ilimitadas no modelo SOTA, um mês de cada vez',
    quarterly: 'Entrevistas ilimitadas no modelo SOTA por três meses',
    yearly: 'Entrevistas ilimitadas no modelo SOTA por um ano inteiro',
  },
  popular: 'Recomendado',
  save: 'Economize {percent}%',
  planNames: { free: 'Grátis', monthly: 'Mensal', quarterly: 'Trimestral', yearly: 'Anual' },
  perMonth: '/ mês',
  freeLine: '1 hora de entrevistas, uma vez',
  billedAs: '{price} pagos uma vez por {months} {monthNoun}',
  features: {
    suggestions: 'Sugestões ao vivo e sob demanda',
    mock: 'Entrevistas simuladas com relatório de avaliação',
    freeModel: 'Modelo grátis',
    sotaModel: 'Modelo SOTA, sem limite de uso na prática',
    oneHour: 'Uma hora de tempo de entrevista',
    unlimited: 'Tempo de entrevista ilimitado',
    noRenewal: 'Sem renovação automática',
  },
  getStarted: 'Começar',
  startFree: 'Começar grátis',
};
