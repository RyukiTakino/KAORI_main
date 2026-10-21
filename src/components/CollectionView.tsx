import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Check,
  Lock,
  Award,
  Shirt,
  Flame,
  Crown,
  Star,
  Layers,
  Palette,
  Info,
} from 'lucide-react';
import {
  KaoriScent,
  FashionItem,
  EquippedFashion,
  ItemCategory,
  ItemRarity,
  GachaRankInfo,
} from '../types';
import {
  SCENTS_CATALOG,
  FASHION_ITEMS_CATALOG,
  GACHA_RANKS,
  getGachaRank,
  getNextGachaRank,
} from '../data/gameData';
import { CharacterAvatar } from './CharacterAvatar';

interface CollectionViewProps {
  collectedScentIds: string[];
  activeScentId: string;
  onSelectActiveScent: (scentId: string) => void;
  unlockedFashionItemIds: string[];
  equippedFashion: EquippedFashion;
  onEquipFashionItem: (category: ItemCategory, itemId: string | null) => void;
  onChangeHairColor: (color: string) => void;
  onChangeGender?: (gender: 'female' | 'male') => void;
  streak: number;
  level: number;
  kaoriGauge: number;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  collectedScentIds,
  activeScentId,
  onSelectActiveScent,
  unlockedFashionItemIds,
  equippedFashion,
  onEquipFashionItem,
  onChangeHairColor,
  onChangeGender,
  streak,
  level,
  kaoriGauge,
}) => {
  const [mainTab, setMainTab] = useState<'wardrobe' | 'scents' | 'gacha_rates'>('wardrobe');
  const [fashionCategory, setFashionCategory] = useState<string>('ALL');
  const [scentCategory, setScentCategory] = useState<string>('ALL');

  const currentGachaRank = getGachaRank(streak);
  const nextRankInfo = getNextGachaRank(streak);

  const activeScent =
    SCENTS_CATALOG.find((s) => s.id === activeScentId) || SCENTS_CATALOG[0];

  // Fashion categories
  const fashionCategories: { id: string; label: string; icon: string }[] = [
    { id: 'ALL', label: 'すべて', icon: '✨' },
    { id: 'head', label: '帽子・頭', icon: '👒' },
    { id: 'outfit', label: '服・ローブ', icon: '👗' },
    { id: 'hand', label: '手持ち', icon: '🪄' },
    { id: 'accessory', label: 'アクセ', icon: '👓' },
    { id: 'hair', label: '髪型', icon: '💇' },
  ];

  // Hair color palette choices
  const hairColors = [
    { id: '#451a03', label: 'ナチュラルブラウン', color: '#451a03' },
    { id: '#1e1b4b', label: 'ミッドナイトブラック', color: '#1e1b4b' },
    { id: '#831843', label: 'ローズベリー', color: '#831843' },
    { id: '#ca8a04', label: 'ハニーゴールド', color: '#ca8a04' },
    { id: '#0c4a6e', label: 'アクアブルー', color: '#0c4a6e' },
    { id: '#701a75', label: 'ドリーミーパープル', color: '#701a75' },
  ];

  // Scent categories
  const scentCategories = [
    { id: 'ALL', label: 'すべて' },
    { id: 'soap', label: '🫧 泡・石鹸' },
    { id: 'floral', label: '🌸 お花' },
    { id: 'citrus', label: '🍋 フルーツ' },
    { id: 'marine', label: '🌊 マリン' },
    { id: 'musk', label: '🌙 ムスク' },
  ];

  const filteredFashion = FASHION_ITEMS_CATALOG.filter((item) => {
    if (fashionCategory === 'ALL') return true;
    return item.category === fashionCategory;
  });

  const filteredScents = SCENTS_CATALOG.filter((s) => {
    if (scentCategory === 'ALL') return true;
    return s.category === scentCategory;
  });

  const unlockedFashionCount = unlockedFashionItemIds.length;
  const totalFashionCount = FASHION_ITEMS_CATALOG.length;

  const isItemEquipped = (item: FashionItem) => {
    if (item.category === 'head') return equippedFashion.head === item.id;
    if (item.category === 'outfit') return equippedFashion.outfit === item.id;
    if (item.category === 'hand') return equippedFashion.hand === item.id;
    if (item.category === 'accessory') return equippedFashion.accessory === item.id;
    if (item.category === 'hair') return equippedFashion.hair === item.id;
    return false;
  };

  return (
    <div className="w-full space-y-4 pb-14">
      {/* Top Switcher Tabs */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl gap-1 shadow-inner">
        <button
          onClick={() => setMainTab('wardrobe')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
            mainTab === 'wardrobe'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <Shirt className="w-4 h-4 text-indigo-500" />
          <span>きせかえ ({unlockedFashionCount}/{totalFashionCount})</span>
        </button>

        <button
          onClick={() => setMainTab('scents')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
            mainTab === 'scents'
              ? 'bg-white text-pink-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>香りの図鑑 ({collectedScentIds.length}/{SCENTS_CATALOG.length})</span>
        </button>

        <button
          onClick={() => setMainTab('gacha_rates')}
          className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all ${
            mainTab === 'gacha_rates'
              ? 'bg-white text-amber-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-800'
          }`}
          title="ガチャ確率"
        >
          <Flame className="w-4 h-4 text-amber-500" />
          <span>ランク</span>
        </button>
      </div>

      {/* ================= 1. WARDROBE TAB ================= */}
      {mainTab === 'wardrobe' && (
        <div className="space-y-4">
          {/* Avatar Dressing Room Preview */}
          <div className="bg-gradient-to-b from-indigo-50 via-sky-50 to-white rounded-3xl p-4 border border-indigo-100 shadow-sm flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-widest text-indigo-600 bg-white/90 px-2.5 py-0.5 rounded-full border border-indigo-100 shadow-xs">
                DRESSING ROOM
              </span>
            </div>

            {/* Current Gacha Rank Mini Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{currentGachaRank.name}</span>
            </div>

            {/* Gender Style Selector (Female / Male) */}
            <div className="mt-6 mb-1 flex items-center bg-white/90 p-1 rounded-2xl border border-indigo-100 shadow-xs gap-1">
              <button
                type="button"
                onClick={() => onChangeGender && onChangeGender('female')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                  equippedFashion.gender !== 'male' && equippedFashion.gender !== 'style_b'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-xs'
                    : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <span>👩</span>
                <span>女性スタイル</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeGender && onChangeGender('male')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                  equippedFashion.gender === 'male' || equippedFashion.gender === 'style_b'
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
                }`}
              >
                <span>👨</span>
                <span>男性スタイル</span>
              </button>
            </div>

            {/* Live Character Avatar */}
            <div className="py-2">
              <CharacterAvatar
                level={level}
                activeScent={activeScent}
                equippedFashion={equippedFashion}
                size="lg"
                kaoriGauge={kaoriGauge}
                showDialogue={false}
              />
            </div>

            <p className="text-[11px] text-slate-500 font-medium text-center">
              タップで着替え可能！毎日お風呂に入ると美肌Lvが上がり容姿が垢抜けます✨
            </p>

            {/* Hair Color Customizer Palette */}
            <div className="mt-3 pt-3 border-t border-indigo-100/80 w-full flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-slate-600 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-indigo-500" />
                <span>髪色チェンジ:</span>
              </span>
              <div className="flex gap-1.5">
                {hairColors.map((hc) => (
                  <button
                    key={hc.id}
                    onClick={() => onChangeHairColor(hc.color)}
                    style={{ backgroundColor: hc.color }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform active:scale-90 ${
                      equippedFashion.hairColor === hc.color
                        ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110 shadow-sm'
                        : 'border-white'
                    }`}
                    title={hc.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {fashionCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFashionCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1 ${
                  fashionCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Fashion Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredFashion.map((item) => {
              const isUnlocked = unlockedFashionItemIds.includes(item.id);
              const isEquipped = isItemEquipped(item);

              if (isUnlocked) {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-2xl p-3 border transition-all shadow-xs flex items-start gap-3 relative ${
                      isEquipped
                        ? 'border-indigo-500 ring-2 ring-indigo-300/50 shadow-md bg-indigo-50/20'
                        : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {/* Item Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner shrink-0 border"
                      style={{
                        backgroundColor: `${item.colorTheme}40`,
                        borderColor: item.accentColor,
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 justify-between">
                        <h4 className="text-xs font-black text-slate-800 truncate">
                          {item.name}
                        </h4>
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${
                            item.rarity === 'UR'
                              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                              : item.rarity === 'SR'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : item.rarity === 'R'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.rarity}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex text-amber-400 gap-0.5 mt-0.5">
                        {Array.from({ length: item.starLevel }).map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                        ))}
                      </div>

                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                        {item.description}
                      </p>

                      {/* Equip / Unequip CTA */}
                      <div className="mt-2 flex items-center justify-end">
                        {isEquipped ? (
                          <button
                            onClick={() => onEquipFashionItem(item.category, null)}
                            className="text-[10px] font-extrabold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <Check className="w-3 h-3" />
                            <span>着用中 (外す)</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onEquipFashionItem(item.category, item.id)}
                            className="text-[10px] font-extrabold text-slate-700 bg-slate-100 hover:bg-indigo-600 hover:text-white px-2.5 py-1 rounded-lg transition-colors"
                          >
                            着替える
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              } else {
                return (
                  <div
                    key={item.id}
                    className="bg-slate-50/70 rounded-2xl p-3 border border-dashed border-slate-200 flex items-center gap-3 opacity-60"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-extrabold text-slate-400">
                          ？？？
                        </h4>
                        <span className="text-[8px] font-bold px-1 rounded bg-slate-200 text-slate-500">
                          {item.rarity}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        写真ミッションクリアのガチャで解放！
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}

      {/* ================= 2. SCENTS TAB ================= */}
      {mainTab === 'scents' && (
        <div className="space-y-4">
          {/* Fragrance Collection Banner */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  FRAGRANCE AURA
                </span>
                <h2 className="text-xl font-black mt-1">香りの図鑑</h2>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black">{collectedScentIds.length}</span>
                <span className="text-xs text-white/80 font-bold"> / {SCENTS_CATALOG.length}種</span>
              </div>
            </div>
            <p className="text-xs text-white/90 mt-2">
              お風呂に入るたびにアバターから放たれる香りのオーラを獲得できます！
            </p>
          </div>

          {/* Scent Category Filters */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {scentCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setScentCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  scentCategory === cat.id
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Scents Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {filteredScents.map((scent) => {
              const isUnlocked = collectedScentIds.includes(scent.id);
              const isEquipped = activeScentId === scent.id;

              if (isUnlocked) {
                return (
                  <motion.div
                    key={scent.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-2xl p-3.5 border transition-all shadow-xs flex items-start gap-3.5 relative ${
                      isEquipped
                        ? 'border-pink-400 ring-2 ring-pink-300/40 shadow-md'
                        : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0 border"
                      style={{
                        backgroundColor: scent.auraColor,
                        borderColor: scent.accentColor,
                      }}
                    >
                      {scent.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black text-slate-800 truncate">
                          {scent.name}
                        </h3>
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${
                            scent.rarity === 'SUPER RARE'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : scent.rarity === 'RARE'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {scent.rarity}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {scent.description}
                      </p>

                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400">
                          {scent.japaneseName}
                        </span>

                        {isEquipped ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-lg border border-pink-100">
                            <Check className="w-3 h-3" />
                            香りをまとう中
                          </span>
                        ) : (
                          <button
                            onClick={() => onSelectActiveScent(scent.id)}
                            className="text-[11px] font-extrabold text-slate-700 bg-slate-100 hover:bg-pink-500 hover:text-white px-2.5 py-1 rounded-lg transition-colors"
                          >
                            この香りにする
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              } else {
                return (
                  <div
                    key={scent.id}
                    className="bg-slate-50/80 rounded-2xl p-3.5 border border-dashed border-slate-200 flex items-center gap-3.5 opacity-70"
                  >
                    <div className="w-13 h-13 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-extrabold text-slate-400">？？？</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        お風呂に入って新しい香りを解放しよう！
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}

      {/* ================= 3. GACHA RANKS & ODDS TAB ================= */}
      {mainTab === 'gacha_rates' && (
        <div className="space-y-4">
          {/* Current Rank Status Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase bg-black/20 px-2.5 py-0.5 rounded-full">
                  CONTINUOUS BATH STREAK
                </span>
                <h2 className="text-2xl font-black mt-1 flex items-center gap-2">
                  <span>{currentGachaRank.name}</span>
                  <span className="text-sm font-bold bg-white/20 px-2 py-0.5 rounded-lg">
                    {streak}日連続
                  </span>
                </h2>
              </div>
              <Flame className="w-10 h-10 text-yellow-300 animate-pulse" />
            </div>

            <p className="text-xs text-white/90 mt-2">
              {currentGachaRank.description}
            </p>

            {nextRankInfo.nextRank && (
              <div className="mt-3 bg-black/25 backdrop-blur-sm px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between">
                <span>
                  あと <span className="text-yellow-300 font-black">{nextRankInfo.daysNeeded}日</span> 連続入浴で「{nextRankInfo.nextRank.name}」へランクアップ！
                </span>
              </div>
            )}
          </div>

          {/* Ranks Breakdown Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-600" />
              <span>連続入浴ガチャのランク＆出現確率表</span>
            </h3>

            {Object.values(GACHA_RANKS).map((r) => {
              const isCurrent = currentGachaRank.tier === r.tier;
              return (
                <div
                  key={r.tier}
                  className={`rounded-2xl p-4 border transition-all ${
                    isCurrent
                      ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300/60 shadow-md'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${r.badgeClass}`}>
                        {r.name}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        ({r.minStreak}日以上連続)
                      </span>
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] font-black bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-xs">
                        ★ 現在のランク
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mb-3">
                    {r.description}
                  </p>

                  {/* Rates Bar & Table */}
                  <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                    <div className="bg-slate-100 rounded-xl p-2">
                      <span className="text-[10px] text-slate-500 block font-bold">N (★1-2)</span>
                      <span className="font-black text-slate-800">{r.rates.N}%</span>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-2 border border-purple-100">
                      <span className="text-[10px] text-purple-700 block font-bold">R (★3)</span>
                      <span className="font-black text-purple-900">{r.rates.R}%</span>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                      <span className="text-[10px] text-amber-700 block font-bold">SR (★4)</span>
                      <span className="font-black text-amber-900">{r.rates.SR}%</span>
                    </div>
                    <div className="bg-gradient-to-tr from-pink-100 to-purple-100 rounded-xl p-2 border border-pink-200">
                      <span className="text-[10px] text-pink-700 block font-bold">UR (★5)</span>
                      <span className="font-black text-pink-900">{r.rates.UR}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
