import { Stack } from "expo-router";
import { ConsentProvider } from "../services-context/ConsentContext";

export default function RootLayout() {
  return (
    <ConsentProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#020617" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="details/[id]"
          options={{ title: "Детали сервиса" }}
        />
      </Stack>
    </ConsentProvider>
  );
}
