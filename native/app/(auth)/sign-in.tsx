import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { useAuth0 } from "react-native-auth0";

export default function SignInScreen() {
  const { authorize, clearSession, user } = useAuth0();

  const onSignInPress = async () => {
    try {
      await authorize();
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  const onSignOutPress = async () => {
    try {
      await clearSession();
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  console.log("User:", user);

  return (
    <VStack space="md">
      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={onSignInPress}
      >
        <ButtonText>Sign In</ButtonText>
      </Button>

      <Button
        size="md"
        variant="solid"
        action="secondary"
        onPress={onSignOutPress}
      >
        <ButtonText>Sign Out</ButtonText>
      </Button>
    </VStack>
  );
}
