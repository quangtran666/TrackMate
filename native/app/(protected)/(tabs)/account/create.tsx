import { SafeAreaView } from "react-native-safe-area-context";
import CreateAccountForm from "@/components/account/CreateAccountForm";

export default function CreateAccountScreen() {
  const onSubmit = (data: any) => {
    console.log("Account created:", data);
  };

  return (
    <SafeAreaView>
      <CreateAccountForm onSubmit={onSubmit} />
    </SafeAreaView>
  );
}
