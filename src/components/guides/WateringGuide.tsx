import React, { useState } from 'react';
import { Plant } from '../../types';
import { AGRONOMIST_INFO } from '../../data/mockData';

interface WateringGuideProps {
  plants: Plant[];
  onConsult: (topic: string) => void;
  onShowToast: (msg: string) => void;
}

export const WateringGuide: React.FC<WateringGuideProps> = ({ onConsult, onShowToast }) => {
  const [moistureLevel, setMoistureLevel] = useState<1 | 2 | 3>(1);
  const [bioclimaticEnabled, setBioclimaticEnabled] = useState(true);
  const [winterRestEnabled, setWinterRestEnabled] = useState(true);

  return (
    <div className="flex flex-col w-full pb-10 space-y-5 animate-in fade-in duration-300">
      {/* Verification & Clinical Header */}
      <section className="flex flex-col gap-2 pt-2">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          <span className="text-[11px] font-bold tracking-wide uppercase">Protocolo Agronómico Oficial</span>
        </div>

        <div>
          <h2 className="text-[26px] font-bold text-primary leading-tight">
            Riego y Cuidados Especiales
          </h2>
          <p className="text-[14px] text-on-surface-variant mt-1 leading-relaxed">
            Aprende a interpretar la sed de tus plantas sin asfixiar sus raíces con rigor botánico.
          </p>
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-[12px] font-semibold">
            <span className="material-symbols-outlined text-[15px] text-secondary">schedule</span>
            <span>5 min de lectura práctica</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-[12px] font-semibold">
            <span className="material-symbols-outlined text-[15px] text-secondary">psychiatry</span>
            <span>Aval {AGRONOMIST_INFO.name} ({AGRONOMIST_INFO.matricula})</span>
          </div>
        </div>
      </section>

      {/* Visual Hero / Clinical Focus Card */}
      <section className="relative w-full rounded-2xl overflow-hidden shadow-sm bg-surface-container-lowest border border-surface-container">
        <div
          className="w-full h-44 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdnaOlCBxAWG5qgoHlFfvmYOSFq9BSdL0r9GFSvh7_Ftfaq8NZRQnCvHSvdbXVXj5yoy6_jFLxduMnSGZoszRP9RV4L7j0BkwyAV_DsmN0Kahe0-TxCBFsQac-o694uBcwW4RPHZphrcYGXH6yntx5BIVzCIEsxVK3awtvoQgxMpjni2R_oTHezDf9HF4UgJga39l2uszadz4qb2kx45zNM_nGVZHYMTrO6uM7wbL4HmCbvQBqXeMG')`,
          }}
        />
        <div className="p-4 flex flex-col gap-1 bg-surface-container-lowest">
          <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Regla de Oro Botánica</span>
          <p className="text-[17px] font-bold text-primary leading-snug">«El exceso de agua ahoga más raíces que la sequía»</p>
          <p className="text-[12px] text-on-surface-variant leading-relaxed">
            Las raíces necesitan respirar oxígeno entre riego y riego tanto como absorber nutrientes solubles.
          </p>
        </div>
      </section>

      {/* Interactive Moisture Diagnostic Tester */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">water_ph</span>
            <h3 className="text-[16px] font-bold text-primary">¿Cuándo Regar Realmente?</h3>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">
            Diagnóstico táctil
          </span>
        </div>

        {/* Moisture Selector Pill Buttons */}
        <div className="grid grid-cols-3 gap-1.5 bg-surface-container p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setMoistureLevel(1)}
            className={`flex flex-col items-center py-2 px-1 rounded-lg text-center transition-all ${
              moistureLevel === 1
                ? 'bg-surface-container-lowest shadow-xs text-primary font-bold'
                : 'text-on-surface-variant font-medium'
            }`}
          >
            <span className="text-[12px]">Nivel 1</span>
            <span className="text-[10px] text-on-surface-variant">Superficie seca</span>
          </button>
          <button
            type="button"
            onClick={() => setMoistureLevel(2)}
            className={`flex flex-col items-center py-2 px-1 rounded-lg text-center transition-all ${
              moistureLevel === 2
                ? 'bg-surface-container-lowest shadow-xs text-primary font-bold'
                : 'text-on-surface-variant font-medium'
            }`}
          >
            <span className="text-[12px]">Nivel 2</span>
            <span className="text-[10px] text-on-surface-variant">2/3 seco</span>
          </button>
          <button
            type="button"
            onClick={() => setMoistureLevel(3)}
            className={`flex flex-col items-center py-2 px-1 rounded-lg text-center transition-all ${
              moistureLevel === 3
                ? 'bg-surface-container-lowest shadow-xs text-primary font-bold'
                : 'text-on-surface-variant font-medium'
            }`}
          >
            <span className="text-[12px]">Nivel 3</span>
            <span className="text-[10px] text-on-surface-variant">Reseco total</span>
          </button>
        </div>

        {/* Dynamic Moisture Panel */}
        {moistureLevel === 1 && (
          <div className="flex flex-col gap-3 p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary-container text-on-secondary-container flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">front_hand</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-primary">¡Pausa! No regar todavía</span>
                <span className="text-[12px] text-secondary font-medium">Humedad activa presente en zona radicular media</span>
              </div>
            </div>
            <p className="text-[13px] text-on-surface leading-relaxed">
              La parte superior se deshidrata por evaporación ambiental normal, pero la base conserva reservas suficientes. Regar ahora compactaría el suelo e iniciaría anoxia en las micro-raicillas.
            </p>
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex justify-between text-[11px] text-on-surface-variant">
                <span>0 cm (Seco)</span>
                <span>5 cm (Secando)</span>
                <span className="text-secondary font-bold">12 cm (Húmedo)</span>
              </div>
              <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                <div className="w-1/3 bg-surface-container-highest" />
                <div className="w-1/3 bg-primary-fixed-dim" />
                <div className="w-1/3 bg-secondary" />
              </div>
            </div>
          </div>
        )}

        {moistureLevel === 2 && (
          <div className="flex flex-col gap-3 p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-fixed text-on-primary-fixed flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">shower</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-primary">Momento Óptimo de Riego</span>
                <span className="text-[12px] text-secondary font-medium">Oxigenación balanceada y suelo poroso</span>
              </div>
            </div>
            <p className="text-[13px] text-on-surface leading-relaxed">
              El sustrato está suelto al tacto en sus dos tercios superiores. El cepellón completó su ciclo de secado fisiológico natural: aplica agua hasta notar drenaje fluido inferior.
            </p>
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex justify-between text-[11px] text-on-surface-variant">
                <span>0 cm (Aireado)</span>
                <span>5 cm (Seco)</span>
                <span className="text-primary font-bold">12 cm (Ligeramente fresco)</span>
              </div>
              <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                <div className="w-2/3 bg-surface-container-highest" />
                <div className="w-1/3 bg-primary-fixed-dim" />
              </div>
            </div>
          </div>
        )}

        {moistureLevel === 3 && (
          <div className="flex flex-col gap-3 p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-tertiary-fixed text-on-tertiary-fixed-variant flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">warning</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-tertiary">Sustrato Hidrófobo / Reseco</span>
                <span className="text-[12px] text-on-tertiary-container font-medium">El agua resbalará por los bordes sin absorber</span>
              </div>
            </div>
            <p className="text-[13px] text-on-surface leading-relaxed">
              La turba se contrajo y se separó del borde de la maceta. Un riego superficial tradicional es inútil: requiere inmersión suave de 15 minutos en bandeja con agua tibia para rehidratar el corazón radicular.
            </p>
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex justify-between text-[11px] text-on-surface-variant">
                <span className="text-tertiary font-bold">Sustrato 100% desecado</span>
                <span className="text-error font-bold">Inmersión urgente</span>
              </div>
              <div className="h-3 w-full bg-tertiary-fixed-dim rounded-full overflow-hidden">
                <div className="w-full bg-tertiary-fixed" />
              </div>
            </div>
          </div>
        )}

        {/* Practical Tip */}
        <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-start gap-3">
          <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0 mt-0.5">straighten</span>
          <div>
            <span className="text-[13px] font-bold text-primary block">La Técnica del Palillo de Bambú</span>
            <p className="text-[12px] text-on-surface-variant mt-0.5 leading-snug">
              Introduce un palillo de madera hasta el fondo de la maceta y retíralo. Si sale oscuro y con partículas adheridas, hay humedad profunda. Si sale completamente limpio, es hora de regar.
            </p>
          </div>
        </div>
      </section>

      {/* Irrigation Methods by Specie */}
      <section className="space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">format_paint</span>
            <h3 className="text-[16px] font-bold text-primary">Métodos de Riego por Especie</h3>
          </div>
          <p className="text-[12px] text-on-surface-variant">Cada fisiología foliar exige una vía de absorción adaptada.</p>
        </div>

        <div className="space-y-2.5">
          {/* Method 1 */}
          <article className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[19px]">waves</span>
                </div>
                <h4 className="font-bold text-[13px] text-primary">Riego por Inmersión / Bandeja</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">Fondo</span>
            </div>
            <p className="text-[12px] text-on-surface-variant leading-snug">
              Sumerge la base de la maceta 15-20 min hasta humedecer la zona inferior. Protege el centro del follaje contra pudrición fúngica basal.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface">Calatheas</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface">Helecho Boston</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface">Begonias Rex</span>
            </div>
          </article>

          {/* Method 2 */}
          <article className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[19px]">vital_signs</span>
                </div>
                <h4 className="font-bold text-[13px] text-primary">Capilaridad / Plato Inferior</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface">Autorregulado</span>
            </div>
            <p className="text-[12px] text-on-surface-variant leading-snug">
              Vierte 2 cm de agua en el plato inferior; el sustrato ascenderá el líquido por microconductos naturales. Retirar el sobrante a los 30 min.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface">Pilea</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface">Fitonias</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface">Peperomias</span>
            </div>
          </article>

          {/* Method 3 */}
          <article className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[19px]">water_drop</span>
                </div>
                <h4 className="font-bold text-[13px] text-primary">Superior Lento y Uniforme</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">Clásico</span>
            </div>
            <p className="text-[12px] text-on-surface-variant leading-snug">
              Riega en círculo suavemente por todo el perímetro sin tocar el tallo. Espera a que fluya 10-15% del volumen por los orificios inferiores.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface">Monstera</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface">Ficus Lyrata</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface">Pothos</span>
            </div>
          </article>

          {/* Method 4 */}
          <article className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[19px]">air</span>
                </div>
                <h4 className="font-bold text-[13px] text-primary">Nebulización / Humedad Foliar</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant">Ambiental</span>
            </div>
            <p className="text-[12px] text-on-surface-variant leading-snug">
              Pulverizar el follaje <strong>NO sustituye el riego</strong> del sustrato. Mejora la transpiración estomática en interiores con calefacción.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface">Orquídeas</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface">Palmera Areca</span>
            </div>
          </article>
        </div>
      </section>

      {/* Water Quality Section */}
      <section className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
            <span className="material-symbols-outlined text-[20px]">science</span>
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-primary leading-tight">El Enemigo Invisible: Cloro y Cal</h3>
            <span className="text-[11px] text-on-surface-variant">Química del agua aplicada a la botánica doméstica</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container/60 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0 mt-0.5">hourglass_bottom</span>
            <div>
              <span className="font-bold text-[12px] text-primary block">Decloración pasiva de 24 horas</span>
              <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                Llena tu regadera y déjala reposar sin tapa durante un día completo. El cloro gaseoso se volatilizará evitando quemaduras apicales.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container/60 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0 mt-0.5">thermostat</span>
            <div>
              <span className="font-bold text-[12px] text-primary block">Temperatura ambiente templada</span>
              <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                Nunca uses agua helada directamente del grifo en invierno. Provoca choque térmico e interrumpe absorción de hierro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Protocol: Root Asphyxia */}
      <section className="p-4 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed shadow-sm border border-tertiary-container/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              medical_services
            </span>
            <h3 className="text-[16px] font-bold text-on-tertiary-fixed">Protocolo de Asfixia Radicular</h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-error-container text-on-error-container">
            Alerta SOS
          </span>
        </div>
        <p className="text-[12px] text-on-tertiary-fixed-variant leading-snug">
          ¿Regaste en exceso y notas decaimiento? Los síntomas son traicioneros: la planta parece marchita pero la tierra está saturada.
        </p>

        <div className="space-y-1.5 py-1">
          <div className="flex items-center gap-2 text-[12px]">
            <span className="material-symbols-outlined text-[15px] text-error">cancel</span>
            <span>Hojas basales translúcidas, amarillas y flácidas.</span>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <span className="material-symbols-outlined text-[15px] text-error">cancel</span>
            <span>Olor mohoso en el orificio de drenaje inferior.</span>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <span className="material-symbols-outlined text-[15px] text-error">cancel</span>
            <span>Pérdida súbita de turgencia sin haber recibido sol directo.</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider block">Pasos de Primeros Auxilios Botánicos</span>
          <div className="space-y-1.5 text-[11px]">
            <div className="p-2 rounded-lg bg-surface-container-lowest text-on-surface flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px]">1</span>
              <span>Cese absoluto de riego y retirar plato con agua estancada.</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-lowest text-on-surface flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px]">2</span>
              <span>Desmoldar el cepellón y envolver en papel absorbente por 24h.</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-lowest text-on-surface flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px]">3</span>
              <span>Poda de raíces oscuras/blandas con tijeras desinfectadas.</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-lowest text-on-surface flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px]">4</span>
              <span>Espolvorear canela molida (antifúngico) antes de repotear.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Smart Reminders & Toggles */}
      <section className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">notifications_active</span>
          </div>
          <div>
            <span className="font-bold text-[15px] text-primary block">Recordatorios Vivos</span>
            <span className="text-[11px] text-on-surface-variant">Ajustados al clima y humedad ambiente local</span>
          </div>
        </div>

        <div className="divide-y divide-surface-container">
          <div className="flex items-center justify-between py-2.5">
            <div className="pr-3">
              <span className="text-[13px] font-bold text-primary block">Adaptación bioclimática</span>
              <span className="text-[11px] text-on-surface-variant">Pospone riegos en días nublados o lluviosos.</span>
            </div>
            <button
              type="button"
              onClick={() => setBioclimaticEnabled(!bioclimaticEnabled)}
              className={`w-12 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                bioclimaticEnabled ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-xs ${
                  bioclimaticEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <div className="pr-3">
              <span className="text-[13px] font-bold text-primary block">Modo reposo invernal</span>
              <span className="text-[11px] text-on-surface-variant">Reduce frecuencia un 40% durante los meses fríos.</span>
            </div>
            <button
              type="button"
              onClick={() => setWinterRestEnabled(!winterRestEnabled)}
              className={`w-12 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                winterRestEnabled ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-xs ${
                  winterRestEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onShowToast('¡Listo! Calendario inteligente de riego sincronizado con tu zona.')}
          className="w-full py-3 rounded-xl bg-primary text-on-primary text-[13px] font-bold flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">notifications_none</span>
          <span>Activar Notificaciones de Riego</span>
        </button>
      </section>

      {/* Secondary Consultation Trigger */}
      <section className="p-3.5 rounded-2xl bg-surface-container flex items-center justify-between gap-3 border border-surface-container-high">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </div>
          <div>
            <span className="font-bold text-[13px] text-primary block">¿Dudas con tu espécimen?</span>
            <span className="text-[11px] text-on-surface-variant">Envía una foto del sustrato a nuestro botánico</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onConsult('Riego y Sustrato')}
          className="px-3 py-2 rounded-xl bg-primary-container text-on-primary text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-transform flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[15px]">photo_camera</span>
          <span>Consultar</span>
        </button>
      </section>
    </div>
  );
};
