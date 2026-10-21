import React, { useMemo } from 'react';
import { KaoriScent } from '../types';

interface AromaAuraEffectProps {
  scent: KaoriScent;
  intensity?: number; // 1 to 5 based on level/evolution
}

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

export const AromaAuraEffect: React.FC<AromaAuraEffectProps> = ({ scent, intensity = 2 }) => {
  // Generate deterministic particles based on scent id and intensity
  const particles: Particle[] = useMemo(() => {
    const count = 10 + intensity * 3;
    const list: Particle[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        left: 10 + ((i * 37 + 13) % 80),
        top: 20 + ((i * 43 + 29) % 65),
        size: 14 + ((i * 17) % 18),
        duration: 3 + ((i * 11) % 4),
        delay: ((i * 7) % 5) * 0.7,
        drift: -15 + ((i * 23) % 30),
      });
    }
    return list;
  }, [intensity]);

  const renderParticleSymbol = (type: KaoriScent['particleType'], idx: number) => {
    switch (type) {
      case 'bubble':
        return (
          <div
            className="rounded-full border border-sky-200/80 bg-gradient-to-tr from-sky-200/50 via-white/70 to-indigo-100/40 shadow-[0_0_10px_rgba(186,230,253,0.6)] backdrop-blur-[1px] relative"
            style={{ width: '100%', height: '100%' }}
          >
            <span className="absolute top-[18%] left-[22%] w-[25%] h-[25%] rounded-full bg-white opacity-90" />
          </div>
        );
      case 'petal':
        return (
          <span className="text-pink-400 select-none drop-shadow-[0_2px_6px_rgba(244,114,182,0.5)] transform -rotate-12 inline-block">
            {idx % 2 === 0 ? '🌸' : '🍃'}
          </span>
        );
      case 'citrus_spark':
        return (
          <span className="text-amber-400 select-none drop-shadow-[0_2px_8px_rgba(251,191,36,0.6)] inline-block">
            {idx % 3 === 0 ? '✨' : idx % 3 === 1 ? '🍋' : '🍊'}
          </span>
        );
      case 'water_drop':
        return (
          <span className="text-cyan-400 select-none drop-shadow-[0_2px_8px_rgba(34,211,238,0.6)] inline-block">
            {idx % 2 === 0 ? '💧' : '🫧'}
          </span>
        );
      case 'stardust':
        return (
          <span className="text-purple-300 select-none drop-shadow-[0_0_10px_rgba(192,132,252,0.8)] inline-block">
            {idx % 3 === 0 ? '🌙' : idx % 3 === 1 ? '⭐' : '✨'}
          </span>
        );
      default:
        return <span className="text-sky-300">🫧</span>;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
      {/* Outer soft glowing aura */}
      <div
        className="absolute w-72 h-72 rounded-full filter blur-2xl animate-pulse-glow transition-all duration-1000"
        style={{
          backgroundColor: scent.auraColor,
          transform: 'scale(1.15)',
        }}
      />

      {/* Inner vibrant shimmer ring */}
      <div
        className="absolute w-56 h-56 rounded-full filter blur-xl opacity-60 animate-float"
        style={{
          border: `2px solid ${scent.accentColor}`,
          boxShadow: `0 0 35px ${scent.accentColor}`,
        }}
      />

      {/* Floating dynamic aroma particles */}
      {particles.map((p, idx) => (
        <div
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `bubble-rise ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {renderParticleSymbol(scent.particleType, idx)}
        </div>
      ))}
    </div>
  );
};
