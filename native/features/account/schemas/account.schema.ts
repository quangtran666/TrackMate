import { z } from 'zod';

export const AccountCreationSchema = z.object({
  accountName: z.string().min(1, { message: 'Account name is required' }),
  accountType: z.string().min(1, { message: 'Account type is required' }),
  amount: z.number().min(0, { message: 'Amount must be a positive number' }),
  currency: z.string().min(1, { message: 'Currency is required' }),
});

export type AccountCreationFormData = z.infer<typeof AccountCreationSchema>;