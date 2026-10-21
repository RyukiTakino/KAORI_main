export type ScentRarity = 'NORMAL' | 'RARE' | 'SUPER RARE';

export type ScentCategory = 'soap' | 'floral' | 'citrus' | 'marine' | 'musk';

export interface KaoriScent {
  id: string;
  name: string;
  japaneseName: string;
  rarity: ScentRarity;
  category: ScentCategory;
  icon: string;
  description: string;
  auraColor: string;
  accentColor: string;
  particleType: 'bubble' | 'petal' | 'citrus_spark' | 'water_drop' | 'stardust';
}

export type ItemRarity = 'N' | 'R' | 'SR' | 'UR';

export type ItemCategory = 'head' | 'outfit' | 'accessory' | 'hand' | 'hair';

export interface FashionItem {
  id: string;
  name: string;
  category: ItemCategory;
  rarity: ItemRarity;
  starLevel: number; // 1 to 5
  icon: string;
  description: string;
  colorTheme: string;
  accentColor: string;
  flavorText: string;
}

export type GachaRankTier = 1 | 2 | 3 | 4;

export interface GachaRankInfo {
  tier: GachaRankTier;
  name: string;
  japaneseName: string;
  minStreak: number;
  badgeClass: string;
  capsuleColor: string;
  glowClass: string;
  rates: { N: number; R: number; SR: number; UR: number };
  description: string;
}

export type MissionType =
  | 'bath_salt' // 入浴剤・バスボム
  | 'shampoo' // シャンプー
  | 'bodysoap' // ボディソープ・石鹸
  | 'bathtub' // 湯船・お湯
  | 'bath_toy' // お風呂グッズ・アヒル
  | 'towel' // タオル・バスタオル
  | 'dryer' // ドライヤー
  | 'face_cleanser'; // 洗顔料・泡

export interface DailyMission {
  id: MissionType;
  name: string;
  title: string;
  icon: string;
  targetKeyword: string;
  description: string;
  hint: string;
  expReward: number;
}

export interface VerificationResult {
  isMatch: boolean;
  detectedObject: string;
  confidence: 'high' | 'medium' | 'low';
  comment: string;
  reason?: string;
  reasoning?: string;
}

export interface PreviewTestHistoryItem {
  id: string;
  timestamp: string;
  missionId: MissionType;
  missionName: string;
  isMatch: boolean;
  detectedObject: string;
  reason: string;
  comment: string;
  confidence: string;
}

export interface CharacterEvolutionStage {
  stage: number;
  minLevel: number;
  maxLevel: number;
  title: string;
  description: string;
  featureDescription: string;
}

export type KaoriLevelStatus = 'VERY_FRESH' | 'FRESH' | 'KAORI_LOW' | 'SMELLY' | 'VERY_SMELLY';

export interface KaoriStatusInfo {
  status: KaoriLevelStatus;
  label: string;
  badgeLabel: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  icon: string;
  dialogueList: string[];
  mood: 'happy' | 'normal' | 'worried' | 'dizzy' | 'stinky';
}

export type PartnerExpression =
  | 'normal'
  | 'happy'
  | 'blushing'
  | 'surprised'
  | 'pout'
  | 'loving'
  | 'shocked'
  | 'wink';

export type PartnerGender = 'female' | 'male';

export interface DateScriptLine {
  speaker: string; // Partner name or Player
  text: string;
  expression?: PartnerExpression;
  isChoice?: boolean;
  choices?: { text: string; affectionBonus: number; reply: string }[];
}

export interface RomanceDateEvent {
  id: string;
  partnerId: string;
  title: string;
  requiredIntimacyLevel: number;
  description: string;
  icon: string;
  location: string;
  script: DateScriptLine[];
  rewardExp: number;
  rewardTickets: number;
  isUnlocked?: boolean;
  isCompleted?: boolean;
}

export interface RomancePartner {
  id: string;
  name: string;
  romajiName: string;
  title: string;
  gender: PartnerGender;
  preferredPlayerGender: 'female' | 'male';
  age: string;
  personality: string;
  description: string;
  favoriteScentCategory: ScentCategory;
  accentColor: string;
  bgGradient: string;
  avatarTheme: {
    hairColor: string;
    eyeColor: string;
    themeColor: string;
  };
  dialogues: {
    greeting: string[];
    freshBathReaction: string[];
    stinkyReaction: string[];
    touchHeadReaction: string[];
    touchBodyReaction: string[];
    highRarityFashionPraise: { [itemId: string]: string };
    generalFashionPraise: string[];
    intimacyLevelUp: string[];
    confession: string;
  };
}

export interface PartnerAffectionState {
  partnerId: string;
  intimacyPoints: number; // e.g. 0 to 500+
  intimacyLevel: number; // 1 to 5
  unlockedDateEventIds: string[];
  completedDateEventIds: string[];
}

export interface EquippedFashion {
  head: string | null; // Hat or headpiece
  outfit: string | null; // Clothes / robe
  accessory: string | null; // Glasses / face accessory
  hand: string | null; // Held item
  hair: string; // Hairstyle ID
  gender: 'style_a' | 'style_b' | 'female' | 'male'; // Base avatar style (female: style_a / male: style_b)
  hairColor: string; // Hair color hex/id
}

export interface UserGameState {
  level: number;
  currentExp: number;
  maxExp: number;
  totalBaths: number;
  streak: number;
  lastBathDate: string | null;
  todayCompleted: boolean;
  todayMissionId: MissionType;
  todayMissionDate: string;
  activeScentId: string;
  collectedScentIds: string[];
  unlockedAccessories: string[];
  equippedAccessory: string | null;
  kaoriGauge: number; // 0 to 100
  // Fashion and Gacha additions
  gachaTickets: number;
  unlockedFashionItemIds: string[];
  equippedFashion: EquippedFashion;
  // Romance & Affection System
  activePartnerId: string;
  partnerAffectionMap: { [partnerId: string]: PartnerAffectionState };
}

export type AppScreen =
  | 'home'
  | 'bathtime'
  | 'camera'
  | 'verifying'
  | 'result'
  | 'gacha'
  | 'reward'
  | 'romance';

export type PreviewSpeed = 1 | 10 | 50 | 100;

