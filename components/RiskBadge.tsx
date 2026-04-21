import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RiskLevel } from "../types";

export const RiskBadge = ({ level }: { level: RiskLevel }) => {
  const config = {
    low: { color: "#10B981", label: "Безопасно" },
    medium: { color: "#F59E0B", label: "Средний риск" },
    high: { color: "#EF4444", label: "Высокий риск" },
  };

  const theme = config[level];

  return (
    <View style={[styles.badge, { backgroundColor: theme.color + "22" }]}>
      <View style={[styles.dot, { backgroundColor: theme.color }]} />
      <Text style={[styles.text, { color: theme.color }]}>{theme.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  text: { fontSize: 10, fontWeight: "700", textTransform: "uppercase" },
});
