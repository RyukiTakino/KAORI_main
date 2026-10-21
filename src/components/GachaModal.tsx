import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Gift, ArrowRight, Award, Check, Shirt, Flame, Crown, Star } from 'lucide-react';
import { FashionItem, KaoriScent, GachaRankInfo, ItemRarity } from '../types';
import { SCENTS_CATALOG, getGachaRank } from '../data/gameData';

interface GachaModalProps {
  item?: FashionItem;
  drawnItem?: FashionItem;
  scent?: KaoriScent;
  gachaRank?: GachaRankInfo;
  streak?: number;
  onFinishGacha: (item: FashionItem, equipImmediately: boolean) => void;
}

export const GachaModal: React.FC<GachaModalProps> = ({
  item,
  drawnItem,
  scent,
  gachaRank,
  streak = 1,
  onFinishGacha,
}) => {
  const actualItem = drawnItem || item;
  const safeRank = gachaRank || getGachaRank(streak || 1);
  const safeScent = scent || SCENTS_CATALOG[0];

  const [phase, setPhase] = useState<'searching' | 'opening' | 'revealed'>('searching');
  const [equipNow, setEquipNow] = useState(true);

  useEffect(() => {
    // 1. Searching phase -> 2. Opening phase
    const timer1 = setTimeout(() => {
      setPhase('opening');
    }, 1600);

    // 2. Opening -> 3. Revealed
    const timer2 = setTimeout(() => {
      setPhase('revealed');
      // Fire confetti burst!
      const particleMultiplier = actualItem?.rarity === 'UR' ? 140 : actualItem?.rarity === 'SR' ? 100 : actualItem?.rarity === 'R' ? 70 : 40;
      confetti({
        particleCount: particleMultiplier,
        spread: 80,
        origin: { y: 0.6 },
        colors: [actualItem?.accentColor || '#38bdf8', '#38bdf8', '#f472b6', '#facc15', '#a855f7', '#ffffff'],
      });
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [actualItem]);

  const getRarityBadge = (rarity: ItemRarity, stars: number) => {
    switch (rarity) {
      case 'UR':
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="inline-flex items-center gap-1 text-xs font-black px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white shadow-lg border border-white uppercase tracking-widest animate-pulse">
              <Crown className="w-3.5 h-3.5 fill-white" />
              ULTRA RARE [UR]
            </span>
            <div className="flex text-amber-400 gap-0.5">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        );
      case 'SR':
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="inline-flex items-center gap-1 text-xs font-black px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-amber-950 shadow-md border border-amber-200 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 fill-amber-950" />
              SUPER RARE [SR]
            </span>
            <div className="flex text-amber-400 gap-0.5">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        );
      case 'R':
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="inline-flex items-center gap-1 text-xs font-black px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md border border-purple-200 uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              RARE [R]
            </span>
            <div className="flex text-amber-400 gap-0.5">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        );
      case 'N':
      default:
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">
              NORMAL [N]
            </span>
            <div className="flex text-amber-400 gap-0.5">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        );
    }
  };

  const getCategoryLabel = (category: FashionItem['category']) => {
    switch (category) {
      case 'head':
        return '👒 帽子・ヘアアクセ';
      case 'outfit':
        return '👗 服・バスローブ';
      case 'hand':
        return '🪄 お風呂アイテム';
      case 'accessory':
        return '👓 フェイス・チーク';
      case 'hair':
        return '💇 ヘアスタイル';
      default:
        return '✨ ファッション';
    }
  };

  if (!actualItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        {/* Top Gacha Rank Notification */}
        <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-white/20 text-white text-xs font-black shadow-lg">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>連続入浴 {streak}日目</span>
          <span className="opacity-40">|</span>
          <span className={`px-2 py-0.2 rounded-md text-[10px] ${safeRank.badgeClass}`}>
            {safeRank.name}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'searching' && (
            <motion.div
              key="searching"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center p-6 text-white"
            >
              <div className="relative w-36 h-36 flex items-center justify-center mb-5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-sky-300/40"
                />
                <motion.div
                  animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-300 to-pink-300 filter blur-sm"
                />
                <div className="absolute text-5xl animate-bounce">🎁</div>
              </div>

              <h3 className="text-xl font-black text-white drop-shadow-md">
                {safeRank.name}を回しています…
              </h3>
              <p className="text-xs text-sky-200 mt-2 font-medium">
                湯気のカプセルから新しいファッションアイテムが出現！
              </p>
            </motion.div>
          )}

          {phase === 'opening' && (
            <motion.div
              key="opening"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex flex-col items-center justify-center p-6 text-white"
            >
              <motion.div
                animate={{
                  rotate: [-8, 8, -8, 8, -12, 12, 0],
                  scale: [1, 1.1, 1.15, 1.2, 1.3],
                }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className={`relative w-36 h-36 rounded-full bg-gradient-to-tr ${safeRank.capsuleColor} flex items-center justify-center ${safeRank.glowClass} border-4 border-white/90 mb-5`}
              >
                <span className="text-5xl animate-spin">✨</span>
              </motion.div>

              <h3 className="text-2xl font-black text-yellow-300 drop-shadow-lg animate-pulse">
                カプセルが開くよ…！✨
              </h3>
            </motion.div>
          )}

          {phase === 'revealed' && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 18, stiffness: 200 }}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-white/80 overflow-hidden relative text-left"
            >
              {/* Header */}
              <div className="text-center mb-2">
                <span className="text-[10px] font-black tracking-widest text-indigo-600 bg-indigo-50 px-3 py-0.5 rounded-full border border-indigo-100 uppercase">
                  FASHION GACHA REWARD
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-1">
                  NEW FASHION GET!
                </h2>
              </div>

              {/* Rarity & Star Badge */}
              <div className="my-2.5 flex justify-center">
                {getRarityBadge(actualItem.rarity, actualItem.starLevel)}
              </div>

              {/* Fashion Visual Card */}
              <div
                className="my-3 p-4 rounded-2xl relative overflow-hidden border shadow-inner flex flex-col items-center text-center"
                style={{
                  backgroundColor: `${actualItem.colorTheme}40`,
                  borderColor: actualItem.accentColor,
                }}
              >
                {/* Category Pill */}
                <span className="text-[10px] font-bold text-slate-600 bg-white/90 px-2.5 py-0.5 rounded-full mb-2 border border-slate-200 shadow-xs">
                  {getCategoryLabel(actualItem.category)}
                </span>

                {/* Large Item Icon */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-18 h-18 rounded-2xl bg-white/95 shadow-md flex items-center justify-center text-4xl mb-2.5 border border-white"
                >
                  {actualItem.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-extrabold text-slate-800">
                  {actualItem.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-1 leading-snug max-w-[240px]">
                  {actualItem.description}
                </p>

                {/* Flavor Text */}
                <p className="text-[11px] text-slate-500 mt-2 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-white/60">
                  「{actualItem.flavorText}」
                </p>
              </div>

              {/* Fragrance & EXP Bonus info */}
              <div className="bg-sky-50 border border-sky-100 rounded-xl py-2 px-3 mb-3 flex items-center justify-between text-xs text-sky-800 font-bold">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <span>EXP +100 獲得！</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-pink-600 font-extrabold">
                  <span>{safeScent.icon}</span>
                  <span>{safeScent.japaneseName}の香り</span>
                </div>
              </div>

              {/* Equip Immediately Checkbox */}
              <button
                type="button"
                onClick={() => setEquipNow(!equipNow)}
                className="w-full flex items-center justify-between p-2.5 mb-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors text-xs font-bold text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-indigo-600" />
                  <span>アバターに今すぐ着替える</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                    equipNow
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white border-slate-300 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Main CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFinishGacha(actualItem, equipNow)}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 text-white font-black text-base shadow-[0_6px_20px_rgba(14,165,233,0.35)] flex items-center justify-center gap-2 hover:shadow-[0_8px_25px_rgba(14,165,233,0.45)] transition-all cursor-pointer"
              >
                <span>{equipNow ? '着替えてホームへ戻る' : 'クローゼットに保存してホームへ'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
