import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, ShieldCheck, KeyRound, PlusCircle, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenSecretRecharge?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onOpenSecretRecharge
}) => {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleVerifyPin = () => {
    if (pin === '8888') {
      sound.playPowerUp();
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      sound.playWrong();
      setErrorMsg('密碼錯誤！請輸入預設家長密碼 (8888)');
    }
  };

  const handleAddCurrency = (type: 'coins' | 'gems' | 'pearls' | 'leaves', amount: number) => {
    sound.playCoin();
    onUpdateProfile({
      ...profile,
      [type]: profile[type] + amount
    });
  };

  const handleGrantAllPowerUps = () => {
    sound.playPowerUp();
    onUpdateProfile({
      ...profile,
      powerUps: {
        goldenSling: profile.powerUps.goldenSling + 5,
        speedWing: profile.powerUps.speedWing + 5,
        laserAim: profile.powerUps.laserAim + 5,
        tntBomb: profile.powerUps.tntBomb + 5,
        streakShield: profile.powerUps.streakShield + 5,
        magnet: profile.powerUps.magnet + 5
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-stone-900 border-4 border-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-yellow-400" />
            <h3 className="text-xl sm:text-2xl font-black text-yellow-300">
              家長與教師管理中心
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isUnlocked ? (
          <div className="flex flex-col items-center py-4">
            <KeyRound className="w-12 h-12 text-amber-400 mb-3 animate-bounce" />
            <p className="text-sm text-stone-300 font-bold mb-4 text-center">
              請輸入管理密碼 (預設: 8888)
            </p>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={e => setPin(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleVerifyPin()}
              placeholder="****"
              className="w-48 text-center text-3xl tracking-widest bg-stone-950 border-4 border-amber-600 rounded-2xl py-2 px-4 text-yellow-300 font-mono mb-3 focus:outline-none focus:border-yellow-400"
              autoFocus
            />
            {errorMsg && <p className="text-red-400 font-bold text-xs mb-3">{errorMsg}</p>}
            <button
              onClick={handleVerifyPin}
              className="w-48 py-2.5 rounded-xl bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 text-white font-black text-base shadow-lg cursor-pointer"
            >
              驗證解鎖
            </button>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="text-xs text-yellow-400 bg-amber-950/60 p-2.5 rounded-xl border border-amber-800 text-center font-bold">
              當前正在管理玩家：{profile.name}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleAddCurrency('coins', 500)}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-amber-500/70 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer text-yellow-300"
              >
                <PlusCircle className="w-4 h-4" /> +500 金幣
              </button>
              <button
                onClick={() => handleAddCurrency('gems', 50)}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-cyan-500/70 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer text-cyan-300"
              >
                <PlusCircle className="w-4 h-4" /> +50 寶石
              </button>
              <button
                onClick={() => handleAddCurrency('pearls', 20)}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-pink-500/70 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer text-pink-300"
              >
                <PlusCircle className="w-4 h-4" /> +20 珍珠
              </button>
              <button
                onClick={() => handleAddCurrency('leaves', 50)}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-emerald-500/70 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer text-emerald-300"
              >
                <PlusCircle className="w-4 h-4" /> +50 樹葉
              </button>
            </div>

            <button
              onClick={handleGrantAllPowerUps}
              className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 border-2 border-purple-400 text-white font-black text-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              補給所有戰鬥武器各 +5 個
            </button>

            {onOpenSecretRecharge && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSecretRecharge();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 text-stone-950 font-black text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <span>⚡ 開啟秘密多帳號充值中心 (全資源 & 滿星)</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs"
            >
              完成並關閉
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
