import { Box } from "@/components/ui/box";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
    const router = useRouter();

  return (
    <>
      <Fab placement="bottom right" size="lg" onPress={() => router.push("./account/create")}>
        <FabIcon as={AddIcon} size="lg" />
      </Fab>
      <SafeAreaView>
        <Text>Account</Text>
      </SafeAreaView>
    </>
  );
}
