import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Button onPress={() => router.push("/sign-in")}>
        <ButtonText>Sign Out</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
