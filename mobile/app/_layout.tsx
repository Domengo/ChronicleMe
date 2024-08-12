import { Stack } from "expo-router/stack";
import { PaperProvider } from "react-native-paper";
import { SessionProvider } from "@/lib/ctx";

export default function RootLayout() {
  return (
    <SessionProvider>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </SessionProvider>
  );
}
// import Slot from "expo-router";
// export default Slot
