import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ArrowLeft,
    CheckCircle2,
    Database,
    Info,
    ShieldAlert,
    XCircle,
} from "lucide-react-native";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useConsent } from "../../services-context/ConsentContext";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { services, toggleAccess } = useConsent();

  const service = services.find((s) => String(s.id) === String(id));
  if (!service) return null;

  const isActive = service.status === "active";

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <ArrowLeft color="#8B5CF6" size={24} />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Шапка с Toggle */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{service.name}</Text>
            <Text style={styles.category}>{service.category}</Text>
          </View>
          <Switch
            value={isActive}
            onValueChange={() => toggleAccess(service.id)}
            trackColor={{ false: "#1E1B4B", true: "#8B5CF6" }}
            thumbColor={isActive ? "#fff" : "#94A3B8"}
          />
        </View>

        {/* Секция: Объяснение риска */}
        <View
          style={[
            styles.card,
            {
              borderLeftWidth: 4,
              borderLeftColor:
                service.riskLevel === "high" ? "#EF4444" : "#10B981",
            },
          ]}
        >
          <View style={styles.row}>
            <ShieldAlert
              color={service.riskLevel === "high" ? "#EF4444" : "#10B981"}
              size={20}
            />
            <Text style={styles.sectionTitle}>АНАЛИЗ БЕЗОПАСНОСТИ</Text>
          </View>
          <Text style={styles.riskReason}>{service.riskReason}</Text>
        </View>

        {/* Секция: Категории данных */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Database color="#8B5CF6" size={20} />
            <Text style={styles.sectionTitle}>ЗАПРАШИВАЕМЫЕ ДАННЫЕ</Text>
          </View>

          {service.dataTypes.map((item, index) => (
            <View key={index} style={styles.dataRow}>
              <View style={styles.iconBox}>
                <Info size={16} color="#8B5CF6" />
              </View>
              <Text style={styles.dataLabel}>{item.label}</Text>
              {isActive ? (
                <CheckCircle2 size={20} color="#10B981" />
              ) : (
                <XCircle size={20} color="#EF4444" />
              )}
            </View>
          ))}
        </View>

        {/* Статус для Жюри (Экран выдачи согласия) */}
        {!isActive && (
          <TouchableOpacity
            style={styles.enableBtn}
            onPress={() => toggleAccess(service.id)}
          >
            <Text style={styles.enableBtnText}>ПРЕДОСТАВИТЬ ДОСТУП</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
  backBtn: { marginBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "white" },
  category: { color: "#8B5CF6", fontSize: 16 },
  card: {
    backgroundColor: "#1E1B4B",
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
  },
  section: { marginTop: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#8B5CF6",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 1,
  },
  riskReason: { color: "#94A3B8", fontSize: 14, lineHeight: 22, marginTop: 5 },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F172A",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1E1B4B",
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#1E1B4B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  dataLabel: { color: "white", flex: 1, fontSize: 16 },
  enableBtn: {
    backgroundColor: "#8B5CF6",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  enableBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
