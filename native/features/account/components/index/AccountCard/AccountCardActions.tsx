import React, { ComponentType } from "react";
import { Button, ButtonIcon, ButtonSpinner } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "@/components/ui/icon";
import { createMotionAnimatedComponent } from "@legendapp/motion";
import { Alert, Pressable, PressableProps, View } from "react-native";
import { useDeleteAccount } from "@/features/account";
import { useRouter } from "expo-router";

interface AccountCardActionsProps {
  isVisible: boolean;
  onClose: () => void;
  accountId: string;
}

const AnimatedPressable = createMotionAnimatedComponent(
  Pressable
) as ComponentType<
  PressableProps & {
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    transition?: Record<string, unknown>;
  }
>;

export function AccountCardActions({ isVisible, onClose, accountId }: AccountCardActionsProps) {
  const deleteMutation = useDeleteAccount();
  const router = useRouter();

  return (
    <AnimatedPressable
      initial={{ x: 96 }}
      animate={{ x: isVisible ? 0 : 96 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      style={{ position: "absolute", right: 8, top: 0, bottom: 0 }}
      pointerEvents={isVisible ? "auto" : "none"}
    >
      <View className="h-full flex-row items-center gap-2">
        <Button
          size="sm"
          action="secondary"
          className="w-10 px-0"
          onPress={() => {
            onClose();
            router.push(`/(protected)/(tabs)/account/${accountId}`);
          }}
          accessibilityLabel="Edit account"
        >
          <ButtonIcon as={EditIcon} size="sm" />
        </Button>

        <Button
          size="sm"
          action="negative"
          className="w-10 px-0"
          disabled={deleteMutation.isPending}
          onPress={() => {
            if (deleteMutation.isPending) return;
            Alert.alert(
              "Delete this account?",
              "This action cannot be undone.",
              [
                { text: "Cancel", style: "cancel", onPress: onClose },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    if (deleteMutation.isPending) return;
                    deleteMutation.mutate(
                      { accountId },
                      {
                        onSettled: () => {
                          onClose();
                        },
                      }
                    );
                  },
                },
              ]
            );
          }}
          accessibilityLabel="Delete account"
        >
          {deleteMutation.isPending ? (
            <ButtonSpinner />
          ) : (
            <ButtonIcon as={TrashIcon} size="sm" />
          )}
        </Button>
      </View>
    </AnimatedPressable>
  );
}


