import { Button, ButtonText } from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Home() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <Button onPress={handleSignOut}>
      <ButtonText>Sign Out</ButtonText>
    </Button>
  );
}
