
export type Language = 'ES' | 'EN';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

export interface DomainInfo {
  name: string;
  weight: string;
  topics: string[];
}

export interface ScoreEntry {
  name: string;
  score: number;
  date: string;
  quizType: string;
}

export interface Translations {
  heroTitle: string;
  heroSub: string;
  startQuiz: string;
  domainsTitle: string;
  domainsHeader: string[];
  peopleDomain: string;
  processDomain: string;
  businessDomain: string;
  questionBankTitle: string;
  flashcardsTitle: string;
  nextStepsTitle: string;
  footerBio: string;
  quizCompleted: string;
  scoreLabel: string;
  timerLabel: string;
}
