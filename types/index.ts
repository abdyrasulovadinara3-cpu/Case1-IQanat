export type RiskLevel = "low" | "medium" | "high";

export interface Service {
  id: string;
  name: string;
  category: string;
  status: "active" | "inactive";
  grantedDate: string;
  dataTypes: string[];
  riskLevel: RiskLevel; // Новое поле для Risk Indicators
  description: string;
}

export interface HistoryEntry {
  id: string;
  serviceName: string;
  action: string;
  date: string;
}
