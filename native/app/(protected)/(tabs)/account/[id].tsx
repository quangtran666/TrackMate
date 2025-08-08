import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { EditAccountForm } from '@/features/account/components';
import { useAccountById, useUpdateAccount } from '@/features/account';

export default function EditAccountScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const accountQuery = useAccountById(id as string | undefined);
  const updateMutation = useUpdateAccount(id as string);

  useEffect(() => {
    if (!id) router.back();
  }, [id]);

  if (accountQuery.isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner size="large" />
      </View>
    );
  }
  if (accountQuery.error || !accountQuery.data) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text>Failed to load account.</Text>
      </View>
    );
  }

  const defaultValues = {
    accountName: accountQuery.data.account_name,
    accountType: accountQuery.data.account_type,
    amount: accountQuery.data.balance.amount,
    currency: accountQuery.data.balance.currency,
  };

  return (
    <SafeAreaView className="flex-1">
      <EditAccountForm
        defaultValues={defaultValues}
        isSubmitting={updateMutation.isPending}
        onSubmit={async (data) => {
          await updateMutation.mutateAsync(data);
          if (!updateMutation.isError) {
            router.push('/(protected)/(tabs)/account');
          }
        }}
      />
    </SafeAreaView>
  );
}


