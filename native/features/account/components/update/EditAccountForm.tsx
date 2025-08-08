import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AccountCreationFormData, AccountCreationSchema } from '../../schemas/account.schema';
import { ACCOUNT_TYPES, CURRENCIES } from '../../constants/account.constants';
import { FormTextField, FormSelectField, FormNumberField } from '../../../../components/form';
import { VStack } from '../../../../components/ui/vstack';
import { Button, ButtonText } from '../../../../components/ui/button';

interface EditAccountFormProps {
  defaultValues: AccountCreationFormData;
  onSubmit: (data: AccountCreationFormData) => Promise<void> | void;
  isSubmitting?: boolean;
}

export function EditAccountForm({ defaultValues, onSubmit, isSubmitting }: EditAccountFormProps) {
  const { control, handleSubmit } = useForm<AccountCreationFormData>({
    resolver: zodResolver(AccountCreationSchema),
    defaultValues,
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
        label="Amount"
        placeholder="Enter amount"
        helperText="The balance for this account."
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

      <Button onPress={handleSubmit(onSubmit)} disabled={!!isSubmitting}>
        <ButtonText>{isSubmitting ? 'Saving...' : 'Save Changes'}</ButtonText>
      </Button>
    </VStack>
  );
}

export default EditAccountForm;


