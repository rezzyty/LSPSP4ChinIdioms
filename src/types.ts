export type AccountId = 'melaine' | 'jayden' | 'others';

export interface PowerUpInventory {
  goldenSling: number; // 2x score & speed
  speedWing: number;   // Speed boost timer & fast animation
  laserAim: number;    // Eliminates 2 wrong choices
  tntBomb: number;     // Blasts away pig for instant score
  streakShield: number;// Prevents streak loss once
  magnet: number;      // Extra coins and gems
}

export interface UserProfile {
  id: AccountId | string;
  name: string;
  avatarBird: string;
  avatarHat: string;
  color: string;
  coins: number;
  gems: number;
  pearls: number;
  leaves: number;
  unlockedBirds: string[];
  unlockedHats: string[];
  unlockedBackgrounds: string[];
  activeBackground: string;
  equippedHat: string;
  equippedBird: string;
  powerUps: PowerUpInventory;
  stageScores: Record<string, number>; // key: "set1-ex1", value: score
  stageStars: Record<string, number>;  // key: "set1-ex1", value: 1..3
  totalQuestionsAnswered: number;
  totalCorrect: number;
  highestStreak: number;
  lastPlayedAt: number;
}

export interface IdiomDefinition {
  idiom: string;
  pinyin: string;
  meaning: string;
  example: string;
  page?: string;
}

export interface Question {
  id?: string;
  q: string;
  a: string;
  options: string[];
  explanation?: string;
}

export interface ExerciseSet {
  id: number;
  title: string;
  subtitle: string;
  range: string;
  idioms: string[];
  exercises: Record<number, Question[]>;
}

export interface BirdCharacter {
  id: string;
  name: string;
  englishName: string;
  ability: string;
  category: 'classic' | 'special' | 'chick';
  price: {
    coins: number;
    gems: number;
    pearls: number;
    leaves: number;
  };
  unlockCondition?: string;
}

export interface HatAccessory {
  id: string;
  name: string;
  price: {
    coins: number;
    gems: number;
    pearls: number;
    leaves: number;
  };
  description: string;
}

export interface GameBackground {
  id: string;
  name: string;
  theme: string;
  description: string;
  price: {
    coins: number;
    gems: number;
    pearls: number;
    leaves: number;
  };
  skyGradient: string;
  groundClass: string;
  accentColor: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  isCurrentProfile?: boolean;
  score: number;
  stars: number;
  accuracy: number;
  level: number;
  equippedBird: string;
}
