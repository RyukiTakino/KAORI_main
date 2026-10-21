import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  MessageCircle,
  Shirt,
  Flame,
  ChevronRight,
  RefreshCw,
  Gift,
  Smile,
  Zap,
} from 'lucide-react';
import {
  RomancePartner,
  PartnerAffectionState,
  EquippedFashion,
  FashionItem,
  PartnerExpression,
} from '../types';
import {
  calculateIntimacyLevel,
  calculateFashionCharm,
  ROMANCE_PARTNERS,
} from '../data/romanceData';
import { RomancePartnerAvatar } from './RomancePartnerAvatar';

interface RomancePartnerCardProps {
  partner: RomancePartner;
  affectionState: PartnerAffectionState;
  equippedFashion: EquippedFashion;
  kaoriGauge: number;
  onAddAffection: (points: number, reason: string) => void;
  onOpenRomanceView: () => void;
  onOpenDateModal?: () => void;
  onSwitchPartner: (partnerId: string) => void;
  isAvailableDate?: boolean;
}

export const RomancePartnerCard: React.FC<RomancePartnerCardProps> = ({
  partner,
  affectionState,
  equippedFashion,
  kaoriGauge,
  onAddAffection,
  onOpenRomanceView,
  onOpenDateModal,
  onSwitchPartner,
  isAvailableDate = false,
}) => {
  const [currentDialogue, setCurrentDialogue] = useState<string>(
    partner.dialogues.greeting[0]
  );
  const [currentExpression, setCurrentExpression] = useState<PartnerExpression>('normal');
  const [tapHearts, setTapHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [recentPraiseItem, setRecentPraiseItem] = useState<string | null>(null);

  const isStinky = kaoriGauge < 25;
  const isUltraClean = kaoriGauge >= 80;

  const intimacy = calculateIntimacyLevel(affectionState.intimacyPoints);
  const charm = calculateFashionCharm(equippedFashion);

  // Trigger floating heart burst
  const spawnHeartBurst = (count: number = 3) => {
    const newHearts = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: (Math.random() - 0.5) * 60,
      y: -30 - Math.random() * 30,
    }));
    setTapHearts((prev) => [...prev.slice(-6), ...newHearts]);
  };

  // 1. Talk Action
  const handleTalk = () => {
    if (isStinky) {
      const stinkyList = partner.dialogues.stinkyReaction;
      const text = stinkyList[Math.floor(Math.random() * stinkyList.length)];
      setCurrentDialogue(text);
      setCurrentExpression('shocked');
      return;
    }

    let dialoguePool = [...partner.dialogues.greeting];
    if (isUltraClean) {
      dialoguePool = [...dialoguePool, ...partner.dialogues.freshBathReaction];
    }
    const chosen = dialoguePool[Math.floor(Math.random() * dialoguePool.length)];
    setCurrentDialogue(chosen);
    setCurrentExpression(isUltraClean ? 'loving' : 'happy');

    // Add intimacy with fashion charm bonus
    const basePts = 10;
    const totalPts = Math.round(basePts * charm.bonusAffectionMultiplier);
    onAddAffection(totalPts, 'おしゃべり');
    spawnHeartBurst(2);
  };

  // 2. Praise Fashion Action (High rarity items give special romantic praise!)
  const handlePraiseFashion = () => {
    if (isStinky) {
      setCurrentDialogue('服もお洒落だけど…まずはお風呂入ってキレイになってきて…？待ってるから…！');
      setCurrentExpression('pout');
      return;
    }

    const equippedIds = [
      equippedFashion.head,
      equippedFashion.outfit,
      equippedFashion.accessory,
      equippedFashion.hand,
      equippedFashion.hair,
    ].filter(Boolean) as string[];

    let specialPraise: string | null = null;
    let foundItemId: string | null = null;

    for (const id of equippedIds) {
      if (partner.dialogues.highRarityFashionPraise[id]) {
        specialPraise = partner.dialogues.highRarityFashionPraise[id];
        foundItemId = id;
        break;
      }
    }

    if (specialPraise) {
      setCurrentDialogue(specialPraise);
      setRecentPraiseItem(foundItemId);
      setCurrentExpression('loving');
    } else {
      const generalList = partner.dialogues.generalFashionPraise;
      const chosen = generalList[Math.floor(Math.random() * generalList.length)];
      setCurrentDialogue(chosen);
      setCurrentExpression('happy');
    }

    // High fashion charm gives big heart points
    const basePts = 20;
    const totalPts = Math.round(basePts * charm.bonusAffectionMultiplier);
    onAddAffection(totalPts, 'ファッション褒め');
    spawnHeartBurst(4);
  };

  // 3. Touch / Skinship Action
  const handleSkinship = () => {
    if (isStinky) {
      setCurrentDialogue('きゃっ…！ちょっと待って！今汗っぽいから、お風呂入ってから触れて…！///');
      setCurrentExpression('shocked');
      return;
    }

    const isHead = Math.random() > 0.5;
    const pool = isHead
      ? partner.dialogues.touchHeadReaction
      : partner.dialogues.touchBodyReaction;
    const chosen = pool[Math.floor(Math.random() * pool.length)];

    setCurrentDialogue(chosen);
    setCurrentExpression('blushing');

    const basePts = 15;
    const totalPts = Math.round(basePts * charm.bonusAffectionMultiplier);
    onAddAffection(totalPts, 'スキンシップ');
    spawnHeartBurst(3);
  };

  // Quick switch to other partner
  const handleNextPartner = () => {
    const currentIndex = ROMANCE_PARTNERS.findIndex((p) => p.id === partner.id);
    const nextIndex = (currentIndex + 1) % ROMANCE_PARTNERS.length;
    onSwitchPartner(ROMANCE_PARTNERS[nextIndex].id);
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-pink-200/80 shadow-md relative overflow-hidden">
      {/* Background Romantic Ambient Glow */}
      <div
        className="absolute -top-10 -right-10 w-44 h-44 rounded-full filter blur-2xl opacity-30 pointer-events-none"
        style={{ backgroundColor: partner.accentColor }}
      />

      {/* Top Bar: Partner Name, Title & Switcher */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white text-sm shadow-xs font-black">
            {partner.gender === 'female' ? '👩' : '👨'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-slate-800">{partner.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-black border border-pink-200">
                {partner.title}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium line-clamp-1">
              {partner.age} • 好み: {partner.favoriteScentCategory}の香り
            </p>
          </div>
        </div>

        {/* Switch Partner Button */}
        <button
          type="button"
          onClick={handleNextPartner}
          className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-pink-50 text-slate-600 hover:text-pink-600 border border-slate-200 text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer"
          title="別のキャラクターに交代"
        >
          <RefreshCw className="w-3 h-3" />
          <span>交代</span>
        </button>
      </div>

      {/* Affection / Heart Level Bar */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-2.5 border border-pink-100 mb-4 relative z-10">
        <div className="flex items-center justify-between text-xs mb-1">
          <div className="flex items-center gap-1 font-black text-pink-700">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
            <span>好感度 Lv.{intimacy.level}</span>
            <span className="text-[11px] text-pink-600 font-bold">({intimacy.title})</span>
          </div>
          <span className="text-[11px] font-black text-pink-600">
            {affectionState.intimacyPoints} pt
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full bg-white rounded-full h-2.5 overflow-hidden border border-pink-200 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${intimacy.progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500"
          />
        </div>

        {/* Fashion Charm Bonus Multiplier Badge */}
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1 text-slate-700 font-bold">
            <Shirt className="w-3.5 h-3.5 text-indigo-500" />
            <span>お洒落度:</span>
            <span className="text-indigo-600 font-black">{charm.praisePillText}</span>
          </div>
          <span className="font-black text-rose-500 bg-white px-2 py-0.5 rounded-full border border-pink-200 shadow-2xs">
            好感度 x{charm.bonusAffectionMultiplier.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Center Stage: Partner Avatar with Manga Dialogue Bubble */}
      <div className="relative flex flex-col items-center justify-center my-1 z-10">
        {/* Dialogue Bubble */}
        <motion.div
          key={currentDialogue}
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-[280px] w-full px-3.5 py-2.5 rounded-2xl bg-white border border-pink-200 shadow-sm text-xs text-slate-800 font-bold text-center mb-1"
        >
          <p className="leading-relaxed">「{currentDialogue}」</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-pink-200 rotate-45" />
        </motion.div>

        {/* Tap Hearts Animation */}
        {tapHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: h.y, scale: 1.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute text-pink-500 pointer-events-none z-30 flex items-center gap-0.5"
            style={{ transform: `translateX(${h.x}px)` }}
          >
            <Heart className="w-4 h-4 fill-pink-500" />
          </motion.div>
        ))}

        {/* Partner Interactive Avatar */}
        <div
          onClick={handleSkinship}
          className="cursor-pointer hover:scale-102 active:scale-98 transition-transform"
          title="タップでスキンシップ！"
        >
          <RomancePartnerAvatar
            partner={partner}
            expression={currentExpression}
            size="lg"
            isStinkyPlayer={isStinky}
          />
        </div>

        <p className="text-[10px] text-pink-500 font-bold -mt-2">
          タップでスキンシップ♡ (好感度UP)
        </p>
      </div>

      {/* Action Buttons Grid (Talk / Fashion Praise / Date) */}
      <div className="grid grid-cols-3 gap-2 mt-4 relative z-10">
        {/* 1. Talk */}
        <button
          type="button"
          onClick={handleTalk}
          className="py-2 px-2 rounded-2xl bg-gradient-to-b from-sky-50 to-sky-100 hover:from-sky-100 hover:to-sky-200 border border-sky-200 text-sky-800 font-black text-xs shadow-2xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-sky-600" />
          <span>おしゃべり</span>
        </button>

        {/* 2. Praise Fashion */}
        <button
          type="button"
          onClick={handlePraiseFashion}
          className="py-2 px-2 rounded-2xl bg-gradient-to-b from-purple-50 to-pink-100 hover:from-purple-100 hover:to-pink-200 border border-pink-200 text-pink-800 font-black text-xs shadow-2xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer relative"
        >
          {charm.charmRank !== 'N' && (
            <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-full bg-pink-500 text-white text-[9px] font-black animate-pulse">
              {charm.charmRank}
            </span>
          )}
          <Sparkles className="w-4 h-4 text-pink-600" />
          <span>服を褒めて</span>
        </button>

        {/* 3. Go to Romance Hub / Date */}
        <button
          type="button"
          onClick={onOpenRomanceView}
          className="py-2 px-2 rounded-2xl bg-gradient-to-b from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-xs shadow-sm shadow-pink-500/30 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer relative"
        >
          {isAvailableDate && (
            <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 text-[9px] font-black animate-bounce">
              デート可!
            </span>
          )}
          <Heart className="w-4 h-4 fill-white text-white" />
          <span>恋愛・デート</span>
        </button>
      </div>
    </div>
  );
};
