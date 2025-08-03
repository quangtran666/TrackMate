import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { useAuth0 } from "react-native-auth0";
import { ResultAsync } from "neverthrow";
import { Link } from "expo-router";

export default function SignInScreen() {
  const { authorize } = useAuth0();

  const onSignInPress = async () => {
    const result = await ResultAsync.fromPromise(
      authorize({
        scope: "openid profile email offline_access",
      }),
      (error) => error as Error,
    );

    result.match(
      () => {
        console.log("Sign in successful");
      },
      (error) => {
        console.error("Sign in failed", error.message);
      }
    )
  };

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
    </VStack>
  );
}
