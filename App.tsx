
import React, { useState, useEffect, useCallback } from 'react';
import Flashcard from './components/Flashcard';
import NotebookModal from './components/NotebookModal';
import { WORD_LIST } from './constants';
import { IELTSWord } from './types';

const App: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [favorites, setFavorites] = useState<IELTSWord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('ielts-favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem('ielts-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleNextWord = useCallback(() => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * WORD_LIST.length);
    } while (nextIndex === currentWordIndex && WORD_LIST.length > 1);
    setCurrentWordIndex(nextIndex);
  }, [currentWordIndex]);

  const toggleFavorite = (id: string) => {
    const word = WORD_LIST.find(w => w.id === id);
    if (!word) return;

    setFavorites(prev => {
      const isFav = prev.some(f => f.id === id);
      if (isFav) {
        return prev.filter(f => f.id !== id);
      } else {
        return [...prev, word];
      }
    });
  };

  const currentWord = WORD_LIST[currentWordIndex];
  const isFavorite = favorites.some(f => f.id === currentWord.id);

  return (
    <div className="min-h-screen flex flex-col py-12 px-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
          IELTS <span className="text-indigo-600">Master</span>
        </h1>
        <p className="text-slate-500 font-medium">Daily Vocabulary Booster & Flashcards</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-10">
        <div className="w-full">
          <Flashcard 
            word={currentWord} 
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button 
            onClick={handleNextWord}
            className="flex-1 bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:bg-slate-900 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Next Random Word
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-white text-indigo-600 border-2 border-indigo-100 font-bold py-4 px-8 rounded-2xl shadow-lg hover:border-indigo-600 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            View Notebook
            {favorites.length > 0 && (
              <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </main>

      {/* Stats/Footer */}
      <footer className="max-w-4xl mx-auto w-full mt-12 text-center text-slate-400 text-sm">
        <p>Sorted Alphabetically • {WORD_LIST.length} High-Frequency Words</p>
        <p className="mt-2 opacity-50">Empowered by Gemini AI Intelligence</p>
      </footer>

      {/* Modal */}
      <NotebookModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        favorites={favorites}
        onRemoveFavorite={toggleFavorite}
      />
    </div>
  );
};

export default App;
