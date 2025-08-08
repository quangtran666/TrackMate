import { Stack } from "expo-router";
import "../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider/index";
import { Auth0Provider, useAuth0 } from "react-native-auth0";
import { QueryProvider } from "@/providers/query-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <Auth0Provider
      domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID!}
    >
      <GluestackUIProvider mode="light">
        <GestureHandlerRootView>
          <QueryProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(protected)" />
              <Stack.Screen name="(auth)" />
            </Stack>
          </QueryProvider>
        </GestureHandlerRootView>
      </GluestackUIProvider>
    </Auth0Provider>
  );
}
