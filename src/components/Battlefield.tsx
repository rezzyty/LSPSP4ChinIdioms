import React, { useState, useRef, useEffect } from 'react';
import { BirdAvatar } from './BirdSvg';
import { GAME_BACKGROUNDS } from '../data/backgrounds';
import { sound } from '../utils/audio';

interface BattlefieldProps {
  birdId: string;
  hatId: string;
  backgroundId: string;
  isLaunching: boolean;
  isHit: boolean;
  isFail: boolean;
  isGoldenSlingActive?: boolean;
  isSpeedActive?: boolean;
  comboStreak: number;
}

export const Battlefield: React.FC<BattlefieldProps> = ({
  birdId,
  hatId,
  backgroundId,
  isLaunching,
  isHit,
  isFail,
  isGoldenSlingActive = false,
  isSpeedActive = false,
  comboStreak
}) => {
  const currentBg = GAME_BACKGROUNDS.find(b => b.id === backgroundId) || GAME_BACKGROUNDS[0];

  // Slingshot drag interactive simulation (for iPad Pro touch & desktop mouse)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isLaunching) return;
    setIsDragging(true);
    sound.playSlingStretch();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    // Bound pull to sensible slingshot range
    const maxPull = 50;
    const newX = Math.max(-maxPull, Math.min(10, dragOffset.x + e.movementX));
    const newY = Math.max(-20, Math.min(maxPull, dragOffset.y + e.movementY));
    setDragOffset({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    // snap back with sound
    sound.playLaunch();
    setDragOffset({ x: 0, y: 0 });
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-52 sm:h-64 md:h-72 lg:h-80 rounded-3xl overflow-hidden border-4 border-amber-800 shadow-2xl select-none transition-all duration-700 bg-gradient-to-b ${currentBg.skyGradient}`}
      style={{ touchAction: 'none' }}
    >
      {/* Background Decor: Clouds, Stars, or Lava Sparks */}
      {currentBg.theme === 'space' ? (
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute top-4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute top-12 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
          <div className="absolute top-8 right-16 w-12 h-12 rounded-full border-2 border-purple-400/40 bg-purple-900/30" />
        </div>
      ) : currentBg.theme === 'snow' ? (
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-4 left-1/3 w-3 h-3 bg-white/70 rounded-full blur-[1px] animate-bounce" />
          <div className="absolute top-16 right-1/4 w-2 h-2 bg-cyan-100 rounded-full animate-pulse" />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-6 left-12 w-28 h-10 bg-white/80 rounded-full blur-md" />
          <div className="absolute top-14 right-20 w-36 h-12 bg-white/70 rounded-full blur-md" />
        </div>
      )}

      {/* Speed Trails indicator */}
      {isSpeedActive && (
        <div className="absolute inset-0 bg-yellow-400/10 pointer-events-none flex items-center justify-center">
          <div className="text-yellow-300/40 font-black text-6xl tracking-widest uppercase italic animate-pulse">
            SPEED SURGE ⚡
          </div>
        </div>
      )}

      {/* Combo streak banner */}
      {comboStreak >= 2 && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-sm sm:text-base border-2 border-yellow-300 shadow-xl flex items-center gap-1.5 animate-bounce">
          <span>🔥</span>
          <span>連勝 x{comboStreak}！衝刺加成中</span>
        </div>
      )}

      {/* Ground Surface */}
      <div className={`absolute bottom-0 left-0 right-0 h-14 sm:h-18 bg-gradient-to-t ${currentBg.groundClass} border-t-4 z-10 flex items-start justify-between px-4`}>
        {/* Grass or Ground tufts */}
        <div className="w-8 h-2 bg-white/20 rounded-full mt-2" />
        <div className="w-12 h-2 bg-white/10 rounded-full mt-3" />
        <div className="w-16 h-2 bg-white/20 rounded-full mt-1.5" />
      </div>

      {/* Left side: Slingshot & Bird */}
      <div className="absolute bottom-10 sm:bottom-12 left-6 sm:left-14 md:left-20 z-20 flex flex-col items-center">
        {/* Slingshot SVG */}
        <div className="relative w-20 h-28 sm:w-24 sm:h-32 flex justify-center items-end">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <use href={isGoldenSlingActive ? '#golden-slingshot' : '#slingshot'} />
          </svg>

          {/* Elastic Rubber Bands */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none z-15"
          >
            <line
              x1="25"
              y1="25"
              x2={50 + dragOffset.x}
              y2={45 + dragOffset.y}
              stroke="#5c2e0b"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="65"
              y1="25"
              x2={50 + dragOffset.x}
              y2={45 + dragOffset.y}
              stroke="#5c2e0b"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          {/* Active Flying or Slingshot Loaded Bird */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className={`absolute z-20 cursor-grab active:cursor-grabbing touch-none transition-transform ${
              isLaunching
                ? 'transition-all duration-500 ease-out pointer-events-none'
                : isFail
                ? 'transition-all duration-500 ease-in'
                : ''
            }`}
            style={{
              width: '56px',
              height: '56px',
              bottom: isLaunching ? undefined : '36px',
              left: isLaunching ? undefined : '50%',
              transform: isLaunching
                ? 'translate(calc(60vw), -60px) rotate(720deg) scale(1.15)'
                : isFail
                ? 'translateY(50px) rotate(-90deg) scale(0.9)'
                : `translate(calc(-50% + ${dragOffset.x}px), ${dragOffset.y}px)`
            }}
          >
            <BirdAvatar birdId={birdId} hatId={hatId} className="w-full h-full drop-shadow-2xl" />

            {/* Pull prompt if not dragging */}
            {!isDragging && !isLaunching && !isFail && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 text-white text-[10px] font-black px-2 py-0.5 rounded-full pointer-events-none border border-amber-400">
                可觸控拉彈弓
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Enemy Pig with Wooden Fort */}
      <div className="absolute bottom-10 sm:bottom-12 right-6 sm:right-16 md:right-24 z-20 flex flex-col items-center">
        {/* Wooden Fort blocks */}
        <div
          className={`relative transition-all duration-500 ${
            isHit
              ? 'translate-y-16 rotate-45 opacity-0 scale-75'
              : isFail
              ? 'animate-bounce'
              : ''
          }`}
        >
          {/* Wooden Block Platform */}
          <div className="w-24 sm:w-28 h-6 bg-amber-800 border-2 border-amber-950 rounded-md shadow-md flex justify-around items-center">
            <div className="w-2 h-2 rounded-full bg-stone-900/50" />
            <div className="w-2 h-2 rounded-full bg-stone-900/50" />
            <div className="w-2 h-2 rounded-full bg-stone-900/50" />
          </div>

          {/* Enemy Pig standing on fort */}
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 -mt-16 mx-auto relative transition-transform ${
              isDragging ? 'scale-90 -translate-y-1' : ''
            }`}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
              <use href={comboStreak >= 4 ? '#pig-king' : comboStreak >= 2 ? '#pig-helmet' : '#pig'} />
            </svg>

            {/* Pig exclamation when being aimed at */}
            {isDragging && (
              <div className="absolute -top-6 -right-2 bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded-full border border-white animate-ping">
                !
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
