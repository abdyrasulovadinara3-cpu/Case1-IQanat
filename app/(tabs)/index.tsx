import { useRouter } from "expo-router";
import { Clock, History, Shield } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useConsent } from "../../services-context/ConsentContext";

export default function Dashboard() {
  const { services } = useConsent();
  const router = useRouter();

  // ВАЖНО: Мы показываем ТОЛЬКО активные. Это заставляет приложение "исчезнуть" отсюда
  const activeServices = services.filter((s) => s.status === "active");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Consent OS</Text>
        <TouchableOpacity
          style={styles.historyCircle}
          onPress={() => router.push("/explore")}
        >
          <History color="#8B5CF6" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeServices} // Используем отфильтрованный список
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/details/${item.id}`)}
          >
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.infoRow}>
                <Clock size={12} color="#94A3B8" />
                <Text style={styles.infoText}>{item.grantedDate}</Text>
                <Shield
                  size={12}
                  color={item.riskLevel === "high" ? "#EF4444" : "#10B981"}
                  style={{ marginLeft: 12 }}
                />
                <Text style={styles.infoText}>
                  {item.riskLevel.toUpperCase()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "white" },
  historyCircle: { backgroundColor: "#1E1B4B", padding: 12, borderRadius: 50 },
  card: {
    backgroundColor: "#1E1B4B",
    padding: 20,
    borderRadius: 20,
    marginBottom: 12,
  },
  name: { color: "white", fontSize: 18, fontWeight: "bold" },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  infoText: { color: "#94A3B8", fontSize: 12, marginLeft: 5 },
});
