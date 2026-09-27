import React, { useState } from 'react';
import { ClinicalCase } from '../types';
import { AGRONOMIST_INFO } from '../data/mockData';

interface CasesScreenProps {
  cases: ClinicalCase[];
  onOpenConsult: () => void;
  onUpdateCase: (updatedCase: ClinicalCase) => void;
}

export const CasesScreen: React.FC<CasesScreenProps> = ({
  cases,
  onOpenConsult,
  onUpdateCase,
}) => {
  const [filter, setFilter] = useState<'all' | 'En Tratamiento' | 'Respondida' | 'Resuelto'>('all');
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  const filteredCases = cases.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedCase) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      text: chatInput.trim(),
      timestamp: 'Ahora',
    };

    const updated = {
      ...selectedCase,
      messages: [...selectedCase.messages, newMsg],
    };

    setSelectedCase(updated);
    onUpdateCase(updated);
    setChatInput('');

    // Simulate response from Emmanuel Hick after 1.2s
    setTimeout(() => {
      const responseMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agronomist' as const,
        text: 'Excelente seguimiento, María. Si notas que la nueva hoja brota limpia y sin manchas en los próximos 5 días, podremos dar el alta y retomar el fertilizante suave.',
        timestamp: 'Recién',
      };
      const withResponse = {
        ...updated,
        messages: [...updated.messages, responseMsg],
      };
      setSelectedCase(withResponse);
      onUpdateCase(withResponse);
    }, 1200);
  };

  const handleToggleStep = (stepIndex: number) => {
    if (!selectedCase || !selectedCase.prescription) return;
    const newSteps = [...selectedCase.prescription.treatmentSteps];
    newSteps[stepIndex].completed = !newSteps[stepIndex].completed;

    const updated: ClinicalCase = {
      ...selectedCase,
      prescription: {
        ...selectedCase.prescription,
        treatmentSteps: newSteps,
      },
    };

    setSelectedCase(updated);
    onUpdateCase(updated);
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-4 animate-in fade-in duration-300">
      {/* If a case is selected, display its comprehensive clinical dossier */}
      {selectedCase ? (
        <div className="space-y-4 animate-in fade-in">
          {/* Back button */}
          <button
            type="button"
            onClick={() => setSelectedCase(null)}
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-secondary hover:text-primary transition-colors py-1"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Volver a todos los casos</span>
          </button>

          {/* Clinical Header */}
          <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono text-on-surface-variant block">
                  Folio: {selectedCase.prescription?.folio || selectedCase.id}
                </span>
                <h2 className="text-[20px] font-bold text-primary">{selectedCase.plantName}</h2>
                <span className="text-[12px] text-on-surface-variant italic block">
                  {selectedCase.species} · {selectedCase.location}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-secondary-container text-on-secondary-container">
                {selectedCase.status}
              </span>
            </div>

            {/* Photos Strip */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {Object.entries(selectedCase.photos).map(([key, url]) => (
                <div key={key} className="h-18 rounded-xl overflow-hidden shadow-2xs border border-surface-container">
                  <img src={url} alt={key} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* User Clinical Query */}
            <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container">
              <span className="text-[11px] text-secondary font-bold uppercase tracking-wider block mb-1">
                Consulta ingresada:
              </span>
              <p className="text-[12px] text-on-surface leading-snug">
                "{selectedCase.userQuery}"
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedCase.symptoms.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-full bg-white text-on-surface text-[10px] font-semibold border border-surface-container">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Official Prescription Card */}
          {selectedCase.prescription && (
            <div className="bg-primary text-on-primary p-5 rounded-3xl shadow-lg border border-primary-container space-y-4">
              <div className="flex items-start justify-between border-b border-white/15 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-surface-bright">
                      Receta Fitosanitaria Digital
                    </h3>
                    <span className="text-[11px] text-secondary-fixed">
                      Avalada por {selectedCase.prescription.agronomist} ({selectedCase.prescription.matricula})
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">
                  OFICIAL
                </span>
              </div>

              {/* Diagnosis box */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary-fixed">
                  Diagnóstico Agronómico:
                </span>
                <p className="text-[13px] text-white leading-relaxed font-medium">
                  {selectedCase.prescription.diagnosis}
                </p>
              </div>

              {/* Active principles */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary-fixed">
                  Principios Terapéuticos:
                </span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {selectedCase.prescription.activePrinciples.map((ap) => (
                    <span key={ap} className="px-2.5 py-1 rounded-lg bg-primary-container text-surface-bright text-[11px] font-medium border border-white/10">
                      {ap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Treatment Steps Checklist */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary-fixed">
                  Pasos de Tratamiento (Marcar al completar):
                </span>
                <div className="space-y-2">
                  {selectedCase.prescription.treatmentSteps.map((step, idx) => (
                    <div
                      key={step.step}
                      onClick={() => handleToggleStep(idx)}
                      className={`p-3 rounded-xl cursor-pointer transition-all border ${
                        step.completed
                          ? 'bg-secondary/20 border-secondary/50 text-surface-bright'
                          : 'bg-primary-container/80 border-white/10 text-surface-container'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-[20px] text-secondary-fixed mt-0.5">
                          {step.completed ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[12px] text-white">
                              {step.step}. {step.title}
                            </span>
                            <span className="text-[10px] text-secondary-fixed font-mono">
                              {step.frequency}
                            </span>
                          </div>
                          <p className="text-[11px] text-surface-container-high mt-0.5 leading-snug">
                            {step.instruction}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prescriptions: Water & Light */}
              <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/15 text-[11px]">
                <div className="p-2.5 rounded-xl bg-primary-container/50 border border-white/10 space-y-0.5">
                  <span className="text-secondary-fixed font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">water_drop</span> Régimen de Riego Indicado
                  </span>
                  <p className="text-surface-container">{selectedCase.prescription.wateringAdjustment}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-primary-container/50 border border-white/10 space-y-0.5">
                  <span className="text-secondary-fixed font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">wb_sunny</span> Iluminación Indicada
                  </span>
                  <p className="text-surface-container">{selectedCase.prescription.lightAdjustment}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPrescriptionModal(true)}
                className="w-full py-2.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Ver / Imprimir Receta Fitosanitaria</span>
              </button>
            </div>
          )}

          {/* Interactive Chat with Agronomist */}
          <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-surface-container pb-2">
              <div className="flex items-center gap-2">
                <img
                  src={AGRONOMIST_INFO.avatar}
                  alt={AGRONOMIST_INFO.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-secondary"
                />
                <div>
                  <h4 className="font-bold text-[13px] text-primary leading-tight">
                    Chat con {AGRONOMIST_INFO.name}
                  </h4>
                  <span className="text-[10px] text-secondary font-medium">Asesoría clínica directa</span>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            </div>

            {/* Chat message bubbles */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {selectedCase.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-[12px] leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-xs'
                        : 'bg-surface-container text-primary rounded-bl-xs border border-surface-container-high'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-on-surface-variant mt-0.5 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-surface-container">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escribe tu consulta o progreso..."
                className="flex-1 p-2.5 rounded-xl bg-surface-container-low border border-surface-container text-[12px] text-primary outline-none focus:border-secondary"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-40 hover:bg-primary-container active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* List of all Cases */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[20px] font-bold text-primary">Mis Casos Clínicos</h2>
              <p className="text-[12px] text-on-surface-variant">Historial de consultas fitosanitarias</p>
            </div>
            <button
              type="button"
              onClick={onOpenConsult}
              className="py-2 px-3 rounded-xl bg-primary text-white font-bold text-[12px] flex items-center gap-1 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Nueva Consulta</span>
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-surface-container rounded-xl overflow-x-auto">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'En Tratamiento', label: 'En Tratamiento' },
              { id: 'Respondida', label: 'Respondidas' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`py-1.5 px-3 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                  filter === tab.id
                    ? 'bg-white text-primary shadow-xs font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cases List */}
          <div className="space-y-3">
            {filteredCases.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container cursor-pointer hover:border-secondary/40 active:scale-[0.99] transition-all space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={c.photos.general || c.photos.symptom}
                    alt={c.plantName}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0 ring-1 ring-surface-container"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h3 className="font-bold text-[15px] text-primary truncate">
                        {c.plantName}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-container text-on-secondary-container">
                        {c.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant block">
                      {c.date} · {c.species}
                    </span>
                    <p className="text-[12px] text-on-surface line-clamp-1 mt-1 font-medium">
                      {c.prescription?.diagnosis || c.userQuery}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-surface-container text-on-surface-variant">
                  <span className="flex items-center gap-1 text-secondary font-semibold">
                    <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                    {c.prescription ? 'Receta oficial emitida' : 'En evaluación'}
                  </span>
                  <span className="text-secondary font-bold flex items-center gap-0.5">
                    Ver ficha clínica
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prescription Printable Modal */}
      {showPrescriptionModal && selectedCase?.prescription && (
        <div
          onClick={() => setShowPrescriptionModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 text-slate-800"
          >
            <div className="text-center border-b border-slate-200 pb-3">
              <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-widest block">
                PlantaSana · Clínica Botánica
              </span>
              <h2 className="text-[18px] font-black text-slate-900 mt-1">RECETA FITOSANITARIA OFICIAL</h2>
              <span className="text-[10px] font-mono text-slate-500">
                Folio: {selectedCase.prescription.folio} · Fecha: {selectedCase.prescription.date}
              </span>
            </div>

            <div className="space-y-2 text-[12px]">
              <div>
                <strong className="text-slate-900 block">Ejemplar:</strong>
                <span className="text-slate-600">{selectedCase.prescription.plantName}</span>
              </div>
              <div>
                <strong className="text-slate-900 block">Diagnóstico:</strong>
                <span className="text-slate-700">{selectedCase.prescription.diagnosis}</span>
              </div>
              <div>
                <strong className="text-slate-900 block">Tratamiento Indicado:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 mt-0.5">
                  {selectedCase.prescription.treatmentSteps.map((st) => (
                    <li key={st.step}>
                      <strong>{st.title}:</strong> {st.instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Signature & Seal */}
            <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-[12px] text-slate-900 block">
                  {selectedCase.prescription.agronomist}
                </span>
                <span className="text-[10px] text-emerald-800 font-mono block">
                  {selectedCase.prescription.matricula}
                </span>
                <span className="text-[9px] text-slate-400">Colegio de Ingenieros Agrónomos</span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-emerald-800 flex items-center justify-center text-[10px] text-emerald-800 font-black rotate-[-12deg]">
                VALIDADO
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPrescriptionModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-[13px]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
