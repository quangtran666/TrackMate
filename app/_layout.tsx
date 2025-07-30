import { Slot } from "expo-router";
import "../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider/index";
import { ClerkProvider } from "@clerk/clerk-expo";

export default function RootLayout() {
  return (
    <ClerkProvider>
      <GluestackUIProvider mode="light">
        <Slot />
      </GluestackUIProvider>
    </ClerkProvider>
  );
}
