import React, { useState } from 'react';
import { Plant } from '../types';

interface AllPlantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plants: Plant[];
  onOpenConsult: (plantId: string) => void;
  onOpenNewPlant: () => void;
  onWaterPlant: (plantId: string) => void;
}

export const AllPlantsModal: React.FC<AllPlantsModalProps> = ({
  isOpen,
  onClose,
  plants,
  onOpenConsult,
  onOpenNewPlant,
  onWaterPlant,
}) => {
  const [filter, setFilter] = useState<'all' | 'Saludable' | 'En Tratamiento' | 'Atención'>('all');

  if (!isOpen) return null;

  const filteredPlants = plants.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-surface pt-safe pb-16 animate-in fade-in">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-surface/95 backdrop-blur-xl border-b border-surface-container-highest px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[17px] font-bold text-primary truncate leading-tight">
              Mis Plantas en Cuidado
            </h1>
            <span className="text-[11px] text-on-surface-variant font-medium">
              {plants.length} ejemplares registrados
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenNewPlant();
          }}
          className="py-1.5 px-3 rounded-xl bg-primary text-white text-[12px] font-bold flex items-center gap-1 active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Nueva</span>
        </button>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'Saludable', label: 'Saludables' },
            { id: 'En Tratamiento', label: 'En Tratamiento' },
            { id: 'Atención', label: 'Atención' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`py-1.5 px-3 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-primary text-white shadow-xs font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Plants List */}
        <div className="space-y-3">
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3"
            >
              <div className="flex items-start gap-3">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 ring-1 ring-surface-container"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3 className="font-bold text-[15px] text-primary truncate">
                      {plant.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        plant.status === 'Saludable'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : plant.status === 'En Tratamiento'
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                      }`}
                    >
                      {plant.status}
                    </span>
                  </div>
                  <span className="text-[12px] text-on-surface font-medium block">
                    {plant.nickname}
                  </span>
                  <span className="text-[11px] text-on-surface-variant truncate block mt-0.5">
                    {plant.location}
                  </span>
                </div>
              </div>

              {/* Agronomic indicators */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded-xl bg-surface-container-low border border-surface-container/60 space-y-0.5">
                  <div className="flex items-center gap-1 text-secondary font-bold">
                    <span className="material-symbols-outlined text-[14px]">water_drop</span>
                    <span>Próximo Riego</span>
                  </div>
                  <span className="text-on-surface font-medium">
                    {plant.nextWateringDays === 0
                      ? '¡Regar hoy!'
                      : `En ${plant.nextWateringDays} días`}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-surface-container-low border border-surface-container/60 space-y-0.5">
                  <div className="flex items-center gap-1 text-secondary font-bold">
                    <span className="material-symbols-outlined text-[14px]">science</span>
                    <span>Fertilización</span>
                  </div>
                  <span className="text-on-surface font-medium">
                    En {plant.nextFertilizingDays} días
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => onWaterPlant(plant.id)}
                  className="flex-1 py-2 px-3 rounded-xl bg-surface-container text-primary font-bold text-[12px] flex items-center justify-center gap-1 hover:bg-surface-container-high transition-colors active:scale-98"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">shower</span>
                  <span>Registrar Riego</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenConsult(plant.id);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-primary text-white font-bold text-[12px] flex items-center justify-center gap-1 hover:bg-primary-container transition-colors active:scale-98"
                >
                  <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                  <span>Consultar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
