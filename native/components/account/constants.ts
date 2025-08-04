import { z } from 'zod';

export const accountSchema = z.object({
  accountName: z.string().min(1, { message: 'Account name is required' }),
  accountType: z.string().min(1, { message: 'Account type is required' }),
  amount: z.number().min(0, { message: 'Amount must be a positive number' }),
  currency: z.string().min(1, { message: 'Currency is required' }),
});

export type AccountFormData = z.infer<typeof accountSchema>;

export const ACCOUNT_TYPES = [
  { label: 'Checking', value: 'checking' },
  { label: 'Savings', value: 'savings' },
  { label: 'Credit Card', value: 'credit_card' },
  { label: 'Investment', value: 'investment' },
  { label: 'Loan', value: 'loan' },
  { label: 'Other', value: 'other' },
];

export const CURRENCIES = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'VND', value: 'VND' },
  { label: 'JPY', value: 'JPY' },
];