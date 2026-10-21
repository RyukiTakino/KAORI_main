import React, { useState } from 'react';
import { Flame, Sparkles, RotateCcw, HelpCircle, Info, Beaker, Shirt } from 'lucide-react';
import { getGachaRank } from '../data/gameData';

interface HeaderBarProps {
  streak: number;
  hasAccessory: boolean;
  isPreviewMode?: boolean;
  onOpenPreview: () => void;
  onResetData: () => void;
  onQuickSimulateLevel: () => void;
  onOpenWardrobe?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  streak,
  hasAccessory,
  isPreviewMode = false,
  onOpenPreview,
  onResetData,
  onQuickSimulateLevel,
  onOpenWardrobe,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const gachaRank = getGachaRank(streak);

  return (
    <header className="w-full flex items-center justify-between py-3 border-b border-sky-100/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-1">
      {/* Left App Brand */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-sky-500 via-teal-400 to-indigo-500 bg-clip-text text-transparent">
            KAORI
          </span>
          <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100 uppercase">
            BATH DRESS-UP
          </span>
        </div>
        <p className="text-[10px] font-semibold text-slate-400">
          お風呂に入ってアバターをおしゃれに育成
        </p>
      </div>

      {/* Right Streak, Gacha Rank Badge, & Utility Menu */}
      <div className="flex items-center gap-1.5">
        {/* Wardrobe Quick Button */}
        {onOpenWardrobe && (
          <button
            onClick={onOpenWardrobe}
            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold rounded-full text-[11px] border border-indigo-200 transition-colors shadow-xs"
            title="きせかえクローゼット"
          >
            <Shirt className="w-3.5 h-3.5 text-indigo-500" />
            <span>きせかえ</span>
          </button>
        )}

        {/* PREVIEW Mode Button */}
        {!isPreviewMode && (
          <button
            onClick={onOpenPreview}
            className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 text-white font-black rounded-full text-[10px] shadow-sm shadow-indigo-500/20 border border-indigo-300/30 transition-all select-none"
            title="ハッカソン用デモ・プレビューモード"
          >
            <Beaker className="w-3 h-3" />
            <span>DEMO</span>
          </button>
        )}

        {/* Streak & Gacha Rank Badge */}
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full shadow-xs border select-none ${gachaRank.badgeClass}`}
          title={`連続入浴 ${streak}日目: ${gachaRank.name}`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
          <span className="text-[11px] font-black tracking-wide">
            {streak}日
          </span>
        </div>

        {/* Quick Menu Button */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="オプション"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-40 text-xs">
              <button
                onClick={() => {
                  setShowGuide(true);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-2"
              >
                <Info className="w-3.5 h-3.5 text-sky-500" />
                <span>アプリの使い方</span>
              </button>
              <button
                onClick={() => {
                  onOpenPreview();
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 font-bold text-purple-600 flex items-center gap-2"
              >
                <Beaker className="w-3.5 h-3.5" />
                <span>プレビューモード起動</span>
              </button>
              <button
                onClick={() => {
                  onQuickSimulateLevel();
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-sky-50 font-bold text-sky-600 flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXP+100 (テスト用)</span>
              </button>
              <button
                onClick={() => {
                  if (confirm('データをリセットしますか？')) {
                    onResetData();
                  }
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 font-bold text-rose-600 flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>データを初期化</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* App Guide Dialog */}
      {showGuide && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl border border-sky-100 space-y-3">
            <h3 className="font-extrabold text-base text-slate-800 text-center">
              🛁 KAORI のあそびかた
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <p className="flex gap-2">
                <span className="font-bold text-sky-500 shrink-0">1.</span>
                <span>ホームで今日の「入浴剤・湯船・シャンプー」などの写真ミッションを確認！</span>
              </p>
              <p className="flex gap-2">
                <span className="font-bold text-sky-500 shrink-0">2.</span>
                <span>「お風呂に行く」を押して写真を撮影・AI判定！</span>
              </p>
              <p className="flex gap-2">
                <span className="font-bold text-sky-500 shrink-0">3.</span>
                <span>お風呂に入ると服や帽子のファッションガチャが引ける！</span>
              </p>
              <p className="flex gap-2">
                <span className="font-bold text-sky-500 shrink-0">4.</span>
                <span>毎日連続でお風呂に入るとガチャのランクが上がり、SR・URの超レア服が出現！</span>
              </p>
              <p className="flex gap-2">
                <span className="font-bold text-sky-500 shrink-0">5.</span>
                <span>クローゼットでアバターを自由に着せ替えておしゃれを楽しもう✨</span>
              </p>
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-2.5 bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-700 transition-all mt-2 cursor-pointer"
            >
              とじる
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
