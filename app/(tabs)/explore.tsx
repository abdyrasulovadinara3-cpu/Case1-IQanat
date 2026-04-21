import { Activity, RefreshCw } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useConsent } from "../../services-context/ConsentContext";

export default function HistoryScreen() {
  const { history, services, grantAccess } = useConsent();

  // ФИЛЬТР: Отключенные приложения (Архив)
  const archived = services.filter((s) => s.status === "inactive");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>История</Text>

      {/* Секция Архива */}
      <Text style={styles.sectionTitle}>АРХИВ (ОТКЛЮЧЕНО)</Text>
      {archived.length > 0 ? (
        archived.map((s) => (
          <View key={s.id} style={styles.archivedCard}>
            <View>
              <Text style={styles.archivedName}>{s.name}</Text>
              <Text style={styles.archivedDate}>
                Был активен до: {s.grantedDate}
              </Text>
            </View>
            <TouchableOpacity onPress={() => grantAccess(s.id)}>
              <RefreshCw color="#10B981" size={20} />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>Архив пуст</Text>
      )}

      {/* Полный лог действий */}
      <View style={styles.logHeader}>
        <Activity color="#8B5CF6" size={20} />
        <Text style={styles.sectionTitle}>ЛОГ ВСЕХ ОПЕРАЦИЙ</Text>
      </View>

      {history.map((item) => (
        <View key={item.id} style={styles.logItem}>
          <View style={styles.logTop}>
            <Text style={styles.logName}>{item.serviceName}</Text>
            <Text style={styles.logDate}>{item.date}</Text>
          </View>
          <Text
            style={[
              styles.logAction,
              {
                color: item.action.includes("разрешен") ? "#10B981" : "#EF4444",
              },
            ]}
          >
            {item.action}
          </Text>
        </View>
      ))}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 25,
  },
  sectionTitle: {
    color: "#8B5CF6",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 15,
    letterSpacing: 1,
  },
  archivedCard: {
    backgroundColor: "#1E1B4B55",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#334155",
  },
  archivedName: { color: "#94A3B8", fontWeight: "bold", fontSize: 16 },
  archivedDate: { color: "#475569", fontSize: 10, marginTop: 4 },
  logHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 35,
    marginBottom: 15,
  },
  logItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#1E1B4B",
    paddingVertical: 12,
  },
  logTop: { flexDirection: "row", justifyContent: "space-between" },
  logName: { color: "white", fontWeight: "bold" },
  logDate: { color: "#475569", fontSize: 10 },
  logAction: { fontSize: 12, fontWeight: "bold", marginTop: 4 },
  emptyText: { color: "#475569", fontSize: 12, marginBottom: 20 },
});
