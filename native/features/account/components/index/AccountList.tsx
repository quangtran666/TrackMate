import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { AccountCard } from "./AccountCard";
import { AccountGroup } from "../../types/account.types";

interface AccountListProps {
  accountGroup: AccountGroup;
}

export function AccountList({ accountGroup }: AccountListProps) {
  return (
    <View>
      <Text className="mb-2 text-2xl font-bold">{accountGroup.currency}</Text>
      <VStack space="md">
        {accountGroup.accounts.map((account) => (
          <AccountCard 
            key={account.id} 
            account={account}
          />
        ))}
      </VStack>
    </View>
  );
}