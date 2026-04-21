import React, { createContext, useCallback, useContext, useState } from "react";
import { HistoryEntry, Service } from "../types"; // Убедитесь, что типы созданы

// 1. Описываем всё, что контекст отдаёт наружу
interface ConsentContextType {
  services: Service[];
  history: HistoryEntry[]; // Исправляет ошибку в explore.tsx
  toggleAccess: (id: string, newStatus: "active" | "inactive") => void;
  // Если ваши файлы вызывают именно эти названия, добавим их как обертки:
  grantAccess: (id: string) => void; // Исправляет ошибку в explore.tsx
  revokeAccess: (id: string) => void; // Исправляет ошибку в [id].tsx
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [services, setServices] = useState<Service[]>([]); // Инициализируйте своими данными
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const toggleAccess = useCallback(
    (id: string, newStatus: "active" | "inactive") => {
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
      );

      // Логика добавления в историю
      const service = services.find((s) => s.id === id);
      if (service) {
        const newEntry: HistoryEntry = {
          id: Math.random().toString(),
          serviceName: service.name,
          action: newStatus === "active" ? "Доступ разрешен" : "Доступ отозван",
          date: new Date().toLocaleString("ru-RU"),
        };
        setHistory((prev) => [newEntry, ...prev]);
      }
    },
    [services],
  );

  // Обертки для удобства, которые просят ваши компоненты
  const grantAccess = (id: string) => toggleAccess(id, "active");
  const revokeAccess = (id: string) => toggleAccess(id, "inactive");

  return (
    <ConsentContext.Provider
      value={{
        services,
        history,
        toggleAccess,
        grantAccess,
        revokeAccess,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context)
    throw new Error("useConsent must be used within ConsentProvider");
  return context;
};
