import type { Project } from '@/types'

/**
 * Selected projects.
 *
 * Every field below is either supplied by Andrés or taken from the public
 * repository (README, package manifest, language statistics). Nothing is
 * inferred. Adding a project means appending an entry here — `Projects.tsx`
 * renders whatever this file exports, in order.
 */
export const projects: Project[] = [
  {
    id: 'eva-tracker',
    name: 'EVA Tracker',
    platform: 'gitlab',
    repository: 'https://gitlab.com/DanielGuerrero666/EVA-Tracker-App',
    repositoryLabel: 'DanielGuerrero666/EVA-Tracker-App',
    role: 'contributor',
    featured: true,
    accent: 'lavender',
    technologies: ['Electron', 'JavaScript', 'Node.js', 'PostgreSQL', 'HTML', 'CSS', 'GitLab CI'],
    tagline: {
      es: 'Seguimiento del tiempo de trabajo en el escritorio',
      en: 'Desktop work-time tracking',
    },
    description: {
      es: 'Aplicación de escritorio para la gestión y el seguimiento del tiempo de trabajo, construida con Electron. Cubre entrada y salida de turno, descansos pagos e historial de turnos, y sigue registrando en segundo plano desde la bandeja del sistema mientras el turno permanece abierto.',
      en: 'A desktop application for managing and tracking work time, built with Electron. It covers clock in and clock out, paid breaks and shift history, and keeps recording in the background from the system tray while a shift stays open.',
    },
    highlights: [
      {
        es: 'Entrada y salida de turno con temporizador en vivo',
        en: 'Clock in and clock out with a live timer',
      },
      {
        es: 'Descansos pagos con aviso al superar el tiempo asignado',
        en: 'Paid breaks with a warning when the allowance is exceeded',
      },
      {
        es: 'Historial de turnos y asignación de turnos a proyectos',
        en: 'Shift history and per-project shift assignment',
      },
      {
        es: 'Salida y descansos guardados en disco si no hay red, y enviados al reconectar',
        en: 'Clock-outs and breaks stored on disk when offline, sent on reconnect',
      },
    ],
    status: { es: 'En desarrollo activo', en: 'Active development' },
    // Generated from the application itself with `npm run qa:shots` in the
    // EVA Tracker repository: the real interface driven against a fake store.
    // The employee, the times and the projects in them are invented, so no real
    // shift of anyone's ends up on a public page. 420x680 is the size the
    // window opens at, at 2x.
    screenshots: [
      {
        src: '/projects/eva-tracker/clocked-in.png',
        width: 420,
        height: 680,
        alt: {
          es: 'EVA Tracker con un turno abierto: el temporizador corriendo, el proyecto del turno y el historial',
          en: 'EVA Tracker with an open shift: the timer running, the shift project and the history',
        },
      },
      {
        src: '/projects/eva-tracker/break.png',
        width: 420,
        height: 680,
        alt: {
          es: 'Descanso en curso en EVA Tracker: la cuenta atrás del descanso mientras el temporizador principal sigue',
          en: 'A break in progress in EVA Tracker: the break counting down while the main timer keeps running',
        },
      },
      {
        src: '/projects/eva-tracker/break-overrun.png',
        width: 420,
        height: 680,
        alt: {
          es: 'Aviso a pantalla completa de EVA Tracker por pasarse del tiempo de descanso',
          en: 'Full-screen EVA Tracker warning for going past the break allowance',
        },
      },
      {
        src: '/projects/eva-tracker/idle-warning.png',
        width: 420,
        height: 680,
        alt: {
          es: 'Aviso de inactividad de EVA Tracker tras quince minutos sin teclado ni ratón',
          en: 'EVA Tracker idle warning after fifteen minutes with no keyboard or mouse',
        },
      },
      {
        src: '/projects/eva-tracker/clocked-out.png',
        width: 420,
        height: 680,
        alt: {
          es: 'EVA Tracker fuera de turno, con el historial de turnos cerrados',
          en: 'EVA Tracker off shift, showing the history of closed shifts',
        },
      },
      {
        src: '/projects/eva-tracker/login.png',
        width: 420,
        height: 680,
        alt: {
          es: 'Pantalla de inicio de sesión de EVA Tracker con correo y contraseña',
          en: 'EVA Tracker login screen with e-mail and password',
        },
      },
    ],
    source: 'repository',
  },
  {
    id: 'expenses-manager',
    name: 'Expenses Manager',
    platform: 'github',
    repository: 'https://github.com/AndresZunigaZ2005/ExpensesManager',
    repositoryLabel: 'AndresZunigaZ2005/ExpensesManager',
    role: 'author',
    featured: false,
    accent: 'green',
    technologies: ['Swift', 'SwiftUI', 'SwiftData', 'Swift Charts', 'iOS'],
    tagline: {
      es: 'Ingresos y gastos, local-first, para iOS',
      en: 'Local-first income and expense tracking for iOS',
    },
    description: {
      es: 'Registro personal de ingresos y gastos para iOS, construido con SwiftUI, SwiftData y Swift Charts. Todo vive en el dispositivo: sin cuenta, sin sincronización y sin capa de red. La aplicación está localizada en español e inglés, con cambio de idioma desde dentro.',
      en: 'A personal income and expense tracker for iOS, built with SwiftUI, SwiftData and Swift Charts. Everything lives on the device: no account, no sync and no network layer. The app is localized in Spanish and English, switchable from inside.',
    },
    highlights: [
      {
        es: 'Resumen, desglose por categoría, presupuestos e insights',
        en: 'Overview, category breakdown, budgets and insights',
      },
      {
        es: 'Sin dependencias externas: solo frameworks de primera parte',
        en: 'No external dependencies — first-party frameworks only',
      },
      {
        es: 'Interfaz completa en español e inglés',
        en: 'Full interface in Spanish and English',
      },
    ],
    status: { es: 'Requiere iOS 18 o superior', en: 'Requires iOS 18 or later' },
    screenshots: [
      {
        src: '/projects/expenses-manager/overview.png',
        width: 414,
        height: 900,
        alt: {
          es: 'Pantalla de resumen de Expenses Manager con el balance del mes',
          en: 'Expenses Manager overview screen showing the monthly balance',
        },
      },
      {
        src: '/projects/expenses-manager/breakdown.png',
        width: 414,
        height: 900,
        alt: {
          es: 'Desglose de gastos por categoría en Expenses Manager',
          en: 'Expense breakdown by category in Expenses Manager',
        },
      },
      {
        src: '/projects/expenses-manager/budgets.png',
        width: 414,
        height: 900,
        alt: {
          es: 'Pantalla de presupuestos de Expenses Manager',
          en: 'Budgets screen in Expenses Manager',
        },
      },
      {
        src: '/projects/expenses-manager/insights.png',
        width: 414,
        height: 900,
        alt: {
          es: 'Pantalla de insights de Expenses Manager con gráficas',
          en: 'Insights screen in Expenses Manager with charts',
        },
      },
      {
        src: '/projects/expenses-manager/editor.png',
        width: 414,
        height: 900,
        alt: {
          es: 'Editor de un movimiento en Expenses Manager',
          en: 'Transaction editor in Expenses Manager',
        },
      },
      {
        src: '/projects/expenses-manager/overview-es.png',
        width: 414,
        height: 900,
        alt: {
          es: 'Expenses Manager con la interfaz en español',
          en: 'Expenses Manager with the interface in Spanish',
        },
      },
    ],
    source: 'repository',
  },
  {
    id: 'vivetuzona-android',
    name: 'ViveTuZona Android',
    platform: 'github',
    repository: 'https://github.com/Lamsu1505/ViveTuZona-Android',
    repositoryLabel: 'Lamsu1505/ViveTuZona-Android',
    role: 'contributor',
    featured: false,
    accent: 'peach',
    technologies: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Hilt', 'DataStore', 'Firebase'],
    tagline: {
      es: 'Aplicación Android con roles y multiidioma',
      en: 'Android app with roles and multi-language support',
    },
    description: {
      es: 'Aplicación Android para ViveTuZona, desarrollada como trabajo final de la asignatura de Diseño Móvil. Permite iniciar sesión, gestionar el perfil y navegar según el rol del usuario, con cambio de idioma entre español e inglés que se conserva entre sesiones.',
      en: 'An Android application for ViveTuZona, developed as the final project for a Mobile Design course. It supports sign-in, profile management and role-based navigation, with a Spanish/English language switch that persists between sessions.',
    },
    highlights: [
      {
        es: 'Cambio de idioma en tiempo real, persistido con Preferences DataStore',
        en: 'Real-time language switching, persisted with Preferences DataStore',
      },
      {
        es: 'Navegación por roles con Jetpack Compose Navigation',
        en: 'Role-based navigation with Jetpack Compose Navigation',
      },
      {
        es: 'MVVM con StateFlow e inyección de dependencias con Hilt',
        en: 'MVVM with StateFlow and dependency injection with Hilt',
      },
      {
        es: 'Firebase Auth, Cloud Firestore y Cloud Functions',
        en: 'Firebase Auth, Cloud Firestore and Cloud Functions',
      },
    ],
    status: null,
    screenshots: [],
    source: 'repository',
  },
]

export const featuredProject = projects.find((project) => project.featured) ?? null
export const otherProjects = projects.filter((project) => !project.featured)
