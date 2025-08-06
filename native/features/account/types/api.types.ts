import { Account } from './account.types';

export interface CreateAccountRequest {
  accountName: string;
  accountType: string;
  amount: number;
  currency: string;
}

export interface CreateAccountResponse {
  success: boolean;
  data: Account;
  message: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface AccountListResponse {
  success: boolean;
  data: Account[];
  message: string;
}