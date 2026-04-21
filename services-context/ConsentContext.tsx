import React, { createContext, useContext, useState } from "react";

export type RiskLevel = "low" | "medium" | "high";

export interface Service {
  id: string;
  name: string;
  category: string;
  status: "active" | "inactive";
  grantedDate: string;
  dataTypes: string[];
  riskLevel: RiskLevel;
}

export interface HistoryEntry {
  id: string;
  serviceName: string;
  action: string;
  date: string;
  riskLevel: RiskLevel;
}

interface ConsentContextType {
  services: Service[];
  history: HistoryEntry[];
  grantAccess: (id: string) => void;
  revokeAccess: (id: string) => void;
}

const INITIAL_SERVICES: Service[] = [
  {
    id: "1",
    name: "Iqanat Edu",
    category: "Образование",
    status: "active",
    grantedDate: "21.10.2023, 10:00",
    dataTypes: ["ФИО", "Оценки"],
    riskLevel: "low",
  },
  {
    id: "2",
    name: "Kaspi.kz",
    category: "Финансы",
    status: "active",
    grantedDate: "20.10.2023, 15:45",
    dataTypes: ["Транзакции", "Карта"],
    riskLevel: "medium",
  },
  {
    id: "3",
    name: "Smart City",
    category: "Гос. услуги",
    status: "active",
    grantedDate: "19.10.2023, 09:15",
    dataTypes: ["ИИН", "Адрес"],
    riskLevel: "high",
  },
];

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const updateStatus = (id: string, newStatus: "active" | "inactive") => {
    const now = new Date().toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });
    const targetService = services.find((s) => String(s.id) === String(id));
    if (!targetService) return;

    const entry: HistoryEntry = {
      id: Math.random().toString(),
      serviceName: targetService.name,
      action: newStatus === "active" ? "Доступ разрешен" : "Доступ отозван",
      date: now,
      riskLevel: targetService.riskLevel,
    };
    setHistory((prev) => [entry, ...prev]);

    setServices((prev) =>
      prev.map((s) =>
        String(s.id) === String(id) ? { ...s, status: newStatus } : s,
      ),
    );
  };

  return (
    <ConsentContext.Provider
      value={{
        services,
        history,
        grantAccess: (id) => updateStatus(id, "active"),
        revokeAccess: (id) => updateStatus(id, "inactive"),
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent missing");
  return context;
};
