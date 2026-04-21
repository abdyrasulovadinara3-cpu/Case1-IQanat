import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Database, ShieldAlert, Trash2 } from "lucide-react-native";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useConsent } from "../../services-context/ConsentContext";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { services, revokeAccess } = useConsent();

  // Находим сервис
  const service = services.find((s) => String(s.id) === String(id));

  if (!service || service.status === "inactive") {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 50 }}>
          Сервис не найден
        </Text>
        <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
          <Text
            style={{ color: "#8B5CF6", textAlign: "center", marginTop: 20 }}
          >
            Вернуться назад
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleRevoke = () => {
    revokeAccess(service.id);
    Alert.alert("Успешно", "Все согласия отозваны", [
      { text: "OK", onPress: () => router.replace("/(tabs)") },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Кнопка назад */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <ArrowLeft color="#8B5CF6" size={24} />
        <Text style={styles.backText}>Назад</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{service.name}</Text>

        {/* Уровень риска */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ShieldAlert color="#8B5CF6" size={20} />
            <Text style={styles.sectionTitle}>СТАТУС БЕЗОПАСНОСТИ</Text>
          </View>
          <View style={styles.dataCard}>
            <Text style={styles.dataLabel}>
              Уровень риска: {service.riskLevel.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* --- ВОТ ЭТА ЧАСТЬ ДОБАВЛЯЕТ ДАННЫЕ --- */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Database color="#8B5CF6" size={20} />
            <Text style={styles.sectionTitle}>ИСПОЛЬЗУЕМЫЕ ДАННЫЕ</Text>
          </View>
          <View style={styles.dataCard}>
            {service.dataTypes.map((item, index) => (
              <Text key={index} style={styles.dataLabel}>
                • {item}
              </Text>
            ))}
          </View>
        </View>
        {/* -------------------------------------- */}
      </ScrollView>

      {/* Кнопка отзыва вынесена вниз */}
      <TouchableOpacity style={styles.deleteBtn} onPress={handleRevoke}>
        <Trash2 color="white" size={20} />
        <Text style={styles.deleteText}>ОТОЗВАТЬ ВСЕ СОГЛАСИЯ</Text>
      </TouchableOpacity>
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
  backBtn: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backText: { color: "#8B5CF6", marginLeft: 10, fontSize: 18 },
  title: { fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 10 },
  section: { marginTop: 25 },
  sectionHeader: {
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
  dataCard: {
    backgroundColor: "#1E1B4B",
    padding: 20,
    borderRadius: 20,
    gap: 10,
  },
  dataLabel: { color: "white", fontSize: 16 },
  deleteBtn: {
    backgroundColor: "#EF4444",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  deleteText: { color: "white", fontWeight: "bold" },
});
