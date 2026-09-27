import React, { useState } from 'react';
import { Plant } from '../../types';
import { AGRONOMIST_INFO } from '../../data/mockData';

interface LightGuideProps {
  plants: Plant[];
  onConsult: (topic: string) => void;
}

export const LightGuide: React.FC<LightGuideProps> = ({ plants, onConsult }) => {
  const [seasonMode, setSeasonMode] = useState<'winter' | 'summer'>('winter');
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [luxValue, setLuxValue] = useState<number>(2340);
  const [luxStatus, setLuxStatus] = useState<string>('Óptimo Fisiológico');

  const handleMeasure = () => {
    setIsMeasuring(true);
    setTimeout(() => {
      const readings = [
        { lux: 1850, status: 'Óptimo Fisiológico' },
        { lux: 2850, status: 'Luz Indirecta Brillante' },
        { lux: 3400, status: 'Excelente para Ficus' },
        { lux: 1200, status: 'Seguro para Calatheas' },
        { lux: 4100, status: 'Límite Superior Seguro' },
      ];
      const random = readings[Math.floor(Math.random() * readings.length)];
      setLuxValue(random.lux);
      setLuxStatus(random.status);
      setIsMeasuring(false);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-5 animate-in fade-in duration-300">
      {/* Top Protocol Capsule & Title Card */}
      <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm border border-surface-container space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            PROTOCOLO AGRONÓMICO OFICIAL
          </span>
        </div>

        <h2 className="text-[26px] font-bold text-primary pt-1 leading-tight">
          Iluminación y Ubicación Solar
        </h2>
        <p className="text-[14px] text-on-surface-variant leading-relaxed">
          Aprende a medir y optimizar los luxes y la exposición solar para evitar hojas quemadas o etioladas en tu colección.
        </p>

        {/* Professional Endorsement Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-3 text-on-surface-variant text-[12px]">
          <div className="flex items-center gap-1 text-secondary font-semibold">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>4 min de lectura</span>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-container-lowest px-2.5 py-1 rounded-full shadow-xs text-on-surface border border-surface-container">
            <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              health_and_safety
            </span>
            <span className="font-semibold text-primary">Aval {AGRONOMIST_INFO.name}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
              {AGRONOMIST_INFO.matricula}
            </span>
          </div>
        </div>
      </section>

      {/* Photometric Golden Rule Box */}
      <section className="bg-primary text-on-primary rounded-2xl p-5 shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-on-secondary shadow-sm">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              wb_sunny
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-secondary-fixed uppercase tracking-wider">
              Regla de Oro Fotométrica
            </p>
            <blockquote className="text-[15px] font-medium text-on-primary italic leading-snug">
              «La luz indirecta brillante es el motor de la fotosíntesis; el sol directo sin filtro es fuego.»
            </blockquote>
          </div>
        </div>

        {/* Spectrum Breakdown */}
        <div className="pt-2 space-y-2">
          <div className="flex justify-between items-center text-secondary-fixed text-[11px] font-bold">
            <span>Espectro Lumínico Diagnóstico</span>
            <span className="text-on-primary text-[12px] font-mono">Unidad: Lux (lx)</span>
          </div>

          <div className="w-full grid grid-cols-4 gap-1 h-3 rounded-full overflow-hidden p-0.5 bg-primary-container">
            <div className="bg-surface-variant rounded-l-full" />
            <div className="bg-secondary-fixed-dim" />
            <div className="bg-secondary-container" />
            <div className="bg-tertiary-fixed-dim rounded-r-full" />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2.5 rounded-xl bg-primary-container text-on-primary space-y-0.5">
              <p className="text-[10px] font-bold text-outline-variant uppercase">Sombra / Tenue</p>
              <p className="text-[14px] font-bold">&lt; 500 Lux</p>
              <p className="text-[11px] text-on-primary-container">Crecimiento lento o nulo</p>
            </div>

            <div className="p-2.5 rounded-xl bg-primary-container text-on-primary space-y-0.5">
              <p className="text-[10px] font-bold text-secondary-fixed uppercase">Luz Indirecta Media</p>
              <p className="text-[14px] font-bold">500 - 1.500 Lux</p>
              <p className="text-[11px] text-on-primary-container">Mantenimiento seguro</p>
            </div>

            <div className="p-2.5 rounded-xl bg-secondary text-on-secondary space-y-0.5 shadow-sm">
              <p className="text-[10px] font-bold text-secondary-container flex items-center gap-1 uppercase">
                <span className="material-symbols-outlined text-[13px]">stars</span> Óptimo Fisiológico
              </p>
              <p className="text-[14px] font-bold">1.500 - 4.000 Lux</p>
              <p className="text-[11px] text-secondary-fixed">Fotosíntesis activa 100%</p>
            </div>

            <div className="p-2.5 rounded-xl bg-primary-container text-on-primary space-y-0.5">
              <p className="text-[10px] font-bold text-tertiary-fixed-dim uppercase">Sol Directo</p>
              <p className="text-[14px] font-bold">&gt; 5.000 Lux</p>
              <p className="text-[11px] text-tertiary-fixed-dim">Riesgo de quemadura foliar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Camera Sensor Measurement Card (Interactive Tool) */}
      <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">photo_camera</span>
            <h3 className="text-[16px] font-bold text-primary">Fotómetro Sensor</h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary text-[11px] font-bold">
            Herramienta IA
          </span>
        </div>

        <p className="text-[13px] text-on-surface-variant leading-relaxed">
          Apunta la cámara frontal de tu móvil hacia el follaje para estimar de inmediato la reflectancia y luxes ambientales.
        </p>

        <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between border border-surface-container">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isMeasuring ? 'bg-amber-500 animate-ping' : 'bg-secondary animate-pulse'}`} />
            <div>
              <span className="text-[12px] font-semibold text-on-surface block">
                {isMeasuring ? 'Captando fotones...' : 'Sensor calibrado (CIE standard)'}
              </span>
              <span className="text-[10px] text-secondary font-medium">{luxStatus}</span>
            </div>
          </div>
          <span className="text-[18px] font-bold text-secondary font-mono">
            {isMeasuring ? '...' : `${luxValue.toLocaleString()} Lux`}
          </span>
        </div>

        <button
          type="button"
          onClick={handleMeasure}
          disabled={isMeasuring}
          className="w-full py-3 px-4 rounded-xl bg-secondary text-on-secondary text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">solar_power</span>
          <span>{isMeasuring ? 'Midiendo iluminación...' : 'Medir Luz en Este Rincón'}</span>
        </button>
      </section>

      {/* Hand Shadow Quick Test Card */}
      <section className="bg-surface-container rounded-2xl p-4 shadow-sm border border-surface-container-high space-y-2.5">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-[22px]">front_hand</span>
          <h3 className="text-[16px] font-bold">Test Rápido de la Sombra de la Mano</h3>
        </div>
        <p className="text-[13px] text-on-surface-variant leading-relaxed">
          Sin luxómetro profesional: coloca una hoja de papel blanco junto a tu planta y coloca tu mano a 30 cm de ella hacia la ventana.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container space-y-1">
            <div className="flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
              <span className="font-bold text-[12px]">Sombra Nítida</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-snug">
              Bordes definidos = <strong className="text-primary">Luz brillante</strong>. Ideal para Monsteras y Ficus.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container space-y-1">
            <div className="flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">blur_on</span>
              <span className="font-bold text-[12px]">Sombra Difusa</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-snug">
              Silueta suave o gris = <strong className="text-primary">Luz filtrada</strong>. Seguro para Calatheas.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Seasonal Adjustment Toggles */}
      <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-primary flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">sync_alt</span>
            Calibración por Estación
          </h3>
          <span className="text-[11px] text-secondary font-bold">Automático</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 p-1 bg-surface-container-low rounded-xl">
          <button
            type="button"
            onClick={() => setSeasonMode('winter')}
            className={`py-2 px-3 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-1 ${
              seasonMode === 'winter'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">ac_unit</span>
            Adaptar a Invierno
          </button>
          <button
            type="button"
            onClick={() => setSeasonMode('summer')}
            className={`py-2 px-3 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-1 ${
              seasonMode === 'summer'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
            Filtro de Verano
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container text-on-surface space-y-1 border border-surface-container-high">
          {seasonMode === 'winter' ? (
            <>
              <div className="flex items-center gap-1 text-secondary text-[12px] font-bold">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span>Régimen Invernal: Acercar a Ventanas</span>
              </div>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                La inclinación solar reduce hasta un 65% de los luxes que entran por el vano. Mueve tus macetas 50-80 cm más cerca del vidrio para compensar días cortos.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 text-secondary text-[12px] font-bold">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span>Filtro de Verano: Alejar 1m del Vidrio</span>
              </div>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                El efecto lupa del vidrio en verano eleva la temperatura foliar a más de 38°C en minutos. Interpón visillo blanco o retrocede la maceta hacia el interior.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Cuidados para Tus Plantas Registradas */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-bold text-primary">Cuidados para Tus Plantas</h3>
            <p className="text-[12px] text-on-surface-variant">Prescripción fotométrica según tus {plants.length} ejemplares</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
            {plants.length} activas
          </span>
        </div>

        {/* Plant 1: Monstera Deliciosa */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
          <div className="flex items-start gap-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8cungEzYVi_m66UNoGBEf8ciPxGSOCqvH88foKjBy4SpNVNdl4ZjtN8JNGo8S1fBIAOBBrYmpJqYltznFnPYxSOrXPmXnqOn8Jhq2Pg-l11O83zJq0578jhWIgYBYzykp70t4oxa6UyNC8Wn1wgk-m7BEZOdFp6dawhM8EIbIpetf_3diQ-mVd6eLHaTOtHxYp1ujpc8IU6RTVQK_iSiFX9E2XgqdqI-bfU7vJUoosD8h8PhFZWYQ"
              alt="Monstera Deliciosa"
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[15px] text-primary truncate">Monstera Deliciosa</h4>
              <p className="text-[11px] text-on-surface-variant">Maceta Living Room · Sector Este</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                En Cuidados Activos
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 p-2 bg-surface-container-low rounded-xl text-primary text-[12px]">
              <span className="material-symbols-outlined text-[18px] text-secondary">light_mode</span>
              <span className="font-bold">Requerimiento:</span>
              <span>2.000 - 3.500 Lux (Indirecta Brillante)</span>
            </div>
            <div className="p-2.5 bg-surface-container rounded-xl text-[11px] space-y-0.5">
              <p className="text-secondary uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">pin_drop</span> Ubicación Ideal
              </p>
              <p className="text-on-surface">A 1-2 metros de una ventana orientada al Este o Norte para recibir el primer sol suave.</p>
            </div>
            <div className="p-2.5 bg-error-container text-on-error-container rounded-xl text-[11px] space-y-0.5">
              <p className="text-error uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span> Alarma Lumínica
              </p>
              <p>Hojas sin fenestraciones = falta de luz. Manchas marrones crujientes = quemadura solar.</p>
            </div>
          </div>
        </div>

        {/* Plant 2: Ficus Lyrata */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
          <div className="flex items-start gap-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjyr-wf5mAC2xY2lOvnjksooJ4xp3R38ced5P5jpb71EryzOy4LzzbHKyPaYRc0cQu-aXGbqdLORwVDQd8JuPKqNPlXqSVZJR5zNNF9WRacwvWKMDF5NFE455HSkqyUp1PB2ma5X4GpU7hxdhc6L_6yGGC4u60aw-drhp27rGyxTB5koc-cKlS7PkPgi0TM9yccIj4uU4QouMgfYT34SAd3zxKt5o5S9rnE4vzXTunJ8ofmhunTqzs"
              alt="Ficus Lyrata"
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[15px] text-primary truncate">Ficus Lyrata</h4>
              <p className="text-[11px] text-on-surface-variant">Rincón Biblioteca · Maceta Cerámica</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold">
                <span className="material-symbols-outlined text-[13px]">healing</span>
                En Tratamiento
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 p-2 bg-surface-container-low rounded-xl text-primary text-[12px]">
              <span className="material-symbols-outlined text-[18px] text-secondary">flare</span>
              <span className="font-bold">Requerimiento:</span>
              <span>3.000 - 5.000 Lux (Alta exigencia)</span>
            </div>
            <div className="p-2.5 bg-surface-container rounded-xl text-[11px] space-y-0.5">
              <p className="text-secondary uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">pin_drop</span> Ubicación Ideal
              </p>
              <p className="text-on-surface">Pegado a ventana luminosa con cortina fina traslúcida o sol directo matutino temprano.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Consultation Floating Card */}
      <section className="bg-primary-container text-on-primary rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0 text-on-secondary-fixed shadow-sm">
            <span className="material-symbols-outlined text-[24px]">psychology</span>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-[15px] text-on-primary">¿Dudas sobre la ubicación de tu planta?</h4>
            <p className="text-[12px] text-on-primary-container leading-relaxed">
              Toma una foto de tu ventana y la esquina donde descansa la maceta. El <strong>{AGRONOMIST_INFO.name}</strong> analizará la trayectoria solar y el índice de refracción.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onConsult('Ubicación e Iluminación Solar')}
          className="w-full py-3 px-4 rounded-xl bg-secondary text-on-secondary text-[13px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
          <span>Consultar con el Botánico</span>
        </button>
      </section>
    </div>
  );
};
