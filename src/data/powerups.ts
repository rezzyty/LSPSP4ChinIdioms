export interface PowerUpItem {
  key: 'goldenSling' | 'speedWing' | 'laserAim' | 'tntBomb' | 'streakShield' | 'magnet';
  name: string;
  icon: string;
  badge: string;
  desc: string;
  speedEffect: string;
  cost: {
    coins: number;
    gems: number;
  };
}

export const POWER_UPS: PowerUpItem[] = [
  {
    key: 'speedWing',
    name: '疾風神羽',
    icon: '⚡',
    badge: '速度狂飆',
    desc: '瞬間提高飛行衝刺速度！連答時間充裕，並獲得 2 倍速答獎勵！',
    speedEffect: '+100% 答題加速與飛行速度',
    cost: { coins: 60, gems: 0 }
  },
  {
    key: 'laserAim',
    name: '鷹眼瞄準',
    icon: '🎯',
    badge: '精準掃除',
    desc: '啟動雷射瞄準鏡，瞬間排除 2 個錯誤干擾選項！',
    speedEffect: '秒除干擾，大幅縮短尋答時間',
    cost: { coins: 80, gems: 1 }
  },
  {
    key: 'goldenSling',
    name: '黃金彈弓',
    icon: '🏹',
    badge: '威力倍增',
    desc: '黃金重裝彈弓，怒鳥發射速度飆升，得分與金幣收益翻倍！',
    speedEffect: '彈射速度 +80%，得分 200%',
    cost: { coins: 120, gems: 2 }
  },
  {
    key: 'streakShield',
    name: '防禦護盾',
    icon: '🛡️',
    badge: '連擊保護',
    desc: '若不小心答錯，護盾自動抵消一次失誤，完整保護連勝紀錄！',
    speedEffect: '穩固連勝狂暴狀態',
    cost: { coins: 70, gems: 1 }
  },
  {
    key: 'tntBomb',
    name: 'TNT 炸藥',
    icon: '💣',
    badge: '震撼全場',
    desc: '將 TNT 炸藥桶投入敵方豬陣，巨大爆破帶來滿屏金幣！',
    speedEffect: '炸飛障礙，瞬發連鎖',
    cost: { coins: 90, gems: 2 }
  },
  {
    key: 'magnet',
    name: '寶石磁石',
    icon: '🧲',
    badge: '全場吸金',
    desc: '通關時自動吸取散落的隱藏寶石與珍珠！',
    speedEffect: '資源收集效率翻倍',
    cost: { coins: 100, gems: 1 }
  }
];
