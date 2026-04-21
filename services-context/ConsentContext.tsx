import React, { createContext, useContext, useState } from "react";

export type HistoryEntry = {
  id: string;
  serviceName: string;
  action: "Доступ разрешен" | "Доступ отозван";
  date: string;
};

export type Service = {
  id: string;
  name: string;
  category: string;
  status: "active" | "inactive";
  grantedDate: string;
  dataTypes: string[];
};

const INITIAL_SERVICES: Service[] = [
  {
    id: "1",
    name: "Iqanat Edu",
    category: "Образование",
    status: "active",
    grantedDate: "21.10.2023, 10:00",
    dataTypes: ["ФИО", "Оценки"],
  },
  {
    id: "2",
    name: "Kaspi.kz",
    category: "Финансы",
    status: "active",
    grantedDate: "20.10.2023, 15:45",
    dataTypes: ["Телефон", "Транзакции"],
  },
  {
    id: "3",
    name: "Smart City",
    category: "Гос. услуги",
    status: "active",
    grantedDate: "19.10.2023, 09:15",
    dataTypes: ["ИИН", "Адрес"],
  },
];

const ConsentContext = createContext<any>(null);

export const ConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const revokeAccess = (id: string) => {
    const service = services.find((s) => s.id === id);
    if (!service) return;

    const now = new Date().toLocaleString("ru-RU");
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "inactive" } : s)),
    );

    setHistory((prev: any) => [
      {
        id: Math.random().toString(),
        serviceName: service.name,
        action: "Доступ отозван",
        date: now,
      },
      ...prev,
    ]);
  };

  const grantAccess = (id: string) => {
    const now = new Date().toLocaleString("ru-RU");
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "active", grantedDate: now } : s,
      ),
    );

    const service = services.find((s) => s.id === id);
    setHistory((prev: any) => [
      {
        id: Math.random().toString(),
        serviceName: service?.name || "Сервис",
        action: "Доступ разрешен",
        date: now,
      },
      ...prev,
    ]);
  };

  return (
    <ConsentContext.Provider
      value={{ services, history, revokeAccess, grantAccess }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => useContext(ConsentContext);
