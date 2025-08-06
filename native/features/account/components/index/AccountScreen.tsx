import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from "@/components/ui/vstack";
import { AccountBalanceHeaderComponent } from "./AccountBalanceHeader";
import { AccountList } from "./AccountList";
import { AccountGroup, AccountBalanceHeader } from "../../types/account.types";
import { AccountScreenHeader } from "./AccountScreenHeader";
import { CreateAccountFab } from "./CreateAccountFab";

interface AccountScreenProps {
  balanceHeader: AccountBalanceHeader;
  accountGroups: AccountGroup[];
}

export function AccountScreenComponent({ balanceHeader, accountGroups }: AccountScreenProps) {
  return (
    <>
      <CreateAccountFab />
      <SafeAreaView style={{ flex: 1 }}>
        <AccountScreenHeader />
        <AccountBalanceHeaderComponent balance={balanceHeader} />
        <ScrollView showsVerticalScrollIndicator={true}>
          <VStack className="px-4" space="md">
            {accountGroups.map((group, index) => (
              <AccountList key={`${group.currency}-${index}`} accountGroup={group} />
            ))}
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
