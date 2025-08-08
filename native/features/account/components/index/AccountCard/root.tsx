import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { AccountDisplay } from "@/features/account/types/account.types";
import { AccountCardContent } from "./AccountCardContent";
import { AccountCardActions } from "./AccountCardActions";

interface AccountCardProps {
  account: AccountDisplay;
}

export function AccountCard({ account }: AccountCardProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <View className="relative">
      <Pressable
        onHoverIn={() => setShowActions(true)}
        onHoverOut={() => setShowActions(false)}
        delayLongPress={300}
        onLongPress={() => setShowActions(true)}
        onPress={() => {
          if (showActions) setShowActions(false);
        }}
      >
        <AccountCardContent account={account} />
      </Pressable>

      <AccountCardActions
        isVisible={showActions}
        onClose={() => setShowActions(false)}
      />
    </View>
  );
}


