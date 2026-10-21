import React from 'react';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';
import { KaoriScent } from '../types';
import { getEvolutionStage, getBathsUntilNextEvolution, EVOLUTION_STAGES } from '../data/gameData';

interface FutureEvolutionCardProps {
  level: number;
  currentExp: number;
  activeScent: KaoriScent;
  equippedFashion?: any;
}

export const FutureEvolutionCard: React.FC<FutureEvolutionCardProps> = ({
  level,
  currentExp,
  activeScent,
  equippedFashion,
}) => {
  const currentStage = getEvolutionStage(level);
  const { bathsNeeded, nextLevel, nextStage } = getBathsUntilNextEvolution(level, currentExp);

  if (!nextStage) {
    return (
      <div className="w-full bg-gradient-to-r from-amber-500/10 via-yellow-400/15 to-orange-500/10 border border-amber-200/80 rounded-2xl p-4 shadow-sm text-center">
        <div className="flex items-center justify-center gap-1.5 text-amber-700 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>最高進化形態に到達！✨</span>
        </div>
        <p className="text-xs text-slate-600 mt-1">
          香りの大精霊として神聖なオーラを放っています。毎日のお風呂で香りを極めよう！
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Motivation Line */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Evolution Preview
          </span>
        </div>
        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-sm animate-pulse">
          あと{bathsNeeded}回のお風呂で進化！
        </span>
      </div>

      {/* Evolution Flow Comparison */}
      <div className="flex items-center justify-between bg-slate-50/80 rounded-xl p-3 border border-slate-100">
        {/* Current State */}
        <div className="flex flex-col items-center flex-1">
          <div className="text-[10px] font-bold text-slate-400 mb-1">現在 (Lv.{level})</div>
          <div className="w-14 h-14 relative flex items-center justify-center">
            <CharacterAvatar
              level={level}
              activeScent={activeScent}
              equippedFashion={equippedFashion}
              size="sm"
            />
          </div>
          <span className="text-xs font-bold text-slate-700 mt-1 text-center truncate max-w-[80px]">
            {currentStage.title}
          </span>
        </div>

        {/* Transition Arrow */}
        <div className="flex flex-col items-center px-2">
          <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shadow-inner">
            <ArrowRight className="w-4 h-4 animate-bounce" />
          </div>
          <span className="text-[9px] font-bold text-sky-500 mt-1">Lv.{nextLevel}</span>
        </div>

        {/* Next Stage Silhouette */}
        <div className="flex flex-col items-center flex-1">
          <div className="text-[10px] font-bold text-sky-600 flex items-center gap-0.5 mb-1">
            <Lock className="w-2.5 h-2.5" />
            <span>？？？</span>
          </div>
          <div className="w-14 h-14 relative flex items-center justify-center">
            <CharacterAvatar
              level={nextLevel}
              activeScent={activeScent}
              isSilhouette={true}
              size="sm"
            />
          </div>
          <span className="text-xs font-bold text-slate-500 mt-1 text-center truncate max-w-[80px]">
            {nextStage.title}
          </span>
        </div>
      </div>

      {/* Feature teaser */}
      <p className="text-[11px] text-slate-500 text-center mt-2.5">
        進化すると <strong className="text-slate-700">{nextStage.featureDescription}</strong> にパワーアップ！
      </p>
    </div>
  );
};
