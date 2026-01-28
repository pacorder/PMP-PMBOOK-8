
import { QuizCategory, Flashcard, DomainInfo, Translations } from './types';

export const TRANSLATIONS: Record<'ES' | 'EN', Translations> = {
  ES: {
    heroTitle: "Domina el PMP 2026 con PMBOK 8 - Exámenes Gratis",
    heroSub: "Basado en el nuevo ECO de Julio 2026. Preparación avanzada para Gerentes de Proyecto.",
    startQuiz: "Empezar Quiz Gratis",
    domainsTitle: "Dominios PMP 2026 (ECO)",
    domainsHeader: ["Dominio", "Peso", "Temas Clave"],
    peopleDomain: "Personas",
    processDomain: "Procesos",
    businessDomain: "Entorno del Negocio",
    questionBankTitle: "Banco de Preguntas por Categoría",
    flashcardsTitle: "Flashcards PMBOK 8",
    nextStepsTitle: "Próximos Pasos",
    footerBio: "Desarrollado por Patricio Cordero, PMP, Ingeniero Civil en Renovables (EDP Renewables).",
    quizCompleted: "¡Quiz Completado!",
    scoreLabel: "Puntuación",
    timerLabel: "Tiempo"
  },
  EN: {
    heroTitle: "Master PMP 2026 with PMBOK 8 - Free Exams",
    heroSub: "Based on the new July 2026 ECO. Advanced preparation for Project Managers.",
    startQuiz: "Start Free Quiz",
    domainsTitle: "PMP 2026 Domains (ECO)",
    domainsHeader: ["Domain", "Weight", "Key Topics"],
    peopleDomain: "People",
    processDomain: "Process",
    businessDomain: "Business Environment",
    questionBankTitle: "Question Bank by Category",
    flashcardsTitle: "PMBOK 8 Flashcards",
    nextStepsTitle: "Next Steps",
    footerBio: "Developed by Patricio Cordero, PMP, Civil Engineer in Renewables (EDP Renewables).",
    quizCompleted: "Quiz Completed!",
    scoreLabel: "Score",
    timerLabel: "Time"
  }
};

export const DOMAINS: DomainInfo[] = [
  { name: "People", weight: "33%", topics: ["Leadership", "Team management", "Emotional Intelligence", "Conflict Resolution"] },
  { name: "Process", weight: "41%", topics: ["Risk Management", "Schedule", "Scope", "Hybrid/Agile methodologies", "Quality"] },
  { name: "Business Environment", weight: "26%", topics: ["Value Delivery", "Compliance", "AI in PM", "Sustainability", "Governance"] }
];

export const FLASHCARDS: Flashcard[] = [
  { id: 'f1', term: "Stewardship", definition: "Taking responsibility for the project's ethics and resources." },
  { id: 'f2', term: "Value", definition: "The ultimate goal of every project—producing benefits for stakeholders." },
  { id: 'f3', term: "Tailoring", definition: "Adjusting project processes to fit specific environments." },
  { id: 'f4', term: "Critical Path", definition: "The longest sequence of tasks that determines the project duration." },
  { id: 'f5', term: "Emotional Intelligence", definition: "The ability to recognize and manage one's own and others' emotions." },
  { id: 'f6', term: "Burnup Chart", definition: "Visual tracking of work completed versus total project scope." },
  { id: 'f7', term: "Product Backlog", definition: "An ordered list of everything that is known to be needed in the product." },
  { id: 'f8', term: "Servant Leadership", definition: "Leadership style focused on serving the team's needs." },
  { id: 'f9', term: "Scrum", definition: "An agile framework for developing complex products." },
  { id: 'f10', term: "Risk Register", definition: "Repository for tracking identified risks and responses." }
];

export const QUIZZES: QuizCategory[] = [
  {
    id: 'q1',
    title: 'Quiz 1: People',
    description: 'Focus on Leadership, Motivation, and Stakeholder Engagement.',
    questions: [
      {
        id: 'q1-1',
        text: 'A project manager is facing high conflict within a newly formed hybrid team. Which leadership style is most appropriate during the "Storming" phase?',
        options: ['Laissez-faire', 'Servant Leadership', 'Directing/Coaching', 'Autocratic'],
        correctAnswer: 2,
        explanation: 'In the Storming phase of the Tuckman model, the team needs clear guidance and coaching to resolve conflicts and establish norms.'
      },
      {
        id: 'q1-2',
        text: 'What is the primary goal of Emotional Intelligence in a project management context?',
        options: ['Controlling team members', 'Building trust and empathy', 'Speeding up task execution', 'Minimizing stakeholder meetings'],
        correctAnswer: 1,
        explanation: 'EI allows a PM to understand motivations, build rapport, and handle interpersonal dynamics effectively.'
      },
      // ... 8 more questions would go here in a production app
    ]
  },
  {
    id: 'q2',
    title: 'Quiz 2: Process',
    description: 'Focus on Risks, Schedule, and Agile-Hybrid integration.',
    questions: [
      {
        id: 'q2-1',
        text: 'While planning a project using a hybrid approach, the team is unsure about the release frequency. What should the PM recommend?',
        options: ['Monthly releases', 'Daily releases', 'Align with value delivery milestones', 'Wait until the end of the project'],
        correctAnswer: 2,
        explanation: 'Hybrid models should prioritize value delivery milestones while maintaining flexibility for iterative feedback.'
      },
      {
        id: 'q2-2',
        text: 'Which risk response strategy is best for an opportunity that has a high potential impact but low probability?',
        options: ['Enhance', 'Share', 'Exploit', 'Accept'],
        correctAnswer: 1,
        explanation: 'Sharing the risk (opportunity) with a third party can increase the chance of realization for high-impact benefits.'
      }
    ]
  },
  {
    id: 'q3',
    title: 'Quiz 3: Business Environment',
    description: 'Focus on Value, Compliance, and Sustainability.',
    questions: [
      {
        id: 'q3-1',
        text: 'A project is found to be out of compliance with a new environmental regulation. What is the FIRST action the PM should take?',
        options: ['Stop the project immediately', 'Analyze the impact and notify stakeholders', 'Ignore it until the next audit', 'Update the risk register only'],
        correctAnswer: 1,
        explanation: 'Compliance issues require immediate impact analysis and communication with key stakeholders to determine the path forward.'
      },
      {
        id: 'q3-2',
        text: 'How does PMBOK 8 define "Business Value"?',
        options: ['Net Profit only', 'The total sum of tangible and intangible elements', 'Cost savings', 'Successful project completion'],
        correctAnswer: 1,
        explanation: 'Value includes both tangible (money, tools) and intangible (brand equity, social benefit) benefits.'
      }
    ]
  }
];

export const BANK_CATEGORIES = [
  "Personas/Liderazgo",
  "Stakeholders/Comunicaciones",
  "Alcance",
  "Cronograma",
  "Costos",
  "Calidad/Recursos",
  "Riesgos",
  "Adquisiciones/Contratos",
  "Entorno Negocio"
];
