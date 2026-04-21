import React, { createContext, useContext, useState } from "react";

export type RiskLevel = "low" | "medium" | "high";

export interface DataCategory {
  label: string;
  icon: string; // Название иконки (user, bar-chart, credit-card и т.д.)
}

export interface Service {
  id: string;
  name: string;
  category: string;
  status: "active" | "inactive";
  grantedDate: string;
  dataTypes: DataCategory[];
  riskLevel: RiskLevel;
  riskReason: string; // ПОЧЕМУ риск такой
}

export interface HistoryEntry {
  id: string;
  serviceName: string;
  action: string;
  date: string;
}

interface ConsentContextType {
  services: Service[];
  history: HistoryEntry[];
  toggleAccess: (id: string) => void;
}

const INITIAL_SERVICES: Service[] = [
  {
    id: "1",
    name: "Iqanat Edu",
    category: "Образование",
    status: "active",
    grantedDate: "21.10.2023",
    dataTypes: [
      { label: "ФИО", icon: "user" },
      { label: "Оценки", icon: "bar-chart-2" },
    ],
    riskLevel: "low",
    riskReason:
      "Данные используются только для академического мониторинга внутри платформы.",
  },
  {
    id: "2",
    name: "Kaspi.kz",
    category: "Финансы",
    status: "active",
    grantedDate: "20.10.2023",
    dataTypes: [
      { label: "Транзакции", icon: "credit-card" },
      { label: "ИИН", icon: "file-text" },
    ],
    riskLevel: "medium",
    riskReason:
      "Сервис имеет доступ к финансовым потокам. Требуется двухфакторная защита.",
  },
  {
    id: "3",
    name: "Smart City",
    category: "Гос. услуги",
    status: "active",
    grantedDate: "19.10.2023",
    dataTypes: [
      { label: "Адрес", icon: "map-pin" },
      { label: "Биометрия", icon: "scan" },
    ],
    riskLevel: "high",
    riskReason:
      "Критическая персональная информация. Утечка может привести к краже личности.",
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

  const toggleAccess = (id: string) => {
    const now = new Date().toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });

    setServices((prev) =>
      prev.map((s) => {
        if (String(s.id) === String(id)) {
          const newStatus = s.status === "active" ? "inactive" : "active";

          // Добавляем в историю
          const entry: HistoryEntry = {
            id: Math.random().toString(),
            serviceName: s.name,
            action:
              newStatus === "active" ? "Доступ включен" : "Доступ отозван",
            date: now,
          };
          setHistory((h) => [entry, ...h]);

          return { ...s, status: newStatus };
        }
        return s;
      }),
    );
  };

  return (
    <ConsentContext.Provider value={{ services, history, toggleAccess }}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent missing");
  return context;
};
