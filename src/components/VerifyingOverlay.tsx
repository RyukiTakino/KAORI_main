import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bot, Search } from 'lucide-react';

interface VerifyingOverlayProps {
  missionName: string;
}

export const VerifyingOverlay: React.FC<VerifyingOverlayProps> = ({ missionName }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
      {/* Animated AI Scanning Bubble */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-6">
        {/* Outer glowing pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full border-2 border-sky-400/80 shadow-[0_0_30px_rgba(56,189,248,0.5)]"
        />

        {/* Secondary rotating radar dash */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="absolute inset-2 rounded-full border border-dashed border-teal-300/60"
        />

        {/* Core Bubble Center */}
        <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-sky-500 via-teal-400 to-indigo-400 flex items-center justify-center shadow-lg">
          <Bot className="w-11 h-11 text-white animate-bounce" />
        </div>

        {/* Floating Sparkles */}
        <motion.div
          animate={{ y: [-10, 10, -10], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute -top-2 -right-2 text-yellow-300 text-xl"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.2, delay: 0.5 }}
          className="absolute -bottom-1 -left-2 text-sky-300 text-lg"
        >
          🫧
        </motion.div>
      </div>

      {/* Main Status Text */}
      <h3 className="text-xl font-black tracking-wide text-white drop-shadow-md">
        AIが写真をチェックしています…
      </h3>
      <p className="text-sm text-sky-200 mt-2 font-medium">
        「{missionName}」が写っているか解析中
      </p>

      {/* Mini Progress Pulse Bar */}
      <div className="w-48 h-1.5 bg-slate-700/80 rounded-full overflow-hidden mt-5">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-full h-full bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 rounded-full"
        />
      </div>

      <p className="text-xs text-slate-300/80 mt-6 max-w-xs leading-relaxed">
        きれいなお風呂に入ってえらいっ！判定完了まで少々お待ちください…
      </p>
    </div>
  );
};
