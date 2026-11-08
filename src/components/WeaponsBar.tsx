import React from 'react';
import { PowerUpInventory } from '../types';
import { POWER_UPS } from '../data/powerups';
import { sound } from '../utils/audio';

interface WeaponsBarProps {
  inventory: PowerUpInventory;
  onUsePowerUp: (key: keyof PowerUpInventory) => void;
  activeEffects: {
    speedWing?: boolean;
    goldenSling?: boolean;
    streakShield?: boolean;
  };
  disabled?: boolean;
}

export const WeaponsBar: React.FC<WeaponsBarProps> = ({
  inventory,
  onUsePowerUp,
  activeEffects,
  disabled = false
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-1.5 sm:gap-3 py-2 px-3 rounded-2xl bg-stone-900/90 border-2 border-purple-600/70 shadow-xl backdrop-blur-md">
      <div className="text-xs font-black text-purple-300 hidden sm:block shrink-0 uppercase tracking-wider">
        ⚡ 戰鬥武器
      </div>

      <div className="flex items-center justify-around gap-2 w-full sm:w-auto flex-grow">
        {POWER_UPS.map(item => {
          const count = inventory[item.key] || 0;
          const isActive =
            (item.key === 'speedWing' && activeEffects.speedWing) ||
            (item.key === 'goldenSling' && activeEffects.goldenSling) ||
            (item.key === 'streakShield' && activeEffects.streakShield);

          return (
            <button
              key={item.key}
              onClick={() => {
                if (count > 0 && !disabled) {
                  sound.playPowerUp();
                  onUsePowerUp(item.key);
                }
              }}
              disabled={count === 0 || disabled || isActive}
              className={`relative flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border-2 transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-yellow-500 border-yellow-300 text-stone-950 font-black shadow-lg animate-pulse ring-2 ring-yellow-400'
                  : count > 0 && !disabled
                  ? 'bg-stone-800 hover:bg-stone-700 border-purple-500/80 text-white shadow-md'
                  : 'bg-stone-900 border-stone-800 text-stone-600 cursor-not-allowed opacity-60'
              }`}
              title={`${item.name} (${item.desc})`}
            >
              <span className="text-lg sm:text-xl leading-none">{item.icon}</span>
              <div className="text-left hidden md:block">
                <div className="text-[11px] font-black leading-tight">{item.name}</div>
                <div className="text-[9px] text-stone-400 leading-tight">
                  {isActive ? '作用中' : item.badge}
                </div>
              </div>

              {/* Count badge */}
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded-full border ${
                  isActive
                    ? 'bg-stone-900 text-yellow-300 border-stone-950'
                    : count > 0
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-stone-800 text-stone-500 border-stone-700'
                }`}
              >
                {isActive ? 'ON' : count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
