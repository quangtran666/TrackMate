import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#673ab7",
        headerShown: false
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Budget" }} />
      <Tabs.Screen name="transaction" options={{ title: "Transactions" }} />
      <Tabs.Screen name="account" options={{ title: "Accounts" }} />
      <Tabs.Screen name="insight" options={{ title: "Insight" }} />
    </Tabs>
  );
}
