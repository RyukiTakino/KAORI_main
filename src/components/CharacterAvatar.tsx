import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { AromaAuraEffect } from './AromaAuraEffect';
import { KaoriScent, EquippedFashion } from '../types';
import { getEvolutionStage, getKaoriStatusInfo, DEFAULT_EQUIPPED_FASHION } from '../data/gameData';

interface CharacterAvatarProps {
  level: number;
  activeScent: KaoriScent;
  equippedFashion?: EquippedFashion | null;
  equippedAccessory?: string | null; // legacy fallback
  isSilhouette?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDialogue?: boolean;
  dialogueText?: string;
  kaoriGauge?: number; // 0 to 100
  isCleaningUp?: boolean;
  onTap?: () => void;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  level,
  activeScent,
  equippedFashion = DEFAULT_EQUIPPED_FASHION,
  isSilhouette = false,
  size = 'lg',
  showDialogue = false,
  dialogueText,
  kaoriGauge = 100,
  isCleaningUp = false,
  onTap,
}) => {
  const fashion = equippedFashion || DEFAULT_EQUIPPED_FASHION;
  const isMale = fashion.gender === 'male' || fashion.gender === 'style_b';
  const stageInfo = getEvolutionStage(level);
  const stage = stageInfo.stage;
  const statusInfo = getKaoriStatusInfo(kaoriGauge);

  // Cleanliness tiers
  const isGlowingClean = kaoriGauge >= 80; // Stage 1: Ultra beautiful / shiny
  const isNormalClean = kaoriGauge >= 50 && kaoriGauge < 80; // Stage 2: Normal
  const isOilyTired = kaoriGauge >= 25 && kaoriGauge < 50; // Stage 3: Oily, messy hair, dark circles
  const isDirtyStinky = kaoriGauge >= 1 && kaoriGauge < 25; // Stage 4: Mud/grease, flies, stinky fumes
  const isSludgeMonster = kaoriGauge < 1; // Stage 5: Sludge, extreme dirtiness, skull fumes

  const [isBouncing, setIsBouncing] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [tapHearts, setTapHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleCharacterClick = () => {
    if (isSilhouette) return;
    setIsBouncing(true);
    setIsWinking(true);

    const newHeart = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 45,
      y: -32 - Math.random() * 25,
    };
    setTapHearts((prev) => [...prev.slice(-4), newHeart]);

    setTimeout(() => setIsBouncing(false), 600);
    setTimeout(() => setIsWinking(false), 950);

    if (onTap) {
      onTap();
    }
  };

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-60 h-60',
    xl: 'w-72 h-72',
  }[size];

  // Silhouette render
  if (isSilhouette) {
    return (
      <div className={`relative ${sizeClasses} flex items-center justify-center select-none`}>
        <div className="absolute inset-2 rounded-full bg-slate-200/60 filter blur-md animate-pulse" />
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
        >
          <defs>
            <linearGradient id="silhouetteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <g fill="url(#silhouetteGrad)">
            {/* Manga Head & Torso Silhouette */}
            <circle cx="100" cy="80" r="42" />
            <path d="M55,175 C55,130 75,120 100,120 C125,120 145,130 145,175 Z" />
            <ellipse cx="100" cy="52" rx="36" ry="18" />
            <circle cx="100" cy="36" r="14" />
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90">
          <div className="p-2 rounded-full bg-slate-900/60 backdrop-blur-sm shadow-md border border-white/20">
            <span className="text-xl">🔒</span>
          </div>
          <span className="mt-1 text-xs font-bold tracking-wider text-slate-700 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
            NEXT
          </span>
        </div>
      </div>
    );
  }

  const currentDialogue = dialogueText || statusInfo.dialogueList[0];

  // Hair color
  const hairColor = fashion.hairColor || (isMale ? '#1e293b' : '#451a03');

  // Skin color based on dirtiness stages
  let skinColor = '#fff7ed'; // Porcelain fair manga skin
  let skinShadow = '#fed7aa';

  if (isGlowingClean) {
    // Ultra porcelain glowing skin tone
    skinColor = '#fffbf5';
    skinShadow = '#ffedd5';
  } else if (isNormalClean) {
    skinColor = '#fff7ed';
    skinShadow = '#fed7aa';
  } else if (isOilyTired) {
    skinColor = '#fef3c7';
    skinShadow = '#fde68a';
  } else if (isDirtyStinky) {
    skinColor = '#cbd5e1';
    skinShadow = '#94a3b8';
  } else if (isSludgeMonster) {
    skinColor = '#86efac';
    skinShadow = '#4ade80';
  }

  return (
    <div
      className={`relative ${sizeClasses} flex items-center justify-center cursor-pointer select-none group`}
      onClick={handleCharacterClick}
    >
      {/* Scent & Cleanliness Background Aura */}
      {kaoriGauge >= 25 && (
        <AromaAuraEffect
          scent={activeScent}
          intensity={Math.max(1, Math.min(5, stage + (isGlowingClean ? 1 : 0)))}
        />
      )}

      {/* Floating Romance Manga Tone Particles (Petals & Sparkles) */}
      {isGlowingClean && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-full">
          <motion.div
            animate={{
              y: [-10, 85],
              x: [-12, 20],
              rotate: [0, 160],
              opacity: [0, 0.7, 0],
            }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
            className="absolute top-2 left-6 text-xs"
          >
            🌸
          </motion.div>
          <motion.div
            animate={{
              y: [-8, 80],
              x: [15, -18],
              rotate: [0, -160],
              opacity: [0, 0.65, 0],
            }}
            transition={{ repeat: Infinity, duration: 4.8, delay: 1.5, ease: 'easeInOut' }}
            className="absolute top-3 right-6 text-xs"
          >
            ✨
          </motion.div>
        </div>
      )}

      {/* Level Evolution Halo & Sparkle for high levels (Lv 5+) */}
      {stage >= 3 && isGlowingClean && (
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
            className="w-56 h-56 rounded-full border border-amber-300/30 bg-gradient-to-tr from-amber-200/10 via-pink-200/10 to-sky-200/10 filter blur-sm"
          />
        </div>
      )}

      {/* STAGE 5: SLUDGE MONSTER (Gauge = 0%) */}
      {isSludgeMonster && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="absolute w-64 h-64 rounded-full bg-purple-900/30 filter blur-xl animate-pulse" />
          <motion.div
            animate={{ y: [-10, -55], x: [-15, -30], opacity: [0.95, 0], scale: [0.8, 1.3] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
            className="absolute top-4 left-4 text-2xl"
          >
            ☠️
          </motion.div>
          <motion.div
            animate={{ y: [-15, -60], x: [15, 30], opacity: [0.9, 0], scale: [0.8, 1.4] }}
            transition={{ repeat: Infinity, duration: 2.6, delay: 0.5, ease: 'easeOut' }}
            className="absolute top-2 right-4 text-2xl"
          >
            〰️
          </motion.div>
        </div>
      )}

      {/* STAGE 4: DIRTY & STINKY (Gauge 1-24%) */}
      {isDirtyStinky && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="absolute w-56 h-56 rounded-full bg-purple-600/20 filter blur-lg animate-pulse" />
          <motion.div
            animate={{ y: [-10, -45], x: [-10, -20], opacity: [0.85, 0], scale: [0.7, 1.2] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeOut' }}
            className="absolute top-8 left-6 text-xl"
          >
            〰️
          </motion.div>
          <motion.div
            animate={{ y: [-12, -48], x: [10, 22], opacity: [0.85, 0], scale: [0.7, 1.2] }}
            transition={{ repeat: Infinity, duration: 2.7, delay: 0.6, ease: 'easeOut' }}
            className="absolute top-6 right-6 text-xl"
          >
            💨
          </motion.div>
        </div>
      )}

      {/* STAGE 3: OILY & TIRED (Gauge 25-49%) */}
      {isOilyTired && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <motion.div
            animate={{ y: [-5, -25], opacity: [0.7, 0] }}
            transition={{ repeat: Infinity, duration: 2.8 }}
            className="absolute top-8 left-8 text-base"
          >
            💧
          </motion.div>
        </div>
      )}

      {/* Clean Burst Washing Animation */}
      <AnimatePresence>
        {isCleaningUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none z-40 flex flex-col items-center justify-center"
          >
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-sky-400/50 via-teal-300/50 to-pink-300/50 filter blur-xl animate-ping" />
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.3, 1] }}
              transition={{ duration: 1.0 }}
              className="text-5xl drop-shadow-lg"
            >
              ✨🫧🧼🫧✨
            </motion.div>
            <span className="mt-2 text-xs font-black px-3 py-1 rounded-full bg-white/95 text-sky-700 shadow-xl border border-sky-200 animate-bounce">
              ピカーン！超美肌＆いい匂いに復活！✨
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Dialogue Speech Bubble */}
      <AnimatePresence>
        {showDialogue && currentDialogue && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`absolute -top-14 left-1/2 -translate-x-1/2 z-30 max-w-[260px] w-max px-3.5 py-2 backdrop-blur-md rounded-2xl shadow-lg border text-xs font-bold text-center pointer-events-none ${
              isSludgeMonster
                ? 'bg-rose-950/90 border-rose-400 text-rose-100 shadow-rose-900/30'
                : isDirtyStinky
                ? 'bg-purple-950/90 border-purple-300 text-purple-100 shadow-purple-900/30'
                : isOilyTired
                ? 'bg-amber-50/95 border-amber-300 text-amber-900 shadow-amber-900/10'
                : isGlowingClean
                ? 'bg-gradient-to-r from-teal-50 to-sky-50 border-teal-200 text-teal-950 shadow-teal-500/10'
                : 'bg-white/95 border-slate-200 text-slate-700'
            }`}
          >
            <div className="relative">
              {currentDialogue}
              <div
                className={`absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b ${
                  isSludgeMonster
                    ? 'bg-rose-950 border-rose-400'
                    : isDirtyStinky
                    ? 'bg-purple-950 border-purple-300'
                    : isOilyTired
                    ? 'bg-amber-50 border-amber-300'
                    : isGlowingClean
                    ? 'bg-teal-50 border-teal-200'
                    : 'bg-white border-slate-200'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap Heart animations */}
      {tapHearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 1, y: 0, scale: 0.7 }}
          animate={{ opacity: 0, y: h.y, scale: 1.35 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="absolute text-pink-400 pointer-events-none z-30 flex items-center gap-1 font-black text-xs"
          style={{ transform: `translateX(${h.x}px)` }}
        >
          <Heart className="w-5 h-5 fill-pink-400" />
          <span className="text-[10px] text-pink-500 bg-white/90 px-1 py-0.2 rounded-full border border-pink-200 shadow-xs">
            きゅん♡
          </span>
        </motion.div>
      ))}

      {/* ================= MAIN ROMANCE MANGA AVATAR SVG ================= */}
      <motion.div
        animate={
          isBouncing
            ? { scale: [1, 1.15, 0.94, 1.06, 1], y: [0, -14, 3, -3, 0] }
            : isSludgeMonster
            ? { y: [0, 5, 0], rotate: [-2, 2, -2] }
            : isDirtyStinky
            ? { y: [0, 4, 0], rotate: [-1.5, 1.5, -1.5] }
            : isOilyTired
            ? { y: [0, 3, 0] }
            : isGlowingClean
            ? { y: [0, -5, 0] }
            : { y: [0, -3.5, 0] }
        }
        transition={
          isBouncing
            ? { duration: 0.6, ease: 'easeInOut' }
            : { repeat: Infinity, duration: isGlowingClean ? 3.0 : 3.8, ease: 'easeInOut' }
        }
        className="relative z-10 w-full h-full flex items-center justify-center filter drop-shadow-[0_10px_24px_rgba(56,189,248,0.25)]"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            {/* Female & Male Manga Blush Gradients */}
            <radialGradient id="playerFemaleBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#fb7185" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="playerMaleBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fb7185" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#fda4af" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
            </radialGradient>

            {/* Romance Eye Iris Gradient (Deep multi-tone gradient) */}
            <linearGradient id="mangaEyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="35%" stopColor={hairColor} />
              <stop offset="70%" stopColor={activeScent.accentColor || '#0284c7'} />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            {/* Eye Iris Glow */}
            <radialGradient id="mangaIrisGlow" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor={activeScent.accentColor || '#38bdf8'} stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>

            {/* Sclera Shadow (Upper Eyelid Shadow) */}
            <linearGradient id="playerEyeShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Shoujo Manga Angel Ring Hair Highlight (天使の輪) */}
            <linearGradient id="angelHairRing" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="80%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Porcelain Skin Glow */}
            <radialGradient id="skinGlowRing" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="goldTiaraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="33%" stopColor="#c084fc" />
              <stop offset="66%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            <linearGradient id="yukataGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>

            <linearGradient id="bathrobeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="spaDressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fae8ff" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>

          {/* ===== 1. BACK HAIR (Long Anime Locks / Twin-tails / Spikes) ===== */}
          {fashion.hair === 'hair_twin_tails' && (
            <g fill={hairColor}>
              <path d="M54,80 C32,78 12,105 20,138 C28,145 42,132 48,106 Z" />
              <circle cx="54" cy="82" r="5.5" fill="#f43f5e" />
              <path d="M146,80 C168,78 188,105 180,138 C172,145 158,132 152,106 Z" />
              <circle cx="146" cy="82" r="5.5" fill="#f43f5e" />
            </g>
          )}

          {fashion.hair === 'hair_ponytail' && (
            <g fill={hairColor}>
              <path d="M136,52 C168,44 190,75 184,118 C174,128 158,110 142,80 Z" />
              <circle cx="138" cy="56" r="6.5" fill="#38bdf8" />
            </g>
          )}

          {fashion.hair === 'hair_aurora_long' && (
            <g fill="url(#rainbowGrad)" opacity="0.95">
              <path d="M48,88 C26,110 28,168 46,192 C56,164 54,120 58,92 Z" />
              <path d="M152,88 C174,110 172,168 154,192 C144,164 146,120 142,92 Z" />
            </g>
          )}

          {fashion.hair === 'hair_fluffy_curl' && (
            <g fill={hairColor}>
              <circle cx="46" cy="98" r="17" />
              <circle cx="40" cy="120" r="15" />
              <circle cx="154" cy="98" r="17" />
              <circle cx="160" cy="120" r="15" />
            </g>
          )}

          {/* Men's Wolf Hair Back Fringe */}
          {fashion.hair === 'hair_mens_wolf' && (
            <g fill={hairColor}>
              <path d="M52,88 C40,105 44,128 52,142 C56,122 60,105 64,92 Z" />
              <path d="M148,88 C160,105 156,128 148,142 C144,122 140,105 136,92 Z" />
            </g>
          )}

          {/* ===== 2. BODY BASE & CLOTHING ===== */}
          {/* Slender Manga Neck */}
          {isMale ? (
            <rect x="88" y="110" width="24" height="22" rx="5" fill={skinShadow} />
          ) : (
            <rect x="91" y="112" width="18" height="22" rx="6" fill={skinShadow} />
          )}
          {/* Collarbone Lines (少女漫画風の鎖骨) */}
          <path d="M84,127 Q94,133 98,130" stroke="#fdba74" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M116,127 Q106,133 102,130" stroke="#fdba74" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Shoulders */}
          {isMale ? (
            <path d="M48,182 C48,132 74,119 100,119 C126,119 152,132 152,182 Z" fill={skinColor} />
          ) : (
            <path d="M56,182 C56,136 78,123 100,123 C122,123 144,136 144,182 Z" fill={skinColor} />
          )}

          {/* ===== 3. OUTFIT / CLOTHES ===== */}
          {fashion.outfit === 'simple_tee' && (
            <g>
              <path
                d={
                  isMale
                    ? 'M46,182 C46,132 74,120 100,120 C126,120 154,132 154,182 Z'
                    : 'M54,182 C54,136 78,124 100,124 C122,124 146,136 146,182 Z'
                }
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="2"
              />
              <path d={isMale ? 'M82,120 Q100,136 118,120' : 'M86,124 Q100,139 114,124'} fill="none" stroke="#bae6fd" strokeWidth="2.5" />
              <rect x="74" y="145" width="14" height="15" rx="3" fill="#f0f9ff" stroke="#bae6fd" />
              <text x="81" y="156" fontSize="9" textAnchor="middle">
                {activeScent.icon}
              </text>
            </g>
          )}

          {fashion.outfit === 'cozy_pajama' && (
            <g>
              <path
                d={
                  isMale
                    ? 'M46,182 C46,132 74,120 100,120 C126,120 154,132 154,182 Z'
                    : 'M54,182 C54,136 78,124 100,124 C122,124 146,136 146,182 Z'
                }
                fill="#dcfce7"
                stroke="#86efac"
                strokeWidth="2"
              />
              <line x1="75" y1="135" x2="75" y2="180" stroke="#4ade80" strokeWidth="2.5" />
              <line x1="100" y1="135" x2="100" y2="180" stroke="#4ade80" strokeWidth="2.5" />
              <line x1="125" y1="135" x2="125" y2="180" stroke="#4ade80" strokeWidth="2.5" />
              <path d="M88,124 Q100,136 112,124" fill="none" stroke="#22c55e" strokeWidth="2.5" />
            </g>
          )}

          {fashion.outfit === 'soft_bathrobe' && (
            <g>
              <path
                d={
                  isMale
                    ? 'M44,182 C44,130 72,118 100,118 C128,118 156,130 156,182 Z'
                    : 'M52,182 C52,134 76,122 100,122 C124,122 148,134 148,182 Z'
                }
                fill="url(#bathrobeGrad)"
                stroke="#cbd5e1"
                strokeWidth="2"
              />
              <path d="M66,128 L112,180" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
              <path d="M134,128 L88,180" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
              <rect x="66" y="162" width="68" height="9" rx="3" fill="#cbd5e1" />
            </g>
          )}

          {fashion.outfit === 'duck_hoodie' && (
            <g>
              <path
                d={
                  isMale
                    ? 'M44,182 C44,130 72,118 100,118 C128,118 156,130 156,182 Z'
                    : 'M52,182 C52,134 76,122 100,122 C124,122 148,134 148,182 Z'
                }
                fill="#fef08a"
                stroke="#eab308"
                strokeWidth="2"
              />
              <line x1="92" y1="134" x2="92" y2="158" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
              <circle cx="92" cy="159" r="2.5" fill="#ca8a04" />
              <line x1="108" y1="134" x2="108" y2="158" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
              <circle cx="108" cy="159" r="2.5" fill="#ca8a04" />
              <circle cx="100" cy="168" r="7.5" fill="#facc15" />
              <text x="100" y="172" fontSize="9" textAnchor="middle">
                🐥
              </text>
            </g>
          )}

          {fashion.outfit === 'onsen_yukata' && (
            <g>
              <path
                d={
                  isMale
                    ? 'M44,182 C44,128 72,118 100,118 C128,118 156,128 156,182 Z'
                    : 'M50,182 C50,132 75,122 100,122 C125,122 150,132 150,182 Z'
                }
                fill="url(#yukataGrad)"
                stroke="#312e81"
                strokeWidth="2"
              />
              <path d="M70,124 L108,168" stroke="#ffffff" strokeWidth="3" />
              <path d="M130,124 L92,168" stroke="#ffffff" strokeWidth="3" />
              <rect x="66" y="158" width="68" height="12" rx="3" fill="#ef4444" stroke="#b91c1c" />
              <rect x="94" y="156" width="12" height="16" rx="2" fill="#fde047" />
            </g>
          )}

          {fashion.outfit === 'spa_dress' && (
            <g>
              <path
                d="M50,182 C50,132 75,122 100,122 C125,122 150,132 150,182 Z"
                fill="url(#spaDressGrad)"
                stroke="#c084fc"
                strokeWidth="2"
              />
              <path d="M84,124 Q100,140 116,124" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" />
              <circle cx="100" cy="150" r="5" fill="#d946ef" />
              <circle cx="100" cy="165" r="4" fill="#a855f7" />
            </g>
          )}

          {fashion.outfit === 'royal_scent_robe' && (
            <g>
              <path
                d="M46,182 C46,128 72,118 100,118 C128,118 154,128 154,182 Z"
                fill="url(#rainbowGrad)"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <polygon points="100,128 110,144 100,158 90,144" fill="#ffffff" stroke="#f472b6" />
              <circle cx="100" cy="144" r="3" fill="#f59e0b" />
            </g>
          )}

          {/* ===== 4. ARMS & HANDS ===== */}
          <path
            d={isMale ? 'M52,134 Q36,158 46,175' : 'M58,138 Q44,160 52,175'}
            stroke={skinColor}
            strokeWidth={isMale ? '14' : '12'}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={isMale ? 'M148,134 Q164,158 154,175' : 'M142,138 Q156,160 148,175'}
            stroke={skinColor}
            strokeWidth={isMale ? '14' : '12'}
            strokeLinecap="round"
            fill="none"
          />

          {/* ===== 5. HEAD & FACE BASE (ROMANCE MANGA CONTOUR) ===== */}
          {isMale ? (
            // Male sharp masculine jawline (乙女ゲー風の涼やかな輪郭)
            <g>
              <path
                d="M58,70 C58,42 78,35 100,35 C122,35 142,42 142,70 C142,96 128,118 100,122 C72,118 58,96 58,70 Z"
                fill={skinColor}
                stroke={skinShadow}
                strokeWidth="1.5"
              />
              <circle cx="56" cy="78" r="7.5" fill={skinColor} stroke={skinShadow} strokeWidth="1" />
              <circle cx="144" cy="78" r="7.5" fill={skinColor} stroke={skinShadow} strokeWidth="1" />
            </g>
          ) : (
            // Female soft egg-shaped cute face with delicate chin (少女漫画風の小顔輪郭)
            <g>
              <path
                d="M60,68 C60,40 78,34 100,34 C122,34 140,40 140,68 C140,94 125,116 100,120 C75,116 60,94 60,68 Z"
                fill={skinColor}
                stroke={skinShadow}
                strokeWidth="1.5"
              />
              <circle cx="58" cy="80" r="7" fill={skinColor} stroke={skinShadow} strokeWidth="1" />
              <circle cx="142" cy="80" r="7" fill={skinColor} stroke={skinShadow} strokeWidth="1" />
            </g>
          )}

          {/* Porcelain Skin Highlights (Cleanliness >= 80%) */}
          {isGlowingClean && (
            <g opacity="0.85">
              <ellipse cx="100" cy="62" rx="14" ry="6" fill="url(#skinGlowRing)" />
              <ellipse cx="74" cy="88" rx="8" ry="5" fill="url(#skinGlowRing)" />
              <ellipse cx="126" cy="88" rx="8" ry="5" fill="url(#skinGlowRing)" />
              <circle cx="99" cy="87" r="2" fill="#ffffff" opacity="0.9" />
            </g>
          )}

          {/* ROMANCE MANGA BLUSH & HATCHING (女性は愛らしい血色チーク、男性は自然で精悍な肌感) */}
          {!isDirtyStinky && !isSludgeMonster && (
            <g>
              {isMale ? (
                // Male: very subtle and natural masculine warmth only when clean
                isGlowingClean ? (
                  <g opacity="0.35">
                    <circle cx="75" cy="90" r="6" fill="url(#playerMaleBlush)" />
                    <circle cx="125" cy="90" r="6" fill="url(#playerMaleBlush)" />
                  </g>
                ) : null
              ) : (
                <>
                  <ellipse cx="74" cy="90" rx="12" ry="7" fill="url(#playerFemaleBlush)" />
                  <ellipse cx="126" cy="90" rx="12" ry="7" fill="url(#playerFemaleBlush)" />
                  {/* Cute Shoujo Manga Hatching Lines /// */}
                  <line x1="68" y1="87" x2="74" y2="94" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="73" y1="86" x2="79" y2="93" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="78" y1="87" x2="84" y2="94" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" />

                  <line x1="117" y1="87" x2="123" y2="94" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="122" y1="86" x2="128" y2="93" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="127" y1="87" x2="133" y2="94" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" />
                </>
              )}
            </g>
          )}

          {/* Oily / Dirty skin marks */}
          {isOilyTired && (
            <g fill="#fef08a" opacity="0.65">
              <ellipse cx="100" cy="65" rx="12" ry="5" />
              <ellipse cx="76" cy="88" rx="6" ry="4" />
              <ellipse cx="124" cy="88" rx="6" ry="4" />
            </g>
          )}

          {(isDirtyStinky || isSludgeMonster) && (
            <g fill="#451a03" opacity={isSludgeMonster ? 0.75 : 0.5}>
              <ellipse cx="76" cy="72" rx="6" ry="4" transform="rotate(-15 76 72)" />
              <circle cx="124" cy="68" r="4.5" />
              <ellipse cx="126" cy="95" rx="7" ry="4" transform="rotate(20 126 95)" />
              <circle cx="72" cy="98" r="3.5" />
            </g>
          )}

          {/* Face Accessories */}
          {fashion.accessory === 'steam_blush' && !isDirtyStinky && !isSludgeMonster && (
            <g>
              <circle cx="74" cy="89" r="9" fill="#f43f5e" opacity="0.5" />
              <circle cx="126" cy="89" r="9" fill="#f43f5e" opacity="0.5" />
            </g>
          )}

          {fashion.accessory === 'heart_blush' && (
            <g fill="#ec4899">
              <text x="73" y="93" fontSize="10" textAnchor="middle">
                💖
              </text>
              <text x="127" y="93" fontSize="10" textAnchor="middle">
                💖
              </text>
            </g>
          )}

          {/* ===== 6. ROMANCE MANGA EYES (少女漫画・恋する瞳) ===== */}
          {isWinking ? (
            // Winking Expression (愛されウインク)
            <g>
              {/* Left Eye: Winking lash */}
              <path d="M68,78 Q77,71 86,78" stroke="#0f172a" strokeWidth="3.4" strokeLinecap="round" fill="none" />
              <path d="M84,74 Q89,70 92,73" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M70,76 Q66,73 64,75" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Right Eye: Wide Sparkling Eye */}
              <ellipse cx="123" cy="78" rx="8" ry="10" fill="#ffffff" />
              <ellipse cx="123" cy="78" rx="8" ry="10" fill="url(#playerEyeShadow)" />
              <ellipse cx="123" cy="78" rx="7" ry="9" fill="url(#mangaEyeGrad)" />
              <ellipse cx="123" cy="82" rx="5" ry="4" fill="url(#mangaIrisGlow)" />
              <circle cx="120" cy="74" r="3.2" fill="#ffffff" />
              <circle cx="125" cy="83" r="1.5" fill="#ffffff" />
              <polygon points="123,78 124,80 126,81 124,82 123,84 122,82 120,81 122,80" fill="#ffffff" opacity="0.9" />

              {/* Right Eyelashes */}
              <path d="M113,71 Q123,66 133,72" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              <path d="M129,69 Q133,66 136,69" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          ) : isSludgeMonster ? (
            <g stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <path d="M74,79 C74,75 82,75 82,79 C82,83 72,83 72,79 C72,72 84,72 84,79" />
              <path d="M116,79 C116,75 124,75 124,79 C124,83 114,83 114,79 C114,72 126,72 126,79" />
            </g>
          ) : isDirtyStinky ? (
            <g stroke="#475569" strokeWidth="2.2" fill="none" strokeLinecap="round">
              <path d="M75,79 C75,76 81,76 81,79 C81,82 73,82 73,79 C73,73 83,73 83,79" />
              <path d="M117,79 C117,76 123,76 123,79 C123,82 115,82 115,79 C115,73 125,73 125,79" />
            </g>
          ) : isOilyTired ? (
            <g fill="#334155">
              <ellipse cx="78" cy="80" rx="5.5" ry="6.5" />
              <circle cx="76" cy="78" r="1.8" fill="#ffffff" />
              <ellipse cx="122" cy="80" rx="5.5" ry="6.5" />
              <circle cx="120" cy="78" r="1.8" fill="#ffffff" />
              <path d="M72,71 Q78,75 84,73" stroke="#475569" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M128,71 Q122,75 116,73" stroke="#475569" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          ) : isMale ? (
            // MALE: Sharp, Cool Handsome Manga Hero Eyes (乙女ゲーヒーロー風の美麗アイ)
            <g>
              {/* Left Eye */}
              <ellipse cx="78" cy="78" rx="8" ry="9" fill="#ffffff" />
              <ellipse cx="78" cy="78" rx="8" ry="9" fill="url(#playerEyeShadow)" />
              <ellipse cx="78" cy="78" rx="7" ry="8" fill="url(#mangaEyeGrad)" />
              <ellipse cx="78" cy="81" rx="5" ry="3.5" fill="url(#mangaIrisGlow)" />
              <circle cx="75" cy="75" r="2.8" fill="#ffffff" />
              <circle cx="81" cy="81" r="1.4" fill="#ffffff" />
              {/* Left Sharp Eyelashes & Double Eyelid */}
              <path d="M70,68 Q78,64 85,67" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M68,72 Q78,67 88,71" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              <path d="M86,69 L90,70" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Right Eye */}
              <ellipse cx="122" cy="78" rx="8" ry="9" fill="#ffffff" />
              <ellipse cx="122" cy="78" rx="8" ry="9" fill="url(#playerEyeShadow)" />
              <ellipse cx="122" cy="78" rx="7" ry="8" fill="url(#mangaEyeGrad)" />
              <ellipse cx="122" cy="81" rx="5" ry="3.5" fill="url(#mangaIrisGlow)" />
              <circle cx="119" cy="75" r="2.8" fill="#ffffff" />
              <circle cx="125" cy="81" r="1.4" fill="#ffffff" />
              {/* Right Sharp Eyelashes & Double Eyelid */}
              <path d="M115,67 Q122,64 130,68" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M112,71 Q122,67 132,72" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              <path d="M130,70 L134,69" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Masculine Eyebrows */}
              <path d="M68,66 L86,65" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
              <path d="M114,65 L132,66" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            // FEMALE: Gorgeous Big Shoujo Manga Sparkling Eyes (王道少女漫画のうるうる光彩アイ)
            <g>
              {/* Left Eye */}
              <ellipse cx="77" cy="78" rx="8.5" ry="10.5" fill="#ffffff" />
              <ellipse cx="77" cy="78" rx="8.5" ry="10.5" fill="url(#playerEyeShadow)" />
              <ellipse cx="77" cy="78" rx="7.4" ry="9.4" fill="url(#mangaEyeGrad)" />
              <ellipse cx="77" cy="82" rx="5.5" ry="4.5" fill="url(#mangaIrisGlow)" />
              {/* Sparkle Highlights */}
              <circle cx="74" cy="74" r="3.4" fill="#ffffff" />
              <circle cx="81" cy="83" r="1.6" fill="#ffffff" />
              <polygon points="77,78 78,80 80,81 78,82 77,84 76,82 74,81 76,80" fill="#ffffff" opacity="0.85" />

              {/* Left Lashes & Double Eyelid */}
              <path d="M70,68 Q78,64 85,68" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M67,72 Q77,66 87,71" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              <path d="M85,69 Q89,66 92,69" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M69,74 Q66,72 64,74" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" fill="none" />

              {/* Right Eye */}
              <ellipse cx="123" cy="78" rx="8.5" ry="10.5" fill="#ffffff" />
              <ellipse cx="123" cy="78" rx="8.5" ry="10.5" fill="url(#playerEyeShadow)" />
              <ellipse cx="123" cy="78" rx="7.4" ry="9.4" fill="url(#mangaEyeGrad)" />
              <ellipse cx="123" cy="82" rx="5.5" ry="4.5" fill="url(#mangaIrisGlow)" />
              {/* Sparkle Highlights */}
              <circle cx="120" cy="74" r="3.4" fill="#ffffff" />
              <circle cx="127" cy="83" r="1.6" fill="#ffffff" />
              <polygon points="123,78 124,80 126,81 124,82 123,84 122,82 120,81 122,80" fill="#ffffff" opacity="0.85" />

              {/* Right Lashes & Double Eyelid */}
              <path d="M115,68 Q122,64 130,68" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M113,71 Q123,66 133,72" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              <path d="M129,69 Q133,66 136,69" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M131,74 Q134,72 136,74" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" fill="none" />

              {/* Soft Eyebrows */}
              <path d="M70,65 Q78,61 87,65" stroke={hairColor} strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <path d="M113,65 Q122,61 130,65" stroke={hairColor} strokeWidth="2.4" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* Glasses Accessory */}
          {fashion.accessory === 'bath_glasses' && (
            <g stroke="#0284c7" strokeWidth="2.5" fill="rgba(186,230,253,0.35)">
              <circle cx="77" cy="78" r="12" />
              <circle cx="123" cy="78" r="12" />
              <line x1="89" y1="78" x2="111" y2="78" />
              <line x1="65" y1="76" x2="56" y2="79" />
              <line x1="135" y1="76" x2="144" y2="79" />
            </g>
          )}

          {/* Manga Nose & Highlight */}
          <g>
            <path d="M99,87 Q100,90 98,91" stroke="#fba06a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="98.5" cy="88" r="1.2" fill="#ffffff" opacity="0.9" />
          </g>

          {/* Manga Lip & Gloss */}
          {isGlowingClean ? (
            <g>
              <path d="M93,95 Q100,104 107,95" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="100" cy="99" rx="3.2" ry="1.4" fill="#ffffff" opacity="0.85" />
            </g>
          ) : isSludgeMonster ? (
            <path d="M92,100 Q96,94 100,100 Q104,106 108,100" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
          ) : isDirtyStinky ? (
            <path d="M93,98 Q97,94 100,98 Q103,102 107,98" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          ) : isOilyTired ? (
            <path d="M95,98 Q100,94 105,98" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <g>
              <path d="M94,96 Q100,102 106,96" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="100" cy="98.5" r="1" fill="#f43f5e" opacity="0.5" />
            </g>
          )}

          {/* ===== 7. FRONT HAIR & BANGS ===== */}
          <g fill={hairColor}>
            {fashion.hair === 'hair_mens_short' && (
              <g>
                <path d="M56,66 C56,36 78,30 100,30 C122,30 144,36 144,66 C138,56 124,52 116,60 C108,52 94,50 86,58 C78,52 66,56 56,66 Z" />
                <polygon points="90,30 94,20 102,30" />
                <polygon points="106,30 112,22 118,32" />
                <polygon points="76,36 72,26 82,34" />
                <path d="M56,66 L54,82 L60,80 Z" />
                <path d="M144,66 L146,82 L140,80 Z" />
              </g>
            )}

            {fashion.hair === 'hair_mens_center' && (
              <g>
                <path d="M54,68 C54,36 78,30 100,32 C122,30 146,36 146,68 C140,56 126,56 116,70 C106,56 100,48 94,48 C88,48 82,56 72,70 C64,56 58,58 54,68 Z" />
                <path d="M54,64 C50,76 52,90 56,96 C56,84 56,72 60,64 Z" />
                <path d="M146,64 C150,76 148,90 144,96 C144,84 144,72 140,64 Z" />
              </g>
            )}

            {fashion.hair === 'hair_mens_wolf' && (
              <g>
                <path d="M54,66 C54,34 78,28 100,28 C122,28 146,34 146,66 C138,54 122,62 114,56 C106,64 94,56 86,62 C76,54 64,58 54,66 Z" />
                <polygon points="68,38 60,26 74,34" />
                <polygon points="90,30 94,16 102,30" />
                <polygon points="126,36 136,26 124,34" />
                <path d="M56,64 C50,78 52,94 58,100 C56,88 58,76 62,66 Z" />
                <path d="M144,64 C150,78 148,94 142,100 C144,88 142,76 138,66 Z" />
              </g>
            )}

            {fashion.hair === 'hair_mens_god' && (
              <g>
                <path d="M54,64 C54,32 78,26 100,26 C122,26 146,32 146,64 C138,52 120,56 112,48 C104,56 96,50 88,56 C80,50 68,54 54,64 Z" />
                <polygon points="86,26 92,14 98,26" fill="#eab308" />
                <polygon points="102,26 108,14 114,26" fill="#eab308" />
                <polygon points="72,32 68,20 78,30" fill="#eab308" />
                <polygon points="122,32 128,20 118,30" fill="#eab308" />
              </g>
            )}

            {/* FEMALE & SHARED BANGS */}
            {(fashion.hair === 'hair_short_bob' ||
              fashion.hair === 'hair_wavy_medium' ||
              fashion.hair === 'hair_twin_tails' ||
              fashion.hair === 'hair_ponytail' ||
              fashion.hair === 'hair_fluffy_curl' ||
              fashion.hair === 'hair_aurora_long' ||
              (!fashion.hair.startsWith('hair_mens_') && !isMale)) && (
              <g>
                <path d="M56,64 C56,38 78,32 100,32 C122,32 144,38 144,64 C134,56 122,64 114,58 C106,64 96,58 88,64 C80,58 68,62 56,64 Z" />
                {/* Flowing Side Locks */}
                <path d="M56,64 C52,78 56,102 62,106 C60,94 60,80 62,66 Z" />
                <path d="M144,64 C148,78 144,102 138,106 C140,94 140,80 138,66 Z" />
              </g>
            )}
          </g>

          {/* ===== ANGEL RING (天使の輪 多層ハイライト) for Cleanliness >= 80% ===== */}
          {isGlowingClean && (
            <g>
              <ellipse cx="100" cy="42" rx="28" ry="7" fill="url(#angelHairRing)" />
              <circle cx="85" cy="42" r="1.4" fill="#ffffff" />
              <circle cx="115" cy="42" r="1.4" fill="#ffffff" />
            </g>
          )}

          {/* ===== 8. HEADWEAR / HATS ===== */}
          {fashion.head === 'towel_wrap' && (
            <g>
              <ellipse cx="100" cy="44" rx="36" ry="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="100" cy="30" r="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M88,42 Q100,48 112,42" fill="none" stroke="#94a3b8" strokeWidth="2" />
            </g>
          )}

          {fashion.head === 'shower_cap' && (
            <g>
              <path
                d="M62,46 C62,24 80,20 100,20 C120,20 138,24 138,46 C144,50 140,58 136,56 C130,50 118,52 100,52 C82,52 70,50 64,56 C60,58 56,50 62,46 Z"
                fill="#fbcfe8"
                stroke="#f472b6"
                strokeWidth="2"
              />
              <circle cx="70" cy="52" r="3" fill="#f472b6" />
              <circle cx="85" cy="52" r="3" fill="#f472b6" />
              <circle cx="100" cy="52" r="3" fill="#f472b6" />
              <circle cx="115" cy="52" r="3" fill="#f472b6" />
              <circle cx="130" cy="52" r="3" fill="#f472b6" />
            </g>
          )}

          {fashion.head === 'ribbon_band' && (
            <g>
              <path d="M58,52 C58,36 78,32 100,32 C122,32 142,36 142,52" stroke="#fed7aa" strokeWidth="8" fill="none" strokeLinecap="round" />
              <polygon points="100,30 82,18 86,36 100,32 114,36 118,18" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
              <circle cx="100" cy="31" r="5" fill="#fdba74" />
            </g>
          )}

          {fashion.head === 'duck_hat' && (
            <g>
              <ellipse cx="100" cy="38" rx="32" ry="18" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
              <ellipse cx="100" cy="40" rx="10" ry="6" fill="#f97316" />
              <circle cx="88" cy="32" r="3.5" fill="#0f172a" />
              <circle cx="87" cy="31" r="1" fill="#ffffff" />
              <circle cx="112" cy="32" r="3.5" fill="#0f172a" />
              <circle cx="111" cy="31" r="1" fill="#ffffff" />
            </g>
          )}

          {fashion.head === 'bubble_beret' && (
            <g>
              <ellipse cx="106" cy="34" rx="34" ry="16" transform="rotate(-8 106 34)" fill="#c7d2fe" stroke="#6366f1" strokeWidth="2" />
              <circle cx="100" cy="20" r="4" fill="#a5b4fc" />
              <circle cx="120" cy="32" r="5" fill="#38bdf8" opacity="0.8" />
            </g>
          )}

          {fashion.head === 'steam_crown' && (
            <g>
              <polygon points="76,36 86,16 100,26 114,16 124,36 100,40" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
              <circle cx="86" cy="16" r="3" fill="#38bdf8" />
              <circle cx="100" cy="26" r="3.5" fill="#0284c7" />
              <circle cx="114" cy="16" r="3" fill="#38bdf8" />
            </g>
          )}

          {fashion.head === 'rainbow_tiara' && (
            <g>
              <polygon points="74,36 84,12 100,22 116,12 126,36 100,40" fill="url(#goldTiaraGrad)" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="84" cy="12" r="3.5" fill="#f43f5e" />
              <circle cx="100" cy="22" r="4.5" fill="#38bdf8" />
              <circle cx="116" cy="12" r="3.5" fill="#a855f7" />
              <polygon points="100,6 103,14 111,16 105,22 107,30 100,25 93,30 95,22 89,16 97,14" fill="#fef08a" />
            </g>
          )}

          {/* ===== 9. HELD HAND ITEMS ===== */}
          {fashion.hand === 'rubber_duck' && (
            <g transform="translate(142, 142)">
              <ellipse cx="14" cy="16" rx="14" ry="11" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              <circle cx="8" cy="10" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              <polygon points="2,10 -4,12 2,14" fill="#ea580c" />
              <circle cx="6" cy="8" r="1.5" fill="#000000" />
            </g>
          )}

          {fashion.hand === 'fluffy_sponge' && (
            <g transform="translate(142, 145)">
              <ellipse cx="12" cy="14" rx="13" ry="9" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
              <circle cx="8" cy="12" r="1.5" fill="#ca8a04" opacity="0.4" />
              <circle cx="15" cy="15" r="2" fill="#ca8a04" opacity="0.4" />
              <circle cx="14" cy="4" r="3.5" fill="#ffffff" opacity="0.9" />
            </g>
          )}

          {fashion.hand === 'bubble_wand' && (
            <g transform="translate(145, 130)">
              <line x1="0" y1="35" x2="14" y2="8" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
              <circle cx="16" cy="6" r="8" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
              <circle cx="26" cy="-4" r="5" fill="#cffafe" stroke="#38bdf8" opacity="0.8" />
            </g>
          )}

          {fashion.hand === 'fizzy_bathbomb' && (
            <g transform="translate(142, 142)">
              <circle cx="14" cy="14" r="12" fill="url(#rainbowGrad)" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="3" fill="#ffffff" opacity="0.7" />
              <circle cx="24" cy="4" r="2.5" fill="#fbcfe8" opacity="0.9" />
            </g>
          )}

          {fashion.hand === 'scented_perfume' && (
            <g transform="translate(142, 138)">
              <rect x="6" y="10" width="16" height="20" rx="4" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" />
              <rect x="11" y="4" width="6" height="6" rx="1" fill="#c084fc" />
              <circle cx="14" cy="2" r="3" fill="#f43f5e" />
              <text x="14" y="24" fontSize="8" textAnchor="middle">
                ✨
              </text>
            </g>
          )}

          {fashion.hand === 'sacred_bath_staff' && (
            <g transform="translate(142, 115)">
              <line x1="2" y1="65" x2="16" y2="15" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" />
              <polygon points="16,0 20,10 30,12 23,19 25,29 16,24 7,29 9,19 2,12 12,10" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
              <circle cx="16" cy="14" r="4" fill="#38bdf8" />
            </g>
          )}

          {/* UR Angel Halo */}
          {fashion.accessory === 'angel_bubble_aura' && (
            <g>
              <ellipse cx="100" cy="16" rx="34" ry="8" fill="none" stroke="url(#rainbowGrad)" strokeWidth="3.5" opacity="0.9" />
              <circle cx="68" cy="16" r="3" fill="#ffffff" />
              <circle cx="132" cy="16" r="3" fill="#ffffff" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
