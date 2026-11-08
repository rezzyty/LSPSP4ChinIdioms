import { GameBackground } from '../types';

export const GAME_BACKGROUNDS: GameBackground[] = [
  {
    id: 'classic-sky',
    name: '蔚藍草甸 (經典)',
    theme: 'meadow',
    description: '經典憤怒鳥島嶼，青青草地與明朗晴空。',
    price: { coins: 0, gems: 0, pearls: 0, leaves: 0 },
    skyGradient: 'from-sky-300 via-sky-400 to-blue-500',
    groundClass: 'from-emerald-600 via-green-600 to-green-800 border-green-500',
    accentColor: '#10b981'
  },
  {
    id: 'bamboo-forest',
    name: '翠竹青林 (竹林)',
    theme: 'forest',
    description: '幽靜青翠的竹林秘境，微風徐徐，讓人思緒澄明。',
    price: { coins: 200, gems: 8, pearls: 1, leaves: 20 },
    skyGradient: 'from-emerald-300 via-teal-400 to-emerald-600',
    groundClass: 'from-green-700 via-emerald-800 to-green-950 border-emerald-400',
    accentColor: '#059669'
  },
  {
    id: 'ice-peaks',
    name: '極地冰川 (雪峰)',
    theme: 'snow',
    description: '漫天飄雪的冰晶城堡，極光耀眼，冷靜專注的作答勝地！',
    price: { coins: 400, gems: 15, pearls: 2, leaves: 35 },
    skyGradient: 'from-cyan-200 via-sky-400 to-indigo-700',
    groundClass: 'from-slate-200 via-cyan-300 to-blue-700 border-cyan-200',
    accentColor: '#06b6d4'
  },
  {
    id: 'volcano-crag',
    name: '烈焰熔岩 (火山)',
    theme: 'volcano',
    description: '火山熾熱的要塞，火星四射，燃燒你的成語熱血！',
    price: { coins: 600, gems: 25, pearls: 4, leaves: 50 },
    skyGradient: 'from-amber-500 via-red-600 to-stone-900',
    groundClass: 'from-stone-800 via-red-950 to-neutral-900 border-red-500',
    accentColor: '#ef4444'
  },
  {
    id: 'space-galaxy',
    name: '星際太空 (宇宙)',
    theme: 'space',
    description: 'Angry Birds Space 星際無重力太空，璀璨星雲與行星環繞！',
    price: { coins: 800, gems: 35, pearls: 6, leaves: 70 },
    skyGradient: 'from-indigo-950 via-purple-900 to-black',
    groundClass: 'from-slate-800 via-purple-950 to-slate-900 border-purple-400',
    accentColor: '#8b5cf6'
  },
  {
    id: 'sunset-beach',
    name: '落日金灘 (海島)',
    theme: 'beach',
    description: '熱帶海灘金黃日落，椰林微風，愜意滿分的答題島嶼。',
    price: { coins: 500, gems: 20, pearls: 3, leaves: 40 },
    skyGradient: 'from-amber-300 via-rose-400 to-purple-600',
    groundClass: 'from-amber-200 via-yellow-400 to-amber-600 border-amber-300',
    accentColor: '#f59e0b'
  }
];
