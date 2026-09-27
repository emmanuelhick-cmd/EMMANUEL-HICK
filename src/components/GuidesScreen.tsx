import React from 'react';
import { GuideType, Plant } from '../types';
import { WateringGuide } from './guides/WateringGuide';
import { LightGuide } from './guides/LightGuide';
import { NutritionGuide } from './guides/NutritionGuide';
import { PestsGuide } from './guides/PestsGuide';

interface GuidesScreenProps {
  activeGuide: GuideType;
  onSelectGuide: (guide: GuideType) => void;
  plants: Plant[];
  onConsult: (topic: string) => void;
  onShowToast: (msg: string) => void;
}

export const GuidesScreen: React.FC<GuidesScreenProps> = ({
  activeGuide,
  onSelectGuide,
  plants,
  onConsult,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full space-y-4">
      {/* 4 Guide Switcher Tabs */}
      <div className="sticky top-16 z-30 bg-surface/95 backdrop-blur-md py-2 border-b border-surface-container">
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-surface-container rounded-2xl">
          <button
            type="button"
            onClick={() => onSelectGuide('riego')}
            className={`py-2 px-1 rounded-xl text-[12px] font-bold transition-all flex items-center justify-center gap-1 ${
              activeGuide === 'riego'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">water_drop</span>
            <span>Riego</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectGuide('luz')}
            className={`py-2 px-1 rounded-xl text-[12px] font-bold transition-all flex items-center justify-center gap-1 ${
              activeGuide === 'luz'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-amber-600">light_mode</span>
            <span>Luz</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectGuide('nutricion')}
            className={`py-2 px-1 rounded-xl text-[12px] font-bold transition-all flex items-center justify-center gap-1 ${
              activeGuide === 'nutricion'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-600">science</span>
            <span>Nutrición</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectGuide('plagas')}
            className={`py-2 px-1 rounded-xl text-[12px] font-bold transition-all flex items-center justify-center gap-1 ${
              activeGuide === 'plagas'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-primary">pest_control</span>
            <span>Plagas</span>
          </button>
        </div>
      </div>

      {/* Guide Content */}
      {activeGuide === 'riego' && (
        <WateringGuide plants={plants} onConsult={onConsult} onShowToast={onShowToast} />
      )}
      {activeGuide === 'luz' && (
        <LightGuide plants={plants} onConsult={onConsult} />
      )}
      {activeGuide === 'nutricion' && (
        <NutritionGuide plants={plants} onConsult={onConsult} />
      )}
      {activeGuide === 'plagas' && (
        <PestsGuide plants={plants} onConsult={onConsult} />
      )}
    </div>
  );
};
