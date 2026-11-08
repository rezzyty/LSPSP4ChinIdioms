import React, { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { BirdAvatar } from './BirdSvg';
import { X, Trophy, Medal, Star, Target, Flame, Sparkles } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
  currentProfileName: string;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  entries,
  currentProfileName
}) => {
  const [activeTab, setActiveTab] = useState<'score' | 'stars' | 'accuracy'>('score');

  if (!isOpen) return null;

  const sortedEntries = [...entries].sort((a, b) => {
    if (activeTab === 'score') return b.score - a.score;
    if (activeTab === 'stars') return b.stars !== a.stars ? b.stars - a.stars : b.score - a.score;
    return b.accuracy !== a.accuracy ? b.accuracy - a.accuracy : b.score - a.score;
  }).map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-stone-900 border-4 border-yellow-500 rounded-3xl shadow-2xl p-5 sm:p-8 text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-amber-800/60 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-300 flex items-center justify-center shadow-lg border-2 border-yellow-200">
              <Trophy className="w-7 h-7 text-stone-950" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-yellow-300 tracking-wide">
                全港小四 成語風雲榜
              </h2>
              <p className="text-xs sm:text-sm text-stone-300">
                即時排名：Melaine、Jayden 與四年級成語戰隊！
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

        {/* Tab filters */}
        <div className="flex gap-2 mb-4 shrink-0">
          <button
            onClick={() => setActiveTab('score')}
            className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'score'
                ? 'bg-gradient-to-b from-yellow-400 to-amber-600 text-stone-950 shadow-md border-2 border-yellow-300 scale-[1.02]'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
            }`}
          >
            <Medal className="w-4 h-4" /> 總積分榜
          </button>
          <button
            onClick={() => setActiveTab('stars')}
            className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'stars'
                ? 'bg-gradient-to-b from-amber-400 to-orange-600 text-stone-950 shadow-md border-2 border-amber-300 scale-[1.02]'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
            }`}
          >
            <Star className="w-4 h-4" /> 星星達人榜
          </button>
          <button
            onClick={() => setActiveTab('accuracy')}
            className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'accuracy'
                ? 'bg-gradient-to-b from-emerald-400 to-teal-600 text-stone-950 shadow-md border-2 border-emerald-300 scale-[1.02]'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
            }`}
          >
            <Target className="w-4 h-4" /> 高正確率榜
          </button>
        </div>

        {/* Leaderboard Entries List */}
        <div className="overflow-y-auto space-y-2.5 pr-1 flex-grow">
          {sortedEntries.map(entry => {
            const isMe = entry.isCurrentProfile;

            return (
              <div
                key={entry.name}
                className={`flex items-center justify-between p-3 sm:p-4 rounded-2xl border-2 transition-all ${
                  isMe
                    ? 'bg-amber-950/80 border-yellow-400 shadow-lg ring-2 ring-yellow-400/30 scale-[1.01]'
                    : entry.rank === 1
                    ? 'bg-stone-800/90 border-yellow-500/80'
                    : entry.rank === 2
                    ? 'bg-stone-800/80 border-slate-400/80'
                    : entry.rank === 3
                    ? 'bg-stone-800/80 border-amber-700/80'
                    : 'bg-stone-850/60 border-stone-800'
                }`}
              >
                {/* Left: Rank + Avatar + Name */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  {/* Rank Icon / Number */}
                  <div className="w-8 sm:w-10 text-center shrink-0">
                    {entry.rank === 1 ? (
                      <span className="text-2xl sm:text-3xl" title="第一名">🥇</span>
                    ) : entry.rank === 2 ? (
                      <span className="text-2xl sm:text-3xl" title="第二名">🥈</span>
                    ) : entry.rank === 3 ? (
                      <span className="text-2xl sm:text-3xl" title="第三名">🥉</span>
                    ) : (
                      <span className="font-black text-lg text-stone-400 font-mono">
                        #{entry.rank}
                      </span>
                    )}
                  </div>

                  {/* Equipped Bird Avatar */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center p-1 border-2 border-amber-400 shadow shrink-0">
                    <BirdAvatar birdId={entry.equippedBird} className="w-9 h-9 sm:w-10 sm:h-10" />
                  </div>

                  {/* Name and Level */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-black text-sm sm:text-base truncate ${isMe ? 'text-yellow-300' : 'text-stone-100'}`}>
                        {entry.name}
                      </span>
                      {isMe && (
                        <span className="text-[10px] bg-yellow-400 text-stone-950 font-black px-1.5 py-0.5 rounded-full shrink-0">
                          你
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-400 flex items-center gap-2 mt-0.5">
                      <span>等級 Lv.{entry.level}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-mono">{entry.accuracy}% 正確</span>
                    </div>
                  </div>
                </div>

                {/* Right: Scores / Stars */}
                <div className="text-right shrink-0 pl-2">
                  <div className="font-black text-base sm:text-lg text-yellow-300 font-mono">
                    {entry.score} 分
                  </div>
                  <div className="flex items-center justify-end gap-1 text-xs text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span className="font-bold">{entry.stars} 顆</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-stone-800 text-center text-xs text-stone-400 shrink-0">
          答對題目、維持連勝、挑戰更高難度練習，即可在風雲榜上一路晉級！
        </div>
      </div>
    </div>
  );
};
