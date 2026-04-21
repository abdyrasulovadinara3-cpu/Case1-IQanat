import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { ConsentProvider } from "../services-context/ConsentContext";

export default function RootLayout() {
  return (
    <ConsentProvider>
      <ThemeProvider value={DarkTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ConsentProvider>
  );
}
