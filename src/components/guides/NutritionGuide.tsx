import React, { useState } from 'react';
import { Plant } from '../../types';
import { AGRONOMIST_INFO } from '../../data/mockData';

interface NutritionGuideProps {
  plants: Plant[];
  onConsult: (topic: string) => void;
}

export const NutritionGuide: React.FC<NutritionGuideProps> = ({ plants, onConsult }) => {
  const [selectedFertilizer, setSelectedFertilizer] = useState<'liquid' | 'granulated' | 'organic'>('liquid');
  const [selectedSeason, setSelectedSeason] = useState<'active' | 'dormant'>('active');
  const [showCalculator, setShowCalculator] = useState(false);
  const [potDiameter, setPotDiameter] = useState<number>(18); // cm
  const [calculatedMl, setCalculatedMl] = useState<number | null>(null);

  const calculateDose = () => {
    // Agronomic formula based on pot volume
    const radius = potDiameter / 2;
    const height = potDiameter * 0.9;
    const volumeLiters = (Math.PI * Math.pow(radius, 2) * height) / 1000;
    
    let dose = 0;
    if (selectedFertilizer === 'liquid') {
      dose = Math.round(volumeLiters * 0.5 * 10) / 10; // 0.5 ml per liter of substrate (50% safety margin)
    } else if (selectedFertilizer === 'granulated') {
      dose = Math.round(volumeLiters * 2.5); // 2.5g per liter
    } else {
      dose = Math.round(volumeLiters * 15); // 15g humus
    }
    setCalculatedMl(dose);
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-5 animate-in fade-in duration-300">
      {/* Header & Badges */}
      <section className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Protocolo Agronómico Oficial
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            5 min de lectura
          </span>
        </div>

        <div>
          <h2 className="text-[26px] font-bold text-primary leading-tight">
            Nutrición Vegetal y Fertilización
          </h2>
          <p className="text-[14px] text-on-surface-variant mt-1 leading-relaxed">
            Aprende a nutrir tus plantas de interior con criterio agronómico, balance N-P-K y previene quemaduras radiculares o carencias minerales.
          </p>
        </div>

        {/* Agronomist Badge */}
        <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl border border-surface-container-high/60">
          <img
            src={AGRONOMIST_INFO.avatar}
            alt={AGRONOMIST_INFO.name}
            className="w-11 h-11 rounded-full object-cover shadow-sm flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[13px] text-primary truncate">
                {AGRONOMIST_INFO.name}
              </span>
              <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
            <span className="text-[12px] text-on-surface-variant truncate">
              {AGRONOMIST_INFO.matricula} · Asesor Técnico
            </span>
          </div>
        </div>
      </section>

      {/* Golden Rule Card */}
      <section className="relative overflow-hidden bg-primary-container text-on-primary rounded-2xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-2 text-secondary-fixed">
          <span className="material-symbols-outlined text-[20px]">emoji_objects</span>
          <span className="text-[11px] font-bold uppercase tracking-wider">Regla de Oro de Fertilización</span>
        </div>
        <blockquote className="text-[16px] font-medium leading-snug mb-4 text-surface-bright italic">
          «Menos es más: es 10 veces más fácil matar una planta por exceso de sales que por falta de abono. Fertiliza siempre sobre sustrato previamente humedecido.»
        </blockquote>

        {/* Trio N-P-K */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-primary/60 p-2.5 rounded-xl flex flex-col backdrop-blur-sm border border-white/10">
            <span className="text-[18px] text-secondary-fixed font-black">N</span>
            <span className="text-[11px] text-on-primary font-bold">Nitrógeno</span>
            <p className="text-[11px] text-surface-container-high mt-0.5 leading-tight">Follaje verde y brotes vigorosos.</p>
          </div>
          <div className="bg-primary/60 p-2.5 rounded-xl flex flex-col backdrop-blur-sm border border-white/10">
            <span className="text-[18px] text-primary-fixed font-black">P</span>
            <span className="text-[11px] text-on-primary font-bold">Fósforo</span>
            <p className="text-[11px] text-surface-container-high mt-0.5 leading-tight">Raíces fuertes y resistencia.</p>
          </div>
          <div className="bg-primary/60 p-2.5 rounded-xl flex flex-col backdrop-blur-sm border border-white/10">
            <span className="text-[18px] text-tertiary-fixed font-black">K</span>
            <span className="text-[11px] text-on-primary font-bold">Potasio</span>
            <p className="text-[11px] text-surface-container-high mt-0.5 leading-tight">Estructura celular y turgencia.</p>
          </div>
        </div>
      </section>

      {/* Dosificador Rápido */}
      <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container-high/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">calculate</span>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-primary">Dosificador Rápido</h3>
              <span className="text-[12px] text-on-surface-variant">Protocolo seguro de aplicación</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary text-[11px] font-semibold">
            Guía Práctica
          </span>
        </div>

        <div className="space-y-2 pt-1">
          <label className="text-[13px] font-semibold text-on-surface block">
            Tipo de fertilizante seleccionado:
          </label>

          {/* Selector options */}
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => setSelectedFertilizer('liquid')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                selectedFertilizer === 'liquid'
                  ? 'bg-surface-container-low text-primary ring-1 ring-secondary/30'
                  : 'bg-surface-container-lowest text-on-surface-variant border border-surface-container'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`material-symbols-outlined text-[20px] ${selectedFertilizer === 'liquid' ? 'text-secondary' : 'text-outline'}`}>
                  water_drop
                </span>
                <span className="text-[13px] font-semibold">Líquido Foliar / Riego</span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: selectedFertilizer === 'liquid' ? "'FILL' 1" : "'FILL' 0" }}>
                {selectedFertilizer === 'liquid' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFertilizer('granulated')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                selectedFertilizer === 'granulated'
                  ? 'bg-surface-container-low text-primary ring-1 ring-secondary/30'
                  : 'bg-surface-container-lowest text-on-surface-variant border border-surface-container'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`material-symbols-outlined text-[20px] ${selectedFertilizer === 'granulated' ? 'text-secondary' : 'text-outline'}`}>
                  grain
                </span>
                <span className="text-[13px] font-semibold">Granulado Lenta Liberación (Osmocote)</span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: selectedFertilizer === 'granulated' ? "'FILL' 1" : "'FILL' 0" }}>
                {selectedFertilizer === 'granulated' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFertilizer('organic')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                selectedFertilizer === 'organic'
                  ? 'bg-surface-container-low text-primary ring-1 ring-secondary/30'
                  : 'bg-surface-container-lowest text-on-surface-variant border border-surface-container'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`material-symbols-outlined text-[20px] ${selectedFertilizer === 'organic' ? 'text-secondary' : 'text-outline'}`}>
                  compost
                </span>
                <span className="text-[13px] font-semibold">Orgánico (Humus de Lombriz)</span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: selectedFertilizer === 'organic' ? "'FILL' 1" : "'FILL' 0" }}>
                {selectedFertilizer === 'organic' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </button>
          </div>

          {/* Dynamic Recommendation Box */}
          <div className="bg-surface-container p-3 rounded-xl flex items-start gap-2.5 mt-2">
            <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0 mt-0.5">
              shield
            </span>
            <div>
              <span className="font-bold text-[12px] text-primary block">Margen de Seguridad Preventivo</span>
              <p className="text-[12px] text-on-surface-variant mt-0.5 leading-relaxed">
                {selectedFertilizer === 'liquid' && (
                  <>Dilución de seguridad recomendada: <strong>Diluir al 50%</strong> de la dosis que indica la etiqueta comercial. En macetas interiores sin lixiviado continuo, las sales se acumulan rápidamente.</>
                )}
                {selectedFertilizer === 'granulated' && (
                  <>Granulado controlado: Esparcir <strong>1 cucharadita (5g)</strong> en la superficie por cada 2 litros de sustrato. Se activa progresivamente con la temperatura y la humedad de cada riego.</>
                )}
                {selectedFertilizer === 'organic' && (
                  <>Orgánico natural: El humus de lombriz <strong>no genera quemaduras químicas</strong>. Aplicar una capa superior de 1 a 2 cm cada 45 días e integrarla ligeramente con el sustrato superficial.</>
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowCalculator(true);
              calculateDose();
            }}
            className="mt-2 w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-bold text-[13px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">science</span>
            <span>Calcular Dosis de mi Fertilizante</span>
          </button>
        </div>
      </section>

      {/* Interactive Dose Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl shadow-2xl p-5 border border-surface-container-high space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">calculate</span>
                <h3 className="font-bold text-[16px] text-primary">Calculadora de Dosis</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCalculator(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-on-surface block mb-1">
                Diámetro de tu maceta: <span className="text-secondary font-bold">{potDiameter} cm</span>
              </label>
              <input
                type="range"
                min="10"
                max="40"
                step="2"
                value={potDiameter}
                onChange={(e) => {
                  setPotDiameter(Number(e.target.value));
                  calculateDose();
                }}
                className="w-full accent-secondary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                <span>10 cm (Macetita)</span>
                <span>25 cm (Mediana)</span>
                <span>40 cm (Grande)</span>
              </div>
            </div>

            <div className="p-3 bg-secondary-container/40 rounded-xl border border-secondary-container text-center space-y-1">
              <span className="text-[11px] text-on-secondary-container uppercase tracking-wider font-bold">
                Dosis Calculada con Filtro de Seguridad
              </span>
              <div className="text-[28px] font-black text-primary">
                {calculatedMl} {selectedFertilizer === 'liquid' ? 'ml' : 'gramos'}
              </div>
              <p className="text-[11px] text-on-surface-variant">
                {selectedFertilizer === 'liquid'
                  ? 'Disolver en 1 litro de agua reposada a temperatura ambiente.'
                  : 'Distribuir de forma homogénea en la superficie del sustrato.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCalculator(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold text-[13px]"
            >
              Aplicar a mi Rutina
            </button>
          </div>
        </div>
      )}

      {/* Diagnóstico Visual de Carencias */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-bold text-primary">Diagnóstico Visual de Carencias</h3>
            <p className="text-[12px] text-on-surface-variant">Identifica síntomas foliares en segundos</p>
          </div>
          <span className="material-symbols-outlined text-secondary text-[22px]">health_and_safety</span>
        </div>

        <div className="space-y-2.5">
          {/* Clorosis Férrica */}
          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm border border-surface-container flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex-shrink-0 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]">potted_plant</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold text-[13px] text-primary truncate">Clorosis Férrica (Fe)</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-semibold flex-shrink-0">
                  Hojas Nuevas
                </span>
              </div>
              <p className="text-[12px] text-on-surface-variant leading-snug">
                Lámina foliar amarilla brillante mientras las nervaduras permanecen verde oscuro nítido.
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-secondary text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px]">healing</span>
                <span>Solución: Quelatos de hierro aplicados al riego.</span>
              </div>
            </div>
          </div>

          {/* Nitrógeno */}
          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm border border-surface-container flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex-shrink-0 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">eco</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold text-[13px] text-primary truncate">Carencia de Nitrógeno (N)</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-semibold flex-shrink-0">
                  Hojas Viejas
                </span>
              </div>
              <p className="text-[12px] text-on-surface-variant leading-snug">
                Amarillamiento uniforme que arranca en las hojas basales. La planta moviliza N hacia los ápices nuevos.
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-secondary text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px]">healing</span>
                <span>Solución: Riego balanceado rico en nitrógeno orgánico.</span>
              </div>
            </div>
          </div>

          {/* Potasio */}
          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm border border-surface-container flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex-shrink-0 flex items-center justify-center text-tertiary-container">
              <span className="material-symbols-outlined text-[22px]">local_fire_department</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold text-[13px] text-primary truncate">Carencia de Potasio (K)</span>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-semibold flex-shrink-0">
                  Bordes
                </span>
              </div>
              <p className="text-[12px] text-on-surface-variant leading-snug">
                Bordes foliares secos, marrones y quebradizos ("borde de fuego"). Pérdida de turgencia.
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-secondary text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px]">healing</span>
                <span>Solución: Sulfato de potasio o té de cáscaras orgánico.</span>
              </div>
            </div>
          </div>

          {/* Toxicidad por Sales */}
          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm border border-surface-container flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-error-container flex-shrink-0 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[22px]">warning</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold text-[13px] text-primary truncate">Toxicidad por Sales</span>
                <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-semibold flex-shrink-0">
                  Urgente
                </span>
              </div>
              <p className="text-[12px] text-on-surface-variant leading-snug">
                Puntas negras quemadas, costra blanca de sales en la tierra.
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-error text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px]">priority_high</span>
                <span>Acción: Lavado exhaustivo de raíces con agua pura.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendario Estacional */}
      <section className="bg-surface-container rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[16px] text-primary">Calendario Estacional</h3>
          <span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
        </div>

        <div className="grid grid-cols-2 gap-1 p-1 bg-surface-container-high rounded-xl">
          <button
            type="button"
            onClick={() => setSelectedSeason('active')}
            className={`py-2 px-3 rounded-lg text-[12px] font-semibold transition-all ${
              selectedSeason === 'active'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant'
            }`}
          >
            Primavera - Verano
          </button>
          <button
            type="button"
            onClick={() => setSelectedSeason('dormant')}
            className={`py-2 px-3 rounded-lg text-[12px] font-semibold transition-all ${
              selectedSeason === 'dormant'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant'
            }`}
          >
            Otoño - Invierno
          </button>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container space-y-1">
          {selectedSeason === 'active' ? (
            <>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="font-bold text-[13px] text-primary">Frecuencia Alta: Cada 15 - 20 Días</span>
              </div>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                Etapa de crecimiento vegetativo y floración activa. Las plantas consumen nutrientes a gran velocidad por mayor insolación. Aportar N-P-K completo a dosis suave.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                <span className="font-bold text-[13px] text-primary">Descanso Vegetativo: Suspender o Cada 60 Días</span>
              </div>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                Con menos horas de luz y temperaturas frescas, el metabolismo se ralentiza. Fertilizar en este período provoca acumulación nociva de sales y quema las raíces inactivas.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Nutrición para tus plantas registradas */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[16px] text-primary">Nutrición para Tus Plantas</h3>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-bold">
              {plants.length} activas
            </span>
          </div>
          <span className="text-[12px] text-secondary font-semibold">Tus macetas</span>
        </div>

        <div className="space-y-3">
          {plants.slice(0, 3).map((plant) => (
            <div key={plant.id} className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm border border-surface-container space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-13 h-13 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[14px] text-primary truncate block">{plant.name}</span>
                  <span className="text-[11px] text-on-surface-variant truncate block">{plant.location}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-secondary font-semibold mt-0.5">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                    Próximo abonado: en {plant.nextFertilizingDays} días
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-low p-2.5 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary mb-0.5">
                  <span className="material-symbols-outlined text-[15px] text-secondary">biotech</span>
                  <span>Fórmula sugerida: {plant.species === 'Ficus Lyrata' ? 'Alta en Nitrógeno & Magnesio' : plant.species === 'Calathea Orbifolia' ? 'Extracto de Algas / Orgánico suave' : 'N-P-K Equilibrado (10-10-10)'}</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-snug">
                  {plant.species === 'Ficus Lyrata'
                    ? 'Requiere microelementos para consolidar la cutícula de sus enormes hojas. Diluir a 1/2 dosis.'
                    : plant.species === 'Calathea Orbifolia'
                    ? 'Evitar sales químicas concentradas. Extracto de algas o humus líquido diluido a un 1/4.'
                    : 'Diluir a 1/2 de dosis en agua reposada cada 20 días. Colocar 2 cucharadas de humus en superficie.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer: Consultar Nutrición */}
      <section className="bg-primary text-on-primary rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={AGRONOMIST_INFO.avatar}
              alt={AGRONOMIST_INFO.name}
              className="w-12 h-12 rounded-full object-cover shadow ring-2 ring-secondary"
            />
            <span className="w-3.5 h-3.5 rounded-full bg-secondary absolute bottom-0 right-0 border-2 border-primary" />
          </div>
          <div>
            <h4 className="font-bold text-[15px] text-surface-bright leading-tight">
              ¿Hojas amarillas o dudas con qué abono comprar?
            </h4>
            <span className="text-[12px] text-surface-container-high">
              Consulta directa con {AGRONOMIST_INFO.name}
            </span>
          </div>
        </div>
        <p className="text-[12px] text-surface-container leading-relaxed">
          Envía una fotografía del envase de tu fertilizante o del haz y envés de las hojas. Calcularemos la dilución exacta en mililitros según el volumen de tu maceta.
        </p>
        <button
          type="button"
          onClick={() => onConsult('Nutrición y Fertilización')}
          className="w-full py-3.5 px-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed text-[13px] flex items-center justify-center gap-2 font-bold shadow-sm active:scale-[0.98] transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            photo_camera
          </span>
          <span>Consultar Nutrición con Emmanuel</span>
        </button>
      </section>
    </div>
  );
};
