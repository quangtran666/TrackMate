import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AccountFormData, accountSchema, ACCOUNT_TYPES, CURRENCIES } from './constants';
import { FormTextField, FormSelectField, FormNumberField } from '../../components/form';
import { VStack } from '../../components/ui/vstack';
import { Button, ButtonText } from '../../components/ui/button';

interface CreateAccountFormProps {
  onSubmit: (data: AccountFormData) => void;
}

export function CreateAccountForm({ onSubmit }: CreateAccountFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
  });

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
    </VStack>
  );
}

export default CreateAccountForm;