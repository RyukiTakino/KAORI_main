import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, ArrowRight, Star } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';
import { KaoriScent, EquippedFashion } from '../types';
import { getEvolutionStage } from '../data/gameData';

interface LevelUpModalProps {
  oldLevel: number;
  newLevel: number;
  activeScent: KaoriScent;
  equippedFashion?: EquippedFashion;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  oldLevel,
  newLevel,
  activeScent,
  equippedFashion,
  onClose,
}) => {
  const oldStage = getEvolutionStage(oldLevel);
  const newStage = getEvolutionStage(newLevel);
  const isEvolved = newStage.stage > oldStage.stage;

  useEffect(() => {
    confetti({
      particleCount: isEvolved ? 150 : 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#38bdf8', '#f472b6', '#facc15', '#a855f7', '#34d399'],
    });
  }, [isEvolved]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85 }}
        className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border-2 border-amber-200 text-center relative overflow-hidden"
      >
        {/* Glowing Background Radial */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-amber-100/60 filter blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 mb-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-widest text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full uppercase border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            CONGRATULATIONS
          </span>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight mt-1">
            {isEvolved ? '✨ EVOLUTION! ✨' : 'LEVEL UP!'}
          </h2>
        </div>

        {/* Center Character View */}
        <div className="my-3 py-2 flex flex-col items-center justify-center">
          <div className="w-40 h-40 relative flex items-center justify-center">
            <CharacterAvatar
              level={newLevel}
              activeScent={activeScent}
              equippedFashion={equippedFashion}
              size="lg"
            />
          </div>

          {/* Level Transition Pill */}
          <div className="mt-2 flex items-center gap-3 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 shadow-inner">
            <span className="text-sm font-extrabold text-slate-400">Lv.{oldLevel}</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
            <span className="text-lg font-black text-amber-600">Lv.{newLevel}</span>
          </div>
        </div>

        {/* Evolution or Growth Description */}
        {isEvolved ? (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3.5 mb-4 text-left">
            <div className="flex items-center gap-1.5 text-amber-800 font-extrabold text-xs mb-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>「{newStage.title}」へ進化したよ！</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {newStage.description}
            </p>
          </div>
        ) : (
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3 mb-4">
            <p className="text-xs font-bold text-sky-800">
              香りのパワーがアップ！次の進化へ一歩近づいたよ♪
            </p>
          </div>
        )}

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 text-white font-black text-base shadow-lg shadow-amber-400/30 flex items-center justify-center gap-2 transition-all"
        >
          <span>やったね！</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
