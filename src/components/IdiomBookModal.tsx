import React, { useState } from 'react';
import { IDIOM_GLOSSARY } from '../data/idiomData';
import { X, BookOpen, Search, Volume2, Bookmark } from 'lucide-react';
import { sound } from '../utils/audio';

interface IdiomBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IdiomBookModal: React.FC<IdiomBookModalProps> = ({ isOpen, onClose }) => {
  const [selectedSet, setSelectedSet] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const allIdioms = Object.entries(IDIOM_GLOSSARY).flatMap(([setId, list]) =>
    list.map(item => ({ ...item, setId: Number(setId) }))
  );

  const filtered = allIdioms.filter(item => {
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      return (
        item.idiom.includes(q) ||
        item.pinyin.toLowerCase().includes(q) ||
        item.meaning.includes(q)
      );
    }
    return item.setId === selectedSet;
  });

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-HK'; // Cantonese / Traditional Chinese
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      sound.playPowerUp();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-stone-900 border-4 border-cyan-500 rounded-3xl shadow-2xl p-5 sm:p-8 text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-cyan-800/60 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-400 flex items-center justify-center shadow-lg border-2 border-cyan-200">
              <BookOpen className="w-7 h-7 text-stone-950" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-cyan-300 tracking-wide">
                喇沙小四 成語溫習手冊
              </h2>
              <p className="text-xs sm:text-sm text-stone-300">
                香港小學四年級成語對照、粵語發音、拼音、詳細解釋與實用例句
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-600 cursor-pointer active:scale-95 transition-all"
            aria-label="關閉"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search bar & Stage filters */}
        <div className="space-y-3 mb-4 shrink-0">
          {/* Search box */}
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜尋成語、拼音或字詞釋義..."
              className="w-full bg-stone-950 border-2 border-stone-700 rounded-2xl pl-11 pr-4 py-2.5 text-sm sm:text-base text-cyan-200 placeholder-stone-500 focus:outline-none focus:border-cyan-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-stone-800 text-stone-400 px-2 py-0.5 rounded hover:text-white"
              >
                清除
              </button>
            )}
          </div>

          {/* Stage buttons */}
          {!searchQuery && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 1, label: '關卡一 P.13-17' },
                { id: 2, label: '關卡二 P.25-28' },
                { id: 3, label: '關卡三 P.4-8' },
                { id: 4, label: '關卡四 P.9-12' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    sound.playCoin();
                    setSelectedSet(s.id);
                  }}
                  className={`py-2 px-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer border-2 ${
                    selectedSet === s.id
                      ? 'bg-gradient-to-b from-cyan-500 to-blue-600 text-stone-950 border-cyan-300 shadow-md scale-[1.02]'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Idiom cards list */}
        <div className="overflow-y-auto space-y-3 pr-1 flex-grow">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-base">
              找不到相符的成語，請嘗試其他關鍵字。
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.idiom + idx}
                className="bg-stone-800/90 border-2 border-stone-700 hover:border-cyan-500/70 rounded-2xl p-4 sm:p-5 transition-all shadow-md"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black text-yellow-300 tracking-wider">
                      {item.idiom}
                    </h3>
                    <span className="text-xs sm:text-sm font-mono text-cyan-300 font-bold bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800">
                      {item.pinyin}
                    </span>
                    {item.page && (
                      <span className="text-xs text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                        {item.page}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => speakText(item.idiom)}
                    className="p-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-600/80 text-cyan-300 active:scale-95 transition-all cursor-pointer shrink-0"
                    title="朗讀成語"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-sm sm:text-base text-stone-200 leading-relaxed mb-3">
                  <span className="font-bold text-cyan-400 mr-1.5">【解釋】</span>
                  {item.meaning}
                </div>

                <div className="bg-stone-900/80 rounded-xl p-3 border border-stone-800 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  <span className="font-bold text-amber-400 mr-1.5">【例句示範】</span>
                  {item.example}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-stone-800 text-center text-xs text-stone-400 shrink-0">
          溫習成語釋義與用法，能在快節奏答題中迅速做出正確判斷！
        </div>
      </div>
    </div>
  );
};
