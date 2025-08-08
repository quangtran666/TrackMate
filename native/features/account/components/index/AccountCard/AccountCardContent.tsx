import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AccountDisplay } from "@/features/account/types/account.types";

interface AccountCardContentProps {
  account: AccountDisplay;
}

export function AccountCardContent({ account }: AccountCardContentProps) {
  const formattedBalance = useMemo(() => {
    return account.balance.amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }, [account.balance.amount]);

  return (
    <Card className="flex-row items-center justify-between pr-4">
      <View className="w-[20%] items-center">
        <FontAwesome6 name="money-bill-1-wave" size={24} color="black" />
      </View>
      <View className="w-[50%]">
        <Text className="text-lg font-semibold">{account.accountName}</Text>
        <Text className="text-sm text-gray-500">{account.accountType}</Text>
      </View>
      <Text className="w-[30%] text-right text-lg font-semibold">
        {formattedBalance}
      </Text>
    </Card>
  );
}


