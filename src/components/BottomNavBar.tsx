import React from 'react';
import { Home, Shirt, Sparkles, Heart } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: 'home' | 'wardrobe' | 'romance' | 'collection';
  onTabChange: (tab: 'home' | 'wardrobe' | 'romance' | 'collection') => void;
  unlockedFashionCount?: number;
  hasAvailableDate?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  unlockedFashionCount,
  hasAvailableDate,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 py-1.5 px-2 max-w-md mx-auto shadow-lg">
      <div className="flex items-center justify-around gap-1">
        {/* HOME TAB */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1.5 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'text-sky-600 font-black bg-sky-50 shadow-xs'
              : 'text-slate-400 hover:text-slate-600 font-bold'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] tracking-wide">ホーム</span>
        </button>

        {/* ROMANCE TAB */}
        <button
          onClick={() => onTabChange('romance')}
          className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1.5 rounded-2xl transition-all relative cursor-pointer ${
            activeTab === 'romance'
              ? 'text-rose-500 font-black bg-rose-50 shadow-xs'
              : 'text-slate-400 hover:text-slate-600 font-bold'
          }`}
        >
          <Heart className={`w-5 h-5 ${activeTab === 'romance' ? 'fill-rose-500 stroke-rose-500' : ''}`} />
          <span className="text-[10px] tracking-wide">恋愛・デート</span>
          {hasAvailableDate && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          )}
        </button>

        {/* WARDROBE TAB */}
        <button
          onClick={() => onTabChange('wardrobe')}
          className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1.5 rounded-2xl transition-all relative cursor-pointer ${
            activeTab === 'wardrobe'
              ? 'text-indigo-600 font-black bg-indigo-50 shadow-xs'
              : 'text-slate-400 hover:text-slate-600 font-bold'
          }`}
        >
          <Shirt className={`w-5 h-5 ${activeTab === 'wardrobe' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] tracking-wide">きせかえ</span>
          {unlockedFashionCount !== undefined && unlockedFashionCount > 0 && (
            <span className="absolute top-1 right-2 text-[9px] font-black bg-indigo-500 text-white rounded-full px-1.5 py-0.2">
              {unlockedFashionCount}
            </span>
          )}
        </button>

        {/* COLLECTION TAB */}
        <button
          onClick={() => onTabChange('collection')}
          className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1.5 rounded-2xl transition-all relative cursor-pointer ${
            activeTab === 'collection'
              ? 'text-purple-600 font-black bg-purple-50 shadow-xs'
              : 'text-slate-400 hover:text-slate-600 font-bold'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${activeTab === 'collection' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] tracking-wide">ガチャ・図鑑</span>
        </button>
      </div>
    </nav>
  );
};

