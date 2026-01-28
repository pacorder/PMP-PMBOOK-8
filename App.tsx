
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
      score: Math.round((score / 2) * 100), // Note: our mock quizzes have 2 questions for brevity
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
                        15 Minutos • 10 MCQ
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

        {/* Question Bank Accordion */}
        <section id="bank" className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-pmi-blue">{t.questionBankTitle}</h2>
            <p className="text-center text-gray-500 mb-12">{lang === 'ES' ? 'Explora preguntas por áreas de conocimiento específicas.' : 'Explore questions by specific knowledge areas.'}</p>
            
            <div className="space-y-4">
              {BANK_CATEGORIES.map((cat, idx) => (
                <details key={idx} className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-800">{cat}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <div className="p-5 border-t border-gray-200 text-gray-600 space-y-4">
                    <p className="text-sm italic">Sample Question {idx + 1}:</p>
                    <p className="font-medium">Which document provides the specific tasks and deliverables required for the project?</p>
                    <ul className="text-sm space-y-1 pl-4 list-disc">
                      <li>Project Charter</li>
                      <li>Work Breakdown Structure (WBS)</li>
                      <li>Scope Statement</li>
                      <li>Resource Management Plan</li>
                    </ul>
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

        {/* Leaderboard Section */}
        <section className="py-20 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-pmi-blue">{lang === 'ES' ? 'Mejores Puntuaciones' : 'Top Scores'}</h2>
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
              <table className="w-full text-left">
                <thead className="bg-pmi-blue text-white">
                  <tr>
                    <th className="p-4">{lang === 'ES' ? 'Usuario' : 'User'}</th>
                    <th className="p-4">{lang === 'ES' ? 'Puntos' : 'Score'}</th>
                    <th className="p-4">{lang === 'ES' ? 'Fecha' : 'Date'}</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.length > 0 ? leaderboard.map((s, i) => (
                    <tr key={i} className="border-t border-gray-200">
                      <td className="p-4 font-medium">{s.name}</td>
                      <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-bold">{s.score}%</span></td>
                      <td className="p-4 text-gray-500 text-sm">{s.date}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="p-10 text-center text-gray-400">
                        {lang === 'ES' ? 'No hay registros todavía.' : 'No records yet.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-20 px-4 bg-pmi-blue text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">{t.nextStepsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="https://www.pmi.org" target="_blank" className="p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                <div className="text-3xl mb-4">📚</div>
                <h4 className="font-bold mb-2">PMI.org</h4>
                <p className="text-xs opacity-70">Official certifications & standards.</p>
              </a>
              <div className="p-6 bg-white/10 rounded-xl">
                <div className="text-3xl mb-4">⏱️</div>
                <h4 className="font-bold mb-2">Mock Exam (180m)</h4>
                <p className="text-xs opacity-70">Full simulation coming soon.</p>
              </div>
              <a href="https://linkedin.com" target="_blank" className="p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                <div className="text-3xl mb-4">🤝</div>
                <h4 className="font-bold mb-2">Community</h4>
                <p className="text-xs opacity-70">Join PMP study groups on LinkedIn.</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-sm">
            <div className="bg-pmi-blue text-white px-2 py-1 rounded inline-block font-bold mb-4">PMP 2026</div>
            <p className="text-sm">{t.footerBio}</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} PMP Master Exam. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
