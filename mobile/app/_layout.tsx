// import { Stack } from "expo-router";
// import '../global.css'

// export default function RootLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" />
//     </Stack>
//   );
// }
import Slot from "expo-router";

import "'@/global.css'";
import { GluestackUIProvider } from "@/'components/ui'/gluestack-ui-provider";

// Import your global CSS file
import "../global.css"

export default Slot
