/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, GuideType, Plant, ClinicalCase, NotificationItem } from './types';
import { INITIAL_PLANTS, INITIAL_CASES, INITIAL_NOTIFICATIONS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { HomeScreen } from './components/HomeScreen';
import { ConsultarScreen } from './components/ConsultarScreen';
import { CasesScreen } from './components/CasesScreen';
import { GuidesScreen } from './components/GuidesScreen';
import { NewPlantModal } from './components/NewPlantModal';
import { AllPlantsModal } from './components/AllPlantsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [activeGuide, setActiveGuide] = useState<GuideType>('riego');
  const [plants, setPlants] = useState<Plant[]>(() => {
    try {
      const saved = localStorage.getItem('plantasana_plants');
      return saved ? JSON.parse(saved) : INITIAL_PLANTS;
    } catch {
      return INITIAL_PLANTS;
    }
  });

  const [cases, setCases] = useState<ClinicalCase[]>(() => {
    try {
      const saved = localStorage.getItem('plantasana_cases');
      return saved ? JSON.parse(saved) : INITIAL_CASES;
    } catch {
      return INITIAL_CASES;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('plantasana_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [preselectedPlantId, setPreselectedPlantId] = useState<string | undefined>(undefined);
  const [showNewPlantModal, setShowNewPlantModal] = useState(false);
  const [showAllPlantsModal, setShowAllPlantsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('plantasana_plants', JSON.stringify(plants));
    } catch {
      // ignore
    }
  }, [plants]);

  useEffect(() => {
    try {
      localStorage.setItem('plantasana_cases', JSON.stringify(cases));
    } catch {
      // ignore
    }
  }, [cases]);

  useEffect(() => {
    try {
      localStorage.setItem('plantasana_notifications', JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleOpenConsult = (plantId?: string) => {
    setPreselectedPlantId(plantId);
    setActiveTab('consultar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGuide = (guide: GuideType) => {
    setActiveGuide(guide);
    setActiveTab('consejos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCaseSubmitted = (newCase: ClinicalCase) => {
    setCases((prev) => [newCase, ...prev]);
    // Also add a notification
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      title: 'Consulta agronómica recibida',
      description: `El Ing. Agr. Emmanuel Hick está revisando el caso de ${newCase.plantName}.`,
      time: 'Recién',
      type: 'diagnosis',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast('¡Consulta enviada con éxito! Redirigido a tu historial clínico.');
    setActiveTab('casos');
  };

  const handleUpdateCase = (updated: ClinicalCase) => {
    setCases((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleSavePlant = (newPlant: Plant) => {
    setPlants((prev) => [newPlant, ...prev]);
    showToast(`¡${newPlant.name} agregada a tu monitoreo fitosanitario!`);
  };

  const handleWaterPlant = (plantId: string) => {
    setPlants((prev) =>
      prev.map((p) => {
        if (p.id === plantId) {
          return {
            ...p,
            nextWateringDays: p.wateringFrequency?.includes('3-4') ? 4 : 7,
          };
        }
        return p;
      })
    );
    showToast('¡Riego registrado con éxito!');
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Header titles
  let headerTitle = 'PlantaSana';
  let headerSubtitle = 'Inicio';
  let showHeaderBack = false;

  if (activeTab === 'consultar') {
    headerSubtitle = 'Consultar';
  } else if (activeTab === 'casos') {
    headerSubtitle = 'Mis Casos';
  } else if (activeTab === 'consejos') {
    headerTitle = 'Detalle Del Caso';
    headerSubtitle = activeGuide === 'riego'
      ? 'Riego y Cuidados'
      : activeGuide === 'luz'
      ? 'Iluminación y Ubicación'
      : activeGuide === 'nutricion'
      ? 'Nutrición y Fertilización'
      : 'Plagas y Sanidad';
    showHeaderBack = true;
  }

  const activeCasesCount = cases.filter((c) => c.status === 'En Tratamiento' || c.status === 'Pendiente').length;

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Fixed Header */}
      <Header
        title={headerTitle}
        subtitle={headerSubtitle}
        showBack={showHeaderBack}
        onBack={() => setActiveTab('inicio')}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onOpenNewPlant={() => setShowNewPlantModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-20 pb-24">
        {activeTab === 'inicio' && (
          <HomeScreen
            plants={plants}
            onOpenConsult={handleOpenConsult}
            onOpenGuide={handleOpenGuide}
            onOpenAllPlants={() => setShowAllPlantsModal(true)}
            onOpenNewPlant={() => setShowNewPlantModal(true)}
          />
        )}

        {activeTab === 'consultar' && (
          <ConsultarScreen
            plants={plants}
            preselectedPlantId={preselectedPlantId}
            onSubmitCase={handleCaseSubmitted}
            onCancel={() => setActiveTab('inicio')}
          />
        )}

        {activeTab === 'casos' && (
          <CasesScreen
            cases={cases}
            onOpenConsult={() => {
              setPreselectedPlantId(undefined);
              setActiveTab('consultar');
            }}
            onUpdateCase={handleUpdateCase}
          />
        )}

        {activeTab === 'consejos' && (
          <GuidesScreen
            activeGuide={activeGuide}
            onSelectGuide={(g) => setActiveGuide(g)}
            plants={plants}
            onConsult={(topic) => {
              setPreselectedPlantId(undefined);
              setActiveTab('consultar');
            }}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeCasesCount={activeCasesCount}
      />

      {/* New Plant Modal Form */}
      <NewPlantModal
        isOpen={showNewPlantModal}
        onClose={() => setShowNewPlantModal(false)}
        onSavePlant={handleSavePlant}
      />

      {/* All Plants Modal */}
      <AllPlantsModal
        isOpen={showAllPlantsModal}
        onClose={() => setShowAllPlantsModal(false)}
        plants={plants}
        onOpenConsult={handleOpenConsult}
        onOpenNewPlant={() => setShowNewPlantModal(true)}
        onWaterPlant={handleWaterPlant}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-full bg-inverse-surface text-inverse-on-surface shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-[90%]">
          <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
            check_circle
          </span>
          <span className="text-[12px] font-medium leading-snug">
            {toastMessage}
          </span>
        </div>
      )}
    </div>
  );
}
