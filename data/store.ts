
// Типы данных
export type Permission = {
  id: string;
  label: string;
  type: string;
  status: boolean;
};
export type HistoryRecord = {
  id: string;
  serviceName: string;
  action: string;
  date: string;
};
export type Service = {
  id: string;
  name: string;
  category: string;
  iconName: string;
  permissions: Permission[];
};

// Начальные данные
const INITIAL_SERVICES: Service[] = [
  {
    id: "1",
    name: "Iqanat Edu",
    category: "Education",
    iconName: "book",
    permissions: [
      { id: "p1", label: "ФИО", type: "Личные", status: true },
      { id: "p2", label: "Оценки", type: "Учеба", status: true },
    ],
  },
  {
    id: "2",
    name: "Kaspi.kz",
    category: "Finance",
    iconName: "credit-card",
    permissions: [{ id: "p3", label: "Телефон", type: "Личные", status: true }],
  },
];

// Глобальный объект для хранения данных (простая реализация для Хакатона)
export let globalServices = [...INITIAL_SERVICES];
export let globalHistory: HistoryRecord[] = [
  {
    id: "1",
    serviceName: "Система",
    action: "Consent OS активирован",
    date: new Date().toLocaleString(),
  },
];

export const addHistory = (serviceName: string, action: string) => {
  globalHistory.unshift({
    id: Math.random().toString(),
    serviceName,
    action,
    date: new Date().toLocaleString(), // Добавляем точное время
  });
};
