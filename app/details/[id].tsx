import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ShieldAlert, Trash2 } from "lucide-react-native";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useConsent } from "../../services-context/ConsentContext";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { services, revokeAccess } = useConsent();

  const service = services.find((s: any) => s.id === id);
  if (!service) return null;

  const handleRevoke = () => {
    Alert.alert(
      "Отозвать доступ?",
      "Этот сервис больше не сможет запрашивать ваши данные.",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Отозвать",
          style: "destructive",
          onPress: () => {
            revokeAccess(service.id);
            router.replace("/(tabs)");
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <ArrowLeft color={Colors.primary} />
        <Text style={styles.backText}>Назад</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{service.name}</Text>

      <View style={styles.infoBox}>
        <ShieldAlert color={Colors.primary} size={24} />
        <Text style={styles.infoText}>
          Этот сервис имеет доступ к вашим {service.dataTypes.join(", ")}.
        </Text>
      </View>

      <Text style={styles.section}>ДАННЫЕ (WHAT):</Text>
      {service.dataTypes.map((d: string, i: number) => (
        <View key={i} style={styles.dataRow}>
          <Text style={styles.dataLabel}>{d}</Text>
          <Text style={styles.dataValue}>Активно</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.revokeBtn} onPress={handleRevoke}>
        <Trash2 color="white" size={20} />
        <Text style={styles.revokeText}>ОТКЛЮЧИТЬ И УДАЛИТЬ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 60,
  },
  back: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backText: { color: Colors.primary, marginLeft: 10, fontSize: 16 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.textMain,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: Colors.cardBg,
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  infoText: { color: Colors.textMain, flex: 1, marginLeft: 15, fontSize: 14 },
  section: {
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 12,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2D2A5D",
  },
  dataLabel: { color: Colors.textMain, fontSize: 16 },
  dataValue: { color: Colors.active, fontSize: 14, fontWeight: "bold" },
  revokeBtn: {
    backgroundColor: Colors.danger,
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    borderRadius: 15,
    marginTop: 40,
    alignItems: "center",
  },
  revokeText: { color: "white", fontWeight: "bold", marginLeft: 10 },
});
