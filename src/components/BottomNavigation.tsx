import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  activeCasesCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  activeCasesCount = 0,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-surface-container-highest shadow-[0_-2px_12px_rgba(27,67,50,0.06)] pb-safe">
      <div className="max-w-md mx-auto h-16 px-4 grid grid-cols-4 items-center">
        {/* Inicio */}
        <button
          type="button"
          onClick={() => onTabChange('inicio')}
          className={`flex flex-col items-center justify-center h-full transition-colors active:scale-95 ${
            activeTab === 'inicio'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary font-medium'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'inicio' ? "'FILL' 1" : "'FILL' 0" }}
          >
            eco
          </span>
          <span className="text-[11px] tracking-tight mt-0.5">Inicio</span>
        </button>

        {/* Consultar - Raised / Featured Camera Tab */}
        <button
          type="button"
          onClick={() => onTabChange('consultar')}
          className={`flex flex-col items-center justify-center h-full transition-all active:scale-95 group relative ${
            activeTab === 'consultar' ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'
          }`}
        >
          <div
            className={`w-11 h-11 -mt-3 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 group-active:scale-90 ${
              activeTab === 'consultar'
                ? 'bg-primary text-secondary-fixed shadow-primary/30 ring-2 ring-secondary-container'
                : 'bg-primary text-white shadow-primary/20'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              photo_camera
            </span>
          </div>
          <span className="text-[11px] tracking-tight mt-0.5">Consultar</span>
        </button>

        {/* Mis Casos */}
        <button
          type="button"
          onClick={() => onTabChange('casos')}
          className={`relative flex flex-col items-center justify-center h-full transition-colors active:scale-95 ${
            activeTab === 'casos'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary font-medium'
          }`}
        >
          <div className="relative">
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: activeTab === 'casos' ? "'FILL' 1" : "'FILL' 0" }}
            >
              clinical_notes
            </span>
            {activeCasesCount > 0 ? (
              <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-secondary text-white text-[10px] font-bold flex items-center justify-center">
                {activeCasesCount}
              </span>
            ) : null}
          </div>
          <span className="text-[11px] tracking-tight mt-0.5">Mis Casos</span>
        </button>

        {/* Consejos */}
        <button
          type="button"
          onClick={() => onTabChange('consejos')}
          className={`flex flex-col items-center justify-center h-full transition-colors active:scale-95 ${
            activeTab === 'consejos'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary font-medium'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'consejos' ? "'FILL' 1" : "'FILL' 0" }}
          >
            psychiatry
          </span>
          <span className="text-[11px] tracking-tight mt-0.5">Consejos</span>
        </button>
      </div>
    </nav>
  );
};
