import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  Calendar,
  Gift,
  Lock,
  ChevronRight,
  Shirt,
  MessageCircle,
  Award,
  Crown,
  Play,
  RotateCcw,
} from 'lucide-react';
import {
  RomancePartner,
  PartnerAffectionState,
  RomanceDateEvent,
  EquippedFashion,
  UserGameState,
} from '../types';
import {
  ROMANCE_PARTNERS,
  ROMANCE_DATE_EVENTS,
  calculateIntimacyLevel,
  calculateFashionCharm,
  getPartner,
} from '../data/romanceData';
import { RomancePartnerAvatar } from './RomancePartnerAvatar';
import { RomanceDatingModal } from './RomanceDatingModal';

interface RomanceViewProps {
  activePartnerId: string;
  partnerAffectionMap: { [partnerId: string]: PartnerAffectionState };
  equippedFashion: EquippedFashion;
  kaoriGauge: number;
  streak: number;
  level: number;
  onSwitchPartner: (partnerId: string) => void;
  onAddAffection: (partnerId: string, points: number, reason: string) => void;
  onCompleteDate: (
    eventId: string,
    partnerId: string,
    affectionGained: number,
    rewardExp: number,
    rewardTickets: number
  ) => void;
  onBackToHome: () => void;
}

export const RomanceView: React.FC<RomanceViewProps> = ({
  activePartnerId,
  partnerAffectionMap,
  equippedFashion,
  kaoriGauge,
  streak,
  level,
  onSwitchPartner,
  onAddAffection,
  onCompleteDate,
  onBackToHome,
}) => {
  const activePartner = getPartner(activePartnerId);
  const activeAffection =
    partnerAffectionMap[activePartnerId] || {
      partnerId: activePartnerId,
      intimacyPoints: 50,
      intimacyLevel: 1,
      unlockedDateEventIds: [],
      completedDateEventIds: [],
    };

  const [selectedDateEvent, setSelectedDateEvent] = useState<RomanceDateEvent | null>(null);
  const [partnerDialogue, setPartnerDialogue] = useState<string>(activePartner.dialogues.greeting[0]);
  const [dialogueType, setDialogueType] = useState<'normal' | 'loving' | 'confession'>('normal');

  const intimacy = calculateIntimacyLevel(activeAffection.intimacyPoints);
  const charm = calculateFashionCharm(equippedFashion);
  const isStinky = kaoriGauge < 25;
  const isMaxIntimacy = intimacy.level >= 5;

  // Filter dates for current partner
  const partnerDateEvents = ROMANCE_DATE_EVENTS.filter((e) => e.partnerId === activePartner.id);

  // Trigger interactive chat in Romance view
  const handlePartnerChat = () => {
    if (isStinky) {
      setPartnerDialogue('うぅ…汗っぽいよ…早くお風呂でキレイになってきて…？待ってるから…！');
      setDialogueType('normal');
      return;
    }

    if (isMaxIntimacy) {
      setPartnerDialogue(activePartner.dialogues.confession);
      setDialogueType('confession');
      onAddAffection(activePartner.id, Math.round(25 * charm.bonusAffectionMultiplier), '最愛トーク');
      return;
    }

    const pool = [
      ...activePartner.dialogues.greeting,
      ...activePartner.dialogues.freshBathReaction,
      ...activePartner.dialogues.intimacyLevelUp,
    ];
    const text = pool[Math.floor(Math.random() * pool.length)];
    setPartnerDialogue(text);
    setDialogueType('loving');

    onAddAffection(activePartner.id, Math.round(15 * charm.bonusAffectionMultiplier), '親密トーク');
  };

  return (
    <div className="w-full max-w-lg mx-auto pb-24 px-4 pt-4 space-y-5">
      {/* Date Simulation Modal */}
      {selectedDateEvent && (
        <RomanceDatingModal
          event={selectedDateEvent}
          partner={activePartner}
          onClose={() => setSelectedDateEvent(null)}
          onComplete={(affectionGained, rewardExp, rewardTickets) => {
            onCompleteDate(
              selectedDateEvent.id,
              activePartner.id,
              affectionGained,
              rewardExp,
              rewardTickets
            );
            setSelectedDateEvent(null);
          }}
        />
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-3xl p-5 text-white shadow-lg shadow-pink-500/20 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 text-7xl opacity-20 select-none">
          💖
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-black mb-2 border border-white/30">
            <span>🌹</span>
            <span>お風呂×恋愛シミュレーション</span>
          </div>
          <h2 className="text-xl font-black tracking-tight">運命のパートナー & デート</h2>
          <p className="text-xs text-pink-100 mt-1 font-medium leading-relaxed">
            毎日お風呂に入ると清潔感と魅力がアップ！異性からの好感度が急上昇し、甘いデートイベントが解禁されます♡
          </p>
        </div>
      </div>

      {/* Partner Switcher Tabs */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-3 border border-pink-100 shadow-sm">
        <div className="text-[11px] font-black text-slate-500 mb-2 px-1 flex items-center justify-between">
          <span>キャラクター選択</span>
          <span className="text-[10px] text-pink-600 font-bold">
            好感度Lv・思い出は個別保存
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {ROMANCE_PARTNERS.map((p) => {
            const isSelected = p.id === activePartner.id;
            const aff = partnerAffectionMap[p.id]?.intimacyPoints || 0;
            const affTier = calculateIntimacyLevel(aff);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onSwitchPartner(p.id);
                  setPartnerDialogue(p.dialogues.greeting[0]);
                  setDialogueType('normal');
                }}
                className={`flex flex-col items-center p-2 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-pink-50 to-rose-100 border-pink-400 shadow-sm scale-102'
                    : 'bg-slate-50 border-slate-200 hover:bg-pink-50/50 text-slate-600'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-xs border border-pink-100 mb-1">
                  {p.gender === 'female' ? '👩' : '👨'}
                </div>
                <span className="text-[11px] font-black line-clamp-1">{p.name.split(' ')[1]}</span>
                <span className="text-[9px] text-pink-600 font-bold flex items-center gap-0.5 mt-0.5">
                  <Heart className="w-2.5 h-2.5 fill-pink-500" />
                  Lv.{affTier.level}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Partner Hero Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-pink-200 shadow-md relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full filter blur-2xl opacity-25 pointer-events-none"
          style={{ backgroundColor: activePartner.accentColor }}
        />

        {/* Profile Header */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-800">{activePartner.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-black border border-pink-200">
                {activePartner.title}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {activePartner.age} • {activePartner.personality}
            </p>
          </div>
        </div>

        {/* Heart Level & Progress */}
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-3 border border-pink-100 mb-4 relative z-10">
          <div className="flex items-center justify-between text-xs font-black mb-1.5">
            <div className="flex items-center gap-1.5 text-pink-700">
              <span className="text-base">{intimacy.icon}</span>
              <span>好感度 Lv.{intimacy.level}</span>
              <span className="text-pink-600 font-bold">({intimacy.title})</span>
            </div>
            <span className="text-pink-600 font-black">
              {activeAffection.intimacyPoints} / {intimacy.nextThreshold} pt
            </span>
          </div>

          <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-pink-200 p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${intimacy.progressPercent}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500"
            />
          </div>

          {/* Fashion Charm Bonus & Bath Multiplier */}
          <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-white/90 p-2 rounded-xl border border-pink-100 flex items-center justify-between">
              <span className="text-slate-600 font-bold flex items-center gap-1">
                <Shirt className="w-3.5 h-3.5 text-indigo-500" />
                衣装ボーナス
              </span>
              <span className="font-black text-rose-500">
                x{charm.bonusAffectionMultiplier.toFixed(1)}
              </span>
            </div>
            <div className="bg-white/90 p-2 rounded-xl border border-pink-100 flex items-center justify-between">
              <span className="text-slate-600 font-bold flex items-center gap-1">
                <span>🫧</span>
                入浴ボーナス
              </span>
              <span className="font-black text-teal-600">+100pt/回</span>
            </div>
          </div>
        </div>

        {/* Partner Manga Portrait & Dialogue */}
        <div className="flex flex-col items-center justify-center my-2 relative z-10">
          <motion.div
            key={partnerDialogue}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-sm px-4 py-3 rounded-2xl border text-xs font-bold text-center mb-2 shadow-sm ${
              dialogueType === 'confession'
                ? 'bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 border-pink-300 text-pink-950'
                : 'bg-white border-pink-200 text-slate-800'
            }`}
          >
            <p className="leading-relaxed">「{partnerDialogue}」</p>
          </motion.div>

          <RomancePartnerAvatar
            partner={activePartner}
            expression={dialogueType === 'confession' ? 'loving' : isStinky ? 'shocked' : 'blushing'}
            size="xl"
            isStinkyPlayer={isStinky}
          />

          <button
            type="button"
            onClick={handlePartnerChat}
            className="mt-3 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-black text-xs shadow-md shadow-pink-500/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{activePartner.name}と甘いトークをする♡</span>
          </button>
        </div>
      </div>

      {/* Dating Events & Memories List */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 border border-pink-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h3 className="text-sm font-black text-slate-800">
              {activePartner.name}とのデートメモリー
            </h3>
          </div>
          <span className="text-[11px] text-pink-600 font-bold">
            好感度アップで解禁
          </span>
        </div>

        <div className="space-y-3">
          {partnerDateEvents.map((evt) => {
            const isUnlocked = intimacy.level >= evt.requiredIntimacyLevel;
            const isCompleted = activeAffection.completedDateEventIds?.includes(evt.id);

            return (
              <div
                key={evt.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-pink-50/70 to-rose-50/70 border-pink-200 hover:border-pink-300'
                    : 'bg-slate-50 border-slate-200 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-xs border border-pink-100 shrink-0">
                      {evt.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs font-black text-slate-800">{evt.title}</h4>
                        {isCompleted && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-700 font-black border border-emerald-200">
                            クリア済
                          </span>
                        )}
                        {!isUnlocked && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-200 text-slate-700 font-black flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            好感度 Lv.{evt.requiredIntimacyLevel}で解禁
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
                        {evt.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-pink-600 font-bold">
                        <span>📍 {evt.location}</span>
                        <span>•</span>
                        <span>報酬: {evt.rewardExp} EXP / ガチャ券 {evt.rewardTickets}枚</span>
                      </div>
                    </div>
                  </div>

                  {/* Play Date Button */}
                  {isUnlocked && (
                    <button
                      type="button"
                      onClick={() => setSelectedDateEvent(evt)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black shadow-xs hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>{isCompleted ? '再デート' : 'デートへ'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
