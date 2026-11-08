import { UserProfile, LeaderboardEntry, AccountId } from '../types';

const STORAGE_PROFILES_KEY = 'angry_idioms_profiles_v2';
const STORAGE_ACTIVE_ID_KEY = 'angry_idioms_active_account_id_v2';

const createDefaultProfile = (
  id: AccountId | string,
  name: string,
  bird: string,
  color: string,
  hat: string = 'none'
): UserProfile => ({
  id,
  name,
  avatarBird: bird,
  avatarHat: hat,
  color,
  coins: 100,
  gems: 5,
  pearls: 1,
  leaves: 15,
  unlockedBirds: ['bird-red', bird],
  unlockedHats: ['cat'],
  unlockedBackgrounds: ['classic-sky'],
  activeBackground: 'classic-sky',
  equippedHat: hat,
  equippedBird: bird,
  powerUps: {
    goldenSling: 1,
    speedWing: 2,
    laserAim: 2,
    tntBomb: 1,
    streakShield: 1,
    magnet: 1
  },
  stageScores: {},
  stageStars: {},
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  highestStreak: 0,
  lastPlayedAt: Date.now()
});

export const INITIAL_PROFILES: Record<string, UserProfile> = {
  melaine: createDefaultProfile('melaine', 'Melaine (妹妹)', 'bird-pink', '#ec4899', 'cat'),
  jayden: createDefaultProfile('jayden', 'Jayden (哥哥)', 'bird-yellow', '#eab308', 'none'),
  others: createDefaultProfile('others', '訪客玩家 (Others)', 'bird-red', '#ef4444', 'none')
};

export const getStoredProfiles = (): Record<string, UserProfile> => {
  try {
    const raw = localStorage.getItem(STORAGE_PROFILES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure all 3 default keys exist
      return {
        ...INITIAL_PROFILES,
        ...parsed
      };
    }
  } catch (err) {
    console.warn('Failed to load profiles from localStorage', err);
  }
  return { ...INITIAL_PROFILES };
};

export const saveProfiles = (profiles: Record<string, UserProfile>) => {
  try {
    localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
  } catch (err) {
    console.error('Failed to save profiles to localStorage', err);
  }
};

export const getActiveAccountId = (): string => {
  try {
    const id = localStorage.getItem(STORAGE_ACTIVE_ID_KEY);
    if (id) return id;
  } catch {
    // ignore
  }
  return 'melaine';
};

export const setActiveAccountId = (id: string) => {
  try {
    localStorage.setItem(STORAGE_ACTIVE_ID_KEY, id);
  } catch {
    // ignore
  }
};

// Calculate real-time leaderboard across Melaine, Jayden, Others, and P4 classmates
export const calculateLeaderboard = (
  profiles: Record<string, UserProfile>,
  currentId: string
): LeaderboardEntry[] => {
  const p4MockClassmates: Array<{ name: string; stars: number; score: number; accuracy: number; level: number; bird: string }> = [
    { name: '陳志明 (喇沙四年級)', stars: 42, score: 380, accuracy: 92, level: 7, bird: 'bird-blue' },
    { name: '梁詠詩 (四年級精英)', stars: 36, score: 340, accuracy: 89, level: 6, bird: 'bird-melody' },
    { name: '黃俊傑 (成語小狀元)', stars: 28, score: 260, accuracy: 85, level: 5, bird: 'bird-black' },
    { name: '李穎欣 (四年級學長)', stars: 22, score: 210, accuracy: 82, level: 4, bird: 'bird-white' }
  ];

  const userEntries: LeaderboardEntry[] = Object.values(profiles).map(profile => {
    const stars = Object.values(profile.stageStars).reduce((a, b) => a + b, 0);
    const score = Object.values(profile.stageScores).reduce((a, b) => a + b, 0);
    const acc = profile.totalQuestionsAnswered > 0
      ? Math.round((profile.totalCorrect / profile.totalQuestionsAnswered) * 100)
      : 0;
    const level = Math.max(1, Math.floor(stars / 4) + 1);

    return {
      rank: 0,
      name: profile.name,
      isCurrentProfile: profile.id === currentId,
      score: score + stars * 15,
      stars,
      accuracy: acc,
      level,
      equippedBird: profile.equippedBird || 'bird-red'
    };
  });

  const mockEntries: LeaderboardEntry[] = p4MockClassmates.map(c => ({
    rank: 0,
    name: c.name,
    isCurrentProfile: false,
    score: c.score + c.stars * 15,
    stars: c.stars,
    accuracy: c.accuracy,
    level: c.level,
    equippedBird: c.bird
  }));

  const combined = [...userEntries, ...mockEntries];
  // Sort descending by score, then stars
  combined.sort((a, b) => (b.score !== a.score ? b.score - a.score : b.stars - a.stars));

  return combined.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
};
