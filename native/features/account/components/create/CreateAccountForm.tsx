import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AccountCreationFormData, AccountCreationSchema } from '../../schemas/account.schema';
import { ACCOUNT_TYPES, CURRENCIES } from '../../constants/account.constants';
import { FormTextField, FormSelectField, FormNumberField } from '../../../../components/form';
import { VStack } from '../../../../components/ui/vstack';
import { Button, ButtonText } from '../../../../components/ui/button';
import { Text } from '../../../../components/ui/text';
import { useCreateAccount } from '../../mutations/useCreateAccount';

interface CreateAccountFormProps {
  onSuccess?: () => void;
}

export function CreateAccountForm({ onSuccess }: CreateAccountFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AccountCreationFormData>({
    resolver: zodResolver(AccountCreationSchema),
  });

  const { mutateAsync, error } = useCreateAccount();

  const onSubmit = async (data: AccountCreationFormData) => {
    await mutateAsync(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <VStack space="lg" className="p-4">
      <FormTextField
        name="accountName"
        label="Account Name"
        placeholder="Enter account name"
        helperText="A memorable name for your account."
        control={control}
      />

      <FormSelectField
        name="accountType"
        label="Account Type"
        placeholder="Select account type"
        helperText="The category of this account."
        options={ACCOUNT_TYPES}
        control={control}
      />

      <FormNumberField
        name="amount"
        label="Initial Amount"
        placeholder="Enter amount"
        helperText="The starting balance for the account."
        control={control}
      />

      <FormSelectField
        name="currency"
        label="Currency"
        placeholder="Select currency"
        helperText="The currency for this account."
        options={CURRENCIES}
        control={control}
      />

      <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        <ButtonText>{isSubmitting ? 'Creating...' : 'Create Account'}</ButtonText>
      </Button>

      {error && (
        <Text className="text-center text-red-500">
          {error.message}
        </Text>
      )}
    </VStack>
  );
}

export default CreateAccountForm;