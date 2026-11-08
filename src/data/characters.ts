import { BirdCharacter, HatAccessory } from '../types';

export const BIRD_CHARACTERS: BirdCharacter[] = [
  {
    id: 'bird-red',
    name: '怒鳥阿紅 (Red)',
    englishName: 'Red Bird',
    ability: '首領威嚴，各項能力均衡，初始主力戰將！',
    category: 'classic',
    price: { coins: 0, gems: 0, pearls: 0, leaves: 0 },
    unlockCondition: '預設擁有'
  },
  {
    id: 'bird-yellow',
    name: '疾風恰克 (Chuck)',
    englishName: 'Yellow Bird',
    ability: '音速衝刺！作答時倒數計時減慢 20%，反應更快！',
    category: 'classic',
    price: { coins: 150, gems: 5, pearls: 0, leaves: 10 },
    unlockCondition: '達到 10 顆星星或於商店解鎖'
  },
  {
    id: 'bird-black',
    name: '爆炸炸彈鳥 (Bomb)',
    englishName: 'Black Bomb Bird',
    ability: '全場震波！連續答對觸發巨大爆炸，金幣收益 +50%！',
    category: 'classic',
    price: { coins: 300, gems: 15, pearls: 1, leaves: 25 },
    unlockCondition: '完成關卡一全部練習或商店解鎖'
  },
  {
    id: 'bird-blue',
    name: '藍弟弟 (The Blues)',
    englishName: 'Blue Bird',
    ability: '三分身術！命中時獲得額外連擊加成！',
    category: 'classic',
    price: { coins: 150, gems: 5, pearls: 0, leaves: 10 },
    unlockCondition: '答對 20 題或商店解鎖'
  },
  {
    id: 'bird-white',
    name: '瑪蒂達 (Matilda)',
    englishName: 'White Bird',
    ability: '鳥蛋炸彈！答題時有機會自動修復 1 次錯誤！',
    category: 'classic',
    price: { coins: 300, gems: 15, pearls: 1, leaves: 25 },
    unlockCondition: '達到 20 顆星星或商店解鎖'
  },
  {
    id: 'bird-green',
    name: '迴旋哈爾 (Hal)',
    englishName: 'Green Bird',
    ability: '迴旋飛鏢！答對後自動回收額外金幣與樹葉！',
    category: 'classic',
    price: { coins: 350, gems: 20, pearls: 2, leaves: 30 },
    unlockCondition: '連勝 5 題或商店解鎖'
  },
  {
    id: 'bird-bigred',
    name: '巨無霸泰倫斯 (Terence)',
    englishName: 'Big Red Bird',
    ability: '重力泰山壓頂！直接擊碎豬豬城堡，得星率大幅提升！',
    category: 'classic',
    price: { coins: 800, gems: 50, pearls: 8, leaves: 80 },
    unlockCondition: '累計獲得 40 顆星星或商店解鎖'
  },
  {
    id: 'bird-pink',
    name: '粉紅史黛拉 (Stella)',
    englishName: 'Pink Bird',
    ability: '泡泡護罩！保護連勝不中斷！',
    category: 'classic',
    price: { coins: 400, gems: 25, pearls: 3, leaves: 40 },
    unlockCondition: '完成關卡二或商店解鎖'
  },
  {
    id: 'bird-orange',
    name: '泡泡鳥 (Bubbles)',
    englishName: 'Orange Bird',
    ability: '瞬間膨脹！彈開豬豬護甲，更容易爆發珍珠獎勵！',
    category: 'classic',
    price: { coins: 300, gems: 15, pearls: 1, leaves: 25 },
    unlockCondition: '答對 50 題或商店解鎖'
  },
  {
    id: 'bird-silver',
    name: '炫銀 (Silver)',
    englishName: 'Silver Bird',
    ability: '垂直俯衝！摧毀石頭障礙，全對額外贈送寶石！',
    category: 'classic',
    price: { coins: 600, gems: 40, pearls: 5, leaves: 60 },
    unlockCondition: '通關 10 份練習滿分或商店解鎖'
  },
  {
    id: 'bird-eagle',
    name: '無敵神鷹 (Mighty Eagle)',
    englishName: 'Mighty Eagle',
    ability: '王者霸氣！震撼天地，過關時全場貨幣獎勵翻倍！',
    category: 'special',
    price: { coins: 1000, gems: 100, pearls: 20, leaves: 100 },
    unlockCondition: '在排行榜晉升前 3 名或大師商店解鎖'
  },
  {
    id: 'bird-ice',
    name: '急凍冰鳥 (Ice Bird)',
    englishName: 'Ice Bird',
    ability: '極寒冰霜！將答題時間凍結，從容思索！',
    category: 'special',
    price: { coins: 450, gems: 30, pearls: 4, leaves: 45 },
    unlockCondition: '完成關卡三或商店解鎖'
  },
  {
    id: 'bird-melody',
    name: '音符美樂蒂 (Melody)',
    englishName: 'Melody Bird',
    ability: '天籟之音！吸收音符轉化為隨機寶物！',
    category: 'special',
    price: { coins: 500, gems: 35, pearls: 5, leaves: 50 },
    unlockCondition: '獲得 30 顆星或商店解鎖'
  },
  {
    id: 'bird-tony',
    name: '極地托尼 (Tony)',
    englishName: 'Tony',
    ability: '極地寒風！大幅提升通關金幣加成！',
    category: 'special',
    price: { coins: 850, gems: 60, pearls: 10, leaves: 85 },
    unlockCondition: '完成關卡四或商店解鎖'
  },
  {
    id: 'bird-ruby',
    name: '優雅露比 (Ruby)',
    englishName: 'Ruby',
    ability: '幸運祝福！大幅提高神秘寶箱出現率！',
    category: 'special',
    price: { coins: 350, gems: 20, pearls: 2, leaves: 30 },
    unlockCondition: '商店解鎖'
  },
  {
    id: 'bird-leonard',
    name: '國王豬雷納德 (Leonard)',
    englishName: 'King Pig Leonard',
    ability: '豬王反戈！以暴制暴，額外噴吐黏液黏住錯誤選項！',
    category: 'special',
    price: { coins: 900, gems: 75, pearls: 15, leaves: 90 },
    unlockCondition: '擊敗 50 隻豬豬或商店解鎖'
  },
  {
    id: 'bird-shade',
    name: '幽靈暗影鳥 (Shade)',
    englishName: 'Ghost Bird',
    ability: '穿透虛空！無視干擾，鎖定核心成語詞義！',
    category: 'special',
    price: { coins: 750, gems: 45, pearls: 8, leaves: 75 },
    unlockCondition: '夜間挑戰或商店解鎖'
  },
  {
    id: 'bird-bounci',
    name: '紫色彈彈鳥 (Bounci)',
    englishName: 'Bounci',
    ability: '無限彈跳！增加連續得分連擊倍率！',
    category: 'special',
    price: { coins: 500, gems: 35, pearls: 5, leaves: 50 },
    unlockCondition: '商店解鎖'
  },
  {
    id: 'bird-gale',
    name: '蓋爾女王 (Gale)',
    englishName: 'Gale Queen',
    ability: '黃金魔風！點石成金，答對時噴發大量金幣！',
    category: 'special',
    price: { coins: 700, gems: 40, pearls: 6, leaves: 65 },
    unlockCondition: '獲得 50 顆星或商店解鎖'
  },
  {
    id: 'bird-shakira',
    name: '搖滾巨星夏奇拉 (Shakira)',
    englishName: 'Shakira Bird',
    ability: '巨星光芒！全場夥伴士氣高昂，答題速度翻倍！',
    category: 'special',
    price: { coins: 650, gems: 35, pearls: 5, leaves: 60 },
    unlockCondition: '商店解鎖'
  },
  {
    id: 'bird-jo',
    name: '樂天阿喬 (Jo)',
    englishName: 'Jo',
    ability: '極樂鳥舞！每一次連擊額外贈送經驗點數！',
    category: 'special',
    price: { coins: 550, gems: 30, pearls: 4, leaves: 50 },
    unlockCondition: '商店解鎖'
  },
  {
    id: 'bird-gordon',
    name: '狂怒戈登 (Gordon)',
    englishName: 'Gordon',
    ability: '狂怒爆發！連擊時發出重拳，衝擊力十足！',
    category: 'special',
    price: { coins: 400, gems: 20, pearls: 2, leaves: 35 },
    unlockCondition: '商店解鎖'
  },
  {
    id: 'bird-ollie',
    name: '冰球奧利 (Ollie)',
    englishName: 'Ollie',
    ability: '冰球桿重擊！精準射擊豬豬要害！',
    category: 'special',
    price: { coins: 450, gems: 25, pearls: 3, leaves: 40 },
    unlockCondition: '商店解鎖'
  },
  {
    id: 'bird-bombom',
    name: '迷你蹦蹦 (Bombom)',
    englishName: 'Bombom',
    ability: '萌力炸彈！小巧可愛，卻蘊藏驚人破壞力！',
    category: 'special',
    price: { coins: 500, gems: 30, pearls: 4, leaves: 45 },
    unlockCondition: '商店解鎖'
  },
  {
    id: 'bird-rusty',
    name: '騎士羅斯蒂 (Rusty)',
    englishName: 'Rusty Knight',
    ability: '榮耀聖劍！揮動大劍，答錯不扣星！',
    category: 'special',
    price: { coins: 550, gems: 35, pearls: 5, leaves: 50 },
    unlockCondition: '商店解鎖'
  },
  // Chicks Collection
  {
    id: 'chick-red',
    name: '可愛小紅雞',
    englishName: 'Red Chick',
    ability: '萌萌助威！每次通關額外獎勵 5 金幣！',
    category: 'chick',
    price: { coins: 50, gems: 0, pearls: 0, leaves: 5 }
  },
  {
    id: 'chick-orange',
    name: '活潑小橘雞',
    englishName: 'Orange Chick',
    ability: '萌萌助威！增加隨機金幣！',
    category: 'chick',
    price: { coins: 50, gems: 0, pearls: 0, leaves: 5 }
  },
  {
    id: 'chick-yellow',
    name: '陽光小黃雞',
    englishName: 'Yellow Chick',
    ability: '萌萌助威！心情愉悅，答題更專注！',
    category: 'chick',
    price: { coins: 50, gems: 0, pearls: 0, leaves: 5 }
  },
  {
    id: 'chick-lightgreen',
    name: '嫩芽綠小雞',
    englishName: 'Light Green Chick',
    ability: '萌萌助威！微風吹拂，增加樹葉收穫！',
    category: 'chick',
    price: { coins: 50, gems: 0, pearls: 0, leaves: 5 }
  },
  {
    id: 'chick-green',
    name: '森林小綠雞',
    englishName: 'Green Chick',
    ability: '萌萌助威！常保好運氣！',
    category: 'chick',
    price: { coins: 50, gems: 0, pearls: 0, leaves: 5 }
  },
  {
    id: 'chick-lightblue',
    name: '水滴小藍雞',
    englishName: 'Light Blue Chick',
    ability: '萌萌助威！清新純真！',
    category: 'chick',
    price: { coins: 50, gems: 0, pearls: 0, leaves: 5 }
  },
  {
    id: 'chick-blue',
    name: '深海小藍雞',
    englishName: 'Blue Chick',
    ability: '萌萌助威！智慧靈光！',
    category: 'chick',
    price: { coins: 50, gems: 0, pearls: 0, leaves: 5 }
  },
  {
    id: 'chick-purple',
    name: '夢幻小紫雞',
    englishName: 'Purple Chick',
    ability: '萌萌助威！高貴典雅！',
    category: 'chick',
    price: { coins: 50, gems: 0, pearls: 0, leaves: 5 }
  },
  {
    id: 'chick-pink',
    name: '甜心小粉雞',
    englishName: 'Pink Chick',
    ability: '萌萌助威！甜美笑容療癒身心！',
    category: 'chick',
    price: { coins: 50, gems: 0, pearls: 0, leaves: 5 }
  },
  {
    id: 'chick-darkpink',
    name: '玫瑰深粉雞',
    englishName: 'Dark Pink Chick',
    ability: '萌萌助威！自信滿分！',
    category: 'chick',
    price: { coins: 50, gems: 0, pearls: 0, leaves: 5 }
  },
  {
    id: 'chick-black',
    name: '酷酷小黑雞',
    englishName: 'Black Chick',
    ability: '萌萌助威！酷帥登場！',
    category: 'chick',
    price: { coins: 150, gems: 5, pearls: 0, leaves: 15 }
  },
  {
    id: 'chick-white',
    name: '雪白小白雞',
    englishName: 'White Chick',
    ability: '萌萌助威！純潔無瑕！',
    category: 'chick',
    price: { coins: 150, gems: 5, pearls: 0, leaves: 15 }
  },
  {
    id: 'chick-grey',
    name: '沉著小灰雞',
    englishName: 'Grey Chick',
    ability: '萌萌助威！冷靜應試！',
    category: 'chick',
    price: { coins: 150, gems: 5, pearls: 0, leaves: 15 }
  },
  {
    id: 'chick-brown',
    name: '栗子小棕雞',
    englishName: 'Brown Chick',
    ability: '萌萌助威！踏實努力！',
    category: 'chick',
    price: { coins: 150, gems: 5, pearls: 0, leaves: 15 }
  },
  {
    id: 'chick-ochre',
    name: '琥珀小赭雞',
    englishName: 'Ochre Chick',
    ability: '萌萌助威！滿載而歸！',
    category: 'chick',
    price: { coins: 150, gems: 5, pearls: 0, leaves: 15 }
  }
];

export const HAT_ACCESSORIES: HatAccessory[] = [
  {
    id: 'cat',
    name: '貓咪萌耳帽',
    price: { coins: 300, gems: 10, pearls: 2, leaves: 20 },
    description: '萌翻全場的貓耳毛線帽，佩戴後答題心情超棒！'
  },
  {
    id: 'dog',
    name: '忠誠狗狗帽',
    price: { coins: 400, gems: 15, pearls: 3, leaves: 25 },
    description: '溫暖的棕色小狗耳帽子，忠心護主，增強專注力！'
  },
  {
    id: 'transformer',
    name: '機甲戰神頭盔',
    price: { coins: 800, gems: 30, pearls: 5, leaves: 50 },
    description: '高科技科幻機甲頭盔，自帶發光戰術面罩！'
  },
  {
    id: 'shades',
    name: '酷炫黑超墨鏡',
    price: { coins: 350, gems: 12, pearls: 2, leaves: 22 },
    description: '特工巨星專屬太陽眼鏡，帥氣出擊，氣勢無可阻擋！'
  }
];
