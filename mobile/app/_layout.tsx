import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SessionProvider } from "@/lib/ctx";

export default function RootLayout() {
  return (
    <SessionProvider>
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </SessionProvider>
  );
}
// import Slot from "expo-router";
// export default Slot
