import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2a7948",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Budget",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="money-check-alt" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="money-bill-transfer" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Accounts",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insight"
        options={{
          title: "Insight",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="insights" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
