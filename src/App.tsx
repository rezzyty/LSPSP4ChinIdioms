import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  ExerciseSet,
  Question,
  PowerUpInventory
} from './types';
import { EXERCISE_SETS } from './data/idiomData';
import { GAME_BACKGROUNDS } from './data/backgrounds';
import { BIRD_CHARACTERS } from './data/characters';
import {
  getStoredProfiles,
  saveProfiles,
  getActiveAccountId,
  setActiveAccountId,
  calculateLeaderboard
} from './utils/storage';
import { sound } from './utils/audio';

import { BirdSvgDefs, BirdAvatar } from './components/BirdSvg';
import { HeaderHUD } from './components/HeaderHUD';
import { ProfileModal } from './components/ProfileModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { IdiomBookModal } from './components/IdiomBookModal';
import { ShopModal } from './components/ShopModal';
import { Battlefield } from './components/Battlefield';
import { WeaponsBar } from './components/WeaponsBar';
import { AdminModal } from './components/AdminModal';
import { SecretRechargeModal } from './components/SecretRechargeModal';

import {
  Star,
  Trophy,
  Play,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft
} from 'lucide-react';

interface AnswerReviewItem {
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
}

export default function App() {
  // Profiles State
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>(() => getStoredProfiles());
  const [activeId, setActiveId] = useState<string>(() => getActiveAccountId());
  const activeProfile = profiles[activeId] || profiles['melaine'];

  // Audio State
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.isMuted());

  // Navigation Screens
  const [currentScreen, setCurrentScreen] = useState<'home' | 'exercise-select' | 'game' | 'result'>('home');
  const [selectedStageId, setSelectedStageId] = useState<number>(1);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(1);

  // Active Game State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerReviewItem[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);

  // Battlefield Animation State
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [isHit, setIsHit] = useState<boolean>(false);
  const [isFail, setIsFail] = useState<boolean>(false);

  // PowerUp Active Effects
  const [activeEffects, setActiveEffects] = useState<{
    speedWing?: boolean;
    goldenSling?: boolean;
    streakShield?: boolean;
    magnet?: boolean;
  }>({});

  // Modals
  const [showProfilesModal, setShowProfilesModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showIdiomBookModal, setShowIdiomBookModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showSecretRechargeModal, setShowSecretRechargeModal] = useState(false);

  // Secret corner trigger (tap bottom-right corner 5 times)
  const [secretCornerClicks, setSecretCornerClicks] = useState(0);
  const secretTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSecretCornerClick = () => {
    setSecretCornerClicks(prev => {
      const next = prev + 1;
      if (next >= 5) {
        sound.playPowerUp();
        setShowSecretRechargeModal(true);
        return 0;
      }
      return next;
    });

    if (secretTimerRef.current) clearTimeout(secretTimerRef.current);
    secretTimerRef.current = setTimeout(() => {
      setSecretCornerClicks(0);
    }, 1500);
  };

  // Rewards won in this session
  const [sessionRewards, setSessionRewards] = useState<{
    coins: number;
    gems: number;
    pearls: number;
    leaves: number;
    unlockedBird?: string;
  }>({ coins: 0, gems: 0, pearls: 0, leaves: 0 });

  // Sync profiles to localStorage
  useEffect(() => {
    saveProfiles(profiles);
  }, [profiles]);

  // Handle Profile Switch
  const handleSelectProfile = (id: string) => {
    setActiveId(id);
    setActiveAccountId(id);
    setShowProfilesModal(false);
  };

  // Handle Profile Name Update
  const handleUpdateProfileName = (id: string, newName: string) => {
    setProfiles(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        name: newName
      }
    }));
  };

  // Update current active profile
  const updateCurrentProfile = (updated: UserProfile) => {
    setProfiles(prev => ({
      ...prev,
      [activeId]: updated
    }));
  };

  // Sound toggle
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Start a Stage
  const handleStartStage = (stageId: number) => {
    sound.playCoin();
    setSelectedStageId(stageId);
    setCurrentScreen('exercise-select');
  };

  // Start an Exercise
  const handleStartExercise = (exerciseNum: number) => {
    sound.playPowerUp();
    setSelectedExerciseIndex(exerciseNum);

    const stage = EXERCISE_SETS.find(s => s.id === selectedStageId) || EXERCISE_SETS[0];
    const rawQuestions = stage.exercises[exerciseNum] || [];

    // Shuffle questions
    const shuffled = [...rawQuestions].sort(() => Math.random() - 0.5);

    setQuestions(shuffled);
    setCurrentQIndex(0);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setEliminatedOptions([]);
    setIsLaunching(false);
    setIsHit(false);
    setIsFail(false);
    setActiveEffects({});

    setCurrentScreen('game');
  };

  // Use a PowerUp
  const handleUsePowerUp = (key: keyof PowerUpInventory) => {
    if (activeProfile.powerUps[key] <= 0 || isAnswerChecked) return;

    // Deduct 1 from inventory
    const updatedPowerUps = {
      ...activeProfile.powerUps,
      [key]: activeProfile.powerUps[key] - 1
    };
    updateCurrentProfile({
      ...activeProfile,
      powerUps: updatedPowerUps
    });

    if (key === 'speedWing') {
      setActiveEffects(prev => ({ ...prev, speedWing: true }));
    } else if (key === 'goldenSling') {
      setActiveEffects(prev => ({ ...prev, goldenSling: true }));
    } else if (key === 'streakShield') {
      setActiveEffects(prev => ({ ...prev, streakShield: true }));
    } else if (key === 'magnet') {
      setActiveEffects(prev => ({ ...prev, magnet: true }));
    } else if (key === 'laserAim') {
      // Eliminate 2 wrong answers
      const currentQ = questions[currentQIndex];
      if (currentQ) {
        const wrongOpts = currentQ.options.filter(o => o !== currentQ.a && !eliminatedOptions.includes(o));
        const toEliminate = wrongOpts.slice(0, 2);
        setEliminatedOptions(prev => [...prev, ...toEliminate]);
      }
    } else if (key === 'tntBomb') {
      // Trigger blast animation on pig
      sound.playPigHit();
      setIsHit(true);
      setTimeout(() => setIsHit(false), 800);
      // Give instant +10 bonus coins
      updateCurrentProfile({
        ...activeProfile,
        coins: activeProfile.coins + 10,
        powerUps: updatedPowerUps
      });
    }
  };

  // Check Answer
  const handleCheckAnswer = (option: string) => {
    if (isAnswerChecked || !questions[currentQIndex]) return;

    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentQ = questions[currentQIndex];
    const isCorrect = option === currentQ.a;

    // Launch Bird
    sound.playLaunch();
    setIsLaunching(true);

    setTimeout(() => {
      if (isCorrect) {
        sound.playCorrect();
        sound.playPigHit();
        setIsHit(true);

        const newStreak = streak + 1;
        setStreak(newStreak);

        // Score multiplier if Golden Slingshot or Speed Wing active
        const scoreInc = (activeEffects.goldenSling ? 2 : 1) * 10;
        setScore(prev => prev + scoreInc);

        // In-game bonus rewards
        let bonusCoins = 10 + (newStreak > 1 ? 5 : 0);
        if (activeEffects.speedWing) bonusCoins *= 2;
        if (activeEffects.magnet) bonusCoins += 10;

        let bonusGems = 0;
        let bonusPearls = 0;
        let bonusLeaves = 1;

        if (newStreak >= 3 && Math.random() > 0.4) bonusGems += 1;
        if (newStreak >= 5 && Math.random() > 0.6) bonusPearls += 1;
        if (activeEffects.magnet && Math.random() > 0.5) bonusLeaves += 2;

        updateCurrentProfile({
          ...activeProfile,
          coins: activeProfile.coins + bonusCoins,
          gems: activeProfile.gems + bonusGems,
          pearls: activeProfile.pearls + bonusPearls,
          leaves: activeProfile.leaves + bonusLeaves,
          totalCorrect: activeProfile.totalCorrect + 1,
          totalQuestionsAnswered: activeProfile.totalQuestionsAnswered + 1,
          highestStreak: Math.max(activeProfile.highestStreak, newStreak)
        });
      } else {
        sound.playWrong();
        setIsFail(true);

        // Check if shield was active
        if (activeEffects.streakShield) {
          // Shield saved the streak!
          sound.playPowerUp();
          setActiveEffects(prev => ({ ...prev, streakShield: false }));
        } else {
          setStreak(0);
        }

        // Small consolation coins
        updateCurrentProfile({
          ...activeProfile,
          coins: activeProfile.coins + 2,
          totalQuestionsAnswered: activeProfile.totalQuestionsAnswered + 1
        });
      }

      // Record for question review
      setUserAnswers(prev => [
        ...prev,
        {
          question: currentQ.q,
          selected: option,
          correct: currentQ.a,
          isCorrect
        }
      ]);
    }, 450);
  };

  // Next Question or End Game
  const handleNextQuestion = () => {
    sound.playCoin();
    setIsLaunching(false);
    setIsHit(false);
    setIsFail(false);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setEliminatedOptions([]);

    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      finishExercise();
    }
  };

  // Finish Exercise & Compute Rewards
  const finishExercise = () => {
    const totalQ = questions.length;
    // Calculate stars
    const correctCount = userAnswers.filter(a => a.isCorrect).length + (selectedOption === questions[currentQIndex]?.a ? 1 : 0);
    const pct = correctCount / totalQ;

    let earnedStars = 1;
    if (pct === 1) earnedStars = 3;
    else if (pct >= 0.7) earnedStars = 2;

    if (earnedStars === 3) {
      sound.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      sound.playFanfare();
    }

    // Save high score and stars to profile
    const stageKey = `stage${selectedStageId}_ex${selectedExerciseIndex}`;
    const previousScore = activeProfile.stageScores[stageKey] || 0;
    const previousStars = activeProfile.stageStars[stageKey] || 0;

    const coinsEarned = correctCount * 8 + (earnedStars === 3 ? 30 : 10);
    const gemsEarned = earnedStars >= 2 ? 3 : 1;
    const pearlsEarned = earnedStars === 3 ? 1 : 0;
    const leavesEarned = earnedStars * 4;

    // Check for random bird unlock if performance is high (>= 70%)
    let newlyUnlockedBird: string | undefined;
    const lockedBirds = BIRD_CHARACTERS.map(b => b.id).filter(id => !activeProfile.unlockedBirds.includes(id));
    if (pct >= 0.7 && lockedBirds.length > 0 && Math.random() > 0.4) {
      newlyUnlockedBird = lockedBirds[Math.floor(Math.random() * lockedBirds.length)];
    }

    setSessionRewards({
      coins: coinsEarned,
      gems: gemsEarned,
      pearls: pearlsEarned,
      leaves: leavesEarned,
      unlockedBird: newlyUnlockedBird
    });

    const updatedUnlockedBirds = newlyUnlockedBird
      ? [...activeProfile.unlockedBirds, newlyUnlockedBird]
      : activeProfile.unlockedBirds;

    updateCurrentProfile({
      ...activeProfile,
      coins: activeProfile.coins + coinsEarned,
      gems: activeProfile.gems + gemsEarned,
      pearls: activeProfile.pearls + pearlsEarned,
      leaves: activeProfile.leaves + leavesEarned,
      unlockedBirds: updatedUnlockedBirds,
      stageScores: {
        ...activeProfile.stageScores,
        [stageKey]: Math.max(previousScore, score)
      },
      stageStars: {
        ...activeProfile.stageStars,
        [stageKey]: Math.max(previousStars, earnedStars)
      }
    });

    setCurrentScreen('result');
  };

  const currentStage = EXERCISE_SETS.find(s => s.id === selectedStageId) || EXERCISE_SETS[0];
  const activeBackgroundConfig = GAME_BACKGROUNDS.find(b => b.id === activeProfile.activeBackground) || GAME_BACKGROUNDS[0];
  const leaderboardEntries = calculateLeaderboard(profiles, activeId);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 bg-gradient-to-b ${activeBackgroundConfig.skyGradient}`}>
      {/* SVG Asset Definitions */}
      <BirdSvgDefs />

      {/* Top Header HUD */}
      <HeaderHUD
        profile={activeProfile}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenProfiles={() => setShowProfilesModal(true)}
        onOpenLeaderboard={() => setShowLeaderboardModal(true)}
        onOpenIdiomBook={() => setShowIdiomBookModal(true)}
        onOpenShop={() => setShowShopModal(true)}
        onOpenPowerUps={() => setShowShopModal(true)}
        onOpenAdmin={() => setShowAdminModal(true)}
        onOpenSecretRecharge={() => setShowSecretRechargeModal(true)}
        onHomeClick={() => setCurrentScreen('home')}
        showBackToHome={currentScreen !== 'home'}
      />

      {/* Main Content Areas */}
      <main className="flex-grow flex flex-col items-center justify-center p-3 sm:p-6 max-w-6xl w-full mx-auto">
        {/* ================= 1. HOME SCREEN ================= */}
        {currentScreen === 'home' && (
          <div className="w-full flex flex-col items-center justify-center py-4 sm:py-8 animate-in fade-in duration-300">
            {/* Title Section with floating birds */}
            <div className="relative w-full max-w-2xl flex flex-col items-center justify-center mb-8 text-center">
              {/* Floating Bird 1 (Red) */}
              <div className="absolute -left-2 sm:left-4 -top-6 w-16 h-16 sm:w-24 sm:h-24 floating drop-shadow-2xl">
                <BirdAvatar birdId="bird-red" hatId={activeProfile.equippedHat} className="w-full h-full" />
              </div>
              {/* Floating Bird 2 (Chuck) */}
              <div className="absolute -right-2 sm:right-4 -top-8 w-14 h-14 sm:w-20 sm:h-20 floating drop-shadow-2xl" style={{ animationDelay: '1s' }}>
                <BirdAvatar birdId="bird-yellow" className="w-full h-full" />
              </div>
              {/* Floating Bird 3 (Bomb) */}
              <div className="hidden sm:block absolute left-1/4 -bottom-10 w-16 h-16 floating drop-shadow-2xl" style={{ animationDelay: '2s' }}>
                <BirdAvatar birdId="bird-black" className="w-full h-full" />
              </div>

              {/* Title Text */}
              <h1 className="angry-font text-4xl sm:text-6xl lg:text-7xl text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] leading-tight">
                成語保衛戰
              </h1>
              <div className="inline-block mt-2 px-6 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 border-2 border-amber-800 shadow-xl">
                <span className="angry-font text-xl sm:text-3xl text-stone-950 tracking-wider">
                  🎯 憤怒鳥大挑戰 🎯
                </span>
              </div>
              <p className="mt-3 text-xs sm:text-base font-bold text-amber-100 bg-stone-900/60 px-4 py-1 rounded-full border border-amber-600/60 backdrop-blur-sm">
                專為香港小學四年級（喇沙精選成語）設計 • iPad Pro 13 吋觸控大字優化
              </p>
            </div>

            {/* Stage Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl mb-8">
              {EXERCISE_SETS.map(stage => {
                // Calculate stars earned in this stage
                const stageStars = Object.entries(activeProfile.stageStars)
                  .filter(([k]) => k.startsWith(`stage${stage.id}_`))
                  .reduce((acc, [, val]) => acc + val, 0);

                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStartStage(stage.id)}
                    className="group relative wood-panel rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:scale-[1.02] active:scale-95 transition-all text-left shadow-2xl cursor-pointer border-4 border-amber-900"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="angry-font text-2xl sm:text-3xl text-yellow-300 drop-shadow">
                          {stage.title}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600 text-yellow-300 font-mono text-xs font-black">
                          {stage.range}
                        </span>
                      </div>

                      <p className="text-stone-800 font-black text-sm mb-3">
                        {stage.subtitle} (共 8 份密集練習)
                      </p>

                      {/* Sample idioms pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {stage.idioms.slice(0, 4).map(idm => (
                          <span
                            key={idm}
                            className="text-[11px] font-bold bg-white/80 text-stone-900 px-2 py-0.5 rounded shadow-sm"
                          >
                            {idm}
                          </span>
                        ))}
                        <span className="text-[11px] font-bold bg-amber-200/90 text-stone-900 px-2 py-0.5 rounded">
                          +{stage.idioms.length - 4} 成語
                        </span>
                      </div>
                    </div>

                    {/* Bottom Stars & Action */}
                    <div className="flex items-center justify-between pt-3 border-t-2 border-amber-800/40">
                      <div className="flex items-center gap-1 text-yellow-800 font-bold text-xs sm:text-sm">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-600" />
                        <span>已獲 {stageStars} / 24 星</span>
                      </div>

                      <div className="px-4 py-2 rounded-xl bg-gradient-to-b from-green-500 to-green-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-1 group-hover:from-green-400">
                        <span>選擇練習</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions Footer Buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-3xl">
              <button
                onClick={() => {
                  sound.playCoin();
                  setShowIdiomBookModal(true);
                }}
                className="btn-game px-5 sm:px-7 py-3 rounded-2xl text-white angry-font text-base sm:text-lg flex items-center gap-2 shadow-xl cursor-pointer"
                style={{ background: 'linear-gradient(to bottom, #0284c7, #0369a1)', borderColor: '#075985' }}
              >
                <BookOpen className="w-5 h-5 text-cyan-200" />
                成語溫習手冊
              </button>

              <button
                onClick={() => {
                  sound.playCoin();
                  setShowShopModal(true);
                }}
                className="btn-game px-5 sm:px-7 py-3 rounded-2xl text-white angry-font text-base sm:text-lg flex items-center gap-2 shadow-xl cursor-pointer"
                style={{ background: 'linear-gradient(to bottom, #9333ea, #7e22ce)', borderColor: '#581c87' }}
              >
                <ShoppingBag className="w-5 h-5 text-yellow-300" />
                夥伴與背景商店
              </button>

              <button
                onClick={() => {
                  sound.playCoin();
                  setShowLeaderboardModal(true);
                }}
                className="btn-game px-5 sm:px-7 py-3 rounded-2xl text-white angry-font text-base sm:text-lg flex items-center gap-2 shadow-xl cursor-pointer"
                style={{ background: 'linear-gradient(to bottom, #eab308, #ca8a04)', borderColor: '#854d0e', color: '#1c1917' }}
              >
                <Trophy className="w-5 h-5 text-stone-950" />
                全港風雲榜
              </button>
            </div>
          </div>
        )}

        {/* ================= 2. EXERCISE SELECT SCREEN ================= */}
        {currentScreen === 'exercise-select' && (
          <div className="w-full flex flex-col items-center max-w-4xl animate-in fade-in duration-300">
            {/* Top Stage Bar */}
            <div className="flex items-center justify-between w-full mb-4">
              <button
                onClick={() => setCurrentScreen('home')}
                className="px-3 sm:px-4 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 font-black text-sm flex items-center gap-1 border-2 border-stone-700 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" /> 返回關卡
              </button>

              <h2 className="angry-font text-2xl sm:text-4xl text-white drop-shadow text-center">
                {currentStage.title} - {currentStage.range}
              </h2>

              <button
                onClick={() => setShowIdiomBookModal(true)}
                className="px-3 py-2 rounded-xl bg-cyan-700/80 hover:bg-cyan-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1 border border-cyan-400 cursor-pointer active:scale-95"
              >
                <BookOpen className="w-4 h-4" /> 溫習字表
              </button>
            </div>

            {/* Idioms List Banner */}
            <div className="wood-panel bg-yellow-100/95 px-4 sm:px-6 py-3 rounded-2xl mb-6 text-stone-900 font-bold text-center w-full flex flex-wrap justify-center gap-2 shadow-lg border-4 border-amber-900">
              <span className="text-xs sm:text-sm font-black text-amber-950 mr-1 flex items-center">
                【本關考核成語】：
              </span>
              {currentStage.idioms.map(idm => (
                <span
                  key={idm}
                  onClick={() => setShowIdiomBookModal(true)}
                  className="bg-white/90 hover:bg-white px-2.5 py-1 rounded-lg border border-amber-800/40 text-xs sm:text-sm font-black text-stone-900 shadow-sm cursor-pointer hover:text-amber-800 transition-colors"
                  title="點擊查看解釋與例句"
                >
                  {idm}
                </span>
              ))}
            </div>

            {/* 8 Exercises Grid */}
            <div className="wood-panel w-full rounded-3xl p-5 sm:p-7 bg-opacity-95 shadow-2xl border-4 border-amber-900">
              <p className="text-center text-amber-950 font-black text-sm sm:text-base mb-5">
                請選擇你要進行的練習（每份 8-10 題，全真模擬喇沙小學小四評估題型）：
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => {
                  const stageKey = `stage${currentStage.id}_ex${num}`;
                  const stars = activeProfile.stageStars[stageKey] || 0;
                  const highScore = activeProfile.stageScores[stageKey] || 0;
                  const questionCount = currentStage.exercises[num]?.length || 10;

                  return (
                    <button
                      key={num}
                      onClick={() => handleStartExercise(num)}
                      className="btn-game wood-panel rounded-2xl p-4 flex flex-col items-center justify-between gap-2 h-28 sm:h-32 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer border-4 border-amber-900"
                    >
                      <div className="flex flex-col items-center">
                        <span className="angry-font text-white text-lg sm:text-xl">
                          練習 {['一', '二', '三', '四', '五', '六', '七', '八'][num - 1]}
                        </span>
                        <span className="text-amber-100 text-[11px] font-bold">
                          {questionCount} 道精選題
                        </span>
                      </div>

                      {/* Stars & High Score */}
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3].map(s => (
                            <Star
                              key={s}
                              className={`w-4 h-4 ${
                                s <= stars ? 'fill-yellow-400 text-yellow-500' : 'text-stone-400/60'
                              }`}
                            />
                          ))}
                        </div>
                        {highScore > 0 && (
                          <span className="text-[10px] text-yellow-200 font-mono font-bold mt-0.5">
                            最高 {highScore} 分
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. IN-GAME BATTLEFIELD & QUESTION SCREEN ================= */}
        {currentScreen === 'game' && (
          <div className="w-full flex flex-col items-center max-w-4xl animate-in fade-in duration-300">
            {/* Top Game Status Bar */}
            <div className="w-full flex items-center justify-between gap-3 mb-3">
              <button
                onClick={() => setCurrentScreen('exercise-select')}
                className="px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1 border border-stone-600 cursor-pointer active:scale-95"
              >
                ← 放棄離開
              </button>

              {/* Progress & Question Counter */}
              <div className="flex-1 max-w-md bg-stone-900/90 p-2 rounded-2xl border-2 border-stone-700 shadow-lg">
                <div className="flex items-center justify-between text-xs font-black text-amber-200 mb-1 px-1">
                  <span>關卡進度</span>
                  <span>
                    第 {currentQIndex + 1} / {questions.length} 題
                  </span>
                </div>
                <div className="w-full bg-stone-950 rounded-full h-3 border border-stone-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 transition-all duration-300"
                    style={{ width: `${((currentQIndex + (isAnswerChecked ? 1 : 0)) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Live Score Counter */}
              <div className="px-3 py-1.5 rounded-xl bg-amber-950/90 border-2 border-amber-600 text-yellow-300 font-black text-xs sm:text-sm font-mono shrink-0">
                得分: {score}
              </div>
            </div>

            {/* Battlefield Screen with interactive Slingshot & Pig */}
            <div className="w-full mb-4">
              <Battlefield
                birdId={activeProfile.equippedBird}
                hatId={activeProfile.equippedHat}
                backgroundId={activeProfile.activeBackground}
                isLaunching={isLaunching}
                isHit={isHit}
                isFail={isFail}
                isGoldenSlingActive={activeEffects.goldenSling}
                isSpeedActive={activeEffects.speedWing}
                comboStreak={streak}
              />
            </div>

            {/* Weapons / PowerUp Toolbar */}
            <div className="w-full mb-4">
              <WeaponsBar
                inventory={activeProfile.powerUps}
                onUsePowerUp={handleUsePowerUp}
                activeEffects={activeEffects}
                disabled={isAnswerChecked}
              />
            </div>

            {/* Question Text Box - LARGE FONTS FOR IPAD PRO 13" AND FAST READING */}
            {questions[currentQIndex] && (
              <div className="wood-panel w-full rounded-3xl p-5 sm:p-7 md:p-8 mb-5 bg-opacity-95 shadow-2xl border-4 border-amber-900">
                <div className="text-center font-bold text-xs uppercase tracking-widest text-amber-950/80 mb-2">
                  請選出最適當的成語填入句中：
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-center text-stone-900 leading-relaxed tracking-wide">
                  {questions[currentQIndex].q.split('__________')[0]}
                  <span className="inline-block mx-2 px-3 py-0.5 border-b-4 border-stone-900 text-amber-800 font-mono font-black min-w-[120px] sm:min-w-[160px] text-center">
                    {selectedOption || '＿＿＿＿'}
                  </span>
                  {questions[currentQIndex].q.split('__________')[1]}
                </h3>
              </div>
            )}

            {/* 4 Large Touch Option Buttons - OPTIMIZED FOR IPAD PRO 13" TOUCH COMFORT */}
            {questions[currentQIndex] && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                {questions[currentQIndex].options.map((opt, idx) => {
                  const isEliminated = eliminatedOptions.includes(opt);
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt === questions[currentQIndex].a;

                  let buttonClass = 'btn-option';
                  if (isAnswerChecked) {
                    if (isCorrect) buttonClass = 'btn-option correct';
                    else if (isSelected && !isCorrect) buttonClass = 'btn-option wrong';
                  }

                  return (
                    <button
                      key={opt + idx}
                      onClick={() => handleCheckAnswer(opt)}
                      disabled={isAnswerChecked || isEliminated}
                      className={`${buttonClass} rounded-2xl py-4 sm:py-5 px-4 angry-font text-xl sm:text-2xl md:text-3xl font-black w-full min-h-[64px] sm:min-h-[76px] flex items-center justify-center cursor-pointer transition-all active:scale-[0.98] ${
                        isEliminated ? 'opacity-20 line-through cursor-not-allowed grayscale' : ''
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Bottom Next Question Bar (Shows when answered) */}
            {isAnswerChecked && (
              <div className="w-full mt-5 flex items-center justify-between p-4 rounded-2xl bg-stone-900/90 border-2 border-amber-600 shadow-2xl animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  {selectedOption === questions[currentQIndex].a ? (
                    <div className="flex items-center gap-2 text-green-400 font-black text-lg sm:text-xl">
                      <CheckCircle2 className="w-7 h-7 text-green-400" />
                      <span>太棒了！答對了！</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-400 font-black text-base sm:text-xl">
                      <XCircle className="w-7 h-7 text-red-400" />
                      <span>正確答案是：【{questions[currentQIndex].a}】</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="btn-game px-6 sm:px-8 py-3 rounded-full text-white angry-font text-lg sm:text-xl flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <span>{currentQIndex + 1 < questions.length ? '下一題' : '查看成績'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= 4. RESULT & REVIEW SCREEN ================= */}
        {currentScreen === 'result' && (
          <div className="w-full flex flex-col items-center max-w-3xl py-4 animate-in fade-in duration-300">
            {/* Top Stars & Score Card */}
            <div className="wood-panel w-full rounded-3xl p-6 sm:p-8 bg-opacity-95 mb-6 flex flex-col items-center text-center border-4 border-amber-900 shadow-2xl">
              <h2 className="angry-font text-3xl sm:text-5xl text-white drop-shadow mb-3">
                關卡挑戰完成！
              </h2>

              {/* Stars Earned */}
              <div className="flex justify-center gap-3 my-3">
                {[1, 2, 3].map(s => {
                  const correctCount = userAnswers.filter(a => a.isCorrect).length;
                  const pct = correctCount / questions.length;
                  let stars = 1;
                  if (pct === 1) stars = 3;
                  else if (pct >= 0.7) stars = 2;

                  return (
                    <div
                      key={s}
                      className={`pop-in transform ${s <= stars ? '' : 'opacity-30 grayscale'}`}
                      style={{ animationDelay: `${s * 0.15}s` }}
                    >
                      <Star className="w-14 h-14 sm:w-16 sm:h-16 fill-yellow-400 text-yellow-600 drop-shadow-lg" />
                    </div>
                  );
                })}
              </div>

              {/* Score and Accuracy */}
              <p className="text-2xl sm:text-3xl font-black text-amber-950 mt-2">
                答對題數：{userAnswers.filter(a => a.isCorrect).length} / {questions.length} 題
              </p>
              <p className="text-base font-bold text-stone-700 mt-1 font-mono">
                總獲得積分: {score} 分 • 正確率:{' '}
                {Math.round((userAnswers.filter(a => a.isCorrect).length / questions.length) * 100)}%
              </p>

              {/* Currencies Earned Banner */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 p-3 bg-amber-950/60 rounded-2xl border border-amber-800 text-white">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 100 100" className="w-7 h-7">
                    <use href="#icon-coin" />
                  </svg>
                  <span className="font-black text-yellow-300 font-mono text-lg">
                    +{sessionRewards.coins}
                  </span>
                </div>

                {sessionRewards.gems > 0 && (
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 100 100" className="w-7 h-7">
                      <use href="#icon-gem" />
                    </svg>
                    <span className="font-black text-cyan-300 font-mono text-lg">
                      +{sessionRewards.gems}
                    </span>
                  </div>
                )}

                {sessionRewards.pearls > 0 && (
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 100 100" className="w-7 h-7">
                      <use href="#icon-pearl" />
                    </svg>
                    <span className="font-black text-pink-300 font-mono text-lg">
                      +{sessionRewards.pearls}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 100 100" className="w-7 h-7">
                    <use href="#icon-leaf" />
                  </svg>
                  <span className="font-black text-emerald-300 font-mono text-lg">
                    +{sessionRewards.leaves}
                  </span>
                </div>
              </div>

              {/* New Bird Unlock Alert */}
              {sessionRewards.unlockedBird && (
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 border-2 border-yellow-300 text-white flex flex-col items-center animate-bounce">
                  <div className="flex items-center gap-2 text-yellow-300 font-black text-lg">
                    <Sparkles className="w-5 h-5" /> 恭喜解鎖全新怒鳥夥伴！
                  </div>
                  <div className="w-16 h-16 mt-2">
                    <BirdAvatar birdId={sessionRewards.unlockedBird} className="w-full h-full" />
                  </div>
                  <span className="text-xs font-bold text-stone-200 mt-1">
                    已自動加入你的夥伴陣容與圖鑑！
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button
                  onClick={() => handleStartExercise(selectedExerciseIndex)}
                  className="btn-game px-6 py-2.5 rounded-full text-white font-black text-sm flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-4 h-4" /> 再次挑戰
                </button>

                {selectedExerciseIndex < 8 && (
                  <button
                    onClick={() => handleStartExercise(selectedExerciseIndex + 1)}
                    className="btn-game px-6 py-2.5 rounded-full text-white font-black text-sm flex items-center gap-1.5 cursor-pointer shadow-md"
                    style={{ background: 'linear-gradient(to bottom, #10b981, #059669)', borderColor: '#065f46' }}
                  >
                    <span>下一份練習</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setCurrentScreen('exercise-select')}
                  className="px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 font-black text-sm cursor-pointer border border-stone-600 shadow-md"
                >
                  返回練習選單
                </button>
              </div>
            </div>

            {/* Detailed Question Review List */}
            <div className="wood-panel w-full rounded-3xl p-5 sm:p-7 bg-opacity-95 shadow-xl border-4 border-amber-900 mb-8">
              <h3 className="angry-font text-2xl sm:text-3xl text-center text-amber-950 mb-4 border-b-2 border-amber-800/40 pb-2">
                📝 題目回顧與解析
              </h3>

              <div className="space-y-3">
                {userAnswers.map((ans, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border-2 ${
                      ans.isCorrect
                        ? 'bg-green-50/90 border-green-500/80 text-green-950'
                        : 'bg-red-50/90 border-red-400 text-red-950'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="font-black text-base sm:text-lg w-6 shrink-0 text-stone-500">
                        {idx + 1}.
                      </div>
                      <div className="flex-grow">
                        <p className="text-base sm:text-lg font-bold leading-relaxed">
                          {ans.question.replace('__________', ' [ ' + ans.selected + ' ] ')}
                        </p>
                        {!ans.isCorrect && (
                          <div className="mt-2 text-sm font-black text-stone-800 bg-white/80 p-2 rounded-xl border border-red-200">
                            正確成語應為：<span className="text-green-700 underline">{ans.correct}</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-auto text-2xl font-black shrink-0">
                        {ans.isCorrect ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-red-500">✗</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Account Profiles Modal */}
      <ProfileModal
        isOpen={showProfilesModal}
        onClose={() => setShowProfilesModal(false)}
        profiles={profiles}
        activeId={activeId}
        onSelectProfile={handleSelectProfile}
        onUpdateProfileName={handleUpdateProfileName}
      />

      {/* Real-time Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        entries={leaderboardEntries}
        currentProfileName={activeProfile.name}
      />

      {/* Idiom Study Book Modal */}
      <IdiomBookModal
        isOpen={showIdiomBookModal}
        onClose={() => setShowIdiomBookModal(false)}
      />

      {/* Shop & Collection Modal */}
      <ShopModal
        isOpen={showShopModal}
        onClose={() => setShowShopModal(false)}
        profile={activeProfile}
        onUpdateProfile={updateCurrentProfile}
      />

      {/* Parent / Teacher Admin Modal */}
      <AdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        profile={activeProfile}
        onUpdateProfile={updateCurrentProfile}
        onOpenSecretRecharge={() => setShowSecretRechargeModal(true)}
      />

      {/* Secret Recharge & Resource Charger Modal */}
      <SecretRechargeModal
        isOpen={showSecretRechargeModal}
        onClose={() => setShowSecretRechargeModal(false)}
        profiles={profiles}
        activeId={activeId}
        onUpdateProfiles={setProfiles}
      />

      {/* Secret Trigger for Parents (Tap Bottom Right Corner 5 times) */}
      <div
        id="secret-trigger"
        onClick={handleSecretCornerClick}
        className="fixed bottom-0 right-0 w-24 h-24 z-[9999] opacity-0 cursor-default pointer-events-auto select-none"
        title="祕密充值觸發區域 (連點 5 次)"
      />
    </div>
  );
}
