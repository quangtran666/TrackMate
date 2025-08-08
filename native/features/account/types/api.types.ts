import { ApiResponse } from '@/services/api.types';
import { Account } from './account.types';
import { AccountGroup } from './account.types';

export interface CreateAccountRequest {
  accountName: string;
  accountType: string;
  amount: number;
  currency: string;
}

export type CreateAccountResponse = ApiResponse<Account>;
export type AccountListResponse = ApiResponse<Account[]>;
export type AccountGroupsResponse = ApiResponse<AccountGroup[]>;
export type DeleteAccountResponse = ApiResponse<{ id: string }>;

export interface UpdateAccountRequest {
  accountName: string;
  accountType: string;
  amount: number;
  currency: string;
}

export type UpdateAccountResponse = ApiResponse<Account>;
export type GetAccountResponse = ApiResponse<Account>;