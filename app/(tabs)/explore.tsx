import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useConsent } from "../../services-context/ConsentContext";

export default function HistoryScreen() {
  const { history } = useConsent();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Активность данных</Text>

      {history.map((item, index) => (
        <View key={item.id} style={styles.timelineItem}>
          <View style={styles.lineIndicator}>
            <View style={styles.dot} />
            {index !== history.length - 1 && <View style={styles.line} />}
          </View>
          <View style={styles.content}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.action}>
              <Text style={{ fontWeight: "bold", color: "#8B5CF6" }}>
                {item.serviceName}
              </Text>
              : {item.action}
            </Text>
          </View>
        </View>
      ))}
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
  title: { fontSize: 28, fontWeight: "bold", color: "white", marginBottom: 30 },
  timelineItem: { flexDirection: "row", gap: 15, minHeight: 70 },
  lineIndicator: { alignItems: "center" },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#8B5CF6",
    zIndex: 1,
  },
  line: { width: 2, flex: 1, backgroundColor: "#1E1B4B", marginVertical: -5 },
  content: { flex: 1, paddingBottom: 25 },
  date: { color: "#475569", fontSize: 12, marginBottom: 4 },
  action: { color: "white", fontSize: 15 },
});
