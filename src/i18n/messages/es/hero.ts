import type { Hero } from '../en/hero';

export const hero: Hero = {
  title: 'Comete tus errores aquí, no en la entrevista.',
  subtitle:
    'Practica en voz alta con un entrevistador de IA en tu idioma. Cada respuesta se puntúa y mejora para cualquier trabajo, de ventas a pruebas de código en directo.',
  free: '1 hora gratis',
  noCard: 'Sin tarjeta de crédito',
  secondary: 'Cómo funciona',

  trust: {
    platformsLabel: 'Plataformas',
    platforms: 'Windows ya, macOS muy pronto',
    languagesLabel: 'Idiomas de entrevista',
    voices: '{voices} voces habladas',
    rolesLabel: 'Puestos',
    roles: 'Cualquier puesto, no solo tecnología',
    privacyLabel: 'Privacidad',
    privacy: 'Las transcripciones nunca se guardan',
    badgeAlt: 'Valoración de Power Interview AI en PeerPush',
  },

  download: {
    forWindows: 'Descargar para Windows',
    generic: 'Descargar',
    macosNotReady: 'La versión para macOS aún no está lista: estamos trabajando en ella.',
    windowsInstead: 'Descargar para Windows',
    allReleases: 'Todas las versiones',
    latest: 'última',
    windows: 'Windows',
    macosSoon: 'macOS (muy pronto)',
    macosSoonTitle: 'En desarrollo activo',
    free: 'Descargar gratis',
    stickyNote: '1 hora gratis',
    mobileNote: 'Power Interview AI funciona en tu PC con Windows.',
    shareLink: 'Enviar enlace a mi PC',
    copyLink: 'Copiar enlace para mi PC',
    linkCopied: 'Enlace copiado',
    shareText: 'Descargar Power Interview AI en mi PC',
  },

  surface: {
    play: 'Reproducir demo',
    pause: 'Pausar demo',
    previous: 'Demo anterior',
    next: 'Demo siguiente',
    clips: 'Clips de demostración',
    preview: 'Vista previa de la entrevista',
    mock: 'Entrevista simulada',
    live: 'Ayuda en directo',
    sample: 'Ejemplo',
    question: 'Pregunta {n} de {total}',
    interviewer: 'Entrevistador',
    you: 'Tú',
    score: 'Puntuación',
    strength: 'Punto fuerte',
    gap: 'A mejorar',
    suggestion: 'Sugerencia',
    language: 'Idioma de la entrevista',
    yours: 'Idioma de tu navegador',
    pauseLanguages: 'Pausar vista previa de idiomas',
    playLanguages: 'Reproducir vista previa de idiomas',
    allLanguages: 'Los {count} idiomas',
  },
  demos: [
    {
      title: 'Asistente de entrevista en directo y exportación inteligente',
      description:
        'Sugerencias al instante durante la llamada y, después, una exportación inteligente con el resumen y las conclusiones',
    },
    {
      title: 'Reto de programación - Recorrido de grafos',
      description: 'Captura el problema de la pantalla y lee la solución en la capa sigilosa',
    },
    {
      title: 'Reto de programación - Componentes conexas',
      description:
        'Varias capturas dan a la IA el enunciado completo, las restricciones y la firma',
    },
    {
      title: 'Reto de programación - Recursión en árbol binario',
      description:
        'Desplaza el código solo con atajos: oculto al compartir pantalla y sin robar el foco',
    },
  ],

  install: {
    eyebrow: 'Instalación',
    title: 'Tres formas de ponerlo en marcha',
    description:
      'Elige la que mejor encaje con tu forma de trabajar. El comando de una línea descarga la última versión y abre el instalador por ti.',
    tabCli: 'Línea de comandos',
    tabInstaller: 'Instalador',
    tabSource: 'Desde el código',
    windows: 'Windows',
    macos: 'macOS',
    copy: 'Copiar el comando de instalación',
    copied: 'Copiado',
    macosReference:
      'La versión para macOS aún no está lista: estamos trabajando en ella. Dejamos este comando como referencia, pero puede que no produzca una instalación funcional.',
    versionAgnostic:
      'Se muestra el comando independiente de la versión: la versión se busca al instalar.',
    windowsInstaller: 'Instalador de Windows',
    latestRelease: 'última versión',
    macArm: 'macOS - Apple Silicon',
    macIntel: 'macOS - Intel',
    macosInstallersNotReady:
      'Los instaladores para macOS aún no están listos: estamos trabajando en ellos.',
    viewReleases: 'Ver todas las versiones en GitHub',
    sourceText: 'Clona el repositorio y ejecútalo desde el código. Requiere Node.js 22.15+.',
    viewBuild: 'Ver las instrucciones de compilación',
  },
};
