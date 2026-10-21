import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Bath,
  Moon,
  Zap,
  X,
  Clock,
  Flame,
  Info,
  Camera,
} from 'lucide-react';
import { UserGameState, PreviewSpeed } from '../types';
import { getKaoriStatusInfo } from '../data/gameData';

interface PreviewControllerProps {
  previewState: UserGameState;
  simulationDay: number;
  isPlaying: boolean;
  speed: PreviewSpeed;
  isCleaningUp: boolean;
  onBath: () => void;
  onSkip: () => void;
  onAdvanceDays: (days: number) => void;
  onReset: () => void;
  onTogglePlay: () => void;
  onSetSpeed: (speed: PreviewSpeed) => void;
  onRunScenario: (scenario: 'growth' | 'skip' | 'recovery') => void;
  onExitPreview: () => void;
  onOpenPhotoTest: () => void;
}

export const PreviewController: React.FC<PreviewControllerProps> = ({
  previewState,
  simulationDay,
  isPlaying,
  speed,
  isCleaningUp,
  onBath,
  onSkip,
  onAdvanceDays,
  onReset,
  onTogglePlay,
  onSetSpeed,
  onRunScenario,
  onExitPreview,
  onOpenPhotoTest,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const statusInfo = getKaoriStatusInfo(previewState.kaoriGauge);

  const handleScenarioClick = (scenario: 'growth' | 'skip' | 'recovery') => {
    setActiveScenario(scenario);
    onRunScenario(scenario);
    setTimeout(() => setActiveScenario(null), 3000);
  };

  return (
    <>
      {/* Top Banner indicating Preview Mode */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-3 py-1.5 shadow-md flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-black bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            PREVIEW MODE
          </span>
          <span className="font-bold text-white/90">
            DAY {simulationDay}
          </span>
          <span className="bg-black/30 px-1.5 py-0.5 rounded font-mono text-[10px] text-pink-200">
            {speed}x SPEED
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[11px] text-white/80">
            ※通常データには影響しません
          </span>
          <button
            onClick={onExitPreview}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/20 hover:bg-white/30 active:scale-95 rounded-lg text-white font-bold transition-all"
          >
            <X className="w-3.5 h-3.5" />
            <span>終了</span>
          </button>
        </div>
      </div>

      {/* Floating Bottom Controller Panel */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto p-2 pointer-events-none">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto transition-all text-white">
          {/* Header Toggle */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3.5 py-2.5 flex items-center justify-between cursor-pointer border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="font-black text-xs tracking-wide">
                デモ / シミュレーション操作パネル
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                {statusInfo.badgeLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="p-1 text-slate-400 hover:text-white"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expanded Controls Area */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-3 space-y-3"
              >
                {/* 1. Quick Scenario Buttons (One-touch Demo) */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                    <span>🎯 デモ用ワンタップシナリオ</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => handleScenarioClick('growth')}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        activeScenario === 'growth'
                          ? 'bg-sky-600 border-sky-400 shadow-md ring-2 ring-sky-300'
                          : 'bg-slate-800/90 border-slate-700 hover:bg-slate-700/80 hover:border-sky-500'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[11px] font-black text-sky-300">
                        <span>✨ 美肌Lv & 成長</span>
                      </div>
                      <p className="text-[9px] text-slate-300 line-clamp-1 mt-0.5">
                        ツヤ肌・天使の輪・LvUP
                      </p>
                    </button>

                    <button
                      onClick={() => handleScenarioClick('skip')}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        activeScenario === 'skip'
                          ? 'bg-purple-900 border-purple-400 shadow-md ring-2 ring-purple-300'
                          : 'bg-slate-800/90 border-slate-700 hover:bg-slate-700/80 hover:border-purple-500'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[11px] font-black text-purple-300">
                        <span>🤢 泥・ヘドロ醜態</span>
                      </div>
                      <p className="text-[9px] text-slate-300 line-clamp-1 mt-0.5">
                        皮脂・ハエ・ヘドロ化
                      </p>
                    </button>

                    <button
                      onClick={() => handleScenarioClick('recovery')}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        activeScenario === 'recovery'
                          ? 'bg-teal-700 border-teal-400 shadow-md ring-2 ring-teal-300'
                          : 'bg-slate-800/90 border-slate-700 hover:bg-slate-700/80 hover:border-teal-500'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[11px] font-black text-teal-300">
                        <span>🫧 ピカーン復活</span>
                      </div>
                      <p className="text-[9px] text-slate-300 line-clamp-1 mt-0.5">
                        醜態から美肌へ劇的浄化
                      </p>
                    </button>
                  </div>
                </div>

                {/* 📸 写真判定をテスト (Photo Mission Test Button) */}
                <button
                  onClick={onOpenPhotoTest}
                  className="w-full py-2.5 px-3.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 active:scale-98 rounded-xl font-black text-xs text-white shadow-md shadow-pink-500/25 flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-amber-300" />
                  <span>📸 写真判定をテスト（Gemini検証）</span>
                  <Sparkles className="w-3.5 h-3.5 text-pink-200" />
                </button>

                {/* 2. Core Manual Simulation Actions */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Bath Action Button */}
                  <button
                    onClick={onBath}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 active:scale-95 text-slate-900 font-black rounded-xl text-xs shadow-lg shadow-sky-500/20 transition-all"
                  >
                    <Bath className="w-4 h-4" />
                    <span>🛁 お風呂に入る (+45)</span>
                  </button>

                  {/* Skip Action Button */}
                  <button
                    onClick={onSkip}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-purple-500/40 text-purple-200 font-black rounded-xl text-xs transition-all"
                  >
                    <Moon className="w-4 h-4 text-purple-400" />
                    <span>😴 今日はスキップ (-25)</span>
                  </button>
                </div>

                {/* 3. Time Warp & Auto-play bar */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 gap-2">
                  {/* Day Advance Fast Buttons */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-bold mr-0.5">進める:</span>
                    <button
                      onClick={() => onAdvanceDays(1)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-[10px] border border-slate-700"
                    >
                      +1日
                    </button>
                    <button
                      onClick={() => onAdvanceDays(3)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-[10px] border border-slate-700"
                    >
                      +3日
                    </button>
                    <button
                      onClick={() => onAdvanceDays(7)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-[10px] border border-slate-700"
                    >
                      +7日
                    </button>
                  </div>

                  {/* Play / Pause / Reset & Speed */}
                  <div className="flex items-center gap-1.5">
                    {/* Speed Selector */}
                    <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                      {([1, 10, 50, 100] as PreviewSpeed[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => onSetSpeed(s)}
                          className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                            speed === s
                              ? 'bg-sky-500 text-slate-900'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>

                    {/* Auto Play / Pause Toggle */}
                    <button
                      onClick={onTogglePlay}
                      className={`p-1.5 rounded-lg font-bold text-xs transition-all ${
                        isPlaying
                          ? 'bg-amber-500 text-slate-900 animate-pulse'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                      title={isPlaying ? '一時停止' : '自動進行'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    {/* Reset Button */}
                    <button
                      onClick={onReset}
                      className="p-1.5 bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-300 rounded-lg border border-slate-700 transition-all"
                      title="リセット (DAY 1へ)"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};
