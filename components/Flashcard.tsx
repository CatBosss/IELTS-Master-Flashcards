
import React, { useState } from 'react';
import { IELTSWord } from '../types';
import { speakWord } from '../services/geminiService';

interface FlashcardProps {
  word: IELTSWord;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ word, isFavorite, onToggleFavorite }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakWord(word.word);
  };

  const handleSpeakExample = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakWord(word.example);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(word.id);
  };

  return (
    <div 
      className="relative w-full max-w-md h-96 perspective-1000 cursor-pointer mx-auto"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 border border-slate-100">
          <div className="absolute top-6 right-6 flex gap-3">
             <button 
              onClick={toggleFavorite}
              className={`p-3 rounded-full transition-all duration-300 ${
                isFavorite ? 'bg-red-50 text-red-500 scale-110' : 'bg-slate-50 text-slate-300 hover:text-red-400'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
          </div>
          
          <h2 className="text-5xl font-bold text-slate-800 mb-2">{word.word}</h2>
          <p className="text-xl text-slate-400 font-medium mb-8">{word.phonetic}</p>
          
          <button 
            onClick={handleSpeak}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
            Listen
          </button>
          
          <p className="absolute bottom-6 text-slate-400 text-sm italic">Click to flip for meaning</p>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-white rotate-y-180">
          <h3 className="text-3xl font-bold mb-6">{word.meaning}</h3>
          
          <div className="w-full space-y-4 text-center">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <p className="text-lg leading-relaxed mb-2 font-medium">"{word.example}"</p>
              <p className="text-white/70 text-sm">{word.exampleTranslation}</p>
              <button 
                onClick={handleSpeakExample}
                className="mt-3 text-white/80 hover:text-white flex items-center gap-2 mx-auto text-sm transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
                Read Example
              </button>
            </div>
          </div>

          <p className="absolute bottom-6 text-white/60 text-sm italic">Click to flip back</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
