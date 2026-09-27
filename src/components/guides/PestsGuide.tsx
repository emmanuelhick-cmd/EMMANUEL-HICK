import React, { useState } from 'react';
import { Plant } from '../../types';
import { AGRONOMIST_INFO } from '../../data/mockData';

interface PestsGuideProps {
  plants: Plant[];
  onConsult: (topic: string) => void;
}

export const PestsGuide: React.FC<PestsGuideProps> = ({ onConsult }) => {
  const [highlightedPest, setHighlightedPest] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleChipClick = (id: string) => {
    setHighlightedPest(id);
    const element = document.getElementById(`pest-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => setHighlightedPest(null), 2500);
  };

  const handleScanMacro = () => {
    setScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setScanning(false);
      setScanResult('Detección Macro: Posible micro-punteado compatible con ácaros o polvillo superficial. Se recomienda inspección de axilas.');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-5 animate-in fade-in duration-300">
      {/* Header Context Badge & Hero Intro */}
      <section className="flex flex-col gap-2 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Protocolo Agronómico Oficial
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            6 min de lectura clínica
          </span>
        </div>

        <div>
          <h2 className="text-[26px] font-bold text-primary leading-tight">
            Plagas y Sanidad Vegetal
          </h2>
          <p className="text-[14px] text-on-surface-variant mt-1 leading-relaxed">
            Aprende a identificar a tiempo las plagas y hongos más comunes en interiores antes de que comprometan el vigor y la estructura vascular de tus plantas.
          </p>
        </div>

        {/* Official Agronomist Validation Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container mt-1">
          <img
            src={AGRONOMIST_INFO.avatar}
            alt={AGRONOMIST_INFO.name}
            className="w-11 h-11 rounded-full object-cover shadow-sm flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="font-semibold text-[13px] text-primary truncate">
                {AGRONOMIST_INFO.name}
              </span>
            </div>
            <span className="text-[12px] text-on-surface-variant truncate">
              {AGRONOMIST_INFO.matricula} · Validador Jefe
            </span>
          </div>
        </div>
      </section>

      {/* Golden Rule: Botanical Triage Banner */}
      <section className="space-y-3">
        <div className="relative overflow-hidden rounded-2xl bg-primary-container text-on-primary p-4 shadow-md">
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-surface-container-highest/20 flex items-center justify-center flex-shrink-0 text-secondary-fixed">
              <span className="material-symbols-outlined text-[20px]">search_insights</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-secondary-fixed uppercase tracking-wider font-bold">
                Regla de Oro Agronómica
              </span>
              <p className="text-[14px] text-on-primary font-medium leading-snug">
                «La detección temprana en el envés de la hoja previene el 90% de las pérdidas foliares. Aislar primero, diagnosticar después.»
              </p>
            </div>
          </div>
        </div>

        {/* 3-Tier Clinical Severity Scale */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col p-2.5 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <span className="text-[11px] text-primary font-bold">Nivel 1</span>
            </div>
            <span className="text-[12px] text-on-surface font-semibold leading-tight">Presencia Aislada</span>
            <span className="text-[10px] text-on-surface-variant mt-1 leading-snug">Remoción mecánica y monitoreo cada 48h.</span>
          </div>

          <div className="flex flex-col p-2.5 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim" />
              <span className="text-[11px] text-tertiary-container font-bold">Nivel 2</span>
            </div>
            <span className="text-[12px] text-on-surface font-semibold leading-tight">Colonia Activa</span>
            <span className="text-[10px] text-on-surface-variant mt-1 leading-snug">Fitoterapia localizada (Neem + jabón potásico).</span>
          </div>

          <div className="flex flex-col p-2.5 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-error" />
              <span className="text-[11px] text-error font-bold">Nivel 3</span>
            </div>
            <span className="text-[12px] text-on-surface font-semibold leading-tight">Daño Vascular</span>
            <span className="text-[10px] text-on-surface-variant mt-1 leading-snug">Cuarentena estricta y choque biológico.</span>
          </div>
        </div>
      </section>

      {/* Interactive Diagnostic Scanner Tool */}
      <section className="flex flex-col gap-2.5 p-4 rounded-2xl bg-surface-container-low shadow-sm border border-surface-container space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">center_focus_strong</span>
            <h3 className="text-[16px] font-bold text-primary">Escáner & Lupa de Diagnóstico</h3>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
            IA Macro
          </span>
        </div>
        <p className="text-[12px] text-on-surface-variant">
          Alinea la cámara con el envés foliar o selecciona el síntoma predominante para abrir la ficha clínica directa:
        </p>

        {/* Camera Trigger */}
        <button
          type="button"
          onClick={handleScanMacro}
          disabled={scanning}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-container-lowest text-primary text-[13px] font-bold shadow-xs active:scale-[0.98] transition-transform border border-surface-container hover:bg-white"
        >
          <span className={`material-symbols-outlined text-secondary text-[20px] ${scanning ? 'animate-spin' : ''}`}>
            {scanning ? 'autorenew' : 'photo_camera'}
          </span>
          <span>{scanning ? 'Analizando micro-patrones...' : 'Inspeccionar envés con Cámara Macro'}</span>
        </button>

        {scanResult && (
          <div className="p-3 bg-secondary-container/30 rounded-xl border border-secondary-container text-[12px] text-primary space-y-1 animate-in fade-in">
            <div className="flex items-center gap-1.5 font-bold text-secondary">
              <span className="material-symbols-outlined text-[16px]">biotech</span>
              <span>Resultado Preliminar de Cámara</span>
            </div>
            <p className="leading-snug">{scanResult}</p>
          </div>
        )}

        {/* Fast symptom chips */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] text-on-surface-variant font-medium">¿Qué observas en tu ejemplar hoy?</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => handleChipClick('cochinilla')}
              className="px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface text-[12px] font-medium transition-all hover:bg-secondary hover:text-white active:scale-95"
            >
              ☁️ Pelusas blancas algodonosas
            </button>
            <button
              type="button"
              onClick={() => handleChipClick('aranuela')}
              className="px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface text-[12px] font-medium transition-all hover:bg-secondary hover:text-white active:scale-95"
            >
              🕸️ Telarañas microscópicas
            </button>
            <button
              type="button"
              onClick={() => handleChipClick('trips')}
              className="px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface text-[12px] font-medium transition-all hover:bg-secondary hover:text-white active:scale-95"
            >
              ✨ Lesiones plateadas y puntos negros
            </button>
            <button
              type="button"
              onClick={() => handleChipClick('oidio')}
              className="px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface text-[12px] font-medium transition-all hover:bg-secondary hover:text-white active:scale-95"
            >
              🍯 Hojas pegajosas / Polvo blanco
            </button>
          </div>
        </div>
      </section>

      {/* Clinical Pest Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-primary">Plagas Frecuentes en Interior</h3>
          <span className="text-[12px] text-on-surface-variant">4 Fichas Agronómicas</span>
        </div>

        {/* Pest 1: Cochinilla */}
        <article
          id="pest-cochinilla"
          className={`flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm border transition-all duration-300 ${
            highlightedPest === 'cochinilla' ? 'border-secondary ring-2 ring-secondary/30 bg-surface-container-low' : 'border-surface-container'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">pest_control</span>
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-primary leading-tight">Cochinilla Algodonosa</h4>
                <span className="text-[11px] text-on-surface-variant italic">Pseudococcidae spp.</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-bold">
              Frecuencia Alta
            </span>
          </div>

          <div className="w-full h-36 rounded-xl overflow-hidden my-2 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDJU5_Spp9_719egi8TtLz2PsZpuQb4-3D56GjKuP1IFuxHFYt29hCKaTF-VqPsSoTgNFiKH_EEbVQnfyvrlSmXz5DjiPFpToOvwE73TlkVm2PKkDEbe8ZUig5RujBM_Axd4PB6QC3WYswIpNmjchzIXYssUbkhMkMLoD0S8somcd9ViNmbEeM-C32ad7tpO4Ykj2pr7BkZwnDrfC02J3SrwdeSWM0TOV0p6qzaZwTKFWoeMrBncch"
              alt="Cochinilla algodonosa"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface text-[10px] font-medium backdrop-blur-xs">
              Axilas y pecíolos protegidos
            </span>
          </div>

          <div className="space-y-2 mt-1">
            <div>
              <span className="text-[12px] font-bold text-primary block">Síntomas Clínicos:</span>
              <p className="text-[12px] text-on-surface-variant leading-snug">
                Copos blancos cerosos adheridos en las axilas foliares y curvaturas del tallo. Segregan melaza dulce que desencadena hongo de negrilla.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
              <span className="text-[11px] text-secondary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">medication</span> Receta Agronómica de Tratamiento
              </span>
              <p className="text-[11px] text-on-surface leading-relaxed">
                1. Remoción mecánica directa con hisopo embebido en alcohol al 70%.<br />
                2. Pulverización total con Jabón Potásico (15ml/L) + Neem (5ml/L) cada 4 días durante 3 semanas.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px]">
              <span className="material-symbols-outlined text-[14px] text-tertiary">warning</span>
              <span><strong>Prevención:</strong> Evitar calefacción seca directa y falta de circulación de aire.</span>
            </div>
          </div>
        </article>

        {/* Pest 2: Arañuela Roja */}
        <article
          id="pest-aranuela"
          className={`flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm border transition-all duration-300 ${
            highlightedPest === 'aranuela' ? 'border-secondary ring-2 ring-secondary/30 bg-surface-container-low' : 'border-surface-container'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">coronavirus</span>
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-primary leading-tight">Arañuela Roja (Ácaros)</h4>
                <span className="text-[11px] text-on-surface-variant italic">Tetranychidae spp.</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold">
              Alerta Clima Seco
            </span>
          </div>

          <div className="w-full h-36 rounded-xl overflow-hidden my-2 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXN7e8XUUhafu7m-T7rXoBZssLCbAAv42_vVa43E-I5UjrmlLh_tluCUNEY4VSmKI99WqRBj_Z45c08EuffdgXhHgAYEeDRBqtOzgU7P9YsWPi_yDiKoz-ju8Fa1GTDG1uSLQekbmM3RA5g8uh7qgq9obqUCfpRCjRzzR9FjA90F4BsWAJlkw38HJjD3-cBDVolsdWIAdqwr8EnWke_K7Hodbd9UIoHLzzJYKl2F193_G0cRzG15Z4"
              alt="Arañuela roja ácaros"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface text-[10px] font-medium backdrop-blur-xs">
              Punteado fino en envés
            </span>
          </div>

          <div className="space-y-2 mt-1">
            <div>
              <span className="text-[12px] font-bold text-primary block">Síntomas Clínicos:</span>
              <p className="text-[12px] text-on-surface-variant leading-snug">
                Micro-punteado clorótico amarillento en el haz. Telarañas finísimas visibles al trasluz en el envés. Hojas pierden brillo rápidamente.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
              <span className="text-[11px] text-secondary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">medication</span> Receta Agronómica de Tratamiento
              </span>
              <p className="text-[11px] text-on-surface leading-relaxed">
                1. Ducha o lavado foliar templado para remover físicamente colonias.<br />
                2. Elevar la humedad relativa ambiental por encima del 65%.<br />
                3. Aplicar acaricida botánico a base de azufre micronizado o aceite de canela.
              </p>
            </div>
          </div>
        </article>

        {/* Pest 3: Trips */}
        <article
          id="pest-trips"
          className={`flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm border transition-all duration-300 ${
            highlightedPest === 'trips' ? 'border-secondary ring-2 ring-secondary/30 bg-surface-container-low' : 'border-surface-container'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">pest_control_rodent</span>
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-primary leading-tight">Trips</h4>
                <span className="text-[11px] text-on-surface-variant italic">Thysanoptera spp.</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-bold">
              Muy Móvil
            </span>
          </div>

          <div className="w-full h-36 rounded-xl overflow-hidden my-2 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHulQeNb5YN7a4tSv2LvTMyiwPjSxkYH9MVCquYoyrNSFbcbSkNG0GgJ6MPxamrrO8Wjd9QgMhTw0d0c7NATZL658vFjiCIAi8-EUOWDgqx4o790a7OUK5j1l0vuRFK39d2SlJ2KO71p-DGegjvs-09-chiSv8C__YRekydIpfPjG2arGl2cSScyUGgyVHWjOaz0WbwV2V4jyKqdFTw09Gqas9KXth_S2KbiZXe--ouHX2IKJx_Whb"
              alt="Trips lesiones plateadas"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface text-[10px] font-medium backdrop-blur-xs">
              Aspecto plateado brillante
            </span>
          </div>

          <div className="space-y-2 mt-1">
            <div>
              <span className="text-[12px] font-bold text-primary block">Síntomas Clínicos:</span>
              <p className="text-[12px] text-on-surface-variant leading-snug">
                Manchas alargadas plateadas por succión celular acompañadas de diminutos excrementos negros (frass). Brotes tiernos nacen arrugados.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
              <span className="text-[11px] text-secondary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">medication</span> Receta Agronómica de Tratamiento
              </span>
              <p className="text-[11px] text-on-surface leading-relaxed">
                1. Colocación de trampas cromotrópicas azules o amarillas.<br />
                2. Espolvoreo foliar con Tierra de Diatomeas micronizada en seco.<br />
                3. Aplicación de extracto de Spinosad o aceite mineral en 3 ciclos semanales.
              </p>
            </div>
          </div>
        </article>

        {/* Pest 4: Oídio */}
        <article
          id="pest-oidio"
          className={`flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm border transition-all duration-300 ${
            highlightedPest === 'oidio' ? 'border-secondary ring-2 ring-secondary/30 bg-surface-container-low' : 'border-surface-container'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">spa</span>
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-primary leading-tight">Oídio y Hongo de Negrilla</h4>
                <span className="text-[11px] text-on-surface-variant italic">Erysiphales & Capnodium spp.</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
              Fúngico
            </span>
          </div>

          <div className="w-full h-36 rounded-xl overflow-hidden my-2 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS3DAXkxSvrU3hlk3PPFLpGiFpvCHLt1XnLWVL0uwv-5iyhBC7RrhnBPkJLmG_YY5HUZEiIzhvhHNzNhwwcVXJOZzdTyBXMbqnz-Irh7WW_r17TIkS18oQMUhS0tDbmrB95yBcW9lXzfXx4ptSpByTtZYKAR3ia-hC-a9grz5Pl5a-HIhbfcKvx5EzHNLh9ztyxn_hdrm92Iiz36yzqMjHJZ7Ai-AeYzk9v6RP3Fy1TRWRCBtKvR7K"
              alt="Oídio y negrilla"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface text-[10px] font-medium backdrop-blur-xs">
              Polvillo blanco / Hollín
            </span>
          </div>

          <div className="space-y-2 mt-1">
            <div>
              <span className="text-[12px] font-bold text-primary block">Síntomas Clínicos:</span>
              <p className="text-[12px] text-on-surface-variant leading-snug">
                Capa de polvo blanquecino como harina (Oídio) o película oscura de tizne sobre melaza azucarada (Negrilla).
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
              <span className="text-[11px] text-secondary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">medication</span> Protocolo Antifúngico
              </span>
              <p className="text-[11px] text-on-surface leading-relaxed">
                1. Limpieza suave con agua y jabón neutro.<br />
                2. Fungicida natural: Bicarbonato de potasio (5g/L) o decocción de Cola de Caballo.<br />
                3. Suspender pulverizaciones nocturnas y mejorar la ventilación.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Riesgo en Tus Plantas Cargadas */}
      <section className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[22px]">potted_plant</span>
          <h3 className="text-[16px] font-bold text-primary">Riesgo en Tus Plantas Cargadas</h3>
        </div>
        <p className="text-[12px] text-on-surface-variant">
          Diagnóstico predictivo según los ejemplares de tu colección registrados en PlantaSana:
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-[12px]">
                MD
              </div>
              <div>
                <span className="font-bold text-[13px] text-primary block">Monstera Deliciosa</span>
                <span className="text-[11px] text-on-surface-variant">Vigilancia prioritaria: Trips y Cochinilla en pecíolos.</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-surface-container-high text-on-surface">Media</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-[12px]">
                FL
              </div>
              <div>
                <span className="font-bold text-[13px] text-primary block">Ficus Lyrata</span>
                <span className="text-[11px] text-on-surface-variant">Vulnerable a Arañuela en clima seco y Cochinilla cerosa.</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-tertiary-fixed text-on-tertiary-fixed-variant">Alta</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-[12px]">
                CO
              </div>
              <div>
                <span className="font-bold text-[13px] text-primary block">Calathea Orbifolia</span>
                <span className="text-[11px] text-on-surface-variant">Extrema sensibilidad a Ácaros (precisa HR &gt; 60%).</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-error-container text-on-error-container">Crítica</span>
          </div>
        </div>
      </section>

      {/* Protocolo de Cuarentena (4 Pasos) */}
      <section className="p-4 rounded-2xl bg-surface-container border border-surface-container-high space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">medical_services</span>
          <h3 className="text-[16px] font-bold text-primary">Protocolo de Cuarentena (4 Pasos)</h3>
        </div>
        <p className="text-[12px] text-on-surface-variant leading-snug">
          Recetario de primeros auxilios avalado por el Ing. Emmanuel Hick:
        </p>

        <div className="space-y-2 mt-2">
          <div className="flex items-start gap-2.5 bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
            <div>
              <span className="font-bold text-[12px] text-primary block">Aislamiento Inmediato</span>
              <span className="text-[11px] text-on-surface-variant leading-snug block">Separa la planta al menos 3 metros de cualquier otro ejemplar para evitar saltos de plagas aladas o trepadoras.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
            <div>
              <span className="font-bold text-[12px] text-primary block">Limpieza Mecánica Foliar</span>
              <span className="text-[11px] text-on-surface-variant leading-snug block">Lava haz y envés con paño de microfibra humedecido con agua destilada y jabón potásico para remover la mayor carga biológica.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
            <div>
              <span className="font-bold text-[12px] text-primary block">Tratamiento al Atardecer</span>
              <span className="text-[11px] text-on-surface-variant leading-snug block">Aplica fitoterápicos (Neem, azufre o diatomeas) al caer el sol para evitar fototoxicidad y quemaduras solares en las hojas húmedas.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
            <div>
              <span className="font-bold text-[12px] text-primary block">Desinfección de Utensilios</span>
              <span className="text-[11px] text-on-surface-variant leading-snug block">Esteriliza tijeras de poda, tutores y plato de maceta con alcohol 70% para no contaminar plantas vecinas.</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Card: Consult Botanist */}
      <section className="flex flex-col gap-2 p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-md text-center">
        <div className="w-13 h-13 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto mb-1">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
        </div>
        <h3 className="font-bold text-[16px] text-primary">¿Detectaste una plaga o mancha extraña?</h3>
        <p className="text-[12px] text-on-surface-variant leading-relaxed">
          Sube una fotografía macro con buena iluminación. El Ing. Agr. Emmanuel Hick evaluará la patología y emitirá tu receta fitosanitaria personalizada.
        </p>
        <button
          type="button"
          onClick={() => onConsult('Plagas y Fitopatología')}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-primary text-on-primary text-[13px] font-bold shadow-md active:scale-[0.98] transition-all mt-2"
        >
          <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          <span>Consultar con el Botánico</span>
        </button>
      </section>
    </div>
  );
};
