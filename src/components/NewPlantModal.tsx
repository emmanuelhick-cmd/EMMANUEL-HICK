import React, { useState } from 'react';
import { Plant } from '../types';
import { AGRONOMIST_INFO } from '../data/mockData';

interface NewPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePlant: (plant: Plant) => void;
}

export const NewPlantModal: React.FC<NewPlantModalProps> = ({
  isOpen,
  onClose,
  onSavePlant,
}) => {
  const [nickname, setNickname] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('Monstera deliciosa');
  const [customSpecies, setCustomSpecies] = useState('');
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80'
  );

  // Historial
  const [tenure, setTenure] = useState('1 a 6 meses');
  const [origin, setOrigin] = useState('Vivero comercial especializado');

  // Microclima
  const [distance, setDistance] = useState('1 a 2 metros (Luz indirecta brillante)');
  const [orientation, setOrientation] = useState('Este (Sol suave de mañana)');

  // Régimen Hídrico
  const [frequency, setFrequency] = useState('1 vez por semana');
  const [waterType, setWaterType] = useState('Canilla reposada');
  const [hasDrainage, setHasDrainage] = useState(true);

  // Triage
  const [triageStatus, setTriageStatus] = useState<'Saludable' | 'Atención' | 'En Tratamiento'>('Saludable');

  if (!isOpen) return null;

  const handleSelectPhoto = () => {
    const samples = [
      'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=600&q=80',
    ];
    setPhotoUrl(samples[Math.floor(Math.random() * samples.length)]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSpecies = selectedSpecies === 'Otra especie' && customSpecies ? customSpecies : selectedSpecies;
    const finalName = nickname.trim() || finalSpecies;

    const newPlant: Plant = {
      id: `p-${Date.now()}`,
      name: finalSpecies,
      nickname: finalName,
      species: finalSpecies,
      location: `Ubicación: ${orientation} · ${distance.split('(')[0]}`,
      status: triageStatus,
      progress: triageStatus === 'Saludable' ? 85 : triageStatus === 'En Tratamiento' ? 45 : 25,
      treatmentDay: triageStatus === 'En Tratamiento' ? 'Día 1/7' : undefined,
      image: photoUrl,
      nextWateringDays: frequency === 'Cada 3-4 días' ? 3 : frequency === '1 vez por semana' ? 7 : 12,
      nextFertilizingDays: 20,
      exposure: distance,
      wateringFrequency: frequency,
      waterType,
      hasDrainageHoles: hasDrainage,
      notes: `Registrada recientemente. Origen: ${origin}. Estado: ${triageStatus}.`,
    };

    onSavePlant(newPlant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-surface pt-safe pb-16">
      {/* Top sticky bar */}
      <header className="sticky top-0 z-20 bg-surface/95 backdrop-blur-xl border-b border-surface-container-highest px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="text-[17px] font-bold text-primary truncate">
            Nueva Planta De Interior
          </h1>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-[13px] font-semibold text-on-surface-variant hover:text-primary"
        >
          Cancelar
        </button>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Verification banner */}
        <section className="bg-surface-container-low rounded-2xl p-3.5 border border-surface-container space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Monitoreo Preventivo y Fitosanitario
            </span>
            <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <img
              src={AGRONOMIST_INFO.avatar}
              alt={AGRONOMIST_INFO.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-secondary"
            />
            <div>
              <span className="font-bold text-[12px] text-primary block">
                {AGRONOMIST_INFO.name} ({AGRONOMIST_INFO.matricula})
              </span>
              <p className="text-[11px] text-on-surface-variant italic leading-snug mt-0.5">
                "Completá la ficha técnica de tu ejemplar para calibrar su monitoreo agronómico, alertas de riego personalizadas y vincular sus futuros casos clínicos."
              </p>
            </div>
          </div>
        </section>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Section 1: Identificación del Ejemplar */}
          <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">potted_plant</span>
              <h3 className="text-[16px] font-bold text-primary">Identificación del Ejemplar</h3>
            </div>

            {/* Photo preview / upload */}
            <div className="space-y-1.5">
              <span className="text-[12px] text-on-surface-variant font-medium block">
                Fotografía de referencia actual
              </span>
              <div className="p-4 rounded-2xl bg-surface-container-low/70 border-2 border-dashed border-secondary/30 text-center flex flex-col items-center justify-center space-y-2">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm relative group">
                  <img src={photoUrl} alt="Vista previa de planta" className="w-full h-full object-cover" />
                  <div
                    onClick={handleSelectPhoto}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center text-white cursor-pointer hover:bg-black/50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">sync</span>
                  </div>
                </div>
                <div className="text-[11px] text-on-surface-variant">
                  <strong className="text-primary block">Subir o capturar foto</strong>
                  Tomá la planta en su rincón habitual con luz diurna natural.
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSelectPhoto}
                    className="py-1.5 px-3 rounded-lg bg-primary text-white text-[11px] font-bold flex items-center gap-1 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                    <span>Cámara</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSelectPhoto}
                    className="py-1.5 px-3 rounded-lg bg-surface-container-high text-primary text-[11px] font-bold flex items-center gap-1 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[15px]">photo_library</span>
                    <span>Galería</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Nickname input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[12px]">
                <label className="font-semibold text-on-surface">Nombre o apodo afectivo</label>
                <span className="text-on-surface-variant text-[11px]">Identificador</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Ej: Monstera del living, Ficus de la oficina..."
                  className="w-full bg-transparent border-none outline-none text-[13px] text-primary"
                />
                <span className="material-symbols-outlined text-outline text-[18px]">edit</span>
              </div>
            </div>

            {/* Species chips */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-on-surface block">Especie botánica</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Monstera deliciosa',
                  'Ficus lyrata',
                  'Calathea orbifolia',
                  'Pothos epipremnum',
                  'Sansevieria',
                  'Philodendron',
                  'Otra especie',
                ].map((spec) => {
                  const isSelected = selectedSpecies === spec;
                  return (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => setSelectedSpecies(spec)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                        isSelected
                          ? 'bg-secondary-container text-on-secondary-container ring-1 ring-secondary font-bold'
                          : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      {spec === 'Otra especie' ? '+ Otra especie' : spec}
                    </button>
                  );
                })}
              </div>

              {selectedSpecies === 'Otra especie' && (
                <input
                  type="text"
                  value={customSpecies}
                  onChange={(e) => setCustomSpecies(e.target.value)}
                  placeholder="Escribe el nombre de la especie..."
                  className="mt-2 w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container text-[12px] text-primary outline-none"
                />
              )}
            </div>
          </section>

          {/* Section 2: Historial y Procedencia */}
          <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">calendar_today</span>
              <h3 className="text-[16px] font-bold text-primary">Historial y Procedencia</h3>
            </div>

            {/* Tenure */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-on-surface block">
                ¿Cuánto tiempo lleva en tu hogar?
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['Menos de 1 mes', '1 a 6 meses', '6 meses a 1 año', 'Más de 1 año', 'Varios años'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenure(t)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                      tenure === t
                        ? 'bg-secondary-container text-on-secondary-container ring-1 ring-secondary font-bold'
                        : 'bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Origin */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-on-surface block">
                Origen / Dónde se adquirió
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'Vivero comercial especializado', icon: 'storefront' },
                  { id: 'Regalo de alguien', icon: 'featured_seasonal_and_gifts' },
                  { id: 'Producción / Esqueje propio', icon: 'content_cut' },
                  { id: 'Comercio no especializado / Super', icon: 'shopping_cart' },
                  { id: 'Heredada / Antigua familiar', icon: 'family_restroom' },
                ].map((item) => {
                  const isSelected = origin === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOrigin(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-[12px] font-medium transition-all ${
                        isSelected
                          ? 'bg-secondary-container/60 text-on-secondary-container ring-1 ring-secondary font-bold'
                          : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span>{item.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 3: Microclima y Exposición Solar */}
          <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">wb_sunny</span>
              <h3 className="text-[16px] font-bold text-primary">Microclima y Exposición Solar</h3>
            </div>

            {/* Distance */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-on-surface block">
                Distancia a la ventana o tragaluz
              </label>
              <div className="space-y-1.5">
                {[
                  { text: '< 1 metro (Luz muy directa / ventana)', icon: 'light_mode' },
                  { text: '1 a 2 metros (Luz indirecta brillante)', icon: 'flare' },
                  { text: '2 a 4 metros (Semisombra / luz tamizada)', icon: 'filter_drama' },
                  { text: '> 4 metros (Sombra / luz escasa)', icon: 'bedtime' },
                ].map((item) => {
                  const isSelected = distance === item.text;
                  return (
                    <button
                      key={item.text}
                      type="button"
                      onClick={() => setDistance(item.text)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-[12px] font-medium transition-all ${
                        isSelected
                          ? 'bg-secondary-container/60 text-on-secondary-container ring-1 ring-secondary font-bold'
                          : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                      <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-secondary' : 'bg-outline-variant'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Orientation */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[12px]">
                <label className="font-semibold text-on-surface">Orientación de la ventana</label>
                <span className="text-secondary text-[11px] font-semibold">Asistido</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Norte (Sol todo el día)',
                  'Este (Sol suave de mañana)',
                  'Oeste (Sol fuerte de tarde)',
                  'Sur (Luz indirecta suave)',
                  'No sé la orientación',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setOrientation(item)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                      orientation === item
                        ? 'bg-secondary-container text-on-secondary-container ring-1 ring-secondary font-bold'
                        : 'bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Régimen Hídrico y Sustrato */}
          <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">water_drop</span>
              <h3 className="text-[16px] font-bold text-primary">Régimen Hídrico y Sustrato</h3>
            </div>

            {/* Frequency */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-on-surface block">
                ¿Cada cuánto solés regarla?
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Cada 3-4 días',
                  '1 vez por semana',
                  'Cada 10-15 días',
                  'Solo cuando el sustrato se seca por completo',
                  'Riego irregular / sin rutina fija',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFrequency(item)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                      frequency === item
                        ? 'bg-secondary-container text-on-secondary-container ring-1 ring-secondary font-bold'
                        : 'bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Water Type */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-on-surface block">
                Tipo de agua utilizada
              </label>
              <div className="space-y-1.5">
                {[
                  { text: 'Canilla reposada', desc: 'Cloro evaporado', icon: 'water' },
                  { text: 'Directa de canilla', desc: 'Uso inmediato', icon: 'faucet' },
                  { text: 'Lluvia o filtrada', desc: 'Baja en sales', icon: 'cloud' },
                ].map((item) => {
                  const isSelected = waterType === item.text;
                  return (
                    <button
                      key={item.text}
                      type="button"
                      onClick={() => setWaterType(item.text)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-[12px] font-medium transition-all ${
                        isSelected
                          ? 'bg-secondary-container/60 text-on-secondary-container ring-1 ring-secondary font-bold'
                          : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        <div>
                          <span className="block font-semibold">{item.text}</span>
                          <span className="text-[10px] text-on-surface-variant">{item.desc}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drainage */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-on-surface block">
                Contenedor y drenaje basal
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHasDrainage(true)}
                  className={`p-3 rounded-xl flex items-center justify-center gap-2 text-[12px] font-semibold transition-all ${
                    hasDrainage
                      ? 'bg-secondary-container text-on-secondary-container ring-1 ring-secondary'
                      : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Con orificios</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHasDrainage(false)}
                  className={`p-3 rounded-xl flex items-center justify-center gap-2 text-[12px] font-semibold transition-all ${
                    !hasDrainage
                      ? 'bg-error-container text-on-error-container ring-1 ring-error'
                      : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                  <span>Sin orificios</span>
                </button>
              </div>
            </div>
          </section>

          {/* Section 5: Triage y Estado Fitosanitario */}
          <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">health_and_safety</span>
              <h3 className="text-[16px] font-bold text-primary">Triage y Estado Fitosanitario</h3>
            </div>
            <p className="text-[12px] text-on-surface-variant">
              ¿Presenta algún síntoma, decoloración o sospecha de plaga actualmente?
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setTriageStatus('Saludable')}
                className={`w-full p-3.5 rounded-xl flex items-start gap-3 text-left transition-all ${
                  triageStatus === 'Saludable'
                    ? 'bg-secondary-container/50 border border-secondary'
                    : 'bg-surface-container-low border border-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">
                  {triageStatus === 'Saludable' ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
                <div>
                  <span className="font-bold text-[13px] text-primary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Sana y vigorosa (Preventivo)
                  </span>
                  <span className="text-[11px] text-on-surface-variant leading-snug block mt-0.5">
                    Crecimiento activo sin manchas notorias ni plagas visibles.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTriageStatus('Atención')}
                className={`w-full p-3.5 rounded-xl flex items-start gap-3 text-left transition-all ${
                  triageStatus === 'Atención'
                    ? 'bg-tertiary-fixed/50 border border-tertiary'
                    : 'bg-surface-container-low border border-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">
                  {triageStatus === 'Atención' ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
                <div>
                  <span className="font-bold text-[13px] text-primary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    Sospecha de plaga o mancha
                  </span>
                  <span className="text-[11px] text-on-surface-variant leading-snug block mt-0.5">
                    Hojas amarillentas, puntas secas, telarañas finas o cochinillas.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTriageStatus('En Tratamiento')}
                className={`w-full p-3.5 rounded-xl flex items-start gap-3 text-left transition-all ${
                  triageStatus === 'En Tratamiento'
                    ? 'bg-primary-fixed/50 border border-primary'
                    : 'bg-surface-container-low border border-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                  {triageStatus === 'En Tratamiento' ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
                <div>
                  <span className="font-bold text-[13px] text-primary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    En tratamiento activo
                  </span>
                  <span className="text-[11px] text-on-surface-variant leading-snug block mt-0.5">
                    Aplicando jabón potásico, aceite de neem o fungicidas.
                  </span>
                </div>
              </button>
            </div>
          </section>

          {/* Submit Button */}
          <div className="space-y-2 pt-2">
            <button
              type="submit"
              className="w-full py-4 px-4 rounded-2xl bg-primary text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">bookmark</span>
              <span>Guardar Planta en Cuidado</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-[13px] text-on-surface-variant font-medium hover:text-primary transition-colors text-center block"
            >
              Cancelar y volver
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-on-surface-variant text-center pt-1">
              <span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
              <span>Tus datos permiten calibrar la frecuencia de riego y diagnóstico preventivo.</span>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
