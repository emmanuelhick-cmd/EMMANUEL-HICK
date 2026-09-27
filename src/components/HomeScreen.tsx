import React from 'react';
import { Plant, GuideType } from '../types';
import { AGRONOMIST_INFO, USER_INFO } from '../data/mockData';

interface HomeScreenProps {
  plants: Plant[];
  onOpenConsult: (preselectedPlantId?: string) => void;
  onOpenGuide: (guide: GuideType) => void;
  onOpenAllPlants: () => void;
  onOpenNewPlant: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  plants,
  onOpenConsult,
  onOpenGuide,
  onOpenAllPlants,
  onOpenNewPlant,
}) => {
  return (
    <div className="flex flex-col w-full pb-10 space-y-5 animate-in fade-in duration-300">
      {/* Botánico de Guardia Header Banner */}
      <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container flex items-start gap-3.5">
        <div className="relative flex-shrink-0">
          <img
            src={AGRONOMIST_INFO.avatar}
            alt={AGRONOMIST_INFO.name}
            className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-secondary"
          />
          <span className="w-3.5 h-3.5 rounded-full bg-secondary border-2 border-surface-container-lowest absolute bottom-0 right-0 animate-pulse" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[11px] text-secondary font-bold tracking-wider uppercase mb-0.5">
            <span>BOTÁNICO DE GUARDIA</span>
            <span>·</span>
            <span>Respuesta en {AGRONOMIST_INFO.responseTime}</span>
          </div>
          <h2 className="text-[17px] font-bold text-primary leading-tight">
            Hola, {USER_INFO.name}.
          </h2>
          <p className="text-[12px] text-on-surface-variant mt-1 leading-snug">
            El <strong>{AGRONOMIST_INFO.name}</strong> ({AGRONOMIST_INFO.matricula}) está disponible hoy para diagnosticar cualquier síntoma en tus plantas.
          </p>
        </div>
      </section>

      {/* Triage Inmediato Hero Card */}
      <section className="relative overflow-hidden bg-primary-container text-on-primary rounded-3xl p-5 shadow-lg space-y-4">
        {/* Subtle decorative background waterleaf */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none flex items-center justify-center">
          <span className="material-symbols-outlined text-[140px] text-white">psychiatry</span>
        </div>

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-white text-[11px] font-bold tracking-wide uppercase shadow-xs">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            <span>Triage Inmediato</span>
          </div>

          <h3 className="text-[24px] font-bold text-surface-bright leading-tight">
            ¡Hacé tu consulta hoy!
          </h3>

          <p className="text-[13px] text-on-primary-container leading-relaxed">
            Envía una foto clara de las hojas y recibe un diagnóstico profesional y plan de acción en menos de 2 horas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenConsult()}
          className="relative z-10 w-full py-3.5 px-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-bold text-[14px] flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all hover:bg-secondary-container"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            photo_camera
          </span>
          <span>Iniciar Nueva Consulta</span>
        </button>
      </section>

      {/* Cuidados Esenciales (Guías Rápidas) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-primary">Cuidados Esenciales</h3>
          <span className="text-[12px] text-secondary font-semibold">Guías Rápidas</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* Riego */}
          <button
            type="button"
            onClick={() => onOpenGuide('riego')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:border-secondary/40 active:scale-95 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-1.5 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">water_drop</span>
            </div>
            <span className="text-[12px] font-semibold text-primary">Riego</span>
          </button>

          {/* Luz */}
          <button
            type="button"
            onClick={() => onOpenGuide('luz')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:border-secondary/40 active:scale-95 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed/60 flex items-center justify-center text-on-tertiary-fixed-variant mb-1.5 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">light_mode</span>
            </div>
            <span className="text-[12px] font-semibold text-primary">Luz</span>
          </button>

          {/* Nutrición */}
          <button
            type="button"
            onClick={() => onOpenGuide('nutricion')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:border-secondary/40 active:scale-95 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-secondary-container/60 flex items-center justify-center text-secondary mb-1.5 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">science</span>
            </div>
            <span className="text-[12px] font-semibold text-primary">Nutrición</span>
          </button>

          {/* Plagas */}
          <button
            type="button"
            onClick={() => onOpenGuide('plagas')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:border-secondary/40 active:scale-95 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-1.5 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">pest_control</span>
            </div>
            <span className="text-[12px] font-semibold text-primary">Plagas</span>
          </button>
        </div>
      </section>

      {/* Mis Plantas en Cuidado */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-bold text-primary">Mis Plantas en Cuidado</h3>
            <p className="text-[11px] text-on-surface-variant">Monitoreo activo y prescripciones</p>
          </div>
          <button
            type="button"
            onClick={onOpenAllPlants}
            className="text-[12px] text-secondary font-bold hover:underline flex items-center gap-0.5"
          >
            <span>Ver todas ({plants.length})</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="space-y-3">
          {plants.slice(0, 3).map((plant) => (
            <div
              key={plant.id}
              className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container flex flex-col gap-2.5 hover:border-secondary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0 ring-1 ring-surface-container"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="font-bold text-[15px] text-primary truncate">
                      {plant.name}
                    </h4>

                    {/* Status Badge */}
                    {plant.status === 'Saludable' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        Saludable
                      </span>
                    )}
                    {plant.status === 'En Tratamiento' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        En Tratamiento
                      </span>
                    )}
                    {plant.status === 'Atención' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-bold">
                        <span className="material-symbols-outlined text-[12px]">warning</span>
                        Atención
                      </span>
                    )}
                  </div>

                  <p className="text-[12px] text-on-surface-variant leading-snug line-clamp-2">
                    {plant.notes}
                  </p>
                </div>
              </div>

              {/* Progress Bar or Action trigger */}
              {plant.status === 'Saludable' && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full"
                      style={{ width: `${plant.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-on-surface-variant font-mono">
                    {plant.progress}%
                  </span>
                </div>
              )}

              {plant.status === 'En Tratamiento' && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-container rounded-full"
                      style={{ width: `${plant.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-on-surface-variant font-mono">
                    {plant.treatmentDay || `${plant.progress}%`}
                  </span>
                </div>
              )}

              {plant.status === 'Atención' && (
                <button
                  type="button"
                  onClick={() => onOpenConsult(plant.id)}
                  className="w-full mt-1 py-2 px-3 rounded-xl bg-tertiary-fixed/60 hover:bg-tertiary-fixed text-on-tertiary-fixed-variant text-[12px] font-bold flex items-center justify-between transition-colors active:scale-98"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                    <span>Tocar para enviar foto al botánico</span>
                  </span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              )}
            </div>
          ))}

          {/* Quick Add Plant Action */}
          <button
            type="button"
            onClick={onOpenNewPlant}
            className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-secondary/40 bg-surface-container-low/50 text-primary text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-surface-container-low hover:border-secondary transition-all active:scale-98"
          >
            <span className="material-symbols-outlined text-secondary text-[20px]">add_circle</span>
            <span>Registrar Nueva Planta en Cuidado</span>
          </button>
        </div>
      </section>

      {/* Alerta Estacional (Otoño / Invierno) */}
      <section className="bg-surface-container-low rounded-2xl p-4 border border-surface-container-high flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-bold text-tertiary tracking-wider uppercase">
            <div className="w-6 h-6 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
              <span className="material-symbols-outlined text-[14px]">ac_unit</span>
            </div>
            <span>ALERTA ESTACIONAL</span>
          </div>
          <span className="text-[11px] text-on-surface-variant font-medium">Otoño / Invierno</span>
        </div>

        <h4 className="text-[16px] font-bold text-primary leading-snug">
          Protege tus plantas de la calefacción
        </h4>

        <p className="text-[12px] text-on-surface-variant leading-relaxed">
          Reduce el volumen de riego y aleja las macetas de radiadores directos. Pulveriza agua tibia en follajes tropicales dos veces por semana.
        </p>

        <button
          type="button"
          onClick={() => onOpenGuide('riego')}
          className="self-start text-[12px] font-bold text-secondary flex items-center gap-1 hover:underline pt-0.5"
        >
          <span>Leer recomendaciones completas</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>
    </div>
  );
};
