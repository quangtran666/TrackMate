import { SafeAreaView } from "react-native-safe-area-context";
import CreateAccountForm from "@/features/account/components/create/CreateAccountForm";
import { useRouter } from "expo-router";

export default function CreateAccountScreen() {
  const router = useRouter();
  
  const handleSuccess = () => {
    router.push("/(protected)/(tabs)/account");
  };

  return (
    <SafeAreaView className="flex-1">
      <CreateAccountForm onSuccess={handleSuccess} />
    </SafeAreaView>
  );
}
