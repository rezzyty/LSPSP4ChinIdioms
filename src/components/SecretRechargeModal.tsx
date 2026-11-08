import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';
import { BIRD_CHARACTERS, HAT_ACCESSORIES } from '../data/characters';
import { GAME_BACKGROUNDS } from '../data/backgrounds';
import { BirdAvatar } from './BirdSvg';
import { sound } from '../utils/audio';
import {
  X,
  Zap,
  Coins,
  Sparkles,
  ShieldCheck,
  Check,
  Crown,
  KeyRound,
  RotateCcw,
  Star,
  Users
} from 'lucide-react';

interface SecretRechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Record<string, UserProfile>;
  activeId: string;
  onUpdateProfiles: (updatedProfiles: Record<string, UserProfile>) => void;
}

export const SecretRechargeModal: React.FC<SecretRechargeModalProps> = ({
  isOpen,
  onClose,
  profiles,
  activeId,
  onUpdateProfiles
}) => {
  // Target account to charge: 'current', 'melaine', 'jayden', 'others', or 'all'
  const [targetAccount, setTargetAccount] = useState<string>(activeId);

  // Custom input amounts
  const [customCoins, setCustomCoins] = useState<string>('5000');
  const [customGems, setCustomGems] = useState<string>('500');
  const [customPearls, setCustomPearls] = useState<string>('100');
  const [customLeaves, setCustomLeaves] = useState<string>('500');

  // Flash toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const fireCelebration = () => {
    sound.playPowerUp();
    sound.playCoin();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 }
    });
  };

  // Charge resources for targeted profiles
  const applyCharge = (
    updater: (profile: UserProfile) => UserProfile,
    successMsg: string
  ) => {
    const nextProfiles = { ...profiles };

    if (targetAccount === 'all') {
      Object.keys(nextProfiles).forEach(id => {
        nextProfiles[id] = updater(nextProfiles[id]);
      });
    } else {
      const targetId = targetAccount === 'current' ? activeId : targetAccount;
      if (nextProfiles[targetId]) {
        nextProfiles[targetId] = updater(nextProfiles[targetId]);
      }
    }

    onUpdateProfiles(nextProfiles);
    fireCelebration();
    showToast(successMsg);
  };

  // 1. Quick add currency
  const handleAddCurrency = (
    type: 'coins' | 'gems' | 'pearls' | 'leaves',
    amount: number
  ) => {
    const labelMap = {
      coins: '金幣 💰',
      gems: '鑽石 💎',
      pearls: '珍珠 🦪',
      leaves: '樹葉 🍃'
    };
    applyCharge(
      p => ({
        ...p,
        [type]: p[type] + amount
      }),
      `成功充值 +${amount.toLocaleString()} ${labelMap[type]}！`
    );
  };

  // 2. Custom recharge submit
  const handleApplyCustom = () => {
    const c = parseInt(customCoins, 10) || 0;
    const g = parseInt(customGems, 10) || 0;
    const p = parseInt(customPearls, 10) || 0;
    const l = parseInt(customLeaves, 10) || 0;

    applyCharge(
      profile => ({
        ...profile,
        coins: profile.coins + c,
        gems: profile.gems + g,
        pearls: profile.pearls + p,
        leaves: profile.leaves + l
      }),
      `自訂充值完成：+${c} 金幣, +${g} 鑽石, +${p} 珍珠, +${l} 樹葉！`
    );
  };

  // 3. Super Cheat: Max All Currencies
  const handleMaxAllCurrencies = () => {
    applyCharge(
      p => ({
        ...p,
        coins: 999999,
        gems: 9999,
        pearls: 9999,
        leaves: 9999
      }),
      '已成功將所有資源充值至最高上限 999,999！'
    );
  };

  // 4. Super Cheat: Max All Power-Ups
  const handleMaxPowerUps = () => {
    applyCharge(
      p => ({
        ...p,
        powerUps: {
          goldenSling: (p.powerUps.goldenSling || 0) + 50,
          speedWing: (p.powerUps.speedWing || 0) + 50,
          laserAim: (p.powerUps.laserAim || 0) + 50,
          tntBomb: (p.powerUps.tntBomb || 0) + 50,
          streakShield: (p.powerUps.streakShield || 0) + 50,
          magnet: (p.powerUps.magnet || 0) + 50
        }
      }),
      '所有戰鬥武器及加速道具各 +50 個充能完畢！'
    );
  };

  // 5. Unlock all birds, hats, backgrounds
  const handleUnlockEverything = () => {
    const allBirdIds = BIRD_CHARACTERS.map(b => b.id);
    const allHatIds = HAT_ACCESSORIES.map(h => h.id);
    const allBgIds = GAME_BACKGROUNDS.map(b => b.id);

    applyCharge(
      p => ({
        ...p,
        unlockedBirds: Array.from(new Set([...p.unlockedBirds, ...allBirdIds])),
        unlockedHats: Array.from(new Set([...p.unlockedHats, ...allHatIds])),
        unlockedBackgrounds: Array.from(new Set([...p.unlockedBackgrounds, ...allBgIds]))
      }),
      '已解鎖全部 40 隻鳥類、4 款帽子配件與 6 大自訂戰鬥背景！'
    );
  };

  // 6. Max All 3-Stars across all 32 exercises
  const handleMaxAllStars = () => {
    const maxStarsMap: Record<string, number> = {};
    const maxScoresMap: Record<string, number> = {};

    for (let stage = 1; stage <= 4; stage++) {
      for (let ex = 1; ex <= 8; ex++) {
        const key = `stage${stage}_ex${ex}`;
        maxStarsMap[key] = 3;
        maxScoresMap[key] = 100;
      }
    }

    applyCharge(
      p => ({
        ...p,
        stageStars: { ...p.stageStars, ...maxStarsMap },
        stageScores: { ...p.stageScores, ...maxScoresMap },
        totalQuestionsAnswered: p.totalQuestionsAnswered + 320,
        totalCorrect: p.totalCorrect + 320,
        highestStreak: Math.max(p.highestStreak, 32)
      }),
      '全 4 關卡共 32 份練習全數解鎖滿星 ★★★ 評價！'
    );
  };

  // 7. Reset resources
  const handleResetResources = () => {
    if (window.confirm('確定要將該帳號的資源重置回初始值嗎？')) {
      applyCharge(
        p => ({
          ...p,
          coins: 100,
          gems: 5,
          pearls: 1,
          leaves: 15
        }),
        '資源已重置回初始值。'
      );
    }
  };

  const selectedTargetName =
    targetAccount === 'all'
      ? '全部帳號 (Melaine, Jayden, Others)'
      : profiles[targetAccount]?.name || '當前帳號';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-stone-900 border-4 border-yellow-400 rounded-3xl shadow-2xl p-5 sm:p-7 text-white max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-yellow-500/40 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 via-amber-500 to-yellow-600 flex items-center justify-center shadow-lg border-2 border-yellow-200">
              <Zap className="w-7 h-7 text-stone-950 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-yellow-300 tracking-wide">
                  秘密資源充值系統
                </h2>
                <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded-full border border-red-300">
                  SECRET
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                為 Melaine、Jayden 及訪客帳號快速充值金幣、鑽石、珍珠、樹葉與武器
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

        {/* Toast Alert */}
        {toastMessage && (
          <div className="mb-3 p-3 rounded-2xl bg-green-600/90 border-2 border-green-300 text-white font-black text-sm text-center shadow-lg animate-in slide-in-from-top-2 duration-200 flex items-center justify-center gap-2 shrink-0">
            <Check className="w-5 h-5 text-yellow-300" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="overflow-y-auto space-y-4 pr-1 flex-grow">
          {/* Target Account Selector */}
          <div className="bg-stone-950/80 p-3 sm:p-4 rounded-2xl border-2 border-yellow-500/50">
            <label className="text-xs font-black text-yellow-300 flex items-center gap-1.5 mb-2 uppercase tracking-wider">
              <Users className="w-4 h-4 text-yellow-400" /> 選擇欲充值的帳號目標：
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'melaine', label: 'Melaine (妹妹)' },
                { id: 'jayden', label: 'Jayden (哥哥)' },
                { id: 'others', label: '訪客 (Others)' },
                { id: 'all', label: '★ 全部帳號' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setTargetAccount(item.id)}
                  className={`py-2 px-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer border-2 ${
                    targetAccount === item.id
                      ? 'bg-yellow-400 text-stone-950 border-yellow-200 shadow-md scale-[1.02]'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-2 text-right text-[11px] text-amber-200 font-bold">
              目標：<span className="text-yellow-300 underline">{selectedTargetName}</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-yellow-300 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-yellow-400" /> 快速面額一鍵充值：
            </h3>

            {/* Coins */}
            <div className="bg-stone-850 p-3 rounded-2xl border border-stone-750 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <svg viewBox="0 0 100 100" className="w-6 h-6 shrink-0">
                  <use href="#icon-coin" />
                </svg>
                <span className="font-black text-sm text-yellow-300">金幣 (Coins)</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 w-full sm:w-auto">
                {[1000, 5000, 20000, 100000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => handleAddCurrency('coins', amt)}
                    className="py-1.5 px-2.5 bg-stone-800 hover:bg-stone-700 text-yellow-300 font-black text-xs rounded-xl border border-amber-600/70 active:scale-95 transition-all cursor-pointer"
                  >
                    +{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Gems / Diamonds */}
            <div className="bg-stone-850 p-3 rounded-2xl border border-stone-750 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <svg viewBox="0 0 100 100" className="w-6 h-6 shrink-0">
                  <use href="#icon-gem" />
                </svg>
                <span className="font-black text-sm text-cyan-300">鑽石 / 寶石 (Gems)</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 w-full sm:w-auto">
                {[100, 500, 2000, 10000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => handleAddCurrency('gems', amt)}
                    className="py-1.5 px-2.5 bg-stone-800 hover:bg-stone-700 text-cyan-300 font-black text-xs rounded-xl border border-cyan-600/70 active:scale-95 transition-all cursor-pointer"
                  >
                    +{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Pearls */}
            <div className="bg-stone-850 p-3 rounded-2xl border border-stone-750 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <svg viewBox="0 0 100 100" className="w-6 h-6 shrink-0">
                  <use href="#icon-pearl" />
                </svg>
                <span className="font-black text-sm text-pink-300">珍貴珍珠 (Pearls)</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 w-full sm:w-auto">
                {[50, 200, 1000, 5000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => handleAddCurrency('pearls', amt)}
                    className="py-1.5 px-2.5 bg-stone-800 hover:bg-stone-700 text-pink-300 font-black text-xs rounded-xl border border-pink-600/70 active:scale-95 transition-all cursor-pointer"
                  >
                    +{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Leaves */}
            <div className="bg-stone-850 p-3 rounded-2xl border border-stone-750 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <svg viewBox="0 0 100 100" className="w-6 h-6 shrink-0">
                  <use href="#icon-leaf" />
                </svg>
                <span className="font-black text-sm text-emerald-300">幸運樹葉 (Leaves)</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 w-full sm:w-auto">
                {[200, 1000, 5000, 20000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => handleAddCurrency('leaves', amt)}
                    className="py-1.5 px-2.5 bg-stone-800 hover:bg-stone-700 text-emerald-300 font-black text-xs rounded-xl border border-emerald-600/70 active:scale-95 transition-all cursor-pointer"
                  >
                    +{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Amount Form */}
          <div className="bg-stone-950/80 p-4 rounded-2xl border border-stone-700">
            <h4 className="text-xs font-black text-amber-300 mb-2.5">
              自訂各項資源充值數量：
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">金幣 💰</label>
                <input
                  type="number"
                  value={customCoins}
                  onChange={e => setCustomCoins(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-yellow-300 font-mono font-bold focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">鑽石 💎</label>
                <input
                  type="number"
                  value={customGems}
                  onChange={e => setCustomGems(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">珍珠 🦪</label>
                <input
                  type="number"
                  value={customPearls}
                  onChange={e => setCustomPearls(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-pink-300 font-mono font-bold focus:outline-none focus:border-pink-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">樹葉 🍃</label>
                <input
                  type="number"
                  value={customLeaves}
                  onChange={e => setCustomLeaves(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-emerald-300 font-mono font-bold focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
            <button
              onClick={handleApplyCustom}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 text-stone-950 font-black text-xs shadow-md cursor-pointer active:scale-95 transition-all"
            >
              確認自訂數量並充入帳號
            </button>
          </div>

          {/* Super Cheats / Master Tools */}
          <div className="bg-amber-950/40 p-4 rounded-2xl border-2 border-amber-600/60">
            <h4 className="text-xs font-black text-yellow-300 flex items-center gap-1.5 mb-2.5">
              <Crown className="w-4 h-4 text-yellow-400" /> 家長特權與全能充能按鈕：
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleMaxAllCurrencies}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 text-stone-950 font-black text-xs shadow cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>👑 一鍵滿幣 999,999 資源</span>
              </button>

              <button
                onClick={handleMaxPowerUps}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 text-white font-black text-xs shadow cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-yellow-300" />
                <span>所有戰鬥武器各 +50 個</span>
              </button>

              <button
                onClick={handleUnlockEverything}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-500 text-white font-black text-xs shadow cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                <span>解鎖全 40 隻怒鳥、帽子與背景</span>
              </button>

              <button
                onClick={handleMaxAllStars}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 text-white font-black text-xs shadow cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                <span>全 32 份練習解鎖滿星 ★★★</span>
              </button>
            </div>

            <div className="mt-3 pt-2.5 border-t border-amber-800/60 flex justify-between items-center">
              <span className="text-[11px] text-stone-400">重設該帳號回預設資源值：</span>
              <button
                onClick={handleResetResources}
                className="px-3 py-1 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-bold border border-red-700 active:scale-95 cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> 重設資源
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 shrink-0">
          <span>提示：在遊戲任意畫面連點右下角 5 次，亦可隨時喚出此面板！</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-black text-xs active:scale-95 cursor-pointer border border-stone-600"
          >
            完成並關閉
          </button>
        </div>
      </div>
    </div>
  );
};
