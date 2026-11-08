import React, { useState } from 'react';
import { UserProfile, BirdCharacter, HatAccessory, GameBackground } from '../types';
import { BIRD_CHARACTERS, HAT_ACCESSORIES } from '../data/characters';
import { GAME_BACKGROUNDS } from '../data/backgrounds';
import { POWER_UPS, PowerUpItem } from '../data/powerups';
import { BirdAvatar } from './BirdSvg';
import { X, Check, Lock, ShoppingBag, Sparkles, Zap, Image as ImageIcon, Feather } from 'lucide-react';
import { sound } from '../utils/audio';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<'birds' | 'hats' | 'backgrounds' | 'powerups'>('birds');
  const [birdCategory, setBirdCategory] = useState<'all' | 'classic' | 'special' | 'chick'>('all');

  if (!isOpen) return null;

  // Buy bird
  const handleBuyBird = (bird: BirdCharacter) => {
    const { price } = bird;
    if (
      profile.coins >= price.coins &&
      profile.gems >= price.gems &&
      profile.pearls >= price.pearls &&
      profile.leaves >= price.leaves
    ) {
      sound.playPowerUp();
      const updated: UserProfile = {
        ...profile,
        coins: profile.coins - price.coins,
        gems: profile.gems - price.gems,
        pearls: profile.pearls - price.pearls,
        leaves: profile.leaves - price.leaves,
        unlockedBirds: [...profile.unlockedBirds, bird.id],
        equippedBird: bird.id
      };
      onUpdateProfile(updated);
    } else {
      sound.playWrong();
    }
  };

  // Equip bird
  const handleEquipBird = (birdId: string) => {
    sound.playCoin();
    onUpdateProfile({
      ...profile,
      equippedBird: birdId
    });
  };

  // Buy hat
  const handleBuyHat = (hat: HatAccessory) => {
    const { price } = hat;
    if (
      profile.coins >= price.coins &&
      profile.gems >= price.gems &&
      profile.pearls >= price.pearls &&
      profile.leaves >= price.leaves
    ) {
      sound.playPowerUp();
      const updated: UserProfile = {
        ...profile,
        coins: profile.coins - price.coins,
        gems: profile.gems - price.gems,
        pearls: profile.pearls - price.pearls,
        leaves: profile.leaves - price.leaves,
        unlockedHats: [...profile.unlockedHats, hat.id],
        equippedHat: hat.id
      };
      onUpdateProfile(updated);
    } else {
      sound.playWrong();
    }
  };

  // Equip hat
  const handleEquipHat = (hatId: string) => {
    sound.playCoin();
    onUpdateProfile({
      ...profile,
      equippedHat: hatId
    });
  };

  // Buy background
  const handleBuyBackground = (bg: GameBackground) => {
    const { price } = bg;
    if (
      profile.coins >= price.coins &&
      profile.gems >= price.gems &&
      profile.pearls >= price.pearls &&
      profile.leaves >= price.leaves
    ) {
      sound.playPowerUp();
      const updated: UserProfile = {
        ...profile,
        coins: profile.coins - price.coins,
        gems: profile.gems - price.gems,
        pearls: profile.pearls - price.pearls,
        leaves: profile.leaves - price.leaves,
        unlockedBackgrounds: [...profile.unlockedBackgrounds, bg.id],
        activeBackground: bg.id
      };
      onUpdateProfile(updated);
    } else {
      sound.playWrong();
    }
  };

  // Set active background
  const handleSelectBackground = (bgId: string) => {
    sound.playCoin();
    onUpdateProfile({
      ...profile,
      activeBackground: bgId
    });
  };

  // Buy powerup
  const handleBuyPowerUp = (item: PowerUpItem) => {
    if (profile.coins >= item.cost.coins && profile.gems >= item.cost.gems) {
      sound.playPowerUp();
      const updated: UserProfile = {
        ...profile,
        coins: profile.coins - item.cost.coins,
        gems: profile.gems - item.cost.gems,
        powerUps: {
          ...profile.powerUps,
          [item.key]: (profile.powerUps[item.key] || 0) + 1
        }
      };
      onUpdateProfile(updated);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-stone-900 border-4 border-rose-500 rounded-3xl shadow-2xl p-5 sm:p-8 text-white max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-rose-800/60 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shadow-lg border-2 border-rose-200">
              <ShoppingBag className="w-7 h-7 text-stone-950" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-rose-300 tracking-wide flex items-center gap-2">
                夥伴與裝備商店
              </h2>
              <p className="text-xs sm:text-sm text-stone-300">
                花費成語戰鬥賺取的貨幣，解鎖怒鳥英雄、特殊帽子、自訂背景與加速武器！
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

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 shrink-0">
          <button
            onClick={() => setActiveTab('birds')}
            className={`py-2 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
              activeTab === 'birds'
                ? 'bg-gradient-to-b from-rose-500 to-red-600 text-white border-rose-300 shadow-md scale-[1.02]'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700'
            }`}
          >
            <Feather className="w-4 h-4" /> 鳥類夥伴 ({BIRD_CHARACTERS.length})
          </button>

          <button
            onClick={() => setActiveTab('hats')}
            className={`py-2 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
              activeTab === 'hats'
                ? 'bg-gradient-to-b from-amber-500 to-yellow-600 text-stone-950 border-amber-300 shadow-md scale-[1.02]'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700'
            }`}
          >
            <Sparkles className="w-4 h-4" /> 帽子配件 ({HAT_ACCESSORIES.length})
          </button>

          <button
            onClick={() => setActiveTab('backgrounds')}
            className={`py-2 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
              activeTab === 'backgrounds'
                ? 'bg-gradient-to-b from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-md scale-[1.02]'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> 自訂戰鬥背景 ({GAME_BACKGROUNDS.length})
          </button>

          <button
            onClick={() => setActiveTab('powerups')}
            className={`py-2 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
              activeTab === 'powerups'
                ? 'bg-gradient-to-b from-purple-500 to-indigo-600 text-white border-purple-300 shadow-md scale-[1.02]'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700'
            }`}
          >
            <Zap className="w-4 h-4 text-yellow-300" /> 武器與加速道具
          </button>
        </div>

        {/* Bird subcategory filter */}
        {activeTab === 'birds' && (
          <div className="flex gap-2 mb-4 shrink-0">
            {(['all', 'classic', 'special', 'chick'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setBirdCategory(cat)}
                className={`py-1 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  birdCategory === cat
                    ? 'bg-rose-900/90 text-rose-200 border border-rose-500'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {cat === 'all' && '全部夥伴'}
                {cat === 'classic' && '經典主戰鳥'}
                {cat === 'special' && '特殊英雄鳥'}
                {cat === 'chick' && '小雞應援團'}
              </button>
            ))}
          </div>
        )}

        {/* Content container */}
        <div className="overflow-y-auto pr-1 flex-grow">
          {/* 1. Birds Tab */}
          {activeTab === 'birds' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {BIRD_CHARACTERS.filter(b => birdCategory === 'all' || b.category === birdCategory).map(bird => {
                const isUnlocked = profile.unlockedBirds.includes(bird.id);
                const isEquipped = profile.equippedBird === bird.id;
                const canAfford =
                  profile.coins >= bird.price.coins &&
                  profile.gems >= bird.price.gems &&
                  profile.pearls >= bird.price.pearls &&
                  profile.leaves >= bird.price.leaves;

                return (
                  <div
                    key={bird.id}
                    className={`rounded-2xl p-3 flex flex-col justify-between items-center text-center border-2 transition-all ${
                      isEquipped
                        ? 'bg-rose-950/80 border-yellow-400 shadow-lg ring-2 ring-yellow-400/30'
                        : isUnlocked
                        ? 'bg-stone-800/90 border-stone-700 hover:border-rose-400'
                        : 'bg-stone-900/80 border-stone-800 opacity-90'
                    }`}
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2">
                      <BirdAvatar birdId={bird.id} hatId={isEquipped ? profile.equippedHat : 'none'} className="w-full h-full" />
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] rounded-full flex items-center justify-center">
                          <Lock className="w-6 h-6 text-stone-300" />
                        </div>
                      )}
                    </div>

                    <h4 className="font-black text-sm text-yellow-200 line-clamp-1">{bird.name}</h4>
                    <p className="text-[11px] text-stone-400 mt-1 line-clamp-2 min-h-[30px] leading-tight">
                      {bird.ability}
                    </p>

                    {/* Price or status */}
                    <div className="w-full mt-3">
                      {isEquipped ? (
                        <div className="py-1.5 rounded-xl bg-yellow-400/20 text-yellow-300 font-black text-xs border border-yellow-400/40">
                          出戰中 ✓
                        </div>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => handleEquipBird(bird.id)}
                          className="w-full py-1.5 rounded-xl bg-green-600 hover:bg-green-500 font-black text-xs shadow cursor-pointer active:scale-95"
                        >
                          選擇出戰
                        </button>
                      ) : (
                        <div>
                          <div className="flex flex-wrap justify-center gap-1.5 text-[10px] text-stone-300 font-bold mb-1.5">
                            {bird.price.coins > 0 && <span>💰{bird.price.coins}</span>}
                            {bird.price.gems > 0 && <span>💎{bird.price.gems}</span>}
                            {bird.price.pearls > 0 && <span>🦪{bird.price.pearls}</span>}
                            {bird.price.leaves > 0 && <span>🍃{bird.price.leaves}</span>}
                          </div>
                          <button
                            onClick={() => handleBuyBird(bird)}
                            disabled={!canAfford}
                            className={`w-full py-1.5 rounded-xl font-black text-xs shadow active:scale-95 transition-all ${
                              canAfford
                                ? 'bg-gradient-to-b from-yellow-500 to-amber-600 hover:from-yellow-400 text-stone-950 cursor-pointer'
                                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                            }`}
                          >
                            {canAfford ? '解鎖購買' : '資源不足'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 2. Hats Tab */}
          {activeTab === 'hats' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* None hat option */}
              <div
                className={`rounded-2xl p-4 flex flex-col justify-between items-center text-center border-2 ${
                  profile.equippedHat === 'none'
                    ? 'bg-amber-950/80 border-yellow-400 ring-2 ring-yellow-400/30'
                    : 'bg-stone-800/90 border-stone-700'
                }`}
              >
                <div className="w-20 h-20 rounded-full bg-stone-900 border-2 border-stone-700 flex items-center justify-center text-stone-400 text-2xl font-black mb-3">
                  無帽子
                </div>
                <h4 className="font-black text-base text-yellow-200">自然本色</h4>
                <p className="text-xs text-stone-400 mt-1">展示怒鳥原生羽毛外型</p>
                <button
                  onClick={() => handleEquipHat('none')}
                  className="w-full mt-4 py-2 rounded-xl bg-stone-700 hover:bg-stone-600 font-black text-xs cursor-pointer active:scale-95"
                >
                  {profile.equippedHat === 'none' ? '當前配戴中' : '脫下帽子'}
                </button>
              </div>

              {HAT_ACCESSORIES.map(hat => {
                const isUnlocked = profile.unlockedHats.includes(hat.id);
                const isEquipped = profile.equippedHat === hat.id;
                const canAfford =
                  profile.coins >= hat.price.coins &&
                  profile.gems >= hat.price.gems &&
                  profile.pearls >= hat.price.pearls &&
                  profile.leaves >= hat.price.leaves;

                return (
                  <div
                    key={hat.id}
                    className={`rounded-2xl p-4 flex flex-col justify-between items-center text-center border-2 transition-all ${
                      isEquipped
                        ? 'bg-amber-950/80 border-yellow-400 ring-2 ring-yellow-400/30 shadow-lg'
                        : isUnlocked
                        ? 'bg-stone-800/90 border-stone-700 hover:border-amber-400'
                        : 'bg-stone-900/80 border-stone-800'
                    }`}
                  >
                    <div className="relative w-20 h-20 mb-3">
                      <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 absolute inset-0">
                        <use href="#bird-red" />
                      </svg>
                      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-md">
                        <use href={`#hat-${hat.id}`} />
                      </svg>
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] rounded-full flex items-center justify-center z-20">
                          <Lock className="w-6 h-6 text-stone-300" />
                        </div>
                      )}
                    </div>

                    <h4 className="font-black text-base text-yellow-200">{hat.name}</h4>
                    <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                      {hat.description}
                    </p>

                    <div className="w-full mt-4">
                      {isEquipped ? (
                        <div className="py-2 rounded-xl bg-yellow-400/20 text-yellow-300 font-black text-xs border border-yellow-400/40">
                          配戴中 ✓
                        </div>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => handleEquipHat(hat.id)}
                          className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-500 font-black text-xs shadow cursor-pointer active:scale-95"
                        >
                          佩戴此帽
                        </button>
                      ) : (
                        <div>
                          <div className="flex flex-wrap justify-center gap-1.5 text-xs text-stone-300 font-bold mb-2">
                            {hat.price.coins > 0 && <span>💰{hat.price.coins}</span>}
                            {hat.price.gems > 0 && <span>💎{hat.price.gems}</span>}
                            {hat.price.pearls > 0 && <span>🦪{hat.price.pearls}</span>}
                            {hat.price.leaves > 0 && <span>🍃{hat.price.leaves}</span>}
                          </div>
                          <button
                            onClick={() => handleBuyHat(hat)}
                            disabled={!canAfford}
                            className={`w-full py-2 rounded-xl font-black text-xs shadow active:scale-95 transition-all ${
                              canAfford
                                ? 'bg-gradient-to-b from-yellow-500 to-amber-600 hover:from-yellow-400 text-stone-950 cursor-pointer'
                                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                            }`}
                          >
                            {canAfford ? '解鎖購買' : '資源不足'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 3. Backgrounds Tab */}
          {activeTab === 'backgrounds' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {GAME_BACKGROUNDS.map(bg => {
                const isUnlocked = profile.unlockedBackgrounds.includes(bg.id);
                const isActive = profile.activeBackground === bg.id;
                const canAfford =
                  profile.coins >= bg.price.coins &&
                  profile.gems >= bg.price.gems &&
                  profile.pearls >= bg.price.pearls &&
                  profile.leaves >= bg.price.leaves;

                return (
                  <div
                    key={bg.id}
                    className={`rounded-2xl p-4 flex flex-col justify-between border-2 transition-all ${
                      isActive
                        ? 'bg-cyan-950/80 border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg'
                        : isUnlocked
                        ? 'bg-stone-800/90 border-stone-700 hover:border-cyan-400'
                        : 'bg-stone-900/80 border-stone-800'
                    }`}
                  >
                    {/* Background Preview Banner */}
                    <div className={`w-full h-24 rounded-xl bg-gradient-to-b ${bg.skyGradient} p-2 relative overflow-hidden flex flex-col justify-end shadow-inner mb-3`}>
                      <div className={`w-full h-6 rounded-t-lg bg-gradient-to-r ${bg.groundClass} border-t-2`} />
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                          <Lock className="w-8 h-8 text-stone-300" />
                        </div>
                      )}
                    </div>

                    <h4 className="font-black text-lg text-yellow-200">{bg.name}</h4>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      {bg.description}
                    </p>

                    <div className="w-full mt-4">
                      {isActive ? (
                        <div className="py-2 rounded-xl bg-cyan-400/20 text-cyan-300 font-black text-xs text-center border border-cyan-400/40">
                          使用中 ✓
                        </div>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => handleSelectBackground(bg.id)}
                          className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-500 font-black text-xs shadow cursor-pointer active:scale-95"
                        >
                          應用此背景
                        </button>
                      ) : (
                        <div>
                          <div className="flex flex-wrap justify-center gap-1.5 text-xs text-stone-300 font-bold mb-2">
                            {bg.price.coins > 0 && <span>💰{bg.price.coins}</span>}
                            {bg.price.gems > 0 && <span>💎{bg.price.gems}</span>}
                            {bg.price.pearls > 0 && <span>🦪{bg.price.pearls}</span>}
                            {bg.price.leaves > 0 && <span>🍃{bg.price.leaves}</span>}
                          </div>
                          <button
                            onClick={() => handleBuyBackground(bg)}
                            disabled={!canAfford}
                            className={`w-full py-2 rounded-xl font-black text-xs shadow active:scale-95 transition-all ${
                              canAfford
                                ? 'bg-gradient-to-b from-yellow-500 to-amber-600 hover:from-yellow-400 text-stone-950 cursor-pointer'
                                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                            }`}
                          >
                            {canAfford ? '解鎖背景' : '資源不足'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. PowerUps Tab */}
          {activeTab === 'powerups' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {POWER_UPS.map(item => {
                const count = profile.powerUps[item.key] || 0;
                const canAfford = profile.coins >= item.cost.coins && profile.gems >= item.cost.gems;

                return (
                  <div
                    key={item.key}
                    className="rounded-2xl p-4 bg-stone-800/90 border-2 border-stone-700 hover:border-purple-400 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-3xl">{item.icon}</div>
                        <span className="bg-purple-950/80 text-purple-300 text-xs font-black px-2.5 py-1 rounded-full border border-purple-700">
                          庫存: {count}
                        </span>
                      </div>

                      <h4 className="font-black text-base sm:text-lg text-yellow-200">
                        {item.name}
                      </h4>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="mt-2 text-[11px] font-bold text-amber-300 bg-amber-950/50 px-2 py-1 rounded border border-amber-800/50">
                        ⚡ {item.speedEffect}
                      </div>
                    </div>

                    <div className="w-full mt-4">
                      <div className="flex items-center justify-center gap-2 text-xs font-bold text-stone-300 mb-2">
                        <span>💰 {item.cost.coins} 金幣</span>
                        {item.cost.gems > 0 && <span>💎 {item.cost.gems} 寶石</span>}
                      </div>
                      <button
                        onClick={() => handleBuyPowerUp(item)}
                        disabled={!canAfford}
                        className={`w-full py-2 rounded-xl font-black text-xs shadow active:scale-95 transition-all ${
                          canAfford
                            ? 'bg-gradient-to-b from-purple-500 to-indigo-600 hover:from-purple-400 text-white cursor-pointer'
                            : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? '購買 +1' : '資源不足'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-stone-800 text-center text-xs text-stone-400 shrink-0">
          於關卡答題時可隨時點擊右側道具欄發動加速與技能，助你刷新歷史最高紀錄！
        </div>
      </div>
    </div>
  );
};
