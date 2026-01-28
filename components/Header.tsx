
import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-pmi-blue text-white p-1.5 rounded font-bold text-xl">PMP</div>
          <span className="font-bold text-gray-800 tracking-tight hidden sm:inline">Master Exam 2026</span>
        </div>
        
        <nav className="flex items-center space-x-6">
          <a href="#quizzes" className="text-gray-600 hover:text-pmi-blue font-medium transition-colors">Quizzes</a>
          <a href="#bank" className="text-gray-600 hover:text-pmi-blue font-medium transition-colors hidden md:inline">Bank</a>
          <button 
            onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
            className="flex items-center space-x-1 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
          >
            <span className="text-xs font-bold uppercase">{lang}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
