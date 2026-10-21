import React from 'react';
import { Camera, Sparkles, CheckCircle2, ChevronRight, Gift, Flame, Info } from 'lucide-react';
import { DailyMission, GachaRankInfo } from '../types';
import { getGachaRank } from '../data/gameData';

interface DailyMissionCardProps {
  mission: DailyMission;
  isCompleted: boolean;
  streak: number;
  gachaRank?: GachaRankInfo;
  onStartMission?: () => void;
  onStartBath?: () => void;
  onOpenTestModal?: () => void;
}

export const DailyMissionCard: React.FC<DailyMissionCardProps> = ({
  mission,
  isCompleted,
  streak,
  gachaRank,
  onStartMission,
  onStartBath,
  onOpenTestModal,
}) => {
  const safeRank = gachaRank || getGachaRank(streak || 1);
  const handleStart = onStartMission || onStartBath || (() => {});

  return (
    <div className="w-full bg-white rounded-3xl p-5 shadow-lg border border-teal-50 relative overflow-hidden transition-all hover:shadow-xl">
      {/* Top Banner with Gacha Rank & Streak */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black tracking-widest text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 uppercase">
            TODAY'S MISSION
          </span>
          <div className="flex items-center gap-1 text-[11px] font-extrabold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{streak || 1}日連続</span>
          </div>
        </div>

        {/* Current Gacha Rank Pill */}
        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${safeRank.badgeClass}`}>
          {safeRank.name}
        </span>
      </div>

      {/* Main Mission Info */}
      <div className="flex items-start gap-4">
        {/* Mission Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-100 to-teal-100 border border-sky-200/60 flex items-center justify-center text-3xl shadow-inner shrink-0">
          {mission.icon}
        </div>

        {/* Title and description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-sky-600">お風呂ミッション:</span>
            <span className="text-xs font-black text-slate-800 bg-slate-100 px-2 py-0.2 rounded-md">
              {mission.name}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-800 mt-1 leading-snug">
            {mission.title}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {mission.description}
          </p>
        </div>
      </div>

      {/* Reward Preview Bar */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-indigo-700 font-extrabold bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
            <Gift className="w-3.5 h-3.5 text-indigo-500" />
            <span>服・帽子ガチャ</span>
          </div>
          <div className="flex items-center gap-1 text-sky-700 font-bold bg-sky-50 px-2.5 py-1 rounded-xl border border-sky-100">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>EXP+{mission.expReward}</span>
          </div>
        </div>

        {onOpenTestModal && (
          <button
            onClick={onOpenTestModal}
            className="text-[11px] text-slate-400 hover:text-indigo-600 underline font-medium transition-colors"
          >
            写真検証テスト
          </button>
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="mt-4">
        {isCompleted ? (
          <div className="w-full py-3.5 px-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>本日のお風呂ミッション完了！</span>
          </div>
        ) : (
          <button
            onClick={handleStart}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 hover:from-sky-600 hover:via-teal-500 hover:to-emerald-500 text-white font-black text-base shadow-[0_6px_20px_rgba(14,165,233,0.35)] hover:shadow-[0_8px_25px_rgba(14,165,233,0.45)] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Camera className="w-5 h-5" />
            <span>写真を撮ってお風呂に入る！ (ガチャ確定)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
