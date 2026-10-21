import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, ChevronRight, Gift, Award, MessageCircle } from 'lucide-react';
import { RomanceDateEvent, RomancePartner, PartnerExpression } from '../types';
import { RomancePartnerAvatar } from './RomancePartnerAvatar';

interface RomanceDatingModalProps {
  event: RomanceDateEvent;
  partner: RomancePartner;
  onComplete: (affectionGained: number, rewardExp: number, rewardTickets: number) => void;
  onClose: () => void;
}

export const RomanceDatingModal: React.FC<RomanceDatingModalProps> = ({
  event,
  partner,
  onComplete,
  onClose,
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [accumulatedAffection, setAccumulatedAffection] = useState(50);
  const [selectedChoiceReply, setSelectedChoiceReply] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [floatingHeart, setFloatingHeart] = useState<{ id: number; text: string } | null>(null);

  const currentLine = event.script[currentLineIndex];
  const totalLines = event.script.length;

  const handleNext = () => {
    if (selectedChoiceReply) {
      setSelectedChoiceReply(null);
    }
    if (currentLineIndex < totalLines - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleSelectChoice = (choice: { text: string; affectionBonus: number; reply: string }) => {
    setAccumulatedAffection((prev) => prev + choice.affectionBonus);
    setSelectedChoiceReply(choice.reply);
    setFloatingHeart({
      id: Date.now(),
      text: `+${choice.affectionBonus} ❤️ 好感度アップ!`,
    });
    setTimeout(() => setFloatingHeart(null), 1500);
  };

  const handleFinishDate = () => {
    onComplete(accumulatedAffection, event.rewardExp, event.rewardTickets);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 rounded-3xl border border-pink-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-slate-950/80 border-b border-pink-500/20 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <span className="text-xl">{event.icon}</span>
              <div>
                <h3 className="text-sm font-black text-white">{event.title}</h3>
                <p className="text-[10px] text-pink-300 font-medium flex items-center gap-1">
                  <span>📍 {event.location}</span>
                  <span>•</span>
                  <span>with {partner.name}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Date Visual Scene Stage */}
          <div className="relative flex-1 min-h-[260px] flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-pink-950/30 via-slate-900/50 to-slate-950">
            {/* Ambient Romance Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_40%,rgba(244,63,94,0.3),transparent_70%)]" />

            {/* Floating Affection Heart Popup */}
            <AnimatePresence>
              {floatingHeart && (
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0.8 }}
                  animate={{ opacity: 1, y: -30, scale: 1.1 }}
                  exit={{ opacity: 0, y: -50, scale: 1.2 }}
                  className="absolute top-12 z-30 px-3 py-1 rounded-full bg-pink-500 text-white text-xs font-black shadow-lg shadow-pink-500/50 border border-pink-300 flex items-center gap-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>{floatingHeart.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {!isFinished ? (
              <div className="flex flex-col items-center justify-center relative z-10">
                <RomancePartnerAvatar
                  partner={partner}
                  expression={
                    selectedChoiceReply
                      ? 'loving'
                      : (currentLine?.expression as PartnerExpression) || 'blushing'
                  }
                  size="xl"
                  isBlushing={true}
                />
              </div>
            ) : (
              /* Date Completed Victory Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center p-6 z-10 max-w-sm"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-3xl shadow-xl shadow-pink-500/40 mb-3 animate-bounce">
                  💖
                </div>
                <h4 className="text-lg font-black text-white">デート大成功！</h4>
                <p className="text-xs text-pink-200 mt-1 mb-4">
                  {partner.name}との心の距離がぐっと近づきました♡
                </p>

                {/* Rewards Breakdown */}
                <div className="w-full bg-slate-900/90 rounded-2xl p-4 border border-pink-500/30 space-y-2 text-left mb-5 shadow-inner">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-pink-300 font-bold flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                      獲得好感度
                    </span>
                    <span className="font-black text-pink-400 text-sm">
                      +{accumulatedAffection} pt
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sky-300 font-bold flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                      獲得EXP
                    </span>
                    <span className="font-black text-sky-300">+{event.rewardExp} EXP</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-300 font-bold flex items-center gap-1">
                      <Gift className="w-4 h-4 text-amber-400" />
                      ガチャチケット
                    </span>
                    <span className="font-black text-amber-300">
                      +{event.rewardTickets} 枚
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinishDate}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-black text-sm shadow-lg shadow-pink-500/40 hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>思い出を胸に刻む</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Visual Novel Dialogue Box (Bottom Area) */}
          {!isFinished && currentLine && (
            <div className="p-4 bg-slate-950/95 border-t border-pink-500/20 z-20">
              {/* Speaker Name Tag */}
              <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black shadow-md mb-2">
                {selectedChoiceReply ? partner.name : currentLine.speaker}
              </div>

              {/* Dialogue Text */}
              <div className="min-h-[56px] text-sm text-slate-100 font-medium leading-relaxed mb-3">
                {selectedChoiceReply ? (
                  <motion.p
                    key="reply"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-pink-200"
                  >
                    「{selectedChoiceReply}」
                  </motion.p>
                ) : (
                  <motion.p
                    key={currentLineIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    「{currentLine.text}」
                  </motion.p>
                )}
              </div>

              {/* Choice Options (if interactive choice) */}
              {currentLine.isChoice && currentLine.choices && !selectedChoiceReply ? (
                <div className="space-y-2 mb-2">
                  {currentLine.choices.map((c, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectChoice(c)}
                      className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-pink-950/60 border border-pink-500/30 hover:border-pink-400 text-xs font-bold text-pink-100 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-pink-500/30 text-pink-300 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{c.text}</span>
                      </span>
                      <span className="text-[10px] text-pink-400 font-black opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                        <Heart className="w-3 h-3 fill-pink-400" />
                        +{c.affectionBonus}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                /* Next Button */
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {currentLineIndex + 1} / {totalLines}
                  </div>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{currentLineIndex >= totalLines - 1 ? '完了' : '次へ'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
