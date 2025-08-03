import { Button, ButtonText } from "@/components/ui/button";
import { auth0 } from "@/config/auth0";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetch } from "expo/fetch"

export default function Home() {
  const router = useRouter();

  const testAuth = async () => {
    const crendentials = await auth0.credentialsManager.getCredentials();
    console.log(crendentials.accessToken);
    const result = await fetch("https://national-kit-poorly.ngrok-free.app/api/v1/temp", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${crendentials.accessToken}`,
      },
    })
    console.log(result);
  }

  return (
    <SafeAreaView>
      <Button onPress={() => router.push("/sign-in")}>
        <ButtonText>Sign Out</ButtonText>
      </Button>
      <Button onPress={testAuth}>
        <ButtonText>Test Auth</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
