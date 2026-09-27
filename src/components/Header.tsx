import React, { useState } from 'react';
import { NotificationItem } from '../types';
import { AGRONOMIST_INFO, USER_INFO } from '../data/mockData';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onOpenNewPlant?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBack,
  showBack,
  notifications,
  onMarkNotificationRead,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl border-b border-surface-container-highest shadow-[0_1px_8px_rgba(27,67,50,0.04)] pt-safe">
        <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-2">
          {/* Left: Back button or Logo + Title */}
          <div className="flex items-center gap-2 min-w-0">
            {showBack && onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label="Volver"
                className="w-10 h-10 -ml-1 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
            ) : null}

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-secondary-fixed shadow-sm flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">psychiatry</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h1 className="font-bold text-[17px] text-primary leading-tight truncate">
                  {title}
                </h1>
                {subtitle ? (
                  <span className="text-[12px] text-on-surface-variant leading-tight truncate">
                    {subtitle}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right: Notifications & Profile Avatar */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Bell Notification Trigger */}
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notificaciones"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadCount > 0 ? (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-error ring-2 ring-surface animate-pulse" />
              ) : null}
            </button>

            {/* Profile Avatar */}
            <button
              type="button"
              onClick={() => setShowProfile(true)}
              aria-label="Perfil de usuario"
              className="relative active:scale-95 transition-transform"
            >
              <img
                src={USER_INFO.avatar}
                alt={USER_INFO.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-secondary-container"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Drawer / Dropdown Modal */}
      {showNotifications ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-sm bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-surface-container flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">notifications_active</span>
                <h3 className="font-bold text-[16px] text-primary">Notificaciones Clínicas</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNotifications(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="divide-y divide-surface-container max-h-80 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => onMarkNotificationRead(notif.id)}
                  className={`p-3.5 transition-colors cursor-pointer flex items-start gap-3 ${
                    notif.read ? 'bg-surface-container-lowest opacity-75' : 'bg-surface-container-low/50'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      notif.type === 'diagnosis'
                        ? 'bg-secondary-container text-on-secondary-container'
                        : notif.type === 'seasonal'
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                        : 'bg-primary-fixed text-on-primary-fixed'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {notif.type === 'diagnosis'
                        ? 'medication'
                        : notif.type === 'seasonal'
                        ? 'ac_unit'
                        : 'water_drop'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-[13px] text-primary truncate">
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-on-surface-variant whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-[12px] text-on-surface-variant mt-0.5 leading-snug">
                      {notif.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-surface-container-low/70 border-t border-surface-container flex items-center justify-between">
              <span className="text-[11px] text-on-surface-variant font-medium">
                Monitoreo activo por {AGRONOMIST_INFO.name}
              </span>
              <button
                type="button"
                onClick={() => setShowNotifications(false)}
                className="text-[12px] font-semibold text-secondary hover:underline"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* User Profile Modal */}
      {showProfile ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowProfile(false)}
        >
          <div
            className="w-full max-w-sm bg-surface-container-lowest rounded-2xl shadow-2xl p-5 border border-surface-container-high"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={USER_INFO.avatar}
                  alt={USER_INFO.name}
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-secondary-container"
                />
                <div>
                  <h3 className="font-bold text-[18px] text-primary">{USER_INFO.name}</h3>
                  <span className="text-[12px] text-secondary font-medium block">
                    {USER_INFO.plan}
                  </span>
                  <span className="text-[11px] text-on-surface-variant">Colección de 5 plantas</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProfile(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-surface-container-low p-3 rounded-xl mb-4 space-y-2">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-on-surface-variant">Botánico Asignado</span>
                <span className="font-semibold text-primary">{AGRONOMIST_INFO.name}</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-on-surface-variant">Matrícula Profesional</span>
                <span className="font-semibold text-secondary">{AGRONOMIST_INFO.matricula}</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-on-surface-variant">Tiempo de Respuesta</span>
                <span className="font-semibold text-primary">{AGRONOMIST_INFO.responseTime}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowProfile(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-[13px] hover:bg-primary-container transition-colors"
            >
              Listo
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
