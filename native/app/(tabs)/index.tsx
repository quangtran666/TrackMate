import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <Button onPress={() => router.push("/sign-in")}>
      <ButtonText>Sign Out</ButtonText>
    </Button>
  );
}
