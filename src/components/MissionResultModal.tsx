import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle, XCircle, Gift, RotateCcw, Flame, Heart } from 'lucide-react';
import { VerificationResult, DailyMission, GachaRankInfo, RomancePartner } from '../types';

interface MissionResultModalProps {
  mission: DailyMission;
  result: VerificationResult;
  gachaRank: GachaRankInfo;
  streak: number;
  partner?: RomancePartner;
  onClaimReward: () => void;
  onRetry: () => void;
}

export const MissionResultModal: React.FC<MissionResultModalProps> = ({
  mission,
  result,
  gachaRank,
  streak,
  partner,
  onClaimReward,
  onRetry,
}) => {
  const isClear = result.isMatch;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-sky-100 overflow-hidden text-center p-6"
      >
        {isClear ? (
          /* ================= SUCCESS CLEAR ================= */
          <div className="space-y-3.5">
            {/* Top Celebration Icon */}
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-50" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center shadow-lg text-white">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="absolute -top-1 -right-1 text-2xl">🎉</span>
            </div>

            {/* Clear Title */}
            <div>
              <span className="text-[11px] font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
                BATH MISSION CLEAR!
              </span>
              <h2 className="text-xl font-black text-slate-800 mt-1 tracking-tight">
                お風呂完了！超美肌＆好感度UP
              </h2>
            </div>

            {/* Romance Partner's Reaction Banner */}
            {partner && (
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-2xl p-3 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-pink-700 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    {partner.name}の反応
                  </span>
                  <span className="text-[11px] font-black text-rose-500 bg-white px-2 py-0.2 rounded-full border border-pink-200 shadow-2xs">
                    好感度 +100 pt!
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                  「{partner.dialogues.freshBathReaction[0]}」
                </p>
              </div>
            )}

            {/* Detected Object Box */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 text-left">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                <span>✅</span>
                <span>{result.detectedObject || mission.name} をAIが認識！</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {result.comment}
              </p>
            </div>

            {/* Gacha Rank & EXP Highlight */}
            <div className="bg-gradient-to-r from-amber-50 to-indigo-50 border border-amber-200/60 rounded-2xl p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-amber-900 font-black text-[11px]">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{streak}日連続: {gachaRank.name}</span>
              </div>
              <div className="flex items-center gap-1 text-indigo-700 font-extrabold text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>EXP +{mission.expReward}</span>
              </div>
            </div>

            {/* Claim Reward Button -> GACHA PULL */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClaimReward}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-black text-base shadow-[0_8px_25px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2 hover:shadow-[0_10px_30px_rgba(99,102,241,0.45)] transition-all cursor-pointer"
            >
              <Gift className="w-5 h-5 text-yellow-300" />
              <span>ファッションガチャを引く！</span>
            </motion.button>
          </div>
        ) : (
          /* ================= FAILED RETRY ================= */
          <div className="space-y-4">
            {/* Fail Icon */}
            <div className="mx-auto w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 shadow-inner">
              <XCircle className="w-10 h-10 text-amber-500" />
            </div>

            {/* Fail Title */}
            <div>
              <span className="text-[11px] font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200">
                RETRY
              </span>
              <h2 className="text-xl font-extrabold text-slate-800 mt-1.5">
                判定できませんでした
              </h2>
            </div>

            {/* Gentle Non-Blaming Message Box */}
            <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-4 text-left">
              <p className="text-xs font-bold text-amber-800">
                {mission.name} が見つからなかったみたい…
              </p>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {result.comment || 'もう一度明るい場所でアイテム全体が写るように撮ってみてね！'}
              </p>
            </div>

            {/* Photo Tip */}
            <p className="text-[11px] text-slate-400">
              💡 {mission.hint}
            </p>

            {/* Retry Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRetry}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-400 text-white font-black text-base shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>もう一度撮影する</span>
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
