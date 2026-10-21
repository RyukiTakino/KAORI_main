import {
  KaoriScent,
  DailyMission,
  CharacterEvolutionStage,
  MissionType,
  KaoriStatusInfo,
  KaoriLevelStatus,
  FashionItem,
  GachaRankInfo,
  GachaRankTier,
  EquippedFashion,
  ItemRarity,
} from '../types';

export const SCENTS_CATALOG: KaoriScent[] = [
  // NORMAL
  {
    id: 'pure_soap',
    name: 'Pure Soap',
    japaneseName: 'ピュアソープ',
    rarity: 'NORMAL',
    category: 'soap',
    icon: '🫧',
    description: '洗い立てのタオルのような清潔感あふれるやさしい泡の香り',
    auraColor: 'rgba(186, 230, 253, 0.45)',
    accentColor: '#38bdf8',
    particleType: 'bubble',
  },
  {
    id: 'fresh_citrus',
    name: 'Fresh Citrus',
    japaneseName: 'フレッシュシトラス',
    rarity: 'NORMAL',
    category: 'citrus',
    icon: '🍋',
    description: 'もぎたてレモンとライムが弾ける爽快な柑橘の香り',
    auraColor: 'rgba(254, 240, 138, 0.5)',
    accentColor: '#facc15',
    particleType: 'citrus_spark',
  },
  {
    id: 'green_leaf',
    name: 'Green Leaf',
    japaneseName: 'グリーンリーフ',
    rarity: 'NORMAL',
    category: 'floral',
    icon: '🍃',
    description: '朝露に濡れた若葉とハーブが心地よいリフレッシュハーブの香り',
    auraColor: 'rgba(187, 247, 208, 0.45)',
    accentColor: '#4ade80',
    particleType: 'petal',
  },

  // RARE
  {
    id: 'floral_bloom',
    name: 'Floral Bloom',
    japaneseName: 'フローラルブルーム',
    rarity: 'RARE',
    category: 'floral',
    icon: '🌸',
    description: 'やさしい花々にふんわり包まれるような華やかで甘い香り',
    auraColor: 'rgba(251, 207, 232, 0.55)',
    accentColor: '#f472b6',
    particleType: 'petal',
  },
  {
    id: 'sweet_peach',
    name: 'Sweet Peach',
    japaneseName: 'スウィートピーチ',
    rarity: 'RARE',
    category: 'citrus',
    icon: '🍑',
    description: 'じゅわっと果汁あふれる完熟ピーチの愛らしいフルーティーな香り',
    auraColor: 'rgba(254, 215, 170, 0.55)',
    accentColor: '#fb923c',
    particleType: 'citrus_spark',
  },
  {
    id: 'aqua_marine',
    name: 'Aqua Marine',
    japaneseName: 'アクアマリン',
    rarity: 'RARE',
    category: 'marine',
    icon: '🌊',
    description: '澄み切った深い海と心地よい潮風を感じるマリンノートの香り',
    auraColor: 'rgba(165, 243, 252, 0.55)',
    accentColor: '#22d3ee',
    particleType: 'water_drop',
  },

  // SUPER RARE
  {
    id: 'moon_musk',
    name: 'Moon Musk',
    japaneseName: 'ムーンムスク',
    rarity: 'SUPER RARE',
    category: 'musk',
    icon: '🌙',
    description: '静寂な月夜に漂う、上品で幻想的な深みのあるホワイトムスクの香り',
    auraColor: 'rgba(233, 213, 255, 0.65)',
    accentColor: '#c084fc',
    particleType: 'stardust',
  },
  {
    id: 'midnight_rose',
    name: 'Midnight Rose',
    japaneseName: 'ミッドナイトローズ',
    rarity: 'SUPER RARE',
    category: 'floral',
    icon: '🌹',
    description: '夜だけに咲く神秘のバラ。艶やかで洗練された大人のフローラルノート',
    auraColor: 'rgba(244, 114, 182, 0.65)',
    accentColor: '#e11d48',
    particleType: 'petal',
  },
  {
    id: 'crystal_soap',
    name: 'Crystal Soap',
    japaneseName: 'クリスタルソープ',
    rarity: 'SUPER RARE',
    category: 'soap',
    icon: '✨',
    description: '虹色のオーラを放つ奇跡の石鹸。純白の輝きと幸福感に包まれる幻の香り',
    auraColor: 'rgba(199, 210, 254, 0.7)',
    accentColor: '#818cf8',
    particleType: 'bubble',
  },
];

// ================= FASHION ITEMS CATALOG =================
export const FASHION_ITEMS_CATALOG: FashionItem[] = [
  // HEAD ITEMS (帽子・ヘアアクセ)
  {
    id: 'towel_wrap',
    name: 'タオルダーバン',
    category: 'head',
    rarity: 'N',
    starLevel: 1,
    icon: '🧖',
    description: 'お風呂上がりに頭をすっぽり包むふわふわタオル',
    colorTheme: '#e2e8f0',
    accentColor: '#64748b',
    flavorText: '吸水性抜群で湯冷めを防ぐ定番アイテム。',
  },
  {
    id: 'shower_cap',
    name: 'パステルシャワーキャップ',
    category: 'head',
    rarity: 'N',
    starLevel: 2,
    icon: '🫧',
    description: 'フリルがついた可愛いピンクの防水キャップ',
    colorTheme: '#fbcfe8',
    accentColor: '#ec4899',
    flavorText: '髪を濡らさずサッと湯船に浸かりたい時にも大活躍。',
  },
  {
    id: 'ribbon_band',
    name: 'スウィートヘアバンド',
    category: 'head',
    rarity: 'R',
    starLevel: 3,
    icon: '🎀',
    description: '大きなリボンがついたふわもこ洗顔用ヘアバンド',
    colorTheme: '#fed7aa',
    accentColor: '#f97316',
    flavorText: 'つけるだけでお風呂前後の気分が一気に華やぐ！',
  },
  {
    id: 'duck_hat',
    name: '黄色いアヒルキャップ',
    category: 'head',
    rarity: 'R',
    starLevel: 3,
    icon: '🐥',
    description: 'くちばしとつぶらな瞳がついた愛らしいアヒル帽',
    colorTheme: '#fef08a',
    accentColor: '#eab308',
    flavorText: 'お風呂の守り神アヒル隊長とお揃いのデザイン。',
  },
  {
    id: 'bubble_beret',
    name: 'シャボンベレー帽',
    category: 'head',
    rarity: 'SR',
    starLevel: 4,
    icon: '🎨',
    description: '七色に輝く泡のブローチがあしらわれたお洒落ベレー帽',
    colorTheme: '#c7d2fe',
    accentColor: '#6366f1',
    flavorText: '洗練された香りをまとう人のための特別な帽子。',
  },
  {
    id: 'steam_crown',
    name: '湯気のクリスタルクラウン',
    category: 'head',
    rarity: 'SR',
    starLevel: 4,
    icon: '👑',
    description: '温かい湯気と水滴が結晶化した透き通る王冠',
    colorTheme: '#bae6fd',
    accentColor: '#0284c7',
    flavorText: '毎日の入浴を欠かさない清潔の王者の証。',
  },
  {
    id: 'rainbow_tiara',
    name: '七色のオーラティアラ',
    category: 'head',
    rarity: 'UR',
    starLevel: 5,
    icon: '💎',
    description: '極上の芳香を放つ至高のクリスタルティアラ',
    colorTheme: '#fbcfe8',
    accentColor: '#d946ef',
    flavorText: 'お風呂を極めし者にだけ輝く伝説の装飾具。',
  },

  // OUTFIT ITEMS (服・ルームウェア・バスローブ)
  {
    id: 'simple_tee',
    name: '清潔白T＆ルームショーツ',
    category: 'outfit',
    rarity: 'N',
    starLevel: 1,
    icon: '👕',
    description: '肌触りの良いコットン100%のリラックス部屋着',
    colorTheme: '#f8fafc',
    accentColor: '#38bdf8',
    flavorText: 'お風呂上がりに一番気持ちいいシンプルな着心地。',
  },
  {
    id: 'cozy_pajama',
    name: 'パステルストライプパジャマ',
    category: 'outfit',
    rarity: 'N',
    starLevel: 2,
    icon: '👚',
    description: 'やさしいミントとブルーの快適スリープパジャマ',
    colorTheme: '#dcfce7',
    accentColor: '#22c55e',
    flavorText: 'お風呂上がりのぬくもりをそのままベッドへお届け。',
  },
  {
    id: 'soft_bathrobe',
    name: '極上ふわふわバスローブ',
    category: 'outfit',
    rarity: 'R',
    starLevel: 3,
    icon: '🧖‍♀️',
    description: '高級ホテル仕様の厚手で包み込まれるようなバスローブ',
    colorTheme: '#f1f5f9',
    accentColor: '#64748b',
    flavorText: '湯上がりに羽織るだけでセレブなスパ気分を味わえる。',
  },
  {
    id: 'duck_hoodie',
    name: 'アヒルもこもこパーカー',
    category: 'outfit',
    rarity: 'R',
    starLevel: 3,
    icon: '🐥',
    description: 'アヒルカラーのふんわり温かいオーバーサイズパーカー',
    colorTheme: '#fef9c3',
    accentColor: '#ca8a04',
    flavorText: 'すっぽり被れるフードで湯冷め知らずの可愛さ。',
  },
  {
    id: 'onsen_yukata',
    name: '爽やか藍染め温泉浴衣',
    category: 'outfit',
    rarity: 'SR',
    starLevel: 4,
    icon: '👘',
    description: '風通しが良く涼やかな伝統の藍色温泉ゆかた',
    colorTheme: '#e0e7ff',
    accentColor: '#4338ca',
    flavorText: '名湯の湯上がりを連想させる情緒あふれる一着。',
  },
  {
    id: 'spa_dress',
    name: 'リゾートスパドレス',
    category: 'outfit',
    rarity: 'SR',
    starLevel: 4,
    icon: '👗',
    description: '南国の極上スパをイメージした優雅なシルキーローブ',
    colorTheme: '#fae8ff',
    accentColor: '#a855f7',
    flavorText: 'アロマの香りと調和して周囲を魅了する美しいシルエット。',
  },
  {
    id: 'royal_scent_robe',
    name: '香りの大精霊ドレス',
    category: 'outfit',
    rarity: 'UR',
    starLevel: 5,
    icon: '✨',
    description: '光と花のオーラを織り込んだ伝説の神聖ドレス',
    colorTheme: '#fce7f3',
    accentColor: '#e11d48',
    flavorText: '着る者すべてを幸福な香りで包み込む究極の衣装。',
  },

  // HAND ITEMS (手持ちお風呂アイテム)
  {
    id: 'fluffy_sponge',
    name: 'もこもこ泡スポンジ',
    category: 'hand',
    rarity: 'N',
    starLevel: 1,
    icon: '🧽',
    description: 'きめ細かい泡をたっぷり作れる洗体スポンジ',
    colorTheme: '#fef08a',
    accentColor: '#eab308',
    flavorText: '優しい泡で体を洗うのが毎日の至福タイム。',
  },
  {
    id: 'rubber_duck',
    name: 'ピヨピヨラバーダック',
    category: 'hand',
    rarity: 'N',
    starLevel: 2,
    icon: '🦆',
    description: '湯船に浮かべて一緒に遊べる黄色いアヒルちゃん',
    colorTheme: '#fef9c3',
    accentColor: '#f59e0b',
    flavorText: '湯船でぷかぷか。お風呂のお友達定番No.1。',
  },
  {
    id: 'bubble_wand',
    name: 'シャボン玉ステッキ',
    category: 'hand',
    rarity: 'R',
    starLevel: 3,
    icon: '🪄',
    description: '振ると七色のいい香りの泡が飛び出すステッキ',
    colorTheme: '#cffafe',
    accentColor: '#06b6d4',
    flavorText: '浴室が一瞬でファンタジーな泡の世界に変わる！',
  },
  {
    id: 'fizzy_bathbomb',
    name: '虹色炭酸バスボム',
    category: 'hand',
    rarity: 'R',
    starLevel: 3,
    icon: '🫧',
    description: 'お湯に入れるとシュワシュワ虹色に溶け出すバスボム',
    colorTheme: '#fbcfe8',
    accentColor: '#ec4899',
    flavorText: 'フルーティーな香りと炭酸の泡で疲労回復！',
  },
  {
    id: 'scented_perfume',
    name: 'クリスタル香水ボトル',
    category: 'hand',
    rarity: 'SR',
    starLevel: 4,
    icon: '🧴',
    description: '調香師が丁寧にブレンドした魔法のアロマ香水瓶',
    colorTheme: '#e9d5ff',
    accentColor: '#9333ea',
    flavorText: 'ワンプッシュで極上のフレグランスが広がる。',
  },
  {
    id: 'sacred_bath_staff',
    name: '聖なる湯浴みのロッド',
    category: 'hand',
    rarity: 'UR',
    starLevel: 5,
    icon: '🌟',
    description: '湯の精霊の力が宿る、お湯を浄化する奇跡の杖',
    colorTheme: '#fef08a',
    accentColor: '#ca8a04',
    flavorText: 'ひと振りでどんな疲れも吹き飛ばす神聖な光を放つ。',
  },

  // ACCESSORY / FACE ITEMS (メガネ・フェイスアクセ・チーク)
  {
    id: 'steam_blush',
    name: '湯上がりポカポカチーク',
    category: 'accessory',
    rarity: 'N',
    starLevel: 1,
    icon: '😊',
    description: 'お風呂で芯まで温まったほんのり上気した頬',
    colorTheme: '#fecdd3',
    accentColor: '#f43f5e',
    flavorText: '血行が良くなって自然と笑顔があふれ出す。',
  },
  {
    id: 'bath_glasses',
    name: '曇り止め湯浴みメガネ',
    category: 'accessory',
    rarity: 'R',
    starLevel: 3,
    icon: '👓',
    description: '湯気の中でも視界くっきりのお風呂専用おしゃれメガネ',
    colorTheme: '#bae6fd',
    accentColor: '#0ea5e9',
    flavorText: 'お風呂で読書や動画を楽しむ時の強い味方。',
  },
  {
    id: 'star_face_patch',
    name: '星屑のフェイスシール',
    category: 'accessory',
    rarity: 'SR',
    starLevel: 4,
    icon: '⭐',
    description: '光を受けるとキラキラ輝く星型のフェイスシール',
    colorTheme: '#fef08a',
    accentColor: '#eab308',
    flavorText: 'いい香りと一緒に周囲にキラキラオーラを振りまく。',
  },
  {
    id: 'angel_bubble_aura',
    name: '天使の泡オーラリング',
    category: 'accessory',
    rarity: 'UR',
    starLevel: 5,
    icon: '✨',
    description: '背中からふわりと現れる虹色バブルの天使の輪',
    colorTheme: '#ddd6fe',
    accentColor: '#7c3aed',
    flavorText: 'お風呂の神様に愛された者に授けられる奇跡のオーラ。',
  },

  // HAIR STYLES (FEMALE & MALE)
  {
    id: 'hair_short_bob',
    name: 'さっぱりショートボブ',
    category: 'hair',
    rarity: 'N',
    starLevel: 1,
    icon: '💇‍♀️',
    description: '洗いやすく乾きやすい清潔感あふれるショートヘア（女性向け）',
    colorTheme: '#78350f',
    accentColor: '#b45309',
    flavorText: 'ドライヤーもあっという間で毎日快適！',
  },
  {
    id: 'hair_mens_short',
    name: 'さわやかメンズショート',
    category: 'hair',
    rarity: 'N',
    starLevel: 1,
    icon: '💇‍♂️',
    description: '毛先が軽やかで清潔感抜群のナチュラルショート（男性向け）',
    colorTheme: '#1e293b',
    accentColor: '#0284c7',
    flavorText: '湯上がりもサッと決まる王道の爽やかスタイル。',
  },
  {
    id: 'hair_wavy_medium',
    name: 'ふんわりミディアム',
    category: 'hair',
    rarity: 'N',
    starLevel: 2,
    icon: '💇‍♀️',
    description: 'ゆるやかなウェーブが優しい印象のミディアムヘア',
    colorTheme: '#451a03',
    accentColor: '#92400e',
    flavorText: 'どんな帽子やターバンにも似合う万能スタイル。',
  },
  {
    id: 'hair_mens_center',
    name: 'クールセンターパート',
    category: 'hair',
    rarity: 'R',
    starLevel: 3,
    icon: '💇‍♂️',
    description: 'おでこを出して清潔感と知的な色気を放つセンター分け（男性向け）',
    colorTheme: '#0f172a',
    accentColor: '#6366f1',
    flavorText: 'お風呂上がりのウェットな質感も最高にかっこいい。',
  },
  {
    id: 'hair_twin_tails',
    name: '湯上がりツインテール',
    category: 'hair',
    rarity: 'R',
    starLevel: 3,
    icon: '👧',
    description: 'キュートに結んだ軽やかなツインテール（女性向け）',
    colorTheme: '#831843',
    accentColor: '#db2777',
    flavorText: '毛先が揺れるたびにいい香りがふわりと広がる。',
  },
  {
    id: 'hair_ponytail',
    name: '爽やかポニーテール',
    category: 'hair',
    rarity: 'R',
    starLevel: 3,
    icon: '👱‍♀️',
    description: '高めの位置で束ねたスポーティーで清潔なポニーテール',
    colorTheme: '#1e1b4b',
    accentColor: '#4f46e5',
    flavorText: 'うなじが見えて湯上がりも涼やかスッキリ！',
  },
  {
    id: 'hair_mens_wolf',
    name: 'スタイリッシュウルフ',
    category: 'hair',
    rarity: 'SR',
    starLevel: 4,
    icon: '🐺',
    description: '襟足に動きをつけたトレンドのウルフヘア（男性向け）',
    colorTheme: '#312e81',
    accentColor: '#818cf8',
    flavorText: 'サロン帰りのような立体的な美シルエット。',
  },
  {
    id: 'hair_fluffy_curl',
    name: 'ドリーミーふわふわカール',
    category: 'hair',
    rarity: 'SR',
    starLevel: 4,
    icon: '✨',
    description: 'お姫様のようにリッチで華やかなボリュームカールヘア',
    colorTheme: '#701a75',
    accentColor: '#c026d3',
    flavorText: 'トリートメントが行き届いた極上のサラつやヘア。',
  },
  {
    id: 'hair_aurora_long',
    name: '神秘のオーロラロング',
    category: 'hair',
    rarity: 'UR',
    starLevel: 5,
    icon: '🌌',
    description: '光の加減でパステルグラデーションに輝く美髪ロング',
    colorTheme: '#0c4a6e',
    accentColor: '#0284c7',
    flavorText: 'まるで夜空とオーロラをまとったような幻想的な髪。',
  },
  {
    id: 'hair_mens_god',
    name: '神聖のシャインフェード',
    category: 'hair',
    rarity: 'UR',
    starLevel: 5,
    icon: '👑',
    description: '金の光をまとう至高のメンズ神聖ショートヘア',
    colorTheme: '#78350f',
    accentColor: '#eab308',
    flavorText: 'お風呂を極めた男性アバターに宿る光の冠。',
  },
];

// ================= GACHA RANK TIERS BASED ON STREAK =================
export const GACHA_RANKS: Record<GachaRankTier, GachaRankInfo> = {
  1: {
    tier: 1,
    name: 'ブロンズガチャ',
    japaneseName: 'BRONZE TIER',
    minStreak: 1,
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    capsuleColor: 'from-amber-600 to-amber-800',
    glowClass: 'shadow-[0_0_30px_rgba(217,119,6,0.5)]',
    rates: {
      N: 70, // 70% Normal
      R: 25, // 25% Rare
      SR: 5, // 5% Super Rare
      UR: 0, // 0% Ultra Rare
    },
    description: '基本ランク。毎日お風呂に入ってシルバーへランクアップしよう！',
  },
  2: {
    tier: 2,
    name: 'シルバーガチャ',
    japaneseName: 'SILVER TIER',
    minStreak: 3,
    badgeClass: 'bg-slate-200 text-slate-800 border-slate-400',
    capsuleColor: 'from-slate-300 via-slate-100 to-slate-400',
    glowClass: 'shadow-[0_0_35px_rgba(148,163,184,0.7)]',
    rates: {
      N: 45, // 45% Normal
      R: 40, // 40% Rare
      SR: 12, // 12% Super Rare
      UR: 3, // 3% Ultra Rare (UR unlock!)
    },
    description: '3日連続入浴達成！レア★3＆★4アイテム出現率が大幅UP！',
  },
  3: {
    tier: 3,
    name: 'ゴールドガチャ',
    japaneseName: 'GOLD TIER',
    minStreak: 7,
    badgeClass: 'bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 text-amber-950 border-amber-400 shadow-sm',
    capsuleColor: 'from-yellow-300 via-amber-400 to-amber-600',
    glowClass: 'shadow-[0_0_45px_rgba(234,179,8,0.8)]',
    rates: {
      N: 20, // 20% Normal
      R: 45, // 45% Rare
      SR: 27, // 27% Super Rare
      UR: 8, // 8% Ultra Rare
    },
    description: '7日連続入浴達成！★4以上のSR・URが高確率でザクザク出現！',
  },
  4: {
    tier: 4,
    name: 'レインボーガチャ',
    japaneseName: 'RAINBOW TIER',
    minStreak: 14,
    badgeClass: 'bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-white border-white shadow-md animate-pulse',
    capsuleColor: 'from-pink-400 via-purple-500 to-cyan-400',
    glowClass: 'shadow-[0_0_60px_rgba(236,72,153,0.9)]',
    rates: {
      N: 5, // 5% Normal
      R: 30, // 30% Rare
      SR: 45, // 45% Super Rare
      UR: 20, // 20% Ultra Rare (Highest probability!)
    },
    description: '14日連続入浴達成！風呂キャンセル完全克服！最高峰UR★5アイテムが超高確率！',
  },
};

export function getGachaRank(streak: number = 1): GachaRankInfo {
  const safeStreak = typeof streak === 'number' && !isNaN(streak) ? streak : 1;
  if (safeStreak >= 14) return GACHA_RANKS[4] || GACHA_RANKS[1];
  if (safeStreak >= 7) return GACHA_RANKS[3] || GACHA_RANKS[1];
  if (safeStreak >= 3) return GACHA_RANKS[2] || GACHA_RANKS[1];
  return GACHA_RANKS[1];
}

export function getNextGachaRank(streak: number = 1): {
  nextRank: GachaRankInfo | null;
  daysNeeded: number;
} {
  const safeStreak = typeof streak === 'number' && !isNaN(streak) ? streak : 1;
  if (safeStreak >= 14) {
    return { nextRank: null, daysNeeded: 0 };
  }
  if (safeStreak >= 7) {
    return { nextRank: GACHA_RANKS[4], daysNeeded: 14 - safeStreak };
  }
  if (safeStreak >= 3) {
    return { nextRank: GACHA_RANKS[3], daysNeeded: 7 - safeStreak };
  }
  return { nextRank: GACHA_RANKS[2], daysNeeded: 3 - safeStreak };
}

// Draw a fashion item based on Gacha Rank odds
export function drawFashionItem(rank: GachaRankInfo): FashionItem {
  const rand = Math.random() * 100;
  const rates = rank.rates;
  let targetRarity: ItemRarity = 'N';

  if (rand < rates.UR) {
    targetRarity = 'UR';
  } else if (rand < rates.UR + rates.SR) {
    targetRarity = 'SR';
  } else if (rand < rates.UR + rates.SR + rates.R) {
    targetRarity = 'R';
  } else {
    targetRarity = 'N';
  }

  // Filter pool by rarity
  let pool = FASHION_ITEMS_CATALOG.filter((item) => item.rarity === targetRarity);
  if (pool.length === 0) {
    pool = FASHION_ITEMS_CATALOG;
  }

  const selected = pool[Math.floor(Math.random() * pool.length)];
  return selected || FASHION_ITEMS_CATALOG[0];
}

// Default initial fashion configuration
export const DEFAULT_EQUIPPED_FASHION: EquippedFashion = {
  head: 'towel_wrap',
  outfit: 'simple_tee',
  accessory: 'steam_blush',
  hand: 'rubber_duck',
  hair: 'hair_short_bob',
  gender: 'style_a',
  hairColor: '#451a03',
};

// ================= EXPANDED BATH MISSIONS =================
export const MISSIONS_LIST: DailyMission[] = [
  {
    id: 'bath_salt',
    name: '入浴剤・バスボム',
    title: '今日使った入浴剤を撮影せよ！',
    icon: '🫧',
    targetKeyword: '入浴剤の袋・箱、バスボム、バスソルト、色がついた湯船のお湯',
    description: 'お風呂を極上の香りに！お気に入りの入浴剤やバスボムのパッケージをパシャリ',
    hint: '入浴剤の小袋・パッケージ、または湯船に入れるバスボムを写してみてね！',
    expReward: 100,
  },
  {
    id: 'bathtub',
    name: '湯船・お風呂場',
    title: '温かい湯船・お湯を撮影せよ！',
    icon: '🛁',
    targetKeyword: '湯船、お湯が張られた浴槽、お風呂の蓋、浴室全体',
    description: 'ほかほかのお湯でリラックス！湯船やバスタブを撮影してね',
    hint: 'お湯が張られた浴槽やバスタブのふちが分かるように撮影するとバッチリ！',
    expReward: 100,
  },
  {
    id: 'bath_toy',
    name: 'お風呂グッズ・アヒル',
    title: 'お風呂のおもちゃ・グッズを撮影せよ！',
    icon: '🐥',
    targetKeyword: 'ラバーダック、お風呂用おもちゃ、湯桶・手桶、バスチェア',
    description: 'お風呂タイムを楽しく！黄色いアヒルや湯桶、お風呂グッズを撮影してね',
    hint: '湯桶や黄色いアヒルちゃん、バスチェアなどが写っているとAIが認識しやすいよ！',
    expReward: 100,
  },
  {
    id: 'shampoo',
    name: 'シャンプー',
    title: '今日使ったシャンプーを撮影せよ！',
    icon: '🧴',
    targetKeyword: 'シャンプーまたはシャンプーボトル・詰め替えパック・トリートメント',
    description: '頭皮すっきり！お風呂場にあるシャンプーのボトルをパシャリと撮影してね',
    hint: 'ボトルのラベルや「Shampoo」の文字、ポンプが見えるように撮るとAIが認識しやすいよ！',
    expReward: 100,
  },
  {
    id: 'bodysoap',
    name: 'ボディソープ・石鹸',
    title: '今日使ったボディソープを撮影せよ！',
    icon: '🧼',
    targetKeyword: 'ボディソープ、石鹸（固形石鹸）、ボディウォッシュ',
    description: '全身ピカピカ清潔に！お気に入りのボディソープや石鹸を撮影してね',
    hint: '泡立ちネットや石鹸置き、ボトルの正面を写してみてね！',
    expReward: 100,
  },
  {
    id: 'towel',
    name: 'タオル',
    title: 'お風呂上がりのタオルを撮影せよ！',
    icon: '🧖',
    targetKeyword: 'タオル、バスタオル、フェイスタオル',
    description: '湯上がりの必須アイテム！拭き心地のいいタオルをパシャリ',
    hint: '清潔なタオル全体やふわふわの生地感が写っているとバッチリだよ！',
    expReward: 100,
  },
  {
    id: 'dryer',
    name: 'ドライヤー',
    title: '髪を乾かすドライヤーを撮影せよ！',
    icon: '💨',
    targetKeyword: 'ヘアドライヤー、ドライヤー本体',
    description: '髪を乾かして湯冷め防止！ドライヤーを撮影してね',
    hint: 'ドライヤーの吹き出し口や持ち手が見えるアングルで撮影してね！',
    expReward: 100,
  },
  {
    id: 'face_cleanser',
    name: '洗顔料',
    title: '今日使った洗顔料を撮影せよ！',
    icon: '🫧',
    targetKeyword: '洗顔フォーム、洗顔料チューブ、洗顔石鹸、クレンジング',
    description: 'お顔もさっぱりキレイに！洗顔料チューブや泡洗顔ボトルを撮影してね',
    hint: 'チューブのパッケージや泡ポンプが分かるように写してね！',
    expReward: 100,
  },
];

export const EVOLUTION_STAGES: CharacterEvolutionStage[] = [
  {
    stage: 1,
    minLevel: 1,
    maxLevel: 2,
    title: '湯上がりビギナー',
    description: 'お風呂ライフを始めたばかりの素朴なアバター。毎日の入浴で美肌の土台を作ります。',
    featureDescription: '素朴な湯上がりスマイル＆ふわふわタオル',
  },
  {
    stage: 2,
    minLevel: 3,
    maxLevel: 5,
    title: '美肌マスター見習い',
    description: '毎日の入浴でお肌のキメが整い、髪に自然なツヤが出現！垢抜け度が大幅アップ！',
    featureDescription: 'お肌の透明感UP＆シルバーガチャ解放',
  },
  {
    stage: 3,
    minLevel: 6,
    maxLevel: 9,
    title: '美と香りのファッショニスタ',
    description: 'モデル級の美肌・美髪と輝くオーラを放つ上級者！どんな衣装もスタイリッシュに着こなす！',
    featureDescription: '天使の輪（ツヤ髪）＆ゴールドガチャ解放',
  },
  {
    stage: 4,
    minLevel: 10,
    maxLevel: 14,
    title: '至高の湯神カリスマ',
    description: '7日以上の連続入浴を達成！圧倒的な美肌と光のオーラを放つ憧れのカリスマ美男/美女！',
    featureDescription: '極上ツヤ肌ハイライト＆きらめく光のオーラ',
  },
  {
    stage: 5,
    minLevel: 15,
    maxLevel: 999,
    title: '伝説のお風呂神聖体',
    description: '風呂キャンセルを完全に克服した究極の美神！周囲を神聖な香りとまばゆい輝きで満たします。',
    featureDescription: 'レインボーガチャ＆神聖なるレインボーオーラ',
  },
];

export const CHARACTER_DIALOGUES = [
  'お風呂に入ると、今日もいい匂いになれるよ〜！',
  '今日の写真ミッション、入浴剤やシャンプー撮れるかな？',
  '連続でお風呂に入ると、ガチャのランクが上がってレア服が出るよ！',
  '今日のコーデ、どうかな？似合ってる？',
  '温かいお風呂に入って、今日もぐっすり眠ろうね♪',
  'お風呂キャンセルしないでえらいっ！大好き！',
  '新しい服や帽子をガチャで集めて、おしゃれしよう✨',
];

export function getEvolutionStage(level: number): CharacterEvolutionStage {
  const found = EVOLUTION_STAGES.find((s) => level >= s.minLevel && level <= s.maxLevel);
  return found || EVOLUTION_STAGES[EVOLUTION_STAGES.length - 1];
}

export function getNextEvolutionStage(level: number): CharacterEvolutionStage | null {
  const currentStage = getEvolutionStage(level);
  const nextStage = EVOLUTION_STAGES.find((s) => s.stage === currentStage.stage + 1);
  return nextStage || null;
}

export function getBathsUntilNextEvolution(
  level: number,
  currentExp: number
): { bathsNeeded: number; nextLevel: number; nextStage: CharacterEvolutionStage | null } {
  const nextStage = getNextEvolutionStage(level);
  if (!nextStage) {
    return { bathsNeeded: 0, nextLevel: level, nextStage: null };
  }
  const levelsNeeded = nextStage.minLevel - level;
  const expNeeded = levelsNeeded * 100 - currentExp;
  const bathsNeeded = Math.max(1, Math.ceil(expNeeded / 100));
  return {
    bathsNeeded,
    nextLevel: nextStage.minLevel,
    nextStage,
  };
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDailyMission(dateStr: string): DailyMission {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % MISSIONS_LIST.length;
  return MISSIONS_LIST[index];
}

export function getRandomScent(): KaoriScent {
  const rand = Math.random();
  let pool: KaoriScent[];

  if (rand < 0.6) {
    pool = SCENTS_CATALOG.filter((s) => s.rarity === 'NORMAL');
  } else if (rand < 0.9) {
    pool = SCENTS_CATALOG.filter((s) => s.rarity === 'RARE');
  } else {
    pool = SCENTS_CATALOG.filter((s) => s.rarity === 'SUPER RARE');
  }

  const selected = pool[Math.floor(Math.random() * pool.length)];
  return selected || SCENTS_CATALOG[0];
}

export function getKaoriStatusInfo(gauge: number): KaoriStatusInfo {
  const clamped = Math.max(0, Math.min(100, Math.round(gauge)));

  if (clamped >= 80) {
    return {
      status: 'VERY_FRESH',
      label: '極上ツヤ美肌＆天使の輝き',
      badgeLabel: '✨ 美肌 MAX (80-100%)',
      colorClass: 'text-emerald-600',
      bgClass: 'bg-emerald-50',
      borderClass: 'border-emerald-300',
      icon: '✨',
      dialogueList: [
        'お風呂最高〜！お肌ぷるぷる＆髪もサラツヤだよ！🛁✨',
        'お風呂に入ると、こんなにキレイになれるんだね♪',
        '体中からいい香りとキラキラオーラが溢れてるよ〜！',
      ],
      mood: 'happy',
    };
  }

  if (clamped >= 50) {
    return {
      status: 'FRESH',
      label: '清潔で爽やか（通常）',
      badgeLabel: '🌸 清潔 (50-79%)',
      colorClass: 'text-sky-600',
      bgClass: 'bg-sky-50',
      borderClass: 'border-sky-200',
      icon: '🌸',
      dialogueList: [
        'ふんわり心地いい香りをキープ中♪',
        'さっぱり気持ちいいね！今日も夜はお風呂に入ろう！',
        'お肌の調子もいい感じだよ〜！',
      ],
      mood: 'normal',
    };
  }

  if (clamped >= 25) {
    return {
      status: 'KAORI_LOW',
      label: '皮脂・くすみ・髪ボサボサ',
      badgeLabel: '😐 くすみ・皮脂 (25-49%)',
      colorClass: 'text-amber-600',
      bgClass: 'bg-amber-50',
      borderClass: 'border-amber-200',
      icon: '😐',
      dialogueList: [
        'お肌が油っぽくなって髪もボサボサしてきたよ…お風呂入りたい！',
        '目の下にクマが…湯船で温まってリフレッシュしたいな🛁',
        '今日はお風呂キャンセルしないでね…？',
      ],
      mood: 'worried',
    };
  }

  if (clamped >= 1) {
    return {
      status: 'SMELLY',
      label: '皮脂汚れ・悪臭モヤ・ハエ飛来',
      badgeLabel: '😵 ドロドロ汚れ (1-24%)',
      colorClass: 'text-purple-600',
      bgClass: 'bg-purple-50',
      borderClass: 'border-purple-200',
      icon: '😵',
      dialogueList: [
        'うぅ…汗と皮脂でドロドロ…ハエまで寄ってきたよ〜🪰💦',
        '体が重くて肌もボロボロ…早く泡で洗ってぇ〜！🫧',
        'お風呂に入れば一瞬でツヤツヤ美人に戻れるから…お願い！',
      ],
      mood: 'dizzy',
    };
  }

  return {
    status: 'VERY_SMELLY',
    label: '限界ヘドロ・超醜態モンスター',
    badgeLabel: '🤢 限界ヘドロ (0%)',
    colorClass: 'text-rose-700',
    bgClass: 'bg-purple-100',
    borderClass: 'border-purple-400',
    icon: '🤢',
    dialogueList: [
      'うぎゃあ…全身ヘドロまみれで醜い姿に…助けてぇ〜！☠️',
      'お風呂……今すぐお湯とシャンプーで洗ってくれぇぇ…！🫧',
      '湯船に入ればピカーンと元の美男/美女に生まれ変わるよ…！',
    ],
    mood: 'stinky',
  };
}
