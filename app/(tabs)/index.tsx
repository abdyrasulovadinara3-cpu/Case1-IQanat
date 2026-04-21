import { useRouter } from "expo-router";
import { ChevronRight, ShieldCheck } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RiskBadge } from "../../components/RiskBadge";
import { Colors } from "../../constants/Colors";
import { useConsent } from "../../services-context/ConsentContext";

export default function DashboardScreen() {
  const router = useRouter();
  const { services } = useConsent();
  const activeServices = services.filter((s) => s.status === "active");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мои согласия</Text>
        <ShieldCheck color={Colors.active} size={28} />
      </View>

      <Text style={styles.counter}>
        Активных доступов: {activeServices.length}
      </Text>

      <FlatList
        data={activeServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/details/${item.id}`)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <RiskBadge level={item.riskLevel} />
            </View>
            <ChevronRight color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 28, fontWeight: "bold", color: Colors.textMain },
  counter: { color: Colors.textSecondary, marginVertical: 15 },
  card: {
    backgroundColor: Colors.cardBg,
    padding: 20,
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContent: { flex: 1 },
  serviceName: { color: Colors.textMain, fontSize: 18, fontWeight: "bold" },
  category: { color: Colors.textSecondary, fontSize: 12, marginTop: 2 },
});
