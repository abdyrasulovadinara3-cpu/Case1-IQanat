import { useRouter } from "expo-router";
import {
  BookOpen,
  ChevronRight,
  Clock,
  CreditCard,
  Globe
} from "lucide-react-native";
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

export default function DashboardScreen() {
  const router = useRouter();
  const { services } = useConsent();
  const activeServices = services.filter((s: any) => s.status === "active");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consent OS</Text>
      <Text style={styles.subtitle}>
        Активные разрешения ({activeServices.length})
      </Text>

      <FlatList
        data={activeServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/details/[id]",
                params: { id: item.id },
              })
            }
          >
            <View style={styles.iconBox}>
              {item.name === "Kaspi.kz" ? (
                <CreditCard color={Colors.primary} />
              ) : item.name === "Iqanat Edu" ? (
                <BookOpen color={Colors.primary} />
              ) : (
                <Globe color={Colors.primary} />
              )}
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <View style={styles.dateRow}>
                <Clock size={10} color={Colors.textSecondary} />
                <Text style={styles.dateText}>Выдано: {item.grantedDate}</Text>
              </View>
            </View>
            <ChevronRight color={Colors.textSecondary} size={20} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Все доступы отозваны. Ваши данные в безопасности.
          </Text>
        }
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
  title: { fontSize: 32, fontWeight: "bold", color: Colors.textMain },
  subtitle: { color: Colors.textSecondary, marginBottom: 30, marginTop: 5 },
  card: {
    backgroundColor: Colors.cardBg,
    padding: 20,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconBox: { backgroundColor: "#020617", padding: 10, borderRadius: 12 },
  serviceName: { color: Colors.textMain, fontSize: 18, fontWeight: "bold" },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 4 },
  dateText: { color: Colors.textSecondary, fontSize: 11 },
  emptyText: {
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 50,
    lineHeight: 20,
  },
});
