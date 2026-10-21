import React from 'react';
import { motion } from 'motion/react';
import { RomancePartner, PartnerExpression } from '../types';

interface RomancePartnerAvatarProps {
  partner: RomancePartner;
  expression?: PartnerExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isBlushing?: boolean;
  isAnimated?: boolean;
  isStinkyPlayer?: boolean;
}

export const RomancePartnerAvatar: React.FC<RomancePartnerAvatarProps> = ({
  partner,
  expression = 'normal',
  size = 'lg',
  isBlushing = false,
  isAnimated = true,
  isStinkyPlayer = false,
}) => {
  const isFemale = partner.gender === 'female';
  const effectiveExpr = isStinkyPlayer ? 'shocked' : expression;

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-60 h-60',
    xl: 'w-72 h-72',
  }[size];

  // Specific theme variables
  const hairColor = partner.avatarTheme.hairColor;
  const eyeColor = partner.avatarTheme.eyeColor;
  const themeColor = partner.avatarTheme.themeColor;

  return (
    <div className={`relative ${sizeClasses} flex items-center justify-center select-none`}>
      {/* Background Romantic Aura Glow */}
      <div
        className="absolute inset-2 rounded-full filter blur-xl opacity-35 animate-pulse pointer-events-none"
        style={{ backgroundColor: partner.accentColor }}
      />

      {/* Floating Romance Manga Petals & Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-full">
        <motion.div
          animate={{
            y: [-10, 80],
            x: [-15, 25],
            rotate: [0, 180],
            opacity: [0, 0.65, 0],
          }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="absolute top-2 left-4 text-xs opacity-60"
        >
          {isFemale ? '🌸' : '✨'}
        </motion.div>
        <motion.div
          animate={{
            y: [-10, 80],
            x: [20, -15],
            rotate: [0, -180],
            opacity: [0, 0.55, 0],
          }}
          transition={{ repeat: Infinity, duration: 5.2, delay: 1.8, ease: 'easeInOut' }}
          className="absolute top-4 right-4 text-xs opacity-50"
        >
          {isFemale ? '✨' : '💫'}
        </motion.div>
      </div>

      {/* Floating Hearts & Manga Emotes when in Loving / Blushing expression */}
      {(effectiveExpr === 'loving' || effectiveExpr === 'blushing' || isBlushing) && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <motion.div
            animate={{ y: [-5, -30], x: [-8, -18], opacity: [0, 1, 0], scale: [0.6, 1.2] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
            className="absolute top-3 left-4 text-lg text-pink-500 drop-shadow-sm"
          >
            💖
          </motion.div>
          <motion.div
            animate={{ y: [-8, -34], x: [8, 18], opacity: [0, 1, 0], scale: [0.6, 1.2] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.8, ease: 'easeOut' }}
            className="absolute top-5 right-4 text-base text-rose-400 drop-shadow-sm"
          >
            {isFemale ? '💕' : '✨'}
          </motion.div>
          {/* Dokidoki Manga FX */}
          <motion.div
            animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.75, 1, 0.75] }}
            transition={{ repeat: Infinity, duration: 1.3 }}
            className={`absolute -bottom-1 -right-2 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs border ${
              isFemale
                ? 'text-pink-500 bg-white/95 border-pink-200'
                : 'text-indigo-600 bg-white/95 border-indigo-200'
            }`}
          >
            {isFemale ? 'ドキッ♡' : 'ドキッ…'}
          </motion.div>
        </div>
      )}

      {/* Shocked Sweatdrop & Lines when player is stinky */}
      {effectiveExpr === 'shocked' && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <motion.div
            animate={{ y: [0, 7, 0], opacity: [0.85, 1, 0.85] }}
            transition={{ repeat: Infinity, duration: 1.0 }}
            className="absolute top-1 right-6 text-2xl drop-shadow-md"
          >
            💦
          </motion.div>
          <motion.div
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="absolute -top-3 left-6 text-xl"
          >
            💨
          </motion.div>
        </div>
      )}

      {/* Main Romance Manga SVG Portrait */}
      <motion.div
        animate={
          isAnimated
            ? effectiveExpr === 'loving' || effectiveExpr === 'blushing'
              ? { y: [0, -3.5, 0], scale: [1, 1.02, 1] }
              : effectiveExpr === 'shocked'
              ? { x: [-3, 3, -3], y: [0, 2, 0] }
              : { y: [0, -3, 0] }
            : {}
        }
        transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut' }}
        className="w-full h-full relative z-10 filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.18)]"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            {/* Female Romantic Blush Gradient */}
            <radialGradient id={`partnerFemaleBlush_${partner.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#fb7185" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>

            {/* Male Subtle Warmth Gradient (男らしい自然な微血色) */}
            <radialGradient id={`partnerMaleBlush_${partner.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#fb7185" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
            </radialGradient>

            {/* Romance Manga Eye Iris Gradient */}
            <linearGradient id={`partnerEyeGrad_${partner.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="30%" stopColor={hairColor} />
              <stop offset="70%" stopColor={eyeColor} />
              <stop offset="100%" stopColor={themeColor} />
            </linearGradient>

            {/* Iris Glow */}
            <radialGradient id={`partnerIrisGlow_${partner.id}`} cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor={themeColor} stopOpacity="0.75" />
              <stop offset="100%" stopColor={eyeColor} stopOpacity="0" />
            </radialGradient>

            {/* Upper Sclera Shadow */}
            <linearGradient id="upperEyeShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#cbd5e1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Hair Angel Ring Highlights */}
            <linearGradient id={`partnerHairShine_${partner.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Male Hair Gloss for Sharp Texture */}
            <linearGradient id={`maleHairTexture_${partner.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={themeColor} stopOpacity="0.6" />
              <stop offset="50%" stopColor={hairColor} />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>

            {/* Clothes Gradient */}
            <linearGradient id={`partnerClothes_${partner.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={themeColor} />
              <stop offset="50%" stopColor={hairColor} />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* ========================================================================= */}
          {/* ===================== FEMALE PARTNER RENDERING ========================== */}
          {/* ========================================================================= */}
          {isFemale ? (
            <g>
              {/* --- 1. Female Back Hair Volume --- */}
              <g fill={hairColor}>
                {partner.id === 'aoi' && (
                  // Aoi's Signature High Twin-tails
                  <g>
                    <path d="M40,76 C12,88 8,142 24,178 C32,150 34,106 46,84 Z" />
                    <path d="M160,76 C188,88 192,142 176,178 C168,150 166,106 154,84 Z" />
                    {/* Cute Red Ribbons */}
                    <circle cx="44" cy="80" r="5.5" fill="#f43f5e" />
                    <polygon points="44,80 30,92 38,96" fill="#e11d48" />
                    <circle cx="156" cy="80" r="5.5" fill="#f43f5e" />
                    <polygon points="156,80 170,92 162,96" fill="#e11d48" />
                  </g>
                )}

                {partner.id === 'shizuku' && (
                  // Shizuku's Soft Flowing Wavy Locks
                  <g>
                    <path d="M38,82 C16,108 14,174 34,196 C48,168 44,120 52,90 Z" />
                    <path d="M162,82 C184,108 186,174 166,196 C152,168 156,120 148,90 Z" />
                  </g>
                )}
              </g>

              {/* --- 2. Female Slender Neck & Shoulders --- */}
              <rect x="92" y="112" width="16" height="22" rx="5" fill="#fff7ed" />
              <ellipse cx="100" cy="115" rx="10" ry="3.5" fill="#fdba74" opacity="0.5" />
              {/* Delicate Collarbones */}
              <path d="M85,127 Q94,133 98,130" stroke="#fba06a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              <path d="M115,127 Q106,133 102,130" stroke="#fba06a" strokeWidth="1.4" fill="none" strokeLinecap="round" />

              {/* Female Outfit */}
              <path
                d="M52,185 C52,135 76,123 100,123 C124,123 148,135 148,185 Z"
                fill={`url(#partnerClothes_${partner.id})`}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              {/* Sailor Collar & Ribbon */}
              <path d="M70,125 L100,166 L130,125 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
              <path d="M78,127 L100,158 L122,127" fill="none" stroke="#bae6fd" strokeWidth="1.5" />
              <polygon points="100,140 88,162 100,154 112,162" fill="#f43f5e" />
              <polygon points="100,140 82,136 88,146" fill="#e11d48" />
              <polygon points="100,140 118,136 112,146" fill="#e11d48" />
              <circle cx="100" cy="140" r="4.5" fill="#fb7185" stroke="#f43f5e" strokeWidth="1" />

              {/* --- 3. Female Petite Face & Ears --- */}
              <path
                d="M58,68 C58,40 78,34 100,34 C122,34 142,40 142,68 C142,94 125,117 100,121 C75,117 58,94 58,68 Z"
                fill="#fff7ed"
                stroke="#fed7aa"
                strokeWidth="1.2"
              />
              <circle cx="56" cy="80" r="7.5" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
              <circle cx="144" cy="80" r="7.5" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />

              {/* --- 4. Female Romantic Blushing & Hatching --- */}
              {(effectiveExpr === 'blushing' || effectiveExpr === 'loving' || isBlushing) ? (
                <g>
                  <ellipse cx="73" cy="90" rx="14" ry="8" fill={`url(#partnerFemaleBlush_${partner.id})`} />
                  <ellipse cx="127" cy="90" rx="14" ry="8" fill={`url(#partnerFemaleBlush_${partner.id})`} />
                  <ellipse cx="100" cy="88" rx="8" ry="4" fill={`url(#partnerFemaleBlush_${partner.id})`} opacity="0.6" />
                  {/* Shoujo Blush Hatching Lines /// */}
                  <line x1="66" y1="87" x2="72" y2="94" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="71" y1="86" x2="77" y2="93" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="76" y1="87" x2="82" y2="94" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="118" y1="87" x2="124" y2="94" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="123" y1="86" x2="129" y2="93" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="128" y1="87" x2="134" y2="94" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" />
                </g>
              ) : (
                <g opacity="0.55">
                  <ellipse cx="74" cy="90" rx="10" ry="6" fill={`url(#partnerFemaleBlush_${partner.id})`} />
                  <ellipse cx="126" cy="90" rx="10" ry="6" fill={`url(#partnerFemaleBlush_${partner.id})`} />
                  <line x1="70" y1="88" x2="74" y2="93" stroke="#fb7185" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="75" y1="88" x2="79" y2="93" stroke="#fb7185" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="121" y1="88" x2="125" y2="93" stroke="#fb7185" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="126" y1="88" x2="130" y2="93" stroke="#fb7185" strokeWidth="1.2" strokeLinecap="round" />
                </g>
              )}

              {/* --- 5. Female Shoujo Sparkling Eyes --- */}
              {effectiveExpr === 'loving' ? (
                <g>
                  <ellipse cx="77" cy="78" rx="8.5" ry="10.5" fill="#ffffff" />
                  <ellipse cx="77" cy="78" rx="8.5" ry="10.5" fill="url(#upperEyeShadow)" />
                  <ellipse cx="123" cy="78" rx="8.5" ry="10.5" fill="#ffffff" />
                  <ellipse cx="123" cy="78" rx="8.5" ry="10.5" fill="url(#upperEyeShadow)" />

                  <ellipse cx="77" cy="78" rx="7.5" ry="9.5" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <ellipse cx="77" cy="82" rx="5.5" ry="4.5" fill={`url(#partnerIrisGlow_${partner.id})`} />
                  <ellipse cx="123" cy="78" rx="7.5" ry="9.5" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <ellipse cx="123" cy="82" rx="5.5" ry="4.5" fill={`url(#partnerIrisGlow_${partner.id})`} />

                  <text x="77" y="82" fontSize="9" fill="#f43f5e" textAnchor="middle">
                    💖
                  </text>
                  <circle cx="73" cy="73" r="3.2" fill="#ffffff" />
                  <circle cx="81" cy="84" r="1.6" fill="#ffffff" />

                  <text x="123" y="82" fontSize="9" fill="#f43f5e" textAnchor="middle">
                    💖
                  </text>
                  <circle cx="119" cy="73" r="3.2" fill="#ffffff" />
                  <circle cx="127" cy="84" r="1.6" fill="#ffffff" />

                  <path d="M68,72 Q77,66 86,71" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M85,69 Q89,66 91,70" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M114,71 Q123,66 132,72" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M129,69 Q133,66 135,70" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M69,66 Q77,61 86,65" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M114,65 Q123,61 131,66" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </g>
              ) : effectiveExpr === 'wink' ? (
                <g>
                  <path d="M68,78 Q77,71 86,78" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M84,74 Q89,70 92,73" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  <ellipse cx="123" cy="78" rx="8.5" ry="10.5" fill="#ffffff" />
                  <ellipse cx="123" cy="78" rx="7.5" ry="9.5" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <ellipse cx="123" cy="82" rx="5.5" ry="4.5" fill={`url(#partnerIrisGlow_${partner.id})`} />
                  <circle cx="120" cy="74" r="3.4" fill="#ffffff" />
                  <circle cx="125" cy="83" r="1.6" fill="#ffffff" />
                  <path d="M114,71 Q123,66 132,72" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M129,69 Q133,66 135,70" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M70,66 Q77,61 85,65" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M114,64 Q123,60 130,65" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </g>
              ) : effectiveExpr === 'shocked' ? (
                <g>
                  <ellipse cx="77" cy="78" rx="4.5" ry="4.5" fill="#0f172a" />
                  <ellipse cx="123" cy="78" rx="4.5" ry="4.5" fill="#0f172a" />
                  <path d="M68,64 L86,70" stroke={hairColor} strokeWidth="2.8" strokeLinecap="round" fill="none" />
                  <path d="M132,64 L114,70" stroke={hairColor} strokeWidth="2.8" strokeLinecap="round" fill="none" />
                </g>
              ) : effectiveExpr === 'pout' ? (
                <g>
                  <ellipse cx="76" cy="78" rx="8" ry="10" fill="#ffffff" />
                  <ellipse cx="120" cy="78" rx="8" ry="10" fill="#ffffff" />
                  <ellipse cx="74" cy="78" rx="7" ry="9" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <circle cx="72" cy="74" r="3" fill="#ffffff" />
                  <ellipse cx="118" cy="78" rx="7" ry="9" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <circle cx="116" cy="74" r="3" fill="#ffffff" />
                  <path d="M68,71 Q76,66 84,71" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M112,71 Q120,66 128,71" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M70,64 L85,69" stroke={hairColor} strokeWidth="2.8" strokeLinecap="round" fill="none" />
                  <path d="M130,64 L115,69" stroke={hairColor} strokeWidth="2.8" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                // Standard Sparkling Shoujo Eyes
                <g>
                  <ellipse cx="77" cy="78" rx="8.5" ry="10.5" fill="#ffffff" />
                  <ellipse cx="77" cy="78" rx="8.5" ry="10.5" fill="url(#upperEyeShadow)" />
                  <ellipse cx="77" cy="78" rx="7.4" ry="9.4" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <ellipse cx="77" cy="82" rx="5.5" ry="4.5" fill={`url(#partnerIrisGlow_${partner.id})`} />
                  <circle cx="74" cy="74" r="3.4" fill="#ffffff" />
                  <circle cx="81" cy="83" r="1.6" fill="#ffffff" />
                  <polygon points="77,78 78,80 80,81 78,82 77,84 76,82 74,81 76,80" fill="#ffffff" opacity="0.85" />

                  <path d="M70,68 Q78,64 85,68" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M67,72 Q77,66 87,71" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  <path d="M85,69 Q89,66 92,69" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  <path d="M69,74 Q66,72 64,74" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  <path d="M73,88 Q77,90 82,88" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                  <ellipse cx="123" cy="78" rx="8.5" ry="10.5" fill="#ffffff" />
                  <ellipse cx="123" cy="78" rx="8.5" ry="10.5" fill="url(#upperEyeShadow)" />
                  <ellipse cx="123" cy="78" rx="7.4" ry="9.4" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <ellipse cx="123" cy="82" rx="5.5" ry="4.5" fill={`url(#partnerIrisGlow_${partner.id})`} />
                  <circle cx="120" cy="74" r="3.4" fill="#ffffff" />
                  <circle cx="127" cy="83" r="1.6" fill="#ffffff" />
                  <polygon points="123,78 124,80 126,81 124,82 123,84 122,82 120,81 122,80" fill="#ffffff" opacity="0.85" />

                  <path d="M115,68 Q122,64 130,68" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M113,71 Q123,66 133,72" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  <path d="M129,69 Q133,66 136,69" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  <path d="M131,74 Q134,72 136,74" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  <path d="M118,88 Q123,90 127,88" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                  <path d="M70,65 Q78,61 87,65" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M113,65 Q122,61 130,65" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </g>
              )}

              {/* Nose & Lip */}
              <path d="M99,86 Q100,89 98,90" stroke="#fba06a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <circle cx="98.5" cy="87.5" r="1.2" fill="#ffffff" opacity="0.9" />

              {effectiveExpr === 'loving' ? (
                <g>
                  <path d="M93,96 Q100,105 107,96" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                  <ellipse cx="100" cy="100" rx="3.5" ry="1.5" fill="#ffffff" opacity="0.8" />
                </g>
              ) : effectiveExpr === 'pout' ? (
                <path d="M94,99 Q100,94 106,99" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
              ) : effectiveExpr === 'shocked' ? (
                <ellipse cx="100" cy="98" rx="5" ry="6" fill="#1e293b" />
              ) : (
                <g>
                  <path d="M94,96 Q100,102 106,96" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="100" cy="99" r="1.5" fill="#f43f5e" opacity="0.5" />
                </g>
              )}

              {/* --- 6. Female Front Hair & Bangs --- */}
              <g fill={hairColor}>
                {partner.id === 'aoi' && (
                  <g>
                    <path d="M56,66 C56,36 78,28 100,28 C122,28 144,36 144,66 C136,52 122,60 114,52 C104,62 96,54 86,60 C76,52 66,56 56,66 Z" />
                    <path d="M56,66 C50,80 54,105 62,112 C60,96 58,78 64,68 Z" />
                    <path d="M144,66 C150,80 146,105 138,112 C140,96 142,78 136,68 Z" />
                    <path d="M100,28 Q106,12 116,18 Q108,24 102,30 Z" />
                  </g>
                )}

                {partner.id === 'shizuku' && (
                  <g>
                    <path d="M54,66 C54,34 78,26 100,26 C122,26 146,34 146,66 C138,52 124,56 116,66 C106,54 94,52 84,64 C76,54 64,56 54,66 Z" />
                    <path d="M54,66 C48,82 52,108 58,116 C56,98 56,80 60,68 Z" />
                    <path d="M146,66 C152,82 148,108 142,116 C144,98 144,80 140,68 Z" />
                  </g>
                )}
              </g>

              {/* Angel Ring Hair Shine */}
              <ellipse cx="100" cy="40" rx="28" ry="7" fill={`url(#partnerHairShine_${partner.id})`} />
            </g>
          ) : (
            // =========================================================================
            // ====================== MALE PARTNER RENDERING ===========================
            // (COOL, MASCULINE, SHORT HAIR, SHARP JAW, NO EXCESSIVE BLUSHING)
            // =========================================================================
            <g>
              {/* --- 1. Male Clean Cropped Back Nape / Spikes (短髪・首筋の美しさ) --- */}
              <g fill={hairColor}>
                {partner.id === 'ren' ? (
                  // Ren: Cool Layered Two-Block / Center Part Short Cut
                  <g>
                    <path d="M54,82 C48,92 50,105 56,114 C60,104 62,94 66,86 Z" />
                    <path d="M146,82 C152,92 150,105 144,114 C140,104 138,94 134,86 Z" />
                    <path d="M58,74 C44,78 46,92 52,102 C56,92 58,84 62,76 Z" />
                    <path d="M142,74 C156,78 154,92 148,102 C144,92 142,84 138,76 Z" />
                  </g>
                ) : (
                  // Sota: Refreshing Sporty Feathered Short Cut
                  <g>
                    <path d="M52,80 C44,90 48,104 56,110 C58,100 62,90 66,82 Z" />
                    <path d="M148,80 C156,90 152,104 144,110 C142,100 138,90 134,82 Z" />
                    <polygon points="56,72 46,78 56,86" />
                    <polygon points="144,72 154,78 144,86" />
                  </g>
                )}
              </g>

              {/* --- 2. Masculine Sturdy Neck & Broad Structured Shoulders --- */}
              {/* Sturdy Neck */}
              <rect x="87" y="108" width="26" height="24" rx="4" fill="#fef7ee" />
              {/* Under-chin shadow */}
              <polygon points="87,112 100,122 113,112" fill="#fed7aa" opacity="0.65" />
              {/* Adam's Apple (男らしい喉仏のライン) */}
              <path d="M98,121 L100,124 L102,121" stroke="#fba06a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M99,126 L101,126" stroke="#fba06a" strokeWidth="1.2" strokeLinecap="round" />

              {/* Broad Masculine Shoulders & Stylish School Blazer / Open Shirt */}
              <path
                d="M38,185 C38,128 70,116 100,116 C130,116 162,128 162,185 Z"
                fill={`url(#partnerClothes_${partner.id})`}
                stroke="#ffffff"
                strokeWidth="1.2"
              />

              {partner.id === 'ren' ? (
                // Ren's Cool Loosened Tie & Open School Blazer (色気のある着崩しブレザー)
                <g>
                  {/* Blazer Lapels */}
                  <polygon points="46,185 70,122 84,148 76,185" fill="#1e1b4b" stroke="#312e81" strokeWidth="1.5" />
                  <polygon points="154,185 130,122 116,148 124,185" fill="#1e1b4b" stroke="#312e81" strokeWidth="1.5" />
                  {/* White Shirt Inside */}
                  <polygon points="84,124 100,165 116,124" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
                  {/* Loosened Dark Tie */}
                  <polygon points="100,136 94,185 106,185" fill="#4338ca" />
                  <rect x="94" y="132" width="12" height="7" rx="1.5" fill="#312e81" />
                  {/* Shirt Open Collar Points */}
                  <polygon points="80,124 94,136 90,122" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
                  <polygon points="120,124 106,136 110,122" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
                </g>
              ) : (
                // Sota's Refreshing School Uniform / Casual Shirt (爽やかな制服シャツ)
                <g>
                  {/* Crisp White Shirt */}
                  <path d="M72,120 L100,162 L128,120" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                  {/* Athletic Striped Tie / Collar */}
                  <polygon points="100,134 95,185 100,192 105,185" fill="#0284c7" />
                  <rect x="94" y="128" width="12" height="8" rx="2" fill="#0369a1" />
                  <polygon points="74,120 90,136 84,120" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
                  <polygon points="126,120 110,136 116,120" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
                </g>
              )}

              {/* --- 3. Sharp Masculine Facial Contour & Manly Jawline (シャープな男前輪郭) --- */}
              <path
                d="M54,68 C54,38 76,30 100,30 C124,30 146,38 146,68 C146,96 130,120 100,123 C70,120 54,96 54,68 Z"
                fill="#fef7ee"
                stroke="#fed7aa"
                strokeWidth="1.4"
              />

              {/* Masculine Ears with Sharp Angle */}
              <path d="M54,72 C50,74 48,84 54,90 C56,86 56,76 54,72 Z" fill="#fef7ee" stroke="#fed7aa" strokeWidth="1.2" />
              <path d="M52,78 Q50,82 52,85" stroke="#fba06a" strokeWidth="1.2" fill="none" />
              <path d="M146,72 C150,74 152,84 146,90 C144,86 144,76 146,72 Z" fill="#fef7ee" stroke="#fed7aa" strokeWidth="1.2" />
              <path d="M148,78 Q150,82 148,85" stroke="#fba06a" strokeWidth="1.2" fill="none" />

              {/* --- 4. MASCULINE BLUSH LOGIC (NO RED CHEEKS / SUBTLE WARMTH ONLY) --- */}
              {/* If Loving / Blushing, only a very faint subtle handsome warmth, NOT clown pink */}
              {(effectiveExpr === 'blushing' || effectiveExpr === 'loving' || isBlushing) && (
                <g>
                  {/* Subtle soft warmth on high cheekbones */}
                  <ellipse cx="72" cy="88" rx="8" ry="4" fill={`url(#partnerMaleBlush_${partner.id})`} />
                  <ellipse cx="128" cy="88" rx="8" ry="4" fill={`url(#partnerMaleBlush_${partner.id})`} />
                  {/* Very faint cool tsundere ear blush */}
                  <circle cx="51" cy="80" r="3" fill="#fb7185" opacity="0.3" />
                  <circle cx="149" cy="80" r="3" fill="#fb7185" opacity="0.3" />
                  {/* Minimal subtle single hatching line */}
                  <line x1="72" y1="87" x2="76" y2="90" stroke="#f43f5e" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
                  <line x1="124" y1="87" x2="128" y2="90" stroke="#f43f5e" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
                </g>
              )}
              {/* Normal mode has ZERO pink blush for men: clean, handsome, porcelain skin */}

              {/* --- 5. COOL MASCULINE EYES (切れ長・凛々しいイケメンアイ) --- */}
              {effectiveExpr === 'loving' ? (
                // Handsome Gentle Loving Gaze (色気のある優しい眼差し)
                <g>
                  {/* Left Eye */}
                  <ellipse cx="78" cy="77" rx="8" ry="8.5" fill="#ffffff" />
                  <ellipse cx="78" cy="77" rx="8" ry="8.5" fill="url(#upperEyeShadow)" />
                  <ellipse cx="78" cy="77" rx="6.8" ry="7.5" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <ellipse cx="78" cy="80" rx="4.5" ry="3" fill={`url(#partnerIrisGlow_${partner.id})`} />
                  <circle cx="75" cy="74" r="2.6" fill="#ffffff" />
                  <circle cx="80" cy="80" r="1.3" fill="#ffffff" />

                  {/* Sharp Double Eyelid & Eyelash */}
                  <path d="M70,68 Q78,63 86,66" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M68,72 Q78,66 88,71" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M86,69 L90,70" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

                  {/* Right Eye */}
                  <ellipse cx="122" cy="77" rx="8" ry="8.5" fill="#ffffff" />
                  <ellipse cx="122" cy="77" rx="8" ry="8.5" fill="url(#upperEyeShadow)" />
                  <ellipse cx="122" cy="77" rx="6.8" ry="7.5" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <ellipse cx="122" cy="80" rx="4.5" ry="3" fill={`url(#partnerIrisGlow_${partner.id})`} />
                  <circle cx="119" cy="74" r="2.6" fill="#ffffff" />
                  <circle cx="124" cy="80" r="1.3" fill="#ffffff" />

                  <path d="M114,66 Q122,63 130,68" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M112,71 Q122,66 132,72" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M130,70 L134,69" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

                  {/* Strong Masculine Eyebrows (Gentle curve) */}
                  <path d="M66,63 Q77,59 87,63" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  <path d="M113,63 Q123,59 134,63" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                </g>
              ) : effectiveExpr === 'wink' ? (
                // Cool Ikemen Wink
                <g>
                  {/* Left Winking Eye */}
                  <path d="M68,77 Q78,71 87,76" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  <path d="M85,73 L89,74" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

                  {/* Right Cool Eye */}
                  <ellipse cx="122" cy="77" rx="8" ry="8.5" fill="#ffffff" />
                  <ellipse cx="122" cy="77" rx="6.8" ry="7.5" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <ellipse cx="122" cy="80" rx="4.5" ry="3" fill={`url(#partnerIrisGlow_${partner.id})`} />
                  <circle cx="119" cy="74" r="2.6" fill="#ffffff" />
                  <circle cx="124" cy="80" r="1.3" fill="#ffffff" />
                  <path d="M112,71 Q122,66 132,72" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />

                  {/* Eyebrows */}
                  <path d="M67,64 L86,63" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  <path d="M114,62 L133,64" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                </g>
              ) : effectiveExpr === 'shocked' ? (
                <g>
                  <ellipse cx="78" cy="77" rx="4" ry="4" fill="#0f172a" />
                  <ellipse cx="122" cy="77" rx="4" ry="4" fill="#0f172a" />
                  <path d="M66,62 L86,68" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  <path d="M134,62 L114,68" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                </g>
              ) : effectiveExpr === 'pout' ? (
                // Cool Tsundere Gaze (少し目を細めて視線を逸らす)
                <g>
                  <ellipse cx="76" cy="77" rx="7" ry="8" fill="#ffffff" />
                  <ellipse cx="74" cy="77" rx="5.8" ry="7" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <circle cx="72" cy="74" r="2.2" fill="#ffffff" />
                  <path d="M67,71 L87,71" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />

                  <ellipse cx="120" cy="77" rx="7" ry="8" fill="#ffffff" />
                  <ellipse cx="118" cy="77" rx="5.8" ry="7" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <circle cx="116" cy="74" r="2.2" fill="#ffffff" />
                  <path d="M111,71 L131,71" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />

                  <path d="M66,63 L86,67" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  <path d="M134,63 L114,67" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                // Standard Cool Romance Manga Male Lead Eyes (切れ長の涼やかで知的な瞳)
                <g>
                  {/* Left Eye */}
                  <ellipse cx="78" cy="77" rx="8" ry="8.5" fill="#ffffff" />
                  <ellipse cx="78" cy="77" rx="8" ry="8.5" fill="url(#upperEyeShadow)" />
                  <ellipse cx="78" cy="77" rx="6.8" ry="7.5" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <ellipse cx="78" cy="80" rx="4.5" ry="3" fill={`url(#partnerIrisGlow_${partner.id})`} />
                  <circle cx="75" cy="74" r="2.6" fill="#ffffff" />
                  <circle cx="80" cy="80" r="1.3" fill="#ffffff" />

                  {/* Sharp Double Eyelid */}
                  <path d="M70,68 Q78,64 85,67" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M68,72 Q78,67 88,71" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  <path d="M86,69 L90,70" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

                  {/* Right Eye */}
                  <ellipse cx="122" cy="77" rx="8" ry="8.5" fill="#ffffff" />
                  <ellipse cx="122" cy="77" rx="8" ry="8.5" fill="url(#upperEyeShadow)" />
                  <ellipse cx="122" cy="77" rx="6.8" ry="7.5" fill={`url(#partnerEyeGrad_${partner.id})`} />
                  <ellipse cx="122" cy="80" rx="4.5" ry="3" fill={`url(#partnerIrisGlow_${partner.id})`} />
                  <circle cx="119" cy="74" r="2.6" fill="#ffffff" />
                  <circle cx="124" cy="80" r="1.3" fill="#ffffff" />

                  <path d="M115,67 Q122,64 130,68" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M112,71 Q122,67 132,72" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  <path d="M130,70 L134,69" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

                  {/* Strong Masculine Eyebrows */}
                  <path d="M66,64 L86,63" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  <path d="M114,63 L134,64" stroke={hairColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
                </g>
              )}

              {/* Masculine Nose (Clean, straight bridge line) */}
              <g>
                <path d="M100,80 L98,90 L101,91" stroke="#fba06a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="98" cy="88" r="1" fill="#ffffff" opacity="0.8" />
              </g>

              {/* Masculine Lips (Natural, attractive anime mouth) */}
              {effectiveExpr === 'loving' ? (
                // Gentle masculine smile
                <path d="M94,98 Q100,103 106,98" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
              ) : effectiveExpr === 'pout' ? (
                <path d="M94,99 Q100,96 106,99" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
              ) : effectiveExpr === 'shocked' ? (
                <ellipse cx="100" cy="98" rx="4.5" ry="5.5" fill="#1e293b" />
              ) : (
                // Cool closed confident lips
                <g>
                  <path d="M94,98 L106,98" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M97,101 L103,101" stroke="#fba06a" strokeWidth="1.4" strokeLinecap="round" />
                </g>
              )}

              {/* --- 6. MASCULINE SHORT HAIR & BANGS (短髪・イケメンヘアスタイル) --- */}
              <g fill={hairColor}>
                {partner.id === 'ren' ? (
                  // REN: Cool Center-Part & Layered Short Crop (センターパート＆すっきり短髪)
                  <g>
                    {/* Top Volume & Contour */}
                    <path d="M52,66 C52,32 76,24 100,24 C124,24 148,32 148,66 C140,50 126,56 116,46 C108,58 98,48 88,54 C80,46 66,50 52,66 Z" />
                    {/* Center Part Bangs revealing forehead partially */}
                    <polygon points="88,24 94,14 100,26" />
                    <polygon points="102,26 108,16 114,24" />
                    {/* Left Center Part Strand */}
                    <path d="M94,30 C90,44 82,54 74,62 C80,50 86,40 92,32 Z" />
                    {/* Right Center Part Strand */}
                    <path d="M106,30 C110,44 118,54 126,62 C120,50 114,40 108,32 Z" />
                    {/* Clean Short Sideburns (短髪・もみあげ) */}
                    <path d="M52,64 L50,78 L56,74 Z" />
                    <path d="M148,64 L150,78 L144,74 Z" />
                  </g>
                ) : (
                  // SOTA: Refreshing Layered Short Crop (爽やかエアリーショート)
                  <g>
                    {/* Top Volume & Spikes */}
                    <path d="M52,66 C52,32 76,26 100,26 C124,26 148,32 148,66 C138,52 124,58 114,48 C104,60 96,52 86,56 C76,48 64,52 52,66 Z" />
                    {/* Energetic short spikes */}
                    <polygon points="94,26 98,14 104,26" />
                    <polygon points="80,30 74,18 86,28" />
                    <polygon points="118,30 126,18 114,28" />
                    {/* Light feathered bangs */}
                    <polygon points="92,48 96,58 100,48" />
                    <polygon points="80,52 84,62 88,52" />
                    <polygon points="112,52 116,62 120,52" />
                    {/* Clean Short Sides */}
                    <path d="M52,64 L48,76 L54,74 Z" />
                    <path d="M148,64 L152,76 L146,74 Z" />
                  </g>
                )}
              </g>

              {/* Crisp Subtle Hair Shine (男らしいシャープな艶) */}
              <ellipse cx="100" cy="38" rx="24" ry="5" fill={`url(#partnerHairShine_${partner.id})`} opacity="0.6" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
