import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import QuizCard from './components/QuizCard';
import { Language, ScoreEntry } from './types';
import { TRANSLATIONS, DOMAINS, FLASHCARDS, QUIZZES, BANK_CATEGORIES } from './data';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ES');
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const saved = localStorage.getItem('pmp-leaderboard');
    if (saved) setLeaderboard(JSON.parse(saved));
  }, []);

  const handleQuizComplete = (score: number) => {
    const entry: ScoreEntry = {
      name: "Guest User",
      score: Math.round((score / 10) * 100), 
      date: new Date().toLocaleDateString(),
      quizType: activeQuiz || "General"
    };
    const newBoard = [entry, ...leaderboard].slice(0, 5);
    setLeaderboard(newBoard);
    localStorage.setItem('pmp-leaderboard', JSON.stringify(newBoard));
  };

  const toggleCard = (id: string) => {
    const next = new Set(flippedCards);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setFlippedCards(next);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} setLang={setLang} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-pmi-blue text-white py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto">
              {t.heroSub}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
              <a href="#quizzes" className="bg-yellow-400 text-pmi-blue px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg">
                {t.startQuiz}
              </a>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-lg border border-white/20">
                <span className="text-sm opacity-80 block">{lang === 'ES' ? 'Por' : 'By'}</span>
                <span className="font-semibold">Patricio Cordero, PMP</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {DOMAINS.map(d => (
                <div key={d.name} className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-yellow-400">{d.name}</span>
                    <span className="bg-yellow-400/20 px-2 py-0.5 rounded text-xs text-yellow-400 font-bold">{d.weight}</span>
                  </div>
                  <ul className="text-sm opacity-70 space-y-1">
                    {d.topics.slice(0, 3).map(topic => <li key={topic}>• {topic}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quizzes Section */}
        <section id="quizzes" className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-pmi-blue">{lang === 'ES' ? 'Exámenes de Práctica' : 'Practice Exams'}</h2>
            
            {activeQuiz ? (
              <QuizCard 
                lang={lang}
                title={QUIZZES.find(q => q.id === activeQuiz)?.title || ""}
                questions={QUIZZES.find(q => q.id === activeQuiz)?.questions || []}
                onComplete={handleQuizComplete}
                onClose={() => setActiveQuiz(null)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {QUIZZES.map(q => (
                  <div key={q.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                    <div className="h-2 bg-pmi-blue"></div>
                    <div className="p-8 flex-grow">
                      <h3 className="text-2xl font-bold mb-3">{q.title}</h3>
                      <p className="text-gray-600 mb-6">{q.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        15 Minutos • Preguntas Reales
                      </div>
                      <button 
                        onClick={() => setActiveQuiz(q.id)}
                        className="w-full bg-pmi-blue text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all"
                      >
                        {lang === 'ES' ? 'Iniciar' : 'Start'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Question Bank */}
        <section id="bank" className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-pmi-blue">{t.questionBankTitle}</h2>
            <div className="space-y-4">
              {BANK_CATEGORIES.map((cat, idx) => (
                <details key={idx} className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-800">{cat}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <div className="p-5 border-t border-gray-200 text-gray-600">
                    <p className="text-sm italic mb-2">Sample Question:</p>
                    <p>Próximamente más preguntas detalladas para {cat} actualizadas al ECO 2026.</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Flashcards */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-pmi-blue">{t.flashcardsTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FLASHCARDS.map(card => (
                <div 
                  key={card.id} 
                  className="group h-48 perspective cursor-pointer"
                  onClick={() => toggleCard(card.id)}
                >
                  <div className={`relative w-full h-full text-center flip-card-inner ${flippedCards.has(card.id) ? 'flipped' : ''}`}>
                    <div className="absolute w-full h-full bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center p-6 flip-card-front">
                      <span className="text-xl font-bold text-pmi-blue">{card.term}</span>
                    </div>
                    <div className="absolute w-full h-full bg-pmi-blue text-white rounded-2xl shadow-sm flex items-center justify-center p-6 flip-card-back">
                      <p className="text-sm">{card.definition}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 px-4 border-t border-gray-800 text-center">
        <p className="text-sm mb-4">{t.footerBio}</p>
        <p className="text-xs">© {new Date().getFullYear()} PMP Master Exam. Basado en estándares del PMI.</p>
      </footer>
    </div>
  );
};

export default App;