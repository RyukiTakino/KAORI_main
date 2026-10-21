import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Flame, Crown, Sparkles, Check } from 'lucide-react';

interface StreakBonusModalProps {
  streak: number;
  onClose: () => void;
}

export const StreakBonusModal: React.FC<StreakBonusModalProps> = ({ streak, onClose }) => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#facc15', '#f472b6', '#a855f7'],
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85 }}
        className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border-2 border-orange-200 text-center relative overflow-hidden"
      >
        {/* Header */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-widest text-orange-700 bg-orange-100 px-3 py-0.5 rounded-full uppercase border border-orange-200">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            {streak} DAYS STREAK!
          </span>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mt-1.5">
            SPECIAL ITEM GET!
          </h2>
        </div>

        {/* Crown Showcase */}
        <div className="my-4 py-4 px-3 bg-gradient-to-b from-sky-50 to-indigo-50/60 rounded-2xl border border-sky-100 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-4xl mb-2 border border-sky-200 animate-bounce">
            👑
          </div>
          <h3 className="text-lg font-black text-slate-800">
            「泡の王冠」
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-[220px]">
            7日連続でお風呂に入った証！キャラクターの頭にキラキラ輝く泡の王冠が装着されました✨
          </p>
        </div>

        <p className="text-xs text-emerald-600 font-bold mb-4">
          毎日お風呂に入る習慣がしっかり身についています！素晴らしい！
        </p>

        {/* Confirm Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-white font-black text-base shadow-lg shadow-orange-400/30 flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          <span>受け取る！</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
