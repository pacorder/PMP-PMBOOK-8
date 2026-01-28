
import React, { useState, useEffect, useCallback } from 'react';
import { Question, Language } from '../types';

interface QuizCardProps {
  title: string;
  questions: Question[];
  onComplete: (score: number) => void;
  lang: Language;
  onClose: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ title, questions, onComplete, lang, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 || showResult) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
  };

  const handleCheck = () => {
    if (selected === null) return;
    const isCorrect = selected === questions[currentIdx].correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      onComplete(score);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (showResult) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-pmi-blue">{lang === 'ES' ? '¡Quiz Completado!' : 'Quiz Completed!'}</h2>
        <div className="text-6xl font-bold text-gray-800 mb-6">
          {Math.round((score / questions.length) * 100)}%
        </div>
        <p className="text-xl text-gray-600 mb-8">
          {lang === 'ES' 
            ? `Has respondido correctamente ${score} de ${questions.length} preguntas.`
            : `You answered ${score} out of ${questions.length} questions correctly.`}
        </p>
        <button 
          onClick={onClose}
          className="bg-pmi-blue text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
        >
          {lang === 'ES' ? 'Cerrar' : 'Close'}
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl max-w-2xl mx-auto overflow-hidden">
      <div className="bg-pmi-blue p-6 text-white flex justify-between items-center">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-mono">
          {formatTime(timeLeft)}
        </div>
      </div>
      
      <div className="h-2 bg-gray-100">
        <div className="h-full bg-yellow-400 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="p-8">
        <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
          {lang === 'ES' ? 'Pregunta' : 'Question'} {currentIdx + 1} of {questions.length}
        </div>
        <h4 className="text-xl font-medium text-gray-800 mb-8 leading-relaxed">
          {currentQ.text}
        </h4>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, i) => {
            let bgColor = "bg-gray-50 border-gray-200 hover:border-pmi-blue";
            if (isAnswered) {
              if (i === currentQ.correctAnswer) bgColor = "bg-green-100 border-green-500 text-green-800";
              else if (selected === i) bgColor = "bg-red-100 border-red-500 text-red-800";
            } else if (selected === i) {
              bgColor = "bg-pmi-blue/10 border-pmi-blue text-pmi-blue";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center ${bgColor}`}
              >
                <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 text-sm font-bold shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mb-8 p-4 bg-blue-50 rounded-xl text-sm text-blue-800 animate-fadeIn">
            <p className="font-bold mb-1">{lang === 'ES' ? 'Explicación:' : 'Explanation:'}</p>
            {currentQ.explanation}
          </div>
        )}

        <div className="flex justify-end">
          {!isAnswered ? (
            <button
              onClick={handleCheck}
              disabled={selected === null}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${selected === null ? 'bg-gray-200 text-gray-400' : 'bg-pmi-blue text-white hover:opacity-90'}`}
            >
              {lang === 'ES' ? 'Verificar' : 'Check'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-pmi-blue text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
            >
              {currentIdx === questions.length - 1 ? (lang === 'ES' ? 'Finalizar' : 'Finish') : (lang === 'ES' ? 'Siguiente' : 'Next')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
