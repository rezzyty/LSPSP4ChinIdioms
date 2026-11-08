import React, { useState } from 'react';
import { UserProfile } from '../types';
import { BirdAvatar } from './BirdSvg';
import { X, Check, Award, Star, Flame, Target, Sparkles, UserCheck, Edit3 } from 'lucide-react';
import { sound } from '../utils/audio';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Record<string, UserProfile>;
  activeId: string;
  onSelectProfile: (id: string) => void;
  onUpdateProfileName: (id: string, newName: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profiles,
  activeId,
  onSelectProfile,
  onUpdateProfileName
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  if (!isOpen) return null;

  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleSaveName = (id: string) => {
    if (editName.trim()) {
      onUpdateProfileName(id, editName.trim());
    }
    setEditingId(null);
  };

  const accountKeys = ['melaine', 'jayden', 'others'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-stone-900 border-4 border-amber-600 rounded-3xl shadow-2xl p-5 sm:p-8 text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-amber-700/60 mb-6 shrink-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-yellow-300 tracking-wide flex items-center gap-2">
              <UserCheck className="w-8 h-8 text-yellow-400" />
              玩家檔案管理中心
            </h2>
            <p className="text-sm text-stone-300 mt-1">
              支援 Melaine、Jayden 及訪客多帳號獨立存檔、星星進度與榮譽戰績！
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-600 cursor-pointer active:scale-95 transition-all"
            aria-label="關閉"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 overflow-y-auto pr-1">
          {accountKeys.map(key => {
            const profile = profiles[key];
            if (!profile) return null;
            const isActive = profile.id === activeId;
            const totalStars = Object.values(profile.stageStars).reduce((a, b) => a + b, 0);
            const totalScore = Object.values(profile.stageScores).reduce((a, b) => a + b, 0);
            const accuracy = profile.totalQuestionsAnswered > 0
              ? Math.round((profile.totalCorrect / profile.totalQuestionsAnswered) * 100)
              : 0;
            const level = Math.max(1, Math.floor(totalStars / 4) + 1);

            return (
              <div
                key={key}
                className={`relative rounded-3xl p-5 flex flex-col justify-between transition-all border-4 ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-950/80 to-stone-900 border-yellow-400 ring-4 ring-yellow-400/30 shadow-xl'
                    : 'bg-stone-800/80 hover:bg-stone-800 border-stone-700 hover:border-amber-500/70 shadow-md'
                }`}
              >
                {/* Active Tag */}
                {isActive && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-yellow-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Check className="w-3.5 h-3.5" />
                    當前遊玩中
                  </div>
                )}

                <div>
                  {/* Avatar & Level */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-amber-100 to-amber-300 border-4 border-amber-500 shadow-lg flex items-center justify-center p-2 mb-2">
                      <BirdAvatar birdId={profile.equippedBird} hatId={profile.equippedHat} className="w-18 h-18 sm:w-20 sm:h-20" />
                      <span className="absolute -bottom-1 -right-1 bg-stone-900 text-yellow-300 text-xs font-black px-2 py-0.5 rounded-full border-2 border-yellow-400">
                        Lv.{level}
                      </span>
                    </div>

                    {/* Name edit */}
                    {editingId === key ? (
                      <div className="flex items-center gap-1.5 w-full mt-1">
                        <input
                          type="text"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          maxLength={16}
                          className="w-full bg-stone-950 text-yellow-300 font-black text-sm px-2 py-1 rounded border-2 border-yellow-400 focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveName(key)}
                          className="px-2 py-1 bg-green-600 text-white font-bold rounded text-xs hover:bg-green-500"
                        >
                          儲存
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-black text-lg sm:text-xl text-yellow-200 text-center">
                          {profile.name}
                        </h3>
                        <button
                          onClick={() => handleStartEdit(key, profile.name)}
                          className="text-stone-400 hover:text-yellow-300 p-1"
                          title="修改玩家暱稱"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Stats list */}
                  <div className="space-y-2 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800 text-xs sm:text-sm">
                    <div className="flex items-center justify-between text-yellow-300">
                      <span className="flex items-center gap-1.5 text-stone-400">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 累積星數
                      </span>
                      <span className="font-black text-base">{totalStars} 顆星</span>
                    </div>

                    <div className="flex items-center justify-between text-amber-200">
                      <span className="flex items-center gap-1.5 text-stone-400">
                        <Award className="w-4 h-4 text-amber-400" /> 總積分
                      </span>
                      <span className="font-black font-mono">{totalScore} 分</span>
                    </div>

                    <div className="flex items-center justify-between text-emerald-300">
                      <span className="flex items-center gap-1.5 text-stone-400">
                        <Target className="w-4 h-4 text-emerald-400" /> 正確率
                      </span>
                      <span className="font-black font-mono">{accuracy}%</span>
                    </div>

                    <div className="flex items-center justify-between text-orange-300">
                      <span className="flex items-center gap-1.5 text-stone-400">
                        <Flame className="w-4 h-4 text-orange-400" /> 最高連勝
                      </span>
                      <span className="font-black">{profile.highestStreak} 題</span>
                    </div>

                    <div className="flex items-center justify-between text-cyan-300 pt-1 border-t border-stone-800">
                      <span className="flex items-center gap-1.5 text-stone-400">
                        <Sparkles className="w-4 h-4 text-cyan-400" /> 已解鎖鳥類
                      </span>
                      <span className="font-black">{profile.unlockedBirds.length} 隻</span>
                    </div>
                  </div>
                </div>

                {/* Switch Account Button */}
                <div className="mt-4">
                  {isActive ? (
                    <div className="w-full py-2.5 rounded-xl bg-yellow-400/20 border-2 border-yellow-400/40 text-yellow-300 font-bold text-center text-sm">
                      目前進行中
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        sound.playCoin();
                        onSelectProfile(key);
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 border-2 border-amber-900 text-white font-black text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      切換至此帳號
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t-2 border-stone-800 text-center text-xs text-stone-400 shrink-0">
          每個帳號的星星、金幣、已解鎖角色與武器背包皆獨立儲存，在同一部設備或 iPad Pro 上可輪流挑戰學習！
        </div>
      </div>
    </div>
  );
};
