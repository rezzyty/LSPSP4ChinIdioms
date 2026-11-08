import React from 'react';
import { UserProfile } from '../types';
import { BirdAvatar } from './BirdSvg';
import { Volume2, VolumeX, Maximize2, Trophy, BookOpen, ShoppingBag, Users, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderHUDProps {
  profile: UserProfile;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenProfiles: () => void;
  onOpenLeaderboard: () => void;
  onOpenIdiomBook: () => void;
  onOpenShop: () => void;
  onOpenPowerUps: () => void;
  onOpenAdmin: () => void;
  onOpenSecretRecharge: () => void;
  onHomeClick: () => void;
  showBackToHome?: boolean;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  profile,
  isMuted,
  onToggleMute,
  onOpenProfiles,
  onOpenLeaderboard,
  onOpenIdiomBook,
  onOpenShop,
  onOpenPowerUps,
  onOpenAdmin,
  onOpenSecretRecharge,
  onHomeClick,
  showBackToHome = false
}) => {
  const [currencyClickCount, setCurrencyClickCount] = React.useState(0);
  const clickTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCurrencyClick = () => {
    setCurrencyClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        sound.playPowerUp();
        onOpenSecretRecharge();
        return 0;
      }
      return next;
    });

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      setCurrencyClickCount(0);
    }, 1500);
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const totalPowerUps = Object.values(profile.powerUps).reduce((a, b) => a + b, 0);

  return (
    <header className="sticky top-0 z-40 w-full px-2 sm:px-4 py-2 sm:py-3 bg-stone-900/80 backdrop-blur-md border-b-4 border-amber-800 shadow-xl text-white">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Home / Back button + Account Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {showBackToHome && (
            <button
              onClick={onHomeClick}
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 border-2 border-amber-900 shadow-md font-black text-sm sm:text-base flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
              title="返回首頁"
            >
              ← 主選單
            </button>
          )}

          {/* Current Profile Switcher Button */}
          <button
            onClick={onOpenProfiles}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-950/70 hover:bg-amber-900/80 border-2 border-amber-600/80 shadow-md transition-all active:scale-95 cursor-pointer group"
            title="切換帳號 (Melaine, Jayden, Others)"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden border-2 border-amber-400 shrink-0">
              <BirdAvatar birdId={profile.equippedBird} hatId={profile.equippedHat} className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="font-black text-xs sm:text-sm text-yellow-300 group-hover:text-yellow-200">
                  {profile.name}
                </span>
                <span className="text-[10px] bg-amber-700/80 px-1.5 py-0.5 rounded text-amber-100 font-bold">
                  Lv.{Math.max(1, Math.floor(Object.values(profile.stageStars).reduce((a, b) => a + b, 0) / 4) + 1)}
                </span>
              </div>
              <p className="text-[10px] text-amber-200/80 hidden sm:block">點擊更換帳號</p>
            </div>
            <Users className="w-4 h-4 text-amber-300 ml-1 shrink-0" />
          </button>
        </div>

        {/* Center: Currency Display (Coins, Gems, Pearls, Leaves) - Clicking 5 times triggers Secret Recharge */}
        <div
          onClick={handleCurrencyClick}
          className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center cursor-pointer select-none active:scale-[0.98] transition-transform"
          title="資源欄 (連續點擊 5 次開啟秘密充值)"
        >
          {/* Coins */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-950/90 border-2 border-amber-600 shadow-inner">
            <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
              <use href="#icon-coin" />
            </svg>
            <span className="font-black text-xs sm:text-sm text-yellow-300 tracking-wide font-mono">
              {profile.coins.toLocaleString()}
            </span>
          </div>

          {/* Gems */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-950/90 border-2 border-cyan-600 shadow-inner">
            <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
              <use href="#icon-gem" />
            </svg>
            <span className="font-black text-xs sm:text-sm text-cyan-300 tracking-wide font-mono">
              {profile.gems.toLocaleString()}
            </span>
          </div>

          {/* Pearls */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-pink-950/90 border-2 border-pink-600 shadow-inner">
            <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
              <use href="#icon-pearl" />
            </svg>
            <span className="font-black text-xs sm:text-sm text-pink-300 tracking-wide font-mono">
              {profile.pearls.toLocaleString()}
            </span>
          </div>

          {/* Leaves */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/90 border-2 border-emerald-600 shadow-inner">
            <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
              <use href="#icon-leaf" />
            </svg>
            <span className="font-black text-xs sm:text-sm text-emerald-300 tracking-wide font-mono">
              {profile.leaves.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Right Action Icons: Leaderboard, Idiom Book, PowerUps, Shop, Audio, Fullscreen */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Leaderboard */}
          <button
            onClick={() => {
              sound.playCoin();
              onOpenLeaderboard();
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-b from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 border-2 border-yellow-800 text-stone-900 font-black text-xs sm:text-sm shadow-md flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
            title="即時排行榜"
          >
            <Trophy className="w-4 h-4 text-stone-950" />
            <span className="hidden md:inline">排行榜</span>
          </button>

          {/* PowerUps Bag */}
          <button
            onClick={() => {
              sound.playPowerUp();
              onOpenPowerUps();
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-b from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 border-2 border-purple-900 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-1 active:scale-95 transition-all cursor-pointer relative"
            title="道具與武器庫"
          >
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="hidden md:inline">武器庫</span>
            {totalPowerUps > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-stone-900">
                {totalPowerUps}
              </span>
            )}
          </button>

          {/* Idiom Book / Study */}
          <button
            onClick={() => {
              sound.playPowerUp();
              onOpenIdiomBook();
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-b from-blue-500 to-cyan-700 hover:from-blue-400 hover:to-cyan-600 border-2 border-blue-900 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
            title="喇沙成語字典與溫習"
          >
            <BookOpen className="w-4 h-4 text-cyan-200" />
            <span className="hidden md:inline">成語字典</span>
          </button>

          {/* Shop */}
          <button
            onClick={() => {
              sound.playCoin();
              onOpenShop();
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-b from-rose-500 to-red-700 hover:from-rose-400 hover:to-red-600 border-2 border-rose-900 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
            title="夥伴與背景商店"
          >
            <ShoppingBag className="w-4 h-4 text-yellow-200" />
            <span className="hidden md:inline">商店</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 border-2 border-stone-600 text-stone-200 shadow-md active:scale-95 transition-all cursor-pointer"
            title={isMuted ? '開啟音效' : '關閉音效'}
            aria-label="靜音切換"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-green-400" />}
          </button>

          {/* Fullscreen (iPad Pro 13" optimization) */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 border-2 border-stone-600 text-stone-200 shadow-md active:scale-95 transition-all cursor-pointer hidden sm:block"
            title="全螢幕模式 (iPad Pro 最佳化)"
          >
            <Maximize2 className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </div>
    </header>
  );
};
