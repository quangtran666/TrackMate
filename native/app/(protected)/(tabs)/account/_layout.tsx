import { Stack } from "expo-router";

export default function AccountLayout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="index" options={{ title: "Accounts" }} />
            <Stack.Screen name="create" options={{ title: "Create Account" }} />
            <Stack.Screen name="[id]" options={{ title: "Edit Account" }} />
        </Stack>
    )
}