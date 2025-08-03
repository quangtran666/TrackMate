import { Redirect, Stack } from "expo-router";
import { useAuth0 } from "react-native-auth0";

export default function ProtectedLayout() {
  const { user, isLoading } = useAuth0();
  const isAuthenticated = !!user;

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
