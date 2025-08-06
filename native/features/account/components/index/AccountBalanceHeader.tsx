import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { AccountBalanceHeader } from "../../types/account.types";

interface AccountBalanceHeaderProps {
  balance: AccountBalanceHeader;
}

export function AccountBalanceHeaderComponent({ balance }: AccountBalanceHeaderProps) {
  return (
    <Center className="my-4">
      <VStack space="sm" className="items-center">
        <Text className="font-semibold">Total Balance</Text>
        <Text className="text-2xl font-bold">{balance.formattedBalance}</Text>
      </VStack>
    </Center>
  );
}