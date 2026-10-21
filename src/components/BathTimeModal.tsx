import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Waves, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';
import { KaoriScent, DailyMission, EquippedFashion } from '../types';

interface BathTimeModalProps {
  level: number;
  activeScent: KaoriScent;
  mission: DailyMission;
  equippedFashion?: EquippedFashion;
  onFinishBath: () => void;
  onBack: () => void;
}

export const BathTimeModal: React.FC<BathTimeModalProps> = ({
  level,
  activeScent,
  mission,
  equippedFashion,
  onFinishBath,
  onBack,
}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-sky-100/90 via-teal-50/95 to-sky-100/95 backdrop-blur-md flex flex-col justify-between p-5 sm:p-7 max-w-md mx-auto overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/80 text-slate-600 hover:bg-white shadow-sm transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-1 rounded-full shadow-sm border border-sky-100">
          <Waves className="w-4 h-4 text-sky-500 animate-pulse" />
          <span className="text-xs font-black tracking-widest text-sky-700 uppercase">
            BATH TIME
          </span>
        </div>
        <div className="w-9" />
      </div>

      {/* Center Bath Atmosphere */}
      <div className="flex flex-col items-center justify-center my-auto py-4 text-center">
        {/* Steam floating elements */}
        <div className="relative mb-2">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-4 text-xl opacity-70">
            <span className="animate-float" style={{ animationDelay: '0s' }}>♨️</span>
            <span className="animate-float" style={{ animationDelay: '1s' }}>🫧</span>
            <span className="animate-float" style={{ animationDelay: '2s' }}>♨️</span>
          </div>

          <CharacterAvatar
            level={level}
            activeScent={activeScent}
            equippedFashion={equippedFashion}
            size="lg"
            showDialogue={true}
            dialogueText="今日の香り、楽しみに待ってるよ！🛁✨"
          />
        </div>

        {/* Bath Timer & Encouragement */}
        <div className="bg-white/80 backdrop-blur-sm border border-sky-100 rounded-2xl px-6 py-3.5 shadow-sm mt-4 inline-flex flex-col items-center">
          <div className="flex items-center gap-2 text-sky-600">
            <Clock className="w-4 h-4" />
            <span className="text-2xl font-black font-mono tracking-wider">
              {formatTime(seconds)}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">
            湯船につかってぽかぽかリフレッシュ中
          </span>
        </div>

        {/* Mission reminder banner */}
        <div className="mt-5 bg-sky-50/90 border border-sky-200/80 rounded-2xl p-3.5 max-w-xs text-left shadow-sm">
          <div className="text-[11px] font-bold text-sky-600 mb-1 flex items-center gap-1">
            <span>出たあとのミッション:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{mission.icon}</span>
            <div className="text-xs font-extrabold text-slate-700">
              {mission.title}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Main Action Button */}
      <div className="pt-3 pb-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={onFinishBath}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 text-white font-black text-lg shadow-[0_8px_25px_rgba(14,165,233,0.35)] flex items-center justify-center gap-2 hover:shadow-[0_10px_30px_rgba(14,165,233,0.45)] transition-all"
        >
          <CheckCircle2 className="w-6 h-6" />
          <span>お風呂から出た！</span>
        </motion.button>
        <p className="text-center text-[11px] text-slate-500 mt-2">
          タップして写真ミッションに挑戦しよう📸
        </p>
      </div>
    </div>
  );
};
