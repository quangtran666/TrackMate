import { SafeAreaView } from "react-native-safe-area-context";
import { Toast, ToastDescription, ToastTitle, useToast } from ".";

export type ToastAction =
  | "muted"
  | "error"
  | "warning"
  | "success"
  | "info"
  | undefined;
export type ToastVariant = "solid" | "outline" | undefined;

export function useAppToast() {
  const toast = useToast();

  return {
    showToast: (
      title: string,
      message: string,
      action: ToastAction = "muted",
      variant: ToastVariant = "solid",
    ) => {
      const newId = Math.random();
      toast.show({
        id: newId.toString(),
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = `toast-${id}`;
          return (
            <SafeAreaView className="mt-4">
              <Toast nativeID={uniqueToastId} action={action} variant={variant}>
                <ToastTitle>{title}</ToastTitle>
                <ToastDescription>{message}</ToastDescription>
              </Toast>
            </SafeAreaView>
          );
        },
      });
    },
  };
}
