import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Sparkles, CheckCircle2, Droplets, Flame, Gift, Shirt, Heart } from 'lucide-react';
import {
  UserGameState,
  KaoriScent,
  DailyMission,
  VerificationResult,
  AppScreen,
  PreviewSpeed,
  PreviewTestHistoryItem,
  FashionItem,
  EquippedFashion,
  ItemCategory,
  RomancePartner,
  PartnerAffectionState,
} from './types';
import {
  SCENTS_CATALOG,
  MISSIONS_LIST,
  EVOLUTION_STAGES,
  CHARACTER_DIALOGUES,
  DEFAULT_EQUIPPED_FASHION,
  getEvolutionStage,
  getBathsUntilNextEvolution,
  getTodayDateString,
  getDailyMission,
  getRandomScent,
  getKaoriStatusInfo,
  getGachaRank,
  drawFashionItem,
} from './data/gameData';
import {
  ROMANCE_PARTNERS,
  getPartner,
  DEFAULT_PARTNER_AFFECTION_MAP,
  calculateIntimacyLevel,
  calculateFashionCharm,
} from './data/romanceData';
import { CharacterAvatar } from './components/CharacterAvatar';
import { FutureEvolutionCard } from './components/FutureEvolutionCard';
import { DailyMissionCard } from './components/DailyMissionCard';
import { RomancePartnerCard } from './components/RomancePartnerCard';
import { RomanceView } from './components/RomanceView';
import { BathTimeModal } from './components/BathTimeModal';
import { CameraUploadModal } from './components/CameraUploadModal';
import { VerifyingOverlay } from './components/VerifyingOverlay';
import { MissionResultModal } from './components/MissionResultModal';
import { GachaModal } from './components/GachaModal';
import { LevelUpModal } from './components/LevelUpModal';
import { StreakBonusModal } from './components/StreakBonusModal';
import { CollectionView } from './components/CollectionView';
import { HeaderBar } from './components/HeaderBar';
import { BottomNavBar } from './components/BottomNavBar';
import { PreviewController } from './components/PreviewController';
import { PreviewPhotoTestModal } from './components/PreviewPhotoTestModal';

const STORAGE_KEY = 'KAORI_BATH_GAME_DATA_V5';

const INITIAL_GAME_STATE: UserGameState = {
  level: 1,
  currentExp: 0,
  maxExp: 100,
  totalBaths: 0,
  streak: 1,
  lastBathDate: null,
  todayCompleted: false,
  todayMissionId: 'bath_salt',
  todayMissionDate: getTodayDateString(),
  activeScentId: 'pure_soap',
  collectedScentIds: ['pure_soap'],
  unlockedAccessories: [],
  equippedAccessory: null,
  kaoriGauge: 100,
  equippedFashion: DEFAULT_EQUIPPED_FASHION,
  unlockedFashionItemIds: [
    'towel_wrap',
    'simple_tee',
    'fluffy_sponge',
    'rubber_duck',
    'steam_blush',
    'hair_short_bob',
    'hair_mens_short',
  ],
  gachaTickets: 1,
  activePartnerId: 'aoi',
  partnerAffectionMap: DEFAULT_PARTNER_AFFECTION_MAP,
};

export default function App() {
  // Game state loaded from localStorage with full fallback sanitization
  const [gameState, setGameState] = useState<UserGameState>(() => {
    const todayStr = getTodayDateString();
    const todayMission = getDailyMission(todayStr);

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Partial<UserGameState> = JSON.parse(saved);
        const fallbackEquipped: EquippedFashion = {
          ...DEFAULT_EQUIPPED_FASHION,
          ...(parsed.equippedFashion || {}),
        };
        const fallbackUnlocked =
          Array.isArray(parsed.unlockedFashionItemIds) && parsed.unlockedFashionItemIds.length > 0
            ? parsed.unlockedFashionItemIds
            : INITIAL_GAME_STATE.unlockedFashionItemIds;

        const activeScentExists = SCENTS_CATALOG.some((s) => s.id === parsed.activeScentId);
        const activeScentId = activeScentExists ? (parsed.activeScentId as string) : 'pure_soap';

        const isNewDay = parsed.todayMissionDate !== todayStr;

        const partnerAffectionMap =
          parsed.partnerAffectionMap && typeof parsed.partnerAffectionMap === 'object'
            ? { ...DEFAULT_PARTNER_AFFECTION_MAP, ...parsed.partnerAffectionMap }
            : DEFAULT_PARTNER_AFFECTION_MAP;

        const defaultPartnerId =
          fallbackEquipped.gender === 'male' || fallbackEquipped.gender === 'style_b'
            ? 'aoi'
            : 'ren';
        const activePartnerId = parsed.activePartnerId || defaultPartnerId;

        return {
          level: typeof parsed.level === 'number' && parsed.level > 0 ? parsed.level : 1,
          currentExp: typeof parsed.currentExp === 'number' ? parsed.currentExp : 0,
          maxExp: 100,
          totalBaths: typeof parsed.totalBaths === 'number' ? parsed.totalBaths : 0,
          streak: typeof parsed.streak === 'number' ? parsed.streak : 1,
          lastBathDate: parsed.lastBathDate || null,
          todayCompleted: isNewDay ? false : Boolean(parsed.todayCompleted),
          todayMissionId: isNewDay ? todayMission.id : parsed.todayMissionId || todayMission.id,
          todayMissionDate: todayStr,
          activeScentId,
          collectedScentIds:
            Array.isArray(parsed.collectedScentIds) && parsed.collectedScentIds.length > 0
              ? Array.from(new Set(['pure_soap', ...parsed.collectedScentIds]))
              : ['pure_soap'],
          unlockedAccessories: Array.isArray(parsed.unlockedAccessories)
            ? parsed.unlockedAccessories
            : [],
          equippedAccessory: parsed.equippedAccessory || null,
          kaoriGauge: typeof parsed.kaoriGauge === 'number' ? parsed.kaoriGauge : 100,
          equippedFashion: fallbackEquipped,
          unlockedFashionItemIds: fallbackUnlocked,
          gachaTickets: typeof parsed.gachaTickets === 'number' ? parsed.gachaTickets : 1,
          activePartnerId,
          partnerAffectionMap,
        };
      }
    } catch (e) {
      console.error('Failed to load saved state from localStorage:', e);
    }

    return {
      ...INITIAL_GAME_STATE,
      todayMissionId: todayMission.id,
      todayMissionDate: todayStr,
    };
  });

  // ================= PREVIEW MODE STATE =================
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewState, setPreviewState] = useState<UserGameState>(INITIAL_GAME_STATE);
  const [simulationDay, setSimulationDay] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewSpeed, setPreviewSpeed] = useState<PreviewSpeed>(100);
  const [isCleaningUp, setIsCleaningUp] = useState(false);
  const [showPreviewPhotoTest, setShowPreviewPhotoTest] = useState(false);
  const [previewTestHistory, setPreviewTestHistory] = useState<PreviewTestHistoryItem[]>([]);

  // Active state to render (previewState if in preview mode, else gameState)
  const displayedState = isPreviewMode ? previewState : gameState;

  // Navigation tab ('home' | 'wardrobe' | 'romance' | 'collection')
  const [activeTab, setActiveTab] = useState<'home' | 'wardrobe' | 'romance' | 'collection'>('home');
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');

  // Verification & Gacha flow states
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [drawnFashionItem, setDrawnFashionItem] = useState<FashionItem | null>(null);

  // Level up & Evolution modal states
  const [levelUpData, setLevelUpData] = useState<{ oldLevel: number; newLevel: number } | null>(
    null
  );

  // 7-day streak bonus modal
  const [showStreakBonus, setShowStreakBonus] = useState(false);

  // Character dialogue
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showDialogueBubble, setShowDialogueBubble] = useState(true);

  // Active Romance Partner Object
  const activePartner = getPartner(displayedState.activePartnerId || 'aoi');
  const activeAffection =
    displayedState.partnerAffectionMap?.[activePartner.id] ||
    DEFAULT_PARTNER_AFFECTION_MAP[activePartner.id] || {
      partnerId: activePartner.id,
      intimacyPoints: 50,
      intimacyLevel: 1,
      unlockedDateEventIds: ['date_aoi_1'],
      completedDateEventIds: [],
    };

  // Save regular game state to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [gameState]);

  // Current Gacha Rank & Rates for user's streak
  const currentGachaRank = getGachaRank(displayedState.streak);

  // ================= PREVIEW MODE HANDLERS =================
  const handleOpenPreview = () => {
    setPreviewState({
      ...gameState,
      kaoriGauge: gameState.kaoriGauge ?? 100,
    });
    setSimulationDay(Math.max(1, gameState.streak || 1));
    setIsPlaying(false);
    setIsPreviewMode(true);
  };

  const handleExitPreview = () => {
    setIsPlaying(false);
    setIsPreviewMode(false);
  };

  // Preview Bath Simulation (+45 Kaori, +100 EXP, +1 Streak, +100 Romance Affection)
  const handlePreviewBath = () => {
    setPreviewState((prev) => {
      const wasSmelly = (prev.kaoriGauge ?? 100) <= 40;
      if (wasSmelly) {
        setIsCleaningUp(true);
        setTimeout(() => setIsCleaningUp(false), 1400);
      }

      const newGauge = Math.min(100, (prev.kaoriGauge ?? 100) + 45);
      const oldLevel = prev.level;
      let newExp = prev.currentExp + 100;
      let newLevel = oldLevel;
      while (newExp >= 100) {
        newExp -= 100;
        newLevel += 1;
      }

      const newStreak = prev.streak + 1;
      const newTotalBaths = prev.totalBaths + 1;
      const pickedScent = getRandomScent();
      const collectedScentIds = Array.from(new Set([...prev.collectedScentIds, pickedScent.id]));

      // Draw a fashion item based on new streak rank
      const rankInfo = getGachaRank(newStreak);
      const gachaItem = drawFashionItem(rankInfo);
      const unlockedFashionItemIds = Array.from(
        new Set([...(prev.unlockedFashionItemIds || []), gachaItem.id])
      );

      let unlockedAccessories = [...prev.unlockedAccessories];
      let equippedAccessory = prev.equippedAccessory;
      if (newStreak >= 7 && !unlockedAccessories.includes('bubble_crown')) {
        unlockedAccessories.push('bubble_crown');
        equippedAccessory = 'bubble_crown';
      }

      // Add partner affection (+100 bath bonus)
      const currentPartnerId = prev.activePartnerId || 'aoi';
      const currentAffection = prev.partnerAffectionMap?.[currentPartnerId] || {
        partnerId: currentPartnerId,
        intimacyPoints: 50,
        intimacyLevel: 1,
        unlockedDateEventIds: [],
        completedDateEventIds: [],
      };
      const newIntimacyPts = currentAffection.intimacyPoints + 100;
      const newIntimacyTier = calculateIntimacyLevel(newIntimacyPts);

      const updatedAffectionMap = {
        ...(prev.partnerAffectionMap || DEFAULT_PARTNER_AFFECTION_MAP),
        [currentPartnerId]: {
          ...currentAffection,
          intimacyPoints: newIntimacyPts,
          intimacyLevel: newIntimacyTier.level,
        },
      };

      if (newLevel > oldLevel) {
        setLevelUpData({ oldLevel, newLevel });
      }

      return {
        ...prev,
        level: newLevel,
        currentExp: newExp,
        totalBaths: newTotalBaths,
        streak: newStreak,
        kaoriGauge: newGauge,
        activeScentId: pickedScent.id,
        collectedScentIds,
        unlockedFashionItemIds,
        gachaTickets: (prev.gachaTickets || 0) + 1,
        unlockedAccessories,
        equippedAccessory,
        partnerAffectionMap: updatedAffectionMap,
      };
    });
    setSimulationDay((prev) => prev + 1);
  };

  // Preview Skip Simulation (-25 Kaori, streak interrupted)
  const handlePreviewSkip = () => {
    setPreviewState((prev) => ({
      ...prev,
      kaoriGauge: Math.max(0, (prev.kaoriGauge ?? 100) - 25),
      streak: 0,
    }));
    setSimulationDay((prev) => prev + 1);
  };

  // Preview Advance Days (+days, natural kaori decay)
  const handlePreviewAdvanceDays = (days: number) => {
    setPreviewState((prev) => ({
      ...prev,
      kaoriGauge: Math.max(0, (prev.kaoriGauge ?? 100) - days * 15),
      streak: 0,
    }));
    setSimulationDay((prev) => prev + days);
  };

  // Preview Reset to DAY 1
  const handlePreviewReset = () => {
    setIsPlaying(false);
    setSimulationDay(1);
    setPreviewState({
      ...INITIAL_GAME_STATE,
      kaoriGauge: 100,
    });
  };

  // Preview One-touch Scenarios
  const handlePreviewScenario = (scenario: 'growth' | 'skip' | 'recovery') => {
    if (scenario === 'growth') {
      setSimulationDay(7);
      const unlockedFashion = [
        'outfit_pajama_blue',
        'hair_short_brown',
        'outfit_yukata_sakura',
        'head_duck_towel',
        'outfit_duck_robe',
        'hand_sponge_duck',
        'head_samurai_towel',
        'hair_mens_wolf',
        'royal_scent_robe',
      ];
      setPreviewState({
        level: 4,
        currentExp: 0,
        maxExp: 100,
        totalBaths: 7,
        streak: 7,
        lastBathDate: getTodayDateString(),
        todayCompleted: true,
        todayMissionId: 'bath_salt',
        todayMissionDate: getTodayDateString(),
        activeScentId: 'floral_bloom',
        collectedScentIds: ['pure_soap', 'fresh_citrus', 'floral_bloom', 'sweet_peach'],
        unlockedAccessories: ['bubble_crown'],
        equippedAccessory: 'bubble_crown',
        kaoriGauge: 100,
        equippedFashion: {
          head: 'head_duck_towel',
          outfit: 'royal_scent_robe',
          hand: 'hand_sponge_duck',
          accessory: 'bubble_crown',
          hair: 'hair_mens_wolf',
          gender: 'male',
          hairColor: '#1e293b',
        },
        unlockedFashionItemIds: unlockedFashion,
        gachaTickets: 3,
        activePartnerId: 'aoi',
        partnerAffectionMap: {
          ...DEFAULT_PARTNER_AFFECTION_MAP,
          aoi: {
            partnerId: 'aoi',
            intimacyPoints: 350,
            intimacyLevel: 4,
            unlockedDateEventIds: ['date_aoi_1', 'date_aoi_2'],
            completedDateEventIds: ['date_aoi_1'],
          },
        },
      });
      setLevelUpData({ oldLevel: 1, newLevel: 4 });
    } else if (scenario === 'skip') {
      setSimulationDay(4);
      setPreviewState((prev) => ({
        ...prev,
        kaoriGauge: 0,
        streak: 0,
      }));
    } else if (scenario === 'recovery') {
      setPreviewState((prev) => ({
        ...prev,
        kaoriGauge: 0,
        streak: 0,
      }));
      setTimeout(() => {
        setIsCleaningUp(true);
        setTimeout(() => setIsCleaningUp(false), 1600);
        setPreviewState((prev) => ({
          ...prev,
          kaoriGauge: 100,
          streak: 1,
          totalBaths: prev.totalBaths + 1,
        }));
        setSimulationDay((prev) => prev + 1);
      }, 500);
    }
  };

  // Auto-play timer for preview mode
  useEffect(() => {
    if (!isPreviewMode || !isPlaying) return;
    const delayMap: Record<PreviewSpeed, number> = {
      100: 1200,
      50: 2200,
      10: 4000,
      1: 8000,
    };
    const intervalTime = delayMap[previewSpeed];

    const timer = setInterval(() => {
      if (Math.random() < 0.75) {
        handlePreviewBath();
      } else {
        handlePreviewSkip();
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPreviewMode, isPlaying, previewSpeed]);

  // Rotate character dialogue on tap
  const handleCharacterTap = () => {
    setDialogueIndex((prev) => (prev + 1) % CHARACTER_DIALOGUES.length);
    setShowDialogueBubble(true);
  };

  // Get active scent object
  const activeScent =
    SCENTS_CATALOG.find((s) => s.id === displayedState.activeScentId) || SCENTS_CATALOG[0];

  // Get current daily mission
  const currentMission: DailyMission =
    MISSIONS_LIST.find((m) => m.id === displayedState.todayMissionId) || MISSIONS_LIST[0];

  // Kaori Status Information
  const kaoriStatus = getKaoriStatusInfo(displayedState.kaoriGauge ?? 100);

  // Step 1: User starts bath time
  const handleStartBath = () => {
    setCurrentScreen('bathtime');
  };

  // Step 2: User finishes bath -> Opens Camera
  const handleFinishBath = () => {
    setCurrentScreen('camera');
  };

  // Step 3: Photo verification via Gemini API
  const handleVerifyPhoto = async (imageBase64: string, mimeType: string) => {
    setCurrentScreen('verifying');

    try {
      const response = await fetch('/api/verify-mission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
          mimeType,
          missionId: currentMission.id,
          missionName: currentMission.name,
          targetKeyword: currentMission.targetKeyword,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error: ${response.status}`);
      }

      const result: VerificationResult = await response.json();
      setVerificationResult(result);
      setCurrentScreen('result');
    } catch (err: any) {
      console.error('Photo verification error:', err);
      setVerificationResult({
        isMatch: false,
        detectedObject: '解析エラー',
        confidence: 'low',
        comment: '通信が不安定だったようです。もう一度撮影を試してみてね！',
      });
      setCurrentScreen('result');
    }
  };

  // Step 4: Mission clear -> Pull Fashion Gacha
  const handleClaimReward = () => {
    const rankInfo = getGachaRank(displayedState.streak);
    const item = drawFashionItem(rankInfo);
    setDrawnFashionItem(item);
    setCurrentScreen('gacha');
  };

  // Preview Mode: Claim reward from Photo Test modal
  const handlePreviewClaimReward = (mission: DailyMission) => {
    const rankInfo = getGachaRank(previewState.streak);
    const item = drawFashionItem(rankInfo);
    setDrawnFashionItem(item);
    setShowPreviewPhotoTest(false);
    setCurrentScreen('gacha');
  };

  // Step 5: Gacha finished -> Apply Fashion item, EXP, Level Up, and Bath Romance Affection
  const handleFinishGacha = (equippedNow: boolean = false) => {
    if (!drawnFashionItem) return;

    const currentPartnerId = displayedState.activePartnerId || 'aoi';

    const updateState = (prev: UserGameState) => {
      const wasSmelly = (prev.kaoriGauge ?? 100) <= 40;
      if (wasSmelly) {
        setIsCleaningUp(true);
        setTimeout(() => setIsCleaningUp(false), 1400);
      }

      const oldLevel = prev.level;
      const gainedExp = currentMission.expReward;
      let newExp = prev.currentExp + gainedExp;
      let newLevel = oldLevel;

      while (newExp >= 100) {
        newExp -= 100;
        newLevel += 1;
      }

      const todayStr = getTodayDateString();
      const isNewDayBath = prev.lastBathDate !== todayStr;
      const newStreak = isNewDayBath ? prev.streak + 1 : prev.streak;
      const newTotalBaths = prev.totalBaths + 1;
      const newKaoriGauge = Math.min(100, (prev.kaoriGauge ?? 100) + 45);

      const unlockedFashionItemIds = Array.from(
        new Set([...(prev.unlockedFashionItemIds || []), drawnFashionItem.id])
      );

      let equippedFashion: EquippedFashion = {
        ...(prev.equippedFashion || DEFAULT_EQUIPPED_FASHION),
      };
      if (equippedNow) {
        if (drawnFashionItem.category === 'head') equippedFashion.head = drawnFashionItem.id;
        if (drawnFashionItem.category === 'outfit') equippedFashion.outfit = drawnFashionItem.id;
        if (drawnFashionItem.category === 'hand') equippedFashion.hand = drawnFashionItem.id;
        if (drawnFashionItem.category === 'accessory')
          equippedFashion.accessory = drawnFashionItem.id;
        if (drawnFashionItem.category === 'hair') equippedFashion.hair = drawnFashionItem.id;
      }

      let unlockedAccessories = [...prev.unlockedAccessories];
      let equippedAccessory = prev.equippedAccessory;
      let streakBonusUnlocked = false;

      if (newStreak >= 7 && !unlockedAccessories.includes('bubble_crown')) {
        unlockedAccessories.push('bubble_crown');
        equippedAccessory = 'bubble_crown';
        streakBonusUnlocked = true;
      }

      // Add Partner Affection (+100 Bath Bonus)
      const currentAff = prev.partnerAffectionMap?.[currentPartnerId] || {
        partnerId: currentPartnerId,
        intimacyPoints: 50,
        intimacyLevel: 1,
        unlockedDateEventIds: [],
        completedDateEventIds: [],
      };
      const newIntimacyPts = currentAff.intimacyPoints + 100;
      const newTier = calculateIntimacyLevel(newIntimacyPts);

      const updatedAffectionMap = {
        ...(prev.partnerAffectionMap || DEFAULT_PARTNER_AFFECTION_MAP),
        [currentPartnerId]: {
          ...currentAff,
          intimacyPoints: newIntimacyPts,
          intimacyLevel: newTier.level,
        },
      };

      if (newLevel > oldLevel) {
        setLevelUpData({ oldLevel, newLevel });
      } else if (streakBonusUnlocked) {
        setShowStreakBonus(true);
      }

      return {
        ...prev,
        level: newLevel,
        currentExp: newExp,
        totalBaths: newTotalBaths,
        streak: newStreak,
        lastBathDate: todayStr,
        todayCompleted: true,
        kaoriGauge: newKaoriGauge,
        unlockedFashionItemIds,
        equippedFashion,
        gachaTickets: Math.max(0, (prev.gachaTickets || 1) - 1),
        unlockedAccessories,
        equippedAccessory,
        partnerAffectionMap: updatedAffectionMap,
      };
    };

    if (isPreviewMode) {
      setPreviewState(updateState);
    } else {
      setGameState(updateState);
    }

    setCurrentScreen('home');
  };

  // ================= ROMANCE AFFECTION & DATING HANDLERS =================
  const handleAddAffection = (points: number, reason: string, partnerId?: string) => {
    const targetPartnerId = partnerId || displayedState.activePartnerId || 'aoi';

    const updater = (prev: UserGameState) => {
      const currentAff = prev.partnerAffectionMap?.[targetPartnerId] || {
        partnerId: targetPartnerId,
        intimacyPoints: 50,
        intimacyLevel: 1,
        unlockedDateEventIds: [],
        completedDateEventIds: [],
      };

      const newPts = currentAff.intimacyPoints + points;
      const tier = calculateIntimacyLevel(newPts);

      return {
        ...prev,
        partnerAffectionMap: {
          ...(prev.partnerAffectionMap || DEFAULT_PARTNER_AFFECTION_MAP),
          [targetPartnerId]: {
            ...currentAff,
            intimacyPoints: newPts,
            intimacyLevel: tier.level,
          },
        },
      };
    };

    if (isPreviewMode) {
      setPreviewState(updater);
    } else {
      setGameState(updater);
    }
  };

  const handleSwitchPartner = (partnerId: string) => {
    const updater = (prev: UserGameState) => ({
      ...prev,
      activePartnerId: partnerId,
    });
    if (isPreviewMode) {
      setPreviewState(updater);
    } else {
      setGameState(updater);
    }
  };

  const handleCompleteDate = (
    eventId: string,
    partnerId: string,
    affectionGained: number,
    rewardExp: number,
    rewardTickets: number
  ) => {
    const updater = (prev: UserGameState) => {
      const currentAff = prev.partnerAffectionMap?.[partnerId] || {
        partnerId,
        intimacyPoints: 50,
        intimacyLevel: 1,
        unlockedDateEventIds: [],
        completedDateEventIds: [],
      };

      const newPts = currentAff.intimacyPoints + affectionGained;
      const tier = calculateIntimacyLevel(newPts);
      const completedEvents = Array.from(
        new Set([...(currentAff.completedDateEventIds || []), eventId])
      );

      // Handle EXP gain
      const oldLevel = prev.level;
      let newExp = prev.currentExp + rewardExp;
      let newLevel = oldLevel;
      while (newExp >= 100) {
        newExp -= 100;
        newLevel += 1;
      }

      if (newLevel > oldLevel) {
        setLevelUpData({ oldLevel, newLevel });
      }

      return {
        ...prev,
        level: newLevel,
        currentExp: newExp,
        gachaTickets: (prev.gachaTickets || 0) + rewardTickets,
        partnerAffectionMap: {
          ...(prev.partnerAffectionMap || DEFAULT_PARTNER_AFFECTION_MAP),
          [partnerId]: {
            ...currentAff,
            intimacyPoints: newPts,
            intimacyLevel: tier.level,
            completedDateEventIds: completedEvents,
          },
        },
      };
    };

    if (isPreviewMode) {
      setPreviewState(updater);
    } else {
      setGameState(updater);
    }
  };

  // Equip / Unequip fashion item in wardrobe
  const handleEquipFashionItem = (category: ItemCategory, itemId: string | null) => {
    const updater = (prev: UserGameState) => {
      const currentEquipped = { ...(prev.equippedFashion || DEFAULT_EQUIPPED_FASHION) };
      currentEquipped[category] = itemId as any;
      return {
        ...prev,
        equippedFashion: currentEquipped,
      };
    };

    if (isPreviewMode) {
      setPreviewState(updater);
    } else {
      setGameState(updater);
    }
  };

  // Change hair color
  const handleChangeHairColor = (color: string) => {
    const updater = (prev: UserGameState) => {
      const currentEquipped = { ...(prev.equippedFashion || DEFAULT_EQUIPPED_FASHION) };
      currentEquipped.hairColor = color;
      return {
        ...prev,
        equippedFashion: currentEquipped,
      };
    };
    if (isPreviewMode) {
      setPreviewState(updater);
    } else {
      setGameState(updater);
    }
  };

  // Change avatar gender style (female or male) & auto-switch partner to opposite sex if needed
  const handleChangeGender = (gender: 'female' | 'male') => {
    const updater = (prev: UserGameState) => {
      const currentEquipped = { ...(prev.equippedFashion || DEFAULT_EQUIPPED_FASHION) };
      currentEquipped.gender = gender;

      // Adjust hairstyle defaults for gender
      if (
        gender === 'male' &&
        (!currentEquipped.hair || !currentEquipped.hair.startsWith('hair_mens_'))
      ) {
        currentEquipped.hair = 'hair_mens_short';
        currentEquipped.hairColor = '#1e293b';
      } else if (gender === 'female' && currentEquipped.hair?.startsWith('hair_mens_')) {
        currentEquipped.hair = 'hair_short_bob';
        currentEquipped.hairColor = '#451a03';
      }

      // Auto-suggest opposite sex partner
      let activePartnerId = prev.activePartnerId;
      if (gender === 'male' && (activePartnerId === 'ren' || activePartnerId === 'sota')) {
        activePartnerId = 'aoi';
      } else if (
        gender === 'female' &&
        (activePartnerId === 'aoi' || activePartnerId === 'shizuku')
      ) {
        activePartnerId = 'ren';
      }

      return {
        ...prev,
        equippedFashion: currentEquipped,
        activePartnerId,
      };
    };
    if (isPreviewMode) {
      setPreviewState(updater);
    } else {
      setGameState(updater);
    }
  };

  // Level Up modal closed
  const handleCloseLevelUp = () => {
    const wasStreakBonus =
      displayedState.streak >= 7 && displayedState.unlockedAccessories.includes('bubble_crown');
    setLevelUpData(null);
    if (wasStreakBonus && !showStreakBonus && displayedState.streak === 7) {
      setShowStreakBonus(true);
    }
  };

  // Select active scent
  const handleSelectActiveScent = (scentId: string) => {
    if (isPreviewMode) {
      setPreviewState((prev) => ({ ...prev, activeScentId: scentId }));
    } else {
      setGameState((prev) => ({ ...prev, activeScentId: scentId }));
    }
  };

  // Quick simulate level for easy demonstration/testing
  const handleQuickSimulateLevel = () => {
    const oldLevel = displayedState.level;
    const newLevel = oldLevel + 1;
    const pickedScent = getRandomScent();
    const rankInfo = getGachaRank(displayedState.streak + 1);
    const gachaItem = drawFashionItem(rankInfo);

    const updater = (prev: UserGameState) => ({
      ...prev,
      level: newLevel,
      currentExp: 0,
      totalBaths: prev.totalBaths + 1,
      streak: prev.streak + 1,
      kaoriGauge: Math.min(100, (prev.kaoriGauge ?? 100) + 30),
      activeScentId: pickedScent.id,
      collectedScentIds: Array.from(new Set([...prev.collectedScentIds, pickedScent.id])),
      unlockedFashionItemIds: Array.from(
        new Set([...(prev.unlockedFashionItemIds || []), gachaItem.id])
      ),
      gachaTickets: (prev.gachaTickets || 0) + 1,
    });

    if (isPreviewMode) {
      setPreviewState(updater);
    } else {
      setGameState(updater);
    }
    setLevelUpData({ oldLevel, newLevel });
  };

  // Reset regular data
  const handleResetData = () => {
    const today = getTodayDateString();
    const mission = getDailyMission(today);
    const resetState: UserGameState = {
      ...INITIAL_GAME_STATE,
      todayMissionId: mission.id,
      todayMissionDate: today,
    };
    setGameState(resetState);
    setCurrentScreen('home');
  };

  // Current evolution stage info
  const stageInfo = getEvolutionStage(displayedState.level);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex justify-center selection:bg-teal-100">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-gradient-to-b from-sky-50/70 via-white to-slate-50 min-h-screen flex flex-col justify-between shadow-2xl relative pb-24">
        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col p-4 sm:p-5 space-y-4 ${isPreviewMode ? 'pt-10' : ''}`}
        >
          {/* Header Bar */}
          <HeaderBar
            streak={displayedState.streak}
            hasAccessory={!!displayedState.equippedAccessory}
            isPreviewMode={isPreviewMode}
            onOpenPreview={handleOpenPreview}
            onResetData={handleResetData}
            onQuickSimulateLevel={handleQuickSimulateLevel}
            onOpenWardrobe={() => setActiveTab('wardrobe')}
          />

          {/* ================= TAB VIEWS ================= */}

          {/* 1. HOME VIEW */}
          {activeTab === 'home' && (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              {/* Human Avatar Mascot Card with Dress-up & Kaori Status */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-sky-100 shadow-sm flex flex-col items-center relative overflow-visible">
                {/* Active Scent Pill, Gender Switch & Kaori Gauge Badge */}
                <div className="w-full flex items-center justify-between mb-1 gap-2">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-xs border shrink-0"
                    style={{
                      backgroundColor: activeScent.auraColor,
                      borderColor: activeScent.accentColor,
                      color: '#0f172a',
                    }}
                  >
                    <span>{activeScent.icon}</span>
                    <span>{activeScent.name}</span>
                  </div>

                  {/* Quick Gender Switch Button */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 shadow-inner">
                    <button
                      type="button"
                      onClick={() => handleChangeGender('female')}
                      className={`px-2 py-0.5 rounded-full text-[11px] font-black transition-all cursor-pointer ${
                        displayedState.equippedFashion?.gender !== 'male' &&
                        displayedState.equippedFashion?.gender !== 'style_b'
                          ? 'bg-pink-500 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="女性スタイルに変更"
                    >
                      👩 女
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChangeGender('male')}
                      className={`px-2 py-0.5 rounded-full text-[11px] font-black transition-all cursor-pointer ${
                        displayedState.equippedFashion?.gender === 'male' ||
                        displayedState.equippedFashion?.gender === 'style_b'
                          ? 'bg-sky-500 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="男性スタイルに変更"
                    >
                      👨 男
                    </button>
                  </div>

                  {/* Kaori Status Badge */}
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1 border shadow-xs ${kaoriStatus.bgClass} ${kaoriStatus.colorClass} ${kaoriStatus.borderClass}`}
                  >
                    <span>{kaoriStatus.badgeLabel}</span>
                  </div>
                </div>

                {/* Human Avatar Canvas */}
                <div className="my-2 relative flex items-center justify-center">
                  <CharacterAvatar
                    level={displayedState.level}
                    activeScent={activeScent}
                    equippedAccessory={displayedState.equippedAccessory}
                    equippedFashion={displayedState.equippedFashion}
                    size="xl"
                    showDialogue={showDialogueBubble}
                    dialogueText={CHARACTER_DIALOGUES[dialogueIndex]}
                    kaoriGauge={displayedState.kaoriGauge ?? 100}
                    isCleaningUp={isCleaningUp}
                    onTap={handleCharacterTap}
                  />
                </div>

                {/* Level Title & Stage */}
                <div className="text-center mt-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl font-black text-slate-800 tracking-tight">KAORI</span>
                    <span className="text-sm font-black bg-gradient-to-r from-sky-500 to-teal-400 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                      Lv.{displayedState.level}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-sky-600">【{stageInfo.title}】</span>
                </div>

                {/* KAORI LEVEL Gauge (0〜100%) */}
                <div className="w-full max-w-xs mt-3 bg-slate-50/80 rounded-2xl p-2.5 border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-extrabold mb-1 px-1">
                    <span className="text-slate-600 flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-sky-500" />
                      KAORI LEVEL
                    </span>
                    <span className={`font-black ${kaoriStatus.colorClass}`}>
                      {displayedState.kaoriGauge ?? 100} / 100
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/80 rounded-full h-2.5 p-0.5 shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-500 shadow-xs ${
                        (displayedState.kaoriGauge ?? 100) >= 80
                          ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
                          : (displayedState.kaoriGauge ?? 100) >= 50
                          ? 'bg-gradient-to-r from-sky-400 to-teal-300'
                          : (displayedState.kaoriGauge ?? 100) >= 25
                          ? 'bg-gradient-to-r from-amber-400 to-orange-400'
                          : 'bg-gradient-to-r from-purple-400 to-slate-400'
                      }`}
                      style={{ width: `${Math.max(4, displayedState.kaoriGauge ?? 100)}%` }}
                    />
                  </div>

                  {/* Character EXP Bar */}
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mt-2 px-1">
                    <span>GROWTH EXP</span>
                    <span>
                      {displayedState.currentExp} / {displayedState.maxExp}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/80 rounded-full h-1.5 mt-0.5">
                    <div
                      className="bg-sky-400 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(displayedState.currentExp / displayedState.maxExp) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Romance Partner Hero Widget (Opposite-Sex Manga Character Interaction) */}
              <RomancePartnerCard
                partner={activePartner}
                affectionState={activeAffection}
                equippedFashion={displayedState.equippedFashion || DEFAULT_EQUIPPED_FASHION}
                kaoriGauge={displayedState.kaoriGauge ?? 100}
                onAddAffection={(pts, reason) => handleAddAffection(pts, reason, activePartner.id)}
                onOpenRomanceView={() => setActiveTab('romance')}
                onSwitchPartner={handleSwitchPartner}
              />

              {/* Future Evolution Preview Card */}
              <FutureEvolutionCard
                level={displayedState.level}
                currentExp={displayedState.currentExp}
                activeScent={activeScent}
                equippedFashion={displayedState.equippedFashion}
              />

              {/* Today's Photo Mission Card */}
              <DailyMissionCard
                mission={currentMission}
                isCompleted={displayedState.todayCompleted}
                streak={displayedState.streak}
                gachaRank={currentGachaRank}
                onStartMission={handleStartBath}
                onStartBath={handleStartBath}
              />

              {/* Big Main Action Button: 「お風呂に行く」 */}
              <div className="pt-1 pb-1">
                {displayedState.todayCompleted ? (
                  <div className="space-y-2">
                    <div className="w-full py-4 px-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-center text-sm shadow-xs flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span>本日の入浴ミッション達成！✨</span>
                    </div>

                    <button
                      onClick={() => setActiveTab('wardrobe')}
                      className="w-full py-3 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center gap-2 border border-indigo-200 transition-all cursor-pointer"
                    >
                      <Shirt className="w-4 h-4" />
                      <span>獲得した服でアバターを着せ替える</span>
                    </button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleStartBath}
                    className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-teal-400 to-pink-500 text-white font-black text-lg shadow-[0_8px_25px_rgba(14,165,233,0.35)] flex items-center justify-center gap-2.5 hover:shadow-[0_10px_30px_rgba(14,165,233,0.45)] transition-all cursor-pointer"
                  >
                    <Waves className="w-6 h-6 animate-pulse" />
                    <span>お風呂に行く（好感度＆服ガチャUP）</span>
                  </motion.button>
                )}
              </div>
            </div>
          )}

          {/* 2. ROMANCE & DATING VIEW */}
          {activeTab === 'romance' && (
            <RomanceView
              activePartnerId={displayedState.activePartnerId || 'aoi'}
              partnerAffectionMap={
                displayedState.partnerAffectionMap || DEFAULT_PARTNER_AFFECTION_MAP
              }
              equippedFashion={displayedState.equippedFashion || DEFAULT_EQUIPPED_FASHION}
              kaoriGauge={displayedState.kaoriGauge ?? 100}
              streak={displayedState.streak}
              level={displayedState.level}
              onSwitchPartner={handleSwitchPartner}
              onAddAffection={(pId, pts, reason) => handleAddAffection(pts, reason, pId)}
              onCompleteDate={handleCompleteDate}
              onBackToHome={() => setActiveTab('home')}
            />
          )}

          {/* 3. WARDROBE & COLLECTION VIEWS */}
          {(activeTab === 'wardrobe' || activeTab === 'collection') && (
            <CollectionView
              collectedScentIds={displayedState.collectedScentIds}
              activeScentId={displayedState.activeScentId}
              onSelectActiveScent={handleSelectActiveScent}
              unlockedFashionItemIds={displayedState.unlockedFashionItemIds || []}
              equippedFashion={displayedState.equippedFashion || DEFAULT_EQUIPPED_FASHION}
              onEquipFashionItem={handleEquipFashionItem}
              onChangeHairColor={handleChangeHairColor}
              onChangeGender={handleChangeGender}
              streak={displayedState.streak}
              level={displayedState.level}
              kaoriGauge={displayedState.kaoriGauge ?? 100}
            />
          )}
        </div>

        {/* Bottom Navigation (4 Tabs: Home, Romance, Wardrobe, Collection) */}
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unlockedFashionCount={(displayedState.unlockedFashionItemIds || []).length}
        />

        {/* ================= PREVIEW CONTROLLER OVERLAY ================= */}
        {isPreviewMode && (
          <PreviewController
            previewState={previewState}
            simulationDay={simulationDay}
            isPlaying={isPlaying}
            speed={previewSpeed}
            isCleaningUp={isCleaningUp}
            onBath={handlePreviewBath}
            onSkip={handlePreviewSkip}
            onAdvanceDays={handlePreviewAdvanceDays}
            onReset={handlePreviewReset}
            onTogglePlay={() => setIsPlaying((prev) => !prev)}
            onSetSpeed={setPreviewSpeed}
            onRunScenario={handlePreviewScenario}
            onExitPreview={handleExitPreview}
            onOpenPhotoTest={() => setShowPreviewPhotoTest(true)}
          />
        )}

        {/* ================= MODAL & FLOW OVERLAYS ================= */}

        {/* 0. Preview Photo Test Modal */}
        <AnimatePresence>
          {isPreviewMode && showPreviewPhotoTest && (
            <PreviewPhotoTestModal
              onClose={() => setShowPreviewPhotoTest(false)}
              onClaimReward={handlePreviewClaimReward}
              history={previewTestHistory}
              onAddHistory={(item) =>
                setPreviewTestHistory((prev) => [item, ...prev].slice(0, 10))
              }
            />
          )}
        </AnimatePresence>

        {/* 1. Bath Time In-Progress Screen */}
        <AnimatePresence>
          {currentScreen === 'bathtime' && (
            <BathTimeModal
              level={displayedState.level}
              activeScent={activeScent}
              mission={currentMission}
              equippedFashion={displayedState.equippedFashion}
              onFinishBath={handleFinishBath}
              onBack={() => setCurrentScreen('home')}
            />
          )}
        </AnimatePresence>

        {/* 2. Camera Upload Screen */}
        <AnimatePresence>
          {currentScreen === 'camera' && (
            <CameraUploadModal
              mission={currentMission}
              onVerifyPhoto={handleVerifyPhoto}
              onBack={() => setCurrentScreen('bathtime')}
            />
          )}
        </AnimatePresence>

        {/* 3. AI Verifying Overlay */}
        <AnimatePresence>
          {currentScreen === 'verifying' && (
            <VerifyingOverlay missionName={currentMission.name} />
          )}
        </AnimatePresence>

        {/* 4. Verification Result Screen */}
        <AnimatePresence>
          {currentScreen === 'result' && verificationResult && (
            <MissionResultModal
              mission={currentMission}
              result={verificationResult}
              gachaRank={currentGachaRank}
              streak={displayedState.streak}
              partner={activePartner}
              onClaimReward={handleClaimReward}
              onRetry={() => setCurrentScreen('camera')}
            />
          )}
        </AnimatePresence>

        {/* 5. Fashion Gacha Reveal Screen */}
        <AnimatePresence>
          {currentScreen === 'gacha' && drawnFashionItem && (
            <GachaModal
              drawnItem={drawnFashionItem}
              gachaRank={currentGachaRank}
              streak={displayedState.streak}
              onFinishGacha={(item, equipNow) => handleFinishGacha(equipNow)}
            />
          )}
        </AnimatePresence>

        {/* 6. Level Up & Evolution Celebration Modal */}
        <AnimatePresence>
          {levelUpData && (
            <LevelUpModal
              oldLevel={levelUpData.oldLevel}
              newLevel={levelUpData.newLevel}
              activeScent={activeScent}
              equippedFashion={displayedState.equippedFashion}
              onClose={handleCloseLevelUp}
            />
          )}
        </AnimatePresence>

        {/* 7. 7-Day Streak Special Bonus Crown Modal */}
        <AnimatePresence>
          {showStreakBonus && (
            <StreakBonusModal
              streak={displayedState.streak}
              onClose={() => setShowStreakBonus(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
