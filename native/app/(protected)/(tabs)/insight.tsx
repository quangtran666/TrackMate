import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InsightScreen() {
  return (
    <SafeAreaView>
      <Box className="h-10 w-10 items-center justify-center bg-green-500">
        <Text className="font-bold text-typography-0">InsightScreen</Text>
      </Box>
    </SafeAreaView>
  );
}
