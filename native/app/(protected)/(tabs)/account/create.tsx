import { SafeAreaView } from "react-native-safe-area-context";
import CreateAccountForm from "@/features/account/CreateAccountForm";
import { auth0 } from "@/config/auth0";
import { AccountFormData } from "@/features/account/constants";

export default function CreateAccountScreen() {
  const onSubmit = async (data: AccountFormData) => {
    const credentials = await auth0.credentialsManager.getCredentials();
  };

  return (
    <SafeAreaView>
      <CreateAccountForm onSubmit={onSubmit} />
    </SafeAreaView>
  );
}
