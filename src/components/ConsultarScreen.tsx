import React, { useState } from 'react';
import { Plant, ClinicalCase } from '../types';
import { AGRONOMIST_INFO } from '../data/mockData';

interface ConsultarScreenProps {
  plants: Plant[];
  preselectedPlantId?: string;
  onSubmitCase: (newCase: ClinicalCase) => void;
  onCancel?: () => void;
}

export const ConsultarScreen: React.FC<ConsultarScreenProps> = ({
  plants,
  preselectedPlantId,
  onSubmitCase,
}) => {
  // Photos state (preloaded with high quality images as in Image 1.jpeg)
  const [photos, setPhotos] = useState({
    general: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaN_A0pkaM4tPQfji-eFDgPkVsTmL_W6mhp-6XaueSllnEN4eVXtRtZyYGAU4cozPyRmgzq4dfUse8DFI41doam5NRu95WrI9CFviQSxZ3AAoEGTUYGQtXyzFmLjT3Pu6-azg2WqsVdpYJWMCcCDYAWbIM_C4xYS5FneQPtRZ-5tjcI06Ujletp71yVcMmquwdI964MoaWDLd3Nx1y96gWMqT5h0By_YLN9SeECO6n-5_2JA5SPZA2',
    symptom: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXN7e8XUUhafu7m-T7rXoBZssLCbAAv42_vVa43E-I5UjrmlLh_tluCUNEY4VSmKI99WqRBj_Z45c08EuffdgXhHgAYEeDRBqtOzgU7P9YsWPi_yDiKoz-ju8Fa1GTDG1uSLQekbmM3RA5g8uh7qgq9obqUCfpRCjRzzR9FjA90F4BsWAJlkw38HJjD3-cBDVolsdWIAdqwr8EnWke_K7Hodbd9UIoHLzzJYKl2F193_G0cRzG15Z4',
    soil: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    product: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  });

  const selectedPlant = plants.find((p) => p.id === preselectedPlantId) || plants[0];
  const [speciesName, setSpeciesName] = useState(selectedPlant?.name || 'Monstera Deliciosa');
  const [location, setLocation] = useState<'Interior con luz' | 'Interior sombra' | 'Balcón / Exterior'>('Interior con luz');
  const [evolutionTime, setEvolutionTime] = useState<'Pocos días' | '1-2 semanas' | 'Más de 1 mes'>('1-2 semanas');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'Hojas amarillas',
    'Bichitos / pelusa',
  ]);
  const [queryText, setQueryText] = useState(
    'Hola Emmanuel, hace unos 10 días empecé a notar que las hojas más nuevas de mi Monstera tienen manchas amarillas en las puntas y en el envés veo pequeños puntitos'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const toggleSymptom = (sym: string) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handlePhotoReplace = (slot: keyof typeof photos) => {
    // Interactive photo change simulation
    const alternatePhotos = [
      'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80',
    ];
    const newPic = alternatePhotos[Math.floor(Math.random() * alternatePhotos.length)];
    setPhotos((prev) => ({ ...prev, [slot]: newPic }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newCase: ClinicalCase = {
        id: `caso-${Date.now().toString().slice(-4)}`,
        plantId: selectedPlant?.id,
        plantName: speciesName,
        species: speciesName,
        date: 'Recién enviado',
        status: 'En Tratamiento',
        symptoms: selectedSymptoms,
        userQuery: queryText,
        location,
        evolutionTime,
        photos,
        prescription: {
          folio: `RX-2026-${Math.floor(1000 + Math.random() * 9000)}-MP6254`,
          date: new Date().toLocaleDateString('es-AR'),
          agronomist: AGRONOMIST_INFO.name,
          matricula: AGRONOMIST_INFO.matricula,
          plantName: `${speciesName} (Caso urgente)`,
          species: speciesName,
          diagnosis: 'Diagnóstico confirmado: Presencia inicial de fitófagos (Arañuela / trips) con clorosis apical.',
          severity: 'Moderado',
          activePrinciples: ['Jabón Potásico neutro', 'Aceite de Neem prensado en frío'],
          treatmentSteps: [
            {
              step: 1,
              title: 'Limpieza con hisopo y paño',
              instruction: 'Remover colonias visibles en envés foliar con agua destilada y jabón potásico suave.',
              frequency: 'Inmediato (Día 1)',
              completed: false,
            },
            {
              step: 2,
              title: 'Pulverización fitoterápica',
              instruction: 'Aplicar Jabón Potásico + Neem en dilución de seguridad 5ml/L al atardecer.',
              frequency: 'Cada 4 días (3 aplicaciones)',
              completed: false,
            },
          ],
          wateringAdjustment: 'Suspender abonos por 15 días y regar solo con sustrato seco al 60%.',
          lightAdjustment: 'Mantener en luz indirecta brillante protegida de corrientes térmicas.',
          observations: 'Evolución favorable esperada si se completa el ciclo de 3 semanas.',
          signatureUrl: AGRONOMIST_INFO.avatar,
        },
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'user',
            text: queryText,
            timestamp: 'Hace 1 min',
          },
          {
            id: `msg-${Date.now() + 1}`,
            sender: 'agronomist',
            text: `¡Hola María! Recibí la consulta clínica de tu ${speciesName}. Ya emití tu Receta Fitosanitaria Oficial con las recomendaciones para frenar las manchas amarillas. Podés consultar los pasos aquí.`,
            timestamp: 'Recién',
          },
        ],
      };

      setIsSubmitting(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        onSubmitCase(newCase);
      }, 1600);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-12 space-y-4 animate-in fade-in duration-300">
      {/* Top Banner: Ficha completa y lista */}
      <div className="w-full py-2.5 px-4 rounded-xl bg-secondary-container/70 border border-secondary-container text-on-secondary-container text-[12px] font-bold flex items-center justify-between shadow-xs">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
          <span>¡Ficha completa y lista para diagnóstico!</span>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-white text-secondary font-mono text-[11px] shadow-xs">
          100%
        </span>
      </div>

      {/* Specialist Banner Card */}
      <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <img
            src={AGRONOMIST_INFO.avatar}
            alt={AGRONOMIST_INFO.name}
            className="w-13 h-13 rounded-full object-cover shadow-sm ring-2 ring-secondary"
          />
          <span className="w-3.5 h-3.5 rounded-full bg-secondary border-2 border-surface-container-lowest absolute bottom-0 right-0 animate-pulse" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-primary truncate">
              {AGRONOMIST_INFO.name}
            </h2>
          </div>
          <span className="text-[11px] text-on-surface-variant font-medium block">
            {AGRONOMIST_INFO.matricula}
          </span>
          <span className="text-[12px] text-on-surface leading-tight block mt-0.5">
            {AGRONOMIST_INFO.role}
          </span>

          <div className="flex items-center gap-3 mt-2 text-[11px] text-on-surface-variant">
            <span className="flex items-center gap-1 text-secondary font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Guardia activa
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
              Respuesta prom: <strong>{AGRONOMIST_INFO.responseTime}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Fotos de tu planta */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-[16px] font-bold text-primary">Fotos de tu planta</h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary bg-secondary-container px-2.5 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              4 de 4 (Completo)
            </span>
          </div>

          {/* Quick upload trigger bar */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handlePhotoReplace('general')}
              className="py-2.5 px-3 rounded-xl bg-surface-container-high/60 text-primary text-[12px] font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors active:scale-98"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span>Tomar con Cámara</span>
            </button>
            <button
              type="button"
              onClick={() => handlePhotoReplace('symptom')}
              className="py-2.5 px-3 rounded-xl bg-surface-container-high/60 text-primary text-[12px] font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors active:scale-98"
            >
              <span className="material-symbols-outlined text-[16px]">photo_library</span>
              <span>Elegir de Galería</span>
            </button>
          </div>

          {/* 4 Photos Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {/* 1: Vista general */}
            <div
              onClick={() => setPreviewPhoto(photos.general)}
              className="relative h-28 rounded-xl overflow-hidden shadow-xs border border-surface-container cursor-pointer group"
            >
              <img
                src={photos.general}
                alt="Vista general"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white text-[11px] font-medium">
                <span className="flex items-center gap-1 truncate">
                  <span className="material-symbols-outlined text-[14px] text-secondary-fixed">check_circle</span>
                  Vista general
                </span>
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </div>
            </div>

            {/* 2: Detalle síntoma */}
            <div
              onClick={() => setPreviewPhoto(photos.symptom)}
              className="relative h-28 rounded-xl overflow-hidden shadow-xs border border-surface-container cursor-pointer group"
            >
              <img
                src={photos.symptom}
                alt="Detalle síntoma"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white text-[11px] font-medium">
                <span className="flex items-center gap-1 truncate">
                  <span className="material-symbols-outlined text-[14px] text-secondary-fixed">check_circle</span>
                  Detalle síntoma
                </span>
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </div>
            </div>

            {/* 3: Tierra / drenaje */}
            <div
              onClick={() => setPreviewPhoto(photos.soil)}
              className="relative h-28 rounded-xl overflow-hidden shadow-xs border border-surface-container cursor-pointer group"
            >
              <img
                src={photos.soil}
                alt="Tierra / drenaje"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white text-[11px] font-medium">
                <span className="flex items-center gap-1 truncate">
                  <span className="material-symbols-outlined text-[14px] text-secondary-fixed">check_circle</span>
                  Tierra / drenaje
                </span>
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </div>
            </div>

            {/* 4: Prod. aplicado */}
            <div
              onClick={() => setPreviewPhoto(photos.product)}
              className="relative h-28 rounded-xl overflow-hidden shadow-xs border border-surface-container cursor-pointer group"
            >
              <img
                src={photos.product}
                alt="Prod. aplicado"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white text-[11px] font-medium">
                <span className="flex items-center gap-1 truncate">
                  <span className="material-symbols-outlined text-[14px] text-secondary-fixed">check_circle</span>
                  Prod. aplicado
                </span>
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Datos rápidos del cultivo */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="text-[16px] font-bold text-primary">Datos rápidos del cultivo</h3>
          </div>

          {/* Identified Species */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-on-surface-variant font-medium">Especie identificada</span>
              <span className="text-secondary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Confirmada
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container">
              <div className="flex items-center gap-2 text-primary font-bold text-[14px]">
                <span className="material-symbols-outlined text-secondary text-[20px]">potted_plant</span>
                <input
                  type="text"
                  value={speciesName}
                  onChange={(e) => setSpeciesName(e.target.value)}
                  className="bg-transparent border-none outline-none font-bold text-primary text-[14px] w-full"
                />
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]">check</span>
            </div>
          </div>

          {/* Pot Location */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-on-surface block">
              Ubicación actual de la maceta
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setLocation('Interior con luz')}
                className={`py-2 px-3 rounded-xl text-[12px] font-semibold transition-all flex items-center gap-1.5 ${
                  location === 'Interior con luz'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
                <span>Interior con luz</span>
              </button>

              <button
                type="button"
                onClick={() => setLocation('Interior sombra')}
                className={`py-2 px-3 rounded-xl text-[12px] font-semibold transition-all ${
                  location === 'Interior sombra'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant'
                }`}
              >
                Interior sombra
              </button>

              <button
                type="button"
                onClick={() => setLocation('Balcón / Exterior')}
                className={`py-2 px-3 rounded-xl text-[12px] font-semibold transition-all ${
                  location === 'Balcón / Exterior'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant'
                }`}
              >
                Balcón / Exterior
              </button>
            </div>
          </div>

          {/* Symptom Evolution Time */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-on-surface block">
              Tiempo de evolución del síntoma
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setEvolutionTime('Pocos días')}
                className={`py-2 px-3 rounded-xl text-[12px] font-semibold transition-all ${
                  evolutionTime === 'Pocos días'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant'
                }`}
              >
                Pocos días
              </button>

              <button
                type="button"
                onClick={() => setEvolutionTime('1-2 semanas')}
                className={`py-2 px-3 rounded-xl text-[12px] font-semibold transition-all flex items-center gap-1 ${
                  evolutionTime === '1-2 semanas'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">schedule</span>
                <span>1-2 semanas</span>
              </button>

              <button
                type="button"
                onClick={() => setEvolutionTime('Más de 1 mes')}
                className={`py-2 px-3 rounded-xl text-[12px] font-semibold transition-all ${
                  evolutionTime === 'Más de 1 mes'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant'
                }`}
              >
                Más de 1 mes
              </button>
            </div>
          </div>
        </section>

        {/* Step 3: Tu consulta clínica */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-[16px] font-bold text-primary">Tu consulta clínica</h3>
            </div>
            <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Confidencial y clínico
            </span>
          </div>

          {/* Quick symptom pills */}
          <div className="flex flex-wrap gap-1.5">
            {['Hojas amarillas', 'Bichitos / pelusa', 'Puntas secas', 'Manchas marrones', 'Caída de hojas'].map((symptom) => {
              const active = selectedSymptoms.includes(symptom);
              return (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all flex items-center gap-1 ${
                    active
                      ? 'bg-secondary-container text-on-secondary-container ring-1 ring-secondary'
                      : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  {active ? <span>✓</span> : <span>+</span>}
                  <span>{symptom}</span>
                </button>
              );
            })}
          </div>

          {/* Text Area */}
          <div className="bg-surface-container-low rounded-xl p-3 border border-surface-container">
            <textarea
              rows={4}
              maxLength={500}
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="Describe detalladamente cuándo empezó el síntoma, riegos recientes y cambios de lugar..."
              className="w-full bg-transparent text-[13px] text-on-surface leading-relaxed border-none outline-none resize-none"
            />
            <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-2 border-t border-surface-container">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">notes</span>
                Redacción clara y descriptiva
              </span>
              <span className="font-mono">{queryText.length} / 500</span>
            </div>
          </div>
        </section>

        {/* Guarantee Banner */}
        <div className="p-3.5 rounded-xl bg-surface-container-high/40 border border-surface-container flex items-start gap-2.5">
          <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0 mt-0.5">
            verified_user
          </span>
          <p className="text-[12px] text-on-surface leading-snug">
            Garantía de respuesta en <strong>&lt; 45 min</strong> con receta fitosanitaria digital firmada por <strong>{AGRONOMIST_INFO.name}</strong>.
          </p>
        </div>

        {/* Big Submit CTA */}
        <div className="space-y-2 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-4 rounded-2xl bg-primary text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                <span>Procesando consulta y fotos...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Enviar Consulta ($ 2.500)</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 text-[12px] text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-secondary">lock</span>
              Pago seguro
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-secondary">receipt_long</span>
              Receta oficial incluida
            </span>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in zoom-in-95 duration-200">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-3xl p-6 shadow-2xl text-center space-y-3 border border-surface-container">
            <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto mb-2 animate-bounce">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <h3 className="text-[20px] font-bold text-primary">¡Consulta Ingresada!</h3>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              El <strong>{AGRONOMIST_INFO.name}</strong> ha recibido las fotos y tu historial. Redirigiendo a tu caso clínico...
            </p>
          </div>
        </div>
      )}

      {/* Photo Preview Modal */}
      {previewPhoto && (
        <div
          onClick={() => setPreviewPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="relative max-w-sm w-full bg-black rounded-2xl overflow-hidden">
            <img src={previewPhoto} alt="Previsualización" className="w-full h-auto object-contain max-h-[75vh]" />
            <button
              type="button"
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
