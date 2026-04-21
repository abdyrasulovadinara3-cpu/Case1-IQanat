import { PlusCircle } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useConsent } from "../../services-context/ConsentContext";

export default function HistoryScreen() {
  const { history, services, grantAccess } = useConsent();
  const inactiveServices = services.filter((s: any) => s.status === "inactive");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Архив и Логи</Text>

      {inactiveServices.length > 0 && (
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.sectionTitle}>ВЕРНУТЬ ДОСТУП:</Text>
          {inactiveServices.map((s: any) => (
            <TouchableOpacity
              key={s.id}
              style={styles.addCard}
              onPress={() => grantAccess(s.id)}
            >
              <Text style={styles.addText}>{s.name}</Text>
              <PlusCircle color={Colors.active} size={22} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>ПОЛНАЯ ИСТОРИЯ ДЕЙСТВИЙ:</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyService}>{item.serviceName}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <Text
              style={[
                styles.historyAction,
                {
                  color:
                    item.action === "Доступ разрешен"
                      ? Colors.active
                      : Colors.danger,
                },
              ]}
            >
              {item.action}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>История пуста</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textMain,
    marginBottom: 25,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 15,
    letterSpacing: 1,
  },
  addCard: {
    backgroundColor: Colors.cardBg,
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addText: { color: Colors.textMain, fontSize: 16 },
  historyItem: {
    backgroundColor: "#1E1B4B55",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  historyService: { color: Colors.textMain, fontWeight: "bold" },
  historyDate: { color: Colors.textSecondary, fontSize: 10 },
  historyAction: { fontSize: 13, fontWeight: "600" },
  emptyText: {
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 20,
  },
});
